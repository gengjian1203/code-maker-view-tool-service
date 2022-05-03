const axios = require("axios");
const { getTokenAccounts } = require("../../kits/index");

/** 获取微信公众号的access_token
 * https://developer.work.weixin.qq.com/document/path/91039
 * @param {
 *  appid: String 第三方用户唯一凭证
 *  secret: String 第三方用户唯一凭证密钥，即appsecret
 * }
 */
const getAccessTokenAccounts = async (req, res) => {
  try {
    const {
      corpid = "wx0817d49f468d5233",
      corpsecret = "9ff851b97b0c314f1082aede0a084577",
    } = req.query || {};
    const access_token = await getTokenAccounts(corpid, corpsecret);
    console.log("getAccessTokenAccounts Params", access_token, req.query);
    res.json({
      body: {
        access_token: access_token,
      },
    });
  } catch (error) {
    console.log("getAccessTokenAccounts Error", error);
    res.json({ body: error });
  }
};

module.exports = getAccessTokenAccounts;
