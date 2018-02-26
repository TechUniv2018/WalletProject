const Joi = require('joi');

const loginSwagger = {
  responses: {
    200: {
      description: 'Success',
      schema: Joi.object({
        message: Joi.string().example('Logged In'),
        data: Joi.object({
          id_token: Joi.string().example('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJOYW1lIjoiSm9obl9Eb2UiLCJpYXQiOjE1MTkyNzk3ODgsImV4cCI6MTUxOTI4MzM4OH0.S_PiK25p8mLDev4Slo2pMp0-VMuPQADjZi5gGTeDCgw'),
        }),
      }).label('Result'),
    },
    400: { description: 'Bad Request' },
  },
};

module.exports = loginSwagger;
