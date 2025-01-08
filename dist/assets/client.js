var R = Object.defineProperty;
var F = (t, e, o) => e in t ? R(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[e] = o;
var l = (t, e, o) => F(t, typeof e != "symbol" ? e + "" : e, o);
function O() {
  const t = document.querySelector("header");
  if (!t)
    throw new Error("No header found");
  const e = () => t.getBoundingClientRect().height;
  document.documentElement.style.setProperty("--header-height", `${e()}px`), window.addEventListener("resize", () => {
    document.documentElement.style.setProperty("--header-height", `${e()}px`);
  });
}
function x() {
  const t = document.querySelector("aside");
  if (!t)
    throw new Error("No aside menu found");
  t.addEventListener("scroll", () => {
    const o = t.scrollTop / (t.scrollHeight - t.clientHeight) * 100;
    sessionStorage.setItem("asideScrollPercentage", o.toString());
  });
  function e() {
    const o = sessionStorage.getItem("asideScrollPercentage");
    if (o) {
      const n = Number.parseFloat(o), r = (t.scrollHeight - t.clientHeight) * n / 100;
      t.scrollTop = r;
    }
  }
  window.addEventListener("resize", e), e();
}
O();
x();
class E {
  // 10 seconds maximum wait time
  constructor(e = "preview-iframe", o = { minHeight: null, bufferHeight: 5 }) {
    l(this, "iframes");
    l(this, "options");
    l(this, "initialLoadPromises");
    l(this, "isInitialLoad", !0);
    l(this, "readyStateCheckInterval", 50);
    // ms to check readyState
    l(this, "maxWaitTime", 1e4);
    this.iframes = Array.from(
      document.getElementsByClassName(e)
    ), this.options = o, this.initialLoadPromises = [], setTimeout(() => {
      document.body.classList.contains("js-loaded") || (console.warn("Safety timeout triggered - forcing page to show"), this.handleUrlFragment(), this.isInitialLoad = !1, document.body.classList.add("js-loaded"));
    }, this.maxWaitTime), document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => this.init()) : this.init(), window.addEventListener("resize", () => {
      this.isInitialLoad || this.updateAllIframes();
    });
  }
  init() {
    this.iframes.forEach((e, o) => {
      e.style.cssText = `
                width: 100%;
                overflow: hidden;
                min-height: 0;
                border: none;
                opacity: 0;
                transition: opacity 0.2s ease-in-out;
            `;
      const n = new Promise((r) => {
        const s = Date.now(), i = async () => {
          try {
            await this.setupIframe(e), e.style.opacity = "1", r();
          } catch (d) {
            console.warn(`Error setting up iframe ${o}:`, d), r();
          }
        }, a = () => {
          if (Date.now() - s > this.maxWaitTime) {
            console.warn(`Iframe ${o} timed out waiting for load`), r();
            return;
          }
          const d = e.contentWindow;
          if (!d) {
            setTimeout(a, this.readyStateCheckInterval);
            return;
          }
          try {
            const c = d.document;
            c && c.readyState === "complete" ? i() : c ? e.addEventListener("load", i, { once: !0 }) : setTimeout(a, this.readyStateCheckInterval);
          } catch (c) {
            console.warn(`Error accessing iframe ${o}:`, c), r();
          }
        };
        a(), e.addEventListener("load", () => {
          a();
        }, { once: !0 });
      });
      this.initialLoadPromises.push(n);
    }), Promise.all(this.initialLoadPromises).then(() => new Promise((e) => setTimeout(e, 100))).then(() => Promise.all(this.iframes.map((e) => this.adjustHeight(e)))).then(() => {
      this.handleUrlFragment(), this.isInitialLoad = !1, document.body.classList.add("js-loaded");
    }).catch((e) => {
      console.error("Error during iframe initialization:", e), this.handleUrlFragment(), setTimeout(() => {
        this.isInitialLoad = !1, document.body.classList.add("js-loaded");
      }, this.maxWaitTime);
    });
  }
  handleUrlFragment() {
    const e = window.location.hash;
    if (e)
      try {
        const o = document.querySelector(e);
        o && window.scrollTo({
          top: window.scrollY + o.getBoundingClientRect().top,
          left: 0,
          behavior: "instant"
          // Force instant scroll
        });
      } catch (o) {
        console.warn("Error handling URL fragment:", o);
      }
  }
  async setupIframe(e) {
    const o = e.contentWindow;
    if (!o)
      return;
    const n = o.document, r = n.createElement("style");
    if (r.textContent = `
            html, body {
                margin: 0;
                padding: 0;
                min-height: 0 !important;
            }
        `, n.head.appendChild(r), await new Promise((s) => {
      const i = () => {
        const d = Array.from(n.getElementsByTagName("*")).filter(
          (g) => g instanceof HTMLImageElement && !g.complete
        ), c = Array.from(n.styleSheets).filter(
          (g) => {
            try {
              return g.cssRules === null;
            } catch {
              return !0;
            }
          }
        );
        d.length === 0 && c.length === 0 ? s() : setTimeout(i, this.readyStateCheckInterval);
      };
      i();
    }), !this.isInitialLoad) {
      const s = new ResizeObserver(() => {
        this.adjustHeight(e);
      });
      s.observe(n.documentElement), s.observe(n.body), new MutationObserver(() => {
        this.adjustHeight(e);
      }).observe(n.body, {
        childList: !0,
        subtree: !0,
        attributes: !0,
        characterData: !0
      });
    }
    await this.adjustHeight(e);
  }
  adjustHeight(e) {
    return new Promise((o) => {
      requestAnimationFrame(() => {
        var i;
        const n = (i = e.contentWindow) == null ? void 0 : i.document;
        if (!n) {
          o();
          return;
        }
        e.style.height = "0px", e.offsetHeight;
        const r = Math.max(
          n.documentElement.scrollHeight,
          n.body.scrollHeight,
          n.documentElement.offsetHeight,
          n.body.offsetHeight,
          n.documentElement.clientHeight,
          n.body.clientHeight
        ), s = this.options.minHeight ? Math.max(r, this.options.minHeight) : r;
        e.style.height = `${s + this.options.bufferHeight}px`, requestAnimationFrame(() => {
          o();
        });
      });
    });
  }
  updateAllIframes() {
    this.isInitialLoad || this.iframes.forEach((e) => {
      this.adjustHeight(e);
    });
  }
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => {
  new E("preview-iframe");
}) : new E("preview-iframe");
const w = "in2theme", f = {
  normal: "theme-normal",
  light: "theme-light",
  dark: "theme-dark"
}, h = document.querySelector(".theme-select");
if (!h)
  throw new Error("No theme select found");
