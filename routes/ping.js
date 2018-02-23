module.exports = {
  method: 'GET',
  path: '/ping',
  config: {
    auth: false,
    handler: (request, response) => {
      response('pong');
    },
  },
};
