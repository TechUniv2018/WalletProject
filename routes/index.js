const ping = require('./ping');
const loginvalidate = require('./loginvalidate');
const registerValidation = require('./registerValidation');
const userRegistration = require('./userRegister');
const userLogin = require('./userLogin');

module.exports = [].concat(ping, loginvalidate, registerValidation, userRegistration, userLogin);
