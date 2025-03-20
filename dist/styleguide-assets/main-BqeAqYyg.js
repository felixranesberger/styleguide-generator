var Os = Object.defineProperty;
var Pt = (t) => {
  throw TypeError(t);
};
var Ns = (t, e, n) => e in t ? Os(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var H = (t, e, n) => Ns(t, typeof e != "symbol" ? e + "" : e, n), It = (t, e, n) => e.has(t) || Pt("Cannot " + n);
var oe = (t, e, n) => (It(t, e, "read from private field"), n ? n.call(t) : e.get(t)), Dt = (t, e, n) => e.has(t) ? Pt("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), qe = (t, e, n, s) => (It(t, e, "write to private field"), s ? s.call(t, n) : e.set(t, n), n);
function Ks(t, e, n) {
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
const W = /* @__NO_SIDE_EFFECTS__ */ (t) => t;
let Xe = W;
const Fe = /* @__NO_SIDE_EFFECTS__ */ (t, e, n) => {
  const s = e - t;
  return s === 0 ? 1 : (n - t) / s;
};
// @__NO_SIDE_EFFECTS__
function at(t) {
  let e;
  return () => (e === void 0 && (e = t()), e);
}
const Bs = /* @__PURE__ */ at(() => window.ScrollTimeline !== void 0);
class qs {
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
      if (Bs() && r.attachTimeline)
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
class Tn extends qs {
  then(e, n) {
    return Promise.all(this.animations).then(e).catch(n);
  }
}
const O = /* @__NO_SIDE_EFFECTS__ */ (t) => t * 1e3, N = /* @__NO_SIDE_EFFECTS__ */ (t) => t / 1e3, Ce = 2e4;
function lt(t) {
  let e = 0;
  const n = 50;
  let s = t.next(e);
  for (; !s.done && e < Ce; )
    e += n, s = t.next(e);
  return e >= Ce ? 1 / 0 : e;
}
const Sn = (t, e, n = 10) => {
  let s = "";
  const r = Math.max(Math.round(e / n), 2);
  for (let i = 0; i < r; i++)
    s += t(/* @__PURE__ */ Fe(0, r - 1, i)) + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, G = (t, e, n) => n > e ? e : n < t ? t : n;
function An(t, e) {
  return e ? t * (1e3 / e) : 0;
}
const Hs = 5;
function xn(t, e, n) {
  const s = Math.max(e - Hs, 0);
  return An(n - t(s), e - s);
}
const V = {
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
}, Rt = 1e-3;
function _s({ duration: t = V.duration, bounce: e = V.bounce, velocity: n = V.velocity, mass: s = V.mass }) {
  let r, i, o = 1 - e;
  o = G(V.minDamping, V.maxDamping, o), t = G(V.minDuration, V.maxDuration, /* @__PURE__ */ N(t)), o < 1 ? (r = (c) => {
    const u = c * o, f = u * t, d = u - n, h = Ze(c, o), m = Math.exp(-f);
    return Rt - d / h * m;
  }, i = (c) => {
    const f = c * o * t, d = f * n + n, h = Math.pow(o, 2) * Math.pow(c, 2) * t, m = Math.exp(-f), v = Ze(Math.pow(c, 2), o);
    return (-r(c) + Rt > 0 ? -1 : 1) * ((d - h) * m) / v;
  }) : (r = (c) => {
    const u = Math.exp(-c * t), f = (c - n) * t + 1;
    return -1e-3 + u * f;
  }, i = (c) => {
    const u = Math.exp(-c * t), f = (n - c) * (t * t);
    return u * f;
  });
  const a = 5 / t, l = Us(r, i, a);
  if (t = /* @__PURE__ */ O(t), isNaN(l))
    return {
      stiffness: V.stiffness,
      damping: V.damping,
      duration: t
    };
  {
    const c = Math.pow(l, 2) * s;
    return {
      stiffness: c,
      damping: o * 2 * Math.sqrt(s * c),
      duration: t
    };
  }
}
const $s = 12;
function Us(t, e, n) {
  let s = n;
  for (let r = 1; r < $s; r++)
    s = s - t(s) / e(s);
  return s;
}
function Ze(t, e) {
  return t * Math.sqrt(1 - e * e);
}
const Ws = ["duration", "bounce"], Gs = ["stiffness", "damping", "mass"];
function Ft(t, e) {
  return e.some((n) => t[n] !== void 0);
}
function js(t) {
  let e = {
    velocity: V.velocity,
    stiffness: V.stiffness,
    damping: V.damping,
    mass: V.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!Ft(t, Gs) && Ft(t, Ws))
    if (t.visualDuration) {
      const n = t.visualDuration, s = 2 * Math.PI / (n * 1.2), r = s * s, i = 2 * G(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(r);
      e = {
        ...e,
        mass: V.mass,
        stiffness: r,
        damping: i
      };
    } else {
      const n = _s(t);
      e = {
        ...e,
        ...n,
        mass: V.mass
      }, e.isResolvedFromDuration = !0;
    }
  return e;
}
function Oe(t = V.visualDuration, e = V.bounce) {
  const n = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: e
  } : t;
  let { restSpeed: s, restDelta: r } = n;
  const i = n.keyframes[0], o = n.keyframes[n.keyframes.length - 1], a = { done: !1, value: i }, { stiffness: l, damping: c, mass: u, duration: f, velocity: d, isResolvedFromDuration: h } = js({
    ...n,
    velocity: -/* @__PURE__ */ N(n.velocity || 0)
  }), m = d || 0, v = c / (2 * Math.sqrt(l * u)), b = o - i, p = /* @__PURE__ */ N(Math.sqrt(l / u)), w = Math.abs(b) < 5;
  s || (s = w ? V.restSpeed.granular : V.restSpeed.default), r || (r = w ? V.restDelta.granular : V.restDelta.default);
  let A;
  if (v < 1) {
    const g = Ze(p, v);
    A = (S) => {
      const M = Math.exp(-v * p * S);
      return o - M * ((m + v * p * b) / g * Math.sin(g * S) + b * Math.cos(g * S));
    };
  } else if (v === 1)
    A = (g) => o - Math.exp(-p * g) * (b + (m + p * b) * g);
  else {
    const g = p * Math.sqrt(v * v - 1);
    A = (S) => {
      const M = Math.exp(-v * p * S), T = Math.min(g * S, 300);
      return o - M * ((m + v * p * b) * Math.sinh(T) + g * b * Math.cosh(T)) / g;
    };
  }
  const x = {
    calculatedDuration: h && f || null,
    next: (g) => {
      const S = A(g);
      if (h)
        a.done = g >= f;
      else {
        let M = 0;
        v < 1 && (M = g === 0 ? /* @__PURE__ */ O(m) : xn(A, g, S));
        const T = Math.abs(M) <= s, E = Math.abs(o - S) <= r;
        a.done = T && E;
      }
      return a.value = a.done ? o : S, a;
    },
    toString: () => {
      const g = Math.min(lt(x), Ce), S = Sn((M) => x.next(g * M).value, g, 30);
      return g + "ms " + S;
    }
  };
  return x;
}
function zs(t, e = 100, n) {
  const s = n({ ...t, keyframes: [0, e] }), r = Math.min(lt(s), Ce);
  return {
    type: "keyframes",
    ease: (i) => s.next(r * i).value / e,
    duration: /* @__PURE__ */ N(r)
  };
}
function Ne(t) {
  return typeof t == "function";
}
const Ys = (t, e, n) => {
  const s = e - t;
  return ((n - t) % s + s) % s + t;
}, En = (t) => Array.isArray(t) && typeof t[0] != "number";
function Vn(t, e) {
  return En(t) ? t[Ys(0, t.length, e)] : t;
}
const me = (t, e, n) => t + (e - t) * n;
function Mn(t, e) {
  const n = t[t.length - 1];
  for (let s = 1; s <= e; s++) {
    const r = /* @__PURE__ */ Fe(0, e, s);
    t.push(me(n, 1, r));
  }
}
function kn(t) {
  const e = [0];
  return Mn(e, t.length - 1), e;
}
const L = (t) => !!(t && t.getVelocity);
function ut(t) {
  return typeof t == "object" && !Array.isArray(t);
}
function Cn(t, e, n, s) {
  return typeof t == "string" && ut(e) ? Ks(t, n, s) : t instanceof NodeList ? Array.from(t) : Array.isArray(t) ? t : [t];
}
function Xs(t, e, n) {
  return t * (e + 1);
}
function Ot(t, e, n, s) {
  var r;
  return typeof e == "number" ? e : e.startsWith("-") || e.startsWith("+") ? Math.max(0, t + parseFloat(e)) : e === "<" ? n : (r = s.get(e)) !== null && r !== void 0 ? r : t;
}
function Zs(t, e) {
  t.indexOf(e) === -1 && t.push(e);
}
function Ln(t, e) {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}
function Js(t, e, n) {
  for (let s = 0; s < t.length; s++) {
    const r = t[s];
    r.at > e && r.at < n && (Ln(t, r), s--);
  }
}
function Qs(t, e, n, s, r, i) {
  Js(t, r, i);
  for (let o = 0; o < e.length; o++)
    t.push({
      value: e[o],
      at: me(r, i, s[o]),
      easing: Vn(n, o)
    });
}
function er(t, e) {
  for (let n = 0; n < t.length; n++)
    t[n] = t[n] / (e + 1);
}
function tr(t, e) {
  return t.at === e.at ? t.value === null ? 1 : e.value === null ? -1 : 0 : t.at - e.at;
}
const nr = "easeInOut";
function sr(t, { defaultTransition: e = {}, ...n } = {}, s, r) {
  const i = e.duration || 0.3, o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), l = {}, c = /* @__PURE__ */ new Map();
  let u = 0, f = 0, d = 0;
  for (let h = 0; h < t.length; h++) {
    const m = t[h];
    if (typeof m == "string") {
      c.set(m, f);
      continue;
    } else if (!Array.isArray(m)) {
      c.set(m.name, Ot(f, m.at, u, c));
      continue;
    }
    let [v, b, p = {}] = m;
    p.at !== void 0 && (f = Ot(f, p.at, u, c));
    let w = 0;
    const A = (x, g, S, M = 0, T = 0) => {
      const E = rr(x), { delay: P = 0, times: D = kn(E), type: Be = "keyframes", repeat: ye, repeatType: pa, repeatDelay: ga = 0, ...Fs } = g;
      let { ease: K = e.ease || "easeOut", duration: I } = g;
      const Et = typeof P == "function" ? P(M, T) : P, Vt = E.length, Mt = Ne(Be) ? Be : r == null ? void 0 : r[Be];
      if (Vt <= 2 && Mt) {
        let se = 100;
        if (Vt === 2 && ar(E)) {
          const re = E[1] - E[0];
          se = Math.abs(re);
        }
        const be = { ...Fs };
        I !== void 0 && (be.duration = /* @__PURE__ */ O(I));
        const ve = zs(be, se, Mt);
        K = ve.ease, I = ve.duration;
      }
      I ?? (I = i);
      const kt = f + Et;
      D.length === 1 && D[0] === 0 && (D[1] = 1);
      const Ct = D.length - E.length;
      if (Ct > 0 && Mn(D, Ct), E.length === 1 && E.unshift(null), ye) {
        I = Xs(I, ye);
        const se = [...E], be = [...D];
        K = Array.isArray(K) ? [...K] : [K];
        const ve = [...K];
        for (let re = 0; re < ye; re++) {
          E.push(...se);
          for (let ie = 0; ie < se.length; ie++)
            D.push(be[ie] + (re + 1)), K.push(ie === 0 ? "linear" : Vn(ve, ie - 1));
        }
        er(D, ye);
      }
      const Lt = kt + I;
      Qs(S, E, K, D, kt, Lt), w = Math.max(Et + I, w), d = Math.max(Lt, d);
    };
    if (L(v)) {
      const x = Nt(v, a);
      A(b, p, Kt("default", x));
    } else {
      const x = Cn(v, b, s, l), g = x.length;
      for (let S = 0; S < g; S++) {
        b = b, p = p;
        const M = x[S], T = Nt(M, a);
        for (const E in b)
          A(b[E], ir(p, E), Kt(E, T), S, g);
      }
    }
    u = f, f += w;
  }
  return a.forEach((h, m) => {
    for (const v in h) {
      const b = h[v];
      b.sort(tr);
      const p = [], w = [], A = [];
      for (let g = 0; g < b.length; g++) {
        const { at: S, value: M, easing: T } = b[g];
        p.push(M), w.push(/* @__PURE__ */ Fe(0, d, S)), A.push(T || "easeOut");
      }
      w[0] !== 0 && (w.unshift(0), p.unshift(p[0]), A.unshift(nr)), w[w.length - 1] !== 1 && (w.push(1), p.push(null)), o.has(m) || o.set(m, {
        keyframes: {},
        transition: {}
      });
      const x = o.get(m);
      x.keyframes[v] = p, x.transition[v] = {
        ...e,
        duration: d,
        ease: A,
        times: w,
        ...n
      };
    }
  }), o;
}
function Nt(t, e) {
  return !e.has(t) && e.set(t, {}), e.get(t);
}
function Kt(t, e) {
  return e[t] || (e[t] = []), e[t];
}
function rr(t) {
  return Array.isArray(t) ? t : [t];
}
function ir(t, e) {
  return t && t[e] ? {
    ...t,
    ...t[e]
  } : { ...t };
}
const or = (t) => typeof t == "number", ar = (t) => t.every(or), ce = /* @__PURE__ */ new WeakMap();
function Pn(t, e) {
  return t ? t[e] || t.default || t : void 0;
}
const Q = [
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
], ee = new Set(Q), In = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...Q
]), lr = (t) => Array.isArray(t), ur = (t) => lr(t) ? t[t.length - 1] || 0 : t, cr = {
  skipAnimations: !1,
  useManualTiming: !1
}, we = [
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
function fr(t, e) {
  let n = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), r = !1, i = !1;
  const o = /* @__PURE__ */ new WeakSet();
  let a = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function l(u) {
    o.has(u) && (c.schedule(u), t()), u(a);
  }
  const c = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (u, f = !1, d = !1) => {
      const m = d && r ? n : s;
      return f && o.add(u), m.has(u) || m.add(u), u;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (u) => {
      s.delete(u), o.delete(u);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (u) => {
      if (a = u, r) {
        i = !0;
        return;
      }
      r = !0, [n, s] = [s, n], n.forEach(l), n.clear(), r = !1, i && (i = !1, c.process(u));
    }
  };
  return c;
}
const dr = 40;
function hr(t, e) {
  let n = !1, s = !0;
  const r = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, i = () => n = !0, o = we.reduce((p, w) => (p[w] = fr(i), p), {}), { read: a, resolveKeyframes: l, update: c, preRender: u, render: f, postRender: d } = o, h = () => {
    const p = performance.now();
    n = !1, r.delta = s ? 1e3 / 60 : Math.max(Math.min(p - r.timestamp, dr), 1), r.timestamp = p, r.isProcessing = !0, a.process(r), l.process(r), c.process(r), u.process(r), f.process(r), d.process(r), r.isProcessing = !1, n && e && (s = !1, t(h));
  }, m = () => {
    n = !0, s = !0, r.isProcessing || t(h);
  };
  return { schedule: we.reduce((p, w) => {
    const A = o[w];
    return p[w] = (x, g = !1, S = !1) => (n || m(), A.schedule(x, g, S)), p;
  }, {}), cancel: (p) => {
    for (let w = 0; w < we.length; w++)
      o[we[w]].cancel(p);
  }, state: r, steps: o };
}
const { schedule: R, cancel: Je, state: Le, steps: ba } = hr(typeof requestAnimationFrame < "u" ? requestAnimationFrame : W, !0);
let Me;
function mr() {
  Me = void 0;
}
const q = {
  now: () => (Me === void 0 && q.set(Le.isProcessing || cr.useManualTiming ? Le.timestamp : performance.now()), Me),
  set: (t) => {
    Me = t, queueMicrotask(mr);
  }
};
class Dn {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return Zs(this.subscriptions, e), () => Ln(this.subscriptions, e);
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
const Bt = 30, pr = (t) => !isNaN(parseFloat(t));
class gr {
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
    this.current = e, this.updatedAt = q.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = pr(this.current));
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
    this.events[e] || (this.events[e] = new Dn());
    const s = this.events[e].add(n);
    return e === "change" ? () => {
      s(), R.read(() => {
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
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > Bt)
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, Bt);
    return An(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
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
  return new gr(t, e);
}
function qt(t) {
  const e = [{}, {}];
  return t == null || t.values.forEach((n, s) => {
    e[0][s] = n.get(), e[1][s] = n.getVelocity();
  }), e;
}
function Rn(t, e, n, s) {
  if (typeof e == "function") {
    const [r, i] = qt(s);
    e = e(n !== void 0 ? n : t.custom, r, i);
  }
  if (typeof e == "string" && (e = t.variants && t.variants[e]), typeof e == "function") {
    const [r, i] = qt(s);
    e = e(n !== void 0 ? n : t.custom, r, i);
  }
  return e;
}
function yr(t, e, n) {
  const s = t.getProps();
  return Rn(s, e, s.custom, t);
}
function br(t, e, n) {
  t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, fe(n));
}
function vr(t, e) {
  const n = yr(t, e);
  let { transitionEnd: s = {}, transition: r = {}, ...i } = n || {};
  i = { ...i, ...s };
  for (const o in i) {
    const a = ur(i[o]);
    br(t, o, a);
  }
}
function wr(t) {
  return !!(L(t) && t.add);
}
function Tr(t, e) {
  const n = t.getValue("willChange");
  if (wr(n))
    return n.add(e);
}
const ct = (t) => t.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), Sr = "framerAppearId", Ar = "data-" + ct(Sr);
function xr(t) {
  return t.props[Ar];
}
function Ht(t, e) {
  t.timeline = e, t.onfinish = null;
}
const ft = (t) => Array.isArray(t) && typeof t[0] == "number", Er = {
  linearEasing: void 0
};
function Vr(t, e) {
  const n = /* @__PURE__ */ at(t);
  return () => {
    var s;
    return (s = Er[e]) !== null && s !== void 0 ? s : n();
  };
}
const Pe = /* @__PURE__ */ Vr(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing");
function Fn(t) {
  return !!(typeof t == "function" && Pe() || !t || typeof t == "string" && (t in Qe || Pe()) || ft(t) || Array.isArray(t) && t.every(Fn));
}
const le = ([t, e, n, s]) => `cubic-bezier(${t}, ${e}, ${n}, ${s})`, Qe = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ le([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ le([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ le([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ le([0.33, 1.53, 0.69, 0.99])
};
function On(t, e) {
  if (t)
    return typeof t == "function" && Pe() ? Sn(t, e) : ft(t) ? le(t) : Array.isArray(t) ? t.map((n) => On(n, e) || Qe.easeOut) : Qe[t];
}
const Nn = (t, e, n) => (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t, Mr = 1e-7, kr = 12;
function Cr(t, e, n, s, r) {
  let i, o, a = 0;
  do
    o = e + (n - e) / 2, i = Nn(o, s, r) - t, i > 0 ? n = o : e = o;
  while (Math.abs(i) > Mr && ++a < kr);
  return o;
}
function pe(t, e, n, s) {
  if (t === e && n === s)
    return W;
  const r = (i) => Cr(i, 0, 1, t, n);
  return (i) => i === 0 || i === 1 ? i : Nn(r(i), e, s);
}
const Kn = (t) => (e) => e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2, Bn = (t) => (e) => 1 - t(1 - e), qn = /* @__PURE__ */ pe(0.33, 1.53, 0.69, 0.99), dt = /* @__PURE__ */ Bn(qn), Hn = /* @__PURE__ */ Kn(dt), _n = (t) => (t *= 2) < 1 ? 0.5 * dt(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), ht = (t) => 1 - Math.sin(Math.acos(t)), Lr = Bn(ht), $n = Kn(ht), Un = (t) => /^0[^.\s]+$/u.test(t);
function Pr(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || Un(t) : !0;
}
const te = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, de = {
  ...te,
  transform: (t) => G(0, 1, t)
}, Te = {
  ...te,
  default: 1
}, ue = (t) => Math.round(t * 1e5) / 1e5, mt = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function Ir(t) {
  return t == null;
}
const Dr = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, pt = (t, e) => (n) => !!(typeof n == "string" && Dr.test(n) && n.startsWith(t) || e && !Ir(n) && Object.prototype.hasOwnProperty.call(n, e)), Wn = (t, e, n) => (s) => {
  if (typeof s != "string")
    return s;
  const [r, i, o, a] = s.match(mt);
  return {
    [t]: parseFloat(r),
    [e]: parseFloat(i),
    [n]: parseFloat(o),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, Rr = (t) => G(0, 255, t), He = {
  ...te,
  transform: (t) => Math.round(Rr(t))
}, _ = {
  test: /* @__PURE__ */ pt("rgb", "red"),
  parse: /* @__PURE__ */ Wn("red", "green", "blue"),
  transform: ({ red: t, green: e, blue: n, alpha: s = 1 }) => "rgba(" + He.transform(t) + ", " + He.transform(e) + ", " + He.transform(n) + ", " + ue(de.transform(s)) + ")"
};
function Fr(t) {
  let e = "", n = "", s = "", r = "";
  return t.length > 5 ? (e = t.substring(1, 3), n = t.substring(3, 5), s = t.substring(5, 7), r = t.substring(7, 9)) : (e = t.substring(1, 2), n = t.substring(2, 3), s = t.substring(3, 4), r = t.substring(4, 5), e += e, n += n, s += s, r += r), {
    red: parseInt(e, 16),
    green: parseInt(n, 16),
    blue: parseInt(s, 16),
    alpha: r ? parseInt(r, 16) / 255 : 1
  };
}
const et = {
  test: /* @__PURE__ */ pt("#"),
  parse: Fr,
  transform: _.transform
}, ge = (t) => ({
  test: (e) => typeof e == "string" && e.endsWith(t) && e.split(" ").length === 1,
  parse: parseFloat,
  transform: (e) => `${e}${t}`
}), B = /* @__PURE__ */ ge("deg"), X = /* @__PURE__ */ ge("%"), y = /* @__PURE__ */ ge("px"), Or = /* @__PURE__ */ ge("vh"), Nr = /* @__PURE__ */ ge("vw"), _t = {
  ...X,
  parse: (t) => X.parse(t) / 100,
  transform: (t) => X.transform(t * 100)
}, z = {
  test: /* @__PURE__ */ pt("hsl", "hue"),
  parse: /* @__PURE__ */ Wn("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: e, lightness: n, alpha: s = 1 }) => "hsla(" + Math.round(t) + ", " + X.transform(ue(e)) + ", " + X.transform(ue(n)) + ", " + ue(de.transform(s)) + ")"
}, k = {
  test: (t) => _.test(t) || et.test(t) || z.test(t),
  parse: (t) => _.test(t) ? _.parse(t) : z.test(t) ? z.parse(t) : et.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? _.transform(t) : z.transform(t)
}, Kr = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function Br(t) {
  var e, n;
  return isNaN(t) && typeof t == "string" && (((e = t.match(mt)) === null || e === void 0 ? void 0 : e.length) || 0) + (((n = t.match(Kr)) === null || n === void 0 ? void 0 : n.length) || 0) > 0;
}
const Gn = "number", jn = "color", qr = "var", Hr = "var(", $t = "${}", _r = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function he(t) {
  const e = t.toString(), n = [], s = {
    color: [],
    number: [],
    var: []
  }, r = [];
  let i = 0;
  const a = e.replace(_r, (l) => (k.test(l) ? (s.color.push(i), r.push(jn), n.push(k.parse(l))) : l.startsWith(Hr) ? (s.var.push(i), r.push(qr), n.push(l)) : (s.number.push(i), r.push(Gn), n.push(parseFloat(l))), ++i, $t)).split($t);
  return { values: n, split: a, indexes: s, types: r };
}
function zn(t) {
  return he(t).values;
}
function Yn(t) {
  const { split: e, types: n } = he(t), s = e.length;
  return (r) => {
    let i = "";
    for (let o = 0; o < s; o++)
      if (i += e[o], r[o] !== void 0) {
        const a = n[o];
        a === Gn ? i += ue(r[o]) : a === jn ? i += k.transform(r[o]) : i += r[o];
      }
    return i;
  };
}
const $r = (t) => typeof t == "number" ? 0 : t;
function Ur(t) {
  const e = zn(t);
  return Yn(t)(e.map($r));
}
const ne = {
  test: Br,
  parse: zn,
  createTransformer: Yn,
  getAnimatableNone: Ur
}, Wr = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function Gr(t) {
  const [e, n] = t.slice(0, -1).split("(");
  if (e === "drop-shadow")
    return t;
  const [s] = n.match(mt) || [];
  if (!s)
    return t;
  const r = n.replace(s, "");
  let i = Wr.has(e) ? 1 : 0;
  return s !== n && (i *= 100), e + "(" + i + r + ")";
}
const jr = /\b([a-z-]*)\(.*?\)/gu, tt = {
  ...ne,
  getAnimatableNone: (t) => {
    const e = t.match(jr);
    return e ? e.map(Gr).join(" ") : t;
  }
}, zr = {
  // Border props
  borderWidth: y,
  borderTopWidth: y,
  borderRightWidth: y,
  borderBottomWidth: y,
  borderLeftWidth: y,
  borderRadius: y,
  radius: y,
  borderTopLeftRadius: y,
  borderTopRightRadius: y,
  borderBottomRightRadius: y,
  borderBottomLeftRadius: y,
  // Positioning props
  width: y,
  maxWidth: y,
  height: y,
  maxHeight: y,
  top: y,
  right: y,
  bottom: y,
  left: y,
  // Spacing props
  padding: y,
  paddingTop: y,
  paddingRight: y,
  paddingBottom: y,
  paddingLeft: y,
  margin: y,
  marginTop: y,
  marginRight: y,
  marginBottom: y,
  marginLeft: y,
  // Misc
  backgroundPositionX: y,
  backgroundPositionY: y
}, Yr = {
  rotate: B,
  rotateX: B,
  rotateY: B,
  rotateZ: B,
  scale: Te,
  scaleX: Te,
  scaleY: Te,
  scaleZ: Te,
  skew: B,
  skewX: B,
  skewY: B,
  distance: y,
  translateX: y,
  translateY: y,
  translateZ: y,
  x: y,
  y,
  z: y,
  perspective: y,
  transformPerspective: y,
  opacity: de,
  originX: _t,
  originY: _t,
  originZ: y
}, Ut = {
  ...te,
  transform: Math.round
}, gt = {
  ...zr,
  ...Yr,
  zIndex: Ut,
  size: y,
  // SVG
  fillOpacity: de,
  strokeOpacity: de,
  numOctaves: Ut
}, Xr = {
  ...gt,
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
  filter: tt,
  WebkitFilter: tt
}, yt = (t) => Xr[t];
function Xn(t, e) {
  let n = yt(t);
  return n !== tt && (n = ne), n.getAnimatableNone ? n.getAnimatableNone(e) : void 0;
}
const Zr = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function Jr(t, e, n) {
  let s = 0, r;
  for (; s < t.length && !r; ) {
    const i = t[s];
    typeof i == "string" && !Zr.has(i) && he(i).values.length && (r = t[s]), s++;
  }
  if (r && n)
    for (const i of e)
      t[i] = Xn(n, r);
}
const Wt = (t) => t === te || t === y, Gt = (t, e) => parseFloat(t.split(", ")[e]), jt = (t, e) => (n, { transform: s }) => {
  if (s === "none" || !s)
    return 0;
  const r = s.match(/^matrix3d\((.+)\)$/u);
  if (r)
    return Gt(r[1], e);
  {
    const i = s.match(/^matrix\((.+)\)$/u);
    return i ? Gt(i[1], t) : 0;
  }
}, Qr = /* @__PURE__ */ new Set(["x", "y", "z"]), ei = Q.filter((t) => !Qr.has(t));
function ti(t) {
  const e = [];
  return ei.forEach((n) => {
    const s = t.getValue(n);
    s !== void 0 && (e.push([n, s.get()]), s.set(n.startsWith("scale") ? 1 : 0));
  }), e;
}
const J = {
  // Dimensions
  width: ({ x: t }, { paddingLeft: e = "0", paddingRight: n = "0" }) => t.max - t.min - parseFloat(e) - parseFloat(n),
  height: ({ y: t }, { paddingTop: e = "0", paddingBottom: n = "0" }) => t.max - t.min - parseFloat(e) - parseFloat(n),
  top: (t, { top: e }) => parseFloat(e),
  left: (t, { left: e }) => parseFloat(e),
  bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
  right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
  // Transform
  x: jt(4, 13),
  y: jt(5, 14)
};
J.translateX = J.x;
J.translateY = J.y;
const $ = /* @__PURE__ */ new Set();
let nt = !1, st = !1;
function Zn() {
  if (st) {
    const t = Array.from($).filter((s) => s.needsMeasurement), e = new Set(t.map((s) => s.element)), n = /* @__PURE__ */ new Map();
    e.forEach((s) => {
      const r = ti(s);
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
  st = !1, nt = !1, $.forEach((t) => t.complete()), $.clear();
}
function Jn() {
  $.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (st = !0);
  });
}
function ni() {
  Jn(), Zn();
}
class bt {
  constructor(e, n, s, r, i, o = !1) {
    this.isComplete = !1, this.isAsync = !1, this.needsMeasurement = !1, this.isScheduled = !1, this.unresolvedKeyframes = [...e], this.onComplete = n, this.name = s, this.motionValue = r, this.element = i, this.isAsync = o;
  }
  scheduleResolve() {
    this.isScheduled = !0, this.isAsync ? ($.add(this), nt || (nt = !0, R.read(Jn), R.resolveKeyframes(Zn))) : (this.readKeyframes(), this.complete());
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
const Qn = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t), es = (t) => (e) => typeof e == "string" && e.startsWith(t), ts = /* @__PURE__ */ es("--"), si = /* @__PURE__ */ es("var(--"), vt = (t) => si(t) ? ri.test(t.split("/*")[0].trim()) : !1, ri = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, ii = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function oi(t) {
  const e = ii.exec(t);
  if (!e)
    return [,];
  const [, n, s, r] = e;
  return [`--${n ?? s}`, r];
}
function ns(t, e, n = 1) {
  const [s, r] = oi(t);
  if (!s)
    return;
  const i = window.getComputedStyle(e).getPropertyValue(s);
  if (i) {
    const o = i.trim();
    return Qn(o) ? parseFloat(o) : o;
  }
  return vt(r) ? ns(r, e, n + 1) : r;
}
const ss = (t) => (e) => e.test(t), ai = {
  test: (t) => t === "auto",
  parse: (t) => t
}, rs = [te, y, X, B, Nr, Or, ai], zt = (t) => rs.find(ss(t));
class is extends bt {
  constructor(e, n, s, r, i) {
    super(e, n, s, r, i, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, element: n, name: s } = this;
    if (!n || !n.current)
      return;
    super.readKeyframes();
    for (let l = 0; l < e.length; l++) {
      let c = e[l];
      if (typeof c == "string" && (c = c.trim(), vt(c))) {
        const u = ns(c, n.current);
        u !== void 0 && (e[l] = u), l === e.length - 1 && (this.finalKeyframe = c);
      }
    }
    if (this.resolveNoneKeyframes(), !In.has(s) || e.length !== 2)
      return;
    const [r, i] = e, o = zt(r), a = zt(i);
    if (o !== a)
      if (Wt(o) && Wt(a))
        for (let l = 0; l < e.length; l++) {
          const c = e[l];
          typeof c == "string" && (e[l] = parseFloat(c));
        }
      else
        this.needsMeasurement = !0;
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: e, name: n } = this, s = [];
    for (let r = 0; r < e.length; r++)
      Pr(e[r]) && s.push(r);
    s.length && Jr(e, s, n);
  }
  measureInitialState() {
    const { element: e, unresolvedKeyframes: n, name: s } = this;
    if (!e || !e.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = J[s](e.measureViewportBox(), window.getComputedStyle(e.current)), n[0] = this.measuredOrigin;
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
    r[o] = J[s](n.measureViewportBox(), window.getComputedStyle(n.current)), a !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = a), !((e = this.removedTransforms) === null || e === void 0) && e.length && this.removedTransforms.forEach(([l, c]) => {
      n.getValue(l).set(c);
    }), this.resolveNoneKeyframes();
  }
}
const Yt = (t, e) => e === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(ne.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function li(t) {
  const e = t[0];
  if (t.length === 1)
    return !0;
  for (let n = 0; n < t.length; n++)
    if (t[n] !== e)
      return !0;
}
function ui(t, e, n, s) {
  const r = t[0];
  if (r === null)
    return !1;
  if (e === "display" || e === "visibility")
    return !0;
  const i = t[t.length - 1], o = Yt(r, e), a = Yt(i, e);
  return !o || !a ? !1 : li(t) || (n === "spring" || Ne(n)) && s;
}
const ci = (t) => t !== null;
function Ke(t, { repeat: e, repeatType: n = "loop" }, s) {
  const r = t.filter(ci), i = e && n !== "loop" && e % 2 === 1 ? 0 : r.length - 1;
  return !i || s === void 0 ? r[i] : s;
}
const fi = 40;
class os {
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
    return this.resolvedAt ? this.resolvedAt - this.createdAt > fi ? this.resolvedAt : this.createdAt : this.createdAt;
  }
  /**
   * A getter for resolved data. If keyframes are not yet resolved, accessing
   * this.resolved will synchronously flush all pending keyframe resolvers.
   * This is a deoptimisation, but at its worst still batches read/writes.
   */
  get resolved() {
    return !this._resolved && !this.hasAttemptedResolve && ni(), this._resolved;
  }
  /**
   * A method to be called when the keyframes resolver completes. This method
   * will check if its possible to run the animation and, if not, skip it.
   * Otherwise, it will call initPlayback on the implementing class.
   */
  onKeyframesResolved(e, n) {
    this.resolvedAt = q.now(), this.hasAttemptedResolve = !0;
    const { name: s, type: r, velocity: i, delay: o, onComplete: a, onUpdate: l, isGenerator: c } = this.options;
    if (!c && !ui(e, s, r, i))
      if (o)
        this.options.duration = 0;
      else {
        l && l(Ke(e, this.options, n)), a && a(), this.resolveFinishedPromise();
        return;
      }
    const u = this.initPlayback(e, n);
    u !== !1 && (this._resolved = {
      keyframes: e,
      finalKeyframe: n,
      ...u
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
function di({ hue: t, saturation: e, lightness: n, alpha: s }) {
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
function Ie(t, e) {
  return (n) => n > 0 ? e : t;
}
const $e = (t, e, n) => {
  const s = t * t, r = n * (e * e - s) + s;
  return r < 0 ? 0 : Math.sqrt(r);
}, hi = [et, _, z], mi = (t) => hi.find((e) => e.test(t));
function Xt(t) {
  const e = mi(t);
  if (!e)
    return !1;
  let n = e.parse(t);
  return e === z && (n = di(n)), n;
}
const Zt = (t, e) => {
  const n = Xt(t), s = Xt(e);
  if (!n || !s)
    return Ie(t, e);
  const r = { ...n };
  return (i) => (r.red = $e(n.red, s.red, i), r.green = $e(n.green, s.green, i), r.blue = $e(n.blue, s.blue, i), r.alpha = me(n.alpha, s.alpha, i), _.transform(r));
}, pi = (t, e) => (n) => e(t(n)), wt = (...t) => t.reduce(pi), rt = /* @__PURE__ */ new Set(["none", "hidden"]);
function gi(t, e) {
  return rt.has(t) ? (n) => n <= 0 ? t : e : (n) => n >= 1 ? e : t;
}
function yi(t, e) {
  return (n) => me(t, e, n);
}
function Tt(t) {
  return typeof t == "number" ? yi : typeof t == "string" ? vt(t) ? Ie : k.test(t) ? Zt : wi : Array.isArray(t) ? as : typeof t == "object" ? k.test(t) ? Zt : bi : Ie;
}
function as(t, e) {
  const n = [...t], s = n.length, r = t.map((i, o) => Tt(i)(i, e[o]));
  return (i) => {
    for (let o = 0; o < s; o++)
      n[o] = r[o](i);
    return n;
  };
}
function bi(t, e) {
  const n = { ...t, ...e }, s = {};
  for (const r in n)
    t[r] !== void 0 && e[r] !== void 0 && (s[r] = Tt(t[r])(t[r], e[r]));
  return (r) => {
    for (const i in s)
      n[i] = s[i](r);
    return n;
  };
}
function vi(t, e) {
  var n;
  const s = [], r = { color: 0, var: 0, number: 0 };
  for (let i = 0; i < e.values.length; i++) {
    const o = e.types[i], a = t.indexes[o][r[o]], l = (n = t.values[a]) !== null && n !== void 0 ? n : 0;
    s[i] = l, r[o]++;
  }
  return s;
}
const wi = (t, e) => {
  const n = ne.createTransformer(e), s = he(t), r = he(e);
  return s.indexes.var.length === r.indexes.var.length && s.indexes.color.length === r.indexes.color.length && s.indexes.number.length >= r.indexes.number.length ? rt.has(t) && !r.values.length || rt.has(e) && !s.values.length ? gi(t, e) : wt(as(vi(s, r), r.values), n) : Ie(t, e);
};
function ls(t, e, n) {
  return typeof t == "number" && typeof e == "number" && typeof n == "number" ? me(t, e, n) : Tt(t)(t, e);
}
function Jt({ keyframes: t, velocity: e = 0, power: n = 0.8, timeConstant: s = 325, bounceDamping: r = 10, bounceStiffness: i = 500, modifyTarget: o, min: a, max: l, restDelta: c = 0.5, restSpeed: u }) {
  const f = t[0], d = {
    done: !1,
    value: f
  }, h = (T) => a !== void 0 && T < a || l !== void 0 && T > l, m = (T) => a === void 0 ? l : l === void 0 || Math.abs(a - T) < Math.abs(l - T) ? a : l;
  let v = n * e;
  const b = f + v, p = o === void 0 ? b : o(b);
  p !== b && (v = p - f);
  const w = (T) => -v * Math.exp(-T / s), A = (T) => p + w(T), x = (T) => {
    const E = w(T), P = A(T);
    d.done = Math.abs(E) <= c, d.value = d.done ? p : P;
  };
  let g, S;
  const M = (T) => {
    h(d.value) && (g = T, S = Oe({
      keyframes: [d.value, m(d.value)],
      velocity: xn(A, T, d.value),
      // TODO: This should be passing * 1000
      damping: r,
      stiffness: i,
      restDelta: c,
      restSpeed: u
    }));
  };
  return M(0), {
    calculatedDuration: null,
    next: (T) => {
      let E = !1;
      return !S && g === void 0 && (E = !0, x(T), M(T)), g !== void 0 && T >= g ? S.next(T - g) : (!E && x(T), d);
    }
  };
}
const Ti = /* @__PURE__ */ pe(0.42, 0, 1, 1), Si = /* @__PURE__ */ pe(0, 0, 0.58, 1), us = /* @__PURE__ */ pe(0.42, 0, 0.58, 1), Qt = {
  linear: W,
  easeIn: Ti,
  easeInOut: us,
  easeOut: Si,
  circIn: ht,
  circInOut: $n,
  circOut: Lr,
  backIn: dt,
  backInOut: Hn,
  backOut: qn,
  anticipate: _n
}, en = (t) => {
  if (ft(t)) {
    Xe(t.length === 4);
    const [e, n, s, r] = t;
    return pe(e, n, s, r);
  } else if (typeof t == "string")
    return Xe(Qt[t] !== void 0), Qt[t];
  return t;
};
function Ai(t, e, n) {
  const s = [], r = n || ls, i = t.length - 1;
  for (let o = 0; o < i; o++) {
    let a = r(t[o], t[o + 1]);
    if (e) {
      const l = Array.isArray(e) ? e[o] || W : e;
      a = wt(l, a);
    }
    s.push(a);
  }
  return s;
}
function xi(t, e, { clamp: n = !0, ease: s, mixer: r } = {}) {
  const i = t.length;
  if (Xe(i === e.length), i === 1)
    return () => e[0];
  if (i === 2 && e[0] === e[1])
    return () => e[1];
  const o = t[0] === t[1];
  t[0] > t[i - 1] && (t = [...t].reverse(), e = [...e].reverse());
  const a = Ai(e, s, r), l = a.length, c = (u) => {
    if (o && u < t[0])
      return e[0];
    let f = 0;
    if (l > 1)
      for (; f < t.length - 2 && !(u < t[f + 1]); f++)
        ;
    const d = /* @__PURE__ */ Fe(t[f], t[f + 1], u);
    return a[f](d);
  };
  return n ? (u) => c(G(t[0], t[i - 1], u)) : c;
}
function Ei(t, e) {
  return t.map((n) => n * e);
}
function Vi(t, e) {
  return t.map(() => e || us).splice(0, t.length - 1);
}
function De({ duration: t = 300, keyframes: e, times: n, ease: s = "easeInOut" }) {
  const r = En(s) ? s.map(en) : en(s), i = {
    done: !1,
    value: e[0]
  }, o = Ei(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === e.length ? n : kn(e),
    t
  ), a = xi(o, e, {
    ease: Array.isArray(r) ? r : Vi(e, r)
  });
  return {
    calculatedDuration: t,
    next: (l) => (i.value = a(l), i.done = l >= t, i)
  };
}
const Mi = (t) => {
  const e = ({ timestamp: n }) => t(n);
  return {
    start: () => R.update(e, !0),
    stop: () => Je(e),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => Le.isProcessing ? Le.timestamp : q.now()
  };
}, ki = {
  decay: Jt,
  inertia: Jt,
  tween: De,
  keyframes: De,
  spring: Oe
}, Ci = (t) => t / 100;
class St extends os {
  constructor(e) {
    super(e), this.holdTime = null, this.cancelTime = null, this.currentTime = 0, this.playbackSpeed = 1, this.pendingPlayState = "running", this.startTime = null, this.state = "idle", this.stop = () => {
      if (this.resolver.cancel(), this.isStopped = !0, this.state === "idle")
        return;
      this.teardown();
      const { onStop: l } = this.options;
      l && l();
    };
    const { name: n, motionValue: s, element: r, keyframes: i } = this.options, o = (r == null ? void 0 : r.KeyframeResolver) || bt, a = (l, c) => this.onKeyframesResolved(l, c);
    this.resolver = new o(i, a, n, s, r), this.resolver.scheduleResolve();
  }
  flatten() {
    super.flatten(), this._resolved && Object.assign(this._resolved, this.initPlayback(this._resolved.keyframes));
  }
  initPlayback(e) {
    const { type: n = "keyframes", repeat: s = 0, repeatDelay: r = 0, repeatType: i, velocity: o = 0 } = this.options, a = Ne(n) ? n : ki[n] || De;
    let l, c;
    a !== De && typeof e[0] != "number" && (l = wt(Ci, ls(e[0], e[1])), e = [0, 100]);
    const u = a({ ...this.options, keyframes: e });
    i === "mirror" && (c = a({
      ...this.options,
      keyframes: [...e].reverse(),
      velocity: -o
    })), u.calculatedDuration === null && (u.calculatedDuration = lt(u));
    const { calculatedDuration: f } = u, d = f + r, h = d * (s + 1) - r;
    return {
      generator: u,
      mirroredGenerator: c,
      mapPercentToKeyframes: l,
      calculatedDuration: f,
      resolvedDuration: d,
      totalDuration: h
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
    const { finalKeyframe: r, generator: i, mirroredGenerator: o, mapPercentToKeyframes: a, keyframes: l, calculatedDuration: c, totalDuration: u, resolvedDuration: f } = s;
    if (this.startTime === null)
      return i.next(0);
    const { delay: d, repeat: h, repeatType: m, repeatDelay: v, onUpdate: b } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - u / this.speed, this.startTime)), n ? this.currentTime = e : this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = Math.round(e - this.startTime) * this.speed;
    const p = this.currentTime - d * (this.speed >= 0 ? 1 : -1), w = this.speed >= 0 ? p < 0 : p > u;
    this.currentTime = Math.max(p, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = u);
    let A = this.currentTime, x = i;
    if (h) {
      const T = Math.min(this.currentTime, u) / f;
      let E = Math.floor(T), P = T % 1;
      !P && T >= 1 && (P = 1), P === 1 && E--, E = Math.min(E, h + 1), !!(E % 2) && (m === "reverse" ? (P = 1 - P, v && (P -= v / f)) : m === "mirror" && (x = o)), A = G(0, 1, P) * f;
    }
    const g = w ? { done: !1, value: l[0] } : x.next(A);
    a && (g.value = a(g.value));
    let { done: S } = g;
    !w && c !== null && (S = this.speed >= 0 ? this.currentTime >= u : this.currentTime <= 0);
    const M = this.holdTime === null && (this.state === "finished" || this.state === "running" && S);
    return M && r !== void 0 && (g.value = Ke(l, this.options, r)), b && b(g.value), M && this.finish(), g;
  }
  get duration() {
    const { resolved: e } = this;
    return e ? /* @__PURE__ */ N(e.calculatedDuration) : 0;
  }
  get time() {
    return /* @__PURE__ */ N(this.currentTime);
  }
  set time(e) {
    e = /* @__PURE__ */ O(e), this.currentTime = e, this.holdTime !== null || this.speed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.speed);
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
    const { driver: e = Mi, onPlay: n, startTime: s } = this.options;
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
const Li = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]);
function Pi(t, e, n, { delay: s = 0, duration: r = 300, repeat: i = 0, repeatType: o = "loop", ease: a = "easeInOut", times: l } = {}) {
  const c = { [e]: n };
  l && (c.offset = l);
  const u = On(a, r);
  return Array.isArray(u) && (c.easing = u), t.animate(c, {
    delay: s,
    duration: r,
    easing: Array.isArray(u) ? "linear" : u,
    fill: "both",
    iterations: i + 1,
    direction: o === "reverse" ? "alternate" : "normal"
  });
}
const Ii = /* @__PURE__ */ at(() => Object.hasOwnProperty.call(Element.prototype, "animate")), Re = 10, Di = 2e4;
function Ri(t) {
  return Ne(t.type) || t.type === "spring" || !Fn(t.ease);
}
function Fi(t, e) {
  const n = new St({
    ...e,
    keyframes: t,
    repeat: 0,
    delay: 0,
    isGenerator: !0
  });
  let s = { done: !1, value: t[0] };
  const r = [];
  let i = 0;
  for (; !s.done && i < Di; )
    s = n.sample(i), r.push(s.value), i += Re;
  return {
    times: void 0,
    keyframes: r,
    duration: i - Re,
    ease: "linear"
  };
}
const cs = {
  anticipate: _n,
  backInOut: Hn,
  circInOut: $n
};
function Oi(t) {
  return t in cs;
}
class tn extends os {
  constructor(e) {
    super(e);
    const { name: n, motionValue: s, element: r, keyframes: i } = this.options;
    this.resolver = new is(i, (o, a) => this.onKeyframesResolved(o, a), n, s, r), this.resolver.scheduleResolve();
  }
  initPlayback(e, n) {
    let { duration: s = 300, times: r, ease: i, type: o, motionValue: a, name: l, startTime: c } = this.options;
    if (!a.owner || !a.owner.current)
      return !1;
    if (typeof i == "string" && Pe() && Oi(i) && (i = cs[i]), Ri(this.options)) {
      const { onComplete: f, onUpdate: d, motionValue: h, element: m, ...v } = this.options, b = Fi(e, v);
      e = b.keyframes, e.length === 1 && (e[1] = e[0]), s = b.duration, r = b.times, i = b.ease, o = "keyframes";
    }
    const u = Pi(a.owner.current, l, e, { ...this.options, duration: s, times: r, ease: i });
    return u.startTime = c ?? this.calcStartTime(), this.pendingTimeline ? (Ht(u, this.pendingTimeline), this.pendingTimeline = void 0) : u.onfinish = () => {
      const { onComplete: f } = this.options;
      a.set(Ke(e, this.options, n)), f && f(), this.cancel(), this.resolveFinishedPromise();
    }, {
      animation: u,
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
    s.currentTime = /* @__PURE__ */ O(e);
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
        return W;
      const { animation: s } = n;
      Ht(s, e);
    }
    return W;
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
      const { motionValue: c, onUpdate: u, onComplete: f, element: d, ...h } = this.options, m = new St({
        ...h,
        keyframes: s,
        duration: r,
        type: i,
        ease: o,
        times: a,
        isGenerator: !0
      }), v = /* @__PURE__ */ O(this.time);
      c.setWithVelocity(m.sample(v - Re).value, m.sample(v).value, Re);
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
    const { onUpdate: l, transformTemplate: c } = n.owner.getProps();
    return Ii() && s && Li.has(s) && /**
     * If we're outputting values to onUpdate then we can't use WAAPI as there's
     * no way to read the value from WAAPI every frame.
     */
    !l && !c && !r && i !== "mirror" && o !== 0 && a !== "inertia";
  }
}
const Ni = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, Ki = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), Bi = {
  type: "keyframes",
  duration: 0.8
}, qi = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, Hi = (t, { keyframes: e }) => e.length > 2 ? Bi : ee.has(t) ? t.startsWith("scale") ? Ki(e[1]) : Ni : qi;
function _i({ when: t, delay: e, delayChildren: n, staggerChildren: s, staggerDirection: r, repeat: i, repeatType: o, repeatDelay: a, from: l, elapsed: c, ...u }) {
  return !!Object.keys(u).length;
}
const fs = (t, e, n, s = {}, r, i) => (o) => {
  const a = Pn(s, t) || {}, l = a.delay || s.delay || 0;
  let { elapsed: c = 0 } = s;
  c = c - /* @__PURE__ */ O(l);
  let u = {
    keyframes: Array.isArray(n) ? n : [null, n],
    ease: "easeOut",
    velocity: e.getVelocity(),
    ...a,
    delay: -c,
    onUpdate: (d) => {
      e.set(d), a.onUpdate && a.onUpdate(d);
    },
    onComplete: () => {
      o(), a.onComplete && a.onComplete();
    },
    name: t,
    motionValue: e,
    element: i ? void 0 : r
  };
  _i(a) || (u = {
    ...u,
    ...Hi(t, u)
  }), u.duration && (u.duration = /* @__PURE__ */ O(u.duration)), u.repeatDelay && (u.repeatDelay = /* @__PURE__ */ O(u.repeatDelay)), u.from !== void 0 && (u.keyframes[0] = u.from);
  let f = !1;
  if ((u.type === !1 || u.duration === 0 && !u.repeatDelay) && (u.duration = 0, u.delay === 0 && (f = !0)), f && !i && e.get() !== void 0) {
    const d = Ke(u.keyframes, a);
    if (d !== void 0)
      return R.update(() => {
        u.onUpdate(d), u.onComplete();
      }), new Tn([]);
  }
  return !i && tn.supports(u) ? new tn(u) : new St(u);
};
function $i({ protectedKeys: t, needsAnimating: e }, n) {
  const s = t.hasOwnProperty(n) && e[n] !== !0;
  return e[n] = !1, s;
}
function Ui(t, e, { delay: n = 0, transitionOverride: s, type: r } = {}) {
  var i;
  let { transition: o = t.getDefaultTransition(), transitionEnd: a, ...l } = e;
  s && (o = s);
  const c = [], u = r && t.animationState && t.animationState.getState()[r];
  for (const f in l) {
    const d = t.getValue(f, (i = t.latestValues[f]) !== null && i !== void 0 ? i : null), h = l[f];
    if (h === void 0 || u && $i(u, f))
      continue;
    const m = {
      delay: n,
      ...Pn(o || {}, f)
    };
    let v = !1;
    if (window.MotionHandoffAnimation) {
      const p = xr(t);
      if (p) {
        const w = window.MotionHandoffAnimation(p, f, R);
        w !== null && (m.startTime = w, v = !0);
      }
    }
    Tr(t, f), d.start(fs(f, d, h, t.shouldReduceMotion && In.has(f) ? { type: !1 } : m, t, v));
    const b = d.animation;
    b && c.push(b);
  }
  return a && Promise.all(c).then(() => {
    R.update(() => {
      a && vr(t, a);
    });
  }), c;
}
function Wi(t) {
  return t instanceof SVGElement && t.tagName !== "svg";
}
const nn = () => ({ min: 0, max: 0 }), At = () => ({
  x: nn(),
  y: nn()
}), sn = {
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
}, it = {};
for (const t in sn)
  it[t] = {
    isEnabled: (e) => sn[t].some((n) => !!e[n])
  };
const Gi = typeof window < "u", ot = { current: null }, ds = { current: !1 };
function ji() {
  if (ds.current = !0, !!Gi)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), e = () => ot.current = t.matches;
      t.addListener(e), e();
    } else
      ot.current = !1;
}
const zi = [...rs, k, ne], Yi = (t) => zi.find(ss(t));
function Xi(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function Zi(t) {
  return typeof t == "string" || Array.isArray(t);
}
const Ji = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Qi = ["initial", ...Ji];
function hs(t) {
  return Xi(t.animate) || Qi.some((e) => Zi(t[e]));
}
function eo(t) {
  return !!(hs(t) || t.variants);
}
function to(t, e, n) {
  for (const s in e) {
    const r = e[s], i = n[s];
    if (L(r))
      t.addValue(s, r);
    else if (L(i))
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
const rn = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
class ms {
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
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = bt, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const h = q.now();
      this.renderScheduledAt < h && (this.renderScheduledAt = h, R.render(this.render, !1, !0));
    };
    const { latestValues: l, renderState: c, onUpdate: u } = o;
    this.onUpdate = u, this.latestValues = l, this.baseTarget = { ...l }, this.initialValues = n.initial ? { ...l } : {}, this.renderState = c, this.parent = e, this.props = n, this.presenceContext = s, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = r, this.options = a, this.blockInitialAnimation = !!i, this.isControllingVariants = hs(n), this.isVariantNode = eo(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
    const { willChange: f, ...d } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const h in d) {
      const m = d[h];
      l[h] !== void 0 && L(m) && m.set(l[h], !1);
    }
  }
  mount(e) {
    this.current = e, ce.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((n, s) => this.bindToMotionValue(s, n)), ds.current || ji(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : ot.current, this.parent && this.parent.children.add(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    this.projection && this.projection.unmount(), Je(this.notifyUpdate), Je(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent && this.parent.children.delete(this);
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
    const s = ee.has(e);
    s && this.onBindTransform && this.onBindTransform();
    const r = n.on("change", (a) => {
      this.latestValues[e] = a, this.props.onUpdate && R.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0);
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
    for (e in it) {
      const n = it[e];
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : At();
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
    for (let s = 0; s < rn.length; s++) {
      const r = rn[s];
      this.propEventSubscriptions[r] && (this.propEventSubscriptions[r](), delete this.propEventSubscriptions[r]);
      const i = "on" + r, o = e[i];
      o && (this.propEventSubscriptions[r] = this.on(r, o));
    }
    this.prevMotionValues = to(this, this.scrapeMotionValuesFromProps(e, this.prevProps, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue(), this.onUpdate && this.onUpdate(this);
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
    return r != null && (typeof r == "string" && (Qn(r) || Un(r)) ? r = parseFloat(r) : !Yi(r) && ne.test(n) && (r = Xn(e, n)), this.setBaseTarget(e, L(r) ? r.get() : r)), L(r) ? r.get() : r;
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
      const o = Rn(this.props, s, (n = this.presenceContext) === null || n === void 0 ? void 0 : n.custom);
      o && (r = o[e]);
    }
    if (s && r !== void 0)
      return r;
    const i = this.getBaseTargetFromProps(this.props, e);
    return i !== void 0 && !L(i) ? i : this.initialValues[e] !== void 0 && r === void 0 ? void 0 : this.baseTarget[e];
  }
  on(e, n) {
    return this.events[e] || (this.events[e] = new Dn()), this.events[e].add(n);
  }
  notify(e, ...n) {
    this.events[e] && this.events[e].notify(...n);
  }
}
class ps extends ms {
  constructor() {
    super(...arguments), this.KeyframeResolver = is;
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
    L(e) && (this.childSubscription = e.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
}
const gs = (t, e) => e && typeof t == "number" ? e.transform(t) : t, no = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, so = Q.length;
function ro(t, e, n) {
  let s = "", r = !0;
  for (let i = 0; i < so; i++) {
    const o = Q[i], a = t[o];
    if (a === void 0)
      continue;
    let l = !0;
    if (typeof a == "number" ? l = a === (o.startsWith("scale") ? 1 : 0) : l = parseFloat(a) === 0, !l || n) {
      const c = gs(a, gt[o]);
      if (!l) {
        r = !1;
        const u = no[o] || o;
        s += `${u}(${c}) `;
      }
      n && (e[o] = c);
    }
  }
  return s = s.trim(), n ? s = n(e, r ? "" : s) : r && (s = "none"), s;
}
function ys(t, e, n) {
  const { style: s, vars: r, transformOrigin: i } = t;
  let o = !1, a = !1;
  for (const l in e) {
    const c = e[l];
    if (ee.has(l)) {
      o = !0;
      continue;
    } else if (ts(l)) {
      r[l] = c;
      continue;
    } else {
      const u = gs(c, gt[l]);
      l.startsWith("origin") ? (a = !0, i[l] = u) : s[l] = u;
    }
  }
  if (e.transform || (o || n ? s.transform = ro(e, t.transform, n) : s.transform && (s.transform = "none")), a) {
    const { originX: l = "50%", originY: c = "50%", originZ: u = 0 } = i;
    s.transformOrigin = `${l} ${c} ${u}`;
  }
}
const io = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, oo = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function ao(t, e, n = 1, s = 0, r = !0) {
  t.pathLength = 1;
  const i = r ? io : oo;
  t[i.offset] = y.transform(-s);
  const o = y.transform(e), a = y.transform(n);
  t[i.array] = `${o} ${a}`;
}
function on(t, e, n) {
  return typeof t == "string" ? t : y.transform(e + n * t);
}
function lo(t, e, n) {
  const s = on(e, t.x, t.width), r = on(n, t.y, t.height);
  return `${s} ${r}`;
}
function uo(t, {
  attrX: e,
  attrY: n,
  attrScale: s,
  originX: r,
  originY: i,
  pathLength: o,
  pathSpacing: a = 1,
  pathOffset: l = 0,
  // This is object creation, which we try to avoid per-frame.
  ...c
}, u, f) {
  if (ys(t, c, f), u) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: d, style: h, dimensions: m } = t;
  d.transform && (m && (h.transform = d.transform), delete d.transform), m && (r !== void 0 || i !== void 0 || h.transform) && (h.transformOrigin = lo(m, r !== void 0 ? r : 0.5, i !== void 0 ? i : 0.5)), e !== void 0 && (d.x = e), n !== void 0 && (d.y = n), s !== void 0 && (d.scale = s), o !== void 0 && ao(d, o, a, l, !1);
}
const bs = /* @__PURE__ */ new Set([
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
]), co = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function fo(t, e) {
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
function vs(t, { style: e, vars: n }, s, r) {
  Object.assign(t.style, e, r && r.getProjectionStyles(s));
  for (const i in n)
    t.style.setProperty(i, n[i]);
}
function ho(t, e, n, s) {
  vs(t, e, void 0, s);
  for (const r in e.attrs)
    t.setAttribute(bs.has(r) ? r : ct(r), e.attrs[r]);
}
const mo = {};
function po(t, { layout: e, layoutId: n }) {
  return ee.has(t) || t.startsWith("origin") || (e || n !== void 0) && (!!mo[t] || t === "opacity");
}
function ws(t, e, n) {
  var s;
  const { style: r } = t, i = {};
  for (const o in r)
    (L(r[o]) || e.style && L(e.style[o]) || po(o, t) || ((s = n == null ? void 0 : n.getValue(o)) === null || s === void 0 ? void 0 : s.liveStyle) !== void 0) && (i[o] = r[o]);
  return i;
}
function go(t, e, n) {
  const s = ws(t, e, n);
  for (const r in t)
    if (L(t[r]) || L(e[r])) {
      const i = Q.indexOf(r) !== -1 ? "attr" + r.charAt(0).toUpperCase() + r.substring(1) : r;
      s[i] = t[r];
    }
  return s;
}
class yo extends ps {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = At, this.updateDimensions = () => {
      this.current && !this.renderState.dimensions && fo(this.current, this.renderState);
    };
  }
  getBaseTargetFromProps(e, n) {
    return e[n];
  }
  readValueFromInstance(e, n) {
    if (ee.has(n)) {
      const s = yt(n);
      return s && s.default || 0;
    }
    return n = bs.has(n) ? n : ct(n), e.getAttribute(n);
  }
  scrapeMotionValuesFromProps(e, n, s) {
    return go(e, n, s);
  }
  onBindTransform() {
    this.current && !this.renderState.dimensions && R.postRender(this.updateDimensions);
  }
  build(e, n, s) {
    uo(e, n, this.isSVGTag, s.transformTemplate);
  }
  renderInstance(e, n, s, r) {
    ho(e, n, s, r);
  }
  mount(e) {
    this.isSVGTag = co(e.tagName), super.mount(e);
  }
}
function bo({ top: t, left: e, right: n, bottom: s }) {
  return {
    x: { min: e, max: n },
    y: { min: t, max: s }
  };
}
function vo(t, e) {
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
function wo(t, e) {
  return bo(vo(t.getBoundingClientRect(), e));
}
function To(t) {
  return window.getComputedStyle(t);
}
class So extends ps {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = vs;
  }
  readValueFromInstance(e, n) {
    if (ee.has(n)) {
      const s = yt(n);
      return s && s.default || 0;
    } else {
      const s = To(e), r = (ts(n) ? s.getPropertyValue(n) : s[n]) || 0;
      return typeof r == "string" ? r.trim() : r;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: n }) {
    return wo(e, n);
  }
  build(e, n, s) {
    ys(e, n, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, n, s) {
    return ws(e, n, s);
  }
}
function Ao(t, e) {
  return t in e;
}
class xo extends ms {
  constructor() {
    super(...arguments), this.type = "object";
  }
  readValueFromInstance(e, n) {
    if (Ao(n, e)) {
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
    return At();
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
function Eo(t) {
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
  }, n = Wi(t) ? new yo(e) : new So(e);
  n.mount(t), ce.set(t, n);
}
function Vo(t) {
  const e = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  }, n = new xo(e);
  n.mount(t), ce.set(t, n);
}
function Mo(t, e, n) {
  const s = L(t) ? t : fe(t);
  return s.start(fs("", s, e, n)), s.animation;
}
function ko(t, e) {
  return L(t) || typeof t == "number" || typeof t == "string" && !ut(e);
}
function Ts(t, e, n, s) {
  const r = [];
  if (ko(t, e))
    r.push(Mo(t, ut(e) && e.default || e, n && (n.default || n)));
  else {
    const i = Cn(t, e, s), o = i.length;
    for (let a = 0; a < o; a++) {
      const l = i[a], c = l instanceof Element ? Eo : Vo;
      ce.has(l) || c(l);
      const u = ce.get(l), f = { ...n };
      "delay" in f && typeof f.delay == "function" && (f.delay = f.delay(a, o)), r.push(...Ui(u, { ...e, transition: f }, {}));
    }
  }
  return r;
}
function Co(t, e, n) {
  const s = [];
  return sr(t, e, n, { spring: Oe }).forEach(({ keyframes: i, transition: o }, a) => {
    s.push(...Ts(a, i, o));
  }), s;
}
function Lo(t) {
  return Array.isArray(t) && t.some(Array.isArray);
}
function Po(t) {
  function e(n, s, r) {
    let i = [];
    return Lo(n) ? i = Co(n, s, t) : i = Ts(n, s, r, t), new Tn(i);
  }
  return e;
}
const C = Po(), an = () => window.matchMedia("(max-width: 768px)").matches;
function Ss(t, e) {
  let n;
  const s = async (o, a) => {
    if (!t.open)
      return;
    const l = an();
    o == null || o(l), l ? (C(t, { opacity: 0, y: [0, 250] }, { duration: 0.3, ease: "easeOut" }), await C(e, { opacity: 0 }, { duration: 0.3, ease: "easeOut" })) : (C(t, { opacity: 0, scale: [1, 0.98] }, { duration: 0.3, ease: "easeOut" }), await C(e, { opacity: 0 }, { duration: 0.3, ease: "linear" }).then(() => e.style.display = "none")), a == null || a(l), t.close(), n && n.abort();
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
    t.showModal(), await new Promise((u) => setTimeout(u, 50)), window.scrollTo(0, l), setTimeout(() => window.scrollTo(0, l), 0), setTimeout(() => window.scrollTo(0, l), 50), e.style.display = "block";
    const c = an();
    o == null || o(c), c ? (t.style.overflowY = "hidden", C(t, { opacity: [0, 1], y: [250, 0] }, { duration: 0.3, ease: "easeOut" }), await C(e, { opacity: [0, 1] }, { duration: 0.3, ease: "easeOut" }), t.style.overflowY = "auto") : (C(t, { opacity: [0, 1], scale: [0.98, 1] }, { duration: 0.3, ease: "easeOut" }), C(e, { opacity: [0, 1] }, { duration: 0.3, ease: "easeOut" })), a == null || a(c), setTimeout(() => document.addEventListener("click", r, {
      signal: n == null ? void 0 : n.signal
    }), 0), t.addEventListener("keydown", async (u) => {
      u.key === "Escape" && (u.preventDefault(), await s());
    }, { signal: n == null ? void 0 : n.signal });
  }, close: s };
}
var F;
class Io extends EventTarget {
  constructor(n) {
    super();
    Dt(this, F);
    qe(this, F, n);
  }
  get value() {
    return oe(this, F);
  }
  set value(n) {
    oe(this, F) !== n && (qe(this, F, n), this.dispatchEvent(new CustomEvent("change")));
  }
  effect(n) {
    return n(), this.addEventListener("change", n), () => this.removeEventListener("change", n);
  }
  valueOf() {
    return oe(this, F);
  }
  toString() {
    return String(oe(this, F));
  }
}
F = new WeakMap();
const As = (t) => new Io(t);
function Do(t) {
  const e = As(!1);
  return new ResizeObserver(() => {
    const n = t.scrollHeight > t.clientHeight;
    e.value !== n && (e.value = n);
  }).observe(t), { $isOverflowingVertically: e };
}
function Ro(t, e, n) {
  var s = n, r = s.noTrailing, i = r === void 0 ? !1 : r, o = s.noLeading, a = o === void 0 ? !1 : o, l = s.debounceMode, c = l === void 0 ? void 0 : l, u, f = !1, d = 0;
  function h() {
    u && clearTimeout(u);
  }
  function m(b) {
    var p = b || {}, w = p.upcomingOnly, A = w === void 0 ? !1 : w;
    h(), f = !A;
  }
  function v() {
    for (var b = arguments.length, p = new Array(b), w = 0; w < b; w++)
      p[w] = arguments[w];
    var A = this, x = Date.now() - d;
    if (f)
      return;
    function g() {
      d = Date.now(), e.apply(A, p);
    }
    function S() {
      u = void 0;
    }
    !a && c && !u && g(), h(), c === void 0 && x > t ? a ? (d = Date.now(), i || (u = setTimeout(c ? S : g, t))) : g() : i !== !0 && (u = setTimeout(c ? S : g, c === void 0 ? t - x : t));
  }
  return v.cancel = m, v;
}
function Fo(t, e, n) {
  var s = {}, r = s.atBegin, i = r === void 0 ? !1 : r;
  return Ro(t, e, {
    debounceMode: i !== !1
  });
}
class Oo {
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
const xs = 3e3, ke = document.querySelector("#alerts");
if (!ke)
  throw new Error("Alert container not found");
const U = [], Y = As(!1);
Y.effect(Fo(50, () => {
  U.toReversed().forEach(({ element: t, interval: e }, n) => {
    Y.value ? (e.setInterval(xs - n * 250), e.pause()) : e.resume();
    const s = 1 - n * 0.1, r = n === 0 ? 0 : -10 * n, i = U.slice(0, n), o = 5;
    C(t, {
      y: Y.value ? i.reduce((a, { element: l }) => a + l.offsetHeight + o, 0) * -1 : r,
      scale: Y.value ? 1 : s
    }, {
      ease: "easeOut",
      duration: 0.3
    });
  });
}));
function ln(t, e) {
  const n = U.length - 1, s = U.shift();
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
function No(t, e) {
  U.length === 3 && ln("top", !0);
  const n = document.createElement("div");
  n.setAttribute("role", "alert"), n.classList.add("c-toast", "z-50"), n.style.opacity = "0%";
  const s = document.createElement("span");
  if (s.textContent = t, n.append(s), e) {
    const i = document.createElement("div");
    i.innerHTML = e, n.prepend(i);
  }
  n.addEventListener("mouseenter", () => Y.value = !0), n.addEventListener("mouseleave", () => Y.value = !1), ke == null || ke.append(n), C(n, {
    y: ["100%", 0],
    scale: 1,
    opacity: 1
  }, {
    ease: "easeOut",
    duration: 0.3
  }), U.toReversed().forEach(({ element: i }, o) => {
    const a = 1 - (o + 1) * 0.1, l = -10 * (o + 1);
    C(i, {
      y: l,
      scale: a
    }, { ease: "easeOut", duration: 0.3 });
  });
  const r = new Oo(() => ln("bottom", !1), xs);
  U.push({ element: n, interval: r }), r.start();
}
const Ko = 5e3;
async function Bo(t) {
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
      setTimeout(() => (clearInterval(r), s()), Ko);
    }))
  );
}
function Ue(t) {
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
function Es() {
  document.body.classList.add("js-loaded");
}
const qo = async (t) => {
  if (await Bo(t), t.forEach((e) => {
    Ue(e);
    const n = e.contentWindow;
    if (!n)
      return;
    new ResizeObserver(() => Ue(e)).observe(n.document.body);
  }), window.addEventListener("resize", () => {
    t.forEach((e) => Ue(e));
  }), window.location.hash) {
    const e = document.querySelector(window.location.hash);
    e && (await new Promise((n) => setTimeout(n, 200)), e.scrollIntoView());
  }
  Es();
};
function Ho(t) {
  t.forEach((e) => {
    const n = e.querySelectorAll('[role="tab"]'), s = Array.from(e.querySelectorAll('[role="tabpanel"]')), r = e.querySelector(".tab-trigger-background");
    if (!r)
      throw new Error("No tab trigger background found");
    const i = (a, l) => {
      const c = a.offsetWidth;
      if (l) {
        const f = a === n[0] ? a.offsetLeft : a.offsetLeft + 1;
        C(r, {
          width: c,
          x: `${f}px`
        }, {
          duration: 0.3,
          easing: "ease-out",
          type: Oe,
          bounce: 0.1
        });
      } else
        r.style.width = `${c}px`, r.style.transform = "translateX(2px)";
    }, o = n[0];
    i(o, !1), n.forEach((a) => a.addEventListener("click", () => {
      n.forEach((l) => {
        const c = l === a;
        l.setAttribute("aria-selected", c.toString());
        const u = s.find((f) => f.getAttribute("aria-labelledby") === l.id);
        u == null || u.setAttribute("tab-index", c ? "0" : "-1"), u == null || u.classList.toggle("hidden", !c), c && i(a, !0);
      });
    }));
  });
}
const We = "in2theme", Se = {
  normal: "theme-normal",
  light: "theme-light",
  dark: "theme-dark"
}, _o = (t) => {
  const e = window.matchMedia("(prefers-color-scheme: dark)");
  function n() {
    const o = localStorage.getItem(We);
    return o || localStorage.setItem(We, "normal"), o;
  }
  function s() {
    const o = n();
    let a = Se[o];
    o === "normal" && e.matches && (a = Se.dark);
    const l = (f) => {
      Object.values(Se).forEach((d) => f.classList.remove(d)), f.classList.remove("dark");
    }, c = (f) => {
      f.classList.add(a), a === Se.dark && f.classList.add("dark");
    };
    l(t), c(t);
    const u = document.querySelectorAll("iframe");
    u && u.forEach((f) => {
      l(f), c(f);
    }), l(document.body), c(document.body), Array.from(document.querySelectorAll("iframe")).filter((f) => f.src.includes("embed.figma.com")).forEach((f) => {
      const d = new URL(f.src);
      o === "normal" ? d.searchParams.set("theme", "system") : d.searchParams.set("theme", o), f.src = d.href;
    });
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
function un(t, e, n, s) {
  return e.navigator.platform.indexOf("Mac") === 0 && !t.includes("meta+ctrl") ? t.replace(n, s) : t;
}
function $o() {
  return [
    (t, e) => un(t, e, "meta", "ctrl"),
    (t, e) => un(t, e, "ctrl", "meta")
  ];
}
function j(t, e) {
  e && (e.tabIndex = 0, e.focus(), t.tabIndex = -1);
}
function Ae(t) {
  let e = t.closest('[focusgroup]:not([focusgroup="none"])');
  if (e) return e;
}
function xe(t) {
  if (t.hasAttribute("focusgroup"))
    return [...t.querySelectorAll('*:not([focusgroup="none"])')].filter((n) => n.role === "button" || n.type === "button" || n.role === "checkbox" || n.type === "checkbox");
}
function Uo(t) {
  let e = t.getAttribute("focusgroup");
  if (e !== null) return !e.split(" ").includes("block");
}
function Wo() {
  return (t) => {
    let e = !1;
    function n(a) {
      let l = Ae(a.target);
      if (!l) {
        s();
        return;
      }
      let c = xe(l), u = Array.from(c).indexOf(a.target), f = "ArrowDown", d = "ArrowUp";
      Uo(l) && (t.document.dir === "rtl" ? (f = "ArrowLeft", d = "ArrowRight") : (f = "ArrowRight", d = "ArrowLeft")), a.key === f ? (a.preventDefault(), c[u + 1] ? j(a.target, c[u + 1]) : l.getAttribute("focusgroup").includes("wrap") && j(a.target, c[0])) : a.key === d ? (a.preventDefault(), c[u - 1] ? j(a.target, c[u - 1]) : l.getAttribute("focusgroup").includes("wrap") && j(a.target, c[c.length - 1])) : a.key === "Home" ? (a.preventDefault(), j(a.target, c[0])) : a.key === "End" && (a.preventDefault(), j(a.target, c[c.length - 1]));
    }
    function s() {
      e = !1, t.removeEventListener("keydown", n);
    }
    function r(a) {
      var c;
      let l = Ae(a.target);
      if (l) {
        e || (e = !0, t.addEventListener("keydown", n));
        let u = xe(l);
        u.some((f) => f.getAttribute("tabindex") === "0") ? u.forEach((f) => {
          f !== a.target && f.setAttribute("tabindex", -1);
        }) : (u.forEach(
          (f, d) => f.setAttribute("tabindex", d === 0 ? 0 : -1)
        ), (c = u[0]) == null || c.focus());
      } else e && s();
    }
    function i(a) {
      var c;
      let l = Ae(a.target);
      (c = l == null ? void 0 : l.getAttribute("focusgroup")) != null && c.includes("no-memory") && xe(l).forEach((f, d) => {
        f.setAttribute("tabindex", d === 0 ? 0 : -1);
      }), (!a.relatedTarget || a.relatedTarget === t.document) && s();
    }
    function o(a) {
      let l = Ae(a.target);
      if (l) {
        let c = xe(l);
        for (let u of c)
          u !== a.target && u.setAttribute("tabindex", -1);
        a.target.setAttribute("tabindex", 0);
      }
    }
    return t.addEventListener("click", o), t.addEventListener("focusin", r), t.addEventListener("focusout", i), () => {
      s(), t.removeEventListener("click", o), t.removeEventListener("focusin", r), t.removeEventListener("focusout", i);
    };
  };
}
let Go = {
  button: ["toolbar"],
  checkbox: ["toolbar"],
  menuitem: ["menu", "menubar"],
  option: ["listbox"],
  tab: ["tablist"]
};
function ae(t, e) {
  e.tabIndex = 0, e.focus(), t.tabIndex = -1;
}
function Ge(t) {
  let e = t.role || t.type || t.tagName;
  if (!e) return null;
  let n = Go[e.toLowerCase()];
  if (!n) return null;
  for (let s of n) {
    let r = t.closest(`[role=${s}]`);
    if (r) return r;
  }
}
function je(t, e) {
  return e.role === "toolbar" ? jo(e) : e.querySelectorAll(`[role=${t.role}]`);
}
function jo(t) {
  return [...t.querySelectorAll("*")].filter((n) => n.role === "button" || n.type === "button" || n.role === "checkbox" || n.type === "checkbox");
}
function zo(t) {
  let e = t.getAttribute("aria-orientation");
  if (e === "vertical") return !1;
  if (e === "horizontal") return !0;
  let n = t.role;
  return n === "menubar" || n === "tablist" || n === "toolbar";
}
function Yo(t) {
  return (e) => {
    let n = !1, s = 300, r = 0, i = "";
    function o(f) {
      let d = Ge(f.target);
      if (!d) {
        a();
        return;
      }
      let h = je(f.target, d), m = Array.from(h).indexOf(f.target), v = "ArrowDown", b = "ArrowUp";
      if (zo(d) && (e.document.dir === "rtl" ? (v = "ArrowLeft", b = "ArrowRight") : (v = "ArrowRight", b = "ArrowLeft")), f.key === v)
        f.preventDefault(), ae(f.target, h[m + 1] || h[0]);
      else if (f.key === b)
        f.preventDefault(), ae(f.target, h[m - 1] || h[h.length - 1]);
      else if (f.key === "Home")
        f.preventDefault(), ae(f.target, h[0]);
      else if (f.key === "End")
        f.preventDefault(), ae(f.target, h[h.length - 1]);
      else if (f.key.length === 1 && d.role !== "tablist") {
        f.timeStamp - r <= s ? i += f.key.toLowerCase() : i = f.key.toLowerCase(), r = f.timeStamp;
        let p = Array.from(h).find((w) => {
          var A, x, g;
          return (g = (x = (A = w.textContent) == null ? void 0 : A.trim()) == null ? void 0 : x.toLowerCase()) == null ? void 0 : g.startsWith(i);
        });
        p && (f.preventDefault(), ae(f.target, p));
      }
    }
    function a() {
      n = !1, e.removeEventListener("keydown", o);
    }
    function l(f) {
      let d = Ge(f.target);
      if (d) {
        n || (n = !0, e.addEventListener("keydown", o));
        let h = je(f.target, d);
        for (let m of h)
          m !== f.target && m.setAttribute("tabindex", -1);
      } else n && a();
    }
    function c(f) {
      (!f.relatedTarget || f.relatedTarget === e.document) && a();
    }
    function u(f) {
      let d = Ge(f.target);
      if (d) {
        let h = je(f.target, d);
        for (let m of h)
          m !== f.target && m.setAttribute("tabindex", -1);
        f.target.setAttribute("tabindex", 0);
      }
    }
    return e.addEventListener("click", u), e.addEventListener("focusin", l), e.addEventListener("focusout", c), () => {
      a(), e.removeEventListener("click", u), e.removeEventListener("focusin", l), e.removeEventListener("focusout", c);
    };
  };
}
function Xo() {
  return (t) => {
    let e, n;
    function s(i) {
      if (i.target.getAttribute("aria-hidden") === "true") {
        e = i.target, e.setAttribute("aria-hidden", "false"), n = e.hidden, n && (e.hidden = !1);
        let o = i.target.querySelector(
          'a, button, select, textarea, input:not([type=radio]), [type=radio]:checked, [tabindex]:not([tabindex="-1"])'
        );
        o && (o.tabIndex = 0);
      }
    }
    function r(i) {
      e && e.contains(i.target) && (!i.relatedTarget || !e.contains(i.relatedTarget)) && (i.target.tabIndex = -1, e.setAttribute("aria-hidden", "true"), n && (e.hidden = !0), e = null);
    }
    return t.addEventListener("keyuxJump", s), t.addEventListener("focusout", r), () => {
      t.removeEventListener("keyuxJump", s), t.removeEventListener("focusout", r);
    };
  };
}
let Zo = /^[^\x00-\x7F]$/, Jo = {
  checkbox: !0,
  file: !0,
  radio: !0
}, Qo = {
  button: !0,
  reset: !0,
  submit: !0
}, ea = {
  " ": "space",
  "+": "plus"
};
function Vs(t, e) {
  if (e.tagName !== "BODY" && t !== e)
    return e.hasAttribute("data-keyux-ignore-hotkeys") || e.getAttribute("aria-hidden") === "true" || e.hasAttribute("inert") ? !0 : Vs(t, e.parentNode);
}
function cn(t, e) {
  for (let n of e)
    if (!Vs(t, n))
      return n;
}
function fn(t, e, n) {
  let s = e;
  for (let [a] of n)
    if (s = a(s, t), !s) return !1;
  let r = t.document, i = r.activeElement, o = i.getAttribute("data-keyux-hotkeys");
  if (o) {
    let a = r.querySelector(`#${o}`);
    if (a) {
      let l = a.querySelector(`[aria-keyshortcuts="${s}" i]`);
      if (l) return l;
    }
  }
  return cn(
    i,
    i.querySelectorAll(`[aria-keyshortcuts="${s}" i]`)
  ) || cn(
    r,
    r.querySelectorAll(`[aria-keyshortcuts="${s}" i]`)
  );
}
function ta(t, e, n) {
  let s = "";
  t.metaKey && (s += "meta+"), t.ctrlKey && (s += "ctrl+"), t.altKey && (s += "alt+"), t.shiftKey && (s += "shift+");
  let r = s;
  r += ea[t.key] ?? t.key.toLowerCase();
  let i = fn(e, r, n);
  if (!i && (t.key.length > 1 || Zo.test(t.key)) && /^Key.$/.test(t.code)) {
    let o = t.code.replace(/^Key/, "").toLowerCase();
    i = fn(e, s + o, n);
  }
  return i;
}
function na(t = []) {
  return (e) => {
    function n(s) {
      let r = s.ctrlKey || s.metaKey || s.altKey, i = s.target.isContentEditable || s.target.tagName === "TEXTAREA" || s.target.tagName === "INPUT" && !Jo[s.target.type], o = s.target.role === "menuitem";
      if (!r && (i || o))
        return;
      let a = ta(s, e, t);
      a && (a.tagName === "TEXTAREA" || a.tagName === "INPUT" && !Qo[a.type] ? setTimeout(() => {
        a.focus();
      }) : a.click());
    }
    return e.addEventListener("keydown", n), () => {
      e.removeEventListener("keydown", n);
    };
  };
}
function sa() {
  return (t) => {
    let e = [];
    function n(l) {
      let c = t.document.activeElement;
      c && c !== t.document.body && e.push(new WeakRef(c)), l.focus({ focusVisible: !0 });
    }
    function s() {
      let l = e.pop();
      if (!l) {
        t.document.activeElement.blur();
        return;
      }
      let c = l.deref();
      c && c.isConnected ? c.focus() : s();
    }
    let r = 0, i;
    function o(l) {
      clearInterval(i);
      let c = l.getAttribute("aria-controls");
      i = setInterval(() => {
        if (r++ > 50) {
          clearInterval(i);
          return;
        }
        let u = t.document.getElementById(c);
        if (u) {
          let f = u.querySelector(
            'a, button, select, textarea, input:not([type=radio]), [type=radio]:checked, [tabindex]:not([tabindex="-1"])'
          );
          f && (clearInterval(i), u.dispatchEvent(
            new t.CustomEvent("keyuxJump", { bubbles: !0 })
          ), n(f));
        }
      }, 50);
    }
    function a(l) {
      l.target.getAttribute("aria-controls") && l.key === "Enter" && o(l.target), l.key === "Escape" && s();
    }
    return t.addEventListener("keydown", a), () => {
      t.removeEventListener("keydown", a);
    };
  };
}
function ra(t, e) {
  let n = e.map((s) => s(t));
  return () => {
    n.forEach((s) => s());
  };
}
const ia = $o();
ra(window, [
  na([ia]),
  Yo(),
  Wo(),
  sa(),
  Xo()
]);
function oa() {
  const t = navigator.userAgent.toLowerCase();
  return t.includes("mac") ? "mac" : t.includes("linux") ? "linux" : t.includes("win") ? "windows" : "unknown";
}
function aa() {
  const t = document.querySelectorAll("iframe"), e = document.querySelector("#styleguide-previous"), n = document.querySelector("#styleguide-next"), s = (r) => {
    document.activeElement instanceof HTMLButtonElement || (e && r.key === "ArrowLeft" && (r.preventDefault(), e.click()), n && r.key === "ArrowRight" && (r.preventDefault(), n.click()));
  };
  t.forEach((r) => {
    const i = r.contentWindow;
    i && i.addEventListener("keydown", s);
  }), window.addEventListener("keydown", s);
}
function la() {
  const t = document.querySelectorAll("iframe"), e = (n) => {
    n.key === "k" && (n.metaKey || n.ctrlKey) && (n.preventDefault(), window.dispatchEvent(new Event("styleguideOpenSearch")));
  };
  t.forEach((n) => {
    const s = n.contentWindow;
    s && s.addEventListener("keydown", e);
  }), window.addEventListener("keydown", e);
}
const ua = oa();
document.body.setAttribute("data-os", ua);
const ca = "ontouchstart" in window || navigator.maxTouchPoints > 0;
document.body.setAttribute("data-is-mobile", String(ca));
aa();
la();
function fa() {
  const t = document.querySelector("header");
  if (!t)
    throw new Error("No header found");
  const e = () => t.getBoundingClientRect().height;
  document.documentElement.style.setProperty("--header-height", `${e()}px`), window.addEventListener("resize", () => {
    document.documentElement.style.setProperty("--header-height", `${e()}px`);
  });
}
function da() {
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
fa();
da();
const Ms = document.querySelector("#search-dialog");
if (!Ms)
  throw new Error("No search dialog found");
const ks = document.querySelector(".dialog-backdrop");
if (!ks)
  throw new Error("No dialog backdrop found");
const xt = document.querySelectorAll("[data-open-search]");
if (xt.length === 0)
  throw new Error("No open search buttons found");
const Z = document.querySelector("#search-input");
if (!Z)
  throw new Error("No search input found");
const Cs = document.querySelector("#search-list");
if (!Cs)
  throw new Error("No search list found");
const Ls = document.querySelectorAll(".search-category__item--active");
if (!Ls)
  throw new Error("No search results found");
const Ps = document.querySelector("#search-no-results");
if (!Ps)
  throw new Error("No search no results element found");
const { show: ha, close: va } = Ss(Ms, ks);
async function Is() {
  await ha(
    (t) => {
      t && Z.setAttribute("inert", "");
    },
    (t) => {
      t && Z.removeAttribute("inert"), xt.forEach((e) => e.ariaExpanded = "true"), Z.ariaExpanded = "true", Ds();
    }
  );
}
function Ds() {
  const t = Z.value.toLowerCase().trim();
  let e = !1;
  Ls.forEach((n) => {
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
  }), Cs.classList.toggle("hidden", !e), Ps.classList.toggle("hidden", e);
}
Z.addEventListener("input", Ds);
xt.forEach((t) => t.addEventListener("click", Is));
window.addEventListener("styleguideOpenSearch", Is);
const dn = Array.from(document.querySelectorAll(".preview-iframe"));
dn.length > 0 ? qo(dn).catch(console.error) : Es();
const hn = document.querySelector(".theme-select");
hn && _o(hn);
const ma = document.querySelectorAll(".styleguide-section");
ma.forEach((t) => {
  new ResizeObserver(() => {
    const e = t.scrollHeight > 600;
    t.classList.toggle("styleguide-section--large", e);
  }).observe(t);
});
const mn = document.querySelectorAll(".tabs");
mn.length > 0 && Ho(mn);
const ze = document.querySelectorAll("details:has(.code-highlight)");
ze.length > 0 && (ze.forEach((t) => {
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
    await t(), ze.forEach((n) => {
      const s = n.querySelector(".code-highlight");
      if (!s)
        throw new Error("No code element found");
      e(s).catch(console.error);
    });
  });
}, 5e3));
const Ee = document.querySelectorAll("[data-code-audit-iframe]"), Ye = document.querySelector("#code-audit-dialog"), pn = document.querySelector(".dialog-backdrop");
Ee.length > 0 && Ye && pn && (async () => {
  const { createHtmlValidator: t, auditCode: e } = await import("./html-validator-2mL8aT6P.js"), { show: n, close: s } = Ss(Ye, pn);
  Ee.forEach((r) => r.addEventListener("click", async () => {
    Ee.forEach((o) => o.setAttribute("aria-expanded", "false")), r.setAttribute("disabled", "");
    const { isValid: i } = await e(r, Ye, s);
    i ? (r.classList.add("text-green-500", "!cursor-not-allowed"), No(
      "Scanned HTML, no issues found!",
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4 text-green-500/50"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clip-rule="evenodd" /></svg>'
    ), setTimeout(() => {
      r.classList.remove("text-green-500", "!cursor-not-allowed"), r.removeAttribute("disabled");
    }, 5e3)) : (r.setAttribute("aria-expanded", "true"), r.removeAttribute("disabled"), r.classList.add("text-red-500"), await n(
      void 0,
      () => {
        Ee.forEach((o) => {
          o.setAttribute("aria-expanded", "false"), setTimeout(() => o.classList.remove("text-red-500"), 2500);
        });
      }
    ));
  })), setTimeout(() => {
    requestIdleCallback(t);
  }, 8e3);
})();
const gn = document.querySelector("#icon-search-input"), yn = document.querySelector("#icon-search-input-reset"), bn = document.querySelector("#icon-search-list");
gn && bn && yn && import("./icons-RtY5PbIw.js").then(({ default: t }) => t(gn, bn, yn)).catch(console.error);
const Rs = "data-clipboard-value", vn = document.querySelectorAll(`button[${Rs}]`);
vn.length > 0 && import("./clipboard-C5ievot-.js").then(({ default: t }) => t(vn, Rs)).catch(console.error);
const wn = document.querySelectorAll(".markdown-container-folded");
wn.length > 0 && wn.forEach((t) => {
  const e = t.querySelector(".markdown-container");
  if (!e)
    throw new Error("No markdown container found");
  const n = t.querySelector(".markdown-show-more-container");
  if (!n)
    throw new Error("No show more container found");
  const s = t.querySelector(".markdown-show-more");
  if (!s)
    throw new Error("No show more button found");
  const { $isOverflowingVertically: r } = Do(t), i = () => {
    const a = e.scrollHeight > e.clientHeight;
    n.classList.toggle("hidden", !a);
  };
  i();
  const o = r.effect(i);
  s.addEventListener("click", async () => {
    o();
    const a = e.scrollHeight;
    C(e, {
      maxHeight: `${a}px`
    }, { duration: 0.5 }).then(() => {
      e.classList.remove("max-h-[400px]"), e.style.maxHeight = "";
    }), C(n, {
      opacity: 0
    }, { duration: 0.5 }).then(() => n.classList.add("hidden"));
  });
});
let Ve;
window.addEventListener("scroll", () => {
  Ve && (clearTimeout(Ve), Ve = void 0), document.body.classList.contains("is-scrolling") || document.body.classList.add("is-scrolling"), Ve = setTimeout(() => {
    document.body.classList.remove("is-scrolling");
  }, 250);
});
export {
  C as a,
  No as r,
  Oe as s
};
