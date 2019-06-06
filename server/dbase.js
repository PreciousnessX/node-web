/**
 * 先不用mongoose,先用原生的mongodb
 * 封装数据库函数
 */
// 配置 
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/nodeServer";
const _Mongo = function () {
  this.mongoBase = function (ds, data, bc) {
    var _this = this
    MongoClient.connect(url, {
      useNewUrlParser: true
    }, function (err, db) {
      if (err) throw err;
      let dbase = db.db("nodeServer")
      let col = dbase.collection('app')
      _this[ds](col, data, bc, db)
    })
  }
  this.insert = function (col, data, bc, db) {
    col.insert(data, function (err, res) {
      bc(err, res)
      db.close()
    })
  }
  this.find = function (col, where, bc, db) {
    col.find(where).toArray(
      function (err, res) {
        bc(err, res)
        db.close()
      })
  }
}
module.exports = new _Mongo();
