const approveHandler = require('./Handler/approveHandler');
const Joi = require('joi');
const approveSwagger = require('../swagger/routes/approve');

module.exports = [{
  method: 'POST',
  path: '/transaction/approve',
  config: {
    auth: 'jwt',
    tags: ['api'],
    description: 'Handles approving a money request',
    plugins: {
      'hapi-swagger': approveSwagger,
    },
    validate: {
      // auth: 'jwt',
      headers: Joi.object({
        authorization: Joi.string(),
      }).unknown(),
      payload: Joi.object({
        transactionId: Joi.number().integer().min(10000).max(99999)
          .required()
          .example(11212),
        decision: Joi.string().min(2).max(3).required()
          .example('NO'),
      }),

    },
  },
  handler: (req, reply) => {
    const { transactionId } = req.payload;
    const goAhead = req.payload.decision;
    const currentUserId = req.auth.credentials.userId;
    if (goAhead === 'NO') {
      approveHandler(transactionId, currentUserId, 0).then(() => {
        reply('Transaction cancelled');
      });
    } else {
      approveHandler(transactionId, currentUserId, 1).then(() => {
        reply('Amount transferred');
      }).catch(() => {
        reply('insufficient balance');
      });
    }
  },

}];
