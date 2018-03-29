const Models = require('../models');
const Joi = require('joi');
const pusher = require('../utils/pusher');

const historyHeaderValidation = require('../validations/routes/history');

const sendSwagger = {
  responses: {
    200: {
      description: 'Success',
      schema: Joi.object({
        message: Joi.string().example('request created successfully'),
      }).label('Result'),
    },
    400: { description: 'Bad Request' },
  },
};
const sendPayloadValidation = Joi.object({
  toId: Joi.number().integer().min(1).required()
    .example(1),
  amount: Joi.number().precision(2).min(0).required()
    .example(500),
  reason: Joi.string().example('food'),
});
const getUserBalance = userId => new Promise((resolve) => {
  Models.userDetails.findOne({ where: { userId } })
    .then((item) => {
      resolve(item.balance);
    });
});

const route = [
  {
    method: 'POST',
    path: '/transaction/send',
    config: {
      tags: ['api'],
      description: 'send money',
      notes: 'send money from another user',
      plugins: {
        'hapi-swagger': sendSwagger,
      },
      validate: {
        headers: historyHeaderValidation,
        payload: sendPayloadValidation,
      },
      auth: 'jwt',
    },
    handler: (request, response) => {
      const toId = request.payload.toId;
      const amt = request.payload.amount;
      const currentUserId = request.auth.credentials.userId;
      const reason = request.payload.reason;
      // console.log(`${toId} ${amt}${currentUserId}${reason}`);
      getUserBalance(currentUserId).then((balance) => {
        if (amt > balance) {
          response('insufficient balance');
        } else {
          const futureBalance = balance - amt;
          pusher.trigger(
            'money-channel', 'send-money',
            {
              from: currentUserId,
              to: toId,
              amount: amt,
              reason,
              id: `${currentUserId}_${toId}_${new Date()}`,
            },
          );
          // deduct balance from fromId
          Models.userDetails.update(
            { balance: futureBalance },
            { where: { userId: currentUserId } },
          ).then(() => Models.transactions.create({
            transactionId: `${currentUserId}_${toId}_${new Date()}`,
            fromId: currentUserId,
            toId,
            amount: amt,
            reason,
            type: 'sent',
            unseen: true,
            status: 'COMPLETED',
            timeStamp: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
          })).then(() => getUserBalance(toId))
            .then((toBalance) => {
              const futureToBalance = toBalance + amt;
              Models.userDetails.update(
                { balance: futureToBalance },
                { where: { userId: toId } },
              );
            })
            .then(() => {
              response({ statusCode: 201, message: 'transaction added' });
            });
        }
      });
    },

  },
];

module.exports = route;
