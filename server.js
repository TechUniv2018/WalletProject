const Hapi = require('hapi');
const secret = require('./secret');
const Routes = require('./routes');
const Jwt = require('hapi-auth-jwt2');

const validate = require('./validate');

const server = new Hapi.Server();

server.connection({
  port: 3002,
  host: 'localhost',
});

server.register(Jwt);

server.auth.strategy('jwt', 'jwt', {
  key: secret,
  validateFunc: validate,
  verifyOptions: {
    algorithms: ['HS256'],
  },
});

server.auth.default('jwt');

server.route(Routes);

if (!module.parent) {
  server.start((err) => {
    if (err) { console.log(err); }
    console.log('Server listening on: ');
  });
}

module.exports = server;
