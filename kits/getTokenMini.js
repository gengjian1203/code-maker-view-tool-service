const axios = require("axios");

// 获取token的函数，内部试用是统一的
let token_mini_global = {};

/** 获取微信小程序的access_token
 * https://developer.work.weixin.qq.com/document/path/91039
 * @param {
 *  appid: String 小程序ID
 *  secret: String 小程序秘钥
 * }
 */
const getTokenMini = (appid, secret) => {
  console.log("getTokenMini", appid, secret, token_mini_global);
  return new Promise((resolve, reject) => {
    if (token_mini_global[`${appid}_${secret}`]) {
      console.log("getTokenMini1");
      resolve(token_mini_global[`${appid}_${secret}`]);
    } else {
      console.log("getTokenMini2");
      // 已过期重新获取
      axios
        .get(
          `https://api.weixin.qq.com/cgi-bin/token` +
            `?grant_type=client_credential` +
            `&appid=${appid}` +
            `&secret=${secret}`
        )
        .then((res) => {
          console.log("getTokenMini3", res.data);
          const { access_token, expires_in } = res.data || {};

          token_mini_global[`${appid}_${secret}`] = access_token;
          // 有效期倒计时，刷新token过期状态
          setTimeout(() => {
            token_mini_global[`${appid}_${secret}`] = null;
          }, expires_in * 1000);
          resolve(token_mini_global[`${appid}_${secret}`]);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};

module.exports = getTokenMini;
