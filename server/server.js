// 引入编写好的api
const api = require('./api');
// 引入文件模块
const fs = require('fs');
// 引入处理路径的模块
const path = require('path');
// 引入处理post数据的模块
const bodyParser = require('body-parser')
// 引入Express
const express = require('express');
const app = express();
const utils = require('./utils')
const redis = require('redis')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(api);
// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../dist')))
// 因为是单页应用 所有请求都走/dist/index.html
app.get('*', function (req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
  res.send(html)
})
// 监听8088端口
app.listen(8088);
console.log('success listen…………');

/**
 * 验证连接redis
 */

var redisCli = redis.createClient(6379, 'localhost');
redisCli.set('hello', 'this is my value!')
redisCli.expire('hello',5) //设置5s后过期
// 获取值
setTimeout(function () { 
  redisCli.get('hello', function (err, v) {
    console.log("redis get hello err,v:", err, v) // 6s后获取的值为空
  })
},6000)



/**
 * 验证密钥
 */
// var str = 'hongbo'
// var keys = utils.creatRSA();
// var pubkey = keys[0];
// var prikey = keys[1];
// var enstr = utils.enRSA( pubkey,str)
// console.log(enstr)
// var destr = utils.deRSA(prikey, enstr);
// console.log(destr)

/**
 * 验证签名
 */
// var keys = utils.creatRSA();
// var pubkey = keys[0];
// var prikey = keys[1];
// var data = ['a', 1, 'b', true]
// var sign = utils.signature(prikey, data)
// console.log(sign)
// console.log(utils.verifySign(pubkey,data,sign))

/**
 * 验证连接mongodb
 */
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/nodeServer";
// MongoClient.connect(url, {
//   useNewUrlParser: true
// }, function (err, db) {
//   if (err) throw err;
//   console.log("数据库已经创建")
// })