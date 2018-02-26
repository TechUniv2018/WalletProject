const ping = require('./ping');

const { route: userRegistration } = require('./userRegister');
const userLogin = require('./userLogin');
const send = require('./send');
const request = require('./request');
const auth = require('./auth');
const history = require('./history');

module.exports = [].concat(ping, userRegistration, userLogin, auth, history, send, request);
