const express = require('express')
const app = express();
const cookieSession = require('cookie-session')
app.use(cookieSession({
    name: 'session',

    keys: ['alice'], //加密用的加盐
    // Cookie Options过期的时间
    maxAge: 7 * 24 * 60 * 60 * 1000//24hours*7表示这个cookie7天后过期.
}))

const sql = require('mysql-ithm');
// 允许跨域访问
var cors = require('cors')
app.use(cors())

//指定开放静态资源文件夹
app.use(express.static('views'))
app.use(express.static('views/dist'))
app.use(express.static('public/img'))


const multer = require('multer')
// 接受上传过来的文件放在哪个文件夹下
var upload = multer({ dest: 'public/img' })


const bodyParser = require('body-parser')
// 方式为x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))//转化

//1.导入模块


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

let userModel = sql.model('user', {
    username: String,
    password: String
})

//判断是否登录的接口
app.get('/isLogin', (req, res) => {
    res.send(req.session.user)
   
})

//退出登录
app.get('/logout', (req, res) => {
    //有际Cookte
    req.session = null;
    //重定 向到登录页
    res.writeHead(302, {
        'Location': './login.html'
    })
    res.end();

})
//用户注册
app.post('/register', (req, res) => {
    //a.获取前端传递过来的用户名/加密的密码/验证码

    let { username, password, code } = req.body;

    //console. log (username，password, code);
    //b.验证验证码输入的是否正确.
    if (code.toLocaleLowerCase() != captchaText.toLocaleLowerCase()) {
        //进到了这里来了，说明用户输入的验证码不对
        res.send({
            code: '402',
            msg: '验证码错误',
        });
    }
    else {
        userModel.find(`username="${username}"`, (err, results) => {
            if (err) {
                res.send({
                    code: '500',
                    msg: '服务器错误',
                });
            } else {
                if (results.length > 0) {
                    res.send({
                        code: '401',
                        msg: '用户名存在',
                    });
                }
                userModel.insert({
                    username, password

                }, (err, results) => {
                    if (err) {
                        res.send({
                            code: '501',
                            msg: '服务器错误-注册失败',
                        });

                    }
                    else {
                        res.send({
                            code: '200',
                            msg: '注册成功',
                        })
                    }



                })

            }
        })
    }



})
//用户登录
app.post('/login', (req, res) => {

    let { username, password } = req.body;
    //b.去数据库中判断有没有这样的账号和密码.
    userModel.find(`username = "${username}" and password = "${password}"`, (err, results) => {

        if (err) {
            res.send({
                code: 500,
                msg: '服务器内部错误',
            });
        } else {
            //判断查成功的结果，有没有数据
            if (results.length > 0) {
                //我们这里发的session的键是user,值是一个对象，对象里面包含账号密码.
              req.session.user = { username, password };

             
                res.send({
                    code: 200,
                    msg: '登录成功'
            
                })
            }
            else {
                res.send({
                    code: 400,
                    msg: '账号密码错误'

                })
            }
        }
    })

});

// 获取英雄列表
app.get('/Herolist', (req, res) => {
    //如果没有登录，直接来访问这个list接口，那这个cookie就是undef ined.
    // console.log(req.session.user);

    //有可能会传一个要查询的英雄名字参数过来，也有可能什么参数都没有.
    let { search } = req.query;


    // a.有可能会传一个要查询的英雄名字参数过来，也有可能什么参数都没有.

    // b.判断

    //如果进到这里来了，说明没有查询参数，我就要查询出所有的英雄.
    if (!search) {
        heroModel.find('isDelete="false"', (err, results) => {
            if (err) {
                res.send({
                    code: 400,
                    msg: '获取失败'
                });
            } else {

                //进到这里来，说明有查询参数
                res.send({
                    code: 200,
                    heros: results,
                    // user: req.session.user
                });
            }
        });
    }
    else {
        heroModel.find(`Kingname like "%${search}%" and  isDelete="false"`, (err, results) => {

            if (err) {
                res.send({
                    code: 400,
                    msg: '获取失败'
                });
            } else {

                //进到这里来，说明有查询参数
                res.send({
                    code: 200,
                    heros: results,
                    // user: req.session.user
                });
            }
        })
    }


})

