<h1 align="center">
  local-node-server
</h1>
<br>
<p align="center">
  <a href="https://travis-ci.org/xudeming208/local-node-server"><img src="https://travis-ci.org/xudeming208/local-node-server.svg?branch=master" alt="Travis Status"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/node/v/local-node-server.svg" alt="Nodejs"></a>
  <a href="https://www.npmjs.com/package/local-node-server"><img src="https://img.shields.io/npm/v/local-node-server.svg" alt="Version"></a>
  <a href="https://npmcharts.com/compare/local-node-server?minimal=true"><img src="https://img.shields.io/npm/dm/local-node-server.svg" alt="Downloads"></a>
  <a href="https://github.com/xudeming208/local-node-server/graphs/contributors"><img src="https://img.shields.io/github/contributors/xudeming208/local-node-server.svg" alt="Contributors"></a>
  <a href="https://www.npmjs.com/package/local-node-server"><img src="https://img.shields.io/github/license/xudeming208/local-node-server.svg" alt="License"></a>
</p>

## 介绍
node本地服务器，可快速在本地搭建服务器预览本地资源

## demo
![demo-dir](https://github.com/xudeming208/local-node-server/blob/master/public/demo-dir.png?raw=true)
![demo-file](https://github.com/xudeming208/local-node-server/blob/master/public/demo-file.png?raw=true)

## 安装
`
sudo npm i local-node-server -g
`

## 用法
在需要服务器的目录下执行`server start`命令即可。如：

```javascript
server start --ip 192.168.120.120 --port 8081 --dir ~
```

```javascript
server start --ip 192.168.120.120 --port 8081 --dir ../../index.html
```

## Options

参数 | 解释 | 默认值
-|-|-
-h、--help | 查看帮助 | --
-v、--version | 查看版本 | --
-i、--ip | 指定IP地址 | Window: '127.0.0.1' ; Mac、Linux等: '0.0.0.0'
-p、--port | 指定端口号 | 8080
-d、--dir | 指定资源路径 | './'


## Commands

参数 | 解释
-|-
start | 启动服务