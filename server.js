const Hapi = require('hapi');
<<<<<<< HEAD
// const secret = require('./secret');
const Routes = require('./routes');
// const Jwt = require('hapi-auth-jwt2');

const validate = require('./validate');

const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
=======
const secret = require('./secret');
const Routes = require('./routes');
const Jwt = require('hapi-auth-jwt2');

const validate = require('./validate');
>>>>>>> user-authentication

const server = new Hapi.Server();

server.connection({
  port: 3002,
  host: 'localhost',
});

<<<<<<< HEAD
const options = {
  info: {
    title: 'Wallet Documentation',
    version: '1.0',
  },
};

server.register([
  // Jwt,
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

// server.auth.strategy('jwt', 'jwt', {
//   key: secret,
//   validateFunc: validate,
//   verifyOptions: {
//     algorithms: ['HS256'],
//   },
// });

// server.auth.default('jwt');
=======
server.register(Jwt);

server.auth.strategy('jwt', 'jwt', {
  key: secret,
  validateFunc: validate,
  verifyOptions: {
    algorithms: ['HS256'],
  },
});

server.auth.default('jwt');
>>>>>>> user-authentication

server.route(Routes);

if (!module.parent) {
<<<<<<< HEAD
  server.start((err) => {
    if (err) throw (err);
    console.log('Server running at:', server.info.uri);
  });
=======
  server.start();
>>>>>>> user-authentication
}

module.exports = server;
