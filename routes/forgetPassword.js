// routed here when user forgets his password

const sendMessage = require('./handler/sendOTP');
const Models = require('../models');

const getUserData = userName => new Promise((resolve) => {
  // const userInfo = {};()
  Models.users.findOne({ where: { userName } }) // Get userId for give username
    .then((userObject) => {
      Models.userDetails.findOne({ where: { userId: userObject.userId } })
        .then((item) => {
          resolve({
            userId: item.userId,
            userName,
            phone: item.phone,
          });
        });
    });
});

const otpDB = (userId, otp) => new Promise((resolve) => {
  Models.forgotpasswords.create({
    userId,
    otp,
    timestamp: Date.now(),
  }).then(() => {
    resolve();
  });
});

const timedout = (timestamp) => {
  const currentTime = Date.now();
  const timeDifference = (currentTime - timestamp) / 1000;
  if (timeDifference > 300) {
    return true; // request is timedout
  }

  return false; // request still active
};

const sendOTP = (phone) => {
  // send otp to mobile here
  const otp = sendMessage(phone);
  return otp;
};

const verifyOTP = (item, userInfo, rcvdOTP) => {
  if (item.otp === rcvdOTP && !timedout(item.timestamp)) {
    const newPassword = Math.random().toString(36).slice(-8);
    const userInfoNew = userInfo;
    userInfoNew.password = newPassword;
    // updating DB
    Models.users.update(userInfoNew, { fields: ['password'] }).then(() => ('Password successfully reset'));
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
    // console.log(userName);
    getUserData(userName).then((userInfo) => {
      // console.log('userInfo: ', userInfo);
      sendOTP(userInfo.phone).then((otp) => {
        otpDB(userInfo.userId, otp).then(() => {
          reply('OTP sent on registered mobile');
        });
      });
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
    Models.forgotpassword.findOne({ where: { userId: rcvdId } })
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
