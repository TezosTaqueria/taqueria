var vf = Object.create;
var cs = Object.defineProperty;
var wf = Object.getOwnPropertyDescriptor;
var bf = Object.getOwnPropertyNames;
var Af = Object.getPrototypeOf, xf = Object.prototype.hasOwnProperty;
var Y = (n, e) => () => (e || n((e = { exports: {} }).exports, e), e.exports),
	Sf = (n, e) => {
		for (var t in e) cs(n, t, { get: e[t], enumerable: !0 });
	},
	Li = (n, e, t, r) => {
		if (e && typeof e == 'object' || typeof e == 'function') {
			for (let s of bf(e)) {
				!xf.call(n, s) && s !== t
					&& cs(n, s, { get: () => e[s], enumerable: !(r = wf(e, s)) || r.enumerable });
			}
		}
		return n;
	};
var Gr = (
		n,
		e,
		t,
	) => (t = n != null ? vf(Af(n)) : {},
		Li(e || !n || !n.__esModule ? cs(t, 'default', { value: n, enumerable: !0 }) : t, n)),
	kf = n => Li(cs({}, '__esModule', { value: !0 }), n);
var ls = Y((mm, us) => {
	(function(n) {
		'use strict';
		typeof us == 'object' && typeof us.exports == 'object'
			? us.exports = n()
			: typeof define == 'function' && define.amd != null
			? define([], n)
			: self.sanctuaryTypeIdentifiers = n();
	})(function() {
		'use strict';
		var n = '@@type', e = new RegExp('^([\\s\\S]+)/([\\s\\S]+?)(?:@([0-9]+))?$');
		function t(r) {
			return r != null && r.constructor != null && r.constructor.prototype !== r && typeof r[n] == 'string'
				? r[n]
				: Object.prototype.toString.call(r).slice(8, -1);
		}
		return t.parse = function(s) {
			var o = null, a = s, i = 0, c = e.exec(s);
			return c != null && (o = c[1], a = c[2], c[3] != null && (i = Number(c[3]))),
				{ namespace: o, name: a, version: i };
		},
			t;
	});
});
var qi = Y((Am, hs) => {
	(function(n) {
		'use strict';
		typeof hs == 'object' && typeof hs.exports == 'object'
			? hs.exports = n()
			: typeof define == 'function' && define.amd != null
			? define([], n)
			: self.sanctuaryShow = n();
	})(function() {
		'use strict';
		var n = '@@show', e = [];
		function t(o) {
			return function(a) {
				return s(a) + ': ' + s(o[a]);
			};
		}
		function r(o) {
			return Object.keys(o).sort();
		}
		function s(o) {
			if (e.indexOf(o) >= 0) return '<Circular>';
			switch (Object.prototype.toString.call(o)) {
				case '[object Boolean]':
					return typeof o == 'object' ? 'new Boolean (' + s(o.valueOf()) + ')' : o.toString();
				case '[object Number]':
					return typeof o == 'object'
						? 'new Number (' + s(o.valueOf()) + ')'
						: 1 / o === -1 / 0
						? '-0'
						: o.toString(10);
				case '[object String]':
					return typeof o == 'object' ? 'new String (' + s(o.valueOf()) + ')' : JSON.stringify(o);
				case '[object Date]':
					return 'new Date (' + s(isNaN(o.valueOf()) ? NaN : o.toISOString()) + ')';
				case '[object Error]':
					return 'new ' + o.name + ' (' + s(o.message) + ')';
				case '[object Arguments]':
					return 'function () { return arguments; } (' + Array.prototype.map.call(o, s).join(', ') + ')';
				case '[object Array]':
					e.push(o);
					try {
						return '[' + o.map(s).concat(
							r(o).filter(function(a) {
								return !/^\d+$/.test(a);
							}).map(t(o)),
						).join(', ') + ']';
					} finally {
						e.pop();
					}
				case '[object Object]':
					e.push(o);
					try {
						return n in o && (o.constructor == null || o.constructor.prototype !== o)
							? o[n]()
							: '{' + r(o).map(t(o)).join(', ') + '}';
					} finally {
						e.pop();
					}
				case '[object Set]':
					e.push(o);
					try {
						return 'new Set (' + s(Array.from(o.values())) + ')';
					} finally {
						e.pop();
					}
				case '[object Map]':
					e.push(o);
					try {
						return 'new Map (' + s(Array.from(o.entries())) + ')';
					} finally {
						e.pop();
					}
				default:
					return String(o);
			}
		}
		return s;
	});
});
var Qt = Y(Xt => {
	'use strict';
	Object.defineProperty(Xt, '__esModule', { value: !0 });
	var Tp = '[object ArrayBuffer]',
		De = class {
			static isArrayBuffer(e) {
				return Object.prototype.toString.call(e) === Tp;
			}
			static toArrayBuffer(e) {
				return this.isArrayBuffer(e)
					? e
					: e.byteLength === e.buffer.byteLength
					? e.buffer
					: this.toUint8Array(e).slice().buffer;
			}
			static toUint8Array(e) {
				return this.toView(e, Uint8Array);
			}
			static toView(e, t) {
				if (e.constructor === t) return e;
				if (this.isArrayBuffer(e)) return new t(e);
				if (this.isArrayBufferView(e)) return new t(e.buffer, e.byteOffset, e.byteLength);
				throw new TypeError("The provided value is not of type '(ArrayBuffer or ArrayBufferView)'");
			}
			static isBufferSource(e) {
				return this.isArrayBufferView(e) || this.isArrayBuffer(e);
			}
			static isArrayBufferView(e) {
				return ArrayBuffer.isView(e) || e && this.isArrayBuffer(e.buffer);
			}
			static isEqual(e, t) {
				let r = De.toUint8Array(e), s = De.toUint8Array(t);
				if (r.length !== s.byteLength) return !1;
				for (let o = 0; o < r.length; o++) if (r[o] !== s[o]) return !1;
				return !0;
			}
			static concat(...e) {
				if (Array.isArray(e[0])) {
					let t = e[0], r = 0;
					for (let a of t) r += a.byteLength;
					let s = new Uint8Array(r), o = 0;
					for (let a of t) {
						let i = this.toUint8Array(a);
						s.set(i, o), o += i.length;
					}
					return e[1] ? this.toView(s, e[1]) : s.buffer;
				} else return this.concat(e);
			}
		},
		Es = class {
			static fromString(e) {
				let t = unescape(encodeURIComponent(e)), r = new Uint8Array(t.length);
				for (let s = 0; s < t.length; s++) r[s] = t.charCodeAt(s);
				return r.buffer;
			}
			static toString(e) {
				let t = De.toUint8Array(e), r = '';
				for (let o = 0; o < t.length; o++) r += String.fromCharCode(t[o]);
				return decodeURIComponent(escape(r));
			}
		},
		Le = class {
			static toString(e, t = !1) {
				let r = De.toArrayBuffer(e), s = new DataView(r), o = '';
				for (let a = 0; a < r.byteLength; a += 2) {
					let i = s.getUint16(a, t);
					o += String.fromCharCode(i);
				}
				return o;
			}
			static fromString(e, t = !1) {
				let r = new ArrayBuffer(e.length * 2), s = new DataView(r);
				for (let o = 0; o < e.length; o++) s.setUint16(o * 2, e.charCodeAt(o), t);
				return r;
			}
		},
		lt = class {
			static isHex(e) {
				return typeof e == 'string' && /^[a-z0-9]+$/i.test(e);
			}
			static isBase64(e) {
				return typeof e == 'string' && /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e);
			}
			static isBase64Url(e) {
				return typeof e == 'string' && /^[a-zA-Z0-9-_]+$/i.test(e);
			}
			static ToString(e, t = 'utf8') {
				let r = De.toUint8Array(e);
				switch (t.toLowerCase()) {
					case 'utf8':
						return this.ToUtf8String(r);
					case 'binary':
						return this.ToBinary(r);
					case 'hex':
						return this.ToHex(r);
					case 'base64':
						return this.ToBase64(r);
					case 'base64url':
						return this.ToBase64Url(r);
					case 'utf16le':
						return Le.toString(r, !0);
					case 'utf16':
					case 'utf16be':
						return Le.toString(r);
					default:
						throw new Error(`Unknown type of encoding '${t}'`);
				}
			}
			static FromString(e, t = 'utf8') {
				if (!e) return new ArrayBuffer(0);
				switch (t.toLowerCase()) {
					case 'utf8':
						return this.FromUtf8String(e);
					case 'binary':
						return this.FromBinary(e);
					case 'hex':
						return this.FromHex(e);
					case 'base64':
						return this.FromBase64(e);
					case 'base64url':
						return this.FromBase64Url(e);
					case 'utf16le':
						return Le.fromString(e, !0);
					case 'utf16':
					case 'utf16be':
						return Le.fromString(e);
					default:
						throw new Error(`Unknown type of encoding '${t}'`);
				}
			}
			static ToBase64(e) {
				let t = De.toUint8Array(e);
				if (typeof btoa < 'u') {
					let r = this.ToString(t, 'binary');
					return btoa(r);
				} else return Buffer.from(t).toString('base64');
			}
			static FromBase64(e) {
				let t = this.formatString(e);
				if (!t) return new ArrayBuffer(0);
				if (!lt.isBase64(t)) throw new TypeError("Argument 'base64Text' is not Base64 encoded");
				return typeof atob < 'u' ? this.FromBinary(atob(t)) : new Uint8Array(Buffer.from(t, 'base64')).buffer;
			}
			static FromBase64Url(e) {
				let t = this.formatString(e);
				if (!t) return new ArrayBuffer(0);
				if (!lt.isBase64Url(t)) throw new TypeError("Argument 'base64url' is not Base64Url encoded");
				return this.FromBase64(this.Base64Padding(t.replace(/\-/g, '+').replace(/\_/g, '/')));
			}
			static ToBase64Url(e) {
				return this.ToBase64(e).replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '');
			}
			static FromUtf8String(e, t = lt.DEFAULT_UTF8_ENCODING) {
				switch (t) {
					case 'ascii':
						return this.FromBinary(e);
					case 'utf8':
						return Es.fromString(e);
					case 'utf16':
					case 'utf16be':
						return Le.fromString(e);
					case 'utf16le':
					case 'usc2':
						return Le.fromString(e, !0);
					default:
						throw new Error(`Unknown type of encoding '${t}'`);
				}
			}
			static ToUtf8String(e, t = lt.DEFAULT_UTF8_ENCODING) {
				switch (t) {
					case 'ascii':
						return this.ToBinary(e);
					case 'utf8':
						return Es.toString(e);
					case 'utf16':
					case 'utf16be':
						return Le.toString(e);
					case 'utf16le':
					case 'usc2':
						return Le.toString(e, !0);
					default:
						throw new Error(`Unknown type of encoding '${t}'`);
				}
			}
			static FromBinary(e) {
				let t = e.length, r = new Uint8Array(t);
				for (let s = 0; s < t; s++) r[s] = e.charCodeAt(s);
				return r.buffer;
			}
			static ToBinary(e) {
				let t = De.toUint8Array(e), r = '';
				for (let s = 0; s < t.length; s++) r += String.fromCharCode(t[s]);
				return r;
			}
			static ToHex(e) {
				let t = De.toUint8Array(e), r = '', s = [], o = t.length;
				for (let a = 0; a < o; a++) {
					let i = t[a].toString(16).padStart(2, '0');
					s.push(i);
				}
				return s.join(r);
			}
			static FromHex(e) {
				let t = this.formatString(e);
				if (!t) return new ArrayBuffer(0);
				if (!lt.isHex(t)) throw new TypeError("Argument 'hexString' is not HEX encoded");
				t.length % 2 && (t = `0${t}`);
				let r = new Uint8Array(t.length / 2);
				for (let s = 0; s < t.length; s = s + 2) {
					let o = t.slice(s, s + 2);
					r[s / 2] = parseInt(o, 16);
				}
				return r.buffer;
			}
			static ToUtf16String(e, t = !1) {
				return Le.toString(e, t);
			}
			static FromUtf16String(e, t = !1) {
				return Le.fromString(e, t);
			}
			static Base64Padding(e) {
				let t = 4 - e.length % 4;
				if (t < 4) for (let r = 0; r < t; r++) e += '=';
				return e;
			}
			static formatString(e) {
				return e?.replace(/[\n\r\t ]/g, '') || '';
			}
		};
	lt.DEFAULT_UTF8_ENCODING = 'utf8';
	function Np(n, ...e) {
		let t = arguments[0];
		for (let r = 1; r < arguments.length; r++) {
			let s = arguments[r];
			for (let o in s) t[o] = s[o];
		}
		return t;
	}
	function Ip(...n) {
		let e = n.map(s => s.byteLength).reduce((s, o) => s + o), t = new Uint8Array(e), r = 0;
		return n.map(s => new Uint8Array(s)).forEach(s => {
			for (let o of s) t[r++] = o;
		}),
			t.buffer;
	}
	function Kp(n, e) {
		if (!(n && e) || n.byteLength !== e.byteLength) return !1;
		let t = new Uint8Array(n), r = new Uint8Array(e);
		for (let s = 0; s < n.byteLength; s++) if (t[s] !== r[s]) return !1;
		return !0;
	}
	Xt.BufferSourceConverter = De;
	Xt.Convert = lt;
	Xt.assign = Np;
	Xt.combine = Ip;
	Xt.isEqual = Kp;
});
var Ir = Y((gA, Ns) => {
	var su, ou, au, iu, cu, uu, lu, fu, hu, Ps, la, pu, du, mu, Nr, yu, gu, vu, wu, bu, Au, xu, Su, ku, Ts;
	(function(n) {
		var e = typeof global == 'object' ? global : typeof self == 'object' ? self : typeof this == 'object' ? this : {};
		typeof define == 'function' && define.amd
			? define('tslib', ['exports'], function(r) {
				n(t(e, t(r)));
			})
			: typeof Ns == 'object' && typeof Ns.exports == 'object'
			? n(t(e, t(Ns.exports)))
			: n(t(e));
		function t(r, s) {
			return r !== e
				&& (typeof Object.create == 'function'
					? Object.defineProperty(r, '__esModule', { value: !0 })
					: r.__esModule = !0),
				function(o, a) {
					return r[o] = s ? s(o, a) : a;
				};
		}
	})(function(n) {
		var e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, s) {
					r.__proto__ = s;
				}
			|| function(r, s) {
				for (var o in s) Object.prototype.hasOwnProperty.call(s, o) && (r[o] = s[o]);
			};
		su = function(r, s) {
			if (typeof s != 'function' && s !== null) {
				throw new TypeError('Class extends value ' + String(s) + ' is not a constructor or null');
			}
			e(r, s);
			function o() {
				this.constructor = r;
			}
			r.prototype = s === null ? Object.create(s) : (o.prototype = s.prototype, new o());
		},
			ou = Object.assign || function(r) {
				for (var s, o = 1, a = arguments.length; o < a; o++) {
					s = arguments[o];
					for (var i in s) Object.prototype.hasOwnProperty.call(s, i) && (r[i] = s[i]);
				}
				return r;
			},
			au = function(r, s) {
				var o = {};
				for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && s.indexOf(a) < 0 && (o[a] = r[a]);
				if (r != null && typeof Object.getOwnPropertySymbols == 'function') {
					for (var i = 0, a = Object.getOwnPropertySymbols(r); i < a.length; i++) {
						s.indexOf(a[i]) < 0 && Object.prototype.propertyIsEnumerable.call(r, a[i]) && (o[a[i]] = r[a[i]]);
					}
				}
				return o;
			},
			iu = function(r, s, o, a) {
				var i = arguments.length, c = i < 3 ? s : a === null ? a = Object.getOwnPropertyDescriptor(s, o) : a, u;
				if (typeof Reflect == 'object' && typeof Reflect.decorate == 'function') c = Reflect.decorate(r, s, o, a);
				else {
					for (var l = r.length - 1; l >= 0; l--) {
						(u = r[l]) && (c = (i < 3 ? u(c) : i > 3 ? u(s, o, c) : u(s, o)) || c);
					}
				}
				return i > 3 && c && Object.defineProperty(s, o, c), c;
			},
			cu = function(r, s) {
				return function(o, a) {
					s(o, a, r);
				};
			},
			uu = function(r, s) {
				if (typeof Reflect == 'object' && typeof Reflect.metadata == 'function') return Reflect.metadata(r, s);
			},
			lu = function(r, s, o, a) {
				function i(c) {
					return c instanceof o ? c : new o(function(u) {
						u(c);
					});
				}
				return new (o || (o = Promise))(function(c, u) {
					function l(y) {
						try {
							d(a.next(y));
						} catch (x) {
							u(x);
						}
					}
					function f(y) {
						try {
							d(a.throw(y));
						} catch (x) {
							u(x);
						}
					}
					function d(y) {
						y.done ? c(y.value) : i(y.value).then(l, f);
					}
					d((a = a.apply(r, s || [])).next());
				});
			},
			fu = function(r, s) {
				var o = {
						label: 0,
						sent: function() {
							if (c[0] & 1) throw c[1];
							return c[1];
						},
						trys: [],
						ops: [],
					},
					a,
					i,
					c,
					u;
				return u = { next: l(0), throw: l(1), return: l(2) },
					typeof Symbol == 'function' && (u[Symbol.iterator] = function() {
						return this;
					}),
					u;
				function l(d) {
					return function(y) {
						return f([d, y]);
					};
				}
				function f(d) {
					if (a) throw new TypeError('Generator is already executing.');
					for (; o;) {
						try {
							if (
								a = 1,
									i && (c = d[0] & 2 ? i.return : d[0] ? i.throw || ((c = i.return) && c.call(i), 0) : i.next)
									&& !(c = c.call(i, d[1])).done
							) {
								return c;
							}
							switch (i = 0, c && (d = [d[0] & 2, c.value]), d[0]) {
								case 0:
								case 1:
									c = d;
									break;
								case 4:
									return o.label++, { value: d[1], done: !1 };
								case 5:
									o.label++, i = d[1], d = [0];
									continue;
								case 7:
									d = o.ops.pop(), o.trys.pop();
									continue;
								default:
									if (c = o.trys, !(c = c.length > 0 && c[c.length - 1]) && (d[0] === 6 || d[0] === 2)) {
										o = 0;
										continue;
									}
									if (d[0] === 3 && (!c || d[1] > c[0] && d[1] < c[3])) {
										o.label = d[1];
										break;
									}
									if (d[0] === 6 && o.label < c[1]) {
										o.label = c[1], c = d;
										break;
									}
									if (c && o.label < c[2]) {
										o.label = c[2], o.ops.push(d);
										break;
									}
									c[2] && o.ops.pop(), o.trys.pop();
									continue;
							}
							d = s.call(r, o);
						} catch (y) {
							d = [6, y], i = 0;
						} finally {
							a = c = 0;
						}
					}
					if (d[0] & 5) throw d[1];
					return { value: d[0] ? d[1] : void 0, done: !0 };
				}
			},
			hu = function(r, s) {
				for (var o in r) o !== 'default' && !Object.prototype.hasOwnProperty.call(s, o) && Ts(s, r, o);
			},
			Ts = Object.create
				? function(r, s, o, a) {
					a === void 0 && (a = o);
					var i = Object.getOwnPropertyDescriptor(s, o);
					(!i || ('get' in i ? !s.__esModule : i.writable || i.configurable))
					&& (i = {
						enumerable: !0,
						get: function() {
							return s[o];
						},
					}), Object.defineProperty(r, a, i);
				}
				: function(r, s, o, a) {
					a === void 0 && (a = o), r[a] = s[o];
				},
			Ps = function(r) {
				var s = typeof Symbol == 'function' && Symbol.iterator, o = s && r[s], a = 0;
				if (o) return o.call(r);
				if (r && typeof r.length == 'number') {
					return {
						next: function() {
							return r && a >= r.length && (r = void 0), { value: r && r[a++], done: !r };
						},
					};
				}
				throw new TypeError(s ? 'Object is not iterable.' : 'Symbol.iterator is not defined.');
			},
			la = function(r, s) {
				var o = typeof Symbol == 'function' && r[Symbol.iterator];
				if (!o) return r;
				var a = o.call(r), i, c = [], u;
				try {
					for (; (s === void 0 || s-- > 0) && !(i = a.next()).done;) c.push(i.value);
				} catch (l) {
					u = { error: l };
				} finally {
					try {
						i && !i.done && (o = a.return) && o.call(a);
					} finally {
						if (u) throw u.error;
					}
				}
				return c;
			},
			pu = function() {
				for (var r = [], s = 0; s < arguments.length; s++) r = r.concat(la(arguments[s]));
				return r;
			},
			du = function() {
				for (var r = 0, s = 0, o = arguments.length; s < o; s++) r += arguments[s].length;
				for (var a = Array(r), i = 0, s = 0; s < o; s++) {
					for (
						var c = arguments[s], u = 0, l = c.length;
						u < l;
						u++, i++
					) {
						a[i] = c[u];
					}
				}
				return a;
			},
			mu = function(r, s, o) {
				if (o || arguments.length === 2) {
					for (var a = 0, i = s.length, c; a < i; a++) {
						(c || !(a in s))
							&& (c || (c = Array.prototype.slice.call(s, 0, a)), c[a] = s[a]);
					}
				}
				return r.concat(c || Array.prototype.slice.call(s));
			},
			Nr = function(r) {
				return this instanceof Nr ? (this.v = r, this) : new Nr(r);
			},
			yu = function(r, s, o) {
				if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
				var a = o.apply(r, s || []), i, c = [];
				return i = {},
					u('next'),
					u('throw'),
					u('return'),
					i[Symbol.asyncIterator] = function() {
						return this;
					},
					i;
				function u(N) {
					a[N] && (i[N] = function(H) {
						return new Promise(function(L, gt) {
							c.push([N, H, L, gt]) > 1 || l(N, H);
						});
					});
				}
				function l(N, H) {
					try {
						f(a[N](H));
					} catch (L) {
						x(c[0][3], L);
					}
				}
				function f(N) {
					N.value instanceof Nr ? Promise.resolve(N.value.v).then(d, y) : x(c[0][2], N);
				}
				function d(N) {
					l('next', N);
				}
				function y(N) {
					l('throw', N);
				}
				function x(N, H) {
					N(H), c.shift(), c.length && l(c[0][0], c[0][1]);
				}
			},
			gu = function(r) {
				var s, o;
				return s = {},
					a('next'),
					a('throw', function(i) {
						throw i;
					}),
					a('return'),
					s[Symbol.iterator] = function() {
						return this;
					},
					s;
				function a(i, c) {
					s[i] = r[i]
						? function(u) {
							return (o = !o) ? { value: Nr(r[i](u)), done: i === 'return' } : c ? c(u) : u;
						}
						: c;
				}
			},
			vu = function(r) {
				if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
				var s = r[Symbol.asyncIterator], o;
				return s
					? s.call(r)
					: (r = typeof Ps == 'function' ? Ps(r) : r[Symbol.iterator](),
						o = {},
						a('next'),
						a('throw'),
						a('return'),
						o[Symbol.asyncIterator] = function() {
							return this;
						},
						o);
				function a(c) {
					o[c] = r[c] && function(u) {
						return new Promise(function(l, f) {
							u = r[c](u), i(l, f, u.done, u.value);
						});
					};
				}
				function i(c, u, l, f) {
					Promise.resolve(f).then(function(d) {
						c({ value: d, done: l });
					}, u);
				}
			},
			wu = function(r, s) {
				return Object.defineProperty ? Object.defineProperty(r, 'raw', { value: s }) : r.raw = s, r;
			};
		var t = Object.create
			? function(r, s) {
				Object.defineProperty(r, 'default', { enumerable: !0, value: s });
			}
			: function(r, s) {
				r.default = s;
			};
		bu = function(r) {
			if (r && r.__esModule) return r;
			var s = {};
			if (r != null) for (var o in r) o !== 'default' && Object.prototype.hasOwnProperty.call(r, o) && Ts(s, r, o);
			return t(s, r), s;
		},
			Au = function(r) {
				return r && r.__esModule ? r : { default: r };
			},
			xu = function(r, s, o, a) {
				if (o === 'a' && !a) throw new TypeError('Private accessor was defined without a getter');
				if (typeof s == 'function' ? r !== s || !a : !s.has(r)) {
					throw new TypeError(
						'Cannot read private member from an object whose class did not declare it',
					);
				}
				return o === 'm' ? a : o === 'a' ? a.call(r) : a ? a.value : s.get(r);
			},
			Su = function(r, s, o, a, i) {
				if (a === 'm') throw new TypeError('Private method is not writable');
				if (a === 'a' && !i) throw new TypeError('Private accessor was defined without a setter');
				if (typeof s == 'function' ? r !== s || !i : !s.has(r)) {
					throw new TypeError(
						'Cannot write private member to an object whose class did not declare it',
					);
				}
				return a === 'a' ? i.call(r, o) : i ? i.value = o : s.set(r, o), o;
			},
			ku = function(r, s) {
				if (s === null || typeof s != 'object' && typeof s != 'function') {
					throw new TypeError(
						"Cannot use 'in' operator on non-object",
					);
				}
				return typeof r == 'function' ? s === r : r.has(s);
			},
			n('__extends', su),
			n('__assign', ou),
			n('__rest', au),
			n('__decorate', iu),
			n('__param', cu),
			n('__metadata', uu),
			n('__awaiter', lu),
			n('__generator', fu),
			n('__exportStar', hu),
			n('__createBinding', Ts),
			n('__values', Ps),
			n('__read', la),
			n('__spread', pu),
			n('__spreadArrays', du),
			n('__spreadArray', mu),
			n('__await', Nr),
			n('__asyncGenerator', yu),
			n('__asyncDelegator', gu),
			n('__asyncValues', vu),
			n('__makeTemplateObject', wu),
			n('__importStar', bu),
			n('__importDefault', Au),
			n('__classPrivateFieldGet', xu),
			n('__classPrivateFieldSet', Su),
			n('__classPrivateFieldIn', ku);
	});
});
var Cu = Y(ie => {
	'use strict';
	Object.defineProperty(ie, '__esModule', { value: !0 });
	function Op(n) {
		return new Date(n.getTime() + n.getTimezoneOffset() * 6e4);
	}
	function Up(n, e, t) {
		var r;
		return n instanceof Object && (r = n[e]) !== null && r !== void 0 ? r : t;
	}
	function $p(n, e = 0, t = n.byteLength - e, r = !1) {
		let s = '';
		for (let o of new Uint8Array(n, e, t)) {
			let a = o.toString(16).toUpperCase();
			a.length === 1 && (s += '0'), s += a, r && (s += ' ');
		}
		return s.trim();
	}
	function Rp(n, e, t, r) {
		return e instanceof ArrayBuffer
			? e.byteLength
				? t < 0
					? (n.error = 'Wrong parameter: inputOffset less than zero', !1)
					: r < 0
					? (n.error = 'Wrong parameter: inputLength less than zero', !1)
					: e.byteLength - t - r < 0
					? (n.error = 'End of input reached before message was fully decoded (inconsistent offset and length values)',
						!1)
					: !0
				: (n.error = 'Wrong parameter: inputBuffer has zero length', !1)
			: (n.error = 'Wrong parameter: inputBuffer must be "ArrayBuffer"', !1);
	}
	function fa(n, e) {
		let t = 0;
		if (n.length === 1) return n[0];
		for (let r = n.length - 1; r >= 0; r--) t += n[n.length - 1 - r] * Math.pow(2, e * r);
		return t;
	}
	function ha(n, e, t = -1) {
		let r = t, s = n, o = 0, a = Math.pow(2, e);
		for (let i = 1; i < 8; i++) {
			if (n < a) {
				let c;
				if (r < 0) c = new ArrayBuffer(i), o = i;
				else {
					if (r < i) return new ArrayBuffer(0);
					c = new ArrayBuffer(r), o = r;
				}
				let u = new Uint8Array(c);
				for (let l = i - 1; l >= 0; l--) {
					let f = Math.pow(2, l * e);
					u[o - l - 1] = Math.floor(s / f), s -= u[o - l - 1] * f;
				}
				return c;
			}
			a *= Math.pow(2, e);
		}
		return new ArrayBuffer(0);
	}
	function jp(...n) {
		let e = 0, t = 0;
		for (let o of n) e += o.byteLength;
		let r = new ArrayBuffer(e), s = new Uint8Array(r);
		for (let o of n) s.set(new Uint8Array(o), t), t += o.byteLength;
		return r;
	}
	function Vp(...n) {
		let e = 0, t = 0;
		for (let o of n) e += o.length;
		let r = new ArrayBuffer(e), s = new Uint8Array(r);
		for (let o of n) s.set(o, t), t += o.length;
		return s;
	}
	function Hp() {
		let n = new Uint8Array(this.valueHex);
		if (this.valueHex.byteLength >= 2) {
			let i = n[0] === 255 && n[1] & 128, c = n[0] === 0 && (n[1] & 128) === 0;
			(i || c) && this.warnings.push('Needlessly long format');
		}
		let e = new ArrayBuffer(this.valueHex.byteLength), t = new Uint8Array(e);
		for (let i = 0; i < this.valueHex.byteLength; i++) t[i] = 0;
		t[0] = n[0] & 128;
		let r = fa(t, 8), s = new ArrayBuffer(this.valueHex.byteLength), o = new Uint8Array(s);
		for (let i = 0; i < this.valueHex.byteLength; i++) o[i] = n[i];
		return o[0] &= 127, fa(o, 8) - r;
	}
	function Mp(n) {
		let e = n < 0 ? n * -1 : n, t = 128;
		for (let r = 1; r < 8; r++) {
			if (e <= t) {
				if (n < 0) {
					let a = t - e, i = ha(a, 8, r), c = new Uint8Array(i);
					return c[0] |= 128, i;
				}
				let s = ha(e, 8, r), o = new Uint8Array(s);
				if (o[0] & 128) {
					let a = s.slice(0), i = new Uint8Array(a);
					s = new ArrayBuffer(s.byteLength + 1), o = new Uint8Array(s);
					for (let c = 0; c < a.byteLength; c++) o[c + 1] = i[c];
					o[0] = 0;
				}
				return s;
			}
			t *= Math.pow(2, 8);
		}
		return new ArrayBuffer(0);
	}
	function Lp(n, e) {
		if (n.byteLength !== e.byteLength) return !1;
		let t = new Uint8Array(n), r = new Uint8Array(e);
		for (let s = 0; s < t.length; s++) if (t[s] !== r[s]) return !1;
		return !0;
	}
	function Dp(n, e) {
		let t = n.toString(10);
		if (e < t.length) return '';
		let r = e - t.length, s = new Array(r);
		for (let a = 0; a < r; a++) s[a] = '0';
		return s.join('').concat(t);
	}
	var Bu = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
		_u = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=';
	function Fp(n, e = !1, t = !1, r = !1) {
		let s = 0, o = 0, a = 0, i = '', c = e ? _u : Bu;
		if (r) {
			let u = 0;
			for (let l = 0; l < n.length; l++) {
				if (n.charCodeAt(l) !== 0) {
					u = l;
					break;
				}
			}
			n = n.slice(u);
		}
		for (; s < n.length;) {
			let u = n.charCodeAt(s++);
			s >= n.length && (o = 1);
			let l = n.charCodeAt(s++);
			s >= n.length && (a = 1);
			let f = n.charCodeAt(s++), d = u >> 2, y = (u & 3) << 4 | l >> 4, x = (l & 15) << 2 | f >> 6, N = f & 63;
			o === 1 ? x = N = 64 : a === 1 && (N = 64),
				t
					? x === 64
						? i += `${c.charAt(d)}${c.charAt(y)}`
						: N === 64
						? i += `${c.charAt(d)}${c.charAt(y)}${c.charAt(x)}`
						: i += `${c.charAt(d)}${c.charAt(y)}${c.charAt(x)}${c.charAt(N)}`
					: i += `${c.charAt(d)}${c.charAt(y)}${c.charAt(x)}${c.charAt(N)}`;
		}
		return i;
	}
	function zp(n, e = !1, t = !1) {
		let r = e ? _u : Bu;
		function s(c) {
			for (let u = 0; u < 64; u++) if (r.charAt(u) === c) return u;
			return 64;
		}
		function o(c) {
			return c === 64 ? 0 : c;
		}
		let a = 0, i = '';
		for (; a < n.length;) {
			let c = s(n.charAt(a++)),
				u = a >= n.length ? 0 : s(n.charAt(a++)),
				l = a >= n.length ? 0 : s(n.charAt(a++)),
				f = a >= n.length ? 0 : s(n.charAt(a++)),
				d = o(c) << 2 | o(u) >> 4,
				y = (o(u) & 15) << 4 | o(l) >> 2,
				x = (o(l) & 3) << 6 | o(f);
			i += String.fromCharCode(d), l !== 64 && (i += String.fromCharCode(y)), f !== 64 && (i += String.fromCharCode(x));
		}
		if (t) {
			let c = i.length, u = -1;
			for (let l = c - 1; l >= 0; l--) {
				if (i.charCodeAt(l) !== 0) {
					u = l;
					break;
				}
			}
			u !== -1 ? i = i.slice(0, u + 1) : i = '';
		}
		return i;
	}
	function Jp(n) {
		let e = '', t = new Uint8Array(n);
		for (let r of t) e += String.fromCharCode(r);
		return e;
	}
	function qp(n) {
		let e = n.length, t = new ArrayBuffer(e), r = new Uint8Array(t);
		for (let s = 0; s < e; s++) r[s] = n.charCodeAt(s);
		return t;
	}
	var Gp = Math.log(2);
	function Zp(n) {
		let e = Math.log(n) / Gp, t = Math.floor(e), r = Math.round(e);
		return t === r ? t : r;
	}
	function Wp(n, e) {
		for (let t of e) delete n[t];
	}
	ie.arrayBufferToString = Jp;
	ie.bufferToHexCodes = $p;
	ie.checkBufferParams = Rp;
	ie.clearProps = Wp;
	ie.fromBase64 = zp;
	ie.getParametersValue = Up;
	ie.getUTCDate = Op;
	ie.isEqualBuffer = Lp;
	ie.nearestPowerOf2 = Zp;
	ie.padNumber = Dp;
	ie.stringToArrayBuffer = qp;
	ie.toBase64 = Fp;
	ie.utilConcatBuf = jp;
	ie.utilConcatView = Vp;
	ie.utilDecodeTC = Hp;
	ie.utilEncodeTC = Mp;
	ie.utilFromBase = fa;
	ie.utilToBase = ha;
});
var Ct = Y(C => {
	'use strict';
	Object.defineProperty(C, '__esModule', { value: !0 });
	var Yp = Qt(), Xp = Cu();
	function Nu(n) {
		if (n && n.__esModule) return n;
		var e = Object.create(null);
		return n && Object.keys(n).forEach(function(t) {
			if (t !== 'default') {
				var r = Object.getOwnPropertyDescriptor(n, t);
				Object.defineProperty(
					e,
					t,
					r.get ? r : {
						enumerable: !0,
						get: function() {
							return n[t];
						},
					},
				);
			}
		}),
			e.default = n,
			Object.freeze(e);
	}
	var $ = Nu(Yp), z = Nu(Xp);
	function Is() {
		if (typeof BigInt > 'u') throw new Error("BigInt is not defined. Your environment doesn't implement BigInt.");
	}
	function ma(n) {
		let e = 0, t = 0;
		for (let s = 0; s < n.length; s++) e += n[s].byteLength;
		let r = new Uint8Array(e);
		for (let s = 0; s < n.length; s++) {
			let o = n[s];
			r.set(new Uint8Array(o), t), t += o.byteLength;
		}
		return r.buffer;
	}
	function _t(n, e, t, r) {
		return e instanceof Uint8Array
			? e.byteLength
				? t < 0
					? (n.error = 'Wrong parameter: inputOffset less than zero', !1)
					: r < 0
					? (n.error = 'Wrong parameter: inputLength less than zero', !1)
					: e.byteLength - t - r < 0
					? (n.error = 'End of input reached before message was fully decoded (inconsistent offset and length values)',
						!1)
					: !0
				: (n.error = 'Wrong parameter: inputBuffer has zero length', !1)
			: (n.error = "Wrong parameter: inputBuffer must be 'Uint8Array'", !1);
	}
	var Or = class {
			constructor() {
				this.items = [];
			}
			write(e) {
				this.items.push(e);
			}
			final() {
				return ma(this.items);
			}
		},
		un = [new Uint8Array([1])],
		Eu = '0123456789',
		pa = 'name',
		Pu = 'valueHexView',
		Qp = 'isHexOnly',
		ed = 'idBlock',
		td = 'tagClass',
		rd = 'tagNumber',
		nd = 'isConstructed',
		sd = 'fromBER',
		od = 'toBER',
		ad = 'local',
		Ce = '',
		Ye = new ArrayBuffer(0),
		Gs = new Uint8Array(0),
		ln = 'EndOfContent',
		Iu = 'OCTET STRING',
		Ku = 'BIT STRING';
	function dt(n) {
		var e;
		return e = class extends n {
			constructor(...r) {
				var s;
				super(...r);
				let o = r[0] || {};
				this.isHexOnly = (s = o.isHexOnly) !== null && s !== void 0 ? s : !1,
					this.valueHexView = o.valueHex ? $.BufferSourceConverter.toUint8Array(o.valueHex) : Gs;
			}
			get valueHex() {
				return this.valueHexView.slice().buffer;
			}
			set valueHex(r) {
				this.valueHexView = new Uint8Array(r);
			}
			fromBER(r, s, o) {
				let a = r instanceof ArrayBuffer ? new Uint8Array(r) : r;
				if (!_t(this, a, s, o)) return -1;
				let i = s + o;
				return this.valueHexView = a.subarray(s, i),
					this.valueHexView.length ? (this.blockLength = o, i) : (this.warnings.push('Zero buffer length'), s);
			}
			toBER(r = !1) {
				return this.isHexOnly
					? r
						? new ArrayBuffer(this.valueHexView.byteLength)
						: this.valueHexView.byteLength === this.valueHexView.buffer.byteLength
						? this.valueHexView.buffer
						: this.valueHexView.slice().buffer
					: (this.error = "Flag 'isHexOnly' is not set, abort", Ye);
			}
			toJSON() {
				return { ...super.toJSON(), isHexOnly: this.isHexOnly, valueHex: $.Convert.ToHex(this.valueHexView) };
			}
		},
			e.NAME = 'hexBlock',
			e;
	}
	var kt = class {
		constructor({ blockLength: e = 0, error: t = Ce, warnings: r = [], valueBeforeDecode: s = Gs } = {}) {
			this.blockLength = e,
				this.error = t,
				this.warnings = r,
				this.valueBeforeDecodeView = $.BufferSourceConverter.toUint8Array(s);
		}
		static blockName() {
			return this.NAME;
		}
		get valueBeforeDecode() {
			return this.valueBeforeDecodeView.slice().buffer;
		}
		set valueBeforeDecode(e) {
			this.valueBeforeDecodeView = new Uint8Array(e);
		}
		toJSON() {
			return {
				blockName: this.constructor.NAME,
				blockLength: this.blockLength,
				error: this.error,
				warnings: this.warnings,
				valueBeforeDecode: $.Convert.ToHex(this.valueBeforeDecodeView),
			};
		}
	};
	kt.NAME = 'baseBlock';
	var ye = class extends kt {
		fromBER(e, t, r) {
			throw TypeError("User need to make a specific function in a class which extends 'ValueBlock'");
		}
		toBER(e, t) {
			throw TypeError("User need to make a specific function in a class which extends 'ValueBlock'");
		}
	};
	ye.NAME = 'valueBlock';
	var Ks = class extends dt(kt) {
		constructor({ idBlock: e = {} } = {}) {
			var t, r, s, o;
			super(),
				e
					? (this.isHexOnly = (t = e.isHexOnly) !== null && t !== void 0 ? t : !1,
						this.valueHexView = e.valueHex ? $.BufferSourceConverter.toUint8Array(e.valueHex) : Gs,
						this.tagClass = (r = e.tagClass) !== null && r !== void 0 ? r : -1,
						this.tagNumber = (s = e.tagNumber) !== null && s !== void 0 ? s : -1,
						this.isConstructed = (o = e.isConstructed) !== null && o !== void 0 ? o : !1)
					: (this.tagClass = -1, this.tagNumber = -1, this.isConstructed = !1);
		}
		toBER(e = !1) {
			let t = 0;
			switch (this.tagClass) {
				case 1:
					t |= 0;
					break;
				case 2:
					t |= 64;
					break;
				case 3:
					t |= 128;
					break;
				case 4:
					t |= 192;
					break;
				default:
					return this.error = 'Unknown tag class', Ye;
			}
			if (this.isConstructed && (t |= 32), this.tagNumber < 31 && !this.isHexOnly) {
				let s = new Uint8Array(1);
				if (!e) {
					let o = this.tagNumber;
					o &= 31, t |= o, s[0] = t;
				}
				return s.buffer;
			}
			if (!this.isHexOnly) {
				let s = z.utilToBase(this.tagNumber, 7), o = new Uint8Array(s), a = s.byteLength, i = new Uint8Array(a + 1);
				if (i[0] = t | 31, !e) {
					for (let c = 0; c < a - 1; c++) i[c + 1] = o[c] | 128;
					i[a] = o[a - 1];
				}
				return i.buffer;
			}
			let r = new Uint8Array(this.valueHexView.byteLength + 1);
			if (r[0] = t | 31, !e) {
				let s = this.valueHexView;
				for (let o = 0; o < s.length - 1; o++) r[o + 1] = s[o] | 128;
				r[this.valueHexView.byteLength] = s[s.length - 1];
			}
			return r.buffer;
		}
		fromBER(e, t, r) {
			let s = $.BufferSourceConverter.toUint8Array(e);
			if (!_t(this, s, t, r)) return -1;
			let o = s.subarray(t, t + r);
			if (o.length === 0) return this.error = 'Zero buffer length', -1;
			switch (o[0] & 192) {
				case 0:
					this.tagClass = 1;
					break;
				case 64:
					this.tagClass = 2;
					break;
				case 128:
					this.tagClass = 3;
					break;
				case 192:
					this.tagClass = 4;
					break;
				default:
					return this.error = 'Unknown tag class', -1;
			}
			this.isConstructed = (o[0] & 32) === 32, this.isHexOnly = !1;
			let i = o[0] & 31;
			if (i !== 31) this.tagNumber = i, this.blockLength = 1;
			else {
				let c = 1, u = this.valueHexView = new Uint8Array(255), l = 255;
				for (; o[c] & 128;) {
					if (u[c - 1] = o[c] & 127, c++, c >= o.length) {
						return this.error = 'End of input reached before message was fully decoded', -1;
					}
					if (c === l) {
						l += 255;
						let d = new Uint8Array(l);
						for (let y = 0; y < u.length; y++) d[y] = u[y];
						u = this.valueHexView = new Uint8Array(l);
					}
				}
				this.blockLength = c + 1, u[c - 1] = o[c] & 127;
				let f = new Uint8Array(c);
				for (let d = 0; d < c; d++) f[d] = u[d];
				u = this.valueHexView = new Uint8Array(c),
					u.set(f),
					this.blockLength <= 9
						? this.tagNumber = z.utilFromBase(u, 7)
						: (this.isHexOnly = !0, this.warnings.push('Tag too long, represented as hex-coded'));
			}
			if (this.tagClass === 1 && this.isConstructed) {
				switch (this.tagNumber) {
					case 1:
					case 2:
					case 5:
					case 6:
					case 9:
					case 13:
					case 14:
					case 23:
					case 24:
					case 31:
					case 32:
					case 33:
					case 34:
						return this.error = 'Constructed encoding used for primitive type', -1;
				}
			}
			return t + this.blockLength;
		}
		toJSON() {
			return {
				...super.toJSON(),
				tagClass: this.tagClass,
				tagNumber: this.tagNumber,
				isConstructed: this.isConstructed,
			};
		}
	};
	Ks.NAME = 'identificationBlock';
	var Os = class extends kt {
		constructor({ lenBlock: e = {} } = {}) {
			var t, r, s;
			super(),
				this.isIndefiniteForm = (t = e.isIndefiniteForm) !== null && t !== void 0 ? t : !1,
				this.longFormUsed = (r = e.longFormUsed) !== null && r !== void 0 ? r : !1,
				this.length = (s = e.length) !== null && s !== void 0 ? s : 0;
		}
		fromBER(e, t, r) {
			let s = $.BufferSourceConverter.toUint8Array(e);
			if (!_t(this, s, t, r)) return -1;
			let o = s.subarray(t, t + r);
			if (o.length === 0) return this.error = 'Zero buffer length', -1;
			if (o[0] === 255) return this.error = 'Length block 0xFF is reserved by standard', -1;
			if (this.isIndefiniteForm = o[0] === 128, this.isIndefiniteForm) {
				return this.blockLength = 1, t + this.blockLength;
			}
			if (this.longFormUsed = !!(o[0] & 128), this.longFormUsed === !1) {
				return this.length = o[0], this.blockLength = 1, t + this.blockLength;
			}
			let a = o[0] & 127;
			if (a > 8) return this.error = 'Too big integer', -1;
			if (a + 1 > o.length) return this.error = 'End of input reached before message was fully decoded', -1;
			let i = t + 1, c = s.subarray(i, i + a);
			return c[a - 1] === 0 && this.warnings.push('Needlessly long encoded length'),
				this.length = z.utilFromBase(c, 8),
				this.longFormUsed && this.length <= 127 && this.warnings.push('Unnecessary usage of long length form'),
				this.blockLength = a + 1,
				t + this.blockLength;
		}
		toBER(e = !1) {
			let t, r;
			if (this.length > 127 && (this.longFormUsed = !0), this.isIndefiniteForm) {
				return t = new ArrayBuffer(1), e === !1 && (r = new Uint8Array(t), r[0] = 128), t;
			}
			if (this.longFormUsed) {
				let s = z.utilToBase(this.length, 8);
				if (s.byteLength > 127) return this.error = 'Too big length', Ye;
				if (t = new ArrayBuffer(s.byteLength + 1), e) return t;
				let o = new Uint8Array(s);
				r = new Uint8Array(t), r[0] = s.byteLength | 128;
				for (let a = 0; a < s.byteLength; a++) r[a + 1] = o[a];
				return t;
			}
			return t = new ArrayBuffer(1), e === !1 && (r = new Uint8Array(t), r[0] = this.length), t;
		}
		toJSON() {
			return {
				...super.toJSON(),
				isIndefiniteForm: this.isIndefiniteForm,
				longFormUsed: this.longFormUsed,
				length: this.length,
			};
		}
	};
	Os.NAME = 'lengthBlock';
	var w = {},
		he = class extends kt {
			constructor({ name: e = Ce, optional: t = !1, primitiveSchema: r, ...s } = {}, o) {
				super(s),
					this.name = e,
					this.optional = t,
					r && (this.primitiveSchema = r),
					this.idBlock = new Ks(s),
					this.lenBlock = new Os(s),
					this.valueBlock = o ? new o(s) : new ye(s);
			}
			fromBER(e, t, r) {
				let s = this.valueBlock.fromBER(e, t, this.lenBlock.isIndefiniteForm ? r : this.lenBlock.length);
				return s === -1
					? (this.error = this.valueBlock.error, s)
					: (this.idBlock.error.length || (this.blockLength += this.idBlock.blockLength),
						this.lenBlock.error.length || (this.blockLength += this.lenBlock.blockLength),
						this.valueBlock.error.length || (this.blockLength += this.valueBlock.blockLength),
						s);
			}
			toBER(e, t) {
				let r = t || new Or();
				t || Ou(this);
				let s = this.idBlock.toBER(e);
				if (r.write(s), this.lenBlock.isIndefiniteForm) {
					r.write(new Uint8Array([128]).buffer), this.valueBlock.toBER(e, r), r.write(new ArrayBuffer(2));
				} else {
					let o = this.valueBlock.toBER(e);
					this.lenBlock.length = o.byteLength;
					let a = this.lenBlock.toBER(e);
					r.write(a), r.write(o);
				}
				return t ? Ye : r.final();
			}
			toJSON() {
				let e = {
					...super.toJSON(),
					idBlock: this.idBlock.toJSON(),
					lenBlock: this.lenBlock.toJSON(),
					valueBlock: this.valueBlock.toJSON(),
					name: this.name,
					optional: this.optional,
				};
				return this.primitiveSchema && (e.primitiveSchema = this.primitiveSchema.toJSON()), e;
			}
			toString(e = 'ascii') {
				return e === 'ascii' ? this.onAsciiEncoding() : $.Convert.ToHex(this.toBER());
			}
			onAsciiEncoding() {
				return `${this.constructor.NAME} : ${$.Convert.ToHex(this.valueBlock.valueBeforeDecodeView)}`;
			}
			isEqual(e) {
				if (this === e) return !0;
				if (!(e instanceof this.constructor)) return !1;
				let t = this.toBER(), r = e.toBER();
				return z.isEqualBuffer(t, r);
			}
		};
	he.NAME = 'BaseBlock';
	function Ou(n) {
		if (n instanceof w.Constructed) for (let e of n.valueBlock.value) Ou(e) && (n.lenBlock.isIndefiniteForm = !0);
		return !!n.lenBlock.isIndefiniteForm;
	}
	var fn = class extends he {
		constructor({ value: e = Ce, ...t } = {}, r) {
			super(t, r), e && this.fromString(e);
		}
		getValue() {
			return this.valueBlock.value;
		}
		setValue(e) {
			this.valueBlock.value = e;
		}
		fromBER(e, t, r) {
			let s = this.valueBlock.fromBER(e, t, this.lenBlock.isIndefiniteForm ? r : this.lenBlock.length);
			return s === -1
				? (this.error = this.valueBlock.error, s)
				: (this.fromBuffer(this.valueBlock.valueHexView),
					this.idBlock.error.length || (this.blockLength += this.idBlock.blockLength),
					this.lenBlock.error.length || (this.blockLength += this.lenBlock.blockLength),
					this.valueBlock.error.length || (this.blockLength += this.valueBlock.blockLength),
					s);
		}
		onAsciiEncoding() {
			return `${this.constructor.NAME} : '${this.valueBlock.value}'`;
		}
	};
	fn.NAME = 'BaseStringBlock';
	var Us = class extends dt(ye) {
		constructor({ isHexOnly: e = !0, ...t } = {}) {
			super(t), this.isHexOnly = e;
		}
	};
	Us.NAME = 'PrimitiveValueBlock';
	var Uu,
		hn = class extends he {
			constructor(e = {}) {
				super(e, Us), this.idBlock.isConstructed = !1;
			}
		};
	Uu = hn;
	w.Primitive = Uu;
	hn.NAME = 'PRIMITIVE';
	function id(n, e) {
		if (n instanceof e) return n;
		let t = new e();
		return t.idBlock = n.idBlock,
			t.lenBlock = n.lenBlock,
			t.warnings = n.warnings,
			t.valueBeforeDecodeView = n.valueBeforeDecodeView,
			t;
	}
	function Rr(n, e = 0, t = n.length) {
		let r = e, s = new he({}, ye), o = new kt();
		if (!_t(o, n, e, t)) return s.error = o.error, { offset: -1, result: s };
		if (!n.subarray(e, e + t).length) return s.error = 'Zero buffer length', { offset: -1, result: s };
		let i = s.idBlock.fromBER(n, e, t);
		if (s.idBlock.warnings.length && s.warnings.concat(s.idBlock.warnings), i === -1) {
			return s.error = s.idBlock.error, { offset: -1, result: s };
		}
		if (
			e = i,
				t -= s.idBlock.blockLength,
				i = s.lenBlock.fromBER(n, e, t),
				s.lenBlock.warnings.length && s.warnings.concat(s.lenBlock.warnings),
				i === -1
		) {
			return s.error = s.lenBlock.error, { offset: -1, result: s };
		}
		if (e = i, t -= s.lenBlock.blockLength, !s.idBlock.isConstructed && s.lenBlock.isIndefiniteForm) {
			return s.error = 'Indefinite length form used for primitive encoding form', { offset: -1, result: s };
		}
		let c = he;
		switch (s.idBlock.tagClass) {
			case 1:
				if (s.idBlock.tagNumber >= 37 && s.idBlock.isHexOnly === !1) {
					return s.error = 'UNIVERSAL 37 and upper tags are reserved by ASN.1 standard', { offset: -1, result: s };
				}
				switch (s.idBlock.tagNumber) {
					case 0:
						if (s.idBlock.isConstructed && s.lenBlock.length > 0) {
							return s.error = 'Type [UNIVERSAL 0] is reserved', { offset: -1, result: s };
						}
						c = w.EndOfContent;
						break;
					case 1:
						c = w.Boolean;
						break;
					case 2:
						c = w.Integer;
						break;
					case 3:
						c = w.BitString;
						break;
					case 4:
						c = w.OctetString;
						break;
					case 5:
						c = w.Null;
						break;
					case 6:
						c = w.ObjectIdentifier;
						break;
					case 10:
						c = w.Enumerated;
						break;
					case 12:
						c = w.Utf8String;
						break;
					case 13:
						c = w.RelativeObjectIdentifier;
						break;
					case 14:
						c = w.TIME;
						break;
					case 15:
						return s.error = '[UNIVERSAL 15] is reserved by ASN.1 standard', { offset: -1, result: s };
					case 16:
						c = w.Sequence;
						break;
					case 17:
						c = w.Set;
						break;
					case 18:
						c = w.NumericString;
						break;
					case 19:
						c = w.PrintableString;
						break;
					case 20:
						c = w.TeletexString;
						break;
					case 21:
						c = w.VideotexString;
						break;
					case 22:
						c = w.IA5String;
						break;
					case 23:
						c = w.UTCTime;
						break;
					case 24:
						c = w.GeneralizedTime;
						break;
					case 25:
						c = w.GraphicString;
						break;
					case 26:
						c = w.VisibleString;
						break;
					case 27:
						c = w.GeneralString;
						break;
					case 28:
						c = w.UniversalString;
						break;
					case 29:
						c = w.CharacterString;
						break;
					case 30:
						c = w.BmpString;
						break;
					case 31:
						c = w.DATE;
						break;
					case 32:
						c = w.TimeOfDay;
						break;
					case 33:
						c = w.DateTime;
						break;
					case 34:
						c = w.Duration;
						break;
					default: {
						let u = s.idBlock.isConstructed ? new w.Constructed() : new w.Primitive();
						u.idBlock = s.idBlock, u.lenBlock = s.lenBlock, u.warnings = s.warnings, s = u;
					}
				}
				break;
			case 2:
			case 3:
			case 4:
			default:
				c = s.idBlock.isConstructed ? w.Constructed : w.Primitive;
		}
		return s = id(s, c),
			i = s.fromBER(n, e, s.lenBlock.isIndefiniteForm ? t : s.lenBlock.length),
			s.valueBeforeDecodeView = n.subarray(r, r + s.blockLength),
			{ offset: i, result: s };
	}
	function cd(n) {
		if (!n.byteLength) {
			let e = new he({}, ye);
			return e.error = 'Input buffer has zero length', { offset: -1, result: e };
		}
		return Rr($.BufferSourceConverter.toUint8Array(n).slice(), 0, n.byteLength);
	}
	function ud(n, e) {
		return n ? 1 : e;
	}
	var ft = class extends ye {
		constructor({ value: e = [], isIndefiniteForm: t = !1, ...r } = {}) {
			super(r), this.value = e, this.isIndefiniteForm = t;
		}
		fromBER(e, t, r) {
			let s = $.BufferSourceConverter.toUint8Array(e);
			if (!_t(this, s, t, r)) return -1;
			if (this.valueBeforeDecodeView = s.subarray(t, t + r), this.valueBeforeDecodeView.length === 0) {
				return this.warnings.push('Zero buffer length'), t;
			}
			let o = t;
			for (; ud(this.isIndefiniteForm, r) > 0;) {
				let a = Rr(s, o, r);
				if (a.offset === -1) return this.error = a.result.error, this.warnings.concat(a.result.warnings), -1;
				if (
					o = a.offset,
						this.blockLength += a.result.blockLength,
						r -= a.result.blockLength,
						this.value.push(a.result),
						this.isIndefiniteForm && a.result.constructor.NAME === ln
				) {
					break;
				}
			}
			return this.isIndefiniteForm
				&& (this.value[this.value.length - 1].constructor.NAME === ln
					? this.value.pop()
					: this.warnings.push('No EndOfContent block encoded')),
				o;
		}
		toBER(e, t) {
			let r = t || new Or();
			for (let s = 0; s < this.value.length; s++) this.value[s].toBER(e, r);
			return t ? Ye : r.final();
		}
		toJSON() {
			let e = { ...super.toJSON(), isIndefiniteForm: this.isIndefiniteForm, value: [] };
			for (let t of this.value) e.value.push(t.toJSON());
			return e;
		}
	};
	ft.NAME = 'ConstructedValueBlock';
	var $u,
		Bt = class extends he {
			constructor(e = {}) {
				super(e, ft), this.idBlock.isConstructed = !0;
			}
			fromBER(e, t, r) {
				this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm;
				let s = this.valueBlock.fromBER(e, t, this.lenBlock.isIndefiniteForm ? r : this.lenBlock.length);
				return s === -1
					? (this.error = this.valueBlock.error, s)
					: (this.idBlock.error.length || (this.blockLength += this.idBlock.blockLength),
						this.lenBlock.error.length || (this.blockLength += this.lenBlock.blockLength),
						this.valueBlock.error.length || (this.blockLength += this.valueBlock.blockLength),
						s);
			}
			onAsciiEncoding() {
				let e = [];
				for (let r of this.valueBlock.value) {
					e.push(
						r.toString('ascii').split(`
`).map(s => `  ${s}`).join(`
`),
					);
				}
				let t = this.idBlock.tagClass === 3 ? `[${this.idBlock.tagNumber}]` : this.constructor.NAME;
				return e.length
					? `${t} :
${
						e.join(`
`)
					}`
					: `${t} :`;
			}
		};
	$u = Bt;
	w.Constructed = $u;
	Bt.NAME = 'CONSTRUCTED';
	var $s = class extends ye {
		fromBER(e, t, r) {
			return t;
		}
		toBER(e) {
			return Ye;
		}
	};
	$s.override = 'EndOfContentValueBlock';
	var Ru,
		pn = class extends he {
			constructor(e = {}) {
				super(e, $s), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 0;
			}
		};
	Ru = pn;
	w.EndOfContent = Ru;
	pn.NAME = ln;
	var ju,
		dn = class extends he {
			constructor(e = {}) {
				super(e, ye), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 5;
			}
			fromBER(e, t, r) {
				return this.lenBlock.length > 0 && this.warnings.push('Non-zero length of value block for Null type'),
					this.idBlock.error.length || (this.blockLength += this.idBlock.blockLength),
					this.lenBlock.error.length || (this.blockLength += this.lenBlock.blockLength),
					this.blockLength += r,
					t + r > e.byteLength
						? (this.error =
							'End of input reached before message was fully decoded (inconsistent offset and length values)',
							-1)
						: t + r;
			}
			toBER(e, t) {
				let r = new ArrayBuffer(2);
				if (!e) {
					let s = new Uint8Array(r);
					s[0] = 5, s[1] = 0;
				}
				return t && t.write(r), r;
			}
			onAsciiEncoding() {
				return `${this.constructor.NAME}`;
			}
		};
	ju = dn;
	w.Null = ju;
	dn.NAME = 'NULL';
	var Rs = class extends dt(ye) {
		constructor({ value: e, ...t } = {}) {
			super(t),
				t.valueHex
					? this.valueHexView = $.BufferSourceConverter.toUint8Array(t.valueHex)
					: this.valueHexView = new Uint8Array(1),
				e && (this.value = e);
		}
		get value() {
			for (let e of this.valueHexView) if (e > 0) return !0;
			return !1;
		}
		set value(e) {
			this.valueHexView[0] = e ? 255 : 0;
		}
		fromBER(e, t, r) {
			let s = $.BufferSourceConverter.toUint8Array(e);
			return _t(this, s, t, r)
				? (this.valueHexView = s.subarray(t, t + r),
					r > 1 && this.warnings.push('Boolean value encoded in more then 1 octet'),
					this.isHexOnly = !0,
					z.utilDecodeTC.call(this),
					this.blockLength = r,
					t + r)
				: -1;
		}
		toBER() {
			return this.valueHexView.slice();
		}
		toJSON() {
			return { ...super.toJSON(), value: this.value };
		}
	};
	Rs.NAME = 'BooleanValueBlock';
	var Vu,
		mn = class extends he {
			constructor(e = {}) {
				super(e, Rs), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 1;
			}
			getValue() {
				return this.valueBlock.value;
			}
			setValue(e) {
				this.valueBlock.value = e;
			}
			onAsciiEncoding() {
				return `${this.constructor.NAME} : ${this.getValue}`;
			}
		};
	Vu = mn;
	w.Boolean = Vu;
	mn.NAME = 'BOOLEAN';
	var js = class extends dt(ft) {
		constructor({ isConstructed: e = !1, ...t } = {}) {
			super(t), this.isConstructed = e;
		}
		fromBER(e, t, r) {
			let s = 0;
			if (this.isConstructed) {
				if (this.isHexOnly = !1, s = ft.prototype.fromBER.call(this, e, t, r), s === -1) return s;
				for (let o = 0; o < this.value.length; o++) {
					let a = this.value[o].constructor.NAME;
					if (a === ln) {
						if (this.isIndefiniteForm) break;
						return this.error = 'EndOfContent is unexpected, OCTET STRING may consists of OCTET STRINGs only', -1;
					}
					if (a !== Iu) return this.error = 'OCTET STRING may consists of OCTET STRINGs only', -1;
				}
			} else this.isHexOnly = !0, s = super.fromBER(e, t, r), this.blockLength = r;
			return s;
		}
		toBER(e, t) {
			return this.isConstructed
				? ft.prototype.toBER.call(this, e, t)
				: e
				? new ArrayBuffer(this.valueHexView.byteLength)
				: this.valueHexView.slice().buffer;
		}
		toJSON() {
			return { ...super.toJSON(), isConstructed: this.isConstructed };
		}
	};
	js.NAME = 'OctetStringValueBlock';
	var Hu,
		er = class extends he {
			constructor({ idBlock: e = {}, lenBlock: t = {}, ...r } = {}) {
				var s, o;
				(s = r.isConstructed) !== null && s !== void 0
				|| (r.isConstructed = !!(!((o = r.value) === null || o === void 0) && o.length)),
					super({
						idBlock: { isConstructed: r.isConstructed, ...e },
						lenBlock: { ...t, isIndefiniteForm: !!r.isIndefiniteForm },
						...r,
					}, js),
					this.idBlock.tagClass = 1,
					this.idBlock.tagNumber = 4;
			}
			fromBER(e, t, r) {
				if (
					this.valueBlock.isConstructed = this.idBlock.isConstructed,
						this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm,
						r === 0
				) {
					return this.idBlock.error.length === 0 && (this.blockLength += this.idBlock.blockLength),
						this.lenBlock.error.length === 0 && (this.blockLength += this.lenBlock.blockLength),
						t;
				}
				if (!this.valueBlock.isConstructed) {
					let o = (e instanceof ArrayBuffer ? new Uint8Array(e) : e).subarray(t, t + r);
					try {
						if (o.byteLength) {
							let a = Rr(o, 0, o.byteLength);
							a.offset !== -1 && a.offset === r && (this.valueBlock.value = [a.result]);
						}
					} catch {}
				}
				return super.fromBER(e, t, r);
			}
			onAsciiEncoding() {
				return this.valueBlock.isConstructed || this.valueBlock.value && this.valueBlock.value.length
					? Bt.prototype.onAsciiEncoding.call(this)
					: `${this.constructor.NAME} : ${$.Convert.ToHex(this.valueBlock.valueHexView)}`;
			}
			getValue() {
				if (!this.idBlock.isConstructed) return this.valueBlock.valueHexView.slice().buffer;
				let e = [];
				for (let t of this.valueBlock.value) t instanceof er && e.push(t.valueBlock.valueHexView);
				return $.BufferSourceConverter.concat(e);
			}
		};
	Hu = er;
	w.OctetString = Hu;
	er.NAME = Iu;
	var Vs = class extends dt(ft) {
		constructor({ unusedBits: e = 0, isConstructed: t = !1, ...r } = {}) {
			super(r), this.unusedBits = e, this.isConstructed = t, this.blockLength = this.valueHexView.byteLength;
		}
		fromBER(e, t, r) {
			if (!r) return t;
			let s = -1;
			if (this.isConstructed) {
				if (s = ft.prototype.fromBER.call(this, e, t, r), s === -1) return s;
				for (let i of this.value) {
					let c = i.constructor.NAME;
					if (c === ln) {
						if (this.isIndefiniteForm) break;
						return this.error = 'EndOfContent is unexpected, BIT STRING may consists of BIT STRINGs only', -1;
					}
					if (c !== Ku) return this.error = 'BIT STRING may consists of BIT STRINGs only', -1;
					let u = i.valueBlock;
					if (this.unusedBits > 0 && u.unusedBits > 0) {
						return this.error = 'Using of "unused bits" inside constructive BIT STRING allowed for least one only', -1;
					}
					this.unusedBits = u.unusedBits;
				}
				return s;
			}
			let o = $.BufferSourceConverter.toUint8Array(e);
			if (!_t(this, o, t, r)) return -1;
			let a = o.subarray(t, t + r);
			if (this.unusedBits = a[0], this.unusedBits > 7) {
				return this.error = 'Unused bits for BitString must be in range 0-7', -1;
			}
			if (!this.unusedBits) {
				let i = a.subarray(1);
				try {
					if (i.byteLength) {
						let c = Rr(i, 0, i.byteLength);
						c.offset !== -1 && c.offset === r - 1 && (this.value = [c.result]);
					}
				} catch {}
			}
			return this.valueHexView = a.subarray(1), this.blockLength = a.length, t + r;
		}
		toBER(e, t) {
			if (this.isConstructed) return ft.prototype.toBER.call(this, e, t);
			if (e) return new ArrayBuffer(this.valueHexView.byteLength + 1);
			if (!this.valueHexView.byteLength) return Ye;
			let r = new Uint8Array(this.valueHexView.length + 1);
			return r[0] = this.unusedBits, r.set(this.valueHexView, 1), r.buffer;
		}
		toJSON() {
			return { ...super.toJSON(), unusedBits: this.unusedBits, isConstructed: this.isConstructed };
		}
	};
	Vs.NAME = 'BitStringValueBlock';
	var Mu,
		yn = class extends he {
			constructor({ idBlock: e = {}, lenBlock: t = {}, ...r } = {}) {
				var s, o;
				(s = r.isConstructed) !== null && s !== void 0
				|| (r.isConstructed = !!(!((o = r.value) === null || o === void 0) && o.length)),
					super({
						idBlock: { isConstructed: r.isConstructed, ...e },
						lenBlock: { ...t, isIndefiniteForm: !!r.isIndefiniteForm },
						...r,
					}, Vs),
					this.idBlock.tagClass = 1,
					this.idBlock.tagNumber = 3;
			}
			fromBER(e, t, r) {
				return this.valueBlock.isConstructed = this.idBlock.isConstructed,
					this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm,
					super.fromBER(e, t, r);
			}
			onAsciiEncoding() {
				if (this.valueBlock.isConstructed || this.valueBlock.value && this.valueBlock.value.length) {
					return Bt.prototype.onAsciiEncoding.call(this);
				}
				{
					let e = [], t = this.valueBlock.valueHexView;
					for (let s of t) e.push(s.toString(2).padStart(8, '0'));
					let r = e.join('');
					return `${this.constructor.NAME} : ${r.substring(0, r.length - this.valueBlock.unusedBits)}`;
				}
			}
		};
	Mu = yn;
	w.BitString = Mu;
	yn.NAME = Ku;
	var Lu;
	function ld(n, e) {
		let t = new Uint8Array([0]),
			r = new Uint8Array(n),
			s = new Uint8Array(e),
			o = r.slice(0),
			a = o.length - 1,
			i = s.slice(0),
			c = i.length - 1,
			u = 0,
			l = c < a ? a : c,
			f = 0;
		for (let d = l; d >= 0; d--, f++) {
			switch (!0) {
				case f < i.length:
					u = o[a - f] + i[c - f] + t[0];
					break;
				default:
					u = o[a - f] + t[0];
			}
			switch (t[0] = u / 10, !0) {
				case f >= o.length:
					o = z.utilConcatView(new Uint8Array([u % 10]), o);
					break;
				default:
					o[a - f] = u % 10;
			}
		}
		return t[0] > 0 && (o = z.utilConcatView(t, o)), o;
	}
	function Tu(n) {
		if (n >= un.length) {
			for (let e = un.length; e <= n; e++) {
				let t = new Uint8Array([0]), r = un[e - 1].slice(0);
				for (let s = r.length - 1; s >= 0; s--) {
					let o = new Uint8Array([(r[s] << 1) + t[0]]);
					t[0] = o[0] / 10, r[s] = o[0] % 10;
				}
				t[0] > 0 && (r = z.utilConcatView(t, r)), un.push(r);
			}
		}
		return un[n];
	}
	function fd(n, e) {
		let t = 0,
			r = new Uint8Array(n),
			s = new Uint8Array(e),
			o = r.slice(0),
			a = o.length - 1,
			i = s.slice(0),
			c = i.length - 1,
			u,
			l = 0;
		for (let f = c; f >= 0; f--, l++) {
			switch (u = o[a - l] - i[c - l] - t, !0) {
				case u < 0:
					t = 1, o[a - l] = u + 10;
					break;
				default:
					t = 0, o[a - l] = u;
			}
		}
		if (t > 0) {
			for (let f = a - c + 1; f >= 0; f--, l++) {
				if (u = o[a - l] - t, u < 0) t = 1, o[a - l] = u + 10;
				else {
					t = 0, o[a - l] = u;
					break;
				}
			}
		}
		return o.slice();
	}
	var gn = class extends dt(ye) {
		constructor({ value: e, ...t } = {}) {
			super(t), this._valueDec = 0, t.valueHex && this.setValueHex(), e !== void 0 && (this.valueDec = e);
		}
		setValueHex() {
			this.valueHexView.length >= 4
				? (this.warnings.push('Too big Integer for decoding, hex only'), this.isHexOnly = !0, this._valueDec = 0)
				: (this.isHexOnly = !1, this.valueHexView.length > 0 && (this._valueDec = z.utilDecodeTC.call(this)));
		}
		set valueDec(e) {
			this._valueDec = e, this.isHexOnly = !1, this.valueHexView = new Uint8Array(z.utilEncodeTC(e));
		}
		get valueDec() {
			return this._valueDec;
		}
		fromDER(e, t, r, s = 0) {
			let o = this.fromBER(e, t, r);
			if (o === -1) return o;
			let a = this.valueHexView;
			return a[0] === 0 && (a[1] & 128) !== 0
				? this.valueHexView = a.subarray(1)
				: s !== 0 && a.length < s
					&& (s - a.length > 1 && (s = a.length + 1), this.valueHexView = a.subarray(s - a.length)),
				o;
		}
		toDER(e = !1) {
			let t = this.valueHexView;
			switch (!0) {
				case (t[0] & 128) !== 0:
					{
						let r = new Uint8Array(this.valueHexView.length + 1);
						r[0] = 0, r.set(t, 1), this.valueHexView = r;
					}
					break;
				case (t[0] === 0 && (t[1] & 128) === 0):
					this.valueHexView = this.valueHexView.subarray(1);
					break;
			}
			return this.toBER(e);
		}
		fromBER(e, t, r) {
			let s = super.fromBER(e, t, r);
			return s === -1 || this.setValueHex(), s;
		}
		toBER(e) {
			return e ? new ArrayBuffer(this.valueHexView.length) : this.valueHexView.slice().buffer;
		}
		toJSON() {
			return { ...super.toJSON(), valueDec: this.valueDec };
		}
		toString() {
			let e = this.valueHexView.length * 8 - 1,
				t = new Uint8Array(this.valueHexView.length * 8 / 3),
				r = 0,
				s,
				o = this.valueHexView,
				a = '',
				i = !1;
			for (let c = o.byteLength - 1; c >= 0; c--) {
				s = o[c];
				for (let u = 0; u < 8; u++) {
					if ((s & 1) === 1) {
						switch (r) {
							case e:
								t = fd(Tu(r), t), a = '-';
								break;
							default:
								t = ld(t, Tu(r));
						}
					}
					r++, s >>= 1;
				}
			}
			for (let c = 0; c < t.length; c++) t[c] && (i = !0), i && (a += Eu.charAt(t[c]));
			return i === !1 && (a += Eu.charAt(0)), a;
		}
	};
	Lu = gn;
	gn.NAME = 'IntegerValueBlock';
	Object.defineProperty(Lu.prototype, 'valueHex', {
		set: function(n) {
			this.valueHexView = new Uint8Array(n), this.setValueHex();
		},
		get: function() {
			return this.valueHexView.slice().buffer;
		},
	});
	var Du,
		ht = class extends he {
			constructor(e = {}) {
				super(e, gn), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 2;
			}
			toBigInt() {
				return Is(), BigInt(this.valueBlock.toString());
			}
			static fromBigInt(e) {
				Is();
				let t = BigInt(e), r = new Or(), s = t.toString(16).replace(/^-/, ''), o = new Uint8Array($.Convert.FromHex(s));
				if (t < 0) {
					let i = new Uint8Array(o.length + (o[0] & 128 ? 1 : 0));
					i[0] |= 128;
					let u = BigInt(`0x${$.Convert.ToHex(i)}`) + t,
						l = $.BufferSourceConverter.toUint8Array($.Convert.FromHex(u.toString(16)));
					l[0] |= 128, r.write(l);
				} else o[0] & 128 && r.write(new Uint8Array([0])), r.write(o);
				return new ht({ valueHex: r.final() });
			}
			convertToDER() {
				let e = new ht({ valueHex: this.valueBlock.valueHexView });
				return e.valueBlock.toDER(), e;
			}
			convertFromDER() {
				return new ht({
					valueHex: this.valueBlock.valueHexView[0] === 0
						? this.valueBlock.valueHexView.subarray(1)
						: this.valueBlock.valueHexView,
				});
			}
			onAsciiEncoding() {
				return `${this.constructor.NAME} : ${this.valueBlock.toString()}`;
			}
		};
	Du = ht;
	w.Integer = Du;
	ht.NAME = 'INTEGER';
	var Fu,
		vn = class extends ht {
			constructor(e = {}) {
				super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 10;
			}
		};
	Fu = vn;
	w.Enumerated = Fu;
	vn.NAME = 'ENUMERATED';
	var wn = class extends dt(ye) {
		constructor({ valueDec: e = -1, isFirstSid: t = !1, ...r } = {}) {
			super(r), this.valueDec = e, this.isFirstSid = t;
		}
		fromBER(e, t, r) {
			if (!r) return t;
			let s = $.BufferSourceConverter.toUint8Array(e);
			if (!_t(this, s, t, r)) return -1;
			let o = s.subarray(t, t + r);
			this.valueHexView = new Uint8Array(r);
			for (let i = 0; i < r && (this.valueHexView[i] = o[i] & 127, this.blockLength++, (o[i] & 128) !== 0); i++);
			let a = new Uint8Array(this.blockLength);
			for (let i = 0; i < this.blockLength; i++) a[i] = this.valueHexView[i];
			return this.valueHexView = a,
				(o[this.blockLength - 1] & 128) !== 0
					? (this.error = 'End of input reached before message was fully decoded', -1)
					: (this.valueHexView[0] === 0 && this.warnings.push('Needlessly long format of SID encoding'),
						this.blockLength <= 8
							? this.valueDec = z.utilFromBase(this.valueHexView, 7)
							: (this.isHexOnly = !0, this.warnings.push('Too big SID for decoding, hex only')),
						t + this.blockLength);
		}
		set valueBigInt(e) {
			Is();
			let t = BigInt(e).toString(2);
			for (; t.length % 7;) t = '0' + t;
			let r = new Uint8Array(t.length / 7);
			for (let s = 0; s < r.length; s++) r[s] = parseInt(t.slice(s * 7, s * 7 + 7), 2) + (s + 1 < r.length ? 128 : 0);
			this.fromBER(r.buffer, 0, r.length);
		}
		toBER(e) {
			if (this.isHexOnly) {
				if (e) return new ArrayBuffer(this.valueHexView.byteLength);
				let s = this.valueHexView, o = new Uint8Array(this.blockLength);
				for (let a = 0; a < this.blockLength - 1; a++) o[a] = s[a] | 128;
				return o[this.blockLength - 1] = s[this.blockLength - 1], o.buffer;
			}
			let t = z.utilToBase(this.valueDec, 7);
			if (t.byteLength === 0) return this.error = 'Error during encoding SID value', Ye;
			let r = new Uint8Array(t.byteLength);
			if (!e) {
				let s = new Uint8Array(t), o = t.byteLength - 1;
				for (let a = 0; a < o; a++) r[a] = s[a] | 128;
				r[o] = s[o];
			}
			return r;
		}
		toString() {
			let e = '';
			if (this.isHexOnly) e = $.Convert.ToHex(this.valueHexView);
			else if (this.isFirstSid) {
				let t = this.valueDec;
				this.valueDec <= 39 ? e = '0.' : this.valueDec <= 79 ? (e = '1.', t -= 40) : (e = '2.', t -= 80),
					e += t.toString();
			} else e = this.valueDec.toString();
			return e;
		}
		toJSON() {
			return { ...super.toJSON(), valueDec: this.valueDec, isFirstSid: this.isFirstSid };
		}
	};
	wn.NAME = 'sidBlock';
	var Hs = class extends ye {
		constructor({ value: e = Ce, ...t } = {}) {
			super(t), this.value = [], e && this.fromString(e);
		}
		fromBER(e, t, r) {
			let s = t;
			for (; r > 0;) {
				let o = new wn();
				if (s = o.fromBER(e, s, r), s === -1) return this.blockLength = 0, this.error = o.error, s;
				this.value.length === 0 && (o.isFirstSid = !0),
					this.blockLength += o.blockLength,
					r -= o.blockLength,
					this.value.push(o);
			}
			return s;
		}
		toBER(e) {
			let t = [];
			for (let r = 0; r < this.value.length; r++) {
				let s = this.value[r].toBER(e);
				if (s.byteLength === 0) return this.error = this.value[r].error, Ye;
				t.push(s);
			}
			return ma(t);
		}
		fromString(e) {
			this.value = [];
			let t = 0, r = 0, s = '', o = !1;
			do if (r = e.indexOf('.', t), r === -1 ? s = e.substring(t) : s = e.substring(t, r), t = r + 1, o) {
				let a = this.value[0], i = 0;
				switch (a.valueDec) {
					case 0:
						break;
					case 1:
						i = 40;
						break;
					case 2:
						i = 80;
						break;
					default:
						this.value = [];
						return;
				}
				let c = parseInt(s, 10);
				if (isNaN(c)) return;
				a.valueDec = c + i, o = !1;
			} else {
				let a = new wn();
				if (s > Number.MAX_SAFE_INTEGER) {
					Is();
					let i = BigInt(s);
					a.valueBigInt = i;
				} else if (a.valueDec = parseInt(s, 10), isNaN(a.valueDec)) return;
				this.value.length || (a.isFirstSid = !0, o = !0), this.value.push(a);
			} while (r !== -1);
		}
		toString() {
			let e = '', t = !1;
			for (let r = 0; r < this.value.length; r++) {
				t = this.value[r].isHexOnly;
				let s = this.value[r].toString();
				r !== 0 && (e = `${e}.`), t ? (s = `{${s}}`, this.value[r].isFirstSid ? e = `2.{${s} - 80}` : e += s) : e += s;
			}
			return e;
		}
		toJSON() {
			let e = { ...super.toJSON(), value: this.toString(), sidArray: [] };
			for (let t = 0; t < this.value.length; t++) e.sidArray.push(this.value[t].toJSON());
			return e;
		}
	};
	Hs.NAME = 'ObjectIdentifierValueBlock';
	var zu,
		bn = class extends he {
			constructor(e = {}) {
				super(e, Hs), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 6;
			}
			getValue() {
				return this.valueBlock.toString();
			}
			setValue(e) {
				this.valueBlock.fromString(e);
			}
			onAsciiEncoding() {
				return `${this.constructor.NAME} : ${this.valueBlock.toString() || 'empty'}`;
			}
			toJSON() {
				return { ...super.toJSON(), value: this.getValue() };
			}
		};
	zu = bn;
	w.ObjectIdentifier = zu;
	bn.NAME = 'OBJECT IDENTIFIER';
	var An = class extends dt(kt) {
		constructor({ valueDec: e = 0, ...t } = {}) {
			super(t), this.valueDec = e;
		}
		fromBER(e, t, r) {
			if (r === 0) return t;
			let s = $.BufferSourceConverter.toUint8Array(e);
			if (!_t(this, s, t, r)) return -1;
			let o = s.subarray(t, t + r);
			this.valueHexView = new Uint8Array(r);
			for (let i = 0; i < r && (this.valueHexView[i] = o[i] & 127, this.blockLength++, (o[i] & 128) !== 0); i++);
			let a = new Uint8Array(this.blockLength);
			for (let i = 0; i < this.blockLength; i++) a[i] = this.valueHexView[i];
			return this.valueHexView = a,
				(o[this.blockLength - 1] & 128) !== 0
					? (this.error = 'End of input reached before message was fully decoded', -1)
					: (this.valueHexView[0] === 0 && this.warnings.push('Needlessly long format of SID encoding'),
						this.blockLength <= 8
							? this.valueDec = z.utilFromBase(this.valueHexView, 7)
							: (this.isHexOnly = !0, this.warnings.push('Too big SID for decoding, hex only')),
						t + this.blockLength);
		}
		toBER(e) {
			if (this.isHexOnly) {
				if (e) return new ArrayBuffer(this.valueHexView.byteLength);
				let s = this.valueHexView, o = new Uint8Array(this.blockLength);
				for (let a = 0; a < this.blockLength - 1; a++) o[a] = s[a] | 128;
				return o[this.blockLength - 1] = s[this.blockLength - 1], o.buffer;
			}
			let t = z.utilToBase(this.valueDec, 7);
			if (t.byteLength === 0) return this.error = 'Error during encoding SID value', Ye;
			let r = new Uint8Array(t.byteLength);
			if (!e) {
				let s = new Uint8Array(t), o = t.byteLength - 1;
				for (let a = 0; a < o; a++) r[a] = s[a] | 128;
				r[o] = s[o];
			}
			return r.buffer;
		}
		toString() {
			let e = '';
			return this.isHexOnly ? e = $.Convert.ToHex(this.valueHexView) : e = this.valueDec.toString(), e;
		}
		toJSON() {
			return { ...super.toJSON(), valueDec: this.valueDec };
		}
	};
	An.NAME = 'relativeSidBlock';
	var Ms = class extends ye {
		constructor({ value: e = Ce, ...t } = {}) {
			super(t), this.value = [], e && this.fromString(e);
		}
		fromBER(e, t, r) {
			let s = t;
			for (; r > 0;) {
				let o = new An();
				if (s = o.fromBER(e, s, r), s === -1) return this.blockLength = 0, this.error = o.error, s;
				this.blockLength += o.blockLength, r -= o.blockLength, this.value.push(o);
			}
			return s;
		}
		toBER(e, t) {
			let r = [];
			for (let s = 0; s < this.value.length; s++) {
				let o = this.value[s].toBER(e);
				if (o.byteLength === 0) return this.error = this.value[s].error, Ye;
				r.push(o);
			}
			return ma(r);
		}
		fromString(e) {
			this.value = [];
			let t = 0, r = 0, s = '';
			do {
				r = e.indexOf('.', t), r === -1 ? s = e.substring(t) : s = e.substring(t, r), t = r + 1;
				let o = new An();
				if (o.valueDec = parseInt(s, 10), isNaN(o.valueDec)) return !0;
				this.value.push(o);
			} while (r !== -1);
			return !0;
		}
		toString() {
			let e = '', t = !1;
			for (let r = 0; r < this.value.length; r++) {
				t = this.value[r].isHexOnly;
				let s = this.value[r].toString();
				r !== 0 && (e = `${e}.`), t && (s = `{${s}}`), e += s;
			}
			return e;
		}
		toJSON() {
			let e = { ...super.toJSON(), value: this.toString(), sidArray: [] };
			for (let t = 0; t < this.value.length; t++) e.sidArray.push(this.value[t].toJSON());
			return e;
		}
	};
	Ms.NAME = 'RelativeObjectIdentifierValueBlock';
	var Ju,
		xn = class extends he {
			constructor(e = {}) {
				super(e, Ms), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 13;
			}
			getValue() {
				return this.valueBlock.toString();
			}
			setValue(e) {
				this.valueBlock.fromString(e);
			}
			onAsciiEncoding() {
				return `${this.constructor.NAME} : ${this.valueBlock.toString() || 'empty'}`;
			}
			toJSON() {
				return { ...super.toJSON(), value: this.getValue() };
			}
		};
	Ju = xn;
	w.RelativeObjectIdentifier = Ju;
	xn.NAME = 'RelativeObjectIdentifier';
	var qu,
		Sn = class extends Bt {
			constructor(e = {}) {
				super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 16;
			}
		};
	qu = Sn;
	w.Sequence = qu;
	Sn.NAME = 'SEQUENCE';
	var Gu,
		kn = class extends Bt {
			constructor(e = {}) {
				super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 17;
			}
		};
	Gu = kn;
	w.Set = Gu;
	kn.NAME = 'SET';
	var Ls = class extends dt(ye) {
		constructor({ ...e } = {}) {
			super(e), this.isHexOnly = !0, this.value = Ce;
		}
		toJSON() {
			return { ...super.toJSON(), value: this.value };
		}
	};
	Ls.NAME = 'StringValueBlock';
	var Ds = class extends Ls {};
	Ds.NAME = 'SimpleStringValueBlock';
	var xe = class extends fn {
		constructor({ ...e } = {}) {
			super(e, Ds);
		}
		fromBuffer(e) {
			this.valueBlock.value = String.fromCharCode.apply(null, $.BufferSourceConverter.toUint8Array(e));
		}
		fromString(e) {
			let t = e.length, r = this.valueBlock.valueHexView = new Uint8Array(t);
			for (let s = 0; s < t; s++) r[s] = e.charCodeAt(s);
			this.valueBlock.value = e;
		}
	};
	xe.NAME = 'SIMPLE STRING';
	var Fs = class extends xe {
		fromBuffer(e) {
			this.valueBlock.valueHexView = $.BufferSourceConverter.toUint8Array(e);
			try {
				this.valueBlock.value = $.Convert.ToUtf8String(e);
			} catch (t) {
				this.warnings.push(`Error during "decodeURIComponent": ${t}, using raw string`),
					this.valueBlock.value = $.Convert.ToBinary(e);
			}
		}
		fromString(e) {
			this.valueBlock.valueHexView = new Uint8Array($.Convert.FromUtf8String(e)), this.valueBlock.value = e;
		}
	};
	Fs.NAME = 'Utf8StringValueBlock';
	var Zu,
		pt = class extends Fs {
			constructor(e = {}) {
				super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 12;
			}
		};
	Zu = pt;
	w.Utf8String = Zu;
	pt.NAME = 'UTF8String';
	var zs = class extends xe {
		fromBuffer(e) {
			this.valueBlock.value = $.Convert.ToUtf16String(e),
				this.valueBlock.valueHexView = $.BufferSourceConverter.toUint8Array(e);
		}
		fromString(e) {
			this.valueBlock.value = e, this.valueBlock.valueHexView = new Uint8Array($.Convert.FromUtf16String(e));
		}
	};
	zs.NAME = 'BmpStringValueBlock';
	var Wu,
		Bn = class extends zs {
			constructor({ ...e } = {}) {
				super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 30;
			}
		};
	Wu = Bn;
	w.BmpString = Wu;
	Bn.NAME = 'BMPString';
	var Js = class extends xe {
		fromBuffer(e) {
			let t = ArrayBuffer.isView(e) ? e.slice().buffer : e.slice(0), r = new Uint8Array(t);
			for (let s = 0; s < r.length; s += 4) r[s] = r[s + 3], r[s + 1] = r[s + 2], r[s + 2] = 0, r[s + 3] = 0;
			this.valueBlock.value = String.fromCharCode.apply(null, new Uint32Array(t));
		}
		fromString(e) {
			let t = e.length, r = this.valueBlock.valueHexView = new Uint8Array(t * 4);
			for (let s = 0; s < t; s++) {
				let o = z.utilToBase(e.charCodeAt(s), 8), a = new Uint8Array(o);
				if (a.length > 4) continue;
				let i = 4 - a.length;
				for (let c = a.length - 1; c >= 0; c--) r[s * 4 + c + i] = a[c];
			}
			this.valueBlock.value = e;
		}
	};
	Js.NAME = 'UniversalStringValueBlock';
	var Yu,
		_n = class extends Js {
			constructor({ ...e } = {}) {
				super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 28;
			}
		};
	Yu = _n;
	w.UniversalString = Yu;
	_n.NAME = 'UniversalString';
	var Xu,
		Cn = class extends xe {
			constructor(e = {}) {
				super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 18;
			}
		};
	Xu = Cn;
	w.NumericString = Xu;
	Cn.NAME = 'NumericString';
	var Qu,
		En = class extends xe {
			constructor(e = {}) {
				super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 19;
			}
		};
	Qu = En;
	w.PrintableString = Qu;
	En.NAME = 'PrintableString';
	var el,
		Pn = class extends xe {
			constructor(e = {}) {
				super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 20;
			}
		};
	el = Pn;
	w.TeletexString = el;
	Pn.NAME = 'TeletexString';
	var tl,
		Tn = class extends xe {
			constructor(e = {}) {
				super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 21;
			}
		};
	tl = Tn;
	w.VideotexString = tl;
	Tn.NAME = 'VideotexString';
	var rl,
		Nn = class extends xe {
			constructor(e = {}) {
				super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 22;
			}
		};
	rl = Nn;
	w.IA5String = rl;
	Nn.NAME = 'IA5String';
	var nl,
		In = class extends xe {
			constructor(e = {}) {
				super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 25;
			}
		};
	nl = In;
	w.GraphicString = nl;
	In.NAME = 'GraphicString';
	var sl,
		Ur = class extends xe {
			constructor(e = {}) {
				super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 26;
			}
		};
	sl = Ur;
	w.VisibleString = sl;
	Ur.NAME = 'VisibleString';
	var ol,
		Kn = class extends xe {
			constructor(e = {}) {
				super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 27;
			}
		};
	ol = Kn;
	w.GeneralString = ol;
	Kn.NAME = 'GeneralString';
	var al,
		On = class extends xe {
			constructor(e = {}) {
				super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 29;
			}
		};
	al = On;
	w.CharacterString = al;
	On.NAME = 'CharacterString';
	var il,
		$r = class extends Ur {
			constructor({ value: e, valueDate: t, ...r } = {}) {
				if (super(r), this.year = 0, this.month = 0, this.day = 0, this.hour = 0, this.minute = 0, this.second = 0, e) {
					this.fromString(e), this.valueBlock.valueHexView = new Uint8Array(e.length);
					for (let s = 0; s < e.length; s++) this.valueBlock.valueHexView[s] = e.charCodeAt(s);
				}
				t && (this.fromDate(t), this.valueBlock.valueHexView = new Uint8Array(this.toBuffer())),
					this.idBlock.tagClass = 1,
					this.idBlock.tagNumber = 23;
			}
			fromBuffer(e) {
				this.fromString(String.fromCharCode.apply(null, $.BufferSourceConverter.toUint8Array(e)));
			}
			toBuffer() {
				let e = this.toString(), t = new ArrayBuffer(e.length), r = new Uint8Array(t);
				for (let s = 0; s < e.length; s++) r[s] = e.charCodeAt(s);
				return t;
			}
			fromDate(e) {
				this.year = e.getUTCFullYear(),
					this.month = e.getUTCMonth() + 1,
					this.day = e.getUTCDate(),
					this.hour = e.getUTCHours(),
					this.minute = e.getUTCMinutes(),
					this.second = e.getUTCSeconds();
			}
			toDate() {
				return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second));
			}
			fromString(e) {
				let r = /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})Z/ig.exec(e);
				if (r === null) {
					this.error = 'Wrong input string for conversion';
					return;
				}
				let s = parseInt(r[1], 10);
				s >= 50 ? this.year = 1900 + s : this.year = 2e3 + s,
					this.month = parseInt(r[2], 10),
					this.day = parseInt(r[3], 10),
					this.hour = parseInt(r[4], 10),
					this.minute = parseInt(r[5], 10),
					this.second = parseInt(r[6], 10);
			}
			toString(e = 'iso') {
				if (e === 'iso') {
					let t = new Array(7);
					return t[0] = z.padNumber(this.year < 2e3 ? this.year - 1900 : this.year - 2e3, 2),
						t[1] = z.padNumber(this.month, 2),
						t[2] = z.padNumber(this.day, 2),
						t[3] = z.padNumber(this.hour, 2),
						t[4] = z.padNumber(this.minute, 2),
						t[5] = z.padNumber(this.second, 2),
						t[6] = 'Z',
						t.join('');
				}
				return super.toString(e);
			}
			onAsciiEncoding() {
				return `${this.constructor.NAME} : ${this.toDate().toISOString()}`;
			}
			toJSON() {
				return {
					...super.toJSON(),
					year: this.year,
					month: this.month,
					day: this.day,
					hour: this.hour,
					minute: this.minute,
					second: this.second,
				};
			}
		};
	il = $r;
	w.UTCTime = il;
	$r.NAME = 'UTCTime';
	var cl,
		Un = class extends $r {
			constructor(e = {}) {
				var t;
				super(e),
					(t = this.millisecond) !== null && t !== void 0 || (this.millisecond = 0),
					this.idBlock.tagClass = 1,
					this.idBlock.tagNumber = 24;
			}
			fromDate(e) {
				super.fromDate(e), this.millisecond = e.getUTCMilliseconds();
			}
			toDate() {
				return new Date(
					Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second, this.millisecond),
				);
			}
			fromString(e) {
				let t = !1, r = '', s = '', o = 0, a, i = 0, c = 0;
				if (e[e.length - 1] === 'Z') r = e.substring(0, e.length - 1), t = !0;
				else {
					let f = new Number(e[e.length - 1]);
					if (isNaN(f.valueOf())) throw new Error('Wrong input string for conversion');
					r = e;
				}
				if (t) {
					if (r.indexOf('+') !== -1) throw new Error('Wrong input string for conversion');
					if (r.indexOf('-') !== -1) throw new Error('Wrong input string for conversion');
				} else {
					let f = 1, d = r.indexOf('+'), y = '';
					if (d === -1 && (d = r.indexOf('-'), f = -1), d !== -1) {
						if (y = r.substring(d + 1), r = r.substring(0, d), y.length !== 2 && y.length !== 4) {
							throw new Error(
								'Wrong input string for conversion',
							);
						}
						let x = parseInt(y.substring(0, 2), 10);
						if (isNaN(x.valueOf())) throw new Error('Wrong input string for conversion');
						if (i = f * x, y.length === 4) {
							if (x = parseInt(y.substring(2, 4), 10), isNaN(x.valueOf())) {
								throw new Error(
									'Wrong input string for conversion',
								);
							}
							c = f * x;
						}
					}
				}
				let u = r.indexOf('.');
				if (u === -1 && (u = r.indexOf(',')), u !== -1) {
					let f = new Number(`0${r.substring(u)}`);
					if (isNaN(f.valueOf())) throw new Error('Wrong input string for conversion');
					o = f.valueOf(), s = r.substring(0, u);
				} else s = r;
				switch (!0) {
					case s.length === 8:
						if (a = /(\d{4})(\d{2})(\d{2})/ig, u !== -1) throw new Error('Wrong input string for conversion');
						break;
					case s.length === 10:
						if (a = /(\d{4})(\d{2})(\d{2})(\d{2})/ig, u !== -1) {
							let f = 60 * o;
							this.minute = Math.floor(f),
								f = 60 * (f - this.minute),
								this.second = Math.floor(f),
								f = 1e3 * (f - this.second),
								this.millisecond = Math.floor(f);
						}
						break;
					case s.length === 12:
						if (a = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/ig, u !== -1) {
							let f = 60 * o;
							this.second = Math.floor(f), f = 1e3 * (f - this.second), this.millisecond = Math.floor(f);
						}
						break;
					case s.length === 14:
						if (a = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/ig, u !== -1) {
							let f = 1e3 * o;
							this.millisecond = Math.floor(f);
						}
						break;
					default:
						throw new Error('Wrong input string for conversion');
				}
				let l = a.exec(s);
				if (l === null) throw new Error('Wrong input string for conversion');
				for (let f = 1; f < l.length; f++) {
					switch (f) {
						case 1:
							this.year = parseInt(l[f], 10);
							break;
						case 2:
							this.month = parseInt(l[f], 10);
							break;
						case 3:
							this.day = parseInt(l[f], 10);
							break;
						case 4:
							this.hour = parseInt(l[f], 10) + i;
							break;
						case 5:
							this.minute = parseInt(l[f], 10) + c;
							break;
						case 6:
							this.second = parseInt(l[f], 10);
							break;
						default:
							throw new Error('Wrong input string for conversion');
					}
				}
				if (t === !1) {
					let f = new Date(this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
					this.year = f.getUTCFullYear(),
						this.month = f.getUTCMonth(),
						this.day = f.getUTCDay(),
						this.hour = f.getUTCHours(),
						this.minute = f.getUTCMinutes(),
						this.second = f.getUTCSeconds(),
						this.millisecond = f.getUTCMilliseconds();
				}
			}
			toString(e = 'iso') {
				if (e === 'iso') {
					let t = [];
					return t.push(z.padNumber(this.year, 4)),
						t.push(z.padNumber(this.month, 2)),
						t.push(z.padNumber(this.day, 2)),
						t.push(z.padNumber(this.hour, 2)),
						t.push(z.padNumber(this.minute, 2)),
						t.push(z.padNumber(this.second, 2)),
						this.millisecond !== 0 && (t.push('.'), t.push(z.padNumber(this.millisecond, 3))),
						t.push('Z'),
						t.join('');
				}
				return super.toString(e);
			}
			toJSON() {
				return { ...super.toJSON(), millisecond: this.millisecond };
			}
		};
	cl = Un;
	w.GeneralizedTime = cl;
	Un.NAME = 'GeneralizedTime';
	var ul,
		$n = class extends pt {
			constructor(e = {}) {
				super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 31;
			}
		};
	ul = $n;
	w.DATE = ul;
	$n.NAME = 'DATE';
	var ll,
		Rn = class extends pt {
			constructor(e = {}) {
				super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 32;
			}
		};
	ll = Rn;
	w.TimeOfDay = ll;
	Rn.NAME = 'TimeOfDay';
	var fl,
		jn = class extends pt {
			constructor(e = {}) {
				super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 33;
			}
		};
	fl = jn;
	w.DateTime = fl;
	jn.NAME = 'DateTime';
	var hl,
		Vn = class extends pt {
			constructor(e = {}) {
				super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 34;
			}
		};
	hl = Vn;
	w.Duration = hl;
	Vn.NAME = 'Duration';
	var pl,
		Hn = class extends pt {
			constructor(e = {}) {
				super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 14;
			}
		};
	pl = Hn;
	w.TIME = pl;
	Hn.NAME = 'TIME';
	var tr = class {
			constructor({ name: e = Ce, optional: t = !1 } = {}) {
				this.name = e, this.optional = t;
			}
		},
		qs = class extends tr {
			constructor({ value: e = [], ...t } = {}) {
				super(t), this.value = e;
			}
		},
		Mn = class extends tr {
			constructor({ value: e = new tr(), local: t = !1, ...r } = {}) {
				super(r), this.value = e, this.local = t;
			}
		},
		da = class {
			constructor({ data: e = Gs } = {}) {
				this.dataView = $.BufferSourceConverter.toUint8Array(e);
			}
			get data() {
				return this.dataView.slice().buffer;
			}
			set data(e) {
				this.dataView = $.BufferSourceConverter.toUint8Array(e);
			}
			fromBER(e, t, r) {
				let s = t + r;
				return this.dataView = $.BufferSourceConverter.toUint8Array(e).subarray(t, s), s;
			}
			toBER(e) {
				return this.dataView.slice().buffer;
			}
		};
	function Kr(n, e, t) {
		if (t instanceof qs) {
			for (let o = 0; o < t.value.length; o++) if (Kr(n, e, t.value[o]).verified) return { verified: !0, result: n };
			{
				let o = { verified: !1, result: { error: 'Wrong values for Choice type' } };
				return t.hasOwnProperty(pa) && (o.name = t.name), o;
			}
		}
		if (t instanceof tr) return t.hasOwnProperty(pa) && (n[t.name] = e), { verified: !0, result: n };
		if (!(n instanceof Object)) return { verified: !1, result: { error: 'Wrong root object' } };
		if (!(e instanceof Object)) return { verified: !1, result: { error: 'Wrong ASN.1 data' } };
		if (!(t instanceof Object)) return { verified: !1, result: { error: 'Wrong ASN.1 schema' } };
		if (!(ed in t)) return { verified: !1, result: { error: 'Wrong ASN.1 schema' } };
		if (!(sd in t.idBlock)) return { verified: !1, result: { error: 'Wrong ASN.1 schema' } };
		if (!(od in t.idBlock)) return { verified: !1, result: { error: 'Wrong ASN.1 schema' } };
		let r = t.idBlock.toBER(!1);
		if (r.byteLength === 0) return { verified: !1, result: { error: 'Error encoding idBlock for ASN.1 schema' } };
		if (t.idBlock.fromBER(r, 0, r.byteLength) === -1) {
			return {
				verified: !1,
				result: { error: 'Error decoding idBlock for ASN.1 schema' },
			};
		}
		if (t.idBlock.hasOwnProperty(td) === !1) return { verified: !1, result: { error: 'Wrong ASN.1 schema' } };
		if (t.idBlock.tagClass !== e.idBlock.tagClass) return { verified: !1, result: n };
		if (t.idBlock.hasOwnProperty(rd) === !1) return { verified: !1, result: { error: 'Wrong ASN.1 schema' } };
		if (t.idBlock.tagNumber !== e.idBlock.tagNumber) return { verified: !1, result: n };
		if (t.idBlock.hasOwnProperty(nd) === !1) return { verified: !1, result: { error: 'Wrong ASN.1 schema' } };
		if (t.idBlock.isConstructed !== e.idBlock.isConstructed) return { verified: !1, result: n };
		if (!(Qp in t.idBlock)) return { verified: !1, result: { error: 'Wrong ASN.1 schema' } };
		if (t.idBlock.isHexOnly !== e.idBlock.isHexOnly) return { verified: !1, result: n };
		if (t.idBlock.isHexOnly) {
			if (!(Pu in t.idBlock)) return { verified: !1, result: { error: 'Wrong ASN.1 schema' } };
			let o = t.idBlock.valueHexView, a = e.idBlock.valueHexView;
			if (o.length !== a.length) return { verified: !1, result: n };
			for (let i = 0; i < o.length; i++) if (o[i] !== a[1]) return { verified: !1, result: n };
		}
		if (t.name && (t.name = t.name.replace(/^\s+|\s+$/g, Ce), t.name && (n[t.name] = e)), t instanceof w.Constructed) {
			let o = 0, a = { verified: !1, result: { error: 'Unknown error' } }, i = t.valueBlock.value.length;
			if (i > 0 && t.valueBlock.value[0] instanceof Mn && (i = e.valueBlock.value.length), i === 0) {
				return {
					verified: !0,
					result: n,
				};
			}
			if (e.valueBlock.value.length === 0 && t.valueBlock.value.length !== 0) {
				let c = !0;
				for (let u = 0; u < t.valueBlock.value.length; u++) c = c && (t.valueBlock.value[u].optional || !1);
				return c
					? { verified: !0, result: n }
					: (t.name && (t.name = t.name.replace(/^\s+|\s+$/g, Ce), t.name && delete n[t.name]),
						n.error = 'Inconsistent object length',
						{ verified: !1, result: n });
			}
			for (let c = 0; c < i; c++) {
				if (c - o >= e.valueBlock.value.length) {
					if (t.valueBlock.value[c].optional === !1) {
						let u = { verified: !1, result: n };
						return n.error = 'Inconsistent length between ASN.1 data and schema',
							t.name && (t.name = t.name.replace(/^\s+|\s+$/g, Ce), t.name && (delete n[t.name], u.name = t.name)),
							u;
					}
				} else if (t.valueBlock.value[0] instanceof Mn) {
					if (a = Kr(n, e.valueBlock.value[c], t.valueBlock.value[0].value), a.verified === !1) {
						if (
							t.valueBlock.value[0].optional
						) {
							o++;
						} else return t.name && (t.name = t.name.replace(/^\s+|\s+$/g, Ce), t.name && delete n[t.name]), a;
					}
					if (pa in t.valueBlock.value[0] && t.valueBlock.value[0].name.length > 0) {
						let u = {};
						ad in t.valueBlock.value[0] && t.valueBlock.value[0].local ? u = e : u = n,
							typeof u[t.valueBlock.value[0].name] > 'u' && (u[t.valueBlock.value[0].name] = []),
							u[t.valueBlock.value[0].name].push(e.valueBlock.value[c]);
					}
				} else if (a = Kr(n, e.valueBlock.value[c - o], t.valueBlock.value[c]), a.verified === !1) {
					if (
						t.valueBlock.value[c].optional
					) {
						o++;
					} else return t.name && (t.name = t.name.replace(/^\s+|\s+$/g, Ce), t.name && delete n[t.name]), a;
				}
			}
			if (a.verified === !1) {
				let c = { verified: !1, result: n };
				return t.name && (t.name = t.name.replace(/^\s+|\s+$/g, Ce), t.name && (delete n[t.name], c.name = t.name)), c;
			}
			return { verified: !0, result: n };
		}
		if (t.primitiveSchema && Pu in e.valueBlock) {
			let o = Rr(e.valueBlock.valueHexView);
			if (o.offset === -1) {
				let a = { verified: !1, result: o.result };
				return t.name && (t.name = t.name.replace(/^\s+|\s+$/g, Ce), t.name && (delete n[t.name], a.name = t.name)), a;
			}
			return Kr(n, o.result, t.primitiveSchema);
		}
		return { verified: !0, result: n };
	}
	function hd(n, e) {
		if (!(e instanceof Object)) return { verified: !1, result: { error: 'Wrong ASN.1 schema type' } };
		let t = Rr($.BufferSourceConverter.toUint8Array(n));
		return t.offset === -1 ? { verified: !1, result: t.result } : Kr(t.result, t.result, e);
	}
	C.Any = tr;
	C.BaseBlock = he;
	C.BaseStringBlock = fn;
	C.BitString = yn;
	C.BmpString = Bn;
	C.Boolean = mn;
	C.CharacterString = On;
	C.Choice = qs;
	C.Constructed = Bt;
	C.DATE = $n;
	C.DateTime = jn;
	C.Duration = Vn;
	C.EndOfContent = pn;
	C.Enumerated = vn;
	C.GeneralString = Kn;
	C.GeneralizedTime = Un;
	C.GraphicString = In;
	C.HexBlock = dt;
	C.IA5String = Nn;
	C.Integer = ht;
	C.Null = dn;
	C.NumericString = Cn;
	C.ObjectIdentifier = bn;
	C.OctetString = er;
	C.Primitive = hn;
	C.PrintableString = En;
	C.RawData = da;
	C.RelativeObjectIdentifier = xn;
	C.Repeated = Mn;
	C.Sequence = Sn;
	C.Set = kn;
	C.TIME = Hn;
	C.TeletexString = Pn;
	C.TimeOfDay = Rn;
	C.UTCTime = $r;
	C.UniversalString = _n;
	C.Utf8String = pt;
	C.ValueBlock = ye;
	C.VideotexString = Tn;
	C.ViewWriter = Or;
	C.VisibleString = Ur;
	C.compareSchema = Kr;
	C.fromBER = cd;
	C.verifySchema = hd;
});
var jr = Y(Ht => {
	'use strict';
	Object.defineProperty(Ht, '__esModule', { value: !0 });
	Ht.AsnPropTypes = Ht.AsnTypeTypes = void 0;
	var pd;
	(function(n) {
		n[n.Sequence = 0] = 'Sequence', n[n.Set = 1] = 'Set', n[n.Choice = 2] = 'Choice';
	})(pd = Ht.AsnTypeTypes || (Ht.AsnTypeTypes = {}));
	var dd;
	(function(n) {
		n[n.Any = 1] = 'Any',
			n[n.Boolean = 2] = 'Boolean',
			n[n.OctetString = 3] = 'OctetString',
			n[n.BitString = 4] = 'BitString',
			n[n.Integer = 5] = 'Integer',
			n[n.Enumerated = 6] = 'Enumerated',
			n[n.ObjectIdentifier = 7] = 'ObjectIdentifier',
			n[n.Utf8String = 8] = 'Utf8String',
			n[n.BmpString = 9] = 'BmpString',
			n[n.UniversalString = 10] = 'UniversalString',
			n[n.NumericString = 11] = 'NumericString',
			n[n.PrintableString = 12] = 'PrintableString',
			n[n.TeletexString = 13] = 'TeletexString',
			n[n.VideotexString = 14] = 'VideotexString',
			n[n.IA5String = 15] = 'IA5String',
			n[n.GraphicString = 16] = 'GraphicString',
			n[n.VisibleString = 17] = 'VisibleString',
			n[n.GeneralString = 18] = 'GeneralString',
			n[n.CharacterString = 19] = 'CharacterString',
			n[n.UTCTime = 20] = 'UTCTime',
			n[n.GeneralizedTime = 21] = 'GeneralizedTime',
			n[n.DATE = 22] = 'DATE',
			n[n.TimeOfDay = 23] = 'TimeOfDay',
			n[n.DateTime = 24] = 'DateTime',
			n[n.Duration = 25] = 'Duration',
			n[n.TIME = 26] = 'TIME',
			n[n.Null = 27] = 'Null';
	})(dd = Ht.AsnPropTypes || (Ht.AsnPropTypes = {}));
});
var Ln = Y(g => {
	'use strict';
	Object.defineProperty(g, '__esModule', { value: !0 });
	g.defaultConverter = g.AsnNullConverter = g.AsnGeneralizedTimeConverter = g.AsnUTCTimeConverter = g
		.AsnCharacterStringConverter = g.AsnGeneralStringConverter = g.AsnVisibleStringConverter = g
			.AsnGraphicStringConverter = g.AsnIA5StringConverter = g.AsnVideotexStringConverter = g
				.AsnTeletexStringConverter = g.AsnPrintableStringConverter = g.AsnNumericStringConverter = g
					.AsnUniversalStringConverter = g.AsnBmpStringConverter = g.AsnUtf8StringConverter = g
						.AsnOctetStringConverter = g.AsnBooleanConverter = g.AsnObjectIdentifierConverter = g
							.AsnBitStringConverter = g.AsnIntegerArrayBufferConverter = g.AsnEnumeratedConverter = g
								.AsnIntegerConverter = g.AsnAnyConverter = void 0;
	var ee = Ct(), oe = jr();
	g.AsnAnyConverter = {
		fromASN: n => n instanceof ee.Null ? null : n.valueBeforeDecode,
		toASN: n => {
			if (n === null) return new ee.Null();
			let e = ee.fromBER(n);
			if (e.result.error) throw new Error(e.result.error);
			return e.result;
		},
	};
	g.AsnIntegerConverter = {
		fromASN: n => n.valueBlock.valueHex.byteLength > 4 ? n.valueBlock.toString() : n.valueBlock.valueDec,
		toASN: n => new ee.Integer({ value: n }),
	};
	g.AsnEnumeratedConverter = { fromASN: n => n.valueBlock.valueDec, toASN: n => new ee.Enumerated({ value: n }) };
	g.AsnIntegerArrayBufferConverter = {
		fromASN: n => n.valueBlock.valueHex,
		toASN: n => new ee.Integer({ valueHex: n }),
	};
	g.AsnBitStringConverter = { fromASN: n => n.valueBlock.valueHex, toASN: n => new ee.BitString({ valueHex: n }) };
	g.AsnObjectIdentifierConverter = {
		fromASN: n => n.valueBlock.toString(),
		toASN: n => new ee.ObjectIdentifier({ value: n }),
	};
	g.AsnBooleanConverter = { fromASN: n => n.valueBlock.value, toASN: n => new ee.Boolean({ value: n }) };
	g.AsnOctetStringConverter = { fromASN: n => n.valueBlock.valueHex, toASN: n => new ee.OctetString({ valueHex: n }) };
	function Fe(n) {
		return { fromASN: e => e.valueBlock.value, toASN: e => new n({ value: e }) };
	}
	g.AsnUtf8StringConverter = Fe(ee.Utf8String);
	g.AsnBmpStringConverter = Fe(ee.BmpString);
	g.AsnUniversalStringConverter = Fe(ee.UniversalString);
	g.AsnNumericStringConverter = Fe(ee.NumericString);
	g.AsnPrintableStringConverter = Fe(ee.PrintableString);
	g.AsnTeletexStringConverter = Fe(ee.TeletexString);
	g.AsnVideotexStringConverter = Fe(ee.VideotexString);
	g.AsnIA5StringConverter = Fe(ee.IA5String);
	g.AsnGraphicStringConverter = Fe(ee.GraphicString);
	g.AsnVisibleStringConverter = Fe(ee.VisibleString);
	g.AsnGeneralStringConverter = Fe(ee.GeneralString);
	g.AsnCharacterStringConverter = Fe(ee.CharacterString);
	g.AsnUTCTimeConverter = { fromASN: n => n.toDate(), toASN: n => new ee.UTCTime({ valueDate: n }) };
	g.AsnGeneralizedTimeConverter = { fromASN: n => n.toDate(), toASN: n => new ee.GeneralizedTime({ valueDate: n }) };
	g.AsnNullConverter = { fromASN: n => null, toASN: n => new ee.Null() };
	function md(n) {
		switch (n) {
			case oe.AsnPropTypes.Any:
				return g.AsnAnyConverter;
			case oe.AsnPropTypes.BitString:
				return g.AsnBitStringConverter;
			case oe.AsnPropTypes.BmpString:
				return g.AsnBmpStringConverter;
			case oe.AsnPropTypes.Boolean:
				return g.AsnBooleanConverter;
			case oe.AsnPropTypes.CharacterString:
				return g.AsnCharacterStringConverter;
			case oe.AsnPropTypes.Enumerated:
				return g.AsnEnumeratedConverter;
			case oe.AsnPropTypes.GeneralString:
				return g.AsnGeneralStringConverter;
			case oe.AsnPropTypes.GeneralizedTime:
				return g.AsnGeneralizedTimeConverter;
			case oe.AsnPropTypes.GraphicString:
				return g.AsnGraphicStringConverter;
			case oe.AsnPropTypes.IA5String:
				return g.AsnIA5StringConverter;
			case oe.AsnPropTypes.Integer:
				return g.AsnIntegerConverter;
			case oe.AsnPropTypes.Null:
				return g.AsnNullConverter;
			case oe.AsnPropTypes.NumericString:
				return g.AsnNumericStringConverter;
			case oe.AsnPropTypes.ObjectIdentifier:
				return g.AsnObjectIdentifierConverter;
			case oe.AsnPropTypes.OctetString:
				return g.AsnOctetStringConverter;
			case oe.AsnPropTypes.PrintableString:
				return g.AsnPrintableStringConverter;
			case oe.AsnPropTypes.TeletexString:
				return g.AsnTeletexStringConverter;
			case oe.AsnPropTypes.UTCTime:
				return g.AsnUTCTimeConverter;
			case oe.AsnPropTypes.UniversalString:
				return g.AsnUniversalStringConverter;
			case oe.AsnPropTypes.Utf8String:
				return g.AsnUtf8StringConverter;
			case oe.AsnPropTypes.VideotexString:
				return g.AsnVideotexStringConverter;
			case oe.AsnPropTypes.VisibleString:
				return g.AsnVisibleStringConverter;
			default:
				return null;
		}
	}
	g.defaultConverter = md;
});
var ml = Y(Zs => {
	'use strict';
	Object.defineProperty(Zs, '__esModule', { value: !0 });
	Zs.BitString = void 0;
	var ya = Ct(),
		dl = Qt(),
		ga = class {
			constructor(e, t = 0) {
				if (this.unusedBits = 0, this.value = new ArrayBuffer(0), e) {
					if (typeof e == 'number') this.fromNumber(e);
					else if (dl.BufferSourceConverter.isBufferSource(e)) {
						this.unusedBits = t, this.value = dl.BufferSourceConverter.toArrayBuffer(e);
					} else throw TypeError("Unsupported type of 'params' argument for BitString");
				}
			}
			fromASN(e) {
				if (!(e instanceof ya.BitString)) {
					throw new TypeError("Argument 'asn' is not instance of ASN.1 BitString");
				}
				return this.unusedBits = e.valueBlock.unusedBits, this.value = e.valueBlock.valueHex, this;
			}
			toASN() {
				return new ya.BitString({ unusedBits: this.unusedBits, valueHex: this.value });
			}
			toSchema(e) {
				return new ya.BitString({ name: e });
			}
			toNumber() {
				let e = '', t = new Uint8Array(this.value);
				for (let r of t) e += r.toString(2).padStart(8, '0');
				return e = e.split('').reverse().join(''),
					this.unusedBits && (e = e.slice(this.unusedBits).padStart(this.unusedBits, '0')),
					parseInt(e, 2);
			}
			fromNumber(e) {
				let t = e.toString(2), r = t.length + 7 >> 3;
				this.unusedBits = (r << 3) - t.length;
				let s = new Uint8Array(r);
				t = t.padStart(r << 3, '0').split('').reverse().join('');
				let o = 0;
				for (; o < r;) s[o] = parseInt(t.slice(o << 3, (o << 3) + 8), 2), o++;
				this.value = s.buffer;
			}
		};
	Zs.BitString = ga;
});
var gl = Y(Ws => {
	'use strict';
	Object.defineProperty(Ws, '__esModule', { value: !0 });
	Ws.OctetString = void 0;
	var va = Ct(),
		yl = Qt(),
		wa = class {
			constructor(e) {
				typeof e == 'number'
					? this.buffer = new ArrayBuffer(e)
					: yl.BufferSourceConverter.isBufferSource(e)
					? this.buffer = yl.BufferSourceConverter.toArrayBuffer(e)
					: Array.isArray(e)
					? this.buffer = new Uint8Array(e)
					: this.buffer = new ArrayBuffer(0);
			}
			get byteLength() {
				return this.buffer.byteLength;
			}
			get byteOffset() {
				return 0;
			}
			fromASN(e) {
				if (!(e instanceof va.OctetString)) throw new TypeError("Argument 'asn' is not instance of ASN.1 OctetString");
				return this.buffer = e.valueBlock.valueHex, this;
			}
			toASN() {
				return new va.OctetString({ valueHex: this.buffer });
			}
			toSchema(e) {
				return new va.OctetString({ name: e });
			}
		};
	Ws.OctetString = wa;
});
var wl = Y(Ys => {
	'use strict';
	Object.defineProperty(Ys, '__esModule', { value: !0 });
	var vl = Ir();
	vl.__exportStar(ml(), Ys);
	vl.__exportStar(gl(), Ys);
});
var Xs = Y(Mt => {
	'use strict';
	Object.defineProperty(Mt, '__esModule', { value: !0 });
	Mt.isArrayEqual = Mt.isTypeOfArray = Mt.isConvertible = void 0;
	function bl(n) {
		return n && n.prototype
			? n.prototype.toASN && n.prototype.fromASN ? !0 : bl(n.prototype)
			: !!(n && n.toASN && n.fromASN);
	}
	Mt.isConvertible = bl;
	function Al(n) {
		var e;
		if (n) {
			let t = Object.getPrototypeOf(n);
			return ((e = t?.prototype) === null || e === void 0 ? void 0 : e.constructor) === Array ? !0 : Al(t);
		}
		return !1;
	}
	Mt.isTypeOfArray = Al;
	function yd(n, e) {
		if (!(n && e) || n.byteLength !== e.byteLength) return !1;
		let t = new Uint8Array(n), r = new Uint8Array(e);
		for (let s = 0; s < n.byteLength; s++) if (t[s] !== r[s]) return !1;
		return !0;
	}
	Mt.isArrayEqual = yd;
});
var Sl = Y(Qs => {
	'use strict';
	Object.defineProperty(Qs, '__esModule', { value: !0 });
	Qs.AsnSchemaStorage = void 0;
	var Ie = Ct(),
		Vr = jr(),
		xl = Xs(),
		ba = class {
			constructor() {
				this.items = new WeakMap();
			}
			has(e) {
				return this.items.has(e);
			}
			get(e) {
				var t, r, s;
				let o = this.items.get(e);
				if (!o) {
					throw new Error(
						`Cannot get schema for '${
							(s = (r = (t = e?.prototype) === null || t === void 0 ? void 0 : t.constructor) === null || r === void 0
										? void 0
										: r.name) !== null && s !== void 0
								? s
								: e
						}' target`,
					);
				}
				return o;
			}
			cache(e) {
				let t = this.get(e);
				t.schema || (t.schema = this.create(e, !0));
			}
			createDefault(e) {
				let t = { type: Vr.AsnTypeTypes.Sequence, items: {} }, r = this.findParentSchema(e);
				return r && (Object.assign(t, r), t.items = Object.assign({}, t.items, r.items)), t;
			}
			create(e, t) {
				let r = this.items.get(e) || this.createDefault(e), s = [];
				for (let o in r.items) {
					let a = r.items[o], i = t ? o : '', c;
					if (typeof a.type == 'number') {
						let l = Vr.AsnPropTypes[a.type], f = Ie[l];
						if (!f) throw new Error(`Cannot get ASN1 class by name '${l}'`);
						c = new f({ name: i });
					} else {
						(0, xl.isConvertible)(a.type)
							? c = new a.type().toSchema(i)
							: a.optional
							? this.get(a.type).type === Vr.AsnTypeTypes.Choice
								? c = new Ie.Any({ name: i })
								: (c = this.create(a.type, !1), c.name = i)
							: c = new Ie.Any({ name: i });
					}
					let u = !!a.optional || a.defaultValue !== void 0;
					if (a.repeated) {
						c.name = '';
						let l = a.repeated === 'set' ? Ie.Set : Ie.Sequence;
						c = new l({ name: '', value: [new Ie.Repeated({ name: i, value: c })] });
					}
					if (a.context !== null && a.context !== void 0) {
						if (a.implicit) {
							if (typeof a.type == 'number' || (0, xl.isConvertible)(a.type)) {
								let l = a.repeated ? Ie.Constructed : Ie.Primitive;
								s.push(new l({ name: i, optional: u, idBlock: { tagClass: 3, tagNumber: a.context } }));
							} else {
								this.cache(a.type);
								let l = !!a.repeated, f = l ? c : this.get(a.type).schema;
								f = f.valueBlock ? f.valueBlock.value : f.value,
									s.push(
										new Ie.Constructed({
											name: l ? '' : i,
											optional: u,
											idBlock: { tagClass: 3, tagNumber: a.context },
											value: f,
										}),
									);
							}
						} else {
							s.push(new Ie.Constructed({ optional: u, idBlock: { tagClass: 3, tagNumber: a.context }, value: [c] }));
						}
					} else c.optional = u, s.push(c);
				}
				switch (r.type) {
					case Vr.AsnTypeTypes.Sequence:
						return new Ie.Sequence({ value: s, name: '' });
					case Vr.AsnTypeTypes.Set:
						return new Ie.Set({ value: s, name: '' });
					case Vr.AsnTypeTypes.Choice:
						return new Ie.Choice({ value: s, name: '' });
					default:
						throw new Error('Unsupported ASN1 type in use');
				}
			}
			set(e, t) {
				return this.items.set(e, t), this;
			}
			findParentSchema(e) {
				let t = e.__proto__;
				return t ? this.items.get(t) || this.findParentSchema(t) : null;
			}
		};
	Qs.AsnSchemaStorage = ba;
});
var to = Y(eo => {
	'use strict';
	Object.defineProperty(eo, '__esModule', { value: !0 });
	eo.schemaStorage = void 0;
	var gd = Sl();
	eo.schemaStorage = new gd.AsnSchemaStorage();
});
var kl = Y(Hr => {
	'use strict';
	Object.defineProperty(Hr, '__esModule', { value: !0 });
	Hr.AsnProp = Hr.AsnType = void 0;
	var vd = Ln(),
		Lt = to(),
		wd = n =>
			e => {
				let t;
				Lt.schemaStorage.has(e)
					? t = Lt.schemaStorage.get(e)
					: (t = Lt.schemaStorage.createDefault(e), Lt.schemaStorage.set(e, t)), Object.assign(t, n);
			};
	Hr.AsnType = wd;
	var bd = n =>
		(e, t) => {
			let r;
			Lt.schemaStorage.has(e.constructor)
				? r = Lt.schemaStorage.get(e.constructor)
				: (r = Lt.schemaStorage.createDefault(e.constructor), Lt.schemaStorage.set(e.constructor, r));
			let s = Object.assign({}, n);
			if (typeof s.type == 'number' && !s.converter) {
				let o = vd.defaultConverter(n.type);
				if (!o) throw new Error(`Cannot get default converter for property '${t}' of ${e.constructor.name}`);
				s.converter = o;
			}
			r.items[t] = s;
		};
	Hr.AsnProp = bd;
});
var Bl = Y(ro => {
	'use strict';
	Object.defineProperty(ro, '__esModule', { value: !0 });
	ro.AsnSchemaValidationError = void 0;
	var Aa = class extends Error {
		constructor() {
			super(...arguments), this.schemas = [];
		}
	};
	ro.AsnSchemaValidationError = Aa;
});
var Sa = Y(xa => {
	'use strict';
	Object.defineProperty(xa, '__esModule', { value: !0 });
	var Ad = Ir();
	Ad.__exportStar(Bl(), xa);
});
var Ba = Y(no => {
	'use strict';
	Object.defineProperty(no, '__esModule', { value: !0 });
	no.AsnParser = void 0;
	var Et = Ct(),
		_l = jr(),
		xd = Ln(),
		Cl = Sa(),
		Dn = Xs(),
		El = to(),
		ka = class {
			static parse(e, t) {
				let r;
				if (e instanceof ArrayBuffer) r = e;
				else if (typeof Buffer < 'u' && Buffer.isBuffer(e)) r = new Uint8Array(e).buffer;
				else if (ArrayBuffer.isView(e) || e.buffer instanceof ArrayBuffer) r = e.buffer;
				else throw new TypeError("Wrong type of 'data' argument");
				let s = Et.fromBER(r);
				if (s.result.error) throw new Error(s.result.error);
				return this.fromASN(s.result, t);
			}
			static fromASN(e, t) {
				var r;
				try {
					if ((0, Dn.isConvertible)(t)) return new t().fromASN(e);
					let s = El.schemaStorage.get(t);
					El.schemaStorage.cache(t);
					let o = s.schema;
					if (e.constructor === Et.Constructed && s.type !== _l.AsnTypeTypes.Choice) {
						o = new Et.Constructed({
							idBlock: { tagClass: 3, tagNumber: e.idBlock.tagNumber },
							value: s.schema.valueBlock.value,
						});
						for (let c in s.items) delete e[c];
					}
					let a = Et.compareSchema(e, e, o);
					if (!a.verified) {
						throw new Cl.AsnSchemaValidationError(`Data does not match to ${t.name} ASN1 schema. ${a.result.error}`);
					}
					let i = new t();
					if ((0, Dn.isTypeOfArray)(t)) {
						if (typeof s.itemType == 'number') {
							let c = xd.defaultConverter(s.itemType);
							if (!c) throw new Error(`Cannot get default converter for array item of ${t.name} ASN1 schema`);
							return t.from(e.valueBlock.value, u => c.fromASN(u));
						} else return t.from(e.valueBlock.value, c => this.fromASN(c, s.itemType));
					}
					for (let c in s.items) {
						if (!e[c]) continue;
						let u = s.items[c];
						if (typeof u.type == 'number' || (0, Dn.isConvertible)(u.type)) {
							let l = (r = u.converter) !== null && r !== void 0
								? r
								: (0, Dn.isConvertible)(u.type)
								? new u.type()
								: null;
							if (!l) throw new Error('Converter is empty');
							if (u.repeated) {
								if (u.implicit) {
									let f = u.repeated === 'sequence' ? Et.Sequence : Et.Set, d = new f();
									d.valueBlock = e[c].valueBlock;
									let y = Et.fromBER(d.toBER(!1)).result.valueBlock.value;
									i[c] = Array.from(y, x => l.fromASN(x));
								} else i[c] = Array.from(e[c], f => l.fromASN(f));
							} else {
								let f = e[c];
								if (u.implicit) {
									let d;
									if ((0, Dn.isConvertible)(u.type)) d = new u.type().toSchema('');
									else {
										let y = _l.AsnPropTypes[u.type], x = Et[y];
										if (!x) throw new Error(`Cannot get '${y}' class from asn1js module`);
										d = new x();
									}
									d.valueBlock = f.valueBlock, f = Et.fromBER(d.toBER(!1)).result;
								}
								i[c] = l.fromASN(f);
							}
						} else {
							u.repeated
								? i[c] = Array.from(e[c], l => this.fromASN(l, u.type))
								: i[c] = this.fromASN(e[c], u.type);
						}
					}
					return i;
				} catch (s) {
					throw s instanceof Cl.AsnSchemaValidationError && s.schemas.push(t.name), s;
				}
			}
		};
	no.AsnParser = ka;
});
var Ca = Y(oo => {
	'use strict';
	Object.defineProperty(oo, '__esModule', { value: !0 });
	oo.AsnSerializer = void 0;
	var Xe = Ct(),
		Sd = Ln(),
		so = jr(),
		_a = Xs(),
		Pl = to(),
		Fn = class {
			static serialize(e) {
				return e instanceof Xe.BaseBlock ? e.toBER(!1) : this.toASN(e).toBER(!1);
			}
			static toASN(e) {
				if (e && (0, _a.isConvertible)(e.constructor)) return e.toASN();
				let t = e.constructor, r = Pl.schemaStorage.get(t);
				Pl.schemaStorage.cache(t);
				let s = [];
				if (r.itemType) {
					if (typeof r.itemType == 'number') {
						let a = Sd.defaultConverter(r.itemType);
						if (!a) throw new Error(`Cannot get default converter for array item of ${t.name} ASN1 schema`);
						s = e.map(i => a.toASN(i));
					} else s = e.map(a => this.toAsnItem({ type: r.itemType }, '[]', t, a));
				} else {
					for (let a in r.items) {
						let i = r.items[a], c = e[a];
						if (
							c === void 0 || i.defaultValue === c
							|| typeof i.defaultValue == 'object' && typeof c == 'object'
								&& (0, _a.isArrayEqual)(this.serialize(i.defaultValue), this.serialize(c))
						) {
							continue;
						}
						let u = Fn.toAsnItem(i, a, t, c);
						if (typeof i.context == 'number') {
							if (i.implicit) {
								if (!i.repeated && (typeof i.type == 'number' || (0, _a.isConvertible)(i.type))) {
									let l = {};
									l.valueHex = u instanceof Xe.Null ? u.valueBeforeDecode : u.valueBlock.toBER(),
										s.push(
											new Xe.Primitive({ optional: i.optional, idBlock: { tagClass: 3, tagNumber: i.context }, ...l }),
										);
								} else {
									s.push(
										new Xe.Constructed({
											optional: i.optional,
											idBlock: { tagClass: 3, tagNumber: i.context },
											value: u.valueBlock.value,
										}),
									);
								}
							} else {
								s.push(
									new Xe.Constructed({
										optional: i.optional,
										idBlock: { tagClass: 3, tagNumber: i.context },
										value: [u],
									}),
								);
							}
						} else i.repeated ? s = s.concat(u) : s.push(u);
					}
				}
				let o;
				switch (r.type) {
					case so.AsnTypeTypes.Sequence:
						o = new Xe.Sequence({ value: s });
						break;
					case so.AsnTypeTypes.Set:
						o = new Xe.Set({ value: s });
						break;
					case so.AsnTypeTypes.Choice:
						if (!s[0]) throw new Error(`Schema '${t.name}' has wrong data. Choice cannot be empty.`);
						o = s[0];
						break;
				}
				return o;
			}
			static toAsnItem(e, t, r, s) {
				let o;
				if (typeof e.type == 'number') {
					let a = e.converter;
					if (!a) {
						throw new Error(
							`Property '${t}' doesn't have converter for type ${so.AsnPropTypes[e.type]} in schema '${r.name}'`,
						);
					}
					if (e.repeated) {
						let i = Array.from(s, u => a.toASN(u)), c = e.repeated === 'sequence' ? Xe.Sequence : Xe.Set;
						o = new c({ value: i });
					} else o = a.toASN(s);
				} else if (e.repeated) {
					let a = Array.from(s, c => this.toASN(c)), i = e.repeated === 'sequence' ? Xe.Sequence : Xe.Set;
					o = new i({ value: a });
				} else o = this.toASN(s);
				return o;
			}
		};
	oo.AsnSerializer = Fn;
});
var Tl = Y(ao => {
	'use strict';
	Object.defineProperty(ao, '__esModule', { value: !0 });
	ao.AsnArray = void 0;
	var Ea = class extends Array {
		constructor(e = []) {
			if (typeof e == 'number') super(e);
			else {
				super();
				for (let t of e) this.push(t);
			}
		}
	};
	ao.AsnArray = Ea;
});
var Il = Y(io => {
	'use strict';
	Object.defineProperty(io, '__esModule', { value: !0 });
	io.AsnConvert = void 0;
	var kd = Ct(),
		Nl = Qt(),
		Bd = Ba(),
		_d = Ca(),
		zn = class {
			static serialize(e) {
				return _d.AsnSerializer.serialize(e);
			}
			static parse(e, t) {
				return Bd.AsnParser.parse(e, t);
			}
			static toString(e) {
				let t = Nl.BufferSourceConverter.isBufferSource(e)
						? Nl.BufferSourceConverter.toArrayBuffer(e)
						: zn.serialize(e),
					r = kd.fromBER(t);
				if (r.offset === -1) throw new Error(`Cannot decode ASN.1 data. ${r.result.error}`);
				return r.result.toString();
			}
		};
	io.AsnConvert = zn;
});
var Pa = Y(ue => {
	'use strict';
	Object.defineProperty(ue, '__esModule', { value: !0 });
	ue.AsnSerializer = ue.AsnParser = ue.AsnPropTypes = ue.AsnTypeTypes = ue.AsnType = ue.AsnProp = void 0;
	var Jn = Ir();
	Jn.__exportStar(Ln(), ue);
	Jn.__exportStar(wl(), ue);
	var Kl = kl();
	Object.defineProperty(ue, 'AsnProp', {
		enumerable: !0,
		get: function() {
			return Kl.AsnProp;
		},
	});
	Object.defineProperty(ue, 'AsnType', {
		enumerable: !0,
		get: function() {
			return Kl.AsnType;
		},
	});
	var Ol = jr();
	Object.defineProperty(ue, 'AsnTypeTypes', {
		enumerable: !0,
		get: function() {
			return Ol.AsnTypeTypes;
		},
	});
	Object.defineProperty(ue, 'AsnPropTypes', {
		enumerable: !0,
		get: function() {
			return Ol.AsnPropTypes;
		},
	});
	var Cd = Ba();
	Object.defineProperty(ue, 'AsnParser', {
		enumerable: !0,
		get: function() {
			return Cd.AsnParser;
		},
	});
	var Ed = Ca();
	Object.defineProperty(ue, 'AsnSerializer', {
		enumerable: !0,
		get: function() {
			return Ed.AsnSerializer;
		},
	});
	Jn.__exportStar(Sa(), ue);
	Jn.__exportStar(Tl(), ue);
	Jn.__exportStar(Il(), ue);
});
var $a = Y(te => {
	'use strict';
	Object.defineProperty(te, '__esModule', { value: !0 });
	var nr = class extends Error {
			constructor(e, t) {
				super(t ? `${e}. See the inner exception for more details.` : e), this.message = e, this.innerError = t;
			}
		},
		co = class extends nr {
			constructor(e, t, r) {
				super(t, r), this.schema = e;
			}
		},
		rr = class extends co {
			constructor(e, t, r) {
				super(e, `JSON doesn't match to '${e.target.name}' schema. ${t}`, r);
			}
		},
		et = class extends nr {},
		Mr = class extends nr {
			constructor(e, t, r) {
				super(`Cannot serialize by '${e}' schema. ${t}`, r), this.schemaName = e;
			}
		},
		qn = class extends rr {
			constructor(e, t, r = {}) {
				super(e, "Some keys doesn't match to schema"), this.keys = t, this.errors = r;
			}
		};
	(function(n) {
		n[n.Any = 0] = 'Any', n[n.Boolean = 1] = 'Boolean', n[n.Number = 2] = 'Number', n[n.String = 3] = 'String';
	})(te.JsonPropTypes || (te.JsonPropTypes = {}));
	function Pd(n, e) {
		switch (e) {
			case te.JsonPropTypes.Boolean:
				return typeof n == 'boolean';
			case te.JsonPropTypes.Number:
				return typeof n == 'number';
			case te.JsonPropTypes.String:
				return typeof n == 'string';
		}
		return !0;
	}
	function fo(n, e) {
		if (!Pd(n, e)) throw new TypeError(`Value must be ${te.JsonPropTypes[e]}`);
	}
	function ho(n) {
		return n && n.prototype
			? n.prototype.toJSON && n.prototype.fromJSON ? !0 : ho(n.prototype)
			: !!(n && n.toJSON && n.fromJSON);
	}
	var Ta = class {
			constructor() {
				this.items = new Map();
			}
			has(e) {
				return this.items.has(e) || !!this.findParentSchema(e);
			}
			get(e) {
				let t = this.items.get(e) || this.findParentSchema(e);
				if (!t) throw new Error('Cannot get schema for current target');
				return t;
			}
			create(e) {
				let t = { names: {} }, r = this.findParentSchema(e);
				if (r) {
					Object.assign(t, r), t.names = {};
					for (let s in r.names) t.names[s] = Object.assign({}, r.names[s]);
				}
				return t.target = e, t;
			}
			set(e, t) {
				return this.items.set(e, t), this;
			}
			findParentSchema(e) {
				let t = e.__proto__;
				return t ? this.items.get(t) || this.findParentSchema(t) : null;
			}
		},
		Gn = 'default',
		Qe = new Ta(),
		Na = class {
			constructor(e) {
				this.pattern = new RegExp(e);
			}
			validate(e) {
				let t = new RegExp(this.pattern.source, this.pattern.flags);
				if (typeof e != 'string') throw new et('Incoming value must be string');
				if (!t.exec(e)) throw new et(`Value doesn't match to pattern '${t.toString()}'`);
			}
		},
		Ia = class {
			constructor(e = Number.MIN_VALUE, t = Number.MAX_VALUE) {
				this.min = e, this.max = t;
			}
			validate(e) {
				if (fo(e, te.JsonPropTypes.Number), !(this.min <= e && e <= this.max)) {
					let t = this.min === Number.MIN_VALUE ? 'MIN' : this.min,
						r = this.max === Number.MAX_VALUE ? 'MAX' : this.max;
					throw new et(`Value doesn't match to diapason [${t},${r}]`);
				}
			}
		},
		Ka = class {
			constructor(e = Number.MIN_VALUE, t = Number.MAX_VALUE) {
				this.min = e, this.max = t;
			}
			validate(e) {
				if (fo(e, te.JsonPropTypes.Number), !(this.min < e && e < this.max)) {
					let t = this.min === Number.MIN_VALUE ? 'MIN' : this.min,
						r = this.max === Number.MAX_VALUE ? 'MAX' : this.max;
					throw new et(`Value doesn't match to diapason (${t},${r})`);
				}
			}
		},
		uo = class {
			constructor(e, t, r) {
				this.length = e, this.minLength = t, this.maxLength = r;
			}
			validate(e) {
				if (this.length !== void 0) {
					if (e.length !== this.length) throw new et(`Value length must be exactly ${this.length}.`);
					return;
				}
				if (this.minLength !== void 0 && e.length < this.minLength) {
					throw new et(`Value length must be more than ${this.minLength}.`);
				}
				if (this.maxLength !== void 0 && e.length > this.maxLength) {
					throw new et(`Value length must be less than ${this.maxLength}.`);
				}
			}
		},
		Oa = class {
			constructor(e) {
				this.enumeration = e;
			}
			validate(e) {
				if (fo(e, te.JsonPropTypes.String), !this.enumeration.includes(e)) {
					throw new et(`Value must be one of ${this.enumeration.map(t => `'${t}'`).join(', ')}`);
				}
			}
		},
		lo = class {
			static checkValues(e, t) {
				let r = Array.isArray(e) ? e : [e];
				for (let s of r) for (let o of t.validations) o instanceof uo && t.repeated ? o.validate(e) : o.validate(s);
			}
			static checkTypes(e, t) {
				if (t.repeated && !Array.isArray(e)) throw new TypeError('Value must be Array');
				if (typeof t.type == 'number') {
					let r = Array.isArray(e) ? e : [e];
					for (let s of r) fo(s, t.type);
				}
			}
			static getSchemaByName(e, t = Gn) {
				return { ...e.names[Gn], ...e.names[t] };
			}
		},
		Ua = class extends lo {
			static serialize(e, t, r, s) {
				let o = this.toJSON(e, t);
				return JSON.stringify(o, r, s);
			}
			static toJSON(e, t = {}) {
				let r, s = t.targetSchema, o = t.schemaName || Gn;
				if (ho(e)) return e.toJSON();
				if (Array.isArray(e)) {
					r = [];
					for (let a of e) r.push(this.toJSON(a, t));
				} else if (typeof e == 'object') {
					if (s && !Qe.has(s)) throw new nr('Cannot get schema for `targetSchema` param');
					if (s = s || e.constructor, Qe.has(s)) {
						let a = Qe.get(s);
						r = {};
						let i = this.getSchemaByName(a, o);
						for (let c in i) {
							try {
								let u = i[c], l = e[c], f;
								if (u.optional && l === void 0 || u.defaultValue !== void 0 && l === u.defaultValue) continue;
								if (!u.optional && l === void 0) throw new Mr(s.name, `Property '${c}' is required.`);
								typeof u.type == 'number'
									? u.converter
										? u.repeated ? f = l.map(d => u.converter.toJSON(d, e)) : f = u.converter.toJSON(l, e)
										: f = l
									: u.repeated
									? f = l.map(d => this.toJSON(d, { schemaName: o }))
									: f = this.toJSON(l, { schemaName: o }),
									this.checkTypes(f, u),
									this.checkValues(f, u),
									r[u.name || c] = f;
							} catch (u) {
								throw u instanceof Mr ? u : new Mr(a.target.name, `Property '${c}' is wrong. ${u.message}`, u);
							}
						}
					} else {
						r = {};
						for (let a in e) r[a] = this.toJSON(e[a], { schemaName: o });
					}
				} else r = e;
				return r;
			}
		},
		Zn = class extends lo {
			static parse(e, t) {
				let r = JSON.parse(e);
				return this.fromJSON(r, t);
			}
			static fromJSON(e, t) {
				let r = t.targetSchema, s = t.schemaName || Gn, o = new r();
				if (ho(o)) return o.fromJSON(e);
				let a = Qe.get(r), i = this.getSchemaByName(a, s), c = {};
				t.strictProperty && !Array.isArray(e) && Zn.checkStrictProperty(e, i, a);
				for (let l in i) {
					try {
						let f = i[l], d = f.name || l, y = e[d];
						if (y === void 0 && (f.optional || f.defaultValue !== void 0)) continue;
						if (!f.optional && y === void 0) throw new rr(a, `Property '${d}' is required.`);
						if (this.checkTypes(y, f), this.checkValues(y, f), typeof f.type == 'number') {
							f.converter
								? f.repeated ? o[l] = y.map(x => f.converter.fromJSON(x, o)) : o[l] = f.converter.fromJSON(y, o)
								: o[l] = y;
						} else {
							let x = { ...t, targetSchema: f.type, schemaName: s };
							f.repeated ? o[l] = y.map(N => this.fromJSON(N, x)) : o[l] = this.fromJSON(y, x);
						}
					} catch (f) {
						if (f instanceof rr || (f = new rr(a, `Property '${l}' is wrong. ${f.message}`, f)), t.strictAllKeys) {
							c[
								l
							] = f;
						} else throw f;
					}
				}
				let u = Object.keys(c);
				if (u.length) throw new qn(a, u, c);
				return o;
			}
			static checkStrictProperty(e, t, r) {
				let s = Object.keys(e), o = Object.keys(t), a = [];
				for (let i of s) o.indexOf(i) === -1 && a.push(i);
				if (a.length) throw new qn(r, a);
			}
		};
	function Td(n) {
		let e = [];
		return n.pattern && e.push(new Na(n.pattern)),
			(n.type === te.JsonPropTypes.Number || n.type === te.JsonPropTypes.Any)
			&& ((n.minInclusive !== void 0 || n.maxInclusive !== void 0) && e.push(new Ia(n.minInclusive, n.maxInclusive)),
				(n.minExclusive !== void 0 || n.maxExclusive !== void 0) && e.push(new Ka(n.minExclusive, n.maxExclusive)),
				n.enumeration !== void 0 && e.push(new Oa(n.enumeration))),
			(n.type === te.JsonPropTypes.String || n.repeated || n.type === te.JsonPropTypes.Any)
			&& (n.length !== void 0 || n.minLength !== void 0 || n.maxLength !== void 0)
			&& e.push(new uo(n.length, n.minLength, n.maxLength)),
			e;
	}
	var Nd = (n = {}) =>
		(e, t) => {
			let r = `Cannot set type for ${t} property of ${e.constructor.name} schema`, s;
			Qe.has(e.constructor)
				? (s = Qe.get(e.constructor),
					s.target !== e.constructor && (s = Qe.create(e.constructor), Qe.set(e.constructor, s)))
				: (s = Qe.create(e.constructor), Qe.set(e.constructor, s));
			let o = { type: te.JsonPropTypes.Any, validations: [] }, a = Object.assign(o, n);
			if (a.validations = Td(a), typeof a.type != 'number' && !Qe.has(a.type) && !ho(a.type)) {
				throw new Error(
					`${r}. Assigning type doesn't have schema.`,
				);
			}
			let i;
			Array.isArray(n.schema) ? i = n.schema : i = [n.schema || Gn];
			for (let c of i) {
				s.names[c] || (s.names[c] = {});
				let u = s.names[c];
				u[t] = a;
			}
		};
	te.JsonError = nr;
	te.JsonParser = Zn;
	te.JsonProp = Nd;
	te.JsonSerializer = Ua;
	te.KeyError = qn;
	te.ParserError = rr;
	te.SerializerError = Mr;
	te.TransformError = co;
	te.ValidationError = et;
});
var ef = Y(T => {
	'use strict';
	Object.defineProperty(T, '__esModule', { value: !0 });
	var P = Qt(), m = Pa(), R = Ir(), Je = $a(), Id = Ct();
	function Kd(n) {
		if (n && n.__esModule) return n;
		var e = Object.create(null);
		return n && Object.keys(n).forEach(function(t) {
			if (t !== 'default') {
				var r = Object.getOwnPropertyDescriptor(n, t);
				Object.defineProperty(
					e,
					t,
					r.get ? r : {
						enumerable: !0,
						get: function() {
							return n[t];
						},
					},
				);
			}
		}),
			e.default = n,
			Object.freeze(e);
	}
	var Ra = Kd(Id),
		mt = class extends Error {},
		Wn = class extends mt {},
		ze = class extends mt {
			constructor(e) {
				super(`Unsupported operation: ${e ? `${e}` : ''}`);
			}
		},
		Ke = class extends mt {},
		po = class extends mt {
			constructor(e) {
				super(`${e}: Missing required property`);
			}
		},
		ja = class {
			static toArrayBuffer(e) {
				let t = e.replace(/-{5}(BEGIN|END) .*-{5}/g, '').replace('\r', '').replace(
					`
`,
					'',
				);
				return P.Convert.FromBase64(t);
			}
			static toUint8Array(e) {
				let t = this.toArrayBuffer(e);
				return new Uint8Array(t);
			}
			static fromBufferSource(e, t) {
				let r = P.Convert.ToBase64(e), s, o = 0, a = [];
				for (; s = r.slice(o, o = o + 64), s.length;) if (a.push(s), s.length < 64) break;
				let i = t.toUpperCase();
				return `-----BEGIN ${i}-----
${
					a.join(`
`)
				}
-----END ${i}-----`;
			}
			static isPEM(e) {
				return /-----BEGIN .+-----[A-Za-z0-9+\/\+\=\s\n]+-----END .+-----/i.test(e);
			}
			static getTagName(e) {
				if (!this.isPEM(e)) throw new Error('Bad parameter. Incoming data is not right PEM');
				let t = /-----BEGIN (.+)-----/.exec(e);
				if (!t) throw new Error('Cannot get tag from PEM');
				return t[1];
			}
			static hasTagName(e, t) {
				let r = this.getTagName(e);
				return t.toLowerCase() === r.toLowerCase();
			}
			static isCertificate(e) {
				return this.hasTagName(e, 'certificate');
			}
			static isCertificateRequest(e) {
				return this.hasTagName(e, 'certificate request');
			}
			static isCRL(e) {
				return this.hasTagName(e, 'x509 crl');
			}
			static isPublicKey(e) {
				return this.hasTagName(e, 'public key');
			}
		};
	function Ul(n) {
		return typeof n == 'object' && 'kty' in n;
	}
	var tt = class {
			async digest(...e) {
				return this.checkDigest.apply(this, e), this.onDigest.apply(this, e);
			}
			checkDigest(e, t) {
				this.checkAlgorithmName(e);
			}
			async onDigest(e, t) {
				throw new ze('digest');
			}
			async generateKey(...e) {
				return this.checkGenerateKey.apply(this, e), this.onGenerateKey.apply(this, e);
			}
			checkGenerateKey(e, t, r, ...s) {
				if (this.checkAlgorithmName(e), this.checkGenerateKeyParams(e), !(r && r.length)) {
					throw new TypeError('Usages cannot be empty when creating a key.');
				}
				let o;
				Array.isArray(this.usages) ? o = this.usages : o = this.usages.privateKey.concat(this.usages.publicKey),
					this.checkKeyUsages(r, o);
			}
			checkGenerateKeyParams(e) {}
			async onGenerateKey(e, t, r, ...s) {
				throw new ze('generateKey');
			}
			async sign(...e) {
				return this.checkSign.apply(this, e), this.onSign.apply(this, e);
			}
			checkSign(e, t, r, ...s) {
				this.checkAlgorithmName(e), this.checkAlgorithmParams(e), this.checkCryptoKey(t, 'sign');
			}
			async onSign(e, t, r, ...s) {
				throw new ze('sign');
			}
			async verify(...e) {
				return this.checkVerify.apply(this, e), this.onVerify.apply(this, e);
			}
			checkVerify(e, t, r, s, ...o) {
				this.checkAlgorithmName(e), this.checkAlgorithmParams(e), this.checkCryptoKey(t, 'verify');
			}
			async onVerify(e, t, r, s, ...o) {
				throw new ze('verify');
			}
			async encrypt(...e) {
				return this.checkEncrypt.apply(this, e), this.onEncrypt.apply(this, e);
			}
			checkEncrypt(e, t, r, s = {}, ...o) {
				this.checkAlgorithmName(e),
					this.checkAlgorithmParams(e),
					this.checkCryptoKey(t, s.keyUsage ? 'encrypt' : void 0);
			}
			async onEncrypt(e, t, r, ...s) {
				throw new ze('encrypt');
			}
			async decrypt(...e) {
				return this.checkDecrypt.apply(this, e), this.onDecrypt.apply(this, e);
			}
			checkDecrypt(e, t, r, s = {}, ...o) {
				this.checkAlgorithmName(e),
					this.checkAlgorithmParams(e),
					this.checkCryptoKey(t, s.keyUsage ? 'decrypt' : void 0);
			}
			async onDecrypt(e, t, r, ...s) {
				throw new ze('decrypt');
			}
			async deriveBits(...e) {
				return this.checkDeriveBits.apply(this, e), this.onDeriveBits.apply(this, e);
			}
			checkDeriveBits(e, t, r, s = {}, ...o) {
				if (
					this.checkAlgorithmName(e),
						this.checkAlgorithmParams(e),
						this.checkCryptoKey(t, s.keyUsage ? 'deriveBits' : void 0),
						r % 8 !== 0
				) {
					throw new Ke('length: Is not multiple of 8');
				}
			}
			async onDeriveBits(e, t, r, ...s) {
				throw new ze('deriveBits');
			}
			async exportKey(...e) {
				return this.checkExportKey.apply(this, e), this.onExportKey.apply(this, e);
			}
			checkExportKey(e, t, ...r) {
				if (this.checkKeyFormat(e), this.checkCryptoKey(t), !t.extractable) throw new mt('key: Is not extractable');
			}
			async onExportKey(e, t, ...r) {
				throw new ze('exportKey');
			}
			async importKey(...e) {
				return this.checkImportKey.apply(this, e), this.onImportKey.apply(this, e);
			}
			checkImportKey(e, t, r, s, o, ...a) {
				this.checkKeyFormat(e),
					this.checkKeyData(e, t),
					this.checkAlgorithmName(r),
					this.checkImportParams(r),
					Array.isArray(this.usages) && this.checkKeyUsages(o, this.usages);
			}
			async onImportKey(e, t, r, s, o, ...a) {
				throw new ze('importKey');
			}
			checkAlgorithmName(e) {
				if (e.name.toLowerCase() !== this.name.toLowerCase()) throw new Wn('Unrecognized name');
			}
			checkAlgorithmParams(e) {}
			checkDerivedKeyParams(e) {}
			checkKeyUsages(e, t) {
				for (let r of e) {
					if (t.indexOf(r) === -1) throw new TypeError('Cannot create a key using the specified key usages');
				}
			}
			checkCryptoKey(e, t) {
				if (this.checkAlgorithmName(e.algorithm), t && e.usages.indexOf(t) === -1) {
					throw new mt('key does not match that of operation');
				}
			}
			checkRequiredProperty(e, t) {
				if (!(t in e)) throw new po(t);
			}
			checkHashAlgorithm(e, t) {
				for (let r of t) if (r.toLowerCase() === e.name.toLowerCase()) return;
				throw new Ke(`hash: Must be one of ${t.join(', ')}`);
			}
			checkImportParams(e) {}
			checkKeyFormat(e) {
				switch (e) {
					case 'raw':
					case 'pkcs8':
					case 'spki':
					case 'jwk':
						break;
					default:
						throw new TypeError("format: Is invalid value. Must be 'jwk', 'raw', 'spki', or 'pkcs8'");
				}
			}
			checkKeyData(e, t) {
				if (!t) throw new TypeError('keyData: Cannot be empty on empty on key importing');
				if (e === 'jwk') {
					if (!Ul(t)) throw new TypeError('keyData: Is not JsonWebToken');
					else if (!P.BufferSourceConverter.isBufferSource(t)) {
						throw new TypeError('keyData: Is not ArrayBufferView or ArrayBuffer');
					}
				}
			}
			prepareData(e) {
				return P.BufferSourceConverter.toArrayBuffer(e);
			}
		},
		Pt = class extends tt {
			checkGenerateKeyParams(e) {
				if (this.checkRequiredProperty(e, 'length'), typeof e.length != 'number') {
					throw new TypeError('length: Is not of type Number');
				}
				switch (e.length) {
					case 128:
					case 192:
					case 256:
						break;
					default:
						throw new TypeError('length: Must be 128, 192, or 256');
				}
			}
			checkDerivedKeyParams(e) {
				this.checkGenerateKeyParams(e);
			}
		},
		Va = class extends Pt {
			constructor() {
				super(...arguments), this.name = 'AES-CBC', this.usages = ['encrypt', 'decrypt', 'wrapKey', 'unwrapKey'];
			}
			checkAlgorithmParams(e) {
				if (
					this.checkRequiredProperty(e, 'iv'), !(e.iv instanceof ArrayBuffer || ArrayBuffer.isView(e.iv))
				) {
					throw new TypeError("iv: Is not of type '(ArrayBuffer or ArrayBufferView)'");
				}
				if (e.iv.byteLength !== 16) throw new TypeError('iv: Must have length 16 bytes');
			}
		},
		Ha = class extends Pt {
			constructor() {
				super(...arguments), this.name = 'AES-CMAC', this.usages = ['sign', 'verify'];
			}
			checkAlgorithmParams(e) {
				if (this.checkRequiredProperty(e, 'length'), typeof e.length != 'number') {
					throw new TypeError('length: Is not a Number');
				}
				if (e.length < 1) throw new Ke('length: Must be more than 0');
			}
		},
		Ma = class extends Pt {
			constructor() {
				super(...arguments), this.name = 'AES-CTR', this.usages = ['encrypt', 'decrypt', 'wrapKey', 'unwrapKey'];
			}
			checkAlgorithmParams(e) {
				if (
					this.checkRequiredProperty(e, 'counter'), !(e.counter instanceof ArrayBuffer || ArrayBuffer.isView(e.counter))
				) {
					throw new TypeError("counter: Is not of type '(ArrayBuffer or ArrayBufferView)'");
				}
				if (e.counter.byteLength !== 16) throw new TypeError('iv: Must have length 16 bytes');
				if (this.checkRequiredProperty(e, 'length'), typeof e.length != 'number') {
					throw new TypeError('length: Is not a Number');
				}
				if (e.length < 1) throw new Ke('length: Must be more than 0');
			}
		},
		La = class extends Pt {
			constructor() {
				super(...arguments), this.name = 'AES-ECB', this.usages = ['encrypt', 'decrypt', 'wrapKey', 'unwrapKey'];
			}
		},
		Da = class extends Pt {
			constructor() {
				super(...arguments), this.name = 'AES-GCM', this.usages = ['encrypt', 'decrypt', 'wrapKey', 'unwrapKey'];
			}
			checkAlgorithmParams(e) {
				if (
					this.checkRequiredProperty(e, 'iv'), !(e.iv instanceof ArrayBuffer || ArrayBuffer.isView(e.iv))
				) {
					throw new TypeError("iv: Is not of type '(ArrayBuffer or ArrayBufferView)'");
				}
				if (e.iv.byteLength < 1) throw new Ke('iv: Must have length more than 0 and less than 2^64 - 1');
				switch ('tagLength' in e || (e.tagLength = 128), e.tagLength) {
					case 32:
					case 64:
					case 96:
					case 104:
					case 112:
					case 120:
					case 128:
						break;
					default:
						throw new Ke('tagLength: Must be one of 32, 64, 96, 104, 112, 120 or 128');
				}
			}
		},
		Fa = class extends Pt {
			constructor() {
				super(...arguments), this.name = 'AES-KW', this.usages = ['wrapKey', 'unwrapKey'];
			}
		},
		za = class extends tt {
			constructor() {
				super(...arguments), this.usages = ['encrypt', 'decrypt', 'wrapKey', 'unwrapKey'];
			}
			checkAlgorithmParams(e) {
				if (this.ivSize) {
					if (
						this.checkRequiredProperty(e, 'iv'), !(e.iv instanceof ArrayBuffer || ArrayBuffer.isView(e.iv))
					) {
						throw new TypeError("iv: Is not of type '(ArrayBuffer or ArrayBufferView)'");
					}
					if (e.iv.byteLength !== this.ivSize) throw new TypeError(`iv: Must have length ${this.ivSize} bytes`);
				}
			}
			checkGenerateKeyParams(e) {
				if (this.checkRequiredProperty(e, 'length'), typeof e.length != 'number') {
					throw new TypeError('length: Is not of type Number');
				}
				if (e.length !== this.keySizeBits) throw new Ke(`algorithm.length: Must be ${this.keySizeBits}`);
			}
			checkDerivedKeyParams(e) {
				this.checkGenerateKeyParams(e);
			}
		},
		Lr = class extends tt {
			constructor() {
				super(...arguments), this.hashAlgorithms = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
			}
			checkGenerateKeyParams(e) {
				if (
					this.checkRequiredProperty(e, 'hash'),
						this.checkHashAlgorithm(e.hash, this.hashAlgorithms),
						this.checkRequiredProperty(e, 'publicExponent'),
						!(e.publicExponent && e.publicExponent instanceof Uint8Array)
				) {
					throw new TypeError('publicExponent: Missing or not a Uint8Array');
				}
				let t = P.Convert.ToBase64(e.publicExponent);
				if (!(t === 'Aw==' || t === 'AQAB')) throw new TypeError('publicExponent: Must be [3] or [1,0,1]');
				if (
					this.checkRequiredProperty(e, 'modulusLength'),
						e.modulusLength % 8 || e.modulusLength < 256 || e.modulusLength > 16384
				) {
					throw new TypeError('The modulus length must be a multiple of 8 bits and >= 256 and <= 16384');
				}
			}
			checkImportParams(e) {
				this.checkRequiredProperty(e, 'hash'), this.checkHashAlgorithm(e.hash, this.hashAlgorithms);
			}
		},
		Ja = class extends Lr {
			constructor() {
				super(...arguments),
					this.name = 'RSASSA-PKCS1-v1_5',
					this.usages = { privateKey: ['sign'], publicKey: ['verify'] };
			}
		},
		qa = class extends Lr {
			constructor() {
				super(...arguments), this.name = 'RSA-PSS', this.usages = { privateKey: ['sign'], publicKey: ['verify'] };
			}
			checkAlgorithmParams(e) {
				if (this.checkRequiredProperty(e, 'saltLength'), typeof e.saltLength != 'number') {
					throw new TypeError('saltLength: Is not a Number');
				}
				if (e.saltLength < 0) throw new RangeError('saltLength: Must be positive number');
			}
		},
		Ga = class extends Lr {
			constructor() {
				super(...arguments),
					this.name = 'RSA-OAEP',
					this.usages = { privateKey: ['decrypt', 'unwrapKey'], publicKey: ['encrypt', 'wrapKey'] };
			}
			checkAlgorithmParams(e) {
				if (e.label && !(e.label instanceof ArrayBuffer || ArrayBuffer.isView(e.label))) {
					throw new TypeError("label: Is not of type '(ArrayBuffer or ArrayBufferView)'");
				}
			}
		},
		Dr = class extends tt {
			checkGenerateKeyParams(e) {
				this.checkRequiredProperty(e, 'namedCurve'), this.checkNamedCurve(e.namedCurve);
			}
			checkNamedCurve(e) {
				for (let t of this.namedCurves) if (t.toLowerCase() === e.toLowerCase()) return;
				throw new Ke(`namedCurve: Must be one of ${this.namedCurves.join(', ')}`);
			}
		},
		Za = class extends Dr {
			constructor() {
				super(...arguments),
					this.name = 'ECDSA',
					this.hashAlgorithms = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'],
					this.usages = { privateKey: ['sign'], publicKey: ['verify'] },
					this.namedCurves = ['P-256', 'P-384', 'P-521', 'K-256'];
			}
			checkAlgorithmParams(e) {
				this.checkRequiredProperty(e, 'hash'), this.checkHashAlgorithm(e.hash, this.hashAlgorithms);
			}
		},
		Od = ['secret', 'private', 'public'],
		Yn = class {
			static create(e, t, r, s) {
				let o = new this();
				return o.algorithm = e, o.type = t, o.extractable = r, o.usages = s, o;
			}
			static isKeyType(e) {
				return Od.indexOf(e) !== -1;
			}
			get [Symbol.toStringTag]() {
				return 'CryptoKey';
			}
		},
		mo = class extends Dr {
			constructor() {
				super(...arguments),
					this.name = 'ECDH',
					this.usages = { privateKey: ['deriveBits', 'deriveKey'], publicKey: [] },
					this.namedCurves = ['P-256', 'P-384', 'P-521', 'K-256'];
			}
			checkAlgorithmParams(e) {
				if (this.checkRequiredProperty(e, 'public'), !(e.public instanceof Yn)) {
					throw new TypeError('public: Is not a CryptoKey');
				}
				if (e.public.type !== 'public') throw new Ke('public: Is not a public key');
				if (e.public.algorithm.name !== this.name) throw new Ke(`public: Is not ${this.name} key`);
			}
		},
		Wa = class extends mo {
			constructor() {
				super(...arguments), this.name = 'ECDH-ES', this.namedCurves = ['X25519', 'X448'];
			}
		},
		Ya = class extends Dr {
			constructor() {
				super(...arguments),
					this.name = 'EdDSA',
					this.usages = { privateKey: ['sign'], publicKey: ['verify'] },
					this.namedCurves = ['Ed25519', 'Ed448'];
			}
		},
		Xn = class {
			constructor(e) {
				e && (this.value = e);
			}
		};
	R.__decorate([m.AsnProp({ type: m.AsnPropTypes.ObjectIdentifier })], Xn.prototype, 'value', void 0);
	Xn = R.__decorate([m.AsnType({ type: m.AsnTypeTypes.Choice })], Xn);
	var Tt = class {
		constructor(e) {
			Object.assign(this, e);
		}
	};
	R.__decorate([m.AsnProp({ type: m.AsnPropTypes.ObjectIdentifier })], Tt.prototype, 'algorithm', void 0);
	R.__decorate([m.AsnProp({ type: m.AsnPropTypes.Any, optional: !0 })], Tt.prototype, 'parameters', void 0);
	var Dt = class {
		constructor() {
			this.version = 0, this.privateKeyAlgorithm = new Tt(), this.privateKey = new ArrayBuffer(0);
		}
	};
	R.__decorate([m.AsnProp({ type: m.AsnPropTypes.Integer })], Dt.prototype, 'version', void 0);
	R.__decorate([m.AsnProp({ type: Tt })], Dt.prototype, 'privateKeyAlgorithm', void 0);
	R.__decorate([m.AsnProp({ type: m.AsnPropTypes.OctetString })], Dt.prototype, 'privateKey', void 0);
	R.__decorate([m.AsnProp({ type: m.AsnPropTypes.Any, optional: !0 })], Dt.prototype, 'attributes', void 0);
	var Qn = class {
		constructor() {
			this.publicKeyAlgorithm = new Tt(), this.publicKey = new ArrayBuffer(0);
		}
	};
	R.__decorate([m.AsnProp({ type: Tt })], Qn.prototype, 'publicKeyAlgorithm', void 0);
	R.__decorate([m.AsnProp({ type: m.AsnPropTypes.BitString })], Qn.prototype, 'publicKey', void 0);
	var qe = { fromJSON: n => P.Convert.FromBase64Url(n), toJSON: n => P.Convert.ToBase64Url(new Uint8Array(n)) },
		rt = {
			fromASN: n => {
				let e = n.valueBlock.valueHex;
				return new Uint8Array(e)[0] ? n.valueBlock.valueHex : n.valueBlock.valueHex.slice(1);
			},
			toASN: n => {
				let e = new Uint8Array(n)[0] > 127 ? P.combine(new Uint8Array([0]).buffer, n) : n;
				return new Ra.Integer({ valueHex: e });
			},
		},
		Ud = Object.freeze({ __proto__: null, JsonBase64UrlArrayBufferConverter: qe, AsnIntegerArrayBufferConverter: rt }),
		Oe = class {
			constructor() {
				this.version = 0,
					this.modulus = new ArrayBuffer(0),
					this.publicExponent = new ArrayBuffer(0),
					this.privateExponent = new ArrayBuffer(0),
					this.prime1 = new ArrayBuffer(0),
					this.prime2 = new ArrayBuffer(0),
					this.exponent1 = new ArrayBuffer(0),
					this.exponent2 = new ArrayBuffer(0),
					this.coefficient = new ArrayBuffer(0);
			}
		};
	R.__decorate(
		[m.AsnProp({ type: m.AsnPropTypes.Integer, converter: m.AsnIntegerConverter })],
		Oe.prototype,
		'version',
		void 0,
	);
	R.__decorate(
		[m.AsnProp({ type: m.AsnPropTypes.Integer, converter: rt }), Je.JsonProp({ name: 'n', converter: qe })],
		Oe.prototype,
		'modulus',
		void 0,
	);
	R.__decorate(
		[m.AsnProp({ type: m.AsnPropTypes.Integer, converter: rt }), Je.JsonProp({ name: 'e', converter: qe })],
		Oe.prototype,
		'publicExponent',
		void 0,
	);
	R.__decorate(
		[m.AsnProp({ type: m.AsnPropTypes.Integer, converter: rt }), Je.JsonProp({ name: 'd', converter: qe })],
		Oe.prototype,
		'privateExponent',
		void 0,
	);
	R.__decorate(
		[m.AsnProp({ type: m.AsnPropTypes.Integer, converter: rt }), Je.JsonProp({ name: 'p', converter: qe })],
		Oe.prototype,
		'prime1',
		void 0,
	);
	R.__decorate(
		[m.AsnProp({ type: m.AsnPropTypes.Integer, converter: rt }), Je.JsonProp({ name: 'q', converter: qe })],
		Oe.prototype,
		'prime2',
		void 0,
	);
	R.__decorate(
		[m.AsnProp({ type: m.AsnPropTypes.Integer, converter: rt }), Je.JsonProp({ name: 'dp', converter: qe })],
		Oe.prototype,
		'exponent1',
		void 0,
	);
	R.__decorate(
		[m.AsnProp({ type: m.AsnPropTypes.Integer, converter: rt }), Je.JsonProp({ name: 'dq', converter: qe })],
		Oe.prototype,
		'exponent2',
		void 0,
	);
	R.__decorate(
		[m.AsnProp({ type: m.AsnPropTypes.Integer, converter: rt }), Je.JsonProp({ name: 'qi', converter: qe })],
		Oe.prototype,
		'coefficient',
		void 0,
	);
	R.__decorate([m.AsnProp({ type: m.AsnPropTypes.Any, optional: !0 })], Oe.prototype, 'otherPrimeInfos', void 0);
	var es = class {
		constructor() {
			this.modulus = new ArrayBuffer(0), this.publicExponent = new ArrayBuffer(0);
		}
	};
	R.__decorate(
		[m.AsnProp({ type: m.AsnPropTypes.Integer, converter: rt }), Je.JsonProp({ name: 'n', converter: qe })],
		es.prototype,
		'modulus',
		void 0,
	);
	R.__decorate(
		[m.AsnProp({ type: m.AsnPropTypes.Integer, converter: rt }), Je.JsonProp({ name: 'e', converter: qe })],
		es.prototype,
		'publicExponent',
		void 0,
	);
	var Fr = class {
		constructor(e) {
			this.value = new ArrayBuffer(0), e && (this.value = e);
		}
		toJSON() {
			let e = new Uint8Array(this.value);
			if (e[0] !== 4) throw new mt('Wrong ECPoint. Current version supports only Uncompressed (0x04) point');
			e = new Uint8Array(this.value.slice(1));
			let t = e.length / 2, r = 0;
			return {
				x: P.Convert.ToBase64Url(e.buffer.slice(r, r + t)),
				y: P.Convert.ToBase64Url(e.buffer.slice(r + t, r + t + t)),
			};
		}
		fromJSON(e) {
			if (!('x' in e)) throw new Error('x: Missing required property');
			if (!('y' in e)) throw new Error('y: Missing required property');
			let t = P.Convert.FromBase64Url(e.x),
				r = P.Convert.FromBase64Url(e.y),
				s = P.combine(new Uint8Array([4]).buffer, t, r);
			return this.value = new Uint8Array(s).buffer, this;
		}
	};
	R.__decorate([m.AsnProp({ type: m.AsnPropTypes.OctetString })], Fr.prototype, 'value', void 0);
	Fr = R.__decorate([m.AsnType({ type: m.AsnTypeTypes.Choice })], Fr);
	var sr = class {
		constructor() {
			this.version = 1, this.privateKey = new ArrayBuffer(0);
		}
		fromJSON(e) {
			if (!('d' in e)) throw new Error('d: Missing required property');
			if (this.privateKey = P.Convert.FromBase64Url(e.d), 'x' in e) {
				let t = new Fr();
				t.fromJSON(e), this.publicKey = m.AsnSerializer.toASN(t).valueBlock.valueHex;
			}
			return this;
		}
		toJSON() {
			let e = {};
			return e.d = P.Convert.ToBase64Url(this.privateKey),
				this.publicKey && Object.assign(e, new Fr(this.publicKey).toJSON()),
				e;
		}
	};
	R.__decorate(
		[m.AsnProp({ type: m.AsnPropTypes.Integer, converter: m.AsnIntegerConverter })],
		sr.prototype,
		'version',
		void 0,
	);
	R.__decorate([m.AsnProp({ type: m.AsnPropTypes.OctetString })], sr.prototype, 'privateKey', void 0);
	R.__decorate([m.AsnProp({ context: 0, type: m.AsnPropTypes.Any, optional: !0 })], sr.prototype, 'parameters', void 0);
	R.__decorate(
		[m.AsnProp({ context: 1, type: m.AsnPropTypes.BitString, optional: !0 })],
		sr.prototype,
		'publicKey',
		void 0,
	);
	var oi = {
			fromASN: n => {
				let e = new Uint8Array(n.valueBlock.valueHex);
				return e[0] === 0 ? e.buffer.slice(1) : e.buffer;
			},
			toASN: n => {
				let e = new Uint8Array(n);
				if (e[0] > 127) {
					let t = new Uint8Array(e.length + 1);
					return t.set(e, 1), new Ra.Integer({ valueHex: t.buffer });
				}
				return new Ra.Integer({ valueHex: n });
			},
		},
		$d = Object.freeze({ __proto__: null, AsnIntegerWithoutPaddingConverter: oi }),
		ts = class {
			static decodePoint(e, t) {
				let r = P.BufferSourceConverter.toUint8Array(e);
				if (r.length === 0 || r[0] !== 4) throw new Error('Only uncompressed point format supported');
				let s = (r.length - 1) / 2;
				if (s !== Math.ceil(t / 8)) throw new Error('Point does not match field size');
				let o = r.slice(1, s + 1), a = r.slice(s + 1, s + 1 + s);
				return { x: o, y: a };
			}
			static encodePoint(e, t) {
				let r = Math.ceil(t / 8);
				if (e.x.byteLength !== r || e.y.byteLength !== r) {
					throw new Error("X,Y coordinates don't match point size criteria");
				}
				let s = P.BufferSourceConverter.toUint8Array(e.x),
					o = P.BufferSourceConverter.toUint8Array(e.y),
					a = new Uint8Array(r * 2 + 1);
				return a[0] = 4, a.set(s, 1), a.set(o, r + 1), a;
			}
			static getSize(e) {
				return Math.ceil(e / 8);
			}
			static encodeSignature(e, t) {
				let r = this.getSize(t),
					s = P.BufferSourceConverter.toUint8Array(e.r),
					o = P.BufferSourceConverter.toUint8Array(e.s),
					a = new Uint8Array(r * 2);
				return a.set(this.padStart(s, r)), a.set(this.padStart(o, r), r), a;
			}
			static decodeSignature(e, t) {
				let r = this.getSize(t), s = P.BufferSourceConverter.toUint8Array(e);
				if (s.length !== r * 2) throw new Error('Incorrect size of the signature');
				let o = s.slice(0, r), a = s.slice(r);
				return { r: this.trimStart(o), s: this.trimStart(a) };
			}
			static trimStart(e) {
				let t = 0;
				for (; t < e.length - 1 && e[t] === 0;) t++;
				return t === 0 ? e : e.slice(t, e.length);
			}
			static padStart(e, t) {
				if (t === e.length) return e;
				let r = new Uint8Array(t);
				return r.set(e, t - e.length), r;
			}
		},
		or = class {
			constructor() {
				this.r = new ArrayBuffer(0), this.s = new ArrayBuffer(0);
			}
			static fromWebCryptoSignature(e) {
				let t = e.byteLength / 2, r = ts.decodeSignature(e, t * 8), s = new or();
				return s.r = P.BufferSourceConverter.toArrayBuffer(r.r), s.s = P.BufferSourceConverter.toArrayBuffer(r.s), s;
			}
			toWebCryptoSignature(e) {
				return e ?? (e = Math.max(this.r.byteLength, this.s.byteLength) * 8), ts.encodeSignature(this, e).buffer;
			}
		};
	R.__decorate([m.AsnProp({ type: m.AsnPropTypes.Integer, converter: oi })], or.prototype, 'r', void 0);
	R.__decorate([m.AsnProp({ type: m.AsnPropTypes.Integer, converter: oi })], or.prototype, 's', void 0);
	var yo = class extends Dt {};
	R.__decorate(
		[m.AsnProp({ context: 1, implicit: !0, type: m.AsnPropTypes.BitString, optional: !0 })],
		yo.prototype,
		'publicKey',
		void 0,
	);
	var go = class {
		constructor() {
			this.value = new ArrayBuffer(0);
		}
		fromJSON(e) {
			if (!e.d) throw new Error('d: Missing required property');
			return this.value = P.Convert.FromBase64Url(e.d), this;
		}
		toJSON() {
			return { d: P.Convert.ToBase64Url(this.value) };
		}
	};
	R.__decorate([m.AsnProp({ type: m.AsnPropTypes.OctetString })], go.prototype, 'value', void 0);
	go = R.__decorate([m.AsnType({ type: m.AsnTypeTypes.Choice })], go);
	var vo = class {
		constructor(e) {
			this.value = new ArrayBuffer(0), e && (this.value = e);
		}
		toJSON() {
			return { x: P.Convert.ToBase64Url(this.value) };
		}
		fromJSON(e) {
			if (!('x' in e)) throw new Error('x: Missing required property');
			return this.value = P.Convert.FromBase64Url(e.x), this;
		}
	};
	R.__decorate([m.AsnProp({ type: m.AsnPropTypes.BitString })], vo.prototype, 'value', void 0);
	vo = R.__decorate([m.AsnType({ type: m.AsnTypeTypes.Choice })], vo);
	var wo = class {};
	R.__decorate(
		[m.AsnProp({ type: m.AsnPropTypes.OctetString }), Je.JsonProp({ type: Je.JsonPropTypes.String, converter: qe })],
		wo.prototype,
		'd',
		void 0,
	);
	wo = R.__decorate([m.AsnType({ type: m.AsnTypeTypes.Choice })], wo);
	var $l = '1.2.840.10045.3.1.7',
		Ao = '1.3.132.0',
		Rl = `${Ao}.34`,
		jl = `${Ao}.35`,
		Vl = `${Ao}.10`,
		Se = '1.3.36.3.3.2.8.1.1',
		Hl = `${Se}.1`,
		Ml = `${Se}.2`,
		Ll = `${Se}.3`,
		Dl = `${Se}.4`,
		Fl = `${Se}.5`,
		zl = `${Se}.6`,
		Jl = `${Se}.7`,
		ql = `${Se}.8`,
		Gl = `${Se}.9`,
		Zl = `${Se}.10`,
		Wl = `${Se}.11`,
		Yl = `${Se}.12`,
		Xl = `${Se}.13`,
		Ql = `${Se}.14`,
		Rd = '1.3.101.110',
		jd = '1.3.101.111',
		Vd = '1.3.101.112',
		Hd = '1.3.101.113',
		Md = Object.freeze({
			__proto__: null,
			converters: $d,
			get ObjectIdentifier() {
				return Xn;
			},
			AlgorithmIdentifier: Tt,
			PrivateKeyInfo: Dt,
			PublicKeyInfo: Qn,
			RsaPrivateKey: Oe,
			RsaPublicKey: es,
			EcPrivateKey: sr,
			get EcPublicKey() {
				return Fr;
			},
			EcDsaSignature: or,
			OneAsymmetricKey: yo,
			get EdPrivateKey() {
				return go;
			},
			get EdPublicKey() {
				return vo;
			},
			get CurvePrivateKey() {
				return wo;
			},
			idSecp256r1: $l,
			idEllipticCurve: Ao,
			idSecp384r1: Rl,
			idSecp521r1: jl,
			idSecp256k1: Vl,
			idVersionOne: Se,
			idBrainpoolP160r1: Hl,
			idBrainpoolP160t1: Ml,
			idBrainpoolP192r1: Ll,
			idBrainpoolP192t1: Dl,
			idBrainpoolP224r1: Fl,
			idBrainpoolP224t1: zl,
			idBrainpoolP256r1: Jl,
			idBrainpoolP256t1: ql,
			idBrainpoolP320r1: Gl,
			idBrainpoolP320t1: Zl,
			idBrainpoolP384r1: Wl,
			idBrainpoolP384t1: Yl,
			idBrainpoolP512r1: Xl,
			idBrainpoolP512t1: Ql,
			idX25519: Rd,
			idX448: jd,
			idEd25519: Vd,
			idEd448: Hd,
		}),
		se = class {
			constructor() {}
			static register(e) {
				let t = new Xn();
				t.value = e.id;
				let r = m.AsnConvert.serialize(t);
				this.items.push({ ...e, raw: r }), this.names.push(e.name);
			}
			static find(e) {
				e = e.toUpperCase();
				for (let t of this.items) if (t.name.toUpperCase() === e || t.id.toUpperCase() === e) return t;
				return null;
			}
			static get(e) {
				let t = this.find(e);
				if (!t) throw new Error(`Unsupported EC named curve '${e}'`);
				return t;
			}
		};
	se.items = [];
	se.names = [];
	se.register({ name: 'P-256', id: $l, size: 256 });
	se.register({ name: 'P-384', id: Rl, size: 384 });
	se.register({ name: 'P-521', id: jl, size: 521 });
	se.register({ name: 'K-256', id: Vl, size: 256 });
	se.register({ name: 'brainpoolP160r1', id: Hl, size: 160 });
	se.register({ name: 'brainpoolP160t1', id: Ml, size: 160 });
	se.register({ name: 'brainpoolP192r1', id: Ll, size: 192 });
	se.register({ name: 'brainpoolP192t1', id: Dl, size: 192 });
	se.register({ name: 'brainpoolP224r1', id: Fl, size: 224 });
	se.register({ name: 'brainpoolP224t1', id: zl, size: 224 });
	se.register({ name: 'brainpoolP256r1', id: Jl, size: 256 });
	se.register({ name: 'brainpoolP256t1', id: ql, size: 256 });
	se.register({ name: 'brainpoolP320r1', id: Gl, size: 320 });
	se.register({ name: 'brainpoolP320t1', id: Zl, size: 320 });
	se.register({ name: 'brainpoolP384r1', id: Wl, size: 384 });
	se.register({ name: 'brainpoolP384t1', id: Yl, size: 384 });
	se.register({ name: 'brainpoolP512r1', id: Xl, size: 512 });
	se.register({ name: 'brainpoolP512t1', id: Ql, size: 512 });
	var Xa = class extends tt {
			constructor() {
				super(...arguments),
					this.name = 'HMAC',
					this.hashAlgorithms = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'],
					this.usages = ['sign', 'verify'];
			}
			getDefaultLength(e) {
				switch (e.toUpperCase()) {
					case 'SHA-1':
					case 'SHA-256':
					case 'SHA-384':
					case 'SHA-512':
						return 512;
					default:
						throw new Error(`Unknown algorithm name '${e}'`);
				}
			}
			checkGenerateKeyParams(e) {
				if (
					this.checkRequiredProperty(e, 'hash'), this.checkHashAlgorithm(e.hash, this.hashAlgorithms), 'length' in e
				) {
					if (typeof e.length != 'number') throw new TypeError('length: Is not a Number');
					if (e.length < 1) throw new RangeError('length: Number is out of range');
				}
			}
			checkImportParams(e) {
				this.checkRequiredProperty(e, 'hash'), this.checkHashAlgorithm(e.hash, this.hashAlgorithms);
			}
		},
		Qa = class extends tt {
			constructor() {
				super(...arguments),
					this.name = 'PBKDF2',
					this.hashAlgorithms = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'],
					this.usages = ['deriveBits', 'deriveKey'];
			}
			checkAlgorithmParams(e) {
				if (
					this.checkRequiredProperty(e, 'hash'),
						this.checkHashAlgorithm(e.hash, this.hashAlgorithms),
						this.checkRequiredProperty(e, 'salt'),
						!(e.salt instanceof ArrayBuffer || ArrayBuffer.isView(e.salt))
				) {
					throw new TypeError("salt: Is not of type '(ArrayBuffer or ArrayBufferView)'");
				}
				if (this.checkRequiredProperty(e, 'iterations'), typeof e.iterations != 'number') {
					throw new TypeError('iterations: Is not a Number');
				}
				if (e.iterations < 1) throw new TypeError('iterations: Is less than 1');
			}
			checkImportKey(e, t, r, s, o, ...a) {
				if (super.checkImportKey(e, t, r, s, o), s) throw new SyntaxError("extractable: Must be 'false'");
			}
		},
		ei = class extends tt {
			constructor() {
				super(...arguments),
					this.name = 'HKDF',
					this.hashAlgorithms = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'],
					this.usages = ['deriveKey', 'deriveBits'];
			}
			checkAlgorithmParams(e) {
				if (
					this.checkRequiredProperty(e, 'hash'),
						this.checkHashAlgorithm(e.hash, this.hashAlgorithms),
						this.checkRequiredProperty(e, 'salt'),
						!P.BufferSourceConverter.isBufferSource(e.salt)
				) {
					throw new TypeError("salt: Is not of type '(ArrayBuffer or ArrayBufferView)'");
				}
				if (
					this.checkRequiredProperty(e, 'info'), !P.BufferSourceConverter.isBufferSource(e.info)
				) {
					throw new TypeError("salt: Is not of type '(ArrayBuffer or ArrayBufferView)'");
				}
			}
			checkImportKey(e, t, r, s, o, ...a) {
				if (super.checkImportKey(e, t, r, s, o), s) throw new SyntaxError("extractable: Must be 'false'");
			}
		},
		rs = class extends tt {
			constructor() {
				super(...arguments), this.usages = [], this.defaultLength = 0;
			}
			digest(...e) {
				return e[0] = { length: this.defaultLength, ...e[0] }, super.digest.apply(this, e);
			}
			checkDigest(e, t) {
				super.checkDigest(e, t);
				let r = e.length || 0;
				if (typeof r != 'number') throw new TypeError('length: Is not a Number');
				if (r < 0) throw new TypeError('length: Is negative');
			}
		},
		ti = class extends rs {
			constructor() {
				super(...arguments), this.name = 'shake128', this.defaultLength = 16;
			}
		},
		ri = class extends rs {
			constructor() {
				super(...arguments), this.name = 'shake256', this.defaultLength = 32;
			}
		},
		ni = class {
			get [Symbol.toStringTag]() {
				return 'Crypto';
			}
			randomUUID() {
				let e = this.getRandomValues(new Uint8Array(16));
				e[6] = e[6] & 15 | 64, e[8] = e[8] & 63 | 128;
				let t = P.Convert.ToHex(e).toLowerCase();
				return `${t.substring(0, 8)}-${t.substring(8, 12)}-${t.substring(12, 16)}-${t.substring(16)}`;
			}
		},
		bo = class {
			constructor() {
				this.items = {};
			}
			get(e) {
				return this.items[e.toLowerCase()] || null;
			}
			set(e) {
				this.items[e.name.toLowerCase()] = e;
			}
			removeAt(e) {
				let t = this.get(e.toLowerCase());
				return t && delete this.items[e], t;
			}
			has(e) {
				return !!this.get(e);
			}
			get length() {
				return Object.keys(this.items).length;
			}
			get algorithms() {
				let e = [];
				for (let t in this.items) {
					let r = this.items[t];
					e.push(r.name);
				}
				return e.sort();
			}
		},
		ns = class {
			constructor() {
				this.providers = new bo();
			}
			static isHashedAlgorithm(e) {
				return !!(e && typeof e == 'object' && 'name' in e && 'hash' in e);
			}
			get [Symbol.toStringTag]() {
				return 'SubtleCrypto';
			}
			async digest(...e) {
				this.checkRequiredArguments(e, 2, 'digest');
				let [t, r, ...s] = e, o = this.prepareAlgorithm(t), a = P.BufferSourceConverter.toArrayBuffer(r);
				return await this.getProvider(o.name).digest(o, a, ...s);
			}
			async generateKey(...e) {
				this.checkRequiredArguments(e, 3, 'generateKey');
				let [t, r, s, ...o] = e, a = this.prepareAlgorithm(t), i = this.getProvider(a.name);
				return await i.generateKey({ ...a, name: i.name }, r, s, ...o);
			}
			async sign(...e) {
				this.checkRequiredArguments(e, 3, 'sign');
				let [t, r, s, ...o] = e;
				this.checkCryptoKey(r);
				let a = this.prepareAlgorithm(t), i = P.BufferSourceConverter.toArrayBuffer(s), c = this.getProvider(a.name);
				return await c.sign({ ...a, name: c.name }, r, i, ...o);
			}
			async verify(...e) {
				this.checkRequiredArguments(e, 4, 'verify');
				let [t, r, s, o, ...a] = e;
				this.checkCryptoKey(r);
				let i = this.prepareAlgorithm(t),
					c = P.BufferSourceConverter.toArrayBuffer(o),
					u = P.BufferSourceConverter.toArrayBuffer(s),
					l = this.getProvider(i.name);
				return await l.verify({ ...i, name: l.name }, r, u, c, ...a);
			}
			async encrypt(...e) {
				this.checkRequiredArguments(e, 3, 'encrypt');
				let [t, r, s, ...o] = e;
				this.checkCryptoKey(r);
				let a = this.prepareAlgorithm(t), i = P.BufferSourceConverter.toArrayBuffer(s), c = this.getProvider(a.name);
				return await c.encrypt({ ...a, name: c.name }, r, i, { keyUsage: !0 }, ...o);
			}
			async decrypt(...e) {
				this.checkRequiredArguments(e, 3, 'decrypt');
				let [t, r, s, ...o] = e;
				this.checkCryptoKey(r);
				let a = this.prepareAlgorithm(t), i = P.BufferSourceConverter.toArrayBuffer(s), c = this.getProvider(a.name);
				return await c.decrypt({ ...a, name: c.name }, r, i, { keyUsage: !0 }, ...o);
			}
			async deriveBits(...e) {
				this.checkRequiredArguments(e, 3, 'deriveBits');
				let [t, r, s, ...o] = e;
				this.checkCryptoKey(r);
				let a = this.prepareAlgorithm(t), i = this.getProvider(a.name);
				return await i.deriveBits({ ...a, name: i.name }, r, s, { keyUsage: !0 }, ...o);
			}
			async deriveKey(...e) {
				this.checkRequiredArguments(e, 5, 'deriveKey');
				let [t, r, s, o, a, ...i] = e, c = this.prepareAlgorithm(s);
				this.getProvider(c.name).checkDerivedKeyParams(c);
				let l = this.prepareAlgorithm(t), f = this.getProvider(l.name);
				f.checkCryptoKey(r, 'deriveKey');
				let d = await f.deriveBits({ ...l, name: f.name }, r, s.length || 512, { keyUsage: !1 }, ...i);
				return this.importKey('raw', d, s, o, a, ...i);
			}
			async exportKey(...e) {
				this.checkRequiredArguments(e, 2, 'exportKey');
				let [t, r, ...s] = e;
				return this.checkCryptoKey(r), await this.getProvider(r.algorithm.name).exportKey(t, r, ...s);
			}
			async importKey(...e) {
				this.checkRequiredArguments(e, 5, 'importKey');
				let [t, r, s, o, a, ...i] = e, c = this.prepareAlgorithm(s), u = this.getProvider(c.name);
				if (['pkcs8', 'spki', 'raw'].indexOf(t) !== -1) {
					let l = P.BufferSourceConverter.toArrayBuffer(r);
					return u.importKey(t, l, { ...c, name: u.name }, o, a, ...i);
				} else if (!r.kty) throw new TypeError('keyData: Is not JSON');
				return u.importKey(t, r, { ...c, name: u.name }, o, a, ...i);
			}
			async wrapKey(e, t, r, s, ...o) {
				let a = await this.exportKey(e, t, ...o);
				if (e === 'jwk') {
					let l = JSON.stringify(a);
					a = P.Convert.FromUtf8String(l);
				}
				let i = this.prepareAlgorithm(s), c = P.BufferSourceConverter.toArrayBuffer(a), u = this.getProvider(i.name);
				return u.encrypt({ ...i, name: u.name }, r, c, { keyUsage: !1 }, ...o);
			}
			async unwrapKey(e, t, r, s, o, a, i, ...c) {
				let u = this.prepareAlgorithm(s),
					l = P.BufferSourceConverter.toArrayBuffer(t),
					f = this.getProvider(u.name),
					d = await f.decrypt({ ...u, name: f.name }, r, l, { keyUsage: !1 }, ...c);
				if (e === 'jwk') {
					try {
						d = JSON.parse(P.Convert.ToUtf8String(d));
					} catch (y) {
						let x = new TypeError('wrappedKey: Is not a JSON');
						throw x.internal = y, x;
					}
				}
				return this.importKey(e, d, o, a, i, ...c);
			}
			checkRequiredArguments(e, t, r) {
				if (e.length < t) {
					throw new TypeError(
						`Failed to execute '${r}' on 'SubtleCrypto': ${t} arguments required, but only ${e.length} present`,
					);
				}
			}
			prepareAlgorithm(e) {
				if (typeof e == 'string') return { name: e };
				if (ns.isHashedAlgorithm(e)) {
					let t = { ...e };
					return t.hash = this.prepareAlgorithm(e.hash), t;
				}
				return { ...e };
			}
			getProvider(e) {
				let t = this.providers.get(e);
				if (!t) throw new Wn('Unrecognized name');
				return t;
			}
			checkCryptoKey(e) {
				if (!(e instanceof Yn)) throw new TypeError("Key is not of type 'CryptoKey'");
			}
		},
		Ld = Object.freeze({ __proto__: null, converters: Ud }),
		Dd = ['crv', 'e', 'k', 'kty', 'n', 'x', 'y'],
		si = class {
			static async thumbprint(e, t, r) {
				let s = this.format(t, !0);
				return r.subtle.digest(e, P.Convert.FromBinary(JSON.stringify(s)));
			}
			static format(e, t = !1) {
				let r = Object.entries(e);
				return t && (r = r.filter(s => Dd.includes(s[0]))),
					r = r.sort(([s], [o]) => s > o ? 1 : s < o ? -1 : 0),
					Object.fromEntries(r);
			}
		};
	Object.defineProperty(T, 'BufferSourceConverter', {
		enumerable: !0,
		get: function() {
			return P.BufferSourceConverter;
		},
	});
	T.AesCbcProvider = Va;
	T.AesCmacProvider = Ha;
	T.AesCtrProvider = Ma;
	T.AesEcbProvider = La;
	T.AesGcmProvider = Da;
	T.AesKwProvider = Fa;
	T.AesProvider = Pt;
	T.AlgorithmError = Wn;
	T.Crypto = ni;
	T.CryptoError = mt;
	T.CryptoKey = Yn;
	T.DesProvider = za;
	T.EcCurves = se;
	T.EcUtils = ts;
	T.EcdhEsProvider = Wa;
	T.EcdhProvider = mo;
	T.EcdsaProvider = Za;
	T.EdDsaProvider = Ya;
	T.EllipticProvider = Dr;
	T.HkdfProvider = ei;
	T.HmacProvider = Xa;
	T.JwkUtils = si;
	T.OperationError = Ke;
	T.Pbkdf2Provider = Qa;
	T.PemConverter = ja;
	T.ProviderCrypto = tt;
	T.ProviderStorage = bo;
	T.RequiredPropertyError = po;
	T.RsaOaepProvider = Ga;
	T.RsaProvider = Lr;
	T.RsaPssProvider = qa;
	T.RsaSsaProvider = Ja;
	T.Shake128Provider = ti;
	T.Shake256Provider = ri;
	T.ShakeProvider = rs;
	T.SubtleCrypto = ns;
	T.UnsupportedOperationError = ze;
	T.asn1 = Md;
	T.isJWK = Ul;
	T.json = Ld;
});
var uf = Y(Eo => {
	'use strict';
	Object.defineProperty(Eo, '__esModule', { value: !0 });
	var ss = ef(), sf = require('crypto'), Fd = require('process'), cr = Ir(), V = $a(), yt = Qt(), B = Pa();
	function zd(n) {
		return n && typeof n == 'object' && 'default' in n ? n : { default: n };
	}
	function Ri(n) {
		if (n && n.__esModule) return n;
		var e = Object.create(null);
		return n && Object.keys(n).forEach(function(t) {
			if (t !== 'default') {
				var r = Object.getOwnPropertyDescriptor(n, t);
				Object.defineProperty(
					e,
					t,
					r.get ? r : {
						enumerable: !0,
						get: function() {
							return n[t];
						},
					},
				);
			}
		}),
			e.default = n,
			Object.freeze(e);
	}
	var h = Ri(ss),
		S = zd(sf),
		os = Ri(sf),
		Jd = Ri(Fd),
		ji = { fromJSON: n => Buffer.from(yt.Convert.FromBase64Url(n)), toJSON: n => yt.Convert.ToBase64Url(n) },
		nt = class extends h.CryptoKey {
			constructor() {
				super(...arguments),
					this.data = Buffer.alloc(0),
					this.algorithm = { name: '' },
					this.extractable = !1,
					this.type = 'secret',
					this.usages = [],
					this.kty = 'oct',
					this.alg = '';
			}
		};
	cr.__decorate(
		[V.JsonProp({ name: 'ext', type: V.JsonPropTypes.Boolean, optional: !0 })],
		nt.prototype,
		'extractable',
		void 0,
	);
	cr.__decorate(
		[V.JsonProp({ name: 'key_ops', type: V.JsonPropTypes.String, repeated: !0, optional: !0 })],
		nt.prototype,
		'usages',
		void 0,
	);
	cr.__decorate([V.JsonProp({ type: V.JsonPropTypes.String })], nt.prototype, 'kty', void 0);
	cr.__decorate([V.JsonProp({ type: V.JsonPropTypes.String, optional: !0 })], nt.prototype, 'alg', void 0);
	var xo = class extends nt {
			constructor() {
				super(...arguments), this.kty = 'oct', this.type = 'secret';
			}
		},
		Ft = class extends nt {},
		Ee = class extends xo {
			get alg() {
				switch (this.algorithm.name.toUpperCase()) {
					case 'AES-CBC':
						return `A${this.algorithm.length}CBC`;
					case 'AES-CTR':
						return `A${this.algorithm.length}CTR`;
					case 'AES-GCM':
						return `A${this.algorithm.length}GCM`;
					case 'AES-KW':
						return `A${this.algorithm.length}KW`;
					case 'AES-CMAC':
						return `A${this.algorithm.length}CMAC`;
					case 'AES-ECB':
						return `A${this.algorithm.length}ECB`;
					default:
						throw new h.AlgorithmError('Unsupported algorithm name');
				}
			}
			set alg(e) {}
		};
	cr.__decorate([V.JsonProp({ name: 'k', converter: ji })], Ee.prototype, 'data', void 0);
	var of = new WeakMap();
	function v(n) {
		let e = of.get(n);
		if (!e) throw new h.OperationError('Cannot get CryptoKey from secure storage');
		return e;
	}
	function E(n) {
		let e = h.CryptoKey.create(n.algorithm, n.type, n.extractable, n.usages);
		return Object.freeze(e), of.set(e, n), e;
	}
	var D = class {
		static async generateKey(e, t, r) {
			let s = new Ee();
			return s.algorithm = e, s.extractable = t, s.usages = r, s.data = S.default.randomBytes(e.length >> 3), s;
		}
		static async exportKey(e, t) {
			if (!(t instanceof Ee)) throw new Error('key: Is not AesCryptoKey');
			switch (e.toLowerCase()) {
				case 'jwk':
					return V.JsonSerializer.toJSON(t);
				case 'raw':
					return new Uint8Array(t.data).buffer;
				default:
					throw new h.OperationError("format: Must be 'jwk' or 'raw'");
			}
		}
		static async importKey(e, t, r, s, o) {
			let a;
			switch (e.toLowerCase()) {
				case 'jwk':
					a = V.JsonParser.fromJSON(t, { targetSchema: Ee });
					break;
				case 'raw':
					a = new Ee(), a.data = Buffer.from(t);
					break;
				default:
					throw new h.OperationError("format: Must be 'jwk' or 'raw'");
			}
			switch (
				a.algorithm = r, a.algorithm.length = a.data.length << 3, a.extractable = s, a.usages = o, a.algorithm.length
			) {
				case 128:
				case 192:
				case 256:
					break;
				default:
					throw new h.OperationError('keyData: Is wrong key length');
			}
			return a;
		}
		static async encrypt(e, t, r) {
			switch (e.name.toUpperCase()) {
				case 'AES-CBC':
					return this.encryptAesCBC(e, t, Buffer.from(r));
				case 'AES-CTR':
					return this.encryptAesCTR(e, t, Buffer.from(r));
				case 'AES-GCM':
					return this.encryptAesGCM(e, t, Buffer.from(r));
				case 'AES-KW':
					return this.encryptAesKW(e, t, Buffer.from(r));
				case 'AES-ECB':
					return this.encryptAesECB(e, t, Buffer.from(r));
				default:
					throw new h.OperationError('algorithm: Is not recognized');
			}
		}
		static async decrypt(e, t, r) {
			if (!(t instanceof Ee)) throw new Error('key: Is not AesCryptoKey');
			switch (e.name.toUpperCase()) {
				case 'AES-CBC':
					return this.decryptAesCBC(e, t, Buffer.from(r));
				case 'AES-CTR':
					return this.decryptAesCTR(e, t, Buffer.from(r));
				case 'AES-GCM':
					return this.decryptAesGCM(e, t, Buffer.from(r));
				case 'AES-KW':
					return this.decryptAesKW(e, t, Buffer.from(r));
				case 'AES-ECB':
					return this.decryptAesECB(e, t, Buffer.from(r));
				default:
					throw new h.OperationError('algorithm: Is not recognized');
			}
		}
		static async encryptAesCBC(e, t, r) {
			let s = S.default.createCipheriv(`aes-${t.algorithm.length}-cbc`, t.data, new Uint8Array(e.iv)), o = s.update(r);
			return o = Buffer.concat([o, s.final()]), new Uint8Array(o).buffer;
		}
		static async decryptAesCBC(e, t, r) {
			let s = S.default.createDecipheriv(`aes-${t.algorithm.length}-cbc`, t.data, new Uint8Array(e.iv)),
				o = s.update(r);
			return o = Buffer.concat([o, s.final()]), new Uint8Array(o).buffer;
		}
		static async encryptAesCTR(e, t, r) {
			let s = S.default.createCipheriv(`aes-${t.algorithm.length}-ctr`, t.data, Buffer.from(e.counter)),
				o = s.update(r);
			return o = Buffer.concat([o, s.final()]), new Uint8Array(o).buffer;
		}
		static async decryptAesCTR(e, t, r) {
			let s = S.default.createDecipheriv(`aes-${t.algorithm.length}-ctr`, t.data, new Uint8Array(e.counter)),
				o = s.update(r);
			return o = Buffer.concat([o, s.final()]), new Uint8Array(o).buffer;
		}
		static async encryptAesGCM(e, t, r) {
			let s = S.default.createCipheriv(`aes-${t.algorithm.length}-gcm`, t.data, Buffer.from(e.iv), {
				authTagLength: (e.tagLength || 128) >> 3,
			});
			e.additionalData && s.setAAD(Buffer.from(e.additionalData));
			let o = s.update(r);
			return o = Buffer.concat([o, s.final(), s.getAuthTag()]), new Uint8Array(o).buffer;
		}
		static async decryptAesGCM(e, t, r) {
			let s = S.default.createDecipheriv(`aes-${t.algorithm.length}-gcm`, t.data, new Uint8Array(e.iv)),
				o = (e.tagLength || 128) >> 3,
				a = r.slice(0, r.length - o),
				i = r.slice(r.length - o);
			e.additionalData && s.setAAD(Buffer.from(e.additionalData)), s.setAuthTag(i);
			let c = s.update(a);
			return c = Buffer.concat([c, s.final()]), new Uint8Array(c).buffer;
		}
		static async encryptAesKW(e, t, r) {
			let s = S.default.createCipheriv(`id-aes${t.algorithm.length}-wrap`, t.data, this.AES_KW_IV), o = s.update(r);
			return o = Buffer.concat([o, s.final()]), new Uint8Array(o).buffer;
		}
		static async decryptAesKW(e, t, r) {
			let s = S.default.createDecipheriv(`id-aes${t.algorithm.length}-wrap`, t.data, this.AES_KW_IV), o = s.update(r);
			return o = Buffer.concat([o, s.final()]), new Uint8Array(o).buffer;
		}
		static async encryptAesECB(e, t, r) {
			let s = S.default.createCipheriv(`aes-${t.algorithm.length}-ecb`, t.data, new Uint8Array(0)), o = s.update(r);
			return o = Buffer.concat([o, s.final()]), new Uint8Array(o).buffer;
		}
		static async decryptAesECB(e, t, r) {
			let s = S.default.createDecipheriv(`aes-${t.algorithm.length}-ecb`, t.data, new Uint8Array(0)), o = s.update(r);
			return o = Buffer.concat([o, s.final()]), new Uint8Array(o).buffer;
		}
	};
	D.AES_KW_IV = Buffer.from('A6A6A6A6A6A6A6A6', 'hex');
	var ai = class extends h.AesCbcProvider {
			async onGenerateKey(e, t, r) {
				let s = await D.generateKey({ name: this.name, length: e.length }, t, r);
				return E(s);
			}
			async onEncrypt(e, t, r) {
				return D.encrypt(e, v(t), new Uint8Array(r));
			}
			async onDecrypt(e, t, r) {
				return D.decrypt(e, v(t), new Uint8Array(r));
			}
			async onExportKey(e, t) {
				return D.exportKey(e, v(t));
			}
			async onImportKey(e, t, r, s, o) {
				let a = await D.importKey(e, t, { name: r.name }, s, o);
				return E(a);
			}
			checkCryptoKey(e, t) {
				if (super.checkCryptoKey(e, t), !(v(e) instanceof Ee)) throw new TypeError('key: Is not a AesCryptoKey');
			}
		},
		Vi = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
		tf = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 135]),
		ir = 16;
	function rf(n) {
		let e = Buffer.alloc(n.length), t = n.length - 1;
		for (let r = 0; r < t; r++) e[r] = n[r] << 1, n[r + 1] & 128 && (e[r] += 1);
		return e[t] = n[t] << 1, e;
	}
	function zr(n, e) {
		let t = Math.min(n.length, e.length), r = Buffer.alloc(t);
		for (let s = 0; s < t; s++) r[s] = n[s] ^ e[s];
		return r;
	}
	function ii(n, e) {
		let t = os.createCipheriv(`aes${n.length << 3}`, n, Vi), r = t.update(e);
		return t.final(), r;
	}
	function nf(n, e) {
		let t = Buffer.alloc(ir), r = e * ir, s = r + ir;
		return n.copy(t, 0, r, s), t;
	}
	function qd(n, e) {
		let t = Buffer.alloc(ir), r = e * ir, s = n.length;
		return t.fill(0), n.copy(t, 0, r, s), t[s - r] = 128, t;
	}
	function Gd(n) {
		let e = ii(n, Vi), t = rf(e);
		e[0] & 128 && (t = zr(t, tf));
		let r = rf(t);
		return t[0] & 128 && (r = zr(r, tf)), { subkey1: t, subkey2: r };
	}
	function Zd(n, e) {
		let t = Gd(n), r = Math.ceil(e.length / ir), s, o;
		r === 0 ? (r = 1, s = !1) : s = e.length % ir === 0;
		let a = r - 1;
		s ? o = zr(nf(e, a), t.subkey1) : o = zr(qd(e, a), t.subkey2);
		let i = Vi, c;
		for (let u = 0; u < a; u++) c = zr(i, nf(e, u)), i = ii(n, c);
		return c = zr(o, i), ii(n, c);
	}
	var ci = class extends h.AesCmacProvider {
			async onGenerateKey(e, t, r) {
				let s = await D.generateKey({ name: this.name, length: e.length }, t, r);
				return E(s);
			}
			async onSign(e, t, r) {
				let s = Zd(v(t).data, Buffer.from(r));
				return new Uint8Array(s).buffer;
			}
			async onVerify(e, t, r, s) {
				let o = await this.sign(e, t, s);
				return Buffer.from(r).compare(Buffer.from(o)) === 0;
			}
			async onExportKey(e, t) {
				return D.exportKey(e, v(t));
			}
			async onImportKey(e, t, r, s, o) {
				let a = await D.importKey(e, t, { name: r.name }, s, o);
				return E(a);
			}
			checkCryptoKey(e, t) {
				if (super.checkCryptoKey(e, t), !(v(e) instanceof Ee)) throw new TypeError('key: Is not a AesCryptoKey');
			}
		},
		ui = class extends h.AesCtrProvider {
			async onGenerateKey(e, t, r) {
				let s = await D.generateKey({ name: this.name, length: e.length }, t, r);
				return E(s);
			}
			async onEncrypt(e, t, r) {
				return D.encrypt(e, v(t), new Uint8Array(r));
			}
			async onDecrypt(e, t, r) {
				return D.decrypt(e, v(t), new Uint8Array(r));
			}
			async onExportKey(e, t) {
				return D.exportKey(e, v(t));
			}
			async onImportKey(e, t, r, s, o) {
				let a = await D.importKey(e, t, { name: r.name }, s, o);
				return E(a);
			}
			checkCryptoKey(e, t) {
				if (super.checkCryptoKey(e, t), !(v(e) instanceof Ee)) throw new TypeError('key: Is not a AesCryptoKey');
			}
		},
		li = class extends h.AesGcmProvider {
			async onGenerateKey(e, t, r) {
				let s = await D.generateKey({ name: this.name, length: e.length }, t, r);
				return E(s);
			}
			async onEncrypt(e, t, r) {
				return D.encrypt(e, v(t), new Uint8Array(r));
			}
			async onDecrypt(e, t, r) {
				return D.decrypt(e, v(t), new Uint8Array(r));
			}
			async onExportKey(e, t) {
				return D.exportKey(e, v(t));
			}
			async onImportKey(e, t, r, s, o) {
				let a = await D.importKey(e, t, { name: r.name }, s, o);
				return E(a);
			}
			checkCryptoKey(e, t) {
				if (super.checkCryptoKey(e, t), !(v(e) instanceof Ee)) throw new TypeError('key: Is not a AesCryptoKey');
			}
		},
		fi = class extends h.AesKwProvider {
			async onGenerateKey(e, t, r) {
				let s = await D.generateKey({ name: this.name, length: e.length }, t, r);
				return E(s);
			}
			async onExportKey(e, t) {
				return D.exportKey(e, v(t));
			}
			async onImportKey(e, t, r, s, o) {
				let a = await D.importKey(e, t, { name: r.name }, s, o);
				return E(a);
			}
			async onEncrypt(e, t, r) {
				return D.encrypt(e, v(t), new Uint8Array(r));
			}
			async onDecrypt(e, t, r) {
				return D.decrypt(e, v(t), new Uint8Array(r));
			}
			checkCryptoKey(e, t) {
				if (super.checkCryptoKey(e, t), !(v(e) instanceof Ee)) throw new TypeError('key: Is not a AesCryptoKey');
			}
		},
		hi = class extends h.AesEcbProvider {
			async onGenerateKey(e, t, r) {
				let s = await D.generateKey({ name: this.name, length: e.length }, t, r);
				return E(s);
			}
			async onEncrypt(e, t, r) {
				return D.encrypt(e, v(t), new Uint8Array(r));
			}
			async onDecrypt(e, t, r) {
				return D.decrypt(e, v(t), new Uint8Array(r));
			}
			async onExportKey(e, t) {
				return D.exportKey(e, v(t));
			}
			async onImportKey(e, t, r, s, o) {
				let a = await D.importKey(e, t, { name: r.name }, s, o);
				return E(a);
			}
			checkCryptoKey(e, t) {
				if (super.checkCryptoKey(e, t), !(v(e) instanceof Ee)) throw new TypeError('key: Is not a AesCryptoKey');
			}
		},
		Nt = class extends xo {
			get alg() {
				switch (this.algorithm.name.toUpperCase()) {
					case 'DES-CBC':
						return 'DES-CBC';
					case 'DES-EDE3-CBC':
						return '3DES-CBC';
					default:
						throw new h.AlgorithmError('Unsupported algorithm name');
				}
			}
			set alg(e) {}
		};
	cr.__decorate([V.JsonProp({ name: 'k', converter: ji })], Nt.prototype, 'data', void 0);
	var Ge = class {
			static async generateKey(e, t, r) {
				let s = new Nt();
				return s.algorithm = e, s.extractable = t, s.usages = r, s.data = S.default.randomBytes(e.length >> 3), s;
			}
			static async exportKey(e, t) {
				switch (e.toLowerCase()) {
					case 'jwk':
						return V.JsonSerializer.toJSON(t);
					case 'raw':
						return new Uint8Array(t.data).buffer;
					default:
						throw new h.OperationError("format: Must be 'jwk' or 'raw'");
				}
			}
			static async importKey(e, t, r, s, o) {
				let a;
				switch (e.toLowerCase()) {
					case 'jwk':
						a = V.JsonParser.fromJSON(t, { targetSchema: Nt });
						break;
					case 'raw':
						a = new Nt(), a.data = Buffer.from(t);
						break;
					default:
						throw new h.OperationError("format: Must be 'jwk' or 'raw'");
				}
				return a.algorithm = r, a.extractable = s, a.usages = o, a;
			}
			static async encrypt(e, t, r) {
				switch (e.name.toUpperCase()) {
					case 'DES-CBC':
						return this.encryptDesCBC(e, t, Buffer.from(r));
					case 'DES-EDE3-CBC':
						return this.encryptDesEDE3CBC(e, t, Buffer.from(r));
					default:
						throw new h.OperationError('algorithm: Is not recognized');
				}
			}
			static async decrypt(e, t, r) {
				if (!(t instanceof Nt)) throw new Error('key: Is not DesCryptoKey');
				switch (e.name.toUpperCase()) {
					case 'DES-CBC':
						return this.decryptDesCBC(e, t, Buffer.from(r));
					case 'DES-EDE3-CBC':
						return this.decryptDesEDE3CBC(e, t, Buffer.from(r));
					default:
						throw new h.OperationError('algorithm: Is not recognized');
				}
			}
			static async encryptDesCBC(e, t, r) {
				let s = S.default.createCipheriv('des-cbc', t.data, new Uint8Array(e.iv)), o = s.update(r);
				return o = Buffer.concat([o, s.final()]), new Uint8Array(o).buffer;
			}
			static async decryptDesCBC(e, t, r) {
				let s = S.default.createDecipheriv('des-cbc', t.data, new Uint8Array(e.iv)), o = s.update(r);
				return o = Buffer.concat([o, s.final()]), new Uint8Array(o).buffer;
			}
			static async encryptDesEDE3CBC(e, t, r) {
				let s = S.default.createCipheriv('des-ede3-cbc', t.data, Buffer.from(e.iv)), o = s.update(r);
				return o = Buffer.concat([o, s.final()]), new Uint8Array(o).buffer;
			}
			static async decryptDesEDE3CBC(e, t, r) {
				let s = S.default.createDecipheriv('des-ede3-cbc', t.data, new Uint8Array(e.iv)), o = s.update(r);
				return o = Buffer.concat([o, s.final()]), new Uint8Array(o).buffer;
			}
		},
		pi = class extends h.DesProvider {
			constructor() {
				super(...arguments), this.keySizeBits = 64, this.ivSize = 8, this.name = 'DES-CBC';
			}
			async onGenerateKey(e, t, r) {
				let s = await Ge.generateKey({ name: this.name, length: this.keySizeBits }, t, r);
				return E(s);
			}
			async onEncrypt(e, t, r) {
				return Ge.encrypt(e, v(t), new Uint8Array(r));
			}
			async onDecrypt(e, t, r) {
				return Ge.decrypt(e, v(t), new Uint8Array(r));
			}
			async onExportKey(e, t) {
				return Ge.exportKey(e, v(t));
			}
			async onImportKey(e, t, r, s, o) {
				let a = await Ge.importKey(e, t, { name: this.name, length: this.keySizeBits }, s, o);
				if (a.data.length !== this.keySizeBits >> 3) throw new h.OperationError('keyData: Wrong key size');
				return E(a);
			}
			checkCryptoKey(e, t) {
				if (super.checkCryptoKey(e, t), !(v(e) instanceof Nt)) throw new TypeError('key: Is not a DesCryptoKey');
			}
		},
		di = class extends h.DesProvider {
			constructor() {
				super(...arguments), this.keySizeBits = 192, this.ivSize = 8, this.name = 'DES-EDE3-CBC';
			}
			async onGenerateKey(e, t, r) {
				let s = await Ge.generateKey({ name: this.name, length: this.keySizeBits }, t, r);
				return E(s);
			}
			async onEncrypt(e, t, r) {
				return Ge.encrypt(e, v(t), new Uint8Array(r));
			}
			async onDecrypt(e, t, r) {
				return Ge.decrypt(e, v(t), new Uint8Array(r));
			}
			async onExportKey(e, t) {
				return Ge.exportKey(e, v(t));
			}
			async onImportKey(e, t, r, s, o) {
				let a = await Ge.importKey(e, t, { name: this.name, length: this.keySizeBits }, s, o);
				if (a.data.length !== this.keySizeBits >> 3) throw new h.OperationError('keyData: Wrong key size');
				return E(a);
			}
			checkCryptoKey(e, t) {
				if (super.checkCryptoKey(e, t), !(v(e) instanceof Nt)) throw new TypeError('key: Is not a DesCryptoKey');
			}
		};
	function af(n) {
		switch (n.name.toUpperCase()) {
			case 'RSA-OAEP': {
				let e = /(\d+)$/.exec(n.hash.name)[1];
				return `RSA-OAEP${e !== '1' ? `-${e}` : ''}`;
			}
			case 'RSASSA-PKCS1-V1_5':
				return `RS${/(\d+)$/.exec(n.hash.name)[1]}`;
			case 'RSA-PSS':
				return `PS${/(\d+)$/.exec(n.hash.name)[1]}`;
			case 'RSA-PKCS1':
				return 'RS1';
			default:
				throw new h.OperationError('algorithm: Is not recognized');
		}
	}
	var zt = class extends Ft {
			constructor() {
				super(...arguments), this.type = 'private';
			}
			getKey() {
				let e = B.AsnParser.parse(this.data, h.asn1.PrivateKeyInfo);
				return B.AsnParser.parse(e.privateKey, h.asn1.RsaPrivateKey);
			}
			toJSON() {
				let e = this.getKey(), t = { kty: 'RSA', alg: af(this.algorithm), key_ops: this.usages, ext: this.extractable };
				return Object.assign(t, V.JsonSerializer.toJSON(e));
			}
			fromJSON(e) {
				let t = V.JsonParser.fromJSON(e, { targetSchema: h.asn1.RsaPrivateKey }), r = new h.asn1.PrivateKeyInfo();
				r.privateKeyAlgorithm.algorithm = '1.2.840.113549.1.1.1',
					r.privateKeyAlgorithm.parameters = null,
					r.privateKey = B.AsnSerializer.serialize(t),
					this.data = Buffer.from(B.AsnSerializer.serialize(r));
			}
		},
		Jt = class extends Ft {
			constructor() {
				super(...arguments), this.type = 'public';
			}
			getKey() {
				let e = B.AsnParser.parse(this.data, h.asn1.PublicKeyInfo);
				return B.AsnParser.parse(e.publicKey, h.asn1.RsaPublicKey);
			}
			toJSON() {
				let e = this.getKey(), t = { kty: 'RSA', alg: af(this.algorithm), key_ops: this.usages, ext: this.extractable };
				return Object.assign(t, V.JsonSerializer.toJSON(e));
			}
			fromJSON(e) {
				let t = V.JsonParser.fromJSON(e, { targetSchema: h.asn1.RsaPublicKey }), r = new h.asn1.PublicKeyInfo();
				r.publicKeyAlgorithm.algorithm = '1.2.840.113549.1.1.1',
					r.publicKeyAlgorithm.parameters = null,
					r.publicKey = B.AsnSerializer.serialize(t),
					this.data = Buffer.from(B.AsnSerializer.serialize(r));
			}
		},
		ce = class {
			static async generateKey(e, t, r) {
				let s = new zt();
				s.algorithm = e, s.extractable = t, s.usages = r.filter(u => this.privateKeyUsages.indexOf(u) !== -1);
				let o = new Jt();
				o.algorithm = e, o.extractable = !0, o.usages = r.filter(u => this.publicKeyUsages.indexOf(u) !== -1);
				let a = Buffer.concat([Buffer.alloc(4 - e.publicExponent.byteLength, 0), Buffer.from(e.publicExponent)])
						.readInt32BE(0),
					i = S.default.generateKeyPairSync('rsa', {
						modulusLength: e.modulusLength,
						publicExponent: a,
						publicKeyEncoding: { format: 'der', type: 'spki' },
						privateKeyEncoding: { format: 'der', type: 'pkcs8' },
					});
				return s.data = i.privateKey, o.data = i.publicKey, { privateKey: s, publicKey: o };
			}
			static async exportKey(e, t) {
				switch (e.toLowerCase()) {
					case 'jwk':
						return V.JsonSerializer.toJSON(t);
					case 'pkcs8':
					case 'spki':
						return new Uint8Array(t.data).buffer;
					default:
						throw new h.OperationError("format: Must be 'jwk', 'pkcs8' or 'spki'");
				}
			}
			static async importKey(e, t, r, s, o) {
				switch (e.toLowerCase()) {
					case 'jwk':
						if (t.d) {
							let i = V.JsonParser.fromJSON(t, { targetSchema: h.asn1.RsaPrivateKey });
							return this.importPrivateKey(i, r, s, o);
						} else {
							let i = V.JsonParser.fromJSON(t, { targetSchema: h.asn1.RsaPublicKey });
							return this.importPublicKey(i, r, s, o);
						}
					case 'spki': {
						let a = B.AsnParser.parse(new Uint8Array(t), h.asn1.PublicKeyInfo),
							i = B.AsnParser.parse(a.publicKey, h.asn1.RsaPublicKey);
						return this.importPublicKey(i, r, s, o);
					}
					case 'pkcs8': {
						let a = B.AsnParser.parse(new Uint8Array(t), h.asn1.PrivateKeyInfo),
							i = B.AsnParser.parse(a.privateKey, h.asn1.RsaPrivateKey);
						return this.importPrivateKey(i, r, s, o);
					}
					default:
						throw new h.OperationError("format: Must be 'jwk', 'pkcs8' or 'spki'");
				}
			}
			static async sign(e, t, r) {
				switch (e.name.toUpperCase()) {
					case 'RSA-PSS':
					case 'RSASSA-PKCS1-V1_5':
						return this.signRsa(e, t, r);
					default:
						throw new h.OperationError('algorithm: Is not recognized');
				}
			}
			static async verify(e, t, r, s) {
				switch (e.name.toUpperCase()) {
					case 'RSA-PSS':
					case 'RSASSA-PKCS1-V1_5':
						return this.verifySSA(e, t, s, r);
					default:
						throw new h.OperationError('algorithm: Is not recognized');
				}
			}
			static async encrypt(e, t, r) {
				switch (e.name.toUpperCase()) {
					case 'RSA-OAEP':
						return this.encryptOAEP(e, t, r);
					default:
						throw new h.OperationError('algorithm: Is not recognized');
				}
			}
			static async decrypt(e, t, r) {
				switch (e.name.toUpperCase()) {
					case 'RSA-OAEP':
						return this.decryptOAEP(e, t, r);
					default:
						throw new h.OperationError('algorithm: Is not recognized');
				}
			}
			static importPrivateKey(e, t, r, s) {
				let o = new h.asn1.PrivateKeyInfo();
				o.privateKeyAlgorithm.algorithm = '1.2.840.113549.1.1.1',
					o.privateKeyAlgorithm.parameters = null,
					o.privateKey = B.AsnSerializer.serialize(e);
				let a = new zt();
				return a.data = Buffer.from(B.AsnSerializer.serialize(o)),
					a.algorithm = Object.assign({}, t),
					a.algorithm.publicExponent = new Uint8Array(e.publicExponent),
					a.algorithm.modulusLength = e.modulus.byteLength << 3,
					a.extractable = r,
					a.usages = s,
					a;
			}
			static importPublicKey(e, t, r, s) {
				let o = new h.asn1.PublicKeyInfo();
				o.publicKeyAlgorithm.algorithm = '1.2.840.113549.1.1.1',
					o.publicKeyAlgorithm.parameters = null,
					o.publicKey = B.AsnSerializer.serialize(e);
				let a = new Jt();
				return a.data = Buffer.from(B.AsnSerializer.serialize(o)),
					a.algorithm = Object.assign({}, t),
					a.algorithm.publicExponent = new Uint8Array(e.publicExponent),
					a.algorithm.modulusLength = e.modulus.byteLength << 3,
					a.extractable = r,
					a.usages = s,
					a;
			}
			static getCryptoAlgorithm(e) {
				switch (e.hash.name.toUpperCase()) {
					case 'SHA-1':
						return 'RSA-SHA1';
					case 'SHA-256':
						return 'RSA-SHA256';
					case 'SHA-384':
						return 'RSA-SHA384';
					case 'SHA-512':
						return 'RSA-SHA512';
					case 'SHA3-256':
						return 'RSA-SHA3-256';
					case 'SHA3-384':
						return 'RSA-SHA3-384';
					case 'SHA3-512':
						return 'RSA-SHA3-512';
					default:
						throw new h.OperationError('algorithm.hash: Is not recognized');
				}
			}
			static signRsa(e, t, r) {
				let s = this.getCryptoAlgorithm(t.algorithm), o = S.default.createSign(s);
				o.update(Buffer.from(r)),
					t.pem || (t.pem = `-----BEGIN PRIVATE KEY-----
${t.data.toString('base64')}
-----END PRIVATE KEY-----`);
				let a = { key: t.pem };
				e.name.toUpperCase() === 'RSA-PSS'
					&& (a.padding = S.default.constants.RSA_PKCS1_PSS_PADDING, a.saltLength = e.saltLength);
				let i = o.sign(a);
				return new Uint8Array(i).buffer;
			}
			static verifySSA(e, t, r, s) {
				let o = this.getCryptoAlgorithm(t.algorithm), a = S.default.createVerify(o);
				a.update(Buffer.from(r)),
					t.pem || (t.pem = `-----BEGIN PUBLIC KEY-----
${t.data.toString('base64')}
-----END PUBLIC KEY-----`);
				let i = { key: t.pem };
				return e.name.toUpperCase() === 'RSA-PSS'
					&& (i.padding = S.default.constants.RSA_PKCS1_PSS_PADDING, i.saltLength = e.saltLength),
					a.verify(i, s);
			}
			static encryptOAEP(e, t, r) {
				let s = {
					key: `-----BEGIN PUBLIC KEY-----
${t.data.toString('base64')}
-----END PUBLIC KEY-----`,
					padding: S.default.constants.RSA_PKCS1_OAEP_PADDING,
				};
				return e.label, new Uint8Array(S.default.publicEncrypt(s, r)).buffer;
			}
			static decryptOAEP(e, t, r) {
				let s = {
					key: `-----BEGIN PRIVATE KEY-----
${t.data.toString('base64')}
-----END PRIVATE KEY-----`,
					padding: S.default.constants.RSA_PKCS1_OAEP_PADDING,
				};
				return e.label, new Uint8Array(S.default.privateDecrypt(s, r)).buffer;
			}
		};
	ce.publicKeyUsages = ['verify', 'encrypt', 'wrapKey'];
	ce.privateKeyUsages = ['sign', 'decrypt', 'unwrapKey'];
	var mi = class extends h.RsaSsaProvider {
			constructor() {
				super(...arguments),
					this.hashAlgorithms = [
						'SHA-1',
						'SHA-256',
						'SHA-384',
						'SHA-512',
						'shake128',
						'shake256',
						'SHA3-256',
						'SHA3-384',
						'SHA3-512',
					];
			}
			async onGenerateKey(e, t, r) {
				let s = await ce.generateKey({ ...e, name: this.name }, t, r);
				return { privateKey: E(s.privateKey), publicKey: E(s.publicKey) };
			}
			async onSign(e, t, r) {
				return ce.sign(e, v(t), new Uint8Array(r));
			}
			async onVerify(e, t, r, s) {
				return ce.verify(e, v(t), new Uint8Array(r), new Uint8Array(s));
			}
			async onExportKey(e, t) {
				return ce.exportKey(e, v(t));
			}
			async onImportKey(e, t, r, s, o) {
				let a = await ce.importKey(e, t, { ...r, name: this.name }, s, o);
				return E(a);
			}
			checkCryptoKey(e, t) {
				super.checkCryptoKey(e, t);
				let r = v(e);
				if (!(r instanceof zt || r instanceof Jt)) throw new TypeError('key: Is not RSA CryptoKey');
			}
		},
		yi = class extends h.RsaPssProvider {
			constructor() {
				super(...arguments),
					this.hashAlgorithms = [
						'SHA-1',
						'SHA-256',
						'SHA-384',
						'SHA-512',
						'shake128',
						'shake256',
						'SHA3-256',
						'SHA3-384',
						'SHA3-512',
					];
			}
			async onGenerateKey(e, t, r) {
				let s = await ce.generateKey({ ...e, name: this.name }, t, r);
				return { privateKey: E(s.privateKey), publicKey: E(s.publicKey) };
			}
			async onSign(e, t, r) {
				return ce.sign(e, v(t), new Uint8Array(r));
			}
			async onVerify(e, t, r, s) {
				return ce.verify(e, v(t), new Uint8Array(r), new Uint8Array(s));
			}
			async onExportKey(e, t) {
				return ce.exportKey(e, v(t));
			}
			async onImportKey(e, t, r, s, o) {
				let a = await ce.importKey(e, t, { ...r, name: this.name }, s, o);
				return E(a);
			}
			checkCryptoKey(e, t) {
				super.checkCryptoKey(e, t);
				let r = v(e);
				if (!(r instanceof zt || r instanceof Jt)) throw new TypeError('key: Is not RSA CryptoKey');
			}
		},
		we = class {
			static size(e) {
				switch (e.name.toUpperCase()) {
					case 'SHA-1':
						return 160;
					case 'SHA-256':
					case 'SHA3-256':
						return 256;
					case 'SHA-384':
					case 'SHA3-384':
						return 384;
					case 'SHA-512':
					case 'SHA3-512':
						return 512;
					default:
						throw new Error('Unrecognized name');
				}
			}
			static getAlgorithmName(e) {
				switch (e.name.toUpperCase()) {
					case 'SHA-1':
						return 'sha1';
					case 'SHA-256':
						return 'sha256';
					case 'SHA-384':
						return 'sha384';
					case 'SHA-512':
						return 'sha512';
					case 'SHA3-256':
						return 'sha3-256';
					case 'SHA3-384':
						return 'sha3-384';
					case 'SHA3-512':
						return 'sha3-512';
					default:
						throw new Error('Unrecognized name');
				}
			}
			static digest(e, t) {
				let r = this.getAlgorithmName(e), s = S.default.createHash(r).update(Buffer.from(t)).digest();
				return new Uint8Array(s).buffer;
			}
		},
		gi = class extends h.RsaOaepProvider {
			async onGenerateKey(e, t, r) {
				let s = await ce.generateKey({ ...e, name: this.name }, t, r);
				return { privateKey: E(s.privateKey), publicKey: E(s.publicKey) };
			}
			async onEncrypt(e, t, r) {
				let s = v(t),
					o = new Uint8Array(r),
					a = Math.ceil(s.algorithm.modulusLength >> 3),
					i = we.size(s.algorithm.hash) >> 3,
					c = o.byteLength,
					u = a - c - 2 * i - 2;
				if (c > a - 2 * i - 2) throw new Error('Data too large');
				let l = new Uint8Array(a), f = l.subarray(1, i + 1), d = l.subarray(i + 1);
				d.set(o, i + u + 1);
				let y = S.default.createHash(s.algorithm.hash.name.replace('-', '')).update(
					h.BufferSourceConverter.toUint8Array(e.label || new Uint8Array(0)),
				).digest();
				d.set(y, 0), d[i + u] = 1, S.default.randomFillSync(f);
				let x = this.mgf1(s.algorithm.hash, f, d.length);
				for (let L = 0; L < d.length; L++) d[L] ^= x[L];
				let N = this.mgf1(s.algorithm.hash, d, f.length);
				for (let L = 0; L < f.length; L++) f[L] ^= N[L];
				s.pem || (s.pem = `-----BEGIN PUBLIC KEY-----
${s.data.toString('base64')}
-----END PUBLIC KEY-----`);
				let H = S.default.publicEncrypt({ key: s.pem, padding: S.default.constants.RSA_NO_PADDING }, Buffer.from(l));
				return new Uint8Array(H).buffer;
			}
			async onDecrypt(e, t, r) {
				let s = v(t), o = Math.ceil(s.algorithm.modulusLength >> 3), a = we.size(s.algorithm.hash) >> 3;
				if (r.byteLength !== o) throw new Error('Bad data');
				s.pem || (s.pem = `-----BEGIN PRIVATE KEY-----
${s.data.toString('base64')}
-----END PRIVATE KEY-----`);
				let c = S.default.privateDecrypt({ key: s.pem, padding: S.default.constants.RSA_NO_PADDING }, Buffer.from(r)),
					u = c[0],
					l = c.subarray(1, a + 1),
					f = c.subarray(a + 1);
				if (u !== 0) throw new Error('Decryption failed');
				let d = this.mgf1(s.algorithm.hash, f, l.length);
				for (let H = 0; H < l.length; H++) l[H] ^= d[H];
				let y = this.mgf1(s.algorithm.hash, l, f.length);
				for (let H = 0; H < f.length; H++) f[H] ^= y[H];
				let x = S.default.createHash(s.algorithm.hash.name.replace('-', '')).update(
					h.BufferSourceConverter.toUint8Array(e.label || new Uint8Array(0)),
				).digest();
				for (let H = 0; H < a; H++) if (x[H] !== f[H]) throw new Error('Decryption failed');
				let N = a;
				for (; N < f.length; N++) {
					let H = f[N];
					if (H === 1) break;
					if (H !== 0) throw new Error('Decryption failed');
				}
				if (N === f.length) throw new Error('Decryption failed');
				return c = f.subarray(N + 1), new Uint8Array(c).buffer;
			}
			async onExportKey(e, t) {
				return ce.exportKey(e, v(t));
			}
			async onImportKey(e, t, r, s, o) {
				let a = await ce.importKey(e, t, { ...r, name: this.name }, s, o);
				return E(a);
			}
			checkCryptoKey(e, t) {
				super.checkCryptoKey(e, t);
				let r = v(e);
				if (!(r instanceof zt || r instanceof Jt)) throw new TypeError('key: Is not RSA CryptoKey');
			}
			mgf1(e, t, r = 0) {
				let s = we.size(e) >> 3, o = new Uint8Array(r), a = new Uint8Array(4), i = Math.ceil(r / s);
				for (let c = 0; c < i; c++) {
					a[0] = c >>> 24, a[1] = c >>> 16 & 255, a[2] = c >>> 8 & 255, a[3] = c & 255;
					let u = o.subarray(c * s), l = S.default.createHash(e.name.replace('-', '')).update(t).update(a).digest();
					l.length > u.length && (l = l.subarray(0, u.length)), u.set(l);
				}
				return o;
			}
		},
		vi = class extends h.ProviderCrypto {
			constructor() {
				super(...arguments),
					this.name = 'RSAES-PKCS1-v1_5',
					this.usages = { publicKey: ['encrypt', 'wrapKey'], privateKey: ['decrypt', 'unwrapKey'] };
			}
			async onGenerateKey(e, t, r) {
				let s = await ce.generateKey({ ...e, name: this.name }, t, r);
				return { privateKey: E(s.privateKey), publicKey: E(s.publicKey) };
			}
			checkGenerateKeyParams(e) {
				if (
					this.checkRequiredProperty(e, 'publicExponent'), !(e.publicExponent && e.publicExponent instanceof Uint8Array)
				) {
					throw new TypeError('publicExponent: Missing or not a Uint8Array');
				}
				let t = yt.Convert.ToBase64(e.publicExponent);
				if (!(t === 'Aw==' || t === 'AQAB')) throw new TypeError('publicExponent: Must be [3] or [1,0,1]');
				switch (this.checkRequiredProperty(e, 'modulusLength'), e.modulusLength) {
					case 1024:
					case 2048:
					case 4096:
						break;
					default:
						throw new TypeError('modulusLength: Must be 1024, 2048, or 4096');
				}
			}
			async onEncrypt(e, t, r) {
				let s = this.toCryptoOptions(t), o = os.publicEncrypt(s, new Uint8Array(r));
				return new Uint8Array(o).buffer;
			}
			async onDecrypt(e, t, r) {
				let s = this.toCryptoOptions(t), o = os.privateDecrypt(s, new Uint8Array(r));
				return new Uint8Array(o).buffer;
			}
			async onExportKey(e, t) {
				return ce.exportKey(e, v(t));
			}
			async onImportKey(e, t, r, s, o) {
				let a = await ce.importKey(e, t, { ...r, name: this.name }, s, o);
				return E(a);
			}
			checkCryptoKey(e, t) {
				super.checkCryptoKey(e, t);
				let r = v(e);
				if (!(r instanceof zt || r instanceof Jt)) throw new TypeError('key: Is not RSA CryptoKey');
			}
			toCryptoOptions(e) {
				let t = e.type.toUpperCase();
				return {
					key: `-----BEGIN ${t} KEY-----
${v(e).data.toString('base64')}
-----END ${t} KEY-----`,
					padding: os.constants.RSA_PKCS1_PADDING,
				};
			}
		},
		Wd = {
			'1.2.840.10045.3.1.7': 'P-256',
			'P-256': '1.2.840.10045.3.1.7',
			'1.3.132.0.34': 'P-384',
			'P-384': '1.3.132.0.34',
			'1.3.132.0.35': 'P-521',
			'P-521': '1.3.132.0.35',
			'1.3.132.0.10': 'K-256',
			'K-256': '1.3.132.0.10',
			brainpoolP160r1: '1.3.36.3.3.2.8.1.1.1',
			'1.3.36.3.3.2.8.1.1.1': 'brainpoolP160r1',
			brainpoolP160t1: '1.3.36.3.3.2.8.1.1.2',
			'1.3.36.3.3.2.8.1.1.2': 'brainpoolP160t1',
			brainpoolP192r1: '1.3.36.3.3.2.8.1.1.3',
			'1.3.36.3.3.2.8.1.1.3': 'brainpoolP192r1',
			brainpoolP192t1: '1.3.36.3.3.2.8.1.1.4',
			'1.3.36.3.3.2.8.1.1.4': 'brainpoolP192t1',
			brainpoolP224r1: '1.3.36.3.3.2.8.1.1.5',
			'1.3.36.3.3.2.8.1.1.5': 'brainpoolP224r1',
			brainpoolP224t1: '1.3.36.3.3.2.8.1.1.6',
			'1.3.36.3.3.2.8.1.1.6': 'brainpoolP224t1',
			brainpoolP256r1: '1.3.36.3.3.2.8.1.1.7',
			'1.3.36.3.3.2.8.1.1.7': 'brainpoolP256r1',
			brainpoolP256t1: '1.3.36.3.3.2.8.1.1.8',
			'1.3.36.3.3.2.8.1.1.8': 'brainpoolP256t1',
			brainpoolP320r1: '1.3.36.3.3.2.8.1.1.9',
			'1.3.36.3.3.2.8.1.1.9': 'brainpoolP320r1',
			brainpoolP320t1: '1.3.36.3.3.2.8.1.1.10',
			'1.3.36.3.3.2.8.1.1.10': 'brainpoolP320t1',
			brainpoolP384r1: '1.3.36.3.3.2.8.1.1.11',
			'1.3.36.3.3.2.8.1.1.11': 'brainpoolP384r1',
			brainpoolP384t1: '1.3.36.3.3.2.8.1.1.12',
			'1.3.36.3.3.2.8.1.1.12': 'brainpoolP384t1',
			brainpoolP512r1: '1.3.36.3.3.2.8.1.1.13',
			'1.3.36.3.3.2.8.1.1.13': 'brainpoolP512r1',
			brainpoolP512t1: '1.3.36.3.3.2.8.1.1.14',
			'1.3.36.3.3.2.8.1.1.14': 'brainpoolP512t1',
		};
	function as(n) {
		let e = Wd[n];
		if (!e) throw new h.OperationError(`Cannot convert WebCrypto named curve '${n}' to OID`);
		return e;
	}
	var Jr = class extends Ft {
			constructor() {
				super(...arguments), this.type = 'private';
			}
			getKey() {
				let e = B.AsnParser.parse(this.data, h.asn1.PrivateKeyInfo);
				return B.AsnParser.parse(e.privateKey, h.asn1.EcPrivateKey);
			}
			toJSON() {
				let e = this.getKey(),
					t = { kty: 'EC', crv: this.algorithm.namedCurve, key_ops: this.usages, ext: this.extractable };
				return Object.assign(t, V.JsonSerializer.toJSON(e));
			}
			fromJSON(e) {
				if (!e.crv) throw new h.OperationError("Cannot get named curve from JWK. Property 'crv' is required");
				let t = new h.asn1.PrivateKeyInfo();
				t.privateKeyAlgorithm.algorithm = '1.2.840.10045.2.1',
					t.privateKeyAlgorithm.parameters = B.AsnSerializer.serialize(new h.asn1.ObjectIdentifier(as(e.crv)));
				let r = V.JsonParser.fromJSON(e, { targetSchema: h.asn1.EcPrivateKey });
				return t.privateKey = B.AsnSerializer.serialize(r), this.data = Buffer.from(B.AsnSerializer.serialize(t)), this;
			}
		},
		qr = class extends Ft {
			constructor() {
				super(...arguments), this.type = 'public';
			}
			getKey() {
				let e = B.AsnParser.parse(this.data, h.asn1.PublicKeyInfo);
				return new h.asn1.EcPublicKey(e.publicKey);
			}
			toJSON() {
				let e = this.getKey(),
					t = { kty: 'EC', crv: this.algorithm.namedCurve, key_ops: this.usages, ext: this.extractable };
				return Object.assign(t, V.JsonSerializer.toJSON(e));
			}
			fromJSON(e) {
				if (!e.crv) throw new h.OperationError("Cannot get named curve from JWK. Property 'crv' is required");
				let t = V.JsonParser.fromJSON(e, { targetSchema: h.asn1.EcPublicKey }), r = new h.asn1.PublicKeyInfo();
				return r.publicKeyAlgorithm.algorithm = '1.2.840.10045.2.1',
					r.publicKeyAlgorithm.parameters = B.AsnSerializer.serialize(new h.asn1.ObjectIdentifier(as(e.crv))),
					r.publicKey = B.AsnSerializer.toASN(t).valueHex,
					this.data = Buffer.from(B.AsnSerializer.serialize(r)),
					this;
			}
		},
		wi = class extends h.ProviderCrypto {
			constructor() {
				super(...arguments), this.name = 'SHA-1', this.usages = [];
			}
			async onDigest(e, t) {
				return we.digest(e, t);
			}
		},
		bi = class extends h.ProviderCrypto {
			constructor() {
				super(...arguments), this.name = 'SHA-256', this.usages = [];
			}
			async onDigest(e, t) {
				return we.digest(e, t);
			}
		},
		Ai = class extends h.ProviderCrypto {
			constructor() {
				super(...arguments), this.name = 'SHA-384', this.usages = [];
			}
			async onDigest(e, t) {
				return we.digest(e, t);
			}
		},
		xi = class extends h.ProviderCrypto {
			constructor() {
				super(...arguments), this.name = 'SHA-512', this.usages = [];
			}
			async onDigest(e, t) {
				return we.digest(e, t);
			}
		},
		Si = class extends h.ProviderCrypto {
			constructor() {
				super(...arguments), this.name = 'SHA3-256', this.usages = [];
			}
			async onDigest(e, t) {
				return we.digest(e, t);
			}
		},
		ki = class extends h.ProviderCrypto {
			constructor() {
				super(...arguments), this.name = 'SHA3-384', this.usages = [];
			}
			async onDigest(e, t) {
				return we.digest(e, t);
			}
		},
		Bi = class extends h.ProviderCrypto {
			constructor() {
				super(...arguments), this.name = 'SHA3-512', this.usages = [];
			}
			async onDigest(e, t) {
				return we.digest(e, t);
			}
		},
		Ue = class {
			static async generateKey(e, t, r) {
				let s = new Jr();
				s.algorithm = e, s.extractable = t, s.usages = r.filter(c => this.privateKeyUsages.indexOf(c) !== -1);
				let o = new qr();
				o.algorithm = e, o.extractable = !0, o.usages = r.filter(c => this.publicKeyUsages.indexOf(c) !== -1);
				let a = S.default.generateKeyPairSync('ec', {
					namedCurve: this.getOpenSSLNamedCurve(e.namedCurve),
					publicKeyEncoding: { format: 'der', type: 'spki' },
					privateKeyEncoding: { format: 'der', type: 'pkcs8' },
				});
				return s.data = a.privateKey, o.data = a.publicKey, { privateKey: s, publicKey: o };
			}
			static async sign(e, t, r) {
				let s = we.getAlgorithmName(e.hash), o = S.default.createSign(s);
				o.update(Buffer.from(r)),
					t.pem || (t.pem = `-----BEGIN PRIVATE KEY-----
${t.data.toString('base64')}
-----END PRIVATE KEY-----`);
				let a = { key: t.pem }, i = o.sign(a), c = B.AsnParser.parse(i, h.asn1.EcDsaSignature);
				return h.EcUtils.encodeSignature(c, h.EcCurves.get(t.algorithm.namedCurve).size).buffer;
			}
			static async verify(e, t, r, s) {
				let o = we.getAlgorithmName(e.hash), a = S.default.createVerify(o);
				a.update(Buffer.from(s)),
					t.pem || (t.pem = `-----BEGIN PUBLIC KEY-----
${t.data.toString('base64')}
-----END PUBLIC KEY-----`);
				let i = { key: t.pem },
					c = new h.asn1.EcDsaSignature(),
					u = h.EcCurves.get(t.algorithm.namedCurve),
					l = h.EcUtils.decodeSignature(r, u.size);
				c.r = yt.BufferSourceConverter.toArrayBuffer(l.r), c.s = yt.BufferSourceConverter.toArrayBuffer(l.s);
				let f = Buffer.from(B.AsnSerializer.serialize(c));
				return a.verify(i, f);
			}
			static async deriveBits(e, t, r) {
				let s = this.getOpenSSLNamedCurve(t.algorithm.namedCurve),
					o = S.default.createECDH(s),
					a = B.AsnParser.parse(t.data, h.asn1.PrivateKeyInfo),
					i = B.AsnParser.parse(a.privateKey, h.asn1.EcPrivateKey);
				o.setPrivateKey(Buffer.from(i.privateKey));
				let c = B.AsnParser.parse(e.public.data, h.asn1.PublicKeyInfo), u = o.computeSecret(Buffer.from(c.publicKey));
				return new Uint8Array(u).buffer.slice(0, r >> 3);
			}
			static async exportKey(e, t) {
				switch (e.toLowerCase()) {
					case 'jwk':
						return V.JsonSerializer.toJSON(t);
					case 'pkcs8':
					case 'spki':
						return new Uint8Array(t.data).buffer;
					case 'raw':
						return B.AsnParser.parse(t.data, h.asn1.PublicKeyInfo).publicKey;
					default:
						throw new h.OperationError("format: Must be 'jwk', 'raw', pkcs8' or 'spki'");
				}
			}
			static async importKey(e, t, r, s, o) {
				switch (e.toLowerCase()) {
					case 'jwk':
						if (t.d) {
							let i = V.JsonParser.fromJSON(t, { targetSchema: h.asn1.EcPrivateKey });
							return this.importPrivateKey(i, r, s, o);
						} else {
							let i = V.JsonParser.fromJSON(t, { targetSchema: h.asn1.EcPublicKey });
							return this.importPublicKey(i, r, s, o);
						}
					case 'raw': {
						let a = new h.asn1.EcPublicKey(t);
						return this.importPublicKey(a, r, s, o);
					}
					case 'spki': {
						let a = B.AsnParser.parse(new Uint8Array(t), h.asn1.PublicKeyInfo), i = new h.asn1.EcPublicKey(a.publicKey);
						return this.assertKeyParameters(a.publicKeyAlgorithm.parameters, r.namedCurve),
							this.importPublicKey(i, r, s, o);
					}
					case 'pkcs8': {
						let a = B.AsnParser.parse(new Uint8Array(t), h.asn1.PrivateKeyInfo),
							i = B.AsnParser.parse(a.privateKey, h.asn1.EcPrivateKey);
						return this.assertKeyParameters(a.privateKeyAlgorithm.parameters, r.namedCurve),
							this.importPrivateKey(i, r, s, o);
					}
					default:
						throw new h.OperationError("format: Must be 'jwk', 'raw', 'pkcs8' or 'spki'");
				}
			}
			static assertKeyParameters(e, t) {
				if (!e) throw new h.CryptoError("Key info doesn't have required parameters");
				let r = '';
				try {
					r = B.AsnParser.parse(e, h.asn1.ObjectIdentifier).value;
				} catch {
					throw new h.CryptoError('Cannot read key info parameters');
				}
				if (as(t) !== r) throw new h.CryptoError("Key info parameter doesn't match to named curve");
			}
			static async importPrivateKey(e, t, r, s) {
				let o = new h.asn1.PrivateKeyInfo();
				o.privateKeyAlgorithm.algorithm = '1.2.840.10045.2.1',
					o.privateKeyAlgorithm.parameters = B.AsnSerializer.serialize(new h.asn1.ObjectIdentifier(as(t.namedCurve))),
					o.privateKey = B.AsnSerializer.serialize(e);
				let a = new Jr();
				return a.data = Buffer.from(B.AsnSerializer.serialize(o)),
					a.algorithm = Object.assign({}, t),
					a.extractable = r,
					a.usages = s,
					a;
			}
			static async importPublicKey(e, t, r, s) {
				let o = new h.asn1.PublicKeyInfo();
				o.publicKeyAlgorithm.algorithm = '1.2.840.10045.2.1';
				let a = as(t.namedCurve);
				o.publicKeyAlgorithm.parameters = B.AsnSerializer.serialize(new h.asn1.ObjectIdentifier(a)),
					o.publicKey = e.value;
				let i = new qr();
				return i.data = Buffer.from(B.AsnSerializer.serialize(o)),
					i.algorithm = Object.assign({}, t),
					i.extractable = r,
					i.usages = s,
					i;
			}
			static getOpenSSLNamedCurve(e) {
				switch (e.toUpperCase()) {
					case 'P-256':
						return 'prime256v1';
					case 'K-256':
						return 'secp256k1';
					case 'P-384':
						return 'secp384r1';
					case 'P-521':
						return 'secp521r1';
					default:
						return e;
				}
			}
		};
	Ue.publicKeyUsages = ['verify'];
	Ue.privateKeyUsages = ['sign', 'deriveKey', 'deriveBits'];
	var _i = class extends h.EcdsaProvider {
			constructor() {
				super(...arguments),
					this.namedCurves = h.EcCurves.names,
					this.hashAlgorithms = [
						'SHA-1',
						'SHA-256',
						'SHA-384',
						'SHA-512',
						'shake128',
						'shake256',
						'SHA3-256',
						'SHA3-384',
						'SHA3-512',
					];
			}
			async onGenerateKey(e, t, r) {
				let s = await Ue.generateKey({ ...e, name: this.name }, t, r);
				return { privateKey: E(s.privateKey), publicKey: E(s.publicKey) };
			}
			async onSign(e, t, r) {
				return Ue.sign(e, v(t), new Uint8Array(r));
			}
			async onVerify(e, t, r, s) {
				return Ue.verify(e, v(t), new Uint8Array(r), new Uint8Array(s));
			}
			async onExportKey(e, t) {
				return Ue.exportKey(e, v(t));
			}
			async onImportKey(e, t, r, s, o) {
				let a = await Ue.importKey(e, t, { ...r, name: this.name }, s, o);
				return E(a);
			}
			checkCryptoKey(e, t) {
				super.checkCryptoKey(e, t);
				let r = v(e);
				if (!(r instanceof Jr || r instanceof qr)) throw new TypeError('key: Is not EC CryptoKey');
			}
		},
		Ci = class extends h.EcdhProvider {
			constructor() {
				super(...arguments), this.namedCurves = h.EcCurves.names;
			}
			async onGenerateKey(e, t, r) {
				let s = await Ue.generateKey({ ...e, name: this.name }, t, r);
				return { privateKey: E(s.privateKey), publicKey: E(s.publicKey) };
			}
			async onExportKey(e, t) {
				return Ue.exportKey(e, v(t));
			}
			async onImportKey(e, t, r, s, o) {
				let a = await Ue.importKey(e, t, { ...r, name: this.name }, s, o);
				return E(a);
			}
			checkCryptoKey(e, t) {
				super.checkCryptoKey(e, t);
				let r = v(e);
				if (!(r instanceof Jr || r instanceof qr)) throw new TypeError('key: Is not EC CryptoKey');
			}
			async onDeriveBits(e, t, r) {
				return await Ue.deriveBits({ ...e, public: v(e.public) }, v(t), r);
			}
		},
		Yd = {
			[h.asn1.idEd448]: 'Ed448',
			ed448: h.asn1.idEd448,
			[h.asn1.idX448]: 'X448',
			x448: h.asn1.idX448,
			[h.asn1.idEd25519]: 'Ed25519',
			ed25519: h.asn1.idEd25519,
			[h.asn1.idX25519]: 'X25519',
			x25519: h.asn1.idX25519,
		};
	function cf(n) {
		let e = Yd[n.toLowerCase()];
		if (!e) throw new h.OperationError(`Cannot convert WebCrypto named curve '${n}' to OID`);
		return e;
	}
	var So = class extends Ft {
			constructor() {
				super(...arguments), this.type = 'private';
			}
			getKey() {
				let e = B.AsnParser.parse(this.data, h.asn1.PrivateKeyInfo);
				return B.AsnParser.parse(e.privateKey, h.asn1.CurvePrivateKey);
			}
			toJSON() {
				let e = this.getKey(),
					t = { kty: 'OKP', crv: this.algorithm.namedCurve, key_ops: this.usages, ext: this.extractable };
				return Object.assign(t, V.JsonSerializer.toJSON(e));
			}
			fromJSON(e) {
				if (!e.crv) throw new h.OperationError("Cannot get named curve from JWK. Property 'crv' is required");
				let t = new h.asn1.PrivateKeyInfo();
				t.privateKeyAlgorithm.algorithm = cf(e.crv);
				let r = V.JsonParser.fromJSON(e, { targetSchema: h.asn1.CurvePrivateKey });
				return t.privateKey = B.AsnSerializer.serialize(r), this.data = Buffer.from(B.AsnSerializer.serialize(t)), this;
			}
		},
		ko = class extends Ft {
			constructor() {
				super(...arguments), this.type = 'public';
			}
			getKey() {
				return B.AsnParser.parse(this.data, h.asn1.PublicKeyInfo).publicKey;
			}
			toJSON() {
				let e = this.getKey(),
					t = { kty: 'OKP', crv: this.algorithm.namedCurve, key_ops: this.usages, ext: this.extractable };
				return Object.assign(t, { x: yt.Convert.ToBase64Url(e) });
			}
			fromJSON(e) {
				if (!e.crv) throw new h.OperationError("Cannot get named curve from JWK. Property 'crv' is required");
				if (!e.x) throw new h.OperationError("Cannot get property from JWK. Property 'x' is required");
				let t = new h.asn1.PublicKeyInfo();
				return t.publicKeyAlgorithm.algorithm = cf(e.crv),
					t.publicKey = yt.Convert.FromBase64Url(e.x),
					this.data = Buffer.from(B.AsnSerializer.serialize(t)),
					this;
			}
		},
		$e = class {
			static async generateKey(e, t, r) {
				let s = new So();
				s.algorithm = e, s.extractable = t, s.usages = r.filter(u => this.privateKeyUsages.indexOf(u) !== -1);
				let o = new ko();
				o.algorithm = e, o.extractable = !0, o.usages = r.filter(u => this.publicKeyUsages.indexOf(u) !== -1);
				let a = e.namedCurve.toLowerCase(),
					i = S.default.generateKeyPairSync(a, {
						publicKeyEncoding: { format: 'der', type: 'spki' },
						privateKeyEncoding: { format: 'der', type: 'pkcs8' },
					});
				return s.data = i.privateKey, o.data = i.publicKey, { privateKey: s, publicKey: o };
			}
			static async sign(e, t, r) {
				t.pem || (t.pem = `-----BEGIN PRIVATE KEY-----
${t.data.toString('base64')}
-----END PRIVATE KEY-----`);
				let s = { key: t.pem }, o = S.default.sign(null, Buffer.from(r), s);
				return h.BufferSourceConverter.toArrayBuffer(o);
			}
			static async verify(e, t, r, s) {
				t.pem || (t.pem = `-----BEGIN PUBLIC KEY-----
${t.data.toString('base64')}
-----END PUBLIC KEY-----`);
				let o = { key: t.pem };
				return S.default.verify(null, Buffer.from(s), o, Buffer.from(r));
			}
			static async deriveBits(e, t, r) {
				let s = S.default.createPublicKey({ key: e.public.data, format: 'der', type: 'spki' }),
					o = S.default.createPrivateKey({ key: t.data, format: 'der', type: 'pkcs8' }),
					a = S.default.diffieHellman({ publicKey: s, privateKey: o });
				return new Uint8Array(a).buffer.slice(0, r >> 3);
			}
			static async exportKey(e, t) {
				switch (e.toLowerCase()) {
					case 'jwk':
						return V.JsonSerializer.toJSON(t);
					case 'pkcs8':
					case 'spki':
						return new Uint8Array(t.data).buffer;
					case 'raw':
						return B.AsnParser.parse(t.data, h.asn1.PublicKeyInfo).publicKey;
					default:
						throw new h.OperationError("format: Must be 'jwk', 'raw', pkcs8' or 'spki'");
				}
			}
			static async importKey(e, t, r, s, o) {
				switch (e.toLowerCase()) {
					case 'jwk': {
						let a = t;
						if (a.d) {
							let i = V.JsonParser.fromJSON(t, { targetSchema: h.asn1.CurvePrivateKey });
							return this.importPrivateKey(i, r, s, o);
						} else {
							if (!a.x) throw new TypeError("keyData: Cannot get required 'x' filed");
							return this.importPublicKey(yt.Convert.FromBase64Url(a.x), r, s, o);
						}
					}
					case 'raw':
						return this.importPublicKey(t, r, s, o);
					case 'spki': {
						let a = B.AsnParser.parse(new Uint8Array(t), h.asn1.PublicKeyInfo);
						return this.importPublicKey(a.publicKey, r, s, o);
					}
					case 'pkcs8': {
						let a = B.AsnParser.parse(new Uint8Array(t), h.asn1.PrivateKeyInfo),
							i = B.AsnParser.parse(a.privateKey, h.asn1.CurvePrivateKey);
						return this.importPrivateKey(i, r, s, o);
					}
					default:
						throw new h.OperationError("format: Must be 'jwk', 'raw', 'pkcs8' or 'spki'");
				}
			}
			static importPrivateKey(e, t, r, s) {
				let o = new So();
				return o.fromJSON({ crv: t.namedCurve, d: yt.Convert.ToBase64Url(e.d) }),
					o.algorithm = Object.assign({}, t),
					o.extractable = r,
					o.usages = s,
					o;
			}
			static async importPublicKey(e, t, r, s) {
				let o = new ko();
				return o.fromJSON({ crv: t.namedCurve, x: yt.Convert.ToBase64Url(e) }),
					o.algorithm = Object.assign({}, t),
					o.extractable = r,
					o.usages = s,
					o;
			}
		};
	$e.publicKeyUsages = ['verify'];
	$e.privateKeyUsages = ['sign', 'deriveKey', 'deriveBits'];
	var Ei = class extends h.EdDsaProvider {
			async onGenerateKey(e, t, r) {
				let s = await $e.generateKey({ name: this.name, namedCurve: e.namedCurve.replace(/^ed/i, 'Ed') }, t, r);
				return { privateKey: E(s.privateKey), publicKey: E(s.publicKey) };
			}
			async onSign(e, t, r) {
				return $e.sign(e, v(t), new Uint8Array(r));
			}
			async onVerify(e, t, r, s) {
				return $e.verify(e, v(t), new Uint8Array(r), new Uint8Array(s));
			}
			async onExportKey(e, t) {
				return $e.exportKey(e, v(t));
			}
			async onImportKey(e, t, r, s, o) {
				let a = await $e.importKey(e, t, { ...r, name: this.name }, s, o);
				return E(a);
			}
		},
		Pi = class extends h.EcdhEsProvider {
			async onGenerateKey(e, t, r) {
				let s = await $e.generateKey({ name: this.name, namedCurve: e.namedCurve.toUpperCase() }, t, r);
				return { privateKey: E(s.privateKey), publicKey: E(s.publicKey) };
			}
			async onDeriveBits(e, t, r) {
				return await $e.deriveBits({ ...e, public: v(e.public) }, v(t), r);
			}
			async onExportKey(e, t) {
				return $e.exportKey(e, v(t));
			}
			async onImportKey(e, t, r, s, o) {
				let a = await $e.importKey(e, t, { ...r, name: this.name }, s, o);
				return E(a);
			}
		},
		Bo = class extends nt {},
		Ti = class extends h.Pbkdf2Provider {
			async onDeriveBits(e, t, r) {
				return new Promise((s, o) => {
					let a = h.BufferSourceConverter.toArrayBuffer(e.salt), i = e.hash.name.replace('-', '');
					S.default.pbkdf2(v(t).data, Buffer.from(a), e.iterations, r >> 3, i, (c, u) => {
						c ? o(c) : s(new Uint8Array(u).buffer);
					});
				});
			}
			async onImportKey(e, t, r, s, o) {
				if (e === 'raw') {
					let a = new Bo();
					return a.data = Buffer.from(t), a.algorithm = { name: this.name }, a.extractable = !1, a.usages = o, E(a);
				}
				throw new h.OperationError("format: Must be 'raw'");
			}
			checkCryptoKey(e, t) {
				if (super.checkCryptoKey(e, t), !(v(e) instanceof Bo)) throw new TypeError('key: Is not PBKDF CryptoKey');
			}
		},
		ar = class extends nt {
			get alg() {
				return `HS${this.algorithm.hash.name.toUpperCase().replace('SHA-', '')}`;
			}
			set alg(e) {}
		};
	cr.__decorate([V.JsonProp({ name: 'k', converter: ji })], ar.prototype, 'data', void 0);
	var Ni = class extends h.HmacProvider {
			async onGenerateKey(e, t, r) {
				let s = (e.length || this.getDefaultLength(e.hash.name)) >> 3 << 3, o = new ar();
				return o.algorithm = { ...e, length: s, name: this.name },
					o.extractable = t,
					o.usages = r,
					o.data = S.default.randomBytes(s >> 3),
					E(o);
			}
			async onSign(e, t, r) {
				let s = we.getAlgorithmName(t.algorithm.hash),
					o = S.default.createHmac(s, v(t).data).update(Buffer.from(r)).digest();
				return new Uint8Array(o).buffer;
			}
			async onVerify(e, t, r, s) {
				let o = we.getAlgorithmName(t.algorithm.hash);
				return S.default.createHmac(o, v(t).data).update(Buffer.from(s)).digest().compare(Buffer.from(r)) === 0;
			}
			async onImportKey(e, t, r, s, o) {
				let a;
				switch (e.toLowerCase()) {
					case 'jwk':
						a = V.JsonParser.fromJSON(t, { targetSchema: ar });
						break;
					case 'raw':
						a = new ar(), a.data = Buffer.from(t);
						break;
					default:
						throw new h.OperationError("format: Must be 'jwk' or 'raw'");
				}
				return a.algorithm = { hash: { name: r.hash.name }, name: this.name, length: a.data.length << 3 },
					a.extractable = s,
					a.usages = o,
					E(a);
			}
			async onExportKey(e, t) {
				switch (e.toLowerCase()) {
					case 'jwk':
						return V.JsonSerializer.toJSON(v(t));
					case 'raw':
						return new Uint8Array(v(t).data).buffer;
					default:
						throw new h.OperationError("format: Must be 'jwk' or 'raw'");
				}
			}
			checkCryptoKey(e, t) {
				if (super.checkCryptoKey(e, t), !(v(e) instanceof ar)) throw new TypeError('key: Is not HMAC CryptoKey');
			}
		},
		_o = class extends nt {},
		Ii = class extends h.HkdfProvider {
			async onImportKey(e, t, r, s, o) {
				if (e.toLowerCase() !== 'raw') throw new h.OperationError('Operation not supported');
				let a = new _o();
				return a.data = Buffer.from(t), a.algorithm = { name: this.name }, a.extractable = s, a.usages = o, E(a);
			}
			async onDeriveBits(e, t, r) {
				let s = e.hash.name.replace('-', ''),
					o = S.default.createHash(s).digest().length,
					a = r / 8,
					i = ss.BufferSourceConverter.toUint8Array(e.info),
					c = S.default.createHmac(s, ss.BufferSourceConverter.toUint8Array(e.salt)).update(
						ss.BufferSourceConverter.toUint8Array(v(t).data),
					).digest(),
					u = [Buffer.alloc(0)],
					l = Math.ceil(a / o) + 1;
				for (let f = 1; f < l; ++f) {
					u.push(S.default.createHmac(s, c).update(Buffer.concat([u[f - 1], i, Buffer.from([f])])).digest());
				}
				return Buffer.concat(u).slice(0, a);
			}
			checkCryptoKey(e, t) {
				if (super.checkCryptoKey(e, t), !(v(e) instanceof _o)) throw new TypeError('key: Is not HKDF CryptoKey');
			}
		},
		Co = class {
			static digest(e, t) {
				let r = S.default.createHash(e.name.toLowerCase(), { outputLength: e.length }).update(Buffer.from(t)).digest();
				return new Uint8Array(r).buffer;
			}
		},
		Ki = class extends h.Shake128Provider {
			async onDigest(e, t) {
				return Co.digest(e, t);
			}
		},
		Oi = class extends h.Shake256Provider {
			async onDigest(e, t) {
				return Co.digest(e, t);
			}
		},
		Ui = class extends h.SubtleCrypto {
			constructor() {
				var e;
				super(),
					this.providers.set(new ai()),
					this.providers.set(new ui()),
					this.providers.set(new li()),
					this.providers.set(new ci()),
					this.providers.set(new fi()),
					this.providers.set(new hi()),
					this.providers.set(new pi()),
					this.providers.set(new di()),
					this.providers.set(new mi()),
					this.providers.set(new yi()),
					this.providers.set(new gi()),
					this.providers.set(new vi()),
					this.providers.set(new _i()),
					this.providers.set(new Ci()),
					this.providers.set(new wi()),
					this.providers.set(new bi()),
					this.providers.set(new Ai()),
					this.providers.set(new xi()),
					this.providers.set(new Ti()),
					this.providers.set(new Ni()),
					this.providers.set(new Ii());
				let t = (e = /^v(\d+)/.exec(Jd.version)) === null || e === void 0 ? void 0 : e[1];
				t && parseInt(t, 10) >= 12 && (this.providers.set(new Ki()), this.providers.set(new Oi()));
				let r = os.getHashes();
				r.includes('sha3-256') && this.providers.set(new Si()),
					r.includes('sha3-384') && this.providers.set(new ki()),
					r.includes('sha3-512') && this.providers.set(new Bi()),
					t && parseInt(t, 10) >= 14 && (this.providers.set(new Ei()), this.providers.set(new Pi()));
			}
		},
		$i = class extends h.Crypto {
			constructor() {
				super(...arguments), this.subtle = new Ui();
			}
			getRandomValues(e) {
				if (!ArrayBuffer.isView(e)) {
					throw new TypeError(
						"Failed to execute 'getRandomValues' on 'Crypto': parameter 1 is not of type 'ArrayBufferView'",
					);
				}
				let t = Buffer.from(e.buffer, e.byteOffset, e.byteLength);
				return S.default.randomFillSync(t), e;
			}
		};
	Object.defineProperty(Eo, 'CryptoKey', {
		enumerable: !0,
		get: function() {
			return ss.CryptoKey;
		},
	});
	Eo.Crypto = $i;
});
var pm = {};
Sf(pm, { default: () => hm });
module.exports = kf(pm);
var cc = Gr(ls(), 1);
var G = {
		alt: 'fantasy-land/alt',
		ap: 'fantasy-land/ap',
		bimap: 'fantasy-land/bimap',
		chain: 'fantasy-land/chain',
		chainRec: 'fantasy-land/chainRec',
		map: 'fantasy-land/map',
		of: 'fantasy-land/of',
		zero: 'fantasy-land/zero',
	},
	It = ['first', 'second', 'third', 'fourth', 'fifth'],
	Kt = 'fluture',
	Io = 'Future',
	fr = 5,
	hr = Kt + '/' + Io + '@' + fr;
function Ko(n, e) {
	this.head = n, this.tail = e;
}
Ko.prototype.toJSON = function() {
	return Oo(this);
};
var J = new Ko(null, null);
J.tail = J;
function Zr(n) {
	return n.tail === n;
}
function vt(n, e) {
	return new Ko(n, e);
}
function fs(n) {
	for (var e = J, t = n; !Zr(t);) e = vt(t.head, e), t = t.tail;
	return e;
}
function Di(n, e) {
	for (var t = e, r = fs(n); !Zr(r);) t = vt(r.head, t), r = r.tail;
	return t;
}
function Oo(n) {
	for (var e = n, t = []; !Zr(e);) t.push(e.head), e = e.tail;
	return t;
}
var Wr = Error.captureStackTrace || Ef, Bf = _f;
function _f(n) {
	return n;
}
function Fi(n, e, t, r, s) {
	return Bf(n, e, t, r, s);
}
function st(n, e, t) {
	return Fi(n, zi, n, e, t);
}
function zi(n, e, t) {
	var r = { tag: e, name: ' from ' + e + ':' };
	return Wr(r, t), vt(r, n);
}
function Ji(n, e, t) {
	return Fi(n, Cf, n, e, t);
}
function Cf(n, e, t) {
	return zi(n, It[e - 1] + ' application of ' + t.name, t);
}
function Ef(n) {
	var e = new Error();
	typeof e.stack == 'string'
		? n.stack = n.name + `
` + e.stack.split(`
`).slice(1).join(`
`)
		: n.stack = n.name;
}
var X = Gr(qi(), 1), Uo = typeof Uo > 'u' ? Pf : Uo;
function k() {}
function Gi() {
	return this;
}
function de(n, e) {
	return n(e);
}
function Pf(n, e) {
	return setTimeout(n, 0, e);
}
function Yr(n) {
	Uo(function() {
		throw n;
	});
}
var Qr = Gr(ls(), 1);
function Zi(n) {
	return (0, X.default)(n) + ' :: ' + Qr.default.parse((0, Qr.default)(n)).name;
}
function $o(n) {
	return new Error(n);
}
function We(n) {
	return new TypeError(n);
}
function en(n, e, t, r) {
	return We(
		n + '() expects its ' + It[e] + ' argument to ' + t + `.
  Actual: ` + Zi(r),
	);
}
function le(n) {
	return function(e, t, r) {
		return en(e, t, n, r);
	};
}
function Wi(n, e) {
	return new TypeError(
		n.name + `() expects to be called with a single argument per invocation
  Saw: ` + e.length + ' arguments' + Array.prototype.slice.call(e).map(function(t, r) {
			return `
  ` + (It[r] ? It[r].charAt(0).toUpperCase() + It[r].slice(1) : 'Argument ' + String(r + 1)) + ': ' + Zi(t);
		}).join(''),
	);
}
function Tf(n, e) {
	return 'The Future was not created by ' + Kt + '. Make sure you transform other Futures to ' + Kt + ' Futures. Got '
		+ (e ? 'a Future from ' + e : 'an unscoped Future') + `.
  See: https://github.com/fluture-js/Fluture#casting-futures`;
}
function Nf(n, e) {
	return 'The Future was created by ' + (e < fr ? 'an older' : 'a newer') + ' version of ' + Kt
		+ `. This means that one of the sources which creates Futures is outdated. Update this source, or transform its created Futures to be compatible.
  See: https://github.com/fluture-js/Fluture#casting-futures`;
}
function Ot(n, e, t) {
	var r = Qr.default.parse((0, Qr.default)(e)),
		s = r.name === Io
			? `
` + (r.namespace !== Kt
				? Tf(e, r.namespace)
				: r.version !== fr
				? Nf(e, r.version)
				: 'Nothing seems wrong. Contact the Fluture maintainers.')
			: '';
	return We(
		n + ' to be a valid Future.' + s + `
  Actual: ` + (0, X.default)(e) + ' :: ' + r.name + (t || ''),
	);
}
function Ro(n, e, t, r) {
	return Ot(n + '() expects its ' + It[e] + ' argument', t, r);
}
function If(n, e) {
	var t;
	try {
		if (n instanceof Error) return n;
		t = 'A Non-Error was thrown from a Future: ' + (0, X.default)(n);
	} catch {
		t = 'Something was thrown from a Future, but it could not be converted to String';
	}
	var r = $o(t);
	return Wr(r, e), r;
}
function Xr(n, e, t) {
	Object.defineProperty(n, e, { value: t, writable: !0, configurable: !0 });
}
function ge(n, e) {
	var t = If(n, ge), r = Di(t.context || J, e.context), s = $o(t.message);
	return Xr(s, 'future', t.future || e), Xr(s, 'reason', t.reason || t), Xr(s, 'stack', s.reason.stack), jo(s, r);
}
function jo(n, e) {
	return Xr(n, 'context', e), Xr(n, 'stack', n.stack + Kf(e)), n;
}
function Kf(n) {
	for (var e = '', t = n; t !== J;) {
		e = e + `
` + t.head.stack, t = t.tail;
	}
	return e;
}
function ot(n) {
	return typeof n == 'function';
}
function Yi(n) {
	return n instanceof Promise || n != null && ot(n.then);
}
function Xi(n) {
	return typeof n == 'boolean';
}
function Of(n) {
	return typeof n == 'number';
}
function Qi(n) {
	return n === 1 / 0 || Of(n) && n > 0 && n % 1 === 0;
}
function Vo(n) {
	return n !== null && typeof n == 'object';
}
function ec(n) {
	return Vo(n) && ot(n.next);
}
function tc(n) {
	return Array.isArray(n);
}
function tn(n, e) {
	return e != null && ot(e[n]);
}
function rn(n) {
	return tn(G.map, n);
}
function rc(n) {
	return rn(n) && tn(G.alt, n);
}
function Ho(n) {
	return rn(n) && tn(G.ap, n);
}
function nc(n) {
	return rn(n) && tn(G.bimap, n);
}
function sc(n) {
	return Ho(n) && tn(G.chain, n);
}
function Mo(n) {
	return { done: !1, value: n };
}
function oc(n) {
	return { done: !0, value: n };
}
function ac(n) {
	return Vo(n) && Xi(n.done);
}
function Uf() {
	return !0;
}
function ds(n) {
	for (var e = new Array(n.arity), t = 1; t <= n.arity; t++) e[t - 1] = n['$' + String(t)];
	return e;
}
function uc(n) {
	return ' (' + (0, X.default)(n) + ')';
}
var qt = { pred: Uf, error: le('be anything') }, fe = { pred: ot, error: le('be a Function') };
var Do = { pred: Qi, error: le('be a positive Integer') };
function Z(n, e, t, r, s) {
	if (r.length < 2 && t.pred(r[0])) return Ji(s, n, e);
	var o = r.length > 1 ? Wi(e, r) : t.error(e.name, n - 1, r[0]);
	throw Wr(o, e), jo(o, s);
}
function O(n, e, t) {
	return Z(1, n, e, t, J);
}
function F(n) {
	var e = O(F, fe, arguments);
	return new $f(e, n);
}
function me(n) {
	return n instanceof F || (0, cc.default)(n) === hr;
}
F['@@type'] = hr;
F.constructor = { prototype: F };
F[G.of] = Te;
F[G.chainRec] = Rf;
F.prototype['@@type'] = hr;
F.prototype['@@show'] = function() {
	return this.toString();
};
F.prototype.pipe = function(e) {
	if (!ot(e)) throw en('Future#pipe', 0, 'be a Function', e);
	return e(this);
};
F.prototype[G.ap] = function n(e) {
	var t = st(J, 'a Fantasy Land dispatch to ap', n);
	return e._transform(new fc(t, this));
};
F.prototype[G.map] = function n(e) {
	var t = st(J, 'a Fantasy Land dispatch to map', n);
	return this._transform(new Ut(t, e));
};
F.prototype[G.bimap] = function n(e, t) {
	var r = st(J, 'a Fantasy Land dispatch to bimap', n);
	return this._transform(new pc(r, e, t));
};
F.prototype[G.chain] = function n(e) {
	var t = st(J, 'a Fantasy Land dispatch to chain', n);
	return this._transform(new ps(t, e));
};
F.prototype[G.alt] = function n(e) {
	var t = st(J, 'a Fantasy Land dispatch to alt', n);
	return this._transform(new hc(t, e));
};
F.prototype.extractLeft = function() {
	return [];
};
F.prototype.extractRight = function() {
	return [];
};
F.prototype._transform = function(e) {
	return new nn(e.context, this, vt(e, J));
};
F.prototype.isTransformer = !1;
F.prototype.context = J;
F.prototype.arity = 0;
F.prototype.name = 'future';
F.prototype.toString = function() {
	return this.name + ds(this).map(uc).join('');
};
F.prototype.toJSON = function() {
	return { $: hr, kind: 'interpreter', type: this.name, args: ds(this) };
};
function re(n, e, t) {
	var r = function(s, o, a, i) {
		this.context = s, this.$1 = o, this.$2 = a, this.$3 = i;
	};
	return r.prototype = Object.create(F.prototype),
		r.prototype.arity = n,
		r.prototype.name = e,
		r.prototype._interpret = t,
		r;
}
var $f = re(1, 'Future', function(e, t, r) {
		var s = this.$1,
			o = !1,
			a = k,
			i = function() {
				o = !0;
			};
		try {
			a = s(function(u) {
				i = function() {
					o = !1, t(u);
				}, o && i();
			}, function(u) {
				i = function() {
					o = !1, r(u);
				}, o && i();
			});
		} catch (c) {
			return e(ge(c, this)), k;
		}
		return ot(a) && a.length === 0
			? (i(), function() {
				o && (o = !1, a && a());
			})
			: (e(ge(
				We(
					`The computation was expected to return a nullary cancellation function
  Actual: ` + (0, X.default)(a),
				),
				this,
			)),
				k);
	}),
	lc = re(0, 'never', function() {
		return k;
	});
lc.prototype._isNever = !0;
var pr = new lc(J);
var Lo = re(1, 'crash', function(e) {
	return e(this.$1), k;
});
function Fo(n) {
	return new Lo(O(Fo, qt, arguments), n);
}
var at = re(1, 'reject', function(e, t) {
	return t(this.$1), k;
});
at.prototype.extractLeft = function() {
	return [this.$1];
};
function Gt(n) {
	return new at(O(Gt, qt, arguments), n);
}
var ke = re(1, 'resolve', function(e, t, r) {
	return r(this.$1), k;
});
ke.prototype.extractRight = function() {
	return [this.$1];
};
function Te(n) {
	return new ke(O(Te, qt, arguments), n);
}
function Rf(n, e) {
	return Te(Mo(e))._transform(
		new ps(J, function t(r) {
			return r.done ? Te(r.value) : n(Mo, oc, r.value)._transform(new ps(J, t));
		}),
	);
}
var nn = re(2, 'transform', function(e, t, r) {
	var s = J, o = J, a, i, c = k, u, l = !0, f;
	function d() {
		var be = o.head;
		return o = o.tail, be;
	}
	function y() {
		var be = s.head;
		return s = s.tail, be;
	}
	function x(be) {
		if (u = !0, a = be, a.isTransformer) {
			for (var Ze = a.$2; !Zr(Ze);) s = vt(Ze.head, s), Ze = Ze.tail;
			a = a.$1;
		}
		l && No();
	}
	function N(be) {
		x(i.rejected(be));
	}
	function H(be) {
		x(i.resolved(be));
	}
	function L(be, Ze) {
		if (c(), s = J, l && i !== Ze) for (i.cancel(); (f = d()) && f !== Ze;) f.cancel();
		x(be);
	}
	function gt() {
		for (c(), i && i.cancel(); f = d();) f.cancel();
	}
	function Pe(be) {
		gt(), u = !0, s = o = J;
		var Ze = ge(be, a);
		a = pr, e(Ze);
	}
	function To() {
		for (s = fs(s); s !== J;) {
			if (f = s.head.run(L), u) return;
			o = vt(f, o), s = s.tail;
		}
		i = i.run(L);
	}
	function No() {
		for (l = !1;;) {
			if (u = !1, i = y()) c = a._interpret(Pe, N, H), u || To();
			else if (i = d()) c = a._interpret(Pe, N, H);
			else break;
			if (!u) {
				l = !0;
				return;
			}
		}
		c = a._interpret(Pe, t, r);
	}
	return x(this), gt;
});
nn.prototype.isTransformer = !0;
nn.prototype._transform = function(e) {
	return new nn(e.context, this.$1, vt(e, this.$2));
};
nn.prototype.toString = function() {
	return Oo(fs(this.$2)).reduce(function(e, t) {
		return t.name + ds(t).map(uc).join('') + ' (' + e + ')';
	}, this.$1.toString());
};
function jf(n) {
	return this.cancel(), new at(this.context, n);
}
function Vf(n) {
	return this.cancel(), new ke(this.context, n);
}
function Hf() {
	return { $: hr, kind: 'transformation', type: this.name, args: ds(this) };
}
var Mf = { rejected: jf, resolved: Vf, run: Gi, cancel: k, context: J, arity: 0, name: 'transform', toJSON: Hf };
function ic(n) {
	return function(t) {
		var r;
		try {
			r = n.call(this, t);
		} catch (s) {
			return new Lo(this.context, s);
		}
		return me(r)
			? r
			: new Lo(
				this.context,
				Ot(
					this.name + " expects the return value from the function it's given",
					r,
					`
  When called with: ` + (0, X.default)(t),
				),
			);
	};
}
function ne(n, e, t) {
	var r = function(s, o, a) {
		this.context = s, this.$1 = o, this.$2 = a;
	};
	return r.prototype = Object.create(Mf),
		r.prototype.arity = n,
		r.prototype.name = e,
		typeof t.rejected == 'function' && (r.prototype.rejected = ic(t.rejected)),
		typeof t.resolved == 'function' && (r.prototype.resolved = ic(t.resolved)),
		typeof t.run == 'function' && (r.prototype.run = t.run),
		r;
}
var fc = ne(1, 'ap', {
		resolved: function(e) {
			if (ot(e)) return this.$1._transform(new Ut(this.context, e));
			throw We(
				`ap expects the second Future to resolve to a Function
  Actual: ` + (0, X.default)(e),
			);
		},
	}),
	hc = ne(1, 'alt', {
		rejected: function() {
			return this.$1;
		},
	}),
	Ut = ne(1, 'map', {
		resolved: function(e) {
			return new ke(this.context, de(this.$1, e));
		},
	}),
	pc = ne(2, 'bimap', {
		rejected: function(e) {
			return new at(this.context, de(this.$1, e));
		},
		resolved: function(e) {
			return new ke(this.context, de(this.$2, e));
		},
	}),
	ps = ne(1, 'chain', {
		resolved: function(e) {
			return de(this.$1, e);
		},
	});
var Lf = re(2, 'after', function(e, t, r) {
	var s = setTimeout(r, this.$1, this.$2);
	return function() {
		clearTimeout(s);
	};
});
Lf.prototype.extractRight = function() {
	return [this.$2];
};
var Jm = { pred: rc, error: le('have Alt implemented') };
var zo = ne(1, 'and', {
	resolved: function() {
		return this.$1;
	},
});
var ey = { pred: Ho, error: le('have Apply implemented') };
function Df(n, e, t) {
	return We(
		`encaseP() expects the function it's given to return a Promise/Thenable
  Actual: ` + (0, X.default)(n) + `
  From calling: ` + (0, X.default)(e) + `
  With: ` + (0, X.default)(t),
	);
}
var ay = re(2, 'encaseP', function(e, t, r) {
	var s = !0, o = this.$1, a = this.$2, i;
	try {
		i = o(a);
	} catch (c) {
		return e(ge(c, this)), k;
	}
	return Yi(i)
		? (i.then(function(u) {
			s && (s = !1, r(u));
		}, function(u) {
			s && (s = !1, t(u));
		}),
			function() {
				s = !1;
			})
		: (e(ge(Df(i, o, a), this)), k);
});
var hy = re(2, 'encase', function(e, t, r) {
	var s = this.$1, o;
	try {
		o = s(this.$2);
	} catch (a) {
		return t(a), k;
	}
	return r(o), k;
});
var by = { pred: nc, error: le('have Bifunctor implemented') };
var ky = ne(2, 'bichain', {
	rejected: function(e) {
		return de(this.$1, e);
	},
	resolved: function(e) {
		return de(this.$2, e);
	},
});
function Jo(n) {
	var e = this;
	e.rec = k,
		e.rej = k,
		e.res = k,
		e.crashed = !1,
		e.rejected = !1,
		e.resolved = !1,
		e.value = null,
		e.cancel = n._interpret(function(r) {
			e.value = r, e.crashed = !0, e.cancel = k, e.rec(r);
		}, function(r) {
			e.value = r, e.rejected = !0, e.cancel = k, e.rej(r);
		}, function(r) {
			e.value = r, e.resolved = !0, e.cancel = k, e.res(r);
		});
}
Jo.prototype = Object.create(F.prototype);
Jo.prototype._interpret = function(e, t, r) {
	return this.crashed
		? e(this.value)
		: this.rejected
		? t(this.value)
		: this.resolved
		? r(this.value)
		: (this.rec = e, this.rej = t, this.res = r),
		this.cancel;
};
function dr(n, e) {
	n(Fo(e));
}
function mr(n, e) {
	n(Gt(e));
}
function dc(n, e) {
	n(Te(e));
}
function yr(n, e, t, r, s) {
	var o = ne(
		1,
		n,
		Object.assign({
			run: function(i) {
				var c = new Jo(this.$1), u = new o(this.context, c);
				function l(f) {
					i(f, u);
				}
				return u.cancel = c._interpret(function(d) {
					e(l, d);
				}, function(d) {
					t(l, d);
				}, function(d) {
					r(l, d);
				}),
					u;
			},
		}, s),
	);
	return o;
}
var Jf = ne(1, 'pair', {
		resolved: function(e) {
			return new ke(this.context, [e, this.$1]);
		},
	}),
	Iy = yr('both', dr, mr, k, {
		resolved: function(e) {
			return this.$1._transform(new Jf(this.context, e));
		},
	});
var ms = 0, wt = 1, qo = 2, ys = 3, gs = 4;
function qf(n, e, t) {
	this[qo] = n, this[ys] = e, this[gs] = t;
}
var Be = re(1, 'cache', function(e, t, r) {
	var s = k;
	switch (this._state) {
		case wt:
			s = this._addToQueue(e, t, r);
			break;
		case qo:
			e(this._value);
			break;
		case ys:
			t(this._value);
			break;
		case gs:
			r(this._value);
			break;
		default:
			this._queue = [], s = this._addToQueue(e, t, r), this.run();
	}
	return s;
});
Be.prototype._cancel = k;
Be.prototype._queue = null;
Be.prototype._queued = 0;
Be.prototype._value = void 0;
Be.prototype._state = ms;
Be.prototype.extractLeft = function() {
	return this._state === ys ? [this._value] : [];
};
Be.prototype.extractRight = function() {
	return this._state === gs ? [this._value] : [];
};
Be.prototype._addToQueue = function(e, t, r) {
	var s = this;
	if (s._state > wt) return k;
	var o = s._queue.push(new qf(e, t, r)) - 1;
	return s._queued = s._queued + 1, function() {
		s._state > wt || (s._queue[o] = void 0, s._queued = s._queued - 1, s._queued === 0 && s.reset());
	};
};
Be.prototype._drainQueue = function() {
	if (!(this._state <= wt) && this._queued !== 0) {
		for (var e = this._queue, t = e.length, r = this._state, s = this._value, o = 0; o < t; o++) {
			e[o] && e[o][r](s), e[o] = void 0;
		}
		this._queue = void 0, this._queued = 0;
	}
};
Be.prototype.crash = function(e) {
	this._state > wt || (this._value = e, this._state = qo, this._drainQueue());
};
Be.prototype.reject = function(e) {
	this._state > wt || (this._value = e, this._state = ys, this._drainQueue());
};
Be.prototype.resolve = function(e) {
	this._state > wt || (this._value = e, this._state = gs, this._drainQueue());
};
Be.prototype.run = function() {
	var e = this;
	e._state > ms || (e._state = wt,
		e._cancel = e.$1._interpret(function(r) {
			e.crash(r);
		}, function(r) {
			e.reject(r);
		}, function(r) {
			e.resolve(r);
		}));
};
Be.prototype.reset = function() {
	this._state !== ms
		&& (this._state === wt && this._cancel(),
			this._cancel = k,
			this._queue = [],
			this._queued = 0,
			this._value = void 0,
			this._state = ms);
};
var Vy = ne(1, 'chainRej', {
	rejected: function(e) {
		return de(this.$1, e);
	},
});
var zy = { pred: sc, error: le('have Chain implemented') };
var rg = ne(2, 'coalesce', {
	rejected: function(e) {
		return new ke(this.context, de(this.$1, e));
	},
	resolved: function(e) {
		return new ke(this.context, de(this.$2, e));
	},
});
var vs = 0, mc = 1, Go = 2;
function Gf(n) {
	return We(
		`The iterator did not return a valid iteration from iterator.next()
  Actual: ` + (0, X.default)(n),
	);
}
function Zf(n) {
	return Ot(
		'go() expects the value produced by the iterator',
		n,
		`
  Tip: If you're using a generator, make sure you always yield a Future`,
	);
}
var yg = re(1, 'go', function(e, t, r) {
	var s = this, o = vs, a = k, i, c, u;
	function l(y) {
		e(ge(y, s));
	}
	try {
		u = s.$1();
	} catch (y) {
		return l(y), k;
	}
	if (!ec(u)) return l(en('go', 0, 'return an iterator, maybe you forgot the "*"', u)), k;
	function f(y) {
		if (c = y, o === Go) return d();
		o = mc;
	}
	function d() {
		for (;;) {
			try {
				i = u.next(c);
			} catch (y) {
				return l(y);
			}
			if (!ac(i)) return l(Gf(i));
			if (i.done) break;
			if (!me(i.value)) return l(Zf(i.value));
			if (o = vs, a = i.value._interpret(l, t, f), o === vs) return o = Go;
		}
		r(i.value);
	}
	return d(), function() {
		a();
	};
});
function Wf(n, e, t) {
	return Ot(
		"hook() expects the return value from the first function it's given",
		n,
		`
  From calling: ` + (0, X.default)(e) + `
  With: ` + (0, X.default)(t),
	);
}
function Yf(n, e, t) {
	return Ot(
		"hook() expects the return value from the second function it's given",
		n,
		`
  From calling: ` + (0, X.default)(e) + `
  With: ` + (0, X.default)(t),
	);
}
var Ag = re(3, 'hook', function(e, t, r) {
	var s = this, o = this.$1, a = this.$2, i = this.$3, c, u = k, l, f, d = k;
	function y() {
		d(f);
	}
	function x(pe) {
		e(ge(pe, s));
	}
	function N() {
		var pe;
		try {
			pe = a(l);
		} catch (lr) {
			return x(lr);
		}
		if (!me(pe)) return x(Wf(pe, a, l));
		c = L, pe._interpret(x, gt, y);
	}
	function H() {
		u(), N(), L();
	}
	function L() {
		d = k;
	}
	function gt(pe) {
		x(new Error('The disposal Future rejected with ' + (0, X.default)(pe)));
	}
	function Pe(pe) {
		d = x, f = pe, N();
	}
	function To(pe) {
		d = t, f = pe, N();
	}
	function No(pe) {
		d = r, f = pe, N();
	}
	function be(pe) {
		l = pe;
		var lr;
		try {
			lr = i(l);
		} catch (gf) {
			return Pe(gf);
		}
		if (!me(lr)) return Pe(Yf(lr, i, l));
		c = H, u = lr._interpret(Pe, To, No);
	}
	var Ze = o._interpret(x, t, be);
	return c = c || Ze, function() {
		e = Yr, c();
	};
});
var Bg = ne(1, 'lastly', {
	rejected: function(e) {
		return this.$1._transform(new zo(this.context, new at(this.context, e)));
	},
	resolved: function(e) {
		return this.$1._transform(new zo(this.context, new ke(this.context, e)));
	},
});
var Pg = ne(1, 'mapRej', {
	rejected: function(e) {
		return new at(this.context, de(this.$1, e));
	},
});
var Xf = { pred: rn, error: le('have Functor implemented') };
function sn(n) {
	var e = O(sn, fe, arguments);
	return function t(r) {
		var s = Z(2, t, Xf, arguments, e);
		return me(r) ? r._transform(new Ut(s, n)) : r[G.map](n);
	};
}
var Vg = re(1, 'node', function(e, t, r) {
	function s(i, c) {
		a = i
			? function() {
				o = !1, t(i);
			}
			: function() {
				o = !1, r(c);
			}, o && a();
	}
	var o = !1,
		a = function() {
			o = !0;
		};
	try {
		de(this.$1, s);
	} catch (i) {
		return e(ge(i, this)), o = !1, k;
	}
	return a(), function() {
		o = !1;
	};
});
var yc = yr('pap', dr, mr, k, {
	resolved: function(e) {
		if (ot(e)) return this.$1._transform(new Ut(this.context, e));
		throw We(
			`pap expects the second Future to resolve to a Function
  Actual: ` + (0, X.default)(e),
		);
	},
});
function Qf(n) {
	if (!tc(n)) return !1;
	for (var e = 0; e < n.length; e++) if (!me(n[e])) return !1;
	return !0;
}
var Xg = { pred: Qf, error: le('be an Array of valid Futures') },
	Qg = re(2, 'parallel', function(e, t, r) {
		var s = this,
			o = this.$2,
			a = o.length,
			i = Math.min(this.$1, a),
			c = new Array(a),
			u = new Array(a),
			l = 0,
			f = 0,
			d = !1,
			y = k;
		function x() {
			e = k, t = k, r = k, l = a;
			for (var L = 0; L < a; L++) c[L] && c[L]();
		}
		function N(L) {
			f++,
				c[L] = o[L]._interpret(function(Pe) {
					y = e, c[L] = k, x(), y(ge(Pe, s));
				}, function(Pe) {
					y = t, c[L] = k, x(), y(Pe);
				}, function(Pe) {
					c[L] = k, u[L] = Pe, f--, l === a && f === 0 ? r(u) : d && H();
				});
		}
		function H() {
			for (d = !1; l < a && f < i;) N(l++);
			d = !0;
		}
		return H(), x;
	}),
	ev = Te([]);
var vc = Gr(ls(), 1);
var gc = yr('race', dr, mr, dc, {});
function $t(n) {
	this.sequential = n;
}
$t.prototype = Object.create(_e.prototype);
function _e(n) {
	if (!me(n)) throw Ro(_e.name, 0, n);
	return new $t(n);
}
var Zo = Kt + '/ConcurrentFuture@' + fr, eh = new $t(pr);
_e['@@type'] = Zo;
_e.constructor = { prototype: _e };
_e[G.of] = function(e) {
	return new $t(Te(e));
};
_e[G.zero] = function() {
	return eh;
};
_e.prototype['@@type'] = Zo;
_e.prototype['@@show'] = function() {
	return this.toString();
};
_e.prototype.toString = function() {
	return 'Par (' + this.sequential.toString() + ')';
};
_e.prototype[G.map] = function n(e) {
	var t = st(J, 'a Fantasy Land dispatch to map via ConcurrentFuture', n);
	return new $t(this.sequential._transform(new Ut(t, e)));
};
_e.prototype[G.ap] = function n(e) {
	var t = st(J, 'a Fantasy Land dispatch to ap via ConcurrentFuture', n);
	return new $t(e.sequential._transform(new yc(t, this.sequential)));
};
_e.prototype[G.alt] = function n(e) {
	var t = st(J, 'a Fantasy Land dispatch to alt via ConcurrentFuture', n);
	return new $t(e.sequential._transform(new gc(t, this.sequential)));
};
function wc(n) {
	return n instanceof $t || (0, vc.default)(n) === Zo;
}
var th = re(2, 'rejectAfter', function(e, t) {
	var r = setTimeout(t, this.$1, this.$2);
	return function() {
		clearTimeout(r);
	};
});
th.prototype.extractLeft = function() {
	return [this.$2];
};
var bv = { pred: wc, error: le('be a ConcurrentFuture') };
var Sv = ne(0, 'swap', {
	resolved: function(e) {
		return new at(this.context, e);
	},
	rejected: function(e) {
		return new ke(this.context, e);
	},
});
var bc = (n, e, t) => Gt(sh(n, e, t)).pipe(sn(r => r)),
	sh = (n, e, t) => xc({ kind: 'E_PARSE', msg: e, context: t, previous: n }),
	oh = (n, e, t) => xc({ kind: 'E_PARSE_UNKNOWN', msg: e, context: t, previous: n }),
	Ac = (n, e, t) => Gt(oh(n, e, t)).pipe(sn(r => r)),
	xc = n => n;
var Q;
(function(n) {
	function e(r) {
		throw new Error();
	}
	n.assertNever = e,
		n.arrayToEnum = r => {
			let s = {};
			for (let o of r) s[o] = o;
			return s;
		},
		n.getValidEnumValues = r => {
			let s = n.objectKeys(r).filter(a => typeof r[r[a]] != 'number'), o = {};
			for (let a of s) o[a] = r[a];
			return n.objectValues(o);
		},
		n.objectValues = r => n.objectKeys(r).map(function(s) {
			return r[s];
		}),
		n.objectKeys = typeof Object.keys == 'function' ? r => Object.keys(r) : r => {
			let s = [];
			for (let o in r) Object.prototype.hasOwnProperty.call(r, o) && s.push(o);
			return s;
		},
		n.find = (r, s) => {
			for (let o of r) if (s(o)) return o;
		},
		n.isInteger = typeof Number.isInteger == 'function'
			? r => Number.isInteger(r)
			: r => typeof r == 'number' && isFinite(r) && Math.floor(r) === r;
	function t(r, s = ' | ') {
		return r.map(o => typeof o == 'string' ? `'${o}'` : o).join(s);
	}
	n.joinValues = t;
})(Q || (Q = {}));
var A = Q.arrayToEnum([
		'string',
		'nan',
		'number',
		'integer',
		'float',
		'boolean',
		'date',
		'bigint',
		'symbol',
		'function',
		'undefined',
		'null',
		'array',
		'object',
		'unknown',
		'promise',
		'void',
		'never',
		'map',
		'set',
	]),
	Rt = n => {
		switch (typeof n) {
			case 'undefined':
				return A.undefined;
			case 'string':
				return A.string;
			case 'number':
				return isNaN(n) ? A.nan : A.number;
			case 'boolean':
				return A.boolean;
			case 'function':
				return A.function;
			case 'bigint':
				return A.bigint;
			case 'object':
				return Array.isArray(n)
					? A.array
					: n === null
					? A.null
					: n.then && typeof n.then == 'function' && n.catch && typeof n.catch == 'function'
					? A.promise
					: typeof Map < 'u' && n instanceof Map
					? A.map
					: typeof Set < 'u' && n instanceof Set
					? A.set
					: typeof Date < 'u' && n instanceof Date
					? A.date
					: A.object;
			default:
				return A.unknown;
		}
	},
	b = Q.arrayToEnum([
		'invalid_type',
		'invalid_literal',
		'custom',
		'invalid_union',
		'invalid_union_discriminator',
		'invalid_enum_value',
		'unrecognized_keys',
		'invalid_arguments',
		'invalid_return_type',
		'invalid_date',
		'invalid_string',
		'too_small',
		'too_big',
		'invalid_intersection_types',
		'not_multiple_of',
	]),
	ah = n => JSON.stringify(n, null, 2).replace(/"([^"]+)":/g, '$1:'),
	Ne = class extends Error {
		constructor(e) {
			super(),
				this.issues = [],
				this.addIssue = r => {
					this.issues = [...this.issues, r];
				},
				this.addIssues = (r = []) => {
					this.issues = [...this.issues, ...r];
				};
			let t = new.target.prototype;
			Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : this.__proto__ = t,
				this.name = 'ZodError',
				this.issues = e;
		}
		get errors() {
			return this.issues;
		}
		format(e) {
			let t = e || function(o) {
					return o.message;
				},
				r = { _errors: [] },
				s = o => {
					for (let a of o.issues) {
						if (a.code === 'invalid_union') a.unionErrors.map(s);
						else if (a.code === 'invalid_return_type') s(a.returnTypeError);
						else if (a.code === 'invalid_arguments') s(a.argumentsError);
						else if (a.path.length === 0) r._errors.push(t(a));
						else {
							let i = r, c = 0;
							for (; c < a.path.length;) {
								let u = a.path[c];
								c === a.path.length - 1
									? (i[u] = i[u] || { _errors: [] }, i[u]._errors.push(t(a)))
									: i[u] = i[u] || { _errors: [] },
									i = i[u],
									c++;
							}
						}
					}
				};
			return s(this), r;
		}
		toString() {
			return this.message;
		}
		get message() {
			return JSON.stringify(this.issues, null, 2);
		}
		get isEmpty() {
			return this.issues.length === 0;
		}
		flatten(e = t => t.message) {
			let t = {}, r = [];
			for (let s of this.issues) {
				s.path.length > 0
					? (t[s.path[0]] = t[s.path[0]] || [], t[s.path[0]].push(e(s)))
					: r.push(e(s));
			}
			return { formErrors: r, fieldErrors: t };
		}
		get formErrors() {
			return this.flatten();
		}
	};
Ne.create = n => new Ne(n);
var on = (n, e) => {
		let t;
		switch (n.code) {
			case b.invalid_type:
				n.received === A.undefined ? t = 'Required' : t = `Expected ${n.expected}, received ${n.received}`;
				break;
			case b.invalid_literal:
				t = `Invalid literal value, expected ${JSON.stringify(n.expected)}`;
				break;
			case b.unrecognized_keys:
				t = `Unrecognized key(s) in object: ${Q.joinValues(n.keys, ', ')}`;
				break;
			case b.invalid_union:
				t = 'Invalid input';
				break;
			case b.invalid_union_discriminator:
				t = `Invalid discriminator value. Expected ${Q.joinValues(n.options)}`;
				break;
			case b.invalid_enum_value:
				t = `Invalid enum value. Expected ${Q.joinValues(n.options)}, received '${n.received}'`;
				break;
			case b.invalid_arguments:
				t = 'Invalid function arguments';
				break;
			case b.invalid_return_type:
				t = 'Invalid function return type';
				break;
			case b.invalid_date:
				t = 'Invalid date';
				break;
			case b.invalid_string:
				n.validation !== 'regex' ? t = `Invalid ${n.validation}` : t = 'Invalid';
				break;
			case b.too_small:
				n.type === 'array'
					? t = `Array must contain ${n.inclusive ? 'at least' : 'more than'} ${n.minimum} element(s)`
					: n.type === 'string'
					? t = `String must contain ${n.inclusive ? 'at least' : 'over'} ${n.minimum} character(s)`
					: n.type === 'number'
					? t = `Number must be greater than ${n.inclusive ? 'or equal to ' : ''}${n.minimum}`
					: t = 'Invalid input';
				break;
			case b.too_big:
				n.type === 'array'
					? t = `Array must contain ${n.inclusive ? 'at most' : 'less than'} ${n.maximum} element(s)`
					: n.type === 'string'
					? t = `String must contain ${n.inclusive ? 'at most' : 'under'} ${n.maximum} character(s)`
					: n.type === 'number'
					? t = `Number must be less than ${n.inclusive ? 'or equal to ' : ''}${n.maximum}`
					: t = 'Invalid input';
				break;
			case b.custom:
				t = 'Invalid input';
				break;
			case b.invalid_intersection_types:
				t = 'Intersection results could not be merged';
				break;
			case b.not_multiple_of:
				t = `Number must be a multiple of ${n.multipleOf}`;
				break;
			default:
				t = e.defaultError, Q.assertNever(n);
		}
		return { message: t };
	},
	an = on,
	ih = n => {
		an = n;
	},
	ws = n => {
		let { data: e, path: t, errorMaps: r, issueData: s } = n,
			o = [...t, ...s.path || []],
			a = { ...s, path: o },
			i = '',
			c = r.filter(u => !!u).slice().reverse();
		for (let u of c) i = u(a, { data: e, defaultError: i }).message;
		return { ...s, path: o, message: s.message || i };
	},
	ch = [];
function _(n, e) {
	let t = ws({
		issueData: e,
		data: n.data,
		path: n.path,
		errorMaps: [n.common.contextualErrorMap, n.schemaErrorMap, an, on].filter(r => !!r),
	});
	n.common.issues.push(t);
}
var ve = class {
		constructor() {
			this.value = 'valid';
		}
		dirty() {
			this.value === 'valid' && (this.value = 'dirty');
		}
		abort() {
			this.value !== 'aborted' && (this.value = 'aborted');
		}
		static mergeArray(e, t) {
			let r = [];
			for (let s of t) {
				if (s.status === 'aborted') return K;
				s.status === 'dirty' && e.dirty(), r.push(s.value);
			}
			return { status: e.value, value: r };
		}
		static async mergeObjectAsync(e, t) {
			let r = [];
			for (let s of t) r.push({ key: await s.key, value: await s.value });
			return ve.mergeObjectSync(e, r);
		}
		static mergeObjectSync(e, t) {
			let r = {};
			for (let s of t) {
				let { key: o, value: a } = s;
				if (o.status === 'aborted' || a.status === 'aborted') return K;
				o.status === 'dirty' && e.dirty(),
					a.status === 'dirty' && e.dirty(),
					(typeof a.value < 'u' || s.alwaysSet) && (r[o.value] = a.value);
			}
			return { status: e.value, value: r };
		}
	},
	K = Object.freeze({ status: 'aborted' }),
	uh = n => ({ status: 'dirty', value: n }),
	Ae = n => ({ status: 'valid', value: n }),
	Wo = n => n.status === 'aborted',
	Yo = n => n.status === 'dirty',
	bs = n => n.status === 'valid',
	Xo = n => typeof Promise !== void 0 && n instanceof Promise,
	q;
(function(n) {
	n.errToObj = e => typeof e == 'string' ? { message: e } : e || {},
		n.toString = e => typeof e == 'string' ? e : e?.message;
})(q || (q = {}));
var je = class {
		constructor(e, t, r, s) {
			this.parent = e, this.data = t, this._path = r, this._key = s;
		}
		get path() {
			return this._path.concat(this._key);
		}
	},
	Sc = (n, e) => {
		if (bs(e)) return { success: !0, data: e.value };
		{
			if (!n.common.issues.length) throw new Error('Validation failed but no issues detected.');
			let t = new Ne(n.common.issues);
			return { success: !1, error: t };
		}
	};
function j(n) {
	if (!n) return {};
	let { errorMap: e, invalid_type_error: t, required_error: r, description: s } = n;
	if (e && (t || r)) throw new Error(`Can't use "invalid" or "required" in conjunction with custom error map.`);
	return e
		? { errorMap: e, description: s }
		: {
			errorMap: (a, i) =>
				a.code !== 'invalid_type'
					? { message: i.defaultError }
					: typeof i.data > 'u' && r
					? { message: r }
					: n.invalid_type_error
					? { message: n.invalid_type_error }
					: { message: i.defaultError },
			description: s,
		};
}
var U = class {
		constructor(e) {
			this.spa = this.safeParseAsync,
				this.superRefine = this._refinement,
				this._def = e,
				this.parse = this.parse.bind(this),
				this.safeParse = this.safeParse.bind(this),
				this.parseAsync = this.parseAsync.bind(this),
				this.safeParseAsync = this.safeParseAsync.bind(this),
				this.spa = this.spa.bind(this),
				this.refine = this.refine.bind(this),
				this.refinement = this.refinement.bind(this),
				this.superRefine = this.superRefine.bind(this),
				this.optional = this.optional.bind(this),
				this.nullable = this.nullable.bind(this),
				this.nullish = this.nullish.bind(this),
				this.array = this.array.bind(this),
				this.promise = this.promise.bind(this),
				this.or = this.or.bind(this),
				this.and = this.and.bind(this),
				this.transform = this.transform.bind(this),
				this.default = this.default.bind(this),
				this.describe = this.describe.bind(this),
				this.isNullable = this.isNullable.bind(this),
				this.isOptional = this.isOptional.bind(this);
		}
		get description() {
			return this._def.description;
		}
		_getType(e) {
			return Rt(e.data);
		}
		_getOrReturnCtx(e, t) {
			return t
				|| {
					common: e.parent.common,
					data: e.data,
					parsedType: Rt(e.data),
					schemaErrorMap: this._def.errorMap,
					path: e.path,
					parent: e.parent,
				};
		}
		_processInputParams(e) {
			return {
				status: new ve(),
				ctx: {
					common: e.parent.common,
					data: e.data,
					parsedType: Rt(e.data),
					schemaErrorMap: this._def.errorMap,
					path: e.path,
					parent: e.parent,
				},
			};
		}
		_parseSync(e) {
			let t = this._parse(e);
			if (Xo(t)) throw new Error('Synchronous parse encountered promise.');
			return t;
		}
		_parseAsync(e) {
			let t = this._parse(e);
			return Promise.resolve(t);
		}
		parse(e, t) {
			let r = this.safeParse(e, t);
			if (r.success) return r.data;
			throw r.error;
		}
		safeParse(e, t) {
			var r;
			let s = {
					common: {
						issues: [],
						async: (r = t?.async) !== null && r !== void 0 ? r : !1,
						contextualErrorMap: t?.errorMap,
					},
					path: t?.path || [],
					schemaErrorMap: this._def.errorMap,
					parent: null,
					data: e,
					parsedType: Rt(e),
				},
				o = this._parseSync({ data: e, path: s.path, parent: s });
			return Sc(s, o);
		}
		async parseAsync(e, t) {
			let r = await this.safeParseAsync(e, t);
			if (r.success) return r.data;
			throw r.error;
		}
		async safeParseAsync(e, t) {
			let r = {
					common: { issues: [], contextualErrorMap: t?.errorMap, async: !0 },
					path: t?.path || [],
					schemaErrorMap: this._def.errorMap,
					parent: null,
					data: e,
					parsedType: Rt(e),
				},
				s = this._parse({ data: e, path: [], parent: r }),
				o = await (Xo(s) ? s : Promise.resolve(s));
			return Sc(r, o);
		}
		refine(e, t) {
			let r = s => typeof t == 'string' || typeof t > 'u' ? { message: t } : typeof t == 'function' ? t(s) : t;
			return this._refinement((s, o) => {
				let a = e(s), i = () => o.addIssue({ code: b.custom, ...r(s) });
				return typeof Promise < 'u' && a instanceof Promise ? a.then(c => c ? !0 : (i(), !1)) : a ? !0 : (i(), !1);
			});
		}
		refinement(e, t) {
			return this._refinement((r, s) => e(r) ? !0 : (s.addIssue(typeof t == 'function' ? t(r, s) : t), !1));
		}
		_refinement(e) {
			return new Me({ schema: this, typeName: I.ZodEffects, effect: { type: 'refinement', refinement: e } });
		}
		optional() {
			return Re.create(this);
		}
		nullable() {
			return St.create(this);
		}
		nullish() {
			return this.optional().nullable();
		}
		array() {
			return Ve.create(this);
		}
		promise() {
			return Vt.create(this);
		}
		or(e) {
			return Zt.create([this, e]);
		}
		and(e) {
			return Wt.create(this, e);
		}
		transform(e) {
			return new Me({ schema: this, typeName: I.ZodEffects, effect: { type: 'transform', transform: e } });
		}
		default(e) {
			let t = typeof e == 'function' ? e : () => e;
			return new cn({ innerType: this, defaultValue: t, typeName: I.ZodDefault });
		}
		describe(e) {
			let t = this.constructor;
			return new t({ ...this._def, description: e });
		}
		isOptional() {
			return this.safeParse(void 0).success;
		}
		isNullable() {
			return this.safeParse(null).success;
		}
	},
	lh = /^c[^\s-]{8,}$/i,
	fh = /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i,
	hh =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
	ct = class extends U {
		constructor() {
			super(...arguments),
				this._regex = (e, t, r) =>
					this.refinement(s => e.test(s), { validation: t, code: b.invalid_string, ...q.errToObj(r) }),
				this.nonempty = e => this.min(1, q.errToObj(e)),
				this.trim = () => new ct({ ...this._def, checks: [...this._def.checks, { kind: 'trim' }] });
		}
		_parse(e) {
			if (this._getType(e) !== A.string) {
				let o = this._getOrReturnCtx(e);
				return _(o, { code: b.invalid_type, expected: A.string, received: o.parsedType }), K;
			}
			let r = new ve(), s;
			for (let o of this._def.checks) {
				if (o.kind === 'min') {
					e.data.length < o.value
						&& (s = this._getOrReturnCtx(e, s),
							_(s, { code: b.too_small, minimum: o.value, type: 'string', inclusive: !0, message: o.message }),
							r.dirty());
				} else if (o.kind === 'max') {
					e.data.length > o.value
						&& (s = this._getOrReturnCtx(e, s),
							_(s, { code: b.too_big, maximum: o.value, type: 'string', inclusive: !0, message: o.message }),
							r.dirty());
				} else if (o.kind === 'email') {
					hh.test(e.data)
						|| (s = this._getOrReturnCtx(e, s),
							_(s, { validation: 'email', code: b.invalid_string, message: o.message }),
							r.dirty());
				} else if (o.kind === 'uuid') {
					fh.test(e.data)
						|| (s = this._getOrReturnCtx(e, s),
							_(s, { validation: 'uuid', code: b.invalid_string, message: o.message }),
							r.dirty());
				} else if (o.kind === 'cuid') {
					lh.test(e.data)
						|| (s = this._getOrReturnCtx(e, s),
							_(s, { validation: 'cuid', code: b.invalid_string, message: o.message }),
							r.dirty());
				} else if (o.kind === 'url') {
					try {
						new URL(e.data);
					} catch {
						s = this._getOrReturnCtx(e, s),
							_(s, { validation: 'url', code: b.invalid_string, message: o.message }),
							r.dirty();
					}
				} else {
					o.kind === 'regex'
						? (o.regex.lastIndex = 0,
							o.regex.test(e.data)
							|| (s = this._getOrReturnCtx(e, s),
								_(s, { validation: 'regex', code: b.invalid_string, message: o.message }),
								r.dirty()))
						: o.kind === 'trim'
						? e.data = e.data.trim()
						: Q.assertNever(o);
				}
			}
			return { status: r.value, value: e.data };
		}
		_addCheck(e) {
			return new ct({ ...this._def, checks: [...this._def.checks, e] });
		}
		email(e) {
			return this._addCheck({ kind: 'email', ...q.errToObj(e) });
		}
		url(e) {
			return this._addCheck({ kind: 'url', ...q.errToObj(e) });
		}
		uuid(e) {
			return this._addCheck({ kind: 'uuid', ...q.errToObj(e) });
		}
		cuid(e) {
			return this._addCheck({ kind: 'cuid', ...q.errToObj(e) });
		}
		regex(e, t) {
			return this._addCheck({ kind: 'regex', regex: e, ...q.errToObj(t) });
		}
		min(e, t) {
			return this._addCheck({ kind: 'min', value: e, ...q.errToObj(t) });
		}
		max(e, t) {
			return this._addCheck({ kind: 'max', value: e, ...q.errToObj(t) });
		}
		length(e, t) {
			return this.min(e, t).max(e, t);
		}
		get isEmail() {
			return !!this._def.checks.find(e => e.kind === 'email');
		}
		get isURL() {
			return !!this._def.checks.find(e => e.kind === 'url');
		}
		get isUUID() {
			return !!this._def.checks.find(e => e.kind === 'uuid');
		}
		get isCUID() {
			return !!this._def.checks.find(e => e.kind === 'cuid');
		}
		get minLength() {
			let e = -1 / 0;
			return this._def.checks.map(t => {
				t.kind === 'min' && (e === null || t.value > e) && (e = t.value);
			}),
				e;
		}
		get maxLength() {
			let e = null;
			return this._def.checks.map(t => {
				t.kind === 'max' && (e === null || t.value < e) && (e = t.value);
			}),
				e;
		}
	};
ct.create = n => new ct({ checks: [], typeName: I.ZodString, ...j(n) });
function ph(n, e) {
	let t = (n.toString().split('.')[1] || '').length,
		r = (e.toString().split('.')[1] || '').length,
		s = t > r ? t : r,
		o = parseInt(n.toFixed(s).replace('.', '')),
		a = parseInt(e.toFixed(s).replace('.', ''));
	return o % a / Math.pow(10, s);
}
var bt = class extends U {
	constructor() {
		super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
	}
	_parse(e) {
		if (this._getType(e) !== A.number) {
			let o = this._getOrReturnCtx(e);
			return _(o, { code: b.invalid_type, expected: A.number, received: o.parsedType }), K;
		}
		let r, s = new ve();
		for (let o of this._def.checks) {
			o.kind === 'int'
				? Q.isInteger(e.data)
					|| (r = this._getOrReturnCtx(e, r),
						_(r, { code: b.invalid_type, expected: 'integer', received: 'float', message: o.message }),
						s.dirty())
				: o.kind === 'min'
				? (o.inclusive ? e.data < o.value : e.data <= o.value)
					&& (r = this._getOrReturnCtx(e, r),
						_(r, { code: b.too_small, minimum: o.value, type: 'number', inclusive: o.inclusive, message: o.message }),
						s.dirty())
				: o.kind === 'max'
				? (o.inclusive ? e.data > o.value : e.data >= o.value)
					&& (r = this._getOrReturnCtx(e, r),
						_(r, { code: b.too_big, maximum: o.value, type: 'number', inclusive: o.inclusive, message: o.message }),
						s.dirty())
				: o.kind === 'multipleOf'
				? ph(e.data, o.value) !== 0
					&& (r = this._getOrReturnCtx(e, r),
						_(r, { code: b.not_multiple_of, multipleOf: o.value, message: o.message }),
						s.dirty())
				: Q.assertNever(o);
		}
		return { status: s.value, value: e.data };
	}
	gte(e, t) {
		return this.setLimit('min', e, !0, q.toString(t));
	}
	gt(e, t) {
		return this.setLimit('min', e, !1, q.toString(t));
	}
	lte(e, t) {
		return this.setLimit('max', e, !0, q.toString(t));
	}
	lt(e, t) {
		return this.setLimit('max', e, !1, q.toString(t));
	}
	setLimit(e, t, r, s) {
		return new bt({
			...this._def,
			checks: [...this._def.checks, { kind: e, value: t, inclusive: r, message: q.toString(s) }],
		});
	}
	_addCheck(e) {
		return new bt({ ...this._def, checks: [...this._def.checks, e] });
	}
	int(e) {
		return this._addCheck({ kind: 'int', message: q.toString(e) });
	}
	positive(e) {
		return this._addCheck({ kind: 'min', value: 0, inclusive: !1, message: q.toString(e) });
	}
	negative(e) {
		return this._addCheck({ kind: 'max', value: 0, inclusive: !1, message: q.toString(e) });
	}
	nonpositive(e) {
		return this._addCheck({ kind: 'max', value: 0, inclusive: !0, message: q.toString(e) });
	}
	nonnegative(e) {
		return this._addCheck({ kind: 'min', value: 0, inclusive: !0, message: q.toString(e) });
	}
	multipleOf(e, t) {
		return this._addCheck({ kind: 'multipleOf', value: e, message: q.toString(t) });
	}
	get minValue() {
		let e = null;
		for (let t of this._def.checks) t.kind === 'min' && (e === null || t.value > e) && (e = t.value);
		return e;
	}
	get maxValue() {
		let e = null;
		for (let t of this._def.checks) t.kind === 'max' && (e === null || t.value < e) && (e = t.value);
		return e;
	}
	get isInt() {
		return !!this._def.checks.find(e => e.kind === 'int');
	}
};
bt.create = n => new bt({ checks: [], typeName: I.ZodNumber, ...j(n) });
var vr = class extends U {
	_parse(e) {
		if (this._getType(e) !== A.bigint) {
			let r = this._getOrReturnCtx(e);
			return _(r, { code: b.invalid_type, expected: A.bigint, received: r.parsedType }), K;
		}
		return Ae(e.data);
	}
};
vr.create = n => new vr({ typeName: I.ZodBigInt, ...j(n) });
var wr = class extends U {
	_parse(e) {
		if (this._getType(e) !== A.boolean) {
			let r = this._getOrReturnCtx(e);
			return _(r, { code: b.invalid_type, expected: A.boolean, received: r.parsedType }), K;
		}
		return Ae(e.data);
	}
};
wr.create = n => new wr({ typeName: I.ZodBoolean, ...j(n) });
var br = class extends U {
	_parse(e) {
		if (this._getType(e) !== A.date) {
			let r = this._getOrReturnCtx(e);
			return _(r, { code: b.invalid_type, expected: A.date, received: r.parsedType }), K;
		}
		if (isNaN(e.data.getTime())) {
			let r = this._getOrReturnCtx(e);
			return _(r, { code: b.invalid_date }), K;
		}
		return { status: 'valid', value: new Date(e.data.getTime()) };
	}
};
br.create = n => new br({ typeName: I.ZodDate, ...j(n) });
var Ar = class extends U {
	_parse(e) {
		if (this._getType(e) !== A.undefined) {
			let r = this._getOrReturnCtx(e);
			return _(r, { code: b.invalid_type, expected: A.undefined, received: r.parsedType }), K;
		}
		return Ae(e.data);
	}
};
Ar.create = n => new Ar({ typeName: I.ZodUndefined, ...j(n) });
var xr = class extends U {
	_parse(e) {
		if (this._getType(e) !== A.null) {
			let r = this._getOrReturnCtx(e);
			return _(r, { code: b.invalid_type, expected: A.null, received: r.parsedType }), K;
		}
		return Ae(e.data);
	}
};
xr.create = n => new xr({ typeName: I.ZodNull, ...j(n) });
var jt = class extends U {
	constructor() {
		super(...arguments), this._any = !0;
	}
	_parse(e) {
		return Ae(e.data);
	}
};
jt.create = n => new jt({ typeName: I.ZodAny, ...j(n) });
var it = class extends U {
	constructor() {
		super(...arguments), this._unknown = !0;
	}
	_parse(e) {
		return Ae(e.data);
	}
};
it.create = n => new it({ typeName: I.ZodUnknown, ...j(n) });
var ut = class extends U {
	_parse(e) {
		let t = this._getOrReturnCtx(e);
		return _(t, { code: b.invalid_type, expected: A.never, received: t.parsedType }), K;
	}
};
ut.create = n => new ut({ typeName: I.ZodNever, ...j(n) });
var Sr = class extends U {
	_parse(e) {
		if (this._getType(e) !== A.undefined) {
			let r = this._getOrReturnCtx(e);
			return _(r, { code: b.invalid_type, expected: A.void, received: r.parsedType }), K;
		}
		return Ae(e.data);
	}
};
Sr.create = n => new Sr({ typeName: I.ZodVoid, ...j(n) });
var Ve = class extends U {
	_parse(e) {
		let { ctx: t, status: r } = this._processInputParams(e), s = this._def;
		if (t.parsedType !== A.array) return _(t, { code: b.invalid_type, expected: A.array, received: t.parsedType }), K;
		if (
			s.minLength !== null && t.data.length < s.minLength.value
			&& (_(t, {
				code: b.too_small,
				minimum: s.minLength.value,
				type: 'array',
				inclusive: !0,
				message: s.minLength.message,
			}),
				r.dirty()),
				s.maxLength !== null && t.data.length > s.maxLength.value
				&& (_(t, {
					code: b.too_big,
					maximum: s.maxLength.value,
					type: 'array',
					inclusive: !0,
					message: s.maxLength.message,
				}),
					r.dirty()),
				t.common.async
		) {
			return Promise.all(t.data.map((a, i) => s.type._parseAsync(new je(t, a, t.path, i)))).then(a =>
				ve.mergeArray(r, a)
			);
		}
		let o = t.data.map((a, i) => s.type._parseSync(new je(t, a, t.path, i)));
		return ve.mergeArray(r, o);
	}
	get element() {
		return this._def.type;
	}
	min(e, t) {
		return new Ve({ ...this._def, minLength: { value: e, message: q.toString(t) } });
	}
	max(e, t) {
		return new Ve({ ...this._def, maxLength: { value: e, message: q.toString(t) } });
	}
	length(e, t) {
		return this.min(e, t).max(e, t);
	}
	nonempty(e) {
		return this.min(1, e);
	}
};
Ve.create = (n, e) => new Ve({ type: n, minLength: null, maxLength: null, typeName: I.ZodArray, ...j(e) });
var As;
(function(n) {
	n.mergeShapes = (e, t) => ({ ...e, ...t });
})(As || (As = {}));
var kc = n => e => new W({ ...n, shape: () => ({ ...n.shape(), ...e }) });
function gr(n) {
	if (n instanceof W) {
		let e = {};
		for (let t in n.shape) {
			let r = n.shape[t];
			e[t] = Re.create(gr(r));
		}
		return new W({ ...n._def, shape: () => e });
	} else {
		return n instanceof Ve
			? Ve.create(gr(n.element))
			: n instanceof Re
			? Re.create(gr(n.unwrap()))
			: n instanceof St
			? St.create(gr(n.unwrap()))
			: n instanceof He
			? He.create(n.items.map(e => gr(e)))
			: n;
	}
}
var W = class extends U {
	constructor() {
		super(...arguments),
			this._cached = null,
			this.nonstrict = this.passthrough,
			this.augment = kc(this._def),
			this.extend = kc(this._def);
	}
	_getCached() {
		if (this._cached !== null) return this._cached;
		let e = this._def.shape(), t = Q.objectKeys(e);
		return this._cached = { shape: e, keys: t };
	}
	_parse(e) {
		if (this._getType(e) !== A.object) {
			let u = this._getOrReturnCtx(e);
			return _(u, { code: b.invalid_type, expected: A.object, received: u.parsedType }), K;
		}
		let { status: r, ctx: s } = this._processInputParams(e), { shape: o, keys: a } = this._getCached(), i = [];
		for (let u in s.data) a.includes(u) || i.push(u);
		let c = [];
		for (let u of a) {
			let l = o[u], f = s.data[u];
			c.push({ key: { status: 'valid', value: u }, value: l._parse(new je(s, f, s.path, u)), alwaysSet: u in s.data });
		}
		if (this._def.catchall instanceof ut) {
			let u = this._def.unknownKeys;
			if (u === 'passthrough') {
				for (let l of i) c.push({ key: { status: 'valid', value: l }, value: { status: 'valid', value: s.data[l] } });
			} else if (u === 'strict') i.length > 0 && (_(s, { code: b.unrecognized_keys, keys: i }), r.dirty());
			else if (u !== 'strip') throw new Error('Internal ZodObject error: invalid unknownKeys value.');
		} else {
			let u = this._def.catchall;
			for (let l of i) {
				let f = s.data[l];
				c.push({
					key: { status: 'valid', value: l },
					value: u._parse(new je(s, f, s.path, l)),
					alwaysSet: l in s.data,
				});
			}
		}
		return s.common.async
			? Promise.resolve().then(async () => {
				let u = [];
				for (let l of c) {
					let f = await l.key;
					u.push({ key: f, value: await l.value, alwaysSet: l.alwaysSet });
				}
				return u;
			}).then(u => ve.mergeObjectSync(r, u))
			: ve.mergeObjectSync(r, c);
	}
	get shape() {
		return this._def.shape();
	}
	strict(e) {
		return q.errToObj,
			new W({
				...this._def,
				unknownKeys: 'strict',
				...e !== void 0
					? {
						errorMap: (t, r) => {
							var s, o, a, i;
							let c = (a = (o = (s = this._def).errorMap) === null || o === void 0 ? void 0 : o.call(s, t, r).message)
										!== null && a !== void 0
								? a
								: r.defaultError;
							return t.code === 'unrecognized_keys'
								? { message: (i = q.errToObj(e).message) !== null && i !== void 0 ? i : c }
								: { message: c };
						},
					}
					: {},
			});
	}
	strip() {
		return new W({ ...this._def, unknownKeys: 'strip' });
	}
	passthrough() {
		return new W({ ...this._def, unknownKeys: 'passthrough' });
	}
	setKey(e, t) {
		return this.augment({ [e]: t });
	}
	merge(e) {
		return new W({
			unknownKeys: e._def.unknownKeys,
			catchall: e._def.catchall,
			shape: () => As.mergeShapes(this._def.shape(), e._def.shape()),
			typeName: I.ZodObject,
		});
	}
	catchall(e) {
		return new W({ ...this._def, catchall: e });
	}
	pick(e) {
		let t = {};
		return Q.objectKeys(e).map(r => {
			this.shape[r] && (t[r] = this.shape[r]);
		}),
			new W({ ...this._def, shape: () => t });
	}
	omit(e) {
		let t = {};
		return Q.objectKeys(this.shape).map(r => {
			Q.objectKeys(e).indexOf(r) === -1 && (t[r] = this.shape[r]);
		}),
			new W({ ...this._def, shape: () => t });
	}
	deepPartial() {
		return gr(this);
	}
	partial(e) {
		let t = {};
		if (e) {
			return Q.objectKeys(this.shape).map(r => {
				Q.objectKeys(e).indexOf(r) === -1 ? t[r] = this.shape[r] : t[r] = this.shape[r].optional();
			}),
				new W({ ...this._def, shape: () => t });
		}
		for (let r in this.shape) {
			let s = this.shape[r];
			t[r] = s.optional();
		}
		return new W({ ...this._def, shape: () => t });
	}
	required() {
		let e = {};
		for (let t in this.shape) {
			let s = this.shape[t];
			for (; s instanceof Re;) s = s._def.innerType;
			e[t] = s;
		}
		return new W({ ...this._def, shape: () => e });
	}
};
W.create = (n, e) =>
	new W({ shape: () => n, unknownKeys: 'strip', catchall: ut.create(), typeName: I.ZodObject, ...j(e) });
W.strictCreate = (n, e) =>
	new W({ shape: () => n, unknownKeys: 'strict', catchall: ut.create(), typeName: I.ZodObject, ...j(e) });
W.lazycreate = (n, e) =>
	new W({ shape: n, unknownKeys: 'strip', catchall: ut.create(), typeName: I.ZodObject, ...j(e) });
var Zt = class extends U {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e), r = this._def.options;
		function s(o) {
			for (let i of o) if (i.result.status === 'valid') return i.result;
			for (let i of o) if (i.result.status === 'dirty') return t.common.issues.push(...i.ctx.common.issues), i.result;
			let a = o.map(i => new Ne(i.ctx.common.issues));
			return _(t, { code: b.invalid_union, unionErrors: a }), K;
		}
		if (t.common.async) {
			return Promise.all(r.map(async o => {
				let a = { ...t, common: { ...t.common, issues: [] }, parent: null };
				return { result: await o._parseAsync({ data: t.data, path: t.path, parent: a }), ctx: a };
			})).then(s);
		}
		{
			let o, a = [];
			for (let c of r) {
				let u = { ...t, common: { ...t.common, issues: [] }, parent: null },
					l = c._parseSync({ data: t.data, path: t.path, parent: u });
				if (l.status === 'valid') return l;
				l.status === 'dirty' && !o && (o = { result: l, ctx: u }), u.common.issues.length && a.push(u.common.issues);
			}
			if (o) return t.common.issues.push(...o.ctx.common.issues), o.result;
			let i = a.map(c => new Ne(c));
			return _(t, { code: b.invalid_union, unionErrors: i }), K;
		}
	}
	get options() {
		return this._def.options;
	}
};
Zt.create = (n, e) => new Zt({ options: n, typeName: I.ZodUnion, ...j(e) });
var kr = class extends U {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e);
		if (t.parsedType !== A.object) return _(t, { code: b.invalid_type, expected: A.object, received: t.parsedType }), K;
		let r = this.discriminator, s = t.data[r], o = this.options.get(s);
		return o
			? t.common.async
				? o._parseAsync({ data: t.data, path: t.path, parent: t })
				: o._parseSync({ data: t.data, path: t.path, parent: t })
			: (_(t, { code: b.invalid_union_discriminator, options: this.validDiscriminatorValues, path: [r] }), K);
	}
	get discriminator() {
		return this._def.discriminator;
	}
	get validDiscriminatorValues() {
		return Array.from(this.options.keys());
	}
	get options() {
		return this._def.options;
	}
	static create(e, t, r) {
		let s = new Map();
		try {
			t.forEach(o => {
				let a = o.shape[e].value;
				s.set(a, o);
			});
		} catch {
			throw new Error('The discriminator value could not be extracted from all the provided schemas');
		}
		if (s.size !== t.length) throw new Error('Some of the discriminator values are not unique');
		return new kr({ typeName: I.ZodDiscriminatedUnion, discriminator: e, options: s, ...j(r) });
	}
};
function Qo(n, e) {
	let t = Rt(n), r = Rt(e);
	if (n === e) return { valid: !0, data: n };
	if (t === A.object && r === A.object) {
		let s = Q.objectKeys(e), o = Q.objectKeys(n).filter(i => s.indexOf(i) !== -1), a = { ...n, ...e };
		for (let i of o) {
			let c = Qo(n[i], e[i]);
			if (!c.valid) return { valid: !1 };
			a[i] = c.data;
		}
		return { valid: !0, data: a };
	} else if (t === A.array && r === A.array) {
		if (n.length !== e.length) return { valid: !1 };
		let s = [];
		for (let o = 0; o < n.length; o++) {
			let a = n[o], i = e[o], c = Qo(a, i);
			if (!c.valid) return { valid: !1 };
			s.push(c.data);
		}
		return { valid: !0, data: s };
	} else return t === A.date && r === A.date && +n == +e ? { valid: !0, data: n } : { valid: !1 };
}
var Wt = class extends U {
	_parse(e) {
		let { status: t, ctx: r } = this._processInputParams(e),
			s = (o, a) => {
				if (Wo(o) || Wo(a)) return K;
				let i = Qo(o.value, a.value);
				return i.valid
					? ((Yo(o) || Yo(a)) && t.dirty(), { status: t.value, value: i.data })
					: (_(r, { code: b.invalid_intersection_types }), K);
			};
		return r.common.async
			? Promise.all([
				this._def.left._parseAsync({ data: r.data, path: r.path, parent: r }),
				this._def.right._parseAsync({ data: r.data, path: r.path, parent: r }),
			]).then(([o, a]) => s(o, a))
			: s(
				this._def.left._parseSync({ data: r.data, path: r.path, parent: r }),
				this._def.right._parseSync({ data: r.data, path: r.path, parent: r }),
			);
	}
};
Wt.create = (n, e, t) => new Wt({ left: n, right: e, typeName: I.ZodIntersection, ...j(t) });
var He = class extends U {
	_parse(e) {
		let { status: t, ctx: r } = this._processInputParams(e);
		if (r.parsedType !== A.array) return _(r, { code: b.invalid_type, expected: A.array, received: r.parsedType }), K;
		if (r.data.length < this._def.items.length) {
			return _(r, { code: b.too_small, minimum: this._def.items.length, inclusive: !0, type: 'array' }), K;
		}
		!this._def.rest && r.data.length > this._def.items.length
			&& (_(r, { code: b.too_big, maximum: this._def.items.length, inclusive: !0, type: 'array' }), t.dirty());
		let o = r.data.map((a, i) => {
			let c = this._def.items[i] || this._def.rest;
			return c ? c._parse(new je(r, a, r.path, i)) : null;
		}).filter(a => !!a);
		return r.common.async ? Promise.all(o).then(a => ve.mergeArray(t, a)) : ve.mergeArray(t, o);
	}
	get items() {
		return this._def.items;
	}
	rest(e) {
		return new He({ ...this._def, rest: e });
	}
};
He.create = (n, e) => new He({ items: n, typeName: I.ZodTuple, rest: null, ...j(e) });
var Yt = class extends U {
		get keySchema() {
			return this._def.keyType;
		}
		get valueSchema() {
			return this._def.valueType;
		}
		_parse(e) {
			let { status: t, ctx: r } = this._processInputParams(e);
			if (r.parsedType !== A.object) {
				return _(r, { code: b.invalid_type, expected: A.object, received: r.parsedType }), K;
			}
			let s = [], o = this._def.keyType, a = this._def.valueType;
			for (let i in r.data) {
				s.push({ key: o._parse(new je(r, i, r.path, i)), value: a._parse(new je(r, r.data[i], r.path, i)) });
			}
			return r.common.async ? ve.mergeObjectAsync(t, s) : ve.mergeObjectSync(t, s);
		}
		get element() {
			return this._def.valueType;
		}
		static create(e, t, r) {
			return t instanceof U
				? new Yt({ keyType: e, valueType: t, typeName: I.ZodRecord, ...j(r) })
				: new Yt({ keyType: ct.create(), valueType: e, typeName: I.ZodRecord, ...j(t) });
		}
	},
	Br = class extends U {
		_parse(e) {
			let { status: t, ctx: r } = this._processInputParams(e);
			if (r.parsedType !== A.map) return _(r, { code: b.invalid_type, expected: A.map, received: r.parsedType }), K;
			let s = this._def.keyType,
				o = this._def.valueType,
				a = [...r.data.entries()].map(([i, c], u) => ({
					key: s._parse(new je(r, i, r.path, [u, 'key'])),
					value: o._parse(new je(r, c, r.path, [u, 'value'])),
				}));
			if (r.common.async) {
				let i = new Map();
				return Promise.resolve().then(async () => {
					for (let c of a) {
						let u = await c.key, l = await c.value;
						if (u.status === 'aborted' || l.status === 'aborted') return K;
						(u.status === 'dirty' || l.status === 'dirty') && t.dirty(), i.set(u.value, l.value);
					}
					return { status: t.value, value: i };
				});
			} else {
				let i = new Map();
				for (let c of a) {
					let u = c.key, l = c.value;
					if (u.status === 'aborted' || l.status === 'aborted') return K;
					(u.status === 'dirty' || l.status === 'dirty') && t.dirty(), i.set(u.value, l.value);
				}
				return { status: t.value, value: i };
			}
		}
	};
Br.create = (n, e, t) => new Br({ valueType: e, keyType: n, typeName: I.ZodMap, ...j(t) });
var At = class extends U {
	_parse(e) {
		let { status: t, ctx: r } = this._processInputParams(e);
		if (r.parsedType !== A.set) return _(r, { code: b.invalid_type, expected: A.set, received: r.parsedType }), K;
		let s = this._def;
		s.minSize !== null && r.data.size < s.minSize.value
		&& (_(r, { code: b.too_small, minimum: s.minSize.value, type: 'set', inclusive: !0, message: s.minSize.message }),
			t.dirty()),
			s.maxSize !== null && r.data.size > s.maxSize.value
			&& (_(r, { code: b.too_big, maximum: s.maxSize.value, type: 'set', inclusive: !0, message: s.maxSize.message }),
				t.dirty());
		let o = this._def.valueType;
		function a(c) {
			let u = new Set();
			for (let l of c) {
				if (l.status === 'aborted') return K;
				l.status === 'dirty' && t.dirty(), u.add(l.value);
			}
			return { status: t.value, value: u };
		}
		let i = [...r.data.values()].map((c, u) => o._parse(new je(r, c, r.path, u)));
		return r.common.async ? Promise.all(i).then(c => a(c)) : a(i);
	}
	min(e, t) {
		return new At({ ...this._def, minSize: { value: e, message: q.toString(t) } });
	}
	max(e, t) {
		return new At({ ...this._def, maxSize: { value: e, message: q.toString(t) } });
	}
	size(e, t) {
		return this.min(e, t).max(e, t);
	}
	nonempty(e) {
		return this.min(1, e);
	}
};
At.create = (n, e) => new At({ valueType: n, minSize: null, maxSize: null, typeName: I.ZodSet, ...j(e) });
var xt = class extends U {
	constructor() {
		super(...arguments), this.validate = this.implement;
	}
	_parse(e) {
		let { ctx: t } = this._processInputParams(e);
		if (t.parsedType !== A.function) {
			return _(t, { code: b.invalid_type, expected: A.function, received: t.parsedType }), K;
		}
		function r(i, c) {
			return ws({
				data: i,
				path: t.path,
				errorMaps: [t.common.contextualErrorMap, t.schemaErrorMap, an, on].filter(u => !!u),
				issueData: { code: b.invalid_arguments, argumentsError: c },
			});
		}
		function s(i, c) {
			return ws({
				data: i,
				path: t.path,
				errorMaps: [t.common.contextualErrorMap, t.schemaErrorMap, an, on].filter(u => !!u),
				issueData: { code: b.invalid_return_type, returnTypeError: c },
			});
		}
		let o = { errorMap: t.common.contextualErrorMap }, a = t.data;
		return this._def.returns instanceof Vt
			? Ae(async (...i) => {
				let c = new Ne([]),
					u = await this._def.args.parseAsync(i, o).catch(d => {
						throw c.addIssue(r(i, d)), c;
					}),
					l = await a(...u);
				return await this._def.returns._def.type.parseAsync(l, o).catch(d => {
					throw c.addIssue(s(l, d)), c;
				});
			})
			: Ae((...i) => {
				let c = this._def.args.safeParse(i, o);
				if (!c.success) throw new Ne([r(i, c.error)]);
				let u = a(...c.data), l = this._def.returns.safeParse(u, o);
				if (!l.success) throw new Ne([s(u, l.error)]);
				return l.data;
			});
	}
	parameters() {
		return this._def.args;
	}
	returnType() {
		return this._def.returns;
	}
	args(...e) {
		return new xt({ ...this._def, args: He.create(e).rest(it.create()) });
	}
	returns(e) {
		return new xt({ ...this._def, returns: e });
	}
	implement(e) {
		return this.parse(e);
	}
	strictImplement(e) {
		return this.parse(e);
	}
};
xt.create = (n, e, t) =>
	new xt({
		args: n ? n.rest(it.create()) : He.create([]).rest(it.create()),
		returns: e || it.create(),
		typeName: I.ZodFunction,
		...j(t),
	});
var _r = class extends U {
	get schema() {
		return this._def.getter();
	}
	_parse(e) {
		let { ctx: t } = this._processInputParams(e);
		return this._def.getter()._parse({ data: t.data, path: t.path, parent: t });
	}
};
_r.create = (n, e) => new _r({ getter: n, typeName: I.ZodLazy, ...j(e) });
var Cr = class extends U {
	_parse(e) {
		if (e.data !== this._def.value) {
			let t = this._getOrReturnCtx(e);
			return _(t, { code: b.invalid_literal, expected: this._def.value }), K;
		}
		return { status: 'valid', value: e.data };
	}
	get value() {
		return this._def.value;
	}
};
Cr.create = (n, e) => new Cr({ value: n, typeName: I.ZodLiteral, ...j(e) });
function dh(n, e) {
	return new Er({ values: n, typeName: I.ZodEnum, ...j(e) });
}
var Er = class extends U {
	_parse(e) {
		if (typeof e.data != 'string') {
			let t = this._getOrReturnCtx(e), r = this._def.values;
			return _(t, { expected: Q.joinValues(r), received: t.parsedType, code: b.invalid_type }), K;
		}
		if (this._def.values.indexOf(e.data) === -1) {
			let t = this._getOrReturnCtx(e), r = this._def.values;
			return _(t, { received: t.data, code: b.invalid_enum_value, options: r }), K;
		}
		return Ae(e.data);
	}
	get options() {
		return this._def.values;
	}
	get enum() {
		let e = {};
		for (let t of this._def.values) e[t] = t;
		return e;
	}
	get Values() {
		let e = {};
		for (let t of this._def.values) e[t] = t;
		return e;
	}
	get Enum() {
		let e = {};
		for (let t of this._def.values) e[t] = t;
		return e;
	}
};
Er.create = dh;
var Pr = class extends U {
	_parse(e) {
		let t = Q.getValidEnumValues(this._def.values), r = this._getOrReturnCtx(e);
		if (r.parsedType !== A.string && r.parsedType !== A.number) {
			let s = Q.objectValues(t);
			return _(r, { expected: Q.joinValues(s), received: r.parsedType, code: b.invalid_type }), K;
		}
		if (t.indexOf(e.data) === -1) {
			let s = Q.objectValues(t);
			return _(r, { received: r.data, code: b.invalid_enum_value, options: s }), K;
		}
		return Ae(e.data);
	}
	get enum() {
		return this._def.values;
	}
};
Pr.create = (n, e) => new Pr({ values: n, typeName: I.ZodNativeEnum, ...j(e) });
var Vt = class extends U {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e);
		if (t.parsedType !== A.promise && t.common.async === !1) {
			return _(t, { code: b.invalid_type, expected: A.promise, received: t.parsedType }), K;
		}
		let r = t.parsedType === A.promise ? t.data : Promise.resolve(t.data);
		return Ae(r.then(s => this._def.type.parseAsync(s, { path: t.path, errorMap: t.common.contextualErrorMap })));
	}
};
Vt.create = (n, e) => new Vt({ type: n, typeName: I.ZodPromise, ...j(e) });
var Me = class extends U {
	innerType() {
		return this._def.schema;
	}
	_parse(e) {
		let { status: t, ctx: r } = this._processInputParams(e), s = this._def.effect || null;
		if (s.type === 'preprocess') {
			let a = s.transform(r.data);
			return r.common.async
				? Promise.resolve(a).then(i => this._def.schema._parseAsync({ data: i, path: r.path, parent: r }))
				: this._def.schema._parseSync({ data: a, path: r.path, parent: r });
		}
		let o = {
			addIssue: a => {
				_(r, a), a.fatal ? t.abort() : t.dirty();
			},
			get path() {
				return r.path;
			},
		};
		if (o.addIssue = o.addIssue.bind(o), s.type === 'refinement') {
			let a = i => {
				let c = s.refinement(i, o);
				if (r.common.async) return Promise.resolve(c);
				if (c instanceof Promise) {
					throw new Error('Async refinement encountered during synchronous parse operation. Use .parseAsync instead.');
				}
				return i;
			};
			if (r.common.async === !1) {
				let i = this._def.schema._parseSync({ data: r.data, path: r.path, parent: r });
				return i.status === 'aborted'
					? K
					: (i.status === 'dirty' && t.dirty(), a(i.value), { status: t.value, value: i.value });
			} else {
				return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then(i =>
					i.status === 'aborted'
						? K
						: (i.status === 'dirty' && t.dirty(), a(i.value).then(() => ({ status: t.value, value: i.value })))
				);
			}
		}
		if (s.type === 'transform') {
			if (r.common.async === !1) {
				let a = this._def.schema._parseSync({ data: r.data, path: r.path, parent: r });
				if (!bs(a)) return a;
				let i = s.transform(a.value, o);
				if (i instanceof Promise) {
					throw new Error(
						'Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.',
					);
				}
				return { status: t.value, value: i };
			} else {
				return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then(a =>
					bs(a) ? Promise.resolve(s.transform(a.value, o)).then(i => ({ status: t.value, value: i })) : a
				);
			}
		}
		Q.assertNever(s);
	}
};
Me.create = (n, e, t) => new Me({ schema: n, typeName: I.ZodEffects, effect: e, ...j(t) });
Me.createWithPreprocess = (n, e, t) =>
	new Me({ schema: e, effect: { type: 'preprocess', transform: n }, typeName: I.ZodEffects, ...j(t) });
var Re = class extends U {
	_parse(e) {
		return this._getType(e) === A.undefined ? Ae(void 0) : this._def.innerType._parse(e);
	}
	unwrap() {
		return this._def.innerType;
	}
};
Re.create = (n, e) => new Re({ innerType: n, typeName: I.ZodOptional, ...j(e) });
var St = class extends U {
	_parse(e) {
		return this._getType(e) === A.null ? Ae(null) : this._def.innerType._parse(e);
	}
	unwrap() {
		return this._def.innerType;
	}
};
St.create = (n, e) => new St({ innerType: n, typeName: I.ZodNullable, ...j(e) });
var cn = class extends U {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e), r = t.data;
		return t.parsedType === A.undefined && (r = this._def.defaultValue()),
			this._def.innerType._parse({ data: r, path: t.path, parent: t });
	}
	removeDefault() {
		return this._def.innerType;
	}
};
cn.create = (n, e) => new Re({ innerType: n, typeName: I.ZodOptional, ...j(e) });
var Tr = class extends U {
	_parse(e) {
		if (this._getType(e) !== A.nan) {
			let r = this._getOrReturnCtx(e);
			return _(r, { code: b.invalid_type, expected: A.nan, received: r.parsedType }), K;
		}
		return { status: 'valid', value: e.data };
	}
};
Tr.create = n => new Tr({ typeName: I.ZodNaN, ...j(n) });
var _c = (n, e = {}, t) =>
		n
			? jt.create().superRefine((r, s) => {
				if (!n(r)) {
					let o = typeof e == 'function' ? e(r) : e, a = typeof o == 'string' ? { message: o } : o;
					s.addIssue({ code: 'custom', ...a, fatal: t });
				}
			})
			: jt.create(),
	mh = { object: W.lazycreate },
	I;
(function(n) {
	n.ZodString = 'ZodString',
		n.ZodNumber = 'ZodNumber',
		n.ZodNaN = 'ZodNaN',
		n.ZodBigInt = 'ZodBigInt',
		n.ZodBoolean = 'ZodBoolean',
		n.ZodDate = 'ZodDate',
		n.ZodUndefined = 'ZodUndefined',
		n.ZodNull = 'ZodNull',
		n.ZodAny = 'ZodAny',
		n.ZodUnknown = 'ZodUnknown',
		n.ZodNever = 'ZodNever',
		n.ZodVoid = 'ZodVoid',
		n.ZodArray = 'ZodArray',
		n.ZodObject = 'ZodObject',
		n.ZodUnion = 'ZodUnion',
		n.ZodDiscriminatedUnion = 'ZodDiscriminatedUnion',
		n.ZodIntersection = 'ZodIntersection',
		n.ZodTuple = 'ZodTuple',
		n.ZodRecord = 'ZodRecord',
		n.ZodMap = 'ZodMap',
		n.ZodSet = 'ZodSet',
		n.ZodFunction = 'ZodFunction',
		n.ZodLazy = 'ZodLazy',
		n.ZodLiteral = 'ZodLiteral',
		n.ZodEnum = 'ZodEnum',
		n.ZodEffects = 'ZodEffects',
		n.ZodNativeEnum = 'ZodNativeEnum',
		n.ZodOptional = 'ZodOptional',
		n.ZodNullable = 'ZodNullable',
		n.ZodDefault = 'ZodDefault',
		n.ZodPromise = 'ZodPromise';
})(I || (I = {}));
var yh = (n, e = { message: `Input not instance of ${n.name}` }) => _c(t => t instanceof n, e, !0),
	Cc = ct.create,
	Ec = bt.create,
	gh = Tr.create,
	vh = vr.create,
	Pc = wr.create,
	wh = br.create,
	bh = Ar.create,
	Ah = xr.create,
	xh = jt.create,
	Sh = it.create,
	kh = ut.create,
	Bh = Sr.create,
	_h = Ve.create,
	Ch = W.create,
	Eh = W.strictCreate,
	Ph = Zt.create,
	Th = kr.create,
	Nh = Wt.create,
	Ih = He.create,
	Kh = Yt.create,
	Oh = Br.create,
	Uh = At.create,
	$h = xt.create,
	Rh = _r.create,
	jh = Cr.create,
	Vh = Er.create,
	Hh = Pr.create,
	Mh = Vt.create,
	Bc = Me.create,
	Lh = Re.create,
	Dh = St.create,
	Fh = Me.createWithPreprocess,
	zh = () => Cc().optional(),
	Jh = () => Ec().optional(),
	qh = () => Pc().optional(),
	p = Object.freeze({
		__proto__: null,
		getParsedType: Rt,
		ZodParsedType: A,
		makeIssue: ws,
		EMPTY_PATH: ch,
		addIssueToContext: _,
		ParseStatus: ve,
		INVALID: K,
		DIRTY: uh,
		OK: Ae,
		isAborted: Wo,
		isDirty: Yo,
		isValid: bs,
		isAsync: Xo,
		ZodType: U,
		ZodString: ct,
		ZodNumber: bt,
		ZodBigInt: vr,
		ZodBoolean: wr,
		ZodDate: br,
		ZodUndefined: Ar,
		ZodNull: xr,
		ZodAny: jt,
		ZodUnknown: it,
		ZodNever: ut,
		ZodVoid: Sr,
		ZodArray: Ve,
		get objectUtil() {
			return As;
		},
		ZodObject: W,
		ZodUnion: Zt,
		ZodDiscriminatedUnion: kr,
		ZodIntersection: Wt,
		ZodTuple: He,
		ZodRecord: Yt,
		ZodMap: Br,
		ZodSet: At,
		ZodFunction: xt,
		ZodLazy: _r,
		ZodLiteral: Cr,
		ZodEnum: Er,
		ZodNativeEnum: Pr,
		ZodPromise: Vt,
		ZodEffects: Me,
		ZodTransformer: Me,
		ZodOptional: Re,
		ZodNullable: St,
		ZodDefault: cn,
		ZodNaN: Tr,
		custom: _c,
		Schema: U,
		ZodSchema: U,
		late: mh,
		get ZodFirstPartyTypeKind() {
			return I;
		},
		any: xh,
		array: _h,
		bigint: vh,
		boolean: Pc,
		date: wh,
		discriminatedUnion: Th,
		effect: Bc,
		enum: Vh,
		function: $h,
		instanceof: yh,
		intersection: Nh,
		lazy: Rh,
		literal: jh,
		map: Oh,
		nan: gh,
		nativeEnum: Hh,
		never: kh,
		null: Ah,
		nullable: Dh,
		number: Ec,
		object: Ch,
		oboolean: qh,
		onumber: Jh,
		optional: Lh,
		ostring: zh,
		preprocess: Fh,
		promise: Mh,
		record: Kh,
		set: Uh,
		strictObject: Eh,
		string: Cc,
		transformer: Bc,
		tuple: Ih,
		undefined: bh,
		union: Ph,
		unknown: Sh,
		void: Bh,
		ZodIssueCode: b,
		quotelessJson: ah,
		ZodError: Ne,
		defaultErrorMap: on,
		get overrideErrorMap() {
			return an;
		},
		setErrorMap: ih,
	});
var Gh = n => {
		let { rawSchema: e, isStringLike: t } = n,
			r = n.internalSchema ?? n.rawSchema,
			s = i => i,
			o = n.transformer ?? s,
			a = t ? r.transform(i => o(i)) : r.transform(i => o(i));
		return { rawSchema: e, internalSchema: r, schema: a };
	},
	Zh = n => {
		let e = Gh(n),
			{ parseErrMsg: t, unknownErrMsg: r } = n,
			s = l => {
				try {
					return Te(e.schema.parse(l));
				} catch (f) {
					let d = typeof t == 'string' ? t : t(l), y = typeof r == 'string' ? r : r(l);
					return f instanceof Ne ? bc(f, d, l) : Ac(f, y, l);
				}
			};
		return {
			schemas: e,
			factory: {
				make: l => s(l),
				of: s,
				create: l => e.schema.parse(l),
				from: l => e.schema.parse(l),
			},
		};
	},
	M = Zh;
var ea = p.object({
		networks: p.array(
			p.string({ description: 'Environment network' }).min(
				1,
				'Must reference the name of an existing network configuration',
			),
		),
		sandboxes: p.array(
			p.string({ description: 'Environment sandbox' }).min(
				1,
				'Must reference the name of an existing sandbox configuration',
			),
		),
		storage: p.record(p.any({ description: 'Environment storage value' }), { description: 'Environment storage' })
			.optional(),
	}).describe('Environment Config'),
	{ schemas: Tc, factory: Wh } = M({
		rawSchema: ea,
		parseErrMsg: n => `${n} is not an valid environment configuration`,
		unknownErrMsg: 'Something went wrong trying to parse the environment configuration',
	}),
	{ create: nb, make: sb, of: ob, from: Nc } = Wh,
	Ic = { ...Tc, schema: Tc.schema.transform(n => n) };
var ta = p.object({
		name: p.string({ description: 'Plugin Name' }).min(1),
		type: p.union([p.literal('npm'), p.literal('binary'), p.literal('deno')], { description: 'Plugin Type' }),
	}).describe('InstalledPlugin'),
	{ schemas: Oc, factory: Yh } = M({
		rawSchema: ta,
		parseErrMsg: n => `${n} is not a valid installed plugin`,
		unknownErrMsg: 'Something went wrong when parsing the installed plugin',
	}),
	{ create: cb, of: ub, make: lb } = Yh,
	Uc = { ...Oc, schema: Oc.schema.transform(n => n) };
var ra = p.string({ description: 'Protocol hash' }).refine(
		n => n.length === 51 && n[0] === 'P' && /[A-Za-z0-9]+/.test(n),
		n => ({ message: `${n} is an invalid hash for an economical protocol` }),
	),
	{ schemas: $c, factory: Qh } = M({
		rawSchema: ra,
		parseErrMsg: n => `${n} is an invalid economical protocol hash`,
		unknownErrMsg: 'Somethign went wrong trying to parse the economical protocol hash',
	}),
	{ create: pb, of: db, make: mb } = Qh,
	xs = { ...$c, schema: $c.schema.transform(n => n) };
var ep = p.string({ description: 'Public Key Hash' }).min(1).refine(
		n => n.startsWith('tz1'),
		n => ({ message: `${n} is not a valid public key hash` }),
	),
	{ schemas: jc, factory: tp } = M({
		isStringLike: !0,
		rawSchema: ep,
		parseErrMsg: n => `${n} is an invalid public key hash`,
		unknownErrMsg: 'Something went wrong parsing the public key hash',
	}),
	{ create: vb, of: wb, make: bb } = tp,
	Ss = { ...jc, schema: jc.schema.transform(n => n) };
var na = p.object({
		pkh: p.string({ description: 'Faucet Public Key Hash' }).min(1),
		mnemonic: p.array(p.string({ description: 'Faucet Mnemonic Word' }).min(1), { description: 'Faucet Mnemonic' }),
		email: p.string({ description: 'Faucet E-mail' }).regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
		password: p.string({ description: 'Faucet Password' }).min(1),
		amount: p.string({ description: 'Faucet Account' }).min(1).regex(/^\d+$/),
		activation_code: p.string({ description: 'Faucet Activation Code' }).min(1),
	}).describe('Faucet'),
	rp = p.object({
		pkh: Ss.schema,
		mnemonic: p.array(p.string({ description: 'Faucet Mnemonic Word' }).nonempty().regex(/^[a-z]{2,}$/), {
			description: 'Faucet Mnemonic',
		}),
		email: p.string({ description: 'Faucet E-mail' }).regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
		password: p.string({ description: 'Faucet Password' }).nonempty(),
		amount: p.string({ description: 'Faucet Account' }).nonempty().regex(/^\d+$/),
		activation_code: p.string({ description: 'Faucet Activation Code' }).nonempty(),
	}).describe('Faucet'),
	{ schemas: Hc, factory: np } = M({
		rawSchema: na,
		internalSchema: rp,
		parseErrMsg: n => `${n} is not a valid faucet configuration`,
		unknownErrMsg: 'Something went wrong trying to parse the faucet',
	}),
	{ create: kb, of: Bb, make: _b } = np,
	Mc = { ...Hc, schema: Hc.schema.transform(n => n) };
var sa = p.string({ description: 'Human Readable Identifier' }).regex(
		/^[A-Za-z]+[A-Za-z0-9-_ ]*$/,
		'Must be a valid human-readable identifier',
	),
	{ schemas: Lc, factory: op } = M({
		isStringLike: !0,
		rawSchema: sa,
		parseErrMsg: n => `${n} is not a valid human-readable identifier`,
		unknownErrMsg: 'Something went wrong trying to parse the human readable identifier',
	}),
	{ create: Pb, of: Tb, make: Nb } = op,
	ks = { ...Lc, schema: Lc.schema.transform(n => n) };
var oa = p.string({ description: 'Url' }).url(),
	{ schemas: Fc, factory: ap } = M({
		rawSchema: oa,
		isStringLike: !0,
		parseErrMsg: n => `${n} is an invalid url`,
		unknownErrMsg: 'Something went wrong trying to parse the url',
	});
var { create: Ob, of: Ub, make: $b } = ap, Bs = { ...Fc, schema: Fc.schema.transform(n => n) };
var aa = p.object({ label: sa, rpcUrl: oa, protocol: ra, faucet: na.describe('Network Faucet') }).describe(
		'Network Config',
	),
	ip = p.object({
		label: ks.schema.describe('Network Label'),
		rpcUrl: Bs.schema.describe('Network RPC Url'),
		protocol: xs.schema.describe('Network Protocol Hash'),
		faucet: Mc.schema.describe('Network Faucet'),
	}).describe('Network Config'),
	{ schemas: Jc, factory: cp } = M({
		rawSchema: aa,
		internalSchema: ip,
		parseErrMsg: n => `${n} is not a valid network configuration`,
		unknownErrMsg: 'Something went wrong trying to parse the network configuration',
	}),
	{ create: Hb, of: Mb, make: Lb } = cp,
	qc = { ...Jc, schema: Jc.schema.transform(n => n) };
var lp = p.object({
		encryptedKey: p.string({ description: 'Sandbox Account Encrypted Key' }).min(1),
		publicKeyHash: Ss.schema.describe('Sandbox Account Public Key Hash'),
		secretKey: p.string({ description: 'Sandbox Account Secret Key' }).min(1),
	}, { description: 'Sandbox Account Configuration' }),
	ia = p.object({
		encryptedKey: p.string({ description: 'Sandbox Account Encrypted Key' }).min(1),
		publicKeyHash: p.string({ description: 'Sandbox Account Public Key Hash' }).min(1),
		secretKey: p.string({ description: 'Sandbox Account Secret Key' }).min(1),
	}, { description: 'Sandbox Account Configuration' }),
	{ schemas: Gc, factory: fp } = M({
		rawSchema: ia,
		internalSchema: lp,
		parseErrMsg: 'The sandbox account configuration is invalid',
		unknownErrMsg: 'Something went wrong trying to parse the sandbox account configuration',
	}),
	{ create: zb, of: Jb, make: qb } = fp,
	Zc = { ...Gc, schema: Gc.schema.transform(n => n) };
var ca = p.string({ description: 'Verb' }).min(1, 'Must be a valid verb').regex(
		/^[A-Za-z\-\ ]+/,
		'Must be a valid verb',
	),
	{ factory: pp, schemas: Wc } = M({
		isStringLike: !0,
		rawSchema: ca,
		parseErrMsg: n => `${n} is not an invalid verb`,
		unknownErrMsg: 'Something went wrong trying to parse a verb',
	}),
	{ create: Wb, make: Yb, of: Xb } = pp,
	_s = { ...Wc, schema: Wc.schema.transform(n => n) };
var dp = p.record(p.union([p.string().nonempty(), Zc.schema])),
	ua = p.object({
		label: p.string({ description: 'Sandbox Label' }).min(1),
		rpcUrl: p.string({ description: 'Sandbox RPC Url' }).min(5).url(),
		protocol: p.string({ description: 'Sandbox Protocol Hash' }).min(8),
		attributes: p.record(p.union([p.string(), p.number(), p.boolean()], { description: 'Sandbox Attribute' }), {
			description: 'Sandbox Attributes',
		}).optional(),
		plugin: ca.describe('Sandbox Plugin').optional(),
		accounts: p.union([p.object({ default: p.string().min(1) }), p.record(ia)], { description: 'Sandbox Accounts' })
			.optional(),
	}),
	mp = p.object({
		label: ks.schema.describe('Sandbox Label'),
		rpcUrl: Bs.schema.describe('Sandbox RPC Url'),
		protocol: xs.schema.describe('Sandbox Protocol Hash'),
		attributes: p.record(p.union([p.string(), p.number(), p.boolean()]), { description: 'Sandbox Attributes' })
			.optional(),
		plugin: _s.schema.describe('Sandbox Plugin').optional(),
		accounts: dp.optional(),
	}, { description: 'Sandbox Configuration' }),
	{ schemas: Xc, factory: yp } = M({
		rawSchema: ua,
		internalSchema: mp,
		parseErrMsg: n => `${n} is not a valid sandbox configuration `,
		unknownErrMsg: 'Something went wrong trying to parse the sandbox configuration',
	}),
	{ create: tA, of: rA, make: nA } = yp,
	Qc = { ...Xc, schema: Xc.schema.transform(n => n) };
var Cs = p.string({ description: 'Tz' }).min(1).regex(/^\d([\d_]+\d)?$/),
	{ schemas: eu, factory: vp } = M({
		isStringLike: !0,
		rawSchema: Cs,
		parseErrMsg: n => `${n} is an invalid Tz amount`,
		unknownErrMsg: 'Something went wrong when parsing the Tz amount',
	}),
	{ create: aA, of: iA, make: cA } = vp,
	uA = { ...eu, schema: eu.schema.transform(n => n) };
var bp = p.preprocess(n => n ?? [], p.array(ta, { description: 'config.plugins' })),
	Ap = p.preprocess(n => n ?? [], p.array(Uc.schema, { description: 'config.plugins' })),
	xp = p.record(
		p.union([
			qc.schema,
			p.string({ description: 'config.network' }).nonempty(
				'Default network must reference the name of an  existing network configuration.',
			),
		]),
		{ description: 'Network configurations' },
	).optional(),
	Sp = p.record(
		p.union([
			Qc.schema,
			p.string({ description: 'config.sandbox' }).min(
				1,
				'Default sandbox must reference the name of an existing sandbox configuration.',
			),
		]),
		{ description: 'Sandbox configurations' },
	).optional(),
	kp = p.record(
		p.union([Ic.schema, p.string().min(1, 'Default environment must reference the name of an existing environment.')]),
		{ description: 'Environment configurations' },
	).optional(),
	Bp = p.preprocess(
		n => n ?? { bob: '5_000_000_000', alice: '5_000_000_000', john: '5_000_000_000' },
		p.record(p.union([Cs, p.number()]), { description: 'config.accounts' }),
	),
	ru = p.object({
		language: p.preprocess(
			n => n ?? 'en',
			p.union([p.literal('en'), p.literal('fr')], { description: 'config.language' }).optional(),
		),
		plugins: Ap.optional(),
		contractsDir: p.preprocess(
			n => n ?? 'contracts',
			p.string({ description: 'config.contractsDir' }).min(1, 'config.contractsDir must have a value'),
		),
		artifactsDir: p.preprocess(
			n => n ?? 'artifacts',
			p.string({ description: 'config.artifactsDir' }).min(1, 'config.artifactsDir must have a value'),
		),
	}).describe('config'),
	_p = ru.extend({ network: xp, sandbox: Sp, environment: kp, accounts: Bp }),
	Cp = ru.extend({
		plugins: bp.optional(),
		network: p.record(
			p.union([
				aa,
				p.string({ description: 'config.network' }).min(
					1,
					'Default network must reference the name of an  existing network configuration.',
				),
			]),
		).optional(),
		sandbox: p.record(
			p.union([
				ua,
				p.string({ description: 'config.sandbox' }).min(
					1,
					'Default sandbox must reference the name of an existing sandbox configuration.',
				),
			]),
		).optional(),
		environment: p.record(
			p.union([
				ea,
				p.string({ description: 'config.environment' }).min(
					1,
					'Default environment must reference the name of an existing environment.',
				),
			]),
		).optional(),
		accounts: p.record(p.union([Cs, p.number()]), { description: 'config.accounts' }).optional(),
	}).describe('config'),
	{ schemas: tu, factory: Ep } = M({
		rawSchema: Cp,
		internalSchema: _p,
		parseErrMsg: n => `${n} is not a configuration`,
		unknownErrMsg: 'Something went wrong trying to parse your configuration',
	}),
	{ create: nu, of: pA, make: dA } = Ep,
	mA = { ...tu, schema: tu.schema.transform(n => n) };
var Xd = Gr(uf());
var Hi = p.string({ description: 'SHA256' }).length(64),
	{ schemas: lf, factory: Qd } = M({
		isStringLike: !0,
		rawSchema: Hi,
		parseErrMsg: n => `${n} is an invalid SHA256 hash`,
		unknownErrMsg: n => `Something went wrong trying to parse the following as a SHA256 value, ${n}`,
	});
var { create: XA, of: QA, make: ex } = Qd, ff = { ...lf, schema: lf.schema.transform(n => n) };
var Po = p.number({ description: 'Timestamp' }).min(1651846877),
	{ factory: tm, schemas: hf } = M({
		isStringLike: !0,
		rawSchema: Po,
		parseErrMsg: n => `${n} is an invalid timestamp`,
		unknownErrMsg: 'Something went wrong trying to parse a timestamp',
	}),
	{ create: nx, make: sx, of: ox } = tm,
	Mi = { ...hf, schema: hf.schema.transform(n => n) };
var nm = p.object({
		hash: Hi.describe('state.op.hash'),
		time: Po.describe('state.op.time'),
		output: p.unknown().describe('state.op.output'),
	}).describe('Persistent State Operation'),
	sm = p.object({ time: Po.describe('state.task.time'), output: p.unknown().describe('state.task.output') }),
	om = p.object({
		hash: ff.schema.describe('state.op.hash'),
		time: Mi.schema.describe('state.op.time'),
		output: p.unknown().describe('state.op.output'),
	}),
	am = p.object({
		task: _s.schema,
		plugin: p.string().min(1),
		time: Mi.schema.describe('state.task.time'),
		output: p.unknown().describe('state.op.output'),
	}),
	im = p.object({ operations: p.record(nm), tasks: p.record(sm) }),
	cx = p.object({ operations: p.record(om), tasks: p.record(am) }).transform(n => ({
		operations: n.operations,
		tasks: n.tasks,
	})),
	{ schemas: pf, factory: cm } = M({
		rawSchema: im,
		parseErrMsg: 'The persistent state is invalid',
		unknownErrMsg: 'Something went wrong trying to parse the persistent state',
	}),
	{ create: df, of: ux, make: lx } = cm,
	fx = { ...pf, schema: pf.schema.transform(n => n) };
var is = require('fs/promises'), ur = require('path');
var mf = (n, e, t, r) => ({
	getConfig: () => e,
	getState: () => t,
	getProjectAbsPath: () => n,
	getOriginations: c =>
		Object.keys(t.tasks).reduce((u, l) => /taquito/.test(l) ? [...u, t.tasks[l]] : u, []).sort((u, l) =>
			u > l ? 1 : u == l ? 0 : -1
		).reduce((u, l) => {
			let f = l.output;
			return [...u, ...f.map(d => ({ ...d, time: l.time }))];
		}, []).filter(u => c ? u.contract === c : !0),
});
var yf = async (n = './') => {
		let e = (0, ur.resolve)(n);
		if (/^(\/|[A-Z]:\\?)$/.test(e)) throw 'Could not find project directory';
		let t = (0, ur.join)(e, '.taq', 'config.json');
		try {
			let r = await (0, is.stat)(t);
			return t.replace('.taq/config.json', '');
		} catch {
			return await yf((0, ur.join)(e, '../'));
		}
	},
	lm = async n => {
		try {
			let e = (0, ur.join)(n, '.taq', 'config.json'), t = await (0, is.readFile)(e, 'utf-8'), r = JSON.parse(t);
			return nu(r);
		} catch {
			throw 'Could not load .taq/config.json';
		}
	},
	fm = async (n, e) => {
		try {
			let t = (0, ur.join)(n, '.taq', `${e}-state.json`), r = await (0, is.readFile)(t, 'utf-8'), s = JSON.parse(r);
			return df(s);
		} catch {
			throw 'Could not load .taq/config.json';
		}
	},
	hm = async (n, e) => {
		let t = await yf(n),
			r = await lm(t),
			s = () => {
				if (!r.environment) throw 'No environment configuration exists in your .taq/config.json file';
				let i = (e || r.environment.default) ?? Object.keys(r.environment).filter(u => u !== 'storage').shift();
				if (!i) throw 'Your environment configuration is invalid in your .taq/config.json file';
				let c = String(i);
				return [c, Nc(r.environment[c])];
			},
			o = e || s()[0],
			a = await fm(t, o);
		return { ...mf(t, r, a, e), getCurrentEnv: s };
	};
0 && (module.exports = {});
/*!
 * Copyright (c) 2014, GMO GlobalSign
 * Copyright (c) 2015-2022, Peculiar Ventures
 * All rights reserved.
 *
 * Author 2014-2019, Yury Strozhevsky
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice, this
 *   list of conditions and the following disclaimer in the documentation and/or
 *   other materials provided with the distribution.
 *
 * * Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
/*!
 * MIT License
 *
 * Copyright (c) 2017-2022 Peculiar Ventures, LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */
/*!
 Copyright (c) Peculiar Ventures, LLC
*/
// # sourceMappingURL=index.js.map
