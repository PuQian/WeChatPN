'use strict';

var sha1 = require('sha1');
var getRawBody = require('raw-body');
var Wechat = require('./wechat');
var util = require('./util');

module.exports = function(opts, handler) {
  var wechat = new Wechat(opts);

  return function *(next){
    var that = this;
    console.log(this.query);

    // 加密逻辑
    var token = opts.token;
    var signature = this.query.signature;
    var nonce = this.query.nonce;
    var timestamp = this.query.timestamp;
    var echostr = this.query.echostr;

    // 字典排序
    var str = [token, timestamp, nonce].sort().join('');
    var sha = sha1(str);

    if (this.method === 'GET') {
      if (sha === signature) {
        this.body = echostr + '';
      }else {
        this.body = 'wrong';
      }
    }
    else if (this.method === 'POST') {
      if (sha !== signature) {
        this.body = 'wrong';
        return false;
      }

      // yield 拿到 post 的数据
      var data = yield getRawBody(this.req, {
        length: this.length,
        limit: '1mb',
        encoding: this.charset
      })

      // console.log(data.toString());

      var content = yield util.parseXMLAsync(data);

      console.log(content);

      var message = util.formatMessage(content.xml);

      console.log(message);

      this.weixin = message;

      yield handler.call(this, next);

      wechat.reply.call(this);
    }
  }
}
