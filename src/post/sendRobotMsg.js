const axios = require("axios");

/** 企微群机器人发消息
 * https://developer.work.weixin.qq.com/document/path/91770
 * @param {
 *  webhook: String 机器人的webhook地址
 *  data: Object 消息类型及数据
 * }
 */
const sendRobotMsg = async (req, res) => {
  try {
    const { webhook = "/", data = {} } = req.body || {};
    console.log("sendRobotMsg Params", req);
    axios
      .post(webhook, data)
      .then((resAxios) => {
        const { data } = resAxios;
        console.log("sendRobotMsg res", data);
        res.json({ body: data });
      })
      .catch((err) => {
        // console.log("sendRobotMsg Error", err);
      });
  } catch (error) {
    console.log("sendRobotMsg Error", error);
  }
};

module.exports = sendRobotMsg;
