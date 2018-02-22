const Joi = require('joi');

const registerValidation = Joi.object({
  firstName: Joi.string().min(3).max(15).regex(/^[a-z]+$/i)
    .example('Jane'),
  lastName: Joi.string().min(3).max(15).regex(/^[a-z]*$/i)
    .example('Doe'),
  aadharNo: Joi.number().positive().integer().example(1111111111),
  phone: Joi.string().min(10).max(10).regex(/^[0-9]*$/i)
    .example('2222222222'),
  accountNo: Joi.string().min(10).max(20).regex(/^[0-9]*$/i)
    .example('3333333333'),
  userName: Joi.string().min(5).max(15).regex(/^[a-z][a-z0-9_]*$/i)
    .example('Jane_Doe'),
  password: Joi.string().min(4).max(20).example('password'),
});

module.exports = registerValidation;
