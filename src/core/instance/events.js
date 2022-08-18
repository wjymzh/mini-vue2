import {tip,invokeWithErrorHandling } from '../../util/index'

export function eventsMixin (Vue){
    const hookRE = /^hook:/  //顶一个正则,匹配hook:开头的

    Vue.prototype.$on = function(event,fn){
        const vm = this

        // 如果是数组，就循环~
        if (Array.isArray(event)) {
            for (let i = 0, l = event.length; i < l; i++) {
              vm.$on(event[i], fn)
            }
          } else {
            // 对实例身上的_event数组进行push操作,加入当前的回调
            // vm._event.xxx = [fn]
            (vm._events[event] || (vm._events[event] = [])).push(fn)
            // 如果是hook:开头。说明是钩子事件。
            if (hookRE.test(event)) {
                // 那么实例上的_hasHookEvent就是true,表示已经执行过了
              vm._hasHookEvent = true
            }
          }
          return vm
    }

    // 此处有坑
    Vue.prototype.$once = function (event,fn) {
        const vm = this
        function on () {
          vm.$off(event, on)
          fn.apply(vm, arguments)
        }
        on.fn = fn
        //先执行fn,然后$off,然后over
        vm.$on(event, on)
        return vm
      }

      Vue.prototype.$off = function (event, fn) {
        const vm = this
        // all
        if (!arguments.length) {
          vm._events = Object.create(null)
          return vm
        }   
        // array of events
        if (Array.isArray(event)) {
          for (let i = 0, l = event.length; i < l; i++) {
            vm.$off(event[i], fn)
          }
          return vm
        }
        // specific event
        const cbs = vm._events[event]
        // 如果不存在该事件名，返回该实例
        // 如果存在，检测传入的fn是否存在，如果不存在，直接将_events的[event]置空

        if (!cbs) {
          return vm
        }
        if (!fn) {
          vm._events[event] = null
          return vm
        }
        // specific handler
        // 如果存在该fn
        let cb
        let i = cbs.length
        // 循环删除 vm._events[event]中的所有fn
        while (i--) {
          cb = cbs[i]
          if (cb === fn || cb.fn === fn) {
            cbs.splice(i, 1)
            break
          }
        }
        return vm
      }

      Vue.prototype.$emit = function (event) {
        const vm = this

        if (process.env.NODE_ENV !== 'production') {
          const lowerCaseEvent = event.toLowerCase()
          if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
            tip(
              `Event "${lowerCaseEvent}" is emitted in component ` +
              `${formatComponentName(vm)} but the handler is registered for "${event}". ` +
              `Note that HTML attributes are case-insensitive and you cannot use ` +
              `v-on to listen to camelCase events when using in-DOM templates. ` +
              `You should probably use "${hyphenate(event)}" instead of "${event}".`
            )
          }
        }
        // 如果是多个就循环
        let cbs = vm._events[event]
        if (cbs) {
          cbs = cbs.length > 1 ? toArray(cbs) : cbs
          const args = toArray(arguments, 1)
          const info = `event handler for "${event}"`
          for (let i = 0, l = cbs.length; i < l; i++) {
            // 循环处理数组，内部只是为了处理异常
            invokeWithErrorHandling(cbs[i], vm, args, vm, info)
          }
        }
        return vm
      }
}