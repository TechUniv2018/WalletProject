const ping = require('./ping');
const userRegistration = require('./userRegister');
const userLogin = require('./userLogin');
const auth = require('./auth');

module.exports = [].concat(ping, userRegistration, userLogin, auth);
