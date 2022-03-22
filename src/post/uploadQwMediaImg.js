const axios = require("axios");
const { getToken } = require("../../kits/index");

/** 企微上传图片
 * https://developer.work.weixin.qq.com/document/path/90256
 * @param {
 *  corpid: String 企业微信ID
 *  corpsecret: String 企业应用秘钥
 * }
 */
const uploadQwMediaImg = async (req, res) => {
  try {
    const {
      corpid = "ww12eda987cc5346cd",
      corpsecret = "B-ieE-K8UNEf8Nc0vgx6Qmuu7MiWDKmvz7qqjzrAfuY",
    } = req.body || {};
    const access_token = await getToken(corpid, corpsecret);
    console.log("uploadQwMediaImg Params", access_token, req.body);
  } catch (error) {
    console.log("uploadQwMediaImg Error", error);
    res.json({ body: error });
  }
};

module.exports = uploadQwMediaImg;
