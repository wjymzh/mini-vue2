
let uid = 0

export function initMixin (Vue){
    Vue.prototype._init = function(options){
        const vm = this
        vm._uid = uid++

        // 往实例身上添加一些奇怪的属性
        vm._isVue = true

        vm.$options = options   //这里有更多复杂的合并操作

        vm._renderProxy = vm  // 此处针对生产环境和开发环境有不同的操作，此处以开发环境为例

        vm._self = vm     // 向实例身上暴露对象本身

        // 核心的初始化操作
        // initLifecycle(vm)
        // initEvents(vm)
        // initRender(vm)
        // callHook(vm, 'beforeCreate')
        // initInjections(vm) 
        // initState(vm)
        // initProvide(vm)
        // callHook(vm, 'created')
        
        // 调用实例身上的$mount方法准备渲染
        // if (vm.$options.el) {
        //     vm.$mount(vm.$options.el)
        //   }
    }
}