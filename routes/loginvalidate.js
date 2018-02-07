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
          username: Joi.string().min(5).max(15).regex(/^[a-z][a-z0-9\_]*$/i),
          // username: Joi.string().min(5).max(15),
        }),
      },
    },
  },
];
module.exports = route;
