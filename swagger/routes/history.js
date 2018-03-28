const Joi = require('joi');

const historySwagger = {
  responses: {
    200: {
      description: 'Success',
      schema: Joi.object({
        history: Joi.array().items(Joi.object({
          transactionId: Joi.number().example(1234),
          fromId: Joi.number().example(1),
          toId: Joi.number().example(2),
          amount: Joi.number().example(300),
          reason: Joi.string().example('mcdonalds'),
          status: Joi.string().example('completed'),
          timeStamp: Joi.date().example('2018-02-13T08:13:40.786Z'),
          category: Joi.string().example('food'),
          type: Joi.string().example('sent'),
        })),
      }).label('Result'),
    },
    401: { description: 'Unauthorized' },
  },
};

module.exports = historySwagger;
