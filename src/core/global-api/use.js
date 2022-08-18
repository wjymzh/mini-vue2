export function initUse(Vue) {
  Vue.use = function (plugin) {
    const installedPlugins =
      this._installedPlugins || (this._installedPlugins = []);
    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    }
    // 省略一些代码，此处是Vue.use的核心方法
    return this;
  };
}
