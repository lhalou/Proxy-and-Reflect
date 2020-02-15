//get
var obj = {
  name: "frank",
  age: 18
};
Reflect.get(obj, "name"); // frank
//以上代码等价于obj.name

//映射obj1的baz到obj2上的方法
var obj1 = {
  foo: 1,
  boo: 2,
  get baz() {
    console.log(this.foo + this.boo);
  }
};
var obj2 = {
  foo: 3,
  boo: 4
};

Reflect.get(obj1, "baz", obj2);

/*
其中：如果baz()前面没有get,作为一个普通函数属性可以使用：
obj1.baz.call(obj2)
*/

//获取几个数中的最小值

/*方法一*/ var min = Math.min; //需要调用min(1,2,3) //1
/*方法二*/ var min = (...args) => Math.min.apply(Math, args); //需要调用min(1,2,3) //1
/*方法三 */ Reflect.apply(Math.min, undefined /*this */, [1, 2, 3]); //不需要调用，直接返回1

//new fn()会得到一个对象

function Greeting(name) {
  this.name = name;
}

new Greeting("frank"); //返回Greeting{name:'frank'}
//方法二
Reflect.construct(fn, []);
