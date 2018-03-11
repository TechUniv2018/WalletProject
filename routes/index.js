const ping = require('./ping');

const send = require('./send');
const request = require('./request');

const userRegistration = require('./userRegister');
const forgetPassword = require('./forgetPassword');
const userLogin = require('./userLogin');
const approve = require('./approve');
const auth = require('./auth');
const history = require('./history');
const category = require('./category');
const contacts = require('./contacts');
const details = require('./details');

module.exports = [].concat(
  ping,
  userRegistration,
  userLogin,
  auth,
  history,
  category,
  contacts,
  send,
  request,
  forgetPassword,
  details,
  approve,
);
