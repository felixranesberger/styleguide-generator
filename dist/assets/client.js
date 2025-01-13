var N = Object.defineProperty;
var M = (t, e, o) => e in t ? N(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[e] = o;
var u = (t, e, o) => M(t, typeof e != "symbol" ? e + "" : e, o);
const w = "in2theme", g = {
  normal: "theme-normal",
  light: "theme-light",
  dark: "theme-dark"
}, R = (t) => {
  const e = window.matchMedia("(prefers-color-scheme: dark)");
  function o() {
    const r = localStorage.getItem(w);
    return r || localStorage.setItem(w, "normal"), r;
  }
  function n() {
    const r = o();
    let i = g[r];
    r === "normal" && e.matches && (i = g.dark);
    const l = (d) => {
      Object.values(g).forEach((A) => d.classList.remove(A)), d.classList.remove("dark");
    }, c = (d) => {
      d.classList.add(i), i === g.dark && d.classList.add("dark");
    };
    l(t), c(t);
    const h = document.querySelectorAll("iframe");
    h && h.forEach((d) => {
      l(d), c(d);
    }), l(document.body), c(document.body);
  }
  e.addEventListener("change", () => {
    o() === "normal" && n();
  }), n(), t.addEventListener("change", () => {
    const r = t.querySelector('input[name="theme"]:checked');
    if (!r)
      throw new Error("No selected theme found");
    const i = r.value;
    localStorage.setItem(w, i), n();
  });
  const s = o(), a = t.querySelector(`input[value="${s}"]`);
  if (!a)
    throw new Error("No current theme input found");
  a.checked = !0;
};
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
class p {
  // 10 seconds maximum wait time
  constructor(e = "preview-iframe", o = { minHeight: null, bufferHeight: 5 }) {
    u(this, "iframes");
    u(this, "options");
    u(this, "initialLoadPromises");
    u(this, "isInitialLoad", !0);
    u(this, "readyStateCheckInterval", 50);
    // ms to check readyState
    u(this, "maxWaitTime", 1e4);
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
        const a = Date.now(), r = async () => {
          try {
            await this.setupIframe(e), e.style.opacity = "1", s();
          } catch (l) {
            console.warn(`Error setting up iframe ${o}:`, l), s();
          }
        }, i = () => {
          if (Date.now() - a > this.maxWaitTime) {
            console.warn(`Iframe ${o} timed out waiting for load`), s();
            return;
          }
          const l = e.contentWindow;
          if (!l) {
            setTimeout(i, this.readyStateCheckInterval);
            return;
          }
          try {
            const c = l.document;
            c && c.readyState === "complete" ? r() : c ? e.addEventListener("load", r, { once: !0 }) : setTimeout(i, this.readyStateCheckInterval);
          } catch (c) {
            console.warn(`Error accessing iframe ${o}:`, c), s();
          }
        };
        i(), e.addEventListener("load", () => {
          i();
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
        `, n.head.appendChild(s), await new Promise((a) => {
      const r = () => {
        const l = Array.from(n.getElementsByTagName("*")).filter(
          (h) => h instanceof HTMLImageElement && !h.complete
        ), c = Array.from(n.styleSheets).filter(
          (h) => {
            try {
              return h.cssRules === null;
            } catch {
              return !0;
            }
          }
        );
        l.length === 0 && c.length === 0 ? a() : setTimeout(r, this.readyStateCheckInterval);
      };
      r();
    }), !this.isInitialLoad) {
      const a = new ResizeObserver(() => {
        this.adjustHeight(e);
      });
      a.observe(n.documentElement), a.observe(n.body), new MutationObserver(() => {
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
        const s = Math.max(
          n.documentElement.scrollHeight,
          n.body.scrollHeight,
          n.documentElement.offsetHeight,
          n.body.offsetHeight,
          n.documentElement.clientHeight,
          n.body.clientHeight
        ), a = this.options.minHeight ? Math.max(s, this.options.minHeight) : s;
        e.style.height = `${a + this.options.bufferHeight}px`, requestAnimationFrame(() => {
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
  new p("preview-iframe");
}) : new p("preview-iframe");
const m = document.querySelector("#search-dialog");
if (!m)
  throw new Error("No search dialog found");
const T = document.querySelectorAll("[data-open-search]");
if (T.length === 0)
  throw new Error("No open search buttons found");
const f = document.querySelector("#search-input");
if (!f)
  throw new Error("No search input found");
const k = document.querySelector("#search-list");
if (!k)
  throw new Error("No search list found");
const H = document.querySelectorAll(".search-category__item--active");
if (!H)
  throw new Error("No search results found");
const C = document.querySelector("#search-no-results");
if (!C)
  throw new Error("No search no results element found");
function q() {
  const t = f.value.toLowerCase().trim();
  let e = !1;
  H.forEach((o) => {
    var a, r;
    let n = !1;
    const s = ((a = o.getAttribute("data-search-keywords")) == null ? void 0 : a.split(",")) || [];
    if (s.length > 0)
      n = s.some((i) => i.toLowerCase().includes(t));
    else {
      const i = (r = o.innerText) == null ? void 0 : r.toLowerCase();
      n = i == null ? void 0 : i.includes(t);
    }
    o.classList.toggle("search-category__item--active", n), n && (e = !0);
  }), k.classList.toggle("hidden", !e), C.classList.toggle("hidden", e);
}
f.addEventListener("input", q);
T.forEach((t) => {
  t.addEventListener("click", () => m.showModal());
});
function E(t) {
  t.target.closest("dialog") !== null || m.close();
}
new MutationObserver(() => {
  m.open ? setTimeout(() => {
    document.addEventListener("click", E);
  }, 0) : (document.removeEventListener("click", E), f.value = "", q());
}).observe(m, { attributes: !0, attributeFilter: ["open"] });
document.addEventListener("keydown", (t) => {
  t.key === "k" && (t.metaKey || t.ctrlKey) && (t.preventDefault(), m.showModal());
});
const L = document.querySelector(".theme-select");
L && R(L);
const y = document.querySelectorAll("details:has(.code-highlight)");
y.length > 0 && (y.forEach((t) => {
  const e = t.querySelector(".code-highlight");
  if (!e)
    throw new Error("No code element found");
  const o = t.querySelector("summary");
  if (!o)
    throw new Error("No trigger button found");
  o.addEventListener("click", async () => {
    const { highlightCode: n } = await import("./code-Df72DCne.js");
    await n(e);
  });
}), setTimeout(() => {
  y.forEach((t) => {
    const e = t.querySelector(".code-highlight");
    if (!e)
      throw new Error("No code element found");
    requestIdleCallback(async () => {
      const { highlightCode: o } = await import("./code-Df72DCne.js");
      await o(e);
    });
  });
}, 5e3));
const S = document.querySelector("#icon-search-input"), v = document.querySelector("#icon-search-input-reset"), b = document.querySelector("#icon-search-list");
S && b && v && import("./icons-DKt1vG1z.js").then(({ default: t }) => t(S, b, v)).catch(console.error);
const P = "data-clipboard-value", I = document.querySelectorAll(`button[${P}]`);
I.length > 0 && import("./clipboard-BwiD_T_n.js").then(({ default: t }) => t(I, P)).catch(console.error);
