async function C(e) {
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
async function E(e) {
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
function H() {
  document.body.classList.add("js-loaded");
}
const R = async (e) => {
  await C(e), await Promise.allSettled(Array.from(e).map((o) => E(o)));
  const t = new ResizeObserver(
    (o) => o.forEach((r) => E(r.target))
  );
  e.forEach((o) => t.observe(o)), H();
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
      Object.values(d).forEach((N) => i.classList.remove(N)), i.classList.remove("dark");
    }, m = (i) => {
      i.classList.add(s), s === d.dark && i.classList.add("dark");
    };
    u(e), m(e);
    const w = document.querySelectorAll("iframe");
    w && w.forEach((i) => {
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
const k = document.querySelectorAll("[data-open-search]");
if (k.length === 0)
  throw new Error("No open search buttons found");
const h = document.querySelector("#search-input");
if (!h)
  throw new Error("No search input found");
const b = document.querySelector("#search-list");
if (!b)
  throw new Error("No search list found");
const A = document.querySelectorAll(".search-category__item--active");
if (!A)
  throw new Error("No search results found");
const q = document.querySelector("#search-no-results");
if (!q)
  throw new Error("No search no results element found");
function M() {
  const e = h.value.toLowerCase().trim();
  let t = !1;
  A.forEach((o) => {
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
  }), b.classList.toggle("hidden", !t), q.classList.toggle("hidden", t);
}
h.addEventListener("input", M);
k.forEach((e) => {
  e.addEventListener("click", () => l.showModal());
});
function y(e) {
  e.target.closest("dialog") !== null || l.close();
}
new MutationObserver(() => {
  l.open ? setTimeout(() => {
    document.addEventListener("click", y);
  }, 0) : (document.removeEventListener("click", y), h.value = "", M());
}).observe(l, { attributes: !0, attributeFilter: ["open"] });
document.addEventListener("keydown", (e) => {
  e.key === "k" && (e.metaKey || e.ctrlKey) && (e.preventDefault(), l.showModal());
});
const p = document.querySelectorAll(".preview-iframe");
p.length > 0 ? R(p).catch(console.error) : H();
const S = document.querySelector(".theme-select");
S && F(S);
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
const I = document.querySelector("#icon-search-input"), L = document.querySelector("#icon-search-input-reset"), v = document.querySelector("#icon-search-list");
I && v && L && import("./icons-DKt1vG1z.js").then(({ default: e }) => e(I, v, L)).catch(console.error);
const _ = "data-clipboard-value", T = document.querySelectorAll(`button[${_}]`);
T.length > 0 && import("./clipboard-BwiD_T_n.js").then(({ default: e }) => e(T, _)).catch(console.error);
