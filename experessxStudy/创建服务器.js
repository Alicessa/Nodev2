// 初始化一个项目 npm init -y
// 清除缓存npm cache clean -f
// 安装 npm i express
var express =require('express');

//设置返回给用户看的内容
router.get('/',(req,res)=>{
   res.end('123');
});
router.post('/',(req,res)=>{
  res.end('psot');
});
app.listen(6666, function(){
    console.log("访问127.0.0.1：666");
})

