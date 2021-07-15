
# 基于peerjs实现简单的音视频通话
## 步骤
1、创建html和css搭建页面原型
2、基于peer和express实现服务端逻辑
3、补充客户端业务逻辑，完成demo

## 依赖
- peer 服务端库
- peerjs 客户端库
- express 
## 知识点
- WebRTC架构、概念基本介绍
- peerjs建立连接、发起通话、挂断等常用api使用
- 使用navigator.mediaDevices.getUserMedia()来获取本地的音视频流

## 相关文档
- [客户端使用文档](https://peerjs.com/)
- [服务端文档](https://github.com/peers/peerjs-server)
- [Building an Internet-Connected Phone with PeerJS](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Build_a_phone_with_peerjs)