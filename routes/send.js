const Models = require('../models');

const getUserBalance = userId => new Promise((resolve) => {
  Models.userDetails.findOne({ where: { userId } })
    .then((item) => {
      resolve(item.balance);
    });
});

const route = [
  {
    method: 'POST',
    path: '/transaction/send',
    handler: (request, response) => {
      const toId = request.payload.toId;
      const amt = request.payload.amount;
      // const currentUserId = getFromAuth();
      const reason = request.payload.reason;
      getUserBalance(currentUserId).then((balance) => {
        if (amt > balance) {
          response('insufficient balance');
        } else {
          const futureBalance = balance - amt;
          // deduct balance from fromId
          Models.userDetails.update(
            { balance: futureBalance },
            { where: { userId: currentUserId } },
          ).then(() => {
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
            });
          }).then(() => {
            // add money to blockedMoney table
            Models.blockedmoney.create({
              fromId: currentUserId,
              toId,
              amount: amt,
            });
          }).then(() => {
            response('balance deducted');
          });
        }
      });
    },

  },
];

module.exports = route;