// //添加英雄
app.post('/addHero', upload.single('Kingicon'), (req, res) => {

    let { Kingname, Kingskill1, Kingskill2, Kingskill3, Kingskill4 } = req.body;
    let Kingicon = 'http://127.0.0.1:8999/' + req.file.filename;
    //b. 插入到数据库中
    heroModel.insert({

        Kingname,
        Kingicon,
        Kingskill1,
        Kingskill2,
        Kingskill3,
        Kingskill4,
        // 

    }, (err, results) => {
        if (err) {
            res.send({

                code: 500,
                msg: '服务器内部错误'
            });
        } else {
            res.send({
                code: 200,
                msg: '新增成功!'
            });
        }

    });




})
//删除英雄
app.post("/deleHero", (req, res) => {
    //接收前端传过来的英雄id进行删除
    let { id } = req.body;

    heroModel.update(`id=${id}`, { isDelete: 'true' }, (err, results) => {
        if (err) {
            res.send({
                code: 400,
                msg: '获取失败'
            });
        } else {

            //进到这里来，说明有查询参数
            res.send({
                code: 200,
                heros: '删除成功'
            });
        }
    })

})
// //根据id查看英雄
app.get('/Heroinfo', (req, res) => {
    //更具前端传递过来的，要编辑的这个英雄的id
    //a. 接收传递过来的英雄id
    let { id } = req.query;

    //b.根据id查询英雄详细信息.
    heroModel.find(`id=${id}`, (err, results) => {
        if (err) {
            res.send({
                code: 500,
                msg: '服务器内部错误'
            })
        }
        else {
            res.send({
                code: 200,
                // data: results
                //因为是 根据id查询 得到的英雄数据，肯定是唯一 的，因为id也是唯 一的
                //所以这里results这个数组可以取值返回.
                data: results[0],

            })
        }

    });



})
// //编辑英雄
app.post('/updaHero', upload.single('Kingicon'), (req, res) => {

    //如果不改头像，只改名字和技能.我们希望这种需求也是可以的
    //console. log(req.file); //接收到的是文件(头像)，如果没有 传，那是undefined.
    //console. log(req.body); //接收到的是文本参数

    //赋值
    //如果修改了头像，那obj对象里面就有id, heroName，heroSkill, heroIcon
    //如果没有修改头像，那obj对象里面就只有id, heroName，heroSkill

    let { id, Kingname, Kingskill2, Kingskill3, Kingskill4 } = req.body;
    let obj = { id, Kingname, Kingskill2, Kingskill3, Kingskill4 }
    if (req.file != undefined) {
        //能够进到这里来,说明传了修改后的头像进来.
        obj.Kingicon = 'http://127.0.0.1 :4399/' + req.file.filename;
    }
    heroModel.update(`id=${id}`, obj, (err, results) => {
        if (err) {
            res.send({
                code: 200,
                msg: '服务器错误'
            });

        } else {
            res.send({
                code: 200,
                msg: '服务器错误'
            });
        }

    })

})

//a.导入验证码插件
var svgCaptcha = require('svg-captcha');
//b.使用
app.get('/captcha', (req, res) => {
    //创建一个验证码
    var captcha = svgCaptcha.create({
        size: 4,
        ignoreChars: '0o1i1',
        color: 'red',
        background: 'black'

    });


    captchaText = captcha.text

    //返回验证码
    res.type('svg');
    res.status(200).send(captcha.data);
});

//如果找不到这个页面，就302重定向到login页面
// app.use((req, res) => {
//     //服务器重定向:服务器主动修改浏览器地址栏
//     //www. itcast.com => www. itcast.cn
//     //a.设置302请求头
//     //b .结束响应，
//     res.writeHead(302, {
//         Location: 'http://127.0.0.1:8999/login.html'
//     });
//     res.end();
// });




app.listen(8999, () => {

    console.log('服务区器已经开启')

})