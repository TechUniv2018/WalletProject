const models = require('../models');
const Sequelize = require('sequelize');

const getHistory = id => models.transactions.findAll({
  where: {
    [Sequelize.Op.or]: [{ fromId: id }, { toId: id }],
  },
});

module.exports = {
  method: 'GET',
  path: '/transactions/history',
  config: {
    auth: 'jwt',
    // Include this API in swagger documentation
    tags: ['api'],
    description: 'Get Transaction history',
    notes: 'Get All transaction history',
  },
  handler: (request, response) => {
    getHistory(request.auth.credentials.userId).then((history) => {
      response({
        statusCose: 200,
        history,
      });
    });
  },
};
