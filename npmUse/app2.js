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
 
c.queue({
    uri:"https://win-web-nf01-sycdn.kuwo.cn/bf3ab83ceb7db870cb5694cbbc380c09/5f17e4d6/resource/n3/16/84/3336122591.mp3",
    filename:"./Crawlerdata/data2.mp3"
});