const pusher = require('../utils/pusher');

module.exports = {
  method: 'GET',
  path: '/ping',
  config: {
    auth: false,
  },
  handler: (request, response) => {
    pusher.trigger('my-channel', 'my-event', {
      message: 'hello world',
    });
    response('pong');
  },

};
