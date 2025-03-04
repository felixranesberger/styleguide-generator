var ql = Object.defineProperty;
var vi = (r) => {
  throw TypeError(r);
};
var xl = (r, e, t) => e in r ? ql(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var k = (r, e, t) => xl(r, typeof e != "symbol" ? e + "" : e, t), mn = (r, e, t) => e.has(r) || vi("Cannot " + t);
var be = (r, e, t) => (mn(r, e, "read from private field"), t ? t.call(r) : e.get(r)), Ue = (r, e, t) => e.has(r) ? vi("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(r) : e.set(r, t), Le = (r, e, t, n) => (mn(r, e, "write to private field"), n ? n.call(r, t) : e.set(r, t), t), Di = (r, e, t) => (mn(r, e, "access private method"), t);
var tt = (r, e, t, n) => ({
  set _(s) {
    Le(r, e, s, t);
  },
  get _() {
    return be(r, e, n);
  }
});
function Ll(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var Vt = { exports: {} }, pn = {}, Ve = {}, rt = {}, gn = {}, yn = {}, bn = {}, wi;
function Lr() {
  return wi || (wi = 1, function(r) {
    Object.defineProperty(r, "__esModule", { value: !0 }), r.regexpCode = r.getEsmExportName = r.getProperty = r.safeStringify = r.stringify = r.strConcat = r.addCodeArg = r.str = r._ = r.nil = r._Code = r.Name = r.IDENTIFIER = r._CodeOrName = void 0;
    class e {
    }
    r._CodeOrName = e, r.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    class t extends e {
      constructor(d) {
        if (super(), !r.IDENTIFIER.test(d))
          throw new Error("CodeGen: name must be a valid identifier");
        this.str = d;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        return !1;
      }
      get names() {
        return { [this.str]: 1 };
      }
    }
    r.Name = t;
    class n extends e {
      constructor(d) {
        super(), this._items = typeof d == "string" ? [d] : d;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        if (this._items.length > 1)
          return !1;
        const d = this._items[0];
        return d === "" || d === '""';
      }
      get str() {
        var d;
        return (d = this._str) !== null && d !== void 0 ? d : this._str = this._items.reduce((m, E) => `${m}${E}`, "");
      }
      get names() {
        var d;
        return (d = this._names) !== null && d !== void 0 ? d : this._names = this._items.reduce((m, E) => (E instanceof t && (m[E.str] = (m[E.str] || 0) + 1), m), {});
      }
    }
    r._Code = n, r.nil = new n("");
    function s(h, ...d) {
      const m = [h[0]];
      let E = 0;
      for (; E < d.length; )
        o(m, d[E]), m.push(h[++E]);
      return new n(m);
    }
    r._ = s;
    const i = new n("+");
    function a(h, ...d) {
      const m = [D(h[0])];
      let E = 0;
      for (; E < d.length; )
        m.push(i), o(m, d[E]), m.push(i, D(h[++E]));
      return u(m), new n(m);
    }
    r.str = a;
    function o(h, d) {
      d instanceof n ? h.push(...d._items) : d instanceof t ? h.push(d) : h.push(g(d));
    }
    r.addCodeArg = o;
    function u(h) {
      let d = 1;
      for (; d < h.length - 1; ) {
        if (h[d] === i) {
          const m = l(h[d - 1], h[d + 1]);
          if (m !== void 0) {
            h.splice(d - 1, 3, m);
            continue;
          }
          h[d++] = "+";
        }
        d++;
      }
    }
    function l(h, d) {
      if (d === '""')
        return h;
      if (h === '""')
        return d;
      if (typeof h == "string")
        return d instanceof t || h[h.length - 1] !== '"' ? void 0 : typeof d != "string" ? `${h.slice(0, -1)}${d}"` : d[0] === '"' ? h.slice(0, -1) + d.slice(1) : void 0;
      if (typeof d == "string" && d[0] === '"' && !(h instanceof t))
        return `"${h}${d.slice(1)}`;
    }
    function c(h, d) {
      return d.emptyStr() ? h : h.emptyStr() ? d : a`${h}${d}`;
    }
    r.strConcat = c;
    function g(h) {
      return typeof h == "number" || typeof h == "boolean" || h === null ? h : D(Array.isArray(h) ? h.join(",") : h);
    }
    function v(h) {
      return new n(D(h));
    }
    r.stringify = v;
    function D(h) {
      return JSON.stringify(h).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    }
    r.safeStringify = D;
    function A(h) {
      return typeof h == "string" && r.IDENTIFIER.test(h) ? new n(`.${h}`) : s`[${h}]`;
    }
    r.getProperty = A;
    function b(h) {
      if (typeof h == "string" && r.IDENTIFIER.test(h))
        return new n(`${h}`);
      throw new Error(`CodeGen: invalid export name: ${h}, use explicit $id name mapping`);
    }
    r.getEsmExportName = b;
    function p(h) {
      return new n(h.toString());
    }
    r.regexpCode = p;
  }(bn)), bn;
}
var En = {}, Ai;
function Ci() {
  return Ai || (Ai = 1, function(r) {
    Object.defineProperty(r, "__esModule", { value: !0 }), r.ValueScope = r.ValueScopeName = r.Scope = r.varKinds = r.UsedValueState = void 0;
    const e = Lr();
    class t extends Error {
      constructor(l) {
        super(`CodeGen: "code" for ${l} not defined`), this.value = l.value;
      }
    }
    var n;
    (function(u) {
      u[u.Started = 0] = "Started", u[u.Completed = 1] = "Completed";
    })(n || (r.UsedValueState = n = {})), r.varKinds = {
      const: new e.Name("const"),
      let: new e.Name("let"),
      var: new e.Name("var")
    };
    class s {
      constructor({ prefixes: l, parent: c } = {}) {
        this._names = {}, this._prefixes = l, this._parent = c;
      }
      toName(l) {
        return l instanceof e.Name ? l : this.name(l);
      }
      name(l) {
        return new e.Name(this._newName(l));
      }
      _newName(l) {
        const c = this._names[l] || this._nameGroup(l);
        return `${l}${c.index++}`;
      }
      _nameGroup(l) {
        var c, g;
        if (!((g = (c = this._parent) === null || c === void 0 ? void 0 : c._prefixes) === null || g === void 0) && g.has(l) || this._prefixes && !this._prefixes.has(l))
          throw new Error(`CodeGen: prefix "${l}" is not allowed in this scope`);
        return this._names[l] = { prefix: l, index: 0 };
      }
    }
    r.Scope = s;
    class i extends e.Name {
      constructor(l, c) {
        super(c), this.prefix = l;
      }
      setValue(l, { property: c, itemIndex: g }) {
        this.value = l, this.scopePath = (0, e._)`.${new e.Name(c)}[${g}]`;
      }
    }
    r.ValueScopeName = i;
    const a = (0, e._)`\n`;
    class o extends s {
      constructor(l) {
        super(l), this._values = {}, this._scope = l.scope, this.opts = { ...l, _n: l.lines ? a : e.nil };
      }
      get() {
        return this._scope;
      }
      name(l) {
        return new i(l, this._newName(l));
      }
      value(l, c) {
        var g;
        if (c.ref === void 0)
          throw new Error("CodeGen: ref must be passed in value");
        const v = this.toName(l), { prefix: D } = v, A = (g = c.key) !== null && g !== void 0 ? g : c.ref;
        let b = this._values[D];
        if (b) {
          const d = b.get(A);
          if (d)
            return d;
        } else
          b = this._values[D] = /* @__PURE__ */ new Map();
        b.set(A, v);
        const p = this._scope[D] || (this._scope[D] = []), h = p.length;
        return p[h] = c.ref, v.setValue(c, { property: D, itemIndex: h }), v;
      }
      getValue(l, c) {
        const g = this._values[l];
        if (g)
          return g.get(c);
      }
      scopeRefs(l, c = this._values) {
        return this._reduceValues(c, (g) => {
          if (g.scopePath === void 0)
            throw new Error(`CodeGen: name "${g}" has no value`);
          return (0, e._)`${l}${g.scopePath}`;
        });
      }
      scopeCode(l = this._values, c, g) {
        return this._reduceValues(l, (v) => {
          if (v.value === void 0)
            throw new Error(`CodeGen: name "${v}" has no value`);
          return v.value.code;
        }, c, g);
      }
      _reduceValues(l, c, g = {}, v) {
        let D = e.nil;
        for (const A in l) {
          const b = l[A];
          if (!b)
            continue;
          const p = g[A] = g[A] || /* @__PURE__ */ new Map();
          b.forEach((h) => {
            if (p.has(h))
              return;
            p.set(h, n.Started);
            let d = c(h);
            if (d) {
              const m = this.opts.es5 ? r.varKinds.var : r.varKinds.const;
              D = (0, e._)`${D}${m} ${h} = ${d};${this.opts._n}`;
            } else if (d = v == null ? void 0 : v(h))
              D = (0, e._)`${D}${d}${this.opts._n}`;
            else
              throw new t(h);
            p.set(h, n.Completed);
          });
        }
        return D;
      }
    }
    r.ValueScope = o;
  }(En)), En;
}
var $i;
function re() {
  return $i || ($i = 1, function(r) {
    Object.defineProperty(r, "__esModule", { value: !0 }), r.or = r.and = r.not = r.CodeGen = r.operators = r.varKinds = r.ValueScopeName = r.ValueScope = r.Scope = r.Name = r.regexpCode = r.stringify = r.getProperty = r.nil = r.strConcat = r.str = r._ = void 0;
    const e = Lr(), t = Ci();
    var n = Lr();
    Object.defineProperty(r, "_", { enumerable: !0, get: function() {
      return n._;
    } }), Object.defineProperty(r, "str", { enumerable: !0, get: function() {
      return n.str;
    } }), Object.defineProperty(r, "strConcat", { enumerable: !0, get: function() {
      return n.strConcat;
    } }), Object.defineProperty(r, "nil", { enumerable: !0, get: function() {
      return n.nil;
    } }), Object.defineProperty(r, "getProperty", { enumerable: !0, get: function() {
      return n.getProperty;
    } }), Object.defineProperty(r, "stringify", { enumerable: !0, get: function() {
      return n.stringify;
    } }), Object.defineProperty(r, "regexpCode", { enumerable: !0, get: function() {
      return n.regexpCode;
    } }), Object.defineProperty(r, "Name", { enumerable: !0, get: function() {
      return n.Name;
    } });
    var s = Ci();
    Object.defineProperty(r, "Scope", { enumerable: !0, get: function() {
      return s.Scope;
    } }), Object.defineProperty(r, "ValueScope", { enumerable: !0, get: function() {
      return s.ValueScope;
    } }), Object.defineProperty(r, "ValueScopeName", { enumerable: !0, get: function() {
      return s.ValueScopeName;
    } }), Object.defineProperty(r, "varKinds", { enumerable: !0, get: function() {
      return s.varKinds;
    } }), r.operators = {
      GT: new e._Code(">"),
      GTE: new e._Code(">="),
      LT: new e._Code("<"),
      LTE: new e._Code("<="),
      EQ: new e._Code("==="),
      NEQ: new e._Code("!=="),
      NOT: new e._Code("!"),
      OR: new e._Code("||"),
      AND: new e._Code("&&"),
      ADD: new e._Code("+")
    };
    class i {
      optimizeNodes() {
        return this;
      }
      optimizeNames(C, $) {
        return this;
      }
    }
    class a extends i {
      constructor(C, $, I) {
        super(), this.varKind = C, this.name = $, this.rhs = I;
      }
      render({ es5: C, _n: $ }) {
        const I = C ? t.varKinds.var : this.varKind, K = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
        return `${I} ${this.name}${K};` + $;
      }
      optimizeNames(C, $) {
        if (C[this.name.str])
          return this.rhs && (this.rhs = x(this.rhs, C, $)), this;
      }
      get names() {
        return this.rhs instanceof e._CodeOrName ? this.rhs.names : {};
      }
    }
    class o extends i {
      constructor(C, $, I) {
        super(), this.lhs = C, this.rhs = $, this.sideEffects = I;
      }
      render({ _n: C }) {
        return `${this.lhs} = ${this.rhs};` + C;
      }
      optimizeNames(C, $) {
        if (!(this.lhs instanceof e.Name && !C[this.lhs.str] && !this.sideEffects))
          return this.rhs = x(this.rhs, C, $), this;
      }
      get names() {
        const C = this.lhs instanceof e.Name ? {} : { ...this.lhs.names };
        return J(C, this.rhs);
      }
    }
    class u extends o {
      constructor(C, $, I, K) {
        super(C, I, K), this.op = $;
      }
      render({ _n: C }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + C;
      }
    }
    class l extends i {
      constructor(C) {
        super(), this.label = C, this.names = {};
      }
      render({ _n: C }) {
        return `${this.label}:` + C;
      }
    }
    class c extends i {
      constructor(C) {
        super(), this.label = C, this.names = {};
      }
      render({ _n: C }) {
        return `break${this.label ? ` ${this.label}` : ""};` + C;
      }
    }
    class g extends i {
      constructor(C) {
        super(), this.error = C;
      }
      render({ _n: C }) {
        return `throw ${this.error};` + C;
      }
      get names() {
        return this.error.names;
      }
    }
    class v extends i {
      constructor(C) {
        super(), this.code = C;
      }
      render({ _n: C }) {
        return `${this.code};` + C;
      }
      optimizeNodes() {
        return `${this.code}` ? this : void 0;
      }
      optimizeNames(C, $) {
        return this.code = x(this.code, C, $), this;
      }
      get names() {
        return this.code instanceof e._CodeOrName ? this.code.names : {};
      }
    }
    class D extends i {
      constructor(C = []) {
        super(), this.nodes = C;
      }
      render(C) {
        return this.nodes.reduce(($, I) => $ + I.render(C), "");
      }
      optimizeNodes() {
        const { nodes: C } = this;
        let $ = C.length;
        for (; $--; ) {
          const I = C[$].optimizeNodes();
          Array.isArray(I) ? C.splice($, 1, ...I) : I ? C[$] = I : C.splice($, 1);
        }
        return C.length > 0 ? this : void 0;
      }
      optimizeNames(C, $) {
        const { nodes: I } = this;
        let K = I.length;
        for (; K--; ) {
          const X = I[K];
          X.optimizeNames(C, $) || (L(C, X.names), I.splice(K, 1));
        }
        return I.length > 0 ? this : void 0;
      }
      get names() {
        return this.nodes.reduce((C, $) => Z(C, $.names), {});
      }
    }
    class A extends D {
      render(C) {
        return "{" + C._n + super.render(C) + "}" + C._n;
      }
    }
    class b extends D {
    }
    class p extends A {
    }
    p.kind = "else";
    class h extends A {
      constructor(C, $) {
        super($), this.condition = C;
      }
      render(C) {
        let $ = `if(${this.condition})` + super.render(C);
        return this.else && ($ += "else " + this.else.render(C)), $;
      }
      optimizeNodes() {
        super.optimizeNodes();
        const C = this.condition;
        if (C === !0)
          return this.nodes;
        let $ = this.else;
        if ($) {
          const I = $.optimizeNodes();
          $ = this.else = Array.isArray(I) ? new p(I) : I;
        }
        if ($)
          return C === !1 ? $ instanceof h ? $ : $.nodes : this.nodes.length ? this : new h(z(C), $ instanceof h ? [$] : $.nodes);
        if (!(C === !1 || !this.nodes.length))
          return this;
      }
      optimizeNames(C, $) {
        var I;
        if (this.else = (I = this.else) === null || I === void 0 ? void 0 : I.optimizeNames(C, $), !!(super.optimizeNames(C, $) || this.else))
          return this.condition = x(this.condition, C, $), this;
      }
      get names() {
        const C = super.names;
        return J(C, this.condition), this.else && Z(C, this.else.names), C;
      }
    }
    h.kind = "if";
    class d extends A {
    }
    d.kind = "for";
    class m extends d {
      constructor(C) {
        super(), this.iteration = C;
      }
      render(C) {
        return `for(${this.iteration})` + super.render(C);
      }
      optimizeNames(C, $) {
        if (super.optimizeNames(C, $))
          return this.iteration = x(this.iteration, C, $), this;
      }
      get names() {
        return Z(super.names, this.iteration.names);
      }
    }
    class E extends d {
      constructor(C, $, I, K) {
        super(), this.varKind = C, this.name = $, this.from = I, this.to = K;
      }
      render(C) {
        const $ = C.es5 ? t.varKinds.var : this.varKind, { name: I, from: K, to: X } = this;
        return `for(${$} ${I}=${K}; ${I}<${X}; ${I}++)` + super.render(C);
      }
      get names() {
        const C = J(super.names, this.from);
        return J(C, this.to);
      }
    }
    class f extends d {
      constructor(C, $, I, K) {
        super(), this.loop = C, this.varKind = $, this.name = I, this.iterable = K;
      }
      render(C) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(C);
      }
      optimizeNames(C, $) {
        if (super.optimizeNames(C, $))
          return this.iterable = x(this.iterable, C, $), this;
      }
      get names() {
        return Z(super.names, this.iterable.names);
      }
    }
    class y extends A {
      constructor(C, $, I) {
        super(), this.name = C, this.args = $, this.async = I;
      }
      render(C) {
        return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(C);
      }
    }
    y.kind = "func";
    class w extends D {
      render(C) {
        return "return " + super.render(C);
      }
    }
    w.kind = "return";
    class _ extends A {
      render(C) {
        let $ = "try" + super.render(C);
        return this.catch && ($ += this.catch.render(C)), this.finally && ($ += this.finally.render(C)), $;
      }
      optimizeNodes() {
        var C, $;
        return super.optimizeNodes(), (C = this.catch) === null || C === void 0 || C.optimizeNodes(), ($ = this.finally) === null || $ === void 0 || $.optimizeNodes(), this;
      }
      optimizeNames(C, $) {
        var I, K;
        return super.optimizeNames(C, $), (I = this.catch) === null || I === void 0 || I.optimizeNames(C, $), (K = this.finally) === null || K === void 0 || K.optimizeNames(C, $), this;
      }
      get names() {
        const C = super.names;
        return this.catch && Z(C, this.catch.names), this.finally && Z(C, this.finally.names), C;
      }
    }
    class O extends A {
      constructor(C) {
        super(), this.error = C;
      }
      render(C) {
        return `catch(${this.error})` + super.render(C);
      }
    }
    O.kind = "catch";
    class U extends A {
      render(C) {
        return "finally" + super.render(C);
      }
    }
    U.kind = "finally";
    class G {
      constructor(C, $ = {}) {
        this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...$, _n: $.lines ? `
` : "" }, this._extScope = C, this._scope = new t.Scope({ parent: C }), this._nodes = [new b()];
      }
      toString() {
        return this._root.render(this.opts);
      }
      // returns unique name in the internal scope
      name(C) {
        return this._scope.name(C);
      }
      // reserves unique name in the external scope
      scopeName(C) {
        return this._extScope.name(C);
      }
      // reserves unique name in the external scope and assigns value to it
      scopeValue(C, $) {
        const I = this._extScope.value(C, $);
        return (this._values[I.prefix] || (this._values[I.prefix] = /* @__PURE__ */ new Set())).add(I), I;
      }
      getScopeValue(C, $) {
        return this._extScope.getValue(C, $);
      }
      // return code that assigns values in the external scope to the names that are used internally
      // (same names that were returned by gen.scopeName or gen.scopeValue)
      scopeRefs(C) {
        return this._extScope.scopeRefs(C, this._values);
      }
      scopeCode() {
        return this._extScope.scopeCode(this._values);
      }
      _def(C, $, I, K) {
        const X = this._scope.toName($);
        return I !== void 0 && K && (this._constants[X.str] = I), this._leafNode(new a(C, X, I)), X;
      }
      // `const` declaration (`var` in es5 mode)
      const(C, $, I) {
        return this._def(t.varKinds.const, C, $, I);
      }
      // `let` declaration with optional assignment (`var` in es5 mode)
      let(C, $, I) {
        return this._def(t.varKinds.let, C, $, I);
      }
      // `var` declaration with optional assignment
      var(C, $, I) {
        return this._def(t.varKinds.var, C, $, I);
      }
      // assignment code
      assign(C, $, I) {
        return this._leafNode(new o(C, $, I));
      }
      // `+=` code
      add(C, $) {
        return this._leafNode(new u(C, r.operators.ADD, $));
      }
      // appends passed SafeExpr to code or executes Block
      code(C) {
        return typeof C == "function" ? C() : C !== e.nil && this._leafNode(new v(C)), this;
      }
      // returns code for object literal for the passed argument list of key-value pairs
      object(...C) {
        const $ = ["{"];
        for (const [I, K] of C)
          $.length > 1 && $.push(","), $.push(I), (I !== K || this.opts.es5) && ($.push(":"), (0, e.addCodeArg)($, K));
        return $.push("}"), new e._Code($);
      }
      // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
      if(C, $, I) {
        if (this._blockNode(new h(C)), $ && I)
          this.code($).else().code(I).endIf();
        else if ($)
          this.code($).endIf();
        else if (I)
          throw new Error('CodeGen: "else" body without "then" body');
        return this;
      }
      // `else if` clause - invalid without `if` or after `else` clauses
      elseIf(C) {
        return this._elseNode(new h(C));
      }
      // `else` clause - only valid after `if` or `else if` clauses
      else() {
        return this._elseNode(new p());
      }
      // end `if` statement (needed if gen.if was used only with condition)
      endIf() {
        return this._endBlockNode(h, p);
      }
      _for(C, $) {
        return this._blockNode(C), $ && this.code($).endFor(), this;
      }
      // a generic `for` clause (or statement if `forBody` is passed)
      for(C, $) {
        return this._for(new m(C), $);
      }
      // `for` statement for a range of values
      forRange(C, $, I, K, X = this.opts.es5 ? t.varKinds.var : t.varKinds.let) {
        const ie = this._scope.toName(C);
        return this._for(new E(X, ie, $, I), () => K(ie));
      }
      // `for-of` statement (in es5 mode replace with a normal for loop)
      forOf(C, $, I, K = t.varKinds.const) {
        const X = this._scope.toName(C);
        if (this.opts.es5) {
          const ie = $ instanceof e.Name ? $ : this.var("_arr", $);
          return this.forRange("_i", 0, (0, e._)`${ie}.length`, (ne) => {
            this.var(X, (0, e._)`${ie}[${ne}]`), I(X);
          });
        }
        return this._for(new f("of", K, X, $), () => I(X));
      }
      // `for-in` statement.
      // With option `ownProperties` replaced with a `for-of` loop for object keys
      forIn(C, $, I, K = this.opts.es5 ? t.varKinds.var : t.varKinds.const) {
        if (this.opts.ownProperties)
          return this.forOf(C, (0, e._)`Object.keys(${$})`, I);
        const X = this._scope.toName(C);
        return this._for(new f("in", K, X, $), () => I(X));
      }
      // end `for` loop
      endFor() {
        return this._endBlockNode(d);
      }
      // `label` statement
      label(C) {
        return this._leafNode(new l(C));
      }
      // `break` statement
      break(C) {
        return this._leafNode(new c(C));
      }
      // `return` statement
      return(C) {
        const $ = new w();
        if (this._blockNode($), this.code(C), $.nodes.length !== 1)
          throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(w);
      }
      // `try` statement
      try(C, $, I) {
        if (!$ && !I)
          throw new Error('CodeGen: "try" without "catch" and "finally"');
        const K = new _();
        if (this._blockNode(K), this.code(C), $) {
          const X = this.name("e");
          this._currNode = K.catch = new O(X), $(X);
        }
        return I && (this._currNode = K.finally = new U(), this.code(I)), this._endBlockNode(O, U);
      }
      // `throw` statement
      throw(C) {
        return this._leafNode(new g(C));
      }
      // start self-balancing block
      block(C, $) {
        return this._blockStarts.push(this._nodes.length), C && this.code(C).endBlock($), this;
      }
      // end the current self-balancing block
      endBlock(C) {
        const $ = this._blockStarts.pop();
        if ($ === void 0)
          throw new Error("CodeGen: not in self-balancing block");
        const I = this._nodes.length - $;
        if (I < 0 || C !== void 0 && I !== C)
          throw new Error(`CodeGen: wrong number of nodes: ${I} vs ${C} expected`);
        return this._nodes.length = $, this;
      }
      // `function` heading (or definition if funcBody is passed)
      func(C, $ = e.nil, I, K) {
        return this._blockNode(new y(C, $, I)), K && this.code(K).endFunc(), this;
      }
      // end function definition
      endFunc() {
        return this._endBlockNode(y);
      }
      optimize(C = 1) {
        for (; C-- > 0; )
          this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
      }
      _leafNode(C) {
        return this._currNode.nodes.push(C), this;
      }
      _blockNode(C) {
        this._currNode.nodes.push(C), this._nodes.push(C);
      }
      _endBlockNode(C, $) {
        const I = this._currNode;
        if (I instanceof C || $ && I instanceof $)
          return this._nodes.pop(), this;
        throw new Error(`CodeGen: not in block "${$ ? `${C.kind}/${$.kind}` : C.kind}"`);
      }
      _elseNode(C) {
        const $ = this._currNode;
        if (!($ instanceof h))
          throw new Error('CodeGen: "else" without "if"');
        return this._currNode = $.else = C, this;
      }
      get _root() {
        return this._nodes[0];
      }
      get _currNode() {
        const C = this._nodes;
        return C[C.length - 1];
      }
      set _currNode(C) {
        const $ = this._nodes;
        $[$.length - 1] = C;
      }
    }
    r.CodeGen = G;
    function Z(T, C) {
      for (const $ in C)
        T[$] = (T[$] || 0) + (C[$] || 0);
      return T;
    }
    function J(T, C) {
      return C instanceof e._CodeOrName ? Z(T, C.names) : T;
    }
    function x(T, C, $) {
      if (T instanceof e.Name)
        return I(T);
      if (!K(T))
        return T;
      return new e._Code(T._items.reduce((X, ie) => (ie instanceof e.Name && (ie = I(ie)), ie instanceof e._Code ? X.push(...ie._items) : X.push(ie), X), []));
      function I(X) {
        const ie = $[X.str];
        return ie === void 0 || C[X.str] !== 1 ? X : (delete C[X.str], ie);
      }
      function K(X) {
        return X instanceof e._Code && X._items.some((ie) => ie instanceof e.Name && C[ie.str] === 1 && $[ie.str] !== void 0);
      }
    }
    function L(T, C) {
      for (const $ in C)
        T[$] = (T[$] || 0) - (C[$] || 0);
    }
    function z(T) {
      return typeof T == "boolean" || typeof T == "number" || T === null ? !T : (0, e._)`!${F(T)}`;
    }
    r.not = z;
    const V = S(r.operators.AND);
    function M(...T) {
      return T.reduce(V);
    }
    r.and = M;
    const H = S(r.operators.OR);
    function P(...T) {
      return T.reduce(H);
    }
    r.or = P;
    function S(T) {
      return (C, $) => C === e.nil ? $ : $ === e.nil ? C : (0, e._)`${F(C)} ${T} ${F($)}`;
    }
    function F(T) {
      return T instanceof e.Name ? T : (0, e._)`(${T})`;
    }
  }(yn)), yn;
}
var ee = {}, _i;
function se() {
  if (_i) return ee;
  _i = 1, Object.defineProperty(ee, "__esModule", { value: !0 }), ee.checkStrictMode = ee.getErrorPath = ee.Type = ee.useFunc = ee.setEvaluated = ee.evaluatedPropsToName = ee.mergeEvaluated = ee.eachItem = ee.unescapeJsonPointer = ee.escapeJsonPointer = ee.escapeFragment = ee.unescapeFragment = ee.schemaRefOrVal = ee.schemaHasRulesButRef = ee.schemaHasRules = ee.checkUnknownRules = ee.alwaysValidSchema = ee.toHash = void 0;
  const r = re(), e = Lr();
  function t(f) {
    const y = {};
    for (const w of f)
      y[w] = !0;
    return y;
  }
  ee.toHash = t;
  function n(f, y) {
    return typeof y == "boolean" ? y : Object.keys(y).length === 0 ? !0 : (s(f, y), !i(y, f.self.RULES.all));
  }
  ee.alwaysValidSchema = n;
  function s(f, y = f.schema) {
    const { opts: w, self: _ } = f;
    if (!w.strictSchema || typeof y == "boolean")
      return;
    const O = _.RULES.keywords;
    for (const U in y)
      O[U] || E(f, `unknown keyword: "${U}"`);
  }
  ee.checkUnknownRules = s;
  function i(f, y) {
    if (typeof f == "boolean")
      return !f;
    for (const w in f)
      if (y[w])
        return !0;
    return !1;
  }
  ee.schemaHasRules = i;
  function a(f, y) {
    if (typeof f == "boolean")
      return !f;
    for (const w in f)
      if (w !== "$ref" && y.all[w])
        return !0;
    return !1;
  }
  ee.schemaHasRulesButRef = a;
  function o({ topSchemaRef: f, schemaPath: y }, w, _, O) {
    if (!O) {
      if (typeof w == "number" || typeof w == "boolean")
        return w;
      if (typeof w == "string")
        return (0, r._)`${w}`;
    }
    return (0, r._)`${f}${y}${(0, r.getProperty)(_)}`;
  }
  ee.schemaRefOrVal = o;
  function u(f) {
    return g(decodeURIComponent(f));
  }
  ee.unescapeFragment = u;
  function l(f) {
    return encodeURIComponent(c(f));
  }
  ee.escapeFragment = l;
  function c(f) {
    return typeof f == "number" ? `${f}` : f.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  ee.escapeJsonPointer = c;
  function g(f) {
    return f.replace(/~1/g, "/").replace(/~0/g, "~");
  }
  ee.unescapeJsonPointer = g;
  function v(f, y) {
    if (Array.isArray(f))
      for (const w of f)
        y(w);
    else
      y(f);
  }
  ee.eachItem = v;
  function D({ mergeNames: f, mergeToName: y, mergeValues: w, resultToName: _ }) {
    return (O, U, G, Z) => {
      const J = G === void 0 ? U : G instanceof r.Name ? (U instanceof r.Name ? f(O, U, G) : y(O, U, G), G) : U instanceof r.Name ? (y(O, G, U), U) : w(U, G);
      return Z === r.Name && !(J instanceof r.Name) ? _(O, J) : J;
    };
  }
  ee.mergeEvaluated = {
    props: D({
      mergeNames: (f, y, w) => f.if((0, r._)`${w} !== true && ${y} !== undefined`, () => {
        f.if((0, r._)`${y} === true`, () => f.assign(w, !0), () => f.assign(w, (0, r._)`${w} || {}`).code((0, r._)`Object.assign(${w}, ${y})`));
      }),
      mergeToName: (f, y, w) => f.if((0, r._)`${w} !== true`, () => {
        y === !0 ? f.assign(w, !0) : (f.assign(w, (0, r._)`${w} || {}`), b(f, w, y));
      }),
      mergeValues: (f, y) => f === !0 ? !0 : { ...f, ...y },
      resultToName: A
    }),
    items: D({
      mergeNames: (f, y, w) => f.if((0, r._)`${w} !== true && ${y} !== undefined`, () => f.assign(w, (0, r._)`${y} === true ? true : ${w} > ${y} ? ${w} : ${y}`)),
      mergeToName: (f, y, w) => f.if((0, r._)`${w} !== true`, () => f.assign(w, y === !0 ? !0 : (0, r._)`${w} > ${y} ? ${w} : ${y}`)),
      mergeValues: (f, y) => f === !0 ? !0 : Math.max(f, y),
      resultToName: (f, y) => f.var("items", y)
    })
  };
  function A(f, y) {
    if (y === !0)
      return f.var("props", !0);
    const w = f.var("props", (0, r._)`{}`);
    return y !== void 0 && b(f, w, y), w;
  }
  ee.evaluatedPropsToName = A;
  function b(f, y, w) {
    Object.keys(w).forEach((_) => f.assign((0, r._)`${y}${(0, r.getProperty)(_)}`, !0));
  }
  ee.setEvaluated = b;
  const p = {};
  function h(f, y) {
    return f.scopeValue("func", {
      ref: y,
      code: p[y.code] || (p[y.code] = new e._Code(y.code))
    });
  }
  ee.useFunc = h;
  var d;
  (function(f) {
    f[f.Num = 0] = "Num", f[f.Str = 1] = "Str";
  })(d || (ee.Type = d = {}));
  function m(f, y, w) {
    if (f instanceof r.Name) {
      const _ = y === d.Num;
      return w ? _ ? (0, r._)`"[" + ${f} + "]"` : (0, r._)`"['" + ${f} + "']"` : _ ? (0, r._)`"/" + ${f}` : (0, r._)`"/" + ${f}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
    }
    return w ? (0, r.getProperty)(f).toString() : "/" + c(f);
  }
  ee.getErrorPath = m;
  function E(f, y, w = f.opts.strictSchema) {
    if (w) {
      if (y = `strict mode: ${y}`, w === !0)
        throw new Error(y);
      f.self.logger.warn(y);
    }
  }
  return ee.checkStrictMode = E, ee;
}
var Ht = {}, Si;
function et() {
  if (Si) return Ht;
  Si = 1, Object.defineProperty(Ht, "__esModule", { value: !0 });
  const r = re(), e = {
    // validation function arguments
    data: new r.Name("data"),
    // data passed to validation function
    // args passed from referencing schema
    valCxt: new r.Name("valCxt"),
    // validation/data context - should not be used directly, it is destructured to the names below
    instancePath: new r.Name("instancePath"),
    parentData: new r.Name("parentData"),
    parentDataProperty: new r.Name("parentDataProperty"),
    rootData: new r.Name("rootData"),
    // root data - same as the data passed to the first/top validation function
    dynamicAnchors: new r.Name("dynamicAnchors"),
    // used to support recursiveRef and dynamicRef
    // function scoped variables
    vErrors: new r.Name("vErrors"),
    // null or array of validation errors
    errors: new r.Name("errors"),
    // counter of validation errors
    this: new r.Name("this"),
    // "globals"
    self: new r.Name("self"),
    scope: new r.Name("scope"),
    // JTD serialize/parse name for JSON string and position
    json: new r.Name("json"),
    jsonPos: new r.Name("jsonPos"),
    jsonLen: new r.Name("jsonLen"),
    jsonPart: new r.Name("jsonPart")
  };
  return Ht.default = e, Ht;
}
var Ri;
function Gr() {
  return Ri || (Ri = 1, function(r) {
    Object.defineProperty(r, "__esModule", { value: !0 }), r.extendErrors = r.resetErrorsCount = r.reportExtraError = r.reportError = r.keyword$DataError = r.keywordError = void 0;
    const e = re(), t = se(), n = et();
    r.keywordError = {
      message: ({ keyword: p }) => (0, e.str)`must pass "${p}" keyword validation`
    }, r.keyword$DataError = {
      message: ({ keyword: p, schemaType: h }) => h ? (0, e.str)`"${p}" keyword must be ${h} ($data)` : (0, e.str)`"${p}" keyword is invalid ($data)`
    };
    function s(p, h = r.keywordError, d, m) {
      const { it: E } = p, { gen: f, compositeRule: y, allErrors: w } = E, _ = g(p, h, d);
      m ?? (y || w) ? u(f, _) : l(E, (0, e._)`[${_}]`);
    }
    r.reportError = s;
    function i(p, h = r.keywordError, d) {
      const { it: m } = p, { gen: E, compositeRule: f, allErrors: y } = m, w = g(p, h, d);
      u(E, w), f || y || l(m, n.default.vErrors);
    }
    r.reportExtraError = i;
    function a(p, h) {
      p.assign(n.default.errors, h), p.if((0, e._)`${n.default.vErrors} !== null`, () => p.if(h, () => p.assign((0, e._)`${n.default.vErrors}.length`, h), () => p.assign(n.default.vErrors, null)));
    }
    r.resetErrorsCount = a;
    function o({ gen: p, keyword: h, schemaValue: d, data: m, errsCount: E, it: f }) {
      if (E === void 0)
        throw new Error("ajv implementation error");
      const y = p.name("err");
      p.forRange("i", E, n.default.errors, (w) => {
        p.const(y, (0, e._)`${n.default.vErrors}[${w}]`), p.if((0, e._)`${y}.instancePath === undefined`, () => p.assign((0, e._)`${y}.instancePath`, (0, e.strConcat)(n.default.instancePath, f.errorPath))), p.assign((0, e._)`${y}.schemaPath`, (0, e.str)`${f.errSchemaPath}/${h}`), f.opts.verbose && (p.assign((0, e._)`${y}.schema`, d), p.assign((0, e._)`${y}.data`, m));
      });
    }
    r.extendErrors = o;
    function u(p, h) {
      const d = p.const("err", h);
      p.if((0, e._)`${n.default.vErrors} === null`, () => p.assign(n.default.vErrors, (0, e._)`[${d}]`), (0, e._)`${n.default.vErrors}.push(${d})`), p.code((0, e._)`${n.default.errors}++`);
    }
    function l(p, h) {
      const { gen: d, validateName: m, schemaEnv: E } = p;
      E.$async ? d.throw((0, e._)`new ${p.ValidationError}(${h})`) : (d.assign((0, e._)`${m}.errors`, h), d.return(!1));
    }
    const c = {
      keyword: new e.Name("keyword"),
      schemaPath: new e.Name("schemaPath"),
      // also used in JTD errors
      params: new e.Name("params"),
      propertyName: new e.Name("propertyName"),
      message: new e.Name("message"),
      schema: new e.Name("schema"),
      parentSchema: new e.Name("parentSchema")
    };
    function g(p, h, d) {
      const { createErrors: m } = p.it;
      return m === !1 ? (0, e._)`{}` : v(p, h, d);
    }
    function v(p, h, d = {}) {
      const { gen: m, it: E } = p, f = [
        D(E, d),
        A(p, d)
      ];
      return b(p, h, f), m.object(...f);
    }
    function D({ errorPath: p }, { instancePath: h }) {
      const d = h ? (0, e.str)`${p}${(0, t.getErrorPath)(h, t.Type.Str)}` : p;
      return [n.default.instancePath, (0, e.strConcat)(n.default.instancePath, d)];
    }
    function A({ keyword: p, it: { errSchemaPath: h } }, { schemaPath: d, parentSchema: m }) {
      let E = m ? h : (0, e.str)`${h}/${p}`;
      return d && (E = (0, e.str)`${E}${(0, t.getErrorPath)(d, t.Type.Str)}`), [c.schemaPath, E];
    }
    function b(p, { params: h, message: d }, m) {
      const { keyword: E, data: f, schemaValue: y, it: w } = p, { opts: _, propertyName: O, topSchemaRef: U, schemaPath: G } = w;
      m.push([c.keyword, E], [c.params, typeof h == "function" ? h(p) : h || (0, e._)`{}`]), _.messages && m.push([c.message, typeof d == "function" ? d(p) : d]), _.verbose && m.push([c.schema, y], [c.parentSchema, (0, e._)`${U}${G}`], [n.default.data, f]), O && m.push([c.propertyName, O]);
    }
  }(gn)), gn;
}
var Ti;
function Bl() {
  if (Ti) return rt;
  Ti = 1, Object.defineProperty(rt, "__esModule", { value: !0 }), rt.boolOrEmptySchema = rt.topBoolOrEmptySchema = void 0;
  const r = Gr(), e = re(), t = et(), n = {
    message: "boolean schema is false"
  };
  function s(o) {
    const { gen: u, schema: l, validateName: c } = o;
    l === !1 ? a(o, !1) : typeof l == "object" && l.$async === !0 ? u.return(t.default.data) : (u.assign((0, e._)`${c}.errors`, null), u.return(!0));
  }
  rt.topBoolOrEmptySchema = s;
  function i(o, u) {
    const { gen: l, schema: c } = o;
    c === !1 ? (l.var(u, !1), a(o)) : l.var(u, !0);
  }
  rt.boolOrEmptySchema = i;
  function a(o, u) {
    const { gen: l, data: c } = o, g = {
      gen: l,
      keyword: "false schema",
      data: c,
      schema: !1,
      schemaCode: !1,
      schemaValue: !1,
      params: {},
      it: o
    };
    (0, r.reportError)(g, n, void 0, u);
  }
  return rt;
}
var ge = {}, nt = {}, Ni;
function Cu() {
  if (Ni) return nt;
  Ni = 1, Object.defineProperty(nt, "__esModule", { value: !0 }), nt.getRules = nt.isJSONType = void 0;
  const r = ["string", "number", "integer", "boolean", "null", "object", "array"], e = new Set(r);
  function t(s) {
    return typeof s == "string" && e.has(s);
  }
  nt.isJSONType = t;
  function n() {
    const s = {
      number: { type: "number", rules: [] },
      string: { type: "string", rules: [] },
      array: { type: "array", rules: [] },
      object: { type: "object", rules: [] }
    };
    return {
      types: { ...s, integer: !0, boolean: !0, null: !0 },
      rules: [{ rules: [] }, s.number, s.string, s.array, s.object],
      post: { rules: [] },
      all: {},
      keywords: {}
    };
  }
  return nt.getRules = n, nt;
}
var He = {}, Fi;
function $u() {
  if (Fi) return He;
  Fi = 1, Object.defineProperty(He, "__esModule", { value: !0 }), He.shouldUseRule = He.shouldUseGroup = He.schemaHasRulesForType = void 0;
  function r({ schema: n, self: s }, i) {
    const a = s.RULES.types[i];
    return a && a !== !0 && e(n, a);
  }
  He.schemaHasRulesForType = r;
  function e(n, s) {
    return s.rules.some((i) => t(n, i));
  }
  He.shouldUseGroup = e;
  function t(n, s) {
    var i;
    return n[s.keyword] !== void 0 || ((i = s.definition.implements) === null || i === void 0 ? void 0 : i.some((a) => n[a] !== void 0));
  }
  return He.shouldUseRule = t, He;
}
var Pi;
function Br() {
  if (Pi) return ge;
  Pi = 1, Object.defineProperty(ge, "__esModule", { value: !0 }), ge.reportTypeError = ge.checkDataTypes = ge.checkDataType = ge.coerceAndCheckDataType = ge.getJSONTypes = ge.getSchemaTypes = ge.DataType = void 0;
  const r = Cu(), e = $u(), t = Gr(), n = re(), s = se();
  var i;
  (function(d) {
    d[d.Correct = 0] = "Correct", d[d.Wrong = 1] = "Wrong";
  })(i || (ge.DataType = i = {}));
  function a(d) {
    const m = o(d.type);
    if (m.includes("null")) {
      if (d.nullable === !1)
        throw new Error("type: null contradicts nullable: false");
    } else {
      if (!m.length && d.nullable !== void 0)
        throw new Error('"nullable" cannot be used without "type"');
      d.nullable === !0 && m.push("null");
    }
    return m;
  }
  ge.getSchemaTypes = a;
  function o(d) {
    const m = Array.isArray(d) ? d : d ? [d] : [];
    if (m.every(r.isJSONType))
      return m;
    throw new Error("type must be JSONType or JSONType[]: " + m.join(","));
  }
  ge.getJSONTypes = o;
  function u(d, m) {
    const { gen: E, data: f, opts: y } = d, w = c(m, y.coerceTypes), _ = m.length > 0 && !(w.length === 0 && m.length === 1 && (0, e.schemaHasRulesForType)(d, m[0]));
    if (_) {
      const O = A(m, f, y.strictNumbers, i.Wrong);
      E.if(O, () => {
        w.length ? g(d, m, w) : p(d);
      });
    }
    return _;
  }
  ge.coerceAndCheckDataType = u;
  const l = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
  function c(d, m) {
    return m ? d.filter((E) => l.has(E) || m === "array" && E === "array") : [];
  }
  function g(d, m, E) {
    const { gen: f, data: y, opts: w } = d, _ = f.let("dataType", (0, n._)`typeof ${y}`), O = f.let("coerced", (0, n._)`undefined`);
    w.coerceTypes === "array" && f.if((0, n._)`${_} == 'object' && Array.isArray(${y}) && ${y}.length == 1`, () => f.assign(y, (0, n._)`${y}[0]`).assign(_, (0, n._)`typeof ${y}`).if(A(m, y, w.strictNumbers), () => f.assign(O, y))), f.if((0, n._)`${O} !== undefined`);
    for (const G of E)
      (l.has(G) || G === "array" && w.coerceTypes === "array") && U(G);
    f.else(), p(d), f.endIf(), f.if((0, n._)`${O} !== undefined`, () => {
      f.assign(y, O), v(d, O);
    });
    function U(G) {
      switch (G) {
        case "string":
          f.elseIf((0, n._)`${_} == "number" || ${_} == "boolean"`).assign(O, (0, n._)`"" + ${y}`).elseIf((0, n._)`${y} === null`).assign(O, (0, n._)`""`);
          return;
        case "number":
          f.elseIf((0, n._)`${_} == "boolean" || ${y} === null
              || (${_} == "string" && ${y} && ${y} == +${y})`).assign(O, (0, n._)`+${y}`);
          return;
        case "integer":
          f.elseIf((0, n._)`${_} === "boolean" || ${y} === null
              || (${_} === "string" && ${y} && ${y} == +${y} && !(${y} % 1))`).assign(O, (0, n._)`+${y}`);
          return;
        case "boolean":
          f.elseIf((0, n._)`${y} === "false" || ${y} === 0 || ${y} === null`).assign(O, !1).elseIf((0, n._)`${y} === "true" || ${y} === 1`).assign(O, !0);
          return;
        case "null":
          f.elseIf((0, n._)`${y} === "" || ${y} === 0 || ${y} === false`), f.assign(O, null);
          return;
        case "array":
          f.elseIf((0, n._)`${_} === "string" || ${_} === "number"
              || ${_} === "boolean" || ${y} === null`).assign(O, (0, n._)`[${y}]`);
      }
    }
  }
  function v({ gen: d, parentData: m, parentDataProperty: E }, f) {
    d.if((0, n._)`${m} !== undefined`, () => d.assign((0, n._)`${m}[${E}]`, f));
  }
  function D(d, m, E, f = i.Correct) {
    const y = f === i.Correct ? n.operators.EQ : n.operators.NEQ;
    let w;
    switch (d) {
      case "null":
        return (0, n._)`${m} ${y} null`;
      case "array":
        w = (0, n._)`Array.isArray(${m})`;
        break;
      case "object":
        w = (0, n._)`${m} && typeof ${m} == "object" && !Array.isArray(${m})`;
        break;
      case "integer":
        w = _((0, n._)`!(${m} % 1) && !isNaN(${m})`);
        break;
      case "number":
        w = _();
        break;
      default:
        return (0, n._)`typeof ${m} ${y} ${d}`;
    }
    return f === i.Correct ? w : (0, n.not)(w);
    function _(O = n.nil) {
      return (0, n.and)((0, n._)`typeof ${m} == "number"`, O, E ? (0, n._)`isFinite(${m})` : n.nil);
    }
  }
  ge.checkDataType = D;
  function A(d, m, E, f) {
    if (d.length === 1)
      return D(d[0], m, E, f);
    let y;
    const w = (0, s.toHash)(d);
    if (w.array && w.object) {
      const _ = (0, n._)`typeof ${m} != "object"`;
      y = w.null ? _ : (0, n._)`!${m} || ${_}`, delete w.null, delete w.array, delete w.object;
    } else
      y = n.nil;
    w.number && delete w.integer;
    for (const _ in w)
      y = (0, n.and)(y, D(_, m, E, f));
    return y;
  }
  ge.checkDataTypes = A;
  const b = {
    message: ({ schema: d }) => `must be ${d}`,
    params: ({ schema: d, schemaValue: m }) => typeof d == "string" ? (0, n._)`{type: ${d}}` : (0, n._)`{type: ${m}}`
  };
  function p(d) {
    const m = h(d);
    (0, t.reportError)(m, b);
  }
  ge.reportTypeError = p;
  function h(d) {
    const { gen: m, data: E, schema: f } = d, y = (0, s.schemaRefOrVal)(d, f, "type");
    return {
      gen: m,
      keyword: "type",
      data: E,
      schema: f.type,
      schemaCode: y,
      schemaValue: y,
      parentSchema: f,
      params: {},
      it: d
    };
  }
  return ge;
}
var St = {}, Ii;
function jl() {
  if (Ii) return St;
  Ii = 1, Object.defineProperty(St, "__esModule", { value: !0 }), St.assignDefaults = void 0;
  const r = re(), e = se();
  function t(s, i) {
    const { properties: a, items: o } = s.schema;
    if (i === "object" && a)
      for (const u in a)
        n(s, u, a[u].default);
    else i === "array" && Array.isArray(o) && o.forEach((u, l) => n(s, l, u.default));
  }
  St.assignDefaults = t;
  function n(s, i, a) {
    const { gen: o, compositeRule: u, data: l, opts: c } = s;
    if (a === void 0)
      return;
    const g = (0, r._)`${l}${(0, r.getProperty)(i)}`;
    if (u) {
      (0, e.checkStrictMode)(s, `default is ignored for: ${g}`);
      return;
    }
    let v = (0, r._)`${g} === undefined`;
    c.useDefaults === "empty" && (v = (0, r._)`${v} || ${g} === null || ${g} === ""`), o.if(v, (0, r._)`${g} = ${(0, r.stringify)(a)}`);
  }
  return St;
}
var Ne = {}, oe = {}, Oi;
function ke() {
  if (Oi) return oe;
  Oi = 1, Object.defineProperty(oe, "__esModule", { value: !0 }), oe.validateUnion = oe.validateArray = oe.usePattern = oe.callValidateCode = oe.schemaProperties = oe.allSchemaProperties = oe.noPropertyInData = oe.propertyInData = oe.isOwnProperty = oe.hasPropFunc = oe.reportMissingProp = oe.checkMissingProp = oe.checkReportMissingProp = void 0;
  const r = re(), e = se(), t = et(), n = se();
  function s(d, m) {
    const { gen: E, data: f, it: y } = d;
    E.if(c(E, f, m, y.opts.ownProperties), () => {
      d.setParams({ missingProperty: (0, r._)`${m}` }, !0), d.error();
    });
  }
  oe.checkReportMissingProp = s;
  function i({ gen: d, data: m, it: { opts: E } }, f, y) {
    return (0, r.or)(...f.map((w) => (0, r.and)(c(d, m, w, E.ownProperties), (0, r._)`${y} = ${w}`)));
  }
  oe.checkMissingProp = i;
  function a(d, m) {
    d.setParams({ missingProperty: m }, !0), d.error();
  }
  oe.reportMissingProp = a;
  function o(d) {
    return d.scopeValue("func", {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ref: Object.prototype.hasOwnProperty,
      code: (0, r._)`Object.prototype.hasOwnProperty`
    });
  }
  oe.hasPropFunc = o;
  function u(d, m, E) {
    return (0, r._)`${o(d)}.call(${m}, ${E})`;
  }
  oe.isOwnProperty = u;
  function l(d, m, E, f) {
    const y = (0, r._)`${m}${(0, r.getProperty)(E)} !== undefined`;
    return f ? (0, r._)`${y} && ${u(d, m, E)}` : y;
  }
  oe.propertyInData = l;
  function c(d, m, E, f) {
    const y = (0, r._)`${m}${(0, r.getProperty)(E)} === undefined`;
    return f ? (0, r.or)(y, (0, r.not)(u(d, m, E))) : y;
  }
  oe.noPropertyInData = c;
  function g(d) {
    return d ? Object.keys(d).filter((m) => m !== "__proto__") : [];
  }
  oe.allSchemaProperties = g;
  function v(d, m) {
    return g(m).filter((E) => !(0, e.alwaysValidSchema)(d, m[E]));
  }
  oe.schemaProperties = v;
  function D({ schemaCode: d, data: m, it: { gen: E, topSchemaRef: f, schemaPath: y, errorPath: w }, it: _ }, O, U, G) {
    const Z = G ? (0, r._)`${d}, ${m}, ${f}${y}` : m, J = [
      [t.default.instancePath, (0, r.strConcat)(t.default.instancePath, w)],
      [t.default.parentData, _.parentData],
      [t.default.parentDataProperty, _.parentDataProperty],
      [t.default.rootData, t.default.rootData]
    ];
    _.opts.dynamicRef && J.push([t.default.dynamicAnchors, t.default.dynamicAnchors]);
    const x = (0, r._)`${Z}, ${E.object(...J)}`;
    return U !== r.nil ? (0, r._)`${O}.call(${U}, ${x})` : (0, r._)`${O}(${x})`;
  }
  oe.callValidateCode = D;
  const A = (0, r._)`new RegExp`;
  function b({ gen: d, it: { opts: m } }, E) {
    const f = m.unicodeRegExp ? "u" : "", { regExp: y } = m.code, w = y(E, f);
    return d.scopeValue("pattern", {
      key: w.toString(),
      ref: w,
      code: (0, r._)`${y.code === "new RegExp" ? A : (0, n.useFunc)(d, y)}(${E}, ${f})`
    });
  }
  oe.usePattern = b;
  function p(d) {
    const { gen: m, data: E, keyword: f, it: y } = d, w = m.name("valid");
    if (y.allErrors) {
      const O = m.let("valid", !0);
      return _(() => m.assign(O, !1)), O;
    }
    return m.var(w, !0), _(() => m.break()), w;
    function _(O) {
      const U = m.const("len", (0, r._)`${E}.length`);
      m.forRange("i", 0, U, (G) => {
        d.subschema({
          keyword: f,
          dataProp: G,
          dataPropType: e.Type.Num
        }, w), m.if((0, r.not)(w), O);
      });
    }
  }
  oe.validateArray = p;
  function h(d) {
    const { gen: m, schema: E, keyword: f, it: y } = d;
    if (!Array.isArray(E))
      throw new Error("ajv implementation error");
    if (E.some((U) => (0, e.alwaysValidSchema)(y, U)) && !y.opts.unevaluated)
      return;
    const _ = m.let("valid", !1), O = m.name("_valid");
    m.block(() => E.forEach((U, G) => {
      const Z = d.subschema({
        keyword: f,
        schemaProp: G,
        compositeRule: !0
      }, O);
      m.assign(_, (0, r._)`${_} || ${O}`), d.mergeValidEvaluated(Z, O) || m.if((0, r.not)(_));
    })), d.result(_, () => d.reset(), () => d.error(!0));
  }
  return oe.validateUnion = h, oe;
}
var ki;
function Ml() {
  if (ki) return Ne;
  ki = 1, Object.defineProperty(Ne, "__esModule", { value: !0 }), Ne.validateKeywordUsage = Ne.validSchemaType = Ne.funcKeywordCode = Ne.macroKeywordCode = void 0;
  const r = re(), e = et(), t = ke(), n = Gr();
  function s(v, D) {
    const { gen: A, keyword: b, schema: p, parentSchema: h, it: d } = v, m = D.macro.call(d.self, p, h, d), E = l(A, b, m);
    d.opts.validateSchema !== !1 && d.self.validateSchema(m, !0);
    const f = A.name("valid");
    v.subschema({
      schema: m,
      schemaPath: r.nil,
      errSchemaPath: `${d.errSchemaPath}/${b}`,
      topSchemaRef: E,
      compositeRule: !0
    }, f), v.pass(f, () => v.error(!0));
  }
  Ne.macroKeywordCode = s;
  function i(v, D) {
    var A;
    const { gen: b, keyword: p, schema: h, parentSchema: d, $data: m, it: E } = v;
    u(E, D);
    const f = !m && D.compile ? D.compile.call(E.self, h, d, E) : D.validate, y = l(b, p, f), w = b.let("valid");
    v.block$data(w, _), v.ok((A = D.valid) !== null && A !== void 0 ? A : w);
    function _() {
      if (D.errors === !1)
        G(), D.modifying && a(v), Z(() => v.error());
      else {
        const J = D.async ? O() : U();
        D.modifying && a(v), Z(() => o(v, J));
      }
    }
    function O() {
      const J = b.let("ruleErrs", null);
      return b.try(() => G((0, r._)`await `), (x) => b.assign(w, !1).if((0, r._)`${x} instanceof ${E.ValidationError}`, () => b.assign(J, (0, r._)`${x}.errors`), () => b.throw(x))), J;
    }
    function U() {
      const J = (0, r._)`${y}.errors`;
      return b.assign(J, null), G(r.nil), J;
    }
    function G(J = D.async ? (0, r._)`await ` : r.nil) {
      const x = E.opts.passContext ? e.default.this : e.default.self, L = !("compile" in D && !m || D.schema === !1);
      b.assign(w, (0, r._)`${J}${(0, t.callValidateCode)(v, y, x, L)}`, D.modifying);
    }
    function Z(J) {
      var x;
      b.if((0, r.not)((x = D.valid) !== null && x !== void 0 ? x : w), J);
    }
  }
  Ne.funcKeywordCode = i;
  function a(v) {
    const { gen: D, data: A, it: b } = v;
    D.if(b.parentData, () => D.assign(A, (0, r._)`${b.parentData}[${b.parentDataProperty}]`));
  }
  function o(v, D) {
    const { gen: A } = v;
    A.if((0, r._)`Array.isArray(${D})`, () => {
      A.assign(e.default.vErrors, (0, r._)`${e.default.vErrors} === null ? ${D} : ${e.default.vErrors}.concat(${D})`).assign(e.default.errors, (0, r._)`${e.default.vErrors}.length`), (0, n.extendErrors)(v);
    }, () => v.error());
  }
  function u({ schemaEnv: v }, D) {
    if (D.async && !v.$async)
      throw new Error("async keyword in sync schema");
  }
  function l(v, D, A) {
    if (A === void 0)
      throw new Error(`keyword "${D}" failed to compile`);
    return v.scopeValue("keyword", typeof A == "function" ? { ref: A } : { ref: A, code: (0, r.stringify)(A) });
  }
  function c(v, D, A = !1) {
    return !D.length || D.some((b) => b === "array" ? Array.isArray(v) : b === "object" ? v && typeof v == "object" && !Array.isArray(v) : typeof v == b || A && typeof v > "u");
  }
  Ne.validSchemaType = c;
  function g({ schema: v, opts: D, self: A, errSchemaPath: b }, p, h) {
    if (Array.isArray(p.keyword) ? !p.keyword.includes(h) : p.keyword !== h)
      throw new Error("ajv implementation error");
    const d = p.dependencies;
    if (d != null && d.some((m) => !Object.prototype.hasOwnProperty.call(v, m)))
      throw new Error(`parent schema must have dependencies of ${h}: ${d.join(",")}`);
    if (p.validateSchema && !p.validateSchema(v[h])) {
      const E = `keyword "${h}" value is invalid at path "${b}": ` + A.errorsText(p.validateSchema.errors);
      if (D.validateSchema === "log")
        A.logger.error(E);
      else
        throw new Error(E);
    }
  }
  return Ne.validateKeywordUsage = g, Ne;
}
var Ge = {}, qi;
function Ul() {
  if (qi) return Ge;
  qi = 1, Object.defineProperty(Ge, "__esModule", { value: !0 }), Ge.extendSubschemaMode = Ge.extendSubschemaData = Ge.getSubschema = void 0;
  const r = re(), e = se();
  function t(i, { keyword: a, schemaProp: o, schema: u, schemaPath: l, errSchemaPath: c, topSchemaRef: g }) {
    if (a !== void 0 && u !== void 0)
      throw new Error('both "keyword" and "schema" passed, only one allowed');
    if (a !== void 0) {
      const v = i.schema[a];
      return o === void 0 ? {
        schema: v,
        schemaPath: (0, r._)`${i.schemaPath}${(0, r.getProperty)(a)}`,
        errSchemaPath: `${i.errSchemaPath}/${a}`
      } : {
        schema: v[o],
        schemaPath: (0, r._)`${i.schemaPath}${(0, r.getProperty)(a)}${(0, r.getProperty)(o)}`,
        errSchemaPath: `${i.errSchemaPath}/${a}/${(0, e.escapeFragment)(o)}`
      };
    }
    if (u !== void 0) {
      if (l === void 0 || c === void 0 || g === void 0)
        throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
      return {
        schema: u,
        schemaPath: l,
        topSchemaRef: g,
        errSchemaPath: c
      };
    }
    throw new Error('either "keyword" or "schema" must be passed');
  }
  Ge.getSubschema = t;
  function n(i, a, { dataProp: o, dataPropType: u, data: l, dataTypes: c, propertyName: g }) {
    if (l !== void 0 && o !== void 0)
      throw new Error('both "data" and "dataProp" passed, only one allowed');
    const { gen: v } = a;
    if (o !== void 0) {
      const { errorPath: A, dataPathArr: b, opts: p } = a, h = v.let("data", (0, r._)`${a.data}${(0, r.getProperty)(o)}`, !0);
      D(h), i.errorPath = (0, r.str)`${A}${(0, e.getErrorPath)(o, u, p.jsPropertySyntax)}`, i.parentDataProperty = (0, r._)`${o}`, i.dataPathArr = [...b, i.parentDataProperty];
    }
    if (l !== void 0) {
      const A = l instanceof r.Name ? l : v.let("data", l, !0);
      D(A), g !== void 0 && (i.propertyName = g);
    }
    c && (i.dataTypes = c);
    function D(A) {
      i.data = A, i.dataLevel = a.dataLevel + 1, i.dataTypes = [], a.definedProperties = /* @__PURE__ */ new Set(), i.parentData = a.data, i.dataNames = [...a.dataNames, A];
    }
  }
  Ge.extendSubschemaData = n;
  function s(i, { jtdDiscriminator: a, jtdMetadata: o, compositeRule: u, createErrors: l, allErrors: c }) {
    u !== void 0 && (i.compositeRule = u), l !== void 0 && (i.createErrors = l), c !== void 0 && (i.allErrors = c), i.jtdDiscriminator = a, i.jtdMetadata = o;
  }
  return Ge.extendSubschemaMode = s, Ge;
}
var Ee = {}, vn, xi;
function _u() {
  return xi || (xi = 1, vn = function r(e, t) {
    if (e === t) return !0;
    if (e && t && typeof e == "object" && typeof t == "object") {
      if (e.constructor !== t.constructor) return !1;
      var n, s, i;
      if (Array.isArray(e)) {
        if (n = e.length, n != t.length) return !1;
        for (s = n; s-- !== 0; )
          if (!r(e[s], t[s])) return !1;
        return !0;
      }
      if (e.constructor === RegExp) return e.source === t.source && e.flags === t.flags;
      if (e.valueOf !== Object.prototype.valueOf) return e.valueOf() === t.valueOf();
      if (e.toString !== Object.prototype.toString) return e.toString() === t.toString();
      if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
      for (s = n; s-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(t, i[s])) return !1;
      for (s = n; s-- !== 0; ) {
        var a = i[s];
        if (!r(e[a], t[a])) return !1;
      }
      return !0;
    }
    return e !== e && t !== t;
  }), vn;
}
var Dn = { exports: {} }, Li;
function Vl() {
  if (Li) return Dn.exports;
  Li = 1;
  var r = Dn.exports = function(n, s, i) {
    typeof s == "function" && (i = s, s = {}), i = s.cb || i;
    var a = typeof i == "function" ? i : i.pre || function() {
    }, o = i.post || function() {
    };
    e(s, a, o, n, "", n);
  };
  r.keywords = {
    additionalItems: !0,
    items: !0,
    contains: !0,
    additionalProperties: !0,
    propertyNames: !0,
    not: !0,
    if: !0,
    then: !0,
    else: !0
  }, r.arrayKeywords = {
    items: !0,
    allOf: !0,
    anyOf: !0,
    oneOf: !0
  }, r.propsKeywords = {
    $defs: !0,
    definitions: !0,
    properties: !0,
    patternProperties: !0,
    dependencies: !0
  }, r.skipKeywords = {
    default: !0,
    enum: !0,
    const: !0,
    required: !0,
    maximum: !0,
    minimum: !0,
    exclusiveMaximum: !0,
    exclusiveMinimum: !0,
    multipleOf: !0,
    maxLength: !0,
    minLength: !0,
    pattern: !0,
    format: !0,
    maxItems: !0,
    minItems: !0,
    uniqueItems: !0,
    maxProperties: !0,
    minProperties: !0
  };
  function e(n, s, i, a, o, u, l, c, g, v) {
    if (a && typeof a == "object" && !Array.isArray(a)) {
      s(a, o, u, l, c, g, v);
      for (var D in a) {
        var A = a[D];
        if (Array.isArray(A)) {
          if (D in r.arrayKeywords)
            for (var b = 0; b < A.length; b++)
              e(n, s, i, A[b], o + "/" + D + "/" + b, u, o, D, a, b);
        } else if (D in r.propsKeywords) {
          if (A && typeof A == "object")
            for (var p in A)
              e(n, s, i, A[p], o + "/" + D + "/" + t(p), u, o, D, a, p);
        } else (D in r.keywords || n.allKeys && !(D in r.skipKeywords)) && e(n, s, i, A, o + "/" + D, u, o, D, a);
      }
      i(a, o, u, l, c, g, v);
    }
  }
  function t(n) {
    return n.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  return Dn.exports;
}
var Bi;
function zr() {
  if (Bi) return Ee;
  Bi = 1, Object.defineProperty(Ee, "__esModule", { value: !0 }), Ee.getSchemaRefs = Ee.resolveUrl = Ee.normalizeId = Ee._getFullPath = Ee.getFullPath = Ee.inlineRef = void 0;
  const r = se(), e = _u(), t = Vl(), n = /* @__PURE__ */ new Set([
    "type",
    "format",
    "pattern",
    "maxLength",
    "minLength",
    "maxProperties",
    "minProperties",
    "maxItems",
    "minItems",
    "maximum",
    "minimum",
    "uniqueItems",
    "multipleOf",
    "required",
    "enum",
    "const"
  ]);
  function s(b, p = !0) {
    return typeof b == "boolean" ? !0 : p === !0 ? !a(b) : p ? o(b) <= p : !1;
  }
  Ee.inlineRef = s;
  const i = /* @__PURE__ */ new Set([
    "$ref",
    "$recursiveRef",
    "$recursiveAnchor",
    "$dynamicRef",
    "$dynamicAnchor"
  ]);
  function a(b) {
    for (const p in b) {
      if (i.has(p))
        return !0;
      const h = b[p];
      if (Array.isArray(h) && h.some(a) || typeof h == "object" && a(h))
        return !0;
    }
    return !1;
  }
  function o(b) {
    let p = 0;
    for (const h in b) {
      if (h === "$ref")
        return 1 / 0;
      if (p++, !n.has(h) && (typeof b[h] == "object" && (0, r.eachItem)(b[h], (d) => p += o(d)), p === 1 / 0))
        return 1 / 0;
    }
    return p;
  }
  function u(b, p = "", h) {
    h !== !1 && (p = g(p));
    const d = b.parse(p);
    return l(b, d);
  }
  Ee.getFullPath = u;
  function l(b, p) {
    return b.serialize(p).split("#")[0] + "#";
  }
  Ee._getFullPath = l;
  const c = /#\/?$/;
  function g(b) {
    return b ? b.replace(c, "") : "";
  }
  Ee.normalizeId = g;
  function v(b, p, h) {
    return h = g(h), b.resolve(p, h);
  }
  Ee.resolveUrl = v;
  const D = /^[a-z_][-a-z0-9._]*$/i;
  function A(b, p) {
    if (typeof b == "boolean")
      return {};
    const { schemaId: h, uriResolver: d } = this.opts, m = g(b[h] || p), E = { "": m }, f = u(d, m, !1), y = {}, w = /* @__PURE__ */ new Set();
    return t(b, { allKeys: !0 }, (U, G, Z, J) => {
      if (J === void 0)
        return;
      const x = f + G;
      let L = E[J];
      typeof U[h] == "string" && (L = z.call(this, U[h])), V.call(this, U.$anchor), V.call(this, U.$dynamicAnchor), E[G] = L;
      function z(M) {
        const H = this.opts.uriResolver.resolve;
        if (M = g(L ? H(L, M) : M), w.has(M))
          throw O(M);
        w.add(M);
        let P = this.refs[M];
        return typeof P == "string" && (P = this.refs[P]), typeof P == "object" ? _(U, P.schema, M) : M !== g(x) && (M[0] === "#" ? (_(U, y[M], M), y[M] = U) : this.refs[M] = x), M;
      }
      function V(M) {
        if (typeof M == "string") {
          if (!D.test(M))
            throw new Error(`invalid anchor "${M}"`);
          z.call(this, `#${M}`);
        }
      }
    }), y;
    function _(U, G, Z) {
      if (G !== void 0 && !e(U, G))
        throw O(Z);
    }
    function O(U) {
      return new Error(`reference "${U}" resolves to more than one schema`);
    }
  }
  return Ee.getSchemaRefs = A, Ee;
}
var ji;
function Kr() {
  if (ji) return Ve;
  ji = 1, Object.defineProperty(Ve, "__esModule", { value: !0 }), Ve.getData = Ve.KeywordCxt = Ve.validateFunctionCode = void 0;
  const r = Bl(), e = Br(), t = $u(), n = Br(), s = jl(), i = Ml(), a = Ul(), o = re(), u = et(), l = zr(), c = se(), g = Gr();
  function v(R) {
    if (f(R) && (w(R), E(R))) {
      p(R);
      return;
    }
    D(R, () => (0, r.topBoolOrEmptySchema)(R));
  }
  Ve.validateFunctionCode = v;
  function D({ gen: R, validateName: N, schema: q, schemaEnv: j, opts: W }, te) {
    W.code.es5 ? R.func(N, (0, o._)`${u.default.data}, ${u.default.valCxt}`, j.$async, () => {
      R.code((0, o._)`"use strict"; ${d(q, W)}`), b(R, W), R.code(te);
    }) : R.func(N, (0, o._)`${u.default.data}, ${A(W)}`, j.$async, () => R.code(d(q, W)).code(te));
  }
  function A(R) {
    return (0, o._)`{${u.default.instancePath}="", ${u.default.parentData}, ${u.default.parentDataProperty}, ${u.default.rootData}=${u.default.data}${R.dynamicRef ? (0, o._)`, ${u.default.dynamicAnchors}={}` : o.nil}}={}`;
  }
  function b(R, N) {
    R.if(u.default.valCxt, () => {
      R.var(u.default.instancePath, (0, o._)`${u.default.valCxt}.${u.default.instancePath}`), R.var(u.default.parentData, (0, o._)`${u.default.valCxt}.${u.default.parentData}`), R.var(u.default.parentDataProperty, (0, o._)`${u.default.valCxt}.${u.default.parentDataProperty}`), R.var(u.default.rootData, (0, o._)`${u.default.valCxt}.${u.default.rootData}`), N.dynamicRef && R.var(u.default.dynamicAnchors, (0, o._)`${u.default.valCxt}.${u.default.dynamicAnchors}`);
    }, () => {
      R.var(u.default.instancePath, (0, o._)`""`), R.var(u.default.parentData, (0, o._)`undefined`), R.var(u.default.parentDataProperty, (0, o._)`undefined`), R.var(u.default.rootData, u.default.data), N.dynamicRef && R.var(u.default.dynamicAnchors, (0, o._)`{}`);
    });
  }
  function p(R) {
    const { schema: N, opts: q, gen: j } = R;
    D(R, () => {
      q.$comment && N.$comment && J(R), U(R), j.let(u.default.vErrors, null), j.let(u.default.errors, 0), q.unevaluated && h(R), _(R), x(R);
    });
  }
  function h(R) {
    const { gen: N, validateName: q } = R;
    R.evaluated = N.const("evaluated", (0, o._)`${q}.evaluated`), N.if((0, o._)`${R.evaluated}.dynamicProps`, () => N.assign((0, o._)`${R.evaluated}.props`, (0, o._)`undefined`)), N.if((0, o._)`${R.evaluated}.dynamicItems`, () => N.assign((0, o._)`${R.evaluated}.items`, (0, o._)`undefined`));
  }
  function d(R, N) {
    const q = typeof R == "object" && R[N.schemaId];
    return q && (N.code.source || N.code.process) ? (0, o._)`/*# sourceURL=${q} */` : o.nil;
  }
  function m(R, N) {
    if (f(R) && (w(R), E(R))) {
      y(R, N);
      return;
    }
    (0, r.boolOrEmptySchema)(R, N);
  }
  function E({ schema: R, self: N }) {
    if (typeof R == "boolean")
      return !R;
    for (const q in R)
      if (N.RULES.all[q])
        return !0;
    return !1;
  }
  function f(R) {
    return typeof R.schema != "boolean";
  }
  function y(R, N) {
    const { schema: q, gen: j, opts: W } = R;
    W.$comment && q.$comment && J(R), G(R), Z(R);
    const te = j.const("_errs", u.default.errors);
    _(R, te), j.var(N, (0, o._)`${te} === ${u.default.errors}`);
  }
  function w(R) {
    (0, c.checkUnknownRules)(R), O(R);
  }
  function _(R, N) {
    if (R.opts.jtd)
      return z(R, [], !1, N);
    const q = (0, e.getSchemaTypes)(R.schema), j = (0, e.coerceAndCheckDataType)(R, q);
    z(R, q, !j, N);
  }
  function O(R) {
    const { schema: N, errSchemaPath: q, opts: j, self: W } = R;
    N.$ref && j.ignoreKeywordsWithRef && (0, c.schemaHasRulesButRef)(N, W.RULES) && W.logger.warn(`$ref: keywords ignored in schema at path "${q}"`);
  }
  function U(R) {
    const { schema: N, opts: q } = R;
    N.default !== void 0 && q.useDefaults && q.strictSchema && (0, c.checkStrictMode)(R, "default is ignored in the schema root");
  }
  function G(R) {
    const N = R.schema[R.opts.schemaId];
    N && (R.baseId = (0, l.resolveUrl)(R.opts.uriResolver, R.baseId, N));
  }
  function Z(R) {
    if (R.schema.$async && !R.schemaEnv.$async)
      throw new Error("async schema in sync schema");
  }
  function J({ gen: R, schemaEnv: N, schema: q, errSchemaPath: j, opts: W }) {
    const te = q.$comment;
    if (W.$comment === !0)
      R.code((0, o._)`${u.default.self}.logger.log(${te})`);
    else if (typeof W.$comment == "function") {
      const me = (0, o.str)`${j}/$comment`, Te = R.scopeValue("root", { ref: N.root });
      R.code((0, o._)`${u.default.self}.opts.$comment(${te}, ${me}, ${Te}.schema)`);
    }
  }
  function x(R) {
    const { gen: N, schemaEnv: q, validateName: j, ValidationError: W, opts: te } = R;
    q.$async ? N.if((0, o._)`${u.default.errors} === 0`, () => N.return(u.default.data), () => N.throw((0, o._)`new ${W}(${u.default.vErrors})`)) : (N.assign((0, o._)`${j}.errors`, u.default.vErrors), te.unevaluated && L(R), N.return((0, o._)`${u.default.errors} === 0`));
  }
  function L({ gen: R, evaluated: N, props: q, items: j }) {
    q instanceof o.Name && R.assign((0, o._)`${N}.props`, q), j instanceof o.Name && R.assign((0, o._)`${N}.items`, j);
  }
  function z(R, N, q, j) {
    const { gen: W, schema: te, data: me, allErrors: Te, opts: De, self: we } = R, { RULES: pe } = we;
    if (te.$ref && (De.ignoreKeywordsWithRef || !(0, c.schemaHasRulesButRef)(te, pe))) {
      W.block(() => K(R, "$ref", pe.all.$ref.definition));
      return;
    }
    De.jtd || M(R, N), W.block(() => {
      for (const _e of pe.rules)
        ct(_e);
      ct(pe.post);
    });
    function ct(_e) {
      (0, t.shouldUseGroup)(te, _e) && (_e.type ? (W.if((0, n.checkDataType)(_e.type, me, De.strictNumbers)), V(R, _e), N.length === 1 && N[0] === _e.type && q && (W.else(), (0, n.reportTypeError)(R)), W.endIf()) : V(R, _e), Te || W.if((0, o._)`${u.default.errors} === ${j || 0}`));
    }
  }
  function V(R, N) {
    const { gen: q, schema: j, opts: { useDefaults: W } } = R;
    W && (0, s.assignDefaults)(R, N.type), q.block(() => {
      for (const te of N.rules)
        (0, t.shouldUseRule)(j, te) && K(R, te.keyword, te.definition, N.type);
    });
  }
  function M(R, N) {
    R.schemaEnv.meta || !R.opts.strictTypes || (H(R, N), R.opts.allowUnionTypes || P(R, N), S(R, R.dataTypes));
  }
  function H(R, N) {
    if (N.length) {
      if (!R.dataTypes.length) {
        R.dataTypes = N;
        return;
      }
      N.forEach((q) => {
        T(R.dataTypes, q) || $(R, `type "${q}" not allowed by context "${R.dataTypes.join(",")}"`);
      }), C(R, N);
    }
  }
  function P(R, N) {
    N.length > 1 && !(N.length === 2 && N.includes("null")) && $(R, "use allowUnionTypes to allow union type keyword");
  }
  function S(R, N) {
    const q = R.self.RULES.all;
    for (const j in q) {
      const W = q[j];
      if (typeof W == "object" && (0, t.shouldUseRule)(R.schema, W)) {
        const { type: te } = W.definition;
        te.length && !te.some((me) => F(N, me)) && $(R, `missing type "${te.join(",")}" for keyword "${j}"`);
      }
    }
  }
  function F(R, N) {
    return R.includes(N) || N === "number" && R.includes("integer");
  }
  function T(R, N) {
    return R.includes(N) || N === "integer" && R.includes("number");
  }
  function C(R, N) {
    const q = [];
    for (const j of R.dataTypes)
      T(N, j) ? q.push(j) : N.includes("integer") && j === "number" && q.push("integer");
    R.dataTypes = q;
  }
  function $(R, N) {
    const q = R.schemaEnv.baseId + R.errSchemaPath;
    N += ` at "${q}" (strictTypes)`, (0, c.checkStrictMode)(R, N, R.opts.strictTypes);
  }
  class I {
    constructor(N, q, j) {
      if ((0, i.validateKeywordUsage)(N, q, j), this.gen = N.gen, this.allErrors = N.allErrors, this.keyword = j, this.data = N.data, this.schema = N.schema[j], this.$data = q.$data && N.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, c.schemaRefOrVal)(N, this.schema, j, this.$data), this.schemaType = q.schemaType, this.parentSchema = N.schema, this.params = {}, this.it = N, this.def = q, this.$data)
        this.schemaCode = N.gen.const("vSchema", ne(this.$data, N));
      else if (this.schemaCode = this.schemaValue, !(0, i.validSchemaType)(this.schema, q.schemaType, q.allowUndefined))
        throw new Error(`${j} value must be ${JSON.stringify(q.schemaType)}`);
      ("code" in q ? q.trackErrors : q.errors !== !1) && (this.errsCount = N.gen.const("_errs", u.default.errors));
    }
    result(N, q, j) {
      this.failResult((0, o.not)(N), q, j);
    }
    failResult(N, q, j) {
      this.gen.if(N), j ? j() : this.error(), q ? (this.gen.else(), q(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    pass(N, q) {
      this.failResult((0, o.not)(N), void 0, q);
    }
    fail(N) {
      if (N === void 0) {
        this.error(), this.allErrors || this.gen.if(!1);
        return;
      }
      this.gen.if(N), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    fail$data(N) {
      if (!this.$data)
        return this.fail(N);
      const { schemaCode: q } = this;
      this.fail((0, o._)`${q} !== undefined && (${(0, o.or)(this.invalid$data(), N)})`);
    }
    error(N, q, j) {
      if (q) {
        this.setParams(q), this._error(N, j), this.setParams({});
        return;
      }
      this._error(N, j);
    }
    _error(N, q) {
      (N ? g.reportExtraError : g.reportError)(this, this.def.error, q);
    }
    $dataError() {
      (0, g.reportError)(this, this.def.$dataError || g.keyword$DataError);
    }
    reset() {
      if (this.errsCount === void 0)
        throw new Error('add "trackErrors" to keyword definition');
      (0, g.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(N) {
      this.allErrors || this.gen.if(N);
    }
    setParams(N, q) {
      q ? Object.assign(this.params, N) : this.params = N;
    }
    block$data(N, q, j = o.nil) {
      this.gen.block(() => {
        this.check$data(N, j), q();
      });
    }
    check$data(N = o.nil, q = o.nil) {
      if (!this.$data)
        return;
      const { gen: j, schemaCode: W, schemaType: te, def: me } = this;
      j.if((0, o.or)((0, o._)`${W} === undefined`, q)), N !== o.nil && j.assign(N, !0), (te.length || me.validateSchema) && (j.elseIf(this.invalid$data()), this.$dataError(), N !== o.nil && j.assign(N, !1)), j.else();
    }
    invalid$data() {
      const { gen: N, schemaCode: q, schemaType: j, def: W, it: te } = this;
      return (0, o.or)(me(), Te());
      function me() {
        if (j.length) {
          if (!(q instanceof o.Name))
            throw new Error("ajv implementation error");
          const De = Array.isArray(j) ? j : [j];
          return (0, o._)`${(0, n.checkDataTypes)(De, q, te.opts.strictNumbers, n.DataType.Wrong)}`;
        }
        return o.nil;
      }
      function Te() {
        if (W.validateSchema) {
          const De = N.scopeValue("validate$data", { ref: W.validateSchema });
          return (0, o._)`!${De}(${q})`;
        }
        return o.nil;
      }
    }
    subschema(N, q) {
      const j = (0, a.getSubschema)(this.it, N);
      (0, a.extendSubschemaData)(j, this.it, N), (0, a.extendSubschemaMode)(j, N);
      const W = { ...this.it, ...j, items: void 0, props: void 0 };
      return m(W, q), W;
    }
    mergeEvaluated(N, q) {
      const { it: j, gen: W } = this;
      j.opts.unevaluated && (j.props !== !0 && N.props !== void 0 && (j.props = c.mergeEvaluated.props(W, N.props, j.props, q)), j.items !== !0 && N.items !== void 0 && (j.items = c.mergeEvaluated.items(W, N.items, j.items, q)));
    }
    mergeValidEvaluated(N, q) {
      const { it: j, gen: W } = this;
      if (j.opts.unevaluated && (j.props !== !0 || j.items !== !0))
        return W.if(q, () => this.mergeEvaluated(N, o.Name)), !0;
    }
  }
  Ve.KeywordCxt = I;
  function K(R, N, q, j) {
    const W = new I(R, q, N);
    "code" in q ? q.code(W, j) : W.$data && q.validate ? (0, i.funcKeywordCode)(W, q) : "macro" in q ? (0, i.macroKeywordCode)(W, q) : (q.compile || q.validate) && (0, i.funcKeywordCode)(W, q);
  }
  const X = /^\/(?:[^~]|~0|~1)*$/, ie = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function ne(R, { dataLevel: N, dataNames: q, dataPathArr: j }) {
    let W, te;
    if (R === "")
      return u.default.rootData;
    if (R[0] === "/") {
      if (!X.test(R))
        throw new Error(`Invalid JSON-pointer: ${R}`);
      W = R, te = u.default.rootData;
    } else {
      const we = ie.exec(R);
      if (!we)
        throw new Error(`Invalid JSON-pointer: ${R}`);
      const pe = +we[1];
      if (W = we[2], W === "#") {
        if (pe >= N)
          throw new Error(De("property/index", pe));
        return j[N - pe];
      }
      if (pe > N)
        throw new Error(De("data", pe));
      if (te = q[N - pe], !W)
        return te;
    }
    let me = te;
    const Te = W.split("/");
    for (const we of Te)
      we && (te = (0, o._)`${te}${(0, o.getProperty)((0, c.unescapeJsonPointer)(we))}`, me = (0, o._)`${me} && ${te}`);
    return me;
    function De(we, pe) {
      return `Cannot access ${we} ${pe} levels up, current level is ${N}`;
    }
  }
  return Ve.getData = ne, Ve;
}
var Gt = {}, Mi;
function Us() {
  if (Mi) return Gt;
  Mi = 1, Object.defineProperty(Gt, "__esModule", { value: !0 });
  class r extends Error {
    constructor(t) {
      super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
    }
  }
  return Gt.default = r, Gt;
}
var zt = {}, Ui;
function Wr() {
  if (Ui) return zt;
  Ui = 1, Object.defineProperty(zt, "__esModule", { value: !0 });
  const r = zr();
  class e extends Error {
    constructor(n, s, i, a) {
      super(a || `can't resolve reference ${i} from id ${s}`), this.missingRef = (0, r.resolveUrl)(n, s, i), this.missingSchema = (0, r.normalizeId)((0, r.getFullPath)(n, this.missingRef));
    }
  }
  return zt.default = e, zt;
}
var Ce = {}, Vi;
function Vs() {
  if (Vi) return Ce;
  Vi = 1, Object.defineProperty(Ce, "__esModule", { value: !0 }), Ce.resolveSchema = Ce.getCompilingSchema = Ce.resolveRef = Ce.compileSchema = Ce.SchemaEnv = void 0;
  const r = re(), e = Us(), t = et(), n = zr(), s = se(), i = Kr();
  class a {
    constructor(h) {
      var d;
      this.refs = {}, this.dynamicAnchors = {};
      let m;
      typeof h.schema == "object" && (m = h.schema), this.schema = h.schema, this.schemaId = h.schemaId, this.root = h.root || this, this.baseId = (d = h.baseId) !== null && d !== void 0 ? d : (0, n.normalizeId)(m == null ? void 0 : m[h.schemaId || "$id"]), this.schemaPath = h.schemaPath, this.localRefs = h.localRefs, this.meta = h.meta, this.$async = m == null ? void 0 : m.$async, this.refs = {};
    }
  }
  Ce.SchemaEnv = a;
  function o(p) {
    const h = c.call(this, p);
    if (h)
      return h;
    const d = (0, n.getFullPath)(this.opts.uriResolver, p.root.baseId), { es5: m, lines: E } = this.opts.code, { ownProperties: f } = this.opts, y = new r.CodeGen(this.scope, { es5: m, lines: E, ownProperties: f });
    let w;
    p.$async && (w = y.scopeValue("Error", {
      ref: e.default,
      code: (0, r._)`require("ajv/dist/runtime/validation_error").default`
    }));
    const _ = y.scopeName("validate");
    p.validateName = _;
    const O = {
      gen: y,
      allErrors: this.opts.allErrors,
      data: t.default.data,
      parentData: t.default.parentData,
      parentDataProperty: t.default.parentDataProperty,
      dataNames: [t.default.data],
      dataPathArr: [r.nil],
      // TODO can its length be used as dataLevel if nil is removed?
      dataLevel: 0,
      dataTypes: [],
      definedProperties: /* @__PURE__ */ new Set(),
      topSchemaRef: y.scopeValue("schema", this.opts.code.source === !0 ? { ref: p.schema, code: (0, r.stringify)(p.schema) } : { ref: p.schema }),
      validateName: _,
      ValidationError: w,
      schema: p.schema,
      schemaEnv: p,
      rootId: d,
      baseId: p.baseId || d,
      schemaPath: r.nil,
      errSchemaPath: p.schemaPath || (this.opts.jtd ? "" : "#"),
      errorPath: (0, r._)`""`,
      opts: this.opts,
      self: this
    };
    let U;
    try {
      this._compilations.add(p), (0, i.validateFunctionCode)(O), y.optimize(this.opts.code.optimize);
      const G = y.toString();
      U = `${y.scopeRefs(t.default.scope)}return ${G}`, this.opts.code.process && (U = this.opts.code.process(U, p));
      const J = new Function(`${t.default.self}`, `${t.default.scope}`, U)(this, this.scope.get());
      if (this.scope.value(_, { ref: J }), J.errors = null, J.schema = p.schema, J.schemaEnv = p, p.$async && (J.$async = !0), this.opts.code.source === !0 && (J.source = { validateName: _, validateCode: G, scopeValues: y._values }), this.opts.unevaluated) {
        const { props: x, items: L } = O;
        J.evaluated = {
          props: x instanceof r.Name ? void 0 : x,
          items: L instanceof r.Name ? void 0 : L,
          dynamicProps: x instanceof r.Name,
          dynamicItems: L instanceof r.Name
        }, J.source && (J.source.evaluated = (0, r.stringify)(J.evaluated));
      }
      return p.validate = J, p;
    } catch (G) {
      throw delete p.validate, delete p.validateName, U && this.logger.error("Error compiling schema, function code:", U), G;
    } finally {
      this._compilations.delete(p);
    }
  }
  Ce.compileSchema = o;
  function u(p, h, d) {
    var m;
    d = (0, n.resolveUrl)(this.opts.uriResolver, h, d);
    const E = p.refs[d];
    if (E)
      return E;
    let f = v.call(this, p, d);
    if (f === void 0) {
      const y = (m = p.localRefs) === null || m === void 0 ? void 0 : m[d], { schemaId: w } = this.opts;
      y && (f = new a({ schema: y, schemaId: w, root: p, baseId: h }));
    }
    if (f !== void 0)
      return p.refs[d] = l.call(this, f);
  }
  Ce.resolveRef = u;
  function l(p) {
    return (0, n.inlineRef)(p.schema, this.opts.inlineRefs) ? p.schema : p.validate ? p : o.call(this, p);
  }
  function c(p) {
    for (const h of this._compilations)
      if (g(h, p))
        return h;
  }
  Ce.getCompilingSchema = c;
  function g(p, h) {
    return p.schema === h.schema && p.root === h.root && p.baseId === h.baseId;
  }
  function v(p, h) {
    let d;
    for (; typeof (d = this.refs[h]) == "string"; )
      h = d;
    return d || this.schemas[h] || D.call(this, p, h);
  }
  function D(p, h) {
    const d = this.opts.uriResolver.parse(h), m = (0, n._getFullPath)(this.opts.uriResolver, d);
    let E = (0, n.getFullPath)(this.opts.uriResolver, p.baseId, void 0);
    if (Object.keys(p.schema).length > 0 && m === E)
      return b.call(this, d, p);
    const f = (0, n.normalizeId)(m), y = this.refs[f] || this.schemas[f];
    if (typeof y == "string") {
      const w = D.call(this, p, y);
      return typeof (w == null ? void 0 : w.schema) != "object" ? void 0 : b.call(this, d, w);
    }
    if (typeof (y == null ? void 0 : y.schema) == "object") {
      if (y.validate || o.call(this, y), f === (0, n.normalizeId)(h)) {
        const { schema: w } = y, { schemaId: _ } = this.opts, O = w[_];
        return O && (E = (0, n.resolveUrl)(this.opts.uriResolver, E, O)), new a({ schema: w, schemaId: _, root: p, baseId: E });
      }
      return b.call(this, d, y);
    }
  }
  Ce.resolveSchema = D;
  const A = /* @__PURE__ */ new Set([
    "properties",
    "patternProperties",
    "enum",
    "dependencies",
    "definitions"
  ]);
  function b(p, { baseId: h, schema: d, root: m }) {
    var E;
    if (((E = p.fragment) === null || E === void 0 ? void 0 : E[0]) !== "/")
      return;
    for (const w of p.fragment.slice(1).split("/")) {
      if (typeof d == "boolean")
        return;
      const _ = d[(0, s.unescapeFragment)(w)];
      if (_ === void 0)
        return;
      d = _;
      const O = typeof d == "object" && d[this.opts.schemaId];
      !A.has(w) && O && (h = (0, n.resolveUrl)(this.opts.uriResolver, h, O));
    }
    let f;
    if (typeof d != "boolean" && d.$ref && !(0, s.schemaHasRulesButRef)(d, this.RULES)) {
      const w = (0, n.resolveUrl)(this.opts.uriResolver, h, d.$ref);
      f = D.call(this, m, w);
    }
    const { schemaId: y } = this.opts;
    if (f = f || new a({ schema: d, schemaId: y, root: m, baseId: h }), f.schema !== f.root.schema)
      return f;
  }
  return Ce;
}
const Hl = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Gl = "Meta-schema for $data reference (JSON AnySchema extension proposal)", zl = "object", Kl = ["$data"], Wl = { $data: { type: "string", anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }] } }, Xl = !1, Yl = {
  $id: Hl,
  description: Gl,
  type: zl,
  required: Kl,
  properties: Wl,
  additionalProperties: Xl
};
var Kt = {}, Rt = { exports: {} }, wn, Hi;
function Jl() {
  return Hi || (Hi = 1, wn = {
    HEX: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      a: 10,
      A: 10,
      b: 11,
      B: 11,
      c: 12,
      C: 12,
      d: 13,
      D: 13,
      e: 14,
      E: 14,
      f: 15,
      F: 15
    }
  }), wn;
}
var An, Gi;
function Ql() {
  if (Gi) return An;
  Gi = 1;
  const { HEX: r } = Jl(), e = /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u;
  function t(b) {
    if (o(b, ".") < 3)
      return { host: b, isIPV4: !1 };
    const p = b.match(e) || [], [h] = p;
    return h ? { host: a(h, "."), isIPV4: !0 } : { host: b, isIPV4: !1 };
  }
  function n(b, p = !1) {
    let h = "", d = !0;
    for (const m of b) {
      if (r[m] === void 0) return;
      m !== "0" && d === !0 && (d = !1), d || (h += m);
    }
    return p && h.length === 0 && (h = "0"), h;
  }
  function s(b) {
    let p = 0;
    const h = { error: !1, address: "", zone: "" }, d = [], m = [];
    let E = !1, f = !1, y = !1;
    function w() {
      if (m.length) {
        if (E === !1) {
          const _ = n(m);
          if (_ !== void 0)
            d.push(_);
          else
            return h.error = !0, !1;
        }
        m.length = 0;
      }
      return !0;
    }
    for (let _ = 0; _ < b.length; _++) {
      const O = b[_];
      if (!(O === "[" || O === "]"))
        if (O === ":") {
          if (f === !0 && (y = !0), !w())
            break;
          if (p++, d.push(":"), p > 7) {
            h.error = !0;
            break;
          }
          _ - 1 >= 0 && b[_ - 1] === ":" && (f = !0);
          continue;
        } else if (O === "%") {
          if (!w())
            break;
          E = !0;
        } else {
          m.push(O);
          continue;
        }
    }
    return m.length && (E ? h.zone = m.join("") : y ? d.push(m.join("")) : d.push(n(m))), h.address = d.join(""), h;
  }
  function i(b) {
    if (o(b, ":") < 2)
      return { host: b, isIPV6: !1 };
    const p = s(b);
    if (p.error)
      return { host: b, isIPV6: !1 };
    {
      let h = p.address, d = p.address;
      return p.zone && (h += "%" + p.zone, d += "%25" + p.zone), { host: h, escapedHost: d, isIPV6: !0 };
    }
  }
  function a(b, p) {
    let h = "", d = !0;
    const m = b.length;
    for (let E = 0; E < m; E++) {
      const f = b[E];
      f === "0" && d ? (E + 1 <= m && b[E + 1] === p || E + 1 === m) && (h += f, d = !1) : (f === p ? d = !0 : d = !1, h += f);
    }
    return h;
  }
  function o(b, p) {
    let h = 0;
    for (let d = 0; d < b.length; d++)
      b[d] === p && h++;
    return h;
  }
  const u = /^\.\.?\//u, l = /^\/\.(?:\/|$)/u, c = /^\/\.\.(?:\/|$)/u, g = /^\/?(?:.|\n)*?(?=\/|$)/u;
  function v(b) {
    const p = [];
    for (; b.length; )
      if (b.match(u))
        b = b.replace(u, "");
      else if (b.match(l))
        b = b.replace(l, "/");
      else if (b.match(c))
        b = b.replace(c, "/"), p.pop();
      else if (b === "." || b === "..")
        b = "";
      else {
        const h = b.match(g);
        if (h) {
          const d = h[0];
          b = b.slice(d.length), p.push(d);
        } else
          throw new Error("Unexpected dot segment condition");
      }
    return p.join("");
  }
  function D(b, p) {
    const h = p !== !0 ? escape : unescape;
    return b.scheme !== void 0 && (b.scheme = h(b.scheme)), b.userinfo !== void 0 && (b.userinfo = h(b.userinfo)), b.host !== void 0 && (b.host = h(b.host)), b.path !== void 0 && (b.path = h(b.path)), b.query !== void 0 && (b.query = h(b.query)), b.fragment !== void 0 && (b.fragment = h(b.fragment)), b;
  }
  function A(b) {
    const p = [];
    if (b.userinfo !== void 0 && (p.push(b.userinfo), p.push("@")), b.host !== void 0) {
      let h = unescape(b.host);
      const d = t(h);
      if (d.isIPV4)
        h = d.host;
      else {
        const m = i(d.host);
        m.isIPV6 === !0 ? h = `[${m.escapedHost}]` : h = b.host;
      }
      p.push(h);
    }
    return (typeof b.port == "number" || typeof b.port == "string") && (p.push(":"), p.push(String(b.port))), p.length ? p.join("") : void 0;
  }
  return An = {
    recomposeAuthority: A,
    normalizeComponentEncoding: D,
    removeDotSegments: v,
    normalizeIPv4: t,
    normalizeIPv6: i,
    stringArrayToHexStripped: n
  }, An;
}
var Cn, zi;
function Zl() {
  if (zi) return Cn;
  zi = 1;
  const r = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu, e = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
  function t(d) {
    return typeof d.secure == "boolean" ? d.secure : String(d.scheme).toLowerCase() === "wss";
  }
  function n(d) {
    return d.host || (d.error = d.error || "HTTP URIs must have a host."), d;
  }
  function s(d) {
    const m = String(d.scheme).toLowerCase() === "https";
    return (d.port === (m ? 443 : 80) || d.port === "") && (d.port = void 0), d.path || (d.path = "/"), d;
  }
  function i(d) {
    return d.secure = t(d), d.resourceName = (d.path || "/") + (d.query ? "?" + d.query : ""), d.path = void 0, d.query = void 0, d;
  }
  function a(d) {
    if ((d.port === (t(d) ? 443 : 80) || d.port === "") && (d.port = void 0), typeof d.secure == "boolean" && (d.scheme = d.secure ? "wss" : "ws", d.secure = void 0), d.resourceName) {
      const [m, E] = d.resourceName.split("?");
      d.path = m && m !== "/" ? m : void 0, d.query = E, d.resourceName = void 0;
    }
    return d.fragment = void 0, d;
  }
  function o(d, m) {
    if (!d.path)
      return d.error = "URN can not be parsed", d;
    const E = d.path.match(e);
    if (E) {
      const f = m.scheme || d.scheme || "urn";
      d.nid = E[1].toLowerCase(), d.nss = E[2];
      const y = `${f}:${m.nid || d.nid}`, w = h[y];
      d.path = void 0, w && (d = w.parse(d, m));
    } else
      d.error = d.error || "URN can not be parsed.";
    return d;
  }
  function u(d, m) {
    const E = m.scheme || d.scheme || "urn", f = d.nid.toLowerCase(), y = `${E}:${m.nid || f}`, w = h[y];
    w && (d = w.serialize(d, m));
    const _ = d, O = d.nss;
    return _.path = `${f || m.nid}:${O}`, m.skipEscape = !0, _;
  }
  function l(d, m) {
    const E = d;
    return E.uuid = E.nss, E.nss = void 0, !m.tolerant && (!E.uuid || !r.test(E.uuid)) && (E.error = E.error || "UUID is not valid."), E;
  }
  function c(d) {
    const m = d;
    return m.nss = (d.uuid || "").toLowerCase(), m;
  }
  const g = {
    scheme: "http",
    domainHost: !0,
    parse: n,
    serialize: s
  }, v = {
    scheme: "https",
    domainHost: g.domainHost,
    parse: n,
    serialize: s
  }, D = {
    scheme: "ws",
    domainHost: !0,
    parse: i,
    serialize: a
  }, A = {
    scheme: "wss",
    domainHost: D.domainHost,
    parse: D.parse,
    serialize: D.serialize
  }, h = {
    http: g,
    https: v,
    ws: D,
    wss: A,
    urn: {
      scheme: "urn",
      parse: o,
      serialize: u,
      skipNormalize: !0
    },
    "urn:uuid": {
      scheme: "urn:uuid",
      parse: l,
      serialize: c,
      skipNormalize: !0
    }
  };
  return Cn = h, Cn;
}
var Ki;
function ec() {
  if (Ki) return Rt.exports;
  Ki = 1;
  const { normalizeIPv6: r, normalizeIPv4: e, removeDotSegments: t, recomposeAuthority: n, normalizeComponentEncoding: s } = Ql(), i = Zl();
  function a(p, h) {
    return typeof p == "string" ? p = c(A(p, h), h) : typeof p == "object" && (p = A(c(p, h), h)), p;
  }
  function o(p, h, d) {
    const m = Object.assign({ scheme: "null" }, d), E = u(A(p, m), A(h, m), m, !0);
    return c(E, { ...m, skipEscape: !0 });
  }
  function u(p, h, d, m) {
    const E = {};
    return m || (p = A(c(p, d), d), h = A(c(h, d), d)), d = d || {}, !d.tolerant && h.scheme ? (E.scheme = h.scheme, E.userinfo = h.userinfo, E.host = h.host, E.port = h.port, E.path = t(h.path || ""), E.query = h.query) : (h.userinfo !== void 0 || h.host !== void 0 || h.port !== void 0 ? (E.userinfo = h.userinfo, E.host = h.host, E.port = h.port, E.path = t(h.path || ""), E.query = h.query) : (h.path ? (h.path.charAt(0) === "/" ? E.path = t(h.path) : ((p.userinfo !== void 0 || p.host !== void 0 || p.port !== void 0) && !p.path ? E.path = "/" + h.path : p.path ? E.path = p.path.slice(0, p.path.lastIndexOf("/") + 1) + h.path : E.path = h.path, E.path = t(E.path)), E.query = h.query) : (E.path = p.path, h.query !== void 0 ? E.query = h.query : E.query = p.query), E.userinfo = p.userinfo, E.host = p.host, E.port = p.port), E.scheme = p.scheme), E.fragment = h.fragment, E;
  }
  function l(p, h, d) {
    return typeof p == "string" ? (p = unescape(p), p = c(s(A(p, d), !0), { ...d, skipEscape: !0 })) : typeof p == "object" && (p = c(s(p, !0), { ...d, skipEscape: !0 })), typeof h == "string" ? (h = unescape(h), h = c(s(A(h, d), !0), { ...d, skipEscape: !0 })) : typeof h == "object" && (h = c(s(h, !0), { ...d, skipEscape: !0 })), p.toLowerCase() === h.toLowerCase();
  }
  function c(p, h) {
    const d = {
      host: p.host,
      scheme: p.scheme,
      userinfo: p.userinfo,
      port: p.port,
      path: p.path,
      query: p.query,
      nid: p.nid,
      nss: p.nss,
      uuid: p.uuid,
      fragment: p.fragment,
      reference: p.reference,
      resourceName: p.resourceName,
      secure: p.secure,
      error: ""
    }, m = Object.assign({}, h), E = [], f = i[(m.scheme || d.scheme || "").toLowerCase()];
    f && f.serialize && f.serialize(d, m), d.path !== void 0 && (m.skipEscape ? d.path = unescape(d.path) : (d.path = escape(d.path), d.scheme !== void 0 && (d.path = d.path.split("%3A").join(":")))), m.reference !== "suffix" && d.scheme && E.push(d.scheme, ":");
    const y = n(d);
    if (y !== void 0 && (m.reference !== "suffix" && E.push("//"), E.push(y), d.path && d.path.charAt(0) !== "/" && E.push("/")), d.path !== void 0) {
      let w = d.path;
      !m.absolutePath && (!f || !f.absolutePath) && (w = t(w)), y === void 0 && (w = w.replace(/^\/\//u, "/%2F")), E.push(w);
    }
    return d.query !== void 0 && E.push("?", d.query), d.fragment !== void 0 && E.push("#", d.fragment), E.join("");
  }
  const g = Array.from({ length: 127 }, (p, h) => /[^!"$&'()*+,\-.;=_`a-z{}~]/u.test(String.fromCharCode(h)));
  function v(p) {
    let h = 0;
    for (let d = 0, m = p.length; d < m; ++d)
      if (h = p.charCodeAt(d), h > 126 || g[h])
        return !0;
    return !1;
  }
  const D = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
  function A(p, h) {
    const d = Object.assign({}, h), m = {
      scheme: void 0,
      userinfo: void 0,
      host: "",
      port: void 0,
      path: "",
      query: void 0,
      fragment: void 0
    }, E = p.indexOf("%") !== -1;
    let f = !1;
    d.reference === "suffix" && (p = (d.scheme ? d.scheme + ":" : "") + "//" + p);
    const y = p.match(D);
    if (y) {
      if (m.scheme = y[1], m.userinfo = y[3], m.host = y[4], m.port = parseInt(y[5], 10), m.path = y[6] || "", m.query = y[7], m.fragment = y[8], isNaN(m.port) && (m.port = y[5]), m.host) {
        const _ = e(m.host);
        if (_.isIPV4 === !1) {
          const O = r(_.host);
          m.host = O.host.toLowerCase(), f = O.isIPV6;
        } else
          m.host = _.host, f = !0;
      }
      m.scheme === void 0 && m.userinfo === void 0 && m.host === void 0 && m.port === void 0 && m.query === void 0 && !m.path ? m.reference = "same-document" : m.scheme === void 0 ? m.reference = "relative" : m.fragment === void 0 ? m.reference = "absolute" : m.reference = "uri", d.reference && d.reference !== "suffix" && d.reference !== m.reference && (m.error = m.error || "URI is not a " + d.reference + " reference.");
      const w = i[(d.scheme || m.scheme || "").toLowerCase()];
      if (!d.unicodeSupport && (!w || !w.unicodeSupport) && m.host && (d.domainHost || w && w.domainHost) && f === !1 && v(m.host))
        try {
          m.host = URL.domainToASCII(m.host.toLowerCase());
        } catch (_) {
          m.error = m.error || "Host's domain name can not be converted to ASCII: " + _;
        }
      (!w || w && !w.skipNormalize) && (E && m.scheme !== void 0 && (m.scheme = unescape(m.scheme)), E && m.host !== void 0 && (m.host = unescape(m.host)), m.path && (m.path = escape(unescape(m.path))), m.fragment && (m.fragment = encodeURI(decodeURIComponent(m.fragment)))), w && w.parse && w.parse(m, d);
    } else
      m.error = m.error || "URI can not be parsed.";
    return m;
  }
  const b = {
    SCHEMES: i,
    normalize: a,
    resolve: o,
    resolveComponents: u,
    equal: l,
    serialize: c,
    parse: A
  };
  return Rt.exports = b, Rt.exports.default = b, Rt.exports.fastUri = b, Rt.exports;
}
var Wi;
function tc() {
  if (Wi) return Kt;
  Wi = 1, Object.defineProperty(Kt, "__esModule", { value: !0 });
  const r = ec();
  return r.code = 'require("ajv/dist/runtime/uri").default', Kt.default = r, Kt;
}
var Xi;
function rc() {
  return Xi || (Xi = 1, function(r) {
    Object.defineProperty(r, "__esModule", { value: !0 }), r.CodeGen = r.Name = r.nil = r.stringify = r.str = r._ = r.KeywordCxt = void 0;
    var e = Kr();
    Object.defineProperty(r, "KeywordCxt", { enumerable: !0, get: function() {
      return e.KeywordCxt;
    } });
    var t = re();
    Object.defineProperty(r, "_", { enumerable: !0, get: function() {
      return t._;
    } }), Object.defineProperty(r, "str", { enumerable: !0, get: function() {
      return t.str;
    } }), Object.defineProperty(r, "stringify", { enumerable: !0, get: function() {
      return t.stringify;
    } }), Object.defineProperty(r, "nil", { enumerable: !0, get: function() {
      return t.nil;
    } }), Object.defineProperty(r, "Name", { enumerable: !0, get: function() {
      return t.Name;
    } }), Object.defineProperty(r, "CodeGen", { enumerable: !0, get: function() {
      return t.CodeGen;
    } });
    const n = Us(), s = Wr(), i = Cu(), a = Vs(), o = re(), u = zr(), l = Br(), c = se(), g = Yl, v = tc(), D = (P, S) => new RegExp(P, S);
    D.code = "new RegExp";
    const A = ["removeAdditional", "useDefaults", "coerceTypes"], b = /* @__PURE__ */ new Set([
      "validate",
      "serialize",
      "parse",
      "wrapper",
      "root",
      "schema",
      "keyword",
      "pattern",
      "formats",
      "validate$data",
      "func",
      "obj",
      "Error"
    ]), p = {
      errorDataPath: "",
      format: "`validateFormats: false` can be used instead.",
      nullable: '"nullable" keyword is supported by default.',
      jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
      extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
      missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
      processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
      sourceCode: "Use option `code: {source: true}`",
      strictDefaults: "It is default now, see option `strict`.",
      strictKeywords: "It is default now, see option `strict`.",
      uniqueItems: '"uniqueItems" keyword is always validated.',
      unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
      cache: "Map is used as cache, schema object as key.",
      serialize: "Map is used as cache, schema object as key.",
      ajvErrors: "It is default now."
    }, h = {
      ignoreKeywordsWithRef: "",
      jsPropertySyntax: "",
      unicode: '"minLength"/"maxLength" account for unicode characters by default.'
    }, d = 200;
    function m(P) {
      var S, F, T, C, $, I, K, X, ie, ne, R, N, q, j, W, te, me, Te, De, we, pe, ct, _e, dn, fn;
      const _t = P.strict, hn = (S = P.code) === null || S === void 0 ? void 0 : S.optimize, bi = hn === !0 || hn === void 0 ? 1 : hn || 0, Ei = (T = (F = P.code) === null || F === void 0 ? void 0 : F.regExp) !== null && T !== void 0 ? T : D, kl = (C = P.uriResolver) !== null && C !== void 0 ? C : v.default;
      return {
        strictSchema: (I = ($ = P.strictSchema) !== null && $ !== void 0 ? $ : _t) !== null && I !== void 0 ? I : !0,
        strictNumbers: (X = (K = P.strictNumbers) !== null && K !== void 0 ? K : _t) !== null && X !== void 0 ? X : !0,
        strictTypes: (ne = (ie = P.strictTypes) !== null && ie !== void 0 ? ie : _t) !== null && ne !== void 0 ? ne : "log",
        strictTuples: (N = (R = P.strictTuples) !== null && R !== void 0 ? R : _t) !== null && N !== void 0 ? N : "log",
        strictRequired: (j = (q = P.strictRequired) !== null && q !== void 0 ? q : _t) !== null && j !== void 0 ? j : !1,
        code: P.code ? { ...P.code, optimize: bi, regExp: Ei } : { optimize: bi, regExp: Ei },
        loopRequired: (W = P.loopRequired) !== null && W !== void 0 ? W : d,
        loopEnum: (te = P.loopEnum) !== null && te !== void 0 ? te : d,
        meta: (me = P.meta) !== null && me !== void 0 ? me : !0,
        messages: (Te = P.messages) !== null && Te !== void 0 ? Te : !0,
        inlineRefs: (De = P.inlineRefs) !== null && De !== void 0 ? De : !0,
        schemaId: (we = P.schemaId) !== null && we !== void 0 ? we : "$id",
        addUsedSchema: (pe = P.addUsedSchema) !== null && pe !== void 0 ? pe : !0,
        validateSchema: (ct = P.validateSchema) !== null && ct !== void 0 ? ct : !0,
        validateFormats: (_e = P.validateFormats) !== null && _e !== void 0 ? _e : !0,
        unicodeRegExp: (dn = P.unicodeRegExp) !== null && dn !== void 0 ? dn : !0,
        int32range: (fn = P.int32range) !== null && fn !== void 0 ? fn : !0,
        uriResolver: kl
      };
    }
    class E {
      constructor(S = {}) {
        this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), S = this.opts = { ...S, ...m(S) };
        const { es5: F, lines: T } = this.opts.code;
        this.scope = new o.ValueScope({ scope: {}, prefixes: b, es5: F, lines: T }), this.logger = Z(S.logger);
        const C = S.validateFormats;
        S.validateFormats = !1, this.RULES = (0, i.getRules)(), f.call(this, p, S, "NOT SUPPORTED"), f.call(this, h, S, "DEPRECATED", "warn"), this._metaOpts = U.call(this), S.formats && _.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), S.keywords && O.call(this, S.keywords), typeof S.meta == "object" && this.addMetaSchema(S.meta), w.call(this), S.validateFormats = C;
      }
      _addVocabularies() {
        this.addKeyword("$async");
      }
      _addDefaultMetaSchema() {
        const { $data: S, meta: F, schemaId: T } = this.opts;
        let C = g;
        T === "id" && (C = { ...g }, C.id = C.$id, delete C.$id), F && S && this.addMetaSchema(C, C[T], !1);
      }
      defaultMeta() {
        const { meta: S, schemaId: F } = this.opts;
        return this.opts.defaultMeta = typeof S == "object" ? S[F] || S : void 0;
      }
      validate(S, F) {
        let T;
        if (typeof S == "string") {
          if (T = this.getSchema(S), !T)
            throw new Error(`no schema with key or ref "${S}"`);
        } else
          T = this.compile(S);
        const C = T(F);
        return "$async" in T || (this.errors = T.errors), C;
      }
      compile(S, F) {
        const T = this._addSchema(S, F);
        return T.validate || this._compileSchemaEnv(T);
      }
      compileAsync(S, F) {
        if (typeof this.opts.loadSchema != "function")
          throw new Error("options.loadSchema should be a function");
        const { loadSchema: T } = this.opts;
        return C.call(this, S, F);
        async function C(ne, R) {
          await $.call(this, ne.$schema);
          const N = this._addSchema(ne, R);
          return N.validate || I.call(this, N);
        }
        async function $(ne) {
          ne && !this.getSchema(ne) && await C.call(this, { $ref: ne }, !0);
        }
        async function I(ne) {
          try {
            return this._compileSchemaEnv(ne);
          } catch (R) {
            if (!(R instanceof s.default))
              throw R;
            return K.call(this, R), await X.call(this, R.missingSchema), I.call(this, ne);
          }
        }
        function K({ missingSchema: ne, missingRef: R }) {
          if (this.refs[ne])
            throw new Error(`AnySchema ${ne} is loaded but ${R} cannot be resolved`);
        }
        async function X(ne) {
          const R = await ie.call(this, ne);
          this.refs[ne] || await $.call(this, R.$schema), this.refs[ne] || this.addSchema(R, ne, F);
        }
        async function ie(ne) {
          const R = this._loading[ne];
          if (R)
            return R;
          try {
            return await (this._loading[ne] = T(ne));
          } finally {
            delete this._loading[ne];
          }
        }
      }
      // Adds schema to the instance
      addSchema(S, F, T, C = this.opts.validateSchema) {
        if (Array.isArray(S)) {
          for (const I of S)
            this.addSchema(I, void 0, T, C);
          return this;
        }
        let $;
        if (typeof S == "object") {
          const { schemaId: I } = this.opts;
          if ($ = S[I], $ !== void 0 && typeof $ != "string")
            throw new Error(`schema ${I} must be string`);
        }
        return F = (0, u.normalizeId)(F || $), this._checkUnique(F), this.schemas[F] = this._addSchema(S, T, F, C, !0), this;
      }
      // Add schema that will be used to validate other schemas
      // options in META_IGNORE_OPTIONS are alway set to false
      addMetaSchema(S, F, T = this.opts.validateSchema) {
        return this.addSchema(S, F, !0, T), this;
      }
      //  Validate schema against its meta-schema
      validateSchema(S, F) {
        if (typeof S == "boolean")
          return !0;
        let T;
        if (T = S.$schema, T !== void 0 && typeof T != "string")
          throw new Error("$schema must be a string");
        if (T = T || this.opts.defaultMeta || this.defaultMeta(), !T)
          return this.logger.warn("meta-schema not available"), this.errors = null, !0;
        const C = this.validate(T, S);
        if (!C && F) {
          const $ = "schema is invalid: " + this.errorsText();
          if (this.opts.validateSchema === "log")
            this.logger.error($);
          else
            throw new Error($);
        }
        return C;
      }
      // Get compiled schema by `key` or `ref`.
      // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
      getSchema(S) {
        let F;
        for (; typeof (F = y.call(this, S)) == "string"; )
          S = F;
        if (F === void 0) {
          const { schemaId: T } = this.opts, C = new a.SchemaEnv({ schema: {}, schemaId: T });
          if (F = a.resolveSchema.call(this, C, S), !F)
            return;
          this.refs[S] = F;
        }
        return F.validate || this._compileSchemaEnv(F);
      }
      // Remove cached schema(s).
      // If no parameter is passed all schemas but meta-schemas are removed.
      // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
      // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
      removeSchema(S) {
        if (S instanceof RegExp)
          return this._removeAllSchemas(this.schemas, S), this._removeAllSchemas(this.refs, S), this;
        switch (typeof S) {
          case "undefined":
            return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
          case "string": {
            const F = y.call(this, S);
            return typeof F == "object" && this._cache.delete(F.schema), delete this.schemas[S], delete this.refs[S], this;
          }
          case "object": {
            const F = S;
            this._cache.delete(F);
            let T = S[this.opts.schemaId];
            return T && (T = (0, u.normalizeId)(T), delete this.schemas[T], delete this.refs[T]), this;
          }
          default:
            throw new Error("ajv.removeSchema: invalid parameter");
        }
      }
      // add "vocabulary" - a collection of keywords
      addVocabulary(S) {
        for (const F of S)
          this.addKeyword(F);
        return this;
      }
      addKeyword(S, F) {
        let T;
        if (typeof S == "string")
          T = S, typeof F == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), F.keyword = T);
        else if (typeof S == "object" && F === void 0) {
          if (F = S, T = F.keyword, Array.isArray(T) && !T.length)
            throw new Error("addKeywords: keyword must be string or non-empty array");
        } else
          throw new Error("invalid addKeywords parameters");
        if (x.call(this, T, F), !F)
          return (0, c.eachItem)(T, ($) => L.call(this, $)), this;
        V.call(this, F);
        const C = {
          ...F,
          type: (0, l.getJSONTypes)(F.type),
          schemaType: (0, l.getJSONTypes)(F.schemaType)
        };
        return (0, c.eachItem)(T, C.type.length === 0 ? ($) => L.call(this, $, C) : ($) => C.type.forEach((I) => L.call(this, $, C, I))), this;
      }
      getKeyword(S) {
        const F = this.RULES.all[S];
        return typeof F == "object" ? F.definition : !!F;
      }
      // Remove keyword
      removeKeyword(S) {
        const { RULES: F } = this;
        delete F.keywords[S], delete F.all[S];
        for (const T of F.rules) {
          const C = T.rules.findIndex(($) => $.keyword === S);
          C >= 0 && T.rules.splice(C, 1);
        }
        return this;
      }
      // Add format
      addFormat(S, F) {
        return typeof F == "string" && (F = new RegExp(F)), this.formats[S] = F, this;
      }
      errorsText(S = this.errors, { separator: F = ", ", dataVar: T = "data" } = {}) {
        return !S || S.length === 0 ? "No errors" : S.map((C) => `${T}${C.instancePath} ${C.message}`).reduce((C, $) => C + F + $);
      }
      $dataMetaSchema(S, F) {
        const T = this.RULES.all;
        S = JSON.parse(JSON.stringify(S));
        for (const C of F) {
          const $ = C.split("/").slice(1);
          let I = S;
          for (const K of $)
            I = I[K];
          for (const K in T) {
            const X = T[K];
            if (typeof X != "object")
              continue;
            const { $data: ie } = X.definition, ne = I[K];
            ie && ne && (I[K] = H(ne));
          }
        }
        return S;
      }
      _removeAllSchemas(S, F) {
        for (const T in S) {
          const C = S[T];
          (!F || F.test(T)) && (typeof C == "string" ? delete S[T] : C && !C.meta && (this._cache.delete(C.schema), delete S[T]));
        }
      }
      _addSchema(S, F, T, C = this.opts.validateSchema, $ = this.opts.addUsedSchema) {
        let I;
        const { schemaId: K } = this.opts;
        if (typeof S == "object")
          I = S[K];
        else {
          if (this.opts.jtd)
            throw new Error("schema must be object");
          if (typeof S != "boolean")
            throw new Error("schema must be object or boolean");
        }
        let X = this._cache.get(S);
        if (X !== void 0)
          return X;
        T = (0, u.normalizeId)(I || T);
        const ie = u.getSchemaRefs.call(this, S, T);
        return X = new a.SchemaEnv({ schema: S, schemaId: K, meta: F, baseId: T, localRefs: ie }), this._cache.set(X.schema, X), $ && !T.startsWith("#") && (T && this._checkUnique(T), this.refs[T] = X), C && this.validateSchema(S, !0), X;
      }
      _checkUnique(S) {
        if (this.schemas[S] || this.refs[S])
          throw new Error(`schema with key or id "${S}" already exists`);
      }
      _compileSchemaEnv(S) {
        if (S.meta ? this._compileMetaSchema(S) : a.compileSchema.call(this, S), !S.validate)
          throw new Error("ajv implementation error");
        return S.validate;
      }
      _compileMetaSchema(S) {
        const F = this.opts;
        this.opts = this._metaOpts;
        try {
          a.compileSchema.call(this, S);
        } finally {
          this.opts = F;
        }
      }
    }
    E.ValidationError = n.default, E.MissingRefError = s.default, r.default = E;
    function f(P, S, F, T = "error") {
      for (const C in P) {
        const $ = C;
        $ in S && this.logger[T](`${F}: option ${C}. ${P[$]}`);
      }
    }
    function y(P) {
      return P = (0, u.normalizeId)(P), this.schemas[P] || this.refs[P];
    }
    function w() {
      const P = this.opts.schemas;
      if (P)
        if (Array.isArray(P))
          this.addSchema(P);
        else
          for (const S in P)
            this.addSchema(P[S], S);
    }
    function _() {
      for (const P in this.opts.formats) {
        const S = this.opts.formats[P];
        S && this.addFormat(P, S);
      }
    }
    function O(P) {
      if (Array.isArray(P)) {
        this.addVocabulary(P);
        return;
      }
      this.logger.warn("keywords option as map is deprecated, pass array");
      for (const S in P) {
        const F = P[S];
        F.keyword || (F.keyword = S), this.addKeyword(F);
      }
    }
    function U() {
      const P = { ...this.opts };
      for (const S of A)
        delete P[S];
      return P;
    }
    const G = { log() {
    }, warn() {
    }, error() {
    } };
    function Z(P) {
      if (P === !1)
        return G;
      if (P === void 0)
        return console;
      if (P.log && P.warn && P.error)
        return P;
      throw new Error("logger must implement log, warn and error methods");
    }
    const J = /^[a-z_$][a-z0-9_$:-]*$/i;
    function x(P, S) {
      const { RULES: F } = this;
      if ((0, c.eachItem)(P, (T) => {
        if (F.keywords[T])
          throw new Error(`Keyword ${T} is already defined`);
        if (!J.test(T))
          throw new Error(`Keyword ${T} has invalid name`);
      }), !!S && S.$data && !("code" in S || "validate" in S))
        throw new Error('$data keyword must have "code" or "validate" function');
    }
    function L(P, S, F) {
      var T;
      const C = S == null ? void 0 : S.post;
      if (F && C)
        throw new Error('keyword with "post" flag cannot have "type"');
      const { RULES: $ } = this;
      let I = C ? $.post : $.rules.find(({ type: X }) => X === F);
      if (I || (I = { type: F, rules: [] }, $.rules.push(I)), $.keywords[P] = !0, !S)
        return;
      const K = {
        keyword: P,
        definition: {
          ...S,
          type: (0, l.getJSONTypes)(S.type),
          schemaType: (0, l.getJSONTypes)(S.schemaType)
        }
      };
      S.before ? z.call(this, I, K, S.before) : I.rules.push(K), $.all[P] = K, (T = S.implements) === null || T === void 0 || T.forEach((X) => this.addKeyword(X));
    }
    function z(P, S, F) {
      const T = P.rules.findIndex((C) => C.keyword === F);
      T >= 0 ? P.rules.splice(T, 0, S) : (P.rules.push(S), this.logger.warn(`rule ${F} is not defined`));
    }
    function V(P) {
      let { metaSchema: S } = P;
      S !== void 0 && (P.$data && this.opts.$data && (S = H(S)), P.validateSchema = this.compile(S, !0));
    }
    const M = {
      $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
    };
    function H(P) {
      return { anyOf: [P, M] };
    }
  }(pn)), pn;
}
var Wt = {}, Xt = {}, Yt = {}, Yi;
function nc() {
  if (Yi) return Yt;
  Yi = 1, Object.defineProperty(Yt, "__esModule", { value: !0 });
  const r = {
    keyword: "id",
    code() {
      throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
    }
  };
  return Yt.default = r, Yt;
}
var Xe = {}, Ji;
function sc() {
  if (Ji) return Xe;
  Ji = 1, Object.defineProperty(Xe, "__esModule", { value: !0 }), Xe.callRef = Xe.getValidate = void 0;
  const r = Wr(), e = ke(), t = re(), n = et(), s = Vs(), i = se(), a = {
    keyword: "$ref",
    schemaType: "string",
    code(l) {
      const { gen: c, schema: g, it: v } = l, { baseId: D, schemaEnv: A, validateName: b, opts: p, self: h } = v, { root: d } = A;
      if ((g === "#" || g === "#/") && D === d.baseId)
        return E();
      const m = s.resolveRef.call(h, d, D, g);
      if (m === void 0)
        throw new r.default(v.opts.uriResolver, D, g);
      if (m instanceof s.SchemaEnv)
        return f(m);
      return y(m);
      function E() {
        if (A === d)
          return u(l, b, A, A.$async);
        const w = c.scopeValue("root", { ref: d });
        return u(l, (0, t._)`${w}.validate`, d, d.$async);
      }
      function f(w) {
        const _ = o(l, w);
        u(l, _, w, w.$async);
      }
      function y(w) {
        const _ = c.scopeValue("schema", p.code.source === !0 ? { ref: w, code: (0, t.stringify)(w) } : { ref: w }), O = c.name("valid"), U = l.subschema({
          schema: w,
          dataTypes: [],
          schemaPath: t.nil,
          topSchemaRef: _,
          errSchemaPath: g
        }, O);
        l.mergeEvaluated(U), l.ok(O);
      }
    }
  };
  function o(l, c) {
    const { gen: g } = l;
    return c.validate ? g.scopeValue("validate", { ref: c.validate }) : (0, t._)`${g.scopeValue("wrapper", { ref: c })}.validate`;
  }
  Xe.getValidate = o;
  function u(l, c, g, v) {
    const { gen: D, it: A } = l, { allErrors: b, schemaEnv: p, opts: h } = A, d = h.passContext ? n.default.this : t.nil;
    v ? m() : E();
    function m() {
      if (!p.$async)
        throw new Error("async schema referenced by sync schema");
      const w = D.let("valid");
      D.try(() => {
        D.code((0, t._)`await ${(0, e.callValidateCode)(l, c, d)}`), y(c), b || D.assign(w, !0);
      }, (_) => {
        D.if((0, t._)`!(${_} instanceof ${A.ValidationError})`, () => D.throw(_)), f(_), b || D.assign(w, !1);
      }), l.ok(w);
    }
    function E() {
      l.result((0, e.callValidateCode)(l, c, d), () => y(c), () => f(c));
    }
    function f(w) {
      const _ = (0, t._)`${w}.errors`;
      D.assign(n.default.vErrors, (0, t._)`${n.default.vErrors} === null ? ${_} : ${n.default.vErrors}.concat(${_})`), D.assign(n.default.errors, (0, t._)`${n.default.vErrors}.length`);
    }
    function y(w) {
      var _;
      if (!A.opts.unevaluated)
        return;
      const O = (_ = g == null ? void 0 : g.validate) === null || _ === void 0 ? void 0 : _.evaluated;
      if (A.props !== !0)
        if (O && !O.dynamicProps)
          O.props !== void 0 && (A.props = i.mergeEvaluated.props(D, O.props, A.props));
        else {
          const U = D.var("props", (0, t._)`${w}.evaluated.props`);
          A.props = i.mergeEvaluated.props(D, U, A.props, t.Name);
        }
      if (A.items !== !0)
        if (O && !O.dynamicItems)
          O.items !== void 0 && (A.items = i.mergeEvaluated.items(D, O.items, A.items));
        else {
          const U = D.var("items", (0, t._)`${w}.evaluated.items`);
          A.items = i.mergeEvaluated.items(D, U, A.items, t.Name);
        }
    }
  }
  return Xe.callRef = u, Xe.default = a, Xe;
}
var Qi;
function ic() {
  if (Qi) return Xt;
  Qi = 1, Object.defineProperty(Xt, "__esModule", { value: !0 });
  const r = nc(), e = sc(), t = [
    "$schema",
    "$id",
    "$defs",
    "$vocabulary",
    { keyword: "$comment" },
    "definitions",
    r.default,
    e.default
  ];
  return Xt.default = t, Xt;
}
var Jt = {}, Qt = {}, Zi;
function ac() {
  if (Zi) return Qt;
  Zi = 1, Object.defineProperty(Qt, "__esModule", { value: !0 });
  const r = re(), e = r.operators, t = {
    maximum: { okStr: "<=", ok: e.LTE, fail: e.GT },
    minimum: { okStr: ">=", ok: e.GTE, fail: e.LT },
    exclusiveMaximum: { okStr: "<", ok: e.LT, fail: e.GTE },
    exclusiveMinimum: { okStr: ">", ok: e.GT, fail: e.LTE }
  }, n = {
    message: ({ keyword: i, schemaCode: a }) => (0, r.str)`must be ${t[i].okStr} ${a}`,
    params: ({ keyword: i, schemaCode: a }) => (0, r._)`{comparison: ${t[i].okStr}, limit: ${a}}`
  }, s = {
    keyword: Object.keys(t),
    type: "number",
    schemaType: "number",
    $data: !0,
    error: n,
    code(i) {
      const { keyword: a, data: o, schemaCode: u } = i;
      i.fail$data((0, r._)`${o} ${t[a].fail} ${u} || isNaN(${o})`);
    }
  };
  return Qt.default = s, Qt;
}
var Zt = {}, ea;
function oc() {
  if (ea) return Zt;
  ea = 1, Object.defineProperty(Zt, "__esModule", { value: !0 });
  const r = re(), t = {
    keyword: "multipleOf",
    type: "number",
    schemaType: "number",
    $data: !0,
    error: {
      message: ({ schemaCode: n }) => (0, r.str)`must be multiple of ${n}`,
      params: ({ schemaCode: n }) => (0, r._)`{multipleOf: ${n}}`
    },
    code(n) {
      const { gen: s, data: i, schemaCode: a, it: o } = n, u = o.opts.multipleOfPrecision, l = s.let("res"), c = u ? (0, r._)`Math.abs(Math.round(${l}) - ${l}) > 1e-${u}` : (0, r._)`${l} !== parseInt(${l})`;
      n.fail$data((0, r._)`(${a} === 0 || (${l} = ${i}/${a}, ${c}))`);
    }
  };
  return Zt.default = t, Zt;
}
var er = {}, tr = {}, ta;
function uc() {
  if (ta) return tr;
  ta = 1, Object.defineProperty(tr, "__esModule", { value: !0 });
  function r(e) {
    const t = e.length;
    let n = 0, s = 0, i;
    for (; s < t; )
      n++, i = e.charCodeAt(s++), i >= 55296 && i <= 56319 && s < t && (i = e.charCodeAt(s), (i & 64512) === 56320 && s++);
    return n;
  }
  return tr.default = r, r.code = 'require("ajv/dist/runtime/ucs2length").default', tr;
}
var ra;
function lc() {
  if (ra) return er;
  ra = 1, Object.defineProperty(er, "__esModule", { value: !0 });
  const r = re(), e = se(), t = uc(), s = {
    keyword: ["maxLength", "minLength"],
    type: "string",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: i, schemaCode: a }) {
        const o = i === "maxLength" ? "more" : "fewer";
        return (0, r.str)`must NOT have ${o} than ${a} characters`;
      },
      params: ({ schemaCode: i }) => (0, r._)`{limit: ${i}}`
    },
    code(i) {
      const { keyword: a, data: o, schemaCode: u, it: l } = i, c = a === "maxLength" ? r.operators.GT : r.operators.LT, g = l.opts.unicode === !1 ? (0, r._)`${o}.length` : (0, r._)`${(0, e.useFunc)(i.gen, t.default)}(${o})`;
      i.fail$data((0, r._)`${g} ${c} ${u}`);
    }
  };
  return er.default = s, er;
}
var rr = {}, na;
function cc() {
  if (na) return rr;
  na = 1, Object.defineProperty(rr, "__esModule", { value: !0 });
  const r = ke(), e = re(), n = {
    keyword: "pattern",
    type: "string",
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: s }) => (0, e.str)`must match pattern "${s}"`,
      params: ({ schemaCode: s }) => (0, e._)`{pattern: ${s}}`
    },
    code(s) {
      const { data: i, $data: a, schema: o, schemaCode: u, it: l } = s, c = l.opts.unicodeRegExp ? "u" : "", g = a ? (0, e._)`(new RegExp(${u}, ${c}))` : (0, r.usePattern)(s, o);
      s.fail$data((0, e._)`!${g}.test(${i})`);
    }
  };
  return rr.default = n, rr;
}
var nr = {}, sa;
function dc() {
  if (sa) return nr;
  sa = 1, Object.defineProperty(nr, "__esModule", { value: !0 });
  const r = re(), t = {
    keyword: ["maxProperties", "minProperties"],
    type: "object",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: n, schemaCode: s }) {
        const i = n === "maxProperties" ? "more" : "fewer";
        return (0, r.str)`must NOT have ${i} than ${s} properties`;
      },
      params: ({ schemaCode: n }) => (0, r._)`{limit: ${n}}`
    },
    code(n) {
      const { keyword: s, data: i, schemaCode: a } = n, o = s === "maxProperties" ? r.operators.GT : r.operators.LT;
      n.fail$data((0, r._)`Object.keys(${i}).length ${o} ${a}`);
    }
  };
  return nr.default = t, nr;
}
var sr = {}, ia;
function fc() {
  if (ia) return sr;
  ia = 1, Object.defineProperty(sr, "__esModule", { value: !0 });
  const r = ke(), e = re(), t = se(), s = {
    keyword: "required",
    type: "object",
    schemaType: "array",
    $data: !0,
    error: {
      message: ({ params: { missingProperty: i } }) => (0, e.str)`must have required property '${i}'`,
      params: ({ params: { missingProperty: i } }) => (0, e._)`{missingProperty: ${i}}`
    },
    code(i) {
      const { gen: a, schema: o, schemaCode: u, data: l, $data: c, it: g } = i, { opts: v } = g;
      if (!c && o.length === 0)
        return;
      const D = o.length >= v.loopRequired;
      if (g.allErrors ? A() : b(), v.strictRequired) {
        const d = i.parentSchema.properties, { definedProperties: m } = i.it;
        for (const E of o)
          if ((d == null ? void 0 : d[E]) === void 0 && !m.has(E)) {
            const f = g.schemaEnv.baseId + g.errSchemaPath, y = `required property "${E}" is not defined at "${f}" (strictRequired)`;
            (0, t.checkStrictMode)(g, y, g.opts.strictRequired);
          }
      }
      function A() {
        if (D || c)
          i.block$data(e.nil, p);
        else
          for (const d of o)
            (0, r.checkReportMissingProp)(i, d);
      }
      function b() {
        const d = a.let("missing");
        if (D || c) {
          const m = a.let("valid", !0);
          i.block$data(m, () => h(d, m)), i.ok(m);
        } else
          a.if((0, r.checkMissingProp)(i, o, d)), (0, r.reportMissingProp)(i, d), a.else();
      }
      function p() {
        a.forOf("prop", u, (d) => {
          i.setParams({ missingProperty: d }), a.if((0, r.noPropertyInData)(a, l, d, v.ownProperties), () => i.error());
        });
      }
      function h(d, m) {
        i.setParams({ missingProperty: d }), a.forOf(d, u, () => {
          a.assign(m, (0, r.propertyInData)(a, l, d, v.ownProperties)), a.if((0, e.not)(m), () => {
            i.error(), a.break();
          });
        }, e.nil);
      }
    }
  };
  return sr.default = s, sr;
}
var ir = {}, aa;
function hc() {
  if (aa) return ir;
  aa = 1, Object.defineProperty(ir, "__esModule", { value: !0 });
  const r = re(), t = {
    keyword: ["maxItems", "minItems"],
    type: "array",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: n, schemaCode: s }) {
        const i = n === "maxItems" ? "more" : "fewer";
        return (0, r.str)`must NOT have ${i} than ${s} items`;
      },
      params: ({ schemaCode: n }) => (0, r._)`{limit: ${n}}`
    },
    code(n) {
      const { keyword: s, data: i, schemaCode: a } = n, o = s === "maxItems" ? r.operators.GT : r.operators.LT;
      n.fail$data((0, r._)`${i}.length ${o} ${a}`);
    }
  };
  return ir.default = t, ir;
}
var ar = {}, or = {}, oa;
function Hs() {
  if (oa) return or;
  oa = 1, Object.defineProperty(or, "__esModule", { value: !0 });
  const r = _u();
  return r.code = 'require("ajv/dist/runtime/equal").default', or.default = r, or;
}
var ua;
function mc() {
  if (ua) return ar;
  ua = 1, Object.defineProperty(ar, "__esModule", { value: !0 });
  const r = Br(), e = re(), t = se(), n = Hs(), i = {
    keyword: "uniqueItems",
    type: "array",
    schemaType: "boolean",
    $data: !0,
    error: {
      message: ({ params: { i: a, j: o } }) => (0, e.str)`must NOT have duplicate items (items ## ${o} and ${a} are identical)`,
      params: ({ params: { i: a, j: o } }) => (0, e._)`{i: ${a}, j: ${o}}`
    },
    code(a) {
      const { gen: o, data: u, $data: l, schema: c, parentSchema: g, schemaCode: v, it: D } = a;
      if (!l && !c)
        return;
      const A = o.let("valid"), b = g.items ? (0, r.getSchemaTypes)(g.items) : [];
      a.block$data(A, p, (0, e._)`${v} === false`), a.ok(A);
      function p() {
        const E = o.let("i", (0, e._)`${u}.length`), f = o.let("j");
        a.setParams({ i: E, j: f }), o.assign(A, !0), o.if((0, e._)`${E} > 1`, () => (h() ? d : m)(E, f));
      }
      function h() {
        return b.length > 0 && !b.some((E) => E === "object" || E === "array");
      }
      function d(E, f) {
        const y = o.name("item"), w = (0, r.checkDataTypes)(b, y, D.opts.strictNumbers, r.DataType.Wrong), _ = o.const("indices", (0, e._)`{}`);
        o.for((0, e._)`;${E}--;`, () => {
          o.let(y, (0, e._)`${u}[${E}]`), o.if(w, (0, e._)`continue`), b.length > 1 && o.if((0, e._)`typeof ${y} == "string"`, (0, e._)`${y} += "_"`), o.if((0, e._)`typeof ${_}[${y}] == "number"`, () => {
            o.assign(f, (0, e._)`${_}[${y}]`), a.error(), o.assign(A, !1).break();
          }).code((0, e._)`${_}[${y}] = ${E}`);
        });
      }
      function m(E, f) {
        const y = (0, t.useFunc)(o, n.default), w = o.name("outer");
        o.label(w).for((0, e._)`;${E}--;`, () => o.for((0, e._)`${f} = ${E}; ${f}--;`, () => o.if((0, e._)`${y}(${u}[${E}], ${u}[${f}])`, () => {
          a.error(), o.assign(A, !1).break(w);
        })));
      }
    }
  };
  return ar.default = i, ar;
}
var ur = {}, la;
function pc() {
  if (la) return ur;
  la = 1, Object.defineProperty(ur, "__esModule", { value: !0 });
  const r = re(), e = se(), t = Hs(), s = {
    keyword: "const",
    $data: !0,
    error: {
      message: "must be equal to constant",
      params: ({ schemaCode: i }) => (0, r._)`{allowedValue: ${i}}`
    },
    code(i) {
      const { gen: a, data: o, $data: u, schemaCode: l, schema: c } = i;
      u || c && typeof c == "object" ? i.fail$data((0, r._)`!${(0, e.useFunc)(a, t.default)}(${o}, ${l})`) : i.fail((0, r._)`${c} !== ${o}`);
    }
  };
  return ur.default = s, ur;
}
var lr = {}, ca;
function gc() {
  if (ca) return lr;
  ca = 1, Object.defineProperty(lr, "__esModule", { value: !0 });
  const r = re(), e = se(), t = Hs(), s = {
    keyword: "enum",
    schemaType: "array",
    $data: !0,
    error: {
      message: "must be equal to one of the allowed values",
      params: ({ schemaCode: i }) => (0, r._)`{allowedValues: ${i}}`
    },
    code(i) {
      const { gen: a, data: o, $data: u, schema: l, schemaCode: c, it: g } = i;
      if (!u && l.length === 0)
        throw new Error("enum must have non-empty array");
      const v = l.length >= g.opts.loopEnum;
      let D;
      const A = () => D ?? (D = (0, e.useFunc)(a, t.default));
      let b;
      if (v || u)
        b = a.let("valid"), i.block$data(b, p);
      else {
        if (!Array.isArray(l))
          throw new Error("ajv implementation error");
        const d = a.const("vSchema", c);
        b = (0, r.or)(...l.map((m, E) => h(d, E)));
      }
      i.pass(b);
      function p() {
        a.assign(b, !1), a.forOf("v", c, (d) => a.if((0, r._)`${A()}(${o}, ${d})`, () => a.assign(b, !0).break()));
      }
      function h(d, m) {
        const E = l[m];
        return typeof E == "object" && E !== null ? (0, r._)`${A()}(${o}, ${d}[${m}])` : (0, r._)`${o} === ${E}`;
      }
    }
  };
  return lr.default = s, lr;
}
var da;
function yc() {
  if (da) return Jt;
  da = 1, Object.defineProperty(Jt, "__esModule", { value: !0 });
  const r = ac(), e = oc(), t = lc(), n = cc(), s = dc(), i = fc(), a = hc(), o = mc(), u = pc(), l = gc(), c = [
    // number
    r.default,
    e.default,
    // string
    t.default,
    n.default,
    // object
    s.default,
    i.default,
    // array
    a.default,
    o.default,
    // any
    { keyword: "type", schemaType: ["string", "array"] },
    { keyword: "nullable", schemaType: "boolean" },
    u.default,
    l.default
  ];
  return Jt.default = c, Jt;
}
var cr = {}, dt = {}, fa;
function Su() {
  if (fa) return dt;
  fa = 1, Object.defineProperty(dt, "__esModule", { value: !0 }), dt.validateAdditionalItems = void 0;
  const r = re(), e = se(), n = {
    keyword: "additionalItems",
    type: "array",
    schemaType: ["boolean", "object"],
    before: "uniqueItems",
    error: {
      message: ({ params: { len: i } }) => (0, r.str)`must NOT have more than ${i} items`,
      params: ({ params: { len: i } }) => (0, r._)`{limit: ${i}}`
    },
    code(i) {
      const { parentSchema: a, it: o } = i, { items: u } = a;
      if (!Array.isArray(u)) {
        (0, e.checkStrictMode)(o, '"additionalItems" is ignored when "items" is not an array of schemas');
        return;
      }
      s(i, u);
    }
  };
  function s(i, a) {
    const { gen: o, schema: u, data: l, keyword: c, it: g } = i;
    g.items = !0;
    const v = o.const("len", (0, r._)`${l}.length`);
    if (u === !1)
      i.setParams({ len: a.length }), i.pass((0, r._)`${v} <= ${a.length}`);
    else if (typeof u == "object" && !(0, e.alwaysValidSchema)(g, u)) {
      const A = o.var("valid", (0, r._)`${v} <= ${a.length}`);
      o.if((0, r.not)(A), () => D(A)), i.ok(A);
    }
    function D(A) {
      o.forRange("i", a.length, v, (b) => {
        i.subschema({ keyword: c, dataProp: b, dataPropType: e.Type.Num }, A), g.allErrors || o.if((0, r.not)(A), () => o.break());
      });
    }
  }
  return dt.validateAdditionalItems = s, dt.default = n, dt;
}
var dr = {}, ft = {}, ha;
function Ru() {
  if (ha) return ft;
  ha = 1, Object.defineProperty(ft, "__esModule", { value: !0 }), ft.validateTuple = void 0;
  const r = re(), e = se(), t = ke(), n = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "array", "boolean"],
    before: "uniqueItems",
    code(i) {
      const { schema: a, it: o } = i;
      if (Array.isArray(a))
        return s(i, "additionalItems", a);
      o.items = !0, !(0, e.alwaysValidSchema)(o, a) && i.ok((0, t.validateArray)(i));
    }
  };
  function s(i, a, o = i.schema) {
    const { gen: u, parentSchema: l, data: c, keyword: g, it: v } = i;
    b(l), v.opts.unevaluated && o.length && v.items !== !0 && (v.items = e.mergeEvaluated.items(u, o.length, v.items));
    const D = u.name("valid"), A = u.const("len", (0, r._)`${c}.length`);
    o.forEach((p, h) => {
      (0, e.alwaysValidSchema)(v, p) || (u.if((0, r._)`${A} > ${h}`, () => i.subschema({
        keyword: g,
        schemaProp: h,
        dataProp: h
      }, D)), i.ok(D));
    });
    function b(p) {
      const { opts: h, errSchemaPath: d } = v, m = o.length, E = m === p.minItems && (m === p.maxItems || p[a] === !1);
      if (h.strictTuples && !E) {
        const f = `"${g}" is ${m}-tuple, but minItems or maxItems/${a} are not specified or different at path "${d}"`;
        (0, e.checkStrictMode)(v, f, h.strictTuples);
      }
    }
  }
  return ft.validateTuple = s, ft.default = n, ft;
}
var ma;
function bc() {
  if (ma) return dr;
  ma = 1, Object.defineProperty(dr, "__esModule", { value: !0 });
  const r = Ru(), e = {
    keyword: "prefixItems",
    type: "array",
    schemaType: ["array"],
    before: "uniqueItems",
    code: (t) => (0, r.validateTuple)(t, "items")
  };
  return dr.default = e, dr;
}
var fr = {}, pa;
function Ec() {
  if (pa) return fr;
  pa = 1, Object.defineProperty(fr, "__esModule", { value: !0 });
  const r = re(), e = se(), t = ke(), n = Su(), i = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    error: {
      message: ({ params: { len: a } }) => (0, r.str)`must NOT have more than ${a} items`,
      params: ({ params: { len: a } }) => (0, r._)`{limit: ${a}}`
    },
    code(a) {
      const { schema: o, parentSchema: u, it: l } = a, { prefixItems: c } = u;
      l.items = !0, !(0, e.alwaysValidSchema)(l, o) && (c ? (0, n.validateAdditionalItems)(a, c) : a.ok((0, t.validateArray)(a)));
    }
  };
  return fr.default = i, fr;
}
var hr = {}, ga;
function vc() {
  if (ga) return hr;
  ga = 1, Object.defineProperty(hr, "__esModule", { value: !0 });
  const r = re(), e = se(), n = {
    keyword: "contains",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    trackErrors: !0,
    error: {
      message: ({ params: { min: s, max: i } }) => i === void 0 ? (0, r.str)`must contain at least ${s} valid item(s)` : (0, r.str)`must contain at least ${s} and no more than ${i} valid item(s)`,
      params: ({ params: { min: s, max: i } }) => i === void 0 ? (0, r._)`{minContains: ${s}}` : (0, r._)`{minContains: ${s}, maxContains: ${i}}`
    },
    code(s) {
      const { gen: i, schema: a, parentSchema: o, data: u, it: l } = s;
      let c, g;
      const { minContains: v, maxContains: D } = o;
      l.opts.next ? (c = v === void 0 ? 1 : v, g = D) : c = 1;
      const A = i.const("len", (0, r._)`${u}.length`);
      if (s.setParams({ min: c, max: g }), g === void 0 && c === 0) {
        (0, e.checkStrictMode)(l, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
        return;
      }
      if (g !== void 0 && c > g) {
        (0, e.checkStrictMode)(l, '"minContains" > "maxContains" is always invalid'), s.fail();
        return;
      }
      if ((0, e.alwaysValidSchema)(l, a)) {
        let m = (0, r._)`${A} >= ${c}`;
        g !== void 0 && (m = (0, r._)`${m} && ${A} <= ${g}`), s.pass(m);
        return;
      }
      l.items = !0;
      const b = i.name("valid");
      g === void 0 && c === 1 ? h(b, () => i.if(b, () => i.break())) : c === 0 ? (i.let(b, !0), g !== void 0 && i.if((0, r._)`${u}.length > 0`, p)) : (i.let(b, !1), p()), s.result(b, () => s.reset());
      function p() {
        const m = i.name("_valid"), E = i.let("count", 0);
        h(m, () => i.if(m, () => d(E)));
      }
      function h(m, E) {
        i.forRange("i", 0, A, (f) => {
          s.subschema({
            keyword: "contains",
            dataProp: f,
            dataPropType: e.Type.Num,
            compositeRule: !0
          }, m), E();
        });
      }
      function d(m) {
        i.code((0, r._)`${m}++`), g === void 0 ? i.if((0, r._)`${m} >= ${c}`, () => i.assign(b, !0).break()) : (i.if((0, r._)`${m} > ${g}`, () => i.assign(b, !1).break()), c === 1 ? i.assign(b, !0) : i.if((0, r._)`${m} >= ${c}`, () => i.assign(b, !0)));
      }
    }
  };
  return hr.default = n, hr;
}
var $n = {}, ya;
function Dc() {
  return ya || (ya = 1, function(r) {
    Object.defineProperty(r, "__esModule", { value: !0 }), r.validateSchemaDeps = r.validatePropertyDeps = r.error = void 0;
    const e = re(), t = se(), n = ke();
    r.error = {
      message: ({ params: { property: u, depsCount: l, deps: c } }) => {
        const g = l === 1 ? "property" : "properties";
        return (0, e.str)`must have ${g} ${c} when property ${u} is present`;
      },
      params: ({ params: { property: u, depsCount: l, deps: c, missingProperty: g } }) => (0, e._)`{property: ${u},
    missingProperty: ${g},
    depsCount: ${l},
    deps: ${c}}`
      // TODO change to reference
    };
    const s = {
      keyword: "dependencies",
      type: "object",
      schemaType: "object",
      error: r.error,
      code(u) {
        const [l, c] = i(u);
        a(u, l), o(u, c);
      }
    };
    function i({ schema: u }) {
      const l = {}, c = {};
      for (const g in u) {
        if (g === "__proto__")
          continue;
        const v = Array.isArray(u[g]) ? l : c;
        v[g] = u[g];
      }
      return [l, c];
    }
    function a(u, l = u.schema) {
      const { gen: c, data: g, it: v } = u;
      if (Object.keys(l).length === 0)
        return;
      const D = c.let("missing");
      for (const A in l) {
        const b = l[A];
        if (b.length === 0)
          continue;
        const p = (0, n.propertyInData)(c, g, A, v.opts.ownProperties);
        u.setParams({
          property: A,
          depsCount: b.length,
          deps: b.join(", ")
        }), v.allErrors ? c.if(p, () => {
          for (const h of b)
            (0, n.checkReportMissingProp)(u, h);
        }) : (c.if((0, e._)`${p} && (${(0, n.checkMissingProp)(u, b, D)})`), (0, n.reportMissingProp)(u, D), c.else());
      }
    }
    r.validatePropertyDeps = a;
    function o(u, l = u.schema) {
      const { gen: c, data: g, keyword: v, it: D } = u, A = c.name("valid");
      for (const b in l)
        (0, t.alwaysValidSchema)(D, l[b]) || (c.if(
          (0, n.propertyInData)(c, g, b, D.opts.ownProperties),
          () => {
            const p = u.subschema({ keyword: v, schemaProp: b }, A);
            u.mergeValidEvaluated(p, A);
          },
          () => c.var(A, !0)
          // TODO var
        ), u.ok(A));
    }
    r.validateSchemaDeps = o, r.default = s;
  }($n)), $n;
}
var mr = {}, ba;
function wc() {
  if (ba) return mr;
  ba = 1, Object.defineProperty(mr, "__esModule", { value: !0 });
  const r = re(), e = se(), n = {
    keyword: "propertyNames",
    type: "object",
    schemaType: ["object", "boolean"],
    error: {
      message: "property name must be valid",
      params: ({ params: s }) => (0, r._)`{propertyName: ${s.propertyName}}`
    },
    code(s) {
      const { gen: i, schema: a, data: o, it: u } = s;
      if ((0, e.alwaysValidSchema)(u, a))
        return;
      const l = i.name("valid");
      i.forIn("key", o, (c) => {
        s.setParams({ propertyName: c }), s.subschema({
          keyword: "propertyNames",
          data: c,
          dataTypes: ["string"],
          propertyName: c,
          compositeRule: !0
        }, l), i.if((0, r.not)(l), () => {
          s.error(!0), u.allErrors || i.break();
        });
      }), s.ok(l);
    }
  };
  return mr.default = n, mr;
}
var pr = {}, Ea;
function Tu() {
  if (Ea) return pr;
  Ea = 1, Object.defineProperty(pr, "__esModule", { value: !0 });
  const r = ke(), e = re(), t = et(), n = se(), i = {
    keyword: "additionalProperties",
    type: ["object"],
    schemaType: ["boolean", "object"],
    allowUndefined: !0,
    trackErrors: !0,
    error: {
      message: "must NOT have additional properties",
      params: ({ params: a }) => (0, e._)`{additionalProperty: ${a.additionalProperty}}`
    },
    code(a) {
      const { gen: o, schema: u, parentSchema: l, data: c, errsCount: g, it: v } = a;
      if (!g)
        throw new Error("ajv implementation error");
      const { allErrors: D, opts: A } = v;
      if (v.props = !0, A.removeAdditional !== "all" && (0, n.alwaysValidSchema)(v, u))
        return;
      const b = (0, r.allSchemaProperties)(l.properties), p = (0, r.allSchemaProperties)(l.patternProperties);
      h(), a.ok((0, e._)`${g} === ${t.default.errors}`);
      function h() {
        o.forIn("key", c, (y) => {
          !b.length && !p.length ? E(y) : o.if(d(y), () => E(y));
        });
      }
      function d(y) {
        let w;
        if (b.length > 8) {
          const _ = (0, n.schemaRefOrVal)(v, l.properties, "properties");
          w = (0, r.isOwnProperty)(o, _, y);
        } else b.length ? w = (0, e.or)(...b.map((_) => (0, e._)`${y} === ${_}`)) : w = e.nil;
        return p.length && (w = (0, e.or)(w, ...p.map((_) => (0, e._)`${(0, r.usePattern)(a, _)}.test(${y})`))), (0, e.not)(w);
      }
      function m(y) {
        o.code((0, e._)`delete ${c}[${y}]`);
      }
      function E(y) {
        if (A.removeAdditional === "all" || A.removeAdditional && u === !1) {
          m(y);
          return;
        }
        if (u === !1) {
          a.setParams({ additionalProperty: y }), a.error(), D || o.break();
          return;
        }
        if (typeof u == "object" && !(0, n.alwaysValidSchema)(v, u)) {
          const w = o.name("valid");
          A.removeAdditional === "failing" ? (f(y, w, !1), o.if((0, e.not)(w), () => {
            a.reset(), m(y);
          })) : (f(y, w), D || o.if((0, e.not)(w), () => o.break()));
        }
      }
      function f(y, w, _) {
        const O = {
          keyword: "additionalProperties",
          dataProp: y,
          dataPropType: n.Type.Str
        };
        _ === !1 && Object.assign(O, {
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }), a.subschema(O, w);
      }
    }
  };
  return pr.default = i, pr;
}
var gr = {}, va;
function Ac() {
  if (va) return gr;
  va = 1, Object.defineProperty(gr, "__esModule", { value: !0 });
  const r = Kr(), e = ke(), t = se(), n = Tu(), s = {
    keyword: "properties",
    type: "object",
    schemaType: "object",
    code(i) {
      const { gen: a, schema: o, parentSchema: u, data: l, it: c } = i;
      c.opts.removeAdditional === "all" && u.additionalProperties === void 0 && n.default.code(new r.KeywordCxt(c, n.default, "additionalProperties"));
      const g = (0, e.allSchemaProperties)(o);
      for (const p of g)
        c.definedProperties.add(p);
      c.opts.unevaluated && g.length && c.props !== !0 && (c.props = t.mergeEvaluated.props(a, (0, t.toHash)(g), c.props));
      const v = g.filter((p) => !(0, t.alwaysValidSchema)(c, o[p]));
      if (v.length === 0)
        return;
      const D = a.name("valid");
      for (const p of v)
        A(p) ? b(p) : (a.if((0, e.propertyInData)(a, l, p, c.opts.ownProperties)), b(p), c.allErrors || a.else().var(D, !0), a.endIf()), i.it.definedProperties.add(p), i.ok(D);
      function A(p) {
        return c.opts.useDefaults && !c.compositeRule && o[p].default !== void 0;
      }
      function b(p) {
        i.subschema({
          keyword: "properties",
          schemaProp: p,
          dataProp: p
        }, D);
      }
    }
  };
  return gr.default = s, gr;
}
var yr = {}, Da;
function Cc() {
  if (Da) return yr;
  Da = 1, Object.defineProperty(yr, "__esModule", { value: !0 });
  const r = ke(), e = re(), t = se(), n = se(), s = {
    keyword: "patternProperties",
    type: "object",
    schemaType: "object",
    code(i) {
      const { gen: a, schema: o, data: u, parentSchema: l, it: c } = i, { opts: g } = c, v = (0, r.allSchemaProperties)(o), D = v.filter((E) => (0, t.alwaysValidSchema)(c, o[E]));
      if (v.length === 0 || D.length === v.length && (!c.opts.unevaluated || c.props === !0))
        return;
      const A = g.strictSchema && !g.allowMatchingProperties && l.properties, b = a.name("valid");
      c.props !== !0 && !(c.props instanceof e.Name) && (c.props = (0, n.evaluatedPropsToName)(a, c.props));
      const { props: p } = c;
      h();
      function h() {
        for (const E of v)
          A && d(E), c.allErrors ? m(E) : (a.var(b, !0), m(E), a.if(b));
      }
      function d(E) {
        for (const f in A)
          new RegExp(E).test(f) && (0, t.checkStrictMode)(c, `property ${f} matches pattern ${E} (use allowMatchingProperties)`);
      }
      function m(E) {
        a.forIn("key", u, (f) => {
          a.if((0, e._)`${(0, r.usePattern)(i, E)}.test(${f})`, () => {
            const y = D.includes(E);
            y || i.subschema({
              keyword: "patternProperties",
              schemaProp: E,
              dataProp: f,
              dataPropType: n.Type.Str
            }, b), c.opts.unevaluated && p !== !0 ? a.assign((0, e._)`${p}[${f}]`, !0) : !y && !c.allErrors && a.if((0, e.not)(b), () => a.break());
          });
        });
      }
    }
  };
  return yr.default = s, yr;
}
var br = {}, wa;
function $c() {
  if (wa) return br;
  wa = 1, Object.defineProperty(br, "__esModule", { value: !0 });
  const r = se(), e = {
    keyword: "not",
    schemaType: ["object", "boolean"],
    trackErrors: !0,
    code(t) {
      const { gen: n, schema: s, it: i } = t;
      if ((0, r.alwaysValidSchema)(i, s)) {
        t.fail();
        return;
      }
      const a = n.name("valid");
      t.subschema({
        keyword: "not",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, a), t.failResult(a, () => t.reset(), () => t.error());
    },
    error: { message: "must NOT be valid" }
  };
  return br.default = e, br;
}
var Er = {}, Aa;
function _c() {
  if (Aa) return Er;
  Aa = 1, Object.defineProperty(Er, "__esModule", { value: !0 });
  const e = {
    keyword: "anyOf",
    schemaType: "array",
    trackErrors: !0,
    code: ke().validateUnion,
    error: { message: "must match a schema in anyOf" }
  };
  return Er.default = e, Er;
}
var vr = {}, Ca;
function Sc() {
  if (Ca) return vr;
  Ca = 1, Object.defineProperty(vr, "__esModule", { value: !0 });
  const r = re(), e = se(), n = {
    keyword: "oneOf",
    schemaType: "array",
    trackErrors: !0,
    error: {
      message: "must match exactly one schema in oneOf",
      params: ({ params: s }) => (0, r._)`{passingSchemas: ${s.passing}}`
    },
    code(s) {
      const { gen: i, schema: a, parentSchema: o, it: u } = s;
      if (!Array.isArray(a))
        throw new Error("ajv implementation error");
      if (u.opts.discriminator && o.discriminator)
        return;
      const l = a, c = i.let("valid", !1), g = i.let("passing", null), v = i.name("_valid");
      s.setParams({ passing: g }), i.block(D), s.result(c, () => s.reset(), () => s.error(!0));
      function D() {
        l.forEach((A, b) => {
          let p;
          (0, e.alwaysValidSchema)(u, A) ? i.var(v, !0) : p = s.subschema({
            keyword: "oneOf",
            schemaProp: b,
            compositeRule: !0
          }, v), b > 0 && i.if((0, r._)`${v} && ${c}`).assign(c, !1).assign(g, (0, r._)`[${g}, ${b}]`).else(), i.if(v, () => {
            i.assign(c, !0), i.assign(g, b), p && s.mergeEvaluated(p, r.Name);
          });
        });
      }
    }
  };
  return vr.default = n, vr;
}
var Dr = {}, $a;
function Rc() {
  if ($a) return Dr;
  $a = 1, Object.defineProperty(Dr, "__esModule", { value: !0 });
  const r = se(), e = {
    keyword: "allOf",
    schemaType: "array",
    code(t) {
      const { gen: n, schema: s, it: i } = t;
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const a = n.name("valid");
      s.forEach((o, u) => {
        if ((0, r.alwaysValidSchema)(i, o))
          return;
        const l = t.subschema({ keyword: "allOf", schemaProp: u }, a);
        t.ok(a), t.mergeEvaluated(l);
      });
    }
  };
  return Dr.default = e, Dr;
}
var wr = {}, _a;
function Tc() {
  if (_a) return wr;
  _a = 1, Object.defineProperty(wr, "__esModule", { value: !0 });
  const r = re(), e = se(), n = {
    keyword: "if",
    schemaType: ["object", "boolean"],
    trackErrors: !0,
    error: {
      message: ({ params: i }) => (0, r.str)`must match "${i.ifClause}" schema`,
      params: ({ params: i }) => (0, r._)`{failingKeyword: ${i.ifClause}}`
    },
    code(i) {
      const { gen: a, parentSchema: o, it: u } = i;
      o.then === void 0 && o.else === void 0 && (0, e.checkStrictMode)(u, '"if" without "then" and "else" is ignored');
      const l = s(u, "then"), c = s(u, "else");
      if (!l && !c)
        return;
      const g = a.let("valid", !0), v = a.name("_valid");
      if (D(), i.reset(), l && c) {
        const b = a.let("ifClause");
        i.setParams({ ifClause: b }), a.if(v, A("then", b), A("else", b));
      } else l ? a.if(v, A("then")) : a.if((0, r.not)(v), A("else"));
      i.pass(g, () => i.error(!0));
      function D() {
        const b = i.subschema({
          keyword: "if",
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }, v);
        i.mergeEvaluated(b);
      }
      function A(b, p) {
        return () => {
          const h = i.subschema({ keyword: b }, v);
          a.assign(g, v), i.mergeValidEvaluated(h, g), p ? a.assign(p, (0, r._)`${b}`) : i.setParams({ ifClause: b });
        };
      }
    }
  };
  function s(i, a) {
    const o = i.schema[a];
    return o !== void 0 && !(0, e.alwaysValidSchema)(i, o);
  }
  return wr.default = n, wr;
}
var Ar = {}, Sa;
function Nc() {
  if (Sa) return Ar;
  Sa = 1, Object.defineProperty(Ar, "__esModule", { value: !0 });
  const r = se(), e = {
    keyword: ["then", "else"],
    schemaType: ["object", "boolean"],
    code({ keyword: t, parentSchema: n, it: s }) {
      n.if === void 0 && (0, r.checkStrictMode)(s, `"${t}" without "if" is ignored`);
    }
  };
  return Ar.default = e, Ar;
}
var Ra;
function Fc() {
  if (Ra) return cr;
  Ra = 1, Object.defineProperty(cr, "__esModule", { value: !0 });
  const r = Su(), e = bc(), t = Ru(), n = Ec(), s = vc(), i = Dc(), a = wc(), o = Tu(), u = Ac(), l = Cc(), c = $c(), g = _c(), v = Sc(), D = Rc(), A = Tc(), b = Nc();
  function p(h = !1) {
    const d = [
      // any
      c.default,
      g.default,
      v.default,
      D.default,
      A.default,
      b.default,
      // object
      a.default,
      o.default,
      i.default,
      u.default,
      l.default
    ];
    return h ? d.push(e.default, n.default) : d.push(r.default, t.default), d.push(s.default), d;
  }
  return cr.default = p, cr;
}
var Cr = {}, $r = {}, Ta;
function Pc() {
  if (Ta) return $r;
  Ta = 1, Object.defineProperty($r, "__esModule", { value: !0 });
  const r = re(), t = {
    keyword: "format",
    type: ["number", "string"],
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: n }) => (0, r.str)`must match format "${n}"`,
      params: ({ schemaCode: n }) => (0, r._)`{format: ${n}}`
    },
    code(n, s) {
      const { gen: i, data: a, $data: o, schema: u, schemaCode: l, it: c } = n, { opts: g, errSchemaPath: v, schemaEnv: D, self: A } = c;
      if (!g.validateFormats)
        return;
      o ? b() : p();
      function b() {
        const h = i.scopeValue("formats", {
          ref: A.formats,
          code: g.code.formats
        }), d = i.const("fDef", (0, r._)`${h}[${l}]`), m = i.let("fType"), E = i.let("format");
        i.if((0, r._)`typeof ${d} == "object" && !(${d} instanceof RegExp)`, () => i.assign(m, (0, r._)`${d}.type || "string"`).assign(E, (0, r._)`${d}.validate`), () => i.assign(m, (0, r._)`"string"`).assign(E, d)), n.fail$data((0, r.or)(f(), y()));
        function f() {
          return g.strictSchema === !1 ? r.nil : (0, r._)`${l} && !${E}`;
        }
        function y() {
          const w = D.$async ? (0, r._)`(${d}.async ? await ${E}(${a}) : ${E}(${a}))` : (0, r._)`${E}(${a})`, _ = (0, r._)`(typeof ${E} == "function" ? ${w} : ${E}.test(${a}))`;
          return (0, r._)`${E} && ${E} !== true && ${m} === ${s} && !${_}`;
        }
      }
      function p() {
        const h = A.formats[u];
        if (!h) {
          f();
          return;
        }
        if (h === !0)
          return;
        const [d, m, E] = y(h);
        d === s && n.pass(w());
        function f() {
          if (g.strictSchema === !1) {
            A.logger.warn(_());
            return;
          }
          throw new Error(_());
          function _() {
            return `unknown format "${u}" ignored in schema at path "${v}"`;
          }
        }
        function y(_) {
          const O = _ instanceof RegExp ? (0, r.regexpCode)(_) : g.code.formats ? (0, r._)`${g.code.formats}${(0, r.getProperty)(u)}` : void 0, U = i.scopeValue("formats", { key: u, ref: _, code: O });
          return typeof _ == "object" && !(_ instanceof RegExp) ? [_.type || "string", _.validate, (0, r._)`${U}.validate`] : ["string", _, U];
        }
        function w() {
          if (typeof h == "object" && !(h instanceof RegExp) && h.async) {
            if (!D.$async)
              throw new Error("async format in sync schema");
            return (0, r._)`await ${E}(${a})`;
          }
          return typeof m == "function" ? (0, r._)`${E}(${a})` : (0, r._)`${E}.test(${a})`;
        }
      }
    }
  };
  return $r.default = t, $r;
}
var Na;
function Ic() {
  if (Na) return Cr;
  Na = 1, Object.defineProperty(Cr, "__esModule", { value: !0 });
  const e = [Pc().default];
  return Cr.default = e, Cr;
}
var st = {}, Fa;
function Oc() {
  return Fa || (Fa = 1, Object.defineProperty(st, "__esModule", { value: !0 }), st.contentVocabulary = st.metadataVocabulary = void 0, st.metadataVocabulary = [
    "title",
    "description",
    "default",
    "deprecated",
    "readOnly",
    "writeOnly",
    "examples"
  ], st.contentVocabulary = [
    "contentMediaType",
    "contentEncoding",
    "contentSchema"
  ]), st;
}
var Pa;
function kc() {
  if (Pa) return Wt;
  Pa = 1, Object.defineProperty(Wt, "__esModule", { value: !0 });
  const r = ic(), e = yc(), t = Fc(), n = Ic(), s = Oc(), i = [
    r.default,
    e.default,
    (0, t.default)(),
    n.default,
    s.metadataVocabulary,
    s.contentVocabulary
  ];
  return Wt.default = i, Wt;
}
var _r = {}, Tt = {}, Ia;
function qc() {
  if (Ia) return Tt;
  Ia = 1, Object.defineProperty(Tt, "__esModule", { value: !0 }), Tt.DiscrError = void 0;
  var r;
  return function(e) {
    e.Tag = "tag", e.Mapping = "mapping";
  }(r || (Tt.DiscrError = r = {})), Tt;
}
var Oa;
function xc() {
  if (Oa) return _r;
  Oa = 1, Object.defineProperty(_r, "__esModule", { value: !0 });
  const r = re(), e = qc(), t = Vs(), n = Wr(), s = se(), a = {
    keyword: "discriminator",
    type: "object",
    schemaType: "object",
    error: {
      message: ({ params: { discrError: o, tagName: u } }) => o === e.DiscrError.Tag ? `tag "${u}" must be string` : `value of tag "${u}" must be in oneOf`,
      params: ({ params: { discrError: o, tag: u, tagName: l } }) => (0, r._)`{error: ${o}, tag: ${l}, tagValue: ${u}}`
    },
    code(o) {
      const { gen: u, data: l, schema: c, parentSchema: g, it: v } = o, { oneOf: D } = g;
      if (!v.opts.discriminator)
        throw new Error("discriminator: requires discriminator option");
      const A = c.propertyName;
      if (typeof A != "string")
        throw new Error("discriminator: requires propertyName");
      if (c.mapping)
        throw new Error("discriminator: mapping is not supported");
      if (!D)
        throw new Error("discriminator: requires oneOf keyword");
      const b = u.let("valid", !1), p = u.const("tag", (0, r._)`${l}${(0, r.getProperty)(A)}`);
      u.if((0, r._)`typeof ${p} == "string"`, () => h(), () => o.error(!1, { discrError: e.DiscrError.Tag, tag: p, tagName: A })), o.ok(b);
      function h() {
        const E = m();
        u.if(!1);
        for (const f in E)
          u.elseIf((0, r._)`${p} === ${f}`), u.assign(b, d(E[f]));
        u.else(), o.error(!1, { discrError: e.DiscrError.Mapping, tag: p, tagName: A }), u.endIf();
      }
      function d(E) {
        const f = u.name("valid"), y = o.subschema({ keyword: "oneOf", schemaProp: E }, f);
        return o.mergeEvaluated(y, r.Name), f;
      }
      function m() {
        var E;
        const f = {}, y = _(g);
        let w = !0;
        for (let G = 0; G < D.length; G++) {
          let Z = D[G];
          if (Z != null && Z.$ref && !(0, s.schemaHasRulesButRef)(Z, v.self.RULES)) {
            const x = Z.$ref;
            if (Z = t.resolveRef.call(v.self, v.schemaEnv.root, v.baseId, x), Z instanceof t.SchemaEnv && (Z = Z.schema), Z === void 0)
              throw new n.default(v.opts.uriResolver, v.baseId, x);
          }
          const J = (E = Z == null ? void 0 : Z.properties) === null || E === void 0 ? void 0 : E[A];
          if (typeof J != "object")
            throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${A}"`);
          w = w && (y || _(Z)), O(J, G);
        }
        if (!w)
          throw new Error(`discriminator: "${A}" must be required`);
        return f;
        function _({ required: G }) {
          return Array.isArray(G) && G.includes(A);
        }
        function O(G, Z) {
          if (G.const)
            U(G.const, Z);
          else if (G.enum)
            for (const J of G.enum)
              U(J, Z);
          else
            throw new Error(`discriminator: "properties/${A}" must have "const" or "enum"`);
        }
        function U(G, Z) {
          if (typeof G != "string" || G in f)
            throw new Error(`discriminator: "${A}" values must be unique strings`);
          f[G] = Z;
        }
      }
    }
  };
  return _r.default = a, _r;
}
const Lc = "http://json-schema.org/draft-07/schema#", Bc = "http://json-schema.org/draft-07/schema#", jc = "Core schema meta-schema", Mc = { schemaArray: { type: "array", minItems: 1, items: { $ref: "#" } }, nonNegativeInteger: { type: "integer", minimum: 0 }, nonNegativeIntegerDefault0: { allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }] }, simpleTypes: { enum: ["array", "boolean", "integer", "null", "number", "object", "string"] }, stringArray: { type: "array", items: { type: "string" }, uniqueItems: !0, default: [] } }, Uc = ["object", "boolean"], Vc = { $id: { type: "string", format: "uri-reference" }, $schema: { type: "string", format: "uri" }, $ref: { type: "string", format: "uri-reference" }, $comment: { type: "string" }, title: { type: "string" }, description: { type: "string" }, default: !0, readOnly: { type: "boolean", default: !1 }, examples: { type: "array", items: !0 }, multipleOf: { type: "number", exclusiveMinimum: 0 }, maximum: { type: "number" }, exclusiveMaximum: { type: "number" }, minimum: { type: "number" }, exclusiveMinimum: { type: "number" }, maxLength: { $ref: "#/definitions/nonNegativeInteger" }, minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, pattern: { type: "string", format: "regex" }, additionalItems: { $ref: "#" }, items: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }], default: !0 }, maxItems: { $ref: "#/definitions/nonNegativeInteger" }, minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, uniqueItems: { type: "boolean", default: !1 }, contains: { $ref: "#" }, maxProperties: { $ref: "#/definitions/nonNegativeInteger" }, minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, required: { $ref: "#/definitions/stringArray" }, additionalProperties: { $ref: "#" }, definitions: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, properties: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, patternProperties: { type: "object", additionalProperties: { $ref: "#" }, propertyNames: { format: "regex" }, default: {} }, dependencies: { type: "object", additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] } }, propertyNames: { $ref: "#" }, const: !0, enum: { type: "array", items: !0, minItems: 1, uniqueItems: !0 }, type: { anyOf: [{ $ref: "#/definitions/simpleTypes" }, { type: "array", items: { $ref: "#/definitions/simpleTypes" }, minItems: 1, uniqueItems: !0 }] }, format: { type: "string" }, contentMediaType: { type: "string" }, contentEncoding: { type: "string" }, if: { $ref: "#" }, then: { $ref: "#" }, else: { $ref: "#" }, allOf: { $ref: "#/definitions/schemaArray" }, anyOf: { $ref: "#/definitions/schemaArray" }, oneOf: { $ref: "#/definitions/schemaArray" }, not: { $ref: "#" } }, Hc = {
  $schema: Lc,
  $id: Bc,
  title: jc,
  definitions: Mc,
  type: Uc,
  properties: Vc,
  default: !0
};
var ka;
function Gc() {
  return ka || (ka = 1, function(r, e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.MissingRefError = e.ValidationError = e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = e.Ajv = void 0;
    const t = rc(), n = kc(), s = xc(), i = Hc, a = ["/properties"], o = "http://json-schema.org/draft-07/schema";
    class u extends t.default {
      _addVocabularies() {
        super._addVocabularies(), n.default.forEach((A) => this.addVocabulary(A)), this.opts.discriminator && this.addKeyword(s.default);
      }
      _addDefaultMetaSchema() {
        if (super._addDefaultMetaSchema(), !this.opts.meta)
          return;
        const A = this.opts.$data ? this.$dataMetaSchema(i, a) : i;
        this.addMetaSchema(A, o, !1), this.refs["http://json-schema.org/schema"] = o;
      }
      defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(o) ? o : void 0);
      }
    }
    e.Ajv = u, r.exports = e = u, r.exports.Ajv = u, Object.defineProperty(e, "__esModule", { value: !0 }), e.default = u;
    var l = Kr();
    Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
      return l.KeywordCxt;
    } });
    var c = re();
    Object.defineProperty(e, "_", { enumerable: !0, get: function() {
      return c._;
    } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
      return c.str;
    } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
      return c.stringify;
    } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
      return c.nil;
    } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
      return c.Name;
    } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
      return c.CodeGen;
    } });
    var g = Us();
    Object.defineProperty(e, "ValidationError", { enumerable: !0, get: function() {
      return g.default;
    } });
    var v = Wr();
    Object.defineProperty(e, "MissingRefError", { enumerable: !0, get: function() {
      return v.default;
    } });
  }(Vt, Vt.exports)), Vt.exports;
}
var zc = Gc();
const Gs = /* @__PURE__ */ Ll(zc);
function We(r, e = "or") {
  switch (r.length) {
    case 0:
      return "";
    case 1:
      return r[0];
    case 2:
      return `${r[0]} ${e} ${r[1]}`;
    default:
      return `${r.slice(0, -1).join(", ")} ${e} ${r.slice(-1)[0]}`;
  }
}
function FE(r) {
  return r;
}
function Kc(...r) {
  return (e) => r.some((n) => e.hasAttribute(n)) ? null : `requires ${We(r.map((n) => `"${n}"`))} attribute to be present`;
}
function Wc(...r) {
  return (e) => {
    const t = r.filter((s) => e.hasAttribute(s));
    return t.length === 0 ? null : `cannot be used at the same time as ${We(t.map((s) => `"${s}"`))}`;
  };
}
function Xc(r, e, { defaultValue: t } = {}) {
  return (n) => {
    const s = n.getAttribute(r);
    if (s && typeof s != "string")
      return null;
    const i = s || t;
    if (i && e.includes(i.toLocaleLowerCase()))
      return null;
    const a = We(e.map((o) => `"${o}"`));
    return `"${r}" attribute must be ${a}`;
  };
}
function Yc(...r) {
  return (e) => r.some((s) => e.closest(s)) ? null : `requires ${We(r.map((s) => `<${s}>`))} as parent`;
}
const Jc = {
  allowedIfAttributeIsPresent: Kc,
  allowedIfAttributeIsAbsent: Wc,
  allowedIfAttributeHasValue: Xc,
  allowedIfParentIsPresent: Yc
}, {
  allowedIfAttributeIsPresent: ye,
  allowedIfAttributeIsAbsent: _n,
  allowedIfAttributeHasValue: Ae,
  allowedIfParentIsPresent: Nt
} = Jc, qa = "/\\S+/", ht = [
  "",
  "no-referrer",
  "no-referrer-when-downgrade",
  "same-origin",
  "origin",
  "strict-origin",
  "origin-when-cross-origin",
  "strict-origin-when-cross-origin",
  "unsafe-url"
];
function Sr(r) {
  const e = [
    "article",
    "aside",
    "main",
    "nav",
    "section",
    '[role="article"]',
    '[role="complementary"]',
    '[role="main"]',
    '[role="navigation"]',
    '[role="region"]'
  ];
  return !!r.closest(e.join(","));
}
function xa(r) {
  if (r.hasAttribute("itemprop"))
    return !0;
  const e = r.getAttribute("rel");
  if (!e || typeof e != "string")
    return !1;
  const t = [
    "dns-prefetch",
    "modulepreload",
    "pingback",
    "preconnect",
    "prefetch",
    "preload",
    "stylesheet"
  ];
  return e.toLowerCase().split(/\s+/).some((s) => t.includes(s));
}
var Nu = {
  "*": {
    attributes: {
      contenteditable: {
        omit: !0,
        enum: ["true", "false"]
      },
      contextmenu: {
        deprecated: !0
      },
      dir: {
        enum: ["ltr", "rtl", "auto"]
      },
      draggable: {
        enum: ["true", "false"]
      },
      hidden: {
        boolean: !0
      },
      id: {
        enum: [qa]
      },
      inert: {
        boolean: !0
      },
      spellcheck: {
        omit: !0,
        enum: ["true", "false"]
      },
      tabindex: {
        enum: ["/-?\\d+/"]
      }
    }
  },
  a: {
    flow: !0,
    focusable(r) {
      return r.hasAttribute("href");
    },
    phrasing: !0,
    interactive: !0,
    transparent: !0,
    attributes: {
      charset: {
        deprecated: !0
      },
      coords: {
        deprecated: !0
      },
      datafld: {
        deprecated: !0
      },
      datasrc: {
        deprecated: !0
      },
      download: {
        allowed: ye("href"),
        omit: !0,
        enum: ["/.+/"]
      },
      href: {
        enum: ["/.*/"]
      },
      hreflang: {
        allowed: ye("href")
      },
      itemprop: {
        allowed: ye("href")
      },
      methods: {
        deprecated: !0
      },
      name: {
        deprecated: !0
      },
      ping: {
        allowed: ye("href")
      },
      referrerpolicy: {
        allowed: ye("href"),
        enum: ht
      },
      rel: {
        allowed(r, e) {
          if (!r.hasAttribute("href"))
            return 'requires "href" attribute to be present';
          if (!e || e === "" || typeof e != "string")
            return null;
          const t = [
            /* whatwg */
            "canonical",
            "dns-prefetch",
            "expect",
            "icon",
            "manifest",
            "modulepreload",
            "pingback",
            "preconnect",
            "prefetch",
            "preload",
            "stylesheet",
            /* microformats.org */
            "apple-touch-icon",
            "apple-touch-icon-precomposed",
            "apple-touch-startup-image",
            "authorization_endpoint",
            "component",
            "chrome-webstore-item",
            "dns-prefetch",
            "edit",
            "gbfs",
            "gtfs-static",
            "gtfs-realtime",
            "import",
            "mask-icon",
            "meta",
            "micropub",
            "openid.delegate",
            "openid.server",
            "openid2.local_id",
            "openid2.provider",
            "p3pv1",
            "pgpkey",
            "schema.dcterms",
            "service",
            "shortlink",
            "sitemap",
            "subresource",
            "sword",
            "timesheet",
            "token_endpoint",
            "wlwmanifest",
            "stylesheet/less",
            "token_endpoint",
            "yandex-tableau-widget"
          ], n = e.toLowerCase().split(/\s+/);
          for (const s of n) {
            if (t.includes(s))
              return `<a> does not allow rel="${s}"`;
            if (s.startsWith("dcterms."))
              return `<a> does not allow rel="${s}"`;
          }
          return null;
        },
        list: !0,
        enum: ["/.+/"]
      },
      shape: {
        deprecated: !0
      },
      target: {
        allowed: ye("href"),
        enum: ["/[^_].*/", "_blank", "_self", "_parent", "_top"]
      },
      type: {
        allowed: ye("href")
      },
      urn: {
        deprecated: !0
      }
    },
    permittedDescendants: [{ exclude: "@interactive" }],
    aria: {
      implicitRole(r) {
        return r.hasAttribute("href") ? "link" : "generic";
      },
      naming(r) {
        return r.hasAttribute("href") ? "allowed" : "prohibited";
      }
    }
  },
  abbr: {
    flow: !0,
    phrasing: !0,
    permittedContent: ["@phrasing"],
    aria: {
      naming: "prohibited"
    }
  },
  acronym: {
    deprecated: {
      message: "use <abbr> instead",
      documentation: "`<abbr>` can be used as a replacement.",
      source: "html5"
    }
  },
  address: {
    flow: !0,
    aria: {
      implicitRole: "group"
    },
    permittedContent: ["@flow"],
    permittedDescendants: [{ exclude: ["address", "header", "footer", "@heading", "@sectioning"] }]
  },
  applet: {
    deprecated: {
      source: "html5"
    },
    attributes: {
      datafld: {
        deprecated: !0
      },
      datasrc: {
        deprecated: !0
      }
    }
  },
  area: {
    flow(r) {
      return !!r.closest("map");
    },
    focusable(r) {
      return r.hasAttribute("href");
    },
    phrasing(r) {
      return !!r.closest("map");
    },
    void: !0,
    attributes: {
      alt: {},
      coords: {
        allowed(r) {
          return r.getAttribute("shape") === "default" ? 'cannot be used when "shape" attribute is "default"' : null;
        }
      },
      download: {
        allowed: ye("href")
      },
      nohref: {
        deprecated: !0
      },
      itemprop: {
        allowed: ye("href")
      },
      ping: {
        allowed: ye("href")
      },
      referrerpolicy: {
        allowed: ye("href"),
        enum: ht
      },
      rel: {
        allowed(r, e) {
          if (!r.hasAttribute("href"))
            return 'requires "href" attribute to be present';
          if (!e || e === "" || typeof e != "string")
            return null;
          const t = [
            /* whatwg */
            "canonical",
            "dns-prefetch",
            "expect",
            "icon",
            "manifest",
            "modulepreload",
            "pingback",
            "preconnect",
            "prefetch",
            "preload",
            "stylesheet",
            /* microformats.org */
            "apple-touch-icon",
            "apple-touch-icon-precomposed",
            "apple-touch-startup-image",
            "authorization_endpoint",
            "component",
            "chrome-webstore-item",
            "dns-prefetch",
            "edit",
            "gbfs",
            "gtfs-static",
            "gtfs-realtime",
            "import",
            "mask-icon",
            "meta",
            "micropub",
            "openid.delegate",
            "openid.server",
            "openid2.local_id",
            "openid2.provider",
            "p3pv1",
            "pgpkey",
            "schema.dcterms",
            "service",
            "shortlink",
            "sitemap",
            "subresource",
            "sword",
            "timesheet",
            "token_endpoint",
            "wlwmanifest",
            "stylesheet/less",
            "token_endpoint",
            "yandex-tableau-widget"
          ], n = e.toLowerCase().split(/\s+/);
          for (const s of n) {
            if (t.includes(s))
              return `<area> does not allow rel="${s}"`;
            if (s.startsWith("dcterms."))
              return `<area> does not allow rel="${s}"`;
          }
          return null;
        }
      },
      shape: {
        allowed(r, e) {
          switch (e ?? "rect") {
            case "circ":
            case "circle":
            case "poly":
            case "polygon":
            case "rect":
            case "rectangle":
              return ye("coords")(r, e);
            default:
              return null;
          }
        },
        enum: ["rect", "circle", "poly", "default"]
      },
      target: {
        allowed: ye("href"),
        enum: ["/[^_].*/", "_blank", "_self", "_parent", "_top"]
      }
    },
    aria: {
      implicitRole(r) {
        return r.hasAttribute("href") ? "link" : "generic";
      },
      naming(r) {
        return r.hasAttribute("href") ? "allowed" : "prohibited";
      }
    },
    requiredAncestors: ["map"]
  },
  article: {
    flow: !0,
    sectioning: !0,
    permittedContent: ["@flow"],
    permittedDescendants: [{ exclude: ["main"] }],
    aria: {
      implicitRole: "article"
    }
  },
  aside: {
    flow: !0,
    sectioning: !0,
    permittedContent: ["@flow"],
    permittedDescendants: [{ exclude: ["main"] }],
    aria: {
      implicitRole: "complementary"
    }
  },
  audio: {
    flow: !0,
    focusable(r) {
      return r.hasAttribute("controls");
    },
    phrasing: !0,
    embedded: !0,
    interactive(r) {
      return r.hasAttribute("controls");
    },
    transparent: ["@flow"],
    attributes: {
      crossorigin: {
        omit: !0,
        enum: ["anonymous", "use-credentials"]
      },
      itemprop: {
        allowed: ye("src")
      },
      preload: {
        omit: !0,
        enum: ["none", "metadata", "auto"]
      }
    },
    permittedContent: ["@flow", "track", "source"],
    permittedDescendants: [{ exclude: ["audio", "video"] }],
    permittedOrder: ["source", "track", "@flow"]
  },
  b: {
    flow: !0,
    phrasing: !0,
    permittedContent: ["@phrasing"],
    aria: {
      implicitRole: "generic",
      naming: "prohibited"
    }
  },
  base: {
    metadata: !0,
    void: !0,
    permittedParent: ["head"],
    aria: {
      naming: "prohibited"
    }
  },
  basefont: {
    deprecated: {
      message: "use CSS instead",
      documentation: "Use CSS `font-size` property instead.",
      source: "html4"
    }
  },
  bdi: {
    flow: !0,
    phrasing: !0,
    permittedContent: ["@phrasing"],
    aria: {
      implicitRole: "generic",
      naming: "prohibited"
    }
  },
  bdo: {
    flow: !0,
    phrasing: !0,
    permittedContent: ["@phrasing"],
    aria: {
      implicitRole: "generic",
      naming: "prohibited"
    }
  },
  bgsound: {
    deprecated: {
      message: "use <audio> instead",
      documentation: "Use the `<audio>` element instead but consider accessibility concerns with autoplaying sounds.",
      source: "non-standard"
    }
  },
  big: {
    deprecated: {
      message: "use CSS instead",
      documentation: "Use CSS `font-size` property instead.",
      source: "html5"
    }
  },
  blink: {
    deprecated: {
      documentation: "`<blink>` has no direct replacement and blinking text is frowned upon by accessibility standards.",
      source: "non-standard"
    }
  },
  blockquote: {
    flow: !0,
    sectioning: !0,
    aria: {
      implicitRole: "blockquote"
    },
    permittedContent: ["@flow"]
  },
  body: {
    permittedContent: ["@flow"],
    permittedParent: ["html"],
    attributes: {
      alink: {
        deprecated: !0
      },
      background: {
        deprecated: !0
      },
      bgcolor: {
        deprecated: !0
      },
      link: {
        deprecated: !0
      },
      marginbottom: {
        deprecated: !0
      },
      marginheight: {
        deprecated: !0
      },
      marginleft: {
        deprecated: !0
      },
      marginright: {
        deprecated: !0
      },
      margintop: {
        deprecated: !0
      },
      marginwidth: {
        deprecated: !0
      },
      text: {
        deprecated: !0
      },
      vlink: {
        deprecated: !0
      }
    },
    aria: {
      implicitRole: "generic",
      naming: "prohibited"
    }
  },
  br: {
    flow: !0,
    phrasing: !0,
    void: !0,
    attributes: {
      clear: {
        deprecated: !0
      }
    },
    aria: {
      naming: "prohibited"
    }
  },
  button: {
    flow: !0,
    focusable: !0,
    phrasing: !0,
    interactive: !0,
    formAssociated: {
      disablable: !0,
      listed: !0
    },
    labelable: !0,
    attributes: {
      autofocus: {
        boolean: !0
      },
      datafld: {
        deprecated: !0
      },
      dataformatas: {
        deprecated: !0
      },
      datasrc: {
        deprecated: !0
      },
      disabled: {
        boolean: !0
      },
      formaction: {
        allowed: Ae("type", ["submit"], { defaultValue: "submit" })
      },
      formenctype: {
        allowed: Ae("type", ["submit"], { defaultValue: "submit" })
      },
      formmethod: {
        allowed: Ae("type", ["submit"], { defaultValue: "submit" }),
        enum: ["get", "post", "dialog"]
      },
      formnovalidate: {
        allowed: Ae("type", ["submit"], { defaultValue: "submit" }),
        boolean: !0
      },
      formtarget: {
        allowed: Ae("type", ["submit"], { defaultValue: "submit" }),
        enum: ["/[^_].*/", "_blank", "_self", "_parent", "_top"]
      },
      type: {
        enum: ["submit", "reset", "button"]
      }
    },
    aria: {
      implicitRole: "button"
    },
    permittedContent: ["@phrasing"],
    permittedDescendants: [{ exclude: ["@interactive"] }],
    textContent: "accessible"
  },
  canvas: {
    flow: !0,
    phrasing: !0,
    embedded: !0,
    transparent: !0
  },
  caption: {
    permittedContent: ["@flow"],
    permittedDescendants: [{ exclude: ["table"] }],
    attributes: {
      align: {
        deprecated: !0
      }
    },
    aria: {
      implicitRole: "caption",
      naming: "prohibited"
    }
  },
  center: {
    deprecated: {
      message: "use CSS instead",
      documentation: "Use the CSS `text-align` or `margin: auto` properties instead.",
      source: "html4"
    }
  },
  cite: {
    flow: !0,
    phrasing: !0,
    permittedContent: ["@phrasing"],
    aria: {
      naming: "prohibited"
    }
  },
  code: {
    flow: !0,
    phrasing: !0,
    permittedContent: ["@phrasing"],
    aria: {
      implicitRole: "code",
      naming: "prohibited"
    }
  },
  col: {
    attributes: {
      align: {
        deprecated: !0
      },
      char: {
        deprecated: !0
      },
      charoff: {
        deprecated: !0
      },
      span: {
        enum: ["/\\d+/"]
      },
      valign: {
        deprecated: !0
      },
      width: {
        deprecated: !0
      }
    },
    void: !0,
    aria: {
      naming: "prohibited"
    }
  },
  colgroup: {
    implicitClosed: ["colgroup"],
    attributes: {
      span: {
        enum: ["/\\d+/"]
      }
    },
    permittedContent: ["col", "template"],
    aria: {
      naming: "prohibited"
    }
  },
  data: {
    flow: !0,
    phrasing: !0,
    permittedContent: ["@phrasing"],
    aria: {
      implicitRole: "generic",
      naming: "prohibited"
    }
  },
  datalist: {
    flow: !0,
    phrasing: !0,
    aria: {
      implicitRole: "listbox",
      naming: "prohibited"
    },
    permittedContent: ["@phrasing", "option"]
  },
  dd: {
    implicitClosed: ["dd", "dt"],
    permittedContent: ["@flow"],
    requiredAncestors: ["dl > dd", "dl > div > dd"]
  },
  del: {
    flow: !0,
    phrasing: !0,
    transparent: !0,
    aria: {
      implicitRole: "deletion",
      naming: "prohibited"
    }
  },
  details: {
    flow: !0,
    sectioning: !0,
    interactive: !0,
    attributes: {
      open: {
        boolean: !0
      }
    },
    aria: {
      implicitRole: "group"
    },
    permittedContent: ["summary", "@flow"],
    permittedOrder: ["summary", "@flow"],
    requiredContent: ["summary"]
  },
  dfn: {
    flow: !0,
    phrasing: !0,
    aria: {
      implicitRole: "term"
    },
    permittedContent: ["@phrasing"],
    permittedDescendants: [{ exclude: ["dfn"] }]
  },
  dialog: {
    flow: !0,
    permittedContent: ["@flow"],
    attributes: {
      open: {
        boolean: !0
      }
    },
    aria: {
      implicitRole: "dialog"
    }
  },
  dir: {
    deprecated: {
      documentation: "The non-standard `<dir>` element has no direct replacement but MDN recommends replacing with `<ul>` and CSS.",
      source: "html4"
    }
  },
  div: {
    flow: !0,
    permittedContent: ["@flow", "dt", "dd"],
    attributes: {
      align: {
        deprecated: !0
      },
      datafld: {
        deprecated: !0
      },
      dataformatas: {
        deprecated: !0
      },
      datasrc: {
        deprecated: !0
      }
    },
    aria: {
      implicitRole: "generic",
      naming: "prohibited"
    }
  },
  dl: {
    flow: !0,
    permittedContent: ["@script", "dt", "dd", "div"],
    attributes: {
      compact: {
        deprecated: !0
      }
    }
  },
  dt: {
    implicitClosed: ["dd", "dt"],
    permittedContent: ["@flow"],
    permittedDescendants: [{ exclude: ["header", "footer", "@sectioning", "@heading"] }],
    requiredAncestors: ["dl > dt", "dl > div > dt"]
  },
  em: {
    flow: !0,
    phrasing: !0,
    permittedContent: ["@phrasing"],
    aria: {
      implicitRole: "emphasis",
      naming: "prohibited"
    }
  },
  embed: {
    flow: !0,
    phrasing: !0,
    embedded: !0,
    interactive: !0,
    void: !0,
    attributes: {
      height: {
        enum: ["/\\d+/"]
      },
      src: {
        required: !0,
        enum: ["/.+/"]
      },
      title: {
        required: !0
      },
      width: {
        enum: ["/\\d+/"]
      }
    }
  },
  fieldset: {
    flow: !0,
    formAssociated: {
      disablable: !0,
      listed: !0
    },
    attributes: {
      datafld: {
        deprecated: !0
      },
      disabled: {
        boolean: !0
      }
    },
    aria: {
      implicitRole: "group"
    },
    permittedContent: ["@flow", "legend?"],
    permittedOrder: ["legend", "@flow"]
  },
  figcaption: {
    permittedContent: ["@flow"],
    aria: {
      naming: "prohibited"
    }
  },
  figure: {
    flow: !0,
    aria: {
      implicitRole: "figure"
    },
    permittedContent: ["@flow", "figcaption?"],
    permittedOrder: ["figcaption", "@flow", "figcaption"]
  },
  font: {
    deprecated: {
      message: "use CSS instead",
      documentation: "Use CSS font properties instead.",
      source: "html4"
    }
  },
  footer: {
    flow: !0,
    aria: {
      implicitRole(r) {
        return Sr(r) ? "generic" : "contentinfo";
      },
      naming(r) {
        return Sr(r) ? "prohibited" : "allowed";
      }
    },
    permittedContent: ["@flow"],
    permittedDescendants: [{ exclude: ["header", "footer", "main"] }]
  },
  form: {
    flow: !0,
    form: !0,
    attributes: {
      action: {
        enum: [/^\s*\S+\s*$/]
      },
      accept: {
        deprecated: !0
      },
      autocomplete: {
        enum: ["on", "off"]
      },
      method: {
        enum: ["get", "post", "dialog"]
      },
      novalidate: {
        boolean: !0
      },
      rel: {
        allowed(r, e) {
          if (!e || e === "" || typeof e != "string")
            return null;
          const t = [
            /* whatwg */
            "alternate",
            "canonical",
            "author",
            "bookmark",
            "dns-prefetch",
            "expect",
            "icon",
            "manifest",
            "modulepreload",
            "pingback",
            "preconnect",
            "prefetch",
            "preload",
            "privacy-policy",
            "stylesheet",
            "tag",
            "terms-of-service"
          ], n = e.toLowerCase().split(/\s+/);
          for (const s of n)
            if (t.includes(s))
              return `<form> does not allow rel="${s}"`;
          return null;
        },
        list: !0,
        enum: ["/.+/"]
      },
      target: {
        enum: ["/[^_].*/", "_blank", "_self", "_parent", "_top"]
      }
    },
    aria: {
      implicitRole: "form"
    },
    permittedContent: ["@flow"],
    permittedDescendants: [{ exclude: ["@form"] }]
  },
  frame: {
    deprecated: {
      documentation: "The `<frame>` element can be replaced with the `<iframe>` element but a better solution is to remove usage of frames entirely.",
      source: "html5"
    },
    attributes: {
      datafld: {
        deprecated: !0
      },
      datasrc: {
        deprecated: !0
      },
      title: {
        required: !0
      }
    }
  },
  frameset: {
    deprecated: {
      documentation: "The `<frameset>` element can be replaced with the `<iframe>` element but a better solution is to remove usage of frames entirely.",
      source: "html5"
    }
  },
  h1: {
    flow: !0,
    heading: !0,
    permittedContent: ["@phrasing"],
    attributes: {
      align: {
        deprecated: !0
      }
    },
    aria: {
      implicitRole: "heading"
    }
  },
  h2: {
    flow: !0,
    heading: !0,
    permittedContent: ["@phrasing"],
    attributes: {
      align: {
        deprecated: !0
      }
    },
    aria: {
      implicitRole: "heading"
    }
  },
  h3: {
    flow: !0,
    heading: !0,
    permittedContent: ["@phrasing"],
    attributes: {
      align: {
        deprecated: !0
      }
    },
    aria: {
      implicitRole: "heading"
    }
  },
  h4: {
    flow: !0,
    heading: !0,
    permittedContent: ["@phrasing"],
    attributes: {
      align: {
        deprecated: !0
      }
    },
    aria: {
      implicitRole: "heading"
    }
  },
  h5: {
    flow: !0,
    heading: !0,
    permittedContent: ["@phrasing"],
    attributes: {
      align: {
        deprecated: !0
      }
    },
    aria: {
      implicitRole: "heading"
    }
  },
  h6: {
    flow: !0,
    heading: !0,
    permittedContent: ["@phrasing"],
    attributes: {
      align: {
        deprecated: !0
      }
    },
    aria: {
      implicitRole: "heading"
    }
  },
  head: {
    permittedContent: ["base?", "title?", "@meta"],
    permittedParent: ["html"],
    requiredContent: ["title"],
    attributes: {
      profile: {
        deprecated: !0
      }
    },
    aria: {
      naming: "prohibited"
    }
  },
  header: {
    flow: !0,
    aria: {
      implicitRole(r) {
        return Sr(r) ? "generic" : "banner";
      },
      naming(r) {
        return Sr(r) ? "prohibited" : "allowed";
      }
    },
    permittedContent: ["@flow"],
    permittedDescendants: [{ exclude: ["header", "footer", "main"] }]
  },
  hgroup: {
    flow: !0,
    heading: !0,
    permittedContent: ["p", "@heading?"],
    permittedDescendants: [{ exclude: ["hgroup"] }],
    requiredContent: ["@heading"],
    aria: {
      implicitRole: "group"
    }
  },
  hr: {
    flow: !0,
    void: !0,
    attributes: {
      align: {
        deprecated: !0
      },
      color: {
        deprecated: !0
      },
      noshade: {
        deprecated: !0
      },
      size: {
        deprecated: !0
      },
      width: {
        deprecated: !0
      }
    },
    aria: {
      implicitRole: "separator"
    }
  },
  html: {
    permittedContent: ["head?", "body?"],
    permittedOrder: ["head", "body"],
    requiredContent: ["head", "body"],
    attributes: {
      lang: {
        required: !0
      },
      version: {
        deprecated: !0
      }
    },
    aria: {
      implicitRole: "document",
      naming: "prohibited"
    }
  },
  i: {
    flow: !0,
    phrasing: !0,
    permittedContent: ["@phrasing"],
    aria: {
      implicitRole: "generic",
      naming: "prohibited"
    }
  },
  iframe: {
    flow: !0,
    phrasing: !0,
    embedded: !0,
    interactive: !0,
    attributes: {
      align: {
        deprecated: !0
      },
      allowtransparency: {
        deprecated: !0
      },
      datafld: {
        deprecated: !0
      },
      datasrc: {
        deprecated: !0
      },
      frameborder: {
        deprecated: !0
      },
      height: {
        enum: ["/\\d+/"]
      },
      hspace: {
        deprecated: !0
      },
      marginheight: {
        deprecated: !0
      },
      marginwidth: {
        deprecated: !0
      },
      referrerpolicy: {
        enum: ht
      },
      scrolling: {
        deprecated: !0
      },
      src: {
        enum: ["/.+/"]
      },
      title: {
        required: !0
      },
      vspace: {
        deprecated: !0
      },
      width: {
        enum: ["/\\d+/"]
      }
    },
    permittedContent: []
  },
  img: {
    flow: !0,
    phrasing: !0,
    embedded: !0,
    interactive(r) {
      return r.hasAttribute("usemap");
    },
    void: !0,
    attributes: {
      align: {
        deprecated: !0
      },
      border: {
        deprecated: !0
      },
      crossorigin: {
        omit: !0,
        enum: ["anonymous", "use-credentials"]
      },
      datafld: {
        deprecated: !0
      },
      datasrc: {
        deprecated: !0
      },
      decoding: {
        enum: ["sync", "async", "auto"]
      },
      height: {
        enum: ["/\\d+/"]
      },
      hspace: {
        deprecated: !0
      },
      ismap: {
        boolean: !0
      },
      lowsrc: {
        deprecated: !0
      },
      name: {
        deprecated: !0
      },
      referrerpolicy: {
        enum: ht
      },
      src: {
        required: !0,
        enum: ["/.+/"]
      },
      srcset: {
        enum: ["/[^]+/"]
      },
      vspace: {
        deprecated: !0
      },
      width: {
        enum: ["/\\d+/"]
      }
    },
    aria: {
      implicitRole(r) {
        const e = r.getAttribute("alt"), t = r.getAttribute("aria-label"), n = r.getAttribute("aria-labelledby"), s = r.getAttribute("title");
        return e === "" && !t && !n && !s ? "none" : "img";
      },
      naming(r) {
        const e = r.getAttribute("alt"), t = r.getAttribute("aria-label"), n = r.getAttribute("aria-labelledby"), s = r.getAttribute("title");
        return !e && !t && !n && !s ? "prohibited" : "allowed";
      }
    }
  },
  input: {
    flow: !0,
    focusable(r) {
      return r.getAttribute("type") !== "hidden";
    },
    phrasing: !0,
    interactive(r) {
      return r.getAttribute("type") !== "hidden";
    },
    void: !0,
    formAssociated: {
      disablable: !0,
      listed: !0
    },
    labelable(r) {
      return r.getAttribute("type") !== "hidden";
    },
    attributes: {
      align: {
        deprecated: !0
      },
      autofocus: {
        boolean: !0
      },
      capture: {
        omit: !0,
        enum: ["environment", "user"]
      },
      checked: {
        boolean: !0
      },
      datafld: {
        deprecated: !0
      },
      dataformatas: {
        deprecated: !0
      },
      datasrc: {
        deprecated: !0
      },
      disabled: {
        boolean: !0
      },
      formaction: {
        allowed: Ae("type", ["submit", "image"], {
          defaultValue: "submit"
        })
      },
      formenctype: {
        allowed: Ae("type", ["submit", "image"], {
          defaultValue: "submit"
        })
      },
      formmethod: {
        allowed: Ae("type", ["submit", "image"], {
          defaultValue: "submit"
        }),
        enum: ["get", "post", "dialog"]
      },
      formnovalidate: {
        allowed: Ae("type", ["submit", "image"], {
          defaultValue: "submit"
        }),
        boolean: !0
      },
      formtarget: {
        allowed: Ae("type", ["submit", "image"], {
          defaultValue: "submit"
        }),
        enum: ["/[^_].*/", "_blank", "_self", "_parent", "_top"]
      },
      hspace: {
        deprecated: !0
      },
      inputmode: {
        enum: ["none", "text", "decimal", "numeric", "tel", "search", "email", "url"]
      },
      ismap: {
        deprecated: !0
      },
      multiple: {
        boolean: !0
      },
      readonly: {
        boolean: !0
      },
      required: {
        boolean: !0
      },
      type: {
        enum: [
          "button",
          "checkbox",
          "color",
          "date",
          "datetime-local",
          "email",
          "file",
          "hidden",
          "image",
          "month",
          "number",
          "password",
          "radio",
          "range",
          "reset",
          "search",
          "submit",
          "tel",
          "text",
          "time",
          "url",
          "week"
        ]
      },
      usemap: {
        deprecated: !0
      },
      vspace: {
        deprecated: !0
      }
    },
    aria: {
      /* eslint-disable-next-line complexity -- the standard is complicated */
      implicitRole(r) {
        if (r.hasAttribute("list"))
          return "combobox";
        switch (r.getAttribute("type")) {
          case "button":
            return "button";
          case "checkbox":
            return "checkbox";
          case "color":
            return null;
          case "date":
            return null;
          case "datetime-local":
            return null;
          case "email":
            return "textbox";
          case "file":
            return null;
          case "hidden":
            return null;
          case "image":
            return "button";
          case "month":
            return null;
          case "number":
            return "spinbutton";
          case "password":
            return null;
          case "radio":
            return "radio";
          case "range":
            return "slider";
          case "reset":
            return "button";
          case "search":
            return "searchbox";
          case "submit":
            return "button";
          case "tel":
            return "textbox";
          case "text":
            return "textbox";
          case "time":
            return null;
          case "url":
            return "textbox";
          case "week":
            return null;
          default:
            return "textbox";
        }
      },
      naming(r) {
        return r.getAttribute("type") !== "hidden" ? "allowed" : "prohibited";
      }
    }
  },
  ins: {
    flow: !0,
    phrasing: !0,
    transparent: !0,
    aria: {
      implicitRole: "insertion",
      naming: "prohibited"
    }
  },
  isindex: {
    deprecated: {
      source: "html4"
    }
  },
  kbd: {
    flow: !0,
    phrasing: !0,
    permittedContent: ["@phrasing"],
    aria: {
      naming: "prohibited"
    }
  },
  keygen: {
    flow: !0,
    phrasing: !0,
    interactive: !0,
    void: !0,
    labelable: !0,
    deprecated: !0
  },
  label: {
    flow: !0,
    phrasing: !0,
    interactive: !0,
    permittedContent: ["@phrasing"],
    permittedDescendants: [{ exclude: ["label"] }],
    attributes: {
      datafld: {
        deprecated: !0
      },
      dataformatas: {
        deprecated: !0
      },
      datasrc: {
        deprecated: !0
      },
      for: {
        enum: [qa]
      }
    },
    aria: {
      naming: "prohibited"
    }
  },
  legend: {
    permittedContent: ["@phrasing", "@heading"],
    attributes: {
      align: {
        deprecated: !0
      },
      datafld: {
        deprecated: !0
      },
      dataformatas: {
        deprecated: !0
      },
      datasrc: {
        deprecated: !0
      }
    },
    aria: {
      naming: "prohibited"
    }
  },
  li: {
    implicitClosed: ["li"],
    permittedContent: ["@flow"],
    permittedParent: ["ul", "ol", "menu", "template"],
    attributes: {
      type: {
        deprecated: !0
      }
    },
    aria: {
      implicitRole(r) {
        return r.closest("ul, ol, menu") ? "listitem" : "generic";
      }
    }
  },
  link: {
    metadata: !0,
    flow(r) {
      return xa(r);
    },
    phrasing(r) {
      return xa(r);
    },
    void: !0,
    attributes: {
      as: {
        allowed: Ae("rel", ["prefetch", "preload", "modulepreload"]),
        enum: [
          "audio",
          "audioworklet",
          "document",
          "embed",
          "fetch",
          "font",
          "frame",
          "iframe",
          "image",
          "manifest",
          "object",
          "paintworklet",
          "report",
          "script",
          "serviceworker",
          "sharedworker",
          "style",
          "track",
          "video",
          "webidentity",
          "worker",
          "xslt"
        ]
      },
      blocking: {
        allowed: Ae("rel", ["stylesheet", "preload", "modulepreload"]),
        list: !0,
        enum: ["render"]
      },
      charset: {
        deprecated: !0
      },
      crossorigin: {
        omit: !0,
        enum: ["anonymous", "use-credentials"]
      },
      disabled: {
        allowed: Ae("rel", ["stylesheet"]),
        boolean: !0
      },
      href: {
        required: !0,
        enum: ["/.+/"]
      },
      integrity: {
        allowed: Ae("rel", ["stylesheet", "preload", "modulepreload"]),
        enum: ["/.+/"]
      },
      methods: {
        deprecated: !0
      },
      referrerpolicy: {
        enum: ht
      },
      rel: {
        allowed(r, e) {
          if (!e || e === "" || typeof e != "string")
            return null;
          const t = [
            /* whatwg */
            "bookmark",
            "external",
            "nofollow",
            "noopener",
            "noreferrer",
            "opener",
            "tag",
            /* microformats.org */
            "disclosure",
            "entry-content",
            "lightbox",
            "lightvideo"
          ], n = e.toLowerCase().split(/\s+/);
          for (const s of n)
            if (t.includes(s))
              return `<link> does not allow rel="${s}"`;
          return null;
        },
        list: !0,
        enum: ["/.+/"]
      },
      target: {
        deprecated: !0
      },
      urn: {
        deprecated: !0
      }
    },
    aria: {
      naming: "prohibited"
    }
  },
  listing: {
    deprecated: {
      source: "html32"
    }
  },
  main: {
    flow: !0,
    aria: {
      implicitRole: "main"
    }
  },
  map: {
    flow: !0,
    phrasing: !0,
    transparent: !0,
    attributes: {
      name: {
        required: !0,
        enum: ["/\\S+/"]
      }
    },
    aria: {
      naming: "prohibited"
    }
  },
  mark: {
    flow: !0,
    phrasing: !0,
    permittedContent: ["@phrasing"],
    aria: {
      naming: "prohibited"
    }
  },
  marquee: {
    deprecated: {
      documentation: "Marked as obsolete by both W3C and WHATWG standards but still implemented in most browsers. Animated text should be avoided for accessibility reasons as well.",
      source: "html5"
    },
    attributes: {
      datafld: {
        deprecated: !0
      },
      dataformatas: {
        deprecated: !0
      },
      datasrc: {
        deprecated: !0
      }
    }
  },
  math: {
    flow: !0,
    foreign: !0,
    phrasing: !0,
    embedded: !0,
    attributes: {
      align: {
        deprecated: !0
      },
      dir: {
        enum: ["ltr", "rtl"]
      },
      display: {
        enum: ["block", "inline"]
      },
      hspace: {
        deprecated: !0
      },
      name: {
        deprecated: !0
      },
      overflow: {
        enum: ["linebreak", "scroll", "elide", "truncate", "scale"]
      },
      vspace: {
        deprecated: !0
      }
    },
    aria: {
      implicitRole: "math"
    }
  },
  menu: {
    flow: !0,
    aria: {
      implicitRole: "list"
    },
    permittedContent: ["@script", "li"]
  },
  meta: {
    flow(r) {
      return r.hasAttribute("itemprop");
    },
    phrasing(r) {
      return r.hasAttribute("itemprop");
    },
    metadata: !0,
    void: !0,
    attributes: {
      charset: {
        enum: ["utf-8"]
      },
      content: {
        allowed: ye("name", "http-equiv", "itemprop", "property")
      },
      itemprop: {
        allowed: _n("http-equiv", "name")
      },
      name: {
        allowed: _n("http-equiv", "itemprop")
      },
      "http-equiv": {
        allowed: _n("name", "itemprop")
      },
      scheme: {
        deprecated: !0
      }
    },
    aria: {
      naming: "prohibited"
    }
  },
  meter: {
    flow: !0,
    phrasing: !0,
    labelable: !0,
    aria: {
      implicitRole: "meter"
    },
    permittedContent: ["@phrasing"],
    permittedDescendants: [{ exclude: "meter" }]
  },
  multicol: {
    deprecated: {
      message: "use CSS instead",
      documentation: "Use CSS columns instead.",
      source: "html5"
    }
  },
  nav: {
    flow: !0,
    sectioning: !0,
    aria: {
      implicitRole: "navigation"
    },
    permittedContent: ["@flow"],
    permittedDescendants: [{ exclude: "main" }]
  },
  nextid: {
    deprecated: {
      source: "html32"
    }
  },
  nobr: {
    deprecated: {
      message: "use CSS instead",
      documentation: "Use CSS `white-space` property instead.",
      source: "non-standard"
    }
  },
  noembed: {
    deprecated: {
      source: "non-standard"
    }
  },
  noframes: {
    deprecated: {
      source: "html5"
    }
  },
  noscript: {
    metadata: !0,
    flow: !0,
    phrasing: !0,
    transparent: !0,
    permittedDescendants: [{ exclude: "noscript" }],
    aria: {
      naming: "prohibited"
    }
  },
  object: {
    flow: !0,
    phrasing: !0,
    embedded: !0,
    interactive(r) {
      return r.hasAttribute("usemap");
    },
    transparent: !0,
    formAssociated: {
      disablable: !1,
      listed: !0
    },
    attributes: {
      align: {
        deprecated: !0
      },
      archive: {
        deprecated: !0
      },
      blocking: {
        list: !0,
        enum: ["render"]
      },
      border: {
        deprecated: !0
      },
      classid: {
        deprecated: !0
      },
      code: {
        deprecated: !0
      },
      codebase: {
        deprecated: !0
      },
      codetype: {
        deprecated: !0
      },
      data: {
        enum: ["/.+/"],
        required: !0
      },
      datafld: {
        deprecated: !0
      },
      dataformatas: {
        deprecated: !0
      },
      datasrc: {
        deprecated: !0
      },
      declare: {
        deprecated: !0
      },
      height: {
        enum: ["/\\d+/"]
      },
      hspace: {
        deprecated: !0
      },
      name: {
        enum: ["/[^_].*/"]
      },
      standby: {
        deprecated: !0
      },
      vspace: {
        deprecated: !0
      },
      width: {
        enum: ["/\\d+/"]
      }
    },
    permittedContent: ["param", "@flow"],
    permittedOrder: ["param", "@flow"]
  },
  ol: {
    flow: !0,
    attributes: {
      compact: {
        deprecated: !0
      },
      reversed: {
        boolean: !0
      },
      type: {
        enum: ["a", "A", "i", "I", "1"]
      }
    },
    aria: {
      implicitRole: "list"
    },
    permittedContent: ["@script", "li"]
  },
  optgroup: {
    implicitClosed: ["optgroup"],
    attributes: {
      disabled: {
        boolean: !0
      }
    },
    aria: {
      implicitRole: "group"
    },
    permittedContent: ["@script", "option"]
  },
  option: {
    implicitClosed: ["option"],
    attributes: {
      dataformatas: {
        deprecated: !0
      },
      datasrc: {
        deprecated: !0
      },
      disabled: {
        boolean: !0
      },
      name: {
        deprecated: !0
      },
      selected: {
        boolean: !0
      }
    },
    aria: {
      implicitRole: "option"
    },
    permittedContent: []
  },
  output: {
    flow: !0,
    phrasing: !0,
    formAssociated: {
      disablable: !1,
      listed: !0
    },
    labelable: !0,
    aria: {
      implicitRole: "status"
    },
    permittedContent: ["@phrasing"]
  },
  p: {
    flow: !0,
    implicitClosed: [
      "address",
      "article",
      "aside",
      "blockquote",
      "div",
      "dl",
      "fieldset",
      "footer",
      "form",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "header",
      "hgroup",
      "hr",
      "main",
      "nav",
      "ol",
      "p",
      "pre",
      "section",
      "table",
      "ul"
    ],
    permittedContent: ["@phrasing"],
    attributes: {
      align: {
        deprecated: !0
      }
    },
    aria: {
      implicitRole: "paragraph",
      naming: "prohibited"
    }
  },
  param: {
    void: !0,
    attributes: {
      datafld: {
        deprecated: !0
      },
      type: {
        deprecated: !0
      },
      valuetype: {
        deprecated: !0
      }
    },
    aria: {
      naming: "prohibited"
    }
  },
  picture: {
    flow: !0,
    phrasing: !0,
    embedded: !0,
    permittedContent: ["@script", "source", "img"],
    permittedOrder: ["source", "img"],
    aria: {
      naming: "prohibited"
    }
  },
  plaintext: {
    deprecated: {
      message: "use <pre> or CSS instead",
      documentation: "Use the `<pre>` element or use CSS to set a monospace font.",
      source: "html2"
    }
  },
  pre: {
    flow: !0,
    permittedContent: ["@phrasing"],
    attributes: {
      width: {
        deprecated: !0
      }
    },
    aria: {
      implicitRole: "generic",
      naming: "prohibited"
    }
  },
  progress: {
    flow: !0,
    phrasing: !0,
    labelable: !0,
    aria: {
      implicitRole: "progressbar"
    },
    permittedContent: ["@phrasing"],
    permittedDescendants: [{ exclude: "progress" }]
  },
  q: {
    flow: !0,
    phrasing: !0,
    permittedContent: ["@phrasing"],
    aria: {
      implicitRole: "generic",
      naming: "prohibited"
    }
  },
  rb: {
    implicitClosed: ["rb", "rt", "rtc", "rp"],
    permittedContent: ["@phrasing"]
  },
  rp: {
    implicitClosed: ["rb", "rt", "rtc", "rp"],
    permittedContent: ["@phrasing"],
    aria: {
      naming: "prohibited"
    }
  },
  rt: {
    implicitClosed: ["rb", "rt", "rtc", "rp"],
    permittedContent: ["@phrasing"],
    aria: {
      naming: "prohibited"
    }
  },
  rtc: {
    implicitClosed: ["rb", "rtc", "rp"],
    permittedContent: ["@phrasing", "rt"]
  },
  ruby: {
    flow: !0,
    phrasing: !0,
    permittedContent: ["@phrasing", "rb", "rp", "rt", "rtc"]
  },
  s: {
    flow: !0,
    phrasing: !0,
    permittedContent: ["@phrasing"],
    aria: {
      implicitRole: "deletion",
      naming: "prohibited"
    }
  },
  samp: {
    flow: !0,
    phrasing: !0,
    permittedContent: ["@phrasing"],
    aria: {
      implicitRole: "generic",
      naming: "prohibited"
    }
  },
  script: {
    metadata: !0,
    flow: !0,
    phrasing: !0,
    scriptSupporting: !0,
    attributes: {
      async: {
        boolean: !0
      },
      crossorigin: {
        omit: !0,
        enum: ["anonymous", "use-credentials"]
      },
      defer: {
        boolean: !0
      },
      event: {
        deprecated: !0
      },
      for: {
        deprecated: !0
      },
      integrity: {
        allowed: ye("src"),
        enum: ["/.+/"]
      },
      language: {
        deprecated: !0
      },
      nomodule: {
        boolean: !0
      },
      referrerpolicy: {
        enum: ht
      },
      src: {
        enum: ["/.+/"]
      }
    },
    aria: {
      naming: "prohibited"
    }
  },
  search: {
    flow: !0,
    aria: {
      implicitRole: "search"
    }
  },
  section: {
    flow: !0,
    sectioning: !0,
    aria: {
      implicitRole(r) {
        return r.hasAttribute("aria-label") || r.hasAttribute("aria-labelledby") ? "region" : "generic";
      }
    },
    permittedContent: ["@flow"]
  },
  select: {
    flow: !0,
    focusable: !0,
    phrasing: !0,
    interactive: !0,
    formAssociated: {
      disablable: !0,
      listed: !0
    },
    labelable: !0,
    attributes: {
      autofocus: {
        boolean: !0
      },
      disabled: {
        boolean: !0
      },
      multiple: {
        boolean: !0
      },
      required: {
        boolean: !0
      },
      size: {
        enum: ["/\\d+/"]
      }
    },
    aria: {
      implicitRole(r) {
        if (r.hasAttribute("multiple"))
          return "listbox";
        const t = r.getAttribute("size");
        return typeof t == "string" && parseInt(t, 10) > 1 ? "listbox" : "combobox";
      }
    },
    permittedContent: ["@script", "datasrc", "datafld", "dataformatas", "option", "optgroup"]
  },
  slot: {
    flow: !0,
    phrasing: !0,
    transparent: !0,
    aria: {
      naming: "prohibited"
    }
  },
  small: {
    flow: !0,
    phrasing: !0,
    permittedContent: ["@phrasing"],
    aria: {
      implicitRole: "generic",
      naming: "prohibited"
    }
  },
  source: {
    void: !0,
    attributes: {
      type: {},
      media: {},
      src: {
        allowed: Nt("audio", "video")
      },
      srcset: {
        allowed: Nt("picture")
      },
      sizes: {
        allowed: Nt("picture")
      },
      width: {
        allowed: Nt("picture"),
        enum: ["/\\d+/"]
      },
      height: {
        allowed: Nt("picture"),
        enum: ["/\\d+/"]
      }
    },
    aria: {
      naming: "prohibited"
    }
  },
  spacer: {
    deprecated: {
      message: "use CSS instead",
      documentation: "Use CSS margin or padding instead.",
      source: "non-standard"
    }
  },
  span: {
    flow: !0,
    phrasing: !0,
    permittedContent: ["@phrasing"],
    attributes: {
      datafld: {
        deprecated: !0
      },
      dataformatas: {
        deprecated: !0
      },
      datasrc: {
        deprecated: !0
      }
    },
    aria: {
      implicitRole: "generic",
      naming: "prohibited"
    }
  },
  strike: {
    deprecated: {
      message: "use <del> or <s> instead",
      documentation: "Use the `<del>` or `<s>` element instead.",
      source: "html5"
    }
  },
  strong: {
    flow: !0,
    phrasing: !0,
    permittedContent: ["@phrasing"],
    aria: {
      implicitRole: "strong",
      naming: "prohibited"
    }
  },
  style: {
    metadata: !0,
    aria: {
      naming: "prohibited"
    }
  },
  sub: {
    flow: !0,
    phrasing: !0,
    permittedContent: ["@phrasing"],
    aria: {
      implicitRole: "subscript",
      naming: "prohibited"
    }
  },
  summary: {
    permittedContent: ["@phrasing", "@heading"],
    focusable(r) {
      return !!r.closest("details");
    },
    aria: {
      implicitRole: "button"
    }
  },
  sup: {
    flow: !0,
    phrasing: !0,
    permittedContent: ["@phrasing"],
    aria: {
      implicitRole: "superscript",
      naming: "prohibited"
    }
  },
  svg: {
    flow: !0,
    foreign: !0,
    phrasing: !0,
    embedded: !0,
    aria: {
      implicitRole: "graphics-document"
    }
  },
  /* while not part of HTML 5 specification these two elements are handled as
   * special cases to allow them as accessible text and to avoid issues with
   * "no-unknown-elements" they are added here */
  "svg:desc": {},
  "svg:title": {},
  table: {
    flow: !0,
    permittedContent: ["@script", "caption?", "colgroup", "tbody", "tfoot?", "thead?", "tr"],
    permittedOrder: ["caption", "colgroup", "thead", "tbody", "tr", "tfoot"],
    attributes: {
      align: {
        deprecated: !0
      },
      background: {
        deprecated: !0
      },
      bgcolor: {
        deprecated: !0
      },
      bordercolor: {
        deprecated: !0
      },
      cellpadding: {
        deprecated: !0
      },
      cellspacing: {
        deprecated: !0
      },
      dataformatas: {
        deprecated: !0
      },
      datapagesize: {
        deprecated: !0
      },
      datasrc: {
        deprecated: !0
      },
      frame: {
        deprecated: !0
      },
      rules: {
        deprecated: !0
      },
      summary: {
        deprecated: !0
      },
      width: {
        deprecated: !0
      }
    },
    aria: {
      implicitRole: "table"
    }
  },
  tbody: {
    implicitClosed: ["tbody", "tfoot"],
    permittedContent: ["@script", "tr"],
    attributes: {
      align: {
        deprecated: !0
      },
      background: {
        deprecated: !0
      },
      char: {
        deprecated: !0
      },
      charoff: {
        deprecated: !0
      },
      valign: {
        deprecated: !0
      }
    },
    aria: {
      implicitRole: "rowgroup"
    }
  },
  td: {
    flow: !0,
    implicitClosed: ["td", "th"],
    attributes: {
      align: {
        deprecated: !0
      },
      axis: {
        deprecated: !0
      },
      background: {
        deprecated: !0
      },
      bgcolor: {
        deprecated: !0
      },
      char: {
        deprecated: !0
      },
      charoff: {
        deprecated: !0
      },
      colspan: {
        enum: ["/\\d+/"]
      },
      height: {
        deprecated: !0
      },
      nowrap: {
        deprecated: !0
      },
      rowspan: {
        enum: ["/\\d+/"]
      },
      scope: {
        deprecated: !0
      },
      valign: {
        deprecated: !0
      },
      width: {
        deprecated: !0
      }
    },
    aria: {
      implicitRole(r) {
        const e = r.closest("table");
        switch ((e == null ? void 0 : e.getAttribute("role")) ?? "table") {
          case "table":
            return "cell";
          case "grid":
          case "treegrid":
            return "gridcell";
          default:
            return null;
        }
      }
    },
    permittedContent: ["@flow"]
  },
  template: {
    metadata: !0,
    flow: !0,
    phrasing: !0,
    scriptSupporting: !0,
    aria: {
      naming: "prohibited"
    }
  },
  textarea: {
    flow: !0,
    focusable: !0,
    phrasing: !0,
    interactive: !0,
    formAssociated: {
      disablable: !0,
      listed: !0
    },
    labelable: !0,
    attributes: {
      autocomplete: {},
      autofocus: {
        boolean: !0
      },
      cols: {
        enum: ["/\\d+/"]
      },
      datafld: {
        deprecated: !0
      },
      datasrc: {
        deprecated: !0
      },
      disabled: {
        boolean: !0
      },
      maxlength: {
        enum: ["/\\d+/"]
      },
      minlength: {
        enum: ["/\\d+/"]
      },
      readonly: {
        boolean: !0
      },
      required: {
        boolean: !0
      },
      rows: {
        enum: ["/\\d+/"]
      },
      wrap: {
        enum: ["hard", "soft"]
      }
    },
    aria: {
      implicitRole: "textbox"
    },
    permittedContent: []
  },
  tfoot: {
    implicitClosed: ["tbody"],
    permittedContent: ["@script", "tr"],
    attributes: {
      align: {
        deprecated: !0
      },
      background: {
        deprecated: !0
      },
      char: {
        deprecated: !0
      },
      charoff: {
        deprecated: !0
      },
      valign: {
        deprecated: !0
      }
    },
    aria: {
      implicitRole: "rowgroup"
    }
  },
  th: {
    flow: !0,
    implicitClosed: ["td", "th"],
    attributes: {
      align: {
        deprecated: !0
      },
      axis: {
        deprecated: !0
      },
      background: {
        deprecated: !0
      },
      bgcolor: {
        deprecated: !0
      },
      char: {
        deprecated: !0
      },
      charoff: {
        deprecated: !0
      },
      colspan: {
        enum: ["/\\d+/"]
      },
      height: {
        deprecated: !0
      },
      nowrap: {
        deprecated: !0
      },
      rowspan: {
        enum: ["/\\d+/"]
      },
      scope: {
        enum: ["row", "col", "rowgroup", "colgroup"]
      },
      valign: {
        deprecated: !0
      },
      width: {
        deprecated: !0
      }
    },
    aria: {
      implicitRole(r) {
        const e = r.closest("table"), t = (e == null ? void 0 : e.getAttribute("role")) ?? "table";
        if (typeof t != "string" || !["table", "grid", "treegrid"].includes(t))
          return null;
        switch (r.getAttribute("scope")) {
          case "col":
            return "columnheader";
          case "row":
            return "rowheader";
          default:
            return t === "table" ? "cell" : "gridcell";
        }
      }
    },
    permittedContent: ["@flow"],
    permittedDescendants: [{ exclude: ["header", "footer", "@sectioning", "@heading"] }]
  },
  thead: {
    implicitClosed: ["tbody", "tfoot"],
    permittedContent: ["@script", "tr"],
    attributes: {
      align: {
        deprecated: !0
      },
      background: {
        deprecated: !0
      },
      char: {
        deprecated: !0
      },
      charoff: {
        deprecated: !0
      },
      valign: {
        deprecated: !0
      }
    },
    aria: {
      implicitRole: "rowgroup"
    }
  },
  time: {
    flow: !0,
    phrasing: !0,
    aria: {
      implicitRole: "time",
      naming: "prohibited"
    },
    permittedContent: ["@phrasing"]
  },
  title: {
    metadata: !0,
    permittedContent: [],
    permittedParent: ["head"],
    aria: {
      naming: "prohibited"
    }
  },
  tr: {
    implicitClosed: ["tr"],
    permittedContent: ["@script", "td", "th"],
    attributes: {
      align: {
        deprecated: !0
      },
      background: {
        deprecated: !0
      },
      bgcolor: {
        deprecated: !0
      },
      char: {
        deprecated: !0
      },
      charoff: {
        deprecated: !0
      },
      valign: {
        deprecated: !0
      }
    },
    aria: {
      implicitRole: "row"
    }
  },
  track: {
    void: !0,
    aria: {
      naming: "prohibited"
    }
  },
  tt: {
    deprecated: {
      documentation: "Use a more semantically correct element such as `<code>`, `<var>` or `<pre>`.",
      source: "html4"
    }
  },
  u: {
    flow: !0,
    phrasing: !0,
    permittedContent: ["@phrasing"],
    aria: {
      implicitRole: "generic",
      naming: "prohibited"
    }
  },
  ul: {
    flow: !0,
    permittedContent: ["@script", "li"],
    attributes: {
      compact: {
        deprecated: !0
      },
      type: {
        deprecated: !0
      }
    },
    aria: {
      implicitRole: "list"
    }
  },
  var: {
    flow: !0,
    phrasing: !0,
    permittedContent: ["@phrasing"],
    aria: {
      naming: "prohibited"
    }
  },
  video: {
    flow: !0,
    focusable(r) {
      return r.hasAttribute("controls");
    },
    phrasing: !0,
    embedded: !0,
    interactive(r) {
      return r.hasAttribute("controls");
    },
    transparent: ["@flow"],
    attributes: {
      crossorigin: {
        omit: !0,
        enum: ["anonymous", "use-credentials"]
      },
      height: {
        enum: ["/\\d+/"]
      },
      itemprop: {
        allowed: ye("src")
      },
      preload: {
        omit: !0,
        enum: ["none", "metadata", "auto"]
      },
      width: {
        enum: ["/\\d+/"]
      }
    },
    permittedContent: ["@flow", "track", "source"],
    permittedDescendants: [{ exclude: ["audio", "video"] }],
    permittedOrder: ["source", "track", "@flow"]
  },
  wbr: {
    flow: !0,
    phrasing: !0,
    void: !0,
    aria: {
      naming: "prohibited"
    }
  },
  xmp: {
    deprecated: {
      documentation: "Use `<pre>` or `<code>` and escape content using HTML entities instead.",
      source: "html32"
    }
  }
};
const Qc = {
  html5: Nu
};
var Fu = [
  "&Aacute",
  "&aacute",
  "&Aacute;",
  "&aacute;",
  "&Abreve;",
  "&abreve;",
  "&ac;",
  "&acd;",
  "&acE;",
  "&Acirc",
  "&acirc",
  "&Acirc;",
  "&acirc;",
  "&acute",
  "&acute;",
  "&Acy;",
  "&acy;",
  "&AElig",
  "&aelig",
  "&AElig;",
  "&aelig;",
  "&af;",
  "&Afr;",
  "&afr;",
  "&Agrave",
  "&agrave",
  "&Agrave;",
  "&agrave;",
  "&alefsym;",
  "&aleph;",
  "&Alpha;",
  "&alpha;",
  "&Amacr;",
  "&amacr;",
  "&amalg;",
  "&AMP",
  "&amp",
  "&AMP;",
  "&amp;",
  "&And;",
  "&and;",
  "&andand;",
  "&andd;",
  "&andslope;",
  "&andv;",
  "&ang;",
  "&ange;",
  "&angle;",
  "&angmsd;",
  "&angmsdaa;",
  "&angmsdab;",
  "&angmsdac;",
  "&angmsdad;",
  "&angmsdae;",
  "&angmsdaf;",
  "&angmsdag;",
  "&angmsdah;",
  "&angrt;",
  "&angrtvb;",
  "&angrtvbd;",
  "&angsph;",
  "&angst;",
  "&angzarr;",
  "&Aogon;",
  "&aogon;",
  "&Aopf;",
  "&aopf;",
  "&ap;",
  "&apacir;",
  "&apE;",
  "&ape;",
  "&apid;",
  "&apos;",
  "&ApplyFunction;",
  "&approx;",
  "&approxeq;",
  "&Aring",
  "&aring",
  "&Aring;",
  "&aring;",
  "&Ascr;",
  "&ascr;",
  "&Assign;",
  "&ast;",
  "&asymp;",
  "&asympeq;",
  "&Atilde",
  "&atilde",
  "&Atilde;",
  "&atilde;",
  "&Auml",
  "&auml",
  "&Auml;",
  "&auml;",
  "&awconint;",
  "&awint;",
  "&backcong;",
  "&backepsilon;",
  "&backprime;",
  "&backsim;",
  "&backsimeq;",
  "&Backslash;",
  "&Barv;",
  "&barvee;",
  "&Barwed;",
  "&barwed;",
  "&barwedge;",
  "&bbrk;",
  "&bbrktbrk;",
  "&bcong;",
  "&Bcy;",
  "&bcy;",
  "&bdquo;",
  "&becaus;",
  "&Because;",
  "&because;",
  "&bemptyv;",
  "&bepsi;",
  "&bernou;",
  "&Bernoullis;",
  "&Beta;",
  "&beta;",
  "&beth;",
  "&between;",
  "&Bfr;",
  "&bfr;",
  "&bigcap;",
  "&bigcirc;",
  "&bigcup;",
  "&bigodot;",
  "&bigoplus;",
  "&bigotimes;",
  "&bigsqcup;",
  "&bigstar;",
  "&bigtriangledown;",
  "&bigtriangleup;",
  "&biguplus;",
  "&bigvee;",
  "&bigwedge;",
  "&bkarow;",
  "&blacklozenge;",
  "&blacksquare;",
  "&blacktriangle;",
  "&blacktriangledown;",
  "&blacktriangleleft;",
  "&blacktriangleright;",
  "&blank;",
  "&blk12;",
  "&blk14;",
  "&blk34;",
  "&block;",
  "&bne;",
  "&bnequiv;",
  "&bNot;",
  "&bnot;",
  "&Bopf;",
  "&bopf;",
  "&bot;",
  "&bottom;",
  "&bowtie;",
  "&boxbox;",
  "&boxDL;",
  "&boxDl;",
  "&boxdL;",
  "&boxdl;",
  "&boxDR;",
  "&boxDr;",
  "&boxdR;",
  "&boxdr;",
  "&boxH;",
  "&boxh;",
  "&boxHD;",
  "&boxHd;",
  "&boxhD;",
  "&boxhd;",
  "&boxHU;",
  "&boxHu;",
  "&boxhU;",
  "&boxhu;",
  "&boxminus;",
  "&boxplus;",
  "&boxtimes;",
  "&boxUL;",
  "&boxUl;",
  "&boxuL;",
  "&boxul;",
  "&boxUR;",
  "&boxUr;",
  "&boxuR;",
  "&boxur;",
  "&boxV;",
  "&boxv;",
  "&boxVH;",
  "&boxVh;",
  "&boxvH;",
  "&boxvh;",
  "&boxVL;",
  "&boxVl;",
  "&boxvL;",
  "&boxvl;",
  "&boxVR;",
  "&boxVr;",
  "&boxvR;",
  "&boxvr;",
  "&bprime;",
  "&Breve;",
  "&breve;",
  "&brvbar",
  "&brvbar;",
  "&Bscr;",
  "&bscr;",
  "&bsemi;",
  "&bsim;",
  "&bsime;",
  "&bsol;",
  "&bsolb;",
  "&bsolhsub;",
  "&bull;",
  "&bullet;",
  "&bump;",
  "&bumpE;",
  "&bumpe;",
  "&Bumpeq;",
  "&bumpeq;",
  "&Cacute;",
  "&cacute;",
  "&Cap;",
  "&cap;",
  "&capand;",
  "&capbrcup;",
  "&capcap;",
  "&capcup;",
  "&capdot;",
  "&CapitalDifferentialD;",
  "&caps;",
  "&caret;",
  "&caron;",
  "&Cayleys;",
  "&ccaps;",
  "&Ccaron;",
  "&ccaron;",
  "&Ccedil",
  "&ccedil",
  "&Ccedil;",
  "&ccedil;",
  "&Ccirc;",
  "&ccirc;",
  "&Cconint;",
  "&ccups;",
  "&ccupssm;",
  "&Cdot;",
  "&cdot;",
  "&cedil",
  "&cedil;",
  "&Cedilla;",
  "&cemptyv;",
  "&cent",
  "&cent;",
  "&CenterDot;",
  "&centerdot;",
  "&Cfr;",
  "&cfr;",
  "&CHcy;",
  "&chcy;",
  "&check;",
  "&checkmark;",
  "&Chi;",
  "&chi;",
  "&cir;",
  "&circ;",
  "&circeq;",
  "&circlearrowleft;",
  "&circlearrowright;",
  "&circledast;",
  "&circledcirc;",
  "&circleddash;",
  "&CircleDot;",
  "&circledR;",
  "&circledS;",
  "&CircleMinus;",
  "&CirclePlus;",
  "&CircleTimes;",
  "&cirE;",
  "&cire;",
  "&cirfnint;",
  "&cirmid;",
  "&cirscir;",
  "&ClockwiseContourIntegral;",
  "&CloseCurlyDoubleQuote;",
  "&CloseCurlyQuote;",
  "&clubs;",
  "&clubsuit;",
  "&Colon;",
  "&colon;",
  "&Colone;",
  "&colone;",
  "&coloneq;",
  "&comma;",
  "&commat;",
  "&comp;",
  "&compfn;",
  "&complement;",
  "&complexes;",
  "&cong;",
  "&congdot;",
  "&Congruent;",
  "&Conint;",
  "&conint;",
  "&ContourIntegral;",
  "&Copf;",
  "&copf;",
  "&coprod;",
  "&Coproduct;",
  "&COPY",
  "&copy",
  "&COPY;",
  "&copy;",
  "&copysr;",
  "&CounterClockwiseContourIntegral;",
  "&crarr;",
  "&Cross;",
  "&cross;",
  "&Cscr;",
  "&cscr;",
  "&csub;",
  "&csube;",
  "&csup;",
  "&csupe;",
  "&ctdot;",
  "&cudarrl;",
  "&cudarrr;",
  "&cuepr;",
  "&cuesc;",
  "&cularr;",
  "&cularrp;",
  "&Cup;",
  "&cup;",
  "&cupbrcap;",
  "&CupCap;",
  "&cupcap;",
  "&cupcup;",
  "&cupdot;",
  "&cupor;",
  "&cups;",
  "&curarr;",
  "&curarrm;",
  "&curlyeqprec;",
  "&curlyeqsucc;",
  "&curlyvee;",
  "&curlywedge;",
  "&curren",
  "&curren;",
  "&curvearrowleft;",
  "&curvearrowright;",
  "&cuvee;",
  "&cuwed;",
  "&cwconint;",
  "&cwint;",
  "&cylcty;",
  "&Dagger;",
  "&dagger;",
  "&daleth;",
  "&Darr;",
  "&dArr;",
  "&darr;",
  "&dash;",
  "&Dashv;",
  "&dashv;",
  "&dbkarow;",
  "&dblac;",
  "&Dcaron;",
  "&dcaron;",
  "&Dcy;",
  "&dcy;",
  "&DD;",
  "&dd;",
  "&ddagger;",
  "&ddarr;",
  "&DDotrahd;",
  "&ddotseq;",
  "&deg",
  "&deg;",
  "&Del;",
  "&Delta;",
  "&delta;",
  "&demptyv;",
  "&dfisht;",
  "&Dfr;",
  "&dfr;",
  "&dHar;",
  "&dharl;",
  "&dharr;",
  "&DiacriticalAcute;",
  "&DiacriticalDot;",
  "&DiacriticalDoubleAcute;",
  "&DiacriticalGrave;",
  "&DiacriticalTilde;",
  "&diam;",
  "&Diamond;",
  "&diamond;",
  "&diamondsuit;",
  "&diams;",
  "&die;",
  "&DifferentialD;",
  "&digamma;",
  "&disin;",
  "&div;",
  "&divide",
  "&divide;",
  "&divideontimes;",
  "&divonx;",
  "&DJcy;",
  "&djcy;",
  "&dlcorn;",
  "&dlcrop;",
  "&dollar;",
  "&Dopf;",
  "&dopf;",
  "&Dot;",
  "&dot;",
  "&DotDot;",
  "&doteq;",
  "&doteqdot;",
  "&DotEqual;",
  "&dotminus;",
  "&dotplus;",
  "&dotsquare;",
  "&doublebarwedge;",
  "&DoubleContourIntegral;",
  "&DoubleDot;",
  "&DoubleDownArrow;",
  "&DoubleLeftArrow;",
  "&DoubleLeftRightArrow;",
  "&DoubleLeftTee;",
  "&DoubleLongLeftArrow;",
  "&DoubleLongLeftRightArrow;",
  "&DoubleLongRightArrow;",
  "&DoubleRightArrow;",
  "&DoubleRightTee;",
  "&DoubleUpArrow;",
  "&DoubleUpDownArrow;",
  "&DoubleVerticalBar;",
  "&DownArrow;",
  "&Downarrow;",
  "&downarrow;",
  "&DownArrowBar;",
  "&DownArrowUpArrow;",
  "&DownBreve;",
  "&downdownarrows;",
  "&downharpoonleft;",
  "&downharpoonright;",
  "&DownLeftRightVector;",
  "&DownLeftTeeVector;",
  "&DownLeftVector;",
  "&DownLeftVectorBar;",
  "&DownRightTeeVector;",
  "&DownRightVector;",
  "&DownRightVectorBar;",
  "&DownTee;",
  "&DownTeeArrow;",
  "&drbkarow;",
  "&drcorn;",
  "&drcrop;",
  "&Dscr;",
  "&dscr;",
  "&DScy;",
  "&dscy;",
  "&dsol;",
  "&Dstrok;",
  "&dstrok;",
  "&dtdot;",
  "&dtri;",
  "&dtrif;",
  "&duarr;",
  "&duhar;",
  "&dwangle;",
  "&DZcy;",
  "&dzcy;",
  "&dzigrarr;",
  "&Eacute",
  "&eacute",
  "&Eacute;",
  "&eacute;",
  "&easter;",
  "&Ecaron;",
  "&ecaron;",
  "&ecir;",
  "&Ecirc",
  "&ecirc",
  "&Ecirc;",
  "&ecirc;",
  "&ecolon;",
  "&Ecy;",
  "&ecy;",
  "&eDDot;",
  "&Edot;",
  "&eDot;",
  "&edot;",
  "&ee;",
  "&efDot;",
  "&Efr;",
  "&efr;",
  "&eg;",
  "&Egrave",
  "&egrave",
  "&Egrave;",
  "&egrave;",
  "&egs;",
  "&egsdot;",
  "&el;",
  "&Element;",
  "&elinters;",
  "&ell;",
  "&els;",
  "&elsdot;",
  "&Emacr;",
  "&emacr;",
  "&empty;",
  "&emptyset;",
  "&EmptySmallSquare;",
  "&emptyv;",
  "&EmptyVerySmallSquare;",
  "&emsp13;",
  "&emsp14;",
  "&emsp;",
  "&ENG;",
  "&eng;",
  "&ensp;",
  "&Eogon;",
  "&eogon;",
  "&Eopf;",
  "&eopf;",
  "&epar;",
  "&eparsl;",
  "&eplus;",
  "&epsi;",
  "&Epsilon;",
  "&epsilon;",
  "&epsiv;",
  "&eqcirc;",
  "&eqcolon;",
  "&eqsim;",
  "&eqslantgtr;",
  "&eqslantless;",
  "&Equal;",
  "&equals;",
  "&EqualTilde;",
  "&equest;",
  "&Equilibrium;",
  "&equiv;",
  "&equivDD;",
  "&eqvparsl;",
  "&erarr;",
  "&erDot;",
  "&Escr;",
  "&escr;",
  "&esdot;",
  "&Esim;",
  "&esim;",
  "&Eta;",
  "&eta;",
  "&ETH",
  "&eth",
  "&ETH;",
  "&eth;",
  "&Euml",
  "&euml",
  "&Euml;",
  "&euml;",
  "&euro;",
  "&excl;",
  "&exist;",
  "&Exists;",
  "&expectation;",
  "&ExponentialE;",
  "&exponentiale;",
  "&fallingdotseq;",
  "&Fcy;",
  "&fcy;",
  "&female;",
  "&ffilig;",
  "&fflig;",
  "&ffllig;",
  "&Ffr;",
  "&ffr;",
  "&filig;",
  "&FilledSmallSquare;",
  "&FilledVerySmallSquare;",
  "&fjlig;",
  "&flat;",
  "&fllig;",
  "&fltns;",
  "&fnof;",
  "&Fopf;",
  "&fopf;",
  "&ForAll;",
  "&forall;",
  "&fork;",
  "&forkv;",
  "&Fouriertrf;",
  "&fpartint;",
  "&frac12",
  "&frac12;",
  "&frac13;",
  "&frac14",
  "&frac14;",
  "&frac15;",
  "&frac16;",
  "&frac18;",
  "&frac23;",
  "&frac25;",
  "&frac34",
  "&frac34;",
  "&frac35;",
  "&frac38;",
  "&frac45;",
  "&frac56;",
  "&frac58;",
  "&frac78;",
  "&frasl;",
  "&frown;",
  "&Fscr;",
  "&fscr;",
  "&gacute;",
  "&Gamma;",
  "&gamma;",
  "&Gammad;",
  "&gammad;",
  "&gap;",
  "&Gbreve;",
  "&gbreve;",
  "&Gcedil;",
  "&Gcirc;",
  "&gcirc;",
  "&Gcy;",
  "&gcy;",
  "&Gdot;",
  "&gdot;",
  "&gE;",
  "&ge;",
  "&gEl;",
  "&gel;",
  "&geq;",
  "&geqq;",
  "&geqslant;",
  "&ges;",
  "&gescc;",
  "&gesdot;",
  "&gesdoto;",
  "&gesdotol;",
  "&gesl;",
  "&gesles;",
  "&Gfr;",
  "&gfr;",
  "&Gg;",
  "&gg;",
  "&ggg;",
  "&gimel;",
  "&GJcy;",
  "&gjcy;",
  "&gl;",
  "&gla;",
  "&glE;",
  "&glj;",
  "&gnap;",
  "&gnapprox;",
  "&gnE;",
  "&gne;",
  "&gneq;",
  "&gneqq;",
  "&gnsim;",
  "&Gopf;",
  "&gopf;",
  "&grave;",
  "&GreaterEqual;",
  "&GreaterEqualLess;",
  "&GreaterFullEqual;",
  "&GreaterGreater;",
  "&GreaterLess;",
  "&GreaterSlantEqual;",
  "&GreaterTilde;",
  "&Gscr;",
  "&gscr;",
  "&gsim;",
  "&gsime;",
  "&gsiml;",
  "&GT",
  "&gt",
  "&GT;",
  "&Gt;",
  "&gt;",
  "&gtcc;",
  "&gtcir;",
  "&gtdot;",
  "&gtlPar;",
  "&gtquest;",
  "&gtrapprox;",
  "&gtrarr;",
  "&gtrdot;",
  "&gtreqless;",
  "&gtreqqless;",
  "&gtrless;",
  "&gtrsim;",
  "&gvertneqq;",
  "&gvnE;",
  "&Hacek;",
  "&hairsp;",
  "&half;",
  "&hamilt;",
  "&HARDcy;",
  "&hardcy;",
  "&hArr;",
  "&harr;",
  "&harrcir;",
  "&harrw;",
  "&Hat;",
  "&hbar;",
  "&Hcirc;",
  "&hcirc;",
  "&hearts;",
  "&heartsuit;",
  "&hellip;",
  "&hercon;",
  "&Hfr;",
  "&hfr;",
  "&HilbertSpace;",
  "&hksearow;",
  "&hkswarow;",
  "&hoarr;",
  "&homtht;",
  "&hookleftarrow;",
  "&hookrightarrow;",
  "&Hopf;",
  "&hopf;",
  "&horbar;",
  "&HorizontalLine;",
  "&Hscr;",
  "&hscr;",
  "&hslash;",
  "&Hstrok;",
  "&hstrok;",
  "&HumpDownHump;",
  "&HumpEqual;",
  "&hybull;",
  "&hyphen;",
  "&Iacute",
  "&iacute",
  "&Iacute;",
  "&iacute;",
  "&ic;",
  "&Icirc",
  "&icirc",
  "&Icirc;",
  "&icirc;",
  "&Icy;",
  "&icy;",
  "&Idot;",
  "&IEcy;",
  "&iecy;",
  "&iexcl",
  "&iexcl;",
  "&iff;",
  "&Ifr;",
  "&ifr;",
  "&Igrave",
  "&igrave",
  "&Igrave;",
  "&igrave;",
  "&ii;",
  "&iiiint;",
  "&iiint;",
  "&iinfin;",
  "&iiota;",
  "&IJlig;",
  "&ijlig;",
  "&Im;",
  "&Imacr;",
  "&imacr;",
  "&image;",
  "&ImaginaryI;",
  "&imagline;",
  "&imagpart;",
  "&imath;",
  "&imof;",
  "&imped;",
  "&Implies;",
  "&in;",
  "&incare;",
  "&infin;",
  "&infintie;",
  "&inodot;",
  "&Int;",
  "&int;",
  "&intcal;",
  "&integers;",
  "&Integral;",
  "&intercal;",
  "&Intersection;",
  "&intlarhk;",
  "&intprod;",
  "&InvisibleComma;",
  "&InvisibleTimes;",
  "&IOcy;",
  "&iocy;",
  "&Iogon;",
  "&iogon;",
  "&Iopf;",
  "&iopf;",
  "&Iota;",
  "&iota;",
  "&iprod;",
  "&iquest",
  "&iquest;",
  "&Iscr;",
  "&iscr;",
  "&isin;",
  "&isindot;",
  "&isinE;",
  "&isins;",
  "&isinsv;",
  "&isinv;",
  "&it;",
  "&Itilde;",
  "&itilde;",
  "&Iukcy;",
  "&iukcy;",
  "&Iuml",
  "&iuml",
  "&Iuml;",
  "&iuml;",
  "&Jcirc;",
  "&jcirc;",
  "&Jcy;",
  "&jcy;",
  "&Jfr;",
  "&jfr;",
  "&jmath;",
  "&Jopf;",
  "&jopf;",
  "&Jscr;",
  "&jscr;",
  "&Jsercy;",
  "&jsercy;",
  "&Jukcy;",
  "&jukcy;",
  "&Kappa;",
  "&kappa;",
  "&kappav;",
  "&Kcedil;",
  "&kcedil;",
  "&Kcy;",
  "&kcy;",
  "&Kfr;",
  "&kfr;",
  "&kgreen;",
  "&KHcy;",
  "&khcy;",
  "&KJcy;",
  "&kjcy;",
  "&Kopf;",
  "&kopf;",
  "&Kscr;",
  "&kscr;",
  "&lAarr;",
  "&Lacute;",
  "&lacute;",
  "&laemptyv;",
  "&lagran;",
  "&Lambda;",
  "&lambda;",
  "&Lang;",
  "&lang;",
  "&langd;",
  "&langle;",
  "&lap;",
  "&Laplacetrf;",
  "&laquo",
  "&laquo;",
  "&Larr;",
  "&lArr;",
  "&larr;",
  "&larrb;",
  "&larrbfs;",
  "&larrfs;",
  "&larrhk;",
  "&larrlp;",
  "&larrpl;",
  "&larrsim;",
  "&larrtl;",
  "&lat;",
  "&lAtail;",
  "&latail;",
  "&late;",
  "&lates;",
  "&lBarr;",
  "&lbarr;",
  "&lbbrk;",
  "&lbrace;",
  "&lbrack;",
  "&lbrke;",
  "&lbrksld;",
  "&lbrkslu;",
  "&Lcaron;",
  "&lcaron;",
  "&Lcedil;",
  "&lcedil;",
  "&lceil;",
  "&lcub;",
  "&Lcy;",
  "&lcy;",
  "&ldca;",
  "&ldquo;",
  "&ldquor;",
  "&ldrdhar;",
  "&ldrushar;",
  "&ldsh;",
  "&lE;",
  "&le;",
  "&LeftAngleBracket;",
  "&LeftArrow;",
  "&Leftarrow;",
  "&leftarrow;",
  "&LeftArrowBar;",
  "&LeftArrowRightArrow;",
  "&leftarrowtail;",
  "&LeftCeiling;",
  "&LeftDoubleBracket;",
  "&LeftDownTeeVector;",
  "&LeftDownVector;",
  "&LeftDownVectorBar;",
  "&LeftFloor;",
  "&leftharpoondown;",
  "&leftharpoonup;",
  "&leftleftarrows;",
  "&LeftRightArrow;",
  "&Leftrightarrow;",
  "&leftrightarrow;",
  "&leftrightarrows;",
  "&leftrightharpoons;",
  "&leftrightsquigarrow;",
  "&LeftRightVector;",
  "&LeftTee;",
  "&LeftTeeArrow;",
  "&LeftTeeVector;",
  "&leftthreetimes;",
  "&LeftTriangle;",
  "&LeftTriangleBar;",
  "&LeftTriangleEqual;",
  "&LeftUpDownVector;",
  "&LeftUpTeeVector;",
  "&LeftUpVector;",
  "&LeftUpVectorBar;",
  "&LeftVector;",
  "&LeftVectorBar;",
  "&lEg;",
  "&leg;",
  "&leq;",
  "&leqq;",
  "&leqslant;",
  "&les;",
  "&lescc;",
  "&lesdot;",
  "&lesdoto;",
  "&lesdotor;",
  "&lesg;",
  "&lesges;",
  "&lessapprox;",
  "&lessdot;",
  "&lesseqgtr;",
  "&lesseqqgtr;",
  "&LessEqualGreater;",
  "&LessFullEqual;",
  "&LessGreater;",
  "&lessgtr;",
  "&LessLess;",
  "&lesssim;",
  "&LessSlantEqual;",
  "&LessTilde;",
  "&lfisht;",
  "&lfloor;",
  "&Lfr;",
  "&lfr;",
  "&lg;",
  "&lgE;",
  "&lHar;",
  "&lhard;",
  "&lharu;",
  "&lharul;",
  "&lhblk;",
  "&LJcy;",
  "&ljcy;",
  "&Ll;",
  "&ll;",
  "&llarr;",
  "&llcorner;",
  "&Lleftarrow;",
  "&llhard;",
  "&lltri;",
  "&Lmidot;",
  "&lmidot;",
  "&lmoust;",
  "&lmoustache;",
  "&lnap;",
  "&lnapprox;",
  "&lnE;",
  "&lne;",
  "&lneq;",
  "&lneqq;",
  "&lnsim;",
  "&loang;",
  "&loarr;",
  "&lobrk;",
  "&LongLeftArrow;",
  "&Longleftarrow;",
  "&longleftarrow;",
  "&LongLeftRightArrow;",
  "&Longleftrightarrow;",
  "&longleftrightarrow;",
  "&longmapsto;",
  "&LongRightArrow;",
  "&Longrightarrow;",
  "&longrightarrow;",
  "&looparrowleft;",
  "&looparrowright;",
  "&lopar;",
  "&Lopf;",
  "&lopf;",
  "&loplus;",
  "&lotimes;",
  "&lowast;",
  "&lowbar;",
  "&LowerLeftArrow;",
  "&LowerRightArrow;",
  "&loz;",
  "&lozenge;",
  "&lozf;",
  "&lpar;",
  "&lparlt;",
  "&lrarr;",
  "&lrcorner;",
  "&lrhar;",
  "&lrhard;",
  "&lrm;",
  "&lrtri;",
  "&lsaquo;",
  "&Lscr;",
  "&lscr;",
  "&Lsh;",
  "&lsh;",
  "&lsim;",
  "&lsime;",
  "&lsimg;",
  "&lsqb;",
  "&lsquo;",
  "&lsquor;",
  "&Lstrok;",
  "&lstrok;",
  "&LT",
  "&lt",
  "&LT;",
  "&Lt;",
  "&lt;",
  "&ltcc;",
  "&ltcir;",
  "&ltdot;",
  "&lthree;",
  "&ltimes;",
  "&ltlarr;",
  "&ltquest;",
  "&ltri;",
  "&ltrie;",
  "&ltrif;",
  "&ltrPar;",
  "&lurdshar;",
  "&luruhar;",
  "&lvertneqq;",
  "&lvnE;",
  "&macr",
  "&macr;",
  "&male;",
  "&malt;",
  "&maltese;",
  "&Map;",
  "&map;",
  "&mapsto;",
  "&mapstodown;",
  "&mapstoleft;",
  "&mapstoup;",
  "&marker;",
  "&mcomma;",
  "&Mcy;",
  "&mcy;",
  "&mdash;",
  "&mDDot;",
  "&measuredangle;",
  "&MediumSpace;",
  "&Mellintrf;",
  "&Mfr;",
  "&mfr;",
  "&mho;",
  "&micro",
  "&micro;",
  "&mid;",
  "&midast;",
  "&midcir;",
  "&middot",
  "&middot;",
  "&minus;",
  "&minusb;",
  "&minusd;",
  "&minusdu;",
  "&MinusPlus;",
  "&mlcp;",
  "&mldr;",
  "&mnplus;",
  "&models;",
  "&Mopf;",
  "&mopf;",
  "&mp;",
  "&Mscr;",
  "&mscr;",
  "&mstpos;",
  "&Mu;",
  "&mu;",
  "&multimap;",
  "&mumap;",
  "&nabla;",
  "&Nacute;",
  "&nacute;",
  "&nang;",
  "&nap;",
  "&napE;",
  "&napid;",
  "&napos;",
  "&napprox;",
  "&natur;",
  "&natural;",
  "&naturals;",
  "&nbsp",
  "&nbsp;",
  "&nbump;",
  "&nbumpe;",
  "&ncap;",
  "&Ncaron;",
  "&ncaron;",
  "&Ncedil;",
  "&ncedil;",
  "&ncong;",
  "&ncongdot;",
  "&ncup;",
  "&Ncy;",
  "&ncy;",
  "&ndash;",
  "&ne;",
  "&nearhk;",
  "&neArr;",
  "&nearr;",
  "&nearrow;",
  "&nedot;",
  "&NegativeMediumSpace;",
  "&NegativeThickSpace;",
  "&NegativeThinSpace;",
  "&NegativeVeryThinSpace;",
  "&nequiv;",
  "&nesear;",
  "&nesim;",
  "&NestedGreaterGreater;",
  "&NestedLessLess;",
  "&NewLine;",
  "&nexist;",
  "&nexists;",
  "&Nfr;",
  "&nfr;",
  "&ngE;",
  "&nge;",
  "&ngeq;",
  "&ngeqq;",
  "&ngeqslant;",
  "&nges;",
  "&nGg;",
  "&ngsim;",
  "&nGt;",
  "&ngt;",
  "&ngtr;",
  "&nGtv;",
  "&nhArr;",
  "&nharr;",
  "&nhpar;",
  "&ni;",
  "&nis;",
  "&nisd;",
  "&niv;",
  "&NJcy;",
  "&njcy;",
  "&nlArr;",
  "&nlarr;",
  "&nldr;",
  "&nlE;",
  "&nle;",
  "&nLeftarrow;",
  "&nleftarrow;",
  "&nLeftrightarrow;",
  "&nleftrightarrow;",
  "&nleq;",
  "&nleqq;",
  "&nleqslant;",
  "&nles;",
  "&nless;",
  "&nLl;",
  "&nlsim;",
  "&nLt;",
  "&nlt;",
  "&nltri;",
  "&nltrie;",
  "&nLtv;",
  "&nmid;",
  "&NoBreak;",
  "&NonBreakingSpace;",
  "&Nopf;",
  "&nopf;",
  "&not",
  "&Not;",
  "&not;",
  "&NotCongruent;",
  "&NotCupCap;",
  "&NotDoubleVerticalBar;",
  "&NotElement;",
  "&NotEqual;",
  "&NotEqualTilde;",
  "&NotExists;",
  "&NotGreater;",
  "&NotGreaterEqual;",
  "&NotGreaterFullEqual;",
  "&NotGreaterGreater;",
  "&NotGreaterLess;",
  "&NotGreaterSlantEqual;",
  "&NotGreaterTilde;",
  "&NotHumpDownHump;",
  "&NotHumpEqual;",
  "&notin;",
  "&notindot;",
  "&notinE;",
  "&notinva;",
  "&notinvb;",
  "&notinvc;",
  "&NotLeftTriangle;",
  "&NotLeftTriangleBar;",
  "&NotLeftTriangleEqual;",
  "&NotLess;",
  "&NotLessEqual;",
  "&NotLessGreater;",
  "&NotLessLess;",
  "&NotLessSlantEqual;",
  "&NotLessTilde;",
  "&NotNestedGreaterGreater;",
  "&NotNestedLessLess;",
  "&notni;",
  "&notniva;",
  "&notnivb;",
  "&notnivc;",
  "&NotPrecedes;",
  "&NotPrecedesEqual;",
  "&NotPrecedesSlantEqual;",
  "&NotReverseElement;",
  "&NotRightTriangle;",
  "&NotRightTriangleBar;",
  "&NotRightTriangleEqual;",
  "&NotSquareSubset;",
  "&NotSquareSubsetEqual;",
  "&NotSquareSuperset;",
  "&NotSquareSupersetEqual;",
  "&NotSubset;",
  "&NotSubsetEqual;",
  "&NotSucceeds;",
  "&NotSucceedsEqual;",
  "&NotSucceedsSlantEqual;",
  "&NotSucceedsTilde;",
  "&NotSuperset;",
  "&NotSupersetEqual;",
  "&NotTilde;",
  "&NotTildeEqual;",
  "&NotTildeFullEqual;",
  "&NotTildeTilde;",
  "&NotVerticalBar;",
  "&npar;",
  "&nparallel;",
  "&nparsl;",
  "&npart;",
  "&npolint;",
  "&npr;",
  "&nprcue;",
  "&npre;",
  "&nprec;",
  "&npreceq;",
  "&nrArr;",
  "&nrarr;",
  "&nrarrc;",
  "&nrarrw;",
  "&nRightarrow;",
  "&nrightarrow;",
  "&nrtri;",
  "&nrtrie;",
  "&nsc;",
  "&nsccue;",
  "&nsce;",
  "&Nscr;",
  "&nscr;",
  "&nshortmid;",
  "&nshortparallel;",
  "&nsim;",
  "&nsime;",
  "&nsimeq;",
  "&nsmid;",
  "&nspar;",
  "&nsqsube;",
  "&nsqsupe;",
  "&nsub;",
  "&nsubE;",
  "&nsube;",
  "&nsubset;",
  "&nsubseteq;",
  "&nsubseteqq;",
  "&nsucc;",
  "&nsucceq;",
  "&nsup;",
  "&nsupE;",
  "&nsupe;",
  "&nsupset;",
  "&nsupseteq;",
  "&nsupseteqq;",
  "&ntgl;",
  "&Ntilde",
  "&ntilde",
  "&Ntilde;",
  "&ntilde;",
  "&ntlg;",
  "&ntriangleleft;",
  "&ntrianglelefteq;",
  "&ntriangleright;",
  "&ntrianglerighteq;",
  "&Nu;",
  "&nu;",
  "&num;",
  "&numero;",
  "&numsp;",
  "&nvap;",
  "&nVDash;",
  "&nVdash;",
  "&nvDash;",
  "&nvdash;",
  "&nvge;",
  "&nvgt;",
  "&nvHarr;",
  "&nvinfin;",
  "&nvlArr;",
  "&nvle;",
  "&nvlt;",
  "&nvltrie;",
  "&nvrArr;",
  "&nvrtrie;",
  "&nvsim;",
  "&nwarhk;",
  "&nwArr;",
  "&nwarr;",
  "&nwarrow;",
  "&nwnear;",
  "&Oacute",
  "&oacute",
  "&Oacute;",
  "&oacute;",
  "&oast;",
  "&ocir;",
  "&Ocirc",
  "&ocirc",
  "&Ocirc;",
  "&ocirc;",
  "&Ocy;",
  "&ocy;",
  "&odash;",
  "&Odblac;",
  "&odblac;",
  "&odiv;",
  "&odot;",
  "&odsold;",
  "&OElig;",
  "&oelig;",
  "&ofcir;",
  "&Ofr;",
  "&ofr;",
  "&ogon;",
  "&Ograve",
  "&ograve",
  "&Ograve;",
  "&ograve;",
  "&ogt;",
  "&ohbar;",
  "&ohm;",
  "&oint;",
  "&olarr;",
  "&olcir;",
  "&olcross;",
  "&oline;",
  "&olt;",
  "&Omacr;",
  "&omacr;",
  "&Omega;",
  "&omega;",
  "&Omicron;",
  "&omicron;",
  "&omid;",
  "&ominus;",
  "&Oopf;",
  "&oopf;",
  "&opar;",
  "&OpenCurlyDoubleQuote;",
  "&OpenCurlyQuote;",
  "&operp;",
  "&oplus;",
  "&Or;",
  "&or;",
  "&orarr;",
  "&ord;",
  "&order;",
  "&orderof;",
  "&ordf",
  "&ordf;",
  "&ordm",
  "&ordm;",
  "&origof;",
  "&oror;",
  "&orslope;",
  "&orv;",
  "&oS;",
  "&Oscr;",
  "&oscr;",
  "&Oslash",
  "&oslash",
  "&Oslash;",
  "&oslash;",
  "&osol;",
  "&Otilde",
  "&otilde",
  "&Otilde;",
  "&otilde;",
  "&Otimes;",
  "&otimes;",
  "&otimesas;",
  "&Ouml",
  "&ouml",
  "&Ouml;",
  "&ouml;",
  "&ovbar;",
  "&OverBar;",
  "&OverBrace;",
  "&OverBracket;",
  "&OverParenthesis;",
  "&par;",
  "&para",
  "&para;",
  "&parallel;",
  "&parsim;",
  "&parsl;",
  "&part;",
  "&PartialD;",
  "&Pcy;",
  "&pcy;",
  "&percnt;",
  "&period;",
  "&permil;",
  "&perp;",
  "&pertenk;",
  "&Pfr;",
  "&pfr;",
  "&Phi;",
  "&phi;",
  "&phiv;",
  "&phmmat;",
  "&phone;",
  "&Pi;",
  "&pi;",
  "&pitchfork;",
  "&piv;",
  "&planck;",
  "&planckh;",
  "&plankv;",
  "&plus;",
  "&plusacir;",
  "&plusb;",
  "&pluscir;",
  "&plusdo;",
  "&plusdu;",
  "&pluse;",
  "&PlusMinus;",
  "&plusmn",
  "&plusmn;",
  "&plussim;",
  "&plustwo;",
  "&pm;",
  "&Poincareplane;",
  "&pointint;",
  "&Popf;",
  "&popf;",
  "&pound",
  "&pound;",
  "&Pr;",
  "&pr;",
  "&prap;",
  "&prcue;",
  "&prE;",
  "&pre;",
  "&prec;",
  "&precapprox;",
  "&preccurlyeq;",
  "&Precedes;",
  "&PrecedesEqual;",
  "&PrecedesSlantEqual;",
  "&PrecedesTilde;",
  "&preceq;",
  "&precnapprox;",
  "&precneqq;",
  "&precnsim;",
  "&precsim;",
  "&Prime;",
  "&prime;",
  "&primes;",
  "&prnap;",
  "&prnE;",
  "&prnsim;",
  "&prod;",
  "&Product;",
  "&profalar;",
  "&profline;",
  "&profsurf;",
  "&prop;",
  "&Proportion;",
  "&Proportional;",
  "&propto;",
  "&prsim;",
  "&prurel;",
  "&Pscr;",
  "&pscr;",
  "&Psi;",
  "&psi;",
  "&puncsp;",
  "&Qfr;",
  "&qfr;",
  "&qint;",
  "&Qopf;",
  "&qopf;",
  "&qprime;",
  "&Qscr;",
  "&qscr;",
  "&quaternions;",
  "&quatint;",
  "&quest;",
  "&questeq;",
  "&QUOT",
  "&quot",
  "&QUOT;",
  "&quot;",
  "&rAarr;",
  "&race;",
  "&Racute;",
  "&racute;",
  "&radic;",
  "&raemptyv;",
  "&Rang;",
  "&rang;",
  "&rangd;",
  "&range;",
  "&rangle;",
  "&raquo",
  "&raquo;",
  "&Rarr;",
  "&rArr;",
  "&rarr;",
  "&rarrap;",
  "&rarrb;",
  "&rarrbfs;",
  "&rarrc;",
  "&rarrfs;",
  "&rarrhk;",
  "&rarrlp;",
  "&rarrpl;",
  "&rarrsim;",
  "&Rarrtl;",
  "&rarrtl;",
  "&rarrw;",
  "&rAtail;",
  "&ratail;",
  "&ratio;",
  "&rationals;",
  "&RBarr;",
  "&rBarr;",
  "&rbarr;",
  "&rbbrk;",
  "&rbrace;",
  "&rbrack;",
  "&rbrke;",
  "&rbrksld;",
  "&rbrkslu;",
  "&Rcaron;",
  "&rcaron;",
  "&Rcedil;",
  "&rcedil;",
  "&rceil;",
  "&rcub;",
  "&Rcy;",
  "&rcy;",
  "&rdca;",
  "&rdldhar;",
  "&rdquo;",
  "&rdquor;",
  "&rdsh;",
  "&Re;",
  "&real;",
  "&realine;",
  "&realpart;",
  "&reals;",
  "&rect;",
  "&REG",
  "&reg",
  "&REG;",
  "&reg;",
  "&ReverseElement;",
  "&ReverseEquilibrium;",
  "&ReverseUpEquilibrium;",
  "&rfisht;",
  "&rfloor;",
  "&Rfr;",
  "&rfr;",
  "&rHar;",
  "&rhard;",
  "&rharu;",
  "&rharul;",
  "&Rho;",
  "&rho;",
  "&rhov;",
  "&RightAngleBracket;",
  "&RightArrow;",
  "&Rightarrow;",
  "&rightarrow;",
  "&RightArrowBar;",
  "&RightArrowLeftArrow;",
  "&rightarrowtail;",
  "&RightCeiling;",
  "&RightDoubleBracket;",
  "&RightDownTeeVector;",
  "&RightDownVector;",
  "&RightDownVectorBar;",
  "&RightFloor;",
  "&rightharpoondown;",
  "&rightharpoonup;",
  "&rightleftarrows;",
  "&rightleftharpoons;",
  "&rightrightarrows;",
  "&rightsquigarrow;",
  "&RightTee;",
  "&RightTeeArrow;",
  "&RightTeeVector;",
  "&rightthreetimes;",
  "&RightTriangle;",
  "&RightTriangleBar;",
  "&RightTriangleEqual;",
  "&RightUpDownVector;",
  "&RightUpTeeVector;",
  "&RightUpVector;",
  "&RightUpVectorBar;",
  "&RightVector;",
  "&RightVectorBar;",
  "&ring;",
  "&risingdotseq;",
  "&rlarr;",
  "&rlhar;",
  "&rlm;",
  "&rmoust;",
  "&rmoustache;",
  "&rnmid;",
  "&roang;",
  "&roarr;",
  "&robrk;",
  "&ropar;",
  "&Ropf;",
  "&ropf;",
  "&roplus;",
  "&rotimes;",
  "&RoundImplies;",
  "&rpar;",
  "&rpargt;",
  "&rppolint;",
  "&rrarr;",
  "&Rrightarrow;",
  "&rsaquo;",
  "&Rscr;",
  "&rscr;",
  "&Rsh;",
  "&rsh;",
  "&rsqb;",
  "&rsquo;",
  "&rsquor;",
  "&rthree;",
  "&rtimes;",
  "&rtri;",
  "&rtrie;",
  "&rtrif;",
  "&rtriltri;",
  "&RuleDelayed;",
  "&ruluhar;",
  "&rx;",
  "&Sacute;",
  "&sacute;",
  "&sbquo;",
  "&Sc;",
  "&sc;",
  "&scap;",
  "&Scaron;",
  "&scaron;",
  "&sccue;",
  "&scE;",
  "&sce;",
  "&Scedil;",
  "&scedil;",
  "&Scirc;",
  "&scirc;",
  "&scnap;",
  "&scnE;",
  "&scnsim;",
  "&scpolint;",
  "&scsim;",
  "&Scy;",
  "&scy;",
  "&sdot;",
  "&sdotb;",
  "&sdote;",
  "&searhk;",
  "&seArr;",
  "&searr;",
  "&searrow;",
  "&sect",
  "&sect;",
  "&semi;",
  "&seswar;",
  "&setminus;",
  "&setmn;",
  "&sext;",
  "&Sfr;",
  "&sfr;",
  "&sfrown;",
  "&sharp;",
  "&SHCHcy;",
  "&shchcy;",
  "&SHcy;",
  "&shcy;",
  "&ShortDownArrow;",
  "&ShortLeftArrow;",
  "&shortmid;",
  "&shortparallel;",
  "&ShortRightArrow;",
  "&ShortUpArrow;",
  "&shy",
  "&shy;",
  "&Sigma;",
  "&sigma;",
  "&sigmaf;",
  "&sigmav;",
  "&sim;",
  "&simdot;",
  "&sime;",
  "&simeq;",
  "&simg;",
  "&simgE;",
  "&siml;",
  "&simlE;",
  "&simne;",
  "&simplus;",
  "&simrarr;",
  "&slarr;",
  "&SmallCircle;",
  "&smallsetminus;",
  "&smashp;",
  "&smeparsl;",
  "&smid;",
  "&smile;",
  "&smt;",
  "&smte;",
  "&smtes;",
  "&SOFTcy;",
  "&softcy;",
  "&sol;",
  "&solb;",
  "&solbar;",
  "&Sopf;",
  "&sopf;",
  "&spades;",
  "&spadesuit;",
  "&spar;",
  "&sqcap;",
  "&sqcaps;",
  "&sqcup;",
  "&sqcups;",
  "&Sqrt;",
  "&sqsub;",
  "&sqsube;",
  "&sqsubset;",
  "&sqsubseteq;",
  "&sqsup;",
  "&sqsupe;",
  "&sqsupset;",
  "&sqsupseteq;",
  "&squ;",
  "&Square;",
  "&square;",
  "&SquareIntersection;",
  "&SquareSubset;",
  "&SquareSubsetEqual;",
  "&SquareSuperset;",
  "&SquareSupersetEqual;",
  "&SquareUnion;",
  "&squarf;",
  "&squf;",
  "&srarr;",
  "&Sscr;",
  "&sscr;",
  "&ssetmn;",
  "&ssmile;",
  "&sstarf;",
  "&Star;",
  "&star;",
  "&starf;",
  "&straightepsilon;",
  "&straightphi;",
  "&strns;",
  "&Sub;",
  "&sub;",
  "&subdot;",
  "&subE;",
  "&sube;",
  "&subedot;",
  "&submult;",
  "&subnE;",
  "&subne;",
  "&subplus;",
  "&subrarr;",
  "&Subset;",
  "&subset;",
  "&subseteq;",
  "&subseteqq;",
  "&SubsetEqual;",
  "&subsetneq;",
  "&subsetneqq;",
  "&subsim;",
  "&subsub;",
  "&subsup;",
  "&succ;",
  "&succapprox;",
  "&succcurlyeq;",
  "&Succeeds;",
  "&SucceedsEqual;",
  "&SucceedsSlantEqual;",
  "&SucceedsTilde;",
  "&succeq;",
  "&succnapprox;",
  "&succneqq;",
  "&succnsim;",
  "&succsim;",
  "&SuchThat;",
  "&Sum;",
  "&sum;",
  "&sung;",
  "&sup1",
  "&sup1;",
  "&sup2",
  "&sup2;",
  "&sup3",
  "&sup3;",
  "&Sup;",
  "&sup;",
  "&supdot;",
  "&supdsub;",
  "&supE;",
  "&supe;",
  "&supedot;",
  "&Superset;",
  "&SupersetEqual;",
  "&suphsol;",
  "&suphsub;",
  "&suplarr;",
  "&supmult;",
  "&supnE;",
  "&supne;",
  "&supplus;",
  "&Supset;",
  "&supset;",
  "&supseteq;",
  "&supseteqq;",
  "&supsetneq;",
  "&supsetneqq;",
  "&supsim;",
  "&supsub;",
  "&supsup;",
  "&swarhk;",
  "&swArr;",
  "&swarr;",
  "&swarrow;",
  "&swnwar;",
  "&szlig",
  "&szlig;",
  "&Tab;",
  "&target;",
  "&Tau;",
  "&tau;",
  "&tbrk;",
  "&Tcaron;",
  "&tcaron;",
  "&Tcedil;",
  "&tcedil;",
  "&Tcy;",
  "&tcy;",
  "&tdot;",
  "&telrec;",
  "&Tfr;",
  "&tfr;",
  "&there4;",
  "&Therefore;",
  "&therefore;",
  "&Theta;",
  "&theta;",
  "&thetasym;",
  "&thetav;",
  "&thickapprox;",
  "&thicksim;",
  "&ThickSpace;",
  "&thinsp;",
  "&ThinSpace;",
  "&thkap;",
  "&thksim;",
  "&THORN",
  "&thorn",
  "&THORN;",
  "&thorn;",
  "&Tilde;",
  "&tilde;",
  "&TildeEqual;",
  "&TildeFullEqual;",
  "&TildeTilde;",
  "&times",
  "&times;",
  "&timesb;",
  "&timesbar;",
  "&timesd;",
  "&tint;",
  "&toea;",
  "&top;",
  "&topbot;",
  "&topcir;",
  "&Topf;",
  "&topf;",
  "&topfork;",
  "&tosa;",
  "&tprime;",
  "&TRADE;",
  "&trade;",
  "&triangle;",
  "&triangledown;",
  "&triangleleft;",
  "&trianglelefteq;",
  "&triangleq;",
  "&triangleright;",
  "&trianglerighteq;",
  "&tridot;",
  "&trie;",
  "&triminus;",
  "&TripleDot;",
  "&triplus;",
  "&trisb;",
  "&tritime;",
  "&trpezium;",
  "&Tscr;",
  "&tscr;",
  "&TScy;",
  "&tscy;",
  "&TSHcy;",
  "&tshcy;",
  "&Tstrok;",
  "&tstrok;",
  "&twixt;",
  "&twoheadleftarrow;",
  "&twoheadrightarrow;",
  "&Uacute",
  "&uacute",
  "&Uacute;",
  "&uacute;",
  "&Uarr;",
  "&uArr;",
  "&uarr;",
  "&Uarrocir;",
  "&Ubrcy;",
  "&ubrcy;",
  "&Ubreve;",
  "&ubreve;",
  "&Ucirc",
  "&ucirc",
  "&Ucirc;",
  "&ucirc;",
  "&Ucy;",
  "&ucy;",
  "&udarr;",
  "&Udblac;",
  "&udblac;",
  "&udhar;",
  "&ufisht;",
  "&Ufr;",
  "&ufr;",
  "&Ugrave",
  "&ugrave",
  "&Ugrave;",
  "&ugrave;",
  "&uHar;",
  "&uharl;",
  "&uharr;",
  "&uhblk;",
  "&ulcorn;",
  "&ulcorner;",
  "&ulcrop;",
  "&ultri;",
  "&Umacr;",
  "&umacr;",
  "&uml",
  "&uml;",
  "&UnderBar;",
  "&UnderBrace;",
  "&UnderBracket;",
  "&UnderParenthesis;",
  "&Union;",
  "&UnionPlus;",
  "&Uogon;",
  "&uogon;",
  "&Uopf;",
  "&uopf;",
  "&UpArrow;",
  "&Uparrow;",
  "&uparrow;",
  "&UpArrowBar;",
  "&UpArrowDownArrow;",
  "&UpDownArrow;",
  "&Updownarrow;",
  "&updownarrow;",
  "&UpEquilibrium;",
  "&upharpoonleft;",
  "&upharpoonright;",
  "&uplus;",
  "&UpperLeftArrow;",
  "&UpperRightArrow;",
  "&Upsi;",
  "&upsi;",
  "&upsih;",
  "&Upsilon;",
  "&upsilon;",
  "&UpTee;",
  "&UpTeeArrow;",
  "&upuparrows;",
  "&urcorn;",
  "&urcorner;",
  "&urcrop;",
  "&Uring;",
  "&uring;",
  "&urtri;",
  "&Uscr;",
  "&uscr;",
  "&utdot;",
  "&Utilde;",
  "&utilde;",
  "&utri;",
  "&utrif;",
  "&uuarr;",
  "&Uuml",
  "&uuml",
  "&Uuml;",
  "&uuml;",
  "&uwangle;",
  "&vangrt;",
  "&varepsilon;",
  "&varkappa;",
  "&varnothing;",
  "&varphi;",
  "&varpi;",
  "&varpropto;",
  "&vArr;",
  "&varr;",
  "&varrho;",
  "&varsigma;",
  "&varsubsetneq;",
  "&varsubsetneqq;",
  "&varsupsetneq;",
  "&varsupsetneqq;",
  "&vartheta;",
  "&vartriangleleft;",
  "&vartriangleright;",
  "&Vbar;",
  "&vBar;",
  "&vBarv;",
  "&Vcy;",
  "&vcy;",
  "&VDash;",
  "&Vdash;",
  "&vDash;",
  "&vdash;",
  "&Vdashl;",
  "&Vee;",
  "&vee;",
  "&veebar;",
  "&veeeq;",
  "&vellip;",
  "&Verbar;",
  "&verbar;",
  "&Vert;",
  "&vert;",
  "&VerticalBar;",
  "&VerticalLine;",
  "&VerticalSeparator;",
  "&VerticalTilde;",
  "&VeryThinSpace;",
  "&Vfr;",
  "&vfr;",
  "&vltri;",
  "&vnsub;",
  "&vnsup;",
  "&Vopf;",
  "&vopf;",
  "&vprop;",
  "&vrtri;",
  "&Vscr;",
  "&vscr;",
  "&vsubnE;",
  "&vsubne;",
  "&vsupnE;",
  "&vsupne;",
  "&Vvdash;",
  "&vzigzag;",
  "&Wcirc;",
  "&wcirc;",
  "&wedbar;",
  "&Wedge;",
  "&wedge;",
  "&wedgeq;",
  "&weierp;",
  "&Wfr;",
  "&wfr;",
  "&Wopf;",
  "&wopf;",
  "&wp;",
  "&wr;",
  "&wreath;",
  "&Wscr;",
  "&wscr;",
  "&xcap;",
  "&xcirc;",
  "&xcup;",
  "&xdtri;",
  "&Xfr;",
  "&xfr;",
  "&xhArr;",
  "&xharr;",
  "&Xi;",
  "&xi;",
  "&xlArr;",
  "&xlarr;",
  "&xmap;",
  "&xnis;",
  "&xodot;",
  "&Xopf;",
  "&xopf;",
  "&xoplus;",
  "&xotime;",
  "&xrArr;",
  "&xrarr;",
  "&Xscr;",
  "&xscr;",
  "&xsqcup;",
  "&xuplus;",
  "&xutri;",
  "&xvee;",
  "&xwedge;",
  "&Yacute",
  "&yacute",
  "&Yacute;",
  "&yacute;",
  "&YAcy;",
  "&yacy;",
  "&Ycirc;",
  "&ycirc;",
  "&Ycy;",
  "&ycy;",
  "&yen",
  "&yen;",
  "&Yfr;",
  "&yfr;",
  "&YIcy;",
  "&yicy;",
  "&Yopf;",
  "&yopf;",
  "&Yscr;",
  "&yscr;",
  "&YUcy;",
  "&yucy;",
  "&yuml",
  "&Yuml;",
  "&yuml;",
  "&Zacute;",
  "&zacute;",
  "&Zcaron;",
  "&zcaron;",
  "&Zcy;",
  "&zcy;",
  "&Zdot;",
  "&zdot;",
  "&zeetrf;",
  "&ZeroWidthSpace;",
  "&Zeta;",
  "&zeta;",
  "&Zfr;",
  "&zfr;",
  "&ZHcy;",
  "&zhcy;",
  "&zigrarr;",
  "&Zopf;",
  "&zopf;",
  "&Zscr;",
  "&zscr;",
  "&zwj;",
  "&zwnj;"
];
let Ss, Pu, Iu, Ou, ku = !0;
typeof process < "u" && ({ FORCE_COLOR: Ss, NODE_DISABLE_COLORS: Pu, NO_COLOR: Iu, TERM: Ou } = process.env || {}, ku = process.stdout && process.stdout.isTTY);
const Zc = {
  enabled: !Pu && Iu == null && Ou !== "dumb" && (Ss != null && Ss !== "0" || ku)
};
function zs(r, e) {
  let t = new RegExp(`\\x1b\\[${e}m`, "g"), n = `\x1B[${r}m`, s = `\x1B[${e}m`;
  return function(i) {
    return !Zc.enabled || i == null ? i : n + (~("" + i).indexOf(s) ? i.replace(t, s + n) : i) + s;
  };
}
const Xr = zs(1, 22), xt = zs(31, 39), Yr = zs(35, 39);
var ed = Object.create, qu = Object.defineProperty, td = Object.getOwnPropertyDescriptor, xu = Object.getOwnPropertyNames, rd = Object.getPrototypeOf, nd = Object.prototype.hasOwnProperty, Lu = (r, e) => function() {
  return e || (0, r[xu(r)[0]])((e = { exports: {} }).exports, e), e.exports;
}, sd = (r, e, t, n) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let s of xu(e))
      !nd.call(r, s) && s !== t && qu(r, s, { get: () => e[s], enumerable: !(n = td(e, s)) || n.enumerable });
  return r;
}, Bu = (r, e, t) => (t = r != null ? ed(rd(r)) : {}, sd(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  !r || !r.__esModule ? qu(t, "default", { value: r, enumerable: !0 }) : t,
  r
)), id = Lu({
  "node_modules/leven/index.js"(r, e) {
    var t = [], n = [], s = (i, a) => {
      if (i === a)
        return 0;
      const o = i;
      i.length > a.length && (i = a, a = o);
      let u = i.length, l = a.length;
      for (; u > 0 && i.charCodeAt(~-u) === a.charCodeAt(~-l); )
        u--, l--;
      let c = 0;
      for (; c < u && i.charCodeAt(c) === a.charCodeAt(c); )
        c++;
      if (u -= c, l -= c, u === 0)
        return l;
      let g, v, D, A, b = 0, p = 0;
      for (; b < u; )
        n[b] = i.charCodeAt(c + b), t[b] = ++b;
      for (; p < l; )
        for (g = a.charCodeAt(c + p), D = p++, v = p, b = 0; b < u; b++)
          A = g === n[b] ? D : D + 1, D = t[b], v = t[b] = D > v ? A > v ? v + 1 : A : A > D ? D + 1 : A;
      return v;
    };
    e.exports = s, e.exports.default = s;
  }
}), ad = Lu({
  "node_modules/jsonpointer/jsonpointer.js"(r) {
    var e = /~/, t = /~[01]/g;
    function n(c) {
      switch (c) {
        case "~1":
          return "/";
        case "~0":
          return "~";
      }
      throw new Error("Invalid tilde escape: " + c);
    }
    function s(c) {
      return e.test(c) ? c.replace(t, n) : c;
    }
    function i(c, g, v) {
      for (var D, A, b = 1, p = g.length; b < p; ) {
        if (g[b] === "constructor" || g[b] === "prototype" || g[b] === "__proto__") return c;
        if (D = s(g[b++]), A = p > b, typeof c[D] > "u" && (Array.isArray(c) && D === "-" && (D = c.length), A && (g[b] !== "" && g[b] < 1 / 0 || g[b] === "-" ? c[D] = [] : c[D] = {})), !A) break;
        c = c[D];
      }
      var h = c[D];
      return v === void 0 ? delete c[D] : c[D] = v, h;
    }
    function a(c) {
      if (typeof c == "string") {
        if (c = c.split("/"), c[0] === "") return c;
        throw new Error("Invalid JSON pointer.");
      } else if (Array.isArray(c)) {
        for (const g of c)
          if (typeof g != "string" && typeof g != "number")
            throw new Error("Invalid JSON pointer. Must be of type string or number.");
        return c;
      }
      throw new Error("Invalid JSON pointer.");
    }
    function o(c, g) {
      if (typeof c != "object") throw new Error("Invalid input object.");
      g = a(g);
      var v = g.length;
      if (v === 1) return c;
      for (var D = 1; D < v; ) {
        if (c = c[s(g[D++])], v === D) return c;
        if (typeof c != "object" || c === null) return;
      }
    }
    function u(c, g, v) {
      if (typeof c != "object") throw new Error("Invalid input object.");
      if (g = a(g), g.length === 0) throw new Error("Invalid JSON pointer for set.");
      return i(c, g, v);
    }
    function l(c) {
      var g = a(c);
      return {
        get: function(v) {
          return o(v, g);
        },
        set: function(v, D) {
          return u(v, g, D);
        }
      };
    }
    r.get = o, r.set = u, r.compile = l;
  }
}), Ks = 48, od = 49, ju = 57, jr = 92, ud = 36, Rs = 46, Mu = 34, Ws = 97, Ts = 101, Jr = 102, Xs = 110, Ys = 116, Mr = 117, La = 120, ld = 122, Ns = 45, Js = 10, Fs = 43, Qs = 13, cd = 39, Ot = 47, dd = 32, fd = 9, hd = 95, Uu = 65, md = 69, pd = 70, gd = 78, yd = 88, bd = 90, Ed = 98, Vu = 114, vd = 118, Hu = 8232, Gu = 8233, Sn = 108, Dd = 115, wd = 73, Ba = 42, Ad = 11, Cd = 12, $d = 160, _d = 65279, Sd = 160, Rd = 8192, Td = 8193, Nd = 8194, Fd = 8195, Pd = 8196, Id = 8197, Od = 8198, kd = 8199, qd = 8200, xd = 8201, Ld = 8202, Bd = 8239, jd = 8287, Md = 12288, Ud = "[", Vd = "]", Hd = "{", Gd = "}", zd = ":", Kd = ",", Wd = "true", Xd = "false", Yd = "null", Jd = "NaN", Qd = "Infinity", Ps = '"', Zd = /* @__PURE__ */ new Map([
  [Ys, [Vu, Mr, Ts]],
  [Jr, [Ws, Sn, Dd, Ts]],
  [Xs, [Mr, Sn, Sn]]
]), Lt = /* @__PURE__ */ new Map([
  [Mu, Ps],
  [jr, "\\"],
  [Ot, "/"],
  [Ed, "\b"],
  [Xs, `
`],
  [Jr, "\f"],
  [Vu, "\r"],
  [Ys, "	"]
]), Ur = new Map([
  ...Lt,
  [vd, "\v"],
  [Ks, "\0"]
]), ef = /* @__PURE__ */ new Map([
  [Ps, Ps],
  ["\\", "\\"],
  ["/", "/"],
  ["\b", "b"],
  [`
`, "n"],
  ["\f", "f"],
  ["\r", "r"],
  ["	", "t"]
]);
new Map([
  ...ef,
  ["\v", "v"],
  ["\0", "0"],
  ["\u2028", "u2028"],
  ["\u2029", "u2029"]
]);
var kr = /* @__PURE__ */ new Map([
  [Ud, "LBracket"],
  [Vd, "RBracket"],
  [Hd, "LBrace"],
  [Gd, "RBrace"],
  [zd, "Colon"],
  [Kd, "Comma"],
  [Wd, "Boolean"],
  [Xd, "Boolean"],
  [Yd, "Null"]
]), Rr = new Map([
  ...kr,
  [Jd, "Number"],
  [Qd, "Number"]
]), Is = /* @__PURE__ */ new Set([
  Js,
  Qs,
  Hu,
  Gu
]), bt = class extends Error {
  /**
   * Creates a new instance.
   * @param {string} message The error message to report. 
   * @param {Location} loc The location information for the error.
   */
  constructor(r, { line: e, column: t, offset: n }) {
    super(`${r} (${e}:${t})`), this.line = e, this.column = t, this.offset = n;
  }
}, tf = class extends bt {
  /**
   * Creates a new instance.
   * @param {number} unexpected The character that was found.
   * @param {Location} loc The location information for the found character.
   */
  constructor(r, e) {
    super(`Unexpected character '${String.fromCharCode(r)}' found.`, e);
  }
}, Ft = class extends bt {
  /**
   * Creates a new instance.
   * @param {Token} token The token that was found. 
   */
  constructor(r) {
    super(`Unexpected token ${r.type} found.`, r.loc.start);
  }
}, zu = class extends bt {
  /**
   * Creates a new instance.
   * @param {Location} loc The location information for the found character.
   */
  constructor(r) {
    super("Unexpected end of input found.", r);
  }
}, rf = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/, nf = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/, sf = 13, ja = 10, Je, jt, ot, Pe, ut, Et, Mt, Hr, Ku, wu, af = (wu = class {
  /**
   * Creates a new instance.
   * @param {string} text The text to read from
   */
  constructor(r) {
    Ue(this, Hr);
    /**
     * The text to read from.
     * @type {string}
     */
    Ue(this, Je, "");
    /**
     * The current line number.
     * @type {number}
     */
    Ue(this, jt, 1);
    /**
     * The current column number.
     * @type {number}
     */
    Ue(this, ot, 0);
    /**
     * The current offset in the text.
     * @type {number}
     */
    Ue(this, Pe, -1);
    /**
     * Whether the last character read was a new line.
     * @type {boolean}
     */
    Ue(this, ut, !1);
    /**
     * The last character code read.
     * @type {number}
     */
    Ue(this, Et, -1);
    /**
     * Whether the reader has ended.
     * @type {boolean}
     */
    Ue(this, Mt, !1);
    Le(this, Je, r);
  }
  /**
   * Returns the current position of the reader.
   * @returns {Location} An object with line, column, and offset properties.
   */
  locate() {
    return {
      line: be(this, jt),
      column: be(this, ot),
      offset: be(this, Pe)
    };
  }
  /**
   * Reads the next character code in the text.
   * @returns {number} The next character code, or -1 if there are no more characters.
   */
  next() {
    if (be(this, Pe) >= be(this, Je).length - 1)
      return Di(this, Hr, Ku).call(this), -1;
    tt(this, Pe)._++;
    const r = be(this, Je).charCodeAt(be(this, Pe));
    return be(this, ut) ? (tt(this, jt)._++, Le(this, ot, 1), Le(this, ut, !1)) : tt(this, ot)._++, r === sf ? (Le(this, ut, !0), this.peek() === ja && tt(this, Pe)._++) : r === ja && Le(this, ut, !0), Le(this, Et, r), r;
  }
  /**
   * Peeks at the next character code in the text.
   * @returns {number} The next character code, or -1 if there are no more characters.
   */
  peek() {
    return be(this, Pe) === be(this, Je).length - 1 ? -1 : be(this, Je).charCodeAt(be(this, Pe) + 1);
  }
  /**
   * Returns the last character code read.
   * @returns {number} The last character code read.
   */
  current() {
    return be(this, Et);
  }
}, Je = new WeakMap(), jt = new WeakMap(), ot = new WeakMap(), Pe = new WeakMap(), ut = new WeakMap(), Et = new WeakMap(), Mt = new WeakMap(), Hr = new WeakSet(), /**
 * Ends the reader.
 * @returns {void}
 */
Ku = function() {
  be(this, Mt) || (tt(this, ot)._++, tt(this, Pe)._++, Le(this, Et, -1), Le(this, Mt, !0));
}, wu), of = "Infinity", uf = "NaN", lf = /* @__PURE__ */ new Set([Ys, Jr, Xs]), Os = /* @__PURE__ */ new Set([dd, fd, Js, Qs]), Ma = /* @__PURE__ */ new Set([
  ...Os,
  Ad,
  Cd,
  $d,
  Hu,
  Gu,
  _d,
  Sd,
  Rd,
  Td,
  Nd,
  Fd,
  Pd,
  Id,
  Od,
  kd,
  qd,
  xd,
  Ld,
  Bd,
  jd,
  Md
]), cf = {
  mode: "json",
  ranges: !1
};
function ze(r) {
  return r >= Ks && r <= ju;
}
function Rn(r) {
  return ze(r) || r >= Uu && r <= pd || r >= Ws && r <= Jr;
}
function df(r) {
  return r >= od && r <= ju;
}
function ff(r) {
  return lf.has(r);
}
function Wu(r) {
  return ze(r) || r === Rs || r === Ns;
}
function hf(r) {
  return Wu(r) || r === Fs;
}
function Ua(r, e) {
  return r === Mu || e && r === cd;
}
function Xu(r) {
  if (r === ud || r === hd || r === jr || r >= Ws && r <= ld || r >= Uu && r <= bd || r === 8204 || r === 8205)
    return !0;
  const e = String.fromCharCode(r);
  return rf.test(e);
}
function mf(r) {
  if (Xu(r) || ze(r))
    return !0;
  const e = String.fromCharCode(r);
  return nf.test(e);
}
function pf(r, e) {
  e = Object.freeze({
    ...cf,
    ...e
  });
  const t = e.mode === "json5", n = e.mode !== "json", s = new af(r), i = [], a = t ? Ur.has.bind(Ur) : Lt.has.bind(Lt), o = t ? Is.has.bind(Is) : () => !1, u = t ? (f) => f === La : () => !1, l = t ? Ma.has.bind(Ma) : Os.has.bind(Os);
  function c(f, y, w, _) {
    const O = w.offset + y;
    let U = e.ranges ? {
      range: (
        /** @type {Range} */
        [w.offset, O]
      )
    } : void 0;
    return {
      type: f,
      loc: {
        start: w,
        end: _ || {
          line: w.line,
          column: w.column + y,
          offset: O
        }
      },
      ...U
    };
  }
  function g(f) {
    for (let y = 0; y < f.length; y++) {
      if (s.peek() !== f.charCodeAt(y))
        return !1;
      s.next();
    }
    return !0;
  }
  function v(f) {
    let y = Zd.get(f), w = String.fromCharCode(f);
    for (let _ = 0; _ < y.length; _++) {
      const O = s.next();
      y[_] !== O && d(O), w += String.fromCharCode(O);
    }
    return {
      value: w,
      c: s.next()
    };
  }
  function D(f) {
    let y = "";
    do {
      if (y += String.fromCharCode(f), f === jr) {
        f = s.next(), f !== Mr && d(f), y += String.fromCharCode(f);
        const w = A(4);
        y += w.value, f = w.c;
      }
      f = s.next();
    } while (f > -1 && mf(f));
    return { value: y, c: f };
  }
  function A(f) {
    let y = "";
    for (let w = 0; w < f; w++) {
      if (E = s.next(), Rn(E)) {
        y += String.fromCharCode(E);
        continue;
      }
      d(E);
    }
    return { value: y, c: E };
  }
  function b(f) {
    const y = f;
    let w = 1;
    for (f = s.next(); f !== -1 && f !== y; ) {
      if (f === jr)
        if (w++, f = s.next(), a(f) || o(f))
          w++;
        else if (f === Mr) {
          w++;
          const _ = A(4);
          w += _.value.length, f = _.c;
        } else if (u(f)) {
          w++;
          const _ = A(2);
          w += _.value.length, f = _.c;
        } else t || d(f);
      else
        w++;
      f = s.next();
    }
    return f === -1 && m(), w++, { length: w, c: s.next() };
  }
  function p(f) {
    let y = 0;
    if (f === Ns || t && f === Fs) {
      if (y++, f = s.next(), t) {
        if (f === wd && g("nfinity"))
          return { length: of.length + 1, c: s.next() };
        if (f === gd && g("aN"))
          return { length: uf.length + 1, c: s.next() };
      }
      ze(f) || d(f);
    }
    if (f === Ks)
      if (y++, f = s.next(), t && (f === La || f === yd)) {
        y++, f = s.next(), Rn(f) || d(f);
        do
          y++, f = s.next();
        while (Rn(f));
      } else ze(f) && d(f);
    else if (!t || f !== Rs) {
      df(f) || d(f);
      do
        y++, f = s.next();
      while (ze(f));
    }
    if (f === Rs) {
      let w = -1;
      do
        y++, w++, f = s.next();
      while (ze(f));
      !t && w === 0 && (f ? d(f) : m());
    }
    if (f === Ts || f === md)
      for (y++, f = s.next(), (f === Fs || f === Ns) && (y++, f = s.next()), f === -1 && m(), ze(f) || d(f); ze(f); )
        y++, f = s.next();
    return { length: y, c: f };
  }
  function h(f) {
    let y = 1;
    if (f = s.next(), f === Ot) {
      do
        y += 1, f = s.next();
      while (f > -1 && f !== Qs && f !== Js);
      return { length: y, c: f, multiline: !1 };
    }
    if (f === Ba) {
      for (; f > -1; )
        if (y += 1, f = s.next(), f === Ba && (y += 1, f = s.next(), f === Ot))
          return y += 1, f = s.next(), { length: y, c: f, multiline: !0 };
      m();
    }
    d(f);
  }
  function d(f) {
    throw new tf(f, s.locate());
  }
  function m() {
    throw new zu(s.locate());
  }
  let E = s.next();
  for (; E > -1; ) {
    for (; l(E); )
      E = s.next();
    if (E === -1)
      break;
    const f = s.locate(), y = String.fromCharCode(E);
    if (t)
      if (Rr.has(y))
        i.push(c(Rr.get(y), 1, f)), E = s.next();
      else if (Xu(E)) {
        const w = D(E);
        let _ = w.value;
        E = w.c, Rr.has(_) ? i.push(c(Rr.get(_), _.length, f)) : i.push(c("Identifier", _.length, f));
      } else if (hf(E)) {
        const w = p(E);
        E = w.c, i.push(c("Number", w.length, f));
      } else if (Ua(E, t)) {
        const w = b(E);
        E = w.c, i.push(c("String", w.length, f, s.locate()));
      } else if (E === Ot && n) {
        const w = h(E);
        E = w.c, i.push(c(w.multiline ? "BlockComment" : "LineComment", w.length, f, s.locate()));
      } else
        d(E);
    else {
      const w = String.fromCharCode(E);
      if (kr.has(w))
        i.push(c(kr.get(w), 1, f)), E = s.next();
      else if (ff(E)) {
        const _ = v(E);
        let O = _.value;
        E = _.c, i.push(c(kr.get(O), O.length, f));
      } else if (Wu(E)) {
        const _ = p(E);
        E = _.c, i.push(c("Number", _.length, f));
      } else if (Ua(E, t)) {
        const _ = b(E);
        E = _.c, i.push(c("String", _.length, f));
      } else if (E === Ot && n) {
        const _ = h(E);
        E = _.c, i.push(c(_.multiline ? "BlockComment" : "LineComment", _.length, f, s.locate()));
      } else
        d(E);
    }
  }
  return i;
}
var Se = {
  /**
   * Creates a document node.
   * @param {ValueNode} body The body of the document.
   * @param {NodeParts} parts Additional properties for the node. 
   * @returns {DocumentNode} The document node.
   */
  document(r, e = {}) {
    return {
      type: "Document",
      body: r,
      loc: e.loc,
      ...e
    };
  },
  /**
   * Creates a string node.
   * @param {string} value The value for the string.
   * @param {NodeParts} parts Additional properties for the node. 
   * @returns {StringNode} The string node.
   */
  string(r, e = {}) {
    return {
      type: "String",
      value: r,
      loc: e.loc,
      ...e
    };
  },
  /**
   * Creates a number node.
   * @param {number} value The value for the number.
   * @param {NodeParts} parts Additional properties for the node. 
   * @returns {NumberNode} The number node.
   */
  number(r, e = {}) {
    return {
      type: "Number",
      value: r,
      loc: e.loc,
      ...e
    };
  },
  /**
   * Creates a boolean node.
   * @param {boolean} value The value for the boolean.
   * @param {NodeParts} parts Additional properties for the node. 
   * @returns {BooleanNode} The boolean node.
   */
  boolean(r, e = {}) {
    return {
      type: "Boolean",
      value: r,
      loc: e.loc,
      ...e
    };
  },
  /**
   * Creates a null node.
   * @param {NodeParts} parts Additional properties for the node. 
   * @returns {NullNode} The null node.
   */
  null(r = {}) {
    return {
      type: "Null",
      loc: r.loc,
      ...r
    };
  },
  /**
   * Creates an array node.
   * @param {Array<ElementNode>} elements The elements to add.
   * @param {NodeParts} parts Additional properties for the node. 
   * @returns {ArrayNode} The array node.
   */
  array(r, e = {}) {
    return {
      type: "Array",
      elements: r,
      loc: e.loc,
      ...e
    };
  },
  /**
   * Creates an element node.
   * @param {ValueNode} value The value for the element.
   * @param {NodeParts} parts Additional properties for the node. 
   * @returns {ElementNode} The element node.
   */
  element(r, e = {}) {
    return {
      type: "Element",
      value: r,
      loc: e.loc,
      ...e
    };
  },
  /**
   * Creates an object node.
   * @param {Array<MemberNode>} members The members to add.
   * @param {NodeParts} parts Additional properties for the node. 
   * @returns {ObjectNode} The object node.
   */
  object(r, e = {}) {
    return {
      type: "Object",
      members: r,
      loc: e.loc,
      ...e
    };
  },
  /**
   * Creates a member node.
   * @param {StringNode|IdentifierNode} name The name for the member.
   * @param {ValueNode} value The value for the member.
   * @param {NodeParts} parts Additional properties for the node. 
   * @returns {MemberNode} The member node.
   */
  member(r, e, t = {}) {
    return {
      type: "Member",
      name: r,
      value: e,
      loc: t.loc,
      ...t
    };
  },
  /**
   * Creates an identifier node.
   * @param {string} name The name for the identifier.
   * @param {NodeParts} parts Additional properties for the node.
   * @returns {IdentifierNode} The identifier node.
   */
  identifier(r, e = {}) {
    return {
      type: "Identifier",
      name: r,
      loc: e.loc,
      ...e
    };
  },
  /**
   * Creates a NaN node.
   * @param {Sign} sign The sign for the Infinity.
   * @param {NodeParts} parts Additional properties for the node.
   * @returns {NaNNode} The NaN node.
   */
  nan(r = "", e = {}) {
    return {
      type: "NaN",
      sign: r,
      loc: e.loc,
      ...e
    };
  },
  /**
   * Creates an Infinity node.
   * @param {Sign} sign The sign for the Infinity.
   * @param {NodeParts} parts Additional properties for the node.
   * @returns {InfinityNode} The Infinity node.
   */
  infinity(r = "", e = {}) {
    return {
      type: "Infinity",
      sign: r,
      loc: e.loc,
      ...e
    };
  }
}, gf = {
  mode: "json",
  ranges: !1,
  tokens: !1
};
function yf(r, e, t = !1) {
  let n = "", s = r.indexOf("\\"), i = 0;
  for (; s >= 0; ) {
    n += r.slice(i, s);
    const a = r.charAt(s + 1), o = a.charCodeAt(0);
    if (t && Ur.has(o))
      n += Ur.get(o), i = s + 2;
    else if (Lt.has(o))
      n += Lt.get(o), i = s + 2;
    else if (a === "u") {
      const u = r.slice(s + 2, s + 6);
      if (u.length < 4 || /[^0-9a-f]/i.test(u))
        throw new bt(
          `Invalid unicode escape \\u${u}.`,
          {
            line: e.loc.start.line,
            column: e.loc.start.column + s,
            offset: e.loc.start.offset + s
          }
        );
      n += String.fromCharCode(parseInt(u, 16)), i = s + 6;
    } else if (t && a === "x") {
      const u = r.slice(s + 2, s + 4);
      if (u.length < 2 || /[^0-9a-f]/i.test(u))
        throw new bt(
          `Invalid hex escape \\x${u}.`,
          {
            line: e.loc.start.line,
            column: e.loc.start.column + s,
            offset: e.loc.start.offset + s
          }
        );
      n += String.fromCharCode(parseInt(u, 16)), i = s + 4;
    } else if (t && Is.has(o))
      i = s + 2, a === "\r" && r.charAt(i) === `
` && i++;
    else if (t)
      n += a, i = s + 2;
    else
      throw new bt(
        `Invalid escape \\${a}.`,
        {
          line: e.loc.start.line,
          column: e.loc.start.column + s,
          offset: e.loc.start.offset + s
        }
      );
    s = r.indexOf("\\", i);
  }
  return n += r.slice(i), n;
}
function bf(r, e, t = !1) {
  switch (e.type) {
    case "Boolean":
      return r === "true";
    case "Number":
      return Number(r);
    case "String":
      return yf(r.slice(1, -1), e, t);
    default:
      throw new TypeError(`Unknown token type "${e.type}.`);
  }
}
function Ef(r, e) {
  e = Object.freeze({
    ...gf,
    ...e
  });
  const t = pf(r, {
    mode: e.mode,
    ranges: e.ranges
  });
  let n = 0;
  const s = e.mode === "json5";
  function i() {
    return t[n++];
  }
  function a() {
    const f = t[n++];
    return f && f.type.endsWith("Comment") ? a() : f;
  }
  const o = e.mode === "json" ? i : a;
  function u(f, y) {
    if (!f || f.type !== y)
      throw new Ft(f);
  }
  function l(f, y) {
    if (!f || !y.includes(f.type))
      throw new Ft(f);
  }
  function c(f, y) {
    return e.ranges ? {
      range: [f.offset, y.offset]
    } : void 0;
  }
  function g(f) {
    const y = c(f.loc.start, f.loc.end), w = bf(
      r.slice(f.loc.start.offset, f.loc.end.offset),
      f,
      s
    ), O = { loc: {
      start: {
        ...f.loc.start
      },
      end: {
        ...f.loc.end
      }
    }, ...y };
    switch (f.type) {
      case "String":
        return Se.string(
          /** @type {string} */
          w,
          O
        );
      case "Number":
        return Se.number(
          /** @type {number} */
          w,
          O
        );
      case "Boolean":
        return Se.boolean(
          /** @type {boolean} */
          w,
          O
        );
      default:
        throw new TypeError(`Unknown token type ${f.type}.`);
    }
  }
  function v(f) {
    const y = c(f.loc.start, f.loc.end), w = r.slice(f.loc.start.offset, f.loc.end.offset), O = { loc: {
      start: {
        ...f.loc.start
      },
      end: {
        ...f.loc.end
      }
    }, ...y };
    if (f.type !== "Identifier") {
      let U = "";
      return (w[0] === "+" || w[0] === "-") && (U = w[0]), Se[w.includes("NaN") ? "nan" : "infinity"](
        /** @type {Sign} */
        U,
        O
      );
    }
    return Se.identifier(w, O);
  }
  function D(f) {
    const y = c(f.loc.start, f.loc.end);
    return Se.null({
      loc: {
        start: {
          ...f.loc.start
        },
        end: {
          ...f.loc.end
        }
      },
      ...y
    });
  }
  function A(f) {
    s ? l(f, ["String", "Identifier", "Number"]) : u(f, "String");
    let y = f.type === "String" ? (
      /** @type {StringNode} */
      g(f)
    ) : (
      /** @type {IdentifierNode|NaNNode|InfinityNode} */
      v(f)
    );
    if (s && (y.type === "NaN" || y.type === "Infinity")) {
      if (y.sign !== "")
        throw new Ft(f);
      y = Se.identifier(y.type, { loc: y.loc, ...c(y.loc.start, y.loc.end) });
    }
    f = o(), u(f, "Colon");
    const w = h(), _ = c(y.loc.start, w.loc.end);
    return Se.member(
      /** @type {StringNode|IdentifierNode} */
      y,
      w,
      {
        loc: {
          start: {
            ...y.loc.start
          },
          end: {
            ...w.loc.end
          }
        },
        ..._
      }
    );
  }
  function b(f) {
    u(f, "LBrace");
    const y = [];
    let w = o();
    if (w && w.type !== "RBrace")
      do {
        if (y.push(A(w)), w = o(), !w)
          throw new zu(y[y.length - 1].loc.end);
        if (w.type === "Comma") {
          if (w = o(), s && w.type === "RBrace")
            break;
        } else
          break;
      } while (w);
    u(w, "RBrace");
    const _ = c(f.loc.start, w.loc.end);
    return Se.object(y, {
      loc: {
        start: {
          ...f.loc.start
        },
        end: {
          ...w.loc.end
        }
      },
      ..._
    });
  }
  function p(f) {
    u(f, "LBracket");
    const y = [];
    let w = o();
    if (w && w.type !== "RBracket")
      do {
        const O = h(w);
        if (y.push(Se.element(
          O,
          { loc: O.loc }
        )), w = o(), w.type === "Comma") {
          if (w = o(), s && w.type === "RBracket")
            break;
        } else
          break;
      } while (w);
    u(w, "RBracket");
    const _ = c(f.loc.start, w.loc.end);
    return Se.array(y, {
      loc: {
        start: {
          ...f.loc.start
        },
        end: {
          ...w.loc.end
        }
      },
      ..._
    });
  }
  function h(f) {
    switch (f = f || o(), f.type) {
      case "String":
      case "Boolean":
        return g(f);
      case "Number":
        if (s) {
          let y = r.slice(f.loc.start.offset, f.loc.end.offset);
          if ((y[0] === "+" || y[0] === "-") && (y = y.slice(1)), y === "NaN" || y === "Infinity")
            return v(f);
        }
        return g(f);
      case "Null":
        return D(f);
      case "LBrace":
        return b(f);
      case "LBracket":
        return p(f);
      default:
        throw new Ft(f);
    }
  }
  const d = h(), m = o();
  if (m)
    throw new Ft(m);
  const E = {
    loc: {
      start: {
        line: 1,
        column: 1,
        offset: 0
      },
      end: {
        ...d.loc.end
      }
    }
  };
  return e.tokens && (E.tokens = t), e.ranges && (E.range = [
    E.loc.start.offset,
    E.loc.end.offset
  ]), Se.document(d, E);
}
var vf = (r) => (e) => r === e, Df = (r) => (e) => !r(e), wf = (r) => Object.values(r), Af = (r) => r !== void 0, Zs = (r) => (e) => e.keyword === r, Cf = Zs("required"), $f = Zs("anyOf"), Yu = Zs("enum"), kt = (r) => r && r.errors ? r.errors.map(
  (e) => e.keyword === "errorMessage" ? { ...e.params.errors[0], message: e.message } : e
) : [], Ju = (r) => r && wf(r.children) || [], _f = (r) => (e) => Ju(r).filter(Df(vf(e))), Va = (r) => (e) => e.reduce((t, n) => t.concat(n), r), Ha = /\r\n|[\n\r\u2028\u2029]/;
function Sf(r, e) {
  const t = {
    ...r.start
  }, n = {
    ...t,
    ...r.end
  }, s = 2, i = 3, a = t.line, o = t.column, u = n.line, l = n.column, c = Math.max(a - (s + 1), 0), g = Math.min(e.length, u + i), v = u - a, D = {};
  if (v)
    for (let A = 0; A <= v; A++) {
      const b = A + a;
      if (!o)
        D[b] = !0;
      else if (A === 0) {
        const p = e[b - 1].length;
        D[b] = [o, p - o + 1];
      } else if (A === v)
        D[b] = [0, l];
      else {
        const p = e[b - A].length;
        D[b] = [0, p];
      }
    }
  else
    o === l ? o ? D[a] = [o, 0] : D[a] = !0 : D[a] = [o, l - o];
  return { start: c, end: g, markerLines: D };
}
function Rf(r, e, t = {}) {
  const n = r.split(Ha), { start: s, end: i, markerLines: a } = Sf(e, n), o = String(i).length;
  return r.split(Ha, i).slice(s, i).map((u, l) => {
    const c = s + 1 + l, v = ` ${` ${String(c)}`.slice(-o)} |`, D = a[c], A = !a[c + 1];
    if (D) {
      let b = "";
      if (Array.isArray(D)) {
        const p = u.slice(0, Math.max(D[0] - 1, 0)).replace(/[^\t]/g, " "), h = D[1] || 1;
        b = [
          `
 `,
          v.replace(/\d/g, " "),
          " ",
          p,
          "^".repeat(h)
        ].join(""), A && t.message && (b += " " + t.message);
      }
      return [
        ">",
        v,
        u.length > 0 ? ` ${u}` : "",
        b
      ].join("");
    } else
      return [" ", v, u.length > 0 ? ` ${u}` : ""].join("");
  }).join(`
`);
}
var Qu = (r) => r.split("/").slice(1).map((e) => e.split("~1").join("/").split("~0").join("~"));
function Tf(r, e, t) {
  const n = Qu(e), s = n.length - 1;
  return n.reduce((i, a, o) => {
    switch (i.type) {
      case "Object": {
        const u = i.members.filter(
          (g) => g.name.value === a
        );
        if (u.length !== 1)
          throw new Error(`Couldn't find property ${a} of ${e}`);
        const { name: l, value: c } = u[0];
        return t && o === s ? l : c;
      }
      case "Array":
        return i.elements[a].value;
      default:
        console.log(i);
    }
  }, r.body);
}
function Nf(r, e) {
  let t = "";
  return Qu(e).reduce((n, s) => {
    switch (n.type) {
      case "Element":
        n = n.value;
      /* eslint-disable-next-line no-fallthrough -- explicitly want fallthrough here */
      case "Object": {
        t += `/${s}`;
        const i = n.members.filter(
          (a) => a.name.value === s
        );
        if (i.length !== 1)
          throw new Error(`Couldn't find property ${s} of ${e}`);
        return i[0].value;
      }
      case "Array":
        return t += `/${s}${Ff(n.elements[s])}`, n.elements[s];
      default:
        console.log(n);
    }
  }, r.body), t;
}
function Ff(r) {
  if (!r || !r.elements)
    return "";
  const e = r.elements.filter(
    (t) => t && t.name && t.name.value === "type"
  );
  return e.length && e[0].value && `:${e[0].value.value}` || "";
}
var Qr = class {
  constructor(r = { isIdentifierLocation: !1 }, { data: e, schema: t, jsonAst: n, jsonRaw: s }) {
    this.options = r, this.data = e, this.schema = t, this.jsonAst = n, this.jsonRaw = s;
  }
  getLocation(r = this.instancePath) {
    const { isIdentifierLocation: e, isSkipEndLocation: t } = this.options, { loc: n } = Tf(
      this.jsonAst,
      r,
      e
    );
    return {
      start: n.start,
      end: t ? void 0 : n.end
    };
  }
  getDecoratedPath(r = this.instancePath) {
    return Nf(this.jsonAst, r);
  }
  getCodeFrame(r, e = this.instancePath) {
    return Rf(this.jsonRaw, this.getLocation(e), {
      message: r
    });
  }
  /**
   * @return {string}
   */
  get instancePath() {
    return typeof this.options.instancePath < "u" ? this.options.instancePath : this.options.dataPath;
  }
  print() {
    throw new Error(
      `Implement the 'print' method inside ${this.constructor.name}!`
    );
  }
  getError() {
    throw new Error(
      `Implement the 'getError' method inside ${this.constructor.name}!`
    );
  }
}, Pf = Xr("REQUIRED"), If = class extends Qr {
  getLocation(r = this.instancePath) {
    const { start: e } = super.getLocation(r);
    return { start: e };
  }
  print() {
    const { message: r, params: e } = this.options;
    return [`${xt(`${Pf} ${r}`)}
`].concat(
      this.getCodeFrame(`${Yr(e.missingProperty)} is missing here!`)
    );
  }
  getError() {
    const { message: r } = this.options;
    return {
      ...this.getLocation(),
      error: `${this.getDecoratedPath()} ${r}`,
      path: this.instancePath
    };
  }
}, Of = Xr("ADDITIONAL PROPERTY"), kf = class extends Qr {
  constructor(...r) {
    super(...r), this.options.isIdentifierLocation = !0;
  }
  print() {
    const { message: r, params: e } = this.options;
    return [`${xt(`${Of} ${r}`)}
`].concat(
      this.getCodeFrame(
        `${Yr(e.additionalProperty)} is not expected to be here!`,
        `${this.instancePath}/${e.additionalProperty}`
      )
    );
  }
  getError() {
    const { params: r } = this.options;
    return {
      ...this.getLocation(`${this.instancePath}/${r.additionalProperty}`),
      error: `${this.getDecoratedPath()} Property ${r.additionalProperty} is not expected to be here`,
      path: this.instancePath
    };
  }
}, qf = Bu(id()), xf = Bu(ad()), Lf = Xr("ENUM"), Ga = class extends Qr {
  print() {
    const {
      message: r,
      params: { allowedValues: e }
    } = this.options, t = this.findBestMatch(), n = xt(`${Lf} ${r}`), s = xt(`(${e.join(", ")})`);
    return [n, `${s}
`].concat(
      this.getCodeFrame(
        t !== null ? `Did you mean ${Yr(t)} here?` : "Unexpected value, should be equal to one of the allowed values"
      )
    );
  }
  getError() {
    const { message: r, params: e } = this.options, t = this.findBestMatch(), n = e.allowedValues.join(", "), s = {
      ...this.getLocation(),
      error: `${this.getDecoratedPath()} ${r}: ${n}`,
      path: this.instancePath
    };
    return t !== null && (s.suggestion = `Did you mean ${t}?`), s;
  }
  findBestMatch() {
    const {
      params: { allowedValues: r }
    } = this.options, e = this.instancePath === "" ? this.data : xf.default.get(this.data, this.instancePath);
    if (!e)
      return null;
    const t = r.map((n) => ({
      value: n,
      weight: (0, qf.default)(n, e.toString())
    })).sort(
      (n, s) => n.weight > s.weight ? 1 : n.weight < s.weight ? -1 : 0
    )[0];
    return r.length === 1 || t.weight < t.value.length ? t.value : null;
  }
}, Bf = class extends Qr {
  print() {
    const { keyword: r, message: e } = this.options;
    return [`${xt(`${Xr(r.toUpperCase())} ${e}`)}
`].concat(this.getCodeFrame(`${Yr(r)} ${e}`));
  }
  getError() {
    const { keyword: r, message: e } = this.options;
    return {
      ...this.getLocation(),
      error: `${this.getDecoratedPath()}: ${r} ${e}`,
      path: this.instancePath
    };
  }
}, jf = /\/[\w_-]+(\/\d+)?/g;
function Mf(r = []) {
  const e = { children: {} };
  return r.forEach((t) => {
    const n = typeof t.instancePath < "u" ? t.instancePath : t.dataPath, s = n === "" ? [""] : n.match(jf);
    s && s.reduce((i, a, o) => (i.children[a] = i.children[a] || { children: {}, errors: [] }, o === s.length - 1 && i.children[a].errors.push(t), i.children[a]), e);
  }), e;
}
function Zu(r, e, t) {
  kt(r).forEach((n) => {
    Cf(n) && (r.errors = [n], r.children = {});
  }), kt(r).some($f) && Object.keys(r.children).length > 0 && delete r.errors, r.errors && r.errors.length && kt(r).every(Yu) && _f(e)(r).filter(Af).some(kt) && delete e.children[t], Object.entries(r.children).forEach(
    ([n, s]) => Zu(s, r, n)
  );
}
function el(r, e) {
  const t = kt(r);
  if (t.length && t.every(Yu)) {
    const s = [...new Set(
      Va([])(t.map((a) => a.params.allowedValues))
    )], i = t[0];
    return [
      new Ga(
        {
          ...i,
          params: { allowedValues: s }
        },
        e
      )
    ];
  } else
    return Va(
      t.reduce((n, s) => {
        switch (s.keyword) {
          case "additionalProperties":
            return n.concat(
              new kf(s, e)
            );
          case "enum":
            return n.concat(new Ga(s, e));
          case "required":
            return n.concat(new If(s, e));
          default:
            return n.concat(new Bf(s, e));
        }
      }, [])
    )(Ju(r).map((n) => el(n, e)));
}
var Uf = (r, e) => {
  const t = Mf(r || []);
  return Zu(t), el(t, e);
}, Vf = (r, e, t, n = {}) => {
  const { format: s = "cli", indent: i = null, json: a = null } = n, o = a || JSON.stringify(e, null, i), u = Ef(o), l = (v) => v.print().join(`
`), c = (v) => v.getError(), g = Uf(t, {
    data: e,
    schema: r,
    jsonAst: u,
    jsonRaw: o
  });
  return s === "cli" ? g.map(l).join(`

`) : g.map(c);
};
const tl = {};
typeof process < "u" && (process.env, process.stdout && process.stdout.isTTY);
var Tr = { exports: {} }, Tn, za;
function Zr() {
  if (za) return Tn;
  za = 1;
  const r = "2.0.0", e = 256, t = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, n = 16, s = e - 6;
  return Tn = {
    MAX_LENGTH: e,
    MAX_SAFE_COMPONENT_LENGTH: n,
    MAX_SAFE_BUILD_LENGTH: s,
    MAX_SAFE_INTEGER: t,
    RELEASE_TYPES: [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ],
    SEMVER_SPEC_VERSION: r,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  }, Tn;
}
var Nn, Ka;
function en() {
  return Ka || (Ka = 1, Nn = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
  }), Nn;
}
var Wa;
function Ut() {
  return Wa || (Wa = 1, function(r, e) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: t,
      MAX_SAFE_BUILD_LENGTH: n,
      MAX_LENGTH: s
    } = Zr(), i = en();
    e = r.exports = {};
    const a = e.re = [], o = e.safeRe = [], u = e.src = [], l = e.t = {};
    let c = 0;
    const g = "[a-zA-Z0-9-]", v = [
      ["\\s", 1],
      ["\\d", s],
      [g, n]
    ], D = (b) => {
      for (const [p, h] of v)
        b = b.split(`${p}*`).join(`${p}{0,${h}}`).split(`${p}+`).join(`${p}{1,${h}}`);
      return b;
    }, A = (b, p, h) => {
      const d = D(p), m = c++;
      i(b, m, p), l[b] = m, u[m] = p, a[m] = new RegExp(p, h ? "g" : void 0), o[m] = new RegExp(d, h ? "g" : void 0);
    };
    A("NUMERICIDENTIFIER", "0|[1-9]\\d*"), A("NUMERICIDENTIFIERLOOSE", "\\d+"), A("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${g}*`), A("MAINVERSION", `(${u[l.NUMERICIDENTIFIER]})\\.(${u[l.NUMERICIDENTIFIER]})\\.(${u[l.NUMERICIDENTIFIER]})`), A("MAINVERSIONLOOSE", `(${u[l.NUMERICIDENTIFIERLOOSE]})\\.(${u[l.NUMERICIDENTIFIERLOOSE]})\\.(${u[l.NUMERICIDENTIFIERLOOSE]})`), A("PRERELEASEIDENTIFIER", `(?:${u[l.NUMERICIDENTIFIER]}|${u[l.NONNUMERICIDENTIFIER]})`), A("PRERELEASEIDENTIFIERLOOSE", `(?:${u[l.NUMERICIDENTIFIERLOOSE]}|${u[l.NONNUMERICIDENTIFIER]})`), A("PRERELEASE", `(?:-(${u[l.PRERELEASEIDENTIFIER]}(?:\\.${u[l.PRERELEASEIDENTIFIER]})*))`), A("PRERELEASELOOSE", `(?:-?(${u[l.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${u[l.PRERELEASEIDENTIFIERLOOSE]})*))`), A("BUILDIDENTIFIER", `${g}+`), A("BUILD", `(?:\\+(${u[l.BUILDIDENTIFIER]}(?:\\.${u[l.BUILDIDENTIFIER]})*))`), A("FULLPLAIN", `v?${u[l.MAINVERSION]}${u[l.PRERELEASE]}?${u[l.BUILD]}?`), A("FULL", `^${u[l.FULLPLAIN]}$`), A("LOOSEPLAIN", `[v=\\s]*${u[l.MAINVERSIONLOOSE]}${u[l.PRERELEASELOOSE]}?${u[l.BUILD]}?`), A("LOOSE", `^${u[l.LOOSEPLAIN]}$`), A("GTLT", "((?:<|>)?=?)"), A("XRANGEIDENTIFIERLOOSE", `${u[l.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), A("XRANGEIDENTIFIER", `${u[l.NUMERICIDENTIFIER]}|x|X|\\*`), A("XRANGEPLAIN", `[v=\\s]*(${u[l.XRANGEIDENTIFIER]})(?:\\.(${u[l.XRANGEIDENTIFIER]})(?:\\.(${u[l.XRANGEIDENTIFIER]})(?:${u[l.PRERELEASE]})?${u[l.BUILD]}?)?)?`), A("XRANGEPLAINLOOSE", `[v=\\s]*(${u[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${u[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${u[l.XRANGEIDENTIFIERLOOSE]})(?:${u[l.PRERELEASELOOSE]})?${u[l.BUILD]}?)?)?`), A("XRANGE", `^${u[l.GTLT]}\\s*${u[l.XRANGEPLAIN]}$`), A("XRANGELOOSE", `^${u[l.GTLT]}\\s*${u[l.XRANGEPLAINLOOSE]}$`), A("COERCEPLAIN", `(^|[^\\d])(\\d{1,${t}})(?:\\.(\\d{1,${t}}))?(?:\\.(\\d{1,${t}}))?`), A("COERCE", `${u[l.COERCEPLAIN]}(?:$|[^\\d])`), A("COERCEFULL", u[l.COERCEPLAIN] + `(?:${u[l.PRERELEASE]})?(?:${u[l.BUILD]})?(?:$|[^\\d])`), A("COERCERTL", u[l.COERCE], !0), A("COERCERTLFULL", u[l.COERCEFULL], !0), A("LONETILDE", "(?:~>?)"), A("TILDETRIM", `(\\s*)${u[l.LONETILDE]}\\s+`, !0), e.tildeTrimReplace = "$1~", A("TILDE", `^${u[l.LONETILDE]}${u[l.XRANGEPLAIN]}$`), A("TILDELOOSE", `^${u[l.LONETILDE]}${u[l.XRANGEPLAINLOOSE]}$`), A("LONECARET", "(?:\\^)"), A("CARETTRIM", `(\\s*)${u[l.LONECARET]}\\s+`, !0), e.caretTrimReplace = "$1^", A("CARET", `^${u[l.LONECARET]}${u[l.XRANGEPLAIN]}$`), A("CARETLOOSE", `^${u[l.LONECARET]}${u[l.XRANGEPLAINLOOSE]}$`), A("COMPARATORLOOSE", `^${u[l.GTLT]}\\s*(${u[l.LOOSEPLAIN]})$|^$`), A("COMPARATOR", `^${u[l.GTLT]}\\s*(${u[l.FULLPLAIN]})$|^$`), A("COMPARATORTRIM", `(\\s*)${u[l.GTLT]}\\s*(${u[l.LOOSEPLAIN]}|${u[l.XRANGEPLAIN]})`, !0), e.comparatorTrimReplace = "$1$2$3", A("HYPHENRANGE", `^\\s*(${u[l.XRANGEPLAIN]})\\s+-\\s+(${u[l.XRANGEPLAIN]})\\s*$`), A("HYPHENRANGELOOSE", `^\\s*(${u[l.XRANGEPLAINLOOSE]})\\s+-\\s+(${u[l.XRANGEPLAINLOOSE]})\\s*$`), A("STAR", "(<|>)?=?\\s*\\*"), A("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), A("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }(Tr, Tr.exports)), Tr.exports;
}
var Fn, Xa;
function ei() {
  if (Xa) return Fn;
  Xa = 1;
  const r = Object.freeze({ loose: !0 }), e = Object.freeze({});
  return Fn = (n) => n ? typeof n != "object" ? r : n : e, Fn;
}
var Pn, Ya;
function rl() {
  if (Ya) return Pn;
  Ya = 1;
  const r = /^[0-9]+$/, e = (n, s) => {
    const i = r.test(n), a = r.test(s);
    return i && a && (n = +n, s = +s), n === s ? 0 : i && !a ? -1 : a && !i ? 1 : n < s ? -1 : 1;
  };
  return Pn = {
    compareIdentifiers: e,
    rcompareIdentifiers: (n, s) => e(s, n)
  }, Pn;
}
var In, Ja;
function ve() {
  if (Ja) return In;
  Ja = 1;
  const r = en(), { MAX_LENGTH: e, MAX_SAFE_INTEGER: t } = Zr(), { safeRe: n, t: s } = Ut(), i = ei(), { compareIdentifiers: a } = rl();
  class o {
    constructor(l, c) {
      if (c = i(c), l instanceof o) {
        if (l.loose === !!c.loose && l.includePrerelease === !!c.includePrerelease)
          return l;
        l = l.version;
      } else if (typeof l != "string")
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof l}".`);
      if (l.length > e)
        throw new TypeError(
          `version is longer than ${e} characters`
        );
      r("SemVer", l, c), this.options = c, this.loose = !!c.loose, this.includePrerelease = !!c.includePrerelease;
      const g = l.trim().match(c.loose ? n[s.LOOSE] : n[s.FULL]);
      if (!g)
        throw new TypeError(`Invalid Version: ${l}`);
      if (this.raw = l, this.major = +g[1], this.minor = +g[2], this.patch = +g[3], this.major > t || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > t || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > t || this.patch < 0)
        throw new TypeError("Invalid patch version");
      g[4] ? this.prerelease = g[4].split(".").map((v) => {
        if (/^[0-9]+$/.test(v)) {
          const D = +v;
          if (D >= 0 && D < t)
            return D;
        }
        return v;
      }) : this.prerelease = [], this.build = g[5] ? g[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(l) {
      if (r("SemVer.compare", this.version, this.options, l), !(l instanceof o)) {
        if (typeof l == "string" && l === this.version)
          return 0;
        l = new o(l, this.options);
      }
      return l.version === this.version ? 0 : this.compareMain(l) || this.comparePre(l);
    }
    compareMain(l) {
      return l instanceof o || (l = new o(l, this.options)), a(this.major, l.major) || a(this.minor, l.minor) || a(this.patch, l.patch);
    }
    comparePre(l) {
      if (l instanceof o || (l = new o(l, this.options)), this.prerelease.length && !l.prerelease.length)
        return -1;
      if (!this.prerelease.length && l.prerelease.length)
        return 1;
      if (!this.prerelease.length && !l.prerelease.length)
        return 0;
      let c = 0;
      do {
        const g = this.prerelease[c], v = l.prerelease[c];
        if (r("prerelease compare", c, g, v), g === void 0 && v === void 0)
          return 0;
        if (v === void 0)
          return 1;
        if (g === void 0)
          return -1;
        if (g === v)
          continue;
        return a(g, v);
      } while (++c);
    }
    compareBuild(l) {
      l instanceof o || (l = new o(l, this.options));
      let c = 0;
      do {
        const g = this.build[c], v = l.build[c];
        if (r("build compare", c, g, v), g === void 0 && v === void 0)
          return 0;
        if (v === void 0)
          return 1;
        if (g === void 0)
          return -1;
        if (g === v)
          continue;
        return a(g, v);
      } while (++c);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(l, c, g) {
      switch (l) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", c, g);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", c, g);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", c, g), this.inc("pre", c, g);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", c, g), this.inc("pre", c, g);
          break;
        case "major":
          (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
          break;
        case "minor":
          (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
          break;
        case "patch":
          this.prerelease.length === 0 && this.patch++, this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
        case "pre": {
          const v = Number(g) ? 1 : 0;
          if (!c && g === !1)
            throw new Error("invalid increment argument: identifier is empty");
          if (this.prerelease.length === 0)
            this.prerelease = [v];
          else {
            let D = this.prerelease.length;
            for (; --D >= 0; )
              typeof this.prerelease[D] == "number" && (this.prerelease[D]++, D = -2);
            if (D === -1) {
              if (c === this.prerelease.join(".") && g === !1)
                throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(v);
            }
          }
          if (c) {
            let D = [c, v];
            g === !1 && (D = [c]), a(this.prerelease[0], c) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = D) : this.prerelease = D;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${l}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return In = o, In;
}
var On, Qa;
function At() {
  if (Qa) return On;
  Qa = 1;
  const r = ve();
  return On = (t, n, s = !1) => {
    if (t instanceof r)
      return t;
    try {
      return new r(t, n);
    } catch (i) {
      if (!s)
        return null;
      throw i;
    }
  }, On;
}
var kn, Za;
function Hf() {
  if (Za) return kn;
  Za = 1;
  const r = At();
  return kn = (t, n) => {
    const s = r(t, n);
    return s ? s.version : null;
  }, kn;
}
var qn, eo;
function Gf() {
  if (eo) return qn;
  eo = 1;
  const r = At();
  return qn = (t, n) => {
    const s = r(t.trim().replace(/^[=v]+/, ""), n);
    return s ? s.version : null;
  }, qn;
}
var xn, to;
function zf() {
  if (to) return xn;
  to = 1;
  const r = ve();
  return xn = (t, n, s, i, a) => {
    typeof s == "string" && (a = i, i = s, s = void 0);
    try {
      return new r(
        t instanceof r ? t.version : t,
        s
      ).inc(n, i, a).version;
    } catch {
      return null;
    }
  }, xn;
}
var Ln, ro;
function Kf() {
  if (ro) return Ln;
  ro = 1;
  const r = At();
  return Ln = (t, n) => {
    const s = r(t, null, !0), i = r(n, null, !0), a = s.compare(i);
    if (a === 0)
      return null;
    const o = a > 0, u = o ? s : i, l = o ? i : s, c = !!u.prerelease.length;
    if (!!l.prerelease.length && !c)
      return !l.patch && !l.minor ? "major" : u.patch ? "patch" : u.minor ? "minor" : "major";
    const v = c ? "pre" : "";
    return s.major !== i.major ? v + "major" : s.minor !== i.minor ? v + "minor" : s.patch !== i.patch ? v + "patch" : "prerelease";
  }, Ln;
}
var Bn, no;
function Wf() {
  if (no) return Bn;
  no = 1;
  const r = ve();
  return Bn = (t, n) => new r(t, n).major, Bn;
}
var jn, so;
function Xf() {
  if (so) return jn;
  so = 1;
  const r = ve();
  return jn = (t, n) => new r(t, n).minor, jn;
}
var Mn, io;
function Yf() {
  if (io) return Mn;
  io = 1;
  const r = ve();
  return Mn = (t, n) => new r(t, n).patch, Mn;
}
var Un, ao;
function Jf() {
  if (ao) return Un;
  ao = 1;
  const r = At();
  return Un = (t, n) => {
    const s = r(t, n);
    return s && s.prerelease.length ? s.prerelease : null;
  }, Un;
}
var Vn, oo;
function qe() {
  if (oo) return Vn;
  oo = 1;
  const r = ve();
  return Vn = (t, n, s) => new r(t, s).compare(new r(n, s)), Vn;
}
var Hn, uo;
function Qf() {
  if (uo) return Hn;
  uo = 1;
  const r = qe();
  return Hn = (t, n, s) => r(n, t, s), Hn;
}
var Gn, lo;
function Zf() {
  if (lo) return Gn;
  lo = 1;
  const r = qe();
  return Gn = (t, n) => r(t, n, !0), Gn;
}
var zn, co;
function ti() {
  if (co) return zn;
  co = 1;
  const r = ve();
  return zn = (t, n, s) => {
    const i = new r(t, s), a = new r(n, s);
    return i.compare(a) || i.compareBuild(a);
  }, zn;
}
var Kn, fo;
function eh() {
  if (fo) return Kn;
  fo = 1;
  const r = ti();
  return Kn = (t, n) => t.sort((s, i) => r(s, i, n)), Kn;
}
var Wn, ho;
function th() {
  if (ho) return Wn;
  ho = 1;
  const r = ti();
  return Wn = (t, n) => t.sort((s, i) => r(i, s, n)), Wn;
}
var Xn, mo;
function tn() {
  if (mo) return Xn;
  mo = 1;
  const r = qe();
  return Xn = (t, n, s) => r(t, n, s) > 0, Xn;
}
var Yn, po;
function ri() {
  if (po) return Yn;
  po = 1;
  const r = qe();
  return Yn = (t, n, s) => r(t, n, s) < 0, Yn;
}
var Jn, go;
function nl() {
  if (go) return Jn;
  go = 1;
  const r = qe();
  return Jn = (t, n, s) => r(t, n, s) === 0, Jn;
}
var Qn, yo;
function sl() {
  if (yo) return Qn;
  yo = 1;
  const r = qe();
  return Qn = (t, n, s) => r(t, n, s) !== 0, Qn;
}
var Zn, bo;
function ni() {
  if (bo) return Zn;
  bo = 1;
  const r = qe();
  return Zn = (t, n, s) => r(t, n, s) >= 0, Zn;
}
var es, Eo;
function si() {
  if (Eo) return es;
  Eo = 1;
  const r = qe();
  return es = (t, n, s) => r(t, n, s) <= 0, es;
}
var ts, vo;
function il() {
  if (vo) return ts;
  vo = 1;
  const r = nl(), e = sl(), t = tn(), n = ni(), s = ri(), i = si();
  return ts = (o, u, l, c) => {
    switch (u) {
      case "===":
        return typeof o == "object" && (o = o.version), typeof l == "object" && (l = l.version), o === l;
      case "!==":
        return typeof o == "object" && (o = o.version), typeof l == "object" && (l = l.version), o !== l;
      case "":
      case "=":
      case "==":
        return r(o, l, c);
      case "!=":
        return e(o, l, c);
      case ">":
        return t(o, l, c);
      case ">=":
        return n(o, l, c);
      case "<":
        return s(o, l, c);
      case "<=":
        return i(o, l, c);
      default:
        throw new TypeError(`Invalid operator: ${u}`);
    }
  }, ts;
}
var rs, Do;
function rh() {
  if (Do) return rs;
  Do = 1;
  const r = ve(), e = At(), { safeRe: t, t: n } = Ut();
  return rs = (i, a) => {
    if (i instanceof r)
      return i;
    if (typeof i == "number" && (i = String(i)), typeof i != "string")
      return null;
    a = a || {};
    let o = null;
    if (!a.rtl)
      o = i.match(a.includePrerelease ? t[n.COERCEFULL] : t[n.COERCE]);
    else {
      const D = a.includePrerelease ? t[n.COERCERTLFULL] : t[n.COERCERTL];
      let A;
      for (; (A = D.exec(i)) && (!o || o.index + o[0].length !== i.length); )
        (!o || A.index + A[0].length !== o.index + o[0].length) && (o = A), D.lastIndex = A.index + A[1].length + A[2].length;
      D.lastIndex = -1;
    }
    if (o === null)
      return null;
    const u = o[2], l = o[3] || "0", c = o[4] || "0", g = a.includePrerelease && o[5] ? `-${o[5]}` : "", v = a.includePrerelease && o[6] ? `+${o[6]}` : "";
    return e(`${u}.${l}.${c}${g}${v}`, a);
  }, rs;
}
var ns, wo;
function nh() {
  if (wo) return ns;
  wo = 1;
  class r {
    constructor() {
      this.max = 1e3, this.map = /* @__PURE__ */ new Map();
    }
    get(t) {
      const n = this.map.get(t);
      if (n !== void 0)
        return this.map.delete(t), this.map.set(t, n), n;
    }
    delete(t) {
      return this.map.delete(t);
    }
    set(t, n) {
      if (!this.delete(t) && n !== void 0) {
        if (this.map.size >= this.max) {
          const i = this.map.keys().next().value;
          this.delete(i);
        }
        this.map.set(t, n);
      }
      return this;
    }
  }
  return ns = r, ns;
}
var ss, Ao;
function xe() {
  if (Ao) return ss;
  Ao = 1;
  const r = /\s+/g;
  class e {
    constructor(L, z) {
      if (z = s(z), L instanceof e)
        return L.loose === !!z.loose && L.includePrerelease === !!z.includePrerelease ? L : new e(L.raw, z);
      if (L instanceof i)
        return this.raw = L.value, this.set = [[L]], this.formatted = void 0, this;
      if (this.options = z, this.loose = !!z.loose, this.includePrerelease = !!z.includePrerelease, this.raw = L.trim().replace(r, " "), this.set = this.raw.split("||").map((V) => this.parseRange(V.trim())).filter((V) => V.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const V = this.set[0];
        if (this.set = this.set.filter((M) => !b(M[0])), this.set.length === 0)
          this.set = [V];
        else if (this.set.length > 1) {
          for (const M of this.set)
            if (M.length === 1 && p(M[0])) {
              this.set = [M];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let L = 0; L < this.set.length; L++) {
          L > 0 && (this.formatted += "||");
          const z = this.set[L];
          for (let V = 0; V < z.length; V++)
            V > 0 && (this.formatted += " "), this.formatted += z[V].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(L) {
      const V = ((this.options.includePrerelease && D) | (this.options.loose && A)) + ":" + L, M = n.get(V);
      if (M)
        return M;
      const H = this.options.loose, P = H ? u[l.HYPHENRANGELOOSE] : u[l.HYPHENRANGE];
      L = L.replace(P, Z(this.options.includePrerelease)), a("hyphen replace", L), L = L.replace(u[l.COMPARATORTRIM], c), a("comparator trim", L), L = L.replace(u[l.TILDETRIM], g), a("tilde trim", L), L = L.replace(u[l.CARETTRIM], v), a("caret trim", L);
      let S = L.split(" ").map(($) => d($, this.options)).join(" ").split(/\s+/).map(($) => G($, this.options));
      H && (S = S.filter(($) => (a("loose invalid filter", $, this.options), !!$.match(u[l.COMPARATORLOOSE])))), a("range list", S);
      const F = /* @__PURE__ */ new Map(), T = S.map(($) => new i($, this.options));
      for (const $ of T) {
        if (b($))
          return [$];
        F.set($.value, $);
      }
      F.size > 1 && F.has("") && F.delete("");
      const C = [...F.values()];
      return n.set(V, C), C;
    }
    intersects(L, z) {
      if (!(L instanceof e))
        throw new TypeError("a Range is required");
      return this.set.some((V) => h(V, z) && L.set.some((M) => h(M, z) && V.every((H) => M.every((P) => H.intersects(P, z)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(L) {
      if (!L)
        return !1;
      if (typeof L == "string")
        try {
          L = new o(L, this.options);
        } catch {
          return !1;
        }
      for (let z = 0; z < this.set.length; z++)
        if (J(this.set[z], L, this.options))
          return !0;
      return !1;
    }
  }
  ss = e;
  const t = nh(), n = new t(), s = ei(), i = rn(), a = en(), o = ve(), {
    safeRe: u,
    t: l,
    comparatorTrimReplace: c,
    tildeTrimReplace: g,
    caretTrimReplace: v
  } = Ut(), { FLAG_INCLUDE_PRERELEASE: D, FLAG_LOOSE: A } = Zr(), b = (x) => x.value === "<0.0.0-0", p = (x) => x.value === "", h = (x, L) => {
    let z = !0;
    const V = x.slice();
    let M = V.pop();
    for (; z && V.length; )
      z = V.every((H) => M.intersects(H, L)), M = V.pop();
    return z;
  }, d = (x, L) => (a("comp", x, L), x = y(x, L), a("caret", x), x = E(x, L), a("tildes", x), x = _(x, L), a("xrange", x), x = U(x, L), a("stars", x), x), m = (x) => !x || x.toLowerCase() === "x" || x === "*", E = (x, L) => x.trim().split(/\s+/).map((z) => f(z, L)).join(" "), f = (x, L) => {
    const z = L.loose ? u[l.TILDELOOSE] : u[l.TILDE];
    return x.replace(z, (V, M, H, P, S) => {
      a("tilde", x, V, M, H, P, S);
      let F;
      return m(M) ? F = "" : m(H) ? F = `>=${M}.0.0 <${+M + 1}.0.0-0` : m(P) ? F = `>=${M}.${H}.0 <${M}.${+H + 1}.0-0` : S ? (a("replaceTilde pr", S), F = `>=${M}.${H}.${P}-${S} <${M}.${+H + 1}.0-0`) : F = `>=${M}.${H}.${P} <${M}.${+H + 1}.0-0`, a("tilde return", F), F;
    });
  }, y = (x, L) => x.trim().split(/\s+/).map((z) => w(z, L)).join(" "), w = (x, L) => {
    a("caret", x, L);
    const z = L.loose ? u[l.CARETLOOSE] : u[l.CARET], V = L.includePrerelease ? "-0" : "";
    return x.replace(z, (M, H, P, S, F) => {
      a("caret", x, M, H, P, S, F);
      let T;
      return m(H) ? T = "" : m(P) ? T = `>=${H}.0.0${V} <${+H + 1}.0.0-0` : m(S) ? H === "0" ? T = `>=${H}.${P}.0${V} <${H}.${+P + 1}.0-0` : T = `>=${H}.${P}.0${V} <${+H + 1}.0.0-0` : F ? (a("replaceCaret pr", F), H === "0" ? P === "0" ? T = `>=${H}.${P}.${S}-${F} <${H}.${P}.${+S + 1}-0` : T = `>=${H}.${P}.${S}-${F} <${H}.${+P + 1}.0-0` : T = `>=${H}.${P}.${S}-${F} <${+H + 1}.0.0-0`) : (a("no pr"), H === "0" ? P === "0" ? T = `>=${H}.${P}.${S}${V} <${H}.${P}.${+S + 1}-0` : T = `>=${H}.${P}.${S}${V} <${H}.${+P + 1}.0-0` : T = `>=${H}.${P}.${S} <${+H + 1}.0.0-0`), a("caret return", T), T;
    });
  }, _ = (x, L) => (a("replaceXRanges", x, L), x.split(/\s+/).map((z) => O(z, L)).join(" ")), O = (x, L) => {
    x = x.trim();
    const z = L.loose ? u[l.XRANGELOOSE] : u[l.XRANGE];
    return x.replace(z, (V, M, H, P, S, F) => {
      a("xRange", x, V, M, H, P, S, F);
      const T = m(H), C = T || m(P), $ = C || m(S), I = $;
      return M === "=" && I && (M = ""), F = L.includePrerelease ? "-0" : "", T ? M === ">" || M === "<" ? V = "<0.0.0-0" : V = "*" : M && I ? (C && (P = 0), S = 0, M === ">" ? (M = ">=", C ? (H = +H + 1, P = 0, S = 0) : (P = +P + 1, S = 0)) : M === "<=" && (M = "<", C ? H = +H + 1 : P = +P + 1), M === "<" && (F = "-0"), V = `${M + H}.${P}.${S}${F}`) : C ? V = `>=${H}.0.0${F} <${+H + 1}.0.0-0` : $ && (V = `>=${H}.${P}.0${F} <${H}.${+P + 1}.0-0`), a("xRange return", V), V;
    });
  }, U = (x, L) => (a("replaceStars", x, L), x.trim().replace(u[l.STAR], "")), G = (x, L) => (a("replaceGTE0", x, L), x.trim().replace(u[L.includePrerelease ? l.GTE0PRE : l.GTE0], "")), Z = (x) => (L, z, V, M, H, P, S, F, T, C, $, I) => (m(V) ? z = "" : m(M) ? z = `>=${V}.0.0${x ? "-0" : ""}` : m(H) ? z = `>=${V}.${M}.0${x ? "-0" : ""}` : P ? z = `>=${z}` : z = `>=${z}${x ? "-0" : ""}`, m(T) ? F = "" : m(C) ? F = `<${+T + 1}.0.0-0` : m($) ? F = `<${T}.${+C + 1}.0-0` : I ? F = `<=${T}.${C}.${$}-${I}` : x ? F = `<${T}.${C}.${+$ + 1}-0` : F = `<=${F}`, `${z} ${F}`.trim()), J = (x, L, z) => {
    for (let V = 0; V < x.length; V++)
      if (!x[V].test(L))
        return !1;
    if (L.prerelease.length && !z.includePrerelease) {
      for (let V = 0; V < x.length; V++)
        if (a(x[V].semver), x[V].semver !== i.ANY && x[V].semver.prerelease.length > 0) {
          const M = x[V].semver;
          if (M.major === L.major && M.minor === L.minor && M.patch === L.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return ss;
}
var is, Co;
function rn() {
  if (Co) return is;
  Co = 1;
  const r = Symbol("SemVer ANY");
  class e {
    static get ANY() {
      return r;
    }
    constructor(c, g) {
      if (g = t(g), c instanceof e) {
        if (c.loose === !!g.loose)
          return c;
        c = c.value;
      }
      c = c.trim().split(/\s+/).join(" "), a("comparator", c, g), this.options = g, this.loose = !!g.loose, this.parse(c), this.semver === r ? this.value = "" : this.value = this.operator + this.semver.version, a("comp", this);
    }
    parse(c) {
      const g = this.options.loose ? n[s.COMPARATORLOOSE] : n[s.COMPARATOR], v = c.match(g);
      if (!v)
        throw new TypeError(`Invalid comparator: ${c}`);
      this.operator = v[1] !== void 0 ? v[1] : "", this.operator === "=" && (this.operator = ""), v[2] ? this.semver = new o(v[2], this.options.loose) : this.semver = r;
    }
    toString() {
      return this.value;
    }
    test(c) {
      if (a("Comparator.test", c, this.options.loose), this.semver === r || c === r)
        return !0;
      if (typeof c == "string")
        try {
          c = new o(c, this.options);
        } catch {
          return !1;
        }
      return i(c, this.operator, this.semver, this.options);
    }
    intersects(c, g) {
      if (!(c instanceof e))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new u(c.value, g).test(this.value) : c.operator === "" ? c.value === "" ? !0 : new u(this.value, g).test(c.semver) : (g = t(g), g.includePrerelease && (this.value === "<0.0.0-0" || c.value === "<0.0.0-0") || !g.includePrerelease && (this.value.startsWith("<0.0.0") || c.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && c.operator.startsWith(">") || this.operator.startsWith("<") && c.operator.startsWith("<") || this.semver.version === c.semver.version && this.operator.includes("=") && c.operator.includes("=") || i(this.semver, "<", c.semver, g) && this.operator.startsWith(">") && c.operator.startsWith("<") || i(this.semver, ">", c.semver, g) && this.operator.startsWith("<") && c.operator.startsWith(">")));
    }
  }
  is = e;
  const t = ei(), { safeRe: n, t: s } = Ut(), i = il(), a = en(), o = ve(), u = xe();
  return is;
}
var as, $o;
function nn() {
  if ($o) return as;
  $o = 1;
  const r = xe();
  return as = (t, n, s) => {
    try {
      n = new r(n, s);
    } catch {
      return !1;
    }
    return n.test(t);
  }, as;
}
var os, _o;
function sh() {
  if (_o) return os;
  _o = 1;
  const r = xe();
  return os = (t, n) => new r(t, n).set.map((s) => s.map((i) => i.value).join(" ").trim().split(" ")), os;
}
var us, So;
function ih() {
  if (So) return us;
  So = 1;
  const r = ve(), e = xe();
  return us = (n, s, i) => {
    let a = null, o = null, u = null;
    try {
      u = new e(s, i);
    } catch {
      return null;
    }
    return n.forEach((l) => {
      u.test(l) && (!a || o.compare(l) === -1) && (a = l, o = new r(a, i));
    }), a;
  }, us;
}
var ls, Ro;
function ah() {
  if (Ro) return ls;
  Ro = 1;
  const r = ve(), e = xe();
  return ls = (n, s, i) => {
    let a = null, o = null, u = null;
    try {
      u = new e(s, i);
    } catch {
      return null;
    }
    return n.forEach((l) => {
      u.test(l) && (!a || o.compare(l) === 1) && (a = l, o = new r(a, i));
    }), a;
  }, ls;
}
var cs, To;
function oh() {
  if (To) return cs;
  To = 1;
  const r = ve(), e = xe(), t = tn();
  return cs = (s, i) => {
    s = new e(s, i);
    let a = new r("0.0.0");
    if (s.test(a) || (a = new r("0.0.0-0"), s.test(a)))
      return a;
    a = null;
    for (let o = 0; o < s.set.length; ++o) {
      const u = s.set[o];
      let l = null;
      u.forEach((c) => {
        const g = new r(c.semver.version);
        switch (c.operator) {
          case ">":
            g.prerelease.length === 0 ? g.patch++ : g.prerelease.push(0), g.raw = g.format();
          /* fallthrough */
          case "":
          case ">=":
            (!l || t(g, l)) && (l = g);
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${c.operator}`);
        }
      }), l && (!a || t(a, l)) && (a = l);
    }
    return a && s.test(a) ? a : null;
  }, cs;
}
var ds, No;
function uh() {
  if (No) return ds;
  No = 1;
  const r = xe();
  return ds = (t, n) => {
    try {
      return new r(t, n).range || "*";
    } catch {
      return null;
    }
  }, ds;
}
var fs, Fo;
function ii() {
  if (Fo) return fs;
  Fo = 1;
  const r = ve(), e = rn(), { ANY: t } = e, n = xe(), s = nn(), i = tn(), a = ri(), o = si(), u = ni();
  return fs = (c, g, v, D) => {
    c = new r(c, D), g = new n(g, D);
    let A, b, p, h, d;
    switch (v) {
      case ">":
        A = i, b = o, p = a, h = ">", d = ">=";
        break;
      case "<":
        A = a, b = u, p = i, h = "<", d = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (s(c, g, D))
      return !1;
    for (let m = 0; m < g.set.length; ++m) {
      const E = g.set[m];
      let f = null, y = null;
      if (E.forEach((w) => {
        w.semver === t && (w = new e(">=0.0.0")), f = f || w, y = y || w, A(w.semver, f.semver, D) ? f = w : p(w.semver, y.semver, D) && (y = w);
      }), f.operator === h || f.operator === d || (!y.operator || y.operator === h) && b(c, y.semver))
        return !1;
      if (y.operator === d && p(c, y.semver))
        return !1;
    }
    return !0;
  }, fs;
}
var hs, Po;
function lh() {
  if (Po) return hs;
  Po = 1;
  const r = ii();
  return hs = (t, n, s) => r(t, n, ">", s), hs;
}
var ms, Io;
function ch() {
  if (Io) return ms;
  Io = 1;
  const r = ii();
  return ms = (t, n, s) => r(t, n, "<", s), ms;
}
var ps, Oo;
function dh() {
  if (Oo) return ps;
  Oo = 1;
  const r = xe();
  return ps = (t, n, s) => (t = new r(t, s), n = new r(n, s), t.intersects(n, s)), ps;
}
var gs, ko;
function fh() {
  if (ko) return gs;
  ko = 1;
  const r = nn(), e = qe();
  return gs = (t, n, s) => {
    const i = [];
    let a = null, o = null;
    const u = t.sort((v, D) => e(v, D, s));
    for (const v of u)
      r(v, n, s) ? (o = v, a || (a = v)) : (o && i.push([a, o]), o = null, a = null);
    a && i.push([a, null]);
    const l = [];
    for (const [v, D] of i)
      v === D ? l.push(v) : !D && v === u[0] ? l.push("*") : D ? v === u[0] ? l.push(`<=${D}`) : l.push(`${v} - ${D}`) : l.push(`>=${v}`);
    const c = l.join(" || "), g = typeof n.raw == "string" ? n.raw : String(n);
    return c.length < g.length ? c : n;
  }, gs;
}
var ys, qo;
function hh() {
  if (qo) return ys;
  qo = 1;
  const r = xe(), e = rn(), { ANY: t } = e, n = nn(), s = qe(), i = (g, v, D = {}) => {
    if (g === v)
      return !0;
    g = new r(g, D), v = new r(v, D);
    let A = !1;
    e: for (const b of g.set) {
      for (const p of v.set) {
        const h = u(b, p, D);
        if (A = A || h !== null, h)
          continue e;
      }
      if (A)
        return !1;
    }
    return !0;
  }, a = [new e(">=0.0.0-0")], o = [new e(">=0.0.0")], u = (g, v, D) => {
    if (g === v)
      return !0;
    if (g.length === 1 && g[0].semver === t) {
      if (v.length === 1 && v[0].semver === t)
        return !0;
      D.includePrerelease ? g = a : g = o;
    }
    if (v.length === 1 && v[0].semver === t) {
      if (D.includePrerelease)
        return !0;
      v = o;
    }
    const A = /* @__PURE__ */ new Set();
    let b, p;
    for (const _ of g)
      _.operator === ">" || _.operator === ">=" ? b = l(b, _, D) : _.operator === "<" || _.operator === "<=" ? p = c(p, _, D) : A.add(_.semver);
    if (A.size > 1)
      return null;
    let h;
    if (b && p) {
      if (h = s(b.semver, p.semver, D), h > 0)
        return null;
      if (h === 0 && (b.operator !== ">=" || p.operator !== "<="))
        return null;
    }
    for (const _ of A) {
      if (b && !n(_, String(b), D) || p && !n(_, String(p), D))
        return null;
      for (const O of v)
        if (!n(_, String(O), D))
          return !1;
      return !0;
    }
    let d, m, E, f, y = p && !D.includePrerelease && p.semver.prerelease.length ? p.semver : !1, w = b && !D.includePrerelease && b.semver.prerelease.length ? b.semver : !1;
    y && y.prerelease.length === 1 && p.operator === "<" && y.prerelease[0] === 0 && (y = !1);
    for (const _ of v) {
      if (f = f || _.operator === ">" || _.operator === ">=", E = E || _.operator === "<" || _.operator === "<=", b) {
        if (w && _.semver.prerelease && _.semver.prerelease.length && _.semver.major === w.major && _.semver.minor === w.minor && _.semver.patch === w.patch && (w = !1), _.operator === ">" || _.operator === ">=") {
          if (d = l(b, _, D), d === _ && d !== b)
            return !1;
        } else if (b.operator === ">=" && !n(b.semver, String(_), D))
          return !1;
      }
      if (p) {
        if (y && _.semver.prerelease && _.semver.prerelease.length && _.semver.major === y.major && _.semver.minor === y.minor && _.semver.patch === y.patch && (y = !1), _.operator === "<" || _.operator === "<=") {
          if (m = c(p, _, D), m === _ && m !== p)
            return !1;
        } else if (p.operator === "<=" && !n(p.semver, String(_), D))
          return !1;
      }
      if (!_.operator && (p || b) && h !== 0)
        return !1;
    }
    return !(b && E && !p && h !== 0 || p && f && !b && h !== 0 || w || y);
  }, l = (g, v, D) => {
    if (!g)
      return v;
    const A = s(g.semver, v.semver, D);
    return A > 0 ? g : A < 0 || v.operator === ">" && g.operator === ">=" ? v : g;
  }, c = (g, v, D) => {
    if (!g)
      return v;
    const A = s(g.semver, v.semver, D);
    return A < 0 ? g : A > 0 || v.operator === "<" && g.operator === "<=" ? v : g;
  };
  return ys = i, ys;
}
var bs, xo;
function mh() {
  if (xo) return bs;
  xo = 1;
  const r = Ut(), e = Zr(), t = ve(), n = rl(), s = At(), i = Hf(), a = Gf(), o = zf(), u = Kf(), l = Wf(), c = Xf(), g = Yf(), v = Jf(), D = qe(), A = Qf(), b = Zf(), p = ti(), h = eh(), d = th(), m = tn(), E = ri(), f = nl(), y = sl(), w = ni(), _ = si(), O = il(), U = rh(), G = rn(), Z = xe(), J = nn(), x = sh(), L = ih(), z = ah(), V = oh(), M = uh(), H = ii(), P = lh(), S = ch(), F = dh(), T = fh(), C = hh();
  return bs = {
    parse: s,
    valid: i,
    clean: a,
    inc: o,
    diff: u,
    major: l,
    minor: c,
    patch: g,
    prerelease: v,
    compare: D,
    rcompare: A,
    compareLoose: b,
    compareBuild: p,
    sort: h,
    rsort: d,
    gt: m,
    lt: E,
    eq: f,
    neq: y,
    gte: w,
    lte: _,
    cmp: O,
    coerce: U,
    Comparator: G,
    Range: Z,
    satisfies: J,
    toComparators: x,
    maxSatisfying: L,
    minSatisfying: z,
    minVersion: V,
    validRange: M,
    outside: H,
    gtr: P,
    ltr: S,
    intersects: F,
    simplifyRange: T,
    subset: C,
    SemVer: t,
    re: r.re,
    src: r.src,
    tokens: r.t,
    SEMVER_SPEC_VERSION: e.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: e.RELEASE_TYPES,
    compareIdentifiers: n.compareIdentifiers,
    rcompareIdentifiers: n.rcompareIdentifiers
  }, bs;
}
mh();
const ph = "http://json-schema.org/draft-06/schema#", gh = "http://json-schema.org/draft-06/schema#", yh = "Core schema meta-schema", bh = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $ref: "#"
    }
  },
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    allOf: [
      {
        $ref: "#/definitions/nonNegativeInteger"
      },
      {
        default: 0
      }
    ]
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, Eh = [
  "object",
  "boolean"
], vh = {
  $id: {
    type: "string",
    format: "uri-reference"
  },
  $schema: {
    type: "string",
    format: "uri"
  },
  $ref: {
    type: "string",
    format: "uri-reference"
  },
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: {},
  examples: {
    type: "array",
    items: {}
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  additionalItems: {
    $ref: "#"
  },
  items: {
    anyOf: [
      {
        $ref: "#"
      },
      {
        $ref: "#/definitions/schemaArray"
      }
    ],
    default: {}
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  contains: {
    $ref: "#"
  },
  maxProperties: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/definitions/stringArray"
  },
  additionalProperties: {
    $ref: "#"
  },
  definitions: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  dependencies: {
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#"
        },
        {
          $ref: "#/definitions/stringArray"
        }
      ]
    }
  },
  propertyNames: {
    $ref: "#"
  },
  const: {},
  enum: {
    type: "array",
    minItems: 1,
    uniqueItems: !0
  },
  type: {
    anyOf: [
      {
        $ref: "#/definitions/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/definitions/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  format: {
    type: "string"
  },
  allOf: {
    $ref: "#/definitions/schemaArray"
  },
  anyOf: {
    $ref: "#/definitions/schemaArray"
  },
  oneOf: {
    $ref: "#/definitions/schemaArray"
  },
  not: {
    $ref: "#"
  }
};
var ai = {
  $schema: ph,
  $id: gh,
  title: yh,
  definitions: bh,
  type: Eh,
  properties: vh,
  default: {}
};
function Dh(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var Es, Lo;
function wh() {
  if (Lo) return Es;
  Lo = 1;
  var r = function(d) {
    return e(d) && !t(d);
  };
  function e(h) {
    return !!h && typeof h == "object";
  }
  function t(h) {
    var d = Object.prototype.toString.call(h);
    return d === "[object RegExp]" || d === "[object Date]" || i(h);
  }
  var n = typeof Symbol == "function" && Symbol.for, s = n ? Symbol.for("react.element") : 60103;
  function i(h) {
    return h.$$typeof === s;
  }
  function a(h) {
    return Array.isArray(h) ? [] : {};
  }
  function o(h, d) {
    return d.clone !== !1 && d.isMergeableObject(h) ? b(a(h), h, d) : h;
  }
  function u(h, d, m) {
    return h.concat(d).map(function(E) {
      return o(E, m);
    });
  }
  function l(h, d) {
    if (!d.customMerge)
      return b;
    var m = d.customMerge(h);
    return typeof m == "function" ? m : b;
  }
  function c(h) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(h).filter(function(d) {
      return Object.propertyIsEnumerable.call(h, d);
    }) : [];
  }
  function g(h) {
    return Object.keys(h).concat(c(h));
  }
  function v(h, d) {
    try {
      return d in h;
    } catch {
      return !1;
    }
  }
  function D(h, d) {
    return v(h, d) && !(Object.hasOwnProperty.call(h, d) && Object.propertyIsEnumerable.call(h, d));
  }
  function A(h, d, m) {
    var E = {};
    return m.isMergeableObject(h) && g(h).forEach(function(f) {
      E[f] = o(h[f], m);
    }), g(d).forEach(function(f) {
      D(h, f) || (v(h, f) && m.isMergeableObject(d[f]) ? E[f] = l(f, m)(h[f], d[f], m) : E[f] = o(d[f], m));
    }), E;
  }
  function b(h, d, m) {
    m = m || {}, m.arrayMerge = m.arrayMerge || u, m.isMergeableObject = m.isMergeableObject || r, m.cloneUnlessOtherwiseSpecified = o;
    var E = Array.isArray(d), f = Array.isArray(h), y = E === f;
    return y ? E ? m.arrayMerge(h, d, m) : A(h, d, m) : o(d, m);
  }
  b.all = function(d, m) {
    if (!Array.isArray(d))
      throw new Error("first argument should be an array");
    return d.reduce(function(E, f) {
      return b(E, f, m);
    }, {});
  };
  var p = b;
  return Es = p, Es;
}
var Ah = /* @__PURE__ */ wh(), qt = /* @__PURE__ */ Dh(Ah);
function Ch(r) {
  return typeof r == "string" ? String(r) : JSON.stringify(r);
}
class $h extends Error {
  constructor(e) {
    super(Ch(e));
  }
}
function vt(r) {
  return r instanceof Error ? r : new $h(r);
}
class Dt extends Error {
  constructor(e, t) {
    super(e), Error.captureStackTrace(this, Dt), this.name = Dt.name, t != null && t.stack && (this.stack ?? (this.stack = ""), this.stack += `
Caused by: ${t.stack}`);
  }
}
class le extends Dt {
  constructor(e, t) {
    super(e, t), Error.captureStackTrace(this, le), this.name = le.name, Object.defineProperty(this, "isUserError", {
      value: !0,
      enumerable: !1,
      writable: !1
    });
  }
  /**
   * @public
   */
  /* istanbul ignore next: default implementation */
  prettyFormat() {
  }
}
class Bt extends le {
  constructor({ tagName: t, inherit: n }) {
    const s = `Element <${t}> cannot inherit from <${n}>: no such element`;
    super(s);
    k(this, "tagName");
    k(this, "inherit");
    k(this, "filename");
    Error.captureStackTrace(this, Bt), this.name = Bt.name, this.tagName = t, this.inherit = n, this.filename = null;
  }
  prettyFormat() {
    const { message: t, tagName: n, inherit: s } = this, i = this.filename ? ["", "This error occurred when loading element metadata from:", `"${this.filename}"`, ""] : [""];
    return [
      t,
      ...i,
      "This usually occurs when the elements are defined in the wrong order, try one of the following:",
      "",
      `  - Ensure the spelling of "${s}" is correct.`,
      `  - Ensure the file containing "${s}" is loaded before the file containing "${n}".`,
      `  - Move the definition of "${s}" above the definition for "${n}".`
    ].join(`
`);
  }
}
function _h(r, e, t) {
  const n = Vf(r, e, t, {
    format: "js"
  });
  return n.length > 0 ? n[0].error : "unknown validation error";
}
class Vr extends le {
  constructor(t, n, s, i, a) {
    const o = _h(i, s, a);
    super(`${n}: ${o}`);
    /** Configuration filename the error originates from */
    k(this, "filename");
    /** Configuration object the error originates from */
    k(this, "obj");
    /** JSON schema used when validating the configuration */
    k(this, "schema");
    /** List of schema validation errors */
    k(this, "errors");
    this.filename = t, this.obj = s, this.schema = i, this.errors = a;
  }
}
function Sh(r) {
  let u = -559038737, l = 1103547991;
  for (let c = 0, g; c < r.length; c++)
    g = r.charCodeAt(c), u = Math.imul(u ^ g, 2654435761), l = Math.imul(l ^ g, 1597334677);
  return u = Math.imul(u ^ u >>> 16, 2246822507) ^ Math.imul(l ^ l >>> 13, 3266489909), l = Math.imul(l ^ l >>> 16, 2246822507) ^ Math.imul(u ^ u >>> 13, 3266489909), 4294967296 * (2097151 & l) + (u >>> 0);
}
const Rh = Sh, Th = "http://json-schema.org/draft-06/schema#", Nh = "https://html-validate.org/schemas/elements.json", Fh = "object", Ph = {
  $schema: {
    type: "string"
  }
}, Ih = {
  "^[^$].*$": {
    type: "object",
    properties: {
      inherit: {
        title: "Inherit from another element",
        description: "Most properties from the parent element will be copied onto this one",
        type: "string"
      },
      embedded: {
        title: "Mark this element as belonging in the embedded content category",
        $ref: "#/definitions/contentCategory"
      },
      flow: {
        title: "Mark this element as belonging in the flow content category",
        $ref: "#/definitions/contentCategory"
      },
      heading: {
        title: "Mark this element as belonging in the heading content category",
        $ref: "#/definitions/contentCategory"
      },
      interactive: {
        title: "Mark this element as belonging in the interactive content category",
        $ref: "#/definitions/contentCategory"
      },
      metadata: {
        title: "Mark this element as belonging in the metadata content category",
        $ref: "#/definitions/contentCategory"
      },
      phrasing: {
        title: "Mark this element as belonging in the phrasing content category",
        $ref: "#/definitions/contentCategory"
      },
      sectioning: {
        title: "Mark this element as belonging in the sectioning content category",
        $ref: "#/definitions/contentCategory"
      },
      deprecated: {
        title: "Mark element as deprecated",
        description: "Deprecated elements should not be used. If a message is provided it will be included in the error",
        anyOf: [
          {
            type: "boolean"
          },
          {
            type: "string"
          },
          {
            $ref: "#/definitions/deprecatedElement"
          }
        ]
      },
      foreign: {
        title: "Mark element as foreign",
        description: "Foreign elements are elements which have a start and end tag but is otherwize not parsed",
        type: "boolean"
      },
      void: {
        title: "Mark element as void",
        description: "Void elements are elements which cannot have content and thus must not use an end tag",
        type: "boolean"
      },
      transparent: {
        title: "Mark element as transparent",
        description: "Transparent elements follows the same content model as its parent, i.e. the content must be allowed in the parent.",
        anyOf: [
          {
            type: "boolean"
          },
          {
            type: "array",
            items: {
              type: "string"
            }
          }
        ]
      },
      implicitClosed: {
        title: "List of elements which implicitly closes this element",
        description: "Some elements are automatically closed when another start tag occurs",
        type: "array",
        items: {
          type: "string"
        }
      },
      implicitRole: {
        title: "Implicit ARIA role for this element",
        description: "Some elements have implicit ARIA roles.",
        deprecated: !0,
        function: !0
      },
      aria: {
        title: "WAI-ARIA properties for this element",
        $ref: "#/definitions/Aria"
      },
      scriptSupporting: {
        title: "Mark element as script-supporting",
        description: "Script-supporting elements are elements which can be inserted where othersise not permitted to assist in templating",
        type: "boolean"
      },
      focusable: {
        title: "Mark this element as focusable",
        description: "This element may contain an associated label element.",
        anyOf: [
          {
            type: "boolean"
          },
          {
            function: !0
          }
        ]
      },
      form: {
        title: "Mark element as a submittable form element",
        type: "boolean"
      },
      formAssociated: {
        title: "Mark element as a form-associated element",
        $ref: "#/definitions/FormAssociated"
      },
      labelable: {
        title: "Mark this element as labelable",
        description: "This element may contain an associated label element.",
        anyOf: [
          {
            type: "boolean"
          },
          {
            function: !0
          }
        ]
      },
      deprecatedAttributes: {
        title: "List of deprecated attributes",
        type: "array",
        items: {
          type: "string"
        }
      },
      requiredAttributes: {
        title: "List of required attributes",
        type: "array",
        items: {
          type: "string"
        }
      },
      attributes: {
        title: "List of known attributes and allowed values",
        $ref: "#/definitions/PermittedAttribute"
      },
      permittedContent: {
        title: "List of elements or categories allowed as content in this element",
        $ref: "#/definitions/Permitted"
      },
      permittedDescendants: {
        title: "List of elements or categories allowed as descendants in this element",
        $ref: "#/definitions/Permitted"
      },
      permittedOrder: {
        title: "Required order of child elements",
        $ref: "#/definitions/PermittedOrder"
      },
      permittedParent: {
        title: "List of elements or categories allowed as parent to this element",
        $ref: "#/definitions/Permitted"
      },
      requiredAncestors: {
        title: "List of required ancestor elements",
        $ref: "#/definitions/RequiredAncestors"
      },
      requiredContent: {
        title: "List of required content elements",
        $ref: "#/definitions/RequiredContent"
      },
      textContent: {
        title: "Allow, disallow or require textual content",
        description: "This property controls whenever an element allows, disallows or requires text. Text from any descendant counts, not only direct children",
        default: "default",
        type: "string",
        enum: [
          "none",
          "default",
          "required",
          "accessible"
        ]
      }
    },
    additionalProperties: !1
  }
}, Oh = {
  Aria: {
    type: "object",
    additionalProperties: !1,
    properties: {
      implicitRole: {
        title: "Implicit ARIA role for this element",
        description: "Some elements have implicit ARIA roles.",
        anyOf: [
          {
            type: "string"
          },
          {
            function: !0
          }
        ]
      },
      naming: {
        title: "Prohibit or allow this element to be named by aria-label or aria-labelledby",
        anyOf: [
          {
            type: "string",
            enum: [
              "prohibited",
              "allowed"
            ]
          },
          {
            function: !0
          }
        ]
      }
    }
  },
  contentCategory: {
    anyOf: [
      {
        type: "boolean"
      },
      {
        function: !0
      }
    ]
  },
  deprecatedElement: {
    type: "object",
    additionalProperties: !1,
    properties: {
      message: {
        type: "string",
        title: "A short text message shown next to the regular error message."
      },
      documentation: {
        type: "string",
        title: "An extended markdown formatted message shown with the contextual rule documentation."
      },
      source: {
        type: "string",
        title: "Element source, e.g. what standard or library deprecated this element.",
        default: "html5"
      }
    }
  },
  FormAssociated: {
    type: "object",
    additionalProperties: !1,
    properties: {
      disablable: {
        type: "boolean",
        title: "Disablable elements can be disabled using the disabled attribute."
      },
      listed: {
        type: "boolean",
        title: "Listed elements have a name attribute and is listed in the form and fieldset elements property."
      }
    }
  },
  Permitted: {
    type: "array",
    items: {
      anyOf: [
        {
          type: "string"
        },
        {
          type: "array",
          items: {
            anyOf: [
              {
                type: "string"
              },
              {
                $ref: "#/definitions/PermittedGroup"
              }
            ]
          }
        },
        {
          $ref: "#/definitions/PermittedGroup"
        }
      ]
    }
  },
  PermittedAttribute: {
    type: "object",
    patternProperties: {
      "^.*$": {
        anyOf: [
          {
            type: "object",
            additionalProperties: !1,
            properties: {
              allowed: {
                function: !0,
                title: "Set to a function to evaluate if this attribute is allowed in this context"
              },
              boolean: {
                type: "boolean",
                title: "Set to true if this is a boolean attribute"
              },
              deprecated: {
                title: "Set to true or string if this attribute is deprecated",
                oneOf: [
                  {
                    type: "boolean"
                  },
                  {
                    type: "string"
                  }
                ]
              },
              list: {
                type: "boolean",
                title: "Set to true if this attribute is a list of space-separated tokens, each which must be valid by itself"
              },
              enum: {
                type: "array",
                title: "Exhaustive list of values (string or regex) this attribute accepts",
                uniqueItems: !0,
                items: {
                  anyOf: [
                    {
                      type: "string"
                    },
                    {
                      regexp: !0
                    }
                  ]
                }
              },
              omit: {
                type: "boolean",
                title: "Set to true if this attribute can optionally omit its value"
              },
              required: {
                type: "boolean",
                title: "Set to true if this attribute is required"
              }
            }
          },
          {
            type: "array",
            uniqueItems: !0,
            items: {
              type: "string"
            }
          },
          {
            type: "null"
          }
        ]
      }
    }
  },
  PermittedGroup: {
    type: "object",
    additionalProperties: !1,
    properties: {
      exclude: {
        anyOf: [
          {
            items: {
              type: "string"
            },
            type: "array"
          },
          {
            type: "string"
          }
        ]
      }
    }
  },
  PermittedOrder: {
    type: "array",
    items: {
      type: "string"
    }
  },
  RequiredAncestors: {
    type: "array",
    items: {
      type: "string"
    }
  },
  RequiredContent: {
    type: "array",
    items: {
      type: "string"
    }
  }
};
var kh = {
  $schema: Th,
  $id: Nh,
  type: Fh,
  properties: Ph,
  patternProperties: Ih,
  definitions: Oh
};
const al = function(r, e) {
  const t = r instanceof RegExp;
  return t || (al.errors = [
    {
      instancePath: e == null ? void 0 : e.instancePath,
      schemaPath: void 0,
      keyword: "type",
      message: "should be a regular expression",
      params: {
        keyword: "type"
      }
    }
  ]), t;
}, qh = {
  keyword: "regexp",
  schema: !1,
  errors: !0,
  validate: al
}, ol = function(r, e) {
  const t = typeof r == "function";
  return t || (ol.errors = [
    {
      instancePath: (
        /* istanbul ignore next */
        e == null ? void 0 : e.instancePath
      ),
      schemaPath: void 0,
      keyword: "type",
      message: "should be a function",
      params: {
        keyword: "type"
      }
    }
  ]), t;
}, ul = {
  keyword: "function",
  schema: !1,
  errors: !0,
  validate: ol
};
var Ye = /* @__PURE__ */ ((r) => (r.NONE = "none", r.DEFAULT = "default", r.REQUIRED = "required", r.ACCESSIBLE = "accessible", r))(Ye || {});
const ks = [
  "metadata",
  "flow",
  "sectioning",
  "heading",
  "phrasing",
  "embedded",
  "interactive",
  "transparent",
  "focusable",
  "form",
  "formAssociated",
  "labelable",
  "attributes",
  "aria",
  "permittedContent",
  "permittedDescendants",
  "permittedOrder",
  "permittedParent",
  "requiredAncestors",
  "requiredContent"
];
function qs(r, e, t) {
  r[e] = t;
}
function xh(r) {
  return typeof r < "u";
}
function Bo(r) {
  return r ? !0 : void 0;
}
function Nr(r) {
  const e = Object.entries(r).filter(([, t]) => xh(t));
  return Object.fromEntries(e);
}
function Lh(r, e) {
  var s, i;
  const t = {};
  t.deprecated = Bo((s = r.deprecatedAttributes) == null ? void 0 : s.includes(e)), t.required = Bo((i = r.requiredAttributes) == null ? void 0 : i.includes(e)), t.omit = void 0;
  const n = r.attributes ? r.attributes[e] : void 0;
  return typeof n > "u" ? Nr(t) : n === null ? (t.delete = !0, Nr(t)) : Array.isArray(n) ? (n.length === 0 ? t.boolean = !0 : (t.enum = n.filter((a) => a !== ""), n.includes("") && (t.omit = !0)), Nr(t)) : Nr({ ...t, ...n });
}
function Bh(r) {
  const t = [
    ...Object.keys(r.attributes ?? {}),
    ...r.requiredAttributes ?? [],
    ...r.deprecatedAttributes ?? []
  ].sort().map((n) => [n, Lh(r, n)]);
  return Object.fromEntries(t);
}
function jh(r) {
  return r ? typeof r == "string" ? () => r : r : () => null;
}
function Mh(r) {
  return r ? typeof r == "string" ? () => r : r : () => "allowed";
}
function Uh(r) {
  var n, s;
  const e = jh(r.implicitRole ?? ((n = r.aria) == null ? void 0 : n.implicitRole)), t = {
    ...r,
    formAssociated: void 0,
    attributes: Bh(r),
    textContent: r.textContent,
    focusable: r.focusable ?? !1,
    implicitRole: e,
    aria: {
      implicitRole: e,
      naming: Mh((s = r.aria) == null ? void 0 : s.naming)
    }
  };
  return delete t.deprecatedAttributes, delete t.requiredAttributes, t.textContent || delete t.textContent, r.formAssociated ? t.formAssociated = {
    disablable: !!r.formAssociated.disablable,
    listed: !!r.formAssociated.listed
  } : delete t.formAssociated, t;
}
const Vh = [
  "metadata",
  "flow",
  "sectioning",
  "heading",
  "phrasing",
  "embedded",
  "interactive",
  "labelable"
], jo = /* @__PURE__ */ new Map();
function Hh(r) {
  return JSON.parse(JSON.stringify(r));
}
function Gh(r, e) {
  return e;
}
class zh {
  /**
   * @internal
   */
  constructor() {
    k(this, "elements");
    k(this, "schema");
    this.elements = {}, this.schema = Hh(kh);
  }
  /**
   * @internal
   */
  init() {
    this.resolveGlobal();
  }
  /**
   * Extend validation schema.
   *
   * @public
   */
  extendValidationSchema(e) {
    e.properties && (this.schema = qt(this.schema, {
      patternProperties: {
        "^[^$].*$": {
          properties: e.properties
        }
      }
    })), e.definitions && (this.schema = qt(this.schema, {
      definitions: e.definitions
    }));
  }
  /**
   * Load metadata table from object.
   *
   * @public
   * @param obj - Object with metadata to load
   * @param filename - Optional filename used when presenting validation error
   */
  loadFromObject(e, t = null) {
    try {
      const n = this.getSchemaValidator();
      if (!n(e))
        throw new Vr(
          t,
          "Element metadata is not valid",
          e,
          this.schema,
          /* istanbul ignore next: AJV sets .errors when validate returns false */
          n.errors ?? []
        );
      for (const [s, i] of Object.entries(e))
        s !== "$schema" && this.addEntry(s, Uh(i));
    } catch (n) {
      throw n instanceof Bt ? (n.filename = t, n) : n instanceof Vr || !t ? n : new le(`Failed to load element metadata from "${t}"`, vt(n));
    }
  }
  /**
   * Get [[MetaElement]] for the given tag. If no specific metadata is present
   * the global metadata is returned or null if no global is present.
   *
   * @public
   * @returns A shallow copy of metadata.
   */
  getMetaFor(e) {
    const t = this.elements[e.toLowerCase()] ?? this.elements["*"];
    return t ? { ...t } : null;
  }
  /**
   * Find all tags which has enabled given property.
   *
   * @public
   */
  getTagsWithProperty(e) {
    return this.entries.filter(([, t]) => t[e]).map(([t]) => t);
  }
  /**
   * Find tag matching tagName or inheriting from it.
   *
   * @public
   */
  getTagsDerivedFrom(e) {
    return this.entries.filter(([t, n]) => t === e || n.inherit === e).map(([t]) => t);
  }
  addEntry(e, t) {
    let n = this.elements[e];
    if (t.inherit) {
      const i = t.inherit;
      if (n = this.elements[i], !n)
        throw new Bt({
          tagName: e,
          inherit: i
        });
    }
    const s = this.mergeElement(n ?? {}, { ...t, tagName: e });
    Xh(s), this.elements[e] = s;
  }
  /**
   * Construct a new AJV schema validator.
   */
  getSchemaValidator() {
    const e = Rh(JSON.stringify(this.schema)), t = jo.get(e);
    if (t)
      return t;
    {
      const n = new Gs({ strict: !0, strictTuples: !0, strictTypes: !0 });
      n.addMetaSchema(ai), n.addKeyword(ul), n.addKeyword(qh), n.addKeyword({ keyword: "copyable" });
      const s = n.compile(this.schema);
      return jo.set(e, s), s;
    }
  }
  /**
   * @public
   */
  getJSONSchema() {
    return this.schema;
  }
  /**
   * @internal
   */
  get entries() {
    return Object.entries(this.elements);
  }
  /**
   * Finds the global element definition and merges each known element with the
   * global, e.g. to assign global attributes.
   */
  resolveGlobal() {
    if (!this.elements["*"]) return;
    const e = this.elements["*"];
    delete this.elements["*"], delete e.tagName, delete e.void;
    for (const [t, n] of this.entries)
      this.elements[t] = this.mergeElement(e, n);
  }
  mergeElement(e, t) {
    const n = qt(e, t, { arrayMerge: Gh }), s = Object.entries(
      n.attributes
    ).filter(([, i]) => {
      const a = !i.delete;
      return delete i.delete, a;
    });
    return n.attributes = Object.fromEntries(s), n;
  }
  /**
   * @internal
   */
  resolve(e) {
    e.meta && Kh(e, e.meta);
  }
}
function Kh(r, e) {
  for (const t of Vh) {
    const n = e[t];
    typeof n == "function" && qs(e, t, n(r._adapter));
  }
  typeof e.focusable == "function" && qs(e, "focusable", e.focusable(r._adapter));
}
function Wh(r) {
  if (r instanceof RegExp)
    return r;
  const e = r.match(/^\/(.*(?=\/))\/(i?)$/);
  if (e) {
    const [, t, n] = e;
    return t.startsWith("^") || t.endsWith("$") ? new RegExp(t, n) : new RegExp(`^${t}$`, n);
  } else
    return r;
}
function Xh(r) {
  for (const [e, t] of Object.entries(r.attributes))
    t.enum && (r.attributes[e].enum = t.enum.map(Wh));
}
class ue {
  constructor(e) {
    k(this, "expr");
    this.expr = e;
  }
  toString() {
    return this.expr;
  }
}
function Yh(r) {
  return !!(r != null && r.isDynamic);
}
class Jh {
  /**
   * @param key - Attribute name.
   * @param value - Attribute value. Set to `null` for boolean attributes.
   * @param keyLocation - Source location of attribute name.
   * @param valueLocation - Source location of attribute value.
   * @param originalAttribute - If this attribute was dynamically added via a
   * transformation (e.g. vuejs `:id` generating the `id` attribute) this
   * parameter should be set to the attribute name of the source attribute (`:id`).
   */
  constructor(e, t, n, s, i) {
    /** Attribute name */
    k(this, "key");
    k(this, "value");
    k(this, "keyLocation");
    k(this, "valueLocation");
    k(this, "originalAttribute");
    this.key = e, this.value = t, this.keyLocation = n, this.valueLocation = s, this.originalAttribute = i, typeof this.value > "u" && (this.value = null);
  }
  /**
   * Flag set to true if the attribute value is static.
   */
  get isStatic() {
    return !this.isDynamic;
  }
  /**
   * Flag set to true if the attribute value is dynamic.
   */
  get isDynamic() {
    return this.value instanceof ue;
  }
  /**
   * Test attribute value.
   *
   * @param pattern - Pattern to match value against. Can be a RegExp, literal
   * string or an array of strings (returns true if any value matches the
   * array).
   * @param dynamicMatches - If true `DynamicValue` will always match, if false
   * it never matches.
   * @returns `true` if attribute value matches pattern.
   */
  valueMatches(e, t = !0) {
    return this.value === null ? !1 : this.value instanceof ue ? t : Array.isArray(e) ? e.includes(this.value) : e instanceof RegExp ? this.value.match(e) !== null : this.value === e;
  }
}
function Qh(r) {
  return r.trim().split(";").filter(Boolean).map((e) => {
    const [t, n] = e.split(":", 2);
    return [t.trim(), n ? n.trim() : ""];
  });
}
function oi(r) {
  if (!r || r instanceof ue)
    return {};
  const e = Qh(r);
  return Object.fromEntries(e);
}
function Zh(r, e, t) {
  return typeof r != "number" ? r : typeof t != "number" ? r - e : (t < 0 && (t = r + t), Math.min(r, t - e));
}
function fe(r, e, t, n) {
  if (!r) return null;
  const s = Zh(r.size, e, t), i = {
    filename: r.filename,
    offset: r.offset + e,
    line: r.line,
    column: r.column + e,
    size: s
  };
  if (n) {
    let a = -1;
    const o = i.column;
    do
      if (a = n.indexOf(`
`, a + 1), a >= 0 && a < e)
        i.column = o - (a + 1), i.line++;
      else
        break;
    while (!0);
  }
  return i;
}
var Q = /* @__PURE__ */ ((r) => (r[r.INITIAL = 1] = "INITIAL", r[r.DOCTYPE = 2] = "DOCTYPE", r[r.TEXT = 3] = "TEXT", r[r.TAG = 4] = "TAG", r[r.ATTR = 5] = "ATTR", r[r.CDATA = 6] = "CDATA", r[r.SCRIPT = 7] = "SCRIPT", r[r.STYLE = 8] = "STYLE", r))(Q || {}), at = /* @__PURE__ */ ((r) => (r[r.TEXT = 1] = "TEXT", r[r.SCRIPT = 2] = "SCRIPT", r[r.STYLE = 3] = "STYLE", r))(at || {});
class em {
  constructor(e) {
    k(this, "contentModel");
    k(this, "state");
    k(this, "string");
    k(this, "filename");
    k(this, "offset");
    k(this, "line");
    k(this, "column");
    this.state = Q.INITIAL, this.string = e.data, this.filename = e.filename, this.offset = e.offset, this.line = e.line, this.column = e.column, this.contentModel = 1;
  }
  getTruncatedLine(e = 13) {
    return JSON.stringify(this.string.length > e ? `${this.string.slice(0, 10)}...` : this.string);
  }
  consume(e, t) {
    typeof e != "number" && (e = e[0].length);
    let n = this.string.slice(0, e), s;
    for (; (s = n.indexOf(`
`)) >= 0; )
      this.line++, this.column = 1, n = n.substr(s + 1);
    this.column += n.length, this.offset += e, this.string = this.string.substr(e), this.state = t;
  }
  getLocation(e) {
    return {
      filename: this.filename,
      offset: this.offset,
      line: this.line,
      column: this.column,
      size: e
    };
  }
}
function Mo(r) {
  return {
    filename: "",
    offset: 0,
    line: 1,
    column: 1,
    ...r
  };
}
var je = /* @__PURE__ */ ((r) => (r[r.ELEMENT_NODE = 1] = "ELEMENT_NODE", r[r.TEXT_NODE = 3] = "TEXT_NODE", r[r.DOCUMENT_NODE = 9] = "DOCUMENT_NODE", r))(je || {});
const tm = "#document", Uo = Symbol("textContent");
let rm = 0;
class ll {
  /**
   * Create a new DOMNode.
   *
   * @internal
   * @param nodeType - What node type to create.
   * @param nodeName - What node name to use. For `HtmlElement` this corresponds
   * to the tagName but other node types have specific predefined values.
   * @param location - Source code location of this node.
   */
  constructor(e, t, n) {
    k(this, "nodeName");
    k(this, "nodeType");
    k(this, "childNodes");
    k(this, "location");
    /**
     * @internal
     */
    k(this, "unique");
    k(this, "cache");
    /**
     * Set of disabled rules for this node.
     *
     * Rules disabled by using directives are added here.
     */
    k(this, "disabledRules");
    /**
     * Set of blocked rules for this node.
     *
     * Rules blocked by using directives are added here.
     */
    k(this, "blockedRules");
    this.nodeType = e, this.nodeName = t ?? tm, this.location = n, this.disabledRules = /* @__PURE__ */ new Set(), this.blockedRules = /* @__PURE__ */ new Map(), this.childNodes = [], this.unique = rm++, this.cache = null;
  }
  /**
   * Enable cache for this node.
   *
   * Should not be called before the node and all children are fully constructed.
   *
   * @internal
   */
  cacheEnable() {
    this.cache = /* @__PURE__ */ new Map();
  }
  cacheGet(e) {
    if (this.cache)
      return this.cache.get(e);
  }
  cacheSet(e, t) {
    return this.cache && this.cache.set(e, t), t;
  }
  cacheRemove(e) {
    return this.cache ? this.cache.delete(e) : !1;
  }
  cacheExists(e) {
    var t;
    return !!((t = this.cache) != null && t.has(e));
  }
  /**
   * Get the text (recursive) from all child nodes.
   */
  get textContent() {
    const e = this.cacheGet(Uo);
    if (e)
      return e;
    const t = this.childNodes.map((n) => n.textContent).join("");
    return this.cacheSet(Uo, t), t;
  }
  append(e) {
    const t = e._setParent(this);
    t && this.isSameNode(t) || (this.childNodes.push(e), t && t._removeChild(e));
  }
  /**
   * Insert a node before a reference node.
   *
   * @internal
   */
  insertBefore(e, t) {
    const n = t ? this.childNodes.findIndex((i) => i.isSameNode(t)) : -1;
    n >= 0 ? this.childNodes.splice(n, 0, e) : this.childNodes.push(e);
    const s = e._setParent(this);
    s && s._removeChild(e);
  }
  isRootElement() {
    return this.nodeType === je.DOCUMENT_NODE;
  }
  /**
   * Tests if two nodes are the same (references the same object).
   *
   * @since v4.11.0
   */
  isSameNode(e) {
    return this.unique === e.unique;
  }
  /**
   * Returns a DOMNode representing the first direct child node or `null` if the
   * node has no children.
   */
  get firstChild() {
    return this.childNodes[0] || null;
  }
  /**
   * Returns a DOMNode representing the last direct child node or `null` if the
   * node has no children.
   */
  get lastChild() {
    return this.childNodes[this.childNodes.length - 1] || null;
  }
  /**
   * @internal
   */
  removeChild(e) {
    return this._removeChild(e), e._setParent(null), e;
  }
  /**
   * Block a rule for this node.
   *
   * @internal
   */
  blockRule(e, t) {
    const n = this.blockedRules.get(e);
    n ? n.push(t) : this.blockedRules.set(e, [t]);
  }
  /**
   * Blocks multiple rules.
   *
   * @internal
   */
  blockRules(e, t) {
    for (const n of e)
      this.blockRule(n, t);
  }
  /**
   * Disable a rule for this node.
   *
   * @internal
   */
  disableRule(e) {
    this.disabledRules.add(e);
  }
  /**
   * Disables multiple rules.
   *
   * @internal
   */
  disableRules(e) {
    for (const t of e)
      this.disableRule(t);
  }
  /**
   * Enable a previously disabled rule for this node.
   */
  enableRule(e) {
    this.disabledRules.delete(e);
  }
  /**
   * Enables multiple rules.
   */
  enableRules(e) {
    for (const t of e)
      this.enableRule(t);
  }
  /**
   * Test if a rule is enabled for this node.
   *
   * @internal
   */
  ruleEnabled(e) {
    return !this.disabledRules.has(e);
  }
  /**
   * Test if a rule is blocked for this node.
   *
   * @internal
   */
  ruleBlockers(e) {
    return this.blockedRules.get(e) ?? [];
  }
  generateSelector() {
    return null;
  }
  /**
   * @internal
   *
   * @returns Old parent, if set.
   */
  _setParent(e) {
    return null;
  }
  _removeChild(e) {
    const t = this.childNodes.findIndex((n) => n.isSameNode(e));
    if (t >= 0)
      this.childNodes.splice(t, 1);
    else
      throw new Error("DOMException: _removeChild(..) could not find child to remove");
  }
}
function nm(r, e) {
  const t = [], n = e ? [] : null;
  for (let s = 0; s < r.length; ) {
    let i = r.indexOf(" ", s);
    i === -1 && (i = r.length);
    const a = i - s;
    if (a === 0) {
      s++;
      continue;
    }
    const o = r.substring(s, i);
    if (t.push(o), n && e) {
      const u = fe(e, s, i);
      n.push(u);
    }
    s += a + 1;
  }
  return { tokens: t, locations: n };
}
class Me extends Array {
  constructor(t, n) {
    var e = (...zE) => (super(...zE), k(this, "value"), k(this, "locations"), this);
    if (t && typeof t == "string") {
      const s = t.replace(/[\t\r\n]/g, " "), { tokens: i, locations: a } = nm(s, n);
      e(...i), this.locations = a;
    } else
      e(0), this.locations = null;
    t instanceof ue ? this.value = t.expr : this.value = t ?? "";
  }
  item(t) {
    return this[t];
  }
  location(t) {
    if (this.locations)
      return this.locations[t];
    throw new Error("Trying to access DOMTokenList location when base location isn't set");
  }
  contains(t) {
    return this.includes(t);
  }
  *iterator() {
    for (let t = 0; t < this.length; t++) {
      const n = this.item(t), s = this.location(t);
      yield { index: t, item: n, location: s };
    }
  }
}
var gt = /* @__PURE__ */ ((r) => (r[r.DESCENDANT = 1] = "DESCENDANT", r[r.CHILD = 2] = "CHILD", r[r.ADJACENT_SIBLING = 3] = "ADJACENT_SIBLING", r[r.GENERAL_SIBLING = 4] = "GENERAL_SIBLING", r[r.SCOPE = 5] = "SCOPE", r))(gt || {});
function sm(r, e) {
  if (e === ":scope")
    return 5;
  switch (r) {
    case void 0:
    case null:
    case "":
      return 1;
    case ">":
      return 2;
    case "+":
      return 3;
    case "~":
      return 4;
    default:
      throw new Error(`Unknown combinator "${r}"`);
  }
}
function im(r) {
  return r.previousSibling === null;
}
function am(r) {
  return r.nextSibling === null;
}
const vs = {};
function om(r) {
  if (!r.parent)
    return -1;
  if (!vs[r.unique]) {
    const t = r.parent.childElements.findIndex((n) => n.unique === r.unique);
    vs[r.unique] = t + 1;
  }
  return vs[r.unique];
}
function um(r, e) {
  if (!e)
    throw new Error("Missing argument to nth-child");
  const t = parseInt(e.trim(), 10);
  return om(r) === t;
}
function lm(r) {
  return r.isSameNode(this.scope);
}
const cm = {
  "first-child": im,
  "last-child": am,
  "nth-child": um,
  scope: lm
};
function dm(r, e) {
  const t = cm[r];
  if (t)
    return t.bind(e);
  throw new Error(`Pseudo-class "${r}" is not implemented`);
}
const fm = ["9", "a", "d"];
function* hm(r) {
  let e = 0, t = 0;
  function n(o, u) {
    return o === "\\" ? 1 : o === " " ? (t = u, 2) : 0;
  }
  function s(o) {
    return fm.includes(o) ? 1 : 0;
  }
  function* i(o, u) {
    return o === " " ? 2 : (yield r.slice(e, t), e = u, t = u, 0);
  }
  let a = 0;
  for (let o = 0; o < r.length; o++) {
    const u = r[o];
    switch (a) {
      case 0:
        a = n(u, o);
        break;
      case 1:
        a = s(u);
        break;
      case 2:
        a = yield* i(u, o);
        break;
    }
  }
  e !== r.length && (yield r.slice(e));
}
function mm(r) {
  return r.replace(/\\(.)/g, "$1");
}
function pm(r) {
  const e = {
    "\\9 ": "	",
    "\\a ": `
`,
    "\\d ": "\r"
  };
  return r.replace(
    /(\\[\u0039\u0061\u0064] )/g,
    (t, n) => e[n]
  );
}
function cl(r) {
  const e = {
    "	": "\\9 ",
    "\n": "\\a ",
    "\r": "\\d "
  };
  return r.toString().replace(/([\t\n\r]|[^a-z0-9_-])/gi, (t, n) => e[n] ? e[n] : `\\${n}`);
}
function dl(r) {
  const e = cl(r);
  return e.match(/^\d/) ? `[id="${e}"]` : `#${e}`;
}
function gm(r) {
  return /[.#[:]/.test(r);
}
function ym(r) {
  return /['"]/.test(r);
}
function bm(r, e) {
  return r === ":" && e === ":";
}
function* Em(r) {
  if (r === "")
    return;
  const e = r.length;
  let t = 0, n = 1, s = !1;
  for (; n < e; ) {
    const a = r[n], o = r.slice(t, n);
    if (a === "\\") {
      n += 2;
      continue;
    }
    if (s) {
      a === s && (s = !1), n += 1;
      continue;
    }
    if (ym(a)) {
      s = a, n += 1;
      continue;
    }
    if (bm(a, o)) {
      n += 1;
      continue;
    }
    gm(a) && (t = n, yield o), n += 1;
  }
  yield r.slice(t, n);
}
class sn {
}
class vm extends sn {
  constructor(t) {
    super();
    k(this, "classname");
    this.classname = t;
  }
  match(t) {
    return t.classList.contains(this.classname);
  }
}
class Dm extends sn {
  constructor(t) {
    super();
    k(this, "id");
    this.id = mm(t);
  }
  match(t) {
    return t.id === this.id;
  }
}
class wm extends sn {
  constructor(t) {
    super();
    k(this, "key");
    k(this, "op");
    k(this, "value");
    const [, n, s, i] = t.match(/^(.+?)(?:([~^$*|]?=)"([^"]+?)")?$/);
    this.key = n, this.op = s, this.value = i;
  }
  match(t) {
    return t.getAttribute(this.key, !0).some((s) => {
      switch (this.op) {
        case void 0:
          return !0;
        /* attribute exists */
        case "=":
          return s.value === this.value;
        default:
          throw new Error(`Attribute selector operator ${this.op} is not implemented yet`);
      }
    });
  }
}
class Am extends sn {
  constructor(t, n) {
    super();
    k(this, "name");
    k(this, "args");
    const s = t.match(/^([^(]+)(?:\((.*)\))?$/);
    if (!s)
      throw new Error(`Missing pseudo-class after colon in selector pattern "${n}"`);
    const [, i, a] = s;
    this.name = i, this.args = a;
  }
  match(t, n) {
    return dm(this.name, n)(t, this.args);
  }
}
class fl {
  constructor(e) {
    k(this, "combinator");
    k(this, "tagName");
    k(this, "selector");
    k(this, "pattern");
    const t = e.match(/^([~+\->]?)((?:[*]|[^.#[:]+)?)([^]*)$/);
    if (!t)
      throw new Error(`Failed to create selector pattern from "${e}"`);
    t.shift(), this.selector = e, this.combinator = sm(t.shift(), e), this.tagName = t.shift() || "*", this.pattern = Array.from(Em(t[0]), (n) => this.createMatcher(n));
  }
  match(e, t) {
    return e.is(this.tagName) && this.pattern.every((n) => n.match(e, t));
  }
  createMatcher(e) {
    switch (e[0]) {
      case ".":
        return new vm(e.slice(1));
      case "#":
        return new Dm(e.slice(1));
      case "[":
        return new wm(e.slice(1, -1));
      case ":":
        return new Am(e.slice(1), this.selector);
      default:
        throw new Error(`Failed to create matcher for "${e}"`);
    }
  }
}
class yt {
  constructor(e) {
    k(this, "pattern");
    this.pattern = yt.parse(e);
  }
  /**
   * Match this selector against a HtmlElement.
   *
   * @param root - Element to match against.
   * @returns Iterator with matched elements.
   */
  *match(e) {
    const t = { scope: e };
    yield* this.matchInternal(e, 0, t);
  }
  *matchInternal(e, t, n) {
    if (t >= this.pattern.length) {
      yield e;
      return;
    }
    const s = this.pattern[t], i = yt.findCandidates(e, s);
    for (const a of i)
      s.match(a, n) && (yield* this.matchInternal(a, t + 1, n));
  }
  static parse(e) {
    return e = e.replace(/([+~>]) /g, "$1"), Array.from(hm(e), (t) => new fl(pm(t)));
  }
  static findCandidates(e, t) {
    switch (t.combinator) {
      case gt.DESCENDANT:
        return e.getElementsByTagName(t.tagName);
      case gt.CHILD:
        return e.childElements.filter((n) => n.is(t.tagName));
      case gt.ADJACENT_SIBLING:
        return yt.findAdjacentSibling(e);
      case gt.GENERAL_SIBLING:
        return yt.findGeneralSibling(e);
      case gt.SCOPE:
        return [e];
    }
    return [];
  }
  static findAdjacentSibling(e) {
    let t = !1;
    return e.siblings.filter((n) => t ? (t = !1, !0) : (n === e && (t = !0), !1));
  }
  static findGeneralSibling(e) {
    let t = !1;
    return e.siblings.filter((n) => t ? !0 : (n === e && (t = !0), !1));
  }
}
const Cm = "#text";
function ui(r) {
  return !!(r && r.nodeType === je.TEXT_NODE);
}
class $m extends ll {
  /**
   * @param text - Text to add. When a `DynamicValue` is used the expression is
   * used as "text".
   * @param location - Source code location of this node.
   */
  constructor(t, n) {
    super(je.TEXT_NODE, Cm, n);
    k(this, "text");
    this.text = t;
  }
  /**
   * Get the text from node.
   */
  get textContent() {
    return this.text.toString();
  }
  /**
   * Flag set to true if the attribute value is static.
   */
  get isStatic() {
    return !this.isDynamic;
  }
  /**
   * Flag set to true if the attribute value is dynamic.
   */
  get isDynamic() {
    return this.text instanceof ue;
  }
}
const Fr = Symbol("role"), mt = Symbol("tabindex");
var $e = /* @__PURE__ */ ((r) => (r[r.Open = 0] = "Open", r[r.EndTag = 1] = "EndTag", r[r.VoidOmitted = 2] = "VoidOmitted", r[r.VoidSelfClosed = 3] = "VoidSelfClosed", r[r.ImplicitClosed = 4] = "ImplicitClosed", r))($e || {});
function li(r) {
  return !!(r && r.nodeType === je.ELEMENT_NODE);
}
function _m(r) {
  return r === "" || r === "*";
}
function Sm(r) {
  return {
    closest(e) {
      var t;
      return (t = r.closest(e)) == null ? void 0 : t._adapter;
    },
    getAttribute(e) {
      var t;
      return (t = r.getAttribute(e)) == null ? void 0 : t.value;
    },
    hasAttribute(e) {
      return r.hasAttribute(e);
    }
  };
}
class Qe extends ll {
  constructor(t) {
    const {
      nodeType: n,
      tagName: s,
      parent: i = null,
      closed: a = 1,
      meta: o = null,
      location: u
    } = t;
    super(n, s, u);
    k(this, "tagName");
    k(this, "voidElement");
    k(this, "depth");
    k(this, "closed");
    k(this, "attr");
    k(this, "metaElement");
    k(this, "annotation");
    k(this, "_parent");
    /** @internal */
    k(this, "_adapter");
    if (_m(s))
      throw new Error(`The tag name provided ("${s}") is not a valid name`);
    if (this.tagName = s ?? "#document", this._parent = null, this.attr = {}, this.metaElement = o ?? null, this.closed = a, this.voidElement = o ? !!o.void : !1, this.depth = 0, this.annotation = null, this._adapter = Sm(this), i) {
      i.append(this);
      let l = i;
      for (; l.parent; )
        this.depth++, l = l.parent;
    }
  }
  /**
   * Manually create a new element. This is primary useful for test-cases. While
   * the API is public it is not meant for general consumption and is not
   * guaranteed to be stable across versions.
   *
   * Use at your own risk. Prefer to use [[Parser]] to parse a string of markup
   * instead.
   *
   * @public
   * @since 8.22.0
   * @param tagName - Element tagname.
   * @param location - Element location.
   * @param details - Additional element details.
   */
  static createElement(t, n, s = {}) {
    const { closed: i = 1, meta: a = null, parent: o = null } = s;
    return new Qe({
      nodeType: je.ELEMENT_NODE,
      tagName: t,
      parent: o,
      closed: i,
      meta: a,
      location: n
    });
  }
  /**
   * @internal
   */
  static rootNode(t) {
    const n = new Qe({
      nodeType: je.DOCUMENT_NODE,
      location: t
    });
    return n.setAnnotation("#document"), n;
  }
  /**
   * @internal
   *
   * @param namespace - If given it is appended to the tagName.
   */
  static fromTokens(t, n, s, i, a = "") {
    const o = t.data[2], u = a ? `${a}:${o}` : o;
    if (!o)
      throw new Error("tagName cannot be empty");
    const l = i ? i.getMetaFor(u) : null, c = t.data[1] !== "/", g = Rm(n, l), v = fe(t.location, 1);
    return new Qe({
      nodeType: je.ELEMENT_NODE,
      tagName: u,
      parent: c ? s : null,
      closed: g,
      meta: l,
      location: v
    });
  }
  /**
   * Returns annotated name if set or defaults to `<tagName>`.
   *
   * E.g. `my-annotation` or `<div>`.
   */
  get annotatedName() {
    return this.annotation ? this.annotation : `<${this.tagName}>`;
  }
  /**
   * Get list of IDs referenced by `aria-labelledby`.
   *
   * If the attribute is unset or empty this getter returns null.
   * If the attribute is dynamic the original {@link DynamicValue} is returned.
   *
   * @public
   */
  get ariaLabelledby() {
    const t = this.getAttribute("aria-labelledby");
    if (!(t != null && t.value))
      return null;
    if (t.value instanceof ue)
      return t.value;
    const n = new Me(t.value, t.valueLocation);
    return n.length ? Array.from(n) : null;
  }
  /**
   * Similar to childNodes but only elements.
   */
  get childElements() {
    return this.childNodes.filter(li);
  }
  /**
   * Find the first ancestor matching a selector.
   *
   * Implementation of DOM specification of Element.closest(selectors).
   */
  closest(t) {
    let n = this;
    for (; n; ) {
      if (n.matches(t))
        return n;
      n = n.parent;
    }
    return null;
  }
  /**
   * Generate a DOM selector for this element. The returned selector will be
   * unique inside the current document.
   */
  generateSelector() {
    if (this.isRootElement())
      return null;
    const t = [];
    let n;
    for (n = this; n.parent; n = n.parent)
      ;
    for (let s = this; s.parent; s = s.parent) {
      if (s.id) {
        const c = dl(s.id);
        if (n.querySelectorAll(c).length === 1) {
          t.push(c);
          break;
        }
      }
      const a = s.parent.childElements, o = a.findIndex((c) => c.unique === s.unique);
      if (a.filter((c) => c.is(s.tagName)).length === 1) {
        t.push(s.tagName.toLowerCase());
        continue;
      }
      t.push(`${s.tagName.toLowerCase()}:nth-child(${String(o + 1)})`);
    }
    return t.reverse().join(" > ");
  }
  /**
   * Tests if this element has given tagname.
   *
   * If passing "*" this test will pass if any tagname is set.
   */
  is(t) {
    return t === "*" || this.tagName.toLowerCase() === t.toLowerCase();
  }
  /**
   * Load new element metadata onto this element.
   *
   * Do note that semantics such as `void` cannot be changed (as the element has
   * already been created). In addition the element will still "be" the same
   * element, i.e. even if loading meta for a `<p>` tag upon a `<div>` tag it
   * will still be a `<div>` as far as the rest of the validator is concerned.
   *
   * In fact only certain properties will be copied onto the element:
   *
   * - content categories (flow, phrasing, etc)
   * - required attributes
   * - attribute allowed values
   * - permitted/required elements
   *
   * Properties *not* loaded:
   *
   * - inherit
   * - deprecated
   * - foreign
   * - void
   * - implicitClosed
   * - scriptSupporting
   * - deprecatedAttributes
   *
   * Changes to element metadata will only be visible after `element:ready` (and
   * the subsequent `dom:ready` event).
   */
  loadMeta(t) {
    this.metaElement || (this.metaElement = {});
    for (const n of ks) {
      const s = t[n];
      typeof s < "u" ? qs(this.metaElement, n, s) : delete this.metaElement[n];
    }
  }
  /**
   * Match this element against given selectors. Returns true if any selector
   * matches.
   *
   * Implementation of DOM specification of Element.matches(selectors).
   */
  matches(t) {
    let n = this;
    for (; n.parent; )
      n = n.parent;
    for (const s of n.querySelectorAll(t))
      if (s.unique === this.unique)
        return !0;
    return !1;
  }
  get meta() {
    return this.metaElement;
  }
  get parent() {
    return this._parent;
  }
  /**
   * Get current role for this element (explicit with `role` attribute or mapped
   * with implicit role).
   *
   * @since 8.9.1
   */
  get role() {
    const t = this.cacheGet(Fr);
    if (t !== void 0)
      return t;
    const n = this.getAttribute("role");
    if (n)
      return this.cacheSet(Fr, n.value);
    if (this.metaElement) {
      const { aria: s } = this.metaElement, i = s.implicitRole(this._adapter);
      return this.cacheSet(Fr, i);
    }
    return this.cacheSet(Fr, null);
  }
  /**
   * Set annotation for this element.
   */
  setAnnotation(t) {
    this.annotation = t;
  }
  /**
   * Set attribute. Stores all attributes set even with the same name.
   *
   * @param key - Attribute name
   * @param value - Attribute value. Use `null` if no value is present.
   * @param keyLocation - Location of the attribute name.
   * @param valueLocation - Location of the attribute value (excluding quotation)
   * @param originalAttribute - If attribute is an alias for another attribute
   * (dynamic attributes) set this to the original attribute name.
   */
  setAttribute(t, n, s, i, a) {
    t = t.toLowerCase();
    const o = new Jh(t, n, s, i, a), u = this.attr[t];
    u ? u.push(o) : this.attr[t] = [o];
  }
  /**
   * Get parsed tabindex for this element.
   *
   * - If `tabindex` attribute is not present `null` is returned.
   * - If attribute value is omitted or the empty string `null` is returned.
   * - If attribute value cannot be parsed `null` is returned.
   * - If attribute value is dynamic `0` is returned.
   * - Otherwise the parsed value is returned.
   *
   * This property does *NOT* take into account if the element have a default
   * `tabindex` (such as `<input>` have). Instead use the `focusable` metadata
   * property to determine this.
   *
   * @public
   * @since 8.16.0
   */
  get tabIndex() {
    const t = this.cacheGet(mt);
    if (t !== void 0)
      return t;
    const n = this.getAttribute("tabindex");
    if (!n)
      return this.cacheSet(mt, null);
    if (n.value === null)
      return this.cacheSet(mt, null);
    if (n.value instanceof ue)
      return this.cacheSet(mt, 0);
    const s = parseInt(n.value, 10);
    return isNaN(s) ? this.cacheSet(mt, null) : this.cacheSet(mt, s);
  }
  /**
   * Get a list of all attributes on this node.
   */
  get attributes() {
    return Object.values(this.attr).reduce((t, n) => t.concat(n), []);
  }
  hasAttribute(t) {
    return t = t.toLowerCase(), t in this.attr;
  }
  getAttribute(t, n = !1) {
    if (t = t.toLowerCase(), t in this.attr) {
      const s = this.attr[t];
      return n ? s : s[0];
    } else
      return n ? [] : null;
  }
  /**
   * Get attribute value.
   *
   * Returns the attribute value if present.
   *
   * - Missing attributes return `null`.
   * - Boolean attributes return `null`.
   * - `DynamicValue` returns attribute expression.
   *
   * @param key - Attribute name
   * @returns Attribute value or null.
   */
  getAttributeValue(t) {
    const n = this.getAttribute(t);
    return n && n.value !== null ? n.value.toString() : null;
  }
  /**
   * Add text as a child node to this element.
   *
   * @param text - Text to add.
   * @param location - Source code location of this text.
   */
  appendText(t, n) {
    this.childNodes.push(new $m(t, n));
  }
  /**
   * Return a list of all known classes on the element. Dynamic values are
   * ignored.
   */
  get classList() {
    if (!this.hasAttribute("class"))
      return new Me(null, null);
    const t = this.getAttribute("class", !0).filter((n) => n.isStatic).map((n) => n.value).join(" ");
    return new Me(t, null);
  }
  /**
   * Get element ID if present.
   */
  get id() {
    return this.getAttributeValue("id");
  }
  get style() {
    const t = this.getAttribute("style");
    return oi(t == null ? void 0 : t.value);
  }
  /**
   * Returns the first child element or null if there are no child elements.
   */
  get firstElementChild() {
    const t = this.childElements;
    return t.length > 0 ? t[0] : null;
  }
  /**
   * Returns the last child element or null if there are no child elements.
   */
  get lastElementChild() {
    const t = this.childElements;
    return t.length > 0 ? t[t.length - 1] : null;
  }
  get siblings() {
    return this.parent ? this.parent.childElements : [this];
  }
  get previousSibling() {
    const t = this.siblings.findIndex((n) => n.unique === this.unique);
    return t >= 1 ? this.siblings[t - 1] : null;
  }
  get nextSibling() {
    const t = this.siblings.findIndex((n) => n.unique === this.unique);
    return t <= this.siblings.length - 2 ? this.siblings[t + 1] : null;
  }
  getElementsByTagName(t) {
    return this.childElements.reduce((n, s) => n.concat(s.is(t) ? [s] : [], s.getElementsByTagName(t)), []);
  }
  querySelector(t) {
    const s = this.querySelectorImpl(t).next();
    return s.done ? null : s.value;
  }
  querySelectorAll(t) {
    const n = this.querySelectorImpl(t), s = new Set(n);
    return Array.from(s.values());
  }
  *querySelectorImpl(t) {
    if (t)
      for (const n of t.split(/,\s*/))
        yield* new yt(n).match(this);
  }
  /**
   * Evaluates callbackk on all descendants, returning true if any are true.
   *
   * @internal
   */
  someChildren(t) {
    return this.childElements.some(n);
    function n(s) {
      return t(s) ? !0 : s.childElements.some(n);
    }
  }
  /**
   * Evaluates callbackk on all descendants, returning true if all are true.
   *
   * @internal
   */
  everyChildren(t) {
    return this.childElements.every(n);
    function n(s) {
      return t(s) ? s.childElements.every(n) : !1;
    }
  }
  /**
   * Visit all nodes from this node and down. Breadth first.
   *
   * The first node for which the callback evaluates to true is returned.
   *
   * @internal
   */
  find(t) {
    function n(s) {
      if (t(s))
        return s;
      for (const i of s.childElements) {
        const a = i.find(t);
        if (a)
          return a;
      }
      return null;
    }
    return n(this);
  }
  /**
   * @internal
   */
  _setParent(t) {
    const n = this._parent;
    return this._parent = t instanceof Qe ? t : null, n;
  }
}
function Rm(r, e) {
  let t = 0;
  return e != null && e.void && (t = 2), r.data[0] === "/>" && (t = 3), t;
}
function Tm(r) {
  return "root" in r && "readyState" in r;
}
function Nm(r, e) {
  if (Tm(r)) {
    if (r.readyState !== "complete")
      throw new Error("Cannot call walk.depthFirst(..) before document is ready");
    r = r.root;
  }
  function t(n) {
    n.childElements.forEach(t), n.isRootElement() || e(n);
  }
  t(r);
}
const Oe = {
  depthFirst: Nm
};
class Fm {
  /**
   * @internal
   */
  constructor(e) {
    k(this, "root");
    k(this, "active");
    k(this, "_readyState");
    k(this, "doctype");
    this.root = Qe.rootNode(e), this.active = this.root, this.doctype = null, this._readyState = "loading";
  }
  /**
   * @internal
   */
  pushActive(e) {
    this.active = e;
  }
  /**
   * @internal
   */
  popActive() {
    this.active.isRootElement() || (this.active = this.active.parent ?? this.root);
  }
  /**
   * @internal
   */
  getActive() {
    return this.active;
  }
  /**
   * Describes the loading state of the document.
   *
   * When `"loading"` it is still not safe to use functions such as
   * `querySelector` or presence of attributes, child nodes, etc.
   */
  get readyState() {
    return this._readyState;
  }
  /**
   * Resolve dynamic meta expressions.
   *
   * @internal
   */
  resolveMeta(e) {
    this._readyState = "complete", Oe.depthFirst(this, (t) => {
      e.resolve(t);
    });
  }
  getElementsByTagName(e) {
    return this.root.getElementsByTagName(e);
  }
  /**
   * @deprecated use utility function `walk.depthFirst(..)` instead (since 8.21.0).
   */
  visitDepthFirst(e) {
    Oe.depthFirst(this, e);
  }
  /**
   * @deprecated use `querySelector(..)` instead (since 8.21.0)
   */
  find(e) {
    return this.root.find(e);
  }
  querySelector(e) {
    return this.root.querySelector(e);
  }
  querySelectorAll(e) {
    return this.root.querySelectorAll(e);
  }
}
const Pm = ["exclude"];
class ce {
  /**
   * Test if element is used in a proper context.
   *
   * @param node - Element to test.
   * @param rules - List of rules.
   * @returns `true` if element passes all tests.
   */
  static validatePermitted(e, t) {
    return t ? t.some((n) => ce.validatePermittedRule(e, n)) : !0;
  }
  /**
   * Test if an element is used the correct amount of times.
   *
   * For instance, a `<table>` element can only contain a single `<tbody>`
   * child. If multiple `<tbody>` exists this test will fail both nodes.
   * Note that this is called on the parent but will fail the children violating
   * the rule.
   *
   * @param children - Array of children to validate.
   * @param rules - List of rules of the parent element.
   * @returns `true` if the parent element of the children passes the test.
   */
  static validateOccurrences(e, t, n) {
    if (!t)
      return !0;
    let s = !0;
    for (const i of t) {
      if (typeof i != "string")
        return !1;
      const [, a, o] = i.match(/^(@?.*?)([?*]?)$/), u = a && o && Om(o);
      if (u) {
        const l = e.filter(
          (c) => ce.validatePermittedCategory(c, i, !0)
        );
        if (l.length > u) {
          for (const c of l.slice(u))
            n(c, a);
          s = !1;
        }
      }
    }
    return s;
  }
  /**
   * Validate elements order.
   *
   * Given a parent element with children and metadata containing permitted
   * order it will validate each children and ensure each one exists in the
   * specified order.
   *
   * For instance, for a `<table>` element the `<caption>` element must come
   * before a `<thead>` which must come before `<tbody>`.
   *
   * @param children - Array of children to validate.
   */
  static validateOrder(e, t, n) {
    if (!t)
      return !0;
    let s = 0, i = null;
    for (const a of e) {
      const o = s;
      for (; t[s] && !ce.validatePermittedCategory(a, t[s], !0); )
        s++;
      if (s >= t.length) {
        if (t.find(
          (l) => ce.validatePermittedCategory(a, l, !0)
        ))
          return n(a, i), !1;
        s = o;
      }
      i = a;
    }
    return !0;
  }
  /**
   * Validate element ancestors.
   *
   * Check if an element has the required set of elements. At least one of the
   * selectors must match.
   */
  static validateAncestors(e, t) {
    return !t || t.length === 0 ? !0 : t.some((n) => e.closest(n));
  }
  /**
   * Validate element required content.
   *
   * Check if an element has the required set of elements. At least one of the
   * selectors must match.
   *
   * Returns `[]` when valid or a list of required but missing tagnames or
   * categories.
   */
  static validateRequiredContent(e, t) {
    return !t || t.length === 0 ? [] : t.filter((n) => !e.childElements.some(
      (i) => ce.validatePermittedCategory(i, n, !1)
    ));
  }
  /**
   * Test if an attribute has an allowed value and/or format.
   *
   * @param attr - Attribute to test.
   * @param rules - Element attribute metadta.
   * @returns `true` if attribute passes all tests.
   */
  static validateAttribute(e, t) {
    const n = t[e.key];
    if (!n)
      return !0;
    const s = e.value;
    if (s instanceof ue)
      return !0;
    const i = s === null || s === "";
    return n.boolean ? i || s === e.key : n.omit && i ? !0 : n.list ? new Me(s, e.valueLocation).every((o) => this.validateAttributeValue(o, n)) : this.validateAttributeValue(s, n);
  }
  static validateAttributeValue(e, t) {
    if (!t.enum)
      return !0;
    if (e === null)
      return !1;
    const n = e.toLowerCase();
    return t.enum.some((s) => s instanceof RegExp ? !!e.match(s) : n === s);
  }
  static validatePermittedRule(e, t, n = !1) {
    return typeof t == "string" ? ce.validatePermittedCategory(e, t, !n) : Array.isArray(t) ? t.every((s) => ce.validatePermittedRule(e, s, n)) : (Im(t), t.exclude ? Array.isArray(t.exclude) ? !t.exclude.some((s) => ce.validatePermittedRule(e, s, !0)) : !ce.validatePermittedRule(e, t.exclude, !0) : !0);
  }
  /**
   * Validate node against a content category.
   *
   * When matching parent nodes against permitted parents use the superset
   * parameter to also match for `@flow`. E.g. if a node expects a `@phrasing`
   * parent it should also allow `@flow` parent since `@phrasing` is a subset of
   * `@flow`.
   *
   * @param node - The node to test against
   * @param category - Name of category with `@` prefix or tag name.
   * @param defaultMatch - The default return value when node categories is not known.
   */
  /* eslint-disable-next-line complexity -- rule does not like switch */
  static validatePermittedCategory(e, t, n) {
    const [, s] = t.match(/^(@?.*?)([?*]?)$/);
    if (!s.startsWith("@"))
      return e.tagName === s;
    if (!e.meta)
      return n;
    switch (s) {
      case "@meta":
        return e.meta.metadata;
      case "@flow":
        return e.meta.flow;
      case "@sectioning":
        return e.meta.sectioning;
      case "@heading":
        return e.meta.heading;
      case "@phrasing":
        return e.meta.phrasing;
      case "@embedded":
        return e.meta.embedded;
      case "@interactive":
        return e.meta.interactive;
      case "@script":
        return !!e.meta.scriptSupporting;
      case "@form":
        return !!e.meta.form;
      default:
        throw new Error(`Invalid content category "${t}"`);
    }
  }
}
function Im(r) {
  for (const e of Object.keys(r))
    if (!Pm.includes(e)) {
      const t = JSON.stringify(r);
      throw new Error(`Permitted rule "${t}" contains unknown property "${e}"`);
    }
}
function Om(r) {
  switch (r) {
    case "?":
      return 1;
    case "*":
      return null;
    // istanbul ignore next
    default:
      throw new Error(`Invalid quantifier "${r}" used`);
  }
}
const km = "http://json-schema.org/draft-06/schema#", qm = "https://html-validate.org/schemas/config.json", xm = "object", Lm = !1, Bm = {
  $schema: {
    type: "string"
  },
  root: {
    type: "boolean",
    title: "Mark as root configuration",
    description: "If this is set to true no further configurations will be searched.",
    default: !1
  },
  extends: {
    type: "array",
    items: {
      type: "string"
    },
    title: "Configurations to extend",
    description: "Array of shareable or builtin configurations to extend."
  },
  elements: {
    type: "array",
    items: {
      anyOf: [
        {
          type: "string"
        },
        {
          type: "object"
        }
      ]
    },
    title: "Element metadata to load",
    description: "Array of modules, plugins or files to load element metadata from. Use <rootDir> to refer to the folder with the package.json file.",
    examples: [
      [
        "html-validate:recommended",
        "plugin:recommended",
        "module",
        "./local-file.json"
      ]
    ]
  },
  plugins: {
    type: "array",
    items: {
      anyOf: [
        {
          type: "string"
        },
        {
          type: "object"
        }
      ]
    },
    title: "Plugins to load",
    description: "Array of plugins load. Use <rootDir> to refer to the folder with the package.json file.",
    examples: [
      [
        "my-plugin",
        "./local-plugin"
      ]
    ]
  },
  transform: {
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          type: "string"
        },
        {
          function: !0
        }
      ]
    },
    title: "File transformations to use.",
    description: "Object where key is regular expression to match filename and value is name of transformer or a function.",
    examples: [
      {
        "^.*\\.foo$": "my-transformer",
        "^.*\\.bar$": "my-plugin",
        "^.*\\.baz$": "my-plugin:named"
      }
    ]
  },
  rules: {
    type: "object",
    patternProperties: {
      ".*": {
        anyOf: [
          {
            enum: [
              0,
              1,
              2,
              "off",
              "warn",
              "error"
            ]
          },
          {
            type: "array",
            minItems: 1,
            maxItems: 1,
            items: [
              {
                enum: [
                  0,
                  1,
                  2,
                  "off",
                  "warn",
                  "error"
                ]
              }
            ]
          },
          {
            type: "array",
            minItems: 2,
            maxItems: 2,
            items: [
              {
                enum: [
                  0,
                  1,
                  2,
                  "off",
                  "warn",
                  "error"
                ]
              },
              {}
            ]
          }
        ]
      }
    },
    title: "Rule configuration.",
    description: "Enable/disable rules, set severity. Some rules have additional configuration like style or patterns to use.",
    examples: [
      {
        foo: "error",
        bar: "off",
        baz: [
          "error",
          {
            style: "camelcase"
          }
        ]
      }
    ]
  }
};
var ci = {
  $schema: km,
  $id: qm,
  type: xm,
  additionalProperties: Lm,
  properties: Bm
}, Ke = /* @__PURE__ */ ((r) => (r[r.DISABLED = 0] = "DISABLED", r[r.WARN = 1] = "WARN", r[r.ERROR = 2] = "ERROR", r))(Ke || {});
function jm(r) {
  switch (r) {
    case 0:
    case "off":
      return 0;
    case 1:
    case "warn":
      return 1;
    case 2:
    case "error":
      return 2;
    default:
      throw new Error(`Invalid severity "${String(r)}"`);
  }
}
function Mm(r) {
  return JSON.stringify(r);
}
function xs(r, e = !1) {
  return r === null ? "null" : typeof r == "number" ? r.toString() : typeof r == "string" ? e ? Mm(r) : r : Array.isArray(r) ? `[ ${r.map((n) => xs(n, !0)).join(", ")} ]` : typeof r == "object" ? `{ ${Object.entries(r).map(([n, s]) => `${n}: ${xs(s, !0)}`).join(", ")} }` : String(r);
}
function hl(r, e) {
  return r.replace(/{{\s*([^\s{}]+)\s*}}/g, (t, n) => typeof e[n] < "u" ? xs(e[n]) : t);
}
const Pt = Symbol("aria-naming"), Vo = "allowed", Um = [
  "caption",
  "code",
  "deletion",
  "emphasis",
  "generic",
  "insertion",
  "paragraph",
  "presentation",
  "strong",
  "subscript",
  "superscript"
];
function Vm(r) {
  return Um.includes(r) ? "prohibited" : "allowed";
}
function Hm(r, e) {
  return e.aria.naming(r._adapter);
}
function Gm(r) {
  var s;
  const e = r.cacheGet(Pt);
  if (e)
    return e;
  const t = (s = r.getAttribute("role")) == null ? void 0 : s.value;
  if (t)
    return t instanceof ue ? r.cacheSet(Pt, Vo) : r.cacheSet(Pt, Vm(t));
  const n = r.meta;
  return n ? r.cacheSet(Pt, Hm(r, n)) : r.cacheSet(Pt, Vo);
}
const Ho = /* @__PURE__ */ new Map();
function zm(r) {
  const e = r.replace(/[*]+/g, ".+");
  return new RegExp(`^${e}$`);
}
function Km(r) {
  return new RegExp(`^${r}$`);
}
function Wm(r) {
  const e = Ho.get(r);
  if (e)
    return e;
  const t = r.match(/^\/(.*)\/$/), n = t ? Km(t[1]) : zm(r);
  return Ho.set(r, n), n;
}
function Xm(r, e) {
  for (const t of r)
    if (Wm(t).test(e))
      return !0;
  return !1;
}
function Ym(r, e, t = (n, s) => n.includes(s)) {
  const { include: n, exclude: s } = r;
  return !!(n && !t(n, e) || s && t(s, e));
}
const Go = Symbol(Ct.name), zo = Symbol($t.name), Ko = Symbol(an.name), pt = Symbol(ml.name), Wo = Symbol(on.name);
function Ze(r) {
  return !(Ct(r) || ml(r) || $t(r) || an(r) || on(r));
}
function Jm(r) {
  const e = (t) => {
    const n = t.getAttribute("aria-hidden");
    return !!(n && n.value === "true");
  };
  return {
    byParent: r.parent ? Ct(r.parent) : !1,
    bySelf: e(r)
  };
}
function Ct(r, e) {
  const t = r.cacheGet(Go);
  if (t)
    return e ? t : t.byParent || t.bySelf;
  const n = r.cacheSet(Go, Jm(r));
  return e ? n : n.byParent || n.bySelf;
}
function Qm(r) {
  const e = (t) => {
    const n = t.getAttribute("hidden");
    return !!(n != null && n.isStatic);
  };
  return {
    byParent: r.parent ? $t(r.parent) : !1,
    bySelf: e(r)
  };
}
function $t(r, e) {
  const t = r.cacheGet(zo);
  if (t)
    return e ? t : t.byParent || t.bySelf;
  const n = r.cacheSet(zo, Qm(r));
  return e ? n : n.byParent || n.bySelf;
}
function Zm(r) {
  const e = (t) => {
    const n = t.getAttribute("inert");
    return !!(n != null && n.isStatic);
  };
  return {
    byParent: r.parent ? an(r.parent) : !1,
    bySelf: e(r)
  };
}
function an(r, e) {
  const t = r.cacheGet(Ko);
  if (t)
    return e ? t : t.byParent || t.bySelf;
  const n = r.cacheSet(Ko, Zm(r));
  return e ? n : n.byParent || n.bySelf;
}
function ep(r) {
  const e = (s) => {
    const i = s.getAttribute("style"), { display: a, visibility: o } = oi(i == null ? void 0 : i.value);
    return a === "none" || o === "hidden";
  }, t = r.parent ? on(r.parent) : !1, n = e(r);
  return t || n;
}
function on(r) {
  const e = r.cacheGet(Wo);
  return e || r.cacheSet(Wo, ep(r));
}
function ml(r) {
  if (r.cacheExists(pt))
    return !!r.cacheGet(pt);
  const e = r.meta;
  if (e != null && e.interactive || r.getAttribute("tabindex"))
    return r.cacheSet(pt, !1);
  const n = r.getAttribute("role");
  return n && (n.value === "presentation" || n.value === "none") ? r.cacheSet(pt, !0) : r.cacheSet(pt, !1);
}
const un = lt.name, tp = Symbol(`${un}|html`), rp = Symbol(`${un}|a11y`), np = Symbol(`${un}|html|ignore-hidden-root`), sp = Symbol(`${un}|a11y|ignore-hidden-root`);
var Ie = /* @__PURE__ */ ((r) => (r[r.EMPTY_TEXT = 0] = "EMPTY_TEXT", r[r.DYNAMIC_TEXT = 1] = "DYNAMIC_TEXT", r[r.STATIC_TEXT = 2] = "STATIC_TEXT", r))(Ie || {});
function ip(r) {
  const { accessible: e = !1, ignoreHiddenRoot: t = !1 } = r;
  return e && t ? sp : t ? np : e ? rp : tp;
}
function ap(r) {
  return r.is("select") || r.is("textarea");
}
function lt(r, e = {}) {
  const { accessible: t = !1, ignoreHiddenRoot: n = !1 } = e, s = ip(e);
  if (r.cacheExists(s))
    return r.cacheGet(s);
  if (!n && $t(r) || !n && t && Ct(r) || ap(r))
    return r.cacheSet(
      s,
      0
      /* EMPTY_TEXT */
    );
  const i = pl(r, {
    ...e
  });
  return i.some((a) => a.isDynamic) ? r.cacheSet(
    s,
    1
    /* DYNAMIC_TEXT */
  ) : i.some((a) => a.textContent.match(/\S/) !== null) ? r.cacheSet(
    s,
    2
    /* STATIC_TEXT */
  ) : r.cacheSet(
    s,
    0
    /* EMPTY_TEXT */
  );
}
function pl(r, e) {
  const { accessible: t = !1 } = e;
  let n = [];
  for (const s of r.childNodes)
    if (ui(s))
      n.push(s);
    else if (li(s)) {
      if ($t(s, !0).bySelf || t && Ct(s, !0).bySelf)
        continue;
      n = n.concat(pl(s, e));
    }
  return n;
}
function ln(r) {
  const e = r.getAttribute("alt");
  return !e || e.value === null ? !1 : e.isDynamic || e.value.toString() !== "";
}
function Xo(r) {
  const e = r.getAttribute("aria-label");
  return !e || e.value === null ? !1 : e.isDynamic || e.value.toString() !== "";
}
function op(r, e) {
  const t = [[], []];
  return r.reduce((n, s, i) => {
    const a = e(s, i, r);
    return n[a ? 0 : 1].push(s), n;
  }, t);
}
const Ls = new Gs({ strict: !0, strictTuples: !0, strictTypes: !0 });
Ls.addMetaSchema(ai);
function up(r, e) {
  const t = `rule/${r}`, n = Ls.getSchema(t);
  if (n)
    return n;
  const s = {
    $id: t,
    type: "object",
    additionalProperties: !1,
    properties: e
  };
  return Ls.compile(s);
}
function lp(r) {
  return !!(r[0] && r[0].message);
}
function cp(r) {
  if (lp(r))
    return r[0];
  {
    const [e, t, n, s] = r;
    return { node: e, message: t, location: n, context: s };
  }
}
class B {
  constructor(e) {
    k(this, "reporter");
    k(this, "parser");
    k(this, "meta");
    k(this, "enabled");
    // rule enabled/disabled, irregardless of severity
    k(this, "blockers");
    k(this, "severity");
    // rule severity
    k(this, "event");
    /**
     * Rule name. Defaults to filename without extension but can be overwritten by
     * subclasses.
     */
    k(this, "name");
    /**
     * Rule options.
     */
    k(this, "options");
    this.reporter = null, this.parser = null, this.meta = null, this.event = null, this.options = e, this.enabled = !0, this.blockers = [], this.severity = Ke.DISABLED, this.name = "";
  }
  getSeverity() {
    return this.severity;
  }
  setServerity(e) {
    this.severity = e;
  }
  /**
   * Block this rule from generating errors. Pass in an id generated by
   * `createBlocker`. Can be unblocked by {@link Rule.unblock}.
   *
   * A blocked rule is similar to disabling it but it will still receive parser
   * events. A list of all blockers is passed to the `rule:error` event.
   *
   * @internal
   */
  block(e) {
    this.blockers.push(e);
  }
  /**
   * Unblock a rule previously blocked by {@link Rule.block}.
   *
   * @internal
   */
  unblock(e) {
    this.blockers = this.blockers.filter((t) => t !== e);
  }
  setEnabled(e) {
    this.enabled = e;
  }
  /**
   * Returns `true` if rule is deprecated.
   *
   * Overridden by subclasses.
   */
  get deprecated() {
    return !1;
  }
  /**
   * Test if rule is enabled.
   *
   * To be considered enabled the enabled flag must be true and the severity at
   * least warning.
   *
   * @internal
   */
  isEnabled(e) {
    return this.enabled && this.severity >= Ke.WARN && (!e || e.ruleEnabled(this.name));
  }
  /**
   * Test if rule is enabled.
   *
   * To be considered enabled the enabled flag must be true and the severity at
   * least warning.
   *
   * @internal
   */
  isBlocked(e) {
    return !!(this.blockers.length > 0 || e && e.ruleBlockers(this.name).length > 0);
  }
  /**
   * Get a list of all blockers currently active this rule.
   *
   * @internal
   */
  getBlockers(e) {
    return [...this.blockers, ...e ? e.ruleBlockers(this.name) : []];
  }
  /**
   * Check if keyword is being ignored by the current rule configuration.
   *
   * This method requires the [[RuleOption]] type to include two properties:
   *
   * - include: string[] | null
   * - exclude: string[] | null
   *
   * This methods checks if the given keyword is included by "include" but not
   * excluded by "exclude". If any property is unset it is skipped by the
   * condition. Usually the user would use either one but not both but there is
   * no limitation to use both but the keyword must satisfy both conditions. If
   * either condition fails `true` is returned.
   *
   * For instance, given `{ include: ["foo"] }` the keyword `"foo"` would match
   * but not `"bar"`.
   *
   * Similarly, given `{ exclude: ["foo"] }` the keyword `"bar"` would match but
   * not `"foo"`.
   *
   * @param keyword - Keyword to match against `include` and `exclude` options.
   * @param matcher - Optional function to compare items with.
   * @returns `true` if keyword is not present in `include` or is present in
   * `exclude`.
   */
  isKeywordIgnored(e, t = (n, s) => n.includes(s)) {
    return Ym(this.options, e, t);
  }
  /**
   * Get [[MetaElement]] for the given tag. If no specific metadata is present
   * the global metadata is returned or null if no global is present.
   *
   * @public
   * @returns A shallow copy of metadata.
   */
  getMetaFor(e) {
    return this.meta.getMetaFor(e);
  }
  /**
   * Find all tags which has enabled given property.
   */
  getTagsWithProperty(e) {
    return this.meta.getTagsWithProperty(e);
  }
  /**
   * Find tag matching tagName or inheriting from it.
   */
  getTagsDerivedFrom(e) {
    return this.meta.getTagsDerivedFrom(e);
  }
  /**
   * JSON schema for rule options.
   *
   * Rules should override this to return an object with JSON schema to validate
   * rule options. If `null` or `undefined` is returned no validation is
   * performed.
   */
  static schema() {
    return null;
  }
  report(...e) {
    const { node: t, message: n, location: s, context: i } = cp(e), a = this.isEnabled(t), o = this.isBlocked(t), u = this.findLocation({ node: t, location: s, event: this.event });
    if (this.parser.trigger("rule:error", {
      location: u,
      ruleId: this.name,
      enabled: a,
      blockers: this.getBlockers(t)
    }), a && !o) {
      const l = hl(n, i ?? {});
      this.reporter.add(this, l, this.severity, t, u, i);
    }
  }
  findLocation(e) {
    var t, n;
    return e.location ? e.location : (t = e.event) != null && t.location ? e.event.location : (n = e.node) != null && n.location ? e.node.location : {};
  }
  on(e, ...t) {
    const n = t.pop(), s = t.pop() ?? (() => !0);
    return this.parser.on(e, (i, a) => {
      this.isEnabled() && s(a) && (this.event = a, n(a));
    });
  }
  /**
   * Called by [[Engine]] when initializing the rule.
   *
   * Do not override this, use the `setup` callback instead.
   *
   * @internal
   */
  init(e, t, n, s) {
    this.parser = e, this.reporter = t, this.severity = n, this.meta = s;
  }
  /**
   * Validate rule options against schema. Throws error if object does not validate.
   *
   * For rules without schema this function does nothing.
   *
   * @throws {@link SchemaValidationError}
   * Thrown when provided options does not validate against rule schema.
   *
   * @param cls - Rule class (constructor)
   * @param ruleId - Rule identifier
   * @param jsonPath - JSON path from which [[options]] can be found in [[config]]
   * @param options - User configured options to be validated
   * @param filename - Filename from which options originated
   * @param config - Configuration from which options originated
   *
   * @internal
   */
  static validateOptions(e, t, n, s, i, a) {
    if (!e)
      return;
    const o = e.schema();
    if (!o)
      return;
    const u = up(t, o);
    if (!u(s)) {
      const c = (u.errors ?? []).map((g) => (g.instancePath = `${n}${g.instancePath}`, g));
      throw new Vr(i, "Rule configuration error", a, o, c);
    }
  }
  /**
   * Rule documentation callback.
   *
   * Called when requesting additional documentation for a rule. Some rules
   * provide additional context to provide context-aware suggestions.
   *
   * @public
   * @virtual
   * @param context - Error context given by a reported error.
   * @returns Rule documentation and url with additional details or `null` if no
   * additional documentation is available.
   */
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars -- technical debt, prototype should be moved to interface */
  documentation(e) {
    return null;
  }
}
const dp = {
  allowExternal: !0,
  allowRelative: !0,
  allowAbsolute: !0,
  allowBase: !0
}, fp = {
  a: "href",
  img: "src",
  link: "href",
  script: "src"
}, hp = {
  external: "External links are not allowed by current configuration.",
  "relative-base": "Links relative to <base> are not allowed by current configuration.",
  "relative-path": "Relative links are not allowed by current configuration.",
  absolute: "Absolute links are not allowed by current configuration.",
  anchor: null
};
function Ds(r) {
  return typeof r == "boolean" ? r : {
    /* eslint-disable security/detect-non-literal-regexp -- expected to be regexp  */
    include: r.include ? r.include.map((e) => new RegExp(e)) : null,
    exclude: r.exclude ? r.exclude.map((e) => new RegExp(e)) : null
    /* eslint-enable security/detect-non-literal-regexp */
  };
}
function ws(r, e) {
  var t;
  return !(e.include && !e.include.some((n) => n.test(r)) || (t = e.exclude) != null && t.some((n) => n.test(r)));
}
class mp extends B {
  constructor(t) {
    super({ ...dp, ...t });
    k(this, "allowExternal");
    k(this, "allowRelative");
    k(this, "allowAbsolute");
    this.allowExternal = Ds(this.options.allowExternal), this.allowRelative = Ds(this.options.allowRelative), this.allowAbsolute = Ds(this.options.allowAbsolute);
  }
  static schema() {
    const t = {
      anyOf: [
        { type: "boolean" },
        {
          type: "object",
          properties: {
            include: {
              type: "array",
              items: { type: "string" }
            },
            exclude: {
              type: "array",
              items: { type: "string" }
            }
          }
        }
      ]
    };
    return {
      allowExternal: { ...t },
      allowRelative: { ...t },
      allowAbsolute: { ...t },
      allowBase: { type: "boolean" }
    };
  }
  documentation(t) {
    return {
      description: hp[t] ?? "This link type is not allowed by current configuration",
      url: "https://html-validate.org/rules/allowed-links.html"
    };
  }
  setup() {
    this.on("attr", (t) => {
      if (!t.value || !this.isRelevant(t))
        return;
      const n = t.value.toString(), s = this.getStyle(n);
      switch (s) {
        case "anchor":
          break;
        case "absolute":
          this.handleAbsolute(n, t, s);
          break;
        case "external":
          this.handleExternal(n, t, s);
          break;
        case "relative-base":
          this.handleRelativeBase(n, t, s);
          break;
        case "relative-path":
          this.handleRelativePath(n, t, s);
          break;
      }
    });
  }
  isRelevant(t) {
    const { target: n, key: s, value: i } = t;
    if (i instanceof ue)
      return !1;
    const a = fp[n.tagName];
    return !!(a && a === s);
  }
  getStyle(t) {
    if (t.match(/^([a-z]+:)?\/\//g))
      return "external";
    switch (t[0]) {
      /* /foo/bar */
      case "/":
        return "absolute";
      /* ../foo/bar */
      case ".":
        return "relative-path";
      /* #foo */
      case "#":
        return "anchor";
      /* foo/bar */
      default:
        return "relative-base";
    }
  }
  handleAbsolute(t, n, s) {
    const { allowAbsolute: i } = this;
    i !== !0 && (i === !1 ? this.report(
      n.target,
      "Link destination must not be absolute url",
      n.valueLocation,
      s
    ) : ws(t, i) || this.report(
      n.target,
      "Absolute link to this destination is not allowed by current configuration",
      n.valueLocation,
      s
    ));
  }
  handleExternal(t, n, s) {
    const { allowExternal: i } = this;
    i !== !0 && (i === !1 ? this.report(
      n.target,
      "Link destination must not be external url",
      n.valueLocation,
      s
    ) : ws(t, i) || this.report(
      n.target,
      "External link to this destination is not allowed by current configuration",
      n.valueLocation,
      s
    ));
  }
  handleRelativePath(t, n, s) {
    const { allowRelative: i } = this;
    return i === !0 ? !1 : i === !1 ? (this.report(
      n.target,
      "Link destination must not be relative url",
      n.valueLocation,
      s
    ), !0) : ws(t, i) ? !1 : (this.report(
      n.target,
      "Relative link to this destination is not allowed by current configuration",
      n.valueLocation,
      s
    ), !0);
  }
  handleRelativeBase(t, n, s) {
    const { allowBase: i } = this.options;
    this.handleRelativePath(t, n, s) || i || this.report(
      n.target,
      "Relative links must be relative to current folder",
      n.valueLocation,
      s
    );
  }
}
const pp = {
  accessible: !0
};
function gp(r, e) {
  return e.filter((t) => t.getAttributeValue("href") === r);
}
function Yo(r) {
  return r.getAttributeValue("alt");
}
function yp(r) {
  switch (r) {
    case "missing-alt":
      return [
        "The `alt` attribute must be set (and not empty) when the `href` attribute is present on an `<area>` element.",
        "",
        "The attribute is used to provide an alternative text description for the area of the image map.",
        "The text should describe the purpose of area and the resource referenced by the `href` attribute.",
        "",
        "Either add the `alt` attribute or remove the `href` attribute."
      ];
    case "missing-href":
      return [
        "The `alt` attribute must not be set when the `href` attribute is missing on an `<area>` element.",
        "",
        "Either add the `href` attribute or remove the `alt` attribute."
      ];
  }
}
class bp extends B {
  constructor(e) {
    super({ ...pp, ...e });
  }
  static schema() {
    return {
      accessible: {
        type: "boolean"
      }
    };
  }
  documentation(e) {
    return {
      description: yp(e).join(`
`),
      url: "https://html-validate.org/rules/area-alt.html"
    };
  }
  setup() {
    this.on("element:ready", this.isRelevant, (e) => {
      const { target: t } = e, n = t.querySelectorAll("area");
      for (const s of n)
        this.validateArea(s, n);
    });
  }
  validateArea(e, t) {
    const { accessible: n } = this.options, s = e.getAttribute("href"), i = e.getAttribute("alt");
    if (s) {
      if (Yh(i))
        return;
      const a = e.getAttributeValue("href");
      (n ? [Yo(e)] : gp(a, t).map(Yo)).some(Boolean) || this.report({
        node: e,
        message: '"alt" attribute must be set and non-empty when the "href" attribute is present',
        location: i ? i.keyLocation : s.keyLocation,
        context: "missing-alt"
        /* MISSING_ALT */
      });
    } else i && this.report({
      node: e,
      message: '"alt" attribute cannot be used unless the "href" attribute is present',
      location: i.keyLocation,
      context: "missing-href"
      /* MISSING_HREF */
    });
  }
  isRelevant(e) {
    const { target: t } = e;
    return t.is("map");
  }
}
class Ep extends B {
  documentation() {
    return {
      description: "`aria-hidden` must not be used on the `<body>` element as it makes the page inaccessible to assistive technology such as screenreaders",
      url: "https://html-validate.org/rules/aria-hidden-body.html"
    };
  }
  setup() {
    this.on("tag:ready", this.isRelevant, (e) => {
      const { target: t } = e, n = t.getAttribute("aria-hidden");
      n != null && n.valueMatches("true", !0) && this.report(t, "aria-hidden must not be used on <body>", n.keyLocation);
    });
  }
  isRelevant(e) {
    return e.target.is("body");
  }
}
const vp = {
  allowAnyNamable: !1
}, Dp = [
  "main",
  "nav",
  "table",
  "td",
  "th",
  "aside",
  "header",
  "footer",
  "section",
  "article",
  "form",
  "img",
  "area",
  "fieldset",
  "summary",
  "figure"
];
function wp(r, e) {
  return !!(e.attributes["aria-label"] || Dp.includes(r.tagName) || r.hasAttribute("role") || r.hasAttribute("tabindex") || e.interactive || e.labelable);
}
class Ap extends B {
  constructor(e) {
    super({ ...vp, ...e });
  }
  documentation() {
    return {
      description: `\`aria-label\` can only be used on:

${[
        "Interactive elements",
        "Labelable elements",
        "Landmark elements",
        "Elements with roles inheriting from widget",
        "`<area>`",
        "`<form>` and `<fieldset>`",
        "`<iframe>`",
        "`<img>` and `<figure>`",
        "`<summary>`",
        "`<table>`, `<td>` and `<th>`"
      ].map((n) => `- ${n}
`).join("")}`,
      url: "https://html-validate.org/rules/aria-label-misuse.html"
    };
  }
  setup() {
    this.on("dom:ready", (e) => {
      const { document: t } = e;
      for (const n of t.querySelectorAll("[aria-label]"))
        this.validateElement(n);
    });
  }
  validateElement(e) {
    const t = e.getAttribute("aria-label");
    if (!t.value || t.valueMatches("", !1))
      return;
    const n = e.meta;
    n && (wp(e, n) || this.options.allowAnyNamable && Gm(e) === "allowed" || this.report(e, '"aria-label" cannot be used on this element', t.keyLocation));
  }
}
class he extends le {
  constructor(e, t) {
    super(e, t), Error.captureStackTrace(this, he), this.name = he.name;
  }
}
class gl {
  /**
   * @param style - Name of a valid case style.
   */
  constructor(e, t) {
    k(this, "styles");
    if (Array.isArray(e) || (e = [e]), e.length === 0)
      throw new he(`Missing style for ${t} rule`);
    this.styles = this.parseStyle(e, t);
  }
  /**
   * Test if a text matches this case style.
   */
  match(e) {
    return this.styles.some((t) => e.match(t.pattern));
  }
  get name() {
    const e = this.styles.map((t) => t.name);
    switch (this.styles.length) {
      case 1:
        return e[0];
      case 2:
        return e.join(" or ");
      default: {
        const t = e.slice(-1);
        return `${e.slice(0, -1).join(", ")} or ${t[0]}`;
      }
    }
  }
  parseStyle(e, t) {
    return e.map((n) => {
      switch (n.toLowerCase()) {
        case "lowercase":
          return { pattern: /^[a-z]*$/, name: "lowercase" };
        case "uppercase":
          return { pattern: /^[A-Z]*$/, name: "uppercase" };
        case "pascalcase":
          return { pattern: /^[A-Z][A-Za-z]*$/, name: "PascalCase" };
        case "camelcase":
          return { pattern: /^[a-z][A-Za-z]*$/, name: "camelCase" };
        default:
          throw new he(`Invalid style "${n}" for ${t} rule`);
      }
    });
  }
}
const Cp = {
  style: "lowercase",
  ignoreForeign: !0
};
class $p extends B {
  constructor(t) {
    super({ ...Cp, ...t });
    k(this, "style");
    this.style = new gl(this.options.style, "attr-case");
  }
  static schema() {
    const t = ["lowercase", "uppercase", "pascalcase", "camelcase"];
    return {
      ignoreForeign: {
        type: "boolean"
      },
      style: {
        anyOf: [
          {
            enum: t,
            type: "string"
          },
          {
            items: {
              enum: t,
              type: "string"
            },
            type: "array"
          }
        ]
      }
    };
  }
  documentation() {
    const { style: t } = this.options;
    return {
      description: Array.isArray(t) ? ["Attribute name must be in one of:", "", ...t.map((n) => `- ${n}`)].join(`
`) : `Attribute name must be in ${t}.`,
      url: "https://html-validate.org/rules/attr-case.html"
    };
  }
  setup() {
    this.on("attr", (t) => {
      if (this.isIgnored(t.target) || t.originalAttribute)
        return;
      const n = t.key.replace(/[^a-z]+/gi, "");
      this.style.match(n) || this.report({
        node: t.target,
        message: `Attribute "${t.key}" should be ${this.style.name}`,
        location: t.keyLocation
      });
    });
  }
  isIgnored(t) {
    var n;
    return this.options.ignoreForeign ? !!((n = t.meta) != null && n.foreign) : !1;
  }
}
var Y = /* @__PURE__ */ ((r) => (r[r.UNICODE_BOM = 1] = "UNICODE_BOM", r[r.WHITESPACE = 2] = "WHITESPACE", r[r.DOCTYPE_OPEN = 3] = "DOCTYPE_OPEN", r[r.DOCTYPE_VALUE = 4] = "DOCTYPE_VALUE", r[r.DOCTYPE_CLOSE = 5] = "DOCTYPE_CLOSE", r[r.TAG_OPEN = 6] = "TAG_OPEN", r[r.TAG_CLOSE = 7] = "TAG_CLOSE", r[r.ATTR_NAME = 8] = "ATTR_NAME", r[r.ATTR_VALUE = 9] = "ATTR_VALUE", r[r.TEXT = 10] = "TEXT", r[r.TEMPLATING = 11] = "TEMPLATING", r[r.SCRIPT = 12] = "SCRIPT", r[r.STYLE = 13] = "STYLE", r[r.COMMENT = 14] = "COMMENT", r[r.CONDITIONAL = 15] = "CONDITIONAL", r[r.DIRECTIVE = 16] = "DIRECTIVE", r[r.EOF = 17] = "EOF", r))(Y || {});
const _p = /^\uFEFF/, Pr = /^(?:\r\n|\r|\n|[ \t]+(?:\r\n|\r|\n)?)/, Sp = /^<!(DOCTYPE)\s/i, Rp = /^[^>]+/, Tp = /^>/, Np = /^<\?xml.*?\?>\s+/, Fp = /^<(\/?)([a-zA-Z0-9\-_:]+)/, Pp = /^\/?>/, Ip = /^[^]*?(?=(?:[ \t]*(?:\r\n|\r|\n)|<[^ ]|$))/, Op = /^(?:<%.*?%>|<\?.*?\?>|<\$.*?\$>)/s, kp = /^[^]*?(?=<|$)/, qp = /^([^\t\r\n\f \/><"'=]+)/, xp = /^(\s*=\s*)'([^']*?)(')/, Lp = /^(\s*=\s*)"([^"]*?)(")/, Bp = /^(\s*=\s*)([^\t\r\n\f "'<>][^\t\r\n\f <>]*)/, jp = /^<!\[CDATA\[/, Mp = /^[^]*?]]>/, Up = /^[^]*?(?=<\/script)/, Vp = /^<(\/)(script)/, Hp = /^[^]*?(?=<\/style)/, Gp = /^<(\/)(style)/, Jo = /^(<!--\s*\[html-validate-)([a-z0-9-]+)(\s*)(.*?)(]?\s*-->)/, Qo = /^<!--([^]*?)-->/, Zo = /^<!\[([^\]]*?)\]>/;
class qr extends Error {
  constructor(t, n) {
    super(n);
    k(this, "location");
    this.location = t;
  }
}
class yl {
  /* eslint-disable-next-line complexity -- there isn't really a good way to refactor this while keeping readability */
  *tokenize(e) {
    const t = new em(e);
    let n = t.state, s = t.string.length;
    for (; t.string.length > 0; ) {
      switch (t.state) {
        case Q.INITIAL:
          yield* this.tokenizeInitial(t);
          break;
        case Q.DOCTYPE:
          yield* this.tokenizeDoctype(t);
          break;
        case Q.TAG:
          yield* this.tokenizeTag(t);
          break;
        case Q.ATTR:
          yield* this.tokenizeAttr(t);
          break;
        case Q.TEXT:
          yield* this.tokenizeText(t);
          break;
        case Q.CDATA:
          yield* this.tokenizeCDATA(t);
          break;
        case Q.SCRIPT:
          yield* this.tokenizeScript(t);
          break;
        case Q.STYLE:
          yield* this.tokenizeStyle(t);
          break;
        /* istanbul ignore next: sanity check: should not happen unless adding new states */
        default:
          this.unhandled(t);
      }
      t.state === n && t.string.length === s && this.errorStuck(t), n = t.state, s = t.string.length;
    }
    yield this.token(t, Y.EOF, []);
  }
  token(e, t, n) {
    const s = n.length > 0 ? n[0].length : 0, i = e.getLocation(s);
    return {
      type: t,
      location: i,
      data: Array.from(n)
    };
  }
  /* istanbul ignore next: used to provide a better error when an unhandled state happens */
  unhandled(e) {
    const t = JSON.stringify(
      e.string.length > 13 ? `${e.string.slice(0, 15)}...` : e.string
    ), n = Q[e.state], s = `failed to tokenize ${t}, unhandled state ${n}.`;
    throw new qr(e.getLocation(1), s);
  }
  /* istanbul ignore next: used to provide a better error when lexer is detected to be stuck, no known way to reproduce */
  errorStuck(e) {
    const t = Q[e.state], n = `failed to tokenize ${e.getTruncatedLine()}, state ${t} failed to consume data or change state.`;
    throw new qr(e.getLocation(1), n);
  }
  evalNextState(e, t) {
    return typeof e == "function" ? e(t) : e;
  }
  *match(e, t, n) {
    const s = t.length;
    for (let a = 0; a < s; a++) {
      const [o, u, l] = t[a], c = o ? e.string.match(o) : [""];
      if (c) {
        let g = null;
        l !== !1 && (g = this.token(e, l, c), yield g);
        const v = this.evalNextState(u, g);
        e.consume(c, v), this.enter(e, v, c);
        return;
      }
    }
    const i = `failed to tokenize ${e.getTruncatedLine()}, ${n}.`;
    throw new qr(e.getLocation(1), i);
  }
  /**
   * Called when entering a new state.
   */
  enter(e, t, n) {
    t === Q.TAG && (n != null && n[0].startsWith("<")) && (n[0] === "<script" ? e.contentModel = at.SCRIPT : n[0] === "<style" ? e.contentModel = at.STYLE : e.contentModel = at.TEXT);
  }
  *tokenizeInitial(e) {
    yield* this.match(
      e,
      [
        [_p, Q.INITIAL, Y.UNICODE_BOM],
        [Np, Q.INITIAL, !1],
        [Sp, Q.DOCTYPE, Y.DOCTYPE_OPEN],
        [Pr, Q.INITIAL, Y.WHITESPACE],
        [Jo, Q.INITIAL, Y.DIRECTIVE],
        [Zo, Q.INITIAL, Y.CONDITIONAL],
        [Qo, Q.INITIAL, Y.COMMENT],
        [!1, Q.TEXT, !1]
      ],
      "expected doctype"
    );
  }
  *tokenizeDoctype(e) {
    yield* this.match(
      e,
      [
        [Pr, Q.DOCTYPE, Y.WHITESPACE],
        [Rp, Q.DOCTYPE, Y.DOCTYPE_VALUE],
        [Tp, Q.TEXT, Y.DOCTYPE_CLOSE]
      ],
      "expected doctype name"
    );
  }
  *tokenizeTag(e) {
    function t(n) {
      const s = n;
      switch (e.contentModel) {
        case at.TEXT:
          return Q.TEXT;
        case at.SCRIPT:
          return s && !s.data[0].startsWith("/") ? Q.SCRIPT : Q.TEXT;
        case at.STYLE:
          return s && !s.data[0].startsWith("/") ? Q.STYLE : Q.TEXT;
      }
    }
    yield* this.match(
      e,
      [
        [Pp, t, Y.TAG_CLOSE],
        [qp, Q.ATTR, Y.ATTR_NAME],
        [Pr, Q.TAG, Y.WHITESPACE]
      ],
      'expected attribute, ">" or "/>"'
    );
  }
  *tokenizeAttr(e) {
    yield* this.match(
      e,
      [
        [xp, Q.TAG, Y.ATTR_VALUE],
        [Lp, Q.TAG, Y.ATTR_VALUE],
        [Bp, Q.TAG, Y.ATTR_VALUE],
        [!1, Q.TAG, !1]
      ],
      'expected attribute, ">" or "/>"'
    );
  }
  *tokenizeText(e) {
    yield* this.match(
      e,
      [
        [Pr, Q.TEXT, Y.WHITESPACE],
        [jp, Q.CDATA, !1],
        [Jo, Q.TEXT, Y.DIRECTIVE],
        [Zo, Q.TEXT, Y.CONDITIONAL],
        [Qo, Q.TEXT, Y.COMMENT],
        [Op, Q.TEXT, Y.TEMPLATING],
        [Fp, Q.TAG, Y.TAG_OPEN],
        [Ip, Q.TEXT, Y.TEXT],
        [kp, Q.TEXT, Y.TEXT]
      ],
      'expected text or "<"'
    );
  }
  *tokenizeCDATA(e) {
    yield* this.match(e, [[Mp, Q.TEXT, !1]], "expected ]]>");
  }
  *tokenizeScript(e) {
    yield* this.match(
      e,
      [
        [Vp, Q.TAG, Y.TAG_OPEN],
        [Up, Q.SCRIPT, Y.SCRIPT]
      ],
      "expected <\/script>"
    );
  }
  *tokenizeStyle(e) {
    yield* this.match(
      e,
      [
        [Gp, Q.TAG, Y.TAG_OPEN],
        [Hp, Q.STYLE, Y.STYLE]
      ],
      "expected </style>"
    );
  }
}
const zp = /(\s+)/;
class Kp extends B {
  documentation() {
    return {
      description: "Attribute value must not be separated by whitespace.",
      url: "https://html-validate.org/rules/attr-delimiter.html"
    };
  }
  setup() {
    this.on("token", (e) => {
      const { token: t } = e;
      if (t.type !== Y.ATTR_VALUE)
        return;
      const n = t.data[1];
      if (zp.exec(n)) {
        const i = fe(e.location, 0, n.length);
        this.report(null, "Attribute value must not be delimited by whitespace", i);
      }
    });
  }
}
const Wp = "[a-z0-9-:]+", Xp = {
  pattern: Wp,
  ignoreForeign: !0
};
function Yp(r) {
  return Array.isArray(r) ? new RegExp(`^(${r.join("|")})$`, "i") : new RegExp(`^${r}$`, "i");
}
function Jp(r, e) {
  if (Array.isArray(e)) {
    const t = e.map((n) => `/${n}/`).join(", ");
    return `Attribute "${r}" should match one of [${t}]`;
  } else
    return `Attribute "${r}" should match /${e}/`;
}
function Qp(r, e) {
  return Array.isArray(e) ? [
    `Attribute "${r}" should match one of the configured regular expressions:`,
    "",
    ...e.map((t) => `- \`/${t}/\``)
  ].join(`
`) : `Attribute "${r}" should match the regular expression \`/${e}/\``;
}
class Zp extends B {
  constructor(t) {
    super({ ...Xp, ...t });
    k(this, "pattern");
    this.pattern = Yp(this.options.pattern);
  }
  static schema() {
    return {
      pattern: {
        oneOf: [{ type: "array", items: { type: "string" }, minItems: 1 }, { type: "string" }]
      },
      ignoreForeign: {
        type: "boolean"
      }
    };
  }
  documentation(t) {
    return {
      description: Qp(t.attr, t.pattern),
      url: "https://html-validate.org/rules/attr-pattern.html"
    };
  }
  setup() {
    this.on("attr", (t) => {
      if (this.isIgnored(t.target) || t.originalAttribute || this.pattern.test(t.key))
        return;
      const n = Jp(t.key, this.options.pattern), s = {
        attr: t.key,
        pattern: this.options.pattern
      };
      this.report(t.target, n, t.keyLocation, s);
    });
  }
  isIgnored(t) {
    var n;
    return this.options.ignoreForeign ? !!((n = t.meta) != null && n.foreign) : !1;
  }
}
const eg = {
  style: "auto",
  unquoted: !1
};
function tg(r) {
  switch (r.error) {
    case "style":
      return `Attribute \`${r.attr}\` must use \`${r.expected}\` instead of \`${r.actual}\`.`;
    case "unquoted":
      return `Attribute \`${r.attr}\` must not be unquoted.`;
  }
}
function rg(r, e) {
  const t = [];
  switch (r) {
    case "auto":
      t.push(
        "- quoted with double quotes `\"` unless the value contains double quotes in which case single quotes `'` should be used instead"
      );
      break;
    case "any":
      t.push("- quoted with single quotes `'`"), t.push('- quoted with double quotes `"`');
      break;
    case "'":
    case '"': {
      const n = r === "'" ? "single" : "double";
      t.push(`- quoted with ${n} quotes \`${r}\``);
      break;
    }
  }
  return e && t.push("- unquoted (if applicable)"), `${t.join(` or
`)}
`;
}
class ng extends B {
  constructor(t) {
    super({ ...eg, ...t });
    k(this, "style");
    this.style = sg(this.options.style);
  }
  static schema() {
    return {
      style: {
        enum: ["auto", "double", "single", "any"],
        type: "string"
      },
      unquoted: {
        type: "boolean"
      }
    };
  }
  documentation(t) {
    const { style: n } = this, { unquoted: s } = this.options;
    return {
      description: [
        tg(t),
        "",
        "Under the current configuration attributes must be:",
        "",
        rg(n, s)
      ].join(`
`),
      url: "https://html-validate.org/rules/attr-quotes.html"
    };
  }
  setup() {
    this.on("attr", (t) => {
      if (t.originalAttribute || t.value === null)
        return;
      if (!t.quote) {
        if (!this.options.unquoted) {
          const s = `Attribute "${t.key}" using unquoted value`, i = {
            error: "unquoted",
            attr: t.key
          };
          this.report(t.target, s, null, i);
        }
        return;
      }
      if (this.style === "any")
        return;
      const n = this.resolveQuotemark(t.value.toString(), this.style);
      if (t.quote !== n) {
        const s = `Attribute "${t.key}" used ${t.quote} instead of expected ${n}`, i = {
          error: "style",
          attr: t.key,
          actual: t.quote,
          expected: n
        };
        this.report(t.target, s, null, i);
      }
    });
  }
  resolveQuotemark(t, n) {
    return n === "auto" ? t.includes('"') ? "'" : '"' : n;
  }
}
function sg(r) {
  switch (r.toLowerCase()) {
    case "auto":
      return "auto";
    case "double":
      return '"';
    case "single":
      return "'";
    case "any":
      return "any";
    /* istanbul ignore next: covered by schema validation */
    default:
      throw new he(`Invalid style "${r}" for "attr-quotes" rule`);
  }
}
class ig extends B {
  documentation() {
    return {
      description: "No space between attributes. At least one whitespace character (commonly space) must be used to separate attributes.",
      url: "https://html-validate.org/rules/attr-spacing.html"
    };
  }
  setup() {
    let e;
    this.on("token", (t) => {
      t.type === Y.ATTR_NAME && e !== Y.WHITESPACE && this.report(null, "No space between attributes", t.location), e = t.type;
    });
  }
}
function ag(r) {
  const e = {};
  return typeof r.enum < "u" && (e.enum = r.enum), typeof r.boolean < "u" && (e.boolean = r.boolean), e;
}
class og extends B {
  documentation(e) {
    const t = {
      description: "Attribute has invalid value.",
      url: "https://html-validate.org/rules/attribute-allowed-values.html"
    };
    if (!e)
      return t;
    const { allowed: n, attribute: s, element: i, value: a } = e;
    if (n.enum) {
      const o = n.enum.map((u) => typeof u == "string" ? `- \`"${u}"\`` : `- \`${u.toString()}\``);
      t.description = [
        `The \`<${i}>\` element does not allow the attribute \`${s}\` to have the value \`"${a}"\`.`,
        "",
        "It must match one of the following:",
        "",
        ...o
      ].join(`
`);
    } else n.boolean && (t.description = `The \`<${e.element}>\` attribute \`${e.attribute}\` must be a boolean attribute, e.g. \`<${e.element} ${e.attribute}>\``);
    return t;
  }
  setup() {
    this.on("dom:ready", (e) => {
      const t = e.document;
      Oe.depthFirst(t, (n) => {
        const s = n.meta;
        if (s != null && s.attributes)
          for (const i of n.attributes) {
            if (ce.validateAttribute(i, s.attributes))
              continue;
            const a = i.value ? i.value.toString() : "", o = {
              element: n.tagName,
              attribute: i.key,
              value: a,
              allowed: ag(s.attributes[i.key])
            }, u = this.getMessage(i), l = this.getLocation(i);
            this.report(n, u, l, o);
          }
      });
    });
  }
  getMessage(e) {
    const { key: t, value: n } = e;
    return n !== null ? `Attribute "${t}" has invalid value "${n.toString()}"` : `Attribute "${t}" is missing value`;
  }
  getLocation(e) {
    return e.valueLocation ?? e.keyLocation;
  }
}
const ug = {
  style: "omit"
};
class lg extends B {
  constructor(t) {
    super({ ...ug, ...t });
    k(this, "hasInvalidStyle");
    this.hasInvalidStyle = cg(this.options.style);
  }
  static schema() {
    return {
      style: {
        enum: ["empty", "name", "omit"],
        type: "string"
      }
    };
  }
  documentation() {
    return {
      description: "Require a specific style when writing boolean attributes.",
      url: "https://html-validate.org/rules/attribute-boolean-style.html"
    };
  }
  setup() {
    this.on("dom:ready", (t) => {
      const n = t.document;
      Oe.depthFirst(n, (s) => {
        const i = s.meta;
        if (i != null && i.attributes)
          for (const a of s.attributes)
            this.isBoolean(a, i.attributes) && (a.originalAttribute || this.hasInvalidStyle(a) && this.report(s, dg(a, this.options.style), a.keyLocation));
      });
    });
  }
  isBoolean(t, n) {
    const s = n[t.key];
    return !!(s != null && s.boolean);
  }
}
function cg(r) {
  switch (r.toLowerCase()) {
    case "omit":
      return (e) => e.value !== null;
    case "empty":
      return (e) => e.value !== "";
    case "name":
      return (e) => e.value !== e.key;
    /* istanbul ignore next: covered by schema validation */
    default:
      throw new Error(`Invalid style "${r}" for "attribute-boolean-style" rule`);
  }
}
function dg(r, e) {
  const t = r.key;
  switch (e.toLowerCase()) {
    case "omit":
      return `Attribute "${t}" should omit value`;
    case "empty":
      return `Attribute "${t}" value should be empty string`;
    case "name":
      return `Attribute "${t}" should be set to ${t}="${t}"`;
  }
  return "";
}
const fg = {
  style: "omit"
};
class hg extends B {
  constructor(t) {
    super({ ...fg, ...t });
    k(this, "hasInvalidStyle");
    this.hasInvalidStyle = gg(this.options.style);
  }
  static schema() {
    return {
      style: {
        enum: ["empty", "omit"],
        type: "string"
      }
    };
  }
  documentation() {
    return {
      description: "Require a specific style for attributes with empty values.",
      url: "https://html-validate.org/rules/attribute-empty-style.html"
    };
  }
  setup() {
    this.on("dom:ready", (t) => {
      const n = t.document;
      Oe.depthFirst(n, (s) => {
        const i = s.meta;
        if (i != null && i.attributes)
          for (const a of s.attributes)
            mg(a, i.attributes) && pg(a) && this.hasInvalidStyle(a) && this.report(s, yg(a, this.options.style), a.keyLocation);
      });
    });
  }
}
function mg(r, e) {
  const t = e[r.key];
  return !!(t != null && t.omit);
}
function pg(r) {
  return r.isDynamic ? !1 : r.value === null || r.value === "";
}
function gg(r) {
  switch (r.toLowerCase()) {
    case "omit":
      return (e) => e.value !== null;
    case "empty":
      return (e) => e.value !== "";
    /* istanbul ignore next: covered by schema validation */
    default:
      throw new Error(`Invalid style "${r}" for "attribute-empty-style" rule`);
  }
}
function yg(r, e) {
  const t = r.key;
  switch (e.toLowerCase()) {
    case "omit":
      return `Attribute "${t}" should omit value`;
    case "empty":
      return `Attribute "${t}" value should be empty string`;
  }
  return "";
}
function bg(r) {
  const { tagName: e, attr: t, details: n } = r;
  return `The \`${t}\` attribute cannot be used on \`${e}\` in this context: ${n}`;
}
class Eg extends B {
  documentation(e) {
    return {
      description: bg(e),
      url: "https://html-validate.org/rules/attribute-misuse.html"
    };
  }
  setup() {
    this.on("element:ready", (e) => {
      const { target: t } = e, { meta: n } = t;
      if (n)
        for (const s of t.attributes) {
          const i = s.key.toLowerCase();
          this.validateAttr(t, s, n.attributes[i]);
        }
    });
  }
  validateAttr(e, t, n) {
    if (!(n != null && n.allowed))
      return;
    const s = n.allowed(e._adapter, t.value);
    s && this.report({
      node: e,
      message: '"{{ attr }}" attribute cannot be used on {{ tagName }} in this context: {{ details }}',
      location: t.keyLocation,
      context: {
        tagName: e.annotatedName,
        attr: t.key,
        details: s
      }
    });
  }
}
function vg(r) {
  switch (r) {
    case "kebabcase":
      return { regexp: /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/, description: r };
    case "camelcase":
      return { regexp: /^[a-z][a-zA-Z0-9]*$/, description: r };
    case "snakecase":
    case "underscore":
      return { regexp: /^[a-z][a-z0-9]*(?:_[a-z0-9]+)*$/, description: r };
    case "bem": {
      const e = "[a-z][a-z0-9]*(?:-[a-z0-9]+)*", t = "(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?", n = "(?:--[a-z0-9]+(?:-[a-z0-9]+)*){0,2}";
      return {
        regexp: new RegExp(`^${e}${t}${n}$`),
        description: r
      };
    }
    default: {
      const e = new RegExp(r);
      return { regexp: e, description: e.toString() };
    }
  }
}
function Dg(r) {
  return Array.isArray(r) ? r : [r];
}
class wt extends B {
  /**
   * @param attr - Attribute holding the value.
   * @param options - Rule options with defaults expanded.
   */
  constructor(t, n) {
    super(n);
    /** Attribute being tested */
    k(this, "attr");
    /** Parsed configured patterns */
    k(this, "patterns");
    const { pattern: s } = this.options;
    this.attr = t, this.patterns = Dg(s).map((i) => vg(i));
  }
  static schema() {
    return {
      pattern: {
        oneOf: [{ type: "array", items: { type: "string" }, minItems: 1 }, { type: "string" }]
      }
    };
  }
  description(t) {
    const { attr: n, patterns: s } = this, { value: i } = t;
    return [
      s.length === 1 ? `The \`${n}\` attribute value \`"${i}"\` does not match the configured pattern.` : `The \`${n}\` attribute value \`"${i}"\` does not match either of the configured patterns.`,
      "For consistency within the codebase the `${attr}` is required to match one or more of the following patterns:",
      "",
      ...s.map((o) => `- \`${o.description}\``)
    ].join(`
`);
  }
  validateValue(t, n, s) {
    const { attr: i, patterns: a } = this;
    if (a.some((c) => c.regexp.test(n)))
      return;
    const u = We(a.map((c) => `"${c.description}"`)), l = a.length === 1 ? `${i} "${n}" does not match the configured pattern ${u}` : `${i} "${n}" does not match either of the configured patterns: ${u}`;
    this.report({
      node: t,
      message: l,
      location: s,
      context: {
        value: n
      }
    });
  }
}
const wg = {
  pattern: "kebabcase"
};
class Ag extends wt {
  constructor(e) {
    super("class", { ...wg, ...e });
  }
  static schema() {
    return wt.schema();
  }
  documentation(e) {
    return {
      description: this.description(e),
      url: "https://html-validate.org/rules/class-pattern.html"
    };
  }
  setup() {
    this.on("attr", (e) => {
      const { target: t, key: n, value: s, valueLocation: i } = e;
      if (n.toLowerCase() !== "class")
        return;
      const a = new Me(s, i);
      for (const { item: o, location: u } of a.iterator())
        this.validateValue(t, o, u);
    });
  }
}
class Cg extends B {
  documentation() {
    return {
      description: "HTML disallows end tags to have attributes.",
      url: "https://html-validate.org/rules/close-attr.html"
    };
  }
  setup() {
    this.on("tag:end", (e) => {
      if (!e.target || e.previous === e.target)
        return;
      const t = e.target;
      if (Object.keys(t.attributes).length > 0) {
        const n = t.attributes[0];
        this.report(null, "Close tags cannot have attributes", n.keyLocation);
      }
    });
  }
}
function* Bs(r) {
  if (!r)
    return;
  let e = r;
  for (; e && !e.isRootElement(); )
    yield e, e = e.parent;
  e && (yield e);
}
function $g(r, e) {
  for (const t of Bs(r))
    if (e(t))
      return t;
  return null;
}
class _g extends B {
  documentation() {
    return {
      description: "HTML requires elements to be closed in the same order as they were opened.",
      url: "https://html-validate.org/rules/close-order.html"
    };
  }
  setup() {
    let e;
    this.on("parse:begin", () => {
      e = /* @__PURE__ */ new Set();
    }), this.on("tag:end", (t) => {
      const n = t.target, s = t.previous;
      if (!n)
        for (const i of Bs(s))
          i.isRootElement() || e.has(i.unique) || (this.report(i, `Unclosed element '<${i.tagName}>'`, i.location), e.add(i.unique));
    }), this.on("tag:end", (t) => {
      const n = t.target, s = t.previous;
      if (!n || n.voidElement || s.closed === $e.ImplicitClosed)
        return;
      if (s.isRootElement()) {
        const a = {
          filename: n.location.filename,
          line: n.location.line,
          column: n.location.column,
          offset: n.location.offset,
          size: n.tagName.length + 1
        };
        this.report(null, `Stray end tag '</${n.tagName}>'`, a);
        return;
      }
      if (n.tagName === s.tagName)
        return;
      const i = $g(s.parent, (a) => a.is(n.tagName));
      if (i && !i.isRootElement()) {
        for (const a of Bs(s)) {
          if (i.isSameNode(a))
            break;
          e.has(a.unique) || (this.report(a, `Unclosed element '<${a.tagName}>'`, a.location), e.add(a.unique));
        }
        this.report(
          null,
          `End tag '</${n.tagName}>' seen but there were open elements`,
          n.location
        ), e.add(i.unique);
      } else
        this.report(null, `Stray end tag '</${n.tagName}>'`, n.location);
    });
  }
}
const Sg = {
  include: null,
  exclude: null
};
class Rg extends B {
  constructor(e) {
    super({ ...Sg, ...e });
  }
  static schema() {
    return {
      exclude: {
        anyOf: [
          {
            items: {
              type: "string"
            },
            type: "array"
          },
          {
            type: "null"
          }
        ]
      },
      include: {
        anyOf: [
          {
            items: {
              type: "string"
            },
            type: "array"
          },
          {
            type: "null"
          }
        ]
      }
    };
  }
  documentation(e) {
    const t = [];
    if (e.source) {
      const i = `The \`<$tagname>\` element is deprecated ${Tg(e.source)} and should not be used in new code.`;
      t.push(i);
    } else
      t.push("The `<$tagname>` element is deprecated and should not be used in new code.");
    return e.documentation && t.push(e.documentation), {
      description: t.map((s) => s.replace(/\$tagname/g, e.tagName)).join(`

`),
      url: "https://html-validate.org/rules/deprecated.html"
    };
  }
  setup() {
    this.on("tag:start", (e) => {
      const t = e.target;
      if (t.meta === null)
        return;
      const n = t.meta.deprecated;
      if (!n || this.isKeywordIgnored(t.tagName))
        return;
      const s = fe(e.location, 1);
      typeof n == "string" ? this.reportString(n, t, s) : typeof n == "boolean" ? this.reportBoolean(t, s) : this.reportObject(n, t, s);
    });
  }
  reportString(e, t, n) {
    const s = { tagName: t.tagName }, i = `<${t.tagName}> is deprecated: ${e}`;
    this.report(t, i, n, s);
  }
  reportBoolean(e, t) {
    const n = { tagName: e.tagName }, s = `<${e.tagName}> is deprecated`;
    this.report(e, s, t, n);
  }
  reportObject(e, t, n) {
    const s = { ...e, tagName: t.tagName }, i = e.message ? `: ${e.message}` : "", a = `<${t.tagName}> is deprecated${i}`;
    this.report(t, a, n, s);
  }
}
function Tg(r) {
  const e = r.match(/html(\d)(\d)?/);
  if (e) {
    const [, ...t] = e;
    return `in HTML ${t.filter(Boolean).join(".")}`;
  }
  switch (r) {
    case "whatwg":
      return "in HTML Living Standard";
    case "non-standard":
      return "and non-standard";
    default:
      return `by ${r}`;
  }
}
class Ng extends B {
  documentation(e) {
    return {
      description: `${e ? `The rule "${e}"` : "This rule"} is deprecated and should not be used any longer, consult documentation for further information.`,
      url: "https://html-validate.org/rules/deprecated-rule.html"
    };
  }
  setup() {
    this.on("config:ready", (e) => {
      for (const t of this.getDeprecatedRules(e))
        t.getSeverity() > Ke.DISABLED && this.report(null, `Usage of deprecated rule "${t.name}"`, null, t.name);
    });
  }
  getDeprecatedRules(e) {
    return Object.values(e.rules).filter((n) => n.deprecated);
  }
}
let Fg = class extends B {
  documentation() {
    return {
      description: [
        'HTML5 documents should use the "html" doctype (short `form`, not legacy string):',
        "",
        "```html",
        "<!DOCTYPE html>",
        "```"
      ].join(`
`),
      url: "https://html-validate.org/rules/doctype-html.html"
    };
  }
  setup() {
    this.on("doctype", (e) => {
      e.value.toLowerCase() !== "html" && this.report(null, 'doctype should be "html"', e.valueLocation);
    });
  }
};
const Pg = {
  style: "uppercase"
};
class Ig extends B {
  constructor(e) {
    super({ ...Pg, ...e });
  }
  static schema() {
    return {
      style: {
        enum: ["lowercase", "uppercase"],
        type: "string"
      }
    };
  }
  documentation(e) {
    return {
      description: `While DOCTYPE is case-insensitive in the standard the current configuration requires it to be ${e.style}`,
      url: "https://html-validate.org/rules/doctype-style.html"
    };
  }
  setup() {
    this.on("doctype", (e) => {
      this.options.style === "uppercase" && e.tag !== "DOCTYPE" && this.report(null, "DOCTYPE should be uppercase", e.location, this.options), this.options.style === "lowercase" && e.tag !== "doctype" && this.report(null, "DOCTYPE should be lowercase", e.location, this.options);
    });
  }
}
const Og = {
  style: "lowercase"
};
class kg extends B {
  constructor(t) {
    super({ ...Og, ...t });
    k(this, "style");
    this.style = new gl(this.options.style, "element-case");
  }
  static schema() {
    const t = ["lowercase", "uppercase", "pascalcase", "camelcase"];
    return {
      style: {
        anyOf: [
          {
            enum: t,
            type: "string"
          },
          {
            items: {
              enum: t,
              type: "string"
            },
            type: "array"
          }
        ]
      }
    };
  }
  documentation() {
    const { style: t } = this.options;
    return {
      description: Array.isArray(t) ? ["Element tagname must be in one of:", "", ...t.map((n) => `- ${n}`)].join(`
`) : `Element tagname must be in ${t}.`,
      url: "https://html-validate.org/rules/element-case.html"
    };
  }
  setup() {
    this.on("tag:start", (t) => {
      const { target: n, location: s } = t;
      this.validateCase(n, s);
    }), this.on("tag:end", (t) => {
      const { target: n, previous: s } = t;
      this.validateMatchingCase(s, n);
    });
  }
  validateCase(t, n) {
    const s = t.tagName.replace(/[^a-z]+/gi, "");
    if (!this.style.match(s)) {
      const i = fe(n, 1);
      this.report(t, `Element "${t.tagName}" should be ${this.style.name}`, i);
    }
  }
  validateMatchingCase(t, n) {
    !t || !n || !t.tagName || !n.tagName || t.tagName.toLowerCase() === n.tagName.toLowerCase() && t.tagName !== n.tagName && this.report(t, "Start and end tag must not differ in casing", n.location);
  }
}
const eu = {
  pattern: "^[a-z][a-z0-9\\-._]*-[a-z0-9\\-._]*$",
  whitelist: [],
  blacklist: []
};
class qg extends B {
  constructor(t) {
    super({ ...eu, ...t });
    k(this, "pattern");
    this.pattern = new RegExp(this.options.pattern);
  }
  static schema() {
    return {
      blacklist: {
        items: {
          type: "string"
        },
        type: "array"
      },
      pattern: {
        type: "string"
      },
      whitelist: {
        items: {
          type: "string"
        },
        type: "array"
      }
    };
  }
  documentation(t) {
    return {
      description: this.documentationMessages(t).join(`
`),
      url: "https://html-validate.org/rules/element-name.html"
    };
  }
  documentationMessages(t) {
    return t.blacklist.includes(t.tagName) ? [
      `<${t.tagName}> is blacklisted by the project configuration.`,
      "",
      "The following names are blacklisted:",
      ...t.blacklist.map((n) => `- ${n}`)
    ] : t.pattern !== eu.pattern ? [
      `<${t.tagName}> is not a valid element name. This project is configured to only allow names matching the following regular expression:`,
      "",
      `- \`${t.pattern}\``
    ] : [
      `<${t.tagName}> is not a valid element name. If this is a custom element HTML requires the name to follow these rules:`,
      "",
      "- The name must begin with `a-z`",
      "- The name must include a hyphen `-`",
      "- It may include alphanumerical characters `a-z0-9` or hyphens `-`, dots `.` or underscores `_`."
    ];
  }
  setup() {
    const t = /^(.+):.+$/;
    this.on("tag:start", (n) => {
      const s = n.target, i = s.tagName, a = fe(n.location, 1), o = {
        tagName: i,
        pattern: this.options.pattern,
        blacklist: this.options.blacklist
      };
      this.options.blacklist.includes(i) && this.report(s, `<${i}> element is blacklisted`, a, o), !s.meta && (i.match(t) || this.options.whitelist.includes(i) || i.match(this.pattern) || this.report(s, `<${i}> is not a valid element name`, a, o));
    });
  }
}
function xg(r, e) {
  return typeof e == "boolean" ? r.childElements : r.childElements.filter((t) => e.some((n) => ce.validatePermittedCategory(t, n, !1)));
}
function Lg(r) {
  switch (r.kind) {
    case "content":
      return [
        `The \`${r.child}\` element is not permitted as content under the parent \`${r.parent}\` element.`
      ];
    case "descendant":
      return [
        `The \`${r.child}\` element is not permitted as a descendant of the \`${r.ancestor}\` element.`
      ];
  }
}
class Bg extends B {
  documentation(e) {
    return {
      description: Lg(e).join(`
`),
      url: "https://html-validate.org/rules/element-permitted-content.html"
    };
  }
  setup() {
    this.on("dom:ready", (e) => {
      const t = e.document;
      Oe.depthFirst(t, (n) => {
        const s = n.parent;
        s && [
          () => this.validatePermittedContent(n, s),
          () => this.validatePermittedDescendant(n, s)
        ].some((i) => i());
      });
    });
  }
  validatePermittedContent(e, t) {
    if (!t.meta)
      return !1;
    const n = t.meta.permittedContent ?? null;
    return this.validatePermittedContentImpl(e, t, n);
  }
  validatePermittedContentImpl(e, t, n) {
    var s;
    if (!ce.validatePermitted(e, n)) {
      const i = `<${e.tagName}>`, a = `${i} element is not permitted as content under ${t.annotatedName}`, o = {
        kind: "content",
        parent: t.annotatedName,
        child: i
      };
      return this.report(e, a, null, o), !0;
    }
    return (s = e.meta) != null && s.transparent ? xg(e, e.meta.transparent).map((a) => this.validatePermittedContentImpl(a, t, n)).some(Boolean) : !1;
  }
  validatePermittedDescendant(e, t) {
    for (let n = t; n && !n.isRootElement(); n = /* istanbul ignore next */
    (n == null ? void 0 : n.parent) ?? null) {
      const s = n.meta;
      if (!s)
        continue;
      const i = s.permittedDescendants;
      if (!i || ce.validatePermitted(e, i))
        continue;
      const a = `<${e.tagName}>`, o = n.annotatedName, u = `${a} element is not permitted as a descendant of ${o}`, l = {
        kind: "descendant",
        ancestor: o,
        child: a
      };
      return this.report(e, u, null, l), !0;
    }
    return !1;
  }
}
class jg extends B {
  documentation() {
    return {
      description: "Some elements may only be used a fixed amount of times in given context.",
      url: "https://html-validate.org/rules/element-permitted-occurrences.html"
    };
  }
  setup() {
    this.on("dom:ready", (e) => {
      const t = e.document;
      Oe.depthFirst(t, (n) => {
        if (!n.meta)
          return;
        const s = n.meta.permittedContent;
        s && ce.validateOccurrences(
          n.childElements,
          s,
          (i, a) => {
            this.report(
              i,
              `Element <${a}> can only appear once under ${n.annotatedName}`
            );
          }
        );
      });
    });
  }
}
class Mg extends B {
  documentation() {
    return {
      description: "Some elements has a specific order the children must use.",
      url: "https://html-validate.org/rules/element-permitted-order.html"
    };
  }
  setup() {
    this.on("dom:ready", (e) => {
      const t = e.document;
      Oe.depthFirst(t, (n) => {
        if (!n.meta)
          return;
        const s = n.meta.permittedOrder;
        s && ce.validateOrder(
          n.childElements,
          s,
          (i, a) => {
            this.report(
              i,
              `Element <${i.tagName}> must be used before <${a.tagName}> in this context`
            );
          }
        );
      });
    });
  }
}
function di(r) {
  return typeof r == "string";
}
function bl(r) {
  return r.startsWith("@");
}
function Ug(r) {
  return bl(r) ? r.slice(1) : `<${r}>`;
}
function El(r) {
  return r.length > 0 && r.every(di);
}
function Vg(r) {
  const { child: e, parent: t, rules: n } = r, s = `The \`${e}\` element cannot have a \`${t}\` element as parent.`;
  if (El(n)) {
    const i = n.filter(di).map((a) => bl(a) ? `- any ${a.slice(1)} element` : `- \`<${a}>\``);
    return [s, "", "Allowed parents one of:", "", ...i];
  } else
    return [s];
}
function Hg(r, e, t) {
  const n = r.annotatedName, s = e.annotatedName;
  if (!El(t))
    return `${n} element cannot have ${s} element as parent`;
  const i = We(t.filter(di).map(Ug));
  return `${n} element requires a ${i} element as parent`;
}
class Gg extends B {
  documentation(e) {
    return {
      description: Vg(e).join(`
`),
      url: "https://html-validate.org/rules/element-permitted-parent.html"
    };
  }
  setup() {
    this.on("dom:ready", (e) => {
      const t = e.document;
      Oe.depthFirst(t, (n) => {
        var u;
        const s = n.parent;
        if (!s || s.isRootElement() || s.tagName === n.tagName)
          return;
        const i = (u = n.meta) == null ? void 0 : u.permittedParent;
        if (!i)
          return !1;
        if (ce.validatePermitted(s, i))
          return;
        const a = Hg(n, s, i), o = {
          parent: s.annotatedName,
          child: n.annotatedName,
          rules: i
        };
        this.report(n, a, null, o);
      });
    });
  }
}
function zg(r) {
  return !!r.match(/^[a-zA-Z0-9-]+$/);
}
function Kg(r) {
  const e = r.ancestor.map((t) => `\`${t}\``);
  return [`The \`${r.child}\` element requires a ${We(e)} ancestor.`];
}
class Wg extends B {
  documentation(e) {
    return {
      description: Kg(e).join(`
`),
      url: "https://html-validate.org/rules/element-required-ancestor.html"
    };
  }
  setup() {
    this.on("dom:ready", (e) => {
      const t = e.document;
      Oe.depthFirst(t, (n) => {
        n.parent && this.validateRequiredAncestors(n);
      });
    });
  }
  validateRequiredAncestors(e) {
    if (!e.meta)
      return;
    const t = e.meta.requiredAncestors;
    if (!t || ce.validateAncestors(e, t))
      return;
    const n = t.map((o) => zg(o) ? `<${o}>` : `"${o}"`), s = `<${e.tagName}>`, i = `<${e.tagName}> element requires a ${We(n)} ancestor`, a = {
      ancestor: n,
      child: s
    };
    this.report(e, i, null, a);
  }
}
class Xg extends B {
  documentation(e) {
    const t = {
      description: "Element is missing a required attribute",
      url: "https://html-validate.org/rules/element-required-attributes.html"
    };
    return e && (t.description = `The <${e.element}> element is required to have a "${e.attribute}" attribute.`), t;
  }
  setup() {
    this.on("tag:end", (e) => {
      const t = e.previous, n = t.meta;
      if (n != null && n.attributes)
        for (const [s, i] of Object.entries(n.attributes)) {
          if (!i.required || t.hasAttribute(s)) continue;
          const a = {
            element: t.tagName,
            attribute: s
          };
          this.report(
            t,
            `${t.annotatedName} is missing required "${s}" attribute`,
            t.location,
            a
          );
        }
    });
  }
}
function Yg(r) {
  return r.startsWith("@");
}
class Jg extends B {
  documentation(e) {
    const { element: t, missing: n } = e;
    return {
      description: `The \`${t}\` element requires a \`${n}\` to be present as content.`,
      url: "https://html-validate.org/rules/element-required-content.html"
    };
  }
  setup() {
    this.on("dom:ready", (e) => {
      const t = e.document;
      Oe.depthFirst(t, (n) => {
        if (!n.meta)
          return;
        const s = n.meta.requiredContent;
        if (s)
          for (const i of ce.validateRequiredContent(n, s)) {
            const a = {
              element: n.annotatedName,
              missing: `<${i}>`
            }, o = Yg(i) ? `${i.slice(1)} element` : `<${i}>`, u = `${n.annotatedName} element must have ${o} as content`;
            this.report(n, u, null, a);
          }
      });
    });
  }
}
const Qg = ["h1", "h2", "h3", "h4", "h5", "h6"].join(",");
function Zg(r) {
  return r.is("img") ? ln(r) : r.is("svg") ? r.textContent.trim() !== "" : !1;
}
class ey extends B {
  documentation() {
    return {
      description: "Assistive technology such as screen readers require textual content in headings. Whitespace only is considered empty.",
      url: "https://html-validate.org/rules/empty-heading.html"
    };
  }
  setup() {
    this.on("dom:ready", ({ document: e }) => {
      const t = e.querySelectorAll(Qg);
      for (const n of t)
        this.validateHeading(n);
    });
  }
  validateHeading(e) {
    const t = e.querySelectorAll("img, svg");
    for (const n of t)
      if (Zg(n))
        return;
    switch (lt(e, { ignoreHiddenRoot: !0 })) {
      case Ie.DYNAMIC_TEXT:
      case Ie.STATIC_TEXT:
        break;
      case Ie.EMPTY_TEXT:
        this.report(e, `<${e.tagName}> cannot be empty, must have text content`);
        break;
    }
  }
}
class ty extends B {
  documentation() {
    return {
      description: [
        "The `<title>` element cannot be empty, it must have textual content.",
        "",
        "It is used to describe the document and is shown in the browser tab and titlebar.",
        "WCAG and SEO requires a descriptive title and preferably unique within the site.",
        "",
        "Whitespace is ignored."
      ].join(`
`),
      url: "https://html-validate.org/rules/empty-title.html"
    };
  }
  setup() {
    this.on("tag:end", (e) => {
      const t = e.previous;
      if (t.tagName === "title")
        switch (lt(t)) {
          case Ie.DYNAMIC_TEXT:
          case Ie.STATIC_TEXT:
            break;
          case Ie.EMPTY_TEXT:
            {
              const n = `<${t.tagName}> cannot be empty, must have text content`;
              this.report(t, n, t.location);
            }
            break;
        }
    });
  }
}
const ry = {
  allowArrayBrackets: !0,
  allowCheckboxDefault: !0,
  shared: ["radio", "button", "reset", "submit"]
}, tu = Symbol("form-elements-unique"), ru = Symbol("form-elements-shared");
function nu(r) {
  return typeof r == "string" && r !== "";
}
function ny(r, e) {
  const t = r.getAttribute("type");
  return !!(t != null && t.valueMatches(e, !1));
}
function sy(r) {
  return r.is("input") && r.getAttributeValue("type") === "hidden";
}
function iy(r) {
  return r.is("input") && r.getAttributeValue("type") === "checkbox";
}
function ay(r, e, t) {
  const { allowCheckboxDefault: n } = t;
  return !(!n || !e.potentialHiddenDefault || !iy(r));
}
function oy(r) {
  const e = "Each form control must have a unique name.", { name: t } = r;
  switch (r.kind) {
    case "duplicate":
      return [`Duplicate form control name "${t}"`, e].join(`
`);
    case "mix":
      return [
        'Form control name cannot mix regular name "{{ name }}" with array brackets "{{ name }}[]"',
        e
      ].join(`
`);
  }
}
class uy extends B {
  constructor(e) {
    super({ ...ry, ...e });
  }
  static schema() {
    return {
      allowArrayBrackets: {
        type: "boolean"
      },
      allowCheckboxDefault: {
        type: "boolean"
      },
      shared: {
        type: "array",
        items: {
          enum: ["radio", "checkbox", "submit", "button", "reset"]
        }
      }
    };
  }
  documentation(e) {
    return {
      description: oy(e),
      url: "https://html-validate.org/rules/form-dup-name.html"
    };
  }
  setup() {
    const e = this.getSelector(), { shared: t } = this.options;
    this.on("dom:ready", (n) => {
      const { document: s } = n, i = s.querySelectorAll(e), [a, o] = op(i, (u) => ny(u, t));
      for (const u of o) {
        const l = u.getAttribute("name"), c = l == null ? void 0 : l.value;
        if (!l || !nu(c))
          continue;
        const g = u.closest("form, template") ?? s.root;
        this.validateUniqueName(u, g, l, c);
      }
      for (const u of a) {
        const l = u.getAttribute("name"), c = l == null ? void 0 : l.value;
        if (!l || !nu(c))
          continue;
        const g = u.closest("form, template") ?? s.root;
        this.validateSharedName(u, g, l, c);
      }
    });
  }
  validateUniqueName(e, t, n, s) {
    const i = this.getUniqueElements(t), { allowArrayBrackets: a } = this.options;
    if (a) {
      const u = s.endsWith("[]"), l = u ? s.slice(0, -2) : s, c = i.get(l);
      if (c && c.array !== u) {
        const g = {
          name: l,
          kind: "mix"
        };
        this.report({
          node: e,
          location: n.valueLocation,
          message: 'Cannot mix "{{ name }}[]" and "{{ name }}"',
          context: g
        });
        return;
      }
      if (!c && u && i.set(l, {
        array: !0,
        potentialHiddenDefault: !1
      }), u)
        return;
    }
    const o = i.get(s);
    if (o) {
      if (ay(e, o, this.options)) {
        o.potentialHiddenDefault = !1;
        return;
      }
      const u = {
        name: s,
        kind: "duplicate"
      };
      this.report({
        node: e,
        location: n.valueLocation,
        message: 'Duplicate form control name "{{ name }}"',
        context: u
      });
    } else
      i.set(s, {
        array: !1,
        potentialHiddenDefault: sy(e)
      });
  }
  validateSharedName(e, t, n, s) {
    const i = this.getUniqueElements(t), a = this.getSharedElements(t), o = e.getAttributeValue("type") ?? "";
    if (i.has(s) || a.has(s) && a.get(s) !== o) {
      const u = {
        name: s,
        kind: "duplicate"
      };
      this.report({
        node: e,
        location: n.valueLocation,
        message: 'Duplicate form control name "{{ name }}"',
        context: u
      });
    }
    a.set(s, o);
  }
  getSelector() {
    return this.getTagsWithProperty("formAssociated").filter((t) => this.isListedElement(t)).join(", ");
  }
  isListedElement(e) {
    const t = this.getMetaFor(e);
    return t != null && t.formAssociated ? t.formAssociated.listed : !1;
  }
  getUniqueElements(e) {
    const t = e.cacheGet(tu);
    if (t)
      return t;
    {
      const n = /* @__PURE__ */ new Map();
      return e.cacheSet(tu, n), n;
    }
  }
  getSharedElements(e) {
    const t = e.cacheGet(ru);
    if (t)
      return t;
    {
      const n = /* @__PURE__ */ new Map();
      return e.cacheSet(ru, n), n;
    }
  }
}
const ly = {
  allowMultipleH1: !1,
  minInitialRank: "h1",
  sectioningRoots: ["dialog", '[role="dialog"]', '[role="alertdialog"]']
};
function cy(r) {
  var t;
  return !!((t = r.target.meta) != null && t.heading);
}
function dy(r) {
  const e = r.tagName.match(/^[hH](\d)$/);
  return e ? parseInt(e[1], 10) : null;
}
function fy(r) {
  if (r === !1 || r === "any")
    return 6;
  const e = r.match(/^h(\d)$/);
  return e ? parseInt(e[1], 10) : 1;
}
class hy extends B {
  constructor(t) {
    super({ ...ly, ...t });
    k(this, "minInitialRank");
    k(this, "sectionRoots");
    k(this, "stack", []);
    this.minInitialRank = fy(this.options.minInitialRank), this.sectionRoots = this.options.sectioningRoots.map((n) => new fl(n)), this.stack.push({
      node: null,
      current: 0,
      h1Count: 0
    });
  }
  static schema() {
    return {
      allowMultipleH1: {
        type: "boolean"
      },
      minInitialRank: {
        enum: ["h1", "h2", "h3", "h4", "h5", "h6", "any", !1]
      },
      sectioningRoots: {
        items: {
          type: "string"
        },
        type: "array"
      }
    };
  }
  documentation() {
    const t = [], n = this.minInitialRank > 1 ? "should" : "must";
    return t.push(`Headings ${n} start at <h1> and can only increase one level at a time.`), t.push("The headings should form a table of contents and make sense on its own."), this.options.allowMultipleH1 || (t.push(""), t.push(
      "Under the current configuration only a single <h1> can be present at a time in the document."
    )), {
      description: t.join(`
`),
      url: "https://html-validate.org/rules/heading-level.html"
    };
  }
  setup() {
    this.on("tag:start", cy, (t) => {
      this.onTagStart(t);
    }), this.on("tag:ready", (t) => {
      this.onTagReady(t);
    }), this.on("tag:end", (t) => {
      this.onTagClose(t);
    });
  }
  onTagStart(t) {
    const n = dy(t.target);
    if (!n) return;
    const s = this.getCurrentRoot();
    if (!this.options.allowMultipleH1 && n === 1) {
      if (s.h1Count >= 1) {
        const i = fe(t.location, 1);
        this.report(t.target, "Multiple <h1> are not allowed", i);
        return;
      }
      s.h1Count++;
    }
    if (n <= s.current) {
      s.current = n;
      return;
    }
    this.checkLevelIncrementation(s, t, n), s.current = n;
  }
  /**
   * Validate heading level was only incremented by one.
   */
  checkLevelIncrementation(t, n, s) {
    const i = t.current + 1;
    if (s === i || this.stack.length === 1 && i === 1 && s <= this.minInitialRank)
      return;
    const o = fe(n.location, 1);
    if (t.current > 0) {
      const u = `<h${String(i)}>`, l = `<h${String(s)}>`, c = `Heading level can only increase by one, expected ${u} but got ${l}`;
      this.report(n.target, c, o);
    } else
      this.checkInitialLevel(n, o, s, i);
  }
  checkInitialLevel(t, n, s, i) {
    const a = `<h${String(i)}>`, o = `<h${String(s)}>`;
    if (this.stack.length === 1) {
      const u = this.minInitialRank > 1 ? `Initial heading level must be <h${String(this.minInitialRank)}> or higher rank but got ${o}` : `Initial heading level must be ${a} but got ${o}`;
      this.report(t.target, u, n);
    } else {
      const l = this.getPrevRoot().current + 1;
      if (s > l)
        if (i === l) {
          const c = `Initial heading level for sectioning root must be ${a} but got ${o}`;
          this.report(t.target, c, n);
        } else {
          const c = `Initial heading level for sectioning root must be between ${a} and <h${String(l)}> but got ${o}`;
          this.report(t.target, c, n);
        }
    }
  }
  /**
   * Check if the current element is a sectioning root and push a new root entry
   * on the stack if it is.
   */
  onTagReady(t) {
    const { target: n } = t;
    this.isSectioningRoot(n) && this.stack.push({
      node: n.unique,
      current: 0,
      h1Count: 0
    });
  }
  /**
   * Check if the current element being closed is the element which opened the
   * current sectioning root, in which case the entry is popped from the stack.
   */
  onTagClose(t) {
    const { previous: n } = t, s = this.getCurrentRoot();
    n.unique === s.node && this.stack.pop();
  }
  getPrevRoot() {
    return this.stack[this.stack.length - 2];
  }
  getCurrentRoot() {
    return this.stack[this.stack.length - 1];
  }
  isSectioningRoot(t) {
    const n = {
      scope: t
    };
    return this.sectionRoots.some((s) => s.match(t, n));
  }
}
const su = Symbol(vl.name);
function my(r, e) {
  var s;
  return (s = e.formAssociated) != null && s.disablable ? !!(r.matches("[disabled]") || r.closest("fieldset[disabled]")) : !1;
}
function py(r) {
  if ($t(r) || an(r) || on(r))
    return !1;
  const { tabIndex: e, meta: t } = r;
  return e !== null ? e >= 0 : !t || my(r, t) ? !1 : !!t.focusable;
}
function vl(r) {
  const e = r.cacheGet(su);
  return e || r.cacheSet(su, py(r));
}
class gy extends B {
  documentation(e) {
    return {
      description: [
        `\`aria-hidden\` cannot be used on focusable elements.${e === "parent" ? " In this case it is being hidden by an ancestor with `aria-hidden.`" : ""}`,
        "",
        "When focusable elements are hidden with `aria-hidden` they are still reachable using conventional means such as a mouse or keyboard but won't be exposed to assistive technology (AT).",
        "This is often confusing for users of AT such as screenreaders.",
        "",
        "To fix this either:",
        "  - Remove `aria-hidden`.",
        "  - Remove the element from the DOM instead.",
        '  - Use `tabindex="-1"` to remove the element from tab order.',
        "  - Use `hidden`, `inert` or similar means to hide or disable the element."
      ].join(`
`),
      url: "https://html-validate.org/rules/hidden-focusable.html"
    };
  }
  setup() {
    const t = ["[tabindex]", ...this.getTagsWithProperty("focusable")].join(",");
    this.on("dom:ready", (n) => {
      const { document: s } = n;
      for (const i of s.querySelectorAll(t))
        vl(i) && Ct(i) && this.reportElement(i);
    });
  }
  reportElement(e) {
    const t = e.getAttribute("aria-hidden"), n = t ? "aria-hidden cannot be used on focusable elements" : "aria-hidden cannot be used on focusable elements (hidden by ancestor element)", s = t ? t.keyLocation : e.location, i = t ? "self" : "parent";
    this.report({
      node: e,
      message: n,
      location: s,
      context: i
    });
  }
}
const yy = {
  pattern: "kebabcase"
};
class by extends wt {
  constructor(e) {
    super("id", { ...yy, ...e });
  }
  static schema() {
    return wt.schema();
  }
  documentation(e) {
    return {
      description: this.description(e),
      url: "https://html-validate.org/rules/id-pattern.html"
    };
  }
  setup() {
    this.on("attr", (e) => {
      const { target: t, key: n, value: s, valueLocation: i } = e;
      n.toLowerCase() === "id" && (s instanceof ue || s !== null && this.validateValue(t, s, i));
    });
  }
}
const iu = /* @__PURE__ */ new Map([
  ["accept", ["file"]],
  ["alt", ["image"]],
  ["capture", ["file"]],
  ["checked", ["checkbox", "radio"]],
  ["dirname", ["text", "search"]],
  ["height", ["image"]],
  [
    "list",
    [
      "text",
      "search",
      "url",
      "tel",
      "email",
      "date",
      "month",
      "week",
      "time",
      "datetime-local",
      "number",
      "range",
      "color"
    ]
  ],
  ["max", ["date", "month", "week", "time", "datetime-local", "number", "range"]],
  ["maxlength", ["text", "search", "url", "tel", "email", "password"]],
  ["min", ["date", "month", "week", "time", "datetime-local", "number", "range"]],
  ["minlength", ["text", "search", "url", "tel", "email", "password"]],
  ["multiple", ["email", "file"]],
  ["pattern", ["text", "search", "url", "tel", "email", "password"]],
  ["placeholder", ["text", "search", "url", "tel", "email", "password", "number"]],
  [
    "readonly",
    [
      "text",
      "search",
      "url",
      "tel",
      "email",
      "password",
      "date",
      "month",
      "week",
      "time",
      "datetime-local",
      "number"
    ]
  ],
  [
    "required",
    [
      "text",
      "search",
      "url",
      "tel",
      "email",
      "password",
      "date",
      "month",
      "week",
      "time",
      "datetime-local",
      "number",
      "checkbox",
      "radio",
      "file"
    ]
  ],
  ["size", ["text", "search", "url", "tel", "email", "password"]],
  ["src", ["image"]],
  ["step", ["date", "month", "week", "time", "datetime-local", "number", "range"]],
  ["width", ["image"]]
]);
function Ey(r) {
  const { target: e } = r;
  return e.is("input");
}
class vy extends B {
  documentation(e) {
    var o;
    const { attribute: t, type: n } = e, s = `Attribute \`${t}\` is not allowed on \`<input type="${n}">\`
`, i = `\`${t}\` can only be used when \`type\` is:`, a = ((o = iu.get(t)) == null ? void 0 : o.map((u) => `- \`${u}\``)) ?? [];
    return {
      description: [s, i, ...a].join(`
`),
      url: "https://html-validate.org/rules/input-attributes.html"
    };
  }
  setup() {
    this.on("tag:ready", Ey, (e) => {
      const { target: t } = e, n = t.getAttribute("type");
      if (!n || n.isDynamic || !n.value)
        return;
      const s = n.value.toString();
      for (const i of t.attributes) {
        const a = iu.get(i.key);
        if (!a || a.includes(s))
          continue;
        const o = {
          attribute: i.key,
          type: s
        }, u = `Attribute "${i.key}" is not allowed on <input type="${s}">`;
        this.report(t, u, i.keyLocation, o);
      }
    });
  }
}
const As = Symbol(js.name);
function Dy(r, e) {
  const { reference: t } = e;
  return t != null && t.isSameNode(r) ? !1 : !Ze(r);
}
function wy(r, e) {
  if (r.is("img"))
    return ln(r);
  if (r.is("svg"))
    return r.textContent.trim() !== "";
  for (const t of r.querySelectorAll("img, svg"))
    if (fi(t, e))
      return !0;
  return !1;
}
function Ay(r) {
  return !!(r.getAttributeValue("aria-label") ?? "").trim();
}
function Cy(r, e) {
  const { document: t, reference: n } = e;
  if (n)
    return !1;
  const s = r.ariaLabelledby;
  return s instanceof ue ? !0 : s === null ? !1 : s.some((i) => {
    const a = dl(i);
    return t.querySelectorAll(a).some((o) => fi(o, {
      document: t,
      reference: o
    }));
  });
}
function fi(r, e) {
  const { reference: t } = e;
  if (Dy(r, e))
    return !1;
  const n = !!(t != null && t.isSameNode(r));
  return !!(lt(r, { accessible: !0, ignoreHiddenRoot: n }) !== Ie.EMPTY_TEXT || wy(r, e) || Ay(r) || Cy(r, e));
}
function js(r, e) {
  if (e.cacheExists(As))
    return !!e.cacheGet(As);
  const t = fi(e, {
    document: r,
    reference: null
  });
  return e.cacheSet(As, t);
}
function $y(r) {
  var e;
  if (r.is("input")) {
    const t = (e = r.getAttributeValue("type")) == null ? void 0 : e.toLowerCase();
    return !!(t && ["hidden", "submit", "reset", "button"].includes(t));
  }
  return !1;
}
class _y extends B {
  documentation() {
    return {
      description: [
        "Each form element must have an a label or accessible name.",
        'Typically this is implemented using a `<label for="..">` element describing the purpose of the form element.',
        "",
        "This can be resolved in one of the following ways:",
        "",
        '  - Use an associated `<label for="..">` element.',
        "  - Use a nested `<label>` as parent element.",
        "  - Use `aria-label` or `aria-labelledby` attributes."
      ].join(`
`),
      url: "https://html-validate.org/rules/input-missing-label.html"
    };
  }
  setup() {
    this.on("dom:ready", (e) => {
      const t = e.document;
      for (const n of t.querySelectorAll("input, textarea, select"))
        this.validateInput(t, n);
    });
  }
  validateInput(e, t) {
    if (!Ze(t) || $y(t) || js(e, t))
      return;
    let n = [];
    if ((n = Sy(e, t.id)).length > 0) {
      this.validateLabel(e, t, n);
      return;
    }
    if ((n = Ry(t)).length > 0) {
      this.validateLabel(e, t, n);
      return;
    }
    t.hasAttribute("aria-label") ? this.report(t, `<${t.tagName}> element has aria-label but label has no text`) : t.hasAttribute("aria-labelledby") ? this.report(
      t,
      `<${t.tagName}> element has aria-labelledby but referenced element has no text`
    ) : this.report(t, `<${t.tagName}> element does not have a <label>`);
  }
  /**
   * Reports error if none of the labels are accessible.
   */
  validateLabel(e, t, n) {
    if (n.filter(Ze).length === 0) {
      this.report(t, `<${t.tagName}> element has <label> but <label> element is hidden`);
      return;
    }
    n.some((i) => js(e, i)) || this.report(t, `<${t.tagName}> element has <label> but <label> has no text`);
  }
}
function Sy(r, e) {
  return e ? r.querySelectorAll(`label[for="${e}"]`) : [];
}
function Ry(r) {
  let e = r.parent;
  for (; e; ) {
    if (e.is("label"))
      return [e];
    e = e.parent;
  }
  return [];
}
const Ty = {
  maxlength: 70
};
class Ny extends B {
  constructor(t) {
    super({ ...Ty, ...t });
    k(this, "maxlength");
    this.maxlength = this.options.maxlength;
  }
  static schema() {
    return {
      maxlength: {
        type: "number"
      }
    };
  }
  documentation() {
    return {
      description: "Search engines truncates titles with long text, possibly down-ranking the page in the process.",
      url: "https://html-validate.org/rules/long-title.html"
    };
  }
  setup() {
    this.on("tag:end", (t) => {
      const n = t.previous;
      if (n.tagName !== "title") return;
      n.textContent.length > this.maxlength && this.report(n, `title text cannot be longer than ${String(this.maxlength)} characters`);
    });
  }
}
const Fy = {
  allowLongDelay: !1
};
class Py extends B {
  constructor(e) {
    super({ ...Fy, ...e });
  }
  documentation() {
    return {
      description: "Meta refresh directive must use the `0;url=...` format. Non-zero values for time interval is disallowed as people with assistive technology might be unable to read and understand the page content before automatically reloading. For the same reason skipping the url is disallowed as it would put the browser in an infinite loop reloading the same page over and over again.",
      url: "https://html-validate.org/rules/meta-refresh.html"
    };
  }
  setup() {
    this.on("element:ready", ({ target: e }) => {
      if (!e.is("meta") || e.getAttributeValue("http-equiv") !== "refresh")
        return;
      const n = e.getAttribute("content");
      if (!(n != null && n.value) || n.isDynamic)
        return;
      const s = n.valueLocation, i = Iy(n.value.toString());
      if (!i) {
        this.report(e, "Malformed meta refresh directive", s);
        return;
      }
      const { delay: a, url: o } = i;
      this.validateDelay(e, s, a, o);
    });
  }
  validateDelay(e, t, n, s) {
    const { allowLongDelay: i } = this.options;
    if (!(i && n > 72e3)) {
      if (!s && n === 0) {
        this.report(e, "Don't use instant meta refresh to reload the page", t);
        return;
      }
      if (n !== 0) {
        const a = i ? "Meta refresh must be instant (0 second delay) or greater than 20 hours (72000 second delay)" : "Meta refresh must be instant (0 second delay)";
        this.report(e, a, t);
      }
    }
  }
}
function Iy(r) {
  const e = r.match(/^(\d+)(?:\s*;\s*url=(.*))?/i);
  return e ? {
    delay: parseInt(e[1], 10),
    url: e[2]
  } : null;
}
function Oy(r) {
  const e = r.value;
  return !e || e instanceof ue ? null : e;
}
class ky extends B {
  documentation() {
    return {
      description: "`<map>` must have a unique name, it cannot be the same name as another `<map>` element",
      url: "https://html-validate.org/rules/map-dup-name.html"
    };
  }
  setup() {
    this.on("dom:ready", (e) => {
      const { document: t } = e, n = t.querySelectorAll("map[name]"), s = /* @__PURE__ */ new Set();
      for (const i of n) {
        const a = i.getAttribute("name");
        if (!a)
          continue;
        const o = Oy(a);
        o && (s.has(o) && this.report({
          node: i,
          message: "<map> name must be unique",
          location: a.keyLocation
        }), s.add(o));
      }
    });
  }
}
function qy(r) {
  return r.target.is("map");
}
function au(r) {
  return !!(r && !(r.value instanceof ue));
}
class xy extends B {
  documentation() {
    return {
      description: "When the `id` attribute is present on a `<map>` element it must be equal to the `name` attribute.",
      url: "https://html-validate.org/rules/map-id-name.html"
    };
  }
  setup() {
    this.on("tag:ready", qy, (e) => {
      const { target: t } = e, n = t.getAttribute("id"), s = t.getAttribute("name");
      !au(n) || !au(s) || n.value !== s.value && this.report({
        node: e.target,
        message: '"id" and "name" attribute must be the same on <map> elements',
        location: n.valueLocation ?? s.valueLocation
      });
    });
  }
}
class Ly extends B {
  documentation() {
    return {
      description: "Requires that the document contains a doctype.",
      url: "https://html-validate.org/rules/missing-doctype.html"
    };
  }
  setup() {
    this.on("dom:ready", (e) => {
      const t = e.document;
      t.doctype || this.report(t.root, "Document is missing doctype");
    });
  }
}
class By extends B {
  constructor() {
    super(...arguments);
    k(this, "labelable", "");
  }
  documentation() {
    return {
      description: "A `<label>` element can only be associated with one control at a time.",
      url: "https://html-validate.org/rules/multiple-labeled-controls.html"
    };
  }
  setup() {
    this.labelable = this.getTagsWithProperty("labelable").join(","), this.on("dom:ready", (t) => {
      const { document: n } = t, s = n.querySelectorAll("label");
      for (const i of s)
        this.getNumLabledControls(i) <= 1 || this.report(i, "<label> is associated with multiple controls", i.location);
    });
  }
  getNumLabledControls(t) {
    const n = t.querySelectorAll(this.labelable).filter((a) => {
      var o;
      return (o = a.meta) == null ? void 0 : o.labelable;
    }).map((a) => a.id), s = t.getAttribute("for");
    return !s || s.isDynamic || !s.value || n.includes(s.value.toString()) ? n.length : n.length + 1;
  }
}
const jy = {
  pattern: "camelcase"
};
class My extends wt {
  constructor(e) {
    super("name", { ...jy, ...e });
  }
  static schema() {
    return wt.schema();
  }
  documentation(e) {
    return {
      description: this.description(e),
      url: "https://html-validate.org/rules/name-pattern.html"
    };
  }
  setup() {
    this.on("attr", (e) => {
      var u;
      const { target: t, key: n, value: s, valueLocation: i } = e, { meta: a } = t;
      if (!((u = a == null ? void 0 : a.formAssociated) != null && u.listed) || n.toLowerCase() !== "name" || s instanceof ue || s === null)
        return;
      const o = s.endsWith("[]") ? s.slice(0, -2) : s;
      this.validateValue(t, o, i);
    });
  }
}
const ou = [
  "command",
  "composite",
  "input",
  "landmark",
  "range",
  "roletype",
  "section",
  "sectionhead",
  "select",
  "structure",
  "widget",
  "window"
];
function Uy(r) {
  return r.key === "role";
}
class Vy extends B {
  documentation(e) {
    return {
      description: [
        `Role \`"${e.role}"\` is abstract and must not be used.`,
        "",
        "WAI-ARIA defines a list of [abstract roles](https://www.w3.org/TR/wai-aria-1.2/#abstract_roles) which cannot be used by authors:",
        "",
        ...ou.map((t) => `- \`"${t}"\``),
        "",
        `Use one of the defined subclass roles for \`"${e.role}"\` instead.`
      ].join(`
`),
      url: "https://html-validate.org/rules/no-abstract-role.html"
    };
  }
  setup() {
    this.on("attr", Uy, (e) => {
      const t = e.value;
      if (!t || t instanceof ue)
        return;
      const n = new Me(t, e.valueLocation);
      for (const { item: s, location: i } of n.iterator())
        ou.includes(s) && this.report({
          node: e.target,
          message: 'Role "{{ role }}" is abstract and must not be used',
          location: i,
          context: {
            role: s
          }
        });
    });
  }
}
const Hy = {
  include: null,
  exclude: null
};
class Gy extends B {
  constructor(e) {
    super({ ...Hy, ...e });
  }
  documentation(e) {
    return {
      description: [
        `The autoplay attribute is not allowed on <${e.tagName}>.`,
        "Autoplaying content can be disruptive for users and has accessibilty concerns.",
        "Prefer to let the user control playback."
      ].join(`
`),
      url: "https://html-validate.org/rules/no-autoplay.html"
    };
  }
  static schema() {
    return {
      exclude: {
        anyOf: [
          {
            items: {
              type: "string"
            },
            type: "array"
          },
          {
            type: "null"
          }
        ]
      },
      include: {
        anyOf: [
          {
            items: {
              type: "string"
            },
            type: "array"
          },
          {
            type: "null"
          }
        ]
      }
    };
  }
  setup() {
    this.on("attr", (e) => {
      if (e.key.toLowerCase() !== "autoplay" || e.value && e.value instanceof ue)
        return;
      const t = e.target.tagName;
      if (this.isKeywordIgnored(t))
        return;
      const n = { tagName: t }, s = e.location;
      this.report(
        e.target,
        `The autoplay attribute is not allowed on <${t}>`,
        s,
        n
      );
    });
  }
}
class zy extends B {
  documentation() {
    return {
      description: "Microsoft Internet Explorer previously supported using special HTML comments (conditional comments) for targeting specific versions of IE but since IE 10 it is deprecated and not supported in standards mode.",
      url: "https://html-validate.org/rules/no-conditional-comment.html"
    };
  }
  setup() {
    this.on("conditional", (e) => {
      this.report(e.parent, "Use of conditional comments are deprecated", e.location);
    });
  }
}
class Ky extends B {
  documentation() {
    return {
      description: "HTML5 deprecated many old attributes.",
      url: "https://html-validate.org/rules/no-deprecated-attr.html"
    };
  }
  setup() {
    this.on("attr", (e) => {
      const t = e.target, n = t.meta, s = e.key.toLowerCase();
      if (n === null)
        return;
      const i = n.attributes[s];
      if (!i)
        return;
      i.deprecated && this.report(
        t,
        `Attribute "${e.key}" is deprecated on <${t.tagName}> element`,
        e.keyLocation
      );
    });
  }
}
class Wy extends B {
  documentation() {
    return {
      description: "HTML disallows two or more attributes with the same (case-insensitive) name.",
      url: "https://html-validate.org/rules/no-dup-attr.html"
    };
  }
  setup() {
    let e = {};
    this.on("tag:start", () => {
      e = {};
    }), this.on("attr", (t) => {
      if (t.originalAttribute)
        return;
      const n = t.key.toLowerCase();
      n in e && this.report(t.target, `Attribute "${n}" duplicated`, t.keyLocation), e[t.key] = !0;
    });
  }
}
class Xy extends B {
  documentation() {
    return {
      description: "Prevents unnecessary duplication of class names.",
      url: "https://html-validate.org/rules/no-dup-class.html"
    };
  }
  setup() {
    this.on("attr", (e) => {
      if (e.key.toLowerCase() !== "class")
        return;
      const t = new Me(e.value, e.valueLocation), n = /* @__PURE__ */ new Set();
      t.forEach((s, i) => {
        if (n.has(s)) {
          const a = t.location(i);
          this.report(e.target, `Class "${s}" duplicated`, a);
        }
        n.add(s);
      });
    });
  }
}
const uu = Symbol("no-dup-id");
class Yy extends B {
  documentation() {
    return {
      description: "The ID of an element must be unique.",
      url: "https://html-validate.org/rules/no-dup-id.html"
    };
  }
  setup() {
    this.on("dom:ready", (e) => {
      const { document: t } = e, n = lu(t.root, t.root), s = !t.querySelector("template"), i = t.querySelectorAll("[id]");
      for (const a of i) {
        const o = a.getAttribute("id");
        if (!o || !o.value || o.isDynamic)
          continue;
        const u = o.value.toString(), l = s ? n : lu(a, t.root);
        if (l.has(u)) {
          this.report(a, `Duplicate ID "${u}"`, o.valueLocation);
          continue;
        }
        l.add(u);
      }
    });
  }
}
function lu(r, e) {
  const t = r.closest("template") ?? e, n = t.cacheGet(uu);
  if (n)
    return n;
  {
    const s = /* @__PURE__ */ new Set();
    return t.cacheSet(uu, s);
  }
}
function Jy(r) {
  return r.target.is("button");
}
class Qy extends B {
  documentation() {
    return {
      description: [
        "`<button>` is missing recommended `type` attribute",
        "",
        "When the `type` attribute is omitted it defaults to `submit`.",
        "Submit buttons are triggered when a keyboard user presses <kbd>Enter</kbd>.",
        "",
        "As this may or may not be inteded this rule enforces that the `type` attribute be explicitly set to one of the valid types:",
        "",
        "- `button` - a generic button.",
        "- `submit` - a submit button.",
        "- `reset`- a button to reset form fields."
      ].join(`
`),
      url: "https://html-validate.org/rules/no-implicit-button-type.html"
    };
  }
  setup() {
    this.on("element:ready", Jy, (e) => {
      const { target: t } = e;
      t.getAttribute("type") || this.report({
        node: e.target,
        message: '<button> is missing recommended "type" attribute'
      });
    });
  }
}
function Zy(r) {
  return r.target.is("input");
}
class eb extends B {
  documentation() {
    return {
      description: ["`<input>` is missing recommended `type` attribute"].join(`
`),
      url: "https://html-validate.org/rules/no-implicit-input-type.html"
    };
  }
  setup() {
    this.on("element:ready", Zy, (e) => {
      const { target: t } = e;
      t.getAttribute("type") || this.report({
        node: e.target,
        message: '<input> is missing recommended "type" attribute'
      });
    });
  }
}
class tb extends B {
  documentation() {
    return {
      description: `Some elements in HTML has optional end tags. When an optional tag is omitted a browser must handle it as if the end tag was present.

Omitted end tags can be ambigious for humans to read and many editors have trouble formatting the markup.`,
      url: "https://html-validate.org/rules/no-implicit-close.html"
    };
  }
  setup() {
    this.on("tag:end", (e) => {
      const t = e.previous, n = e.target;
      if (!n || t.closed !== $e.ImplicitClosed)
        return;
      const s = t.parent, i = s && s.tagName === n.tagName, a = i && s.isRootElement(), o = t.tagName === n.tagName;
      a ? this.report(
        t,
        `Element <${t.tagName}> is implicitly closed by document ending`,
        t.location
      ) : i ? this.report(
        t,
        `Element <${t.tagName}> is implicitly closed by parent </${n.tagName}>`,
        t.location
      ) : o ? this.report(
        t,
        `Element <${t.tagName}> is implicitly closed by sibling`,
        t.location
      ) : this.report(
        t,
        `Element <${t.tagName}> is implicitly closed by adjacent <${n.tagName}>`,
        t.location
      );
    });
  }
}
const rb = {
  include: null,
  exclude: null,
  allowedProperties: ["display"]
};
class nb extends B {
  constructor(e) {
    super({ ...rb, ...e });
  }
  static schema() {
    return {
      exclude: {
        anyOf: [
          {
            items: {
              type: "string"
            },
            type: "array"
          },
          {
            type: "null"
          }
        ]
      },
      include: {
        anyOf: [
          {
            items: {
              type: "string"
            },
            type: "array"
          },
          {
            type: "null"
          }
        ]
      },
      allowedProperties: {
        items: {
          type: "string"
        },
        type: "array"
      }
    };
  }
  documentation() {
    const e = [
      `Inline style is not allowed.
`,
      `Inline style is a sign of unstructured CSS. Use class or ID with a separate stylesheet.
`
    ];
    return this.options.allowedProperties.length > 0 && (e.push(`Under the current configuration the following CSS properties are allowed:
`), e.push(this.options.allowedProperties.map((t) => `- \`${t}\``).join(`
`))), {
      description: e.join(`
`),
      url: "https://html-validate.org/rules/no-inline-style.html"
    };
  }
  setup() {
    this.on(
      "attr",
      (e) => this.isRelevant(e),
      (e) => {
        const { value: t } = e;
        this.allPropertiesAllowed(t) || this.report(e.target, "Inline style is not allowed");
      }
    );
  }
  isRelevant(e) {
    if (e.key !== "style")
      return !1;
    const { include: t, exclude: n } = this.options, s = e.originalAttribute ?? e.key;
    return !(t && !t.includes(s) || n != null && n.includes(s));
  }
  allPropertiesAllowed(e) {
    const t = this.options.allowedProperties;
    if (t.length === 0)
      return !1;
    const n = Object.keys(oi(e));
    return n.length > 0 && n.every((s) => t.includes(s));
  }
}
const sb = [
  { property: "aria-activedescendant", isList: !1 },
  { property: "aria-controls", isList: !0 },
  { property: "aria-describedby", isList: !0 },
  { property: "aria-details", isList: !1 },
  { property: "aria-errormessage", isList: !1 },
  { property: "aria-flowto", isList: !0 },
  { property: "aria-labelledby", isList: !0 },
  { property: "aria-owns", isList: !0 }
];
function cu(r, e) {
  return r.querySelectorAll(`[id="${e}"]`).length === 0;
}
class ib extends B {
  documentation(e) {
    return {
      description: `The element ID "${e.value}" referenced by the ${e.key} attribute must point to an existing element.`,
      url: "https://html-validate.org/rules/no-missing-references.html"
    };
  }
  setup() {
    this.on("dom:ready", (e) => {
      const t = e.document;
      for (const n of t.querySelectorAll("label[for]")) {
        const s = n.getAttribute("for");
        this.validateReference(t, n, s, !1);
      }
      for (const n of t.querySelectorAll("input[list]")) {
        const s = n.getAttribute("list");
        this.validateReference(t, n, s, !1);
      }
      for (const { property: n, isList: s } of sb)
        for (const i of t.querySelectorAll(`[${n}]`)) {
          const a = i.getAttribute(n);
          this.validateReference(t, i, a, s);
        }
    });
  }
  validateReference(e, t, n, s) {
    if (!n)
      return;
    const i = n.value;
    i instanceof ue || i === null || i === "" || (s ? this.validateList(e, t, n, i) : this.validateSingle(e, t, n, i));
  }
  validateSingle(e, t, n, s) {
    if (cu(e, s)) {
      const i = { key: n.key, value: s };
      this.report(t, `Element references missing id "${s}"`, n.valueLocation, i);
    }
  }
  validateList(e, t, n, s) {
    const i = new Me(s, n.valueLocation);
    for (const a of i.iterator()) {
      const o = a.item;
      if (cu(e, o)) {
        const u = { key: n.key, value: o };
        this.report(t, `Element references missing id "${o}"`, a.location, u);
      }
    }
  }
}
class ab extends B {
  documentation() {
    return {
      description: [
        "Only a single visible `<main>` element can be present at in a document at a time.",
        "",
        "Multiple `<main>` can be present in the DOM as long the others are hidden using the HTML5 `hidden` attribute."
      ].join(`
`),
      url: "https://html-validate.org/rules/no-multiple-main.html"
    };
  }
  setup() {
    this.on("dom:ready", (e) => {
      const { document: t } = e, n = t.querySelectorAll("main").filter((s) => !s.hasAttribute("hidden"));
      n.shift();
      for (const s of n)
        this.report(s, "Multiple <main> elements present in document");
    });
  }
}
const ob = {
  relaxed: !1
}, ub = /([<>]|&(?![a-zA-Z0-9#]+;))/g, lb = /([<>"'=`]|&(?![a-zA-Z0-9#]+;))/g, cb = /^(<%.*?%>|<\?.*?\?>|<\$.*?\$>)$/s, db = {
  '"': "&quot;",
  "&": "&amp;",
  "'": "&apos;",
  "<": "&lt;",
  "=": "&equals;",
  ">": "&gt;",
  "`": "&grave;"
};
class fb extends B {
  constructor(t) {
    super({ ...ob, ...t });
    k(this, "relaxed");
    this.relaxed = this.options.relaxed;
  }
  static schema() {
    return {
      relaxed: {
        type: "boolean"
      }
    };
  }
  documentation() {
    return {
      description: "Some characters such as `<`, `>` and `&` hold special meaning in HTML and must be escaped using a character reference (html entity).",
      url: "https://html-validate.org/rules/no-raw-characters.html"
    };
  }
  setup() {
    this.on("element:ready", (t) => {
      const n = t.target;
      for (const s of n.childNodes)
        s.nodeType === je.TEXT_NODE && (s.textContent.match(cb) || this.findRawChars(n, s.textContent, s.location, ub));
    }), this.on("attr", (t) => {
      t.value && (t.quote || this.findRawChars(
        t.target,
        t.value.toString(),
        t.valueLocation,
        // eslint-disable-line @typescript-eslint/no-non-null-assertion -- technical debt, valueLocation is always set if a value is provided
        lb
      ));
    });
  }
  /**
   * Find raw special characters and report as errors.
   *
   * @param text - The full text to find unescaped raw characters in.
   * @param location - Location of text.
   * @param regexp - Regexp pattern to match using.
   */
  findRawChars(t, n, s, i) {
    let a;
    do
      if (a = i.exec(n), a) {
        const o = a[0];
        if (this.relaxed && o === "&")
          continue;
        const u = db[o], l = fe(s, a.index, a.index + 1);
        this.report(t, `Raw "${o}" must be encoded as "${u}"`, l);
      }
    while (a);
  }
}
const hb = ["input[aria-label]", "textarea[aria-label]", "select[aria-label]"];
class mb extends B {
  documentation() {
    return {
      description: "`aria-label` is redundant when an associated `<label>` element containing the same text exists.",
      url: "https://html-validate.org/rules/no-redundant-aria-label.html"
    };
  }
  setup() {
    this.on("dom:ready", (e) => {
      const { document: t } = e, n = t.querySelectorAll(hb.join(","));
      for (const s of n) {
        const i = s.getAttribute("aria-label"), a = s.id;
        if (!a)
          continue;
        const o = t.querySelector(`label[for="${a}"]`);
        if (!i || !o || o.textContent.trim() !== i.value)
          continue;
        this.report({
          message: "aria-label is redundant when label containing same text exists",
          node: s,
          location: i.keyLocation
        });
      }
    });
  }
}
class pb extends B {
  documentation() {
    return {
      description: "When the `<label>` element wraps the labelable control the `for` attribute is redundant and better left out.",
      url: "https://html-validate.org/rules/no-redundant-for.html"
    };
  }
  setup() {
    this.on("element:ready", (e) => {
      const { target: t } = e;
      if (t.tagName !== "label")
        return;
      const n = t.getAttribute("for");
      if (!n || n.isDynamic)
        return;
      const s = n.value;
      if (!s)
        return;
      const i = cl(s);
      t.querySelector(`[id="${i}"]`) && this.report(t, 'Redundant "for" attribute', n.keyLocation);
    });
  }
}
class gb extends B {
  documentation(e) {
    const { role: t, tagName: n } = e;
    return {
      description: `Using the \`${t}\` role is redundant as it is already implied by the \`<${n}>\` element.`,
      url: "https://html-validate.org/rules/no-redundant-role.html"
    };
  }
  setup() {
    this.on("tag:ready", (e) => {
      const { target: t } = e, n = t.getAttribute("role");
      if (!(n != null && n.value) || n.value instanceof ue)
        return;
      const { meta: s } = t;
      if (!s)
        return;
      const i = s.aria.implicitRole(t._adapter);
      if (!i || n.value !== i)
        return;
      const a = {
        tagName: t.tagName,
        role: n.value
      };
      this.report(
        e.target,
        `Redundant role "${n.value}" on <${t.tagName}>`,
        n.valueLocation,
        a
      );
    });
  }
}
const yb = /^(.+):.+$/, bb = {
  ignoreForeign: !0,
  ignoreXML: !0
};
class Eb extends B {
  constructor(e) {
    super({ ...bb, ...e });
  }
  static schema() {
    return {
      ignoreForeign: {
        type: "boolean"
      },
      ignoreXML: {
        type: "boolean"
      }
    };
  }
  documentation(e) {
    return e = e || "element", {
      description: `Self-closing elements are disallowed. Use regular end tag <${e}></${e}> instead of self-closing <${e}/>.`,
      url: "https://html-validate.org/rules/no-self-closing.html"
    };
  }
  setup() {
    this.on("tag:end", (e) => {
      const t = e.previous;
      vb(t, this.options) && this.validateElement(t);
    });
  }
  validateElement(e) {
    e.closed === $e.VoidSelfClosed && this.report(e, `<${e.tagName}> must not be self-closed`, null, e.tagName);
  }
}
function vb(r, e) {
  return r.tagName.match(yb) ? !e.ignoreXML : r.meta ? r.meta.void ? !1 : r.meta.foreign ? !e.ignoreForeign : !0 : !0;
}
class Db extends B {
  documentation() {
    return {
      description: "Prefer to use external stylesheets with the `<link>` tag instead of inlining the styling.",
      url: "https://html-validate.org/rules/no-style-tag.html"
    };
  }
  setup() {
    this.on("tag:start", (e) => {
      const t = e.target;
      t.tagName === "style" && this.report(t, "Use external stylesheet with <link> instead of <style> tag");
    });
  }
}
class wb extends B {
  documentation() {
    return {
      description: "Lines with trailing whitespace cause unnessecary diff when using version control and usually serve no special purpose in HTML.",
      url: "https://html-validate.org/rules/no-trailing-whitespace.html"
    };
  }
  setup() {
    this.on("whitespace", (e) => {
      e.text.match(/^[ \t]+\r?\n$/) && this.report(null, "Trailing whitespace", e.location);
    });
  }
}
const Ab = {
  include: null,
  exclude: null
};
class Cb extends B {
  constructor(e) {
    super({ ...Ab, ...e });
  }
  static schema() {
    return {
      exclude: {
        anyOf: [
          {
            items: {
              type: "string"
            },
            type: "array"
          },
          {
            type: "null"
          }
        ]
      },
      include: {
        anyOf: [
          {
            items: {
              type: "string"
            },
            type: "array"
          },
          {
            type: "null"
          }
        ]
      }
    };
  }
  documentation(e) {
    return {
      description: `An unknown element${e ? ` <${e}>` : ""} was used. If this is a Custom Element you need to supply element metadata for it.`,
      url: "https://html-validate.org/rules/no-unknown-elements.html"
    };
  }
  setup() {
    this.on("tag:start", (e) => {
      const t = e.target;
      t.meta || this.isKeywordIgnored(t.tagName, Xm) || this.report(t, `Unknown element <${t.tagName}>`, null, t.tagName);
    });
  }
}
class $b extends B {
  documentation(e) {
    return {
      description: `\`${e.ruleId}\` rule is disabled but no error was reported.`,
      url: "https://html-validate.org/rules/no-unused-disable.html"
    };
  }
  setup() {
  }
  reportUnused(e, t, n) {
    const s = new Me(t.replace(/,/g, " "), n);
    for (const i of e) {
      const a = s.indexOf(i), o = a >= 0 ? s.location(a) : n;
      this.report({
        node: null,
        message: '"{{ ruleId }}" rule is disabled but no error was reported',
        location: o,
        context: {
          ruleId: i
        }
      });
    }
  }
}
class _b extends B {
  documentation() {
    return {
      description: "This file is saved with the UTF-8 byte order mark (BOM) present. It is neither required or recommended to use.\n\nInstead the document should be served with the `Content-Type: application/javascript; charset=utf-8` header.",
      url: "https://html-validate.org/rules/no-utf8-bom.html"
    };
  }
  setup() {
    const e = this.on("token", (t) => {
      t.type === Y.UNICODE_BOM && this.report(null, "File should be saved without UTF-8 BOM", t.location), this.setEnabled(!1), e();
    });
  }
}
const Sb = ["button", "submit", "reset", "image"], Rb = {
  button: '<button type="button">',
  submit: '<button type="submit">',
  reset: '<button type="reset">',
  image: '<button type="button">'
}, Tb = {
  include: null,
  exclude: null
};
class Nb extends B {
  constructor(e) {
    super({ ...Tb, ...e });
  }
  static schema() {
    return {
      exclude: {
        anyOf: [
          {
            items: {
              type: "string"
            },
            type: "array"
          },
          {
            type: "null"
          }
        ]
      },
      include: {
        anyOf: [
          {
            items: {
              type: "string"
            },
            type: "array"
          },
          {
            type: "null"
          }
        ]
      }
    };
  }
  documentation(e) {
    const t = `<input type="${e.type}">`;
    return {
      description: `Prefer to use \`${Rb[e.type] || "<button>"}\` instead of \`"${t}\`.`,
      url: "https://html-validate.org/rules/prefer-button.html"
    };
  }
  setup() {
    this.on("attr", (e) => {
      const t = e.target;
      if (t.tagName.toLowerCase() !== "input" || e.key.toLowerCase() !== "type" || !e.value || e.value instanceof ue)
        return;
      const n = e.value.toLowerCase();
      if (this.isKeywordIgnored(n) || !Sb.includes(n))
        return;
      const s = { type: n }, i = `Prefer to use <button> instead of <input type="${n}"> when adding buttons`;
      this.report(t, i, e.valueLocation, s);
    });
  }
}
const Fb = {
  mapping: {
    article: "article",
    banner: "header",
    button: "button",
    cell: "td",
    checkbox: "input",
    complementary: "aside",
    contentinfo: "footer",
    figure: "figure",
    form: "form",
    heading: "hN",
    input: "input",
    link: "a",
    list: "ul",
    listbox: "select",
    listitem: "li",
    main: "main",
    navigation: "nav",
    progressbar: "progress",
    radio: "input",
    region: "section",
    table: "table",
    textbox: "textarea"
  },
  include: null,
  exclude: null
};
class Pb extends B {
  constructor(e) {
    super({ ...Fb, ...e });
  }
  static schema() {
    return {
      exclude: {
        anyOf: [
          {
            items: {
              type: "string"
            },
            type: "array"
          },
          {
            type: "null"
          }
        ]
      },
      include: {
        anyOf: [
          {
            items: {
              type: "string"
            },
            type: "array"
          },
          {
            type: "null"
          }
        ]
      },
      mapping: {
        type: "object"
      }
    };
  }
  documentation(e) {
    return {
      description: `Instead of using the WAI-ARIA role "${e.role}" prefer to use the native <${e.replacement}> element.`,
      url: "https://html-validate.org/rules/prefer-native-element.html"
    };
  }
  setup() {
    const { mapping: e } = this.options;
    this.on("attr", (t) => {
      if (t.key.toLowerCase() !== "role" || !t.value || t.value instanceof ue)
        return;
      const n = t.value.toLowerCase();
      if (this.isIgnored(n))
        return;
      const s = e[n];
      if (t.target.is(s))
        return;
      const i = { role: n, replacement: s }, a = this.getLocation(t);
      this.report(
        t.target,
        `Prefer to use the native <${s}> element`,
        a,
        i
      );
    });
  }
  isIgnored(e) {
    const { mapping: t } = this.options;
    return t[e] ? this.isKeywordIgnored(e) : !0;
  }
  getLocation(e) {
    const t = e.location, n = e.valueLocation, s = e.quote ? 1 : 0, i = n.offset + n.size - t.offset + s;
    return {
      filename: t.filename,
      line: t.line,
      column: t.column,
      offset: t.offset,
      size: i
    };
  }
}
class Ib extends B {
  documentation() {
    return {
      description: "While `<tbody>` is optional is relays semantic information about its contents. Where applicable it should also be combined with `<thead>` and `<tfoot>`.",
      url: "https://html-validate.org/rules/prefer-tbody.html"
    };
  }
  setup() {
    this.on("dom:ready", (e) => {
      const t = e.document;
      for (const n of t.querySelectorAll("table")) {
        if (n.querySelector("> tbody"))
          continue;
        const s = n.querySelectorAll("> tr");
        s.length >= 1 && this.report(s[0], "Prefer to wrap <tr> elements in <tbody>");
      }
    });
  }
}
const Ob = {
  tags: ["script", "style"]
};
class kb extends B {
  constructor(e) {
    super({ ...Ob, ...e });
  }
  static schema() {
    return {
      tags: {
        type: "array",
        items: {
          enum: ["script", "style"],
          type: "string"
        }
      }
    };
  }
  documentation() {
    return {
      description: [
        "Required Content-Security-Policy (CSP) nonce is missing or empty.",
        "",
        "This is set by the `nonce` attribute and must match the `Content-Security-Policy` header.",
        "For instance, if the header contains `script-src 'nonce-r4nd0m'` the `nonce` attribute must be set to `nonce=\"r4nd0m\">`",
        "",
        "The nonce should be unique per each request and set to a cryptography secure random token.",
        "It is used to prevent cross site scripting (XSS) by preventing malicious actors from injecting scripts onto the page."
      ].join(`
`),
      url: "https://html-validate.org/rules/require-csp-nonce.html"
    };
  }
  setup() {
    this.on("tag:end", (e) => {
      var a;
      const { tags: t } = this.options, n = e.previous;
      if (!t.includes(n.tagName))
        return;
      const s = (a = n.getAttribute("nonce")) == null ? void 0 : a.value;
      if (s && s !== "" || n.is("script") && n.hasAttribute("src"))
        return;
      this.report(n, "required CSP nonce is missing", n.location);
    });
  }
}
const qb = {
  target: "all",
  include: null,
  exclude: null
}, xb = new RegExp("^(\\w+://|//)"), du = {
  link: "href",
  script: "src"
}, Lb = ["stylesheet", "preload", "modulepreload"], Bb = ["style", "script"];
function jb(r) {
  const e = r.getAttribute("rel");
  if (typeof (e == null ? void 0 : e.value) != "string" || !Lb.includes(e.value))
    return !1;
  if (e.value === "preload") {
    const t = r.getAttribute("as");
    return typeof (t == null ? void 0 : t.value) == "string" && Bb.includes(t.value);
  }
  return !0;
}
class Mb extends B {
  constructor(t) {
    super({ ...qb, ...t });
    k(this, "target");
    this.target = this.options.target;
  }
  static schema() {
    return {
      target: {
        enum: ["all", "crossorigin"],
        type: "string"
      },
      include: {
        anyOf: [
          {
            items: {
              type: "string"
            },
            type: "array"
          },
          {
            type: "null"
          }
        ]
      },
      exclude: {
        anyOf: [
          {
            items: {
              type: "string"
            },
            type: "array"
          },
          {
            type: "null"
          }
        ]
      }
    };
  }
  documentation() {
    return {
      description: "Subresource Integrity (SRI) `integrity` attribute is required to prevent tampering or manipulation from Content Delivery Networks (CDN), rouge proxies,  malicious entities, etc.",
      url: "https://html-validate.org/rules/require-sri.html"
    };
  }
  setup() {
    this.on("tag:end", (t) => {
      const n = t.previous;
      this.supportSri(n) && this.needSri(n) && (n.hasAttribute("integrity") || this.report(
        n,
        `SRI "integrity" attribute is required on <${n.tagName}> element`,
        n.location
      ));
    });
  }
  supportSri(t) {
    return Object.keys(du).includes(t.tagName);
  }
  needSri(t) {
    if (t.is("link") && !jb(t))
      return !1;
    const n = this.elementSourceAttr(t);
    if (!n || n.value === null || n.value === "" || n.isDynamic)
      return !1;
    const s = n.value.toString();
    return this.target === "all" || xb.test(s) ? !this.isIgnored(s) : !1;
  }
  elementSourceAttr(t) {
    const n = du[t.tagName];
    return t.getAttribute(n);
  }
  isIgnored(t) {
    return this.isKeywordIgnored(t, (n, s) => n.some((i) => s.includes(i)));
  }
}
class Ub extends B {
  documentation() {
    return {
      description: "The end tag for `<script>` is a hard requirement and must never be omitted even when using the `src` attribute.",
      url: "https://html-validate.org/rules/script-element.html"
    };
  }
  setup() {
    this.on("tag:end", (e) => {
      const t = e.target;
      !t || t.tagName !== "script" || t.closed !== $e.EndTag && this.report(t, `End tag for <${t.tagName}> must not be omitted`);
    });
  }
}
const Vb = [
  "",
  "application/ecmascript",
  "application/javascript",
  "text/ecmascript",
  "text/javascript"
];
class Hb extends B {
  documentation() {
    return {
      description: "While valid the HTML5 standard encourages authors to omit the type element for JavaScript resources.",
      url: "https://html-validate.org/rules/script-type.html"
    };
  }
  setup() {
    this.on("tag:end", (e) => {
      const t = e.previous;
      if (t.tagName !== "script")
        return;
      const n = t.getAttribute("type");
      if (!n || n.isDynamic)
        return;
      const s = n.value ? n.value.toString() : "";
      this.isJavascript(s) && this.report(
        t,
        '"type" attribute is unnecessary for javascript resources',
        n.keyLocation
      );
    });
  }
  isJavascript(e) {
    const t = e.replace(/;.*/, "");
    return Vb.includes(t);
  }
}
class Gb extends B {
  documentation() {
    return {
      description: "Inline SVG elements in IE are focusable by default which may cause issues with tab-ordering. The `focusable` attribute should explicitly be set to avoid unintended behaviour.",
      url: "https://html-validate.org/rules/svg-focusable.html"
    };
  }
  setup() {
    this.on("element:ready", (e) => {
      e.target.is("svg") && this.validate(e.target);
    });
  }
  validate(e) {
    e.hasAttribute("focusable") || this.report(e, `<${e.tagName}> is missing required "focusable" attribute`);
  }
}
const zb = {
  characters: [
    { pattern: " ", replacement: "&nbsp;", description: "non-breaking space" },
    { pattern: "-", replacement: "&#8209;", description: "non-breaking hyphen" }
  ],
  ignoreClasses: [],
  ignoreStyle: !0
};
function Kb(r) {
  const t = `(${r.map((n) => n.pattern).join("|")})`;
  return new RegExp(t, "g");
}
function Wb(r) {
  const e = r.textContent.match(/^(\s*)(.*)$/), [, t, n] = e;
  return [t.length, n.trimEnd()];
}
function Xb(r, e) {
  const t = new RegExp(e), n = [];
  let s;
  for (; s = t.exec(r); )
    n.push(s);
  return n;
}
class Yb extends B {
  constructor(t) {
    super({ ...zb, ...t });
    k(this, "regex");
    this.regex = Kb(this.options.characters);
  }
  static schema() {
    return {
      characters: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: !1,
          properties: {
            pattern: {
              type: "string"
            },
            replacement: {
              type: "string"
            },
            description: {
              type: "string"
            }
          }
        }
      },
      ignoreClasses: {
        type: "array",
        items: {
          type: "string"
        }
      },
      ignoreStyle: {
        type: "boolean"
      }
    };
  }
  documentation(t) {
    const { characters: n } = this.options, s = n.map((i) => `  - \`${i.pattern}\` - replace with \`${i.replacement}\` (${i.description}).`);
    return {
      description: [
        `The \`${t.pattern}\` character should be replaced with \`${t.replacement}\` character (${t.description}) when used in a telephone number.`,
        "",
        "Unless non-breaking characters is used there could be a line break inserted at that character.",
        "Line breaks make is harder to read and understand the telephone number.",
        "",
        "The following characters should be avoided:",
        "",
        ...s
      ].join(`
`),
      url: "https://html-validate.org/rules/tel-non-breaking.html"
    };
  }
  setup() {
    this.on("element:ready", this.isRelevant, (t) => {
      const { target: n } = t;
      this.isIgnored(n) || this.walk(n, n);
    });
  }
  isRelevant(t) {
    const { target: n } = t;
    if (!n.is("a"))
      return !1;
    const s = n.getAttribute("href");
    return !!(s != null && s.valueMatches(/^tel:/, !1));
  }
  isIgnoredClass(t) {
    const { ignoreClasses: n } = this.options, { classList: s } = t;
    return n.some((i) => s.contains(i));
  }
  isIgnoredStyle(t) {
    const { ignoreStyle: n } = this.options, { style: s } = t;
    return n ? s["white-space"] === "nowrap" || s["white-space"] === "pre" : !1;
  }
  isIgnored(t) {
    return this.isIgnoredClass(t) || this.isIgnoredStyle(t);
  }
  walk(t, n) {
    for (const s of n.childNodes)
      ui(s) ? this.detectDisallowed(t, s) : li(s) && this.walk(t, s);
  }
  detectDisallowed(t, n) {
    const [s, i] = Wb(n), a = Xb(i, this.regex);
    for (const o of a) {
      const u = o[0], l = this.options.characters.find((b) => b.pattern === u);
      if (!l)
        throw new Error(`Failed to find entry for "${u}" when searching text "${i}"`);
      const c = `"${u}" should be replaced with "${l.replacement}" (${l.description}) in telephone number`, g = s + o.index, v = g + u.length, D = fe(n.location, g, v), A = l;
      this.report(t, c, D, A);
    }
  }
}
function Cs(r, e) {
  const t = r.getAttribute(e);
  return !!(t != null && t.valueMatches(/.+/, !0));
}
function Jb(r) {
  if (!r.is("input") || r.hasAttribute("value"))
    return !1;
  const e = r.getAttribute("type");
  return !!(e != null && e.valueMatches(/submit|reset/, !1));
}
function Qb(r) {
  return ui(r) ? r.isDynamic || r.textContent.trim() !== "" : !1;
}
function Dl(r) {
  return Ze(r) ? r.childNodes.some((t) => Qb(t)) || Cs(r, "aria-label") || Cs(r, "aria-labelledby") || r.is("img") && Cs(r, "alt") || Jb(r) ? !0 : r.childElements.some((t) => Dl(t)) : !1;
}
class hi extends B {
  documentation(e) {
    const t = {
      description: "The textual content for this element is not valid.",
      url: "https://html-validate.org/rules/text-content.html"
    };
    switch (e.textContent) {
      case Ye.NONE:
        t.description = `The \`<${e.tagName}>\` element must not have textual content.`;
        break;
      case Ye.REQUIRED:
        t.description = `The \`<${e.tagName}>\` element must have textual content.`;
        break;
      case Ye.ACCESSIBLE:
        t.description = `The \`<${e.tagName}>\` element must have accessible text.`;
        break;
    }
    return t;
  }
  static filter(e) {
    const { target: t } = e;
    if (!t.meta)
      return !1;
    const { textContent: n } = t.meta;
    return !(!n || n === Ye.DEFAULT);
  }
  setup() {
    this.on("element:ready", hi.filter, (e) => {
      const t = e.target, { textContent: n } = t.meta;
      switch (n) {
        case Ye.NONE:
          this.validateNone(t);
          break;
        case Ye.REQUIRED:
          this.validateRequired(t);
          break;
        case Ye.ACCESSIBLE:
          this.validateAccessible(t);
          break;
      }
    });
  }
  /**
   * Validate element has empty text (inter-element whitespace is not considered text)
   */
  validateNone(e) {
    lt(e) !== Ie.EMPTY_TEXT && this.reportError(e, e.meta, `${e.annotatedName} must not have text content`);
  }
  /**
   * Validate element has any text (inter-element whitespace is not considered text)
   */
  validateRequired(e) {
    lt(e) === Ie.EMPTY_TEXT && this.reportError(e, e.meta, `${e.annotatedName} must have text content`);
  }
  /**
   * Validate element has accessible text (either regular text or text only
   * exposed in accessibility tree via aria-label or similar)
   */
  validateAccessible(e) {
    Ze(e) && (Dl(e) || this.reportError(e, e.meta, `${e.annotatedName} must have accessible text`));
  }
  reportError(e, t, n) {
    this.report(e, n, null, {
      tagName: e.tagName,
      textContent: t.textContent
    });
  }
}
const wl = ["complementary", "contentinfo", "form", "banner", "main", "navigation", "region"], Zb = [
  "aside",
  "footer",
  "form",
  "header",
  "main",
  "nav",
  "section",
  ...wl.map((r) => `[role="${r}"]`)
  /* <search> does not (yet?) require a unique name */
];
function e0(r, e) {
  if (!e || e instanceof ue)
    return e;
  const t = `#${e}`, n = r.querySelector(t);
  return n ? n.textContent : t;
}
function t0(r, e) {
  const t = {};
  for (const n of r) {
    const s = e(n);
    s in t ? t[s].push(n) : t[s] = [n];
  }
  return t;
}
function r0(r, e) {
  const t = e.getAttribute("aria-label");
  if (t)
    return {
      node: e,
      text: t.value,
      location: t.keyLocation
    };
  const n = e.getAttribute("aria-labelledby");
  if (n) {
    const s = e0(r, n.value);
    return {
      node: e,
      text: s,
      location: n.keyLocation
    };
  }
  return {
    node: e,
    text: null,
    location: e.location
  };
}
function n0(r) {
  const { node: e, text: t } = r;
  return t === null ? !(e.is("form") || e.is("section")) : !0;
}
class s0 extends B {
  documentation() {
    return {
      description: [
        "When the same type of landmark is present more than once in the same document each must be uniquely identifiable with a non-empty and unique name.",
        "For instance, if the document has two `<nav>` elements each of them need an accessible name to be distinguished from each other.",
        "",
        "The following elements / roles are considered landmarks:",
        "",
        '  - `aside` or `[role="complementary"]`',
        '  - `footer` or `[role="contentinfo"]`',
        '  - `form` or `[role="form"]`',
        '  - `header` or `[role="banner"]`',
        '  - `main` or `[role="main"]`',
        '  - `nav` or `[role="navigation"]`',
        '  - `section` or `[role="region"]`',
        "",
        "To fix this either:",
        "",
        "  - Add `aria-label`.",
        "  - Add `aria-labelledby`.",
        "  - Remove one of the landmarks."
      ].join(`
`),
      url: "https://html-validate.org/rules/unique-landmark.html"
    };
  }
  setup() {
    this.on("dom:ready", (e) => {
      const { document: t } = e, n = t.querySelectorAll(Zb.join(",")).filter((i) => typeof i.role == "string" && wl.includes(i.role)), s = t0(n, (i) => i.role);
      for (const i of Object.values(s)) {
        if (i.length <= 1)
          continue;
        const a = i.map((u) => r0(t, u)), o = a.filter(n0);
        for (const u of o) {
          if (u.text instanceof ue)
            continue;
          const l = a.filter((c) => c.text === u.text).length > 1;
          if (!u.text || l) {
            const c = "Landmarks must have a non-empty and unique accessible name (aria-label or aria-labelledby)", g = u.location;
            this.report({
              node: u.node,
              message: c,
              location: g
            });
          }
        }
      }
    });
  }
}
const i0 = {
  ignoreCase: !1,
  requireSemicolon: !0
}, a0 = /&(?:[a-z0-9]+|#x?[0-9a-f]+)(;|[^a-z0-9]|$)/gi, o0 = Fu.map((r) => r.toLowerCase());
function u0(r) {
  return r.startsWith("&#");
}
function fu(r, e, t) {
  const n = t.index ?? 0;
  return fe(r, n, n + e.length);
}
function l0(r, e) {
  const t = "https://html.spec.whatwg.org/multipage/named-characters.html";
  let n;
  return r.terminated ? n = `Unrecognized character reference \`${r.entity}\`.` : n = `Character reference \`${r.entity}\` must be terminated by a semicolon.`, [
    n,
    `HTML5 defines a set of [valid character references](${t}) but this is not a valid one.`,
    "",
    "Ensure that:",
    "",
    "1. The character is one of the listed names.",
    ...e.ignoreCase ? [] : ["1. The case is correct (names are case sensitive)."],
    ...e.requireSemicolon ? ["1. The name is terminated with a `;`."] : []
  ].join(`
`);
}
class c0 extends B {
  constructor(e) {
    super({ ...i0, ...e });
  }
  static schema() {
    return {
      ignoreCase: {
        type: "boolean"
      },
      requireSemicolon: {
        type: "boolean"
      }
    };
  }
  documentation(e) {
    return {
      description: l0(e, this.options),
      url: "https://html-validate.org/rules/unrecognized-char-ref.html"
    };
  }
  setup() {
    this.on("element:ready", (e) => {
      const t = e.target;
      for (const n of t.childNodes)
        n.nodeType === je.TEXT_NODE && this.findCharacterReferences(t, n.textContent, n.location, {
          isAttribute: !1
        });
    }), this.on("attr", (e) => {
      e.value && this.findCharacterReferences(e.target, e.value.toString(), e.valueLocation, {
        isAttribute: !0
      });
    });
  }
  get entities() {
    return this.options.ignoreCase ? o0 : Fu;
  }
  findCharacterReferences(e, t, n, { isAttribute: s }) {
    const i = s && t.includes("?");
    for (const a of this.getMatches(t))
      this.validateCharacterReference(e, n, a, { isQuerystring: i });
  }
  validateCharacterReference(e, t, n, { isQuerystring: s }) {
    const { requireSemicolon: i } = this.options, { match: a, entity: o, raw: u, terminated: l } = n;
    if (u0(o) || s && !l)
      return;
    const c = this.entities.includes(o);
    if (c && (l || !i))
      return;
    if (c && !l) {
      const A = fu(t, o, a), b = 'Character reference "{{ entity }}" must be terminated by a semicolon', p = {
        entity: u,
        terminated: !1
      };
      this.report(e, b, A, p);
      return;
    }
    const g = fu(t, o, a), v = 'Unrecognized character reference "{{ entity }}"', D = {
      entity: u,
      terminated: !0
    };
    this.report(e, v, g, D);
  }
  *getMatches(e) {
    let t;
    do
      if (t = a0.exec(e), t) {
        const n = t[1], s = n === ";", a = n !== ";" && n.length > 0 ? t[0].slice(0, -1) : t[0];
        this.options.ignoreCase ? yield { match: t, entity: a.toLowerCase(), raw: a, terminated: s } : yield { match: t, entity: a, raw: a, terminated: s };
      }
    while (t);
  }
}
const d0 = ["section", "hint", "contact", "field1", "field2", "webauthn"], f0 = [
  "name",
  "honorific-prefix",
  "given-name",
  "additional-name",
  "family-name",
  "honorific-suffix",
  "nickname",
  "username",
  "new-password",
  "current-password",
  "one-time-code",
  "organization-title",
  "organization",
  "street-address",
  "address-line1",
  "address-line2",
  "address-line3",
  "address-level4",
  "address-level3",
  "address-level2",
  "address-level1",
  "country",
  "country-name",
  "postal-code",
  "cc-name",
  "cc-given-name",
  "cc-additional-name",
  "cc-family-name",
  "cc-number",
  "cc-exp",
  "cc-exp-month",
  "cc-exp-year",
  "cc-csc",
  "cc-type",
  "transaction-currency",
  "transaction-amount",
  "language",
  "bday",
  "bday-day",
  "bday-month",
  "bday-year",
  "sex",
  "url",
  "photo"
], h0 = [
  "tel",
  "tel-country-code",
  "tel-national",
  "tel-area-code",
  "tel-local",
  "tel-local-prefix",
  "tel-local-suffix",
  "tel-extension",
  "email",
  "impp"
], Al = {
  name: "text",
  "honorific-prefix": "text",
  "given-name": "text",
  "additional-name": "text",
  "family-name": "text",
  "honorific-suffix": "text",
  nickname: "text",
  username: "username",
  "new-password": "password",
  "current-password": "password",
  "one-time-code": "password",
  "organization-title": "text",
  organization: "text",
  "street-address": "multiline",
  "address-line1": "text",
  "address-line2": "text",
  "address-line3": "text",
  "address-level4": "text",
  "address-level3": "text",
  "address-level2": "text",
  "address-level1": "text",
  country: "text",
  "country-name": "text",
  "postal-code": "text",
  "cc-name": "text",
  "cc-given-name": "text",
  "cc-additional-name": "text",
  "cc-family-name": "text",
  "cc-number": "text",
  "cc-exp": "month",
  "cc-exp-month": "numeric",
  "cc-exp-year": "numeric",
  "cc-csc": "text",
  "cc-type": "text",
  "transaction-currency": "text",
  "transaction-amount": "numeric",
  language: "text",
  bday: "date",
  "bday-day": "numeric",
  "bday-month": "numeric",
  "bday-year": "numeric",
  sex: "text",
  url: "url",
  photo: "url",
  tel: "tel",
  "tel-country-code": "text",
  "tel-national": "text",
  "tel-area-code": "text",
  "tel-local": "text",
  "tel-local-prefix": "text",
  "tel-local-suffix": "text",
  "tel-extension": "text",
  email: "username",
  impp: "url"
}, Cl = ["checkbox", "radio", "file", "submit", "image", "reset", "button"];
function m0(r) {
  return r.startsWith("section-");
}
function p0(r) {
  return r === "shipping" || r === "billing";
}
function g0(r) {
  return f0.includes(r);
}
function y0(r) {
  return ["home", "work", "mobile", "fax", "pager"].includes(r);
}
function b0(r) {
  return h0.includes(r);
}
function E0(r) {
  return r === "webauthn";
}
function v0(r) {
  return m0(r) ? "section" : p0(r) ? "hint" : g0(r) ? "field1" : b0(r) ? "field2" : y0(r) ? "contact" : E0(r) ? "webauthn" : null;
}
function $l(r) {
  const e = [
    "text",
    "multiline",
    "password",
    "url",
    "username",
    "tel",
    "numeric",
    "month",
    "date"
  ];
  return {
    hidden: e,
    text: e.filter((n) => n !== "multiline"),
    search: e.filter((n) => n !== "multiline"),
    password: ["password"],
    url: ["url"],
    email: ["username"],
    tel: ["tel"],
    number: ["numeric"],
    month: ["month"],
    date: ["date"]
  }[r] ?? [];
}
function D0(r, e) {
  return r.is("input") ? Cl.includes(e) : !1;
}
function Be(r) {
  switch (r.msg) {
    case 0:
      return "autocomplete attribute cannot be used on {{ what }}";
    case 1:
      return '"{{ value }}" cannot be used on {{ what }}';
    case 2:
      return '"{{ second }}" must appear before "{{ first }}"';
    case 3:
      return '"{{ token }}" is not a valid autocomplete token or field name';
    case 4:
      return '"{{ second }}" cannot be combined with "{{ first }}"';
    case 5:
      return "autocomplete attribute is missing field name";
  }
}
function w0(r) {
  switch (r.msg) {
    case 0:
      return [
        `\`autocomplete\` attribute cannot be used on \`${r.what}\``,
        "",
        "The following input types cannot use the `autocomplete` attribute:",
        "",
        ...Cl.map((e) => `- \`${e}\``)
      ].join(`
`);
    case 1: {
      const e = `\`"${r.value}"\` cannot be used on \`${r.what}\``;
      if (r.type === "form")
        return [
          e,
          "",
          'The `<form>` element can only use the values `"on"` and `"off"`.'
        ].join(`
`);
      if (r.type === "hidden")
        return [
          e,
          "",
          '`<input type="hidden">` cannot use the values `"on"` and `"off"`.'
        ].join(`
`);
      const t = $l(r.type), n = Al[r.value];
      return [
        e,
        "",
        `\`${r.what}\` allows autocomplete fields from the following group${t.length > 1 ? "s" : ""}:`,
        "",
        ...t.map((s) => `- ${s}`),
        "",
        `The field \`"${r.value}"\` belongs to the group /${n}/ which cannot be used with this input type.`
      ].join(`
`);
    }
    case 2:
      return [
        `\`"${r.second}"\` must appear before \`"${r.first}"\``,
        "",
        "The autocomplete tokens must appear in the following order:",
        "",
        "- Optional section name (`section-` prefix).",
        "- Optional `shipping` or `billing` token.",
        "- Optional `home`, `work`, `mobile`, `fax` or `pager` token (for fields supporting it).",
        "- Field name",
        "- Optional `webauthn` token."
      ].join(`
`);
    case 3:
      return `\`"${r.token}"\` is not a valid autocomplete token or field name`;
    case 4:
      return `\`"${r.second}"\` cannot be combined with \`"${r.first}"\``;
    case 5:
      return "Autocomplete attribute is missing field name";
  }
}
class A0 extends B {
  documentation(e) {
    return {
      description: w0(e),
      url: "https://html-validate.org/rules/valid-autocomplete.html"
    };
  }
  setup() {
    this.on("dom:ready", (e) => {
      const { document: t } = e, n = t.querySelectorAll("[autocomplete]");
      for (const s of n) {
        const i = s.getAttribute("autocomplete");
        if (i.value === null || i.value instanceof ue)
          continue;
        const a = i.valueLocation, o = i.value.toLowerCase(), u = new Me(o, a);
        u.length !== 0 && this.validate(s, o, u, i.keyLocation, a);
      }
    });
  }
  validate(e, t, n, s, i) {
    switch (e.tagName) {
      case "form":
        this.validateFormAutocomplete(e, t, i);
        break;
      case "input":
      case "textarea":
      case "select":
        this.validateControlAutocomplete(e, n, s);
        break;
    }
  }
  validateControlAutocomplete(e, t, n) {
    const s = e.getAttributeValue("type") ?? "text", i = s !== "hidden" ? "expectation" : "anchor";
    if (D0(e, s)) {
      const a = {
        msg: 0,
        what: `<input type="${s}">`
      };
      this.report({
        node: e,
        message: Be(a),
        location: n,
        context: a
      });
      return;
    }
    if (t.includes("on") || t.includes("off")) {
      this.validateOnOff(e, i, t);
      return;
    }
    this.validateTokens(e, t, n);
  }
  validateFormAutocomplete(e, t, n) {
    const s = t.trim();
    if (["on", "off"].includes(s))
      return;
    const i = {
      msg: 1,
      type: "form",
      value: s,
      what: "<form>"
    };
    this.report({
      node: e,
      message: Be(i),
      location: n,
      context: i
    });
  }
  validateOnOff(e, t, n) {
    const s = n.findIndex((o) => o === "on" || o === "off"), i = n.item(s), a = n.location(s);
    if (n.length > 1) {
      const o = {
        msg: 4,
        /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- it must be present of it wouldn't be found */
        first: n.item(s > 0 ? 0 : 1),
        second: i
      };
      this.report({
        node: e,
        message: Be(o),
        location: a,
        context: o
      });
    }
    switch (t) {
      case "expectation":
        return;
      case "anchor": {
        const o = {
          msg: 1,
          type: "hidden",
          value: i,
          what: '<input type="hidden">'
        };
        this.report({
          node: e,
          message: Be(o),
          location: n.location(0),
          context: o
        });
      }
    }
  }
  validateTokens(e, t, n) {
    const s = [];
    for (const { item: a, location: o } of t.iterator()) {
      const u = v0(a);
      if (u)
        s.push(u);
      else {
        const l = {
          msg: 3,
          token: a
        };
        this.report({
          node: e,
          message: Be(l),
          location: o,
          context: l
        });
        return;
      }
    }
    const i = s.map((a) => a === "field1" || a === "field2");
    this.validateFieldPresence(e, t, i, n), this.validateContact(e, t, s), this.validateOrder(e, t, s), this.validateControlGroup(e, t, i);
  }
  /**
   * Ensure that exactly one field name is present from the two field lists.
   */
  validateFieldPresence(e, t, n, s) {
    const i = n.filter(Boolean).length;
    if (i === 0) {
      const a = {
        msg: 5
        /* MissingField */
      };
      this.report({
        node: e,
        message: Be(a),
        location: s,
        context: a
      });
    } else if (i > 1) {
      const a = n.indexOf(!0), o = n.lastIndexOf(!0), u = {
        msg: 4,
        /* eslint-disable @typescript-eslint/no-non-null-assertion -- it must be present of it wouldn't be found */
        first: t.item(a),
        second: t.item(o)
        /* eslint-enable @typescript-eslint/no-non-null-assertion */
      };
      this.report({
        node: e,
        message: Be(u),
        location: t.location(o),
        context: u
      });
    }
  }
  /**
   * Ensure contact token is only used with field names from the second list.
   */
  validateContact(e, t, n) {
    if (n.includes("contact") && n.includes("field1")) {
      const s = n.indexOf("field1"), i = n.indexOf("contact"), a = {
        msg: 4,
        /* eslint-disable @typescript-eslint/no-non-null-assertion -- it must be present of it wouldn't be found */
        first: t.item(s),
        second: t.item(i)
        /* eslint-enable @typescript-eslint/no-non-null-assertion */
      };
      this.report({
        node: e,
        message: Be(a),
        location: t.location(i),
        context: a
      });
    }
  }
  validateOrder(e, t, n) {
    const s = n.map((i) => d0.indexOf(i));
    for (let i = 0; i < s.length - 1; i++)
      if (s[0] > s[i + 1]) {
        const a = {
          msg: 2,
          /* eslint-disable @typescript-eslint/no-non-null-assertion -- it must be present of it wouldn't be found */
          first: t.item(i),
          second: t.item(i + 1)
          /* eslint-enable @typescript-eslint/no-non-null-assertion */
        };
        this.report({
          node: e,
          message: Be(a),
          location: t.location(i + 1),
          context: a
        });
      }
  }
  validateControlGroup(e, t, n) {
    if (n.filter(Boolean).length === 0 || !e.is("input"))
      return;
    const i = e.getAttribute("type"), a = (i == null ? void 0 : i.value) ?? "text";
    if (a instanceof ue)
      return;
    const o = $l(a), u = n.indexOf(!0), l = t.item(u), c = Al[l];
    if (!o.includes(c)) {
      const g = {
        msg: 1,
        type: a,
        value: l,
        what: `<input type="${a}">`
      };
      this.report({
        node: e,
        message: Be(g),
        location: t.location(u),
        context: g
      });
    }
  }
}
const C0 = {
  relaxed: !1
};
class $0 extends B {
  constructor(e) {
    super({ ...C0, ...e });
  }
  static schema() {
    return {
      relaxed: {
        type: "boolean"
      }
    };
  }
  documentation(e) {
    const { relaxed: t } = this.options, { kind: n, id: s } = e, i = this.messages[n].replace('"{{ id }}"', "`{{ id }}`").replace("id", "ID").replace(/^(.)/, (o) => o.toUpperCase()), a = t ? [] : [
      "  - ID must begin with a letter",
      "  - ID must only contain letters, digits, `-` and `_`"
    ];
    return {
      description: [
        `${hl(i, { id: s })}.`,
        "",
        "Under the current configuration the following rules are applied:",
        "",
        "  - ID must not be empty",
        "  - ID must not contain any whitespace characters",
        ...a
      ].join(`
`),
      url: "https://html-validate.org/rules/valid-id.html"
    };
  }
  setup() {
    this.on("attr", this.isRelevant, (e) => {
      const { value: t } = e;
      if (t === null || t instanceof ue)
        return;
      if (t === "") {
        const s = { kind: 1, id: t };
        this.report(e.target, this.messages[s.kind], e.location, s);
        return;
      }
      if (t.match(/\s/)) {
        const s = { kind: 2, id: t };
        this.report(e.target, this.messages[s.kind], e.valueLocation, s);
        return;
      }
      const { relaxed: n } = this.options;
      if (!n) {
        if (t.match(/^[^\p{L}]/u)) {
          const s = { kind: 3, id: t };
          this.report(e.target, this.messages[s.kind], e.valueLocation, s);
          return;
        }
        if (t.match(/[^\p{L}\p{N}_-]/u)) {
          const s = { kind: 4, id: t };
          this.report(e.target, this.messages[s.kind], e.valueLocation, s);
        }
      }
    });
  }
  get messages() {
    return {
      1: 'element id "{{ id }}" must not be empty',
      2: 'element id "{{ id }}" must not contain whitespace',
      3: 'element id "{{ id }}" must begin with a letter',
      4: 'element id "{{ id }}" must only contain letters, digits, dash and underscore characters'
    };
  }
  isRelevant(e) {
    return e.key === "id";
  }
}
class _0 extends B {
  documentation(e) {
    const t = {
      description: "HTML void elements cannot have any content and must not have content or end tag.",
      url: "https://html-validate.org/rules/void-content.html"
    };
    return e && (t.description = `<${e}> is a void element and must not have content or end tag.`), t;
  }
  setup() {
    this.on("tag:end", (e) => {
      const t = e.target;
      t && t.voidElement && t.closed === $e.EndTag && this.report(
        null,
        `End tag for <${t.tagName}> must be omitted`,
        t.location,
        t.tagName
      );
    });
  }
}
const S0 = {
  style: "omit"
};
class R0 extends B {
  constructor(t) {
    super({ ...S0, ...t });
    k(this, "style");
    this.style = T0(this.options.style);
  }
  static schema() {
    return {
      style: {
        enum: ["omit", "selfclose", "selfclosing"],
        type: "string"
      }
    };
  }
  documentation(t) {
    const [n, s] = N0(t.style);
    return {
      description: `The current configuration requires void elements to ${n}, use <${t.tagName}${s}> instead.`,
      url: "https://html-validate.org/rules/void-style.html"
    };
  }
  setup() {
    const { style: t } = this, n = {
      1: this.validateOmitted.bind(this),
      2: this.validateSelfClosed.bind(this)
    }[t];
    this.on("tag:end", (s) => {
      const i = s.previous;
      i.meta && n(i);
    });
  }
  validateOmitted(t) {
    t.voidElement && t.closed === $e.VoidSelfClosed && this.reportError(
      t,
      `Expected omitted end tag <${t.tagName}> instead of self-closing element <${t.tagName}/>`
    );
  }
  validateSelfClosed(t) {
    t.voidElement && t.closed === $e.VoidOmitted && this.reportError(
      t,
      `Expected self-closing element <${t.tagName}/> instead of omitted end-tag <${t.tagName}>`
    );
  }
  reportError(t, n) {
    const s = {
      style: this.style,
      tagName: t.tagName
    };
    super.report(t, n, null, s);
  }
}
function T0(r) {
  switch (r) {
    case "omit":
      return 1;
    case "selfclose":
    case "selfclosing":
      return 2;
    /* istanbul ignore next: covered by schema validation */
    default:
      throw new Error(`Invalid style "${r}" for "void-style" rule`);
  }
}
function N0(r) {
  switch (r) {
    case 1:
      return ["omit end tag", ""];
    case 2:
      return ["be self-closed", "/"];
    // istanbul ignore next: will only happen if new styles are added, otherwise this isn't reached
    default:
      throw new Error("Unknown style");
  }
}
class F0 extends B {
  documentation() {
    return {
      description: "WCAG 2.1 requires each `<a href>` anchor link to have a text describing the purpose of the link using either plain text or an `<img>` with the `alt` attribute set.",
      url: "https://html-validate.org/rules/wcag/h30.html"
    };
  }
  setup() {
    this.on("dom:ready", (e) => {
      const t = e.document.getElementsByTagName("a");
      for (const n of t) {
        if (!n.hasAttribute("href") || !Ze(n) || lt(n, { ignoreHiddenRoot: !0 }) !== Ie.EMPTY_TEXT || n.querySelectorAll("img").some((o) => ln(o)))
          continue;
        const a = n.querySelectorAll("[aria-label]");
        Xo(n) || a.some((o) => Xo(o)) || this.report(n, "Anchor link must have a text describing its purpose");
      }
    });
  }
}
class P0 extends B {
  documentation() {
    return {
      description: "WCAG 2.1 requires each `<form>` element to have at least one submit button.",
      url: "https://html-validate.org/rules/wcag/h32.html"
    };
  }
  setup() {
    const t = this.getTagsWithProperty("form").join(",");
    this.on("dom:ready", (n) => {
      const { document: s } = n, i = s.querySelectorAll(t);
      for (const a of i)
        O0(a) || k0(s, a) || this.report(a, `<${a.tagName}> element must have a submit button`);
    });
  }
}
function _l(r) {
  const e = r.getAttribute("type");
  return !!(!e || e.valueMatches(/submit|image/));
}
function I0(r, e) {
  const t = e.getAttribute("form");
  return !!(t != null && t.valueMatches(r, !0));
}
function O0(r) {
  return r.querySelectorAll("button,input").filter(_l).filter((t) => !t.hasAttribute("form")).length > 0;
}
function k0(r, e) {
  const { id: t } = e;
  return t ? r.querySelectorAll("button[form],input[form]").filter(_l).filter((s) => I0(t, s)).length > 0 : !1;
}
class q0 extends B {
  documentation() {
    return {
      description: [
        "WCAG 2.1 requires all images used as submit buttons to have a non-empty textual description using the `alt` attribute.",
        'The alt text cannot be empty (`alt=""`).'
      ].join(`
`),
      url: "https://html-validate.org/rules/wcag/h36.html"
    };
  }
  setup() {
    this.on("tag:end", (e) => {
      const t = e.previous;
      if (t.tagName === "input" && t.getAttributeValue("type") === "image" && Ze(t) && !ln(t)) {
        const n = "image used as submit button must have non-empty alt text", s = t.getAttribute("alt");
        this.report({
          node: t,
          message: n,
          location: s ? s.keyLocation : t.location
        });
      }
    });
  }
}
const x0 = {
  allowEmpty: !0,
  alias: []
};
class L0 extends B {
  constructor(e) {
    super({ ...x0, ...e }), Array.isArray(this.options.alias) || (this.options.alias = [this.options.alias]);
  }
  static schema() {
    return {
      alias: {
        anyOf: [
          {
            items: {
              type: "string"
            },
            type: "array"
          },
          {
            type: "string"
          }
        ]
      },
      allowEmpty: {
        type: "boolean"
      }
    };
  }
  documentation() {
    return {
      description: "Both HTML5 and WCAG 2.0 requires images to have a alternative text for each image.",
      url: "https://html-validate.org/rules/wcag/h37.html"
    };
  }
  setup() {
    this.on("dom:ready", (e) => {
      const { document: t } = e, n = t.querySelectorAll("img");
      for (const s of n)
        this.validateNode(s);
    });
  }
  validateNode(e) {
    if (!Ze(e) || e.getAttributeValue("alt") || e.hasAttribute("alt") && this.options.allowEmpty)
      return;
    for (const n of this.options.alias)
      if (e.getAttribute(n))
        return;
    const t = e.annotatedName;
    if (e.hasAttribute("alt")) {
      const n = e.getAttribute("alt");
      this.report(e, `${t} cannot have empty "alt" attribute`, n.keyLocation);
    } else
      this.report(e, `${t} is missing required "alt" attribute`, e.location);
  }
}
var Au;
const { enum: Sl } = (Au = Nu.th.attributes) == null ? void 0 : Au.scope, B0 = We(Sl);
class j0 extends B {
  documentation() {
    return {
      description: "H63: Using the scope attribute to associate header cells and data cells in data tables",
      url: "https://html-validate.org/rules/wcag/h63.html"
    };
  }
  setup() {
    this.on("tag:ready", (e) => {
      const t = e.target;
      if (t.tagName !== "th")
        return;
      const n = t.getAttribute("scope"), s = n == null ? void 0 : n.value;
      if (s instanceof ue || s && Sl.includes(s))
        return;
      const i = `<th> element must have a valid scope attribute: ${B0}`, a = (n == null ? void 0 : n.valueLocation) ?? (n == null ? void 0 : n.keyLocation) ?? t.location;
      this.report(t, i, a);
    });
  }
}
class M0 extends B {
  documentation() {
    return {
      description: "A decorative image cannot have a title attribute. Either remove `title` or add a descriptive `alt` text.",
      url: "https://html-validate.org/rules/wcag/h67.html"
    };
  }
  setup() {
    this.on("tag:end", (e) => {
      const t = e.target;
      if (!t || t.tagName !== "img")
        return;
      const n = t.getAttribute("title");
      if (!n || n.value === "")
        return;
      const s = t.getAttributeValue("alt");
      s && s !== "" || this.report(t, "<img> with empty alt text cannot have title attribute", n.keyLocation);
    });
  }
}
class U0 extends B {
  documentation() {
    return {
      description: "H71: Providing a description for groups of form controls using fieldset and legend elements",
      url: "https://html-validate.org/rules/wcag/h71.html"
    };
  }
  setup() {
    this.on("dom:ready", (e) => {
      const { document: t } = e, n = t.querySelectorAll(this.selector);
      for (const s of n)
        this.validate(s);
    });
  }
  validate(e) {
    e.querySelectorAll("> legend").length === 0 && this.reportNode(e);
  }
  reportNode(e) {
    super.report(e, `${e.annotatedName} must have a <legend> as the first child`);
  }
  get selector() {
    return this.getTagsDerivedFrom("fieldset").join(",");
  }
}
const V0 = {
  "wcag/h30": F0,
  "wcag/h32": P0,
  "wcag/h36": q0,
  "wcag/h37": L0,
  "wcag/h63": j0,
  "wcag/h67": M0,
  "wcag/h71": U0
}, mi = {
  "allowed-links": mp,
  "area-alt": bp,
  "aria-hidden-body": Ep,
  "aria-label-misuse": Ap,
  "attr-case": $p,
  "attr-delimiter": Kp,
  "attr-pattern": Zp,
  "attr-quotes": ng,
  "attr-spacing": ig,
  "attribute-allowed-values": og,
  "attribute-boolean-style": lg,
  "attribute-empty-style": hg,
  "attribute-misuse": Eg,
  "class-pattern": Ag,
  "close-attr": Cg,
  "close-order": _g,
  deprecated: Rg,
  "deprecated-rule": Ng,
  "doctype-html": Fg,
  "doctype-style": Ig,
  "element-case": kg,
  "element-name": qg,
  "element-permitted-content": Bg,
  "element-permitted-occurrences": jg,
  "element-permitted-order": Mg,
  "element-permitted-parent": Gg,
  "element-required-ancestor": Wg,
  "element-required-attributes": Xg,
  "element-required-content": Jg,
  "empty-heading": ey,
  "empty-title": ty,
  "form-dup-name": uy,
  "heading-level": hy,
  "hidden-focusable": gy,
  "id-pattern": by,
  "input-attributes": vy,
  "input-missing-label": _y,
  "long-title": Ny,
  "map-dup-name": ky,
  "map-id-name": xy,
  "meta-refresh": Py,
  "missing-doctype": Ly,
  "multiple-labeled-controls": By,
  "name-pattern": My,
  "no-abstract-role": Vy,
  "no-autoplay": Gy,
  "no-conditional-comment": zy,
  "no-deprecated-attr": Ky,
  "no-dup-attr": Wy,
  "no-dup-class": Xy,
  "no-dup-id": Yy,
  "no-implicit-button-type": Qy,
  "no-implicit-input-type": eb,
  "no-implicit-close": tb,
  "no-inline-style": nb,
  "no-missing-references": ib,
  "no-multiple-main": ab,
  "no-raw-characters": fb,
  "no-redundant-aria-label": mb,
  "no-redundant-for": pb,
  "no-redundant-role": gb,
  "no-self-closing": Eb,
  "no-style-tag": Db,
  "no-trailing-whitespace": wb,
  "no-unknown-elements": Cb,
  "no-unused-disable": $b,
  "no-utf8-bom": _b,
  "prefer-button": Nb,
  "prefer-native-element": Pb,
  "prefer-tbody": Ib,
  "require-csp-nonce": kb,
  "require-sri": Mb,
  "script-element": Ub,
  "script-type": Hb,
  "svg-focusable": Gb,
  "tel-non-breaking": Yb,
  "text-content": hi,
  "unique-landmark": s0,
  "unrecognized-char-ref": c0,
  "valid-autocomplete": A0,
  "valid-id": $0,
  "void-content": _0,
  "void-style": R0,
  ...V0
};
function H0(r) {
  const e = [];
  function t(s) {
    let i = "";
    return s.id && (i += `#${s.id}`), s.hasAttribute("class") && (i += `.${s.classList.join(".")}`), i;
  }
  function n(s, i, a, o) {
    const u = s.parent ? s.parent.childElements.length : 0, l = o === u - 1;
    if (s.parent) {
      const c = l ? "└" : "├";
      e.push(`${a}${c}── ${s.tagName}${t(s)}`);
    } else
      e.push("(root)");
    s.childElements.forEach((c, g) => {
      const v = l ? " " : "│", D = i > 0 ? `${a}${v}   ` : "";
      n(c, i + 1, D, g);
    });
  }
  return n(r, 0, "", 0), e;
}
function ae(r) {
  return r && typeof r == "object" && "then" in r && typeof r.then == "function";
}
new Set(Object.keys(mi));
var G0 = {};
const z0 = {
  rules: {
    "area-alt": ["error", { accessible: !0 }],
    "aria-hidden-body": "error",
    "aria-label-misuse": ["error", { allowAnyNamable: !1 }],
    "deprecated-rule": "warn",
    "empty-heading": "error",
    "empty-title": "error",
    "hidden-focusable": "error",
    "meta-refresh": "error",
    "multiple-labeled-controls": "error",
    "no-abstract-role": "error",
    "no-autoplay": ["error", { include: ["audio", "video"] }],
    "no-dup-id": "error",
    "no-implicit-button-type": "error",
    "no-redundant-aria-label": "error",
    "no-redundant-for": "error",
    "no-redundant-role": "error",
    "prefer-native-element": "error",
    "svg-focusable": "off",
    "text-content": "error",
    "unique-landmark": "error",
    "valid-autocomplete": "error",
    "wcag/h30": "error",
    "wcag/h32": "error",
    "wcag/h36": "error",
    "wcag/h37": "error",
    "wcag/h63": "error",
    "wcag/h67": "error",
    "wcag/h71": "error"
  }
}, K0 = {
  rules: {
    /* doctype is usually not included when fetching source code from browser */
    "missing-doctype": "off",
    /* some frameworks (such as jQuery) often uses inline style, e.g. for
     * showing/hiding elements so it is counter-productive to check for inline
     * style. If anything it should be used on original sorce code only. */
    "no-inline-style": "off",
    /* scripts will often add markup with trailing whitespace */
    "no-trailing-whitespace": "off",
    /* browser normalizes boolean attributes */
    "attribute-boolean-style": "off",
    "attribute-empty-style": "off",
    /* the browser will often do what it wants, out of users control */
    "void-style": "off",
    "no-self-closing": "off"
  }
}, W0 = {
  rules: {
    "input-missing-label": "error",
    "heading-level": "error",
    "missing-doctype": "error",
    "no-missing-references": "error",
    "require-sri": "error"
  }
}, X0 = {
  rules: {
    "attr-quotes": "off",
    "doctype-style": "off",
    "void-style": "off"
  }
}, Y0 = {
  rules: {
    "area-alt": ["error", { accessible: !0 }],
    "aria-hidden-body": "error",
    "aria-label-misuse": ["error", { allowAnyNamable: !1 }],
    "attr-case": "error",
    "attr-delimiter": "error",
    "attr-quotes": "error",
    "attr-spacing": "error",
    "attribute-allowed-values": "error",
    "attribute-boolean-style": "error",
    "attribute-empty-style": "error",
    "attribute-misuse": "error",
    "close-attr": "error",
    "close-order": "error",
    deprecated: "error",
    "deprecated-rule": "warn",
    "doctype-html": "error",
    "doctype-style": "error",
    "element-case": "error",
    "element-name": "error",
    "element-permitted-content": "error",
    "element-permitted-occurrences": "error",
    "element-permitted-order": "error",
    "element-permitted-parent": "error",
    "element-required-ancestor": "error",
    "element-required-attributes": "error",
    "element-required-content": "error",
    "empty-heading": "error",
    "empty-title": "error",
    "form-dup-name": "error",
    "hidden-focusable": "error",
    "input-attributes": "error",
    "long-title": "error",
    "map-dup-name": "error",
    "map-id-name": "error",
    "meta-refresh": "error",
    "multiple-labeled-controls": "error",
    "no-abstract-role": "error",
    "no-autoplay": ["error", { include: ["audio", "video"] }],
    "no-conditional-comment": "error",
    "no-deprecated-attr": "error",
    "no-dup-attr": "error",
    "no-dup-class": "error",
    "no-dup-id": "error",
    "no-implicit-button-type": "error",
    "no-implicit-input-type": "error",
    "no-implicit-close": "error",
    "no-inline-style": "error",
    "no-multiple-main": "error",
    "no-raw-characters": "error",
    "no-redundant-aria-label": "error",
    "no-redundant-for": "error",
    "no-redundant-role": "error",
    "no-self-closing": "error",
    "no-trailing-whitespace": "error",
    "no-utf8-bom": "error",
    "no-unused-disable": "error",
    "prefer-button": "error",
    "prefer-native-element": "error",
    "prefer-tbody": "error",
    "script-element": "error",
    "script-type": "error",
    "svg-focusable": "off",
    "tel-non-breaking": "error",
    "text-content": "error",
    "unique-landmark": "error",
    "unrecognized-char-ref": "error",
    "valid-autocomplete": "error",
    "valid-id": ["error", { relaxed: !1 }],
    void: "off",
    "void-content": "error",
    "void-style": "error",
    "wcag/h30": "error",
    "wcag/h32": "error",
    "wcag/h36": "error",
    "wcag/h37": "error",
    "wcag/h63": "error",
    "wcag/h67": "error",
    "wcag/h71": "error"
  }
}, J0 = {
  rules: {
    "area-alt": ["error", { accessible: !1 }],
    "aria-label-misuse": ["error", { allowAnyNamable: !0 }],
    "attr-spacing": "error",
    "attribute-allowed-values": "error",
    "attribute-misuse": "error",
    "close-attr": "error",
    "close-order": "error",
    deprecated: "error",
    "deprecated-rule": "warn",
    "doctype-html": "error",
    "element-name": "error",
    "element-permitted-content": "error",
    "element-permitted-occurrences": "error",
    "element-permitted-order": "error",
    "element-permitted-parent": "error",
    "element-required-ancestor": "error",
    "element-required-attributes": "error",
    "element-required-content": "error",
    "map-dup-name": "error",
    "map-id-name": "error",
    "multiple-labeled-controls": "error",
    "no-abstract-role": "error",
    "no-deprecated-attr": "error",
    "no-dup-attr": "error",
    "no-dup-id": "error",
    "no-multiple-main": "error",
    "no-raw-characters": ["error", { relaxed: !0 }],
    "no-unused-disable": "error",
    "script-element": "error",
    "unrecognized-char-ref": "error",
    "valid-autocomplete": "error",
    "valid-id": ["error", { relaxed: !0 }],
    "void-content": "error"
  }
}, Q0 = {
  "html-validate:a11y": z0,
  "html-validate:browser": K0,
  "html-validate:document": W0,
  "html-validate:prettier": X0,
  "html-validate:recommended": Y0,
  "html-validate:standard": J0
};
class hu {
  /**
   * @internal
   */
  constructor({ metaTable: e, plugins: t, rules: n, transformers: s }, i) {
    k(this, "metaTable");
    k(this, "plugins");
    k(this, "rules");
    k(this, "transformers");
    /** The original data this resolved configuration was created from */
    k(this, "original");
    /**
     * @internal
     */
    k(this, "cache");
    this.metaTable = e, this.plugins = t, this.rules = n, this.transformers = s, this.cache = /* @__PURE__ */ new Map(), this.original = i;
  }
  /**
   * Returns the (merged) configuration data used to create this resolved
   * configuration.
   */
  getConfigData() {
    return this.original;
  }
  getMetaTable() {
    return this.metaTable;
  }
  getPlugins() {
    return this.plugins;
  }
  getRules() {
    return this.rules;
  }
  /**
   * Returns true if a transformer matches given filename.
   *
   * @public
   */
  canTransform(e) {
    return !!this.findTransformer(e);
  }
  /**
   * @internal
   */
  findTransformer(e) {
    return this.transformers.find((n) => n.pattern.test(e)) ?? null;
  }
}
function cn(r, e) {
  return r in e;
}
function Rl(r) {
  return cn("resolveConfig", r);
}
function Tl(r) {
  return cn("resolveElements", r);
}
function Nl(r) {
  return cn("resolvePlugin", r);
}
function Fl(r) {
  return cn("resolveTransformer", r);
}
function Z0(r, e, t) {
  for (const n of r.filter(Rl)) {
    const s = n.resolveConfig(e, t);
    if (ae(s))
      return eE(r, e, t);
    if (s)
      return s;
  }
  throw new le(`Failed to load configuration from "${e}"`);
}
async function eE(r, e, t) {
  for (const n of r.filter(Rl)) {
    const s = await n.resolveConfig(e, t);
    if (s)
      return s;
  }
  throw new le(`Failed to load configuration from "${e}"`);
}
function tE(r, e, t) {
  for (const n of r.filter(Tl)) {
    const s = n.resolveElements(e, t);
    if (ae(s))
      return rE(r, e, t);
    if (s)
      return s;
  }
  throw new le(`Failed to load elements from "${e}"`);
}
async function rE(r, e, t) {
  for (const n of r.filter(Tl)) {
    const s = await n.resolveElements(e, t);
    if (s)
      return s;
  }
  throw new le(`Failed to load elements from "${e}"`);
}
function nE(r, e, t) {
  for (const n of r.filter(Nl)) {
    const s = n.resolvePlugin(e, t);
    if (ae(s))
      return sE(r, e, t);
    if (s)
      return s;
  }
  throw new le(`Failed to load plugin from "${e}"`);
}
async function sE(r, e, t) {
  for (const n of r.filter(Nl)) {
    const s = await n.resolvePlugin(e, t);
    if (s)
      return s;
  }
  throw new le(`Failed to load plugin from "${e}"`);
}
function iE(r, e, t) {
  for (const n of r.filter(Fl)) {
    const s = n.resolveTransformer(e, t);
    if (ae(s))
      return aE(r, e, t);
    if (s)
      return s;
  }
  throw new le(`Failed to load transformer from "${e}"`);
}
async function aE(r, e, t) {
  for (const n of r.filter(Fl)) {
    const s = await n.resolveTransformer(e, t);
    if (s)
      return s;
  }
  throw new le(`Failed to load transformer from "${e}"`);
}
const pi = new Gs({ strict: !0, strictTuples: !0, strictTypes: !0 });
pi.addMetaSchema(ai);
pi.addKeyword(ul);
const mu = pi.compile(ci);
function oE(r, e) {
  return e;
}
function it(r, e) {
  const t = qt(r, { ...e, rules: {} });
  e.rules && (t.rules = qt(t.rules, e.rules, { arrayMerge: oE }));
  const n = !!r.root || !!e.root;
  return n && (t.root = n), t;
}
function pu(r) {
  return Array.isArray(r) ? r : [r];
}
function uE(r) {
  return Object.entries(r).map(([e, t]) => {
    const n = new RegExp(e);
    return typeof t == "string" ? { kind: "import", pattern: n, name: t } : { kind: "function", pattern: n, function: t };
  });
}
class de {
  /**
   * @internal
   */
  constructor(e, t) {
    k(this, "config");
    k(this, "configurations");
    k(this, "resolvers");
    k(this, "metaTable");
    k(this, "plugins");
    k(this, "transformers", []);
    const n = {
      extends: [],
      plugins: [],
      rules: {},
      transform: {}
    };
    this.config = it(n, t), this.configurations = /* @__PURE__ */ new Map(), this.resolvers = pu(e), this.metaTable = null, this.plugins = [], this.transformers = uE(this.config.transform ?? {});
  }
  /**
   * Create a new blank configuration. See also `Config.defaultConfig()`.
   */
  static empty() {
    return new de([], {
      extends: [],
      rules: {},
      plugins: [],
      transform: {}
    });
  }
  /**
   * Create configuration from object.
   */
  static fromObject(e, t, n = null) {
    return de.validate(t, n), de.create(e, t);
  }
  /**
   * Read configuration from filename.
   *
   * Note: this reads configuration data from a file. If you intent to load
   * configuration for a file to validate use `ConfigLoader.fromTarget()`.
   *
   * @internal
   * @param filename - The file to read from
   */
  static fromFile(e, t) {
    const n = Z0(pu(e), t, { cache: !1 });
    return ae(n) ? n.then((s) => de.fromObject(e, s, t)) : de.fromObject(e, n, t);
  }
  /**
   * Validate configuration data.
   *
   * Throws SchemaValidationError if invalid.
   *
   * @internal
   */
  static validate(e, t = null) {
    if (!mu(e))
      throw new Vr(
        t,
        "Invalid configuration",
        e,
        ci,
        /* istanbul ignore next: will be set when a validation error has occurred */
        mu.errors ?? []
      );
    if (e.rules) {
      const s = de.getRulesObject(e.rules);
      for (const [i, [, a]] of s.entries()) {
        const o = mi[i], u = `/rules/${i}/1`;
        B.validateOptions(o, i, u, a, t, e);
      }
    }
  }
  /**
   * Load a default configuration object.
   */
  static defaultConfig() {
    return new de([], G0);
  }
  /**
   * @internal
   */
  static create(e, t) {
    const n = new de(e, t), s = n.loadPlugins(n.config.plugins ?? []);
    return ae(s) ? s.then((i) => n.init(t, i)) : n.init(t, s);
  }
  init(e, t) {
    this.plugins = t, this.configurations = this.loadConfigurations(this.plugins), this.extendMeta(this.plugins);
    const n = (i) => (this.config = i, this.config.extends = [], e.rules && (this.config = it(this.config, { rules: e.rules })), this), s = this.extendConfig(this.config.extends ?? []);
    return ae(s) ? s.then((i) => n(i)) : n(s);
  }
  /**
   * Returns true if this configuration is marked as "root".
   */
  isRootFound() {
    return !!this.config.root;
  }
  /**
   * Returns a new configuration as a merge of the two. Entries from the passed
   * object takes priority over this object.
   *
   * @public
   * @param rhs - Configuration to merge with this one.
   */
  merge(e, t) {
    const n = new de(e, it(this.config, t.config)), s = n.loadPlugins(n.config.plugins ?? []);
    return ae(s) ? s.then((i) => (n.plugins = i, n.configurations = n.loadConfigurations(n.plugins), n.extendMeta(n.plugins), n)) : (n.plugins = s, n.configurations = n.loadConfigurations(n.plugins), n.extendMeta(n.plugins), n);
  }
  extendConfig(e) {
    if (e.length === 0)
      return this.config;
    let t = {};
    for (const n of e) {
      let s;
      if (this.configurations.has(n))
        s = this.configurations.get(n);
      else {
        const i = de.fromFile(this.resolvers, n);
        if (ae(i))
          return this.extendConfigAsync(e);
        s = i.config;
      }
      t = it(t, s);
    }
    return it(t, this.config);
  }
  async extendConfigAsync(e) {
    let t = {};
    for (const n of e) {
      let s;
      this.configurations.has(n) ? s = this.configurations.get(n) : s = (await de.fromFile(this.resolvers, n)).config, t = it(t, s);
    }
    return it(t, this.config);
  }
  /**
   * Get element metadata.
   *
   * @internal
   */
  getMetaTable() {
    if (this.metaTable)
      return this.metaTable;
    const e = new zh();
    for (const i of this.getPlugins())
      i.elementSchema && e.extendValidationSchema(i.elementSchema);
    const t = Array.from(this.config.elements ?? ["html5"]), n = (i) => {
      const a = this.getElementsFromEntry(i);
      if (ae(a))
        return a.then((o) => {
          const [u, l] = o;
          e.loadFromObject(u, l);
          const c = t.shift();
          if (c)
            return n(c);
        });
      {
        const [o, u] = a;
        e.loadFromObject(o, u);
        const l = t.shift();
        if (l)
          return n(l);
      }
    }, s = t.shift();
    if (s) {
      const i = n(s);
      if (ae(i))
        return i.then(() => (e.init(), this.metaTable = e));
    }
    return e.init(), this.metaTable = e;
  }
  getElementsFromEntry(e) {
    if (typeof e != "string")
      return [e, null];
    const t = Qc[e];
    if (t)
      return [t, null];
    try {
      const n = tE(this.resolvers, e, { cache: !1 });
      return ae(n) ? n.then((s) => [s, e]) : [n, e];
    } catch (n) {
      const s = n instanceof Error ? n.message : String(n);
      throw new he(
        `Failed to load elements from "${e}": ${s}`,
        vt(n)
      );
    }
  }
  /**
   * Get a copy of internal configuration data.
   *
   * @internal primary purpose is unittests
   */
  /* istanbul ignore next: used for testing only */
  get() {
    return { ...this.config };
  }
  /**
   * Get all configured rules, their severity and options.
   *
   * @internal
   */
  getRules() {
    return de.getRulesObject(this.config.rules ?? {});
  }
  static getRulesObject(e) {
    const t = /* @__PURE__ */ new Map();
    for (const [n, s] of Object.entries(e)) {
      let i = s;
      Array.isArray(i) ? i.length === 1 && (i = [i[0], {}]) : i = [i, {}];
      const a = jm(i[0]);
      t.set(n, [a, i[1]]);
    }
    return t;
  }
  /**
   * Get all configured plugins.
   *
   * @internal
   */
  getPlugins() {
    return this.plugins;
  }
  /**
   * Get all configured transformers.
   *
   * @internal
   */
  getTransformers() {
    return this.transformers;
  }
  loadPlugins(e) {
    const t = [], n = Array.from(e), s = (a, o) => {
      if (typeof a != "string") {
        const u = a;
        u.name = u.name || `:unnamedPlugin@${String(o + 1)}`, u.originalName = `:unnamedPlugin@${String(o + 1)}`, t.push(u);
        const l = n.shift();
        if (l)
          return s(l, o + 1);
      } else
        try {
          const u = nE(this.resolvers, a, { cache: !0 });
          if (ae(u))
            return u.then((l) => {
              l.name = l.name || a, l.originalName = a, t.push(l);
              const c = n.shift();
              if (c)
                return s(c, o + 1);
            });
          {
            u.name = u.name || a, u.originalName = a, t.push(u);
            const l = n.shift();
            if (l)
              return s(l, o + 1);
          }
        } catch (u) {
          const l = u instanceof Error ? u.message : String(u);
          throw new he(`Failed to load plugin "${a}": ${l}`, vt(u));
        }
    }, i = n.shift();
    if (i) {
      const a = s(i, 0);
      if (ae(a))
        return a.then(() => t);
    }
    return t;
  }
  loadConfigurations(e) {
    const t = /* @__PURE__ */ new Map();
    for (const [n, s] of Object.entries(Q0))
      de.validate(s, n), t.set(n, s);
    for (const n of e)
      for (const [s, i] of Object.entries(n.configs ?? {}))
        i && (de.validate(i, s), t.set(`${n.name}:${s}`, i), n.name !== n.originalName && t.set(`${n.originalName}:${s}`, i));
    return t;
  }
  extendMeta(e) {
    for (const t of e) {
      if (!t.elementSchema)
        continue;
      const { properties: n } = t.elementSchema;
      if (n)
        for (const [s, i] of Object.entries(n)) {
          const a = s;
          i.copyable && !ks.includes(a) && ks.push(a);
        }
    }
  }
  /**
   * Resolve all configuration and return a [[ResolvedConfig]] instance.
   *
   * A resolved configuration will merge all extended configs and load all
   * plugins and transformers, and normalize the rest of the configuration.
   *
   * @public
   */
  resolve() {
    const e = this.resolveData();
    return ae(e) ? e.then((t) => new hu(t, this.get())) : new hu(e, this.get());
  }
  /**
   * Same as [[resolve]] but returns the raw configuration data instead of
   * [[ResolvedConfig]] instance. Mainly used for testing.
   *
   * @internal
   */
  resolveData() {
    const e = this.getMetaTable();
    return ae(e) ? e.then((t) => ({
      metaTable: t,
      plugins: this.getPlugins(),
      rules: this.getRules(),
      transformers: this.transformers
    })) : {
      metaTable: e,
      plugins: this.getPlugins(),
      rules: this.getRules(),
      transformers: this.transformers
    };
  }
}
class Pl {
  /**
   * Create a new ConfigLoader.
   *
   * @param resolvers - Sorted list of resolvers to use (in order).
   * @param configData - Default configuration (which all configurations will inherit from).
   */
  constructor(e, t) {
    k(this, "_globalConfig");
    k(this, "_configData");
    k(this, "resolvers");
    this.resolvers = e, this._configData = t, this._globalConfig = null;
  }
  /**
   * Set a new default configuration on this loader. Resets cached global
   * configuration.
   *
   * @internal
   */
  setConfigData(e) {
    this._configData = e, this._globalConfig = null;
  }
  /**
   * Get the global configuration.
   *
   * @returns A promise resolving to the global configuration.
   */
  getGlobalConfig() {
    if (this._globalConfig)
      return this._globalConfig;
    const e = this._configData ? this.loadFromObject(this._configData) : this.defaultConfig();
    return ae(e) ? e.then((t) => (this._globalConfig = t, this._globalConfig)) : (this._globalConfig = e, this._globalConfig);
  }
  /**
   * Get the global configuration.
   *
   * The synchronous version does not support async resolvers.
   *
   * @returns The global configuration.
   */
  getGlobalConfigSync() {
    if (this._globalConfig)
      return this._globalConfig;
    const e = this._configData ? this.loadFromObject(this._configData) : this.defaultConfig();
    if (ae(e))
      throw new le("Cannot load async config from sync function");
    return this._globalConfig = e, this._globalConfig;
  }
  /**
   * @internal
   */
  getResolvers() {
    return this.resolvers;
  }
  /**
   * @internal For testing only
   */
  async _getGlobalConfig() {
    return (await this.getGlobalConfig()).get();
  }
  empty() {
    return de.empty();
  }
  /**
   * Load configuration from object.
   */
  loadFromObject(e, t) {
    return de.fromObject(this.resolvers, e, t);
  }
  /**
   * Load configuration from filename.
   */
  loadFromFile(e) {
    return de.fromFile(this.resolvers, e);
  }
}
class lE {
  constructor() {
    k(this, "listeners");
    this.listeners = {};
  }
  /**
   * Add an event listener.
   *
   * @param event - Event names (comma separated) or '*' for any event.
   * @param callback - Called any time even triggers.
   * @returns Unregistration function.
   */
  on(e, t) {
    const { listeners: n } = this, s = e.split(",").map((i) => i.trim());
    for (const i of s) {
      const a = n[i] ?? [];
      n[i] = a, a.push(t);
    }
    return () => {
      for (const i of s) {
        const a = n[i];
        this.listeners[i] = a.filter((o) => o !== t);
      }
    };
  }
  /**
   * Add a onetime event listener. The listener will automatically be removed
   * after being triggered once.
   *
   * @param event - Event names (comma separated) or '*' for any event.
   * @param callback - Called any time even triggers.
   * @returns Unregistration function.
   */
  once(e, t) {
    const n = this.on(e, (s, i) => {
      t(s, i), n();
    });
    return n;
  }
  /**
   * Trigger event causing all listeners to be called.
   *
   * @param event - Event name.
   * @param data - Event data.
   */
  trigger(e, t) {
    for (const n of this.getCallbacks(e))
      n.call(null, e, t);
  }
  getCallbacks(e) {
    const { listeners: t } = this, n = t[e] ?? [], s = t["*"] ?? [];
    return [...n, ...s];
  }
}
const cE = /<!(?:--)?\[(.*?)\](?:--)?>/g;
function* dE(r, e) {
  let t;
  for (; (t = cE.exec(r)) !== null; ) {
    const n = t[1], s = t.index, i = s + t[0].length, a = fe(e, s, i, r);
    yield {
      expression: n,
      location: a
    };
  }
}
class xr extends Error {
  constructor(t, n) {
    super(n);
    k(this, "location");
    this.location = t;
  }
}
function fE(r) {
  return !!(r && r.type === Y.ATTR_VALUE);
}
function hE(r, e) {
  return r === "svg" && ["title", "desc"].includes(e);
}
function mE(r) {
  return ["enable", "disable", "disable-block", "disable-next"].includes(r);
}
class Re {
  /**
   * Create a new parser instance.
   *
   * @public
   * @param config - Configuration
   */
  constructor(e) {
    k(this, "event");
    k(this, "metaTable");
    k(this, "currentNamespace", "");
    k(this, "dom");
    this.event = new lE(), this.dom = null, this.metaTable = e.getMetaTable();
  }
  /**
   * Parse HTML markup.
   *
   * @public
   * @param source - HTML markup.
   * @returns DOM tree representing the HTML markup.
   */
  parseHtml(e) {
    typeof e == "string" && (e = {
      data: e,
      filename: "inline",
      line: 1,
      column: 1,
      offset: 0
    }), this.trigger("parse:begin", {
      location: null
    }), this.dom = new Fm({
      filename: e.filename,
      offset: e.offset,
      line: e.line,
      column: e.column,
      size: 0
    }), this.trigger("dom:load", {
      source: e,
      location: null
    });
    const n = new yl().tokenize(e);
    let s = this.next(n);
    for (; !s.done; ) {
      const i = s.value;
      this.consume(e, i, n), s = this.next(n);
    }
    return this.dom.resolveMeta(this.metaTable), this.dom.root.cacheEnable(), this.trigger("dom:ready", {
      document: this.dom,
      source: e,
      /* disable location for this event so rules can use implicit node location
       * instead */
      location: null
    }), this.trigger("parse:end", {
      location: null
    }), this.dom.root;
  }
  /**
   * Detect optional end tag.
   *
   * Some tags have optional end tags (e.g. <ul><li>foo<li>bar</ul> is
   * valid). The parser handles this by checking if the element on top of the
   * stack when is allowed to omit.
   */
  closeOptional(e) {
    var a;
    const t = this.dom.getActive();
    if (!((a = t.meta) != null && a.implicitClosed))
      return !1;
    const n = e.data[2], s = !e.data[1], i = t.meta.implicitClosed;
    return s ? i.includes(n) : t.is(n) ? !1 : !!(t.parent && t.parent.is(n) && i.includes(t.tagName));
  }
  /**
   * @internal
   */
  /* eslint-disable-next-line complexity -- there isn't really a good other way to structure this method (that is still readable) */
  consume(e, t, n) {
    switch (t.type) {
      case Y.UNICODE_BOM:
        break;
      case Y.TAG_OPEN:
        this.consumeTag(e, t, n);
        break;
      case Y.WHITESPACE:
        this.trigger("whitespace", {
          text: t.data[0],
          location: t.location
        }), this.appendText(t.data[0], t.location);
        break;
      case Y.DIRECTIVE:
        this.consumeDirective(t);
        break;
      case Y.CONDITIONAL:
        this.consumeConditional(t);
        break;
      case Y.COMMENT:
        this.consumeComment(t);
        break;
      case Y.DOCTYPE_OPEN:
        this.consumeDoctype(t, n);
        break;
      case Y.TEXT:
      case Y.TEMPLATING:
        this.appendText(t.data[0], t.location);
        break;
      case Y.EOF:
        this.closeTree(e, t.location);
        break;
    }
  }
  /**
   * @internal
   */
  /* eslint-disable-next-line complexity -- technical debt, chould be refactored a bit */
  consumeTag(e, t, n) {
    var v;
    const s = Array.from(
      this.consumeUntil(n, Y.TAG_CLOSE, t.location)
    ), i = s.slice(-1)[0], a = this.closeOptional(t), o = a ? this.dom.getActive().parent : this.dom.getActive(), u = Qe.fromTokens(
      t,
      i,
      o,
      this.metaTable,
      this.currentNamespace
    ), l = !t.data[1], c = !l || u.closed !== $e.Open, g = (v = u.meta) == null ? void 0 : v.foreign;
    if (a) {
      const D = this.dom.getActive();
      D.closed = $e.ImplicitClosed, this.closeElement(e, u, D, t.location), this.dom.popActive();
    }
    l && (this.dom.pushActive(u), this.trigger("tag:start", {
      target: u,
      location: t.location
    }));
    for (let D = 0; D < s.length; D++) {
      const A = s[D];
      switch (A.type) {
        case Y.WHITESPACE:
          break;
        case Y.ATTR_NAME:
          this.consumeAttribute(e, u, A, s[D + 1]);
          break;
      }
    }
    if (l && this.trigger("tag:ready", {
      target: u,
      location: i.location
    }), c) {
      const D = this.dom.getActive();
      l || (u.closed = $e.EndTag), this.closeElement(e, u, D, i.location);
      const A = u.tagName !== D.tagName;
      !(!l && u.voidElement) && !A && this.dom.popActive();
    } else g && this.discardForeignBody(e, u.tagName, n, t.location);
  }
  /**
   * @internal
   */
  closeElement(e, t, n, s) {
    this.processElement(n, e);
    const i = {
      target: t,
      previous: n,
      location: s
    };
    this.trigger("tag:end", i), !(t && t.tagName !== n.tagName && n.closed !== $e.ImplicitClosed) && (n.isRootElement() || this.trigger("element:ready", {
      target: n,
      location: n.location
    }));
  }
  processElement(e, t) {
    var n;
    if (e.cacheEnable(), (n = t.hooks) != null && n.processElement) {
      const s = t.hooks.processElement, i = this.metaTable, a = {
        getMetaFor(o) {
          return i.getMetaFor(o);
        }
      };
      s.call(a, e);
    }
  }
  /**
   * Discard tokens until the end tag for the foreign element is found.
   *
   * @internal
   */
  discardForeignBody(e, t, n, s) {
    let i = 1, a, o;
    do {
      const c = Array.from(this.consumeUntil(n, Y.TAG_OPEN, s)), [g] = c.slice(-1), [, v, D] = g.data;
      if (!v && hE(t, D)) {
        const p = this.currentNamespace;
        this.currentNamespace = "svg", this.consumeTag(e, g, n), this.consumeUntilMatchingTag(e, n, D), this.currentNamespace = p;
        continue;
      }
      if (D !== t)
        continue;
      o = Array.from(
        this.consumeUntil(n, Y.TAG_CLOSE, g.location)
      ).slice(-1)[0];
      const b = o.data[0] === "/>";
      v ? (a = g, i--) : b || i++;
    } while (i > 0);
    if (!a || !o)
      return;
    const u = this.dom.getActive(), l = Qe.fromTokens(a, o, u, this.metaTable);
    this.closeElement(e, l, u, o.location), this.dom.popActive();
  }
  /**
   * @internal
   */
  consumeAttribute(e, t, n, s) {
    var A;
    const { meta: i } = t, a = this.getAttributeKeyLocation(n), o = this.getAttributeValueLocation(s), u = this.getAttributeLocation(n, s), l = fE(s), c = {
      key: n.data[1],
      value: null,
      quote: null
    };
    if (l) {
      const [, , b, p] = s.data;
      c.value = b, c.quote = p ?? null;
    }
    let g = (b) => [b];
    (A = e.hooks) != null && A.processAttribute && (g = e.hooks.processAttribute);
    let v;
    const D = g.call({}, c);
    typeof D[Symbol.iterator] != "function" ? v = [c] : v = D;
    for (const b of v) {
      const p = {
        target: t,
        key: b.key,
        value: b.value,
        quote: b.quote,
        originalAttribute: b.originalAttribute,
        location: u,
        keyLocation: a,
        valueLocation: o,
        meta: (i == null ? void 0 : i.attributes[b.key]) ?? null
      };
      this.trigger("attr", p), t.setAttribute(b.key, b.value, a, o, b.originalAttribute);
    }
  }
  /**
   * Takes attribute key token an returns location.
   */
  getAttributeKeyLocation(e) {
    return e.location;
  }
  /**
   * Take attribute value token and return a new location referring to only the
   * value.
   *
   * foo="bar"    foo='bar'    foo=bar    foo      foo=""
   *      ^^^          ^^^         ^^^    (null)   (null)
   */
  getAttributeValueLocation(e) {
    return !e || e.type !== Y.ATTR_VALUE || e.data[2] === "" ? null : e.data[3] ? fe(e.location, 2, -1) : fe(e.location, 1);
  }
  /**
   * Take attribute key and value token an returns a new location referring to
   * an aggregate location covering key, quotes if present and value.
   */
  getAttributeLocation(e, t) {
    const n = e.location, s = t && t.type === Y.ATTR_VALUE ? t.location : void 0;
    return {
      filename: n.filename,
      line: n.line,
      column: n.column,
      size: n.size + ((s == null ? void 0 : s.size) ?? 0),
      offset: n.offset
    };
  }
  /**
   * @internal
   */
  consumeDirective(e) {
    const [t, n, s, i, a, o] = e.data;
    if (!o.startsWith("]"))
      throw new xr(e.location, `Missing end bracket "]" on directive "${t}"`);
    const u = a.match(/^(.*?)(?:(\s*(?:--|:)\s*)(.*))?$/);
    if (!u)
      throw new Error(`Failed to parse directive "${t}"`);
    if (!mE(s))
      throw new xr(e.location, `Unknown directive "${s}"`);
    const [, l, c, g] = u, v = "html-validate-", D = n.length, A = D + s.length + i.length, b = A + l.length + (c || "").length, p = fe(
      e.location,
      n.length - v.length - 1,
      -o.length + 1
    ), h = fe(
      e.location,
      D,
      D + s.length
    ), d = l ? fe(e.location, A, A + l.length) : void 0, m = g ? fe(e.location, b, b + g.length) : void 0;
    this.trigger("directive", {
      action: s,
      data: l,
      comment: g || "",
      location: p,
      actionLocation: h,
      optionsLocation: d,
      commentLocation: m
    });
  }
  /**
   * Consumes conditional comment in tag form.
   *
   * See also the related [[consumeCommend]] method.
   *
   * @internal
   */
  consumeConditional(e) {
    const t = this.dom.getActive();
    this.trigger("conditional", {
      condition: e.data[1],
      location: e.location,
      parent: t
    });
  }
  /**
   * Consumes comment token.
   *
   * Tries to find IE conditional comments and emits conditional token if
   * found. See also the related [[consumeConditional]] method.
   *
   * @internal
   */
  consumeComment(e) {
    const t = e.data[0], n = this.dom.getActive();
    for (const s of dE(t, e.location))
      this.trigger("conditional", {
        condition: s.expression,
        location: s.location,
        parent: n
      });
  }
  /**
   * Consumes doctype tokens. Emits doctype event.
   *
   * @internal
   */
  consumeDoctype(e, t) {
    const n = Array.from(
      this.consumeUntil(t, Y.DOCTYPE_CLOSE, e.location)
    ), i = n[0].data[0];
    this.dom.doctype = i, this.trigger("doctype", {
      tag: e.data[1],
      value: i,
      valueLocation: n[0].location,
      location: e.location
    });
  }
  /**
   * Return a list of tokens found until the expected token was found.
   *
   * @internal
   * @param errorLocation - What location to use if an error occurs
   */
  *consumeUntil(e, t, n) {
    let s = this.next(e);
    for (; !s.done; ) {
      const i = s.value;
      if (yield i, i.type === t) return;
      s = this.next(e);
    }
    throw new xr(
      n,
      `stream ended before ${Y[t]} token was found`
    );
  }
  /**
   * Consumes tokens until a matching close-tag is found. Tags are appended to
   * the document.
   *
   * @internal
   */
  consumeUntilMatchingTag(e, t, n) {
    let s = 1, i = this.next(t);
    for (; !i.done; ) {
      const a = i.value;
      if (this.consume(e, a, t), a.type === Y.TAG_OPEN) {
        const [, o, u] = a.data;
        if (u === n && (o ? s-- : s++, s === 0))
          return;
      }
      i = this.next(t);
    }
  }
  next(e) {
    const t = e.next();
    if (!t.done) {
      const n = t.value;
      this.trigger("token", {
        location: n.location,
        type: n.type,
        data: Array.from(n.data),
        token: n
      });
    }
    return t;
  }
  on(e, t) {
    return this.event.on(e, t);
  }
  once(e, t) {
    return this.event.once(e, t);
  }
  /**
   * Defer execution. Will call function sometime later.
   *
   * @internal
   * @param cb - Callback to execute later.
   */
  defer(e) {
    this.event.once("*", e);
  }
  trigger(e, t) {
    if (typeof t.location > "u")
      throw new Error("Triggered event must contain location");
    this.event.trigger(e, t);
  }
  /**
   * @internal
   */
  getEventHandler() {
    return this.event;
  }
  /**
   * Appends a text node to the current element on the stack.
   */
  appendText(e, t) {
    this.dom.getActive().appendText(e, t);
  }
  /**
   * Trigger close events for any still open elements.
   */
  closeTree(e, t) {
    var i;
    let n;
    const s = this.dom.root;
    for (; (n = this.dom.getActive()) && !n.isRootElement(); )
      (i = n.meta) != null && i.implicitClosed ? (n.closed = $e.ImplicitClosed, this.closeElement(e, s, n, t)) : this.closeElement(e, null, n, t), this.dom.popActive();
  }
}
function pE(r) {
  return {
    ...r,
    selector: r.selector()
  };
}
function gE(r) {
  return r.length === 0 ? !1 : ae(r[0]);
}
class Ms {
  constructor() {
    k(this, "result");
    this.result = {};
  }
  static merge(e) {
    if (ae(e))
      return e.then((i) => this.merge(i));
    if (gE(e))
      return Promise.all(e).then((i) => this.merge(i));
    const t = e.every((i) => i.valid), n = {};
    e.forEach((i) => {
      i.results.forEach((a) => {
        const o = a.filePath;
        o in n ? n[o].messages = [...n[o].messages, ...a.messages] : n[o] = { ...a };
      });
    });
    const s = Object.values(n).map((i) => (i.errorCount = $s(i.messages), i.warningCount = gu(i.messages), i));
    return {
      valid: t,
      results: s,
      errorCount: yu(s),
      warningCount: bu(s)
    };
  }
  add(e, t, n, s, i, a) {
    var l;
    i.filename in this.result || (this.result[i.filename] = []);
    const o = (l = e.documentation(a)) == null ? void 0 : l.url, u = {
      ruleId: e.name,
      severity: n,
      message: t,
      offset: i.offset,
      line: i.line,
      column: i.column,
      size: i.size || 0,
      selector() {
        return s ? s.generateSelector() : null;
      }
    };
    o && (u.ruleUrl = o), a && (u.context = a), this.result[i.filename].push(u);
  }
  addManual(e, t) {
    e in this.result || (this.result[e] = []), this.result[e].push(t);
  }
  save(e) {
    const t = {
      valid: this.isValid(),
      results: Object.keys(this.result).map((n) => {
        const s = Array.from(this.result[n], pE).sort(yE), i = (e ?? []).find((a) => n === a.filename);
        return {
          filePath: n,
          messages: s,
          errorCount: $s(s),
          warningCount: gu(s),
          source: i ? i.originalData ?? i.data : null
        };
      }),
      errorCount: 0,
      warningCount: 0
    };
    return t.errorCount = yu(t.results), t.warningCount = bu(t.results), t;
  }
  isValid() {
    return Object.values(this.result).reduce((t, n) => t + $s(n), 0) === 0;
  }
}
function $s(r) {
  return r.filter((e) => e.severity === Number(Ke.ERROR)).length;
}
function gu(r) {
  return r.filter((e) => e.severity === Number(Ke.WARN)).length;
}
function yu(r) {
  return r.reduce((e, t) => e + t.errorCount, 0);
}
function bu(r) {
  return r.reduce((e, t) => e + t.warningCount, 0);
}
function yE(r, e) {
  return r.line < e.line ? -1 : r.line > e.line ? 1 : r.column < e.column ? -1 : r.column > e.column ? 1 : 0;
}
let bE = 1;
function Eu() {
  return bE++;
}
class Fe {
  constructor(e, t) {
    k(this, "report");
    k(this, "config");
    k(this, "ParserClass");
    k(this, "availableRules");
    this.report = new Ms(), this.config = e, this.ParserClass = t;
    const n = this.initPlugins(this.config);
    this.availableRules = {
      ...mi,
      ...n.availableRules
    };
  }
  /**
   * Lint sources and return report
   *
   * @param sources - Sources to lint.
   * @returns Report output.
   */
  lint(e) {
    for (const t of e) {
      const n = this.instantiateParser(), { rules: s } = this.setupPlugins(t, this.config, n), i = s["no-unused-disable"], a = {
        rules: s,
        reportUnused(v, D, A, b) {
          v.has(i.name) || i.reportUnused(D, A, b);
        }
      }, o = {
        filename: t.filename,
        line: 1,
        column: 1,
        offset: 0,
        size: 1
      }, u = {
        location: o,
        config: this.config,
        rules: s
      };
      n.trigger("config:ready", u);
      const { hooks: l, ...c } = t, g = {
        location: o,
        source: c
      };
      n.trigger("source:ready", g), n.on("directive", (v, D) => {
        this.processDirective(D, n, a);
      });
      try {
        n.parseHtml(t);
      } catch (v) {
        if (v instanceof qr || v instanceof xr)
          this.reportError("parser-error", v.message, v.location);
        else
          throw v;
      }
    }
    return this.report.save(e);
  }
  /**
   * Returns a list of all events generated while parsing the source.
   *
   * For verbosity, token events are ignored (use [[dumpTokens]] to inspect
   * token stream).
   */
  dumpEvents(e) {
    const t = this.instantiateParser(), n = [];
    return t.on("*", (s, i) => {
      s !== "token" && n.push({ event: s, data: i });
    }), e.forEach((s) => t.parseHtml(s)), n;
  }
  dumpTokens(e) {
    const t = new yl(), n = [];
    for (const s of e)
      for (const i of t.tokenize(s)) {
        const a = i.data[0] ?? "", o = i.location.filename, u = String(i.location.line), l = String(i.location.column);
        n.push({
          token: Y[i.type],
          data: a,
          location: `${o}:${u}:${l}`
        });
      }
    return n;
  }
  dumpTree(e) {
    const n = this.instantiateParser().parseHtml(e[0]);
    return H0(n);
  }
  /**
   * Get rule documentation.
   */
  getRuleDocumentation({
    ruleId: e,
    context: t
  }) {
    const s = this.config.getRules().get(e);
    if (s) {
      const [, i] = s;
      return this.instantiateRule(e, i).documentation(t);
    } else
      return null;
  }
  /**
   * Create a new parser instance with the current configuration.
   *
   * @internal
   */
  instantiateParser() {
    return new this.ParserClass(this.config);
  }
  processDirective(e, t, n) {
    const s = e.data.split(",").map((a) => a.trim()).map((a) => n.rules[a]).filter((a) => !!a), i = e.optionsLocation ?? e.location;
    switch (e.action) {
      case "enable":
        this.processEnableDirective(s, t);
        break;
      case "disable":
        this.processDisableDirective(s, t);
        break;
      case "disable-block":
        this.processDisableBlockDirective(n, s, t, e.data, i);
        break;
      case "disable-next":
        this.processDisableNextDirective(n, s, t, e.data, i);
        break;
    }
  }
  processEnableDirective(e, t) {
    for (const n of e)
      n.setEnabled(!0), n.getSeverity() === Ke.DISABLED && n.setServerity(Ke.ERROR);
    t.on("tag:start", (n, s) => {
      s.target.enableRules(e.map((i) => i.name));
    });
  }
  processDisableDirective(e, t) {
    for (const n of e)
      n.setEnabled(!1);
    t.on("tag:start", (n, s) => {
      s.target.disableRules(e.map((i) => i.name));
    });
  }
  processDisableBlockDirective(e, t, n, s, i) {
    const a = new Set(t.map((v) => v.name)), o = new Set(a), u = Eu();
    let l = null;
    for (const v of t)
      v.block(u);
    const c = n.on("tag:start", (v, D) => {
      var A;
      l === null && (l = ((A = D.target.parent) == null ? void 0 : A.unique) ?? null), D.target.blockRules(a, u);
    }), g = n.on("tag:end", (v, D) => {
      const A = l === null, b = l === D.previous.unique;
      if (A || b) {
        g(), c();
        for (const p of t)
          p.unblock(u);
      }
    });
    n.on("rule:error", (v, D) => {
      D.blockers.includes(u) && o.delete(D.ruleId);
    }), n.on("parse:end", () => {
      e.reportUnused(a, o, s, i);
    });
  }
  processDisableNextDirective(e, t, n, s, i) {
    const a = new Set(t.map((c) => c.name)), o = new Set(a), u = Eu();
    for (const c of t)
      c.block(u);
    const l = n.on("tag:start", (c, g) => {
      g.target.blockRules(a, u);
    });
    n.on("rule:error", (c, g) => {
      g.blockers.includes(u) && o.delete(g.ruleId);
    }), n.on("parse:end", () => {
      e.reportUnused(a, o, s, i);
    }), n.once("tag:ready, tag:end, attr", () => {
      l(), n.defer(() => {
        for (const c of t)
          c.unblock(u);
      });
    });
  }
  /*
   * Initialize all plugins. This should only be done once for all sessions.
   */
  initPlugins(e) {
    for (const t of e.getPlugins())
      t.init && t.init();
    return {
      availableRules: this.initRules(e)
    };
  }
  /**
   * Initializes all rules from plugins and returns an object with a mapping
   * between rule name and its constructor.
   */
  initRules(e) {
    const t = {};
    for (const n of e.getPlugins())
      for (const [s, i] of Object.entries(n.rules ?? {}))
        i && (t[s] = i);
    return t;
  }
  /**
   * Setup all plugins for this session.
   */
  setupPlugins(e, t, n) {
    const s = n.getEventHandler();
    for (const i of t.getPlugins())
      i.setup && i.setup(e, s);
    return {
      rules: this.setupRules(t, n)
    };
  }
  /**
   * Load and setup all rules for current configuration.
   */
  setupRules(e, t) {
    const n = {};
    for (const [s, [i, a]] of e.getRules().entries())
      n[s] = this.loadRule(s, e, i, a, t, this.report);
    return n;
  }
  /**
   * Load and setup a rule using current config.
   */
  loadRule(e, t, n, s, i, a) {
    const o = t.getMetaTable(), u = this.instantiateRule(e, s);
    return u.name = e, u.init(i, a, n, o), u.setup && u.setup(), u;
  }
  instantiateRule(e, t) {
    if (this.availableRules[e]) {
      const n = this.availableRules[e];
      return new n(t);
    } else
      return this.missingRule(e);
  }
  missingRule(e) {
    return new class extends B {
      setup() {
        this.on("dom:load", () => {
          this.report(null, `Definition for rule '${e}' was not found`);
        });
      }
    }();
  }
  reportError(e, t, n) {
    this.report.addManual(n.filename, {
      ruleId: e,
      severity: Ke.ERROR,
      message: t,
      offset: n.offset,
      line: n.line,
      column: n.column,
      size: n.size,
      selector: () => null
    });
  }
}
const EE = [];
function vE(r) {
  return Array.isArray(r[0]);
}
class DE extends Pl {
  constructor(...e) {
    if (vE(e)) {
      const [t, n] = e;
      super(t, n);
    } else {
      const [t] = e;
      super(EE, t);
    }
  }
  /**
   * Set a new configuration for this loader.
   *
   * @public
   * @since 8.20.0
   * @param config - New configuration to use.
   */
  setConfig(e) {
    this.setConfigData(e);
  }
  getConfigFor(e, t) {
    const n = this.loadFromObject(t ?? {});
    return ae(n) ? n.then((s) => this._resolveConfig(s)) : this._resolveConfig(n);
  }
  flushCache() {
  }
  defaultConfig() {
    return this.loadFromObject({
      extends: ["html-validate:recommended"],
      elements: ["html5"]
    });
  }
  _resolveConfig(e) {
    if (e.isRootFound())
      return e.resolve();
    const t = this.getGlobalConfig();
    if (ae(t))
      return t.then((n) => {
        const s = n.merge(this.resolvers, e);
        return ae(s) ? s.then((i) => i.resolve()) : s.resolve();
      });
    {
      const n = t.merge(this.resolvers, e);
      return ae(n) ? n.then((s) => s.resolve()) : n.resolve();
    }
  }
}
function wE(r, e, t, n) {
  const s = e.find((a) => a.name === t);
  if (!s)
    throw new he(`No plugin named "${t}" has been loaded`);
  if (!s.transformer)
    throw new he("Plugin does not expose any transformers");
  if (typeof s.transformer == "function")
    throw new he(
      `Transformer "${r}" refers to named transformer but plugin exposes only unnamed, use "${t}" instead.`
    );
  const i = s.transformer[n];
  if (!i)
    throw new he(`Plugin "${t}" does not expose a transformer named "${n}".`);
  return i;
}
function AE(r, e) {
  return iE(r, e, { cache: !0 });
}
function CE(r, e) {
  if (!e.transformer)
    throw new he("Plugin does not expose any transformers");
  if (typeof e.transformer != "function") {
    if (e.transformer.default)
      return e.transformer.default;
    throw new he(
      `Transformer "${r}" refers to unnamed transformer but plugin exposes only named.`
    );
  }
  return e.transformer;
}
const vu = {
  VERSION: 1
};
function Du(r) {
  const e = r.api ?? 0;
  if (e !== vu.VERSION)
    throw new he(
      `Transformer uses API version ${String(e)} but only version ${String(vu.VERSION)} is supported`
    );
}
function $E(r, e, t) {
  const n = e.match(/(.*):(.*)/);
  if (n) {
    const [, i, a] = n;
    return wE(e, t, i, a);
  }
  const s = t.find((i) => i.name === e);
  return s ? CE(e, s) : AE(r, e);
}
function _E(r, e, t) {
  try {
    const n = $E(r, e, t);
    return ae(n) ? n.then((s) => (Du(s), s)) : (Du(n), n);
  } catch (n) {
    throw n instanceof he ? new he(`Failed to load transformer "${e}": ${n.message}`, n) : new he(`Failed to load transformer "${e}"`, vt(n));
  }
}
function Il(r, e, t, n) {
  const s = r.get(t);
  if (s)
    return s;
  {
    const i = _E(e, t, n);
    return ae(i) ? i.then((a) => (r.set(t, a), a)) : (r.set(t, i), i);
  }
}
function SE(r) {
  return !!(r && typeof r == "object" && Symbol.iterator in r);
}
function Ol(r) {
  return SE(r) ? Array.from(r) : [r];
}
function RE(r) {
  return !r.some(ae);
}
const _s = "Cannot use async transformer from sync function";
async function gi(r, e, t, n) {
  const { cache: s } = e, i = e.findTransformer(n ?? t.filename), a = {
    hasChain(l) {
      return e.canTransform(l);
    },
    chain(l, c) {
      return gi(r, e, l, c);
    }
  };
  if (!i)
    return Promise.resolve([t]);
  const o = i.kind === "import" ? await Il(s, r, i.name, e.getPlugins()) : i.function, u = i.kind === "import" ? i.name : i.function.name;
  try {
    const l = await o.call(a, t), c = await Promise.all(Ol(l));
    for (const g of c)
      g.transformedBy ?? (g.transformedBy = []), g.transformedBy.push(u);
    return c;
  } catch (l) {
    const c = l instanceof Error ? l.message : String(l);
    throw new Dt(`When transforming "${t.filename}": ${c}`, vt(l));
  }
}
function yi(r, e, t, n) {
  const { cache: s } = e, i = e.findTransformer(n ?? t.filename), a = {
    hasChain(l) {
      return e.canTransform(l);
    },
    chain(l, c) {
      return yi(r, e, l, c);
    }
  };
  if (!i)
    return [t];
  const o = i.kind === "import" ? Il(s, r, i.name, e.getPlugins()) : i.function, u = i.kind === "import" ? i.name : i.function.name;
  if (ae(o))
    throw new le(_s);
  try {
    const l = o.call(a, t);
    if (ae(l))
      throw new le(_s);
    const c = Ol(l);
    if (!RE(c))
      throw new le(_s);
    for (const g of c)
      g.transformedBy ?? (g.transformedBy = []), g.transformedBy.push(u);
    return c;
  } catch (l) {
    const c = l instanceof Error ? l.message : String(l);
    throw new Dt(`When transforming "${t.filename}": ${c}`, vt(l));
  }
}
function It(r, e, t) {
  const s = t !== "/dev/stdin" ? t : 0, i = tl.readFileSync(s, { encoding: "utf8" });
  return gi(r, e, {
    data: i,
    filename: t,
    line: 1,
    column: 1,
    offset: 0,
    originalData: i
  }, t);
}
function TE(r, e, t) {
  const s = t !== "/dev/stdin" ? t : 0, i = tl.readFileSync(s, { encoding: "utf8" });
  return yi(r, e, {
    data: i,
    filename: t,
    line: 1,
    column: 1,
    offset: 0,
    originalData: i
  }, t);
}
function Ir(r) {
  return !r || typeof r == "string" ? !1 : !!(r.processAttribute || r.processElement);
}
function Or(r) {
  return !r || typeof r == "string" ? !1 : !(r.processAttribute || r.processElement);
}
class OE {
  constructor(e) {
    k(this, "configLoader");
    const [t, n] = e instanceof Pl ? [e, void 0] : [void 0, e];
    this.configLoader = t ?? new DE(n);
  }
  /* eslint-enable @typescript-eslint/unified-signatures */
  validateString(e, t, n, s) {
    const i = typeof t == "string" ? t : "inline", a = Or(t) ? t : Or(n) ? n : void 0, o = Ir(t) ? t : Ir(n) ? n : s, u = {
      data: e,
      filename: i,
      line: 1,
      column: 1,
      offset: 0,
      hooks: o
    };
    return this.validateSource(u, a);
  }
  /* eslint-enable @typescript-eslint/unified-signatures */
  validateStringSync(e, t, n, s) {
    const i = typeof t == "string" ? t : "inline", a = Or(t) ? t : Or(n) ? n : void 0, o = Ir(t) ? t : Ir(n) ? n : s, u = {
      data: e,
      filename: i,
      line: 1,
      column: 1,
      offset: 0,
      hooks: o
    };
    return this.validateSourceSync(u, a);
  }
  /**
   * Parse and validate HTML from [[Source]].
   *
   * @public
   * @param input - Source to parse.
   * @returns Report output.
   */
  async validateSource(e, t) {
    const n = Mo(e), s = await this.getConfigFor(n.filename, t), i = this.configLoader.getResolvers(), a = await gi(i, s, n);
    return new Fe(s, Re).lint(a);
  }
  /**
   * Parse and validate HTML from [[Source]].
   *
   * @public
   * @param input - Source to parse.
   * @returns Report output.
   */
  validateSourceSync(e, t) {
    const n = Mo(e), s = this.getConfigForSync(n.filename, t), i = this.configLoader.getResolvers(), a = yi(i, s, n);
    return new Fe(s, Re).lint(a);
  }
  /**
   * Parse and validate HTML from file.
   *
   * @public
   * @param filename - Filename to read and parse.
   * @returns Report output.
   */
  async validateFile(e) {
    const t = await this.getConfigFor(e), n = this.configLoader.getResolvers(), s = await It(n, t, e), i = new Fe(t, Re);
    return Promise.resolve(i.lint(s));
  }
  /**
   * Parse and validate HTML from file.
   *
   * @public
   * @param filename - Filename to read and parse.
   * @returns Report output.
   */
  validateFileSync(e) {
    const t = this.getConfigForSync(e), n = this.configLoader.getResolvers(), s = TE(n, t, e);
    return new Fe(t, Re).lint(s);
  }
  /**
   * Parse and validate HTML from multiple files. Result is merged together to a
   * single report.
   *
   * @param filenames - Filenames to read and parse.
   * @returns Report output.
   */
  async validateMultipleFiles(e) {
    return Ms.merge(e.map((t) => this.validateFile(t)));
  }
  /**
   * Parse and validate HTML from multiple files. Result is merged together to a
   * single report.
   *
   * @param filenames - Filenames to read and parse.
   * @returns Report output.
   */
  validateMultipleFilesSync(e) {
    return Ms.merge(e.map((t) => this.validateFileSync(t)));
  }
  /**
   * Returns true if the given filename can be validated.
   *
   * A file is considered to be validatable if the extension is `.html` or if a
   * transformer matches the filename.
   *
   * This is mostly useful for tooling to determine whenever to validate the
   * file or not. CLI tools will run on all the given files anyway.
   */
  async canValidate(e) {
    return e.toLowerCase().endsWith(".html") ? !0 : (await this.getConfigFor(e)).canTransform(e);
  }
  /**
   * Returns true if the given filename can be validated.
   *
   * A file is considered to be validatable if the extension is `.html` or if a
   * transformer matches the filename.
   *
   * This is mostly useful for tooling to determine whenever to validate the
   * file or not. CLI tools will run on all the given files anyway.
   */
  canValidateSync(e) {
    return e.toLowerCase().endsWith(".html") ? !0 : this.getConfigForSync(e).canTransform(e);
  }
  /**
   * Tokenize filename and output all tokens.
   *
   * Using CLI this is enabled with `--dump-tokens`. Mostly useful for
   * debugging.
   *
   * @internal
   * @param filename - Filename to tokenize.
   */
  async dumpTokens(e) {
    const t = await this.getConfigFor(e), n = this.configLoader.getResolvers(), s = await It(n, t, e);
    return new Fe(t, Re).dumpTokens(s);
  }
  /**
   * Parse filename and output all events.
   *
   * Using CLI this is enabled with `--dump-events`. Mostly useful for
   * debugging.
   *
   * @internal
   * @param filename - Filename to dump events from.
   */
  async dumpEvents(e) {
    const t = await this.getConfigFor(e), n = this.configLoader.getResolvers(), s = await It(n, t, e);
    return new Fe(t, Re).dumpEvents(s);
  }
  /**
   * Parse filename and output DOM tree.
   *
   * Using CLI this is enabled with `--dump-tree`. Mostly useful for
   * debugging.
   *
   * @internal
   * @param filename - Filename to dump DOM tree from.
   */
  async dumpTree(e) {
    const t = await this.getConfigFor(e), n = this.configLoader.getResolvers(), s = await It(n, t, e);
    return new Fe(t, Re).dumpTree(s);
  }
  /**
   * Transform filename and output source data.
   *
   * Using CLI this is enabled with `--dump-source`. Mostly useful for
   * debugging.
   *
   * @internal
   * @param filename - Filename to dump source from.
   */
  async dumpSource(e) {
    const t = await this.getConfigFor(e), n = this.configLoader.getResolvers();
    return (await It(n, t, e)).reduce((i, a) => {
      const o = String(a.line), u = String(a.column), l = String(a.offset);
      if (i.push(`Source ${a.filename}@${o}:${u} (offset: ${l})`), a.transformedBy && (i.push("Transformed by:"), i = i.concat(a.transformedBy.reverse().map((c) => ` - ${c}`))), a.hooks && Object.keys(a.hooks).length > 0) {
        i.push("Hooks");
        for (const [c, g] of Object.entries(a.hooks))
          g && i.push(` - ${c}`);
      }
      return i.push("---"), i = i.concat(a.data.split(`
`)), i.push("---"), i;
    }, []);
  }
  /**
   * Get effective configuration schema.
   */
  getConfigurationSchema() {
    return Promise.resolve(ci);
  }
  /**
   * Get effective metadata element schema.
   *
   * If a filename is given the configured plugins can extend the
   * schema. Filename must not be an existing file or a filetype normally
   * handled by html-validate but the path will be used when resolving
   * configuration. As a rule-of-thumb, set it to the elements json file.
   */
  async getElementsSchema(e) {
    return (await this.getConfigFor(e ?? "inline")).getMetaTable().getJSONSchema();
  }
  /**
   * Get effective metadata element schema.
   *
   * If a filename is given the configured plugins can extend the
   * schema. Filename must not be an existing file or a filetype normally
   * handled by html-validate but the path will be used when resolving
   * configuration. As a rule-of-thumb, set it to the elements json file.
   */
  getElementsSchemaSync(e) {
    return this.getConfigForSync(e ?? "inline").getMetaTable().getJSONSchema();
  }
  async getContextualDocumentation(e, t = "inline") {
    const n = typeof t == "string" ? await this.getConfigFor(t) : await t;
    return new Fe(n, Re).getRuleDocumentation(e);
  }
  getContextualDocumentationSync(e, t = "inline") {
    const n = typeof t == "string" ? this.getConfigForSync(t) : t;
    return new Fe(n, Re).getRuleDocumentation(e);
  }
  /**
   * Get contextual documentation for the given rule.
   *
   * Typical usage:
   *
   * ```js
   * const report = await htmlvalidate.validateFile("my-file.html");
   * for (const result of report.results){
   *   const config = await htmlvalidate.getConfigFor(result.filePath);
   *   for (const message of result.messages){
   *     const documentation = await htmlvalidate.getRuleDocumentation(message.ruleId, config, message.context);
   *     // do something with documentation
   *   }
   * }
   * ```
   *
   * @public
   * @deprecated Deprecated since 8.0.0, use [[getContextualDocumentation]] instead.
   * @param ruleId - Rule to get documentation for.
   * @param config - If set it provides more accurate description by using the
   * correct configuration for the file.
   * @param context - If set to `Message.context` some rules can provide
   * contextual details and suggestions.
   */
  async getRuleDocumentation(e, t = null, n = null) {
    const s = t ?? this.getConfigFor("inline");
    return new Fe(await s, Re).getRuleDocumentation({ ruleId: e, context: n });
  }
  /**
   * Get contextual documentation for the given rule.
   *
   * Typical usage:
   *
   * ```js
   * const report = htmlvalidate.validateFileSync("my-file.html");
   * for (const result of report.results){
   *   const config = htmlvalidate.getConfigForSync(result.filePath);
   *   for (const message of result.messages){
   *     const documentation = htmlvalidate.getRuleDocumentationSync(message.ruleId, config, message.context);
   *     // do something with documentation
   *   }
   * }
   * ```
   *
   * @public
   * @deprecated Deprecated since 8.0.0, use [[getContextualDocumentationSync]] instead.
   * @param ruleId - Rule to get documentation for.
   * @param config - If set it provides more accurate description by using the
   * correct configuration for the file.
   * @param context - If set to `Message.context` some rules can provide
   * contextual details and suggestions.
   */
  getRuleDocumentationSync(e, t = null, n = null) {
    const s = t ?? this.getConfigForSync("inline");
    return new Fe(s, Re).getRuleDocumentation({ ruleId: e, context: n });
  }
  /**
   * Create a parser configured for given filename.
   *
   * @internal
   * @param source - Source to use.
   */
  async getParserFor(e) {
    const t = await this.getConfigFor(e.filename);
    return new Re(t);
  }
  /**
   * Get configuration for given filename.
   *
   * See [[FileSystemConfigLoader]] for details.
   *
   * @public
   * @param filename - Filename to get configuration for.
   * @param configOverride - Configuration to apply last.
   */
  getConfigFor(e, t) {
    const n = this.configLoader.getConfigFor(e, t);
    return Promise.resolve(n);
  }
  /**
   * Get configuration for given filename.
   *
   * See [[FileSystemConfigLoader]] for details.
   *
   * @public
   * @param filename - Filename to get configuration for.
   * @param configOverride - Configuration to apply last.
   */
  getConfigForSync(e, t) {
    const n = this.configLoader.getConfigFor(e, t);
    if (ae(n))
      throw new le("Cannot use asynchronous config loader with synchronous api");
    return n;
  }
  /**
   * Get current configuration loader.
   *
   * @public
   * @since %version%
   * @returns Current configuration loader.
   */
  /* istanbul ignore next -- not testing setters/getters */
  getConfigLoader() {
    return this.configLoader;
  }
  /**
   * Set configuration loader.
   *
   * @public
   * @since %version%
   * @param loader - New configuration loader to use.
   */
  /* istanbul ignore next -- not testing setters/getters */
  setConfigLoader(e) {
    this.configLoader = e;
  }
  /**
   * Flush configuration cache. Clears full cache unless a filename is given.
   *
   * See [[FileSystemConfigLoader]] for details.
   *
   * @public
   * @param filename - If set, only flush cache for given filename.
   */
  flushConfigCache(e) {
    this.configLoader.flushCache(e);
  }
}
export {
  Jh as Attribute,
  de as Config,
  he as ConfigError,
  Pl as ConfigLoader,
  ll as DOMNode,
  Me as DOMTokenList,
  Fm as DOMTree,
  ue as DynamicValue,
  lE as EventHandler,
  Qe as HtmlElement,
  OE as HtmlValidate,
  ks as MetaCopyableProperty,
  zh as MetaTable,
  Dt as NestedError,
  $e as NodeClosed,
  je as NodeType,
  Re as Parser,
  Ms as Reporter,
  hu as ResolvedConfig,
  B as Rule,
  Vr as SchemaValidationError,
  Ke as Severity,
  DE as StaticConfigLoader,
  Ie as TextClassification,
  Ye as TextContent,
  $m as TextNode,
  le as UserError,
  ce as Validator,
  $h as WrappedError,
  Gm as ariaNaming,
  lt as classifyNodeText,
  Q0 as configPresets,
  FE as defineMetadata,
  Xm as keywordPatternMatcher,
  Jc as metadataHelper,
  fe as sliceLocation,
  Oe as walk
};
