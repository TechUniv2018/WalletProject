const ping = require('./ping');
const forgetPassword = require('./forgetPassword');
const { route: userRegistration } = require('./userRegister');
const userLogin = require('./userLogin');

module.exports = [].concat(ping, forgetPassword, userRegistration, userLogin);
