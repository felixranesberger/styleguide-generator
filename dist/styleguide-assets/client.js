async function _(e) {
  const t = (r) => {
    var n;
    const o = (n = r.contentWindow) == null ? void 0 : n.document;
    if (!o)
      return !1;
    const c = o.body && o.body.children.length > 0, i = o.readyState === "complete";
    return c && i && o.body.children.length > 0;
  };
  await Promise.allSettled(
    e.map((r) => new Promise((o) => {
      const c = setInterval(() => {
        if (t(r))
          return clearInterval(c), o();
      }, 100);
      setTimeout(() => (clearInterval(c), o()), 5e3);
    }))
  );
}
function g(e) {
  var o;
  const t = (o = e.contentWindow) == null ? void 0 : o.document;
  if (!t)
    throw new Error("iFrame was not fully loaded yet");
  e.style.height = "0px", e.offsetHeight;
  const r = Math.max(
    t.documentElement.scrollHeight,
    t.body.scrollHeight,
    t.documentElement.offsetHeight,
    t.body.offsetHeight,
    t.documentElement.clientHeight,
    t.body.clientHeight
  );
  e.style.height = `${r}px`;
}
function q() {
  document.body.classList.add("js-loaded");
}
const P = async (e) => {
  await _(e), e.forEach(g), window.addEventListener("resize", () => {
    e.forEach((t) => g(t));
  }), e.forEach((t) => {
    const r = t.contentWindow;
    if (!r)
      return;
    const o = new ResizeObserver(() => g(t));
    o.observe(r.document.documentElement), o.observe(r.document.body);
  }), q();
}, f = "in2theme", h = {
  normal: "theme-normal",
  light: "theme-light",
  dark: "theme-dark"
}, R = (e) => {
  const t = window.matchMedia("(prefers-color-scheme: dark)");
  function r() {
    const n = localStorage.getItem(f);
    return n || localStorage.setItem(f, "normal"), n;
  }
  function o() {
    const n = r();
    let s = h[n];
    n === "normal" && t.matches && (s = h.dark);
    const u = (a) => {
      Object.values(h).forEach((M) => a.classList.remove(M)), a.classList.remove("dark");
    }, m = (a) => {
      a.classList.add(s), s === h.dark && a.classList.add("dark");
    };
    u(e), m(e);
    const E = document.querySelectorAll("iframe");
    E && E.forEach((a) => {
      u(a), m(a);
    }), u(document.body), m(document.body);
  }
  t.addEventListener("change", () => {
    r() === "normal" && o();
  }), o(), e.addEventListener("change", () => {
    const n = e.querySelector('input[name="theme"]:checked');
    if (!n)
      throw new Error("No selected theme found");
    const s = n.value;
    localStorage.setItem(f, s), o();
  });
  const c = r(), i = e.querySelector(`input[value="${c}"]`);
  if (!i)
    throw new Error("No current theme input found");
  i.checked = !0;
};
function x() {
  const e = document.querySelector("header");
  if (!e)
    throw new Error("No header found");
  const t = () => e.getBoundingClientRect().height;
  document.documentElement.style.setProperty("--header-height", `${t()}px`), window.addEventListener("resize", () => {
    document.documentElement.style.setProperty("--header-height", `${t()}px`);
  });
}
function D() {
  const e = document.querySelector("aside");
  if (!e)
    throw new Error("No aside menu found");
  e.addEventListener("scroll", () => {
    const r = e.scrollTop / (e.scrollHeight - e.clientHeight) * 100;
    sessionStorage.setItem("asideScrollPercentage", r.toString());
  });
  function t() {
    const r = sessionStorage.getItem("asideScrollPercentage");
    if (r) {
      const o = Number.parseFloat(r), c = (e.scrollHeight - e.clientHeight) * o / 100;
      e.scrollTop = c;
    }
  }
  window.addEventListener("resize", t), t();
}
x();
D();
const l = document.querySelector("#search-dialog");
if (!l)
  throw new Error("No search dialog found");
const y = document.querySelectorAll("[data-open-search]");
if (y.length === 0)
  throw new Error("No open search buttons found");
const d = document.querySelector("#search-input");
if (!d)
  throw new Error("No search input found");
const T = document.querySelector("#search-list");
if (!T)
  throw new Error("No search list found");
const H = document.querySelectorAll(".search-category__item--active");
if (!H)
  throw new Error("No search results found");
const C = document.querySelector("#search-no-results");
if (!C)
  throw new Error("No search no results element found");
function A() {
  const e = d.value.toLowerCase().trim();
  let t = !1;
  H.forEach((r) => {
    var i, n;
    let o = !1;
    const c = ((i = r.getAttribute("data-search-keywords")) == null ? void 0 : i.split(",")) || [];
    if (c.length > 0)
      o = c.some((s) => s.toLowerCase().includes(e));
    else {
      const s = (n = r.innerText) == null ? void 0 : n.toLowerCase();
      o = s == null ? void 0 : s.includes(e);
    }
    r.classList.toggle("search-category__item--active", o), o && (t = !0);
  }), T.classList.toggle("hidden", !t), C.classList.toggle("hidden", t);
}
d.addEventListener("input", A);
y.forEach((e) => {
  e.addEventListener("click", () => l.showModal());
});
function p(e) {
  e.target.closest("dialog") !== null || l.close();
}
new MutationObserver(() => {
  y.forEach(
    (e) => e.ariaExpanded = l.open.toString()
  ), d.ariaExpanded = l.open.toString(), l.open ? setTimeout(() => {
    document.addEventListener("click", p);
  }, 0) : (document.removeEventListener("click", p), d.value = "", A());
}).observe(l, { attributes: !0, attributeFilter: ["open"] });
document.addEventListener("keydown", (e) => {
  e.key === "k" && (e.metaKey || e.ctrlKey) && (e.preventDefault(), l.showModal());
});
const S = Array.from(document.querySelectorAll(".preview-iframe"));
S.length > 0 ? P(S).catch(console.error) : q();
const v = document.querySelector(".theme-select");
v && R(v);
const w = document.querySelectorAll("details:has(.code-highlight)");
w.length > 0 && (w.forEach((e) => {
  const t = e.querySelector(".code-highlight");
  if (!t)
    throw new Error("No code element found");
  const r = e.querySelector("summary");
  if (!r)
    throw new Error("No trigger button found");
  r.addEventListener("click", async () => {
    const { createShikiHighlighter: o, highlightCode: c } = await import("./code-BL-eL8V0.js");
    await o(), await c(t);
  });
}), setTimeout(() => {
  requestIdleCallback(async () => {
    const { createShikiHighlighter: e, highlightCode: t } = await import("./code-BL-eL8V0.js");
    await e(), w.forEach((r) => {
      const o = r.querySelector(".code-highlight");
      if (!o)
        throw new Error("No code element found");
      t(o).catch(console.error);
    });
  });
}, 5e3));
const L = document.querySelector("#icon-search-input"), b = document.querySelector("#icon-search-input-reset"), I = document.querySelector("#icon-search-list");
L && I && b && import("./icons-DWBVzKp_.js").then(({ default: e }) => e(L, I, b)).catch(console.error);
const N = "data-clipboard-value", k = document.querySelectorAll(`button[${N}]`);
k.length > 0 && import("./clipboard-BwiD_T_n.js").then(({ default: e }) => e(k, N)).catch(console.error);
