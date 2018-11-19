const Hapi = require('hapi');
const secret = require('./secret.js');
const Routes = require('./routes');

const Jwt = require('hapi-auth-jwt2');
const validate = require('./validate');

const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');

const server = new Hapi.Server();

server.connection({
  port: 3002,
  host: 'localhost',
});

const options = {
  info: {
    title: 'Wallet Documentation',
    version: '1.0',
  },
};

server.register([
  Jwt,
  Inert,
  Vision,
  {
    register: HapiSwagger,
    options,
  }], (err) => {
  if (err) {
    throw err;
  }
});

server.auth.strategy('jwt', 'jwt', {
  key: secret.auth,
  validateFunc: validate,
  verifyOptions: {
    algorithms: ['HS256'],
  },
});

server.auth.default('jwt');

server.route(Routes);

if (!module.parent) {
  server.start((err) => {
    if (err) throw (err);
    console.log('Server running at:', server.info.uri);
  });
}


module.exports = server;
