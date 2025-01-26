async function _(e) {
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
function g(e) {
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
const P = async (e) => {
  await _(e), e.forEach(g), window.addEventListener("resize", () => {
    e.forEach((t) => g(t));
  }), e.forEach((t) => {
    const o = t.contentWindow;
    if (!o)
      return;
    const r = new ResizeObserver(() => g(t));
    r.observe(o.document.documentElement), r.observe(o.document.body);
  }), T();
}, f = "in2theme", u = {
  normal: "theme-normal",
  light: "theme-light",
  dark: "theme-dark"
}, R = (e) => {
  const t = window.matchMedia("(prefers-color-scheme: dark)");
  function o() {
    const n = localStorage.getItem(f);
    return n || localStorage.setItem(f, "normal"), n;
  }
  function r() {
    const n = o();
    let c = u[n];
    n === "normal" && t.matches && (c = u.dark);
    const h = (i) => {
      Object.values(u).forEach((M) => i.classList.remove(M)), i.classList.remove("dark");
    }, m = (i) => {
      i.classList.add(c), c === u.dark && i.classList.add("dark");
    };
    h(e), m(e);
    const E = document.querySelectorAll("iframe");
    E && E.forEach((i) => {
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
    localStorage.setItem(f, c), r();
  });
  const s = o(), l = e.querySelector(`input[value="${s}"]`);
  if (!l)
    throw new Error("No current theme input found");
  l.checked = !0;
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
x();
D();
const a = document.querySelector("#search-dialog");
if (!a)
  throw new Error("No search dialog found");
const y = document.querySelectorAll("[data-open-search]");
if (y.length === 0)
  throw new Error("No open search buttons found");
const d = document.querySelector("#search-input");
if (!d)
  throw new Error("No search input found");
const q = document.querySelector("#search-list");
if (!q)
  throw new Error("No search list found");
const A = document.querySelectorAll(".search-category__item--active");
if (!A)
  throw new Error("No search results found");
const H = document.querySelector("#search-no-results");
if (!H)
  throw new Error("No search no results element found");
function C() {
  const e = d.value.toLowerCase().trim();
  let t = !1;
  A.forEach((o) => {
    var l, n;
    let r = !1;
    const s = ((l = o.getAttribute("data-search-keywords")) == null ? void 0 : l.split(",")) || [];
    if (s.length > 0)
      r = s.some((c) => c.toLowerCase().includes(e));
    else {
      const c = (n = o.innerText) == null ? void 0 : n.toLowerCase();
      r = c == null ? void 0 : c.includes(e);
    }
    o.classList.toggle("search-category__item--active", r), r && (t = !0);
  }), q.classList.toggle("hidden", !t), H.classList.toggle("hidden", t);
}
d.addEventListener("input", C);
y.forEach((e) => {
  e.addEventListener("click", () => a.showModal());
});
function p(e) {
  e.target.closest("dialog") !== null || a.close();
}
new MutationObserver(() => {
  y.forEach(
    (e) => e.ariaExpanded = a.open.toString()
  ), d.ariaExpanded = a.open.toString(), a.open ? setTimeout(() => {
    document.addEventListener("click", p);
  }, 0) : (document.removeEventListener("click", p), d.value = "", C());
}).observe(a, { attributes: !0, attributeFilter: ["open"] });
document.addEventListener("keydown", (e) => {
  e.key === "k" && (e.metaKey || e.ctrlKey) && (e.preventDefault(), a.showModal());
});
const S = Array.from(document.querySelectorAll(".preview-iframe"));
S.length > 0 ? P(S).catch(console.error) : T();
const v = document.querySelector(".theme-select");
v && R(v);
const w = document.querySelectorAll("details:has(.code-highlight)");
w.length > 0 && (w.forEach((e) => {
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
  w.forEach((e) => {
    const t = e.querySelector(".code-highlight");
    if (!t)
      throw new Error("No code element found");
    requestIdleCallback(async () => {
      const { highlightCode: o } = await import("./code-Df72DCne.js");
      await o(t);
    });
  });
}, 5e3));
const L = document.querySelector("#icon-search-input"), b = document.querySelector("#icon-search-input-reset"), k = document.querySelector("#icon-search-list");
L && k && b && import("./icons-DKt1vG1z.js").then(({ default: e }) => e(L, k, b)).catch(console.error);
const N = "data-clipboard-value", I = document.querySelectorAll(`button[${N}]`);
I.length > 0 && import("./clipboard-BwiD_T_n.js").then(({ default: e }) => e(I, N)).catch(console.error);
