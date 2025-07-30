var Ws = Object.defineProperty;
var Ft = (e) => {
  throw TypeError(e);
};
var _s = (e, t, n) => t in e ? Ws(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var H = (e, t, n) => _s(e, typeof t != "symbol" ? t + "" : t, n), Pt = (e, t, n) => t.has(e) || Ft("Cannot " + n);
var ce = (e, t, n) => (Pt(e, t, "read from private field"), n ? n.call(e) : t.get(e)), Nt = (e, t, n) => t.has(e) ? Ft("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), Ne = (e, t, n, s) => (Pt(e, t, "write to private field"), s ? s.call(e, n) : t.set(e, n), n);
function Us(e, t) {
  e.indexOf(t) === -1 && e.push(t);
}
function En(e, t) {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
const z = (e, t, n) => n > t ? t : n < e ? e : n;
let lt = () => {
};
const K = {}, Vn = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e);
function Mn(e) {
  return typeof e == "object" && e !== null;
}
const kn = (e) => /^0[^.\s]+$/u.test(e);
// @__NO_SIDE_EFFECTS__
function ct(e) {
  let t;
  return () => (t === void 0 && (t = e()), t);
}
const te = /* @__NO_SIDE_EFFECTS__ */ (e) => e, js = (e, t) => (n) => t(e(n)), ut = (...e) => e.reduce(js), ft = /* @__NO_SIDE_EFFECTS__ */ (e, t, n) => {
  const s = t - e;
  return s === 0 ? 1 : (n - e) / s;
};
class Ln {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return Us(this.subscriptions, t), () => En(this.subscriptions, t);
  }
  notify(t, n, s) {
    const r = this.subscriptions.length;
    if (r)
      if (r === 1)
        this.subscriptions[0](t, n, s);
      else
        for (let i = 0; i < r; i++) {
          const o = this.subscriptions[i];
          o && o(t, n, s);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const O = /* @__NO_SIDE_EFFECTS__ */ (e) => e * 1e3, N = /* @__NO_SIDE_EFFECTS__ */ (e) => e / 1e3;
function Cn(e, t) {
  return t ? e * (1e3 / t) : 0;
}
const Gs = (e, t, n) => {
  const s = t - e;
  return ((n - e) % s + s) % s + e;
}, In = (e, t, n) => (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e, zs = 1e-7, Ys = 12;
function Xs(e, t, n, s, r) {
  let i, o, a = 0;
  do
    o = t + (n - t) / 2, i = In(o, s, r) - e, i > 0 ? n = o : t = o;
  while (Math.abs(i) > zs && ++a < Ys);
  return o;
}
function be(e, t, n, s) {
  if (e === t && n === s)
    return te;
  const r = (i) => Xs(i, 0, 1, e, n);
  return (i) => i === 0 || i === 1 ? i : In(r(i), t, s);
}
const Dn = (e) => (t) => t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2, Rn = (e) => (t) => 1 - e(1 - t), On = /* @__PURE__ */ be(0.33, 1.53, 0.69, 0.99), dt = /* @__PURE__ */ Rn(On), Fn = /* @__PURE__ */ Dn(dt), Pn = (e) => (e *= 2) < 1 ? 0.5 * dt(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1))), ht = (e) => 1 - Math.sin(Math.acos(e)), Zs = Rn(ht), Nn = Dn(ht), Js = /* @__PURE__ */ be(0.42, 0, 1, 1), Qs = /* @__PURE__ */ be(0, 0, 0.58, 1), Kn = /* @__PURE__ */ be(0.42, 0, 0.58, 1), Bn = (e) => Array.isArray(e) && typeof e[0] != "number";
function qn(e, t) {
  return Bn(e) ? e[Gs(0, e.length, t)] : e;
}
const $n = (e) => Array.isArray(e) && typeof e[0] == "number", er = {
  linear: te,
  easeIn: Js,
  easeInOut: Kn,
  easeOut: Qs,
  circIn: ht,
  circInOut: Nn,
  circOut: Zs,
  backIn: dt,
  backInOut: Fn,
  backOut: On,
  anticipate: Pn
}, tr = (e) => typeof e == "string", Kt = (e) => {
  if ($n(e)) {
    lt(e.length === 4);
    const [t, n, s, r] = e;
    return be(t, n, s, r);
  } else if (tr(e))
    return er[e];
  return e;
}, xe = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];
function nr(e, t) {
  let n = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), r = !1, i = !1;
  const o = /* @__PURE__ */ new WeakSet();
  let a = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function l(c) {
    o.has(c) && (f.schedule(c), e()), c(a);
  }
  const f = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (c, u = !1, d = !1) => {
      const p = d && r ? n : s;
      return u && o.add(c), p.has(c) || p.add(c), c;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (c) => {
      s.delete(c), o.delete(c);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (c) => {
      if (a = c, r) {
        i = !0;
        return;
      }
      r = !0, [n, s] = [s, n], n.forEach(l), n.clear(), r = !1, i && (i = !1, f.process(c));
    }
  };
  return f;
}
const sr = 40;
function rr(e, t) {
  let n = !1, s = !0;
  const r = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, i = () => n = !0, o = xe.reduce((v, A) => (v[A] = nr(i), v), {}), { setup: a, read: l, resolveKeyframes: f, preUpdate: c, update: u, preRender: d, render: h, postRender: p } = o, y = () => {
    const v = K.useManualTiming ? r.timestamp : performance.now();
    n = !1, K.useManualTiming || (r.delta = s ? 1e3 / 60 : Math.max(Math.min(v - r.timestamp, sr), 1)), r.timestamp = v, r.isProcessing = !0, a.process(r), l.process(r), f.process(r), c.process(r), u.process(r), d.process(r), h.process(r), p.process(r), r.isProcessing = !1, n && t && (s = !1, e(y));
  }, b = () => {
    n = !0, s = !0, r.isProcessing || e(y);
  };
  return { schedule: xe.reduce((v, A) => {
    const m = o[A];
    return v[A] = (x, V = !1, T = !1) => (n || b(), m.schedule(x, V, T)), v;
  }, {}), cancel: (v) => {
    for (let A = 0; A < xe.length; A++)
      o[xe[A]].cancel(v);
  }, state: r, steps: o };
}
const { schedule: B, cancel: Ge, state: Re } = /* @__PURE__ */ rr(typeof requestAnimationFrame < "u" ? requestAnimationFrame : te, !0);
let Ie;
function ir() {
  Ie = void 0;
}
const D = {
  now: () => (Ie === void 0 && D.set(Re.isProcessing || K.useManualTiming ? Re.timestamp : performance.now()), Ie),
  set: (e) => {
    Ie = e, queueMicrotask(ir);
  }
}, Hn = (e) => (t) => typeof t == "string" && t.startsWith(e), Wn = /* @__PURE__ */ Hn("--"), or = /* @__PURE__ */ Hn("var(--"), mt = (e) => or(e) ? ar.test(e.split("/*")[0].trim()) : !1, ar = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, ne = {
  test: (e) => typeof e == "number",
  parse: parseFloat,
  transform: (e) => e
}, me = {
  ...ne,
  transform: (e) => z(0, 1, e)
}, Ee = {
  ...ne,
  default: 1
}, de = (e) => Math.round(e * 1e5) / 1e5, pt = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function lr(e) {
  return e == null;
}
const cr = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, gt = (e, t) => (n) => !!(typeof n == "string" && cr.test(n) && n.startsWith(e) || t && !lr(n) && Object.prototype.hasOwnProperty.call(n, t)), _n = (e, t, n) => (s) => {
  if (typeof s != "string")
    return s;
  const [r, i, o, a] = s.match(pt);
  return {
    [e]: parseFloat(r),
    [t]: parseFloat(i),
    [n]: parseFloat(o),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, ur = (e) => z(0, 255, e), Ke = {
  ...ne,
  transform: (e) => Math.round(ur(e))
}, W = {
  test: /* @__PURE__ */ gt("rgb", "red"),
  parse: /* @__PURE__ */ _n("red", "green", "blue"),
  transform: ({ red: e, green: t, blue: n, alpha: s = 1 }) => "rgba(" + Ke.transform(e) + ", " + Ke.transform(t) + ", " + Ke.transform(n) + ", " + de(me.transform(s)) + ")"
};
function fr(e) {
  let t = "", n = "", s = "", r = "";
  return e.length > 5 ? (t = e.substring(1, 3), n = e.substring(3, 5), s = e.substring(5, 7), r = e.substring(7, 9)) : (t = e.substring(1, 2), n = e.substring(2, 3), s = e.substring(3, 4), r = e.substring(4, 5), t += t, n += n, s += s, r += r), {
    red: parseInt(t, 16),
    green: parseInt(n, 16),
    blue: parseInt(s, 16),
    alpha: r ? parseInt(r, 16) / 255 : 1
  };
}
const ze = {
  test: /* @__PURE__ */ gt("#"),
  parse: fr,
  transform: W.transform
}, we = /* @__NO_SIDE_EFFECTS__ */ (e) => ({
  test: (t) => typeof t == "string" && t.endsWith(e) && t.split(" ").length === 1,
  parse: parseFloat,
  transform: (t) => `${t}${e}`
}), $ = /* @__PURE__ */ we("deg"), J = /* @__PURE__ */ we("%"), g = /* @__PURE__ */ we("px"), dr = /* @__PURE__ */ we("vh"), hr = /* @__PURE__ */ we("vw"), Bt = {
  ...J,
  parse: (e) => J.parse(e) / 100,
  transform: (e) => J.transform(e * 100)
}, X = {
  test: /* @__PURE__ */ gt("hsl", "hue"),
  parse: /* @__PURE__ */ _n("hue", "saturation", "lightness"),
  transform: ({ hue: e, saturation: t, lightness: n, alpha: s = 1 }) => "hsla(" + Math.round(e) + ", " + J.transform(de(t)) + ", " + J.transform(de(n)) + ", " + de(me.transform(s)) + ")"
}, k = {
  test: (e) => W.test(e) || ze.test(e) || X.test(e),
  parse: (e) => W.test(e) ? W.parse(e) : X.test(e) ? X.parse(e) : ze.parse(e),
  transform: (e) => typeof e == "string" ? e : e.hasOwnProperty("red") ? W.transform(e) : X.transform(e),
  getAnimatableNone: (e) => {
    const t = k.parse(e);
    return t.alpha = 0, k.transform(t);
  }
}, mr = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function pr(e) {
  var t, n;
  return isNaN(e) && typeof e == "string" && (((t = e.match(pt)) == null ? void 0 : t.length) || 0) + (((n = e.match(mr)) == null ? void 0 : n.length) || 0) > 0;
}
const Un = "number", jn = "color", gr = "var", yr = "var(", qt = "${}", br = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function pe(e) {
  const t = e.toString(), n = [], s = {
    color: [],
    number: [],
    var: []
  }, r = [];
  let i = 0;
  const a = t.replace(br, (l) => (k.test(l) ? (s.color.push(i), r.push(jn), n.push(k.parse(l))) : l.startsWith(yr) ? (s.var.push(i), r.push(gr), n.push(l)) : (s.number.push(i), r.push(Un), n.push(parseFloat(l))), ++i, qt)).split(qt);
  return { values: n, split: a, indexes: s, types: r };
}
function Gn(e) {
  return pe(e).values;
}
function zn(e) {
  const { split: t, types: n } = pe(e), s = t.length;
  return (r) => {
    let i = "";
    for (let o = 0; o < s; o++)
      if (i += t[o], r[o] !== void 0) {
        const a = n[o];
        a === Un ? i += de(r[o]) : a === jn ? i += k.transform(r[o]) : i += r[o];
      }
    return i;
  };
}
const wr = (e) => typeof e == "number" ? 0 : k.test(e) ? k.getAnimatableNone(e) : e;
function Tr(e) {
  const t = Gn(e);
  return zn(e)(t.map(wr));
}
const se = {
  test: pr,
  parse: Gn,
  createTransformer: zn,
  getAnimatableNone: Tr
};
function Be(e, t, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function vr({ hue: e, saturation: t, lightness: n, alpha: s }) {
  e /= 360, t /= 100, n /= 100;
  let r = 0, i = 0, o = 0;
  if (!t)
    r = i = o = n;
  else {
    const a = n < 0.5 ? n * (1 + t) : n + t - n * t, l = 2 * n - a;
    r = Be(l, a, e + 1 / 3), i = Be(l, a, e), o = Be(l, a, e - 1 / 3);
  }
  return {
    red: Math.round(r * 255),
    green: Math.round(i * 255),
    blue: Math.round(o * 255),
    alpha: s
  };
}
function Oe(e, t) {
  return (n) => n > 0 ? t : e;
}
const Te = (e, t, n) => e + (t - e) * n, qe = (e, t, n) => {
  const s = e * e, r = n * (t * t - s) + s;
  return r < 0 ? 0 : Math.sqrt(r);
}, Sr = [ze, W, X], Ar = (e) => Sr.find((t) => t.test(e));
function $t(e) {
  const t = Ar(e);
  if (!t)
    return !1;
  let n = t.parse(e);
  return t === X && (n = vr(n)), n;
}
const Ht = (e, t) => {
  const n = $t(e), s = $t(t);
  if (!n || !s)
    return Oe(e, t);
  const r = { ...n };
  return (i) => (r.red = qe(n.red, s.red, i), r.green = qe(n.green, s.green, i), r.blue = qe(n.blue, s.blue, i), r.alpha = Te(n.alpha, s.alpha, i), W.transform(r));
}, Ye = /* @__PURE__ */ new Set(["none", "hidden"]);
function xr(e, t) {
  return Ye.has(e) ? (n) => n <= 0 ? e : t : (n) => n >= 1 ? t : e;
}
function Er(e, t) {
  return (n) => Te(e, t, n);
}
function yt(e) {
  return typeof e == "number" ? Er : typeof e == "string" ? mt(e) ? Oe : k.test(e) ? Ht : kr : Array.isArray(e) ? Yn : typeof e == "object" ? k.test(e) ? Ht : Vr : Oe;
}
function Yn(e, t) {
  const n = [...e], s = n.length, r = e.map((i, o) => yt(i)(i, t[o]));
  return (i) => {
    for (let o = 0; o < s; o++)
      n[o] = r[o](i);
    return n;
  };
}
function Vr(e, t) {
  const n = { ...e, ...t }, s = {};
  for (const r in n)
    e[r] !== void 0 && t[r] !== void 0 && (s[r] = yt(e[r])(e[r], t[r]));
  return (r) => {
    for (const i in s)
      n[i] = s[i](r);
    return n;
  };
}
function Mr(e, t) {
  const n = [], s = { color: 0, var: 0, number: 0 };
  for (let r = 0; r < t.values.length; r++) {
    const i = t.types[r], o = e.indexes[i][s[i]], a = e.values[o] ?? 0;
    n[r] = a, s[i]++;
  }
  return n;
}
const kr = (e, t) => {
  const n = se.createTransformer(t), s = pe(e), r = pe(t);
  return s.indexes.var.length === r.indexes.var.length && s.indexes.color.length === r.indexes.color.length && s.indexes.number.length >= r.indexes.number.length ? Ye.has(e) && !r.values.length || Ye.has(t) && !s.values.length ? xr(e, t) : ut(Yn(Mr(s, r), r.values), n) : Oe(e, t);
};
function Xn(e, t, n) {
  return typeof e == "number" && typeof t == "number" && typeof n == "number" ? Te(e, t, n) : yt(e)(e, t);
}
const Lr = (e) => {
  const t = ({ timestamp: n }) => e(n);
  return {
    start: (n = !0) => B.update(t, n),
    stop: () => Ge(t),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => Re.isProcessing ? Re.timestamp : D.now()
  };
}, Zn = (e, t, n = 10) => {
  let s = "";
  const r = Math.max(Math.round(t / n), 2);
  for (let i = 0; i < r; i++)
    s += Math.round(e(i / (r - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, Fe = 2e4;
function bt(e) {
  let t = 0;
  const n = 50;
  let s = e.next(t);
  for (; !s.done && t < Fe; )
    t += n, s = e.next(t);
  return t >= Fe ? 1 / 0 : t;
}
function Jn(e, t = 100, n) {
  const s = n({ ...e, keyframes: [0, t] }), r = Math.min(bt(s), Fe);
  return {
    type: "keyframes",
    ease: (i) => s.next(r * i).value / t,
    duration: /* @__PURE__ */ N(r)
  };
}
const Cr = 5;
function Qn(e, t, n) {
  const s = Math.max(t - Cr, 0);
  return Cn(n - e(s), t - s);
}
const M = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
}, $e = 1e-3;
function Ir({ duration: e = M.duration, bounce: t = M.bounce, velocity: n = M.velocity, mass: s = M.mass }) {
  let r, i, o = 1 - t;
  o = z(M.minDamping, M.maxDamping, o), e = z(M.minDuration, M.maxDuration, /* @__PURE__ */ N(e)), o < 1 ? (r = (f) => {
    const c = f * o, u = c * e, d = c - n, h = Xe(f, o), p = Math.exp(-u);
    return $e - d / h * p;
  }, i = (f) => {
    const u = f * o * e, d = u * n + n, h = Math.pow(o, 2) * Math.pow(f, 2) * e, p = Math.exp(-u), y = Xe(Math.pow(f, 2), o);
    return (-r(f) + $e > 0 ? -1 : 1) * ((d - h) * p) / y;
  }) : (r = (f) => {
    const c = Math.exp(-f * e), u = (f - n) * e + 1;
    return -$e + c * u;
  }, i = (f) => {
    const c = Math.exp(-f * e), u = (n - f) * (e * e);
    return c * u;
  });
  const a = 5 / e, l = Rr(r, i, a);
  if (e = /* @__PURE__ */ O(e), isNaN(l))
    return {
      stiffness: M.stiffness,
      damping: M.damping,
      duration: e
    };
  {
    const f = Math.pow(l, 2) * s;
    return {
      stiffness: f,
      damping: o * 2 * Math.sqrt(s * f),
      duration: e
    };
  }
}
const Dr = 12;
function Rr(e, t, n) {
  let s = n;
  for (let r = 1; r < Dr; r++)
    s = s - e(s) / t(s);
  return s;
}
function Xe(e, t) {
  return e * Math.sqrt(1 - t * t);
}
const Or = ["duration", "bounce"], Fr = ["stiffness", "damping", "mass"];
function Wt(e, t) {
  return t.some((n) => e[n] !== void 0);
}
function Pr(e) {
  let t = {
    velocity: M.velocity,
    stiffness: M.stiffness,
    damping: M.damping,
    mass: M.mass,
    isResolvedFromDuration: !1,
    ...e
  };
  if (!Wt(e, Fr) && Wt(e, Or))
    if (e.visualDuration) {
      const n = e.visualDuration, s = 2 * Math.PI / (n * 1.2), r = s * s, i = 2 * z(0.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(r);
      t = {
        ...t,
        mass: M.mass,
        stiffness: r,
        damping: i
      };
    } else {
      const n = Ir(e);
      t = {
        ...t,
        ...n,
        mass: M.mass
      }, t.isResolvedFromDuration = !0;
    }
  return t;
}
function ee(e = M.visualDuration, t = M.bounce) {
  const n = typeof e != "object" ? {
    visualDuration: e,
    keyframes: [0, 1],
    bounce: t
  } : e;
  let { restSpeed: s, restDelta: r } = n;
  const i = n.keyframes[0], o = n.keyframes[n.keyframes.length - 1], a = { done: !1, value: i }, { stiffness: l, damping: f, mass: c, duration: u, velocity: d, isResolvedFromDuration: h } = Pr({
    ...n,
    velocity: -/* @__PURE__ */ N(n.velocity || 0)
  }), p = d || 0, y = f / (2 * Math.sqrt(l * c)), b = o - i, w = /* @__PURE__ */ N(Math.sqrt(l / c)), S = Math.abs(b) < 5;
  s || (s = S ? M.restSpeed.granular : M.restSpeed.default), r || (r = S ? M.restDelta.granular : M.restDelta.default);
  let v;
  if (y < 1) {
    const m = Xe(w, y);
    v = (x) => {
      const V = Math.exp(-y * w * x);
      return o - V * ((p + y * w * b) / m * Math.sin(m * x) + b * Math.cos(m * x));
    };
  } else if (y === 1)
    v = (m) => o - Math.exp(-w * m) * (b + (p + w * b) * m);
  else {
    const m = w * Math.sqrt(y * y - 1);
    v = (x) => {
      const V = Math.exp(-y * w * x), T = Math.min(m * x, 300);
      return o - V * ((p + y * w * b) * Math.sinh(T) + m * b * Math.cosh(T)) / m;
    };
  }
  const A = {
    calculatedDuration: h && u || null,
    next: (m) => {
      const x = v(m);
      if (h)
        a.done = m >= u;
      else {
        let V = m === 0 ? p : 0;
        y < 1 && (V = m === 0 ? /* @__PURE__ */ O(p) : Qn(v, m, x));
        const T = Math.abs(V) <= s, E = Math.abs(o - x) <= r;
        a.done = T && E;
      }
      return a.value = a.done ? o : x, a;
    },
    toString: () => {
      const m = Math.min(bt(A), Fe), x = Zn((V) => A.next(m * V).value, m, 30);
      return m + "ms " + x;
    },
    toTransition: () => {
    }
  };
  return A;
}
ee.applyToOptions = (e) => {
  const t = Jn(e, 100, ee);
  return e.ease = t.ease, e.duration = /* @__PURE__ */ O(t.duration), e.type = "keyframes", e;
};
function Ze({ keyframes: e, velocity: t = 0, power: n = 0.8, timeConstant: s = 325, bounceDamping: r = 10, bounceStiffness: i = 500, modifyTarget: o, min: a, max: l, restDelta: f = 0.5, restSpeed: c }) {
  const u = e[0], d = {
    done: !1,
    value: u
  }, h = (T) => a !== void 0 && T < a || l !== void 0 && T > l, p = (T) => a === void 0 ? l : l === void 0 || Math.abs(a - T) < Math.abs(l - T) ? a : l;
  let y = n * t;
  const b = u + y, w = o === void 0 ? b : o(b);
  w !== b && (y = w - u);
  const S = (T) => -y * Math.exp(-T / s), v = (T) => w + S(T), A = (T) => {
    const E = S(T), I = v(T);
    d.done = Math.abs(E) <= f, d.value = d.done ? w : I;
  };
  let m, x;
  const V = (T) => {
    h(d.value) && (m = T, x = ee({
      keyframes: [d.value, p(d.value)],
      velocity: Qn(v, T, d.value),
      // TODO: This should be passing * 1000
      damping: r,
      stiffness: i,
      restDelta: f,
      restSpeed: c
    }));
  };
  return V(0), {
    calculatedDuration: null,
    next: (T) => {
      let E = !1;
      return !x && m === void 0 && (E = !0, A(T), V(T)), m !== void 0 && T >= m ? x.next(T - m) : (!E && A(T), d);
    }
  };
}
function Nr(e, t, n) {
  const s = [], r = n || K.mix || Xn, i = e.length - 1;
  for (let o = 0; o < i; o++) {
    let a = r(e[o], e[o + 1]);
    if (t) {
      const l = Array.isArray(t) ? t[o] || te : t;
      a = ut(l, a);
    }
    s.push(a);
  }
  return s;
}
function Kr(e, t, { clamp: n = !0, ease: s, mixer: r } = {}) {
  const i = e.length;
  if (lt(i === t.length), i === 1)
    return () => t[0];
  if (i === 2 && t[0] === t[1])
    return () => t[1];
  const o = e[0] === e[1];
  e[0] > e[i - 1] && (e = [...e].reverse(), t = [...t].reverse());
  const a = Nr(t, s, r), l = a.length, f = (c) => {
    if (o && c < e[0])
      return t[0];
    let u = 0;
    if (l > 1)
      for (; u < e.length - 2 && !(c < e[u + 1]); u++)
        ;
    const d = /* @__PURE__ */ ft(e[u], e[u + 1], c);
    return a[u](d);
  };
  return n ? (c) => f(z(e[0], e[i - 1], c)) : f;
}
function es(e, t) {
  const n = e[e.length - 1];
  for (let s = 1; s <= t; s++) {
    const r = /* @__PURE__ */ ft(0, t, s);
    e.push(Te(n, 1, r));
  }
}
function ts(e) {
  const t = [0];
  return es(t, e.length - 1), t;
}
function Br(e, t) {
  return e.map((n) => n * t);
}
function qr(e, t) {
  return e.map(() => t || Kn).splice(0, e.length - 1);
}
function he({ duration: e = 300, keyframes: t, times: n, ease: s = "easeInOut" }) {
  const r = Bn(s) ? s.map(Kt) : Kt(s), i = {
    done: !1,
    value: t[0]
  }, o = Br(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === t.length ? n : ts(t),
    e
  ), a = Kr(o, t, {
    ease: Array.isArray(r) ? r : qr(t, r)
  });
  return {
    calculatedDuration: e,
    next: (l) => (i.value = a(l), i.done = l >= e, i)
  };
}
const $r = (e) => e !== null;
function wt(e, { repeat: t, repeatType: n = "loop" }, s, r = 1) {
  const i = e.filter($r), a = r < 0 || t && n !== "loop" && t % 2 === 1 ? 0 : i.length - 1;
  return !a || s === void 0 ? i[a] : s;
}
const Hr = {
  decay: Ze,
  inertia: Ze,
  tween: he,
  keyframes: he,
  spring: ee
};
function ns(e) {
  typeof e.type == "string" && (e.type = Hr[e.type]);
}
class Tt {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((t) => {
      this.resolve = t;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(t, n) {
    return this.finished.then(t, n);
  }
}
const Wr = (e) => e / 100;
class vt extends Tt {
  constructor(t) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.stop = () => {
      var s, r;
      const { motionValue: n } = this.options;
      n && n.updatedAt !== D.now() && this.tick(D.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), (r = (s = this.options).onStop) == null || r.call(s));
    }, this.options = t, this.initAnimation(), this.play(), t.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: t } = this;
    ns(t);
    const { type: n = he, repeat: s = 0, repeatDelay: r = 0, repeatType: i, velocity: o = 0 } = t;
    let { keyframes: a } = t;
    const l = n || he;
    l !== he && typeof a[0] != "number" && (this.mixKeyframes = ut(Wr, Xn(a[0], a[1])), a = [0, 100]);
    const f = l({ ...t, keyframes: a });
    i === "mirror" && (this.mirroredGenerator = l({
      ...t,
      keyframes: [...a].reverse(),
      velocity: -o
    })), f.calculatedDuration === null && (f.calculatedDuration = bt(f));
    const { calculatedDuration: c } = f;
    this.calculatedDuration = c, this.resolvedDuration = c + r, this.totalDuration = this.resolvedDuration * (s + 1) - r, this.generator = f;
  }
  updateTime(t) {
    const n = Math.round(t - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = n;
  }
  tick(t, n = !1) {
    const { generator: s, totalDuration: r, mixKeyframes: i, mirroredGenerator: o, resolvedDuration: a, calculatedDuration: l } = this;
    if (this.startTime === null)
      return s.next(0);
    const { delay: f = 0, keyframes: c, repeat: u, repeatType: d, repeatDelay: h, type: p, onUpdate: y, finalKeyframe: b } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, t) : this.speed < 0 && (this.startTime = Math.min(t - r / this.speed, this.startTime)), n ? this.currentTime = t : this.updateTime(t);
    const w = this.currentTime - f * (this.playbackSpeed >= 0 ? 1 : -1), S = this.playbackSpeed >= 0 ? w < 0 : w > r;
    this.currentTime = Math.max(w, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = r);
    let v = this.currentTime, A = s;
    if (u) {
      const T = Math.min(this.currentTime, r) / a;
      let E = Math.floor(T), I = T % 1;
      !I && T >= 1 && (I = 1), I === 1 && E--, E = Math.min(E, u + 1), !!(E % 2) && (d === "reverse" ? (I = 1 - I, h && (I -= h / a)) : d === "mirror" && (A = o)), v = z(0, 1, I) * a;
    }
    const m = S ? { done: !1, value: c[0] } : A.next(v);
    i && (m.value = i(m.value));
    let { done: x } = m;
    !S && l !== null && (x = this.playbackSpeed >= 0 ? this.currentTime >= r : this.currentTime <= 0);
    const V = this.holdTime === null && (this.state === "finished" || this.state === "running" && x);
    return V && p !== Ze && (m.value = wt(c, this.options, b, this.speed)), y && y(m.value), V && this.finish(), m;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(t, n) {
    return this.finished.then(t, n);
  }
  get duration() {
    return /* @__PURE__ */ N(this.calculatedDuration);
  }
  get time() {
    return /* @__PURE__ */ N(this.currentTime);
  }
  set time(t) {
    var n;
    t = /* @__PURE__ */ O(t), this.currentTime = t, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = t : this.driver && (this.startTime = this.driver.now() - t / this.playbackSpeed), (n = this.driver) == null || n.start(!1);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(t) {
    this.updateTime(D.now());
    const n = this.playbackSpeed !== t;
    this.playbackSpeed = t, n && (this.time = /* @__PURE__ */ N(this.currentTime));
  }
  play() {
    var r, i;
    if (this.isStopped)
      return;
    const { driver: t = Lr, startTime: n } = this.options;
    this.driver || (this.driver = t((o) => this.tick(o))), (i = (r = this.options).onPlay) == null || i.call(r);
    const s = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime !== null ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = n ?? s), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(D.now()), this.holdTime = this.currentTime;
  }
  complete() {
    this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
  }
  finish() {
    var t, n;
    this.notifyFinished(), this.teardown(), this.state = "finished", (n = (t = this.options).onComplete) == null || n.call(t);
  }
  cancel() {
    var t, n;
    this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), (n = (t = this.options).onCancel) == null || n.call(t);
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(t) {
    return this.startTime = 0, this.tick(t, !0);
  }
  attachTimeline(t) {
    var n;
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), (n = this.driver) == null || n.stop(), t.observe(this);
  }
}
function _r(e) {
  for (let t = 1; t < e.length; t++)
    e[t] ?? (e[t] = e[t - 1]);
}
const _ = (e) => e * 180 / Math.PI, Je = (e) => {
  const t = _(Math.atan2(e[1], e[0]));
  return Qe(t);
}, Ur = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (e) => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
  rotate: Je,
  rotateZ: Je,
  skewX: (e) => _(Math.atan(e[1])),
  skewY: (e) => _(Math.atan(e[2])),
  skew: (e) => (Math.abs(e[1]) + Math.abs(e[2])) / 2
}, Qe = (e) => (e = e % 360, e < 0 && (e += 360), e), _t = Je, Ut = (e) => Math.sqrt(e[0] * e[0] + e[1] * e[1]), jt = (e) => Math.sqrt(e[4] * e[4] + e[5] * e[5]), jr = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: Ut,
  scaleY: jt,
  scale: (e) => (Ut(e) + jt(e)) / 2,
  rotateX: (e) => Qe(_(Math.atan2(e[6], e[5]))),
  rotateY: (e) => Qe(_(Math.atan2(-e[2], e[0]))),
  rotateZ: _t,
  rotate: _t,
  skewX: (e) => _(Math.atan(e[4])),
  skewY: (e) => _(Math.atan(e[1])),
  skew: (e) => (Math.abs(e[1]) + Math.abs(e[4])) / 2
};
function et(e) {
  return e.includes("scale") ? 1 : 0;
}
function tt(e, t) {
  if (!e || e === "none")
    return et(t);
  const n = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, r;
  if (n)
    s = jr, r = n;
  else {
    const a = e.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = Ur, r = a;
  }
  if (!r)
    return et(t);
  const i = s[t], o = r[1].split(",").map(zr);
  return typeof i == "function" ? i(o) : o[i];
}
const Gr = (e, t) => {
  const { transform: n = "none" } = getComputedStyle(e);
  return tt(n, t);
};
function zr(e) {
  return parseFloat(e.trim());
}
const re = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
], ie = new Set(re), Gt = (e) => e === ne || e === g, Yr = /* @__PURE__ */ new Set(["x", "y", "z"]), Xr = re.filter((e) => !Yr.has(e));
function Zr(e) {
  const t = [];
  return Xr.forEach((n) => {
    const s = e.getValue(n);
    s !== void 0 && (t.push([n, s.get()]), s.set(n.startsWith("scale") ? 1 : 0));
  }), t;
}
const U = {
  // Dimensions
  width: ({ x: e }, { paddingLeft: t = "0", paddingRight: n = "0" }) => e.max - e.min - parseFloat(t) - parseFloat(n),
  height: ({ y: e }, { paddingTop: t = "0", paddingBottom: n = "0" }) => e.max - e.min - parseFloat(t) - parseFloat(n),
  top: (e, { top: t }) => parseFloat(t),
  left: (e, { left: t }) => parseFloat(t),
  bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
  right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
  // Transform
  x: (e, { transform: t }) => tt(t, "x"),
  y: (e, { transform: t }) => tt(t, "y")
};
U.translateX = U.x;
U.translateY = U.y;
const j = /* @__PURE__ */ new Set();
let nt = !1, st = !1, rt = !1;
function ss() {
  if (st) {
    const e = Array.from(j).filter((s) => s.needsMeasurement), t = new Set(e.map((s) => s.element)), n = /* @__PURE__ */ new Map();
    t.forEach((s) => {
      const r = Zr(s);
      r.length && (n.set(s, r), s.render());
    }), e.forEach((s) => s.measureInitialState()), t.forEach((s) => {
      s.render();
      const r = n.get(s);
      r && r.forEach(([i, o]) => {
        var a;
        (a = s.getValue(i)) == null || a.set(o);
      });
    }), e.forEach((s) => s.measureEndState()), e.forEach((s) => {
      s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
    });
  }
  st = !1, nt = !1, j.forEach((e) => e.complete(rt)), j.clear();
}
function rs() {
  j.forEach((e) => {
    e.readKeyframes(), e.needsMeasurement && (st = !0);
  });
}
function Jr() {
  rt = !0, rs(), ss(), rt = !1;
}
class St {
  constructor(t, n, s, r, i, o = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...t], this.onComplete = n, this.name = s, this.motionValue = r, this.element = i, this.isAsync = o;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (j.add(this), nt || (nt = !0, B.read(rs), B.resolveKeyframes(ss))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, name: n, element: s, motionValue: r } = this;
    if (t[0] === null) {
      const i = r == null ? void 0 : r.get(), o = t[t.length - 1];
      if (i !== void 0)
        t[0] = i;
      else if (s && n) {
        const a = s.readValue(n, o);
        a != null && (t[0] = a);
      }
      t[0] === void 0 && (t[0] = o), r && i === void 0 && r.set(t[0]);
    }
    _r(t);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(t = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t), j.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (j.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const Qr = (e) => e.startsWith("--");
function ei(e, t, n) {
  Qr(t) ? e.style.setProperty(t, n) : e.style[t] = n;
}
const ti = /* @__PURE__ */ ct(() => window.ScrollTimeline !== void 0), ni = {};
function si(e, t) {
  const n = /* @__PURE__ */ ct(e);
  return () => ni[t] ?? n();
}
const is = /* @__PURE__ */ si(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), fe = ([e, t, n, s]) => `cubic-bezier(${e}, ${t}, ${n}, ${s})`, zt = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ fe([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ fe([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ fe([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ fe([0.33, 1.53, 0.69, 0.99])
};
function os(e, t) {
  if (e)
    return typeof e == "function" ? is() ? Zn(e, t) : "ease-out" : $n(e) ? fe(e) : Array.isArray(e) ? e.map((n) => os(n, t) || zt.easeOut) : zt[e];
}
function ri(e, t, n, { delay: s = 0, duration: r = 300, repeat: i = 0, repeatType: o = "loop", ease: a = "easeOut", times: l } = {}, f = void 0) {
  const c = {
    [t]: n
  };
  l && (c.offset = l);
  const u = os(a, r);
  Array.isArray(u) && (c.easing = u);
  const d = {
    delay: s,
    duration: r,
    easing: Array.isArray(u) ? "linear" : u,
    fill: "both",
    iterations: i + 1,
    direction: o === "reverse" ? "alternate" : "normal"
  };
  return f && (d.pseudoElement = f), e.animate(c, d);
}
function At(e) {
  return typeof e == "function" && "applyToOptions" in e;
}
function ii({ type: e, ...t }) {
  return At(e) && is() ? e.applyToOptions(t) : (t.duration ?? (t.duration = 300), t.ease ?? (t.ease = "easeOut"), t);
}
class oi extends Tt {
  constructor(t) {
    if (super(), this.finishedTime = null, this.isStopped = !1, !t)
      return;
    const { element: n, name: s, keyframes: r, pseudoElement: i, allowFlatten: o = !1, finalKeyframe: a, onComplete: l } = t;
    this.isPseudoElement = !!i, this.allowFlatten = o, this.options = t, lt(typeof t.type != "string");
    const f = ii(t);
    this.animation = ri(n, s, r, f, i), f.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !i) {
        const c = wt(r, this.options, a, this.speed);
        this.updateMotionValue ? this.updateMotionValue(c) : ei(n, s, c), this.animation.cancel();
      }
      l == null || l(), this.notifyFinished();
    };
  }
  play() {
    this.isStopped || (this.animation.play(), this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    var t, n;
    (n = (t = this.animation).finish) == null || n.call(t);
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = !0;
    const { state: t } = this;
    t === "idle" || t === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    var t, n;
    this.isPseudoElement || (n = (t = this.animation).commitStyles) == null || n.call(t);
  }
  get duration() {
    var n, s;
    const t = ((s = (n = this.animation.effect) == null ? void 0 : n.getComputedTiming) == null ? void 0 : s.call(n).duration) || 0;
    return /* @__PURE__ */ N(Number(t));
  }
  get time() {
    return /* @__PURE__ */ N(Number(this.animation.currentTime) || 0);
  }
  set time(t) {
    this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ O(t);
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(t) {
    t < 0 && (this.finishedTime = null), this.animation.playbackRate = t;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return Number(this.animation.startTime);
  }
  set startTime(t) {
    this.animation.startTime = t;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: t, observe: n }) {
    var s;
    return this.allowFlatten && ((s = this.animation.effect) == null || s.updateTiming({ easing: "linear" })), this.animation.onfinish = null, t && ti() ? (this.animation.timeline = t, te) : n(this);
  }
}
const as = {
  anticipate: Pn,
  backInOut: Fn,
  circInOut: Nn
};
function ai(e) {
  return e in as;
}
function li(e) {
  typeof e.ease == "string" && ai(e.ease) && (e.ease = as[e.ease]);
}
const Yt = 10;
class ci extends oi {
  constructor(t) {
    li(t), ns(t), super(t), t.startTime && (this.startTime = t.startTime), this.options = t;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read commited styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(t) {
    const { motionValue: n, onUpdate: s, onComplete: r, element: i, ...o } = this.options;
    if (!n)
      return;
    if (t !== void 0) {
      n.set(t);
      return;
    }
    const a = new vt({
      ...o,
      autoplay: !1
    }), l = /* @__PURE__ */ O(this.finishedTime ?? this.time);
    n.setWithVelocity(a.sample(l - Yt).value, a.sample(l).value, Yt), a.stop();
  }
}
const Xt = (e, t) => t === "zIndex" ? !1 : !!(typeof e == "number" || Array.isArray(e) || typeof e == "string" && // It's animatable if we have a string
(se.test(e) || e === "0") && // And it contains numbers and/or colors
!e.startsWith("url("));
function ui(e) {
  const t = e[0];
  if (e.length === 1)
    return !0;
  for (let n = 0; n < e.length; n++)
    if (e[n] !== t)
      return !0;
}
function fi(e, t, n, s) {
  const r = e[0];
  if (r === null)
    return !1;
  if (t === "display" || t === "visibility")
    return !0;
  const i = e[e.length - 1], o = Xt(r, t), a = Xt(i, t);
  return !o || !a ? !1 : ui(e) || (n === "spring" || At(n)) && s;
}
function di(e) {
  return Mn(e) && "offsetHeight" in e;
}
const hi = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Could be re-enabled now we have support for linear() easing
  // "background-color"
]), mi = /* @__PURE__ */ ct(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function pi(e) {
  var f;
  const { motionValue: t, name: n, repeatDelay: s, repeatType: r, damping: i, type: o } = e;
  if (!di((f = t == null ? void 0 : t.owner) == null ? void 0 : f.current))
    return !1;
  const { onUpdate: a, transformTemplate: l } = t.owner.getProps();
  return mi() && n && hi.has(n) && (n !== "transform" || !l) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !a && !s && r !== "mirror" && i !== 0 && o !== "inertia";
}
const gi = 40;
class yi extends Tt {
  constructor({ autoplay: t = !0, delay: n = 0, type: s = "keyframes", repeat: r = 0, repeatDelay: i = 0, repeatType: o = "loop", keyframes: a, name: l, motionValue: f, element: c, ...u }) {
    var p;
    super(), this.stop = () => {
      var y, b;
      this._animation && (this._animation.stop(), (y = this.stopTimeline) == null || y.call(this)), (b = this.keyframeResolver) == null || b.cancel();
    }, this.createdAt = D.now();
    const d = {
      autoplay: t,
      delay: n,
      type: s,
      repeat: r,
      repeatDelay: i,
      repeatType: o,
      name: l,
      motionValue: f,
      element: c,
      ...u
    }, h = (c == null ? void 0 : c.KeyframeResolver) || St;
    this.keyframeResolver = new h(a, (y, b, w) => this.onKeyframesResolved(y, b, d, !w), l, f, c), (p = this.keyframeResolver) == null || p.scheduleResolve();
  }
  onKeyframesResolved(t, n, s, r) {
    this.keyframeResolver = void 0;
    const { name: i, type: o, velocity: a, delay: l, isHandoff: f, onUpdate: c } = s;
    this.resolvedAt = D.now(), fi(t, i, o, a) || ((K.instantAnimations || !l) && (c == null || c(wt(t, s, n))), t[0] = t[t.length - 1], s.duration = 0, s.repeat = 0);
    const d = {
      startTime: r ? this.resolvedAt ? this.resolvedAt - this.createdAt > gi ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: n,
      ...s,
      keyframes: t
    }, h = !f && pi(d) ? new ci({
      ...d,
      element: d.motionValue.owner.current
    }) : new vt(d);
    h.finished.then(() => this.notifyFinished()).catch(te), this.pendingTimeline && (this.stopTimeline = h.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = h;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(t, n) {
    return this.finished.finally(t).then(() => {
    });
  }
  get animation() {
    var t;
    return this._animation || ((t = this.keyframeResolver) == null || t.resume(), Jr()), this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get time() {
    return this.animation.time;
  }
  set time(t) {
    this.animation.time = t;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(t) {
    this.animation.speed = t;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(t) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(t) : this.pendingTimeline = t, () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    var t;
    this._animation && this.animation.cancel(), (t = this.keyframeResolver) == null || t.cancel();
  }
}
class bi {
  constructor(t) {
    this.stop = () => this.runAll("stop"), this.animations = t.filter(Boolean);
  }
  get finished() {
    return Promise.all(this.animations.map((t) => t.finished));
  }
  /**
   * TODO: Filter out cancelled or stopped animations before returning
   */
  getAll(t) {
    return this.animations[0][t];
  }
  setAll(t, n) {
    for (let s = 0; s < this.animations.length; s++)
      this.animations[s][t] = n;
  }
  attachTimeline(t) {
    const n = this.animations.map((s) => s.attachTimeline(t));
    return () => {
      n.forEach((s, r) => {
        s && s(), this.animations[r].stop();
      });
    };
  }
  get time() {
    return this.getAll("time");
  }
  set time(t) {
    this.setAll("time", t);
  }
  get speed() {
    return this.getAll("speed");
  }
  set speed(t) {
    this.setAll("speed", t);
  }
  get state() {
    return this.getAll("state");
  }
  get startTime() {
    return this.getAll("startTime");
  }
  get duration() {
    let t = 0;
    for (let n = 0; n < this.animations.length; n++)
      t = Math.max(t, this.animations[n].duration);
    return t;
  }
  runAll(t) {
    this.animations.forEach((n) => n[t]());
  }
  play() {
    this.runAll("play");
  }
  pause() {
    this.runAll("pause");
  }
  cancel() {
    this.runAll("cancel");
  }
  complete() {
    this.runAll("complete");
  }
}
class wi extends bi {
  then(t, n) {
    return this.finished.finally(t).then(() => {
    });
  }
}
const Ti = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function vi(e) {
  const t = Ti.exec(e);
  if (!t)
    return [,];
  const [, n, s, r] = t;
  return [`--${n ?? s}`, r];
}
function ls(e, t, n = 1) {
  const [s, r] = vi(e);
  if (!s)
    return;
  const i = window.getComputedStyle(t).getPropertyValue(s);
  if (i) {
    const o = i.trim();
    return Vn(o) ? parseFloat(o) : o;
  }
  return mt(r) ? ls(r, t, n + 1) : r;
}
function cs(e, t) {
  return (e == null ? void 0 : e[t]) ?? (e == null ? void 0 : e.default) ?? e;
}
const us = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...re
]), Si = {
  test: (e) => e === "auto",
  parse: (e) => e
}, fs = (e) => (t) => t.test(e), ds = [ne, g, J, $, hr, dr, Si], Zt = (e) => ds.find(fs(e));
function Ai(e) {
  return typeof e == "number" ? e === 0 : e !== null ? e === "none" || e === "0" || kn(e) : !0;
}
const xi = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function Ei(e) {
  const [t, n] = e.slice(0, -1).split("(");
  if (t === "drop-shadow")
    return e;
  const [s] = n.match(pt) || [];
  if (!s)
    return e;
  const r = n.replace(s, "");
  let i = xi.has(t) ? 1 : 0;
  return s !== n && (i *= 100), t + "(" + i + r + ")";
}
const Vi = /\b([a-z-]*)\(.*?\)/gu, it = {
  ...se,
  getAnimatableNone: (e) => {
    const t = e.match(Vi);
    return t ? t.map(Ei).join(" ") : e;
  }
}, Jt = {
  ...ne,
  transform: Math.round
}, Mi = {
  rotate: $,
  rotateX: $,
  rotateY: $,
  rotateZ: $,
  scale: Ee,
  scaleX: Ee,
  scaleY: Ee,
  scaleZ: Ee,
  skew: $,
  skewX: $,
  skewY: $,
  distance: g,
  translateX: g,
  translateY: g,
  translateZ: g,
  x: g,
  y: g,
  z: g,
  perspective: g,
  transformPerspective: g,
  opacity: me,
  originX: Bt,
  originY: Bt,
  originZ: g
}, xt = {
  // Border props
  borderWidth: g,
  borderTopWidth: g,
  borderRightWidth: g,
  borderBottomWidth: g,
  borderLeftWidth: g,
  borderRadius: g,
  radius: g,
  borderTopLeftRadius: g,
  borderTopRightRadius: g,
  borderBottomRightRadius: g,
  borderBottomLeftRadius: g,
  // Positioning props
  width: g,
  maxWidth: g,
  height: g,
  maxHeight: g,
  top: g,
  right: g,
  bottom: g,
  left: g,
  // Spacing props
  padding: g,
  paddingTop: g,
  paddingRight: g,
  paddingBottom: g,
  paddingLeft: g,
  margin: g,
  marginTop: g,
  marginRight: g,
  marginBottom: g,
  marginLeft: g,
  // Misc
  backgroundPositionX: g,
  backgroundPositionY: g,
  ...Mi,
  zIndex: Jt,
  // SVG
  fillOpacity: me,
  strokeOpacity: me,
  numOctaves: Jt
}, ki = {
  ...xt,
  // Color props
  color: k,
  backgroundColor: k,
  outlineColor: k,
  fill: k,
  stroke: k,
  // Border props
  borderColor: k,
  borderTopColor: k,
  borderRightColor: k,
  borderBottomColor: k,
  borderLeftColor: k,
  filter: it,
  WebkitFilter: it
}, hs = (e) => ki[e];
function ms(e, t) {
  let n = hs(e);
  return n !== it && (n = se), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0;
}
const Li = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function Ci(e, t, n) {
  let s = 0, r;
  for (; s < e.length && !r; ) {
    const i = e[s];
    typeof i == "string" && !Li.has(i) && pe(i).values.length && (r = e[s]), s++;
  }
  if (r && n)
    for (const i of t)
      e[i] = ms(n, r);
}
class Ii extends St {
  constructor(t, n, s, r, i) {
    super(t, n, s, r, i, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, element: n, name: s } = this;
    if (!n || !n.current)
      return;
    super.readKeyframes();
    for (let l = 0; l < t.length; l++) {
      let f = t[l];
      if (typeof f == "string" && (f = f.trim(), mt(f))) {
        const c = ls(f, n.current);
        c !== void 0 && (t[l] = c), l === t.length - 1 && (this.finalKeyframe = f);
      }
    }
    if (this.resolveNoneKeyframes(), !us.has(s) || t.length !== 2)
      return;
    const [r, i] = t, o = Zt(r), a = Zt(i);
    if (o !== a)
      if (Gt(o) && Gt(a))
        for (let l = 0; l < t.length; l++) {
          const f = t[l];
          typeof f == "string" && (t[l] = parseFloat(f));
        }
      else U[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: t, name: n } = this, s = [];
    for (let r = 0; r < t.length; r++)
      (t[r] === null || Ai(t[r])) && s.push(r);
    s.length && Ci(t, s, n);
  }
  measureInitialState() {
    const { element: t, unresolvedKeyframes: n, name: s } = this;
    if (!t || !t.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = U[s](t.measureViewportBox(), window.getComputedStyle(t.current)), n[0] = this.measuredOrigin;
    const r = n[n.length - 1];
    r !== void 0 && t.getValue(s, r).jump(r, !1);
  }
  measureEndState() {
    var a;
    const { element: t, name: n, unresolvedKeyframes: s } = this;
    if (!t || !t.current)
      return;
    const r = t.getValue(n);
    r && r.jump(this.measuredOrigin, !1);
    const i = s.length - 1, o = s[i];
    s[i] = U[n](t.measureViewportBox(), window.getComputedStyle(t.current)), o !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = o), (a = this.removedTransforms) != null && a.length && this.removedTransforms.forEach(([l, f]) => {
      t.getValue(l).set(f);
    }), this.resolveNoneKeyframes();
  }
}
function Di(e, t, n) {
  if (e instanceof EventTarget)
    return [e];
  if (typeof e == "string") {
    let s = document;
    const r = (n == null ? void 0 : n[e]) ?? s.querySelectorAll(e);
    return r ? Array.from(r) : [];
  }
  return Array.from(e);
}
const ps = (e, t) => t && typeof e == "number" ? t.transform(e) : e, Qt = 30, Ri = (e) => !isNaN(parseFloat(e));
class Oi {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(t, n = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s, r = !0) => {
      var o, a;
      const i = D.now();
      if (this.updatedAt !== i && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && ((o = this.events.change) == null || o.notify(this.current), this.dependents))
        for (const l of this.dependents)
          l.dirty();
      r && ((a = this.events.renderRequest) == null || a.notify(this.current));
    }, this.hasAnimated = !1, this.setCurrent(t), this.owner = n.owner;
  }
  setCurrent(t) {
    this.current = t, this.updatedAt = D.now(), this.canTrackVelocity === null && t !== void 0 && (this.canTrackVelocity = Ri(this.current));
  }
  setPrevFrameValue(t = this.current) {
    this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(t) {
    return this.on("change", t);
  }
  on(t, n) {
    this.events[t] || (this.events[t] = new Ln());
    const s = this.events[t].add(n);
    return t === "change" ? () => {
      s(), B.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : s;
  }
  clearListeners() {
    for (const t in this.events)
      this.events[t].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(t, n) {
    this.passiveEffect = t, this.stopPassiveEffect = n;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(t, n = !0) {
    !n || !this.passiveEffect ? this.updateAndNotify(t, n) : this.passiveEffect(t, this.updateAndNotify);
  }
  setWithVelocity(t, n, s) {
    this.set(n), this.prev = void 0, this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt - s;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(t, n = !0) {
    this.updateAndNotify(t), this.prev = t, this.prevUpdatedAt = this.prevFrameValue = void 0, n && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    var t;
    (t = this.events.change) == null || t.notify(this.current);
  }
  addDependent(t) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(t);
  }
  removeDependent(t) {
    this.dependents && this.dependents.delete(t);
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const t = D.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || t - this.updatedAt > Qt)
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, Qt);
    return Cn(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(t) {
    return this.stop(), new Promise((n) => {
      this.hasAnimated = !0, this.animation = t(n), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    var t, n;
    (t = this.dependents) == null || t.clear(), (n = this.events.destroy) == null || n.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function ge(e, t) {
  return new Oi(e, t);
}
function gs(e) {
  return Mn(e) && "ownerSVGElement" in e;
}
function Fi(e) {
  return gs(e) && e.tagName === "svg";
}
const C = (e) => !!(e && e.getVelocity), Pi = [...ds, k, se], Ni = (e) => Pi.find(fs(e));
function Et(e) {
  return typeof e == "object" && !Array.isArray(e);
}
function ys(e, t, n, s) {
  return typeof e == "string" && Et(t) ? Di(e, n, s) : e instanceof NodeList ? Array.from(e) : Array.isArray(e) ? e : [e];
}
function Ki(e, t, n) {
  return e * (t + 1);
}
function en(e, t, n, s) {
  return typeof t == "number" ? t : t.startsWith("-") || t.startsWith("+") ? Math.max(0, e + parseFloat(t)) : t === "<" ? n : t.startsWith("<") ? Math.max(0, n + parseFloat(t.slice(1))) : s.get(t) ?? e;
}
function Bi(e, t, n) {
  for (let s = 0; s < e.length; s++) {
    const r = e[s];
    r.at > t && r.at < n && (En(e, r), s--);
  }
}
function qi(e, t, n, s, r, i) {
  Bi(e, r, i);
  for (let o = 0; o < t.length; o++)
    e.push({
      value: t[o],
      at: Te(r, i, s[o]),
      easing: qn(n, o)
    });
}
function $i(e, t) {
  for (let n = 0; n < e.length; n++)
    e[n] = e[n] / (t + 1);
}
function Hi(e, t) {
  return e.at === t.at ? e.value === null ? 1 : t.value === null ? -1 : 0 : e.at - t.at;
}
const Wi = "easeInOut";
function _i(e, { defaultTransition: t = {}, ...n } = {}, s, r) {
  const i = t.duration || 0.3, o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), l = {}, f = /* @__PURE__ */ new Map();
  let c = 0, u = 0, d = 0;
  for (let h = 0; h < e.length; h++) {
    const p = e[h];
    if (typeof p == "string") {
      f.set(p, u);
      continue;
    } else if (!Array.isArray(p)) {
      f.set(p.name, en(u, p.at, c, f));
      continue;
    }
    let [y, b, w = {}] = p;
    w.at !== void 0 && (u = en(u, w.at, c, f));
    let S = 0;
    const v = (A, m, x, V = 0, T = 0) => {
      const E = Ui(A), { delay: I = 0, times: R = ts(E), type: Pe = "keyframes", repeat: ve, repeatType: Ba, repeatDelay: qa = 0, ...Hs } = m;
      let { ease: q = t.ease || "easeOut", duration: F } = m;
      const Lt = typeof I == "function" ? I(V, T) : I, Ct = E.length, It = At(Pe) ? Pe : r == null ? void 0 : r[Pe || "keyframes"];
      if (Ct <= 2 && It) {
        let oe = 100;
        if (Ct === 2 && zi(E)) {
          const ae = E[1] - E[0];
          oe = Math.abs(ae);
        }
        const Se = { ...Hs };
        F !== void 0 && (Se.duration = /* @__PURE__ */ O(F));
        const Ae = Jn(Se, oe, It);
        q = Ae.ease, F = Ae.duration;
      }
      F ?? (F = i);
      const Dt = u + Lt;
      R.length === 1 && R[0] === 0 && (R[1] = 1);
      const Rt = R.length - E.length;
      if (Rt > 0 && es(R, Rt), E.length === 1 && E.unshift(null), ve) {
        F = Ki(F, ve);
        const oe = [...E], Se = [...R];
        q = Array.isArray(q) ? [...q] : [q];
        const Ae = [...q];
        for (let ae = 0; ae < ve; ae++) {
          E.push(...oe);
          for (let le = 0; le < oe.length; le++)
            R.push(Se[le] + (ae + 1)), q.push(le === 0 ? "linear" : qn(Ae, le - 1));
        }
        $i(R, ve);
      }
      const Ot = Dt + F;
      qi(x, E, q, R, Dt, Ot), S = Math.max(Lt + F, S), d = Math.max(Ot, d);
    };
    if (C(y)) {
      const A = tn(y, a);
      v(b, w, nn("default", A));
    } else {
      const A = ys(y, b, s, l), m = A.length;
      for (let x = 0; x < m; x++) {
        b = b, w = w;
        const V = A[x], T = tn(V, a);
        for (const E in b)
          v(b[E], ji(w, E), nn(E, T), x, m);
      }
    }
    c = u, u += S;
  }
  return a.forEach((h, p) => {
    for (const y in h) {
      const b = h[y];
      b.sort(Hi);
      const w = [], S = [], v = [];
      for (let m = 0; m < b.length; m++) {
        const { at: x, value: V, easing: T } = b[m];
        w.push(V), S.push(/* @__PURE__ */ ft(0, d, x)), v.push(T || "easeOut");
      }
      S[0] !== 0 && (S.unshift(0), w.unshift(w[0]), v.unshift(Wi)), S[S.length - 1] !== 1 && (S.push(1), w.push(null)), o.has(p) || o.set(p, {
        keyframes: {},
        transition: {}
      });
      const A = o.get(p);
      A.keyframes[y] = w, A.transition[y] = {
        ...t,
        duration: d,
        ease: v,
        times: S,
        ...n
      };
    }
  }), o;
}
function tn(e, t) {
  return !t.has(e) && t.set(e, {}), t.get(e);
}
function nn(e, t) {
  return t[e] || (t[e] = []), t[e];
}
function Ui(e) {
  return Array.isArray(e) ? e : [e];
}
function ji(e, t) {
  return e && e[t] ? {
    ...e,
    ...e[t]
  } : { ...e };
}
const Gi = (e) => typeof e == "number", zi = (e) => e.every(Gi), ye = /* @__PURE__ */ new WeakMap(), Yi = (e) => Array.isArray(e);
function sn(e) {
  const t = [{}, {}];
  return e == null || e.values.forEach((n, s) => {
    t[0][s] = n.get(), t[1][s] = n.getVelocity();
  }), t;
}
function bs(e, t, n, s) {
  if (typeof t == "function") {
    const [r, i] = sn(s);
    t = t(n !== void 0 ? n : e.custom, r, i);
  }
  if (typeof t == "string" && (t = e.variants && e.variants[t]), typeof t == "function") {
    const [r, i] = sn(s);
    t = t(n !== void 0 ? n : e.custom, r, i);
  }
  return t;
}
function Xi(e, t, n) {
  const s = e.getProps();
  return bs(s, t, s.custom, e);
}
function Zi(e, t, n) {
  e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, ge(n));
}
function Ji(e) {
  return Yi(e) ? e[e.length - 1] || 0 : e;
}
function Qi(e, t) {
  const n = Xi(e, t);
  let { transitionEnd: s = {}, transition: r = {}, ...i } = n || {};
  i = { ...i, ...s };
  for (const o in i) {
    const a = Ji(i[o]);
    Zi(e, o, a);
  }
}
function eo(e) {
  return !!(C(e) && e.add);
}
function to(e, t) {
  const n = e.getValue("willChange");
  if (eo(n))
    return n.add(t);
  if (!n && K.WillChange) {
    const s = new K.WillChange("auto");
    e.addValue("willChange", s), s.add(t);
  }
}
const Vt = (e) => e.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), no = "framerAppearId", so = "data-" + Vt(no);
function ro(e) {
  return e.props[so];
}
const io = (e) => e !== null;
function oo(e, { repeat: t, repeatType: n = "loop" }, s) {
  const r = e.filter(io), i = t && n !== "loop" && t % 2 === 1 ? 0 : r.length - 1;
  return r[i];
}
const ao = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, lo = (e) => ({
  type: "spring",
  stiffness: 550,
  damping: e === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), co = {
  type: "keyframes",
  duration: 0.8
}, uo = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, fo = (e, { keyframes: t }) => t.length > 2 ? co : ie.has(e) ? e.startsWith("scale") ? lo(t[1]) : ao : uo;
function ho({ when: e, delay: t, delayChildren: n, staggerChildren: s, staggerDirection: r, repeat: i, repeatType: o, repeatDelay: a, from: l, elapsed: f, ...c }) {
  return !!Object.keys(c).length;
}
const ws = (e, t, n, s = {}, r, i) => (o) => {
  const a = cs(s, e) || {}, l = a.delay || s.delay || 0;
  let { elapsed: f = 0 } = s;
  f = f - /* @__PURE__ */ O(l);
  const c = {
    keyframes: Array.isArray(n) ? n : [null, n],
    ease: "easeOut",
    velocity: t.getVelocity(),
    ...a,
    delay: -f,
    onUpdate: (d) => {
      t.set(d), a.onUpdate && a.onUpdate(d);
    },
    onComplete: () => {
      o(), a.onComplete && a.onComplete();
    },
    name: e,
    motionValue: t,
    element: i ? void 0 : r
  };
  ho(a) || Object.assign(c, fo(e, c)), c.duration && (c.duration = /* @__PURE__ */ O(c.duration)), c.repeatDelay && (c.repeatDelay = /* @__PURE__ */ O(c.repeatDelay)), c.from !== void 0 && (c.keyframes[0] = c.from);
  let u = !1;
  if ((c.type === !1 || c.duration === 0 && !c.repeatDelay) && (c.duration = 0, c.delay === 0 && (u = !0)), (K.instantAnimations || K.skipAnimations) && (u = !0, c.duration = 0, c.delay = 0), c.allowFlatten = !a.type && !a.ease, u && !i && t.get() !== void 0) {
    const d = oo(c.keyframes, a);
    if (d !== void 0) {
      B.update(() => {
        c.onUpdate(d), c.onComplete();
      });
      return;
    }
  }
  return a.isSync ? new vt(c) : new yi(c);
};
function mo({ protectedKeys: e, needsAnimating: t }, n) {
  const s = e.hasOwnProperty(n) && t[n] !== !0;
  return t[n] = !1, s;
}
function po(e, t, { delay: n = 0, transitionOverride: s, type: r } = {}) {
  let { transition: i = e.getDefaultTransition(), transitionEnd: o, ...a } = t;
  s && (i = s);
  const l = [], f = r && e.animationState && e.animationState.getState()[r];
  for (const c in a) {
    const u = e.getValue(c, e.latestValues[c] ?? null), d = a[c];
    if (d === void 0 || f && mo(f, c))
      continue;
    const h = {
      delay: n,
      ...cs(i || {}, c)
    }, p = u.get();
    if (p !== void 0 && !u.isAnimating && !Array.isArray(d) && d === p && !h.velocity)
      continue;
    let y = !1;
    if (window.MotionHandoffAnimation) {
      const w = ro(e);
      if (w) {
        const S = window.MotionHandoffAnimation(w, c, B);
        S !== null && (h.startTime = S, y = !0);
      }
    }
    to(e, c), u.start(ws(c, u, d, e.shouldReduceMotion && us.has(c) ? { type: !1 } : h, e, y));
    const b = u.animation;
    b && l.push(b);
  }
  return o && Promise.all(l).then(() => {
    B.update(() => {
      o && Qi(e, o);
    });
  }), l;
}
function go({ top: e, left: t, right: n, bottom: s }) {
  return {
    x: { min: t, max: n },
    y: { min: e, max: s }
  };
}
function yo(e, t) {
  if (!t)
    return e;
  const n = t({ x: e.left, y: e.top }), s = t({ x: e.right, y: e.bottom });
  return {
    top: n.y,
    left: n.x,
    bottom: s.y,
    right: s.x
  };
}
function bo(e, t) {
  return go(yo(e.getBoundingClientRect(), t));
}
const rn = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
}, ot = {};
for (const e in rn)
  ot[e] = {
    isEnabled: (t) => rn[e].some((n) => !!t[n])
  };
const on = () => ({ min: 0, max: 0 }), Mt = () => ({
  x: on(),
  y: on()
}), wo = typeof window < "u", at = { current: null }, Ts = { current: !1 };
function To() {
  if (Ts.current = !0, !!wo)
    if (window.matchMedia) {
      const e = window.matchMedia("(prefers-reduced-motion)"), t = () => at.current = e.matches;
      e.addListener(t), t();
    } else
      at.current = !1;
}
function vo(e) {
  return e !== null && typeof e == "object" && typeof e.start == "function";
}
function So(e) {
  return typeof e == "string" || Array.isArray(e);
}
const Ao = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], xo = ["initial", ...Ao];
function vs(e) {
  return vo(e.animate) || xo.some((t) => So(e[t]));
}
function Eo(e) {
  return !!(vs(e) || e.variants);
}
function Vo(e, t, n) {
  for (const s in t) {
    const r = t[s], i = n[s];
    if (C(r))
      e.addValue(s, r);
    else if (C(i))
      e.addValue(s, ge(r, { owner: e }));
    else if (i !== r)
      if (e.hasValue(s)) {
        const o = e.getValue(s);
        o.liveStyle === !0 ? o.jump(r) : o.hasAnimated || o.set(r);
      } else {
        const o = e.getStaticValue(s);
        e.addValue(s, ge(o !== void 0 ? o : r, { owner: e }));
      }
  }
  for (const s in n)
    t[s] === void 0 && e.removeValue(s);
  return t;
}
const an = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
class Ss {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(t, n, s) {
    return {};
  }
  constructor({ parent: t, props: n, presenceContext: s, reducedMotionConfig: r, blockInitialAnimation: i, visualState: o }, a = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = St, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const d = D.now();
      this.renderScheduledAt < d && (this.renderScheduledAt = d, B.render(this.render, !1, !0));
    };
    const { latestValues: l, renderState: f } = o;
    this.latestValues = l, this.baseTarget = { ...l }, this.initialValues = n.initial ? { ...l } : {}, this.renderState = f, this.parent = t, this.props = n, this.presenceContext = s, this.depth = t ? t.depth + 1 : 0, this.reducedMotionConfig = r, this.options = a, this.blockInitialAnimation = !!i, this.isControllingVariants = vs(n), this.isVariantNode = Eo(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(t && t.current);
    const { willChange: c, ...u } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const d in u) {
      const h = u[d];
      l[d] !== void 0 && C(h) && h.set(l[d], !1);
    }
  }
  mount(t) {
    this.current = t, ye.set(t, this), this.projection && !this.projection.instance && this.projection.mount(t), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((n, s) => this.bindToMotionValue(s, n)), Ts.current || To(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : at.current, this.parent && this.parent.children.add(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    this.projection && this.projection.unmount(), Ge(this.notifyUpdate), Ge(this.render), this.valueSubscriptions.forEach((t) => t()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent && this.parent.children.delete(this);
    for (const t in this.events)
      this.events[t].clear();
    for (const t in this.features) {
      const n = this.features[t];
      n && (n.unmount(), n.isMounted = !1);
    }
    this.current = null;
  }
  bindToMotionValue(t, n) {
    this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)();
    const s = ie.has(t);
    s && this.onBindTransform && this.onBindTransform();
    const r = n.on("change", (a) => {
      this.latestValues[t] = a, this.props.onUpdate && B.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0);
    }), i = n.on("renderRequest", this.scheduleRender);
    let o;
    window.MotionCheckAppearSync && (o = window.MotionCheckAppearSync(this, t, n)), this.valueSubscriptions.set(t, () => {
      r(), i(), o && o(), n.owner && n.stop();
    });
  }
  sortNodePosition(t) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== t.type ? 0 : this.sortInstanceNodePosition(this.current, t.current);
  }
  updateFeatures() {
    let t = "animation";
    for (t in ot) {
      const n = ot[t];
      if (!n)
        continue;
      const { isEnabled: s, Feature: r } = n;
      if (!this.features[t] && r && s(this.props) && (this.features[t] = new r(this)), this.features[t]) {
        const i = this.features[t];
        i.isMounted ? i.update() : (i.mount(), i.isMounted = !0);
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : Mt();
  }
  getStaticValue(t) {
    return this.latestValues[t];
  }
  setStaticValue(t, n) {
    this.latestValues[t] = n;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(t, n) {
    (t.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = t, this.prevPresenceContext = this.presenceContext, this.presenceContext = n;
    for (let s = 0; s < an.length; s++) {
      const r = an[s];
      this.propEventSubscriptions[r] && (this.propEventSubscriptions[r](), delete this.propEventSubscriptions[r]);
      const i = "on" + r, o = t[i];
      o && (this.propEventSubscriptions[r] = this.on(r, o));
    }
    this.prevMotionValues = Vo(this, this.scrapeMotionValuesFromProps(t, this.prevProps, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(t) {
    return this.props.variants ? this.props.variants[t] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(t) {
    const n = this.getClosestVariantNode();
    if (n)
      return n.variantChildren && n.variantChildren.add(t), () => n.variantChildren.delete(t);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(t, n) {
    const s = this.values.get(t);
    n !== s && (s && this.removeValue(t), this.bindToMotionValue(t, n), this.values.set(t, n), this.latestValues[t] = n.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(t) {
    this.values.delete(t);
    const n = this.valueSubscriptions.get(t);
    n && (n(), this.valueSubscriptions.delete(t)), delete this.latestValues[t], this.removeValueFromRenderState(t, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(t) {
    return this.values.has(t);
  }
  getValue(t, n) {
    if (this.props.values && this.props.values[t])
      return this.props.values[t];
    let s = this.values.get(t);
    return s === void 0 && n !== void 0 && (s = ge(n === null ? void 0 : n, { owner: this }), this.addValue(t, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(t, n) {
    let s = this.latestValues[t] !== void 0 || !this.current ? this.latestValues[t] : this.getBaseTargetFromProps(this.props, t) ?? this.readValueFromInstance(this.current, t, this.options);
    return s != null && (typeof s == "string" && (Vn(s) || kn(s)) ? s = parseFloat(s) : !Ni(s) && se.test(n) && (s = ms(t, n)), this.setBaseTarget(t, C(s) ? s.get() : s)), C(s) ? s.get() : s;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(t, n) {
    this.baseTarget[t] = n;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(t) {
    var i;
    const { initial: n } = this.props;
    let s;
    if (typeof n == "string" || typeof n == "object") {
      const o = bs(this.props, n, (i = this.presenceContext) == null ? void 0 : i.custom);
      o && (s = o[t]);
    }
    if (n && s !== void 0)
      return s;
    const r = this.getBaseTargetFromProps(this.props, t);
    return r !== void 0 && !C(r) ? r : this.initialValues[t] !== void 0 && s === void 0 ? void 0 : this.baseTarget[t];
  }
  on(t, n) {
    return this.events[t] || (this.events[t] = new Ln()), this.events[t].add(n);
  }
  notify(t, ...n) {
    this.events[t] && this.events[t].notify(...n);
  }
}
class As extends Ss {
  constructor() {
    super(...arguments), this.KeyframeResolver = Ii;
  }
  sortInstanceNodePosition(t, n) {
    return t.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(t, n) {
    return t.style ? t.style[n] : void 0;
  }
  removeValueFromRenderState(t, { vars: n, style: s }) {
    delete n[t], delete s[t];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: t } = this.props;
    C(t) && (this.childSubscription = t.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
}
const Mo = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, ko = re.length;
function Lo(e, t, n) {
  let s = "", r = !0;
  for (let i = 0; i < ko; i++) {
    const o = re[i], a = e[o];
    if (a === void 0)
      continue;
    let l = !0;
    if (typeof a == "number" ? l = a === (o.startsWith("scale") ? 1 : 0) : l = parseFloat(a) === 0, !l || n) {
      const f = ps(a, xt[o]);
      if (!l) {
        r = !1;
        const c = Mo[o] || o;
        s += `${c}(${f}) `;
      }
      n && (t[o] = f);
    }
  }
  return s = s.trim(), n ? s = n(t, r ? "" : s) : r && (s = "none"), s;
}
function xs(e, t, n) {
  const { style: s, vars: r, transformOrigin: i } = e;
  let o = !1, a = !1;
  for (const l in t) {
    const f = t[l];
    if (ie.has(l)) {
      o = !0;
      continue;
    } else if (Wn(l)) {
      r[l] = f;
      continue;
    } else {
      const c = ps(f, xt[l]);
      l.startsWith("origin") ? (a = !0, i[l] = c) : s[l] = c;
    }
  }
  if (t.transform || (o || n ? s.transform = Lo(t, e.transform, n) : s.transform && (s.transform = "none")), a) {
    const { originX: l = "50%", originY: f = "50%", originZ: c = 0 } = i;
    s.transformOrigin = `${l} ${f} ${c}`;
  }
}
function Es(e, { style: t, vars: n }, s, r) {
  Object.assign(e.style, t, r && r.getProjectionStyles(s));
  for (const i in n)
    e.style.setProperty(i, n[i]);
}
const Co = {};
function Io(e, { layout: t, layoutId: n }) {
  return ie.has(e) || e.startsWith("origin") || (t || n !== void 0) && (!!Co[e] || e === "opacity");
}
function Vs(e, t, n) {
  var i;
  const { style: s } = e, r = {};
  for (const o in s)
    (C(s[o]) || t.style && C(t.style[o]) || Io(o, e) || ((i = n == null ? void 0 : n.getValue(o)) == null ? void 0 : i.liveStyle) !== void 0) && (r[o] = s[o]);
  return r;
}
function Do(e) {
  return window.getComputedStyle(e);
}
class Ro extends As {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = Es;
  }
  readValueFromInstance(t, n) {
    var s;
    if (ie.has(n))
      return (s = this.projection) != null && s.isProjecting ? et(n) : Gr(t, n);
    {
      const r = Do(t), i = (Wn(n) ? r.getPropertyValue(n) : r[n]) || 0;
      return typeof i == "string" ? i.trim() : i;
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: n }) {
    return bo(t, n);
  }
  build(t, n, s) {
    xs(t, n, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(t, n, s) {
    return Vs(t, n, s);
  }
}
function Oo(e, t) {
  return e in t;
}
class Fo extends Ss {
  constructor() {
    super(...arguments), this.type = "object";
  }
  readValueFromInstance(t, n) {
    if (Oo(n, t)) {
      const s = t[n];
      if (typeof s == "string" || typeof s == "number")
        return s;
    }
  }
  getBaseTargetFromProps() {
  }
  removeValueFromRenderState(t, n) {
    delete n.output[t];
  }
  measureInstanceViewportBox() {
    return Mt();
  }
  build(t, n) {
    Object.assign(t.output, n);
  }
  renderInstance(t, { output: n }) {
    Object.assign(t, n);
  }
  sortInstanceNodePosition() {
    return 0;
  }
}
const Po = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, No = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function Ko(e, t, n = 1, s = 0, r = !0) {
  e.pathLength = 1;
  const i = r ? Po : No;
  e[i.offset] = g.transform(-s);
  const o = g.transform(t), a = g.transform(n);
  e[i.array] = `${o} ${a}`;
}
function Bo(e, {
  attrX: t,
  attrY: n,
  attrScale: s,
  pathLength: r,
  pathSpacing: i = 1,
  pathOffset: o = 0,
  // This is object creation, which we try to avoid per-frame.
  ...a
}, l, f, c) {
  if (xs(e, a, f), l) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
    return;
  }
  e.attrs = e.style, e.style = {};
  const { attrs: u, style: d } = e;
  u.transform && (d.transform = u.transform, delete u.transform), (d.transform || u.transformOrigin) && (d.transformOrigin = u.transformOrigin ?? "50% 50%", delete u.transformOrigin), d.transform && (d.transformBox = (c == null ? void 0 : c.transformBox) ?? "fill-box", delete u.transformBox), t !== void 0 && (u.x = t), n !== void 0 && (u.y = n), s !== void 0 && (u.scale = s), r !== void 0 && Ko(u, r, i, o, !1);
}
const Ms = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]), qo = (e) => typeof e == "string" && e.toLowerCase() === "svg";
function $o(e, t, n, s) {
  Es(e, t, void 0, s);
  for (const r in t.attrs)
    e.setAttribute(Ms.has(r) ? r : Vt(r), t.attrs[r]);
}
function Ho(e, t, n) {
  const s = Vs(e, t, n);
  for (const r in e)
    if (C(e[r]) || C(t[r])) {
      const i = re.indexOf(r) !== -1 ? "attr" + r.charAt(0).toUpperCase() + r.substring(1) : r;
      s[i] = e[r];
    }
  return s;
}
class Wo extends As {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = Mt;
  }
  getBaseTargetFromProps(t, n) {
    return t[n];
  }
  readValueFromInstance(t, n) {
    if (ie.has(n)) {
      const s = hs(n);
      return s && s.default || 0;
    }
    return n = Ms.has(n) ? n : Vt(n), t.getAttribute(n);
  }
  scrapeMotionValuesFromProps(t, n, s) {
    return Ho(t, n, s);
  }
  build(t, n, s) {
    Bo(t, n, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(t, n, s, r) {
    $o(t, n, s, r);
  }
  mount(t) {
    this.isSVGTag = qo(t.tagName), super.mount(t);
  }
}
function _o(e) {
  const t = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        transform: {},
        transformOrigin: {},
        style: {},
        vars: {},
        attrs: {}
      },
      latestValues: {}
    }
  }, n = gs(e) && !Fi(e) ? new Wo(t) : new Ro(t);
  n.mount(e), ye.set(e, n);
}
function Uo(e) {
  const t = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  }, n = new Fo(t);
  n.mount(e), ye.set(e, n);
}
function jo(e, t, n) {
  const s = C(e) ? e : ge(e);
  return s.start(ws("", s, t, n)), s.animation;
}
function Go(e, t) {
  return C(e) || typeof e == "number" || typeof e == "string" && !Et(t);
}
function ks(e, t, n, s) {
  const r = [];
  if (Go(e, t))
    r.push(jo(e, Et(t) && t.default || t, n && (n.default || n)));
  else {
    const i = ys(e, t, s), o = i.length;
    for (let a = 0; a < o; a++) {
      const l = i[a], f = l instanceof Element ? _o : Uo;
      ye.has(l) || f(l);
      const c = ye.get(l), u = { ...n };
      "delay" in u && typeof u.delay == "function" && (u.delay = u.delay(a, o)), r.push(...po(c, { ...t, transition: u }, {}));
    }
  }
  return r;
}
function zo(e, t, n) {
  const s = [];
  return _i(e, t, n, { spring: ee }).forEach(({ keyframes: i, transition: o }, a) => {
    s.push(...ks(a, i, o));
  }), s;
}
function Yo(e) {
  return Array.isArray(e) && e.some(Array.isArray);
}
function Xo(e) {
  function t(n, s, r) {
    let i = [];
    return Yo(n) ? i = zo(n, s, e) : i = ks(n, s, r, e), new wi(i);
  }
  return t;
}
const L = Xo();
function Zo(e) {
  return new Worker(
    "" + new URL("assets/worker-D4V8OS0H.js", import.meta.url).href,
    {
      name: e == null ? void 0 : e.name
    }
  );
}
const ln = "data-highlighted", cn = Array.from({ length: 5 }, () => ({
  worker: new Zo(),
  isBusy: !1
}));
function Jo() {
  return new Promise((e) => {
    const t = cn.find((s) => !s.isBusy);
    t && (t.isBusy = !0, e(t));
    const n = setInterval(() => {
      const s = cn.find((r) => !r.isBusy);
      s && (s.isBusy = !0, clearInterval(n), e(s));
    }, Math.random() * 100);
  });
}
async function Qo(e) {
  const t = await Jo();
  return t.isBusy = !0, t.worker.postMessage({ html: e }), new Promise((n) => {
    t.worker.onmessage = (s) => {
      t.isBusy = !1, n(s.data);
    };
  });
}
async function ea(e, t) {
  if (e.getAttribute(ln) === "true")
    return;
  let s = e.getAttribute("data-source-code");
  if (!s)
    throw new Error("No source code provided");
  s = decodeURIComponent(s).trim();
  const r = await Qo(s);
  e.insertAdjacentHTML("beforeend", r), e.setAttribute(ln, "true");
}
const un = () => window.matchMedia("(max-width: 768px)").matches;
function Ls(e, t) {
  let n;
  const s = async (o, a) => {
    if (!e.open)
      return;
    const l = un();
    o == null || o(l), l ? (L(e, { opacity: 0, y: [0, 250] }, { duration: 0.3, ease: "easeOut" }), await L(t, { opacity: 0 }, { duration: 0.3, ease: "easeOut" })) : (L(e, { opacity: 0, scale: [1, 0.98] }, { duration: 0.3, ease: "easeOut" }), await L(t, { opacity: 0 }, { duration: 0.3, ease: "linear" }).then(() => t.style.display = "none")), a == null || a(l), e.close(), n && n.abort();
  };
  async function r(o) {
    const a = o.target;
    if (!(a instanceof HTMLElement))
      throw new Error("Clicked element is not an HTMLElement");
    a.closest("dialog") !== null || await s();
  }
  return { show: async (o, a) => {
    n = new AbortController();
    const l = window.scrollY;
    e.showModal(), await new Promise((c) => setTimeout(c, 50)), window.scrollTo(0, l), setTimeout(() => window.scrollTo(0, l), 0), setTimeout(() => window.scrollTo(0, l), 50), t.style.display = "block";
    const f = un();
    o == null || o(f), f ? (e.style.overflowY = "hidden", L(e, { opacity: [0, 1], y: [250, 0] }, { duration: 0.3, ease: "easeOut" }), await L(t, { opacity: [0, 1] }, { duration: 0.3, ease: "easeOut" }), e.style.overflowY = "auto") : (L(e, { opacity: [0, 1], scale: [0.98, 1] }, { duration: 0.3, ease: "easeOut" }), L(t, { opacity: [0, 1] }, { duration: 0.3, ease: "easeOut" })), a == null || a(f), setTimeout(() => document.addEventListener("click", r, {
      signal: n == null ? void 0 : n.signal
    }), 0), e.addEventListener("keydown", async (c) => {
      c.key === "Escape" && (c.preventDefault(), await s());
    }, { signal: n == null ? void 0 : n.signal });
  }, close: s };
}
var P;
class ta extends EventTarget {
  constructor(n) {
    super();
    Nt(this, P);
    Ne(this, P, n);
  }
  get value() {
    return ce(this, P);
  }
  set value(n) {
    ce(this, P) !== n && (Ne(this, P, n), this.dispatchEvent(new CustomEvent("change")));
  }
  effect(n) {
    return n(), this.addEventListener("change", n), () => this.removeEventListener("change", n);
  }
  valueOf() {
    return ce(this, P);
  }
  toString() {
    return String(ce(this, P));
  }
}
P = new WeakMap();
const Cs = (e) => new ta(e);
function na(e) {
  const t = Cs(!1);
  return new ResizeObserver(() => {
    const n = e.scrollHeight > e.clientHeight;
    t.value !== n && (t.value = n);
  }).observe(e), { $isOverflowingVertically: t };
}
function sa(e, t, n) {
  var s = n || {}, r = s.noTrailing, i = r === void 0 ? !1 : r, o = s.noLeading, a = o === void 0 ? !1 : o, l = s.debounceMode, f = l === void 0 ? void 0 : l, c, u = !1, d = 0;
  function h() {
    c && clearTimeout(c);
  }
  function p(b) {
    var w = b || {}, S = w.upcomingOnly, v = S === void 0 ? !1 : S;
    h(), u = !v;
  }
  function y() {
    for (var b = arguments.length, w = new Array(b), S = 0; S < b; S++)
      w[S] = arguments[S];
    var v = this, A = Date.now() - d;
    if (u)
      return;
    function m() {
      d = Date.now(), t.apply(v, w);
    }
    function x() {
      c = void 0;
    }
    !a && f && !c && m(), h(), f === void 0 && A > e ? a ? (d = Date.now(), i || (c = setTimeout(f ? x : m, e))) : m() : i !== !0 && (c = setTimeout(f ? x : m, f === void 0 ? e - A : e));
  }
  return y.cancel = p, y;
}
function ra(e, t, n) {
  var s = n || {}, r = s.atBegin, i = r === void 0 ? !1 : r;
  return sa(e, t, {
    debounceMode: i !== !1
  });
}
function ia(...e) {
  return ra(...e);
}
class oa {
  /**
   * Creates a new PausableInterval instance
   * @param callback The function to call on each interval
   * @param interval The interval duration in milliseconds
   */
  constructor(t, n) {
    H(this, "callback");
    H(this, "interval");
    H(this, "isRunning");
    H(this, "timeoutId");
    H(this, "remaining");
    H(this, "startTime");
    this.callback = t, this.interval = n, this.isRunning = !1, this.timeoutId = null, this.remaining = n, this.startTime = null;
  }
  /**
   * Start the interval timer
   */
  start() {
    this.isRunning || (this.isRunning = !0, this.startTime = Date.now(), this.timeoutId = window.setTimeout(() => {
      this.callback(), this.remaining = this.interval, this.isRunning && this.start();
    }, this.remaining));
  }
  /**
   * Pause the interval timer
   */
  pause() {
    !this.isRunning || this.timeoutId === null || this.startTime === null || (this.isRunning = !1, window.clearTimeout(this.timeoutId), this.remaining -= Date.now() - this.startTime, this.remaining < 0 && (this.remaining = 0));
  }
  /**
   * Resume the interval timer
   */
  resume() {
    this.start();
  }
  /**
   * Stop and reset the interval timer
   */
  stop() {
    this.isRunning = !1, this.timeoutId !== null && (window.clearTimeout(this.timeoutId), this.timeoutId = null), this.remaining = this.interval;
  }
  /**
   * Check if the interval is currently running
   * @returns True if the interval is running, false otherwise
   */
  isActive() {
    return this.isRunning;
  }
  /**
   * Change the interval duration
   * @param newInterval The new interval duration in milliseconds
   */
  setInterval(t) {
    const n = this.isRunning;
    n && this.pause(), this.interval = t, this.remaining = t, n && this.resume();
  }
}
const Is = 3e3, De = document.querySelector("#alerts");
if (!De)
  throw new Error("Alert container not found");
const G = [], Z = Cs(!1);
Z.effect(ia(50, () => {
  G.toReversed().forEach(({ element: e, interval: t }, n) => {
    Z.value ? (t.setInterval(Is - n * 250), t.pause()) : t.resume();
    const s = 1 - n * 0.1, r = n === 0 ? 0 : -10 * n, i = G.slice(0, n), o = 5;
    L(e, {
      y: Z.value ? i.reduce((a, { element: l }) => a + l.offsetHeight + o, 0) * -1 : r,
      scale: Z.value ? 1 : s
    }, {
      ease: "easeOut",
      duration: 0.3
    });
  });
}));
function fn(e, t) {
  const n = G.length - 1, s = G.shift();
  if (!s)
    throw new Error("First alert not found");
  s.interval.stop();
  let r = -10 * (n + 1), i = n === 1 ? 1 : 1 - n * 0.1;
  t && (r += 10, i -= 0.1), L(s.element, {
    y: e === "top" ? r : "50%",
    scale: i,
    opacity: 0
  }, {
    duration: e === "top" ? 0.2 : 0.3,
    ease: "easeOut"
  }).then(() => {
    s.element.remove();
  });
}
function aa(e, t) {
  G.length === 3 && fn("top", !0);
  const n = document.createElement("div");
  n.setAttribute("role", "alert"), n.classList.add("c-toast", "z-50"), n.style.opacity = "0%";
  const s = document.createElement("span");
  if (s.textContent = e, n.append(s), t) {
    const i = document.createElement("div");
    i.innerHTML = t, n.prepend(i);
  }
  n.addEventListener("mouseenter", () => Z.value = !0), n.addEventListener("mouseleave", () => Z.value = !1), De == null || De.append(n), L(n, {
    y: ["100%", 0],
    scale: 1,
    opacity: 1
  }, {
    ease: "easeOut",
    duration: 0.3
  }), G.toReversed().forEach(({ element: i }, o) => {
    const a = 1 - (o + 1) * 0.1, l = -10 * (o + 1);
    L(i, {
      y: l,
      scale: a
    }, { ease: "easeOut", duration: 0.3 });
  });
  const r = new oa(() => fn("bottom", !1), Is);
  G.push({ element: n, interval: r }), r.start();
}
const la = 5e3;
async function ca(e) {
  const t = (n) => {
    var o;
    const s = (o = n.contentWindow) == null ? void 0 : o.document;
    if (!s)
      return !1;
    const r = s.body && s.body.children.length > 0, i = s.readyState === "complete";
    return r && i && s.body.children.length > 0;
  };
  await Promise.allSettled(
    e.map((n) => new Promise((s) => {
      const r = setInterval(() => {
        if (t(n))
          return clearInterval(r), s();
      }, 100);
      setTimeout(() => (clearInterval(r), s()), la);
    }))
  );
}
function He(e) {
  var s;
  const t = (s = e.contentWindow) == null ? void 0 : s.document;
  if (!t)
    throw new Error("iFrame was not fully loaded yet");
  e.style.height = "0px", e.offsetHeight;
  const n = Math.max(
    t.documentElement.scrollHeight,
    t.body.scrollHeight,
    t.documentElement.offsetHeight,
    t.body.offsetHeight,
    t.documentElement.clientHeight,
    t.body.clientHeight
  );
  e.style.height = `${n}px`;
}
function Ds() {
  document.body.classList.add("js-loaded");
}
const ua = async (e) => {
  if (await ca(e), e.forEach((t) => {
    He(t);
    const n = t.contentWindow;
    if (!n)
      return;
    new ResizeObserver(() => He(t)).observe(n.document.body);
  }), window.addEventListener("resize", () => {
    e.forEach((t) => He(t));
  }), window.location.hash) {
    const t = document.querySelector(window.location.hash);
    t && (await new Promise((n) => setTimeout(n, 200)), t.scrollIntoView());
  }
  Ds();
};
function fa(e) {
  e.forEach((t) => {
    const n = t.querySelectorAll('[role="tab"]'), s = Array.from(t.querySelectorAll('[role="tabpanel"]')), r = t.querySelector(".tab-trigger-background");
    if (!r)
      throw new Error("No tab trigger background found");
    const i = (l, f) => {
      const c = l.offsetWidth;
      if (f) {
        const d = l === n[0] ? l.offsetLeft : l.offsetLeft + 1;
        L(r, {
          width: c,
          x: `${d}px`
        }, {
          duration: 0.3,
          easing: "ease-out",
          type: ee,
          bounce: 0.1
        });
      } else
        r.style.width = `${c}px`, r.style.transform = "translateX(2px)";
    }, o = n[0];
    i(o, !1), n.forEach((l) => l.addEventListener("click", () => {
      n.forEach((f) => {
        const c = f === l;
        f.setAttribute("aria-selected", c.toString());
        const u = s.find((d) => d.getAttribute("aria-labelledby") === f.id);
        u == null || u.setAttribute("tab-index", c ? "0" : "-1"), u == null || u.classList.toggle("hidden", !c), c && i(l, !0);
      });
    })), window.innerWidth < 768 || n.forEach((l) => {
      const f = s.find((u) => u.getAttribute("aria-labelledby") === l.id);
      if (!f)
        throw new Error(`No content found for trigger ${l.id}`);
      const c = f.querySelector("iframe");
      !c || c.loading !== "lazy" || (l.addEventListener("mouseenter", () => {
        c.loading = "eager";
      }), setTimeout(() => {
        requestIdleCallback(() => {
          c.loading === "lazy" && (c.loading = "eager");
        });
      }, 5e3));
    });
  });
}
const We = "in2theme", Ve = {
  normal: "theme-normal",
  light: "theme-light",
  dark: "theme-dark"
}, da = (e) => {
  const t = window.matchMedia("(prefers-color-scheme: dark)");
  function n() {
    const o = localStorage.getItem(We);
    return o || localStorage.setItem(We, "normal"), o;
  }
  function s() {
    const o = n();
    let a = Ve[o];
    o === "normal" && t.matches && (a = Ve.dark);
    const l = (u) => {
      Object.values(Ve).forEach((d) => u.classList.remove(d)), u.classList.remove("dark");
    }, f = (u) => {
      u.classList.add(a), a === Ve.dark && u.classList.add("dark");
    };
    l(e), f(e);
    const c = document.querySelectorAll("iframe");
    c && c.forEach((u) => {
      l(u), f(u);
    }), l(document.body), f(document.body), Array.from(document.querySelectorAll("iframe")).filter((u) => u.src.includes("embed.figma.com")).forEach((u) => {
      const d = new URL(u.src);
      o === "normal" ? d.searchParams.set("theme", "system") : d.searchParams.set("theme", o), u.src = d.href;
    });
  }
  t.addEventListener("change", () => {
    n() === "normal" && s();
  }), s(), e.addEventListener("change", () => {
    const o = e.querySelector('input[name="theme"]:checked');
    if (!o)
      throw new Error("No selected theme found");
    const a = o.value;
    localStorage.setItem(We, a), s();
  });
  const r = n(), i = e.querySelector(`input[value="${r}"]`);
  if (!i)
    throw new Error("No current theme input found");
  i.checked = !0;
};
function dn(e, t, n, s) {
  return t.navigator.platform.indexOf("Mac") === 0 && !e.includes("meta+ctrl") ? e.replace(n, s) : e;
}
function ha() {
  return [
    (e, t) => dn(e, t, "meta", "ctrl"),
    (e, t) => dn(e, t, "ctrl", "meta")
  ];
}
function Y(e, t) {
  t && (t.tabIndex = 0, t.focus(), e.tabIndex = -1);
}
function Me(e) {
  let t = e.closest('[focusgroup]:not([focusgroup="none"])');
  if (t) return t;
}
function ke(e) {
  if (e.hasAttribute("focusgroup"))
    return [...e.querySelectorAll('*:not([focusgroup="none"])')].filter((n) => n.role === "button" || n.type === "button" || n.role === "checkbox" || n.type === "checkbox");
}
function ma(e) {
  let t = e.getAttribute("focusgroup");
  if (t !== null) return !t.split(" ").includes("block");
}
function pa() {
  return (e) => {
    let t = !1;
    function n(a) {
      let l = Me(a.target);
      if (!l) {
        s();
        return;
      }
      let f = ke(l), c = Array.from(f).indexOf(a.target), u = "ArrowDown", d = "ArrowUp";
      ma(l) && (e.document.dir === "rtl" ? (u = "ArrowLeft", d = "ArrowRight") : (u = "ArrowRight", d = "ArrowLeft")), a.key === u ? (a.preventDefault(), f[c + 1] ? Y(a.target, f[c + 1]) : l.getAttribute("focusgroup").includes("wrap") && Y(a.target, f[0])) : a.key === d ? (a.preventDefault(), f[c - 1] ? Y(a.target, f[c - 1]) : l.getAttribute("focusgroup").includes("wrap") && Y(a.target, f[f.length - 1])) : a.key === "Home" ? (a.preventDefault(), Y(a.target, f[0])) : a.key === "End" && (a.preventDefault(), Y(a.target, f[f.length - 1]));
    }
    function s() {
      t = !1, e.removeEventListener("keydown", n);
    }
    function r(a) {
      var f;
      let l = Me(a.target);
      if (l) {
        t || (t = !0, e.addEventListener("keydown", n));
        let c = ke(l);
        c.some((u) => u.getAttribute("tabindex") === "0") ? c.forEach((u) => {
          u !== a.target && u.setAttribute("tabindex", -1);
        }) : (c.forEach(
          (u, d) => u.setAttribute("tabindex", d === 0 ? 0 : -1)
        ), (f = c[0]) == null || f.focus());
      } else t && s();
    }
    function i(a) {
      var f;
      let l = Me(a.target);
      (f = l == null ? void 0 : l.getAttribute("focusgroup")) != null && f.includes("no-memory") && ke(l).forEach((u, d) => {
        u.setAttribute("tabindex", d === 0 ? 0 : -1);
      }), (!a.relatedTarget || a.relatedTarget === e.document) && s();
    }
    function o(a) {
      let l = Me(a.target);
      if (l) {
        let f = ke(l);
        for (let c of f)
          c !== a.target && c.setAttribute("tabindex", -1);
        a.target.setAttribute("tabindex", 0);
      }
    }
    return e.addEventListener("click", o), e.addEventListener("focusin", r), e.addEventListener("focusout", i), () => {
      s(), e.removeEventListener("click", o), e.removeEventListener("focusin", r), e.removeEventListener("focusout", i);
    };
  };
}
let ga = {
  button: ["toolbar"],
  checkbox: ["toolbar"],
  menuitem: ["menu", "menubar"],
  option: ["listbox"],
  tab: ["tablist"]
};
function ue(e, t) {
  t.tabIndex = 0, t.focus(), e.tabIndex = -1;
}
function _e(e) {
  let t = e.role || e.type || e.tagName;
  if (!t) return null;
  let n = ga[t.toLowerCase()];
  if (!n) return null;
  for (let s of n) {
    let r = e.closest(`[role=${s}]`);
    if (r) return r;
  }
}
function Ue(e, t) {
  return t.role === "toolbar" ? ya(t) : t.querySelectorAll(`[role=${e.role}]`);
}
function ya(e) {
  return [...e.querySelectorAll("*")].filter((n) => n.role === "button" || n.type === "button" || n.role === "checkbox" || n.type === "checkbox");
}
function ba(e) {
  let t = e.getAttribute("aria-orientation");
  if (t === "vertical") return !1;
  if (t === "horizontal") return !0;
  let n = e.role;
  return n === "menubar" || n === "tablist" || n === "toolbar";
}
function wa(e) {
  return (t) => {
    let n = !1, s = 300, r = 0, i = "";
    function o(u) {
      let d = _e(u.target);
      if (!d) {
        a();
        return;
      }
      let h = Ue(u.target, d), p = Array.from(h).indexOf(u.target), y = "ArrowDown", b = "ArrowUp";
      if (ba(d) && (t.document.dir === "rtl" ? (y = "ArrowLeft", b = "ArrowRight") : (y = "ArrowRight", b = "ArrowLeft")), u.key === y)
        u.preventDefault(), ue(u.target, h[p + 1] || h[0]);
      else if (u.key === b)
        u.preventDefault(), ue(u.target, h[p - 1] || h[h.length - 1]);
      else if (u.key === "Home")
        u.preventDefault(), ue(u.target, h[0]);
      else if (u.key === "End")
        u.preventDefault(), ue(u.target, h[h.length - 1]);
      else if (u.key.length === 1 && d.role !== "tablist") {
        u.timeStamp - r <= s ? i += u.key.toLowerCase() : i = u.key.toLowerCase(), r = u.timeStamp;
        let w = Array.from(h).find((S) => {
          var v, A, m;
          return (m = (A = (v = S.textContent) == null ? void 0 : v.trim()) == null ? void 0 : A.toLowerCase()) == null ? void 0 : m.startsWith(i);
        });
        w && (u.preventDefault(), ue(u.target, w));
      }
    }
    function a() {
      n = !1, t.removeEventListener("keydown", o);
    }
    function l(u) {
      let d = _e(u.target);
      if (d) {
        n || (n = !0, t.addEventListener("keydown", o));
        let h = Ue(u.target, d);
        for (let p of h)
          p !== u.target && p.setAttribute("tabindex", -1);
      } else n && a();
    }
    function f(u) {
      (!u.relatedTarget || u.relatedTarget === t.document) && a();
    }
    function c(u) {
      let d = _e(u.target);
      if (d) {
        let h = Ue(u.target, d);
        for (let p of h)
          p !== u.target && p.setAttribute("tabindex", -1);
        u.target.setAttribute("tabindex", 0);
      }
    }
    return t.addEventListener("click", c), t.addEventListener("focusin", l), t.addEventListener("focusout", f), () => {
      a(), t.removeEventListener("click", c), t.removeEventListener("focusin", l), t.removeEventListener("focusout", f);
    };
  };
}
function Ta() {
  return (e) => {
    let t, n;
    function s(i) {
      if (i.target.getAttribute("aria-hidden") === "true") {
        t = i.target, t.setAttribute("aria-hidden", "false"), n = t.hidden, n && (t.hidden = !1);
        let o = i.target.querySelector(
          'a, button, select, textarea, input:not([type=radio]), [type=radio]:checked, [tabindex]:not([tabindex="-1"])'
        );
        o && (o.tabIndex = 0);
      }
    }
    function r(i) {
      t && t.contains(i.target) && (!i.relatedTarget || !t.contains(i.relatedTarget)) && (i.target.tabIndex = -1, t.setAttribute("aria-hidden", "true"), n && (t.hidden = !0), t = null);
    }
    return e.addEventListener("keyuxJump", s), e.addEventListener("focusout", r), () => {
      e.removeEventListener("keyuxJump", s), e.removeEventListener("focusout", r);
    };
  };
}
let va = /^[^\x00-\x7F]$/, Sa = {
  checkbox: !0,
  file: !0,
  radio: !0
}, Aa = {
  button: !0,
  reset: !0,
  submit: !0
}, xa = {
  " ": "space",
  "+": "plus"
};
function Rs(e, t) {
  if (t.tagName !== "BODY" && e !== t)
    return t.hasAttribute("data-keyux-ignore-hotkeys") || t.getAttribute("aria-hidden") === "true" || t.hasAttribute("inert") ? !0 : Rs(e, t.parentNode);
}
function hn(e, t) {
  for (let n of t)
    if (!Rs(e, n))
      return n;
}
function mn(e, t, n) {
  let s = t;
  for (let [a] of n)
    if (s = a(s, e), !s) return !1;
  let r = e.document, i = r.activeElement, o = i.getAttribute("data-keyux-hotkeys");
  if (o) {
    let a = r.querySelector(`#${o}`);
    if (a) {
      let l = a.querySelector(`[aria-keyshortcuts="${s}" i]`);
      if (l) return l;
    }
  }
  return hn(
    i,
    i.querySelectorAll(`[aria-keyshortcuts="${s}" i]`)
  ) || hn(
    r,
    r.querySelectorAll(`[aria-keyshortcuts="${s}" i]`)
  );
}
function Ea(e, t, n) {
  let s = "";
  e.metaKey && (s += "meta+"), e.ctrlKey && (s += "ctrl+"), e.altKey && (s += "alt+"), e.shiftKey && (s += "shift+");
  let r = s;
  r += xa[e.key] ?? e.key.toLowerCase();
  let i = mn(t, r, n);
  if (!i && (e.key.length > 1 || va.test(e.key)) && /^(Key.|Digit\d)$/.test(e.code)) {
    let o = e.code.replace(/^Key|^Digit/, "").toLowerCase();
    i = mn(t, s + o, n);
  }
  return i;
}
function Va(e = []) {
  return (t) => {
    function n(s) {
      let r = s.ctrlKey || s.metaKey || s.altKey, i = s.target.isContentEditable || s.target.tagName === "TEXTAREA" || s.target.tagName === "INPUT" && !Sa[s.target.type], o = s.target.role === "menuitem";
      if (!r && (i || o))
        return;
      let a = Ea(s, t, e);
      a && (a.tagName === "TEXTAREA" || a.tagName === "INPUT" && !Aa[a.type] ? setTimeout(() => {
        a.focus();
      }) : a.click());
    }
    return t.addEventListener("keydown", n), () => {
      t.removeEventListener("keydown", n);
    };
  };
}
function Ma() {
  return (e) => {
    let t = [];
    function n(l) {
      let f = e.document.activeElement;
      f && f !== e.document.body && t.push(new WeakRef(f)), l.focus({ focusVisible: !0 });
    }
    function s() {
      let l = t.pop();
      if (!l) {
        e.document.activeElement.blur();
        return;
      }
      let f = l.deref();
      f && f.isConnected ? f.focus() : s();
    }
    let r = 0, i;
    function o(l) {
      clearInterval(i);
      let f = l.getAttribute("aria-controls");
      i = setInterval(() => {
        if (r++ > 50) {
          clearInterval(i);
          return;
        }
        let c = e.document.getElementById(f);
        if (c) {
          let u = c.querySelector(
            'a, button, select, textarea, input:not([type=radio]), [type=radio]:checked, [tabindex]:not([tabindex="-1"])'
          );
          u && (clearInterval(i), c.dispatchEvent(
            new e.CustomEvent("keyuxJump", { bubbles: !0 })
          ), n(u));
        }
      }, 50);
    }
    function a(l) {
      l.target.getAttribute("aria-controls") && l.key === "Enter" && o(l.target), l.key === "Escape" && s();
    }
    return e.addEventListener("keydown", a), () => {
      e.removeEventListener("keydown", a);
    };
  };
}
function ka(e, t) {
  let n = t.map((s) => s(e));
  return () => {
    n.forEach((s) => s());
  };
}
const La = ha();
ka(window, [
  Va([La]),
  wa(),
  pa(),
  Ma(),
  Ta()
]);
function Ca() {
  const e = navigator.userAgent.toLowerCase();
  return e.includes("mac") ? "mac" : e.includes("linux") ? "linux" : e.includes("win") ? "windows" : "unknown";
}
function Ia() {
  const e = document.querySelectorAll("iframe"), t = document.querySelector("#styleguide-previous"), n = document.querySelector("#styleguide-next"), s = (r) => {
    document.activeElement instanceof HTMLButtonElement || r.metaKey || r.ctrlKey || (t && r.key === "ArrowLeft" && (r.preventDefault(), t.click()), n && r.key === "ArrowRight" && (r.preventDefault(), n.click()));
  };
  e.forEach((r) => {
    const i = r.contentWindow;
    i && i.addEventListener("keydown", s);
  }), window.addEventListener("keydown", s);
}
function Da() {
  const e = document.querySelectorAll("iframe"), t = (n) => {
    n.key === "k" && (n.metaKey || n.ctrlKey) && (n.preventDefault(), window.dispatchEvent(new Event("styleguideOpenSearch")));
  };
  e.forEach((n) => {
    const s = n.contentWindow;
    s && s.addEventListener("keydown", t);
  }), window.addEventListener("keydown", t);
}
const Ra = Ca();
document.body.setAttribute("data-os", Ra);
const Oa = "ontouchstart" in window || navigator.maxTouchPoints > 0;
document.body.setAttribute("data-is-mobile", String(Oa));
Ia();
Da();
function Fa() {
  const e = document.querySelector("header");
  if (!e)
    throw new Error("No header found");
  const t = () => e.getBoundingClientRect().height;
  document.documentElement.style.setProperty("--header-height", `${t()}px`), window.addEventListener("resize", () => {
    document.documentElement.style.setProperty("--header-height", `${t()}px`);
  });
}
function Pa() {
  const e = document.querySelector("aside");
  if (!e)
    throw new Error("No aside menu found");
  e.addEventListener("scroll", () => {
    const n = e.scrollTop / (e.scrollHeight - e.clientHeight) * 100;
    sessionStorage.setItem("asideScrollPercentage", n.toString());
  });
  function t() {
    const n = sessionStorage.getItem("asideScrollPercentage");
    if (n) {
      const s = Number.parseFloat(n), r = (e.scrollHeight - e.clientHeight) * s / 100;
      e.scrollTop = r;
    }
  }
  window.addEventListener("resize", t), t();
}
Fa();
Pa();
const Os = document.querySelector("#search-dialog");
if (!Os)
  throw new Error("No search dialog found");
const Fs = document.querySelector(".dialog-backdrop");
if (!Fs)
  throw new Error("No dialog backdrop found");
const kt = document.querySelectorAll("[data-open-search]");
if (kt.length === 0)
  throw new Error("No open search buttons found");
const Q = document.querySelector("#search-input");
if (!Q)
  throw new Error("No search input found");
const Ps = document.querySelector("#search-list");
if (!Ps)
  throw new Error("No search list found");
const Ns = document.querySelectorAll(".search-category__item--active");
if (!Ns)
  throw new Error("No search results found");
const Ks = document.querySelector("#search-no-results");
if (!Ks)
  throw new Error("No search no results element found");
const { show: Na } = Ls(Os, Fs);
async function Bs() {
  await Na(
    (e) => {
      e && Q.setAttribute("inert", "");
    },
    (e) => {
      e && Q.removeAttribute("inert"), kt.forEach((t) => t.ariaExpanded = "true"), Q.ariaExpanded = "true", qs();
    }
  );
}
function qs() {
  const e = Q.value.toLowerCase().trim();
  let t = !1;
  Ns.forEach((n) => {
    var i, o;
    let s;
    const r = ((i = n.getAttribute("data-search-keywords")) == null ? void 0 : i.split(",")) || [];
    if (r.length > 0)
      s = r.some((a) => a.toLowerCase().includes(e));
    else {
      const a = ((o = n.textContent) == null ? void 0 : o.toLowerCase()) ?? "";
      s = a == null ? void 0 : a.includes(e);
    }
    n.classList.toggle("search-category__item--active", s), s && (t = !0);
  }), Ps.classList.toggle("hidden", !t), Ks.classList.toggle("hidden", t);
}
Q.addEventListener("input", qs);
kt.forEach((e) => e.addEventListener("click", Bs));
window.addEventListener("styleguideOpenSearch", Bs);
const pn = Array.from(document.querySelectorAll(".preview-iframe"));
pn.length > 0 ? ua(pn).catch(console.error) : Ds();
const gn = document.querySelector(".theme-select");
gn && da(gn);
const Ka = document.querySelectorAll(".styleguide-section");
Ka.forEach((e) => {
  new ResizeObserver(() => {
    const t = e.scrollHeight > 600;
    e.classList.toggle("styleguide-section--large", t);
  }).observe(e);
});
const yn = document.querySelectorAll(".tabs");
yn.length > 0 && fa(yn);
const bn = document.querySelectorAll("details:has(.code-highlight)");
bn.length > 0 && bn.forEach((e) => {
  const t = e.querySelector(".code-highlight");
  if (!t)
    throw new Error("No code element found");
  ea(t).catch(console.error);
});
const Le = document.querySelectorAll("[data-code-audit-iframe]"), je = document.querySelector("#code-audit-dialog"), wn = document.querySelector(".dialog-backdrop");
Le.length > 0 && je && wn && (async () => {
  const { createHtmlValidator: e, auditCode: t } = await import("./html-validator-DqoaRE1y.js"), { show: n, close: s } = Ls(je, wn);
  Le.forEach((r) => r.addEventListener("click", async () => {
    Le.forEach((o) => o.setAttribute("aria-expanded", "false")), r.setAttribute("disabled", "");
    const { isValid: i } = await t(r, je, s);
    i ? (r.classList.add("text-green-500", "!cursor-not-allowed"), aa(
      "Scanned HTML, no issues found!",
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4 text-green-500/50"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clip-rule="evenodd" /></svg>'
    ), setTimeout(() => {
      r.classList.remove("text-green-500", "!cursor-not-allowed"), r.removeAttribute("disabled");
    }, 5e3)) : (r.setAttribute("aria-expanded", "true"), r.removeAttribute("disabled"), r.classList.add("text-red-500"), await n(
      void 0,
      () => {
        Le.forEach((o) => {
          o.setAttribute("aria-expanded", "false"), setTimeout(() => o.classList.remove("text-red-500"), 2500);
        });
      }
    ));
  })), setTimeout(() => {
    requestIdleCallback(e);
  }, 8e3);
})();
const Tn = document.querySelector("#icon-search-input"), vn = document.querySelector("#icon-search-input-reset"), Sn = document.querySelector("#icon-search-list");
Tn && Sn && vn && import("./icons-oK5xUF8R.js").then(({ default: e }) => e(Tn, Sn, vn)).catch(console.error);
const $s = "data-clipboard-value", An = document.querySelectorAll(`button[${$s}]`);
An.length > 0 && import("./clipboard-DhKzwemV.js").then(({ default: e }) => e(An, $s)).catch(console.error);
const xn = document.querySelectorAll(".markdown-container-folded");
xn.length > 0 && xn.forEach((e) => {
  const t = e.querySelector(".markdown-container");
  if (!t)
    throw new Error("No markdown container found");
  const n = e.querySelector(".markdown-show-more-container");
  if (!n)
    throw new Error("No show more container found");
  const s = e.querySelector(".markdown-show-more");
  if (!s)
    throw new Error("No show more button found");
  const { $isOverflowingVertically: r } = na(e), i = () => {
    const a = t.scrollHeight > t.clientHeight;
    n.classList.toggle("hidden", !a);
  };
  i();
  const o = r.effect(i);
  s.addEventListener("click", async () => {
    o();
    const a = t.scrollHeight;
    L(t, {
      maxHeight: `${a}px`
    }, { duration: 0.5 }).then(() => {
      t.classList.remove("max-h-[400px]"), t.style.maxHeight = "";
    }), L(n, {
      opacity: 0
    }, { duration: 0.5 }).then(() => n.classList.add("hidden"));
  });
});
let Ce;
window.addEventListener("scroll", () => {
  Ce && (clearTimeout(Ce), Ce = void 0), document.body.classList.contains("is-scrolling") || document.body.classList.add("is-scrolling"), Ce = setTimeout(() => {
    document.body.classList.remove("is-scrolling");
  }, 250);
});
export {
  L as a,
  aa as r,
  ee as s
};
