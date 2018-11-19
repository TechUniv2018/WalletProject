const model = require('../models');
const Joi = require('joi');

const amountSwagger = {
  responses: {
    200: {
      description: 'Success',
      schema: Joi.object({
        userId: Joi.number().example(1),
        balance: Joi.number().example(10000),
      }).label('Result'),
    },
    401: { description: 'Unauthorized' },
  },
};

const headerValidation = Joi.object({
  authorization: Joi.string(),
}).unknown();

const nameSwagger = {
  responses: {
    200: {
      description: 'Success',
      schema: Joi.object({
        userName: Joi.string().example('Bobby_B'),
      }).label('Result'),
    },
    400: { description: 'Bad Request' },
    401: { description: 'Unauthorized' },
  },
};

const nameValidation = Joi.object({
  friendId: Joi.number().example(3),
});


module.exports = [{
  method: 'GET',
  path: '/balance',
  config: {
    tags: ['api'],
    description: 'get money for the user',
    notes: 'find the balance amount of money the user has',
    plugins: {
      'hapi-swagger': amountSwagger,
    },
    validate: { headers: headerValidation },
  },
  handler: (request, reply) => {
    model.userDetails.findOne({
      where:
      { userId: (request.auth.credentials.userId) },
    }).then((result) => {
      const { userId, balance } = result;
      reply({ userId, balance });
    });
  },
}, {
  method: 'POST',
  path: '/userName',
  config: {
    tags: ['api'],
    description: 'get the contact name from id',
    notes: 'find the user name given the user id',
    plugins: {
      'hapi-swagger': nameSwagger,
    },
    validate: { headers: headerValidation, payload: nameValidation },
  },
  handler: (request, reply) => {
    const { friendId } = request.payload;
    const { userId } = request.auth.credentials;

    model.contacts.findOne({ where: { userId, friendId } }).then((exists) => {
      if (exists !== null) {
        model.userDetails.findOne({ where: { userId: friendId } }).then((result) => {
          if (result === null) {
            reply({ message: 'User doesn\'t exist' }).code(400);
          } else {
            model.users.findOne({ where: { userId: friendId } })
              .then(user => reply({ userName: user.userName }).code(200));
          }
        });
      } else {
        reply('Unauthorized').code(401);
      }
    });
  },
}];
