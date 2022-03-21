const axios = require("axios");

// 获取token的函数，内部试用是统一的
let token_global = {};

const getToken = (corpid, corpsecret) => {
  console.log("getToken", corpid, corpsecret);
  return new Promise((resolve, reject) => {
    if (token_global[corpid]) {
      console.log("getToken1");
      resolve(token_global[corpid]);
    } else {
      console.log("getToken2");
      // 已过期重新获取
      axios
        .get(
          `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${corpid}&corpsecret=${corpsecret}`
        )
        .then((res) => {
          console.log("getToken3", res.data);
          const { access_token, expires_in } = res.data || {};

          token_global[corpid] = access_token;
          // 有效期倒计时，刷新token过期状态
          setTimeout(() => {
            token_global[corpid] = null;
          }, expires_in * 1000);
          resolve(token_global[corpid]);
        })
        .catch((err) => {
          reje(err);
        });
    }
  });
};

module.exports = getToken;
