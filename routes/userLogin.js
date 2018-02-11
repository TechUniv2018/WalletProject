const Model = require('../models');
const bcrypt = require('bcryptjs');
const Boom = require('boom');

function verifyCredentials(request, reply) {
  const { password } = request.payload;

  Model.users.findOne({
    $or: [
      {
        userName: request.payload.userName,
      },
    ],
  }).then((err, user) => {
    if (user) {
      bcrypt.compare(password, user.password)
        .then((_, isValid) => {
          if (isValid) reply(user);
          reply(Boom.forbidden('Password is invalid'));
        });
    } else {
      reply(Boom.notFound('User not found'));
    }
  });
}
