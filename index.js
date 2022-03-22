// const axios = require("axios");
// const path = require("path");
const bodyParser = require("body-parser");
// const multer = require("multer"); // v1.0.5
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
// const { init: initDB, Counter } = require("./db");
const fetchGet = require("./src/get/index");
const fetchPost = require("./src/post/index");

const app = express();
const logger = morgan("tiny");
// const upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); //数据JSON类型
app.use(bodyParser.urlencoded({ extended: true })); //解析post请求数据
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger);
app.use((req, res, next) => {
  //设置请求头
  res.set({
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Max-Age": 1728000,
    "Access-Control-Allow-Origin": req.headers.origin || "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
    "Content-Type": "application/json; charset=utf-8",
  });
  req.method === "OPTIONS" ? res.status(204).end() : next();
});

const host = "http://localhost";
const port = process.env.PORT || 80;
const urlBase = `${host}:${port}`;

Object.keys(fetchGet).map((key) => {
  const api = `/api/get/${key}`;
  console.log("reg fetchGet", `${urlBase}${api}`, fetchGet[key]);
  app.get(api, fetchGet[key]);
});

Object.keys(fetchPost).map((key) => {
  const api = `/api/post/${key}`;
  console.log("reg fetchPost", `${urlBase}${api}`, fetchPost[key]);
  app.post(api, fetchPost[key]);
});

const bootstrap = async () => {
  // await initDB();
  app.listen(port, () => {
    console.log(`启动成功：${urlBase}`);
  });
};

bootstrap();
