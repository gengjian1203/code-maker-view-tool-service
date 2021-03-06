const axios = require("axios");
const formidable = require("formidable");
const FormData = require("form-data");
var fs = require("fs");
const { getToken } = require("../../kits/index");

/** 上传临时素材
 * https://developer.work.weixin.qq.com/document/path/90253
 * https://open.work.weixin.qq.com/wwopen/devtool/interface?doc_id=10112
 * 素材上传得到media_id，该media_id仅三天内有效 media_id在同一企业内应用之间可以共享
 * 所有文件size必须大于5个字节
 * 图片（image）：10MB，支持JPG,PNG格式
 * 语音（voice） ：2MB，播放长度不超过60s，仅支持AMR格式
 * 视频（video） ：10MB，支持MP4格式
 * 普通文件（file）：20MB
 * @param {
 *  corpid: String 企业微信ID
 *  corpsecret: String 企业应用秘钥
 *  accessToken: String 登录凭证
 *  type: String 媒体文件类型 分别有图片(image)、语音(voice)、视频(video)、普通文件(file)
 *  media: File 媒体文件，内应包含有 filename、filelength、content-type等信息
 * }
 * corpid/corpsecret 与 accessToken 二选一传入, 全部传参则取accessToken
 * 内容类型为multipart/form-data
 */
const uploadQwMediaTmp = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        throw err;
      }
      console.log("fields", fields); // 表单传递的正常数据
      console.log("files", files); // 上传文件数据

      const {
        corpid = "ww12eda987cc5346cd",
        corpsecret = "B-ieE-K8UNEf8Nc0vgx6Qmuu7MiWDKmvz7qqjzrAfuY",
        accessToken = "",
        type = "file",
      } = fields || {};
      const { media = {} } = files || {};
      const {
        filepath = "",
        newFilename = "",
        originalFilename = "",
      } = media || {};

      const access_token = accessToken
        ? accessToken
        : await getToken(corpid, corpsecret);

      const newPath = filepath.replace(newFilename, originalFilename);
      fs.rename(filepath, newPath, (err) => {});

      const formData = new FormData();
      formData.append("media", fs.createReadStream(newPath));

      // console.log("formData", media, formData);

      axios
        .post(
          `https://qyapi.weixin.qq.com/cgi-bin/media/upload?access_token=${access_token}&type=${type}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        .then((resAxios) => {
          const { data } = resAxios;
          console.log("uploadQwMediaTmp res", data, newPath);
          // 删除临时文件
          fs.unlinkSync(`${newPath}`);

          res.json({ body: data });
        });
    });
  } catch (error) {
    console.log("uploadQwMediaTmp Error", error);
    res.json({ body: error });
  }
};

module.exports = uploadQwMediaTmp;
