var a = Object.defineProperty;
var d = (r, e, t) => e in r ? a(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var n = (r, e, t) => d(r, typeof e != "symbol" ? e + "" : e, t);
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
    const o = i.split(".").filter((s) => s.length > 0).join(" "), l = new c({ modifier: o });
    return l.initialize(e), l;
  }
  replaceAll(e) {
    const t = encodeURIComponent(JSON.stringify(this.placeholder)), i = JSON.stringify({ modifierClass: this.placeholder }), o = encodeURIComponent(i);
    return e.replace(new RegExp(this.escapeRegExp(this.placeholder), "g"), this.modifier).replace(new RegExp(this.escapeRegExp(t), "g"), this.modifier).replace(new RegExp(this.escapeRegExp(o), "g"), this.modifier);
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
      const i = t.value, o = this.replaceAll(i);
      i !== o && (t.value = o);
    });
  }
}
c.fromURL();
export {
  c as ModifierReplacer
};
