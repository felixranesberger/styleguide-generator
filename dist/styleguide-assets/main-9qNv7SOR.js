var Ss = Object.defineProperty;
var Et = (t) => {
  throw TypeError(t);
};
var As = (t, e, n) => e in t ? Ss(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var H = (t, e, n) => As(t, typeof e != "symbol" ? e + "" : e, n), Ct = (t, e, n) => e.has(t) || Et("Cannot " + n);
var le = (t, e, n) => (Ct(t, e, "read from private field"), n ? n.call(t) : e.get(t)), Pt = (t, e, n) => e.has(t) ? Et("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Ne = (t, e, n, s) => (Ct(t, e, "write to private field"), s ? s.call(t, n) : e.set(t, n), n);
function Vs(t, e, n) {
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
const xs = /* @__PURE__ */ nt(() => window.ScrollTimeline !== void 0);
class Ms {
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
      if (xs() && r.attachTimeline)
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
class un extends Ms {
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
  const r = Math.max(Math.round(e / n), 2);
  for (let i = 0; i < r; i++)
    s += t(/* @__PURE__ */ Ie(0, r - 1, i)) + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, Y = (t, e, n) => n > e ? e : n < t ? t : n;
function fn(t, e) {
  return e ? t * (1e3 / e) : 0;
}
const Es = 5;
function hn(t, e, n) {
  const s = Math.max(e - Es, 0);
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
function Cs({ duration: t = M.duration, bounce: e = M.bounce, velocity: n = M.velocity, mass: s = M.mass }) {
  let r, i, o = 1 - e;
  o = Y(M.minDamping, M.maxDamping, o), t = Y(M.minDuration, M.maxDuration, /* @__PURE__ */ N(t)), o < 1 ? (r = (u) => {
    const c = u * o, d = c * t, f = c - n, y = Ue(u, o), g = Math.exp(-d);
    return Dt - f / y * g;
  }, i = (u) => {
    const d = u * o * t, f = d * n + n, y = Math.pow(o, 2) * Math.pow(u, 2) * t, g = Math.exp(-d), T = Ue(Math.pow(u, 2), o);
    return (-r(u) + Dt > 0 ? -1 : 1) * ((f - y) * g) / T;
  }) : (r = (u) => {
    const c = Math.exp(-u * t), d = (u - n) * t + 1;
    return -1e-3 + c * d;
  }, i = (u) => {
    const c = Math.exp(-u * t), d = (n - u) * (t * t);
    return c * d;
  });
  const a = 5 / t, l = Ds(r, i, a);
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
const Ps = 12;
function Ds(t, e, n) {
  let s = n;
  for (let r = 1; r < Ps; r++)
    s = s - t(s) / e(s);
  return s;
}
function Ue(t, e) {
  return t * Math.sqrt(1 - e * e);
}
const Fs = ["duration", "bounce"], Rs = ["stiffness", "damping", "mass"];
function Ft(t, e) {
  return e.some((n) => t[n] !== void 0);
}
function Is(t) {
  let e = {
    velocity: M.velocity,
    stiffness: M.stiffness,
    damping: M.damping,
    mass: M.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!Ft(t, Rs) && Ft(t, Fs))
    if (t.visualDuration) {
      const n = t.visualDuration, s = 2 * Math.PI / (n * 1.2), r = s * s, i = 2 * Y(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(r);
      e = {
        ...e,
        mass: M.mass,
        stiffness: r,
        damping: i
      };
    } else {
      const n = Cs(t);
      e = {
        ...e,
        ...n,
        mass: M.mass
      }, e.isResolvedFromDuration = !0;
    }
  return e;
}
function rt(t = M.visualDuration, e = M.bounce) {
  const n = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: e
  } : t;
  let { restSpeed: s, restDelta: r } = n;
  const i = n.keyframes[0], o = n.keyframes[n.keyframes.length - 1], a = { done: !1, value: i }, { stiffness: l, damping: u, mass: c, duration: d, velocity: f, isResolvedFromDuration: y } = Is({
    ...n,
    velocity: -/* @__PURE__ */ N(n.velocity || 0)
  }), g = f || 0, T = u / (2 * Math.sqrt(l * c)), v = o - i, h = /* @__PURE__ */ N(Math.sqrt(l / c)), w = Math.abs(v) < 5;
  s || (s = w ? M.restSpeed.granular : M.restSpeed.default), r || (r = w ? M.restDelta.granular : M.restDelta.default);
  let V;
  if (T < 1) {
    const m = Ue(h, T);
    V = (S) => {
      const E = Math.exp(-T * h * S);
      return o - E * ((g + T * h * v) / m * Math.sin(m * S) + v * Math.cos(m * S));
    };
  } else if (T === 1)
    V = (m) => o - Math.exp(-h * m) * (v + (g + h * v) * m);
  else {
    const m = h * Math.sqrt(T * T - 1);
    V = (S) => {
      const E = Math.exp(-T * h * S), b = Math.min(m * S, 300);
      return o - E * ((g + T * h * v) * Math.sinh(b) + m * v * Math.cosh(b)) / m;
    };
  }
  const x = {
    calculatedDuration: y && d || null,
    next: (m) => {
      const S = V(m);
      if (y)
        a.done = m >= d;
      else {
        let E = 0;
        T < 1 && (E = m === 0 ? /* @__PURE__ */ B(g) : hn(V, m, S));
        const b = Math.abs(E) <= s, A = Math.abs(o - S) <= r;
        a.done = b && A;
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
function Os(t, e = 100, n) {
  const s = n({ ...t, keyframes: [0, e] }), r = Math.min(st(s), Ee);
  return {
    type: "keyframes",
    ease: (i) => s.next(r * i).value / e,
    duration: /* @__PURE__ */ N(r)
  };
}
function Oe(t) {
  return typeof t == "function";
}
const Ls = (t, e, n) => {
  const s = e - t;
  return ((n - t) % s + s) % s + t;
}, mn = (t) => Array.isArray(t) && typeof t[0] != "number";
function pn(t, e) {
  return mn(t) ? t[Ls(0, t.length, e)] : t;
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
const D = (t) => !!(t && t.getVelocity);
function it(t) {
  return typeof t == "object" && !Array.isArray(t);
}
function vn(t, e, n, s) {
  return typeof t == "string" && it(e) ? Vs(t, n, s) : t instanceof NodeList ? Array.from(t) : Array.isArray(t) ? t : [t];
}
function ks(t, e, n) {
  return t * (e + 1);
}
function Rt(t, e, n, s) {
  var r;
  return typeof e == "number" ? e : e.startsWith("-") || e.startsWith("+") ? Math.max(0, t + parseFloat(e)) : e === "<" ? n : (r = s.get(e)) !== null && r !== void 0 ? r : t;
}
function Bs(t, e) {
  t.indexOf(e) === -1 && t.push(e);
}
function wn(t, e) {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}
function Ns(t, e, n) {
  for (let s = 0; s < t.length; s++) {
    const r = t[s];
    r.at > e && r.at < n && (wn(t, r), s--);
  }
}
function Ks(t, e, n, s, r, i) {
  Ns(t, r, i);
  for (let o = 0; o < e.length; o++)
    t.push({
      value: e[o],
      at: pe(r, i, s[o]),
      easing: pn(n, o)
    });
}
function _s(t, e) {
  for (let n = 0; n < t.length; n++)
    t[n] = t[n] / (e + 1);
}
function qs(t, e) {
  return t.at === e.at ? t.value === null ? 1 : e.value === null ? -1 : 0 : t.at - e.at;
}
const Hs = "easeInOut";
function Ws(t, { defaultTransition: e = {}, ...n } = {}, s, r) {
  const i = e.duration || 0.3, o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), l = {}, u = /* @__PURE__ */ new Map();
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
    const V = (x, m, S, E = 0, b = 0) => {
      const A = $s(x), { delay: F = 0, times: O = yn(A), type: Be = "keyframes", repeat: ve, repeatType: Fo, repeatDelay: Ro = 0, ...bs } = m;
      let { ease: K = e.ease || "easeOut", duration: R } = m;
      const bt = typeof F == "function" ? F(E, b) : F, St = A.length, At = Oe(Be) ? Be : r == null ? void 0 : r[Be];
      if (St <= 2 && At) {
        let ie = 100;
        if (St === 2 && js(A)) {
          const oe = A[1] - A[0];
          ie = Math.abs(oe);
        }
        const we = { ...bs };
        R !== void 0 && (we.duration = /* @__PURE__ */ B(R));
        const Te = Os(we, ie, At);
        K = Te.ease, R = Te.duration;
      }
      R ?? (R = i);
      const Vt = d + bt;
      O.length === 1 && O[0] === 0 && (O[1] = 1);
      const xt = O.length - A.length;
      if (xt > 0 && gn(O, xt), A.length === 1 && A.unshift(null), ve) {
        R = ks(R, ve);
        const ie = [...A], we = [...O];
        K = Array.isArray(K) ? [...K] : [K];
        const Te = [...K];
        for (let oe = 0; oe < ve; oe++) {
          A.push(...ie);
          for (let ae = 0; ae < ie.length; ae++)
            O.push(we[ae] + (oe + 1)), K.push(ae === 0 ? "linear" : pn(Te, ae - 1));
        }
        _s(O, ve);
      }
      const Mt = Vt + R;
      Ks(S, A, K, O, Vt, Mt), w = Math.max(bt + R, w), f = Math.max(Mt, f);
    };
    if (D(T)) {
      const x = It(T, a);
      V(v, h, Ot("default", x));
    } else {
      const x = vn(T, v, s, l), m = x.length;
      for (let S = 0; S < m; S++) {
        v = v, h = h;
        const E = x[S], b = It(E, a);
        for (const A in v)
          V(v[A], Gs(h, A), Ot(A, b), S, m);
      }
    }
    c = d, d += w;
  }
  return a.forEach((y, g) => {
    for (const T in y) {
      const v = y[T];
      v.sort(qs);
      const h = [], w = [], V = [];
      for (let m = 0; m < v.length; m++) {
        const { at: S, value: E, easing: b } = v[m];
        h.push(E), w.push(/* @__PURE__ */ Ie(0, f, S)), V.push(b || "easeOut");
      }
      w[0] !== 0 && (w.unshift(0), h.unshift(h[0]), V.unshift(Hs)), w[w.length - 1] !== 1 && (w.push(1), h.push(null)), o.has(g) || o.set(g, {
        keyframes: {},
        transition: {}
      });
      const x = o.get(g);
      x.keyframes[T] = h, x.transition[T] = {
        ...e,
        duration: f,
        ease: V,
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
function $s(t) {
  return Array.isArray(t) ? t : [t];
}
function Gs(t, e) {
  return t && t[e] ? {
    ...t,
    ...t[e]
  } : { ...t };
}
const Us = (t) => typeof t == "number", js = (t) => t.every(Us), de = /* @__PURE__ */ new WeakMap();
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
]), zs = (t) => Array.isArray(t), Ys = (t) => zs(t) ? t[t.length - 1] || 0 : t, Xs = {
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
function Zs(t, e) {
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
const Qs = 40;
function Js(t, e) {
  let n = !1, s = !0;
  const r = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, i = () => n = !0, o = be.reduce((h, w) => (h[w] = Zs(i), h), {}), { read: a, resolveKeyframes: l, update: u, preRender: c, render: d, postRender: f } = o, y = () => {
    const h = performance.now();
    n = !1, r.delta = s ? 1e3 / 60 : Math.max(Math.min(h - r.timestamp, Qs), 1), r.timestamp = h, r.isProcessing = !0, a.process(r), l.process(r), u.process(r), c.process(r), d.process(r), f.process(r), r.isProcessing = !1, n && e && (s = !1, t(y));
  }, g = () => {
    n = !0, s = !0, r.isProcessing || t(y);
  };
  return { schedule: be.reduce((h, w) => {
    const V = o[w];
    return h[w] = (x, m = !1, S = !1) => (n || g(), V.schedule(x, m, S)), h;
  }, {}), cancel: (h) => {
    for (let w = 0; w < be.length; w++)
      o[be[w]].cancel(h);
  }, state: r, steps: o };
}
const { schedule: L, cancel: je, state: Ce, steps: Oo } = Js(typeof requestAnimationFrame < "u" ? requestAnimationFrame : z, !0);
let xe;
function er() {
  xe = void 0;
}
const q = {
  now: () => (xe === void 0 && q.set(Ce.isProcessing || Xs.useManualTiming ? Ce.timestamp : performance.now()), xe),
  set: (t) => {
    xe = t, queueMicrotask(er);
  }
};
class Sn {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return Bs(this.subscriptions, e), () => wn(this.subscriptions, e);
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
const Lt = 30, tr = (t) => !isNaN(parseFloat(t));
class nr {
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
      const i = q.now();
      this.updatedAt !== i && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && this.events.change && this.events.change.notify(this.current), r && this.events.renderRequest && this.events.renderRequest.notify(this.current);
    }, this.hasAnimated = !1, this.setCurrent(e), this.owner = n.owner;
  }
  setCurrent(e) {
    this.current = e, this.updatedAt = q.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = tr(this.current));
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
  return new nr(t, e);
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
function sr(t, e, n) {
  const s = t.getProps();
  return An(s, e, s.custom, t);
}
function rr(t, e, n) {
  t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, fe(n));
}
function ir(t, e) {
  const n = sr(t, e);
  let { transitionEnd: s = {}, transition: r = {}, ...i } = n || {};
  i = { ...i, ...s };
  for (const o in i) {
    const a = Ys(i[o]);
    rr(t, o, a);
  }
}
function or(t) {
  return !!(D(t) && t.add);
}
function ar(t, e) {
  const n = t.getValue("willChange");
  if (or(n))
    return n.add(e);
}
const ot = (t) => t.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), lr = "framerAppearId", cr = "data-" + ot(lr);
function ur(t) {
  return t.props[cr];
}
function Bt(t, e) {
  t.timeline = e, t.onfinish = null;
}
const at = (t) => Array.isArray(t) && typeof t[0] == "number", dr = {
  linearEasing: void 0
};
function fr(t, e) {
  const n = /* @__PURE__ */ nt(t);
  return () => {
    var s;
    return (s = dr[e]) !== null && s !== void 0 ? s : n();
  };
}
const Pe = /* @__PURE__ */ fr(() => {
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
const Mn = (t, e, n) => (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t, hr = 1e-7, mr = 12;
function pr(t, e, n, s, r) {
  let i, o, a = 0;
  do
    o = e + (n - e) / 2, i = Mn(o, s, r) - t, i > 0 ? n = o : e = o;
  while (Math.abs(i) > hr && ++a < mr);
  return o;
}
function ge(t, e, n, s) {
  if (t === e && n === s)
    return z;
  const r = (i) => pr(i, 0, 1, t, n);
  return (i) => i === 0 || i === 1 ? i : Mn(r(i), e, s);
}
const En = (t) => (e) => e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2, Cn = (t) => (e) => 1 - t(1 - e), Pn = /* @__PURE__ */ ge(0.33, 1.53, 0.69, 0.99), lt = /* @__PURE__ */ Cn(Pn), Dn = /* @__PURE__ */ En(lt), Fn = (t) => (t *= 2) < 1 ? 0.5 * lt(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), ct = (t) => 1 - Math.sin(Math.acos(t)), gr = Cn(ct), Rn = En(ct), In = (t) => /^0[^.\s]+$/u.test(t);
function yr(t) {
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
function vr(t) {
  return t == null;
}
const wr = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, dt = (t, e) => (n) => !!(typeof n == "string" && wr.test(n) && n.startsWith(t) || e && !vr(n) && Object.prototype.hasOwnProperty.call(n, e)), On = (t, e, n) => (s) => {
  if (typeof s != "string")
    return s;
  const [r, i, o, a] = s.match(ut);
  return {
    [t]: parseFloat(r),
    [e]: parseFloat(i),
    [n]: parseFloat(o),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, Tr = (t) => Y(0, 255, t), Ke = {
  ...se,
  transform: (t) => Math.round(Tr(t))
}, W = {
  test: /* @__PURE__ */ dt("rgb", "red"),
  parse: /* @__PURE__ */ On("red", "green", "blue"),
  transform: ({ red: t, green: e, blue: n, alpha: s = 1 }) => "rgba(" + Ke.transform(t) + ", " + Ke.transform(e) + ", " + Ke.transform(n) + ", " + ue(he.transform(s)) + ")"
};
function br(t) {
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
  parse: br,
  transform: W.transform
}, ye = (t) => ({
  test: (e) => typeof e == "string" && e.endsWith(t) && e.split(" ").length === 1,
  parse: parseFloat,
  transform: (e) => `${e}${t}`
}), _ = /* @__PURE__ */ ye("deg"), J = /* @__PURE__ */ ye("%"), p = /* @__PURE__ */ ye("px"), Sr = /* @__PURE__ */ ye("vh"), Ar = /* @__PURE__ */ ye("vw"), Nt = {
  ...J,
  parse: (t) => J.parse(t) / 100,
  transform: (t) => J.transform(t * 100)
}, Z = {
  test: /* @__PURE__ */ dt("hsl", "hue"),
  parse: /* @__PURE__ */ On("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: e, lightness: n, alpha: s = 1 }) => "hsla(" + Math.round(t) + ", " + J.transform(ue(e)) + ", " + J.transform(ue(n)) + ", " + ue(he.transform(s)) + ")"
}, P = {
  test: (t) => W.test(t) || Ye.test(t) || Z.test(t),
  parse: (t) => W.test(t) ? W.parse(t) : Z.test(t) ? Z.parse(t) : Ye.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? W.transform(t) : Z.transform(t)
}, Vr = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function xr(t) {
  var e, n;
  return isNaN(t) && typeof t == "string" && (((e = t.match(ut)) === null || e === void 0 ? void 0 : e.length) || 0) + (((n = t.match(Vr)) === null || n === void 0 ? void 0 : n.length) || 0) > 0;
}
const Ln = "number", kn = "color", Mr = "var", Er = "var(", Kt = "${}", Cr = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function me(t) {
  const e = t.toString(), n = [], s = {
    color: [],
    number: [],
    var: []
  }, r = [];
  let i = 0;
  const a = e.replace(Cr, (l) => (P.test(l) ? (s.color.push(i), r.push(kn), n.push(P.parse(l))) : l.startsWith(Er) ? (s.var.push(i), r.push(Mr), n.push(l)) : (s.number.push(i), r.push(Ln), n.push(parseFloat(l))), ++i, Kt)).split(Kt);
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
        a === Ln ? i += ue(r[o]) : a === kn ? i += P.transform(r[o]) : i += r[o];
      }
    return i;
  };
}
const Pr = (t) => typeof t == "number" ? 0 : t;
function Dr(t) {
  const e = Bn(t);
  return Nn(t)(e.map(Pr));
}
const re = {
  test: xr,
  parse: Bn,
  createTransformer: Nn,
  getAnimatableNone: Dr
}, Fr = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function Rr(t) {
  const [e, n] = t.slice(0, -1).split("(");
  if (e === "drop-shadow")
    return t;
  const [s] = n.match(ut) || [];
  if (!s)
    return t;
  const r = n.replace(s, "");
  let i = Fr.has(e) ? 1 : 0;
  return s !== n && (i *= 100), e + "(" + i + r + ")";
}
const Ir = /\b([a-z-]*)\(.*?\)/gu, Xe = {
  ...re,
  getAnimatableNone: (t) => {
    const e = t.match(Ir);
    return e ? e.map(Rr).join(" ") : t;
  }
}, Or = {
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
}, Lr = {
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
  ...Or,
  ...Lr,
  zIndex: _t,
  size: p,
  // SVG
  fillOpacity: he,
  strokeOpacity: he,
  numOctaves: _t
}, kr = {
  ...ft,
  // Color props
  color: P,
  backgroundColor: P,
  outlineColor: P,
  fill: P,
  stroke: P,
  // Border props
  borderColor: P,
  borderTopColor: P,
  borderRightColor: P,
  borderBottomColor: P,
  borderLeftColor: P,
  filter: Xe,
  WebkitFilter: Xe
}, ht = (t) => kr[t];
function Kn(t, e) {
  let n = ht(t);
  return n !== Xe && (n = re), n.getAnimatableNone ? n.getAnimatableNone(e) : void 0;
}
const Br = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function Nr(t, e, n) {
  let s = 0, r;
  for (; s < t.length && !r; ) {
    const i = t[s];
    typeof i == "string" && !Br.has(i) && me(i).values.length && (r = t[s]), s++;
  }
  if (r && n)
    for (const i of e)
      t[i] = Kn(n, r);
}
const qt = (t) => t === se || t === p, Ht = (t, e) => parseFloat(t.split(", ")[e]), Wt = (t, e) => (n, { transform: s }) => {
  if (s === "none" || !s)
    return 0;
  const r = s.match(/^matrix3d\((.+)\)$/u);
  if (r)
    return Ht(r[1], e);
  {
    const i = s.match(/^matrix\((.+)\)$/u);
    return i ? Ht(i[1], t) : 0;
  }
}, Kr = /* @__PURE__ */ new Set(["x", "y", "z"]), _r = te.filter((t) => !Kr.has(t));
function qr(t) {
  const e = [];
  return _r.forEach((n) => {
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
      const r = qr(s);
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
function qn() {
  $.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (Qe = !0);
  });
}
function Hr() {
  qn(), _n();
}
class mt {
  constructor(e, n, s, r, i, o = !1) {
    this.isComplete = !1, this.isAsync = !1, this.needsMeasurement = !1, this.isScheduled = !1, this.unresolvedKeyframes = [...e], this.onComplete = n, this.name = s, this.motionValue = r, this.element = i, this.isAsync = o;
  }
  scheduleResolve() {
    this.isScheduled = !0, this.isAsync ? ($.add(this), Ze || (Ze = !0, L.read(qn), L.resolveKeyframes(_n))) : (this.readKeyframes(), this.complete());
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
const Hn = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t), Wn = (t) => (e) => typeof e == "string" && e.startsWith(t), $n = /* @__PURE__ */ Wn("--"), Wr = /* @__PURE__ */ Wn("var(--"), pt = (t) => Wr(t) ? $r.test(t.split("/*")[0].trim()) : !1, $r = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, Gr = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function Ur(t) {
  const e = Gr.exec(t);
  if (!e)
    return [,];
  const [, n, s, r] = e;
  return [`--${n ?? s}`, r];
}
function Gn(t, e, n = 1) {
  const [s, r] = Ur(t);
  if (!s)
    return;
  const i = window.getComputedStyle(e).getPropertyValue(s);
  if (i) {
    const o = i.trim();
    return Hn(o) ? parseFloat(o) : o;
  }
  return pt(r) ? Gn(r, e, n + 1) : r;
}
const Un = (t) => (e) => e.test(t), jr = {
  test: (t) => t === "auto",
  parse: (t) => t
}, jn = [se, p, J, _, Ar, Sr, jr], $t = (t) => jn.find(Un(t));
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
    if (this.resolveNoneKeyframes(), !bn.has(s) || e.length !== 2)
      return;
    const [r, i] = e, o = $t(r), a = $t(i);
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
      yr(e[r]) && s.push(r);
    s.length && Nr(e, s, n);
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
const Gt = (t, e) => e === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(re.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function zr(t) {
  const e = t[0];
  if (t.length === 1)
    return !0;
  for (let n = 0; n < t.length; n++)
    if (t[n] !== e)
      return !0;
}
function Yr(t, e, n, s) {
  const r = t[0];
  if (r === null)
    return !1;
  if (e === "display" || e === "visibility")
    return !0;
  const i = t[t.length - 1], o = Gt(r, e), a = Gt(i, e);
  return !o || !a ? !1 : zr(t) || (n === "spring" || Oe(n)) && s;
}
const Xr = (t) => t !== null;
function Le(t, { repeat: e, repeatType: n = "loop" }, s) {
  const r = t.filter(Xr), i = e && n !== "loop" && e % 2 === 1 ? 0 : r.length - 1;
  return !i || s === void 0 ? r[i] : s;
}
const Zr = 40;
class Yn {
  constructor({ autoplay: e = !0, delay: n = 0, type: s = "keyframes", repeat: r = 0, repeatDelay: i = 0, repeatType: o = "loop", ...a }) {
    this.isStopped = !1, this.hasAttemptedResolve = !1, this.createdAt = q.now(), this.options = {
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
    return this.resolvedAt ? this.resolvedAt - this.createdAt > Zr ? this.resolvedAt : this.createdAt : this.createdAt;
  }
  /**
   * A getter for resolved data. If keyframes are not yet resolved, accessing
   * this.resolved will synchronously flush all pending keyframe resolvers.
   * This is a deoptimisation, but at its worst still batches read/writes.
   */
  get resolved() {
    return !this._resolved && !this.hasAttemptedResolve && Hr(), this._resolved;
  }
  /**
   * A method to be called when the keyframes resolver completes. This method
   * will check if its possible to run the animation and, if not, skip it.
   * Otherwise, it will call initPlayback on the implementing class.
   */
  onKeyframesResolved(e, n) {
    this.resolvedAt = q.now(), this.hasAttemptedResolve = !0;
    const { name: s, type: r, velocity: i, delay: o, onComplete: a, onUpdate: l, isGenerator: u } = this.options;
    if (!u && !Yr(e, s, r, i))
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
function Qr({ hue: t, saturation: e, lightness: n, alpha: s }) {
  t /= 360, e /= 100, n /= 100;
  let r = 0, i = 0, o = 0;
  if (!e)
    r = i = o = n;
  else {
    const a = n < 0.5 ? n * (1 + e) : n + e - n * e, l = 2 * n - a;
    r = _e(l, a, t + 1 / 3), i = _e(l, a, t), o = _e(l, a, t - 1 / 3);
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
const qe = (t, e, n) => {
  const s = t * t, r = n * (e * e - s) + s;
  return r < 0 ? 0 : Math.sqrt(r);
}, Jr = [Ye, W, Z], ei = (t) => Jr.find((e) => e.test(t));
function Ut(t) {
  const e = ei(t);
  if (!e)
    return !1;
  let n = e.parse(t);
  return e === Z && (n = Qr(n)), n;
}
const jt = (t, e) => {
  const n = Ut(t), s = Ut(e);
  if (!n || !s)
    return De(t, e);
  const r = { ...n };
  return (i) => (r.red = qe(n.red, s.red, i), r.green = qe(n.green, s.green, i), r.blue = qe(n.blue, s.blue, i), r.alpha = pe(n.alpha, s.alpha, i), W.transform(r));
}, ti = (t, e) => (n) => e(t(n)), gt = (...t) => t.reduce(ti), Je = /* @__PURE__ */ new Set(["none", "hidden"]);
function ni(t, e) {
  return Je.has(t) ? (n) => n <= 0 ? t : e : (n) => n >= 1 ? e : t;
}
function si(t, e) {
  return (n) => pe(t, e, n);
}
function yt(t) {
  return typeof t == "number" ? si : typeof t == "string" ? pt(t) ? De : P.test(t) ? jt : oi : Array.isArray(t) ? Xn : typeof t == "object" ? P.test(t) ? jt : ri : De;
}
function Xn(t, e) {
  const n = [...t], s = n.length, r = t.map((i, o) => yt(i)(i, e[o]));
  return (i) => {
    for (let o = 0; o < s; o++)
      n[o] = r[o](i);
    return n;
  };
}
function ri(t, e) {
  const n = { ...t, ...e }, s = {};
  for (const r in n)
    t[r] !== void 0 && e[r] !== void 0 && (s[r] = yt(t[r])(t[r], e[r]));
  return (r) => {
    for (const i in s)
      n[i] = s[i](r);
    return n;
  };
}
function ii(t, e) {
  var n;
  const s = [], r = { color: 0, var: 0, number: 0 };
  for (let i = 0; i < e.values.length; i++) {
    const o = e.types[i], a = t.indexes[o][r[o]], l = (n = t.values[a]) !== null && n !== void 0 ? n : 0;
    s[i] = l, r[o]++;
  }
  return s;
}
const oi = (t, e) => {
  const n = re.createTransformer(e), s = me(t), r = me(e);
  return s.indexes.var.length === r.indexes.var.length && s.indexes.color.length === r.indexes.color.length && s.indexes.number.length >= r.indexes.number.length ? Je.has(t) && !r.values.length || Je.has(e) && !s.values.length ? ni(t, e) : gt(Xn(ii(s, r), r.values), n) : De(t, e);
};
function Zn(t, e, n) {
  return typeof t == "number" && typeof e == "number" && typeof n == "number" ? pe(t, e, n) : yt(t)(t, e);
}
function zt({ keyframes: t, velocity: e = 0, power: n = 0.8, timeConstant: s = 325, bounceDamping: r = 10, bounceStiffness: i = 500, modifyTarget: o, min: a, max: l, restDelta: u = 0.5, restSpeed: c }) {
  const d = t[0], f = {
    done: !1,
    value: d
  }, y = (b) => a !== void 0 && b < a || l !== void 0 && b > l, g = (b) => a === void 0 ? l : l === void 0 || Math.abs(a - b) < Math.abs(l - b) ? a : l;
  let T = n * e;
  const v = d + T, h = o === void 0 ? v : o(v);
  h !== v && (T = h - d);
  const w = (b) => -T * Math.exp(-b / s), V = (b) => h + w(b), x = (b) => {
    const A = w(b), F = V(b);
    f.done = Math.abs(A) <= u, f.value = f.done ? h : F;
  };
  let m, S;
  const E = (b) => {
    y(f.value) && (m = b, S = rt({
      keyframes: [f.value, g(f.value)],
      velocity: hn(V, b, f.value),
      // TODO: This should be passing * 1000
      damping: r,
      stiffness: i,
      restDelta: u,
      restSpeed: c
    }));
  };
  return E(0), {
    calculatedDuration: null,
    next: (b) => {
      let A = !1;
      return !S && m === void 0 && (A = !0, x(b), E(b)), m !== void 0 && b >= m ? S.next(b - m) : (!A && x(b), f);
    }
  };
}
const ai = /* @__PURE__ */ ge(0.42, 0, 1, 1), li = /* @__PURE__ */ ge(0, 0, 0.58, 1), Qn = /* @__PURE__ */ ge(0.42, 0, 0.58, 1), Yt = {
  linear: z,
  easeIn: ai,
  easeInOut: Qn,
  easeOut: li,
  circIn: ct,
  circInOut: Rn,
  circOut: gr,
  backIn: lt,
  backInOut: Dn,
  backOut: Pn,
  anticipate: Fn
}, Xt = (t) => {
  if (at(t)) {
    Ge(t.length === 4);
    const [e, n, s, r] = t;
    return ge(e, n, s, r);
  } else if (typeof t == "string")
    return Ge(Yt[t] !== void 0), Yt[t];
  return t;
};
function ci(t, e, n) {
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
function ui(t, e, { clamp: n = !0, ease: s, mixer: r } = {}) {
  const i = t.length;
  if (Ge(i === e.length), i === 1)
    return () => e[0];
  if (i === 2 && e[0] === e[1])
    return () => e[1];
  const o = t[0] === t[1];
  t[0] > t[i - 1] && (t = [...t].reverse(), e = [...e].reverse());
  const a = ci(e, s, r), l = a.length, u = (c) => {
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
function di(t, e) {
  return t.map((n) => n * e);
}
function fi(t, e) {
  return t.map(() => e || Qn).splice(0, t.length - 1);
}
function Fe({ duration: t = 300, keyframes: e, times: n, ease: s = "easeInOut" }) {
  const r = mn(s) ? s.map(Xt) : Xt(s), i = {
    done: !1,
    value: e[0]
  }, o = di(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === e.length ? n : yn(e),
    t
  ), a = ui(o, e, {
    ease: Array.isArray(r) ? r : fi(e, r)
  });
  return {
    calculatedDuration: t,
    next: (l) => (i.value = a(l), i.done = l >= t, i)
  };
}
const hi = (t) => {
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
}, mi = {
  decay: zt,
  inertia: zt,
  tween: Fe,
  keyframes: Fe,
  spring: rt
}, pi = (t) => t / 100;
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
    const { type: n = "keyframes", repeat: s = 0, repeatDelay: r = 0, repeatType: i, velocity: o = 0 } = this.options, a = Oe(n) ? n : mi[n] || Fe;
    let l, u;
    a !== Fe && typeof e[0] != "number" && (l = gt(pi, Zn(e[0], e[1])), e = [0, 100]);
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
      const { keyframes: b } = this.options;
      return { done: !0, value: b[b.length - 1] };
    }
    const { finalKeyframe: r, generator: i, mirroredGenerator: o, mapPercentToKeyframes: a, keyframes: l, calculatedDuration: u, totalDuration: c, resolvedDuration: d } = s;
    if (this.startTime === null)
      return i.next(0);
    const { delay: f, repeat: y, repeatType: g, repeatDelay: T, onUpdate: v } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - c / this.speed, this.startTime)), n ? this.currentTime = e : this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = Math.round(e - this.startTime) * this.speed;
    const h = this.currentTime - f * (this.speed >= 0 ? 1 : -1), w = this.speed >= 0 ? h < 0 : h > c;
    this.currentTime = Math.max(h, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = c);
    let V = this.currentTime, x = i;
    if (y) {
      const b = Math.min(this.currentTime, c) / d;
      let A = Math.floor(b), F = b % 1;
      !F && b >= 1 && (F = 1), F === 1 && A--, A = Math.min(A, y + 1), !!(A % 2) && (g === "reverse" ? (F = 1 - F, T && (F -= T / d)) : g === "mirror" && (x = o)), V = Y(0, 1, F) * d;
    }
    const m = w ? { done: !1, value: l[0] } : x.next(V);
    a && (m.value = a(m.value));
    let { done: S } = m;
    !w && u !== null && (S = this.speed >= 0 ? this.currentTime >= c : this.currentTime <= 0);
    const E = this.holdTime === null && (this.state === "finished" || this.state === "running" && S);
    return E && r !== void 0 && (m.value = Le(l, this.options, r)), v && v(m.value), E && this.finish(), m;
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
    const { driver: e = hi, onPlay: n, startTime: s } = this.options;
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
const gi = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]);
function yi(t, e, n, { delay: s = 0, duration: r = 300, repeat: i = 0, repeatType: o = "loop", ease: a = "easeInOut", times: l } = {}) {
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
const vi = /* @__PURE__ */ nt(() => Object.hasOwnProperty.call(Element.prototype, "animate")), Re = 10, wi = 2e4;
function Ti(t) {
  return Oe(t.type) || t.type === "spring" || !Vn(t.ease);
}
function bi(t, e) {
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
  for (; !s.done && i < wi; )
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
function Si(t) {
  return t in Jn;
}
class Zt extends Yn {
  constructor(e) {
    super(e);
    const { name: n, motionValue: s, element: r, keyframes: i } = this.options;
    this.resolver = new zn(i, (o, a) => this.onKeyframesResolved(o, a), n, s, r), this.resolver.scheduleResolve();
  }
  initPlayback(e, n) {
    let { duration: s = 300, times: r, ease: i, type: o, motionValue: a, name: l, startTime: u } = this.options;
    if (!a.owner || !a.owner.current)
      return !1;
    if (typeof i == "string" && Pe() && Si(i) && (i = Jn[i]), Ti(this.options)) {
      const { onComplete: d, onUpdate: f, motionValue: y, element: g, ...T } = this.options, v = bi(e, T);
      e = v.keyframes, e.length === 1 && (e[1] = e[0]), s = v.duration, r = v.times, i = v.ease, o = "keyframes";
    }
    const c = yi(a.owner.current, l, e, { ...this.options, duration: s, times: r, ease: i });
    return c.startTime = u ?? this.calcStartTime(), this.pendingTimeline ? (Bt(c, this.pendingTimeline), this.pendingTimeline = void 0) : c.onfinish = () => {
      const { onComplete: d } = this.options;
      a.set(Le(e, this.options, n)), d && d(), this.cancel(), this.resolveFinishedPromise();
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
    const { motionValue: n, name: s, repeatDelay: r, repeatType: i, damping: o, type: a } = e;
    if (!n || !n.owner || !(n.owner.current instanceof HTMLElement))
      return !1;
    const { onUpdate: l, transformTemplate: u } = n.owner.getProps();
    return vi() && s && gi.has(s) && /**
     * If we're outputting values to onUpdate then we can't use WAAPI as there's
     * no way to read the value from WAAPI every frame.
     */
    !l && !u && !r && i !== "mirror" && o !== 0 && a !== "inertia";
  }
}
const Ai = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, Vi = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), xi = {
  type: "keyframes",
  duration: 0.8
}, Mi = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, Ei = (t, { keyframes: e }) => e.length > 2 ? xi : ne.has(t) ? t.startsWith("scale") ? Vi(e[1]) : Ai : Mi;
function Ci({ when: t, delay: e, delayChildren: n, staggerChildren: s, staggerDirection: r, repeat: i, repeatType: o, repeatDelay: a, from: l, elapsed: u, ...c }) {
  return !!Object.keys(c).length;
}
const es = (t, e, n, s = {}, r, i) => (o) => {
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
    element: i ? void 0 : r
  };
  Ci(a) || (c = {
    ...c,
    ...Ei(t, c)
  }), c.duration && (c.duration = /* @__PURE__ */ B(c.duration)), c.repeatDelay && (c.repeatDelay = /* @__PURE__ */ B(c.repeatDelay)), c.from !== void 0 && (c.keyframes[0] = c.from);
  let d = !1;
  if ((c.type === !1 || c.duration === 0 && !c.repeatDelay) && (c.duration = 0, c.delay === 0 && (d = !0)), d && !i && e.get() !== void 0) {
    const f = Le(c.keyframes, a);
    if (f !== void 0)
      return L.update(() => {
        c.onUpdate(f), c.onComplete();
      }), new un([]);
  }
  return !i && Zt.supports(c) ? new Zt(c) : new vt(c);
};
function Pi({ protectedKeys: t, needsAnimating: e }, n) {
  const s = t.hasOwnProperty(n) && e[n] !== !0;
  return e[n] = !1, s;
}
function Di(t, e, { delay: n = 0, transitionOverride: s, type: r } = {}) {
  var i;
  let { transition: o = t.getDefaultTransition(), transitionEnd: a, ...l } = e;
  s && (o = s);
  const u = [], c = r && t.animationState && t.animationState.getState()[r];
  for (const d in l) {
    const f = t.getValue(d, (i = t.latestValues[d]) !== null && i !== void 0 ? i : null), y = l[d];
    if (y === void 0 || c && Pi(c, d))
      continue;
    const g = {
      delay: n,
      ...Tn(o || {}, d)
    };
    let T = !1;
    if (window.MotionHandoffAnimation) {
      const h = ur(t);
      if (h) {
        const w = window.MotionHandoffAnimation(h, d, L);
        w !== null && (g.startTime = w, T = !0);
      }
    }
    ar(t, d), f.start(es(d, f, y, t.shouldReduceMotion && bn.has(d) ? { type: !1 } : g, t, T));
    const v = f.animation;
    v && u.push(v);
  }
  return a && Promise.all(u).then(() => {
    L.update(() => {
      a && ir(t, a);
    });
  }), u;
}
function Fi(t) {
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
const Ri = typeof window < "u", tt = { current: null }, ts = { current: !1 };
function Ii() {
  if (ts.current = !0, !!Ri)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), e = () => tt.current = t.matches;
      t.addListener(e), e();
    } else
      tt.current = !1;
}
const Oi = [...jn, P, re], Li = (t) => Oi.find(Un(t));
function ki(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function Bi(t) {
  return typeof t == "string" || Array.isArray(t);
}
const Ni = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Ki = ["initial", ...Ni];
function ns(t) {
  return ki(t.animate) || Ki.some((e) => Bi(t[e]));
}
function _i(t) {
  return !!(ns(t) || t.variants);
}
function qi(t, e, n) {
  for (const s in e) {
    const r = e[s], i = n[s];
    if (D(r))
      t.addValue(s, r);
    else if (D(i))
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
  constructor({ parent: e, props: n, presenceContext: s, reducedMotionConfig: r, blockInitialAnimation: i, visualState: o }, a = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = mt, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const y = q.now();
      this.renderScheduledAt < y && (this.renderScheduledAt = y, L.render(this.render, !1, !0));
    };
    const { latestValues: l, renderState: u, onUpdate: c } = o;
    this.onUpdate = c, this.latestValues = l, this.baseTarget = { ...l }, this.initialValues = n.initial ? { ...l } : {}, this.renderState = u, this.parent = e, this.props = n, this.presenceContext = s, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = r, this.options = a, this.blockInitialAnimation = !!i, this.isControllingVariants = ns(n), this.isVariantNode = _i(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
    const { willChange: d, ...f } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const y in f) {
      const g = f[y];
      l[y] !== void 0 && D(g) && g.set(l[y], !1);
    }
  }
  mount(e) {
    this.current = e, de.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((n, s) => this.bindToMotionValue(s, n)), ts.current || Ii(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : tt.current, this.parent && this.parent.children.add(this), this.update(this.props, this.presenceContext);
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
      this.latestValues[e] = a, this.props.onUpdate && L.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0);
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
    for (let s = 0; s < en.length; s++) {
      const r = en[s];
      this.propEventSubscriptions[r] && (this.propEventSubscriptions[r](), delete this.propEventSubscriptions[r]);
      const i = "on" + r, o = e[i];
      o && (this.propEventSubscriptions[r] = this.on(r, o));
    }
    this.prevMotionValues = qi(this, this.scrapeMotionValuesFromProps(e, this.prevProps, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue(), this.onUpdate && this.onUpdate(this);
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
    return r != null && (typeof r == "string" && (Hn(r) || In(r)) ? r = parseFloat(r) : !Li(r) && re.test(n) && (r = Kn(e, n)), this.setBaseTarget(e, D(r) ? r.get() : r)), D(r) ? r.get() : r;
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
    return i !== void 0 && !D(i) ? i : this.initialValues[e] !== void 0 && r === void 0 ? void 0 : this.baseTarget[e];
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
    D(e) && (this.childSubscription = e.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
}
const is = (t, e) => e && typeof t == "number" ? e.transform(t) : t, Hi = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Wi = te.length;
function $i(t, e, n) {
  let s = "", r = !0;
  for (let i = 0; i < Wi; i++) {
    const o = te[i], a = t[o];
    if (a === void 0)
      continue;
    let l = !0;
    if (typeof a == "number" ? l = a === (o.startsWith("scale") ? 1 : 0) : l = parseFloat(a) === 0, !l || n) {
      const u = is(a, ft[o]);
      if (!l) {
        r = !1;
        const c = Hi[o] || o;
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
  if (e.transform || (o || n ? s.transform = $i(e, t.transform, n) : s.transform && (s.transform = "none")), a) {
    const { originX: l = "50%", originY: u = "50%", originZ: c = 0 } = i;
    s.transformOrigin = `${l} ${u} ${c}`;
  }
}
const Gi = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, Ui = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function ji(t, e, n = 1, s = 0, r = !0) {
  t.pathLength = 1;
  const i = r ? Gi : Ui;
  t[i.offset] = p.transform(-s);
  const o = p.transform(e), a = p.transform(n);
  t[i.array] = `${o} ${a}`;
}
function tn(t, e, n) {
  return typeof t == "string" ? t : p.transform(e + n * t);
}
function zi(t, e, n) {
  const s = tn(e, t.x, t.width), r = tn(n, t.y, t.height);
  return `${s} ${r}`;
}
function Yi(t, {
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
  f.transform && (g && (y.transform = f.transform), delete f.transform), g && (r !== void 0 || i !== void 0 || y.transform) && (y.transformOrigin = zi(g, r !== void 0 ? r : 0.5, i !== void 0 ? i : 0.5)), e !== void 0 && (f.x = e), n !== void 0 && (f.y = n), s !== void 0 && (f.scale = s), o !== void 0 && ji(f, o, a, l, !1);
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
]), Xi = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function Zi(t, e) {
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
function Qi(t, e, n, s) {
  ls(t, e, void 0, s);
  for (const r in e.attrs)
    t.setAttribute(as.has(r) ? r : ot(r), e.attrs[r]);
}
const Ji = {};
function eo(t, { layout: e, layoutId: n }) {
  return ne.has(t) || t.startsWith("origin") || (e || n !== void 0) && (!!Ji[t] || t === "opacity");
}
function cs(t, e, n) {
  var s;
  const { style: r } = t, i = {};
  for (const o in r)
    (D(r[o]) || e.style && D(e.style[o]) || eo(o, t) || ((s = n == null ? void 0 : n.getValue(o)) === null || s === void 0 ? void 0 : s.liveStyle) !== void 0) && (i[o] = r[o]);
  return i;
}
function to(t, e, n) {
  const s = cs(t, e, n);
  for (const r in t)
    if (D(t[r]) || D(e[r])) {
      const i = te.indexOf(r) !== -1 ? "attr" + r.charAt(0).toUpperCase() + r.substring(1) : r;
      s[i] = t[r];
    }
  return s;
}
class no extends rs {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = wt, this.updateDimensions = () => {
      this.current && !this.renderState.dimensions && Zi(this.current, this.renderState);
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
    return to(e, n, s);
  }
  onBindTransform() {
    this.current && !this.renderState.dimensions && L.postRender(this.updateDimensions);
  }
  build(e, n, s) {
    Yi(e, n, this.isSVGTag, s.transformTemplate);
  }
  renderInstance(e, n, s, r) {
    Qi(e, n, s, r);
  }
  mount(e) {
    this.isSVGTag = Xi(e.tagName), super.mount(e);
  }
}
function so({ top: t, left: e, right: n, bottom: s }) {
  return {
    x: { min: e, max: n },
    y: { min: t, max: s }
  };
}
function ro(t, e) {
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
function io(t, e) {
  return so(ro(t.getBoundingClientRect(), e));
}
function oo(t) {
  return window.getComputedStyle(t);
}
class ao extends rs {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = ls;
  }
  readValueFromInstance(e, n) {
    if (ne.has(n)) {
      const s = ht(n);
      return s && s.default || 0;
    } else {
      const s = oo(e), r = ($n(n) ? s.getPropertyValue(n) : s[n]) || 0;
      return typeof r == "string" ? r.trim() : r;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: n }) {
    return io(e, n);
  }
  build(e, n, s) {
    os(e, n, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, n, s) {
    return cs(e, n, s);
  }
}
function lo(t, e) {
  return t in e;
}
class co extends ss {
  constructor() {
    super(...arguments), this.type = "object";
  }
  readValueFromInstance(e, n) {
    if (lo(n, e)) {
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
function uo(t) {
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
  }, n = Fi(t) ? new no(e) : new ao(e);
  n.mount(t), de.set(t, n);
}
function fo(t) {
  const e = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  }, n = new co(e);
  n.mount(t), de.set(t, n);
}
function ho(t, e, n) {
  const s = D(t) ? t : fe(t);
  return s.start(es("", s, e, n)), s.animation;
}
function mo(t, e) {
  return D(t) || typeof t == "number" || typeof t == "string" && !it(e);
}
function us(t, e, n, s) {
  const r = [];
  if (mo(t, e))
    r.push(ho(t, it(e) && e.default || e, n && (n.default || n)));
  else {
    const i = vn(t, e, s), o = i.length;
    for (let a = 0; a < o; a++) {
      const l = i[a], u = l instanceof Element ? uo : fo;
      de.has(l) || u(l);
      const c = de.get(l), d = { ...n };
      "delay" in d && typeof d.delay == "function" && (d.delay = d.delay(a, o)), r.push(...Di(c, { ...e, transition: d }, {}));
    }
  }
  return r;
}
function po(t, e, n) {
  const s = [];
  return Ws(t, e, n, { spring: rt }).forEach(({ keyframes: i, transition: o }, a) => {
    s.push(...us(a, i, o));
  }), s;
}
function go(t) {
  return Array.isArray(t) && t.some(Array.isArray);
}
function yo(t) {
  function e(n, s, r) {
    let i = [];
    return go(n) ? i = po(n, s, t) : i = us(n, s, r, t), new un(i);
  }
  return e;
}
const C = yo();
function vo(t) {
  const e = t.querySelector(".hide-code"), n = t.querySelector(".show-code");
  if (!e || !n)
    throw new Error("No hide or show code text found");
  const s = t.querySelector("summary + *");
  if (!s)
    throw new Error("No content found");
  const r = t.querySelector("summary svg");
  if (!r)
    throw new Error("No summary svg found");
  t.addEventListener("toggle", () => {
    t.open ? (C(s, { height: [0, s.scrollHeight] }, { duration: 0.2 }), C(r, { rotate: [0, 90] }, { duration: 0.2 }), C(n, { transform: "translateY(100%)" }, { duration: 0.2 }), C(e, { transform: "translateY(0)" }, { duration: 0.2, ease: "easeOut" })) : (C(s, { height: [s.scrollHeight, 0] }, { duration: 0.2 }), C(r, { rotate: [90, 0] }, { duration: 0.2 }), C(n, { transform: "translateY(0)" }, { duration: 0.2, ease: "easeOut" }), C(e, { transform: "translateY(-100%)" }, { duration: 0.2 }));
  });
}
function wo(t, e, n) {
  var s = n, r = s.noTrailing, i = r === void 0 ? !1 : r, o = s.noLeading, a = o === void 0 ? !1 : o, l = s.debounceMode, u = l === void 0 ? void 0 : l, c, d = !1, f = 0;
  function y() {
    c && clearTimeout(c);
  }
  function g(v) {
    var h = v || {}, w = h.upcomingOnly, V = w === void 0 ? !1 : w;
    y(), d = !V;
  }
  function T() {
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
  return T.cancel = g, T;
}
function To(t, e, n) {
  var s = {}, r = s.atBegin, i = r === void 0 ? !1 : r;
  return wo(t, e, {
    debounceMode: i !== !1
  });
}
class bo {
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
class So extends EventTarget {
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
const Ao = (t) => new So(t), ds = 3e3, Me = document.querySelector("#alerts");
if (!Me)
  throw new Error("Alert container not found");
const G = [], Q = Ao(!1);
Q.effect(To(50, () => {
  G.toReversed().forEach(({ element: t, interval: e }, n) => {
    Q.value ? (e.setInterval(ds - n * 250), e.pause()) : e.resume();
    const s = 1 - n * 0.1, r = n === 0 ? 0 : -10 * n, i = G.slice(0, n), o = 5;
    C(t, {
      y: Q.value ? i.reduce((a, { element: l }) => a + l.offsetHeight + o, 0) * -1 : r,
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
  let r = -10 * (n + 1), i = n === 1 ? 1 : 1 - n * 0.1;
  e && (r += 10, i -= 0.1), C(s.element, {
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
function Vo(t, e) {
  G.length === 3 && nn("top", !0);
  const n = document.createElement("div");
  n.setAttribute("role", "alert"), n.classList.add("c-toast", "z-50"), n.style.opacity = "0%";
  const s = document.createElement("span");
  if (s.textContent = t, n.append(s), e) {
    const i = document.createElement("div");
    i.innerHTML = e, n.prepend(i);
  }
  n.addEventListener("mouseenter", () => Q.value = !0), n.addEventListener("mouseleave", () => Q.value = !1), Me == null || Me.append(n), C(n, {
    y: ["100%", 0],
    scale: 1,
    opacity: 1
  }, {
    ease: "easeOut",
    duration: 0.3
  }), G.toReversed().forEach(({ element: i }, o) => {
    const a = 1 - (o + 1) * 0.1, l = -10 * (o + 1);
    C(i, {
      y: l,
      scale: a
    }, { ease: "easeOut", duration: 0.3 });
  });
  const r = new bo(() => nn("bottom", !1), ds);
  G.push({ element: n, interval: r }), r.start();
}
const xo = 5e3;
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
      setTimeout(() => (clearInterval(r), s()), xo);
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
const Eo = async (t) => {
  await Mo(t), t.forEach(He), window.addEventListener("resize", () => {
    t.forEach((e) => He(e));
  }), t.forEach((e) => {
    const n = e.contentWindow;
    if (!n)
      return;
    new ResizeObserver(() => He(e)).observe(n.document.body), n.addEventListener("keydown", (r) => {
      r.key === "k" && (r.metaKey || r.ctrlKey) && window.dispatchEvent(new Event("styleguideOpenSearch"));
    });
  }), fs();
}, We = "in2theme", Ae = {
  normal: "theme-normal",
  light: "theme-light",
  dark: "theme-dark"
}, Co = (t) => {
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
function Po() {
  const t = document.querySelector("header");
  if (!t)
    throw new Error("No header found");
  const e = () => t.getBoundingClientRect().height;
  document.documentElement.style.setProperty("--header-height", `${e()}px`), window.addEventListener("resize", () => {
    document.documentElement.style.setProperty("--header-height", `${e()}px`);
  });
}
function Do() {
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
Po();
Do();
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
  I.showModal(), await new Promise((n) => setTimeout(n, 50)), window.scrollTo(0, t), setTimeout(() => window.scrollTo(0, t), 0), setTimeout(() => window.scrollTo(0, t), 50), U.style.display = "block", gs() ? (I.style.overflowY = "hidden", j.inert = !0, C(I, { opacity: [0, 1], y: [250, 0] }, { duration: 0.3, ease: "easeOut" }), await C(U, { opacity: [0, 1] }, { duration: 0.3, ease: "easeOut" }), I.style.overflowY = "auto", j.inert = !1) : (C(I, { opacity: [0, 1], scale: [0.98, 1] }, { duration: 0.3, ease: "easeOut" }), C(U, { opacity: [0, 1] }, { duration: 0.3, ease: "easeOut" })), ke.forEach((n) => n.ariaExpanded = "true"), j.ariaExpanded = "true", ws(), setTimeout(() => document.addEventListener("click", ys), 0);
}
async function vs() {
  if (!I.open)
    return;
  document.removeEventListener("click", ys), gs() ? (C(I, { opacity: 0, y: [0, 250] }, { duration: 0.3, ease: "easeOut" }), await C(U, { opacity: 0 }, { duration: 0.3, ease: "easeOut" })) : (C(I, { opacity: 0 }, { duration: 0.3, ease: "easeOut" }), await C(U, { opacity: 0 }, { duration: 0.4, ease: "easeOut" }).then(() => U.style.display = "none")), ke.forEach((e) => e.ariaExpanded = "false"), j.ariaExpanded = "false", I.close();
}
function ws() {
  const t = j.value.toLowerCase().trim();
  let e = !1;
  ms.forEach((n) => {
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
sn.length > 0 ? Eo(sn).catch(console.error) : fs();
const rn = document.querySelector(".theme-select");
rn && Co(rn);
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
    await s(), await r(e), vo(t);
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
  const { createHtmlValidator: t, auditCode: e } = await import("./html-validator-BJtWY9cS.js");
  Ve.forEach((n) => n.addEventListener("click", async () => {
    Ve.forEach((r) => r.setAttribute("aria-expanded", "false")), n.setAttribute("disabled", "");
    const { isValid: s } = await e(n, X);
    s ? (n.classList.add("text-green-500", "!cursor-not-allowed"), Vo(
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
const on = document.querySelector("#icon-search-input"), an = document.querySelector("#icon-search-input-reset"), ln = document.querySelector("#icon-search-list");
on && ln && an && import("./icons-DKeY7vfD.js").then(({ default: t }) => t(on, ln, an)).catch(console.error);
const Ts = "data-clipboard-value", cn = document.querySelectorAll(`button[${Ts}]`);
cn.length > 0 && import("./clipboard-Ds5mbYmm.js").then(({ default: t }) => t(cn, Ts)).catch(console.error);
export {
  C as a,
  Vo as r,
  rt as s
};
