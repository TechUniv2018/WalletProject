const ping = require('./ping');

const { route: userRegistration } = require('./userRegister');
const userLogin = require('./userLogin');
const send = require('./send');

module.exports = [].concat(ping, userRegistration, userLogin, send);
