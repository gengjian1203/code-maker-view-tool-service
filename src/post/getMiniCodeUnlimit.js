const axios = require("axios");
const { getTokenMini } = require("../../kits/index");

/** 获取无限制的微信小程序码
 * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/qr-code/wxacode.getUnlimited.html
 * @param {
 *  scene: String 最大32个可见字符，只支持数字，大小写英文以及部分特殊字符：!#$&'()*+,/:;=?@-._~，其它字符请自行编码为合法字符（因不支持%，中文无法使用 urlencode 处理，请使用其他编码方式）
 *  page: String 页面 page，例如 pages/index/index，根路径前不要填加 /，不能携带参数（参数请放在scene字段里），如果不填写这个字段，默认跳主页面
 *  env_version: String 要打开的小程序版本。正式版为 release，体验版为 trial，开发版为 develop
 *  width: Number 二维码的宽度，单位 px，最小 280px，最大 1280px
 *  auto_color: Boolean 自动配置线条颜色，如果颜色依然是黑色，则说明不建议配置主色调，默认 false
 *  line_color: Object auto_color 为 false 时生效，使用 rgb 设置颜色 例如 {"r":"xxx","g":"xxx","b":"xxx"} 十进制表示
 *  is_hyaline: Boolean 是否需要透明底色，为 true 时，生成透明底色的小程序
 * }
 */
const getMiniCodeUnlimit = async (req, res) => {
  try {
    const {} = req.body || {};
    console.log("getMiniCodeUnlimit Params", req.body);

    const data = req.body;
    const access_token = await getTokenMini(appid, secret);

    axios
      .post(
        `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${access_token}`,
        data
      )
      .then((resAxios) => {
        const { data } = resAxios;
        console.log("getMiniCodeUnlimit res", data);
        res.json({ body: data });
      })
      .catch((err) => {
        // console.log("getMiniCodeUnlimit Error", err);
        res.json({ body: err });
      });
  } catch (error) {
    console.log("getMiniCodeUnlimit Error", error);
    res.json({ body: error });
  }
};

module.exports = getMiniCodeUnlimit;
