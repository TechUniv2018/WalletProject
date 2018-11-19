const Models = require('../../models');

const decreaseBalance = (Id, amt) => new Promise((resolve, reject) => {
  Models.userDetails.findOne({ where: { userId: Id } })
    .then((userObject) => {
      const newBalance = userObject.balance - amt;
      if (newBalance >= 0) {
        Models.userDetails.update(
          { balance: newBalance },
          { where: { userId: Id } },
        )
          .then(() => {
            resolve();
          });
      } else {
        reject(new Error('Insufficient Balance'));
      }
    });
});

const increaseBalance = (Id, amt) => new Promise((resolve) => {
  Models.userDetails.findOne({ where: { userId: Id } })
    .then((userObject) => {
      const newBalance = amt + userObject.balance;
      Models.userDetails.update(
        { balance: newBalance },
        { where: { userId: Id } },
      )
        .then(() => {
          resolve();
        });
    });
});

const transferMoney = transactionId => new Promise((resolve, reject) => {
  Models.transactions.findOne({ where: { transactionId } })
    .then((transactionDetails) => {
      const { fromId } = transactionDetails;
      const { amount } = transactionDetails;
      const { toId } = transactionDetails;
      decreaseBalance(toId, amount).then(() => {
        increaseBalance(fromId, amount).then(() => {
          Models.transactions.update({
            status: 'COMPLETED',
          }, {
            where: {
              transactionId,
            },
          }).then(() => {
            resolve();
          });
        });
      }).catch((err) => {
        reject(new Error(err).message);
      });
    });
});


const cancelTransaction = transactionId => new Promise((resolve) => {
  // update transaction status in transaction history
  Models.transactions.update({
    status: 'FAILED',
  }, {
    where: {
      transactionId,
      status: 'PENDING',
    },
  })
    .then(() => {
      resolve();
    });
});


const handlerFn = (transactionId, currentUserId, decision) =>
  new Promise((resolve, reject) => {
    if (decision) {
      transferMoney(transactionId).then(() => {
        resolve();
      }).catch((err) => {
        Models.transactions.update({
          status: 'FAILED',
        }, {
          where: {
            transactionId,
          },
        }).then(() => {
          reject(new Error(err.message));
        });
      });
    } else {
      cancelTransaction(transactionId).then(() => {
        resolve();
      });
    }
  });

module.exports = handlerFn;
