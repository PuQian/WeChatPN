# 基于 Node.js 实现微信公众号

目前使用测试号实现消息的自动回复、媒体上传功能。

<img src="/images/replyOne.png" width="50%" height="50%"/>

<img src="/images/replyTwo.png" width="50%" height="50%"/>

## 后台消息格式
微信服务器响应 xml 格式数据，使用 xml2js 模块将其转换为 js 对象。

微信服务器返回 xml 格式数据：

![xml格式](/images/xml.png)


转换为便于处理的消息格式：

![消息格式](/images/message.png)

<br>
