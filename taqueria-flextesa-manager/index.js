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

// node_modules/@taqueria/node-sdk/index.js
var require_node_sdk = __commonJS({
  "node_modules/@taqueria/node-sdk/index.js"(exports2, module2) {
    var U1 = Object.create;
    var Mi = Object.defineProperty;
    var W1 = Object.getOwnPropertyDescriptor;
    var z1 = Object.getOwnPropertyNames;
    var H1 = Object.getPrototypeOf;
    var G1 = Object.prototype.hasOwnProperty;
    var ec = (s) => Mi(s, "__esModule", { value: true });
    var Le = (s, t) => () => (t || s((t = { exports: {} }).exports, t), t.exports);
    var K1 = (s, t) => {
      for (var r in t)
        Mi(s, r, { get: t[r], enumerable: true });
    };
    var nc = (s, t, r, u) => {
      if (t && typeof t == "object" || typeof t == "function")
        for (let o of z1(t))
          !G1.call(s, o) && (r || o !== "default") && Mi(s, o, { get: () => t[o], enumerable: !(u = W1(t, o)) || u.enumerable });
      return s;
    };
    var V1 = (s, t) => nc(ec(Mi(s != null ? U1(H1(s)) : {}, "default", !t && s && s.__esModule ? { get: () => s.default, enumerable: true } : { value: s, enumerable: true })), s);
    var Y1 = ((s) => (t, r) => s && s.get(t) || (r = nc(ec({}), t, 1), s && s.set(t, r), r))(typeof WeakMap != "undefined" ? /* @__PURE__ */ new WeakMap() : 0);
    var ac = Le((sr, Mr) => {
      (function() {
        var s, t = "4.17.21", r = 200, u = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", o = "Expected a function", l = "Invalid `variable` option passed into `_.template`", f = "__lodash_hash_undefined__", g = 500, v = "__lodash_placeholder__", _ = 1, O = 2, S = 4, q = 1, le = 2, L2 = 1, A = 2, w = 4, Q = 8, ee = 16, z = 32, De = 64, ce = 128, nn = 256, qe = 512, T = 30, ne = "...", Z = 800, Ie = 16, xe = 1, Ce = 2, ze = 3, Xe = 1 / 0, ve = 9007199254740991, lt = 17976931348623157e292, Hn = 0 / 0, Ve = 4294967295, ct = Ve - 1, V = Ve >>> 1, ue = [["ary", ce], ["bind", L2], ["bindKey", A], ["curry", Q], ["curryRight", ee], ["flip", qe], ["partial", z], ["partialRight", De], ["rearg", nn]], ge = "[object Arguments]", R = "[object Array]", ke = "[object AsyncFunction]", _e = "[object Boolean]", Me = "[object Date]", Ln = "[object DOMException]", Gn = "[object Error]", Tn = "[object Function]", Hr = "[object GeneratorFunction]", dn = "[object Map]", sn = "[object Number]", us = "[object Null]", y = "[object Object]", E = "[object Promise]", N = "[object Proxy]", B = "[object RegExp]", F = "[object Set]", U = "[object String]", $ = "[object Symbol]", J = "[object Undefined]", Be = "[object WeakMap]", Qe = "[object WeakSet]", Dr = "[object ArrayBuffer]", Ht = "[object DataView]", os = "[object Float32Array]", as = "[object Float64Array]", ls = "[object Int8Array]", cs = "[object Int16Array]", fs = "[object Int32Array]", hs = "[object Uint8Array]", ds = "[object Uint8ClampedArray]", gs = "[object Uint16Array]", ps = "[object Uint32Array]", lh = /\b__p \+= '';/g, ch = /\b(__p \+=) '' \+/g, fh = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Eo = /&(?:amp|lt|gt|quot|#39);/g, xo = /[&<>"']/g, hh = RegExp(Eo.source), dh = RegExp(xo.source), gh = /<%-([\s\S]+?)%>/g, ph = /<%([\s\S]+?)%>/g, Ao = /<%=([\s\S]+?)%>/g, Dh = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, mh = /^\w*$/, yh = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Ds = /[\\^$.*+?()[\]{}|]/g, bh = RegExp(Ds.source), ms = /^\s+/, vh = /\s/, wh = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, Ch = /\{\n\/\* \[wrapped with (.+)\] \*/, _h = /,? & /, Fh = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Eh = /[()=,{}\[\]\/\s]/, xh = /\\(\\)?/g, Ah = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Oo = /\w*$/, Oh = /^[-+]0x[0-9a-f]+$/i, Sh = /^0b[01]+$/i, kh = /^\[object .+?Constructor\]$/, Bh = /^0o[0-7]+$/i, Ph = /^(?:0|[1-9]\d*)$/, Ih = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Gr = /($^)/, Mh = /['\n\r\u2028\u2029\\]/g, Kr = "\\ud800-\\udfff", Rh = "\\u0300-\\u036f", Lh = "\\ufe20-\\ufe2f", Th = "\\u20d0-\\u20ff", So = Rh + Lh + Th, ko = "\\u2700-\\u27bf", Bo = "a-z\\xdf-\\xf6\\xf8-\\xff", Nh = "\\xac\\xb1\\xd7\\xf7", qh = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", jh = "\\u2000-\\u206f", $h = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Po = "A-Z\\xc0-\\xd6\\xd8-\\xde", Io = "\\ufe0e\\ufe0f", Mo = Nh + qh + jh + $h, ys = "['\u2019]", Uh = "[" + Kr + "]", Ro = "[" + Mo + "]", Vr = "[" + So + "]", Lo = "\\d+", Wh = "[" + ko + "]", To = "[" + Bo + "]", No = "[^" + Kr + Mo + Lo + ko + Bo + Po + "]", bs = "\\ud83c[\\udffb-\\udfff]", zh = "(?:" + Vr + "|" + bs + ")", qo = "[^" + Kr + "]", vs = "(?:\\ud83c[\\udde6-\\uddff]){2}", ws = "[\\ud800-\\udbff][\\udc00-\\udfff]", Gt = "[" + Po + "]", jo = "\\u200d", $o = "(?:" + To + "|" + No + ")", Hh = "(?:" + Gt + "|" + No + ")", Uo = "(?:" + ys + "(?:d|ll|m|re|s|t|ve))?", Wo = "(?:" + ys + "(?:D|LL|M|RE|S|T|VE))?", zo = zh + "?", Ho = "[" + Io + "]?", Gh = "(?:" + jo + "(?:" + [qo, vs, ws].join("|") + ")" + Ho + zo + ")*", Kh = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Vh = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", Go = Ho + zo + Gh, Yh = "(?:" + [Wh, vs, ws].join("|") + ")" + Go, Zh = "(?:" + [qo + Vr + "?", Vr, vs, ws, Uh].join("|") + ")", Jh = RegExp(ys, "g"), Xh = RegExp(Vr, "g"), Cs = RegExp(bs + "(?=" + bs + ")|" + Zh + Go, "g"), Qh = RegExp([Gt + "?" + To + "+" + Uo + "(?=" + [Ro, Gt, "$"].join("|") + ")", Hh + "+" + Wo + "(?=" + [Ro, Gt + $o, "$"].join("|") + ")", Gt + "?" + $o + "+" + Uo, Gt + "+" + Wo, Vh, Kh, Lo, Yh].join("|"), "g"), ed = RegExp("[" + jo + Kr + So + Io + "]"), nd = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, td = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"], rd = -1, Se = {};
        Se[os] = Se[as] = Se[ls] = Se[cs] = Se[fs] = Se[hs] = Se[ds] = Se[gs] = Se[ps] = true, Se[ge] = Se[R] = Se[Dr] = Se[_e] = Se[Ht] = Se[Me] = Se[Gn] = Se[Tn] = Se[dn] = Se[sn] = Se[y] = Se[B] = Se[F] = Se[U] = Se[Be] = false;
        var Oe = {};
        Oe[ge] = Oe[R] = Oe[Dr] = Oe[Ht] = Oe[_e] = Oe[Me] = Oe[os] = Oe[as] = Oe[ls] = Oe[cs] = Oe[fs] = Oe[dn] = Oe[sn] = Oe[y] = Oe[B] = Oe[F] = Oe[U] = Oe[$] = Oe[hs] = Oe[ds] = Oe[gs] = Oe[ps] = true, Oe[Gn] = Oe[Tn] = Oe[Be] = false;
        var id = { \u00C0: "A", \u00C1: "A", \u00C2: "A", \u00C3: "A", \u00C4: "A", \u00C5: "A", \u00E0: "a", \u00E1: "a", \u00E2: "a", \u00E3: "a", \u00E4: "a", \u00E5: "a", \u00C7: "C", \u00E7: "c", \u00D0: "D", \u00F0: "d", \u00C8: "E", \u00C9: "E", \u00CA: "E", \u00CB: "E", \u00E8: "e", \u00E9: "e", \u00EA: "e", \u00EB: "e", \u00CC: "I", \u00CD: "I", \u00CE: "I", \u00CF: "I", \u00EC: "i", \u00ED: "i", \u00EE: "i", \u00EF: "i", \u00D1: "N", \u00F1: "n", \u00D2: "O", \u00D3: "O", \u00D4: "O", \u00D5: "O", \u00D6: "O", \u00D8: "O", \u00F2: "o", \u00F3: "o", \u00F4: "o", \u00F5: "o", \u00F6: "o", \u00F8: "o", \u00D9: "U", \u00DA: "U", \u00DB: "U", \u00DC: "U", \u00F9: "u", \u00FA: "u", \u00FB: "u", \u00FC: "u", \u00DD: "Y", \u00FD: "y", \u00FF: "y", \u00C6: "Ae", \u00E6: "ae", \u00DE: "Th", \u00FE: "th", \u00DF: "ss", \u0100: "A", \u0102: "A", \u0104: "A", \u0101: "a", \u0103: "a", \u0105: "a", \u0106: "C", \u0108: "C", \u010A: "C", \u010C: "C", \u0107: "c", \u0109: "c", \u010B: "c", \u010D: "c", \u010E: "D", \u0110: "D", \u010F: "d", \u0111: "d", \u0112: "E", \u0114: "E", \u0116: "E", \u0118: "E", \u011A: "E", \u0113: "e", \u0115: "e", \u0117: "e", \u0119: "e", \u011B: "e", \u011C: "G", \u011E: "G", \u0120: "G", \u0122: "G", \u011D: "g", \u011F: "g", \u0121: "g", \u0123: "g", \u0124: "H", \u0126: "H", \u0125: "h", \u0127: "h", \u0128: "I", \u012A: "I", \u012C: "I", \u012E: "I", \u0130: "I", \u0129: "i", \u012B: "i", \u012D: "i", \u012F: "i", \u0131: "i", \u0134: "J", \u0135: "j", \u0136: "K", \u0137: "k", \u0138: "k", \u0139: "L", \u013B: "L", \u013D: "L", \u013F: "L", \u0141: "L", \u013A: "l", \u013C: "l", \u013E: "l", \u0140: "l", \u0142: "l", \u0143: "N", \u0145: "N", \u0147: "N", \u014A: "N", \u0144: "n", \u0146: "n", \u0148: "n", \u014B: "n", \u014C: "O", \u014E: "O", \u0150: "O", \u014D: "o", \u014F: "o", \u0151: "o", \u0154: "R", \u0156: "R", \u0158: "R", \u0155: "r", \u0157: "r", \u0159: "r", \u015A: "S", \u015C: "S", \u015E: "S", \u0160: "S", \u015B: "s", \u015D: "s", \u015F: "s", \u0161: "s", \u0162: "T", \u0164: "T", \u0166: "T", \u0163: "t", \u0165: "t", \u0167: "t", \u0168: "U", \u016A: "U", \u016C: "U", \u016E: "U", \u0170: "U", \u0172: "U", \u0169: "u", \u016B: "u", \u016D: "u", \u016F: "u", \u0171: "u", \u0173: "u", \u0174: "W", \u0175: "w", \u0176: "Y", \u0177: "y", \u0178: "Y", \u0179: "Z", \u017B: "Z", \u017D: "Z", \u017A: "z", \u017C: "z", \u017E: "z", \u0132: "IJ", \u0133: "ij", \u0152: "Oe", \u0153: "oe", \u0149: "'n", \u017F: "s" }, sd = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, ud = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" }, od = { "\\": "\\", "'": "'", "\n": "n", "\r": "r", "\u2028": "u2028", "\u2029": "u2029" }, ad = parseFloat, ld = parseInt, Ko = typeof global == "object" && global && global.Object === Object && global, cd = typeof self == "object" && self && self.Object === Object && self, Ye = Ko || cd || Function("return this")(), _s = typeof sr == "object" && sr && !sr.nodeType && sr, xt = _s && typeof Mr == "object" && Mr && !Mr.nodeType && Mr, Vo = xt && xt.exports === _s, Fs = Vo && Ko.process, Fn = function() {
          try {
            var b = xt && xt.require && xt.require("util").types;
            return b || Fs && Fs.binding && Fs.binding("util");
          } catch {
          }
        }(), Yo = Fn && Fn.isArrayBuffer, Zo = Fn && Fn.isDate, Jo = Fn && Fn.isMap, Xo = Fn && Fn.isRegExp, Qo = Fn && Fn.isSet, ea = Fn && Fn.isTypedArray;
        function gn(b, k, x) {
          switch (x.length) {
            case 0:
              return b.call(k);
            case 1:
              return b.call(k, x[0]);
            case 2:
              return b.call(k, x[0], x[1]);
            case 3:
              return b.call(k, x[0], x[1], x[2]);
          }
          return b.apply(k, x);
        }
        function fd(b, k, x, W) {
          for (var oe = -1, we = b == null ? 0 : b.length; ++oe < we; ) {
            var He = b[oe];
            k(W, He, x(He), b);
          }
          return W;
        }
        function En(b, k) {
          for (var x = -1, W = b == null ? 0 : b.length; ++x < W && k(b[x], x, b) !== false; )
            ;
          return b;
        }
        function hd(b, k) {
          for (var x = b == null ? 0 : b.length; x-- && k(b[x], x, b) !== false; )
            ;
          return b;
        }
        function na(b, k) {
          for (var x = -1, W = b == null ? 0 : b.length; ++x < W; )
            if (!k(b[x], x, b))
              return false;
          return true;
        }
        function ft(b, k) {
          for (var x = -1, W = b == null ? 0 : b.length, oe = 0, we = []; ++x < W; ) {
            var He = b[x];
            k(He, x, b) && (we[oe++] = He);
          }
          return we;
        }
        function Yr(b, k) {
          var x = b == null ? 0 : b.length;
          return !!x && Kt(b, k, 0) > -1;
        }
        function Es(b, k, x) {
          for (var W = -1, oe = b == null ? 0 : b.length; ++W < oe; )
            if (x(k, b[W]))
              return true;
          return false;
        }
        function Pe(b, k) {
          for (var x = -1, W = b == null ? 0 : b.length, oe = Array(W); ++x < W; )
            oe[x] = k(b[x], x, b);
          return oe;
        }
        function ht(b, k) {
          for (var x = -1, W = k.length, oe = b.length; ++x < W; )
            b[oe + x] = k[x];
          return b;
        }
        function xs(b, k, x, W) {
          var oe = -1, we = b == null ? 0 : b.length;
          for (W && we && (x = b[++oe]); ++oe < we; )
            x = k(x, b[oe], oe, b);
          return x;
        }
        function dd(b, k, x, W) {
          var oe = b == null ? 0 : b.length;
          for (W && oe && (x = b[--oe]); oe--; )
            x = k(x, b[oe], oe, b);
          return x;
        }
        function As(b, k) {
          for (var x = -1, W = b == null ? 0 : b.length; ++x < W; )
            if (k(b[x], x, b))
              return true;
          return false;
        }
        var gd = Os("length");
        function pd(b) {
          return b.split("");
        }
        function Dd(b) {
          return b.match(Fh) || [];
        }
        function ta(b, k, x) {
          var W;
          return x(b, function(oe, we, He) {
            if (k(oe, we, He))
              return W = we, false;
          }), W;
        }
        function Zr(b, k, x, W) {
          for (var oe = b.length, we = x + (W ? 1 : -1); W ? we-- : ++we < oe; )
            if (k(b[we], we, b))
              return we;
          return -1;
        }
        function Kt(b, k, x) {
          return k === k ? Od(b, k, x) : Zr(b, ra, x);
        }
        function md(b, k, x, W) {
          for (var oe = x - 1, we = b.length; ++oe < we; )
            if (W(b[oe], k))
              return oe;
          return -1;
        }
        function ra(b) {
          return b !== b;
        }
        function ia(b, k) {
          var x = b == null ? 0 : b.length;
          return x ? ks(b, k) / x : Hn;
        }
        function Os(b) {
          return function(k) {
            return k == null ? s : k[b];
          };
        }
        function Ss(b) {
          return function(k) {
            return b == null ? s : b[k];
          };
        }
        function sa(b, k, x, W, oe) {
          return oe(b, function(we, He, Ae) {
            x = W ? (W = false, we) : k(x, we, He, Ae);
          }), x;
        }
        function yd(b, k) {
          var x = b.length;
          for (b.sort(k); x--; )
            b[x] = b[x].value;
          return b;
        }
        function ks(b, k) {
          for (var x, W = -1, oe = b.length; ++W < oe; ) {
            var we = k(b[W]);
            we !== s && (x = x === s ? we : x + we);
          }
          return x;
        }
        function Bs(b, k) {
          for (var x = -1, W = Array(b); ++x < b; )
            W[x] = k(x);
          return W;
        }
        function bd(b, k) {
          return Pe(k, function(x) {
            return [x, b[x]];
          });
        }
        function ua(b) {
          return b && b.slice(0, ca(b) + 1).replace(ms, "");
        }
        function pn(b) {
          return function(k) {
            return b(k);
          };
        }
        function Ps(b, k) {
          return Pe(k, function(x) {
            return b[x];
          });
        }
        function mr(b, k) {
          return b.has(k);
        }
        function oa(b, k) {
          for (var x = -1, W = b.length; ++x < W && Kt(k, b[x], 0) > -1; )
            ;
          return x;
        }
        function aa(b, k) {
          for (var x = b.length; x-- && Kt(k, b[x], 0) > -1; )
            ;
          return x;
        }
        function vd(b, k) {
          for (var x = b.length, W = 0; x--; )
            b[x] === k && ++W;
          return W;
        }
        var wd = Ss(id), Cd = Ss(sd);
        function _d(b) {
          return "\\" + od[b];
        }
        function Fd(b, k) {
          return b == null ? s : b[k];
        }
        function Vt(b) {
          return ed.test(b);
        }
        function Ed(b) {
          return nd.test(b);
        }
        function xd(b) {
          for (var k, x = []; !(k = b.next()).done; )
            x.push(k.value);
          return x;
        }
        function Is(b) {
          var k = -1, x = Array(b.size);
          return b.forEach(function(W, oe) {
            x[++k] = [oe, W];
          }), x;
        }
        function la(b, k) {
          return function(x) {
            return b(k(x));
          };
        }
        function dt(b, k) {
          for (var x = -1, W = b.length, oe = 0, we = []; ++x < W; ) {
            var He = b[x];
            (He === k || He === v) && (b[x] = v, we[oe++] = x);
          }
          return we;
        }
        function Jr(b) {
          var k = -1, x = Array(b.size);
          return b.forEach(function(W) {
            x[++k] = W;
          }), x;
        }
        function Ad(b) {
          var k = -1, x = Array(b.size);
          return b.forEach(function(W) {
            x[++k] = [W, W];
          }), x;
        }
        function Od(b, k, x) {
          for (var W = x - 1, oe = b.length; ++W < oe; )
            if (b[W] === k)
              return W;
          return -1;
        }
        function Sd(b, k, x) {
          for (var W = x + 1; W--; )
            if (b[W] === k)
              return W;
          return W;
        }
        function Yt(b) {
          return Vt(b) ? Bd(b) : gd(b);
        }
        function Nn(b) {
          return Vt(b) ? Pd(b) : pd(b);
        }
        function ca(b) {
          for (var k = b.length; k-- && vh.test(b.charAt(k)); )
            ;
          return k;
        }
        var kd = Ss(ud);
        function Bd(b) {
          for (var k = Cs.lastIndex = 0; Cs.test(b); )
            ++k;
          return k;
        }
        function Pd(b) {
          return b.match(Cs) || [];
        }
        function Id(b) {
          return b.match(Qh) || [];
        }
        var Md = function b(k) {
          k = k == null ? Ye : gt.defaults(Ye.Object(), k, gt.pick(Ye, td));
          var x = k.Array, W = k.Date, oe = k.Error, we = k.Function, He = k.Math, Ae = k.Object, Ms = k.RegExp, Rd = k.String, xn = k.TypeError, Xr = x.prototype, Ld = we.prototype, Zt = Ae.prototype, Qr = k["__core-js_shared__"], ei = Ld.toString, Ee = Zt.hasOwnProperty, Td = 0, fa = function() {
            var e = /[^.]+$/.exec(Qr && Qr.keys && Qr.keys.IE_PROTO || "");
            return e ? "Symbol(src)_1." + e : "";
          }(), ni = Zt.toString, Nd = ei.call(Ae), qd = Ye._, jd = Ms("^" + ei.call(Ee).replace(Ds, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), ti = Vo ? k.Buffer : s, pt = k.Symbol, ri = k.Uint8Array, ha = ti ? ti.allocUnsafe : s, ii = la(Ae.getPrototypeOf, Ae), da = Ae.create, ga = Zt.propertyIsEnumerable, si = Xr.splice, pa = pt ? pt.isConcatSpreadable : s, yr = pt ? pt.iterator : s, At = pt ? pt.toStringTag : s, ui2 = function() {
            try {
              var e = Pt(Ae, "defineProperty");
              return e({}, "", {}), e;
            } catch {
            }
          }(), $d = k.clearTimeout !== Ye.clearTimeout && k.clearTimeout, Ud = W && W.now !== Ye.Date.now && W.now, Wd = k.setTimeout !== Ye.setTimeout && k.setTimeout, oi = He.ceil, ai = He.floor, Rs = Ae.getOwnPropertySymbols, zd = ti ? ti.isBuffer : s, Da = k.isFinite, Hd = Xr.join, Gd = la(Ae.keys, Ae), Ge = He.max, tn = He.min, Kd = W.now, Vd = k.parseInt, ma = He.random, Yd = Xr.reverse, Ls = Pt(k, "DataView"), br = Pt(k, "Map"), Ts = Pt(k, "Promise"), Jt = Pt(k, "Set"), vr = Pt(k, "WeakMap"), wr = Pt(Ae, "create"), li = vr && new vr(), Xt = {}, Zd = It(Ls), Jd = It(br), Xd = It(Ts), Qd = It(Jt), eg = It(vr), ci = pt ? pt.prototype : s, Cr = ci ? ci.valueOf : s, ya = ci ? ci.toString : s;
          function h(e) {
            if (Te(e) && !fe(e) && !(e instanceof ye)) {
              if (e instanceof An)
                return e;
              if (Ee.call(e, "__wrapped__"))
                return bl(e);
            }
            return new An(e);
          }
          var Qt = function() {
            function e() {
            }
            return function(n) {
              if (!Re(n))
                return {};
              if (da)
                return da(n);
              e.prototype = n;
              var i = new e();
              return e.prototype = s, i;
            };
          }();
          function fi() {
          }
          function An(e, n) {
            this.__wrapped__ = e, this.__actions__ = [], this.__chain__ = !!n, this.__index__ = 0, this.__values__ = s;
          }
          h.templateSettings = { escape: gh, evaluate: ph, interpolate: Ao, variable: "", imports: { _: h } }, h.prototype = fi.prototype, h.prototype.constructor = h, An.prototype = Qt(fi.prototype), An.prototype.constructor = An;
          function ye(e) {
            this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = false, this.__iteratees__ = [], this.__takeCount__ = Ve, this.__views__ = [];
          }
          function ng() {
            var e = new ye(this.__wrapped__);
            return e.__actions__ = ln(this.__actions__), e.__dir__ = this.__dir__, e.__filtered__ = this.__filtered__, e.__iteratees__ = ln(this.__iteratees__), e.__takeCount__ = this.__takeCount__, e.__views__ = ln(this.__views__), e;
          }
          function tg() {
            if (this.__filtered__) {
              var e = new ye(this);
              e.__dir__ = -1, e.__filtered__ = true;
            } else
              e = this.clone(), e.__dir__ *= -1;
            return e;
          }
          function rg() {
            var e = this.__wrapped__.value(), n = this.__dir__, i = fe(e), a = n < 0, c = i ? e.length : 0, d = pp(0, c, this.__views__), D = d.start, m = d.end, C = m - D, P = a ? m : D - 1, I = this.__iteratees__, M = I.length, j = 0, Y = tn(C, this.__takeCount__);
            if (!i || !a && c == C && Y == C)
              return Ua(e, this.__actions__);
            var re = [];
            e:
              for (; C-- && j < Y; ) {
                P += n;
                for (var de = -1, ie = e[P]; ++de < M; ) {
                  var me = I[de], be = me.iteratee, yn = me.type, an = be(ie);
                  if (yn == Ce)
                    ie = an;
                  else if (!an) {
                    if (yn == xe)
                      continue e;
                    break e;
                  }
                }
                re[j++] = ie;
              }
            return re;
          }
          ye.prototype = Qt(fi.prototype), ye.prototype.constructor = ye;
          function Ot(e) {
            var n = -1, i = e == null ? 0 : e.length;
            for (this.clear(); ++n < i; ) {
              var a = e[n];
              this.set(a[0], a[1]);
            }
          }
          function ig() {
            this.__data__ = wr ? wr(null) : {}, this.size = 0;
          }
          function sg(e) {
            var n = this.has(e) && delete this.__data__[e];
            return this.size -= n ? 1 : 0, n;
          }
          function ug(e) {
            var n = this.__data__;
            if (wr) {
              var i = n[e];
              return i === f ? s : i;
            }
            return Ee.call(n, e) ? n[e] : s;
          }
          function og(e) {
            var n = this.__data__;
            return wr ? n[e] !== s : Ee.call(n, e);
          }
          function ag(e, n) {
            var i = this.__data__;
            return this.size += this.has(e) ? 0 : 1, i[e] = wr && n === s ? f : n, this;
          }
          Ot.prototype.clear = ig, Ot.prototype.delete = sg, Ot.prototype.get = ug, Ot.prototype.has = og, Ot.prototype.set = ag;
          function Xn(e) {
            var n = -1, i = e == null ? 0 : e.length;
            for (this.clear(); ++n < i; ) {
              var a = e[n];
              this.set(a[0], a[1]);
            }
          }
          function lg() {
            this.__data__ = [], this.size = 0;
          }
          function cg(e) {
            var n = this.__data__, i = hi(n, e);
            if (i < 0)
              return false;
            var a = n.length - 1;
            return i == a ? n.pop() : si.call(n, i, 1), --this.size, true;
          }
          function fg(e) {
            var n = this.__data__, i = hi(n, e);
            return i < 0 ? s : n[i][1];
          }
          function hg(e) {
            return hi(this.__data__, e) > -1;
          }
          function dg(e, n) {
            var i = this.__data__, a = hi(i, e);
            return a < 0 ? (++this.size, i.push([e, n])) : i[a][1] = n, this;
          }
          Xn.prototype.clear = lg, Xn.prototype.delete = cg, Xn.prototype.get = fg, Xn.prototype.has = hg, Xn.prototype.set = dg;
          function Qn(e) {
            var n = -1, i = e == null ? 0 : e.length;
            for (this.clear(); ++n < i; ) {
              var a = e[n];
              this.set(a[0], a[1]);
            }
          }
          function gg() {
            this.size = 0, this.__data__ = { hash: new Ot(), map: new (br || Xn)(), string: new Ot() };
          }
          function pg(e) {
            var n = Fi(this, e).delete(e);
            return this.size -= n ? 1 : 0, n;
          }
          function Dg(e) {
            return Fi(this, e).get(e);
          }
          function mg(e) {
            return Fi(this, e).has(e);
          }
          function yg(e, n) {
            var i = Fi(this, e), a = i.size;
            return i.set(e, n), this.size += i.size == a ? 0 : 1, this;
          }
          Qn.prototype.clear = gg, Qn.prototype.delete = pg, Qn.prototype.get = Dg, Qn.prototype.has = mg, Qn.prototype.set = yg;
          function St(e) {
            var n = -1, i = e == null ? 0 : e.length;
            for (this.__data__ = new Qn(); ++n < i; )
              this.add(e[n]);
          }
          function bg(e) {
            return this.__data__.set(e, f), this;
          }
          function vg(e) {
            return this.__data__.has(e);
          }
          St.prototype.add = St.prototype.push = bg, St.prototype.has = vg;
          function qn(e) {
            var n = this.__data__ = new Xn(e);
            this.size = n.size;
          }
          function wg() {
            this.__data__ = new Xn(), this.size = 0;
          }
          function Cg(e) {
            var n = this.__data__, i = n.delete(e);
            return this.size = n.size, i;
          }
          function _g(e) {
            return this.__data__.get(e);
          }
          function Fg(e) {
            return this.__data__.has(e);
          }
          function Eg(e, n) {
            var i = this.__data__;
            if (i instanceof Xn) {
              var a = i.__data__;
              if (!br || a.length < r - 1)
                return a.push([e, n]), this.size = ++i.size, this;
              i = this.__data__ = new Qn(a);
            }
            return i.set(e, n), this.size = i.size, this;
          }
          qn.prototype.clear = wg, qn.prototype.delete = Cg, qn.prototype.get = _g, qn.prototype.has = Fg, qn.prototype.set = Eg;
          function ba(e, n) {
            var i = fe(e), a = !i && Mt(e), c = !i && !a && vt(e), d = !i && !a && !c && rr(e), D = i || a || c || d, m = D ? Bs(e.length, Rd) : [], C = m.length;
            for (var P in e)
              (n || Ee.call(e, P)) && !(D && (P == "length" || c && (P == "offset" || P == "parent") || d && (P == "buffer" || P == "byteLength" || P == "byteOffset") || rt(P, C))) && m.push(P);
            return m;
          }
          function va(e) {
            var n = e.length;
            return n ? e[Vs(0, n - 1)] : s;
          }
          function xg(e, n) {
            return Ei(ln(e), kt(n, 0, e.length));
          }
          function Ag(e) {
            return Ei(ln(e));
          }
          function Ns(e, n, i) {
            (i !== s && !jn(e[n], i) || i === s && !(n in e)) && et(e, n, i);
          }
          function _r(e, n, i) {
            var a = e[n];
            (!(Ee.call(e, n) && jn(a, i)) || i === s && !(n in e)) && et(e, n, i);
          }
          function hi(e, n) {
            for (var i = e.length; i--; )
              if (jn(e[i][0], n))
                return i;
            return -1;
          }
          function Og(e, n, i, a) {
            return Dt(e, function(c, d, D) {
              n(a, c, i(c), D);
            }), a;
          }
          function wa(e, n) {
            return e && Vn(n, Ze(n), e);
          }
          function Sg(e, n) {
            return e && Vn(n, fn(n), e);
          }
          function et(e, n, i) {
            n == "__proto__" && ui2 ? ui2(e, n, { configurable: true, enumerable: true, value: i, writable: true }) : e[n] = i;
          }
          function qs(e, n) {
            for (var i = -1, a = n.length, c = x(a), d = e == null; ++i < a; )
              c[i] = d ? s : bu(e, n[i]);
            return c;
          }
          function kt(e, n, i) {
            return e === e && (i !== s && (e = e <= i ? e : i), n !== s && (e = e >= n ? e : n)), e;
          }
          function On(e, n, i, a, c, d) {
            var D, m = n & _, C = n & O, P = n & S;
            if (i && (D = c ? i(e, a, c, d) : i(e)), D !== s)
              return D;
            if (!Re(e))
              return e;
            var I = fe(e);
            if (I) {
              if (D = mp(e), !m)
                return ln(e, D);
            } else {
              var M = rn(e), j = M == Tn || M == Hr;
              if (vt(e))
                return Ha(e, m);
              if (M == y || M == ge || j && !c) {
                if (D = C || j ? {} : cl(e), !m)
                  return C ? up(e, Sg(D, e)) : sp(e, wa(D, e));
              } else {
                if (!Oe[M])
                  return c ? e : {};
                D = yp(e, M, m);
              }
            }
            d || (d = new qn());
            var Y = d.get(e);
            if (Y)
              return Y;
            d.set(e, D), ql(e) ? e.forEach(function(ie) {
              D.add(On(ie, n, i, ie, e, d));
            }) : Tl(e) && e.forEach(function(ie, me) {
              D.set(me, On(ie, n, i, me, e, d));
            });
            var re = P ? C ? su : iu : C ? fn : Ze, de = I ? s : re(e);
            return En(de || e, function(ie, me) {
              de && (me = ie, ie = e[me]), _r(D, me, On(ie, n, i, me, e, d));
            }), D;
          }
          function kg(e) {
            var n = Ze(e);
            return function(i) {
              return Ca(i, e, n);
            };
          }
          function Ca(e, n, i) {
            var a = i.length;
            if (e == null)
              return !a;
            for (e = Ae(e); a--; ) {
              var c = i[a], d = n[c], D = e[c];
              if (D === s && !(c in e) || !d(D))
                return false;
            }
            return true;
          }
          function _a(e, n, i) {
            if (typeof e != "function")
              throw new xn(o);
            return kr(function() {
              e.apply(s, i);
            }, n);
          }
          function Fr(e, n, i, a) {
            var c = -1, d = Yr, D = true, m = e.length, C = [], P = n.length;
            if (!m)
              return C;
            i && (n = Pe(n, pn(i))), a ? (d = Es, D = false) : n.length >= r && (d = mr, D = false, n = new St(n));
            e:
              for (; ++c < m; ) {
                var I = e[c], M = i == null ? I : i(I);
                if (I = a || I !== 0 ? I : 0, D && M === M) {
                  for (var j = P; j--; )
                    if (n[j] === M)
                      continue e;
                  C.push(I);
                } else
                  d(n, M, a) || C.push(I);
              }
            return C;
          }
          var Dt = Za(Kn), Fa = Za($s, true);
          function Bg(e, n) {
            var i = true;
            return Dt(e, function(a, c, d) {
              return i = !!n(a, c, d), i;
            }), i;
          }
          function di(e, n, i) {
            for (var a = -1, c = e.length; ++a < c; ) {
              var d = e[a], D = n(d);
              if (D != null && (m === s ? D === D && !mn(D) : i(D, m)))
                var m = D, C = d;
            }
            return C;
          }
          function Pg(e, n, i, a) {
            var c = e.length;
            for (i = he(i), i < 0 && (i = -i > c ? 0 : c + i), a = a === s || a > c ? c : he(a), a < 0 && (a += c), a = i > a ? 0 : $l(a); i < a; )
              e[i++] = n;
            return e;
          }
          function Ea(e, n) {
            var i = [];
            return Dt(e, function(a, c, d) {
              n(a, c, d) && i.push(a);
            }), i;
          }
          function en(e, n, i, a, c) {
            var d = -1, D = e.length;
            for (i || (i = vp), c || (c = []); ++d < D; ) {
              var m = e[d];
              n > 0 && i(m) ? n > 1 ? en(m, n - 1, i, a, c) : ht(c, m) : a || (c[c.length] = m);
            }
            return c;
          }
          var js = Ja(), xa = Ja(true);
          function Kn(e, n) {
            return e && js(e, n, Ze);
          }
          function $s(e, n) {
            return e && xa(e, n, Ze);
          }
          function gi(e, n) {
            return ft(n, function(i) {
              return it(e[i]);
            });
          }
          function Bt(e, n) {
            n = yt(n, e);
            for (var i = 0, a = n.length; e != null && i < a; )
              e = e[Yn(n[i++])];
            return i && i == a ? e : s;
          }
          function Aa(e, n, i) {
            var a = n(e);
            return fe(e) ? a : ht(a, i(e));
          }
          function un(e) {
            return e == null ? e === s ? J : us : At && At in Ae(e) ? gp(e) : Ap(e);
          }
          function Us(e, n) {
            return e > n;
          }
          function Ig(e, n) {
            return e != null && Ee.call(e, n);
          }
          function Mg(e, n) {
            return e != null && n in Ae(e);
          }
          function Rg(e, n, i) {
            return e >= tn(n, i) && e < Ge(n, i);
          }
          function Ws(e, n, i) {
            for (var a = i ? Es : Yr, c = e[0].length, d = e.length, D = d, m = x(d), C = 1 / 0, P = []; D--; ) {
              var I = e[D];
              D && n && (I = Pe(I, pn(n))), C = tn(I.length, C), m[D] = !i && (n || c >= 120 && I.length >= 120) ? new St(D && I) : s;
            }
            I = e[0];
            var M = -1, j = m[0];
            e:
              for (; ++M < c && P.length < C; ) {
                var Y = I[M], re = n ? n(Y) : Y;
                if (Y = i || Y !== 0 ? Y : 0, !(j ? mr(j, re) : a(P, re, i))) {
                  for (D = d; --D; ) {
                    var de = m[D];
                    if (!(de ? mr(de, re) : a(e[D], re, i)))
                      continue e;
                  }
                  j && j.push(re), P.push(Y);
                }
              }
            return P;
          }
          function Lg(e, n, i, a) {
            return Kn(e, function(c, d, D) {
              n(a, i(c), d, D);
            }), a;
          }
          function Er(e, n, i) {
            n = yt(n, e), e = gl(e, n);
            var a = e == null ? e : e[Yn(kn(n))];
            return a == null ? s : gn(a, e, i);
          }
          function Oa(e) {
            return Te(e) && un(e) == ge;
          }
          function Tg(e) {
            return Te(e) && un(e) == Dr;
          }
          function Ng(e) {
            return Te(e) && un(e) == Me;
          }
          function xr(e, n, i, a, c) {
            return e === n ? true : e == null || n == null || !Te(e) && !Te(n) ? e !== e && n !== n : qg(e, n, i, a, xr, c);
          }
          function qg(e, n, i, a, c, d) {
            var D = fe(e), m = fe(n), C = D ? R : rn(e), P = m ? R : rn(n);
            C = C == ge ? y : C, P = P == ge ? y : P;
            var I = C == y, M = P == y, j = C == P;
            if (j && vt(e)) {
              if (!vt(n))
                return false;
              D = true, I = false;
            }
            if (j && !I)
              return d || (d = new qn()), D || rr(e) ? ol(e, n, i, a, c, d) : hp(e, n, C, i, a, c, d);
            if (!(i & q)) {
              var Y = I && Ee.call(e, "__wrapped__"), re = M && Ee.call(n, "__wrapped__");
              if (Y || re) {
                var de = Y ? e.value() : e, ie = re ? n.value() : n;
                return d || (d = new qn()), c(de, ie, i, a, d);
              }
            }
            return j ? (d || (d = new qn()), dp(e, n, i, a, c, d)) : false;
          }
          function jg(e) {
            return Te(e) && rn(e) == dn;
          }
          function zs(e, n, i, a) {
            var c = i.length, d = c, D = !a;
            if (e == null)
              return !d;
            for (e = Ae(e); c--; ) {
              var m = i[c];
              if (D && m[2] ? m[1] !== e[m[0]] : !(m[0] in e))
                return false;
            }
            for (; ++c < d; ) {
              m = i[c];
              var C = m[0], P = e[C], I = m[1];
              if (D && m[2]) {
                if (P === s && !(C in e))
                  return false;
              } else {
                var M = new qn();
                if (a)
                  var j = a(P, I, C, e, n, M);
                if (!(j === s ? xr(I, P, q | le, a, M) : j))
                  return false;
              }
            }
            return true;
          }
          function Sa(e) {
            if (!Re(e) || Cp(e))
              return false;
            var n = it(e) ? jd : kh;
            return n.test(It(e));
          }
          function $g(e) {
            return Te(e) && un(e) == B;
          }
          function Ug(e) {
            return Te(e) && rn(e) == F;
          }
          function Wg(e) {
            return Te(e) && Bi(e.length) && !!Se[un(e)];
          }
          function ka(e) {
            return typeof e == "function" ? e : e == null ? hn : typeof e == "object" ? fe(e) ? Ia(e[0], e[1]) : Pa(e) : Xl(e);
          }
          function Hs(e) {
            if (!Sr(e))
              return Gd(e);
            var n = [];
            for (var i in Ae(e))
              Ee.call(e, i) && i != "constructor" && n.push(i);
            return n;
          }
          function zg(e) {
            if (!Re(e))
              return xp(e);
            var n = Sr(e), i = [];
            for (var a in e)
              a == "constructor" && (n || !Ee.call(e, a)) || i.push(a);
            return i;
          }
          function Gs(e, n) {
            return e < n;
          }
          function Ba(e, n) {
            var i = -1, a = cn(e) ? x(e.length) : [];
            return Dt(e, function(c, d, D) {
              a[++i] = n(c, d, D);
            }), a;
          }
          function Pa(e) {
            var n = ou(e);
            return n.length == 1 && n[0][2] ? hl(n[0][0], n[0][1]) : function(i) {
              return i === e || zs(i, e, n);
            };
          }
          function Ia(e, n) {
            return lu(e) && fl(n) ? hl(Yn(e), n) : function(i) {
              var a = bu(i, e);
              return a === s && a === n ? vu(i, e) : xr(n, a, q | le);
            };
          }
          function pi(e, n, i, a, c) {
            e !== n && js(n, function(d, D) {
              if (c || (c = new qn()), Re(d))
                Hg(e, n, D, i, pi, a, c);
              else {
                var m = a ? a(fu(e, D), d, D + "", e, n, c) : s;
                m === s && (m = d), Ns(e, D, m);
              }
            }, fn);
          }
          function Hg(e, n, i, a, c, d, D) {
            var m = fu(e, i), C = fu(n, i), P = D.get(C);
            if (P) {
              Ns(e, i, P);
              return;
            }
            var I = d ? d(m, C, i + "", e, n, D) : s, M = I === s;
            if (M) {
              var j = fe(C), Y = !j && vt(C), re = !j && !Y && rr(C);
              I = C, j || Y || re ? fe(m) ? I = m : je(m) ? I = ln(m) : Y ? (M = false, I = Ha(C, true)) : re ? (M = false, I = Ga(C, true)) : I = [] : Br(C) || Mt(C) ? (I = m, Mt(m) ? I = Ul(m) : (!Re(m) || it(m)) && (I = cl(C))) : M = false;
            }
            M && (D.set(C, I), c(I, C, a, d, D), D.delete(C)), Ns(e, i, I);
          }
          function Ma(e, n) {
            var i = e.length;
            if (!!i)
              return n += n < 0 ? i : 0, rt(n, i) ? e[n] : s;
          }
          function Ra(e, n, i) {
            n.length ? n = Pe(n, function(d) {
              return fe(d) ? function(D) {
                return Bt(D, d.length === 1 ? d[0] : d);
              } : d;
            }) : n = [hn];
            var a = -1;
            n = Pe(n, pn(te()));
            var c = Ba(e, function(d, D, m) {
              var C = Pe(n, function(P) {
                return P(d);
              });
              return { criteria: C, index: ++a, value: d };
            });
            return yd(c, function(d, D) {
              return ip(d, D, i);
            });
          }
          function Gg(e, n) {
            return La(e, n, function(i, a) {
              return vu(e, a);
            });
          }
          function La(e, n, i) {
            for (var a = -1, c = n.length, d = {}; ++a < c; ) {
              var D = n[a], m = Bt(e, D);
              i(m, D) && Ar(d, yt(D, e), m);
            }
            return d;
          }
          function Kg(e) {
            return function(n) {
              return Bt(n, e);
            };
          }
          function Ks(e, n, i, a) {
            var c = a ? md : Kt, d = -1, D = n.length, m = e;
            for (e === n && (n = ln(n)), i && (m = Pe(e, pn(i))); ++d < D; )
              for (var C = 0, P = n[d], I = i ? i(P) : P; (C = c(m, I, C, a)) > -1; )
                m !== e && si.call(m, C, 1), si.call(e, C, 1);
            return e;
          }
          function Ta(e, n) {
            for (var i = e ? n.length : 0, a = i - 1; i--; ) {
              var c = n[i];
              if (i == a || c !== d) {
                var d = c;
                rt(c) ? si.call(e, c, 1) : Js(e, c);
              }
            }
            return e;
          }
          function Vs(e, n) {
            return e + ai(ma() * (n - e + 1));
          }
          function Vg(e, n, i, a) {
            for (var c = -1, d = Ge(oi((n - e) / (i || 1)), 0), D = x(d); d--; )
              D[a ? d : ++c] = e, e += i;
            return D;
          }
          function Ys(e, n) {
            var i = "";
            if (!e || n < 1 || n > ve)
              return i;
            do
              n % 2 && (i += e), n = ai(n / 2), n && (e += e);
            while (n);
            return i;
          }
          function pe(e, n) {
            return hu(dl(e, n, hn), e + "");
          }
          function Yg(e) {
            return va(ir(e));
          }
          function Zg(e, n) {
            var i = ir(e);
            return Ei(i, kt(n, 0, i.length));
          }
          function Ar(e, n, i, a) {
            if (!Re(e))
              return e;
            n = yt(n, e);
            for (var c = -1, d = n.length, D = d - 1, m = e; m != null && ++c < d; ) {
              var C = Yn(n[c]), P = i;
              if (C === "__proto__" || C === "constructor" || C === "prototype")
                return e;
              if (c != D) {
                var I = m[C];
                P = a ? a(I, C, m) : s, P === s && (P = Re(I) ? I : rt(n[c + 1]) ? [] : {});
              }
              _r(m, C, P), m = m[C];
            }
            return e;
          }
          var Na = li ? function(e, n) {
            return li.set(e, n), e;
          } : hn, Jg = ui2 ? function(e, n) {
            return ui2(e, "toString", { configurable: true, enumerable: false, value: Cu(n), writable: true });
          } : hn;
          function Xg(e) {
            return Ei(ir(e));
          }
          function Sn(e, n, i) {
            var a = -1, c = e.length;
            n < 0 && (n = -n > c ? 0 : c + n), i = i > c ? c : i, i < 0 && (i += c), c = n > i ? 0 : i - n >>> 0, n >>>= 0;
            for (var d = x(c); ++a < c; )
              d[a] = e[a + n];
            return d;
          }
          function Qg(e, n) {
            var i;
            return Dt(e, function(a, c, d) {
              return i = n(a, c, d), !i;
            }), !!i;
          }
          function Di(e, n, i) {
            var a = 0, c = e == null ? a : e.length;
            if (typeof n == "number" && n === n && c <= V) {
              for (; a < c; ) {
                var d = a + c >>> 1, D = e[d];
                D !== null && !mn(D) && (i ? D <= n : D < n) ? a = d + 1 : c = d;
              }
              return c;
            }
            return Zs(e, n, hn, i);
          }
          function Zs(e, n, i, a) {
            var c = 0, d = e == null ? 0 : e.length;
            if (d === 0)
              return 0;
            n = i(n);
            for (var D = n !== n, m = n === null, C = mn(n), P = n === s; c < d; ) {
              var I = ai((c + d) / 2), M = i(e[I]), j = M !== s, Y = M === null, re = M === M, de = mn(M);
              if (D)
                var ie = a || re;
              else
                P ? ie = re && (a || j) : m ? ie = re && j && (a || !Y) : C ? ie = re && j && !Y && (a || !de) : Y || de ? ie = false : ie = a ? M <= n : M < n;
              ie ? c = I + 1 : d = I;
            }
            return tn(d, ct);
          }
          function qa(e, n) {
            for (var i = -1, a = e.length, c = 0, d = []; ++i < a; ) {
              var D = e[i], m = n ? n(D) : D;
              if (!i || !jn(m, C)) {
                var C = m;
                d[c++] = D === 0 ? 0 : D;
              }
            }
            return d;
          }
          function ja(e) {
            return typeof e == "number" ? e : mn(e) ? Hn : +e;
          }
          function Dn(e) {
            if (typeof e == "string")
              return e;
            if (fe(e))
              return Pe(e, Dn) + "";
            if (mn(e))
              return ya ? ya.call(e) : "";
            var n = e + "";
            return n == "0" && 1 / e == -Xe ? "-0" : n;
          }
          function mt(e, n, i) {
            var a = -1, c = Yr, d = e.length, D = true, m = [], C = m;
            if (i)
              D = false, c = Es;
            else if (d >= r) {
              var P = n ? null : cp(e);
              if (P)
                return Jr(P);
              D = false, c = mr, C = new St();
            } else
              C = n ? [] : m;
            e:
              for (; ++a < d; ) {
                var I = e[a], M = n ? n(I) : I;
                if (I = i || I !== 0 ? I : 0, D && M === M) {
                  for (var j = C.length; j--; )
                    if (C[j] === M)
                      continue e;
                  n && C.push(M), m.push(I);
                } else
                  c(C, M, i) || (C !== m && C.push(M), m.push(I));
              }
            return m;
          }
          function Js(e, n) {
            return n = yt(n, e), e = gl(e, n), e == null || delete e[Yn(kn(n))];
          }
          function $a(e, n, i, a) {
            return Ar(e, n, i(Bt(e, n)), a);
          }
          function mi(e, n, i, a) {
            for (var c = e.length, d = a ? c : -1; (a ? d-- : ++d < c) && n(e[d], d, e); )
              ;
            return i ? Sn(e, a ? 0 : d, a ? d + 1 : c) : Sn(e, a ? d + 1 : 0, a ? c : d);
          }
          function Ua(e, n) {
            var i = e;
            return i instanceof ye && (i = i.value()), xs(n, function(a, c) {
              return c.func.apply(c.thisArg, ht([a], c.args));
            }, i);
          }
          function Xs(e, n, i) {
            var a = e.length;
            if (a < 2)
              return a ? mt(e[0]) : [];
            for (var c = -1, d = x(a); ++c < a; )
              for (var D = e[c], m = -1; ++m < a; )
                m != c && (d[c] = Fr(d[c] || D, e[m], n, i));
            return mt(en(d, 1), n, i);
          }
          function Wa(e, n, i) {
            for (var a = -1, c = e.length, d = n.length, D = {}; ++a < c; ) {
              var m = a < d ? n[a] : s;
              i(D, e[a], m);
            }
            return D;
          }
          function Qs(e) {
            return je(e) ? e : [];
          }
          function eu(e) {
            return typeof e == "function" ? e : hn;
          }
          function yt(e, n) {
            return fe(e) ? e : lu(e, n) ? [e] : yl(Fe(e));
          }
          var ep = pe;
          function bt(e, n, i) {
            var a = e.length;
            return i = i === s ? a : i, !n && i >= a ? e : Sn(e, n, i);
          }
          var za = $d || function(e) {
            return Ye.clearTimeout(e);
          };
          function Ha(e, n) {
            if (n)
              return e.slice();
            var i = e.length, a = ha ? ha(i) : new e.constructor(i);
            return e.copy(a), a;
          }
          function nu(e) {
            var n = new e.constructor(e.byteLength);
            return new ri(n).set(new ri(e)), n;
          }
          function np(e, n) {
            var i = n ? nu(e.buffer) : e.buffer;
            return new e.constructor(i, e.byteOffset, e.byteLength);
          }
          function tp(e) {
            var n = new e.constructor(e.source, Oo.exec(e));
            return n.lastIndex = e.lastIndex, n;
          }
          function rp(e) {
            return Cr ? Ae(Cr.call(e)) : {};
          }
          function Ga(e, n) {
            var i = n ? nu(e.buffer) : e.buffer;
            return new e.constructor(i, e.byteOffset, e.length);
          }
          function Ka(e, n) {
            if (e !== n) {
              var i = e !== s, a = e === null, c = e === e, d = mn(e), D = n !== s, m = n === null, C = n === n, P = mn(n);
              if (!m && !P && !d && e > n || d && D && C && !m && !P || a && D && C || !i && C || !c)
                return 1;
              if (!a && !d && !P && e < n || P && i && c && !a && !d || m && i && c || !D && c || !C)
                return -1;
            }
            return 0;
          }
          function ip(e, n, i) {
            for (var a = -1, c = e.criteria, d = n.criteria, D = c.length, m = i.length; ++a < D; ) {
              var C = Ka(c[a], d[a]);
              if (C) {
                if (a >= m)
                  return C;
                var P = i[a];
                return C * (P == "desc" ? -1 : 1);
              }
            }
            return e.index - n.index;
          }
          function Va(e, n, i, a) {
            for (var c = -1, d = e.length, D = i.length, m = -1, C = n.length, P = Ge(d - D, 0), I = x(C + P), M = !a; ++m < C; )
              I[m] = n[m];
            for (; ++c < D; )
              (M || c < d) && (I[i[c]] = e[c]);
            for (; P--; )
              I[m++] = e[c++];
            return I;
          }
          function Ya(e, n, i, a) {
            for (var c = -1, d = e.length, D = -1, m = i.length, C = -1, P = n.length, I = Ge(d - m, 0), M = x(I + P), j = !a; ++c < I; )
              M[c] = e[c];
            for (var Y = c; ++C < P; )
              M[Y + C] = n[C];
            for (; ++D < m; )
              (j || c < d) && (M[Y + i[D]] = e[c++]);
            return M;
          }
          function ln(e, n) {
            var i = -1, a = e.length;
            for (n || (n = x(a)); ++i < a; )
              n[i] = e[i];
            return n;
          }
          function Vn(e, n, i, a) {
            var c = !i;
            i || (i = {});
            for (var d = -1, D = n.length; ++d < D; ) {
              var m = n[d], C = a ? a(i[m], e[m], m, i, e) : s;
              C === s && (C = e[m]), c ? et(i, m, C) : _r(i, m, C);
            }
            return i;
          }
          function sp(e, n) {
            return Vn(e, au(e), n);
          }
          function up(e, n) {
            return Vn(e, al(e), n);
          }
          function yi(e, n) {
            return function(i, a) {
              var c = fe(i) ? fd : Og, d = n ? n() : {};
              return c(i, e, te(a, 2), d);
            };
          }
          function er(e) {
            return pe(function(n, i) {
              var a = -1, c = i.length, d = c > 1 ? i[c - 1] : s, D = c > 2 ? i[2] : s;
              for (d = e.length > 3 && typeof d == "function" ? (c--, d) : s, D && on(i[0], i[1], D) && (d = c < 3 ? s : d, c = 1), n = Ae(n); ++a < c; ) {
                var m = i[a];
                m && e(n, m, a, d);
              }
              return n;
            });
          }
          function Za(e, n) {
            return function(i, a) {
              if (i == null)
                return i;
              if (!cn(i))
                return e(i, a);
              for (var c = i.length, d = n ? c : -1, D = Ae(i); (n ? d-- : ++d < c) && a(D[d], d, D) !== false; )
                ;
              return i;
            };
          }
          function Ja(e) {
            return function(n, i, a) {
              for (var c = -1, d = Ae(n), D = a(n), m = D.length; m--; ) {
                var C = D[e ? m : ++c];
                if (i(d[C], C, d) === false)
                  break;
              }
              return n;
            };
          }
          function op(e, n, i) {
            var a = n & L2, c = Or(e);
            function d() {
              var D = this && this !== Ye && this instanceof d ? c : e;
              return D.apply(a ? i : this, arguments);
            }
            return d;
          }
          function Xa(e) {
            return function(n) {
              n = Fe(n);
              var i = Vt(n) ? Nn(n) : s, a = i ? i[0] : n.charAt(0), c = i ? bt(i, 1).join("") : n.slice(1);
              return a[e]() + c;
            };
          }
          function nr(e) {
            return function(n) {
              return xs(Zl(Yl(n).replace(Jh, "")), e, "");
            };
          }
          function Or(e) {
            return function() {
              var n = arguments;
              switch (n.length) {
                case 0:
                  return new e();
                case 1:
                  return new e(n[0]);
                case 2:
                  return new e(n[0], n[1]);
                case 3:
                  return new e(n[0], n[1], n[2]);
                case 4:
                  return new e(n[0], n[1], n[2], n[3]);
                case 5:
                  return new e(n[0], n[1], n[2], n[3], n[4]);
                case 6:
                  return new e(n[0], n[1], n[2], n[3], n[4], n[5]);
                case 7:
                  return new e(n[0], n[1], n[2], n[3], n[4], n[5], n[6]);
              }
              var i = Qt(e.prototype), a = e.apply(i, n);
              return Re(a) ? a : i;
            };
          }
          function ap(e, n, i) {
            var a = Or(e);
            function c() {
              for (var d = arguments.length, D = x(d), m = d, C = tr(c); m--; )
                D[m] = arguments[m];
              var P = d < 3 && D[0] !== C && D[d - 1] !== C ? [] : dt(D, C);
              if (d -= P.length, d < i)
                return rl(e, n, bi, c.placeholder, s, D, P, s, s, i - d);
              var I = this && this !== Ye && this instanceof c ? a : e;
              return gn(I, this, D);
            }
            return c;
          }
          function Qa(e) {
            return function(n, i, a) {
              var c = Ae(n);
              if (!cn(n)) {
                var d = te(i, 3);
                n = Ze(n), i = function(m) {
                  return d(c[m], m, c);
                };
              }
              var D = e(n, i, a);
              return D > -1 ? c[d ? n[D] : D] : s;
            };
          }
          function el(e) {
            return tt(function(n) {
              var i = n.length, a = i, c = An.prototype.thru;
              for (e && n.reverse(); a--; ) {
                var d = n[a];
                if (typeof d != "function")
                  throw new xn(o);
                if (c && !D && _i(d) == "wrapper")
                  var D = new An([], true);
              }
              for (a = D ? a : i; ++a < i; ) {
                d = n[a];
                var m = _i(d), C = m == "wrapper" ? uu(d) : s;
                C && cu(C[0]) && C[1] == (ce | Q | z | nn) && !C[4].length && C[9] == 1 ? D = D[_i(C[0])].apply(D, C[3]) : D = d.length == 1 && cu(d) ? D[m]() : D.thru(d);
              }
              return function() {
                var P = arguments, I = P[0];
                if (D && P.length == 1 && fe(I))
                  return D.plant(I).value();
                for (var M = 0, j = i ? n[M].apply(this, P) : I; ++M < i; )
                  j = n[M].call(this, j);
                return j;
              };
            });
          }
          function bi(e, n, i, a, c, d, D, m, C, P) {
            var I = n & ce, M = n & L2, j = n & A, Y = n & (Q | ee), re = n & qe, de = j ? s : Or(e);
            function ie() {
              for (var me = arguments.length, be = x(me), yn = me; yn--; )
                be[yn] = arguments[yn];
              if (Y)
                var an = tr(ie), bn = vd(be, an);
              if (a && (be = Va(be, a, c, Y)), d && (be = Ya(be, d, D, Y)), me -= bn, Y && me < P) {
                var $e = dt(be, an);
                return rl(e, n, bi, ie.placeholder, i, be, $e, m, C, P - me);
              }
              var $n = M ? i : this, ut = j ? $n[e] : e;
              return me = be.length, m ? be = Op(be, m) : re && me > 1 && be.reverse(), I && C < me && (be.length = C), this && this !== Ye && this instanceof ie && (ut = de || Or(ut)), ut.apply($n, be);
            }
            return ie;
          }
          function nl(e, n) {
            return function(i, a) {
              return Lg(i, e, n(a), {});
            };
          }
          function vi(e, n) {
            return function(i, a) {
              var c;
              if (i === s && a === s)
                return n;
              if (i !== s && (c = i), a !== s) {
                if (c === s)
                  return a;
                typeof i == "string" || typeof a == "string" ? (i = Dn(i), a = Dn(a)) : (i = ja(i), a = ja(a)), c = e(i, a);
              }
              return c;
            };
          }
          function tu(e) {
            return tt(function(n) {
              return n = Pe(n, pn(te())), pe(function(i) {
                var a = this;
                return e(n, function(c) {
                  return gn(c, a, i);
                });
              });
            });
          }
          function wi(e, n) {
            n = n === s ? " " : Dn(n);
            var i = n.length;
            if (i < 2)
              return i ? Ys(n, e) : n;
            var a = Ys(n, oi(e / Yt(n)));
            return Vt(n) ? bt(Nn(a), 0, e).join("") : a.slice(0, e);
          }
          function lp(e, n, i, a) {
            var c = n & L2, d = Or(e);
            function D() {
              for (var m = -1, C = arguments.length, P = -1, I = a.length, M = x(I + C), j = this && this !== Ye && this instanceof D ? d : e; ++P < I; )
                M[P] = a[P];
              for (; C--; )
                M[P++] = arguments[++m];
              return gn(j, c ? i : this, M);
            }
            return D;
          }
          function tl(e) {
            return function(n, i, a) {
              return a && typeof a != "number" && on(n, i, a) && (i = a = s), n = st(n), i === s ? (i = n, n = 0) : i = st(i), a = a === s ? n < i ? 1 : -1 : st(a), Vg(n, i, a, e);
            };
          }
          function Ci(e) {
            return function(n, i) {
              return typeof n == "string" && typeof i == "string" || (n = Bn(n), i = Bn(i)), e(n, i);
            };
          }
          function rl(e, n, i, a, c, d, D, m, C, P) {
            var I = n & Q, M = I ? D : s, j = I ? s : D, Y = I ? d : s, re = I ? s : d;
            n |= I ? z : De, n &= ~(I ? De : z), n & w || (n &= ~(L2 | A));
            var de = [e, n, c, Y, M, re, j, m, C, P], ie = i.apply(s, de);
            return cu(e) && pl(ie, de), ie.placeholder = a, Dl(ie, e, n);
          }
          function ru(e) {
            var n = He[e];
            return function(i, a) {
              if (i = Bn(i), a = a == null ? 0 : tn(he(a), 292), a && Da(i)) {
                var c = (Fe(i) + "e").split("e"), d = n(c[0] + "e" + (+c[1] + a));
                return c = (Fe(d) + "e").split("e"), +(c[0] + "e" + (+c[1] - a));
              }
              return n(i);
            };
          }
          var cp = Jt && 1 / Jr(new Jt([, -0]))[1] == Xe ? function(e) {
            return new Jt(e);
          } : Eu;
          function il(e) {
            return function(n) {
              var i = rn(n);
              return i == dn ? Is(n) : i == F ? Ad(n) : bd(n, e(n));
            };
          }
          function nt(e, n, i, a, c, d, D, m) {
            var C = n & A;
            if (!C && typeof e != "function")
              throw new xn(o);
            var P = a ? a.length : 0;
            if (P || (n &= ~(z | De), a = c = s), D = D === s ? D : Ge(he(D), 0), m = m === s ? m : he(m), P -= c ? c.length : 0, n & De) {
              var I = a, M = c;
              a = c = s;
            }
            var j = C ? s : uu(e), Y = [e, n, i, a, c, I, M, d, D, m];
            if (j && Ep(Y, j), e = Y[0], n = Y[1], i = Y[2], a = Y[3], c = Y[4], m = Y[9] = Y[9] === s ? C ? 0 : e.length : Ge(Y[9] - P, 0), !m && n & (Q | ee) && (n &= ~(Q | ee)), !n || n == L2)
              var re = op(e, n, i);
            else
              n == Q || n == ee ? re = ap(e, n, m) : (n == z || n == (L2 | z)) && !c.length ? re = lp(e, n, i, a) : re = bi.apply(s, Y);
            var de = j ? Na : pl;
            return Dl(de(re, Y), e, n);
          }
          function sl(e, n, i, a) {
            return e === s || jn(e, Zt[i]) && !Ee.call(a, i) ? n : e;
          }
          function ul(e, n, i, a, c, d) {
            return Re(e) && Re(n) && (d.set(n, e), pi(e, n, s, ul, d), d.delete(n)), e;
          }
          function fp(e) {
            return Br(e) ? s : e;
          }
          function ol(e, n, i, a, c, d) {
            var D = i & q, m = e.length, C = n.length;
            if (m != C && !(D && C > m))
              return false;
            var P = d.get(e), I = d.get(n);
            if (P && I)
              return P == n && I == e;
            var M = -1, j = true, Y = i & le ? new St() : s;
            for (d.set(e, n), d.set(n, e); ++M < m; ) {
              var re = e[M], de = n[M];
              if (a)
                var ie = D ? a(de, re, M, n, e, d) : a(re, de, M, e, n, d);
              if (ie !== s) {
                if (ie)
                  continue;
                j = false;
                break;
              }
              if (Y) {
                if (!As(n, function(me, be) {
                  if (!mr(Y, be) && (re === me || c(re, me, i, a, d)))
                    return Y.push(be);
                })) {
                  j = false;
                  break;
                }
              } else if (!(re === de || c(re, de, i, a, d))) {
                j = false;
                break;
              }
            }
            return d.delete(e), d.delete(n), j;
          }
          function hp(e, n, i, a, c, d, D) {
            switch (i) {
              case Ht:
                if (e.byteLength != n.byteLength || e.byteOffset != n.byteOffset)
                  return false;
                e = e.buffer, n = n.buffer;
              case Dr:
                return !(e.byteLength != n.byteLength || !d(new ri(e), new ri(n)));
              case _e:
              case Me:
              case sn:
                return jn(+e, +n);
              case Gn:
                return e.name == n.name && e.message == n.message;
              case B:
              case U:
                return e == n + "";
              case dn:
                var m = Is;
              case F:
                var C = a & q;
                if (m || (m = Jr), e.size != n.size && !C)
                  return false;
                var P = D.get(e);
                if (P)
                  return P == n;
                a |= le, D.set(e, n);
                var I = ol(m(e), m(n), a, c, d, D);
                return D.delete(e), I;
              case $:
                if (Cr)
                  return Cr.call(e) == Cr.call(n);
            }
            return false;
          }
          function dp(e, n, i, a, c, d) {
            var D = i & q, m = iu(e), C = m.length, P = iu(n), I = P.length;
            if (C != I && !D)
              return false;
            for (var M = C; M--; ) {
              var j = m[M];
              if (!(D ? j in n : Ee.call(n, j)))
                return false;
            }
            var Y = d.get(e), re = d.get(n);
            if (Y && re)
              return Y == n && re == e;
            var de = true;
            d.set(e, n), d.set(n, e);
            for (var ie = D; ++M < C; ) {
              j = m[M];
              var me = e[j], be = n[j];
              if (a)
                var yn = D ? a(be, me, j, n, e, d) : a(me, be, j, e, n, d);
              if (!(yn === s ? me === be || c(me, be, i, a, d) : yn)) {
                de = false;
                break;
              }
              ie || (ie = j == "constructor");
            }
            if (de && !ie) {
              var an = e.constructor, bn = n.constructor;
              an != bn && "constructor" in e && "constructor" in n && !(typeof an == "function" && an instanceof an && typeof bn == "function" && bn instanceof bn) && (de = false);
            }
            return d.delete(e), d.delete(n), de;
          }
          function tt(e) {
            return hu(dl(e, s, Cl), e + "");
          }
          function iu(e) {
            return Aa(e, Ze, au);
          }
          function su(e) {
            return Aa(e, fn, al);
          }
          var uu = li ? function(e) {
            return li.get(e);
          } : Eu;
          function _i(e) {
            for (var n = e.name + "", i = Xt[n], a = Ee.call(Xt, n) ? i.length : 0; a--; ) {
              var c = i[a], d = c.func;
              if (d == null || d == e)
                return c.name;
            }
            return n;
          }
          function tr(e) {
            var n = Ee.call(h, "placeholder") ? h : e;
            return n.placeholder;
          }
          function te() {
            var e = h.iteratee || _u;
            return e = e === _u ? ka : e, arguments.length ? e(arguments[0], arguments[1]) : e;
          }
          function Fi(e, n) {
            var i = e.__data__;
            return wp(n) ? i[typeof n == "string" ? "string" : "hash"] : i.map;
          }
          function ou(e) {
            for (var n = Ze(e), i = n.length; i--; ) {
              var a = n[i], c = e[a];
              n[i] = [a, c, fl(c)];
            }
            return n;
          }
          function Pt(e, n) {
            var i = Fd(e, n);
            return Sa(i) ? i : s;
          }
          function gp(e) {
            var n = Ee.call(e, At), i = e[At];
            try {
              e[At] = s;
              var a = true;
            } catch {
            }
            var c = ni.call(e);
            return a && (n ? e[At] = i : delete e[At]), c;
          }
          var au = Rs ? function(e) {
            return e == null ? [] : (e = Ae(e), ft(Rs(e), function(n) {
              return ga.call(e, n);
            }));
          } : xu, al = Rs ? function(e) {
            for (var n = []; e; )
              ht(n, au(e)), e = ii(e);
            return n;
          } : xu, rn = un;
          (Ls && rn(new Ls(new ArrayBuffer(1))) != Ht || br && rn(new br()) != dn || Ts && rn(Ts.resolve()) != E || Jt && rn(new Jt()) != F || vr && rn(new vr()) != Be) && (rn = function(e) {
            var n = un(e), i = n == y ? e.constructor : s, a = i ? It(i) : "";
            if (a)
              switch (a) {
                case Zd:
                  return Ht;
                case Jd:
                  return dn;
                case Xd:
                  return E;
                case Qd:
                  return F;
                case eg:
                  return Be;
              }
            return n;
          });
          function pp(e, n, i) {
            for (var a = -1, c = i.length; ++a < c; ) {
              var d = i[a], D = d.size;
              switch (d.type) {
                case "drop":
                  e += D;
                  break;
                case "dropRight":
                  n -= D;
                  break;
                case "take":
                  n = tn(n, e + D);
                  break;
                case "takeRight":
                  e = Ge(e, n - D);
                  break;
              }
            }
            return { start: e, end: n };
          }
          function Dp(e) {
            var n = e.match(Ch);
            return n ? n[1].split(_h) : [];
          }
          function ll(e, n, i) {
            n = yt(n, e);
            for (var a = -1, c = n.length, d = false; ++a < c; ) {
              var D = Yn(n[a]);
              if (!(d = e != null && i(e, D)))
                break;
              e = e[D];
            }
            return d || ++a != c ? d : (c = e == null ? 0 : e.length, !!c && Bi(c) && rt(D, c) && (fe(e) || Mt(e)));
          }
          function mp(e) {
            var n = e.length, i = new e.constructor(n);
            return n && typeof e[0] == "string" && Ee.call(e, "index") && (i.index = e.index, i.input = e.input), i;
          }
          function cl(e) {
            return typeof e.constructor == "function" && !Sr(e) ? Qt(ii(e)) : {};
          }
          function yp(e, n, i) {
            var a = e.constructor;
            switch (n) {
              case Dr:
                return nu(e);
              case _e:
              case Me:
                return new a(+e);
              case Ht:
                return np(e, i);
              case os:
              case as:
              case ls:
              case cs:
              case fs:
              case hs:
              case ds:
              case gs:
              case ps:
                return Ga(e, i);
              case dn:
                return new a();
              case sn:
              case U:
                return new a(e);
              case B:
                return tp(e);
              case F:
                return new a();
              case $:
                return rp(e);
            }
          }
          function bp(e, n) {
            var i = n.length;
            if (!i)
              return e;
            var a = i - 1;
            return n[a] = (i > 1 ? "& " : "") + n[a], n = n.join(i > 2 ? ", " : " "), e.replace(wh, `{
/* [wrapped with ` + n + `] */
`);
          }
          function vp(e) {
            return fe(e) || Mt(e) || !!(pa && e && e[pa]);
          }
          function rt(e, n) {
            var i = typeof e;
            return n = n ?? ve, !!n && (i == "number" || i != "symbol" && Ph.test(e)) && e > -1 && e % 1 == 0 && e < n;
          }
          function on(e, n, i) {
            if (!Re(i))
              return false;
            var a = typeof n;
            return (a == "number" ? cn(i) && rt(n, i.length) : a == "string" && n in i) ? jn(i[n], e) : false;
          }
          function lu(e, n) {
            if (fe(e))
              return false;
            var i = typeof e;
            return i == "number" || i == "symbol" || i == "boolean" || e == null || mn(e) ? true : mh.test(e) || !Dh.test(e) || n != null && e in Ae(n);
          }
          function wp(e) {
            var n = typeof e;
            return n == "string" || n == "number" || n == "symbol" || n == "boolean" ? e !== "__proto__" : e === null;
          }
          function cu(e) {
            var n = _i(e), i = h[n];
            if (typeof i != "function" || !(n in ye.prototype))
              return false;
            if (e === i)
              return true;
            var a = uu(i);
            return !!a && e === a[0];
          }
          function Cp(e) {
            return !!fa && fa in e;
          }
          var _p = Qr ? it : Au;
          function Sr(e) {
            var n = e && e.constructor, i = typeof n == "function" && n.prototype || Zt;
            return e === i;
          }
          function fl(e) {
            return e === e && !Re(e);
          }
          function hl(e, n) {
            return function(i) {
              return i == null ? false : i[e] === n && (n !== s || e in Ae(i));
            };
          }
          function Fp(e) {
            var n = Si(e, function(a) {
              return i.size === g && i.clear(), a;
            }), i = n.cache;
            return n;
          }
          function Ep(e, n) {
            var i = e[1], a = n[1], c = i | a, d = c < (L2 | A | ce), D = a == ce && i == Q || a == ce && i == nn && e[7].length <= n[8] || a == (ce | nn) && n[7].length <= n[8] && i == Q;
            if (!(d || D))
              return e;
            a & L2 && (e[2] = n[2], c |= i & L2 ? 0 : w);
            var m = n[3];
            if (m) {
              var C = e[3];
              e[3] = C ? Va(C, m, n[4]) : m, e[4] = C ? dt(e[3], v) : n[4];
            }
            return m = n[5], m && (C = e[5], e[5] = C ? Ya(C, m, n[6]) : m, e[6] = C ? dt(e[5], v) : n[6]), m = n[7], m && (e[7] = m), a & ce && (e[8] = e[8] == null ? n[8] : tn(e[8], n[8])), e[9] == null && (e[9] = n[9]), e[0] = n[0], e[1] = c, e;
          }
          function xp(e) {
            var n = [];
            if (e != null)
              for (var i in Ae(e))
                n.push(i);
            return n;
          }
          function Ap(e) {
            return ni.call(e);
          }
          function dl(e, n, i) {
            return n = Ge(n === s ? e.length - 1 : n, 0), function() {
              for (var a = arguments, c = -1, d = Ge(a.length - n, 0), D = x(d); ++c < d; )
                D[c] = a[n + c];
              c = -1;
              for (var m = x(n + 1); ++c < n; )
                m[c] = a[c];
              return m[n] = i(D), gn(e, this, m);
            };
          }
          function gl(e, n) {
            return n.length < 2 ? e : Bt(e, Sn(n, 0, -1));
          }
          function Op(e, n) {
            for (var i = e.length, a = tn(n.length, i), c = ln(e); a--; ) {
              var d = n[a];
              e[a] = rt(d, i) ? c[d] : s;
            }
            return e;
          }
          function fu(e, n) {
            if (!(n === "constructor" && typeof e[n] == "function") && n != "__proto__")
              return e[n];
          }
          var pl = ml(Na), kr = Wd || function(e, n) {
            return Ye.setTimeout(e, n);
          }, hu = ml(Jg);
          function Dl(e, n, i) {
            var a = n + "";
            return hu(e, bp(a, Sp(Dp(a), i)));
          }
          function ml(e) {
            var n = 0, i = 0;
            return function() {
              var a = Kd(), c = Ie - (a - i);
              if (i = a, c > 0) {
                if (++n >= Z)
                  return arguments[0];
              } else
                n = 0;
              return e.apply(s, arguments);
            };
          }
          function Ei(e, n) {
            var i = -1, a = e.length, c = a - 1;
            for (n = n === s ? a : n; ++i < n; ) {
              var d = Vs(i, c), D = e[d];
              e[d] = e[i], e[i] = D;
            }
            return e.length = n, e;
          }
          var yl = Fp(function(e) {
            var n = [];
            return e.charCodeAt(0) === 46 && n.push(""), e.replace(yh, function(i, a, c, d) {
              n.push(c ? d.replace(xh, "$1") : a || i);
            }), n;
          });
          function Yn(e) {
            if (typeof e == "string" || mn(e))
              return e;
            var n = e + "";
            return n == "0" && 1 / e == -Xe ? "-0" : n;
          }
          function It(e) {
            if (e != null) {
              try {
                return ei.call(e);
              } catch {
              }
              try {
                return e + "";
              } catch {
              }
            }
            return "";
          }
          function Sp(e, n) {
            return En(ue, function(i) {
              var a = "_." + i[0];
              n & i[1] && !Yr(e, a) && e.push(a);
            }), e.sort();
          }
          function bl(e) {
            if (e instanceof ye)
              return e.clone();
            var n = new An(e.__wrapped__, e.__chain__);
            return n.__actions__ = ln(e.__actions__), n.__index__ = e.__index__, n.__values__ = e.__values__, n;
          }
          function kp(e, n, i) {
            (i ? on(e, n, i) : n === s) ? n = 1 : n = Ge(he(n), 0);
            var a = e == null ? 0 : e.length;
            if (!a || n < 1)
              return [];
            for (var c = 0, d = 0, D = x(oi(a / n)); c < a; )
              D[d++] = Sn(e, c, c += n);
            return D;
          }
          function Bp(e) {
            for (var n = -1, i = e == null ? 0 : e.length, a = 0, c = []; ++n < i; ) {
              var d = e[n];
              d && (c[a++] = d);
            }
            return c;
          }
          function Pp() {
            var e = arguments.length;
            if (!e)
              return [];
            for (var n = x(e - 1), i = arguments[0], a = e; a--; )
              n[a - 1] = arguments[a];
            return ht(fe(i) ? ln(i) : [i], en(n, 1));
          }
          var Ip = pe(function(e, n) {
            return je(e) ? Fr(e, en(n, 1, je, true)) : [];
          }), Mp = pe(function(e, n) {
            var i = kn(n);
            return je(i) && (i = s), je(e) ? Fr(e, en(n, 1, je, true), te(i, 2)) : [];
          }), Rp = pe(function(e, n) {
            var i = kn(n);
            return je(i) && (i = s), je(e) ? Fr(e, en(n, 1, je, true), s, i) : [];
          });
          function Lp(e, n, i) {
            var a = e == null ? 0 : e.length;
            return a ? (n = i || n === s ? 1 : he(n), Sn(e, n < 0 ? 0 : n, a)) : [];
          }
          function Tp(e, n, i) {
            var a = e == null ? 0 : e.length;
            return a ? (n = i || n === s ? 1 : he(n), n = a - n, Sn(e, 0, n < 0 ? 0 : n)) : [];
          }
          function Np(e, n) {
            return e && e.length ? mi(e, te(n, 3), true, true) : [];
          }
          function qp(e, n) {
            return e && e.length ? mi(e, te(n, 3), true) : [];
          }
          function jp(e, n, i, a) {
            var c = e == null ? 0 : e.length;
            return c ? (i && typeof i != "number" && on(e, n, i) && (i = 0, a = c), Pg(e, n, i, a)) : [];
          }
          function vl(e, n, i) {
            var a = e == null ? 0 : e.length;
            if (!a)
              return -1;
            var c = i == null ? 0 : he(i);
            return c < 0 && (c = Ge(a + c, 0)), Zr(e, te(n, 3), c);
          }
          function wl(e, n, i) {
            var a = e == null ? 0 : e.length;
            if (!a)
              return -1;
            var c = a - 1;
            return i !== s && (c = he(i), c = i < 0 ? Ge(a + c, 0) : tn(c, a - 1)), Zr(e, te(n, 3), c, true);
          }
          function Cl(e) {
            var n = e == null ? 0 : e.length;
            return n ? en(e, 1) : [];
          }
          function $p(e) {
            var n = e == null ? 0 : e.length;
            return n ? en(e, Xe) : [];
          }
          function Up(e, n) {
            var i = e == null ? 0 : e.length;
            return i ? (n = n === s ? 1 : he(n), en(e, n)) : [];
          }
          function Wp(e) {
            for (var n = -1, i = e == null ? 0 : e.length, a = {}; ++n < i; ) {
              var c = e[n];
              a[c[0]] = c[1];
            }
            return a;
          }
          function _l(e) {
            return e && e.length ? e[0] : s;
          }
          function zp(e, n, i) {
            var a = e == null ? 0 : e.length;
            if (!a)
              return -1;
            var c = i == null ? 0 : he(i);
            return c < 0 && (c = Ge(a + c, 0)), Kt(e, n, c);
          }
          function Hp(e) {
            var n = e == null ? 0 : e.length;
            return n ? Sn(e, 0, -1) : [];
          }
          var Gp = pe(function(e) {
            var n = Pe(e, Qs);
            return n.length && n[0] === e[0] ? Ws(n) : [];
          }), Kp = pe(function(e) {
            var n = kn(e), i = Pe(e, Qs);
            return n === kn(i) ? n = s : i.pop(), i.length && i[0] === e[0] ? Ws(i, te(n, 2)) : [];
          }), Vp = pe(function(e) {
            var n = kn(e), i = Pe(e, Qs);
            return n = typeof n == "function" ? n : s, n && i.pop(), i.length && i[0] === e[0] ? Ws(i, s, n) : [];
          });
          function Yp(e, n) {
            return e == null ? "" : Hd.call(e, n);
          }
          function kn(e) {
            var n = e == null ? 0 : e.length;
            return n ? e[n - 1] : s;
          }
          function Zp(e, n, i) {
            var a = e == null ? 0 : e.length;
            if (!a)
              return -1;
            var c = a;
            return i !== s && (c = he(i), c = c < 0 ? Ge(a + c, 0) : tn(c, a - 1)), n === n ? Sd(e, n, c) : Zr(e, ra, c, true);
          }
          function Jp(e, n) {
            return e && e.length ? Ma(e, he(n)) : s;
          }
          var Xp = pe(Fl);
          function Fl(e, n) {
            return e && e.length && n && n.length ? Ks(e, n) : e;
          }
          function Qp(e, n, i) {
            return e && e.length && n && n.length ? Ks(e, n, te(i, 2)) : e;
          }
          function eD(e, n, i) {
            return e && e.length && n && n.length ? Ks(e, n, s, i) : e;
          }
          var nD = tt(function(e, n) {
            var i = e == null ? 0 : e.length, a = qs(e, n);
            return Ta(e, Pe(n, function(c) {
              return rt(c, i) ? +c : c;
            }).sort(Ka)), a;
          });
          function tD(e, n) {
            var i = [];
            if (!(e && e.length))
              return i;
            var a = -1, c = [], d = e.length;
            for (n = te(n, 3); ++a < d; ) {
              var D = e[a];
              n(D, a, e) && (i.push(D), c.push(a));
            }
            return Ta(e, c), i;
          }
          function du(e) {
            return e == null ? e : Yd.call(e);
          }
          function rD(e, n, i) {
            var a = e == null ? 0 : e.length;
            return a ? (i && typeof i != "number" && on(e, n, i) ? (n = 0, i = a) : (n = n == null ? 0 : he(n), i = i === s ? a : he(i)), Sn(e, n, i)) : [];
          }
          function iD(e, n) {
            return Di(e, n);
          }
          function sD(e, n, i) {
            return Zs(e, n, te(i, 2));
          }
          function uD(e, n) {
            var i = e == null ? 0 : e.length;
            if (i) {
              var a = Di(e, n);
              if (a < i && jn(e[a], n))
                return a;
            }
            return -1;
          }
          function oD(e, n) {
            return Di(e, n, true);
          }
          function aD(e, n, i) {
            return Zs(e, n, te(i, 2), true);
          }
          function lD(e, n) {
            var i = e == null ? 0 : e.length;
            if (i) {
              var a = Di(e, n, true) - 1;
              if (jn(e[a], n))
                return a;
            }
            return -1;
          }
          function cD(e) {
            return e && e.length ? qa(e) : [];
          }
          function fD(e, n) {
            return e && e.length ? qa(e, te(n, 2)) : [];
          }
          function hD(e) {
            var n = e == null ? 0 : e.length;
            return n ? Sn(e, 1, n) : [];
          }
          function dD(e, n, i) {
            return e && e.length ? (n = i || n === s ? 1 : he(n), Sn(e, 0, n < 0 ? 0 : n)) : [];
          }
          function gD(e, n, i) {
            var a = e == null ? 0 : e.length;
            return a ? (n = i || n === s ? 1 : he(n), n = a - n, Sn(e, n < 0 ? 0 : n, a)) : [];
          }
          function pD(e, n) {
            return e && e.length ? mi(e, te(n, 3), false, true) : [];
          }
          function DD(e, n) {
            return e && e.length ? mi(e, te(n, 3)) : [];
          }
          var mD = pe(function(e) {
            return mt(en(e, 1, je, true));
          }), yD = pe(function(e) {
            var n = kn(e);
            return je(n) && (n = s), mt(en(e, 1, je, true), te(n, 2));
          }), bD = pe(function(e) {
            var n = kn(e);
            return n = typeof n == "function" ? n : s, mt(en(e, 1, je, true), s, n);
          });
          function vD(e) {
            return e && e.length ? mt(e) : [];
          }
          function wD(e, n) {
            return e && e.length ? mt(e, te(n, 2)) : [];
          }
          function CD(e, n) {
            return n = typeof n == "function" ? n : s, e && e.length ? mt(e, s, n) : [];
          }
          function gu(e) {
            if (!(e && e.length))
              return [];
            var n = 0;
            return e = ft(e, function(i) {
              if (je(i))
                return n = Ge(i.length, n), true;
            }), Bs(n, function(i) {
              return Pe(e, Os(i));
            });
          }
          function El(e, n) {
            if (!(e && e.length))
              return [];
            var i = gu(e);
            return n == null ? i : Pe(i, function(a) {
              return gn(n, s, a);
            });
          }
          var _D = pe(function(e, n) {
            return je(e) ? Fr(e, n) : [];
          }), FD = pe(function(e) {
            return Xs(ft(e, je));
          }), ED = pe(function(e) {
            var n = kn(e);
            return je(n) && (n = s), Xs(ft(e, je), te(n, 2));
          }), xD = pe(function(e) {
            var n = kn(e);
            return n = typeof n == "function" ? n : s, Xs(ft(e, je), s, n);
          }), AD = pe(gu);
          function OD(e, n) {
            return Wa(e || [], n || [], _r);
          }
          function SD(e, n) {
            return Wa(e || [], n || [], Ar);
          }
          var kD = pe(function(e) {
            var n = e.length, i = n > 1 ? e[n - 1] : s;
            return i = typeof i == "function" ? (e.pop(), i) : s, El(e, i);
          });
          function xl(e) {
            var n = h(e);
            return n.__chain__ = true, n;
          }
          function BD(e, n) {
            return n(e), e;
          }
          function xi(e, n) {
            return n(e);
          }
          var PD = tt(function(e) {
            var n = e.length, i = n ? e[0] : 0, a = this.__wrapped__, c = function(d) {
              return qs(d, e);
            };
            return n > 1 || this.__actions__.length || !(a instanceof ye) || !rt(i) ? this.thru(c) : (a = a.slice(i, +i + (n ? 1 : 0)), a.__actions__.push({ func: xi, args: [c], thisArg: s }), new An(a, this.__chain__).thru(function(d) {
              return n && !d.length && d.push(s), d;
            }));
          });
          function ID() {
            return xl(this);
          }
          function MD() {
            return new An(this.value(), this.__chain__);
          }
          function RD() {
            this.__values__ === s && (this.__values__ = jl(this.value()));
            var e = this.__index__ >= this.__values__.length, n = e ? s : this.__values__[this.__index__++];
            return { done: e, value: n };
          }
          function LD() {
            return this;
          }
          function TD(e) {
            for (var n, i = this; i instanceof fi; ) {
              var a = bl(i);
              a.__index__ = 0, a.__values__ = s, n ? c.__wrapped__ = a : n = a;
              var c = a;
              i = i.__wrapped__;
            }
            return c.__wrapped__ = e, n;
          }
          function ND() {
            var e = this.__wrapped__;
            if (e instanceof ye) {
              var n = e;
              return this.__actions__.length && (n = new ye(this)), n = n.reverse(), n.__actions__.push({ func: xi, args: [du], thisArg: s }), new An(n, this.__chain__);
            }
            return this.thru(du);
          }
          function qD() {
            return Ua(this.__wrapped__, this.__actions__);
          }
          var jD = yi(function(e, n, i) {
            Ee.call(e, i) ? ++e[i] : et(e, i, 1);
          });
          function $D(e, n, i) {
            var a = fe(e) ? na : Bg;
            return i && on(e, n, i) && (n = s), a(e, te(n, 3));
          }
          function UD(e, n) {
            var i = fe(e) ? ft : Ea;
            return i(e, te(n, 3));
          }
          var WD = Qa(vl), zD = Qa(wl);
          function HD(e, n) {
            return en(Ai(e, n), 1);
          }
          function GD(e, n) {
            return en(Ai(e, n), Xe);
          }
          function KD(e, n, i) {
            return i = i === s ? 1 : he(i), en(Ai(e, n), i);
          }
          function Al(e, n) {
            var i = fe(e) ? En : Dt;
            return i(e, te(n, 3));
          }
          function Ol(e, n) {
            var i = fe(e) ? hd : Fa;
            return i(e, te(n, 3));
          }
          var VD = yi(function(e, n, i) {
            Ee.call(e, i) ? e[i].push(n) : et(e, i, [n]);
          });
          function YD(e, n, i, a) {
            e = cn(e) ? e : ir(e), i = i && !a ? he(i) : 0;
            var c = e.length;
            return i < 0 && (i = Ge(c + i, 0)), Pi(e) ? i <= c && e.indexOf(n, i) > -1 : !!c && Kt(e, n, i) > -1;
          }
          var ZD = pe(function(e, n, i) {
            var a = -1, c = typeof n == "function", d = cn(e) ? x(e.length) : [];
            return Dt(e, function(D) {
              d[++a] = c ? gn(n, D, i) : Er(D, n, i);
            }), d;
          }), JD = yi(function(e, n, i) {
            et(e, i, n);
          });
          function Ai(e, n) {
            var i = fe(e) ? Pe : Ba;
            return i(e, te(n, 3));
          }
          function XD(e, n, i, a) {
            return e == null ? [] : (fe(n) || (n = n == null ? [] : [n]), i = a ? s : i, fe(i) || (i = i == null ? [] : [i]), Ra(e, n, i));
          }
          var QD = yi(function(e, n, i) {
            e[i ? 0 : 1].push(n);
          }, function() {
            return [[], []];
          });
          function e0(e, n, i) {
            var a = fe(e) ? xs : sa, c = arguments.length < 3;
            return a(e, te(n, 4), i, c, Dt);
          }
          function n0(e, n, i) {
            var a = fe(e) ? dd : sa, c = arguments.length < 3;
            return a(e, te(n, 4), i, c, Fa);
          }
          function t0(e, n) {
            var i = fe(e) ? ft : Ea;
            return i(e, ki(te(n, 3)));
          }
          function r0(e) {
            var n = fe(e) ? va : Yg;
            return n(e);
          }
          function i0(e, n, i) {
            (i ? on(e, n, i) : n === s) ? n = 1 : n = he(n);
            var a = fe(e) ? xg : Zg;
            return a(e, n);
          }
          function s0(e) {
            var n = fe(e) ? Ag : Xg;
            return n(e);
          }
          function u0(e) {
            if (e == null)
              return 0;
            if (cn(e))
              return Pi(e) ? Yt(e) : e.length;
            var n = rn(e);
            return n == dn || n == F ? e.size : Hs(e).length;
          }
          function o0(e, n, i) {
            var a = fe(e) ? As : Qg;
            return i && on(e, n, i) && (n = s), a(e, te(n, 3));
          }
          var a0 = pe(function(e, n) {
            if (e == null)
              return [];
            var i = n.length;
            return i > 1 && on(e, n[0], n[1]) ? n = [] : i > 2 && on(n[0], n[1], n[2]) && (n = [n[0]]), Ra(e, en(n, 1), []);
          }), Oi = Ud || function() {
            return Ye.Date.now();
          };
          function l0(e, n) {
            if (typeof n != "function")
              throw new xn(o);
            return e = he(e), function() {
              if (--e < 1)
                return n.apply(this, arguments);
            };
          }
          function Sl(e, n, i) {
            return n = i ? s : n, n = e && n == null ? e.length : n, nt(e, ce, s, s, s, s, n);
          }
          function kl(e, n) {
            var i;
            if (typeof n != "function")
              throw new xn(o);
            return e = he(e), function() {
              return --e > 0 && (i = n.apply(this, arguments)), e <= 1 && (n = s), i;
            };
          }
          var pu = pe(function(e, n, i) {
            var a = L2;
            if (i.length) {
              var c = dt(i, tr(pu));
              a |= z;
            }
            return nt(e, a, n, i, c);
          }), Bl = pe(function(e, n, i) {
            var a = L2 | A;
            if (i.length) {
              var c = dt(i, tr(Bl));
              a |= z;
            }
            return nt(n, a, e, i, c);
          });
          function Pl(e, n, i) {
            n = i ? s : n;
            var a = nt(e, Q, s, s, s, s, s, n);
            return a.placeholder = Pl.placeholder, a;
          }
          function Il(e, n, i) {
            n = i ? s : n;
            var a = nt(e, ee, s, s, s, s, s, n);
            return a.placeholder = Il.placeholder, a;
          }
          function Ml(e, n, i) {
            var a, c, d, D, m, C, P = 0, I = false, M = false, j = true;
            if (typeof e != "function")
              throw new xn(o);
            n = Bn(n) || 0, Re(i) && (I = !!i.leading, M = "maxWait" in i, d = M ? Ge(Bn(i.maxWait) || 0, n) : d, j = "trailing" in i ? !!i.trailing : j);
            function Y($e) {
              var $n = a, ut = c;
              return a = c = s, P = $e, D = e.apply(ut, $n), D;
            }
            function re($e) {
              return P = $e, m = kr(me, n), I ? Y($e) : D;
            }
            function de($e) {
              var $n = $e - C, ut = $e - P, Ql = n - $n;
              return M ? tn(Ql, d - ut) : Ql;
            }
            function ie($e) {
              var $n = $e - C, ut = $e - P;
              return C === s || $n >= n || $n < 0 || M && ut >= d;
            }
            function me() {
              var $e = Oi();
              if (ie($e))
                return be($e);
              m = kr(me, de($e));
            }
            function be($e) {
              return m = s, j && a ? Y($e) : (a = c = s, D);
            }
            function yn() {
              m !== s && za(m), P = 0, a = C = c = m = s;
            }
            function an() {
              return m === s ? D : be(Oi());
            }
            function bn() {
              var $e = Oi(), $n = ie($e);
              if (a = arguments, c = this, C = $e, $n) {
                if (m === s)
                  return re(C);
                if (M)
                  return za(m), m = kr(me, n), Y(C);
              }
              return m === s && (m = kr(me, n)), D;
            }
            return bn.cancel = yn, bn.flush = an, bn;
          }
          var c0 = pe(function(e, n) {
            return _a(e, 1, n);
          }), f0 = pe(function(e, n, i) {
            return _a(e, Bn(n) || 0, i);
          });
          function h0(e) {
            return nt(e, qe);
          }
          function Si(e, n) {
            if (typeof e != "function" || n != null && typeof n != "function")
              throw new xn(o);
            var i = function() {
              var a = arguments, c = n ? n.apply(this, a) : a[0], d = i.cache;
              if (d.has(c))
                return d.get(c);
              var D = e.apply(this, a);
              return i.cache = d.set(c, D) || d, D;
            };
            return i.cache = new (Si.Cache || Qn)(), i;
          }
          Si.Cache = Qn;
          function ki(e) {
            if (typeof e != "function")
              throw new xn(o);
            return function() {
              var n = arguments;
              switch (n.length) {
                case 0:
                  return !e.call(this);
                case 1:
                  return !e.call(this, n[0]);
                case 2:
                  return !e.call(this, n[0], n[1]);
                case 3:
                  return !e.call(this, n[0], n[1], n[2]);
              }
              return !e.apply(this, n);
            };
          }
          function d0(e) {
            return kl(2, e);
          }
          var g0 = ep(function(e, n) {
            n = n.length == 1 && fe(n[0]) ? Pe(n[0], pn(te())) : Pe(en(n, 1), pn(te()));
            var i = n.length;
            return pe(function(a) {
              for (var c = -1, d = tn(a.length, i); ++c < d; )
                a[c] = n[c].call(this, a[c]);
              return gn(e, this, a);
            });
          }), Du = pe(function(e, n) {
            var i = dt(n, tr(Du));
            return nt(e, z, s, n, i);
          }), Rl = pe(function(e, n) {
            var i = dt(n, tr(Rl));
            return nt(e, De, s, n, i);
          }), p0 = tt(function(e, n) {
            return nt(e, nn, s, s, s, n);
          });
          function D0(e, n) {
            if (typeof e != "function")
              throw new xn(o);
            return n = n === s ? n : he(n), pe(e, n);
          }
          function m0(e, n) {
            if (typeof e != "function")
              throw new xn(o);
            return n = n == null ? 0 : Ge(he(n), 0), pe(function(i) {
              var a = i[n], c = bt(i, 0, n);
              return a && ht(c, a), gn(e, this, c);
            });
          }
          function y0(e, n, i) {
            var a = true, c = true;
            if (typeof e != "function")
              throw new xn(o);
            return Re(i) && (a = "leading" in i ? !!i.leading : a, c = "trailing" in i ? !!i.trailing : c), Ml(e, n, { leading: a, maxWait: n, trailing: c });
          }
          function b0(e) {
            return Sl(e, 1);
          }
          function v0(e, n) {
            return Du(eu(n), e);
          }
          function w0() {
            if (!arguments.length)
              return [];
            var e = arguments[0];
            return fe(e) ? e : [e];
          }
          function C0(e) {
            return On(e, S);
          }
          function _0(e, n) {
            return n = typeof n == "function" ? n : s, On(e, S, n);
          }
          function F0(e) {
            return On(e, _ | S);
          }
          function E0(e, n) {
            return n = typeof n == "function" ? n : s, On(e, _ | S, n);
          }
          function x0(e, n) {
            return n == null || Ca(e, n, Ze(n));
          }
          function jn(e, n) {
            return e === n || e !== e && n !== n;
          }
          var A0 = Ci(Us), O0 = Ci(function(e, n) {
            return e >= n;
          }), Mt = Oa(function() {
            return arguments;
          }()) ? Oa : function(e) {
            return Te(e) && Ee.call(e, "callee") && !ga.call(e, "callee");
          }, fe = x.isArray, S0 = Yo ? pn(Yo) : Tg;
          function cn(e) {
            return e != null && Bi(e.length) && !it(e);
          }
          function je(e) {
            return Te(e) && cn(e);
          }
          function k0(e) {
            return e === true || e === false || Te(e) && un(e) == _e;
          }
          var vt = zd || Au, B0 = Zo ? pn(Zo) : Ng;
          function P0(e) {
            return Te(e) && e.nodeType === 1 && !Br(e);
          }
          function I0(e) {
            if (e == null)
              return true;
            if (cn(e) && (fe(e) || typeof e == "string" || typeof e.splice == "function" || vt(e) || rr(e) || Mt(e)))
              return !e.length;
            var n = rn(e);
            if (n == dn || n == F)
              return !e.size;
            if (Sr(e))
              return !Hs(e).length;
            for (var i in e)
              if (Ee.call(e, i))
                return false;
            return true;
          }
          function M0(e, n) {
            return xr(e, n);
          }
          function R0(e, n, i) {
            i = typeof i == "function" ? i : s;
            var a = i ? i(e, n) : s;
            return a === s ? xr(e, n, s, i) : !!a;
          }
          function mu(e) {
            if (!Te(e))
              return false;
            var n = un(e);
            return n == Gn || n == Ln || typeof e.message == "string" && typeof e.name == "string" && !Br(e);
          }
          function L0(e) {
            return typeof e == "number" && Da(e);
          }
          function it(e) {
            if (!Re(e))
              return false;
            var n = un(e);
            return n == Tn || n == Hr || n == ke || n == N;
          }
          function Ll(e) {
            return typeof e == "number" && e == he(e);
          }
          function Bi(e) {
            return typeof e == "number" && e > -1 && e % 1 == 0 && e <= ve;
          }
          function Re(e) {
            var n = typeof e;
            return e != null && (n == "object" || n == "function");
          }
          function Te(e) {
            return e != null && typeof e == "object";
          }
          var Tl = Jo ? pn(Jo) : jg;
          function T0(e, n) {
            return e === n || zs(e, n, ou(n));
          }
          function N0(e, n, i) {
            return i = typeof i == "function" ? i : s, zs(e, n, ou(n), i);
          }
          function q0(e) {
            return Nl(e) && e != +e;
          }
          function j0(e) {
            if (_p(e))
              throw new oe(u);
            return Sa(e);
          }
          function $0(e) {
            return e === null;
          }
          function U0(e) {
            return e == null;
          }
          function Nl(e) {
            return typeof e == "number" || Te(e) && un(e) == sn;
          }
          function Br(e) {
            if (!Te(e) || un(e) != y)
              return false;
            var n = ii(e);
            if (n === null)
              return true;
            var i = Ee.call(n, "constructor") && n.constructor;
            return typeof i == "function" && i instanceof i && ei.call(i) == Nd;
          }
          var yu = Xo ? pn(Xo) : $g;
          function W0(e) {
            return Ll(e) && e >= -ve && e <= ve;
          }
          var ql = Qo ? pn(Qo) : Ug;
          function Pi(e) {
            return typeof e == "string" || !fe(e) && Te(e) && un(e) == U;
          }
          function mn(e) {
            return typeof e == "symbol" || Te(e) && un(e) == $;
          }
          var rr = ea ? pn(ea) : Wg;
          function z0(e) {
            return e === s;
          }
          function H0(e) {
            return Te(e) && rn(e) == Be;
          }
          function G0(e) {
            return Te(e) && un(e) == Qe;
          }
          var K0 = Ci(Gs), V0 = Ci(function(e, n) {
            return e <= n;
          });
          function jl(e) {
            if (!e)
              return [];
            if (cn(e))
              return Pi(e) ? Nn(e) : ln(e);
            if (yr && e[yr])
              return xd(e[yr]());
            var n = rn(e), i = n == dn ? Is : n == F ? Jr : ir;
            return i(e);
          }
          function st(e) {
            if (!e)
              return e === 0 ? e : 0;
            if (e = Bn(e), e === Xe || e === -Xe) {
              var n = e < 0 ? -1 : 1;
              return n * lt;
            }
            return e === e ? e : 0;
          }
          function he(e) {
            var n = st(e), i = n % 1;
            return n === n ? i ? n - i : n : 0;
          }
          function $l(e) {
            return e ? kt(he(e), 0, Ve) : 0;
          }
          function Bn(e) {
            if (typeof e == "number")
              return e;
            if (mn(e))
              return Hn;
            if (Re(e)) {
              var n = typeof e.valueOf == "function" ? e.valueOf() : e;
              e = Re(n) ? n + "" : n;
            }
            if (typeof e != "string")
              return e === 0 ? e : +e;
            e = ua(e);
            var i = Sh.test(e);
            return i || Bh.test(e) ? ld(e.slice(2), i ? 2 : 8) : Oh.test(e) ? Hn : +e;
          }
          function Ul(e) {
            return Vn(e, fn(e));
          }
          function Y0(e) {
            return e ? kt(he(e), -ve, ve) : e === 0 ? e : 0;
          }
          function Fe(e) {
            return e == null ? "" : Dn(e);
          }
          var Z0 = er(function(e, n) {
            if (Sr(n) || cn(n)) {
              Vn(n, Ze(n), e);
              return;
            }
            for (var i in n)
              Ee.call(n, i) && _r(e, i, n[i]);
          }), Wl = er(function(e, n) {
            Vn(n, fn(n), e);
          }), Ii = er(function(e, n, i, a) {
            Vn(n, fn(n), e, a);
          }), J0 = er(function(e, n, i, a) {
            Vn(n, Ze(n), e, a);
          }), X0 = tt(qs);
          function Q0(e, n) {
            var i = Qt(e);
            return n == null ? i : wa(i, n);
          }
          var em = pe(function(e, n) {
            e = Ae(e);
            var i = -1, a = n.length, c = a > 2 ? n[2] : s;
            for (c && on(n[0], n[1], c) && (a = 1); ++i < a; )
              for (var d = n[i], D = fn(d), m = -1, C = D.length; ++m < C; ) {
                var P = D[m], I = e[P];
                (I === s || jn(I, Zt[P]) && !Ee.call(e, P)) && (e[P] = d[P]);
              }
            return e;
          }), nm = pe(function(e) {
            return e.push(s, ul), gn(zl, s, e);
          });
          function tm(e, n) {
            return ta(e, te(n, 3), Kn);
          }
          function rm(e, n) {
            return ta(e, te(n, 3), $s);
          }
          function im(e, n) {
            return e == null ? e : js(e, te(n, 3), fn);
          }
          function sm(e, n) {
            return e == null ? e : xa(e, te(n, 3), fn);
          }
          function um(e, n) {
            return e && Kn(e, te(n, 3));
          }
          function om(e, n) {
            return e && $s(e, te(n, 3));
          }
          function am(e) {
            return e == null ? [] : gi(e, Ze(e));
          }
          function lm(e) {
            return e == null ? [] : gi(e, fn(e));
          }
          function bu(e, n, i) {
            var a = e == null ? s : Bt(e, n);
            return a === s ? i : a;
          }
          function cm(e, n) {
            return e != null && ll(e, n, Ig);
          }
          function vu(e, n) {
            return e != null && ll(e, n, Mg);
          }
          var fm = nl(function(e, n, i) {
            n != null && typeof n.toString != "function" && (n = ni.call(n)), e[n] = i;
          }, Cu(hn)), hm = nl(function(e, n, i) {
            n != null && typeof n.toString != "function" && (n = ni.call(n)), Ee.call(e, n) ? e[n].push(i) : e[n] = [i];
          }, te), dm = pe(Er);
          function Ze(e) {
            return cn(e) ? ba(e) : Hs(e);
          }
          function fn(e) {
            return cn(e) ? ba(e, true) : zg(e);
          }
          function gm(e, n) {
            var i = {};
            return n = te(n, 3), Kn(e, function(a, c, d) {
              et(i, n(a, c, d), a);
            }), i;
          }
          function pm(e, n) {
            var i = {};
            return n = te(n, 3), Kn(e, function(a, c, d) {
              et(i, c, n(a, c, d));
            }), i;
          }
          var Dm = er(function(e, n, i) {
            pi(e, n, i);
          }), zl = er(function(e, n, i, a) {
            pi(e, n, i, a);
          }), mm = tt(function(e, n) {
            var i = {};
            if (e == null)
              return i;
            var a = false;
            n = Pe(n, function(d) {
              return d = yt(d, e), a || (a = d.length > 1), d;
            }), Vn(e, su(e), i), a && (i = On(i, _ | O | S, fp));
            for (var c = n.length; c--; )
              Js(i, n[c]);
            return i;
          });
          function ym(e, n) {
            return Hl(e, ki(te(n)));
          }
          var bm = tt(function(e, n) {
            return e == null ? {} : Gg(e, n);
          });
          function Hl(e, n) {
            if (e == null)
              return {};
            var i = Pe(su(e), function(a) {
              return [a];
            });
            return n = te(n), La(e, i, function(a, c) {
              return n(a, c[0]);
            });
          }
          function vm(e, n, i) {
            n = yt(n, e);
            var a = -1, c = n.length;
            for (c || (c = 1, e = s); ++a < c; ) {
              var d = e == null ? s : e[Yn(n[a])];
              d === s && (a = c, d = i), e = it(d) ? d.call(e) : d;
            }
            return e;
          }
          function wm(e, n, i) {
            return e == null ? e : Ar(e, n, i);
          }
          function Cm(e, n, i, a) {
            return a = typeof a == "function" ? a : s, e == null ? e : Ar(e, n, i, a);
          }
          var Gl = il(Ze), Kl = il(fn);
          function _m(e, n, i) {
            var a = fe(e), c = a || vt(e) || rr(e);
            if (n = te(n, 4), i == null) {
              var d = e && e.constructor;
              c ? i = a ? new d() : [] : Re(e) ? i = it(d) ? Qt(ii(e)) : {} : i = {};
            }
            return (c ? En : Kn)(e, function(D, m, C) {
              return n(i, D, m, C);
            }), i;
          }
          function Fm(e, n) {
            return e == null ? true : Js(e, n);
          }
          function Em(e, n, i) {
            return e == null ? e : $a(e, n, eu(i));
          }
          function xm(e, n, i, a) {
            return a = typeof a == "function" ? a : s, e == null ? e : $a(e, n, eu(i), a);
          }
          function ir(e) {
            return e == null ? [] : Ps(e, Ze(e));
          }
          function Am(e) {
            return e == null ? [] : Ps(e, fn(e));
          }
          function Om(e, n, i) {
            return i === s && (i = n, n = s), i !== s && (i = Bn(i), i = i === i ? i : 0), n !== s && (n = Bn(n), n = n === n ? n : 0), kt(Bn(e), n, i);
          }
          function Sm(e, n, i) {
            return n = st(n), i === s ? (i = n, n = 0) : i = st(i), e = Bn(e), Rg(e, n, i);
          }
          function km(e, n, i) {
            if (i && typeof i != "boolean" && on(e, n, i) && (n = i = s), i === s && (typeof n == "boolean" ? (i = n, n = s) : typeof e == "boolean" && (i = e, e = s)), e === s && n === s ? (e = 0, n = 1) : (e = st(e), n === s ? (n = e, e = 0) : n = st(n)), e > n) {
              var a = e;
              e = n, n = a;
            }
            if (i || e % 1 || n % 1) {
              var c = ma();
              return tn(e + c * (n - e + ad("1e-" + ((c + "").length - 1))), n);
            }
            return Vs(e, n);
          }
          var Bm = nr(function(e, n, i) {
            return n = n.toLowerCase(), e + (i ? Vl(n) : n);
          });
          function Vl(e) {
            return wu(Fe(e).toLowerCase());
          }
          function Yl(e) {
            return e = Fe(e), e && e.replace(Ih, wd).replace(Xh, "");
          }
          function Pm(e, n, i) {
            e = Fe(e), n = Dn(n);
            var a = e.length;
            i = i === s ? a : kt(he(i), 0, a);
            var c = i;
            return i -= n.length, i >= 0 && e.slice(i, c) == n;
          }
          function Im(e) {
            return e = Fe(e), e && dh.test(e) ? e.replace(xo, Cd) : e;
          }
          function Mm(e) {
            return e = Fe(e), e && bh.test(e) ? e.replace(Ds, "\\$&") : e;
          }
          var Rm = nr(function(e, n, i) {
            return e + (i ? "-" : "") + n.toLowerCase();
          }), Lm = nr(function(e, n, i) {
            return e + (i ? " " : "") + n.toLowerCase();
          }), Tm = Xa("toLowerCase");
          function Nm(e, n, i) {
            e = Fe(e), n = he(n);
            var a = n ? Yt(e) : 0;
            if (!n || a >= n)
              return e;
            var c = (n - a) / 2;
            return wi(ai(c), i) + e + wi(oi(c), i);
          }
          function qm(e, n, i) {
            e = Fe(e), n = he(n);
            var a = n ? Yt(e) : 0;
            return n && a < n ? e + wi(n - a, i) : e;
          }
          function jm(e, n, i) {
            e = Fe(e), n = he(n);
            var a = n ? Yt(e) : 0;
            return n && a < n ? wi(n - a, i) + e : e;
          }
          function $m(e, n, i) {
            return i || n == null ? n = 0 : n && (n = +n), Vd(Fe(e).replace(ms, ""), n || 0);
          }
          function Um(e, n, i) {
            return (i ? on(e, n, i) : n === s) ? n = 1 : n = he(n), Ys(Fe(e), n);
          }
          function Wm() {
            var e = arguments, n = Fe(e[0]);
            return e.length < 3 ? n : n.replace(e[1], e[2]);
          }
          var zm = nr(function(e, n, i) {
            return e + (i ? "_" : "") + n.toLowerCase();
          });
          function Hm(e, n, i) {
            return i && typeof i != "number" && on(e, n, i) && (n = i = s), i = i === s ? Ve : i >>> 0, i ? (e = Fe(e), e && (typeof n == "string" || n != null && !yu(n)) && (n = Dn(n), !n && Vt(e)) ? bt(Nn(e), 0, i) : e.split(n, i)) : [];
          }
          var Gm = nr(function(e, n, i) {
            return e + (i ? " " : "") + wu(n);
          });
          function Km(e, n, i) {
            return e = Fe(e), i = i == null ? 0 : kt(he(i), 0, e.length), n = Dn(n), e.slice(i, i + n.length) == n;
          }
          function Vm(e, n, i) {
            var a = h.templateSettings;
            i && on(e, n, i) && (n = s), e = Fe(e), n = Ii({}, n, a, sl);
            var c = Ii({}, n.imports, a.imports, sl), d = Ze(c), D = Ps(c, d), m, C, P = 0, I = n.interpolate || Gr, M = "__p += '", j = Ms((n.escape || Gr).source + "|" + I.source + "|" + (I === Ao ? Ah : Gr).source + "|" + (n.evaluate || Gr).source + "|$", "g"), Y = "//# sourceURL=" + (Ee.call(n, "sourceURL") ? (n.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++rd + "]") + `
`;
            e.replace(j, function(ie, me, be, yn, an, bn) {
              return be || (be = yn), M += e.slice(P, bn).replace(Mh, _d), me && (m = true, M += `' +
__e(` + me + `) +
'`), an && (C = true, M += `';
` + an + `;
__p += '`), be && (M += `' +
((__t = (` + be + `)) == null ? '' : __t) +
'`), P = bn + ie.length, ie;
            }), M += `';
`;
            var re = Ee.call(n, "variable") && n.variable;
            if (!re)
              M = `with (obj) {
` + M + `
}
`;
            else if (Eh.test(re))
              throw new oe(l);
            M = (C ? M.replace(lh, "") : M).replace(ch, "$1").replace(fh, "$1;"), M = "function(" + (re || "obj") + `) {
` + (re ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (m ? ", __e = _.escape" : "") + (C ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + M + `return __p
}`;
            var de = Jl(function() {
              return we(d, Y + "return " + M).apply(s, D);
            });
            if (de.source = M, mu(de))
              throw de;
            return de;
          }
          function Ym(e) {
            return Fe(e).toLowerCase();
          }
          function Zm(e) {
            return Fe(e).toUpperCase();
          }
          function Jm(e, n, i) {
            if (e = Fe(e), e && (i || n === s))
              return ua(e);
            if (!e || !(n = Dn(n)))
              return e;
            var a = Nn(e), c = Nn(n), d = oa(a, c), D = aa(a, c) + 1;
            return bt(a, d, D).join("");
          }
          function Xm(e, n, i) {
            if (e = Fe(e), e && (i || n === s))
              return e.slice(0, ca(e) + 1);
            if (!e || !(n = Dn(n)))
              return e;
            var a = Nn(e), c = aa(a, Nn(n)) + 1;
            return bt(a, 0, c).join("");
          }
          function Qm(e, n, i) {
            if (e = Fe(e), e && (i || n === s))
              return e.replace(ms, "");
            if (!e || !(n = Dn(n)))
              return e;
            var a = Nn(e), c = oa(a, Nn(n));
            return bt(a, c).join("");
          }
          function e1(e, n) {
            var i = T, a = ne;
            if (Re(n)) {
              var c = "separator" in n ? n.separator : c;
              i = "length" in n ? he(n.length) : i, a = "omission" in n ? Dn(n.omission) : a;
            }
            e = Fe(e);
            var d = e.length;
            if (Vt(e)) {
              var D = Nn(e);
              d = D.length;
            }
            if (i >= d)
              return e;
            var m = i - Yt(a);
            if (m < 1)
              return a;
            var C = D ? bt(D, 0, m).join("") : e.slice(0, m);
            if (c === s)
              return C + a;
            if (D && (m += C.length - m), yu(c)) {
              if (e.slice(m).search(c)) {
                var P, I = C;
                for (c.global || (c = Ms(c.source, Fe(Oo.exec(c)) + "g")), c.lastIndex = 0; P = c.exec(I); )
                  var M = P.index;
                C = C.slice(0, M === s ? m : M);
              }
            } else if (e.indexOf(Dn(c), m) != m) {
              var j = C.lastIndexOf(c);
              j > -1 && (C = C.slice(0, j));
            }
            return C + a;
          }
          function n1(e) {
            return e = Fe(e), e && hh.test(e) ? e.replace(Eo, kd) : e;
          }
          var t1 = nr(function(e, n, i) {
            return e + (i ? " " : "") + n.toUpperCase();
          }), wu = Xa("toUpperCase");
          function Zl(e, n, i) {
            return e = Fe(e), n = i ? s : n, n === s ? Ed(e) ? Id(e) : Dd(e) : e.match(n) || [];
          }
          var Jl = pe(function(e, n) {
            try {
              return gn(e, s, n);
            } catch (i) {
              return mu(i) ? i : new oe(i);
            }
          }), r1 = tt(function(e, n) {
            return En(n, function(i) {
              i = Yn(i), et(e, i, pu(e[i], e));
            }), e;
          });
          function i1(e) {
            var n = e == null ? 0 : e.length, i = te();
            return e = n ? Pe(e, function(a) {
              if (typeof a[1] != "function")
                throw new xn(o);
              return [i(a[0]), a[1]];
            }) : [], pe(function(a) {
              for (var c = -1; ++c < n; ) {
                var d = e[c];
                if (gn(d[0], this, a))
                  return gn(d[1], this, a);
              }
            });
          }
          function s1(e) {
            return kg(On(e, _));
          }
          function Cu(e) {
            return function() {
              return e;
            };
          }
          function u1(e, n) {
            return e == null || e !== e ? n : e;
          }
          var o1 = el(), a1 = el(true);
          function hn(e) {
            return e;
          }
          function _u(e) {
            return ka(typeof e == "function" ? e : On(e, _));
          }
          function l1(e) {
            return Pa(On(e, _));
          }
          function c1(e, n) {
            return Ia(e, On(n, _));
          }
          var f1 = pe(function(e, n) {
            return function(i) {
              return Er(i, e, n);
            };
          }), h1 = pe(function(e, n) {
            return function(i) {
              return Er(e, i, n);
            };
          });
          function Fu(e, n, i) {
            var a = Ze(n), c = gi(n, a);
            i == null && !(Re(n) && (c.length || !a.length)) && (i = n, n = e, e = this, c = gi(n, Ze(n)));
            var d = !(Re(i) && "chain" in i) || !!i.chain, D = it(e);
            return En(c, function(m) {
              var C = n[m];
              e[m] = C, D && (e.prototype[m] = function() {
                var P = this.__chain__;
                if (d || P) {
                  var I = e(this.__wrapped__), M = I.__actions__ = ln(this.__actions__);
                  return M.push({ func: C, args: arguments, thisArg: e }), I.__chain__ = P, I;
                }
                return C.apply(e, ht([this.value()], arguments));
              });
            }), e;
          }
          function d1() {
            return Ye._ === this && (Ye._ = qd), this;
          }
          function Eu() {
          }
          function g1(e) {
            return e = he(e), pe(function(n) {
              return Ma(n, e);
            });
          }
          var p1 = tu(Pe), D1 = tu(na), m1 = tu(As);
          function Xl(e) {
            return lu(e) ? Os(Yn(e)) : Kg(e);
          }
          function y1(e) {
            return function(n) {
              return e == null ? s : Bt(e, n);
            };
          }
          var b1 = tl(), v1 = tl(true);
          function xu() {
            return [];
          }
          function Au() {
            return false;
          }
          function w1() {
            return {};
          }
          function C1() {
            return "";
          }
          function _1() {
            return true;
          }
          function F1(e, n) {
            if (e = he(e), e < 1 || e > ve)
              return [];
            var i = Ve, a = tn(e, Ve);
            n = te(n), e -= Ve;
            for (var c = Bs(a, n); ++i < e; )
              n(i);
            return c;
          }
          function E1(e) {
            return fe(e) ? Pe(e, Yn) : mn(e) ? [e] : ln(yl(Fe(e)));
          }
          function x1(e) {
            var n = ++Td;
            return Fe(e) + n;
          }
          var A1 = vi(function(e, n) {
            return e + n;
          }, 0), O1 = ru("ceil"), S1 = vi(function(e, n) {
            return e / n;
          }, 1), k1 = ru("floor");
          function B1(e) {
            return e && e.length ? di(e, hn, Us) : s;
          }
          function P1(e, n) {
            return e && e.length ? di(e, te(n, 2), Us) : s;
          }
          function I1(e) {
            return ia(e, hn);
          }
          function M1(e, n) {
            return ia(e, te(n, 2));
          }
          function R1(e) {
            return e && e.length ? di(e, hn, Gs) : s;
          }
          function L1(e, n) {
            return e && e.length ? di(e, te(n, 2), Gs) : s;
          }
          var T1 = vi(function(e, n) {
            return e * n;
          }, 1), N1 = ru("round"), q1 = vi(function(e, n) {
            return e - n;
          }, 0);
          function j1(e) {
            return e && e.length ? ks(e, hn) : 0;
          }
          function $1(e, n) {
            return e && e.length ? ks(e, te(n, 2)) : 0;
          }
          return h.after = l0, h.ary = Sl, h.assign = Z0, h.assignIn = Wl, h.assignInWith = Ii, h.assignWith = J0, h.at = X0, h.before = kl, h.bind = pu, h.bindAll = r1, h.bindKey = Bl, h.castArray = w0, h.chain = xl, h.chunk = kp, h.compact = Bp, h.concat = Pp, h.cond = i1, h.conforms = s1, h.constant = Cu, h.countBy = jD, h.create = Q0, h.curry = Pl, h.curryRight = Il, h.debounce = Ml, h.defaults = em, h.defaultsDeep = nm, h.defer = c0, h.delay = f0, h.difference = Ip, h.differenceBy = Mp, h.differenceWith = Rp, h.drop = Lp, h.dropRight = Tp, h.dropRightWhile = Np, h.dropWhile = qp, h.fill = jp, h.filter = UD, h.flatMap = HD, h.flatMapDeep = GD, h.flatMapDepth = KD, h.flatten = Cl, h.flattenDeep = $p, h.flattenDepth = Up, h.flip = h0, h.flow = o1, h.flowRight = a1, h.fromPairs = Wp, h.functions = am, h.functionsIn = lm, h.groupBy = VD, h.initial = Hp, h.intersection = Gp, h.intersectionBy = Kp, h.intersectionWith = Vp, h.invert = fm, h.invertBy = hm, h.invokeMap = ZD, h.iteratee = _u, h.keyBy = JD, h.keys = Ze, h.keysIn = fn, h.map = Ai, h.mapKeys = gm, h.mapValues = pm, h.matches = l1, h.matchesProperty = c1, h.memoize = Si, h.merge = Dm, h.mergeWith = zl, h.method = f1, h.methodOf = h1, h.mixin = Fu, h.negate = ki, h.nthArg = g1, h.omit = mm, h.omitBy = ym, h.once = d0, h.orderBy = XD, h.over = p1, h.overArgs = g0, h.overEvery = D1, h.overSome = m1, h.partial = Du, h.partialRight = Rl, h.partition = QD, h.pick = bm, h.pickBy = Hl, h.property = Xl, h.propertyOf = y1, h.pull = Xp, h.pullAll = Fl, h.pullAllBy = Qp, h.pullAllWith = eD, h.pullAt = nD, h.range = b1, h.rangeRight = v1, h.rearg = p0, h.reject = t0, h.remove = tD, h.rest = D0, h.reverse = du, h.sampleSize = i0, h.set = wm, h.setWith = Cm, h.shuffle = s0, h.slice = rD, h.sortBy = a0, h.sortedUniq = cD, h.sortedUniqBy = fD, h.split = Hm, h.spread = m0, h.tail = hD, h.take = dD, h.takeRight = gD, h.takeRightWhile = pD, h.takeWhile = DD, h.tap = BD, h.throttle = y0, h.thru = xi, h.toArray = jl, h.toPairs = Gl, h.toPairsIn = Kl, h.toPath = E1, h.toPlainObject = Ul, h.transform = _m, h.unary = b0, h.union = mD, h.unionBy = yD, h.unionWith = bD, h.uniq = vD, h.uniqBy = wD, h.uniqWith = CD, h.unset = Fm, h.unzip = gu, h.unzipWith = El, h.update = Em, h.updateWith = xm, h.values = ir, h.valuesIn = Am, h.without = _D, h.words = Zl, h.wrap = v0, h.xor = FD, h.xorBy = ED, h.xorWith = xD, h.zip = AD, h.zipObject = OD, h.zipObjectDeep = SD, h.zipWith = kD, h.entries = Gl, h.entriesIn = Kl, h.extend = Wl, h.extendWith = Ii, Fu(h, h), h.add = A1, h.attempt = Jl, h.camelCase = Bm, h.capitalize = Vl, h.ceil = O1, h.clamp = Om, h.clone = C0, h.cloneDeep = F0, h.cloneDeepWith = E0, h.cloneWith = _0, h.conformsTo = x0, h.deburr = Yl, h.defaultTo = u1, h.divide = S1, h.endsWith = Pm, h.eq = jn, h.escape = Im, h.escapeRegExp = Mm, h.every = $D, h.find = WD, h.findIndex = vl, h.findKey = tm, h.findLast = zD, h.findLastIndex = wl, h.findLastKey = rm, h.floor = k1, h.forEach = Al, h.forEachRight = Ol, h.forIn = im, h.forInRight = sm, h.forOwn = um, h.forOwnRight = om, h.get = bu, h.gt = A0, h.gte = O0, h.has = cm, h.hasIn = vu, h.head = _l, h.identity = hn, h.includes = YD, h.indexOf = zp, h.inRange = Sm, h.invoke = dm, h.isArguments = Mt, h.isArray = fe, h.isArrayBuffer = S0, h.isArrayLike = cn, h.isArrayLikeObject = je, h.isBoolean = k0, h.isBuffer = vt, h.isDate = B0, h.isElement = P0, h.isEmpty = I0, h.isEqual = M0, h.isEqualWith = R0, h.isError = mu, h.isFinite = L0, h.isFunction = it, h.isInteger = Ll, h.isLength = Bi, h.isMap = Tl, h.isMatch = T0, h.isMatchWith = N0, h.isNaN = q0, h.isNative = j0, h.isNil = U0, h.isNull = $0, h.isNumber = Nl, h.isObject = Re, h.isObjectLike = Te, h.isPlainObject = Br, h.isRegExp = yu, h.isSafeInteger = W0, h.isSet = ql, h.isString = Pi, h.isSymbol = mn, h.isTypedArray = rr, h.isUndefined = z0, h.isWeakMap = H0, h.isWeakSet = G0, h.join = Yp, h.kebabCase = Rm, h.last = kn, h.lastIndexOf = Zp, h.lowerCase = Lm, h.lowerFirst = Tm, h.lt = K0, h.lte = V0, h.max = B1, h.maxBy = P1, h.mean = I1, h.meanBy = M1, h.min = R1, h.minBy = L1, h.stubArray = xu, h.stubFalse = Au, h.stubObject = w1, h.stubString = C1, h.stubTrue = _1, h.multiply = T1, h.nth = Jp, h.noConflict = d1, h.noop = Eu, h.now = Oi, h.pad = Nm, h.padEnd = qm, h.padStart = jm, h.parseInt = $m, h.random = km, h.reduce = e0, h.reduceRight = n0, h.repeat = Um, h.replace = Wm, h.result = vm, h.round = N1, h.runInContext = b, h.sample = r0, h.size = u0, h.snakeCase = zm, h.some = o0, h.sortedIndex = iD, h.sortedIndexBy = sD, h.sortedIndexOf = uD, h.sortedLastIndex = oD, h.sortedLastIndexBy = aD, h.sortedLastIndexOf = lD, h.startCase = Gm, h.startsWith = Km, h.subtract = q1, h.sum = j1, h.sumBy = $1, h.template = Vm, h.times = F1, h.toFinite = st, h.toInteger = he, h.toLength = $l, h.toLower = Ym, h.toNumber = Bn, h.toSafeInteger = Y0, h.toString = Fe, h.toUpper = Zm, h.trim = Jm, h.trimEnd = Xm, h.trimStart = Qm, h.truncate = e1, h.unescape = n1, h.uniqueId = x1, h.upperCase = t1, h.upperFirst = wu, h.each = Al, h.eachRight = Ol, h.first = _l, Fu(h, function() {
            var e = {};
            return Kn(h, function(n, i) {
              Ee.call(h.prototype, i) || (e[i] = n);
            }), e;
          }(), { chain: false }), h.VERSION = t, En(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
            h[e].placeholder = h;
          }), En(["drop", "take"], function(e, n) {
            ye.prototype[e] = function(i) {
              i = i === s ? 1 : Ge(he(i), 0);
              var a = this.__filtered__ && !n ? new ye(this) : this.clone();
              return a.__filtered__ ? a.__takeCount__ = tn(i, a.__takeCount__) : a.__views__.push({ size: tn(i, Ve), type: e + (a.__dir__ < 0 ? "Right" : "") }), a;
            }, ye.prototype[e + "Right"] = function(i) {
              return this.reverse()[e](i).reverse();
            };
          }), En(["filter", "map", "takeWhile"], function(e, n) {
            var i = n + 1, a = i == xe || i == ze;
            ye.prototype[e] = function(c) {
              var d = this.clone();
              return d.__iteratees__.push({ iteratee: te(c, 3), type: i }), d.__filtered__ = d.__filtered__ || a, d;
            };
          }), En(["head", "last"], function(e, n) {
            var i = "take" + (n ? "Right" : "");
            ye.prototype[e] = function() {
              return this[i](1).value()[0];
            };
          }), En(["initial", "tail"], function(e, n) {
            var i = "drop" + (n ? "" : "Right");
            ye.prototype[e] = function() {
              return this.__filtered__ ? new ye(this) : this[i](1);
            };
          }), ye.prototype.compact = function() {
            return this.filter(hn);
          }, ye.prototype.find = function(e) {
            return this.filter(e).head();
          }, ye.prototype.findLast = function(e) {
            return this.reverse().find(e);
          }, ye.prototype.invokeMap = pe(function(e, n) {
            return typeof e == "function" ? new ye(this) : this.map(function(i) {
              return Er(i, e, n);
            });
          }), ye.prototype.reject = function(e) {
            return this.filter(ki(te(e)));
          }, ye.prototype.slice = function(e, n) {
            e = he(e);
            var i = this;
            return i.__filtered__ && (e > 0 || n < 0) ? new ye(i) : (e < 0 ? i = i.takeRight(-e) : e && (i = i.drop(e)), n !== s && (n = he(n), i = n < 0 ? i.dropRight(-n) : i.take(n - e)), i);
          }, ye.prototype.takeRightWhile = function(e) {
            return this.reverse().takeWhile(e).reverse();
          }, ye.prototype.toArray = function() {
            return this.take(Ve);
          }, Kn(ye.prototype, function(e, n) {
            var i = /^(?:filter|find|map|reject)|While$/.test(n), a = /^(?:head|last)$/.test(n), c = h[a ? "take" + (n == "last" ? "Right" : "") : n], d = a || /^find/.test(n);
            !c || (h.prototype[n] = function() {
              var D = this.__wrapped__, m = a ? [1] : arguments, C = D instanceof ye, P = m[0], I = C || fe(D), M = function(me) {
                var be = c.apply(h, ht([me], m));
                return a && j ? be[0] : be;
              };
              I && i && typeof P == "function" && P.length != 1 && (C = I = false);
              var j = this.__chain__, Y = !!this.__actions__.length, re = d && !j, de = C && !Y;
              if (!d && I) {
                D = de ? D : new ye(this);
                var ie = e.apply(D, m);
                return ie.__actions__.push({ func: xi, args: [M], thisArg: s }), new An(ie, j);
              }
              return re && de ? e.apply(this, m) : (ie = this.thru(M), re ? a ? ie.value()[0] : ie.value() : ie);
            });
          }), En(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
            var n = Xr[e], i = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru", a = /^(?:pop|shift)$/.test(e);
            h.prototype[e] = function() {
              var c = arguments;
              if (a && !this.__chain__) {
                var d = this.value();
                return n.apply(fe(d) ? d : [], c);
              }
              return this[i](function(D) {
                return n.apply(fe(D) ? D : [], c);
              });
            };
          }), Kn(ye.prototype, function(e, n) {
            var i = h[n];
            if (i) {
              var a = i.name + "";
              Ee.call(Xt, a) || (Xt[a] = []), Xt[a].push({ name: n, func: i });
            }
          }), Xt[bi(s, A).name] = [{ name: "wrapper", func: s }], ye.prototype.clone = ng, ye.prototype.reverse = tg, ye.prototype.value = rg, h.prototype.at = PD, h.prototype.chain = ID, h.prototype.commit = MD, h.prototype.next = RD, h.prototype.plant = TD, h.prototype.reverse = ND, h.prototype.toJSON = h.prototype.valueOf = h.prototype.value = qD, h.prototype.first = h.prototype.head, yr && (h.prototype[yr] = LD), h;
        }, gt = Md();
        typeof define == "function" && typeof define.amd == "object" && define.amd ? (Ye._ = gt, define(function() {
          return gt;
        })) : xt ? ((xt.exports = gt)._ = gt, _s._ = gt) : Ye._ = gt;
      }).call(sr);
    });
    var cc = Le((t2, lc) => {
      lc.exports = ["account", "achiever", "acoustics", "act", "action", "activity", "actor", "addition", "adjustment", "advertisement", "advice", "aftermath", "afternoon", "afterthought", "agreement", "air", "airplane", "airport", "alarm", "amount", "amusement", "anger", "angle", "animal", "ants", "apparatus", "apparel", "appliance", "approval", "arch", "argument", "arithmetic", "arm", "army", "art", "attack", "attraction", "authority", "back", "badge", "bag", "bait", "balance", "ball", "base", "baseball", "basin", "basket", "basketball", "bat", "bath", "battle", "bead", "bear", "bed", "bedroom", "beds", "bee", "beef", "beginner", "behavior", "belief", "believe", "bell", "bells", "berry", "bike", "bikes", "bird", "birds", "birth", "birthday", "bit", "bite", "blade", "blood", "blow", "board", "boat", "bomb", "bone", "book", "books", "boot", "border", "bottle", "boundary", "box", "brake", "branch", "brass", "breath", "brick", "bridge", "bubble", "bucket", "building", "bulb", "burst", "bushes", "business", "butter", "button", "cabbage", "cable", "cactus", "cake", "cakes", "calculator", "calendar", "camera", "camp", "can", "cannon", "canvas", "cap", "caption", "car", "card", "care", "carpenter", "carriage", "cars", "cart", "cast", "cat", "cats", "cattle", "cause", "cave", "celery", "cellar", "cemetery", "cent", "chalk", "chance", "change", "channel", "cheese", "cherries", "cherry", "chess", "chicken", "chickens", "chin", "church", "circle", "clam", "class", "cloth", "clover", "club", "coach", "coal", "coast", "coat", "cobweb", "coil", "collar", "color", "committee", "company", "comparison", "competition", "condition", "connection", "control", "cook", "copper", "corn", "cough", "country", "cover", "cow", "cows", "crack", "cracker", "crate", "crayon", "cream", "creator", "creature", "credit", "crib", "crime", "crook", "crow", "crowd", "crown", "cub", "cup", "current", "curtain", "curve", "cushion", "day", "death", "debt", "decision", "deer", "degree", "design", "desire", "desk", "destruction", "detail", "development", "digestion", "dime", "dinner", "dinosaurs", "direction", "dirt", "discovery", "discussion", "distance", "distribution", "division", "dock", "doctor", "dog", "dogs", "doll", "dolls", "donkey", "door", "downtown", "drain", "drawer", "dress", "drink", "driving", "drop", "duck", "ducks", "dust", "ear", "earth", "earthquake", "edge", "education", "effect", "egg", "eggnog", "eggs", "elbow", "end", "engine", "error", "event", "example", "exchange", "existence", "expansion", "experience", "expert", "eye", "eyes", "face", "fact", "fairies", "fall", "fang", "farm", "fear", "feeling", "field", "finger", "fire", "fish", "flag", "flame", "flavor", "flesh", "flight", "flock", "floor", "flower", "flowers", "fly", "fog", "fold", "food", "foot", "force", "fork", "form", "fowl", "frame", "friction", "friend", "friends", "frog", "frogs", "front", "fruit", "fuel", "furniture", "gate", "geese", "ghost", "giants", "giraffe", "glass", "glove", "gold", "government", "governor", "grade", "grain", "grape", "grass", "grip", "ground", "group", "growth", "guide", "guitar", "gun", "hair", "haircut", "hall", "hammer", "hand", "hands", "harbor", "harmony", "hat", "head", "health", "heat", "hill", "history", "hobbies", "hole", "holiday", "home", "honey", "hook", "hope", "horn", "horse", "horses", "hose", "hospital", "hot", "hour", "house", "houses", "humor", "hydrant", "ice", "icicle", "idea", "impulse", "income", "increase", "industry", "ink", "insect", "instrument", "insurance", "interest", "invention", "iron", "island", "jail", "jam", "jar", "jeans", "jelly", "jellyfish", "jewel", "join", "judge", "juice", "jump", "kettle", "key", "kick", "kiss", "kittens", "kitty", "knee", "knife", "knot", "knowledge", "laborer", "lace", "ladybug", "lake", "lamp", "land", "language", "laugh", "leather", "leg", "legs", "letter", "letters", "lettuce", "level", "library", "limit", "line", "linen", "lip", "liquid", "loaf", "lock", "locket", "look", "loss", "love", "low", "lumber", "lunch", "lunchroom", "machine", "magic", "maid", "mailbox", "marble", "mark", "market", "mask", "mass", "match", "meal", "measure", "meat", "meeting", "memory", "metal", "mice", "middle", "milk", "mind", "mine", "minister", "mint", "minute", "mist", "mitten", "money", "month", "moon", "morning", "mother", "motion", "mountain", "mouth", "move", "muscle", "name", "nation", "neck", "need", "needle", "nerve", "nest", "night", "noise", "north", "nose", "note", "notebook", "number", "nut", "oatmeal", "observation", "ocean", "offer", "office", "oil", "orange", "oranges", "order", "oven", "page", "pail", "pan", "pancake", "paper", "parcel", "part", "partner", "party", "passenger", "payment", "peace", "pear", "pen", "pencil", "person", "pest", "pet", "pets", "pickle", "picture", "pie", "pies", "pig", "pigs", "pin", "pipe", "pizzas", "place", "plane", "planes", "plant", "plantation", "plants", "plastic", "plate", "play", "playground", "pleasure", "plot", "plough", "pocket", "point", "poison", "pollution", "popcorn", "porter", "position", "pot", "potato", "powder", "power", "price", "produce", "profit", "property", "prose", "protest", "pull", "pump", "punishment", "purpose", "push", "quarter", "quartz", "question", "quicksand", "quiet", "quill", "quilt", "quince", "quiver", "rabbit", "rabbits", "rail", "railway", "rain", "rainstorm", "rake", "range", "rat", "rate", "ray", "reaction", "reading", "reason", "receipt", "recess", "record", "regret", "relation", "religion", "representative", "request", "respect", "rest", "reward", "rhythm", "rice", "riddle", "rifle", "ring", "rings", "river", "road", "robin", "rock", "rod", "roll", "roof", "room", "root", "rose", "route", "rub", "rule", "run", "sack", "sail", "salt", "sand", "scale", "scarecrow", "scarf", "scene", "scent", "school", "science", "scissors", "screw", "sea", "seashore", "seat", "secretary", "seed", "selection", "self", "sense", "servant", "shade", "shake", "shame", "shape", "sheep", "sheet", "shelf", "ship", "shirt", "shock", "shoe", "shoes", "shop", "show", "side", "sidewalk", "sign", "silk", "silver", "sink", "size", "skate", "skin", "skirt", "sky", "slave", "sleep", "sleet", "slip", "slope", "smash", "smell", "smile", "smoke", "snail", "snails", "snake", "snakes", "sneeze", "snow", "soap", "society", "sock", "soda", "sofa", "song", "songs", "sort", "sound", "soup", "space", "spade", "spark", "spiders", "sponge", "spoon", "spot", "spring", "spy", "square", "squirrel", "stage", "stamp", "star", "start", "statement", "station", "steam", "steel", "stem", "step", "stew", "stick", "sticks", "stitch", "stocking", "stomach", "stone", "stop", "store", "story", "stove", "stranger", "straw", "stream", "street", "stretch", "string", "structure", "substance", "sugar", "suggestion", "suit", "summer", "sun", "support", "surprise", "sweater", "swim", "swing", "system", "table", "tail", "talk", "tank", "taste", "tax", "teaching", "team", "teeth", "temper", "tendency", "tent", "territory", "test", "texture", "theory", "thing", "things", "thought", "thread", "thrill", "throat", "throne", "thumb", "thunder", "ticket", "tiger", "time", "tin", "title", "toad", "toe", "toes", "tomatoes", "tongue", "tooth", "toothbrush", "toothpaste", "top", "touch", "town", "toy", "toys", "trade", "trail", "train", "trains", "tramp", "transport", "tray", "treatment", "tree", "trees", "trick", "trip", "trouble", "trousers", "truck", "trucks", "tub", "turkey", "turn", "twig", "twist", "umbrella", "underwear", "unit", "use", "vacation", "value", "van", "vase", "vegetable", "veil", "vein", "verse", "vessel", "vest", "view", "visitor", "voice", "volcano", "volleyball", "voyage", "walk", "wall", "war", "wash", "waste", "watch", "water", "wave", "waves", "wax", "way", "wealth", "weather", "week", "weight", "wheel", "whip", "whistle", "wilderness", "wind", "window", "wine", "wing", "winter", "wire", "wish", "wood", "wool", "word", "work", "worm", "wound", "wren", "wrench", "wrist", "writer", "writing", "yak", "yam", "yard", "yarn", "year", "yoke", "zebra", "zephyr", "zinc", "zipper", "zoo"];
    });
    var hc = Le((r2, fc) => {
      fc.exports = ["abandoned", "abashed", "aberrant", "abhorrent", "abiding", "abject", "ablaze", "able", "abounding", "abrasive", "abrupt", "absent", "absorbed", "absorbing", "abstracted", "absurd", "abundant", "acceptable", "accessible", "accidental", "accurate", "acidic", "acoustic", "acrid", "actionable", "active", "actual", "adamant", "adaptable", "adept", "adhesive", "adjoining", "adorable", "adroit", "adventurous", "affable", "affectionate", "afraid", "aggressive", "agile", "agonizing", "agreeable", "airy", "alert", "alive", "alleged", "alluring", "aloof", "amazing", "ambiguous", "ambitious", "amiable", "ample", "amused", "amusing", "ancient", "angry", "animated", "annoyed", "annoying", "anxious", "apathetic", "apt", "aquatic", "ardent", "aromatic", "arrogant", "ashamed", "aspiring", "assorted", "astonishing", "astute", "attractive", "august", "auspicious", "automatic", "available", "average", "avid", "aware", "awesome", "awful", "axiomatic", "bad", "balmy", "barbarous", "bashful", "bawdy", "beautiful", "befitting", "belligerent", "beneficial", "benevolent", "bent", "berserk", "best", "better", "bewildered", "big", "billowing", "billowy", "bitter", "bizarre", "blessed", "bloody", "blue", "blushing", "boiling", "bold", "boorish", "bored", "boring", "boss", "bouncy", "boundless", "brainy", "brash", "brave", "brawny", "breakable", "breezy", "brief", "bright", "brisk", "broad", "broken", "bumpy", "burly", "bustling", "busy", "cagey", "calculating", "callous", "calm", "can", "canny", "capable", "capricious", "cared", "careful", "careless", "caring", "casual", "cautious", "ceaseless", "celestial", "certain", "changeable", "charming", "cheap", "cheerful", "chemical", "chic", "chief", "childlike", "chilly", "chivalrous", "choice", "chosen", "chubby", "chummy", "chunky", "civic", "civil", "clammy", "classy", "clean", "clear", "clever", "cloistered", "close", "closed", "cloudy", "clumsy", "cluttered", "cogent", "coherent", "cold", "colorful", "colossal", "combative", "comfortable", "common", "complete", "complex", "composed", "concerned", "condemned", "confused", "conscious", "cooing", "cool", "cooperative", "coordinated", "cosmic", "courageous", "cowardly", "cozy", "crabby", "craven", "crazy", "creepy", "crooked", "crowded", "cruel", "cuddly", "cultured", "cumbersome", "curious", "curly", "curved", "curvy", "cut", "cute", "cynical", "daffy", "daily", "dainty", "damaged", "damaging", "damp", "dandy", "dangerous", "dapper", "daring", "dark", "dashing", "dazzling", "dead", "deadpan", "deafening", "dear", "debonair", "decent", "decisive", "decorous", "deep", "deeply", "defeated", "defective", "defiant", "deft", "delicate", "delicious", "delightful", "delirious", "deluxe", "demonic", "dependent", "deranged", "descriptive", "deserted", "detailed", "determined", "devilish", "devout", "didactic", "different", "difficult", "diligent", "direct", "direful", "dirty", "disagreeable", "disastrous", "discreet", "disgusted", "disgusting", "disillusioned", "dispensable", "distinct", "disturbed", "divergent", "divine", "dizzy", "domineering", "doted", "doting", "doubtful", "drab", "draconian", "dramatic", "dreamy", "dreary", "driven", "dry", "dull", "dusty", "dynamic", "dysfunctional", "eager", "early", "earsplitting", "earthy", "easy", "eatable", "economic", "educated", "efficacious", "efficient", "eight", "elastic", "elated", "electric", "elegant", "elfin", "elite", "embarrassed", "eminent", "empty", "enchanted", "enchanting", "encouraging", "end", "endurable", "energetic", "energized", "enigmatic", "enormous", "entertaining", "enthusiastic", "envious", "equable", "equal", "erect", "erratic", "ethereal", "evanescent", "evasive", "even", "evil", "exact", "excellent", "excited", "exciting", "exclusive", "exotic", "expensive", "expert", "exuberant", "exultant", "fabulous", "faded", "faint", "fair", "faithful", "fallacious", "false", "famed", "familiar", "famous", "fanatical", "fancy", "fantastic", "far", "fascinated", "fast", "faulty", "fearful", "fearless", "feigned", "fertile", "festive", "few", "fierce", "fiery", "filthy", "fine", "finicky", "first", "fit", "fixed", "flagrant", "flaky", "flashy", "flat", "flawless", "fleet", "flimsy", "flippant", "flowery", "flowing", "fluent", "fluffy", "fluttering", "flying", "foamy", "fond", "foolish", "for", "foregoing", "forgetful", "forlorn", "fortunate", "fragile", "frail", "frank", "frantic", "free", "freezing", "frequent", "fresh", "fretful", "friendly", "frightened", "frightening", "full", "fumbling", "fun", "functional", "funny", "furry", "furtive", "fuscia", "future", "futuristic", "fuzzy", "gabby", "gainful", "gamy", "gaping", "garrulous", "gas", "gaudy", "general", "genial", "gentle", "giant", "giddy", "gifted", "gigantic", "giving", "glad", "glamorous", "gleaming", "glib", "glistening", "glorious", "glossy", "gnarly", "godly", "gold", "golden", "good", "goodly", "goofy", "gorgeous", "graceful", "grand", "grandiose", "grateful", "gratis", "gray", "greasy", "great", "greedy", "green", "grey", "grieving", "groovy", "grotesque", "grouchy", "grubby", "gruesome", "grumpy", "guarded", "guided", "guiltless", "gullible", "gusty", "gutsy", "guttural", "habitual", "half", "hallowed", "haloed", "halting", "handsome", "handsomely", "handy", "hanging", "hapless", "happy", "hard", "hardy", "harmonious", "harsh", "heady", "healthy", "heartbreaking", "hearty", "heavenly", "heavy", "hellish", "helpful", "helpless", "heroic", "hesitant", "hideous", "high", "highfalutin", "hilarious", "hip", "hissing", "historical", "holistic", "hollow", "holy", "homely", "honest", "honorable", "horrible", "hospitable", "hot", "huge", "hulking", "human", "humane", "humble", "humdrum", "humorous", "hungry", "hunky", "hurried", "hurt", "hushed", "husky", "hypnotic", "hysterical", "icky", "icy", "ideal", "ignorant", "ill", "illegal", "illustrious", "imaginary", "immense", "imminent", "immune", "impartial", "imperfect", "impolite", "important", "imported", "impossible", "incandescent", "incompetent", "inconclusive", "incredible", "indigo", "industrious", "inexpensive", "infamous", "innate", "innocent", "inquisitive", "insidious", "instinctive", "intelligent", "interesting", "internal", "invincible", "irate", "irritating", "itchy", "jaded", "jagged", "jazzed", "jazzy", "jealous", "jittery", "jolly", "jovial", "joyful", "joyous", "jubilant", "judicious", "juicy", "jumbled", "jumpy", "just", "kaput", "keen", "khaki", "kind", "kindhearted", "kindly", "kingly", "knotty", "knowing", "knowledgeable", "known", "labored", "lackadaisical", "lacking", "lame", "lamentable", "languid", "large", "last", "late", "laughable", "lavish", "lawful", "lazy", "lean", "legal", "legit", "lethal", "level", "lewd", "light", "like", "likeable", "likely", "limber", "limitless", "limping", "literate", "little", "lively", "living", "lonely", "long", "longing", "loose", "lopsided", "loud", "lousy", "loutish", "loved", "lovely", "loving", "low", "lowly", "loyal", "lucid", "lucky", "ludicrous", "lumpy", "lush", "luxuriant", "lying", "lyrical", "macabre", "macho", "maddening", "madly", "magenta", "magical", "magnificent", "main", "majestic", "major", "makeshift", "malicious", "mammoth", "maniacal", "many", "marked", "married", "marvelous", "massive", "material", "materialistic", "max", "maxed", "mean", "measly", "meaty", "medical", "meek", "mellow", "melodic", "melted", "merciful", "mere", "merry", "messy", "mighty", "military", "milky", "mindless", "miniature", "minor", "mint", "mirthful", "miscreant", "misty", "mixed", "moaning", "modern", "modest", "moldy", "momentous", "money", "moonlit", "moral", "motionless", "mountainous", "moving", "mucho", "muddled", "mundane", "murky", "mushy", "mute", "mutual", "mysterious", "naive", "nappy", "narrow", "nasty", "native", "natural", "naughty", "nauseating", "near", "neat", "nebulous", "necessary", "needed", "needless", "needy", "neighborly", "nervous", "new", "next", "nice", "nifty", "nimble", "nippy", "noble", "noiseless", "noisy", "nonchalant", "nondescript", "nonstop", "normal", "nostalgic", "nosy", "noted", "novel", "noxious", "null", "numberless", "numero", "numerous", "nutritious", "nutty", "oafish", "obedient", "obeisant", "obnoxious", "obscene", "obsequious", "observant", "obsolete", "obtainable", "oceanic", "odd", "offbeat", "okay", "omniscient", "onerous", "open", "opposite", "optimal", "orange", "ordinary", "organic", "ossified", "outgoing", "outrageous", "outstanding", "oval", "overconfident", "overjoyed", "overrated", "overt", "overwrought", "pacific", "painful", "painstaking", "pale", "paltry", "panicky", "panoramic", "parallel", "parched", "parsimonious", "past", "pastoral", "pathetic", "peaceful", "peachy", "penitent", "peppy", "perfect", "periodic", "permissible", "perpetual", "petite", "phobic", "physical", "picayune", "pink", "piquant", "pithy", "placid", "plain", "plant", "plastic", "plausible", "pleasant", "plucky", "plum", "poetic", "pointless", "poised", "polite", "political", "posh", "possessive", "possible", "potent", "powerful", "precious", "premium", "present", "pretty", "previous", "pricey", "prickly", "prime", "primo", "private", "prized", "pro", "probable", "productive", "profuse", "prompt", "proper", "protective", "proud", "psychedelic", "psychotic", "public", "puffy", "pumped", "punchy", "puny", "pure", "purple", "purring", "pushy", "puzzled", "puzzling", "quack", "quaint", "quarrelsome", "questionable", "quick", "quickest", "quiet", "quirky", "quixotic", "quizzical", "rabid", "racial", "rad", "radioactive", "ragged", "rainy", "rambunctious", "rampant", "rapid", "rare", "raspy", "ratty", "reach", "ready", "real", "rebel", "receptive", "recondite", "red", "redundant", "reflective", "regal", "regular", "relieved", "remarkable", "reminiscent", "repulsive", "resilient", "resolute", "resonant", "responsible", "rhetorical", "rich", "right", "righteous", "rightful", "rigid", "ripe", "ritzy", "roasted", "robust", "romantic", "roomy", "rooted", "rosy", "rotten", "rough", "round", "royal", "ruddy", "rude", "rugged", "rural", "rustic", "ruthless", "sable", "sad", "safe", "salty", "same", "sassy", "satisfying", "saucy", "savory", "savvy", "scandalous", "scarce", "scared", "scary", "scattered", "scenic", "scientific", "scintillating", "scrawny", "screeching", "second", "secret", "secretive", "sedate", "seemly", "selective", "selfish", "sensitive", "separate", "serene", "serious", "shaggy", "shaky", "shallow", "sharp", "shiny", "shivering", "shocking", "short", "showy", "shrewd", "shrill", "shut", "shy", "sick", "silent", "silky", "silly", "simple", "simplistic", "sincere", "skillful", "skinny", "sleek", "sleepy", "slick", "slim", "slimy", "slippery", "sloppy", "slow", "small", "smart", "smelly", "smiley", "smiling", "smoggy", "smooth", "snappy", "snazzy", "sneaky", "snobbish", "snotty", "snowy", "snugly", "social", "soft", "soggy", "sole", "solid", "solitary", "somber", "sophisticated", "sordid", "sore", "sound", "sour", "spacial", "sparkling", "special", "spectacular", "spicy", "spiffy", "spiky", "spiritual", "spiteful", "splendid", "spooky", "spotless", "spotted", "spotty", "spry", "spurious", "squalid", "square", "squealing", "squeamish", "stable", "staking", "stale", "standing", "star", "stark", "statuesque", "steadfast", "steady", "steep", "stereotyped", "sticky", "stiff", "stimulating", "stingy", "stoic", "stormy", "straight", "strange", "striped", "strong", "stunning", "stupendous", "sturdy", "suave", "subdued", "subsequent", "substantial", "subtle", "successful", "succinct", "sudden", "sulky", "sunny", "sunset", "super", "superb", "superficial", "supreme", "sure", "swank", "swanky", "sweet", "swell", "sweltering", "swift", "symptomatic", "synonymous", "taboo", "tacit", "tacky", "talented", "tall", "tame", "tan", "tangible", "tangy", "tart", "tasteful", "tasteless", "tasty", "tawdry", "teal", "tearful", "tedious", "teeny", "telling", "temporary", "tender", "tense", "tenuous", "terrible", "terrific", "tested", "testy", "thankful", "therapeutic", "thin", "thinkable", "third", "thoughtful", "thoughtless", "threatening", "thriving", "thundering", "tidy", "timely", "tiny", "tired", "tiresome", "toothsome", "top", "tops", "torpid", "tough", "touted", "towering", "tranquil", "trashy", "tremendous", "tricky", "trim", "trite", "tropical", "troubled", "truculent", "true", "trusty", "truthful", "try", "typical", "ubiquitous", "ultra", "unable", "unaccountable", "unadvised", "unarmed", "unbecoming", "unbiased", "uncovered", "understood", "undisturbed", "unequal", "unequaled", "uneven", "unhealthy", "uninterested", "unique", "united", "unkempt", "unknown", "unnatural", "unruly", "unsightly", "unsuitable", "untidy", "unused", "unusual", "unwavering", "unwieldy", "unwritten", "upbeat", "uplifting", "uppity", "upset", "uptight", "urbane", "usable", "used", "useful", "utmost", "utopian", "utter", "uttermost", "vacuous", "vagabond", "vague", "valid", "valuable", "various", "vast", "vengeful", "venomous", "verdant", "versed", "vestal", "viable", "victorious", "vigorous", "violent", "violet", "vital", "vivacious", "vivid", "vocal", "vogue", "voiceless", "volatile", "voracious", "wacky", "waggish", "waiting", "wakeful", "wandering", "wanted", "wanting", "warlike", "warm", "wary", "wasteful", "watery", "weak", "wealthy", "weary", "wet", "whimsical", "whispering", "whole", "wholesale", "wicked", "wide", "wiggly", "wild", "willing", "windy", "winged", "wired", "wiry", "wise", "wistful", "witty", "woebegone", "wonderful", "wooden", "woozy", "workable", "worried", "worthy", "wrathful", "wretched", "wrong", "wry", "yielding", "young", "youthful", "yummy", "zany", "zealous", "zesty", "zippy", "zonked"];
    });
    var mc = Le((i2, Dc) => {
      var Ct = ac(), dc = cc(), gc = hc();
      Dc.exports = Hu;
      Hu.generate = Hu;
      function Hu(s) {
        var t = { number: false, words: 2, alliterative: false };
        s = Ct.merge(t, s || {});
        var r = dy(s);
        return { raw: r, dashed: r.join("-"), spaced: r.join(" ") };
      }
      function dy(s) {
        var t = [];
        return Ct.times(s.words - 1, function() {
          s.alliterative && t.length ? t.push(Ct.sample(pc(gc, t[0].substring(0, 1)))) : t.push(Ct.sample(gc).toLowerCase());
        }), s.alliterative ? t.push(Ct.sample(pc(dc, t[0].substring(0, 1)))) : t.push(Ct.sample(dc).toLowerCase()), s.number && t.push(Ct.random(1, 9999)), t;
      }
      function pc(s, t) {
        var r = t.toLowerCase();
        return Ct.filter(s, function(u) {
          return u.substring(0, 1).toLowerCase() === r;
        });
      }
    });
    var vc = Le((s2, bc) => {
      "use strict";
      var Gu = require("fs"), gy = require("util"), py = require("path"), Un, yc = class {
        constructor(t) {
          t = t || {}, this.directory = t.directory || "./locales", this.updateFiles = typeof t.updateFiles == "boolean" ? t.updateFiles : true, this.locale = t.locale || "en", this.fallbackToLanguage = typeof t.fallbackToLanguage == "boolean" ? t.fallbackToLanguage : true, this.cache = /* @__PURE__ */ Object.create(null), this.writeQueue = [];
        }
        __(...t) {
          if (typeof arguments[0] != "string")
            return this._taggedLiteral(arguments[0], ...arguments);
          let r = t.shift(), u = function() {
          };
          return typeof t[t.length - 1] == "function" && (u = t.pop()), u = u || function() {
          }, this.cache[this.locale] || this._readLocaleFile(), !this.cache[this.locale][r] && this.updateFiles ? (this.cache[this.locale][r] = r, this._enqueueWrite({ directory: this.directory, locale: this.locale, cb: u })) : u(), Un.format.apply(Un.format, [this.cache[this.locale][r] || r].concat(t));
        }
        __n() {
          let t = Array.prototype.slice.call(arguments), r = t.shift(), u = t.shift(), o = t.shift(), l = function() {
          };
          typeof t[t.length - 1] == "function" && (l = t.pop()), this.cache[this.locale] || this._readLocaleFile();
          let f = o === 1 ? r : u;
          this.cache[this.locale][r] && (f = this.cache[this.locale][r][o === 1 ? "one" : "other"]), !this.cache[this.locale][r] && this.updateFiles ? (this.cache[this.locale][r] = { one: r, other: u }, this._enqueueWrite({ directory: this.directory, locale: this.locale, cb: l })) : l();
          let g = [f];
          return ~f.indexOf("%d") && g.push(o), Un.format.apply(Un.format, g.concat(t));
        }
        setLocale(t) {
          this.locale = t;
        }
        getLocale() {
          return this.locale;
        }
        updateLocale(t) {
          this.cache[this.locale] || this._readLocaleFile();
          for (let r in t)
            Object.prototype.hasOwnProperty.call(t, r) && (this.cache[this.locale][r] = t[r]);
        }
        _taggedLiteral(t, ...r) {
          let u = "";
          return t.forEach(function(o, l) {
            let f = r[l + 1];
            u += o, typeof f < "u" && (u += "%s");
          }), this.__.apply(this, [u].concat([].slice.call(r, 1)));
        }
        _enqueueWrite(t) {
          this.writeQueue.push(t), this.writeQueue.length === 1 && this._processWriteQueue();
        }
        _processWriteQueue() {
          let t = this, r = this.writeQueue[0], u = r.directory, o = r.locale, l = r.cb, f = this._resolveLocaleFile(u, o), g = JSON.stringify(this.cache[o], null, 2);
          Un.fs.writeFile(f, g, "utf-8", function(v) {
            t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), l(v);
          });
        }
        _readLocaleFile() {
          let t = {}, r = this._resolveLocaleFile(this.directory, this.locale);
          try {
            Un.fs.readFileSync && (t = JSON.parse(Un.fs.readFileSync(r, "utf-8")));
          } catch (u) {
            if (u instanceof SyntaxError && (u.message = "syntax error in " + r), u.code === "ENOENT")
              t = {};
            else
              throw u;
          }
          this.cache[this.locale] = t;
        }
        _resolveLocaleFile(t, r) {
          let u = Un.resolve(t, "./", r + ".json");
          if (this.fallbackToLanguage && !this._fileExistsSync(u) && ~r.lastIndexOf("_")) {
            let o = Un.resolve(t, "./", r.split("_")[0] + ".json");
            this._fileExistsSync(o) && (u = o);
          }
          return u;
        }
        _fileExistsSync(t) {
          return Un.exists(t);
        }
      };
      function Dy(s, t) {
        Un = t;
        let r = new yc(s);
        return { __: r.__.bind(r), __n: r.__n.bind(r), setLocale: r.setLocale.bind(r), getLocale: r.getLocale.bind(r), updateLocale: r.updateLocale.bind(r), locale: r.locale };
      }
      var my = { fs: { readFileSync: Gu.readFileSync, writeFile: Gu.writeFile }, format: gy.format, resolve: py.resolve, exists: (s) => {
        try {
          return Gu.statSync(s).isFile();
        } catch {
          return false;
        }
      } }, yy = (s) => Dy(s, my);
      bc.exports = yy;
    });
    var Vu = Le((u2, Oc) => {
      "use strict";
      var by = require("util"), wc = require("path"), vy = require("fs");
      function Rr(s) {
        if (s !== s.toLowerCase() && s !== s.toUpperCase() || (s = s.toLowerCase()), s.indexOf("-") === -1 && s.indexOf("_") === -1)
          return s;
        {
          let r = "", u = false, o = s.match(/^-+/);
          for (let l = o ? o[0].length : 0; l < s.length; l++) {
            let f = s.charAt(l);
            u && (u = false, f = f.toUpperCase()), l !== 0 && (f === "-" || f === "_") ? u = true : f !== "-" && f !== "_" && (r += f);
          }
          return r;
        }
      }
      function Fc(s, t) {
        let r = s.toLowerCase();
        t = t || "-";
        let u = "";
        for (let o = 0; o < s.length; o++) {
          let l = r.charAt(o), f = s.charAt(o);
          l !== f && o > 0 ? u += `${t}${r.charAt(o)}` : u += f;
        }
        return u;
      }
      function Ec(s) {
        return s == null ? false : typeof s == "number" || /^0x[0-9a-f]+$/i.test(s) ? true : /^0[^.]/.test(s) ? false : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(s);
      }
      function wy(s) {
        if (Array.isArray(s))
          return s.map((f) => typeof f != "string" ? f + "" : f);
        s = s.trim();
        let t = 0, r = null, u = null, o = null, l = [];
        for (let f = 0; f < s.length; f++) {
          if (r = u, u = s.charAt(f), u === " " && !o) {
            r !== " " && t++;
            continue;
          }
          u === o ? o = null : (u === "'" || u === '"') && !o && (o = u), l[t] || (l[t] = ""), l[t] += u;
        }
        return l;
      }
      var Wn;
      (function(s) {
        s.BOOLEAN = "boolean", s.STRING = "string", s.NUMBER = "number", s.ARRAY = "array";
      })(Wn || (Wn = {}));
      var ot, xc = class {
        constructor(t) {
          ot = t;
        }
        parse(t, r) {
          let u = Object.assign({ alias: void 0, array: void 0, boolean: void 0, config: void 0, configObjects: void 0, configuration: void 0, coerce: void 0, count: void 0, default: void 0, envPrefix: void 0, narg: void 0, normalize: void 0, string: void 0, number: void 0, __: void 0, key: void 0 }, r), o = wy(t), l = typeof t == "string", f = Cy(Object.assign(/* @__PURE__ */ Object.create(null), u.alias)), g = Object.assign({ "boolean-negation": true, "camel-case-expansion": true, "combine-arrays": false, "dot-notation": true, "duplicate-arguments-array": true, "flatten-duplicate-arrays": true, "greedy-arrays": true, "halt-at-non-option": false, "nargs-eats-options": false, "negation-prefix": "no-", "parse-numbers": true, "parse-positional-numbers": true, "populate--": false, "set-placeholder-key": false, "short-option-groups": true, "strip-aliased": false, "strip-dashed": false, "unknown-options-as-args": false }, u.configuration), v = Object.assign(/* @__PURE__ */ Object.create(null), u.default), _ = u.configObjects || [], O = u.envPrefix, S = g["populate--"], q = S ? "--" : "_", le = /* @__PURE__ */ Object.create(null), L2 = /* @__PURE__ */ Object.create(null), A = u.__ || ot.format, w = { aliases: /* @__PURE__ */ Object.create(null), arrays: /* @__PURE__ */ Object.create(null), bools: /* @__PURE__ */ Object.create(null), strings: /* @__PURE__ */ Object.create(null), numbers: /* @__PURE__ */ Object.create(null), counts: /* @__PURE__ */ Object.create(null), normalize: /* @__PURE__ */ Object.create(null), configs: /* @__PURE__ */ Object.create(null), nargs: /* @__PURE__ */ Object.create(null), coercions: /* @__PURE__ */ Object.create(null), keys: [] }, Q = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, ee = new RegExp("^--" + g["negation-prefix"] + "(.+)");
          [].concat(u.array || []).filter(Boolean).forEach(function(y) {
            let E = typeof y == "object" ? y.key : y, N = Object.keys(y).map(function(B) {
              return { boolean: "bools", string: "strings", number: "numbers" }[B];
            }).filter(Boolean).pop();
            N && (w[N][E] = true), w.arrays[E] = true, w.keys.push(E);
          }), [].concat(u.boolean || []).filter(Boolean).forEach(function(y) {
            w.bools[y] = true, w.keys.push(y);
          }), [].concat(u.string || []).filter(Boolean).forEach(function(y) {
            w.strings[y] = true, w.keys.push(y);
          }), [].concat(u.number || []).filter(Boolean).forEach(function(y) {
            w.numbers[y] = true, w.keys.push(y);
          }), [].concat(u.count || []).filter(Boolean).forEach(function(y) {
            w.counts[y] = true, w.keys.push(y);
          }), [].concat(u.normalize || []).filter(Boolean).forEach(function(y) {
            w.normalize[y] = true, w.keys.push(y);
          }), typeof u.narg == "object" && Object.entries(u.narg).forEach(([y, E]) => {
            typeof E == "number" && (w.nargs[y] = E, w.keys.push(y));
          }), typeof u.coerce == "object" && Object.entries(u.coerce).forEach(([y, E]) => {
            typeof E == "function" && (w.coercions[y] = E, w.keys.push(y));
          }), typeof u.config < "u" && (Array.isArray(u.config) || typeof u.config == "string" ? [].concat(u.config).filter(Boolean).forEach(function(y) {
            w.configs[y] = true;
          }) : typeof u.config == "object" && Object.entries(u.config).forEach(([y, E]) => {
            (typeof E == "boolean" || typeof E == "function") && (w.configs[y] = E);
          })), ge(u.key, f, u.default, w.arrays), Object.keys(v).forEach(function(y) {
            (w.aliases[y] || []).forEach(function(E) {
              v[E] = v[y];
            });
          });
          let z = null;
          us();
          let De = [], ce = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), nn = {};
          for (let y = 0; y < o.length; y++) {
            let E = o[y], N = E.replace(/^-{3,}/, "---"), B, F, U, $, J, Be;
            if (E !== "--" && Ln(E))
              qe(E);
            else if (N.match(/---+(=|$)/)) {
              qe(E);
              continue;
            } else if (E.match(/^--.+=/) || !g["short-option-groups"] && E.match(/^-.+=/))
              $ = E.match(/^--?([^=]+)=([\s\S]*)$/), $ !== null && Array.isArray($) && $.length >= 3 && (R($[1], w.arrays) ? y = ne(y, $[1], o, $[2]) : R($[1], w.nargs) !== false ? y = T(y, $[1], o, $[2]) : Z($[1], $[2], true));
            else if (E.match(ee) && g["boolean-negation"])
              $ = E.match(ee), $ !== null && Array.isArray($) && $.length >= 2 && (F = $[1], Z(F, R(F, w.arrays) ? [false] : false));
            else if (E.match(/^--.+/) || !g["short-option-groups"] && E.match(/^-[^-]+/))
              $ = E.match(/^--?(.+)/), $ !== null && Array.isArray($) && $.length >= 2 && (F = $[1], R(F, w.arrays) ? y = ne(y, F, o) : R(F, w.nargs) !== false ? y = T(y, F, o) : (J = o[y + 1], J !== void 0 && (!J.match(/^-/) || J.match(Q)) && !R(F, w.bools) && !R(F, w.counts) || /^(true|false)$/.test(J) ? (Z(F, J), y++) : Z(F, Tn(F))));
            else if (E.match(/^-.\..+=/))
              $ = E.match(/^-([^=]+)=([\s\S]*)$/), $ !== null && Array.isArray($) && $.length >= 3 && Z($[1], $[2]);
            else if (E.match(/^-.\..+/) && !E.match(Q))
              J = o[y + 1], $ = E.match(/^-(.\..+)/), $ !== null && Array.isArray($) && $.length >= 2 && (F = $[1], J !== void 0 && !J.match(/^-/) && !R(F, w.bools) && !R(F, w.counts) ? (Z(F, J), y++) : Z(F, Tn(F)));
            else if (E.match(/^-[^-]+/) && !E.match(Q)) {
              U = E.slice(1, -1).split(""), B = false;
              for (let Qe = 0; Qe < U.length; Qe++) {
                if (J = E.slice(Qe + 2), U[Qe + 1] && U[Qe + 1] === "=") {
                  Be = E.slice(Qe + 3), F = U[Qe], R(F, w.arrays) ? y = ne(y, F, o, Be) : R(F, w.nargs) !== false ? y = T(y, F, o, Be) : Z(F, Be), B = true;
                  break;
                }
                if (J === "-") {
                  Z(U[Qe], J);
                  continue;
                }
                if (/[A-Za-z]/.test(U[Qe]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(J) && R(J, w.bools) === false) {
                  Z(U[Qe], J), B = true;
                  break;
                }
                if (U[Qe + 1] && U[Qe + 1].match(/\W/)) {
                  Z(U[Qe], J), B = true;
                  break;
                } else
                  Z(U[Qe], Tn(U[Qe]));
              }
              F = E.slice(-1)[0], !B && F !== "-" && (R(F, w.arrays) ? y = ne(y, F, o) : R(F, w.nargs) !== false ? y = T(y, F, o) : (J = o[y + 1], J !== void 0 && (!/^(-|--)[^-]/.test(J) || J.match(Q)) && !R(F, w.bools) && !R(F, w.counts) || /^(true|false)$/.test(J) ? (Z(F, J), y++) : Z(F, Tn(F))));
            } else if (E.match(/^-[0-9]$/) && E.match(Q) && R(E.slice(1), w.bools))
              F = E.slice(1), Z(F, Tn(F));
            else if (E === "--") {
              De = o.slice(y + 1);
              break;
            } else if (g["halt-at-non-option"]) {
              De = o.slice(y);
              break;
            } else
              qe(E);
          }
          lt(ce, true), lt(ce, false), ze(ce), ve(), ct(ce, w.aliases, v, true), Hn(ce), g["set-placeholder-key"] && Ve(ce), Object.keys(w.counts).forEach(function(y) {
            V(ce, y.split(".")) || Z(y, 0);
          }), S && De.length && (ce[q] = []), De.forEach(function(y) {
            ce[q].push(y);
          }), g["camel-case-expansion"] && g["strip-dashed"] && Object.keys(ce).filter((y) => y !== "--" && y.includes("-")).forEach((y) => {
            delete ce[y];
          }), g["strip-aliased"] && [].concat(...Object.keys(f).map((y) => f[y])).forEach((y) => {
            g["camel-case-expansion"] && y.includes("-") && delete ce[y.split(".").map((E) => Rr(E)).join(".")], delete ce[y];
          });
          function qe(y) {
            let E = Ce("_", y);
            (typeof E == "string" || typeof E == "number") && ce._.push(E);
          }
          function T(y, E, N, B) {
            let F, U = R(E, w.nargs);
            if (U = typeof U != "number" || isNaN(U) ? 1 : U, U === 0)
              return sn(B) || (z = Error(A("Argument unexpected for: %s", E))), Z(E, Tn(E)), y;
            let $ = sn(B) ? 0 : 1;
            if (g["nargs-eats-options"])
              N.length - (y + 1) + $ < U && (z = Error(A("Not enough arguments following: %s", E))), $ = U;
            else {
              for (F = y + 1; F < N.length && (!N[F].match(/^-[^0-9]/) || N[F].match(Q) || Ln(N[F])); F++)
                $++;
              $ < U && (z = Error(A("Not enough arguments following: %s", E)));
            }
            let J = Math.min($, U);
            for (!sn(B) && J > 0 && (Z(E, B), J--), F = y + 1; F < J + y + 1; F++)
              Z(E, N[F]);
            return y + J;
          }
          function ne(y, E, N, B) {
            let F = [], U = B || N[y + 1], $ = R(E, w.nargs);
            if (R(E, w.bools) && !/^(true|false)$/.test(U))
              F.push(true);
            else if (sn(U) || sn(B) && /^-/.test(U) && !Q.test(U) && !Ln(U)) {
              if (v[E] !== void 0) {
                let J = v[E];
                F = Array.isArray(J) ? J : [J];
              }
            } else {
              sn(B) || F.push(xe(E, B, true));
              for (let J = y + 1; J < N.length && !(!g["greedy-arrays"] && F.length > 0 || $ && typeof $ == "number" && F.length >= $ || (U = N[J], /^-/.test(U) && !Q.test(U) && !Ln(U))); J++)
                y = J, F.push(xe(E, U, l));
            }
            return typeof $ == "number" && ($ && F.length < $ || isNaN($) && F.length === 0) && (z = Error(A("Not enough arguments following: %s", E))), Z(E, F), y;
          }
          function Z(y, E, N = l) {
            if (/-/.test(y) && g["camel-case-expansion"]) {
              let U = y.split(".").map(function($) {
                return Rr($);
              }).join(".");
              Ie(y, U);
            }
            let B = xe(y, E, N), F = y.split(".");
            ue(ce, F, B), w.aliases[y] && w.aliases[y].forEach(function(U) {
              let $ = U.split(".");
              ue(ce, $, B);
            }), F.length > 1 && g["dot-notation"] && (w.aliases[F[0]] || []).forEach(function(U) {
              let $ = U.split("."), J = [].concat(F);
              J.shift(), $ = $.concat(J), (w.aliases[y] || []).includes($.join(".")) || ue(ce, $, B);
            }), R(y, w.normalize) && !R(y, w.arrays) && [y].concat(w.aliases[y] || []).forEach(function($) {
              Object.defineProperty(nn, $, { enumerable: true, get() {
                return E;
              }, set(J) {
                E = typeof J == "string" ? ot.normalize(J) : J;
              } });
            });
          }
          function Ie(y, E) {
            w.aliases[y] && w.aliases[y].length || (w.aliases[y] = [E], le[E] = true), w.aliases[E] && w.aliases[E].length || Ie(E, y);
          }
          function xe(y, E, N) {
            N && (E = _y(E)), (R(y, w.bools) || R(y, w.counts)) && typeof E == "string" && (E = E === "true");
            let B = Array.isArray(E) ? E.map(function(F) {
              return Ce(y, F);
            }) : Ce(y, E);
            return R(y, w.counts) && (sn(B) || typeof B == "boolean") && (B = Ku()), R(y, w.normalize) && R(y, w.arrays) && (Array.isArray(E) ? B = E.map((F) => ot.normalize(F)) : B = ot.normalize(E)), B;
          }
          function Ce(y, E) {
            return !g["parse-positional-numbers"] && y === "_" || !R(y, w.strings) && !R(y, w.bools) && !Array.isArray(E) && (Ec(E) && g["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${E}`))) || !sn(E) && R(y, w.numbers)) && (E = Number(E)), E;
          }
          function ze(y) {
            let E = /* @__PURE__ */ Object.create(null);
            ct(E, w.aliases, v), Object.keys(w.configs).forEach(function(N) {
              let B = y[N] || E[N];
              if (B)
                try {
                  let F = null, U = ot.resolve(ot.cwd(), B), $ = w.configs[N];
                  if (typeof $ == "function") {
                    try {
                      F = $(U);
                    } catch (J) {
                      F = J;
                    }
                    if (F instanceof Error) {
                      z = F;
                      return;
                    }
                  } else
                    F = ot.require(U);
                  Xe(F);
                } catch (F) {
                  F.name === "PermissionDenied" ? z = F : y[N] && (z = Error(A("Invalid JSON config file: %s", B)));
                }
            });
          }
          function Xe(y, E) {
            Object.keys(y).forEach(function(N) {
              let B = y[N], F = E ? E + "." + N : N;
              typeof B == "object" && B !== null && !Array.isArray(B) && g["dot-notation"] ? Xe(B, F) : (!V(ce, F.split(".")) || R(F, w.arrays) && g["combine-arrays"]) && Z(F, B);
            });
          }
          function ve() {
            typeof _ < "u" && _.forEach(function(y) {
              Xe(y);
            });
          }
          function lt(y, E) {
            if (typeof O > "u")
              return;
            let N = typeof O == "string" ? O : "", B = ot.env();
            Object.keys(B).forEach(function(F) {
              if (N === "" || F.lastIndexOf(N, 0) === 0) {
                let U = F.split("__").map(function($, J) {
                  return J === 0 && ($ = $.substring(N.length)), Rr($);
                });
                (E && w.configs[U.join(".")] || !E) && !V(y, U) && Z(U.join("."), B[F]);
              }
            });
          }
          function Hn(y) {
            let E, N = /* @__PURE__ */ new Set();
            Object.keys(y).forEach(function(B) {
              if (!N.has(B) && (E = R(B, w.coercions), typeof E == "function"))
                try {
                  let F = Ce(B, E(y[B]));
                  [].concat(w.aliases[B] || [], B).forEach((U) => {
                    N.add(U), y[U] = F;
                  });
                } catch (F) {
                  z = F;
                }
            });
          }
          function Ve(y) {
            return w.keys.forEach((E) => {
              ~E.indexOf(".") || typeof y[E] > "u" && (y[E] = void 0);
            }), y;
          }
          function ct(y, E, N, B = false) {
            Object.keys(N).forEach(function(F) {
              V(y, F.split(".")) || (ue(y, F.split("."), N[F]), B && (L2[F] = true), (E[F] || []).forEach(function(U) {
                V(y, U.split(".")) || ue(y, U.split("."), N[F]);
              }));
            });
          }
          function V(y, E) {
            let N = y;
            g["dot-notation"] || (E = [E.join(".")]), E.slice(0, -1).forEach(function(F) {
              N = N[F] || {};
            });
            let B = E[E.length - 1];
            return typeof N != "object" ? false : B in N;
          }
          function ue(y, E, N) {
            let B = y;
            g["dot-notation"] || (E = [E.join(".")]), E.slice(0, -1).forEach(function(Be) {
              Be = Cc(Be), typeof B == "object" && B[Be] === void 0 && (B[Be] = {}), typeof B[Be] != "object" || Array.isArray(B[Be]) ? (Array.isArray(B[Be]) ? B[Be].push({}) : B[Be] = [B[Be], {}], B = B[Be][B[Be].length - 1]) : B = B[Be];
            });
            let F = Cc(E[E.length - 1]), U = R(E.join("."), w.arrays), $ = Array.isArray(N), J = g["duplicate-arguments-array"];
            !J && R(F, w.nargs) && (J = true, (!sn(B[F]) && w.nargs[F] === 1 || Array.isArray(B[F]) && B[F].length === w.nargs[F]) && (B[F] = void 0)), N === Ku() ? B[F] = Ku(B[F]) : Array.isArray(B[F]) ? J && U && $ ? B[F] = g["flatten-duplicate-arrays"] ? B[F].concat(N) : (Array.isArray(B[F][0]) ? B[F] : [B[F]]).concat([N]) : !J && Boolean(U) === Boolean($) ? B[F] = N : B[F] = B[F].concat([N]) : B[F] === void 0 && U ? B[F] = $ ? N : [N] : J && !(B[F] === void 0 || R(F, w.counts) || R(F, w.bools)) ? B[F] = [B[F], N] : B[F] = N;
          }
          function ge(...y) {
            y.forEach(function(E) {
              Object.keys(E || {}).forEach(function(N) {
                w.aliases[N] || (w.aliases[N] = [].concat(f[N] || []), w.aliases[N].concat(N).forEach(function(B) {
                  if (/-/.test(B) && g["camel-case-expansion"]) {
                    let F = Rr(B);
                    F !== N && w.aliases[N].indexOf(F) === -1 && (w.aliases[N].push(F), le[F] = true);
                  }
                }), w.aliases[N].concat(N).forEach(function(B) {
                  if (B.length > 1 && /[A-Z]/.test(B) && g["camel-case-expansion"]) {
                    let F = Fc(B, "-");
                    F !== N && w.aliases[N].indexOf(F) === -1 && (w.aliases[N].push(F), le[F] = true);
                  }
                }), w.aliases[N].forEach(function(B) {
                  w.aliases[B] = [N].concat(w.aliases[N].filter(function(F) {
                    return B !== F;
                  }));
                }));
              });
            });
          }
          function R(y, E) {
            let N = [].concat(w.aliases[y] || [], y), B = Object.keys(E), F = N.find((U) => B.includes(U));
            return F ? E[F] : false;
          }
          function ke(y) {
            let E = Object.keys(w);
            return [].concat(E.map((B) => w[B])).some(function(B) {
              return Array.isArray(B) ? B.includes(y) : B[y];
            });
          }
          function _e(y, ...E) {
            return [].concat(...E).some(function(B) {
              let F = y.match(B);
              return F && ke(F[1]);
            });
          }
          function Me(y) {
            if (y.match(Q) || !y.match(/^-[^-]+/))
              return false;
            let E = true, N, B = y.slice(1).split("");
            for (let F = 0; F < B.length; F++) {
              if (N = y.slice(F + 2), !ke(B[F])) {
                E = false;
                break;
              }
              if (B[F + 1] && B[F + 1] === "=" || N === "-" || /[A-Za-z]/.test(B[F]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(N) || B[F + 1] && B[F + 1].match(/\W/))
                break;
            }
            return E;
          }
          function Ln(y) {
            return g["unknown-options-as-args"] && Gn(y);
          }
          function Gn(y) {
            return y = y.replace(/^-{3,}/, "--"), y.match(Q) || Me(y) ? false : !_e(y, /^-+([^=]+?)=[\s\S]*$/, ee, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
          }
          function Tn(y) {
            return !R(y, w.bools) && !R(y, w.counts) && `${y}` in v ? v[y] : Hr(dn(y));
          }
          function Hr(y) {
            return { [Wn.BOOLEAN]: true, [Wn.STRING]: "", [Wn.NUMBER]: void 0, [Wn.ARRAY]: [] }[y];
          }
          function dn(y) {
            let E = Wn.BOOLEAN;
            return R(y, w.strings) ? E = Wn.STRING : R(y, w.numbers) ? E = Wn.NUMBER : R(y, w.bools) ? E = Wn.BOOLEAN : R(y, w.arrays) && (E = Wn.ARRAY), E;
          }
          function sn(y) {
            return y === void 0;
          }
          function us() {
            Object.keys(w.counts).find((y) => R(y, w.arrays) ? (z = Error(A("Invalid configuration: %s, opts.count excludes opts.array.", y)), true) : R(y, w.nargs) ? (z = Error(A("Invalid configuration: %s, opts.count excludes opts.narg.", y)), true) : false);
          }
          return { aliases: Object.assign({}, w.aliases), argv: Object.assign(nn, ce), configuration: g, defaulted: Object.assign({}, L2), error: z, newAliases: Object.assign({}, le) };
        }
      };
      function Cy(s) {
        let t = [], r = /* @__PURE__ */ Object.create(null), u = true;
        for (Object.keys(s).forEach(function(o) {
          t.push([].concat(s[o], o));
        }); u; ) {
          u = false;
          for (let o = 0; o < t.length; o++)
            for (let l = o + 1; l < t.length; l++)
              if (t[o].filter(function(g) {
                return t[l].indexOf(g) !== -1;
              }).length) {
                t[o] = t[o].concat(t[l]), t.splice(l, 1), u = true;
                break;
              }
        }
        return t.forEach(function(o) {
          o = o.filter(function(f, g, v) {
            return v.indexOf(f) === g;
          });
          let l = o.pop();
          l !== void 0 && typeof l == "string" && (r[l] = o);
        }), r;
      }
      function Ku(s) {
        return s !== void 0 ? s + 1 : 1;
      }
      function Cc(s) {
        return s === "__proto__" ? "___proto___" : s;
      }
      function _y(s) {
        return typeof s == "string" && (s[0] === "'" || s[0] === '"') && s[s.length - 1] === s[0] ? s.substring(1, s.length - 1) : s;
      }
      var _c = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12;
      if (process && process.version && Number(process.version.match(/v([^.]+)/)[1]) < _c)
        throw Error(`yargs parser supports a minimum Node.js version of ${_c}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
      var Fy = process ? process.env : {}, Ac = new xc({ cwd: process.cwd, env: () => Fy, format: by.format, normalize: wc.normalize, resolve: wc.resolve, require: (s) => {
        if (typeof require < "u")
          return require(s);
        if (s.match(/\.json$/))
          return JSON.parse(vy.readFileSync(s, "utf8"));
        throw Error("only .json config files are supported in ESM");
      } }), Lr = function(t, r) {
        return Ac.parse(t.slice(), r).argv;
      };
      Lr.detailed = function(s, t) {
        return Ac.parse(s.slice(), t);
      };
      Lr.camelCase = Rr;
      Lr.decamelize = Fc;
      Lr.looksLikeNumber = Ec;
      Oc.exports = Lr;
    });
    var kc = Le((o2, Sc) => {
      "use strict";
      Sc.exports = ({ onlyFirst: s = false } = {}) => {
        let t = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");
        return new RegExp(t, s ? void 0 : "g");
      };
    });
    var Ui = Le((a2, Bc) => {
      "use strict";
      var Ey = kc();
      Bc.exports = (s) => typeof s == "string" ? s.replace(Ey(), "") : s;
    });
    var Ic = Le((l2, Yu) => {
      "use strict";
      var Pc = (s) => Number.isNaN(s) ? false : s >= 4352 && (s <= 4447 || s === 9001 || s === 9002 || 11904 <= s && s <= 12871 && s !== 12351 || 12880 <= s && s <= 19903 || 19968 <= s && s <= 42182 || 43360 <= s && s <= 43388 || 44032 <= s && s <= 55203 || 63744 <= s && s <= 64255 || 65040 <= s && s <= 65049 || 65072 <= s && s <= 65131 || 65281 <= s && s <= 65376 || 65504 <= s && s <= 65510 || 110592 <= s && s <= 110593 || 127488 <= s && s <= 127569 || 131072 <= s && s <= 262141);
      Yu.exports = Pc;
      Yu.exports.default = Pc;
    });
    var Rc = Le((c2, Mc) => {
      "use strict";
      Mc.exports = function() {
        return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
      };
    });
    var Wi = Le((f2, Zu) => {
      "use strict";
      var xy = Ui(), Ay = Ic(), Oy = Rc(), Lc = (s) => {
        if (typeof s != "string" || s.length === 0 || (s = xy(s), s.length === 0))
          return 0;
        s = s.replace(Oy(), "  ");
        let t = 0;
        for (let r = 0; r < s.length; r++) {
          let u = s.codePointAt(r);
          u <= 31 || u >= 127 && u <= 159 || u >= 768 && u <= 879 || (u > 65535 && r++, t += Ay(u) ? 2 : 1);
        }
        return t;
      };
      Zu.exports = Lc;
      Zu.exports.default = Lc;
    });
    var Nc = Le((h2, Tc) => {
      "use strict";
      Tc.exports = { aliceblue: [240, 248, 255], antiquewhite: [250, 235, 215], aqua: [0, 255, 255], aquamarine: [127, 255, 212], azure: [240, 255, 255], beige: [245, 245, 220], bisque: [255, 228, 196], black: [0, 0, 0], blanchedalmond: [255, 235, 205], blue: [0, 0, 255], blueviolet: [138, 43, 226], brown: [165, 42, 42], burlywood: [222, 184, 135], cadetblue: [95, 158, 160], chartreuse: [127, 255, 0], chocolate: [210, 105, 30], coral: [255, 127, 80], cornflowerblue: [100, 149, 237], cornsilk: [255, 248, 220], crimson: [220, 20, 60], cyan: [0, 255, 255], darkblue: [0, 0, 139], darkcyan: [0, 139, 139], darkgoldenrod: [184, 134, 11], darkgray: [169, 169, 169], darkgreen: [0, 100, 0], darkgrey: [169, 169, 169], darkkhaki: [189, 183, 107], darkmagenta: [139, 0, 139], darkolivegreen: [85, 107, 47], darkorange: [255, 140, 0], darkorchid: [153, 50, 204], darkred: [139, 0, 0], darksalmon: [233, 150, 122], darkseagreen: [143, 188, 143], darkslateblue: [72, 61, 139], darkslategray: [47, 79, 79], darkslategrey: [47, 79, 79], darkturquoise: [0, 206, 209], darkviolet: [148, 0, 211], deeppink: [255, 20, 147], deepskyblue: [0, 191, 255], dimgray: [105, 105, 105], dimgrey: [105, 105, 105], dodgerblue: [30, 144, 255], firebrick: [178, 34, 34], floralwhite: [255, 250, 240], forestgreen: [34, 139, 34], fuchsia: [255, 0, 255], gainsboro: [220, 220, 220], ghostwhite: [248, 248, 255], gold: [255, 215, 0], goldenrod: [218, 165, 32], gray: [128, 128, 128], green: [0, 128, 0], greenyellow: [173, 255, 47], grey: [128, 128, 128], honeydew: [240, 255, 240], hotpink: [255, 105, 180], indianred: [205, 92, 92], indigo: [75, 0, 130], ivory: [255, 255, 240], khaki: [240, 230, 140], lavender: [230, 230, 250], lavenderblush: [255, 240, 245], lawngreen: [124, 252, 0], lemonchiffon: [255, 250, 205], lightblue: [173, 216, 230], lightcoral: [240, 128, 128], lightcyan: [224, 255, 255], lightgoldenrodyellow: [250, 250, 210], lightgray: [211, 211, 211], lightgreen: [144, 238, 144], lightgrey: [211, 211, 211], lightpink: [255, 182, 193], lightsalmon: [255, 160, 122], lightseagreen: [32, 178, 170], lightskyblue: [135, 206, 250], lightslategray: [119, 136, 153], lightslategrey: [119, 136, 153], lightsteelblue: [176, 196, 222], lightyellow: [255, 255, 224], lime: [0, 255, 0], limegreen: [50, 205, 50], linen: [250, 240, 230], magenta: [255, 0, 255], maroon: [128, 0, 0], mediumaquamarine: [102, 205, 170], mediumblue: [0, 0, 205], mediumorchid: [186, 85, 211], mediumpurple: [147, 112, 219], mediumseagreen: [60, 179, 113], mediumslateblue: [123, 104, 238], mediumspringgreen: [0, 250, 154], mediumturquoise: [72, 209, 204], mediumvioletred: [199, 21, 133], midnightblue: [25, 25, 112], mintcream: [245, 255, 250], mistyrose: [255, 228, 225], moccasin: [255, 228, 181], navajowhite: [255, 222, 173], navy: [0, 0, 128], oldlace: [253, 245, 230], olive: [128, 128, 0], olivedrab: [107, 142, 35], orange: [255, 165, 0], orangered: [255, 69, 0], orchid: [218, 112, 214], palegoldenrod: [238, 232, 170], palegreen: [152, 251, 152], paleturquoise: [175, 238, 238], palevioletred: [219, 112, 147], papayawhip: [255, 239, 213], peachpuff: [255, 218, 185], peru: [205, 133, 63], pink: [255, 192, 203], plum: [221, 160, 221], powderblue: [176, 224, 230], purple: [128, 0, 128], rebeccapurple: [102, 51, 153], red: [255, 0, 0], rosybrown: [188, 143, 143], royalblue: [65, 105, 225], saddlebrown: [139, 69, 19], salmon: [250, 128, 114], sandybrown: [244, 164, 96], seagreen: [46, 139, 87], seashell: [255, 245, 238], sienna: [160, 82, 45], silver: [192, 192, 192], skyblue: [135, 206, 235], slateblue: [106, 90, 205], slategray: [112, 128, 144], slategrey: [112, 128, 144], snow: [255, 250, 250], springgreen: [0, 255, 127], steelblue: [70, 130, 180], tan: [210, 180, 140], teal: [0, 128, 128], thistle: [216, 191, 216], tomato: [255, 99, 71], turquoise: [64, 224, 208], violet: [238, 130, 238], wheat: [245, 222, 179], white: [255, 255, 255], whitesmoke: [245, 245, 245], yellow: [255, 255, 0], yellowgreen: [154, 205, 50] };
    });
    var Ju = Le((d2, jc) => {
      var Tr = Nc(), qc = {};
      for (let s of Object.keys(Tr))
        qc[Tr[s]] = s;
      var K = { rgb: { channels: 3, labels: "rgb" }, hsl: { channels: 3, labels: "hsl" }, hsv: { channels: 3, labels: "hsv" }, hwb: { channels: 3, labels: "hwb" }, cmyk: { channels: 4, labels: "cmyk" }, xyz: { channels: 3, labels: "xyz" }, lab: { channels: 3, labels: "lab" }, lch: { channels: 3, labels: "lch" }, hex: { channels: 1, labels: ["hex"] }, keyword: { channels: 1, labels: ["keyword"] }, ansi16: { channels: 1, labels: ["ansi16"] }, ansi256: { channels: 1, labels: ["ansi256"] }, hcg: { channels: 3, labels: ["h", "c", "g"] }, apple: { channels: 3, labels: ["r16", "g16", "b16"] }, gray: { channels: 1, labels: ["gray"] } };
      jc.exports = K;
      for (let s of Object.keys(K)) {
        if (!("channels" in K[s]))
          throw new Error("missing channels property: " + s);
        if (!("labels" in K[s]))
          throw new Error("missing channel labels property: " + s);
        if (K[s].labels.length !== K[s].channels)
          throw new Error("channel and label counts mismatch: " + s);
        let { channels: t, labels: r } = K[s];
        delete K[s].channels, delete K[s].labels, Object.defineProperty(K[s], "channels", { value: t }), Object.defineProperty(K[s], "labels", { value: r });
      }
      K.rgb.hsl = function(s) {
        let t = s[0] / 255, r = s[1] / 255, u = s[2] / 255, o = Math.min(t, r, u), l = Math.max(t, r, u), f = l - o, g, v;
        l === o ? g = 0 : t === l ? g = (r - u) / f : r === l ? g = 2 + (u - t) / f : u === l && (g = 4 + (t - r) / f), g = Math.min(g * 60, 360), g < 0 && (g += 360);
        let _ = (o + l) / 2;
        return l === o ? v = 0 : _ <= 0.5 ? v = f / (l + o) : v = f / (2 - l - o), [g, v * 100, _ * 100];
      };
      K.rgb.hsv = function(s) {
        let t, r, u, o, l, f = s[0] / 255, g = s[1] / 255, v = s[2] / 255, _ = Math.max(f, g, v), O = _ - Math.min(f, g, v), S = function(q) {
          return (_ - q) / 6 / O + 1 / 2;
        };
        return O === 0 ? (o = 0, l = 0) : (l = O / _, t = S(f), r = S(g), u = S(v), f === _ ? o = u - r : g === _ ? o = 1 / 3 + t - u : v === _ && (o = 2 / 3 + r - t), o < 0 ? o += 1 : o > 1 && (o -= 1)), [o * 360, l * 100, _ * 100];
      };
      K.rgb.hwb = function(s) {
        let t = s[0], r = s[1], u = s[2], o = K.rgb.hsl(s)[0], l = 1 / 255 * Math.min(t, Math.min(r, u));
        return u = 1 - 1 / 255 * Math.max(t, Math.max(r, u)), [o, l * 100, u * 100];
      };
      K.rgb.cmyk = function(s) {
        let t = s[0] / 255, r = s[1] / 255, u = s[2] / 255, o = Math.min(1 - t, 1 - r, 1 - u), l = (1 - t - o) / (1 - o) || 0, f = (1 - r - o) / (1 - o) || 0, g = (1 - u - o) / (1 - o) || 0;
        return [l * 100, f * 100, g * 100, o * 100];
      };
      function Sy(s, t) {
        return (s[0] - t[0]) ** 2 + (s[1] - t[1]) ** 2 + (s[2] - t[2]) ** 2;
      }
      K.rgb.keyword = function(s) {
        let t = qc[s];
        if (t)
          return t;
        let r = 1 / 0, u;
        for (let o of Object.keys(Tr)) {
          let l = Tr[o], f = Sy(s, l);
          f < r && (r = f, u = o);
        }
        return u;
      };
      K.keyword.rgb = function(s) {
        return Tr[s];
      };
      K.rgb.xyz = function(s) {
        let t = s[0] / 255, r = s[1] / 255, u = s[2] / 255;
        t = t > 0.04045 ? ((t + 0.055) / 1.055) ** 2.4 : t / 12.92, r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92, u = u > 0.04045 ? ((u + 0.055) / 1.055) ** 2.4 : u / 12.92;
        let o = t * 0.4124 + r * 0.3576 + u * 0.1805, l = t * 0.2126 + r * 0.7152 + u * 0.0722, f = t * 0.0193 + r * 0.1192 + u * 0.9505;
        return [o * 100, l * 100, f * 100];
      };
      K.rgb.lab = function(s) {
        let t = K.rgb.xyz(s), r = t[0], u = t[1], o = t[2];
        r /= 95.047, u /= 100, o /= 108.883, r = r > 8856e-6 ? r ** (1 / 3) : 7.787 * r + 16 / 116, u = u > 8856e-6 ? u ** (1 / 3) : 7.787 * u + 16 / 116, o = o > 8856e-6 ? o ** (1 / 3) : 7.787 * o + 16 / 116;
        let l = 116 * u - 16, f = 500 * (r - u), g = 200 * (u - o);
        return [l, f, g];
      };
      K.hsl.rgb = function(s) {
        let t = s[0] / 360, r = s[1] / 100, u = s[2] / 100, o, l, f;
        if (r === 0)
          return f = u * 255, [f, f, f];
        u < 0.5 ? o = u * (1 + r) : o = u + r - u * r;
        let g = 2 * u - o, v = [0, 0, 0];
        for (let _ = 0; _ < 3; _++)
          l = t + 1 / 3 * -(_ - 1), l < 0 && l++, l > 1 && l--, 6 * l < 1 ? f = g + (o - g) * 6 * l : 2 * l < 1 ? f = o : 3 * l < 2 ? f = g + (o - g) * (2 / 3 - l) * 6 : f = g, v[_] = f * 255;
        return v;
      };
      K.hsl.hsv = function(s) {
        let t = s[0], r = s[1] / 100, u = s[2] / 100, o = r, l = Math.max(u, 0.01);
        u *= 2, r *= u <= 1 ? u : 2 - u, o *= l <= 1 ? l : 2 - l;
        let f = (u + r) / 2, g = u === 0 ? 2 * o / (l + o) : 2 * r / (u + r);
        return [t, g * 100, f * 100];
      };
      K.hsv.rgb = function(s) {
        let t = s[0] / 60, r = s[1] / 100, u = s[2] / 100, o = Math.floor(t) % 6, l = t - Math.floor(t), f = 255 * u * (1 - r), g = 255 * u * (1 - r * l), v = 255 * u * (1 - r * (1 - l));
        switch (u *= 255, o) {
          case 0:
            return [u, v, f];
          case 1:
            return [g, u, f];
          case 2:
            return [f, u, v];
          case 3:
            return [f, g, u];
          case 4:
            return [v, f, u];
          case 5:
            return [u, f, g];
        }
      };
      K.hsv.hsl = function(s) {
        let t = s[0], r = s[1] / 100, u = s[2] / 100, o = Math.max(u, 0.01), l, f;
        f = (2 - r) * u;
        let g = (2 - r) * o;
        return l = r * o, l /= g <= 1 ? g : 2 - g, l = l || 0, f /= 2, [t, l * 100, f * 100];
      };
      K.hwb.rgb = function(s) {
        let t = s[0] / 360, r = s[1] / 100, u = s[2] / 100, o = r + u, l;
        o > 1 && (r /= o, u /= o);
        let f = Math.floor(6 * t), g = 1 - u;
        l = 6 * t - f, (f & 1) !== 0 && (l = 1 - l);
        let v = r + l * (g - r), _, O, S;
        switch (f) {
          default:
          case 6:
          case 0:
            _ = g, O = v, S = r;
            break;
          case 1:
            _ = v, O = g, S = r;
            break;
          case 2:
            _ = r, O = g, S = v;
            break;
          case 3:
            _ = r, O = v, S = g;
            break;
          case 4:
            _ = v, O = r, S = g;
            break;
          case 5:
            _ = g, O = r, S = v;
            break;
        }
        return [_ * 255, O * 255, S * 255];
      };
      K.cmyk.rgb = function(s) {
        let t = s[0] / 100, r = s[1] / 100, u = s[2] / 100, o = s[3] / 100, l = 1 - Math.min(1, t * (1 - o) + o), f = 1 - Math.min(1, r * (1 - o) + o), g = 1 - Math.min(1, u * (1 - o) + o);
        return [l * 255, f * 255, g * 255];
      };
      K.xyz.rgb = function(s) {
        let t = s[0] / 100, r = s[1] / 100, u = s[2] / 100, o, l, f;
        return o = t * 3.2406 + r * -1.5372 + u * -0.4986, l = t * -0.9689 + r * 1.8758 + u * 0.0415, f = t * 0.0557 + r * -0.204 + u * 1.057, o = o > 31308e-7 ? 1.055 * o ** (1 / 2.4) - 0.055 : o * 12.92, l = l > 31308e-7 ? 1.055 * l ** (1 / 2.4) - 0.055 : l * 12.92, f = f > 31308e-7 ? 1.055 * f ** (1 / 2.4) - 0.055 : f * 12.92, o = Math.min(Math.max(0, o), 1), l = Math.min(Math.max(0, l), 1), f = Math.min(Math.max(0, f), 1), [o * 255, l * 255, f * 255];
      };
      K.xyz.lab = function(s) {
        let t = s[0], r = s[1], u = s[2];
        t /= 95.047, r /= 100, u /= 108.883, t = t > 8856e-6 ? t ** (1 / 3) : 7.787 * t + 16 / 116, r = r > 8856e-6 ? r ** (1 / 3) : 7.787 * r + 16 / 116, u = u > 8856e-6 ? u ** (1 / 3) : 7.787 * u + 16 / 116;
        let o = 116 * r - 16, l = 500 * (t - r), f = 200 * (r - u);
        return [o, l, f];
      };
      K.lab.xyz = function(s) {
        let t = s[0], r = s[1], u = s[2], o, l, f;
        l = (t + 16) / 116, o = r / 500 + l, f = l - u / 200;
        let g = l ** 3, v = o ** 3, _ = f ** 3;
        return l = g > 8856e-6 ? g : (l - 16 / 116) / 7.787, o = v > 8856e-6 ? v : (o - 16 / 116) / 7.787, f = _ > 8856e-6 ? _ : (f - 16 / 116) / 7.787, o *= 95.047, l *= 100, f *= 108.883, [o, l, f];
      };
      K.lab.lch = function(s) {
        let t = s[0], r = s[1], u = s[2], o;
        o = Math.atan2(u, r) * 360 / 2 / Math.PI, o < 0 && (o += 360);
        let f = Math.sqrt(r * r + u * u);
        return [t, f, o];
      };
      K.lch.lab = function(s) {
        let t = s[0], r = s[1], o = s[2] / 360 * 2 * Math.PI, l = r * Math.cos(o), f = r * Math.sin(o);
        return [t, l, f];
      };
      K.rgb.ansi16 = function(s, t = null) {
        let [r, u, o] = s, l = t === null ? K.rgb.hsv(s)[2] : t;
        if (l = Math.round(l / 50), l === 0)
          return 30;
        let f = 30 + (Math.round(o / 255) << 2 | Math.round(u / 255) << 1 | Math.round(r / 255));
        return l === 2 && (f += 60), f;
      };
      K.hsv.ansi16 = function(s) {
        return K.rgb.ansi16(K.hsv.rgb(s), s[2]);
      };
      K.rgb.ansi256 = function(s) {
        let t = s[0], r = s[1], u = s[2];
        return t === r && r === u ? t < 8 ? 16 : t > 248 ? 231 : Math.round((t - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(t / 255 * 5) + 6 * Math.round(r / 255 * 5) + Math.round(u / 255 * 5);
      };
      K.ansi16.rgb = function(s) {
        let t = s % 10;
        if (t === 0 || t === 7)
          return s > 50 && (t += 3.5), t = t / 10.5 * 255, [t, t, t];
        let r = (~~(s > 50) + 1) * 0.5, u = (t & 1) * r * 255, o = (t >> 1 & 1) * r * 255, l = (t >> 2 & 1) * r * 255;
        return [u, o, l];
      };
      K.ansi256.rgb = function(s) {
        if (s >= 232) {
          let l = (s - 232) * 10 + 8;
          return [l, l, l];
        }
        s -= 16;
        let t, r = Math.floor(s / 36) / 5 * 255, u = Math.floor((t = s % 36) / 6) / 5 * 255, o = t % 6 / 5 * 255;
        return [r, u, o];
      };
      K.rgb.hex = function(s) {
        let r = (((Math.round(s[0]) & 255) << 16) + ((Math.round(s[1]) & 255) << 8) + (Math.round(s[2]) & 255)).toString(16).toUpperCase();
        return "000000".substring(r.length) + r;
      };
      K.hex.rgb = function(s) {
        let t = s.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
        if (!t)
          return [0, 0, 0];
        let r = t[0];
        t[0].length === 3 && (r = r.split("").map((g) => g + g).join(""));
        let u = parseInt(r, 16), o = u >> 16 & 255, l = u >> 8 & 255, f = u & 255;
        return [o, l, f];
      };
      K.rgb.hcg = function(s) {
        let t = s[0] / 255, r = s[1] / 255, u = s[2] / 255, o = Math.max(Math.max(t, r), u), l = Math.min(Math.min(t, r), u), f = o - l, g, v;
        return f < 1 ? g = l / (1 - f) : g = 0, f <= 0 ? v = 0 : o === t ? v = (r - u) / f % 6 : o === r ? v = 2 + (u - t) / f : v = 4 + (t - r) / f, v /= 6, v %= 1, [v * 360, f * 100, g * 100];
      };
      K.hsl.hcg = function(s) {
        let t = s[1] / 100, r = s[2] / 100, u = r < 0.5 ? 2 * t * r : 2 * t * (1 - r), o = 0;
        return u < 1 && (o = (r - 0.5 * u) / (1 - u)), [s[0], u * 100, o * 100];
      };
      K.hsv.hcg = function(s) {
        let t = s[1] / 100, r = s[2] / 100, u = t * r, o = 0;
        return u < 1 && (o = (r - u) / (1 - u)), [s[0], u * 100, o * 100];
      };
      K.hcg.rgb = function(s) {
        let t = s[0] / 360, r = s[1] / 100, u = s[2] / 100;
        if (r === 0)
          return [u * 255, u * 255, u * 255];
        let o = [0, 0, 0], l = t % 1 * 6, f = l % 1, g = 1 - f, v = 0;
        switch (Math.floor(l)) {
          case 0:
            o[0] = 1, o[1] = f, o[2] = 0;
            break;
          case 1:
            o[0] = g, o[1] = 1, o[2] = 0;
            break;
          case 2:
            o[0] = 0, o[1] = 1, o[2] = f;
            break;
          case 3:
            o[0] = 0, o[1] = g, o[2] = 1;
            break;
          case 4:
            o[0] = f, o[1] = 0, o[2] = 1;
            break;
          default:
            o[0] = 1, o[1] = 0, o[2] = g;
        }
        return v = (1 - r) * u, [(r * o[0] + v) * 255, (r * o[1] + v) * 255, (r * o[2] + v) * 255];
      };
      K.hcg.hsv = function(s) {
        let t = s[1] / 100, r = s[2] / 100, u = t + r * (1 - t), o = 0;
        return u > 0 && (o = t / u), [s[0], o * 100, u * 100];
      };
      K.hcg.hsl = function(s) {
        let t = s[1] / 100, u = s[2] / 100 * (1 - t) + 0.5 * t, o = 0;
        return u > 0 && u < 0.5 ? o = t / (2 * u) : u >= 0.5 && u < 1 && (o = t / (2 * (1 - u))), [s[0], o * 100, u * 100];
      };
      K.hcg.hwb = function(s) {
        let t = s[1] / 100, r = s[2] / 100, u = t + r * (1 - t);
        return [s[0], (u - t) * 100, (1 - u) * 100];
      };
      K.hwb.hcg = function(s) {
        let t = s[1] / 100, r = s[2] / 100, u = 1 - r, o = u - t, l = 0;
        return o < 1 && (l = (u - o) / (1 - o)), [s[0], o * 100, l * 100];
      };
      K.apple.rgb = function(s) {
        return [s[0] / 65535 * 255, s[1] / 65535 * 255, s[2] / 65535 * 255];
      };
      K.rgb.apple = function(s) {
        return [s[0] / 255 * 65535, s[1] / 255 * 65535, s[2] / 255 * 65535];
      };
      K.gray.rgb = function(s) {
        return [s[0] / 100 * 255, s[0] / 100 * 255, s[0] / 100 * 255];
      };
      K.gray.hsl = function(s) {
        return [0, 0, s[0]];
      };
      K.gray.hsv = K.gray.hsl;
      K.gray.hwb = function(s) {
        return [0, 100, s[0]];
      };
      K.gray.cmyk = function(s) {
        return [0, 0, 0, s[0]];
      };
      K.gray.lab = function(s) {
        return [s[0], 0, 0];
      };
      K.gray.hex = function(s) {
        let t = Math.round(s[0] / 100 * 255) & 255, u = ((t << 16) + (t << 8) + t).toString(16).toUpperCase();
        return "000000".substring(u.length) + u;
      };
      K.rgb.gray = function(s) {
        return [(s[0] + s[1] + s[2]) / 3 / 255 * 100];
      };
    });
    var Uc = Le((g2, $c) => {
      var zi = Ju();
      function ky() {
        let s = {}, t = Object.keys(zi);
        for (let r = t.length, u = 0; u < r; u++)
          s[t[u]] = { distance: -1, parent: null };
        return s;
      }
      function By(s) {
        let t = ky(), r = [s];
        for (t[s].distance = 0; r.length; ) {
          let u = r.pop(), o = Object.keys(zi[u]);
          for (let l = o.length, f = 0; f < l; f++) {
            let g = o[f], v = t[g];
            v.distance === -1 && (v.distance = t[u].distance + 1, v.parent = u, r.unshift(g));
          }
        }
        return t;
      }
      function Py(s, t) {
        return function(r) {
          return t(s(r));
        };
      }
      function Iy(s, t) {
        let r = [t[s].parent, s], u = zi[t[s].parent][s], o = t[s].parent;
        for (; t[o].parent; )
          r.unshift(t[o].parent), u = Py(zi[t[o].parent][o], u), o = t[o].parent;
        return u.conversion = r, u;
      }
      $c.exports = function(s) {
        let t = By(s), r = {}, u = Object.keys(t);
        for (let o = u.length, l = 0; l < o; l++) {
          let f = u[l];
          t[f].parent !== null && (r[f] = Iy(f, t));
        }
        return r;
      };
    });
    var zc = Le((p2, Wc) => {
      var Xu = Ju(), My = Uc(), ur = {}, Ry = Object.keys(Xu);
      function Ly(s) {
        let t = function(...r) {
          let u = r[0];
          return u == null ? u : (u.length > 1 && (r = u), s(r));
        };
        return "conversion" in s && (t.conversion = s.conversion), t;
      }
      function Ty(s) {
        let t = function(...r) {
          let u = r[0];
          if (u == null)
            return u;
          u.length > 1 && (r = u);
          let o = s(r);
          if (typeof o == "object")
            for (let l = o.length, f = 0; f < l; f++)
              o[f] = Math.round(o[f]);
          return o;
        };
        return "conversion" in s && (t.conversion = s.conversion), t;
      }
      Ry.forEach((s) => {
        ur[s] = {}, Object.defineProperty(ur[s], "channels", { value: Xu[s].channels }), Object.defineProperty(ur[s], "labels", { value: Xu[s].labels });
        let t = My(s);
        Object.keys(t).forEach((u) => {
          let o = t[u];
          ur[s][u] = Ty(o), ur[s][u].raw = Ly(o);
        });
      });
      Wc.exports = ur;
    });
    var Zc = Le((D2, Yc) => {
      "use strict";
      var Hc = (s, t) => (...r) => `\x1B[${s(...r) + t}m`, Gc = (s, t) => (...r) => {
        let u = s(...r);
        return `\x1B[${38 + t};5;${u}m`;
      }, Kc = (s, t) => (...r) => {
        let u = s(...r);
        return `\x1B[${38 + t};2;${u[0]};${u[1]};${u[2]}m`;
      }, Hi = (s) => s, Vc = (s, t, r) => [s, t, r], or = (s, t, r) => {
        Object.defineProperty(s, t, { get: () => {
          let u = r();
          return Object.defineProperty(s, t, { value: u, enumerable: true, configurable: true }), u;
        }, enumerable: true, configurable: true });
      }, Qu, ar = (s, t, r, u) => {
        Qu === void 0 && (Qu = zc());
        let o = u ? 10 : 0, l = {};
        for (let [f, g] of Object.entries(Qu)) {
          let v = f === "ansi16" ? "ansi" : f;
          f === t ? l[v] = s(r, o) : typeof g == "object" && (l[v] = s(g[t], o));
        }
        return l;
      };
      function Ny() {
        let s = /* @__PURE__ */ new Map(), t = { modifier: { reset: [0, 0], bold: [1, 22], dim: [2, 22], italic: [3, 23], underline: [4, 24], inverse: [7, 27], hidden: [8, 28], strikethrough: [9, 29] }, color: { black: [30, 39], red: [31, 39], green: [32, 39], yellow: [33, 39], blue: [34, 39], magenta: [35, 39], cyan: [36, 39], white: [37, 39], blackBright: [90, 39], redBright: [91, 39], greenBright: [92, 39], yellowBright: [93, 39], blueBright: [94, 39], magentaBright: [95, 39], cyanBright: [96, 39], whiteBright: [97, 39] }, bgColor: { bgBlack: [40, 49], bgRed: [41, 49], bgGreen: [42, 49], bgYellow: [43, 49], bgBlue: [44, 49], bgMagenta: [45, 49], bgCyan: [46, 49], bgWhite: [47, 49], bgBlackBright: [100, 49], bgRedBright: [101, 49], bgGreenBright: [102, 49], bgYellowBright: [103, 49], bgBlueBright: [104, 49], bgMagentaBright: [105, 49], bgCyanBright: [106, 49], bgWhiteBright: [107, 49] } };
        t.color.gray = t.color.blackBright, t.bgColor.bgGray = t.bgColor.bgBlackBright, t.color.grey = t.color.blackBright, t.bgColor.bgGrey = t.bgColor.bgBlackBright;
        for (let [r, u] of Object.entries(t)) {
          for (let [o, l] of Object.entries(u))
            t[o] = { open: `\x1B[${l[0]}m`, close: `\x1B[${l[1]}m` }, u[o] = t[o], s.set(l[0], l[1]);
          Object.defineProperty(t, r, { value: u, enumerable: false });
        }
        return Object.defineProperty(t, "codes", { value: s, enumerable: false }), t.color.close = "\x1B[39m", t.bgColor.close = "\x1B[49m", or(t.color, "ansi", () => ar(Hc, "ansi16", Hi, false)), or(t.color, "ansi256", () => ar(Gc, "ansi256", Hi, false)), or(t.color, "ansi16m", () => ar(Kc, "rgb", Vc, false)), or(t.bgColor, "ansi", () => ar(Hc, "ansi16", Hi, true)), or(t.bgColor, "ansi256", () => ar(Gc, "ansi256", Hi, true)), or(t.bgColor, "ansi16m", () => ar(Kc, "rgb", Vc, true)), t;
      }
      Object.defineProperty(Yc, "exports", { enumerable: true, get: Ny });
    });
    var tf = Le((m2, nf) => {
      "use strict";
      var Nr = Wi(), qy = Ui(), jy = Zc(), Gi = /* @__PURE__ */ new Set(["\x1B", "\x9B"]), $y = 39, no = "\x07", Qc = "[", Uy = "]", ef = "m", to = `${Uy}8;;`, Jc = (s) => `${Gi.values().next().value}${Qc}${s}${ef}`, Xc = (s) => `${Gi.values().next().value}${to}${s}${no}`, Wy = (s) => s.split(" ").map((t) => Nr(t)), eo = (s, t, r) => {
        let u = [...t], o = false, l = false, f = Nr(qy(s[s.length - 1]));
        for (let [g, v] of u.entries()) {
          let _ = Nr(v);
          if (f + _ <= r ? s[s.length - 1] += v : (s.push(v), f = 0), Gi.has(v) && (o = true, l = u.slice(g + 1).join("").startsWith(to)), o) {
            l ? v === no && (o = false, l = false) : v === ef && (o = false);
            continue;
          }
          f += _, f === r && g < u.length - 1 && (s.push(""), f = 0);
        }
        !f && s[s.length - 1].length > 0 && s.length > 1 && (s[s.length - 2] += s.pop());
      }, zy = (s) => {
        let t = s.split(" "), r = t.length;
        for (; r > 0 && !(Nr(t[r - 1]) > 0); )
          r--;
        return r === t.length ? s : t.slice(0, r).join(" ") + t.slice(r).join("");
      }, Hy = (s, t, r = {}) => {
        if (r.trim !== false && s.trim() === "")
          return "";
        let u = "", o, l, f = Wy(s), g = [""];
        for (let [_, O] of s.split(" ").entries()) {
          r.trim !== false && (g[g.length - 1] = g[g.length - 1].trimStart());
          let S = Nr(g[g.length - 1]);
          if (_ !== 0 && (S >= t && (r.wordWrap === false || r.trim === false) && (g.push(""), S = 0), (S > 0 || r.trim === false) && (g[g.length - 1] += " ", S++)), r.hard && f[_] > t) {
            let q = t - S, le = 1 + Math.floor((f[_] - q - 1) / t);
            Math.floor((f[_] - 1) / t) < le && g.push(""), eo(g, O, t);
            continue;
          }
          if (S + f[_] > t && S > 0 && f[_] > 0) {
            if (r.wordWrap === false && S < t) {
              eo(g, O, t);
              continue;
            }
            g.push("");
          }
          if (S + f[_] > t && r.wordWrap === false) {
            eo(g, O, t);
            continue;
          }
          g[g.length - 1] += O;
        }
        r.trim !== false && (g = g.map(zy));
        let v = [...g.join(`
`)];
        for (let [_, O] of v.entries()) {
          if (u += O, Gi.has(O)) {
            let { groups: q } = new RegExp(`(?:\\${Qc}(?<code>\\d+)m|\\${to}(?<uri>.*)${no})`).exec(v.slice(_).join("")) || { groups: {} };
            if (q.code !== void 0) {
              let le = Number.parseFloat(q.code);
              o = le === $y ? void 0 : le;
            } else
              q.uri !== void 0 && (l = q.uri.length === 0 ? void 0 : q.uri);
          }
          let S = jy.codes.get(Number(o));
          v[_ + 1] === `
` ? (l && (u += Xc("")), o && S && (u += Jc(S))) : O === `
` && (o && S && (u += Jc(o)), l && (u += Xc(l)));
        }
        return u;
      };
      nf.exports = (s, t, r) => String(s).normalize().replace(/\r\n/g, `
`).split(`
`).map((u) => Hy(u, t, r)).join(`
`);
    });
    var of = Le((y2, uf) => {
      "use strict";
      var Gy = { right: Jy, center: Xy }, Ky = 0, Ki = 1, Vy = 2, Vi = 3, sf = class {
        constructor(t) {
          var r;
          this.width = t.width, this.wrap = (r = t.wrap) !== null && r !== void 0 ? r : true, this.rows = [];
        }
        span(...t) {
          let r = this.div(...t);
          r.span = true;
        }
        resetOutput() {
          this.rows = [];
        }
        div(...t) {
          if (t.length === 0 && this.div(""), this.wrap && this.shouldApplyLayoutDSL(...t) && typeof t[0] == "string")
            return this.applyLayoutDSL(t[0]);
          let r = t.map((u) => typeof u == "string" ? this.colFromString(u) : u);
          return this.rows.push(r), r;
        }
        shouldApplyLayoutDSL(...t) {
          return t.length === 1 && typeof t[0] == "string" && /[\t\n]/.test(t[0]);
        }
        applyLayoutDSL(t) {
          let r = t.split(`
`).map((o) => o.split("	")), u = 0;
          return r.forEach((o) => {
            o.length > 1 && vn.stringWidth(o[0]) > u && (u = Math.min(Math.floor(this.width * 0.5), vn.stringWidth(o[0])));
          }), r.forEach((o) => {
            this.div(...o.map((l, f) => ({ text: l.trim(), padding: this.measurePadding(l), width: f === 0 && o.length > 1 ? u : void 0 })));
          }), this.rows[this.rows.length - 1];
        }
        colFromString(t) {
          return { text: t, padding: this.measurePadding(t) };
        }
        measurePadding(t) {
          let r = vn.stripAnsi(t);
          return [0, r.match(/\s*$/)[0].length, 0, r.match(/^\s*/)[0].length];
        }
        toString() {
          let t = [];
          return this.rows.forEach((r) => {
            this.rowToString(r, t);
          }), t.filter((r) => !r.hidden).map((r) => r.text).join(`
`);
        }
        rowToString(t, r) {
          return this.rasterize(t).forEach((u, o) => {
            let l = "";
            u.forEach((f, g) => {
              let { width: v } = t[g], _ = this.negatePadding(t[g]), O = f;
              _ > vn.stringWidth(f) && (O += " ".repeat(_ - vn.stringWidth(f))), t[g].align && t[g].align !== "left" && this.wrap && (O = Gy[t[g].align](O, _), vn.stringWidth(O) < _ && (O += " ".repeat((v || 0) - vn.stringWidth(O) - 1)));
              let S = t[g].padding || [0, 0, 0, 0];
              S[Vi] && (l += " ".repeat(S[Vi])), l += rf(t[g], O, "| "), l += O, l += rf(t[g], O, " |"), S[Ki] && (l += " ".repeat(S[Ki])), o === 0 && r.length > 0 && (l = this.renderInline(l, r[r.length - 1]));
            }), r.push({ text: l.replace(/ +$/, ""), span: t.span });
          }), r;
        }
        renderInline(t, r) {
          let u = t.match(/^ */), o = u ? u[0].length : 0, l = r.text, f = vn.stringWidth(l.trimRight());
          return r.span ? this.wrap ? o < f ? t : (r.hidden = true, l.trimRight() + " ".repeat(o - f) + t.trimLeft()) : (r.hidden = true, l + t) : t;
        }
        rasterize(t) {
          let r = [], u = this.columnWidths(t), o;
          return t.forEach((l, f) => {
            l.width = u[f], this.wrap ? o = vn.wrap(l.text, this.negatePadding(l), { hard: true }).split(`
`) : o = l.text.split(`
`), l.border && (o.unshift("." + "-".repeat(this.negatePadding(l) + 2) + "."), o.push("'" + "-".repeat(this.negatePadding(l) + 2) + "'")), l.padding && (o.unshift(...new Array(l.padding[Ky] || 0).fill("")), o.push(...new Array(l.padding[Vy] || 0).fill(""))), o.forEach((g, v) => {
              r[v] || r.push([]);
              let _ = r[v];
              for (let O = 0; O < f; O++)
                _[O] === void 0 && _.push("");
              _.push(g);
            });
          }), r;
        }
        negatePadding(t) {
          let r = t.width || 0;
          return t.padding && (r -= (t.padding[Vi] || 0) + (t.padding[Ki] || 0)), t.border && (r -= 4), r;
        }
        columnWidths(t) {
          if (!this.wrap)
            return t.map((f) => f.width || vn.stringWidth(f.text));
          let r = t.length, u = this.width, o = t.map((f) => {
            if (f.width)
              return r--, u -= f.width, f.width;
          }), l = r ? Math.floor(u / r) : 0;
          return o.map((f, g) => f === void 0 ? Math.max(l, Yy(t[g])) : f);
        }
      };
      function rf(s, t, r) {
        return s.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? r : "  " : "";
      }
      function Yy(s) {
        let t = s.padding || [], r = 1 + (t[Vi] || 0) + (t[Ki] || 0);
        return s.border ? r + 4 : r;
      }
      function Zy() {
        return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
      }
      function Jy(s, t) {
        s = s.trim();
        let r = vn.stringWidth(s);
        return r < t ? " ".repeat(t - r) + s : s;
      }
      function Xy(s, t) {
        s = s.trim();
        let r = vn.stringWidth(s);
        return r >= t ? s : " ".repeat(t - r >> 1) + s;
      }
      var vn;
      function Qy(s, t) {
        return vn = t, new sf({ width: (s == null ? void 0 : s.width) || Zy(), wrap: s == null ? void 0 : s.wrap });
      }
      var eb = Wi(), nb = Ui(), tb = tf();
      function rb(s) {
        return Qy(s, { stringWidth: eb, stripAnsi: nb, wrap: tb });
      }
      uf.exports = rb;
    });
    var ff = Le((b2, cf) => {
      var { dirname: af, resolve: lf } = require("path"), { readdirSync: ib, statSync: sb } = require("fs");
      cf.exports = function(s, t) {
        let r = lf(".", s), u;
        for (sb(r).isDirectory() || (r = af(r)); ; ) {
          if (u = t(r, ib(r)), u)
            return lf(r, u);
          if (r = af(u = r), u === r)
            break;
        }
      };
    });
    var df = Le((v2, hf) => {
      "use strict";
      hf.exports = function(t) {
        if (t === void 0 && (t = 2), t >= Error.stackTraceLimit)
          throw new TypeError("getCallerFile(position) requires position be less then Error.stackTraceLimit but position was: `" + t + "` and Error.stackTraceLimit was: `" + Error.stackTraceLimit + "`");
        var r = Error.prepareStackTrace;
        Error.prepareStackTrace = function(o, l) {
          return l;
        };
        var u = new Error().stack;
        if (Error.prepareStackTrace = r, u !== null && typeof u == "object")
          return u[t] ? u[t].getFileName() : void 0;
      };
    });
    var mf = Le((w2, io) => {
      "use strict";
      var gf = require("fs"), ub = require("path").join, ob = require("path").resolve, pf = require("path").dirname, ro = { extensions: ["js", "json", "coffee"], recurse: true, rename: function(s) {
        return s;
      }, visit: function(s) {
        return s;
      } };
      function ab(s, t, r) {
        return new RegExp("\\.(" + r.extensions.join("|") + ")$", "i").test(t) && !(r.include && r.include instanceof RegExp && !r.include.test(s)) && !(r.include && typeof r.include == "function" && !r.include(s, t)) && !(r.exclude && r.exclude instanceof RegExp && r.exclude.test(s)) && !(r.exclude && typeof r.exclude == "function" && r.exclude(s, t));
      }
      function Df(s, t, r) {
        var u = {};
        t && !r && typeof t != "string" && (r = t, t = null), r = r || {};
        for (var o in ro)
          typeof r[o] > "u" && (r[o] = ro[o]);
        return t = t ? ob(pf(s.filename), t) : pf(s.filename), gf.readdirSync(t).forEach(function(l) {
          var f = ub(t, l), g, v, _;
          gf.statSync(f).isDirectory() && r.recurse ? (g = Df(s, f, r), Object.keys(g).length && (u[r.rename(l, f, l)] = g)) : f !== s.filename && ab(f, l, r) && (v = l.substring(0, l.lastIndexOf(".")), _ = s.require(f), u[r.rename(v, f, l)] = r.visit(_, f, l) || _);
        }), u;
      }
      io.exports = Df;
      io.exports.defaults = ro;
    });
    var Xf = Le((C2, Jf) => {
      "use strict";
      var yf = require("assert"), Ke = class extends Error {
        constructor(t) {
          super(t || "yargs error"), this.name = "YError", Error.captureStackTrace(this, Ke);
        }
      }, qr, so = [];
      function is(s, t, r, u) {
        qr = u;
        let o = {};
        if (Object.prototype.hasOwnProperty.call(s, "extends")) {
          if (typeof s.extends != "string")
            return o;
          let l = /\.json|\..*rc$/.test(s.extends), f = null;
          if (l)
            f = function(g, v) {
              return qr.path.resolve(g, v);
            }(t, s.extends);
          else
            try {
              f = require.resolve(s.extends);
            } catch {
              return s;
            }
          (function(g) {
            if (so.indexOf(g) > -1)
              throw new Ke(`Circular extended configurations: '${g}'.`);
          })(f), so.push(f), o = l ? JSON.parse(qr.readFileSync(f, "utf8")) : require(s.extends), delete s.extends, o = is(o, qr.path.dirname(f), r, qr);
        }
        return so = [], r ? zf(o, s) : Object.assign({}, o, s);
      }
      function zf(s, t) {
        let r = {};
        function u(o) {
          return o && typeof o == "object" && !Array.isArray(o);
        }
        Object.assign(r, s);
        for (let o of Object.keys(t))
          u(t[o]) && u(r[o]) ? r[o] = zf(s[o], t[o]) : r[o] = t[o];
        return r;
      }
      function gr(s) {
        let t = s.replace(/\s{2,}/g, " ").split(/\s+(?![^[]*]|[^<]*>)/), r = /\.*[\][<>]/g, u = t.shift();
        if (!u)
          throw new Error(`No command found in: ${s}`);
        let o = { cmd: u.replace(r, ""), demanded: [], optional: [] };
        return t.forEach((l, f) => {
          let g = false;
          l = l.replace(/\s/g, ""), /\.+[\]>]/.test(l) && f === t.length - 1 && (g = true), /^\[/.test(l) ? o.optional.push({ cmd: l.replace(r, "").split("|"), variadic: g }) : o.demanded.push({ cmd: l.replace(r, "").split("|"), variadic: g });
        }), o;
      }
      var lb = ["first", "second", "third", "fourth", "fifth", "sixth"];
      function G(s, t, r) {
        try {
          let u = 0, [o, l, f] = typeof s == "object" ? [{ demanded: [], optional: [] }, s, t] : [gr(`cmd ${s}`), t, r], g = [].slice.call(l);
          for (; g.length && g[g.length - 1] === void 0; )
            g.pop();
          let v = f || g.length;
          if (v < o.demanded.length)
            throw new Ke(`Not enough arguments provided. Expected ${o.demanded.length} but received ${g.length}.`);
          let _ = o.demanded.length + o.optional.length;
          if (v > _)
            throw new Ke(`Too many arguments provided. Expected max ${_} but received ${v}.`);
          o.demanded.forEach((O) => {
            let S = bf(g.shift());
            O.cmd.filter((q) => q === S || q === "*").length === 0 && vf(S, O.cmd, u), u += 1;
          }), o.optional.forEach((O) => {
            if (g.length === 0)
              return;
            let S = bf(g.shift());
            O.cmd.filter((q) => q === S || q === "*").length === 0 && vf(S, O.cmd, u), u += 1;
          });
        } catch (u) {
          console.warn(u.stack);
        }
      }
      function bf(s) {
        return Array.isArray(s) ? "array" : s === null ? "null" : typeof s;
      }
      function vf(s, t, r) {
        throw new Ke(`Invalid ${lb[r] || "manyith"} argument. Expected ${t.join(" or ")} but received ${s}.`);
      }
      function We(s) {
        return !!s && !!s.then && typeof s.then == "function";
      }
      function zn(s, t, r, u) {
        r.assert.notStrictEqual(s, t, u);
      }
      function wf(s, t) {
        t.assert.strictEqual(typeof s, "string");
      }
      function rs(s) {
        return Object.keys(s);
      }
      function dr(s = {}, t = () => true) {
        let r = {};
        return rs(s).forEach((u) => {
          t(u, s[u]) && (r[u] = s[u]);
        }), r;
      }
      function Hf() {
        return process.versions.electron && !process.defaultApp ? 0 : 1;
      }
      function Gf() {
        return process.argv[Hf()];
      }
      var cb = Object.freeze({ __proto__: null, hideBin: function(s) {
        return s.slice(Hf() + 1);
      }, getProcessArgvBin: Gf });
      function p(s, t, r, u) {
        if (r === "a" && !u)
          throw new TypeError("Private accessor was defined without a getter");
        if (typeof t == "function" ? s !== t || !u : !t.has(s))
          throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return r === "m" ? u : r === "a" ? u.call(s) : u ? u.value : t.get(s);
      }
      function H(s, t, r, u, o) {
        if (u === "m")
          throw new TypeError("Private method is not writable");
        if (u === "a" && !o)
          throw new TypeError("Private accessor was defined without a setter");
        if (typeof t == "function" ? s !== t || !o : !t.has(s))
          throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return u === "a" ? o.call(s, r) : o ? o.value = r : t.set(s, r), r;
      }
      var Kf = class {
        constructor(t) {
          this.globalMiddleware = [], this.frozens = [], this.yargs = t;
        }
        addMiddleware(t, r, u = true, o = false) {
          if (G("<array|function> [boolean] [boolean] [boolean]", [t, r, u], arguments.length), Array.isArray(t)) {
            for (let l = 0; l < t.length; l++) {
              if (typeof t[l] != "function")
                throw Error("middleware must be a function");
              let f = t[l];
              f.applyBeforeValidation = r, f.global = u;
            }
            Array.prototype.push.apply(this.globalMiddleware, t);
          } else if (typeof t == "function") {
            let l = t;
            l.applyBeforeValidation = r, l.global = u, l.mutates = o, this.globalMiddleware.push(t);
          }
          return this.yargs;
        }
        addCoerceMiddleware(t, r) {
          let u = this.yargs.getAliases();
          return this.globalMiddleware = this.globalMiddleware.filter((o) => {
            let l = [...u[r] || [], r];
            return !o.option || !l.includes(o.option);
          }), t.option = r, this.addMiddleware(t, true, true, true);
        }
        getMiddleware() {
          return this.globalMiddleware;
        }
        freeze() {
          this.frozens.push([...this.globalMiddleware]);
        }
        unfreeze() {
          let t = this.frozens.pop();
          t !== void 0 && (this.globalMiddleware = t);
        }
        reset() {
          this.globalMiddleware = this.globalMiddleware.filter((t) => t.global);
        }
      };
      function Wr(s, t, r, u) {
        return r.reduce((o, l) => {
          if (l.applyBeforeValidation !== u)
            return o;
          if (l.mutates) {
            if (l.applied)
              return o;
            l.applied = true;
          }
          if (We(o))
            return o.then((f) => Promise.all([f, l(f, t)])).then(([f, g]) => Object.assign(f, g));
          {
            let f = l(o, t);
            return We(f) ? f.then((g) => Object.assign(o, g)) : Object.assign(o, f);
          }
        }, s);
      }
      function zr(s, t, r = (u) => {
        throw u;
      }) {
        try {
          let u = typeof s == "function" ? s() : s;
          return We(u) ? u.then((o) => t(o)) : t(u);
        } catch (u) {
          return r(u);
        }
      }
      var lr = /(^\*)|(^\$0)/, Vf = class {
        constructor(t, r, u, o) {
          this.requireCache = /* @__PURE__ */ new Set(), this.handlers = {}, this.aliasMap = {}, this.frozens = [], this.shim = o, this.usage = t, this.globalMiddleware = u, this.validation = r;
        }
        addDirectory(t, r, u, o) {
          typeof (o = o || {}).recurse != "boolean" && (o.recurse = false), Array.isArray(o.extensions) || (o.extensions = ["js"]);
          let l = typeof o.visit == "function" ? o.visit : (f) => f;
          o.visit = (f, g, v) => {
            let _ = l(f, g, v);
            if (_) {
              if (this.requireCache.has(g))
                return _;
              this.requireCache.add(g), this.addHandler(_);
            }
            return _;
          }, this.shim.requireDirectory({ require: r, filename: u }, t, o);
        }
        addHandler(t, r, u, o, l, f) {
          let g = [], v = function(_) {
            return _ ? _.map((O) => (O.applyBeforeValidation = false, O)) : [];
          }(l);
          if (o = o || (() => {
          }), Array.isArray(t))
            if (function(_) {
              return _.every((O) => typeof O == "string");
            }(t))
              [t, ...g] = t;
            else
              for (let _ of t)
                this.addHandler(_);
          else {
            if (function(_) {
              return typeof _ == "object" && !Array.isArray(_);
            }(t)) {
              let _ = Array.isArray(t.command) || typeof t.command == "string" ? t.command : this.moduleName(t);
              return t.aliases && (_ = [].concat(_).concat(t.aliases)), void this.addHandler(_, this.extractDesc(t), t.builder, t.handler, t.middlewares, t.deprecated);
            }
            if (Cf(u))
              return void this.addHandler([t].concat(g), r, u.builder, u.handler, u.middlewares, u.deprecated);
          }
          if (typeof t == "string") {
            let _ = gr(t);
            g = g.map((q) => gr(q).cmd);
            let O = false, S = [_.cmd].concat(g).filter((q) => !lr.test(q) || (O = true, false));
            S.length === 0 && O && S.push("$0"), O && (_.cmd = S[0], g = S.slice(1), t = t.replace(lr, _.cmd)), g.forEach((q) => {
              this.aliasMap[q] = _.cmd;
            }), r !== false && this.usage.command(t, r, O, g, f), this.handlers[_.cmd] = { original: t, description: r, handler: o, builder: u || {}, middlewares: v, deprecated: f, demanded: _.demanded, optional: _.optional }, O && (this.defaultCommand = this.handlers[_.cmd]);
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
        runCommand(t, r, u, o, l, f) {
          let g = this.handlers[t] || this.handlers[this.aliasMap[t]] || this.defaultCommand, v = r.getInternalMethods().getContext(), _ = v.commands.slice(), O = !t;
          t && (v.commands.push(t), v.fullCommands.push(g.original));
          let S = this.applyBuilderUpdateUsageAndParse(O, g, r, u.aliases, _, o, l, f);
          return We(S) ? S.then((q) => this.applyMiddlewareAndGetResult(O, g, q.innerArgv, v, l, q.aliases, r)) : this.applyMiddlewareAndGetResult(O, g, S.innerArgv, v, l, S.aliases, r);
        }
        applyBuilderUpdateUsageAndParse(t, r, u, o, l, f, g, v) {
          let _ = r.builder, O = u;
          if (wo(_)) {
            let S = _(u.getInternalMethods().reset(o), v);
            if (We(S))
              return S.then((q) => {
                var le;
                return O = (le = q) && typeof le.getInternalMethods == "function" ? q : u, this.parseAndUpdateUsage(t, r, O, l, f, g);
              });
          } else
            (function(S) {
              return typeof S == "object";
            })(_) && (O = u.getInternalMethods().reset(o), Object.keys(r.builder).forEach((S) => {
              O.option(S, _[S]);
            }));
          return this.parseAndUpdateUsage(t, r, O, l, f, g);
        }
        parseAndUpdateUsage(t, r, u, o, l, f) {
          t && u.getInternalMethods().getUsageInstance().unfreeze(), this.shouldUpdateUsage(u) && u.getInternalMethods().getUsageInstance().usage(this.usageFromParentCommandsCommandHandler(o, r), r.description);
          let g = u.getInternalMethods().runYargsParserAndExecuteCommands(null, void 0, true, l, f);
          return We(g) ? g.then((v) => ({ aliases: u.parsed.aliases, innerArgv: v })) : { aliases: u.parsed.aliases, innerArgv: g };
        }
        shouldUpdateUsage(t) {
          return !t.getInternalMethods().getUsageInstance().getUsageDisabled() && t.getInternalMethods().getUsageInstance().getUsage().length === 0;
        }
        usageFromParentCommandsCommandHandler(t, r) {
          let u = lr.test(r.original) ? r.original.replace(lr, "").trim() : r.original, o = t.filter((l) => !lr.test(l));
          return o.push(u), `$0 ${o.join(" ")}`;
        }
        applyMiddlewareAndGetResult(t, r, u, o, l, f, g) {
          let v = {};
          if (l)
            return u;
          g.getInternalMethods().getHasOutput() || (v = this.populatePositionals(r, u, o, g));
          let _ = this.globalMiddleware.getMiddleware().slice(0).concat(r.middlewares);
          if (u = Wr(u, g, _, true), !g.getInternalMethods().getHasOutput()) {
            let O = g.getInternalMethods().runValidation(f, v, g.parsed.error, t);
            u = zr(u, (S) => (O(S), S));
          }
          if (r.handler && !g.getInternalMethods().getHasOutput()) {
            g.getInternalMethods().setHasOutput();
            let O = !!g.getOptions().configuration["populate--"];
            g.getInternalMethods().postProcess(u, O, false, false), u = zr(u = Wr(u, g, _, false), (S) => {
              let q = r.handler(S);
              return We(q) ? q.then(() => S) : S;
            }), t || g.getInternalMethods().getUsageInstance().cacheHelpMessage(), We(u) && !g.getInternalMethods().hasParseCallback() && u.catch((S) => {
              try {
                g.getInternalMethods().getUsageInstance().fail(null, S);
              } catch {
              }
            });
          }
          return t || (o.commands.pop(), o.fullCommands.pop()), u;
        }
        populatePositionals(t, r, u, o) {
          r._ = r._.slice(u.commands.length);
          let l = t.demanded.slice(0), f = t.optional.slice(0), g = {};
          for (this.validation.positionalCount(l.length, r._.length); l.length; ) {
            let v = l.shift();
            this.populatePositional(v, r, g);
          }
          for (; f.length; ) {
            let v = f.shift();
            this.populatePositional(v, r, g);
          }
          return r._ = u.commands.concat(r._.map((v) => "" + v)), this.postProcessPositionals(r, g, this.cmdToParseOptions(t.original), o), g;
        }
        populatePositional(t, r, u) {
          let o = t.cmd[0];
          t.variadic ? u[o] = r._.splice(0).map(String) : r._.length && (u[o] = [String(r._.shift())]);
        }
        cmdToParseOptions(t) {
          let r = { array: [], default: {}, alias: {}, demand: {} }, u = gr(t);
          return u.demanded.forEach((o) => {
            let [l, ...f] = o.cmd;
            o.variadic && (r.array.push(l), r.default[l] = []), r.alias[l] = f, r.demand[l] = true;
          }), u.optional.forEach((o) => {
            let [l, ...f] = o.cmd;
            o.variadic && (r.array.push(l), r.default[l] = []), r.alias[l] = f;
          }), r;
        }
        postProcessPositionals(t, r, u, o) {
          let l = Object.assign({}, o.getOptions());
          l.default = Object.assign(u.default, l.default);
          for (let _ of Object.keys(u.alias))
            l.alias[_] = (l.alias[_] || []).concat(u.alias[_]);
          l.array = l.array.concat(u.array), l.config = {};
          let f = [];
          if (Object.keys(r).forEach((_) => {
            r[_].map((O) => {
              l.configuration["unknown-options-as-args"] && (l.key[_] = true), f.push(`--${_}`), f.push(O);
            });
          }), !f.length)
            return;
          let g = Object.assign({}, l.configuration, { "populate--": false }), v = this.shim.Parser.detailed(f, Object.assign({}, l, { configuration: g }));
          if (v.error)
            o.getInternalMethods().getUsageInstance().fail(v.error.message, v.error);
          else {
            let _ = Object.keys(r);
            Object.keys(r).forEach((S) => {
              _.push(...v.aliases[S]);
            });
            let O = o.getOptions().default;
            Object.keys(v.argv).forEach((S) => {
              _.includes(S) && (r[S] || (r[S] = v.argv[S]), !Object.prototype.hasOwnProperty.call(O, S) && Object.prototype.hasOwnProperty.call(t, S) && Object.prototype.hasOwnProperty.call(v.argv, S) && (Array.isArray(t[S]) || Array.isArray(v.argv[S])) ? t[S] = [].concat(t[S], v.argv[S]) : t[S] = v.argv[S]);
            });
          }
        }
        runDefaultBuilderOn(t) {
          if (!this.defaultCommand)
            return;
          if (this.shouldUpdateUsage(t)) {
            let u = lr.test(this.defaultCommand.original) ? this.defaultCommand.original : this.defaultCommand.original.replace(/^[^[\]<>]*/, "$0 ");
            t.getInternalMethods().getUsageInstance().usage(u, this.defaultCommand.description);
          }
          let r = this.defaultCommand.builder;
          if (wo(r))
            return r(t, true);
          Cf(r) || Object.keys(r).forEach((u) => {
            t.option(u, r[u]);
          });
        }
        moduleName(t) {
          let r = function(u) {
            if (typeof require > "u")
              return null;
            for (let o, l = 0, f = Object.keys(require.cache); l < f.length; l++)
              if (o = require.cache[f[l]], o.exports === u)
                return o;
            return null;
          }(t);
          if (!r)
            throw new Error(`No command name given for module: ${this.shim.inspect(t)}`);
          return this.commandFromFilename(r.filename);
        }
        commandFromFilename(t) {
          return this.shim.path.basename(t, this.shim.path.extname(t));
        }
        extractDesc({ describe: t, description: r, desc: u }) {
          for (let o of [t, r, u]) {
            if (typeof o == "string" || o === false)
              return o;
            zn(o, true, this.shim);
          }
          return false;
        }
        freeze() {
          this.frozens.push({ handlers: this.handlers, aliasMap: this.aliasMap, defaultCommand: this.defaultCommand });
        }
        unfreeze() {
          let t = this.frozens.pop();
          zn(t, void 0, this.shim), { handlers: this.handlers, aliasMap: this.aliasMap, defaultCommand: this.defaultCommand } = t;
        }
        reset() {
          return this.handlers = {}, this.aliasMap = {}, this.defaultCommand = void 0, this.requireCache = /* @__PURE__ */ new Set(), this;
        }
      };
      function Cf(s) {
        return typeof s == "object" && !!s.builder && typeof s.handler == "function";
      }
      function wo(s) {
        return typeof s == "function";
      }
      function Ur(s) {
        typeof process < "u" && [process.stdout, process.stderr].forEach((t) => {
          let r = t;
          r._handle && r.isTTY && typeof r._handle.setBlocking == "function" && r._handle.setBlocking(s);
        });
      }
      function fb(s) {
        return typeof s == "boolean";
      }
      function hb(s, t) {
        let r = t.y18n.__, u = {}, o = [];
        u.failFn = function(T) {
          o.push(T);
        };
        let l = null, f = true;
        u.showHelpOnFail = function(T = true, ne) {
          let [Z, Ie] = typeof T == "string" ? [true, T] : [T, ne];
          return l = Ie, f = Z, u;
        };
        let g = false;
        u.fail = function(T, ne) {
          let Z = s.getInternalMethods().getLoggerInstance();
          if (!o.length) {
            if (s.getExitProcess() && Ur(true), g || (g = true, f && (s.showHelp("error"), Z.error()), (T || ne) && Z.error(T || ne), l && ((T || ne) && Z.error(""), Z.error(l))), ne = ne || new Ke(T), s.getExitProcess())
              return s.exit(1);
            if (s.getInternalMethods().hasParseCallback())
              return s.exit(1, ne);
            throw ne;
          }
          for (let Ie = o.length - 1; Ie >= 0; --Ie) {
            let xe = o[Ie];
            if (fb(xe)) {
              if (ne)
                throw ne;
              if (T)
                throw Error(T);
            } else
              xe(T, ne, u);
          }
        };
        let v = [], _ = false;
        u.usage = (T, ne) => T === null ? (_ = true, v = [], u) : (_ = false, v.push([T, ne || ""]), u), u.getUsage = () => v, u.getUsageDisabled = () => _, u.getPositionalGroupName = () => r("Positionals:");
        let O = [];
        u.example = (T, ne) => {
          O.push([T, ne || ""]);
        };
        let S = [];
        u.command = function(T, ne, Z, Ie, xe = false) {
          Z && (S = S.map((Ce) => (Ce[2] = false, Ce))), S.push([T, ne || "", Z, Ie, xe]);
        }, u.getCommands = () => S;
        let q = {};
        u.describe = function(T, ne) {
          Array.isArray(T) ? T.forEach((Z) => {
            u.describe(Z, ne);
          }) : typeof T == "object" ? Object.keys(T).forEach((Z) => {
            u.describe(Z, T[Z]);
          }) : q[T] = ne;
        }, u.getDescriptions = () => q;
        let le = [];
        u.epilog = (T) => {
          le.push(T);
        };
        let L2, A = false;
        function w() {
          return A || (L2 = function() {
            return t.process.stdColumns ? Math.min(80, t.process.stdColumns) : 80;
          }(), A = true), L2;
        }
        u.wrap = (T) => {
          A = true, L2 = T;
        };
        let Q = "__yargsString__:";
        function ee(T, ne, Z) {
          let Ie = 0;
          return Array.isArray(T) || (T = Object.values(T).map((xe) => [xe])), T.forEach((xe) => {
            Ie = Math.max(t.stringWidth(Z ? `${Z} ${Yi(xe[0])}` : Yi(xe[0])) + _f(xe[0]), Ie);
          }), ne && (Ie = Math.min(Ie, parseInt((0.5 * ne).toString(), 10))), Ie;
        }
        let z;
        function De(T) {
          return s.getOptions().hiddenOptions.indexOf(T) < 0 || s.parsed.argv[s.getOptions().showHiddenOpt];
        }
        function ce(T, ne) {
          let Z = `[${r("default:")} `;
          if (T === void 0 && !ne)
            return null;
          if (ne)
            Z += ne;
          else
            switch (typeof T) {
              case "string":
                Z += `"${T}"`;
                break;
              case "object":
                Z += JSON.stringify(T);
                break;
              default:
                Z += T;
            }
          return `${Z}]`;
        }
        u.deferY18nLookup = (T) => Q + T, u.help = function() {
          if (z)
            return z;
          (function() {
            let V = s.getDemandedOptions(), ue = s.getOptions();
            (Object.keys(ue.alias) || []).forEach((ge) => {
              ue.alias[ge].forEach((R) => {
                q[R] && u.describe(ge, q[R]), R in V && s.demandOption(ge, V[R]), ue.boolean.includes(R) && s.boolean(ge), ue.count.includes(R) && s.count(ge), ue.string.includes(R) && s.string(ge), ue.normalize.includes(R) && s.normalize(ge), ue.array.includes(R) && s.array(ge), ue.number.includes(R) && s.number(ge);
              });
            });
          })();
          let T = s.customScriptName ? s.$0 : t.path.basename(s.$0), ne = s.getDemandedOptions(), Z = s.getDemandedCommands(), Ie = s.getDeprecatedOptions(), xe = s.getGroups(), Ce = s.getOptions(), ze = [];
          ze = ze.concat(Object.keys(q)), ze = ze.concat(Object.keys(ne)), ze = ze.concat(Object.keys(Z)), ze = ze.concat(Object.keys(Ce.default)), ze = ze.filter(De), ze = Object.keys(ze.reduce((V, ue) => (ue !== "_" && (V[ue] = true), V), {}));
          let Xe = w(), ve = t.cliui({ width: Xe, wrap: !!Xe });
          if (!_) {
            if (v.length)
              v.forEach((V) => {
                ve.div({ text: `${V[0].replace(/\$0/g, T)}` }), V[1] && ve.div({ text: `${V[1]}`, padding: [1, 0, 0, 0] });
              }), ve.div();
            else if (S.length) {
              let V = null;
              V = Z._ ? `${T} <${r("command")}>
` : `${T} [${r("command")}]
`, ve.div(`${V}`);
            }
          }
          if (S.length > 1 || S.length === 1 && !S[0][2]) {
            ve.div(r("Commands:"));
            let V = s.getInternalMethods().getContext(), ue = V.commands.length ? `${V.commands.join(" ")} ` : "";
            s.getInternalMethods().getParserConfiguration()["sort-commands"] === true && (S = S.sort((R, ke) => R[0].localeCompare(ke[0])));
            let ge = T ? `${T} ` : "";
            S.forEach((R) => {
              let ke = `${ge}${ue}${R[0].replace(/^\$0 ?/, "")}`;
              ve.span({ text: ke, padding: [0, 2, 0, 2], width: ee(S, Xe, `${T}${ue}`) + 4 }, { text: R[1] });
              let _e = [];
              R[2] && _e.push(`[${r("default")}]`), R[3] && R[3].length && _e.push(`[${r("aliases:")} ${R[3].join(", ")}]`), R[4] && (typeof R[4] == "string" ? _e.push(`[${r("deprecated: %s", R[4])}]`) : _e.push(`[${r("deprecated")}]`)), _e.length ? ve.div({ text: _e.join(" "), padding: [0, 0, 0, 2], align: "right" }) : ve.div();
            }), ve.div();
          }
          let lt = (Object.keys(Ce.alias) || []).concat(Object.keys(s.parsed.newAliases) || []);
          ze = ze.filter((V) => !s.parsed.newAliases[V] && lt.every((ue) => (Ce.alias[ue] || []).indexOf(V) === -1));
          let Hn = r("Options:");
          xe[Hn] || (xe[Hn] = []), function(V, ue, ge, R) {
            let ke = [], _e = null;
            Object.keys(ge).forEach((Me) => {
              ke = ke.concat(ge[Me]);
            }), V.forEach((Me) => {
              _e = [Me].concat(ue[Me]), _e.some((Ln) => ke.indexOf(Ln) !== -1) || ge[R].push(Me);
            });
          }(ze, Ce.alias, xe, Hn);
          let Ve = (V) => /^--/.test(Yi(V)), ct = Object.keys(xe).filter((V) => xe[V].length > 0).map((V) => ({ groupName: V, normalizedKeys: xe[V].filter(De).map((ue) => {
            if (lt.includes(ue))
              return ue;
            for (let ge, R = 0; (ge = lt[R]) !== void 0; R++)
              if ((Ce.alias[ge] || []).includes(ue))
                return ge;
            return ue;
          }) })).filter(({ normalizedKeys: V }) => V.length > 0).map(({ groupName: V, normalizedKeys: ue }) => {
            let ge = ue.reduce((R, ke) => (R[ke] = [ke].concat(Ce.alias[ke] || []).map((_e) => V === u.getPositionalGroupName() ? _e : (/^[0-9]$/.test(_e) ? Ce.boolean.includes(ke) ? "-" : "--" : _e.length > 1 ? "--" : "-") + _e).sort((_e, Me) => Ve(_e) === Ve(Me) ? 0 : Ve(_e) ? 1 : -1).join(", "), R), {});
            return { groupName: V, normalizedKeys: ue, switches: ge };
          });
          if (ct.filter(({ groupName: V }) => V !== u.getPositionalGroupName()).some(({ normalizedKeys: V, switches: ue }) => !V.every((ge) => Ve(ue[ge]))) && ct.filter(({ groupName: V }) => V !== u.getPositionalGroupName()).forEach(({ normalizedKeys: V, switches: ue }) => {
            V.forEach((ge) => {
              var R, ke;
              Ve(ue[ge]) && (ue[ge] = (R = ue[ge], ke = 4, Co(R) ? { text: R.text, indentation: R.indentation + ke } : { text: R, indentation: ke }));
            });
          }), ct.forEach(({ groupName: V, normalizedKeys: ue, switches: ge }) => {
            ve.div(V), ue.forEach((R) => {
              let ke = ge[R], _e = q[R] || "", Me = null;
              _e.includes(Q) && (_e = r(_e.substring(Q.length))), Ce.boolean.includes(R) && (Me = `[${r("boolean")}]`), Ce.count.includes(R) && (Me = `[${r("count")}]`), Ce.string.includes(R) && (Me = `[${r("string")}]`), Ce.normalize.includes(R) && (Me = `[${r("string")}]`), Ce.array.includes(R) && (Me = `[${r("array")}]`), Ce.number.includes(R) && (Me = `[${r("number")}]`);
              let Ln = [R in Ie ? (Gn = Ie[R], typeof Gn == "string" ? `[${r("deprecated: %s", Gn)}]` : `[${r("deprecated")}]`) : null, Me, R in ne ? `[${r("required")}]` : null, Ce.choices && Ce.choices[R] ? `[${r("choices:")} ${u.stringifiedValues(Ce.choices[R])}]` : null, ce(Ce.default[R], Ce.defaultDescription[R])].filter(Boolean).join(" ");
              var Gn;
              ve.span({ text: Yi(ke), padding: [0, 2, 0, 2 + _f(ke)], width: ee(ge, Xe) + 4 }, _e), Ln ? ve.div({ text: Ln, padding: [0, 0, 0, 2], align: "right" }) : ve.div();
            }), ve.div();
          }), O.length && (ve.div(r("Examples:")), O.forEach((V) => {
            V[0] = V[0].replace(/\$0/g, T);
          }), O.forEach((V) => {
            V[1] === "" ? ve.div({ text: V[0], padding: [0, 2, 0, 2] }) : ve.div({ text: V[0], padding: [0, 2, 0, 2], width: ee(O, Xe) + 4 }, { text: V[1] });
          }), ve.div()), le.length > 0) {
            let V = le.map((ue) => ue.replace(/\$0/g, T)).join(`
`);
            ve.div(`${V}
`);
          }
          return ve.toString().replace(/\s*$/, "");
        }, u.cacheHelpMessage = function() {
          z = this.help();
        }, u.clearCachedHelpMessage = function() {
          z = void 0;
        }, u.hasCachedHelpMessage = function() {
          return !!z;
        }, u.showHelp = (T) => {
          let ne = s.getInternalMethods().getLoggerInstance();
          T || (T = "error"), (typeof T == "function" ? T : ne[T])(u.help());
        }, u.functionDescription = (T) => ["(", T.name ? t.Parser.decamelize(T.name, "-") : r("generated-value"), ")"].join(""), u.stringifiedValues = function(T, ne) {
          let Z = "", Ie = ne || ", ", xe = [].concat(T);
          return T && xe.length && xe.forEach((Ce) => {
            Z.length && (Z += Ie), Z += JSON.stringify(Ce);
          }), Z;
        };
        let nn = null;
        u.version = (T) => {
          nn = T;
        }, u.showVersion = (T) => {
          let ne = s.getInternalMethods().getLoggerInstance();
          T || (T = "error"), (typeof T == "function" ? T : ne[T])(nn);
        }, u.reset = function(T) {
          return l = null, g = false, v = [], _ = false, le = [], O = [], S = [], q = dr(q, (ne) => !T[ne]), u;
        };
        let qe = [];
        return u.freeze = function() {
          qe.push({ failMessage: l, failureOutput: g, usages: v, usageDisabled: _, epilogs: le, examples: O, commands: S, descriptions: q });
        }, u.unfreeze = function() {
          let T = qe.pop();
          T && ({ failMessage: l, failureOutput: g, usages: v, usageDisabled: _, epilogs: le, examples: O, commands: S, descriptions: q } = T);
        }, u;
      }
      function Co(s) {
        return typeof s == "object";
      }
      function _f(s) {
        return Co(s) ? s.indentation : 0;
      }
      function Yi(s) {
        return Co(s) ? s.text : s;
      }
      var Yf = class {
        constructor(t, r, u, o) {
          var l, f, g;
          this.yargs = t, this.usage = r, this.command = u, this.shim = o, this.completionKey = "get-yargs-completions", this.aliases = null, this.customCompletionFunction = null, this.zshShell = (g = ((l = this.shim.getEnv("SHELL")) === null || l === void 0 ? void 0 : l.includes("zsh")) || ((f = this.shim.getEnv("ZSH_NAME")) === null || f === void 0 ? void 0 : f.includes("zsh"))) !== null && g !== void 0 && g;
        }
        defaultCompletion(t, r, u, o) {
          let l = this.command.getCommandHandlers();
          for (let g = 0, v = t.length; g < v; ++g)
            if (l[t[g]] && l[t[g]].builder) {
              let _ = l[t[g]].builder;
              if (wo(_)) {
                let O = this.yargs.getInternalMethods().reset();
                return _(O, true), O.argv;
              }
            }
          let f = [];
          this.commandCompletions(f, t, u), this.optionCompletions(f, t, r, u), this.choicesCompletions(f, t, r, u), o(null, f);
        }
        commandCompletions(t, r, u) {
          let o = this.yargs.getInternalMethods().getContext().commands;
          u.match(/^-/) || o[o.length - 1] === u || this.previousArgHasChoices(r) || this.usage.getCommands().forEach((l) => {
            let f = gr(l[0]).cmd;
            if (r.indexOf(f) === -1)
              if (this.zshShell) {
                let g = l[1] || "";
                t.push(f.replace(/:/g, "\\:") + ":" + g);
              } else
                t.push(f);
          });
        }
        optionCompletions(t, r, u, o) {
          if ((o.match(/^-/) || o === "" && t.length === 0) && !this.previousArgHasChoices(r)) {
            let l = this.yargs.getOptions(), f = this.yargs.getGroups()[this.usage.getPositionalGroupName()] || [];
            Object.keys(l.key).forEach((g) => {
              let v = !!l.configuration["boolean-negation"] && l.boolean.includes(g);
              f.includes(g) || this.argsContainKey(r, u, g, v) || (this.completeOptionKey(g, t, o), v && l.default[g] && this.completeOptionKey(`no-${g}`, t, o));
            });
          }
        }
        choicesCompletions(t, r, u, o) {
          if (this.previousArgHasChoices(r)) {
            let l = this.getPreviousArgChoices(r);
            l && l.length > 0 && t.push(...l);
          }
        }
        getPreviousArgChoices(t) {
          if (t.length < 1)
            return;
          let r = t[t.length - 1], u = "";
          if (!r.startsWith("--") && t.length > 1 && (u = r, r = t[t.length - 2]), !r.startsWith("--"))
            return;
          let o = r.replace(/-/g, ""), l = this.yargs.getOptions();
          return Object.keys(l.key).some((f) => f === o) && Array.isArray(l.choices[o]) ? l.choices[o].filter((f) => !u || f.startsWith(u)) : void 0;
        }
        previousArgHasChoices(t) {
          let r = this.getPreviousArgChoices(t);
          return r !== void 0 && r.length > 0;
        }
        argsContainKey(t, r, u, o) {
          if (t.indexOf(`--${u}`) !== -1 || o && t.indexOf(`--no-${u}`) !== -1)
            return true;
          if (this.aliases) {
            for (let l of this.aliases[u])
              if (r[l] !== void 0)
                return true;
          }
          return false;
        }
        completeOptionKey(t, r, u) {
          let o = this.usage.getDescriptions(), l = !/^--/.test(u) && ((f) => /^[^0-9]$/.test(f))(t) ? "-" : "--";
          if (this.zshShell) {
            let f = o[t] || "";
            r.push(l + `${t.replace(/:/g, "\\:")}:${f.replace("__yargsString__:", "")}`);
          } else
            r.push(l + t);
        }
        customCompletion(t, r, u, o) {
          if (zn(this.customCompletionFunction, null, this.shim), this.customCompletionFunction.length < 3) {
            let l = this.customCompletionFunction(u, r);
            return We(l) ? l.then((f) => {
              this.shim.process.nextTick(() => {
                o(null, f);
              });
            }).catch((f) => {
              this.shim.process.nextTick(() => {
                o(f, void 0);
              });
            }) : o(null, l);
          }
          return function(l) {
            return l.length > 3;
          }(this.customCompletionFunction) ? this.customCompletionFunction(u, r, (l = o) => this.defaultCompletion(t, r, u, l), (l) => {
            o(null, l);
          }) : this.customCompletionFunction(u, r, (l) => {
            o(null, l);
          });
        }
        getCompletion(t, r) {
          let u = t.length ? t[t.length - 1] : "", o = this.yargs.parse(t, true), l = this.customCompletionFunction ? (f) => this.customCompletion(t, f, u, r) : (f) => this.defaultCompletion(t, f, u, r);
          return We(o) ? o.then(l) : l(o);
        }
        generateCompletionScript(t, r) {
          let u = this.zshShell ? `#compdef {{app_name}}
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
` : `###-begin-{{app_name}}-completions-###
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
`, o = this.shim.path.basename(t);
          return t.match(/\.js$/) && (t = `./${t}`), u = u.replace(/{{app_name}}/g, o), u = u.replace(/{{completion_command}}/g, r), u.replace(/{{app_path}}/g, t);
        }
        registerFunction(t) {
          this.customCompletionFunction = t;
        }
        setParsed(t) {
          this.aliases = t.aliases;
        }
      };
      function db(s, t) {
        if (s.length === 0)
          return t.length;
        if (t.length === 0)
          return s.length;
        let r = [], u, o;
        for (u = 0; u <= t.length; u++)
          r[u] = [u];
        for (o = 0; o <= s.length; o++)
          r[0][o] = o;
        for (u = 1; u <= t.length; u++)
          for (o = 1; o <= s.length; o++)
            t.charAt(u - 1) === s.charAt(o - 1) ? r[u][o] = r[u - 1][o - 1] : u > 1 && o > 1 && t.charAt(u - 2) === s.charAt(o - 1) && t.charAt(u - 1) === s.charAt(o - 2) ? r[u][o] = r[u - 2][o - 2] + 1 : r[u][o] = Math.min(r[u - 1][o - 1] + 1, Math.min(r[u][o - 1] + 1, r[u - 1][o] + 1));
        return r[t.length][s.length];
      }
      var Ff = ["$0", "--", "_"], Ue, Rt, jr, Pn, wn, Zi, _t, Lt, Ji, In, Xi, Mn, Zn, Cn, Rn, cr, Je, X, Qi, es, _n, Tt, fr, Nt, Ft, ns, se, qt, jt, $t, ae, Jn, Ne, Ef = Symbol("copyDoubleDash"), xf = Symbol("copyDoubleDash"), uo = Symbol("deleteFromParserHintObject"), Af = Symbol("emitWarning"), Of = Symbol("freeze"), Sf = Symbol("getDollarZero"), Ut = Symbol("getParserConfiguration"), oo = Symbol("guessLocale"), kf = Symbol("guessVersion"), Bf = Symbol("parsePositionalNumbers"), ao = Symbol("pkgUp"), Et = Symbol("populateParserHintArray"), hr = Symbol("populateParserHintSingleValueDictionary"), lo = Symbol("populateParserHintArrayDictionary"), co = Symbol("populateParserHintDictionary"), fo = Symbol("sanitizeKey"), ho = Symbol("setKey"), go = Symbol("unfreeze"), Pf = Symbol("validateAsync"), If = Symbol("getCommandInstance"), Mf = Symbol("getContext"), Rf = Symbol("getHasOutput"), Lf = Symbol("getLoggerInstance"), Tf = Symbol("getParseContext"), Nf = Symbol("getUsageInstance"), qf = Symbol("getValidationInstance"), ts = Symbol("hasParseCallback"), Wt = Symbol("postProcess"), jf = Symbol("rebase"), po = Symbol("reset"), $r = Symbol("runYargsParserAndExecuteCommands"), Do = Symbol("runValidation"), $f = Symbol("setHasOutput"), zt = Symbol("kTrackManuallySetKeys"), Zf = class {
        constructor(t = [], r, u, o) {
          this.customScriptName = false, this.parsed = false, Ue.set(this, void 0), Rt.set(this, void 0), jr.set(this, { commands: [], fullCommands: [] }), Pn.set(this, null), wn.set(this, null), Zi.set(this, "show-hidden"), _t.set(this, null), Lt.set(this, true), Ji.set(this, {}), In.set(this, true), Xi.set(this, []), Mn.set(this, void 0), Zn.set(this, {}), Cn.set(this, false), Rn.set(this, null), cr.set(this, void 0), Je.set(this, ""), X.set(this, void 0), Qi.set(this, void 0), es.set(this, {}), _n.set(this, null), Tt.set(this, null), fr.set(this, {}), Nt.set(this, {}), Ft.set(this, void 0), ns.set(this, false), se.set(this, void 0), qt.set(this, false), jt.set(this, false), $t.set(this, false), ae.set(this, void 0), Jn.set(this, null), Ne.set(this, void 0), H(this, se, o, "f"), H(this, Ft, t, "f"), H(this, Rt, r, "f"), H(this, Qi, u, "f"), H(this, Mn, new Kf(this), "f"), this.$0 = this[Sf](), this[po](), H(this, Ue, p(this, Ue, "f"), "f"), H(this, ae, p(this, ae, "f"), "f"), H(this, Ne, p(this, Ne, "f"), "f"), H(this, X, p(this, X, "f"), "f"), p(this, X, "f").showHiddenOpt = p(this, Zi, "f"), H(this, cr, this[xf](), "f");
        }
        addHelpOpt(t, r) {
          return G("[string|boolean] [string]", [t, r], arguments.length), p(this, Rn, "f") && (this[uo](p(this, Rn, "f")), H(this, Rn, null, "f")), t === false && r === void 0 || (H(this, Rn, typeof t == "string" ? t : "help", "f"), this.boolean(p(this, Rn, "f")), this.describe(p(this, Rn, "f"), r || p(this, ae, "f").deferY18nLookup("Show help"))), this;
        }
        help(t, r) {
          return this.addHelpOpt(t, r);
        }
        addShowHiddenOpt(t, r) {
          if (G("[string|boolean] [string]", [t, r], arguments.length), t === false && r === void 0)
            return this;
          let u = typeof t == "string" ? t : p(this, Zi, "f");
          return this.boolean(u), this.describe(u, r || p(this, ae, "f").deferY18nLookup("Show hidden options")), p(this, X, "f").showHiddenOpt = u, this;
        }
        showHidden(t, r) {
          return this.addShowHiddenOpt(t, r);
        }
        alias(t, r) {
          return G("<object|string|array> [string|array]", [t, r], arguments.length), this[lo](this.alias.bind(this), "alias", t, r), this;
        }
        array(t) {
          return G("<array|string>", [t], arguments.length), this[Et]("array", t), this[zt](t), this;
        }
        boolean(t) {
          return G("<array|string>", [t], arguments.length), this[Et]("boolean", t), this[zt](t), this;
        }
        check(t, r) {
          return G("<function> [boolean]", [t, r], arguments.length), this.middleware((u, o) => zr(() => t(u, o.getOptions()), (l) => (l ? (typeof l == "string" || l instanceof Error) && p(this, ae, "f").fail(l.toString(), l) : p(this, ae, "f").fail(p(this, se, "f").y18n.__("Argument check failed: %s", t.toString())), u), (l) => (p(this, ae, "f").fail(l.message ? l.message : l.toString(), l), u)), false, r), this;
        }
        choices(t, r) {
          return G("<object|string|array> [string|array]", [t, r], arguments.length), this[lo](this.choices.bind(this), "choices", t, r), this;
        }
        coerce(t, r) {
          if (G("<object|string|array> [function]", [t, r], arguments.length), Array.isArray(t)) {
            if (!r)
              throw new Ke("coerce callback must be provided");
            for (let u of t)
              this.coerce(u, r);
            return this;
          }
          if (typeof t == "object") {
            for (let u of Object.keys(t))
              this.coerce(u, t[u]);
            return this;
          }
          if (!r)
            throw new Ke("coerce callback must be provided");
          return p(this, X, "f").key[t] = true, p(this, Mn, "f").addCoerceMiddleware((u, o) => {
            let l;
            return zr(() => (l = o.getAliases(), r(u[t])), (f) => {
              if (u[t] = f, l[t])
                for (let g of l[t])
                  u[g] = f;
              return u;
            }, (f) => {
              throw new Ke(f.message);
            });
          }, t), this;
        }
        conflicts(t, r) {
          return G("<string|object> [string|array]", [t, r], arguments.length), p(this, Ne, "f").conflicts(t, r), this;
        }
        config(t = "config", r, u) {
          return G("[object|string] [string|function] [function]", [t, r, u], arguments.length), typeof t != "object" || Array.isArray(t) ? (typeof r == "function" && (u = r, r = void 0), this.describe(t, r || p(this, ae, "f").deferY18nLookup("Path to JSON config file")), (Array.isArray(t) ? t : [t]).forEach((o) => {
            p(this, X, "f").config[o] = u || true;
          }), this) : (t = is(t, p(this, Rt, "f"), this[Ut]()["deep-merge-config"] || false, p(this, se, "f")), p(this, X, "f").configObjects = (p(this, X, "f").configObjects || []).concat(t), this);
        }
        completion(t, r, u) {
          return G("[string] [string|boolean|function] [function]", [t, r, u], arguments.length), typeof r == "function" && (u = r, r = void 0), H(this, wn, t || p(this, wn, "f") || "completion", "f"), r || r === false || (r = "generate completion script"), this.command(p(this, wn, "f"), r), u && p(this, Pn, "f").registerFunction(u), this;
        }
        command(t, r, u, o, l, f) {
          return G("<string|array|object> [string|boolean] [function|object] [function] [array] [boolean|string]", [t, r, u, o, l, f], arguments.length), p(this, Ue, "f").addHandler(t, r, u, o, l, f), this;
        }
        commands(t, r, u, o, l, f) {
          return this.command(t, r, u, o, l, f);
        }
        commandDir(t, r) {
          G("<string> [object]", [t, r], arguments.length);
          let u = p(this, Qi, "f") || p(this, se, "f").require;
          return p(this, Ue, "f").addDirectory(t, u, p(this, se, "f").getCallerFile(), r), this;
        }
        count(t) {
          return G("<array|string>", [t], arguments.length), this[Et]("count", t), this[zt](t), this;
        }
        default(t, r, u) {
          return G("<object|string|array> [*] [string]", [t, r, u], arguments.length), u && (wf(t, p(this, se, "f")), p(this, X, "f").defaultDescription[t] = u), typeof r == "function" && (wf(t, p(this, se, "f")), p(this, X, "f").defaultDescription[t] || (p(this, X, "f").defaultDescription[t] = p(this, ae, "f").functionDescription(r)), r = r.call()), this[hr](this.default.bind(this), "default", t, r), this;
        }
        defaults(t, r, u) {
          return this.default(t, r, u);
        }
        demandCommand(t = 1, r, u, o) {
          return G("[number] [number|string] [string|null|undefined] [string|null|undefined]", [t, r, u, o], arguments.length), typeof r != "number" && (u = r, r = 1 / 0), this.global("_", false), p(this, X, "f").demandedCommands._ = { min: t, max: r, minMsg: u, maxMsg: o }, this;
        }
        demand(t, r, u) {
          return Array.isArray(r) ? (r.forEach((o) => {
            zn(u, true, p(this, se, "f")), this.demandOption(o, u);
          }), r = 1 / 0) : typeof r != "number" && (u = r, r = 1 / 0), typeof t == "number" ? (zn(u, true, p(this, se, "f")), this.demandCommand(t, r, u, u)) : Array.isArray(t) ? t.forEach((o) => {
            zn(u, true, p(this, se, "f")), this.demandOption(o, u);
          }) : typeof u == "string" ? this.demandOption(t, u) : u !== true && u !== void 0 || this.demandOption(t), this;
        }
        demandOption(t, r) {
          return G("<object|string|array> [string]", [t, r], arguments.length), this[hr](this.demandOption.bind(this), "demandedOptions", t, r), this;
        }
        deprecateOption(t, r) {
          return G("<string> [string|boolean]", [t, r], arguments.length), p(this, X, "f").deprecatedOptions[t] = r, this;
        }
        describe(t, r) {
          return G("<object|string|array> [string]", [t, r], arguments.length), this[ho](t, true), p(this, ae, "f").describe(t, r), this;
        }
        detectLocale(t) {
          return G("<boolean>", [t], arguments.length), H(this, Lt, t, "f"), this;
        }
        env(t) {
          return G("[string|boolean]", [t], arguments.length), t === false ? delete p(this, X, "f").envPrefix : p(this, X, "f").envPrefix = t || "", this;
        }
        epilogue(t) {
          return G("<string>", [t], arguments.length), p(this, ae, "f").epilog(t), this;
        }
        epilog(t) {
          return this.epilogue(t);
        }
        example(t, r) {
          return G("<string|array> [string]", [t, r], arguments.length), Array.isArray(t) ? t.forEach((u) => this.example(...u)) : p(this, ae, "f").example(t, r), this;
        }
        exit(t, r) {
          H(this, Cn, true, "f"), H(this, _t, r, "f"), p(this, In, "f") && p(this, se, "f").process.exit(t);
        }
        exitProcess(t = true) {
          return G("[boolean]", [t], arguments.length), H(this, In, t, "f"), this;
        }
        fail(t) {
          if (G("<function|boolean>", [t], arguments.length), typeof t == "boolean" && t !== false)
            throw new Ke("Invalid first argument. Expected function or boolean 'false'");
          return p(this, ae, "f").failFn(t), this;
        }
        getAliases() {
          return this.parsed ? this.parsed.aliases : {};
        }
        async getCompletion(t, r) {
          return G("<array> [function]", [t, r], arguments.length), r ? p(this, Pn, "f").getCompletion(t, r) : new Promise((u, o) => {
            p(this, Pn, "f").getCompletion(t, (l, f) => {
              l ? o(l) : u(f);
            });
          });
        }
        getDemandedOptions() {
          return G([], 0), p(this, X, "f").demandedOptions;
        }
        getDemandedCommands() {
          return G([], 0), p(this, X, "f").demandedCommands;
        }
        getDeprecatedOptions() {
          return G([], 0), p(this, X, "f").deprecatedOptions;
        }
        getDetectLocale() {
          return p(this, Lt, "f");
        }
        getExitProcess() {
          return p(this, In, "f");
        }
        getGroups() {
          return Object.assign({}, p(this, Zn, "f"), p(this, Nt, "f"));
        }
        getHelp() {
          if (H(this, Cn, true, "f"), !p(this, ae, "f").hasCachedHelpMessage()) {
            if (!this.parsed) {
              let r = this[$r](p(this, Ft, "f"), void 0, void 0, 0, true);
              if (We(r))
                return r.then(() => p(this, ae, "f").help());
            }
            let t = p(this, Ue, "f").runDefaultBuilderOn(this);
            if (We(t))
              return t.then(() => p(this, ae, "f").help());
          }
          return Promise.resolve(p(this, ae, "f").help());
        }
        getOptions() {
          return p(this, X, "f");
        }
        getStrict() {
          return p(this, qt, "f");
        }
        getStrictCommands() {
          return p(this, jt, "f");
        }
        getStrictOptions() {
          return p(this, $t, "f");
        }
        global(t, r) {
          return G("<string|array> [boolean]", [t, r], arguments.length), t = [].concat(t), r !== false ? p(this, X, "f").local = p(this, X, "f").local.filter((u) => t.indexOf(u) === -1) : t.forEach((u) => {
            p(this, X, "f").local.includes(u) || p(this, X, "f").local.push(u);
          }), this;
        }
        group(t, r) {
          G("<string|array> <string>", [t, r], arguments.length);
          let u = p(this, Nt, "f")[r] || p(this, Zn, "f")[r];
          p(this, Nt, "f")[r] && delete p(this, Nt, "f")[r];
          let o = {};
          return p(this, Zn, "f")[r] = (u || []).concat(t).filter((l) => !o[l] && (o[l] = true)), this;
        }
        hide(t) {
          return G("<string>", [t], arguments.length), p(this, X, "f").hiddenOptions.push(t), this;
        }
        implies(t, r) {
          return G("<string|object> [number|string|array]", [t, r], arguments.length), p(this, Ne, "f").implies(t, r), this;
        }
        locale(t) {
          return G("[string]", [t], arguments.length), t ? (H(this, Lt, false, "f"), p(this, se, "f").y18n.setLocale(t), this) : (this[oo](), p(this, se, "f").y18n.getLocale());
        }
        middleware(t, r, u) {
          return p(this, Mn, "f").addMiddleware(t, !!r, u);
        }
        nargs(t, r) {
          return G("<string|object|array> [number]", [t, r], arguments.length), this[hr](this.nargs.bind(this), "narg", t, r), this;
        }
        normalize(t) {
          return G("<array|string>", [t], arguments.length), this[Et]("normalize", t), this;
        }
        number(t) {
          return G("<array|string>", [t], arguments.length), this[Et]("number", t), this[zt](t), this;
        }
        option(t, r) {
          if (G("<string|object> [object]", [t, r], arguments.length), typeof t == "object")
            Object.keys(t).forEach((u) => {
              this.options(u, t[u]);
            });
          else {
            typeof r != "object" && (r = {}), this[zt](t), !p(this, Jn, "f") || t !== "version" && (r == null ? void 0 : r.alias) !== "version" || this[Af](['"version" is a reserved word.', "Please do one of the following:", '- Disable version with `yargs.version(false)` if using "version" as an option', "- Use the built-in `yargs.version` method instead (if applicable)", "- Use a different option key", "https://yargs.js.org/docs/#api-reference-version"].join(`
`), void 0, "versionWarning"), p(this, X, "f").key[t] = true, r.alias && this.alias(t, r.alias);
            let u = r.deprecate || r.deprecated;
            u && this.deprecateOption(t, u);
            let o = r.demand || r.required || r.require;
            o && this.demand(t, o), r.demandOption && this.demandOption(t, typeof r.demandOption == "string" ? r.demandOption : void 0), r.conflicts && this.conflicts(t, r.conflicts), "default" in r && this.default(t, r.default), r.implies !== void 0 && this.implies(t, r.implies), r.nargs !== void 0 && this.nargs(t, r.nargs), r.config && this.config(t, r.configParser), r.normalize && this.normalize(t), r.choices && this.choices(t, r.choices), r.coerce && this.coerce(t, r.coerce), r.group && this.group(t, r.group), (r.boolean || r.type === "boolean") && (this.boolean(t), r.alias && this.boolean(r.alias)), (r.array || r.type === "array") && (this.array(t), r.alias && this.array(r.alias)), (r.number || r.type === "number") && (this.number(t), r.alias && this.number(r.alias)), (r.string || r.type === "string") && (this.string(t), r.alias && this.string(r.alias)), (r.count || r.type === "count") && this.count(t), typeof r.global == "boolean" && this.global(t, r.global), r.defaultDescription && (p(this, X, "f").defaultDescription[t] = r.defaultDescription), r.skipValidation && this.skipValidation(t);
            let l = r.describe || r.description || r.desc;
            this.describe(t, l), r.hidden && this.hide(t), r.requiresArg && this.requiresArg(t);
          }
          return this;
        }
        options(t, r) {
          return this.option(t, r);
        }
        parse(t, r, u) {
          G("[string|array] [function|boolean|object] [function]", [t, r, u], arguments.length), this[Of](), t === void 0 && (t = p(this, Ft, "f")), typeof r == "object" && (H(this, Tt, r, "f"), r = u), typeof r == "function" && (H(this, _n, r, "f"), r = false), r || H(this, Ft, t, "f"), p(this, _n, "f") && H(this, In, false, "f");
          let o = this[$r](t, !!r), l = this.parsed;
          return p(this, Pn, "f").setParsed(this.parsed), We(o) ? o.then((f) => (p(this, _n, "f") && p(this, _n, "f").call(this, p(this, _t, "f"), f, p(this, Je, "f")), f)).catch((f) => {
            throw p(this, _n, "f") && p(this, _n, "f")(f, this.parsed.argv, p(this, Je, "f")), f;
          }).finally(() => {
            this[go](), this.parsed = l;
          }) : (p(this, _n, "f") && p(this, _n, "f").call(this, p(this, _t, "f"), o, p(this, Je, "f")), this[go](), this.parsed = l, o);
        }
        parseAsync(t, r, u) {
          let o = this.parse(t, r, u);
          return We(o) ? o : Promise.resolve(o);
        }
        parseSync(t, r, u) {
          let o = this.parse(t, r, u);
          if (We(o))
            throw new Ke(".parseSync() must not be used with asynchronous builders, handlers, or middleware");
          return o;
        }
        parserConfiguration(t) {
          return G("<object>", [t], arguments.length), H(this, es, t, "f"), this;
        }
        pkgConf(t, r) {
          G("<string> [string]", [t, r], arguments.length);
          let u = null, o = this[ao](r || p(this, Rt, "f"));
          return o[t] && typeof o[t] == "object" && (u = is(o[t], r || p(this, Rt, "f"), this[Ut]()["deep-merge-config"] || false, p(this, se, "f")), p(this, X, "f").configObjects = (p(this, X, "f").configObjects || []).concat(u)), this;
        }
        positional(t, r) {
          G("<string> <object>", [t, r], arguments.length);
          let u = ["default", "defaultDescription", "implies", "normalize", "choices", "conflicts", "coerce", "type", "describe", "desc", "description", "alias"];
          r = dr(r, (f, g) => !(f === "type" && !["string", "number", "boolean"].includes(g)) && u.includes(f));
          let o = p(this, jr, "f").fullCommands[p(this, jr, "f").fullCommands.length - 1], l = o ? p(this, Ue, "f").cmdToParseOptions(o) : { array: [], alias: {}, default: {}, demand: {} };
          return rs(l).forEach((f) => {
            let g = l[f];
            Array.isArray(g) ? g.indexOf(t) !== -1 && (r[f] = true) : g[t] && !(f in r) && (r[f] = g[t]);
          }), this.group(t, p(this, ae, "f").getPositionalGroupName()), this.option(t, r);
        }
        recommendCommands(t = true) {
          return G("[boolean]", [t], arguments.length), H(this, ns, t, "f"), this;
        }
        required(t, r, u) {
          return this.demand(t, r, u);
        }
        require(t, r, u) {
          return this.demand(t, r, u);
        }
        requiresArg(t) {
          return G("<array|string|object> [number]", [t], arguments.length), typeof t == "string" && p(this, X, "f").narg[t] || this[hr](this.requiresArg.bind(this), "narg", t, NaN), this;
        }
        showCompletionScript(t, r) {
          return G("[string] [string]", [t, r], arguments.length), t = t || this.$0, p(this, cr, "f").log(p(this, Pn, "f").generateCompletionScript(t, r || p(this, wn, "f") || "completion")), this;
        }
        showHelp(t) {
          if (G("[string|function]", [t], arguments.length), H(this, Cn, true, "f"), !p(this, ae, "f").hasCachedHelpMessage()) {
            if (!this.parsed) {
              let u = this[$r](p(this, Ft, "f"), void 0, void 0, 0, true);
              if (We(u))
                return u.then(() => {
                  p(this, ae, "f").showHelp(t);
                }), this;
            }
            let r = p(this, Ue, "f").runDefaultBuilderOn(this);
            if (We(r))
              return r.then(() => {
                p(this, ae, "f").showHelp(t);
              }), this;
          }
          return p(this, ae, "f").showHelp(t), this;
        }
        scriptName(t) {
          return this.customScriptName = true, this.$0 = t, this;
        }
        showHelpOnFail(t, r) {
          return G("[boolean|string] [string]", [t, r], arguments.length), p(this, ae, "f").showHelpOnFail(t, r), this;
        }
        showVersion(t) {
          return G("[string|function]", [t], arguments.length), p(this, ae, "f").showVersion(t), this;
        }
        skipValidation(t) {
          return G("<array|string>", [t], arguments.length), this[Et]("skipValidation", t), this;
        }
        strict(t) {
          return G("[boolean]", [t], arguments.length), H(this, qt, t !== false, "f"), this;
        }
        strictCommands(t) {
          return G("[boolean]", [t], arguments.length), H(this, jt, t !== false, "f"), this;
        }
        strictOptions(t) {
          return G("[boolean]", [t], arguments.length), H(this, $t, t !== false, "f"), this;
        }
        string(t) {
          return G("<array|string>", [t], arguments.length), this[Et]("string", t), this[zt](t), this;
        }
        terminalWidth() {
          return G([], 0), p(this, se, "f").process.stdColumns;
        }
        updateLocale(t) {
          return this.updateStrings(t);
        }
        updateStrings(t) {
          return G("<object>", [t], arguments.length), H(this, Lt, false, "f"), p(this, se, "f").y18n.updateLocale(t), this;
        }
        usage(t, r, u, o) {
          if (G("<string|null|undefined> [string|boolean] [function|object] [function]", [t, r, u, o], arguments.length), r !== void 0) {
            if (zn(t, null, p(this, se, "f")), (t || "").match(/^\$0( |$)/))
              return this.command(t, r, u, o);
            throw new Ke(".usage() description must start with $0 if being used as alias for .command()");
          }
          return p(this, ae, "f").usage(t), this;
        }
        version(t, r, u) {
          let o = "version";
          if (G("[boolean|string] [string] [string]", [t, r, u], arguments.length), p(this, Jn, "f") && (this[uo](p(this, Jn, "f")), p(this, ae, "f").version(void 0), H(this, Jn, null, "f")), arguments.length === 0)
            u = this[kf](), t = o;
          else if (arguments.length === 1) {
            if (t === false)
              return this;
            u = t, t = o;
          } else
            arguments.length === 2 && (u = r, r = void 0);
          return H(this, Jn, typeof t == "string" ? t : o, "f"), r = r || p(this, ae, "f").deferY18nLookup("Show version number"), p(this, ae, "f").version(u || void 0), this.boolean(p(this, Jn, "f")), this.describe(p(this, Jn, "f"), r), this;
        }
        wrap(t) {
          return G("<number|null|undefined>", [t], arguments.length), p(this, ae, "f").wrap(t), this;
        }
        [(Ue = /* @__PURE__ */ new WeakMap(), Rt = /* @__PURE__ */ new WeakMap(), jr = /* @__PURE__ */ new WeakMap(), Pn = /* @__PURE__ */ new WeakMap(), wn = /* @__PURE__ */ new WeakMap(), Zi = /* @__PURE__ */ new WeakMap(), _t = /* @__PURE__ */ new WeakMap(), Lt = /* @__PURE__ */ new WeakMap(), Ji = /* @__PURE__ */ new WeakMap(), In = /* @__PURE__ */ new WeakMap(), Xi = /* @__PURE__ */ new WeakMap(), Mn = /* @__PURE__ */ new WeakMap(), Zn = /* @__PURE__ */ new WeakMap(), Cn = /* @__PURE__ */ new WeakMap(), Rn = /* @__PURE__ */ new WeakMap(), cr = /* @__PURE__ */ new WeakMap(), Je = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakMap(), Qi = /* @__PURE__ */ new WeakMap(), es = /* @__PURE__ */ new WeakMap(), _n = /* @__PURE__ */ new WeakMap(), Tt = /* @__PURE__ */ new WeakMap(), fr = /* @__PURE__ */ new WeakMap(), Nt = /* @__PURE__ */ new WeakMap(), Ft = /* @__PURE__ */ new WeakMap(), ns = /* @__PURE__ */ new WeakMap(), se = /* @__PURE__ */ new WeakMap(), qt = /* @__PURE__ */ new WeakMap(), jt = /* @__PURE__ */ new WeakMap(), $t = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), Jn = /* @__PURE__ */ new WeakMap(), Ne = /* @__PURE__ */ new WeakMap(), Ef)](t) {
          if (!t._ || !t["--"])
            return t;
          t._.push.apply(t._, t["--"]);
          try {
            delete t["--"];
          } catch {
          }
          return t;
        }
        [xf]() {
          return { log: (...t) => {
            this[ts]() || console.log(...t), H(this, Cn, true, "f"), p(this, Je, "f").length && H(this, Je, p(this, Je, "f") + `
`, "f"), H(this, Je, p(this, Je, "f") + t.join(" "), "f");
          }, error: (...t) => {
            this[ts]() || console.error(...t), H(this, Cn, true, "f"), p(this, Je, "f").length && H(this, Je, p(this, Je, "f") + `
`, "f"), H(this, Je, p(this, Je, "f") + t.join(" "), "f");
          } };
        }
        [uo](t) {
          rs(p(this, X, "f")).forEach((r) => {
            if (r === "configObjects")
              return;
            let u = p(this, X, "f")[r];
            Array.isArray(u) ? u.includes(t) && u.splice(u.indexOf(t), 1) : typeof u == "object" && delete u[t];
          }), delete p(this, ae, "f").getDescriptions()[t];
        }
        [Af](t, r, u) {
          p(this, Ji, "f")[u] || (p(this, se, "f").process.emitWarning(t, r), p(this, Ji, "f")[u] = true);
        }
        [Of]() {
          p(this, Xi, "f").push({ options: p(this, X, "f"), configObjects: p(this, X, "f").configObjects.slice(0), exitProcess: p(this, In, "f"), groups: p(this, Zn, "f"), strict: p(this, qt, "f"), strictCommands: p(this, jt, "f"), strictOptions: p(this, $t, "f"), completionCommand: p(this, wn, "f"), output: p(this, Je, "f"), exitError: p(this, _t, "f"), hasOutput: p(this, Cn, "f"), parsed: this.parsed, parseFn: p(this, _n, "f"), parseContext: p(this, Tt, "f") }), p(this, ae, "f").freeze(), p(this, Ne, "f").freeze(), p(this, Ue, "f").freeze(), p(this, Mn, "f").freeze();
        }
        [Sf]() {
          let t, r = "";
          return t = /\b(node|iojs|electron)(\.exe)?$/.test(p(this, se, "f").process.argv()[0]) ? p(this, se, "f").process.argv().slice(1, 2) : p(this, se, "f").process.argv().slice(0, 1), r = t.map((u) => {
            let o = this[jf](p(this, Rt, "f"), u);
            return u.match(/^(\/|([a-zA-Z]:)?\\)/) && o.length < u.length ? o : u;
          }).join(" ").trim(), p(this, se, "f").getEnv("_") && p(this, se, "f").getProcessArgvBin() === p(this, se, "f").getEnv("_") && (r = p(this, se, "f").getEnv("_").replace(`${p(this, se, "f").path.dirname(p(this, se, "f").process.execPath())}/`, "")), r;
        }
        [Ut]() {
          return p(this, es, "f");
        }
        [oo]() {
          if (!p(this, Lt, "f"))
            return;
          let t = p(this, se, "f").getEnv("LC_ALL") || p(this, se, "f").getEnv("LC_MESSAGES") || p(this, se, "f").getEnv("LANG") || p(this, se, "f").getEnv("LANGUAGE") || "en_US";
          this.locale(t.replace(/[.:].*/, ""));
        }
        [kf]() {
          return this[ao]().version || "unknown";
        }
        [Bf](t) {
          let r = t["--"] ? t["--"] : t._;
          for (let u, o = 0; (u = r[o]) !== void 0; o++)
            p(this, se, "f").Parser.looksLikeNumber(u) && Number.isSafeInteger(Math.floor(parseFloat(`${u}`))) && (r[o] = Number(u));
          return t;
        }
        [ao](t) {
          let r = t || "*";
          if (p(this, fr, "f")[r])
            return p(this, fr, "f")[r];
          let u = {};
          try {
            let o = t || p(this, se, "f").mainFilename;
            !t && p(this, se, "f").path.extname(o) && (o = p(this, se, "f").path.dirname(o));
            let l = p(this, se, "f").findUp(o, (f, g) => g.includes("package.json") ? "package.json" : void 0);
            zn(l, void 0, p(this, se, "f")), u = JSON.parse(p(this, se, "f").readFileSync(l, "utf8"));
          } catch {
          }
          return p(this, fr, "f")[r] = u || {}, p(this, fr, "f")[r];
        }
        [Et](t, r) {
          (r = [].concat(r)).forEach((u) => {
            u = this[fo](u), p(this, X, "f")[t].push(u);
          });
        }
        [hr](t, r, u, o) {
          this[co](t, r, u, o, (l, f, g) => {
            p(this, X, "f")[l][f] = g;
          });
        }
        [lo](t, r, u, o) {
          this[co](t, r, u, o, (l, f, g) => {
            p(this, X, "f")[l][f] = (p(this, X, "f")[l][f] || []).concat(g);
          });
        }
        [co](t, r, u, o, l) {
          if (Array.isArray(u))
            u.forEach((f) => {
              t(f, o);
            });
          else if (((f) => typeof f == "object")(u))
            for (let f of rs(u))
              t(f, u[f]);
          else
            l(r, this[fo](u), o);
        }
        [fo](t) {
          return t === "__proto__" ? "___proto___" : t;
        }
        [ho](t, r) {
          return this[hr](this[ho].bind(this), "key", t, r), this;
        }
        [go]() {
          var t, r, u, o, l, f, g, v, _, O, S, q;
          let le = p(this, Xi, "f").pop(), L2;
          zn(le, void 0, p(this, se, "f")), t = this, r = this, u = this, o = this, l = this, f = this, g = this, v = this, _ = this, O = this, S = this, q = this, { options: { set value(A) {
            H(t, X, A, "f");
          } }.value, configObjects: L2, exitProcess: { set value(A) {
            H(r, In, A, "f");
          } }.value, groups: { set value(A) {
            H(u, Zn, A, "f");
          } }.value, output: { set value(A) {
            H(o, Je, A, "f");
          } }.value, exitError: { set value(A) {
            H(l, _t, A, "f");
          } }.value, hasOutput: { set value(A) {
            H(f, Cn, A, "f");
          } }.value, parsed: this.parsed, strict: { set value(A) {
            H(g, qt, A, "f");
          } }.value, strictCommands: { set value(A) {
            H(v, jt, A, "f");
          } }.value, strictOptions: { set value(A) {
            H(_, $t, A, "f");
          } }.value, completionCommand: { set value(A) {
            H(O, wn, A, "f");
          } }.value, parseFn: { set value(A) {
            H(S, _n, A, "f");
          } }.value, parseContext: { set value(A) {
            H(q, Tt, A, "f");
          } }.value } = le, p(this, X, "f").configObjects = L2, p(this, ae, "f").unfreeze(), p(this, Ne, "f").unfreeze(), p(this, Ue, "f").unfreeze(), p(this, Mn, "f").unfreeze();
        }
        [Pf](t, r) {
          return zr(r, (u) => (t(u), u));
        }
        getInternalMethods() {
          return { getCommandInstance: this[If].bind(this), getContext: this[Mf].bind(this), getHasOutput: this[Rf].bind(this), getLoggerInstance: this[Lf].bind(this), getParseContext: this[Tf].bind(this), getParserConfiguration: this[Ut].bind(this), getUsageInstance: this[Nf].bind(this), getValidationInstance: this[qf].bind(this), hasParseCallback: this[ts].bind(this), postProcess: this[Wt].bind(this), reset: this[po].bind(this), runValidation: this[Do].bind(this), runYargsParserAndExecuteCommands: this[$r].bind(this), setHasOutput: this[$f].bind(this) };
        }
        [If]() {
          return p(this, Ue, "f");
        }
        [Mf]() {
          return p(this, jr, "f");
        }
        [Rf]() {
          return p(this, Cn, "f");
        }
        [Lf]() {
          return p(this, cr, "f");
        }
        [Tf]() {
          return p(this, Tt, "f") || {};
        }
        [Nf]() {
          return p(this, ae, "f");
        }
        [qf]() {
          return p(this, Ne, "f");
        }
        [ts]() {
          return !!p(this, _n, "f");
        }
        [Wt](t, r, u, o) {
          return u || We(t) ? t : (r || (t = this[Ef](t)), (this[Ut]()["parse-positional-numbers"] || this[Ut]()["parse-positional-numbers"] === void 0) && (t = this[Bf](t)), o && (t = Wr(t, this, p(this, Mn, "f").getMiddleware(), false)), t);
        }
        [po](t = {}) {
          H(this, X, p(this, X, "f") || {}, "f");
          let r = {};
          r.local = p(this, X, "f").local || [], r.configObjects = p(this, X, "f").configObjects || [];
          let u = {};
          return r.local.forEach((o) => {
            u[o] = true, (t[o] || []).forEach((l) => {
              u[l] = true;
            });
          }), Object.assign(p(this, Nt, "f"), Object.keys(p(this, Zn, "f")).reduce((o, l) => {
            let f = p(this, Zn, "f")[l].filter((g) => !(g in u));
            return f.length > 0 && (o[l] = f), o;
          }, {})), H(this, Zn, {}, "f"), ["array", "boolean", "string", "skipValidation", "count", "normalize", "number", "hiddenOptions"].forEach((o) => {
            r[o] = (p(this, X, "f")[o] || []).filter((l) => !u[l]);
          }), ["narg", "key", "alias", "default", "defaultDescription", "config", "choices", "demandedOptions", "demandedCommands", "deprecatedOptions"].forEach((o) => {
            r[o] = dr(p(this, X, "f")[o], (l) => !u[l]);
          }), r.envPrefix = p(this, X, "f").envPrefix, H(this, X, r, "f"), H(this, ae, p(this, ae, "f") ? p(this, ae, "f").reset(u) : hb(this, p(this, se, "f")), "f"), H(this, Ne, p(this, Ne, "f") ? p(this, Ne, "f").reset(u) : function(o, l, f) {
            let g = f.y18n.__, v = f.y18n.__n, _ = { nonOptionCount: function(L2) {
              let A = o.getDemandedCommands(), w = L2._.length + (L2["--"] ? L2["--"].length : 0) - o.getInternalMethods().getContext().commands.length;
              A._ && (w < A._.min || w > A._.max) && (w < A._.min ? A._.minMsg !== void 0 ? l.fail(A._.minMsg ? A._.minMsg.replace(/\$0/g, w.toString()).replace(/\$1/, A._.min.toString()) : null) : l.fail(v("Not enough non-option arguments: got %s, need at least %s", "Not enough non-option arguments: got %s, need at least %s", w, w.toString(), A._.min.toString())) : w > A._.max && (A._.maxMsg !== void 0 ? l.fail(A._.maxMsg ? A._.maxMsg.replace(/\$0/g, w.toString()).replace(/\$1/, A._.max.toString()) : null) : l.fail(v("Too many non-option arguments: got %s, maximum of %s", "Too many non-option arguments: got %s, maximum of %s", w, w.toString(), A._.max.toString()))));
            }, positionalCount: function(L2, A) {
              A < L2 && l.fail(v("Not enough non-option arguments: got %s, need at least %s", "Not enough non-option arguments: got %s, need at least %s", A, A + "", L2 + ""));
            }, requiredArguments: function(L2, A) {
              let w = null;
              for (let Q of Object.keys(A))
                Object.prototype.hasOwnProperty.call(L2, Q) && L2[Q] !== void 0 || (w = w || {}, w[Q] = A[Q]);
              if (w) {
                let Q = [];
                for (let z of Object.keys(w)) {
                  let De = w[z];
                  De && Q.indexOf(De) < 0 && Q.push(De);
                }
                let ee = Q.length ? `
${Q.join(`
`)}` : "";
                l.fail(v("Missing required argument: %s", "Missing required arguments: %s", Object.keys(w).length, Object.keys(w).join(", ") + ee));
              }
            }, unknownArguments: function(L2, A, w, Q, ee = true) {
              var z;
              let De = o.getInternalMethods().getCommandInstance().getCommands(), ce = [], nn = o.getInternalMethods().getContext();
              if (Object.keys(L2).forEach((qe) => {
                Ff.includes(qe) || Object.prototype.hasOwnProperty.call(w, qe) || Object.prototype.hasOwnProperty.call(o.getInternalMethods().getParseContext(), qe) || _.isValidAndSomeAliasIsNotNew(qe, A) || ce.push(qe);
              }), ee && (nn.commands.length > 0 || De.length > 0 || Q) && L2._.slice(nn.commands.length).forEach((qe) => {
                De.includes("" + qe) || ce.push("" + qe);
              }), ee) {
                let qe = ((z = o.getDemandedCommands()._) === null || z === void 0 ? void 0 : z.max) || 0, T = nn.commands.length + qe;
                T < L2._.length && L2._.slice(T).forEach((ne) => {
                  ne = String(ne), nn.commands.includes(ne) || ce.includes(ne) || ce.push(ne);
                });
              }
              ce.length && l.fail(v("Unknown argument: %s", "Unknown arguments: %s", ce.length, ce.join(", ")));
            }, unknownCommands: function(L2) {
              let A = o.getInternalMethods().getCommandInstance().getCommands(), w = [], Q = o.getInternalMethods().getContext();
              return (Q.commands.length > 0 || A.length > 0) && L2._.slice(Q.commands.length).forEach((ee) => {
                A.includes("" + ee) || w.push("" + ee);
              }), w.length > 0 && (l.fail(v("Unknown command: %s", "Unknown commands: %s", w.length, w.join(", "))), true);
            }, isValidAndSomeAliasIsNotNew: function(L2, A) {
              if (!Object.prototype.hasOwnProperty.call(A, L2))
                return false;
              let w = o.parsed.newAliases;
              return [L2, ...A[L2]].some((Q) => !Object.prototype.hasOwnProperty.call(w, Q) || !w[L2]);
            }, limitedChoices: function(L2) {
              let A = o.getOptions(), w = {};
              if (!Object.keys(A.choices).length)
                return;
              Object.keys(L2).forEach((z) => {
                Ff.indexOf(z) === -1 && Object.prototype.hasOwnProperty.call(A.choices, z) && [].concat(L2[z]).forEach((De) => {
                  A.choices[z].indexOf(De) === -1 && De !== void 0 && (w[z] = (w[z] || []).concat(De));
                });
              });
              let Q = Object.keys(w);
              if (!Q.length)
                return;
              let ee = g("Invalid values:");
              Q.forEach((z) => {
                ee += `
  ${g("Argument: %s, Given: %s, Choices: %s", z, l.stringifiedValues(w[z]), l.stringifiedValues(A.choices[z]))}`;
              }), l.fail(ee);
            } }, O = {};
            function S(L2, A) {
              let w = Number(A);
              return typeof (A = isNaN(w) ? A : w) == "number" ? A = L2._.length >= A : A.match(/^--no-.+/) ? (A = A.match(/^--no-(.+)/)[1], A = !Object.prototype.hasOwnProperty.call(L2, A)) : A = Object.prototype.hasOwnProperty.call(L2, A), A;
            }
            _.implies = function(L2, A) {
              G("<string|object> [array|number|string]", [L2, A], arguments.length), typeof L2 == "object" ? Object.keys(L2).forEach((w) => {
                _.implies(w, L2[w]);
              }) : (o.global(L2), O[L2] || (O[L2] = []), Array.isArray(A) ? A.forEach((w) => _.implies(L2, w)) : (zn(A, void 0, f), O[L2].push(A)));
            }, _.getImplied = function() {
              return O;
            }, _.implications = function(L2) {
              let A = [];
              if (Object.keys(O).forEach((w) => {
                let Q = w;
                (O[w] || []).forEach((ee) => {
                  let z = Q, De = ee;
                  z = S(L2, z), ee = S(L2, ee), z && !ee && A.push(` ${Q} -> ${De}`);
                });
              }), A.length) {
                let w = `${g("Implications failed:")}
`;
                A.forEach((Q) => {
                  w += Q;
                }), l.fail(w);
              }
            };
            let q = {};
            _.conflicts = function(L2, A) {
              G("<string|object> [array|string]", [L2, A], arguments.length), typeof L2 == "object" ? Object.keys(L2).forEach((w) => {
                _.conflicts(w, L2[w]);
              }) : (o.global(L2), q[L2] || (q[L2] = []), Array.isArray(A) ? A.forEach((w) => _.conflicts(L2, w)) : q[L2].push(A));
            }, _.getConflicting = () => q, _.conflicting = function(L2) {
              Object.keys(L2).forEach((A) => {
                q[A] && q[A].forEach((w) => {
                  w && L2[A] !== void 0 && L2[w] !== void 0 && l.fail(g("Arguments %s and %s are mutually exclusive", A, w));
                });
              }), o.getInternalMethods().getParserConfiguration()["strip-dashed"] && Object.keys(q).forEach((A) => {
                q[A].forEach((w) => {
                  w && L2[f.Parser.camelCase(A)] !== void 0 && L2[f.Parser.camelCase(w)] !== void 0 && l.fail(g("Arguments %s and %s are mutually exclusive", A, w));
                });
              });
            }, _.recommendCommands = function(L2, A) {
              A = A.sort((ee, z) => z.length - ee.length);
              let w = null, Q = 1 / 0;
              for (let ee, z = 0; (ee = A[z]) !== void 0; z++) {
                let De = db(L2, ee);
                De <= 3 && De < Q && (Q = De, w = ee);
              }
              w && l.fail(g("Did you mean %s?", w));
            }, _.reset = function(L2) {
              return O = dr(O, (A) => !L2[A]), q = dr(q, (A) => !L2[A]), _;
            };
            let le = [];
            return _.freeze = function() {
              le.push({ implied: O, conflicting: q });
            }, _.unfreeze = function() {
              let L2 = le.pop();
              zn(L2, void 0, f), { implied: O, conflicting: q } = L2;
            }, _;
          }(this, p(this, ae, "f"), p(this, se, "f")), "f"), H(this, Ue, p(this, Ue, "f") ? p(this, Ue, "f").reset() : function(o, l, f, g) {
            return new Vf(o, l, f, g);
          }(p(this, ae, "f"), p(this, Ne, "f"), p(this, Mn, "f"), p(this, se, "f")), "f"), p(this, Pn, "f") || H(this, Pn, function(o, l, f, g) {
            return new Yf(o, l, f, g);
          }(this, p(this, ae, "f"), p(this, Ue, "f"), p(this, se, "f")), "f"), p(this, Mn, "f").reset(), H(this, wn, null, "f"), H(this, Je, "", "f"), H(this, _t, null, "f"), H(this, Cn, false, "f"), this.parsed = false, this;
        }
        [jf](t, r) {
          return p(this, se, "f").path.relative(t, r);
        }
        [$r](t, r, u, o = 0, l = false) {
          let f = !!u || l;
          t = t || p(this, Ft, "f"), p(this, X, "f").__ = p(this, se, "f").y18n.__, p(this, X, "f").configuration = this[Ut]();
          let g = !!p(this, X, "f").configuration["populate--"], v = Object.assign({}, p(this, X, "f").configuration, { "populate--": true }), _ = p(this, se, "f").Parser.detailed(t, Object.assign({}, p(this, X, "f"), { configuration: { "parse-positional-numbers": false, ...v } })), O = Object.assign(_.argv, p(this, Tt, "f")), S, q = _.aliases, le = false, L2 = false;
          Object.keys(O).forEach((A) => {
            A === p(this, Rn, "f") && O[A] ? le = true : A === p(this, Jn, "f") && O[A] && (L2 = true);
          }), O.$0 = this.$0, this.parsed = _, o === 0 && p(this, ae, "f").clearCachedHelpMessage();
          try {
            if (this[oo](), r)
              return this[Wt](O, g, !!u, false);
            p(this, Rn, "f") && [p(this, Rn, "f")].concat(q[p(this, Rn, "f")] || []).filter((ee) => ee.length > 1).includes("" + O._[O._.length - 1]) && (O._.pop(), le = true);
            let A = p(this, Ue, "f").getCommands(), w = p(this, Pn, "f").completionKey in O, Q = le || w || l;
            if (O._.length) {
              if (A.length) {
                let ee;
                for (let z, De = o || 0; O._[De] !== void 0; De++) {
                  if (z = String(O._[De]), A.includes(z) && z !== p(this, wn, "f")) {
                    let ce = p(this, Ue, "f").runCommand(z, this, _, De + 1, l, le || L2 || l);
                    return this[Wt](ce, g, !!u, false);
                  }
                  if (!ee && z !== p(this, wn, "f")) {
                    ee = z;
                    break;
                  }
                }
                !p(this, Ue, "f").hasDefaultCommand() && p(this, ns, "f") && ee && !Q && p(this, Ne, "f").recommendCommands(ee, A);
              }
              p(this, wn, "f") && O._.includes(p(this, wn, "f")) && !w && (p(this, In, "f") && Ur(true), this.showCompletionScript(), this.exit(0));
            }
            if (p(this, Ue, "f").hasDefaultCommand() && !Q) {
              let ee = p(this, Ue, "f").runCommand(null, this, _, 0, l, le || L2 || l);
              return this[Wt](ee, g, !!u, false);
            }
            if (w) {
              p(this, In, "f") && Ur(true);
              let ee = (t = [].concat(t)).slice(t.indexOf(`--${p(this, Pn, "f").completionKey}`) + 1);
              return p(this, Pn, "f").getCompletion(ee, (z, De) => {
                if (z)
                  throw new Ke(z.message);
                (De || []).forEach((ce) => {
                  p(this, cr, "f").log(ce);
                }), this.exit(0);
              }), this[Wt](O, !g, !!u, false);
            }
            if (p(this, Cn, "f") || (le ? (p(this, In, "f") && Ur(true), f = true, this.showHelp("log"), this.exit(0)) : L2 && (p(this, In, "f") && Ur(true), f = true, p(this, ae, "f").showVersion("log"), this.exit(0))), !f && p(this, X, "f").skipValidation.length > 0 && (f = Object.keys(O).some((ee) => p(this, X, "f").skipValidation.indexOf(ee) >= 0 && O[ee] === true)), !f) {
              if (_.error)
                throw new Ke(_.error.message);
              if (!w) {
                let ee = this[Do](q, {}, _.error);
                u || (S = Wr(O, this, p(this, Mn, "f").getMiddleware(), true)), S = this[Pf](ee, S ?? O), We(S) && !u && (S = S.then(() => Wr(O, this, p(this, Mn, "f").getMiddleware(), false)));
              }
            }
          } catch (A) {
            if (!(A instanceof Ke))
              throw A;
            p(this, ae, "f").fail(A.message, A);
          }
          return this[Wt](S ?? O, g, !!u, true);
        }
        [Do](t, r, u, o) {
          let l = { ...this.getDemandedOptions() };
          return (f) => {
            if (u)
              throw new Ke(u.message);
            p(this, Ne, "f").nonOptionCount(f), p(this, Ne, "f").requiredArguments(f, l);
            let g = false;
            p(this, jt, "f") && (g = p(this, Ne, "f").unknownCommands(f)), p(this, qt, "f") && !g ? p(this, Ne, "f").unknownArguments(f, t, r, !!o) : p(this, $t, "f") && p(this, Ne, "f").unknownArguments(f, t, {}, false, false), p(this, Ne, "f").limitedChoices(f), p(this, Ne, "f").implications(f), p(this, Ne, "f").conflicting(f);
          };
        }
        [$f]() {
          H(this, Cn, true, "f");
        }
        [zt](t) {
          if (typeof t == "string")
            p(this, X, "f").key[t] = true;
          else
            for (let r of t)
              p(this, X, "f").key[r] = true;
        }
      }, mo, yo, { readFileSync: gb } = require("fs"), { inspect: pb } = require("util"), { resolve: Db } = require("path"), mb = vc(), yb = Vu(), bo, Uf = { assert: { notStrictEqual: yf.notStrictEqual, strictEqual: yf.strictEqual }, cliui: of(), findUp: ff(), getEnv: (s) => process.env[s], getCallerFile: df(), getProcessArgvBin: Gf, inspect: pb, mainFilename: (yo = (mo = require == null ? void 0 : require.main) === null || mo === void 0 ? void 0 : mo.filename) !== null && yo !== void 0 ? yo : process.cwd(), Parser: yb, path: require("path"), process: { argv: () => process.argv, cwd: process.cwd, emitWarning: (s, t) => process.emitWarning(s, t), execPath: () => process.execPath, exit: (s) => {
        process.exit(s);
      }, nextTick: process.nextTick, stdColumns: process.stdout.columns !== void 0 ? process.stdout.columns : null }, readFileSync: gb, require, requireDirectory: mf(), stringWidth: Wi(), y18n: mb({ directory: Db(__dirname, "../locales"), updateFiles: false }) }, Wf = ((bo = process == null ? void 0 : process.env) === null || bo === void 0 ? void 0 : bo.YARGS_MIN_NODE_VERSION) ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12;
      if (process && process.version && Number(process.version.match(/v([^.]+)/)[1]) < Wf)
        throw Error(`yargs supports a minimum Node.js version of ${Wf}. Read our version support policy: https://github.com/yargs/yargs#supported-nodejs-versions`);
      var bb = Vu(), vo, vb = { applyExtends: is, cjsPlatformShim: Uf, Yargs: (vo = Uf, (s = [], t = vo.process.cwd(), r) => {
        let u = new Zf(s, t, r, vo);
        return Object.defineProperty(u, "argv", { get: () => u.parse(), enumerable: true }), u.help(), u.version(), u;
      }), argsert: G, isPromise: We, objFilter: dr, parseCommand: gr, Parser: bb, processArgv: cb, YError: Ke };
      Jf.exports = vb;
    });
    var eh = Le((_2, Qf) => {
      "use strict";
      var { Yargs: wb, processArgv: Cb } = Xf();
      pr(Cb.hideBin(process.argv));
      Qf.exports = pr;
      function pr(s, t) {
        let r = wb(s, t, require);
        return Fb(r), r;
      }
      function _o(s, t, r) {
        Object.defineProperty(s, t, { configurable: true, enumerable: true, get: r });
      }
      function _b(s, t) {
        let r = Object.getOwnPropertyDescriptor(s, t);
        if (typeof r < "u")
          return r.get;
      }
      function Fb(s) {
        [...Object.keys(s), ...Object.getOwnPropertyNames(s.constructor.prototype)].forEach((t) => {
          t === "argv" ? _o(pr, t, _b(s, t)) : typeof s[t] == "function" ? pr[t] = s[t].bind(s) : (_o(pr, "$0", () => s.$0), _o(pr, "parsed", () => s.parsed));
        });
      }
    });
    var Hb = {};
    K1(Hb, { EconomicalProtocol: () => oh, Network: () => Wb, Option: () => sh, Plugin: () => rh, PositionalArg: () => ah, Sandbox: () => uh, Task: () => ih, default: () => zb, execCmd: () => th, getArch: () => Ob, readJsonFile: () => Ab, writeJsonFile: () => xb });
    var tc = function(...s) {
      let t;
      return typeof s[0] == "object" ? t = s[0] : t = [].slice.call(s), Z1(t);
    };
    var Z1 = (s) => {
      let t = [];
      if (s.length === 0)
        return "";
      if (typeof s[0] != "string")
        throw new TypeError("Url must be a string. Received " + s[0]);
      if (s[0].match(/^[^/:]+:\/*$/) && s.length > 1) {
        let o = s.shift();
        s[0] = o + s[0];
      }
      s[0].match(/^file:\/\/\//) ? s[0] = s[0].replace(/^([^/:]+):\/*/, "$1:///") : s[0] = s[0].replace(/^([^/:]+):\/*/, "$1://");
      for (let o = 0; o < s.length; o++) {
        let l = s[o];
        if (typeof l != "string")
          throw new TypeError("Url must be a string. Received " + l);
        l !== "" && (o > 0 && (l = l.replace(/^[\/]+/, "")), o < s.length - 1 ? l = l.replace(/[\/]+$/, "") : l = l.replace(/[\/]+$/, "/"), t.push(l));
      }
      let r = t.join("/");
      r = r.replace(/\/(\?|&|#[^!])/g, "$1");
      let u = r.split("?");
      return r = u.shift() + (u.length > 0 ? "?" : "") + u.join("&"), r;
    };
    var rc = (s = {}) => {
      let t = new URL("http://localhost"), r = {};
      typeof s == "string" ? (t = new URL(s), t.protocol && (r.protocol = t.protocol), t.hostname && (r.hostname = t.hostname), t.port && (r.port = t.port), t.username && (r.username = t.username), t.password && (r.password = t.password), t.searchParams && t.searchParams.forEach((S, q) => {
        var le;
        (le = r == null ? void 0 : r.query) == null || le.push({ value: S, key: q });
      })) : s ? r = s : r = {};
      let { protocol: u = "http", hostname: o, pathname: l, port: f, username: g, password: v, query: _ = null } = r;
      if (!u || !o)
        throw new Error("You should at least set the protocol and the hostname");
      u && (t.protocol = u), o && (t.hostname = o), l && (Array.isArray(l) ? t.pathname = tc(...l) : t.pathname = l), typeof f == "number" ? t.port = String(f).toString() : f && (t.port = f), g && (t.username = g), v && (t.password = v), _ && Array.isArray(_) && _.forEach(({ key: S, value: q }) => {
        t.searchParams.append(S, q);
      });
      let O = { href: t.href, origin: t.origin, protocol: t.protocol, username: t.username, password: t.password, host: t.host, hostname: t.hostname, port: t.port, pathname: t.pathname, hash: t.hash, search: t.search, toString() {
        return this.href;
      } };
      if (u) {
        let S = u.trim().endsWith(":") ? u.trim() : `${u.trim()}:`;
        O.href = O.href.replace(O.protocol, S), O.origin = O.origin.replace(O.protocol, S), O.protocol = S;
      }
      return O;
    };
    var wt = class {
      constructor(t) {
        this.value = t;
      }
      static create(t) {
        return this.constructor.call(this, t);
      }
      toString() {
        return this.value;
      }
    };
    var J1 = Symbol();
    var Li = class extends wt {
      static create(t, r = false) {
        return t.length <= 30 ? new Li(t) : r ? new Li(t.substr(0, 30)) : void 0;
      }
    };
    var Ou = Li;
    var X1 = Symbol();
    var Pu = class extends wt {
      static create(t) {
        return new Pu(t.replace(/\s+/g, "_"));
      }
    };
    var ic = Pu;
    var Jb = Symbol();
    var Q1 = Symbol();
    var Iu = class extends wt {
      static create(t) {
        let r = Ou.create(ic.create(t).value);
        if (r) {
          let u = r.value.match(/^[A-Za-z]+[A-Za-z0-9-_]*$/);
          return u ? new Iu(u[0]) : void 0;
        }
      }
    };
    var Ni = Iu;
    var ey = Symbol();
    var Mu = class extends wt {
      static create(t) {
        let r = t.match(/^[A-Za-z\-\ ]+/);
        return r ? new Mu(r[0]) : void 0;
      }
    };
    var Ri = Mu;
    var ny = Symbol();
    var Ru = class extends wt {
      static create(t) {
        if (t.match(/^([A-Za-z-_ ]+ ?)((\[.+\] ?)|(\<.+\>) ?)*$/))
          return new Ru(t);
      }
    };
    var sc = Ru;
    var ty = Symbol();
    var Lu = class extends wt {
      static create(t) {
        return t && t.toString().match(/^[A-Za-z]/) ? new Lu(t[0]) : void 0;
      }
    };
    var Su = Lu;
    var ry = Symbol();
    var Tu = class {
      constructor(t) {
        this.url = t;
      }
      static create(t) {
        try {
          let r = rc(t);
          return new Tu(r);
        } catch {
          return;
        }
      }
    };
    var uc = Tu;
    var Xb = Symbol();
    var Qb = Symbol();
    var iy = Symbol();
    var Nu = class {
      constructor(t, r, u, o) {
        this.placeholder = t, this.defaultValue = o, this.description = r, this.type = u;
      }
      static create(t) {
        let r = Ni.create(t.placeholder);
        return r ? new Nu(r, t.description, t.type, t.defaultValue) : void 0;
      }
    };
    var Pr = Nu;
    var sy = Symbol();
    var Ti = class {
      constructor(t, r, u, o, l, f, g) {
        this.shortFlag = t, this.flag = r, this.description = u, this.defaultValue = g, this.required = l, this.choices = o, this.boolean = f;
      }
      static create(t) {
        let r = Ri.create(t.flag);
        if (!t.shortFlag && r)
          return new Ti(void 0, r, t.description, t.choices || [], t.required || false, !!t.boolean, t.defaultValue);
        if (t.shortFlag && r) {
          let u = Su.create(t.shortFlag);
          return u ? new Ti(u, r, t.description, t.choices || [], t.required || false, !!t.boolean, t.defaultValue) : void 0;
        }
      }
    };
    var Ir = Ti;
    var uy = Symbol();
    var qu = class {
      constructor(t, r, u, o, l = [], f = [], g = [], v = false, _) {
        this.task = t, this.command = r, this.description = u, this.options = l, this.aliases = g, this.handler = o, this.hidden = v, this.example = _, this.positionals = f;
      }
      static createAlias(t) {
        return Ri.create(t) || Su.create(t);
      }
      static create(t) {
        let r = Ri.create(t.task), u = sc.create(t.command), o = t.aliases ? t.aliases.reduce((g, v) => {
          let _ = this.createAlias(v);
          return _ ? [...g, _] : g;
        }, []) : [], l = t.options ? t.options.reduce((g, v) => {
          if (v instanceof Ir)
            return [...g, v];
          if (v === void 0)
            return g;
          {
            let _ = Ir.create(v);
            return _ ? [...g, _] : g;
          }
        }, []) : [], f = t.positionals ? t.positionals.reduce((g, v) => {
          if (v instanceof Pr)
            return [...g, v];
          if (v === void 0)
            return g;
          let _ = Pr.create(v);
          return _ ? [...g, _] : g;
        }, []) : [];
        return r && u ? new qu(r, u, t.description, t.handler, l, f, o, !!t.hidden, t.example) : void 0;
      }
    };
    var ku = qu;
    var oy = Symbol();
    var ju = class extends wt {
      static create(t) {
        return t.length === 51 && t[0] === "P" && /[A-Za-z0-9]+/.test(t) ? new ju(t) : void 0;
      }
    };
    var oc = ju;
    var ay = Symbol();
    var $u = class {
      constructor(t, r = void 0) {
        this.hash = t, this.label = r;
      }
      static create(t, r = void 0) {
        let u = oc.create(t), o = r ? Ni.create(r) : void 0;
        return u ? new $u(u, o) : void 0;
      }
    };
    var qi = $u;
    var ly = Symbol();
    var Uu = class {
      constructor(t, r, u, o, l) {
        this.name = t, this.label = r, this.rpcUrl = u, this.protocol = o, this.attributes = l;
      }
      static create(t) {
        let r = Ni.create(t.name), u = Ou.create(t.label), o = uc.create(t.rpcUrl), l = qi.create(t.protocol);
        return r && u && o && l ? new Uu(r, u, o, l, t.attributes ? t.attributes : {}) : void 0;
      }
    };
    var ji = Uu;
    var cy = Symbol();
    var Wu = class extends ji {
      constructor(t, r, u, o, l, f, g) {
        super(t, r, u, o, l);
        this.plugin = f, this.accounts = g || {};
      }
      static create(t) {
        let r = super.create(t);
        return r ? new Wu(r.name, r.label, r.rpcUrl, r.protocol, r.attributes, t.plugin, t.accounts) : void 0;
      }
    };
    var Bu = Wu;
    var at = require("path");
    var ss = require("fs/promises");
    function zu(s) {
      let t = Error.stackTraceLimit;
      Error.stackTraceLimit = 1 / 0;
      let r = {}, u = Error.prepareStackTrace;
      Error.prepareStackTrace = function(l, f) {
        return f;
      }, Error.captureStackTrace(r, s || zu);
      let o = r.stack;
      return Error.prepareStackTrace = u, Error.stackTraceLimit = t, o;
    }
    function $i(s) {
      for (let t in s)
        this[t] = s[t];
    }
    var fy = ["this", "typeName", "functionName", "methodName", "fileName", "lineNumber", "columnNumber", "function", "evalOrigin"];
    var hy = ["topLevel", "eval", "native", "constructor"];
    fy.forEach(function(s) {
      $i.prototype[s] = null, $i.prototype["get" + s[0].toUpperCase() + s.substr(1)] = function() {
        return this[s];
      };
    });
    hy.forEach(function(s) {
      $i.prototype[s] = false, $i.prototype["is" + s[0].toUpperCase() + s.substr(1)] = function() {
        return this[s];
      };
    });
    var nh = require("child_process");
    var Fo = V1(mc());
    var Eb = eh();
    var xb = (s) => (t) => (0, ss.writeFile)(s, JSON.stringify(t, void 0, 4), { encoding: "utf8" }).then((r) => s);
    var Ab = (s) => (0, ss.readFile)(s, { encoding: "utf-8" }).then(JSON.parse).then((t) => t);
    var th = (s) => new Promise((t, r) => {
      (0, nh.exec)(`sh -c "${s}"`, (u, o, l) => {
        t(u ? { status: "failed", stdout: o, stderr: u.message } : l ? { status: "failed", stdout: o, stderr: l } : { status: "success", stdout: o, stderr: l });
      });
    });
    var Ob = () => th("uname -m").then((s) => s.stdout.trim().toLowerCase()).then((s) => {
      switch (s) {
        case "x86_64":
          return "linux/amd64";
        case "arm64":
          return "linux/arm64/v8";
        default:
          return "linux/amd64";
      }
    });
    var Sb = (s) => new Promise((t, r) => {
      try {
        let u = JSON.parse(s);
        t(u);
      } catch (u) {
        return r({ errCode: "E_INVALID_JSON", errMsg: `Invalid JSON: ${s}`, previous: u, context: s });
      }
    });
    var kb = (s) => typeof s == "string" ? Sb(s) : Promise.resolve(s);
    var Bb = (s) => typeof s.contractsDir == "string" && typeof s.testsDir == "string" ? Promise.resolve(s) : Promise.reject({ errCode: "E_INVALID_ARGS", errMsg: `Invalid config: ${JSON.stringify(s)}`, context: s });
    var Pb = (s) => kb(s.config).then(Bb).then((t) => {
      let r = (0, at.resolve)(s.projectDir);
      return { ...s, projectDir: r, config: t, contractsDir: (0, at.join)(r, t.contractsDir), testsDir: (0, at.join)(r, t.testsDir), artifactsDir: (0, at.join)(r, t.artifactsDir) };
    });
    var Ib = (s) => {
      if (s && Array.isArray(s) && s.length >= 2) {
        let t = Eb(s.slice(2)).argv;
        if (t.i18n && t.taqRun && t.projectDir && t.configDir)
          return Promise.resolve(t);
      }
      return Promise.reject({ errCode: "E_INVALID_ARGS", errMsg: "Invalid usage. If you were testing your plugin, did you remember to specify --taqRun?", context: void 0 });
    };
    var Mb = ({ shortFlag: s, flag: t, description: r, boolean: u, choices: o, defaultValue: l, required: f }) => ({ shortFlag: s ? s.value : void 0, flag: t.value, description: r, boolean: u, choices: o, defaultValue: l, required: f });
    var Rb = ({ placeholder: s, description: t, type: r, defaultValue: u }) => ({ placeholder: s.value, description: t, type: r, defaultValue: u });
    var Lb = ({ task: s, command: t, aliases: r, description: u, options: o, positionals: l, handler: f }) => ({ task: s.value, command: t.value, aliases: r ? r.reduce((g, v) => v ? [...g, v.value] : g, []) : [], description: u, options: o ? o.reduce((g, v) => v ? [...g, Mb(v)] : g, []) : [], positionals: l ? l.reduce((g, v) => v ? [...g, Rb(v)] : g, []) : [], handler: f === "proxy" ? "proxy" : f });
    var Tb = (s, t, r) => {
      try {
        let { name: u, alias: o, schema: l, version: f, tasks: g, scaffolds: v, hooks: _, networks: O, sandboxes: S, ...q } = t(s);
        return { name: u || r(), alias: o, schema: l, version: f, tasks: g ? g.reduce((le, L2) => L2 ? [...le, Lb(L2)] : le, []) : [], hooks: [], scaffolds: [], networks: [], sandboxes: [], ...q };
      } catch {
        return;
      }
    };
    var Nb = (s) => console.log(JSON.stringify(s));
    var qb = (s) => {
      console.error(JSON.stringify(s));
    };
    var jb = (s, t) => (r) => {
      let { i18n: u, taqRun: o } = r, l = Tb(u, s, t);
      switch (o) {
        case "pluginInfo":
          return l ? Promise.resolve({ ...l, status: "success" }) : Promise.reject({ err: "E_INVALID_SCHEMA", msg: "The schema of the plugin is invalid." });
        case "proxy":
          return l && l.proxy ? l.proxy(r) : Promise.resolve({ status: "notSupported", stdout: "", stderr: u.proxyNotSupported, artifacts: [] });
        case "checkRuntimeDependencies":
          return l && l.checkRuntimeDependencies ? l.checkRuntimeDependencies(u, r) : Promise.resolve({ status: "notSupported", report: [] });
        case "installRuntimeDependencies":
          return l && l.installRuntimeDependencies ? l.installRuntimeDependencies(u, r) : Promise.resolve({ status: "notSupported", report: [] });
        default:
          return Promise.resolve({ status: "notSupported", msg: u.actionNotSupported });
      }
    };
    var $b = (s) => {
      try {
        return `${require(s).name}`;
      } catch {
        return (0, Fo.default)().dashed;
      }
    };
    var Ub = (s) => {
      let t = s.reduce((r, u) => {
        let o = u.getFileName();
        return r || o.includes("taqueria-sdk") || o.includes("taqueria-node-sdk") || o.includes("@taqueria/node-sdk") ? r : (0, at.join)((0, at.dirname)(o), "package.json");
      }, null);
      return () => t ? $b(t) : (0, Fo.default)().dashed;
    };
    var rh = { create: (s, t) => {
      let r = zu();
      return Ib(t).then(Pb).then(jb(s, Ub(r))).then(Nb).catch(qb);
    } };
    var ih = ku;
    var sh = Ir;
    var Wb = ji;
    var uh = Bu;
    var oh = qi;
    var ah = Pr;
    var zb = { Plugin: rh, Task: ih, Option: sh, Sandbox: uh, EconomicalProtocol: oh, PositionalArg: ah };
    module2.exports = Y1(Hb);
  }
});

// node_modules/err-code/index.js
var require_err_code = __commonJS({
  "node_modules/err-code/index.js"(exports2, module2) {
    "use strict";
    function assign(obj, props) {
      for (const key in props) {
        Object.defineProperty(obj, key, {
          value: props[key],
          enumerable: true,
          configurable: true
        });
      }
      return obj;
    }
    function createError(err, code, props) {
      if (!err || typeof err === "string") {
        throw new TypeError("Please pass an Error to err-code");
      }
      if (!props) {
        props = {};
      }
      if (typeof code === "object") {
        props = code;
        code = void 0;
      }
      if (code != null) {
        props.code = code;
      }
      try {
        return assign(err, props);
      } catch (_) {
        props.message = err.message;
        props.stack = err.stack;
        const ErrClass = function() {
        };
        ErrClass.prototype = Object.create(Object.getPrototypeOf(err));
        return assign(new ErrClass(), props);
      }
    }
    module2.exports = createError;
  }
});

// node_modules/retry/lib/retry_operation.js
var require_retry_operation = __commonJS({
  "node_modules/retry/lib/retry_operation.js"(exports2, module2) {
    function RetryOperation(timeouts, options) {
      if (typeof options === "boolean") {
        options = { forever: options };
      }
      this._originalTimeouts = JSON.parse(JSON.stringify(timeouts));
      this._timeouts = timeouts;
      this._options = options || {};
      this._maxRetryTime = options && options.maxRetryTime || Infinity;
      this._fn = null;
      this._errors = [];
      this._attempts = 1;
      this._operationTimeout = null;
      this._operationTimeoutCb = null;
      this._timeout = null;
      this._operationStart = null;
      if (this._options.forever) {
        this._cachedTimeouts = this._timeouts.slice(0);
      }
    }
    module2.exports = RetryOperation;
    RetryOperation.prototype.reset = function() {
      this._attempts = 1;
      this._timeouts = this._originalTimeouts;
    };
    RetryOperation.prototype.stop = function() {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }
      this._timeouts = [];
      this._cachedTimeouts = null;
    };
    RetryOperation.prototype.retry = function(err) {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }
      if (!err) {
        return false;
      }
      var currentTime = new Date().getTime();
      if (err && currentTime - this._operationStart >= this._maxRetryTime) {
        this._errors.unshift(new Error("RetryOperation timeout occurred"));
        return false;
      }
      this._errors.push(err);
      var timeout = this._timeouts.shift();
      if (timeout === void 0) {
        if (this._cachedTimeouts) {
          this._errors.splice(this._errors.length - 1, this._errors.length);
          this._timeouts = this._cachedTimeouts.slice(0);
          timeout = this._timeouts.shift();
        } else {
          return false;
        }
      }
      var self2 = this;
      var timer = setTimeout(function() {
        self2._attempts++;
        if (self2._operationTimeoutCb) {
          self2._timeout = setTimeout(function() {
            self2._operationTimeoutCb(self2._attempts);
          }, self2._operationTimeout);
          if (self2._options.unref) {
            self2._timeout.unref();
          }
        }
        self2._fn(self2._attempts);
      }, timeout);
      if (this._options.unref) {
        timer.unref();
      }
      return true;
    };
    RetryOperation.prototype.attempt = function(fn, timeoutOps) {
      this._fn = fn;
      if (timeoutOps) {
        if (timeoutOps.timeout) {
          this._operationTimeout = timeoutOps.timeout;
        }
        if (timeoutOps.cb) {
          this._operationTimeoutCb = timeoutOps.cb;
        }
      }
      var self2 = this;
      if (this._operationTimeoutCb) {
        this._timeout = setTimeout(function() {
          self2._operationTimeoutCb();
        }, self2._operationTimeout);
      }
      this._operationStart = new Date().getTime();
      this._fn(this._attempts);
    };
    RetryOperation.prototype.try = function(fn) {
      console.log("Using RetryOperation.try() is deprecated");
      this.attempt(fn);
    };
    RetryOperation.prototype.start = function(fn) {
      console.log("Using RetryOperation.start() is deprecated");
      this.attempt(fn);
    };
    RetryOperation.prototype.start = RetryOperation.prototype.try;
    RetryOperation.prototype.errors = function() {
      return this._errors;
    };
    RetryOperation.prototype.attempts = function() {
      return this._attempts;
    };
    RetryOperation.prototype.mainError = function() {
      if (this._errors.length === 0) {
        return null;
      }
      var counts = {};
      var mainError = null;
      var mainErrorCount = 0;
      for (var i = 0; i < this._errors.length; i++) {
        var error = this._errors[i];
        var message = error.message;
        var count = (counts[message] || 0) + 1;
        counts[message] = count;
        if (count >= mainErrorCount) {
          mainError = error;
          mainErrorCount = count;
        }
      }
      return mainError;
    };
  }
});

// node_modules/retry/lib/retry.js
var require_retry = __commonJS({
  "node_modules/retry/lib/retry.js"(exports2) {
    var RetryOperation = require_retry_operation();
    exports2.operation = function(options) {
      var timeouts = exports2.timeouts(options);
      return new RetryOperation(timeouts, {
        forever: options && options.forever,
        unref: options && options.unref,
        maxRetryTime: options && options.maxRetryTime
      });
    };
    exports2.timeouts = function(options) {
      if (options instanceof Array) {
        return [].concat(options);
      }
      var opts = {
        retries: 10,
        factor: 2,
        minTimeout: 1 * 1e3,
        maxTimeout: Infinity,
        randomize: false
      };
      for (var key in options) {
        opts[key] = options[key];
      }
      if (opts.minTimeout > opts.maxTimeout) {
        throw new Error("minTimeout is greater than maxTimeout");
      }
      var timeouts = [];
      for (var i = 0; i < opts.retries; i++) {
        timeouts.push(this.createTimeout(i, opts));
      }
      if (options && options.forever && !timeouts.length) {
        timeouts.push(this.createTimeout(i, opts));
      }
      timeouts.sort(function(a, b) {
        return a - b;
      });
      return timeouts;
    };
    exports2.createTimeout = function(attempt, opts) {
      var random = opts.randomize ? Math.random() + 1 : 1;
      var timeout = Math.round(random * opts.minTimeout * Math.pow(opts.factor, attempt));
      timeout = Math.min(timeout, opts.maxTimeout);
      return timeout;
    };
    exports2.wrap = function(obj, options, methods) {
      if (options instanceof Array) {
        methods = options;
        options = null;
      }
      if (!methods) {
        methods = [];
        for (var key in obj) {
          if (typeof obj[key] === "function") {
            methods.push(key);
          }
        }
      }
      for (var i = 0; i < methods.length; i++) {
        var method = methods[i];
        var original = obj[method];
        obj[method] = function retryWrapper(original2) {
          var op = exports2.operation(options);
          var args = Array.prototype.slice.call(arguments, 1);
          var callback = args.pop();
          args.push(function(err) {
            if (op.retry(err)) {
              return;
            }
            if (err) {
              arguments[0] = op.mainError();
            }
            callback.apply(this, arguments);
          });
          op.attempt(function() {
            original2.apply(obj, args);
          });
        }.bind(obj, original);
        obj[method].options = options;
      }
    };
  }
});

// node_modules/retry/index.js
var require_retry2 = __commonJS({
  "node_modules/retry/index.js"(exports2, module2) {
    module2.exports = require_retry();
  }
});

// node_modules/promise-retry/index.js
var require_promise_retry = __commonJS({
  "node_modules/promise-retry/index.js"(exports2, module2) {
    "use strict";
    var errcode = require_err_code();
    var retry2 = require_retry2();
    var hasOwn = Object.prototype.hasOwnProperty;
    function isRetryError(err) {
      return err && err.code === "EPROMISERETRY" && hasOwn.call(err, "retried");
    }
    function promiseRetry(fn, options) {
      var temp;
      var operation;
      if (typeof fn === "object" && typeof options === "function") {
        temp = options;
        options = fn;
        fn = temp;
      }
      operation = retry2.operation(options);
      return new Promise(function(resolve5, reject) {
        operation.attempt(function(number) {
          Promise.resolve().then(function() {
            return fn(function(err) {
              if (isRetryError(err)) {
                err = err.retried;
              }
              throw errcode(new Error("Retrying"), "EPROMISERETRY", { retried: err });
            }, number);
          }).then(resolve5, function(err) {
            if (isRetryError(err)) {
              err = err.retried;
              if (operation.retry(err || new Error())) {
                return;
              }
            }
            reject(err);
          });
        });
      });
    }
    module2.exports = promiseRetry;
  }
});

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
    function define2(v) {
      var untoV = unto(v);
      return function define3(x, i, F, xi2yF) {
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
    exports2.define = define2;
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

// index.ts
var import_node_sdk = __toESM(require_node_sdk());

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

// ../node_modules/escalade/sync/index.mjs
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
    aliasArray = aliasArray.filter(function(v, i, self2) {
      return self2.indexOf(v) === i;
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
var __dirname2;
try {
  __dirname2 = (0, import_url.fileURLToPath)(import_meta.url);
} catch (e) {
  __dirname2 = process.cwd();
}
var mainFilename = __dirname2.split("node_modules")[0];
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
    directory: (0, import_path4.resolve)(__dirname2, "../../../locales"),
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
  addMiddleware(callback, applyBeforeValidation, global2 = true, mutates = false) {
    argsert("<array|function> [boolean] [boolean] [boolean]", [callback, applyBeforeValidation, global2], arguments.length);
    if (Array.isArray(callback)) {
      for (let i = 0; i < callback.length; i++) {
        if (typeof callback[i] !== "function") {
          throw Error("middleware must be a function");
        }
        const m = callback[i];
        m.applyBeforeValidation = applyBeforeValidation;
        m.global = global2;
      }
      Array.prototype.push.apply(this.globalMiddleware, callback);
    } else if (typeof callback === "function") {
      const m = callback;
      m.applyBeforeValidation = applyBeforeValidation;
      m.global = global2;
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
  const self2 = {};
  const fails = [];
  self2.failFn = function failFn(f) {
    fails.push(f);
  };
  let failMessage = null;
  let showHelpOnFail = true;
  self2.showHelpOnFail = function showHelpOnFailFn(arg1 = true, arg2) {
    function parseFunctionArgs() {
      return typeof arg1 === "string" ? [true, arg1] : [arg1, arg2];
    }
    const [enabled, message] = parseFunctionArgs();
    failMessage = message;
    showHelpOnFail = enabled;
    return self2;
  };
  let failureOutput = false;
  self2.fail = function fail(msg, err) {
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
          fail2(msg, err, self2);
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
  self2.usage = (msg, description) => {
    if (msg === null) {
      usageDisabled = true;
      usages = [];
      return self2;
    }
    usageDisabled = false;
    usages.push([msg, description || ""]);
    return self2;
  };
  self2.getUsage = () => {
    return usages;
  };
  self2.getUsageDisabled = () => {
    return usageDisabled;
  };
  self2.getPositionalGroupName = () => {
    return __("Positionals:");
  };
  let examples = [];
  self2.example = (cmd, description) => {
    examples.push([cmd, description || ""]);
  };
  let commands = [];
  self2.command = function command2(cmd, description, isDefault, aliases, deprecated = false) {
    if (isDefault) {
      commands = commands.map((cmdArray) => {
        cmdArray[2] = false;
        return cmdArray;
      });
    }
    commands.push([cmd, description || "", isDefault, aliases, deprecated]);
  };
  self2.getCommands = () => commands;
  let descriptions = {};
  self2.describe = function describe(keyOrKeys, desc) {
    if (Array.isArray(keyOrKeys)) {
      keyOrKeys.forEach((k) => {
        self2.describe(k, desc);
      });
    } else if (typeof keyOrKeys === "object") {
      Object.keys(keyOrKeys).forEach((k) => {
        self2.describe(k, keyOrKeys[k]);
      });
    } else {
      descriptions[keyOrKeys] = desc;
    }
  };
  self2.getDescriptions = () => descriptions;
  let epilogs = [];
  self2.epilog = (msg) => {
    epilogs.push(msg);
  };
  let wrapSet = false;
  let wrap2;
  self2.wrap = (cols) => {
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
  self2.deferY18nLookup = (str) => deferY18nLookupPrefix + str;
  self2.help = function help() {
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
          if (groupName === self2.getPositionalGroupName())
            return sw;
          else {
            return (/^[0-9]$/.test(sw) ? options.boolean.includes(key) ? "-" : "--" : sw.length > 1 ? "--" : "-") + sw;
          }
        }).sort((sw1, sw2) => isLongSwitch(sw1) === isLongSwitch(sw2) ? 0 : isLongSwitch(sw1) ? 1 : -1).join(", ");
        return acc;
      }, {});
      return { groupName, normalizedKeys, switches };
    });
    const shortSwitchesUsed = displayedGroups.filter(({ groupName }) => groupName !== self2.getPositionalGroupName()).some(({ normalizedKeys, switches }) => !normalizedKeys.every((key) => isLongSwitch(switches[key])));
    if (shortSwitchesUsed) {
      displayedGroups.filter(({ groupName }) => groupName !== self2.getPositionalGroupName()).forEach(({ normalizedKeys, switches }) => {
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
          options.choices && options.choices[key] ? `[${__("choices:")} ${self2.stringifiedValues(options.choices[key])}]` : null,
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
          self2.describe(key, descriptions[alias]);
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
  self2.cacheHelpMessage = function() {
    cachedHelpMessage = this.help();
  };
  self2.clearCachedHelpMessage = function() {
    cachedHelpMessage = void 0;
  };
  self2.hasCachedHelpMessage = function() {
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
  self2.showHelp = (level) => {
    const logger = yargs.getInternalMethods().getLoggerInstance();
    if (!level)
      level = "error";
    const emit = typeof level === "function" ? level : logger[level];
    emit(self2.help());
  };
  self2.functionDescription = (fn) => {
    const description = fn.name ? shim3.Parser.decamelize(fn.name, "-") : __("generated-value");
    return ["(", description, ")"].join("");
  };
  self2.stringifiedValues = function stringifiedValues(values2, separator) {
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
  self2.version = (ver) => {
    version = ver;
  };
  self2.showVersion = (level) => {
    const logger = yargs.getInternalMethods().getLoggerInstance();
    if (!level)
      level = "error";
    const emit = typeof level === "function" ? level : logger[level];
    emit(version);
  };
  self2.reset = function reset(localLookup) {
    failMessage = null;
    failureOutput = false;
    usages = [];
    usageDisabled = false;
    epilogs = [];
    examples = [];
    commands = [];
    descriptions = objFilter(descriptions, (k) => !localLookup[k]);
    return self2;
  };
  const frozens = [];
  self2.freeze = function freeze() {
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
  self2.unfreeze = function unfreeze() {
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
  return self2;
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
  const self2 = {};
  self2.nonOptionCount = function nonOptionCount(argv) {
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
  self2.positionalCount = function positionalCount(required, observed) {
    if (observed < required) {
      usage2.fail(__n("Not enough non-option arguments: got %s, need at least %s", "Not enough non-option arguments: got %s, need at least %s", observed, observed + "", required + ""));
    }
  };
  self2.requiredArguments = function requiredArguments(argv, demandedOptions) {
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
  self2.unknownArguments = function unknownArguments(argv, aliases, positionalMap, isDefaultCommand, checkPositionals = true) {
    var _a;
    const commandKeys = yargs.getInternalMethods().getCommandInstance().getCommands();
    const unknown = [];
    const currentContext = yargs.getInternalMethods().getContext();
    Object.keys(argv).forEach((key) => {
      if (!specialKeys.includes(key) && !Object.prototype.hasOwnProperty.call(positionalMap, key) && !Object.prototype.hasOwnProperty.call(yargs.getInternalMethods().getParseContext(), key) && !self2.isValidAndSomeAliasIsNotNew(key, aliases)) {
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
  self2.unknownCommands = function unknownCommands(argv) {
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
  self2.isValidAndSomeAliasIsNotNew = function isValidAndSomeAliasIsNotNew(key, aliases) {
    if (!Object.prototype.hasOwnProperty.call(aliases, key)) {
      return false;
    }
    const newAliases = yargs.parsed.newAliases;
    return [key, ...aliases[key]].some((a) => !Object.prototype.hasOwnProperty.call(newAliases, a) || !newAliases[key]);
  };
  self2.limitedChoices = function limitedChoices(argv) {
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
  self2.implies = function implies(key, value) {
    argsert("<string|object> [array|number|string]", [key, value], arguments.length);
    if (typeof key === "object") {
      Object.keys(key).forEach((k) => {
        self2.implies(k, key[k]);
      });
    } else {
      yargs.global(key);
      if (!implied[key]) {
        implied[key] = [];
      }
      if (Array.isArray(value)) {
        value.forEach((i) => self2.implies(key, i));
      } else {
        assertNotStrictEqual(value, void 0, shim3);
        implied[key].push(value);
      }
    }
  };
  self2.getImplied = function getImplied() {
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
  self2.implications = function implications(argv) {
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
  self2.conflicts = function conflicts(key, value) {
    argsert("<string|object> [array|string]", [key, value], arguments.length);
    if (typeof key === "object") {
      Object.keys(key).forEach((k) => {
        self2.conflicts(k, key[k]);
      });
    } else {
      yargs.global(key);
      if (!conflicting[key]) {
        conflicting[key] = [];
      }
      if (Array.isArray(value)) {
        value.forEach((i) => self2.conflicts(key, i));
      } else {
        conflicting[key].push(value);
      }
    }
  };
  self2.getConflicting = () => conflicting;
  self2.conflicting = function conflictingFn(argv) {
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
  self2.recommendCommands = function recommendCommands(cmd, potentialCommands) {
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
  self2.reset = function reset(localLookup) {
    implied = objFilter(implied, (k) => !localLookup[k]);
    conflicting = objFilter(conflicting, (k) => !localLookup[k]);
    return self2;
  };
  const frozens = [];
  self2.freeze = function freeze() {
    frozens.push({
      implied,
      conflicting
    });
  };
  self2.unfreeze = function unfreeze() {
    const frozen = frozens.pop();
    assertNotStrictEqual(frozen, void 0, shim3);
    ({ implied, conflicting } = frozen);
  };
  return self2;
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
  check(f, global2) {
    argsert("<function> [boolean]", [f, global2], arguments.length);
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
    }, false, global2);
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
  global(globals, global2) {
    argsert("<string|array> [boolean]", [globals, global2], arguments.length);
    globals = [].concat(globals);
    if (global2 !== false) {
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
  middleware(callback, applyBeforeValidation, global2) {
    return __classPrivateFieldGet(this, _YargsInstance_globalMiddleware, "f").addMiddleware(callback, !!applyBeforeValidation, global2);
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

// index.ts
var import_child_process = require("child_process");
var import_promise_retry = __toESM(require_promise_retry());
var L = __toESM(require_partial_lenses_cjs());
var writeConfigFile = (filename) => (config) => (0, import_node_sdk.writeJsonFile)(filename)(config).then(() => config).catch((err) => Promise.reject({ kind: "E_WRITE_CONFIG", context: config, previous: err }));
var run = (cmd) => new Promise((resolve5, reject) => (0, import_child_process.exec)(`flextesa_node_cors_origin='*' ${cmd}`, (err, stdout, stderr) => {
  if (err)
    reject({ kind: "E_EXEC", context: cmd, previous: err });
  else if (stderr.length)
    reject({ kind: "E_EXEC", context: { cmd, stderr } });
  else
    resolve5(stdout);
}));
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
    if (typeof accountDetailsInput !== "string") {
      const temp = {};
      temp[accountName] = parseAccountDetails(accountDetailsInput);
      return temp[accountName] ? __spreadValues(__spreadValues({}, retval), temp) : retval;
    } else {
      return __spreadProps(__spreadValues({}, retval), { default: accountDetailsInput });
    }
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
  return Promise.reject({ kind: "E_INVALID_CONFIG", context: input });
};
var getAccountKeys = (accountName) => run(`flextesa key ${accountName}`).then((result) => {
  const [alias, encryptedKey, publicKeyHash, secretKey] = result.trim().split(",");
  return { alias, encryptedKey, publicKeyHash, secretKey };
});
var addAccountKeys = (_0) => __async(exports, [_0], function* ([accountName, accountDetails]) {
  return [
    accountName,
    accountName === "default" ? accountDetails : __spreadProps(__spreadValues({}, accountDetails), { keys: yield getAccountKeys(accountName) })
  ];
});
var getBootstrapFlags = (sandboxName, config) => {
  const lens = L.compose("sandbox", sandboxName, "accounts", L.values);
  return L.collect(lens, config).reduce((retval, accountDetails) => {
    if (typeof accountDetails === "string") {
      return retval;
    }
    const { keys: keys2, initialBalance } = accountDetails;
    return [
      ...retval,
      `--add-bootstrap-account="${keys2.alias},${keys2.encryptedKey},${keys2.publicKeyHash},${keys2.secretKey}@${initialBalance}"`
    ];
  }, []).join(" ");
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
  return run(cmdArgs.join(" "));
};
var configureTezosClient = (config) => run(`tezos-client --endpoint http://localhost:20000 config update`).then(() => config);
var importAccounts = (sandboxName, config) => {
  const accountLens = L.compose("sandbox", sandboxName, "accounts", L.values, "keys");
  const processes = L.collect(accountLens, config).reduce((retval, keys2) => [
    ...retval,
    (0, import_promise_retry.default)(() => isAccountImported(keys2.alias).then((hasAccount) => hasAccount ? Promise.resolve("success") : run(`tezos-client --protocol ${config.sandbox[sandboxName].protocol} import secret key ${keys2.alias} ${keys2.secretKey} --force | tee /tmp/import-key.log`)))
  ], []);
  return Promise.all(processes).then(() => config);
};
var isAccountImported = (accountName) => run(`tezos-client list known addresses`).then((output) => output.indexOf(accountName) >= 0).catch(() => false);
var inputArgs = yargs_default(process.argv).option("config", {
  default: "/project/.taq/config.json"
}).option("sandbox", {
  default: ""
}).option("configure", {
  default: false,
  boolean: true
}).option("importAccounts", {
  default: false,
  boolean: true
}).parse();
if (!inputArgs.sandbox.length) {
  console.log({ kind: "E_INVALID_USAGE", context: inputArgs });
  process.exit(-1);
}
(0, import_node_sdk.readJsonFile)(inputArgs.config).then(parseConfig).then((config) => {
  const lens = L.compose("sandbox", inputArgs.sandbox, "accounts", L.entries);
  return L.modifyAsync(lens, addAccountKeys, config);
}).then(writeConfigFile(inputArgs.config)).then((config) => {
  if (inputArgs.configure)
    return configureTezosClient(config);
  else if (inputArgs.importAccounts)
    return importAccounts(inputArgs.sandbox, config);
  else
    return runMininet(inputArgs.sandbox)(config).then(() => config);
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
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
