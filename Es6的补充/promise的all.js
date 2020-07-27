let p1 = fun('a');
let p2 =fun('b' );
let p3 = fun('c');
//Promise.all()方法用于将多个Promise实例，包装成一个新的Promise 实例。

let pall=promises.all([p1,p2,p3])
pall.then((data)=>{
    console. log(data);
    return p2;
})
// 前提是每一个都成功这个方法才会成功
// 这个方法就是下面的整合


p1. then( (data)=>{
console. log(data);
return p2;
} ). then( (data)=>{
console . log(data);
return p3;
}). then( (data)=>{
console . log(data) ;
});