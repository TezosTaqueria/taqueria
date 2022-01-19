var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve5, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve5(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// node_modules/infestines/dist/infestines.cjs.js
var require_infestines_cjs = __commonJS({
  "node_modules/infestines/dist/infestines.cjs.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var AP = "ap";
    var CHAIN = "chain";
    var MAP = "map";
    var OF = "of";
    var FANTASY_LAND_SLASH = "fantasy-land/";
    var FANTASY_LAND_SLASH_OF = FANTASY_LAND_SLASH + OF;
    var FANTASY_LAND_SLASH_MAP = FANTASY_LAND_SLASH + MAP;
    var FANTASY_LAND_SLASH_AP = FANTASY_LAND_SLASH + AP;
    var FANTASY_LAND_SLASH_CHAIN = FANTASY_LAND_SLASH + CHAIN;
    var CONSTRUCTOR = "constructor";
    var PROTOTYPE = "prototype";
    var id = function id2(x) {
      return x;
    };
    function _defineNameU(fn, value) {
      return Object.defineProperty(fn, "name", { value, configurable: true });
    }
    var defineNameU = /* @__PURE__ */ function() {
      try {
        return _defineNameU(_defineNameU, "defineName");
      } catch (_) {
        return function(fn, _2) {
          return fn;
        };
      }
    }();
    var setName = process.env.NODE_ENV === "production" ? function(x) {
      return x;
    } : function(to, name) {
      return defineNameU(to, name);
    };
    var copyName = process.env.NODE_ENV === "production" ? function(f) {
      return f;
    } : function(to, from) {
      return defineNameU(to, from.name);
    };
    var withName = process.env.NODE_ENV === "production" ? id : function(ary) {
      return function(fn) {
        return copyName(ary(fn), fn);
      };
    };
    var ary1of2 = /* @__PURE__ */ withName(function(fn) {
      return function(x0, x1) {
        return arguments.length < 2 ? fn(x0) : fn(x0)(x1);
      };
    });
    var ary2of2 = /* @__PURE__ */ withName(function(fn) {
      return function(x0, x1) {
        return arguments.length < 2 ? copyName(function(x12) {
          return fn(x0, x12);
        }, fn) : fn(x0, x1);
      };
    });
    var ary1of3 = /* @__PURE__ */ withName(function(fn) {
      return function(x0, x1, x2) {
        switch (arguments.length) {
          case 0:
          case 1:
            return curryN(2, fn(x0));
          case 2:
            return curryN(2, fn(x0))(x1);
          default:
            return curryN(2, fn(x0))(x1, x2);
        }
      };
    });
    var ary2of3 = /* @__PURE__ */ withName(function(fn) {
      return function(x0, x1, x2) {
        switch (arguments.length) {
          case 0:
          case 1:
            return ary1of2(copyName(function(x12) {
              return fn(x0, x12);
            }, fn));
          case 2:
            return fn(x0, x1);
          default:
            return fn(x0, x1)(x2);
        }
      };
    });
    var ary3of3 = /* @__PURE__ */ withName(function(fn) {
      return function(x0, x1, x2) {
        switch (arguments.length) {
          case 0:
          case 1:
            return ary2of2(copyName(function(x12, x22) {
              return fn(x0, x12, x22);
            }, fn));
          case 2:
            return copyName(function(x22) {
              return fn(x0, x1, x22);
            }, fn);
          default:
            return fn(x0, x1, x2);
        }
      };
    });
    var ary1of4 = /* @__PURE__ */ withName(function(fn) {
      return function(x0, x1, x2, x3) {
        switch (arguments.length) {
          case 0:
          case 1:
            return curryN(3, fn(x0));
          case 2:
            return curryN(3, fn(x0))(x1);
          case 3:
            return curryN(3, fn(x0))(x1, x2);
          default:
            return curryN(3, fn(x0))(x1, x2, x3);
        }
      };
    });
    var ary2of4 = /* @__PURE__ */ withName(function(fn) {
      return function(x0, x1, x2, x3) {
        switch (arguments.length) {
          case 0:
          case 1:
            return ary1of3(copyName(function(x12) {
              return fn(x0, x12);
            }, fn));
          case 2:
            return curryN(2, fn(x0, x1));
          case 3:
            return curryN(2, fn(x0, x1))(x2);
          default:
            return curryN(2, fn(x0, x1))(x2, x3);
        }
      };
    });
    var ary3of4 = /* @__PURE__ */ withName(function(fn) {
      return function(x0, x1, x2, x3) {
        switch (arguments.length) {
          case 0:
          case 1:
            return ary2of3(copyName(function(x12, x22) {
              return fn(x0, x12, x22);
            }, fn));
          case 2:
            return ary1of2(copyName(function(x22) {
              return fn(x0, x1, x22);
            }, fn));
          case 3:
            return fn(x0, x1, x2);
          default:
            return fn(x0, x1, x2)(x3);
        }
      };
    });
    var ary4of4 = /* @__PURE__ */ withName(function(fn) {
      return function(x0, x1, x2, x3) {
        switch (arguments.length) {
          case 0:
          case 1:
            return ary3of3(copyName(function(x12, x22, x32) {
              return fn(x0, x12, x22, x32);
            }, fn));
          case 2:
            return ary2of2(copyName(function(x22, x32) {
              return fn(x0, x1, x22, x32);
            }, fn));
          case 3:
            return copyName(function(x32) {
              return fn(x0, x1, x2, x32);
            }, fn);
          default:
            return fn(x0, x1, x2, x3);
        }
      };
    });
    var ary0of0 = function ary0of02(fn) {
      return fn.length === 0 ? fn : copyName(function() {
        return fn();
      }, fn);
    };
    var ary1of1 = function ary1of12(fn) {
      return fn.length === 1 ? fn : copyName(function(x) {
        return fn(x);
      }, fn);
    };
    var C = [[ary0of0], [ary1of1, ary1of1], [void 0, ary1of2, ary2of2], [void 0, ary1of3, ary2of3, ary3of3], [void 0, ary1of4, ary2of4, ary3of4, ary4of4]];
    var curryN = function curryN2(n, f) {
      return C[n][Math.min(n, f.length)](f);
    };
    var arityN = function arityN2(n, f) {
      return C[n][n](f);
    };
    var curry = function curry2(f) {
      return arityN(f.length, f);
    };
    var create = Object.create;
    var assign = Object.assign;
    var toObject = function toObject2(x) {
      return assign({}, x);
    };
    var always = function always2(x) {
      return function(_) {
        return x;
      };
    };
    var applyU = function apply(x2y, x) {
      return x2y(x);
    };
    var sndU = function snd(_, y) {
      return y;
    };
    var freeze = function freeze2(x) {
      return x && Object.freeze(x);
    };
    var freezeInDev = process.env.NODE_ENV === "production" ? id : freeze;
    var array0 = /* @__PURE__ */ freeze([]);
    var object0 = /* @__PURE__ */ freeze({});
    var isDefined = function isDefined2(x) {
      return x !== void 0;
    };
    var hasOwnProperty = Object[PROTOTYPE].hasOwnProperty;
    var hasU = function has(p, x) {
      return hasOwnProperty.call(x, p);
    };
    var prototypeOf = function prototypeOf2(x) {
      return x == null ? x : Object.getPrototypeOf(x);
    };
    var constructorOf = function constructorOf2(x) {
      return x == null ? x : (hasU(CONSTRUCTOR, x) ? prototypeOf(x) : x)[CONSTRUCTOR];
    };
    var isFunction2 = function isFunction3(x) {
      return typeof x === "function";
    };
    var isString = function isString2(x) {
      return typeof x === "string";
    };
    var isNumber = function isNumber2(x) {
      return typeof x === "number";
    };
    var isArray = Array.isArray;
    var object = /* @__PURE__ */ prototypeOf({});
    var isObject = function isObject2(x) {
      return x != null && typeof x === "object" && (hasU(CONSTRUCTOR, x) ? prototypeOf(x) === object : x[CONSTRUCTOR] === Object);
    };
    var isInstanceOfU = function isInstanceOf(C2, x) {
      return x instanceof C2;
    };
    var pipe2U = function pipe2(fn1, fn2) {
      var n = fn1.length;
      return n === 1 ? function(x) {
        return fn2(fn1(x));
      } : arityN(n, function() {
        return fn2(fn1.apply(void 0, arguments));
      });
    };
    var compose2U = function compose2(fn1, fn2) {
      return pipe2U(fn2, fn1);
    };
    function seq(x) {
      for (var _len = arguments.length, fns = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        fns[_key - 1] = arguments[_key];
      }
      for (var i = 0, n = fns.length; i < n; ++i) {
        x = fns[i](x);
      }
      return x;
    }
    function seqPartial(x) {
      for (var _len2 = arguments.length, fns = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        fns[_key2 - 1] = arguments[_key2];
      }
      for (var i = 0, n = fns.length; isDefined(x) && i < n; ++i) {
        x = fns[i](x);
      }
      return x;
    }
    var identicalU = function identical(a, b) {
      return a === b && (a !== 0 || 1 / a === 1 / b) || a !== a && b !== b;
    };
    var whereEqU = function whereEq(t, o) {
      for (var k in t) {
        var bk = o[k];
        if (!isDefined(bk) && !hasU(k, o) || !acyclicEqualsU(t[k], bk))
          return false;
      }
      return true;
    };
    var hasKeysOfU = function hasKeysOf(t, o) {
      for (var k in t) {
        if (!hasU(k, o))
          return false;
      }
      return true;
    };
    var acyclicEqualsObject = function acyclicEqualsObject2(a, b) {
      return whereEqU(a, b) && hasKeysOfU(b, a);
    };
    function acyclicEqualsArray(a, b) {
      var n = a.length;
      if (n !== b.length)
        return false;
      for (var i = 0; i < n; ++i) {
        if (!acyclicEqualsU(a[i], b[i]))
          return false;
      }
      return true;
    }
    var acyclicEqualsU = function acyclicEquals(a, b) {
      if (identicalU(a, b))
        return true;
      if (!a || !b)
        return false;
      var c = constructorOf(a);
      if (c !== constructorOf(b))
        return false;
      switch (c) {
        case Array:
          return acyclicEqualsArray(a, b);
        case Object:
          return acyclicEqualsObject(a, b);
        default:
          return isFunction2(a.equals) && a.equals(b);
      }
    };
    var unzipObjIntoU = function unzipObjInto(o, ks, vs) {
      for (var k in o) {
        if (ks)
          ks.push(k);
        if (vs)
          vs.push(o[k]);
      }
    };
    function keys2(o) {
      if (isInstanceOfU(Object, o)) {
        if (isObject(o)) {
          var ks = [];
          unzipObjIntoU(o, ks, 0);
          return ks;
        } else {
          return Object.keys(o);
        }
      }
    }
    function values2(o) {
      if (isInstanceOfU(Object, o)) {
        if (isObject(o)) {
          var vs = [];
          unzipObjIntoU(o, 0, vs);
          return vs;
        } else {
          var xs = Object.keys(o);
          var n = xs.length;
          for (var i = 0; i < n; ++i) {
            xs[i] = o[xs[i]];
          }
          return xs;
        }
      }
    }
    var assocPartialU = function assocPartial(k, v, o) {
      var r = {};
      if (o instanceof Object) {
        if (!isObject(o))
          o = toObject(o);
        for (var l in o) {
          if (l !== k) {
            r[l] = o[l];
          } else {
            r[k] = v;
            k = void 0;
          }
        }
      }
      if (isDefined(k))
        r[k] = v;
      return r;
    };
    var dissocPartialU = function dissocPartial(k, o) {
      var r = void 0;
      if (o instanceof Object) {
        if (!isObject(o))
          o = toObject(o);
        for (var l in o) {
          if (l !== k) {
            if (!r)
              r = {};
            r[l] = o[l];
          } else {
            k = void 0;
          }
        }
      }
      return r;
    };
    var inherit = function inherit2(Derived, Base, protos, statics) {
      return assign(Derived[PROTOTYPE] = create(Base[PROTOTYPE]), protos)[CONSTRUCTOR] = assign(Derived, statics);
    };
    function Functor(map) {
      if (!isInstanceOfU(Functor, this))
        return freezeInDev(new Functor(map));
      this[MAP] = map;
    }
    var Applicative = /* @__PURE__ */ inherit(function Applicative2(map, of, ap) {
      if (!isInstanceOfU(Applicative2, this))
        return freezeInDev(new Applicative2(map, of, ap));
      Functor.call(this, map);
      this[OF] = of;
      this[AP] = ap;
    }, Functor);
    var Monad = /* @__PURE__ */ inherit(function Monad2(map, of, ap, chain) {
      if (!isInstanceOfU(Monad2, this))
        return freezeInDev(new Monad2(map, of, ap, chain));
      Applicative.call(this, map, of, ap);
      this[CHAIN] = chain;
    }, Applicative);
    var Identity = /* @__PURE__ */ Monad(applyU, id, applyU, applyU);
    var IdentityOrU = function IdentityOr(isOther, other) {
      var map = other[MAP];
      var ap = other[AP];
      var of = other[OF];
      var chain = other[CHAIN];
      var mapEither = function mapEither2(xy, xM) {
        return isOther(xM) ? map(xy, xM) : xy(xM);
      };
      var toOther = function toOther2(x) {
        return isOther(x) ? x : of(x);
      };
      return Monad(mapEither, id, function apEither(xyM, xM) {
        return isOther(xyM) ? isOther(xM) ? ap(xyM, xM) : map(function(xy) {
          return xy(xM);
        }, xyM) : mapEither(xyM, xM);
      }, function chainEither(xyM, xM) {
        return isOther(xM) ? chain(function(x) {
          return toOther(xyM(x));
        }, xM) : xyM(xM);
      });
    };
    var isThenable = function isThenable2(xP) {
      return xP != null && isFunction2(xP.then);
    };
    var thenU = function then(xyP, xP) {
      return xP.then(xyP);
    };
    var resolve5 = function resolve6(x) {
      return Promise.resolve(x);
    };
    var Async = /* @__PURE__ */ Monad(thenU, resolve5, function apAsync(xyP, xP) {
      return thenU(function(xy) {
        return thenU(xy, xP);
      }, xyP);
    }, thenU);
    var IdentityAsync = /* @__PURE__ */ IdentityOrU(isThenable, Async);
    var fantasyBop = function fantasyBop2(m) {
      return setName(function(f, x) {
        return x[m](f);
      }, m);
    };
    var fantasyMap = /* @__PURE__ */ fantasyBop(FANTASY_LAND_SLASH_MAP);
    var fantasyAp = /* @__PURE__ */ fantasyBop(FANTASY_LAND_SLASH_AP);
    var fantasyChain = /* @__PURE__ */ fantasyBop(FANTASY_LAND_SLASH_CHAIN);
    var FantasyFunctor = /* @__PURE__ */ Functor(fantasyMap);
    var fromFantasyApplicative = function fromFantasyApplicative2(Type) {
      return Applicative(fantasyMap, Type[FANTASY_LAND_SLASH_OF], fantasyAp);
    };
    var fromFantasyMonad = function fromFantasyMonad2(Type) {
      return Monad(fantasyMap, Type[FANTASY_LAND_SLASH_OF], fantasyAp, fantasyChain);
    };
    var fromFantasy = function fromFantasy2(Type) {
      return Type.prototype[FANTASY_LAND_SLASH_CHAIN] ? fromFantasyMonad(Type) : Type[FANTASY_LAND_SLASH_OF] ? fromFantasyApplicative(Type) : FantasyFunctor;
    };
    exports2.id = id;
    exports2.defineNameU = defineNameU;
    exports2.curryN = curryN;
    exports2.arityN = arityN;
    exports2.curry = curry;
    exports2.create = create;
    exports2.assign = assign;
    exports2.toObject = toObject;
    exports2.always = always;
    exports2.applyU = applyU;
    exports2.sndU = sndU;
    exports2.freeze = freeze;
    exports2.array0 = array0;
    exports2.object0 = object0;
    exports2.isDefined = isDefined;
    exports2.hasU = hasU;
    exports2.prototypeOf = prototypeOf;
    exports2.constructorOf = constructorOf;
    exports2.isFunction = isFunction2;
    exports2.isString = isString;
    exports2.isNumber = isNumber;
    exports2.isArray = isArray;
    exports2.isObject = isObject;
    exports2.isInstanceOfU = isInstanceOfU;
    exports2.pipe2U = pipe2U;
    exports2.compose2U = compose2U;
    exports2.seq = seq;
    exports2.seqPartial = seqPartial;
    exports2.identicalU = identicalU;
    exports2.whereEqU = whereEqU;
    exports2.hasKeysOfU = hasKeysOfU;
    exports2.acyclicEqualsObject = acyclicEqualsObject;
    exports2.acyclicEqualsU = acyclicEqualsU;
    exports2.unzipObjIntoU = unzipObjIntoU;
    exports2.keys = keys2;
    exports2.values = values2;
    exports2.assocPartialU = assocPartialU;
    exports2.dissocPartialU = dissocPartialU;
    exports2.inherit = inherit;
    exports2.Functor = Functor;
    exports2.Applicative = Applicative;
    exports2.Monad = Monad;
    exports2.Identity = Identity;
    exports2.IdentityOrU = IdentityOrU;
    exports2.isThenable = isThenable;
    exports2.resolve = resolve5;
    exports2.Async = Async;
    exports2.IdentityAsync = IdentityAsync;
    exports2.FantasyFunctor = FantasyFunctor;
    exports2.fromFantasyApplicative = fromFantasyApplicative;
    exports2.fromFantasyMonad = fromFantasyMonad;
    exports2.fromFantasy = fromFantasy;
  }
});

