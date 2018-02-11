const Model = require('../models');
const bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');
const Boom = require('boom');
const secret = require('../secret');


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
    auth: false,
    handler: (request, reply) => {
      const { password, userName } = request.payload;

      Model.users.findOne({ userName })
        .then((user) => {
          bcrypt.compare(password, user.password)
            .then(() => {
              reply({
                message: 'Logged In',
                data: {
                  id_token: createToken(user),
                },
              });
            }).catch(() => {
              Boom.badRequest('Please check username or password');
            });
        });
    },
  },
}];


module.exports = route;
