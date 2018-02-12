const ping = require('./ping');
const forgetPassword = require('./forgetPassword');

module.exports = [].concat(ping, forgetPassword);
