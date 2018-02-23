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
        from: Joi.number().integer().min(0),
        amount: Joi.number().integer().min(0),
        decision: Joi.string().min(2).max(3),
      }),

    },
  },
  handler: (req, reply) => {
    const fromId = req.payload.from;
    const amt = req.payload.amount;
    const goAhead = req.payload.decision;
    // const currentUserId = 1;
    const currentUserId = req.auth.credentials.userId;
    if (goAhead === 'NO') {
      approveHandler(fromId, currentUserId, amt, 0).then(() => {
        reply('Transaction cancelled');
      });
    } else {
      approveHandler(fromId, currentUserId, amt, 1).then((resolve) => {
        reply('Amount transferred');
      }).catch(() => {
        reply('insufficient balance');
      });
    }
  },

}];