// node_modules/partial.lenses/dist/partial.lenses.cjs.js
var require_partial_lenses_cjs = __commonJS({
  "node_modules/partial.lenses/dist/partial.lenses.cjs.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var I = require_infestines_cjs();
    var LENGTH = "length";
    var addU = function addU2(x, y) {
      return x + y;
    };
    var multiplyU = function multiplyU2(x, y) {
      return x * y;
    };
    var add = /* @__PURE__ */ I.curry(addU);
    var multiply = /* @__PURE__ */ I.curry(multiplyU);
    var divideBy = /* @__PURE__ */ I.curry(function(d, n) {
      return n / d;
    });
    var negate = function negate2(x) {
      return -x;
    };
    var ltU = function ltU2(x, y) {
      return x < y;
    };
    var gtU = function gtU2(x, y) {
      return x > y;
    };
    var isInstanceOf = /* @__PURE__ */ I.curry(I.isInstanceOfU);
    var protoless = function protoless2(o) {
      return I.assign(I.create(null), o);
    };
    var protoless0 = /* @__PURE__ */ I.freeze(/* @__PURE__ */ protoless(I.object0));
    var replace = /* @__PURE__ */ I.curry(function(p, r, s) {
      return s.replace(p, r);
    });
    function isPrimitiveData(x) {
      switch (typeof x) {
        case "boolean":
        case "number":
        case "string":
          return true;
        default:
          return false;
      }
    }
    var iterator = Symbol.iterator;
    var dep = function dep2(xs2xsyC) {
      return function(xsy) {
        return I.arityN(xsy[LENGTH], I.defineNameU(function() {
          return xs2xsyC.apply(void 0, arguments)(xsy).apply(void 0, arguments);
        }, xsy.name));
      };
    };
    var fn = function fn2(xsC, yC) {
      return function(xsy) {
        return I.arityN(xsy[LENGTH], I.defineNameU(function() {
          for (var _len = arguments.length, xs = Array(_len), _key = 0; _key < _len; _key++) {
            xs[_key] = arguments[_key];
          }
          return yC(xsy.apply(null, xsC(xs)));
        }, xsy.name));
      };
    };
    var res = function res2(yC) {
      return fn(I.id, yC);
    };
    var args = function args2(xsC) {
      return fn(xsC, I.id);
    };
    var nth = function nth2(i, xC) {
      return function(xs) {
        var ys = xs.slice(0);
        ys[i] = xC(ys[i]);
        return ys;
      };
    };
    var par = function par2(i, xC) {
      return args(nth(i, xC));
    };
    var and = function and2() {
      for (var _len2 = arguments.length, xCs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        xCs[_key2] = arguments[_key2];
      }
      return function(x) {
        for (var i = 0, n = xCs[LENGTH]; i < n; ++i) {
          x = xCs[i](x);
        }
        return x;
      };
    };
    var or = function or2() {
      for (var _len3 = arguments.length, xCs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        xCs[_key3] = arguments[_key3];
      }
      return function(x) {
        var es = null;
        for (var i = 0, n = xCs[LENGTH]; i < n; ++i) {
          try {
            return xCs[i](x);
          } catch (e) {
            es = e;
          }
        }
        throw es;
      };
    };
    var ef = function ef2(xE) {
      return I.defineNameU(function(x) {
        xE(x);
        return x;
      }, xE.name);
    };
    var tup = function tup2() {
      for (var _len4 = arguments.length, xCs = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        xCs[_key4] = arguments[_key4];
      }
      return function(xs) {
        if (xs[LENGTH] !== xCs[LENGTH])
          throw Error("Expected array of " + xCs[LENGTH] + " elements, but got " + xs[LENGTH]);
        return and.apply(null, xCs.map(function(xC, i) {
          return nth(i, xC);
        }))(xs);
      };
    };
    var arr = function arr2(xC) {
      return function(xs) {
        return xs.map(xC);
      };
    };
    var id = function id2(x) {
      return x;
    };
    var setName = process.env.NODE_ENV === "production" ? function(x) {
      return x;
    } : I.defineNameU;
    var copyName = process.env.NODE_ENV === "production" ? function(x) {
      return x;
    } : function(to, from) {
      return I.defineNameU(to, from.name);
    };
    var toRegExpU = function toRegExpU2(str, flags) {
      return I.isString(str) ? new RegExp(replace(/[|\\{}()[\]^$+*?.]/g, "\\$&", str), flags) : str;
    };
    var isPair = function isPair2(x) {
      return I.isArray(x) && x[LENGTH] === 2;
    };
    var inserterOp = /* @__PURE__ */ I.curry(function(inserter, value) {
      return [inserter, setOp(value)];
    });
    var toGetter = function toGetter2(getter2) {
      if (typeof getter2 === "function" && getter2[LENGTH] < 4)
        return getter2;
      getter2 = toFunction(getter2);
      return function(x, i) {
        return getter2(x, i, Select, id);
      };
    };
    var tryCatch = function tryCatch2(fn$$1) {
      return copyName(function(x) {
        try {
          return fn$$1(x);
        } catch (e) {
          return e;
        }
      }, fn$$1);
    };
    var toStringPartial = function toStringPartial2(x) {
      return x !== void 0 ? String(x) : "";
    };
    var sliceIndex = function sliceIndex2(m, l, d, i) {
      return i !== void 0 ? Math.min(Math.max(m, i < 0 ? l + i : i), l) : d;
    };
    var cpair = function cpair2(xs) {
      return function(x) {
        return [x, xs];
      };
    };
    var pairPartial = function pairPartial2(k) {
      return function(v) {
        return k !== void 0 && v !== void 0 ? [k, v] : void 0;
      };
    };
    var unto = function unto2(c) {
      return function(x) {
        return x !== void 0 ? x : c;
      };
    };
    var unto0 = /* @__PURE__ */ unto(0);
    var toTrue = /* @__PURE__ */ I.always(true);
    var notPartial = function complement2(x) {
      return x !== void 0 ? !x : x;
    };
    var expect = function expect2(p, f) {
      return copyName(function(x) {
        return p(x) ? f(x) : void 0;
      }, f);
    };
    var freezeInDev = process.env.NODE_ENV === "production" ? id : I.freeze;
    var freezeResultInDev = process.env.NODE_ENV === "production" ? id : /* @__PURE__ */ res(I.freeze);
    var deepFreezeInDev = process.env.NODE_ENV === "production" ? id : function deepFreezeInDev2(x) {
      if (I.isArray(x)) {
        x.forEach(deepFreezeInDev2);
        I.freeze(x);
      } else if (I.isObject(x)) {
        for (var k in x) {
          deepFreezeInDev2(x[k]);
        }
        I.freeze(x);
      }
      return x;
    };
    function freezeObjectOfObjects(xs) {
      if (xs)
        for (var k in xs) {
          I.freeze(xs[k]);
        }
      return I.freeze(xs);
    }
    var isArrayOrPrimitive = function isArrayOrPrimitive2(x) {
      return !(x instanceof Object) || I.isArray(x);
    };
    var rev = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : res(I.freeze))(function reverse2(xs) {
      if (seemsArrayLike(xs)) {
        var n = xs[LENGTH];
        var ys = Array(n);
        var i = 0;
        while (n) {
          ys[i++] = xs[--n];
        }
        return ys;
      }
    });
    var mapPartialIndexU = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : function(fn$$1) {
      return function(xi2y, xs, skip) {
        var ys = fn$$1(xi2y, xs, skip);
        if (xs !== ys)
          I.freeze(ys);
        return ys;
      };
    })(function(xi2y, xs, skip) {
      var n = xs[LENGTH];
      var ys = Array(n);
      var j = 0;
      var same = true;
      for (var i = 0; i < n; ++i) {
        var x = xs[i];
        var y = xi2y(x, i);
        if (skip !== y) {
          ys[j++] = y;
          if (same)
            same = x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
        }
      }
      if (j !== n) {
        ys[LENGTH] = j;
        return ys;
      } else if (same) {
        return xs;
      } else {
        return ys;
      }
    });
    var mapIfArrayLike = function mapIfArrayLike2(xi2y, xs) {
      return seemsArrayLike(xs) ? mapPartialIndexU(xi2y, xs, void 0) : void 0;
    };
    var mapsIfArray = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : res(I.freeze))(function(x2y, xs) {
      if (I.isArray(xs)) {
        var n = xs[LENGTH];
        var ys = Array();
        for (var i = 0; i < n; ++i) {
          if ((ys[i] = x2y(xs[i])) === void 0) {
            return void 0;
          }
        }
        return ys;
      }
    });
    var copyToFrom = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : function(fn$$1) {
      return function(ys, k, xs, i, j) {
        return ys[LENGTH] === k + j - i ? I.freeze(fn$$1(ys, k, xs, i, j)) : fn$$1(ys, k, xs, i, j);
      };
    })(function(ys, k, xs, i, j) {
      while (i < j) {
        ys[k++] = xs[i++];
      }
      return ys;
    });
    function selectInArrayLike(xi2v, xs) {
      for (var i = 0, n = xs[LENGTH]; i < n; ++i) {
        var v = xi2v(xs[i], i);
        if (v !== void 0)
          return v;
      }
    }
    var ConstantWith = function ConstantWith2(ap, empty) {
      return I.Applicative(I.sndU, I.always(empty), ap);
    };
    var ConstantOf = function ConstantOf2(_ref) {
      var concat2 = _ref.concat, empty = _ref.empty;
      return ConstantWith(concat2, empty());
    };
    var Sum = /* @__PURE__ */ ConstantWith(addU, 0);
    var mumBy = function mumBy2(ord) {
      return I.curry(function mumBy3(xi2y, t, s) {
        xi2y = toGetter(xi2y);
        var minX = void 0;
        var minY = void 0;
        getAsU(function(x, i) {
          var y = xi2y(x, i);
          if (y !== void 0 && (minY === void 0 || ord(y, minY))) {
            minX = x;
            minY = y;
          }
        }, t, s);
        return minX;
      });
    };
    var traverseU = function traverse2(C, xi2yC, t, s) {
      return toFunction(t)(s, void 0, C, xi2yC);
    };
    var expectedOptic = "Expecting an optic";
    var opticIsEither = "An optic can be either\n- a string,\n- a non-negative integer,\n- a quaternary optic function,\n- an ordinary unary or binary function, or\n- an array of optics.\nSee documentation of `toFunction` and `compose` for details.";
    var header = "partial.lenses: ";
    function warn(f, m) {
      if (!f.warned) {
        f.warned = 1;
        console.warn(header + m);
      }
    }
    function errorGiven(m, o, e) {
      m = header + m + ".";
      e = e ? "\n" + e : "";
      console.error(m, "Given:", o, e);
      throw Error(m + e);
    }
    var reqIndex = function index2(x) {
      if (!Number.isInteger(x) || x < 0)
        errorGiven("`index` expects a non-negative integer", x);
    };
    function reqFunction(o) {
      if (!(I.isFunction(o) && (o[LENGTH] === 4 || o[LENGTH] <= 2)))
        errorGiven(expectedOptic, o, opticIsEither);
    }
    function reqFn(x) {
      if (!I.isFunction(x))
        errorGiven("Expected a function", x);
    }
    function reqArray(o) {
      if (!I.isArray(o))
        errorGiven(expectedOptic, o, opticIsEither);
    }
    function reqOptic(o) {
      switch (typeof o) {
        case "string":
          break;
        case "number":
          reqIndex(o);
          break;
        case "object":
          reqArray(o);
          for (var i = 0, n = o[LENGTH]; i < n; ++i) {
            reqOptic(o[i]);
          }
          break;
        default:
          reqFunction(o);
          break;
      }
    }
    var reqString = function reqString2(msg) {
      return function(x) {
        if (!I.isString(x))
          errorGiven(msg, x);
      };
    };
    var reqMaybeArray = function reqMaybeArray2(msg) {
      return function(zs) {
        if (!(zs === void 0 || seemsArrayLike(zs)))
          errorGiven(msg, zs);
      };
    };
    var reqMonad = function reqMonad2(name) {
      return function(C) {
        if (!C.chain)
          errorGiven("`" + name + "` requires a monad", C, "Note that you can only `modify`, `remove`, `set`, and `traverse` a transform.");
      };
    };
    var mkTraverse = function mkTraverse2(after, toC) {
      return I.curryN(4, copyName(function(xi2yC, m) {
        return m = toC(m), function(t, s) {
          return after(traverseU(m, xi2yC, t, s));
        };
      }, toC));
    };
    var consExcept = function consExcept2(skip) {
      return function(t) {
        return function(h) {
          return skip !== h ? [h, t] : t;
        };
      };
    };
    var pushTo = function pushTo2(n, xs) {
      while (consExcept !== n) {
        xs.push(n[0]);
        n = n[1];
      }
      return xs;
    };
    var consTo = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : res(I.freeze))(function(n) {
      return pushTo(n, []).reverse();
    });
    function traversePartialIndex(A, xi2yA, xs, skip) {
      var map = A.map, ap = A.ap;
      var xsA = A.of(consExcept);
      var n = xs[LENGTH];
      if (map === I.sndU) {
        for (var i = 0; i < n; ++i) {
          xsA = ap(xsA, xi2yA(xs[i], i));
        }
        return xsA;
      } else {
        var cons = consExcept(skip);
        for (var _i2 = 0; _i2 < n; ++_i2) {
          xsA = ap(map(cons, xsA), xi2yA(xs[_i2], _i2));
        }
        return map(consTo, xsA);
      }
    }
    var SelectLog = /* @__PURE__ */ I.Applicative(function(f, _ref2) {
      var p = _ref2.p, x = _ref2.x, c = _ref2.c;
      x = f(x);
      if (!I.isFunction(x))
        p = [x, p];
      return { p, x, c };
    }, function(x) {
      return { p: [], x, c: void 0 };
    }, function(l, r) {
      var v = l.c !== void 0 ? l : r;
      return { p: v.p, x: l.x(r.x), c: v.c };
    });
    var lensFrom = function lensFrom2(get3, set2) {
      return function(i) {
        return function(x, _i, F, xi2yF) {
          return F.map(function(v) {
            return set2(i, v, x);
          }, xi2yF(get3(i, x), i));
        };
      };
    };
    var getProp = function getProp2(k, o) {
      return o instanceof Object ? o[k] : void 0;
    };
    var setProp = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : res(I.freeze))(function(k, v, o) {
      return v !== void 0 ? I.assocPartialU(k, v, o) : I.dissocPartialU(k, o) || I.object0;
    });
    var funProp = /* @__PURE__ */ lensFrom(getProp, setProp);
    var getIndex = function getIndex2(i, xs) {
      return seemsArrayLike(xs) ? xs[i] : void 0;
    };
    var setIndex = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : fn(nth(0, ef(reqIndex)), I.freeze))(function(i, x, xs) {
      if (!seemsArrayLike(xs))
        xs = "";
      var n = xs[LENGTH];
      if (x !== void 0) {
        var m = Math.max(i + 1, n);
        var ys = Array(m);
        for (var j = 0; j < m; ++j) {
          ys[j] = xs[j];
        }
        ys[i] = x;
        return ys;
      } else {
        if (n <= i)
          return copyToFrom(Array(n), 0, xs, 0, n);
        var _ys = Array(n - 1);
        for (var _j = 0; _j < i; ++_j) {
          _ys[_j] = xs[_j];
        }
        for (var _j2 = i + 1; _j2 < n; ++_j2) {
          _ys[_j2 - 1] = xs[_j2];
        }
        return _ys;
      }
    });
    var funIndex = /* @__PURE__ */ lensFrom(getIndex, setIndex);
    var composedMiddle = function composedMiddle2(o, r) {
      return function(F, xi2yF) {
        return xi2yF = r(F, xi2yF), function(x, i) {
          return o(x, i, F, xi2yF);
        };
      };
    };
    function composed(oi0, os) {
      var n = os[LENGTH] - oi0;
      if (n < 2) {
        return n ? toFunction(os[oi0]) : identity;
      } else {
        var _last = toFunction(os[oi0 + --n]);
        var r = function r2(F, xi2yF) {
          return function(x, i) {
            return _last(x, i, F, xi2yF);
          };
        };
        while (--n) {
          r = composedMiddle(toFunction(os[oi0 + n]), r);
        }
        var _first = toFunction(os[oi0]);
        return function(x, i, F, xi2yF) {
          return _first(x, i, F, r(F, xi2yF));
        };
      }
    }
    var disperseU = function disperse2(traversal, values3, data) {
      if (!seemsArrayLike(values3))
        values3 = "";
      var i = 0;
      return modifyU(traversal, function() {
        return values3[i++];
      }, data);
    };
    var setU = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : par(0, ef(reqOptic)))(function set2(o, x, s) {
      switch (typeof o) {
        case "string":
          return setProp(o, x, s);
        case "number":
          return setIndex(o, x, s);
        case "object":
          return modifyComposed(o, 0, s, x);
        default:
          return o[LENGTH] === 4 ? o(s, void 0, I.Identity, I.always(x)) : s;
      }
    });
    var getInverseU = function getInverse2(o, x) {
      return setU(o, x, void 0);
    };
    var modifyU = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : par(0, ef(reqOptic)))(function modify2(o, xi2x, s) {
      switch (typeof o) {
        case "string":
          return setProp(o, xi2x(getProp(o, s), o), s);
        case "number":
          return setIndex(o, xi2x(getIndex(o, s), o), s);
        case "object":
          return modifyComposed(o, xi2x, s);
        default:
          return o[LENGTH] === 4 ? o(s, void 0, I.Identity, xi2x) : (xi2x(o(s, void 0), void 0), s);
      }
    });
    var modifyAsyncU = function modifyAsyncU2(o, f, s) {
      return I.resolve(toFunction(o)(s, void 0, I.IdentityAsync, f));
    };
    var getAsU = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : par(1, ef(reqOptic)))(function getAs2(xi2y, l, s) {
      switch (typeof l) {
        case "string":
          return xi2y(getProp(l, s), l);
        case "number":
          return xi2y(getIndex(l, s), l);
        case "object": {
          var n = l[LENGTH];
          for (var i = 0, o; i < n; ++i) {
            switch (typeof (o = l[i])) {
              case "string":
                s = getProp(o, s);
                break;
              case "number":
                s = getIndex(o, s);
                break;
              default:
                return composed(i, l)(s, l[i - 1], Select, xi2y);
            }
          }
          return xi2y(s, l[n - 1]);
        }
        default:
          return xi2y !== id && l[LENGTH] !== 4 ? xi2y(l(s, void 0), void 0) : l(s, void 0, Select, xi2y);
      }
    });
    var getU = function getU2(l, s) {
      return getAsU(id, l, s);
    };
    function modifyComposed(os, xi2y, x, y) {
      var n = os[LENGTH];
      var xs = Array(n);
      for (var i = 0, o; i < n; ++i) {
        xs[i] = x;
        switch (typeof (o = os[i])) {
          case "string":
            x = getProp(o, x);
            break;
          case "number":
            x = getIndex(o, x);
            break;
          default:
            x = composed(i, os)(x, os[i - 1], I.Identity, xi2y || I.always(y));
            n = i;
            break;
        }
      }
      if (n === os[LENGTH])
        x = xi2y ? xi2y(x, os[n - 1]) : y;
      for (var _o; 0 <= --n; ) {
        x = I.isString(_o = os[n]) ? setProp(_o, x, xs[n]) : setIndex(_o, x, xs[n]);
      }
      return x;
    }
    var lensU = function lens2(get3, set2) {
      return copyName(function(x, i, F, xi2yF) {
        return F.map(function(y) {
          return set2(y, x, i);
        }, xi2yF(get3(x, i), i));
      }, get3);
    };
    var isoU = function iso2(bwd, fwd) {
      return copyName(function(x, i, F, xi2yF) {
        return F.map(fwd, xi2yF(bwd(x), i));
      }, bwd);
    };
    var stringIsoU = function stringIsoU2(bwd, fwd) {
      return isoU(expect(I.isString, bwd), expect(I.isString, fwd));
    };
    var numberIsoU = function numberIsoU2(bwd, fwd) {
      return isoU(expect(I.isNumber, bwd), expect(I.isNumber, fwd));
    };
    var getPick = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : res(I.freeze))(function(template, x) {
      var r = void 0;
      for (var k in template) {
        var t = template[k];
        var v = I.isObject(t) ? getPick(t, x) : getAsU(id, t, x);
        if (v !== void 0) {
          if (!r)
            r = {};
          r[k] = v;
        }
      }
      return r;
    });
    var reqTemplate = function reqTemplate2(name) {
      return function(template) {
        if (!I.isObject(template))
          errorGiven("`" + name + "` expects a plain Object template", template);
      };
    };
    var reqObject = function reqObject2(msg) {
      return function(value) {
        if (!(value === void 0 || value instanceof Object))
          errorGiven(msg, value);
      };
    };
    var setPick = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : par(1, ef(reqObject("`pick` must be set with undefined or an object"))))(function(template, value, x) {
      for (var k in template) {
        var v = value && value[k];
        var t = template[k];
        x = I.isObject(t) ? setPick(t, v, x) : setU(t, v, x);
      }
      return x;
    });
    var toObject = function toObject2(x) {
      return I.constructorOf(x) !== Object ? I.toObject(x) : x;
    };
    var identity = function identity2(x, i, _F, xi2yF) {
      return xi2yF(x, i);
    };
    var branchAssemble = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : res(res(I.freeze)))(function(ks) {
      return function(xs) {
        var r = {};
        var i = ks[LENGTH];
        while (i--) {
          var v = xs[0];
          if (v !== void 0) {
            r[ks[i]] = v;
          }
          xs = xs[1];
        }
        return r;
      };
    });
    var branchOr1LevelIdentity = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : function(fn$$1) {
      return function(otherwise, k2o, xO, x, A, xi2yA) {
        var y = fn$$1(otherwise, k2o, xO, x, A, xi2yA);
        if (x !== y)
          I.freeze(y);
        return y;
      };
    })(function(otherwise, k2o, xO, x, A, xi2yA) {
      var written = void 0;
      var same = true;
      var r = {};
      for (var k in k2o) {
        written = 1;
        var _x2 = xO[k];
        var y = k2o[k](_x2, k, A, xi2yA);
        if (y !== void 0) {
          r[k] = y;
          if (same)
            same = _x2 === y && (_x2 !== 0 || 1 / _x2 === 1 / y) || _x2 !== _x2 && y !== y;
        } else {
          same = false;
        }
      }
      var t = written;
      for (var _k in xO) {
        if ((t && k2o[_k]) === void 0) {
          written = 1;
          var _x3 = xO[_k];
          var _y = otherwise(_x3, _k, A, xi2yA);
          if (_y !== void 0) {
            r[_k] = _y;
            if (same)
              same = _x3 === _y && (_x3 !== 0 || 1 / _x3 === 1 / _y) || _x3 !== _x3 && _y !== _y;
          } else {
            same = false;
          }
        }
      }
      return written ? same && xO === x ? x : r : x;
    });
    var branchOr1Level = function branchOr1Level2(otherwise, k2o) {
      return function(x, _i, A, xi2yA) {
        var xO = x instanceof Object ? toObject(x) : I.object0;
        if (I.Identity === A) {
          return branchOr1LevelIdentity(otherwise, k2o, xO, x, A, xi2yA);
        } else if (Select === A) {
          for (var k in k2o) {
            var y = k2o[k](xO[k], k, A, xi2yA);
            if (y !== void 0)
              return y;
          }
          for (var _k2 in xO) {
            if (k2o[_k2] === void 0) {
              var _y2 = otherwise(xO[_k2], _k2, A, xi2yA);
              if (_y2 !== void 0)
                return _y2;
            }
          }
        } else {
          var map = A.map, ap = A.ap, of = A.of;
          var xsA = of(cpair);
          var ks = [];
          for (var _k3 in k2o) {
            ks.push(_k3);
            xsA = ap(map(cpair, xsA), k2o[_k3](xO[_k3], _k3, A, xi2yA));
          }
          var t = ks[LENGTH] ? true : void 0;
          for (var _k4 in xO) {
            if ((t && k2o[_k4]) === void 0) {
              ks.push(_k4);
              xsA = ap(map(cpair, xsA), otherwise(xO[_k4], _k4, A, xi2yA));
            }
          }
          return ks[LENGTH] ? map(branchAssemble(ks), xsA) : of(x);
        }
      };
    };
    function branchOrU(otherwise, template) {
      var k2o = I.create(null);
      for (var k in template) {
        var v = template[k];
        k2o[k] = I.isObject(v) ? branchOrU(otherwise, v) : toFunction(v);
      }
      return branchOr1Level(otherwise, k2o);
    }
    var replaced = function replaced2(inn, out, x) {
      return I.acyclicEqualsU(x, inn) ? out : x;
    };
    function findIndexHint(hint, xi2b, xs) {
      var u = hint.hint;
      var n = xs[LENGTH];
      if (n <= u)
        u = n - 1;
      if (u < 0)
        u = 0;
      var d = u - 1;
      for (; 0 <= d && u < n; ++u, --d) {
        if (xi2b(xs[u], u, hint))
          return u;
        if (xi2b(xs[d], d, hint))
          return d;
      }
      for (; u < n; ++u) {
        if (xi2b(xs[u], u, hint))
          return u;
      }
      for (; 0 <= d; --d) {
        if (xi2b(xs[d], d, hint))
          return d;
      }
      return n;
    }
    var partitionIntoIndex = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : dep(function(_xi2b, _xs, ts, fs) {
      return res(ef(function() {
        I.freeze(ts);
        I.freeze(fs);
      }));
    }))(function(xi2b, xs, ts, fs) {
      for (var i = 0, n = xs[LENGTH], x; i < n; ++i) {
        (xi2b(x = xs[i], i) ? ts : fs).push(x);
      }
    });
    var fromReader = function fromReader2(wi2x) {
      return copyName(function(w, i, F, xi2yF) {
        return F.map(I.always(w), xi2yF(wi2x(w, i), i));
      }, wi2x);
    };
    var LAST_INDEX = "lastIndex";
    var INDEX = "index";
    var RE_VALUE = 0;
    var reLastIndex = function reLastIndex2(m) {
      return m[INDEX] + m[0][LENGTH];
    };
    var reNext = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : function(fn$$1) {
      return function(m, re) {
        var res$$1 = fn$$1(m, re);
        if (res$$1 === "")
          warn(reNext, "`matches(" + re + ")` traversal terminated due to empty match.  `matches` traversal shouldn't be used with regular expressions that can produce empty matches.");
        return res$$1;
      };
    })(function(m, re) {
      var lastIndex = re[LAST_INDEX];
      re[LAST_INDEX] = reLastIndex(m);
      var n = re.exec(m.input);
      re[LAST_INDEX] = lastIndex;
      return n && n[0] && n;
    });
    var iterCollect = function iterCollect2(s) {
      return function(xs) {
        return function(x) {
          return [s, x, xs];
        };
      };
    };
    var iterToArray = function iterToArray2(xs) {
      var ys = [];
      while (iterCollect !== xs) {
        ys.push(xs[0], xs[1]);
        xs = xs[2];
      }
      return ys;
    };
    function iterSelect(xi2y, t, s) {
      while (s = reNext(s, t)) {
        var y = xi2y(s[RE_VALUE], s[INDEX]);
        if (y !== void 0)
          return y;
      }
    }
    function iterEager(map, ap, of, xi2yA, t, s) {
      var r = of(iterCollect);
      while (s = reNext(s, t)) {
        r = ap(ap(map(iterCollect, of(s)), r), xi2yA(s[RE_VALUE], s[INDEX]));
      }
      return r;
    }
    var keyed = /* @__PURE__ */ isoU(/* @__PURE__ */ expect(/* @__PURE__ */ isInstanceOf(Object), /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : res(freezeObjectOfObjects))(function keyed2(x) {
      x = toObject(x);
      var es = [];
      for (var key in x) {
        es.push([key, x[key]]);
      }
      return es;
    })), /* @__PURE__ */ expect(I.isArray, /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : res(I.freeze))(function(es) {
      var o = {};
      for (var i = 0, n = es[LENGTH]; i < n; ++i) {
        var entry = es[i];
        if (entry[LENGTH] === 2)
          o[entry[0]] = entry[1];
      }
      return o;
    })));
    var matchesJoin = function matchesJoin2(input) {
      return function(matchesIn) {
        var result = "";
        var lastIndex = 0;
        var matches2 = iterToArray(matchesIn);
        var n = matches2[LENGTH];
        for (var j = n - 2; j !== -2; j += -2) {
          var m = matches2[j];
          result += input.slice(lastIndex, m[INDEX]);
          var s = matches2[j + 1];
          if (s !== void 0)
            result += s;
          lastIndex = reLastIndex(m);
        }
        result += input.slice(lastIndex);
        return result;
      };
    };
    var disjointBwd = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : res(freezeObjectOfObjects))(function(groupOf, x) {
      if (x instanceof Object) {
        var y = {};
        x = toObject(x);
        for (var key in x) {
          var group = groupOf(key);
          var g = y[group];
          if (g === void 0)
            y[group] = g = {};
          g[key] = x[key];
        }
        return y;
      }
    });
    var disjointFwd = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : res(res(I.freeze)))(function(groupOf) {
      return function(y) {
        if (y instanceof Object) {
          var x = {};
          y = toObject(y);
          for (var group in y) {
            var g = y[group];
            if (g instanceof Object) {
              g = toObject(g);
              for (var key in g) {
                if (groupOf(key) === group) {
                  x[key] = g[key];
                }
              }
            }
          }
          return x;
        }
      };
    });
    var subseqU = function subseq2(begin, end, t) {
      t = toFunction(t);
      return copyName(function(x, i, F, xi2yF) {
        var n = -1;
        return t(x, i, F, function(x2, i2) {
          return begin <= ++n && !(end <= n) ? xi2yF(x2, i2) : F.of(x2);
        });
      }, t);
    };
    var attemptU = function attemptU2(fn$$1, x) {
      if (x !== void 0) {
        var y = fn$$1(x);
        if (y !== void 0)
          return y;
      }
      return x;
    };
    var rewriteAttempt = function rewriteAttempt2(fn$$1) {
      return function(x, i, F, xi2yF) {
        return F.map(function(x2) {
          return attemptU(fn$$1, x2);
        }, xi2yF(x, i));
      };
    };
    var rereadAttempt = function rereadAttempt2(fn$$1) {
      return function(x, i, F, xi2yF) {
        return xi2yF(attemptU(fn$$1, x), i);
      };
    };
    var transformEvery = function transformEvery2(optic) {
      return transform(lazy(function(rec) {
        return [optic, children, rec];
      }));
    };
    var transformSome = function transformSome2(fn$$1) {
      return transform(lazy(function(rec) {
        return choices(getter(fn$$1), [children, rec]);
      }));
    };
    var isDefinedAtU = function isDefinedAtU2(o, x, i) {
      return o(x, i, Select, id) !== void 0;
    };
    var isDefinedAt = function isDefinedAt2(o) {
      return function(x, i) {
        return isDefinedAtU(o, x, i);
      };
    };
    var eitherU = function eitherU2(t, e) {
      return function either(c) {
        return function either2(x, i, C, xi2yC) {
          return (c(x, i) ? t : e)(x, i, C, xi2yC);
        };
      };
    };
    var orElseU = function orElse2(back, prim) {
      prim = toFunction(prim);
      back = toFunction(back);
      return function orElse3(x, i, C, xi2yC) {
        return (isDefinedAtU(prim, x, i) ? prim : back)(x, i, C, xi2yC);
      };
    };
    var orAlternativelyU = function orAlternatively2(back, prim) {
      prim = toFunction(prim);
      back = toFunction(back);
      var fwd = function fwd2(y) {
        y = I.always(y);
        var yP = prim(void 0, void 0, I.Identity, y);
        return yP === void 0 ? back(void 0, void 0, I.Identity, y) : yP;
      };
      return function orAlternatively3(x, i, F, xi2yF) {
        var xP = prim(x, i, Select, id);
        return F.map(fwd, xi2yF(xP === void 0 ? back(x, i, Select, id) : xP, i));
      };
    };
    var makeSemi = function makeSemi2(op) {
      return copyName(function(_2) {
        var n = arguments[LENGTH];
        var r = arguments[--n];
        while (n) {
          r = op(r, arguments[--n]);
        }
        return r;
      }, op);
    };
    var zero = function zero2(x, _i, C, _xi2yC) {
      return C.of(x);
    };
    var elemsI = function elemsI2(xs, _i, A, xi2yA) {
      return A === I.Identity ? mapPartialIndexU(xi2yA, xs, void 0) : A === Select ? selectInArrayLike(xi2yA, xs) : traversePartialIndex(A, xi2yA, xs, void 0);
    };
    var seq2U = function seq2U2(l, r) {
      return function(x, i, M, xi2yM) {
        return M.chain(function(x2) {
          return r(x2, i, M, xi2yM);
        }, l(x, i, M, xi2yM));
      };
    };
    var pickInAux = function pickInAux2(t, k) {
      return [k, pickIn(t)];
    };
    var iteratePartial = function iteratePartial2(aa) {
      return function iterate2(a) {
        var r = a;
        while (a !== void 0) {
          r = a;
          a = aa(a);
        }
        return r;
      };
    };
    var crossPartial = function crossPartial2(op, ls, or$$1) {
      return function(xs, ss) {
        var n = ls[LENGTH];
        if (!seemsArrayLike(xs))
          return;
        if (!seemsArrayLike(ss))
          ss = "";
        var m = Math.max(n, xs[LENGTH], ss[LENGTH]);
        var ys = Array(m);
        for (var i = 0; i < m; ++i) {
          if ((ys[i] = op(i < n ? ls[i] : or$$1, xs[i], ss[i])) === void 0)
            return;
        }
        return ys;
      };
    };
    var crossOr = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? I.curry : function(fn$$1) {
      return I.curry(function crossOr2(or$$1, ls) {
        return toFunction([isoU(id, I.freeze), fn$$1(or$$1, ls), isoU(I.freeze, id)]);
      });
    })(function crossOr2(or$$1, ls) {
      return lensU(crossPartial(getU, ls, or$$1), crossPartial(setU, ls, or$$1));
    });
    var subsetPartial = function subsetPartial2(p) {
      return function subset2(x) {
        return x !== void 0 && p(x) ? x : void 0;
      };
    };
    var unfoldPartial = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : res(res(function(r) {
      I.freeze(r);
      I.freeze(r[1]);
      return r;
    })))(function(s2sa) {
      return function unfold2(s) {
        var xs = [];
        for (; ; ) {
          var sa = s2sa(s);
          if (!isPair(sa))
            return [s, xs];
          s = sa[0];
          xs.push(sa[1]);
        }
      };
    });
    var foldPartial = function foldPartial2(sa2s) {
      return function(sxs) {
        if (isPair(sxs)) {
          var xs = sxs[1];
          if (I.isArray(xs)) {
            var s = sxs[0];
            var n = xs[LENGTH];
            while (n--) {
              s = sa2s(freezeInDev([s, xs[n]]));
            }
            return s;
          }
        }
      };
    };
    var PAYLOAD = "\u73F3\u8971\uB30E\u7E9A\u4924\u9B16\u7F7A\uC8B4";
    var isPayload = function isPayload2(k) {
      return I.isString(k) && k.indexOf(PAYLOAD) === 0;
    };
    function Spread(i) {
      this[PAYLOAD] = i;
      I.freeze(this);
    }
    var isSpread = /* @__PURE__ */ isInstanceOf(Spread);
    var Variable = /* @__PURE__ */ I.inherit(function Variable2(i) {
      this[PAYLOAD + i] = this[PAYLOAD] = I.freeze([new Spread(i)]);
      I.freeze(this);
    }, Object, /* @__PURE__ */ I.assocPartialU(iterator, function() {
      return this[PAYLOAD][iterator]();
    }));
    var isVariable = /* @__PURE__ */ isInstanceOf(Variable);
    var vars = [];
    function nVars(n) {
      while (vars[LENGTH] < n) {
        vars.push(new Variable(vars[LENGTH]));
      }
      return vars;
    }
    var isPrimitive = function isPrimitive2(x) {
      return x == null || typeof x !== "object";
    };
    function match1(kinds, i, e, x) {
      if (x !== void 0) {
        if (i in e)
          return I.acyclicEqualsU(e[i], x);
        e[i] = x;
        var k = kinds[i];
        return !k || k(x);
      }
    }
    function checkKind(kinds, i, kind) {
      if (0 <= i) {
        if (kinds[i]) {
          if (kinds[i] !== kind)
            throw Error("Spread patterns must be used consistently either as arrays or as objects.");
        } else {
          kinds[i] = kind;
        }
      }
    }
    var arrayKind = function arrayKind2(x) {
      return x === void 0 || I.isArray(x);
    };
    var objectKind = function objectKind2(x) {
      return x === void 0 || isInstanceOf(Object);
    };
    function checkPattern(kinds, p) {
      if (isSpread(p)) {
        throw Error("Spread patterns must be inside objects or arrays.");
      } else if (I.isArray(p)) {
        var nSpread = 0;
        for (var i = 0, n = p[LENGTH]; i < n; ++i) {
          var pi = p[i];
          if (isSpread(pi)) {
            if (nSpread++)
              throw Error("At most one spread is allowed in an array or object.");
            checkKind(kinds, pi[PAYLOAD], arrayKind);
          } else {
            checkPattern(kinds, pi);
          }
        }
      } else if (I.isObject(p)) {
        var spread = p[PAYLOAD];
        if (spread) {
          spread = spread[0][PAYLOAD];
          checkKind(kinds, spread, objectKind);
        }
        var _n = 0;
        for (var k in p) {
          if (isPayload(k)) {
            if (2 < ++_n)
              throw Error("At most one spread is allowed in an array or object.");
          } else {
            checkPattern(kinds, p[k]);
          }
        }
      } else if (!isPrimitive(p) && !isVariable(p)) {
        throw Error("Only plain arrays and objects are allowed in patterns.");
      }
    }
    var checkPatternInDev = process.env.NODE_ENV === "production" ? id : function(p) {
      var kinds = [];
      checkPattern(kinds, p);
      return deepFreezeInDev(p);
    };
    var checkPatternPairInDev = process.env.NODE_ENV === "production" ? id : function(ps) {
      var kinds = [];
      checkPattern(kinds, ps[0]);
      checkPattern(kinds, ps[1]);
      return deepFreezeInDev(ps);
    };
    var setDefined = function setDefined2(o, k, x) {
      if (x !== void 0)
        o[k] = x;
    };
    var pushDefined = function pushDefined2(xs, x) {
      if (x !== void 0)
        xs.push(x);
    };
    function toMatch(kinds, p) {
      if (p === void 0 || all1(isPrimitive, leafs, p)) {
        return function(e, x2) {
          return I.acyclicEqualsU(p, x2);
        };
      } else if (isVariable(p)) {
        var i = p[PAYLOAD][0][PAYLOAD];
        return i < 0 ? id : function(e, x2) {
          return match1(kinds, i, e, x2);
        };
      } else if (I.isArray(p)) {
        var init = [];
        var rest = [];
        var spread = void 0;
        var n = p[LENGTH];
        for (var _i3 = 0; _i3 < n; ++_i3) {
          var x = p[_i3];
          if (isSpread(x)) {
            spread = x[PAYLOAD];
            kinds[spread] = arrayKind;
          } else {
            var side = spread !== void 0 ? rest : init;
            side.push(toMatch(kinds, x));
          }
        }
        return function(e, x2) {
          if (!seemsArrayLike(x2))
            return;
          var l = x2[LENGTH];
          if (spread !== void 0 ? l < n - 1 : l !== n)
            return;
          var j = init[LENGTH];
          for (var _i4 = 0; _i4 < j; ++_i4) {
            if (!init[_i4](e, x2[_i4]))
              return;
          }
          var k = rest[LENGTH];
          l -= k;
          for (var _i5 = 0; _i5 < k; ++_i5) {
            if (!rest[_i5](e, x2[l + _i5]))
              return;
          }
          return !(0 <= spread) || match1(kinds, spread, e, copyToFrom(Array(l - j), 0, x2, j, l));
        };
      } else {
        var _spread = p[PAYLOAD];
        if (_spread) {
          _spread = _spread[0][PAYLOAD];
          kinds[_spread] = objectKind;
        }
        p = modify(values2, function(p2, k) {
          return isPayload(k) ? void 0 : toMatch(kinds, p2);
        }, p);
        var _n2 = count(values2, p);
        return function(e, x2) {
          if (isPrimitive(x2) || I.isArray(x2))
            return;
          x2 = toObject(x2);
          var rest2 = 0 <= _spread && {};
          var i2 = 0;
          for (var k in x2) {
            var m = p[k];
            if (m) {
              if (!m(e, x2[k]))
                return;
              i2++;
            } else if (_spread !== void 0) {
              if (rest2)
                rest2[k] = x2[k];
            } else {
              return;
            }
          }
          return i2 === _n2 && (!rest2 || match1(kinds, _spread, e, freezeInDev(rest2)));
        };
      }
    }
    function toSubst(p, k) {
      if (isPayload(k)) {
        return void 0;
      } else if (p === void 0 || all1(isPrimitive, leafs, p)) {
        return I.always(p);
      } else if (isVariable(p)) {
        var i = p[PAYLOAD][0][PAYLOAD];
        return function(e) {
          return e[i];
        };
      } else if (I.isArray(p)) {
        var init = [];
        var rest = [];
        var spread = void 0;
        var n = p[LENGTH];
        for (var _i6 = 0; _i6 < n; ++_i6) {
          var x = p[_i6];
          if (isSpread(x)) {
            spread = x[PAYLOAD];
          } else {
            var side = spread !== void 0 ? rest : init;
            side.push(toSubst(x));
          }
        }
        return freezeResultInDev(function(e) {
          var r = [];
          for (var _i7 = 0, _n3 = init[LENGTH]; _i7 < _n3; ++_i7) {
            pushDefined(r, init[_i7](e));
          }
          if (0 <= spread) {
            var xs = e[spread];
            if (xs)
              for (var _i8 = 0, _n4 = xs[LENGTH]; _i8 < _n4; ++_i8) {
                pushDefined(r, xs[_i8]);
              }
          }
          for (var _i9 = 0, _n5 = rest[LENGTH]; _i9 < _n5; ++_i9) {
            pushDefined(r, rest[_i9](e));
          }
          return r;
        });
      } else {
        var _spread2 = p[PAYLOAD];
        if (_spread2)
          _spread2 = _spread2[0][PAYLOAD];
        p = modify(values2, toSubst, p);
        return freezeResultInDev(function(e) {
          var r = {};
          for (var _k5 in p) {
            setDefined(r, _k5, p[_k5](e));
          }
          if (0 <= _spread2) {
            var _x4 = e[_spread2];
            if (_x4)
              for (var _k6 in _x4) {
                setDefined(r, _k6, _x4[_k6]);
              }
          }
          return r;
        });
      }
    }
    var oneway = function oneway2(n, m, s) {
      return function(x) {
        var e = Array(n);
        if (m(e, x))
          return s(e);
      };
    };
    var ungroupByFn = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : res(res(I.freeze)))(function(keyOf) {
      return function ungroupBy2(xxs) {
        if (I.isArray(xxs)) {
          var ys = [];
          for (var i = 0, n = xxs.length; i < n; ++i) {
            var xs = xxs[i];
            if (!I.isArray(xs))
              return;
            var m = xs.length;
            if (!m)
              return;
            var k = keyOf(xs[0]);
            if (k === void 0)
              return;
            for (var j = 0, _m = xs.length; j < _m; ++j) {
              var x = xs[j];
              if (!I.identicalU(k, keyOf(x)))
                return;
              ys.push(x);
            }
          }
          return ys;
        }
      };
    });
    var groupByFn = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : res(res(freezeObjectOfObjects)))(function(keyOf) {
      return function groupBy2(ys) {
        if (I.isArray(ys)) {
          var groups = /* @__PURE__ */ new Map();
          for (var i = 0, n = ys.length; i < n; ++i) {
            var y = ys[i];
            var k = keyOf(y);
            if (k === void 0)
              return;
            var xs = groups.get(k);
            if (xs !== void 0) {
              xs.push(y);
            } else {
              groups.set(k, [y]);
            }
          }
          var xxs = [];
          groups.forEach(function(xs2) {
            return xxs.push(xs2);
          });
          return xxs;
        }
      };
    });
    var zW1Fn = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : res(res(I.freeze)))(function(fn$$1) {
      return function zipWith12(xys) {
        if (isPair(xys)) {
          var ys = xys[1];
          var n = ys[LENGTH];
          if (n) {
            var x = xys[0];
            var zs = Array(n);
            for (var i = 0; i < n; ++i) {
              if ((zs[i] = fn$$1([x, ys[i]])) === void 0)
                return;
            }
            return zs;
          }
        }
      };
    });
    var unzW1Fn = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : res(res(freezeObjectOfObjects)))(function(fn$$1) {
      return function unzipWith12(zs) {
        if (I.isArray(zs)) {
          var n = zs[LENGTH];
          if (n) {
            var xy0 = fn$$1(zs[0]);
            if (isPair(xy0)) {
              var ys = Array(n);
              var x = xy0[0];
              ys[0] = xy0[1];
              for (var i = 1; i < n; ++i) {
                var xy = fn$$1(zs[i]);
                if (!isPair(xy) || !I.acyclicEqualsU(x, xy[0]))
                  return;
                ys[i] = xy[1];
              }
              return [x, ys];
            }
          }
        }
      };
    });
    var seemsArrayLike = function seemsArrayLike2(x) {
      return x instanceof Object && (x = x[LENGTH], x === x >> 0 && 0 <= x) || I.isString(x);
    };
    var Select = /* @__PURE__ */ ConstantWith(function(l, r) {
      return l !== void 0 ? l : r;
    });
    var toFunction = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : par(0, ef(reqOptic)))(function toFunction2(o) {
      switch (typeof o) {
        case "string":
          return funProp(o);
        case "number":
          return funIndex(o);
        case "object":
          return composed(0, o);
        default:
          return o[LENGTH] === 4 ? o : fromReader(o);
      }
    });
    var assign = /* @__PURE__ */ I.curry(function assign2(o, x, s) {
      return setU([o, assignTo], x, s);
    });
    var disperse = /* @__PURE__ */ I.curry(disperseU);
    var modify = /* @__PURE__ */ I.curry(modifyU);
    var modifyAsync2 = /* @__PURE__ */ I.curry(modifyAsyncU);
    var remove = /* @__PURE__ */ I.curry(function remove2(o, s) {
      return setU(o, void 0, s);
    });
    var set = /* @__PURE__ */ I.curry(setU);
    var traverse = /* @__PURE__ */ I.curry(traverseU);
    function compose2() {
      var n = arguments[LENGTH];
      if (n < 2) {
        return n ? arguments[0] : identity;
      } else {
        var os = Array(n);
        while (n--) {
          os[n] = arguments[n];
        }
        return os;
      }
    }
    function flat() {
      var r = [flatten];
      for (var i = 0, n = arguments[LENGTH]; i < n; ++i) {
        r.push(arguments[i], flatten);
      }
      return r;
    }
    function lazy(o2o) {
      var _memo = function memo(x, i, C, xi2yC) {
        return (_memo = toFunction(o2o(rec)))(x, i, C, xi2yC);
      };
      function rec(x, i, C, xi2yC) {
        return _memo(x, i, C, xi2yC);
      }
      return rec;
    }
    var choices = /* @__PURE__ */ makeSemi(orElseU);
    var choose = function choose2(xiM2o) {
      return copyName(function(x, i, C, xi2yC) {
        return toFunction(xiM2o(x, i))(x, i, C, xi2yC);
      }, xiM2o);
    };
    var cond = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : function(fn$$1) {
      return function cond2() {
        var pair = tup(ef(reqFn), ef(reqOptic));
        for (var _len = arguments.length, cs = Array(_len), _key = 0; _key < _len; _key++) {
          cs[_key] = arguments[_key];
        }
        arr(pair)(cs.slice(0, -1));
        arr(or(tup(ef(reqOptic)), pair))(cs.slice(-1));
        return fn$$1.apply(void 0, cs);
      };
    })(function cond2() {
      var n = arguments[LENGTH];
      var r = zero;
      while (n--) {
        var c = arguments[n];
        r = c[LENGTH] < 2 ? toFunction(c[0]) : eitherU(toFunction(c[1]), r)(c[0]);
      }
      return r;
    });
    var condOf = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : function(fn$$1) {
      return function condOf2(of) {
        var pair = tup(ef(reqFn), ef(reqOptic));
        for (var _len2 = arguments.length, cs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          cs[_key2 - 1] = arguments[_key2];
        }
        arr(pair)(cs.slice(0, -1));
        arr(or(tup(ef(reqOptic)), pair))(cs.slice(-1));
        return fn$$1.apply(void 0, [of].concat(cs));
      };
    })(function condOf2(of) {
      of = toFunction(of);
      var n = arguments[LENGTH] - 1;
      if (!n)
        return zero;
      var def = arguments[n];
      if (def[LENGTH] === 1) {
        --n;
        def = toFunction(def[0]);
      } else {
        def = zero;
      }
      var ps = Array(n);
      var os = Array(n + 1);
      for (var i = 0; i < n; ++i) {
        var c = arguments[i + 1];
        ps[i] = c[0];
        os[i] = toFunction(c[1]);
      }
      os[n] = def;
      return function condOf3(x, i2, F, xi2yF) {
        var min = n;
        of(x, i2, Select, function(y, j) {
          for (var _i10 = 0; _i10 < min; ++_i10) {
            if (ps[_i10](y, j)) {
              min = _i10;
              if (_i10 === 0)
                return 0;
              else
                break;
            }
          }
        });
        return os[min](x, i2, F, xi2yF);
      };
    });
    var ifElse = /* @__PURE__ */ I.curry(function ifElse2(c, t, e) {
      return eitherU(toFunction(t), toFunction(e))(c);
    });
    var orElse = /* @__PURE__ */ I.curry(orElseU);
    var chain = /* @__PURE__ */ I.curry(function chain2(xi2yO, xO) {
      return [xO, choose(function(xM, i) {
        return xM !== void 0 ? xi2yO(xM, i) : zero;
      })];
    });
    var choice = function choice2() {
      for (var _len3 = arguments.length, os = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        os[_key3] = arguments[_key3];
      }
      return os.reduceRight(orElseU, zero);
    };
    var unless = /* @__PURE__ */ eitherU(zero, identity);
    var when = /* @__PURE__ */ eitherU(identity, zero);
    var optional = /* @__PURE__ */ when(I.isDefined);
    var mapIx = function mapIx2(ix2j) {
      return function mapIx3(x, i, F, xj2yF) {
        return xj2yF(x, ix2j(i, x));
      };
    };
    var setIx = function setIx2(j) {
      return function setIx3(x, _i, _F, xj2yF) {
        return xj2yF(x, j);
      };
    };
    var tieIx = /* @__PURE__ */ I.curry(function tieIx2(ij2k, o) {
      o = toFunction(o);
      return copyName(function(x, i, F, yk2zF) {
        return o(x, i, F, function(y, j) {
          return yk2zF(y, ij2k(j, i));
        });
      }, o);
    });
    var joinIx = /* @__PURE__ */ setName(/* @__PURE__ */ tieIx(function(j, i) {
      return i !== void 0 ? j !== void 0 ? [i, j] : i : j;
    }), "joinIx");
    var reIx = function reIx2(o) {
      o = toFunction(o);
      return copyName(function(x, i, F, xi2yF) {
        var j = 0;
        return o(x, i, F, function(x2) {
          return xi2yF(x2, j++);
        });
      }, o);
    };
    var skipIx = /* @__PURE__ */ setName(/* @__PURE__ */ tieIx(I.sndU), "skipIx");
    function getLog(l, s) {
      var _traverseU = traverseU(SelectLog, function(x) {
        return { p: [x, consExcept], x, c: x };
      }, l, s), p = _traverseU.p, c = _traverseU.c;
      p = pushTo(p, ["%O"]);
      for (var i = 2; i < p[LENGTH]; ++i) {
        p[0] += " <= %O";
      }
      console.log.apply(console, p);
      return c;
    }
    function log() {
      var show = I.curry(function log2(dir, x) {
        console.log.apply(console, copyToFrom([], 0, arguments, 0, arguments[LENGTH]).concat([dir, x]));
        return x;
      });
      return isoU(show("get"), show("set"));
    }
    var transform = /* @__PURE__ */ I.curry(function transform2(o, s) {
      return modifyU(o, id, s);
    });
    var transformAsync = /* @__PURE__ */ I.curry(function transformAsync2(o, s) {
      return modifyAsyncU(o, id, s);
    });
    var seq = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : function(fn$$1) {
      return function seq2() {
        return par(2, ef(reqMonad("seq")))(fn$$1.apply(void 0, arguments));
      };
    })(function seq2() {
      var n = arguments[LENGTH];
      var r = zero;
      if (n) {
        r = toFunction(arguments[--n]);
        while (n) {
          r = seq2U(toFunction(arguments[--n]), r);
        }
      }
      return r;
    });
    var branchOr = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : par(1, ef(reqTemplate("branchOr"))))(/* @__PURE__ */ I.curryN(2, function branchOr2(otherwise) {
      otherwise = toFunction(otherwise);
      return function branchOr3(template) {
        return branchOrU(otherwise, template);
      };
    }));
    var branch = /* @__PURE__ */ branchOr(zero);
    function branches() {
      var n = arguments[LENGTH];
      var template = {};
      for (var i = 0; i < n; ++i) {
        template[arguments[i]] = identity;
      }
      return branch(template);
    }
    function elems(xs, i, A, xi2yA) {
      return seemsArrayLike(xs) ? elemsI(xs, i, A, xi2yA) : A.of(xs);
    }
    var elemsTotal = function elemsTotal2(xs, i, A, xi2yA) {
      return seemsArrayLike(xs) ? A === I.Identity ? mapPartialIndexU(xi2yA, xs, mapPartialIndexU) : A === Select ? selectInArrayLike(xi2yA, xs) : traversePartialIndex(A, xi2yA, xs, traversePartialIndex) : A.of(xs);
    };
    var entries2 = /* @__PURE__ */ setName(/* @__PURE__ */ toFunction([keyed, elems]), "entries");
    var keys2 = /* @__PURE__ */ setName(/* @__PURE__ */ toFunction([keyed, elems, 0]), "keys");
    var keysEverywhere = function keysEverywhere2(x, i, A, xi2yA) {
      var recEntry = function recEntry2(kv, i2) {
        return A.ap(A.map(pairPartial, xi2yA(kv[0], i2)), recAny(kv[1], i2));
      };
      var recAny = function recAny2(x2, i2) {
        return I.isArray(x2) ? elemsI(x2, i2, A, recAny2) : I.isObject(x2) ? entries2(x2, i2, A, recEntry) : A.of(x2);
      };
      return recAny(x, i);
    };
    var subseq = /* @__PURE__ */ I.curry(subseqU);
    var limit = /* @__PURE__ */ subseq(0);
    var offset = /* @__PURE__ */ I.curry(function offset2(begin, t) {
      return subseqU(begin, void 0, t);
    });
    function matches(re) {
      return function matches2(x, _i, C, xi2yC) {
        if (I.isString(x)) {
          var map = C.map;
          if (re.global) {
            var m0 = [""];
            m0.input = x;
            m0[INDEX] = 0;
            if (Select === C) {
              return iterSelect(xi2yC, re, m0);
            } else {
              var ap = C.ap, of = C.of;
              return map(matchesJoin(x), iterEager(map, ap, of, xi2yC, re, m0));
            }
          } else {
            var m = x.match(re);
            if (m)
              return map(function(y) {
                return x.replace(re, y !== void 0 ? y : "");
              }, xi2yC(m[0], m[INDEX]));
          }
        }
        return C.of(x);
      };
    }
    var values2 = /* @__PURE__ */ setName(/* @__PURE__ */ branchOr1Level(identity, protoless0), "values");
    function children(x, i, C, xi2yC) {
      return I.isArray(x) ? elemsI(x, i, C, xi2yC) : I.isObject(x) ? values2(x, i, C, xi2yC) : C.of(x);
    }
    function flatten(x, i, C, xi2yC) {
      var rec = function rec2(x2, i2) {
        return I.isArray(x2) ? elemsI(x2, i2, C, rec2) : x2 !== void 0 ? xi2yC(x2, i2) : C.of(x2);
      };
      return rec(x, i);
    }
    function query() {
      var r = [];
      for (var i = 0, n = arguments[LENGTH]; i < n; ++i) {
        var o = toFunction(arguments[i]);
        r.push(satisfying(isDefinedAt(o)), o);
      }
      return r;
    }
    var satisfying = function satisfying2(p) {
      return function satisfying3(x, i, C, xi2yC) {
        var rec = function rec2(x2, i2) {
          return p(x2, i2) ? xi2yC(x2, i2) : children(x2, i2, C, rec2);
        };
        return rec(x, i);
      };
    };
    var leafs = /* @__PURE__ */ satisfying(function(x) {
      return x !== void 0 && !I.isArray(x) && !I.isObject(x);
    });
    var whereEq = function whereEq2(template) {
      return satisfying(and$1(branch(modify(leafs, is, template))));
    };
    var all = /* @__PURE__ */ I.curry(function all2(xi2b, t, s) {
      return !getAsU(function(x, i) {
        if (!xi2b(x, i))
          return true;
      }, t, s);
    });
    var and$1 = /* @__PURE__ */ all(id);
    var all1 = /* @__PURE__ */ I.curry(function all12(xi2b, t, s) {
      var result = false;
      getAsU(function(x, i) {
        if (xi2b(x, i))
          result = true;
        else
          return result = false;
      }, t, s);
      return result;
    });
    var and1 = /* @__PURE__ */ all1(id);
    var any = /* @__PURE__ */ I.curry(function any2(xi2b, t, s) {
      return !!getAsU(function(x, i) {
        if (xi2b(x, i))
          return true;
      }, t, s);
    });
    var collectAs = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? I.curry : res(I.freeze))(function collectAs2(xi2y, t, s) {
      var results = [];
      getAsU(function(x, i) {
        var y = xi2y(x, i);
        if (y !== void 0)
          results.push(y);
      }, t, s);
      return results;
    });
    var collect2 = /* @__PURE__ */ collectAs(id);
    var collectTotalAs = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? I.curry : res(I.freeze))(function collectTotalAs2(xi2y, t, s) {
      var results = [];
      getAsU(function(x, i) {
        results.push(xi2y(x, i));
      }, t, s);
      return results;
    });
    var collectTotal = /* @__PURE__ */ collectTotalAs(id);
    var concatAs = /* @__PURE__ */ mkTraverse(id, ConstantOf);
    var concat = /* @__PURE__ */ concatAs(id);
    var countIf = /* @__PURE__ */ I.curry(function countIf2(p, t, s) {
      return traverseU(Sum, function(x, i) {
        return p(x, i) ? 1 : 0;
      }, t, s);
    });
    var count = /* @__PURE__ */ countIf(I.isDefined);
    var countsAs = /* @__PURE__ */ I.curry(function countsAs2(xi2k, t, s) {
      var counts2 = /* @__PURE__ */ new Map();
      getAsU(function(x, i) {
        var k = xi2k(x, i);
        var n = counts2.get(k);
        counts2.set(k, n !== void 0 ? n + 1 : 1);
      }, t, s);
      return counts2;
    });
    var counts = /* @__PURE__ */ countsAs(id);
    var foldl = /* @__PURE__ */ I.curry(function foldl2(f, r, t, s) {
      getAsU(function(x, i) {
        r = f(r, x, i);
      }, t, s);
      return r;
    });
    var foldr = /* @__PURE__ */ I.curry(function foldr2(f, r, t, s) {
      var is2 = [];
      var xs = [];
      getAsU(function(x, i2) {
        xs.push(x);
        is2.push(i2);
      }, t, s);
      for (var i = xs[LENGTH] - 1; 0 <= i; --i) {
        r = f(r, xs[i], is2[i]);
      }
      return r;
    });
    var forEach = /* @__PURE__ */ I.curry(function forEach2(f, t, s) {
      return getAsU(function(x, i) {
        f(x, i);
      }, t, s);
    });
    var forEachWith = /* @__PURE__ */ I.curry(function forEachWith2(newC, ef$$1, t, s) {
      var c = newC();
      getAsU(function(x, i) {
        ef$$1(c, x, i);
      }, t, s);
      return c;
    });
    function get2(l, s) {
      return 1 < arguments[LENGTH] ? getAsU(id, l, s) : function(s2) {
        return getAsU(id, l, s2);
      };
    }
    var getAs = /* @__PURE__ */ I.curry(getAsU);
    var isDefined = /* @__PURE__ */ I.curry(function isDefined2(t, s) {
      return getAsU(id, t, s) !== void 0;
    });
    var isEmpty = /* @__PURE__ */ I.curry(function isEmpty2(t, s) {
      return !getAsU(toTrue, t, s);
    });
    var joinAs = /* @__PURE__ */ mkTraverse(toStringPartial, /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : par(0, ef(reqString("`join` and `joinAs` expect a string delimiter"))))(function joinAs2(d) {
      return ConstantWith(function(x, y) {
        return x !== void 0 ? y !== void 0 ? x + d + y : x : y;
      });
    }));
    var join = /* @__PURE__ */ joinAs(id);
    var maximumBy = /* @__PURE__ */ mumBy(gtU);
    var maximum = /* @__PURE__ */ maximumBy(id);
    var meanAs = /* @__PURE__ */ I.curry(function meanAs2(xi2y, t, s) {
      var sum2 = 0;
      var num = 0;
      getAsU(function(x, i) {
        var y = xi2y(x, i);
        if (y !== void 0) {
          num += 1;
          sum2 += y;
        }
      }, t, s);
      return sum2 / num;
    });
    var mean = /* @__PURE__ */ meanAs(id);
    var minimumBy = /* @__PURE__ */ mumBy(ltU);
    var minimum = /* @__PURE__ */ minimumBy(id);
    var none = /* @__PURE__ */ I.curry(function none2(xi2b, t, s) {
      return !getAsU(function(x, i) {
        if (xi2b(x, i))
          return true;
      }, t, s);
    });
    var or$1 = /* @__PURE__ */ any(id);
    var productAs = /* @__PURE__ */ traverse(/* @__PURE__ */ ConstantWith(multiplyU, 1));
    var product = /* @__PURE__ */ productAs(/* @__PURE__ */ unto(1));
    var select = process.env.NODE_ENV === "production" ? get2 : /* @__PURE__ */ I.curry(function select2(l, s) {
      warn(select2, "`select` has been obsoleted.  Just use `get`.  See CHANGELOG for details.");
      return get2(l, s);
    });
    var selectAs = process.env.NODE_ENV === "production" ? getAs : /* @__PURE__ */ I.curry(function selectAs2(f, l, s) {
      warn(selectAs2, "`selectAs` has been obsoleted.  Just use `getAs`.  See CHANGELOG for details.");
      return getAs(f, l, s);
    });
    var sumAs = /* @__PURE__ */ traverse(Sum);
    var sum = /* @__PURE__ */ sumAs(unto0);
    var foldTraversalLens = /* @__PURE__ */ I.curry(function foldTraversalLens2(fold2, traversal) {
      return lensU(fold2(traversal), set(traversal));
    });
    var getter = function getter2(get3) {
      return function(x, i, F, xi2yF) {
        return xi2yF(get3(x, i), i);
      };
    };
    var lens = /* @__PURE__ */ I.curry(lensU);
    function partsOf(t) {
      if (arguments[LENGTH] !== 1)
        t = toFunction(compose2.apply(null, arguments));
      return function partsOf2(x, i, F, xi2yF) {
        return F.map(function(y) {
          return disperseU(t, y, x);
        }, xi2yF(collectTotal(t, x), i));
      };
    }
    var setter = /* @__PURE__ */ lens(id);
    function defaults(out) {
      function o2u(x) {
        return replaced(out, void 0, x);
      }
      return function defaults2(x, i, F, xi2yF) {
        return F.map(o2u, xi2yF(x !== void 0 ? x : out, i));
      };
    }
    function define(v) {
      var untoV = unto(v);
      return function define2(x, i, F, xi2yF) {
        return F.map(untoV, xi2yF(x !== void 0 ? x : v, i));
      };
    }
    var normalize2 = function normalize3(xi2x) {
      return [reread(xi2x), rewrite(xi2x)];
    };
    function required(inn) {
      return replace$1(inn, void 0);
    }
    var reread = function reread2(xi2x) {
      return function(x, i, _F, xi2yF) {
        return xi2yF(x !== void 0 ? xi2x(x, i) : x, i);
      };
    };
    var rewrite = function rewrite2(yi2y) {
      return function(x, i, F, xi2yF) {
        return F.map(function(y) {
          return y !== void 0 ? yi2y(y, i) : y;
        }, xi2yF(x, i));
      };
    };
    var filter = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : res(function(lens2) {
      return toFunction([lens2, isoU(id, ef(reqMaybeArray("`filter` must be set with undefined or an array-like object")))]);
    }))(function filter2(xi2b) {
      return function filter3(xs, i, F, xi2yF) {
        var ts = void 0;
        var fs = I.array0;
        if (seemsArrayLike(xs))
          partitionIntoIndex(xi2b, xs, ts = [], fs = []);
        return F.map(function(ts2) {
          var tsN = ts2 ? ts2[LENGTH] : 0;
          var fsN = fs[LENGTH];
          var n = tsN + fsN;
          return n === fsN ? fs : copyToFrom(copyToFrom(Array(n), 0, ts2, 0, tsN), tsN, fs, 0, fsN);
        }, xi2yF(ts, i));
      };
    });
    function find(xih2b) {
      var hint = arguments[LENGTH] > 1 ? arguments[1] : { hint: 0 };
      return function find2(xs, _i, F, xi2yF) {
        var ys = seemsArrayLike(xs) ? xs : "";
        var i = hint.hint = findIndexHint(hint, xih2b, ys);
        return F.map(function(v) {
          return setIndex(i, v, ys);
        }, xi2yF(ys[i], i));
      };
    }
    function findWith(o) {
      var oo = toFunction(o);
      var p = isDefinedAt(oo);
      return [arguments[LENGTH] > 1 ? find(p, arguments[1]) : find(p), oo];
    }
    var first = 0;
    var index = process.env.NODE_ENV !== "production" ? /* @__PURE__ */ ef(reqIndex) : id;
    var last = /* @__PURE__ */ choose(function last2(maybeArray) {
      return seemsArrayLike(maybeArray) && maybeArray[LENGTH] ? maybeArray[LENGTH] - 1 : 0;
    });
    var prefix = function prefix2(n) {
      return slice(0, n);
    };
    var slice = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? I.curry : res(function(lens2) {
      return toFunction([lens2, isoU(id, ef(reqMaybeArray("`slice` must be set with undefined or an array-like object")))]);
    }))(function slice2(begin, end) {
      return function slice3(xs, i, F, xsi2yF) {
        var seems = seemsArrayLike(xs);
        var xsN = seems && xs[LENGTH];
        var b = sliceIndex(0, xsN, 0, begin);
        var e = sliceIndex(b, xsN, xsN, end);
        return F.map(function(zs) {
          var zsN = zs ? zs[LENGTH] : 0;
          var bPzsN = b + zsN;
          var n = xsN - e + bPzsN;
          return copyToFrom(copyToFrom(copyToFrom(Array(n), 0, xs, 0, b), b, zs, 0, zsN), bPzsN, xs, e, xsN);
        }, xsi2yF(seems ? copyToFrom(Array(Math.max(0, e - b)), 0, xs, b, e) : void 0, i));
      };
    });
    var suffix = function suffix2(n) {
      return slice(n === 0 ? Infinity : !n ? 0 : -n, void 0);
    };
    var pickIn = function pickIn2(t) {
      return I.isObject(t) ? pick(modify(values2, pickInAux, t)) : t;
    };
    var prop = process.env.NODE_ENV === "production" ? id : function(x) {
      if (!I.isString(x))
        errorGiven("`prop` expects a string", x);
      return x;
    };
    function props() {
      var n = arguments[LENGTH];
      var template = {};
      for (var i = 0, k; i < n; ++i) {
        template[k = arguments[i]] = k;
      }
      return pick(template);
    }
    function propsExcept() {
      var setish = I.create(null);
      for (var i = 0, n = arguments[LENGTH]; i < n; ++i) {
        setish[arguments[i]] = "d";
      }
      return [disjoint(function(k) {
        return setish[k] || "t";
      }), "t"];
    }
    var propsOf = function propsOf2(o) {
      warn(propsOf2, "`propsOf` has been deprecated and there is no replacement.  See CHANGELOG for details.");
      return props.apply(null, I.keys(o));
    };
    function removable() {
      for (var _len4 = arguments.length, ps = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        ps[_key4] = arguments[_key4];
      }
      function drop(y) {
        if (!(y instanceof Object))
          return y;
        for (var i = 0, n = ps[LENGTH]; i < n; ++i) {
          if (I.hasU(ps[i], y))
            return y;
        }
      }
      return function(x, i, F, xi2yF) {
        return F.map(drop, xi2yF(x, i));
      };
    }
    var valueOr = function valueOr2(v) {
      return function(x, i, _F, xi2yF) {
        return xi2yF(x != null ? x : v, i);
      };
    };
    var pick = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : par(0, ef(reqTemplate("pick"))))(function pick2(template) {
      return function(x, i, F, xi2yF) {
        return F.map(function(v) {
          return setPick(template, v, x);
        }, xi2yF(getPick(template, x), i));
      };
    });
    var replace$1 = /* @__PURE__ */ I.curry(function replace$$1(inn, out) {
      function o2i(x) {
        return replaced(out, inn, x);
      }
      return function replace$$12(x, i, F, xi2yF) {
        return F.map(o2i, xi2yF(replaced(inn, out, x), i));
      };
    });
    function appendTo(xs, _2, F, xi2yF) {
      var i = seemsArrayLike(xs) ? xs[LENGTH] : 0;
      return F.map(function(x) {
        return setIndex(i, x, xs);
      }, xi2yF(void 0, i));
    }
    var append = process.env.NODE_ENV === "production" ? appendTo : function append2(x, i, F, xi2yF) {
      warn(append2, "`append` has been renamed to `appendTo`.  See CHANGELOG for details.");
      return appendTo(x, i, F, xi2yF);
    };
    var assignTo = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : function(iso2) {
      return copyName(toFunction([isoU(id, I.freeze), iso2]), iso2);
    })(function assignTo2(x, i, F, xi2yF) {
      return F.map(function(y) {
        return I.assign({}, x instanceof Object ? x : null, y);
      }, xi2yF(void 0, i));
    });
    var prependTo = /* @__PURE__ */ setName(/* @__PURE__ */ toFunction([/* @__PURE__ */ prefix(0), 0]), "prependTo");
    var appendOp = /* @__PURE__ */ setName(/* @__PURE__ */ inserterOp(appendTo), "appendOp");
    var assignOp = /* @__PURE__ */ setName(/* @__PURE__ */ inserterOp(assignTo), "assignOp");
    var modifyOp = function modifyOp2(xi2y) {
      return function modifyOp3(x, i, C, _xi2yC) {
        return C.of(xi2y(x, i));
      };
    };
    var prependOp = /* @__PURE__ */ setName(/* @__PURE__ */ inserterOp(prependTo), "prependOp");
    var setOp = function setOp2(y) {
      return function setOp3(_x, _i, C, _xi2yC) {
        return C.of(y);
      };
    };
    var removeOp = /* @__PURE__ */ setOp();
    var cross = /* @__PURE__ */ setName(/* @__PURE__ */ crossOr(removeOp), "cross");
    function getInverse(o, s) {
      return 1 < arguments[LENGTH] ? getInverseU(o, s) : function(s2) {
        return getInverseU(o, s2);
      };
    }
    var iso = /* @__PURE__ */ I.curry(isoU);
    var _ = /* @__PURE__ */ new Variable(-1);
    function mapping(ps) {
      var n = 0;
      if (I.isFunction(ps))
        ps = ps.apply(null, nVars(n = ps[LENGTH]));
      checkPatternPairInDev(ps);
      var kinds = Array(n);
      var ms = ps.map(function(p) {
        return toMatch(kinds, p);
      });
      var ss = ps.map(toSubst);
      return isoU(oneway(n, ms[0], ss[1]), oneway(n, ms[1], ss[0]));
    }
    function mappings(ps) {
      if (I.isFunction(ps))
        ps = ps.apply(null, nVars(ps[LENGTH]));
      return alternatives.apply(null, ps.map(mapping));
    }
    function pattern(p) {
      var n = 0;
      if (I.isFunction(p))
        p = p.apply(null, nVars(n = p[LENGTH]));
      checkPatternInDev(p);
      var kinds = Array(n);
      var m = toMatch(kinds, p);
      return subset(function(x) {
        return m(Array(n), x);
      });
    }
    function patterns(ps) {
      if (I.isFunction(ps))
        ps = ps.apply(null, nVars(ps[LENGTH]));
      return alternatives.apply(null, ps.map(pattern));
    }
    var alternatives = /* @__PURE__ */ makeSemi(orAlternativelyU);
    var applyAt = /* @__PURE__ */ I.curry(function applyAt2(elements, transform2) {
      return isoU(modify(elements, get2(transform2)), modify(elements, getInverse(transform2)));
    });
    var attemptEveryDown = function attemptEveryDown2(iso2) {
      return isoU(transformEvery(rereadAttempt(get2(iso2))), transformEvery(rewriteAttempt(getInverse(iso2))));
    };
    var attemptEveryUp = function attemptEveryUp2(iso2) {
      return isoU(transformEvery(rewriteAttempt(get2(iso2))), transformEvery(rereadAttempt(getInverse(iso2))));
    };
    var attemptSomeDown = function attemptSomeDown2(iso2) {
      return isoU(transformSome(get2(iso2)), transformSome(getInverse(iso2)));
    };
    var conjugate = /* @__PURE__ */ I.curry(function conjugate2(outer, inner) {
      return [outer, inner, inverse(outer)];
    });
    var inverse = function inverse2(iso2) {
      return function(x, i, F, xi2yF) {
        return F.map(function(x2) {
          return getAsU(id, iso2, x2);
        }, xi2yF(setU(iso2, x, void 0), i));
      };
    };
    var iterate = function iterate2(aIa) {
      return isoU(iteratePartial(get2(aIa)), iteratePartial(getInverse(aIa)));
    };
    var orAlternatively = /* @__PURE__ */ I.curry(orAlternativelyU);
    var fold = function fold2(saIs) {
      return isoU(foldPartial(get2(saIs)), unfoldPartial(getInverse(saIs)));
    };
    var unfold = function unfold2(sIsa) {
      return isoU(unfoldPartial(get2(sIsa)), foldPartial(getInverse(sIsa)));
    };
    var complement = /* @__PURE__ */ isoU(notPartial, notPartial);
    var is = function is2(v) {
      return isoU(function is3(x) {
        return I.acyclicEqualsU(v, x);
      }, function(b) {
        return b === true ? v : void 0;
      });
    };
    function subset(predicate) {
      var subsetFn = subsetPartial(predicate);
      return isoU(subsetFn, subsetFn);
    }
    var array = function array2(elem) {
      var fwd = getInverse(elem);
      var bwd = get2(elem);
      var mapFwd = function mapFwd2(x) {
        return mapIfArrayLike(fwd, x);
      };
      return function(x, i, F, xi2yF) {
        return F.map(mapFwd, xi2yF(mapIfArrayLike(bwd, x), i));
      };
    };
    var arrays = function arrays2(elem) {
      var fwd = getInverse(elem);
      var bwd = get2(elem);
      var mapFwd = function mapFwd2(x) {
        return mapsIfArray(fwd, x);
      };
      return function(x, i, F, xi2yF) {
        return F.map(mapFwd, xi2yF(mapsIfArray(bwd, x), i));
      };
    };
    var indexed = /* @__PURE__ */ isoU(/* @__PURE__ */ expect(seemsArrayLike, /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : res(freezeObjectOfObjects))(function indexed2(xs) {
      var n = xs[LENGTH];
      var xis = Array(n);
      for (var i = 0; i < n; ++i) {
        xis[i] = [i, xs[i]];
      }
      return xis;
    })), /* @__PURE__ */ expect(I.isArray, /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : res(I.freeze))(function(xis) {
      var n = xis[LENGTH];
      var xs = Array(n);
      for (var i = 0; i < n; ++i) {
        var xi = xis[i];
        if (xi[LENGTH] === 2)
          xs[xi[0]] = xi[1];
      }
      n = xs[LENGTH];
      var j = 0;
      for (var _i11 = 0; _i11 < n; ++_i11) {
        var x = xs[_i11];
        if (x !== void 0) {
          if (_i11 !== j)
            xs[j] = x;
          ++j;
        }
      }
      xs[LENGTH] = j;
      return xs;
    })));
    var reverse = /* @__PURE__ */ isoU(rev, rev);
    var singleton = /* @__PURE__ */ setName(/* @__PURE__ */ mapping(function(x) {
      return [[x], x];
    }), "singleton");
    var groupBy = function groupBy2(keyOf) {
      keyOf = toGetter(keyOf);
      return isoU(groupByFn(keyOf), ungroupByFn(keyOf));
    };
    var ungroupBy = function ungroupBy2(keyOf) {
      keyOf = toGetter(keyOf);
      return isoU(ungroupByFn(keyOf), groupByFn(keyOf));
    };
    var zipWith1 = function zipWith12(iso2) {
      return isoU(zW1Fn(get2(iso2)), unzW1Fn(getInverse(iso2)));
    };
    var unzipWith1 = function unzipWith12(iso2) {
      return isoU(unzW1Fn(get2(iso2)), zW1Fn(getInverse(iso2)));
    };
    var disjoint = function disjoint2(groupOf) {
      return function disjoint3(x, i, F, xi2yF) {
        var fwd = disjointFwd(groupOf);
        return F.map(fwd, xi2yF(disjointBwd(groupOf, x), i));
      };
    };
    var multikeyed = /* @__PURE__ */ isoU(/* @__PURE__ */ expect(/* @__PURE__ */ isInstanceOf(Object), /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : res(freezeObjectOfObjects))(function multikeyed2(o) {
      o = toObject(o);
      var ps = [];
      for (var k in o) {
        var v = o[k];
        if (I.isArray(v))
          for (var i = 0, n = v[LENGTH]; i < n; ++i) {
            ps.push([k, v[i]]);
          }
        else
          ps.push([k, v]);
      }
      return ps;
    })), /* @__PURE__ */ expect(I.isArray, /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : res(freezeObjectOfObjects))(function(ps) {
      var o = I.create(null);
      for (var i = 0, n = ps[LENGTH]; i < n; ++i) {
        var entry = ps[i];
        if (entry[LENGTH] === 2) {
          var k = entry[0];
          var v = entry[1];
          var was = o[k];
          if (was === void 0)
            o[k] = v;
          else if (I.isArray(was))
            was.push(v);
          else
            o[k] = [was, v];
        }
      }
      return I.assign({}, o);
    })));
    var json = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : res(function(iso2) {
      return toFunction([iso2, isoU(deepFreezeInDev, id)]);
    }))(function json2(options) {
      var _ref3 = options || I.object0, reviver = _ref3.reviver, replacer = _ref3.replacer, space = _ref3.space;
      return isoU(expect(I.isString, tryCatch(function json3(text) {
        return JSON.parse(text, reviver);
      })), expect(I.isDefined, function(value) {
        return JSON.stringify(value, replacer, space);
      }));
    });
    var uri = /* @__PURE__ */ stringIsoU(/* @__PURE__ */ tryCatch(decodeURI), encodeURI);
    var uriComponent = /* @__PURE__ */ isoU(/* @__PURE__ */ expect(I.isString, /* @__PURE__ */ tryCatch(decodeURIComponent)), /* @__PURE__ */ expect(isPrimitiveData, encodeURIComponent));
    var dropPrefix = function dropPrefix2(pfx) {
      return stringIsoU(function dropPrefix3(x) {
        return x.startsWith(pfx) ? x.slice(pfx[LENGTH]) : void 0;
      }, function(x) {
        return pfx + x;
      });
    };
    var dropSuffix = function dropSuffix2(sfx) {
      return stringIsoU(function dropSuffix3(x) {
        return x.endsWith(sfx) ? x.slice(0, x[LENGTH] - sfx[LENGTH]) : void 0;
      }, function(x) {
        return x + sfx;
      });
    };
    var replaces = /* @__PURE__ */ I.curry(function replaces2(i, o) {
      return stringIsoU(replace(toRegExpU(i, "g"), o), replace(toRegExpU(o, "g"), i));
    });
    var split = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : function(fn$$1) {
      return function split2(_sep) {
        return toFunction([fn$$1.apply(null, arguments), isoU(I.freeze, id)]);
      };
    })(function split2(sep) {
      var re = arguments[LENGTH] > 1 ? arguments[1] : sep;
      return isoU(expect(I.isString, function(x) {
        return x.split(re);
      }), expect(I.isArray, function(xs) {
        return xs.join(sep);
      }));
    });
    var uncouple = /* @__PURE__ */ (process.env.NODE_ENV === "production" ? id : function(fn$$1) {
      return function uncouple2(_sep) {
        return toFunction([fn$$1.apply(null, arguments), isoU(I.freeze, id)]);
      };
    })(function uncouple2(sep) {
      var re = toRegExpU(arguments[LENGTH] > 1 ? arguments[1] : sep, "");
      return isoU(expect(I.isString, function(x) {
        var m = re.exec(x);
        return m ? [x.slice(0, m[INDEX]), x.slice(reLastIndex(m))] : [x, ""];
      }), function(kv) {
        if (isPair(kv)) {
          var k = kv[0];
          var v = kv[1];
          return v ? k + sep + v : k;
        }
      });
    });
    var querystring = /* @__PURE__ */ setName(/* @__PURE__ */ toFunction([/* @__PURE__ */ reread(function(s) {
      return I.isString(s) ? s.replace(/\+/g, "%20") : s;
    }), /* @__PURE__ */ split("&"), /* @__PURE__ */ array([/* @__PURE__ */ uncouple("="), /* @__PURE__ */ array(uriComponent)]), /* @__PURE__ */ inverse(multikeyed)]), "querystring");
    var add$1 = function add$$1(c) {
      return numberIsoU(add(c), add(-c));
    };
    var divide = function divide2(c) {
      return numberIsoU(divideBy(c), multiply(c));
    };
    var multiply$1 = function multiply$$1(c) {
      return numberIsoU(multiply(c), divideBy(c));
    };
    var negate$1 = /* @__PURE__ */ numberIsoU(negate, negate);
    var subtract = function subtract2(c) {
      return numberIsoU(add(-c), add(c));
    };
    var pointer = function pointer2(s) {
      if (s[0] === "#")
        s = decodeURIComponent(s);
      var ts = s.split("/");
      var n = ts[LENGTH];
      for (var i = 1; i < n; ++i) {
        var t = ts[i];
        ts[i - 1] = /^(0|[1-9]\d*)$/.test(t) ? ifElse(isArrayOrPrimitive, Number(t), t) : t === "-" ? ifElse(isArrayOrPrimitive, append, t) : t.replace("~1", "/").replace("~0", "~");
      }
      ts[LENGTH] = n - 1;
      return ts;
    };
    exports2.Identity = I.Identity;
    exports2.IdentityAsync = I.IdentityAsync;
    exports2.FantasyFunctor = I.FantasyFunctor;
    exports2.fromFantasy = I.fromFantasy;
    exports2.fromFantasyApplicative = I.fromFantasyApplicative;
    exports2.fromFantasyMonad = I.fromFantasyMonad;
    exports2.seemsArrayLike = seemsArrayLike;
    exports2.Select = Select;
    exports2.toFunction = toFunction;
    exports2.assign = assign;
    exports2.disperse = disperse;
    exports2.modify = modify;
    exports2.modifyAsync = modifyAsync2;
    exports2.remove = remove;
    exports2.set = set;
    exports2.traverse = traverse;
    exports2.compose = compose2;
    exports2.flat = flat;
    exports2.lazy = lazy;
    exports2.choices = choices;
    exports2.choose = choose;
    exports2.cond = cond;
    exports2.condOf = condOf;
    exports2.ifElse = ifElse;
    exports2.orElse = orElse;
    exports2.chain = chain;
    exports2.choice = choice;
    exports2.unless = unless;
    exports2.when = when;
    exports2.optional = optional;
    exports2.zero = zero;
    exports2.mapIx = mapIx;
    exports2.setIx = setIx;
    exports2.tieIx = tieIx;
    exports2.joinIx = joinIx;
    exports2.reIx = reIx;
    exports2.skipIx = skipIx;
    exports2.getLog = getLog;
    exports2.log = log;
    exports2.transform = transform;
    exports2.transformAsync = transformAsync;
    exports2.seq = seq;
    exports2.branchOr = branchOr;
    exports2.branch = branch;
    exports2.branches = branches;
    exports2.elems = elems;
    exports2.elemsTotal = elemsTotal;
    exports2.entries = entries2;
    exports2.keys = keys2;
    exports2.keysEverywhere = keysEverywhere;
    exports2.subseq = subseq;
    exports2.limit = limit;
    exports2.offset = offset;
    exports2.matches = matches;
    exports2.values = values2;
    exports2.children = children;
    exports2.flatten = flatten;
    exports2.query = query;
    exports2.satisfying = satisfying;
    exports2.leafs = leafs;
    exports2.whereEq = whereEq;
    exports2.all = all;
    exports2.and = and$1;
    exports2.all1 = all1;
    exports2.and1 = and1;
    exports2.any = any;
    exports2.collectAs = collectAs;
    exports2.collect = collect2;
    exports2.collectTotalAs = collectTotalAs;
    exports2.collectTotal = collectTotal;
    exports2.concatAs = concatAs;
    exports2.concat = concat;
    exports2.countIf = countIf;
    exports2.count = count;
    exports2.countsAs = countsAs;
    exports2.counts = counts;
    exports2.foldl = foldl;
    exports2.foldr = foldr;
    exports2.forEach = forEach;
    exports2.forEachWith = forEachWith;
    exports2.get = get2;
    exports2.getAs = getAs;
    exports2.isDefined = isDefined;
    exports2.isEmpty = isEmpty;
    exports2.joinAs = joinAs;
    exports2.join = join;
    exports2.maximumBy = maximumBy;
    exports2.maximum = maximum;
    exports2.meanAs = meanAs;
    exports2.mean = mean;
    exports2.minimumBy = minimumBy;
    exports2.minimum = minimum;
    exports2.none = none;
    exports2.or = or$1;
    exports2.productAs = productAs;
    exports2.product = product;
    exports2.select = select;
    exports2.selectAs = selectAs;
    exports2.sumAs = sumAs;
    exports2.sum = sum;
    exports2.foldTraversalLens = foldTraversalLens;
    exports2.getter = getter;
    exports2.lens = lens;
    exports2.partsOf = partsOf;
    exports2.setter = setter;
    exports2.defaults = defaults;
    exports2.define = define;
    exports2.normalize = normalize2;
    exports2.required = required;
    exports2.reread = reread;
    exports2.rewrite = rewrite;
    exports2.filter = filter;
    exports2.find = find;
    exports2.findWith = findWith;
    exports2.first = first;
    exports2.index = index;
    exports2.last = last;
    exports2.prefix = prefix;
    exports2.slice = slice;
    exports2.suffix = suffix;
    exports2.pickIn = pickIn;
    exports2.prop = prop;
    exports2.props = props;
    exports2.propsExcept = propsExcept;
    exports2.propsOf = propsOf;
    exports2.removable = removable;
    exports2.valueOr = valueOr;
    exports2.pick = pick;
    exports2.replace = replace$1;
    exports2.appendTo = appendTo;
    exports2.append = append;
    exports2.assignTo = assignTo;
    exports2.prependTo = prependTo;
    exports2.appendOp = appendOp;
    exports2.assignOp = assignOp;
    exports2.modifyOp = modifyOp;
    exports2.prependOp = prependOp;
    exports2.setOp = setOp;
    exports2.removeOp = removeOp;
    exports2.cross = cross;
    exports2.getInverse = getInverse;
    exports2.iso = iso;
    exports2._ = _;
    exports2.mapping = mapping;
    exports2.mappings = mappings;
    exports2.pattern = pattern;
    exports2.patterns = patterns;
    exports2.alternatives = alternatives;
    exports2.applyAt = applyAt;
    exports2.attemptEveryDown = attemptEveryDown;
    exports2.attemptEveryUp = attemptEveryUp;
    exports2.attemptSomeDown = attemptSomeDown;
    exports2.conjugate = conjugate;
    exports2.inverse = inverse;
    exports2.iterate = iterate;
    exports2.orAlternatively = orAlternatively;
    exports2.fold = fold;
    exports2.unfold = unfold;
    exports2.complement = complement;
    exports2.identity = identity;
    exports2.is = is;
    exports2.subset = subset;
    exports2.array = array;
    exports2.arrays = arrays;
    exports2.indexed = indexed;
    exports2.reverse = reverse;
    exports2.singleton = singleton;
    exports2.groupBy = groupBy;
    exports2.ungroupBy = ungroupBy;
    exports2.zipWith1 = zipWith1;
    exports2.unzipWith1 = unzipWith1;
    exports2.disjoint = disjoint;
    exports2.keyed = keyed;
    exports2.multikeyed = multikeyed;
    exports2.json = json;
    exports2.uri = uri;
    exports2.uriComponent = uriComponent;
    exports2.dropPrefix = dropPrefix;
    exports2.dropSuffix = dropSuffix;
    exports2.replaces = replaces;
    exports2.split = split;
    exports2.uncouple = uncouple;
    exports2.querystring = querystring;
    exports2.add = add$1;
    exports2.divide = divide;
    exports2.multiply = multiply$1;
    exports2.negate = negate$1;
    exports2.subtract = subtract;
    exports2.pointer = pointer;
  }
});

