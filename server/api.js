"use strict";
// const models = require('./db');
const models = require('./dbase');
const express = require('express');
const router = express.Router();
const redisdb = require('./redis')
const utils = require('./utils')
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/nodeServer";
/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

// 创建账号接口
router.post('/login/createAccount', (req, response) => {
  let account = req.body.account
  console.log(req.body)
  console.log(account)
  // 先查找数据库中有没有账户
  models.mongoBase('find', {
    name: account.name
  }, function (errf, resf) {
    if (errf) throw errf;
    if (resf.length > 0) {
      response.send('账户已经存在')
    } else {
      models.mongoBase('insert', account, function (err, res) {
        if (err) throw err;
        console.log('创建账户成功')
        response.send('createAccount successed')
      })
    }
  })

});

/**
 * 第一次请求
 * 获取公钥1
 * 存入redis中
 */

router.post('/getkey', (req, response) => {
  // 生成 RSA
  const RSAeys = utils.creatRSA()
  const key = utils.random_str(10) // 获取一个长度为10的 随机字符串作为key键
  redisdb.setStr(key, RSAeys.prikey, 300) // 将私钥匙保存 生存时间为5分钟
  response.send({
    key: key, // 查询键(将ip作为查询键是不不错的选择)
    pubkey: RSAeys.pubkey //将公钥给客户端
  })
})

// 获取已有账号接口
router.post('/login/getAccount', (req, response) => {
  // console.log(utils.getClientIp(req)) // 拿到客户端ip作为redis的key键? ip为:127.0.0.1 nginx反向代理问题 先不用ip作为key
  // 先拿到key 和 加密account
  let pubkey2 = req.body.pubkey
  // 解密
  redisdb.getStr(req.body.key,function (val) {
    if (!val) {
      response.send({
        status: '11',
        msg: "登录超时。"
      })
    } else {
      let prikey = val;
      // 解密
      let account = JSON.parse(utils.deRSA(prikey, req.body.account))
      models.mongoBase('find', account, function (err, res) {
        if (err) throw err;
        console.log(res)
        if (res.length > 0) {
          // 设计一个token:用户名+时间戳+5为随机字符串
          let token = account.name + (new Date()).getTime() + utils.random_str(5)
          //TODO

          response.send('登录成功!')
        } else {
          response.send('账户或则密码错误!')
        }
      })
    }
  })

});



module.exports = router
