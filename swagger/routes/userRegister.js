const Joi = require('joi');

const registerSwagger = {
  responses: {
    200: {
      description: 'Success',
      schema: Joi.object({
        message: Joi.string().example('User successfully created'),
      }).label('Result'),
    },
    400: { description: 'Bad Request' },
  },
};

module.exports = registerSwagger;
