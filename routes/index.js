const ping = require('./ping');
const { route: userRegistration } = require('./userRegister');
const userLogin = require('./userLogin');
const rcvMoney = require('./rcv');
const approve = require('./approve');

module.exports = [].concat(ping, userRegistration, userLogin, rcvMoney, approve);
