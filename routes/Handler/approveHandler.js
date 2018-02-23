const Models = require('../../models');

const decreaseBalance = (fromId, amt) => new Promise((resolve, reject) => {
  Models.userDetails.findOne({ where: { userId: fromId } })
    .then((userObject) => {
      const newBalance = userObject.balance - amt;
      if (newBalance >= 0) {
        Models.userDetails.update(
          { balance: newBalance },
          { where: { userId: fromId } },
        )
          .then(() => {
            resolve();
          });
      } else {
        reject(new Error('Insufficient Balance'));
      }
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

const transferMoney = (fromId, currentUserId, amt) => new Promise((resolve, reject) => {
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
  }).catch((err) => {
    reject(new Error(err).message);
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
      status: 'PENDING',
    },
  })
    .then(() => {
      resolve();
    });
});


const handlerFn = (fromId, currentUserId, amt, decision) => new Promise((resolve, reject) => {
  if (decision) {
    transferMoney(fromId, currentUserId, amt).then(() => {
      resolve();
    }).catch((err) => {
      Models.transactions.update({
        status: 'FAILED',
      }, {
        where: {
          fromId,
          toId: currentUserId,
          status: 'PENDING',
        },
      }).then(() => {
        reject(new Error(err.message));
      });
    });
  } else {
    cancelTransaction(fromId, currentUserId).then(() => {
      resolve();
    });
  }
});

module.exports = handlerFn;
