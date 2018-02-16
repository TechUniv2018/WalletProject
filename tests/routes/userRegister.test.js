const server = require('../../server');
const bcrypt = require('bcryptjs');
const hashPassword = require('../../utils/hashPassword');

describe('request validation', () => {
  describe('Test for unsuccessful POST request because ', () => {
    test('firstName can not have anything except char', (done) => {
      const request = {
        method: 'POST',
        url: '/users',
        payload: JSON.stringify({
          userName: 'Margi_1013', password: '3ngv4@-_cmlve', firstName: 'mar93', lastName: 'brahmbhatt', aadharNo: 123456789012, phone: '8141165366', accountNo: '123456789012',
        }),
      };
      server.inject(request, (response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
    });

    test('lastName can not have anything except char', (done) => {
      const request = {
        method: 'POST',
        url: '/users',
        payload: JSON.stringify({
          userName: 'Margi_1013', password: '3ngv4@-_cmlve', firstName: 'margi', lastName: 'brahmbhatt09', aadharNo: 123456789012, phone: '8141165366', accountNo: '123456789012',
        }),
      };
      server.inject(request, (response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
    });

    test('aadhar number can not be string', (done) => {
      const request = {
        method: 'POST',
        url: '/users',
        payload: JSON.stringify({
          userName: 'Margi_1013', password: '3ngv4@-_cmlve', firstName: 'margi', lastName: 'brahmbhatt', aadharNo: '12345M6789012', phone: '8141165366', accountNo: '123456789012',
        }),
      };
      server.inject(request, (response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
    });


    test('phone number must only have numbers', (done) => {
      const request = {
        method: 'POST',
        url: '/users',
        payload: JSON.stringify({
          userName: 'Margi_1013', password: '3ngv4@-_cmlve', firstName: 'margi', lastName: 'brahmbhatt', aadharNo: 123456789012, phone: '8141M15366', accountNo: '123456789012',
        }),
      };
      server.inject(request, (response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
    });

    test('phone number must only have 10 digits', (done) => {
      const request = {
        method: 'POST',
        url: '/users',
        payload: JSON.stringify({
          userName: 'Margi_1013', password: '3ngv4@-_cmlve', firstName: 'margi', lastName: 'brahmbhatt', aadharNo: 123456789012, phone: '81418815366', accountNo: '123456789012',
        }),
      };
      server.inject(request, (response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
    });

    test('accountnumber only contains digits', (done) => {
      const request = {
        method: 'POST',
        url: '/users',
        payload: JSON.stringify({
          userName: 'Margi_1013', password: '3ngv4@-_cmlve', firstName: 'margi', lastName: 'brahmbhatt', aadharNo: 123456789012, phone: '8141165366', accountNo: '12345678M9012',
        }),
      };
      server.inject(request, (response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
    });
  });
});

describe('Request Authentication', () => {
  test('should hash the password', (done) => {
    const call = (_, hash) => {
      expect(bcrypt.compareSync('ABC', hash)).toBe(true); done();
    };
    hashPassword('ABC', call);
  });

  test('should return error if username already taken', (done) => {
    const request = {
      method: 'POST',
      url: '/users',
      payload: JSON.stringify({ userName: 'John_Doe', password: 'password' }),
    };

    server.inject(request, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  test('should return error if can not insert to database', (done) => {
    const request = {
      method: 'POST',
      url: '/users',
      payload: JSON.stringify({ userName: 'John_Doe', password: null }),
    };

    server.inject(request, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  test('should return 200 if successfully inserted into db', (done) => {
    const request = {
      method: 'POST',
      url: '/users',
      payload: JSON.stringify({ userName: 'New_Name', password: '123456' }),
    };

    server.inject(request, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});
