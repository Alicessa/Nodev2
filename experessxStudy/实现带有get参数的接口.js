/** 
 /**
*接口:查询英雄外号
根据英雄名返回英雄外号
*接口地址: /getNickName
*请求方式: get 
请求参数: heroName
英雄名(提莫/盖伦/李青...) 
*返回值:英雄外号
*/
const express = require( 'express' )
const bodyParser = require('body-parser')
// 方式为x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))//转化格
//创建服务器
const app = express()
//写接口
app.get("/getname",(req,res)=>{
//要接收前端 传递过来的参数(英雄名)
let heroNickName=""
    switch (req.query.heroName) {//根据请求头的数据传递回数据
        case
        "提莫":
        heroNickName = "迅捷斥候";
        break;
        case
        "李青":
        heroNickName = "盲僧";
        break;
        case
        "盖伦":
        heroNickName = "德玛西亚之力";
        break;
        case "亚索":
        heroNickName = "疾风剑豪";
        break;
        case "阿狸":
        heroNickName ="九尾妖狐";
        break;
        default:
        heroNickName = "该英雄不存在";
        break ;
        }
    
res.send(heroNickName)
})

//开启服务器
app. listen(4399,()=>{
console. log("服务器开启了...");
})

