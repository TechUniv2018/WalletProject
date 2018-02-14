const Model = require('../models');
const hashPassword = require('../utils/hashPassword');
const Boom = require('boom');
const Joi = require('joi');


const route = [{
  method: 'POST',
  path: '/users',
  config: {
    validate: {
      payload: Joi.object({
        firstName: Joi.string().min(3).max(15).regex(/^[a-z]+$/i),
        lastName: Joi.string().min(3).max(15).regex(/^[a-z]*$/i),
        aadharNo: Joi.number().positive().integer(),
        phone: Joi.string().min(10).max(10).regex(/^[0-9]*$/i),
        accountNo: Joi.string().min(10).max(20).regex(/^[0-9]*$/i),
        userName: Joi.string().min(5).max(15).regex(/^[a-z][a-z0-9_]*$/i),
        password: Joi.string().min(4).max(20),
      }),
    },
    auth: false,
  },
  handler: (request, reply) => {
    const {
      password,
      userName,
    } = request.payload;

    Model.users.findOne({
      userName: request.payload.userName,
    })
      .then((user) => {
        if (user && user.userName === request.payload.userName) {
          throw Boom.badRequest('User Name taken');
        }
      }).then(() => {
        hashPassword(password, (error, hash) => Model.users.create({
          userName,
          password: hash,
        }));
      }).then(() => {
        reply({
          statusCode: 200,
          message: 'User successfully created',
        });
      })
      .catch((err) => {
        reply(err);
      });
  },
},
];

module.exports = route;
