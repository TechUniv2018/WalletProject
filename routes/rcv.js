const rcvHandler = require('./Handler/rcvHandler');

module.exports = [{
  method: 'POST',
  path: '/transaction/receive',
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
