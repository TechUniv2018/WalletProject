const Models = require('../models');

const route = [
  {
    method: 'POST',
    path: '/transaction/request',
    handler: (request, response) => {
      const toId = request.payload.toId;
      const amt = request.payload.amount;
      // currentUserId = response('balance deducted');
      const reason = request.payload.reason;
      // create transaction
      Models.transactions.create({
        transactionId: 12,
        fromId: currentUserId,
        toId,
        amount: amt,
        reason,
        status: 'PENDING',
        timeStamp: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }).then(() => {
        response('request sent');
      });
    },
  }];

module.exports = route;
