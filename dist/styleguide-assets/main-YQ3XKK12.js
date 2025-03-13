var Vs = Object.defineProperty;
var Et = (t) => {
  throw TypeError(t);
};
var xs = (t, e, n) => e in t ? Vs(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var H = (t, e, n) => xs(t, typeof e != "symbol" ? e + "" : e, n), Mt = (t, e, n) => e.has(t) || Et("Cannot " + n);
var le = (t, e, n) => (Mt(t, e, "read from private field"), n ? n.call(t) : e.get(t)), Ct = (t, e, n) => e.has(t) ? Et("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Ne = (t, e, n, s) => (Mt(t, e, "write to private field"), s ? s.call(t, n) : e.set(t, n), n);
function Es(t, e, n) {
  var s;
  if (t instanceof EventTarget)
    return [t];
  if (typeof t == "string") {
    let r = document;
    const i = (s = n == null ? void 0 : n[t]) !== null && s !== void 0 ? s : r.querySelectorAll(t);
    return i ? Array.from(i) : [];
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
const Ms = /* @__PURE__ */ nt(() => window.ScrollTimeline !== void 0);
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
    const s = this.animations.map((r) => {
      if (Ms() && r.attachTimeline)
        return r.attachTimeline(e);
      if (typeof n == "function")
        return n(r);
    });
    return () => {
      s.forEach((r, i) => {
        r && r(), this.animations[i].stop();
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
const B = /* @__NO_SIDE_EFFECTS__ */ (t) => t * 1e3, N = /* @__NO_SIDE_EFFECTS__ */ (t) => t / 1e3, Me = 2e4;
function st(t) {
  let e = 0;
  const n = 50;
  let s = t.next(e);
  for (; !s.done && e < Me; )
    e += n, s = t.next(e);
  return e >= Me ? 1 / 0 : e;
}
const dn = (t, e, n = 10) => {
  let s = "";
  const r = Math.max(Math.round(e / n), 2);
  for (let i = 0; i < r; i++)
    s += t(/* @__PURE__ */ Ie(0, r - 1, i)) + ", ";
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
const E = {
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
}, Pt = 1e-3;
function Ds({ duration: t = E.duration, bounce: e = E.bounce, velocity: n = E.velocity, mass: s = E.mass }) {
  let r, i, o = 1 - e;
  o = Y(E.minDamping, E.maxDamping, o), t = Y(E.minDuration, E.maxDuration, /* @__PURE__ */ N(t)), o < 1 ? (r = (u) => {
    const c = u * o, d = c * t, f = c - n, y = Ue(u, o), g = Math.exp(-d);
    return Pt - f / y * g;
  }, i = (u) => {
    const d = u * o * t, f = d * n + n, y = Math.pow(o, 2) * Math.pow(u, 2) * t, g = Math.exp(-d), b = Ue(Math.pow(u, 2), o);
    return (-r(u) + Pt > 0 ? -1 : 1) * ((f - y) * g) / b;
  }) : (r = (u) => {
    const c = Math.exp(-u * t), d = (u - n) * t + 1;
    return -1e-3 + c * d;
  }, i = (u) => {
    const c = Math.exp(-u * t), d = (n - u) * (t * t);
    return c * d;
  });
  const a = 5 / t, l = Rs(r, i, a);
  if (t = /* @__PURE__ */ B(t), isNaN(l))
    return {
      stiffness: E.stiffness,
      damping: E.damping,
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
  for (let r = 1; r < Fs; r++)
    s = s - t(s) / e(s);
  return s;
}
function Ue(t, e) {
  return t * Math.sqrt(1 - e * e);
}
const Is = ["duration", "bounce"], Os = ["stiffness", "damping", "mass"];
function Dt(t, e) {
  return e.some((n) => t[n] !== void 0);
}
function ks(t) {
  let e = {
    velocity: E.velocity,
    stiffness: E.stiffness,
    damping: E.damping,
    mass: E.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!Dt(t, Os) && Dt(t, Is))
    if (t.visualDuration) {
      const n = t.visualDuration, s = 2 * Math.PI / (n * 1.2), r = s * s, i = 2 * Y(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(r);
      e = {
        ...e,
        mass: E.mass,
        stiffness: r,
        damping: i
      };
    } else {
      const n = Ds(t);
      e = {
        ...e,
        ...n,
        mass: E.mass
      }, e.isResolvedFromDuration = !0;
    }
  return e;
}
function rt(t = E.visualDuration, e = E.bounce) {
  const n = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: e
  } : t;
  let { restSpeed: s, restDelta: r } = n;
  const i = n.keyframes[0], o = n.keyframes[n.keyframes.length - 1], a = { done: !1, value: i }, { stiffness: l, damping: u, mass: c, duration: d, velocity: f, isResolvedFromDuration: y } = ks({
    ...n,
    velocity: -/* @__PURE__ */ N(n.velocity || 0)
  }), g = f || 0, b = u / (2 * Math.sqrt(l * c)), v = o - i, h = /* @__PURE__ */ N(Math.sqrt(l / c)), w = Math.abs(v) < 5;
  s || (s = w ? E.restSpeed.granular : E.restSpeed.default), r || (r = w ? E.restDelta.granular : E.restDelta.default);
  let V;
  if (b < 1) {
    const m = Ue(h, b);
    V = (S) => {
      const M = Math.exp(-b * h * S);
      return o - M * ((g + b * h * v) / m * Math.sin(m * S) + v * Math.cos(m * S));
    };
  } else if (b === 1)
    V = (m) => o - Math.exp(-h * m) * (v + (g + h * v) * m);
  else {
    const m = h * Math.sqrt(b * b - 1);
    V = (S) => {
      const M = Math.exp(-b * h * S), T = Math.min(m * S, 300);
      return o - M * ((g + b * h * v) * Math.sinh(T) + m * v * Math.cosh(T)) / m;
    };
  }
  const x = {
    calculatedDuration: y && d || null,
    next: (m) => {
      const S = V(m);
      if (y)
        a.done = m >= d;
      else {
        let M = 0;
        b < 1 && (M = m === 0 ? /* @__PURE__ */ B(g) : hn(V, m, S));
        const T = Math.abs(M) <= s, A = Math.abs(o - S) <= r;
        a.done = T && A;
      }
      return a.value = a.done ? o : S, a;
    },
    toString: () => {
      const m = Math.min(st(x), Me), S = dn((M) => x.next(m * M).value, m, 30);
      return m + "ms " + S;
    }
  };
  return x;
}
function Ls(t, e = 100, n) {
  const s = n({ ...t, keyframes: [0, e] }), r = Math.min(st(s), Me);
  return {
    type: "keyframes",
    ease: (i) => s.next(r * i).value / e,
    duration: /* @__PURE__ */ N(r)
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
    const r = /* @__PURE__ */ Ie(0, e, s);
    t.push(pe(n, 1, r));
  }
}
function yn(t) {
  const e = [0];
  return gn(e, t.length - 1), e;
}
const P = (t) => !!(t && t.getVelocity);
function it(t) {
  return typeof t == "object" && !Array.isArray(t);
}
function vn(t, e, n, s) {
  return typeof t == "string" && it(e) ? Es(t, n, s) : t instanceof NodeList ? Array.from(t) : Array.isArray(t) ? t : [t];
}
function Ns(t, e, n) {
  return t * (e + 1);
}
function Ft(t, e, n, s) {
  var r;
  return typeof e == "number" ? e : e.startsWith("-") || e.startsWith("+") ? Math.max(0, t + parseFloat(e)) : e === "<" ? n : (r = s.get(e)) !== null && r !== void 0 ? r : t;
}
function Ks(t, e) {
  t.indexOf(e) === -1 && t.push(e);
}
function wn(t, e) {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}
function qs(t, e, n) {
  for (let s = 0; s < t.length; s++) {
    const r = t[s];
    r.at > e && r.at < n && (wn(t, r), s--);
  }
}
function _s(t, e, n, s, r, i) {
  qs(t, r, i);
  for (let o = 0; o < e.length; o++)
    t.push({
      value: e[o],
      at: pe(r, i, s[o]),
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
function Gs(t, { defaultTransition: e = {}, ...n } = {}, s, r) {
  const i = e.duration || 0.3, o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), l = {}, u = /* @__PURE__ */ new Map();
  let c = 0, d = 0, f = 0;
  for (let y = 0; y < t.length; y++) {
    const g = t[y];
    if (typeof g == "string") {
      u.set(g, d);
      continue;
    } else if (!Array.isArray(g)) {
      u.set(g.name, Ft(d, g.at, c, u));
      continue;
    }
    let [b, v, h = {}] = g;
    h.at !== void 0 && (d = Ft(d, h.at, c, u));
    let w = 0;
    const V = (x, m, S, M = 0, T = 0) => {
      const A = Us(x), { delay: F = 0, times: O = yn(A), type: Be = "keyframes", repeat: ve, repeatType: Lo, repeatDelay: Bo = 0, ...As } = m;
      let { ease: K = e.ease || "easeOut", duration: R } = m;
      const bt = typeof F == "function" ? F(M, T) : F, Tt = A.length, St = Oe(Be) ? Be : r == null ? void 0 : r[Be];
      if (Tt <= 2 && St) {
        let ie = 100;
        if (Tt === 2 && Ys(A)) {
          const oe = A[1] - A[0];
          ie = Math.abs(oe);
        }
        const we = { ...As };
        R !== void 0 && (we.duration = /* @__PURE__ */ B(R));
        const be = Ls(we, ie, St);
        K = be.ease, R = be.duration;
      }
      R ?? (R = i);
      const At = d + bt;
      O.length === 1 && O[0] === 0 && (O[1] = 1);
      const Vt = O.length - A.length;
      if (Vt > 0 && gn(O, Vt), A.length === 1 && A.unshift(null), ve) {
        R = Ns(R, ve);
        const ie = [...A], we = [...O];
        K = Array.isArray(K) ? [...K] : [K];
        const be = [...K];
        for (let oe = 0; oe < ve; oe++) {
          A.push(...ie);
          for (let ae = 0; ae < ie.length; ae++)
            O.push(we[ae] + (oe + 1)), K.push(ae === 0 ? "linear" : pn(be, ae - 1));
        }
        Hs(O, ve);
      }
      const xt = At + R;
      _s(S, A, K, O, At, xt), w = Math.max(bt + R, w), f = Math.max(xt, f);
    };
    if (P(b)) {
      const x = Rt(b, a);
      V(v, h, It("default", x));
    } else {
      const x = vn(b, v, s, l), m = x.length;
      for (let S = 0; S < m; S++) {
        v = v, h = h;
        const M = x[S], T = Rt(M, a);
        for (const A in v)
          V(v[A], js(h, A), It(A, T), S, m);
      }
    }
    c = d, d += w;
  }
  return a.forEach((y, g) => {
    for (const b in y) {
      const v = y[b];
      v.sort(Ws);
      const h = [], w = [], V = [];
      for (let m = 0; m < v.length; m++) {
        const { at: S, value: M, easing: T } = v[m];
        h.push(M), w.push(/* @__PURE__ */ Ie(0, f, S)), V.push(T || "easeOut");
      }
      w[0] !== 0 && (w.unshift(0), h.unshift(h[0]), V.unshift($s)), w[w.length - 1] !== 1 && (w.push(1), h.push(null)), o.has(g) || o.set(g, {
        keyframes: {},
        transition: {}
      });
      const x = o.get(g);
      x.keyframes[b] = h, x.transition[b] = {
        ...e,
        duration: f,
        ease: V,
        times: w,
        ...n
      };
    }
  }), o;
}
function Rt(t, e) {
  return !e.has(t) && e.set(t, {}), e.get(t);
}
function It(t, e) {
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
function bn(t, e) {
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
], ne = new Set(te), Tn = /* @__PURE__ */ new Set([
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
}, Te = [
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
  let n = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), r = !1, i = !1;
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
      const g = f && r ? n : s;
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
      if (a = c, r) {
        i = !0;
        return;
      }
      r = !0, [n, s] = [s, n], n.forEach(l), n.clear(), r = !1, i && (i = !1, u.process(c));
    }
  };
  return u;
}
const er = 40;
function tr(t, e) {
  let n = !1, s = !0;
  const r = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, i = () => n = !0, o = Te.reduce((h, w) => (h[w] = Js(i), h), {}), { read: a, resolveKeyframes: l, update: u, preRender: c, render: d, postRender: f } = o, y = () => {
    const h = performance.now();
    n = !1, r.delta = s ? 1e3 / 60 : Math.max(Math.min(h - r.timestamp, er), 1), r.timestamp = h, r.isProcessing = !0, a.process(r), l.process(r), u.process(r), c.process(r), d.process(r), f.process(r), r.isProcessing = !1, n && e && (s = !1, t(y));
  }, g = () => {
    n = !0, s = !0, r.isProcessing || t(y);
  };
  return { schedule: Te.reduce((h, w) => {
    const V = o[w];
    return h[w] = (x, m = !1, S = !1) => (n || g(), V.schedule(x, m, S)), h;
  }, {}), cancel: (h) => {
    for (let w = 0; w < Te.length; w++)
      o[Te[w]].cancel(h);
  }, state: r, steps: o };
}
const { schedule: k, cancel: je, state: Ce, steps: Ko } = tr(typeof requestAnimationFrame < "u" ? requestAnimationFrame : z, !0);
let xe;
function nr() {
  xe = void 0;
}
const _ = {
  now: () => (xe === void 0 && _.set(Ce.isProcessing || Qs.useManualTiming ? Ce.timestamp : performance.now()), xe),
  set: (t) => {
    xe = t, queueMicrotask(nr);
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
    const r = this.subscriptions.length;
    if (r)
      if (r === 1)
        this.subscriptions[0](e, n, s);
      else
        for (let i = 0; i < r; i++) {
          const o = this.subscriptions[i];
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
const Ot = 30, sr = (t) => !isNaN(parseFloat(t));
class rr {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   *
   * @internal
   */
  constructor(e, n = {}) {
    this.version = "12.4.7", this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s, r = !0) => {
      const i = _.now();
      this.updatedAt !== i && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && this.events.change && this.events.change.notify(this.current), r && this.events.renderRequest && this.events.renderRequest.notify(this.current);
    }, this.hasAnimated = !1, this.setCurrent(e), this.owner = n.owner;
  }
  setCurrent(e) {
    this.current = e, this.updatedAt = _.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = sr(this.current));
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
      s(), k.read(() => {
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
    const e = _.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > Ot)
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, Ot);
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
  return new rr(t, e);
}
function kt(t) {
  const e = [{}, {}];
  return t == null || t.values.forEach((n, s) => {
    e[0][s] = n.get(), e[1][s] = n.getVelocity();
  }), e;
}
function An(t, e, n, s) {
  if (typeof e == "function") {
    const [r, i] = kt(s);
    e = e(n !== void 0 ? n : t.custom, r, i);
  }
  if (typeof e == "string" && (e = t.variants && t.variants[e]), typeof e == "function") {
    const [r, i] = kt(s);
    e = e(n !== void 0 ? n : t.custom, r, i);
  }
  return e;
}
function ir(t, e, n) {
  const s = t.getProps();
  return An(s, e, s.custom, t);
}
function or(t, e, n) {
  t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, fe(n));
}
function ar(t, e) {
  const n = ir(t, e);
  let { transitionEnd: s = {}, transition: r = {}, ...i } = n || {};
  i = { ...i, ...s };
  for (const o in i) {
    const a = Zs(i[o]);
    or(t, o, a);
  }
}
function lr(t) {
  return !!(P(t) && t.add);
}
function cr(t, e) {
  const n = t.getValue("willChange");
  if (lr(n))
    return n.add(e);
}
const ot = (t) => t.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), ur = "framerAppearId", dr = "data-" + ot(ur);
function fr(t) {
  return t.props[dr];
}
function Lt(t, e) {
  t.timeline = e, t.onfinish = null;
}
const at = (t) => Array.isArray(t) && typeof t[0] == "number", hr = {
  linearEasing: void 0
};
function mr(t, e) {
  const n = /* @__PURE__ */ nt(t);
  return () => {
    var s;
    return (s = hr[e]) !== null && s !== void 0 ? s : n();
  };
}
const Pe = /* @__PURE__ */ mr(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing");
function Vn(t) {
  return !!(typeof t == "function" && Pe() || !t || typeof t == "string" && (t in ze || Pe()) || at(t) || Array.isArray(t) && t.every(Vn));
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
const En = (t, e, n) => (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t, pr = 1e-7, gr = 12;
function yr(t, e, n, s, r) {
  let i, o, a = 0;
  do
    o = e + (n - e) / 2, i = En(o, s, r) - t, i > 0 ? n = o : e = o;
  while (Math.abs(i) > pr && ++a < gr);
  return o;
}
function ge(t, e, n, s) {
  if (t === e && n === s)
    return z;
  const r = (i) => yr(i, 0, 1, t, n);
  return (i) => i === 0 || i === 1 ? i : En(r(i), e, s);
}
const Mn = (t) => (e) => e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2, Cn = (t) => (e) => 1 - t(1 - e), Pn = /* @__PURE__ */ ge(0.33, 1.53, 0.69, 0.99), lt = /* @__PURE__ */ Cn(Pn), Dn = /* @__PURE__ */ Mn(lt), Fn = (t) => (t *= 2) < 1 ? 0.5 * lt(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), ct = (t) => 1 - Math.sin(Math.acos(t)), vr = Cn(ct), Rn = Mn(ct), In = (t) => /^0[^.\s]+$/u.test(t);
function wr(t) {
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
function br(t) {
  return t == null;
}
const Tr = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, dt = (t, e) => (n) => !!(typeof n == "string" && Tr.test(n) && n.startsWith(t) || e && !br(n) && Object.prototype.hasOwnProperty.call(n, e)), On = (t, e, n) => (s) => {
  if (typeof s != "string")
    return s;
  const [r, i, o, a] = s.match(ut);
  return {
    [t]: parseFloat(r),
    [e]: parseFloat(i),
    [n]: parseFloat(o),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, Sr = (t) => Y(0, 255, t), Ke = {
  ...se,
  transform: (t) => Math.round(Sr(t))
}, W = {
  test: /* @__PURE__ */ dt("rgb", "red"),
  parse: /* @__PURE__ */ On("red", "green", "blue"),
  transform: ({ red: t, green: e, blue: n, alpha: s = 1 }) => "rgba(" + Ke.transform(t) + ", " + Ke.transform(e) + ", " + Ke.transform(n) + ", " + ue(he.transform(s)) + ")"
};
function Ar(t) {
  let e = "", n = "", s = "", r = "";
  return t.length > 5 ? (e = t.substring(1, 3), n = t.substring(3, 5), s = t.substring(5, 7), r = t.substring(7, 9)) : (e = t.substring(1, 2), n = t.substring(2, 3), s = t.substring(3, 4), r = t.substring(4, 5), e += e, n += n, s += s, r += r), {
    red: parseInt(e, 16),
    green: parseInt(n, 16),
    blue: parseInt(s, 16),
    alpha: r ? parseInt(r, 16) / 255 : 1
  };
}
const Ye = {
  test: /* @__PURE__ */ dt("#"),
  parse: Ar,
  transform: W.transform
}, ye = (t) => ({
  test: (e) => typeof e == "string" && e.endsWith(t) && e.split(" ").length === 1,
  parse: parseFloat,
  transform: (e) => `${e}${t}`
}), q = /* @__PURE__ */ ye("deg"), J = /* @__PURE__ */ ye("%"), p = /* @__PURE__ */ ye("px"), Vr = /* @__PURE__ */ ye("vh"), xr = /* @__PURE__ */ ye("vw"), Bt = {
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
}, Er = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function Mr(t) {
  var e, n;
  return isNaN(t) && typeof t == "string" && (((e = t.match(ut)) === null || e === void 0 ? void 0 : e.length) || 0) + (((n = t.match(Er)) === null || n === void 0 ? void 0 : n.length) || 0) > 0;
}
const kn = "number", Ln = "color", Cr = "var", Pr = "var(", Nt = "${}", Dr = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function me(t) {
  const e = t.toString(), n = [], s = {
    color: [],
    number: [],
    var: []
  }, r = [];
  let i = 0;
  const a = e.replace(Dr, (l) => (C.test(l) ? (s.color.push(i), r.push(Ln), n.push(C.parse(l))) : l.startsWith(Pr) ? (s.var.push(i), r.push(Cr), n.push(l)) : (s.number.push(i), r.push(kn), n.push(parseFloat(l))), ++i, Nt)).split(Nt);
  return { values: n, split: a, indexes: s, types: r };
}
function Bn(t) {
  return me(t).values;
}
function Nn(t) {
  const { split: e, types: n } = me(t), s = e.length;
  return (r) => {
    let i = "";
    for (let o = 0; o < s; o++)
      if (i += e[o], r[o] !== void 0) {
        const a = n[o];
        a === kn ? i += ue(r[o]) : a === Ln ? i += C.transform(r[o]) : i += r[o];
      }
    return i;
  };
}
const Fr = (t) => typeof t == "number" ? 0 : t;
function Rr(t) {
  const e = Bn(t);
  return Nn(t)(e.map(Fr));
}
const re = {
  test: Mr,
  parse: Bn,
  createTransformer: Nn,
  getAnimatableNone: Rr
}, Ir = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function Or(t) {
  const [e, n] = t.slice(0, -1).split("(");
  if (e === "drop-shadow")
    return t;
  const [s] = n.match(ut) || [];
  if (!s)
    return t;
  const r = n.replace(s, "");
  let i = Ir.has(e) ? 1 : 0;
  return s !== n && (i *= 100), e + "(" + i + r + ")";
}
const kr = /\b([a-z-]*)\(.*?\)/gu, Xe = {
  ...re,
  getAnimatableNone: (t) => {
    const e = t.match(kr);
    return e ? e.map(Or).join(" ") : t;
  }
}, Lr = {
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
}, Br = {
  rotate: q,
  rotateX: q,
  rotateY: q,
  rotateZ: q,
  scale: Se,
  scaleX: Se,
  scaleY: Se,
  scaleZ: Se,
  skew: q,
  skewX: q,
  skewY: q,
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
  originX: Bt,
  originY: Bt,
  originZ: p
}, Kt = {
  ...se,
  transform: Math.round
}, ft = {
  ...Lr,
  ...Br,
  zIndex: Kt,
  size: p,
  // SVG
  fillOpacity: he,
  strokeOpacity: he,
  numOctaves: Kt
}, Nr = {
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
}, ht = (t) => Nr[t];
function Kn(t, e) {
  let n = ht(t);
  return n !== Xe && (n = re), n.getAnimatableNone ? n.getAnimatableNone(e) : void 0;
}
const Kr = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function qr(t, e, n) {
  let s = 0, r;
  for (; s < t.length && !r; ) {
    const i = t[s];
    typeof i == "string" && !Kr.has(i) && me(i).values.length && (r = t[s]), s++;
  }
  if (r && n)
    for (const i of e)
      t[i] = Kn(n, r);
}
const qt = (t) => t === se || t === p, _t = (t, e) => parseFloat(t.split(", ")[e]), Ht = (t, e) => (n, { transform: s }) => {
  if (s === "none" || !s)
    return 0;
  const r = s.match(/^matrix3d\((.+)\)$/u);
  if (r)
    return _t(r[1], e);
  {
    const i = s.match(/^matrix\((.+)\)$/u);
    return i ? _t(i[1], t) : 0;
  }
}, _r = /* @__PURE__ */ new Set(["x", "y", "z"]), Hr = te.filter((t) => !_r.has(t));
function Wr(t) {
  const e = [];
  return Hr.forEach((n) => {
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
  x: Ht(4, 13),
  y: Ht(5, 14)
};
ee.translateX = ee.x;
ee.translateY = ee.y;
const $ = /* @__PURE__ */ new Set();
let Ze = !1, Qe = !1;
function qn() {
  if (Qe) {
    const t = Array.from($).filter((s) => s.needsMeasurement), e = new Set(t.map((s) => s.element)), n = /* @__PURE__ */ new Map();
    e.forEach((s) => {
      const r = Wr(s);
      r.length && (n.set(s, r), s.render());
    }), t.forEach((s) => s.measureInitialState()), e.forEach((s) => {
      s.render();
      const r = n.get(s);
      r && r.forEach(([i, o]) => {
        var a;
        (a = s.getValue(i)) === null || a === void 0 || a.set(o);
      });
    }), t.forEach((s) => s.measureEndState()), t.forEach((s) => {
      s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
    });
  }
  Qe = !1, Ze = !1, $.forEach((t) => t.complete()), $.clear();
}
function _n() {
  $.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (Qe = !0);
  });
}
function $r() {
  _n(), qn();
}
class mt {
  constructor(e, n, s, r, i, o = !1) {
    this.isComplete = !1, this.isAsync = !1, this.needsMeasurement = !1, this.isScheduled = !1, this.unresolvedKeyframes = [...e], this.onComplete = n, this.name = s, this.motionValue = r, this.element = i, this.isAsync = o;
  }
  scheduleResolve() {
    this.isScheduled = !0, this.isAsync ? ($.add(this), Ze || (Ze = !0, k.read(_n), k.resolveKeyframes(qn))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, name: n, element: s, motionValue: r } = this;
    for (let i = 0; i < e.length; i++)
      if (e[i] === null)
        if (i === 0) {
          const o = r == null ? void 0 : r.get(), a = e[e.length - 1];
          if (o !== void 0)
            e[0] = o;
          else if (s && n) {
            const l = s.readValue(n, a);
            l != null && (e[0] = l);
          }
          e[0] === void 0 && (e[0] = a), r && o === void 0 && r.set(e[0]);
        } else
          e[i] = e[i - 1];
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
const Hn = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t), Wn = (t) => (e) => typeof e == "string" && e.startsWith(t), $n = /* @__PURE__ */ Wn("--"), Gr = /* @__PURE__ */ Wn("var(--"), pt = (t) => Gr(t) ? Ur.test(t.split("/*")[0].trim()) : !1, Ur = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, jr = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function zr(t) {
  const e = jr.exec(t);
  if (!e)
    return [,];
  const [, n, s, r] = e;
  return [`--${n ?? s}`, r];
}
function Gn(t, e, n = 1) {
  const [s, r] = zr(t);
  if (!s)
    return;
  const i = window.getComputedStyle(e).getPropertyValue(s);
  if (i) {
    const o = i.trim();
    return Hn(o) ? parseFloat(o) : o;
  }
  return pt(r) ? Gn(r, e, n + 1) : r;
}
const Un = (t) => (e) => e.test(t), Yr = {
  test: (t) => t === "auto",
  parse: (t) => t
}, jn = [se, p, J, q, xr, Vr, Yr], Wt = (t) => jn.find(Un(t));
class zn extends mt {
  constructor(e, n, s, r, i) {
    super(e, n, s, r, i, !0);
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
    if (this.resolveNoneKeyframes(), !Tn.has(s) || e.length !== 2)
      return;
    const [r, i] = e, o = Wt(r), a = Wt(i);
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
    for (let r = 0; r < e.length; r++)
      wr(e[r]) && s.push(r);
    s.length && qr(e, s, n);
  }
  measureInitialState() {
    const { element: e, unresolvedKeyframes: n, name: s } = this;
    if (!e || !e.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = ee[s](e.measureViewportBox(), window.getComputedStyle(e.current)), n[0] = this.measuredOrigin;
    const r = n[n.length - 1];
    r !== void 0 && e.getValue(s, r).jump(r, !1);
  }
  measureEndState() {
    var e;
    const { element: n, name: s, unresolvedKeyframes: r } = this;
    if (!n || !n.current)
      return;
    const i = n.getValue(s);
    i && i.jump(this.measuredOrigin, !1);
    const o = r.length - 1, a = r[o];
    r[o] = ee[s](n.measureViewportBox(), window.getComputedStyle(n.current)), a !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = a), !((e = this.removedTransforms) === null || e === void 0) && e.length && this.removedTransforms.forEach(([l, u]) => {
      n.getValue(l).set(u);
    }), this.resolveNoneKeyframes();
  }
}
const $t = (t, e) => e === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(re.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function Xr(t) {
  const e = t[0];
  if (t.length === 1)
    return !0;
  for (let n = 0; n < t.length; n++)
    if (t[n] !== e)
      return !0;
}
function Zr(t, e, n, s) {
  const r = t[0];
  if (r === null)
    return !1;
  if (e === "display" || e === "visibility")
    return !0;
  const i = t[t.length - 1], o = $t(r, e), a = $t(i, e);
  return !o || !a ? !1 : Xr(t) || (n === "spring" || Oe(n)) && s;
}
const Qr = (t) => t !== null;
function ke(t, { repeat: e, repeatType: n = "loop" }, s) {
  const r = t.filter(Qr), i = e && n !== "loop" && e % 2 === 1 ? 0 : r.length - 1;
  return !i || s === void 0 ? r[i] : s;
}
const Jr = 40;
class Yn {
  constructor({ autoplay: e = !0, delay: n = 0, type: s = "keyframes", repeat: r = 0, repeatDelay: i = 0, repeatType: o = "loop", ...a }) {
    this.isStopped = !1, this.hasAttemptedResolve = !1, this.createdAt = _.now(), this.options = {
      autoplay: e,
      delay: n,
      type: s,
      repeat: r,
      repeatDelay: i,
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
    return this.resolvedAt ? this.resolvedAt - this.createdAt > Jr ? this.resolvedAt : this.createdAt : this.createdAt;
  }
  /**
   * A getter for resolved data. If keyframes are not yet resolved, accessing
   * this.resolved will synchronously flush all pending keyframe resolvers.
   * This is a deoptimisation, but at its worst still batches read/writes.
   */
  get resolved() {
    return !this._resolved && !this.hasAttemptedResolve && $r(), this._resolved;
  }
  /**
   * A method to be called when the keyframes resolver completes. This method
   * will check if its possible to run the animation and, if not, skip it.
   * Otherwise, it will call initPlayback on the implementing class.
   */
  onKeyframesResolved(e, n) {
    this.resolvedAt = _.now(), this.hasAttemptedResolve = !0;
    const { name: s, type: r, velocity: i, delay: o, onComplete: a, onUpdate: l, isGenerator: u } = this.options;
    if (!u && !Zr(e, s, r, i))
      if (o)
        this.options.duration = 0;
      else {
        l && l(ke(e, this.options, n)), a && a(), this.resolveFinishedPromise();
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
function qe(t, e, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
function ei({ hue: t, saturation: e, lightness: n, alpha: s }) {
  t /= 360, e /= 100, n /= 100;
  let r = 0, i = 0, o = 0;
  if (!e)
    r = i = o = n;
  else {
    const a = n < 0.5 ? n * (1 + e) : n + e - n * e, l = 2 * n - a;
    r = qe(l, a, t + 1 / 3), i = qe(l, a, t), o = qe(l, a, t - 1 / 3);
  }
  return {
    red: Math.round(r * 255),
    green: Math.round(i * 255),
    blue: Math.round(o * 255),
    alpha: s
  };
}
function De(t, e) {
  return (n) => n > 0 ? e : t;
}
const _e = (t, e, n) => {
  const s = t * t, r = n * (e * e - s) + s;
  return r < 0 ? 0 : Math.sqrt(r);
}, ti = [Ye, W, Z], ni = (t) => ti.find((e) => e.test(t));
function Gt(t) {
  const e = ni(t);
  if (!e)
    return !1;
  let n = e.parse(t);
  return e === Z && (n = ei(n)), n;
}
const Ut = (t, e) => {
  const n = Gt(t), s = Gt(e);
  if (!n || !s)
    return De(t, e);
  const r = { ...n };
  return (i) => (r.red = _e(n.red, s.red, i), r.green = _e(n.green, s.green, i), r.blue = _e(n.blue, s.blue, i), r.alpha = pe(n.alpha, s.alpha, i), W.transform(r));
}, si = (t, e) => (n) => e(t(n)), gt = (...t) => t.reduce(si), Je = /* @__PURE__ */ new Set(["none", "hidden"]);
function ri(t, e) {
  return Je.has(t) ? (n) => n <= 0 ? t : e : (n) => n >= 1 ? e : t;
}
function ii(t, e) {
  return (n) => pe(t, e, n);
}
function yt(t) {
  return typeof t == "number" ? ii : typeof t == "string" ? pt(t) ? De : C.test(t) ? Ut : li : Array.isArray(t) ? Xn : typeof t == "object" ? C.test(t) ? Ut : oi : De;
}
function Xn(t, e) {
  const n = [...t], s = n.length, r = t.map((i, o) => yt(i)(i, e[o]));
  return (i) => {
    for (let o = 0; o < s; o++)
      n[o] = r[o](i);
    return n;
  };
}
function oi(t, e) {
  const n = { ...t, ...e }, s = {};
  for (const r in n)
    t[r] !== void 0 && e[r] !== void 0 && (s[r] = yt(t[r])(t[r], e[r]));
  return (r) => {
    for (const i in s)
      n[i] = s[i](r);
    return n;
  };
}
function ai(t, e) {
  var n;
  const s = [], r = { color: 0, var: 0, number: 0 };
  for (let i = 0; i < e.values.length; i++) {
    const o = e.types[i], a = t.indexes[o][r[o]], l = (n = t.values[a]) !== null && n !== void 0 ? n : 0;
    s[i] = l, r[o]++;
  }
  return s;
}
const li = (t, e) => {
  const n = re.createTransformer(e), s = me(t), r = me(e);
  return s.indexes.var.length === r.indexes.var.length && s.indexes.color.length === r.indexes.color.length && s.indexes.number.length >= r.indexes.number.length ? Je.has(t) && !r.values.length || Je.has(e) && !s.values.length ? ri(t, e) : gt(Xn(ai(s, r), r.values), n) : De(t, e);
};
function Zn(t, e, n) {
  return typeof t == "number" && typeof e == "number" && typeof n == "number" ? pe(t, e, n) : yt(t)(t, e);
}
function jt({ keyframes: t, velocity: e = 0, power: n = 0.8, timeConstant: s = 325, bounceDamping: r = 10, bounceStiffness: i = 500, modifyTarget: o, min: a, max: l, restDelta: u = 0.5, restSpeed: c }) {
  const d = t[0], f = {
    done: !1,
    value: d
  }, y = (T) => a !== void 0 && T < a || l !== void 0 && T > l, g = (T) => a === void 0 ? l : l === void 0 || Math.abs(a - T) < Math.abs(l - T) ? a : l;
  let b = n * e;
  const v = d + b, h = o === void 0 ? v : o(v);
  h !== v && (b = h - d);
  const w = (T) => -b * Math.exp(-T / s), V = (T) => h + w(T), x = (T) => {
    const A = w(T), F = V(T);
    f.done = Math.abs(A) <= u, f.value = f.done ? h : F;
  };
  let m, S;
  const M = (T) => {
    y(f.value) && (m = T, S = rt({
      keyframes: [f.value, g(f.value)],
      velocity: hn(V, T, f.value),
      // TODO: This should be passing * 1000
      damping: r,
      stiffness: i,
      restDelta: u,
      restSpeed: c
    }));
  };
  return M(0), {
    calculatedDuration: null,
    next: (T) => {
      let A = !1;
      return !S && m === void 0 && (A = !0, x(T), M(T)), m !== void 0 && T >= m ? S.next(T - m) : (!A && x(T), f);
    }
  };
}
const ci = /* @__PURE__ */ ge(0.42, 0, 1, 1), ui = /* @__PURE__ */ ge(0, 0, 0.58, 1), Qn = /* @__PURE__ */ ge(0.42, 0, 0.58, 1), zt = {
  linear: z,
  easeIn: ci,
  easeInOut: Qn,
  easeOut: ui,
  circIn: ct,
  circInOut: Rn,
  circOut: vr,
  backIn: lt,
  backInOut: Dn,
  backOut: Pn,
  anticipate: Fn
}, Yt = (t) => {
  if (at(t)) {
    Ge(t.length === 4);
    const [e, n, s, r] = t;
    return ge(e, n, s, r);
  } else if (typeof t == "string")
    return Ge(zt[t] !== void 0), zt[t];
  return t;
};
function di(t, e, n) {
  const s = [], r = n || Zn, i = t.length - 1;
  for (let o = 0; o < i; o++) {
    let a = r(t[o], t[o + 1]);
    if (e) {
      const l = Array.isArray(e) ? e[o] || z : e;
      a = gt(l, a);
    }
    s.push(a);
  }
  return s;
}
function fi(t, e, { clamp: n = !0, ease: s, mixer: r } = {}) {
  const i = t.length;
  if (Ge(i === e.length), i === 1)
    return () => e[0];
  if (i === 2 && e[0] === e[1])
    return () => e[1];
  const o = t[0] === t[1];
  t[0] > t[i - 1] && (t = [...t].reverse(), e = [...e].reverse());
  const a = di(e, s, r), l = a.length, u = (c) => {
    if (o && c < t[0])
      return e[0];
    let d = 0;
    if (l > 1)
      for (; d < t.length - 2 && !(c < t[d + 1]); d++)
        ;
    const f = /* @__PURE__ */ Ie(t[d], t[d + 1], c);
    return a[d](f);
  };
  return n ? (c) => u(Y(t[0], t[i - 1], c)) : u;
}
function hi(t, e) {
  return t.map((n) => n * e);
}
function mi(t, e) {
  return t.map(() => e || Qn).splice(0, t.length - 1);
}
function Fe({ duration: t = 300, keyframes: e, times: n, ease: s = "easeInOut" }) {
  const r = mn(s) ? s.map(Yt) : Yt(s), i = {
    done: !1,
    value: e[0]
  }, o = hi(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === e.length ? n : yn(e),
    t
  ), a = fi(o, e, {
    ease: Array.isArray(r) ? r : mi(e, r)
  });
  return {
    calculatedDuration: t,
    next: (l) => (i.value = a(l), i.done = l >= t, i)
  };
}
const pi = (t) => {
  const e = ({ timestamp: n }) => t(n);
  return {
    start: () => k.update(e, !0),
    stop: () => je(e),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => Ce.isProcessing ? Ce.timestamp : _.now()
  };
}, gi = {
  decay: jt,
  inertia: jt,
  tween: Fe,
  keyframes: Fe,
  spring: rt
}, yi = (t) => t / 100;
class vt extends Yn {
  constructor(e) {
    super(e), this.holdTime = null, this.cancelTime = null, this.currentTime = 0, this.playbackSpeed = 1, this.pendingPlayState = "running", this.startTime = null, this.state = "idle", this.stop = () => {
      if (this.resolver.cancel(), this.isStopped = !0, this.state === "idle")
        return;
      this.teardown();
      const { onStop: l } = this.options;
      l && l();
    };
    const { name: n, motionValue: s, element: r, keyframes: i } = this.options, o = (r == null ? void 0 : r.KeyframeResolver) || mt, a = (l, u) => this.onKeyframesResolved(l, u);
    this.resolver = new o(i, a, n, s, r), this.resolver.scheduleResolve();
  }
  flatten() {
    super.flatten(), this._resolved && Object.assign(this._resolved, this.initPlayback(this._resolved.keyframes));
  }
  initPlayback(e) {
    const { type: n = "keyframes", repeat: s = 0, repeatDelay: r = 0, repeatType: i, velocity: o = 0 } = this.options, a = Oe(n) ? n : gi[n] || Fe;
    let l, u;
    a !== Fe && typeof e[0] != "number" && (l = gt(yi, Zn(e[0], e[1])), e = [0, 100]);
    const c = a({ ...this.options, keyframes: e });
    i === "mirror" && (u = a({
      ...this.options,
      keyframes: [...e].reverse(),
      velocity: -o
    })), c.calculatedDuration === null && (c.calculatedDuration = st(c));
    const { calculatedDuration: d } = c, f = d + r, y = f * (s + 1) - r;
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
      const { keyframes: T } = this.options;
      return { done: !0, value: T[T.length - 1] };
    }
    const { finalKeyframe: r, generator: i, mirroredGenerator: o, mapPercentToKeyframes: a, keyframes: l, calculatedDuration: u, totalDuration: c, resolvedDuration: d } = s;
    if (this.startTime === null)
      return i.next(0);
    const { delay: f, repeat: y, repeatType: g, repeatDelay: b, onUpdate: v } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - c / this.speed, this.startTime)), n ? this.currentTime = e : this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = Math.round(e - this.startTime) * this.speed;
    const h = this.currentTime - f * (this.speed >= 0 ? 1 : -1), w = this.speed >= 0 ? h < 0 : h > c;
    this.currentTime = Math.max(h, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = c);
    let V = this.currentTime, x = i;
    if (y) {
      const T = Math.min(this.currentTime, c) / d;
      let A = Math.floor(T), F = T % 1;
      !F && T >= 1 && (F = 1), F === 1 && A--, A = Math.min(A, y + 1), !!(A % 2) && (g === "reverse" ? (F = 1 - F, b && (F -= b / d)) : g === "mirror" && (x = o)), V = Y(0, 1, F) * d;
    }
    const m = w ? { done: !1, value: l[0] } : x.next(V);
    a && (m.value = a(m.value));
    let { done: S } = m;
    !w && u !== null && (S = this.speed >= 0 ? this.currentTime >= c : this.currentTime <= 0);
    const M = this.holdTime === null && (this.state === "finished" || this.state === "running" && S);
    return M && r !== void 0 && (m.value = ke(l, this.options, r)), v && v(m.value), M && this.finish(), m;
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
    const { driver: e = pi, onPlay: n, startTime: s } = this.options;
    this.driver || (this.driver = e((i) => this.tick(i))), n && n();
    const r = this.driver.now();
    this.holdTime !== null ? this.startTime = r - this.holdTime : this.startTime ? this.state === "finished" && (this.startTime = r) : this.startTime = s ?? this.calcStartTime(), this.state === "finished" && this.updateFinishedPromise(), this.cancelTime = this.startTime, this.holdTime = null, this.state = "running", this.driver.start();
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
const vi = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]);
function wi(t, e, n, { delay: s = 0, duration: r = 300, repeat: i = 0, repeatType: o = "loop", ease: a = "easeInOut", times: l } = {}) {
  const u = { [e]: n };
  l && (u.offset = l);
  const c = xn(a, r);
  return Array.isArray(c) && (u.easing = c), t.animate(u, {
    delay: s,
    duration: r,
    easing: Array.isArray(c) ? "linear" : c,
    fill: "both",
    iterations: i + 1,
    direction: o === "reverse" ? "alternate" : "normal"
  });
}
const bi = /* @__PURE__ */ nt(() => Object.hasOwnProperty.call(Element.prototype, "animate")), Re = 10, Ti = 2e4;
function Si(t) {
  return Oe(t.type) || t.type === "spring" || !Vn(t.ease);
}
function Ai(t, e) {
  const n = new vt({
    ...e,
    keyframes: t,
    repeat: 0,
    delay: 0,
    isGenerator: !0
  });
  let s = { done: !1, value: t[0] };
  const r = [];
  let i = 0;
  for (; !s.done && i < Ti; )
    s = n.sample(i), r.push(s.value), i += Re;
  return {
    times: void 0,
    keyframes: r,
    duration: i - Re,
    ease: "linear"
  };
}
const Jn = {
  anticipate: Fn,
  backInOut: Dn,
  circInOut: Rn
};
function Vi(t) {
  return t in Jn;
}
class Xt extends Yn {
  constructor(e) {
    super(e);
    const { name: n, motionValue: s, element: r, keyframes: i } = this.options;
    this.resolver = new zn(i, (o, a) => this.onKeyframesResolved(o, a), n, s, r), this.resolver.scheduleResolve();
  }
  initPlayback(e, n) {
    let { duration: s = 300, times: r, ease: i, type: o, motionValue: a, name: l, startTime: u } = this.options;
    if (!a.owner || !a.owner.current)
      return !1;
    if (typeof i == "string" && Pe() && Vi(i) && (i = Jn[i]), Si(this.options)) {
      const { onComplete: d, onUpdate: f, motionValue: y, element: g, ...b } = this.options, v = Ai(e, b);
      e = v.keyframes, e.length === 1 && (e[1] = e[0]), s = v.duration, r = v.times, i = v.ease, o = "keyframes";
    }
    const c = wi(a.owner.current, l, e, { ...this.options, duration: s, times: r, ease: i });
    return c.startTime = u ?? this.calcStartTime(), this.pendingTimeline ? (Lt(c, this.pendingTimeline), this.pendingTimeline = void 0) : c.onfinish = () => {
      const { onComplete: d } = this.options;
      a.set(ke(e, this.options, n)), d && d(), this.cancel(), this.resolveFinishedPromise();
    }, {
      animation: c,
      duration: s,
      times: r,
      type: o,
      ease: i,
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
      Lt(s, e);
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
    const { animation: n, keyframes: s, duration: r, type: i, ease: o, times: a } = e;
    if (n.playState === "idle" || n.playState === "finished")
      return;
    if (this.time) {
      const { motionValue: u, onUpdate: c, onComplete: d, element: f, ...y } = this.options, g = new vt({
        ...y,
        keyframes: s,
        duration: r,
        type: i,
        ease: o,
        times: a,
        isGenerator: !0
      }), b = /* @__PURE__ */ B(this.time);
      u.setWithVelocity(g.sample(b - Re).value, g.sample(b).value, Re);
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
    const { motionValue: n, name: s, repeatDelay: r, repeatType: i, damping: o, type: a } = e;
    if (!n || !n.owner || !(n.owner.current instanceof HTMLElement))
      return !1;
    const { onUpdate: l, transformTemplate: u } = n.owner.getProps();
    return bi() && s && vi.has(s) && /**
     * If we're outputting values to onUpdate then we can't use WAAPI as there's
     * no way to read the value from WAAPI every frame.
     */
    !l && !u && !r && i !== "mirror" && o !== 0 && a !== "inertia";
  }
}
const xi = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, Ei = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), Mi = {
  type: "keyframes",
  duration: 0.8
}, Ci = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, Pi = (t, { keyframes: e }) => e.length > 2 ? Mi : ne.has(t) ? t.startsWith("scale") ? Ei(e[1]) : xi : Ci;
function Di({ when: t, delay: e, delayChildren: n, staggerChildren: s, staggerDirection: r, repeat: i, repeatType: o, repeatDelay: a, from: l, elapsed: u, ...c }) {
  return !!Object.keys(c).length;
}
const es = (t, e, n, s = {}, r, i) => (o) => {
  const a = bn(s, t) || {}, l = a.delay || s.delay || 0;
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
    element: i ? void 0 : r
  };
  Di(a) || (c = {
    ...c,
    ...Pi(t, c)
  }), c.duration && (c.duration = /* @__PURE__ */ B(c.duration)), c.repeatDelay && (c.repeatDelay = /* @__PURE__ */ B(c.repeatDelay)), c.from !== void 0 && (c.keyframes[0] = c.from);
  let d = !1;
  if ((c.type === !1 || c.duration === 0 && !c.repeatDelay) && (c.duration = 0, c.delay === 0 && (d = !0)), d && !i && e.get() !== void 0) {
    const f = ke(c.keyframes, a);
    if (f !== void 0)
      return k.update(() => {
        c.onUpdate(f), c.onComplete();
      }), new un([]);
  }
  return !i && Xt.supports(c) ? new Xt(c) : new vt(c);
};
function Fi({ protectedKeys: t, needsAnimating: e }, n) {
  const s = t.hasOwnProperty(n) && e[n] !== !0;
  return e[n] = !1, s;
}
function Ri(t, e, { delay: n = 0, transitionOverride: s, type: r } = {}) {
  var i;
  let { transition: o = t.getDefaultTransition(), transitionEnd: a, ...l } = e;
  s && (o = s);
  const u = [], c = r && t.animationState && t.animationState.getState()[r];
  for (const d in l) {
    const f = t.getValue(d, (i = t.latestValues[d]) !== null && i !== void 0 ? i : null), y = l[d];
    if (y === void 0 || c && Fi(c, d))
      continue;
    const g = {
      delay: n,
      ...bn(o || {}, d)
    };
    let b = !1;
    if (window.MotionHandoffAnimation) {
      const h = fr(t);
      if (h) {
        const w = window.MotionHandoffAnimation(h, d, k);
        w !== null && (g.startTime = w, b = !0);
      }
    }
    cr(t, d), f.start(es(d, f, y, t.shouldReduceMotion && Tn.has(d) ? { type: !1 } : g, t, b));
    const v = f.animation;
    v && u.push(v);
  }
  return a && Promise.all(u).then(() => {
    k.update(() => {
      a && ar(t, a);
    });
  }), u;
}
function Ii(t) {
  return t instanceof SVGElement && t.tagName !== "svg";
}
const Zt = () => ({ min: 0, max: 0 }), wt = () => ({
  x: Zt(),
  y: Zt()
}), Qt = {
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
for (const t in Qt)
  et[t] = {
    isEnabled: (e) => Qt[t].some((n) => !!e[n])
  };
const Oi = typeof window < "u", tt = { current: null }, ts = { current: !1 };
function ki() {
  if (ts.current = !0, !!Oi)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), e = () => tt.current = t.matches;
      t.addListener(e), e();
    } else
      tt.current = !1;
}
const Li = [...jn, C, re], Bi = (t) => Li.find(Un(t));
function Ni(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function Ki(t) {
  return typeof t == "string" || Array.isArray(t);
}
const qi = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], _i = ["initial", ...qi];
function ns(t) {
  return Ni(t.animate) || _i.some((e) => Ki(t[e]));
}
function Hi(t) {
  return !!(ns(t) || t.variants);
}
function Wi(t, e, n) {
  for (const s in e) {
    const r = e[s], i = n[s];
    if (P(r))
      t.addValue(s, r);
    else if (P(i))
      t.addValue(s, fe(r, { owner: t }));
    else if (i !== r)
      if (t.hasValue(s)) {
        const o = t.getValue(s);
        o.liveStyle === !0 ? o.jump(r) : o.hasAnimated || o.set(r);
      } else {
        const o = t.getStaticValue(s);
        t.addValue(s, fe(o !== void 0 ? o : r, { owner: t }));
      }
  }
  for (const s in n)
    e[s] === void 0 && t.removeValue(s);
  return e;
}
const Jt = [
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
  constructor({ parent: e, props: n, presenceContext: s, reducedMotionConfig: r, blockInitialAnimation: i, visualState: o }, a = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = mt, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const y = _.now();
      this.renderScheduledAt < y && (this.renderScheduledAt = y, k.render(this.render, !1, !0));
    };
    const { latestValues: l, renderState: u, onUpdate: c } = o;
    this.onUpdate = c, this.latestValues = l, this.baseTarget = { ...l }, this.initialValues = n.initial ? { ...l } : {}, this.renderState = u, this.parent = e, this.props = n, this.presenceContext = s, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = r, this.options = a, this.blockInitialAnimation = !!i, this.isControllingVariants = ns(n), this.isVariantNode = Hi(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
    const { willChange: d, ...f } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const y in f) {
      const g = f[y];
      l[y] !== void 0 && P(g) && g.set(l[y], !1);
    }
  }
  mount(e) {
    this.current = e, de.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((n, s) => this.bindToMotionValue(s, n)), ts.current || ki(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : tt.current, this.parent && this.parent.children.add(this), this.update(this.props, this.presenceContext);
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
    const r = n.on("change", (a) => {
      this.latestValues[e] = a, this.props.onUpdate && k.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0);
    }), i = n.on("renderRequest", this.scheduleRender);
    let o;
    window.MotionCheckAppearSync && (o = window.MotionCheckAppearSync(this, e, n)), this.valueSubscriptions.set(e, () => {
      r(), i(), o && o(), n.owner && n.stop();
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
      const { isEnabled: s, Feature: r } = n;
      if (!this.features[e] && r && s(this.props) && (this.features[e] = new r(this)), this.features[e]) {
        const i = this.features[e];
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
    for (let s = 0; s < Jt.length; s++) {
      const r = Jt[s];
      this.propEventSubscriptions[r] && (this.propEventSubscriptions[r](), delete this.propEventSubscriptions[r]);
      const i = "on" + r, o = e[i];
      o && (this.propEventSubscriptions[r] = this.on(r, o));
    }
    this.prevMotionValues = Wi(this, this.scrapeMotionValuesFromProps(e, this.prevProps, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue(), this.onUpdate && this.onUpdate(this);
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
    let r = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : (s = this.getBaseTargetFromProps(this.props, e)) !== null && s !== void 0 ? s : this.readValueFromInstance(this.current, e, this.options);
    return r != null && (typeof r == "string" && (Hn(r) || In(r)) ? r = parseFloat(r) : !Bi(r) && re.test(n) && (r = Kn(e, n)), this.setBaseTarget(e, P(r) ? r.get() : r)), P(r) ? r.get() : r;
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
    let r;
    if (typeof s == "string" || typeof s == "object") {
      const o = An(this.props, s, (n = this.presenceContext) === null || n === void 0 ? void 0 : n.custom);
      o && (r = o[e]);
    }
    if (s && r !== void 0)
      return r;
    const i = this.getBaseTargetFromProps(this.props, e);
    return i !== void 0 && !P(i) ? i : this.initialValues[e] !== void 0 && r === void 0 ? void 0 : this.baseTarget[e];
  }
  on(e, n) {
    return this.events[e] || (this.events[e] = new Sn()), this.events[e].add(n);
  }
  notify(e, ...n) {
    this.events[e] && this.events[e].notify(...n);
  }
}
class rs extends ss {
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
const is = (t, e) => e && typeof t == "number" ? e.transform(t) : t, $i = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Gi = te.length;
function Ui(t, e, n) {
  let s = "", r = !0;
  for (let i = 0; i < Gi; i++) {
    const o = te[i], a = t[o];
    if (a === void 0)
      continue;
    let l = !0;
    if (typeof a == "number" ? l = a === (o.startsWith("scale") ? 1 : 0) : l = parseFloat(a) === 0, !l || n) {
      const u = is(a, ft[o]);
      if (!l) {
        r = !1;
        const c = $i[o] || o;
        s += `${c}(${u}) `;
      }
      n && (e[o] = u);
    }
  }
  return s = s.trim(), n ? s = n(e, r ? "" : s) : r && (s = "none"), s;
}
function os(t, e, n) {
  const { style: s, vars: r, transformOrigin: i } = t;
  let o = !1, a = !1;
  for (const l in e) {
    const u = e[l];
    if (ne.has(l)) {
      o = !0;
      continue;
    } else if ($n(l)) {
      r[l] = u;
      continue;
    } else {
      const c = is(u, ft[l]);
      l.startsWith("origin") ? (a = !0, i[l] = c) : s[l] = c;
    }
  }
  if (e.transform || (o || n ? s.transform = Ui(e, t.transform, n) : s.transform && (s.transform = "none")), a) {
    const { originX: l = "50%", originY: u = "50%", originZ: c = 0 } = i;
    s.transformOrigin = `${l} ${u} ${c}`;
  }
}
const ji = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, zi = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function Yi(t, e, n = 1, s = 0, r = !0) {
  t.pathLength = 1;
  const i = r ? ji : zi;
  t[i.offset] = p.transform(-s);
  const o = p.transform(e), a = p.transform(n);
  t[i.array] = `${o} ${a}`;
}
function en(t, e, n) {
  return typeof t == "string" ? t : p.transform(e + n * t);
}
function Xi(t, e, n) {
  const s = en(e, t.x, t.width), r = en(n, t.y, t.height);
  return `${s} ${r}`;
}
function Zi(t, {
  attrX: e,
  attrY: n,
  attrScale: s,
  originX: r,
  originY: i,
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
  f.transform && (g && (y.transform = f.transform), delete f.transform), g && (r !== void 0 || i !== void 0 || y.transform) && (y.transformOrigin = Xi(g, r !== void 0 ? r : 0.5, i !== void 0 ? i : 0.5)), e !== void 0 && (f.x = e), n !== void 0 && (f.y = n), s !== void 0 && (f.scale = s), o !== void 0 && Yi(f, o, a, l, !1);
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
]), Qi = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function Ji(t, e) {
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
function ls(t, { style: e, vars: n }, s, r) {
  Object.assign(t.style, e, r && r.getProjectionStyles(s));
  for (const i in n)
    t.style.setProperty(i, n[i]);
}
function eo(t, e, n, s) {
  ls(t, e, void 0, s);
  for (const r in e.attrs)
    t.setAttribute(as.has(r) ? r : ot(r), e.attrs[r]);
}
const to = {};
function no(t, { layout: e, layoutId: n }) {
  return ne.has(t) || t.startsWith("origin") || (e || n !== void 0) && (!!to[t] || t === "opacity");
}
function cs(t, e, n) {
  var s;
  const { style: r } = t, i = {};
  for (const o in r)
    (P(r[o]) || e.style && P(e.style[o]) || no(o, t) || ((s = n == null ? void 0 : n.getValue(o)) === null || s === void 0 ? void 0 : s.liveStyle) !== void 0) && (i[o] = r[o]);
  return i;
}
function so(t, e, n) {
  const s = cs(t, e, n);
  for (const r in t)
    if (P(t[r]) || P(e[r])) {
      const i = te.indexOf(r) !== -1 ? "attr" + r.charAt(0).toUpperCase() + r.substring(1) : r;
      s[i] = t[r];
    }
  return s;
}
class ro extends rs {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = wt, this.updateDimensions = () => {
      this.current && !this.renderState.dimensions && Ji(this.current, this.renderState);
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
    this.current && !this.renderState.dimensions && k.postRender(this.updateDimensions);
  }
  build(e, n, s) {
    Zi(e, n, this.isSVGTag, s.transformTemplate);
  }
  renderInstance(e, n, s, r) {
    eo(e, n, s, r);
  }
  mount(e) {
    this.isSVGTag = Qi(e.tagName), super.mount(e);
  }
}
function io({ top: t, left: e, right: n, bottom: s }) {
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
  return io(oo(t.getBoundingClientRect(), e));
}
function lo(t) {
  return window.getComputedStyle(t);
}
class co extends rs {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = ls;
  }
  readValueFromInstance(e, n) {
    if (ne.has(n)) {
      const s = ht(n);
      return s && s.default || 0;
    } else {
      const s = lo(e), r = ($n(n) ? s.getPropertyValue(n) : s[n]) || 0;
      return typeof r == "string" ? r.trim() : r;
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
  }, n = Ii(t) ? new ro(e) : new co(e);
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
  return P(t) || typeof t == "number" || typeof t == "string" && !it(e);
}
function us(t, e, n, s) {
  const r = [];
  if (go(t, e))
    r.push(po(t, it(e) && e.default || e, n && (n.default || n)));
  else {
    const i = vn(t, e, s), o = i.length;
    for (let a = 0; a < o; a++) {
      const l = i[a], u = l instanceof Element ? ho : mo;
      de.has(l) || u(l);
      const c = de.get(l), d = { ...n };
      "delay" in d && typeof d.delay == "function" && (d.delay = d.delay(a, o)), r.push(...Ri(c, { ...e, transition: d }, {}));
    }
  }
  return r;
}
function yo(t, e, n) {
  const s = [];
  return Gs(t, e, n, { spring: rt }).forEach(({ keyframes: i, transition: o }, a) => {
    s.push(...us(a, i, o));
  }), s;
}
function vo(t) {
  return Array.isArray(t) && t.some(Array.isArray);
}
function wo(t) {
  function e(n, s, r) {
    let i = [];
    return vo(n) ? i = yo(n, s, t) : i = us(n, s, r, t), new un(i);
  }
  return e;
}
const D = wo();
var L;
class bo extends EventTarget {
  constructor(n) {
    super();
    Ct(this, L);
    Ne(this, L, n);
  }
  get value() {
    return le(this, L);
  }
  set value(n) {
    le(this, L) !== n && (Ne(this, L, n), this.dispatchEvent(new CustomEvent("change")));
  }
  effect(n) {
    return n(), this.addEventListener("change", n), () => this.removeEventListener("change", n);
  }
  valueOf() {
    return le(this, L);
  }
  toString() {
    return String(le(this, L));
  }
}
L = new WeakMap();
const ds = (t) => new bo(t);
function To(t) {
  const e = ds(!1);
  return new ResizeObserver(() => {
    const n = t.scrollHeight > t.clientHeight;
    e.value !== n && (e.value = n);
  }).observe(t), { $isOverflowingVertically: e };
}
function So(t, e, n) {
  var s = n, r = s.noTrailing, i = r === void 0 ? !1 : r, o = s.noLeading, a = o === void 0 ? !1 : o, l = s.debounceMode, u = l === void 0 ? void 0 : l, c, d = !1, f = 0;
  function y() {
    c && clearTimeout(c);
  }
  function g(v) {
    var h = v || {}, w = h.upcomingOnly, V = w === void 0 ? !1 : w;
    y(), d = !V;
  }
  function b() {
    for (var v = arguments.length, h = new Array(v), w = 0; w < v; w++)
      h[w] = arguments[w];
    var V = this, x = Date.now() - f;
    if (d)
      return;
    function m() {
      f = Date.now(), e.apply(V, h);
    }
    function S() {
      c = void 0;
    }
    !a && u && !c && m(), y(), u === void 0 && x > t ? a ? (f = Date.now(), i || (c = setTimeout(u ? S : m, t))) : m() : i !== !0 && (c = setTimeout(u ? S : m, u === void 0 ? t - x : t));
  }
  return b.cancel = g, b;
}
function Ao(t, e, n) {
  var s = {}, r = s.atBegin, i = r === void 0 ? !1 : r;
  return So(t, e, {
    debounceMode: i !== !1
  });
}
class Vo {
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
const fs = 3e3, Ee = document.querySelector("#alerts");
if (!Ee)
  throw new Error("Alert container not found");
const G = [], Q = ds(!1);
Q.effect(Ao(50, () => {
  G.toReversed().forEach(({ element: t, interval: e }, n) => {
    Q.value ? (e.setInterval(fs - n * 250), e.pause()) : e.resume();
    const s = 1 - n * 0.1, r = n === 0 ? 0 : -10 * n, i = G.slice(0, n), o = 5;
    D(t, {
      y: Q.value ? i.reduce((a, { element: l }) => a + l.offsetHeight + o, 0) * -1 : r,
      scale: Q.value ? 1 : s
    }, {
      ease: "easeOut",
      duration: 0.3
    });
  });
}));
function tn(t, e) {
  const n = G.length - 1, s = G.shift();
  if (!s)
    throw new Error("First alert not found");
  s.interval.stop();
  let r = -10 * (n + 1), i = n === 1 ? 1 : 1 - n * 0.1;
  e && (r += 10, i -= 0.1), D(s.element, {
    y: t === "top" ? r : "50%",
    scale: i,
    opacity: 0
  }, {
    duration: t === "top" ? 0.2 : 0.3,
    ease: "easeOut"
  }).then(() => {
    s.element.remove();
  });
}
function xo(t, e) {
  G.length === 3 && tn("top", !0);
  const n = document.createElement("div");
  n.setAttribute("role", "alert"), n.classList.add("c-toast", "z-50"), n.style.opacity = "0%";
  const s = document.createElement("span");
  if (s.textContent = t, n.append(s), e) {
    const i = document.createElement("div");
    i.innerHTML = e, n.prepend(i);
  }
  n.addEventListener("mouseenter", () => Q.value = !0), n.addEventListener("mouseleave", () => Q.value = !1), Ee == null || Ee.append(n), D(n, {
    y: ["100%", 0],
    scale: 1,
    opacity: 1
  }, {
    ease: "easeOut",
    duration: 0.3
  }), G.toReversed().forEach(({ element: i }, o) => {
    const a = 1 - (o + 1) * 0.1, l = -10 * (o + 1);
    D(i, {
      y: l,
      scale: a
    }, { ease: "easeOut", duration: 0.3 });
  });
  const r = new Vo(() => tn("bottom", !1), fs);
  G.push({ element: n, interval: r }), r.start();
}
const Eo = 5e3;
async function Mo(t) {
  const e = (n) => {
    var o;
    const s = (o = n.contentWindow) == null ? void 0 : o.document;
    if (!s)
      return !1;
    const r = s.body && s.body.children.length > 0, i = s.readyState === "complete";
    return r && i && s.body.children.length > 0;
  };
  await Promise.allSettled(
    t.map((n) => new Promise((s) => {
      const r = setInterval(() => {
        if (e(n))
          return clearInterval(r), s();
      }, 100);
      setTimeout(() => (clearInterval(r), s()), Eo);
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
function hs() {
  document.body.classList.add("js-loaded");
}
const Co = async (t) => {
  if (await Mo(t), t.forEach((e) => {
    He(e);
    const n = e.contentWindow;
    if (!n)
      return;
    new ResizeObserver(() => He(e)).observe(n.document.body);
  }), window.addEventListener("resize", () => {
    t.forEach((e) => He(e));
  }), window.location.hash) {
    const e = document.querySelector(window.location.hash);
    e && (await new Promise((n) => setTimeout(n, 200)), e.scrollIntoView());
  }
  hs();
}, We = "in2theme", Ae = {
  normal: "theme-normal",
  light: "theme-light",
  dark: "theme-dark"
}, Po = (t) => {
  const e = window.matchMedia("(prefers-color-scheme: dark)");
  function n() {
    const o = localStorage.getItem(We);
    return o || localStorage.setItem(We, "normal"), o;
  }
  function s() {
    const o = n();
    let a = Ae[o];
    o === "normal" && e.matches && (a = Ae.dark);
    const l = (d) => {
      Object.values(Ae).forEach((f) => d.classList.remove(f)), d.classList.remove("dark");
    }, u = (d) => {
      d.classList.add(a), a === Ae.dark && d.classList.add("dark");
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
  const r = n(), i = t.querySelector(`input[value="${r}"]`);
  if (!i)
    throw new Error("No current theme input found");
  i.checked = !0;
};
function Do() {
  const t = navigator.userAgent.toLowerCase();
  return t.includes("mac") ? "mac" : t.includes("linux") ? "linux" : t.includes("win") ? "windows" : "unknown";
}
function Fo() {
  const t = document.querySelectorAll("iframe"), e = document.querySelector("#styleguide-previous"), n = document.querySelector("#styleguide-next"), s = (r) => {
    e && r.key === "ArrowLeft" && (r.preventDefault(), e.click()), n && r.key === "ArrowRight" && (r.preventDefault(), n.click());
  };
  t.forEach((r) => {
    const i = r.contentWindow;
    i && i.addEventListener("keydown", s);
  }), window.addEventListener("keydown", s);
}
function Ro() {
  const t = document.querySelectorAll("iframe"), e = (n) => {
    n.key === "k" && (n.metaKey || n.ctrlKey) && (n.preventDefault(), window.dispatchEvent(new Event("styleguideOpenSearch")));
  };
  t.forEach((n) => {
    const s = n.contentWindow;
    s && s.addEventListener("keydown", e);
  }), window.addEventListener("keydown", e);
}
const Io = Do();
document.body.setAttribute("data-os", Io);
Fo();
Ro();
function Oo() {
  const t = document.querySelector("header");
  if (!t)
    throw new Error("No header found");
  const e = () => t.getBoundingClientRect().height;
  document.documentElement.style.setProperty("--header-height", `${e()}px`), window.addEventListener("resize", () => {
    document.documentElement.style.setProperty("--header-height", `${e()}px`);
  });
}
function ko() {
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
      const s = Number.parseFloat(n), r = (t.scrollHeight - t.clientHeight) * s / 100;
      t.scrollTop = r;
    }
  }
  window.addEventListener("resize", e), e();
}
Oo();
ko();
const I = document.querySelector("#search-dialog");
if (!I)
  throw new Error("No search dialog found");
const U = document.querySelector(".search-backdrop");
if (!U)
  throw new Error("No search backdrop found");
const Le = document.querySelectorAll("[data-open-search]");
if (Le.length === 0)
  throw new Error("No open search buttons found");
const j = document.querySelector("#search-input");
if (!j)
  throw new Error("No search input found");
const ms = document.querySelector("#search-list");
if (!ms)
  throw new Error("No search list found");
const ps = document.querySelectorAll(".search-category__item--active");
if (!ps)
  throw new Error("No search results found");
const gs = document.querySelector("#search-no-results");
if (!gs)
  throw new Error("No search no results element found");
const ys = () => window.matchMedia("(max-width: 768px)").matches;
async function vs(t) {
  const e = t.target;
  if (!(e instanceof HTMLElement))
    throw new Error("Clicked element is not an HTMLElement");
  e.closest("dialog") !== null || await bs();
}
async function ws() {
  const t = window.scrollY;
  I.showModal(), await new Promise((n) => setTimeout(n, 50)), window.scrollTo(0, t), setTimeout(() => window.scrollTo(0, t), 0), setTimeout(() => window.scrollTo(0, t), 50), U.style.display = "block", ys() ? (I.style.overflowY = "hidden", j.setAttribute("inert", ""), D(I, { opacity: [0, 1], y: [250, 0] }, { duration: 0.3, ease: "easeOut" }), await D(U, { opacity: [0, 1] }, { duration: 0.3, ease: "easeOut" }), I.style.overflowY = "auto", j.removeAttribute("inert")) : (D(I, { opacity: [0, 1], scale: [0.98, 1] }, { duration: 0.3, ease: "easeOut" }), D(U, { opacity: [0, 1] }, { duration: 0.3, ease: "easeOut" })), Le.forEach((n) => n.ariaExpanded = "true"), j.ariaExpanded = "true", Ts(), setTimeout(() => document.addEventListener("click", vs), 0);
}
async function bs() {
  if (!I.open)
    return;
  document.removeEventListener("click", vs), ys() ? (D(I, { opacity: 0, y: [0, 250] }, { duration: 0.3, ease: "easeOut" }), await D(U, { opacity: 0 }, { duration: 0.3, ease: "easeOut" })) : (D(I, { opacity: 0, scale: [1, 0.98] }, { duration: 0.3, ease: "easeOut" }), await D(U, { opacity: 0 }, { duration: 0.3, ease: "linear" }).then(() => U.style.display = "none")), Le.forEach((e) => e.ariaExpanded = "false"), j.ariaExpanded = "false", I.close();
}
function Ts() {
  const t = j.value.toLowerCase().trim();
  let e = !1;
  ps.forEach((n) => {
    var i, o;
    let s;
    const r = ((i = n.getAttribute("data-search-keywords")) == null ? void 0 : i.split(",")) || [];
    if (r.length > 0)
      s = r.some((a) => a.toLowerCase().includes(t));
    else {
      const a = ((o = n.textContent) == null ? void 0 : o.toLowerCase()) ?? "";
      s = a == null ? void 0 : a.includes(t);
    }
    n.classList.toggle("search-category__item--active", s), s && (e = !0);
  }), ms.classList.toggle("hidden", !e), gs.classList.toggle("hidden", e);
}
j.addEventListener("input", Ts);
Le.forEach((t) => t.addEventListener("click", ws));
window.addEventListener("styleguideOpenSearch", ws);
I.addEventListener("keydown", async (t) => {
  t.key === "Escape" && (t.preventDefault(), await bs());
});
const nn = Array.from(document.querySelectorAll(".preview-iframe"));
nn.length > 0 ? Co(nn).catch(console.error) : hs();
const sn = document.querySelector(".theme-select");
sn && Po(sn);
const $e = document.querySelectorAll("details:has(.code-highlight)");
$e.length > 0 && ($e.forEach((t) => {
  const e = t.querySelector(".code-highlight");
  if (!e)
    throw new Error("No code element found");
  const n = t.querySelector("summary");
  if (!n)
    throw new Error("No trigger button found");
  n.addEventListener("click", async () => {
    const { createShikiHighlighter: s, highlightCode: r } = await import("./code-BL-eL8V0.js");
    await s(), await r(e);
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
const Ve = document.querySelectorAll("[data-code-audit-iframe]"), X = document.querySelector("#code-audit-dialog");
Ve.length > 0 && X && (async () => {
  const { createHtmlValidator: t, auditCode: e } = await import("./html-validator-yGwOYBKH.js");
  Ve.forEach((n) => n.addEventListener("click", async () => {
    Ve.forEach((r) => r.setAttribute("aria-expanded", "false")), n.setAttribute("disabled", "");
    const { isValid: s } = await e(n, X);
    s ? (n.classList.add("text-green-500", "!cursor-not-allowed"), xo(
      "Scanned HTML, no issues found!",
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4 text-green-500/50"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clip-rule="evenodd" /></svg>'
    ), setTimeout(() => {
      n.classList.remove("text-green-500", "!cursor-not-allowed"), n.removeAttribute("disabled");
    }, 5e3)) : (n.setAttribute("aria-expanded", "true"), n.removeAttribute("disabled"), n.classList.add("text-red-500"), X.showModal());
  })), new MutationObserver(() => {
    const n = (s) => {
      const r = s.target;
      if (!(r instanceof Element))
        return;
      r.closest("dialog") !== null || X.close();
    };
    X.open ? document.addEventListener("click", n) : (document.removeEventListener("click", n), Ve.forEach((s) => {
      s.setAttribute("aria-expanded", "false"), setTimeout(() => s.classList.remove("text-red-500"), 2500);
    }));
  }).observe(X, { attributes: !0, attributeFilter: ["open"] }), setTimeout(() => {
    requestIdleCallback(t);
  }, 8e3);
})();
const rn = document.querySelector("#icon-search-input"), on = document.querySelector("#icon-search-input-reset"), an = document.querySelector("#icon-search-list");
rn && an && on && import("./icons-BC_cK-8b.js").then(({ default: t }) => t(rn, an, on)).catch(console.error);
const Ss = "data-clipboard-value", ln = document.querySelectorAll(`button[${Ss}]`);
ln.length > 0 && import("./clipboard-Em-TdSO7.js").then(({ default: t }) => t(ln, Ss)).catch(console.error);
const cn = document.querySelectorAll(".markdown-container-folded");
cn.length > 0 && cn.forEach((t) => {
  const e = t.querySelector(".markdown-container");
  if (!e)
    throw new Error("No markdown container found");
  const n = t.querySelector(".markdown-show-more-container");
  if (!n)
    throw new Error("No show more container found");
  const s = t.querySelector(".markdown-show-more");
  if (!s)
    throw new Error("No show more button found");
  const { $isOverflowingVertically: r } = To(t), i = () => {
    const a = e.scrollHeight > e.clientHeight;
    n.classList.toggle("hidden", !a);
  };
  i();
  const o = r.effect(i);
  s.addEventListener("click", async () => {
    o();
    const a = e.scrollHeight;
    D(e, {
      maxHeight: `${a}px`
    }, { duration: 0.5 }).then(() => {
      e.classList.remove("max-h-[400px]"), e.style.maxHeight = "";
    }), D(n, {
      opacity: 0
    }, { duration: 0.5 }).then(() => n.classList.add("hidden"));
  });
});
export {
  D as a,
  xo as r,
  rt as s
};
