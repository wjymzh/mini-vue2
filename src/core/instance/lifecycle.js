import {invokeWithErrorHandling } from '../../util/index'

export function lifecycleMixin (Vue) {
    Vue.prototype._update = function (vnode, hydrating) {
        const vm = this
        const prevEl = vm.$el
        const prevVnode = vm._vnode

        const restoreActiveInstance = setActiveInstance(vm)

        vm._vnode = vnode
        
        // 此处判断是新增还是更新
        if (!prevVnode) {
            // initial render
            vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
          } else {
            // updates
            vm.$el = vm.__patch__(prevVnode, vnode)
          }
        
          // 把activeInstance置空
          restoreActiveInstance()

          // 一波操作
          if (prevEl) {
            prevEl.__vue__ = null
          }
          if (vm.$el) {
            vm.$el.__vue__ = vm
          }
        // 又是一波更新操作
          if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
            vm.$parent.$el = vm.$el
          }
    }

    // 强制当前组件更新
    Vue.prototype.$forceUpdate = function () {
        const vm = this
        if (vm._watcher) {
          vm._watcher.update()
        }
      }

      Vue.prototype.$destroy = function () {
        const vm = this
        if (vm._isBeingDestroyed) {
          return
        }
        callHook(vm, 'beforeDestroy')
        vm._isBeingDestroyed = true
        // remove self from parent
        const parent = vm.$parent
        if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
          remove(parent.$children, vm)
        }
        // teardown watchers
        if (vm._watcher) {
          vm._watcher.teardown()
        }
        let i = vm._watchers.length
        while (i--) {
          vm._watchers[i].teardown()
        }

        if (vm._data.__ob__) {
          vm._data.__ob__.vmCount--
        }
        // call the last hook...
        vm._isDestroyed = true
        // invoke destroy hooks on current rendered tree
        vm.__patch__(vm._vnode, null)
        // fire destroyed hook
        callHook(vm, 'destroyed')
        // turn off all instance listeners.
        vm.$off()
        // remove __vue__ reference
        if (vm.$el) {
          vm.$el.__vue__ = null
        }
        // release circular reference (#6759)
        if (vm.$vnode) {
          vm.$vnode.parent = null
        }
      }
}

export let activeInstance = null

// return了一个function ，后面再纠结
export function setActiveInstance(vm) {
    const prevActiveInstance = activeInstance
    activeInstance = vm
    return () => {
      activeInstance = prevActiveInstance
    }
  }

  export function callHook (vm, hook) {
   // push target在这里
    // pushTarget()
    const handlers = vm.$options[hook]
    const info = `${hook} hook`
    if (handlers) {
      for (let i = 0, j = handlers.length; i < j; i++) {
        invokeWithErrorHandling(handlers[i], vm, null, vm, info)
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook)
    }
    // popTarget()
  }
  