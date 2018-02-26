const Models = require('../models');
const Joi = require('joi');

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
  toId: Joi.number().integer().min(1).example(1),
  amount: Joi.number().integer().min(0).example(500),
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
        payload: requestPayloadValidation,
      },
      auth: 'jwt',
    },
    handler: (request, response) => {
      const toId = request.payload.toId;
      const amt = request.payload.amount;
      const currentUserId = request.auth.credentials.userId;
      const reason = request.payload.reason;
      // create transaction
      Models.transactions.create({
        transactionId: `${currentUserId}_${toId}_${new Date()}`,
        fromId: currentUserId,
        toId,
        amount: amt,
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
