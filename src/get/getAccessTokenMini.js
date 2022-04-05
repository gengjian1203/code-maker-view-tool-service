const { getTokenMini } = require("../../kits/index");

/** 获取小程序的access_token
 * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/access-token/auth.getAccessToken.html
 * @param {
 *  appid: String 小程序ID
 *  secret: String 小程序秘钥
 * }
 */
const getAccessTokenMini = async (req, res) => {
  try {
    const {
      appid = "wx821aadcd431646f9",
      secret = "e5956733eb6411a8998e002c1bbd5054",
    } = req.query || {};
    const access_token = await getTokenMini(appid, secret);
    console.log("getAccessTokenMini Params", access_token, req.query);
    res.json({
      body: {
        access_token: access_token,
      },
    });
  } catch (error) {
    console.log("getAccessTokenMini Error", error);
    res.json({ body: error });
  }
};

module.exports = getAccessTokenMini;
