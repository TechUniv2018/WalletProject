const ping = require('./ping');
const userRegistration = require('./userRegister');
const userLogin = require('./userLogin');
const auth = require('./auth');
const contacts = require('./contacts');

module.exports = [].concat(ping, userRegistration, userLogin, auth, contacts);
