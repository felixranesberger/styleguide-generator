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
function D() {
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
      const n = Number.parseFloat(o), s = (t.scrollHeight - t.clientHeight) * n / 100;
      t.scrollTop = s;
    }
  }
  window.addEventListener("resize", e), e();
}
O();
D();
class L {
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
      const n = new Promise((s) => {
        const r = Date.now(), i = async () => {
          try {
            await this.setupIframe(e), e.style.opacity = "1", s();
          } catch (d) {
            console.warn(`Error setting up iframe ${o}:`, d), s();
          }
        }, a = () => {
          if (Date.now() - r > this.maxWaitTime) {
            console.warn(`Iframe ${o} timed out waiting for load`), s();
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
            console.warn(`Error accessing iframe ${o}:`, c), s();
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
    const n = o.document, s = n.createElement("style");
    if (s.textContent = `
            html, body {
                margin: 0;
                padding: 0;
                min-height: 0 !important;
            }
        `, n.head.appendChild(s), await new Promise((r) => {
      const i = () => {
        const d = Array.from(n.getElementsByTagName("*")).filter(
          (m) => m instanceof HTMLImageElement && !m.complete
        ), c = Array.from(n.styleSheets).filter(
          (m) => {
            try {
              return m.cssRules === null;
            } catch {
              return !0;
            }
          }
        );
        d.length === 0 && c.length === 0 ? r() : setTimeout(i, this.readyStateCheckInterval);
      };
      i();
    }), !this.isInitialLoad) {
      const r = new ResizeObserver(() => {
        this.adjustHeight(e);
      });
      r.observe(n.documentElement), r.observe(n.body), new MutationObserver(() => {
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
        const s = Math.max(
          n.documentElement.scrollHeight,
          n.body.scrollHeight,
          n.documentElement.offsetHeight,
          n.body.offsetHeight,
          n.documentElement.clientHeight,
          n.body.clientHeight
        ), r = this.options.minHeight ? Math.max(s, this.options.minHeight) : s;
        e.style.height = `${r + this.options.bufferHeight}px`, requestAnimationFrame(() => {
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
  new L("preview-iframe");
}) : new L("preview-iframe");
const y = "in2theme", g = {
  normal: "theme-normal",
  light: "theme-light",
  dark: "theme-dark"
}, h = document.querySelector(".theme-select");
if (!h)
  throw new Error("No theme select found");
const k = window.matchMedia("(prefers-color-scheme: dark)");
function p() {
  const t = localStorage.getItem(y);
  return t || localStorage.setItem(y, "normal"), t;
}
function E() {
  const t = p();
  let e = g[t];
  t === "normal" && k.matches && (e = g.dark);
  const o = (r) => {
    Object.values(g).forEach((i) => r.classList.remove(i)), r.classList.remove("dark");
  }, n = (r) => {
    r.classList.add(e), e === g.dark && r.classList.add("dark");
  };
  o(h), n(h);
  const s = document.querySelectorAll("iframe");
  s && s.forEach((r) => {
    o(r), n(r);
  }), o(document.body), n(document.body);
}
k.addEventListener("change", () => {
  p() === "normal" && E();
});
E();
h.addEventListener("change", () => {
  const t = h.querySelector('input[name="theme"]:checked');
  if (!t)
    throw new Error("No selected theme found");
  const e = t.value;
  localStorage.setItem(y, e), E();
});
const j = p(), H = h.querySelector(`input[value="${j}"]`);
if (!H)
  throw new Error("No current theme input found");
H.checked = !0;
const u = document.querySelector("#search-dialog");
if (!u)
  throw new Error("No search dialog found");
const C = document.querySelectorAll("[data-open-search]");
if (C.length === 0)
  throw new Error("No open search buttons found");
const f = document.querySelector("#search-input");
if (!f)
  throw new Error("No search input found");
const q = document.querySelector("#search-list");
if (!q)
  throw new Error("No search list found");
const N = document.querySelectorAll(".search-category__item--active");
if (!N)
  throw new Error("No search results found");
const P = document.querySelector("#search-no-results");
if (!P)
  throw new Error("No search no results element found");
function A() {
  const t = f.value.toLowerCase().trim();
  let e = !1;
  N.forEach((o) => {
    var r, i;
    let n = !1;
    const s = ((r = o.getAttribute("data-search-keywords")) == null ? void 0 : r.split(",")) || [];
    if (s.length > 0)
      n = s.some((a) => a.toLowerCase().includes(t));
    else {
      const a = (i = o.innerText) == null ? void 0 : i.toLowerCase();
      n = a == null ? void 0 : a.includes(t);
    }
    o.classList.toggle("search-category__item--active", n), n && (e = !0);
  }), q.classList.toggle("hidden", !e), P.classList.toggle("hidden", e);
}
f.addEventListener("input", A);
C.forEach((t) => {
  t.addEventListener("click", () => u.showModal());
});
function S(t) {
  t.target.closest("dialog") !== null || u.close();
}
new MutationObserver(() => {
  u.open ? setTimeout(() => {
    document.addEventListener("click", S);
  }, 0) : (document.removeEventListener("click", S), f.value = "", A());
}).observe(u, { attributes: !0, attributeFilter: ["open"] });
document.addEventListener("keydown", (t) => {
  t.key === "k" && (t.metaKey || t.ctrlKey) && (t.preventDefault(), u.showModal());
});
const w = document.querySelectorAll("details:has(.code-highlight)");
w.length > 0 && (w.forEach((t) => {
  const e = t.querySelector(".code-highlight");
  if (!e)
    throw new Error("No code element found");
  const o = t.querySelector("summary");
  if (!o)
    throw new Error("No trigger button found");
  o.addEventListener("click", async () => {
    const { highlightCode: n } = await import("./code-BWmfpHtp.js");
    await n(e);
  });
}), setTimeout(() => {
  w.forEach((t) => {
    const e = t.querySelector(".code-highlight");
    if (!e)
      throw new Error("No code element found");
    requestIdleCallback(async () => {
      const { highlightCode: o } = await import("./code-BWmfpHtp.js");
      await o(e);
    });
  });
}, 5e3));
const v = document.querySelector("#icon-search-input"), b = document.querySelector("#icon-search-input-reset"), I = document.querySelector("#icon-search-list");
v && I && b && import("./icons-DKt1vG1z.js").then(({ default: t }) => t(v, I, b)).catch(console.error);
const M = "data-clipboard-value", T = document.querySelectorAll(`button[${M}]`);
T.length > 0 && import("./clipboard-BwiD_T_n.js").then(({ default: t }) => t(T, M)).catch(console.error);
