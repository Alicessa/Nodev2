//1.导入模块
const sql = require('mysql-ithm');

//2.连接数据库
//如果数据库存在则连接，不存在则会自动创建数据库
sql.connect({
    host: '127.0.0.1',//数据库地址
    port: ' 3306 ',
    user: 'root',//用户名，没有可不填
    password: 'root',//密码， 没有可不填
    database: 'alicezat2' //数据库名称
});
//3.创建Model(表格模型:负责增删改查)
//如果table表格存在则连接，不存在则自动创建
let hmModel = sql.model('hmsql', {
    username: String,
    password: String,


});
//4.调用api
//4.1添加单个数据
// hmModel.insert({ username: '张三', password: 30 }, (err, results) => {
//     console.log(err);
//     console.log(results);
//     if (!err) console.log('增加成功');
// });


//4.3添加多个数据
// let arr = [
//     { username: 'sfsf' , password: "wrwer" },
   
//     { username: '2343',   password: '2434' },
    
    
// ];
// hmModel.insert(arr, (err, results) => {
//     console.log(err);
//     console.log(results);
//     if (!err) console.log("增加成功");
// });


//4.3查 询所有数据
// hmModel. find((err ,results)=>{
// console.log( results);
// });



//4.4根据数据库字段查询部分数据
//['name']:将要查询的字段放入数组中
// hmModel.find([ ' heroName ',' heroSkill' ], (err,results)=>{
//     console . log(results);
// });



//4.5根据条件查询数据
// 'id=1' :查询id为1的数据(查询条件可以参考sq1语句)
//例如‘age>10' :查询age超过10的数据

//例如'name>"张三” :查询名字为张三的数据，注意字符串添加引号
// hmModel. find( 'id>2', (err , results)=>{
//
//console.log(results);
// }); 


//4.6 将数据库中id = 2的数据，age修改为30
// hmModel.update('id=2 ',{username:'1232',password:'1sfsdfs'},(err,results)=>{
//     console.log(results);
// });

//4.7删除所有id>3的数据
heroModel.delete('id>3',(err,results)=>{
    console.log(results);
});
    
    