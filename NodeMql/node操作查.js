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
//执行sql语句
connection.query(" select * from alicezation", (error, results, fields) => {
    //错误对象，如果没有错误就返回null
    //console. log(error);
    //执行sq1语句得到的结果集.有错的话就是undefined.
    console.log(results);
    // 也可以通过下标取值
    console.log(results[3].username);
    //拿到的是字段的信息
   console.log(fields);

});
//关闭连接
connection.end();
