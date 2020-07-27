const express = require('express')
//创建服务器
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))//转化格式
//写接口
app.post('/login', (req, res) => {
  //由于是post方式传递过来的参数，所以用req.query这种方式拿不到.
  // console. log(req);
  // console. log(req.query); 
  //要想通过post传递过来的参数，就要使用第三方模块：body-parser
  console.log(req.body) //{user:'sa',pwd"123}
  //处理
  if (req.body.username == 'admin' && req.body.password == ' 888888 ') {
    res.send({
      code: 200,
      msg: '登录成功'
    });
  } else {
    res.send({
      code: 400,
      msg: '账号密码不对',
    })
  }
});



app.listen(8888, () => {
  console.log('服务开启')
})