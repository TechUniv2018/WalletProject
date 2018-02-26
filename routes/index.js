const ping = require('./ping');
const userRegistration = require('./userRegister');
const userLogin = require('./userLogin');
const rcvMoney = require('./rcv');
const approve = require('./approve');
const auth = require('./auth');
const history = require('./history');

module.exports = [].concat(ping, userRegistration, userLogin, rcvMoney, approve, auth, history);
