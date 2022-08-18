export function tip(info){
console.log(info)
}

export function invokeWithErrorHandling (
    handler,
    context,
    args,
    vm,
    info
  ) {
    let res
    try {
      res = args ? handler.apply(context, args) : handler.call(context)
      if (res && !res._isVue && isPromise(res) && !res._handled) {
        
        res.catch(e => console.log(e, vm, info + ` (Promise/async)`)) // 此处报个错

        res._handled = true
      }
    } catch (e) {
      console.log(e, vm, info)
    }
    return res
  }
  let timerFunc
  const callbacks = []
  export function nextTick (cb, ctx) {
    let _resolve
    callbacks.push(() => {
      if (cb) {
        try {
          cb.call(ctx)
        } catch (e) {
          console.log(e, ctx, 'nextTick')
        }
      } else if (_resolve) {
        _resolve(ctx)
      }
    })
    if (!pending) {
      pending = true
      timerFunc()
    }
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(resolve => {
        _resolve = resolve
      })
    }
  }
  