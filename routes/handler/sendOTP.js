// sends OTP on user mobile  number;
const Models = require('../../models');
const Twilio = require('twilio');

const sendOTP = phone => new Promise((resolve) => {
  const accountSid = 'AC1a67d02ea00f6a0f7f0cb7373951f48f'; // Your Account SID from www.twilio.com/console
  Models.auths.findAll({
    limit: 1,
    order: [['createdAt', 'DESC']],
  })
    .then((entries) => {
      // console.log(entries);
      const authToken = entries[0].dataValues.token;
      console.log('DB updated');
      const client = new Twilio(accountSid, authToken);
      // TODO: Add seed for random
      const otp = Math.floor(100000 + (Math.random() * 900000));

      client.messages.create({
        body: `OTP for BATUA password reset: ${otp}`,
        to: `+91${phone}`, // Text this number
        from: '+19182057778', // From a valid Twilio number
      })
        .then(() => {
          console.log('Completed');
          resolve(otp);
        })
        .catch(err => console.log(err));
    });
});

module.exports = sendOTP;
