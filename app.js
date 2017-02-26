'use strict';

var Koa = require('koa');
var path = require('path');
var wechat = require('./wechat/g');
var util = require('./libs/util');
var config = require('./config');
var weixin = require('./weixin');
var wechat_file = path.join(__dirname, './config/wechat.txt');

var app = new Koa();

var ejs = require('ejs');
var heredoc = require('heredoc');

var tpl = heredoc(function() {/*
<!DOCTPE html>
<html>
  <head>
    <title>猜电影</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1">
  </head>
  <body>
    <h1>点击标题，开始录音翻译</h1>
    <p id="title"></p>
    <div id="poster"></div>

    <script src="http://zeptojs.com/zepto-docs.min.js"></script>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
  </body>
</html>
*/});

app.use(function *(next) {
  if(this.url.indexOf('/movie') > -1) {
    this.body  = ejs.render(tpl, {});

    return next;
  }
  yield next;
})

app.use(wechat(config.wechat, weixin.reply));

app.listen(1234);
console.log('listening 1234');