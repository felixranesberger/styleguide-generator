const n = "data-highlighted";
let i;
async function s(e, o) {
  if (e.getAttribute(n) === "true")
    return;
  if (!i) {
    const { createHighlighterCore: r, createOnigurumaEngine: h } = await import("./index-BI4RaP31.js");
    i = await r({
      themes: [
        import("./aurora-x-BwoVEUWZ.js"),
        import("./github-light-default-D99KPAby.js")
      ],
      langs: [
        import("./html-B50lQ6OF.js")
      ],
      engine: h(import("./wasm-DQxwEHae.js"))
    });
  }
  const l = e.querySelector('[data-type="code"]');
  if (!l)
    throw new Error("No source element found");
  let t = l.innerHTML.trim();
  o && (t = t.replaceAll("{{modifier_class}}", o));
  const a = i.codeToHtml(t, {
    lang: "html",
    themes: {
      light: "github-light-default",
      dark: "aurora-x"
    }
  });
  e.querySelectorAll("pre").forEach((r) => r.remove()), e.insertAdjacentHTML("beforeend", a), e.setAttribute(n, "true");
}
export {
  s as highlightCode
};
