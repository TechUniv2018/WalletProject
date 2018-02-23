const model = require('../models');
const Joi = require('joi');

const contactSwagger = {
  responses: {
    200: {
      description: 'Success',
      schema: Joi.object({
        message: Joi.array().example([{ userId: 1, name: 'John_Doe' }, { userId: 2, name: 'Jane_Doe' }]),
      }).label('Result'),
    },
    401: { description: 'Unauthorized' },
  },
};

const headerValidation = Joi.object({
  authorization: Joi.string(),
}).unknown();

const contactAddSwagger = {
  responses: {
    200: {
      description: 'Success',
      schema: Joi.object({
        message: Joi.string().example('Added a friend'),
      }).label('Result'),
    },
    400: { description: 'Bad Request' },
    401: { description: 'Unauthorized' },
  },
};

const contactAddValidation = Joi.object({
  friendId: Joi.number().example(2),
});

module.exports = [{
  method: 'GET',
  path: '/contacts',
  config: {
    tags: ['api'],
    description: 'get contacts of the users',
    notes: 'find all the contacts the user has added',
    plugins: {
      'hapi-swagger': contactSwagger,
    },
    validate: { headers: headerValidation },
  },
  handler: (request, reply) => {
    model.contacts.findAll({
      where:
      { userId: (request.auth.credentials.userId) },
    }).then((result) => {
      const resultArrPromise = [];
      result.forEach(({ friendId }) => {
        resultArrPromise.push(model.users.findOne({ where: { userId: friendId } }));
      });

      const detailsArr = [];
      Promise.all(resultArrPromise).then((resultArr) => {
        resultArr.forEach(({ userName, userId }) => {
          detailsArr.push({
            name: userName,
            id: userId,
          });
        });

        reply(detailsArr);
      });
    });
  },
}, {
  method: 'POST',
  path: '/contacts',
  config: {
    tags: ['api'],
    description: 'add a contact for the current user',
    notes: 'inerst into database the id of the contact',
    plugins: {
      'hapi-swagger': contactAddSwagger,
    },
    validate: { headers: headerValidation, payload: contactAddValidation },
  },
  handler: (request, reply) => {
    const { friendId } = request.payload;
    const { userId } = request.auth.credentials;

    if (friendId === userId) {
      reply({ message: 'Can\'t add yourself' }).code(400);
    }

    model.users.findOne({ where: { userId: friendId } }).then((result) => {
      if (result === null) {
        reply({ message: 'User doesn\'t exist' }).code(400);
      } else {
        model.contacts.findOrCreate({ where: { userId, friendId }, defaults: { userId, friendId } }).then(() => reply({ message: 'Successfully added' }).code(200));
      }
    });
  },
}];
