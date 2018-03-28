const Models = require('../models');
const Joi = require('joi');
const pusher = require('../utils/pusher');

const historyHeaderValidation = require('../validations/routes/history');

const requestSwagger = {
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
const requestPayloadValidation = Joi.object({
  toId: Joi.number().integer().min(1).required()
    .example(1),
  amount: Joi.number().precision(2).min(0).required()
    .example(500),
  reason: Joi.string().example('food'),
});
const route = [
  {
    method: 'POST',
    path: '/transaction/request',
    config: {
      tags: ['api'],
      description: 'request money',
      notes: 'request money from another user',
      plugins: {
        'hapi-swagger': requestSwagger,
      },
      validate: {
        headers: historyHeaderValidation,
        payload: requestPayloadValidation,
      },
      auth: 'jwt',
    },
    handler: (request, response) => {
      const amt = request.payload.amount;
      const currentUserId = request.auth.credentials.userId;
      const { reason, toId } = request.payload;
      const transactionId = `${currentUserId}_${toId}_${new Date()}`;
      pusher.trigger(
        'money-channel', 'request-money',
        {
          to: currentUserId, from: toId, amount: amt, reason, id: transactionId,
        },
      );
      Models.transactions.create({
        transactionId,
        fromId: currentUserId,
        toId,
        amount: amt,
        unseen: true,
        type: 'requested',
        reason,
        status: 'PENDING',
        timeStamp: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }).then(() => {
        response({ statusCode: 201, message: 'transaction added' });
      });
    },
  }];

module.exports = route;
