const ping = require('./ping');

const send = require('./send');
const request = require('./request');

const userRegistration = require('./userRegister');
const userLogin = require('./userLogin');
const auth = require('./auth');
const history = require('./history');
const contacts = require('./contacts');

module.exports = [].concat(ping, userRegistration, userLogin, auth, history, contacts, send, request);
