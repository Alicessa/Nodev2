//利用experess托管静态资源.设置静态资源所在路径即可，使其对外开放
var express =require('express');
const app = express();
app.use(express.static('public'))//访问睡，谁就给出响应

app.listen(6666, function(){
    console.log("访问127.0.0.1：666");
})
