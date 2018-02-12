const Model = require('../models');
const bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');
const Boom = require('boom');
const secret = require('../secret');
const Joi = require('joi');


function createToken(user) {
  return Jwt.sign({
    userId: user.userId,
    userName: user.userName,
  }, secret, {
    algorithm: 'HS256',
    expiresIn: '1h',
  });
}


const route = [{
  method: 'POST',
  path: '/users/login',
  config: {
    validate: {
      payload: Joi.object({
        userName: Joi.string().min(5).max(15).regex(/^[a-z][a-z0-9_]*$/i),
        password: Joi.string().min(4).max(20),
      }),
    },
    auth: false,
    handler: (request, reply) => {
      const {
        password,
        userName,
      } = request.payload;

      Model.users.findOne({
        where: {
          userName,
        },
      })
        .then((user) => {
          const isCorrect = bcrypt.compareSync(password, user.password);
          if (isCorrect) {
            reply({
              message: 'Logged In',
              data: {
                id_token: createToken(user),
              },
            });
          } else {
            reply(Boom.badRequest('Please check password'));
          }
        }).catch(() => {
          reply(Boom.badRequest('Please check username'));
        });
    },
  },
}];


module.exports = route;
