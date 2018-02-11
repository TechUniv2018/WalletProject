const Model = require('../models');
const bcrypt = require('bcryptjs');
const Boom = require('boom');
const Jwt = require('jsonwebtoken');

const secret = require('../secret');

function hashPassword(password, cb) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (_, hash) => cb(err, hash));
  });
}

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
  path: '/users',
  config: {
    auth: false,
    handler: (request, reply) => {
      const { password, userName } = request.payload;

      Model.users.findOne({ userName: request.payload.userName })
        .then((_, user) => {
          if (user && user.userName === request.payload.userName) {
            reply(Boom.badRequest('User Name taken'));
          }
        });

      hashPassword(password, (err, hash) => {
        if (err) {
          throw Boom.badRequest(err);
        }

        const response = {
          success: false,
        };

        const result = Model.users.create({
          userName,
          password: hash,
        });

        result.then((newUser) => {
          if (!newUser) {
            throw Boom.notAcceptable('Failed at user creation');
          }

          reply(Object.assign(response, {
            success: true,
            data: {
              id_token: createToken(newUser),
            },
          }));
        }).catch((error) => {
          reply(Object.assign(response, {
            errorCode: error.code,
            errorMsg: error.errmsg,
          }));
        });
      });
    },
  },
}];

module.exports = route;
