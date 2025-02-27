var vs = Object.defineProperty;
var xt = (t) => {
  throw TypeError(t);
};
var Ts = (t, e, n) => e in t ? vs(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var q = (t, e, n) => Ts(t, typeof e != "symbol" ? e + "" : e, n), Mt = (t, e, n) => e.has(t) || xt("Cannot " + n);
var ie = (t, e, n) => (Mt(t, e, "read from private field"), n ? n.call(t) : e.get(t)), Et = (t, e, n) => e.has(t) ? xt("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), ke = (t, e, n, s) => (Mt(t, e, "write to private field"), s ? s.call(t, n) : e.set(t, n), n);
function bs(t, e, n) {
  var s = n, r = s.noTrailing, i = r === void 0 ? !1 : r, o = s.noLeading, a = o === void 0 ? !1 : o, l = s.debounceMode, c = l === void 0 ? void 0 : l, u, d = !1, f = 0;
  function y() {
    u && clearTimeout(u);
  }
  function g(v) {
    var h = v || {}, T = h.upcomingOnly, V = T === void 0 ? !1 : T;
    y(), d = !V;
  }
  function b() {
    for (var v = arguments.length, h = new Array(v), T = 0; T < v; T++)
      h[T] = arguments[T];
    var V = this, x = Date.now() - f;
    if (d)
      return;
    function m() {
      f = Date.now(), e.apply(V, h);
    }
    function S() {
      u = void 0;
    }
    !a && c && !u && m(), y(), c === void 0 && x > t ? a ? (f = Date.now(), i || (u = setTimeout(c ? S : m, t))) : m() : i !== !0 && (u = setTimeout(c ? S : m, c === void 0 ? t - x : t));
  }
  return b.cancel = g, b;
}
function ws(t, e, n) {
  var s = {}, r = s.atBegin, i = r === void 0 ? !1 : r;
  return bs(t, e, {
    debounceMode: i !== !1
  });
}
function Ss(t, e, n) {
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
const G = /* @__NO_SIDE_EFFECTS__ */ (t) => t;
let $e = G;
const Re = /* @__NO_SIDE_EFFECTS__ */ (t, e, n) => {
  const s = e - t;
  return s === 0 ? 1 : (n - t) / s;
};
// @__NO_SIDE_EFFECTS__
function et(t) {
  let e;
  return () => (e === void 0 && (e = t()), e);
}
const As = /* @__PURE__ */ et(() => window.ScrollTimeline !== void 0);
class Vs {
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
      if (As() && r.attachTimeline)
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
class un extends Vs {
  then(e, n) {
    return Promise.all(this.animations).then(e).catch(n);
  }
}
const L = /* @__NO_SIDE_EFFECTS__ */ (t) => t * 1e3, k = /* @__NO_SIDE_EFFECTS__ */ (t) => t / 1e3, xe = 2e4;
function tt(t) {
  let e = 0;
  const n = 50;
  let s = t.next(e);
  for (; !s.done && e < xe; )
    e += n, s = t.next(e);
  return e >= xe ? 1 / 0 : e;
}
const cn = (t, e, n = 10) => {
  let s = "";
  const r = Math.max(Math.round(e / n), 2);
  for (let i = 0; i < r; i++)
    s += t(/* @__PURE__ */ Re(0, r - 1, i)) + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, U = (t, e, n) => n > e ? e : n < t ? t : n;
function dn(t, e) {
  return e ? t * (1e3 / e) : 0;
}
const xs = 5;
function fn(t, e, n) {
  const s = Math.max(e - xs, 0);
  return dn(n - t(s), e - s);
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
}, Ct = 1e-3;
function Ms({ duration: t = M.duration, bounce: e = M.bounce, velocity: n = M.velocity, mass: s = M.mass }) {
  let r, i, o = 1 - e;
  o = U(M.minDamping, M.maxDamping, o), t = U(M.minDuration, M.maxDuration, /* @__PURE__ */ k(t)), o < 1 ? (r = (c) => {
    const u = c * o, d = u * t, f = u - n, y = He(c, o), g = Math.exp(-d);
    return Ct - f / y * g;
  }, i = (c) => {
    const d = c * o * t, f = d * n + n, y = Math.pow(o, 2) * Math.pow(c, 2) * t, g = Math.exp(-d), b = He(Math.pow(c, 2), o);
    return (-r(c) + Ct > 0 ? -1 : 1) * ((f - y) * g) / b;
  }) : (r = (c) => {
    const u = Math.exp(-c * t), d = (c - n) * t + 1;
    return -1e-3 + u * d;
  }, i = (c) => {
    const u = Math.exp(-c * t), d = (n - c) * (t * t);
    return u * d;
  });
  const a = 5 / t, l = Cs(r, i, a);
  if (t = /* @__PURE__ */ L(t), isNaN(l))
    return {
      stiffness: M.stiffness,
      damping: M.damping,
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
const Es = 12;
function Cs(t, e, n) {
  let s = n;
  for (let r = 1; r < Es; r++)
    s = s - t(s) / e(s);
  return s;
}
function He(t, e) {
  return t * Math.sqrt(1 - e * e);
}
const Ps = ["duration", "bounce"], Ds = ["stiffness", "damping", "mass"];
function Pt(t, e) {
  return e.some((n) => t[n] !== void 0);
}
function Fs(t) {
  let e = {
    velocity: M.velocity,
    stiffness: M.stiffness,
    damping: M.damping,
    mass: M.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!Pt(t, Ds) && Pt(t, Ps))
    if (t.visualDuration) {
      const n = t.visualDuration, s = 2 * Math.PI / (n * 1.2), r = s * s, i = 2 * U(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(r);
      e = {
        ...e,
        mass: M.mass,
        stiffness: r,
        damping: i
      };
    } else {
      const n = Ms(t);
      e = {
        ...e,
        ...n,
        mass: M.mass
      }, e.isResolvedFromDuration = !0;
    }
  return e;
}
function nt(t = M.visualDuration, e = M.bounce) {
  const n = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: e
  } : t;
  let { restSpeed: s, restDelta: r } = n;
  const i = n.keyframes[0], o = n.keyframes[n.keyframes.length - 1], a = { done: !1, value: i }, { stiffness: l, damping: c, mass: u, duration: d, velocity: f, isResolvedFromDuration: y } = Fs({
    ...n,
    velocity: -/* @__PURE__ */ k(n.velocity || 0)
  }), g = f || 0, b = c / (2 * Math.sqrt(l * u)), v = o - i, h = /* @__PURE__ */ k(Math.sqrt(l / u)), T = Math.abs(v) < 5;
  s || (s = T ? M.restSpeed.granular : M.restSpeed.default), r || (r = T ? M.restDelta.granular : M.restDelta.default);
  let V;
  if (b < 1) {
    const m = He(h, b);
    V = (S) => {
      const E = Math.exp(-b * h * S);
      return o - E * ((g + b * h * v) / m * Math.sin(m * S) + v * Math.cos(m * S));
    };
  } else if (b === 1)
    V = (m) => o - Math.exp(-h * m) * (v + (g + h * v) * m);
  else {
    const m = h * Math.sqrt(b * b - 1);
    V = (S) => {
      const E = Math.exp(-b * h * S), w = Math.min(m * S, 300);
      return o - E * ((g + b * h * v) * Math.sinh(w) + m * v * Math.cosh(w)) / m;
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
        b < 1 && (E = m === 0 ? /* @__PURE__ */ L(g) : fn(V, m, S));
        const w = Math.abs(E) <= s, A = Math.abs(o - S) <= r;
        a.done = w && A;
      }
      return a.value = a.done ? o : S, a;
    },
    toString: () => {
      const m = Math.min(tt(x), xe), S = cn((E) => x.next(m * E).value, m, 30);
      return m + "ms " + S;
    }
  };
  return x;
}
function Rs(t, e = 100, n) {
  const s = n({ ...t, keyframes: [0, e] }), r = Math.min(tt(s), xe);
  return {
    type: "keyframes",
    ease: (i) => s.next(r * i).value / e,
    duration: /* @__PURE__ */ k(r)
  };
}
function Ie(t) {
  return typeof t == "function";
}
const Is = (t, e, n) => {
  const s = e - t;
  return ((n - t) % s + s) % s + t;
}, hn = (t) => Array.isArray(t) && typeof t[0] != "number";
function mn(t, e) {
  return hn(t) ? t[Is(0, t.length, e)] : t;
}
const he = (t, e, n) => t + (e - t) * n;
function pn(t, e) {
  const n = t[t.length - 1];
  for (let s = 1; s <= e; s++) {
    const r = /* @__PURE__ */ Re(0, e, s);
    t.push(he(n, 1, r));
  }
}
function gn(t) {
  const e = [0];
  return pn(e, t.length - 1), e;
}
const P = (t) => !!(t && t.getVelocity);
function st(t) {
  return typeof t == "object" && !Array.isArray(t);
}
function yn(t, e, n, s) {
  return typeof t == "string" && st(e) ? Ss(t, n, s) : t instanceof NodeList ? Array.from(t) : Array.isArray(t) ? t : [t];
}
function Os(t, e, n) {
  return t * (e + 1);
}
function Dt(t, e, n, s) {
  var r;
  return typeof e == "number" ? e : e.startsWith("-") || e.startsWith("+") ? Math.max(0, t + parseFloat(e)) : e === "<" ? n : (r = s.get(e)) !== null && r !== void 0 ? r : t;
}
function Ls(t, e) {
  t.indexOf(e) === -1 && t.push(e);
}
function vn(t, e) {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}
function ks(t, e, n) {
  for (let s = 0; s < t.length; s++) {
    const r = t[s];
    r.at > e && r.at < n && (vn(t, r), s--);
  }
}
function Bs(t, e, n, s, r, i) {
  ks(t, r, i);
  for (let o = 0; o < e.length; o++)
    t.push({
      value: e[o],
      at: he(r, i, s[o]),
      easing: mn(n, o)
    });
}
function Ns(t, e) {
  for (let n = 0; n < t.length; n++)
    t[n] = t[n] / (e + 1);
}
function Ks(t, e) {
  return t.at === e.at ? t.value === null ? 1 : e.value === null ? -1 : 0 : t.at - e.at;
}
const _s = "easeInOut";
function qs(t, { defaultTransition: e = {}, ...n } = {}, s, r) {
  const i = e.duration || 0.3, o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), l = {}, c = /* @__PURE__ */ new Map();
  let u = 0, d = 0, f = 0;
  for (let y = 0; y < t.length; y++) {
    const g = t[y];
    if (typeof g == "string") {
      c.set(g, d);
      continue;
    } else if (!Array.isArray(g)) {
      c.set(g.name, Dt(d, g.at, u, c));
      continue;
    }
    let [b, v, h = {}] = g;
    h.at !== void 0 && (d = Dt(d, h.at, u, c));
    let T = 0;
    const V = (x, m, S, E = 0, w = 0) => {
      const A = Ws(x), { delay: D = 0, times: R = gn(A), type: Le = "keyframes", repeat: ge, repeatType: Mo, repeatDelay: Eo = 0, ...ys } = m;
      let { ease: B = e.ease || "easeOut", duration: F } = m;
      const Tt = typeof D == "function" ? D(E, w) : D, bt = A.length, wt = Ie(Le) ? Le : r == null ? void 0 : r[Le];
      if (bt <= 2 && wt) {
        let ne = 100;
        if (bt === 2 && Gs(A)) {
          const se = A[1] - A[0];
          ne = Math.abs(se);
        }
        const ye = { ...ys };
        F !== void 0 && (ye.duration = /* @__PURE__ */ L(F));
        const ve = Rs(ye, ne, wt);
        B = ve.ease, F = ve.duration;
      }
      F ?? (F = i);
      const St = d + Tt;
      R.length === 1 && R[0] === 0 && (R[1] = 1);
      const At = R.length - A.length;
      if (At > 0 && pn(R, At), A.length === 1 && A.unshift(null), ge) {
        F = Os(F, ge);
        const ne = [...A], ye = [...R];
        B = Array.isArray(B) ? [...B] : [B];
        const ve = [...B];
        for (let se = 0; se < ge; se++) {
          A.push(...ne);
          for (let re = 0; re < ne.length; re++)
            R.push(ye[re] + (se + 1)), B.push(re === 0 ? "linear" : mn(ve, re - 1));
        }
        Ns(R, ge);
      }
      const Vt = St + F;
      Bs(S, A, B, R, St, Vt), T = Math.max(Tt + F, T), f = Math.max(Vt, f);
    };
    if (P(b)) {
      const x = Ft(b, a);
      V(v, h, Rt("default", x));
    } else {
      const x = yn(b, v, s, l), m = x.length;
      for (let S = 0; S < m; S++) {
        v = v, h = h;
        const E = x[S], w = Ft(E, a);
        for (const A in v)
          V(v[A], $s(h, A), Rt(A, w), S, m);
      }
    }
    u = d, d += T;
  }
  return a.forEach((y, g) => {
    for (const b in y) {
      const v = y[b];
      v.sort(Ks);
      const h = [], T = [], V = [];
      for (let m = 0; m < v.length; m++) {
        const { at: S, value: E, easing: w } = v[m];
        h.push(E), T.push(/* @__PURE__ */ Re(0, f, S)), V.push(w || "easeOut");
      }
      T[0] !== 0 && (T.unshift(0), h.unshift(h[0]), V.unshift(_s)), T[T.length - 1] !== 1 && (T.push(1), h.push(null)), o.has(g) || o.set(g, {
        keyframes: {},
        transition: {}
      });
      const x = o.get(g);
      x.keyframes[b] = h, x.transition[b] = {
        ...e,
        duration: f,
        ease: V,
        times: T,
        ...n
      };
    }
  }), o;
}
function Ft(t, e) {
  return !e.has(t) && e.set(t, {}), e.get(t);
}
function Rt(t, e) {
  return e[t] || (e[t] = []), e[t];
}
function Ws(t) {
  return Array.isArray(t) ? t : [t];
}
function $s(t, e) {
  return t && t[e] ? {
    ...t,
    ...t[e]
  } : { ...t };
}
const Hs = (t) => typeof t == "number", Gs = (t) => t.every(Hs), le = /* @__PURE__ */ new WeakMap();
function Tn(t, e) {
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
], J = new Set(Q), bn = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...Q
]), Us = (t) => Array.isArray(t), js = (t) => Us(t) ? t[t.length - 1] || 0 : t, zs = {
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
function Ys(t, e) {
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
    schedule: (u, d = !1, f = !1) => {
      const g = f && r ? n : s;
      return d && o.add(u), g.has(u) || g.add(u), u;
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
const Xs = 40;
function Zs(t, e) {
  let n = !1, s = !0;
  const r = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, i = () => n = !0, o = Te.reduce((h, T) => (h[T] = Ys(i), h), {}), { read: a, resolveKeyframes: l, update: c, preRender: u, render: d, postRender: f } = o, y = () => {
    const h = performance.now();
    n = !1, r.delta = s ? 1e3 / 60 : Math.max(Math.min(h - r.timestamp, Xs), 1), r.timestamp = h, r.isProcessing = !0, a.process(r), l.process(r), c.process(r), u.process(r), d.process(r), f.process(r), r.isProcessing = !1, n && e && (s = !1, t(y));
  }, g = () => {
    n = !0, s = !0, r.isProcessing || t(y);
  };
  return { schedule: Te.reduce((h, T) => {
    const V = o[T];
    return h[T] = (x, m = !1, S = !1) => (n || g(), V.schedule(x, m, S)), h;
  }, {}), cancel: (h) => {
    for (let T = 0; T < Te.length; T++)
      o[Te[T]].cancel(h);
  }, state: r, steps: o };
}
const { schedule: I, cancel: Ge, state: Me, steps: Po } = Zs(typeof requestAnimationFrame < "u" ? requestAnimationFrame : G, !0);
let Ae;
function Qs() {
  Ae = void 0;
}
const _ = {
  now: () => (Ae === void 0 && _.set(Me.isProcessing || zs.useManualTiming ? Me.timestamp : performance.now()), Ae),
  set: (t) => {
    Ae = t, queueMicrotask(Qs);
  }
};
class wn {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return Ls(this.subscriptions, e), () => vn(this.subscriptions, e);
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
const It = 30, Js = (t) => !isNaN(parseFloat(t));
class er {
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
    this.current = e, this.updatedAt = _.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = Js(this.current));
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
    this.events[e] || (this.events[e] = new wn());
    const s = this.events[e].add(n);
    return e === "change" ? () => {
      s(), I.read(() => {
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
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > It)
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, It);
    return dn(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
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
function ue(t, e) {
  return new er(t, e);
}
function Ot(t) {
  const e = [{}, {}];
  return t == null || t.values.forEach((n, s) => {
    e[0][s] = n.get(), e[1][s] = n.getVelocity();
  }), e;
}
function Sn(t, e, n, s) {
  if (typeof e == "function") {
    const [r, i] = Ot(s);
    e = e(n !== void 0 ? n : t.custom, r, i);
  }
  if (typeof e == "string" && (e = t.variants && t.variants[e]), typeof e == "function") {
    const [r, i] = Ot(s);
    e = e(n !== void 0 ? n : t.custom, r, i);
  }
  return e;
}
function tr(t, e, n) {
  const s = t.getProps();
  return Sn(s, e, s.custom, t);
}
function nr(t, e, n) {
  t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, ue(n));
}
function sr(t, e) {
  const n = tr(t, e);
  let { transitionEnd: s = {}, transition: r = {}, ...i } = n || {};
  i = { ...i, ...s };
  for (const o in i) {
    const a = js(i[o]);
    nr(t, o, a);
  }
}
function rr(t) {
  return !!(P(t) && t.add);
}
function ir(t, e) {
  const n = t.getValue("willChange");
  if (rr(n))
    return n.add(e);
}
const rt = (t) => t.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), or = "framerAppearId", ar = "data-" + rt(or);
function lr(t) {
  return t.props[ar];
}
function Lt(t, e) {
  t.timeline = e, t.onfinish = null;
}
const it = (t) => Array.isArray(t) && typeof t[0] == "number", ur = {
  linearEasing: void 0
};
function cr(t, e) {
  const n = /* @__PURE__ */ et(t);
  return () => {
    var s;
    return (s = ur[e]) !== null && s !== void 0 ? s : n();
  };
}
const Ee = /* @__PURE__ */ cr(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing");
function An(t) {
  return !!(typeof t == "function" && Ee() || !t || typeof t == "string" && (t in Ue || Ee()) || it(t) || Array.isArray(t) && t.every(An));
}
const oe = ([t, e, n, s]) => `cubic-bezier(${t}, ${e}, ${n}, ${s})`, Ue = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ oe([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ oe([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ oe([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ oe([0.33, 1.53, 0.69, 0.99])
};
function Vn(t, e) {
  if (t)
    return typeof t == "function" && Ee() ? cn(t, e) : it(t) ? oe(t) : Array.isArray(t) ? t.map((n) => Vn(n, e) || Ue.easeOut) : Ue[t];
}
const xn = (t, e, n) => (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t, dr = 1e-7, fr = 12;
function hr(t, e, n, s, r) {
  let i, o, a = 0;
  do
    o = e + (n - e) / 2, i = xn(o, s, r) - t, i > 0 ? n = o : e = o;
  while (Math.abs(i) > dr && ++a < fr);
  return o;
}
function me(t, e, n, s) {
  if (t === e && n === s)
    return G;
  const r = (i) => hr(i, 0, 1, t, n);
  return (i) => i === 0 || i === 1 ? i : xn(r(i), e, s);
}
const Mn = (t) => (e) => e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2, En = (t) => (e) => 1 - t(1 - e), Cn = /* @__PURE__ */ me(0.33, 1.53, 0.69, 0.99), ot = /* @__PURE__ */ En(Cn), Pn = /* @__PURE__ */ Mn(ot), Dn = (t) => (t *= 2) < 1 ? 0.5 * ot(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), at = (t) => 1 - Math.sin(Math.acos(t)), mr = En(at), Fn = Mn(at), Rn = (t) => /^0[^.\s]+$/u.test(t);
function pr(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || Rn(t) : !0;
}
const ee = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, ce = {
  ...ee,
  transform: (t) => U(0, 1, t)
}, be = {
  ...ee,
  default: 1
}, ae = (t) => Math.round(t * 1e5) / 1e5, lt = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function gr(t) {
  return t == null;
}
const yr = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, ut = (t, e) => (n) => !!(typeof n == "string" && yr.test(n) && n.startsWith(t) || e && !gr(n) && Object.prototype.hasOwnProperty.call(n, e)), In = (t, e, n) => (s) => {
  if (typeof s != "string")
    return s;
  const [r, i, o, a] = s.match(lt);
  return {
    [t]: parseFloat(r),
    [e]: parseFloat(i),
    [n]: parseFloat(o),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, vr = (t) => U(0, 255, t), Be = {
  ...ee,
  transform: (t) => Math.round(vr(t))
}, W = {
  test: /* @__PURE__ */ ut("rgb", "red"),
  parse: /* @__PURE__ */ In("red", "green", "blue"),
  transform: ({ red: t, green: e, blue: n, alpha: s = 1 }) => "rgba(" + Be.transform(t) + ", " + Be.transform(e) + ", " + Be.transform(n) + ", " + ae(ce.transform(s)) + ")"
};
function Tr(t) {
  let e = "", n = "", s = "", r = "";
  return t.length > 5 ? (e = t.substring(1, 3), n = t.substring(3, 5), s = t.substring(5, 7), r = t.substring(7, 9)) : (e = t.substring(1, 2), n = t.substring(2, 3), s = t.substring(3, 4), r = t.substring(4, 5), e += e, n += n, s += s, r += r), {
    red: parseInt(e, 16),
    green: parseInt(n, 16),
    blue: parseInt(s, 16),
    alpha: r ? parseInt(r, 16) / 255 : 1
  };
}
const je = {
  test: /* @__PURE__ */ ut("#"),
  parse: Tr,
  transform: W.transform
}, pe = (t) => ({
  test: (e) => typeof e == "string" && e.endsWith(t) && e.split(" ").length === 1,
  parse: parseFloat,
  transform: (e) => `${e}${t}`
}), N = /* @__PURE__ */ pe("deg"), X = /* @__PURE__ */ pe("%"), p = /* @__PURE__ */ pe("px"), br = /* @__PURE__ */ pe("vh"), wr = /* @__PURE__ */ pe("vw"), kt = {
  ...X,
  parse: (t) => X.parse(t) / 100,
  transform: (t) => X.transform(t * 100)
}, z = {
  test: /* @__PURE__ */ ut("hsl", "hue"),
  parse: /* @__PURE__ */ In("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: e, lightness: n, alpha: s = 1 }) => "hsla(" + Math.round(t) + ", " + X.transform(ae(e)) + ", " + X.transform(ae(n)) + ", " + ae(ce.transform(s)) + ")"
}, C = {
  test: (t) => W.test(t) || je.test(t) || z.test(t),
  parse: (t) => W.test(t) ? W.parse(t) : z.test(t) ? z.parse(t) : je.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? W.transform(t) : z.transform(t)
}, Sr = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function Ar(t) {
  var e, n;
  return isNaN(t) && typeof t == "string" && (((e = t.match(lt)) === null || e === void 0 ? void 0 : e.length) || 0) + (((n = t.match(Sr)) === null || n === void 0 ? void 0 : n.length) || 0) > 0;
}
const On = "number", Ln = "color", Vr = "var", xr = "var(", Bt = "${}", Mr = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function de(t) {
  const e = t.toString(), n = [], s = {
    color: [],
    number: [],
    var: []
  }, r = [];
  let i = 0;
  const a = e.replace(Mr, (l) => (C.test(l) ? (s.color.push(i), r.push(Ln), n.push(C.parse(l))) : l.startsWith(xr) ? (s.var.push(i), r.push(Vr), n.push(l)) : (s.number.push(i), r.push(On), n.push(parseFloat(l))), ++i, Bt)).split(Bt);
  return { values: n, split: a, indexes: s, types: r };
}
function kn(t) {
  return de(t).values;
}
function Bn(t) {
  const { split: e, types: n } = de(t), s = e.length;
  return (r) => {
    let i = "";
    for (let o = 0; o < s; o++)
      if (i += e[o], r[o] !== void 0) {
        const a = n[o];
        a === On ? i += ae(r[o]) : a === Ln ? i += C.transform(r[o]) : i += r[o];
      }
    return i;
  };
}
const Er = (t) => typeof t == "number" ? 0 : t;
function Cr(t) {
  const e = kn(t);
  return Bn(t)(e.map(Er));
}
const te = {
  test: Ar,
  parse: kn,
  createTransformer: Bn,
  getAnimatableNone: Cr
}, Pr = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function Dr(t) {
  const [e, n] = t.slice(0, -1).split("(");
  if (e === "drop-shadow")
    return t;
  const [s] = n.match(lt) || [];
  if (!s)
    return t;
  const r = n.replace(s, "");
  let i = Pr.has(e) ? 1 : 0;
  return s !== n && (i *= 100), e + "(" + i + r + ")";
}
const Fr = /\b([a-z-]*)\(.*?\)/gu, ze = {
  ...te,
  getAnimatableNone: (t) => {
    const e = t.match(Fr);
    return e ? e.map(Dr).join(" ") : t;
  }
}, Rr = {
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
}, Ir = {
  rotate: N,
  rotateX: N,
  rotateY: N,
  rotateZ: N,
  scale: be,
  scaleX: be,
  scaleY: be,
  scaleZ: be,
  skew: N,
  skewX: N,
  skewY: N,
  distance: p,
  translateX: p,
  translateY: p,
  translateZ: p,
  x: p,
  y: p,
  z: p,
  perspective: p,
  transformPerspective: p,
  opacity: ce,
  originX: kt,
  originY: kt,
  originZ: p
}, Nt = {
  ...ee,
  transform: Math.round
}, ct = {
  ...Rr,
  ...Ir,
  zIndex: Nt,
  size: p,
  // SVG
  fillOpacity: ce,
  strokeOpacity: ce,
  numOctaves: Nt
}, Or = {
  ...ct,
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
  filter: ze,
  WebkitFilter: ze
}, dt = (t) => Or[t];
function Nn(t, e) {
  let n = dt(t);
  return n !== ze && (n = te), n.getAnimatableNone ? n.getAnimatableNone(e) : void 0;
}
const Lr = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function kr(t, e, n) {
  let s = 0, r;
  for (; s < t.length && !r; ) {
    const i = t[s];
    typeof i == "string" && !Lr.has(i) && de(i).values.length && (r = t[s]), s++;
  }
  if (r && n)
    for (const i of e)
      t[i] = Nn(n, r);
}
const Kt = (t) => t === ee || t === p, _t = (t, e) => parseFloat(t.split(", ")[e]), qt = (t, e) => (n, { transform: s }) => {
  if (s === "none" || !s)
    return 0;
  const r = s.match(/^matrix3d\((.+)\)$/u);
  if (r)
    return _t(r[1], e);
  {
    const i = s.match(/^matrix\((.+)\)$/u);
    return i ? _t(i[1], t) : 0;
  }
}, Br = /* @__PURE__ */ new Set(["x", "y", "z"]), Nr = Q.filter((t) => !Br.has(t));
function Kr(t) {
  const e = [];
  return Nr.forEach((n) => {
    const s = t.getValue(n);
    s !== void 0 && (e.push([n, s.get()]), s.set(n.startsWith("scale") ? 1 : 0));
  }), e;
}
const Z = {
  // Dimensions
  width: ({ x: t }, { paddingLeft: e = "0", paddingRight: n = "0" }) => t.max - t.min - parseFloat(e) - parseFloat(n),
  height: ({ y: t }, { paddingTop: e = "0", paddingBottom: n = "0" }) => t.max - t.min - parseFloat(e) - parseFloat(n),
  top: (t, { top: e }) => parseFloat(e),
  left: (t, { left: e }) => parseFloat(e),
  bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
  right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
  // Transform
  x: qt(4, 13),
  y: qt(5, 14)
};
Z.translateX = Z.x;
Z.translateY = Z.y;
const $ = /* @__PURE__ */ new Set();
let Ye = !1, Xe = !1;
function Kn() {
  if (Xe) {
    const t = Array.from($).filter((s) => s.needsMeasurement), e = new Set(t.map((s) => s.element)), n = /* @__PURE__ */ new Map();
    e.forEach((s) => {
      const r = Kr(s);
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
  Xe = !1, Ye = !1, $.forEach((t) => t.complete()), $.clear();
}
function _n() {
  $.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (Xe = !0);
  });
}
function _r() {
  _n(), Kn();
}
class ft {
  constructor(e, n, s, r, i, o = !1) {
    this.isComplete = !1, this.isAsync = !1, this.needsMeasurement = !1, this.isScheduled = !1, this.unresolvedKeyframes = [...e], this.onComplete = n, this.name = s, this.motionValue = r, this.element = i, this.isAsync = o;
  }
  scheduleResolve() {
    this.isScheduled = !0, this.isAsync ? ($.add(this), Ye || (Ye = !0, I.read(_n), I.resolveKeyframes(Kn))) : (this.readKeyframes(), this.complete());
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
const qn = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t), Wn = (t) => (e) => typeof e == "string" && e.startsWith(t), $n = /* @__PURE__ */ Wn("--"), qr = /* @__PURE__ */ Wn("var(--"), ht = (t) => qr(t) ? Wr.test(t.split("/*")[0].trim()) : !1, Wr = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, $r = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function Hr(t) {
  const e = $r.exec(t);
  if (!e)
    return [,];
  const [, n, s, r] = e;
  return [`--${n ?? s}`, r];
}
function Hn(t, e, n = 1) {
  const [s, r] = Hr(t);
  if (!s)
    return;
  const i = window.getComputedStyle(e).getPropertyValue(s);
  if (i) {
    const o = i.trim();
    return qn(o) ? parseFloat(o) : o;
  }
  return ht(r) ? Hn(r, e, n + 1) : r;
}
const Gn = (t) => (e) => e.test(t), Gr = {
  test: (t) => t === "auto",
  parse: (t) => t
}, Un = [ee, p, X, N, wr, br, Gr], Wt = (t) => Un.find(Gn(t));
class jn extends ft {
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
      if (typeof c == "string" && (c = c.trim(), ht(c))) {
        const u = Hn(c, n.current);
        u !== void 0 && (e[l] = u), l === e.length - 1 && (this.finalKeyframe = c);
      }
    }
    if (this.resolveNoneKeyframes(), !bn.has(s) || e.length !== 2)
      return;
    const [r, i] = e, o = Wt(r), a = Wt(i);
    if (o !== a)
      if (Kt(o) && Kt(a))
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
      pr(e[r]) && s.push(r);
    s.length && kr(e, s, n);
  }
  measureInitialState() {
    const { element: e, unresolvedKeyframes: n, name: s } = this;
    if (!e || !e.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = Z[s](e.measureViewportBox(), window.getComputedStyle(e.current)), n[0] = this.measuredOrigin;
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
    r[o] = Z[s](n.measureViewportBox(), window.getComputedStyle(n.current)), a !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = a), !((e = this.removedTransforms) === null || e === void 0) && e.length && this.removedTransforms.forEach(([l, c]) => {
      n.getValue(l).set(c);
    }), this.resolveNoneKeyframes();
  }
}
const $t = (t, e) => e === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(te.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function Ur(t) {
  const e = t[0];
  if (t.length === 1)
    return !0;
  for (let n = 0; n < t.length; n++)
    if (t[n] !== e)
      return !0;
}
function jr(t, e, n, s) {
  const r = t[0];
  if (r === null)
    return !1;
  if (e === "display" || e === "visibility")
    return !0;
  const i = t[t.length - 1], o = $t(r, e), a = $t(i, e);
  return !o || !a ? !1 : Ur(t) || (n === "spring" || Ie(n)) && s;
}
const zr = (t) => t !== null;
function Oe(t, { repeat: e, repeatType: n = "loop" }, s) {
  const r = t.filter(zr), i = e && n !== "loop" && e % 2 === 1 ? 0 : r.length - 1;
  return !i || s === void 0 ? r[i] : s;
}
const Yr = 40;
class zn {
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
    return this.resolvedAt ? this.resolvedAt - this.createdAt > Yr ? this.resolvedAt : this.createdAt : this.createdAt;
  }
  /**
   * A getter for resolved data. If keyframes are not yet resolved, accessing
   * this.resolved will synchronously flush all pending keyframe resolvers.
   * This is a deoptimisation, but at its worst still batches read/writes.
   */
  get resolved() {
    return !this._resolved && !this.hasAttemptedResolve && _r(), this._resolved;
  }
  /**
   * A method to be called when the keyframes resolver completes. This method
   * will check if its possible to run the animation and, if not, skip it.
   * Otherwise, it will call initPlayback on the implementing class.
   */
  onKeyframesResolved(e, n) {
    this.resolvedAt = _.now(), this.hasAttemptedResolve = !0;
    const { name: s, type: r, velocity: i, delay: o, onComplete: a, onUpdate: l, isGenerator: c } = this.options;
    if (!c && !jr(e, s, r, i))
      if (o)
        this.options.duration = 0;
      else {
        l && l(Oe(e, this.options, n)), a && a(), this.resolveFinishedPromise();
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
function Ne(t, e, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
function Xr({ hue: t, saturation: e, lightness: n, alpha: s }) {
  t /= 360, e /= 100, n /= 100;
  let r = 0, i = 0, o = 0;
  if (!e)
    r = i = o = n;
  else {
    const a = n < 0.5 ? n * (1 + e) : n + e - n * e, l = 2 * n - a;
    r = Ne(l, a, t + 1 / 3), i = Ne(l, a, t), o = Ne(l, a, t - 1 / 3);
  }
  return {
    red: Math.round(r * 255),
    green: Math.round(i * 255),
    blue: Math.round(o * 255),
    alpha: s
  };
}
function Ce(t, e) {
  return (n) => n > 0 ? e : t;
}
const Ke = (t, e, n) => {
  const s = t * t, r = n * (e * e - s) + s;
  return r < 0 ? 0 : Math.sqrt(r);
}, Zr = [je, W, z], Qr = (t) => Zr.find((e) => e.test(t));
function Ht(t) {
  const e = Qr(t);
  if (!e)
    return !1;
  let n = e.parse(t);
  return e === z && (n = Xr(n)), n;
}
const Gt = (t, e) => {
  const n = Ht(t), s = Ht(e);
  if (!n || !s)
    return Ce(t, e);
  const r = { ...n };
  return (i) => (r.red = Ke(n.red, s.red, i), r.green = Ke(n.green, s.green, i), r.blue = Ke(n.blue, s.blue, i), r.alpha = he(n.alpha, s.alpha, i), W.transform(r));
}, Jr = (t, e) => (n) => e(t(n)), mt = (...t) => t.reduce(Jr), Ze = /* @__PURE__ */ new Set(["none", "hidden"]);
function ei(t, e) {
  return Ze.has(t) ? (n) => n <= 0 ? t : e : (n) => n >= 1 ? e : t;
}
function ti(t, e) {
  return (n) => he(t, e, n);
}
function pt(t) {
  return typeof t == "number" ? ti : typeof t == "string" ? ht(t) ? Ce : C.test(t) ? Gt : ri : Array.isArray(t) ? Yn : typeof t == "object" ? C.test(t) ? Gt : ni : Ce;
}
function Yn(t, e) {
  const n = [...t], s = n.length, r = t.map((i, o) => pt(i)(i, e[o]));
  return (i) => {
    for (let o = 0; o < s; o++)
      n[o] = r[o](i);
    return n;
  };
}
function ni(t, e) {
  const n = { ...t, ...e }, s = {};
  for (const r in n)
    t[r] !== void 0 && e[r] !== void 0 && (s[r] = pt(t[r])(t[r], e[r]));
  return (r) => {
    for (const i in s)
      n[i] = s[i](r);
    return n;
  };
}
function si(t, e) {
  var n;
  const s = [], r = { color: 0, var: 0, number: 0 };
  for (let i = 0; i < e.values.length; i++) {
    const o = e.types[i], a = t.indexes[o][r[o]], l = (n = t.values[a]) !== null && n !== void 0 ? n : 0;
    s[i] = l, r[o]++;
  }
  return s;
}
const ri = (t, e) => {
  const n = te.createTransformer(e), s = de(t), r = de(e);
  return s.indexes.var.length === r.indexes.var.length && s.indexes.color.length === r.indexes.color.length && s.indexes.number.length >= r.indexes.number.length ? Ze.has(t) && !r.values.length || Ze.has(e) && !s.values.length ? ei(t, e) : mt(Yn(si(s, r), r.values), n) : Ce(t, e);
};
function Xn(t, e, n) {
  return typeof t == "number" && typeof e == "number" && typeof n == "number" ? he(t, e, n) : pt(t)(t, e);
}
function Ut({ keyframes: t, velocity: e = 0, power: n = 0.8, timeConstant: s = 325, bounceDamping: r = 10, bounceStiffness: i = 500, modifyTarget: o, min: a, max: l, restDelta: c = 0.5, restSpeed: u }) {
  const d = t[0], f = {
    done: !1,
    value: d
  }, y = (w) => a !== void 0 && w < a || l !== void 0 && w > l, g = (w) => a === void 0 ? l : l === void 0 || Math.abs(a - w) < Math.abs(l - w) ? a : l;
  let b = n * e;
  const v = d + b, h = o === void 0 ? v : o(v);
  h !== v && (b = h - d);
  const T = (w) => -b * Math.exp(-w / s), V = (w) => h + T(w), x = (w) => {
    const A = T(w), D = V(w);
    f.done = Math.abs(A) <= c, f.value = f.done ? h : D;
  };
  let m, S;
  const E = (w) => {
    y(f.value) && (m = w, S = nt({
      keyframes: [f.value, g(f.value)],
      velocity: fn(V, w, f.value),
      // TODO: This should be passing * 1000
      damping: r,
      stiffness: i,
      restDelta: c,
      restSpeed: u
    }));
  };
  return E(0), {
    calculatedDuration: null,
    next: (w) => {
      let A = !1;
      return !S && m === void 0 && (A = !0, x(w), E(w)), m !== void 0 && w >= m ? S.next(w - m) : (!A && x(w), f);
    }
  };
}
const ii = /* @__PURE__ */ me(0.42, 0, 1, 1), oi = /* @__PURE__ */ me(0, 0, 0.58, 1), Zn = /* @__PURE__ */ me(0.42, 0, 0.58, 1), jt = {
  linear: G,
  easeIn: ii,
  easeInOut: Zn,
  easeOut: oi,
  circIn: at,
  circInOut: Fn,
  circOut: mr,
  backIn: ot,
  backInOut: Pn,
  backOut: Cn,
  anticipate: Dn
}, zt = (t) => {
  if (it(t)) {
    $e(t.length === 4);
    const [e, n, s, r] = t;
    return me(e, n, s, r);
  } else if (typeof t == "string")
    return $e(jt[t] !== void 0), jt[t];
  return t;
};
function ai(t, e, n) {
  const s = [], r = n || Xn, i = t.length - 1;
  for (let o = 0; o < i; o++) {
    let a = r(t[o], t[o + 1]);
    if (e) {
      const l = Array.isArray(e) ? e[o] || G : e;
      a = mt(l, a);
    }
    s.push(a);
  }
  return s;
}
function li(t, e, { clamp: n = !0, ease: s, mixer: r } = {}) {
  const i = t.length;
  if ($e(i === e.length), i === 1)
    return () => e[0];
  if (i === 2 && e[0] === e[1])
    return () => e[1];
  const o = t[0] === t[1];
  t[0] > t[i - 1] && (t = [...t].reverse(), e = [...e].reverse());
  const a = ai(e, s, r), l = a.length, c = (u) => {
    if (o && u < t[0])
      return e[0];
    let d = 0;
    if (l > 1)
      for (; d < t.length - 2 && !(u < t[d + 1]); d++)
        ;
    const f = /* @__PURE__ */ Re(t[d], t[d + 1], u);
    return a[d](f);
  };
  return n ? (u) => c(U(t[0], t[i - 1], u)) : c;
}
function ui(t, e) {
  return t.map((n) => n * e);
}
function ci(t, e) {
  return t.map(() => e || Zn).splice(0, t.length - 1);
}
function Pe({ duration: t = 300, keyframes: e, times: n, ease: s = "easeInOut" }) {
  const r = hn(s) ? s.map(zt) : zt(s), i = {
    done: !1,
    value: e[0]
  }, o = ui(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === e.length ? n : gn(e),
    t
  ), a = li(o, e, {
    ease: Array.isArray(r) ? r : ci(e, r)
  });
  return {
    calculatedDuration: t,
    next: (l) => (i.value = a(l), i.done = l >= t, i)
  };
}
const di = (t) => {
  const e = ({ timestamp: n }) => t(n);
  return {
    start: () => I.update(e, !0),
    stop: () => Ge(e),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => Me.isProcessing ? Me.timestamp : _.now()
  };
}, fi = {
  decay: Ut,
  inertia: Ut,
  tween: Pe,
  keyframes: Pe,
  spring: nt
}, hi = (t) => t / 100;
class gt extends zn {
  constructor(e) {
    super(e), this.holdTime = null, this.cancelTime = null, this.currentTime = 0, this.playbackSpeed = 1, this.pendingPlayState = "running", this.startTime = null, this.state = "idle", this.stop = () => {
      if (this.resolver.cancel(), this.isStopped = !0, this.state === "idle")
        return;
      this.teardown();
      const { onStop: l } = this.options;
      l && l();
    };
    const { name: n, motionValue: s, element: r, keyframes: i } = this.options, o = (r == null ? void 0 : r.KeyframeResolver) || ft, a = (l, c) => this.onKeyframesResolved(l, c);
    this.resolver = new o(i, a, n, s, r), this.resolver.scheduleResolve();
  }
  flatten() {
    super.flatten(), this._resolved && Object.assign(this._resolved, this.initPlayback(this._resolved.keyframes));
  }
  initPlayback(e) {
    const { type: n = "keyframes", repeat: s = 0, repeatDelay: r = 0, repeatType: i, velocity: o = 0 } = this.options, a = Ie(n) ? n : fi[n] || Pe;
    let l, c;
    a !== Pe && typeof e[0] != "number" && (l = mt(hi, Xn(e[0], e[1])), e = [0, 100]);
    const u = a({ ...this.options, keyframes: e });
    i === "mirror" && (c = a({
      ...this.options,
      keyframes: [...e].reverse(),
      velocity: -o
    })), u.calculatedDuration === null && (u.calculatedDuration = tt(u));
    const { calculatedDuration: d } = u, f = d + r, y = f * (s + 1) - r;
    return {
      generator: u,
      mirroredGenerator: c,
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
      const { keyframes: w } = this.options;
      return { done: !0, value: w[w.length - 1] };
    }
    const { finalKeyframe: r, generator: i, mirroredGenerator: o, mapPercentToKeyframes: a, keyframes: l, calculatedDuration: c, totalDuration: u, resolvedDuration: d } = s;
    if (this.startTime === null)
      return i.next(0);
    const { delay: f, repeat: y, repeatType: g, repeatDelay: b, onUpdate: v } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - u / this.speed, this.startTime)), n ? this.currentTime = e : this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = Math.round(e - this.startTime) * this.speed;
    const h = this.currentTime - f * (this.speed >= 0 ? 1 : -1), T = this.speed >= 0 ? h < 0 : h > u;
    this.currentTime = Math.max(h, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = u);
    let V = this.currentTime, x = i;
    if (y) {
      const w = Math.min(this.currentTime, u) / d;
      let A = Math.floor(w), D = w % 1;
      !D && w >= 1 && (D = 1), D === 1 && A--, A = Math.min(A, y + 1), !!(A % 2) && (g === "reverse" ? (D = 1 - D, b && (D -= b / d)) : g === "mirror" && (x = o)), V = U(0, 1, D) * d;
    }
    const m = T ? { done: !1, value: l[0] } : x.next(V);
    a && (m.value = a(m.value));
    let { done: S } = m;
    !T && c !== null && (S = this.speed >= 0 ? this.currentTime >= u : this.currentTime <= 0);
    const E = this.holdTime === null && (this.state === "finished" || this.state === "running" && S);
    return E && r !== void 0 && (m.value = Oe(l, this.options, r)), v && v(m.value), E && this.finish(), m;
  }
  get duration() {
    const { resolved: e } = this;
    return e ? /* @__PURE__ */ k(e.calculatedDuration) : 0;
  }
  get time() {
    return /* @__PURE__ */ k(this.currentTime);
  }
  set time(e) {
    e = /* @__PURE__ */ L(e), this.currentTime = e, this.holdTime !== null || this.speed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.speed);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(e) {
    const n = this.playbackSpeed !== e;
    this.playbackSpeed = e, n && (this.time = /* @__PURE__ */ k(this.currentTime));
  }
  play() {
    if (this.resolver.isScheduled || this.resolver.resume(), !this._resolved) {
      this.pendingPlayState = "running";
      return;
    }
    if (this.isStopped)
      return;
    const { driver: e = di, onPlay: n, startTime: s } = this.options;
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
const mi = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]);
function pi(t, e, n, { delay: s = 0, duration: r = 300, repeat: i = 0, repeatType: o = "loop", ease: a = "easeInOut", times: l } = {}) {
  const c = { [e]: n };
  l && (c.offset = l);
  const u = Vn(a, r);
  return Array.isArray(u) && (c.easing = u), t.animate(c, {
    delay: s,
    duration: r,
    easing: Array.isArray(u) ? "linear" : u,
    fill: "both",
    iterations: i + 1,
    direction: o === "reverse" ? "alternate" : "normal"
  });
}
const gi = /* @__PURE__ */ et(() => Object.hasOwnProperty.call(Element.prototype, "animate")), De = 10, yi = 2e4;
function vi(t) {
  return Ie(t.type) || t.type === "spring" || !An(t.ease);
}
function Ti(t, e) {
  const n = new gt({
    ...e,
    keyframes: t,
    repeat: 0,
    delay: 0,
    isGenerator: !0
  });
  let s = { done: !1, value: t[0] };
  const r = [];
  let i = 0;
  for (; !s.done && i < yi; )
    s = n.sample(i), r.push(s.value), i += De;
  return {
    times: void 0,
    keyframes: r,
    duration: i - De,
    ease: "linear"
  };
}
const Qn = {
  anticipate: Dn,
  backInOut: Pn,
  circInOut: Fn
};
function bi(t) {
  return t in Qn;
}
class Yt extends zn {
  constructor(e) {
    super(e);
    const { name: n, motionValue: s, element: r, keyframes: i } = this.options;
    this.resolver = new jn(i, (o, a) => this.onKeyframesResolved(o, a), n, s, r), this.resolver.scheduleResolve();
  }
  initPlayback(e, n) {
    let { duration: s = 300, times: r, ease: i, type: o, motionValue: a, name: l, startTime: c } = this.options;
    if (!a.owner || !a.owner.current)
      return !1;
    if (typeof i == "string" && Ee() && bi(i) && (i = Qn[i]), vi(this.options)) {
      const { onComplete: d, onUpdate: f, motionValue: y, element: g, ...b } = this.options, v = Ti(e, b);
      e = v.keyframes, e.length === 1 && (e[1] = e[0]), s = v.duration, r = v.times, i = v.ease, o = "keyframes";
    }
    const u = pi(a.owner.current, l, e, { ...this.options, duration: s, times: r, ease: i });
    return u.startTime = c ?? this.calcStartTime(), this.pendingTimeline ? (Lt(u, this.pendingTimeline), this.pendingTimeline = void 0) : u.onfinish = () => {
      const { onComplete: d } = this.options;
      a.set(Oe(e, this.options, n)), d && d(), this.cancel(), this.resolveFinishedPromise();
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
    return /* @__PURE__ */ k(n);
  }
  get time() {
    const { resolved: e } = this;
    if (!e)
      return 0;
    const { animation: n } = e;
    return /* @__PURE__ */ k(n.currentTime || 0);
  }
  set time(e) {
    const { resolved: n } = this;
    if (!n)
      return;
    const { animation: s } = n;
    s.currentTime = /* @__PURE__ */ L(e);
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
        return G;
      const { animation: s } = n;
      Lt(s, e);
    }
    return G;
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
      const { motionValue: c, onUpdate: u, onComplete: d, element: f, ...y } = this.options, g = new gt({
        ...y,
        keyframes: s,
        duration: r,
        type: i,
        ease: o,
        times: a,
        isGenerator: !0
      }), b = /* @__PURE__ */ L(this.time);
      c.setWithVelocity(g.sample(b - De).value, g.sample(b).value, De);
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
    return gi() && s && mi.has(s) && /**
     * If we're outputting values to onUpdate then we can't use WAAPI as there's
     * no way to read the value from WAAPI every frame.
     */
    !l && !c && !r && i !== "mirror" && o !== 0 && a !== "inertia";
  }
}
const wi = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, Si = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), Ai = {
  type: "keyframes",
  duration: 0.8
}, Vi = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, xi = (t, { keyframes: e }) => e.length > 2 ? Ai : J.has(t) ? t.startsWith("scale") ? Si(e[1]) : wi : Vi;
function Mi({ when: t, delay: e, delayChildren: n, staggerChildren: s, staggerDirection: r, repeat: i, repeatType: o, repeatDelay: a, from: l, elapsed: c, ...u }) {
  return !!Object.keys(u).length;
}
const Jn = (t, e, n, s = {}, r, i) => (o) => {
  const a = Tn(s, t) || {}, l = a.delay || s.delay || 0;
  let { elapsed: c = 0 } = s;
  c = c - /* @__PURE__ */ L(l);
  let u = {
    keyframes: Array.isArray(n) ? n : [null, n],
    ease: "easeOut",
    velocity: e.getVelocity(),
    ...a,
    delay: -c,
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
  Mi(a) || (u = {
    ...u,
    ...xi(t, u)
  }), u.duration && (u.duration = /* @__PURE__ */ L(u.duration)), u.repeatDelay && (u.repeatDelay = /* @__PURE__ */ L(u.repeatDelay)), u.from !== void 0 && (u.keyframes[0] = u.from);
  let d = !1;
  if ((u.type === !1 || u.duration === 0 && !u.repeatDelay) && (u.duration = 0, u.delay === 0 && (d = !0)), d && !i && e.get() !== void 0) {
    const f = Oe(u.keyframes, a);
    if (f !== void 0)
      return I.update(() => {
        u.onUpdate(f), u.onComplete();
      }), new un([]);
  }
  return !i && Yt.supports(u) ? new Yt(u) : new gt(u);
};
function Ei({ protectedKeys: t, needsAnimating: e }, n) {
  const s = t.hasOwnProperty(n) && e[n] !== !0;
  return e[n] = !1, s;
}
function Ci(t, e, { delay: n = 0, transitionOverride: s, type: r } = {}) {
  var i;
  let { transition: o = t.getDefaultTransition(), transitionEnd: a, ...l } = e;
  s && (o = s);
  const c = [], u = r && t.animationState && t.animationState.getState()[r];
  for (const d in l) {
    const f = t.getValue(d, (i = t.latestValues[d]) !== null && i !== void 0 ? i : null), y = l[d];
    if (y === void 0 || u && Ei(u, d))
      continue;
    const g = {
      delay: n,
      ...Tn(o || {}, d)
    };
    let b = !1;
    if (window.MotionHandoffAnimation) {
      const h = lr(t);
      if (h) {
        const T = window.MotionHandoffAnimation(h, d, I);
        T !== null && (g.startTime = T, b = !0);
      }
    }
    ir(t, d), f.start(Jn(d, f, y, t.shouldReduceMotion && bn.has(d) ? { type: !1 } : g, t, b));
    const v = f.animation;
    v && c.push(v);
  }
  return a && Promise.all(c).then(() => {
    I.update(() => {
      a && sr(t, a);
    });
  }), c;
}
function Pi(t) {
  return t instanceof SVGElement && t.tagName !== "svg";
}
const Xt = () => ({ min: 0, max: 0 }), yt = () => ({
  x: Xt(),
  y: Xt()
}), Zt = {
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
}, Qe = {};
for (const t in Zt)
  Qe[t] = {
    isEnabled: (e) => Zt[t].some((n) => !!e[n])
  };
const Di = typeof window < "u", Je = { current: null }, es = { current: !1 };
function Fi() {
  if (es.current = !0, !!Di)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), e = () => Je.current = t.matches;
      t.addListener(e), e();
    } else
      Je.current = !1;
}
const Ri = [...Un, C, te], Ii = (t) => Ri.find(Gn(t));
function Oi(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function Li(t) {
  return typeof t == "string" || Array.isArray(t);
}
const ki = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Bi = ["initial", ...ki];
function ts(t) {
  return Oi(t.animate) || Bi.some((e) => Li(t[e]));
}
function Ni(t) {
  return !!(ts(t) || t.variants);
}
function Ki(t, e, n) {
  for (const s in e) {
    const r = e[s], i = n[s];
    if (P(r))
      t.addValue(s, r);
    else if (P(i))
      t.addValue(s, ue(r, { owner: t }));
    else if (i !== r)
      if (t.hasValue(s)) {
        const o = t.getValue(s);
        o.liveStyle === !0 ? o.jump(r) : o.hasAnimated || o.set(r);
      } else {
        const o = t.getStaticValue(s);
        t.addValue(s, ue(o !== void 0 ? o : r, { owner: t }));
      }
  }
  for (const s in n)
    e[s] === void 0 && t.removeValue(s);
  return e;
}
const Qt = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
class ns {
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
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = ft, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const y = _.now();
      this.renderScheduledAt < y && (this.renderScheduledAt = y, I.render(this.render, !1, !0));
    };
    const { latestValues: l, renderState: c, onUpdate: u } = o;
    this.onUpdate = u, this.latestValues = l, this.baseTarget = { ...l }, this.initialValues = n.initial ? { ...l } : {}, this.renderState = c, this.parent = e, this.props = n, this.presenceContext = s, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = r, this.options = a, this.blockInitialAnimation = !!i, this.isControllingVariants = ts(n), this.isVariantNode = Ni(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
    const { willChange: d, ...f } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const y in f) {
      const g = f[y];
      l[y] !== void 0 && P(g) && g.set(l[y], !1);
    }
  }
  mount(e) {
    this.current = e, le.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((n, s) => this.bindToMotionValue(s, n)), es.current || Fi(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : Je.current, this.parent && this.parent.children.add(this), this.update(this.props, this.presenceContext);
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
    const s = J.has(e);
    s && this.onBindTransform && this.onBindTransform();
    const r = n.on("change", (a) => {
      this.latestValues[e] = a, this.props.onUpdate && I.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0);
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
    for (e in Qe) {
      const n = Qe[e];
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : yt();
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
    for (let s = 0; s < Qt.length; s++) {
      const r = Qt[s];
      this.propEventSubscriptions[r] && (this.propEventSubscriptions[r](), delete this.propEventSubscriptions[r]);
      const i = "on" + r, o = e[i];
      o && (this.propEventSubscriptions[r] = this.on(r, o));
    }
    this.prevMotionValues = Ki(this, this.scrapeMotionValuesFromProps(e, this.prevProps, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue(), this.onUpdate && this.onUpdate(this);
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
    return s === void 0 && n !== void 0 && (s = ue(n === null ? void 0 : n, { owner: this }), this.addValue(e, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(e, n) {
    var s;
    let r = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : (s = this.getBaseTargetFromProps(this.props, e)) !== null && s !== void 0 ? s : this.readValueFromInstance(this.current, e, this.options);
    return r != null && (typeof r == "string" && (qn(r) || Rn(r)) ? r = parseFloat(r) : !Ii(r) && te.test(n) && (r = Nn(e, n)), this.setBaseTarget(e, P(r) ? r.get() : r)), P(r) ? r.get() : r;
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
      const o = Sn(this.props, s, (n = this.presenceContext) === null || n === void 0 ? void 0 : n.custom);
      o && (r = o[e]);
    }
    if (s && r !== void 0)
      return r;
    const i = this.getBaseTargetFromProps(this.props, e);
    return i !== void 0 && !P(i) ? i : this.initialValues[e] !== void 0 && r === void 0 ? void 0 : this.baseTarget[e];
  }
  on(e, n) {
    return this.events[e] || (this.events[e] = new wn()), this.events[e].add(n);
  }
  notify(e, ...n) {
    this.events[e] && this.events[e].notify(...n);
  }
}
class ss extends ns {
  constructor() {
    super(...arguments), this.KeyframeResolver = jn;
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
const rs = (t, e) => e && typeof t == "number" ? e.transform(t) : t, _i = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, qi = Q.length;
function Wi(t, e, n) {
  let s = "", r = !0;
  for (let i = 0; i < qi; i++) {
    const o = Q[i], a = t[o];
    if (a === void 0)
      continue;
    let l = !0;
    if (typeof a == "number" ? l = a === (o.startsWith("scale") ? 1 : 0) : l = parseFloat(a) === 0, !l || n) {
      const c = rs(a, ct[o]);
      if (!l) {
        r = !1;
        const u = _i[o] || o;
        s += `${u}(${c}) `;
      }
      n && (e[o] = c);
    }
  }
  return s = s.trim(), n ? s = n(e, r ? "" : s) : r && (s = "none"), s;
}
function is(t, e, n) {
  const { style: s, vars: r, transformOrigin: i } = t;
  let o = !1, a = !1;
  for (const l in e) {
    const c = e[l];
    if (J.has(l)) {
      o = !0;
      continue;
    } else if ($n(l)) {
      r[l] = c;
      continue;
    } else {
      const u = rs(c, ct[l]);
      l.startsWith("origin") ? (a = !0, i[l] = u) : s[l] = u;
    }
  }
  if (e.transform || (o || n ? s.transform = Wi(e, t.transform, n) : s.transform && (s.transform = "none")), a) {
    const { originX: l = "50%", originY: c = "50%", originZ: u = 0 } = i;
    s.transformOrigin = `${l} ${c} ${u}`;
  }
}
const $i = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, Hi = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function Gi(t, e, n = 1, s = 0, r = !0) {
  t.pathLength = 1;
  const i = r ? $i : Hi;
  t[i.offset] = p.transform(-s);
  const o = p.transform(e), a = p.transform(n);
  t[i.array] = `${o} ${a}`;
}
function Jt(t, e, n) {
  return typeof t == "string" ? t : p.transform(e + n * t);
}
function Ui(t, e, n) {
  const s = Jt(e, t.x, t.width), r = Jt(n, t.y, t.height);
  return `${s} ${r}`;
}
function ji(t, {
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
}, u, d) {
  if (is(t, c, d), u) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: f, style: y, dimensions: g } = t;
  f.transform && (g && (y.transform = f.transform), delete f.transform), g && (r !== void 0 || i !== void 0 || y.transform) && (y.transformOrigin = Ui(g, r !== void 0 ? r : 0.5, i !== void 0 ? i : 0.5)), e !== void 0 && (f.x = e), n !== void 0 && (f.y = n), s !== void 0 && (f.scale = s), o !== void 0 && Gi(f, o, a, l, !1);
}
const os = /* @__PURE__ */ new Set([
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
]), zi = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function Yi(t, e) {
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
function as(t, { style: e, vars: n }, s, r) {
  Object.assign(t.style, e, r && r.getProjectionStyles(s));
  for (const i in n)
    t.style.setProperty(i, n[i]);
}
function Xi(t, e, n, s) {
  as(t, e, void 0, s);
  for (const r in e.attrs)
    t.setAttribute(os.has(r) ? r : rt(r), e.attrs[r]);
}
const Zi = {};
function Qi(t, { layout: e, layoutId: n }) {
  return J.has(t) || t.startsWith("origin") || (e || n !== void 0) && (!!Zi[t] || t === "opacity");
}
function ls(t, e, n) {
  var s;
  const { style: r } = t, i = {};
  for (const o in r)
    (P(r[o]) || e.style && P(e.style[o]) || Qi(o, t) || ((s = n == null ? void 0 : n.getValue(o)) === null || s === void 0 ? void 0 : s.liveStyle) !== void 0) && (i[o] = r[o]);
  return i;
}
function Ji(t, e, n) {
  const s = ls(t, e, n);
  for (const r in t)
    if (P(t[r]) || P(e[r])) {
      const i = Q.indexOf(r) !== -1 ? "attr" + r.charAt(0).toUpperCase() + r.substring(1) : r;
      s[i] = t[r];
    }
  return s;
}
class eo extends ss {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = yt, this.updateDimensions = () => {
      this.current && !this.renderState.dimensions && Yi(this.current, this.renderState);
    };
  }
  getBaseTargetFromProps(e, n) {
    return e[n];
  }
  readValueFromInstance(e, n) {
    if (J.has(n)) {
      const s = dt(n);
      return s && s.default || 0;
    }
    return n = os.has(n) ? n : rt(n), e.getAttribute(n);
  }
  scrapeMotionValuesFromProps(e, n, s) {
    return Ji(e, n, s);
  }
  onBindTransform() {
    this.current && !this.renderState.dimensions && I.postRender(this.updateDimensions);
  }
  build(e, n, s) {
    ji(e, n, this.isSVGTag, s.transformTemplate);
  }
  renderInstance(e, n, s, r) {
    Xi(e, n, s, r);
  }
  mount(e) {
    this.isSVGTag = zi(e.tagName), super.mount(e);
  }
}
function to({ top: t, left: e, right: n, bottom: s }) {
  return {
    x: { min: e, max: n },
    y: { min: t, max: s }
  };
}
function no(t, e) {
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
function so(t, e) {
  return to(no(t.getBoundingClientRect(), e));
}
function ro(t) {
  return window.getComputedStyle(t);
}
class io extends ss {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = as;
  }
  readValueFromInstance(e, n) {
    if (J.has(n)) {
      const s = dt(n);
      return s && s.default || 0;
    } else {
      const s = ro(e), r = ($n(n) ? s.getPropertyValue(n) : s[n]) || 0;
      return typeof r == "string" ? r.trim() : r;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: n }) {
    return so(e, n);
  }
  build(e, n, s) {
    is(e, n, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, n, s) {
    return ls(e, n, s);
  }
}
function oo(t, e) {
  return t in e;
}
class ao extends ns {
  constructor() {
    super(...arguments), this.type = "object";
  }
  readValueFromInstance(e, n) {
    if (oo(n, e)) {
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
    return yt();
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
function lo(t) {
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
  }, n = Pi(t) ? new eo(e) : new io(e);
  n.mount(t), le.set(t, n);
}
function uo(t) {
  const e = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  }, n = new ao(e);
  n.mount(t), le.set(t, n);
}
function co(t, e, n) {
  const s = P(t) ? t : ue(t);
  return s.start(Jn("", s, e, n)), s.animation;
}
function fo(t, e) {
  return P(t) || typeof t == "number" || typeof t == "string" && !st(e);
}
function us(t, e, n, s) {
  const r = [];
  if (fo(t, e))
    r.push(co(t, st(e) && e.default || e, n && (n.default || n)));
  else {
    const i = yn(t, e, s), o = i.length;
    for (let a = 0; a < o; a++) {
      const l = i[a], c = l instanceof Element ? lo : uo;
      le.has(l) || c(l);
      const u = le.get(l), d = { ...n };
      "delay" in d && typeof d.delay == "function" && (d.delay = d.delay(a, o)), r.push(...Ci(u, { ...e, transition: d }, {}));
    }
  }
  return r;
}
function ho(t, e, n) {
  const s = [];
  return qs(t, e, n, { spring: nt }).forEach(({ keyframes: i, transition: o }, a) => {
    s.push(...us(a, i, o));
  }), s;
}
function mo(t) {
  return Array.isArray(t) && t.some(Array.isArray);
}
function po(t) {
  function e(n, s, r) {
    let i = [];
    return mo(n) ? i = ho(n, s, t) : i = us(n, s, r, t), new un(i);
  }
  return e;
}
const Fe = po();
class go {
  /**
   * Creates a new PausableInterval instance
   * @param callback The function to call on each interval
   * @param interval The interval duration in milliseconds
   */
  constructor(e, n) {
    q(this, "callback");
    q(this, "interval");
    q(this, "isRunning");
    q(this, "timeoutId");
    q(this, "remaining");
    q(this, "startTime");
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
var O;
class yo extends EventTarget {
  constructor(n) {
    super();
    Et(this, O);
    ke(this, O, n);
  }
  get value() {
    return ie(this, O);
  }
  set value(n) {
    ie(this, O) !== n && (ke(this, O, n), this.dispatchEvent(new CustomEvent("change")));
  }
  effect(n) {
    return n(), this.addEventListener("change", n), () => this.removeEventListener("change", n);
  }
  valueOf() {
    return ie(this, O);
  }
  toString() {
    return String(ie(this, O));
  }
}
O = new WeakMap();
const vo = (t) => new yo(t), cs = 3e3, Ve = document.querySelector("#alerts");
if (!Ve)
  throw new Error("Alert container not found");
const H = [], Y = vo(!1);
Y.effect(ws(50, () => {
  H.toReversed().forEach(({ element: t, interval: e }, n) => {
    Y.value ? (e.setInterval(cs - n * 250), e.pause()) : e.resume();
    const s = 1 - n * 0.1, r = n === 0 ? 0 : -10 * n, i = H.slice(0, n), o = 5;
    Fe(t, {
      y: Y.value ? i.reduce((a, { element: l }) => a + l.offsetHeight + o, 0) * -1 : r,
      scale: Y.value ? 1 : s
    }, {
      ease: "easeOut",
      duration: 0.3
    });
  });
}));
function en(t, e) {
  const n = H.length - 1, s = H.shift();
  if (!s)
    throw new Error("First alert not found");
  s.interval.stop();
  let r = -10 * (n + 1), i = n === 1 ? 1 : 1 - n * 0.1;
  e && (r += 10, i -= 0.1), Fe(s.element, {
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
function To(t, e) {
  H.length === 3 && en("top", !0);
  const n = document.createElement("div");
  n.setAttribute("role", "alert"), n.classList.add("c-toast", "z-50"), n.style.opacity = "0%";
  const s = document.createElement("span");
  if (s.textContent = t, n.append(s), e) {
    const i = document.createElement("div");
    i.innerHTML = e, n.prepend(i);
  }
  n.addEventListener("mouseenter", () => Y.value = !0), n.addEventListener("mouseleave", () => Y.value = !1), Ve == null || Ve.append(n), Fe(n, {
    y: ["100%", 0],
    scale: 1,
    opacity: 1
  }, {
    ease: "easeOut",
    duration: 0.3
  }), H.toReversed().forEach(({ element: i }, o) => {
    const a = 1 - (o + 1) * 0.1, l = -10 * (o + 1);
    Fe(i, {
      y: l,
      scale: a
    }, { ease: "easeOut", duration: 0.3 });
  });
  const r = new go(() => en("bottom", !1), cs);
  H.push({ element: n, interval: r }), r.start();
}
const bo = 5e3;
async function wo(t) {
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
      setTimeout(() => (clearInterval(r), s()), bo);
    }))
  );
}
function _e(t) {
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
function ds() {
  document.body.classList.add("js-loaded");
}
const So = async (t) => {
  await wo(t), t.forEach(_e), window.addEventListener("resize", () => {
    t.forEach((e) => _e(e));
  }), t.forEach((e) => {
    const n = e.contentWindow;
    if (!n)
      return;
    const s = new ResizeObserver(() => _e(e));
    s.observe(n.document.documentElement), s.observe(n.document.body);
  }), ds();
}, qe = "in2theme", we = {
  normal: "theme-normal",
  light: "theme-light",
  dark: "theme-dark"
}, Ao = (t) => {
  const e = window.matchMedia("(prefers-color-scheme: dark)");
  function n() {
    const o = localStorage.getItem(qe);
    return o || localStorage.setItem(qe, "normal"), o;
  }
  function s() {
    const o = n();
    let a = we[o];
    o === "normal" && e.matches && (a = we.dark);
    const l = (d) => {
      Object.values(we).forEach((f) => d.classList.remove(f)), d.classList.remove("dark");
    }, c = (d) => {
      d.classList.add(a), a === we.dark && d.classList.add("dark");
    };
    l(t), c(t);
    const u = document.querySelectorAll("iframe");
    u && u.forEach((d) => {
      l(d), c(d);
    }), l(document.body), c(document.body);
  }
  e.addEventListener("change", () => {
    n() === "normal" && s();
  }), s(), t.addEventListener("change", () => {
    const o = t.querySelector('input[name="theme"]:checked');
    if (!o)
      throw new Error("No selected theme found");
    const a = o.value;
    localStorage.setItem(qe, a), s();
  });
  const r = n(), i = t.querySelector(`input[value="${r}"]`);
  if (!i)
    throw new Error("No current theme input found");
  i.checked = !0;
};
function Vo() {
  const t = document.querySelector("header");
  if (!t)
    throw new Error("No header found");
  const e = () => t.getBoundingClientRect().height;
  document.documentElement.style.setProperty("--header-height", `${e()}px`), window.addEventListener("resize", () => {
    document.documentElement.style.setProperty("--header-height", `${e()}px`);
  });
}
function xo() {
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
Vo();
xo();
const K = document.querySelector("#search-dialog");
if (!K)
  throw new Error("No search dialog found");
const vt = document.querySelectorAll("[data-open-search]");
if (vt.length === 0)
  throw new Error("No open search buttons found");
const fe = document.querySelector("#search-input");
if (!fe)
  throw new Error("No search input found");
const fs = document.querySelector("#search-list");
if (!fs)
  throw new Error("No search list found");
const hs = document.querySelectorAll(".search-category__item--active");
if (!hs)
  throw new Error("No search results found");
const ms = document.querySelector("#search-no-results");
if (!ms)
  throw new Error("No search no results element found");
function ps() {
  const t = fe.value.toLowerCase().trim();
  let e = !1;
  hs.forEach((n) => {
    var i, o;
    let s = !1;
    const r = ((i = n.getAttribute("data-search-keywords")) == null ? void 0 : i.split(",")) || [];
    if (r.length > 0)
      s = r.some((a) => a.toLowerCase().includes(t));
    else {
      const a = (o = n.innerText) == null ? void 0 : o.toLowerCase();
      s = a == null ? void 0 : a.includes(t);
    }
    n.classList.toggle("search-category__item--active", s), s && (e = !0);
  }), fs.classList.toggle("hidden", !e), ms.classList.toggle("hidden", e);
}
fe.addEventListener("input", ps);
vt.forEach((t) => {
  t.addEventListener("click", () => K.showModal());
});
function tn(t) {
  t.target.closest("dialog") !== null || K.close();
}
new MutationObserver(() => {
  vt.forEach(
    (t) => t.ariaExpanded = K.open.toString()
  ), fe.ariaExpanded = K.open.toString(), K.open ? setTimeout(() => {
    document.addEventListener("click", tn);
  }, 0) : (document.removeEventListener("click", tn), fe.value = "", ps());
}).observe(K, { attributes: !0, attributeFilter: ["open"] });
document.addEventListener("keydown", (t) => {
  t.key === "k" && (t.metaKey || t.ctrlKey) && (t.preventDefault(), K.showModal());
});
const nn = Array.from(document.querySelectorAll(".preview-iframe"));
nn.length > 0 ? So(nn).catch(console.error) : ds();
const sn = document.querySelector(".theme-select");
sn && Ao(sn);
const We = document.querySelectorAll("details:has(.code-highlight)");
We.length > 0 && (We.forEach((t) => {
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
    await t(), We.forEach((n) => {
      const s = n.querySelector(".code-highlight");
      if (!s)
        throw new Error("No code element found");
      e(s).catch(console.error);
    });
  });
}, 5e3));
const Se = document.querySelectorAll("[data-code-audit-iframe]"), j = document.querySelector("#code-audit-dialog");
Se.length > 0 && j && (async () => {
  const { createHtmlValidator: t, auditCode: e } = await import("./html-validator-BPJTaG8R.js");
  Se.forEach((n) => n.addEventListener("click", async () => {
    Se.forEach((r) => r.setAttribute("aria-expanded", "false")), n.setAttribute("disabled", "");
    const { isValid: s } = await e(n, j);
    s ? (n.classList.add("text-green-500", "!cursor-not-allowed"), To(
      "Scanned HTML, no issues found!",
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4 text-green-500/50"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clip-rule="evenodd" /></svg>'
    ), setTimeout(() => {
      n.classList.remove("text-green-500", "!cursor-not-allowed"), n.removeAttribute("disabled");
    }, 5e3)) : (n.setAttribute("aria-expanded", "true"), n.removeAttribute("disabled"), n.classList.add("text-red-500"), j.showModal());
  })), new MutationObserver(() => {
    const n = (s) => {
      const r = s.target;
      if (!(r instanceof Element))
        return;
      r.closest("dialog") !== null || j.close();
    };
    j.open ? document.addEventListener("click", n) : (document.removeEventListener("click", n), Se.forEach((s) => {
      s.setAttribute("aria-expanded", "false"), setTimeout(() => s.classList.remove("text-red-500"), 2500);
    }));
  }).observe(j, { attributes: !0, attributeFilter: ["open"] }), setTimeout(() => {
    requestIdleCallback(t);
  }, 8e3);
})();
const rn = document.querySelector("#icon-search-input"), on = document.querySelector("#icon-search-input-reset"), an = document.querySelector("#icon-search-list");
rn && an && on && import("./icons-B1FYFkkU.js").then(({ default: t }) => t(rn, an, on)).catch(console.error);
const gs = "data-clipboard-value", ln = document.querySelectorAll(`button[${gs}]`);
ln.length > 0 && import("./clipboard-J9_Rln2c.js").then(({ default: t }) => t(ln, gs)).catch(console.error);
export {
  To as r
};
