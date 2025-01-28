async function _(e) {
  const t = (o) => {
    var c;
    const r = (c = o.contentWindow) == null ? void 0 : c.document;
    if (!r)
      return !1;
    const s = r.body && r.body.children.length > 0, i = r.readyState === "complete", n = r.documentElement.offsetHeight > 0;
    return s && i && n;
  };
  await Promise.allSettled(
    e.map((o) => new Promise((r) => {
      const s = setInterval(() => {
        if (t(o))
          return clearInterval(s), r();
      }, 100);
      setTimeout(() => (clearInterval(s), r()), 5e3);
    }))
  );
}
function f(e) {
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
function q() {
  document.body.classList.add("js-loaded");
}
const P = async (e) => {
  await _(e), e.forEach(f), window.addEventListener("resize", () => {
    e.forEach((t) => f(t));
  }), e.forEach((t) => {
    const o = t.contentWindow;
    if (!o)
      return;
    const r = new ResizeObserver(() => f(t));
    r.observe(o.document.documentElement), r.observe(o.document.body);
  }), q();
}, g = "in2theme", h = {
  normal: "theme-normal",
  light: "theme-light",
  dark: "theme-dark"
}, R = (e) => {
  const t = window.matchMedia("(prefers-color-scheme: dark)");
  function o() {
    const n = localStorage.getItem(g);
    return n || localStorage.setItem(g, "normal"), n;
  }
  function r() {
    const n = o();
    let c = h[n];
    n === "normal" && t.matches && (c = h.dark);
    const u = (a) => {
      Object.values(h).forEach((M) => a.classList.remove(M)), a.classList.remove("dark");
    }, m = (a) => {
      a.classList.add(c), c === h.dark && a.classList.add("dark");
    };
    u(e), m(e);
    const E = document.querySelectorAll("iframe");
    E && E.forEach((a) => {
      u(a), m(a);
    }), u(document.body), m(document.body);
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
  const s = o(), i = e.querySelector(`input[value="${s}"]`);
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
  H.forEach((o) => {
    var i, n;
    let r = !1;
    const s = ((i = o.getAttribute("data-search-keywords")) == null ? void 0 : i.split(",")) || [];
    if (s.length > 0)
      r = s.some((c) => c.toLowerCase().includes(e));
    else {
      const c = (n = o.innerText) == null ? void 0 : n.toLowerCase();
      r = c == null ? void 0 : c.includes(e);
    }
    o.classList.toggle("search-category__item--active", r), r && (t = !0);
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
  const o = e.querySelector("summary");
  if (!o)
    throw new Error("No trigger button found");
  o.addEventListener("click", async () => {
    const { highlightCode: r } = await import("./code-C62xnK8Y.js");
    await r(t);
  });
}), setTimeout(() => {
  w.forEach((e) => {
    const t = e.querySelector(".code-highlight");
    if (!t)
      throw new Error("No code element found");
    requestIdleCallback(async () => {
      const { highlightCode: o } = await import("./code-C62xnK8Y.js");
      await o(t);
    });
  });
}, 5e3));
const L = document.querySelector("#icon-search-input"), b = document.querySelector("#icon-search-input-reset"), I = document.querySelector("#icon-search-list");
L && I && b && import("./icons-DKt1vG1z.js").then(({ default: e }) => e(L, I, b)).catch(console.error);
const N = "data-clipboard-value", k = document.querySelectorAll(`button[${N}]`);
k.length > 0 && import("./clipboard-BwiD_T_n.js").then(({ default: e }) => e(k, N)).catch(console.error);
