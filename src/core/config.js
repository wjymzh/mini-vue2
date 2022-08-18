let __DEV__ = true;

export default {
  optionMergeStrategies: Object.create(null),

  silent: false,

  productionTip: __DEV__,

  devtools: __DEV__,

  performance: false,

  errorHandler: null,

  warnHandler: null,

  ignoredElements: [],

  keyCodes: Object.create(null),

  //   isReservedTag: no,

  //   isReservedAttr: no,

  //   isUnknownElement: no,

  //   getTagNamespace: noop,

  //   parsePlatformTagName: identity,

  //   mustUseProp: no,

  async: true,

  //   _lifecycleHooks: LIFECYCLE_HOOKS,
};
