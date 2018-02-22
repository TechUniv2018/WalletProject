const rcvHandler = require('./Handler/rcvHandler');
const Joi = require('joi');

module.exports = [{
  method: 'POST',
  path: '/transaction/receive',
  config: {
    validate: {
      payload: Joi.object({
        from: Joi.number().integer().min(0),
        amount: Joi.number().integer().min(0),
        decision: Joi.string().min(2).max(2),
      }),
    },
  },
  handler: (req, reply) => {
    const fromId = req.payload.from;
    const amt = req.payload.amount;
    const goAhead = req.payload.decision;
    const currentUserId = req.auth.credentials.userId;
    if (goAhead === 'NO') {
      rcvHandler(fromId, currentUserId, amt, 0).then(() => {
        // send notification back at fromId
        reply('Transaction cancelled');
      });
    } else {
      rcvHandler(fromId, currentUserId, amt, 1).then(() => {
        // send notification back at fromId
        reply('Amount transferred');
      });
    }
  },
}];
