const axios = require("axios");
const { getToken } = require("../../kits/index");

/** 获取企业的jsapi_ticket
 * https://developer.work.weixin.qq.com/document/path/90506#%E8%8E%B7%E5%8F%96%E4%BC%81%E4%B8%9A%E7%9A%84jsapi-ticket
 * @param {
 *  corpid: String 企业微信ID
 *  corpsecret: String 企业应用秘钥
 * }
 */
const getJsapiTicket = async (req, res) => {
  try {
    const {
      corpid = "ww12eda987cc5346cd",
      corpsecret = "B-ieE-K8UNEf8Nc0vgx6Qmuu7MiWDKmvz7qqjzrAfuY",
    } = req.query || {};
    const access_token = await getToken(corpid, corpsecret);
    console.log("getJsapiTicket Params", access_token, req);
    axios
      .get(
        `https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token=${access_token}`
      )
      .then((resAxios) => {
        const { data } = resAxios;
        console.log("getJsapiTicket res", data);
        res.json({ body: data });
      })
      .catch((err) => {
        // console.log("getJsapiTicket Error", err);
        res.json({ body: err });
      });
  } catch (error) {
    console.log("getJsapiTicket Error", error);
    res.json({ body: error });
  }
};

module.exports = getJsapiTicket;
