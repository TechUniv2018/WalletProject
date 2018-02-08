const server = require('../../server');

describe('check server response code', () => {
  test('Test for successful POST request reply code from the server', (done) => {
    const request = {
      method: 'POST',
      url: '/register/validation',
      payload: JSON.stringify({
        userName: 'Margi_1013', password: '3ngv4@-_cmlve', firstName: 'margi', lastName: 'brahmbhatt', aadharNo: 123456789012, phone: '8141165366', accountNo: '123456789012',
      }),
    };
    server.inject(request, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  test('Test for unsuccessful POST request because firstName can not have anything except char', (done) => {
    const request = {
      method: 'POST',
      url: '/register/validation',
      payload: JSON.stringify({
        userName: 'Margi_1013', password: '3ngv4@-_cmlve', firstName: 'mar93', lastName: 'brahmbhatt', aadharNo: 123456789012, phone: '8141165366', accountNo: '123456789012',
      }),
    };
    server.inject(request, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  test('Test for unsuccessful POST request because lastName can not have anything except char', (done) => {
    const request = {
      method: 'POST',
      url: '/register/validation',
      payload: JSON.stringify({
        userName: 'Margi_1013', password: '3ngv4@-_cmlve', firstName: 'margi', lastName: 'brahmbhatt09', aadharNo: 123456789012, phone: '8141165366', accountNo: '123456789012',
      }),
    };
    server.inject(request, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  test('Test for unsuccessful POST request because aadhar number can not be string', (done) => {
    const request = {
      method: 'POST',
      url: '/register/validation',
      payload: JSON.stringify({
        userName: 'Margi_1013', password: '3ngv4@-_cmlve', firstName: 'margi', lastName: 'brahmbhatt', aadharNo: '123456789012', phone: '8141165366', accountNo: '123456789012',
      }),
    };
    server.inject(request, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });


  test('Test for unsuccessful POST request because phone number must only have numbers', (done) => {
    const request = {
      method: 'POST',
      url: '/register/validation',
      payload: JSON.stringify({
        userName: 'Margi_1013', password: '3ngv4@-_cmlve', firstName: 'margi', lastName: 'brahmbhatt', aadharNo: 123456789012, phone: '8141M15366', accountNo: '123456789012',
      }),
    };
    server.inject(request, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  test('Test for unsuccessful POST request because phone number must only have 10 digits', (done) => {
    const request = {
      method: 'POST',
      url: '/register/validation',
      payload: JSON.stringify({
        userName: 'Margi_1013', password: '3ngv4@-_cmlve', firstName: 'margi', lastName: 'brahmbhatt', aadharNo: 123456789012, phone: '81418815366', accountNo: '123456789012',
      }),
    };
    server.inject(request, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  test('Test for unsuccessful POST request because accountnumber only contains digits', (done) => {
    const request = {
      method: 'POST',
      url: '/register/validation',
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
