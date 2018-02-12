const ping = require('./ping');
const userRegistration = require('./userRegister');
const userLogin = require('./userLogin');

module.exports = [].concat(ping, userRegistration, userLogin);
