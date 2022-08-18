import config from "../config";
import { initUse } from "./use";
import { initMixin } from "./mixin";
import { initExtend } from "./extend";
import { initAssetRegisters } from "./assets";
import { set, del, observe } from "../../observer/index";
import builtInComponents from "../components/index";
import {
  nextTick,
  warn,
  extend,
  mergeOptions,
  defineReactive,
} from "../../util/index";

let __DEV__ = true;

export function initGlobalAPI(Vue) {
  // 定义一个configDef,加入Vue实例的config属性，只读
  const configDef = {};
  configDef.get = () => config;
  if (__DEV__) {
    configDef.set = () => {
      warn(
        "Do not replace the Vue.config object, set individual fields instead."
      );
    };
  }
  Object.defineProperty(Vue, "config", configDef);

  //在构造函数上暴露一些方法
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive, // 很重要的
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.observable = (obj) => {
    observe(obj);
    return obj;
  };

  Vue.options = Object.create(null);

  const ASSET_TYPES = ["component", "directive", "filter"]; // 此处直接简写了
  ASSET_TYPES.forEach((type) => {
    Vue.options[type + "s"] = Object.create(null); // 给整个实例的options添加 components,directives,filters
  });
  // 保存一下实例
  Vue.options._base = Vue;

  // 一个混合方式,把keep-alive添加到实例的options.components里？
  extend(Vue.options.components, builtInComponents);

  initUse(Vue); // 添加构造函数的Vue.use方法，调用install方法进行插件安装
  initMixin(Vue); // 添加构造函数的Vue.mixin 方法,mergeOptions来实现
  initExtend(Vue); // 给Vue构造函数添加extend方法
  initAssetRegisters(Vue); // 静态注册 Vue.component Vue.filter Vue.directive
}
