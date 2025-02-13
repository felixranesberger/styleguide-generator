const l = (c, n, r) => {
  c.addEventListener("input", () => {
    const o = c.value.toLowerCase();
    n.querySelectorAll("li").forEach((e) => {
      var t;
      const s = (t = e.textContent) == null ? void 0 : t.trim().toLowerCase();
      e.classList.toggle("hidden", !(s != null && s.includes(o)));
    }), r.classList.toggle("hidden", o.length === 0);
  }), r.addEventListener("click", () => {
    c.value = "", c.dispatchEvent(new Event("input")), c.focus();
  }), n.querySelectorAll(".icon-search-list__item").forEach((o) => {
    const i = o.querySelector(".icon-search-list__item-copy");
    if (!i)
      throw new Error("No copy button found");
    const e = o.querySelector("svg:not(.icon-search-list__item-copy-icon), i");
    if (!e)
      throw new Error("No icon found");
    const s = e.outerHTML.replace(/\n/g, "").replace(/\s{2,}/g, " ").trim(), t = o.querySelector(".icon-search-list__item-copy-icon");
    if (!t)
      throw new Error("No copy icon found");
    i.addEventListener("click", () => {
      e.classList.add("opacity-0", "scale-75", "transition", "duration-500", "ease-in-out"), t.classList.add("icon-search-list__item-copy-icon--active"), setTimeout(() => {
        t.classList.remove("icon-search-list__item-copy-icon--active"), setTimeout(() => e.classList.remove("opacity-0", "scale-75"), 350);
      }, 1e3), navigator.clipboard.writeText(s).catch(console.error);
    });
  });
};
export {
  l as default
};
