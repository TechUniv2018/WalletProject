const models = require('../models');

// const historySwagger = require('../swagger/routes/history');
const historyHeaderValidation = require('../validations/routes/history');

const Joi = require('joi');


const setCategory = (uId, tId, category) => models.transactions.findOne({
  where: {
    fromId: uId,
    transactionId: tId,
  },
}).then((transaction) => {
  if (transaction) {
    return models.transactions.update({
      category,
    }, {
      where: { transactionId: tId },
    });
  }
  return null;
});

module.exports = {
  method: 'PATCH',
  path: '/transactions/category',
  config: {
    auth: 'jwt',
    tags: ['api'],
    description: 'catagorize a transaction made by the user',
    notes: 'catagorize a transaction made by the user',
    plugins: {
      'hapi-swagger': {
        responses: {
          200: {
            description: 'Success',
            schema: Joi.object({
              history: Joi.array().items(Joi.object({
                message: Joi.string().example('category set'),
              })),
            }).label('Result'),
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
      },
    },
    validate: {
      headers: historyHeaderValidation,
      payload: Joi.object({
        transactionId: Joi.number()
          .example(12345),
        category: Joi.string()
          .example('movie'),
      }),
    },
  },
  handler: (request, response) => {
    const { transactionId, category } = request.payload;
    setCategory(request.auth.credentials.userId, transactionId, category).then((result) => {
      if (result) {
        response({
          statusCode: 200,
          message: 'category set',
        });
      } else {
        response({
          statusCode: 400,
          message: 'no transaction made by user with given transaction id found',
        }).code(400);
      }
    });
  },
};
