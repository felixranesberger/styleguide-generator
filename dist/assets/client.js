var N = Object.defineProperty;
var R = (t, e, o) => e in t ? N(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[e] = o;
var l = (t, e, o) => R(t, typeof e != "symbol" ? e + "" : e, o);
function F() {
  const t = document.querySelector("header");
  if (!t)
    throw new Error("No header found");
  const e = () => t.getBoundingClientRect().height;
  document.documentElement.style.setProperty("--header-height", `${e()}px`), window.addEventListener("resize", () => {
    document.documentElement.style.setProperty("--header-height", `${e()}px`);
  });
}
function j() {
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
      const n = Number.parseFloat(o), i = (t.scrollHeight - t.clientHeight) * n / 100;
      t.scrollTop = i;
    }
  }
  window.addEventListener("resize", e), e();
}
F();
j();
class O {
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
    console.log(`Initializing ${this.iframes.length} iframes`), this.iframes.forEach((e, o) => {
      e.style.cssText = `
                width: 100%;
                overflow: hidden;
                min-height: 0;
                border: none;
                opacity: 0;
                transition: opacity 0.2s ease-in-out;
            `;
      const n = new Promise((i) => {
        const s = Date.now(), r = async () => {
          console.log(`Setting up iframe ${o}`);
          try {
            await this.setupIframe(e), e.style.opacity = "1", i();
          } catch (d) {
            console.warn(`Error setting up iframe ${o}:`, d), i();
          }
        }, a = () => {
          if (Date.now() - s > this.maxWaitTime) {
            console.warn(`Iframe ${o} timed out waiting for load`), i();
            return;
          }
          const d = e.contentWindow;
          if (!d) {
            setTimeout(a, this.readyStateCheckInterval);
            return;
          }
          try {
            const c = d.document;
            c && c.readyState === "complete" ? r() : c ? e.addEventListener("load", r, { once: !0 }) : setTimeout(a, this.readyStateCheckInterval);
          } catch (c) {
            console.warn(`Error accessing iframe ${o}:`, c), i();
          }
        };
        a(), e.addEventListener("load", () => {
          a();
        }, { once: !0 });
      });
      this.initialLoadPromises.push(n);
    }), Promise.all(this.initialLoadPromises).then(() => new Promise((e) => setTimeout(e, 100))).then(() => (console.log("All iframes initialized, performing final height check"), Promise.all(this.iframes.map((e) => this.adjustHeight(e))))).then(() => {
      console.log("Final height check complete, handling URL fragment and adding js-loaded class"), this.handleUrlFragment(), this.isInitialLoad = !1, document.body.classList.add("js-loaded");
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
    const n = o.document, i = n.createElement("style");
    if (i.textContent = `
            html, body {
                margin: 0;
                padding: 0;
                min-height: 0 !important;
            }
        `, n.head.appendChild(i), await new Promise((s) => {
      const r = () => {
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
        d.length === 0 && c.length === 0 ? s() : setTimeout(r, this.readyStateCheckInterval);
      };
      r();
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
        var r;
        const n = (r = e.contentWindow) == null ? void 0 : r.document;
        if (!n) {
          o();
          return;
        }
        e.style.height = "0px", e.offsetHeight;
        const i = Math.max(
          n.documentElement.scrollHeight,
          n.body.scrollHeight,
          n.documentElement.offsetHeight,
          n.body.offsetHeight,
          n.documentElement.clientHeight,
          n.body.clientHeight
        ), s = this.options.minHeight ? Math.max(i, this.options.minHeight) : i;
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
new O("preview-iframe");
const w = "in2theme", f = {
  normal: "theme-normal",
  light: "theme-light",
  dark: "theme-dark"
}, h = document.querySelector(".theme-select");
if (!h)
  throw new Error("No theme select found");
const k = window.matchMedia("(prefers-color-scheme: dark)");
function y() {
  const t = localStorage.getItem(w);
  return t || localStorage.setItem(w, "normal"), t;
}
function p() {
  const t = y();
  let e = f[t];
  t === "normal" && k.matches && (e = f.dark);
  const o = (s) => {
    Object.values(f).forEach((r) => s.classList.remove(r)), s.classList.remove("dark");
  }, n = (s) => {
    s.classList.add(e), e === f.dark && s.classList.add("dark");
  };
  o(h), n(h);
  const i = document.querySelectorAll("iframe");
  i && i.forEach((s) => {
    o(s), n(s);
  }), o(document.body), n(document.body);
}
k.addEventListener("change", () => {
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
const x = y(), H = h.querySelector(`input[value="${x}"]`);
if (!H)
  throw new Error("No current theme input found");
H.checked = !0;
const u = document.querySelector("#search-dialog");
if (!u)
  throw new Error("No search dialog found");
const T = document.querySelectorAll("[data-open-search]");
if (T.length === 0)
  throw new Error("No open search buttons found");
const m = document.querySelector("#search-input");
if (!m)
  throw new Error("No search input found");
const C = document.querySelector("#search-list");
if (!C)
  throw new Error("No search list found");
const q = document.querySelectorAll(".search-category__item--active");
if (!q)
  throw new Error("No search results found");
const A = document.querySelector("#search-no-results");
if (!A)
  throw new Error("No search no results element found");
function P() {
  const t = m.value.toLowerCase().trim();
  let e = !1;
  q.forEach((o) => {
    var s, r;
    let n = !1;
    const i = ((s = o.getAttribute("data-search-keywords")) == null ? void 0 : s.split(",")) || [];
    if (i.length > 0)
      n = i.some((a) => a.toLowerCase().includes(t));
    else {
      const a = (r = o.innerText) == null ? void 0 : r.toLowerCase();
      n = a == null ? void 0 : a.includes(t);
    }
    o.classList.toggle("search-category__item--active", n), n && (e = !0);
  }), C.classList.toggle("hidden", !e), A.classList.toggle("hidden", e);
}
m.addEventListener("input", P);
T.forEach((t) => {
  t.addEventListener("click", () => u.showModal());
});
function E(t) {
  t.target.closest("dialog") !== null || u.close();
}
new MutationObserver(() => {
  u.open ? (window.matchMedia("(max-width: 768px)").matches && m.blur(), setTimeout(() => {
    document.addEventListener("click", E);
  }, 0)) : (document.removeEventListener("click", E), m.value = "", P());
}).observe(u, { attributes: !0, attributeFilter: ["open"] });
document.addEventListener("keydown", (t) => {
  t.key === "k" && (t.metaKey || t.ctrlKey) && (t.preventDefault(), u.showModal());
});
const L = document.querySelectorAll(".code-highlight");
L.length > 0 && import("./code-CcnfoGUE.js").then(({ default: t }) => t(L)).catch(console.error);
const S = document.querySelector("#icon-search-input"), b = document.querySelector("#icon-search-input-reset"), v = document.querySelector("#icon-search-list");
S && v && b && import("./icons-DKt1vG1z.js").then(({ default: t }) => t(S, v, b)).catch(console.error);
const M = "data-clipboard-value", I = document.querySelectorAll(`button[${M}]`);
I.length > 0 && import("./clipboard-BwiD_T_n.js").then(({ default: t }) => t(I, M)).catch(console.error);
