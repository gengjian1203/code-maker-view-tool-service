const formidable = require("formidable");
const fs = require("fs");
const tinify = require("tinify");
const mineType = require("mime-types");

/** tinify压缩图片接口
 * https://tinify.cn/developers
 * https://tinify.cn/dashboard/api
 * 素材上传得到media_id，该media_id仅三天内有效 media_id只能是对应上传文件的机器人可以使用
 * @param {
 *  image: File 图片文件
 * }
 * 内容类型为multipart/form-data
 */
const tinifyImage = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        throw err;
      }
      console.log("fields", fields); // 表单传递的正常数据
      console.log("files", files); // 上传文件数据

      const {} = fields || {};
      const { image = {} } = files || {};
      const {
        filepath = "",
        newFilename = "",
        originalFilename = "",
      } = image || {};
      tinify.key = "DtQ8xKcYpsJfswGTFXw2hMnhqmh06mv5";

      const compressFilename = `Compress_${originalFilename}`;
      const newPath = filepath.replace(newFilename, originalFilename);
      const newPathCompress = filepath.replace(newFilename, compressFilename);
      fs.rename(filepath, newPath, (err) => {});

      // const formData = new FormData();
      // formData.append("media", fs.createReadStream(newPath));

      console.log("formData", image, newPath);

      tinify
        .fromFile(newPath)
        .toFile(newPathCompress)
        .then(() => {
          console.log("tinify ok:%s", newPathCompress);

          const imageData = fs.readFileSync(newPathCompress);
          if (!imageData) {
            return res.json({ body: "" });
          }
          const bufferData = Buffer.from(imageData).toString("base64");
          const base64 =
            "data:" +
            mineType.lookup(newPathCompress) +
            ";base64," +
            bufferData;

          res.json({
            body: {
              errcode: 0,
              filename: compressFilename,
              data: base64,
            },
          });
          fs.unlinkSync(`${newPath}`);
          fs.unlinkSync(`${newPathCompress}`);
        })
        .catch((err) => {
          console.log("tinify err:%s", err);
          res.json({ body: err });
          fs.unlinkSync(`${newPath}`);
          fs.unlinkSync(`${newPathCompress}`);
        });
    });
  } catch (error) {
    console.log("tinifyImage Error", error);
    res.json({ body: error });
  }
};

module.exports = tinifyImage;
