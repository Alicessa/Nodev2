//导包
const express = require('express');
//创建服务器
const app = express();
const multer = require('multer')

var upload = multer({ dest: 'public/img' })
var mysql = require("mysql");
//创建一个和数据库的连接
var connection = mysql.createConnection({
    host: "localhost", //数据库服务器的地址
    user: "root", //账号
    password: "root", //密码
    database: "alicezat2", //数据库名
});
app.use(express.static('public/img'))
//写路由
//1.写一个新增接口
app.post('/Heroadd', upload.single('heroIcon'), (req, res) => {
    //1.1 接收从前端传 递过来的参数.
    // console . log(req . file. filename);//图像名字fed2ba8781e46ee2bba
    // console . log(req . body);//文本参数theroName:”
    let heroIcon = 'http://127.0.0.1:8999/' + req.file.filename;
    let { heroName, heroArms, heroRe, heroTitle, heroRace, heroIdent } = req.body;
    //1.2把这传递过来的数据保存到数据库中.



    connection.query(`insert into alicezation(name,arms,icon,re,title,race,ident) 
    values ('${heroName}','${heroArms}','${heroIcon}','${heroRe}','${heroTitle}','${heroRace}','${heroIdent}');`,

        (error, results, fields) => {
            if (error == null) {
                res.send({
                    code: 200,
                    msg: '新增成功',

                });
            } else {
                res.send({
                    code: 500,
                    msg: '新增失败',

                });
            }

        });

});
app.get("/Herolist", (req, res) => {
    connection.query(" select * from alicezation", (error, results, fields) => {
        if (error == null) {
            res.send({
                code: 200,
                msg: '成过',

                data: results
            });
        } else {
            res.send({
                code: 500,
                msg: '服务器内部错误'
            });
        }

    });
})




//开启 服务器
app.listen(8999, () => {
    console.log('服务器开启成功了...8999');
});
