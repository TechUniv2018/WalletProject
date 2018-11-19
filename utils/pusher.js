const Pusher = require('pusher');

const secret = require('../secret');

const pusher = new Pusher({
  appId: '489832',
  key: 'cc03634ec726b20a38bf',
  secret: secret.pusher,
  cluster: 'ap2',
  encrypted: true,
});

module.exports = pusher;
