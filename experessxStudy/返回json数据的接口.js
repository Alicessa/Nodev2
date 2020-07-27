const express = require('express')
//创建服务器
const app = express()
//写接口
app.get('/joke', (req, res)=> {
    //要 去设置一个响应头
res.setHeader( 'Content-Type', 'text/json');

///设置响应回来的内容
res.send({
    foodName:'红烧肉',
    price:50,
    description: '好吃好吃好想吃,油而不腻不要多吃'
   
})
    
    


})
app.listen(6060,()=>{
    console.log('服务开启')
})