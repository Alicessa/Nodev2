const app = express();
const cookieSession=require('cookie-session')

app.use(cookieSession({
    name :
    session,
    keys: ['alice' ], //加密用的加盐
    // Cookie Options过期的时间
    maxAge:7*24*60*60*1000//24hours*7表示这个cookie7天后过期.
}))
    



//3.写接口
//3.1登录接口
app.get('/login', (req, res) => {
    //假如现在这里已经验证了账号和密码，是正确的.是可以登录.
    //那服务器就应该把cookie响应回去.
    res.writeHead(200, {
        'Content-Type': ' text/plain; charset=utf-8',
        "Set-Cookie": 'userid-123456' //实际开 发的时候,肯定发过去的是密文
    })
    res.end();
});
//3.2 查询接口
app.get(' /list', (req, res) => {
    //接收一下客户端(浏览器端)自动带过来的cookie
    console.log(req.headers);
    res.send('666 ');
});
//4.开启服务器
app.listen(8086,()=>{
    console.log('服务器开启成功了.. .8086');
 });
    
