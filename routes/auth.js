module.exports = {
  method: 'GET',
  path: '/auth',
  handler: (request, response) => {
    response('authorized pong');
  },
};
