//爬取王者荣耀的信息导入数据库
//1.抓包
//导包
var Crawler = require("crawler");
//创建一个爬虫实例
var c = new
    Crawler({
        maxConnections: 10,
        // This will be called for each crawled page
        callback: function (error, res, done) {
            if (error) {
                console.log(error);
            } else {
                var $ = res.$;

                // $ is Cheerio by default
                //a lean implementation of core jQuery designed specifically for the server
                //    console.log(res)
                //    所有英雄都在body里,因为是json数据转换json对象
                // console.log(JSON.parse(res.body))
                //所有的英雄都要去获取他的头像和技能.
                //所以要遍历出每一个英雄的ename，拼接一个详情页路径路径重新发请求.
                JSON.parse(res.body).forEach((v) => {
                    // console.log(v);
                    // console .log( `https://pvp.qq.com/web201605/herodetail/${v. ename} .shtml`);

                    // 详情请求
                    xq.queue(`https://pvp.qq.com/web201605/herodetail/${v.ename}.shtml`);

                });

            }
            done();
        }
    });
//发送请求
c.queue('https://pvp.qq.com/web201605/js/herolist.json')


// 存放英雄资料
let heros = [];
// 创建一个详情爬虫实例
var xq = new
    Crawler({
        maxConnections: 10,
        // This will be called for each crawled page
        callback: function (error, res, done) {
            if (error) {
                console.log(error);
            } else {
                var $ = res.$;
                //获取里面有个cover-name这个class类里有英雄的名字
                //  .skill-name>因为skill-name里有一个b类这个b类里放里一个技能
                //英雄名字，英雄技能，
                // console.log($('.cover-name').text(), $('.show-list .skill-name>b').first().text(),
                //     $('.show-list:nth-child(2) .skill-name>b').text(),//二个技能
                //     $('.show-list:nth-child(3) .skill-name>b').text(),
                //     $('.show-list:nth-child(4) .skill-name>b').text(),

                // );
                // //  英雄头像
                // console.log("https:" + $('.ico-play').prev('img').attr('src'));

                // 把获取的英雄资料放入
                heros.push({
                    Kingname: $('.cover-name').text(),
                    Kingicon: "https:" + $('.ico-play').prev('img').attr('src'),
                    Kingskill1: $('.show-list .skill-name>b').first().text(),
                    Kingskill2: $('.show-list:nth-child(2) .skill-name>b').text(),
                    Kingskill3: $('.show-list:nth-child(3) .skill-name>b').text(),
                    Kingskill4: $('.show-list:nth-child(4) .skill-name>b').text(),
                    // 
                    isDelete: false
                })

            }
            done();
        }
    });
// 因为是一个异步操作
// 要等待所有的请求全部做完
xq.on('drain', function () {
    heroModel.insert(heros, (err, results) => {
        console.log(err);
        console.log(results);
        if (!err) console.log("增加成功");
    });


    //   db.end();//关闭sql链接，可以不写防止有些数据入库
})

// 入库


const sql = require('mysql-ithm');

//2.连接数据库
//如果数据库存在则连接，不存在则会自动创建数据库
sql.connect({
    host: '127.0.0.1',//数据库地址
    port: ' 3306 ',
    user: 'root',//用户名，没有可不填
    password: 'root',//密码， 没有可不填
    database: 'GloryofKings' //数据库名称
});
//3.创建Model(表格模型:负责增删改查)
//如果table表格存在则连接，不存在则自动创建
let heroModel = sql.model('herolist', {
    Kingname: String,
    Kingicon: String,
    Kingskill1: String,
    Kingskill2: String,
    Kingskill3: String,
    Kingskill4: String,
    // 
    isDelete: String


});


