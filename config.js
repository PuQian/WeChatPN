'use strict';

var path = require('path');
var util = require('./libs/util');
var wechat_file = path.join(__dirname, './config/wechat.txt');

var config = {
    wechat: {
        appID: 'wx97b8c0d40d10d768',
        appSecret: '22b047f976b96acc19da211f0b0bb90e',
        token: 'everycloudhasasilverlining',
        getAccessToken: function() {
          return util.readFileAsync(wechat_file);
        },
        saveAccessToken: function(data) {
          data = JSON.stringify(data);
          return util.writeFileAsync(wechat_file, data);
        }
    }
}

module.exports = config;