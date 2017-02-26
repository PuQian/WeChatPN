'use strict';

var config = require('./config');
var Wechat = require('./wechat/wechat');
var wechatApi = new Wechat(config.wechat);

exports.reply = function* (next) {
  var message = this.weixin;

  // 事件推送
  if (message.MsgType === 'event') {
    if(message.Event === 'subscribe') {
      if(message.EventKey) {
        console.log('扫二维码进来： ' + message.EventKey + ' ' + message.ticket);
      }

      this.body = '欢迎订阅！';
    }
    else if(message.Event === 'unsubscribe') {
      console.log('无情取关');

      this.body = '';
    }
    else if (message.Event === 'LOCATION') {
      this.body = '您上报的位置是：' + message.Latitude + '/' + message.Longitude + '-' + message.Precision;
    }
    else if (message.Event === 'CLICK') {
      this.body = '您点击了菜单：' + message.EventKey;
    }
    else if (message.Event === 'SCAN') {
      console.log('关注后扫二维码' + message.EventKey + ' ' + message.Ticket);

      this.body = '扫一下哦';
    }
    else if (message.Event === 'VIEW') {
      this.body = '您点击了菜单中的链接：' + message.EventKey;
    } 
  }
  else if (message.MsgType === 'text'){
    var content = message.Content;

    var reply = '你刚才说的：' + message.Content + '我还没有想好';

    if(content === '1') {
      reply = '用户回复了 1';
    }
    else if (content === '2') {
      reply = '用户回复了 2';
    }
    else if(content === '3') {
      reply = '用户回复了 3';
    }
    else if (content === '4') {
      reply = [{
        title: 'Bing 搜索',
        description: 'Search',
        picUrl: 'https://img.alicdn.com/tps/TB1AvodPpXXXXa.XVXXXXXXXXXX-990-133.jpg_q70.jpg',
        url: 'http://cn.bing.com'
      }
      // ,{
      //   title: 'Nodejs',
      //   description: '图文回复示例2',
      //   picUrl: 'https://img.alicdn.com/tps/TB1AvodPpXXXXa.XVXXXXXXXXXX-990-133.jpg_q70.jpg',
      //   url: 'http://nodejs.org/'
      // }
      ]
    }
    else if (content === '5') {
      var data = yield wechatApi.uploadMaterial('image', __dirname + '/image.jpg');

      reply = {
        type: 'image',
        mediaId: data.media_id
      }
    }
    else if (content === '6') {
      var data = yield wechatApi.uploadMaterial('video', __dirname + '/6.mp4');

      reply = {
        type: 'video',
        title: '回复给您的视频',
        description: '描述',
        mediaId: data.media_id
      }
    }
    else if (content === '7') {
      var data = yield wechatApi.uploadMaterial('image', __dirname + '/2.jpg');

      reply = {
        type: 'music',
        title: '回复音乐',
        description: '放松一下',
        musicUrl: 'http://mpge.5nd.com/2015/2015-9-12/66325/1.mp3',
        thumbMediaId: data.media_id
      }
    }
    else if (content === '8') {
      var data = yield wechatApi.uploadMaterial('image', __dirname + '/2.jpg', {type: 'image'});

      reply = {
        type: 'image',
        mediaId: data.media_id
      }
    }
    else if (content === '9') {
      var data = yield wechatApi.uploadMaterial('video', __dirname + '/6.mp4', {type: 'video', description: '{"title": "标题", "introduction": "介绍"}'});

      reply = {
        type: 'video',
        title: '回复给您的视频',
        description: '描述',
        mediaId: data.media_id
      }
    }
    else if (content === '10') {
      var picData = yield wechatApi.uploadMaterial('image', __dirname + '/image.jpg', {});

      var media = {
        articles: [{
          title: '图片',
          thumb_media_id: picData.media_id,
          author: 'Alice',
          digest: '没有摘要',
          show_cover_pic: 1,
          content: '没有内容',
          content_source_url: 'https://github.com'
        }, {
          title: '图片5',
          thumb_media_id: picData.media_id,
          author: 'Bob',
          digest: '没有摘要',
          show_cover_pic: 1,
          content: '没有内容',
          content_source_url: 'https://github.com'
        }]
      }

      data = yield wechatApi.uploadMaterial('news', media, {});
      data = yield wechatApi.fetchMaterial(data.media_id, 'news', {})

      console.log(data);

      var items = data.news_item;
      var news = [];

      items.forEach(function(item) {
        news.push({
          title: item.title,
          decription: item.digest,
          picUrl: picData.url,
          url: item.url
        })
      })

      reply = news;
    }
    else if (content === '11') {
      var counts = yield wechatApi.countMaterial();

      console.log(JSON.stringify(counts));

      var results = yield [
        wechatApi.batchMaterial({
          type: 'image',
          offset: 0,
          count: 10
        }),
        wechatApi.batchMaterial({
          type: 'video',
          offset: 0,
          count: 10
        }),
        wechatApi.batchMaterial({
          type: 'voice',
          offset: 0,
          count: 10
        }),
        wechatApi.batchMaterial({
          type: 'news',
          offset: 0,
          count: 10
        })
      ]

      // console.log(JSON.stringify(results));

      // reply = JSON.stringify(results);
      reply = 1;
    }

    else if (content === '12') {
      var group = yield wechatApi.createGroup('wechat');

      console.log('新分组 wechat');
      console.log(group);

      var groups = yield wechatApi.fetchGroups();

      console.log('加了 wechat 后的分组列表');
      console.log(groups);

      var group2 = yield wechatApi.checkGroup(message.FromUserName);

      console.log('查看自己的分组');

      console.log(group2);

      // var result = yield wechatApi.moveGroup(message.FromUserName, 118)
      // console.log('移动到  115')
      // console.log(result)

      // var groups2 = yield wechatApi.fetchGroups()

      // console.log('移动后的分组列表')
      // console.log(groups2)

      // var result2 = yield wechatApi.moveGroup([message.FromUserName], 119)
      // console.log('批量移动到  119')
      // console.log(result2)

      // var groups3 = yield wechatApi.fetchGroups()

      // console.log('批量移动后的分组列表')
      // console.log(groups3)

      // var result3 = yield wechatApi.updateGroup(117, 'wechat117')

      // console.log('117 wechat2 改名 wechat117')
      // console.log(result3)

      // var groups4 = yield wechatApi.fetchGroups()

      // console.log('改名后的分组列表')
      // console.log(groups4)

      // var result4 = yield wechatApi.deleteGroup(102)

      // console.log('删除 114 tututu 分组')

      // console.log(result4)


      // var groups5 = yield wechatApi.fetchGroups()

      // console.log('删除 114 后分组列表')
      // console.log(groups5)

      reply = "group done";
      // reply = JSON.stringify(groups3)
    }

    else if (content === '13') {
      var user = yield wechatApi.fetchUsers(message.FromUserName, 'en')

      console.log(user);

      var openIds = [
        {
          openid: message.FromUserName,
          lang: 'en'
        }
      ]

      var users = yield wechatApi.fetchUsers(openIds)

      console.log(users);

      reply = JSON.stringify(user)
    }
    else if (content === '14') {
      var userlist = yield wechatApi.listUsers();

      console.log(userlist);

      reply = userlist.total;
    }

    this.body = reply;
  }

  yield next;
}