const ping = require('./ping');
const { route: userRegistration } = require('./userRegister');
const userLogin = require('./userLogin');

module.exports = [].concat(ping, userRegistration, userLogin);
