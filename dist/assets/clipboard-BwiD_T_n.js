const c = (i, a) => {
  i.forEach((e) => {
    const t = e.getAttribute(a);
    t && e.addEventListener("click", async () => {
      await navigator.clipboard.writeText(t).catch(console.error);
      const r = e.textContent;
      e.style.width = `${e.offsetWidth <= 80 ? 80 : e.offsetWidth}px`, e.textContent = "Copied!", setTimeout(() => {
        e.style.width = "", e.textContent = r;
      }, 1500);
    });
  });
};
export {
  c as default
};
