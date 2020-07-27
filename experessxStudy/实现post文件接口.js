
/**
*注册接口
*接口地址: /register
本
请求方式: post
*请求参数:
username password usericon(用 户头像，图片文件)|
*/

const multer=require('multer')
// 接受上传过来的文件放在哪个文件夹下
var upload=multer({dest:'pulic/'})
const express = require('express')
//创建服务器
const app = express()
//写接口
//需要第三方模块multer
// 传过来的文件参数名指定为files.//如果是多给文件上传的话那就使用upload.array('参数'，'最大文件数')
app.post('/register',upload.single('files'),(req,res)=>{
// 一起传过来的文件保存在req.body中
     console.log(req.file)//打印传递过来的文件
    //  但是传递过来的文件没有后缀
    console.log(req.body)
    res.send('完成')    
   
   
    


})
app.listen(6060,()=>{
    console.log('服务开启')
})