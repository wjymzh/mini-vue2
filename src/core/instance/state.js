
import {set,del} from '../../observer/index'

export function stateMixin (Vue) {
    const dataDef = {}
    dataDef.get = function () { return this._data }
    const propsDef = {}
    propsDef.get = function () { return this._props }
    
    // 如果调用set，就报错
    if (process.env.NODE_ENV !== 'production') {
        dataDef.set = function () {
          warn(
            'Avoid replacing instance root $data. ' +
            'Use nested data properties instead.',
            this
          )
        }
        propsDef.set = function () {
          warn(`$props is readonly.`, this)
        }
      }

    Object.defineProperty(Vue.prototype, '$data', dataDef)
    Object.defineProperty(Vue.prototype, '$props', propsDef)

    // 响应式里面的方法,像一个响应式对象添加和删除属性,并且让这个属性也具有响应式
    Vue.prototype.$set = set
    Vue.prototype.$delete = del

    Vue.prototype.$watch = function(expOrFn,cb,options){
        // 响应式的时候再补充
    }
}