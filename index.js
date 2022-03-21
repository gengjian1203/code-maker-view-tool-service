// const axios = require("axios");
// const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
// const { init: initDB, Counter } = require("./db");
const fetchGet = require("./src/get/index");
const fetchPost = require("./src/post/index");

const app = express();
const logger = morgan("tiny");

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

const port = process.env.PORT || 80;

console.log("reg fetchGet", fetchGet);

Object.keys(fetchGet).map((key) => {
  console.log("reg fetchGet", key, fetchGet[key]);
  app.get(`/api/${key}`, fetchGet[key]);
});

Object.keys(fetchPost).map((key) => {
  console.log("reg fetchPost", key, fetchPost[key]);
  app.get(`/api/${key}`, fetchPost[key]);
});

const bootstrap = async () => {
  // await initDB();
  app.listen(port, () => {
    // console.log("启动成功", port);
    console.log(`启动成功：http://localhost:${port}/`);
  });
};

bootstrap();
