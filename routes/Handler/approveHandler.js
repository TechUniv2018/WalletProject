const Models = require('../../models');

const decreaseBalance = (fromId, amt) => new Promise((resolve) => {
  Models.userDetails.findOne({ where: { userId: fromId } })
    .then((userObject) => {
      const newBalance = amt - userObject.balance;
      Models.userDetails.update(
        { balance: newBalance },
        { where: { userId: fromId } },
      )
        .then(() => {
          resolve();
        });
    });
});

const increaseBalance = (currentUserId, amt) => new Promise((resolve) => {
  Models.userDetails.findOne({ where: { userId: currentUserId } })
    .then((userObject) => {
      const newBalance = amt + userObject.balance;
      Models.userDetails.update(
        { balance: newBalance },
        { where: { userId: currentUserId } },
      )
        .then(() => {
          resolve();
        });
    });
});

const transferMoney = (fromId, currentUserId, amt) => new Promise((resolve) => {
  decreaseBalance(fromId, amt).then(() => {
    increaseBalance(currentUserId, amt).then(() => {
      Models.transactions.update({
        status: 'COMPLETED',
      }, {
        where: {
          fromId,
          toId: currentUserId,
        },
      }).then(() => {
        resolve();
      });
    });
  });
});


const cancelTransaction = (fromId, currentUserId) => new Promise((resolve) => {
  // update transaction status in transaction history
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


const handlerFn = (fromId, currentUserId, amt, decision) => new Promise((resolve) => {
  if (decision) {
    transferMoney(fromId, currentUserId, amt).then(() => {
      resolve();
    });
  } else {
    cancelTransaction(fromId, currentUserId).then(() => {
      resolve();
    });
  }
});

module.exports = handlerFn;
