const axios = require("axios");
const { getTokenAccounts } = require("../../kits/index");

/** 获取公众号的jsapi_ticket
 * https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#62
 * @param {
 *  appid: String 第三方用户唯一凭证
 *  secret: String 第三方用户唯一凭证密钥，即appsecret
 * }
 */
const getJsapiTicketAccounts = async (req, res) => {
  try {
    const {
      appid = "wx0817d49f468d5233",
      secret = "9ff851b97b0c314f1082aede0a084577",
    } = req.query || {};
    const access_token = await getTokenAccounts(appid, secret);
    console.log("getJsapiTicketAccounts Params", access_token, req.query);
    axios
      .get(
        `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`
      )
      .then((resAxios) => {
        const { data } = resAxios;
        console.log("getJsapiTicketAccounts res", data);
        res.json({ body: data });
      })
      .catch((err) => {
        // console.log("getJsapiTicketAccounts Error", err);
        res.json({ body: err });
      });
  } catch (error) {
    console.log("getJsapiTicketAccounts Error", error);
    res.json({ body: error });
  }
};

module.exports = getJsapiTicketAccounts;