// node_modules/yargs/lib/platform-shims/esm.mjs
var import_assert = require("assert");

// node_modules/cliui/build/lib/index.js
var align = {
  right: alignRight,
  center: alignCenter
};
var top = 0;
var right = 1;
var bottom = 2;
var left = 3;
var UI = class {
  constructor(opts) {
    var _a;
    this.width = opts.width;
    this.wrap = (_a = opts.wrap) !== null && _a !== void 0 ? _a : true;
    this.rows = [];
  }
  span(...args) {
    const cols = this.div(...args);
    cols.span = true;
  }
  resetOutput() {
    this.rows = [];
  }
  div(...args) {
    if (args.length === 0) {
      this.div("");
    }
    if (this.wrap && this.shouldApplyLayoutDSL(...args) && typeof args[0] === "string") {
      return this.applyLayoutDSL(args[0]);
    }
    const cols = args.map((arg) => {
      if (typeof arg === "string") {
        return this.colFromString(arg);
      }
      return arg;
    });
    this.rows.push(cols);
    return cols;
  }
  shouldApplyLayoutDSL(...args) {
    return args.length === 1 && typeof args[0] === "string" && /[\t\n]/.test(args[0]);
  }
  applyLayoutDSL(str) {
    const rows = str.split("\n").map((row) => row.split("	"));
    let leftColumnWidth = 0;
    rows.forEach((columns) => {
      if (columns.length > 1 && mixin.stringWidth(columns[0]) > leftColumnWidth) {
        leftColumnWidth = Math.min(Math.floor(this.width * 0.5), mixin.stringWidth(columns[0]));
      }
    });
    rows.forEach((columns) => {
      this.div(...columns.map((r, i) => {
        return {
          text: r.trim(),
          padding: this.measurePadding(r),
          width: i === 0 && columns.length > 1 ? leftColumnWidth : void 0
        };
      }));
    });
    return this.rows[this.rows.length - 1];
  }
  colFromString(text) {
    return {
      text,
      padding: this.measurePadding(text)
    };
  }
  measurePadding(str) {
    const noAnsi = mixin.stripAnsi(str);
    return [0, noAnsi.match(/\s*$/)[0].length, 0, noAnsi.match(/^\s*/)[0].length];
  }
  toString() {
    const lines = [];
    this.rows.forEach((row) => {
      this.rowToString(row, lines);
    });
    return lines.filter((line) => !line.hidden).map((line) => line.text).join("\n");
  }
  rowToString(row, lines) {
    this.rasterize(row).forEach((rrow, r) => {
      let str = "";
      rrow.forEach((col, c) => {
        const { width } = row[c];
        const wrapWidth = this.negatePadding(row[c]);
        let ts = col;
        if (wrapWidth > mixin.stringWidth(col)) {
          ts += " ".repeat(wrapWidth - mixin.stringWidth(col));
        }
        if (row[c].align && row[c].align !== "left" && this.wrap) {
          const fn = align[row[c].align];
          ts = fn(ts, wrapWidth);
          if (mixin.stringWidth(ts) < wrapWidth) {
            ts += " ".repeat((width || 0) - mixin.stringWidth(ts) - 1);
          }
        }
        const padding = row[c].padding || [0, 0, 0, 0];
        if (padding[left]) {
          str += " ".repeat(padding[left]);
        }
        str += addBorder(row[c], ts, "| ");
        str += ts;
        str += addBorder(row[c], ts, " |");
        if (padding[right]) {
          str += " ".repeat(padding[right]);
        }
        if (r === 0 && lines.length > 0) {
          str = this.renderInline(str, lines[lines.length - 1]);
        }
      });
      lines.push({
        text: str.replace(/ +$/, ""),
        span: row.span
      });
    });
    return lines;
  }
  renderInline(source, previousLine) {
    const match = source.match(/^ */);
    const leadingWhitespace = match ? match[0].length : 0;
    const target = previousLine.text;
    const targetTextWidth = mixin.stringWidth(target.trimRight());
    if (!previousLine.span) {
      return source;
    }
    if (!this.wrap) {
      previousLine.hidden = true;
      return target + source;
    }
    if (leadingWhitespace < targetTextWidth) {
      return source;
    }
    previousLine.hidden = true;
    return target.trimRight() + " ".repeat(leadingWhitespace - targetTextWidth) + source.trimLeft();
  }
  rasterize(row) {
    const rrows = [];
    const widths = this.columnWidths(row);
    let wrapped;
    row.forEach((col, c) => {
      col.width = widths[c];
      if (this.wrap) {
        wrapped = mixin.wrap(col.text, this.negatePadding(col), { hard: true }).split("\n");
      } else {
        wrapped = col.text.split("\n");
      }
      if (col.border) {
        wrapped.unshift("." + "-".repeat(this.negatePadding(col) + 2) + ".");
        wrapped.push("'" + "-".repeat(this.negatePadding(col) + 2) + "'");
      }
      if (col.padding) {
        wrapped.unshift(...new Array(col.padding[top] || 0).fill(""));
        wrapped.push(...new Array(col.padding[bottom] || 0).fill(""));
      }
      wrapped.forEach((str, r) => {
        if (!rrows[r]) {
          rrows.push([]);
        }
        const rrow = rrows[r];
        for (let i = 0; i < c; i++) {
          if (rrow[i] === void 0) {
            rrow.push("");
          }
        }
        rrow.push(str);
      });
    });
    return rrows;
  }
  negatePadding(col) {
    let wrapWidth = col.width || 0;
    if (col.padding) {
      wrapWidth -= (col.padding[left] || 0) + (col.padding[right] || 0);
    }
    if (col.border) {
      wrapWidth -= 4;
    }
    return wrapWidth;
  }
  columnWidths(row) {
    if (!this.wrap) {
      return row.map((col) => {
        return col.width || mixin.stringWidth(col.text);
      });
    }
    let unset = row.length;
    let remainingWidth = this.width;
    const widths = row.map((col) => {
      if (col.width) {
        unset--;
        remainingWidth -= col.width;
        return col.width;
      }
      return void 0;
    });
    const unsetWidth = unset ? Math.floor(remainingWidth / unset) : 0;
    return widths.map((w, i) => {
      if (w === void 0) {
        return Math.max(unsetWidth, _minWidth(row[i]));
      }
      return w;
    });
  }
};
function addBorder(col, ts, style) {
  if (col.border) {
    if (/[.']-+[.']/.test(ts)) {
      return "";
    }
    if (ts.trim().length !== 0) {
      return style;
    }
    return "  ";
  }
  return "";
}
function _minWidth(col) {
  const padding = col.padding || [];
  const minWidth = 1 + (padding[left] || 0) + (padding[right] || 0);
  if (col.border) {
    return minWidth + 4;
  }
  return minWidth;
}
function getWindowWidth() {
  if (typeof process === "object" && process.stdout && process.stdout.columns) {
    return process.stdout.columns;
  }
  return 80;
}
function alignRight(str, width) {
  str = str.trim();
  const strWidth = mixin.stringWidth(str);
  if (strWidth < width) {
    return " ".repeat(width - strWidth) + str;
  }
  return str;
}
function alignCenter(str, width) {
  str = str.trim();
  const strWidth = mixin.stringWidth(str);
  if (strWidth >= width) {
    return str;
  }
  return " ".repeat(width - strWidth >> 1) + str;
}
var mixin;
function cliui(opts, _mixin) {
  mixin = _mixin;
  return new UI({
    width: (opts === null || opts === void 0 ? void 0 : opts.width) || getWindowWidth(),
    wrap: opts === null || opts === void 0 ? void 0 : opts.wrap
  });
}

