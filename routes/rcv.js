const rcvHandler = require('./Handler/rcvHandler');

module.exports = [{
  method: 'POST',
  path: '/transaction/rcv',
  handler: (req, reply) => {
    const fromId = req.payload.from;
    const amt = req.payload.amount;
    const goAhead = req.payload.decision;
    // const currentUserId = getFromAuths;
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
