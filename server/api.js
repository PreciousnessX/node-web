"use strict";
// const models = require('./db');
const models = require('./dbase');
const express = require('express');
const router = express.Router();
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/nodeServer";
/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

// 创建账号接口
router.post('/login/createAccount', (req, response) => {

  let body = req.body
  let newAccount = {
    account: body.name,
    password: body.passWord
  }
  // 先查找数据库中有没有账户
  models.mongoBase('find', {
        account: body.name
      }, function (errf, resf) {
    if (errf) throw errf;
      console.log(resf.length)
      if (resf.length > 0) {
        response.send('账户已经存在')
      } else { 
        models.mongoBase('insert', newAccount, function (err, res) {
          if (err) throw err;
          console.log(res)
          console.log('创建账户成功')
          response.send('createAccount successed')
        })
      }
  })
  


  // MongoClient.connect(url, {
  //   useNewUrlParser: true
  // }, function (err, db) {
  //   if (err) throw err;
  //   console.log("建立连接...")
  //   let dbase = db.db("nodeServer")
  //   let col = dbase.collection('app')
  //   col.find({
  //     'account': 'xiaohongbo'
  //   }).toArray(function (err, res) {
  //     if (err) throw err
  //     console.log(res)
  //     console.log('查找成功.')
  //     response.send('查找成功.')
  //   })
  // })
});
// 获取已有账号接口
router.post('/login/getAccount', (req, response) => {

  let account = {
    account: req.body.name,
    password: req.body.passWord
  }
  models.mongoBase('find', account, function (err, res) {
    if (err) throw err;
    console.log(res)
    if (res.length > 0) {
      response.send('登录成功!')
    } else { 
     response.send('账户或则密码错误!')
    }
   
  })
});

module.exports = router
