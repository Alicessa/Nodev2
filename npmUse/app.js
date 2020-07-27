
//导入爬虫插件
var Crawler = require("crawler");
var fs=require('fs')
var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            // console.log($("title").text());
            // 将爬取到的结果，爬到一个文件里
            fs.writeFile('./Crawlerdata/data1.txt',$('body').text(),(err)=>{
                if(err==null){
                    console.log('爬取成功')
                }
            })
        }
        done();
    }
});
 
// Queue just one URL, with default callback
c.queue('http://www.baidu.com');
 
