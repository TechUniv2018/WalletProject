const model = require('../models');
const Joi = require('joi');

const userSwagger = {
  responses: {
    200: {
      description: 'Success',
      schema: Joi.object({
        details: Joi.object({
          firstName: Joi.string().min(3).max(15).regex(/^[a-z]+$/i)
            .example('Jane'),
          lastName: Joi.string().min(3).max(15).regex(/^[a-z]*$/i)
            .example('Doe'),
          aadharNo: Joi.number().positive().integer().example(1111111111),
          phone: Joi.string().min(10).max(10).regex(/^[0-9]*$/i)
            .example('2222222222'),
          accountNo: Joi.string().min(10).max(20).regex(/^[0-9]*$/i)
            .example('3333333333'),
          userName: Joi.string().min(5).max(15).regex(/^[a-z][a-z0-9_]*$/i)
            .example('Jane_Doe'),
          balance: Joi.number().example(1000),
        }),
      }).label('Result'),
    },
    401: { description: 'Unauthorized' },
  },
};

const headerValidation = Joi.object({
  authorization: Joi.string(),
}).unknown();

module.exports = [{
  method: 'GET',
  path: '/users',
  config: {
    auth: 'jwt',
    tags: ['api'],
    description: 'get current user details',
    notes: 'get current user details',
    plugins: {
      'hapi-swagger': userSwagger,
    },
    validate: { headers: headerValidation },
  },
  handler: (request, reply) => {
    model.userDetails.findOne({
      where:
      { userId: (request.auth.credentials.userId) },
    }).then((result) => {
      reply(result);
    });
  },
}];
