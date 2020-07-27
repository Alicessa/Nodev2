//导包
var mysql = require("mysql");
//创建一个和数据库的连接
var connection = mysql.createConnection({
    host: "localhost", //数据库服务器的地址
    user: "root", //账号
    password: "root", //密码
    database: "alicezat2", //数据库名
});
//打开连接
connection.connect();
let name="桐谷直叶";
let arms="单手剑·绿叶精魂"
//执行sql语句
connection.query(`insert into alicezation(name,arms) values ('${name}','${arms}');`, (error, results, fields) => {
    if(error==null){
        console.log(results);//返回一个对象
        console.log(results.affectedRows)//返回的是受影响的行数，如果大于0新增成功
        console.log(results.insertId)
    }
  
});
//关闭连接
connection.end();