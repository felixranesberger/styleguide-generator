var a = Object.defineProperty;
var d = (o, e, t) => e in o ? a(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var n = (o, e, t) => d(o, typeof e != "symbol" ? e + "" : e, t);
const p = new URLSearchParams(window.location.search);
p.get("preview") === "true" && document.documentElement.classList.add("styleguide-preview");
class c {
  constructor(e) {
    n(this, "modifier");
    n(this, "placeholder");
    this.modifier = e.modifier, this.placeholder = e.placeholder || "{{modifier_class}}";
  }
  initialize(e = document) {
    this.modifier && this.replaceInDocument(e);
  }
  static fromURL(e = document) {
    const i = new URLSearchParams(window.location.search).get("modifier");
    if (!i)
      return null;
    const r = i.split(".").filter((s) => s.length > 0).join(" "), l = new c({ modifier: r });
    return l.initialize(e), l;
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
c.fromURL();
export {
  c as ModifierReplacer
};
