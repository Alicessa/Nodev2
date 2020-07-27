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
let id=4;
//执行sql语句
connection.query(`delete from aliceztion where id=${id} `, (error, results, fields) => {
    //错误对象，如果没有错误就返回null
    //console. log(error);
    //执行sq1语句得到的结果集.有错的话就是undefined.
    if(error==null){
        console.log(results);//返回一个对象
        console.log(results.affectedRows)//返回的是受影响的行数，如果大于0新增成功
        console.log(results.insertId)
    }

});
//关闭连接
connection.end();
