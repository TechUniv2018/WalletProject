// sends OTP on user mobile  number;

const Twilio = require('twilio');
// const phone = ;
// const sendOTP = (phone, otp) => {
const accountSid = 'AC1a67d02ea00f6a0f7f0cb7373951f48f'; // Your Account SID from www.twilio.com/console
const authToken = 'fd4ab3bca93f37d097252d290d8d0730'; // Your Auth Token from www.twilio.com/console

const client = new Twilio(accountSid, authToken);
const otp = Math.floor(100000 + (Math.random() * 900000));
client.messages.create({
  body: `Testing OTP: ${otp}`,
  to: '+918608520202', // Text this number
  from: '+19182057778', // From a valid Twilio number
})
  .then(() => console.log('Completed'))
  .catch(err => console.log(err));
// };
