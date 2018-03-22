const server = require('../../server');

const userId = 1;
const userName = 'John_Doe';

describe('GET contacts list', () => {
  test('should get 401 status code if passed without auth', (done) => {
    const request = {
      method: 'GET',
      url: '/contacts/getAllContacts',
    };
    server.inject(request, (reply) => {
      expect(reply.statusCode).toEqual(401);
      done();
    });
  });

  test('should get 200 status code if passed with auth', (done) => {
    const request = {
      method: 'GET',
      url: '/contacts/getAllContacts',
      credentials: { userId, userName },
    };
    server.inject(request, (reply) => {
      expect(reply.statusCode).toEqual(200);
      done();
    });
  });

  test('should get array of objects on success', (done) => {
    const request = {
      method: 'GET',
      url: '/contacts/getAllContacts',
      credentials: { userId, userName },
    };
    server.inject(request, (reply) => {
      expect.assertions(3);
      expect(reply.result).toBeInstanceOf(Array);
      expect(reply.result[0]).toHaveProperty('id');
      expect(reply.result[0]).toHaveProperty('name');
      done();
    });
  });
});

describe('POST a new contact to the contact list', () => {
  test('should get 401 status code if passed without auth', (done) => {
    const request = {
      method: 'POST',
      url: '/contacts/addContact',
    };
    server.inject(request, (reply) => {
      expect(reply.statusCode).toEqual(401);
      done();
    });
  });

  test('should get 200 status code if passed with auth', (done) => {
    const request = {
      method: 'POST',
      url: '/contacts/addContact',
      credentials: { userId, userName },
      payload: { contact: 'Bob_B' },
    };
    server.inject(request, (reply) => {
      expect(reply.statusCode).toEqual(200);
      done();
    });
  });


  test('should get Successfully on adding a friend', (done) => {
    const request = {
      method: 'POST',
      url: '/contacts/addContact',
      credentials: { userId, userName },
      payload: { contact: 'Bob_B' },
    };
    server.inject(request, (reply) => {
      expect(reply.result.message).toEqual('Successfully added');
      done();
    });
  });

  test('should get error if passing user\'s own id', (done) => {
    const request = {
      method: 'POST',
      url: '/contacts/addContact',
      credentials: { userId, userName },
      payload: { contact: 'John_Doe' },
    };
    server.inject(request, (reply) => {
      expect.assertions(2);
      expect(reply.result.message).toEqual('Can\'t add yourself');
      expect(reply.statusCode).toEqual(400);
      done();
    });
  });

  test('should get error if passsing non-existent id', (done) => {
    const request = {
      method: 'POST',
      url: '/contacts/addContact',
      credentials: { userId, userName },
      payload: { contact: 'potato' },
    };
    server.inject(request, (reply) => {
      expect.assertions(2);
      expect(reply.result.message).toEqual('User doesn\'t exist');
      expect(reply.statusCode).toEqual(400);
      done();
    });
  });
});
