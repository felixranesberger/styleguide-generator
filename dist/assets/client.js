async function N(e) {
  const t = (o) => {
    var r;
    return ((r = o.contentWindow) == null ? void 0 : r.document.readyState) === "complete";
  };
  await Promise.allSettled(
    Array.from(e).map((o) => new Promise((r) => {
      const n = () => setTimeout(r, 100);
      if (t(o)) {
        n();
        return;
      }
      o.addEventListener("load", n, { once: !0 }), setTimeout(r, 5e3);
    }))
  );
}
async function C(e) {
  var n;
  const t = (n = e.contentWindow) == null ? void 0 : n.document;
  if (!t)
    throw new Error("iFrame was not fully loaded yet");
  e.style.height = "0px", e.offsetHeight;
  const o = Math.max(
    t.documentElement.scrollHeight,
    t.body.scrollHeight,
    t.documentElement.offsetHeight,
    t.body.offsetHeight,
    t.documentElement.clientHeight,
    t.body.clientHeight
  ), r = Math.max(o, 10);
  e.style.height = `${r + 5}px`;
}
function T() {
  document.body.classList.add("js-loaded");
}
const R = async (e) => {
  await N(e);
  const t = new ResizeObserver(
    (o) => o.forEach((r) => C(r.target))
  );
  e.forEach((o) => t.observe(o)), T();
}, g = "in2theme", d = {
  normal: "theme-normal",
  light: "theme-light",
  dark: "theme-dark"
}, F = (e) => {
  const t = window.matchMedia("(prefers-color-scheme: dark)");
  function o() {
    const c = localStorage.getItem(g);
    return c || localStorage.setItem(g, "normal"), c;
  }
  function r() {
    const c = o();
    let s = d[c];
    c === "normal" && t.matches && (s = d.dark);
    const u = (i) => {
      Object.values(d).forEach((_) => i.classList.remove(_)), i.classList.remove("dark");
    }, m = (i) => {
      i.classList.add(s), s === d.dark && i.classList.add("dark");
    };
    u(e), m(e);
    const E = document.querySelectorAll("iframe");
    E && E.forEach((i) => {
      u(i), m(i);
    }), u(document.body), m(document.body);
  }
  t.addEventListener("change", () => {
    o() === "normal" && r();
  }), r(), e.addEventListener("change", () => {
    const c = e.querySelector('input[name="theme"]:checked');
    if (!c)
      throw new Error("No selected theme found");
    const s = c.value;
    localStorage.setItem(g, s), r();
  });
  const n = o(), a = e.querySelector(`input[value="${n}"]`);
  if (!a)
    throw new Error("No current theme input found");
  a.checked = !0;
};
function P() {
  const e = document.querySelector("header");
  if (!e)
    throw new Error("No header found");
  const t = () => e.getBoundingClientRect().height;
  document.documentElement.style.setProperty("--header-height", `${t()}px`), window.addEventListener("resize", () => {
    document.documentElement.style.setProperty("--header-height", `${t()}px`);
  });
}
function O() {
  const e = document.querySelector("aside");
  if (!e)
    throw new Error("No aside menu found");
  e.addEventListener("scroll", () => {
    const o = e.scrollTop / (e.scrollHeight - e.clientHeight) * 100;
    sessionStorage.setItem("asideScrollPercentage", o.toString());
  });
  function t() {
    const o = sessionStorage.getItem("asideScrollPercentage");
    if (o) {
      const r = Number.parseFloat(o), n = (e.scrollHeight - e.clientHeight) * r / 100;
      e.scrollTop = n;
    }
  }
  window.addEventListener("resize", t), t();
}
P();
O();
const l = document.querySelector("#search-dialog");
if (!l)
  throw new Error("No search dialog found");
const H = document.querySelectorAll("[data-open-search]");
if (H.length === 0)
  throw new Error("No open search buttons found");
const h = document.querySelector("#search-input");
if (!h)
  throw new Error("No search input found");
const k = document.querySelector("#search-list");
if (!k)
  throw new Error("No search list found");
const b = document.querySelectorAll(".search-category__item--active");
if (!b)
  throw new Error("No search results found");
const q = document.querySelector("#search-no-results");
if (!q)
  throw new Error("No search no results element found");
function A() {
  const e = h.value.toLowerCase().trim();
  let t = !1;
  b.forEach((o) => {
    var a, c;
    let r = !1;
    const n = ((a = o.getAttribute("data-search-keywords")) == null ? void 0 : a.split(",")) || [];
    if (n.length > 0)
      r = n.some((s) => s.toLowerCase().includes(e));
    else {
      const s = (c = o.innerText) == null ? void 0 : c.toLowerCase();
      r = s == null ? void 0 : s.includes(e);
    }
    o.classList.toggle("search-category__item--active", r), r && (t = !0);
  }), k.classList.toggle("hidden", !t), q.classList.toggle("hidden", t);
}
h.addEventListener("input", A);
H.forEach((e) => {
  e.addEventListener("click", () => l.showModal());
});
function w(e) {
  e.target.closest("dialog") !== null || l.close();
}
new MutationObserver(() => {
  l.open ? setTimeout(() => {
    document.addEventListener("click", w);
  }, 0) : (document.removeEventListener("click", w), h.value = "", A());
}).observe(l, { attributes: !0, attributeFilter: ["open"] });
document.addEventListener("keydown", (e) => {
  e.key === "k" && (e.metaKey || e.ctrlKey) && (e.preventDefault(), l.showModal());
});
const y = document.querySelectorAll(".preview-iframe");
y.length > 0 ? R(y).catch(console.error) : T();
const p = document.querySelector(".theme-select");
p && F(p);
const f = document.querySelectorAll("details:has(.code-highlight)");
f.length > 0 && (f.forEach((e) => {
  const t = e.querySelector(".code-highlight");
  if (!t)
    throw new Error("No code element found");
  const o = e.querySelector("summary");
  if (!o)
    throw new Error("No trigger button found");
  o.addEventListener("click", async () => {
    const { highlightCode: r } = await import("./code-Df72DCne.js");
    await r(t);
  });
}), setTimeout(() => {
  f.forEach((e) => {
    const t = e.querySelector(".code-highlight");
    if (!t)
      throw new Error("No code element found");
    requestIdleCallback(async () => {
      const { highlightCode: o } = await import("./code-Df72DCne.js");
      await o(t);
    });
  });
}, 5e3));
const S = document.querySelector("#icon-search-input"), I = document.querySelector("#icon-search-input-reset"), L = document.querySelector("#icon-search-list");
S && L && I && import("./icons-DKt1vG1z.js").then(({ default: e }) => e(S, L, I)).catch(console.error);
const M = "data-clipboard-value", v = document.querySelectorAll(`button[${M}]`);
v.length > 0 && import("./clipboard-BwiD_T_n.js").then(({ default: e }) => e(v, M)).catch(console.error);
