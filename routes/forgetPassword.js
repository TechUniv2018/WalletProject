// routed here when user forgets his password and he has already recieved OTP/token
const sendMessage = require('./handler/sendOTP');
const Models = require('../models');

const getUserData = (userName) => {
  const userInfo = Models.users.findOne({ where: { userName } }).then((userObject) => {
    const userId = userObject.userId;
    Models.userDetails.findOne({ where: { userId } }).then(item => ({
      userId: item.userId,
      userName: item.userName,
      phone: item.userPhone,
    }));
  });
  return userInfo;
};

const otpDB = (userId, otp) => Models.forgetPasswordDB.create({
  userId,
  otp,
  timestamp: Date.now,
});

const timedout = (timestamp) => {
  const currentTime = Date.now;
  const timeDifference = (currentTime - timestamp) / 1000;
  if (timeDifference > 300) {
    return true; // request is timedout
  }

  return false; // request still active
};

const sendOTP = (phone) => {
  const otp = Math.floor(100000 + (Math.random() * 900000));
  // send otp to mobile here
  sendMessage(phone, otp);
  return otp;
};

const verifyOTP = (item, userInfo, rcvdOTP) => {
  if (item.otp === rcvdOTP && !timedout(item.timestamp)) {
    const newPassword = Math.random().toString(36).slice(-8);
    userInfo.password = newPassword;
    // updating DB
    Models.users.update(userInfo, { fields: ['password'] }).then(() => ('Password successfully reset'));
  } else if (timedout(item.timestamp)) { // request timed out
    return ('Request timed out');
  }
  // otp is expired
  return ('OTP is wrong, please try again');
};

module.exports = [{
  method: 'POST',
  path: '/forgetPassword',
  handler: (req, reply) => { // sends OTP to user
    const userName = req.payload.username;
    const userInfo = getUserData(userName);
    const otp = sendOTP(userInfo.phone);
    otpDB(userInfo.userId, otp).then(() => {
      reply('OTP sent on registered mobile');
    });
  },
},
{
  method: 'POST',
  path: '/verifyOTP',
  handler: (req, reply) => {
    const rcvdOTP = req.payload.otp;
    const rcvdId = req.payload.userId;
    let userInfo = {};
    Models.forgetPasswordDB.findOne({ where: { userId: rcvdId } })
      .then((item) => {
        Models.users.findOne({ where: { userId: rcvdId } })
          .then((userItem) => {
            userInfo = userItem;
            const response = verifyOTP(item, userInfo, rcvdOTP);
            reply(response);
          });
      });
  },
}];
