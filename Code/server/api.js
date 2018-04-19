"use strict";
const models = require('./db');
const express = require('express');
const router = express.Router();
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const path = require('path');


/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/
router.post("/api/match", function(req, res) {
  res.send({errorCode:0,restbody:"匹配成功"})
})

module.exports = router;