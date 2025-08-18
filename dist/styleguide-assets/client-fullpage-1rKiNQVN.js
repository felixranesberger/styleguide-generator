var s = Object.defineProperty;
var d = (o, e, t) => e in o ? s(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var l = (o, e, t) => d(o, typeof e != "symbol" ? e + "" : e, t);
class n {
  constructor(e) {
    l(this, "modifier");
    l(this, "placeholder");
    this.modifier = e.modifier, this.placeholder = e.placeholder || "{{modifier_class}}";
  }
  initialize(e = document) {
    this.modifier && this.replaceInDocument(e);
  }
  static fromIframe(e = document) {
    if (!window.frameElement)
      throw new Error("ModifierReplacer can only be initialized from an iframe context.");
    const t = window.frameElement.getAttribute("data-modifier");
    if (!t)
      return null;
    const i = t.split(".").filter((a) => a.length > 0).join(" "), r = new n({ modifier: i });
    return r.initialize(e), r;
  }
  static fromUrl(e = document) {
    const i = new URLSearchParams(window.location.search).get("modifier");
    if (!i)
      return null;
    const r = i.split(".").filter((c) => c.length > 0).join(" "), a = new n({ modifier: r });
    return a.initialize(e), a;
  }
  replaceAll(e) {
    const t = encodeURIComponent(JSON.stringify(this.placeholder)), i = JSON.stringify({ modifierClass: this.placeholder }), r = encodeURIComponent(i);
    return e.replace(new RegExp(this.escapeRegExp(this.placeholder), "g"), this.modifier).replace(new RegExp(this.escapeRegExp(t), "g"), this.modifier).replace(new RegExp(this.escapeRegExp(r), "g"), this.modifier);
  }
  escapeRegExp(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  replaceInDocument(e) {
    const t = e.createTreeWalker(
      e.body,
      NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
      {
        acceptNode: () => NodeFilter.FILTER_ACCEPT
      }
    );
    for (; t.nextNode(); ) {
      const i = t.currentNode;
      i.nodeType === Node.TEXT_NODE ? this.replaceInTextNode(i) : i.nodeType === Node.ELEMENT_NODE && this.replaceInElementAttributes(i);
    }
  }
  replaceInTextNode(e) {
    if (e.textContent) {
      const t = e.textContent, i = this.replaceAll(t);
      t !== i && (e.textContent = i);
    }
  }
  replaceInElementAttributes(e) {
    Array.from(e.attributes).forEach((t) => {
      const i = t.value, r = this.replaceAll(i);
      i !== r && (t.value = r);
    });
  }
}
window.frameElement ? (window.frameElement.getAttribute("data-preview") === "true" && document.documentElement.classList.add("styleguide-preview"), window.frameElement.hasAttribute("data-modifier") && n.fromIframe()) : new URLSearchParams(window.location.search).get("modifier") && n.fromUrl();
