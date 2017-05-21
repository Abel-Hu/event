/**
 * Created by ken on 2017/5/21.
 */
import mobx from './mobx'

const isObservable = mobx.isObservable;
const isObservableArray = mobx.isObservableArray;
const isObservableObject = mobx.isObservableObject;
const isObservableValue = mobx.isObservableValue;
const isObservableMap = mobx.isObservableMap;

const _mergeGetterValue = function (res, object) {
  Object.getOwnPropertyNames(object).forEach(function (propertyName) {
    if (propertyName === "$mobx") {
      return
    }
    ;
    let descriptor = Object.getOwnPropertyDescriptor(object, propertyName);
    if (descriptor && !descriptor.enumerable && !descriptor.writable) {
      res[propertyName] = toJS(object[propertyName]);
    }
  })
}

export const toJS = function (source, detectCycles, __alreadySeen) {
  if (detectCycles === void 0) {
    detectCycles = true;
  }
  if (__alreadySeen === void 0) {
    __alreadySeen = [];
  }
  function cache(value) {
    if (detectCycles)
      __alreadySeen.push([source, value]);
    return value;
  }

  if (isObservable(source)) {
    if (detectCycles && __alreadySeen === null)
      __alreadySeen = [];
    if (detectCycles && source !== null && typeof source === "object") {
      for (let i = 0, l = __alreadySeen.length; i < l; i++)
        if (__alreadySeen[i][0] === source)
          return __alreadySeen[i][1];
    }
    if (isObservableArray(source)) {
      let res = cache([]);
      let toAdd = source.map(function (value) {
        return toJS(value, detectCycles, __alreadySeen);
      });
      res.length = toAdd.length;
      for (let i = 0, l = toAdd.length; i < l; i++)
        res[i] = toAdd[i];
      return res;
    }
    if (isObservableObject(source)) {
      let res = cache({});
      for (let key in source)
        res[key] = toJS(source[key], detectCycles, __alreadySeen);
      _mergeGetterValue(res, source);
      return res;
    }
    if (isObservableMap(source)) {
      let res_1 = cache({});
      source.forEach(function (value, key) {
        return res_1[key] = toJS(value, detectCycles, __alreadySeen);
      });
      return res_1;
    }
    if (isObservableValue(source))
      return toJS(source.get(), detectCycles, __alreadySeen);
  }

  if (Object.prototype.toString.call(source) === '[object Array]') {
    return source.map(function (value) {
      return toJS(value);
    });
  }
  if (source !== null && typeof source === 'object') {
    let res = {};
    for (let key in source) {
      res[key] = toJS(source[key]);
    }
    return res;
  }
  return source;
}