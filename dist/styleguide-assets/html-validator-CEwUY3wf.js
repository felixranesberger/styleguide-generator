const u = {
  header: [
    "background: #ff5757",
    "color: white",
    "padding: 8px 12px",
    "border-radius: 4px 4px 0 0",
    "font-weight: bold",
    "font-size: 14px"
  ].join(";"),
  elementStyle: [
    "color: #d32f2f",
    "font-weight: bold",
    "font-family: monospace"
  ].join(";"),
  messageStyle: [
    "color: #333",
    "font-style: italic"
  ].join(";")
};
let i;
function y(o, r) {
  console.group("%cValidation Error", u.header), console.info(
    "%c%o",
    u.elementStyle,
    r
  ), console.info(
    "%c%s",
    u.messageStyle,
    o
  ), console.groupEnd();
}
async function v() {
  const { HtmlValidate: o, StaticConfigLoader: r } = await import("./browser-ChRpqXa8.js");
  if (i)
    return i;
  const s = new r();
  return i = new o(s), i;
}
function b(o) {
  return o.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
async function S(o, r) {
  var m;
  const s = o.getAttribute("data-code-audit-iframe");
  if (!s)
    throw new Error("No code audit template selector provided");
  const c = document.querySelector(`#${s}`);
  if (!c)
    throw new Error("Code audit template not found");
  const w = await v(), p = (m = c.contentDocument) == null ? void 0 : m.documentElement.outerHTML;
  if (!p)
    throw new Error("No HTML content found in code audit template");
  const d = r.querySelector(".audit-results");
  if (!d)
    throw new Error("No audit results list found");
  const { results: f, valid: g } = await w.validateString(p, {
    rules: {
      "no-trailing-whitespace": "off",
      "no-inline-style": "off"
    }
  });
  if (g || f.length === 0)
    return { isValid: !0 };
  const x = f[0].messages.sort((t, e) => t.severity - e.severity).reduce((t, e) => {
    const l = t.find((n) => n.ruleId === e.ruleId);
    return l ? (e.selector && !l.selectors.includes(e.selector) && l.selectors.push(e.selector), t) : (t.push({
      // escape possible html entities
      ruleId: e.ruleId.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"),
      message: e.message,
      ruleUrl: e.ruleUrl || `https://html-validate.org/rules/${e.ruleId}.html`,
      selectors: e.selector ? [e.selector] : [],
      context: e.context
    }), t);
  }, []);
  return d.innerHTML = `
    ${x.map((t) => `
        <li class="border-b border-styleguide-border first:border-t last:border-none">
            <details class="group">
                <summary class="flex cursor-pointer justify-start items-center px-6 py-4 text-sm bg-styleguide-bg transition hover:bg-[rgb(242,242,242)] focus:bg-[rgb(242,242,242)] dark:hover:bg-[rgb(26,26,26)] dark:focus:bg-[rgb(26,26,26)]">
                    <svg class="h-4 w-4 group-open:rotate-90 transition-transform mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path>
                    </svg>
                    <span>
                        <span class="font-semibold mr-1">${t.ruleId}:</span><span>${b(t.message)}</span>
                    </span>
                </summary>
                
                <div class="border-t pl-12 pr-6 py-6 text-sm bg-styleguide-bg-highlight border-styleguide-border">
                     <p class="mb-3 pb-3 border-b border-styleguide-border">
                        <a class="flex gap-1 group/link items-center text-sm text-blue-600" href="${t.ruleUrl}" target="_blank">
                            Learn more about the rule
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-3 w-3">
                                <path class="transition group-hover/link:translate-x-px group-hover/link:-translate-y-px group-focus/link:translate-x-px group-focus/link:-translate-y-px" d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z"></path>
                                <path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z"></path>
                            </svg>
                        </a>
                    </p>
                    
                    <h3 class="font-bold text-sm text-styleguide-highlight">Selectors</h3>
                    <ul>
                        ${t.selectors.map((e) => `
                            <li>
                                <button 
                                    class="block font-mono py-1.5 text-[13px] text-blue-600 text-sm cursor-pointer"
                                    data-iframe-selector="${b(`${t.ruleId}: ${t.message}`)}"
                                  >
                                    ${e}
                                </button>
                            </li>
                        `).join(`
`)}
                    </ul>
                </div>
            </details>
        </li>
    `).join(`
`)}
  `, d.querySelectorAll("[data-iframe-selector]").forEach((t) => {
    const e = t.getAttribute("data-iframe-selector");
    if (!e)
      throw new Error("No message found");
    t.addEventListener("click", () => {
      var h;
      r.close();
      const l = t.textContent;
      if (!l)
        throw new Error("No selector found");
      const n = (h = c.contentDocument) == null ? void 0 : h.querySelectorAll(l);
      if (!n)
        throw new Error("No elements found");
      n.forEach((a) => {
        y(e, a), a.style.outline = "2px solid red", a.scrollIntoView({ behavior: "smooth", block: "center" }), setTimeout(() => a.style.outline = "", 5e3);
      });
    });
  }), { isValid: g };
}
export {
  S as auditCode,
  v as createHtmlValidator
};
