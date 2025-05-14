var Hs = Object.defineProperty;
var Rt = (t) => {
  throw TypeError(t);
};
var $s = (t, e, n) => e in t ? Hs(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var $ = (t, e, n) => $s(t, typeof e != "symbol" ? e + "" : e, n), Ot = (t, e, n) => e.has(t) || Rt("Cannot " + n);
var ce = (t, e, n) => (Ot(t, e, "read from private field"), n ? n.call(t) : e.get(t)), Ft = (t, e, n) => e.has(t) ? Rt("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Ne = (t, e, n, s) => (Ot(t, e, "write to private field"), s ? s.call(t, n) : e.set(t, n), n);
const C = (t) => !!(t && t.getVelocity);
function ot(t) {
  return typeof t == "object" && !Array.isArray(t);
}
function Ws(t, e, n) {
  if (t instanceof EventTarget)
    return [t];
  if (typeof t == "string") {
    let s = document;
    const r = (n == null ? void 0 : n[t]) ?? s.querySelectorAll(t);
    return r ? Array.from(r) : [];
  }
  return Array.from(t);
}
function En(t, e, n, s) {
  return typeof t == "string" && ot(e) ? Ws(t, n, s) : t instanceof NodeList ? Array.from(t) : Array.isArray(t) ? t : [t];
}
function _s(t, e, n) {
  return t * (e + 1);
}
function Pt(t, e, n, s) {
  return typeof e == "number" ? e : e.startsWith("-") || e.startsWith("+") ? Math.max(0, t + parseFloat(e)) : e === "<" ? n : s.get(e) ?? t;
}
const be = (t, e, n) => t + (e - t) * n, Us = (t, e, n) => {
  const s = e - t;
  return ((n - t) % s + s) % s + t;
}, Vn = (t) => Array.isArray(t) && typeof t[0] != "number";
function Mn(t, e) {
  return Vn(t) ? t[Us(0, t.length, e)] : t;
}
function Gs(t, e) {
  t.indexOf(e) === -1 && t.push(e);
}
function kn(t, e) {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}
function js(t, e, n) {
  for (let s = 0; s < t.length; s++) {
    const r = t[s];
    r.at > e && r.at < n && (kn(t, r), s--);
  }
}
function zs(t, e, n, s, r, i) {
  js(t, r, i);
  for (let o = 0; o < e.length; o++)
    t.push({
      value: e[o],
      at: be(r, i, s[o]),
      easing: Mn(n, o)
    });
}
function Ys(t, e) {
  for (let n = 0; n < t.length; n++)
    t[n] = t[n] / (e + 1);
}
function Xs(t, e) {
  return t.at === e.at ? t.value === null ? 1 : e.value === null ? -1 : 0 : t.at - e.at;
}
const at = /* @__NO_SIDE_EFFECTS__ */ (t, e, n) => {
  const s = e - t;
  return s === 0 ? 1 : (n - t) / s;
};
function Ln(t, e) {
  const n = t[t.length - 1];
  for (let s = 1; s <= e; s++) {
    const r = /* @__PURE__ */ at(0, e, s);
    t.push(be(n, 1, r));
  }
}
function Cn(t) {
  const e = [0];
  return Ln(e, t.length - 1), e;
}
function lt(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
const Re = 2e4;
function ct(t) {
  let e = 0;
  const n = 50;
  let s = t.next(e);
  for (; !s.done && e < Re; )
    e += n, s = t.next(e);
  return e >= Re ? 1 / 0 : e;
}
const O = /* @__NO_SIDE_EFFECTS__ */ (t) => t * 1e3, N = /* @__NO_SIDE_EFFECTS__ */ (t) => t / 1e3;
function In(t, e = 100, n) {
  const s = n({ ...t, keyframes: [0, e] }), r = Math.min(ct(s), Re);
  return {
    type: "keyframes",
    ease: (i) => s.next(r * i).value / e,
    duration: /* @__PURE__ */ N(r)
  };
}
let ut = () => {
};
const Zs = "easeInOut";
function Js(t, { defaultTransition: e = {}, ...n } = {}, s, r) {
  const i = e.duration || 0.3, o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), l = {}, f = /* @__PURE__ */ new Map();
  let c = 0, u = 0, d = 0;
  for (let h = 0; h < t.length; h++) {
    const p = t[h];
    if (typeof p == "string") {
      f.set(p, u);
      continue;
    } else if (!Array.isArray(p)) {
      f.set(p.name, Pt(u, p.at, c, f));
      continue;
    }
    let [y, b, w = {}] = p;
    w.at !== void 0 && (u = Pt(u, w.at, c, f));
    let S = 0;
    const v = (A, m, x, V = 0, T = 0) => {
      const E = Qs(A), { delay: I = 0, times: R = Cn(E), type: Pe = "keyframes", repeat: ve, repeatType: Fa, repeatDelay: Pa = 0, ...qs } = m;
      let { ease: q = e.ease || "easeOut", duration: F } = m;
      const Mt = typeof I == "function" ? I(V, T) : I, kt = E.length, Lt = lt(Pe) ? Pe : r == null ? void 0 : r[Pe];
      if (kt <= 2 && Lt) {
        let oe = 100;
        if (kt === 2 && nr(E)) {
          const ae = E[1] - E[0];
          oe = Math.abs(ae);
        }
        const Se = { ...qs };
        F !== void 0 && (Se.duration = /* @__PURE__ */ O(F));
        const Ae = In(Se, oe, Lt);
        q = Ae.ease, F = Ae.duration;
      }
      F ?? (F = i);
      const Ct = u + Mt;
      R.length === 1 && R[0] === 0 && (R[1] = 1);
      const It = R.length - E.length;
      if (It > 0 && Ln(R, It), E.length === 1 && E.unshift(null), ve) {
        F = _s(F, ve);
        const oe = [...E], Se = [...R];
        q = Array.isArray(q) ? [...q] : [q];
        const Ae = [...q];
        for (let ae = 0; ae < ve; ae++) {
          E.push(...oe);
          for (let le = 0; le < oe.length; le++)
            R.push(Se[le] + (ae + 1)), q.push(le === 0 ? "linear" : Mn(Ae, le - 1));
        }
        Ys(R, ve);
      }
      const Dt = Ct + F;
      zs(x, E, q, R, Ct, Dt), S = Math.max(Mt + F, S), d = Math.max(Dt, d);
    };
    if (C(y)) {
      const A = Nt(y, a);
      v(b, w, Kt("default", A));
    } else {
      const A = En(y, b, s, l), m = A.length;
      for (let x = 0; x < m; x++) {
        b = b, w = w;
        const V = A[x], T = Nt(V, a);
        for (const E in b)
          v(b[E], er(w, E), Kt(E, T), x, m);
      }
    }
    c = u, u += S;
  }
  return a.forEach((h, p) => {
    for (const y in h) {
      const b = h[y];
      b.sort(Xs);
      const w = [], S = [], v = [];
      for (let m = 0; m < b.length; m++) {
        const { at: x, value: V, easing: T } = b[m];
        w.push(V), S.push(/* @__PURE__ */ at(0, d, x)), v.push(T || "easeOut");
      }
      S[0] !== 0 && (S.unshift(0), w.unshift(w[0]), v.unshift(Zs)), S[S.length - 1] !== 1 && (S.push(1), w.push(null)), o.has(p) || o.set(p, {
        keyframes: {},
        transition: {}
      });
      const A = o.get(p);
      A.keyframes[y] = w, A.transition[y] = {
        ...e,
        duration: d,
        ease: v,
        times: S,
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
function Qs(t) {
  return Array.isArray(t) ? t : [t];
}
function er(t, e) {
  return t && t[e] ? {
    ...t,
    ...t[e]
  } : { ...t };
}
const tr = (t) => typeof t == "number", nr = (t) => t.every(tr), me = /* @__PURE__ */ new WeakMap(), sr = (t) => Array.isArray(t);
function Bt(t) {
  const e = [{}, {}];
  return t == null || t.values.forEach((n, s) => {
    e[0][s] = n.get(), e[1][s] = n.getVelocity();
  }), e;
}
function Dn(t, e, n, s) {
  if (typeof e == "function") {
    const [r, i] = Bt(s);
    e = e(n !== void 0 ? n : t.custom, r, i);
  }
  if (typeof e == "string" && (e = t.variants && t.variants[e]), typeof e == "function") {
    const [r, i] = Bt(s);
    e = e(n !== void 0 ? n : t.custom, r, i);
  }
  return e;
}
function rr(t, e, n) {
  const s = t.getProps();
  return Dn(s, e, s.custom, t);
}
const xe = [
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
function ir(t, e) {
  let n = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), r = !1, i = !1;
  const o = /* @__PURE__ */ new WeakSet();
  let a = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function l(c) {
    o.has(c) && (f.schedule(c), t()), c(a);
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
const K = {}, or = 40;
function ar(t, e) {
  let n = !1, s = !0;
  const r = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, i = () => n = !0, o = xe.reduce((v, A) => (v[A] = ir(i), v), {}), { setup: a, read: l, resolveKeyframes: f, preUpdate: c, update: u, preRender: d, render: h, postRender: p } = o, y = () => {
    const v = K.useManualTiming ? r.timestamp : performance.now();
    n = !1, K.useManualTiming || (r.delta = s ? 1e3 / 60 : Math.max(Math.min(v - r.timestamp, or), 1)), r.timestamp = v, r.isProcessing = !0, a.process(r), l.process(r), f.process(r), c.process(r), u.process(r), d.process(r), h.process(r), p.process(r), r.isProcessing = !1, n && e && (s = !1, t(y));
  }, b = () => {
    n = !0, s = !0, r.isProcessing || t(y);
  };
  return { schedule: xe.reduce((v, A) => {
    const m = o[A];
    return v[A] = (x, V = !1, T = !1) => (n || b(), m.schedule(x, V, T)), v;
  }, {}), cancel: (v) => {
    for (let A = 0; A < xe.length; A++)
      o[xe[A]].cancel(v);
  }, state: r, steps: o };
}
const te = /* @__NO_SIDE_EFFECTS__ */ (t) => t, { schedule: B, cancel: Ge, state: Oe } = /* @__PURE__ */ ar(typeof requestAnimationFrame < "u" ? requestAnimationFrame : te, !0);
let Ie;
function lr() {
  Ie = void 0;
}
const D = {
  now: () => (Ie === void 0 && D.set(Oe.isProcessing || K.useManualTiming ? Oe.timestamp : performance.now()), Ie),
  set: (t) => {
    Ie = t, queueMicrotask(lr);
  }
};
class Rn {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return Gs(this.subscriptions, e), () => kn(this.subscriptions, e);
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
function On(t, e) {
  return e ? t * (1e3 / e) : 0;
}
const qt = 30, cr = (t) => !isNaN(parseFloat(t));
class ur {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(e, n = {}) {
    this.version = "__VERSION__", this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s, r = !0) => {
      var o, a;
      const i = D.now();
      if (this.updatedAt !== i && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && ((o = this.events.change) == null || o.notify(this.current), this.dependents))
        for (const l of this.dependents)
          l.dirty();
      r && ((a = this.events.renderRequest) == null || a.notify(this.current));
    }, this.hasAnimated = !1, this.setCurrent(e), this.owner = n.owner;
  }
  setCurrent(e) {
    this.current = e, this.updatedAt = D.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = cr(this.current));
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
    this.events[e] || (this.events[e] = new Rn());
    const s = this.events[e].add(n);
    return e === "change" ? () => {
      s(), B.read(() => {
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
  dirty() {
    var e;
    (e = this.events.change) == null || e.notify(this.current);
  }
  addDependent(e) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(e);
  }
  removeDependent(e) {
    this.dependents && this.dependents.delete(e);
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
    const e = D.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > qt)
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, qt);
    return On(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
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
    var e, n;
    (e = this.dependents) == null || e.clear(), (n = this.events.destroy) == null || n.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function pe(t, e) {
  return new ur(t, e);
}
function fr(t, e, n) {
  t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, pe(n));
}
function dr(t) {
  return sr(t) ? t[t.length - 1] || 0 : t;
}
function hr(t, e) {
  const n = rr(t, e);
  let { transitionEnd: s = {}, transition: r = {}, ...i } = n || {};
  i = { ...i, ...s };
  for (const o in i) {
    const a = dr(i[o]);
    fr(t, o, a);
  }
}
function mr(t) {
  return !!(C(t) && t.add);
}
function pr(t, e) {
  const n = t.getValue("willChange");
  if (mr(n))
    return n.add(e);
  if (!n && K.WillChange) {
    const s = new K.WillChange("auto");
    t.addValue("willChange", s), s.add(e);
  }
}
const ft = (t) => t.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), gr = "framerAppearId", yr = "data-" + ft(gr);
function br(t) {
  return t.props[yr];
}
const wr = (t) => t !== null;
function Tr(t, { repeat: e, repeatType: n = "loop" }, s) {
  const r = t.filter(wr), i = e && n !== "loop" && e % 2 === 1 ? 0 : r.length - 1;
  return r[i];
}
const ne = [
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
], se = new Set(ne), vr = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, Sr = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), Ar = {
  type: "keyframes",
  duration: 0.8
}, xr = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, Er = (t, { keyframes: e }) => e.length > 2 ? Ar : se.has(t) ? t.startsWith("scale") ? Sr(e[1]) : vr : xr;
function Vr({ when: t, delay: e, delayChildren: n, staggerChildren: s, staggerDirection: r, repeat: i, repeatType: o, repeatDelay: a, from: l, elapsed: f, ...c }) {
  return !!Object.keys(c).length;
}
function Fn(t, e) {
  return (t == null ? void 0 : t[e]) ?? (t == null ? void 0 : t.default) ?? t;
}
const Pn = (t) => (e) => typeof e == "string" && e.startsWith(t), Nn = /* @__PURE__ */ Pn("--"), Mr = /* @__PURE__ */ Pn("var(--"), dt = (t) => Mr(t) ? kr.test(t.split("/*")[0].trim()) : !1, kr = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, z = (t, e, n) => n > e ? e : n < t ? t : n, re = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, ge = {
  ...re,
  transform: (t) => z(0, 1, t)
}, Ee = {
  ...re,
  default: 1
}, de = (t) => Math.round(t * 1e5) / 1e5, ht = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function Lr(t) {
  return t == null;
}
const Cr = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, mt = (t, e) => (n) => !!(typeof n == "string" && Cr.test(n) && n.startsWith(t) || e && !Lr(n) && Object.prototype.hasOwnProperty.call(n, e)), Kn = (t, e, n) => (s) => {
  if (typeof s != "string")
    return s;
  const [r, i, o, a] = s.match(ht);
  return {
    [t]: parseFloat(r),
    [e]: parseFloat(i),
    [n]: parseFloat(o),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, Ir = (t) => z(0, 255, t), Ke = {
  ...re,
  transform: (t) => Math.round(Ir(t))
}, W = {
  test: /* @__PURE__ */ mt("rgb", "red"),
  parse: /* @__PURE__ */ Kn("red", "green", "blue"),
  transform: ({ red: t, green: e, blue: n, alpha: s = 1 }) => "rgba(" + Ke.transform(t) + ", " + Ke.transform(e) + ", " + Ke.transform(n) + ", " + de(ge.transform(s)) + ")"
};
function Dr(t) {
  let e = "", n = "", s = "", r = "";
  return t.length > 5 ? (e = t.substring(1, 3), n = t.substring(3, 5), s = t.substring(5, 7), r = t.substring(7, 9)) : (e = t.substring(1, 2), n = t.substring(2, 3), s = t.substring(3, 4), r = t.substring(4, 5), e += e, n += n, s += s, r += r), {
    red: parseInt(e, 16),
    green: parseInt(n, 16),
    blue: parseInt(s, 16),
    alpha: r ? parseInt(r, 16) / 255 : 1
  };
}
const je = {
  test: /* @__PURE__ */ mt("#"),
  parse: Dr,
  transform: W.transform
}, we = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (e) => typeof e == "string" && e.endsWith(t) && e.split(" ").length === 1,
  parse: parseFloat,
  transform: (e) => `${e}${t}`
}), H = /* @__PURE__ */ we("deg"), J = /* @__PURE__ */ we("%"), g = /* @__PURE__ */ we("px"), Rr = /* @__PURE__ */ we("vh"), Or = /* @__PURE__ */ we("vw"), Ht = {
  ...J,
  parse: (t) => J.parse(t) / 100,
  transform: (t) => J.transform(t * 100)
}, X = {
  test: /* @__PURE__ */ mt("hsl", "hue"),
  parse: /* @__PURE__ */ Kn("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: e, lightness: n, alpha: s = 1 }) => "hsla(" + Math.round(t) + ", " + J.transform(de(e)) + ", " + J.transform(de(n)) + ", " + de(ge.transform(s)) + ")"
}, k = {
  test: (t) => W.test(t) || je.test(t) || X.test(t),
  parse: (t) => W.test(t) ? W.parse(t) : X.test(t) ? X.parse(t) : je.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? W.transform(t) : X.transform(t)
}, Fr = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function Pr(t) {
  var e, n;
  return isNaN(t) && typeof t == "string" && (((e = t.match(ht)) == null ? void 0 : e.length) || 0) + (((n = t.match(Fr)) == null ? void 0 : n.length) || 0) > 0;
}
const Bn = "number", qn = "color", Nr = "var", Kr = "var(", $t = "${}", Br = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function ye(t) {
  const e = t.toString(), n = [], s = {
    color: [],
    number: [],
    var: []
  }, r = [];
  let i = 0;
  const a = e.replace(Br, (l) => (k.test(l) ? (s.color.push(i), r.push(qn), n.push(k.parse(l))) : l.startsWith(Kr) ? (s.var.push(i), r.push(Nr), n.push(l)) : (s.number.push(i), r.push(Bn), n.push(parseFloat(l))), ++i, $t)).split($t);
  return { values: n, split: a, indexes: s, types: r };
}
function Hn(t) {
  return ye(t).values;
}
function $n(t) {
  const { split: e, types: n } = ye(t), s = e.length;
  return (r) => {
    let i = "";
    for (let o = 0; o < s; o++)
      if (i += e[o], r[o] !== void 0) {
        const a = n[o];
        a === Bn ? i += de(r[o]) : a === qn ? i += k.transform(r[o]) : i += r[o];
      }
    return i;
  };
}
const qr = (t) => typeof t == "number" ? 0 : t;
function Hr(t) {
  const e = Hn(t);
  return $n(t)(e.map(qr));
}
const ie = {
  test: Pr,
  parse: Hn,
  createTransformer: $n,
  getAnimatableNone: Hr
};
function Be(t, e, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
function $r({ hue: t, saturation: e, lightness: n, alpha: s }) {
  t /= 360, e /= 100, n /= 100;
  let r = 0, i = 0, o = 0;
  if (!e)
    r = i = o = n;
  else {
    const a = n < 0.5 ? n * (1 + e) : n + e - n * e, l = 2 * n - a;
    r = Be(l, a, t + 1 / 3), i = Be(l, a, t), o = Be(l, a, t - 1 / 3);
  }
  return {
    red: Math.round(r * 255),
    green: Math.round(i * 255),
    blue: Math.round(o * 255),
    alpha: s
  };
}
function Fe(t, e) {
  return (n) => n > 0 ? e : t;
}
const qe = (t, e, n) => {
  const s = t * t, r = n * (e * e - s) + s;
  return r < 0 ? 0 : Math.sqrt(r);
}, Wr = [je, W, X], _r = (t) => Wr.find((e) => e.test(t));
function Wt(t) {
  const e = _r(t);
  if (!e)
    return !1;
  let n = e.parse(t);
  return e === X && (n = $r(n)), n;
}
const _t = (t, e) => {
  const n = Wt(t), s = Wt(e);
  if (!n || !s)
    return Fe(t, e);
  const r = { ...n };
  return (i) => (r.red = qe(n.red, s.red, i), r.green = qe(n.green, s.green, i), r.blue = qe(n.blue, s.blue, i), r.alpha = be(n.alpha, s.alpha, i), W.transform(r));
}, ze = /* @__PURE__ */ new Set(["none", "hidden"]);
function Ur(t, e) {
  return ze.has(t) ? (n) => n <= 0 ? t : e : (n) => n >= 1 ? e : t;
}
const Gr = (t, e) => (n) => e(t(n)), pt = (...t) => t.reduce(Gr);
function jr(t, e) {
  return (n) => be(t, e, n);
}
function gt(t) {
  return typeof t == "number" ? jr : typeof t == "string" ? dt(t) ? Fe : k.test(t) ? _t : Xr : Array.isArray(t) ? Wn : typeof t == "object" ? k.test(t) ? _t : zr : Fe;
}
function Wn(t, e) {
  const n = [...t], s = n.length, r = t.map((i, o) => gt(i)(i, e[o]));
  return (i) => {
    for (let o = 0; o < s; o++)
      n[o] = r[o](i);
    return n;
  };
}
function zr(t, e) {
  const n = { ...t, ...e }, s = {};
  for (const r in n)
    t[r] !== void 0 && e[r] !== void 0 && (s[r] = gt(t[r])(t[r], e[r]));
  return (r) => {
    for (const i in s)
      n[i] = s[i](r);
    return n;
  };
}
function Yr(t, e) {
  const n = [], s = { color: 0, var: 0, number: 0 };
  for (let r = 0; r < e.values.length; r++) {
    const i = e.types[r], o = t.indexes[i][s[i]], a = t.values[o] ?? 0;
    n[r] = a, s[i]++;
  }
  return n;
}
const Xr = (t, e) => {
  const n = ie.createTransformer(e), s = ye(t), r = ye(e);
  return s.indexes.var.length === r.indexes.var.length && s.indexes.color.length === r.indexes.color.length && s.indexes.number.length >= r.indexes.number.length ? ze.has(t) && !r.values.length || ze.has(e) && !s.values.length ? Ur(t, e) : pt(Wn(Yr(s, r), r.values), n) : Fe(t, e);
};
function _n(t, e, n) {
  return typeof t == "number" && typeof e == "number" && typeof n == "number" ? be(t, e, n) : gt(t)(t, e);
}
const Zr = (t) => {
  const e = ({ timestamp: n }) => t(n);
  return {
    start: (n = !0) => B.update(e, n),
    stop: () => Ge(e),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => Oe.isProcessing ? Oe.timestamp : D.now()
  };
}, Un = (t, e, n = 10) => {
  let s = "";
  const r = Math.max(Math.round(e / n), 2);
  for (let i = 0; i < r; i++)
    s += t(i / (r - 1)) + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, Jr = 5;
function Gn(t, e, n) {
  const s = Math.max(e - Jr, 0);
  return On(n - t(s), e - s);
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
}, Ut = 1e-3;
function Qr({ duration: t = M.duration, bounce: e = M.bounce, velocity: n = M.velocity, mass: s = M.mass }) {
  let r, i, o = 1 - e;
  o = z(M.minDamping, M.maxDamping, o), t = z(M.minDuration, M.maxDuration, /* @__PURE__ */ N(t)), o < 1 ? (r = (f) => {
    const c = f * o, u = c * t, d = c - n, h = Ye(f, o), p = Math.exp(-u);
    return Ut - d / h * p;
  }, i = (f) => {
    const u = f * o * t, d = u * n + n, h = Math.pow(o, 2) * Math.pow(f, 2) * t, p = Math.exp(-u), y = Ye(Math.pow(f, 2), o);
    return (-r(f) + Ut > 0 ? -1 : 1) * ((d - h) * p) / y;
  }) : (r = (f) => {
    const c = Math.exp(-f * t), u = (f - n) * t + 1;
    return -1e-3 + c * u;
  }, i = (f) => {
    const c = Math.exp(-f * t), u = (n - f) * (t * t);
    return c * u;
  });
  const a = 5 / t, l = ti(r, i, a);
  if (t = /* @__PURE__ */ O(t), isNaN(l))
    return {
      stiffness: M.stiffness,
      damping: M.damping,
      duration: t
    };
  {
    const f = Math.pow(l, 2) * s;
    return {
      stiffness: f,
      damping: o * 2 * Math.sqrt(s * f),
      duration: t
    };
  }
}
const ei = 12;
function ti(t, e, n) {
  let s = n;
  for (let r = 1; r < ei; r++)
    s = s - t(s) / e(s);
  return s;
}
function Ye(t, e) {
  return t * Math.sqrt(1 - e * e);
}
const ni = ["duration", "bounce"], si = ["stiffness", "damping", "mass"];
function Gt(t, e) {
  return e.some((n) => t[n] !== void 0);
}
function ri(t) {
  let e = {
    velocity: M.velocity,
    stiffness: M.stiffness,
    damping: M.damping,
    mass: M.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!Gt(t, si) && Gt(t, ni))
    if (t.visualDuration) {
      const n = t.visualDuration, s = 2 * Math.PI / (n * 1.2), r = s * s, i = 2 * z(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(r);
      e = {
        ...e,
        mass: M.mass,
        stiffness: r,
        damping: i
      };
    } else {
      const n = Qr(t);
      e = {
        ...e,
        ...n,
        mass: M.mass
      }, e.isResolvedFromDuration = !0;
    }
  return e;
}
function ee(t = M.visualDuration, e = M.bounce) {
  const n = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: e
  } : t;
  let { restSpeed: s, restDelta: r } = n;
  const i = n.keyframes[0], o = n.keyframes[n.keyframes.length - 1], a = { done: !1, value: i }, { stiffness: l, damping: f, mass: c, duration: u, velocity: d, isResolvedFromDuration: h } = ri({
    ...n,
    velocity: -/* @__PURE__ */ N(n.velocity || 0)
  }), p = d || 0, y = f / (2 * Math.sqrt(l * c)), b = o - i, w = /* @__PURE__ */ N(Math.sqrt(l / c)), S = Math.abs(b) < 5;
  s || (s = S ? M.restSpeed.granular : M.restSpeed.default), r || (r = S ? M.restDelta.granular : M.restDelta.default);
  let v;
  if (y < 1) {
    const m = Ye(w, y);
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
        y < 1 && (V = m === 0 ? /* @__PURE__ */ O(p) : Gn(v, m, x));
        const T = Math.abs(V) <= s, E = Math.abs(o - x) <= r;
        a.done = T && E;
      }
      return a.value = a.done ? o : x, a;
    },
    toString: () => {
      const m = Math.min(ct(A), Re), x = Un((V) => A.next(m * V).value, m, 30);
      return m + "ms " + x;
    },
    toTransition: () => {
    }
  };
  return A;
}
ee.applyToOptions = (t) => {
  const e = In(t, 100, ee);
  return t.ease = e.ease, t.duration = /* @__PURE__ */ O(e.duration), t.type = "keyframes", t;
};
function Xe({ keyframes: t, velocity: e = 0, power: n = 0.8, timeConstant: s = 325, bounceDamping: r = 10, bounceStiffness: i = 500, modifyTarget: o, min: a, max: l, restDelta: f = 0.5, restSpeed: c }) {
  const u = t[0], d = {
    done: !1,
    value: u
  }, h = (T) => a !== void 0 && T < a || l !== void 0 && T > l, p = (T) => a === void 0 ? l : l === void 0 || Math.abs(a - T) < Math.abs(l - T) ? a : l;
  let y = n * e;
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
      velocity: Gn(v, T, d.value),
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
function ii(t, e, n) {
  const s = [], r = n || K.mix || _n, i = t.length - 1;
  for (let o = 0; o < i; o++) {
    let a = r(t[o], t[o + 1]);
    if (e) {
      const l = Array.isArray(e) ? e[o] || te : e;
      a = pt(l, a);
    }
    s.push(a);
  }
  return s;
}
function oi(t, e, { clamp: n = !0, ease: s, mixer: r } = {}) {
  const i = t.length;
  if (ut(i === e.length), i === 1)
    return () => e[0];
  if (i === 2 && e[0] === e[1])
    return () => e[1];
  const o = t[0] === t[1];
  t[0] > t[i - 1] && (t = [...t].reverse(), e = [...e].reverse());
  const a = ii(e, s, r), l = a.length, f = (c) => {
    if (o && c < t[0])
      return e[0];
    let u = 0;
    if (l > 1)
      for (; u < t.length - 2 && !(c < t[u + 1]); u++)
        ;
    const d = /* @__PURE__ */ at(t[u], t[u + 1], c);
    return a[u](d);
  };
  return n ? (c) => f(z(t[0], t[i - 1], c)) : f;
}
function ai(t, e) {
  return t.map((n) => n * e);
}
const jn = (t, e, n) => (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t, li = 1e-7, ci = 12;
function ui(t, e, n, s, r) {
  let i, o, a = 0;
  do
    o = e + (n - e) / 2, i = jn(o, s, r) - t, i > 0 ? n = o : e = o;
  while (Math.abs(i) > li && ++a < ci);
  return o;
}
function Te(t, e, n, s) {
  if (t === e && n === s)
    return te;
  const r = (i) => ui(i, 0, 1, t, n);
  return (i) => i === 0 || i === 1 ? i : jn(r(i), e, s);
}
const fi = /* @__PURE__ */ Te(0.42, 0, 1, 1), di = /* @__PURE__ */ Te(0, 0, 0.58, 1), zn = /* @__PURE__ */ Te(0.42, 0, 0.58, 1), Yn = (t) => (e) => e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2, Xn = (t) => (e) => 1 - t(1 - e), Zn = /* @__PURE__ */ Te(0.33, 1.53, 0.69, 0.99), yt = /* @__PURE__ */ Xn(Zn), Jn = /* @__PURE__ */ Yn(yt), Qn = (t) => (t *= 2) < 1 ? 0.5 * yt(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), bt = (t) => 1 - Math.sin(Math.acos(t)), hi = Xn(bt), es = Yn(bt), ts = (t) => Array.isArray(t) && typeof t[0] == "number", mi = {
  linear: te,
  easeIn: fi,
  easeInOut: zn,
  easeOut: di,
  circIn: bt,
  circInOut: es,
  circOut: hi,
  backIn: yt,
  backInOut: Jn,
  backOut: Zn,
  anticipate: Qn
}, pi = (t) => typeof t == "string", jt = (t) => {
  if (ts(t)) {
    ut(t.length === 4);
    const [e, n, s, r] = t;
    return Te(e, n, s, r);
  } else if (pi(t))
    return mi[t];
  return t;
};
function gi(t, e) {
  return t.map(() => e || zn).splice(0, t.length - 1);
}
function he({ duration: t = 300, keyframes: e, times: n, ease: s = "easeInOut" }) {
  const r = Vn(s) ? s.map(jt) : jt(s), i = {
    done: !1,
    value: e[0]
  }, o = ai(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === e.length ? n : Cn(e),
    t
  ), a = oi(o, e, {
    ease: Array.isArray(r) ? r : gi(e, r)
  });
  return {
    calculatedDuration: t,
    next: (l) => (i.value = a(l), i.done = l >= t, i)
  };
}
const yi = (t) => t !== null;
function wt(t, { repeat: e, repeatType: n = "loop" }, s, r = 1) {
  const i = t.filter(yi), a = r < 0 || e && n !== "loop" && e % 2 === 1 ? 0 : i.length - 1;
  return !a || s === void 0 ? i[a] : s;
}
const bi = {
  decay: Xe,
  inertia: Xe,
  tween: he,
  keyframes: he,
  spring: ee
};
function ns(t) {
  typeof t.type == "string" && (t.type = bi[t.type]);
}
class Tt {
  constructor() {
    this.count = 0, this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this.count++, this._finished = new Promise((e) => {
      this.resolve = e;
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
  then(e, n) {
    return this.finished.then(e, n);
  }
}
const wi = (t) => t / 100;
class vt extends Tt {
  constructor(e) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.stop = (n = !0) => {
      if (n) {
        const { motionValue: r } = this.options;
        r && r.updatedAt !== D.now() && this.tick(D.now());
      }
      if (this.isStopped = !0, this.state === "idle")
        return;
      this.teardown();
      const { onStop: s } = this.options;
      s && s();
    }, this.options = e, this.initAnimation(), this.play(), e.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: e } = this;
    ns(e);
    const { type: n = he, repeat: s = 0, repeatDelay: r = 0, repeatType: i, velocity: o = 0 } = e;
    let { keyframes: a } = e;
    const l = n || he;
    l !== he && typeof a[0] != "number" && (this.mixKeyframes = pt(wi, _n(a[0], a[1])), a = [0, 100]);
    const f = l({ ...e, keyframes: a });
    i === "mirror" && (this.mirroredGenerator = l({
      ...e,
      keyframes: [...a].reverse(),
      velocity: -o
    })), f.calculatedDuration === null && (f.calculatedDuration = ct(f));
    const { calculatedDuration: c } = f;
    this.calculatedDuration = c, this.resolvedDuration = c + r, this.totalDuration = this.resolvedDuration * (s + 1) - r, this.generator = f;
  }
  updateTime(e) {
    const n = Math.round(e - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = n;
  }
  tick(e, n = !1) {
    const { generator: s, totalDuration: r, mixKeyframes: i, mirroredGenerator: o, resolvedDuration: a, calculatedDuration: l } = this;
    if (this.startTime === null)
      return s.next(0);
    const { delay: f = 0, keyframes: c, repeat: u, repeatType: d, repeatDelay: h, type: p, onUpdate: y, finalKeyframe: b } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - r / this.speed, this.startTime)), n ? this.currentTime = e : this.updateTime(e);
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
    return V && p !== Xe && (m.value = wt(c, this.options, b, this.speed)), y && y(m.value), V && this.finish(), m;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(e, n) {
    return this.finished.then(e, n);
  }
  get duration() {
    return /* @__PURE__ */ N(this.calculatedDuration);
  }
  get time() {
    return /* @__PURE__ */ N(this.currentTime);
  }
  set time(e) {
    var n;
    e = /* @__PURE__ */ O(e), this.currentTime = e, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.playbackSpeed), (n = this.driver) == null || n.start(!1);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(e) {
    this.updateTime(D.now());
    const n = this.playbackSpeed !== e;
    this.playbackSpeed = e, n && (this.time = /* @__PURE__ */ N(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: e = Zr, onPlay: n, startTime: s } = this.options;
    this.driver || (this.driver = e((i) => this.tick(i))), n && n();
    const r = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = r) : this.holdTime !== null ? this.startTime = r - this.holdTime : this.startTime || (this.startTime = s ?? r), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(D.now()), this.holdTime = this.currentTime;
  }
  complete() {
    this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
  }
  finish() {
    this.teardown(), this.state = "finished";
    const { onComplete: e } = this.options;
    e && e();
  }
  cancel() {
    this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown();
  }
  teardown() {
    this.notifyFinished(), this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(e) {
    return this.startTime = 0, this.tick(e, !0);
  }
  attachTimeline(e) {
    var n;
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), (n = this.driver) == null || n.stop(), e.observe(this);
  }
}
function Ti(t) {
  for (let e = 1; e < t.length; e++)
    t[e] ?? (t[e] = t[e - 1]);
}
const _ = (t) => t * 180 / Math.PI, Ze = (t) => {
  const e = _(Math.atan2(t[1], t[0]));
  return Je(e);
}, vi = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
  rotate: Ze,
  rotateZ: Ze,
  skewX: (t) => _(Math.atan(t[1])),
  skewY: (t) => _(Math.atan(t[2])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2
}, Je = (t) => (t = t % 360, t < 0 && (t += 360), t), zt = Ze, Yt = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), Xt = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), Si = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: Yt,
  scaleY: Xt,
  scale: (t) => (Yt(t) + Xt(t)) / 2,
  rotateX: (t) => Je(_(Math.atan2(t[6], t[5]))),
  rotateY: (t) => Je(_(Math.atan2(-t[2], t[0]))),
  rotateZ: zt,
  rotate: zt,
  skewX: (t) => _(Math.atan(t[4])),
  skewY: (t) => _(Math.atan(t[1])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2
};
function Zt(t) {
  return t.includes("scale") ? 1 : 0;
}
function Qe(t, e) {
  if (!t || t === "none")
    return Zt(e);
  const n = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, r;
  if (n)
    s = Si, r = n;
  else {
    const a = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = vi, r = a;
  }
  if (!r)
    return Zt(e);
  const i = s[e], o = r[1].split(",").map(xi);
  return typeof i == "function" ? i(o) : o[i];
}
const Ai = (t, e) => {
  const { transform: n = "none" } = getComputedStyle(t);
  return Qe(n, e);
};
function xi(t) {
  return parseFloat(t.trim());
}
const Jt = (t) => t === re || t === g, Ei = /* @__PURE__ */ new Set(["x", "y", "z"]), Vi = ne.filter((t) => !Ei.has(t));
function Mi(t) {
  const e = [];
  return Vi.forEach((n) => {
    const s = t.getValue(n);
    s !== void 0 && (e.push([n, s.get()]), s.set(n.startsWith("scale") ? 1 : 0));
  }), e;
}
const U = {
  // Dimensions
  width: ({ x: t }, { paddingLeft: e = "0", paddingRight: n = "0" }) => t.max - t.min - parseFloat(e) - parseFloat(n),
  height: ({ y: t }, { paddingTop: e = "0", paddingBottom: n = "0" }) => t.max - t.min - parseFloat(e) - parseFloat(n),
  top: (t, { top: e }) => parseFloat(e),
  left: (t, { left: e }) => parseFloat(e),
  bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
  right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
  // Transform
  x: (t, { transform: e }) => Qe(e, "x"),
  y: (t, { transform: e }) => Qe(e, "y")
};
U.translateX = U.x;
U.translateY = U.y;
const G = /* @__PURE__ */ new Set();
let et = !1, tt = !1, nt = !1;
function ss() {
  if (tt) {
    const t = Array.from(G).filter((s) => s.needsMeasurement), e = new Set(t.map((s) => s.element)), n = /* @__PURE__ */ new Map();
    e.forEach((s) => {
      const r = Mi(s);
      r.length && (n.set(s, r), s.render());
    }), t.forEach((s) => s.measureInitialState()), e.forEach((s) => {
      s.render();
      const r = n.get(s);
      r && r.forEach(([i, o]) => {
        var a;
        (a = s.getValue(i)) == null || a.set(o);
      });
    }), t.forEach((s) => s.measureEndState()), t.forEach((s) => {
      s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
    });
  }
  tt = !1, et = !1, G.forEach((t) => t.complete(nt)), G.clear();
}
function rs() {
  G.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (tt = !0);
  });
}
function ki() {
  nt = !0, rs(), ss(), nt = !1;
}
class St {
  constructor(e, n, s, r, i, o = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = n, this.name = s, this.motionValue = r, this.element = i, this.isAsync = o;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (G.add(this), et || (et = !0, B.read(rs), B.resolveKeyframes(ss))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, name: n, element: s, motionValue: r } = this;
    if (e[0] === null) {
      const i = r == null ? void 0 : r.get(), o = e[e.length - 1];
      if (i !== void 0)
        e[0] = i;
      else if (s && n) {
        const a = s.readValue(n, o);
        a != null && (e[0] = a);
      }
      e[0] === void 0 && (e[0] = o), r && i === void 0 && r.set(e[0]);
    }
    Ti(e);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(e = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e), G.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (G.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const Li = (t) => t.startsWith("--");
function Ci(t, e, n) {
  Li(e) ? t.style.setProperty(e, n) : t.style[e] = n;
}
// @__NO_SIDE_EFFECTS__
function At(t) {
  let e;
  return () => (e === void 0 && (e = t()), e);
}
const Ii = /* @__PURE__ */ At(() => window.ScrollTimeline !== void 0), Di = {};
function Ri(t, e) {
  const n = /* @__PURE__ */ At(t);
  return () => Di[e] ?? n();
}
const is = /* @__PURE__ */ Ri(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), fe = ([t, e, n, s]) => `cubic-bezier(${t}, ${e}, ${n}, ${s})`, Qt = {
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
function os(t, e) {
  if (t)
    return typeof t == "function" ? is() ? Un(t, e) : "ease-out" : ts(t) ? fe(t) : Array.isArray(t) ? t.map((n) => os(n, e) || Qt.easeOut) : Qt[t];
}
function Oi(t, e, n, { delay: s = 0, duration: r = 300, repeat: i = 0, repeatType: o = "loop", ease: a = "easeOut", times: l } = {}, f = void 0) {
  const c = {
    [e]: n
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
  return f && (d.pseudoElement = f), t.animate(c, d);
}
function Fi({ type: t, ...e }) {
  return lt(t) && is() ? t.applyToOptions(e) : (e.duration ?? (e.duration = 300), e.ease ?? (e.ease = "easeOut"), e);
}
class Pi extends Tt {
  constructor(e) {
    if (super(), this.finishedTime = null, this.isStopped = !1, !e)
      return;
    const { element: n, name: s, keyframes: r, pseudoElement: i, allowFlatten: o = !1, finalKeyframe: a, onComplete: l } = e;
    this.isPseudoElement = !!i, this.allowFlatten = o, this.options = e, ut(typeof e.type != "string");
    const f = Fi(e);
    this.animation = Oi(n, s, r, f, i), f.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !i) {
        const c = wt(r, this.options, a, this.speed);
        this.updateMotionValue ? this.updateMotionValue(c) : Ci(n, s, c), this.animation.cancel();
      }
      l == null || l(), this.notifyFinished();
    }, this.animation.oncancel = () => this.notifyFinished();
  }
  play() {
    this.isStopped || (this.animation.play(), this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    var e, n;
    (n = (e = this.animation).finish) == null || n.call(e);
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
    const { state: e } = this;
    e === "idle" || e === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
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
    var e, n;
    this.isPseudoElement || (n = (e = this.animation).commitStyles) == null || n.call(e);
  }
  get duration() {
    var n, s;
    const e = ((s = (n = this.animation.effect) == null ? void 0 : n.getComputedTiming) == null ? void 0 : s.call(n).duration) || 0;
    return /* @__PURE__ */ N(Number(e));
  }
  get time() {
    return /* @__PURE__ */ N(Number(this.animation.currentTime) || 0);
  }
  set time(e) {
    this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ O(e);
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(e) {
    e < 0 && (this.finishedTime = null), this.animation.playbackRate = e;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return Number(this.animation.startTime);
  }
  set startTime(e) {
    this.animation.startTime = e;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: e, observe: n }) {
    var s;
    return this.allowFlatten && ((s = this.animation.effect) == null || s.updateTiming({ easing: "linear" })), this.animation.onfinish = null, e && Ii() ? (this.animation.timeline = e, te) : n(this);
  }
}
const as = {
  anticipate: Qn,
  backInOut: Jn,
  circInOut: es
};
function Ni(t) {
  return t in as;
}
function Ki(t) {
  typeof t.ease == "string" && Ni(t.ease) && (t.ease = as[t.ease]);
}
const en = 10;
class Bi extends Pi {
  constructor(e) {
    Ki(e), ns(e), super(e), e.startTime && (this.startTime = e.startTime), this.options = e;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read commited styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(e) {
    const { motionValue: n, onUpdate: s, onComplete: r, element: i, ...o } = this.options;
    if (!n)
      return;
    if (e !== void 0) {
      n.set(e);
      return;
    }
    const a = new vt({
      ...o,
      autoplay: !1
    }), l = /* @__PURE__ */ O(this.finishedTime ?? this.time);
    n.setWithVelocity(a.sample(l - en).value, a.sample(l).value, en), a.stop();
  }
}
const tn = (t, e) => e === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(ie.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function qi(t) {
  const e = t[0];
  if (t.length === 1)
    return !0;
  for (let n = 0; n < t.length; n++)
    if (t[n] !== e)
      return !0;
}
function Hi(t, e, n, s) {
  const r = t[0];
  if (r === null)
    return !1;
  if (e === "display" || e === "visibility")
    return !0;
  const i = t[t.length - 1], o = tn(r, e), a = tn(i, e);
  return !o || !a ? !1 : qi(t) || (n === "spring" || lt(n)) && s;
}
const $i = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), Wi = /* @__PURE__ */ At(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function _i(t) {
  const { motionValue: e, name: n, repeatDelay: s, repeatType: r, damping: i, type: o } = t;
  if (!e || !e.owner || !(e.owner.current instanceof HTMLElement))
    return !1;
  const { onUpdate: a, transformTemplate: l } = e.owner.getProps();
  return Wi() && n && $i.has(n) && (n !== "transform" || !l) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !a && !s && r !== "mirror" && i !== 0 && o !== "inertia";
}
const Ui = 40;
class Gi extends Tt {
  constructor({ autoplay: e = !0, delay: n = 0, type: s = "keyframes", repeat: r = 0, repeatDelay: i = 0, repeatType: o = "loop", keyframes: a, name: l, motionValue: f, element: c, ...u }) {
    var p;
    super(), this.stop = () => {
      var y, b;
      this._animation && (this._animation.stop(), (y = this.stopTimeline) == null || y.call(this)), (b = this.keyframeResolver) == null || b.cancel();
    }, this.createdAt = D.now();
    const d = {
      autoplay: e,
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
  onKeyframesResolved(e, n, s, r) {
    this.keyframeResolver = void 0;
    const { name: i, type: o, velocity: a, delay: l, isHandoff: f, onUpdate: c } = s;
    this.resolvedAt = D.now(), Hi(e, i, o, a) || ((K.instantAnimations || !l) && (c == null || c(wt(e, s, n))), e[0] = e[e.length - 1], s.duration = 0, s.repeat = 0);
    const d = {
      startTime: r ? this.resolvedAt ? this.resolvedAt - this.createdAt > Ui ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: n,
      ...s,
      keyframes: e
    }, h = !f && _i(d) ? new Bi({
      ...d,
      element: d.motionValue.owner.current
    }) : new vt(d);
    h.finished.then(() => this.notifyFinished()).catch(te), this.pendingTimeline && (this.stopTimeline = h.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = h;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(e, n) {
    return this.finished.finally(e).then(() => {
    });
  }
  get animation() {
    var e;
    return this._animation || ((e = this.keyframeResolver) == null || e.resume(), ki()), this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get time() {
    return this.animation.time;
  }
  set time(e) {
    this.animation.time = e;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(e) {
    this.animation.speed = e;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(e) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(e) : this.pendingTimeline = e, () => this.stop();
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
    var e;
    this._animation && this.animation.cancel(), (e = this.keyframeResolver) == null || e.cancel();
  }
}
const ls = (t, e, n, s = {}, r, i) => (o) => {
  const a = Fn(s, t) || {}, l = a.delay || s.delay || 0;
  let { elapsed: f = 0 } = s;
  f = f - /* @__PURE__ */ O(l);
  const c = {
    keyframes: Array.isArray(n) ? n : [null, n],
    ease: "easeOut",
    velocity: e.getVelocity(),
    ...a,
    delay: -f,
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
  Vr(a) || Object.assign(c, Er(t, c)), c.duration && (c.duration = /* @__PURE__ */ O(c.duration)), c.repeatDelay && (c.repeatDelay = /* @__PURE__ */ O(c.repeatDelay)), c.from !== void 0 && (c.keyframes[0] = c.from);
  let u = !1;
  if ((c.type === !1 || c.duration === 0 && !c.repeatDelay) && (c.duration = 0, c.delay === 0 && (u = !0)), (K.instantAnimations || K.skipAnimations) && (u = !0, c.duration = 0, c.delay = 0), c.allowFlatten = !a.type && !a.ease, u && !i && e.get() !== void 0) {
    const d = Tr(c.keyframes, a);
    if (d !== void 0) {
      B.update(() => {
        c.onUpdate(d), c.onComplete();
      });
      return;
    }
  }
  return a.isSync ? new vt(c) : new Gi(c);
}, cs = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...ne
]);
function ji({ protectedKeys: t, needsAnimating: e }, n) {
  const s = t.hasOwnProperty(n) && e[n] !== !0;
  return e[n] = !1, s;
}
function zi(t, e, { delay: n = 0, transitionOverride: s, type: r } = {}) {
  let { transition: i = t.getDefaultTransition(), transitionEnd: o, ...a } = e;
  s && (i = s);
  const l = [], f = r && t.animationState && t.animationState.getState()[r];
  for (const c in a) {
    const u = t.getValue(c, t.latestValues[c] ?? null), d = a[c];
    if (d === void 0 || f && ji(f, c))
      continue;
    const h = {
      delay: n,
      ...Fn(i || {}, c)
    }, p = u.get();
    if (p !== void 0 && !u.isAnimating && !Array.isArray(d) && d === p && !h.velocity)
      continue;
    let y = !1;
    if (window.MotionHandoffAnimation) {
      const w = br(t);
      if (w) {
        const S = window.MotionHandoffAnimation(w, c, B);
        S !== null && (h.startTime = S, y = !0);
      }
    }
    pr(t, c), u.start(ls(c, u, d, t.shouldReduceMotion && cs.has(c) ? { type: !1 } : h, t, y));
    const b = u.animation;
    b && l.push(b);
  }
  return o && Promise.all(l).then(() => {
    B.update(() => {
      o && hr(t, o);
    });
  }), l;
}
function Yi(t) {
  return t instanceof SVGElement && t.tagName !== "svg";
}
function Xi({ top: t, left: e, right: n, bottom: s }) {
  return {
    x: { min: e, max: n },
    y: { min: t, max: s }
  };
}
function Zi(t, e) {
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
function Ji(t, e) {
  return Xi(Zi(t.getBoundingClientRect(), e));
}
const nn = {
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
}, st = {};
for (const t in nn)
  st[t] = {
    isEnabled: (e) => nn[t].some((n) => !!e[n])
  };
const sn = () => ({ min: 0, max: 0 }), xt = () => ({
  x: sn(),
  y: sn()
}), Qi = typeof window < "u", rt = { current: null }, us = { current: !1 };
function eo() {
  if (us.current = !0, !!Qi)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), e = () => rt.current = t.matches;
      t.addListener(e), e();
    } else
      rt.current = !1;
}
function to(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function no(t) {
  return typeof t == "string" || Array.isArray(t);
}
const so = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], ro = ["initial", ...so];
function fs(t) {
  return to(t.animate) || ro.some((e) => no(t[e]));
}
function io(t) {
  return !!(fs(t) || t.variants);
}
function oo(t, e, n) {
  for (const s in e) {
    const r = e[s], i = n[s];
    if (C(r))
      t.addValue(s, r);
    else if (C(i))
      t.addValue(s, pe(r, { owner: t }));
    else if (i !== r)
      if (t.hasValue(s)) {
        const o = t.getValue(s);
        o.liveStyle === !0 ? o.jump(r) : o.hasAnimated || o.set(r);
      } else {
        const o = t.getStaticValue(s);
        t.addValue(s, pe(o !== void 0 ? o : r, { owner: t }));
      }
  }
  for (const s in n)
    e[s] === void 0 && t.removeValue(s);
  return e;
}
const ds = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t), hs = (t) => /^0[^.\s]+$/u.test(t), ao = {
  test: (t) => t === "auto",
  parse: (t) => t
}, ms = (t) => (e) => e.test(t), ps = [re, g, J, H, Or, Rr, ao], rn = (t) => ps.find(ms(t)), lo = [...ps, k, ie], co = (t) => lo.find(ms(t)), uo = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function fo(t) {
  const [e, n] = t.slice(0, -1).split("(");
  if (e === "drop-shadow")
    return t;
  const [s] = n.match(ht) || [];
  if (!s)
    return t;
  const r = n.replace(s, "");
  let i = uo.has(e) ? 1 : 0;
  return s !== n && (i *= 100), e + "(" + i + r + ")";
}
const ho = /\b([a-z-]*)\(.*?\)/gu, it = {
  ...ie,
  getAnimatableNone: (t) => {
    const e = t.match(ho);
    return e ? e.map(fo).join(" ") : t;
  }
}, on = {
  ...re,
  transform: Math.round
}, mo = {
  rotate: H,
  rotateX: H,
  rotateY: H,
  rotateZ: H,
  scale: Ee,
  scaleX: Ee,
  scaleY: Ee,
  scaleZ: Ee,
  skew: H,
  skewX: H,
  skewY: H,
  distance: g,
  translateX: g,
  translateY: g,
  translateZ: g,
  x: g,
  y: g,
  z: g,
  perspective: g,
  transformPerspective: g,
  opacity: ge,
  originX: Ht,
  originY: Ht,
  originZ: g
}, Et = {
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
  ...mo,
  zIndex: on,
  // SVG
  fillOpacity: ge,
  strokeOpacity: ge,
  numOctaves: on
}, po = {
  ...Et,
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
}, gs = (t) => po[t];
function ys(t, e) {
  let n = gs(t);
  return n !== it && (n = ie), n.getAnimatableNone ? n.getAnimatableNone(e) : void 0;
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
class bs {
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
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = St, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const d = D.now();
      this.renderScheduledAt < d && (this.renderScheduledAt = d, B.render(this.render, !1, !0));
    };
    const { latestValues: l, renderState: f } = o;
    this.latestValues = l, this.baseTarget = { ...l }, this.initialValues = n.initial ? { ...l } : {}, this.renderState = f, this.parent = e, this.props = n, this.presenceContext = s, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = r, this.options = a, this.blockInitialAnimation = !!i, this.isControllingVariants = fs(n), this.isVariantNode = io(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
    const { willChange: c, ...u } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const d in u) {
      const h = u[d];
      l[d] !== void 0 && C(h) && h.set(l[d], !1);
    }
  }
  mount(e) {
    this.current = e, me.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((n, s) => this.bindToMotionValue(s, n)), us.current || eo(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : rt.current, this.parent && this.parent.children.add(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    this.projection && this.projection.unmount(), Ge(this.notifyUpdate), Ge(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent && this.parent.children.delete(this);
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
    const s = se.has(e);
    s && this.onBindTransform && this.onBindTransform();
    const r = n.on("change", (a) => {
      this.latestValues[e] = a, this.props.onUpdate && B.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0);
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
    for (e in st) {
      const n = st[e];
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : xt();
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
    for (let s = 0; s < an.length; s++) {
      const r = an[s];
      this.propEventSubscriptions[r] && (this.propEventSubscriptions[r](), delete this.propEventSubscriptions[r]);
      const i = "on" + r, o = e[i];
      o && (this.propEventSubscriptions[r] = this.on(r, o));
    }
    this.prevMotionValues = oo(this, this.scrapeMotionValuesFromProps(e, this.prevProps, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return s === void 0 && n !== void 0 && (s = pe(n === null ? void 0 : n, { owner: this }), this.addValue(e, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(e, n) {
    let s = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : this.getBaseTargetFromProps(this.props, e) ?? this.readValueFromInstance(this.current, e, this.options);
    return s != null && (typeof s == "string" && (ds(s) || hs(s)) ? s = parseFloat(s) : !co(s) && ie.test(n) && (s = ys(e, n)), this.setBaseTarget(e, C(s) ? s.get() : s)), C(s) ? s.get() : s;
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
    var i;
    const { initial: n } = this.props;
    let s;
    if (typeof n == "string" || typeof n == "object") {
      const o = Dn(this.props, n, (i = this.presenceContext) == null ? void 0 : i.custom);
      o && (s = o[e]);
    }
    if (n && s !== void 0)
      return s;
    const r = this.getBaseTargetFromProps(this.props, e);
    return r !== void 0 && !C(r) ? r : this.initialValues[e] !== void 0 && s === void 0 ? void 0 : this.baseTarget[e];
  }
  on(e, n) {
    return this.events[e] || (this.events[e] = new Rn()), this.events[e].add(n);
  }
  notify(e, ...n) {
    this.events[e] && this.events[e].notify(...n);
  }
}
const go = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function yo(t) {
  const e = go.exec(t);
  if (!e)
    return [,];
  const [, n, s, r] = e;
  return [`--${n ?? s}`, r];
}
function ws(t, e, n = 1) {
  const [s, r] = yo(t);
  if (!s)
    return;
  const i = window.getComputedStyle(e).getPropertyValue(s);
  if (i) {
    const o = i.trim();
    return ds(o) ? parseFloat(o) : o;
  }
  return dt(r) ? ws(r, e, n + 1) : r;
}
function bo(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || hs(t) : !0;
}
const wo = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function To(t, e, n) {
  let s = 0, r;
  for (; s < t.length && !r; ) {
    const i = t[s];
    typeof i == "string" && !wo.has(i) && ye(i).values.length && (r = t[s]), s++;
  }
  if (r && n)
    for (const i of e)
      t[i] = ys(n, r);
}
class vo extends St {
  constructor(e, n, s, r, i) {
    super(e, n, s, r, i, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, element: n, name: s } = this;
    if (!n || !n.current)
      return;
    super.readKeyframes();
    for (let l = 0; l < e.length; l++) {
      let f = e[l];
      if (typeof f == "string" && (f = f.trim(), dt(f))) {
        const c = ws(f, n.current);
        c !== void 0 && (e[l] = c), l === e.length - 1 && (this.finalKeyframe = f);
      }
    }
    if (this.resolveNoneKeyframes(), !cs.has(s) || e.length !== 2)
      return;
    const [r, i] = e, o = rn(r), a = rn(i);
    if (o !== a)
      if (Jt(o) && Jt(a))
        for (let l = 0; l < e.length; l++) {
          const f = e[l];
          typeof f == "string" && (e[l] = parseFloat(f));
        }
      else U[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: e, name: n } = this, s = [];
    for (let r = 0; r < e.length; r++)
      (e[r] === null || bo(e[r])) && s.push(r);
    s.length && To(e, s, n);
  }
  measureInitialState() {
    const { element: e, unresolvedKeyframes: n, name: s } = this;
    if (!e || !e.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = U[s](e.measureViewportBox(), window.getComputedStyle(e.current)), n[0] = this.measuredOrigin;
    const r = n[n.length - 1];
    r !== void 0 && e.getValue(s, r).jump(r, !1);
  }
  measureEndState() {
    var a;
    const { element: e, name: n, unresolvedKeyframes: s } = this;
    if (!e || !e.current)
      return;
    const r = e.getValue(n);
    r && r.jump(this.measuredOrigin, !1);
    const i = s.length - 1, o = s[i];
    s[i] = U[n](e.measureViewportBox(), window.getComputedStyle(e.current)), o !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = o), (a = this.removedTransforms) != null && a.length && this.removedTransforms.forEach(([l, f]) => {
      e.getValue(l).set(f);
    }), this.resolveNoneKeyframes();
  }
}
class Ts extends bs {
  constructor() {
    super(...arguments), this.KeyframeResolver = vo;
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
    C(e) && (this.childSubscription = e.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
}
const vs = (t, e) => e && typeof t == "number" ? e.transform(t) : t, So = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Ao = ne.length;
function xo(t, e, n) {
  let s = "", r = !0;
  for (let i = 0; i < Ao; i++) {
    const o = ne[i], a = t[o];
    if (a === void 0)
      continue;
    let l = !0;
    if (typeof a == "number" ? l = a === (o.startsWith("scale") ? 1 : 0) : l = parseFloat(a) === 0, !l || n) {
      const f = vs(a, Et[o]);
      if (!l) {
        r = !1;
        const c = So[o] || o;
        s += `${c}(${f}) `;
      }
      n && (e[o] = f);
    }
  }
  return s = s.trim(), n ? s = n(e, r ? "" : s) : r && (s = "none"), s;
}
function Ss(t, e, n) {
  const { style: s, vars: r, transformOrigin: i } = t;
  let o = !1, a = !1;
  for (const l in e) {
    const f = e[l];
    if (se.has(l)) {
      o = !0;
      continue;
    } else if (Nn(l)) {
      r[l] = f;
      continue;
    } else {
      const c = vs(f, Et[l]);
      l.startsWith("origin") ? (a = !0, i[l] = c) : s[l] = c;
    }
  }
  if (e.transform || (o || n ? s.transform = xo(e, t.transform, n) : s.transform && (s.transform = "none")), a) {
    const { originX: l = "50%", originY: f = "50%", originZ: c = 0 } = i;
    s.transformOrigin = `${l} ${f} ${c}`;
  }
}
function As(t, { style: e, vars: n }, s, r) {
  Object.assign(t.style, e, r && r.getProjectionStyles(s));
  for (const i in n)
    t.style.setProperty(i, n[i]);
}
const Eo = {};
function Vo(t, { layout: e, layoutId: n }) {
  return se.has(t) || t.startsWith("origin") || (e || n !== void 0) && (!!Eo[t] || t === "opacity");
}
function xs(t, e, n) {
  var i;
  const { style: s } = t, r = {};
  for (const o in s)
    (C(s[o]) || e.style && C(e.style[o]) || Vo(o, t) || ((i = n == null ? void 0 : n.getValue(o)) == null ? void 0 : i.liveStyle) !== void 0) && (r[o] = s[o]);
  return r;
}
function Mo(t) {
  return window.getComputedStyle(t);
}
class ko extends Ts {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = As;
  }
  readValueFromInstance(e, n) {
    if (se.has(n))
      return Ai(e, n);
    {
      const s = Mo(e), r = (Nn(n) ? s.getPropertyValue(n) : s[n]) || 0;
      return typeof r == "string" ? r.trim() : r;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: n }) {
    return Ji(e, n);
  }
  build(e, n, s) {
    Ss(e, n, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, n, s) {
    return xs(e, n, s);
  }
}
function Lo(t, e) {
  return t in e;
}
class Co extends bs {
  constructor() {
    super(...arguments), this.type = "object";
  }
  readValueFromInstance(e, n) {
    if (Lo(n, e)) {
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
    return xt();
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
const Io = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, Do = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function Ro(t, e, n = 1, s = 0, r = !0) {
  t.pathLength = 1;
  const i = r ? Io : Do;
  t[i.offset] = g.transform(-s);
  const o = g.transform(e), a = g.transform(n);
  t[i.array] = `${o} ${a}`;
}
function Oo(t, {
  attrX: e,
  attrY: n,
  attrScale: s,
  pathLength: r,
  pathSpacing: i = 1,
  pathOffset: o = 0,
  // This is object creation, which we try to avoid per-frame.
  ...a
}, l, f, c) {
  if (Ss(t, a, f), l) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: u, style: d } = t;
  u.transform && (d.transform = u.transform, delete u.transform), (d.transform || u.transformOrigin) && (d.transformOrigin = u.transformOrigin ?? "50% 50%", delete u.transformOrigin), d.transform && (d.transformBox = (c == null ? void 0 : c.transformBox) ?? "fill-box", delete u.transformBox), e !== void 0 && (u.x = e), n !== void 0 && (u.y = n), s !== void 0 && (u.scale = s), r !== void 0 && Ro(u, r, i, o, !1);
}
const Es = /* @__PURE__ */ new Set([
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
]), Fo = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function Po(t, e, n, s) {
  As(t, e, void 0, s);
  for (const r in e.attrs)
    t.setAttribute(Es.has(r) ? r : ft(r), e.attrs[r]);
}
function No(t, e, n) {
  const s = xs(t, e, n);
  for (const r in t)
    if (C(t[r]) || C(e[r])) {
      const i = ne.indexOf(r) !== -1 ? "attr" + r.charAt(0).toUpperCase() + r.substring(1) : r;
      s[i] = t[r];
    }
  return s;
}
class Ko extends Ts {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = xt;
  }
  getBaseTargetFromProps(e, n) {
    return e[n];
  }
  readValueFromInstance(e, n) {
    if (se.has(n)) {
      const s = gs(n);
      return s && s.default || 0;
    }
    return n = Es.has(n) ? n : ft(n), e.getAttribute(n);
  }
  scrapeMotionValuesFromProps(e, n, s) {
    return No(e, n, s);
  }
  build(e, n, s) {
    Oo(e, n, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(e, n, s, r) {
    Po(e, n, s, r);
  }
  mount(e) {
    this.isSVGTag = Fo(e.tagName), super.mount(e);
  }
}
function Bo(t) {
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
  }, n = Yi(t) ? new Ko(e) : new ko(e);
  n.mount(t), me.set(t, n);
}
function qo(t) {
  const e = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  }, n = new Co(e);
  n.mount(t), me.set(t, n);
}
function Ho(t, e, n) {
  const s = C(t) ? t : pe(t);
  return s.start(ls("", s, e, n)), s.animation;
}
function $o(t, e) {
  return C(t) || typeof t == "number" || typeof t == "string" && !ot(e);
}
function Vs(t, e, n, s) {
  const r = [];
  if ($o(t, e))
    r.push(Ho(t, ot(e) && e.default || e, n && (n.default || n)));
  else {
    const i = En(t, e, s), o = i.length;
    for (let a = 0; a < o; a++) {
      const l = i[a], f = l instanceof Element ? Bo : qo;
      me.has(l) || f(l);
      const c = me.get(l), u = { ...n };
      "delay" in u && typeof u.delay == "function" && (u.delay = u.delay(a, o)), r.push(...zi(c, { ...e, transition: u }, {}));
    }
  }
  return r;
}
function Wo(t, e, n) {
  const s = [];
  return Js(t, e, n, { spring: ee }).forEach(({ keyframes: i, transition: o }, a) => {
    s.push(...Vs(a, i, o));
  }), s;
}
class _o {
  constructor(e) {
    this.stop = () => this.runAll("stop"), this.animations = e.filter(Boolean);
  }
  get finished() {
    return Promise.all(this.animations.map((e) => e.finished));
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
  attachTimeline(e) {
    const n = this.animations.map((s) => s.attachTimeline(e));
    return () => {
      n.forEach((s, r) => {
        s && s(), this.animations[r].stop();
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
  get state() {
    return this.getAll("state");
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
class Uo extends _o {
  then(e, n) {
    return this.finished.finally(e).then(() => {
    });
  }
}
function Go(t) {
  return Array.isArray(t) && t.some(Array.isArray);
}
function jo(t) {
  function e(n, s, r) {
    let i = [];
    return Go(n) ? i = Wo(n, s, t) : i = Vs(n, s, r, t), new Uo(i);
  }
  return e;
}
const L = jo();
function zo(t) {
  return new Worker(
    "" + new URL("assets/worker-D2dl6b8I.js", import.meta.url).href,
    {
      name: t == null ? void 0 : t.name
    }
  );
}
const ln = "data-highlighted", cn = Array.from({ length: 5 }, () => ({
  worker: new zo(),
  isBusy: !1
}));
function Yo() {
  return new Promise((t) => {
    const e = cn.find((s) => !s.isBusy);
    e && (e.isBusy = !0, t(e));
    const n = setInterval(() => {
      const s = cn.find((r) => !r.isBusy);
      s && (s.isBusy = !0, clearInterval(n), t(s));
    }, Math.random() * 100);
  });
}
async function Xo(t) {
  const e = await Yo();
  return e.isBusy = !0, e.worker.postMessage({ html: t }), new Promise((n) => {
    e.worker.onmessage = (s) => {
      e.isBusy = !1, n(s.data);
    };
  });
}
async function Zo(t, e) {
  if (t.getAttribute(ln) === "true")
    return;
  let s = t.getAttribute("data-source-code");
  if (!s)
    throw new Error("No source code provided");
  s = decodeURIComponent(s).trim();
  const r = await Xo(s);
  t.insertAdjacentHTML("beforeend", r), t.setAttribute(ln, "true");
}
const un = () => window.matchMedia("(max-width: 768px)").matches;
function Ms(t, e) {
  let n;
  const s = async (o, a) => {
    if (!t.open)
      return;
    const l = un();
    o == null || o(l), l ? (L(t, { opacity: 0, y: [0, 250] }, { duration: 0.3, ease: "easeOut" }), await L(e, { opacity: 0 }, { duration: 0.3, ease: "easeOut" })) : (L(t, { opacity: 0, scale: [1, 0.98] }, { duration: 0.3, ease: "easeOut" }), await L(e, { opacity: 0 }, { duration: 0.3, ease: "linear" }).then(() => e.style.display = "none")), a == null || a(l), t.close(), n && n.abort();
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
    t.showModal(), await new Promise((c) => setTimeout(c, 50)), window.scrollTo(0, l), setTimeout(() => window.scrollTo(0, l), 0), setTimeout(() => window.scrollTo(0, l), 50), e.style.display = "block";
    const f = un();
    o == null || o(f), f ? (t.style.overflowY = "hidden", L(t, { opacity: [0, 1], y: [250, 0] }, { duration: 0.3, ease: "easeOut" }), await L(e, { opacity: [0, 1] }, { duration: 0.3, ease: "easeOut" }), t.style.overflowY = "auto") : (L(t, { opacity: [0, 1], scale: [0.98, 1] }, { duration: 0.3, ease: "easeOut" }), L(e, { opacity: [0, 1] }, { duration: 0.3, ease: "easeOut" })), a == null || a(f), setTimeout(() => document.addEventListener("click", r, {
      signal: n == null ? void 0 : n.signal
    }), 0), t.addEventListener("keydown", async (c) => {
      c.key === "Escape" && (c.preventDefault(), await s());
    }, { signal: n == null ? void 0 : n.signal });
  }, close: s };
}
var P;
class Jo extends EventTarget {
  constructor(n) {
    super();
    Ft(this, P);
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
const ks = (t) => new Jo(t);
function Qo(t) {
  const e = ks(!1);
  return new ResizeObserver(() => {
    const n = t.scrollHeight > t.clientHeight;
    e.value !== n && (e.value = n);
  }).observe(t), { $isOverflowingVertically: e };
}
function ea(t, e, n) {
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
      d = Date.now(), e.apply(v, w);
    }
    function x() {
      c = void 0;
    }
    !a && f && !c && m(), h(), f === void 0 && A > t ? a ? (d = Date.now(), i || (c = setTimeout(f ? x : m, t))) : m() : i !== !0 && (c = setTimeout(f ? x : m, f === void 0 ? t - A : t));
  }
  return y.cancel = p, y;
}
function ta(t, e, n) {
  var s = {}, r = s.atBegin, i = r === void 0 ? !1 : r;
  return ea(t, e, {
    debounceMode: i !== !1
  });
}
class na {
  /**
   * Creates a new PausableInterval instance
   * @param callback The function to call on each interval
   * @param interval The interval duration in milliseconds
   */
  constructor(e, n) {
    $(this, "callback");
    $(this, "interval");
    $(this, "isRunning");
    $(this, "timeoutId");
    $(this, "remaining");
    $(this, "startTime");
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
const Ls = 3e3, De = document.querySelector("#alerts");
if (!De)
  throw new Error("Alert container not found");
const j = [], Z = ks(!1);
Z.effect(ta(50, () => {
  j.toReversed().forEach(({ element: t, interval: e }, n) => {
    Z.value ? (e.setInterval(Ls - n * 250), e.pause()) : e.resume();
    const s = 1 - n * 0.1, r = n === 0 ? 0 : -10 * n, i = j.slice(0, n), o = 5;
    L(t, {
      y: Z.value ? i.reduce((a, { element: l }) => a + l.offsetHeight + o, 0) * -1 : r,
      scale: Z.value ? 1 : s
    }, {
      ease: "easeOut",
      duration: 0.3
    });
  });
}));
function fn(t, e) {
  const n = j.length - 1, s = j.shift();
  if (!s)
    throw new Error("First alert not found");
  s.interval.stop();
  let r = -10 * (n + 1), i = n === 1 ? 1 : 1 - n * 0.1;
  e && (r += 10, i -= 0.1), L(s.element, {
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
function sa(t, e) {
  j.length === 3 && fn("top", !0);
  const n = document.createElement("div");
  n.setAttribute("role", "alert"), n.classList.add("c-toast", "z-50"), n.style.opacity = "0%";
  const s = document.createElement("span");
  if (s.textContent = t, n.append(s), e) {
    const i = document.createElement("div");
    i.innerHTML = e, n.prepend(i);
  }
  n.addEventListener("mouseenter", () => Z.value = !0), n.addEventListener("mouseleave", () => Z.value = !1), De == null || De.append(n), L(n, {
    y: ["100%", 0],
    scale: 1,
    opacity: 1
  }, {
    ease: "easeOut",
    duration: 0.3
  }), j.toReversed().forEach(({ element: i }, o) => {
    const a = 1 - (o + 1) * 0.1, l = -10 * (o + 1);
    L(i, {
      y: l,
      scale: a
    }, { ease: "easeOut", duration: 0.3 });
  });
  const r = new na(() => fn("bottom", !1), Ls);
  j.push({ element: n, interval: r }), r.start();
}
const ra = 5e3;
async function ia(t) {
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
      setTimeout(() => (clearInterval(r), s()), ra);
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
function Cs() {
  document.body.classList.add("js-loaded");
}
const oa = async (t) => {
  if (await ia(t), t.forEach((e) => {
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
  Cs();
};
function aa(t) {
  t.forEach((e) => {
    const n = e.querySelectorAll('[role="tab"]'), s = Array.from(e.querySelectorAll('[role="tabpanel"]')), r = e.querySelector(".tab-trigger-background");
    if (!r)
      throw new Error("No tab trigger background found");
    const i = (a, l) => {
      const f = a.offsetWidth;
      if (l) {
        const u = a === n[0] ? a.offsetLeft : a.offsetLeft + 1;
        L(r, {
          width: f,
          x: `${u}px`
        }, {
          duration: 0.3,
          easing: "ease-out",
          type: ee,
          bounce: 0.1
        });
      } else
        r.style.width = `${f}px`, r.style.transform = "translateX(2px)";
    }, o = n[0];
    i(o, !1), n.forEach((a) => a.addEventListener("click", () => {
      n.forEach((l) => {
        const f = l === a;
        l.setAttribute("aria-selected", f.toString());
        const c = s.find((u) => u.getAttribute("aria-labelledby") === l.id);
        c == null || c.setAttribute("tab-index", f ? "0" : "-1"), c == null || c.classList.toggle("hidden", !f), f && i(a, !0);
      });
    }));
  });
}
const $e = "in2theme", Ve = {
  normal: "theme-normal",
  light: "theme-light",
  dark: "theme-dark"
}, la = (t) => {
  const e = window.matchMedia("(prefers-color-scheme: dark)");
  function n() {
    const o = localStorage.getItem($e);
    return o || localStorage.setItem($e, "normal"), o;
  }
  function s() {
    const o = n();
    let a = Ve[o];
    o === "normal" && e.matches && (a = Ve.dark);
    const l = (u) => {
      Object.values(Ve).forEach((d) => u.classList.remove(d)), u.classList.remove("dark");
    }, f = (u) => {
      u.classList.add(a), a === Ve.dark && u.classList.add("dark");
    };
    l(t), f(t);
    const c = document.querySelectorAll("iframe");
    c && c.forEach((u) => {
      l(u), f(u);
    }), l(document.body), f(document.body), Array.from(document.querySelectorAll("iframe")).filter((u) => u.src.includes("embed.figma.com")).forEach((u) => {
      const d = new URL(u.src);
      o === "normal" ? d.searchParams.set("theme", "system") : d.searchParams.set("theme", o), u.src = d.href;
    });
  }
  e.addEventListener("change", () => {
    n() === "normal" && s();
  }), s(), t.addEventListener("change", () => {
    const o = t.querySelector('input[name="theme"]:checked');
    if (!o)
      throw new Error("No selected theme found");
    const a = o.value;
    localStorage.setItem($e, a), s();
  });
  const r = n(), i = t.querySelector(`input[value="${r}"]`);
  if (!i)
    throw new Error("No current theme input found");
  i.checked = !0;
};
function dn(t, e, n, s) {
  return e.navigator.platform.indexOf("Mac") === 0 && !t.includes("meta+ctrl") ? t.replace(n, s) : t;
}
function ca() {
  return [
    (t, e) => dn(t, e, "meta", "ctrl"),
    (t, e) => dn(t, e, "ctrl", "meta")
  ];
}
function Y(t, e) {
  e && (e.tabIndex = 0, e.focus(), t.tabIndex = -1);
}
function Me(t) {
  let e = t.closest('[focusgroup]:not([focusgroup="none"])');
  if (e) return e;
}
function ke(t) {
  if (t.hasAttribute("focusgroup"))
    return [...t.querySelectorAll('*:not([focusgroup="none"])')].filter((n) => n.role === "button" || n.type === "button" || n.role === "checkbox" || n.type === "checkbox");
}
function ua(t) {
  let e = t.getAttribute("focusgroup");
  if (e !== null) return !e.split(" ").includes("block");
}
function fa() {
  return (t) => {
    let e = !1;
    function n(a) {
      let l = Me(a.target);
      if (!l) {
        s();
        return;
      }
      let f = ke(l), c = Array.from(f).indexOf(a.target), u = "ArrowDown", d = "ArrowUp";
      ua(l) && (t.document.dir === "rtl" ? (u = "ArrowLeft", d = "ArrowRight") : (u = "ArrowRight", d = "ArrowLeft")), a.key === u ? (a.preventDefault(), f[c + 1] ? Y(a.target, f[c + 1]) : l.getAttribute("focusgroup").includes("wrap") && Y(a.target, f[0])) : a.key === d ? (a.preventDefault(), f[c - 1] ? Y(a.target, f[c - 1]) : l.getAttribute("focusgroup").includes("wrap") && Y(a.target, f[f.length - 1])) : a.key === "Home" ? (a.preventDefault(), Y(a.target, f[0])) : a.key === "End" && (a.preventDefault(), Y(a.target, f[f.length - 1]));
    }
    function s() {
      e = !1, t.removeEventListener("keydown", n);
    }
    function r(a) {
      var f;
      let l = Me(a.target);
      if (l) {
        e || (e = !0, t.addEventListener("keydown", n));
        let c = ke(l);
        c.some((u) => u.getAttribute("tabindex") === "0") ? c.forEach((u) => {
          u !== a.target && u.setAttribute("tabindex", -1);
        }) : (c.forEach(
          (u, d) => u.setAttribute("tabindex", d === 0 ? 0 : -1)
        ), (f = c[0]) == null || f.focus());
      } else e && s();
    }
    function i(a) {
      var f;
      let l = Me(a.target);
      (f = l == null ? void 0 : l.getAttribute("focusgroup")) != null && f.includes("no-memory") && ke(l).forEach((u, d) => {
        u.setAttribute("tabindex", d === 0 ? 0 : -1);
      }), (!a.relatedTarget || a.relatedTarget === t.document) && s();
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
    return t.addEventListener("click", o), t.addEventListener("focusin", r), t.addEventListener("focusout", i), () => {
      s(), t.removeEventListener("click", o), t.removeEventListener("focusin", r), t.removeEventListener("focusout", i);
    };
  };
}
let da = {
  button: ["toolbar"],
  checkbox: ["toolbar"],
  menuitem: ["menu", "menubar"],
  option: ["listbox"],
  tab: ["tablist"]
};
function ue(t, e) {
  e.tabIndex = 0, e.focus(), t.tabIndex = -1;
}
function We(t) {
  let e = t.role || t.type || t.tagName;
  if (!e) return null;
  let n = da[e.toLowerCase()];
  if (!n) return null;
  for (let s of n) {
    let r = t.closest(`[role=${s}]`);
    if (r) return r;
  }
}
function _e(t, e) {
  return e.role === "toolbar" ? ha(e) : e.querySelectorAll(`[role=${t.role}]`);
}
function ha(t) {
  return [...t.querySelectorAll("*")].filter((n) => n.role === "button" || n.type === "button" || n.role === "checkbox" || n.type === "checkbox");
}
function ma(t) {
  let e = t.getAttribute("aria-orientation");
  if (e === "vertical") return !1;
  if (e === "horizontal") return !0;
  let n = t.role;
  return n === "menubar" || n === "tablist" || n === "toolbar";
}
function pa(t) {
  return (e) => {
    let n = !1, s = 300, r = 0, i = "";
    function o(u) {
      let d = We(u.target);
      if (!d) {
        a();
        return;
      }
      let h = _e(u.target, d), p = Array.from(h).indexOf(u.target), y = "ArrowDown", b = "ArrowUp";
      if (ma(d) && (e.document.dir === "rtl" ? (y = "ArrowLeft", b = "ArrowRight") : (y = "ArrowRight", b = "ArrowLeft")), u.key === y)
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
      n = !1, e.removeEventListener("keydown", o);
    }
    function l(u) {
      let d = We(u.target);
      if (d) {
        n || (n = !0, e.addEventListener("keydown", o));
        let h = _e(u.target, d);
        for (let p of h)
          p !== u.target && p.setAttribute("tabindex", -1);
      } else n && a();
    }
    function f(u) {
      (!u.relatedTarget || u.relatedTarget === e.document) && a();
    }
    function c(u) {
      let d = We(u.target);
      if (d) {
        let h = _e(u.target, d);
        for (let p of h)
          p !== u.target && p.setAttribute("tabindex", -1);
        u.target.setAttribute("tabindex", 0);
      }
    }
    return e.addEventListener("click", c), e.addEventListener("focusin", l), e.addEventListener("focusout", f), () => {
      a(), e.removeEventListener("click", c), e.removeEventListener("focusin", l), e.removeEventListener("focusout", f);
    };
  };
}
function ga() {
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
let ya = /^[^\x00-\x7F]$/, ba = {
  checkbox: !0,
  file: !0,
  radio: !0
}, wa = {
  button: !0,
  reset: !0,
  submit: !0
}, Ta = {
  " ": "space",
  "+": "plus"
};
function Is(t, e) {
  if (e.tagName !== "BODY" && t !== e)
    return e.hasAttribute("data-keyux-ignore-hotkeys") || e.getAttribute("aria-hidden") === "true" || e.hasAttribute("inert") ? !0 : Is(t, e.parentNode);
}
function hn(t, e) {
  for (let n of e)
    if (!Is(t, n))
      return n;
}
function mn(t, e, n) {
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
  return hn(
    i,
    i.querySelectorAll(`[aria-keyshortcuts="${s}" i]`)
  ) || hn(
    r,
    r.querySelectorAll(`[aria-keyshortcuts="${s}" i]`)
  );
}
function va(t, e, n) {
  let s = "";
  t.metaKey && (s += "meta+"), t.ctrlKey && (s += "ctrl+"), t.altKey && (s += "alt+"), t.shiftKey && (s += "shift+");
  let r = s;
  r += Ta[t.key] ?? t.key.toLowerCase();
  let i = mn(e, r, n);
  if (!i && (t.key.length > 1 || ya.test(t.key)) && /^Key.$/.test(t.code)) {
    let o = t.code.replace(/^Key/, "").toLowerCase();
    i = mn(e, s + o, n);
  }
  return i;
}
function Sa(t = []) {
  return (e) => {
    function n(s) {
      let r = s.ctrlKey || s.metaKey || s.altKey, i = s.target.isContentEditable || s.target.tagName === "TEXTAREA" || s.target.tagName === "INPUT" && !ba[s.target.type], o = s.target.role === "menuitem";
      if (!r && (i || o))
        return;
      let a = va(s, e, t);
      a && (a.tagName === "TEXTAREA" || a.tagName === "INPUT" && !wa[a.type] ? setTimeout(() => {
        a.focus();
      }) : a.click());
    }
    return e.addEventListener("keydown", n), () => {
      e.removeEventListener("keydown", n);
    };
  };
}
function Aa() {
  return (t) => {
    let e = [];
    function n(l) {
      let f = t.document.activeElement;
      f && f !== t.document.body && e.push(new WeakRef(f)), l.focus({ focusVisible: !0 });
    }
    function s() {
      let l = e.pop();
      if (!l) {
        t.document.activeElement.blur();
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
        let c = t.document.getElementById(f);
        if (c) {
          let u = c.querySelector(
            'a, button, select, textarea, input:not([type=radio]), [type=radio]:checked, [tabindex]:not([tabindex="-1"])'
          );
          u && (clearInterval(i), c.dispatchEvent(
            new t.CustomEvent("keyuxJump", { bubbles: !0 })
          ), n(u));
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
function xa(t, e) {
  let n = e.map((s) => s(t));
  return () => {
    n.forEach((s) => s());
  };
}
const Ea = ca();
xa(window, [
  Sa([Ea]),
  pa(),
  fa(),
  Aa(),
  ga()
]);
function Va() {
  const t = navigator.userAgent.toLowerCase();
  return t.includes("mac") ? "mac" : t.includes("linux") ? "linux" : t.includes("win") ? "windows" : "unknown";
}
function Ma() {
  const t = document.querySelectorAll("iframe"), e = document.querySelector("#styleguide-previous"), n = document.querySelector("#styleguide-next"), s = (r) => {
    document.activeElement instanceof HTMLButtonElement || r.metaKey || r.ctrlKey || (e && r.key === "ArrowLeft" && (r.preventDefault(), e.click()), n && r.key === "ArrowRight" && (r.preventDefault(), n.click()));
  };
  t.forEach((r) => {
    const i = r.contentWindow;
    i && i.addEventListener("keydown", s);
  }), window.addEventListener("keydown", s);
}
function ka() {
  const t = document.querySelectorAll("iframe"), e = (n) => {
    n.key === "k" && (n.metaKey || n.ctrlKey) && (n.preventDefault(), window.dispatchEvent(new Event("styleguideOpenSearch")));
  };
  t.forEach((n) => {
    const s = n.contentWindow;
    s && s.addEventListener("keydown", e);
  }), window.addEventListener("keydown", e);
}
const La = Va();
document.body.setAttribute("data-os", La);
const Ca = "ontouchstart" in window || navigator.maxTouchPoints > 0;
document.body.setAttribute("data-is-mobile", String(Ca));
Ma();
ka();
function Ia() {
  const t = document.querySelector("header");
  if (!t)
    throw new Error("No header found");
  const e = () => t.getBoundingClientRect().height;
  document.documentElement.style.setProperty("--header-height", `${e()}px`), window.addEventListener("resize", () => {
    document.documentElement.style.setProperty("--header-height", `${e()}px`);
  });
}
function Da() {
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
Ia();
Da();
const Ds = document.querySelector("#search-dialog");
if (!Ds)
  throw new Error("No search dialog found");
const Rs = document.querySelector(".dialog-backdrop");
if (!Rs)
  throw new Error("No dialog backdrop found");
const Vt = document.querySelectorAll("[data-open-search]");
if (Vt.length === 0)
  throw new Error("No open search buttons found");
const Q = document.querySelector("#search-input");
if (!Q)
  throw new Error("No search input found");
const Os = document.querySelector("#search-list");
if (!Os)
  throw new Error("No search list found");
const Fs = document.querySelectorAll(".search-category__item--active");
if (!Fs)
  throw new Error("No search results found");
const Ps = document.querySelector("#search-no-results");
if (!Ps)
  throw new Error("No search no results element found");
const { show: Ra } = Ms(Ds, Rs);
async function Ns() {
  await Ra(
    (t) => {
      t && Q.setAttribute("inert", "");
    },
    (t) => {
      t && Q.removeAttribute("inert"), Vt.forEach((e) => e.ariaExpanded = "true"), Q.ariaExpanded = "true", Ks();
    }
  );
}
function Ks() {
  const t = Q.value.toLowerCase().trim();
  let e = !1;
  Fs.forEach((n) => {
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
  }), Os.classList.toggle("hidden", !e), Ps.classList.toggle("hidden", e);
}
Q.addEventListener("input", Ks);
Vt.forEach((t) => t.addEventListener("click", Ns));
window.addEventListener("styleguideOpenSearch", Ns);
const pn = Array.from(document.querySelectorAll(".preview-iframe"));
pn.length > 0 ? oa(pn).catch(console.error) : Cs();
const gn = document.querySelector(".theme-select");
gn && la(gn);
const Oa = document.querySelectorAll(".styleguide-section");
Oa.forEach((t) => {
  new ResizeObserver(() => {
    const e = t.scrollHeight > 600;
    t.classList.toggle("styleguide-section--large", e);
  }).observe(t);
});
const yn = document.querySelectorAll(".tabs");
yn.length > 0 && aa(yn);
const bn = document.querySelectorAll("details:has(.code-highlight)");
bn.length > 0 && bn.forEach((t) => {
  const e = t.querySelector(".code-highlight");
  if (!e)
    throw new Error("No code element found");
  Zo(e).catch(console.error);
});
const Le = document.querySelectorAll("[data-code-audit-iframe]"), Ue = document.querySelector("#code-audit-dialog"), wn = document.querySelector(".dialog-backdrop");
Le.length > 0 && Ue && wn && (async () => {
  const { createHtmlValidator: t, auditCode: e } = await import("./html-validator-YG0b9lSF.js"), { show: n, close: s } = Ms(Ue, wn);
  Le.forEach((r) => r.addEventListener("click", async () => {
    Le.forEach((o) => o.setAttribute("aria-expanded", "false")), r.setAttribute("disabled", "");
    const { isValid: i } = await e(r, Ue, s);
    i ? (r.classList.add("text-green-500", "!cursor-not-allowed"), sa(
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
    requestIdleCallback(t);
  }, 8e3);
})();
const Tn = document.querySelector("#icon-search-input"), vn = document.querySelector("#icon-search-input-reset"), Sn = document.querySelector("#icon-search-list");
Tn && Sn && vn && import("./icons-CAJXQ8O6.js").then(({ default: t }) => t(Tn, Sn, vn)).catch(console.error);
const Bs = "data-clipboard-value", An = document.querySelectorAll(`button[${Bs}]`);
An.length > 0 && import("./clipboard-Dmg9r8_w.js").then(({ default: t }) => t(An, Bs)).catch(console.error);
const xn = document.querySelectorAll(".markdown-container-folded");
xn.length > 0 && xn.forEach((t) => {
  const e = t.querySelector(".markdown-container");
  if (!e)
    throw new Error("No markdown container found");
  const n = t.querySelector(".markdown-show-more-container");
  if (!n)
    throw new Error("No show more container found");
  const s = t.querySelector(".markdown-show-more");
  if (!s)
    throw new Error("No show more button found");
  const { $isOverflowingVertically: r } = Qo(t), i = () => {
    const a = e.scrollHeight > e.clientHeight;
    n.classList.toggle("hidden", !a);
  };
  i();
  const o = r.effect(i);
  s.addEventListener("click", async () => {
    o();
    const a = e.scrollHeight;
    L(e, {
      maxHeight: `${a}px`
    }, { duration: 0.5 }).then(() => {
      e.classList.remove("max-h-[400px]"), e.style.maxHeight = "";
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
  sa as r,
  ee as s
};
