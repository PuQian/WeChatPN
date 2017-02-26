# 基于 Node.js 实现微信公众号


## 效果图
目前使用测试号实现消息的自动回复、媒体上传功能。

![回复消息1](/img/replayOne.png)
![回复消息2](/img/replayTwo.png)

点击链接，在微信内置浏览器中打开Bing链接。
![search](/img/search.png)


## 后台消息格式
微信服务器响应 xml 格式数据，使用 xml2js 模块将其转换为 js 对象。
![xml格式](/img/xml.png)
![消息格式](/img/message.png)


