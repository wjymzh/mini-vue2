export const ASSET_TYPES = ["component", "directive", "filter"];
export function initAssetRegisters(Vue) {
  ASSET_TYPES.forEach((type) => {
    Vue[type] = function (id, definition) {
      // 暂时先不启用
      //   if (!definition) {
      //     return this.options[type + "s"][id];
      //   } else {
      //     /* istanbul ignore if */
      //     if (__DEV__ && type === "component") {
      //       validateComponentName(id);
      //     }
      //     if (type === "component" && isPlainObject(definition)) {
      //       // @ts-expect-error
      //       definition.name = definition.name || id;
      //       definition = this.options._base.extend(definition);
      //     }
      //     if (type === "directive" && isFunction(definition)) {
      //       definition = { bind: definition, update: definition };
      //     }
      //     this.options[type + "s"][id] = definition;
      //     return definition;
      //   }
    };
  });
}
