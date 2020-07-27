var fs = require('fs');
const { promises } = require('dns');
function fun(files) {
    return new Promise(function (succ, err) {//解决回调地狱的问题
        fs.readFile(files, 'utf8', function (err, data) {
            succ(data);//成功返回的数据
        })
    });
}
fun(' ./a.txt')
then(function (data) {
    console.log(data);
    return (fun(' ./b.txt'));
},(err=>{
    // 如果读取b文件报错
    console(err)
}))
then(function (data) {
    console.log(data);
    return (fun('./c.txt'));
})
then(function (data) {
    console.log(data);
}).catch((err)={
// 这个就不用每个写上面的err=>
// 这里直接抓取任何错误
console(err)
})




