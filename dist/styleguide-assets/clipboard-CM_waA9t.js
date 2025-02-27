import { r as o } from "./main-CjFAX1V3.js";
const s = (a, t) => {
  a.forEach((e) => {
    const r = e.getAttribute(t);
    r && e.addEventListener("click", async () => {
      await navigator.clipboard.writeText(r).catch(console.error);
      const l = e.getAttribute("data-clipboard-alert-message");
      o(
        l ?? "Copied to clipboard!",
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clip-rule="evenodd" /></svg>'
      );
    });
  });
};
export {
  s as default
};