// node_modules/cliui/build/lib/string-utils.js
var ansi = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function stripAnsi(str) {
  return str.replace(ansi, "");
}
function wrap(str, width) {
  const [start, end] = str.match(ansi) || ["", ""];
  str = stripAnsi(str);
  let wrapped = "";
  for (let i = 0; i < str.length; i++) {
    if (i !== 0 && i % width === 0) {
      wrapped += "\n";
    }
    wrapped += str.charAt(i);
  }
  if (start && end) {
    wrapped = `${start}${wrapped}${end}`;
  }
  return wrapped;
}

// node_modules/cliui/index.mjs
function ui(opts) {
  return cliui(opts, {
    stringWidth: (str) => {
      return [...str].length;
    },
    stripAnsi,
    wrap
  });
}

// node_modules/escalade/sync/index.mjs
var import_path = require("path");
var import_fs = require("fs");
function sync_default(start, callback) {
  let dir = (0, import_path.resolve)(".", start);
  let tmp, stats = (0, import_fs.statSync)(dir);
  if (!stats.isDirectory()) {
    dir = (0, import_path.dirname)(dir);
  }
  while (true) {
    tmp = callback(dir, (0, import_fs.readdirSync)(dir));
    if (tmp)
      return (0, import_path.resolve)(dir, tmp);
    dir = (0, import_path.dirname)(tmp = dir);
    if (tmp === dir)
      break;
  }
}

// node_modules/yargs/lib/platform-shims/esm.mjs
var import_util3 = require("util");
var import_fs4 = require("fs");
var import_url = require("url");

// node_modules/yargs-parser/build/lib/index.js
var import_util = require("util");
var import_path2 = require("path");

// node_modules/yargs-parser/build/lib/string-utils.js
function camelCase(str) {
  const isCamelCase = str !== str.toLowerCase() && str !== str.toUpperCase();
  if (!isCamelCase) {
    str = str.toLowerCase();
  }
  if (str.indexOf("-") === -1 && str.indexOf("_") === -1) {
    return str;
  } else {
    let camelcase = "";
    let nextChrUpper = false;
    const leadingHyphens = str.match(/^-+/);
    for (let i = leadingHyphens ? leadingHyphens[0].length : 0; i < str.length; i++) {
      let chr = str.charAt(i);
      if (nextChrUpper) {
        nextChrUpper = false;
        chr = chr.toUpperCase();
      }
      if (i !== 0 && (chr === "-" || chr === "_")) {
        nextChrUpper = true;
      } else if (chr !== "-" && chr !== "_") {
        camelcase += chr;
      }
    }
    return camelcase;
  }
}
function decamelize(str, joinString) {
  const lowercase = str.toLowerCase();
  joinString = joinString || "-";
  let notCamelcase = "";
  for (let i = 0; i < str.length; i++) {
    const chrLower = lowercase.charAt(i);
    const chrString = str.charAt(i);
    if (chrLower !== chrString && i > 0) {
      notCamelcase += `${joinString}${lowercase.charAt(i)}`;
    } else {
      notCamelcase += chrString;
    }
  }
  return notCamelcase;
}
function looksLikeNumber(x) {
  if (x === null || x === void 0)
    return false;
  if (typeof x === "number")
    return true;
  if (/^0x[0-9a-f]+$/i.test(x))
    return true;
  if (/^0[^.]/.test(x))
    return false;
  return /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(x);
}

// node_modules/yargs-parser/build/lib/tokenize-arg-string.js
function tokenizeArgString(argString) {
  if (Array.isArray(argString)) {
    return argString.map((e) => typeof e !== "string" ? e + "" : e);
  }
  argString = argString.trim();
  let i = 0;
  let prevC = null;
  let c = null;
  let opening = null;
  const args = [];
  for (let ii = 0; ii < argString.length; ii++) {
    prevC = c;
    c = argString.charAt(ii);
    if (c === " " && !opening) {
      if (!(prevC === " ")) {
        i++;
      }
      continue;
    }
    if (c === opening) {
      opening = null;
    } else if ((c === "'" || c === '"') && !opening) {
      opening = c;
    }
    if (!args[i])
      args[i] = "";
    args[i] += c;
  }
  return args;
}

// node_modules/yargs-parser/build/lib/yargs-parser-types.js
var DefaultValuesForTypeKey;
(function(DefaultValuesForTypeKey2) {
  DefaultValuesForTypeKey2["BOOLEAN"] = "boolean";
  DefaultValuesForTypeKey2["STRING"] = "string";
  DefaultValuesForTypeKey2["NUMBER"] = "number";
  DefaultValuesForTypeKey2["ARRAY"] = "array";
})(DefaultValuesForTypeKey || (DefaultValuesForTypeKey = {}));

// node_modules/yargs-parser/build/lib/yargs-parser.js
var mixin2;
var YargsParser = class {
  constructor(_mixin) {
    mixin2 = _mixin;
  }
  parse(argsInput, options) {
    const opts = Object.assign({
      alias: void 0,
      array: void 0,
      boolean: void 0,
      config: void 0,
      configObjects: void 0,
      configuration: void 0,
      coerce: void 0,
      count: void 0,
      default: void 0,
      envPrefix: void 0,
      narg: void 0,
      normalize: void 0,
      string: void 0,
      number: void 0,
      __: void 0,
      key: void 0
    }, options);
    const args = tokenizeArgString(argsInput);
    const inputIsString = typeof argsInput === "string";
    const aliases = combineAliases(Object.assign(/* @__PURE__ */ Object.create(null), opts.alias));
    const configuration = Object.assign({
      "boolean-negation": true,
      "camel-case-expansion": true,
      "combine-arrays": false,
      "dot-notation": true,
      "duplicate-arguments-array": true,
      "flatten-duplicate-arrays": true,
      "greedy-arrays": true,
      "halt-at-non-option": false,
      "nargs-eats-options": false,
      "negation-prefix": "no-",
      "parse-numbers": true,
      "parse-positional-numbers": true,
      "populate--": false,
      "set-placeholder-key": false,
      "short-option-groups": true,
      "strip-aliased": false,
      "strip-dashed": false,
      "unknown-options-as-args": false
    }, opts.configuration);
    const defaults = Object.assign(/* @__PURE__ */ Object.create(null), opts.default);
    const configObjects = opts.configObjects || [];
    const envPrefix = opts.envPrefix;
    const notFlagsOption = configuration["populate--"];
    const notFlagsArgv = notFlagsOption ? "--" : "_";
    const newAliases = /* @__PURE__ */ Object.create(null);
    const defaulted = /* @__PURE__ */ Object.create(null);
    const __ = opts.__ || mixin2.format;
    const flags = {
      aliases: /* @__PURE__ */ Object.create(null),
      arrays: /* @__PURE__ */ Object.create(null),
      bools: /* @__PURE__ */ Object.create(null),
      strings: /* @__PURE__ */ Object.create(null),
      numbers: /* @__PURE__ */ Object.create(null),
      counts: /* @__PURE__ */ Object.create(null),
      normalize: /* @__PURE__ */ Object.create(null),
      configs: /* @__PURE__ */ Object.create(null),
      nargs: /* @__PURE__ */ Object.create(null),
      coercions: /* @__PURE__ */ Object.create(null),
      keys: []
    };
    const negative = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/;
    const negatedBoolean = new RegExp("^--" + configuration["negation-prefix"] + "(.+)");
    [].concat(opts.array || []).filter(Boolean).forEach(function(opt) {
      const key = typeof opt === "object" ? opt.key : opt;
      const assignment = Object.keys(opt).map(function(key2) {
        const arrayFlagKeys = {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        };
        return arrayFlagKeys[key2];
      }).filter(Boolean).pop();
      if (assignment) {
        flags[assignment][key] = true;
      }
      flags.arrays[key] = true;
      flags.keys.push(key);
    });
    [].concat(opts.boolean || []).filter(Boolean).forEach(function(key) {
      flags.bools[key] = true;
      flags.keys.push(key);
    });
    [].concat(opts.string || []).filter(Boolean).forEach(function(key) {
      flags.strings[key] = true;
      flags.keys.push(key);
    });
    [].concat(opts.number || []).filter(Boolean).forEach(function(key) {
      flags.numbers[key] = true;
      flags.keys.push(key);
    });
    [].concat(opts.count || []).filter(Boolean).forEach(function(key) {
      flags.counts[key] = true;
      flags.keys.push(key);
    });
    [].concat(opts.normalize || []).filter(Boolean).forEach(function(key) {
      flags.normalize[key] = true;
      flags.keys.push(key);
    });
    if (typeof opts.narg === "object") {
      Object.entries(opts.narg).forEach(([key, value]) => {
        if (typeof value === "number") {
          flags.nargs[key] = value;
          flags.keys.push(key);
        }
      });
    }
    if (typeof opts.coerce === "object") {
      Object.entries(opts.coerce).forEach(([key, value]) => {
        if (typeof value === "function") {
          flags.coercions[key] = value;
          flags.keys.push(key);
        }
      });
    }
    if (typeof opts.config !== "undefined") {
      if (Array.isArray(opts.config) || typeof opts.config === "string") {
        ;
        [].concat(opts.config).filter(Boolean).forEach(function(key) {
          flags.configs[key] = true;
        });
      } else if (typeof opts.config === "object") {
        Object.entries(opts.config).forEach(([key, value]) => {
          if (typeof value === "boolean" || typeof value === "function") {
            flags.configs[key] = value;
          }
        });
      }
    }
    extendAliases(opts.key, aliases, opts.default, flags.arrays);
    Object.keys(defaults).forEach(function(key) {
      (flags.aliases[key] || []).forEach(function(alias) {
        defaults[alias] = defaults[key];
      });
    });
    let error = null;
    checkConfiguration();
    let notFlags = [];
    const argv = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] });
    const argvReturn = {};
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      const truncatedArg = arg.replace(/^-{3,}/, "---");
      let broken;
      let key;
      let letters;
      let m;
      let next;
      let value;
      if (arg !== "--" && isUnknownOptionAsArg(arg)) {
        pushPositional(arg);
      } else if (truncatedArg.match(/---+(=|$)/)) {
        pushPositional(arg);
        continue;
      } else if (arg.match(/^--.+=/) || !configuration["short-option-groups"] && arg.match(/^-.+=/)) {
        m = arg.match(/^--?([^=]+)=([\s\S]*)$/);
        if (m !== null && Array.isArray(m) && m.length >= 3) {
          if (checkAllAliases(m[1], flags.arrays)) {
            i = eatArray(i, m[1], args, m[2]);
          } else if (checkAllAliases(m[1], flags.nargs) !== false) {
            i = eatNargs(i, m[1], args, m[2]);
          } else {
            setArg(m[1], m[2], true);
          }
        }
      } else if (arg.match(negatedBoolean) && configuration["boolean-negation"]) {
        m = arg.match(negatedBoolean);
        if (m !== null && Array.isArray(m) && m.length >= 2) {
          key = m[1];
          setArg(key, checkAllAliases(key, flags.arrays) ? [false] : false);
        }
      } else if (arg.match(/^--.+/) || !configuration["short-option-groups"] && arg.match(/^-[^-]+/)) {
        m = arg.match(/^--?(.+)/);
        if (m !== null && Array.isArray(m) && m.length >= 2) {
          key = m[1];
          if (checkAllAliases(key, flags.arrays)) {
            i = eatArray(i, key, args);
          } else if (checkAllAliases(key, flags.nargs) !== false) {
            i = eatNargs(i, key, args);
          } else {
            next = args[i + 1];
            if (next !== void 0 && (!next.match(/^-/) || next.match(negative)) && !checkAllAliases(key, flags.bools) && !checkAllAliases(key, flags.counts)) {
              setArg(key, next);
              i++;
            } else if (/^(true|false)$/.test(next)) {
              setArg(key, next);
              i++;
            } else {
              setArg(key, defaultValue(key));
            }
          }
        }
      } else if (arg.match(/^-.\..+=/)) {
        m = arg.match(/^-([^=]+)=([\s\S]*)$/);
        if (m !== null && Array.isArray(m) && m.length >= 3) {
          setArg(m[1], m[2]);
        }
      } else if (arg.match(/^-.\..+/) && !arg.match(negative)) {
        next = args[i + 1];
        m = arg.match(/^-(.\..+)/);
        if (m !== null && Array.isArray(m) && m.length >= 2) {
          key = m[1];
          if (next !== void 0 && !next.match(/^-/) && !checkAllAliases(key, flags.bools) && !checkAllAliases(key, flags.counts)) {
            setArg(key, next);
            i++;
          } else {
            setArg(key, defaultValue(key));
          }
        }
      } else if (arg.match(/^-[^-]+/) && !arg.match(negative)) {
        letters = arg.slice(1, -1).split("");
        broken = false;
        for (let j = 0; j < letters.length; j++) {
          next = arg.slice(j + 2);
          if (letters[j + 1] && letters[j + 1] === "=") {
            value = arg.slice(j + 3);
            key = letters[j];
            if (checkAllAliases(key, flags.arrays)) {
              i = eatArray(i, key, args, value);
            } else if (checkAllAliases(key, flags.nargs) !== false) {
              i = eatNargs(i, key, args, value);
            } else {
              setArg(key, value);
            }
            broken = true;
            break;
          }
          if (next === "-") {
            setArg(letters[j], next);
            continue;
          }
          if (/[A-Za-z]/.test(letters[j]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(next) && checkAllAliases(next, flags.bools) === false) {
            setArg(letters[j], next);
            broken = true;
            break;
          }
          if (letters[j + 1] && letters[j + 1].match(/\W/)) {
            setArg(letters[j], next);
            broken = true;
            break;
          } else {
            setArg(letters[j], defaultValue(letters[j]));
          }
        }
        key = arg.slice(-1)[0];
        if (!broken && key !== "-") {
          if (checkAllAliases(key, flags.arrays)) {
            i = eatArray(i, key, args);
          } else if (checkAllAliases(key, flags.nargs) !== false) {
            i = eatNargs(i, key, args);
          } else {
            next = args[i + 1];
            if (next !== void 0 && (!/^(-|--)[^-]/.test(next) || next.match(negative)) && !checkAllAliases(key, flags.bools) && !checkAllAliases(key, flags.counts)) {
              setArg(key, next);
              i++;
            } else if (/^(true|false)$/.test(next)) {
              setArg(key, next);
              i++;
            } else {
              setArg(key, defaultValue(key));
            }
          }
        }
      } else if (arg.match(/^-[0-9]$/) && arg.match(negative) && checkAllAliases(arg.slice(1), flags.bools)) {
        key = arg.slice(1);
        setArg(key, defaultValue(key));
      } else if (arg === "--") {
        notFlags = args.slice(i + 1);
        break;
      } else if (configuration["halt-at-non-option"]) {
        notFlags = args.slice(i);
        break;
      } else {
        pushPositional(arg);
      }
    }
    applyEnvVars(argv, true);
    applyEnvVars(argv, false);
    setConfig(argv);
    setConfigObjects();
    applyDefaultsAndAliases(argv, flags.aliases, defaults, true);
    applyCoercions(argv);
    if (configuration["set-placeholder-key"])
      setPlaceholderKeys(argv);
    Object.keys(flags.counts).forEach(function(key) {
      if (!hasKey(argv, key.split(".")))
        setArg(key, 0);
    });
    if (notFlagsOption && notFlags.length)
      argv[notFlagsArgv] = [];
    notFlags.forEach(function(key) {
      argv[notFlagsArgv].push(key);
    });
    if (configuration["camel-case-expansion"] && configuration["strip-dashed"]) {
      Object.keys(argv).filter((key) => key !== "--" && key.includes("-")).forEach((key) => {
        delete argv[key];
      });
    }
    if (configuration["strip-aliased"]) {
      ;
      [].concat(...Object.keys(aliases).map((k) => aliases[k])).forEach((alias) => {
        if (configuration["camel-case-expansion"] && alias.includes("-")) {
          delete argv[alias.split(".").map((prop) => camelCase(prop)).join(".")];
        }
        delete argv[alias];
      });
    }
    function pushPositional(arg) {
      const maybeCoercedNumber = maybeCoerceNumber("_", arg);
      if (typeof maybeCoercedNumber === "string" || typeof maybeCoercedNumber === "number") {
        argv._.push(maybeCoercedNumber);
      }
    }
    function eatNargs(i, key, args2, argAfterEqualSign) {
      let ii;
      let toEat = checkAllAliases(key, flags.nargs);
      toEat = typeof toEat !== "number" || isNaN(toEat) ? 1 : toEat;
      if (toEat === 0) {
        if (!isUndefined(argAfterEqualSign)) {
          error = Error(__("Argument unexpected for: %s", key));
        }
        setArg(key, defaultValue(key));
        return i;
      }
      let available = isUndefined(argAfterEqualSign) ? 0 : 1;
      if (configuration["nargs-eats-options"]) {
        if (args2.length - (i + 1) + available < toEat) {
          error = Error(__("Not enough arguments following: %s", key));
        }
        available = toEat;
      } else {
        for (ii = i + 1; ii < args2.length; ii++) {
          if (!args2[ii].match(/^-[^0-9]/) || args2[ii].match(negative) || isUnknownOptionAsArg(args2[ii]))
            available++;
          else
            break;
        }
        if (available < toEat)
          error = Error(__("Not enough arguments following: %s", key));
      }
      let consumed = Math.min(available, toEat);
      if (!isUndefined(argAfterEqualSign) && consumed > 0) {
        setArg(key, argAfterEqualSign);
        consumed--;
      }
      for (ii = i + 1; ii < consumed + i + 1; ii++) {
        setArg(key, args2[ii]);
      }
      return i + consumed;
    }
    function eatArray(i, key, args2, argAfterEqualSign) {
      let argsToSet = [];
      let next = argAfterEqualSign || args2[i + 1];
      const nargsCount = checkAllAliases(key, flags.nargs);
      if (checkAllAliases(key, flags.bools) && !/^(true|false)$/.test(next)) {
        argsToSet.push(true);
      } else if (isUndefined(next) || isUndefined(argAfterEqualSign) && /^-/.test(next) && !negative.test(next) && !isUnknownOptionAsArg(next)) {
        if (defaults[key] !== void 0) {
          const defVal = defaults[key];
          argsToSet = Array.isArray(defVal) ? defVal : [defVal];
        }
      } else {
        if (!isUndefined(argAfterEqualSign)) {
          argsToSet.push(processValue(key, argAfterEqualSign, true));
        }
        for (let ii = i + 1; ii < args2.length; ii++) {
          if (!configuration["greedy-arrays"] && argsToSet.length > 0 || nargsCount && typeof nargsCount === "number" && argsToSet.length >= nargsCount)
            break;
          next = args2[ii];
          if (/^-/.test(next) && !negative.test(next) && !isUnknownOptionAsArg(next))
            break;
          i = ii;
          argsToSet.push(processValue(key, next, inputIsString));
        }
      }
      if (typeof nargsCount === "number" && (nargsCount && argsToSet.length < nargsCount || isNaN(nargsCount) && argsToSet.length === 0)) {
        error = Error(__("Not enough arguments following: %s", key));
      }
      setArg(key, argsToSet);
      return i;
    }
    function setArg(key, val, shouldStripQuotes = inputIsString) {
      if (/-/.test(key) && configuration["camel-case-expansion"]) {
        const alias = key.split(".").map(function(prop) {
          return camelCase(prop);
        }).join(".");
        addNewAlias(key, alias);
      }
      const value = processValue(key, val, shouldStripQuotes);
      const splitKey = key.split(".");
      setKey(argv, splitKey, value);
      if (flags.aliases[key]) {
        flags.aliases[key].forEach(function(x) {
          const keyProperties = x.split(".");
          setKey(argv, keyProperties, value);
        });
      }
      if (splitKey.length > 1 && configuration["dot-notation"]) {
        ;
        (flags.aliases[splitKey[0]] || []).forEach(function(x) {
          let keyProperties = x.split(".");
          const a = [].concat(splitKey);
          a.shift();
          keyProperties = keyProperties.concat(a);
          if (!(flags.aliases[key] || []).includes(keyProperties.join("."))) {
            setKey(argv, keyProperties, value);
          }
        });
      }
      if (checkAllAliases(key, flags.normalize) && !checkAllAliases(key, flags.arrays)) {
        const keys2 = [key].concat(flags.aliases[key] || []);
        keys2.forEach(function(key2) {
          Object.defineProperty(argvReturn, key2, {
            enumerable: true,
            get() {
              return val;
            },
            set(value2) {
              val = typeof value2 === "string" ? mixin2.normalize(value2) : value2;
            }
          });
        });
      }
    }
    function addNewAlias(key, alias) {
      if (!(flags.aliases[key] && flags.aliases[key].length)) {
        flags.aliases[key] = [alias];
        newAliases[alias] = true;
      }
      if (!(flags.aliases[alias] && flags.aliases[alias].length)) {
        addNewAlias(alias, key);
      }
    }
    function processValue(key, val, shouldStripQuotes) {
      if (shouldStripQuotes) {
        val = stripQuotes(val);
      }
      if (checkAllAliases(key, flags.bools) || checkAllAliases(key, flags.counts)) {
        if (typeof val === "string")
          val = val === "true";
      }
      let value = Array.isArray(val) ? val.map(function(v) {
        return maybeCoerceNumber(key, v);
      }) : maybeCoerceNumber(key, val);
      if (checkAllAliases(key, flags.counts) && (isUndefined(value) || typeof value === "boolean")) {
        value = increment();
      }
      if (checkAllAliases(key, flags.normalize) && checkAllAliases(key, flags.arrays)) {
        if (Array.isArray(val))
          value = val.map((val2) => {
            return mixin2.normalize(val2);
          });
        else
          value = mixin2.normalize(val);
      }
      return value;
    }
    function maybeCoerceNumber(key, value) {
      if (!configuration["parse-positional-numbers"] && key === "_")
        return value;
      if (!checkAllAliases(key, flags.strings) && !checkAllAliases(key, flags.bools) && !Array.isArray(value)) {
        const shouldCoerceNumber = looksLikeNumber(value) && configuration["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${value}`)));
        if (shouldCoerceNumber || !isUndefined(value) && checkAllAliases(key, flags.numbers)) {
          value = Number(value);
        }
      }
      return value;
    }
    function setConfig(argv2) {
      const configLookup = /* @__PURE__ */ Object.create(null);
      applyDefaultsAndAliases(configLookup, flags.aliases, defaults);
      Object.keys(flags.configs).forEach(function(configKey) {
        const configPath = argv2[configKey] || configLookup[configKey];
        if (configPath) {
          try {
            let config = null;
            const resolvedConfigPath = mixin2.resolve(mixin2.cwd(), configPath);
            const resolveConfig = flags.configs[configKey];
            if (typeof resolveConfig === "function") {
              try {
                config = resolveConfig(resolvedConfigPath);
              } catch (e) {
                config = e;
              }
              if (config instanceof Error) {
                error = config;
                return;
              }
            } else {
              config = mixin2.require(resolvedConfigPath);
            }
            setConfigObject(config);
          } catch (ex) {
            if (ex.name === "PermissionDenied")
              error = ex;
            else if (argv2[configKey])
              error = Error(__("Invalid JSON config file: %s", configPath));
          }
        }
      });
    }
    function setConfigObject(config, prev) {
      Object.keys(config).forEach(function(key) {
        const value = config[key];
        const fullKey = prev ? prev + "." + key : key;
        if (typeof value === "object" && value !== null && !Array.isArray(value) && configuration["dot-notation"]) {
          setConfigObject(value, fullKey);
        } else {
          if (!hasKey(argv, fullKey.split(".")) || checkAllAliases(fullKey, flags.arrays) && configuration["combine-arrays"]) {
            setArg(fullKey, value);
          }
        }
      });
    }
    function setConfigObjects() {
      if (typeof configObjects !== "undefined") {
        configObjects.forEach(function(configObject) {
          setConfigObject(configObject);
        });
      }
    }
    function applyEnvVars(argv2, configOnly) {
      if (typeof envPrefix === "undefined")
        return;
      const prefix = typeof envPrefix === "string" ? envPrefix : "";
      const env2 = mixin2.env();
      Object.keys(env2).forEach(function(envVar) {
        if (prefix === "" || envVar.lastIndexOf(prefix, 0) === 0) {
          const keys2 = envVar.split("__").map(function(key, i) {
            if (i === 0) {
              key = key.substring(prefix.length);
            }
            return camelCase(key);
          });
          if ((configOnly && flags.configs[keys2.join(".")] || !configOnly) && !hasKey(argv2, keys2)) {
            setArg(keys2.join("."), env2[envVar]);
          }
        }
      });
    }
    function applyCoercions(argv2) {
      let coerce;
      const applied = /* @__PURE__ */ new Set();
      Object.keys(argv2).forEach(function(key) {
        if (!applied.has(key)) {
          coerce = checkAllAliases(key, flags.coercions);
          if (typeof coerce === "function") {
            try {
              const value = maybeCoerceNumber(key, coerce(argv2[key]));
              [].concat(flags.aliases[key] || [], key).forEach((ali) => {
                applied.add(ali);
                argv2[ali] = value;
              });
            } catch (err) {
              error = err;
            }
          }
        }
      });
    }
    function setPlaceholderKeys(argv2) {
      flags.keys.forEach((key) => {
        if (~key.indexOf("."))
          return;
        if (typeof argv2[key] === "undefined")
          argv2[key] = void 0;
      });
      return argv2;
    }
    function applyDefaultsAndAliases(obj, aliases2, defaults2, canLog = false) {
      Object.keys(defaults2).forEach(function(key) {
        if (!hasKey(obj, key.split("."))) {
          setKey(obj, key.split("."), defaults2[key]);
          if (canLog)
            defaulted[key] = true;
          (aliases2[key] || []).forEach(function(x) {
            if (hasKey(obj, x.split(".")))
              return;
            setKey(obj, x.split("."), defaults2[key]);
          });
        }
      });
    }
    function hasKey(obj, keys2) {
      let o = obj;
      if (!configuration["dot-notation"])
        keys2 = [keys2.join(".")];
      keys2.slice(0, -1).forEach(function(key2) {
        o = o[key2] || {};
      });
      const key = keys2[keys2.length - 1];
      if (typeof o !== "object")
        return false;
      else
        return key in o;
    }
    function setKey(obj, keys2, value) {
      let o = obj;
      if (!configuration["dot-notation"])
        keys2 = [keys2.join(".")];
      keys2.slice(0, -1).forEach(function(key2) {
        key2 = sanitizeKey(key2);
        if (typeof o === "object" && o[key2] === void 0) {
          o[key2] = {};
        }
        if (typeof o[key2] !== "object" || Array.isArray(o[key2])) {
          if (Array.isArray(o[key2])) {
            o[key2].push({});
          } else {
            o[key2] = [o[key2], {}];
          }
          o = o[key2][o[key2].length - 1];
        } else {
          o = o[key2];
        }
      });
      const key = sanitizeKey(keys2[keys2.length - 1]);
      const isTypeArray = checkAllAliases(keys2.join("."), flags.arrays);
      const isValueArray = Array.isArray(value);
      let duplicate = configuration["duplicate-arguments-array"];
      if (!duplicate && checkAllAliases(key, flags.nargs)) {
        duplicate = true;
        if (!isUndefined(o[key]) && flags.nargs[key] === 1 || Array.isArray(o[key]) && o[key].length === flags.nargs[key]) {
          o[key] = void 0;
        }
      }
      if (value === increment()) {
        o[key] = increment(o[key]);
      } else if (Array.isArray(o[key])) {
        if (duplicate && isTypeArray && isValueArray) {
          o[key] = configuration["flatten-duplicate-arrays"] ? o[key].concat(value) : (Array.isArray(o[key][0]) ? o[key] : [o[key]]).concat([value]);
        } else if (!duplicate && Boolean(isTypeArray) === Boolean(isValueArray)) {
          o[key] = value;
        } else {
          o[key] = o[key].concat([value]);
        }
      } else if (o[key] === void 0 && isTypeArray) {
        o[key] = isValueArray ? value : [value];
      } else if (duplicate && !(o[key] === void 0 || checkAllAliases(key, flags.counts) || checkAllAliases(key, flags.bools))) {
        o[key] = [o[key], value];
      } else {
        o[key] = value;
      }
    }
    function extendAliases(...args2) {
      args2.forEach(function(obj) {
        Object.keys(obj || {}).forEach(function(key) {
          if (flags.aliases[key])
            return;
          flags.aliases[key] = [].concat(aliases[key] || []);
          flags.aliases[key].concat(key).forEach(function(x) {
            if (/-/.test(x) && configuration["camel-case-expansion"]) {
              const c = camelCase(x);
              if (c !== key && flags.aliases[key].indexOf(c) === -1) {
                flags.aliases[key].push(c);
                newAliases[c] = true;
              }
            }
          });
          flags.aliases[key].concat(key).forEach(function(x) {
            if (x.length > 1 && /[A-Z]/.test(x) && configuration["camel-case-expansion"]) {
              const c = decamelize(x, "-");
              if (c !== key && flags.aliases[key].indexOf(c) === -1) {
                flags.aliases[key].push(c);
                newAliases[c] = true;
              }
            }
          });
          flags.aliases[key].forEach(function(x) {
            flags.aliases[x] = [key].concat(flags.aliases[key].filter(function(y) {
              return x !== y;
            }));
          });
        });
      });
    }
    function checkAllAliases(key, flag) {
      const toCheck = [].concat(flags.aliases[key] || [], key);
      const keys2 = Object.keys(flag);
      const setAlias = toCheck.find((key2) => keys2.includes(key2));
      return setAlias ? flag[setAlias] : false;
    }
    function hasAnyFlag(key) {
      const flagsKeys = Object.keys(flags);
      const toCheck = [].concat(flagsKeys.map((k) => flags[k]));
      return toCheck.some(function(flag) {
        return Array.isArray(flag) ? flag.includes(key) : flag[key];
      });
    }
    function hasFlagsMatching(arg, ...patterns) {
      const toCheck = [].concat(...patterns);
      return toCheck.some(function(pattern) {
        const match = arg.match(pattern);
        return match && hasAnyFlag(match[1]);
      });
    }
    function hasAllShortFlags(arg) {
      if (arg.match(negative) || !arg.match(/^-[^-]+/)) {
        return false;
      }
      let hasAllFlags = true;
      let next;
      const letters = arg.slice(1).split("");
      for (let j = 0; j < letters.length; j++) {
        next = arg.slice(j + 2);
        if (!hasAnyFlag(letters[j])) {
          hasAllFlags = false;
          break;
        }
        if (letters[j + 1] && letters[j + 1] === "=" || next === "-" || /[A-Za-z]/.test(letters[j]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(next) || letters[j + 1] && letters[j + 1].match(/\W/)) {
          break;
        }
      }
      return hasAllFlags;
    }
    function isUnknownOptionAsArg(arg) {
      return configuration["unknown-options-as-args"] && isUnknownOption(arg);
    }
    function isUnknownOption(arg) {
      arg = arg.replace(/^-{3,}/, "--");
      if (arg.match(negative)) {
        return false;
      }
      if (hasAllShortFlags(arg)) {
        return false;
      }
      const flagWithEquals = /^-+([^=]+?)=[\s\S]*$/;
      const normalFlag = /^-+([^=]+?)$/;
      const flagEndingInHyphen = /^-+([^=]+?)-$/;
      const flagEndingInDigits = /^-+([^=]+?\d+)$/;
      const flagEndingInNonWordCharacters = /^-+([^=]+?)\W+.*$/;
      return !hasFlagsMatching(arg, flagWithEquals, negatedBoolean, normalFlag, flagEndingInHyphen, flagEndingInDigits, flagEndingInNonWordCharacters);
    }
    function defaultValue(key) {
      if (!checkAllAliases(key, flags.bools) && !checkAllAliases(key, flags.counts) && `${key}` in defaults) {
        return defaults[key];
      } else {
        return defaultForType(guessType2(key));
      }
    }
    function defaultForType(type) {
      const def = {
        [DefaultValuesForTypeKey.BOOLEAN]: true,
        [DefaultValuesForTypeKey.STRING]: "",
        [DefaultValuesForTypeKey.NUMBER]: void 0,
        [DefaultValuesForTypeKey.ARRAY]: []
      };
      return def[type];
    }
    function guessType2(key) {
      let type = DefaultValuesForTypeKey.BOOLEAN;
      if (checkAllAliases(key, flags.strings))
        type = DefaultValuesForTypeKey.STRING;
      else if (checkAllAliases(key, flags.numbers))
        type = DefaultValuesForTypeKey.NUMBER;
      else if (checkAllAliases(key, flags.bools))
        type = DefaultValuesForTypeKey.BOOLEAN;
      else if (checkAllAliases(key, flags.arrays))
        type = DefaultValuesForTypeKey.ARRAY;
      return type;
    }
    function isUndefined(num) {
      return num === void 0;
    }
    function checkConfiguration() {
      Object.keys(flags.counts).find((key) => {
        if (checkAllAliases(key, flags.arrays)) {
          error = Error(__("Invalid configuration: %s, opts.count excludes opts.array.", key));
          return true;
        } else if (checkAllAliases(key, flags.nargs)) {
          error = Error(__("Invalid configuration: %s, opts.count excludes opts.narg.", key));
          return true;
        }
        return false;
      });
    }
    return {
      aliases: Object.assign({}, flags.aliases),
      argv: Object.assign(argvReturn, argv),
      configuration,
      defaulted: Object.assign({}, defaulted),
      error,
      newAliases: Object.assign({}, newAliases)
    };
  }
};
function combineAliases(aliases) {
  const aliasArrays = [];
  const combined = /* @__PURE__ */ Object.create(null);
  let change = true;
  Object.keys(aliases).forEach(function(key) {
    aliasArrays.push([].concat(aliases[key], key));
  });
  while (change) {
    change = false;
    for (let i = 0; i < aliasArrays.length; i++) {
      for (let ii = i + 1; ii < aliasArrays.length; ii++) {
        const intersect = aliasArrays[i].filter(function(v) {
          return aliasArrays[ii].indexOf(v) !== -1;
        });
        if (intersect.length) {
          aliasArrays[i] = aliasArrays[i].concat(aliasArrays[ii]);
          aliasArrays.splice(ii, 1);
          change = true;
          break;
        }
      }
    }
  }
  aliasArrays.forEach(function(aliasArray) {
    aliasArray = aliasArray.filter(function(v, i, self) {
      return self.indexOf(v) === i;
    });
    const lastAlias = aliasArray.pop();
    if (lastAlias !== void 0 && typeof lastAlias === "string") {
      combined[lastAlias] = aliasArray;
    }
  });
  return combined;
}
function increment(orig) {
  return orig !== void 0 ? orig + 1 : 1;
}
function sanitizeKey(key) {
  if (key === "__proto__")
    return "___proto___";
  return key;
}
function stripQuotes(val) {
  return typeof val === "string" && (val[0] === "'" || val[0] === '"') && val[val.length - 1] === val[0] ? val.substring(1, val.length - 1) : val;
}

