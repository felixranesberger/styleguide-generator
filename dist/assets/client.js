async function P(e) {
  const t = (o) => {
    var r;
    return ((r = o.contentWindow) == null ? void 0 : r.document.readyState) === "complete";
  };
  await Promise.allSettled(
    e.map((o) => new Promise((r) => {
      const s = () => setTimeout(r, 100);
      if (t(o)) {
        s();
        return;
      }
      o.addEventListener("load", s, { once: !0 }), setTimeout(r, 5e3);
    }))
  );
}
async function y(e) {
  var r;
  const t = (r = e.contentWindow) == null ? void 0 : r.document;
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
  );
  e.style.height = `${o}px`;
}
function T() {
  document.body.classList.add("js-loaded");
}
const _ = async (e) => {
  await P(e), await Promise.allSettled(e.map((t) => y(t))), window.addEventListener("resize", () => {
    e.forEach((t) => y(t));
  }), T();
}, g = "in2theme", d = {
  normal: "theme-normal",
  light: "theme-light",
  dark: "theme-dark"
}, D = (e) => {
  const t = window.matchMedia("(prefers-color-scheme: dark)");
  function o() {
    const n = localStorage.getItem(g);
    return n || localStorage.setItem(g, "normal"), n;
  }
  function r() {
    const n = o();
    let c = d[n];
    n === "normal" && t.matches && (c = d.dark);
    const h = (i) => {
      Object.values(d).forEach((M) => i.classList.remove(M)), i.classList.remove("dark");
    }, m = (i) => {
      i.classList.add(c), c === d.dark && i.classList.add("dark");
    };
    h(e), m(e);
    const w = document.querySelectorAll("iframe");
    w && w.forEach((i) => {
      h(i), m(i);
    }), h(document.body), m(document.body);
  }
  t.addEventListener("change", () => {
    o() === "normal" && r();
  }), r(), e.addEventListener("change", () => {
    const n = e.querySelector('input[name="theme"]:checked');
    if (!n)
      throw new Error("No selected theme found");
    const c = n.value;
    localStorage.setItem(g, c), r();
  });
  const s = o(), a = e.querySelector(`input[value="${s}"]`);
  if (!a)
    throw new Error("No current theme input found");
  a.checked = !0;
};
function R() {
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
      const r = Number.parseFloat(o), s = (e.scrollHeight - e.clientHeight) * r / 100;
      e.scrollTop = s;
    }
  }
  window.addEventListener("resize", t), t();
}
R();
O();
const l = document.querySelector("#search-dialog");
if (!l)
  throw new Error("No search dialog found");
const q = document.querySelectorAll("[data-open-search]");
if (q.length === 0)
  throw new Error("No open search buttons found");
const u = document.querySelector("#search-input");
if (!u)
  throw new Error("No search input found");
const b = document.querySelector("#search-list");
if (!b)
  throw new Error("No search list found");
const A = document.querySelectorAll(".search-category__item--active");
if (!A)
  throw new Error("No search results found");
const H = document.querySelector("#search-no-results");
if (!H)
  throw new Error("No search no results element found");
function C() {
  const e = u.value.toLowerCase().trim();
  let t = !1;
  A.forEach((o) => {
    var a, n;
    let r = !1;
    const s = ((a = o.getAttribute("data-search-keywords")) == null ? void 0 : a.split(",")) || [];
    if (s.length > 0)
      r = s.some((c) => c.toLowerCase().includes(e));
    else {
      const c = (n = o.innerText) == null ? void 0 : n.toLowerCase();
      r = c == null ? void 0 : c.includes(e);
    }
    o.classList.toggle("search-category__item--active", r), r && (t = !0);
  }), b.classList.toggle("hidden", !t), H.classList.toggle("hidden", t);
}
u.addEventListener("input", C);
q.forEach((e) => {
  e.addEventListener("click", () => l.showModal());
});
function E(e) {
  e.target.closest("dialog") !== null || l.close();
}
new MutationObserver(() => {
  l.open ? setTimeout(() => {
    document.addEventListener("click", E);
  }, 0) : (document.removeEventListener("click", E), u.value = "", C());
}).observe(l, { attributes: !0, attributeFilter: ["open"] });
document.addEventListener("keydown", (e) => {
  e.key === "k" && (e.metaKey || e.ctrlKey) && (e.preventDefault(), l.showModal());
});
const p = Array.from(document.querySelectorAll(".preview-iframe"));
p.length > 0 ? _(p).catch(console.error) : T();
const S = document.querySelector(".theme-select");
S && D(S);
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
const L = document.querySelector("#icon-search-input"), v = document.querySelector("#icon-search-input-reset"), k = document.querySelector("#icon-search-list");
L && k && v && import("./icons-DKt1vG1z.js").then(({ default: e }) => e(L, k, v)).catch(console.error);
const N = "data-clipboard-value", I = document.querySelectorAll(`button[${N}]`);
I.length > 0 && import("./clipboard-BwiD_T_n.js").then(({ default: e }) => e(I, N)).catch(console.error);
