// 生成hash密钥
const NodeRSA = require('node-rsa')
const BASE64 = 'base64'
const UTF8 = 'utf8'
var pkcsSize = 512;
const utils = {

  /**
   * 创建RSA密钥对
   * @param {Number} pkcsSize 密钥长度
   * @param {String} pkcsType pkcs标准,默认为pkcs8
   * @returns {Array} 公钥,私钥,密钥对象Key
   */
  creatRSA: function (pkcsSize, pkcsType) {
    var pkcsSize = pkcsSize || 512;
    var pkcsType = pkcsType || 'pkcs8'; //不为空则 设置为传入参数，为空则 设置为 pkcs8
    var key = new NodeRSA({
      b: pkcsSize
    });
    // key.setOptions({ encryptionScheme: 'pkcs1' });// 指定密码格式
    var pubkey = key.exportKey('pkcs8-public'); //导出公钥
    var prikey = key.exportKey('pkcs8-private'); //导出私钥
    // var pubKey = new NodeRSA(pubKey, 'pkcs8-public'); //导入公钥
    // var priKey = new NodeRSA(priKey, 'pkcs8-private'); //导入私钥
    return {
      pubkey: pubkey,
      prikey: prikey,
      key: key
    }
  },

  /**
   *  加密  公钥加密
   * @param {Buffer|String} publicKey 公钥
   * @param {*} buffer 需要加密的数据
   * @returns {string|buffer} 加密后的数据
   */
  enRSA: function (publicKey, buffer) {
    var pubkey = new NodeRSA(publicKey, 'pkcs8-public');
    return pubkey.encrypt(buffer, 'base64');
  },

  /**
   *  解密  私钥解密
   * @param {Buffer|String} privateKey 私钥
   * @param {string|buffer} buffer 需要解密的数据
   * @returns {*} 解密后的数据
   */
  deRSA: function (privateKey, buffer) {
    var priKey = new NodeRSA(privateKey, 'pkcs8-private');
    return priKey.decrypt(buffer, 'utf8');
  },

  /**
   *  签名 私钥签名
   * @param {Buffer | String}privateKey 私钥
   * @param {*} buffer 需要签名的数据
   * @returns {string|buffer} 数字签名
   */
  signature: function (privateKey, buffer) {
    var priKey = new NodeRSA(privateKey, 'pkcs8-private');
    return priKey.sign(buffer);
  },

  /**
   * 验证签名 公钥验证
   * @param {Buffer|string} publicKey 公钥
   * @param {*} buffer 被签名的数据
   * @param {String|Buffer} signature 签名
   * @returns {Boolean} 签名验证结果
   */

  verifySign: function (publicKey, buffer, signature) {
    var pubkey = new NodeRSA(publicKey, 'pkcs8-public')
    return pubkey.verify(buffer, signature)
  },

  /**
   * 判断字符串是不是josn
   * @param {*} str 
   */
  isJSON: function (str) {
    if (typeof str == 'string') {
      try {
        var obj = JSON.parse(str);
        if (typeof obj == 'object' && obj) {
          return true
        } else {
          return false
        }
      } catch (e) {
        console.log('err:' + str + '~~~' + e)
        return false
      }
    }
    return false
  },

  /**
   * 生成随机字符串
   * @param {Number} len 
   */
  random_str: function (l) {
    let len = l || 32
    let arr = 'ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghhigklmnopqrstuvwxyz0123456789'.split('')
    let str = ''
    for (var i = 0; i < len; i++) {
      str += arr[parseInt(Math.random() * arr.length)]
    }
    return str
  }
}


export default utils
