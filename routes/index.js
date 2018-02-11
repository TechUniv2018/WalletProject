const ping = require('./ping');
const loginvalidate = require('./loginvalidate');
const registerValidation = require('./registerValidation');
const userRegistration = require('./userRegister');

module.exports = [].concat(ping, loginvalidate, registerValidation, userRegistration);
