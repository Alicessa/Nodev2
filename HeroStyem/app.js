const express = require('express')
const app = express();
const path = require('path')
var cors = require('cors')
app.use(cors())
//指定开放静态资源文件夹
app.use(express.static('views'))
app.use(express.static('public/img'))


const multer = require('multer')
// 接受上传过来的文件放在哪个文件夹下
var upload = multer({ dest: 'public/img' })
// 导入小工具
// const  db= require('./utils/db')
// 使用绝对路径的方式
const db = require(path.join(__dirname, 'utils', 'db.js'))

const bodyParser = require('body-parser')
// 方式为x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))//转化

//中间件,解决跨域
//使用中间件的方式来设置资源共享，这样的话就不用在每一个接口中设置了.

// 也可以使用第三方插件 npm i cors
// d安装好之后导入使用app.use(cors())效果是一样的

    





//用户登录
app.post('/login', (req, res) => {
//设置响应头，允许资源被访问/共享.
res.setHeader( ' Access-Control-Allow-0rigin','*'); //*表示所有的请求路径都可以请求这个,
//允许不同源访问//这种2方法为叫做cors


    // 解构语法赋值
    let { username, password } = req.body;
    //   验证账户
    if (username == 'sa' && password == '123') {
        res.send({
            code: 200,
            msg: '登录成功！'
        })
    } else {
        res.send({
            code: 400,
            msg: '登录失败！账号密码错误'
        })
    }

})
// 获取英雄列表
app.get('/Herolist', (req, res) => {
    // 调用db里的方法
    let list = db.Herolist();
    res.send({
        code: 200,
        data: list
    })
})
// //添加英雄
app.post('/addHero', upload.single('icon'), (req, res) => {


    // 将服务器传回的数据进行保存
    let { name, skill } = req.body
    let icon = req.file.filename;

    //把这些数据利用db.js里的方法保存起来
    let result = db.addHero({
        // name:name//简写
        name,
        skill,
        icon:'http://127.0.0.1:7878/'+icon//加上我们地址
    })
    // result为addHero里的添加方法的返回值
    if (result) {
        res.send('成功')
    }
    else {
        res.send('失败')
    }

})
//删除英雄
app.get('/deleHero', (req, res) => {
    //接收前端传过来的英雄id进行删除
    let { id } = req.query
    let result = db.deleHeroById(id)
    if (result) {
        res.send('删除成功')
    }
    else {
        res.send('删除失败')
    }
})
// //根据id查看英雄
app.get('/Heroinfo', (req, res) => {
    //更具前端传递过来的，要编辑的这个英雄的id
    let { id } = req.query;
    let result = db.Heroinfo(id)
    if (result) {
        res.send({
            code: 200,
            msg: '获取成功',
            data: result
        })
    }
    else {
        res.send('获取失败')
    }
})
// //编辑英雄
app.post('/updaHero', upload.single('icon'), (req, res) => {
    //用模块multer来接收用户编辑之后的(英雄id,英雄名,英雄技能,英雄头像)
    //文件(英雄头像) req.file.filename;
    //  存变量
    let icon = req.file.filename;
    let { id, name, skill } = req.body;
   let result= db.updaHero({
        id, name, skill, icon
    })
    if (result) {
        res.send('修改成功')
    }
    else {
        res.send('修改失败')
    }

})
//如果找不到这个页面，就302重定向到login页面
app.use((req,res )=>{
    //服务器重定向:服务器主动修改浏览器地址栏
    //www. itcast.com => www. itcast.cn
    //a.设置302请求头
    //b .结束响应，
    res.writeHead(302,{
    Location: 'http://127.0.0.1:7878/login.html'
    });
    res . end();
});
    



app.listen(7878, () => {

    console.log('服务区器已经开启')

})