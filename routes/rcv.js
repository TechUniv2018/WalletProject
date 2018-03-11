const rcvHandler = require('./Handler/rcvHandler');
const Joi = require('joi');
const receiveSwagger = require('../swagger/routes/receive');

module.exports = [{
  method: 'PATCH',
  path: '/transaction/receive',
  config: {
    auth: 'jwt',
    tags: ['api'],
    description: 'Handles receiving a money request',
    plugins: {
      'hapi-swagger': receiveSwagger,
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
          .example('YES'),
      }),
    },
  },
  handler: (req, reply) => {
    const txnId = req.payload.transactionId;
    const goAhead = req.payload.decision;
    // const currentUserId = 1;
    const currentUserId = req.auth.credentials.userId;
    if (goAhead === 'NO') {
      rcvHandler(txnId, currentUserId, 0).then(() => {
        // send notification back at user
        reply('Transaction cancelled');
      });
    } else {
      rcvHandler(txnId, currentUserId, 1).then(() => {
        // send notification back at user
        reply('Amount transferred');
      })
        .catch((err) => {
          reply(err.message);
        });
    }
  },
}];
