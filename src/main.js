// 此处拿到的Vue构造函数是多次加工完的Vue
/**
 * 原始Vue core/instance/index
 * 添加全局API  core/index.js
 * 添加一些 指令，组件，_patch，$mount  web/runtime/index.js
 * 进行$mount 的重写  web/entry-runtime-with-compiler.js
 */
import Vue from "./web/entry-runtime-with-compiler";

const vm = new Vue({
  el: "#app",
});

console.log(vm);
