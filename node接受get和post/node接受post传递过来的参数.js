/**
前端传参
get传参:拼接在url上面
http://127.0.0.1:4399/ joke?id-8&username-admin
post传参:不是拼接在url上面
请求体中传递
*/
//1.导入模块
const http = require("http");
var url = require('url');
var querystring = require('querystring');//这个模块是请求丶数据转换为字符串形式
const server = http.createServer((req, res) => {
   //req是请求对象
//因为这里是post的方式传递过来的参数,不是在ur1中的，所以用req.url是拿不到的
//console. log(req.ur1); 
// 他也是一小块- -小块的接收.
// 1.首先你得要一个容器
let postData='';
// 2.给req对象一个data事件(这个事件 会执行很多次)
//事件处理程序，参数是当前这次传递过来的一下快内容，
req.on('data',(chunk,)=>{//意思为绑定一个data事件，这个为事件体
//   将数据累加到容器里，// 这个事件里面就把这些小块的数据拼接起来
   postData+=chunk;


})
// 当前面的参数接受完成那就是end事件


// 3.给req对象一个end事件(这个事件只会执行一 -次)
req.on('end',()=>{
    console.log(postData)//username=admin&&psssword=1234
    //4利用解析这个传递过来的参数数据，形成一个对象
     let postObj=querystring.parse(postData)
     console.log(postObj);//{username:'admin',password:'"1234"}
})
// 表示数据传递完了
// 4.处理传递过来的数据
// queryString.parse0:




})
//2.创建服务器
//3.开启服务器
server.listen(4399, () => {
    console.log('服务器开启了...');
});

