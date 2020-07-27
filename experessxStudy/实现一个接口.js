/** 
接口:得到一条随机数据
接口地址: /joke 
请求方式: get
参数:无
返回:一条笑话
**/
//导包
const express = require('express')
//创建服务器
const app = express()
//写接口
app.get('/joke', (req, res)=> {
//准备n条笑话(实际开发的时候笑话们肯定是从数据库或者是其他的数据源获取到的.)
let arr = ['狐狸走路容易摔跤,因为脚滑，哈哈','波波是男的','千里 爱波波']
// 开始创建一个随机的标
let index = Math.floor(Math.random()*3);
// 返回数据
res.send(arr[index]);

})
app.listen(6060,()=>{
    console.log('服务开启')
})
