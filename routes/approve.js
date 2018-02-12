const approveHandler = require('./Handler/approveHandler');

module.exports = [{
  method: 'POST',
  path: '/transaction/approve',
  handler: (req, reply) => {
    const fromId = req.payload.from;
    const amt = req.payload.amount;
    const goAhead = req.payload.decision;
    // const currentUserId = getFromAuths;
    if (goAhead === 'NO') {
      approveHandler(fromId, currentUserId, amt, 0).then(() => {
        // send notification back at fromId
        reply('Transaction cancelled');
      });
    } else {
      approveHandler(fromId, currentUserId, amt, 1).then(() => {
        // send notification back at fromId
        reply('Amount transferred');
      });
    }
  },
}];