const T = window.matchMedia("(prefers-color-scheme: dark)");
function y() {
  const t = localStorage.getItem(w);
  return t || localStorage.setItem(w, "normal"), t;
}
function p() {
  const t = y();
  let e = f[t];
  t === "normal" && T.matches && (e = f.dark);
  const o = (s) => {
    Object.values(f).forEach((i) => s.classList.remove(i)), s.classList.remove("dark");
  }, n = (s) => {
    s.classList.add(e), e === f.dark && s.classList.add("dark");
  };
  o(h), n(h);
  const r = document.querySelectorAll("iframe");
  r && r.forEach((s) => {
    o(s), n(s);
  }), o(document.body), n(document.body);
}
T.addEventListener("change", () => {
  y() === "normal" && p();
});
p();
h.addEventListener("change", () => {
  const t = h.querySelector('input[name="theme"]:checked');
  if (!t)
    throw new Error("No selected theme found");
  const e = t.value;
  localStorage.setItem(w, e), p();
});
const j = y(), k = h.querySelector(`input[value="${j}"]`);
if (!k)
  throw new Error("No current theme input found");
k.checked = !0;
const u = document.querySelector("#search-dialog");
if (!u)
  throw new Error("No search dialog found");
const C = document.querySelectorAll("[data-open-search]");
if (C.length === 0)
  throw new Error("No open search buttons found");
const m = document.querySelector("#search-input");
if (!m)
  throw new Error("No search input found");
const q = document.querySelector("#search-list");
if (!q)
  throw new Error("No search list found");
const M = document.querySelectorAll(".search-category__item--active");
if (!M)
  throw new Error("No search results found");
const P = document.querySelector("#search-no-results");
if (!P)
  throw new Error("No search no results element found");
function A() {
  const t = m.value.toLowerCase().trim();
  let e = !1;
  M.forEach((o) => {
    var s, i;
    let n = !1;
    const r = ((s = o.getAttribute("data-search-keywords")) == null ? void 0 : s.split(",")) || [];
    if (r.length > 0)
      n = r.some((a) => a.toLowerCase().includes(t));
    else {
      const a = (i = o.innerText) == null ? void 0 : i.toLowerCase();
      n = a == null ? void 0 : a.includes(t);
    }
    o.classList.toggle("search-category__item--active", n), n && (e = !0);
  }), q.classList.toggle("hidden", !e), P.classList.toggle("hidden", e);
}
m.addEventListener("input", A);
C.forEach((t) => {
  t.addEventListener("click", () => u.showModal());
});
function L(t) {
  t.target.closest("dialog") !== null || u.close();
}
new MutationObserver(() => {
  u.open ? (window.matchMedia("(max-width: 768px)").matches && m.blur(), setTimeout(() => {
    document.addEventListener("click", L);
  }, 0)) : (document.removeEventListener("click", L), m.value = "", A());
}).observe(u, { attributes: !0, attributeFilter: ["open"] });
document.addEventListener("keydown", (t) => {
  t.key === "k" && (t.metaKey || t.ctrlKey) && (t.preventDefault(), u.showModal());
});
const S = document.querySelectorAll(".code-highlight");
S.length > 0 && import("./code-CcnfoGUE.js").then(({ default: t }) => t(S)).catch(console.error);
const b = document.querySelector("#icon-search-input"), v = document.querySelector("#icon-search-input-reset"), I = document.querySelector("#icon-search-list");
b && I && v && import("./icons-DKt1vG1z.js").then(({ default: t }) => t(b, I, v)).catch(console.error);
const N = "data-clipboard-value", H = document.querySelectorAll(`button[${N}]`);
H.length > 0 && import("./clipboard-BwiD_T_n.js").then(({ default: t }) => t(H, N)).catch(console.error);
