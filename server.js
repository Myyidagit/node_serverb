var express = require('express');
var app = express();

//设置跨域访问
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.send(200); /*让options请求快速返回*/
    } else {
        next();
    }
})


    //登录窗口处理  http://localhost:8888/login
    //输后台接收账号密码进行判断，并返回数据
app.post("/login", function(req, res) {
    //定义一个空字符串
    var query = '';
    req.addListener("data", function(d) {
        query += d;
        // console.log(d);
    })
    //如果数据接收完毕
    req.addListener('end', function() {
        // 将字符串解析为对象
        var params = require('querystring').parse(query);
        console.log(query)
        if (params.username == "admin" && params.pwd == '123456') {
            // 如果用户名输入的等于上面的则返回登录成功
            res.send('{"code":1,"msg":"登录成功"}');
        } else {
            // 否则
            res.send('{"code":0,"msg":"!登录失败"}');
        }
    })
});
// 获取列表接口  http://localhost:8888/list
app.get("/list", function(req, res) {
    res.sendFile( __dirname + "/" + "data.json" );
    // res.sendFile(`${__dirname}/view${req.url}`);
})
app.get("*", function(req, res) {
    res.sendFile(`${__dirname}/view${req.url}`);
})
app.listen(8888, 'localhost', function() {
    console.log('服务器开启成功');
})