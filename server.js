const Hapi = require('hapi');
const secret = require('./secret');
const Routes = require('./routes');
const Jwt = require('hapi-auth-jwt2');
const Model = require('./models');
const validate = require('./validate');

const server = new Hapi.Server();

server.connection({
  port: 3001,
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

server.start(() => {
  console.log(`Server started at ${server.info.uri}`);
});

module.exports = server;
