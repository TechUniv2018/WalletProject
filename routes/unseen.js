const Models = require('../models');
const Joi = require('joi');

const historyHeaderValidation = require('../validations/routes/history');

const unseenSwagger = {
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

const route = [
  {
    method: 'GET',
    path: '/transactions/unseen',
    config: {
      tags: ['api'],
      description: 'get all unseen transactions',
      notes: 'find all transactions with seen column false',
      plugins: {
        'hapi-swagger': unseenSwagger,
      },
      validate: {
        headers: historyHeaderValidation,
      },
      auth: 'jwt',
    },
    handler: (request, response) => {
      const currentUserId = request.auth.credentials.userId;
      Models.transactions.findAll({
        where: {
          $or: [
            {
              toId: currentUserId,
              type: { in: ['sent', 'requested'] },
            },
            {
              fromId: currentUserId,
              type: { in: ['APPROVED', 'DECLINED'] },
            },
          ],
          unseen: true,
        },
      })
        .then((result) => {
          const resultArr = result.map((transaction) => {
            let id;
            if (transaction.type === 'sent' || transaction.type === 'requested') {
              id = transaction.fromId;
            } else {
              id = transaction.toId;
            }
            return {
              name: id,
              type: transaction.type,
              amount: transaction.amount,
              reason: transaction.reason,
              transactionId: transaction.transactionId,
            };
          });
          response(resultArr);
        });
    },
  },
  {
    method: 'PATCH',
    path: '/transactions/seen',
    config: {
      tags: ['api'],
      description: 'get all unseen transactions',
      notes: 'find all transactions with seen column false',
      plugins: {
        'hapi-swagger': unseenSwagger,
      },
      validate: {
        headers: historyHeaderValidation,
        payload: Joi.object({
          transactionId: Joi.string().required()
            .example('2_3_Wed Mar 28 2018 15:00:21 GMT+0530 (IST)'),
        }),
      },
      auth: 'jwt',
    },
    handler: (request, response) => {
      const { transactionId } = request.payload;
      Models.transactions.findOne({
        where: {
          transactionId,
        },
      }).then((transaction) => {
        if (transaction) {
          return Models.transactions.update({
            unseen: false,
          }, {
            where: { transactionId },
          });
        }
        return null;
      }).then(result => response(result));
    },
  }];

module.exports = route;
