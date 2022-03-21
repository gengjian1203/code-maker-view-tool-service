const axios = require("axios");
const { getToken } = require("../../kits/index");

/** 获取访问用户身份
 * https://developer.work.weixin.qq.com/document/path/91023
 * @param {
 *  corpid: String 企业微信ID
 *  corpsecret: String 企业应用秘钥
 *  code: String code 通过成员授权获取到的code
 * }
 */
const getUserInfo = async (req, res) => {
  try {
    const {
      corpid = "ww12eda987cc5346cd",
      corpsecret = "B-ieE-K8UNEf8Nc0vgx6Qmuu7MiWDKmvz7qqjzrAfuY",
      code = "",
    } = req.query || {};
    const access_token = await getToken(corpid, corpsecret);
    console.log("getUserInfo Params", access_token, req);
    axios
      .get(
        `https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=${access_token}&code=${code}`
      )
      .then((resAxios) => {
        const { data } = resAxios;
        console.log("getUserInfo res", data);
        res.json({ body: data });
      })
      .catch((err) => {
        // console.log("getUserInfo Error", err);
        res.json({ body: err });
      });
  } catch (error) {
    console.log("getUserInfo Error", error);
    res.json({ body: error });
  }
};

module.exports = getUserInfo;
