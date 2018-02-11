const Hapi = require('hapi');
const secret = require('./secret');
const Routes = require('./routes');
const Jwt = require('hapi-auth-jwt');

const server = new Hapi.Server();

server.connection({
  port: 3001,
  host: 'localhost',
});

server.route(Routes);
server.register(Jwt);
server.auth.strategy('jwt', 'jwt', 'required', {
  key: secret,
  verifyOptions: {
    algorithms: ['HS256'],
  },
});

server.start(() => {
  console.log(`Server started at ${server.info.uri}`);
});

module.exports = server;
