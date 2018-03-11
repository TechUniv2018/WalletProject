const Model = require('../models');
const hashPassword = require('../utils/hashPassword');
const Boom = require('boom');

const registerPayloadValidation = require('../validations/routes/userRegister');
const registerSwagger = require('../swagger/routes/userRegister');

const route = [{
  method: 'POST',
  path: '/users',
  config: {
    tags: ['api'],
    description: 'register new user',
    notes: 'register new user',
    plugins: {
      'hapi-swagger': registerSwagger,
    },
    validate: {
      payload: registerPayloadValidation,
    },
    auth: false,
  },
  handler: (request, reply) => {
    const {
      password,
      userName,
    } = request.payload;

    Model.users.findOne({
      where: {
        userName: request.payload.userName,
      },
    })
      .then((user) => {
        if (user && user.userName === request.payload.userName) {
          throw Boom.badRequest('User Name taken');
        }
      }).then(() => {
        hashPassword(password, (error, hash) => Model.users.create({
          // TODO: create with a user ID
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
