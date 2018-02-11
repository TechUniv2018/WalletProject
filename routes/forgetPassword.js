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
            oldPassword: userObject.password,
          });
        });
    });
});

const otpDB = (userId, otp) => new Promise((resolve) => {
  Models.forgotpasswords.create({
    userId,
    otp,
    timestamp: Date.now().toString(),
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

const verifyOTP = (userInfo, otpEntry, rcvdOTP) => {
  if (otpEntry.otp === parseInt(rcvdOTP) && !timedout(otpEntry.timestamp)) {
    const newPassword = Math.random().toString(36).slice(-8);
    const userInfoNew = {
      userId: userInfo.userId,
      userName: userInfo.userName,
      password: newPassword,
    };
    // updating DB
    Models.users.update(
      { password: userInfoNew.password },
      { where: { userId: userInfoNew.userId } },
    )
      .then(() => {
        console.log('here');
        return 'Password successfully reset';
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (!timedout(otpEntry.timestamp)) { // otp is wrong
    return ('OTP is wrong, please try again');
  }
  // otp expired
  return ('Request Timed out');
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
    const rcvdName = req.payload.userName;
    getUserData(rcvdName).then((userInfo) => { // get userId through userName
      console.log(userInfo);
      Models.forgotpasswords.findAll({ // Get latest otp info
        where: { userId: userInfo.userId },
        limit: 1,
        order: [['createdAt', 'DESC']],
      }).then((entry) => {
        const otpEntry = entry[0].dataValues;
        const response = verifyOTP(userInfo, otpEntry, rcvdOTP);
        reply(response);
      });
    });
  },
}];
