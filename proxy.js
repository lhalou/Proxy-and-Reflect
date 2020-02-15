//实例一
/*
把小于0的数据过滤掉，避免一些bug，其中gama为被代理的对象
*/
var game = {
  lives: 3
};
var proxy = new Proxy(game, {
  get(target, name) {
    return Reflect.get(target, name);
  },
  set(target, name, value) {
    if (name === "lives" && value < 0) {
      value = 0;
    }
    return Reflect.set(target, name, value);
  }
});
proxy.lives = -1;
proxy.lives; //0

//实例二
/*
其中game可以不暴露，防止可以使用game.lives修改lives的值,此时只能操作proxy，被代理的对象是匿名的
*/
var proxy = new Proxy(
  { lives: 3 },
  {
    get(target, name) {
      return Reflect.get(target, name);
    },
    set(target, name, value) {
      if (name === "lives" && value < 0) {
        value = 0;
      }
      return Reflect.set(target, name, value);
    }
  }
);
proxy.lives = -1;
proxy.lives; //0

//实例三
/* 
可以使白带里对象的任何属性，甚至不存在的属性的值都是一样的。
*/
var proxy = new Proxy(
  {},
  {
    get: function(target, property) {
      return 35;
    }
  }
);
proxy.name; //35
proxy.age; // 35

//实例四
/*
Proxy在vue3中使用
Vue是通过Object.defineProperty来做响应式的，但必须指定Key.
Proxy这个API是不需要指定KEY。
Proxy代理对象的时候，只能代理当前对象，不能代理这个对象的子对象，但是可以使用遍历，使其都代理。
 */
