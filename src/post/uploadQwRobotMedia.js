const axios = require("axios");
const formidable = require("formidable");
const FormData = require("form-data");
var fs = require("fs");

/** 企微机器人文件上传接口
 * https://developer.work.weixin.qq.com/document/path/91770#%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%8E%A5%E5%8F%A3
 * 素材上传得到media_id，该media_id仅三天内有效 media_id只能是对应上传文件的机器人可以使用
 * @param {
 *  key: String 企业微信ID
 *  type: String 媒体文件类型 分别有图片(image)、语音(voice)、视频(video)、普通文件(file)
 *  media: File 媒体文件，内应包含有 filename、filelength、content-type等信息
 * }
 * 内容类型为multipart/form-data
 */
const uploadQwRobotMedia = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        throw err;
      }
      console.log("fields", fields); // 表单传递的正常数据
      console.log("files", files); // 上传文件数据

      const { key = "", type = "file" } = fields || {};
      const { media = {} } = files || {};
      const {
        filepath = "",
        newFilename = "",
        originalFilename = "",
      } = media || {};

      const newPath = filepath.replace(newFilename, originalFilename);
      fs.rename(filepath, newPath, (err) => {});

      const formData = new FormData();
      formData.append("media", fs.createReadStream(newPath));

      console.log("formData", media, newPath);

      axios
        .post(
          `https://qyapi.weixin.qq.com/cgi-bin/webhook/upload_media?key=${key}&type=${type}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        .then((resAxios) => {
          const { data } = resAxios;
          console.log("uploadQwRobotMedia res", data, newPath);
          // 删除临时文件
          fs.unlinkSync(`${newPath}`);

          res.json({ body: data });
        });
    });
  } catch (error) {
    console.log("uploadQwRobotMedia Error", error);
    res.json({ body: error });
  }
};

module.exports = uploadQwRobotMedia;
