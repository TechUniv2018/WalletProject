const Joi = require('joi');

const route = [
  {
    method: 'POST',
    path: '/register/validation',
    handler: (request, response) => response({ statuscode: 200 }),
    config: {
      validate: {
        payload: Joi.object({
          firstName: Joi.string().min(3).max(15).regex(/^[a-z]+$/i),
          lastName: Joi.string().min(3).max(15).regex(/^[a-z]*$/i),
          aadharNo: Joi.number().positive().integer(),
          phone: Joi.string().min(10).max(10).regex(/^[0-9]*$/i),
          accountNo: Joi.string().min(10).max(20).regex(/^[0-9]*$/i),
          username: Joi.string().min(5).max(15).regex(/^[a-z][a-z0-9\_]*$/i),
          password: Joi.string().min(4).max(20),
        }),
      },
    },
  },
];
module.exports = route;
