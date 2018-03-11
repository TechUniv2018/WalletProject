const models = require('../models');
const Sequelize = require('sequelize');

const historySwagger = require('../swagger/routes/history');
const historyHeaderValidation = require('../validations/routes/history');


const getHistory = id => models.transactions.findAll({
  attributes: ['transactionId', 'fromId', 'toId', 'amount', 'reason', 'status', 'timeStamp', 'category', 'type'],
  where: {
    [Sequelize.Op.or]: [{ fromId: id }, { toId: id }],
  },
}).then((result) => {
  const resultArrPromise = [];
  const detailsArr = [];
  result.forEach((transaction) => {
    detailsArr.push(transaction.get({ plain: true }));
    resultArrPromise.push(models.users.findOne({ where: { userId: transaction.fromId } }));
    resultArrPromise.push(models.users.findOne({ where: { userId: transaction.toId } }));
  });

  return Promise.all(resultArrPromise).then((resultArr) => {
    for (let transactionNo = 0; transactionNo < result.length; transactionNo += 1) {
      detailsArr[transactionNo].fromName = resultArr[transactionNo * 2].userName;
      detailsArr[transactionNo].toName = resultArr[(transactionNo * 2) + 1].userName;
    }

    return detailsArr;
  });
});


module.exports = {
  method: 'GET',
  path: '/transactions/history',
  config: {
    auth: 'jwt',
    tags: ['api'],
    description: 'Get Transaction history for  current user',
    notes: 'Get All transaction history for current user',
    plugins: {
      'hapi-swagger': historySwagger,
    },
    validate: {
      headers: historyHeaderValidation,
    },
  },
  handler: (request, response) => {
    getHistory(request.auth.credentials.userId).then((history) => {
      response({
        statusCode: 200,
        history,
      });
    });
  },
};
