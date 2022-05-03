const axios = require("axios");
const { getToken } = require("../../kits/index");

/** 获取企业微信的access_token
 * https://developer.work.weixin.qq.com/document/path/91039
 * @param {
 *  corpid: String 企业微信ID
 *  corpsecret: String 企业应用秘钥
 * }
 */
const getAccessToken = async (req, res) => {
  try {
    const {
      corpid = "ww12eda987cc5346cd",
      corpsecret = "B-ieE-K8UNEf8Nc0vgx6Qmuu7MiWDKmvz7qqjzrAfuY",
    } = req.query || {};
    const access_token = await getToken(corpid, corpsecret);
    console.log("getAccessToken Params", access_token, req.query);
    res.json({
      body: {
        access_token: access_token,
      },
    });
  } catch (error) {
    console.log("getAccessToken Error", error);
    res.json({ body: error });
  }
};

module.exports = getAccessToken;
