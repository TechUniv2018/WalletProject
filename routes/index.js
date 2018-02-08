const ping = require('./ping');
const loginvalidate = require('./loginvalidate');
const registerValidation = require('./registerValidation');

module.exports = [].concat(ping).concat(loginvalidate).concat(registerValidation);
