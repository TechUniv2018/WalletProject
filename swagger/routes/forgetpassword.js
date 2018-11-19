
const Joi = require('joi');

const forgetPasswordSwagger = {
  responses: {
    200: {
      description: 'Success',
      schema: Joi.object({
        message: Joi.string().example('Password succesfully reset'),
      }).label('Result'),
    },
    400: { description: 'Bad Request' },
  },
};

module.exports = forgetPasswordSwagger;
