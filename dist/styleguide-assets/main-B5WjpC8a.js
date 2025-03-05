var Ss = Object.defineProperty;
var Et = (t) => {
  throw TypeError(t);
};
var Vs = (t, e, n) => e in t ? Ss(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var H = (t, e, n) => Vs(t, typeof e != "symbol" ? e + "" : e, n), Ct = (t, e, n) => e.has(t) || Et("Cannot " + n);
var le = (t, e, n) => (Ct(t, e, "read from private field"), n ? n.call(t) : e.get(t)), Pt = (t, e, n) => e.has(t) ? Et("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Ne = (t, e, n, s) => (Ct(t, e, "write to private field"), s ? s.call(t, n) : e.set(t, n), n);
function As(t, e, n) {
  var s = n, i = s.noTrailing, r = i === void 0 ? !1 : i, o = s.noLeading, a = o === void 0 ? !1 : o, l = s.debounceMode, u = l === void 0 ? void 0 : l, c, d = !1, f = 0;
  function y() {
    c && clearTimeout(c);
  }
  function g(v) {
    var h = v || {}, w = h.upcomingOnly, A = w === void 0 ? !1 : w;
    y(), d = !A;
  }
  function T() {
    for (var v = arguments.length, h = new Array(v), w = 0; w < v; w++)
      h[w] = arguments[w];
    var A = this, x = Date.now() - f;
    if (d)
      return;
    function m() {
      f = Date.now(), e.apply(A, h);
    }
    function S() {
      c = void 0;
    }
    !a && u && !c && m(), y(), u === void 0 && x > t ? a ? (f = Date.now(), r || (c = setTimeout(u ? S : m, t))) : m() : r !== !0 && (c = setTimeout(u ? S : m, u === void 0 ? t - x : t));
  }
  return T.cancel = g, T;
}
function xs(t, e, n) {
  var s = {}, i = s.atBegin, r = i === void 0 ? !1 : i;
  return As(t, e, {
    debounceMode: r !== !1
  });
}
function Ms(t, e, n) {
  var s;
  if (t instanceof EventTarget)
    return [t];
  if (typeof t == "string") {
    let i = document;
    const r = (s = n == null ? void 0 : n[t]) !== null && s !== void 0 ? s : i.querySelectorAll(t);
    return r ? Array.from(r) : [];
  }
  return Array.from(t);
}
const z = /* @__NO_SIDE_EFFECTS__ */ (t) => t;
let Ge = z;
const Ie = /* @__NO_SIDE_EFFECTS__ */ (t, e, n) => {
  const s = e - t;
  return s === 0 ? 1 : (n - t) / s;
};
// @__NO_SIDE_EFFECTS__
function nt(t) {
  let e;
  return () => (e === void 0 && (e = t()), e);
}
const Es = /* @__PURE__ */ nt(() => window.ScrollTimeline !== void 0);
class Cs {
  constructor(e) {
    this.stop = () => this.runAll("stop"), this.animations = e.filter(Boolean);
  }
  get finished() {
    return Promise.all(this.animations.map((e) => "finished" in e ? e.finished : e));
  }
  /**
   * TODO: Filter out cancelled or stopped animations before returning
   */
  getAll(e) {
    return this.animations[0][e];
  }
  setAll(e, n) {
    for (let s = 0; s < this.animations.length; s++)
      this.animations[s][e] = n;
  }
  attachTimeline(e, n) {
    const s = this.animations.map((i) => {
      if (Es() && i.attachTimeline)
        return i.attachTimeline(e);
      if (typeof n == "function")
        return n(i);
    });
    return () => {
      s.forEach((i, r) => {
        i && i(), this.animations[r].stop();
      });
    };
  }
  get time() {
    return this.getAll("time");
  }
  set time(e) {
    this.setAll("time", e);
  }
  get speed() {
    return this.getAll("speed");
  }
  set speed(e) {
    this.setAll("speed", e);
  }
  get startTime() {
    return this.getAll("startTime");
  }
  get duration() {
    let e = 0;
    for (let n = 0; n < this.animations.length; n++)
      e = Math.max(e, this.animations[n].duration);
    return e;
  }
  runAll(e) {
    this.animations.forEach((n) => n[e]());
  }
  flatten() {
    this.runAll("flatten");
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
class un extends Cs {
  then(e, n) {
    return Promise.all(this.animations).then(e).catch(n);
  }
}
const B = /* @__NO_SIDE_EFFECTS__ */ (t) => t * 1e3, N = /* @__NO_SIDE_EFFECTS__ */ (t) => t / 1e3, Ee = 2e4;
function st(t) {
  let e = 0;
  const n = 50;
  let s = t.next(e);
  for (; !s.done && e < Ee; )
    e += n, s = t.next(e);
  return e >= Ee ? 1 / 0 : e;
}
const dn = (t, e, n = 10) => {
  let s = "";
  const i = Math.max(Math.round(e / n), 2);
  for (let r = 0; r < i; r++)
    s += t(/* @__PURE__ */ Ie(0, i - 1, r)) + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, Y = (t, e, n) => n > e ? e : n < t ? t : n;
function fn(t, e) {
  return e ? t * (1e3 / e) : 0;
}
const Ps = 5;
function hn(t, e, n) {
  const s = Math.max(e - Ps, 0);
  return fn(n - t(s), e - s);
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
}, Dt = 1e-3;
function Ds({ duration: t = M.duration, bounce: e = M.bounce, velocity: n = M.velocity, mass: s = M.mass }) {
  let i, r, o = 1 - e;
  o = Y(M.minDamping, M.maxDamping, o), t = Y(M.minDuration, M.maxDuration, /* @__PURE__ */ N(t)), o < 1 ? (i = (u) => {
    const c = u * o, d = c * t, f = c - n, y = Ue(u, o), g = Math.exp(-d);
    return Dt - f / y * g;
  }, r = (u) => {
    const d = u * o * t, f = d * n + n, y = Math.pow(o, 2) * Math.pow(u, 2) * t, g = Math.exp(-d), T = Ue(Math.pow(u, 2), o);
    return (-i(u) + Dt > 0 ? -1 : 1) * ((f - y) * g) / T;
  }) : (i = (u) => {
    const c = Math.exp(-u * t), d = (u - n) * t + 1;
    return -1e-3 + c * d;
  }, r = (u) => {
    const c = Math.exp(-u * t), d = (n - u) * (t * t);
    return c * d;
  });
  const a = 5 / t, l = Rs(i, r, a);
  if (t = /* @__PURE__ */ B(t), isNaN(l))
    return {
      stiffness: M.stiffness,
      damping: M.damping,
      duration: t
    };
  {
    const u = Math.pow(l, 2) * s;
    return {
      stiffness: u,
      damping: o * 2 * Math.sqrt(s * u),
      duration: t
    };
  }
}
const Fs = 12;
function Rs(t, e, n) {
  let s = n;
  for (let i = 1; i < Fs; i++)
    s = s - t(s) / e(s);
  return s;
}
function Ue(t, e) {
  return t * Math.sqrt(1 - e * e);
}
const Is = ["duration", "bounce"], Os = ["stiffness", "damping", "mass"];
function Ft(t, e) {
  return e.some((n) => t[n] !== void 0);
}
function Ls(t) {
  let e = {
    velocity: M.velocity,
    stiffness: M.stiffness,
    damping: M.damping,
    mass: M.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!Ft(t, Os) && Ft(t, Is))
    if (t.visualDuration) {
      const n = t.visualDuration, s = 2 * Math.PI / (n * 1.2), i = s * s, r = 2 * Y(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(i);
      e = {
        ...e,
        mass: M.mass,
        stiffness: i,
        damping: r
      };
    } else {
      const n = Ds(t);
      e = {
        ...e,
        ...n,
        mass: M.mass
      }, e.isResolvedFromDuration = !0;
    }
  return e;
}
function it(t = M.visualDuration, e = M.bounce) {
  const n = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: e
  } : t;
  let { restSpeed: s, restDelta: i } = n;
  const r = n.keyframes[0], o = n.keyframes[n.keyframes.length - 1], a = { done: !1, value: r }, { stiffness: l, damping: u, mass: c, duration: d, velocity: f, isResolvedFromDuration: y } = Ls({
    ...n,
    velocity: -/* @__PURE__ */ N(n.velocity || 0)
  }), g = f || 0, T = u / (2 * Math.sqrt(l * c)), v = o - r, h = /* @__PURE__ */ N(Math.sqrt(l / c)), w = Math.abs(v) < 5;
  s || (s = w ? M.restSpeed.granular : M.restSpeed.default), i || (i = w ? M.restDelta.granular : M.restDelta.default);
  let A;
  if (T < 1) {
    const m = Ue(h, T);
    A = (S) => {
      const E = Math.exp(-T * h * S);
      return o - E * ((g + T * h * v) / m * Math.sin(m * S) + v * Math.cos(m * S));
    };
  } else if (T === 1)
    A = (m) => o - Math.exp(-h * m) * (v + (g + h * v) * m);
  else {
    const m = h * Math.sqrt(T * T - 1);
    A = (S) => {
      const E = Math.exp(-T * h * S), b = Math.min(m * S, 300);
      return o - E * ((g + T * h * v) * Math.sinh(b) + m * v * Math.cosh(b)) / m;
    };
  }
  const x = {
    calculatedDuration: y && d || null,
    next: (m) => {
      const S = A(m);
      if (y)
        a.done = m >= d;
      else {
        let E = 0;
        T < 1 && (E = m === 0 ? /* @__PURE__ */ B(g) : hn(A, m, S));
        const b = Math.abs(E) <= s, V = Math.abs(o - S) <= i;
        a.done = b && V;
      }
      return a.value = a.done ? o : S, a;
    },
    toString: () => {
      const m = Math.min(st(x), Ee), S = dn((E) => x.next(m * E).value, m, 30);
      return m + "ms " + S;
    }
  };
  return x;
}
function ks(t, e = 100, n) {
  const s = n({ ...t, keyframes: [0, e] }), i = Math.min(st(s), Ee);
  return {
    type: "keyframes",
    ease: (r) => s.next(i * r).value / e,
    duration: /* @__PURE__ */ N(i)
  };
}
function Oe(t) {
  return typeof t == "function";
}
const Bs = (t, e, n) => {
  const s = e - t;
  return ((n - t) % s + s) % s + t;
}, mn = (t) => Array.isArray(t) && typeof t[0] != "number";
function pn(t, e) {
  return mn(t) ? t[Bs(0, t.length, e)] : t;
}
const pe = (t, e, n) => t + (e - t) * n;
function gn(t, e) {
  const n = t[t.length - 1];
  for (let s = 1; s <= e; s++) {
    const i = /* @__PURE__ */ Ie(0, e, s);
    t.push(pe(n, 1, i));
  }
}
function yn(t) {
  const e = [0];
  return gn(e, t.length - 1), e;
}
const P = (t) => !!(t && t.getVelocity);
function rt(t) {
  return typeof t == "object" && !Array.isArray(t);
}
function vn(t, e, n, s) {
  return typeof t == "string" && rt(e) ? Ms(t, n, s) : t instanceof NodeList ? Array.from(t) : Array.isArray(t) ? t : [t];
}
function Ns(t, e, n) {
  return t * (e + 1);
}
function Rt(t, e, n, s) {
  var i;
  return typeof e == "number" ? e : e.startsWith("-") || e.startsWith("+") ? Math.max(0, t + parseFloat(e)) : e === "<" ? n : (i = s.get(e)) !== null && i !== void 0 ? i : t;
}
function Ks(t, e) {
  t.indexOf(e) === -1 && t.push(e);
}
function wn(t, e) {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}
function _s(t, e, n) {
  for (let s = 0; s < t.length; s++) {
    const i = t[s];
    i.at > e && i.at < n && (wn(t, i), s--);
  }
}
function qs(t, e, n, s, i, r) {
  _s(t, i, r);
  for (let o = 0; o < e.length; o++)
    t.push({
      value: e[o],
      at: pe(i, r, s[o]),
      easing: pn(n, o)
    });
}
function Hs(t, e) {
  for (let n = 0; n < t.length; n++)
    t[n] = t[n] / (e + 1);
}
function Ws(t, e) {
  return t.at === e.at ? t.value === null ? 1 : e.value === null ? -1 : 0 : t.at - e.at;
}
const $s = "easeInOut";
function Gs(t, { defaultTransition: e = {}, ...n } = {}, s, i) {
  const r = e.duration || 0.3, o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), l = {}, u = /* @__PURE__ */ new Map();
  let c = 0, d = 0, f = 0;
  for (let y = 0; y < t.length; y++) {
    const g = t[y];
    if (typeof g == "string") {
      u.set(g, d);
      continue;
    } else if (!Array.isArray(g)) {
      u.set(g.name, Rt(d, g.at, c, u));
      continue;
    }
    let [T, v, h = {}] = g;
    h.at !== void 0 && (d = Rt(d, h.at, c, u));
    let w = 0;
    const A = (x, m, S, E = 0, b = 0) => {
      const V = Us(x), { delay: D = 0, times: O = yn(V), type: Be = "keyframes", repeat: ve, repeatType: Do, repeatDelay: Fo = 0, ...bs } = m;
      let { ease: K = e.ease || "easeOut", duration: R } = m;
      const bt = typeof D == "function" ? D(E, b) : D, St = V.length, Vt = Oe(Be) ? Be : i == null ? void 0 : i[Be];
      if (St <= 2 && Vt) {
        let re = 100;
        if (St === 2 && Ys(V)) {
          const oe = V[1] - V[0];
          re = Math.abs(oe);
        }
        const we = { ...bs };
        R !== void 0 && (we.duration = /* @__PURE__ */ B(R));
        const Te = ks(we, re, Vt);
        K = Te.ease, R = Te.duration;
      }
      R ?? (R = r);
      const At = d + bt;
      O.length === 1 && O[0] === 0 && (O[1] = 1);
      const xt = O.length - V.length;
      if (xt > 0 && gn(O, xt), V.length === 1 && V.unshift(null), ve) {
        R = Ns(R, ve);
        const re = [...V], we = [...O];
        K = Array.isArray(K) ? [...K] : [K];
        const Te = [...K];
        for (let oe = 0; oe < ve; oe++) {
          V.push(...re);
          for (let ae = 0; ae < re.length; ae++)
            O.push(we[ae] + (oe + 1)), K.push(ae === 0 ? "linear" : pn(Te, ae - 1));
        }
        Hs(O, ve);
      }
      const Mt = At + R;
      qs(S, V, K, O, At, Mt), w = Math.max(bt + R, w), f = Math.max(Mt, f);
    };
    if (P(T)) {
      const x = It(T, a);
      A(v, h, Ot("default", x));
    } else {
      const x = vn(T, v, s, l), m = x.length;
      for (let S = 0; S < m; S++) {
        v = v, h = h;
        const E = x[S], b = It(E, a);
        for (const V in v)
          A(v[V], js(h, V), Ot(V, b), S, m);
      }
    }
    c = d, d += w;
  }
  return a.forEach((y, g) => {
    for (const T in y) {
      const v = y[T];
      v.sort(Ws);
      const h = [], w = [], A = [];
      for (let m = 0; m < v.length; m++) {
        const { at: S, value: E, easing: b } = v[m];
        h.push(E), w.push(/* @__PURE__ */ Ie(0, f, S)), A.push(b || "easeOut");
      }
      w[0] !== 0 && (w.unshift(0), h.unshift(h[0]), A.unshift($s)), w[w.length - 1] !== 1 && (w.push(1), h.push(null)), o.has(g) || o.set(g, {
        keyframes: {},
        transition: {}
      });
      const x = o.get(g);
      x.keyframes[T] = h, x.transition[T] = {
        ...e,
        duration: f,
        ease: A,
        times: w,
        ...n
      };
    }
  }), o;
}
function It(t, e) {
  return !e.has(t) && e.set(t, {}), e.get(t);
}
function Ot(t, e) {
  return e[t] || (e[t] = []), e[t];
}
function Us(t) {
  return Array.isArray(t) ? t : [t];
}
function js(t, e) {
  return t && t[e] ? {
    ...t,
    ...t[e]
  } : { ...t };
}
const zs = (t) => typeof t == "number", Ys = (t) => t.every(zs), de = /* @__PURE__ */ new WeakMap();
function Tn(t, e) {
  return t ? t[e] || t.default || t : void 0;
}
const te = [
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
], ne = new Set(te), bn = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...te
]), Xs = (t) => Array.isArray(t), Zs = (t) => Xs(t) ? t[t.length - 1] || 0 : t, Qs = {
  skipAnimations: !1,
  useManualTiming: !1
}, be = [
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];
function Js(t, e) {
  let n = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), i = !1, r = !1;
  const o = /* @__PURE__ */ new WeakSet();
  let a = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function l(c) {
    o.has(c) && (u.schedule(c), t()), c(a);
  }
  const u = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (c, d = !1, f = !1) => {
      const g = f && i ? n : s;
      return d && o.add(c), g.has(c) || g.add(c), c;
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
      if (a = c, i) {
        r = !0;
        return;
      }
      i = !0, [n, s] = [s, n], n.forEach(l), n.clear(), i = !1, r && (r = !1, u.process(c));
    }
  };
  return u;
}
const ei = 40;
function ti(t, e) {
  let n = !1, s = !0;
  const i = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, r = () => n = !0, o = be.reduce((h, w) => (h[w] = Js(r), h), {}), { read: a, resolveKeyframes: l, update: u, preRender: c, render: d, postRender: f } = o, y = () => {
    const h = performance.now();
    n = !1, i.delta = s ? 1e3 / 60 : Math.max(Math.min(h - i.timestamp, ei), 1), i.timestamp = h, i.isProcessing = !0, a.process(i), l.process(i), u.process(i), c.process(i), d.process(i), f.process(i), i.isProcessing = !1, n && e && (s = !1, t(y));
  }, g = () => {
    n = !0, s = !0, i.isProcessing || t(y);
  };
  return { schedule: be.reduce((h, w) => {
    const A = o[w];
    return h[w] = (x, m = !1, S = !1) => (n || g(), A.schedule(x, m, S)), h;
  }, {}), cancel: (h) => {
    for (let w = 0; w < be.length; w++)
      o[be[w]].cancel(h);
  }, state: i, steps: o };
}
const { schedule: L, cancel: je, state: Ce, steps: Io } = ti(typeof requestAnimationFrame < "u" ? requestAnimationFrame : z, !0);
let xe;
function ni() {
  xe = void 0;
}
const q = {
  now: () => (xe === void 0 && q.set(Ce.isProcessing || Qs.useManualTiming ? Ce.timestamp : performance.now()), xe),
  set: (t) => {
    xe = t, queueMicrotask(ni);
  }
};
class Sn {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return Ks(this.subscriptions, e), () => wn(this.subscriptions, e);
  }
  notify(e, n, s) {
    const i = this.subscriptions.length;
    if (i)
      if (i === 1)
        this.subscriptions[0](e, n, s);
      else
        for (let r = 0; r < i; r++) {
          const o = this.subscriptions[r];
          o && o(e, n, s);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const Lt = 30, si = (t) => !isNaN(parseFloat(t));
class ii {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   *
   * @internal
   */
  constructor(e, n = {}) {
    this.version = "12.4.7", this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s, i = !0) => {
      const r = q.now();
      this.updatedAt !== r && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && this.events.change && this.events.change.notify(this.current), i && this.events.renderRequest && this.events.renderRequest.notify(this.current);
    }, this.hasAnimated = !1, this.setCurrent(e), this.owner = n.owner;
  }
  setCurrent(e) {
    this.current = e, this.updatedAt = q.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = si(this.current));
  }
  setPrevFrameValue(e = this.current) {
    this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt;
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
  onChange(e) {
    return this.on("change", e);
  }
  on(e, n) {
    this.events[e] || (this.events[e] = new Sn());
    const s = this.events[e].add(n);
    return e === "change" ? () => {
      s(), L.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : s;
  }
  clearListeners() {
    for (const e in this.events)
      this.events[e].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   *
   * @internal
   */
  attach(e, n) {
    this.passiveEffect = e, this.stopPassiveEffect = n;
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
  set(e, n = !0) {
    !n || !this.passiveEffect ? this.updateAndNotify(e, n) : this.passiveEffect(e, this.updateAndNotify);
  }
  setWithVelocity(e, n, s) {
    this.set(n), this.prev = void 0, this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt - s;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(e, n = !0) {
    this.updateAndNotify(e), this.prev = e, this.prevUpdatedAt = this.prevFrameValue = void 0, n && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
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
    const e = q.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > Lt)
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, Lt);
    return fn(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
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
   *
   * @internal
   */
  start(e) {
    return this.stop(), new Promise((n) => {
      this.hasAnimated = !0, this.animation = e(n), this.events.animationStart && this.events.animationStart.notify();
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
    this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function fe(t, e) {
  return new ii(t, e);
}
function kt(t) {
  const e = [{}, {}];
  return t == null || t.values.forEach((n, s) => {
    e[0][s] = n.get(), e[1][s] = n.getVelocity();
  }), e;
}
function Vn(t, e, n, s) {
  if (typeof e == "function") {
    const [i, r] = kt(s);
    e = e(n !== void 0 ? n : t.custom, i, r);
  }
  if (typeof e == "string" && (e = t.variants && t.variants[e]), typeof e == "function") {
    const [i, r] = kt(s);
    e = e(n !== void 0 ? n : t.custom, i, r);
  }
  return e;
}
function ri(t, e, n) {
  const s = t.getProps();
  return Vn(s, e, s.custom, t);
}
function oi(t, e, n) {
  t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, fe(n));
}
function ai(t, e) {
  const n = ri(t, e);
  let { transitionEnd: s = {}, transition: i = {}, ...r } = n || {};
  r = { ...r, ...s };
  for (const o in r) {
    const a = Zs(r[o]);
    oi(t, o, a);
  }
}
function li(t) {
  return !!(P(t) && t.add);
}
function ci(t, e) {
  const n = t.getValue("willChange");
  if (li(n))
    return n.add(e);
}
const ot = (t) => t.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), ui = "framerAppearId", di = "data-" + ot(ui);
function fi(t) {
  return t.props[di];
}
function Bt(t, e) {
  t.timeline = e, t.onfinish = null;
}
const at = (t) => Array.isArray(t) && typeof t[0] == "number", hi = {
  linearEasing: void 0
};
function mi(t, e) {
  const n = /* @__PURE__ */ nt(t);
  return () => {
    var s;
    return (s = hi[e]) !== null && s !== void 0 ? s : n();
  };
}
const Pe = /* @__PURE__ */ mi(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing");
function An(t) {
  return !!(typeof t == "function" && Pe() || !t || typeof t == "string" && (t in ze || Pe()) || at(t) || Array.isArray(t) && t.every(An));
}
const ce = ([t, e, n, s]) => `cubic-bezier(${t}, ${e}, ${n}, ${s})`, ze = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ ce([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ ce([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ ce([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ ce([0.33, 1.53, 0.69, 0.99])
};
function xn(t, e) {
  if (t)
    return typeof t == "function" && Pe() ? dn(t, e) : at(t) ? ce(t) : Array.isArray(t) ? t.map((n) => xn(n, e) || ze.easeOut) : ze[t];
}
const Mn = (t, e, n) => (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t, pi = 1e-7, gi = 12;
function yi(t, e, n, s, i) {
  let r, o, a = 0;
  do
    o = e + (n - e) / 2, r = Mn(o, s, i) - t, r > 0 ? n = o : e = o;
  while (Math.abs(r) > pi && ++a < gi);
  return o;
}
function ge(t, e, n, s) {
  if (t === e && n === s)
    return z;
  const i = (r) => yi(r, 0, 1, t, n);
  return (r) => r === 0 || r === 1 ? r : Mn(i(r), e, s);
}
const En = (t) => (e) => e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2, Cn = (t) => (e) => 1 - t(1 - e), Pn = /* @__PURE__ */ ge(0.33, 1.53, 0.69, 0.99), lt = /* @__PURE__ */ Cn(Pn), Dn = /* @__PURE__ */ En(lt), Fn = (t) => (t *= 2) < 1 ? 0.5 * lt(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), ct = (t) => 1 - Math.sin(Math.acos(t)), vi = Cn(ct), Rn = En(ct), In = (t) => /^0[^.\s]+$/u.test(t);
function wi(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || In(t) : !0;
}
const se = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, he = {
  ...se,
  transform: (t) => Y(0, 1, t)
}, Se = {
  ...se,
  default: 1
}, ue = (t) => Math.round(t * 1e5) / 1e5, ut = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function Ti(t) {
  return t == null;
}
const bi = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, dt = (t, e) => (n) => !!(typeof n == "string" && bi.test(n) && n.startsWith(t) || e && !Ti(n) && Object.prototype.hasOwnProperty.call(n, e)), On = (t, e, n) => (s) => {
  if (typeof s != "string")
    return s;
  const [i, r, o, a] = s.match(ut);
  return {
    [t]: parseFloat(i),
    [e]: parseFloat(r),
    [n]: parseFloat(o),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, Si = (t) => Y(0, 255, t), Ke = {
  ...se,
  transform: (t) => Math.round(Si(t))
}, W = {
  test: /* @__PURE__ */ dt("rgb", "red"),
  parse: /* @__PURE__ */ On("red", "green", "blue"),
  transform: ({ red: t, green: e, blue: n, alpha: s = 1 }) => "rgba(" + Ke.transform(t) + ", " + Ke.transform(e) + ", " + Ke.transform(n) + ", " + ue(he.transform(s)) + ")"
};
function Vi(t) {
  let e = "", n = "", s = "", i = "";
  return t.length > 5 ? (e = t.substring(1, 3), n = t.substring(3, 5), s = t.substring(5, 7), i = t.substring(7, 9)) : (e = t.substring(1, 2), n = t.substring(2, 3), s = t.substring(3, 4), i = t.substring(4, 5), e += e, n += n, s += s, i += i), {
    red: parseInt(e, 16),
    green: parseInt(n, 16),
    blue: parseInt(s, 16),
    alpha: i ? parseInt(i, 16) / 255 : 1
  };
}
const Ye = {
  test: /* @__PURE__ */ dt("#"),
  parse: Vi,
  transform: W.transform
}, ye = (t) => ({
  test: (e) => typeof e == "string" && e.endsWith(t) && e.split(" ").length === 1,
  parse: parseFloat,
  transform: (e) => `${e}${t}`
}), _ = /* @__PURE__ */ ye("deg"), J = /* @__PURE__ */ ye("%"), p = /* @__PURE__ */ ye("px"), Ai = /* @__PURE__ */ ye("vh"), xi = /* @__PURE__ */ ye("vw"), Nt = {
  ...J,
  parse: (t) => J.parse(t) / 100,
  transform: (t) => J.transform(t * 100)
}, Z = {
  test: /* @__PURE__ */ dt("hsl", "hue"),
  parse: /* @__PURE__ */ On("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: e, lightness: n, alpha: s = 1 }) => "hsla(" + Math.round(t) + ", " + J.transform(ue(e)) + ", " + J.transform(ue(n)) + ", " + ue(he.transform(s)) + ")"
}, C = {
  test: (t) => W.test(t) || Ye.test(t) || Z.test(t),
  parse: (t) => W.test(t) ? W.parse(t) : Z.test(t) ? Z.parse(t) : Ye.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? W.transform(t) : Z.transform(t)
}, Mi = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function Ei(t) {
  var e, n;
  return isNaN(t) && typeof t == "string" && (((e = t.match(ut)) === null || e === void 0 ? void 0 : e.length) || 0) + (((n = t.match(Mi)) === null || n === void 0 ? void 0 : n.length) || 0) > 0;
}
const Ln = "number", kn = "color", Ci = "var", Pi = "var(", Kt = "${}", Di = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function me(t) {
  const e = t.toString(), n = [], s = {
    color: [],
    number: [],
    var: []
  }, i = [];
  let r = 0;
  const a = e.replace(Di, (l) => (C.test(l) ? (s.color.push(r), i.push(kn), n.push(C.parse(l))) : l.startsWith(Pi) ? (s.var.push(r), i.push(Ci), n.push(l)) : (s.number.push(r), i.push(Ln), n.push(parseFloat(l))), ++r, Kt)).split(Kt);
  return { values: n, split: a, indexes: s, types: i };
}
function Bn(t) {
  return me(t).values;
}
function Nn(t) {
  const { split: e, types: n } = me(t), s = e.length;
  return (i) => {
    let r = "";
    for (let o = 0; o < s; o++)
      if (r += e[o], i[o] !== void 0) {
        const a = n[o];
        a === Ln ? r += ue(i[o]) : a === kn ? r += C.transform(i[o]) : r += i[o];
      }
    return r;
  };
}
const Fi = (t) => typeof t == "number" ? 0 : t;
function Ri(t) {
  const e = Bn(t);
  return Nn(t)(e.map(Fi));
}
const ie = {
  test: Ei,
  parse: Bn,
  createTransformer: Nn,
  getAnimatableNone: Ri
}, Ii = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function Oi(t) {
  const [e, n] = t.slice(0, -1).split("(");
  if (e === "drop-shadow")
    return t;
  const [s] = n.match(ut) || [];
  if (!s)
    return t;
  const i = n.replace(s, "");
  let r = Ii.has(e) ? 1 : 0;
  return s !== n && (r *= 100), e + "(" + r + i + ")";
}
const Li = /\b([a-z-]*)\(.*?\)/gu, Xe = {
  ...ie,
  getAnimatableNone: (t) => {
    const e = t.match(Li);
    return e ? e.map(Oi).join(" ") : t;
  }
}, ki = {
  // Border props
  borderWidth: p,
  borderTopWidth: p,
  borderRightWidth: p,
  borderBottomWidth: p,
  borderLeftWidth: p,
  borderRadius: p,
  radius: p,
  borderTopLeftRadius: p,
  borderTopRightRadius: p,
  borderBottomRightRadius: p,
  borderBottomLeftRadius: p,
  // Positioning props
  width: p,
  maxWidth: p,
  height: p,
  maxHeight: p,
  top: p,
  right: p,
  bottom: p,
  left: p,
  // Spacing props
  padding: p,
  paddingTop: p,
  paddingRight: p,
  paddingBottom: p,
  paddingLeft: p,
  margin: p,
  marginTop: p,
  marginRight: p,
  marginBottom: p,
  marginLeft: p,
  // Misc
  backgroundPositionX: p,
  backgroundPositionY: p
}, Bi = {
  rotate: _,
  rotateX: _,
  rotateY: _,
  rotateZ: _,
  scale: Se,
  scaleX: Se,
  scaleY: Se,
  scaleZ: Se,
  skew: _,
  skewX: _,
  skewY: _,
  distance: p,
  translateX: p,
  translateY: p,
  translateZ: p,
  x: p,
  y: p,
  z: p,
  perspective: p,
  transformPerspective: p,
  opacity: he,
  originX: Nt,
  originY: Nt,
  originZ: p
}, _t = {
  ...se,
  transform: Math.round
}, ft = {
  ...ki,
  ...Bi,
  zIndex: _t,
  size: p,
  // SVG
  fillOpacity: he,
  strokeOpacity: he,
  numOctaves: _t
}, Ni = {
  ...ft,
  // Color props
  color: C,
  backgroundColor: C,
  outlineColor: C,
  fill: C,
  stroke: C,
  // Border props
  borderColor: C,
  borderTopColor: C,
  borderRightColor: C,
  borderBottomColor: C,
  borderLeftColor: C,
  filter: Xe,
  WebkitFilter: Xe
}, ht = (t) => Ni[t];
function Kn(t, e) {
  let n = ht(t);
  return n !== Xe && (n = ie), n.getAnimatableNone ? n.getAnimatableNone(e) : void 0;
}
const Ki = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function _i(t, e, n) {
  let s = 0, i;
  for (; s < t.length && !i; ) {
    const r = t[s];
    typeof r == "string" && !Ki.has(r) && me(r).values.length && (i = t[s]), s++;
  }
  if (i && n)
    for (const r of e)
      t[r] = Kn(n, i);
}
const qt = (t) => t === se || t === p, Ht = (t, e) => parseFloat(t.split(", ")[e]), Wt = (t, e) => (n, { transform: s }) => {
  if (s === "none" || !s)
    return 0;
  const i = s.match(/^matrix3d\((.+)\)$/u);
  if (i)
    return Ht(i[1], e);
  {
    const r = s.match(/^matrix\((.+)\)$/u);
    return r ? Ht(r[1], t) : 0;
  }
}, qi = /* @__PURE__ */ new Set(["x", "y", "z"]), Hi = te.filter((t) => !qi.has(t));
function Wi(t) {
  const e = [];
  return Hi.forEach((n) => {
    const s = t.getValue(n);
    s !== void 0 && (e.push([n, s.get()]), s.set(n.startsWith("scale") ? 1 : 0));
  }), e;
}
const ee = {
  // Dimensions
  width: ({ x: t }, { paddingLeft: e = "0", paddingRight: n = "0" }) => t.max - t.min - parseFloat(e) - parseFloat(n),
  height: ({ y: t }, { paddingTop: e = "0", paddingBottom: n = "0" }) => t.max - t.min - parseFloat(e) - parseFloat(n),
  top: (t, { top: e }) => parseFloat(e),
  left: (t, { left: e }) => parseFloat(e),
  bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
  right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
  // Transform
  x: Wt(4, 13),
  y: Wt(5, 14)
};
ee.translateX = ee.x;
ee.translateY = ee.y;
const $ = /* @__PURE__ */ new Set();
let Ze = !1, Qe = !1;
function _n() {
  if (Qe) {
    const t = Array.from($).filter((s) => s.needsMeasurement), e = new Set(t.map((s) => s.element)), n = /* @__PURE__ */ new Map();
    e.forEach((s) => {
      const i = Wi(s);
      i.length && (n.set(s, i), s.render());
    }), t.forEach((s) => s.measureInitialState()), e.forEach((s) => {
      s.render();
      const i = n.get(s);
      i && i.forEach(([r, o]) => {
        var a;
        (a = s.getValue(r)) === null || a === void 0 || a.set(o);
      });
    }), t.forEach((s) => s.measureEndState()), t.forEach((s) => {
      s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
    });
  }
  Qe = !1, Ze = !1, $.forEach((t) => t.complete()), $.clear();
}
function qn() {
  $.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (Qe = !0);
  });
}
function $i() {
  qn(), _n();
}
class mt {
  constructor(e, n, s, i, r, o = !1) {
    this.isComplete = !1, this.isAsync = !1, this.needsMeasurement = !1, this.isScheduled = !1, this.unresolvedKeyframes = [...e], this.onComplete = n, this.name = s, this.motionValue = i, this.element = r, this.isAsync = o;
  }
  scheduleResolve() {
    this.isScheduled = !0, this.isAsync ? ($.add(this), Ze || (Ze = !0, L.read(qn), L.resolveKeyframes(_n))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, name: n, element: s, motionValue: i } = this;
    for (let r = 0; r < e.length; r++)
      if (e[r] === null)
        if (r === 0) {
          const o = i == null ? void 0 : i.get(), a = e[e.length - 1];
          if (o !== void 0)
            e[0] = o;
          else if (s && n) {
            const l = s.readValue(n, a);
            l != null && (e[0] = l);
          }
          e[0] === void 0 && (e[0] = a), i && o === void 0 && i.set(e[0]);
        } else
          e[r] = e[r - 1];
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete() {
    this.isComplete = !0, this.onComplete(this.unresolvedKeyframes, this.finalKeyframe), $.delete(this);
  }
  cancel() {
    this.isComplete || (this.isScheduled = !1, $.delete(this));
  }
  resume() {
    this.isComplete || this.scheduleResolve();
  }
}
const Hn = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t), Wn = (t) => (e) => typeof e == "string" && e.startsWith(t), $n = /* @__PURE__ */ Wn("--"), Gi = /* @__PURE__ */ Wn("var(--"), pt = (t) => Gi(t) ? Ui.test(t.split("/*")[0].trim()) : !1, Ui = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, ji = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function zi(t) {
  const e = ji.exec(t);
  if (!e)
    return [,];
  const [, n, s, i] = e;
  return [`--${n ?? s}`, i];
}
function Gn(t, e, n = 1) {
  const [s, i] = zi(t);
  if (!s)
    return;
  const r = window.getComputedStyle(e).getPropertyValue(s);
  if (r) {
    const o = r.trim();
    return Hn(o) ? parseFloat(o) : o;
  }
  return pt(i) ? Gn(i, e, n + 1) : i;
}
const Un = (t) => (e) => e.test(t), Yi = {
  test: (t) => t === "auto",
  parse: (t) => t
}, jn = [se, p, J, _, xi, Ai, Yi], $t = (t) => jn.find(Un(t));
class zn extends mt {
  constructor(e, n, s, i, r) {
    super(e, n, s, i, r, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, element: n, name: s } = this;
    if (!n || !n.current)
      return;
    super.readKeyframes();
    for (let l = 0; l < e.length; l++) {
      let u = e[l];
      if (typeof u == "string" && (u = u.trim(), pt(u))) {
        const c = Gn(u, n.current);
        c !== void 0 && (e[l] = c), l === e.length - 1 && (this.finalKeyframe = u);
      }
    }
    if (this.resolveNoneKeyframes(), !bn.has(s) || e.length !== 2)
      return;
    const [i, r] = e, o = $t(i), a = $t(r);
    if (o !== a)
      if (qt(o) && qt(a))
        for (let l = 0; l < e.length; l++) {
          const u = e[l];
          typeof u == "string" && (e[l] = parseFloat(u));
        }
      else
        this.needsMeasurement = !0;
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: e, name: n } = this, s = [];
    for (let i = 0; i < e.length; i++)
      wi(e[i]) && s.push(i);
    s.length && _i(e, s, n);
  }
  measureInitialState() {
    const { element: e, unresolvedKeyframes: n, name: s } = this;
    if (!e || !e.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = ee[s](e.measureViewportBox(), window.getComputedStyle(e.current)), n[0] = this.measuredOrigin;
    const i = n[n.length - 1];
    i !== void 0 && e.getValue(s, i).jump(i, !1);
  }
  measureEndState() {
    var e;
    const { element: n, name: s, unresolvedKeyframes: i } = this;
    if (!n || !n.current)
      return;
    const r = n.getValue(s);
    r && r.jump(this.measuredOrigin, !1);
    const o = i.length - 1, a = i[o];
    i[o] = ee[s](n.measureViewportBox(), window.getComputedStyle(n.current)), a !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = a), !((e = this.removedTransforms) === null || e === void 0) && e.length && this.removedTransforms.forEach(([l, u]) => {
      n.getValue(l).set(u);
    }), this.resolveNoneKeyframes();
  }
}
const Gt = (t, e) => e === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(ie.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function Xi(t) {
  const e = t[0];
  if (t.length === 1)
    return !0;
  for (let n = 0; n < t.length; n++)
    if (t[n] !== e)
      return !0;
}
function Zi(t, e, n, s) {
  const i = t[0];
  if (i === null)
    return !1;
  if (e === "display" || e === "visibility")
    return !0;
  const r = t[t.length - 1], o = Gt(i, e), a = Gt(r, e);
  return !o || !a ? !1 : Xi(t) || (n === "spring" || Oe(n)) && s;
}
const Qi = (t) => t !== null;
function Le(t, { repeat: e, repeatType: n = "loop" }, s) {
  const i = t.filter(Qi), r = e && n !== "loop" && e % 2 === 1 ? 0 : i.length - 1;
  return !r || s === void 0 ? i[r] : s;
}
const Ji = 40;
class Yn {
  constructor({ autoplay: e = !0, delay: n = 0, type: s = "keyframes", repeat: i = 0, repeatDelay: r = 0, repeatType: o = "loop", ...a }) {
    this.isStopped = !1, this.hasAttemptedResolve = !1, this.createdAt = q.now(), this.options = {
      autoplay: e,
      delay: n,
      type: s,
      repeat: i,
      repeatDelay: r,
      repeatType: o,
      ...a
    }, this.updateFinishedPromise();
  }
  /**
   * This method uses the createdAt and resolvedAt to calculate the
   * animation startTime. *Ideally*, we would use the createdAt time as t=0
   * as the following frame would then be the first frame of the animation in
   * progress, which would feel snappier.
   *
   * However, if there's a delay (main thread work) between the creation of
   * the animation and the first commited frame, we prefer to use resolvedAt
   * to avoid a sudden jump into the animation.
   */
  calcStartTime() {
    return this.resolvedAt ? this.resolvedAt - this.createdAt > Ji ? this.resolvedAt : this.createdAt : this.createdAt;
  }
  /**
   * A getter for resolved data. If keyframes are not yet resolved, accessing
   * this.resolved will synchronously flush all pending keyframe resolvers.
   * This is a deoptimisation, but at its worst still batches read/writes.
   */
  get resolved() {
    return !this._resolved && !this.hasAttemptedResolve && $i(), this._resolved;
  }
  /**
   * A method to be called when the keyframes resolver completes. This method
   * will check if its possible to run the animation and, if not, skip it.
   * Otherwise, it will call initPlayback on the implementing class.
   */
  onKeyframesResolved(e, n) {
    this.resolvedAt = q.now(), this.hasAttemptedResolve = !0;
    const { name: s, type: i, velocity: r, delay: o, onComplete: a, onUpdate: l, isGenerator: u } = this.options;
    if (!u && !Zi(e, s, i, r))
      if (o)
        this.options.duration = 0;
      else {
        l && l(Le(e, this.options, n)), a && a(), this.resolveFinishedPromise();
        return;
      }
    const c = this.initPlayback(e, n);
    c !== !1 && (this._resolved = {
      keyframes: e,
      finalKeyframe: n,
      ...c
    }, this.onPostResolved());
  }
  onPostResolved() {
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(e, n) {
    return this.currentFinishedPromise.then(e, n);
  }
  flatten() {
    this.options.type = "keyframes", this.options.ease = "linear";
  }
  updateFinishedPromise() {
    this.currentFinishedPromise = new Promise((e) => {
      this.resolveFinishedPromise = e;
    });
  }
}
function _e(t, e, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
function er({ hue: t, saturation: e, lightness: n, alpha: s }) {
  t /= 360, e /= 100, n /= 100;
  let i = 0, r = 0, o = 0;
  if (!e)
    i = r = o = n;
  else {
    const a = n < 0.5 ? n * (1 + e) : n + e - n * e, l = 2 * n - a;
    i = _e(l, a, t + 1 / 3), r = _e(l, a, t), o = _e(l, a, t - 1 / 3);
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(r * 255),
    blue: Math.round(o * 255),
    alpha: s
  };
}
function De(t, e) {
  return (n) => n > 0 ? e : t;
}
const qe = (t, e, n) => {
  const s = t * t, i = n * (e * e - s) + s;
  return i < 0 ? 0 : Math.sqrt(i);
}, tr = [Ye, W, Z], nr = (t) => tr.find((e) => e.test(t));
function Ut(t) {
  const e = nr(t);
  if (!e)
    return !1;
  let n = e.parse(t);
  return e === Z && (n = er(n)), n;
}
const jt = (t, e) => {
  const n = Ut(t), s = Ut(e);
  if (!n || !s)
    return De(t, e);
  const i = { ...n };
  return (r) => (i.red = qe(n.red, s.red, r), i.green = qe(n.green, s.green, r), i.blue = qe(n.blue, s.blue, r), i.alpha = pe(n.alpha, s.alpha, r), W.transform(i));
}, sr = (t, e) => (n) => e(t(n)), gt = (...t) => t.reduce(sr), Je = /* @__PURE__ */ new Set(["none", "hidden"]);
function ir(t, e) {
  return Je.has(t) ? (n) => n <= 0 ? t : e : (n) => n >= 1 ? e : t;
}
function rr(t, e) {
  return (n) => pe(t, e, n);
}
function yt(t) {
  return typeof t == "number" ? rr : typeof t == "string" ? pt(t) ? De : C.test(t) ? jt : lr : Array.isArray(t) ? Xn : typeof t == "object" ? C.test(t) ? jt : or : De;
}
function Xn(t, e) {
  const n = [...t], s = n.length, i = t.map((r, o) => yt(r)(r, e[o]));
  return (r) => {
    for (let o = 0; o < s; o++)
      n[o] = i[o](r);
    return n;
  };
}
function or(t, e) {
  const n = { ...t, ...e }, s = {};
  for (const i in n)
    t[i] !== void 0 && e[i] !== void 0 && (s[i] = yt(t[i])(t[i], e[i]));
  return (i) => {
    for (const r in s)
      n[r] = s[r](i);
    return n;
  };
}
function ar(t, e) {
  var n;
  const s = [], i = { color: 0, var: 0, number: 0 };
  for (let r = 0; r < e.values.length; r++) {
    const o = e.types[r], a = t.indexes[o][i[o]], l = (n = t.values[a]) !== null && n !== void 0 ? n : 0;
    s[r] = l, i[o]++;
  }
  return s;
}
const lr = (t, e) => {
  const n = ie.createTransformer(e), s = me(t), i = me(e);
  return s.indexes.var.length === i.indexes.var.length && s.indexes.color.length === i.indexes.color.length && s.indexes.number.length >= i.indexes.number.length ? Je.has(t) && !i.values.length || Je.has(e) && !s.values.length ? ir(t, e) : gt(Xn(ar(s, i), i.values), n) : De(t, e);
};
function Zn(t, e, n) {
  return typeof t == "number" && typeof e == "number" && typeof n == "number" ? pe(t, e, n) : yt(t)(t, e);
}
function zt({ keyframes: t, velocity: e = 0, power: n = 0.8, timeConstant: s = 325, bounceDamping: i = 10, bounceStiffness: r = 500, modifyTarget: o, min: a, max: l, restDelta: u = 0.5, restSpeed: c }) {
  const d = t[0], f = {
    done: !1,
    value: d
  }, y = (b) => a !== void 0 && b < a || l !== void 0 && b > l, g = (b) => a === void 0 ? l : l === void 0 || Math.abs(a - b) < Math.abs(l - b) ? a : l;
  let T = n * e;
  const v = d + T, h = o === void 0 ? v : o(v);
  h !== v && (T = h - d);
  const w = (b) => -T * Math.exp(-b / s), A = (b) => h + w(b), x = (b) => {
    const V = w(b), D = A(b);
    f.done = Math.abs(V) <= u, f.value = f.done ? h : D;
  };
  let m, S;
  const E = (b) => {
    y(f.value) && (m = b, S = it({
      keyframes: [f.value, g(f.value)],
      velocity: hn(A, b, f.value),
      // TODO: This should be passing * 1000
      damping: i,
      stiffness: r,
      restDelta: u,
      restSpeed: c
    }));
  };
  return E(0), {
    calculatedDuration: null,
    next: (b) => {
      let V = !1;
      return !S && m === void 0 && (V = !0, x(b), E(b)), m !== void 0 && b >= m ? S.next(b - m) : (!V && x(b), f);
    }
  };
}
const cr = /* @__PURE__ */ ge(0.42, 0, 1, 1), ur = /* @__PURE__ */ ge(0, 0, 0.58, 1), Qn = /* @__PURE__ */ ge(0.42, 0, 0.58, 1), Yt = {
  linear: z,
  easeIn: cr,
  easeInOut: Qn,
  easeOut: ur,
  circIn: ct,
  circInOut: Rn,
  circOut: vi,
  backIn: lt,
  backInOut: Dn,
  backOut: Pn,
  anticipate: Fn
}, Xt = (t) => {
  if (at(t)) {
    Ge(t.length === 4);
    const [e, n, s, i] = t;
    return ge(e, n, s, i);
  } else if (typeof t == "string")
    return Ge(Yt[t] !== void 0), Yt[t];
  return t;
};
function dr(t, e, n) {
  const s = [], i = n || Zn, r = t.length - 1;
  for (let o = 0; o < r; o++) {
    let a = i(t[o], t[o + 1]);
    if (e) {
      const l = Array.isArray(e) ? e[o] || z : e;
      a = gt(l, a);
    }
    s.push(a);
  }
  return s;
}
function fr(t, e, { clamp: n = !0, ease: s, mixer: i } = {}) {
  const r = t.length;
  if (Ge(r === e.length), r === 1)
    return () => e[0];
  if (r === 2 && e[0] === e[1])
    return () => e[1];
  const o = t[0] === t[1];
  t[0] > t[r - 1] && (t = [...t].reverse(), e = [...e].reverse());
  const a = dr(e, s, i), l = a.length, u = (c) => {
    if (o && c < t[0])
      return e[0];
    let d = 0;
    if (l > 1)
      for (; d < t.length - 2 && !(c < t[d + 1]); d++)
        ;
    const f = /* @__PURE__ */ Ie(t[d], t[d + 1], c);
    return a[d](f);
  };
  return n ? (c) => u(Y(t[0], t[r - 1], c)) : u;
}
function hr(t, e) {
  return t.map((n) => n * e);
}
function mr(t, e) {
  return t.map(() => e || Qn).splice(0, t.length - 1);
}
function Fe({ duration: t = 300, keyframes: e, times: n, ease: s = "easeInOut" }) {
  const i = mn(s) ? s.map(Xt) : Xt(s), r = {
    done: !1,
    value: e[0]
  }, o = hr(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === e.length ? n : yn(e),
    t
  ), a = fr(o, e, {
    ease: Array.isArray(i) ? i : mr(e, i)
  });
  return {
    calculatedDuration: t,
    next: (l) => (r.value = a(l), r.done = l >= t, r)
  };
}
const pr = (t) => {
  const e = ({ timestamp: n }) => t(n);
  return {
    start: () => L.update(e, !0),
    stop: () => je(e),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => Ce.isProcessing ? Ce.timestamp : q.now()
  };
}, gr = {
  decay: zt,
  inertia: zt,
  tween: Fe,
  keyframes: Fe,
  spring: it
}, yr = (t) => t / 100;
class vt extends Yn {
  constructor(e) {
    super(e), this.holdTime = null, this.cancelTime = null, this.currentTime = 0, this.playbackSpeed = 1, this.pendingPlayState = "running", this.startTime = null, this.state = "idle", this.stop = () => {
      if (this.resolver.cancel(), this.isStopped = !0, this.state === "idle")
        return;
      this.teardown();
      const { onStop: l } = this.options;
      l && l();
    };
    const { name: n, motionValue: s, element: i, keyframes: r } = this.options, o = (i == null ? void 0 : i.KeyframeResolver) || mt, a = (l, u) => this.onKeyframesResolved(l, u);
    this.resolver = new o(r, a, n, s, i), this.resolver.scheduleResolve();
  }
  flatten() {
    super.flatten(), this._resolved && Object.assign(this._resolved, this.initPlayback(this._resolved.keyframes));
  }
  initPlayback(e) {
    const { type: n = "keyframes", repeat: s = 0, repeatDelay: i = 0, repeatType: r, velocity: o = 0 } = this.options, a = Oe(n) ? n : gr[n] || Fe;
    let l, u;
    a !== Fe && typeof e[0] != "number" && (l = gt(yr, Zn(e[0], e[1])), e = [0, 100]);
    const c = a({ ...this.options, keyframes: e });
    r === "mirror" && (u = a({
      ...this.options,
      keyframes: [...e].reverse(),
      velocity: -o
    })), c.calculatedDuration === null && (c.calculatedDuration = st(c));
    const { calculatedDuration: d } = c, f = d + i, y = f * (s + 1) - i;
    return {
      generator: c,
      mirroredGenerator: u,
      mapPercentToKeyframes: l,
      calculatedDuration: d,
      resolvedDuration: f,
      totalDuration: y
    };
  }
  onPostResolved() {
    const { autoplay: e = !0 } = this.options;
    this.play(), this.pendingPlayState === "paused" || !e ? this.pause() : this.state = this.pendingPlayState;
  }
  tick(e, n = !1) {
    const { resolved: s } = this;
    if (!s) {
      const { keyframes: b } = this.options;
      return { done: !0, value: b[b.length - 1] };
    }
    const { finalKeyframe: i, generator: r, mirroredGenerator: o, mapPercentToKeyframes: a, keyframes: l, calculatedDuration: u, totalDuration: c, resolvedDuration: d } = s;
    if (this.startTime === null)
      return r.next(0);
    const { delay: f, repeat: y, repeatType: g, repeatDelay: T, onUpdate: v } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - c / this.speed, this.startTime)), n ? this.currentTime = e : this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = Math.round(e - this.startTime) * this.speed;
    const h = this.currentTime - f * (this.speed >= 0 ? 1 : -1), w = this.speed >= 0 ? h < 0 : h > c;
    this.currentTime = Math.max(h, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = c);
    let A = this.currentTime, x = r;
    if (y) {
      const b = Math.min(this.currentTime, c) / d;
      let V = Math.floor(b), D = b % 1;
      !D && b >= 1 && (D = 1), D === 1 && V--, V = Math.min(V, y + 1), !!(V % 2) && (g === "reverse" ? (D = 1 - D, T && (D -= T / d)) : g === "mirror" && (x = o)), A = Y(0, 1, D) * d;
    }
    const m = w ? { done: !1, value: l[0] } : x.next(A);
    a && (m.value = a(m.value));
    let { done: S } = m;
    !w && u !== null && (S = this.speed >= 0 ? this.currentTime >= c : this.currentTime <= 0);
    const E = this.holdTime === null && (this.state === "finished" || this.state === "running" && S);
    return E && i !== void 0 && (m.value = Le(l, this.options, i)), v && v(m.value), E && this.finish(), m;
  }
  get duration() {
    const { resolved: e } = this;
    return e ? /* @__PURE__ */ N(e.calculatedDuration) : 0;
  }
  get time() {
    return /* @__PURE__ */ N(this.currentTime);
  }
  set time(e) {
    e = /* @__PURE__ */ B(e), this.currentTime = e, this.holdTime !== null || this.speed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.speed);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(e) {
    const n = this.playbackSpeed !== e;
    this.playbackSpeed = e, n && (this.time = /* @__PURE__ */ N(this.currentTime));
  }
  play() {
    if (this.resolver.isScheduled || this.resolver.resume(), !this._resolved) {
      this.pendingPlayState = "running";
      return;
    }
    if (this.isStopped)
      return;
    const { driver: e = pr, onPlay: n, startTime: s } = this.options;
    this.driver || (this.driver = e((r) => this.tick(r))), n && n();
    const i = this.driver.now();
    this.holdTime !== null ? this.startTime = i - this.holdTime : this.startTime ? this.state === "finished" && (this.startTime = i) : this.startTime = s ?? this.calcStartTime(), this.state === "finished" && this.updateFinishedPromise(), this.cancelTime = this.startTime, this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    var e;
    if (!this._resolved) {
      this.pendingPlayState = "paused";
      return;
    }
    this.state = "paused", this.holdTime = (e = this.currentTime) !== null && e !== void 0 ? e : 0;
  }
  complete() {
    this.state !== "running" && this.play(), this.pendingPlayState = this.state = "finished", this.holdTime = null;
  }
  finish() {
    this.teardown(), this.state = "finished";
    const { onComplete: e } = this.options;
    e && e();
  }
  cancel() {
    this.cancelTime !== null && this.tick(this.cancelTime), this.teardown(), this.updateFinishedPromise();
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.resolveFinishedPromise(), this.updateFinishedPromise(), this.startTime = this.cancelTime = null, this.resolver.cancel();
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(e) {
    return this.startTime = 0, this.tick(e, !0);
  }
}
const vr = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]);
function wr(t, e, n, { delay: s = 0, duration: i = 300, repeat: r = 0, repeatType: o = "loop", ease: a = "easeInOut", times: l } = {}) {
  const u = { [e]: n };
  l && (u.offset = l);
  const c = xn(a, i);
  return Array.isArray(c) && (u.easing = c), t.animate(u, {
    delay: s,
    duration: i,
    easing: Array.isArray(c) ? "linear" : c,
    fill: "both",
    iterations: r + 1,
    direction: o === "reverse" ? "alternate" : "normal"
  });
}
const Tr = /* @__PURE__ */ nt(() => Object.hasOwnProperty.call(Element.prototype, "animate")), Re = 10, br = 2e4;
function Sr(t) {
  return Oe(t.type) || t.type === "spring" || !An(t.ease);
}
function Vr(t, e) {
  const n = new vt({
    ...e,
    keyframes: t,
    repeat: 0,
    delay: 0,
    isGenerator: !0
  });
  let s = { done: !1, value: t[0] };
  const i = [];
  let r = 0;
  for (; !s.done && r < br; )
    s = n.sample(r), i.push(s.value), r += Re;
  return {
    times: void 0,
    keyframes: i,
    duration: r - Re,
    ease: "linear"
  };
}
const Jn = {
  anticipate: Fn,
  backInOut: Dn,
  circInOut: Rn
};
function Ar(t) {
  return t in Jn;
}
class Zt extends Yn {
  constructor(e) {
    super(e);
    const { name: n, motionValue: s, element: i, keyframes: r } = this.options;
    this.resolver = new zn(r, (o, a) => this.onKeyframesResolved(o, a), n, s, i), this.resolver.scheduleResolve();
  }
  initPlayback(e, n) {
    let { duration: s = 300, times: i, ease: r, type: o, motionValue: a, name: l, startTime: u } = this.options;
    if (!a.owner || !a.owner.current)
      return !1;
    if (typeof r == "string" && Pe() && Ar(r) && (r = Jn[r]), Sr(this.options)) {
      const { onComplete: d, onUpdate: f, motionValue: y, element: g, ...T } = this.options, v = Vr(e, T);
      e = v.keyframes, e.length === 1 && (e[1] = e[0]), s = v.duration, i = v.times, r = v.ease, o = "keyframes";
    }
    const c = wr(a.owner.current, l, e, { ...this.options, duration: s, times: i, ease: r });
    return c.startTime = u ?? this.calcStartTime(), this.pendingTimeline ? (Bt(c, this.pendingTimeline), this.pendingTimeline = void 0) : c.onfinish = () => {
      const { onComplete: d } = this.options;
      a.set(Le(e, this.options, n)), d && d(), this.cancel(), this.resolveFinishedPromise();
    }, {
      animation: c,
      duration: s,
      times: i,
      type: o,
      ease: r,
      keyframes: e
    };
  }
  get duration() {
    const { resolved: e } = this;
    if (!e)
      return 0;
    const { duration: n } = e;
    return /* @__PURE__ */ N(n);
  }
  get time() {
    const { resolved: e } = this;
    if (!e)
      return 0;
    const { animation: n } = e;
    return /* @__PURE__ */ N(n.currentTime || 0);
  }
  set time(e) {
    const { resolved: n } = this;
    if (!n)
      return;
    const { animation: s } = n;
    s.currentTime = /* @__PURE__ */ B(e);
  }
  get speed() {
    const { resolved: e } = this;
    if (!e)
      return 1;
    const { animation: n } = e;
    return n.playbackRate;
  }
  set speed(e) {
    const { resolved: n } = this;
    if (!n)
      return;
    const { animation: s } = n;
    s.playbackRate = e;
  }
  get state() {
    const { resolved: e } = this;
    if (!e)
      return "idle";
    const { animation: n } = e;
    return n.playState;
  }
  get startTime() {
    const { resolved: e } = this;
    if (!e)
      return null;
    const { animation: n } = e;
    return n.startTime;
  }
  /**
   * Replace the default DocumentTimeline with another AnimationTimeline.
   * Currently used for scroll animations.
   */
  attachTimeline(e) {
    if (!this._resolved)
      this.pendingTimeline = e;
    else {
      const { resolved: n } = this;
      if (!n)
        return z;
      const { animation: s } = n;
      Bt(s, e);
    }
    return z;
  }
  play() {
    if (this.isStopped)
      return;
    const { resolved: e } = this;
    if (!e)
      return;
    const { animation: n } = e;
    n.playState === "finished" && this.updateFinishedPromise(), n.play();
  }
  pause() {
    const { resolved: e } = this;
    if (!e)
      return;
    const { animation: n } = e;
    n.pause();
  }
  stop() {
    if (this.resolver.cancel(), this.isStopped = !0, this.state === "idle")
      return;
    this.resolveFinishedPromise(), this.updateFinishedPromise();
    const { resolved: e } = this;
    if (!e)
      return;
    const { animation: n, keyframes: s, duration: i, type: r, ease: o, times: a } = e;
    if (n.playState === "idle" || n.playState === "finished")
      return;
    if (this.time) {
      const { motionValue: u, onUpdate: c, onComplete: d, element: f, ...y } = this.options, g = new vt({
        ...y,
        keyframes: s,
        duration: i,
        type: r,
        ease: o,
        times: a,
        isGenerator: !0
      }), T = /* @__PURE__ */ B(this.time);
      u.setWithVelocity(g.sample(T - Re).value, g.sample(T).value, Re);
    }
    const { onStop: l } = this.options;
    l && l(), this.cancel();
  }
  complete() {
    const { resolved: e } = this;
    e && e.animation.finish();
  }
  cancel() {
    const { resolved: e } = this;
    e && e.animation.cancel();
  }
  static supports(e) {
    const { motionValue: n, name: s, repeatDelay: i, repeatType: r, damping: o, type: a } = e;
    if (!n || !n.owner || !(n.owner.current instanceof HTMLElement))
      return !1;
    const { onUpdate: l, transformTemplate: u } = n.owner.getProps();
    return Tr() && s && vr.has(s) && /**
     * If we're outputting values to onUpdate then we can't use WAAPI as there's
     * no way to read the value from WAAPI every frame.
     */
    !l && !u && !i && r !== "mirror" && o !== 0 && a !== "inertia";
  }
}
const xr = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, Mr = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), Er = {
  type: "keyframes",
  duration: 0.8
}, Cr = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, Pr = (t, { keyframes: e }) => e.length > 2 ? Er : ne.has(t) ? t.startsWith("scale") ? Mr(e[1]) : xr : Cr;
function Dr({ when: t, delay: e, delayChildren: n, staggerChildren: s, staggerDirection: i, repeat: r, repeatType: o, repeatDelay: a, from: l, elapsed: u, ...c }) {
  return !!Object.keys(c).length;
}
const es = (t, e, n, s = {}, i, r) => (o) => {
  const a = Tn(s, t) || {}, l = a.delay || s.delay || 0;
  let { elapsed: u = 0 } = s;
  u = u - /* @__PURE__ */ B(l);
  let c = {
    keyframes: Array.isArray(n) ? n : [null, n],
    ease: "easeOut",
    velocity: e.getVelocity(),
    ...a,
    delay: -u,
    onUpdate: (f) => {
      e.set(f), a.onUpdate && a.onUpdate(f);
    },
    onComplete: () => {
      o(), a.onComplete && a.onComplete();
    },
    name: t,
    motionValue: e,
    element: r ? void 0 : i
  };
  Dr(a) || (c = {
    ...c,
    ...Pr(t, c)
  }), c.duration && (c.duration = /* @__PURE__ */ B(c.duration)), c.repeatDelay && (c.repeatDelay = /* @__PURE__ */ B(c.repeatDelay)), c.from !== void 0 && (c.keyframes[0] = c.from);
  let d = !1;
  if ((c.type === !1 || c.duration === 0 && !c.repeatDelay) && (c.duration = 0, c.delay === 0 && (d = !0)), d && !r && e.get() !== void 0) {
    const f = Le(c.keyframes, a);
    if (f !== void 0)
      return L.update(() => {
        c.onUpdate(f), c.onComplete();
      }), new un([]);
  }
  return !r && Zt.supports(c) ? new Zt(c) : new vt(c);
};
function Fr({ protectedKeys: t, needsAnimating: e }, n) {
  const s = t.hasOwnProperty(n) && e[n] !== !0;
  return e[n] = !1, s;
}
function Rr(t, e, { delay: n = 0, transitionOverride: s, type: i } = {}) {
  var r;
  let { transition: o = t.getDefaultTransition(), transitionEnd: a, ...l } = e;
  s && (o = s);
  const u = [], c = i && t.animationState && t.animationState.getState()[i];
  for (const d in l) {
    const f = t.getValue(d, (r = t.latestValues[d]) !== null && r !== void 0 ? r : null), y = l[d];
    if (y === void 0 || c && Fr(c, d))
      continue;
    const g = {
      delay: n,
      ...Tn(o || {}, d)
    };
    let T = !1;
    if (window.MotionHandoffAnimation) {
      const h = fi(t);
      if (h) {
        const w = window.MotionHandoffAnimation(h, d, L);
        w !== null && (g.startTime = w, T = !0);
      }
    }
    ci(t, d), f.start(es(d, f, y, t.shouldReduceMotion && bn.has(d) ? { type: !1 } : g, t, T));
    const v = f.animation;
    v && u.push(v);
  }
  return a && Promise.all(u).then(() => {
    L.update(() => {
      a && ai(t, a);
    });
  }), u;
}
function Ir(t) {
  return t instanceof SVGElement && t.tagName !== "svg";
}
const Qt = () => ({ min: 0, max: 0 }), wt = () => ({
  x: Qt(),
  y: Qt()
}), Jt = {
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
}, et = {};
for (const t in Jt)
  et[t] = {
    isEnabled: (e) => Jt[t].some((n) => !!e[n])
  };
const Or = typeof window < "u", tt = { current: null }, ts = { current: !1 };
function Lr() {
  if (ts.current = !0, !!Or)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), e = () => tt.current = t.matches;
      t.addListener(e), e();
    } else
      tt.current = !1;
}
const kr = [...jn, C, ie], Br = (t) => kr.find(Un(t));
function Nr(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function Kr(t) {
  return typeof t == "string" || Array.isArray(t);
}
const _r = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], qr = ["initial", ..._r];
function ns(t) {
  return Nr(t.animate) || qr.some((e) => Kr(t[e]));
}
function Hr(t) {
  return !!(ns(t) || t.variants);
}
function Wr(t, e, n) {
  for (const s in e) {
    const i = e[s], r = n[s];
    if (P(i))
      t.addValue(s, i);
    else if (P(r))
      t.addValue(s, fe(i, { owner: t }));
    else if (r !== i)
      if (t.hasValue(s)) {
        const o = t.getValue(s);
        o.liveStyle === !0 ? o.jump(i) : o.hasAnimated || o.set(i);
      } else {
        const o = t.getStaticValue(s);
        t.addValue(s, fe(o !== void 0 ? o : i, { owner: t }));
      }
  }
  for (const s in n)
    e[s] === void 0 && t.removeValue(s);
  return e;
}
const en = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
class ss {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(e, n, s) {
    return {};
  }
  constructor({ parent: e, props: n, presenceContext: s, reducedMotionConfig: i, blockInitialAnimation: r, visualState: o }, a = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = mt, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const y = q.now();
      this.renderScheduledAt < y && (this.renderScheduledAt = y, L.render(this.render, !1, !0));
    };
    const { latestValues: l, renderState: u, onUpdate: c } = o;
    this.onUpdate = c, this.latestValues = l, this.baseTarget = { ...l }, this.initialValues = n.initial ? { ...l } : {}, this.renderState = u, this.parent = e, this.props = n, this.presenceContext = s, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = i, this.options = a, this.blockInitialAnimation = !!r, this.isControllingVariants = ns(n), this.isVariantNode = Hr(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
    const { willChange: d, ...f } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const y in f) {
      const g = f[y];
      l[y] !== void 0 && P(g) && g.set(l[y], !1);
    }
  }
  mount(e) {
    this.current = e, de.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((n, s) => this.bindToMotionValue(s, n)), ts.current || Lr(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : tt.current, this.parent && this.parent.children.add(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    this.projection && this.projection.unmount(), je(this.notifyUpdate), je(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent && this.parent.children.delete(this);
    for (const e in this.events)
      this.events[e].clear();
    for (const e in this.features) {
      const n = this.features[e];
      n && (n.unmount(), n.isMounted = !1);
    }
    this.current = null;
  }
  bindToMotionValue(e, n) {
    this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)();
    const s = ne.has(e);
    s && this.onBindTransform && this.onBindTransform();
    const i = n.on("change", (a) => {
      this.latestValues[e] = a, this.props.onUpdate && L.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0);
    }), r = n.on("renderRequest", this.scheduleRender);
    let o;
    window.MotionCheckAppearSync && (o = window.MotionCheckAppearSync(this, e, n)), this.valueSubscriptions.set(e, () => {
      i(), r(), o && o(), n.owner && n.stop();
    });
  }
  sortNodePosition(e) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== e.type ? 0 : this.sortInstanceNodePosition(this.current, e.current);
  }
  updateFeatures() {
    let e = "animation";
    for (e in et) {
      const n = et[e];
      if (!n)
        continue;
      const { isEnabled: s, Feature: i } = n;
      if (!this.features[e] && i && s(this.props) && (this.features[e] = new i(this)), this.features[e]) {
        const r = this.features[e];
        r.isMounted ? r.update() : (r.mount(), r.isMounted = !0);
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : wt();
  }
  getStaticValue(e) {
    return this.latestValues[e];
  }
  setStaticValue(e, n) {
    this.latestValues[e] = n;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(e, n) {
    (e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = e, this.prevPresenceContext = this.presenceContext, this.presenceContext = n;
    for (let s = 0; s < en.length; s++) {
      const i = en[s];
      this.propEventSubscriptions[i] && (this.propEventSubscriptions[i](), delete this.propEventSubscriptions[i]);
      const r = "on" + i, o = e[r];
      o && (this.propEventSubscriptions[i] = this.on(i, o));
    }
    this.prevMotionValues = Wr(this, this.scrapeMotionValuesFromProps(e, this.prevProps, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue(), this.onUpdate && this.onUpdate(this);
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(e) {
    return this.props.variants ? this.props.variants[e] : void 0;
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
  addVariantChild(e) {
    const n = this.getClosestVariantNode();
    if (n)
      return n.variantChildren && n.variantChildren.add(e), () => n.variantChildren.delete(e);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(e, n) {
    const s = this.values.get(e);
    n !== s && (s && this.removeValue(e), this.bindToMotionValue(e, n), this.values.set(e, n), this.latestValues[e] = n.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(e) {
    this.values.delete(e);
    const n = this.valueSubscriptions.get(e);
    n && (n(), this.valueSubscriptions.delete(e)), delete this.latestValues[e], this.removeValueFromRenderState(e, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(e) {
    return this.values.has(e);
  }
  getValue(e, n) {
    if (this.props.values && this.props.values[e])
      return this.props.values[e];
    let s = this.values.get(e);
    return s === void 0 && n !== void 0 && (s = fe(n === null ? void 0 : n, { owner: this }), this.addValue(e, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(e, n) {
    var s;
    let i = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : (s = this.getBaseTargetFromProps(this.props, e)) !== null && s !== void 0 ? s : this.readValueFromInstance(this.current, e, this.options);
    return i != null && (typeof i == "string" && (Hn(i) || In(i)) ? i = parseFloat(i) : !Br(i) && ie.test(n) && (i = Kn(e, n)), this.setBaseTarget(e, P(i) ? i.get() : i)), P(i) ? i.get() : i;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(e, n) {
    this.baseTarget[e] = n;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(e) {
    var n;
    const { initial: s } = this.props;
    let i;
    if (typeof s == "string" || typeof s == "object") {
      const o = Vn(this.props, s, (n = this.presenceContext) === null || n === void 0 ? void 0 : n.custom);
      o && (i = o[e]);
    }
    if (s && i !== void 0)
      return i;
    const r = this.getBaseTargetFromProps(this.props, e);
    return r !== void 0 && !P(r) ? r : this.initialValues[e] !== void 0 && i === void 0 ? void 0 : this.baseTarget[e];
  }
  on(e, n) {
    return this.events[e] || (this.events[e] = new Sn()), this.events[e].add(n);
  }
  notify(e, ...n) {
    this.events[e] && this.events[e].notify(...n);
  }
}
class is extends ss {
  constructor() {
    super(...arguments), this.KeyframeResolver = zn;
  }
  sortInstanceNodePosition(e, n) {
    return e.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(e, n) {
    return e.style ? e.style[n] : void 0;
  }
  removeValueFromRenderState(e, { vars: n, style: s }) {
    delete n[e], delete s[e];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: e } = this.props;
    P(e) && (this.childSubscription = e.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
}
const rs = (t, e) => e && typeof t == "number" ? e.transform(t) : t, $r = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Gr = te.length;
function Ur(t, e, n) {
  let s = "", i = !0;
  for (let r = 0; r < Gr; r++) {
    const o = te[r], a = t[o];
    if (a === void 0)
      continue;
    let l = !0;
    if (typeof a == "number" ? l = a === (o.startsWith("scale") ? 1 : 0) : l = parseFloat(a) === 0, !l || n) {
      const u = rs(a, ft[o]);
      if (!l) {
        i = !1;
        const c = $r[o] || o;
        s += `${c}(${u}) `;
      }
      n && (e[o] = u);
    }
  }
  return s = s.trim(), n ? s = n(e, i ? "" : s) : i && (s = "none"), s;
}
function os(t, e, n) {
  const { style: s, vars: i, transformOrigin: r } = t;
  let o = !1, a = !1;
  for (const l in e) {
    const u = e[l];
    if (ne.has(l)) {
      o = !0;
      continue;
    } else if ($n(l)) {
      i[l] = u;
      continue;
    } else {
      const c = rs(u, ft[l]);
      l.startsWith("origin") ? (a = !0, r[l] = c) : s[l] = c;
    }
  }
  if (e.transform || (o || n ? s.transform = Ur(e, t.transform, n) : s.transform && (s.transform = "none")), a) {
    const { originX: l = "50%", originY: u = "50%", originZ: c = 0 } = r;
    s.transformOrigin = `${l} ${u} ${c}`;
  }
}
const jr = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, zr = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function Yr(t, e, n = 1, s = 0, i = !0) {
  t.pathLength = 1;
  const r = i ? jr : zr;
  t[r.offset] = p.transform(-s);
  const o = p.transform(e), a = p.transform(n);
  t[r.array] = `${o} ${a}`;
}
function tn(t, e, n) {
  return typeof t == "string" ? t : p.transform(e + n * t);
}
function Xr(t, e, n) {
  const s = tn(e, t.x, t.width), i = tn(n, t.y, t.height);
  return `${s} ${i}`;
}
function Zr(t, {
  attrX: e,
  attrY: n,
  attrScale: s,
  originX: i,
  originY: r,
  pathLength: o,
  pathSpacing: a = 1,
  pathOffset: l = 0,
  // This is object creation, which we try to avoid per-frame.
  ...u
}, c, d) {
  if (os(t, u, d), c) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: f, style: y, dimensions: g } = t;
  f.transform && (g && (y.transform = f.transform), delete f.transform), g && (i !== void 0 || r !== void 0 || y.transform) && (y.transformOrigin = Xr(g, i !== void 0 ? i : 0.5, r !== void 0 ? r : 0.5)), e !== void 0 && (f.x = e), n !== void 0 && (f.y = n), s !== void 0 && (f.scale = s), o !== void 0 && Yr(f, o, a, l, !1);
}
const as = /* @__PURE__ */ new Set([
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
]), Qr = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function Jr(t, e) {
  try {
    e.dimensions = typeof t.getBBox == "function" ? t.getBBox() : t.getBoundingClientRect();
  } catch {
    e.dimensions = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
  }
}
function ls(t, { style: e, vars: n }, s, i) {
  Object.assign(t.style, e, i && i.getProjectionStyles(s));
  for (const r in n)
    t.style.setProperty(r, n[r]);
}
function eo(t, e, n, s) {
  ls(t, e, void 0, s);
  for (const i in e.attrs)
    t.setAttribute(as.has(i) ? i : ot(i), e.attrs[i]);
}
const to = {};
function no(t, { layout: e, layoutId: n }) {
  return ne.has(t) || t.startsWith("origin") || (e || n !== void 0) && (!!to[t] || t === "opacity");
}
function cs(t, e, n) {
  var s;
  const { style: i } = t, r = {};
  for (const o in i)
    (P(i[o]) || e.style && P(e.style[o]) || no(o, t) || ((s = n == null ? void 0 : n.getValue(o)) === null || s === void 0 ? void 0 : s.liveStyle) !== void 0) && (r[o] = i[o]);
  return r;
}
function so(t, e, n) {
  const s = cs(t, e, n);
  for (const i in t)
    if (P(t[i]) || P(e[i])) {
      const r = te.indexOf(i) !== -1 ? "attr" + i.charAt(0).toUpperCase() + i.substring(1) : i;
      s[r] = t[i];
    }
  return s;
}
class io extends is {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = wt, this.updateDimensions = () => {
      this.current && !this.renderState.dimensions && Jr(this.current, this.renderState);
    };
  }
  getBaseTargetFromProps(e, n) {
    return e[n];
  }
  readValueFromInstance(e, n) {
    if (ne.has(n)) {
      const s = ht(n);
      return s && s.default || 0;
    }
    return n = as.has(n) ? n : ot(n), e.getAttribute(n);
  }
  scrapeMotionValuesFromProps(e, n, s) {
    return so(e, n, s);
  }
  onBindTransform() {
    this.current && !this.renderState.dimensions && L.postRender(this.updateDimensions);
  }
  build(e, n, s) {
    Zr(e, n, this.isSVGTag, s.transformTemplate);
  }
  renderInstance(e, n, s, i) {
    eo(e, n, s, i);
  }
  mount(e) {
    this.isSVGTag = Qr(e.tagName), super.mount(e);
  }
}
function ro({ top: t, left: e, right: n, bottom: s }) {
  return {
    x: { min: e, max: n },
    y: { min: t, max: s }
  };
}
function oo(t, e) {
  if (!e)
    return t;
  const n = e({ x: t.left, y: t.top }), s = e({ x: t.right, y: t.bottom });
  return {
    top: n.y,
    left: n.x,
    bottom: s.y,
    right: s.x
  };
}
function ao(t, e) {
  return ro(oo(t.getBoundingClientRect(), e));
}
function lo(t) {
  return window.getComputedStyle(t);
}
class co extends is {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = ls;
  }
  readValueFromInstance(e, n) {
    if (ne.has(n)) {
      const s = ht(n);
      return s && s.default || 0;
    } else {
      const s = lo(e), i = ($n(n) ? s.getPropertyValue(n) : s[n]) || 0;
      return typeof i == "string" ? i.trim() : i;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: n }) {
    return ao(e, n);
  }
  build(e, n, s) {
    os(e, n, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, n, s) {
    return cs(e, n, s);
  }
}
function uo(t, e) {
  return t in e;
}
class fo extends ss {
  constructor() {
    super(...arguments), this.type = "object";
  }
  readValueFromInstance(e, n) {
    if (uo(n, e)) {
      const s = e[n];
      if (typeof s == "string" || typeof s == "number")
        return s;
    }
  }
  getBaseTargetFromProps() {
  }
  removeValueFromRenderState(e, n) {
    delete n.output[e];
  }
  measureInstanceViewportBox() {
    return wt();
  }
  build(e, n) {
    Object.assign(e.output, n);
  }
  renderInstance(e, { output: n }) {
    Object.assign(e, n);
  }
  sortInstanceNodePosition() {
    return 0;
  }
}
function ho(t) {
  const e = {
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
  }, n = Ir(t) ? new io(e) : new co(e);
  n.mount(t), de.set(t, n);
}
function mo(t) {
  const e = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  }, n = new fo(e);
  n.mount(t), de.set(t, n);
}
function po(t, e, n) {
  const s = P(t) ? t : fe(t);
  return s.start(es("", s, e, n)), s.animation;
}
function go(t, e) {
  return P(t) || typeof t == "number" || typeof t == "string" && !rt(e);
}
function us(t, e, n, s) {
  const i = [];
  if (go(t, e))
    i.push(po(t, rt(e) && e.default || e, n && (n.default || n)));
  else {
    const r = vn(t, e, s), o = r.length;
    for (let a = 0; a < o; a++) {
      const l = r[a], u = l instanceof Element ? ho : mo;
      de.has(l) || u(l);
      const c = de.get(l), d = { ...n };
      "delay" in d && typeof d.delay == "function" && (d.delay = d.delay(a, o)), i.push(...Rr(c, { ...e, transition: d }, {}));
    }
  }
  return i;
}
function yo(t, e, n) {
  const s = [];
  return Gs(t, e, n, { spring: it }).forEach(({ keyframes: r, transition: o }, a) => {
    s.push(...us(a, r, o));
  }), s;
}
function vo(t) {
  return Array.isArray(t) && t.some(Array.isArray);
}
function wo(t) {
  function e(n, s, i) {
    let r = [];
    return vo(n) ? r = yo(n, s, t) : r = us(n, s, i, t), new un(r);
  }
  return e;
}
const F = wo();
class To {
  /**
   * Creates a new PausableInterval instance
   * @param callback The function to call on each interval
   * @param interval The interval duration in milliseconds
   */
  constructor(e, n) {
    H(this, "callback");
    H(this, "interval");
    H(this, "isRunning");
    H(this, "timeoutId");
    H(this, "remaining");
    H(this, "startTime");
    this.callback = e, this.interval = n, this.isRunning = !1, this.timeoutId = null, this.remaining = n, this.startTime = null;
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
  setInterval(e) {
    const n = this.isRunning;
    n && this.pause(), this.interval = e, this.remaining = e, n && this.resume();
  }
}
var k;
class bo extends EventTarget {
  constructor(n) {
    super();
    Pt(this, k);
    Ne(this, k, n);
  }
  get value() {
    return le(this, k);
  }
  set value(n) {
    le(this, k) !== n && (Ne(this, k, n), this.dispatchEvent(new CustomEvent("change")));
  }
  effect(n) {
    return n(), this.addEventListener("change", n), () => this.removeEventListener("change", n);
  }
  valueOf() {
    return le(this, k);
  }
  toString() {
    return String(le(this, k));
  }
}
k = new WeakMap();
const So = (t) => new bo(t), ds = 3e3, Me = document.querySelector("#alerts");
if (!Me)
  throw new Error("Alert container not found");
const G = [], Q = So(!1);
Q.effect(xs(50, () => {
  G.toReversed().forEach(({ element: t, interval: e }, n) => {
    Q.value ? (e.setInterval(ds - n * 250), e.pause()) : e.resume();
    const s = 1 - n * 0.1, i = n === 0 ? 0 : -10 * n, r = G.slice(0, n), o = 5;
    F(t, {
      y: Q.value ? r.reduce((a, { element: l }) => a + l.offsetHeight + o, 0) * -1 : i,
      scale: Q.value ? 1 : s
    }, {
      ease: "easeOut",
      duration: 0.3
    });
  });
}));
function nn(t, e) {
  const n = G.length - 1, s = G.shift();
  if (!s)
    throw new Error("First alert not found");
  s.interval.stop();
  let i = -10 * (n + 1), r = n === 1 ? 1 : 1 - n * 0.1;
  e && (i += 10, r -= 0.1), F(s.element, {
    y: t === "top" ? i : "50%",
    scale: r,
    opacity: 0
  }, {
    duration: t === "top" ? 0.2 : 0.3,
    ease: "easeOut"
  }).then(() => {
    s.element.remove();
  });
}
function Vo(t, e) {
  G.length === 3 && nn("top", !0);
  const n = document.createElement("div");
  n.setAttribute("role", "alert"), n.classList.add("c-toast", "z-50"), n.style.opacity = "0%";
  const s = document.createElement("span");
  if (s.textContent = t, n.append(s), e) {
    const r = document.createElement("div");
    r.innerHTML = e, n.prepend(r);
  }
  n.addEventListener("mouseenter", () => Q.value = !0), n.addEventListener("mouseleave", () => Q.value = !1), Me == null || Me.append(n), F(n, {
    y: ["100%", 0],
    scale: 1,
    opacity: 1
  }, {
    ease: "easeOut",
    duration: 0.3
  }), G.toReversed().forEach(({ element: r }, o) => {
    const a = 1 - (o + 1) * 0.1, l = -10 * (o + 1);
    F(r, {
      y: l,
      scale: a
    }, { ease: "easeOut", duration: 0.3 });
  });
  const i = new To(() => nn("bottom", !1), ds);
  G.push({ element: n, interval: i }), i.start();
}
const Ao = 5e3;
async function xo(t) {
  const e = (n) => {
    var o;
    const s = (o = n.contentWindow) == null ? void 0 : o.document;
    if (!s)
      return !1;
    const i = s.body && s.body.children.length > 0, r = s.readyState === "complete";
    return i && r && s.body.children.length > 0;
  };
  await Promise.allSettled(
    t.map((n) => new Promise((s) => {
      const i = setInterval(() => {
        if (e(n))
          return clearInterval(i), s();
      }, 100);
      setTimeout(() => (clearInterval(i), s()), Ao);
    }))
  );
}
function He(t) {
  var s;
  const e = (s = t.contentWindow) == null ? void 0 : s.document;
  if (!e)
    throw new Error("iFrame was not fully loaded yet");
  t.style.height = "0px", t.offsetHeight;
  const n = Math.max(
    e.documentElement.scrollHeight,
    e.body.scrollHeight,
    e.documentElement.offsetHeight,
    e.body.offsetHeight,
    e.documentElement.clientHeight,
    e.body.clientHeight
  );
  t.style.height = `${n}px`;
}
function fs() {
  document.body.classList.add("js-loaded");
}
const Mo = async (t) => {
  if (await xo(t), t.forEach((e) => {
    He(e);
    const n = e.contentWindow;
    if (!n)
      return;
    new ResizeObserver(() => He(e)).observe(n.document.body), n.addEventListener("keydown", (i) => {
      i.key === "k" && (i.metaKey || i.ctrlKey) && window.dispatchEvent(new Event("styleguideOpenSearch"));
    });
  }), window.addEventListener("resize", () => {
    t.forEach((e) => He(e));
  }), window.location.hash) {
    const e = document.querySelector(window.location.hash);
    e && (await new Promise((n) => setTimeout(n, 200)), e.scrollIntoView());
  }
  fs();
}, We = "in2theme", Ve = {
  normal: "theme-normal",
  light: "theme-light",
  dark: "theme-dark"
}, Eo = (t) => {
  const e = window.matchMedia("(prefers-color-scheme: dark)");
  function n() {
    const o = localStorage.getItem(We);
    return o || localStorage.setItem(We, "normal"), o;
  }
  function s() {
    const o = n();
    let a = Ve[o];
    o === "normal" && e.matches && (a = Ve.dark);
    const l = (d) => {
      Object.values(Ve).forEach((f) => d.classList.remove(f)), d.classList.remove("dark");
    }, u = (d) => {
      d.classList.add(a), a === Ve.dark && d.classList.add("dark");
    };
    l(t), u(t);
    const c = document.querySelectorAll("iframe");
    c && c.forEach((d) => {
      l(d), u(d);
    }), l(document.body), u(document.body);
  }
  e.addEventListener("change", () => {
    n() === "normal" && s();
  }), s(), t.addEventListener("change", () => {
    const o = t.querySelector('input[name="theme"]:checked');
    if (!o)
      throw new Error("No selected theme found");
    const a = o.value;
    localStorage.setItem(We, a), s();
  });
  const i = n(), r = t.querySelector(`input[value="${i}"]`);
  if (!r)
    throw new Error("No current theme input found");
  r.checked = !0;
};
function Co() {
  const t = document.querySelector("header");
  if (!t)
    throw new Error("No header found");
  const e = () => t.getBoundingClientRect().height;
  document.documentElement.style.setProperty("--header-height", `${e()}px`), window.addEventListener("resize", () => {
    document.documentElement.style.setProperty("--header-height", `${e()}px`);
  });
}
function Po() {
  const t = document.querySelector("aside");
  if (!t)
    throw new Error("No aside menu found");
  t.addEventListener("scroll", () => {
    const n = t.scrollTop / (t.scrollHeight - t.clientHeight) * 100;
    sessionStorage.setItem("asideScrollPercentage", n.toString());
  });
  function e() {
    const n = sessionStorage.getItem("asideScrollPercentage");
    if (n) {
      const s = Number.parseFloat(n), i = (t.scrollHeight - t.clientHeight) * s / 100;
      t.scrollTop = i;
    }
  }
  window.addEventListener("resize", e), e();
}
Co();
Po();
const I = document.querySelector("#search-dialog");
if (!I)
  throw new Error("No search dialog found");
const U = document.querySelector(".search-backdrop");
if (!U)
  throw new Error("No search backdrop found");
const ke = document.querySelectorAll("[data-open-search]");
if (ke.length === 0)
  throw new Error("No open search buttons found");
const j = document.querySelector("#search-input");
if (!j)
  throw new Error("No search input found");
const hs = document.querySelector("#search-list");
if (!hs)
  throw new Error("No search list found");
const ms = document.querySelectorAll(".search-category__item--active");
if (!ms)
  throw new Error("No search results found");
const ps = document.querySelector("#search-no-results");
if (!ps)
  throw new Error("No search no results element found");
const gs = () => window.matchMedia("(max-width: 768px)").matches;
async function ys(t) {
  const e = t.target;
  if (!(e instanceof HTMLElement))
    throw new Error("Clicked element is not an HTMLElement");
  e.closest("dialog") !== null || await vs();
}
async function Tt() {
  const t = window.scrollY;
  I.showModal(), await new Promise((n) => setTimeout(n, 50)), window.scrollTo(0, t), setTimeout(() => window.scrollTo(0, t), 0), setTimeout(() => window.scrollTo(0, t), 50), U.style.display = "block", gs() ? (I.style.overflowY = "hidden", j.inert = !0, F(I, { opacity: [0, 1], y: [250, 0] }, { duration: 0.3, ease: "easeOut" }), await F(U, { opacity: [0, 1] }, { duration: 0.3, ease: "easeOut" }), I.style.overflowY = "auto", j.inert = !1) : (F(I, { opacity: [0, 1], scale: [0.98, 1] }, { duration: 0.3, ease: "easeOut" }), F(U, { opacity: [0, 1] }, { duration: 0.3, ease: "easeOut" })), ke.forEach((n) => n.ariaExpanded = "true"), j.ariaExpanded = "true", ws(), setTimeout(() => document.addEventListener("click", ys), 0);
}
async function vs() {
  if (!I.open)
    return;
  document.removeEventListener("click", ys), gs() ? (F(I, { opacity: 0, y: [0, 250] }, { duration: 0.3, ease: "easeOut" }), await F(U, { opacity: 0 }, { duration: 0.3, ease: "easeOut" })) : (F(I, { opacity: 0, scale: [1, 0.98] }, { duration: 0.3, ease: "easeOut" }), await F(U, { opacity: 0 }, { duration: 0.3, ease: "linear" }).then(() => U.style.display = "none")), ke.forEach((e) => e.ariaExpanded = "false"), j.ariaExpanded = "false", I.close();
}
function ws() {
  const t = j.value.toLowerCase().trim();
  let e = !1;
  ms.forEach((n) => {
    var r, o;
    let s;
    const i = ((r = n.getAttribute("data-search-keywords")) == null ? void 0 : r.split(",")) || [];
    if (i.length > 0)
      s = i.some((a) => a.toLowerCase().includes(t));
    else {
      const a = ((o = n.textContent) == null ? void 0 : o.toLowerCase()) ?? "";
      s = a == null ? void 0 : a.includes(t);
    }
    n.classList.toggle("search-category__item--active", s), s && (e = !0);
  }), hs.classList.toggle("hidden", !e), ps.classList.toggle("hidden", e);
}
j.addEventListener("input", ws);
ke.forEach((t) => t.addEventListener("click", Tt));
document.addEventListener("keydown", async (t) => {
  t.key === "k" && (t.metaKey || t.ctrlKey) && (t.preventDefault(), await Tt());
});
window.addEventListener("styleguideOpenSearch", Tt);
I.addEventListener("keydown", async (t) => {
  t.key === "Escape" && (t.preventDefault(), await vs());
});
const sn = Array.from(document.querySelectorAll(".preview-iframe"));
sn.length > 0 ? Mo(sn).catch(console.error) : fs();
const rn = document.querySelector(".theme-select");
rn && Eo(rn);
const $e = document.querySelectorAll("details:has(.code-highlight)");
$e.length > 0 && ($e.forEach((t) => {
  const e = t.querySelector(".code-highlight");
  if (!e)
    throw new Error("No code element found");
  const n = t.querySelector("summary");
  if (!n)
    throw new Error("No trigger button found");
  n.addEventListener("click", async () => {
    const { createShikiHighlighter: s, highlightCode: i } = await import("./code-BL-eL8V0.js");
    await s(), await i(e);
  });
}), setTimeout(() => {
  requestIdleCallback(async () => {
    const { createShikiHighlighter: t, highlightCode: e } = await import("./code-BL-eL8V0.js");
    await t(), $e.forEach((n) => {
      const s = n.querySelector(".code-highlight");
      if (!s)
        throw new Error("No code element found");
      e(s).catch(console.error);
    });
  });
}, 5e3));
const Ae = document.querySelectorAll("[data-code-audit-iframe]"), X = document.querySelector("#code-audit-dialog");
Ae.length > 0 && X && (async () => {
  const { createHtmlValidator: t, auditCode: e } = await import("./html-validator-yGwOYBKH.js");
  Ae.forEach((n) => n.addEventListener("click", async () => {
    Ae.forEach((i) => i.setAttribute("aria-expanded", "false")), n.setAttribute("disabled", "");
    const { isValid: s } = await e(n, X);
    s ? (n.classList.add("text-green-500", "!cursor-not-allowed"), Vo(
      "Scanned HTML, no issues found!",
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4 text-green-500/50"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clip-rule="evenodd" /></svg>'
    ), setTimeout(() => {
      n.classList.remove("text-green-500", "!cursor-not-allowed"), n.removeAttribute("disabled");
    }, 5e3)) : (n.setAttribute("aria-expanded", "true"), n.removeAttribute("disabled"), n.classList.add("text-red-500"), X.showModal());
  })), new MutationObserver(() => {
    const n = (s) => {
      const i = s.target;
      if (!(i instanceof Element))
        return;
      i.closest("dialog") !== null || X.close();
    };
    X.open ? document.addEventListener("click", n) : (document.removeEventListener("click", n), Ae.forEach((s) => {
      s.setAttribute("aria-expanded", "false"), setTimeout(() => s.classList.remove("text-red-500"), 2500);
    }));
  }).observe(X, { attributes: !0, attributeFilter: ["open"] }), setTimeout(() => {
    requestIdleCallback(t);
  }, 8e3);
})();
const on = document.querySelector("#icon-search-input"), an = document.querySelector("#icon-search-input-reset"), ln = document.querySelector("#icon-search-list");
on && ln && an && import("./icons-Cw71swAE.js").then(({ default: t }) => t(on, ln, an)).catch(console.error);
const Ts = "data-clipboard-value", cn = document.querySelectorAll(`button[${Ts}]`);
cn.length > 0 && import("./clipboard-CgHq56g5.js").then(({ default: t }) => t(cn, Ts)).catch(console.error);
export {
  F as a,
  Vo as r,
  it as s
};
