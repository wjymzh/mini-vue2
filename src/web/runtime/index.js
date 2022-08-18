import Vue from "../../core/index";
import { mountComponent } from "../../core/instance/lifecycle";
import { patch } from "./patch";

// 在构造函数的config里加一些东西
// Vue.config.mustUseProp = mustUseProp
// Vue.config.isReservedTag = isReservedTag
// Vue.config.isReservedAttr = isReservedAttr
// Vue.config.getTagNamespace = getTagNamespace
// Vue.config.isUnknownElement = isUnknownElement

// 在构造函数的options里加directives,components
// extend(Vue.options.directives, platformDirectives);
// extend(Vue.options.components, platformComponents);

// 挂载dom更新使用的__patch__方法到实例对象上
Vue.prototype.__patch__ = patch;

// 对实例对象进行$mount方法的添加  // 原始的$mount
Vue.prototype.$mount = function (el, hydrating) {
  el = el && query(el);
  // 先获取挂载容器,然后调用mountComponent
  return mountComponent(this, el, hydrating);
};

export default Vue;
