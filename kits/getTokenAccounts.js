const axios = require("axios");

// 获取token的函数，内部试用是统一的
let token_accounts_global = {};

/** 获取微信公众号的access_token
 * https://developer.work.weixin.qq.com/document/path/91039
 * @param {
 *  appid: String 第三方用户唯一凭证
 *  secret: String 第三方用户唯一凭证密钥，即appsecret
 * }
 */
const getTokenAccounts = (appid, secret) => {
  console.log("getTokenAccounts", appid, secret, token_accounts_global);
  return new Promise((resolve, reject) => {
    if (token_accounts_global[`${appid}_${secret}`]) {
      console.log("getTokenAccounts1");
      resolve(token_accounts_global[`${appid}_${secret}`]);
    } else {
      console.log("getTokenAccounts2");
      // 已过期重新获取
      axios
        .get(
          `https://api.weixin.qq.com/cgi-bin/token` +
            `?grant_type=client_credential` +
            `&appid=${appid}` +
            `&secret=${secret}`
        )
        .then((res) => {
          console.log("getTokenAccounts3", res.data);
          const { access_token, expires_in } = res.data || {};

          token_accounts_global[`${appid}_${secret}`] = access_token;
          // 有效期倒计时，刷新token过期状态
          setTimeout(() => {
            token_accounts_global[`${appid}_${secret}`] = null;
          }, expires_in * 1000);
          resolve(token_accounts_global[`${appid}_${secret}`]);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};

module.exports = getTokenAccounts;
