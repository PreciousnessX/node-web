/**
 * 配置缓存
 * 
 */
const utils = require('./utils')
const redis = require('redis')
 // 配置连接
const PORT = 6379
const HOST = 'localhost'
const PASSWORD = 'bobomusic.com7'
const DURATION = 1*1*60*60 // key有效时间
function _connect() { 
    var redisCli = redis.createClient(PORT, HOST)
    redisCli.auth(PASSWORD)
    return redisCli
}

// string字符串类型操作
/**
 * 
 * @param {String} key 
 * @param {*} value 
 * @param {Number} dur  字段的有效期
 */
function setStr(key,value,dur) { 
    var client = _connect()
    if (typeof value == 'object') { 
       var value = JSON.stringify(value)
    }
    client.set(key, value)
    client.expire(key, dur)
}

/**
 * 
 * @param {String} key 
 * @param {Function} cb 
 */
function getStr(key,cb) { 
    var client = _connect()
    var value
    client.get(key, function (err, v) { 
        if (err) throw err
        value = v
        if (utils.isJSON(value)) {
          value = JSON.parse(value)
        }
        cb(value)
    })
    
}

// list操作
/**
 * 从尾部插入
 * @param {string} key 
 * @param {*} value 
 */
function rpush(key,value) { 
    
}

// set集合操作


// hash散列操作

// zset有序集合操作

module.exports = { 
    setStr,
    getStr,
    rpush
}


