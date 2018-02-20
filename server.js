const Hapi = require('hapi');
const secret = require('./secret');
const Routes = require('./routes');
const Jwt = require('hapi-auth-jwt2');
const socketIo = require('socket.io');
const notifcationHelper = require('./helpers/notification');
const validate = require('./validate');

const server = new Hapi.Server();

server.connection({
  port: 3002,
  host: 'localhost',
  labels: ['notif'],
});
server.select('notif');
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

// Socketio listener
const io = socketIo(server.listener);
io.on('connection', notifcationHelper.onConnection);

if (!module.parent) {
  server.start((err) => {
    if (err) throw (err);
    console.log('Server running at:', server.info.uri);
  });
}

module.exports = server;
