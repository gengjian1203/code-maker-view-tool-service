const axios = require("axios");

// 获取token的函数，内部试用是统一的
let token_global = {};

/** 获取企业微信的access_token
 * https://developer.work.weixin.qq.com/document/path/91039
 * @param {
 *  corpid: String 企业微信ID
 *  corpsecret: String 企业应用秘钥
 * }
 */
const getToken = (corpid, corpsecret) => {
  console.log("getToken", corpid, corpsecret, token_global);
  return new Promise((resolve, reject) => {
    if (token_global[`${corpid}_${corpsecret}`]) {
      console.log("getToken1");
      resolve(token_global[`${corpid}_${corpsecret}`]);
    } else {
      console.log("getToken2");
      // 已过期重新获取
      axios
        .get(
          `https://qyapi.weixin.qq.com/cgi-bin/gettoken` +
            `?corpid=${corpid}` +
            `&corpsecret=${corpsecret}`
        )
        .then((res) => {
          console.log("getToken3", res.data);
          const { access_token, expires_in } = res.data || {};

          token_global[`${corpid}_${corpsecret}`] = access_token;
          // 有效期倒计时，刷新token过期状态
          setTimeout(() => {
            token_global[`${corpid}_${corpsecret}`] = null;
          }, expires_in * 1000);
          resolve(token_global[`${corpid}_${corpsecret}`]);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};

module.exports = getToken;
