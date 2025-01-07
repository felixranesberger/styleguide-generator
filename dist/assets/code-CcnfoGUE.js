var pn = Object.defineProperty;
var gn = (n, e, t) => e in n ? pn(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var p = (n, e, t) => gn(n, typeof e != "symbol" ? e + "" : e, t);
let q = class extends Error {
  constructor(e) {
    super(e), this.name = "ShikiError";
  }
}, Xe = class extends Error {
  constructor(e) {
    super(e), this.name = "ShikiError";
  }
};
function mn() {
  return 2147483648;
}
function yn() {
  return typeof performance < "u" ? performance.now() : Date.now();
}
const _n = (n, e) => n + (e - n % e) % e;
async function bn(n) {
  let e, t;
  const r = {};
  function s(f) {
    t = f, r.HEAPU8 = new Uint8Array(f), r.HEAPU32 = new Uint32Array(f);
  }
  function o(f, g, C) {
    r.HEAPU8.copyWithin(f, g, g + C);
  }
  function i(f) {
    try {
      return e.grow(f - t.byteLength + 65535 >>> 16), s(e.buffer), 1;
    } catch {
    }
  }
  function l(f) {
    const g = r.HEAPU8.length;
    f = f >>> 0;
    const C = mn();
    if (f > C)
      return !1;
    for (let _ = 1; _ <= 4; _ *= 2) {
      let y = g * (1 + 0.2 / _);
      y = Math.min(y, f + 100663296);
      const b = Math.min(C, _n(Math.max(f, y), 65536));
      if (i(b))
        return !0;
    }
    return !1;
  }
  const a = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0;
  function c(f, g, C = 1024) {
    const _ = g + C;
    let y = g;
    for (; f[y] && !(y >= _); )
      ++y;
    if (y - g > 16 && f.buffer && a)
      return a.decode(f.subarray(g, y));
    let b = "";
    for (; g < y; ) {
      let S = f[g++];
      if (!(S & 128)) {
        b += String.fromCharCode(S);
        continue;
      }
      const v = f[g++] & 63;
      if ((S & 224) === 192) {
        b += String.fromCharCode((S & 31) << 6 | v);
        continue;
      }
      const R = f[g++] & 63;
      if ((S & 240) === 224 ? S = (S & 15) << 12 | v << 6 | R : S = (S & 7) << 18 | v << 12 | R << 6 | f[g++] & 63, S < 65536)
        b += String.fromCharCode(S);
      else {
        const L = S - 65536;
        b += String.fromCharCode(55296 | L >> 10, 56320 | L & 1023);
      }
    }
    return b;
  }
  function u(f, g) {
    return f ? c(r.HEAPU8, f, g) : "";
  }
  const h = {
    emscripten_get_now: yn,
    emscripten_memcpy_big: o,
    emscripten_resize_heap: l,
    fd_write: () => 0
  };
  async function d() {
    const g = await n({
      env: h,
      wasi_snapshot_preview1: h
    });
    e = g.memory, s(e.buffer), Object.assign(r, g), r.UTF8ToString = u;
  }
  return await d(), r;
}
var Sn = Object.defineProperty, Cn = (n, e, t) => e in n ? Sn(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, N = (n, e, t) => (Cn(n, typeof e != "symbol" ? e + "" : e, t), t);
let x = null;
function wn(n) {
  throw new Xe(n.UTF8ToString(n.getLastOnigError()));
}
class Ne {
  constructor(e) {
    N(this, "utf16Length"), N(this, "utf8Length"), N(this, "utf16Value"), N(this, "utf8Value"), N(this, "utf16OffsetToUtf8"), N(this, "utf8OffsetToUtf16");
    const t = e.length, r = Ne._utf8ByteLength(e), s = r !== t, o = s ? new Uint32Array(t + 1) : null;
    s && (o[t] = r);
    const i = s ? new Uint32Array(r + 1) : null;
    s && (i[r] = t);
    const l = new Uint8Array(r);
    let a = 0;
    for (let c = 0; c < t; c++) {
      const u = e.charCodeAt(c);
      let h = u, d = !1;
      if (u >= 55296 && u <= 56319 && c + 1 < t) {
        const f = e.charCodeAt(c + 1);
        f >= 56320 && f <= 57343 && (h = (u - 55296 << 10) + 65536 | f - 56320, d = !0);
      }
      s && (o[c] = a, d && (o[c + 1] = a), h <= 127 ? i[a + 0] = c : h <= 2047 ? (i[a + 0] = c, i[a + 1] = c) : h <= 65535 ? (i[a + 0] = c, i[a + 1] = c, i[a + 2] = c) : (i[a + 0] = c, i[a + 1] = c, i[a + 2] = c, i[a + 3] = c)), h <= 127 ? l[a++] = h : h <= 2047 ? (l[a++] = 192 | (h & 1984) >>> 6, l[a++] = 128 | (h & 63) >>> 0) : h <= 65535 ? (l[a++] = 224 | (h & 61440) >>> 12, l[a++] = 128 | (h & 4032) >>> 6, l[a++] = 128 | (h & 63) >>> 0) : (l[a++] = 240 | (h & 1835008) >>> 18, l[a++] = 128 | (h & 258048) >>> 12, l[a++] = 128 | (h & 4032) >>> 6, l[a++] = 128 | (h & 63) >>> 0), d && c++;
    }
    this.utf16Length = t, this.utf8Length = r, this.utf16Value = e, this.utf8Value = l, this.utf16OffsetToUtf8 = o, this.utf8OffsetToUtf16 = i;
  }
  static _utf8ByteLength(e) {
    let t = 0;
    for (let r = 0, s = e.length; r < s; r++) {
      const o = e.charCodeAt(r);
      let i = o, l = !1;
      if (o >= 55296 && o <= 56319 && r + 1 < s) {
        const a = e.charCodeAt(r + 1);
        a >= 56320 && a <= 57343 && (i = (o - 55296 << 10) + 65536 | a - 56320, l = !0);
      }
      i <= 127 ? t += 1 : i <= 2047 ? t += 2 : i <= 65535 ? t += 3 : t += 4, l && r++;
    }
    return t;
  }
  createString(e) {
    const t = e.omalloc(this.utf8Length);
    return e.HEAPU8.set(this.utf8Value, t), t;
  }
}
const D = class {
  constructor(n) {
    if (N(this, "id", ++D.LAST_ID), N(this, "_onigBinding"), N(this, "content"), N(this, "utf16Length"), N(this, "utf8Length"), N(this, "utf16OffsetToUtf8"), N(this, "utf8OffsetToUtf16"), N(this, "ptr"), !x)
      throw new Xe("Must invoke loadWasm first.");
    this._onigBinding = x, this.content = n;
    const e = new Ne(n);
    this.utf16Length = e.utf16Length, this.utf8Length = e.utf8Length, this.utf16OffsetToUtf8 = e.utf16OffsetToUtf8, this.utf8OffsetToUtf16 = e.utf8OffsetToUtf16, this.utf8Length < 1e4 && !D._sharedPtrInUse ? (D._sharedPtr || (D._sharedPtr = x.omalloc(1e4)), D._sharedPtrInUse = !0, x.HEAPU8.set(e.utf8Value, D._sharedPtr), this.ptr = D._sharedPtr) : this.ptr = e.createString(x);
  }
  convertUtf8OffsetToUtf16(n) {
    return this.utf8OffsetToUtf16 ? n < 0 ? 0 : n > this.utf8Length ? this.utf16Length : this.utf8OffsetToUtf16[n] : n;
  }
  convertUtf16OffsetToUtf8(n) {
    return this.utf16OffsetToUtf8 ? n < 0 ? 0 : n > this.utf16Length ? this.utf8Length : this.utf16OffsetToUtf8[n] : n;
  }
  dispose() {
    this.ptr === D._sharedPtr ? D._sharedPtrInUse = !1 : this._onigBinding.ofree(this.ptr);
  }
};
let le = D;
N(le, "LAST_ID", 0);
N(le, "_sharedPtr", 0);
N(le, "_sharedPtrInUse", !1);
class vn {
  constructor(e) {
    if (N(this, "_onigBinding"), N(this, "_ptr"), !x)
      throw new Xe("Must invoke loadWasm first.");
    const t = [], r = [];
    for (let l = 0, a = e.length; l < a; l++) {
      const c = new Ne(e[l]);
      t[l] = c.createString(x), r[l] = c.utf8Length;
    }
    const s = x.omalloc(4 * e.length);
    x.HEAPU32.set(t, s / 4);
    const o = x.omalloc(4 * e.length);
    x.HEAPU32.set(r, o / 4);
    const i = x.createOnigScanner(s, o, e.length);
    for (let l = 0, a = e.length; l < a; l++)
      x.ofree(t[l]);
    x.ofree(o), x.ofree(s), i === 0 && wn(x), this._onigBinding = x, this._ptr = i;
  }
  dispose() {
    this._onigBinding.freeOnigScanner(this._ptr);
  }
  findNextMatchSync(e, t, r) {
    let s = 0;
    if (typeof r == "number" && (s = r), typeof e == "string") {
      e = new le(e);
      const o = this._findNextMatchSync(e, t, !1, s);
      return e.dispose(), o;
    }
    return this._findNextMatchSync(e, t, !1, s);
  }
  _findNextMatchSync(e, t, r, s) {
    const o = this._onigBinding, i = o.findNextOnigScannerMatch(this._ptr, e.id, e.ptr, e.utf8Length, e.convertUtf16OffsetToUtf8(t), s);
    if (i === 0)
      return null;
    const l = o.HEAPU32;
    let a = i / 4;
    const c = l[a++], u = l[a++], h = [];
    for (let d = 0; d < u; d++) {
      const f = e.convertUtf8OffsetToUtf16(l[a++]), g = e.convertUtf8OffsetToUtf16(l[a++]);
      h[d] = {
        start: f,
        end: g,
        length: g - f
      };
    }
    return {
      index: c,
      captureIndices: h
    };
  }
}
function kn(n) {
  return typeof n.instantiator == "function";
}
function Rn(n) {
  return typeof n.default == "function";
}
function An(n) {
  return typeof n.data < "u";
}
function Pn(n) {
  return typeof Response < "u" && n instanceof Response;
}
function Nn(n) {
  var e;
  return typeof ArrayBuffer < "u" && (n instanceof ArrayBuffer || ArrayBuffer.isView(n)) || typeof Buffer < "u" && ((e = Buffer.isBuffer) == null ? void 0 : e.call(Buffer, n)) || typeof SharedArrayBuffer < "u" && n instanceof SharedArrayBuffer || typeof Uint32Array < "u" && n instanceof Uint32Array;
}
let fe;
function Tn(n) {
  if (fe)
    return fe;
  async function e() {
    x = await bn(async (t) => {
      let r = n;
      return r = await r, typeof r == "function" && (r = await r(t)), typeof r == "function" && (r = await r(t)), kn(r) ? r = await r.instantiator(t) : Rn(r) ? r = await r.default(t) : (An(r) && (r = r.data), Pn(r) ? typeof WebAssembly.instantiateStreaming == "function" ? r = await xn(r)(t) : r = await En(r)(t) : Nn(r) ? r = await Le(r)(t) : r instanceof WebAssembly.Module ? r = await Le(r)(t) : "default" in r && r.default instanceof WebAssembly.Module && (r = await Le(r.default)(t))), "instance" in r && (r = r.instance), "exports" in r && (r = r.exports), r;
    });
  }
  return fe = e(), fe;
}
function Le(n) {
  return (e) => WebAssembly.instantiate(n, e);
}
function xn(n) {
  return (e) => WebAssembly.instantiateStreaming(n, e);
}
function En(n) {
  return async (e) => {
    const t = await n.arrayBuffer();
    return WebAssembly.instantiate(t, e);
  };
}
let In;
function Ln() {
  return In;
}
async function Tt(n) {
  return n && await Tn(n), {
    createScanner(e) {
      return new vn(e.map((t) => typeof t == "string" ? t : t.source));
    },
    createString(e) {
      return new le(e);
    }
  };
}
function On(n) {
  return Je(n);
}
function Je(n) {
  return Array.isArray(n) ? Mn(n) : n instanceof RegExp ? n : typeof n == "object" ? Bn(n) : n;
}
function Mn(n) {
  let e = [];
  for (let t = 0, r = n.length; t < r; t++)
    e[t] = Je(n[t]);
  return e;
}
function Bn(n) {
  let e = {};
  for (let t in n)
    e[t] = Je(n[t]);
  return e;
}
function xt(n, ...e) {
  return e.forEach((t) => {
    for (let r in t)
      n[r] = t[r];
  }), n;
}
function Et(n) {
  const e = ~n.lastIndexOf("/") || ~n.lastIndexOf("\\");
  return e === 0 ? n : ~e === n.length - 1 ? Et(n.substring(0, n.length - 1)) : n.substr(~e + 1);
}
var Oe = /\$(\d+)|\${(\d+):\/(downcase|upcase)}/g, de = class {
  static hasCaptures(n) {
    return n === null ? !1 : (Oe.lastIndex = 0, Oe.test(n));
  }
  static replaceCaptures(n, e, t) {
    return n.replace(Oe, (r, s, o, i) => {
      let l = t[parseInt(s || o, 10)];
      if (l) {
        let a = e.substring(l.start, l.end);
        for (; a[0] === "."; )
          a = a.substring(1);
        switch (i) {
          case "downcase":
            return a.toLowerCase();
          case "upcase":
            return a.toUpperCase();
          default:
            return a;
        }
      } else
        return r;
    });
  }
};
function It(n, e) {
  return n < e ? -1 : n > e ? 1 : 0;
}
function Lt(n, e) {
  if (n === null && e === null)
    return 0;
  if (!n)
    return -1;
  if (!e)
    return 1;
  let t = n.length, r = e.length;
  if (t === r) {
    for (let s = 0; s < t; s++) {
      let o = It(n[s], e[s]);
      if (o !== 0)
        return o;
    }
    return 0;
  }
  return t - r;
}
function at(n) {
  return !!(/^#[0-9a-f]{6}$/i.test(n) || /^#[0-9a-f]{8}$/i.test(n) || /^#[0-9a-f]{3}$/i.test(n) || /^#[0-9a-f]{4}$/i.test(n));
}
function Ot(n) {
  return n.replace(/[\-\\\{\}\*\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, "\\$&");
}
var Mt = class {
  constructor(n) {
    p(this, "cache", /* @__PURE__ */ new Map());
    this.fn = n;
  }
  get(n) {
    if (this.cache.has(n))
      return this.cache.get(n);
    const e = this.fn(n);
    return this.cache.set(n, e), e;
  }
}, _e = class {
  constructor(n, e, t) {
    p(this, "_cachedMatchRoot", new Mt(
      (n) => this._root.match(n)
    ));
    this._colorMap = n, this._defaults = e, this._root = t;
  }
  static createFromRawTheme(n, e) {
    return this.createFromParsedTheme(Un(n), e);
  }
  static createFromParsedTheme(n, e) {
    return $n(n, e);
  }
  getColorMap() {
    return this._colorMap.getColorMap();
  }
  getDefaults() {
    return this._defaults;
  }
  match(n) {
    if (n === null)
      return this._defaults;
    const e = n.scopeName, r = this._cachedMatchRoot.get(e).find(
      (s) => Gn(n.parent, s.parentScopes)
    );
    return r ? new Bt(
      r.fontStyle,
      r.foreground,
      r.background
    ) : null;
  }
}, Me = class me {
  constructor(e, t) {
    this.parent = e, this.scopeName = t;
  }
  static push(e, t) {
    for (const r of t)
      e = new me(e, r);
    return e;
  }
  static from(...e) {
    let t = null;
    for (let r = 0; r < e.length; r++)
      t = new me(t, e[r]);
    return t;
  }
  push(e) {
    return new me(this, e);
  }
  getSegments() {
    let e = this;
    const t = [];
    for (; e; )
      t.push(e.scopeName), e = e.parent;
    return t.reverse(), t;
  }
  toString() {
    return this.getSegments().join(" ");
  }
  extends(e) {
    return this === e ? !0 : this.parent === null ? !1 : this.parent.extends(e);
  }
  getExtensionIfDefined(e) {
    const t = [];
    let r = this;
    for (; r && r !== e; )
      t.push(r.scopeName), r = r.parent;
    return r === e ? t.reverse() : void 0;
  }
};
function Gn(n, e) {
  if (e.length === 0)
    return !0;
  for (let t = 0; t < e.length; t++) {
    let r = e[t], s = !1;
    if (r === ">") {
      if (t === e.length - 1)
        return !1;
      r = e[++t], s = !0;
    }
    for (; n && !Dn(n.scopeName, r); ) {
      if (s)
        return !1;
      n = n.parent;
    }
    if (!n)
      return !1;
    n = n.parent;
  }
  return !0;
}
function Dn(n, e) {
  return e === n || n.startsWith(e) && n[e.length] === ".";
}
var Bt = class {
  constructor(n, e, t) {
    this.fontStyle = n, this.foregroundId = e, this.backgroundId = t;
  }
};
function Un(n) {
  if (!n)
    return [];
  if (!n.settings || !Array.isArray(n.settings))
    return [];
  let e = n.settings, t = [], r = 0;
  for (let s = 0, o = e.length; s < o; s++) {
    let i = e[s];
    if (!i.settings)
      continue;
    let l;
    if (typeof i.scope == "string") {
      let h = i.scope;
      h = h.replace(/^[,]+/, ""), h = h.replace(/[,]+$/, ""), l = h.split(",");
    } else Array.isArray(i.scope) ? l = i.scope : l = [""];
    let a = -1;
    if (typeof i.settings.fontStyle == "string") {
      a = 0;
      let h = i.settings.fontStyle.split(" ");
      for (let d = 0, f = h.length; d < f; d++)
        switch (h[d]) {
          case "italic":
            a = a | 1;
            break;
          case "bold":
            a = a | 2;
            break;
          case "underline":
            a = a | 4;
            break;
          case "strikethrough":
            a = a | 8;
            break;
        }
    }
    let c = null;
    typeof i.settings.foreground == "string" && at(i.settings.foreground) && (c = i.settings.foreground);
    let u = null;
    typeof i.settings.background == "string" && at(i.settings.background) && (u = i.settings.background);
    for (let h = 0, d = l.length; h < d; h++) {
      let g = l[h].trim().split(" "), C = g[g.length - 1], _ = null;
      g.length > 1 && (_ = g.slice(0, g.length - 1), _.reverse()), t[r++] = new jn(
        C,
        _,
        s,
        a,
        c,
        u
      );
    }
  }
  return t;
}
var jn = class {
  constructor(n, e, t, r, s, o) {
    this.scope = n, this.parentScopes = e, this.index = t, this.fontStyle = r, this.foreground = s, this.background = o;
  }
}, W = /* @__PURE__ */ ((n) => (n[n.NotSet = -1] = "NotSet", n[n.None = 0] = "None", n[n.Italic = 1] = "Italic", n[n.Bold = 2] = "Bold", n[n.Underline = 4] = "Underline", n[n.Strikethrough = 8] = "Strikethrough", n))(W || {});
function $n(n, e) {
  n.sort((a, c) => {
    let u = It(a.scope, c.scope);
    return u !== 0 || (u = Lt(a.parentScopes, c.parentScopes), u !== 0) ? u : a.index - c.index;
  });
  let t = 0, r = "#000000", s = "#ffffff";
  for (; n.length >= 1 && n[0].scope === ""; ) {
    let a = n.shift();
    a.fontStyle !== -1 && (t = a.fontStyle), a.foreground !== null && (r = a.foreground), a.background !== null && (s = a.background);
  }
  let o = new Fn(e), i = new Bt(t, o.getId(r), o.getId(s)), l = new zn(new $e(0, null, -1, 0, 0), []);
  for (let a = 0, c = n.length; a < c; a++) {
    let u = n[a];
    l.insert(0, u.scope, u.parentScopes, u.fontStyle, o.getId(u.foreground), o.getId(u.background));
  }
  return new _e(o, i, l);
}
var Fn = class {
  constructor(n) {
    p(this, "_isFrozen");
    p(this, "_lastColorId");
    p(this, "_id2color");
    p(this, "_color2id");
    if (this._lastColorId = 0, this._id2color = [], this._color2id = /* @__PURE__ */ Object.create(null), Array.isArray(n)) {
      this._isFrozen = !0;
      for (let e = 0, t = n.length; e < t; e++)
        this._color2id[n[e]] = e, this._id2color[e] = n[e];
    } else
      this._isFrozen = !1;
  }
  getId(n) {
    if (n === null)
      return 0;
    n = n.toUpperCase();
    let e = this._color2id[n];
    if (e)
      return e;
    if (this._isFrozen)
      throw new Error(`Missing color in color map - ${n}`);
    return e = ++this._lastColorId, this._color2id[n] = e, this._id2color[e] = n, e;
  }
  getColorMap() {
    return this._id2color.slice(0);
  }
}, Wn = Object.freeze([]), $e = class Gt {
  constructor(e, t, r, s, o) {
    p(this, "scopeDepth");
    p(this, "parentScopes");
    p(this, "fontStyle");
    p(this, "foreground");
    p(this, "background");
    this.scopeDepth = e, this.parentScopes = t || Wn, this.fontStyle = r, this.foreground = s, this.background = o;
  }
  clone() {
    return new Gt(this.scopeDepth, this.parentScopes, this.fontStyle, this.foreground, this.background);
  }
  static cloneArr(e) {
    let t = [];
    for (let r = 0, s = e.length; r < s; r++)
      t[r] = e[r].clone();
    return t;
  }
  acceptOverwrite(e, t, r, s) {
    this.scopeDepth > e ? console.log("how did this happen?") : this.scopeDepth = e, t !== -1 && (this.fontStyle = t), r !== 0 && (this.foreground = r), s !== 0 && (this.background = s);
  }
}, zn = class Fe {
  constructor(e, t = [], r = {}) {
    p(this, "_rulesWithParentScopes");
    this._mainRule = e, this._children = r, this._rulesWithParentScopes = t;
  }
  static _cmpBySpecificity(e, t) {
    if (e.scopeDepth !== t.scopeDepth)
      return t.scopeDepth - e.scopeDepth;
    let r = 0, s = 0;
    for (; e.parentScopes[r] === ">" && r++, t.parentScopes[s] === ">" && s++, !(r >= e.parentScopes.length || s >= t.parentScopes.length); ) {
      const o = t.parentScopes[s].length - e.parentScopes[r].length;
      if (o !== 0)
        return o;
      r++, s++;
    }
    return t.parentScopes.length - e.parentScopes.length;
  }
  match(e) {
    if (e !== "") {
      let r = e.indexOf("."), s, o;
      if (r === -1 ? (s = e, o = "") : (s = e.substring(0, r), o = e.substring(r + 1)), this._children.hasOwnProperty(s))
        return this._children[s].match(o);
    }
    const t = this._rulesWithParentScopes.concat(this._mainRule);
    return t.sort(Fe._cmpBySpecificity), t;
  }
  insert(e, t, r, s, o, i) {
    if (t === "") {
      this._doInsertHere(e, r, s, o, i);
      return;
    }
    let l = t.indexOf("."), a, c;
    l === -1 ? (a = t, c = "") : (a = t.substring(0, l), c = t.substring(l + 1));
    let u;
    this._children.hasOwnProperty(a) ? u = this._children[a] : (u = new Fe(this._mainRule.clone(), $e.cloneArr(this._rulesWithParentScopes)), this._children[a] = u), u.insert(e + 1, c, r, s, o, i);
  }
  _doInsertHere(e, t, r, s, o) {
    if (t === null) {
      this._mainRule.acceptOverwrite(e, r, s, o);
      return;
    }
    for (let i = 0, l = this._rulesWithParentScopes.length; i < l; i++) {
      let a = this._rulesWithParentScopes[i];
      if (Lt(a.parentScopes, t) === 0) {
        a.acceptOverwrite(e, r, s, o);
        return;
      }
    }
    r === -1 && (r = this._mainRule.fontStyle), s === 0 && (s = this._mainRule.foreground), o === 0 && (o = this._mainRule.background), this._rulesWithParentScopes.push(new $e(e, t, r, s, o));
  }
}, J = class M {
  static toBinaryStr(e) {
    return e.toString(2).padStart(32, "0");
  }
  static print(e) {
    const t = M.getLanguageId(e), r = M.getTokenType(e), s = M.getFontStyle(e), o = M.getForeground(e), i = M.getBackground(e);
    console.log({
      languageId: t,
      tokenType: r,
      fontStyle: s,
      foreground: o,
      background: i
    });
  }
  static getLanguageId(e) {
    return (e & 255) >>> 0;
  }
  static getTokenType(e) {
    return (e & 768) >>> 8;
  }
  static containsBalancedBrackets(e) {
    return (e & 1024) !== 0;
  }
  static getFontStyle(e) {
    return (e & 30720) >>> 11;
  }
  static getForeground(e) {
    return (e & 16744448) >>> 15;
  }
  static getBackground(e) {
    return (e & 4278190080) >>> 24;
  }
  /**
   * Updates the fields in `metadata`.
   * A value of `0`, `NotSet` or `null` indicates that the corresponding field should be left as is.
   */
  static set(e, t, r, s, o, i, l) {
    let a = M.getLanguageId(e), c = M.getTokenType(e), u = M.containsBalancedBrackets(e) ? 1 : 0, h = M.getFontStyle(e), d = M.getForeground(e), f = M.getBackground(e);
    return t !== 0 && (a = t), r !== 8 && (c = r), s !== null && (u = s ? 1 : 0), o !== -1 && (h = o), i !== 0 && (d = i), l !== 0 && (f = l), (a << 0 | c << 8 | u << 10 | h << 11 | d << 15 | f << 24) >>> 0;
  }
};
function be(n, e) {
  const t = [], r = Hn(n);
  let s = r.next();
  for (; s !== null; ) {
    let a = 0;
    if (s.length === 2 && s.charAt(1) === ":") {
      switch (s.charAt(0)) {
        case "R":
          a = 1;
          break;
        case "L":
          a = -1;
          break;
        default:
          console.log(`Unknown priority ${s} in scope selector`);
      }
      s = r.next();
    }
    let c = i();
    if (t.push({ matcher: c, priority: a }), s !== ",")
      break;
    s = r.next();
  }
  return t;
  function o() {
    if (s === "-") {
      s = r.next();
      const a = o();
      return (c) => !!a && !a(c);
    }
    if (s === "(") {
      s = r.next();
      const a = l();
      return s === ")" && (s = r.next()), a;
    }
    if (lt(s)) {
      const a = [];
      do
        a.push(s), s = r.next();
      while (lt(s));
      return (c) => e(a, c);
    }
    return null;
  }
  function i() {
    const a = [];
    let c = o();
    for (; c; )
      a.push(c), c = o();
    return (u) => a.every((h) => h(u));
  }
  function l() {
    const a = [];
    let c = i();
    for (; c && (a.push(c), s === "|" || s === ","); ) {
      do
        s = r.next();
      while (s === "|" || s === ",");
      c = i();
    }
    return (u) => a.some((h) => h(u));
  }
}
function lt(n) {
  return !!n && !!n.match(/[\w\.:]+/);
}
function Hn(n) {
  let e = /([LR]:|[\w\.:][\w\.:\-]*|[\,\|\-\(\)])/g, t = e.exec(n);
  return {
    next: () => {
      if (!t)
        return null;
      const r = t[0];
      return t = e.exec(n), r;
    }
  };
}
function Dt(n) {
  typeof n.dispose == "function" && n.dispose();
}
var se = class {
  constructor(n) {
    this.scopeName = n;
  }
  toKey() {
    return this.scopeName;
  }
}, qn = class {
  constructor(n, e) {
    this.scopeName = n, this.ruleName = e;
  }
  toKey() {
    return `${this.scopeName}#${this.ruleName}`;
  }
}, Vn = class {
  constructor() {
    p(this, "_references", []);
    p(this, "_seenReferenceKeys", /* @__PURE__ */ new Set());
    p(this, "visitedRule", /* @__PURE__ */ new Set());
  }
  get references() {
    return this._references;
  }
  add(n) {
    const e = n.toKey();
    this._seenReferenceKeys.has(e) || (this._seenReferenceKeys.add(e), this._references.push(n));
  }
}, Kn = class {
  constructor(n, e) {
    p(this, "seenFullScopeRequests", /* @__PURE__ */ new Set());
    p(this, "seenPartialScopeRequests", /* @__PURE__ */ new Set());
    p(this, "Q");
    this.repo = n, this.initialScopeName = e, this.seenFullScopeRequests.add(this.initialScopeName), this.Q = [new se(this.initialScopeName)];
  }
  processQueue() {
    const n = this.Q;
    this.Q = [];
    const e = new Vn();
    for (const t of n)
      Yn(t, this.initialScopeName, this.repo, e);
    for (const t of e.references)
      if (t instanceof se) {
        if (this.seenFullScopeRequests.has(t.scopeName))
          continue;
        this.seenFullScopeRequests.add(t.scopeName), this.Q.push(t);
      } else {
        if (this.seenFullScopeRequests.has(t.scopeName) || this.seenPartialScopeRequests.has(t.toKey()))
          continue;
        this.seenPartialScopeRequests.add(t.toKey()), this.Q.push(t);
      }
  }
};
function Yn(n, e, t, r) {
  const s = t.lookup(n.scopeName);
  if (!s) {
    if (n.scopeName === e)
      throw new Error(`No grammar provided for <${e}>`);
    return;
  }
  const o = t.lookup(e);
  n instanceof se ? ye({ baseGrammar: o, selfGrammar: s }, r) : We(
    n.ruleName,
    { baseGrammar: o, selfGrammar: s, repository: s.repository },
    r
  );
  const i = t.injections(n.scopeName);
  if (i)
    for (const l of i)
      r.add(new se(l));
}
function We(n, e, t) {
  if (e.repository && e.repository[n]) {
    const r = e.repository[n];
    Se([r], e, t);
  }
}
function ye(n, e) {
  n.selfGrammar.patterns && Array.isArray(n.selfGrammar.patterns) && Se(
    n.selfGrammar.patterns,
    { ...n, repository: n.selfGrammar.repository },
    e
  ), n.selfGrammar.injections && Se(
    Object.values(n.selfGrammar.injections),
    { ...n, repository: n.selfGrammar.repository },
    e
  );
}
function Se(n, e, t) {
  for (const r of n) {
    if (t.visitedRule.has(r))
      continue;
    t.visitedRule.add(r);
    const s = r.repository ? xt({}, e.repository, r.repository) : e.repository;
    Array.isArray(r.patterns) && Se(r.patterns, { ...e, repository: s }, t);
    const o = r.include;
    if (!o)
      continue;
    const i = Ut(o);
    switch (i.kind) {
      case 0:
        ye({ ...e, selfGrammar: e.baseGrammar }, t);
        break;
      case 1:
        ye(e, t);
        break;
      case 2:
        We(i.ruleName, { ...e, repository: s }, t);
        break;
      case 3:
      case 4:
        const l = i.scopeName === e.selfGrammar.scopeName ? e.selfGrammar : i.scopeName === e.baseGrammar.scopeName ? e.baseGrammar : void 0;
        if (l) {
          const a = { baseGrammar: e.baseGrammar, selfGrammar: l, repository: s };
          i.kind === 4 ? We(i.ruleName, a, t) : ye(a, t);
        } else
          i.kind === 4 ? t.add(new qn(i.scopeName, i.ruleName)) : t.add(new se(i.scopeName));
        break;
    }
  }
}
var Xn = class {
  constructor() {
    p(this, "kind", 0);
  }
}, Jn = class {
  constructor() {
    p(this, "kind", 1);
  }
}, Qn = class {
  constructor(n) {
    p(this, "kind", 2);
    this.ruleName = n;
  }
}, Zn = class {
  constructor(n) {
    p(this, "kind", 3);
    this.scopeName = n;
  }
}, er = class {
  constructor(n, e) {
    p(this, "kind", 4);
    this.scopeName = n, this.ruleName = e;
  }
};
function Ut(n) {
  if (n === "$base")
    return new Xn();
  if (n === "$self")
    return new Jn();
  const e = n.indexOf("#");
  if (e === -1)
    return new Zn(n);
  if (e === 0)
    return new Qn(n.substring(1));
  {
    const t = n.substring(0, e), r = n.substring(e + 1);
    return new er(t, r);
  }
}
var tr = /\\(\d+)/, ct = /\\(\d+)/g, nr = -1, jt = -2;
var ce = class {
  constructor(n, e, t, r) {
    p(this, "$location");
    p(this, "id");
    p(this, "_nameIsCapturing");
    p(this, "_name");
    p(this, "_contentNameIsCapturing");
    p(this, "_contentName");
    this.$location = n, this.id = e, this._name = t || null, this._nameIsCapturing = de.hasCaptures(this._name), this._contentName = r || null, this._contentNameIsCapturing = de.hasCaptures(this._contentName);
  }
  get debugName() {
    const n = this.$location ? `${Et(this.$location.filename)}:${this.$location.line}` : "unknown";
    return `${this.constructor.name}#${this.id} @ ${n}`;
  }
  getName(n, e) {
    return !this._nameIsCapturing || this._name === null || n === null || e === null ? this._name : de.replaceCaptures(this._name, n, e);
  }
  getContentName(n, e) {
    return !this._contentNameIsCapturing || this._contentName === null ? this._contentName : de.replaceCaptures(this._contentName, n, e);
  }
}, rr = class extends ce {
  constructor(e, t, r, s, o) {
    super(e, t, r, s);
    p(this, "retokenizeCapturedWithRuleId");
    this.retokenizeCapturedWithRuleId = o;
  }
  dispose() {
  }
  collectPatterns(e, t) {
    throw new Error("Not supported!");
  }
  compile(e, t) {
    throw new Error("Not supported!");
  }
  compileAG(e, t, r, s) {
    throw new Error("Not supported!");
  }
}, sr = class extends ce {
  constructor(e, t, r, s, o) {
    super(e, t, r, null);
    p(this, "_match");
    p(this, "captures");
    p(this, "_cachedCompiledPatterns");
    this._match = new oe(s, this.id), this.captures = o, this._cachedCompiledPatterns = null;
  }
  dispose() {
    this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null);
  }
  get debugMatchRegExp() {
    return `${this._match.source}`;
  }
  collectPatterns(e, t) {
    t.push(this._match);
  }
  compile(e, t) {
    return this._getCachedCompiledPatterns(e).compile(e);
  }
  compileAG(e, t, r, s) {
    return this._getCachedCompiledPatterns(e).compileAG(e, r, s);
  }
  _getCachedCompiledPatterns(e) {
    return this._cachedCompiledPatterns || (this._cachedCompiledPatterns = new ie(), this.collectPatterns(e, this._cachedCompiledPatterns)), this._cachedCompiledPatterns;
  }
}, ut = class extends ce {
  constructor(e, t, r, s, o) {
    super(e, t, r, s);
    p(this, "hasMissingPatterns");
    p(this, "patterns");
    p(this, "_cachedCompiledPatterns");
    this.patterns = o.patterns, this.hasMissingPatterns = o.hasMissingPatterns, this._cachedCompiledPatterns = null;
  }
  dispose() {
    this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null);
  }
  collectPatterns(e, t) {
    for (const r of this.patterns)
      e.getRule(r).collectPatterns(e, t);
  }
  compile(e, t) {
    return this._getCachedCompiledPatterns(e).compile(e);
  }
  compileAG(e, t, r, s) {
    return this._getCachedCompiledPatterns(e).compileAG(e, r, s);
  }
  _getCachedCompiledPatterns(e) {
    return this._cachedCompiledPatterns || (this._cachedCompiledPatterns = new ie(), this.collectPatterns(e, this._cachedCompiledPatterns)), this._cachedCompiledPatterns;
  }
}, ze = class extends ce {
  constructor(e, t, r, s, o, i, l, a, c, u) {
    super(e, t, r, s);
    p(this, "_begin");
    p(this, "beginCaptures");
    p(this, "_end");
    p(this, "endHasBackReferences");
    p(this, "endCaptures");
    p(this, "applyEndPatternLast");
    p(this, "hasMissingPatterns");
    p(this, "patterns");
    p(this, "_cachedCompiledPatterns");
    this._begin = new oe(o, this.id), this.beginCaptures = i, this._end = new oe(l || "￿", -1), this.endHasBackReferences = this._end.hasBackReferences, this.endCaptures = a, this.applyEndPatternLast = c || !1, this.patterns = u.patterns, this.hasMissingPatterns = u.hasMissingPatterns, this._cachedCompiledPatterns = null;
  }
  dispose() {
    this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null);
  }
  get debugBeginRegExp() {
    return `${this._begin.source}`;
  }
  get debugEndRegExp() {
    return `${this._end.source}`;
  }
  getEndWithResolvedBackReferences(e, t) {
    return this._end.resolveBackReferences(e, t);
  }
  collectPatterns(e, t) {
    t.push(this._begin);
  }
  compile(e, t) {
    return this._getCachedCompiledPatterns(e, t).compile(e);
  }
  compileAG(e, t, r, s) {
    return this._getCachedCompiledPatterns(e, t).compileAG(e, r, s);
  }
  _getCachedCompiledPatterns(e, t) {
    if (!this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns = new ie();
      for (const r of this.patterns)
        e.getRule(r).collectPatterns(e, this._cachedCompiledPatterns);
      this.applyEndPatternLast ? this._cachedCompiledPatterns.push(this._end.hasBackReferences ? this._end.clone() : this._end) : this._cachedCompiledPatterns.unshift(this._end.hasBackReferences ? this._end.clone() : this._end);
    }
    return this._end.hasBackReferences && (this.applyEndPatternLast ? this._cachedCompiledPatterns.setSource(this._cachedCompiledPatterns.length() - 1, t) : this._cachedCompiledPatterns.setSource(0, t)), this._cachedCompiledPatterns;
  }
}, Ce = class extends ce {
  constructor(e, t, r, s, o, i, l, a, c) {
    super(e, t, r, s);
    p(this, "_begin");
    p(this, "beginCaptures");
    p(this, "whileCaptures");
    p(this, "_while");
    p(this, "whileHasBackReferences");
    p(this, "hasMissingPatterns");
    p(this, "patterns");
    p(this, "_cachedCompiledPatterns");
    p(this, "_cachedCompiledWhilePatterns");
    this._begin = new oe(o, this.id), this.beginCaptures = i, this.whileCaptures = a, this._while = new oe(l, jt), this.whileHasBackReferences = this._while.hasBackReferences, this.patterns = c.patterns, this.hasMissingPatterns = c.hasMissingPatterns, this._cachedCompiledPatterns = null, this._cachedCompiledWhilePatterns = null;
  }
  dispose() {
    this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null), this._cachedCompiledWhilePatterns && (this._cachedCompiledWhilePatterns.dispose(), this._cachedCompiledWhilePatterns = null);
  }
  get debugBeginRegExp() {
    return `${this._begin.source}`;
  }
  get debugWhileRegExp() {
    return `${this._while.source}`;
  }
  getWhileWithResolvedBackReferences(e, t) {
    return this._while.resolveBackReferences(e, t);
  }
  collectPatterns(e, t) {
    t.push(this._begin);
  }
  compile(e, t) {
    return this._getCachedCompiledPatterns(e).compile(e);
  }
  compileAG(e, t, r, s) {
    return this._getCachedCompiledPatterns(e).compileAG(e, r, s);
  }
  _getCachedCompiledPatterns(e) {
    if (!this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns = new ie();
      for (const t of this.patterns)
        e.getRule(t).collectPatterns(e, this._cachedCompiledPatterns);
    }
    return this._cachedCompiledPatterns;
  }
  compileWhile(e, t) {
    return this._getCachedCompiledWhilePatterns(e, t).compile(e);
  }
  compileWhileAG(e, t, r, s) {
    return this._getCachedCompiledWhilePatterns(e, t).compileAG(e, r, s);
  }
  _getCachedCompiledWhilePatterns(e, t) {
    return this._cachedCompiledWhilePatterns || (this._cachedCompiledWhilePatterns = new ie(), this._cachedCompiledWhilePatterns.push(this._while.hasBackReferences ? this._while.clone() : this._while)), this._while.hasBackReferences && this._cachedCompiledWhilePatterns.setSource(0, t || "￿"), this._cachedCompiledWhilePatterns;
  }
}, $t = class E {
  static createCaptureRule(e, t, r, s, o) {
    return e.registerRule((i) => new rr(t, i, r, s, o));
  }
  static getCompiledRuleId(e, t, r) {
    return e.id || t.registerRule((s) => {
      if (e.id = s, e.match)
        return new sr(
          e.$vscodeTextmateLocation,
          e.id,
          e.name,
          e.match,
          E._compileCaptures(e.captures, t, r)
        );
      if (typeof e.begin > "u") {
        e.repository && (r = xt({}, r, e.repository));
        let o = e.patterns;
        return typeof o > "u" && e.include && (o = [{ include: e.include }]), new ut(
          e.$vscodeTextmateLocation,
          e.id,
          e.name,
          e.contentName,
          E._compilePatterns(o, t, r)
        );
      }
      return e.while ? new Ce(
        e.$vscodeTextmateLocation,
        e.id,
        e.name,
        e.contentName,
        e.begin,
        E._compileCaptures(e.beginCaptures || e.captures, t, r),
        e.while,
        E._compileCaptures(e.whileCaptures || e.captures, t, r),
        E._compilePatterns(e.patterns, t, r)
      ) : new ze(
        e.$vscodeTextmateLocation,
        e.id,
        e.name,
        e.contentName,
        e.begin,
        E._compileCaptures(e.beginCaptures || e.captures, t, r),
        e.end,
        E._compileCaptures(e.endCaptures || e.captures, t, r),
        e.applyEndPatternLast,
        E._compilePatterns(e.patterns, t, r)
      );
    }), e.id;
  }
  static _compileCaptures(e, t, r) {
    let s = [];
    if (e) {
      let o = 0;
      for (const i in e) {
        if (i === "$vscodeTextmateLocation")
          continue;
        const l = parseInt(i, 10);
        l > o && (o = l);
      }
      for (let i = 0; i <= o; i++)
        s[i] = null;
      for (const i in e) {
        if (i === "$vscodeTextmateLocation")
          continue;
        const l = parseInt(i, 10);
        let a = 0;
        e[i].patterns && (a = E.getCompiledRuleId(e[i], t, r)), s[l] = E.createCaptureRule(t, e[i].$vscodeTextmateLocation, e[i].name, e[i].contentName, a);
      }
    }
    return s;
  }
  static _compilePatterns(e, t, r) {
    let s = [];
    if (e)
      for (let o = 0, i = e.length; o < i; o++) {
        const l = e[o];
        let a = -1;
        if (l.include) {
          const c = Ut(l.include);
          switch (c.kind) {
            case 0:
            case 1:
              a = E.getCompiledRuleId(r[l.include], t, r);
              break;
            case 2:
              let u = r[c.ruleName];
              u && (a = E.getCompiledRuleId(u, t, r));
              break;
            case 3:
            case 4:
              const h = c.scopeName, d = c.kind === 4 ? c.ruleName : null, f = t.getExternalGrammar(h, r);
              if (f)
                if (d) {
                  let g = f.repository[d];
                  g && (a = E.getCompiledRuleId(g, t, f.repository));
                } else
                  a = E.getCompiledRuleId(f.repository.$self, t, f.repository);
              break;
          }
        } else
          a = E.getCompiledRuleId(l, t, r);
        if (a !== -1) {
          const c = t.getRule(a);
          let u = !1;
          if ((c instanceof ut || c instanceof ze || c instanceof Ce) && c.hasMissingPatterns && c.patterns.length === 0 && (u = !0), u)
            continue;
          s.push(a);
        }
      }
    return {
      patterns: s,
      hasMissingPatterns: (e ? e.length : 0) !== s.length
    };
  }
}, oe = class Ft {
  constructor(e, t) {
    p(this, "source");
    p(this, "ruleId");
    p(this, "hasAnchor");
    p(this, "hasBackReferences");
    p(this, "_anchorCache");
    if (e && typeof e == "string") {
      const r = e.length;
      let s = 0, o = [], i = !1;
      for (let l = 0; l < r; l++)
        if (e.charAt(l) === "\\" && l + 1 < r) {
          const c = e.charAt(l + 1);
          c === "z" ? (o.push(e.substring(s, l)), o.push("$(?!\\n)(?<!\\n)"), s = l + 2) : (c === "A" || c === "G") && (i = !0), l++;
        }
      this.hasAnchor = i, s === 0 ? this.source = e : (o.push(e.substring(s, r)), this.source = o.join(""));
    } else
      this.hasAnchor = !1, this.source = e;
    this.hasAnchor ? this._anchorCache = this._buildAnchorCache() : this._anchorCache = null, this.ruleId = t, typeof this.source == "string" ? this.hasBackReferences = tr.test(this.source) : this.hasBackReferences = !1;
  }
  clone() {
    return new Ft(this.source, this.ruleId);
  }
  setSource(e) {
    this.source !== e && (this.source = e, this.hasAnchor && (this._anchorCache = this._buildAnchorCache()));
  }
  resolveBackReferences(e, t) {
    if (typeof this.source != "string")
      throw new Error("This method should only be called if the source is a string");
    let r = t.map((s) => e.substring(s.start, s.end));
    return ct.lastIndex = 0, this.source.replace(ct, (s, o) => Ot(r[parseInt(o, 10)] || ""));
  }
  _buildAnchorCache() {
    if (typeof this.source != "string")
      throw new Error("This method should only be called if the source is a string");
    let e = [], t = [], r = [], s = [], o, i, l, a;
    for (o = 0, i = this.source.length; o < i; o++)
      l = this.source.charAt(o), e[o] = l, t[o] = l, r[o] = l, s[o] = l, l === "\\" && o + 1 < i && (a = this.source.charAt(o + 1), a === "A" ? (e[o + 1] = "￿", t[o + 1] = "￿", r[o + 1] = "A", s[o + 1] = "A") : a === "G" ? (e[o + 1] = "￿", t[o + 1] = "G", r[o + 1] = "￿", s[o + 1] = "G") : (e[o + 1] = a, t[o + 1] = a, r[o + 1] = a, s[o + 1] = a), o++);
    return {
      A0_G0: e.join(""),
      A0_G1: t.join(""),
      A1_G0: r.join(""),
      A1_G1: s.join("")
    };
  }
  resolveAnchors(e, t) {
    return !this.hasAnchor || !this._anchorCache || typeof this.source != "string" ? this.source : e ? t ? this._anchorCache.A1_G1 : this._anchorCache.A1_G0 : t ? this._anchorCache.A0_G1 : this._anchorCache.A0_G0;
  }
}, ie = class {
  constructor() {
    p(this, "_items");
    p(this, "_hasAnchors");
    p(this, "_cached");
    p(this, "_anchorCache");
    this._items = [], this._hasAnchors = !1, this._cached = null, this._anchorCache = {
      A0_G0: null,
      A0_G1: null,
      A1_G0: null,
      A1_G1: null
    };
  }
  dispose() {
    this._disposeCaches();
  }
  _disposeCaches() {
    this._cached && (this._cached.dispose(), this._cached = null), this._anchorCache.A0_G0 && (this._anchorCache.A0_G0.dispose(), this._anchorCache.A0_G0 = null), this._anchorCache.A0_G1 && (this._anchorCache.A0_G1.dispose(), this._anchorCache.A0_G1 = null), this._anchorCache.A1_G0 && (this._anchorCache.A1_G0.dispose(), this._anchorCache.A1_G0 = null), this._anchorCache.A1_G1 && (this._anchorCache.A1_G1.dispose(), this._anchorCache.A1_G1 = null);
  }
  push(n) {
    this._items.push(n), this._hasAnchors = this._hasAnchors || n.hasAnchor;
  }
  unshift(n) {
    this._items.unshift(n), this._hasAnchors = this._hasAnchors || n.hasAnchor;
  }
  length() {
    return this._items.length;
  }
  setSource(n, e) {
    this._items[n].source !== e && (this._disposeCaches(), this._items[n].setSource(e));
  }
  compile(n) {
    if (!this._cached) {
      let e = this._items.map((t) => t.source);
      this._cached = new ht(n, e, this._items.map((t) => t.ruleId));
    }
    return this._cached;
  }
  compileAG(n, e, t) {
    return this._hasAnchors ? e ? t ? (this._anchorCache.A1_G1 || (this._anchorCache.A1_G1 = this._resolveAnchors(n, e, t)), this._anchorCache.A1_G1) : (this._anchorCache.A1_G0 || (this._anchorCache.A1_G0 = this._resolveAnchors(n, e, t)), this._anchorCache.A1_G0) : t ? (this._anchorCache.A0_G1 || (this._anchorCache.A0_G1 = this._resolveAnchors(n, e, t)), this._anchorCache.A0_G1) : (this._anchorCache.A0_G0 || (this._anchorCache.A0_G0 = this._resolveAnchors(n, e, t)), this._anchorCache.A0_G0) : this.compile(n);
  }
  _resolveAnchors(n, e, t) {
    let r = this._items.map((s) => s.resolveAnchors(e, t));
    return new ht(n, r, this._items.map((s) => s.ruleId));
  }
}, ht = class {
  constructor(n, e, t) {
    p(this, "scanner");
    this.regExps = e, this.rules = t, this.scanner = n.createOnigScanner(e);
  }
  dispose() {
    typeof this.scanner.dispose == "function" && this.scanner.dispose();
  }
  toString() {
    const n = [];
    for (let e = 0, t = this.rules.length; e < t; e++)
      n.push("   - " + this.rules[e] + ": " + this.regExps[e]);
    return n.join(`
`);
  }
  findNextMatchSync(n, e, t) {
    const r = this.scanner.findNextMatchSync(n, e, t);
    return r ? {
      ruleId: this.rules[r.index],
      captureIndices: r.captureIndices
    } : null;
  }
}, Be = class {
  constructor(n, e) {
    this.languageId = n, this.tokenType = e;
  }
}, F, or = (F = class {
  constructor(e, t) {
    p(this, "_defaultAttributes");
    p(this, "_embeddedLanguagesMatcher");
    p(this, "_getBasicScopeAttributes", new Mt((e) => {
      const t = this._scopeToLanguage(e), r = this._toStandardTokenType(e);
      return new Be(t, r);
    }));
    this._defaultAttributes = new Be(
      e,
      8
      /* NotSet */
    ), this._embeddedLanguagesMatcher = new ir(Object.entries(t || {}));
  }
  getDefaultAttributes() {
    return this._defaultAttributes;
  }
  getBasicScopeAttributes(e) {
    return e === null ? F._NULL_SCOPE_METADATA : this._getBasicScopeAttributes.get(e);
  }
  /**
   * Given a produced TM scope, return the language that token describes or null if unknown.
   * e.g. source.html => html, source.css.embedded.html => css, punctuation.definition.tag.html => null
   */
  _scopeToLanguage(e) {
    return this._embeddedLanguagesMatcher.match(e) || 0;
  }
  _toStandardTokenType(e) {
    const t = e.match(F.STANDARD_TOKEN_TYPE_REGEXP);
    if (!t)
      return 8;
    switch (t[1]) {
      case "comment":
        return 1;
      case "string":
        return 2;
      case "regex":
        return 3;
      case "meta.embedded":
        return 0;
    }
    throw new Error("Unexpected match for standard token type!");
  }
}, p(F, "_NULL_SCOPE_METADATA", new Be(0, 0)), p(F, "STANDARD_TOKEN_TYPE_REGEXP", /\b(comment|string|regex|meta\.embedded)\b/), F), ir = class {
  constructor(n) {
    p(this, "values");
    p(this, "scopesRegExp");
    if (n.length === 0)
      this.values = null, this.scopesRegExp = null;
    else {
      this.values = new Map(n);
      const e = n.map(
        ([t, r]) => Ot(t)
      );
      e.sort(), e.reverse(), this.scopesRegExp = new RegExp(
        `^((${e.join(")|(")}))($|\\.)`,
        ""
      );
    }
  }
  match(n) {
    if (!this.scopesRegExp)
      return;
    const e = n.match(this.scopesRegExp);
    if (e)
      return this.values.get(e[1]);
  }
};
typeof process < "u" && process.env.VSCODE_TEXTMATE_DEBUG;
var ft = class {
  constructor(n, e) {
    this.stack = n, this.stoppedEarly = e;
  }
};
function Wt(n, e, t, r, s, o, i, l) {
  const a = e.content.length;
  let c = !1, u = -1;
  if (i) {
    const f = ar(
      n,
      e,
      t,
      r,
      s,
      o
    );
    s = f.stack, r = f.linePos, t = f.isFirstLine, u = f.anchorPosition;
  }
  const h = Date.now();
  for (; !c; ) {
    if (l !== 0 && Date.now() - h > l)
      return new ft(s, !0);
    d();
  }
  return new ft(s, !1);
  function d() {
    const f = lr(
      n,
      e,
      t,
      r,
      s,
      u
    );
    if (!f) {
      o.produce(s, a), c = !0;
      return;
    }
    const g = f.captureIndices, C = f.matchedRuleId, _ = g && g.length > 0 ? g[0].end > r : !1;
    if (C === nr) {
      const y = s.getRule(n);
      o.produce(s, g[0].start), s = s.withContentNameScopesList(s.nameScopesList), ne(
        n,
        e,
        t,
        s,
        o,
        y.endCaptures,
        g
      ), o.produce(s, g[0].end);
      const b = s;
      if (s = s.parent, u = b.getAnchorPos(), !_ && b.getEnterPos() === r) {
        s = b, o.produce(s, a), c = !0;
        return;
      }
    } else {
      const y = n.getRule(C);
      o.produce(s, g[0].start);
      const b = s, S = y.getName(e.content, g), v = s.contentNameScopesList.pushAttributed(
        S,
        n
      );
      if (s = s.push(
        C,
        r,
        u,
        g[0].end === a,
        null,
        v,
        v
      ), y instanceof ze) {
        const R = y;
        ne(
          n,
          e,
          t,
          s,
          o,
          R.beginCaptures,
          g
        ), o.produce(s, g[0].end), u = g[0].end;
        const L = R.getContentName(
          e.content,
          g
        ), P = v.pushAttributed(
          L,
          n
        );
        if (s = s.withContentNameScopesList(P), R.endHasBackReferences && (s = s.withEndRule(
          R.getEndWithResolvedBackReferences(
            e.content,
            g
          )
        )), !_ && b.hasSameRuleAs(s)) {
          s = s.pop(), o.produce(s, a), c = !0;
          return;
        }
      } else if (y instanceof Ce) {
        const R = y;
        ne(
          n,
          e,
          t,
          s,
          o,
          R.beginCaptures,
          g
        ), o.produce(s, g[0].end), u = g[0].end;
        const L = R.getContentName(
          e.content,
          g
        ), P = v.pushAttributed(
          L,
          n
        );
        if (s = s.withContentNameScopesList(P), R.whileHasBackReferences && (s = s.withEndRule(
          R.getWhileWithResolvedBackReferences(
            e.content,
            g
          )
        )), !_ && b.hasSameRuleAs(s)) {
          s = s.pop(), o.produce(s, a), c = !0;
          return;
        }
      } else if (ne(
        n,
        e,
        t,
        s,
        o,
        y.captures,
        g
      ), o.produce(s, g[0].end), s = s.pop(), !_) {
        s = s.safePop(), o.produce(s, a), c = !0;
        return;
      }
    }
    g[0].end > r && (r = g[0].end, t = !1);
  }
}
function ar(n, e, t, r, s, o) {
  let i = s.beginRuleCapturedEOL ? 0 : -1;
  const l = [];
  for (let a = s; a; a = a.pop()) {
    const c = a.getRule(n);
    c instanceof Ce && l.push({
      rule: c,
      stack: a
    });
  }
  for (let a = l.pop(); a; a = l.pop()) {
    const { ruleScanner: c, findOptions: u } = hr(a.rule, n, a.stack.endRule, t, r === i), h = c.findNextMatchSync(e, r, u);
    if (h) {
      if (h.ruleId !== jt) {
        s = a.stack.pop();
        break;
      }
      h.captureIndices && h.captureIndices.length && (o.produce(a.stack, h.captureIndices[0].start), ne(n, e, t, a.stack, o, a.rule.whileCaptures, h.captureIndices), o.produce(a.stack, h.captureIndices[0].end), i = h.captureIndices[0].end, h.captureIndices[0].end > r && (r = h.captureIndices[0].end, t = !1));
    } else {
      s = a.stack.pop();
      break;
    }
  }
  return { stack: s, linePos: r, anchorPosition: i, isFirstLine: t };
}
function lr(n, e, t, r, s, o) {
  const i = cr(n, e, t, r, s, o), l = n.getInjections();
  if (l.length === 0)
    return i;
  const a = ur(l, n, e, t, r, s, o);
  if (!a)
    return i;
  if (!i)
    return a;
  const c = i.captureIndices[0].start, u = a.captureIndices[0].start;
  return u < c || a.priorityMatch && u === c ? a : i;
}
function cr(n, e, t, r, s, o) {
  const i = s.getRule(n), { ruleScanner: l, findOptions: a } = zt(i, n, s.endRule, t, r === o), c = l.findNextMatchSync(e, r, a);
  return c ? {
    captureIndices: c.captureIndices,
    matchedRuleId: c.ruleId
  } : null;
}
function ur(n, e, t, r, s, o, i) {
  let l = Number.MAX_VALUE, a = null, c, u = 0;
  const h = o.contentNameScopesList.getScopeNames();
  for (let d = 0, f = n.length; d < f; d++) {
    const g = n[d];
    if (!g.matcher(h))
      continue;
    const C = e.getRule(g.ruleId), { ruleScanner: _, findOptions: y } = zt(C, e, null, r, s === i), b = _.findNextMatchSync(t, s, y);
    if (!b)
      continue;
    const S = b.captureIndices[0].start;
    if (!(S >= l) && (l = S, a = b.captureIndices, c = b.ruleId, u = g.priority, l === s))
      break;
  }
  return a ? {
    priorityMatch: u === -1,
    captureIndices: a,
    matchedRuleId: c
  } : null;
}
function zt(n, e, t, r, s) {
  return {
    ruleScanner: n.compileAG(e, t, r, s),
    findOptions: 0
    /* None */
  };
}
function hr(n, e, t, r, s) {
  return {
    ruleScanner: n.compileWhileAG(e, t, r, s),
    findOptions: 0
    /* None */
  };
}
function ne(n, e, t, r, s, o, i) {
  if (o.length === 0)
    return;
  const l = e.content, a = Math.min(o.length, i.length), c = [], u = i[0].end;
  for (let h = 0; h < a; h++) {
    const d = o[h];
    if (d === null)
      continue;
    const f = i[h];
    if (f.length === 0)
      continue;
    if (f.start > u)
      break;
    for (; c.length > 0 && c[c.length - 1].endPos <= f.start; )
      s.produceFromScopes(c[c.length - 1].scopes, c[c.length - 1].endPos), c.pop();
    if (c.length > 0 ? s.produceFromScopes(c[c.length - 1].scopes, f.start) : s.produce(r, f.start), d.retokenizeCapturedWithRuleId) {
      const C = d.getName(l, i), _ = r.contentNameScopesList.pushAttributed(C, n), y = d.getContentName(l, i), b = _.pushAttributed(y, n), S = r.push(d.retokenizeCapturedWithRuleId, f.start, -1, !1, null, _, b), v = n.createOnigString(l.substring(0, f.end));
      Wt(
        n,
        v,
        t && f.start === 0,
        f.start,
        S,
        s,
        !1,
        /* no time limit */
        0
      ), Dt(v);
      continue;
    }
    const g = d.getName(l, i);
    if (g !== null) {
      const _ = (c.length > 0 ? c[c.length - 1].scopes : r.contentNameScopesList).pushAttributed(g, n);
      c.push(new fr(_, f.end));
    }
  }
  for (; c.length > 0; )
    s.produceFromScopes(c[c.length - 1].scopes, c[c.length - 1].endPos), c.pop();
}
var fr = class {
  constructor(n, e) {
    p(this, "scopes");
    p(this, "endPos");
    this.scopes = n, this.endPos = e;
  }
};
function dr(n, e, t, r, s, o, i, l) {
  return new gr(
    n,
    e,
    t,
    r,
    s,
    o,
    i,
    l
  );
}
function dt(n, e, t, r, s) {
  const o = be(e, we), i = $t.getCompiledRuleId(t, r, s.repository);
  for (const l of o)
    n.push({
      debugSelector: e,
      matcher: l.matcher,
      ruleId: i,
      grammar: s,
      priority: l.priority
    });
}
function we(n, e) {
  if (e.length < n.length)
    return !1;
  let t = 0;
  return n.every((r) => {
    for (let s = t; s < e.length; s++)
      if (pr(e[s], r))
        return t = s + 1, !0;
    return !1;
  });
}
function pr(n, e) {
  if (!n)
    return !1;
  if (n === e)
    return !0;
  const t = e.length;
  return n.length > t && n.substr(0, t) === e && n[t] === ".";
}
var gr = class {
  constructor(n, e, t, r, s, o, i, l) {
    p(this, "_rootId");
    p(this, "_lastRuleId");
    p(this, "_ruleId2desc");
    p(this, "_includedGrammars");
    p(this, "_grammarRepository");
    p(this, "_grammar");
    p(this, "_injections");
    p(this, "_basicScopeAttributesProvider");
    p(this, "_tokenTypeMatchers");
    if (this._rootScopeName = n, this.balancedBracketSelectors = o, this._onigLib = l, this._basicScopeAttributesProvider = new or(
      t,
      r
    ), this._rootId = -1, this._lastRuleId = 0, this._ruleId2desc = [null], this._includedGrammars = {}, this._grammarRepository = i, this._grammar = pt(e, null), this._injections = null, this._tokenTypeMatchers = [], s)
      for (const a of Object.keys(s)) {
        const c = be(a, we);
        for (const u of c)
          this._tokenTypeMatchers.push({
            matcher: u.matcher,
            type: s[a]
          });
      }
  }
  get themeProvider() {
    return this._grammarRepository;
  }
  dispose() {
    for (const n of this._ruleId2desc)
      n && n.dispose();
  }
  createOnigScanner(n) {
    return this._onigLib.createOnigScanner(n);
  }
  createOnigString(n) {
    return this._onigLib.createOnigString(n);
  }
  getMetadataForScope(n) {
    return this._basicScopeAttributesProvider.getBasicScopeAttributes(n);
  }
  _collectInjections() {
    const n = {
      lookup: (s) => s === this._rootScopeName ? this._grammar : this.getExternalGrammar(s),
      injections: (s) => this._grammarRepository.injections(s)
    }, e = [], t = this._rootScopeName, r = n.lookup(t);
    if (r) {
      const s = r.injections;
      if (s)
        for (let i in s)
          dt(
            e,
            i,
            s[i],
            this,
            r
          );
      const o = this._grammarRepository.injections(t);
      o && o.forEach((i) => {
        const l = this.getExternalGrammar(i);
        if (l) {
          const a = l.injectionSelector;
          a && dt(
            e,
            a,
            l,
            this,
            l
          );
        }
      });
    }
    return e.sort((s, o) => s.priority - o.priority), e;
  }
  getInjections() {
    return this._injections === null && (this._injections = this._collectInjections()), this._injections;
  }
  registerRule(n) {
    const e = ++this._lastRuleId, t = n(e);
    return this._ruleId2desc[e] = t, t;
  }
  getRule(n) {
    return this._ruleId2desc[n];
  }
  getExternalGrammar(n, e) {
    if (this._includedGrammars[n])
      return this._includedGrammars[n];
    if (this._grammarRepository) {
      const t = this._grammarRepository.lookup(n);
      if (t)
        return this._includedGrammars[n] = pt(
          t,
          e && e.$base
        ), this._includedGrammars[n];
    }
  }
  tokenizeLine(n, e, t = 0) {
    const r = this._tokenize(n, e, !1, t);
    return {
      tokens: r.lineTokens.getResult(r.ruleStack, r.lineLength),
      ruleStack: r.ruleStack,
      stoppedEarly: r.stoppedEarly
    };
  }
  tokenizeLine2(n, e, t = 0) {
    const r = this._tokenize(n, e, !0, t);
    return {
      tokens: r.lineTokens.getBinaryResult(r.ruleStack, r.lineLength),
      ruleStack: r.ruleStack,
      stoppedEarly: r.stoppedEarly
    };
  }
  _tokenize(n, e, t, r) {
    this._rootId === -1 && (this._rootId = $t.getCompiledRuleId(
      this._grammar.repository.$self,
      this,
      this._grammar.repository
    ), this.getInjections());
    let s;
    if (!e || e === He.NULL) {
      s = !0;
      const c = this._basicScopeAttributesProvider.getDefaultAttributes(), u = this.themeProvider.getDefaults(), h = J.set(
        0,
        c.languageId,
        c.tokenType,
        null,
        u.fontStyle,
        u.foregroundId,
        u.backgroundId
      ), d = this.getRule(this._rootId).getName(
        null,
        null
      );
      let f;
      d ? f = re.createRootAndLookUpScopeName(
        d,
        h,
        this
      ) : f = re.createRoot(
        "unknown",
        h
      ), e = new He(
        null,
        this._rootId,
        -1,
        -1,
        !1,
        null,
        f,
        f
      );
    } else
      s = !1, e.reset();
    n = n + `
`;
    const o = this.createOnigString(n), i = o.content.length, l = new yr(
      t,
      n,
      this._tokenTypeMatchers,
      this.balancedBracketSelectors
    ), a = Wt(
      this,
      o,
      s,
      0,
      e,
      l,
      !0,
      r
    );
    return Dt(o), {
      lineLength: i,
      lineTokens: l,
      ruleStack: a.stack,
      stoppedEarly: a.stoppedEarly
    };
  }
};
function pt(n, e) {
  return n = On(n), n.repository = n.repository || {}, n.repository.$self = {
    $vscodeTextmateLocation: n.$vscodeTextmateLocation,
    patterns: n.patterns,
    name: n.scopeName
  }, n.repository.$base = e || n.repository.$self, n;
}
var re = class U {
  /**
   * Invariant:
   * ```
   * if (parent && !scopePath.extends(parent.scopePath)) {
   * 	throw new Error();
   * }
   * ```
   */
  constructor(e, t, r) {
    this.parent = e, this.scopePath = t, this.tokenAttributes = r;
  }
  static fromExtension(e, t) {
    let r = e, s = (e == null ? void 0 : e.scopePath) ?? null;
    for (const o of t)
      s = Me.push(s, o.scopeNames), r = new U(r, s, o.encodedTokenAttributes);
    return r;
  }
  static createRoot(e, t) {
    return new U(null, new Me(null, e), t);
  }
  static createRootAndLookUpScopeName(e, t, r) {
    const s = r.getMetadataForScope(e), o = new Me(null, e), i = r.themeProvider.themeMatch(o), l = U.mergeAttributes(
      t,
      s,
      i
    );
    return new U(null, o, l);
  }
  get scopeName() {
    return this.scopePath.scopeName;
  }
  toString() {
    return this.getScopeNames().join(" ");
  }
  equals(e) {
    return U.equals(this, e);
  }
  static equals(e, t) {
    do {
      if (e === t || !e && !t)
        return !0;
      if (!e || !t || e.scopeName !== t.scopeName || e.tokenAttributes !== t.tokenAttributes)
        return !1;
      e = e.parent, t = t.parent;
    } while (!0);
  }
  static mergeAttributes(e, t, r) {
    let s = -1, o = 0, i = 0;
    return r !== null && (s = r.fontStyle, o = r.foregroundId, i = r.backgroundId), J.set(
      e,
      t.languageId,
      t.tokenType,
      null,
      s,
      o,
      i
    );
  }
  pushAttributed(e, t) {
    if (e === null)
      return this;
    if (e.indexOf(" ") === -1)
      return U._pushAttributed(this, e, t);
    const r = e.split(/ /g);
    let s = this;
    for (const o of r)
      s = U._pushAttributed(s, o, t);
    return s;
  }
  static _pushAttributed(e, t, r) {
    const s = r.getMetadataForScope(t), o = e.scopePath.push(t), i = r.themeProvider.themeMatch(o), l = U.mergeAttributes(
      e.tokenAttributes,
      s,
      i
    );
    return new U(e, o, l);
  }
  getScopeNames() {
    return this.scopePath.getSegments();
  }
  getExtensionIfDefined(e) {
    var s;
    const t = [];
    let r = this;
    for (; r && r !== e; )
      t.push({
        encodedTokenAttributes: r.tokenAttributes,
        scopeNames: r.scopePath.getExtensionIfDefined(((s = r.parent) == null ? void 0 : s.scopePath) ?? null)
      }), r = r.parent;
    return r === e ? t.reverse() : void 0;
  }
}, B, He = (B = class {
  /**
   * Invariant:
   * ```
   * if (contentNameScopesList !== nameScopesList && contentNameScopesList?.parent !== nameScopesList) {
   * 	throw new Error();
   * }
   * if (this.parent && !nameScopesList.extends(this.parent.contentNameScopesList)) {
   * 	throw new Error();
   * }
   * ```
   */
  constructor(e, t, r, s, o, i, l, a) {
    p(this, "_stackElementBrand");
    /**
     * The position on the current line where this state was pushed.
     * This is relevant only while tokenizing a line, to detect endless loops.
     * Its value is meaningless across lines.
     */
    p(this, "_enterPos");
    /**
     * The captured anchor position when this stack element was pushed.
     * This is relevant only while tokenizing a line, to restore the anchor position when popping.
     * Its value is meaningless across lines.
     */
    p(this, "_anchorPos");
    /**
     * The depth of the stack.
     */
    p(this, "depth");
    this.parent = e, this.ruleId = t, this.beginRuleCapturedEOL = o, this.endRule = i, this.nameScopesList = l, this.contentNameScopesList = a, this.depth = this.parent ? this.parent.depth + 1 : 1, this._enterPos = r, this._anchorPos = s;
  }
  equals(e) {
    return e === null ? !1 : B._equals(this, e);
  }
  static _equals(e, t) {
    return e === t ? !0 : this._structuralEquals(e, t) ? re.equals(e.contentNameScopesList, t.contentNameScopesList) : !1;
  }
  /**
   * A structural equals check. Does not take into account `scopes`.
   */
  static _structuralEquals(e, t) {
    do {
      if (e === t || !e && !t)
        return !0;
      if (!e || !t || e.depth !== t.depth || e.ruleId !== t.ruleId || e.endRule !== t.endRule)
        return !1;
      e = e.parent, t = t.parent;
    } while (!0);
  }
  clone() {
    return this;
  }
  static _reset(e) {
    for (; e; )
      e._enterPos = -1, e._anchorPos = -1, e = e.parent;
  }
  reset() {
    B._reset(this);
  }
  pop() {
    return this.parent;
  }
  safePop() {
    return this.parent ? this.parent : this;
  }
  push(e, t, r, s, o, i, l) {
    return new B(
      this,
      e,
      t,
      r,
      s,
      o,
      i,
      l
    );
  }
  getEnterPos() {
    return this._enterPos;
  }
  getAnchorPos() {
    return this._anchorPos;
  }
  getRule(e) {
    return e.getRule(this.ruleId);
  }
  toString() {
    const e = [];
    return this._writeString(e, 0), "[" + e.join(",") + "]";
  }
  _writeString(e, t) {
    var r, s;
    return this.parent && (t = this.parent._writeString(e, t)), e[t++] = `(${this.ruleId}, ${(r = this.nameScopesList) == null ? void 0 : r.toString()}, ${(s = this.contentNameScopesList) == null ? void 0 : s.toString()})`, t;
  }
  withContentNameScopesList(e) {
    return this.contentNameScopesList === e ? this : this.parent.push(
      this.ruleId,
      this._enterPos,
      this._anchorPos,
      this.beginRuleCapturedEOL,
      this.endRule,
      this.nameScopesList,
      e
    );
  }
  withEndRule(e) {
    return this.endRule === e ? this : new B(
      this.parent,
      this.ruleId,
      this._enterPos,
      this._anchorPos,
      this.beginRuleCapturedEOL,
      e,
      this.nameScopesList,
      this.contentNameScopesList
    );
  }
  // Used to warn of endless loops
  hasSameRuleAs(e) {
    let t = this;
    for (; t && t._enterPos === e._enterPos; ) {
      if (t.ruleId === e.ruleId)
        return !0;
      t = t.parent;
    }
    return !1;
  }
  toStateStackFrame() {
    var e, t, r;
    return {
      ruleId: this.ruleId,
      beginRuleCapturedEOL: this.beginRuleCapturedEOL,
      endRule: this.endRule,
      nameScopesList: ((t = this.nameScopesList) == null ? void 0 : t.getExtensionIfDefined(((e = this.parent) == null ? void 0 : e.nameScopesList) ?? null)) ?? [],
      contentNameScopesList: ((r = this.contentNameScopesList) == null ? void 0 : r.getExtensionIfDefined(this.nameScopesList)) ?? []
    };
  }
  static pushFrame(e, t) {
    const r = re.fromExtension((e == null ? void 0 : e.nameScopesList) ?? null, t.nameScopesList);
    return new B(
      e,
      t.ruleId,
      t.enterPos ?? -1,
      t.anchorPos ?? -1,
      t.beginRuleCapturedEOL,
      t.endRule,
      r,
      re.fromExtension(r, t.contentNameScopesList)
    );
  }
}, // TODO remove me
p(B, "NULL", new B(
  null,
  0,
  0,
  0,
  !1,
  null,
  null,
  null
)), B), mr = class {
  constructor(n, e) {
    p(this, "balancedBracketScopes");
    p(this, "unbalancedBracketScopes");
    p(this, "allowAny", !1);
    this.balancedBracketScopes = n.flatMap(
      (t) => t === "*" ? (this.allowAny = !0, []) : be(t, we).map((r) => r.matcher)
    ), this.unbalancedBracketScopes = e.flatMap(
      (t) => be(t, we).map((r) => r.matcher)
    );
  }
  get matchesAlways() {
    return this.allowAny && this.unbalancedBracketScopes.length === 0;
  }
  get matchesNever() {
    return this.balancedBracketScopes.length === 0 && !this.allowAny;
  }
  match(n) {
    for (const e of this.unbalancedBracketScopes)
      if (e(n))
        return !1;
    for (const e of this.balancedBracketScopes)
      if (e(n))
        return !0;
    return this.allowAny;
  }
}, yr = class {
  constructor(n, e, t, r) {
    p(this, "_emitBinaryTokens");
    /**
     * defined only if `false`.
     */
    p(this, "_lineText");
    /**
     * used only if `_emitBinaryTokens` is false.
     */
    p(this, "_tokens");
    /**
     * used only if `_emitBinaryTokens` is true.
     */
    p(this, "_binaryTokens");
    p(this, "_lastTokenEndIndex");
    p(this, "_tokenTypeOverrides");
    this.balancedBracketSelectors = r, this._emitBinaryTokens = n, this._tokenTypeOverrides = t, this._lineText = null, this._tokens = [], this._binaryTokens = [], this._lastTokenEndIndex = 0;
  }
  produce(n, e) {
    this.produceFromScopes(n.contentNameScopesList, e);
  }
  produceFromScopes(n, e) {
    var r;
    if (this._lastTokenEndIndex >= e)
      return;
    if (this._emitBinaryTokens) {
      let s = (n == null ? void 0 : n.tokenAttributes) ?? 0, o = !1;
      if ((r = this.balancedBracketSelectors) != null && r.matchesAlways && (o = !0), this._tokenTypeOverrides.length > 0 || this.balancedBracketSelectors && !this.balancedBracketSelectors.matchesAlways && !this.balancedBracketSelectors.matchesNever) {
        const i = (n == null ? void 0 : n.getScopeNames()) ?? [];
        for (const l of this._tokenTypeOverrides)
          l.matcher(i) && (s = J.set(
            s,
            0,
            l.type,
            null,
            -1,
            0,
            0
          ));
        this.balancedBracketSelectors && (o = this.balancedBracketSelectors.match(i));
      }
      if (o && (s = J.set(
        s,
        0,
        8,
        o,
        -1,
        0,
        0
      )), this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 1] === s) {
        this._lastTokenEndIndex = e;
        return;
      }
      this._binaryTokens.push(this._lastTokenEndIndex), this._binaryTokens.push(s), this._lastTokenEndIndex = e;
      return;
    }
    const t = (n == null ? void 0 : n.getScopeNames()) ?? [];
    this._tokens.push({
      startIndex: this._lastTokenEndIndex,
      endIndex: e,
      // value: lineText.substring(lastTokenEndIndex, endIndex),
      scopes: t
    }), this._lastTokenEndIndex = e;
  }
  getResult(n, e) {
    return this._tokens.length > 0 && this._tokens[this._tokens.length - 1].startIndex === e - 1 && this._tokens.pop(), this._tokens.length === 0 && (this._lastTokenEndIndex = -1, this.produce(n, e), this._tokens[this._tokens.length - 1].startIndex = 0), this._tokens;
  }
  getBinaryResult(n, e) {
    this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 2] === e - 1 && (this._binaryTokens.pop(), this._binaryTokens.pop()), this._binaryTokens.length === 0 && (this._lastTokenEndIndex = -1, this.produce(n, e), this._binaryTokens[this._binaryTokens.length - 2] = 0);
    const t = new Uint32Array(this._binaryTokens.length);
    for (let r = 0, s = this._binaryTokens.length; r < s; r++)
      t[r] = this._binaryTokens[r];
    return t;
  }
}, _r = class {
  constructor(n, e) {
    p(this, "_grammars", /* @__PURE__ */ new Map());
    p(this, "_rawGrammars", /* @__PURE__ */ new Map());
    p(this, "_injectionGrammars", /* @__PURE__ */ new Map());
    p(this, "_theme");
    this._onigLib = e, this._theme = n;
  }
  dispose() {
    for (const n of this._grammars.values())
      n.dispose();
  }
  setTheme(n) {
    this._theme = n;
  }
  getColorMap() {
    return this._theme.getColorMap();
  }
  /**
   * Add `grammar` to registry and return a list of referenced scope names
   */
  addGrammar(n, e) {
    this._rawGrammars.set(n.scopeName, n), e && this._injectionGrammars.set(n.scopeName, e);
  }
  /**
   * Lookup a raw grammar.
   */
  lookup(n) {
    return this._rawGrammars.get(n);
  }
  /**
   * Returns the injections for the given grammar
   */
  injections(n) {
    return this._injectionGrammars.get(n);
  }
  /**
   * Get the default theme settings
   */
  getDefaults() {
    return this._theme.getDefaults();
  }
  /**
   * Match a scope in the theme.
   */
  themeMatch(n) {
    return this._theme.match(n);
  }
  /**
   * Lookup a grammar.
   */
  grammarForScopeName(n, e, t, r, s) {
    if (!this._grammars.has(n)) {
      let o = this._rawGrammars.get(n);
      if (!o)
        return null;
      this._grammars.set(n, dr(
        n,
        o,
        e,
        t,
        r,
        s,
        this,
        this._onigLib
      ));
    }
    return this._grammars.get(n);
  }
}, br = class {
  constructor(e) {
    p(this, "_options");
    p(this, "_syncRegistry");
    p(this, "_ensureGrammarCache");
    this._options = e, this._syncRegistry = new _r(
      _e.createFromRawTheme(e.theme, e.colorMap),
      e.onigLib
    ), this._ensureGrammarCache = /* @__PURE__ */ new Map();
  }
  dispose() {
    this._syncRegistry.dispose();
  }
  /**
   * Change the theme. Once called, no previous `ruleStack` should be used anymore.
   */
  setTheme(e, t) {
    this._syncRegistry.setTheme(_e.createFromRawTheme(e, t));
  }
  /**
   * Returns a lookup array for color ids.
   */
  getColorMap() {
    return this._syncRegistry.getColorMap();
  }
  /**
   * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
   * Please do not use language id 0.
   */
  loadGrammarWithEmbeddedLanguages(e, t, r) {
    return this.loadGrammarWithConfiguration(e, t, { embeddedLanguages: r });
  }
  /**
   * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
   * Please do not use language id 0.
   */
  loadGrammarWithConfiguration(e, t, r) {
    return this._loadGrammar(
      e,
      t,
      r.embeddedLanguages,
      r.tokenTypes,
      new mr(
        r.balancedBracketSelectors || [],
        r.unbalancedBracketSelectors || []
      )
    );
  }
  /**
   * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
   */
  loadGrammar(e) {
    return this._loadGrammar(e, 0, null, null, null);
  }
  _loadGrammar(e, t, r, s, o) {
    const i = new Kn(this._syncRegistry, e);
    for (; i.Q.length > 0; )
      i.Q.map((l) => this._loadSingleGrammar(l.scopeName)), i.processQueue();
    return this._grammarForScopeName(
      e,
      t,
      r,
      s,
      o
    );
  }
  _loadSingleGrammar(e) {
    this._ensureGrammarCache.has(e) || (this._doLoadSingleGrammar(e), this._ensureGrammarCache.set(e, !0));
  }
  _doLoadSingleGrammar(e) {
    const t = this._options.loadGrammar(e);
    if (t) {
      const r = typeof this._options.getInjections == "function" ? this._options.getInjections(e) : void 0;
      this._syncRegistry.addGrammar(t, r);
    }
  }
  /**
   * Adds a rawGrammar.
   */
  addGrammar(e, t = [], r = 0, s = null) {
    return this._syncRegistry.addGrammar(e, t), this._grammarForScopeName(e.scopeName, r, s);
  }
  /**
   * Get the grammar for `scopeName`. The grammar must first be created via `loadGrammar` or `addGrammar`.
   */
  _grammarForScopeName(e, t = 0, r = null, s = null, o = null) {
    return this._syncRegistry.grammarForScopeName(
      e,
      t,
      r,
      s,
      o
    );
  }
}, qe = He.NULL;
const Sr = [
  "area",
  "base",
  "basefont",
  "bgsound",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "image",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
];
class ue {
  /**
   * @constructor
   * @param {Properties} property
   * @param {Normal} normal
   * @param {string} [space]
   */
  constructor(e, t, r) {
    this.property = e, this.normal = t, r && (this.space = r);
  }
}
ue.prototype.property = {};
ue.prototype.normal = {};
ue.prototype.space = null;
function Ht(n, e) {
  const t = {}, r = {};
  let s = -1;
  for (; ++s < n.length; )
    Object.assign(t, n[s].property), Object.assign(r, n[s].normal);
  return new ue(t, r, e);
}
function Ve(n) {
  return n.toLowerCase();
}
class G {
  /**
   * @constructor
   * @param {string} property
   * @param {string} attribute
   */
  constructor(e, t) {
    this.property = e, this.attribute = t;
  }
}
G.prototype.space = null;
G.prototype.boolean = !1;
G.prototype.booleanish = !1;
G.prototype.overloadedBoolean = !1;
G.prototype.number = !1;
G.prototype.commaSeparated = !1;
G.prototype.spaceSeparated = !1;
G.prototype.commaOrSpaceSeparated = !1;
G.prototype.mustUseProperty = !1;
G.prototype.defined = !1;
let Cr = 0;
const w = V(), A = V(), qt = V(), m = V(), k = V(), Y = V(), O = V();
function V() {
  return 2 ** ++Cr;
}
const Ke = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: w,
  booleanish: A,
  commaOrSpaceSeparated: O,
  commaSeparated: Y,
  number: m,
  overloadedBoolean: qt,
  spaceSeparated: k
}, Symbol.toStringTag, { value: "Module" })), Ge = Object.keys(Ke);
class Qe extends G {
  /**
   * @constructor
   * @param {string} property
   * @param {string} attribute
   * @param {number|null} [mask]
   * @param {string} [space]
   */
  constructor(e, t, r, s) {
    let o = -1;
    if (super(e, t), gt(this, "space", s), typeof r == "number")
      for (; ++o < Ge.length; ) {
        const i = Ge[o];
        gt(this, Ge[o], (r & Ke[i]) === Ke[i]);
      }
  }
}
Qe.prototype.defined = !0;
function gt(n, e, t) {
  t && (n[e] = t);
}
const wr = {}.hasOwnProperty;
function Q(n) {
  const e = {}, t = {};
  let r;
  for (r in n.properties)
    if (wr.call(n.properties, r)) {
      const s = n.properties[r], o = new Qe(
        r,
        n.transform(n.attributes || {}, r),
        s,
        n.space
      );
      n.mustUseProperty && n.mustUseProperty.includes(r) && (o.mustUseProperty = !0), e[r] = o, t[Ve(r)] = r, t[Ve(o.attribute)] = r;
    }
  return new ue(e, t, n.space);
}
const Vt = Q({
  space: "xlink",
  transform(n, e) {
    return "xlink:" + e.slice(5).toLowerCase();
  },
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  }
}), Kt = Q({
  space: "xml",
  transform(n, e) {
    return "xml:" + e.slice(3).toLowerCase();
  },
  properties: { xmlLang: null, xmlBase: null, xmlSpace: null }
});
function Yt(n, e) {
  return e in n ? n[e] : e;
}
function Xt(n, e) {
  return Yt(n, e.toLowerCase());
}
const Jt = Q({
  space: "xmlns",
  attributes: { xmlnsxlink: "xmlns:xlink" },
  transform: Xt,
  properties: { xmlns: null, xmlnsXLink: null }
}), Qt = Q({
  transform(n, e) {
    return e === "role" ? e : "aria-" + e.slice(4).toLowerCase();
  },
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: A,
    ariaAutoComplete: null,
    ariaBusy: A,
    ariaChecked: A,
    ariaColCount: m,
    ariaColIndex: m,
    ariaColSpan: m,
    ariaControls: k,
    ariaCurrent: null,
    ariaDescribedBy: k,
    ariaDetails: null,
    ariaDisabled: A,
    ariaDropEffect: k,
    ariaErrorMessage: null,
    ariaExpanded: A,
    ariaFlowTo: k,
    ariaGrabbed: A,
    ariaHasPopup: null,
    ariaHidden: A,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: k,
    ariaLevel: m,
    ariaLive: null,
    ariaModal: A,
    ariaMultiLine: A,
    ariaMultiSelectable: A,
    ariaOrientation: null,
    ariaOwns: k,
    ariaPlaceholder: null,
    ariaPosInSet: m,
    ariaPressed: A,
    ariaReadOnly: A,
    ariaRelevant: null,
    ariaRequired: A,
    ariaRoleDescription: k,
    ariaRowCount: m,
    ariaRowIndex: m,
    ariaRowSpan: m,
    ariaSelected: A,
    ariaSetSize: m,
    ariaSort: null,
    ariaValueMax: m,
    ariaValueMin: m,
    ariaValueNow: m,
    ariaValueText: null,
    role: null
  }
}), vr = Q({
  space: "html",
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  transform: Xt,
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: Y,
    acceptCharset: k,
    accessKey: k,
    action: null,
    allow: null,
    allowFullScreen: w,
    allowPaymentRequest: w,
    allowUserMedia: w,
    alt: null,
    as: null,
    async: w,
    autoCapitalize: null,
    autoComplete: k,
    autoFocus: w,
    autoPlay: w,
    blocking: k,
    capture: null,
    charSet: null,
    checked: w,
    cite: null,
    className: k,
    cols: m,
    colSpan: null,
    content: null,
    contentEditable: A,
    controls: w,
    controlsList: k,
    coords: m | Y,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: w,
    defer: w,
    dir: null,
    dirName: null,
    disabled: w,
    download: qt,
    draggable: A,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: w,
    formTarget: null,
    headers: k,
    height: m,
    hidden: w,
    high: m,
    href: null,
    hrefLang: null,
    htmlFor: k,
    httpEquiv: k,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: w,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: w,
    itemId: null,
    itemProp: k,
    itemRef: k,
    itemScope: w,
    itemType: k,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: w,
    low: m,
    manifest: null,
    max: null,
    maxLength: m,
    media: null,
    method: null,
    min: null,
    minLength: m,
    multiple: w,
    muted: w,
    name: null,
    nonce: null,
    noModule: w,
    noValidate: w,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforeMatch: null,
    onBeforePrint: null,
    onBeforeToggle: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onScrollEnd: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: w,
    optimum: m,
    pattern: null,
    ping: k,
    placeholder: null,
    playsInline: w,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: w,
    referrerPolicy: null,
    rel: k,
    required: w,
    reversed: w,
    rows: m,
    rowSpan: m,
    sandbox: k,
    scope: null,
    scoped: w,
    seamless: w,
    selected: w,
    shadowRootClonable: w,
    shadowRootDelegatesFocus: w,
    shadowRootMode: null,
    shape: null,
    size: m,
    sizes: null,
    slot: null,
    span: m,
    spellCheck: A,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: m,
    step: null,
    style: null,
    tabIndex: m,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: w,
    useMap: null,
    value: A,
    width: m,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: k,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: m,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: m,
    // `<body>`
    cellPadding: null,
    // `<table>`
    cellSpacing: null,
    // `<table>`
    char: null,
    // Several table elements. When `align=char`, sets the character to align on
    charOff: null,
    // Several table elements. When `char`, offsets the alignment
    classId: null,
    // `<object>`
    clear: null,
    // `<br>`. Use CSS `clear` instead
    code: null,
    // `<object>`
    codeBase: null,
    // `<object>`
    codeType: null,
    // `<object>`
    color: null,
    // `<font>` and `<hr>`. Use CSS instead
    compact: w,
    // Lists. Use CSS to reduce space between items instead
    declare: w,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: m,
    // `<img>` and `<object>`
    leftMargin: m,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: m,
    // `<body>`
    marginWidth: m,
    // `<body>`
    noResize: w,
    // `<frame>`
    noHref: w,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: w,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: w,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: m,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: A,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: m,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: m,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: w,
    disableRemotePlayback: w,
    prefix: null,
    property: null,
    results: m,
    security: null,
    unselectable: null
  }
}), kr = Q({
  space: "svg",
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    transformOrigin: "transform-origin",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  transform: Yt,
  properties: {
    about: O,
    accentHeight: m,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: m,
    amplitude: m,
    arabicForm: null,
    ascent: m,
    attributeName: null,
    attributeType: null,
    azimuth: m,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: m,
    by: null,
    calcMode: null,
    capHeight: m,
    className: k,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: m,
    diffuseConstant: m,
    direction: null,
    display: null,
    dur: null,
    divisor: m,
    dominantBaseline: null,
    download: w,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: m,
    enableBackground: null,
    end: null,
    event: null,
    exponent: m,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: m,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: Y,
    g2: Y,
    glyphName: Y,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: m,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: m,
    horizOriginX: m,
    horizOriginY: m,
    id: null,
    ideographic: m,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: m,
    k: m,
    k1: m,
    k2: m,
    k3: m,
    k4: m,
    kernelMatrix: O,
    kernelUnitLength: null,
    keyPoints: null,
    // SEMI_COLON_SEPARATED
    keySplines: null,
    // SEMI_COLON_SEPARATED
    keyTimes: null,
    // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: m,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: m,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: m,
    overlineThickness: m,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: m,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: k,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: m,
    pointsAtY: m,
    pointsAtZ: m,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: O,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: O,
    rev: O,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: O,
    requiredFeatures: O,
    requiredFonts: O,
    requiredFormats: O,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: m,
    specularExponent: m,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: m,
    strikethroughThickness: m,
    string: null,
    stroke: null,
    strokeDashArray: O,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: m,
    strokeOpacity: m,
    strokeWidth: null,
    style: null,
    surfaceScale: m,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: O,
    tabIndex: m,
    tableValues: null,
    target: null,
    targetX: m,
    targetY: m,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: O,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: m,
    underlineThickness: m,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: m,
    values: null,
    vAlphabetic: m,
    vMathematical: m,
    vectorEffect: null,
    vHanging: m,
    vIdeographic: m,
    version: null,
    vertAdvY: m,
    vertOriginX: m,
    vertOriginY: m,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: m,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  }
}), Rr = /^data[-\w.:]+$/i, mt = /-[a-z]/g, Ar = /[A-Z]/g;
function Pr(n, e) {
  const t = Ve(e);
  let r = e, s = G;
  if (t in n.normal)
    return n.property[n.normal[t]];
  if (t.length > 4 && t.slice(0, 4) === "data" && Rr.test(e)) {
    if (e.charAt(4) === "-") {
      const o = e.slice(5).replace(mt, Tr);
      r = "data" + o.charAt(0).toUpperCase() + o.slice(1);
    } else {
      const o = e.slice(4);
      if (!mt.test(o)) {
        let i = o.replace(Ar, Nr);
        i.charAt(0) !== "-" && (i = "-" + i), e = "data" + i;
      }
    }
    s = Qe;
  }
  return new s(r, e);
}
function Nr(n) {
  return "-" + n.toLowerCase();
}
function Tr(n) {
  return n.charAt(1).toUpperCase();
}
const xr = Ht([Kt, Vt, Jt, Qt, vr], "html"), Zt = Ht([Kt, Vt, Jt, Qt, kr], "svg"), yt = {}.hasOwnProperty;
function Er(n, e) {
  const t = e;
  function r(s, ...o) {
    let i = r.invalid;
    const l = r.handlers;
    if (s && yt.call(s, n)) {
      const a = String(s[n]);
      i = yt.call(l, a) ? l[a] : r.unknown;
    }
    if (i)
      return i.call(this, s, ...o);
  }
  return r.handlers = t.handlers || {}, r.invalid = t.invalid, r.unknown = t.unknown, r;
}
const Ir = /["&'<>`]/g, Lr = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, Or = (
  // eslint-disable-next-line no-control-regex, unicorn/no-hex-escape
  /[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g
), Mr = /[|\\{}()[\]^$+*?.]/g, _t = /* @__PURE__ */ new WeakMap();
function Br(n, e) {
  if (n = n.replace(
    e.subset ? Gr(e.subset) : Ir,
    r
  ), e.subset || e.escapeOnly)
    return n;
  return n.replace(Lr, t).replace(Or, r);
  function t(s, o, i) {
    return e.format(
      (s.charCodeAt(0) - 55296) * 1024 + s.charCodeAt(1) - 56320 + 65536,
      i.charCodeAt(o + 2),
      e
    );
  }
  function r(s, o, i) {
    return e.format(
      s.charCodeAt(0),
      i.charCodeAt(o + 1),
      e
    );
  }
}
function Gr(n) {
  let e = _t.get(n);
  return e || (e = Dr(n), _t.set(n, e)), e;
}
function Dr(n) {
  const e = [];
  let t = -1;
  for (; ++t < n.length; )
    e.push(n[t].replace(Mr, "\\$&"));
  return new RegExp("(?:" + e.join("|") + ")", "g");
}
const Ur = /[\dA-Fa-f]/;
function jr(n, e, t) {
  const r = "&#x" + n.toString(16).toUpperCase();
  return t && e && !Ur.test(String.fromCharCode(e)) ? r : r + ";";
}
const $r = /\d/;
function Fr(n, e, t) {
  const r = "&#" + String(n);
  return t && e && !$r.test(String.fromCharCode(e)) ? r : r + ";";
}
const Wr = [
  "AElig",
  "AMP",
  "Aacute",
  "Acirc",
  "Agrave",
  "Aring",
  "Atilde",
  "Auml",
  "COPY",
  "Ccedil",
  "ETH",
  "Eacute",
  "Ecirc",
  "Egrave",
  "Euml",
  "GT",
  "Iacute",
  "Icirc",
  "Igrave",
  "Iuml",
  "LT",
  "Ntilde",
  "Oacute",
  "Ocirc",
  "Ograve",
  "Oslash",
  "Otilde",
  "Ouml",
  "QUOT",
  "REG",
  "THORN",
  "Uacute",
  "Ucirc",
  "Ugrave",
  "Uuml",
  "Yacute",
  "aacute",
  "acirc",
  "acute",
  "aelig",
  "agrave",
  "amp",
  "aring",
  "atilde",
  "auml",
  "brvbar",
  "ccedil",
  "cedil",
  "cent",
  "copy",
  "curren",
  "deg",
  "divide",
  "eacute",
  "ecirc",
  "egrave",
  "eth",
  "euml",
  "frac12",
  "frac14",
  "frac34",
  "gt",
  "iacute",
  "icirc",
  "iexcl",
  "igrave",
  "iquest",
  "iuml",
  "laquo",
  "lt",
  "macr",
  "micro",
  "middot",
  "nbsp",
  "not",
  "ntilde",
  "oacute",
  "ocirc",
  "ograve",
  "ordf",
  "ordm",
  "oslash",
  "otilde",
  "ouml",
  "para",
  "plusmn",
  "pound",
  "quot",
  "raquo",
  "reg",
  "sect",
  "shy",
  "sup1",
  "sup2",
  "sup3",
  "szlig",
  "thorn",
  "times",
  "uacute",
  "ucirc",
  "ugrave",
  "uml",
  "uuml",
  "yacute",
  "yen",
  "yuml"
], De = {
  nbsp: " ",
  iexcl: "¡",
  cent: "¢",
  pound: "£",
  curren: "¤",
  yen: "¥",
  brvbar: "¦",
  sect: "§",
  uml: "¨",
  copy: "©",
  ordf: "ª",
  laquo: "«",
  not: "¬",
  shy: "­",
  reg: "®",
  macr: "¯",
  deg: "°",
  plusmn: "±",
  sup2: "²",
  sup3: "³",
  acute: "´",
  micro: "µ",
  para: "¶",
  middot: "·",
  cedil: "¸",
  sup1: "¹",
  ordm: "º",
  raquo: "»",
  frac14: "¼",
  frac12: "½",
  frac34: "¾",
  iquest: "¿",
  Agrave: "À",
  Aacute: "Á",
  Acirc: "Â",
  Atilde: "Ã",
  Auml: "Ä",
  Aring: "Å",
  AElig: "Æ",
  Ccedil: "Ç",
  Egrave: "È",
  Eacute: "É",
  Ecirc: "Ê",
  Euml: "Ë",
  Igrave: "Ì",
  Iacute: "Í",
  Icirc: "Î",
  Iuml: "Ï",
  ETH: "Ð",
  Ntilde: "Ñ",
  Ograve: "Ò",
  Oacute: "Ó",
  Ocirc: "Ô",
  Otilde: "Õ",
  Ouml: "Ö",
  times: "×",
  Oslash: "Ø",
  Ugrave: "Ù",
  Uacute: "Ú",
  Ucirc: "Û",
  Uuml: "Ü",
  Yacute: "Ý",
  THORN: "Þ",
  szlig: "ß",
  agrave: "à",
  aacute: "á",
  acirc: "â",
  atilde: "ã",
  auml: "ä",
  aring: "å",
  aelig: "æ",
  ccedil: "ç",
  egrave: "è",
  eacute: "é",
  ecirc: "ê",
  euml: "ë",
  igrave: "ì",
  iacute: "í",
  icirc: "î",
  iuml: "ï",
  eth: "ð",
  ntilde: "ñ",
  ograve: "ò",
  oacute: "ó",
  ocirc: "ô",
  otilde: "õ",
  ouml: "ö",
  divide: "÷",
  oslash: "ø",
  ugrave: "ù",
  uacute: "ú",
  ucirc: "û",
  uuml: "ü",
  yacute: "ý",
  thorn: "þ",
  yuml: "ÿ",
  fnof: "ƒ",
  Alpha: "Α",
  Beta: "Β",
  Gamma: "Γ",
  Delta: "Δ",
  Epsilon: "Ε",
  Zeta: "Ζ",
  Eta: "Η",
  Theta: "Θ",
  Iota: "Ι",
  Kappa: "Κ",
  Lambda: "Λ",
  Mu: "Μ",
  Nu: "Ν",
  Xi: "Ξ",
  Omicron: "Ο",
  Pi: "Π",
  Rho: "Ρ",
  Sigma: "Σ",
  Tau: "Τ",
  Upsilon: "Υ",
  Phi: "Φ",
  Chi: "Χ",
  Psi: "Ψ",
  Omega: "Ω",
  alpha: "α",
  beta: "β",
  gamma: "γ",
  delta: "δ",
  epsilon: "ε",
  zeta: "ζ",
  eta: "η",
  theta: "θ",
  iota: "ι",
  kappa: "κ",
  lambda: "λ",
  mu: "μ",
  nu: "ν",
  xi: "ξ",
  omicron: "ο",
  pi: "π",
  rho: "ρ",
  sigmaf: "ς",
  sigma: "σ",
  tau: "τ",
  upsilon: "υ",
  phi: "φ",
  chi: "χ",
  psi: "ψ",
  omega: "ω",
  thetasym: "ϑ",
  upsih: "ϒ",
  piv: "ϖ",
  bull: "•",
  hellip: "…",
  prime: "′",
  Prime: "″",
  oline: "‾",
  frasl: "⁄",
  weierp: "℘",
  image: "ℑ",
  real: "ℜ",
  trade: "™",
  alefsym: "ℵ",
  larr: "←",
  uarr: "↑",
  rarr: "→",
  darr: "↓",
  harr: "↔",
  crarr: "↵",
  lArr: "⇐",
  uArr: "⇑",
  rArr: "⇒",
  dArr: "⇓",
  hArr: "⇔",
  forall: "∀",
  part: "∂",
  exist: "∃",
  empty: "∅",
  nabla: "∇",
  isin: "∈",
  notin: "∉",
  ni: "∋",
  prod: "∏",
  sum: "∑",
  minus: "−",
  lowast: "∗",
  radic: "√",
  prop: "∝",
  infin: "∞",
  ang: "∠",
  and: "∧",
  or: "∨",
  cap: "∩",
  cup: "∪",
  int: "∫",
  there4: "∴",
  sim: "∼",
  cong: "≅",
  asymp: "≈",
  ne: "≠",
  equiv: "≡",
  le: "≤",
  ge: "≥",
  sub: "⊂",
  sup: "⊃",
  nsub: "⊄",
  sube: "⊆",
  supe: "⊇",
  oplus: "⊕",
  otimes: "⊗",
  perp: "⊥",
  sdot: "⋅",
  lceil: "⌈",
  rceil: "⌉",
  lfloor: "⌊",
  rfloor: "⌋",
  lang: "〈",
  rang: "〉",
  loz: "◊",
  spades: "♠",
  clubs: "♣",
  hearts: "♥",
  diams: "♦",
  quot: '"',
  amp: "&",
  lt: "<",
  gt: ">",
  OElig: "Œ",
  oelig: "œ",
  Scaron: "Š",
  scaron: "š",
  Yuml: "Ÿ",
  circ: "ˆ",
  tilde: "˜",
  ensp: " ",
  emsp: " ",
  thinsp: " ",
  zwnj: "‌",
  zwj: "‍",
  lrm: "‎",
  rlm: "‏",
  ndash: "–",
  mdash: "—",
  lsquo: "‘",
  rsquo: "’",
  sbquo: "‚",
  ldquo: "“",
  rdquo: "”",
  bdquo: "„",
  dagger: "†",
  Dagger: "‡",
  permil: "‰",
  lsaquo: "‹",
  rsaquo: "›",
  euro: "€"
}, zr = [
  "cent",
  "copy",
  "divide",
  "gt",
  "lt",
  "not",
  "para",
  "times"
], en = {}.hasOwnProperty, Ye = {};
let pe;
for (pe in De)
  en.call(De, pe) && (Ye[De[pe]] = pe);
const Hr = /[^\dA-Za-z]/;
function qr(n, e, t, r) {
  const s = String.fromCharCode(n);
  if (en.call(Ye, s)) {
    const o = Ye[s], i = "&" + o;
    return t && Wr.includes(o) && !zr.includes(o) && (!r || e && e !== 61 && Hr.test(String.fromCharCode(e))) ? i : i + ";";
  }
  return "";
}
function Vr(n, e, t) {
  let r = jr(n, e, t.omitOptionalSemicolons), s;
  if ((t.useNamedReferences || t.useShortestReferences) && (s = qr(
    n,
    e,
    t.omitOptionalSemicolons,
    t.attribute
  )), (t.useShortestReferences || !s) && t.useShortestReferences) {
    const o = Fr(n, e, t.omitOptionalSemicolons);
    o.length < r.length && (r = o);
  }
  return s && (!t.useShortestReferences || s.length < r.length) ? s : r;
}
function X(n, e) {
  return Br(n, Object.assign({ format: Vr }, e));
}
const Kr = /^>|^->|<!--|-->|--!>|<!-$/g, Yr = [">"], Xr = ["<", ">"];
function Jr(n, e, t, r) {
  return r.settings.bogusComments ? "<?" + X(
    n.value,
    Object.assign({}, r.settings.characterReferences, {
      subset: Yr
    })
  ) + ">" : "<!--" + n.value.replace(Kr, s) + "-->";
  function s(o) {
    return X(
      o,
      Object.assign({}, r.settings.characterReferences, {
        subset: Xr
      })
    );
  }
}
function Qr(n, e, t, r) {
  return "<!" + (r.settings.upperDoctype ? "DOCTYPE" : "doctype") + (r.settings.tightDoctype ? "" : " ") + "html>";
}
function bt(n, e) {
  const t = String(n);
  if (typeof e != "string")
    throw new TypeError("Expected character");
  let r = 0, s = t.indexOf(e);
  for (; s !== -1; )
    r++, s = t.indexOf(e, s + e.length);
  return r;
}
function Zr(n, e) {
  const t = e || {};
  return (n[n.length - 1] === "" ? [...n, ""] : n).join(
    (t.padRight ? " " : "") + "," + (t.padLeft === !1 ? "" : " ")
  ).trim();
}
function es(n) {
  return n.join(" ").trim();
}
const ts = /[ \t\n\f\r]/g;
function Ze(n) {
  return typeof n == "object" ? n.type === "text" ? St(n.value) : !1 : St(n);
}
function St(n) {
  return n.replace(ts, "") === "";
}
const T = nn(1), tn = nn(-1), ns = [];
function nn(n) {
  return e;
  function e(t, r, s) {
    const o = t ? t.children : ns;
    let i = (r || 0) + n, l = o[i];
    if (!s)
      for (; l && Ze(l); )
        i += n, l = o[i];
    return l;
  }
}
const rs = {}.hasOwnProperty;
function rn(n) {
  return e;
  function e(t, r, s) {
    return rs.call(n, t.tagName) && n[t.tagName](t, r, s);
  }
}
const et = rn({
  body: os,
  caption: Ue,
  colgroup: Ue,
  dd: cs,
  dt: ls,
  head: Ue,
  html: ss,
  li: as,
  optgroup: us,
  option: hs,
  p: is,
  rp: Ct,
  rt: Ct,
  tbody: ds,
  td: wt,
  tfoot: ps,
  th: wt,
  thead: fs,
  tr: gs
});
function Ue(n, e, t) {
  const r = T(t, e, !0);
  return !r || r.type !== "comment" && !(r.type === "text" && Ze(r.value.charAt(0)));
}
function ss(n, e, t) {
  const r = T(t, e);
  return !r || r.type !== "comment";
}
function os(n, e, t) {
  const r = T(t, e);
  return !r || r.type !== "comment";
}
function is(n, e, t) {
  const r = T(t, e);
  return r ? r.type === "element" && (r.tagName === "address" || r.tagName === "article" || r.tagName === "aside" || r.tagName === "blockquote" || r.tagName === "details" || r.tagName === "div" || r.tagName === "dl" || r.tagName === "fieldset" || r.tagName === "figcaption" || r.tagName === "figure" || r.tagName === "footer" || r.tagName === "form" || r.tagName === "h1" || r.tagName === "h2" || r.tagName === "h3" || r.tagName === "h4" || r.tagName === "h5" || r.tagName === "h6" || r.tagName === "header" || r.tagName === "hgroup" || r.tagName === "hr" || r.tagName === "main" || r.tagName === "menu" || r.tagName === "nav" || r.tagName === "ol" || r.tagName === "p" || r.tagName === "pre" || r.tagName === "section" || r.tagName === "table" || r.tagName === "ul") : !t || // Confusing parent.
  !(t.type === "element" && (t.tagName === "a" || t.tagName === "audio" || t.tagName === "del" || t.tagName === "ins" || t.tagName === "map" || t.tagName === "noscript" || t.tagName === "video"));
}
function as(n, e, t) {
  const r = T(t, e);
  return !r || r.type === "element" && r.tagName === "li";
}
function ls(n, e, t) {
  const r = T(t, e);
  return !!(r && r.type === "element" && (r.tagName === "dt" || r.tagName === "dd"));
}
function cs(n, e, t) {
  const r = T(t, e);
  return !r || r.type === "element" && (r.tagName === "dt" || r.tagName === "dd");
}
function Ct(n, e, t) {
  const r = T(t, e);
  return !r || r.type === "element" && (r.tagName === "rp" || r.tagName === "rt");
}
function us(n, e, t) {
  const r = T(t, e);
  return !r || r.type === "element" && r.tagName === "optgroup";
}
function hs(n, e, t) {
  const r = T(t, e);
  return !r || r.type === "element" && (r.tagName === "option" || r.tagName === "optgroup");
}
function fs(n, e, t) {
  const r = T(t, e);
  return !!(r && r.type === "element" && (r.tagName === "tbody" || r.tagName === "tfoot"));
}
function ds(n, e, t) {
  const r = T(t, e);
  return !r || r.type === "element" && (r.tagName === "tbody" || r.tagName === "tfoot");
}
function ps(n, e, t) {
  return !T(t, e);
}
function gs(n, e, t) {
  const r = T(t, e);
  return !r || r.type === "element" && r.tagName === "tr";
}
function wt(n, e, t) {
  const r = T(t, e);
  return !r || r.type === "element" && (r.tagName === "td" || r.tagName === "th");
}
const ms = rn({
  body: bs,
  colgroup: Ss,
  head: _s,
  html: ys,
  tbody: Cs
});
function ys(n) {
  const e = T(n, -1);
  return !e || e.type !== "comment";
}
function _s(n) {
  const e = /* @__PURE__ */ new Set();
  for (const r of n.children)
    if (r.type === "element" && (r.tagName === "base" || r.tagName === "title")) {
      if (e.has(r.tagName)) return !1;
      e.add(r.tagName);
    }
  const t = n.children[0];
  return !t || t.type === "element";
}
function bs(n) {
  const e = T(n, -1, !0);
  return !e || e.type !== "comment" && !(e.type === "text" && Ze(e.value.charAt(0))) && !(e.type === "element" && (e.tagName === "meta" || e.tagName === "link" || e.tagName === "script" || e.tagName === "style" || e.tagName === "template"));
}
function Ss(n, e, t) {
  const r = tn(t, e), s = T(n, -1, !0);
  return t && r && r.type === "element" && r.tagName === "colgroup" && et(r, t.children.indexOf(r), t) ? !1 : !!(s && s.type === "element" && s.tagName === "col");
}
function Cs(n, e, t) {
  const r = tn(t, e), s = T(n, -1);
  return t && r && r.type === "element" && (r.tagName === "thead" || r.tagName === "tbody") && et(r, t.children.indexOf(r), t) ? !1 : !!(s && s.type === "element" && s.tagName === "tr");
}
const ge = {
  // See: <https://html.spec.whatwg.org/#attribute-name-state>.
  name: [
    [`	
\f\r &/=>`.split(""), `	
\f\r "&'/=>\``.split("")],
    [`\0	
\f\r "&'/<=>`.split(""), `\0	
\f\r "&'/<=>\``.split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(unquoted)-state>.
  unquoted: [
    [`	
\f\r &>`.split(""), `\0	
\f\r "&'<=>\``.split("")],
    [`\0	
\f\r "&'<=>\``.split(""), `\0	
\f\r "&'<=>\``.split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(single-quoted)-state>.
  single: [
    ["&'".split(""), "\"&'`".split("")],
    ["\0&'".split(""), "\0\"&'`".split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(double-quoted)-state>.
  double: [
    ['"&'.split(""), "\"&'`".split("")],
    ['\0"&'.split(""), "\0\"&'`".split("")]
  ]
};
function ws(n, e, t, r) {
  const s = r.schema, o = s.space === "svg" ? !1 : r.settings.omitOptionalTags;
  let i = s.space === "svg" ? r.settings.closeEmptyElements : r.settings.voids.includes(n.tagName.toLowerCase());
  const l = [];
  let a;
  s.space === "html" && n.tagName === "svg" && (r.schema = Zt);
  const c = vs(r, n.properties), u = r.all(
    s.space === "html" && n.tagName === "template" ? n.content : n
  );
  return r.schema = s, u && (i = !1), (c || !o || !ms(n, e, t)) && (l.push("<", n.tagName, c ? " " + c : ""), i && (s.space === "svg" || r.settings.closeSelfClosing) && (a = c.charAt(c.length - 1), (!r.settings.tightSelfClosing || a === "/" || a && a !== '"' && a !== "'") && l.push(" "), l.push("/")), l.push(">")), l.push(u), !i && (!o || !et(n, e, t)) && l.push("</" + n.tagName + ">"), l.join("");
}
function vs(n, e) {
  const t = [];
  let r = -1, s;
  if (e) {
    for (s in e)
      if (e[s] !== null && e[s] !== void 0) {
        const o = ks(n, s, e[s]);
        o && t.push(o);
      }
  }
  for (; ++r < t.length; ) {
    const o = n.settings.tightAttributes ? t[r].charAt(t[r].length - 1) : void 0;
    r !== t.length - 1 && o !== '"' && o !== "'" && (t[r] += " ");
  }
  return t.join("");
}
function ks(n, e, t) {
  const r = Pr(n.schema, e), s = n.settings.allowParseErrors && n.schema.space === "html" ? 0 : 1, o = n.settings.allowDangerousCharacters ? 0 : 1;
  let i = n.quote, l;
  if (r.overloadedBoolean && (t === r.attribute || t === "") ? t = !0 : (r.boolean || r.overloadedBoolean) && (typeof t != "string" || t === r.attribute || t === "") && (t = !!t), t == null || t === !1 || typeof t == "number" && Number.isNaN(t))
    return "";
  const a = X(
    r.attribute,
    Object.assign({}, n.settings.characterReferences, {
      // Always encode without parse errors in non-HTML.
      subset: ge.name[s][o]
    })
  );
  return t === !0 || (t = Array.isArray(t) ? (r.commaSeparated ? Zr : es)(t, {
    padLeft: !n.settings.tightCommaSeparatedLists
  }) : String(t), n.settings.collapseEmptyAttributes && !t) ? a : (n.settings.preferUnquoted && (l = X(
    t,
    Object.assign({}, n.settings.characterReferences, {
      attribute: !0,
      subset: ge.unquoted[s][o]
    })
  )), l !== t && (n.settings.quoteSmart && bt(t, i) > bt(t, n.alternative) && (i = n.alternative), l = i + X(
    t,
    Object.assign({}, n.settings.characterReferences, {
      // Always encode without parse errors in non-HTML.
      subset: (i === "'" ? ge.single : ge.double)[s][o],
      attribute: !0
    })
  ) + i), a + (l && "=" + l));
}
const Rs = ["<", "&"];
function sn(n, e, t, r) {
  return t && t.type === "element" && (t.tagName === "script" || t.tagName === "style") ? n.value : X(
    n.value,
    Object.assign({}, r.settings.characterReferences, {
      subset: Rs
    })
  );
}
function As(n, e, t, r) {
  return r.settings.allowDangerousHtml ? n.value : sn(n, e, t, r);
}
function Ps(n, e, t, r) {
  return r.all(n);
}
const Ns = Er("type", {
  invalid: Ts,
  unknown: xs,
  handlers: { comment: Jr, doctype: Qr, element: ws, raw: As, root: Ps, text: sn }
});
function Ts(n) {
  throw new Error("Expected node, not `" + n + "`");
}
function xs(n) {
  const e = (
    /** @type {Nodes} */
    n
  );
  throw new Error("Cannot compile unknown node `" + e.type + "`");
}
const Es = {}, Is = {}, Ls = [];
function Os(n, e) {
  const t = Es, r = t.quote || '"', s = r === '"' ? "'" : '"';
  if (r !== '"' && r !== "'")
    throw new Error("Invalid quote `" + r + "`, expected `'` or `\"`");
  return {
    one: Ms,
    all: Bs,
    settings: {
      omitOptionalTags: t.omitOptionalTags || !1,
      allowParseErrors: t.allowParseErrors || !1,
      allowDangerousCharacters: t.allowDangerousCharacters || !1,
      quoteSmart: t.quoteSmart || !1,
      preferUnquoted: t.preferUnquoted || !1,
      tightAttributes: t.tightAttributes || !1,
      upperDoctype: t.upperDoctype || !1,
      tightDoctype: t.tightDoctype || !1,
      bogusComments: t.bogusComments || !1,
      tightCommaSeparatedLists: t.tightCommaSeparatedLists || !1,
      tightSelfClosing: t.tightSelfClosing || !1,
      collapseEmptyAttributes: t.collapseEmptyAttributes || !1,
      allowDangerousHtml: t.allowDangerousHtml || !1,
      voids: t.voids || Sr,
      characterReferences: t.characterReferences || Is,
      closeSelfClosing: t.closeSelfClosing || !1,
      closeEmptyElements: t.closeEmptyElements || !1
    },
    schema: t.space === "svg" ? Zt : xr,
    quote: r,
    alternative: s
  }.one(
    Array.isArray(n) ? { type: "root", children: n } : n,
    void 0,
    void 0
  );
}
function Ms(n, e, t) {
  return Ns(n, e, t, this);
}
function Bs(n) {
  const e = [], t = n && n.children || Ls;
  let r = -1;
  for (; ++r < t.length; )
    e[r] = this.one(t[r], r, n);
  return e.join("");
}
function Gs(n) {
  return Array.isArray(n) ? n : [n];
}
function Te(n, e = !1) {
  var o;
  const t = n.split(/(\r?\n)/g);
  let r = 0;
  const s = [];
  for (let i = 0; i < t.length; i += 2) {
    const l = e ? t[i] + (t[i + 1] || "") : t[i];
    s.push([l, r]), r += t[i].length, r += ((o = t[i + 1]) == null ? void 0 : o.length) || 0;
  }
  return s;
}
function tt(n) {
  return !n || ["plaintext", "txt", "text", "plain"].includes(n);
}
function Ds(n) {
  return n === "ansi" || tt(n);
}
function nt(n) {
  return n === "none";
}
function Us(n) {
  return nt(n);
}
function on(n, e) {
  var r;
  if (!e)
    return n;
  n.properties || (n.properties = {}), (r = n.properties).class || (r.class = []), typeof n.properties.class == "string" && (n.properties.class = n.properties.class.split(/\s+/g)), Array.isArray(n.properties.class) || (n.properties.class = []);
  const t = Array.isArray(e) ? e : e.split(/\s+/g);
  for (const s of t)
    s && !n.properties.class.includes(s) && n.properties.class.push(s);
  return n;
}
function js(n, e) {
  let t = 0;
  const r = [];
  for (const s of e)
    s > t && r.push({
      ...n,
      content: n.content.slice(t, s),
      offset: n.offset + t
    }), t = s;
  return t < n.content.length && r.push({
    ...n,
    content: n.content.slice(t),
    offset: n.offset + t
  }), r;
}
function $s(n, e) {
  const t = Array.from(e instanceof Set ? e : new Set(e)).sort((r, s) => r - s);
  return t.length ? n.map((r) => r.flatMap((s) => {
    const o = t.filter((i) => s.offset < i && i < s.offset + s.content.length).map((i) => i - s.offset).sort((i, l) => i - l);
    return o.length ? js(s, o) : s;
  })) : n;
}
async function an(n) {
  return Promise.resolve(typeof n == "function" ? n() : n).then((e) => e.default || e);
}
function ve(n, e) {
  const t = typeof n == "string" ? {} : { ...n.colorReplacements }, r = typeof n == "string" ? n : n.name;
  for (const [s, o] of Object.entries((e == null ? void 0 : e.colorReplacements) || {}))
    typeof o == "string" ? t[s] = o : s === r && Object.assign(t, o);
  return t;
}
function z(n, e) {
  return n && ((e == null ? void 0 : e[n == null ? void 0 : n.toLowerCase()]) || n);
}
function ln(n) {
  const e = {};
  return n.color && (e.color = n.color), n.bgColor && (e["background-color"] = n.bgColor), n.fontStyle && (n.fontStyle & W.Italic && (e["font-style"] = "italic"), n.fontStyle & W.Bold && (e["font-weight"] = "bold"), n.fontStyle & W.Underline && (e["text-decoration"] = "underline")), e;
}
function Fs(n) {
  return typeof n == "string" ? n : Object.entries(n).map(([e, t]) => `${e}:${t}`).join(";");
}
function Ws(n) {
  const e = Te(n, !0).map(([s]) => s);
  function t(s) {
    if (s === n.length)
      return {
        line: e.length - 1,
        character: e[e.length - 1].length
      };
    let o = s, i = 0;
    for (const l of e) {
      if (o < l.length)
        break;
      o -= l.length, i++;
    }
    return { line: i, character: o };
  }
  function r(s, o) {
    let i = 0;
    for (let l = 0; l < s; l++)
      i += e[l].length;
    return i += o, i;
  }
  return {
    lines: e,
    indexToPos: t,
    posToIndex: r
  };
}
class I extends Error {
  constructor(e) {
    super(e), this.name = "ShikiError";
  }
}
const cn = /* @__PURE__ */ new WeakMap();
function xe(n, e) {
  cn.set(n, e);
}
function ae(n) {
  return cn.get(n);
}
class Z {
  constructor(...e) {
    /**
     * Theme to Stack mapping
     */
    p(this, "_stacks", {});
    p(this, "lang");
    if (e.length === 2) {
      const [t, r] = e;
      this.lang = r, this._stacks = t;
    } else {
      const [t, r, s] = e;
      this.lang = r, this._stacks = { [s]: t };
    }
  }
  get themes() {
    return Object.keys(this._stacks);
  }
  get theme() {
    return this.themes[0];
  }
  get _stack() {
    return this._stacks[this.theme];
  }
  /**
   * Static method to create a initial grammar state.
   */
  static initial(e, t) {
    return new Z(
      Object.fromEntries(Gs(t).map((r) => [r, qe])),
      e
    );
  }
  /**
   * Get the internal stack object.
   * @internal
   */
  getInternalStack(e = this.theme) {
    return this._stacks[e];
  }
  /**
   * @deprecated use `getScopes` instead
   */
  get scopes() {
    return vt(this._stacks[this.theme]);
  }
  getScopes(e = this.theme) {
    return vt(this._stacks[e]);
  }
  toJSON() {
    return {
      lang: this.lang,
      theme: this.theme,
      themes: this.themes,
      scopes: this.scopes
    };
  }
}
function vt(n) {
  const e = [], t = /* @__PURE__ */ new Set();
  function r(s) {
    var i;
    if (t.has(s))
      return;
    t.add(s);
    const o = (i = s == null ? void 0 : s.nameScopesList) == null ? void 0 : i.scopeName;
    o && e.push(o), s.parent && r(s.parent);
  }
  return r(n), e;
}
function zs(n, e) {
  if (!(n instanceof Z))
    throw new I("Invalid grammar state");
  return n.getInternalStack(e);
}
function Hs() {
  const n = /* @__PURE__ */ new WeakMap();
  function e(t) {
    if (!n.has(t.meta)) {
      let r = function(i) {
        if (typeof i == "number") {
          if (i < 0 || i > t.source.length)
            throw new I(`Invalid decoration offset: ${i}. Code length: ${t.source.length}`);
          return {
            ...s.indexToPos(i),
            offset: i
          };
        } else {
          const l = s.lines[i.line];
          if (l === void 0)
            throw new I(`Invalid decoration position ${JSON.stringify(i)}. Lines length: ${s.lines.length}`);
          if (i.character < 0 || i.character > l.length)
            throw new I(`Invalid decoration position ${JSON.stringify(i)}. Line ${i.line} length: ${l.length}`);
          return {
            ...i,
            offset: s.posToIndex(i.line, i.character)
          };
        }
      };
      const s = Ws(t.source), o = (t.options.decorations || []).map((i) => ({
        ...i,
        start: r(i.start),
        end: r(i.end)
      }));
      qs(o), n.set(t.meta, {
        decorations: o,
        converter: s,
        source: t.source
      });
    }
    return n.get(t.meta);
  }
  return {
    name: "shiki:decorations",
    tokens(t) {
      var i;
      if (!((i = this.options.decorations) != null && i.length))
        return;
      const s = e(this).decorations.flatMap((l) => [l.start.offset, l.end.offset]);
      return $s(t, s);
    },
    code(t) {
      var u;
      if (!((u = this.options.decorations) != null && u.length))
        return;
      const r = e(this), s = Array.from(t.children).filter((h) => h.type === "element" && h.tagName === "span");
      if (s.length !== r.converter.lines.length)
        throw new I(`Number of lines in code element (${s.length}) does not match the number of lines in the source (${r.converter.lines.length}). Failed to apply decorations.`);
      function o(h, d, f, g) {
        const C = s[h];
        let _ = "", y = -1, b = -1;
        if (d === 0 && (y = 0), f === 0 && (b = 0), f === Number.POSITIVE_INFINITY && (b = C.children.length), y === -1 || b === -1)
          for (let v = 0; v < C.children.length; v++)
            _ += un(C.children[v]), y === -1 && _.length === d && (y = v + 1), b === -1 && _.length === f && (b = v + 1);
        if (y === -1)
          throw new I(`Failed to find start index for decoration ${JSON.stringify(g.start)}`);
        if (b === -1)
          throw new I(`Failed to find end index for decoration ${JSON.stringify(g.end)}`);
        const S = C.children.slice(y, b);
        if (!g.alwaysWrap && S.length === C.children.length)
          l(C, g, "line");
        else if (!g.alwaysWrap && S.length === 1 && S[0].type === "element")
          l(S[0], g, "token");
        else {
          const v = {
            type: "element",
            tagName: "span",
            properties: {},
            children: S
          };
          l(v, g, "wrapper"), C.children.splice(y, S.length, v);
        }
      }
      function i(h, d) {
        s[h] = l(s[h], d, "line");
      }
      function l(h, d, f) {
        var _;
        const g = d.properties || {}, C = d.transform || ((y) => y);
        return h.tagName = d.tagName || "span", h.properties = {
          ...h.properties,
          ...g,
          class: h.properties.class
        }, (_ = d.properties) != null && _.class && on(h, d.properties.class), h = C(h, f) || h, h;
      }
      const a = [], c = r.decorations.sort((h, d) => d.start.offset - h.start.offset);
      for (const h of c) {
        const { start: d, end: f } = h;
        if (d.line === f.line)
          o(d.line, d.character, f.character, h);
        else if (d.line < f.line) {
          o(d.line, d.character, Number.POSITIVE_INFINITY, h);
          for (let g = d.line + 1; g < f.line; g++)
            a.unshift(() => i(g, h));
          o(f.line, 0, f.character, h);
        }
      }
      a.forEach((h) => h());
    }
  };
}
function qs(n) {
  for (let e = 0; e < n.length; e++) {
    const t = n[e];
    if (t.start.offset > t.end.offset)
      throw new I(`Invalid decoration range: ${JSON.stringify(t.start)} - ${JSON.stringify(t.end)}`);
    for (let r = e + 1; r < n.length; r++) {
      const s = n[r], o = t.start.offset < s.start.offset && s.start.offset < t.end.offset, i = t.start.offset < s.end.offset && s.end.offset < t.end.offset, l = s.start.offset < t.start.offset && t.start.offset < s.end.offset, a = s.start.offset < t.end.offset && t.end.offset < s.end.offset;
      if (o || i || l || a) {
        if (i && i || l && a)
          continue;
        throw new I(`Decorations ${JSON.stringify(t.start)} and ${JSON.stringify(s.start)} intersect.`);
      }
    }
  }
}
function un(n) {
  return n.type === "text" ? n.value : n.type === "element" ? n.children.map(un).join("") : "";
}
const Vs = [
  /* @__PURE__ */ Hs()
];
function ke(n) {
  return [
    ...n.transformers || [],
    ...Vs
  ];
}
var H = [
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
  "brightBlack",
  "brightRed",
  "brightGreen",
  "brightYellow",
  "brightBlue",
  "brightMagenta",
  "brightCyan",
  "brightWhite"
], je = {
  1: "bold",
  2: "dim",
  3: "italic",
  4: "underline",
  7: "reverse",
  9: "strikethrough"
};
function Ks(n, e) {
  const t = n.indexOf("\x1B[", e);
  if (t !== -1) {
    const r = n.indexOf("m", t);
    return {
      sequence: n.substring(t + 2, r).split(";"),
      startPosition: t,
      position: r + 1
    };
  }
  return {
    position: n.length
  };
}
function kt(n, e) {
  let t = 1;
  const r = n[e + t++];
  let s;
  if (r === "2") {
    const o = [
      n[e + t++],
      n[e + t++],
      n[e + t]
    ].map((i) => Number.parseInt(i));
    o.length === 3 && !o.some((i) => Number.isNaN(i)) && (s = {
      type: "rgb",
      rgb: o
    });
  } else if (r === "5") {
    const o = Number.parseInt(n[e + t]);
    Number.isNaN(o) || (s = { type: "table", index: Number(o) });
  }
  return [t, s];
}
function Ys(n) {
  const e = [];
  for (let t = 0; t < n.length; t++) {
    const r = n[t], s = Number.parseInt(r);
    if (!Number.isNaN(s))
      if (s === 0)
        e.push({ type: "resetAll" });
      else if (s <= 9)
        je[s] && e.push({
          type: "setDecoration",
          value: je[s]
        });
      else if (s <= 29) {
        const o = je[s - 20];
        o && e.push({
          type: "resetDecoration",
          value: o
        });
      } else if (s <= 37)
        e.push({
          type: "setForegroundColor",
          value: { type: "named", name: H[s - 30] }
        });
      else if (s === 38) {
        const [o, i] = kt(n, t);
        i && e.push({
          type: "setForegroundColor",
          value: i
        }), t += o;
      } else if (s === 39)
        e.push({
          type: "resetForegroundColor"
        });
      else if (s <= 47)
        e.push({
          type: "setBackgroundColor",
          value: { type: "named", name: H[s - 40] }
        });
      else if (s === 48) {
        const [o, i] = kt(n, t);
        i && e.push({
          type: "setBackgroundColor",
          value: i
        }), t += o;
      } else s === 49 ? e.push({
        type: "resetBackgroundColor"
      }) : s >= 90 && s <= 97 ? e.push({
        type: "setForegroundColor",
        value: { type: "named", name: H[s - 90 + 8] }
      }) : s >= 100 && s <= 107 && e.push({
        type: "setBackgroundColor",
        value: { type: "named", name: H[s - 100 + 8] }
      });
  }
  return e;
}
function Xs() {
  let n = null, e = null, t = /* @__PURE__ */ new Set();
  return {
    parse(r) {
      const s = [];
      let o = 0;
      do {
        const i = Ks(r, o), l = i.sequence ? r.substring(o, i.startPosition) : r.substring(o);
        if (l.length > 0 && s.push({
          value: l,
          foreground: n,
          background: e,
          decorations: new Set(t)
        }), i.sequence) {
          const a = Ys(i.sequence);
          for (const c of a)
            c.type === "resetAll" ? (n = null, e = null, t.clear()) : c.type === "resetForegroundColor" ? n = null : c.type === "resetBackgroundColor" ? e = null : c.type === "resetDecoration" && t.delete(c.value);
          for (const c of a)
            c.type === "setForegroundColor" ? n = c.value : c.type === "setBackgroundColor" ? e = c.value : c.type === "setDecoration" && t.add(c.value);
        }
        o = i.position;
      } while (o < r.length);
      return s;
    }
  };
}
var Js = {
  black: "#000000",
  red: "#bb0000",
  green: "#00bb00",
  yellow: "#bbbb00",
  blue: "#0000bb",
  magenta: "#ff00ff",
  cyan: "#00bbbb",
  white: "#eeeeee",
  brightBlack: "#555555",
  brightRed: "#ff5555",
  brightGreen: "#00ff00",
  brightYellow: "#ffff55",
  brightBlue: "#5555ff",
  brightMagenta: "#ff55ff",
  brightCyan: "#55ffff",
  brightWhite: "#ffffff"
};
function Qs(n = Js) {
  function e(l) {
    return n[l];
  }
  function t(l) {
    return `#${l.map((a) => Math.max(0, Math.min(a, 255)).toString(16).padStart(2, "0")).join("")}`;
  }
  let r;
  function s() {
    if (r)
      return r;
    r = [];
    for (let c = 0; c < H.length; c++)
      r.push(e(H[c]));
    let l = [0, 95, 135, 175, 215, 255];
    for (let c = 0; c < 6; c++)
      for (let u = 0; u < 6; u++)
        for (let h = 0; h < 6; h++)
          r.push(t([l[c], l[u], l[h]]));
    let a = 8;
    for (let c = 0; c < 24; c++, a += 10)
      r.push(t([a, a, a]));
    return r;
  }
  function o(l) {
    return s()[l];
  }
  function i(l) {
    switch (l.type) {
      case "named":
        return e(l.name);
      case "rgb":
        return t(l.rgb);
      case "table":
        return o(l.index);
    }
  }
  return {
    value: i
  };
}
function Zs(n, e, t) {
  const r = ve(n, t), s = Te(e), o = Qs(
    Object.fromEntries(
      H.map((l) => {
        var a;
        return [
          l,
          (a = n.colors) == null ? void 0 : a[`terminal.ansi${l[0].toUpperCase()}${l.substring(1)}`]
        ];
      })
    )
  ), i = Xs();
  return s.map(
    (l) => i.parse(l[0]).map((a) => {
      let c, u;
      a.decorations.has("reverse") ? (c = a.background ? o.value(a.background) : n.bg, u = a.foreground ? o.value(a.foreground) : n.fg) : (c = a.foreground ? o.value(a.foreground) : n.fg, u = a.background ? o.value(a.background) : void 0), c = z(c, r), u = z(u, r), a.decorations.has("dim") && (c = eo(c));
      let h = W.None;
      return a.decorations.has("bold") && (h |= W.Bold), a.decorations.has("italic") && (h |= W.Italic), a.decorations.has("underline") && (h |= W.Underline), {
        content: a.value,
        offset: l[1],
        // TODO: more accurate offset? might need to fork ansi-sequence-parser
        color: c,
        bgColor: u,
        fontStyle: h
      };
    })
  );
}
function eo(n) {
  const e = n.match(/#([0-9a-f]{3})([0-9a-f]{3})?([0-9a-f]{2})?/);
  if (e)
    if (e[3]) {
      const r = Math.round(Number.parseInt(e[3], 16) / 2).toString(16).padStart(2, "0");
      return `#${e[1]}${e[2]}${r}`;
    } else return e[2] ? `#${e[1]}${e[2]}80` : `#${Array.from(e[1]).map((r) => `${r}${r}`).join("")}80`;
  const t = n.match(/var\((--[\w-]+-ansi-[\w-]+)\)/);
  return t ? `var(${t[1]}-dim)` : n;
}
function rt(n, e, t = {}) {
  const {
    lang: r = "text",
    theme: s = n.getLoadedThemes()[0]
  } = t;
  if (tt(r) || nt(s))
    return Te(e).map((a) => [{ content: a[0], offset: a[1] }]);
  const { theme: o, colorMap: i } = n.setTheme(s);
  if (r === "ansi")
    return Zs(o, e, t);
  const l = n.getLanguage(r);
  if (t.grammarState) {
    if (t.grammarState.lang !== l.name)
      throw new q(`Grammar state language "${t.grammarState.lang}" does not match highlight language "${l.name}"`);
    if (!t.grammarState.themes.includes(o.name))
      throw new q(`Grammar state themes "${t.grammarState.themes}" do not contain highlight theme "${o.name}"`);
  }
  return no(e, l, o, i, t);
}
function to(...n) {
  if (n.length === 2)
    return ae(n[1]);
  const [e, t, r = {}] = n, {
    lang: s = "text",
    theme: o = e.getLoadedThemes()[0]
  } = r;
  if (tt(s) || nt(o))
    throw new q("Plain language does not have grammar state");
  if (s === "ansi")
    throw new q("ANSI language does not have grammar state");
  const { theme: i, colorMap: l } = e.setTheme(o), a = e.getLanguage(s);
  return new Z(
    Re(t, a, i, l, r).stateStack,
    a.name,
    i.name
  );
}
function no(n, e, t, r, s) {
  const o = Re(n, e, t, r, s), i = new Z(
    Re(n, e, t, r, s).stateStack,
    e.name,
    t.name
  );
  return xe(o.tokens, i), o.tokens;
}
function Re(n, e, t, r, s) {
  const o = ve(t, s), {
    tokenizeMaxLineLength: i = 0,
    tokenizeTimeLimit: l = 500
  } = s, a = Te(n);
  let c = s.grammarState ? zs(s.grammarState, t.name) ?? qe : s.grammarContextCode != null ? Re(
    s.grammarContextCode,
    e,
    t,
    r,
    {
      ...s,
      grammarState: void 0,
      grammarContextCode: void 0
    }
  ).stateStack : qe, u = [];
  const h = [];
  for (let d = 0, f = a.length; d < f; d++) {
    const [g, C] = a[d];
    if (g === "") {
      u = [], h.push([]);
      continue;
    }
    if (i > 0 && g.length >= i) {
      u = [], h.push([{
        content: g,
        offset: C,
        color: "",
        fontStyle: 0
      }]);
      continue;
    }
    let _, y, b;
    s.includeExplanation && (_ = e.tokenizeLine(g, c), y = _.tokens, b = 0);
    const S = e.tokenizeLine2(g, c, l), v = S.tokens.length / 2;
    for (let R = 0; R < v; R++) {
      const L = S.tokens[2 * R], P = R + 1 < v ? S.tokens[2 * R + 2] : g.length;
      if (L === P)
        continue;
      const j = S.tokens[2 * R + 1], he = z(
        r[J.getForeground(j)],
        o
      ), ee = J.getFontStyle(j), Ee = {
        content: g.substring(L, P),
        offset: C + L,
        color: he,
        fontStyle: ee
      };
      if (s.includeExplanation) {
        const ot = [];
        if (s.includeExplanation !== "scopeName")
          for (const $ of t.settings) {
            let K;
            switch (typeof $.scope) {
              case "string":
                K = $.scope.split(/,/).map((Ie) => Ie.trim());
                break;
              case "object":
                K = $.scope;
                break;
              default:
                continue;
            }
            ot.push({
              settings: $,
              selectors: K.map((Ie) => Ie.split(/ /))
            });
          }
        Ee.explanation = [];
        let it = 0;
        for (; L + it < P; ) {
          const $ = y[b], K = g.substring(
            $.startIndex,
            $.endIndex
          );
          it += K.length, Ee.explanation.push({
            content: K,
            scopes: s.includeExplanation === "scopeName" ? ro(
              $.scopes
            ) : so(
              ot,
              $.scopes
            )
          }), b += 1;
        }
      }
      u.push(Ee);
    }
    h.push(u), u = [], c = S.ruleStack;
  }
  return {
    tokens: h,
    stateStack: c
  };
}
function ro(n) {
  return n.map((e) => ({ scopeName: e }));
}
function so(n, e) {
  const t = [];
  for (let r = 0, s = e.length; r < s; r++) {
    const o = e[r];
    t[r] = {
      scopeName: o,
      themeMatches: io(n, o, e.slice(0, r))
    };
  }
  return t;
}
function Rt(n, e) {
  return n === e || e.substring(0, n.length) === n && e[n.length] === ".";
}
function oo(n, e, t) {
  if (!Rt(n[n.length - 1], e))
    return !1;
  let r = n.length - 2, s = t.length - 1;
  for (; r >= 0 && s >= 0; )
    Rt(n[r], t[s]) && (r -= 1), s -= 1;
  return r === -1;
}
function io(n, e, t) {
  const r = [];
  for (const { selectors: s, settings: o } of n)
    for (const i of s)
      if (oo(i, e, t)) {
        r.push(o);
        break;
      }
  return r;
}
function hn(n, e, t) {
  const r = Object.entries(t.themes).filter((a) => a[1]).map((a) => ({ color: a[0], theme: a[1] })), s = r.map((a) => {
    const c = rt(n, e, {
      ...t,
      theme: a.theme
    }), u = ae(c), h = typeof a.theme == "string" ? a.theme : a.theme.name;
    return {
      tokens: c,
      state: u,
      theme: h
    };
  }), o = ao(
    ...s.map((a) => a.tokens)
  ), i = o[0].map(
    (a, c) => a.map((u, h) => {
      const d = {
        content: u.content,
        variants: {},
        offset: u.offset
      };
      return "includeExplanation" in t && t.includeExplanation && (d.explanation = u.explanation), o.forEach((f, g) => {
        const {
          content: C,
          explanation: _,
          offset: y,
          ...b
        } = f[c][h];
        d.variants[r[g].color] = b;
      }), d;
    })
  ), l = s[0].state ? new Z(
    Object.fromEntries(s.map((a) => {
      var c;
      return [a.theme, (c = a.state) == null ? void 0 : c.getInternalStack(a.theme)];
    })),
    s[0].state.lang
  ) : void 0;
  return l && xe(i, l), i;
}
function ao(...n) {
  const e = n.map(() => []), t = n.length;
  for (let r = 0; r < n[0].length; r++) {
    const s = n.map((a) => a[r]), o = e.map(() => []);
    e.forEach((a, c) => a.push(o[c]));
    const i = s.map(() => 0), l = s.map((a) => a[0]);
    for (; l.every((a) => a); ) {
      const a = Math.min(...l.map((c) => c.content.length));
      for (let c = 0; c < t; c++) {
        const u = l[c];
        u.content.length === a ? (o[c].push(u), i[c] += 1, l[c] = s[c][i[c]]) : (o[c].push({
          ...u,
          content: u.content.slice(0, a)
        }), l[c] = {
          ...u,
          content: u.content.slice(a),
          offset: u.offset + a
        });
      }
    }
  }
  return e;
}
function Ae(n, e, t) {
  let r, s, o, i, l, a;
  if ("themes" in t) {
    const {
      defaultColor: c = "light",
      cssVariablePrefix: u = "--shiki-"
    } = t, h = Object.entries(t.themes).filter((_) => _[1]).map((_) => ({ color: _[0], theme: _[1] })).sort((_, y) => _.color === c ? -1 : y.color === c ? 1 : 0);
    if (h.length === 0)
      throw new q("`themes` option must not be empty");
    const d = hn(
      n,
      e,
      t
    );
    if (a = ae(d), c && !h.find((_) => _.color === c))
      throw new q(`\`themes\` option must contain the defaultColor key \`${c}\``);
    const f = h.map((_) => n.getTheme(_.theme)), g = h.map((_) => _.color);
    o = d.map((_) => _.map((y) => lo(y, g, u, c))), a && xe(o, a);
    const C = h.map((_) => ve(_.theme, t));
    s = h.map((_, y) => (y === 0 && c ? "" : `${u + _.color}:`) + (z(f[y].fg, C[y]) || "inherit")).join(";"), r = h.map((_, y) => (y === 0 && c ? "" : `${u + _.color}-bg:`) + (z(f[y].bg, C[y]) || "inherit")).join(";"), i = `shiki-themes ${f.map((_) => _.name).join(" ")}`, l = c ? void 0 : [s, r].join(";");
  } else if ("theme" in t) {
    const c = ve(t.theme, t);
    o = rt(
      n,
      e,
      t
    );
    const u = n.getTheme(t.theme);
    r = z(u.bg, c), s = z(u.fg, c), i = u.name, a = ae(o);
  } else
    throw new q("Invalid options, either `theme` or `themes` must be provided");
  return {
    tokens: o,
    fg: s,
    bg: r,
    themeName: i,
    rootStyle: l,
    grammarState: a
  };
}
function lo(n, e, t, r) {
  const s = {
    content: n.content,
    explanation: n.explanation,
    offset: n.offset
  }, o = e.map((a) => ln(n.variants[a])), i = new Set(o.flatMap((a) => Object.keys(a))), l = {};
  return o.forEach((a, c) => {
    for (const u of i) {
      const h = a[u] || "inherit";
      if (c === 0 && r)
        l[u] = h;
      else {
        const d = u === "color" ? "" : u === "background-color" ? "-bg" : `-${u}`, f = t + e[c] + (u === "color" ? "" : d);
        l[f] = h;
      }
    }
  }), s.htmlStyle = l, s;
}
function Pe(n, e, t, r = {
  meta: {},
  options: t,
  codeToHast: (s, o) => Pe(n, s, o),
  codeToTokens: (s, o) => Ae(n, s, o)
}) {
  var f, g;
  let s = e;
  for (const C of ke(t))
    s = ((f = C.preprocess) == null ? void 0 : f.call(r, s, t)) || s;
  let {
    tokens: o,
    fg: i,
    bg: l,
    themeName: a,
    rootStyle: c,
    grammarState: u
  } = Ae(n, s, t);
  const {
    mergeWhitespaces: h = !0
  } = t;
  h === !0 ? o = uo(o) : h === "never" && (o = ho(o));
  const d = {
    ...r,
    get source() {
      return s;
    }
  };
  for (const C of ke(t))
    o = ((g = C.tokens) == null ? void 0 : g.call(d, o)) || o;
  return co(
    o,
    {
      ...t,
      fg: i,
      bg: l,
      themeName: a,
      rootStyle: c
    },
    d,
    u
  );
}
function co(n, e, t, r = ae(n)) {
  var g, C, _;
  const s = ke(e), o = [], i = {
    type: "root",
    children: []
  }, {
    structure: l = "classic",
    tabindex: a = "0"
  } = e;
  let c = {
    type: "element",
    tagName: "pre",
    properties: {
      class: `shiki ${e.themeName || ""}`,
      style: e.rootStyle || `background-color:${e.bg};color:${e.fg}`,
      ...a !== !1 && a != null ? {
        tabindex: a.toString()
      } : {},
      ...Object.fromEntries(
        Array.from(
          Object.entries(e.meta || {})
        ).filter(([y]) => !y.startsWith("_"))
      )
    },
    children: []
  }, u = {
    type: "element",
    tagName: "code",
    properties: {},
    children: o
  };
  const h = [], d = {
    ...t,
    structure: l,
    addClassToHast: on,
    get source() {
      return t.source;
    },
    get tokens() {
      return n;
    },
    get options() {
      return e;
    },
    get root() {
      return i;
    },
    get pre() {
      return c;
    },
    get code() {
      return u;
    },
    get lines() {
      return h;
    }
  };
  if (n.forEach((y, b) => {
    var R, L;
    b && (l === "inline" ? i.children.push({ type: "element", tagName: "br", properties: {}, children: [] }) : l === "classic" && o.push({ type: "text", value: `
` }));
    let S = {
      type: "element",
      tagName: "span",
      properties: { class: "line" },
      children: []
    }, v = 0;
    for (const P of y) {
      let j = {
        type: "element",
        tagName: "span",
        properties: {
          ...P.htmlAttrs
        },
        children: [{ type: "text", value: P.content }]
      };
      P.htmlStyle;
      const he = Fs(P.htmlStyle || ln(P));
      he && (j.properties.style = he);
      for (const ee of s)
        j = ((R = ee == null ? void 0 : ee.span) == null ? void 0 : R.call(d, j, b + 1, v, S, P)) || j;
      l === "inline" ? i.children.push(j) : l === "classic" && S.children.push(j), v += P.content.length;
    }
    if (l === "classic") {
      for (const P of s)
        S = ((L = P == null ? void 0 : P.line) == null ? void 0 : L.call(d, S, b + 1)) || S;
      h.push(S), o.push(S);
    }
  }), l === "classic") {
    for (const y of s)
      u = ((g = y == null ? void 0 : y.code) == null ? void 0 : g.call(d, u)) || u;
    c.children.push(u);
    for (const y of s)
      c = ((C = y == null ? void 0 : y.pre) == null ? void 0 : C.call(d, c)) || c;
    i.children.push(c);
  }
  let f = i;
  for (const y of s)
    f = ((_ = y == null ? void 0 : y.root) == null ? void 0 : _.call(d, f)) || f;
  return r && xe(f, r), f;
}
function uo(n) {
  return n.map((e) => {
    const t = [];
    let r = "", s = 0;
    return e.forEach((o, i) => {
      const a = !(o.fontStyle && o.fontStyle & W.Underline);
      a && o.content.match(/^\s+$/) && e[i + 1] ? (s || (s = o.offset), r += o.content) : r ? (a ? t.push({
        ...o,
        offset: s,
        content: r + o.content
      }) : t.push(
        {
          content: r,
          offset: s
        },
        o
      ), s = 0, r = "") : t.push(o);
    }), t;
  });
}
function ho(n) {
  return n.map((e) => e.flatMap((t) => {
    if (t.content.match(/^\s+$/))
      return t;
    const r = t.content.match(/^(\s*)(.*?)(\s*)$/);
    if (!r)
      return t;
    const [, s, o, i] = r;
    if (!s && !i)
      return t;
    const l = [{
      ...t,
      offset: t.offset + s.length,
      content: o
    }];
    return s && l.unshift({
      content: s,
      offset: t.offset
    }), i && l.push({
      content: i,
      offset: t.offset + s.length + o.length
    }), l;
  }));
}
function fo(n, e, t) {
  var o;
  const r = {
    meta: {},
    options: t,
    codeToHast: (i, l) => Pe(n, i, l),
    codeToTokens: (i, l) => Ae(n, i, l)
  };
  let s = Os(Pe(n, e, t, r));
  for (const i of ke(t))
    s = ((o = i.postprocess) == null ? void 0 : o.call(r, s, t)) || s;
  return s;
}
const At = { light: "#333333", dark: "#bbbbbb" }, Pt = { light: "#fffffe", dark: "#1e1e1e" }, Nt = "__shiki_resolved";
function st(n) {
  var l, a, c, u, h;
  if (n != null && n[Nt])
    return n;
  const e = {
    ...n
  };
  e.tokenColors && !e.settings && (e.settings = e.tokenColors, delete e.tokenColors), e.type || (e.type = "dark"), e.colorReplacements = { ...e.colorReplacements }, e.settings || (e.settings = []);
  let { bg: t, fg: r } = e;
  if (!t || !r) {
    const d = e.settings ? e.settings.find((f) => !f.name && !f.scope) : void 0;
    (l = d == null ? void 0 : d.settings) != null && l.foreground && (r = d.settings.foreground), (a = d == null ? void 0 : d.settings) != null && a.background && (t = d.settings.background), !r && ((c = e == null ? void 0 : e.colors) != null && c["editor.foreground"]) && (r = e.colors["editor.foreground"]), !t && ((u = e == null ? void 0 : e.colors) != null && u["editor.background"]) && (t = e.colors["editor.background"]), r || (r = e.type === "light" ? At.light : At.dark), t || (t = e.type === "light" ? Pt.light : Pt.dark), e.fg = r, e.bg = t;
  }
  e.settings[0] && e.settings[0].settings && !e.settings[0].scope || e.settings.unshift({
    settings: {
      foreground: e.fg,
      background: e.bg
    }
  });
  let s = 0;
  const o = /* @__PURE__ */ new Map();
  function i(d) {
    var g;
    if (o.has(d))
      return o.get(d);
    s += 1;
    const f = `#${s.toString(16).padStart(8, "0").toLowerCase()}`;
    return (g = e.colorReplacements) != null && g[`#${f}`] ? i(d) : (o.set(d, f), f);
  }
  e.settings = e.settings.map((d) => {
    var _, y;
    const f = ((_ = d.settings) == null ? void 0 : _.foreground) && !d.settings.foreground.startsWith("#"), g = ((y = d.settings) == null ? void 0 : y.background) && !d.settings.background.startsWith("#");
    if (!f && !g)
      return d;
    const C = {
      ...d,
      settings: {
        ...d.settings
      }
    };
    if (f) {
      const b = i(d.settings.foreground);
      e.colorReplacements[b] = d.settings.foreground, C.settings.foreground = b;
    }
    if (g) {
      const b = i(d.settings.background);
      e.colorReplacements[b] = d.settings.background, C.settings.background = b;
    }
    return C;
  });
  for (const d of Object.keys(e.colors || {}))
    if ((d === "editor.foreground" || d === "editor.background" || d.startsWith("terminal.ansi")) && !((h = e.colors[d]) != null && h.startsWith("#"))) {
      const f = i(e.colors[d]);
      e.colorReplacements[f] = e.colors[d], e.colors[d] = f;
    }
  return Object.defineProperty(e, Nt, {
    enumerable: !1,
    writable: !1,
    value: !0
  }), e;
}
async function fn(n) {
  return Array.from(new Set((await Promise.all(
    n.filter((e) => !Ds(e)).map(async (e) => await an(e).then((t) => Array.isArray(t) ? t : [t]))
  )).flat()));
}
async function dn(n) {
  return (await Promise.all(
    n.map(
      async (t) => Us(t) ? null : st(await an(t))
    )
  )).filter((t) => !!t);
}
class po extends br {
  constructor(t, r, s, o = {}) {
    super(t);
    p(this, "_resolvedThemes", /* @__PURE__ */ new Map());
    p(this, "_resolvedGrammars", /* @__PURE__ */ new Map());
    p(this, "_langMap", /* @__PURE__ */ new Map());
    p(this, "_langGraph", /* @__PURE__ */ new Map());
    p(this, "_textmateThemeCache", /* @__PURE__ */ new WeakMap());
    p(this, "_loadedThemesCache", null);
    p(this, "_loadedLanguagesCache", null);
    this._resolver = t, this._themes = r, this._langs = s, this._alias = o, this._themes.map((i) => this.loadTheme(i)), this.loadLanguages(this._langs);
  }
  getTheme(t) {
    return typeof t == "string" ? this._resolvedThemes.get(t) : this.loadTheme(t);
  }
  loadTheme(t) {
    const r = st(t);
    return r.name && (this._resolvedThemes.set(r.name, r), this._loadedThemesCache = null), r;
  }
  getLoadedThemes() {
    return this._loadedThemesCache || (this._loadedThemesCache = [...this._resolvedThemes.keys()]), this._loadedThemesCache;
  }
  // Override and re-implement this method to cache the textmate themes as `TextMateTheme.createFromRawTheme`
  // is expensive. Themes can switch often especially for dual-theme support.
  //
  // The parent class also accepts `colorMap` as the second parameter, but since we don't use that,
  // we omit here so it's easier to cache the themes.
  setTheme(t) {
    let r = this._textmateThemeCache.get(t);
    r || (r = _e.createFromRawTheme(t), this._textmateThemeCache.set(t, r)), this._syncRegistry.setTheme(r);
  }
  getGrammar(t) {
    if (this._alias[t]) {
      const r = /* @__PURE__ */ new Set([t]);
      for (; this._alias[t]; ) {
        if (t = this._alias[t], r.has(t))
          throw new I(`Circular alias \`${Array.from(r).join(" -> ")} -> ${t}\``);
        r.add(t);
      }
    }
    return this._resolvedGrammars.get(t);
  }
  loadLanguage(t) {
    var i, l, a, c;
    if (this.getGrammar(t.name))
      return;
    const r = new Set(
      [...this._langMap.values()].filter((u) => {
        var h;
        return (h = u.embeddedLangsLazy) == null ? void 0 : h.includes(t.name);
      })
    );
    this._resolver.addLanguage(t);
    const s = {
      balancedBracketSelectors: t.balancedBracketSelectors || ["*"],
      unbalancedBracketSelectors: t.unbalancedBracketSelectors || []
    };
    this._syncRegistry._rawGrammars.set(t.scopeName, t);
    const o = this.loadGrammarWithConfiguration(t.scopeName, 1, s);
    if (o.name = t.name, this._resolvedGrammars.set(t.name, o), t.aliases && t.aliases.forEach((u) => {
      this._alias[u] = t.name;
    }), this._loadedLanguagesCache = null, r.size)
      for (const u of r)
        this._resolvedGrammars.delete(u.name), this._loadedLanguagesCache = null, (l = (i = this._syncRegistry) == null ? void 0 : i._injectionGrammars) == null || l.delete(u.scopeName), (c = (a = this._syncRegistry) == null ? void 0 : a._grammars) == null || c.delete(u.scopeName), this.loadLanguage(this._langMap.get(u.name));
  }
  dispose() {
    super.dispose(), this._resolvedThemes.clear(), this._resolvedGrammars.clear(), this._langMap.clear(), this._langGraph.clear(), this._loadedThemesCache = null;
  }
  loadLanguages(t) {
    for (const o of t)
      this.resolveEmbeddedLanguages(o);
    const r = Array.from(this._langGraph.entries()), s = r.filter(([o, i]) => !i);
    if (s.length) {
      const o = r.filter(([i, l]) => {
        var a;
        return l && ((a = l.embeddedLangs) == null ? void 0 : a.some((c) => s.map(([u]) => u).includes(c)));
      }).filter((i) => !s.includes(i));
      throw new I(`Missing languages ${s.map(([i]) => `\`${i}\``).join(", ")}, required by ${o.map(([i]) => `\`${i}\``).join(", ")}`);
    }
    for (const [o, i] of r)
      this._resolver.addLanguage(i);
    for (const [o, i] of r)
      this.loadLanguage(i);
  }
  getLoadedLanguages() {
    return this._loadedLanguagesCache || (this._loadedLanguagesCache = [
      .../* @__PURE__ */ new Set([...this._resolvedGrammars.keys(), ...Object.keys(this._alias)])
    ]), this._loadedLanguagesCache;
  }
  resolveEmbeddedLanguages(t) {
    if (this._langMap.set(t.name, t), this._langGraph.set(t.name, t), t.embeddedLangs)
      for (const r of t.embeddedLangs)
        this._langGraph.set(r, this._langMap.get(r));
  }
}
class go {
  constructor(e, t) {
    p(this, "_langs", /* @__PURE__ */ new Map());
    p(this, "_scopeToLang", /* @__PURE__ */ new Map());
    p(this, "_injections", /* @__PURE__ */ new Map());
    p(this, "_onigLib");
    this._onigLib = {
      createOnigScanner: (r) => e.createScanner(r),
      createOnigString: (r) => e.createString(r)
    }, t.forEach((r) => this.addLanguage(r));
  }
  get onigLib() {
    return this._onigLib;
  }
  getLangRegistration(e) {
    return this._langs.get(e);
  }
  loadGrammar(e) {
    return this._scopeToLang.get(e);
  }
  addLanguage(e) {
    this._langs.set(e.name, e), e.aliases && e.aliases.forEach((t) => {
      this._langs.set(t, e);
    }), this._scopeToLang.set(e.scopeName, e), e.injectTo && e.injectTo.forEach((t) => {
      this._injections.get(t) || this._injections.set(t, []), this._injections.get(t).push(e.scopeName);
    });
  }
  getInjections(e) {
    const t = e.split(".");
    let r = [];
    for (let s = 1; s <= t.length; s++) {
      const o = t.slice(0, s).join(".");
      r = [...r, ...this._injections.get(o) || []];
    }
    return r;
  }
}
let te = 0;
function mo(n) {
  te += 1, n.warnings !== !1 && te >= 10 && te % 10 === 0 && console.warn(`[Shiki] ${te} instances have been created. Shiki is supposed to be used as a singleton, consider refactoring your code to cache your highlighter instance; Or call \`highlighter.dispose()\` to release unused instances.`);
  let e = !1;
  if (!n.engine)
    throw new I("`engine` option is required for synchronous mode");
  const t = (n.langs || []).flat(1), r = (n.themes || []).flat(1).map(st), s = new go(n.engine, t), o = new po(s, r, t, n.langAlias);
  let i;
  function l(b) {
    _();
    const S = o.getGrammar(typeof b == "string" ? b : b.name);
    if (!S)
      throw new I(`Language \`${b}\` not found, you may need to load it first`);
    return S;
  }
  function a(b) {
    if (b === "none")
      return { bg: "", fg: "", name: "none", settings: [], type: "dark" };
    _();
    const S = o.getTheme(b);
    if (!S)
      throw new I(`Theme \`${b}\` not found, you may need to load it first`);
    return S;
  }
  function c(b) {
    _();
    const S = a(b);
    i !== b && (o.setTheme(S), i = b);
    const v = o.getColorMap();
    return {
      theme: S,
      colorMap: v
    };
  }
  function u() {
    return _(), o.getLoadedThemes();
  }
  function h() {
    return _(), o.getLoadedLanguages();
  }
  function d(...b) {
    _(), o.loadLanguages(b.flat(1));
  }
  async function f(...b) {
    return d(await fn(b));
  }
  function g(...b) {
    _();
    for (const S of b.flat(1))
      o.loadTheme(S);
  }
  async function C(...b) {
    return _(), g(await dn(b));
  }
  function _() {
    if (e)
      throw new I("Shiki instance has been disposed");
  }
  function y() {
    e || (e = !0, o.dispose(), te -= 1);
  }
  return {
    setTheme: c,
    getTheme: a,
    getLanguage: l,
    getLoadedThemes: u,
    getLoadedLanguages: h,
    loadLanguage: f,
    loadLanguageSync: d,
    loadTheme: C,
    loadThemeSync: g,
    dispose: y,
    [Symbol.dispose]: y
  };
}
async function yo(n = {}) {
  n.loadWasm;
  const [
    e,
    t,
    r
  ] = await Promise.all([
    dn(n.themes || []),
    fn(n.langs || []),
    n.engine || Tt(n.loadWasm || Ln())
  ]);
  return mo({
    ...n,
    loadWasm: void 0,
    themes: e,
    langs: t,
    engine: r
  });
}
async function _o(n = {}) {
  const e = await yo(n);
  return {
    getLastGrammarState: (...t) => to(e, ...t),
    codeToTokensBase: (t, r) => rt(e, t, r),
    codeToTokensWithThemes: (t, r) => hn(e, t, r),
    codeToTokens: (t, r) => Ae(e, t, r),
    codeToHast: (t, r) => Pe(e, t, r),
    codeToHtml: (t, r) => fo(e, t, r),
    ...e,
    getInternalContext: () => e
  };
}
const vo = async (n, e) => {
  const t = await _o({
    themes: [
      import("./aurora-x-BwoVEUWZ.js"),
      import("./github-light-default-D99KPAby.js")
    ],
    langs: [
      import("./html-B50lQ6OF.js")
    ],
    engine: Tt(import("./wasm-DQxwEHae.js"))
  });
  n.forEach((r) => {
    const s = r.querySelector('[data-type="code"]');
    if (!s)
      throw new Error("No source element found");
    let o = s.innerHTML.trim();
    e && (o = o.replaceAll("{{modifier_class}}", e));
    const i = t.codeToHtml(o, {
      lang: "html",
      themes: {
        light: "github-light-default",
        dark: "aurora-x"
      }
    });
    r.querySelectorAll("pre").forEach((a) => a.remove()), r.insertAdjacentHTML("beforeend", i);
  });
};
export {
  vo as default
};
