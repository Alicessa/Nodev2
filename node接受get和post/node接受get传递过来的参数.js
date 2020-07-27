/*
前端传参
get传参:拼接在url上面
http://127.0.0.1 :4399/ joke ?id-8&username=admin
post传参:不是拼接在url上面
请求体中传递
*/
//写一个服务器(后端接口)
//1.导入模块
const http = require("http");
var url = require('url');
const { utimes } = require("fs");
//2.创建服务器
const server = http.createServer((req, res) => {
    var urls = req.url;
    console.log(req.url);    //req是请求的对象，req. ur1能拿到请求的url中?以及?后面的内容
    // ' /?id-&username=weige' ' /?id=8&username=%E6
    //我们可以通过req.url拿到前端传递过来的参数
    //但是要做字符串的处理.
    //第一个参数为要处理的数据,第二个参数，true启用对象的形式返回
    //这个返回的对象里面有一个query属性，他也是一个对象，这个属性里面就有get传递过来的参数

    var urlobj = url.parse(req.url, true)
    console.log(urlobj);

    //那就可以在这里根据这个接收到的id,去数据库中获取这个id的英雄的所有详细信息
    //返回给调用这.
    //如果在这里拿到了id对应的英雄的详细信息了， 就可以返回，
    res.end(JSON.stringify(url0bj.query));//只能返回字符串



})
//4.开启服务器
server.listen(4399, () => {
    console.log('服务器开启了...');
});

