/**
 * Created by tach on 2016/3/21.
 */
//函数声明提前，表达式定义的函数与变量类似; 同名不同方式定义的函数会覆盖之前定义的
    dog();
    //cat();
var dog=function(){
    console.log('wang wang');
}
var cat=function(){
    console.log('miao');
}
    dog();
function dog(){
    console.log('wang')
}
//块级作用域
for(var i=0;i<10;i++){
    var m="mydog";
}
console.log(m);
//只能给引用类型的变量动态增加属性
var name="tom";
tom.age=32;
console.log(tom.age);