// 初始化一个项目 npm init -y
// 清除缓存npm cache clean -f
// 安装 npm i express
var express =require('express');
const app = express()
//设置返回给用户看的内容
app.get('/',(req,res)=>{
   res.end(console.log('123'));
//    回头调用他里面的函
res.send('fn()')
//或者说我这里怎么知道访问我这个接口的前端页面有什么样的写好的函数呢?
//所以这里写死返回fn()不合理
//解决办法是,前端把已经准备好的函数名用参数的形式给带过来. 
console.log(req.query.callback);//这里就可以拿到前端url传递过来的事先准备好的fn2(get传参).
res.send( `${req.query.callback}();` );

// 
//相当于用实参的方式，返回需要返回的数据
es.send( `${req.query.callback}({"name":"Alice"，"age":18});`);




});






app.listen(6666, function(){
    console.log("访问127.0.0.1:666");
})
