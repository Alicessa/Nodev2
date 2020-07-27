let p1 = fun('a');
let p2 =fun('b' );
let p3 = fun('c');
//Promise.all()方法用于将多个Promise实例，包装成一个新的Promise 实例。

let pRace = Promise. race([p1,p2,p3]);
//只要有一个promise执行成功，那这个pRace就成功，相当于是或者.
pRace. then( (data)=>{
console.log(data); 
});




p1. then( (data)=>{
console. log(data);
return p2;
} ). then( (data)=>{
console . log(data);
return p3;
}). then( (data)=>{
console . log(data) ;
});