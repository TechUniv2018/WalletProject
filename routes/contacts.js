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
    401: { description: 'Unauthorized' },
  },
};

const contactAddValidation = Joi.object({
  friendId: Joi.string().example('2'),
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
    description: 'add a contacts for the users',
    notes: 'inerst into database the id of the contact',
    plugins: {
      'hapi-swagger': contactAddSwagger,
    },
    validate: { headers: headerValidation, payload: contactAddValidation },
  },
  handler: (request, reply) => {
    reply('wo0hoo');
  },
}];
