// 引入模块
const http = require("http");
const express = require("express");
const routerProduct = require("./router/product");
// 创建服务器
var app = express();
var server = http.createServer(app);
server.listen(3000);

const bodyParser = require('body-parser');
//接收json数据 
// app.use(bodyParser.json());
//extended:true代表可以接收任何数据类型的数据
app.use(bodyParser.urlencoded({ extended: true }));
// 配置静态目录
app.use(express.static("./public"));
// 加载相应模块
app.use("/product", routerProduct);
