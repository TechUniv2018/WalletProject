// const Hapi = require('hapi');
const Joi = require('joi');

const route = [
  {
    method: 'POST',
    path: '/login/validation',
    handler: (request, response) => response({ statuscode: 200 }),
    config: {
      validate: {
        payload: Joi.object({
          userName: Joi.string().min(5).max(15).regex(/^[a-z][a-z0-9_]*$/i),
          password: Joi.string().min(4).max(20),
        }),
      },
    },
  },
];
module.exports = route;
