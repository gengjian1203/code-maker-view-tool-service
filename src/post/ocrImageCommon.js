const axios = require("axios");
const formidable = require("formidable");
const FormData = require("form-data");
var fs = require("fs");

const { getTokenMini } = require("../../kits/index");

/** 本接口提供基于小程序的通用印刷体 OCR 识别
 * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/ocr/ocr.printedText.html
 * https://fuwu.weixin.qq.com/service/detail/000ce4cec24ca026d37900ed551415
 * @param {
 *  appid: String 小程序ID
 *  secret: String 小程序秘钥
 *  accessToken: String 登录凭证
 *  img: File 图片文件
 * }
 * 内容类型为multipart/form-data
 */
const ocrImageCommon = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        throw err;
      }
      console.log("fields", fields); // 表单传递的正常数据
      // console.log("files", files); // 上传文件数据

      const {
        appid = "wx821aadcd431646f9",
        secret = "e5956733eb6411a8998e002c1bbd5054",
        accessToken = "",
      } = fields || {};
      const { img = {} } = files || {};
      const {
        filepath = "",
        newFilename = "",
        originalFilename = "",
      } = img || {};

      const newPath = filepath.replace(newFilename, originalFilename);
      fs.rename(filepath, newPath, (err) => {});

      const formData = new FormData();
      formData.append("img", fs.createReadStream(newPath));

      const access_token = accessToken
        ? accessToken
        : await getTokenMini(appid, secret);

      // console.log("formData", newPath, formData);

      axios
        .post(
          `https://api.weixin.qq.com/cv/ocr/comm` +
            `?access_token=${access_token}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        .then((resAxios) => {
          const { data } = resAxios;
          console.log("ocrImageCommon res", data, newPath);
          // 删除临时文件
          fs.unlinkSync(`${newPath}`);

          res.json({ body: data });
        })
        .catch((err) => {
          console.log("ocrImageCommon err", err);
          res.json({ body: err });
        });
    });
  } catch (error) {
    console.log("ocrImageCommon Error", error);
    res.json({ body: error });
  }
};

module.exports = ocrImageCommon;
