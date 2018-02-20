const notificationContants = require('../constants/notificationContants');

const { emitter, listener } = notificationContants;

const onSomeEvent = (data) => {
  // TODO on this event do something
  console.log(data);
};

const onConnection = (socket) => {
  // Call all emitters and listeners here
  socket.emit(emitter.NEWS, { hello: 'world' });
  socket.on(listener.ON_SOME_EVENT, onSomeEvent);
};

module.exports = {
  onConnection,
};
