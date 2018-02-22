const Models = require('../../models');

const transferMoney = (fromId, currentUserId, amt) => new Promise((resolve) => {
  Models.userDetails.findOne({ where: { userId: currentUserId } })// increase money from currentUser
    .then((currentUserInfo) => {
      const newBalance = currentUserInfo.balance + amt; // get current balance
      Models.userDetails.update(
        { balance: newBalance },
        { where: { userId: currentUserId } },
      )
        .then(() => {
          Models.blockedmoney.destroy({
            where: { // delete the data from blocked money table
              fromId,
              toId: currentUserId,
            },
          })
            .then(() => { // update transaction in transaction history
              Models.transactions.update({
                status: 'COMPLETED',
              }, {
                where: {
                  fromId,
                  toId: currentUserId,
                },
              })
                .then(() => {
                  resolve();
                });
            });
        });
    });
});

const restoreMoney = (fromId, currentUserId, amt) => new Promise((resolve) => {
  Models.userDetails.findOne({ where: { userId: fromId } }) // increase money from currentUser
    .then((currentUserInfo) => {
      const newBalance = currentUserInfo.balance + amt; // get current balance
      Models.userDetails.update(
        { balance: newBalance },
        { where: { userId: fromId } },
      )
        .then(() => {
          Models.blockedmoney.destroy({
            where: { // delete the data from blocked money table
              fromId,
              toId: currentUserId,
            },
          })
            .then(() => { // update transaction in transaction history
              Models.transactions.update({
                status: 'FAILED',
              }, {
                where: {
                  fromId,
                  toId: currentUserId,
                },
              })
                .then(() => {
                  resolve();
                });
            });
        });
    });
});

const handlerFn = (fromId, currentUserId, amt, decision) => new Promise((resolve) => {
  if (decision) {
    transferMoney(fromId, currentUserId, amt).then(() => {
      resolve();
    });
  } else {
    restoreMoney(fromId, currentUserId, amt).then(() => {
      resolve();
    });
  }
});

module.exports = handlerFn;
