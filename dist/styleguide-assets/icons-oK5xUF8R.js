import { a as r, s as l } from "./main-B97JcbYk.js";
const p = (c, s, a) => {
  c.addEventListener("input", () => {
    const o = c.value.toLowerCase();
    s.querySelectorAll("li").forEach((e) => {
      var t;
      const n = (t = e.textContent) == null ? void 0 : t.trim().toLowerCase();
      e.classList.toggle("hidden", !(n != null && n.includes(o)));
    }), a.classList.toggle("hidden", o.length === 0);
  }), a.addEventListener("click", () => {
    c.value = "", c.dispatchEvent(new Event("input")), c.focus();
  }), s.querySelectorAll(".icon-search-list__item").forEach((o) => {
    const i = o.querySelector(".icon-search-list__item-copy");
    if (!i)
      throw new Error("No copy button found");
    const e = o.querySelector("svg:not(.icon-search-list__item-copy-icon), i");
    if (!e)
      throw new Error("No icon found");
    const n = e.outerHTML.replace(/\n/g, "").replace(/\s{2,}/g, " ").trim(), t = o.querySelector(".icon-search-list__item-copy-icon");
    if (!t)
      throw new Error("No copy icon found");
    i.addEventListener("click", async () => {
      i.setAttribute("disabled", ""), await navigator.clipboard.writeText(n).catch(console.error), r(e, { scale: [1, 0.5], opacity: [1, 0] }, { duration: 0.3 }), r(
        t,
        { scale: [0, 1], opacity: [0, 1] },
        { duration: 0.5, delay: 0.2, type: l, bounce: 0.4 }
      ), await new Promise((d) => setTimeout(d, 800)), r(t, { scale: [1, 0.5], opacity: [1, 0] }, { duration: 0.3 }), r(
        e,
        { scale: [0, 1], opacity: [0, 1] },
        { duration: 1, delay: 0.1, type: l, bounce: 0.2 }
      ), i.removeAttribute("disabled");
    });
  });
};
export {
  p as default
};
