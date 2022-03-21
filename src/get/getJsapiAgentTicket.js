const axios = require("axios");
const { getToken } = require("../../kits/index");

/** 获取应用的jsapi_ticket
 * https://developer.work.weixin.qq.com/document/path/90506#%E8%8E%B7%E5%8F%96%E5%BA%94%E7%94%A8%E7%9A%84jsapi-ticket
 * @param {
 *  corpid: String 企业微信ID
 *  corpsecret: String 企业应用秘钥
 * }
 */
const getJsapiAgentTicket = async (req, res) => {
  try {
    const {
      corpid = "ww12eda987cc5346cd",
      corpsecret = "B-ieE-K8UNEf8Nc0vgx6Qmuu7MiWDKmvz7qqjzrAfuY",
    } = req.query || {};
    const access_token = await getToken(corpid, corpsecret);
    console.log("getJsapiAgentTicket Params", access_token, req);
    axios
      .get(
        `https://qyapi.weixin.qq.com/cgi-bin/ticket/get?access_token=${access_token}&type=agent_config`
      )
      .then((resAxios) => {
        const { data } = resAxios;
        console.log("getJsapiAgentTicket res", data);
        res.json({ body: data });
      })
      .catch((err) => {
        console.log("getJsapiAgentTicket Error", err);
      });
  } catch (error) {
    console.log("getJsapiAgentTicket Error", error);
  }
};

module.exports = getJsapiAgentTicket;
