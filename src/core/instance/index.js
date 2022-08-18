import { initMixin } from './init'
import { stateMixin } from './state'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { renderMixin } from './render'

function Vue (options) {

    this._init(options)
  }


  initMixin(Vue) // 给实例对象身上添加最核心的_init方法
  stateMixin(Vue) // 初始化实例身上的$data和$props,定义只读,添加实例的 set,watch,del方法
  eventsMixin(Vue) // 添加$on,$once,$off,$emit等事件处理方法,在系统总线通信?
  lifecycleMixin(Vue)  // 添加_update,$forceUpdate,$destroy
  renderMixin(Vue)    // 添加$nextTick,_render

  export default Vue