const [a,b,c,d]='fgjl'
console.log(a);
//输出a=f

var [a,b,c] =[1,2,3];
console.log(a+b+c);
//输出6，必须一一对应abc数组解析顺序
var obj={name:'eru','age':23}
var {name,age}=obj;
console(name);
//不能names,d对象解析必须和属性一一对应



letobj={
    name:'波波',
    age:38,
    gender:'男',
    score: 100 
    }
    //1 .
    // let {name, age，gender ,score} = obj;
    // console. log(name，age，gender ,score); I
    //2.//2. obj2就相当于是obj对象里面除了name属性之前的属性们组成的一个对象。|
let {name,...obj2} = obj;
console . log(obj2);

    