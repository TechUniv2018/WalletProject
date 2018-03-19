const ping = require('./ping');
const forgetPassword = require('./forgetPassword');
const userRegistration = require('./userRegister');
const userLogin = require('./userLogin');
const auth = require('./auth');
const history = require('./history');

module.exports = [].concat(ping, forgetPassword, userRegistration, userLogin, auth, history);
