/*
*
使用第三方模块
*
1.新建一个文件夹,文件夹的名字非中文,名字也不要和模块名字一样.
2.进到文件夹里面去，命令运行:
npminit-y这个命令可以理解成是初始化
3.下载模块， 去npm官网搜索模块，用他的说明来下
4.使用模块， 去模块的官网，或者模块说明中来使用
*/



// 利用爬虫插件爬取文件
var Crawler = require("crawler");
var fs = require('fs');
 
var c = new Crawler({
    encoding:null,
    jQuery:false,// set false to suppress warning message.
    callback:function(err, res, done){
        if(err){
            console.error(err.stack);
        }else{
            fs.createWriteStream(res.options.filename).write(res.body);
        }
        
        done();
    }
});

//不是什么样的数据都可以爬下来，有些网站做了反爬
//反爬的机制:
//
//看你这个请求是不是服务器，如果是就不给你数据
//
//我们这里是node.js是服务端，有时候有的数据就不给你.
//解决的办法，伪装:
//
//把我们这个node.js后端服务器请求伪装成客户端(浏览器)

c.queue({
    // 如果视频网址中带有blob:这些类型是文件流的方式一点一点传输的
    //所以一定要换成移动端再查看
    // uri:"blob:https://v.qq.com/63f07c6f-2037-47dd-a93c-3f9137922098",
    uri:"https://apd-3f01ad828a4d471202314ef1e441d021.v.smtcdns.com/vipzj.video.tc.qq.com/AyzMsRdxsZYt2z_-rOBwGow6n8Y6QdW0UCtNnGZHwSBk/uwMROfz2r5zAoaQXGdGnC2dfDma7NyshNhpHvcEisM-VRrjn/p00282dxgel.mp4?sdtfrom=v3010&guid=7f7cea190fefa7d1d389cddb4ddfc99c&vkey=460DC51F2A4D1897AB28B4754664D56618BA6BCB33C873D1F07F8A96C9E4A7D059110DF329C0D66EF0C410BA4E42FDF9C292D23BE7D4E21FB9279DBBB86ABB584548007C92C28432BE81C4F55F007FB74FE64E4CD6B10A14E8B4727A5058DBE7729CA2F469933DD95B094E27E1850106E3F310A8744AFE721EFD2FFBBD8631BE&platform=2",
    filename:"./Crawlerdata/data2.mp4",
    headers:{'User-Agent':'requests'}//让服务端伪装成一个浏览器
});