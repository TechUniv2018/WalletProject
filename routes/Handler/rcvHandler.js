const Models = require('../../models');

const transferMoney = (txnId, currentUserId) => new Promise((resolve) => {
  Models.transactions.findOne({
    where: {
      transactionId: txnId,
      toId: currentUserId,
    },
  }).then((transactionDetails) => {
    const { amount } = transactionDetails;
    Models.userDetails.findOne({ where: { userId: currentUserId } })
    // increase money from currentUser
      .then((currentUserInfo) => {
        const newBalance = currentUserInfo.balance + amount; // get current balance
        Models.userDetails.update(
          { balance: newBalance },
          { where: { userId: currentUserId } },
        ).then(() => { // update transaction in transaction history
          Models.transactions.update({
            status: 'COMPLETED',
          }, {
            where: {
              transactionId: txnId,
              status: 'PENDING',
            },
          })
            .then(() => {
              resolve();
            });
        });
      });
  });
});

const restoreMoney = txnId => new Promise((resolve) => {
  Models.transactions.findOne({
    where: {
      transactionId: txnId,
    },
  }).then((transactionDetails) => {
    const { fromId } = transactionDetails;
    const { amount } = transactionDetails;
    Models.userDetails.findOne({ where: { userId: fromId } }) // increase money from currentUser
      .then((currentUserInfo) => {
        const newBalance = currentUserInfo.balance + amount; // get current balance
        Models.userDetails.update(
          { balance: newBalance },
          { where: { userId: fromId } },
        ).then(() => { // update transaction in transaction history
          Models.transactions.update({
            status: 'FAILED',
          }, {
            where: {
              transactionId: txnId,
              status: 'PENDING',
            },
          })
            .then(() => {
              resolve();
            });
        });
      });
  });
});

const handlerFn = (txnId, currentUserId, decision) => new Promise((resolve) => {
  if (decision) {
    transferMoney(txnId, currentUserId).then(() => {
      resolve();
    });
  } else {
    restoreMoney(txnId).then(() => {
      resolve();
    });
  }
});

module.exports = handlerFn;