// node_modules/yargs-parser/build/lib/index.js
var import_fs2 = require("fs");
var minNodeVersion = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12;
if (process && process.version) {
  const major = Number(process.version.match(/v([^.]+)/)[1]);
  if (major < minNodeVersion) {
    throw Error(`yargs parser supports a minimum Node.js version of ${minNodeVersion}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
  }
}
var env = process ? process.env : {};
var parser = new YargsParser({
  cwd: process.cwd,
  env: () => {
    return env;
  },
  format: import_util.format,
  normalize: import_path2.normalize,
  resolve: import_path2.resolve,
  require: (path) => {
    if (typeof require !== "undefined") {
      return require(path);
    } else if (path.match(/\.json$/)) {
      return JSON.parse((0, import_fs2.readFileSync)(path, "utf8"));
    } else {
      throw Error("only .json config files are supported in ESM");
    }
  }
});
var yargsParser = function Parser(args, opts) {
  const result = parser.parse(args.slice(), opts);
  return result.argv;
};
yargsParser.detailed = function(args, opts) {
  return parser.parse(args.slice(), opts);
};
yargsParser.camelCase = camelCase;
yargsParser.decamelize = decamelize;
yargsParser.looksLikeNumber = looksLikeNumber;
var lib_default = yargsParser;

// node_modules/yargs/lib/platform-shims/esm.mjs
var import_path4 = require("path");

// node_modules/yargs/build/lib/utils/process-argv.js
function getProcessArgvBinIndex() {
  if (isBundledElectronApp())
    return 0;
  return 1;
}
function isBundledElectronApp() {
  return isElectronApp() && !process.defaultApp;
}
function isElectronApp() {
  return !!process.versions.electron;
}
function getProcessArgvBin() {
  return process.argv[getProcessArgvBinIndex()];
}

// node_modules/yargs/build/lib/yerror.js
var YError = class extends Error {
  constructor(msg) {
    super(msg || "yargs error");
    this.name = "YError";
    Error.captureStackTrace(this, YError);
  }
};

// node_modules/y18n/build/lib/platform-shims/node.js
var import_fs3 = require("fs");
var import_util2 = require("util");
var import_path3 = require("path");
var node_default = {
  fs: {
    readFileSync: import_fs3.readFileSync,
    writeFile: import_fs3.writeFile
  },
  format: import_util2.format,
  resolve: import_path3.resolve,
  exists: (file) => {
    try {
      return (0, import_fs3.statSync)(file).isFile();
    } catch (err) {
      return false;
    }
  }
};

// node_modules/y18n/build/lib/index.js
var shim;
var Y18N = class {
  constructor(opts) {
    opts = opts || {};
    this.directory = opts.directory || "./locales";
    this.updateFiles = typeof opts.updateFiles === "boolean" ? opts.updateFiles : true;
    this.locale = opts.locale || "en";
    this.fallbackToLanguage = typeof opts.fallbackToLanguage === "boolean" ? opts.fallbackToLanguage : true;
    this.cache = /* @__PURE__ */ Object.create(null);
    this.writeQueue = [];
  }
  __(...args) {
    if (typeof arguments[0] !== "string") {
      return this._taggedLiteral(arguments[0], ...arguments);
    }
    const str = args.shift();
    let cb = function() {
    };
    if (typeof args[args.length - 1] === "function")
      cb = args.pop();
    cb = cb || function() {
    };
    if (!this.cache[this.locale])
      this._readLocaleFile();
    if (!this.cache[this.locale][str] && this.updateFiles) {
      this.cache[this.locale][str] = str;
      this._enqueueWrite({
        directory: this.directory,
        locale: this.locale,
        cb
      });
    } else {
      cb();
    }
    return shim.format.apply(shim.format, [this.cache[this.locale][str] || str].concat(args));
  }
  __n() {
    const args = Array.prototype.slice.call(arguments);
    const singular = args.shift();
    const plural = args.shift();
    const quantity = args.shift();
    let cb = function() {
    };
    if (typeof args[args.length - 1] === "function")
      cb = args.pop();
    if (!this.cache[this.locale])
      this._readLocaleFile();
    let str = quantity === 1 ? singular : plural;
    if (this.cache[this.locale][singular]) {
      const entry = this.cache[this.locale][singular];
      str = entry[quantity === 1 ? "one" : "other"];
    }
    if (!this.cache[this.locale][singular] && this.updateFiles) {
      this.cache[this.locale][singular] = {
        one: singular,
        other: plural
      };
      this._enqueueWrite({
        directory: this.directory,
        locale: this.locale,
        cb
      });
    } else {
      cb();
    }
    const values2 = [str];
    if (~str.indexOf("%d"))
      values2.push(quantity);
    return shim.format.apply(shim.format, values2.concat(args));
  }
  setLocale(locale) {
    this.locale = locale;
  }
  getLocale() {
    return this.locale;
  }
  updateLocale(obj) {
    if (!this.cache[this.locale])
      this._readLocaleFile();
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        this.cache[this.locale][key] = obj[key];
      }
    }
  }
  _taggedLiteral(parts, ...args) {
    let str = "";
    parts.forEach(function(part, i) {
      const arg = args[i + 1];
      str += part;
      if (typeof arg !== "undefined") {
        str += "%s";
      }
    });
    return this.__.apply(this, [str].concat([].slice.call(args, 1)));
  }
  _enqueueWrite(work) {
    this.writeQueue.push(work);
    if (this.writeQueue.length === 1)
      this._processWriteQueue();
  }
  _processWriteQueue() {
    const _this = this;
    const work = this.writeQueue[0];
    const directory = work.directory;
    const locale = work.locale;
    const cb = work.cb;
    const languageFile = this._resolveLocaleFile(directory, locale);
    const serializedLocale = JSON.stringify(this.cache[locale], null, 2);
    shim.fs.writeFile(languageFile, serializedLocale, "utf-8", function(err) {
      _this.writeQueue.shift();
      if (_this.writeQueue.length > 0)
        _this._processWriteQueue();
      cb(err);
    });
  }
  _readLocaleFile() {
    let localeLookup = {};
    const languageFile = this._resolveLocaleFile(this.directory, this.locale);
    try {
      if (shim.fs.readFileSync) {
        localeLookup = JSON.parse(shim.fs.readFileSync(languageFile, "utf-8"));
      }
    } catch (err) {
      if (err instanceof SyntaxError) {
        err.message = "syntax error in " + languageFile;
      }
      if (err.code === "ENOENT")
        localeLookup = {};
      else
        throw err;
    }
    this.cache[this.locale] = localeLookup;
  }
  _resolveLocaleFile(directory, locale) {
    let file = shim.resolve(directory, "./", locale + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(file) && ~locale.lastIndexOf("_")) {
      const languageFile = shim.resolve(directory, "./", locale.split("_")[0] + ".json");
      if (this._fileExistsSync(languageFile))
        file = languageFile;
    }
    return file;
  }
  _fileExistsSync(file) {
    return shim.exists(file);
  }
};
function y18n(opts, _shim) {
  shim = _shim;
  const y18n3 = new Y18N(opts);
  return {
    __: y18n3.__.bind(y18n3),
    __n: y18n3.__n.bind(y18n3),
    setLocale: y18n3.setLocale.bind(y18n3),
    getLocale: y18n3.getLocale.bind(y18n3),
    updateLocale: y18n3.updateLocale.bind(y18n3),
    locale: y18n3.locale
  };
}

// node_modules/y18n/index.mjs
var y18n2 = (opts) => {
  return y18n(opts, node_default);
};
var y18n_default = y18n2;

// node_modules/yargs/lib/platform-shims/esm.mjs
var import_meta = {};
var REQUIRE_ERROR = "require is not supported by ESM";
var REQUIRE_DIRECTORY_ERROR = "loading a directory of commands is not supported yet for ESM";
var __dirname;
try {
  __dirname = (0, import_url.fileURLToPath)(import_meta.url);
} catch (e) {
  __dirname = process.cwd();
}
var mainFilename = __dirname.split("node_modules")[0];
var esm_default = {
  assert: {
    notStrictEqual: import_assert.notStrictEqual,
    strictEqual: import_assert.strictEqual
  },
  cliui: ui,
  findUp: sync_default,
  getEnv: (key) => {
    return process.env[key];
  },
  inspect: import_util3.inspect,
  getCallerFile: () => {
    throw new YError(REQUIRE_DIRECTORY_ERROR);
  },
  getProcessArgvBin,
  mainFilename: mainFilename || process.cwd(),
  Parser: lib_default,
  path: {
    basename: import_path4.basename,
    dirname: import_path4.dirname,
    extname: import_path4.extname,
    relative: import_path4.relative,
    resolve: import_path4.resolve
  },
  process: {
    argv: () => process.argv,
    cwd: process.cwd,
    emitWarning: (warning, type) => process.emitWarning(warning, type),
    execPath: () => process.execPath,
    exit: process.exit,
    nextTick: process.nextTick,
    stdColumns: typeof process.stdout.columns !== "undefined" ? process.stdout.columns : null
  },
  readFileSync: import_fs4.readFileSync,
  require: () => {
    throw new YError(REQUIRE_ERROR);
  },
  requireDirectory: () => {
    throw new YError(REQUIRE_DIRECTORY_ERROR);
  },
  stringWidth: (str) => {
    return [...str].length;
  },
  y18n: y18n_default({
    directory: (0, import_path4.resolve)(__dirname, "../../../locales"),
    updateFiles: false
  })
};

// node_modules/yargs/build/lib/typings/common-types.js
function assertNotStrictEqual(actual, expected, shim3, message) {
  shim3.assert.notStrictEqual(actual, expected, message);
}
function assertSingleKey(actual, shim3) {
  shim3.assert.strictEqual(typeof actual, "string");
}
function objectKeys(object) {
  return Object.keys(object);
}

// node_modules/yargs/build/lib/utils/is-promise.js
function isPromise(maybePromise) {
  return !!maybePromise && !!maybePromise.then && typeof maybePromise.then === "function";
}

// node_modules/yargs/build/lib/parse-command.js
function parseCommand(cmd) {
  const extraSpacesStrippedCommand = cmd.replace(/\s{2,}/g, " ");
  const splitCommand = extraSpacesStrippedCommand.split(/\s+(?![^[]*]|[^<]*>)/);
  const bregex = /\.*[\][<>]/g;
  const firstCommand = splitCommand.shift();
  if (!firstCommand)
    throw new Error(`No command found in: ${cmd}`);
  const parsedCommand = {
    cmd: firstCommand.replace(bregex, ""),
    demanded: [],
    optional: []
  };
  splitCommand.forEach((cmd2, i) => {
    let variadic = false;
    cmd2 = cmd2.replace(/\s/g, "");
    if (/\.+[\]>]/.test(cmd2) && i === splitCommand.length - 1)
      variadic = true;
    if (/^\[/.test(cmd2)) {
      parsedCommand.optional.push({
        cmd: cmd2.replace(bregex, "").split("|"),
        variadic
      });
    } else {
      parsedCommand.demanded.push({
        cmd: cmd2.replace(bregex, "").split("|"),
        variadic
      });
    }
  });
  return parsedCommand;
}

// node_modules/yargs/build/lib/argsert.js
var positionName = ["first", "second", "third", "fourth", "fifth", "sixth"];
function argsert(arg1, arg2, arg3) {
  function parseArgs() {
    return typeof arg1 === "object" ? [{ demanded: [], optional: [] }, arg1, arg2] : [
      parseCommand(`cmd ${arg1}`),
      arg2,
      arg3
    ];
  }
  try {
    let position = 0;
    const [parsed, callerArguments, _length] = parseArgs();
    const args = [].slice.call(callerArguments);
    while (args.length && args[args.length - 1] === void 0)
      args.pop();
    const length = _length || args.length;
    if (length < parsed.demanded.length) {
      throw new YError(`Not enough arguments provided. Expected ${parsed.demanded.length} but received ${args.length}.`);
    }
    const totalCommands = parsed.demanded.length + parsed.optional.length;
    if (length > totalCommands) {
      throw new YError(`Too many arguments provided. Expected max ${totalCommands} but received ${length}.`);
    }
    parsed.demanded.forEach((demanded) => {
      const arg = args.shift();
      const observedType = guessType(arg);
      const matchingTypes = demanded.cmd.filter((type) => type === observedType || type === "*");
      if (matchingTypes.length === 0)
        argumentTypeError(observedType, demanded.cmd, position);
      position += 1;
    });
    parsed.optional.forEach((optional) => {
      if (args.length === 0)
        return;
      const arg = args.shift();
      const observedType = guessType(arg);
      const matchingTypes = optional.cmd.filter((type) => type === observedType || type === "*");
      if (matchingTypes.length === 0)
        argumentTypeError(observedType, optional.cmd, position);
      position += 1;
    });
  } catch (err) {
    console.warn(err.stack);
  }
}
function guessType(arg) {
  if (Array.isArray(arg)) {
    return "array";
  } else if (arg === null) {
    return "null";
  }
  return typeof arg;
}
function argumentTypeError(observedType, allowedTypes, position) {
  throw new YError(`Invalid ${positionName[position] || "manyith"} argument. Expected ${allowedTypes.join(" or ")} but received ${observedType}.`);
}

// node_modules/yargs/build/lib/middleware.js
var GlobalMiddleware = class {
  constructor(yargs) {
    this.globalMiddleware = [];
    this.frozens = [];
    this.yargs = yargs;
  }
  addMiddleware(callback, applyBeforeValidation, global = true, mutates = false) {
    argsert("<array|function> [boolean] [boolean] [boolean]", [callback, applyBeforeValidation, global], arguments.length);
    if (Array.isArray(callback)) {
      for (let i = 0; i < callback.length; i++) {
        if (typeof callback[i] !== "function") {
          throw Error("middleware must be a function");
        }
        const m = callback[i];
        m.applyBeforeValidation = applyBeforeValidation;
        m.global = global;
      }
      Array.prototype.push.apply(this.globalMiddleware, callback);
    } else if (typeof callback === "function") {
      const m = callback;
      m.applyBeforeValidation = applyBeforeValidation;
      m.global = global;
      m.mutates = mutates;
      this.globalMiddleware.push(callback);
    }
    return this.yargs;
  }
  addCoerceMiddleware(callback, option) {
    const aliases = this.yargs.getAliases();
    this.globalMiddleware = this.globalMiddleware.filter((m) => {
      const toCheck = [...aliases[option] || [], option];
      if (!m.option)
        return true;
      else
        return !toCheck.includes(m.option);
    });
    callback.option = option;
    return this.addMiddleware(callback, true, true, true);
  }
  getMiddleware() {
    return this.globalMiddleware;
  }
  freeze() {
    this.frozens.push([...this.globalMiddleware]);
  }
  unfreeze() {
    const frozen = this.frozens.pop();
    if (frozen !== void 0)
      this.globalMiddleware = frozen;
  }
  reset() {
    this.globalMiddleware = this.globalMiddleware.filter((m) => m.global);
  }
};
function commandMiddlewareFactory(commandMiddleware) {
  if (!commandMiddleware)
    return [];
  return commandMiddleware.map((middleware) => {
    middleware.applyBeforeValidation = false;
    return middleware;
  });
}
function applyMiddleware(argv, yargs, middlewares, beforeValidation) {
  return middlewares.reduce((acc, middleware) => {
    if (middleware.applyBeforeValidation !== beforeValidation) {
      return acc;
    }
    if (middleware.mutates) {
      if (middleware.applied)
        return acc;
      middleware.applied = true;
    }
    if (isPromise(acc)) {
      return acc.then((initialObj) => Promise.all([initialObj, middleware(initialObj, yargs)])).then(([initialObj, middlewareObj]) => Object.assign(initialObj, middlewareObj));
    } else {
      const result = middleware(acc, yargs);
      return isPromise(result) ? result.then((middlewareObj) => Object.assign(acc, middlewareObj)) : Object.assign(acc, result);
    }
  }, argv);
}

// node_modules/yargs/build/lib/utils/maybe-async-result.js
function maybeAsyncResult(getResult, resultHandler, errorHandler = (err) => {
  throw err;
}) {
  try {
    const result = isFunction(getResult) ? getResult() : getResult;
    return isPromise(result) ? result.then((result2) => resultHandler(result2)) : resultHandler(result);
  } catch (err) {
    return errorHandler(err);
  }
}
function isFunction(arg) {
  return typeof arg === "function";
}

// node_modules/yargs/build/lib/utils/which-module.js
function whichModule(exported) {
  if (typeof require === "undefined")
    return null;
  for (let i = 0, files = Object.keys(require.cache), mod; i < files.length; i++) {
    mod = require.cache[files[i]];
    if (mod.exports === exported)
      return mod;
  }
  return null;
}

// node_modules/yargs/build/lib/command.js
var DEFAULT_MARKER = /(^\*)|(^\$0)/;
var CommandInstance = class {
  constructor(usage2, validation2, globalMiddleware, shim3) {
    this.requireCache = /* @__PURE__ */ new Set();
    this.handlers = {};
    this.aliasMap = {};
    this.frozens = [];
    this.shim = shim3;
    this.usage = usage2;
    this.globalMiddleware = globalMiddleware;
    this.validation = validation2;
  }
  addDirectory(dir, req, callerFile, opts) {
    opts = opts || {};
    if (typeof opts.recurse !== "boolean")
      opts.recurse = false;
    if (!Array.isArray(opts.extensions))
      opts.extensions = ["js"];
    const parentVisit = typeof opts.visit === "function" ? opts.visit : (o) => o;
    opts.visit = (obj, joined, filename) => {
      const visited = parentVisit(obj, joined, filename);
      if (visited) {
        if (this.requireCache.has(joined))
          return visited;
        else
          this.requireCache.add(joined);
        this.addHandler(visited);
      }
      return visited;
    };
    this.shim.requireDirectory({ require: req, filename: callerFile }, dir, opts);
  }
  addHandler(cmd, description, builder, handler, commandMiddleware, deprecated) {
    let aliases = [];
    const middlewares = commandMiddlewareFactory(commandMiddleware);
    handler = handler || (() => {
    });
    if (Array.isArray(cmd)) {
      if (isCommandAndAliases(cmd)) {
        [cmd, ...aliases] = cmd;
      } else {
        for (const command2 of cmd) {
          this.addHandler(command2);
        }
      }
    } else if (isCommandHandlerDefinition(cmd)) {
      let command2 = Array.isArray(cmd.command) || typeof cmd.command === "string" ? cmd.command : this.moduleName(cmd);
      if (cmd.aliases)
        command2 = [].concat(command2).concat(cmd.aliases);
      this.addHandler(command2, this.extractDesc(cmd), cmd.builder, cmd.handler, cmd.middlewares, cmd.deprecated);
      return;
    } else if (isCommandBuilderDefinition(builder)) {
      this.addHandler([cmd].concat(aliases), description, builder.builder, builder.handler, builder.middlewares, builder.deprecated);
      return;
    }
    if (typeof cmd === "string") {
      const parsedCommand = parseCommand(cmd);
      aliases = aliases.map((alias) => parseCommand(alias).cmd);
      let isDefault = false;
      const parsedAliases = [parsedCommand.cmd].concat(aliases).filter((c) => {
        if (DEFAULT_MARKER.test(c)) {
          isDefault = true;
          return false;
        }
        return true;
      });
      if (parsedAliases.length === 0 && isDefault)
        parsedAliases.push("$0");
      if (isDefault) {
        parsedCommand.cmd = parsedAliases[0];
        aliases = parsedAliases.slice(1);
        cmd = cmd.replace(DEFAULT_MARKER, parsedCommand.cmd);
      }
      aliases.forEach((alias) => {
        this.aliasMap[alias] = parsedCommand.cmd;
      });
      if (description !== false) {
        this.usage.command(cmd, description, isDefault, aliases, deprecated);
      }
      this.handlers[parsedCommand.cmd] = {
        original: cmd,
        description,
        handler,
        builder: builder || {},
        middlewares,
        deprecated,
        demanded: parsedCommand.demanded,
        optional: parsedCommand.optional
      };
      if (isDefault)
        this.defaultCommand = this.handlers[parsedCommand.cmd];
    }
  }
  getCommandHandlers() {
    return this.handlers;
  }
  getCommands() {
    return Object.keys(this.handlers).concat(Object.keys(this.aliasMap));
  }
  hasDefaultCommand() {
    return !!this.defaultCommand;
  }
  runCommand(command2, yargs, parsed, commandIndex, helpOnly, helpOrVersionSet) {
    const commandHandler = this.handlers[command2] || this.handlers[this.aliasMap[command2]] || this.defaultCommand;
    const currentContext = yargs.getInternalMethods().getContext();
    const parentCommands = currentContext.commands.slice();
    const isDefaultCommand = !command2;
    if (command2) {
      currentContext.commands.push(command2);
      currentContext.fullCommands.push(commandHandler.original);
    }
    const builderResult = this.applyBuilderUpdateUsageAndParse(isDefaultCommand, commandHandler, yargs, parsed.aliases, parentCommands, commandIndex, helpOnly, helpOrVersionSet);
    return isPromise(builderResult) ? builderResult.then((result) => this.applyMiddlewareAndGetResult(isDefaultCommand, commandHandler, result.innerArgv, currentContext, helpOnly, result.aliases, yargs)) : this.applyMiddlewareAndGetResult(isDefaultCommand, commandHandler, builderResult.innerArgv, currentContext, helpOnly, builderResult.aliases, yargs);
  }
  applyBuilderUpdateUsageAndParse(isDefaultCommand, commandHandler, yargs, aliases, parentCommands, commandIndex, helpOnly, helpOrVersionSet) {
    const builder = commandHandler.builder;
    let innerYargs = yargs;
    if (isCommandBuilderCallback(builder)) {
      const builderOutput = builder(yargs.getInternalMethods().reset(aliases), helpOrVersionSet);
      if (isPromise(builderOutput)) {
        return builderOutput.then((output) => {
          innerYargs = isYargsInstance(output) ? output : yargs;
          return this.parseAndUpdateUsage(isDefaultCommand, commandHandler, innerYargs, parentCommands, commandIndex, helpOnly);
        });
      }
    } else if (isCommandBuilderOptionDefinitions(builder)) {
      innerYargs = yargs.getInternalMethods().reset(aliases);
      Object.keys(commandHandler.builder).forEach((key) => {
        innerYargs.option(key, builder[key]);
      });
    }
    return this.parseAndUpdateUsage(isDefaultCommand, commandHandler, innerYargs, parentCommands, commandIndex, helpOnly);
  }
  parseAndUpdateUsage(isDefaultCommand, commandHandler, innerYargs, parentCommands, commandIndex, helpOnly) {
    if (isDefaultCommand)
      innerYargs.getInternalMethods().getUsageInstance().unfreeze();
    if (this.shouldUpdateUsage(innerYargs)) {
      innerYargs.getInternalMethods().getUsageInstance().usage(this.usageFromParentCommandsCommandHandler(parentCommands, commandHandler), commandHandler.description);
    }
    const innerArgv = innerYargs.getInternalMethods().runYargsParserAndExecuteCommands(null, void 0, true, commandIndex, helpOnly);
    return isPromise(innerArgv) ? innerArgv.then((argv) => ({
      aliases: innerYargs.parsed.aliases,
      innerArgv: argv
    })) : {
      aliases: innerYargs.parsed.aliases,
      innerArgv
    };
  }
  shouldUpdateUsage(yargs) {
    return !yargs.getInternalMethods().getUsageInstance().getUsageDisabled() && yargs.getInternalMethods().getUsageInstance().getUsage().length === 0;
  }
  usageFromParentCommandsCommandHandler(parentCommands, commandHandler) {
    const c = DEFAULT_MARKER.test(commandHandler.original) ? commandHandler.original.replace(DEFAULT_MARKER, "").trim() : commandHandler.original;
    const pc = parentCommands.filter((c2) => {
      return !DEFAULT_MARKER.test(c2);
    });
    pc.push(c);
    return `$0 ${pc.join(" ")}`;
  }
  applyMiddlewareAndGetResult(isDefaultCommand, commandHandler, innerArgv, currentContext, helpOnly, aliases, yargs) {
    let positionalMap = {};
    if (helpOnly)
      return innerArgv;
    if (!yargs.getInternalMethods().getHasOutput()) {
      positionalMap = this.populatePositionals(commandHandler, innerArgv, currentContext, yargs);
    }
    const middlewares = this.globalMiddleware.getMiddleware().slice(0).concat(commandHandler.middlewares);
    innerArgv = applyMiddleware(innerArgv, yargs, middlewares, true);
    if (!yargs.getInternalMethods().getHasOutput()) {
      const validation2 = yargs.getInternalMethods().runValidation(aliases, positionalMap, yargs.parsed.error, isDefaultCommand);
      innerArgv = maybeAsyncResult(innerArgv, (result) => {
        validation2(result);
        return result;
      });
    }
    if (commandHandler.handler && !yargs.getInternalMethods().getHasOutput()) {
      yargs.getInternalMethods().setHasOutput();
      const populateDoubleDash = !!yargs.getOptions().configuration["populate--"];
      yargs.getInternalMethods().postProcess(innerArgv, populateDoubleDash, false, false);
      innerArgv = applyMiddleware(innerArgv, yargs, middlewares, false);
      innerArgv = maybeAsyncResult(innerArgv, (result) => {
        const handlerResult = commandHandler.handler(result);
        return isPromise(handlerResult) ? handlerResult.then(() => result) : result;
      });
      if (!isDefaultCommand) {
        yargs.getInternalMethods().getUsageInstance().cacheHelpMessage();
      }
      if (isPromise(innerArgv) && !yargs.getInternalMethods().hasParseCallback()) {
        innerArgv.catch((error) => {
          try {
            yargs.getInternalMethods().getUsageInstance().fail(null, error);
          } catch (_err) {
          }
        });
      }
    }
    if (!isDefaultCommand) {
      currentContext.commands.pop();
      currentContext.fullCommands.pop();
    }
    return innerArgv;
  }
  populatePositionals(commandHandler, argv, context, yargs) {
    argv._ = argv._.slice(context.commands.length);
    const demanded = commandHandler.demanded.slice(0);
    const optional = commandHandler.optional.slice(0);
    const positionalMap = {};
    this.validation.positionalCount(demanded.length, argv._.length);
    while (demanded.length) {
      const demand = demanded.shift();
      this.populatePositional(demand, argv, positionalMap);
    }
    while (optional.length) {
      const maybe = optional.shift();
      this.populatePositional(maybe, argv, positionalMap);
    }
    argv._ = context.commands.concat(argv._.map((a) => "" + a));
    this.postProcessPositionals(argv, positionalMap, this.cmdToParseOptions(commandHandler.original), yargs);
    return positionalMap;
  }
  populatePositional(positional, argv, positionalMap) {
    const cmd = positional.cmd[0];
    if (positional.variadic) {
      positionalMap[cmd] = argv._.splice(0).map(String);
    } else {
      if (argv._.length)
        positionalMap[cmd] = [String(argv._.shift())];
    }
  }
  cmdToParseOptions(cmdString) {
    const parseOptions = {
      array: [],
      default: {},
      alias: {},
      demand: {}
    };
    const parsed = parseCommand(cmdString);
    parsed.demanded.forEach((d) => {
      const [cmd, ...aliases] = d.cmd;
      if (d.variadic) {
        parseOptions.array.push(cmd);
        parseOptions.default[cmd] = [];
      }
      parseOptions.alias[cmd] = aliases;
      parseOptions.demand[cmd] = true;
    });
    parsed.optional.forEach((o) => {
      const [cmd, ...aliases] = o.cmd;
      if (o.variadic) {
        parseOptions.array.push(cmd);
        parseOptions.default[cmd] = [];
      }
      parseOptions.alias[cmd] = aliases;
    });
    return parseOptions;
  }
  postProcessPositionals(argv, positionalMap, parseOptions, yargs) {
    const options = Object.assign({}, yargs.getOptions());
    options.default = Object.assign(parseOptions.default, options.default);
    for (const key of Object.keys(parseOptions.alias)) {
      options.alias[key] = (options.alias[key] || []).concat(parseOptions.alias[key]);
    }
    options.array = options.array.concat(parseOptions.array);
    options.config = {};
    const unparsed = [];
    Object.keys(positionalMap).forEach((key) => {
      positionalMap[key].map((value) => {
        if (options.configuration["unknown-options-as-args"])
          options.key[key] = true;
        unparsed.push(`--${key}`);
        unparsed.push(value);
      });
    });
    if (!unparsed.length)
      return;
    const config = Object.assign({}, options.configuration, {
      "populate--": false
    });
    const parsed = this.shim.Parser.detailed(unparsed, Object.assign({}, options, {
      configuration: config
    }));
    if (parsed.error) {
      yargs.getInternalMethods().getUsageInstance().fail(parsed.error.message, parsed.error);
    } else {
      const positionalKeys = Object.keys(positionalMap);
      Object.keys(positionalMap).forEach((key) => {
        positionalKeys.push(...parsed.aliases[key]);
      });
      const defaults = yargs.getOptions().default;
      Object.keys(parsed.argv).forEach((key) => {
        if (positionalKeys.includes(key)) {
          if (!positionalMap[key])
            positionalMap[key] = parsed.argv[key];
          if (!Object.prototype.hasOwnProperty.call(defaults, key) && Object.prototype.hasOwnProperty.call(argv, key) && Object.prototype.hasOwnProperty.call(parsed.argv, key) && (Array.isArray(argv[key]) || Array.isArray(parsed.argv[key]))) {
            argv[key] = [].concat(argv[key], parsed.argv[key]);
          } else {
            argv[key] = parsed.argv[key];
          }
        }
      });
    }
  }
  runDefaultBuilderOn(yargs) {
    if (!this.defaultCommand)
      return;
    if (this.shouldUpdateUsage(yargs)) {
      const commandString = DEFAULT_MARKER.test(this.defaultCommand.original) ? this.defaultCommand.original : this.defaultCommand.original.replace(/^[^[\]<>]*/, "$0 ");
      yargs.getInternalMethods().getUsageInstance().usage(commandString, this.defaultCommand.description);
    }
    const builder = this.defaultCommand.builder;
    if (isCommandBuilderCallback(builder)) {
      return builder(yargs, true);
    } else if (!isCommandBuilderDefinition(builder)) {
      Object.keys(builder).forEach((key) => {
        yargs.option(key, builder[key]);
      });
    }
    return void 0;
  }
  moduleName(obj) {
    const mod = whichModule(obj);
    if (!mod)
      throw new Error(`No command name given for module: ${this.shim.inspect(obj)}`);
    return this.commandFromFilename(mod.filename);
  }
  commandFromFilename(filename) {
    return this.shim.path.basename(filename, this.shim.path.extname(filename));
  }
  extractDesc({ describe, description, desc }) {
    for (const test of [describe, description, desc]) {
      if (typeof test === "string" || test === false)
        return test;
      assertNotStrictEqual(test, true, this.shim);
    }
    return false;
  }
  freeze() {
    this.frozens.push({
      handlers: this.handlers,
      aliasMap: this.aliasMap,
      defaultCommand: this.defaultCommand
    });
  }
  unfreeze() {
    const frozen = this.frozens.pop();
    assertNotStrictEqual(frozen, void 0, this.shim);
    ({
      handlers: this.handlers,
      aliasMap: this.aliasMap,
      defaultCommand: this.defaultCommand
    } = frozen);
  }
  reset() {
    this.handlers = {};
    this.aliasMap = {};
    this.defaultCommand = void 0;
    this.requireCache = /* @__PURE__ */ new Set();
    return this;
  }
};
function command(usage2, validation2, globalMiddleware, shim3) {
  return new CommandInstance(usage2, validation2, globalMiddleware, shim3);
}
function isCommandBuilderDefinition(builder) {
  return typeof builder === "object" && !!builder.builder && typeof builder.handler === "function";
}
function isCommandAndAliases(cmd) {
  return cmd.every((c) => typeof c === "string");
}
function isCommandBuilderCallback(builder) {
  return typeof builder === "function";
}
function isCommandBuilderOptionDefinitions(builder) {
  return typeof builder === "object";
}
function isCommandHandlerDefinition(cmd) {
  return typeof cmd === "object" && !Array.isArray(cmd);
}

// node_modules/yargs/build/lib/utils/obj-filter.js
function objFilter(original = {}, filter = () => true) {
  const obj = {};
  objectKeys(original).forEach((key) => {
    if (filter(key, original[key])) {
      obj[key] = original[key];
    }
  });
  return obj;
}

// node_modules/yargs/build/lib/utils/set-blocking.js
function setBlocking(blocking) {
  if (typeof process === "undefined")
    return;
  [process.stdout, process.stderr].forEach((_stream) => {
    const stream = _stream;
    if (stream._handle && stream.isTTY && typeof stream._handle.setBlocking === "function") {
      stream._handle.setBlocking(blocking);
    }
  });
}

// node_modules/yargs/build/lib/usage.js
function isBoolean(fail) {
  return typeof fail === "boolean";
}
function usage(yargs, shim3) {
  const __ = shim3.y18n.__;
  const self = {};
  const fails = [];
  self.failFn = function failFn(f) {
    fails.push(f);
  };
  let failMessage = null;
  let showHelpOnFail = true;
  self.showHelpOnFail = function showHelpOnFailFn(arg1 = true, arg2) {
    function parseFunctionArgs() {
      return typeof arg1 === "string" ? [true, arg1] : [arg1, arg2];
    }
    const [enabled, message] = parseFunctionArgs();
    failMessage = message;
    showHelpOnFail = enabled;
    return self;
  };
  let failureOutput = false;
  self.fail = function fail(msg, err) {
    const logger = yargs.getInternalMethods().getLoggerInstance();
    if (fails.length) {
      for (let i = fails.length - 1; i >= 0; --i) {
        const fail2 = fails[i];
        if (isBoolean(fail2)) {
          if (err)
            throw err;
          else if (msg)
            throw Error(msg);
        } else {
          fail2(msg, err, self);
        }
      }
    } else {
      if (yargs.getExitProcess())
        setBlocking(true);
      if (!failureOutput) {
        failureOutput = true;
        if (showHelpOnFail) {
          yargs.showHelp("error");
          logger.error();
        }
        if (msg || err)
          logger.error(msg || err);
        if (failMessage) {
          if (msg || err)
            logger.error("");
          logger.error(failMessage);
        }
      }
      err = err || new YError(msg);
      if (yargs.getExitProcess()) {
        return yargs.exit(1);
      } else if (yargs.getInternalMethods().hasParseCallback()) {
        return yargs.exit(1, err);
      } else {
        throw err;
      }
    }
  };
  let usages = [];
  let usageDisabled = false;
  self.usage = (msg, description) => {
    if (msg === null) {
      usageDisabled = true;
      usages = [];
      return self;
    }
    usageDisabled = false;
    usages.push([msg, description || ""]);
    return self;
  };
  self.getUsage = () => {
    return usages;
  };
  self.getUsageDisabled = () => {
    return usageDisabled;
  };
  self.getPositionalGroupName = () => {
    return __("Positionals:");
  };
  let examples = [];
  self.example = (cmd, description) => {
    examples.push([cmd, description || ""]);
  };
  let commands = [];
  self.command = function command2(cmd, description, isDefault, aliases, deprecated = false) {
    if (isDefault) {
      commands = commands.map((cmdArray) => {
        cmdArray[2] = false;
        return cmdArray;
      });
    }
    commands.push([cmd, description || "", isDefault, aliases, deprecated]);
  };
  self.getCommands = () => commands;
  let descriptions = {};
  self.describe = function describe(keyOrKeys, desc) {
    if (Array.isArray(keyOrKeys)) {
      keyOrKeys.forEach((k) => {
        self.describe(k, desc);
      });
    } else if (typeof keyOrKeys === "object") {
      Object.keys(keyOrKeys).forEach((k) => {
        self.describe(k, keyOrKeys[k]);
      });
    } else {
      descriptions[keyOrKeys] = desc;
    }
  };
  self.getDescriptions = () => descriptions;
  let epilogs = [];
  self.epilog = (msg) => {
    epilogs.push(msg);
  };
  let wrapSet = false;
  let wrap2;
  self.wrap = (cols) => {
    wrapSet = true;
    wrap2 = cols;
  };
  function getWrap() {
    if (!wrapSet) {
      wrap2 = windowWidth();
      wrapSet = true;
    }
    return wrap2;
  }
  const deferY18nLookupPrefix = "__yargsString__:";
  self.deferY18nLookup = (str) => deferY18nLookupPrefix + str;
  self.help = function help() {
    if (cachedHelpMessage)
      return cachedHelpMessage;
    normalizeAliases();
    const base$0 = yargs.customScriptName ? yargs.$0 : shim3.path.basename(yargs.$0);
    const demandedOptions = yargs.getDemandedOptions();
    const demandedCommands = yargs.getDemandedCommands();
    const deprecatedOptions = yargs.getDeprecatedOptions();
    const groups = yargs.getGroups();
    const options = yargs.getOptions();
    let keys2 = [];
    keys2 = keys2.concat(Object.keys(descriptions));
    keys2 = keys2.concat(Object.keys(demandedOptions));
    keys2 = keys2.concat(Object.keys(demandedCommands));
    keys2 = keys2.concat(Object.keys(options.default));
    keys2 = keys2.filter(filterHiddenOptions);
    keys2 = Object.keys(keys2.reduce((acc, key) => {
      if (key !== "_")
        acc[key] = true;
      return acc;
    }, {}));
    const theWrap = getWrap();
    const ui2 = shim3.cliui({
      width: theWrap,
      wrap: !!theWrap
    });
    if (!usageDisabled) {
      if (usages.length) {
        usages.forEach((usage2) => {
          ui2.div({ text: `${usage2[0].replace(/\$0/g, base$0)}` });
          if (usage2[1]) {
            ui2.div({ text: `${usage2[1]}`, padding: [1, 0, 0, 0] });
          }
        });
        ui2.div();
      } else if (commands.length) {
        let u = null;
        if (demandedCommands._) {
          u = `${base$0} <${__("command")}>
`;
        } else {
          u = `${base$0} [${__("command")}]
`;
        }
        ui2.div(`${u}`);
      }
    }
    if (commands.length > 1 || commands.length === 1 && !commands[0][2]) {
      ui2.div(__("Commands:"));
      const context = yargs.getInternalMethods().getContext();
      const parentCommands = context.commands.length ? `${context.commands.join(" ")} ` : "";
      if (yargs.getInternalMethods().getParserConfiguration()["sort-commands"] === true) {
        commands = commands.sort((a, b) => a[0].localeCompare(b[0]));
      }
      const prefix = base$0 ? `${base$0} ` : "";
      commands.forEach((command2) => {
        const commandString = `${prefix}${parentCommands}${command2[0].replace(/^\$0 ?/, "")}`;
        ui2.span({
          text: commandString,
          padding: [0, 2, 0, 2],
          width: maxWidth(commands, theWrap, `${base$0}${parentCommands}`) + 4
        }, { text: command2[1] });
        const hints = [];
        if (command2[2])
          hints.push(`[${__("default")}]`);
        if (command2[3] && command2[3].length) {
          hints.push(`[${__("aliases:")} ${command2[3].join(", ")}]`);
        }
        if (command2[4]) {
          if (typeof command2[4] === "string") {
            hints.push(`[${__("deprecated: %s", command2[4])}]`);
          } else {
            hints.push(`[${__("deprecated")}]`);
          }
        }
        if (hints.length) {
          ui2.div({
            text: hints.join(" "),
            padding: [0, 0, 0, 2],
            align: "right"
          });
        } else {
          ui2.div();
        }
      });
      ui2.div();
    }
    const aliasKeys = (Object.keys(options.alias) || []).concat(Object.keys(yargs.parsed.newAliases) || []);
    keys2 = keys2.filter((key) => !yargs.parsed.newAliases[key] && aliasKeys.every((alias) => (options.alias[alias] || []).indexOf(key) === -1));
    const defaultGroup = __("Options:");
    if (!groups[defaultGroup])
      groups[defaultGroup] = [];
    addUngroupedKeys(keys2, options.alias, groups, defaultGroup);
    const isLongSwitch = (sw) => /^--/.test(getText(sw));
    const displayedGroups = Object.keys(groups).filter((groupName) => groups[groupName].length > 0).map((groupName) => {
      const normalizedKeys = groups[groupName].filter(filterHiddenOptions).map((key) => {
        if (aliasKeys.includes(key))
          return key;
        for (let i = 0, aliasKey; (aliasKey = aliasKeys[i]) !== void 0; i++) {
          if ((options.alias[aliasKey] || []).includes(key))
            return aliasKey;
        }
        return key;
      });
      return { groupName, normalizedKeys };
    }).filter(({ normalizedKeys }) => normalizedKeys.length > 0).map(({ groupName, normalizedKeys }) => {
      const switches = normalizedKeys.reduce((acc, key) => {
        acc[key] = [key].concat(options.alias[key] || []).map((sw) => {
          if (groupName === self.getPositionalGroupName())
            return sw;
          else {
            return (/^[0-9]$/.test(sw) ? options.boolean.includes(key) ? "-" : "--" : sw.length > 1 ? "--" : "-") + sw;
          }
        }).sort((sw1, sw2) => isLongSwitch(sw1) === isLongSwitch(sw2) ? 0 : isLongSwitch(sw1) ? 1 : -1).join(", ");
        return acc;
      }, {});
      return { groupName, normalizedKeys, switches };
    });
    const shortSwitchesUsed = displayedGroups.filter(({ groupName }) => groupName !== self.getPositionalGroupName()).some(({ normalizedKeys, switches }) => !normalizedKeys.every((key) => isLongSwitch(switches[key])));
    if (shortSwitchesUsed) {
      displayedGroups.filter(({ groupName }) => groupName !== self.getPositionalGroupName()).forEach(({ normalizedKeys, switches }) => {
        normalizedKeys.forEach((key) => {
          if (isLongSwitch(switches[key])) {
            switches[key] = addIndentation(switches[key], "-x, ".length);
          }
        });
      });
    }
    displayedGroups.forEach(({ groupName, normalizedKeys, switches }) => {
      ui2.div(groupName);
      normalizedKeys.forEach((key) => {
        const kswitch = switches[key];
        let desc = descriptions[key] || "";
        let type = null;
        if (desc.includes(deferY18nLookupPrefix))
          desc = __(desc.substring(deferY18nLookupPrefix.length));
        if (options.boolean.includes(key))
          type = `[${__("boolean")}]`;
        if (options.count.includes(key))
          type = `[${__("count")}]`;
        if (options.string.includes(key))
          type = `[${__("string")}]`;
        if (options.normalize.includes(key))
          type = `[${__("string")}]`;
        if (options.array.includes(key))
          type = `[${__("array")}]`;
        if (options.number.includes(key))
          type = `[${__("number")}]`;
        const deprecatedExtra = (deprecated) => typeof deprecated === "string" ? `[${__("deprecated: %s", deprecated)}]` : `[${__("deprecated")}]`;
        const extra = [
          key in deprecatedOptions ? deprecatedExtra(deprecatedOptions[key]) : null,
          type,
          key in demandedOptions ? `[${__("required")}]` : null,
          options.choices && options.choices[key] ? `[${__("choices:")} ${self.stringifiedValues(options.choices[key])}]` : null,
          defaultString(options.default[key], options.defaultDescription[key])
        ].filter(Boolean).join(" ");
        ui2.span({
          text: getText(kswitch),
          padding: [0, 2, 0, 2 + getIndentation(kswitch)],
          width: maxWidth(switches, theWrap) + 4
        }, desc);
        if (extra)
          ui2.div({ text: extra, padding: [0, 0, 0, 2], align: "right" });
        else
          ui2.div();
      });
      ui2.div();
    });
    if (examples.length) {
      ui2.div(__("Examples:"));
      examples.forEach((example) => {
        example[0] = example[0].replace(/\$0/g, base$0);
      });
      examples.forEach((example) => {
        if (example[1] === "") {
          ui2.div({
            text: example[0],
            padding: [0, 2, 0, 2]
          });
        } else {
          ui2.div({
            text: example[0],
            padding: [0, 2, 0, 2],
            width: maxWidth(examples, theWrap) + 4
          }, {
            text: example[1]
          });
        }
      });
      ui2.div();
    }
    if (epilogs.length > 0) {
      const e = epilogs.map((epilog) => epilog.replace(/\$0/g, base$0)).join("\n");
      ui2.div(`${e}
`);
    }
    return ui2.toString().replace(/\s*$/, "");
  };
  function maxWidth(table, theWrap, modifier) {
    let width = 0;
    if (!Array.isArray(table)) {
      table = Object.values(table).map((v) => [v]);
    }
    table.forEach((v) => {
      width = Math.max(shim3.stringWidth(modifier ? `${modifier} ${getText(v[0])}` : getText(v[0])) + getIndentation(v[0]), width);
    });
    if (theWrap)
      width = Math.min(width, parseInt((theWrap * 0.5).toString(), 10));
    return width;
  }
  function normalizeAliases() {
    const demandedOptions = yargs.getDemandedOptions();
    const options = yargs.getOptions();
    (Object.keys(options.alias) || []).forEach((key) => {
      options.alias[key].forEach((alias) => {
        if (descriptions[alias])
          self.describe(key, descriptions[alias]);
        if (alias in demandedOptions)
          yargs.demandOption(key, demandedOptions[alias]);
        if (options.boolean.includes(alias))
          yargs.boolean(key);
        if (options.count.includes(alias))
          yargs.count(key);
        if (options.string.includes(alias))
          yargs.string(key);
        if (options.normalize.includes(alias))
          yargs.normalize(key);
        if (options.array.includes(alias))
          yargs.array(key);
        if (options.number.includes(alias))
          yargs.number(key);
      });
    });
  }
  let cachedHelpMessage;
  self.cacheHelpMessage = function() {
    cachedHelpMessage = this.help();
  };
  self.clearCachedHelpMessage = function() {
    cachedHelpMessage = void 0;
  };
  self.hasCachedHelpMessage = function() {
    return !!cachedHelpMessage;
  };
  function addUngroupedKeys(keys2, aliases, groups, defaultGroup) {
    let groupedKeys = [];
    let toCheck = null;
    Object.keys(groups).forEach((group) => {
      groupedKeys = groupedKeys.concat(groups[group]);
    });
    keys2.forEach((key) => {
      toCheck = [key].concat(aliases[key]);
      if (!toCheck.some((k) => groupedKeys.indexOf(k) !== -1)) {
        groups[defaultGroup].push(key);
      }
    });
    return groupedKeys;
  }
  function filterHiddenOptions(key) {
    return yargs.getOptions().hiddenOptions.indexOf(key) < 0 || yargs.parsed.argv[yargs.getOptions().showHiddenOpt];
  }
  self.showHelp = (level) => {
    const logger = yargs.getInternalMethods().getLoggerInstance();
    if (!level)
      level = "error";
    const emit = typeof level === "function" ? level : logger[level];
    emit(self.help());
  };
  self.functionDescription = (fn) => {
    const description = fn.name ? shim3.Parser.decamelize(fn.name, "-") : __("generated-value");
    return ["(", description, ")"].join("");
  };
  self.stringifiedValues = function stringifiedValues(values2, separator) {
    let string = "";
    const sep = separator || ", ";
    const array = [].concat(values2);
    if (!values2 || !array.length)
      return string;
    array.forEach((value) => {
      if (string.length)
        string += sep;
      string += JSON.stringify(value);
    });
    return string;
  };
  function defaultString(value, defaultDescription) {
    let string = `[${__("default:")} `;
    if (value === void 0 && !defaultDescription)
      return null;
    if (defaultDescription) {
      string += defaultDescription;
    } else {
      switch (typeof value) {
        case "string":
          string += `"${value}"`;
          break;
        case "object":
          string += JSON.stringify(value);
          break;
        default:
          string += value;
      }
    }
    return `${string}]`;
  }
  function windowWidth() {
    const maxWidth2 = 80;
    if (shim3.process.stdColumns) {
      return Math.min(maxWidth2, shim3.process.stdColumns);
    } else {
      return maxWidth2;
    }
  }
  let version = null;
  self.version = (ver) => {
    version = ver;
  };
  self.showVersion = (level) => {
    const logger = yargs.getInternalMethods().getLoggerInstance();
    if (!level)
      level = "error";
    const emit = typeof level === "function" ? level : logger[level];
    emit(version);
  };
  self.reset = function reset(localLookup) {
    failMessage = null;
    failureOutput = false;
    usages = [];
    usageDisabled = false;
    epilogs = [];
    examples = [];
    commands = [];
    descriptions = objFilter(descriptions, (k) => !localLookup[k]);
    return self;
  };
  const frozens = [];
  self.freeze = function freeze() {
    frozens.push({
      failMessage,
      failureOutput,
      usages,
      usageDisabled,
      epilogs,
      examples,
      commands,
      descriptions
    });
  };
  self.unfreeze = function unfreeze() {
    const frozen = frozens.pop();
    if (!frozen)
      return;
    ({
      failMessage,
      failureOutput,
      usages,
      usageDisabled,
      epilogs,
      examples,
      commands,
      descriptions
    } = frozen);
  };
  return self;
}
function isIndentedText(text) {
  return typeof text === "object";
}
function addIndentation(text, indent) {
  return isIndentedText(text) ? { text: text.text, indentation: text.indentation + indent } : { text, indentation: indent };
}
function getIndentation(text) {
  return isIndentedText(text) ? text.indentation : 0;
}
function getText(text) {
  return isIndentedText(text) ? text.text : text;
}

// node_modules/yargs/build/lib/completion-templates.js
var completionShTemplate = `###-begin-{{app_name}}-completions-###
#
# yargs command completion script
#
# Installation: {{app_path}} {{completion_command}} >> ~/.bashrc
#    or {{app_path}} {{completion_command}} >> ~/.bash_profile on OSX.
#
_{{app_name}}_yargs_completions()
{
    local cur_word args type_list

    cur_word="\${COMP_WORDS[COMP_CWORD]}"
    args=("\${COMP_WORDS[@]}")

    # ask yargs to generate completions.
    type_list=$({{app_path}} --get-yargs-completions "\${args[@]}")

    COMPREPLY=( $(compgen -W "\${type_list}" -- \${cur_word}) )

    # if no match was found, fall back to filename completion
    if [ \${#COMPREPLY[@]} -eq 0 ]; then
      COMPREPLY=()
    fi

    return 0
}
complete -o bashdefault -o default -F _{{app_name}}_yargs_completions {{app_name}}
###-end-{{app_name}}-completions-###
`;
var completionZshTemplate = `#compdef {{app_name}}
###-begin-{{app_name}}-completions-###
#
# yargs command completion script
#
# Installation: {{app_path}} {{completion_command}} >> ~/.zshrc
#    or {{app_path}} {{completion_command}} >> ~/.zsh_profile on OSX.
#
_{{app_name}}_yargs_completions()
{
  local reply
  local si=$IFS
  IFS=$'
' reply=($(COMP_CWORD="$((CURRENT-1))" COMP_LINE="$BUFFER" COMP_POINT="$CURSOR" {{app_path}} --get-yargs-completions "\${words[@]}"))
  IFS=$si
  _describe 'values' reply
}
compdef _{{app_name}}_yargs_completions {{app_name}}
###-end-{{app_name}}-completions-###
`;

// node_modules/yargs/build/lib/completion.js
var Completion = class {
  constructor(yargs, usage2, command2, shim3) {
    var _a, _b, _c;
    this.yargs = yargs;
    this.usage = usage2;
    this.command = command2;
    this.shim = shim3;
    this.completionKey = "get-yargs-completions";
    this.aliases = null;
    this.customCompletionFunction = null;
    this.zshShell = (_c = ((_a = this.shim.getEnv("SHELL")) === null || _a === void 0 ? void 0 : _a.includes("zsh")) || ((_b = this.shim.getEnv("ZSH_NAME")) === null || _b === void 0 ? void 0 : _b.includes("zsh"))) !== null && _c !== void 0 ? _c : false;
  }
  defaultCompletion(args, argv, current, done) {
    const handlers = this.command.getCommandHandlers();
    for (let i = 0, ii = args.length; i < ii; ++i) {
      if (handlers[args[i]] && handlers[args[i]].builder) {
        const builder = handlers[args[i]].builder;
        if (isCommandBuilderCallback(builder)) {
          const y = this.yargs.getInternalMethods().reset();
          builder(y, true);
          return y.argv;
        }
      }
    }
    const completions = [];
    this.commandCompletions(completions, args, current);
    this.optionCompletions(completions, args, argv, current);
    this.choicesCompletions(completions, args, argv, current);
    done(null, completions);
  }
  commandCompletions(completions, args, current) {
    const parentCommands = this.yargs.getInternalMethods().getContext().commands;
    if (!current.match(/^-/) && parentCommands[parentCommands.length - 1] !== current && !this.previousArgHasChoices(args)) {
      this.usage.getCommands().forEach((usageCommand) => {
        const commandName = parseCommand(usageCommand[0]).cmd;
        if (args.indexOf(commandName) === -1) {
          if (!this.zshShell) {
            completions.push(commandName);
          } else {
            const desc = usageCommand[1] || "";
            completions.push(commandName.replace(/:/g, "\\:") + ":" + desc);
          }
        }
      });
    }
  }
  optionCompletions(completions, args, argv, current) {
    if ((current.match(/^-/) || current === "" && completions.length === 0) && !this.previousArgHasChoices(args)) {
      const options = this.yargs.getOptions();
      const positionalKeys = this.yargs.getGroups()[this.usage.getPositionalGroupName()] || [];
      Object.keys(options.key).forEach((key) => {
        const negable = !!options.configuration["boolean-negation"] && options.boolean.includes(key);
        const isPositionalKey = positionalKeys.includes(key);
        if (!isPositionalKey && !this.argsContainKey(args, argv, key, negable)) {
          this.completeOptionKey(key, completions, current);
          if (negable && !!options.default[key])
            this.completeOptionKey(`no-${key}`, completions, current);
        }
      });
    }
  }
  choicesCompletions(completions, args, argv, current) {
    if (this.previousArgHasChoices(args)) {
      const choices = this.getPreviousArgChoices(args);
      if (choices && choices.length > 0) {
        completions.push(...choices);
      }
    }
  }
  getPreviousArgChoices(args) {
    if (args.length < 1)
      return;
    let previousArg = args[args.length - 1];
    let filter = "";
    if (!previousArg.startsWith("--") && args.length > 1) {
      filter = previousArg;
      previousArg = args[args.length - 2];
    }
    if (!previousArg.startsWith("--"))
      return;
    const previousArgKey = previousArg.replace(/-/g, "");
    const options = this.yargs.getOptions();
    if (Object.keys(options.key).some((key) => key === previousArgKey) && Array.isArray(options.choices[previousArgKey])) {
      return options.choices[previousArgKey].filter((choice) => !filter || choice.startsWith(filter));
    }
  }
  previousArgHasChoices(args) {
    const choices = this.getPreviousArgChoices(args);
    return choices !== void 0 && choices.length > 0;
  }
  argsContainKey(args, argv, key, negable) {
    if (args.indexOf(`--${key}`) !== -1)
      return true;
    if (negable && args.indexOf(`--no-${key}`) !== -1)
      return true;
    if (this.aliases) {
      for (const alias of this.aliases[key]) {
        if (argv[alias] !== void 0)
          return true;
      }
    }
    return false;
  }
  completeOptionKey(key, completions, current) {
    const descs = this.usage.getDescriptions();
    const startsByTwoDashes = (s) => /^--/.test(s);
    const isShortOption = (s) => /^[^0-9]$/.test(s);
    const dashes = !startsByTwoDashes(current) && isShortOption(key) ? "-" : "--";
    if (!this.zshShell) {
      completions.push(dashes + key);
    } else {
      const desc = descs[key] || "";
      completions.push(dashes + `${key.replace(/:/g, "\\:")}:${desc.replace("__yargsString__:", "")}`);
    }
  }
  customCompletion(args, argv, current, done) {
    assertNotStrictEqual(this.customCompletionFunction, null, this.shim);
    if (isSyncCompletionFunction(this.customCompletionFunction)) {
      const result = this.customCompletionFunction(current, argv);
      if (isPromise(result)) {
        return result.then((list) => {
          this.shim.process.nextTick(() => {
            done(null, list);
          });
        }).catch((err) => {
          this.shim.process.nextTick(() => {
            done(err, void 0);
          });
        });
      }
      return done(null, result);
    } else if (isFallbackCompletionFunction(this.customCompletionFunction)) {
      return this.customCompletionFunction(current, argv, (onCompleted = done) => this.defaultCompletion(args, argv, current, onCompleted), (completions) => {
        done(null, completions);
      });
    } else {
      return this.customCompletionFunction(current, argv, (completions) => {
        done(null, completions);
      });
    }
  }
  getCompletion(args, done) {
    const current = args.length ? args[args.length - 1] : "";
    const argv = this.yargs.parse(args, true);
    const completionFunction = this.customCompletionFunction ? (argv2) => this.customCompletion(args, argv2, current, done) : (argv2) => this.defaultCompletion(args, argv2, current, done);
    return isPromise(argv) ? argv.then(completionFunction) : completionFunction(argv);
  }
  generateCompletionScript($0, cmd) {
    let script = this.zshShell ? completionZshTemplate : completionShTemplate;
    const name = this.shim.path.basename($0);
    if ($0.match(/\.js$/))
      $0 = `./${$0}`;
    script = script.replace(/{{app_name}}/g, name);
    script = script.replace(/{{completion_command}}/g, cmd);
    return script.replace(/{{app_path}}/g, $0);
  }
  registerFunction(fn) {
    this.customCompletionFunction = fn;
  }
  setParsed(parsed) {
    this.aliases = parsed.aliases;
  }
};
function completion(yargs, usage2, command2, shim3) {
  return new Completion(yargs, usage2, command2, shim3);
}
function isSyncCompletionFunction(completionFunction) {
  return completionFunction.length < 3;
}
function isFallbackCompletionFunction(completionFunction) {
  return completionFunction.length > 3;
}

// node_modules/yargs/build/lib/utils/levenshtein.js
function levenshtein(a, b) {
  if (a.length === 0)
    return b.length;
  if (b.length === 0)
    return a.length;
  const matrix = [];
  let i;
  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  let j;
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        if (i > 1 && j > 1 && b.charAt(i - 2) === a.charAt(j - 1) && b.charAt(i - 1) === a.charAt(j - 2)) {
          matrix[i][j] = matrix[i - 2][j - 2] + 1;
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
        }
      }
    }
  }
  return matrix[b.length][a.length];
}

// node_modules/yargs/build/lib/validation.js
var specialKeys = ["$0", "--", "_"];
function validation(yargs, usage2, shim3) {
  const __ = shim3.y18n.__;
  const __n = shim3.y18n.__n;
  const self = {};
  self.nonOptionCount = function nonOptionCount(argv) {
    const demandedCommands = yargs.getDemandedCommands();
    const positionalCount = argv._.length + (argv["--"] ? argv["--"].length : 0);
    const _s = positionalCount - yargs.getInternalMethods().getContext().commands.length;
    if (demandedCommands._ && (_s < demandedCommands._.min || _s > demandedCommands._.max)) {
      if (_s < demandedCommands._.min) {
        if (demandedCommands._.minMsg !== void 0) {
          usage2.fail(demandedCommands._.minMsg ? demandedCommands._.minMsg.replace(/\$0/g, _s.toString()).replace(/\$1/, demandedCommands._.min.toString()) : null);
        } else {
          usage2.fail(__n("Not enough non-option arguments: got %s, need at least %s", "Not enough non-option arguments: got %s, need at least %s", _s, _s.toString(), demandedCommands._.min.toString()));
        }
      } else if (_s > demandedCommands._.max) {
        if (demandedCommands._.maxMsg !== void 0) {
          usage2.fail(demandedCommands._.maxMsg ? demandedCommands._.maxMsg.replace(/\$0/g, _s.toString()).replace(/\$1/, demandedCommands._.max.toString()) : null);
        } else {
          usage2.fail(__n("Too many non-option arguments: got %s, maximum of %s", "Too many non-option arguments: got %s, maximum of %s", _s, _s.toString(), demandedCommands._.max.toString()));
        }
      }
    }
  };
  self.positionalCount = function positionalCount(required, observed) {
    if (observed < required) {
      usage2.fail(__n("Not enough non-option arguments: got %s, need at least %s", "Not enough non-option arguments: got %s, need at least %s", observed, observed + "", required + ""));
    }
  };
  self.requiredArguments = function requiredArguments(argv, demandedOptions) {
    let missing = null;
    for (const key of Object.keys(demandedOptions)) {
      if (!Object.prototype.hasOwnProperty.call(argv, key) || typeof argv[key] === "undefined") {
        missing = missing || {};
        missing[key] = demandedOptions[key];
      }
    }
    if (missing) {
      const customMsgs = [];
      for (const key of Object.keys(missing)) {
        const msg = missing[key];
        if (msg && customMsgs.indexOf(msg) < 0) {
          customMsgs.push(msg);
        }
      }
      const customMsg = customMsgs.length ? `
${customMsgs.join("\n")}` : "";
      usage2.fail(__n("Missing required argument: %s", "Missing required arguments: %s", Object.keys(missing).length, Object.keys(missing).join(", ") + customMsg));
    }
  };
  self.unknownArguments = function unknownArguments(argv, aliases, positionalMap, isDefaultCommand, checkPositionals = true) {
    var _a;
    const commandKeys = yargs.getInternalMethods().getCommandInstance().getCommands();
    const unknown = [];
    const currentContext = yargs.getInternalMethods().getContext();
    Object.keys(argv).forEach((key) => {
      if (!specialKeys.includes(key) && !Object.prototype.hasOwnProperty.call(positionalMap, key) && !Object.prototype.hasOwnProperty.call(yargs.getInternalMethods().getParseContext(), key) && !self.isValidAndSomeAliasIsNotNew(key, aliases)) {
        unknown.push(key);
      }
    });
    if (checkPositionals && (currentContext.commands.length > 0 || commandKeys.length > 0 || isDefaultCommand)) {
      argv._.slice(currentContext.commands.length).forEach((key) => {
        if (!commandKeys.includes("" + key)) {
          unknown.push("" + key);
        }
      });
    }
    if (checkPositionals) {
      const demandedCommands = yargs.getDemandedCommands();
      const maxNonOptDemanded = ((_a = demandedCommands._) === null || _a === void 0 ? void 0 : _a.max) || 0;
      const expected = currentContext.commands.length + maxNonOptDemanded;
      if (expected < argv._.length) {
        argv._.slice(expected).forEach((key) => {
          key = String(key);
          if (!currentContext.commands.includes(key) && !unknown.includes(key)) {
            unknown.push(key);
          }
        });
      }
    }
    if (unknown.length) {
      usage2.fail(__n("Unknown argument: %s", "Unknown arguments: %s", unknown.length, unknown.join(", ")));
    }
  };
  self.unknownCommands = function unknownCommands(argv) {
    const commandKeys = yargs.getInternalMethods().getCommandInstance().getCommands();
    const unknown = [];
    const currentContext = yargs.getInternalMethods().getContext();
    if (currentContext.commands.length > 0 || commandKeys.length > 0) {
      argv._.slice(currentContext.commands.length).forEach((key) => {
        if (!commandKeys.includes("" + key)) {
          unknown.push("" + key);
        }
      });
    }
    if (unknown.length > 0) {
      usage2.fail(__n("Unknown command: %s", "Unknown commands: %s", unknown.length, unknown.join(", ")));
      return true;
    } else {
      return false;
    }
  };
  self.isValidAndSomeAliasIsNotNew = function isValidAndSomeAliasIsNotNew(key, aliases) {
    if (!Object.prototype.hasOwnProperty.call(aliases, key)) {
      return false;
    }
    const newAliases = yargs.parsed.newAliases;
    return [key, ...aliases[key]].some((a) => !Object.prototype.hasOwnProperty.call(newAliases, a) || !newAliases[key]);
  };
  self.limitedChoices = function limitedChoices(argv) {
    const options = yargs.getOptions();
    const invalid = {};
    if (!Object.keys(options.choices).length)
      return;
    Object.keys(argv).forEach((key) => {
      if (specialKeys.indexOf(key) === -1 && Object.prototype.hasOwnProperty.call(options.choices, key)) {
        [].concat(argv[key]).forEach((value) => {
          if (options.choices[key].indexOf(value) === -1 && value !== void 0) {
            invalid[key] = (invalid[key] || []).concat(value);
          }
        });
      }
    });
    const invalidKeys = Object.keys(invalid);
    if (!invalidKeys.length)
      return;
    let msg = __("Invalid values:");
    invalidKeys.forEach((key) => {
      msg += `
  ${__("Argument: %s, Given: %s, Choices: %s", key, usage2.stringifiedValues(invalid[key]), usage2.stringifiedValues(options.choices[key]))}`;
    });
    usage2.fail(msg);
  };
  let implied = {};
  self.implies = function implies(key, value) {
    argsert("<string|object> [array|number|string]", [key, value], arguments.length);
    if (typeof key === "object") {
      Object.keys(key).forEach((k) => {
        self.implies(k, key[k]);
      });
    } else {
      yargs.global(key);
      if (!implied[key]) {
        implied[key] = [];
      }
      if (Array.isArray(value)) {
        value.forEach((i) => self.implies(key, i));
      } else {
        assertNotStrictEqual(value, void 0, shim3);
        implied[key].push(value);
      }
    }
  };
  self.getImplied = function getImplied() {
    return implied;
  };
  function keyExists(argv, val) {
    const num = Number(val);
    val = isNaN(num) ? val : num;
    if (typeof val === "number") {
      val = argv._.length >= val;
    } else if (val.match(/^--no-.+/)) {
      val = val.match(/^--no-(.+)/)[1];
      val = !Object.prototype.hasOwnProperty.call(argv, val);
    } else {
      val = Object.prototype.hasOwnProperty.call(argv, val);
    }
    return val;
  }
  self.implications = function implications(argv) {
    const implyFail = [];
    Object.keys(implied).forEach((key) => {
      const origKey = key;
      (implied[key] || []).forEach((value) => {
        let key2 = origKey;
        const origValue = value;
        key2 = keyExists(argv, key2);
        value = keyExists(argv, value);
        if (key2 && !value) {
          implyFail.push(` ${origKey} -> ${origValue}`);
        }
      });
    });
    if (implyFail.length) {
      let msg = `${__("Implications failed:")}
`;
      implyFail.forEach((value) => {
        msg += value;
      });
      usage2.fail(msg);
    }
  };
  let conflicting = {};
  self.conflicts = function conflicts(key, value) {
    argsert("<string|object> [array|string]", [key, value], arguments.length);
    if (typeof key === "object") {
      Object.keys(key).forEach((k) => {
        self.conflicts(k, key[k]);
      });
    } else {
      yargs.global(key);
      if (!conflicting[key]) {
        conflicting[key] = [];
      }
      if (Array.isArray(value)) {
        value.forEach((i) => self.conflicts(key, i));
      } else {
        conflicting[key].push(value);
      }
    }
  };
  self.getConflicting = () => conflicting;
  self.conflicting = function conflictingFn(argv) {
    Object.keys(argv).forEach((key) => {
      if (conflicting[key]) {
        conflicting[key].forEach((value) => {
          if (value && argv[key] !== void 0 && argv[value] !== void 0) {
            usage2.fail(__("Arguments %s and %s are mutually exclusive", key, value));
          }
        });
      }
    });
    if (yargs.getInternalMethods().getParserConfiguration()["strip-dashed"]) {
      Object.keys(conflicting).forEach((key) => {
        conflicting[key].forEach((value) => {
          if (value && argv[shim3.Parser.camelCase(key)] !== void 0 && argv[shim3.Parser.camelCase(value)] !== void 0) {
            usage2.fail(__("Arguments %s and %s are mutually exclusive", key, value));
          }
        });
      });
    }
  };
  self.recommendCommands = function recommendCommands(cmd, potentialCommands) {
    const threshold = 3;
    potentialCommands = potentialCommands.sort((a, b) => b.length - a.length);
    let recommended = null;
    let bestDistance = Infinity;
    for (let i = 0, candidate; (candidate = potentialCommands[i]) !== void 0; i++) {
      const d = levenshtein(cmd, candidate);
      if (d <= threshold && d < bestDistance) {
        bestDistance = d;
        recommended = candidate;
      }
    }
    if (recommended)
      usage2.fail(__("Did you mean %s?", recommended));
  };
  self.reset = function reset(localLookup) {
    implied = objFilter(implied, (k) => !localLookup[k]);
    conflicting = objFilter(conflicting, (k) => !localLookup[k]);
    return self;
  };
  const frozens = [];
  self.freeze = function freeze() {
    frozens.push({
      implied,
      conflicting
    });
  };
  self.unfreeze = function unfreeze() {
    const frozen = frozens.pop();
    assertNotStrictEqual(frozen, void 0, shim3);
    ({ implied, conflicting } = frozen);
  };
  return self;
}

// node_modules/yargs/build/lib/utils/apply-extends.js
var previouslyVisitedConfigs = [];
var shim2;
function applyExtends(config, cwd, mergeExtends, _shim) {
  shim2 = _shim;
  let defaultConfig = {};
  if (Object.prototype.hasOwnProperty.call(config, "extends")) {
    if (typeof config.extends !== "string")
      return defaultConfig;
    const isPath = /\.json|\..*rc$/.test(config.extends);
    let pathToDefault = null;
    if (!isPath) {
      try {
        pathToDefault = require.resolve(config.extends);
      } catch (_err) {
        return config;
      }
    } else {
      pathToDefault = getPathToDefaultConfig(cwd, config.extends);
    }
    checkForCircularExtends(pathToDefault);
    previouslyVisitedConfigs.push(pathToDefault);
    defaultConfig = isPath ? JSON.parse(shim2.readFileSync(pathToDefault, "utf8")) : require(config.extends);
    delete config.extends;
    defaultConfig = applyExtends(defaultConfig, shim2.path.dirname(pathToDefault), mergeExtends, shim2);
  }
  previouslyVisitedConfigs = [];
  return mergeExtends ? mergeDeep(defaultConfig, config) : Object.assign({}, defaultConfig, config);
}
function checkForCircularExtends(cfgPath) {
  if (previouslyVisitedConfigs.indexOf(cfgPath) > -1) {
    throw new YError(`Circular extended configurations: '${cfgPath}'.`);
  }
}
function getPathToDefaultConfig(cwd, pathToExtend) {
  return shim2.path.resolve(cwd, pathToExtend);
}
function mergeDeep(config1, config2) {
  const target = {};
  function isObject(obj) {
    return obj && typeof obj === "object" && !Array.isArray(obj);
  }
  Object.assign(target, config1);
  for (const key of Object.keys(config2)) {
    if (isObject(config2[key]) && isObject(target[key])) {
      target[key] = mergeDeep(config1[key], config2[key]);
    } else {
      target[key] = config2[key];
    }
  }
  return target;
}

// node_modules/yargs/build/lib/yargs-factory.js
var __classPrivateFieldSet = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _YargsInstance_command;
var _YargsInstance_cwd;
var _YargsInstance_context;
var _YargsInstance_completion;
var _YargsInstance_completionCommand;
var _YargsInstance_defaultShowHiddenOpt;
var _YargsInstance_exitError;
var _YargsInstance_detectLocale;
var _YargsInstance_emittedWarnings;
var _YargsInstance_exitProcess;
var _YargsInstance_frozens;
var _YargsInstance_globalMiddleware;
var _YargsInstance_groups;
var _YargsInstance_hasOutput;
var _YargsInstance_helpOpt;
var _YargsInstance_logger;
var _YargsInstance_output;
var _YargsInstance_options;
var _YargsInstance_parentRequire;
var _YargsInstance_parserConfig;
var _YargsInstance_parseFn;
var _YargsInstance_parseContext;
var _YargsInstance_pkgs;
var _YargsInstance_preservedGroups;
var _YargsInstance_processArgs;
var _YargsInstance_recommendCommands;
var _YargsInstance_shim;
var _YargsInstance_strict;
var _YargsInstance_strictCommands;
var _YargsInstance_strictOptions;
var _YargsInstance_usage;
var _YargsInstance_versionOpt;
var _YargsInstance_validation;
function YargsFactory(_shim) {
  return (processArgs = [], cwd = _shim.process.cwd(), parentRequire) => {
    const yargs = new YargsInstance(processArgs, cwd, parentRequire, _shim);
    Object.defineProperty(yargs, "argv", {
      get: () => {
        return yargs.parse();
      },
      enumerable: true
    });
    yargs.help();
    yargs.version();
    return yargs;
  };
}
var kCopyDoubleDash = Symbol("copyDoubleDash");
var kCreateLogger = Symbol("copyDoubleDash");
var kDeleteFromParserHintObject = Symbol("deleteFromParserHintObject");
var kEmitWarning = Symbol("emitWarning");
var kFreeze = Symbol("freeze");
var kGetDollarZero = Symbol("getDollarZero");
var kGetParserConfiguration = Symbol("getParserConfiguration");
var kGuessLocale = Symbol("guessLocale");
var kGuessVersion = Symbol("guessVersion");
var kParsePositionalNumbers = Symbol("parsePositionalNumbers");
var kPkgUp = Symbol("pkgUp");
var kPopulateParserHintArray = Symbol("populateParserHintArray");
var kPopulateParserHintSingleValueDictionary = Symbol("populateParserHintSingleValueDictionary");
var kPopulateParserHintArrayDictionary = Symbol("populateParserHintArrayDictionary");
var kPopulateParserHintDictionary = Symbol("populateParserHintDictionary");
var kSanitizeKey = Symbol("sanitizeKey");
var kSetKey = Symbol("setKey");
var kUnfreeze = Symbol("unfreeze");
var kValidateAsync = Symbol("validateAsync");
var kGetCommandInstance = Symbol("getCommandInstance");
var kGetContext = Symbol("getContext");
var kGetHasOutput = Symbol("getHasOutput");
var kGetLoggerInstance = Symbol("getLoggerInstance");
var kGetParseContext = Symbol("getParseContext");
var kGetUsageInstance = Symbol("getUsageInstance");
var kGetValidationInstance = Symbol("getValidationInstance");
var kHasParseCallback = Symbol("hasParseCallback");
var kPostProcess = Symbol("postProcess");
var kRebase = Symbol("rebase");
var kReset = Symbol("reset");
var kRunYargsParserAndExecuteCommands = Symbol("runYargsParserAndExecuteCommands");
var kRunValidation = Symbol("runValidation");
var kSetHasOutput = Symbol("setHasOutput");
var kTrackManuallySetKeys = Symbol("kTrackManuallySetKeys");
var YargsInstance = class {
  constructor(processArgs = [], cwd, parentRequire, shim3) {
    this.customScriptName = false;
    this.parsed = false;
    _YargsInstance_command.set(this, void 0);
    _YargsInstance_cwd.set(this, void 0);
    _YargsInstance_context.set(this, { commands: [], fullCommands: [] });
    _YargsInstance_completion.set(this, null);
    _YargsInstance_completionCommand.set(this, null);
    _YargsInstance_defaultShowHiddenOpt.set(this, "show-hidden");
    _YargsInstance_exitError.set(this, null);
    _YargsInstance_detectLocale.set(this, true);
    _YargsInstance_emittedWarnings.set(this, {});
    _YargsInstance_exitProcess.set(this, true);
    _YargsInstance_frozens.set(this, []);
    _YargsInstance_globalMiddleware.set(this, void 0);
    _YargsInstance_groups.set(this, {});
    _YargsInstance_hasOutput.set(this, false);
    _YargsInstance_helpOpt.set(this, null);
    _YargsInstance_logger.set(this, void 0);
    _YargsInstance_output.set(this, "");
    _YargsInstance_options.set(this, void 0);
    _YargsInstance_parentRequire.set(this, void 0);
    _YargsInstance_parserConfig.set(this, {});
    _YargsInstance_parseFn.set(this, null);
    _YargsInstance_parseContext.set(this, null);
    _YargsInstance_pkgs.set(this, {});
    _YargsInstance_preservedGroups.set(this, {});
    _YargsInstance_processArgs.set(this, void 0);
    _YargsInstance_recommendCommands.set(this, false);
    _YargsInstance_shim.set(this, void 0);
    _YargsInstance_strict.set(this, false);
    _YargsInstance_strictCommands.set(this, false);
    _YargsInstance_strictOptions.set(this, false);
    _YargsInstance_usage.set(this, void 0);
    _YargsInstance_versionOpt.set(this, null);
    _YargsInstance_validation.set(this, void 0);
    __classPrivateFieldSet(this, _YargsInstance_shim, shim3, "f");
    __classPrivateFieldSet(this, _YargsInstance_processArgs, processArgs, "f");
    __classPrivateFieldSet(this, _YargsInstance_cwd, cwd, "f");
    __classPrivateFieldSet(this, _YargsInstance_parentRequire, parentRequire, "f");
    __classPrivateFieldSet(this, _YargsInstance_globalMiddleware, new GlobalMiddleware(this), "f");
    this.$0 = this[kGetDollarZero]();
    this[kReset]();
    __classPrivateFieldSet(this, _YargsInstance_command, __classPrivateFieldGet(this, _YargsInstance_command, "f"), "f");
    __classPrivateFieldSet(this, _YargsInstance_usage, __classPrivateFieldGet(this, _YargsInstance_usage, "f"), "f");
    __classPrivateFieldSet(this, _YargsInstance_validation, __classPrivateFieldGet(this, _YargsInstance_validation, "f"), "f");
    __classPrivateFieldSet(this, _YargsInstance_options, __classPrivateFieldGet(this, _YargsInstance_options, "f"), "f");
    __classPrivateFieldGet(this, _YargsInstance_options, "f").showHiddenOpt = __classPrivateFieldGet(this, _YargsInstance_defaultShowHiddenOpt, "f");
    __classPrivateFieldSet(this, _YargsInstance_logger, this[kCreateLogger](), "f");
  }
  addHelpOpt(opt, msg) {
    const defaultHelpOpt = "help";
    argsert("[string|boolean] [string]", [opt, msg], arguments.length);
    if (__classPrivateFieldGet(this, _YargsInstance_helpOpt, "f")) {
      this[kDeleteFromParserHintObject](__classPrivateFieldGet(this, _YargsInstance_helpOpt, "f"));
      __classPrivateFieldSet(this, _YargsInstance_helpOpt, null, "f");
    }
    if (opt === false && msg === void 0)
      return this;
    __classPrivateFieldSet(this, _YargsInstance_helpOpt, typeof opt === "string" ? opt : defaultHelpOpt, "f");
    this.boolean(__classPrivateFieldGet(this, _YargsInstance_helpOpt, "f"));
    this.describe(__classPrivateFieldGet(this, _YargsInstance_helpOpt, "f"), msg || __classPrivateFieldGet(this, _YargsInstance_usage, "f").deferY18nLookup("Show help"));
    return this;
  }
  help(opt, msg) {
    return this.addHelpOpt(opt, msg);
  }
  addShowHiddenOpt(opt, msg) {
    argsert("[string|boolean] [string]", [opt, msg], arguments.length);
    if (opt === false && msg === void 0)
      return this;
    const showHiddenOpt = typeof opt === "string" ? opt : __classPrivateFieldGet(this, _YargsInstance_defaultShowHiddenOpt, "f");
    this.boolean(showHiddenOpt);
    this.describe(showHiddenOpt, msg || __classPrivateFieldGet(this, _YargsInstance_usage, "f").deferY18nLookup("Show hidden options"));
    __classPrivateFieldGet(this, _YargsInstance_options, "f").showHiddenOpt = showHiddenOpt;
    return this;
  }
  showHidden(opt, msg) {
    return this.addShowHiddenOpt(opt, msg);
  }
  alias(key, value) {
    argsert("<object|string|array> [string|array]", [key, value], arguments.length);
    this[kPopulateParserHintArrayDictionary](this.alias.bind(this), "alias", key, value);
    return this;
  }
  array(keys2) {
    argsert("<array|string>", [keys2], arguments.length);
    this[kPopulateParserHintArray]("array", keys2);
    this[kTrackManuallySetKeys](keys2);
    return this;
  }
  boolean(keys2) {
    argsert("<array|string>", [keys2], arguments.length);
    this[kPopulateParserHintArray]("boolean", keys2);
    this[kTrackManuallySetKeys](keys2);
    return this;
  }
  check(f, global) {
    argsert("<function> [boolean]", [f, global], arguments.length);
    this.middleware((argv, _yargs) => {
      return maybeAsyncResult(() => {
        return f(argv, _yargs.getOptions());
      }, (result) => {
        if (!result) {
          __classPrivateFieldGet(this, _YargsInstance_usage, "f").fail(__classPrivateFieldGet(this, _YargsInstance_shim, "f").y18n.__("Argument check failed: %s", f.toString()));
        } else if (typeof result === "string" || result instanceof Error) {
          __classPrivateFieldGet(this, _YargsInstance_usage, "f").fail(result.toString(), result);
        }
        return argv;
      }, (err) => {
        __classPrivateFieldGet(this, _YargsInstance_usage, "f").fail(err.message ? err.message : err.toString(), err);
        return argv;
      });
    }, false, global);
    return this;
  }
  choices(key, value) {
    argsert("<object|string|array> [string|array]", [key, value], arguments.length);
    this[kPopulateParserHintArrayDictionary](this.choices.bind(this), "choices", key, value);
    return this;
  }
  coerce(keys2, value) {
    argsert("<object|string|array> [function]", [keys2, value], arguments.length);
    if (Array.isArray(keys2)) {
      if (!value) {
        throw new YError("coerce callback must be provided");
      }
      for (const key of keys2) {
        this.coerce(key, value);
      }
      return this;
    } else if (typeof keys2 === "object") {
      for (const key of Object.keys(keys2)) {
        this.coerce(key, keys2[key]);
      }
      return this;
    }
    if (!value) {
      throw new YError("coerce callback must be provided");
    }
    __classPrivateFieldGet(this, _YargsInstance_options, "f").key[keys2] = true;
    __classPrivateFieldGet(this, _YargsInstance_globalMiddleware, "f").addCoerceMiddleware((argv, yargs) => {
      let aliases;
      return maybeAsyncResult(() => {
        aliases = yargs.getAliases();
        return value(argv[keys2]);
      }, (result) => {
        argv[keys2] = result;
        if (aliases[keys2]) {
          for (const alias of aliases[keys2]) {
            argv[alias] = result;
          }
        }
        return argv;
      }, (err) => {
        throw new YError(err.message);
      });
    }, keys2);
    return this;
  }
  conflicts(key1, key2) {
    argsert("<string|object> [string|array]", [key1, key2], arguments.length);
    __classPrivateFieldGet(this, _YargsInstance_validation, "f").conflicts(key1, key2);
    return this;
  }
  config(key = "config", msg, parseFn) {
    argsert("[object|string] [string|function] [function]", [key, msg, parseFn], arguments.length);
    if (typeof key === "object" && !Array.isArray(key)) {
      key = applyExtends(key, __classPrivateFieldGet(this, _YargsInstance_cwd, "f"), this[kGetParserConfiguration]()["deep-merge-config"] || false, __classPrivateFieldGet(this, _YargsInstance_shim, "f"));
      __classPrivateFieldGet(this, _YargsInstance_options, "f").configObjects = (__classPrivateFieldGet(this, _YargsInstance_options, "f").configObjects || []).concat(key);
      return this;
    }
    if (typeof msg === "function") {
      parseFn = msg;
      msg = void 0;
    }
    this.describe(key, msg || __classPrivateFieldGet(this, _YargsInstance_usage, "f").deferY18nLookup("Path to JSON config file"));
    (Array.isArray(key) ? key : [key]).forEach((k) => {
      __classPrivateFieldGet(this, _YargsInstance_options, "f").config[k] = parseFn || true;
    });
    return this;
  }
  completion(cmd, desc, fn) {
    argsert("[string] [string|boolean|function] [function]", [cmd, desc, fn], arguments.length);
    if (typeof desc === "function") {
      fn = desc;
      desc = void 0;
    }
    __classPrivateFieldSet(this, _YargsInstance_completionCommand, cmd || __classPrivateFieldGet(this, _YargsInstance_completionCommand, "f") || "completion", "f");
    if (!desc && desc !== false) {
      desc = "generate completion script";
    }
    this.command(__classPrivateFieldGet(this, _YargsInstance_completionCommand, "f"), desc);
    if (fn)
      __classPrivateFieldGet(this, _YargsInstance_completion, "f").registerFunction(fn);
    return this;
  }
  command(cmd, description, builder, handler, middlewares, deprecated) {
    argsert("<string|array|object> [string|boolean] [function|object] [function] [array] [boolean|string]", [cmd, description, builder, handler, middlewares, deprecated], arguments.length);
    __classPrivateFieldGet(this, _YargsInstance_command, "f").addHandler(cmd, description, builder, handler, middlewares, deprecated);
    return this;
  }
  commands(cmd, description, builder, handler, middlewares, deprecated) {
    return this.command(cmd, description, builder, handler, middlewares, deprecated);
  }
  commandDir(dir, opts) {
    argsert("<string> [object]", [dir, opts], arguments.length);
    const req = __classPrivateFieldGet(this, _YargsInstance_parentRequire, "f") || __classPrivateFieldGet(this, _YargsInstance_shim, "f").require;
    __classPrivateFieldGet(this, _YargsInstance_command, "f").addDirectory(dir, req, __classPrivateFieldGet(this, _YargsInstance_shim, "f").getCallerFile(), opts);
    return this;
  }
  count(keys2) {
    argsert("<array|string>", [keys2], arguments.length);
    this[kPopulateParserHintArray]("count", keys2);
    this[kTrackManuallySetKeys](keys2);
    return this;
  }
  default(key, value, defaultDescription) {
    argsert("<object|string|array> [*] [string]", [key, value, defaultDescription], arguments.length);
    if (defaultDescription) {
      assertSingleKey(key, __classPrivateFieldGet(this, _YargsInstance_shim, "f"));
      __classPrivateFieldGet(this, _YargsInstance_options, "f").defaultDescription[key] = defaultDescription;
    }
    if (typeof value === "function") {
      assertSingleKey(key, __classPrivateFieldGet(this, _YargsInstance_shim, "f"));
      if (!__classPrivateFieldGet(this, _YargsInstance_options, "f").defaultDescription[key])
        __classPrivateFieldGet(this, _YargsInstance_options, "f").defaultDescription[key] = __classPrivateFieldGet(this, _YargsInstance_usage, "f").functionDescription(value);
      value = value.call();
    }
    this[kPopulateParserHintSingleValueDictionary](this.default.bind(this), "default", key, value);
    return this;
  }
  defaults(key, value, defaultDescription) {
    return this.default(key, value, defaultDescription);
  }
  demandCommand(min = 1, max, minMsg, maxMsg) {
    argsert("[number] [number|string] [string|null|undefined] [string|null|undefined]", [min, max, minMsg, maxMsg], arguments.length);
    if (typeof max !== "number") {
      minMsg = max;
      max = Infinity;
    }
    this.global("_", false);
    __classPrivateFieldGet(this, _YargsInstance_options, "f").demandedCommands._ = {
      min,
      max,
      minMsg,
      maxMsg
    };
    return this;
  }
  demand(keys2, max, msg) {
    if (Array.isArray(max)) {
      max.forEach((key) => {
        assertNotStrictEqual(msg, true, __classPrivateFieldGet(this, _YargsInstance_shim, "f"));
        this.demandOption(key, msg);
      });
      max = Infinity;
    } else if (typeof max !== "number") {
      msg = max;
      max = Infinity;
    }
    if (typeof keys2 === "number") {
      assertNotStrictEqual(msg, true, __classPrivateFieldGet(this, _YargsInstance_shim, "f"));
      this.demandCommand(keys2, max, msg, msg);
    } else if (Array.isArray(keys2)) {
      keys2.forEach((key) => {
        assertNotStrictEqual(msg, true, __classPrivateFieldGet(this, _YargsInstance_shim, "f"));
        this.demandOption(key, msg);
      });
    } else {
      if (typeof msg === "string") {
        this.demandOption(keys2, msg);
      } else if (msg === true || typeof msg === "undefined") {
        this.demandOption(keys2);
      }
    }
    return this;
  }
  demandOption(keys2, msg) {
    argsert("<object|string|array> [string]", [keys2, msg], arguments.length);
    this[kPopulateParserHintSingleValueDictionary](this.demandOption.bind(this), "demandedOptions", keys2, msg);
    return this;
  }
  deprecateOption(option, message) {
    argsert("<string> [string|boolean]", [option, message], arguments.length);
    __classPrivateFieldGet(this, _YargsInstance_options, "f").deprecatedOptions[option] = message;
    return this;
  }
  describe(keys2, description) {
    argsert("<object|string|array> [string]", [keys2, description], arguments.length);
    this[kSetKey](keys2, true);
    __classPrivateFieldGet(this, _YargsInstance_usage, "f").describe(keys2, description);
    return this;
  }
  detectLocale(detect) {
    argsert("<boolean>", [detect], arguments.length);
    __classPrivateFieldSet(this, _YargsInstance_detectLocale, detect, "f");
    return this;
  }
  env(prefix) {
    argsert("[string|boolean]", [prefix], arguments.length);
    if (prefix === false)
      delete __classPrivateFieldGet(this, _YargsInstance_options, "f").envPrefix;
    else
      __classPrivateFieldGet(this, _YargsInstance_options, "f").envPrefix = prefix || "";
    return this;
  }
  epilogue(msg) {
    argsert("<string>", [msg], arguments.length);
    __classPrivateFieldGet(this, _YargsInstance_usage, "f").epilog(msg);
    return this;
  }
  epilog(msg) {
    return this.epilogue(msg);
  }
  example(cmd, description) {
    argsert("<string|array> [string]", [cmd, description], arguments.length);
    if (Array.isArray(cmd)) {
      cmd.forEach((exampleParams) => this.example(...exampleParams));
    } else {
      __classPrivateFieldGet(this, _YargsInstance_usage, "f").example(cmd, description);
    }
    return this;
  }
  exit(code, err) {
    __classPrivateFieldSet(this, _YargsInstance_hasOutput, true, "f");
    __classPrivateFieldSet(this, _YargsInstance_exitError, err, "f");
    if (__classPrivateFieldGet(this, _YargsInstance_exitProcess, "f"))
      __classPrivateFieldGet(this, _YargsInstance_shim, "f").process.exit(code);
  }
  exitProcess(enabled = true) {
    argsert("[boolean]", [enabled], arguments.length);
    __classPrivateFieldSet(this, _YargsInstance_exitProcess, enabled, "f");
    return this;
  }
  fail(f) {
    argsert("<function|boolean>", [f], arguments.length);
    if (typeof f === "boolean" && f !== false) {
      throw new YError("Invalid first argument. Expected function or boolean 'false'");
    }
    __classPrivateFieldGet(this, _YargsInstance_usage, "f").failFn(f);
    return this;
  }
  getAliases() {
    return this.parsed ? this.parsed.aliases : {};
  }
  async getCompletion(args, done) {
    argsert("<array> [function]", [args, done], arguments.length);
    if (!done) {
      return new Promise((resolve5, reject) => {
        __classPrivateFieldGet(this, _YargsInstance_completion, "f").getCompletion(args, (err, completions) => {
          if (err)
            reject(err);
          else
            resolve5(completions);
        });
      });
    } else {
      return __classPrivateFieldGet(this, _YargsInstance_completion, "f").getCompletion(args, done);
    }
  }
  getDemandedOptions() {
    argsert([], 0);
    return __classPrivateFieldGet(this, _YargsInstance_options, "f").demandedOptions;
  }
  getDemandedCommands() {
    argsert([], 0);
    return __classPrivateFieldGet(this, _YargsInstance_options, "f").demandedCommands;
  }
  getDeprecatedOptions() {
    argsert([], 0);
    return __classPrivateFieldGet(this, _YargsInstance_options, "f").deprecatedOptions;
  }
  getDetectLocale() {
    return __classPrivateFieldGet(this, _YargsInstance_detectLocale, "f");
  }
  getExitProcess() {
    return __classPrivateFieldGet(this, _YargsInstance_exitProcess, "f");
  }
  getGroups() {
    return Object.assign({}, __classPrivateFieldGet(this, _YargsInstance_groups, "f"), __classPrivateFieldGet(this, _YargsInstance_preservedGroups, "f"));
  }
  getHelp() {
    __classPrivateFieldSet(this, _YargsInstance_hasOutput, true, "f");
    if (!__classPrivateFieldGet(this, _YargsInstance_usage, "f").hasCachedHelpMessage()) {
      if (!this.parsed) {
        const parse = this[kRunYargsParserAndExecuteCommands](__classPrivateFieldGet(this, _YargsInstance_processArgs, "f"), void 0, void 0, 0, true);
        if (isPromise(parse)) {
          return parse.then(() => {
            return __classPrivateFieldGet(this, _YargsInstance_usage, "f").help();
          });
        }
      }
      const builderResponse = __classPrivateFieldGet(this, _YargsInstance_command, "f").runDefaultBuilderOn(this);
      if (isPromise(builderResponse)) {
        return builderResponse.then(() => {
          return __classPrivateFieldGet(this, _YargsInstance_usage, "f").help();
        });
      }
    }
    return Promise.resolve(__classPrivateFieldGet(this, _YargsInstance_usage, "f").help());
  }
  getOptions() {
    return __classPrivateFieldGet(this, _YargsInstance_options, "f");
  }
  getStrict() {
    return __classPrivateFieldGet(this, _YargsInstance_strict, "f");
  }
  getStrictCommands() {
    return __classPrivateFieldGet(this, _YargsInstance_strictCommands, "f");
  }
  getStrictOptions() {
    return __classPrivateFieldGet(this, _YargsInstance_strictOptions, "f");
  }
  global(globals, global) {
    argsert("<string|array> [boolean]", [globals, global], arguments.length);
    globals = [].concat(globals);
    if (global !== false) {
      __classPrivateFieldGet(this, _YargsInstance_options, "f").local = __classPrivateFieldGet(this, _YargsInstance_options, "f").local.filter((l) => globals.indexOf(l) === -1);
    } else {
      globals.forEach((g) => {
        if (!__classPrivateFieldGet(this, _YargsInstance_options, "f").local.includes(g))
          __classPrivateFieldGet(this, _YargsInstance_options, "f").local.push(g);
      });
    }
    return this;
  }
  group(opts, groupName) {
    argsert("<string|array> <string>", [opts, groupName], arguments.length);
    const existing = __classPrivateFieldGet(this, _YargsInstance_preservedGroups, "f")[groupName] || __classPrivateFieldGet(this, _YargsInstance_groups, "f")[groupName];
    if (__classPrivateFieldGet(this, _YargsInstance_preservedGroups, "f")[groupName]) {
      delete __classPrivateFieldGet(this, _YargsInstance_preservedGroups, "f")[groupName];
    }
    const seen = {};
    __classPrivateFieldGet(this, _YargsInstance_groups, "f")[groupName] = (existing || []).concat(opts).filter((key) => {
      if (seen[key])
        return false;
      return seen[key] = true;
    });
    return this;
  }
  hide(key) {
    argsert("<string>", [key], arguments.length);
    __classPrivateFieldGet(this, _YargsInstance_options, "f").hiddenOptions.push(key);
    return this;
  }
  implies(key, value) {
    argsert("<string|object> [number|string|array]", [key, value], arguments.length);
    __classPrivateFieldGet(this, _YargsInstance_validation, "f").implies(key, value);
    return this;
  }
  locale(locale) {
    argsert("[string]", [locale], arguments.length);
    if (!locale) {
      this[kGuessLocale]();
      return __classPrivateFieldGet(this, _YargsInstance_shim, "f").y18n.getLocale();
    }
    __classPrivateFieldSet(this, _YargsInstance_detectLocale, false, "f");
    __classPrivateFieldGet(this, _YargsInstance_shim, "f").y18n.setLocale(locale);
    return this;
  }
  middleware(callback, applyBeforeValidation, global) {
    return __classPrivateFieldGet(this, _YargsInstance_globalMiddleware, "f").addMiddleware(callback, !!applyBeforeValidation, global);
  }
  nargs(key, value) {
    argsert("<string|object|array> [number]", [key, value], arguments.length);
    this[kPopulateParserHintSingleValueDictionary](this.nargs.bind(this), "narg", key, value);
    return this;
  }
  normalize(keys2) {
    argsert("<array|string>", [keys2], arguments.length);
    this[kPopulateParserHintArray]("normalize", keys2);
    return this;
  }
  number(keys2) {
    argsert("<array|string>", [keys2], arguments.length);
    this[kPopulateParserHintArray]("number", keys2);
    this[kTrackManuallySetKeys](keys2);
    return this;
  }
  option(key, opt) {
    argsert("<string|object> [object]", [key, opt], arguments.length);
    if (typeof key === "object") {
      Object.keys(key).forEach((k) => {
        this.options(k, key[k]);
      });
    } else {
      if (typeof opt !== "object") {
        opt = {};
      }
      this[kTrackManuallySetKeys](key);
      if (__classPrivateFieldGet(this, _YargsInstance_versionOpt, "f") && (key === "version" || (opt === null || opt === void 0 ? void 0 : opt.alias) === "version")) {
        this[kEmitWarning]([
          '"version" is a reserved word.',
          "Please do one of the following:",
          '- Disable version with `yargs.version(false)` if using "version" as an option',
          "- Use the built-in `yargs.version` method instead (if applicable)",
          "- Use a different option key",
          "https://yargs.js.org/docs/#api-reference-version"
        ].join("\n"), void 0, "versionWarning");
      }
      __classPrivateFieldGet(this, _YargsInstance_options, "f").key[key] = true;
      if (opt.alias)
        this.alias(key, opt.alias);
      const deprecate = opt.deprecate || opt.deprecated;
      if (deprecate) {
        this.deprecateOption(key, deprecate);
      }
      const demand = opt.demand || opt.required || opt.require;
      if (demand) {
        this.demand(key, demand);
      }
      if (opt.demandOption) {
        this.demandOption(key, typeof opt.demandOption === "string" ? opt.demandOption : void 0);
      }
      if (opt.conflicts) {
        this.conflicts(key, opt.conflicts);
      }
      if ("default" in opt) {
        this.default(key, opt.default);
      }
      if (opt.implies !== void 0) {
        this.implies(key, opt.implies);
      }
      if (opt.nargs !== void 0) {
        this.nargs(key, opt.nargs);
      }
      if (opt.config) {
        this.config(key, opt.configParser);
      }
      if (opt.normalize) {
        this.normalize(key);
      }
      if (opt.choices) {
        this.choices(key, opt.choices);
      }
      if (opt.coerce) {
        this.coerce(key, opt.coerce);
      }
      if (opt.group) {
        this.group(key, opt.group);
      }
      if (opt.boolean || opt.type === "boolean") {
        this.boolean(key);
        if (opt.alias)
          this.boolean(opt.alias);
      }
      if (opt.array || opt.type === "array") {
        this.array(key);
        if (opt.alias)
          this.array(opt.alias);
      }
      if (opt.number || opt.type === "number") {
        this.number(key);
        if (opt.alias)
          this.number(opt.alias);
      }
      if (opt.string || opt.type === "string") {
        this.string(key);
        if (opt.alias)
          this.string(opt.alias);
      }
      if (opt.count || opt.type === "count") {
        this.count(key);
      }
      if (typeof opt.global === "boolean") {
        this.global(key, opt.global);
      }
      if (opt.defaultDescription) {
        __classPrivateFieldGet(this, _YargsInstance_options, "f").defaultDescription[key] = opt.defaultDescription;
      }
      if (opt.skipValidation) {
        this.skipValidation(key);
      }
      const desc = opt.describe || opt.description || opt.desc;
      this.describe(key, desc);
      if (opt.hidden) {
        this.hide(key);
      }
      if (opt.requiresArg) {
        this.requiresArg(key);
      }
    }
    return this;
  }
  options(key, opt) {
    return this.option(key, opt);
  }
  parse(args, shortCircuit, _parseFn) {
    argsert("[string|array] [function|boolean|object] [function]", [args, shortCircuit, _parseFn], arguments.length);
    this[kFreeze]();
    if (typeof args === "undefined") {
      args = __classPrivateFieldGet(this, _YargsInstance_processArgs, "f");
    }
    if (typeof shortCircuit === "object") {
      __classPrivateFieldSet(this, _YargsInstance_parseContext, shortCircuit, "f");
      shortCircuit = _parseFn;
    }
    if (typeof shortCircuit === "function") {
      __classPrivateFieldSet(this, _YargsInstance_parseFn, shortCircuit, "f");
      shortCircuit = false;
    }
    if (!shortCircuit)
      __classPrivateFieldSet(this, _YargsInstance_processArgs, args, "f");
    if (__classPrivateFieldGet(this, _YargsInstance_parseFn, "f"))
      __classPrivateFieldSet(this, _YargsInstance_exitProcess, false, "f");
    const parsed = this[kRunYargsParserAndExecuteCommands](args, !!shortCircuit);
    const tmpParsed = this.parsed;
    __classPrivateFieldGet(this, _YargsInstance_completion, "f").setParsed(this.parsed);
    if (isPromise(parsed)) {
      return parsed.then((argv) => {
        if (__classPrivateFieldGet(this, _YargsInstance_parseFn, "f"))
          __classPrivateFieldGet(this, _YargsInstance_parseFn, "f").call(this, __classPrivateFieldGet(this, _YargsInstance_exitError, "f"), argv, __classPrivateFieldGet(this, _YargsInstance_output, "f"));
        return argv;
      }).catch((err) => {
        if (__classPrivateFieldGet(this, _YargsInstance_parseFn, "f")) {
          __classPrivateFieldGet(this, _YargsInstance_parseFn, "f")(err, this.parsed.argv, __classPrivateFieldGet(this, _YargsInstance_output, "f"));
        }
        throw err;
      }).finally(() => {
        this[kUnfreeze]();
        this.parsed = tmpParsed;
      });
    } else {
      if (__classPrivateFieldGet(this, _YargsInstance_parseFn, "f"))
        __classPrivateFieldGet(this, _YargsInstance_parseFn, "f").call(this, __classPrivateFieldGet(this, _YargsInstance_exitError, "f"), parsed, __classPrivateFieldGet(this, _YargsInstance_output, "f"));
      this[kUnfreeze]();
      this.parsed = tmpParsed;
    }
    return parsed;
  }
  parseAsync(args, shortCircuit, _parseFn) {
    const maybePromise = this.parse(args, shortCircuit, _parseFn);
    return !isPromise(maybePromise) ? Promise.resolve(maybePromise) : maybePromise;
  }
  parseSync(args, shortCircuit, _parseFn) {
    const maybePromise = this.parse(args, shortCircuit, _parseFn);
    if (isPromise(maybePromise)) {
      throw new YError(".parseSync() must not be used with asynchronous builders, handlers, or middleware");
    }
    return maybePromise;
  }
  parserConfiguration(config) {
    argsert("<object>", [config], arguments.length);
    __classPrivateFieldSet(this, _YargsInstance_parserConfig, config, "f");
    return this;
  }
  pkgConf(key, rootPath) {
    argsert("<string> [string]", [key, rootPath], arguments.length);
    let conf = null;
    const obj = this[kPkgUp](rootPath || __classPrivateFieldGet(this, _YargsInstance_cwd, "f"));
    if (obj[key] && typeof obj[key] === "object") {
      conf = applyExtends(obj[key], rootPath || __classPrivateFieldGet(this, _YargsInstance_cwd, "f"), this[kGetParserConfiguration]()["deep-merge-config"] || false, __classPrivateFieldGet(this, _YargsInstance_shim, "f"));
      __classPrivateFieldGet(this, _YargsInstance_options, "f").configObjects = (__classPrivateFieldGet(this, _YargsInstance_options, "f").configObjects || []).concat(conf);
    }
    return this;
  }
  positional(key, opts) {
    argsert("<string> <object>", [key, opts], arguments.length);
    const supportedOpts = [
      "default",
      "defaultDescription",
      "implies",
      "normalize",
      "choices",
      "conflicts",
      "coerce",
      "type",
      "describe",
      "desc",
      "description",
      "alias"
    ];
    opts = objFilter(opts, (k, v) => {
      if (k === "type" && !["string", "number", "boolean"].includes(v))
        return false;
      return supportedOpts.includes(k);
    });
    const fullCommand = __classPrivateFieldGet(this, _YargsInstance_context, "f").fullCommands[__classPrivateFieldGet(this, _YargsInstance_context, "f").fullCommands.length - 1];
    const parseOptions = fullCommand ? __classPrivateFieldGet(this, _YargsInstance_command, "f").cmdToParseOptions(fullCommand) : {
      array: [],
      alias: {},
      default: {},
      demand: {}
    };
    objectKeys(parseOptions).forEach((pk) => {
      const parseOption = parseOptions[pk];
      if (Array.isArray(parseOption)) {
        if (parseOption.indexOf(key) !== -1)
          opts[pk] = true;
      } else {
        if (parseOption[key] && !(pk in opts))
          opts[pk] = parseOption[key];
      }
    });
    this.group(key, __classPrivateFieldGet(this, _YargsInstance_usage, "f").getPositionalGroupName());
    return this.option(key, opts);
  }
  recommendCommands(recommend = true) {
    argsert("[boolean]", [recommend], arguments.length);
    __classPrivateFieldSet(this, _YargsInstance_recommendCommands, recommend, "f");
    return this;
  }
  required(keys2, max, msg) {
    return this.demand(keys2, max, msg);
  }
  require(keys2, max, msg) {
    return this.demand(keys2, max, msg);
  }
  requiresArg(keys2) {
    argsert("<array|string|object> [number]", [keys2], arguments.length);
    if (typeof keys2 === "string" && __classPrivateFieldGet(this, _YargsInstance_options, "f").narg[keys2]) {
      return this;
    } else {
      this[kPopulateParserHintSingleValueDictionary](this.requiresArg.bind(this), "narg", keys2, NaN);
    }
    return this;
  }
  showCompletionScript($0, cmd) {
    argsert("[string] [string]", [$0, cmd], arguments.length);
    $0 = $0 || this.$0;
    __classPrivateFieldGet(this, _YargsInstance_logger, "f").log(__classPrivateFieldGet(this, _YargsInstance_completion, "f").generateCompletionScript($0, cmd || __classPrivateFieldGet(this, _YargsInstance_completionCommand, "f") || "completion"));
    return this;
  }
  showHelp(level) {
    argsert("[string|function]", [level], arguments.length);
    __classPrivateFieldSet(this, _YargsInstance_hasOutput, true, "f");
    if (!__classPrivateFieldGet(this, _YargsInstance_usage, "f").hasCachedHelpMessage()) {
      if (!this.parsed) {
        const parse = this[kRunYargsParserAndExecuteCommands](__classPrivateFieldGet(this, _YargsInstance_processArgs, "f"), void 0, void 0, 0, true);
        if (isPromise(parse)) {
          parse.then(() => {
            __classPrivateFieldGet(this, _YargsInstance_usage, "f").showHelp(level);
          });
          return this;
        }
      }
      const builderResponse = __classPrivateFieldGet(this, _YargsInstance_command, "f").runDefaultBuilderOn(this);
      if (isPromise(builderResponse)) {
        builderResponse.then(() => {
          __classPrivateFieldGet(this, _YargsInstance_usage, "f").showHelp(level);
        });
        return this;
      }
    }
    __classPrivateFieldGet(this, _YargsInstance_usage, "f").showHelp(level);
    return this;
  }
  scriptName(scriptName) {
    this.customScriptName = true;
    this.$0 = scriptName;
    return this;
  }
  showHelpOnFail(enabled, message) {
    argsert("[boolean|string] [string]", [enabled, message], arguments.length);
    __classPrivateFieldGet(this, _YargsInstance_usage, "f").showHelpOnFail(enabled, message);
    return this;
  }
  showVersion(level) {
    argsert("[string|function]", [level], arguments.length);
    __classPrivateFieldGet(this, _YargsInstance_usage, "f").showVersion(level);
    return this;
  }
  skipValidation(keys2) {
    argsert("<array|string>", [keys2], arguments.length);
    this[kPopulateParserHintArray]("skipValidation", keys2);
    return this;
  }
  strict(enabled) {
    argsert("[boolean]", [enabled], arguments.length);
    __classPrivateFieldSet(this, _YargsInstance_strict, enabled !== false, "f");
    return this;
  }
  strictCommands(enabled) {
    argsert("[boolean]", [enabled], arguments.length);
    __classPrivateFieldSet(this, _YargsInstance_strictCommands, enabled !== false, "f");
    return this;
  }
  strictOptions(enabled) {
    argsert("[boolean]", [enabled], arguments.length);
    __classPrivateFieldSet(this, _YargsInstance_strictOptions, enabled !== false, "f");
    return this;
  }
  string(keys2) {
    argsert("<array|string>", [keys2], arguments.length);
    this[kPopulateParserHintArray]("string", keys2);
    this[kTrackManuallySetKeys](keys2);
    return this;
  }
  terminalWidth() {
    argsert([], 0);
    return __classPrivateFieldGet(this, _YargsInstance_shim, "f").process.stdColumns;
  }
  updateLocale(obj) {
    return this.updateStrings(obj);
  }
  updateStrings(obj) {
    argsert("<object>", [obj], arguments.length);
    __classPrivateFieldSet(this, _YargsInstance_detectLocale, false, "f");
    __classPrivateFieldGet(this, _YargsInstance_shim, "f").y18n.updateLocale(obj);
    return this;
  }
  usage(msg, description, builder, handler) {
    argsert("<string|null|undefined> [string|boolean] [function|object] [function]", [msg, description, builder, handler], arguments.length);
    if (description !== void 0) {
      assertNotStrictEqual(msg, null, __classPrivateFieldGet(this, _YargsInstance_shim, "f"));
      if ((msg || "").match(/^\$0( |$)/)) {
        return this.command(msg, description, builder, handler);
      } else {
        throw new YError(".usage() description must start with $0 if being used as alias for .command()");
      }
    } else {
      __classPrivateFieldGet(this, _YargsInstance_usage, "f").usage(msg);
      return this;
    }
  }
  version(opt, msg, ver) {
    const defaultVersionOpt = "version";
    argsert("[boolean|string] [string] [string]", [opt, msg, ver], arguments.length);
    if (__classPrivateFieldGet(this, _YargsInstance_versionOpt, "f")) {
      this[kDeleteFromParserHintObject](__classPrivateFieldGet(this, _YargsInstance_versionOpt, "f"));
      __classPrivateFieldGet(this, _YargsInstance_usage, "f").version(void 0);
      __classPrivateFieldSet(this, _YargsInstance_versionOpt, null, "f");
    }
    if (arguments.length === 0) {
      ver = this[kGuessVersion]();
      opt = defaultVersionOpt;
    } else if (arguments.length === 1) {
      if (opt === false) {
        return this;
      }
      ver = opt;
      opt = defaultVersionOpt;
    } else if (arguments.length === 2) {
      ver = msg;
      msg = void 0;
    }
    __classPrivateFieldSet(this, _YargsInstance_versionOpt, typeof opt === "string" ? opt : defaultVersionOpt, "f");
    msg = msg || __classPrivateFieldGet(this, _YargsInstance_usage, "f").deferY18nLookup("Show version number");
    __classPrivateFieldGet(this, _YargsInstance_usage, "f").version(ver || void 0);
    this.boolean(__classPrivateFieldGet(this, _YargsInstance_versionOpt, "f"));
    this.describe(__classPrivateFieldGet(this, _YargsInstance_versionOpt, "f"), msg);
    return this;
  }
  wrap(cols) {
    argsert("<number|null|undefined>", [cols], arguments.length);
    __classPrivateFieldGet(this, _YargsInstance_usage, "f").wrap(cols);
    return this;
  }
  [(_YargsInstance_command = /* @__PURE__ */ new WeakMap(), _YargsInstance_cwd = /* @__PURE__ */ new WeakMap(), _YargsInstance_context = /* @__PURE__ */ new WeakMap(), _YargsInstance_completion = /* @__PURE__ */ new WeakMap(), _YargsInstance_completionCommand = /* @__PURE__ */ new WeakMap(), _YargsInstance_defaultShowHiddenOpt = /* @__PURE__ */ new WeakMap(), _YargsInstance_exitError = /* @__PURE__ */ new WeakMap(), _YargsInstance_detectLocale = /* @__PURE__ */ new WeakMap(), _YargsInstance_emittedWarnings = /* @__PURE__ */ new WeakMap(), _YargsInstance_exitProcess = /* @__PURE__ */ new WeakMap(), _YargsInstance_frozens = /* @__PURE__ */ new WeakMap(), _YargsInstance_globalMiddleware = /* @__PURE__ */ new WeakMap(), _YargsInstance_groups = /* @__PURE__ */ new WeakMap(), _YargsInstance_hasOutput = /* @__PURE__ */ new WeakMap(), _YargsInstance_helpOpt = /* @__PURE__ */ new WeakMap(), _YargsInstance_logger = /* @__PURE__ */ new WeakMap(), _YargsInstance_output = /* @__PURE__ */ new WeakMap(), _YargsInstance_options = /* @__PURE__ */ new WeakMap(), _YargsInstance_parentRequire = /* @__PURE__ */ new WeakMap(), _YargsInstance_parserConfig = /* @__PURE__ */ new WeakMap(), _YargsInstance_parseFn = /* @__PURE__ */ new WeakMap(), _YargsInstance_parseContext = /* @__PURE__ */ new WeakMap(), _YargsInstance_pkgs = /* @__PURE__ */ new WeakMap(), _YargsInstance_preservedGroups = /* @__PURE__ */ new WeakMap(), _YargsInstance_processArgs = /* @__PURE__ */ new WeakMap(), _YargsInstance_recommendCommands = /* @__PURE__ */ new WeakMap(), _YargsInstance_shim = /* @__PURE__ */ new WeakMap(), _YargsInstance_strict = /* @__PURE__ */ new WeakMap(), _YargsInstance_strictCommands = /* @__PURE__ */ new WeakMap(), _YargsInstance_strictOptions = /* @__PURE__ */ new WeakMap(), _YargsInstance_usage = /* @__PURE__ */ new WeakMap(), _YargsInstance_versionOpt = /* @__PURE__ */ new WeakMap(), _YargsInstance_validation = /* @__PURE__ */ new WeakMap(), kCopyDoubleDash)](argv) {
    if (!argv._ || !argv["--"])
      return argv;
    argv._.push.apply(argv._, argv["--"]);
    try {
      delete argv["--"];
    } catch (_err) {
    }
    return argv;
  }
  [kCreateLogger]() {
    return {
      log: (...args) => {
        if (!this[kHasParseCallback]())
          console.log(...args);
        __classPrivateFieldSet(this, _YargsInstance_hasOutput, true, "f");
        if (__classPrivateFieldGet(this, _YargsInstance_output, "f").length)
          __classPrivateFieldSet(this, _YargsInstance_output, __classPrivateFieldGet(this, _YargsInstance_output, "f") + "\n", "f");
        __classPrivateFieldSet(this, _YargsInstance_output, __classPrivateFieldGet(this, _YargsInstance_output, "f") + args.join(" "), "f");
      },
      error: (...args) => {
        if (!this[kHasParseCallback]())
          console.error(...args);
        __classPrivateFieldSet(this, _YargsInstance_hasOutput, true, "f");
        if (__classPrivateFieldGet(this, _YargsInstance_output, "f").length)
          __classPrivateFieldSet(this, _YargsInstance_output, __classPrivateFieldGet(this, _YargsInstance_output, "f") + "\n", "f");
        __classPrivateFieldSet(this, _YargsInstance_output, __classPrivateFieldGet(this, _YargsInstance_output, "f") + args.join(" "), "f");
      }
    };
  }
  [kDeleteFromParserHintObject](optionKey) {
    objectKeys(__classPrivateFieldGet(this, _YargsInstance_options, "f")).forEach((hintKey) => {
      if (((key) => key === "configObjects")(hintKey))
        return;
      const hint = __classPrivateFieldGet(this, _YargsInstance_options, "f")[hintKey];
      if (Array.isArray(hint)) {
        if (hint.includes(optionKey))
          hint.splice(hint.indexOf(optionKey), 1);
      } else if (typeof hint === "object") {
        delete hint[optionKey];
      }
    });
    delete __classPrivateFieldGet(this, _YargsInstance_usage, "f").getDescriptions()[optionKey];
  }
  [kEmitWarning](warning, type, deduplicationId) {
    if (!__classPrivateFieldGet(this, _YargsInstance_emittedWarnings, "f")[deduplicationId]) {
      __classPrivateFieldGet(this, _YargsInstance_shim, "f").process.emitWarning(warning, type);
      __classPrivateFieldGet(this, _YargsInstance_emittedWarnings, "f")[deduplicationId] = true;
    }
  }
  [kFreeze]() {
    __classPrivateFieldGet(this, _YargsInstance_frozens, "f").push({
      options: __classPrivateFieldGet(this, _YargsInstance_options, "f"),
      configObjects: __classPrivateFieldGet(this, _YargsInstance_options, "f").configObjects.slice(0),
      exitProcess: __classPrivateFieldGet(this, _YargsInstance_exitProcess, "f"),
      groups: __classPrivateFieldGet(this, _YargsInstance_groups, "f"),
      strict: __classPrivateFieldGet(this, _YargsInstance_strict, "f"),
      strictCommands: __classPrivateFieldGet(this, _YargsInstance_strictCommands, "f"),
      strictOptions: __classPrivateFieldGet(this, _YargsInstance_strictOptions, "f"),
      completionCommand: __classPrivateFieldGet(this, _YargsInstance_completionCommand, "f"),
      output: __classPrivateFieldGet(this, _YargsInstance_output, "f"),
      exitError: __classPrivateFieldGet(this, _YargsInstance_exitError, "f"),
      hasOutput: __classPrivateFieldGet(this, _YargsInstance_hasOutput, "f"),
      parsed: this.parsed,
      parseFn: __classPrivateFieldGet(this, _YargsInstance_parseFn, "f"),
      parseContext: __classPrivateFieldGet(this, _YargsInstance_parseContext, "f")
    });
    __classPrivateFieldGet(this, _YargsInstance_usage, "f").freeze();
    __classPrivateFieldGet(this, _YargsInstance_validation, "f").freeze();
    __classPrivateFieldGet(this, _YargsInstance_command, "f").freeze();
    __classPrivateFieldGet(this, _YargsInstance_globalMiddleware, "f").freeze();
  }
  [kGetDollarZero]() {
    let $0 = "";
    let default$0;
    if (/\b(node|iojs|electron)(\.exe)?$/.test(__classPrivateFieldGet(this, _YargsInstance_shim, "f").process.argv()[0])) {
      default$0 = __classPrivateFieldGet(this, _YargsInstance_shim, "f").process.argv().slice(1, 2);
    } else {
      default$0 = __classPrivateFieldGet(this, _YargsInstance_shim, "f").process.argv().slice(0, 1);
    }
    $0 = default$0.map((x) => {
      const b = this[kRebase](__classPrivateFieldGet(this, _YargsInstance_cwd, "f"), x);
      return x.match(/^(\/|([a-zA-Z]:)?\\)/) && b.length < x.length ? b : x;
    }).join(" ").trim();
    if (__classPrivateFieldGet(this, _YargsInstance_shim, "f").getEnv("_") && __classPrivateFieldGet(this, _YargsInstance_shim, "f").getProcessArgvBin() === __classPrivateFieldGet(this, _YargsInstance_shim, "f").getEnv("_")) {
      $0 = __classPrivateFieldGet(this, _YargsInstance_shim, "f").getEnv("_").replace(`${__classPrivateFieldGet(this, _YargsInstance_shim, "f").path.dirname(__classPrivateFieldGet(this, _YargsInstance_shim, "f").process.execPath())}/`, "");
    }
    return $0;
  }
  [kGetParserConfiguration]() {
    return __classPrivateFieldGet(this, _YargsInstance_parserConfig, "f");
  }
  [kGuessLocale]() {
    if (!__classPrivateFieldGet(this, _YargsInstance_detectLocale, "f"))
      return;
    const locale = __classPrivateFieldGet(this, _YargsInstance_shim, "f").getEnv("LC_ALL") || __classPrivateFieldGet(this, _YargsInstance_shim, "f").getEnv("LC_MESSAGES") || __classPrivateFieldGet(this, _YargsInstance_shim, "f").getEnv("LANG") || __classPrivateFieldGet(this, _YargsInstance_shim, "f").getEnv("LANGUAGE") || "en_US";
    this.locale(locale.replace(/[.:].*/, ""));
  }
  [kGuessVersion]() {
    const obj = this[kPkgUp]();
    return obj.version || "unknown";
  }
  [kParsePositionalNumbers](argv) {
    const args = argv["--"] ? argv["--"] : argv._;
    for (let i = 0, arg; (arg = args[i]) !== void 0; i++) {
      if (__classPrivateFieldGet(this, _YargsInstance_shim, "f").Parser.looksLikeNumber(arg) && Number.isSafeInteger(Math.floor(parseFloat(`${arg}`)))) {
        args[i] = Number(arg);
      }
    }
    return argv;
  }
  [kPkgUp](rootPath) {
    const npath = rootPath || "*";
    if (__classPrivateFieldGet(this, _YargsInstance_pkgs, "f")[npath])
      return __classPrivateFieldGet(this, _YargsInstance_pkgs, "f")[npath];
    let obj = {};
    try {
      let startDir = rootPath || __classPrivateFieldGet(this, _YargsInstance_shim, "f").mainFilename;
      if (!rootPath && __classPrivateFieldGet(this, _YargsInstance_shim, "f").path.extname(startDir)) {
        startDir = __classPrivateFieldGet(this, _YargsInstance_shim, "f").path.dirname(startDir);
      }
      const pkgJsonPath = __classPrivateFieldGet(this, _YargsInstance_shim, "f").findUp(startDir, (dir, names) => {
        if (names.includes("package.json")) {
          return "package.json";
        } else {
          return void 0;
        }
      });
      assertNotStrictEqual(pkgJsonPath, void 0, __classPrivateFieldGet(this, _YargsInstance_shim, "f"));
      obj = JSON.parse(__classPrivateFieldGet(this, _YargsInstance_shim, "f").readFileSync(pkgJsonPath, "utf8"));
    } catch (_noop) {
    }
    __classPrivateFieldGet(this, _YargsInstance_pkgs, "f")[npath] = obj || {};
    return __classPrivateFieldGet(this, _YargsInstance_pkgs, "f")[npath];
  }
  [kPopulateParserHintArray](type, keys2) {
    keys2 = [].concat(keys2);
    keys2.forEach((key) => {
      key = this[kSanitizeKey](key);
      __classPrivateFieldGet(this, _YargsInstance_options, "f")[type].push(key);
    });
  }
  [kPopulateParserHintSingleValueDictionary](builder, type, key, value) {
    this[kPopulateParserHintDictionary](builder, type, key, value, (type2, key2, value2) => {
      __classPrivateFieldGet(this, _YargsInstance_options, "f")[type2][key2] = value2;
    });
  }
  [kPopulateParserHintArrayDictionary](builder, type, key, value) {
    this[kPopulateParserHintDictionary](builder, type, key, value, (type2, key2, value2) => {
      __classPrivateFieldGet(this, _YargsInstance_options, "f")[type2][key2] = (__classPrivateFieldGet(this, _YargsInstance_options, "f")[type2][key2] || []).concat(value2);
    });
  }
  [kPopulateParserHintDictionary](builder, type, key, value, singleKeyHandler) {
    if (Array.isArray(key)) {
      key.forEach((k) => {
        builder(k, value);
      });
    } else if (((key2) => typeof key2 === "object")(key)) {
      for (const k of objectKeys(key)) {
        builder(k, key[k]);
      }
    } else {
      singleKeyHandler(type, this[kSanitizeKey](key), value);
    }
  }
  [kSanitizeKey](key) {
    if (key === "__proto__")
      return "___proto___";
    return key;
  }
  [kSetKey](key, set) {
    this[kPopulateParserHintSingleValueDictionary](this[kSetKey].bind(this), "key", key, set);
    return this;
  }
  [kUnfreeze]() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const frozen = __classPrivateFieldGet(this, _YargsInstance_frozens, "f").pop();
    assertNotStrictEqual(frozen, void 0, __classPrivateFieldGet(this, _YargsInstance_shim, "f"));
    let configObjects;
    _a = this, _b = this, _c = this, _d = this, _e = this, _f = this, _g = this, _h = this, _j = this, _k = this, _l = this, _m = this, {
      options: { set value(_o) {
        __classPrivateFieldSet(_a, _YargsInstance_options, _o, "f");
      } }.value,
      configObjects,
      exitProcess: { set value(_o) {
        __classPrivateFieldSet(_b, _YargsInstance_exitProcess, _o, "f");
      } }.value,
      groups: { set value(_o) {
        __classPrivateFieldSet(_c, _YargsInstance_groups, _o, "f");
      } }.value,
      output: { set value(_o) {
        __classPrivateFieldSet(_d, _YargsInstance_output, _o, "f");
      } }.value,
      exitError: { set value(_o) {
        __classPrivateFieldSet(_e, _YargsInstance_exitError, _o, "f");
      } }.value,
      hasOutput: { set value(_o) {
        __classPrivateFieldSet(_f, _YargsInstance_hasOutput, _o, "f");
      } }.value,
      parsed: this.parsed,
      strict: { set value(_o) {
        __classPrivateFieldSet(_g, _YargsInstance_strict, _o, "f");
      } }.value,
      strictCommands: { set value(_o) {
        __classPrivateFieldSet(_h, _YargsInstance_strictCommands, _o, "f");
      } }.value,
      strictOptions: { set value(_o) {
        __classPrivateFieldSet(_j, _YargsInstance_strictOptions, _o, "f");
      } }.value,
      completionCommand: { set value(_o) {
        __classPrivateFieldSet(_k, _YargsInstance_completionCommand, _o, "f");
      } }.value,
      parseFn: { set value(_o) {
        __classPrivateFieldSet(_l, _YargsInstance_parseFn, _o, "f");
      } }.value,
      parseContext: { set value(_o) {
        __classPrivateFieldSet(_m, _YargsInstance_parseContext, _o, "f");
      } }.value
    } = frozen;
    __classPrivateFieldGet(this, _YargsInstance_options, "f").configObjects = configObjects;
    __classPrivateFieldGet(this, _YargsInstance_usage, "f").unfreeze();
    __classPrivateFieldGet(this, _YargsInstance_validation, "f").unfreeze();
    __classPrivateFieldGet(this, _YargsInstance_command, "f").unfreeze();
    __classPrivateFieldGet(this, _YargsInstance_globalMiddleware, "f").unfreeze();
  }
  [kValidateAsync](validation2, argv) {
    return maybeAsyncResult(argv, (result) => {
      validation2(result);
      return result;
    });
  }
  getInternalMethods() {
    return {
      getCommandInstance: this[kGetCommandInstance].bind(this),
      getContext: this[kGetContext].bind(this),
      getHasOutput: this[kGetHasOutput].bind(this),
      getLoggerInstance: this[kGetLoggerInstance].bind(this),
      getParseContext: this[kGetParseContext].bind(this),
      getParserConfiguration: this[kGetParserConfiguration].bind(this),
      getUsageInstance: this[kGetUsageInstance].bind(this),
      getValidationInstance: this[kGetValidationInstance].bind(this),
      hasParseCallback: this[kHasParseCallback].bind(this),
      postProcess: this[kPostProcess].bind(this),
      reset: this[kReset].bind(this),
      runValidation: this[kRunValidation].bind(this),
      runYargsParserAndExecuteCommands: this[kRunYargsParserAndExecuteCommands].bind(this),
      setHasOutput: this[kSetHasOutput].bind(this)
    };
  }
  [kGetCommandInstance]() {
    return __classPrivateFieldGet(this, _YargsInstance_command, "f");
  }
  [kGetContext]() {
    return __classPrivateFieldGet(this, _YargsInstance_context, "f");
  }
  [kGetHasOutput]() {
    return __classPrivateFieldGet(this, _YargsInstance_hasOutput, "f");
  }
  [kGetLoggerInstance]() {
    return __classPrivateFieldGet(this, _YargsInstance_logger, "f");
  }
  [kGetParseContext]() {
    return __classPrivateFieldGet(this, _YargsInstance_parseContext, "f") || {};
  }
  [kGetUsageInstance]() {
    return __classPrivateFieldGet(this, _YargsInstance_usage, "f");
  }
  [kGetValidationInstance]() {
    return __classPrivateFieldGet(this, _YargsInstance_validation, "f");
  }
  [kHasParseCallback]() {
    return !!__classPrivateFieldGet(this, _YargsInstance_parseFn, "f");
  }
  [kPostProcess](argv, populateDoubleDash, calledFromCommand, runGlobalMiddleware) {
    if (calledFromCommand)
      return argv;
    if (isPromise(argv))
      return argv;
    if (!populateDoubleDash) {
      argv = this[kCopyDoubleDash](argv);
    }
    const parsePositionalNumbers = this[kGetParserConfiguration]()["parse-positional-numbers"] || this[kGetParserConfiguration]()["parse-positional-numbers"] === void 0;
    if (parsePositionalNumbers) {
      argv = this[kParsePositionalNumbers](argv);
    }
    if (runGlobalMiddleware) {
      argv = applyMiddleware(argv, this, __classPrivateFieldGet(this, _YargsInstance_globalMiddleware, "f").getMiddleware(), false);
    }
    return argv;
  }
  [kReset](aliases = {}) {
    __classPrivateFieldSet(this, _YargsInstance_options, __classPrivateFieldGet(this, _YargsInstance_options, "f") || {}, "f");
    const tmpOptions = {};
    tmpOptions.local = __classPrivateFieldGet(this, _YargsInstance_options, "f").local || [];
    tmpOptions.configObjects = __classPrivateFieldGet(this, _YargsInstance_options, "f").configObjects || [];
    const localLookup = {};
    tmpOptions.local.forEach((l) => {
      localLookup[l] = true;
      (aliases[l] || []).forEach((a) => {
        localLookup[a] = true;
      });
    });
    Object.assign(__classPrivateFieldGet(this, _YargsInstance_preservedGroups, "f"), Object.keys(__classPrivateFieldGet(this, _YargsInstance_groups, "f")).reduce((acc, groupName) => {
      const keys2 = __classPrivateFieldGet(this, _YargsInstance_groups, "f")[groupName].filter((key) => !(key in localLookup));
      if (keys2.length > 0) {
        acc[groupName] = keys2;
      }
      return acc;
    }, {}));
    __classPrivateFieldSet(this, _YargsInstance_groups, {}, "f");
    const arrayOptions = [
      "array",
      "boolean",
      "string",
      "skipValidation",
      "count",
      "normalize",
      "number",
      "hiddenOptions"
    ];
    const objectOptions = [
      "narg",
      "key",
      "alias",
      "default",
      "defaultDescription",
      "config",
      "choices",
      "demandedOptions",
      "demandedCommands",
      "deprecatedOptions"
    ];
    arrayOptions.forEach((k) => {
      tmpOptions[k] = (__classPrivateFieldGet(this, _YargsInstance_options, "f")[k] || []).filter((k2) => !localLookup[k2]);
    });
    objectOptions.forEach((k) => {
      tmpOptions[k] = objFilter(__classPrivateFieldGet(this, _YargsInstance_options, "f")[k], (k2) => !localLookup[k2]);
    });
    tmpOptions.envPrefix = __classPrivateFieldGet(this, _YargsInstance_options, "f").envPrefix;
    __classPrivateFieldSet(this, _YargsInstance_options, tmpOptions, "f");
    __classPrivateFieldSet(this, _YargsInstance_usage, __classPrivateFieldGet(this, _YargsInstance_usage, "f") ? __classPrivateFieldGet(this, _YargsInstance_usage, "f").reset(localLookup) : usage(this, __classPrivateFieldGet(this, _YargsInstance_shim, "f")), "f");
    __classPrivateFieldSet(this, _YargsInstance_validation, __classPrivateFieldGet(this, _YargsInstance_validation, "f") ? __classPrivateFieldGet(this, _YargsInstance_validation, "f").reset(localLookup) : validation(this, __classPrivateFieldGet(this, _YargsInstance_usage, "f"), __classPrivateFieldGet(this, _YargsInstance_shim, "f")), "f");
    __classPrivateFieldSet(this, _YargsInstance_command, __classPrivateFieldGet(this, _YargsInstance_command, "f") ? __classPrivateFieldGet(this, _YargsInstance_command, "f").reset() : command(__classPrivateFieldGet(this, _YargsInstance_usage, "f"), __classPrivateFieldGet(this, _YargsInstance_validation, "f"), __classPrivateFieldGet(this, _YargsInstance_globalMiddleware, "f"), __classPrivateFieldGet(this, _YargsInstance_shim, "f")), "f");
    if (!__classPrivateFieldGet(this, _YargsInstance_completion, "f"))
      __classPrivateFieldSet(this, _YargsInstance_completion, completion(this, __classPrivateFieldGet(this, _YargsInstance_usage, "f"), __classPrivateFieldGet(this, _YargsInstance_command, "f"), __classPrivateFieldGet(this, _YargsInstance_shim, "f")), "f");
    __classPrivateFieldGet(this, _YargsInstance_globalMiddleware, "f").reset();
    __classPrivateFieldSet(this, _YargsInstance_completionCommand, null, "f");
    __classPrivateFieldSet(this, _YargsInstance_output, "", "f");
    __classPrivateFieldSet(this, _YargsInstance_exitError, null, "f");
    __classPrivateFieldSet(this, _YargsInstance_hasOutput, false, "f");
    this.parsed = false;
    return this;
  }
  [kRebase](base, dir) {
    return __classPrivateFieldGet(this, _YargsInstance_shim, "f").path.relative(base, dir);
  }
  [kRunYargsParserAndExecuteCommands](args, shortCircuit, calledFromCommand, commandIndex = 0, helpOnly = false) {
    let skipValidation = !!calledFromCommand || helpOnly;
    args = args || __classPrivateFieldGet(this, _YargsInstance_processArgs, "f");
    __classPrivateFieldGet(this, _YargsInstance_options, "f").__ = __classPrivateFieldGet(this, _YargsInstance_shim, "f").y18n.__;
    __classPrivateFieldGet(this, _YargsInstance_options, "f").configuration = this[kGetParserConfiguration]();
    const populateDoubleDash = !!__classPrivateFieldGet(this, _YargsInstance_options, "f").configuration["populate--"];
    const config = Object.assign({}, __classPrivateFieldGet(this, _YargsInstance_options, "f").configuration, {
      "populate--": true
    });
    const parsed = __classPrivateFieldGet(this, _YargsInstance_shim, "f").Parser.detailed(args, Object.assign({}, __classPrivateFieldGet(this, _YargsInstance_options, "f"), {
      configuration: { "parse-positional-numbers": false, ...config }
    }));
    const argv = Object.assign(parsed.argv, __classPrivateFieldGet(this, _YargsInstance_parseContext, "f"));
    let argvPromise = void 0;
    const aliases = parsed.aliases;
    let helpOptSet = false;
    let versionOptSet = false;
    Object.keys(argv).forEach((key) => {
      if (key === __classPrivateFieldGet(this, _YargsInstance_helpOpt, "f") && argv[key]) {
        helpOptSet = true;
      } else if (key === __classPrivateFieldGet(this, _YargsInstance_versionOpt, "f") && argv[key]) {
        versionOptSet = true;
      }
    });
    argv.$0 = this.$0;
    this.parsed = parsed;
    if (commandIndex === 0) {
      __classPrivateFieldGet(this, _YargsInstance_usage, "f").clearCachedHelpMessage();
    }
    try {
      this[kGuessLocale]();
      if (shortCircuit) {
        return this[kPostProcess](argv, populateDoubleDash, !!calledFromCommand, false);
      }
      if (__classPrivateFieldGet(this, _YargsInstance_helpOpt, "f")) {
        const helpCmds = [__classPrivateFieldGet(this, _YargsInstance_helpOpt, "f")].concat(aliases[__classPrivateFieldGet(this, _YargsInstance_helpOpt, "f")] || []).filter((k) => k.length > 1);
        if (helpCmds.includes("" + argv._[argv._.length - 1])) {
          argv._.pop();
          helpOptSet = true;
        }
      }
      const handlerKeys = __classPrivateFieldGet(this, _YargsInstance_command, "f").getCommands();
      const requestCompletions = __classPrivateFieldGet(this, _YargsInstance_completion, "f").completionKey in argv;
      const skipRecommendation = helpOptSet || requestCompletions || helpOnly;
      if (argv._.length) {
        if (handlerKeys.length) {
          let firstUnknownCommand;
          for (let i = commandIndex || 0, cmd; argv._[i] !== void 0; i++) {
            cmd = String(argv._[i]);
            if (handlerKeys.includes(cmd) && cmd !== __classPrivateFieldGet(this, _YargsInstance_completionCommand, "f")) {
              const innerArgv = __classPrivateFieldGet(this, _YargsInstance_command, "f").runCommand(cmd, this, parsed, i + 1, helpOnly, helpOptSet || versionOptSet || helpOnly);
              return this[kPostProcess](innerArgv, populateDoubleDash, !!calledFromCommand, false);
            } else if (!firstUnknownCommand && cmd !== __classPrivateFieldGet(this, _YargsInstance_completionCommand, "f")) {
              firstUnknownCommand = cmd;
              break;
            }
          }
          if (!__classPrivateFieldGet(this, _YargsInstance_command, "f").hasDefaultCommand() && __classPrivateFieldGet(this, _YargsInstance_recommendCommands, "f") && firstUnknownCommand && !skipRecommendation) {
            __classPrivateFieldGet(this, _YargsInstance_validation, "f").recommendCommands(firstUnknownCommand, handlerKeys);
          }
        }
        if (__classPrivateFieldGet(this, _YargsInstance_completionCommand, "f") && argv._.includes(__classPrivateFieldGet(this, _YargsInstance_completionCommand, "f")) && !requestCompletions) {
          if (__classPrivateFieldGet(this, _YargsInstance_exitProcess, "f"))
            setBlocking(true);
          this.showCompletionScript();
          this.exit(0);
        }
      }
      if (__classPrivateFieldGet(this, _YargsInstance_command, "f").hasDefaultCommand() && !skipRecommendation) {
        const innerArgv = __classPrivateFieldGet(this, _YargsInstance_command, "f").runCommand(null, this, parsed, 0, helpOnly, helpOptSet || versionOptSet || helpOnly);
        return this[kPostProcess](innerArgv, populateDoubleDash, !!calledFromCommand, false);
      }
      if (requestCompletions) {
        if (__classPrivateFieldGet(this, _YargsInstance_exitProcess, "f"))
          setBlocking(true);
        args = [].concat(args);
        const completionArgs = args.slice(args.indexOf(`--${__classPrivateFieldGet(this, _YargsInstance_completion, "f").completionKey}`) + 1);
        __classPrivateFieldGet(this, _YargsInstance_completion, "f").getCompletion(completionArgs, (err, completions) => {
          if (err)
            throw new YError(err.message);
          (completions || []).forEach((completion2) => {
            __classPrivateFieldGet(this, _YargsInstance_logger, "f").log(completion2);
          });
          this.exit(0);
        });
        return this[kPostProcess](argv, !populateDoubleDash, !!calledFromCommand, false);
      }
      if (!__classPrivateFieldGet(this, _YargsInstance_hasOutput, "f")) {
        if (helpOptSet) {
          if (__classPrivateFieldGet(this, _YargsInstance_exitProcess, "f"))
            setBlocking(true);
          skipValidation = true;
          this.showHelp("log");
          this.exit(0);
        } else if (versionOptSet) {
          if (__classPrivateFieldGet(this, _YargsInstance_exitProcess, "f"))
            setBlocking(true);
          skipValidation = true;
          __classPrivateFieldGet(this, _YargsInstance_usage, "f").showVersion("log");
          this.exit(0);
        }
      }
      if (!skipValidation && __classPrivateFieldGet(this, _YargsInstance_options, "f").skipValidation.length > 0) {
        skipValidation = Object.keys(argv).some((key) => __classPrivateFieldGet(this, _YargsInstance_options, "f").skipValidation.indexOf(key) >= 0 && argv[key] === true);
      }
      if (!skipValidation) {
        if (parsed.error)
          throw new YError(parsed.error.message);
        if (!requestCompletions) {
          const validation2 = this[kRunValidation](aliases, {}, parsed.error);
          if (!calledFromCommand) {
            argvPromise = applyMiddleware(argv, this, __classPrivateFieldGet(this, _YargsInstance_globalMiddleware, "f").getMiddleware(), true);
          }
          argvPromise = this[kValidateAsync](validation2, argvPromise !== null && argvPromise !== void 0 ? argvPromise : argv);
          if (isPromise(argvPromise) && !calledFromCommand) {
            argvPromise = argvPromise.then(() => {
              return applyMiddleware(argv, this, __classPrivateFieldGet(this, _YargsInstance_globalMiddleware, "f").getMiddleware(), false);
            });
          }
        }
      }
    } catch (err) {
      if (err instanceof YError)
        __classPrivateFieldGet(this, _YargsInstance_usage, "f").fail(err.message, err);
      else
        throw err;
    }
    return this[kPostProcess](argvPromise !== null && argvPromise !== void 0 ? argvPromise : argv, populateDoubleDash, !!calledFromCommand, true);
  }
  [kRunValidation](aliases, positionalMap, parseErrors, isDefaultCommand) {
    const demandedOptions = { ...this.getDemandedOptions() };
    return (argv) => {
      if (parseErrors)
        throw new YError(parseErrors.message);
      __classPrivateFieldGet(this, _YargsInstance_validation, "f").nonOptionCount(argv);
      __classPrivateFieldGet(this, _YargsInstance_validation, "f").requiredArguments(argv, demandedOptions);
      let failedStrictCommands = false;
      if (__classPrivateFieldGet(this, _YargsInstance_strictCommands, "f")) {
        failedStrictCommands = __classPrivateFieldGet(this, _YargsInstance_validation, "f").unknownCommands(argv);
      }
      if (__classPrivateFieldGet(this, _YargsInstance_strict, "f") && !failedStrictCommands) {
        __classPrivateFieldGet(this, _YargsInstance_validation, "f").unknownArguments(argv, aliases, positionalMap, !!isDefaultCommand);
      } else if (__classPrivateFieldGet(this, _YargsInstance_strictOptions, "f")) {
        __classPrivateFieldGet(this, _YargsInstance_validation, "f").unknownArguments(argv, aliases, {}, false, false);
      }
      __classPrivateFieldGet(this, _YargsInstance_validation, "f").limitedChoices(argv);
      __classPrivateFieldGet(this, _YargsInstance_validation, "f").implications(argv);
      __classPrivateFieldGet(this, _YargsInstance_validation, "f").conflicting(argv);
    };
  }
  [kSetHasOutput]() {
    __classPrivateFieldSet(this, _YargsInstance_hasOutput, true, "f");
  }
  [kTrackManuallySetKeys](keys2) {
    if (typeof keys2 === "string") {
      __classPrivateFieldGet(this, _YargsInstance_options, "f").key[keys2] = true;
    } else {
      for (const k of keys2) {
        __classPrivateFieldGet(this, _YargsInstance_options, "f").key[k] = true;
      }
    }
  }
};
function isYargsInstance(y) {
  return !!y && typeof y.getInternalMethods === "function";
}

// node_modules/yargs/index.mjs
var Yargs = YargsFactory(esm_default);
var yargs_default = Yargs;

// startFlextesa.ts
var L = __toESM(require_partial_lenses_cjs());
var import_promises = require("fs/promises");
var import_child_process = require("child_process");
var readTextFile = (filename) => (0, import_promises.readFile)(filename, { encoding: "utf8" });
var writeTextFile = (filename) => (data) => (0, import_promises.writeFile)(filename, data, { encoding: "utf8" });
var writeConfigFile = (filename) => (config) => Promise.resolve(config).then(JSON.stringify).then(writeTextFile(filename)).then(() => config).catch((err) => Promise.reject({ code: "E_WRITE_CONFIG", context: config, previous: err }));
var run = (cmd) => new Promise((resolve5, reject) => (0, import_child_process.exec)(cmd, (err, stdout, stderr) => {
  if (err)
    reject({ code: "E_EXEC", context: cmd, previous: err });
  else if (stderr.length)
    reject({ code: "E_EXEC", context: { cmd, stderr } });
  else
    resolve5(stdout);
}));
var decodeJsonConfig = (input) => {
  try {
    const data = JSON.parse(input);
    return Promise.resolve(data);
  } catch (err) {
    throw { code: "E_INVALID_JSOLN", context: input };
  }
};
var parseConfig = (input) => {
  const parseAccountDetails = (input2) => {
    if (typeof input2.initialBalance === "string" && /^(\d+_?\d+)+/.test(input2.initialBalance)) {
      return {
        initialBalance: input2.initialBalance
      };
    }
    return null;
  };
  const parseAccounts = (input2) => Object.entries(input2).reduce((retval, [accountName, accountDetailsInput]) => {
    if (accountName !== "default") {
      const temp = {};
      temp[accountName] = parseAccountDetails(accountDetailsInput);
      return temp[accountName] ? __spreadValues(__spreadValues({}, retval), temp) : retval;
    }
    return retval;
  }, {});
  const parseUrl = (input2) => {
    try {
      new URL(input2);
      return input2;
    } catch (_) {
      return false;
    }
  };
  const parseString = (input2) => typeof input2 === "string" && input2.length >= 1;
  const parseSandboxSettings = (input2) => {
    if (input2.label && parseString(input2.label) && input2.protocol && parseString(input2.protocol)) {
      if (input2.rpcUrl && parseUrl(input2.rpcUrl) && input2.accounts) {
        const accounts = parseAccounts(input2.accounts);
        return accounts ? { accounts, label: input2.label, protocol: input2.protocol, rpcUrl: input2.rpcUrl } : null;
      }
    }
    return null;
  };
  const parseSandboxes = (input2) => Object.entries(input2).reduce((retval, input3) => {
    const [sandboxName, settingsInput] = input3;
    if (sandboxName !== "default") {
      const temp = {};
      temp[sandboxName] = parseSandboxSettings(settingsInput);
      return temp[sandboxName] !== void 0 ? __spreadValues(__spreadValues({}, retval), temp) : retval;
    }
  }, {});
  if (input.sandbox) {
    const sandboxes = parseSandboxes(input.sandbox);
    if (sandboxes)
      return Promise.resolve(__spreadProps(__spreadValues({}, input), { sandbox: sandboxes }));
  }
  return Promise.reject({ code: "E_INVALID_CONFIG", context: input });
};
var getAccountKeys = (accountName) => run(`flextesa key ${accountName}`).then((result) => {
  const [alias, encryptedKey, publicKey, secretKey] = result.trim().split(",");
  return { alias, encryptedKey, publicKey, secretKey };
});
var addAccountKeys = (_0) => __async(exports, [_0], function* ([accountName, accountDetails]) {
  const keys2 = yield getAccountKeys(accountName);
  return [
    accountName,
    __spreadProps(__spreadValues({}, accountDetails), { keys: keys2 })
  ];
});
var getBootstrapFlags = (sandboxName, config) => {
  const lens = L.compose("sandbox", sandboxName, "accounts", L.values);
  return L.collect(lens, config).map(({ keys: keys2, initialBalance }) => `--add-bootstrap-account="${keys2.alias},${keys2.encryptedKey},${keys2.publicKey},${keys2.secretKey}@${initialBalance}"`).join(" ");
};
var getNoDaemonFlags = (sandboxName, config) => {
  const lens = L.compose("sandbox", sandboxName, "accounts", L.keys);
  return L.collect(lens, config).map((alias) => `--no-daemons-for=${alias}`).join(" ");
};
var getSandboxProtocol = (sandboxName, config) => {
  const lens = L.compose("sandbox", sandboxName, "protocol");
  switch (L.get(lens, config)) {
    case "PsiThaCaT47Zboaw71QWScM8sXeMM7bbQFncK9FLqYc6EKdpjVP":
      return "Ithaca";
    case "PtHangz2aRngywmSRGGvrcTyMbbdpWdpFKuS4uMWxg2RaH9i1qx":
      return "Hangzhou";
    case "PtGRANADsDU8R9daYKAgWnQYAJ64omN1o3KMGVCykShA97vQbvV":
      return "Granada";
    default:
      return "Alpha";
  }
};
var runMininet = (sandboxName) => (config) => {
  const cmdArgs = [
    "flextesa",
    "mini-network",
    "--root /tmp/mini-box",
    "--size 1",
    "--number-of-b 1",
    "--set-history-mode N000:archive",
    "--time-b 5",
    "--balance-of-bootstrap-accounts tez:100_000_000",
    getNoDaemonFlags(sandboxName, config),
    getBootstrapFlags(sandboxName, config),
    `--protocol-kind "${getSandboxProtocol(sandboxName, config)}"`
  ];
  console.log(cmdArgs.join(" "));
  return run(cmdArgs.join(" "));
};
var configureTezosClient = (sandboxName) => (config) => {
  const lens = L.compose("sandbox", sandboxName, "accounts", L.values, "keys");
  return run(`tezos-client --endpoint http://localhost:20000 config update`).then(() => L.collect(lens, config).reduce((retval, keys2) => {
    return [...retval, run(`tezos-client --protocol ${config.sandbox[sandboxName].protocol} import secret key ${keys2.alias} ${keys2.secretKey} --force`)];
  }, [])).then((processes) => Promise.all(processes)).then(() => config);
};
var inputArgs = yargs_default(process.argv).option("config", {
  default: "/project/.taq/config.json"
}).option("sandbox", {
  default: ""
}).option("configure", {
  default: false,
  boolean: true
}).parse();
if (!inputArgs.sandbox.length) {
  console.log({ code: "E_INVALID_USAGE", context: inputArgs });
  process.exit(-1);
}
readTextFile(inputArgs.config).then(decodeJsonConfig).then(parseConfig).then((config) => {
  const lens = L.compose("sandbox", inputArgs.sandbox, "accounts", L.entries);
  return L.modifyAsync(lens, addAccountKeys, config);
}).then(writeConfigFile(inputArgs.config)).then((config) => {
  return inputArgs.configure ? configureTezosClient(inputArgs.sandbox)(config) : runMininet(inputArgs.sandbox)(config).then(() => config);
}).then(() => process.exit(0)).catch((err) => {
  console.error(err);
  process.exit(-1);
});
/**
 * @fileoverview Main entrypoint for libraries using yargs-parser in Node.js
 * CJS and ESM environments.
 *
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
