import { a as r, s as l } from "./main-BqeAqYyg.js";
const p = (c, s, a) => {
  c.addEventListener("input", () => {
    const e = c.value.toLowerCase();
    s.querySelectorAll("li").forEach((o) => {
      var t;
      const n = (t = o.textContent) == null ? void 0 : t.trim().toLowerCase();
      o.classList.toggle("hidden", !(n != null && n.includes(e)));
    }), a.classList.toggle("hidden", e.length === 0);
  }), a.addEventListener("click", () => {
    c.value = "", c.dispatchEvent(new Event("input")), c.focus();
  }), s.querySelectorAll(".icon-search-list__item").forEach((e) => {
    const i = e.querySelector(".icon-search-list__item-copy");
    if (!i)
      throw new Error("No copy button found");
    const o = e.querySelector("svg:not(.icon-search-list__item-copy-icon), i");
    if (!o)
      throw new Error("No icon found");
    const n = o.outerHTML.replace(/\n/g, "").replace(/\s{2,}/g, " ").trim(), t = e.querySelector(".icon-search-list__item-copy-icon");
    if (!t)
      throw new Error("No copy icon found");
    i.addEventListener("click", async () => {
      await navigator.clipboard.writeText(n).catch(console.error), r(o, { scale: [1, 0.5], opacity: [1, 0] }, { duration: 0.3 }), r(
        t,
        { scale: [0, 1], opacity: [0, 1] },
        { duration: 0.5, delay: 0.2, type: l, bounce: 0.4 }
      ), await new Promise((d) => setTimeout(d, 800)), r(t, { scale: [1, 0.5], opacity: [1, 0] }, { duration: 0.3 }), r(
        o,
        { scale: [0, 1], opacity: [0, 1] },
        { duration: 1, delay: 0.1, type: l, bounce: 0.2 }
      );
    });
  });
};
export {
  p as default
};
