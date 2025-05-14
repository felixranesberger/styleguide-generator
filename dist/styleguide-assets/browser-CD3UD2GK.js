var nc = Object.defineProperty;
var Li = (r) => {
  throw TypeError(r);
};
var sc = (r, e, t) => e in r ? nc(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var O = (r, e, t) => sc(r, typeof e != "symbol" ? e + "" : e, t), Pn = (r, e, t) => e.has(r) || Li("Cannot " + t);
var q = (r, e, t) => (Pn(r, e, "read from private field"), t ? t.call(r) : e.get(r)), pe = (r, e, t) => e.has(r) ? Li("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(r) : e.set(r, t), ce = (r, e, t, n) => (Pn(r, e, "write to private field"), n ? n.call(r, t) : e.set(r, t), t), ne = (r, e, t) => (Pn(r, e, "access private method"), t);
var dt = (r, e, t, n) => ({
  set _(s) {
    ce(r, e, s, t);
  },
  get _() {
    return q(r, e, n);
  }
});
function ic(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var ir = { exports: {} }, In = {}, Qe = {}, ft = {}, kn = {}, On = {}, xn = {}, Bi;
function rn() {
  return Bi || (Bi = 1, function(r) {
    Object.defineProperty(r, "__esModule", { value: !0 }), r.regexpCode = r.getEsmExportName = r.getProperty = r.safeStringify = r.stringify = r.strConcat = r.addCodeArg = r.str = r._ = r.nil = r._Code = r.Name = r.IDENTIFIER = r._CodeOrName = void 0;
    class e {
    }
    r._CodeOrName = e, r.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    class t extends e {
      constructor(c) {
        if (super(), !r.IDENTIFIER.test(c))
          throw new Error("CodeGen: name must be a valid identifier");
        this.str = c;
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
      constructor(c) {
        super(), this._items = typeof c == "string" ? [c] : c;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        if (this._items.length > 1)
          return !1;
        const c = this._items[0];
        return c === "" || c === '""';
      }
      get str() {
        var c;
        return (c = this._str) !== null && c !== void 0 ? c : this._str = this._items.reduce((m, D) => `${m}${D}`, "");
      }
      get names() {
        var c;
        return (c = this._names) !== null && c !== void 0 ? c : this._names = this._items.reduce((m, D) => (D instanceof t && (m[D.str] = (m[D.str] || 0) + 1), m), {});
      }
    }
    r._Code = n, r.nil = new n("");
    function s(f, ...c) {
      const m = [f[0]];
      let D = 0;
      for (; D < c.length; )
        o(m, c[D]), m.push(f[++D]);
      return new n(m);
    }
    r._ = s;
    const i = new n("+");
    function a(f, ...c) {
      const m = [v(f[0])];
      let D = 0;
      for (; D < c.length; )
        m.push(i), o(m, c[D]), m.push(i, v(f[++D]));
      return u(m), new n(m);
    }
    r.str = a;
    function o(f, c) {
      c instanceof n ? f.push(...c._items) : c instanceof t ? f.push(c) : f.push(h(c));
    }
    r.addCodeArg = o;
    function u(f) {
      let c = 1;
      for (; c < f.length - 1; ) {
        if (f[c] === i) {
          const m = d(f[c - 1], f[c + 1]);
          if (m !== void 0) {
            f.splice(c - 1, 3, m);
            continue;
          }
          f[c++] = "+";
        }
        c++;
      }
    }
    function d(f, c) {
      if (c === '""')
        return f;
      if (f === '""')
        return c;
      if (typeof f == "string")
        return c instanceof t || f[f.length - 1] !== '"' ? void 0 : typeof c != "string" ? `${f.slice(0, -1)}${c}"` : c[0] === '"' ? f.slice(0, -1) + c.slice(1) : void 0;
      if (typeof c == "string" && c[0] === '"' && !(f instanceof t))
        return `"${f}${c.slice(1)}`;
    }
    function l(f, c) {
      return c.emptyStr() ? f : f.emptyStr() ? c : a`${f}${c}`;
    }
    r.strConcat = l;
    function h(f) {
      return typeof f == "number" || typeof f == "boolean" || f === null ? f : v(Array.isArray(f) ? f.join(",") : f);
    }
    function y(f) {
      return new n(v(f));
    }
    r.stringify = y;
    function v(f) {
      return JSON.stringify(f).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    }
    r.safeStringify = v;
    function A(f) {
      return typeof f == "string" && r.IDENTIFIER.test(f) ? new n(`.${f}`) : s`[${f}]`;
    }
    r.getProperty = A;
    function g(f) {
      if (typeof f == "string" && r.IDENTIFIER.test(f))
        return new n(`${f}`);
      throw new Error(`CodeGen: invalid export name: ${f}, use explicit $id name mapping`);
    }
    r.getEsmExportName = g;
    function p(f) {
      return new n(f.toString());
    }
    r.regexpCode = p;
  }(xn)), xn;
}
var qn = {}, ji;
function Mi() {
  return ji || (ji = 1, function(r) {
    Object.defineProperty(r, "__esModule", { value: !0 }), r.ValueScope = r.ValueScopeName = r.Scope = r.varKinds = r.UsedValueState = void 0;
    const e = rn();
    class t extends Error {
      constructor(d) {
        super(`CodeGen: "code" for ${d} not defined`), this.value = d.value;
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
      constructor({ prefixes: d, parent: l } = {}) {
        this._names = {}, this._prefixes = d, this._parent = l;
      }
      toName(d) {
        return d instanceof e.Name ? d : this.name(d);
      }
      name(d) {
        return new e.Name(this._newName(d));
      }
      _newName(d) {
        const l = this._names[d] || this._nameGroup(d);
        return `${d}${l.index++}`;
      }
      _nameGroup(d) {
        var l, h;
        if (!((h = (l = this._parent) === null || l === void 0 ? void 0 : l._prefixes) === null || h === void 0) && h.has(d) || this._prefixes && !this._prefixes.has(d))
          throw new Error(`CodeGen: prefix "${d}" is not allowed in this scope`);
        return this._names[d] = { prefix: d, index: 0 };
      }
    }
    r.Scope = s;
    class i extends e.Name {
      constructor(d, l) {
        super(l), this.prefix = d;
      }
      setValue(d, { property: l, itemIndex: h }) {
        this.value = d, this.scopePath = (0, e._)`.${new e.Name(l)}[${h}]`;
      }
    }
    r.ValueScopeName = i;
    const a = (0, e._)`\n`;
    class o extends s {
      constructor(d) {
        super(d), this._values = {}, this._scope = d.scope, this.opts = { ...d, _n: d.lines ? a : e.nil };
      }
      get() {
        return this._scope;
      }
      name(d) {
        return new i(d, this._newName(d));
      }
      value(d, l) {
        var h;
        if (l.ref === void 0)
          throw new Error("CodeGen: ref must be passed in value");
        const y = this.toName(d), { prefix: v } = y, A = (h = l.key) !== null && h !== void 0 ? h : l.ref;
        let g = this._values[v];
        if (g) {
          const c = g.get(A);
          if (c)
            return c;
        } else
          g = this._values[v] = /* @__PURE__ */ new Map();
        g.set(A, y);
        const p = this._scope[v] || (this._scope[v] = []), f = p.length;
        return p[f] = l.ref, y.setValue(l, { property: v, itemIndex: f }), y;
      }
      getValue(d, l) {
        const h = this._values[d];
        if (h)
          return h.get(l);
      }
      scopeRefs(d, l = this._values) {
        return this._reduceValues(l, (h) => {
          if (h.scopePath === void 0)
            throw new Error(`CodeGen: name "${h}" has no value`);
          return (0, e._)`${d}${h.scopePath}`;
        });
      }
      scopeCode(d = this._values, l, h) {
        return this._reduceValues(d, (y) => {
          if (y.value === void 0)
            throw new Error(`CodeGen: name "${y}" has no value`);
          return y.value.code;
        }, l, h);
      }
      _reduceValues(d, l, h = {}, y) {
        let v = e.nil;
        for (const A in d) {
          const g = d[A];
          if (!g)
            continue;
          const p = h[A] = h[A] || /* @__PURE__ */ new Map();
          g.forEach((f) => {
            if (p.has(f))
              return;
            p.set(f, n.Started);
            let c = l(f);
            if (c) {
              const m = this.opts.es5 ? r.varKinds.var : r.varKinds.const;
              v = (0, e._)`${v}${m} ${f} = ${c};${this.opts._n}`;
            } else if (c = y == null ? void 0 : y(f))
              v = (0, e._)`${v}${c}${this.opts._n}`;
            else
              throw new t(f);
            p.set(f, n.Completed);
          });
        }
        return v;
      }
    }
    r.ValueScope = o;
  }(qn)), qn;
}
var Ui;
function ae() {
  return Ui || (Ui = 1, function(r) {
    Object.defineProperty(r, "__esModule", { value: !0 }), r.or = r.and = r.not = r.CodeGen = r.operators = r.varKinds = r.ValueScopeName = r.ValueScope = r.Scope = r.Name = r.regexpCode = r.stringify = r.getProperty = r.nil = r.strConcat = r.str = r._ = void 0;
    const e = rn(), t = Mi();
    var n = rn();
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
    var s = Mi();
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
      optimizeNames(E, $) {
        return this;
      }
    }
    class a extends i {
      constructor(E, $, k) {
        super(), this.varKind = E, this.name = $, this.rhs = k;
      }
      render({ es5: E, _n: $ }) {
        const k = E ? t.varKinds.var : this.varKind, X = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
        return `${k} ${this.name}${X};` + $;
      }
      optimizeNames(E, $) {
        if (E[this.name.str])
          return this.rhs && (this.rhs = L(this.rhs, E, $)), this;
      }
      get names() {
        return this.rhs instanceof e._CodeOrName ? this.rhs.names : {};
      }
    }
    class o extends i {
      constructor(E, $, k) {
        super(), this.lhs = E, this.rhs = $, this.sideEffects = k;
      }
      render({ _n: E }) {
        return `${this.lhs} = ${this.rhs};` + E;
      }
      optimizeNames(E, $) {
        if (!(this.lhs instanceof e.Name && !E[this.lhs.str] && !this.sideEffects))
          return this.rhs = L(this.rhs, E, $), this;
      }
      get names() {
        const E = this.lhs instanceof e.Name ? {} : { ...this.lhs.names };
        return ee(E, this.rhs);
      }
    }
    class u extends o {
      constructor(E, $, k, X) {
        super(E, k, X), this.op = $;
      }
      render({ _n: E }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + E;
      }
    }
    class d extends i {
      constructor(E) {
        super(), this.label = E, this.names = {};
      }
      render({ _n: E }) {
        return `${this.label}:` + E;
      }
    }
    class l extends i {
      constructor(E) {
        super(), this.label = E, this.names = {};
      }
      render({ _n: E }) {
        return `break${this.label ? ` ${this.label}` : ""};` + E;
      }
    }
    class h extends i {
      constructor(E) {
        super(), this.error = E;
      }
      render({ _n: E }) {
        return `throw ${this.error};` + E;
      }
      get names() {
        return this.error.names;
      }
    }
    class y extends i {
      constructor(E) {
        super(), this.code = E;
      }
      render({ _n: E }) {
        return `${this.code};` + E;
      }
      optimizeNodes() {
        return `${this.code}` ? this : void 0;
      }
      optimizeNames(E, $) {
        return this.code = L(this.code, E, $), this;
      }
      get names() {
        return this.code instanceof e._CodeOrName ? this.code.names : {};
      }
    }
    class v extends i {
      constructor(E = []) {
        super(), this.nodes = E;
      }
      render(E) {
        return this.nodes.reduce(($, k) => $ + k.render(E), "");
      }
      optimizeNodes() {
        const { nodes: E } = this;
        let $ = E.length;
        for (; $--; ) {
          const k = E[$].optimizeNodes();
          Array.isArray(k) ? E.splice($, 1, ...k) : k ? E[$] = k : E.splice($, 1);
        }
        return E.length > 0 ? this : void 0;
      }
      optimizeNames(E, $) {
        const { nodes: k } = this;
        let X = k.length;
        for (; X--; ) {
          const J = k[X];
          J.optimizeNames(E, $) || (B(E, J.names), k.splice(X, 1));
        }
        return k.length > 0 ? this : void 0;
      }
      get names() {
        return this.nodes.reduce((E, $) => te(E, $.names), {});
      }
    }
    class A extends v {
      render(E) {
        return "{" + E._n + super.render(E) + "}" + E._n;
      }
    }
    class g extends v {
    }
    class p extends A {
    }
    p.kind = "else";
    class f extends A {
      constructor(E, $) {
        super($), this.condition = E;
      }
      render(E) {
        let $ = `if(${this.condition})` + super.render(E);
        return this.else && ($ += "else " + this.else.render(E)), $;
      }
      optimizeNodes() {
        super.optimizeNodes();
        const E = this.condition;
        if (E === !0)
          return this.nodes;
        let $ = this.else;
        if ($) {
          const k = $.optimizeNodes();
          $ = this.else = Array.isArray(k) ? new p(k) : k;
        }
        if ($)
          return E === !1 ? $ instanceof f ? $ : $.nodes : this.nodes.length ? this : new f(W(E), $ instanceof f ? [$] : $.nodes);
        if (!(E === !1 || !this.nodes.length))
          return this;
      }
      optimizeNames(E, $) {
        var k;
        if (this.else = (k = this.else) === null || k === void 0 ? void 0 : k.optimizeNames(E, $), !!(super.optimizeNames(E, $) || this.else))
          return this.condition = L(this.condition, E, $), this;
      }
      get names() {
        const E = super.names;
        return ee(E, this.condition), this.else && te(E, this.else.names), E;
      }
    }
    f.kind = "if";
    class c extends A {
    }
    c.kind = "for";
    class m extends c {
      constructor(E) {
        super(), this.iteration = E;
      }
      render(E) {
        return `for(${this.iteration})` + super.render(E);
      }
      optimizeNames(E, $) {
        if (super.optimizeNames(E, $))
          return this.iteration = L(this.iteration, E, $), this;
      }
      get names() {
        return te(super.names, this.iteration.names);
      }
    }
    class D extends c {
      constructor(E, $, k, X) {
        super(), this.varKind = E, this.name = $, this.from = k, this.to = X;
      }
      render(E) {
        const $ = E.es5 ? t.varKinds.var : this.varKind, { name: k, from: X, to: J } = this;
        return `for(${$} ${k}=${X}; ${k}<${J}; ${k}++)` + super.render(E);
      }
      get names() {
        const E = ee(super.names, this.from);
        return ee(E, this.to);
      }
    }
    class w extends c {
      constructor(E, $, k, X) {
        super(), this.loop = E, this.varKind = $, this.name = k, this.iterable = X;
      }
      render(E) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(E);
      }
      optimizeNames(E, $) {
        if (super.optimizeNames(E, $))
          return this.iterable = L(this.iterable, E, $), this;
      }
      get names() {
        return te(super.names, this.iterable.names);
      }
    }
    class b extends A {
      constructor(E, $, k) {
        super(), this.name = E, this.args = $, this.async = k;
      }
      render(E) {
        return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(E);
      }
    }
    b.kind = "func";
    class C extends v {
      render(E) {
        return "return " + super.render(E);
      }
    }
    C.kind = "return";
    class _ extends A {
      render(E) {
        let $ = "try" + super.render(E);
        return this.catch && ($ += this.catch.render(E)), this.finally && ($ += this.finally.render(E)), $;
      }
      optimizeNodes() {
        var E, $;
        return super.optimizeNodes(), (E = this.catch) === null || E === void 0 || E.optimizeNodes(), ($ = this.finally) === null || $ === void 0 || $.optimizeNodes(), this;
      }
      optimizeNames(E, $) {
        var k, X;
        return super.optimizeNames(E, $), (k = this.catch) === null || k === void 0 || k.optimizeNames(E, $), (X = this.finally) === null || X === void 0 || X.optimizeNames(E, $), this;
      }
      get names() {
        const E = super.names;
        return this.catch && te(E, this.catch.names), this.finally && te(E, this.finally.names), E;
      }
    }
    class P extends A {
      constructor(E) {
        super(), this.error = E;
      }
      render(E) {
        return `catch(${this.error})` + super.render(E);
      }
    }
    P.kind = "catch";
    class U extends A {
      render(E) {
        return "finally" + super.render(E);
      }
    }
    U.kind = "finally";
    class H {
      constructor(E, $ = {}) {
        this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...$, _n: $.lines ? `
` : "" }, this._extScope = E, this._scope = new t.Scope({ parent: E }), this._nodes = [new g()];
      }
      toString() {
        return this._root.render(this.opts);
      }
      // returns unique name in the internal scope
      name(E) {
        return this._scope.name(E);
      }
      // reserves unique name in the external scope
      scopeName(E) {
        return this._extScope.name(E);
      }
      // reserves unique name in the external scope and assigns value to it
      scopeValue(E, $) {
        const k = this._extScope.value(E, $);
        return (this._values[k.prefix] || (this._values[k.prefix] = /* @__PURE__ */ new Set())).add(k), k;
      }
      getScopeValue(E, $) {
        return this._extScope.getValue(E, $);
      }
      // return code that assigns values in the external scope to the names that are used internally
      // (same names that were returned by gen.scopeName or gen.scopeValue)
      scopeRefs(E) {
        return this._extScope.scopeRefs(E, this._values);
      }
      scopeCode() {
        return this._extScope.scopeCode(this._values);
      }
      _def(E, $, k, X) {
        const J = this._scope.toName($);
        return k !== void 0 && X && (this._constants[J.str] = k), this._leafNode(new a(E, J, k)), J;
      }
      // `const` declaration (`var` in es5 mode)
      const(E, $, k) {
        return this._def(t.varKinds.const, E, $, k);
      }
      // `let` declaration with optional assignment (`var` in es5 mode)
      let(E, $, k) {
        return this._def(t.varKinds.let, E, $, k);
      }
      // `var` declaration with optional assignment
      var(E, $, k) {
        return this._def(t.varKinds.var, E, $, k);
      }
      // assignment code
      assign(E, $, k) {
        return this._leafNode(new o(E, $, k));
      }
      // `+=` code
      add(E, $) {
        return this._leafNode(new u(E, r.operators.ADD, $));
      }
      // appends passed SafeExpr to code or executes Block
      code(E) {
        return typeof E == "function" ? E() : E !== e.nil && this._leafNode(new y(E)), this;
      }
      // returns code for object literal for the passed argument list of key-value pairs
      object(...E) {
        const $ = ["{"];
        for (const [k, X] of E)
          $.length > 1 && $.push(","), $.push(k), (k !== X || this.opts.es5) && ($.push(":"), (0, e.addCodeArg)($, X));
        return $.push("}"), new e._Code($);
      }
      // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
      if(E, $, k) {
        if (this._blockNode(new f(E)), $ && k)
          this.code($).else().code(k).endIf();
        else if ($)
          this.code($).endIf();
        else if (k)
          throw new Error('CodeGen: "else" body without "then" body');
        return this;
      }
      // `else if` clause - invalid without `if` or after `else` clauses
      elseIf(E) {
        return this._elseNode(new f(E));
      }
      // `else` clause - only valid after `if` or `else if` clauses
      else() {
        return this._elseNode(new p());
      }
      // end `if` statement (needed if gen.if was used only with condition)
      endIf() {
        return this._endBlockNode(f, p);
      }
      _for(E, $) {
        return this._blockNode(E), $ && this.code($).endFor(), this;
      }
      // a generic `for` clause (or statement if `forBody` is passed)
      for(E, $) {
        return this._for(new m(E), $);
      }
      // `for` statement for a range of values
      forRange(E, $, k, X, J = this.opts.es5 ? t.varKinds.var : t.varKinds.let) {
        const le = this._scope.toName(E);
        return this._for(new D(J, le, $, k), () => X(le));
      }
      // `for-of` statement (in es5 mode replace with a normal for loop)
      forOf(E, $, k, X = t.varKinds.const) {
        const J = this._scope.toName(E);
        if (this.opts.es5) {
          const le = $ instanceof e.Name ? $ : this.var("_arr", $);
          return this.forRange("_i", 0, (0, e._)`${le}.length`, (oe) => {
            this.var(J, (0, e._)`${le}[${oe}]`), k(J);
          });
        }
        return this._for(new w("of", X, J, $), () => k(J));
      }
      // `for-in` statement.
      // With option `ownProperties` replaced with a `for-of` loop for object keys
      forIn(E, $, k, X = this.opts.es5 ? t.varKinds.var : t.varKinds.const) {
        if (this.opts.ownProperties)
          return this.forOf(E, (0, e._)`Object.keys(${$})`, k);
        const J = this._scope.toName(E);
        return this._for(new w("in", X, J, $), () => k(J));
      }
      // end `for` loop
      endFor() {
        return this._endBlockNode(c);
      }
      // `label` statement
      label(E) {
        return this._leafNode(new d(E));
      }
      // `break` statement
      break(E) {
        return this._leafNode(new l(E));
      }
      // `return` statement
      return(E) {
        const $ = new C();
        if (this._blockNode($), this.code(E), $.nodes.length !== 1)
          throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(C);
      }
      // `try` statement
      try(E, $, k) {
        if (!$ && !k)
          throw new Error('CodeGen: "try" without "catch" and "finally"');
        const X = new _();
        if (this._blockNode(X), this.code(E), $) {
          const J = this.name("e");
          this._currNode = X.catch = new P(J), $(J);
        }
        return k && (this._currNode = X.finally = new U(), this.code(k)), this._endBlockNode(P, U);
      }
      // `throw` statement
      throw(E) {
        return this._leafNode(new h(E));
      }
      // start self-balancing block
      block(E, $) {
        return this._blockStarts.push(this._nodes.length), E && this.code(E).endBlock($), this;
      }
      // end the current self-balancing block
      endBlock(E) {
        const $ = this._blockStarts.pop();
        if ($ === void 0)
          throw new Error("CodeGen: not in self-balancing block");
        const k = this._nodes.length - $;
        if (k < 0 || E !== void 0 && k !== E)
          throw new Error(`CodeGen: wrong number of nodes: ${k} vs ${E} expected`);
        return this._nodes.length = $, this;
      }
      // `function` heading (or definition if funcBody is passed)
      func(E, $ = e.nil, k, X) {
        return this._blockNode(new b(E, $, k)), X && this.code(X).endFunc(), this;
      }
      // end function definition
      endFunc() {
        return this._endBlockNode(b);
      }
      optimize(E = 1) {
        for (; E-- > 0; )
          this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
      }
      _leafNode(E) {
        return this._currNode.nodes.push(E), this;
      }
      _blockNode(E) {
        this._currNode.nodes.push(E), this._nodes.push(E);
      }
      _endBlockNode(E, $) {
        const k = this._currNode;
        if (k instanceof E || $ && k instanceof $)
          return this._nodes.pop(), this;
        throw new Error(`CodeGen: not in block "${$ ? `${E.kind}/${$.kind}` : E.kind}"`);
      }
      _elseNode(E) {
        const $ = this._currNode;
        if (!($ instanceof f))
          throw new Error('CodeGen: "else" without "if"');
        return this._currNode = $.else = E, this;
      }
      get _root() {
        return this._nodes[0];
      }
      get _currNode() {
        const E = this._nodes;
        return E[E.length - 1];
      }
      set _currNode(E) {
        const $ = this._nodes;
        $[$.length - 1] = E;
      }
    }
    r.CodeGen = H;
    function te(T, E) {
      for (const $ in E)
        T[$] = (T[$] || 0) + (E[$] || 0);
      return T;
    }
    function ee(T, E) {
      return E instanceof e._CodeOrName ? te(T, E.names) : T;
    }
    function L(T, E, $) {
      if (T instanceof e.Name)
        return k(T);
      if (!X(T))
        return T;
      return new e._Code(T._items.reduce((J, le) => (le instanceof e.Name && (le = k(le)), le instanceof e._Code ? J.push(...le._items) : J.push(le), J), []));
      function k(J) {
        const le = $[J.str];
        return le === void 0 || E[J.str] !== 1 ? J : (delete E[J.str], le);
      }
      function X(J) {
        return J instanceof e._Code && J._items.some((le) => le instanceof e.Name && E[le.str] === 1 && $[le.str] !== void 0);
      }
    }
    function B(T, E) {
      for (const $ in E)
        T[$] = (T[$] || 0) - (E[$] || 0);
    }
    function W(T) {
      return typeof T == "boolean" || typeof T == "number" || T === null ? !T : (0, e._)`!${F(T)}`;
    }
    r.not = W;
    const z = S(r.operators.AND);
    function V(...T) {
      return T.reduce(z);
    }
    r.and = V;
    const K = S(r.operators.OR);
    function I(...T) {
      return T.reduce(K);
    }
    r.or = I;
    function S(T) {
      return (E, $) => E === e.nil ? $ : $ === e.nil ? E : (0, e._)`${F(E)} ${T} ${F($)}`;
    }
    function F(T) {
      return T instanceof e.Name ? T : (0, e._)`(${T})`;
    }
  }(On)), On;
}
var se = {}, Vi;
function ue() {
  if (Vi) return se;
  Vi = 1, Object.defineProperty(se, "__esModule", { value: !0 }), se.checkStrictMode = se.getErrorPath = se.Type = se.useFunc = se.setEvaluated = se.evaluatedPropsToName = se.mergeEvaluated = se.eachItem = se.unescapeJsonPointer = se.escapeJsonPointer = se.escapeFragment = se.unescapeFragment = se.schemaRefOrVal = se.schemaHasRulesButRef = se.schemaHasRules = se.checkUnknownRules = se.alwaysValidSchema = se.toHash = void 0;
  const r = ae(), e = rn();
  function t(w) {
    const b = {};
    for (const C of w)
      b[C] = !0;
    return b;
  }
  se.toHash = t;
  function n(w, b) {
    return typeof b == "boolean" ? b : Object.keys(b).length === 0 ? !0 : (s(w, b), !i(b, w.self.RULES.all));
  }
  se.alwaysValidSchema = n;
  function s(w, b = w.schema) {
    const { opts: C, self: _ } = w;
    if (!C.strictSchema || typeof b == "boolean")
      return;
    const P = _.RULES.keywords;
    for (const U in b)
      P[U] || D(w, `unknown keyword: "${U}"`);
  }
  se.checkUnknownRules = s;
  function i(w, b) {
    if (typeof w == "boolean")
      return !w;
    for (const C in w)
      if (b[C])
        return !0;
    return !1;
  }
  se.schemaHasRules = i;
  function a(w, b) {
    if (typeof w == "boolean")
      return !w;
    for (const C in w)
      if (C !== "$ref" && b.all[C])
        return !0;
    return !1;
  }
  se.schemaHasRulesButRef = a;
  function o({ topSchemaRef: w, schemaPath: b }, C, _, P) {
    if (!P) {
      if (typeof C == "number" || typeof C == "boolean")
        return C;
      if (typeof C == "string")
        return (0, r._)`${C}`;
    }
    return (0, r._)`${w}${b}${(0, r.getProperty)(_)}`;
  }
  se.schemaRefOrVal = o;
  function u(w) {
    return h(decodeURIComponent(w));
  }
  se.unescapeFragment = u;
  function d(w) {
    return encodeURIComponent(l(w));
  }
  se.escapeFragment = d;
  function l(w) {
    return typeof w == "number" ? `${w}` : w.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  se.escapeJsonPointer = l;
  function h(w) {
    return w.replace(/~1/g, "/").replace(/~0/g, "~");
  }
  se.unescapeJsonPointer = h;
  function y(w, b) {
    if (Array.isArray(w))
      for (const C of w)
        b(C);
    else
      b(w);
  }
  se.eachItem = y;
  function v({ mergeNames: w, mergeToName: b, mergeValues: C, resultToName: _ }) {
    return (P, U, H, te) => {
      const ee = H === void 0 ? U : H instanceof r.Name ? (U instanceof r.Name ? w(P, U, H) : b(P, U, H), H) : U instanceof r.Name ? (b(P, H, U), U) : C(U, H);
      return te === r.Name && !(ee instanceof r.Name) ? _(P, ee) : ee;
    };
  }
  se.mergeEvaluated = {
    props: v({
      mergeNames: (w, b, C) => w.if((0, r._)`${C} !== true && ${b} !== undefined`, () => {
        w.if((0, r._)`${b} === true`, () => w.assign(C, !0), () => w.assign(C, (0, r._)`${C} || {}`).code((0, r._)`Object.assign(${C}, ${b})`));
      }),
      mergeToName: (w, b, C) => w.if((0, r._)`${C} !== true`, () => {
        b === !0 ? w.assign(C, !0) : (w.assign(C, (0, r._)`${C} || {}`), g(w, C, b));
      }),
      mergeValues: (w, b) => w === !0 ? !0 : { ...w, ...b },
      resultToName: A
    }),
    items: v({
      mergeNames: (w, b, C) => w.if((0, r._)`${C} !== true && ${b} !== undefined`, () => w.assign(C, (0, r._)`${b} === true ? true : ${C} > ${b} ? ${C} : ${b}`)),
      mergeToName: (w, b, C) => w.if((0, r._)`${C} !== true`, () => w.assign(C, b === !0 ? !0 : (0, r._)`${C} > ${b} ? ${C} : ${b}`)),
      mergeValues: (w, b) => w === !0 ? !0 : Math.max(w, b),
      resultToName: (w, b) => w.var("items", b)
    })
  };
  function A(w, b) {
    if (b === !0)
      return w.var("props", !0);
    const C = w.var("props", (0, r._)`{}`);
    return b !== void 0 && g(w, C, b), C;
  }
  se.evaluatedPropsToName = A;
  function g(w, b, C) {
    Object.keys(C).forEach((_) => w.assign((0, r._)`${b}${(0, r.getProperty)(_)}`, !0));
  }
  se.setEvaluated = g;
  const p = {};
  function f(w, b) {
    return w.scopeValue("func", {
      ref: b,
      code: p[b.code] || (p[b.code] = new e._Code(b.code))
    });
  }
  se.useFunc = f;
  var c;
  (function(w) {
    w[w.Num = 0] = "Num", w[w.Str = 1] = "Str";
  })(c || (se.Type = c = {}));
  function m(w, b, C) {
    if (w instanceof r.Name) {
      const _ = b === c.Num;
      return C ? _ ? (0, r._)`"[" + ${w} + "]"` : (0, r._)`"['" + ${w} + "']"` : _ ? (0, r._)`"/" + ${w}` : (0, r._)`"/" + ${w}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
    }
    return C ? (0, r.getProperty)(w).toString() : "/" + l(w);
  }
  se.getErrorPath = m;
  function D(w, b, C = w.opts.strictSchema) {
    if (C) {
      if (b = `strict mode: ${b}`, C === !0)
        throw new Error(b);
      w.self.logger.warn(b);
    }
  }
  return se.checkStrictMode = D, se;
}
var ar = {}, Hi;
function ct() {
  if (Hi) return ar;
  Hi = 1, Object.defineProperty(ar, "__esModule", { value: !0 });
  const r = ae(), e = {
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
  return ar.default = e, ar;
}
var Gi;
function cn() {
  return Gi || (Gi = 1, function(r) {
    Object.defineProperty(r, "__esModule", { value: !0 }), r.extendErrors = r.resetErrorsCount = r.reportExtraError = r.reportError = r.keyword$DataError = r.keywordError = void 0;
    const e = ae(), t = ue(), n = ct();
    r.keywordError = {
      message: ({ keyword: p }) => (0, e.str)`must pass "${p}" keyword validation`
    }, r.keyword$DataError = {
      message: ({ keyword: p, schemaType: f }) => f ? (0, e.str)`"${p}" keyword must be ${f} ($data)` : (0, e.str)`"${p}" keyword is invalid ($data)`
    };
    function s(p, f = r.keywordError, c, m) {
      const { it: D } = p, { gen: w, compositeRule: b, allErrors: C } = D, _ = h(p, f, c);
      m ?? (b || C) ? u(w, _) : d(D, (0, e._)`[${_}]`);
    }
    r.reportError = s;
    function i(p, f = r.keywordError, c) {
      const { it: m } = p, { gen: D, compositeRule: w, allErrors: b } = m, C = h(p, f, c);
      u(D, C), w || b || d(m, n.default.vErrors);
    }
    r.reportExtraError = i;
    function a(p, f) {
      p.assign(n.default.errors, f), p.if((0, e._)`${n.default.vErrors} !== null`, () => p.if(f, () => p.assign((0, e._)`${n.default.vErrors}.length`, f), () => p.assign(n.default.vErrors, null)));
    }
    r.resetErrorsCount = a;
    function o({ gen: p, keyword: f, schemaValue: c, data: m, errsCount: D, it: w }) {
      if (D === void 0)
        throw new Error("ajv implementation error");
      const b = p.name("err");
      p.forRange("i", D, n.default.errors, (C) => {
        p.const(b, (0, e._)`${n.default.vErrors}[${C}]`), p.if((0, e._)`${b}.instancePath === undefined`, () => p.assign((0, e._)`${b}.instancePath`, (0, e.strConcat)(n.default.instancePath, w.errorPath))), p.assign((0, e._)`${b}.schemaPath`, (0, e.str)`${w.errSchemaPath}/${f}`), w.opts.verbose && (p.assign((0, e._)`${b}.schema`, c), p.assign((0, e._)`${b}.data`, m));
      });
    }
    r.extendErrors = o;
    function u(p, f) {
      const c = p.const("err", f);
      p.if((0, e._)`${n.default.vErrors} === null`, () => p.assign(n.default.vErrors, (0, e._)`[${c}]`), (0, e._)`${n.default.vErrors}.push(${c})`), p.code((0, e._)`${n.default.errors}++`);
    }
    function d(p, f) {
      const { gen: c, validateName: m, schemaEnv: D } = p;
      D.$async ? c.throw((0, e._)`new ${p.ValidationError}(${f})`) : (c.assign((0, e._)`${m}.errors`, f), c.return(!1));
    }
    const l = {
      keyword: new e.Name("keyword"),
      schemaPath: new e.Name("schemaPath"),
      // also used in JTD errors
      params: new e.Name("params"),
      propertyName: new e.Name("propertyName"),
      message: new e.Name("message"),
      schema: new e.Name("schema"),
      parentSchema: new e.Name("parentSchema")
    };
    function h(p, f, c) {
      const { createErrors: m } = p.it;
      return m === !1 ? (0, e._)`{}` : y(p, f, c);
    }
    function y(p, f, c = {}) {
      const { gen: m, it: D } = p, w = [
        v(D, c),
        A(p, c)
      ];
      return g(p, f, w), m.object(...w);
    }
    function v({ errorPath: p }, { instancePath: f }) {
      const c = f ? (0, e.str)`${p}${(0, t.getErrorPath)(f, t.Type.Str)}` : p;
      return [n.default.instancePath, (0, e.strConcat)(n.default.instancePath, c)];
    }
    function A({ keyword: p, it: { errSchemaPath: f } }, { schemaPath: c, parentSchema: m }) {
      let D = m ? f : (0, e.str)`${f}/${p}`;
      return c && (D = (0, e.str)`${D}${(0, t.getErrorPath)(c, t.Type.Str)}`), [l.schemaPath, D];
    }
    function g(p, { params: f, message: c }, m) {
      const { keyword: D, data: w, schemaValue: b, it: C } = p, { opts: _, propertyName: P, topSchemaRef: U, schemaPath: H } = C;
      m.push([l.keyword, D], [l.params, typeof f == "function" ? f(p) : f || (0, e._)`{}`]), _.messages && m.push([l.message, typeof c == "function" ? c(p) : c]), _.verbose && m.push([l.schema, b], [l.parentSchema, (0, e._)`${U}${H}`], [n.default.data, w]), P && m.push([l.propertyName, P]);
    }
  }(kn)), kn;
}
var zi;
function ac() {
  if (zi) return ft;
  zi = 1, Object.defineProperty(ft, "__esModule", { value: !0 }), ft.boolOrEmptySchema = ft.topBoolOrEmptySchema = void 0;
  const r = cn(), e = ae(), t = ct(), n = {
    message: "boolean schema is false"
  };
  function s(o) {
    const { gen: u, schema: d, validateName: l } = o;
    d === !1 ? a(o, !1) : typeof d == "object" && d.$async === !0 ? u.return(t.default.data) : (u.assign((0, e._)`${l}.errors`, null), u.return(!0));
  }
  ft.topBoolOrEmptySchema = s;
  function i(o, u) {
    const { gen: d, schema: l } = o;
    l === !1 ? (d.var(u, !1), a(o)) : d.var(u, !0);
  }
  ft.boolOrEmptySchema = i;
  function a(o, u) {
    const { gen: d, data: l } = o, h = {
      gen: d,
      keyword: "false schema",
      data: l,
      schema: !1,
      schemaCode: !1,
      schemaValue: !1,
      params: {},
      it: o
    };
    (0, r.reportError)(h, n, void 0, u);
  }
  return ft;
}
var Ae = {}, ht = {}, Ki;
function Hu() {
  if (Ki) return ht;
  Ki = 1, Object.defineProperty(ht, "__esModule", { value: !0 }), ht.getRules = ht.isJSONType = void 0;
  const r = ["string", "number", "integer", "boolean", "null", "object", "array"], e = new Set(r);
  function t(s) {
    return typeof s == "string" && e.has(s);
  }
  ht.isJSONType = t;
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
  return ht.getRules = n, ht;
}
var Ze = {}, Wi;
function Gu() {
  if (Wi) return Ze;
  Wi = 1, Object.defineProperty(Ze, "__esModule", { value: !0 }), Ze.shouldUseRule = Ze.shouldUseGroup = Ze.schemaHasRulesForType = void 0;
  function r({ schema: n, self: s }, i) {
    const a = s.RULES.types[i];
    return a && a !== !0 && e(n, a);
  }
  Ze.schemaHasRulesForType = r;
  function e(n, s) {
    return s.rules.some((i) => t(n, i));
  }
  Ze.shouldUseGroup = e;
  function t(n, s) {
    var i;
    return n[s.keyword] !== void 0 || ((i = s.definition.implements) === null || i === void 0 ? void 0 : i.some((a) => n[a] !== void 0));
  }
  return Ze.shouldUseRule = t, Ze;
}
var Xi;
function nn() {
  if (Xi) return Ae;
  Xi = 1, Object.defineProperty(Ae, "__esModule", { value: !0 }), Ae.reportTypeError = Ae.checkDataTypes = Ae.checkDataType = Ae.coerceAndCheckDataType = Ae.getJSONTypes = Ae.getSchemaTypes = Ae.DataType = void 0;
  const r = Hu(), e = Gu(), t = cn(), n = ae(), s = ue();
  var i;
  (function(c) {
    c[c.Correct = 0] = "Correct", c[c.Wrong = 1] = "Wrong";
  })(i || (Ae.DataType = i = {}));
  function a(c) {
    const m = o(c.type);
    if (m.includes("null")) {
      if (c.nullable === !1)
        throw new Error("type: null contradicts nullable: false");
    } else {
      if (!m.length && c.nullable !== void 0)
        throw new Error('"nullable" cannot be used without "type"');
      c.nullable === !0 && m.push("null");
    }
    return m;
  }
  Ae.getSchemaTypes = a;
  function o(c) {
    const m = Array.isArray(c) ? c : c ? [c] : [];
    if (m.every(r.isJSONType))
      return m;
    throw new Error("type must be JSONType or JSONType[]: " + m.join(","));
  }
  Ae.getJSONTypes = o;
  function u(c, m) {
    const { gen: D, data: w, opts: b } = c, C = l(m, b.coerceTypes), _ = m.length > 0 && !(C.length === 0 && m.length === 1 && (0, e.schemaHasRulesForType)(c, m[0]));
    if (_) {
      const P = A(m, w, b.strictNumbers, i.Wrong);
      D.if(P, () => {
        C.length ? h(c, m, C) : p(c);
      });
    }
    return _;
  }
  Ae.coerceAndCheckDataType = u;
  const d = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
  function l(c, m) {
    return m ? c.filter((D) => d.has(D) || m === "array" && D === "array") : [];
  }
  function h(c, m, D) {
    const { gen: w, data: b, opts: C } = c, _ = w.let("dataType", (0, n._)`typeof ${b}`), P = w.let("coerced", (0, n._)`undefined`);
    C.coerceTypes === "array" && w.if((0, n._)`${_} == 'object' && Array.isArray(${b}) && ${b}.length == 1`, () => w.assign(b, (0, n._)`${b}[0]`).assign(_, (0, n._)`typeof ${b}`).if(A(m, b, C.strictNumbers), () => w.assign(P, b))), w.if((0, n._)`${P} !== undefined`);
    for (const H of D)
      (d.has(H) || H === "array" && C.coerceTypes === "array") && U(H);
    w.else(), p(c), w.endIf(), w.if((0, n._)`${P} !== undefined`, () => {
      w.assign(b, P), y(c, P);
    });
    function U(H) {
      switch (H) {
        case "string":
          w.elseIf((0, n._)`${_} == "number" || ${_} == "boolean"`).assign(P, (0, n._)`"" + ${b}`).elseIf((0, n._)`${b} === null`).assign(P, (0, n._)`""`);
          return;
        case "number":
          w.elseIf((0, n._)`${_} == "boolean" || ${b} === null
              || (${_} == "string" && ${b} && ${b} == +${b})`).assign(P, (0, n._)`+${b}`);
          return;
        case "integer":
          w.elseIf((0, n._)`${_} === "boolean" || ${b} === null
              || (${_} === "string" && ${b} && ${b} == +${b} && !(${b} % 1))`).assign(P, (0, n._)`+${b}`);
          return;
        case "boolean":
          w.elseIf((0, n._)`${b} === "false" || ${b} === 0 || ${b} === null`).assign(P, !1).elseIf((0, n._)`${b} === "true" || ${b} === 1`).assign(P, !0);
          return;
        case "null":
          w.elseIf((0, n._)`${b} === "" || ${b} === 0 || ${b} === false`), w.assign(P, null);
          return;
        case "array":
          w.elseIf((0, n._)`${_} === "string" || ${_} === "number"
              || ${_} === "boolean" || ${b} === null`).assign(P, (0, n._)`[${b}]`);
      }
    }
  }
  function y({ gen: c, parentData: m, parentDataProperty: D }, w) {
    c.if((0, n._)`${m} !== undefined`, () => c.assign((0, n._)`${m}[${D}]`, w));
  }
  function v(c, m, D, w = i.Correct) {
    const b = w === i.Correct ? n.operators.EQ : n.operators.NEQ;
    let C;
    switch (c) {
      case "null":
        return (0, n._)`${m} ${b} null`;
      case "array":
        C = (0, n._)`Array.isArray(${m})`;
        break;
      case "object":
        C = (0, n._)`${m} && typeof ${m} == "object" && !Array.isArray(${m})`;
        break;
      case "integer":
        C = _((0, n._)`!(${m} % 1) && !isNaN(${m})`);
        break;
      case "number":
        C = _();
        break;
      default:
        return (0, n._)`typeof ${m} ${b} ${c}`;
    }
    return w === i.Correct ? C : (0, n.not)(C);
    function _(P = n.nil) {
      return (0, n.and)((0, n._)`typeof ${m} == "number"`, P, D ? (0, n._)`isFinite(${m})` : n.nil);
    }
  }
  Ae.checkDataType = v;
  function A(c, m, D, w) {
    if (c.length === 1)
      return v(c[0], m, D, w);
    let b;
    const C = (0, s.toHash)(c);
    if (C.array && C.object) {
      const _ = (0, n._)`typeof ${m} != "object"`;
      b = C.null ? _ : (0, n._)`!${m} || ${_}`, delete C.null, delete C.array, delete C.object;
    } else
      b = n.nil;
    C.number && delete C.integer;
    for (const _ in C)
      b = (0, n.and)(b, v(_, m, D, w));
    return b;
  }
  Ae.checkDataTypes = A;
  const g = {
    message: ({ schema: c }) => `must be ${c}`,
    params: ({ schema: c, schemaValue: m }) => typeof c == "string" ? (0, n._)`{type: ${c}}` : (0, n._)`{type: ${m}}`
  };
  function p(c) {
    const m = f(c);
    (0, t.reportError)(m, g);
  }
  Ae.reportTypeError = p;
  function f(c) {
    const { gen: m, data: D, schema: w } = c, b = (0, s.schemaRefOrVal)(c, w, "type");
    return {
      gen: m,
      keyword: "type",
      data: D,
      schema: w.type,
      schemaCode: b,
      schemaValue: b,
      parentSchema: w,
      params: {},
      it: c
    };
  }
  return Ae;
}
var Lt = {}, Yi;
function oc() {
  if (Yi) return Lt;
  Yi = 1, Object.defineProperty(Lt, "__esModule", { value: !0 }), Lt.assignDefaults = void 0;
  const r = ae(), e = ue();
  function t(s, i) {
    const { properties: a, items: o } = s.schema;
    if (i === "object" && a)
      for (const u in a)
        n(s, u, a[u].default);
    else i === "array" && Array.isArray(o) && o.forEach((u, d) => n(s, d, u.default));
  }
  Lt.assignDefaults = t;
  function n(s, i, a) {
    const { gen: o, compositeRule: u, data: d, opts: l } = s;
    if (a === void 0)
      return;
    const h = (0, r._)`${d}${(0, r.getProperty)(i)}`;
    if (u) {
      (0, e.checkStrictMode)(s, `default is ignored for: ${h}`);
      return;
    }
    let y = (0, r._)`${h} === undefined`;
    l.useDefaults === "empty" && (y = (0, r._)`${y} || ${h} === null || ${h} === ""`), o.if(y, (0, r._)`${h} = ${(0, r.stringify)(a)}`);
  }
  return Lt;
}
var je = {}, fe = {}, Ji;
function ze() {
  if (Ji) return fe;
  Ji = 1, Object.defineProperty(fe, "__esModule", { value: !0 }), fe.validateUnion = fe.validateArray = fe.usePattern = fe.callValidateCode = fe.schemaProperties = fe.allSchemaProperties = fe.noPropertyInData = fe.propertyInData = fe.isOwnProperty = fe.hasPropFunc = fe.reportMissingProp = fe.checkMissingProp = fe.checkReportMissingProp = void 0;
  const r = ae(), e = ue(), t = ct(), n = ue();
  function s(c, m) {
    const { gen: D, data: w, it: b } = c;
    D.if(l(D, w, m, b.opts.ownProperties), () => {
      c.setParams({ missingProperty: (0, r._)`${m}` }, !0), c.error();
    });
  }
  fe.checkReportMissingProp = s;
  function i({ gen: c, data: m, it: { opts: D } }, w, b) {
    return (0, r.or)(...w.map((C) => (0, r.and)(l(c, m, C, D.ownProperties), (0, r._)`${b} = ${C}`)));
  }
  fe.checkMissingProp = i;
  function a(c, m) {
    c.setParams({ missingProperty: m }, !0), c.error();
  }
  fe.reportMissingProp = a;
  function o(c) {
    return c.scopeValue("func", {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ref: Object.prototype.hasOwnProperty,
      code: (0, r._)`Object.prototype.hasOwnProperty`
    });
  }
  fe.hasPropFunc = o;
  function u(c, m, D) {
    return (0, r._)`${o(c)}.call(${m}, ${D})`;
  }
  fe.isOwnProperty = u;
  function d(c, m, D, w) {
    const b = (0, r._)`${m}${(0, r.getProperty)(D)} !== undefined`;
    return w ? (0, r._)`${b} && ${u(c, m, D)}` : b;
  }
  fe.propertyInData = d;
  function l(c, m, D, w) {
    const b = (0, r._)`${m}${(0, r.getProperty)(D)} === undefined`;
    return w ? (0, r.or)(b, (0, r.not)(u(c, m, D))) : b;
  }
  fe.noPropertyInData = l;
  function h(c) {
    return c ? Object.keys(c).filter((m) => m !== "__proto__") : [];
  }
  fe.allSchemaProperties = h;
  function y(c, m) {
    return h(m).filter((D) => !(0, e.alwaysValidSchema)(c, m[D]));
  }
  fe.schemaProperties = y;
  function v({ schemaCode: c, data: m, it: { gen: D, topSchemaRef: w, schemaPath: b, errorPath: C }, it: _ }, P, U, H) {
    const te = H ? (0, r._)`${c}, ${m}, ${w}${b}` : m, ee = [
      [t.default.instancePath, (0, r.strConcat)(t.default.instancePath, C)],
      [t.default.parentData, _.parentData],
      [t.default.parentDataProperty, _.parentDataProperty],
      [t.default.rootData, t.default.rootData]
    ];
    _.opts.dynamicRef && ee.push([t.default.dynamicAnchors, t.default.dynamicAnchors]);
    const L = (0, r._)`${te}, ${D.object(...ee)}`;
    return U !== r.nil ? (0, r._)`${P}.call(${U}, ${L})` : (0, r._)`${P}(${L})`;
  }
  fe.callValidateCode = v;
  const A = (0, r._)`new RegExp`;
  function g({ gen: c, it: { opts: m } }, D) {
    const w = m.unicodeRegExp ? "u" : "", { regExp: b } = m.code, C = b(D, w);
    return c.scopeValue("pattern", {
      key: C.toString(),
      ref: C,
      code: (0, r._)`${b.code === "new RegExp" ? A : (0, n.useFunc)(c, b)}(${D}, ${w})`
    });
  }
  fe.usePattern = g;
  function p(c) {
    const { gen: m, data: D, keyword: w, it: b } = c, C = m.name("valid");
    if (b.allErrors) {
      const P = m.let("valid", !0);
      return _(() => m.assign(P, !1)), P;
    }
    return m.var(C, !0), _(() => m.break()), C;
    function _(P) {
      const U = m.const("len", (0, r._)`${D}.length`);
      m.forRange("i", 0, U, (H) => {
        c.subschema({
          keyword: w,
          dataProp: H,
          dataPropType: e.Type.Num
        }, C), m.if((0, r.not)(C), P);
      });
    }
  }
  fe.validateArray = p;
  function f(c) {
    const { gen: m, schema: D, keyword: w, it: b } = c;
    if (!Array.isArray(D))
      throw new Error("ajv implementation error");
    if (D.some((U) => (0, e.alwaysValidSchema)(b, U)) && !b.opts.unevaluated)
      return;
    const _ = m.let("valid", !1), P = m.name("_valid");
    m.block(() => D.forEach((U, H) => {
      const te = c.subschema({
        keyword: w,
        schemaProp: H,
        compositeRule: !0
      }, P);
      m.assign(_, (0, r._)`${_} || ${P}`), c.mergeValidEvaluated(te, P) || m.if((0, r.not)(_));
    })), c.result(_, () => c.reset(), () => c.error(!0));
  }
  return fe.validateUnion = f, fe;
}
var Qi;
function uc() {
  if (Qi) return je;
  Qi = 1, Object.defineProperty(je, "__esModule", { value: !0 }), je.validateKeywordUsage = je.validSchemaType = je.funcKeywordCode = je.macroKeywordCode = void 0;
  const r = ae(), e = ct(), t = ze(), n = cn();
  function s(y, v) {
    const { gen: A, keyword: g, schema: p, parentSchema: f, it: c } = y, m = v.macro.call(c.self, p, f, c), D = d(A, g, m);
    c.opts.validateSchema !== !1 && c.self.validateSchema(m, !0);
    const w = A.name("valid");
    y.subschema({
      schema: m,
      schemaPath: r.nil,
      errSchemaPath: `${c.errSchemaPath}/${g}`,
      topSchemaRef: D,
      compositeRule: !0
    }, w), y.pass(w, () => y.error(!0));
  }
  je.macroKeywordCode = s;
  function i(y, v) {
    var A;
    const { gen: g, keyword: p, schema: f, parentSchema: c, $data: m, it: D } = y;
    u(D, v);
    const w = !m && v.compile ? v.compile.call(D.self, f, c, D) : v.validate, b = d(g, p, w), C = g.let("valid");
    y.block$data(C, _), y.ok((A = v.valid) !== null && A !== void 0 ? A : C);
    function _() {
      if (v.errors === !1)
        H(), v.modifying && a(y), te(() => y.error());
      else {
        const ee = v.async ? P() : U();
        v.modifying && a(y), te(() => o(y, ee));
      }
    }
    function P() {
      const ee = g.let("ruleErrs", null);
      return g.try(() => H((0, r._)`await `), (L) => g.assign(C, !1).if((0, r._)`${L} instanceof ${D.ValidationError}`, () => g.assign(ee, (0, r._)`${L}.errors`), () => g.throw(L))), ee;
    }
    function U() {
      const ee = (0, r._)`${b}.errors`;
      return g.assign(ee, null), H(r.nil), ee;
    }
    function H(ee = v.async ? (0, r._)`await ` : r.nil) {
      const L = D.opts.passContext ? e.default.this : e.default.self, B = !("compile" in v && !m || v.schema === !1);
      g.assign(C, (0, r._)`${ee}${(0, t.callValidateCode)(y, b, L, B)}`, v.modifying);
    }
    function te(ee) {
      var L;
      g.if((0, r.not)((L = v.valid) !== null && L !== void 0 ? L : C), ee);
    }
  }
  je.funcKeywordCode = i;
  function a(y) {
    const { gen: v, data: A, it: g } = y;
    v.if(g.parentData, () => v.assign(A, (0, r._)`${g.parentData}[${g.parentDataProperty}]`));
  }
  function o(y, v) {
    const { gen: A } = y;
    A.if((0, r._)`Array.isArray(${v})`, () => {
      A.assign(e.default.vErrors, (0, r._)`${e.default.vErrors} === null ? ${v} : ${e.default.vErrors}.concat(${v})`).assign(e.default.errors, (0, r._)`${e.default.vErrors}.length`), (0, n.extendErrors)(y);
    }, () => y.error());
  }
  function u({ schemaEnv: y }, v) {
    if (v.async && !y.$async)
      throw new Error("async keyword in sync schema");
  }
  function d(y, v, A) {
    if (A === void 0)
      throw new Error(`keyword "${v}" failed to compile`);
    return y.scopeValue("keyword", typeof A == "function" ? { ref: A } : { ref: A, code: (0, r.stringify)(A) });
  }
  function l(y, v, A = !1) {
    return !v.length || v.some((g) => g === "array" ? Array.isArray(y) : g === "object" ? y && typeof y == "object" && !Array.isArray(y) : typeof y == g || A && typeof y > "u");
  }
  je.validSchemaType = l;
  function h({ schema: y, opts: v, self: A, errSchemaPath: g }, p, f) {
    if (Array.isArray(p.keyword) ? !p.keyword.includes(f) : p.keyword !== f)
      throw new Error("ajv implementation error");
    const c = p.dependencies;
    if (c != null && c.some((m) => !Object.prototype.hasOwnProperty.call(y, m)))
      throw new Error(`parent schema must have dependencies of ${f}: ${c.join(",")}`);
    if (p.validateSchema && !p.validateSchema(y[f])) {
      const D = `keyword "${f}" value is invalid at path "${g}": ` + A.errorsText(p.validateSchema.errors);
      if (v.validateSchema === "log")
        A.logger.error(D);
      else
        throw new Error(D);
    }
  }
  return je.validateKeywordUsage = h, je;
}
var et = {}, Zi;
function lc() {
  if (Zi) return et;
  Zi = 1, Object.defineProperty(et, "__esModule", { value: !0 }), et.extendSubschemaMode = et.extendSubschemaData = et.getSubschema = void 0;
  const r = ae(), e = ue();
  function t(i, { keyword: a, schemaProp: o, schema: u, schemaPath: d, errSchemaPath: l, topSchemaRef: h }) {
    if (a !== void 0 && u !== void 0)
      throw new Error('both "keyword" and "schema" passed, only one allowed');
    if (a !== void 0) {
      const y = i.schema[a];
      return o === void 0 ? {
        schema: y,
        schemaPath: (0, r._)`${i.schemaPath}${(0, r.getProperty)(a)}`,
        errSchemaPath: `${i.errSchemaPath}/${a}`
      } : {
        schema: y[o],
        schemaPath: (0, r._)`${i.schemaPath}${(0, r.getProperty)(a)}${(0, r.getProperty)(o)}`,
        errSchemaPath: `${i.errSchemaPath}/${a}/${(0, e.escapeFragment)(o)}`
      };
    }
    if (u !== void 0) {
      if (d === void 0 || l === void 0 || h === void 0)
        throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
      return {
        schema: u,
        schemaPath: d,
        topSchemaRef: h,
        errSchemaPath: l
      };
    }
    throw new Error('either "keyword" or "schema" must be passed');
  }
  et.getSubschema = t;
  function n(i, a, { dataProp: o, dataPropType: u, data: d, dataTypes: l, propertyName: h }) {
    if (d !== void 0 && o !== void 0)
      throw new Error('both "data" and "dataProp" passed, only one allowed');
    const { gen: y } = a;
    if (o !== void 0) {
      const { errorPath: A, dataPathArr: g, opts: p } = a, f = y.let("data", (0, r._)`${a.data}${(0, r.getProperty)(o)}`, !0);
      v(f), i.errorPath = (0, r.str)`${A}${(0, e.getErrorPath)(o, u, p.jsPropertySyntax)}`, i.parentDataProperty = (0, r._)`${o}`, i.dataPathArr = [...g, i.parentDataProperty];
    }
    if (d !== void 0) {
      const A = d instanceof r.Name ? d : y.let("data", d, !0);
      v(A), h !== void 0 && (i.propertyName = h);
    }
    l && (i.dataTypes = l);
    function v(A) {
      i.data = A, i.dataLevel = a.dataLevel + 1, i.dataTypes = [], a.definedProperties = /* @__PURE__ */ new Set(), i.parentData = a.data, i.dataNames = [...a.dataNames, A];
    }
  }
  et.extendSubschemaData = n;
  function s(i, { jtdDiscriminator: a, jtdMetadata: o, compositeRule: u, createErrors: d, allErrors: l }) {
    u !== void 0 && (i.compositeRule = u), d !== void 0 && (i.createErrors = d), l !== void 0 && (i.allErrors = l), i.jtdDiscriminator = a, i.jtdMetadata = o;
  }
  return et.extendSubschemaMode = s, et;
}
var Re = {}, Ln, ea;
function zu() {
  return ea || (ea = 1, Ln = function r(e, t) {
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
  }), Ln;
}
var Bn = { exports: {} }, ta;
function cc() {
  if (ta) return Bn.exports;
  ta = 1;
  var r = Bn.exports = function(n, s, i) {
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
  function e(n, s, i, a, o, u, d, l, h, y) {
    if (a && typeof a == "object" && !Array.isArray(a)) {
      s(a, o, u, d, l, h, y);
      for (var v in a) {
        var A = a[v];
        if (Array.isArray(A)) {
          if (v in r.arrayKeywords)
            for (var g = 0; g < A.length; g++)
              e(n, s, i, A[g], o + "/" + v + "/" + g, u, o, v, a, g);
        } else if (v in r.propsKeywords) {
          if (A && typeof A == "object")
            for (var p in A)
              e(n, s, i, A[p], o + "/" + v + "/" + t(p), u, o, v, a, p);
        } else (v in r.keywords || n.allKeys && !(v in r.skipKeywords)) && e(n, s, i, A, o + "/" + v, u, o, v, a);
      }
      i(a, o, u, d, l, h, y);
    }
  }
  function t(n) {
    return n.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  return Bn.exports;
}
var ra;
function dn() {
  if (ra) return Re;
  ra = 1, Object.defineProperty(Re, "__esModule", { value: !0 }), Re.getSchemaRefs = Re.resolveUrl = Re.normalizeId = Re._getFullPath = Re.getFullPath = Re.inlineRef = void 0;
  const r = ue(), e = zu(), t = cc(), n = /* @__PURE__ */ new Set([
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
  function s(g, p = !0) {
    return typeof g == "boolean" ? !0 : p === !0 ? !a(g) : p ? o(g) <= p : !1;
  }
  Re.inlineRef = s;
  const i = /* @__PURE__ */ new Set([
    "$ref",
    "$recursiveRef",
    "$recursiveAnchor",
    "$dynamicRef",
    "$dynamicAnchor"
  ]);
  function a(g) {
    for (const p in g) {
      if (i.has(p))
        return !0;
      const f = g[p];
      if (Array.isArray(f) && f.some(a) || typeof f == "object" && a(f))
        return !0;
    }
    return !1;
  }
  function o(g) {
    let p = 0;
    for (const f in g) {
      if (f === "$ref")
        return 1 / 0;
      if (p++, !n.has(f) && (typeof g[f] == "object" && (0, r.eachItem)(g[f], (c) => p += o(c)), p === 1 / 0))
        return 1 / 0;
    }
    return p;
  }
  function u(g, p = "", f) {
    f !== !1 && (p = h(p));
    const c = g.parse(p);
    return d(g, c);
  }
  Re.getFullPath = u;
  function d(g, p) {
    return g.serialize(p).split("#")[0] + "#";
  }
  Re._getFullPath = d;
  const l = /#\/?$/;
  function h(g) {
    return g ? g.replace(l, "") : "";
  }
  Re.normalizeId = h;
  function y(g, p, f) {
    return f = h(f), g.resolve(p, f);
  }
  Re.resolveUrl = y;
  const v = /^[a-z_][-a-z0-9._]*$/i;
  function A(g, p) {
    if (typeof g == "boolean")
      return {};
    const { schemaId: f, uriResolver: c } = this.opts, m = h(g[f] || p), D = { "": m }, w = u(c, m, !1), b = {}, C = /* @__PURE__ */ new Set();
    return t(g, { allKeys: !0 }, (U, H, te, ee) => {
      if (ee === void 0)
        return;
      const L = w + H;
      let B = D[ee];
      typeof U[f] == "string" && (B = W.call(this, U[f])), z.call(this, U.$anchor), z.call(this, U.$dynamicAnchor), D[H] = B;
      function W(V) {
        const K = this.opts.uriResolver.resolve;
        if (V = h(B ? K(B, V) : V), C.has(V))
          throw P(V);
        C.add(V);
        let I = this.refs[V];
        return typeof I == "string" && (I = this.refs[I]), typeof I == "object" ? _(U, I.schema, V) : V !== h(L) && (V[0] === "#" ? (_(U, b[V], V), b[V] = U) : this.refs[V] = L), V;
      }
      function z(V) {
        if (typeof V == "string") {
          if (!v.test(V))
            throw new Error(`invalid anchor "${V}"`);
          W.call(this, `#${V}`);
        }
      }
    }), b;
    function _(U, H, te) {
      if (H !== void 0 && !e(U, H))
        throw P(te);
    }
    function P(U) {
      return new Error(`reference "${U}" resolves to more than one schema`);
    }
  }
  return Re.getSchemaRefs = A, Re;
}
var na;
function fn() {
  if (na) return Qe;
  na = 1, Object.defineProperty(Qe, "__esModule", { value: !0 }), Qe.getData = Qe.KeywordCxt = Qe.validateFunctionCode = void 0;
  const r = ac(), e = nn(), t = Gu(), n = nn(), s = oc(), i = uc(), a = lc(), o = ae(), u = ct(), d = dn(), l = ue(), h = cn();
  function y(R) {
    if (w(R) && (C(R), D(R))) {
      p(R);
      return;
    }
    v(R, () => (0, r.topBoolOrEmptySchema)(R));
  }
  Qe.validateFunctionCode = y;
  function v({ gen: R, validateName: N, schema: x, schemaEnv: M, opts: Y }, ie) {
    Y.code.es5 ? R.func(N, (0, o._)`${u.default.data}, ${u.default.valCxt}`, M.$async, () => {
      R.code((0, o._)`"use strict"; ${c(x, Y)}`), g(R, Y), R.code(ie);
    }) : R.func(N, (0, o._)`${u.default.data}, ${A(Y)}`, M.$async, () => R.code(c(x, Y)).code(ie));
  }
  function A(R) {
    return (0, o._)`{${u.default.instancePath}="", ${u.default.parentData}, ${u.default.parentDataProperty}, ${u.default.rootData}=${u.default.data}${R.dynamicRef ? (0, o._)`, ${u.default.dynamicAnchors}={}` : o.nil}}={}`;
  }
  function g(R, N) {
    R.if(u.default.valCxt, () => {
      R.var(u.default.instancePath, (0, o._)`${u.default.valCxt}.${u.default.instancePath}`), R.var(u.default.parentData, (0, o._)`${u.default.valCxt}.${u.default.parentData}`), R.var(u.default.parentDataProperty, (0, o._)`${u.default.valCxt}.${u.default.parentDataProperty}`), R.var(u.default.rootData, (0, o._)`${u.default.valCxt}.${u.default.rootData}`), N.dynamicRef && R.var(u.default.dynamicAnchors, (0, o._)`${u.default.valCxt}.${u.default.dynamicAnchors}`);
    }, () => {
      R.var(u.default.instancePath, (0, o._)`""`), R.var(u.default.parentData, (0, o._)`undefined`), R.var(u.default.parentDataProperty, (0, o._)`undefined`), R.var(u.default.rootData, u.default.data), N.dynamicRef && R.var(u.default.dynamicAnchors, (0, o._)`{}`);
    });
  }
  function p(R) {
    const { schema: N, opts: x, gen: M } = R;
    v(R, () => {
      x.$comment && N.$comment && ee(R), U(R), M.let(u.default.vErrors, null), M.let(u.default.errors, 0), x.unevaluated && f(R), _(R), L(R);
    });
  }
  function f(R) {
    const { gen: N, validateName: x } = R;
    R.evaluated = N.const("evaluated", (0, o._)`${x}.evaluated`), N.if((0, o._)`${R.evaluated}.dynamicProps`, () => N.assign((0, o._)`${R.evaluated}.props`, (0, o._)`undefined`)), N.if((0, o._)`${R.evaluated}.dynamicItems`, () => N.assign((0, o._)`${R.evaluated}.items`, (0, o._)`undefined`));
  }
  function c(R, N) {
    const x = typeof R == "object" && R[N.schemaId];
    return x && (N.code.source || N.code.process) ? (0, o._)`/*# sourceURL=${x} */` : o.nil;
  }
  function m(R, N) {
    if (w(R) && (C(R), D(R))) {
      b(R, N);
      return;
    }
    (0, r.boolOrEmptySchema)(R, N);
  }
  function D({ schema: R, self: N }) {
    if (typeof R == "boolean")
      return !R;
    for (const x in R)
      if (N.RULES.all[x])
        return !0;
    return !1;
  }
  function w(R) {
    return typeof R.schema != "boolean";
  }
  function b(R, N) {
    const { schema: x, gen: M, opts: Y } = R;
    Y.$comment && x.$comment && ee(R), H(R), te(R);
    const ie = M.const("_errs", u.default.errors);
    _(R, ie), M.var(N, (0, o._)`${ie} === ${u.default.errors}`);
  }
  function C(R) {
    (0, l.checkUnknownRules)(R), P(R);
  }
  function _(R, N) {
    if (R.opts.jtd)
      return W(R, [], !1, N);
    const x = (0, e.getSchemaTypes)(R.schema), M = (0, e.coerceAndCheckDataType)(R, x);
    W(R, x, !M, N);
  }
  function P(R) {
    const { schema: N, errSchemaPath: x, opts: M, self: Y } = R;
    N.$ref && M.ignoreKeywordsWithRef && (0, l.schemaHasRulesButRef)(N, Y.RULES) && Y.logger.warn(`$ref: keywords ignored in schema at path "${x}"`);
  }
  function U(R) {
    const { schema: N, opts: x } = R;
    N.default !== void 0 && x.useDefaults && x.strictSchema && (0, l.checkStrictMode)(R, "default is ignored in the schema root");
  }
  function H(R) {
    const N = R.schema[R.opts.schemaId];
    N && (R.baseId = (0, d.resolveUrl)(R.opts.uriResolver, R.baseId, N));
  }
  function te(R) {
    if (R.schema.$async && !R.schemaEnv.$async)
      throw new Error("async schema in sync schema");
  }
  function ee({ gen: R, schemaEnv: N, schema: x, errSchemaPath: M, opts: Y }) {
    const ie = x.$comment;
    if (Y.$comment === !0)
      R.code((0, o._)`${u.default.self}.logger.log(${ie})`);
    else if (typeof Y.$comment == "function") {
      const De = (0, o.str)`${M}/$comment`, Be = R.scopeValue("root", { ref: N.root });
      R.code((0, o._)`${u.default.self}.opts.$comment(${ie}, ${De}, ${Be}.schema)`);
    }
  }
  function L(R) {
    const { gen: N, schemaEnv: x, validateName: M, ValidationError: Y, opts: ie } = R;
    x.$async ? N.if((0, o._)`${u.default.errors} === 0`, () => N.return(u.default.data), () => N.throw((0, o._)`new ${Y}(${u.default.vErrors})`)) : (N.assign((0, o._)`${M}.errors`, u.default.vErrors), ie.unevaluated && B(R), N.return((0, o._)`${u.default.errors} === 0`));
  }
  function B({ gen: R, evaluated: N, props: x, items: M }) {
    x instanceof o.Name && R.assign((0, o._)`${N}.props`, x), M instanceof o.Name && R.assign((0, o._)`${N}.items`, M);
  }
  function W(R, N, x, M) {
    const { gen: Y, schema: ie, data: De, allErrors: Be, opts: Ne, self: Fe } = R, { RULES: we } = Fe;
    if (ie.$ref && (Ne.ignoreKeywordsWithRef || !(0, l.schemaHasRulesButRef)(ie, we))) {
      Y.block(() => X(R, "$ref", we.all.$ref.definition));
      return;
    }
    Ne.jtd || V(R, N), Y.block(() => {
      for (const Oe of we.rules)
        wt(Oe);
      wt(we.post);
    });
    function wt(Oe) {
      (0, t.shouldUseGroup)(ie, Oe) && (Oe.type ? (Y.if((0, n.checkDataType)(Oe.type, De, Ne.strictNumbers)), z(R, Oe), N.length === 1 && N[0] === Oe.type && x && (Y.else(), (0, n.reportTypeError)(R)), Y.endIf()) : z(R, Oe), Be || Y.if((0, o._)`${u.default.errors} === ${M || 0}`));
    }
  }
  function z(R, N) {
    const { gen: x, schema: M, opts: { useDefaults: Y } } = R;
    Y && (0, s.assignDefaults)(R, N.type), x.block(() => {
      for (const ie of N.rules)
        (0, t.shouldUseRule)(M, ie) && X(R, ie.keyword, ie.definition, N.type);
    });
  }
  function V(R, N) {
    R.schemaEnv.meta || !R.opts.strictTypes || (K(R, N), R.opts.allowUnionTypes || I(R, N), S(R, R.dataTypes));
  }
  function K(R, N) {
    if (N.length) {
      if (!R.dataTypes.length) {
        R.dataTypes = N;
        return;
      }
      N.forEach((x) => {
        T(R.dataTypes, x) || $(R, `type "${x}" not allowed by context "${R.dataTypes.join(",")}"`);
      }), E(R, N);
    }
  }
  function I(R, N) {
    N.length > 1 && !(N.length === 2 && N.includes("null")) && $(R, "use allowUnionTypes to allow union type keyword");
  }
  function S(R, N) {
    const x = R.self.RULES.all;
    for (const M in x) {
      const Y = x[M];
      if (typeof Y == "object" && (0, t.shouldUseRule)(R.schema, Y)) {
        const { type: ie } = Y.definition;
        ie.length && !ie.some((De) => F(N, De)) && $(R, `missing type "${ie.join(",")}" for keyword "${M}"`);
      }
    }
  }
  function F(R, N) {
    return R.includes(N) || N === "number" && R.includes("integer");
  }
  function T(R, N) {
    return R.includes(N) || N === "integer" && R.includes("number");
  }
  function E(R, N) {
    const x = [];
    for (const M of R.dataTypes)
      T(N, M) ? x.push(M) : N.includes("integer") && M === "number" && x.push("integer");
    R.dataTypes = x;
  }
  function $(R, N) {
    const x = R.schemaEnv.baseId + R.errSchemaPath;
    N += ` at "${x}" (strictTypes)`, (0, l.checkStrictMode)(R, N, R.opts.strictTypes);
  }
  class k {
    constructor(N, x, M) {
      if ((0, i.validateKeywordUsage)(N, x, M), this.gen = N.gen, this.allErrors = N.allErrors, this.keyword = M, this.data = N.data, this.schema = N.schema[M], this.$data = x.$data && N.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, l.schemaRefOrVal)(N, this.schema, M, this.$data), this.schemaType = x.schemaType, this.parentSchema = N.schema, this.params = {}, this.it = N, this.def = x, this.$data)
        this.schemaCode = N.gen.const("vSchema", oe(this.$data, N));
      else if (this.schemaCode = this.schemaValue, !(0, i.validSchemaType)(this.schema, x.schemaType, x.allowUndefined))
        throw new Error(`${M} value must be ${JSON.stringify(x.schemaType)}`);
      ("code" in x ? x.trackErrors : x.errors !== !1) && (this.errsCount = N.gen.const("_errs", u.default.errors));
    }
    result(N, x, M) {
      this.failResult((0, o.not)(N), x, M);
    }
    failResult(N, x, M) {
      this.gen.if(N), M ? M() : this.error(), x ? (this.gen.else(), x(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    pass(N, x) {
      this.failResult((0, o.not)(N), void 0, x);
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
      const { schemaCode: x } = this;
      this.fail((0, o._)`${x} !== undefined && (${(0, o.or)(this.invalid$data(), N)})`);
    }
    error(N, x, M) {
      if (x) {
        this.setParams(x), this._error(N, M), this.setParams({});
        return;
      }
      this._error(N, M);
    }
    _error(N, x) {
      (N ? h.reportExtraError : h.reportError)(this, this.def.error, x);
    }
    $dataError() {
      (0, h.reportError)(this, this.def.$dataError || h.keyword$DataError);
    }
    reset() {
      if (this.errsCount === void 0)
        throw new Error('add "trackErrors" to keyword definition');
      (0, h.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(N) {
      this.allErrors || this.gen.if(N);
    }
    setParams(N, x) {
      x ? Object.assign(this.params, N) : this.params = N;
    }
    block$data(N, x, M = o.nil) {
      this.gen.block(() => {
        this.check$data(N, M), x();
      });
    }
    check$data(N = o.nil, x = o.nil) {
      if (!this.$data)
        return;
      const { gen: M, schemaCode: Y, schemaType: ie, def: De } = this;
      M.if((0, o.or)((0, o._)`${Y} === undefined`, x)), N !== o.nil && M.assign(N, !0), (ie.length || De.validateSchema) && (M.elseIf(this.invalid$data()), this.$dataError(), N !== o.nil && M.assign(N, !1)), M.else();
    }
    invalid$data() {
      const { gen: N, schemaCode: x, schemaType: M, def: Y, it: ie } = this;
      return (0, o.or)(De(), Be());
      function De() {
        if (M.length) {
          if (!(x instanceof o.Name))
            throw new Error("ajv implementation error");
          const Ne = Array.isArray(M) ? M : [M];
          return (0, o._)`${(0, n.checkDataTypes)(Ne, x, ie.opts.strictNumbers, n.DataType.Wrong)}`;
        }
        return o.nil;
      }
      function Be() {
        if (Y.validateSchema) {
          const Ne = N.scopeValue("validate$data", { ref: Y.validateSchema });
          return (0, o._)`!${Ne}(${x})`;
        }
        return o.nil;
      }
    }
    subschema(N, x) {
      const M = (0, a.getSubschema)(this.it, N);
      (0, a.extendSubschemaData)(M, this.it, N), (0, a.extendSubschemaMode)(M, N);
      const Y = { ...this.it, ...M, items: void 0, props: void 0 };
      return m(Y, x), Y;
    }
    mergeEvaluated(N, x) {
      const { it: M, gen: Y } = this;
      M.opts.unevaluated && (M.props !== !0 && N.props !== void 0 && (M.props = l.mergeEvaluated.props(Y, N.props, M.props, x)), M.items !== !0 && N.items !== void 0 && (M.items = l.mergeEvaluated.items(Y, N.items, M.items, x)));
    }
    mergeValidEvaluated(N, x) {
      const { it: M, gen: Y } = this;
      if (M.opts.unevaluated && (M.props !== !0 || M.items !== !0))
        return Y.if(x, () => this.mergeEvaluated(N, o.Name)), !0;
    }
  }
  Qe.KeywordCxt = k;
  function X(R, N, x, M) {
    const Y = new k(R, x, N);
    "code" in x ? x.code(Y, M) : Y.$data && x.validate ? (0, i.funcKeywordCode)(Y, x) : "macro" in x ? (0, i.macroKeywordCode)(Y, x) : (x.compile || x.validate) && (0, i.funcKeywordCode)(Y, x);
  }
  const J = /^\/(?:[^~]|~0|~1)*$/, le = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function oe(R, { dataLevel: N, dataNames: x, dataPathArr: M }) {
    let Y, ie;
    if (R === "")
      return u.default.rootData;
    if (R[0] === "/") {
      if (!J.test(R))
        throw new Error(`Invalid JSON-pointer: ${R}`);
      Y = R, ie = u.default.rootData;
    } else {
      const Fe = le.exec(R);
      if (!Fe)
        throw new Error(`Invalid JSON-pointer: ${R}`);
      const we = +Fe[1];
      if (Y = Fe[2], Y === "#") {
        if (we >= N)
          throw new Error(Ne("property/index", we));
        return M[N - we];
      }
      if (we > N)
        throw new Error(Ne("data", we));
      if (ie = x[N - we], !Y)
        return ie;
    }
    let De = ie;
    const Be = Y.split("/");
    for (const Fe of Be)
      Fe && (ie = (0, o._)`${ie}${(0, o.getProperty)((0, l.unescapeJsonPointer)(Fe))}`, De = (0, o._)`${De} && ${ie}`);
    return De;
    function Ne(Fe, we) {
      return `Cannot access ${Fe} ${we} levels up, current level is ${N}`;
    }
  }
  return Qe.getData = oe, Qe;
}
var or = {}, sa;
function ui() {
  if (sa) return or;
  sa = 1, Object.defineProperty(or, "__esModule", { value: !0 });
  class r extends Error {
    constructor(t) {
      super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
    }
  }
  return or.default = r, or;
}
var ur = {}, ia;
function hn() {
  if (ia) return ur;
  ia = 1, Object.defineProperty(ur, "__esModule", { value: !0 });
  const r = dn();
  class e extends Error {
    constructor(n, s, i, a) {
      super(a || `can't resolve reference ${i} from id ${s}`), this.missingRef = (0, r.resolveUrl)(n, s, i), this.missingSchema = (0, r.normalizeId)((0, r.getFullPath)(n, this.missingRef));
    }
  }
  return ur.default = e, ur;
}
var Ie = {}, aa;
function li() {
  if (aa) return Ie;
  aa = 1, Object.defineProperty(Ie, "__esModule", { value: !0 }), Ie.resolveSchema = Ie.getCompilingSchema = Ie.resolveRef = Ie.compileSchema = Ie.SchemaEnv = void 0;
  const r = ae(), e = ui(), t = ct(), n = dn(), s = ue(), i = fn();
  class a {
    constructor(f) {
      var c;
      this.refs = {}, this.dynamicAnchors = {};
      let m;
      typeof f.schema == "object" && (m = f.schema), this.schema = f.schema, this.schemaId = f.schemaId, this.root = f.root || this, this.baseId = (c = f.baseId) !== null && c !== void 0 ? c : (0, n.normalizeId)(m == null ? void 0 : m[f.schemaId || "$id"]), this.schemaPath = f.schemaPath, this.localRefs = f.localRefs, this.meta = f.meta, this.$async = m == null ? void 0 : m.$async, this.refs = {};
    }
  }
  Ie.SchemaEnv = a;
  function o(p) {
    const f = l.call(this, p);
    if (f)
      return f;
    const c = (0, n.getFullPath)(this.opts.uriResolver, p.root.baseId), { es5: m, lines: D } = this.opts.code, { ownProperties: w } = this.opts, b = new r.CodeGen(this.scope, { es5: m, lines: D, ownProperties: w });
    let C;
    p.$async && (C = b.scopeValue("Error", {
      ref: e.default,
      code: (0, r._)`require("ajv/dist/runtime/validation_error").default`
    }));
    const _ = b.scopeName("validate");
    p.validateName = _;
    const P = {
      gen: b,
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
      topSchemaRef: b.scopeValue("schema", this.opts.code.source === !0 ? { ref: p.schema, code: (0, r.stringify)(p.schema) } : { ref: p.schema }),
      validateName: _,
      ValidationError: C,
      schema: p.schema,
      schemaEnv: p,
      rootId: c,
      baseId: p.baseId || c,
      schemaPath: r.nil,
      errSchemaPath: p.schemaPath || (this.opts.jtd ? "" : "#"),
      errorPath: (0, r._)`""`,
      opts: this.opts,
      self: this
    };
    let U;
    try {
      this._compilations.add(p), (0, i.validateFunctionCode)(P), b.optimize(this.opts.code.optimize);
      const H = b.toString();
      U = `${b.scopeRefs(t.default.scope)}return ${H}`, this.opts.code.process && (U = this.opts.code.process(U, p));
      const ee = new Function(`${t.default.self}`, `${t.default.scope}`, U)(this, this.scope.get());
      if (this.scope.value(_, { ref: ee }), ee.errors = null, ee.schema = p.schema, ee.schemaEnv = p, p.$async && (ee.$async = !0), this.opts.code.source === !0 && (ee.source = { validateName: _, validateCode: H, scopeValues: b._values }), this.opts.unevaluated) {
        const { props: L, items: B } = P;
        ee.evaluated = {
          props: L instanceof r.Name ? void 0 : L,
          items: B instanceof r.Name ? void 0 : B,
          dynamicProps: L instanceof r.Name,
          dynamicItems: B instanceof r.Name
        }, ee.source && (ee.source.evaluated = (0, r.stringify)(ee.evaluated));
      }
      return p.validate = ee, p;
    } catch (H) {
      throw delete p.validate, delete p.validateName, U && this.logger.error("Error compiling schema, function code:", U), H;
    } finally {
      this._compilations.delete(p);
    }
  }
  Ie.compileSchema = o;
  function u(p, f, c) {
    var m;
    c = (0, n.resolveUrl)(this.opts.uriResolver, f, c);
    const D = p.refs[c];
    if (D)
      return D;
    let w = y.call(this, p, c);
    if (w === void 0) {
      const b = (m = p.localRefs) === null || m === void 0 ? void 0 : m[c], { schemaId: C } = this.opts;
      b && (w = new a({ schema: b, schemaId: C, root: p, baseId: f }));
    }
    if (w !== void 0)
      return p.refs[c] = d.call(this, w);
  }
  Ie.resolveRef = u;
  function d(p) {
    return (0, n.inlineRef)(p.schema, this.opts.inlineRefs) ? p.schema : p.validate ? p : o.call(this, p);
  }
  function l(p) {
    for (const f of this._compilations)
      if (h(f, p))
        return f;
  }
  Ie.getCompilingSchema = l;
  function h(p, f) {
    return p.schema === f.schema && p.root === f.root && p.baseId === f.baseId;
  }
  function y(p, f) {
    let c;
    for (; typeof (c = this.refs[f]) == "string"; )
      f = c;
    return c || this.schemas[f] || v.call(this, p, f);
  }
  function v(p, f) {
    const c = this.opts.uriResolver.parse(f), m = (0, n._getFullPath)(this.opts.uriResolver, c);
    let D = (0, n.getFullPath)(this.opts.uriResolver, p.baseId, void 0);
    if (Object.keys(p.schema).length > 0 && m === D)
      return g.call(this, c, p);
    const w = (0, n.normalizeId)(m), b = this.refs[w] || this.schemas[w];
    if (typeof b == "string") {
      const C = v.call(this, p, b);
      return typeof (C == null ? void 0 : C.schema) != "object" ? void 0 : g.call(this, c, C);
    }
    if (typeof (b == null ? void 0 : b.schema) == "object") {
      if (b.validate || o.call(this, b), w === (0, n.normalizeId)(f)) {
        const { schema: C } = b, { schemaId: _ } = this.opts, P = C[_];
        return P && (D = (0, n.resolveUrl)(this.opts.uriResolver, D, P)), new a({ schema: C, schemaId: _, root: p, baseId: D });
      }
      return g.call(this, c, b);
    }
  }
  Ie.resolveSchema = v;
  const A = /* @__PURE__ */ new Set([
    "properties",
    "patternProperties",
    "enum",
    "dependencies",
    "definitions"
  ]);
  function g(p, { baseId: f, schema: c, root: m }) {
    var D;
    if (((D = p.fragment) === null || D === void 0 ? void 0 : D[0]) !== "/")
      return;
    for (const C of p.fragment.slice(1).split("/")) {
      if (typeof c == "boolean")
        return;
      const _ = c[(0, s.unescapeFragment)(C)];
      if (_ === void 0)
        return;
      c = _;
      const P = typeof c == "object" && c[this.opts.schemaId];
      !A.has(C) && P && (f = (0, n.resolveUrl)(this.opts.uriResolver, f, P));
    }
    let w;
    if (typeof c != "boolean" && c.$ref && !(0, s.schemaHasRulesButRef)(c, this.RULES)) {
      const C = (0, n.resolveUrl)(this.opts.uriResolver, f, c.$ref);
      w = v.call(this, m, C);
    }
    const { schemaId: b } = this.opts;
    if (w = w || new a({ schema: c, schemaId: b, root: m, baseId: f }), w.schema !== w.root.schema)
      return w;
  }
  return Ie;
}
const dc = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", fc = "Meta-schema for $data reference (JSON AnySchema extension proposal)", hc = "object", mc = ["$data"], pc = { $data: { type: "string", anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }] } }, gc = !1, yc = {
  $id: dc,
  description: fc,
  type: hc,
  required: mc,
  properties: pc,
  additionalProperties: gc
};
var lr = {}, Bt = { exports: {} }, jn, oa;
function bc() {
  return oa || (oa = 1, jn = {
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
  }), jn;
}
var Mn, ua;
function vc() {
  if (ua) return Mn;
  ua = 1;
  const { HEX: r } = bc(), e = /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u;
  function t(g) {
    if (o(g, ".") < 3)
      return { host: g, isIPV4: !1 };
    const p = g.match(e) || [], [f] = p;
    return f ? { host: a(f, "."), isIPV4: !0 } : { host: g, isIPV4: !1 };
  }
  function n(g, p = !1) {
    let f = "", c = !0;
    for (const m of g) {
      if (r[m] === void 0) return;
      m !== "0" && c === !0 && (c = !1), c || (f += m);
    }
    return p && f.length === 0 && (f = "0"), f;
  }
  function s(g) {
    let p = 0;
    const f = { error: !1, address: "", zone: "" }, c = [], m = [];
    let D = !1, w = !1, b = !1;
    function C() {
      if (m.length) {
        if (D === !1) {
          const _ = n(m);
          if (_ !== void 0)
            c.push(_);
          else
            return f.error = !0, !1;
        }
        m.length = 0;
      }
      return !0;
    }
    for (let _ = 0; _ < g.length; _++) {
      const P = g[_];
      if (!(P === "[" || P === "]"))
        if (P === ":") {
          if (w === !0 && (b = !0), !C())
            break;
          if (p++, c.push(":"), p > 7) {
            f.error = !0;
            break;
          }
          _ - 1 >= 0 && g[_ - 1] === ":" && (w = !0);
          continue;
        } else if (P === "%") {
          if (!C())
            break;
          D = !0;
        } else {
          m.push(P);
          continue;
        }
    }
    return m.length && (D ? f.zone = m.join("") : b ? c.push(m.join("")) : c.push(n(m))), f.address = c.join(""), f;
  }
  function i(g) {
    if (o(g, ":") < 2)
      return { host: g, isIPV6: !1 };
    const p = s(g);
    if (p.error)
      return { host: g, isIPV6: !1 };
    {
      let f = p.address, c = p.address;
      return p.zone && (f += "%" + p.zone, c += "%25" + p.zone), { host: f, escapedHost: c, isIPV6: !0 };
    }
  }
  function a(g, p) {
    let f = "", c = !0;
    const m = g.length;
    for (let D = 0; D < m; D++) {
      const w = g[D];
      w === "0" && c ? (D + 1 <= m && g[D + 1] === p || D + 1 === m) && (f += w, c = !1) : (w === p ? c = !0 : c = !1, f += w);
    }
    return f;
  }
  function o(g, p) {
    let f = 0;
    for (let c = 0; c < g.length; c++)
      g[c] === p && f++;
    return f;
  }
  const u = /^\.\.?\//u, d = /^\/\.(?:\/|$)/u, l = /^\/\.\.(?:\/|$)/u, h = /^\/?(?:.|\n)*?(?=\/|$)/u;
  function y(g) {
    const p = [];
    for (; g.length; )
      if (g.match(u))
        g = g.replace(u, "");
      else if (g.match(d))
        g = g.replace(d, "/");
      else if (g.match(l))
        g = g.replace(l, "/"), p.pop();
      else if (g === "." || g === "..")
        g = "";
      else {
        const f = g.match(h);
        if (f) {
          const c = f[0];
          g = g.slice(c.length), p.push(c);
        } else
          throw new Error("Unexpected dot segment condition");
      }
    return p.join("");
  }
  function v(g, p) {
    const f = p !== !0 ? escape : unescape;
    return g.scheme !== void 0 && (g.scheme = f(g.scheme)), g.userinfo !== void 0 && (g.userinfo = f(g.userinfo)), g.host !== void 0 && (g.host = f(g.host)), g.path !== void 0 && (g.path = f(g.path)), g.query !== void 0 && (g.query = f(g.query)), g.fragment !== void 0 && (g.fragment = f(g.fragment)), g;
  }
  function A(g) {
    const p = [];
    if (g.userinfo !== void 0 && (p.push(g.userinfo), p.push("@")), g.host !== void 0) {
      let f = unescape(g.host);
      const c = t(f);
      if (c.isIPV4)
        f = c.host;
      else {
        const m = i(c.host);
        m.isIPV6 === !0 ? f = `[${m.escapedHost}]` : f = g.host;
      }
      p.push(f);
    }
    return (typeof g.port == "number" || typeof g.port == "string") && (p.push(":"), p.push(String(g.port))), p.length ? p.join("") : void 0;
  }
  return Mn = {
    recomposeAuthority: A,
    normalizeComponentEncoding: v,
    removeDotSegments: y,
    normalizeIPv4: t,
    normalizeIPv6: i,
    stringArrayToHexStripped: n
  }, Mn;
}
var Un, la;
function Ec() {
  if (la) return Un;
  la = 1;
  const r = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu, e = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
  function t(c) {
    return typeof c.secure == "boolean" ? c.secure : String(c.scheme).toLowerCase() === "wss";
  }
  function n(c) {
    return c.host || (c.error = c.error || "HTTP URIs must have a host."), c;
  }
  function s(c) {
    const m = String(c.scheme).toLowerCase() === "https";
    return (c.port === (m ? 443 : 80) || c.port === "") && (c.port = void 0), c.path || (c.path = "/"), c;
  }
  function i(c) {
    return c.secure = t(c), c.resourceName = (c.path || "/") + (c.query ? "?" + c.query : ""), c.path = void 0, c.query = void 0, c;
  }
  function a(c) {
    if ((c.port === (t(c) ? 443 : 80) || c.port === "") && (c.port = void 0), typeof c.secure == "boolean" && (c.scheme = c.secure ? "wss" : "ws", c.secure = void 0), c.resourceName) {
      const [m, D] = c.resourceName.split("?");
      c.path = m && m !== "/" ? m : void 0, c.query = D, c.resourceName = void 0;
    }
    return c.fragment = void 0, c;
  }
  function o(c, m) {
    if (!c.path)
      return c.error = "URN can not be parsed", c;
    const D = c.path.match(e);
    if (D) {
      const w = m.scheme || c.scheme || "urn";
      c.nid = D[1].toLowerCase(), c.nss = D[2];
      const b = `${w}:${m.nid || c.nid}`, C = f[b];
      c.path = void 0, C && (c = C.parse(c, m));
    } else
      c.error = c.error || "URN can not be parsed.";
    return c;
  }
  function u(c, m) {
    const D = m.scheme || c.scheme || "urn", w = c.nid.toLowerCase(), b = `${D}:${m.nid || w}`, C = f[b];
    C && (c = C.serialize(c, m));
    const _ = c, P = c.nss;
    return _.path = `${w || m.nid}:${P}`, m.skipEscape = !0, _;
  }
  function d(c, m) {
    const D = c;
    return D.uuid = D.nss, D.nss = void 0, !m.tolerant && (!D.uuid || !r.test(D.uuid)) && (D.error = D.error || "UUID is not valid."), D;
  }
  function l(c) {
    const m = c;
    return m.nss = (c.uuid || "").toLowerCase(), m;
  }
  const h = {
    scheme: "http",
    domainHost: !0,
    parse: n,
    serialize: s
  }, y = {
    scheme: "https",
    domainHost: h.domainHost,
    parse: n,
    serialize: s
  }, v = {
    scheme: "ws",
    domainHost: !0,
    parse: i,
    serialize: a
  }, A = {
    scheme: "wss",
    domainHost: v.domainHost,
    parse: v.parse,
    serialize: v.serialize
  }, f = {
    http: h,
    https: y,
    ws: v,
    wss: A,
    urn: {
      scheme: "urn",
      parse: o,
      serialize: u,
      skipNormalize: !0
    },
    "urn:uuid": {
      scheme: "urn:uuid",
      parse: d,
      serialize: l,
      skipNormalize: !0
    }
  };
  return Un = f, Un;
}
var ca;
function Dc() {
  if (ca) return Bt.exports;
  ca = 1;
  const { normalizeIPv6: r, normalizeIPv4: e, removeDotSegments: t, recomposeAuthority: n, normalizeComponentEncoding: s } = vc(), i = Ec();
  function a(p, f) {
    return typeof p == "string" ? p = l(A(p, f), f) : typeof p == "object" && (p = A(l(p, f), f)), p;
  }
  function o(p, f, c) {
    const m = Object.assign({ scheme: "null" }, c), D = u(A(p, m), A(f, m), m, !0);
    return l(D, { ...m, skipEscape: !0 });
  }
  function u(p, f, c, m) {
    const D = {};
    return m || (p = A(l(p, c), c), f = A(l(f, c), c)), c = c || {}, !c.tolerant && f.scheme ? (D.scheme = f.scheme, D.userinfo = f.userinfo, D.host = f.host, D.port = f.port, D.path = t(f.path || ""), D.query = f.query) : (f.userinfo !== void 0 || f.host !== void 0 || f.port !== void 0 ? (D.userinfo = f.userinfo, D.host = f.host, D.port = f.port, D.path = t(f.path || ""), D.query = f.query) : (f.path ? (f.path.charAt(0) === "/" ? D.path = t(f.path) : ((p.userinfo !== void 0 || p.host !== void 0 || p.port !== void 0) && !p.path ? D.path = "/" + f.path : p.path ? D.path = p.path.slice(0, p.path.lastIndexOf("/") + 1) + f.path : D.path = f.path, D.path = t(D.path)), D.query = f.query) : (D.path = p.path, f.query !== void 0 ? D.query = f.query : D.query = p.query), D.userinfo = p.userinfo, D.host = p.host, D.port = p.port), D.scheme = p.scheme), D.fragment = f.fragment, D;
  }
  function d(p, f, c) {
    return typeof p == "string" ? (p = unescape(p), p = l(s(A(p, c), !0), { ...c, skipEscape: !0 })) : typeof p == "object" && (p = l(s(p, !0), { ...c, skipEscape: !0 })), typeof f == "string" ? (f = unescape(f), f = l(s(A(f, c), !0), { ...c, skipEscape: !0 })) : typeof f == "object" && (f = l(s(f, !0), { ...c, skipEscape: !0 })), p.toLowerCase() === f.toLowerCase();
  }
  function l(p, f) {
    const c = {
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
    }, m = Object.assign({}, f), D = [], w = i[(m.scheme || c.scheme || "").toLowerCase()];
    w && w.serialize && w.serialize(c, m), c.path !== void 0 && (m.skipEscape ? c.path = unescape(c.path) : (c.path = escape(c.path), c.scheme !== void 0 && (c.path = c.path.split("%3A").join(":")))), m.reference !== "suffix" && c.scheme && D.push(c.scheme, ":");
    const b = n(c);
    if (b !== void 0 && (m.reference !== "suffix" && D.push("//"), D.push(b), c.path && c.path.charAt(0) !== "/" && D.push("/")), c.path !== void 0) {
      let C = c.path;
      !m.absolutePath && (!w || !w.absolutePath) && (C = t(C)), b === void 0 && (C = C.replace(/^\/\//u, "/%2F")), D.push(C);
    }
    return c.query !== void 0 && D.push("?", c.query), c.fragment !== void 0 && D.push("#", c.fragment), D.join("");
  }
  const h = Array.from({ length: 127 }, (p, f) => /[^!"$&'()*+,\-.;=_`a-z{}~]/u.test(String.fromCharCode(f)));
  function y(p) {
    let f = 0;
    for (let c = 0, m = p.length; c < m; ++c)
      if (f = p.charCodeAt(c), f > 126 || h[f])
        return !0;
    return !1;
  }
  const v = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
  function A(p, f) {
    const c = Object.assign({}, f), m = {
      scheme: void 0,
      userinfo: void 0,
      host: "",
      port: void 0,
      path: "",
      query: void 0,
      fragment: void 0
    }, D = p.indexOf("%") !== -1;
    let w = !1;
    c.reference === "suffix" && (p = (c.scheme ? c.scheme + ":" : "") + "//" + p);
    const b = p.match(v);
    if (b) {
      if (m.scheme = b[1], m.userinfo = b[3], m.host = b[4], m.port = parseInt(b[5], 10), m.path = b[6] || "", m.query = b[7], m.fragment = b[8], isNaN(m.port) && (m.port = b[5]), m.host) {
        const _ = e(m.host);
        if (_.isIPV4 === !1) {
          const P = r(_.host);
          m.host = P.host.toLowerCase(), w = P.isIPV6;
        } else
          m.host = _.host, w = !0;
      }
      m.scheme === void 0 && m.userinfo === void 0 && m.host === void 0 && m.port === void 0 && m.query === void 0 && !m.path ? m.reference = "same-document" : m.scheme === void 0 ? m.reference = "relative" : m.fragment === void 0 ? m.reference = "absolute" : m.reference = "uri", c.reference && c.reference !== "suffix" && c.reference !== m.reference && (m.error = m.error || "URI is not a " + c.reference + " reference.");
      const C = i[(c.scheme || m.scheme || "").toLowerCase()];
      if (!c.unicodeSupport && (!C || !C.unicodeSupport) && m.host && (c.domainHost || C && C.domainHost) && w === !1 && y(m.host))
        try {
          m.host = URL.domainToASCII(m.host.toLowerCase());
        } catch (_) {
          m.error = m.error || "Host's domain name can not be converted to ASCII: " + _;
        }
      (!C || C && !C.skipNormalize) && (D && m.scheme !== void 0 && (m.scheme = unescape(m.scheme)), D && m.host !== void 0 && (m.host = unescape(m.host)), m.path && (m.path = escape(unescape(m.path))), m.fragment && (m.fragment = encodeURI(decodeURIComponent(m.fragment)))), C && C.parse && C.parse(m, c);
    } else
      m.error = m.error || "URI can not be parsed.";
    return m;
  }
  const g = {
    SCHEMES: i,
    normalize: a,
    resolve: o,
    resolveComponents: u,
    equal: d,
    serialize: l,
    parse: A
  };
  return Bt.exports = g, Bt.exports.default = g, Bt.exports.fastUri = g, Bt.exports;
}
var da;
function wc() {
  if (da) return lr;
  da = 1, Object.defineProperty(lr, "__esModule", { value: !0 });
  const r = Dc();
  return r.code = 'require("ajv/dist/runtime/uri").default', lr.default = r, lr;
}
var fa;
function Ac() {
  return fa || (fa = 1, function(r) {
    Object.defineProperty(r, "__esModule", { value: !0 }), r.CodeGen = r.Name = r.nil = r.stringify = r.str = r._ = r.KeywordCxt = void 0;
    var e = fn();
    Object.defineProperty(r, "KeywordCxt", { enumerable: !0, get: function() {
      return e.KeywordCxt;
    } });
    var t = ae();
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
    const n = ui(), s = hn(), i = Hu(), a = li(), o = ae(), u = dn(), d = nn(), l = ue(), h = yc, y = wc(), v = (I, S) => new RegExp(I, S);
    v.code = "new RegExp";
    const A = ["removeAdditional", "useDefaults", "coerceTypes"], g = /* @__PURE__ */ new Set([
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
    }, f = {
      ignoreKeywordsWithRef: "",
      jsPropertySyntax: "",
      unicode: '"minLength"/"maxLength" account for unicode characters by default.'
    }, c = 200;
    function m(I) {
      var S, F, T, E, $, k, X, J, le, oe, R, N, x, M, Y, ie, De, Be, Ne, Fe, we, wt, Oe, Tn, Nn;
      const qt = I.strict, Fn = (S = I.code) === null || S === void 0 ? void 0 : S.optimize, xi = Fn === !0 || Fn === void 0 ? 1 : Fn || 0, qi = (T = (F = I.code) === null || F === void 0 ? void 0 : F.regExp) !== null && T !== void 0 ? T : v, rc = (E = I.uriResolver) !== null && E !== void 0 ? E : y.default;
      return {
        strictSchema: (k = ($ = I.strictSchema) !== null && $ !== void 0 ? $ : qt) !== null && k !== void 0 ? k : !0,
        strictNumbers: (J = (X = I.strictNumbers) !== null && X !== void 0 ? X : qt) !== null && J !== void 0 ? J : !0,
        strictTypes: (oe = (le = I.strictTypes) !== null && le !== void 0 ? le : qt) !== null && oe !== void 0 ? oe : "log",
        strictTuples: (N = (R = I.strictTuples) !== null && R !== void 0 ? R : qt) !== null && N !== void 0 ? N : "log",
        strictRequired: (M = (x = I.strictRequired) !== null && x !== void 0 ? x : qt) !== null && M !== void 0 ? M : !1,
        code: I.code ? { ...I.code, optimize: xi, regExp: qi } : { optimize: xi, regExp: qi },
        loopRequired: (Y = I.loopRequired) !== null && Y !== void 0 ? Y : c,
        loopEnum: (ie = I.loopEnum) !== null && ie !== void 0 ? ie : c,
        meta: (De = I.meta) !== null && De !== void 0 ? De : !0,
        messages: (Be = I.messages) !== null && Be !== void 0 ? Be : !0,
        inlineRefs: (Ne = I.inlineRefs) !== null && Ne !== void 0 ? Ne : !0,
        schemaId: (Fe = I.schemaId) !== null && Fe !== void 0 ? Fe : "$id",
        addUsedSchema: (we = I.addUsedSchema) !== null && we !== void 0 ? we : !0,
        validateSchema: (wt = I.validateSchema) !== null && wt !== void 0 ? wt : !0,
        validateFormats: (Oe = I.validateFormats) !== null && Oe !== void 0 ? Oe : !0,
        unicodeRegExp: (Tn = I.unicodeRegExp) !== null && Tn !== void 0 ? Tn : !0,
        int32range: (Nn = I.int32range) !== null && Nn !== void 0 ? Nn : !0,
        uriResolver: rc
      };
    }
    class D {
      constructor(S = {}) {
        this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), S = this.opts = { ...S, ...m(S) };
        const { es5: F, lines: T } = this.opts.code;
        this.scope = new o.ValueScope({ scope: {}, prefixes: g, es5: F, lines: T }), this.logger = te(S.logger);
        const E = S.validateFormats;
        S.validateFormats = !1, this.RULES = (0, i.getRules)(), w.call(this, p, S, "NOT SUPPORTED"), w.call(this, f, S, "DEPRECATED", "warn"), this._metaOpts = U.call(this), S.formats && _.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), S.keywords && P.call(this, S.keywords), typeof S.meta == "object" && this.addMetaSchema(S.meta), C.call(this), S.validateFormats = E;
      }
      _addVocabularies() {
        this.addKeyword("$async");
      }
      _addDefaultMetaSchema() {
        const { $data: S, meta: F, schemaId: T } = this.opts;
        let E = h;
        T === "id" && (E = { ...h }, E.id = E.$id, delete E.$id), F && S && this.addMetaSchema(E, E[T], !1);
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
        const E = T(F);
        return "$async" in T || (this.errors = T.errors), E;
      }
      compile(S, F) {
        const T = this._addSchema(S, F);
        return T.validate || this._compileSchemaEnv(T);
      }
      compileAsync(S, F) {
        if (typeof this.opts.loadSchema != "function")
          throw new Error("options.loadSchema should be a function");
        const { loadSchema: T } = this.opts;
        return E.call(this, S, F);
        async function E(oe, R) {
          await $.call(this, oe.$schema);
          const N = this._addSchema(oe, R);
          return N.validate || k.call(this, N);
        }
        async function $(oe) {
          oe && !this.getSchema(oe) && await E.call(this, { $ref: oe }, !0);
        }
        async function k(oe) {
          try {
            return this._compileSchemaEnv(oe);
          } catch (R) {
            if (!(R instanceof s.default))
              throw R;
            return X.call(this, R), await J.call(this, R.missingSchema), k.call(this, oe);
          }
        }
        function X({ missingSchema: oe, missingRef: R }) {
          if (this.refs[oe])
            throw new Error(`AnySchema ${oe} is loaded but ${R} cannot be resolved`);
        }
        async function J(oe) {
          const R = await le.call(this, oe);
          this.refs[oe] || await $.call(this, R.$schema), this.refs[oe] || this.addSchema(R, oe, F);
        }
        async function le(oe) {
          const R = this._loading[oe];
          if (R)
            return R;
          try {
            return await (this._loading[oe] = T(oe));
          } finally {
            delete this._loading[oe];
          }
        }
      }
      // Adds schema to the instance
      addSchema(S, F, T, E = this.opts.validateSchema) {
        if (Array.isArray(S)) {
          for (const k of S)
            this.addSchema(k, void 0, T, E);
          return this;
        }
        let $;
        if (typeof S == "object") {
          const { schemaId: k } = this.opts;
          if ($ = S[k], $ !== void 0 && typeof $ != "string")
            throw new Error(`schema ${k} must be string`);
        }
        return F = (0, u.normalizeId)(F || $), this._checkUnique(F), this.schemas[F] = this._addSchema(S, T, F, E, !0), this;
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
        const E = this.validate(T, S);
        if (!E && F) {
          const $ = "schema is invalid: " + this.errorsText();
          if (this.opts.validateSchema === "log")
            this.logger.error($);
          else
            throw new Error($);
        }
        return E;
      }
      // Get compiled schema by `key` or `ref`.
      // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
      getSchema(S) {
        let F;
        for (; typeof (F = b.call(this, S)) == "string"; )
          S = F;
        if (F === void 0) {
          const { schemaId: T } = this.opts, E = new a.SchemaEnv({ schema: {}, schemaId: T });
          if (F = a.resolveSchema.call(this, E, S), !F)
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
            const F = b.call(this, S);
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
        if (L.call(this, T, F), !F)
          return (0, l.eachItem)(T, ($) => B.call(this, $)), this;
        z.call(this, F);
        const E = {
          ...F,
          type: (0, d.getJSONTypes)(F.type),
          schemaType: (0, d.getJSONTypes)(F.schemaType)
        };
        return (0, l.eachItem)(T, E.type.length === 0 ? ($) => B.call(this, $, E) : ($) => E.type.forEach((k) => B.call(this, $, E, k))), this;
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
          const E = T.rules.findIndex(($) => $.keyword === S);
          E >= 0 && T.rules.splice(E, 1);
        }
        return this;
      }
      // Add format
      addFormat(S, F) {
        return typeof F == "string" && (F = new RegExp(F)), this.formats[S] = F, this;
      }
      errorsText(S = this.errors, { separator: F = ", ", dataVar: T = "data" } = {}) {
        return !S || S.length === 0 ? "No errors" : S.map((E) => `${T}${E.instancePath} ${E.message}`).reduce((E, $) => E + F + $);
      }
      $dataMetaSchema(S, F) {
        const T = this.RULES.all;
        S = JSON.parse(JSON.stringify(S));
        for (const E of F) {
          const $ = E.split("/").slice(1);
          let k = S;
          for (const X of $)
            k = k[X];
          for (const X in T) {
            const J = T[X];
            if (typeof J != "object")
              continue;
            const { $data: le } = J.definition, oe = k[X];
            le && oe && (k[X] = K(oe));
          }
        }
        return S;
      }
      _removeAllSchemas(S, F) {
        for (const T in S) {
          const E = S[T];
          (!F || F.test(T)) && (typeof E == "string" ? delete S[T] : E && !E.meta && (this._cache.delete(E.schema), delete S[T]));
        }
      }
      _addSchema(S, F, T, E = this.opts.validateSchema, $ = this.opts.addUsedSchema) {
        let k;
        const { schemaId: X } = this.opts;
        if (typeof S == "object")
          k = S[X];
        else {
          if (this.opts.jtd)
            throw new Error("schema must be object");
          if (typeof S != "boolean")
            throw new Error("schema must be object or boolean");
        }
        let J = this._cache.get(S);
        if (J !== void 0)
          return J;
        T = (0, u.normalizeId)(k || T);
        const le = u.getSchemaRefs.call(this, S, T);
        return J = new a.SchemaEnv({ schema: S, schemaId: X, meta: F, baseId: T, localRefs: le }), this._cache.set(J.schema, J), $ && !T.startsWith("#") && (T && this._checkUnique(T), this.refs[T] = J), E && this.validateSchema(S, !0), J;
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
    D.ValidationError = n.default, D.MissingRefError = s.default, r.default = D;
    function w(I, S, F, T = "error") {
      for (const E in I) {
        const $ = E;
        $ in S && this.logger[T](`${F}: option ${E}. ${I[$]}`);
      }
    }
    function b(I) {
      return I = (0, u.normalizeId)(I), this.schemas[I] || this.refs[I];
    }
    function C() {
      const I = this.opts.schemas;
      if (I)
        if (Array.isArray(I))
          this.addSchema(I);
        else
          for (const S in I)
            this.addSchema(I[S], S);
    }
    function _() {
      for (const I in this.opts.formats) {
        const S = this.opts.formats[I];
        S && this.addFormat(I, S);
      }
    }
    function P(I) {
      if (Array.isArray(I)) {
        this.addVocabulary(I);
        return;
      }
      this.logger.warn("keywords option as map is deprecated, pass array");
      for (const S in I) {
        const F = I[S];
        F.keyword || (F.keyword = S), this.addKeyword(F);
      }
    }
    function U() {
      const I = { ...this.opts };
      for (const S of A)
        delete I[S];
      return I;
    }
    const H = { log() {
    }, warn() {
    }, error() {
    } };
    function te(I) {
      if (I === !1)
        return H;
      if (I === void 0)
        return console;
      if (I.log && I.warn && I.error)
        return I;
      throw new Error("logger must implement log, warn and error methods");
    }
    const ee = /^[a-z_$][a-z0-9_$:-]*$/i;
    function L(I, S) {
      const { RULES: F } = this;
      if ((0, l.eachItem)(I, (T) => {
        if (F.keywords[T])
          throw new Error(`Keyword ${T} is already defined`);
        if (!ee.test(T))
          throw new Error(`Keyword ${T} has invalid name`);
      }), !!S && S.$data && !("code" in S || "validate" in S))
        throw new Error('$data keyword must have "code" or "validate" function');
    }
    function B(I, S, F) {
      var T;
      const E = S == null ? void 0 : S.post;
      if (F && E)
        throw new Error('keyword with "post" flag cannot have "type"');
      const { RULES: $ } = this;
      let k = E ? $.post : $.rules.find(({ type: J }) => J === F);
      if (k || (k = { type: F, rules: [] }, $.rules.push(k)), $.keywords[I] = !0, !S)
        return;
      const X = {
        keyword: I,
        definition: {
          ...S,
          type: (0, d.getJSONTypes)(S.type),
          schemaType: (0, d.getJSONTypes)(S.schemaType)
        }
      };
      S.before ? W.call(this, k, X, S.before) : k.rules.push(X), $.all[I] = X, (T = S.implements) === null || T === void 0 || T.forEach((J) => this.addKeyword(J));
    }
    function W(I, S, F) {
      const T = I.rules.findIndex((E) => E.keyword === F);
      T >= 0 ? I.rules.splice(T, 0, S) : (I.rules.push(S), this.logger.warn(`rule ${F} is not defined`));
    }
    function z(I) {
      let { metaSchema: S } = I;
      S !== void 0 && (I.$data && this.opts.$data && (S = K(S)), I.validateSchema = this.compile(S, !0));
    }
    const V = {
      $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
    };
    function K(I) {
      return { anyOf: [I, V] };
    }
  }(In)), In;
}
var cr = {}, dr = {}, fr = {}, ha;
function Cc() {
  if (ha) return fr;
  ha = 1, Object.defineProperty(fr, "__esModule", { value: !0 });
  const r = {
    keyword: "id",
    code() {
      throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
    }
  };
  return fr.default = r, fr;
}
var st = {}, ma;
function $c() {
  if (ma) return st;
  ma = 1, Object.defineProperty(st, "__esModule", { value: !0 }), st.callRef = st.getValidate = void 0;
  const r = hn(), e = ze(), t = ae(), n = ct(), s = li(), i = ue(), a = {
    keyword: "$ref",
    schemaType: "string",
    code(d) {
      const { gen: l, schema: h, it: y } = d, { baseId: v, schemaEnv: A, validateName: g, opts: p, self: f } = y, { root: c } = A;
      if ((h === "#" || h === "#/") && v === c.baseId)
        return D();
      const m = s.resolveRef.call(f, c, v, h);
      if (m === void 0)
        throw new r.default(y.opts.uriResolver, v, h);
      if (m instanceof s.SchemaEnv)
        return w(m);
      return b(m);
      function D() {
        if (A === c)
          return u(d, g, A, A.$async);
        const C = l.scopeValue("root", { ref: c });
        return u(d, (0, t._)`${C}.validate`, c, c.$async);
      }
      function w(C) {
        const _ = o(d, C);
        u(d, _, C, C.$async);
      }
      function b(C) {
        const _ = l.scopeValue("schema", p.code.source === !0 ? { ref: C, code: (0, t.stringify)(C) } : { ref: C }), P = l.name("valid"), U = d.subschema({
          schema: C,
          dataTypes: [],
          schemaPath: t.nil,
          topSchemaRef: _,
          errSchemaPath: h
        }, P);
        d.mergeEvaluated(U), d.ok(P);
      }
    }
  };
  function o(d, l) {
    const { gen: h } = d;
    return l.validate ? h.scopeValue("validate", { ref: l.validate }) : (0, t._)`${h.scopeValue("wrapper", { ref: l })}.validate`;
  }
  st.getValidate = o;
  function u(d, l, h, y) {
    const { gen: v, it: A } = d, { allErrors: g, schemaEnv: p, opts: f } = A, c = f.passContext ? n.default.this : t.nil;
    y ? m() : D();
    function m() {
      if (!p.$async)
        throw new Error("async schema referenced by sync schema");
      const C = v.let("valid");
      v.try(() => {
        v.code((0, t._)`await ${(0, e.callValidateCode)(d, l, c)}`), b(l), g || v.assign(C, !0);
      }, (_) => {
        v.if((0, t._)`!(${_} instanceof ${A.ValidationError})`, () => v.throw(_)), w(_), g || v.assign(C, !1);
      }), d.ok(C);
    }
    function D() {
      d.result((0, e.callValidateCode)(d, l, c), () => b(l), () => w(l));
    }
    function w(C) {
      const _ = (0, t._)`${C}.errors`;
      v.assign(n.default.vErrors, (0, t._)`${n.default.vErrors} === null ? ${_} : ${n.default.vErrors}.concat(${_})`), v.assign(n.default.errors, (0, t._)`${n.default.vErrors}.length`);
    }
    function b(C) {
      var _;
      if (!A.opts.unevaluated)
        return;
      const P = (_ = h == null ? void 0 : h.validate) === null || _ === void 0 ? void 0 : _.evaluated;
      if (A.props !== !0)
        if (P && !P.dynamicProps)
          P.props !== void 0 && (A.props = i.mergeEvaluated.props(v, P.props, A.props));
        else {
          const U = v.var("props", (0, t._)`${C}.evaluated.props`);
          A.props = i.mergeEvaluated.props(v, U, A.props, t.Name);
        }
      if (A.items !== !0)
        if (P && !P.dynamicItems)
          P.items !== void 0 && (A.items = i.mergeEvaluated.items(v, P.items, A.items));
        else {
          const U = v.var("items", (0, t._)`${C}.evaluated.items`);
          A.items = i.mergeEvaluated.items(v, U, A.items, t.Name);
        }
    }
  }
  return st.callRef = u, st.default = a, st;
}
var pa;
function _c() {
  if (pa) return dr;
  pa = 1, Object.defineProperty(dr, "__esModule", { value: !0 });
  const r = Cc(), e = $c(), t = [
    "$schema",
    "$id",
    "$defs",
    "$vocabulary",
    { keyword: "$comment" },
    "definitions",
    r.default,
    e.default
  ];
  return dr.default = t, dr;
}
var hr = {}, mr = {}, ga;
function Sc() {
  if (ga) return mr;
  ga = 1, Object.defineProperty(mr, "__esModule", { value: !0 });
  const r = ae(), e = r.operators, t = {
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
  return mr.default = s, mr;
}
var pr = {}, ya;
function Rc() {
  if (ya) return pr;
  ya = 1, Object.defineProperty(pr, "__esModule", { value: !0 });
  const r = ae(), t = {
    keyword: "multipleOf",
    type: "number",
    schemaType: "number",
    $data: !0,
    error: {
      message: ({ schemaCode: n }) => (0, r.str)`must be multiple of ${n}`,
      params: ({ schemaCode: n }) => (0, r._)`{multipleOf: ${n}}`
    },
    code(n) {
      const { gen: s, data: i, schemaCode: a, it: o } = n, u = o.opts.multipleOfPrecision, d = s.let("res"), l = u ? (0, r._)`Math.abs(Math.round(${d}) - ${d}) > 1e-${u}` : (0, r._)`${d} !== parseInt(${d})`;
      n.fail$data((0, r._)`(${a} === 0 || (${d} = ${i}/${a}, ${l}))`);
    }
  };
  return pr.default = t, pr;
}
var gr = {}, yr = {}, ba;
function Tc() {
  if (ba) return yr;
  ba = 1, Object.defineProperty(yr, "__esModule", { value: !0 });
  function r(e) {
    const t = e.length;
    let n = 0, s = 0, i;
    for (; s < t; )
      n++, i = e.charCodeAt(s++), i >= 55296 && i <= 56319 && s < t && (i = e.charCodeAt(s), (i & 64512) === 56320 && s++);
    return n;
  }
  return yr.default = r, r.code = 'require("ajv/dist/runtime/ucs2length").default', yr;
}
var va;
function Nc() {
  if (va) return gr;
  va = 1, Object.defineProperty(gr, "__esModule", { value: !0 });
  const r = ae(), e = ue(), t = Tc(), s = {
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
      const { keyword: a, data: o, schemaCode: u, it: d } = i, l = a === "maxLength" ? r.operators.GT : r.operators.LT, h = d.opts.unicode === !1 ? (0, r._)`${o}.length` : (0, r._)`${(0, e.useFunc)(i.gen, t.default)}(${o})`;
      i.fail$data((0, r._)`${h} ${l} ${u}`);
    }
  };
  return gr.default = s, gr;
}
var br = {}, Ea;
function Fc() {
  if (Ea) return br;
  Ea = 1, Object.defineProperty(br, "__esModule", { value: !0 });
  const r = ze(), e = ae(), n = {
    keyword: "pattern",
    type: "string",
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: s }) => (0, e.str)`must match pattern "${s}"`,
      params: ({ schemaCode: s }) => (0, e._)`{pattern: ${s}}`
    },
    code(s) {
      const { data: i, $data: a, schema: o, schemaCode: u, it: d } = s, l = d.opts.unicodeRegExp ? "u" : "", h = a ? (0, e._)`(new RegExp(${u}, ${l}))` : (0, r.usePattern)(s, o);
      s.fail$data((0, e._)`!${h}.test(${i})`);
    }
  };
  return br.default = n, br;
}
var vr = {}, Da;
function Pc() {
  if (Da) return vr;
  Da = 1, Object.defineProperty(vr, "__esModule", { value: !0 });
  const r = ae(), t = {
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
  return vr.default = t, vr;
}
var Er = {}, wa;
function Ic() {
  if (wa) return Er;
  wa = 1, Object.defineProperty(Er, "__esModule", { value: !0 });
  const r = ze(), e = ae(), t = ue(), s = {
    keyword: "required",
    type: "object",
    schemaType: "array",
    $data: !0,
    error: {
      message: ({ params: { missingProperty: i } }) => (0, e.str)`must have required property '${i}'`,
      params: ({ params: { missingProperty: i } }) => (0, e._)`{missingProperty: ${i}}`
    },
    code(i) {
      const { gen: a, schema: o, schemaCode: u, data: d, $data: l, it: h } = i, { opts: y } = h;
      if (!l && o.length === 0)
        return;
      const v = o.length >= y.loopRequired;
      if (h.allErrors ? A() : g(), y.strictRequired) {
        const c = i.parentSchema.properties, { definedProperties: m } = i.it;
        for (const D of o)
          if ((c == null ? void 0 : c[D]) === void 0 && !m.has(D)) {
            const w = h.schemaEnv.baseId + h.errSchemaPath, b = `required property "${D}" is not defined at "${w}" (strictRequired)`;
            (0, t.checkStrictMode)(h, b, h.opts.strictRequired);
          }
      }
      function A() {
        if (v || l)
          i.block$data(e.nil, p);
        else
          for (const c of o)
            (0, r.checkReportMissingProp)(i, c);
      }
      function g() {
        const c = a.let("missing");
        if (v || l) {
          const m = a.let("valid", !0);
          i.block$data(m, () => f(c, m)), i.ok(m);
        } else
          a.if((0, r.checkMissingProp)(i, o, c)), (0, r.reportMissingProp)(i, c), a.else();
      }
      function p() {
        a.forOf("prop", u, (c) => {
          i.setParams({ missingProperty: c }), a.if((0, r.noPropertyInData)(a, d, c, y.ownProperties), () => i.error());
        });
      }
      function f(c, m) {
        i.setParams({ missingProperty: c }), a.forOf(c, u, () => {
          a.assign(m, (0, r.propertyInData)(a, d, c, y.ownProperties)), a.if((0, e.not)(m), () => {
            i.error(), a.break();
          });
        }, e.nil);
      }
    }
  };
  return Er.default = s, Er;
}
var Dr = {}, Aa;
function kc() {
  if (Aa) return Dr;
  Aa = 1, Object.defineProperty(Dr, "__esModule", { value: !0 });
  const r = ae(), t = {
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
  return Dr.default = t, Dr;
}
var wr = {}, Ar = {}, Ca;
function ci() {
  if (Ca) return Ar;
  Ca = 1, Object.defineProperty(Ar, "__esModule", { value: !0 });
  const r = zu();
  return r.code = 'require("ajv/dist/runtime/equal").default', Ar.default = r, Ar;
}
var $a;
function Oc() {
  if ($a) return wr;
  $a = 1, Object.defineProperty(wr, "__esModule", { value: !0 });
  const r = nn(), e = ae(), t = ue(), n = ci(), i = {
    keyword: "uniqueItems",
    type: "array",
    schemaType: "boolean",
    $data: !0,
    error: {
      message: ({ params: { i: a, j: o } }) => (0, e.str)`must NOT have duplicate items (items ## ${o} and ${a} are identical)`,
      params: ({ params: { i: a, j: o } }) => (0, e._)`{i: ${a}, j: ${o}}`
    },
    code(a) {
      const { gen: o, data: u, $data: d, schema: l, parentSchema: h, schemaCode: y, it: v } = a;
      if (!d && !l)
        return;
      const A = o.let("valid"), g = h.items ? (0, r.getSchemaTypes)(h.items) : [];
      a.block$data(A, p, (0, e._)`${y} === false`), a.ok(A);
      function p() {
        const D = o.let("i", (0, e._)`${u}.length`), w = o.let("j");
        a.setParams({ i: D, j: w }), o.assign(A, !0), o.if((0, e._)`${D} > 1`, () => (f() ? c : m)(D, w));
      }
      function f() {
        return g.length > 0 && !g.some((D) => D === "object" || D === "array");
      }
      function c(D, w) {
        const b = o.name("item"), C = (0, r.checkDataTypes)(g, b, v.opts.strictNumbers, r.DataType.Wrong), _ = o.const("indices", (0, e._)`{}`);
        o.for((0, e._)`;${D}--;`, () => {
          o.let(b, (0, e._)`${u}[${D}]`), o.if(C, (0, e._)`continue`), g.length > 1 && o.if((0, e._)`typeof ${b} == "string"`, (0, e._)`${b} += "_"`), o.if((0, e._)`typeof ${_}[${b}] == "number"`, () => {
            o.assign(w, (0, e._)`${_}[${b}]`), a.error(), o.assign(A, !1).break();
          }).code((0, e._)`${_}[${b}] = ${D}`);
        });
      }
      function m(D, w) {
        const b = (0, t.useFunc)(o, n.default), C = o.name("outer");
        o.label(C).for((0, e._)`;${D}--;`, () => o.for((0, e._)`${w} = ${D}; ${w}--;`, () => o.if((0, e._)`${b}(${u}[${D}], ${u}[${w}])`, () => {
          a.error(), o.assign(A, !1).break(C);
        })));
      }
    }
  };
  return wr.default = i, wr;
}
var Cr = {}, _a;
function xc() {
  if (_a) return Cr;
  _a = 1, Object.defineProperty(Cr, "__esModule", { value: !0 });
  const r = ae(), e = ue(), t = ci(), s = {
    keyword: "const",
    $data: !0,
    error: {
      message: "must be equal to constant",
      params: ({ schemaCode: i }) => (0, r._)`{allowedValue: ${i}}`
    },
    code(i) {
      const { gen: a, data: o, $data: u, schemaCode: d, schema: l } = i;
      u || l && typeof l == "object" ? i.fail$data((0, r._)`!${(0, e.useFunc)(a, t.default)}(${o}, ${d})`) : i.fail((0, r._)`${l} !== ${o}`);
    }
  };
  return Cr.default = s, Cr;
}
var $r = {}, Sa;
function qc() {
  if (Sa) return $r;
  Sa = 1, Object.defineProperty($r, "__esModule", { value: !0 });
  const r = ae(), e = ue(), t = ci(), s = {
    keyword: "enum",
    schemaType: "array",
    $data: !0,
    error: {
      message: "must be equal to one of the allowed values",
      params: ({ schemaCode: i }) => (0, r._)`{allowedValues: ${i}}`
    },
    code(i) {
      const { gen: a, data: o, $data: u, schema: d, schemaCode: l, it: h } = i;
      if (!u && d.length === 0)
        throw new Error("enum must have non-empty array");
      const y = d.length >= h.opts.loopEnum;
      let v;
      const A = () => v ?? (v = (0, e.useFunc)(a, t.default));
      let g;
      if (y || u)
        g = a.let("valid"), i.block$data(g, p);
      else {
        if (!Array.isArray(d))
          throw new Error("ajv implementation error");
        const c = a.const("vSchema", l);
        g = (0, r.or)(...d.map((m, D) => f(c, D)));
      }
      i.pass(g);
      function p() {
        a.assign(g, !1), a.forOf("v", l, (c) => a.if((0, r._)`${A()}(${o}, ${c})`, () => a.assign(g, !0).break()));
      }
      function f(c, m) {
        const D = d[m];
        return typeof D == "object" && D !== null ? (0, r._)`${A()}(${o}, ${c}[${m}])` : (0, r._)`${o} === ${D}`;
      }
    }
  };
  return $r.default = s, $r;
}
var Ra;
function Lc() {
  if (Ra) return hr;
  Ra = 1, Object.defineProperty(hr, "__esModule", { value: !0 });
  const r = Sc(), e = Rc(), t = Nc(), n = Fc(), s = Pc(), i = Ic(), a = kc(), o = Oc(), u = xc(), d = qc(), l = [
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
    d.default
  ];
  return hr.default = l, hr;
}
var _r = {}, At = {}, Ta;
function Ku() {
  if (Ta) return At;
  Ta = 1, Object.defineProperty(At, "__esModule", { value: !0 }), At.validateAdditionalItems = void 0;
  const r = ae(), e = ue(), n = {
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
    const { gen: o, schema: u, data: d, keyword: l, it: h } = i;
    h.items = !0;
    const y = o.const("len", (0, r._)`${d}.length`);
    if (u === !1)
      i.setParams({ len: a.length }), i.pass((0, r._)`${y} <= ${a.length}`);
    else if (typeof u == "object" && !(0, e.alwaysValidSchema)(h, u)) {
      const A = o.var("valid", (0, r._)`${y} <= ${a.length}`);
      o.if((0, r.not)(A), () => v(A)), i.ok(A);
    }
    function v(A) {
      o.forRange("i", a.length, y, (g) => {
        i.subschema({ keyword: l, dataProp: g, dataPropType: e.Type.Num }, A), h.allErrors || o.if((0, r.not)(A), () => o.break());
      });
    }
  }
  return At.validateAdditionalItems = s, At.default = n, At;
}
var Sr = {}, Ct = {}, Na;
function Wu() {
  if (Na) return Ct;
  Na = 1, Object.defineProperty(Ct, "__esModule", { value: !0 }), Ct.validateTuple = void 0;
  const r = ae(), e = ue(), t = ze(), n = {
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
    const { gen: u, parentSchema: d, data: l, keyword: h, it: y } = i;
    g(d), y.opts.unevaluated && o.length && y.items !== !0 && (y.items = e.mergeEvaluated.items(u, o.length, y.items));
    const v = u.name("valid"), A = u.const("len", (0, r._)`${l}.length`);
    o.forEach((p, f) => {
      (0, e.alwaysValidSchema)(y, p) || (u.if((0, r._)`${A} > ${f}`, () => i.subschema({
        keyword: h,
        schemaProp: f,
        dataProp: f
      }, v)), i.ok(v));
    });
    function g(p) {
      const { opts: f, errSchemaPath: c } = y, m = o.length, D = m === p.minItems && (m === p.maxItems || p[a] === !1);
      if (f.strictTuples && !D) {
        const w = `"${h}" is ${m}-tuple, but minItems or maxItems/${a} are not specified or different at path "${c}"`;
        (0, e.checkStrictMode)(y, w, f.strictTuples);
      }
    }
  }
  return Ct.validateTuple = s, Ct.default = n, Ct;
}
var Fa;
function Bc() {
  if (Fa) return Sr;
  Fa = 1, Object.defineProperty(Sr, "__esModule", { value: !0 });
  const r = Wu(), e = {
    keyword: "prefixItems",
    type: "array",
    schemaType: ["array"],
    before: "uniqueItems",
    code: (t) => (0, r.validateTuple)(t, "items")
  };
  return Sr.default = e, Sr;
}
var Rr = {}, Pa;
function jc() {
  if (Pa) return Rr;
  Pa = 1, Object.defineProperty(Rr, "__esModule", { value: !0 });
  const r = ae(), e = ue(), t = ze(), n = Ku(), i = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    error: {
      message: ({ params: { len: a } }) => (0, r.str)`must NOT have more than ${a} items`,
      params: ({ params: { len: a } }) => (0, r._)`{limit: ${a}}`
    },
    code(a) {
      const { schema: o, parentSchema: u, it: d } = a, { prefixItems: l } = u;
      d.items = !0, !(0, e.alwaysValidSchema)(d, o) && (l ? (0, n.validateAdditionalItems)(a, l) : a.ok((0, t.validateArray)(a)));
    }
  };
  return Rr.default = i, Rr;
}
var Tr = {}, Ia;
function Mc() {
  if (Ia) return Tr;
  Ia = 1, Object.defineProperty(Tr, "__esModule", { value: !0 });
  const r = ae(), e = ue(), n = {
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
      const { gen: i, schema: a, parentSchema: o, data: u, it: d } = s;
      let l, h;
      const { minContains: y, maxContains: v } = o;
      d.opts.next ? (l = y === void 0 ? 1 : y, h = v) : l = 1;
      const A = i.const("len", (0, r._)`${u}.length`);
      if (s.setParams({ min: l, max: h }), h === void 0 && l === 0) {
        (0, e.checkStrictMode)(d, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
        return;
      }
      if (h !== void 0 && l > h) {
        (0, e.checkStrictMode)(d, '"minContains" > "maxContains" is always invalid'), s.fail();
        return;
      }
      if ((0, e.alwaysValidSchema)(d, a)) {
        let m = (0, r._)`${A} >= ${l}`;
        h !== void 0 && (m = (0, r._)`${m} && ${A} <= ${h}`), s.pass(m);
        return;
      }
      d.items = !0;
      const g = i.name("valid");
      h === void 0 && l === 1 ? f(g, () => i.if(g, () => i.break())) : l === 0 ? (i.let(g, !0), h !== void 0 && i.if((0, r._)`${u}.length > 0`, p)) : (i.let(g, !1), p()), s.result(g, () => s.reset());
      function p() {
        const m = i.name("_valid"), D = i.let("count", 0);
        f(m, () => i.if(m, () => c(D)));
      }
      function f(m, D) {
        i.forRange("i", 0, A, (w) => {
          s.subschema({
            keyword: "contains",
            dataProp: w,
            dataPropType: e.Type.Num,
            compositeRule: !0
          }, m), D();
        });
      }
      function c(m) {
        i.code((0, r._)`${m}++`), h === void 0 ? i.if((0, r._)`${m} >= ${l}`, () => i.assign(g, !0).break()) : (i.if((0, r._)`${m} > ${h}`, () => i.assign(g, !1).break()), l === 1 ? i.assign(g, !0) : i.if((0, r._)`${m} >= ${l}`, () => i.assign(g, !0)));
      }
    }
  };
  return Tr.default = n, Tr;
}
var Vn = {}, ka;
function Uc() {
  return ka || (ka = 1, function(r) {
    Object.defineProperty(r, "__esModule", { value: !0 }), r.validateSchemaDeps = r.validatePropertyDeps = r.error = void 0;
    const e = ae(), t = ue(), n = ze();
    r.error = {
      message: ({ params: { property: u, depsCount: d, deps: l } }) => {
        const h = d === 1 ? "property" : "properties";
        return (0, e.str)`must have ${h} ${l} when property ${u} is present`;
      },
      params: ({ params: { property: u, depsCount: d, deps: l, missingProperty: h } }) => (0, e._)`{property: ${u},
    missingProperty: ${h},
    depsCount: ${d},
    deps: ${l}}`
      // TODO change to reference
    };
    const s = {
      keyword: "dependencies",
      type: "object",
      schemaType: "object",
      error: r.error,
      code(u) {
        const [d, l] = i(u);
        a(u, d), o(u, l);
      }
    };
    function i({ schema: u }) {
      const d = {}, l = {};
      for (const h in u) {
        if (h === "__proto__")
          continue;
        const y = Array.isArray(u[h]) ? d : l;
        y[h] = u[h];
      }
      return [d, l];
    }
    function a(u, d = u.schema) {
      const { gen: l, data: h, it: y } = u;
      if (Object.keys(d).length === 0)
        return;
      const v = l.let("missing");
      for (const A in d) {
        const g = d[A];
        if (g.length === 0)
          continue;
        const p = (0, n.propertyInData)(l, h, A, y.opts.ownProperties);
        u.setParams({
          property: A,
          depsCount: g.length,
          deps: g.join(", ")
        }), y.allErrors ? l.if(p, () => {
          for (const f of g)
            (0, n.checkReportMissingProp)(u, f);
        }) : (l.if((0, e._)`${p} && (${(0, n.checkMissingProp)(u, g, v)})`), (0, n.reportMissingProp)(u, v), l.else());
      }
    }
    r.validatePropertyDeps = a;
    function o(u, d = u.schema) {
      const { gen: l, data: h, keyword: y, it: v } = u, A = l.name("valid");
      for (const g in d)
        (0, t.alwaysValidSchema)(v, d[g]) || (l.if(
          (0, n.propertyInData)(l, h, g, v.opts.ownProperties),
          () => {
            const p = u.subschema({ keyword: y, schemaProp: g }, A);
            u.mergeValidEvaluated(p, A);
          },
          () => l.var(A, !0)
          // TODO var
        ), u.ok(A));
    }
    r.validateSchemaDeps = o, r.default = s;
  }(Vn)), Vn;
}
var Nr = {}, Oa;
function Vc() {
  if (Oa) return Nr;
  Oa = 1, Object.defineProperty(Nr, "__esModule", { value: !0 });
  const r = ae(), e = ue(), n = {
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
      const d = i.name("valid");
      i.forIn("key", o, (l) => {
        s.setParams({ propertyName: l }), s.subschema({
          keyword: "propertyNames",
          data: l,
          dataTypes: ["string"],
          propertyName: l,
          compositeRule: !0
        }, d), i.if((0, r.not)(d), () => {
          s.error(!0), u.allErrors || i.break();
        });
      }), s.ok(d);
    }
  };
  return Nr.default = n, Nr;
}
var Fr = {}, xa;
function Xu() {
  if (xa) return Fr;
  xa = 1, Object.defineProperty(Fr, "__esModule", { value: !0 });
  const r = ze(), e = ae(), t = ct(), n = ue(), i = {
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
      const { gen: o, schema: u, parentSchema: d, data: l, errsCount: h, it: y } = a;
      if (!h)
        throw new Error("ajv implementation error");
      const { allErrors: v, opts: A } = y;
      if (y.props = !0, A.removeAdditional !== "all" && (0, n.alwaysValidSchema)(y, u))
        return;
      const g = (0, r.allSchemaProperties)(d.properties), p = (0, r.allSchemaProperties)(d.patternProperties);
      f(), a.ok((0, e._)`${h} === ${t.default.errors}`);
      function f() {
        o.forIn("key", l, (b) => {
          !g.length && !p.length ? D(b) : o.if(c(b), () => D(b));
        });
      }
      function c(b) {
        let C;
        if (g.length > 8) {
          const _ = (0, n.schemaRefOrVal)(y, d.properties, "properties");
          C = (0, r.isOwnProperty)(o, _, b);
        } else g.length ? C = (0, e.or)(...g.map((_) => (0, e._)`${b} === ${_}`)) : C = e.nil;
        return p.length && (C = (0, e.or)(C, ...p.map((_) => (0, e._)`${(0, r.usePattern)(a, _)}.test(${b})`))), (0, e.not)(C);
      }
      function m(b) {
        o.code((0, e._)`delete ${l}[${b}]`);
      }
      function D(b) {
        if (A.removeAdditional === "all" || A.removeAdditional && u === !1) {
          m(b);
          return;
        }
        if (u === !1) {
          a.setParams({ additionalProperty: b }), a.error(), v || o.break();
          return;
        }
        if (typeof u == "object" && !(0, n.alwaysValidSchema)(y, u)) {
          const C = o.name("valid");
          A.removeAdditional === "failing" ? (w(b, C, !1), o.if((0, e.not)(C), () => {
            a.reset(), m(b);
          })) : (w(b, C), v || o.if((0, e.not)(C), () => o.break()));
        }
      }
      function w(b, C, _) {
        const P = {
          keyword: "additionalProperties",
          dataProp: b,
          dataPropType: n.Type.Str
        };
        _ === !1 && Object.assign(P, {
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }), a.subschema(P, C);
      }
    }
  };
  return Fr.default = i, Fr;
}
var Pr = {}, qa;
function Hc() {
  if (qa) return Pr;
  qa = 1, Object.defineProperty(Pr, "__esModule", { value: !0 });
  const r = fn(), e = ze(), t = ue(), n = Xu(), s = {
    keyword: "properties",
    type: "object",
    schemaType: "object",
    code(i) {
      const { gen: a, schema: o, parentSchema: u, data: d, it: l } = i;
      l.opts.removeAdditional === "all" && u.additionalProperties === void 0 && n.default.code(new r.KeywordCxt(l, n.default, "additionalProperties"));
      const h = (0, e.allSchemaProperties)(o);
      for (const p of h)
        l.definedProperties.add(p);
      l.opts.unevaluated && h.length && l.props !== !0 && (l.props = t.mergeEvaluated.props(a, (0, t.toHash)(h), l.props));
      const y = h.filter((p) => !(0, t.alwaysValidSchema)(l, o[p]));
      if (y.length === 0)
        return;
      const v = a.name("valid");
      for (const p of y)
        A(p) ? g(p) : (a.if((0, e.propertyInData)(a, d, p, l.opts.ownProperties)), g(p), l.allErrors || a.else().var(v, !0), a.endIf()), i.it.definedProperties.add(p), i.ok(v);
      function A(p) {
        return l.opts.useDefaults && !l.compositeRule && o[p].default !== void 0;
      }
      function g(p) {
        i.subschema({
          keyword: "properties",
          schemaProp: p,
          dataProp: p
        }, v);
      }
    }
  };
  return Pr.default = s, Pr;
}
var Ir = {}, La;
function Gc() {
  if (La) return Ir;
  La = 1, Object.defineProperty(Ir, "__esModule", { value: !0 });
  const r = ze(), e = ae(), t = ue(), n = ue(), s = {
    keyword: "patternProperties",
    type: "object",
    schemaType: "object",
    code(i) {
      const { gen: a, schema: o, data: u, parentSchema: d, it: l } = i, { opts: h } = l, y = (0, r.allSchemaProperties)(o), v = y.filter((D) => (0, t.alwaysValidSchema)(l, o[D]));
      if (y.length === 0 || v.length === y.length && (!l.opts.unevaluated || l.props === !0))
        return;
      const A = h.strictSchema && !h.allowMatchingProperties && d.properties, g = a.name("valid");
      l.props !== !0 && !(l.props instanceof e.Name) && (l.props = (0, n.evaluatedPropsToName)(a, l.props));
      const { props: p } = l;
      f();
      function f() {
        for (const D of y)
          A && c(D), l.allErrors ? m(D) : (a.var(g, !0), m(D), a.if(g));
      }
      function c(D) {
        for (const w in A)
          new RegExp(D).test(w) && (0, t.checkStrictMode)(l, `property ${w} matches pattern ${D} (use allowMatchingProperties)`);
      }
      function m(D) {
        a.forIn("key", u, (w) => {
          a.if((0, e._)`${(0, r.usePattern)(i, D)}.test(${w})`, () => {
            const b = v.includes(D);
            b || i.subschema({
              keyword: "patternProperties",
              schemaProp: D,
              dataProp: w,
              dataPropType: n.Type.Str
            }, g), l.opts.unevaluated && p !== !0 ? a.assign((0, e._)`${p}[${w}]`, !0) : !b && !l.allErrors && a.if((0, e.not)(g), () => a.break());
          });
        });
      }
    }
  };
  return Ir.default = s, Ir;
}
var kr = {}, Ba;
function zc() {
  if (Ba) return kr;
  Ba = 1, Object.defineProperty(kr, "__esModule", { value: !0 });
  const r = ue(), e = {
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
  return kr.default = e, kr;
}
var Or = {}, ja;
function Kc() {
  if (ja) return Or;
  ja = 1, Object.defineProperty(Or, "__esModule", { value: !0 });
  const e = {
    keyword: "anyOf",
    schemaType: "array",
    trackErrors: !0,
    code: ze().validateUnion,
    error: { message: "must match a schema in anyOf" }
  };
  return Or.default = e, Or;
}
var xr = {}, Ma;
function Wc() {
  if (Ma) return xr;
  Ma = 1, Object.defineProperty(xr, "__esModule", { value: !0 });
  const r = ae(), e = ue(), n = {
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
      const d = a, l = i.let("valid", !1), h = i.let("passing", null), y = i.name("_valid");
      s.setParams({ passing: h }), i.block(v), s.result(l, () => s.reset(), () => s.error(!0));
      function v() {
        d.forEach((A, g) => {
          let p;
          (0, e.alwaysValidSchema)(u, A) ? i.var(y, !0) : p = s.subschema({
            keyword: "oneOf",
            schemaProp: g,
            compositeRule: !0
          }, y), g > 0 && i.if((0, r._)`${y} && ${l}`).assign(l, !1).assign(h, (0, r._)`[${h}, ${g}]`).else(), i.if(y, () => {
            i.assign(l, !0), i.assign(h, g), p && s.mergeEvaluated(p, r.Name);
          });
        });
      }
    }
  };
  return xr.default = n, xr;
}
var qr = {}, Ua;
function Xc() {
  if (Ua) return qr;
  Ua = 1, Object.defineProperty(qr, "__esModule", { value: !0 });
  const r = ue(), e = {
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
        const d = t.subschema({ keyword: "allOf", schemaProp: u }, a);
        t.ok(a), t.mergeEvaluated(d);
      });
    }
  };
  return qr.default = e, qr;
}
var Lr = {}, Va;
function Yc() {
  if (Va) return Lr;
  Va = 1, Object.defineProperty(Lr, "__esModule", { value: !0 });
  const r = ae(), e = ue(), n = {
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
      const d = s(u, "then"), l = s(u, "else");
      if (!d && !l)
        return;
      const h = a.let("valid", !0), y = a.name("_valid");
      if (v(), i.reset(), d && l) {
        const g = a.let("ifClause");
        i.setParams({ ifClause: g }), a.if(y, A("then", g), A("else", g));
      } else d ? a.if(y, A("then")) : a.if((0, r.not)(y), A("else"));
      i.pass(h, () => i.error(!0));
      function v() {
        const g = i.subschema({
          keyword: "if",
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }, y);
        i.mergeEvaluated(g);
      }
      function A(g, p) {
        return () => {
          const f = i.subschema({ keyword: g }, y);
          a.assign(h, y), i.mergeValidEvaluated(f, h), p ? a.assign(p, (0, r._)`${g}`) : i.setParams({ ifClause: g });
        };
      }
    }
  };
  function s(i, a) {
    const o = i.schema[a];
    return o !== void 0 && !(0, e.alwaysValidSchema)(i, o);
  }
  return Lr.default = n, Lr;
}
var Br = {}, Ha;
function Jc() {
  if (Ha) return Br;
  Ha = 1, Object.defineProperty(Br, "__esModule", { value: !0 });
  const r = ue(), e = {
    keyword: ["then", "else"],
    schemaType: ["object", "boolean"],
    code({ keyword: t, parentSchema: n, it: s }) {
      n.if === void 0 && (0, r.checkStrictMode)(s, `"${t}" without "if" is ignored`);
    }
  };
  return Br.default = e, Br;
}
var Ga;
function Qc() {
  if (Ga) return _r;
  Ga = 1, Object.defineProperty(_r, "__esModule", { value: !0 });
  const r = Ku(), e = Bc(), t = Wu(), n = jc(), s = Mc(), i = Uc(), a = Vc(), o = Xu(), u = Hc(), d = Gc(), l = zc(), h = Kc(), y = Wc(), v = Xc(), A = Yc(), g = Jc();
  function p(f = !1) {
    const c = [
      // any
      l.default,
      h.default,
      y.default,
      v.default,
      A.default,
      g.default,
      // object
      a.default,
      o.default,
      i.default,
      u.default,
      d.default
    ];
    return f ? c.push(e.default, n.default) : c.push(r.default, t.default), c.push(s.default), c;
  }
  return _r.default = p, _r;
}
var jr = {}, Mr = {}, za;
function Zc() {
  if (za) return Mr;
  za = 1, Object.defineProperty(Mr, "__esModule", { value: !0 });
  const r = ae(), t = {
    keyword: "format",
    type: ["number", "string"],
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: n }) => (0, r.str)`must match format "${n}"`,
      params: ({ schemaCode: n }) => (0, r._)`{format: ${n}}`
    },
    code(n, s) {
      const { gen: i, data: a, $data: o, schema: u, schemaCode: d, it: l } = n, { opts: h, errSchemaPath: y, schemaEnv: v, self: A } = l;
      if (!h.validateFormats)
        return;
      o ? g() : p();
      function g() {
        const f = i.scopeValue("formats", {
          ref: A.formats,
          code: h.code.formats
        }), c = i.const("fDef", (0, r._)`${f}[${d}]`), m = i.let("fType"), D = i.let("format");
        i.if((0, r._)`typeof ${c} == "object" && !(${c} instanceof RegExp)`, () => i.assign(m, (0, r._)`${c}.type || "string"`).assign(D, (0, r._)`${c}.validate`), () => i.assign(m, (0, r._)`"string"`).assign(D, c)), n.fail$data((0, r.or)(w(), b()));
        function w() {
          return h.strictSchema === !1 ? r.nil : (0, r._)`${d} && !${D}`;
        }
        function b() {
          const C = v.$async ? (0, r._)`(${c}.async ? await ${D}(${a}) : ${D}(${a}))` : (0, r._)`${D}(${a})`, _ = (0, r._)`(typeof ${D} == "function" ? ${C} : ${D}.test(${a}))`;
          return (0, r._)`${D} && ${D} !== true && ${m} === ${s} && !${_}`;
        }
      }
      function p() {
        const f = A.formats[u];
        if (!f) {
          w();
          return;
        }
        if (f === !0)
          return;
        const [c, m, D] = b(f);
        c === s && n.pass(C());
        function w() {
          if (h.strictSchema === !1) {
            A.logger.warn(_());
            return;
          }
          throw new Error(_());
          function _() {
            return `unknown format "${u}" ignored in schema at path "${y}"`;
          }
        }
        function b(_) {
          const P = _ instanceof RegExp ? (0, r.regexpCode)(_) : h.code.formats ? (0, r._)`${h.code.formats}${(0, r.getProperty)(u)}` : void 0, U = i.scopeValue("formats", { key: u, ref: _, code: P });
          return typeof _ == "object" && !(_ instanceof RegExp) ? [_.type || "string", _.validate, (0, r._)`${U}.validate`] : ["string", _, U];
        }
        function C() {
          if (typeof f == "object" && !(f instanceof RegExp) && f.async) {
            if (!v.$async)
              throw new Error("async format in sync schema");
            return (0, r._)`await ${D}(${a})`;
          }
          return typeof m == "function" ? (0, r._)`${D}(${a})` : (0, r._)`${D}.test(${a})`;
        }
      }
    }
  };
  return Mr.default = t, Mr;
}
var Ka;
function ed() {
  if (Ka) return jr;
  Ka = 1, Object.defineProperty(jr, "__esModule", { value: !0 });
  const e = [Zc().default];
  return jr.default = e, jr;
}
var mt = {}, Wa;
function td() {
  return Wa || (Wa = 1, Object.defineProperty(mt, "__esModule", { value: !0 }), mt.contentVocabulary = mt.metadataVocabulary = void 0, mt.metadataVocabulary = [
    "title",
    "description",
    "default",
    "deprecated",
    "readOnly",
    "writeOnly",
    "examples"
  ], mt.contentVocabulary = [
    "contentMediaType",
    "contentEncoding",
    "contentSchema"
  ]), mt;
}
var Xa;
function rd() {
  if (Xa) return cr;
  Xa = 1, Object.defineProperty(cr, "__esModule", { value: !0 });
  const r = _c(), e = Lc(), t = Qc(), n = ed(), s = td(), i = [
    r.default,
    e.default,
    (0, t.default)(),
    n.default,
    s.metadataVocabulary,
    s.contentVocabulary
  ];
  return cr.default = i, cr;
}
var Ur = {}, jt = {}, Ya;
function nd() {
  if (Ya) return jt;
  Ya = 1, Object.defineProperty(jt, "__esModule", { value: !0 }), jt.DiscrError = void 0;
  var r;
  return function(e) {
    e.Tag = "tag", e.Mapping = "mapping";
  }(r || (jt.DiscrError = r = {})), jt;
}
var Ja;
function sd() {
  if (Ja) return Ur;
  Ja = 1, Object.defineProperty(Ur, "__esModule", { value: !0 });
  const r = ae(), e = nd(), t = li(), n = hn(), s = ue(), a = {
    keyword: "discriminator",
    type: "object",
    schemaType: "object",
    error: {
      message: ({ params: { discrError: o, tagName: u } }) => o === e.DiscrError.Tag ? `tag "${u}" must be string` : `value of tag "${u}" must be in oneOf`,
      params: ({ params: { discrError: o, tag: u, tagName: d } }) => (0, r._)`{error: ${o}, tag: ${d}, tagValue: ${u}}`
    },
    code(o) {
      const { gen: u, data: d, schema: l, parentSchema: h, it: y } = o, { oneOf: v } = h;
      if (!y.opts.discriminator)
        throw new Error("discriminator: requires discriminator option");
      const A = l.propertyName;
      if (typeof A != "string")
        throw new Error("discriminator: requires propertyName");
      if (l.mapping)
        throw new Error("discriminator: mapping is not supported");
      if (!v)
        throw new Error("discriminator: requires oneOf keyword");
      const g = u.let("valid", !1), p = u.const("tag", (0, r._)`${d}${(0, r.getProperty)(A)}`);
      u.if((0, r._)`typeof ${p} == "string"`, () => f(), () => o.error(!1, { discrError: e.DiscrError.Tag, tag: p, tagName: A })), o.ok(g);
      function f() {
        const D = m();
        u.if(!1);
        for (const w in D)
          u.elseIf((0, r._)`${p} === ${w}`), u.assign(g, c(D[w]));
        u.else(), o.error(!1, { discrError: e.DiscrError.Mapping, tag: p, tagName: A }), u.endIf();
      }
      function c(D) {
        const w = u.name("valid"), b = o.subschema({ keyword: "oneOf", schemaProp: D }, w);
        return o.mergeEvaluated(b, r.Name), w;
      }
      function m() {
        var D;
        const w = {}, b = _(h);
        let C = !0;
        for (let H = 0; H < v.length; H++) {
          let te = v[H];
          if (te != null && te.$ref && !(0, s.schemaHasRulesButRef)(te, y.self.RULES)) {
            const L = te.$ref;
            if (te = t.resolveRef.call(y.self, y.schemaEnv.root, y.baseId, L), te instanceof t.SchemaEnv && (te = te.schema), te === void 0)
              throw new n.default(y.opts.uriResolver, y.baseId, L);
          }
          const ee = (D = te == null ? void 0 : te.properties) === null || D === void 0 ? void 0 : D[A];
          if (typeof ee != "object")
            throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${A}"`);
          C = C && (b || _(te)), P(ee, H);
        }
        if (!C)
          throw new Error(`discriminator: "${A}" must be required`);
        return w;
        function _({ required: H }) {
          return Array.isArray(H) && H.includes(A);
        }
        function P(H, te) {
          if (H.const)
            U(H.const, te);
          else if (H.enum)
            for (const ee of H.enum)
              U(ee, te);
          else
            throw new Error(`discriminator: "properties/${A}" must have "const" or "enum"`);
        }
        function U(H, te) {
          if (typeof H != "string" || H in w)
            throw new Error(`discriminator: "${A}" values must be unique strings`);
          w[H] = te;
        }
      }
    }
  };
  return Ur.default = a, Ur;
}
const id = "http://json-schema.org/draft-07/schema#", ad = "http://json-schema.org/draft-07/schema#", od = "Core schema meta-schema", ud = { schemaArray: { type: "array", minItems: 1, items: { $ref: "#" } }, nonNegativeInteger: { type: "integer", minimum: 0 }, nonNegativeIntegerDefault0: { allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }] }, simpleTypes: { enum: ["array", "boolean", "integer", "null", "number", "object", "string"] }, stringArray: { type: "array", items: { type: "string" }, uniqueItems: !0, default: [] } }, ld = ["object", "boolean"], cd = { $id: { type: "string", format: "uri-reference" }, $schema: { type: "string", format: "uri" }, $ref: { type: "string", format: "uri-reference" }, $comment: { type: "string" }, title: { type: "string" }, description: { type: "string" }, default: !0, readOnly: { type: "boolean", default: !1 }, examples: { type: "array", items: !0 }, multipleOf: { type: "number", exclusiveMinimum: 0 }, maximum: { type: "number" }, exclusiveMaximum: { type: "number" }, minimum: { type: "number" }, exclusiveMinimum: { type: "number" }, maxLength: { $ref: "#/definitions/nonNegativeInteger" }, minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, pattern: { type: "string", format: "regex" }, additionalItems: { $ref: "#" }, items: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }], default: !0 }, maxItems: { $ref: "#/definitions/nonNegativeInteger" }, minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, uniqueItems: { type: "boolean", default: !1 }, contains: { $ref: "#" }, maxProperties: { $ref: "#/definitions/nonNegativeInteger" }, minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, required: { $ref: "#/definitions/stringArray" }, additionalProperties: { $ref: "#" }, definitions: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, properties: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, patternProperties: { type: "object", additionalProperties: { $ref: "#" }, propertyNames: { format: "regex" }, default: {} }, dependencies: { type: "object", additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] } }, propertyNames: { $ref: "#" }, const: !0, enum: { type: "array", items: !0, minItems: 1, uniqueItems: !0 }, type: { anyOf: [{ $ref: "#/definitions/simpleTypes" }, { type: "array", items: { $ref: "#/definitions/simpleTypes" }, minItems: 1, uniqueItems: !0 }] }, format: { type: "string" }, contentMediaType: { type: "string" }, contentEncoding: { type: "string" }, if: { $ref: "#" }, then: { $ref: "#" }, else: { $ref: "#" }, allOf: { $ref: "#/definitions/schemaArray" }, anyOf: { $ref: "#/definitions/schemaArray" }, oneOf: { $ref: "#/definitions/schemaArray" }, not: { $ref: "#" } }, dd = {
  $schema: id,
  $id: ad,
  title: od,
  definitions: ud,
  type: ld,
  properties: cd,
  default: !0
};
var Qa;
function fd() {
  return Qa || (Qa = 1, function(r, e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.MissingRefError = e.ValidationError = e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = e.Ajv = void 0;
    const t = Ac(), n = rd(), s = sd(), i = dd, a = ["/properties"], o = "http://json-schema.org/draft-07/schema";
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
    var d = fn();
    Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
      return d.KeywordCxt;
    } });
    var l = ae();
    Object.defineProperty(e, "_", { enumerable: !0, get: function() {
      return l._;
    } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
      return l.str;
    } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
      return l.stringify;
    } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
      return l.nil;
    } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
      return l.Name;
    } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
      return l.CodeGen;
    } });
    var h = ui();
    Object.defineProperty(e, "ValidationError", { enumerable: !0, get: function() {
      return h.default;
    } });
    var y = hn();
    Object.defineProperty(e, "MissingRefError", { enumerable: !0, get: function() {
      return y.default;
    } });
  }(ir, ir.exports)), ir.exports;
}
var hd = fd();
const di = /* @__PURE__ */ ic(hd);
function nt(r, e = "or") {
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
function fE(r) {
  return r;
}
function md(...r) {
  return (e) => r.some((n) => e.hasAttribute(n)) ? null : `requires ${nt(r.map((n) => `"${n}"`))} attribute to be present`;
}
function pd(...r) {
  return (e) => {
    const t = r.filter((s) => e.hasAttribute(s));
    return t.length === 0 ? null : `cannot be used at the same time as ${nt(t.map((s) => `"${s}"`))}`;
  };
}
function gd(r, e, { defaultValue: t } = {}) {
  return (n) => {
    const s = n.getAttribute(r);
    if (s && typeof s != "string")
      return null;
    const i = s ?? t;
    if (i && e.includes(i.toLocaleLowerCase()))
      return null;
    const a = nt(e.map((o) => `"${o}"`));
    return `"${r}" attribute must be ${a}`;
  };
}
function yd(...r) {
  return (e) => r.some((s) => e.closest(s)) ? null : `requires ${nt(r.map((s) => `<${s}>`))} as parent`;
}
const bd = {
  allowedIfAttributeIsPresent: md,
  allowedIfAttributeIsAbsent: pd,
  allowedIfAttributeHasValue: gd,
  allowedIfParentIsPresent: yd
}, {
  allowedIfAttributeIsPresent: Ce,
  allowedIfAttributeIsAbsent: Hn,
  allowedIfAttributeHasValue: Pe,
  allowedIfParentIsPresent: Mt
} = bd, Za = "/\\S+/", $t = [
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
function Vr(r) {
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
function eo(r) {
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
var Yu = {
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
        enum: [Za]
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
        allowed: Ce("href"),
        omit: !0,
        enum: ["/.+/"]
      },
      href: {
        enum: ["/.*/"]
      },
      hreflang: {
        allowed: Ce("href")
      },
      itemprop: {
        allowed: Ce("href")
      },
      methods: {
        deprecated: !0
      },
      name: {
        deprecated: !0
      },
      ping: {
        allowed: Ce("href")
      },
      referrerpolicy: {
        allowed: Ce("href"),
        enum: $t
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
        allowed: Ce("href"),
        enum: ["/[^_].*/", "_blank", "_self", "_parent", "_top"]
      },
      type: {
        allowed: Ce("href")
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
        allowed: Ce("href")
      },
      nohref: {
        deprecated: !0
      },
      itemprop: {
        allowed: Ce("href")
      },
      ping: {
        allowed: Ce("href")
      },
      referrerpolicy: {
        allowed: Ce("href"),
        enum: $t
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
              return Ce("coords")(r, e);
            default:
              return null;
          }
        },
        enum: ["rect", "circle", "poly", "default"]
      },
      target: {
        allowed: Ce("href"),
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
        allowed: Ce("src")
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
        allowed: Pe("type", ["submit"], { defaultValue: "submit" })
      },
      formenctype: {
        allowed: Pe("type", ["submit"], { defaultValue: "submit" })
      },
      formmethod: {
        allowed: Pe("type", ["submit"], { defaultValue: "submit" }),
        enum: ["get", "post", "dialog"]
      },
      formnovalidate: {
        allowed: Pe("type", ["submit"], { defaultValue: "submit" }),
        boolean: !0
      },
      formtarget: {
        allowed: Pe("type", ["submit"], { defaultValue: "submit" }),
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
        return Vr(r) ? "generic" : "contentinfo";
      },
      naming(r) {
        return Vr(r) ? "prohibited" : "allowed";
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
        return Vr(r) ? "generic" : "banner";
      },
      naming(r) {
        return Vr(r) ? "prohibited" : "allowed";
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
        enum: $t
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
        enum: $t
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
        allowed: Pe("type", ["submit", "image"], {
          defaultValue: "submit"
        })
      },
      formenctype: {
        allowed: Pe("type", ["submit", "image"], {
          defaultValue: "submit"
        })
      },
      formmethod: {
        allowed: Pe("type", ["submit", "image"], {
          defaultValue: "submit"
        }),
        enum: ["get", "post", "dialog"]
      },
      formnovalidate: {
        allowed: Pe("type", ["submit", "image"], {
          defaultValue: "submit"
        }),
        boolean: !0
      },
      formtarget: {
        allowed: Pe("type", ["submit", "image"], {
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
        enum: [Za]
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
      return eo(r);
    },
    phrasing(r) {
      return eo(r);
    },
    void: !0,
    attributes: {
      as: {
        allowed: Pe("rel", ["prefetch", "preload", "modulepreload"]),
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
        allowed: Pe("rel", ["stylesheet", "preload", "modulepreload"]),
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
        allowed: Pe("rel", ["stylesheet"]),
        boolean: !0
      },
      href: {
        required: !0,
        enum: ["/.+/"]
      },
      integrity: {
        allowed: Pe("rel", ["stylesheet", "preload", "modulepreload"]),
        enum: ["/.+/"]
      },
      methods: {
        deprecated: !0
      },
      referrerpolicy: {
        enum: $t
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
        allowed: Ce("name", "http-equiv", "itemprop", "property")
      },
      itemprop: {
        allowed: Hn("http-equiv", "name")
      },
      name: {
        allowed: Hn("http-equiv", "itemprop")
      },
      "http-equiv": {
        allowed: Hn("name", "itemprop")
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
        allowed: Ce("src"),
        enum: ["/.+/"]
      },
      language: {
        deprecated: !0
      },
      nomodule: {
        boolean: !0
      },
      referrerpolicy: {
        enum: $t
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
        allowed: Mt("audio", "video")
      },
      srcset: {
        allowed: Mt("picture")
      },
      sizes: {
        allowed: Mt("picture")
      },
      width: {
        allowed: Mt("picture"),
        enum: ["/\\d+/"]
      },
      height: {
        allowed: Mt("picture"),
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
        allowed: Ce("src")
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
const vd = {
  html5: Yu
};
var Ju = [
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
let Hs, Qu, Zu, el, tl = !0;
typeof process < "u" && ({ FORCE_COLOR: Hs, NODE_DISABLE_COLORS: Qu, NO_COLOR: Zu, TERM: el } = process.env || {}, tl = process.stdout && process.stdout.isTTY);
const Ed = {
  enabled: !Qu && Zu == null && el !== "dumb" && (Hs != null && Hs !== "0" || tl)
};
function fi(r, e) {
  let t = new RegExp(`\\x1b\\[${e}m`, "g"), n = `\x1B[${r}m`, s = `\x1B[${e}m`;
  return function(i) {
    return !Ed.enabled || i == null ? i : n + (~("" + i).indexOf(s) ? i.replace(t, s + n) : i) + s;
  };
}
const mn = fi(1, 22), Xt = fi(31, 39), pn = fi(35, 39);
var Dd = Object.create, rl = Object.defineProperty, wd = Object.getOwnPropertyDescriptor, nl = Object.getOwnPropertyNames, Ad = Object.getPrototypeOf, Cd = Object.prototype.hasOwnProperty, sl = (r, e) => function() {
  return e || (0, r[nl(r)[0]])((e = { exports: {} }).exports, e), e.exports;
}, $d = (r, e, t, n) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let s of nl(e))
      !Cd.call(r, s) && s !== t && rl(r, s, { get: () => e[s], enumerable: !(n = wd(e, s)) || n.enumerable });
  return r;
}, il = (r, e, t) => (t = r != null ? Dd(Ad(r)) : {}, $d(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  !r || !r.__esModule ? rl(t, "default", { value: r, enumerable: !0 }) : t,
  r
)), _d = sl({
  "node_modules/leven/index.js"(r, e) {
    var t = [], n = [], s = (i, a) => {
      if (i === a)
        return 0;
      const o = i;
      i.length > a.length && (i = a, a = o);
      let u = i.length, d = a.length;
      for (; u > 0 && i.charCodeAt(~-u) === a.charCodeAt(~-d); )
        u--, d--;
      let l = 0;
      for (; l < u && i.charCodeAt(l) === a.charCodeAt(l); )
        l++;
      if (u -= l, d -= l, u === 0)
        return d;
      let h, y, v, A, g = 0, p = 0;
      for (; g < u; )
        n[g] = i.charCodeAt(l + g), t[g] = ++g;
      for (; p < d; )
        for (h = a.charCodeAt(l + p), v = p++, y = p, g = 0; g < u; g++)
          A = h === n[g] ? v : v + 1, v = t[g], y = t[g] = v > y ? A > y ? y + 1 : A : A > v ? v + 1 : A;
      return y;
    };
    e.exports = s, e.exports.default = s;
  }
}), Sd = sl({
  "node_modules/jsonpointer/jsonpointer.js"(r) {
    var e = /~/, t = /~[01]/g;
    function n(l) {
      switch (l) {
        case "~1":
          return "/";
        case "~0":
          return "~";
      }
      throw new Error("Invalid tilde escape: " + l);
    }
    function s(l) {
      return e.test(l) ? l.replace(t, n) : l;
    }
    function i(l, h, y) {
      for (var v, A, g = 1, p = h.length; g < p; ) {
        if (h[g] === "constructor" || h[g] === "prototype" || h[g] === "__proto__") return l;
        if (v = s(h[g++]), A = p > g, typeof l[v] > "u" && (Array.isArray(l) && v === "-" && (v = l.length), A && (h[g] !== "" && h[g] < 1 / 0 || h[g] === "-" ? l[v] = [] : l[v] = {})), !A) break;
        l = l[v];
      }
      var f = l[v];
      return y === void 0 ? delete l[v] : l[v] = y, f;
    }
    function a(l) {
      if (typeof l == "string") {
        if (l = l.split("/"), l[0] === "") return l;
        throw new Error("Invalid JSON pointer.");
      } else if (Array.isArray(l)) {
        for (const h of l)
          if (typeof h != "string" && typeof h != "number")
            throw new Error("Invalid JSON pointer. Must be of type string or number.");
        return l;
      }
      throw new Error("Invalid JSON pointer.");
    }
    function o(l, h) {
      if (typeof l != "object") throw new Error("Invalid input object.");
      h = a(h);
      var y = h.length;
      if (y === 1) return l;
      for (var v = 1; v < y; ) {
        if (l = l[s(h[v++])], y === v) return l;
        if (typeof l != "object" || l === null) return;
      }
    }
    function u(l, h, y) {
      if (typeof l != "object") throw new Error("Invalid input object.");
      if (h = a(h), h.length === 0) throw new Error("Invalid JSON pointer for set.");
      return i(l, h, y);
    }
    function d(l) {
      var h = a(l);
      return {
        get: function(y) {
          return o(y, h);
        },
        set: function(y, v) {
          return u(y, h, v);
        }
      };
    }
    r.get = o, r.set = u, r.compile = d;
  }
}), hi = 48, Rd = 49, al = 57, Kt = 92, Td = 36, Gs = 46, ol = 34, ul = 97, Nd = 101, mi = 102, ll = 110, cl = 116, to = 117, ro = 120, Fd = 122, zs = 45, pi = 10, Ks = 43, gi = 13, Pd = 39, Ht = 47, Id = 32, kd = 9, Od = 95, dl = 65, xd = 69, qd = 70, Ld = 78, Bd = 88, jd = 90, Md = 98, Ud = 114, Vd = 118, fl = 8232, hl = 8233, Hd = 73, no = 42, Gd = 11, zd = 12, Kd = 160, Wd = 65279, Xd = 160, Yd = 8192, Jd = 8193, Qd = 8194, Zd = 8195, ef = 8196, tf = 8197, rf = 8198, nf = 8199, sf = 8200, af = 8201, of = 8202, uf = 8239, lf = 8287, cf = 12288, df = "[", ff = "]", hf = "{", mf = "}", pf = ":", gf = ",", yf = "true", bf = "false", vf = "null", Ef = "NaN", Df = "Infinity", Ws = '"', Yt = /* @__PURE__ */ new Map([
  [ol, Ws],
  [Kt, "\\"],
  [Ht, "/"],
  [Md, "\b"],
  [ll, `
`],
  [mi, "\f"],
  [Ud, "\r"],
  [cl, "	"]
]), sn = new Map([
  ...Yt,
  [Vd, "\v"],
  [hi, "\0"]
]), wf = /* @__PURE__ */ new Map([
  [Ws, Ws],
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
  ...wf,
  ["\v", "v"],
  ["\0", "0"],
  ["\u2028", "u2028"],
  ["\u2029", "u2029"]
]);
var Jr = /* @__PURE__ */ new Map([
  [df, "LBracket"],
  [ff, "RBracket"],
  [hf, "LBrace"],
  [mf, "RBrace"],
  [pf, "Colon"],
  [gf, "Comma"],
  [yf, "Boolean"],
  [bf, "Boolean"],
  [vf, "Null"]
]), Hr = new Map([
  ...Jr,
  [Ef, "Number"],
  [Df, "Number"]
]), Xs = /* @__PURE__ */ new Set([
  pi,
  gi,
  fl,
  hl
]), Et = class extends Error {
  /**
   * Creates a new instance.
   * @param {string} message The error message to report. 
   * @param {Location} loc The location information for the error.
   */
  constructor(r, { line: e, column: t, offset: n }) {
    super(`${r} (${e}:${t})`), this.line = e, this.column = t, this.offset = n;
  }
}, Af = class extends Et {
  /**
   * Creates a new instance.
   * @param {number} unexpected The character that was found.
   * @param {Location} loc The location information for the found character.
   */
  constructor(r, e) {
    super(`Unexpected character '${String.fromCharCode(r)}' found.`, e);
  }
}, Cf = class extends Et {
  /**
   * Creates a new instance.
   * @param {string} unexpected The character that was found.
   * @param {Location} loc The location information for the found character.
   */
  constructor(r, e) {
    super(`Unexpected identifier '${r}' found.`, e);
  }
}, _t = class extends Et {
  /**
   * Creates a new instance.
   * @param {Token} token The token that was found. 
   */
  constructor(r) {
    super(`Unexpected token ${r.type} found.`, r.loc.start);
  }
}, ml = class extends Et {
  /**
   * Creates a new instance.
   * @param {Location} loc The location information for the found character.
   */
  constructor(r) {
    super("Unexpected end of input found.", r);
  }
}, $f = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/, _f = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/, Sf = 13, so = 10, at, Qt, bt, Ue, vt, Tt, Zt, on, pl, Mu, Rf = (Mu = class {
  /**
   * Creates a new instance.
   * @param {string} text The text to read from
   */
  constructor(r) {
    pe(this, on);
    /**
     * The text to read from.
     * @type {string}
     */
    pe(this, at, "");
    /**
     * The current line number.
     * @type {number}
     */
    pe(this, Qt, 1);
    /**
     * The current column number.
     * @type {number}
     */
    pe(this, bt, 0);
    /**
     * The current offset in the text.
     * @type {number}
     */
    pe(this, Ue, -1);
    /**
     * Whether the last character read was a new line.
     * @type {boolean}
     */
    pe(this, vt, !1);
    /**
     * The last character code read.
     * @type {number}
     */
    pe(this, Tt, -1);
    /**
     * Whether the reader has ended.
     * @type {boolean}
     */
    pe(this, Zt, !1);
    ce(this, at, r);
  }
  /**
   * Returns the current position of the reader.
   * @returns {Location} An object with line, column, and offset properties.
   */
  locate() {
    return {
      line: q(this, Qt),
      column: q(this, bt),
      offset: q(this, Ue)
    };
  }
  /**
   * Reads the next character code in the text.
   * @returns {number} The next character code, or -1 if there are no more characters.
   */
  next() {
    if (q(this, Ue) >= q(this, at).length - 1)
      return ne(this, on, pl).call(this), -1;
    dt(this, Ue)._++;
    const r = q(this, at).charCodeAt(q(this, Ue));
    return q(this, vt) ? (dt(this, Qt)._++, ce(this, bt, 1), ce(this, vt, !1)) : dt(this, bt)._++, r === Sf ? (ce(this, vt, !0), this.peek() === so && dt(this, Ue)._++) : r === so && ce(this, vt, !0), ce(this, Tt, r), r;
  }
  /**
   * Peeks at the next character code in the text.
   * @returns {number} The next character code, or -1 if there are no more characters.
   */
  peek() {
    return q(this, Ue) === q(this, at).length - 1 ? -1 : q(this, at).charCodeAt(q(this, Ue) + 1);
  }
  /**
   * Determines if the next character code in the text matches a specific character code.
   * @param {(number) => boolean} fn A function to call on the next character.
   * @returns {boolean} True if the next character code matches, false if not.
   */
  match(r) {
    return r(this.peek()) ? (this.next(), !0) : !1;
  }
  /**
   * Returns the last character code read.
   * @returns {number} The last character code read.
   */
  current() {
    return q(this, Tt);
  }
}, at = new WeakMap(), Qt = new WeakMap(), bt = new WeakMap(), Ue = new WeakMap(), vt = new WeakMap(), Tt = new WeakMap(), Zt = new WeakMap(), on = new WeakSet(), /**
 * Ends the reader.
 * @returns {void}
 */
pl = function() {
  q(this, Zt) || (dt(this, bt)._++, dt(this, Ue)._++, ce(this, Tt, -1), ce(this, Zt, !0));
}, Mu), Tf = "Infinity", Nf = "NaN", Ff = /* @__PURE__ */ new Set([cl, mi, ll]), Ys = /* @__PURE__ */ new Set([Id, kd, pi, gi]), io = /* @__PURE__ */ new Set([
  ...Ys,
  Gd,
  zd,
  Kd,
  fl,
  hl,
  Wd,
  Xd,
  Yd,
  Jd,
  Qd,
  Zd,
  ef,
  tf,
  rf,
  nf,
  sf,
  af,
  of,
  uf,
  lf,
  cf
]), Pf = {
  mode: "json",
  ranges: !1
}, If = /* @__PURE__ */ new Set(["true", "false", "null"]), he = {
  EOF: 0,
  Number: 1,
  String: 2,
  Boolean: 3,
  Null: 4,
  NaN: 5,
  Infinity: 6,
  Identifier: 7,
  Colon: 20,
  LBrace: 21,
  RBrace: 22,
  LBracket: 23,
  RBracket: 24,
  Comma: 25,
  LineComment: 40,
  BlockComment: 41
};
function tt(r) {
  return r >= hi && r <= al;
}
function Gn(r) {
  return tt(r) || r >= dl && r <= qd || r >= ul && r <= mi;
}
function kf(r) {
  return r >= Rd && r <= al;
}
function Of(r) {
  return Ff.has(r);
}
function gl(r) {
  return tt(r) || r === Gs || r === zs;
}
function xf(r) {
  return gl(r) || r === Ks;
}
function ao(r, e) {
  return r === ol || e && r === Pd;
}
function Js(r) {
  if (r === Td || r === Od || r === Kt || r >= ul && r <= Fd || r >= dl && r <= jd || r === 8204 || r === 8205)
    return !0;
  const e = String.fromCharCode(r);
  return $f.test(e);
}
function oo(r) {
  if (Js(r) || tt(r))
    return !0;
  const e = String.fromCharCode(r);
  return _f.test(e);
}
var ot, un, G, $e, Nt, ln, Se, er, tr, rr, nr, Z, _e, yl, Gt, Le, Qr, Zr, Qs, Zs, ei, Uu, qf = (Uu = class {
  /**
   * Creates a new instance of the tokenizer.
   * @param {string} text The source text
   * @param {TokenizeOptions} [options] Options for the tokenizer.
   */
  constructor(r, e) {
    pe(this, Z);
    /**
     * Options for the tokenizer.
     * @type {TokenizeOptions}
     */
    pe(this, ot);
    /**
     * The source text to tokenize.
     * @type {string}
     */
    pe(this, un);
    /**
     * The reader for the source text.
     * @type {CharCodeReader}
     */
    pe(this, G);
    /**
     * Indicates if the tokenizer is in JSON5 mode.
     * @type {boolean}
     */
    pe(this, $e);
    /**
     * Indicates if comments are allowed.
     * @type {boolean}
     */
    pe(this, Nt);
    /**
     * Indicates if ranges should be included in the tokens.
     * @type {boolean}
     */
    pe(this, ln);
    /**
     * The last token type read.
     * @type {Token}
     */
    pe(this, Se);
    /**
     * Determines if a character is an escaped character.
     * @type {(c:number) => boolean}
     */
    pe(this, er);
    /**
     * Determines if a character is a JSON5 line terminator.
     * @type {(c:number) => boolean}
     */
    pe(this, tr);
    /**
     * Determines if a character is a JSON5 hex escape.
     * @type {(c:number) => boolean}
     */
    pe(this, rr);
    /**
     * Determines if a character is whitespace.
     * @type {(c:number) => boolean}
     */
    pe(this, nr);
    ce(this, un, r), ce(this, ot, {
      ...Pf,
      ...e
    }), ce(this, G, new Rf(r)), ce(this, $e, q(this, ot).mode === "json5"), ce(this, Nt, q(this, ot).mode !== "json"), ce(this, ln, q(this, ot).ranges), ce(this, er, q(this, $e) ? sn.has.bind(sn) : Yt.has.bind(Yt)), ce(this, tr, q(this, $e) ? Xs.has.bind(Xs) : () => !1), ce(this, rr, q(this, $e) ? (t) => t === ro : () => !1), ce(this, nr, q(this, $e) ? io.has.bind(io) : Ys.has.bind(Ys));
  }
  // #endregion
  /**
   * Returns the next token in the source text.
   * @returns {number} The code for the next token.
   */
  next() {
    let r = q(this, G).next();
    for (; q(this, nr).call(this, r); )
      r = q(this, G).next();
    if (r === -1)
      return he.EOF;
    const e = q(this, G).locate(), t = String.fromCharCode(r);
    if (q(this, $e))
      if (Hr.has(t))
        ce(this, Se, ne(this, Z, Le).call(this, Hr.get(t), 1, e));
      else if (Js(r)) {
        const n = ne(this, Z, Zr).call(this, r);
        Hr.has(n) ? ce(this, Se, ne(this, Z, Le).call(this, Hr.get(n), n.length, e)) : ce(this, Se, ne(this, Z, Le).call(this, "Identifier", n.length, e));
      } else if (xf(r)) {
        const n = ne(this, Z, Zs).call(this, r);
        ce(this, Se, ne(this, Z, Le).call(this, "Number", n, e));
      } else if (ao(r, q(this, $e))) {
        const n = ne(this, Z, Qs).call(this, r), s = q(this, G).locate();
        ce(this, Se, ne(this, Z, Le).call(this, "String", n, e, {
          line: s.line,
          column: s.column + 1,
          offset: s.offset + 1
        }));
      } else if (r === Ht && q(this, Nt)) {
        const n = ne(this, Z, ei).call(this, r), s = q(this, G).locate();
        ce(this, Se, ne(this, Z, Le).call(this, n.multiline ? "BlockComment" : "LineComment", n.length, e, {
          line: s.line,
          column: s.column + 1,
          offset: s.offset + 1
        }));
      } else
        ne(this, Z, _e).call(this, r);
    else if (Jr.has(t))
      ce(this, Se, ne(this, Z, Le).call(this, Jr.get(t), 1, e));
    else if (Of(r)) {
      const n = ne(this, Z, Zr).call(this, r);
      If.has(n) || ne(this, Z, yl).call(this, n, e), ce(this, Se, ne(this, Z, Le).call(this, Jr.get(n), n.length, e));
    } else if (gl(r)) {
      const n = ne(this, Z, Zs).call(this, r);
      ce(this, Se, ne(this, Z, Le).call(this, "Number", n, e));
    } else if (ao(r, q(this, $e))) {
      const n = ne(this, Z, Qs).call(this, r);
      ce(this, Se, ne(this, Z, Le).call(this, "String", n, e));
    } else if (r === Ht && q(this, Nt)) {
      const n = ne(this, Z, ei).call(this, r), s = q(this, G).locate();
      ce(this, Se, ne(this, Z, Le).call(this, n.multiline ? "BlockComment" : "LineComment", n.length, e, {
        line: s.line,
        column: s.column + 1,
        offset: s.offset + 1
      }));
    } else
      ne(this, Z, _e).call(this, r);
    return he[q(this, Se).type];
  }
  /**
   * Returns the current token in the source text.
   * @returns {Token} The current token.
   */
  get token() {
    return q(this, Se);
  }
}, ot = new WeakMap(), un = new WeakMap(), G = new WeakMap(), $e = new WeakMap(), Nt = new WeakMap(), ln = new WeakMap(), Se = new WeakMap(), er = new WeakMap(), tr = new WeakMap(), rr = new WeakMap(), nr = new WeakMap(), Z = new WeakSet(), // #region Errors
/**
 * Convenience function for throwing unexpected character errors.
 * @param {number} c The unexpected character.
 * @param {Location} [loc] The location of the unexpected character.
 * @returns {never}
 * @throws {UnexpectedChar} always.
 */
_e = function(r, e = q(this, G).locate()) {
  throw new Af(r, e);
}, /**
 * Convenience function for throwing unexpected identifier errors.
 * @param {string} identifier The unexpected identifier.
 * @param {Location} [loc] The location of the unexpected identifier.
 * @returns {never}
 * @throws {UnexpectedIdentifier} always.
 */
yl = function(r, e = q(this, G).locate()) {
  throw new Cf(r, e);
}, /**
* Convenience function for throwing unexpected EOF errors.
* @returns {never}
* @throws {UnexpectedEOF} always.
*/
Gt = function() {
  throw new ml(q(this, G).locate());
}, // #endregion
// #region Helpers
/**
 * Creates a new token.
 * @param {TokenType} tokenType The type of token to create.
 * @param {number} length The length of the token.
 * @param {Location} startLoc The start location for the token.
 * @param {Location} [endLoc] The end location for the token.
 * @returns {Token} The token.
 */
Le = function(r, e, t, n) {
  const s = t.offset + e;
  let i = q(this, ot).ranges ? {
    range: (
      /** @type {Range} */
      [t.offset, s]
    )
  } : void 0;
  return {
    type: r,
    loc: {
      start: t,
      end: n || {
        line: t.line,
        column: t.column + e,
        offset: s
      }
    },
    ...i
  };
}, /**
 * Reads in a specific number of hex digits.
 * @param {number} count The number of hex digits to read.
 * @returns {string} The hex digits read.
 */
Qr = function(r) {
  let e = "", t;
  for (let n = 0; n < r; n++) {
    if (t = q(this, G).peek(), Gn(t)) {
      q(this, G).next(), e += String.fromCharCode(t);
      continue;
    }
    ne(this, Z, _e).call(this, t);
  }
  return e;
}, /**
 * Reads in a JSON5 identifier. Also used for JSON but we validate
 * the identifier later.
 * @param {number} c The first character of the identifier.
 * @returns {string} The identifier read.
 * @throws {UnexpectedChar} when the identifier cannot be read.
 */
Zr = function(r) {
  let e = "";
  do {
    if (e += String.fromCharCode(r), r === Kt) {
      r = q(this, G).next(), r !== to && ne(this, Z, _e).call(this, r), e += String.fromCharCode(r);
      const t = ne(this, Z, Qr).call(this, 4), n = parseInt(t, 16);
      if (e.length === 2 && !Js(n)) {
        const s = q(this, G).locate();
        ne(this, Z, _e).call(this, Kt, { line: s.line, column: s.column - 5, offset: s.offset - 5 });
      } else if (!oo(n)) {
        const s = q(this, G).locate();
        ne(this, Z, _e).call(this, n, { line: s.line, column: s.column - 5, offset: s.offset - 5 });
      }
      e += t;
    }
    if (r = q(this, G).peek(), !oo(r))
      break;
    q(this, G).next();
  } while (!0);
  return e;
}, /**
 * Reads in a string. Works for both JSON and JSON5.
 * @param {number} c The first character of the string (either " or ').
 * @returns {number} The length of the string.
 * @throws {UnexpectedChar} when the string cannot be read.
 * @throws {UnexpectedEOF} when EOF is reached before the string is finalized.
 */
Qs = function(r) {
  const e = r;
  let t = 1;
  for (r = q(this, G).peek(); r !== -1 && r !== e; ) {
    if (q(this, G).next(), t++, r === Kt)
      if (r = q(this, G).peek(), q(this, er).call(this, r) || q(this, tr).call(this, r))
        q(this, G).next(), t++;
      else if (r === to) {
        q(this, G).next(), t++;
        const n = ne(this, Z, Qr).call(this, 4);
        t += n.length;
      } else if (q(this, rr).call(this, r)) {
        q(this, G).next(), t++;
        const n = ne(this, Z, Qr).call(this, 2);
        t += n.length;
      } else q(this, $e) ? (q(this, G).next(), t++) : ne(this, Z, _e).call(this, r);
    r = q(this, G).peek();
  }
  return r === -1 && (q(this, G).next(), ne(this, Z, Gt).call(this)), q(this, G).next(), t++, t;
}, /**
 * Reads a number. Works for both JSON and JSON5.
 * @param {number} c The first character of the number.
 * @returns {number} The length of the number.
 * @throws {UnexpectedChar} when the number cannot be read.
 * @throws {UnexpectedEOF} when EOF is reached before the number is finalized.
 */
Zs = function(r) {
  let e = 1;
  if (r === zs || q(this, $e) && r === Ks) {
    if (r = q(this, G).peek(), q(this, $e) && (r === Hd || r === Ld)) {
      q(this, G).next();
      const t = ne(this, Z, Zr).call(this, r);
      return t !== Tf && t !== Nf && ne(this, Z, _e).call(this, r), e + t.length;
    }
    tt(r) || ne(this, Z, _e).call(this, r), q(this, G).next(), e++;
  }
  if (r === hi)
    if (r = q(this, G).peek(), q(this, $e) && (r === ro || r === Bd)) {
      q(this, G).next(), e++, r = q(this, G).peek(), Gn(r) || (q(this, G).next(), ne(this, Z, _e).call(this, r));
      do
        q(this, G).next(), e++, r = q(this, G).peek();
      while (Gn(r));
    } else tt(r) && ne(this, Z, _e).call(this, r);
  else if (!q(this, $e) || r !== Gs)
    for (kf(r) || ne(this, Z, _e).call(this, r), r = q(this, G).peek(); tt(r); )
      q(this, G).next(), e++, r = q(this, G).peek();
  if (r === Gs) {
    let t = -1;
    for (q(this, G).next(), e++, t++, r = q(this, G).peek(); tt(r); )
      q(this, G).next(), e++, t++, r = q(this, G).peek();
    !q(this, $e) && t === 0 && (q(this, G).next(), r ? ne(this, Z, _e).call(this, r) : ne(this, Z, Gt).call(this));
  }
  if (r === Nd || r === xd)
    for (q(this, G).next(), e++, r = q(this, G).peek(), (r === Ks || r === zs) && (q(this, G).next(), e++, r = q(this, G).peek()), r === -1 && (q(this, G).next(), ne(this, Z, Gt).call(this)), tt(r) || (q(this, G).next(), ne(this, Z, _e).call(this, r)); tt(r); )
      q(this, G).next(), e++, r = q(this, G).peek();
  return e;
}, /**
 * Reads a comment. Works for both JSON and JSON5.
 * @param {number} c The first character of the comment.
 * @returns {{length: number, multiline: boolean}} The length of the comment, and whether the comment is multi-line.
 * @throws {UnexpectedChar} when the comment cannot be read.
 * @throws {UnexpectedEOF} when EOF is reached before the comment is finalized.
 */
ei = function(r) {
  let e = 1;
  if (r = q(this, G).peek(), r === Ht) {
    do
      q(this, G).next(), e += 1, r = q(this, G).peek();
    while (r > -1 && r !== gi && r !== pi);
    return { length: e, multiline: !1 };
  }
  if (r === no) {
    for (q(this, G).next(), e += 1; r > -1; )
      if (r = q(this, G).peek(), r === no) {
        if (q(this, G).next(), e += 1, r = q(this, G).peek(), r === Ht)
          return q(this, G).next(), e += 1, { length: e, multiline: !0 };
      } else
        q(this, G).next(), e += 1;
    q(this, G).next(), ne(this, Z, Gt).call(this);
  }
  q(this, G).next(), ne(this, Z, _e).call(this, r);
}, Uu), xe = {
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
}, Lf = {
  mode: "json",
  ranges: !1,
  tokens: !1,
  allowTrailingCommas: !1
}, Bf = /\\u[\da-fA-F]{4}/gu;
function jf(r) {
  return r.replace(Bf, (e) => String.fromCharCode(parseInt(e.slice(2), 16)));
}
function Mf(r, e, t = !1) {
  let n = "", s = r.indexOf("\\"), i = 0;
  for (; s >= 0; ) {
    n += r.slice(i, s);
    const a = r.charAt(s + 1), o = a.charCodeAt(0);
    if (t && sn.has(o))
      n += sn.get(o), i = s + 2;
    else if (Yt.has(o))
      n += Yt.get(o), i = s + 2;
    else if (a === "u") {
      const u = r.slice(s + 2, s + 6);
      if (u.length < 4 || /[^0-9a-f]/i.test(u))
        throw new Et(
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
        throw new Et(
          `Invalid hex escape \\x${u}.`,
          {
            line: e.loc.start.line,
            column: e.loc.start.column + s,
            offset: e.loc.start.offset + s
          }
        );
      n += String.fromCharCode(parseInt(u, 16)), i = s + 4;
    } else if (t && Xs.has(o))
      i = s + 2, a === "\r" && r.charAt(i) === `
` && i++;
    else if (t)
      n += a, i = s + 2;
    else
      throw new Et(
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
function Uf(r, e, t = !1) {
  switch (e.type) {
    case "Boolean":
      return r === "true";
    case "Number":
      if (t) {
        if (r.charCodeAt(0) === 45)
          return -Number(r.slice(1));
        if (r.charCodeAt(0) === 43)
          return Number(r.slice(1));
      }
      return Number(r);
    case "String":
      return Mf(r.slice(1, -1), e, t);
    default:
      throw new TypeError(`Unknown token type "${e.type}.`);
  }
}
function Vf(r, e) {
  e = Object.freeze({
    ...Lf,
    ...e
  });
  const t = [], n = new qf(r, {
    mode: e.mode,
    ranges: e.ranges
  }), s = e.mode === "json5", i = e.allowTrailingCommas || s;
  function a() {
    const b = n.next();
    return b && e.tokens && t.push(n.token), b;
  }
  function o() {
    const b = n.next();
    return b && e.tokens && t.push(n.token), b >= he.LineComment ? o() : b;
  }
  const u = e.mode === "json" ? a : o;
  function d(b, C) {
    if (b !== C)
      throw new _t(n.token);
  }
  function l(b, C) {
    if (!C.includes(b))
      throw new _t(n.token);
  }
  function h(b, C) {
    return e.ranges ? {
      range: [b.offset, C.offset]
    } : void 0;
  }
  function y(b) {
    const C = n.token, _ = h(C.loc.start, C.loc.end), P = Uf(
      r.slice(C.loc.start.offset, C.loc.end.offset),
      C,
      s
    ), H = { loc: {
      start: {
        ...C.loc.start
      },
      end: {
        ...C.loc.end
      }
    }, ..._ };
    switch (b) {
      case he.String:
        return xe.string(
          /** @type {string} */
          P,
          H
        );
      case he.Number:
        return xe.number(
          /** @type {number} */
          P,
          H
        );
      case he.Boolean:
        return xe.boolean(
          /** @type {boolean} */
          P,
          H
        );
      default:
        throw new TypeError(`Unknown token type ${C.type}.`);
    }
  }
  function v(b) {
    const C = h(b.loc.start, b.loc.end), _ = r.slice(b.loc.start.offset, b.loc.end.offset), U = { loc: {
      start: {
        ...b.loc.start
      },
      end: {
        ...b.loc.end
      }
    }, ...C };
    if (b.type !== "Identifier") {
      let H = "";
      return (_[0] === "+" || _[0] === "-") && (H = _[0]), xe[_.includes("NaN") ? "nan" : "infinity"](
        /** @type {Sign} */
        H,
        U
      );
    }
    return xe.identifier(jf(_), U);
  }
  function A(b) {
    const C = h(b.loc.start, b.loc.end);
    return xe.null({
      loc: {
        start: {
          ...b.loc.start
        },
        end: {
          ...b.loc.end
        }
      },
      ...C
    });
  }
  function g(b) {
    s ? l(b, [he.String, he.Identifier, he.Number]) : d(b, he.String);
    const C = n.token;
    if (s && b === he.Number && /[+\-0-9]/.test(r[C.loc.start.offset]))
      throw new _t(C);
    let _ = b === he.String ? (
      /** @type {StringNode} */
      y(b)
    ) : (
      /** @type {IdentifierNode|NaNNode|InfinityNode} */
      v(C)
    );
    if (s && (_.type === "NaN" || _.type === "Infinity")) {
      if (_.sign !== "")
        throw new _t(n.token);
      _ = xe.identifier(_.type, { loc: _.loc, ...h(_.loc.start, _.loc.end) });
    }
    b = u(), d(b, he.Colon);
    const P = c(), U = h(_.loc.start, P.loc.end);
    return xe.member(
      /** @type {StringNode|IdentifierNode} */
      _,
      /** @type {ValueNode} */
      P,
      {
        loc: {
          start: {
            ..._.loc.start
          },
          end: {
            ...P.loc.end
          }
        },
        ...U
      }
    );
  }
  function p(b) {
    d(b, he.LBrace);
    const C = n.token, _ = [];
    let P = u();
    if (P !== he.RBrace)
      do {
        if (_.push(g(P)), P = u(), !P)
          throw new ml(_[_.length - 1].loc.end);
        if (P === he.Comma) {
          if (P = u(), i && P === he.RBrace)
            break;
        } else
          break;
      } while (P);
    d(P, he.RBrace);
    const U = n.token, H = h(C.loc.start, U.loc.end);
    return xe.object(_, {
      loc: {
        start: {
          ...C.loc.start
        },
        end: {
          ...U.loc.end
        }
      },
      ...H
    });
  }
  function f(b) {
    d(b, he.LBracket);
    const C = n.token, _ = [];
    let P = u();
    if (P !== he.RBracket)
      do {
        const te = c(P);
        if (_.push(xe.element(
          /** @type {ValueNode} */
          te,
          { loc: te.loc }
        )), P = u(), P === he.Comma) {
          if (P = u(), i && P === he.RBracket)
            break;
        } else
          break;
      } while (P);
    d(P, he.RBracket);
    const U = n.token, H = h(C.loc.start, U.loc.end);
    return xe.array(_, {
      loc: {
        start: {
          ...C.loc.start
        },
        end: {
          ...U.loc.end
        }
      },
      ...H
    });
  }
  function c(b) {
    b = b ?? u();
    const C = n.token;
    switch (b) {
      case he.String:
      case he.Boolean:
        return y(b);
      case he.Number:
        if (s) {
          let _ = r.slice(C.loc.start.offset, C.loc.end.offset);
          if ((_[0] === "+" || _[0] === "-") && (_ = _.slice(1)), _ === "NaN" || _ === "Infinity")
            return v(C);
        }
        return y(b);
      case he.Null:
        return A(C);
      case he.LBrace:
        return p(b);
      case he.LBracket:
        return f(b);
      default:
        throw new _t(C);
    }
  }
  const m = c();
  if (u())
    throw new _t(n.token);
  const w = {
    loc: {
      start: {
        line: 1,
        column: 1,
        offset: 0
      },
      end: {
        ...m.loc.end
      }
    }
  };
  return e.tokens && (w.tokens = t), e.ranges && (w.range = [
    w.loc.start.offset,
    w.loc.end.offset
  ]), xe.document(
    /** @type {ValueNode} */
    m,
    w
  );
}
var Hf = (r) => (e) => r === e, Gf = (r) => (e) => !r(e), zf = (r) => Object.values(r), Kf = (r) => r !== void 0, yi = (r) => (e) => e.keyword === r, Wf = yi("required"), Xf = yi("anyOf"), bl = yi("enum"), zt = (r) => r && r.errors ? r.errors.map(
  (e) => e.keyword === "errorMessage" ? { ...e.params.errors[0], message: e.message } : e
) : [], vl = (r) => r && zf(r.children) || [], Yf = (r) => (e) => vl(r).filter(Gf(Hf(e))), uo = (r) => (e) => e.reduce((t, n) => t.concat(n), r), lo = /\r\n|[\n\r\u2028\u2029]/;
function Jf(r, e) {
  const t = {
    ...r.start
  }, n = {
    ...t,
    ...r.end
  }, s = 2, i = 3, a = t.line, o = t.column, u = n.line, d = n.column, l = Math.max(a - (s + 1), 0), h = Math.min(e.length, u + i), y = u - a, v = {};
  if (y)
    for (let A = 0; A <= y; A++) {
      const g = A + a;
      if (!o)
        v[g] = !0;
      else if (A === 0) {
        const p = e[g - 1].length;
        v[g] = [o, p - o + 1];
      } else if (A === y)
        v[g] = [0, d];
      else {
        const p = e[g - A].length;
        v[g] = [0, p];
      }
    }
  else
    o === d ? o ? v[a] = [o, 0] : v[a] = !0 : v[a] = [o, d - o];
  return { start: l, end: h, markerLines: v };
}
function Qf(r, e, t = {}) {
  const n = r.split(lo), { start: s, end: i, markerLines: a } = Jf(e, n), o = String(i).length;
  return r.split(lo, i).slice(s, i).map((u, d) => {
    const l = s + 1 + d, y = ` ${` ${String(l)}`.slice(-o)} |`, v = a[l], A = !a[l + 1];
    if (v) {
      let g = "";
      if (Array.isArray(v)) {
        const p = u.slice(0, Math.max(v[0] - 1, 0)).replace(/[^\t]/g, " "), f = v[1] || 1;
        g = [
          `
 `,
          y.replace(/\d/g, " "),
          " ",
          p,
          "^".repeat(f)
        ].join(""), A && t.message && (g += " " + t.message);
      }
      return [
        ">",
        y,
        u.length > 0 ? ` ${u}` : "",
        g
      ].join("");
    } else
      return [" ", y, u.length > 0 ? ` ${u}` : ""].join("");
  }).join(`
`);
}
var El = (r) => r.split("/").slice(1).map((e) => e.split("~1").join("/").split("~0").join("~"));
function Zf(r, e, t) {
  const n = El(e), s = n.length - 1;
  return n.reduce((i, a, o) => {
    switch (i.type) {
      case "Object": {
        const u = i.members.filter(
          (h) => h.name.value === a
        );
        if (u.length !== 1)
          throw new Error(`Couldn't find property ${a} of ${e}`);
        const { name: d, value: l } = u[0];
        return t && o === s ? d : l;
      }
      case "Array":
        return i.elements[a].value;
      default:
        console.log(i);
    }
  }, r.body);
}
function eh(r, e) {
  let t = "";
  return El(e).reduce((n, s) => {
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
        return t += `/${s}${th(n.elements[s])}`, n.elements[s];
      default:
        console.log(n);
    }
  }, r.body), t;
}
function th(r) {
  if (!r || !r.elements)
    return "";
  const e = r.elements.filter(
    (t) => t && t.name && t.name.value === "type"
  );
  return e.length && e[0].value && `:${e[0].value.value}` || "";
}
var gn = class {
  constructor(r = { isIdentifierLocation: !1 }, { data: e, schema: t, jsonAst: n, jsonRaw: s }) {
    this.options = r, this.data = e, this.schema = t, this.jsonAst = n, this.jsonRaw = s;
  }
  getLocation(r = this.instancePath) {
    const { isIdentifierLocation: e, isSkipEndLocation: t } = this.options, { loc: n } = Zf(
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
    return eh(this.jsonAst, r);
  }
  getCodeFrame(r, e = this.instancePath) {
    return Qf(this.jsonRaw, this.getLocation(e), {
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
}, rh = mn("REQUIRED"), nh = class extends gn {
  getLocation(r = this.instancePath) {
    const { start: e } = super.getLocation(r);
    return { start: e };
  }
  print() {
    const { message: r, params: e } = this.options;
    return [`${Xt(`${rh} ${r}`)}
`].concat(
      this.getCodeFrame(`${pn(e.missingProperty)} is missing here!`)
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
}, sh = mn("ADDITIONAL PROPERTY"), ih = class extends gn {
  constructor(...r) {
    super(...r), this.options.isIdentifierLocation = !0;
  }
  print() {
    const { message: r, params: e } = this.options;
    return [`${Xt(`${sh} ${r}`)}
`].concat(
      this.getCodeFrame(
        `${pn(e.additionalProperty)} is not expected to be here!`,
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
}, ah = il(_d()), oh = il(Sd()), uh = mn("ENUM"), co = class extends gn {
  print() {
    const {
      message: r,
      params: { allowedValues: e }
    } = this.options, t = this.findBestMatch(), n = Xt(`${uh} ${r}`), s = Xt(`(${e.join(", ")})`);
    return [n, `${s}
`].concat(
      this.getCodeFrame(
        t !== null ? `Did you mean ${pn(t)} here?` : "Unexpected value, should be equal to one of the allowed values"
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
    } = this.options, e = this.instancePath === "" ? this.data : oh.default.get(this.data, this.instancePath);
    if (!e)
      return null;
    const t = r.map((n) => ({
      value: n,
      weight: (0, ah.default)(n, e.toString())
    })).sort(
      (n, s) => n.weight > s.weight ? 1 : n.weight < s.weight ? -1 : 0
    )[0];
    return r.length === 1 || t.weight < t.value.length ? t.value : null;
  }
}, lh = class extends gn {
  print() {
    const { keyword: r, message: e } = this.options;
    return [`${Xt(`${mn(r.toUpperCase())} ${e}`)}
`].concat(this.getCodeFrame(`${pn(r)} ${e}`));
  }
  getError() {
    const { keyword: r, message: e } = this.options;
    return {
      ...this.getLocation(),
      error: `${this.getDecoratedPath()}: ${r} ${e}`,
      path: this.instancePath
    };
  }
}, ch = /\/[\w_-]+(\/\d+)?/g;
function dh(r = []) {
  const e = { children: {} };
  return r.forEach((t) => {
    const n = typeof t.instancePath < "u" ? t.instancePath : t.dataPath, s = n === "" ? [""] : n.match(ch);
    s && s.reduce((i, a, o) => (i.children[a] = i.children[a] || { children: {}, errors: [] }, o === s.length - 1 && i.children[a].errors.push(t), i.children[a]), e);
  }), e;
}
function Dl(r, e, t) {
  zt(r).forEach((n) => {
    Wf(n) && (r.errors = [n], r.children = {});
  }), zt(r).some(Xf) && Object.keys(r.children).length > 0 && delete r.errors, r.errors && r.errors.length && zt(r).every(bl) && Yf(e)(r).filter(Kf).some(zt) && delete e.children[t], Object.entries(r.children).forEach(
    ([n, s]) => Dl(s, r, n)
  );
}
function wl(r, e) {
  const t = zt(r);
  if (t.length && t.every(bl)) {
    const s = [...new Set(
      uo([])(t.map((a) => a.params.allowedValues))
    )], i = t[0];
    return [
      new co(
        {
          ...i,
          params: { allowedValues: s }
        },
        e
      )
    ];
  } else
    return uo(
      t.reduce((n, s) => {
        switch (s.keyword) {
          case "additionalProperties":
            return n.concat(
              new ih(s, e)
            );
          case "enum":
            return n.concat(new co(s, e));
          case "required":
            return n.concat(new nh(s, e));
          default:
            return n.concat(new lh(s, e));
        }
      }, [])
    )(vl(r).map((n) => wl(n, e)));
}
var fh = (r, e) => {
  const t = dh(r || []);
  return Dl(t), wl(t, e);
}, hh = (r, e, t, n = {}) => {
  const { format: s = "cli", indent: i = null, json: a = null } = n, o = a || JSON.stringify(e, null, i), u = Vf(o), d = (y) => y.print().join(`
`), l = (y) => y.getError(), h = fh(t, {
    data: e,
    schema: r,
    jsonAst: u,
    jsonRaw: o
  });
  return s === "cli" ? h.map(d).join(`

`) : h.map(l);
};
let mh, ph, gh, yh;
typeof process < "u" && ({ FORCE_COLOR: mh, NODE_DISABLE_COLORS: ph, NO_COLOR: gh, TERM: yh } = process.env || {}, process.stdout && process.stdout.isTTY);
var Gr = { exports: {} }, zn, fo;
function yn() {
  if (fo) return zn;
  fo = 1;
  const r = "2.0.0", e = 256, t = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, n = 16, s = e - 6;
  return zn = {
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
  }, zn;
}
var Kn, ho;
function bn() {
  return ho || (ho = 1, Kn = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
  }), Kn;
}
var mo;
function sr() {
  return mo || (mo = 1, function(r, e) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: t,
      MAX_SAFE_BUILD_LENGTH: n,
      MAX_LENGTH: s
    } = yn(), i = bn();
    e = r.exports = {};
    const a = e.re = [], o = e.safeRe = [], u = e.src = [], d = e.safeSrc = [], l = e.t = {};
    let h = 0;
    const y = "[a-zA-Z0-9-]", v = [
      ["\\s", 1],
      ["\\d", s],
      [y, n]
    ], A = (p) => {
      for (const [f, c] of v)
        p = p.split(`${f}*`).join(`${f}{0,${c}}`).split(`${f}+`).join(`${f}{1,${c}}`);
      return p;
    }, g = (p, f, c) => {
      const m = A(f), D = h++;
      i(p, D, f), l[p] = D, u[D] = f, d[D] = m, a[D] = new RegExp(f, c ? "g" : void 0), o[D] = new RegExp(m, c ? "g" : void 0);
    };
    g("NUMERICIDENTIFIER", "0|[1-9]\\d*"), g("NUMERICIDENTIFIERLOOSE", "\\d+"), g("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${y}*`), g("MAINVERSION", `(${u[l.NUMERICIDENTIFIER]})\\.(${u[l.NUMERICIDENTIFIER]})\\.(${u[l.NUMERICIDENTIFIER]})`), g("MAINVERSIONLOOSE", `(${u[l.NUMERICIDENTIFIERLOOSE]})\\.(${u[l.NUMERICIDENTIFIERLOOSE]})\\.(${u[l.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASEIDENTIFIER", `(?:${u[l.NUMERICIDENTIFIER]}|${u[l.NONNUMERICIDENTIFIER]})`), g("PRERELEASEIDENTIFIERLOOSE", `(?:${u[l.NUMERICIDENTIFIERLOOSE]}|${u[l.NONNUMERICIDENTIFIER]})`), g("PRERELEASE", `(?:-(${u[l.PRERELEASEIDENTIFIER]}(?:\\.${u[l.PRERELEASEIDENTIFIER]})*))`), g("PRERELEASELOOSE", `(?:-?(${u[l.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${u[l.PRERELEASEIDENTIFIERLOOSE]})*))`), g("BUILDIDENTIFIER", `${y}+`), g("BUILD", `(?:\\+(${u[l.BUILDIDENTIFIER]}(?:\\.${u[l.BUILDIDENTIFIER]})*))`), g("FULLPLAIN", `v?${u[l.MAINVERSION]}${u[l.PRERELEASE]}?${u[l.BUILD]}?`), g("FULL", `^${u[l.FULLPLAIN]}$`), g("LOOSEPLAIN", `[v=\\s]*${u[l.MAINVERSIONLOOSE]}${u[l.PRERELEASELOOSE]}?${u[l.BUILD]}?`), g("LOOSE", `^${u[l.LOOSEPLAIN]}$`), g("GTLT", "((?:<|>)?=?)"), g("XRANGEIDENTIFIERLOOSE", `${u[l.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), g("XRANGEIDENTIFIER", `${u[l.NUMERICIDENTIFIER]}|x|X|\\*`), g("XRANGEPLAIN", `[v=\\s]*(${u[l.XRANGEIDENTIFIER]})(?:\\.(${u[l.XRANGEIDENTIFIER]})(?:\\.(${u[l.XRANGEIDENTIFIER]})(?:${u[l.PRERELEASE]})?${u[l.BUILD]}?)?)?`), g("XRANGEPLAINLOOSE", `[v=\\s]*(${u[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${u[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${u[l.XRANGEIDENTIFIERLOOSE]})(?:${u[l.PRERELEASELOOSE]})?${u[l.BUILD]}?)?)?`), g("XRANGE", `^${u[l.GTLT]}\\s*${u[l.XRANGEPLAIN]}$`), g("XRANGELOOSE", `^${u[l.GTLT]}\\s*${u[l.XRANGEPLAINLOOSE]}$`), g("COERCEPLAIN", `(^|[^\\d])(\\d{1,${t}})(?:\\.(\\d{1,${t}}))?(?:\\.(\\d{1,${t}}))?`), g("COERCE", `${u[l.COERCEPLAIN]}(?:$|[^\\d])`), g("COERCEFULL", u[l.COERCEPLAIN] + `(?:${u[l.PRERELEASE]})?(?:${u[l.BUILD]})?(?:$|[^\\d])`), g("COERCERTL", u[l.COERCE], !0), g("COERCERTLFULL", u[l.COERCEFULL], !0), g("LONETILDE", "(?:~>?)"), g("TILDETRIM", `(\\s*)${u[l.LONETILDE]}\\s+`, !0), e.tildeTrimReplace = "$1~", g("TILDE", `^${u[l.LONETILDE]}${u[l.XRANGEPLAIN]}$`), g("TILDELOOSE", `^${u[l.LONETILDE]}${u[l.XRANGEPLAINLOOSE]}$`), g("LONECARET", "(?:\\^)"), g("CARETTRIM", `(\\s*)${u[l.LONECARET]}\\s+`, !0), e.caretTrimReplace = "$1^", g("CARET", `^${u[l.LONECARET]}${u[l.XRANGEPLAIN]}$`), g("CARETLOOSE", `^${u[l.LONECARET]}${u[l.XRANGEPLAINLOOSE]}$`), g("COMPARATORLOOSE", `^${u[l.GTLT]}\\s*(${u[l.LOOSEPLAIN]})$|^$`), g("COMPARATOR", `^${u[l.GTLT]}\\s*(${u[l.FULLPLAIN]})$|^$`), g("COMPARATORTRIM", `(\\s*)${u[l.GTLT]}\\s*(${u[l.LOOSEPLAIN]}|${u[l.XRANGEPLAIN]})`, !0), e.comparatorTrimReplace = "$1$2$3", g("HYPHENRANGE", `^\\s*(${u[l.XRANGEPLAIN]})\\s+-\\s+(${u[l.XRANGEPLAIN]})\\s*$`), g("HYPHENRANGELOOSE", `^\\s*(${u[l.XRANGEPLAINLOOSE]})\\s+-\\s+(${u[l.XRANGEPLAINLOOSE]})\\s*$`), g("STAR", "(<|>)?=?\\s*\\*"), g("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), g("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }(Gr, Gr.exports)), Gr.exports;
}
var Wn, po;
function bi() {
  if (po) return Wn;
  po = 1;
  const r = Object.freeze({ loose: !0 }), e = Object.freeze({});
  return Wn = (n) => n ? typeof n != "object" ? r : n : e, Wn;
}
var Xn, go;
function Al() {
  if (go) return Xn;
  go = 1;
  const r = /^[0-9]+$/, e = (n, s) => {
    const i = r.test(n), a = r.test(s);
    return i && a && (n = +n, s = +s), n === s ? 0 : i && !a ? -1 : a && !i ? 1 : n < s ? -1 : 1;
  };
  return Xn = {
    compareIdentifiers: e,
    rcompareIdentifiers: (n, s) => e(s, n)
  }, Xn;
}
var Yn, yo;
function Te() {
  if (yo) return Yn;
  yo = 1;
  const r = bn(), { MAX_LENGTH: e, MAX_SAFE_INTEGER: t } = yn(), { safeRe: n, safeSrc: s, t: i } = sr(), a = bi(), { compareIdentifiers: o } = Al();
  class u {
    constructor(l, h) {
      if (h = a(h), l instanceof u) {
        if (l.loose === !!h.loose && l.includePrerelease === !!h.includePrerelease)
          return l;
        l = l.version;
      } else if (typeof l != "string")
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof l}".`);
      if (l.length > e)
        throw new TypeError(
          `version is longer than ${e} characters`
        );
      r("SemVer", l, h), this.options = h, this.loose = !!h.loose, this.includePrerelease = !!h.includePrerelease;
      const y = l.trim().match(h.loose ? n[i.LOOSE] : n[i.FULL]);
      if (!y)
        throw new TypeError(`Invalid Version: ${l}`);
      if (this.raw = l, this.major = +y[1], this.minor = +y[2], this.patch = +y[3], this.major > t || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > t || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > t || this.patch < 0)
        throw new TypeError("Invalid patch version");
      y[4] ? this.prerelease = y[4].split(".").map((v) => {
        if (/^[0-9]+$/.test(v)) {
          const A = +v;
          if (A >= 0 && A < t)
            return A;
        }
        return v;
      }) : this.prerelease = [], this.build = y[5] ? y[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(l) {
      if (r("SemVer.compare", this.version, this.options, l), !(l instanceof u)) {
        if (typeof l == "string" && l === this.version)
          return 0;
        l = new u(l, this.options);
      }
      return l.version === this.version ? 0 : this.compareMain(l) || this.comparePre(l);
    }
    compareMain(l) {
      return l instanceof u || (l = new u(l, this.options)), o(this.major, l.major) || o(this.minor, l.minor) || o(this.patch, l.patch);
    }
    comparePre(l) {
      if (l instanceof u || (l = new u(l, this.options)), this.prerelease.length && !l.prerelease.length)
        return -1;
      if (!this.prerelease.length && l.prerelease.length)
        return 1;
      if (!this.prerelease.length && !l.prerelease.length)
        return 0;
      let h = 0;
      do {
        const y = this.prerelease[h], v = l.prerelease[h];
        if (r("prerelease compare", h, y, v), y === void 0 && v === void 0)
          return 0;
        if (v === void 0)
          return 1;
        if (y === void 0)
          return -1;
        if (y === v)
          continue;
        return o(y, v);
      } while (++h);
    }
    compareBuild(l) {
      l instanceof u || (l = new u(l, this.options));
      let h = 0;
      do {
        const y = this.build[h], v = l.build[h];
        if (r("build compare", h, y, v), y === void 0 && v === void 0)
          return 0;
        if (v === void 0)
          return 1;
        if (y === void 0)
          return -1;
        if (y === v)
          continue;
        return o(y, v);
      } while (++h);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(l, h, y) {
      if (l.startsWith("pre")) {
        if (!h && y === !1)
          throw new Error("invalid increment argument: identifier is empty");
        if (h) {
          const v = new RegExp(`^${this.options.loose ? s[i.PRERELEASELOOSE] : s[i.PRERELEASE]}$`), A = `-${h}`.match(v);
          if (!A || A[1] !== h)
            throw new Error(`invalid identifier: ${h}`);
        }
      }
      switch (l) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", h, y);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", h, y);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", h, y), this.inc("pre", h, y);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", h, y), this.inc("pre", h, y);
          break;
        case "release":
          if (this.prerelease.length === 0)
            throw new Error(`version ${this.raw} is not a prerelease`);
          this.prerelease.length = 0;
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
          const v = Number(y) ? 1 : 0;
          if (this.prerelease.length === 0)
            this.prerelease = [v];
          else {
            let A = this.prerelease.length;
            for (; --A >= 0; )
              typeof this.prerelease[A] == "number" && (this.prerelease[A]++, A = -2);
            if (A === -1) {
              if (h === this.prerelease.join(".") && y === !1)
                throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(v);
            }
          }
          if (h) {
            let A = [h, v];
            y === !1 && (A = [h]), o(this.prerelease[0], h) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = A) : this.prerelease = A;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${l}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return Yn = u, Yn;
}
var Jn, bo;
function kt() {
  if (bo) return Jn;
  bo = 1;
  const r = Te();
  return Jn = (t, n, s = !1) => {
    if (t instanceof r)
      return t;
    try {
      return new r(t, n);
    } catch (i) {
      if (!s)
        return null;
      throw i;
    }
  }, Jn;
}
var Qn, vo;
function bh() {
  if (vo) return Qn;
  vo = 1;
  const r = kt();
  return Qn = (t, n) => {
    const s = r(t, n);
    return s ? s.version : null;
  }, Qn;
}
var Zn, Eo;
function vh() {
  if (Eo) return Zn;
  Eo = 1;
  const r = kt();
  return Zn = (t, n) => {
    const s = r(t.trim().replace(/^[=v]+/, ""), n);
    return s ? s.version : null;
  }, Zn;
}
var es, Do;
function Eh() {
  if (Do) return es;
  Do = 1;
  const r = Te();
  return es = (t, n, s, i, a) => {
    typeof s == "string" && (a = i, i = s, s = void 0);
    try {
      return new r(
        t instanceof r ? t.version : t,
        s
      ).inc(n, i, a).version;
    } catch {
      return null;
    }
  }, es;
}
var ts, wo;
function Dh() {
  if (wo) return ts;
  wo = 1;
  const r = kt();
  return ts = (t, n) => {
    const s = r(t, null, !0), i = r(n, null, !0), a = s.compare(i);
    if (a === 0)
      return null;
    const o = a > 0, u = o ? s : i, d = o ? i : s, l = !!u.prerelease.length;
    if (!!d.prerelease.length && !l) {
      if (!d.patch && !d.minor)
        return "major";
      if (d.compareMain(u) === 0)
        return d.minor && !d.patch ? "minor" : "patch";
    }
    const y = l ? "pre" : "";
    return s.major !== i.major ? y + "major" : s.minor !== i.minor ? y + "minor" : s.patch !== i.patch ? y + "patch" : "prerelease";
  }, ts;
}
var rs, Ao;
function wh() {
  if (Ao) return rs;
  Ao = 1;
  const r = Te();
  return rs = (t, n) => new r(t, n).major, rs;
}
var ns, Co;
function Ah() {
  if (Co) return ns;
  Co = 1;
  const r = Te();
  return ns = (t, n) => new r(t, n).minor, ns;
}
var ss, $o;
function Ch() {
  if ($o) return ss;
  $o = 1;
  const r = Te();
  return ss = (t, n) => new r(t, n).patch, ss;
}
var is, _o;
function $h() {
  if (_o) return is;
  _o = 1;
  const r = kt();
  return is = (t, n) => {
    const s = r(t, n);
    return s && s.prerelease.length ? s.prerelease : null;
  }, is;
}
var as, So;
function Ke() {
  if (So) return as;
  So = 1;
  const r = Te();
  return as = (t, n, s) => new r(t, s).compare(new r(n, s)), as;
}
var os, Ro;
function _h() {
  if (Ro) return os;
  Ro = 1;
  const r = Ke();
  return os = (t, n, s) => r(n, t, s), os;
}
var us, To;
function Sh() {
  if (To) return us;
  To = 1;
  const r = Ke();
  return us = (t, n) => r(t, n, !0), us;
}
var ls, No;
function vi() {
  if (No) return ls;
  No = 1;
  const r = Te();
  return ls = (t, n, s) => {
    const i = new r(t, s), a = new r(n, s);
    return i.compare(a) || i.compareBuild(a);
  }, ls;
}
var cs, Fo;
function Rh() {
  if (Fo) return cs;
  Fo = 1;
  const r = vi();
  return cs = (t, n) => t.sort((s, i) => r(s, i, n)), cs;
}
var ds, Po;
function Th() {
  if (Po) return ds;
  Po = 1;
  const r = vi();
  return ds = (t, n) => t.sort((s, i) => r(i, s, n)), ds;
}
var fs, Io;
function vn() {
  if (Io) return fs;
  Io = 1;
  const r = Ke();
  return fs = (t, n, s) => r(t, n, s) > 0, fs;
}
var hs, ko;
function Ei() {
  if (ko) return hs;
  ko = 1;
  const r = Ke();
  return hs = (t, n, s) => r(t, n, s) < 0, hs;
}
var ms, Oo;
function Cl() {
  if (Oo) return ms;
  Oo = 1;
  const r = Ke();
  return ms = (t, n, s) => r(t, n, s) === 0, ms;
}
var ps, xo;
function $l() {
  if (xo) return ps;
  xo = 1;
  const r = Ke();
  return ps = (t, n, s) => r(t, n, s) !== 0, ps;
}
var gs, qo;
function Di() {
  if (qo) return gs;
  qo = 1;
  const r = Ke();
  return gs = (t, n, s) => r(t, n, s) >= 0, gs;
}
var ys, Lo;
function wi() {
  if (Lo) return ys;
  Lo = 1;
  const r = Ke();
  return ys = (t, n, s) => r(t, n, s) <= 0, ys;
}
var bs, Bo;
function _l() {
  if (Bo) return bs;
  Bo = 1;
  const r = Cl(), e = $l(), t = vn(), n = Di(), s = Ei(), i = wi();
  return bs = (o, u, d, l) => {
    switch (u) {
      case "===":
        return typeof o == "object" && (o = o.version), typeof d == "object" && (d = d.version), o === d;
      case "!==":
        return typeof o == "object" && (o = o.version), typeof d == "object" && (d = d.version), o !== d;
      case "":
      case "=":
      case "==":
        return r(o, d, l);
      case "!=":
        return e(o, d, l);
      case ">":
        return t(o, d, l);
      case ">=":
        return n(o, d, l);
      case "<":
        return s(o, d, l);
      case "<=":
        return i(o, d, l);
      default:
        throw new TypeError(`Invalid operator: ${u}`);
    }
  }, bs;
}
var vs, jo;
function Nh() {
  if (jo) return vs;
  jo = 1;
  const r = Te(), e = kt(), { safeRe: t, t: n } = sr();
  return vs = (i, a) => {
    if (i instanceof r)
      return i;
    if (typeof i == "number" && (i = String(i)), typeof i != "string")
      return null;
    a = a || {};
    let o = null;
    if (!a.rtl)
      o = i.match(a.includePrerelease ? t[n.COERCEFULL] : t[n.COERCE]);
    else {
      const v = a.includePrerelease ? t[n.COERCERTLFULL] : t[n.COERCERTL];
      let A;
      for (; (A = v.exec(i)) && (!o || o.index + o[0].length !== i.length); )
        (!o || A.index + A[0].length !== o.index + o[0].length) && (o = A), v.lastIndex = A.index + A[1].length + A[2].length;
      v.lastIndex = -1;
    }
    if (o === null)
      return null;
    const u = o[2], d = o[3] || "0", l = o[4] || "0", h = a.includePrerelease && o[5] ? `-${o[5]}` : "", y = a.includePrerelease && o[6] ? `+${o[6]}` : "";
    return e(`${u}.${d}.${l}${h}${y}`, a);
  }, vs;
}
var Es, Mo;
function Fh() {
  if (Mo) return Es;
  Mo = 1;
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
  return Es = r, Es;
}
var Ds, Uo;
function We() {
  if (Uo) return Ds;
  Uo = 1;
  const r = /\s+/g;
  class e {
    constructor(B, W) {
      if (W = s(W), B instanceof e)
        return B.loose === !!W.loose && B.includePrerelease === !!W.includePrerelease ? B : new e(B.raw, W);
      if (B instanceof i)
        return this.raw = B.value, this.set = [[B]], this.formatted = void 0, this;
      if (this.options = W, this.loose = !!W.loose, this.includePrerelease = !!W.includePrerelease, this.raw = B.trim().replace(r, " "), this.set = this.raw.split("||").map((z) => this.parseRange(z.trim())).filter((z) => z.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const z = this.set[0];
        if (this.set = this.set.filter((V) => !g(V[0])), this.set.length === 0)
          this.set = [z];
        else if (this.set.length > 1) {
          for (const V of this.set)
            if (V.length === 1 && p(V[0])) {
              this.set = [V];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let B = 0; B < this.set.length; B++) {
          B > 0 && (this.formatted += "||");
          const W = this.set[B];
          for (let z = 0; z < W.length; z++)
            z > 0 && (this.formatted += " "), this.formatted += W[z].toString().trim();
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
    parseRange(B) {
      const z = ((this.options.includePrerelease && v) | (this.options.loose && A)) + ":" + B, V = n.get(z);
      if (V)
        return V;
      const K = this.options.loose, I = K ? u[d.HYPHENRANGELOOSE] : u[d.HYPHENRANGE];
      B = B.replace(I, te(this.options.includePrerelease)), a("hyphen replace", B), B = B.replace(u[d.COMPARATORTRIM], l), a("comparator trim", B), B = B.replace(u[d.TILDETRIM], h), a("tilde trim", B), B = B.replace(u[d.CARETTRIM], y), a("caret trim", B);
      let S = B.split(" ").map(($) => c($, this.options)).join(" ").split(/\s+/).map(($) => H($, this.options));
      K && (S = S.filter(($) => (a("loose invalid filter", $, this.options), !!$.match(u[d.COMPARATORLOOSE])))), a("range list", S);
      const F = /* @__PURE__ */ new Map(), T = S.map(($) => new i($, this.options));
      for (const $ of T) {
        if (g($))
          return [$];
        F.set($.value, $);
      }
      F.size > 1 && F.has("") && F.delete("");
      const E = [...F.values()];
      return n.set(z, E), E;
    }
    intersects(B, W) {
      if (!(B instanceof e))
        throw new TypeError("a Range is required");
      return this.set.some((z) => f(z, W) && B.set.some((V) => f(V, W) && z.every((K) => V.every((I) => K.intersects(I, W)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(B) {
      if (!B)
        return !1;
      if (typeof B == "string")
        try {
          B = new o(B, this.options);
        } catch {
          return !1;
        }
      for (let W = 0; W < this.set.length; W++)
        if (ee(this.set[W], B, this.options))
          return !0;
      return !1;
    }
  }
  Ds = e;
  const t = Fh(), n = new t(), s = bi(), i = En(), a = bn(), o = Te(), {
    safeRe: u,
    t: d,
    comparatorTrimReplace: l,
    tildeTrimReplace: h,
    caretTrimReplace: y
  } = sr(), { FLAG_INCLUDE_PRERELEASE: v, FLAG_LOOSE: A } = yn(), g = (L) => L.value === "<0.0.0-0", p = (L) => L.value === "", f = (L, B) => {
    let W = !0;
    const z = L.slice();
    let V = z.pop();
    for (; W && z.length; )
      W = z.every((K) => V.intersects(K, B)), V = z.pop();
    return W;
  }, c = (L, B) => (a("comp", L, B), L = b(L, B), a("caret", L), L = D(L, B), a("tildes", L), L = _(L, B), a("xrange", L), L = U(L, B), a("stars", L), L), m = (L) => !L || L.toLowerCase() === "x" || L === "*", D = (L, B) => L.trim().split(/\s+/).map((W) => w(W, B)).join(" "), w = (L, B) => {
    const W = B.loose ? u[d.TILDELOOSE] : u[d.TILDE];
    return L.replace(W, (z, V, K, I, S) => {
      a("tilde", L, z, V, K, I, S);
      let F;
      return m(V) ? F = "" : m(K) ? F = `>=${V}.0.0 <${+V + 1}.0.0-0` : m(I) ? F = `>=${V}.${K}.0 <${V}.${+K + 1}.0-0` : S ? (a("replaceTilde pr", S), F = `>=${V}.${K}.${I}-${S} <${V}.${+K + 1}.0-0`) : F = `>=${V}.${K}.${I} <${V}.${+K + 1}.0-0`, a("tilde return", F), F;
    });
  }, b = (L, B) => L.trim().split(/\s+/).map((W) => C(W, B)).join(" "), C = (L, B) => {
    a("caret", L, B);
    const W = B.loose ? u[d.CARETLOOSE] : u[d.CARET], z = B.includePrerelease ? "-0" : "";
    return L.replace(W, (V, K, I, S, F) => {
      a("caret", L, V, K, I, S, F);
      let T;
      return m(K) ? T = "" : m(I) ? T = `>=${K}.0.0${z} <${+K + 1}.0.0-0` : m(S) ? K === "0" ? T = `>=${K}.${I}.0${z} <${K}.${+I + 1}.0-0` : T = `>=${K}.${I}.0${z} <${+K + 1}.0.0-0` : F ? (a("replaceCaret pr", F), K === "0" ? I === "0" ? T = `>=${K}.${I}.${S}-${F} <${K}.${I}.${+S + 1}-0` : T = `>=${K}.${I}.${S}-${F} <${K}.${+I + 1}.0-0` : T = `>=${K}.${I}.${S}-${F} <${+K + 1}.0.0-0`) : (a("no pr"), K === "0" ? I === "0" ? T = `>=${K}.${I}.${S}${z} <${K}.${I}.${+S + 1}-0` : T = `>=${K}.${I}.${S}${z} <${K}.${+I + 1}.0-0` : T = `>=${K}.${I}.${S} <${+K + 1}.0.0-0`), a("caret return", T), T;
    });
  }, _ = (L, B) => (a("replaceXRanges", L, B), L.split(/\s+/).map((W) => P(W, B)).join(" ")), P = (L, B) => {
    L = L.trim();
    const W = B.loose ? u[d.XRANGELOOSE] : u[d.XRANGE];
    return L.replace(W, (z, V, K, I, S, F) => {
      a("xRange", L, z, V, K, I, S, F);
      const T = m(K), E = T || m(I), $ = E || m(S), k = $;
      return V === "=" && k && (V = ""), F = B.includePrerelease ? "-0" : "", T ? V === ">" || V === "<" ? z = "<0.0.0-0" : z = "*" : V && k ? (E && (I = 0), S = 0, V === ">" ? (V = ">=", E ? (K = +K + 1, I = 0, S = 0) : (I = +I + 1, S = 0)) : V === "<=" && (V = "<", E ? K = +K + 1 : I = +I + 1), V === "<" && (F = "-0"), z = `${V + K}.${I}.${S}${F}`) : E ? z = `>=${K}.0.0${F} <${+K + 1}.0.0-0` : $ && (z = `>=${K}.${I}.0${F} <${K}.${+I + 1}.0-0`), a("xRange return", z), z;
    });
  }, U = (L, B) => (a("replaceStars", L, B), L.trim().replace(u[d.STAR], "")), H = (L, B) => (a("replaceGTE0", L, B), L.trim().replace(u[B.includePrerelease ? d.GTE0PRE : d.GTE0], "")), te = (L) => (B, W, z, V, K, I, S, F, T, E, $, k) => (m(z) ? W = "" : m(V) ? W = `>=${z}.0.0${L ? "-0" : ""}` : m(K) ? W = `>=${z}.${V}.0${L ? "-0" : ""}` : I ? W = `>=${W}` : W = `>=${W}${L ? "-0" : ""}`, m(T) ? F = "" : m(E) ? F = `<${+T + 1}.0.0-0` : m($) ? F = `<${T}.${+E + 1}.0-0` : k ? F = `<=${T}.${E}.${$}-${k}` : L ? F = `<${T}.${E}.${+$ + 1}-0` : F = `<=${F}`, `${W} ${F}`.trim()), ee = (L, B, W) => {
    for (let z = 0; z < L.length; z++)
      if (!L[z].test(B))
        return !1;
    if (B.prerelease.length && !W.includePrerelease) {
      for (let z = 0; z < L.length; z++)
        if (a(L[z].semver), L[z].semver !== i.ANY && L[z].semver.prerelease.length > 0) {
          const V = L[z].semver;
          if (V.major === B.major && V.minor === B.minor && V.patch === B.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Ds;
}
var ws, Vo;
function En() {
  if (Vo) return ws;
  Vo = 1;
  const r = Symbol("SemVer ANY");
  class e {
    static get ANY() {
      return r;
    }
    constructor(l, h) {
      if (h = t(h), l instanceof e) {
        if (l.loose === !!h.loose)
          return l;
        l = l.value;
      }
      l = l.trim().split(/\s+/).join(" "), a("comparator", l, h), this.options = h, this.loose = !!h.loose, this.parse(l), this.semver === r ? this.value = "" : this.value = this.operator + this.semver.version, a("comp", this);
    }
    parse(l) {
      const h = this.options.loose ? n[s.COMPARATORLOOSE] : n[s.COMPARATOR], y = l.match(h);
      if (!y)
        throw new TypeError(`Invalid comparator: ${l}`);
      this.operator = y[1] !== void 0 ? y[1] : "", this.operator === "=" && (this.operator = ""), y[2] ? this.semver = new o(y[2], this.options.loose) : this.semver = r;
    }
    toString() {
      return this.value;
    }
    test(l) {
      if (a("Comparator.test", l, this.options.loose), this.semver === r || l === r)
        return !0;
      if (typeof l == "string")
        try {
          l = new o(l, this.options);
        } catch {
          return !1;
        }
      return i(l, this.operator, this.semver, this.options);
    }
    intersects(l, h) {
      if (!(l instanceof e))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new u(l.value, h).test(this.value) : l.operator === "" ? l.value === "" ? !0 : new u(this.value, h).test(l.semver) : (h = t(h), h.includePrerelease && (this.value === "<0.0.0-0" || l.value === "<0.0.0-0") || !h.includePrerelease && (this.value.startsWith("<0.0.0") || l.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && l.operator.startsWith(">") || this.operator.startsWith("<") && l.operator.startsWith("<") || this.semver.version === l.semver.version && this.operator.includes("=") && l.operator.includes("=") || i(this.semver, "<", l.semver, h) && this.operator.startsWith(">") && l.operator.startsWith("<") || i(this.semver, ">", l.semver, h) && this.operator.startsWith("<") && l.operator.startsWith(">")));
    }
  }
  ws = e;
  const t = bi(), { safeRe: n, t: s } = sr(), i = _l(), a = bn(), o = Te(), u = We();
  return ws;
}
var As, Ho;
function Dn() {
  if (Ho) return As;
  Ho = 1;
  const r = We();
  return As = (t, n, s) => {
    try {
      n = new r(n, s);
    } catch {
      return !1;
    }
    return n.test(t);
  }, As;
}
var Cs, Go;
function Ph() {
  if (Go) return Cs;
  Go = 1;
  const r = We();
  return Cs = (t, n) => new r(t, n).set.map((s) => s.map((i) => i.value).join(" ").trim().split(" ")), Cs;
}
var $s, zo;
function Ih() {
  if (zo) return $s;
  zo = 1;
  const r = Te(), e = We();
  return $s = (n, s, i) => {
    let a = null, o = null, u = null;
    try {
      u = new e(s, i);
    } catch {
      return null;
    }
    return n.forEach((d) => {
      u.test(d) && (!a || o.compare(d) === -1) && (a = d, o = new r(a, i));
    }), a;
  }, $s;
}
var _s, Ko;
function kh() {
  if (Ko) return _s;
  Ko = 1;
  const r = Te(), e = We();
  return _s = (n, s, i) => {
    let a = null, o = null, u = null;
    try {
      u = new e(s, i);
    } catch {
      return null;
    }
    return n.forEach((d) => {
      u.test(d) && (!a || o.compare(d) === 1) && (a = d, o = new r(a, i));
    }), a;
  }, _s;
}
var Ss, Wo;
function Oh() {
  if (Wo) return Ss;
  Wo = 1;
  const r = Te(), e = We(), t = vn();
  return Ss = (s, i) => {
    s = new e(s, i);
    let a = new r("0.0.0");
    if (s.test(a) || (a = new r("0.0.0-0"), s.test(a)))
      return a;
    a = null;
    for (let o = 0; o < s.set.length; ++o) {
      const u = s.set[o];
      let d = null;
      u.forEach((l) => {
        const h = new r(l.semver.version);
        switch (l.operator) {
          case ">":
            h.prerelease.length === 0 ? h.patch++ : h.prerelease.push(0), h.raw = h.format();
          /* fallthrough */
          case "":
          case ">=":
            (!d || t(h, d)) && (d = h);
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${l.operator}`);
        }
      }), d && (!a || t(a, d)) && (a = d);
    }
    return a && s.test(a) ? a : null;
  }, Ss;
}
var Rs, Xo;
function xh() {
  if (Xo) return Rs;
  Xo = 1;
  const r = We();
  return Rs = (t, n) => {
    try {
      return new r(t, n).range || "*";
    } catch {
      return null;
    }
  }, Rs;
}
var Ts, Yo;
function Ai() {
  if (Yo) return Ts;
  Yo = 1;
  const r = Te(), e = En(), { ANY: t } = e, n = We(), s = Dn(), i = vn(), a = Ei(), o = wi(), u = Di();
  return Ts = (l, h, y, v) => {
    l = new r(l, v), h = new n(h, v);
    let A, g, p, f, c;
    switch (y) {
      case ">":
        A = i, g = o, p = a, f = ">", c = ">=";
        break;
      case "<":
        A = a, g = u, p = i, f = "<", c = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (s(l, h, v))
      return !1;
    for (let m = 0; m < h.set.length; ++m) {
      const D = h.set[m];
      let w = null, b = null;
      if (D.forEach((C) => {
        C.semver === t && (C = new e(">=0.0.0")), w = w || C, b = b || C, A(C.semver, w.semver, v) ? w = C : p(C.semver, b.semver, v) && (b = C);
      }), w.operator === f || w.operator === c || (!b.operator || b.operator === f) && g(l, b.semver))
        return !1;
      if (b.operator === c && p(l, b.semver))
        return !1;
    }
    return !0;
  }, Ts;
}
var Ns, Jo;
function qh() {
  if (Jo) return Ns;
  Jo = 1;
  const r = Ai();
  return Ns = (t, n, s) => r(t, n, ">", s), Ns;
}
var Fs, Qo;
function Lh() {
  if (Qo) return Fs;
  Qo = 1;
  const r = Ai();
  return Fs = (t, n, s) => r(t, n, "<", s), Fs;
}
var Ps, Zo;
function Bh() {
  if (Zo) return Ps;
  Zo = 1;
  const r = We();
  return Ps = (t, n, s) => (t = new r(t, s), n = new r(n, s), t.intersects(n, s)), Ps;
}
var Is, eu;
function jh() {
  if (eu) return Is;
  eu = 1;
  const r = Dn(), e = Ke();
  return Is = (t, n, s) => {
    const i = [];
    let a = null, o = null;
    const u = t.sort((y, v) => e(y, v, s));
    for (const y of u)
      r(y, n, s) ? (o = y, a || (a = y)) : (o && i.push([a, o]), o = null, a = null);
    a && i.push([a, null]);
    const d = [];
    for (const [y, v] of i)
      y === v ? d.push(y) : !v && y === u[0] ? d.push("*") : v ? y === u[0] ? d.push(`<=${v}`) : d.push(`${y} - ${v}`) : d.push(`>=${y}`);
    const l = d.join(" || "), h = typeof n.raw == "string" ? n.raw : String(n);
    return l.length < h.length ? l : n;
  }, Is;
}
var ks, tu;
function Mh() {
  if (tu) return ks;
  tu = 1;
  const r = We(), e = En(), { ANY: t } = e, n = Dn(), s = Ke(), i = (h, y, v = {}) => {
    if (h === y)
      return !0;
    h = new r(h, v), y = new r(y, v);
    let A = !1;
    e: for (const g of h.set) {
      for (const p of y.set) {
        const f = u(g, p, v);
        if (A = A || f !== null, f)
          continue e;
      }
      if (A)
        return !1;
    }
    return !0;
  }, a = [new e(">=0.0.0-0")], o = [new e(">=0.0.0")], u = (h, y, v) => {
    if (h === y)
      return !0;
    if (h.length === 1 && h[0].semver === t) {
      if (y.length === 1 && y[0].semver === t)
        return !0;
      v.includePrerelease ? h = a : h = o;
    }
    if (y.length === 1 && y[0].semver === t) {
      if (v.includePrerelease)
        return !0;
      y = o;
    }
    const A = /* @__PURE__ */ new Set();
    let g, p;
    for (const _ of h)
      _.operator === ">" || _.operator === ">=" ? g = d(g, _, v) : _.operator === "<" || _.operator === "<=" ? p = l(p, _, v) : A.add(_.semver);
    if (A.size > 1)
      return null;
    let f;
    if (g && p) {
      if (f = s(g.semver, p.semver, v), f > 0)
        return null;
      if (f === 0 && (g.operator !== ">=" || p.operator !== "<="))
        return null;
    }
    for (const _ of A) {
      if (g && !n(_, String(g), v) || p && !n(_, String(p), v))
        return null;
      for (const P of y)
        if (!n(_, String(P), v))
          return !1;
      return !0;
    }
    let c, m, D, w, b = p && !v.includePrerelease && p.semver.prerelease.length ? p.semver : !1, C = g && !v.includePrerelease && g.semver.prerelease.length ? g.semver : !1;
    b && b.prerelease.length === 1 && p.operator === "<" && b.prerelease[0] === 0 && (b = !1);
    for (const _ of y) {
      if (w = w || _.operator === ">" || _.operator === ">=", D = D || _.operator === "<" || _.operator === "<=", g) {
        if (C && _.semver.prerelease && _.semver.prerelease.length && _.semver.major === C.major && _.semver.minor === C.minor && _.semver.patch === C.patch && (C = !1), _.operator === ">" || _.operator === ">=") {
          if (c = d(g, _, v), c === _ && c !== g)
            return !1;
        } else if (g.operator === ">=" && !n(g.semver, String(_), v))
          return !1;
      }
      if (p) {
        if (b && _.semver.prerelease && _.semver.prerelease.length && _.semver.major === b.major && _.semver.minor === b.minor && _.semver.patch === b.patch && (b = !1), _.operator === "<" || _.operator === "<=") {
          if (m = l(p, _, v), m === _ && m !== p)
            return !1;
        } else if (p.operator === "<=" && !n(p.semver, String(_), v))
          return !1;
      }
      if (!_.operator && (p || g) && f !== 0)
        return !1;
    }
    return !(g && D && !p && f !== 0 || p && w && !g && f !== 0 || C || b);
  }, d = (h, y, v) => {
    if (!h)
      return y;
    const A = s(h.semver, y.semver, v);
    return A > 0 ? h : A < 0 || y.operator === ">" && h.operator === ">=" ? y : h;
  }, l = (h, y, v) => {
    if (!h)
      return y;
    const A = s(h.semver, y.semver, v);
    return A < 0 ? h : A > 0 || y.operator === "<" && h.operator === "<=" ? y : h;
  };
  return ks = i, ks;
}
var Os, ru;
function Uh() {
  if (ru) return Os;
  ru = 1;
  const r = sr(), e = yn(), t = Te(), n = Al(), s = kt(), i = bh(), a = vh(), o = Eh(), u = Dh(), d = wh(), l = Ah(), h = Ch(), y = $h(), v = Ke(), A = _h(), g = Sh(), p = vi(), f = Rh(), c = Th(), m = vn(), D = Ei(), w = Cl(), b = $l(), C = Di(), _ = wi(), P = _l(), U = Nh(), H = En(), te = We(), ee = Dn(), L = Ph(), B = Ih(), W = kh(), z = Oh(), V = xh(), K = Ai(), I = qh(), S = Lh(), F = Bh(), T = jh(), E = Mh();
  return Os = {
    parse: s,
    valid: i,
    clean: a,
    inc: o,
    diff: u,
    major: d,
    minor: l,
    patch: h,
    prerelease: y,
    compare: v,
    rcompare: A,
    compareLoose: g,
    compareBuild: p,
    sort: f,
    rsort: c,
    gt: m,
    lt: D,
    eq: w,
    neq: b,
    gte: C,
    lte: _,
    cmp: P,
    coerce: U,
    Comparator: H,
    Range: te,
    satisfies: ee,
    toComparators: L,
    maxSatisfying: B,
    minSatisfying: W,
    minVersion: z,
    validRange: V,
    outside: K,
    gtr: I,
    ltr: S,
    intersects: F,
    simplifyRange: T,
    subset: E,
    SemVer: t,
    re: r.re,
    src: r.src,
    tokens: r.t,
    SEMVER_SPEC_VERSION: e.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: e.RELEASE_TYPES,
    compareIdentifiers: n.compareIdentifiers,
    rcompareIdentifiers: n.rcompareIdentifiers
  }, Os;
}
Uh();
const Vh = "http://json-schema.org/draft-06/schema#", Hh = "http://json-schema.org/draft-06/schema#", Gh = "Core schema meta-schema", zh = {
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
}, Kh = [
  "object",
  "boolean"
], Wh = {
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
var Ci = {
  $schema: Vh,
  $id: Hh,
  title: Gh,
  definitions: zh,
  type: Kh,
  properties: Wh,
  default: {}
};
function Xh(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var xs, nu;
function Yh() {
  if (nu) return xs;
  nu = 1;
  var r = function(c) {
    return e(c) && !t(c);
  };
  function e(f) {
    return !!f && typeof f == "object";
  }
  function t(f) {
    var c = Object.prototype.toString.call(f);
    return c === "[object RegExp]" || c === "[object Date]" || i(f);
  }
  var n = typeof Symbol == "function" && Symbol.for, s = n ? Symbol.for("react.element") : 60103;
  function i(f) {
    return f.$$typeof === s;
  }
  function a(f) {
    return Array.isArray(f) ? [] : {};
  }
  function o(f, c) {
    return c.clone !== !1 && c.isMergeableObject(f) ? g(a(f), f, c) : f;
  }
  function u(f, c, m) {
    return f.concat(c).map(function(D) {
      return o(D, m);
    });
  }
  function d(f, c) {
    if (!c.customMerge)
      return g;
    var m = c.customMerge(f);
    return typeof m == "function" ? m : g;
  }
  function l(f) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(f).filter(function(c) {
      return Object.propertyIsEnumerable.call(f, c);
    }) : [];
  }
  function h(f) {
    return Object.keys(f).concat(l(f));
  }
  function y(f, c) {
    try {
      return c in f;
    } catch {
      return !1;
    }
  }
  function v(f, c) {
    return y(f, c) && !(Object.hasOwnProperty.call(f, c) && Object.propertyIsEnumerable.call(f, c));
  }
  function A(f, c, m) {
    var D = {};
    return m.isMergeableObject(f) && h(f).forEach(function(w) {
      D[w] = o(f[w], m);
    }), h(c).forEach(function(w) {
      v(f, w) || (y(f, w) && m.isMergeableObject(c[w]) ? D[w] = d(w, m)(f[w], c[w], m) : D[w] = o(c[w], m));
    }), D;
  }
  function g(f, c, m) {
    m = m || {}, m.arrayMerge = m.arrayMerge || u, m.isMergeableObject = m.isMergeableObject || r, m.cloneUnlessOtherwiseSpecified = o;
    var D = Array.isArray(c), w = Array.isArray(f), b = D === w;
    return b ? D ? m.arrayMerge(f, c, m) : A(f, c, m) : o(c, m);
  }
  g.all = function(c, m) {
    if (!Array.isArray(c))
      throw new Error("first argument should be an array");
    return c.reduce(function(D, w) {
      return g(D, w, m);
    }, {});
  };
  var p = g;
  return xs = p, xs;
}
var Jh = /* @__PURE__ */ Yh(), Wt = /* @__PURE__ */ Xh(Jh);
function Qh(r) {
  return typeof r == "string" ? String(r) : JSON.stringify(r);
}
class Zh extends Error {
  constructor(e) {
    super(Qh(e));
  }
}
function Ft(r) {
  return r instanceof Error ? r : new Zh(r);
}
class Pt extends Error {
  constructor(e, t) {
    super(e), Error.captureStackTrace(this, Pt), this.name = Pt.name, t != null && t.stack && (this.stack ?? (this.stack = ""), this.stack += `
Caused by: ${t.stack}`);
  }
}
class ge extends Pt {
  constructor(e, t) {
    super(e, t), Error.captureStackTrace(this, ge), this.name = ge.name, Object.defineProperty(this, "isUserError", {
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
class Jt extends ge {
  constructor({ tagName: t, inherit: n }) {
    const s = `Element <${t}> cannot inherit from <${n}>: no such element`;
    super(s);
    O(this, "tagName");
    O(this, "inherit");
    O(this, "filename");
    Error.captureStackTrace(this, Jt), this.name = Jt.name, this.tagName = t, this.inherit = n, this.filename = null;
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
function em(r, e, t) {
  const n = hh(r, e, t, {
    format: "js"
  });
  return n.length > 0 ? n[0].error : "unknown validation error";
}
class an extends ge {
  constructor(t, n, s, i, a) {
    const o = em(i, s, a);
    super(`${n}: ${o}`);
    /** Configuration filename the error originates from */
    O(this, "filename");
    /** Configuration object the error originates from */
    O(this, "obj");
    /** JSON schema used when validating the configuration */
    O(this, "schema");
    /** List of schema validation errors */
    O(this, "errors");
    this.filename = t, this.obj = s, this.schema = i, this.errors = a;
  }
}
function tm(r) {
  let u = -559038737, d = 1103547991;
  for (let l = 0, h; l < r.length; l++)
    h = r.charCodeAt(l), u = Math.imul(u ^ h, 2654435761), d = Math.imul(d ^ h, 1597334677);
  return u = Math.imul(u ^ u >>> 16, 2246822507) ^ Math.imul(d ^ d >>> 13, 3266489909), d = Math.imul(d ^ d >>> 16, 2246822507) ^ Math.imul(u ^ u >>> 13, 3266489909), 4294967296 * (2097151 & d) + (u >>> 0);
}
const rm = tm, nm = "http://json-schema.org/draft-06/schema#", sm = "https://html-validate.org/schemas/elements.json", im = "object", am = {
  $schema: {
    type: "string"
  }
}, om = {
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
}, um = {
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
var lm = {
  $schema: nm,
  $id: sm,
  type: im,
  properties: am,
  patternProperties: om,
  definitions: um
};
const Sl = function(r, e) {
  const t = r instanceof RegExp;
  return t || (Sl.errors = [
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
}, cm = {
  keyword: "regexp",
  schema: !1,
  errors: !0,
  validate: Sl
}, Rl = function(r, e) {
  const t = typeof r == "function";
  return t || (Rl.errors = [
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
}, Tl = {
  keyword: "function",
  schema: !1,
  errors: !0,
  validate: Rl
};
var it = /* @__PURE__ */ ((r) => (r.NONE = "none", r.DEFAULT = "default", r.REQUIRED = "required", r.ACCESSIBLE = "accessible", r))(it || {});
const ti = [
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
function ri(r, e, t) {
  r[e] = t;
}
function dm(r) {
  return typeof r < "u";
}
function su(r) {
  return r ? !0 : void 0;
}
function zr(r) {
  const e = Object.entries(r).filter(([, t]) => dm(t));
  return Object.fromEntries(e);
}
function fm(r, e) {
  var s, i;
  const t = {};
  t.deprecated = su((s = r.deprecatedAttributes) == null ? void 0 : s.includes(e)), t.required = su((i = r.requiredAttributes) == null ? void 0 : i.includes(e)), t.omit = void 0;
  const n = r.attributes ? r.attributes[e] : void 0;
  return typeof n > "u" ? zr(t) : n === null ? (t.delete = !0, zr(t)) : Array.isArray(n) ? (n.length === 0 ? t.boolean = !0 : (t.enum = n.filter((a) => a !== ""), n.includes("") && (t.omit = !0)), zr(t)) : zr({ ...t, ...n });
}
function hm(r) {
  const t = [
    ...Object.keys(r.attributes ?? {}),
    ...r.requiredAttributes ?? [],
    ...r.deprecatedAttributes ?? []
    /* eslint-disable-next-line sonarjs/no-alphabetical-sort -- not really needed in this case, this is a-z anyway */
  ].sort().map((n) => [n, fm(r, n)]);
  return Object.fromEntries(t);
}
function mm(r) {
  return r ? typeof r == "string" ? () => r : r : () => null;
}
function pm(r) {
  return r ? typeof r == "string" ? () => r : r : () => "allowed";
}
function gm(r) {
  var n, s;
  const e = mm(r.implicitRole ?? ((n = r.aria) == null ? void 0 : n.implicitRole)), t = {
    ...r,
    formAssociated: void 0,
    attributes: hm(r),
    textContent: r.textContent,
    focusable: r.focusable ?? !1,
    implicitRole: e,
    aria: {
      implicitRole: e,
      naming: pm((s = r.aria) == null ? void 0 : s.naming)
    }
  };
  return delete t.deprecatedAttributes, delete t.requiredAttributes, t.textContent || delete t.textContent, r.formAssociated ? t.formAssociated = {
    disablable: !!r.formAssociated.disablable,
    listed: !!r.formAssociated.listed
  } : delete t.formAssociated, t;
}
const ym = [
  "metadata",
  "flow",
  "sectioning",
  "heading",
  "phrasing",
  "embedded",
  "interactive",
  "labelable"
], iu = /* @__PURE__ */ new Map();
function bm(r) {
  return JSON.parse(JSON.stringify(r));
}
function vm(r, e) {
  return e;
}
class Em {
  /**
   * @internal
   */
  constructor() {
    O(this, "elements");
    O(this, "schema");
    this.elements = {}, this.schema = bm(lm);
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
    e.properties && (this.schema = Wt(this.schema, {
      patternProperties: {
        "^[^$].*$": {
          properties: e.properties
        }
      }
    })), e.definitions && (this.schema = Wt(this.schema, {
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
        throw new an(
          t,
          "Element metadata is not valid",
          e,
          this.schema,
          /* istanbul ignore next: AJV sets .errors when validate returns false */
          n.errors ?? []
        );
      for (const [s, i] of Object.entries(e))
        s !== "$schema" && this.addEntry(s, gm(i));
    } catch (n) {
      throw n instanceof Jt ? (n.filename = t, n) : n instanceof an || !t ? n : new ge(`Failed to load element metadata from "${t}"`, Ft(n));
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
        throw new Jt({
          tagName: e,
          inherit: i
        });
    }
    const s = this.mergeElement(n ?? {}, { ...t, tagName: e });
    Am(s), this.elements[e] = s;
  }
  /**
   * Construct a new AJV schema validator.
   */
  getSchemaValidator() {
    const e = rm(JSON.stringify(this.schema)), t = iu.get(e);
    if (t)
      return t;
    {
      const n = new di({ strict: !0, strictTuples: !0, strictTypes: !0 });
      n.addMetaSchema(Ci), n.addKeyword(Tl), n.addKeyword(cm), n.addKeyword({ keyword: "copyable" });
      const s = n.compile(this.schema);
      return iu.set(e, s), s;
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
    const n = Wt(e, t, { arrayMerge: vm }), s = Object.entries(
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
    e.meta && Dm(e, e.meta);
  }
}
function Dm(r, e) {
  for (const t of ym) {
    const n = e[t];
    typeof n == "function" && ri(e, t, n(r._adapter));
  }
  typeof e.focusable == "function" && ri(e, "focusable", e.focusable(r._adapter));
}
function wm(r) {
  if (r instanceof RegExp)
    return r;
  const e = /^\/(.*(?=\/))\/(i?)$/.exec(r);
  if (e) {
    const [, t, n] = e;
    return t.startsWith("^") || t.endsWith("$") ? new RegExp(t, n) : new RegExp(`^${t}$`, n);
  } else
    return r;
}
function Am(r) {
  for (const [e, t] of Object.entries(r.attributes))
    t.enum && (r.attributes[e].enum = t.enum.map(wm));
}
class me {
  constructor(e) {
    O(this, "expr");
    this.expr = e;
  }
  toString() {
    return this.expr;
  }
}
function Cm(r) {
  return !!(r != null && r.isStatic);
}
function $m(r) {
  return !!(r != null && r.isDynamic);
}
class _m {
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
    O(this, "key");
    O(this, "value");
    O(this, "keyLocation");
    O(this, "valueLocation");
    O(this, "originalAttribute");
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
    return this.value instanceof me;
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
    return this.value === null ? !1 : this.value instanceof me ? t : Array.isArray(e) ? e.includes(this.value) : e instanceof RegExp ? this.value.match(e) !== null : this.value === e;
  }
}
function Sm(r) {
  return r.trim().split(";").filter(Boolean).map((e) => {
    const [t, n] = e.split(":", 2);
    return [t.trim(), n ? n.trim() : ""];
  });
}
function $i(r) {
  if (!r || r instanceof me)
    return {};
  const e = Sm(r);
  return Object.fromEntries(e);
}
function Rm(r, e, t) {
  return typeof r != "number" ? r : typeof t != "number" ? r - e : (t < 0 && (t = r + t), Math.min(r, t - e));
}
function ve(r, e, t, n) {
  if (!r) return null;
  const s = Rm(r.size, e, t), i = {
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
var re = /* @__PURE__ */ ((r) => (r[r.INITIAL = 1] = "INITIAL", r[r.DOCTYPE = 2] = "DOCTYPE", r[r.TEXT = 3] = "TEXT", r[r.TAG = 4] = "TAG", r[r.ATTR = 5] = "ATTR", r[r.CDATA = 6] = "CDATA", r[r.SCRIPT = 7] = "SCRIPT", r[r.STYLE = 8] = "STYLE", r))(re || {}), gt = /* @__PURE__ */ ((r) => (r[r.TEXT = 1] = "TEXT", r[r.SCRIPT = 2] = "SCRIPT", r[r.STYLE = 3] = "STYLE", r))(gt || {});
class Tm {
  constructor(e) {
    O(this, "contentModel");
    O(this, "state");
    O(this, "string");
    O(this, "filename");
    O(this, "offset");
    O(this, "line");
    O(this, "column");
    this.state = re.INITIAL, this.string = e.data, this.filename = e.filename, this.offset = e.offset, this.line = e.line, this.column = e.column, this.contentModel = 1;
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
function au(r) {
  return {
    filename: "",
    offset: 0,
    line: 1,
    column: 1,
    ...r
  };
}
var Ye = /* @__PURE__ */ ((r) => (r[r.ELEMENT_NODE = 1] = "ELEMENT_NODE", r[r.TEXT_NODE = 3] = "TEXT_NODE", r[r.DOCUMENT_NODE = 9] = "DOCUMENT_NODE", r))(Ye || {});
const Nm = "#document", ou = Symbol("textContent");
let Fm = 0;
class Nl {
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
    O(this, "nodeName");
    O(this, "nodeType");
    O(this, "childNodes");
    O(this, "location");
    /**
     * @internal
     */
    O(this, "unique");
    /* eslint-disable-next-line sonarjs/use-type-alias -- technical debt */
    O(this, "cache");
    /**
     * Set of disabled rules for this node.
     *
     * Rules disabled by using directives are added here.
     */
    O(this, "disabledRules");
    /**
     * Set of blocked rules for this node.
     *
     * Rules blocked by using directives are added here.
     */
    O(this, "blockedRules");
    this.nodeType = e, this.nodeName = t ?? Nm, this.location = n, this.disabledRules = /* @__PURE__ */ new Set(), this.blockedRules = /* @__PURE__ */ new Map(), this.childNodes = [], this.unique = Fm++, this.cache = null;
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
  /**
   * Remove a value by key from cache.
   *
   * @returns `true` if the entry existed and has been removed.
   */
  cacheRemove(e) {
    return this.cache ? this.cache.delete(e) : !1;
  }
  /**
   * Check if key exists in cache.
   */
  cacheExists(e) {
    var t;
    return !!((t = this.cache) != null && t.has(e));
  }
  /**
   * Get the text (recursive) from all child nodes.
   */
  get textContent() {
    const e = this.cacheGet(ou);
    if (e)
      return e;
    const t = this.childNodes.map((n) => n.textContent).join("");
    return this.cacheSet(ou, t), t;
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
    return this.nodeType === Ye.DOCUMENT_NODE;
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
function Pm(r, e) {
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
      const u = ve(e, s, i);
      n.push(u);
    }
    s += a + 1;
  }
  return { tokens: t, locations: n };
}
class Je extends Array {
  constructor(t, n) {
    var e = (...TE) => (super(...TE), O(this, "value"), O(this, "locations"), this);
    if (t && typeof t == "string") {
      const s = t.replace(/[\t\r\n]/g, " "), { tokens: i, locations: a } = Pm(s, n);
      e(...i), this.locations = a;
    } else
      e(0), this.locations = null;
    t instanceof me ? this.value = t.expr : this.value = t ?? "";
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
var Ve = /* @__PURE__ */ ((r) => (r[r.DESCENDANT = 1] = "DESCENDANT", r[r.CHILD = 2] = "CHILD", r[r.ADJACENT_SIBLING = 3] = "ADJACENT_SIBLING", r[r.GENERAL_SIBLING = 4] = "GENERAL_SIBLING", r[r.SCOPE = 5] = "SCOPE", r))(Ve || {});
function Im(r, e) {
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
function km(r) {
  return r.previousSibling === null;
}
function Om(r) {
  return r.nextSibling === null;
}
const qs = {};
function xm(r) {
  if (!r.parent)
    return -1;
  if (!qs[r.unique]) {
    const t = r.parent.childElements.findIndex((n) => n.unique === r.unique);
    qs[r.unique] = t + 1;
  }
  return qs[r.unique];
}
function qm(r, e) {
  if (!e)
    throw new Error("Missing argument to nth-child");
  const t = parseInt(e.trim(), 10);
  return xm(r) === t;
}
function Lm(r) {
  return !!(this.scope && r.isSameNode(this.scope));
}
const Bm = {
  "first-child": km,
  "last-child": Om,
  "nth-child": qm,
  scope: Lm
};
function jm(r, e) {
  const t = Bm[r];
  if (t)
    return t.bind(e);
  throw new Error(`Pseudo-class "${r}" is not implemented`);
}
function Fl(r) {
  return r.replace(/\\(.)/g, "$1");
}
class wn {
}
class Mm extends wn {
  constructor(t) {
    super();
    O(this, "classname");
    this.classname = t;
  }
  match(t) {
    return t.classList.contains(this.classname);
  }
}
class Um extends wn {
  constructor(t) {
    super();
    O(this, "id");
    this.id = Fl(t);
  }
  match(t) {
    return t.id === this.id;
  }
}
class Vm extends wn {
  constructor(t) {
    super();
    O(this, "key");
    O(this, "op");
    O(this, "value");
    const [, n, s, i] = /^(.+?)(?:([~^$*|]?=)"([^"]+?)")?$/.exec(t);
    this.key = n, this.op = s, this.value = typeof i == "string" ? Fl(i) : i;
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
class Hm extends wn {
  constructor(t, n) {
    super();
    O(this, "name");
    O(this, "args");
    const s = /^([^(]+)(?:\((.*)\))?$/.exec(t);
    if (!s)
      throw new Error(`Missing pseudo-class after colon in selector pattern "${n}"`);
    const [, i, a] = s;
    this.name = i, this.args = a;
  }
  match(t, n) {
    return jm(this.name, n)(t, this.args);
  }
}
function Gm(r) {
  return /[.#[:]/.test(r);
}
function zm(r) {
  return /['"]/.test(r);
}
function Km(r, e) {
  return r === ":" && e === ":";
}
function* Wm(r) {
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
    if (zm(a)) {
      s = a, n += 1;
      continue;
    }
    if (Km(a, o)) {
      n += 1;
      continue;
    }
    Gm(a) && (t = n, yield o), n += 1;
  }
  yield r.slice(t, n);
}
class Pl {
  constructor(e) {
    O(this, "combinator");
    O(this, "tagName");
    O(this, "selector");
    O(this, "conditions");
    const t = /^([~+\->]?)((?:[*]|[^.#[:]+)?)([^]*)$/.exec(e);
    if (!t)
      throw new Error(`Failed to create selector pattern from "${e}"`);
    t.shift(), this.selector = e, this.combinator = Im(t.shift(), e), this.tagName = t.shift() || "*", this.conditions = Array.from(Wm(t[0]), (n) => this.createCondition(n));
  }
  match(e, t) {
    return e.is(this.tagName) && this.conditions.every((n) => n.match(e, t));
  }
  createCondition(e) {
    switch (e[0]) {
      case ".":
        return new Mm(e.slice(1));
      case "#":
        return new Um(e.slice(1));
      case "[":
        return new Vm(e.slice(1, -1));
      case ":":
        return new Hm(e.slice(1), this.selector);
      default:
        throw new Error(`Failed to create selector condition for "${e}"`);
    }
  }
}
function* Xm(r) {
  let e = r.parent;
  for (; e && !e.isRootElement(); )
    yield e, e = e.parent;
}
function* Ym(r) {
  const e = r.parent;
  e && !e.isRootElement() && (yield e);
}
function* Jm(r) {
  const e = r.previousSibling;
  e && (yield e);
}
function* Qm(r) {
  const e = r.siblings, t = e.findIndex((n) => n.isSameNode(r));
  for (let n = 0; n < t; n++)
    yield e[n];
}
function* Zm(r) {
  yield r;
}
function ep(r, e) {
  switch (e) {
    case Ve.DESCENDANT:
      return Xm(r);
    case Ve.CHILD:
      return Ym(r);
    case Ve.ADJACENT_SIBLING:
      return Jm(r);
    case Ve.GENERAL_SIBLING:
      return Qm(r);
    /* istanbul ignore next -- cannot really happen, the selector would be malformed */
    case Ve.SCOPE:
      return Zm(r);
  }
}
function Il(r, e, t) {
  const n = e[e.length - 1];
  if (!n.match(r, t))
    return !1;
  const s = e.slice(0, -1);
  if (s.length === 0)
    return !0;
  const i = ep(r, n.combinator);
  for (const a of i)
    if (Il(a, s, t))
      return !0;
  return !1;
}
const tp = ["9", "a", "d"];
function* rp(r) {
  let e = 0, t = 0;
  function n(o, u) {
    return o === "\\" ? 1 : o === " " ? (t = u, 2) : 0;
  }
  function s(o) {
    return tp.includes(o) ? 1 : 0;
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
function np(r) {
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
function sp(r) {
  const e = {
    "	": "\\9 ",
    "\n": "\\a ",
    "\r": "\\d "
  };
  return r.toString().replace(/([\t\n\r]|[^a-z0-9_-])/gi, (t, n) => e[n] ? e[n] : `\\${n}`);
}
function An(r) {
  const e = sp(r);
  return /^\d/.exec(e) ? `[id="${e}"]` : `#${e}`;
}
class yt {
  constructor(e) {
    O(this, "pattern");
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
  /**
   * Returns `true` if the element matches this selector.
   */
  matchElement(e) {
    const t = { scope: null };
    return Il(e, this.pattern, t);
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
    return e = e.replace(/([+~>]) /g, "$1"), Array.from(rp(e), (t) => new Pl(np(t)));
  }
  static findCandidates(e, t) {
    switch (t.combinator) {
      case Ve.DESCENDANT:
        return e.getElementsByTagName(t.tagName);
      case Ve.CHILD:
        return e.childElements.filter((n) => n.is(t.tagName));
      case Ve.ADJACENT_SIBLING:
        return yt.findAdjacentSibling(e);
      case Ve.GENERAL_SIBLING:
        return yt.findGeneralSibling(e);
      case Ve.SCOPE:
        return [e];
    }
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
const ip = "#text";
function _i(r) {
  return !!(r && r.nodeType === Ye.TEXT_NODE);
}
class ap extends Nl {
  /**
   * @param text - Text to add. When a `DynamicValue` is used the expression is
   * used as "text".
   * @param location - Source code location of this node.
   */
  constructor(t, n) {
    super(Ye.TEXT_NODE, ip, n);
    O(this, "text");
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
    return this.text instanceof me;
  }
}
const Kr = Symbol("role"), St = Symbol("tabindex");
var ke = /* @__PURE__ */ ((r) => (r[r.Open = 0] = "Open", r[r.EndTag = 1] = "EndTag", r[r.VoidOmitted = 2] = "VoidOmitted", r[r.VoidSelfClosed = 3] = "VoidSelfClosed", r[r.ImplicitClosed = 4] = "ImplicitClosed", r))(ke || {});
function Si(r) {
  return !!(r && r.nodeType === Ye.ELEMENT_NODE);
}
function op(r) {
  return r === "" || r === "*";
}
function up(r) {
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
class ut extends Nl {
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
    O(this, "tagName");
    O(this, "voidElement");
    O(this, "depth");
    O(this, "closed");
    O(this, "attr");
    O(this, "metaElement");
    O(this, "annotation");
    O(this, "_parent");
    /** @internal */
    O(this, "_adapter");
    if (op(s))
      throw new Error(`The tag name provided ("${s}") is not a valid name`);
    if (this.tagName = s ?? "#document", this._parent = null, this.attr = {}, this.metaElement = o ?? null, this.closed = a, this.voidElement = o ? !!o.void : !1, this.depth = 0, this.annotation = null, this._adapter = up(this), i) {
      i.append(this);
      let d = i;
      for (; d.parent; )
        this.depth++, d = d.parent;
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
    return new ut({
      nodeType: Ye.ELEMENT_NODE,
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
    const n = new ut({
      nodeType: Ye.DOCUMENT_NODE,
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
    const d = i ? i.getMetaFor(u) : null, l = t.data[1] !== "/", h = lp(n, d), y = ve(t.location, 1);
    return new ut({
      nodeType: Ye.ELEMENT_NODE,
      tagName: u,
      parent: l ? s : null,
      closed: h,
      meta: d,
      location: y
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
    if (t.value instanceof me)
      return t.value;
    const n = new Je(t.value, t.valueLocation);
    return n.length ? Array.from(n) : null;
  }
  /**
   * Similar to childNodes but only elements.
   */
  get childElements() {
    return this.childNodes.filter(Si);
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
        const l = An(s.id);
        if (n.querySelectorAll(l).length === 1) {
          t.push(l);
          break;
        }
      }
      const a = s.parent.childElements, o = a.findIndex((l) => l.unique === s.unique);
      if (a.filter((l) => l.is(s.tagName)).length === 1) {
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
    this.metaElement ?? (this.metaElement = {});
    for (const n of ti) {
      const s = t[n];
      typeof s < "u" ? ri(this.metaElement, n, s) : delete this.metaElement[n];
    }
  }
  /**
   * Match this element against given selectors. Returns true if any selector
   * matches.
   *
   * Implementation of DOM specification of Element.matches(selectors).
   */
  matches(t) {
    return t.split(",").some((n) => new yt(n.trim()).matchElement(this));
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
    const t = this.cacheGet(Kr);
    if (t !== void 0)
      return t;
    const n = this.getAttribute("role");
    if (n)
      return this.cacheSet(Kr, n.value);
    if (this.metaElement) {
      const { aria: s } = this.metaElement, i = s.implicitRole(this._adapter);
      return this.cacheSet(Kr, i);
    }
    return this.cacheSet(Kr, null);
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
    const o = new _m(t, n, s, i, a), u = this.attr[t];
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
    const t = this.cacheGet(St);
    if (t !== void 0)
      return t;
    const n = this.getAttribute("tabindex");
    if (!n)
      return this.cacheSet(St, null);
    if (n.value === null)
      return this.cacheSet(St, null);
    if (n.value instanceof me)
      return this.cacheSet(St, 0);
    const s = parseInt(n.value, 10);
    return isNaN(s) ? this.cacheSet(St, null) : this.cacheSet(St, s);
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
    this.childNodes.push(new ap(t, n));
  }
  /**
   * Return a list of all known classes on the element. Dynamic values are
   * ignored.
   */
  get classList() {
    if (!this.hasAttribute("class"))
      return new Je(null, null);
    const t = this.getAttribute("class", !0).filter((n) => n.isStatic).map((n) => n.value).join(" ");
    return new Je(t, null);
  }
  /**
   * Get element ID if present.
   */
  get id() {
    return this.getAttributeValue("id");
  }
  get style() {
    const t = this.getAttribute("style");
    return $i(t == null ? void 0 : t.value);
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
      for (const n of t.split(new RegExp("(?<!\\\\),\\s*")))
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
    return this._parent = t instanceof ut ? t : null, n;
  }
}
function lp(r, e) {
  let t = 0;
  return e != null && e.void && (t = 2), r.data[0] === "/>" && (t = 3), t;
}
function cp(r) {
  return "root" in r && "readyState" in r;
}
function dp(r, e) {
  if (cp(r)) {
    if (r.readyState !== "complete")
      throw new Error("Cannot call walk.depthFirst(..) before document is ready");
    r = r.root;
  }
  function t(n) {
    n.childElements.forEach(t), n.isRootElement() || e(n);
  }
  t(r);
}
const Ge = {
  depthFirst: dp
};
class fp {
  /**
   * @internal
   */
  constructor(e) {
    O(this, "root");
    O(this, "active");
    O(this, "_readyState");
    O(this, "doctype");
    this.root = ut.rootNode(e), this.active = this.root, this.doctype = null, this._readyState = "loading";
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
    this._readyState = "complete", Ge.depthFirst(this, (t) => {
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
    Ge.depthFirst(this, e);
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
const hp = ["exclude"];
class ye {
  /**
   * Test if element is used in a proper context.
   *
   * @param node - Element to test.
   * @param rules - List of rules.
   * @returns `true` if element passes all tests.
   */
  static validatePermitted(e, t) {
    return t ? t.some((n) => ye.validatePermittedRule(e, n)) : !0;
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
      const [, a, o] = /^(@?.*?)([?*]?)$/.exec(i), u = a && o && pp(o);
      if (u) {
        const d = e.filter(
          (l) => ye.validatePermittedCategory(l, i, !0)
        );
        if (d.length > u) {
          for (const l of d.slice(u))
            n(l, a);
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
      for (; t[s] && !ye.validatePermittedCategory(a, t[s], !0); )
        s++;
      if (s >= t.length) {
        if (t.find(
          (d) => ye.validatePermittedCategory(a, d, !0)
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
      (i) => ye.validatePermittedCategory(i, n, !1)
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
    if (s instanceof me)
      return !0;
    const i = s === null || s === "";
    return n.boolean ? i || s === e.key : n.omit && i ? !0 : n.list ? new Je(s, e.valueLocation).every((o) => this.validateAttributeValue(o, n)) : this.validateAttributeValue(s, n);
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
    return typeof t == "string" ? ye.validatePermittedCategory(e, t, !n) : Array.isArray(t) ? t.every((s) => ye.validatePermittedRule(e, s, n)) : (mp(t), t.exclude ? Array.isArray(t.exclude) ? !t.exclude.some((s) => ye.validatePermittedRule(e, s, !0)) : !ye.validatePermittedRule(e, t.exclude, !0) : !0);
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
    const [, s] = /^(@?.*?)([?*]?)$/.exec(t);
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
function mp(r) {
  for (const e of Object.keys(r))
    if (!hp.includes(e)) {
      const t = JSON.stringify(r);
      throw new Error(`Permitted rule "${t}" contains unknown property "${e}"`);
    }
}
function pp(r) {
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
const gp = "http://json-schema.org/draft-06/schema#", yp = "https://html-validate.org/schemas/config.json", bp = "object", vp = !1, Ep = {
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
var Ri = {
  $schema: gp,
  $id: yp,
  type: bp,
  additionalProperties: vp,
  properties: Ep
}, rt = /* @__PURE__ */ ((r) => (r[r.DISABLED = 0] = "DISABLED", r[r.WARN = 1] = "WARN", r[r.ERROR = 2] = "ERROR", r))(rt || {});
function Dp(r) {
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
function wp(r) {
  return JSON.stringify(r);
}
function ni(r, e = !1) {
  return r == null ? "null" : typeof r == "number" ? r.toString() : typeof r == "string" ? e ? wp(r) : r : Array.isArray(r) ? `[ ${r.map((n) => ni(n, !0)).join(", ")} ]` : typeof r == "object" ? `{ ${Object.entries(r).map(([n, s]) => `${n}: ${ni(s, !0)}`).join(", ")} }` : String(r);
}
function kl(r, e) {
  return r.replace(/{{\s*([^\s{}]+)\s*}}/g, (t, n) => typeof e[n] < "u" ? ni(e[n]) : t);
}
const Ut = Symbol("aria-naming"), uu = "allowed", Ap = [
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
function Cp(r) {
  return Ap.includes(r) ? "prohibited" : "allowed";
}
function $p(r, e) {
  return e.aria.naming(r._adapter);
}
function _p(r) {
  var s;
  const e = r.cacheGet(Ut);
  if (e)
    return e;
  const t = (s = r.getAttribute("role")) == null ? void 0 : s.value;
  if (t)
    return t instanceof me ? r.cacheSet(Ut, uu) : r.cacheSet(Ut, Cp(t));
  const n = r.meta;
  return n ? r.cacheSet(Ut, $p(r, n)) : r.cacheSet(Ut, uu);
}
const lu = /* @__PURE__ */ new Map();
function Sp(r) {
  const e = r.replace(/[*]+/g, ".+");
  return new RegExp(`^${e}$`);
}
function Rp(r) {
  return new RegExp(`^${r}$`);
}
function Tp(r) {
  const e = lu.get(r);
  if (e)
    return e;
  const t = /^\/(.*)\/$/.exec(r), n = t ? Rp(t[1]) : Sp(r);
  return lu.set(r, n), n;
}
function Np(r, e) {
  for (const t of r)
    if (Tp(t).test(e))
      return !0;
  return !1;
}
function Fp(r, e, t = (n, s) => n.includes(s)) {
  const { include: n, exclude: s } = r;
  return !!(n && !t(n, e) || s && t(s, e));
}
const cu = Symbol(Ot.name), du = Symbol(xt.name), fu = Symbol(Cn.name), Rt = Symbol(Ol.name), hu = Symbol($n.name);
function lt(r) {
  return !(Ot(r) || Ol(r) || xt(r) || Cn(r) || $n(r));
}
function Pp(r) {
  const e = (t) => {
    const n = t.getAttribute("aria-hidden");
    return !!(n && n.value === "true");
  };
  return {
    byParent: r.parent ? Ot(r.parent) : !1,
    bySelf: e(r)
  };
}
function Ot(r, e) {
  const t = r.cacheGet(cu);
  if (t)
    return e ? t : t.byParent || t.bySelf;
  const n = r.cacheSet(cu, Pp(r));
  return e ? n : n.byParent || n.bySelf;
}
function Ip(r) {
  const e = (t) => {
    const n = t.getAttribute("hidden");
    return !!(n != null && n.isStatic);
  };
  return {
    byParent: r.parent ? xt(r.parent) : !1,
    bySelf: e(r)
  };
}
function xt(r, e) {
  const t = r.cacheGet(du);
  if (t)
    return e ? t : t.byParent || t.bySelf;
  const n = r.cacheSet(du, Ip(r));
  return e ? n : n.byParent || n.bySelf;
}
function kp(r) {
  const e = (t) => {
    const n = t.getAttribute("inert");
    return !!(n != null && n.isStatic);
  };
  return {
    byParent: r.parent ? Cn(r.parent) : !1,
    bySelf: e(r)
  };
}
function Cn(r, e) {
  const t = r.cacheGet(fu);
  if (t)
    return e ? t : t.byParent || t.bySelf;
  const n = r.cacheSet(fu, kp(r));
  return e ? n : n.byParent || n.bySelf;
}
function Op(r) {
  const e = (s) => {
    const i = s.getAttribute("style"), { display: a, visibility: o } = $i(i == null ? void 0 : i.value);
    return a === "none" || o === "hidden";
  }, t = r.parent ? $n(r.parent) : !1, n = e(r);
  return t || n;
}
function $n(r) {
  const e = r.cacheGet(hu);
  return e || r.cacheSet(hu, Op(r));
}
function Ol(r) {
  if (r.cacheExists(Rt))
    return !!r.cacheGet(Rt);
  const e = r.meta;
  if (e != null && e.interactive || r.getAttribute("tabindex"))
    return r.cacheSet(Rt, !1);
  const n = r.getAttribute("role");
  return n && (n.value === "presentation" || n.value === "none") ? r.cacheSet(Rt, !0) : r.cacheSet(Rt, !1);
}
const _n = Dt.name, xp = Symbol(`${_n}|html`), qp = Symbol(`${_n}|a11y`), Lp = Symbol(`${_n}|html|ignore-hidden-root`), Bp = Symbol(`${_n}|a11y|ignore-hidden-root`);
var He = /* @__PURE__ */ ((r) => (r[r.EMPTY_TEXT = 0] = "EMPTY_TEXT", r[r.DYNAMIC_TEXT = 1] = "DYNAMIC_TEXT", r[r.STATIC_TEXT = 2] = "STATIC_TEXT", r))(He || {});
function jp(r) {
  const { accessible: e = !1, ignoreHiddenRoot: t = !1 } = r;
  return e && t ? Bp : t ? Lp : e ? qp : xp;
}
function Mp(r) {
  return r.is("select") || r.is("textarea");
}
function Dt(r, e = {}) {
  const { accessible: t = !1, ignoreHiddenRoot: n = !1 } = e, s = jp(e);
  if (r.cacheExists(s))
    return r.cacheGet(s);
  if (!n && xt(r) || !n && t && Ot(r) || Mp(r))
    return r.cacheSet(
      s,
      0
      /* EMPTY_TEXT */
    );
  const i = xl(r, {
    ...e
  });
  return i.some((a) => a.isDynamic) ? r.cacheSet(
    s,
    1
    /* DYNAMIC_TEXT */
  ) : i.some((a) => /\S/.exec(a.textContent) !== null) ? r.cacheSet(
    s,
    2
    /* STATIC_TEXT */
  ) : r.cacheSet(
    s,
    0
    /* EMPTY_TEXT */
  );
}
function xl(r, e) {
  const { accessible: t = !1 } = e;
  let n = [];
  for (const s of r.childNodes)
    if (_i(s))
      n.push(s);
    else if (Si(s)) {
      if (xt(s, !0).bySelf || t && Ot(s, !0).bySelf)
        continue;
      n = n.concat(xl(s, e));
    }
  return n;
}
function Sn(r) {
  const e = r.getAttribute("alt");
  return !e || e.value === null ? !1 : e.isDynamic || e.value.toString() !== "";
}
function mu(r) {
  const e = r.getAttribute("aria-label");
  return !e || e.value === null ? !1 : e.isDynamic || e.value.toString() !== "";
}
function Up(r, e) {
  const t = [[], []];
  return r.reduce((n, s, i) => {
    const a = e(s, i, r);
    return n[a ? 0 : 1].push(s), n;
  }, t);
}
const si = new di({ strict: !0, strictTuples: !0, strictTypes: !0 });
si.addMetaSchema(Ci);
function Vp(r, e) {
  const t = `rule/${r}`, n = si.getSchema(t);
  if (n)
    return n;
  const s = {
    $id: t,
    type: "object",
    additionalProperties: !1,
    properties: e
  };
  return si.compile(s);
}
function Hp(r) {
  return !!(r[0] && r[0].message);
}
function Gp(r) {
  if (Hp(r))
    return r[0];
  {
    const [e, t, n, s] = r;
    return { node: e, message: t, location: n, context: s };
  }
}
class j {
  constructor(e) {
    O(this, "reporter");
    O(this, "parser");
    O(this, "meta");
    O(this, "enabled");
    // rule enabled/disabled, irregardless of severity
    O(this, "blockers");
    O(this, "severity");
    // rule severity
    O(this, "event");
    /**
     * Rule name. Defaults to filename without extension but can be overwritten by
     * subclasses.
     */
    O(this, "name");
    /**
     * Rule options.
     */
    O(this, "options");
    this.reporter = null, this.parser = null, this.meta = null, this.event = null, this.options = e, this.enabled = !0, this.blockers = [], this.severity = rt.DISABLED, this.name = "";
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
    return this.enabled && this.severity >= rt.WARN && (!e || e.ruleEnabled(this.name));
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
    return Fp(this.options, e, t);
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
    const { node: t, message: n, location: s, context: i } = Gp(e), a = this.isEnabled(t), o = this.isBlocked(t), u = this.findLocation({ node: t, location: s, event: this.event });
    if (this.parser.trigger("rule:error", {
      location: u,
      ruleId: this.name,
      enabled: a,
      blockers: this.getBlockers(t)
    }), a && !o) {
      const d = kl(n, i ?? {});
      this.reporter.add(this, d, this.severity, t, u, i);
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
    const u = Vp(t, o);
    if (!u(s)) {
      const l = (u.errors ?? []).map((h) => (h.instancePath = `${n}${h.instancePath}`, h));
      throw new an(i, "Rule configuration error", a, o, l);
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
const zp = {
  allowExternal: !0,
  allowRelative: !0,
  allowAbsolute: !0,
  allowBase: !0
}, Kp = {
  a: "href",
  img: "src",
  link: "href",
  script: "src"
}, Wp = {
  external: "External links are not allowed by current configuration.",
  "relative-base": "Links relative to <base> are not allowed by current configuration.",
  "relative-path": "Relative links are not allowed by current configuration.",
  absolute: "Absolute links are not allowed by current configuration.",
  anchor: null
};
function Ls(r) {
  return typeof r == "boolean" ? r : {
    /* eslint-disable security/detect-non-literal-regexp -- expected to be regexp  */
    include: r.include ? r.include.map((e) => new RegExp(e)) : null,
    exclude: r.exclude ? r.exclude.map((e) => new RegExp(e)) : null
    /* eslint-enable security/detect-non-literal-regexp */
  };
}
function Bs(r, e) {
  var t;
  return !(e.include && !e.include.some((n) => n.test(r)) || (t = e.exclude) != null && t.some((n) => n.test(r)));
}
class Xp extends j {
  constructor(t) {
    super({ ...zp, ...t });
    O(this, "allowExternal");
    O(this, "allowRelative");
    O(this, "allowAbsolute");
    this.allowExternal = Ls(this.options.allowExternal), this.allowRelative = Ls(this.options.allowRelative), this.allowAbsolute = Ls(this.options.allowAbsolute);
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
      description: Wp[t] ?? "This link type is not allowed by current configuration",
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
    if (i instanceof me)
      return !1;
    const a = Kp[n.tagName];
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
    ) : Bs(t, i) || this.report(
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
    ) : Bs(t, i) || this.report(
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
    ), !0) : Bs(t, i) ? !1 : (this.report(
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
const Yp = {
  accessible: !0
};
function Jp(r, e) {
  return e.filter((t) => t.getAttributeValue("href") === r);
}
function pu(r) {
  return r.getAttributeValue("alt");
}
function Qp(r) {
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
class Zp extends j {
  constructor(e) {
    super({ ...Yp, ...e });
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
      description: Qp(e).join(`
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
      if ($m(i))
        return;
      const a = e.getAttributeValue("href");
      (n ? [pu(e)] : Jp(a, t).map(pu)).some(Boolean) || this.report({
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
class eg extends j {
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
const tg = {
  allowAnyNamable: !1
}, rg = [
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
function ng(r, e) {
  return !!(e.attributes["aria-label"] || rg.includes(r.tagName) || r.hasAttribute("role") || r.hasAttribute("tabindex") || e.interactive || e.labelable);
}
class sg extends j {
  constructor(e) {
    super({ ...tg, ...e });
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
    n && (ng(e, n) || this.options.allowAnyNamable && _p(e) === "allowed" || this.report(e, '"aria-label" cannot be used on this element', t.keyLocation));
  }
}
class Ee extends ge {
  constructor(e, t) {
    super(e, t), Error.captureStackTrace(this, Ee), this.name = Ee.name;
  }
}
class ql {
  /**
   * @param style - Name of a valid case style.
   */
  constructor(e, t) {
    O(this, "styles");
    if (Array.isArray(e) || (e = [e]), e.length === 0)
      throw new Ee(`Missing style for ${t} rule`);
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
          throw new Ee(`Invalid style "${n}" for ${t} rule`);
      }
    });
  }
}
const ig = {
  style: "lowercase",
  ignoreForeign: !0
};
class ag extends j {
  constructor(t) {
    super({ ...ig, ...t });
    O(this, "style");
    this.style = new ql(this.options.style, "attr-case");
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
var Q = /* @__PURE__ */ ((r) => (r[r.UNICODE_BOM = 1] = "UNICODE_BOM", r[r.WHITESPACE = 2] = "WHITESPACE", r[r.DOCTYPE_OPEN = 3] = "DOCTYPE_OPEN", r[r.DOCTYPE_VALUE = 4] = "DOCTYPE_VALUE", r[r.DOCTYPE_CLOSE = 5] = "DOCTYPE_CLOSE", r[r.TAG_OPEN = 6] = "TAG_OPEN", r[r.TAG_CLOSE = 7] = "TAG_CLOSE", r[r.ATTR_NAME = 8] = "ATTR_NAME", r[r.ATTR_VALUE = 9] = "ATTR_VALUE", r[r.TEXT = 10] = "TEXT", r[r.TEMPLATING = 11] = "TEMPLATING", r[r.SCRIPT = 12] = "SCRIPT", r[r.STYLE = 13] = "STYLE", r[r.COMMENT = 14] = "COMMENT", r[r.CONDITIONAL = 15] = "CONDITIONAL", r[r.DIRECTIVE = 16] = "DIRECTIVE", r[r.EOF = 17] = "EOF", r))(Q || {});
const og = /^\uFEFF/, Wr = /^(?:\r\n|\r|\n|[ \t]+(?:\r\n|\r|\n)?)/, ug = /^<!(DOCTYPE)\s/i, lg = /^[^>]+/, cg = /^>/, dg = /^<\?xml.*?\?>\s+/, fg = /^<(\/?)([a-zA-Z0-9\-_:]+)/, hg = /^\/?>/, mg = /^[^]*?(?=(?:[ \t]*(?:\r\n|\r|\n)|<[^ ]|$))/, pg = /^(?:<%.*?%>|<\?.*?\?>|<\$.*?\$>)/s, gg = /^[^]*?(?=<|$)/, yg = /^([^\t\r\n\f \/><"'=]+)/, bg = /^(\s*=\s*)'([^']*?)(')/, vg = /^(\s*=\s*)"([^"]*?)(")/, Eg = /^(\s*=\s*)([^\t\r\n\f "'<>][^\t\r\n\f <>]*)/, Dg = /^<!\[CDATA\[/, wg = /^[^]*?]]>/, Ag = /^[^]*?(?=<\/script)/, Cg = /^<(\/)(script)/, $g = /^[^]*?(?=<\/style)/, _g = /^<(\/)(style)/, gu = /^(<!--\s*\[html-validate-)([a-z0-9-]+)(\s*)(.*?)(]?\s*-->)/, yu = /^<!--([^]*?)-->/, bu = /^<!\[([^\]]*?)\]>/;
class en extends Error {
  constructor(t, n) {
    super(n);
    O(this, "location");
    this.location = t;
  }
}
class Ll {
  /* eslint-disable-next-line complexity -- there isn't really a good way to refactor this while keeping readability */
  *tokenize(e) {
    const t = new Tm(e);
    let n = t.state, s = t.string.length;
    for (; t.string.length > 0; ) {
      switch (t.state) {
        case re.INITIAL:
          yield* this.tokenizeInitial(t);
          break;
        case re.DOCTYPE:
          yield* this.tokenizeDoctype(t);
          break;
        case re.TAG:
          yield* this.tokenizeTag(t);
          break;
        case re.ATTR:
          yield* this.tokenizeAttr(t);
          break;
        case re.TEXT:
          yield* this.tokenizeText(t);
          break;
        case re.CDATA:
          yield* this.tokenizeCDATA(t);
          break;
        case re.SCRIPT:
          yield* this.tokenizeScript(t);
          break;
        case re.STYLE:
          yield* this.tokenizeStyle(t);
          break;
        /* istanbul ignore next: sanity check: should not happen unless adding new states */
        default:
          this.unhandled(t);
      }
      t.state === n && t.string.length === s && this.errorStuck(t), n = t.state, s = t.string.length;
    }
    yield this.token(t, Q.EOF, []);
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
    ), n = re[e.state], s = `failed to tokenize ${t}, unhandled state ${n}.`;
    throw new en(e.getLocation(1), s);
  }
  /* istanbul ignore next: used to provide a better error when lexer is detected to be stuck, no known way to reproduce */
  errorStuck(e) {
    const t = re[e.state], n = `failed to tokenize ${e.getTruncatedLine()}, state ${t} failed to consume data or change state.`;
    throw new en(e.getLocation(1), n);
  }
  evalNextState(e, t) {
    return typeof e == "function" ? e(t) : e;
  }
  *match(e, t, n) {
    const s = t.length;
    for (let a = 0; a < s; a++) {
      const [o, u, d] = t[a], l = o ? e.string.match(o) : [""];
      if (l) {
        let h = null;
        d !== !1 && (h = this.token(e, d, l), yield h);
        const y = this.evalNextState(u, h);
        e.consume(l, y), this.enter(e, y, l);
        return;
      }
    }
    const i = `failed to tokenize ${e.getTruncatedLine()}, ${n}.`;
    throw new en(e.getLocation(1), i);
  }
  /**
   * Called when entering a new state.
   */
  enter(e, t, n) {
    t === re.TAG && (n != null && n[0].startsWith("<")) && (n[0] === "<script" ? e.contentModel = gt.SCRIPT : n[0] === "<style" ? e.contentModel = gt.STYLE : e.contentModel = gt.TEXT);
  }
  *tokenizeInitial(e) {
    yield* this.match(
      e,
      [
        [og, re.INITIAL, Q.UNICODE_BOM],
        [dg, re.INITIAL, !1],
        [ug, re.DOCTYPE, Q.DOCTYPE_OPEN],
        [Wr, re.INITIAL, Q.WHITESPACE],
        [gu, re.INITIAL, Q.DIRECTIVE],
        [bu, re.INITIAL, Q.CONDITIONAL],
        [yu, re.INITIAL, Q.COMMENT],
        [!1, re.TEXT, !1]
      ],
      "expected doctype"
    );
  }
  *tokenizeDoctype(e) {
    yield* this.match(
      e,
      [
        [Wr, re.DOCTYPE, Q.WHITESPACE],
        [lg, re.DOCTYPE, Q.DOCTYPE_VALUE],
        [cg, re.TEXT, Q.DOCTYPE_CLOSE]
      ],
      "expected doctype name"
    );
  }
  *tokenizeTag(e) {
    function t(n) {
      const s = n;
      switch (e.contentModel) {
        case gt.TEXT:
          return re.TEXT;
        case gt.SCRIPT:
          return s && !s.data[0].startsWith("/") ? re.SCRIPT : re.TEXT;
        case gt.STYLE:
          return s && !s.data[0].startsWith("/") ? re.STYLE : re.TEXT;
      }
    }
    yield* this.match(
      e,
      [
        [hg, t, Q.TAG_CLOSE],
        [yg, re.ATTR, Q.ATTR_NAME],
        [Wr, re.TAG, Q.WHITESPACE]
      ],
      'expected attribute, ">" or "/>"'
    );
  }
  *tokenizeAttr(e) {
    yield* this.match(
      e,
      [
        [bg, re.TAG, Q.ATTR_VALUE],
        [vg, re.TAG, Q.ATTR_VALUE],
        [Eg, re.TAG, Q.ATTR_VALUE],
        [!1, re.TAG, !1]
      ],
      'expected attribute, ">" or "/>"'
    );
  }
  *tokenizeText(e) {
    yield* this.match(
      e,
      [
        [Wr, re.TEXT, Q.WHITESPACE],
        [Dg, re.CDATA, !1],
        [gu, re.TEXT, Q.DIRECTIVE],
        [bu, re.TEXT, Q.CONDITIONAL],
        [yu, re.TEXT, Q.COMMENT],
        [pg, re.TEXT, Q.TEMPLATING],
        [fg, re.TAG, Q.TAG_OPEN],
        [mg, re.TEXT, Q.TEXT],
        [gg, re.TEXT, Q.TEXT]
      ],
      'expected text or "<"'
    );
  }
  *tokenizeCDATA(e) {
    yield* this.match(e, [[wg, re.TEXT, !1]], "expected ]]>");
  }
  *tokenizeScript(e) {
    yield* this.match(
      e,
      [
        [Cg, re.TAG, Q.TAG_OPEN],
        [Ag, re.SCRIPT, Q.SCRIPT]
      ],
      "expected <\/script>"
    );
  }
  *tokenizeStyle(e) {
    yield* this.match(
      e,
      [
        [_g, re.TAG, Q.TAG_OPEN],
        [$g, re.STYLE, Q.STYLE]
      ],
      "expected </style>"
    );
  }
}
const Sg = /(\s+)/;
class Rg extends j {
  documentation() {
    return {
      description: "Attribute value must not be separated by whitespace.",
      url: "https://html-validate.org/rules/attr-delimiter.html"
    };
  }
  setup() {
    this.on("token", (e) => {
      const { token: t } = e;
      if (t.type !== Q.ATTR_VALUE)
        return;
      const n = t.data[1];
      if (Sg.exec(n)) {
        const i = ve(e.location, 0, n.length);
        this.report(null, "Attribute value must not be delimited by whitespace", i);
      }
    });
  }
}
const Tg = "[a-z0-9-:]+", Ng = {
  pattern: Tg,
  ignoreForeign: !0
};
function Fg(r) {
  return Array.isArray(r) ? new RegExp(`^(${r.join("|")})$`, "i") : new RegExp(`^${r}$`, "i");
}
function Pg(r, e) {
  if (Array.isArray(e)) {
    const t = e.map((n) => `/${n}/`).join(", ");
    return `Attribute "${r}" should match one of [${t}]`;
  } else
    return `Attribute "${r}" should match /${e}/`;
}
function Ig(r, e) {
  return Array.isArray(e) ? [
    `Attribute "${r}" should match one of the configured regular expressions:`,
    "",
    ...e.map((t) => `- \`/${t}/\``)
  ].join(`
`) : `Attribute "${r}" should match the regular expression \`/${e}/\``;
}
class kg extends j {
  constructor(t) {
    super({ ...Ng, ...t });
    O(this, "pattern");
    this.pattern = Fg(this.options.pattern);
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
      description: Ig(t.attr, t.pattern),
      url: "https://html-validate.org/rules/attr-pattern.html"
    };
  }
  setup() {
    this.on("attr", (t) => {
      if (this.isIgnored(t.target) || t.originalAttribute || this.pattern.test(t.key))
        return;
      const n = Pg(t.key, this.options.pattern), s = {
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
const Og = {
  style: "auto",
  unquoted: !1
};
function xg(r) {
  switch (r.error) {
    case "style":
      return `Attribute \`${r.attr}\` must use \`${r.expected}\` instead of \`${r.actual}\`.`;
    case "unquoted":
      return `Attribute \`${r.attr}\` must not be unquoted.`;
  }
}
function qg(r, e) {
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
class Lg extends j {
  constructor(t) {
    super({ ...Og, ...t });
    O(this, "style");
    this.style = Bg(this.options.style);
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
        xg(t),
        "",
        "Under the current configuration attributes must be:",
        "",
        qg(n, s)
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
function Bg(r) {
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
      throw new Ee(`Invalid style "${r}" for "attr-quotes" rule`);
  }
}
class jg extends j {
  documentation() {
    return {
      description: "No space between attributes. At least one whitespace character (commonly space) must be used to separate attributes.",
      url: "https://html-validate.org/rules/attr-spacing.html"
    };
  }
  setup() {
    let e;
    this.on("token", (t) => {
      t.type === Q.ATTR_NAME && e !== Q.WHITESPACE && this.report(null, "No space between attributes", t.location), e = t.type;
    });
  }
}
function Mg(r) {
  const e = {};
  return typeof r.enum < "u" && (e.enum = r.enum), typeof r.boolean < "u" && (e.boolean = r.boolean), e;
}
class Ug extends j {
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
      Ge.depthFirst(t, (n) => {
        const s = n.meta;
        if (s != null && s.attributes)
          for (const i of n.attributes) {
            if (ye.validateAttribute(i, s.attributes))
              continue;
            const a = i.value ? i.value.toString() : "", o = {
              element: n.tagName,
              attribute: i.key,
              value: a,
              allowed: Mg(s.attributes[i.key])
            }, u = this.getMessage(i), d = this.getLocation(i);
            this.report(n, u, d, o);
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
const Vg = {
  style: "omit"
};
class Hg extends j {
  constructor(t) {
    super({ ...Vg, ...t });
    O(this, "hasInvalidStyle");
    this.hasInvalidStyle = Gg(this.options.style);
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
      Ge.depthFirst(n, (s) => {
        const i = s.meta;
        if (i != null && i.attributes)
          for (const a of s.attributes)
            this.isBoolean(a, i.attributes) && (a.originalAttribute || this.hasInvalidStyle(a) && this.report(s, zg(a, this.options.style), a.keyLocation));
      });
    });
  }
  isBoolean(t, n) {
    const s = n[t.key];
    return !!(s != null && s.boolean);
  }
}
function Gg(r) {
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
function zg(r, e) {
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
const Kg = {
  style: "omit"
};
class Wg extends j {
  constructor(t) {
    super({ ...Kg, ...t });
    O(this, "hasInvalidStyle");
    this.hasInvalidStyle = Jg(this.options.style);
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
      Ge.depthFirst(n, (s) => {
        const i = s.meta;
        if (i != null && i.attributes)
          for (const a of s.attributes)
            Xg(a, i.attributes) && Yg(a) && this.hasInvalidStyle(a) && this.report(s, Qg(a, this.options.style), a.keyLocation);
      });
    });
  }
}
function Xg(r, e) {
  const t = e[r.key];
  return !!(t != null && t.omit);
}
function Yg(r) {
  return r.isDynamic ? !1 : r.value === null || r.value === "";
}
function Jg(r) {
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
function Qg(r, e) {
  const t = r.key;
  switch (e.toLowerCase()) {
    case "omit":
      return `Attribute "${t}" should omit value`;
    case "empty":
      return `Attribute "${t}" value should be empty string`;
  }
  return "";
}
function Zg(r) {
  const { tagName: e, attr: t, details: n } = r;
  return `The \`${t}\` attribute cannot be used on \`${e}\` in this context: ${n}`;
}
class ey extends j {
  documentation(e) {
    return {
      description: Zg(e),
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
function ty(r) {
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
function ry(r) {
  return Array.isArray(r) ? r : [r];
}
class It extends j {
  /**
   * @param attr - Attribute holding the value.
   * @param options - Rule options with defaults expanded.
   */
  constructor(t, n) {
    super(n);
    /** Attribute being tested */
    O(this, "attr");
    /** Parsed configured patterns */
    O(this, "patterns");
    const { pattern: s } = this.options;
    this.attr = t, this.patterns = ry(s).map((i) => ty(i));
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
    if (a.some((l) => l.regexp.test(n)))
      return;
    const u = nt(a.map((l) => `"${l.description}"`)), d = a.length === 1 ? `${i} "${n}" does not match the configured pattern ${u}` : `${i} "${n}" does not match either of the configured patterns: ${u}`;
    this.report({
      node: t,
      message: d,
      location: s,
      context: {
        value: n
      }
    });
  }
}
const ny = {
  pattern: "kebabcase"
};
class sy extends It {
  constructor(e) {
    super("class", { ...ny, ...e });
  }
  static schema() {
    return It.schema();
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
      const a = new Je(s, i);
      for (const { item: o, location: u } of a.iterator())
        this.validateValue(t, o, u);
    });
  }
}
class iy extends j {
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
function* ii(r) {
  if (!r)
    return;
  let e = r;
  for (; e && !e.isRootElement(); )
    yield e, e = e.parent;
  e && (yield e);
}
function ay(r, e) {
  for (const t of ii(r))
    if (e(t))
      return t;
  return null;
}
class oy extends j {
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
        for (const i of ii(s))
          i.isRootElement() || e.has(i.unique) || (this.report(i, `Unclosed element '<${i.tagName}>'`, i.location), e.add(i.unique));
    }), this.on("tag:end", (t) => {
      const n = t.target, s = t.previous;
      if (!n || n.voidElement || s.closed === ke.ImplicitClosed)
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
      const i = ay(s.parent, (a) => a.is(n.tagName));
      if (i && !i.isRootElement()) {
        for (const a of ii(s)) {
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
const uy = {
  include: null,
  exclude: null
};
class ly extends j {
  constructor(e) {
    super({ ...uy, ...e });
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
      const i = `The \`<$tagname>\` element is deprecated ${cy(e.source)} and should not be used in new code.`;
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
      const s = ve(e.location, 1);
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
function cy(r) {
  const e = /html(\d)(\d)?/.exec(r);
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
class dy extends j {
  documentation(e) {
    return {
      description: `${e ? `The rule "${e}"` : "This rule"} is deprecated and should not be used any longer, consult documentation for further information.`,
      url: "https://html-validate.org/rules/deprecated-rule.html"
    };
  }
  setup() {
    this.on("config:ready", (e) => {
      for (const t of this.getDeprecatedRules(e))
        t.getSeverity() > rt.DISABLED && this.report(null, `Usage of deprecated rule "${t.name}"`, null, t.name);
    });
  }
  getDeprecatedRules(e) {
    return Object.values(e.rules).filter((n) => n.deprecated);
  }
}
let fy = class extends j {
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
const hy = {
  style: "uppercase"
};
class my extends j {
  constructor(e) {
    super({ ...hy, ...e });
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
const py = {
  style: "lowercase"
};
class gy extends j {
  constructor(t) {
    super({ ...py, ...t });
    O(this, "style");
    this.style = new ql(this.options.style, "element-case");
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
      const i = ve(n, 1);
      this.report(t, `Element "${t.tagName}" should be ${this.style.name}`, i);
    }
  }
  validateMatchingCase(t, n) {
    !t || !n || !t.tagName || !n.tagName || t.tagName.toLowerCase() === n.tagName.toLowerCase() && t.tagName !== n.tagName && this.report(t, "Start and end tag must not differ in casing", n.location);
  }
}
const vu = {
  pattern: "^[a-z][a-z0-9\\-._]*-[a-z0-9\\-._]*$",
  whitelist: [],
  blacklist: []
};
class yy extends j {
  constructor(t) {
    super({ ...vu, ...t });
    O(this, "pattern");
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
    ] : t.pattern !== vu.pattern ? [
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
      const s = n.target, i = s.tagName, a = ve(n.location, 1), o = {
        tagName: i,
        pattern: this.options.pattern,
        blacklist: this.options.blacklist
      };
      this.options.blacklist.includes(i) && this.report(s, `<${i}> element is blacklisted`, a, o), !s.meta && (t.exec(i) || this.options.whitelist.includes(i) || i.match(this.pattern) || this.report(s, `<${i}> is not a valid element name`, a, o));
    });
  }
}
function by(r, e) {
  return typeof e == "boolean" ? r.childElements : r.childElements.filter((t) => e.some((n) => ye.validatePermittedCategory(t, n, !1)));
}
function vy(r) {
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
class Ey extends j {
  documentation(e) {
    return {
      description: vy(e).join(`
`),
      url: "https://html-validate.org/rules/element-permitted-content.html"
    };
  }
  setup() {
    this.on("dom:ready", (e) => {
      const t = e.document;
      Ge.depthFirst(t, (n) => {
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
    if (!ye.validatePermitted(e, n)) {
      const i = `<${e.tagName}>`, a = `${i} element is not permitted as content under ${t.annotatedName}`, o = {
        kind: "content",
        parent: t.annotatedName,
        child: i
      };
      return this.report(e, a, null, o), !0;
    }
    return (s = e.meta) != null && s.transparent ? by(e, e.meta.transparent).map((a) => this.validatePermittedContentImpl(a, t, n)).some(Boolean) : !1;
  }
  validatePermittedDescendant(e, t) {
    for (let n = t; n && !n.isRootElement(); n = /* istanbul ignore next */
    n.parent ?? null) {
      const s = n.meta;
      if (!s)
        continue;
      const i = s.permittedDescendants;
      if (!i || ye.validatePermitted(e, i))
        continue;
      const a = `<${e.tagName}>`, o = n.annotatedName, u = `${a} element is not permitted as a descendant of ${o}`, d = {
        kind: "descendant",
        ancestor: o,
        child: a
      };
      return this.report(e, u, null, d), !0;
    }
    return !1;
  }
}
class Dy extends j {
  documentation() {
    return {
      description: "Some elements may only be used a fixed amount of times in given context.",
      url: "https://html-validate.org/rules/element-permitted-occurrences.html"
    };
  }
  setup() {
    this.on("dom:ready", (e) => {
      const t = e.document;
      Ge.depthFirst(t, (n) => {
        if (!n.meta)
          return;
        const s = n.meta.permittedContent;
        s && ye.validateOccurrences(
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
class wy extends j {
  documentation() {
    return {
      description: "Some elements has a specific order the children must use.",
      url: "https://html-validate.org/rules/element-permitted-order.html"
    };
  }
  setup() {
    this.on("dom:ready", (e) => {
      const t = e.document;
      Ge.depthFirst(t, (n) => {
        if (!n.meta)
          return;
        const s = n.meta.permittedOrder;
        s && ye.validateOrder(
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
function Ti(r) {
  return typeof r == "string";
}
function Bl(r) {
  return r.startsWith("@");
}
function Ay(r) {
  return Bl(r) ? r.slice(1) : `<${r}>`;
}
function jl(r) {
  return r.length > 0 && r.every(Ti);
}
function Cy(r) {
  const { child: e, parent: t, rules: n } = r, s = `The \`${e}\` element cannot have a \`${t}\` element as parent.`;
  if (jl(n)) {
    const i = n.filter(Ti).map((a) => Bl(a) ? `- any ${a.slice(1)} element` : `- \`<${a}>\``);
    return [s, "", "Allowed parents one of:", "", ...i];
  } else
    return [s];
}
function $y(r, e, t) {
  const n = r.annotatedName, s = e.annotatedName;
  if (!jl(t))
    return `${n} element cannot have ${s} element as parent`;
  const i = nt(t.filter(Ti).map(Ay));
  return `${n} element requires a ${i} element as parent`;
}
class _y extends j {
  documentation(e) {
    return {
      description: Cy(e).join(`
`),
      url: "https://html-validate.org/rules/element-permitted-parent.html"
    };
  }
  setup() {
    this.on("dom:ready", (e) => {
      const t = e.document;
      Ge.depthFirst(t, (n) => {
        var u;
        const s = n.parent;
        if (!s || s.isRootElement() || s.tagName === n.tagName)
          return;
        const i = (u = n.meta) == null ? void 0 : u.permittedParent;
        if (!i)
          return !1;
        if (ye.validatePermitted(s, i))
          return;
        const a = $y(n, s, i), o = {
          parent: s.annotatedName,
          child: n.annotatedName,
          rules: i
        };
        this.report(n, a, null, o);
      });
    });
  }
}
function Sy(r) {
  return !!/^[a-zA-Z0-9-]+$/.exec(r);
}
function Ry(r) {
  const e = r.ancestor.map((t) => `\`${t}\``);
  return [`The \`${r.child}\` element requires a ${nt(e)} ancestor.`];
}
class Ty extends j {
  documentation(e) {
    return {
      description: Ry(e).join(`
`),
      url: "https://html-validate.org/rules/element-required-ancestor.html"
    };
  }
  setup() {
    this.on("dom:ready", (e) => {
      const t = e.document;
      Ge.depthFirst(t, (n) => {
        n.parent && this.validateRequiredAncestors(n);
      });
    });
  }
  validateRequiredAncestors(e) {
    if (!e.meta)
      return;
    const t = e.meta.requiredAncestors;
    if (!t || ye.validateAncestors(e, t))
      return;
    const n = t.map((o) => Sy(o) ? `<${o}>` : `"${o}"`), s = `<${e.tagName}>`, i = `<${e.tagName}> element requires a ${nt(n)} ancestor`, a = {
      ancestor: n,
      child: s
    };
    this.report(e, i, null, a);
  }
}
class Ny extends j {
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
function Fy(r) {
  return r.startsWith("@");
}
class Py extends j {
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
      Ge.depthFirst(t, (n) => {
        if (!n.meta)
          return;
        const s = n.meta.requiredContent;
        if (s)
          for (const i of ye.validateRequiredContent(n, s)) {
            const a = {
              element: n.annotatedName,
              missing: `<${i}>`
            }, o = Fy(i) ? `${i.slice(1)} element` : `<${i}>`, u = `${n.annotatedName} element must have ${o} as content`;
            this.report(n, u, null, a);
          }
      });
    });
  }
}
const Iy = ["h1", "h2", "h3", "h4", "h5", "h6"].join(",");
function ky(r) {
  return r.is("img") ? Sn(r) : r.is("svg") ? r.textContent.trim() !== "" : !1;
}
class Oy extends j {
  documentation() {
    return {
      description: "Assistive technology such as screen readers require textual content in headings. Whitespace only is considered empty.",
      url: "https://html-validate.org/rules/empty-heading.html"
    };
  }
  setup() {
    this.on("dom:ready", ({ document: e }) => {
      const t = e.querySelectorAll(Iy);
      for (const n of t)
        this.validateHeading(n);
    });
  }
  validateHeading(e) {
    const t = e.querySelectorAll("img, svg");
    for (const n of t)
      if (ky(n))
        return;
    switch (Dt(e, { ignoreHiddenRoot: !0 })) {
      case He.DYNAMIC_TEXT:
      case He.STATIC_TEXT:
        break;
      case He.EMPTY_TEXT:
        this.report(e, `<${e.tagName}> cannot be empty, must have text content`);
        break;
    }
  }
}
class xy extends j {
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
        switch (Dt(t)) {
          case He.DYNAMIC_TEXT:
          case He.STATIC_TEXT:
            break;
          case He.EMPTY_TEXT:
            {
              const n = `<${t.tagName}> cannot be empty, must have text content`;
              this.report(t, n, t.location);
            }
            break;
        }
    });
  }
}
const qy = {
  allowArrayBrackets: !0,
  allowCheckboxDefault: !0,
  shared: ["radio", "button", "reset", "submit"]
}, Eu = Symbol("form-elements-unique"), Du = Symbol("form-elements-shared");
function wu(r) {
  return typeof r == "string" && r !== "";
}
function Ly(r, e) {
  const t = r.getAttribute("type");
  return !!(t != null && t.valueMatches(e, !1));
}
function By(r) {
  return r.is("input") && r.getAttributeValue("type") === "hidden";
}
function jy(r) {
  return r.is("input") && r.getAttributeValue("type") === "checkbox";
}
function My(r, e, t) {
  const { allowCheckboxDefault: n } = t;
  return !(!n || !e.potentialHiddenDefault || !jy(r));
}
function Uy(r) {
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
class Vy extends j {
  constructor(e) {
    super({ ...qy, ...e });
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
      description: Uy(e),
      url: "https://html-validate.org/rules/form-dup-name.html"
    };
  }
  setup() {
    const e = this.getSelector(), { shared: t } = this.options;
    this.on("dom:ready", (n) => {
      const { document: s } = n, i = s.querySelectorAll(e), [a, o] = Up(i, (u) => Ly(u, t));
      for (const u of o) {
        const d = u.getAttribute("name"), l = d == null ? void 0 : d.value;
        if (!d || !wu(l))
          continue;
        const h = u.closest("form, template") ?? s.root;
        this.validateUniqueName(u, h, d, l);
      }
      for (const u of a) {
        const d = u.getAttribute("name"), l = d == null ? void 0 : d.value;
        if (!d || !wu(l))
          continue;
        const h = u.closest("form, template") ?? s.root;
        this.validateSharedName(u, h, d, l);
      }
    });
  }
  validateUniqueName(e, t, n, s) {
    const i = this.getUniqueElements(t), { allowArrayBrackets: a } = this.options;
    if (a) {
      const u = s.endsWith("[]"), d = u ? s.slice(0, -2) : s, l = i.get(d);
      if (l && l.array !== u) {
        const h = {
          name: d,
          kind: "mix"
        };
        this.report({
          node: e,
          location: n.valueLocation,
          message: 'Cannot mix "{{ name }}[]" and "{{ name }}"',
          context: h
        });
        return;
      }
      if (!l && u && i.set(d, {
        array: !0,
        potentialHiddenDefault: !1
      }), u)
        return;
    }
    const o = i.get(s);
    if (o) {
      if (My(e, o, this.options)) {
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
        potentialHiddenDefault: By(e)
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
    const t = e.cacheGet(Eu);
    if (t)
      return t;
    {
      const n = /* @__PURE__ */ new Map();
      return e.cacheSet(Eu, n), n;
    }
  }
  getSharedElements(e) {
    const t = e.cacheGet(Du);
    if (t)
      return t;
    {
      const n = /* @__PURE__ */ new Map();
      return e.cacheSet(Du, n), n;
    }
  }
}
const Hy = {
  allowMultipleH1: !1,
  minInitialRank: "h1",
  sectioningRoots: ["dialog", '[role="dialog"]', '[role="alertdialog"]']
};
function Gy(r) {
  var t;
  return !!((t = r.target.meta) != null && t.heading);
}
function zy(r) {
  const e = /^[hH](\d)$/.exec(r.tagName);
  return e ? parseInt(e[1], 10) : null;
}
function Ky(r) {
  if (r === !1 || r === "any")
    return 6;
  const e = /^h(\d)$/.exec(r);
  return e ? parseInt(e[1], 10) : 1;
}
class Wy extends j {
  constructor(t) {
    super({ ...Hy, ...t });
    O(this, "minInitialRank");
    O(this, "sectionRoots");
    O(this, "stack", []);
    this.minInitialRank = Ky(this.options.minInitialRank), this.sectionRoots = this.options.sectioningRoots.map((n) => new Pl(n)), this.stack.push({
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
    this.on("tag:start", Gy, (t) => {
      this.onTagStart(t);
    }), this.on("tag:ready", (t) => {
      this.onTagReady(t);
    }), this.on("tag:end", (t) => {
      this.onTagClose(t);
    });
  }
  onTagStart(t) {
    const n = zy(t.target);
    if (!n) return;
    const s = this.getCurrentRoot();
    if (!this.options.allowMultipleH1 && n === 1) {
      if (s.h1Count >= 1) {
        const i = ve(t.location, 1);
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
    const o = ve(n.location, 1);
    if (t.current > 0) {
      const u = `<h${String(i)}>`, d = `<h${String(s)}>`, l = `Heading level can only increase by one, expected ${u} but got ${d}`;
      this.report(n.target, l, o);
    } else
      this.checkInitialLevel(n, o, s, i);
  }
  checkInitialLevel(t, n, s, i) {
    const a = `<h${String(i)}>`, o = `<h${String(s)}>`;
    if (this.stack.length === 1) {
      const u = this.minInitialRank > 1 ? `Initial heading level must be <h${String(this.minInitialRank)}> or higher rank but got ${o}` : `Initial heading level must be ${a} but got ${o}`;
      this.report(t.target, u, n);
    } else {
      const d = this.getPrevRoot().current + 1;
      if (s > d)
        if (i === d) {
          const l = `Initial heading level for sectioning root must be ${a} but got ${o}`;
          this.report(t.target, l, n);
        } else {
          const l = `Initial heading level for sectioning root must be between ${a} and <h${String(d)}> but got ${o}`;
          this.report(t.target, l, n);
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
const Au = Symbol(Ml.name);
function Xy(r, e) {
  var s;
  return (s = e.formAssociated) != null && s.disablable ? !!(r.matches("[disabled]") || r.closest("fieldset[disabled]")) : !1;
}
function Yy(r) {
  if (xt(r) || Cn(r) || $n(r))
    return !1;
  const { tabIndex: e, meta: t } = r;
  return e !== null ? e >= 0 : !t || Xy(r, t) ? !1 : !!t.focusable;
}
function Ml(r) {
  const e = r.cacheGet(Au);
  return e || r.cacheSet(Au, Yy(r));
}
class Jy extends j {
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
        Ml(i) && Ot(i) && this.reportElement(i);
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
const Qy = {
  pattern: "kebabcase"
};
class Zy extends It {
  constructor(e) {
    super("id", { ...Qy, ...e });
  }
  static schema() {
    return It.schema();
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
      n.toLowerCase() === "id" && (s instanceof me || s !== null && this.validateValue(t, s, i));
    });
  }
}
const Cu = /* @__PURE__ */ new Map([
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
function eb(r) {
  const { target: e } = r;
  return e.is("input");
}
class tb extends j {
  documentation(e) {
    var o;
    const { attribute: t, type: n } = e, s = `Attribute \`${t}\` is not allowed on \`<input type="${n}">\`
`, i = `\`${t}\` can only be used when \`type\` is:`, a = ((o = Cu.get(t)) == null ? void 0 : o.map((u) => `- \`${u}\``)) ?? [];
    return {
      description: [s, i, ...a].join(`
`),
      url: "https://html-validate.org/rules/input-attributes.html"
    };
  }
  setup() {
    this.on("tag:ready", eb, (e) => {
      const { target: t } = e, n = t.getAttribute("type");
      if (!n || n.isDynamic || !n.value)
        return;
      const s = n.value.toString();
      for (const i of t.attributes) {
        const a = Cu.get(i.key);
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
const js = Symbol(ai.name);
function rb(r, e) {
  const { reference: t } = e;
  return t != null && t.isSameNode(r) ? !1 : !lt(r);
}
function nb(r, e) {
  if (r.is("img"))
    return Sn(r);
  if (r.is("svg"))
    return r.textContent.trim() !== "";
  for (const t of r.querySelectorAll("img, svg"))
    if (Ni(t, e))
      return !0;
  return !1;
}
function sb(r) {
  return !!(r.getAttributeValue("aria-label") ?? "").trim();
}
function ib(r, e) {
  const { document: t, reference: n } = e;
  if (n)
    return !1;
  const s = r.ariaLabelledby;
  return s instanceof me ? !0 : s === null ? !1 : s.some((i) => {
    const a = An(i);
    return t.querySelectorAll(a).some((o) => Ni(o, {
      document: t,
      reference: o
    }));
  });
}
function Ni(r, e) {
  const { reference: t } = e;
  if (rb(r, e))
    return !1;
  const n = !!(t != null && t.isSameNode(r));
  return !!(Dt(r, { accessible: !0, ignoreHiddenRoot: n }) !== He.EMPTY_TEXT || nb(r, e) || sb(r) || ib(r, e));
}
function ai(r, e) {
  if (e.cacheExists(js))
    return !!e.cacheGet(js);
  const t = Ni(e, {
    document: r,
    reference: null
  });
  return e.cacheSet(js, t);
}
function ab(r) {
  var e;
  if (r.is("input")) {
    const t = (e = r.getAttributeValue("type")) == null ? void 0 : e.toLowerCase();
    return !!(t && ["hidden", "submit", "reset", "button"].includes(t));
  }
  return !1;
}
class ob extends j {
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
    if (!lt(t) || ab(t) || ai(e, t))
      return;
    let n = [];
    if ((n = ub(e, t.id)).length > 0) {
      this.validateLabel(e, t, n);
      return;
    }
    if ((n = lb(t)).length > 0) {
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
    if (n.filter(lt).length === 0) {
      this.report(t, `<${t.tagName}> element has <label> but <label> element is hidden`);
      return;
    }
    n.some((i) => ai(e, i)) || this.report(t, `<${t.tagName}> element has <label> but <label> has no text`);
  }
}
function ub(r, e) {
  return e ? r.querySelectorAll(`label[for="${e}"]`) : [];
}
function lb(r) {
  let e = r.parent;
  for (; e; ) {
    if (e.is("label"))
      return [e];
    e = e.parent;
  }
  return [];
}
const cb = {
  maxlength: 70
};
class db extends j {
  constructor(t) {
    super({ ...cb, ...t });
    O(this, "maxlength");
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
const fb = {
  allowLongDelay: !1
};
class hb extends j {
  constructor(e) {
    super({ ...fb, ...e });
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
      const s = n.valueLocation, i = mb(n.value.toString());
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
function mb(r) {
  const e = /^(\d+)(?:\s*;\s*url=(.*))?/i.exec(r);
  return e ? {
    delay: parseInt(e[1], 10),
    url: e[2]
  } : null;
}
function pb(r) {
  const e = r.value;
  return !e || e instanceof me ? null : e;
}
class gb extends j {
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
        const o = pb(a);
        o && (s.has(o) && this.report({
          node: i,
          message: "<map> name must be unique",
          location: a.keyLocation
        }), s.add(o));
      }
    });
  }
}
function yb(r) {
  return r.target.is("map");
}
function $u(r) {
  return !!(r && !(r.value instanceof me));
}
class bb extends j {
  documentation() {
    return {
      description: "When the `id` attribute is present on a `<map>` element it must be equal to the `name` attribute.",
      url: "https://html-validate.org/rules/map-id-name.html"
    };
  }
  setup() {
    this.on("tag:ready", yb, (e) => {
      const { target: t } = e, n = t.getAttribute("id"), s = t.getAttribute("name");
      !$u(n) || !$u(s) || n.value !== s.value && this.report({
        node: e.target,
        message: '"id" and "name" attribute must be the same on <map> elements',
        location: n.valueLocation ?? s.valueLocation
      });
    });
  }
}
class vb extends j {
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
class Eb extends j {
  constructor() {
    super(...arguments);
    O(this, "labelable", "");
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
const Db = {
  pattern: "camelcase"
};
class wb extends It {
  constructor(e) {
    super("name", { ...Db, ...e });
  }
  static schema() {
    return It.schema();
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
      if (!((u = a == null ? void 0 : a.formAssociated) != null && u.listed) || n.toLowerCase() !== "name" || s instanceof me || s === null)
        return;
      const o = s.endsWith("[]") ? s.slice(0, -2) : s;
      this.validateValue(t, o, i);
    });
  }
}
const _u = [
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
function Ab(r) {
  return r.key === "role";
}
class Cb extends j {
  documentation(e) {
    return {
      description: [
        `Role \`"${e.role}"\` is abstract and must not be used.`,
        "",
        "WAI-ARIA defines a list of [abstract roles](https://www.w3.org/TR/wai-aria-1.2/#abstract_roles) which cannot be used by authors:",
        "",
        ..._u.map((t) => `- \`"${t}"\``),
        "",
        `Use one of the defined subclass roles for \`"${e.role}"\` instead.`
      ].join(`
`),
      url: "https://html-validate.org/rules/no-abstract-role.html"
    };
  }
  setup() {
    this.on("attr", Ab, (e) => {
      const t = e.value;
      if (!t || t instanceof me)
        return;
      const n = new Je(t, e.valueLocation);
      for (const { item: s, location: i } of n.iterator())
        _u.includes(s) && this.report({
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
const $b = {
  include: null,
  exclude: null
};
class _b extends j {
  constructor(e) {
    super({ ...$b, ...e });
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
      if (e.key.toLowerCase() !== "autoplay" || e.value && e.value instanceof me)
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
class Sb extends j {
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
class Rb extends j {
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
class Tb extends j {
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
class Nb extends j {
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
      const t = new Je(e.value, e.valueLocation), n = /* @__PURE__ */ new Set();
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
const Su = Symbol("no-dup-id");
class Fb extends j {
  documentation() {
    return {
      description: "The ID of an element must be unique.",
      url: "https://html-validate.org/rules/no-dup-id.html"
    };
  }
  setup() {
    this.on("dom:ready", (e) => {
      const { document: t } = e, n = Ru(t.root, t.root), s = !t.querySelector("template"), i = t.querySelectorAll("[id]");
      for (const a of i) {
        const o = a.getAttribute("id");
        if (!o || !o.value || o.isDynamic)
          continue;
        const u = o.value.toString(), d = s ? n : Ru(a, t.root);
        if (d.has(u)) {
          this.report(a, `Duplicate ID "${u}"`, o.valueLocation);
          continue;
        }
        d.add(u);
      }
    });
  }
}
function Ru(r, e) {
  const t = r.closest("template") ?? e, n = t.cacheGet(Su);
  if (n)
    return n;
  {
    const s = /* @__PURE__ */ new Set();
    return t.cacheSet(Su, s);
  }
}
function Pb(r) {
  return r.target.is("button");
}
class Ib extends j {
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
    this.on("element:ready", Pb, (e) => {
      const { target: t } = e;
      t.getAttribute("type") || this.report({
        node: e.target,
        message: '<button> is missing recommended "type" attribute'
      });
    });
  }
}
function kb(r) {
  return r.target.is("input");
}
class Ob extends j {
  documentation() {
    return {
      description: ["`<input>` is missing recommended `type` attribute"].join(`
`),
      url: "https://html-validate.org/rules/no-implicit-input-type.html"
    };
  }
  setup() {
    this.on("element:ready", kb, (e) => {
      const { target: t } = e;
      t.getAttribute("type") || this.report({
        node: e.target,
        message: '<input> is missing recommended "type" attribute'
      });
    });
  }
}
class xb extends j {
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
      if (!n || t.closed !== ke.ImplicitClosed)
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
const qb = {
  include: null,
  exclude: null,
  allowedProperties: ["display"]
};
class Lb extends j {
  constructor(e) {
    super({ ...qb, ...e });
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
    const n = Object.keys($i(e));
    return n.length > 0 && n.every((s) => t.includes(s));
  }
}
const Bb = [
  { property: "aria-activedescendant", isList: !1 },
  { property: "aria-controls", isList: !0 },
  { property: "aria-describedby", isList: !0 },
  { property: "aria-details", isList: !1 },
  { property: "aria-errormessage", isList: !1 },
  { property: "aria-flowto", isList: !0 },
  { property: "aria-labelledby", isList: !0 },
  { property: "aria-owns", isList: !0 }
];
function Tu(r, e) {
  return r.querySelectorAll(An(e)).length === 0;
}
class jb extends j {
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
      for (const { property: n, isList: s } of Bb)
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
    i instanceof me || i === null || i === "" || (s ? this.validateList(e, t, n, i) : this.validateSingle(e, t, n, i));
  }
  validateSingle(e, t, n, s) {
    if (Tu(e, s)) {
      const i = { key: n.key, value: s };
      this.report(t, `Element references missing id "${s}"`, n.valueLocation, i);
    }
  }
  validateList(e, t, n, s) {
    const i = new Je(s, n.valueLocation);
    for (const a of i.iterator()) {
      const o = a.item;
      if (Tu(e, o)) {
        const u = { key: n.key, value: o };
        this.report(t, `Element references missing id "${o}"`, a.location, u);
      }
    }
  }
}
class Mb extends j {
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
const Ub = {
  relaxed: !1
}, Vb = /([<>]|&(?![a-zA-Z0-9#]+;))/g, Hb = /([<>"'=`]|&(?![a-zA-Z0-9#]+;))/g, Gb = /^(<%.*?%>|<\?.*?\?>|<\$.*?\$>)$/s, zb = {
  '"': "&quot;",
  "&": "&amp;",
  "'": "&apos;",
  "<": "&lt;",
  "=": "&equals;",
  ">": "&gt;",
  "`": "&grave;"
};
class Kb extends j {
  constructor(t) {
    super({ ...Ub, ...t });
    O(this, "relaxed");
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
        s.nodeType === Ye.TEXT_NODE && (Gb.exec(s.textContent) || this.findRawChars(n, s.textContent, s.location, Vb));
    }), this.on("attr", (t) => {
      t.value && (t.quote || this.findRawChars(
        t.target,
        t.value.toString(),
        t.valueLocation,
        // eslint-disable-line @typescript-eslint/no-non-null-assertion -- technical debt, valueLocation is always set if a value is provided
        Hb
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
        const u = zb[o], d = ve(s, a.index, a.index + 1);
        this.report(t, `Raw "${o}" must be encoded as "${u}"`, d);
      }
    while (a);
  }
}
const Wb = ["input[aria-label]", "textarea[aria-label]", "select[aria-label]"];
class Xb extends j {
  documentation() {
    return {
      description: "`aria-label` is redundant when an associated `<label>` element containing the same text exists.",
      url: "https://html-validate.org/rules/no-redundant-aria-label.html"
    };
  }
  setup() {
    this.on("dom:ready", (e) => {
      const { document: t } = e, n = t.querySelectorAll(Wb.join(","));
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
class Yb extends j {
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
      if (!n || !Cm(n))
        return;
      const s = n.value;
      !s || !t.querySelector(An(s)) || this.report(t, 'Redundant "for" attribute', n.keyLocation);
    });
  }
}
class Jb extends j {
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
      if (!(n != null && n.value) || n.value instanceof me)
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
const Qb = /^(.+):.+$/, Zb = {
  ignoreForeign: !0,
  ignoreXML: !0
};
class e0 extends j {
  constructor(e) {
    super({ ...Zb, ...e });
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
      t0(t, this.options) && this.validateElement(t);
    });
  }
  validateElement(e) {
    e.closed === ke.VoidSelfClosed && this.report(e, `<${e.tagName}> must not be self-closed`, null, e.tagName);
  }
}
function t0(r, e) {
  return Qb.exec(r.tagName) ? !e.ignoreXML : r.meta ? r.meta.void ? !1 : r.meta.foreign ? !e.ignoreForeign : !0 : !0;
}
class r0 extends j {
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
class n0 extends j {
  documentation() {
    return {
      description: "Lines with trailing whitespace cause unnessecary diff when using version control and usually serve no special purpose in HTML.",
      url: "https://html-validate.org/rules/no-trailing-whitespace.html"
    };
  }
  setup() {
    this.on("whitespace", (e) => {
      /^[ \t]+\r?\n$/.exec(e.text) && this.report(null, "Trailing whitespace", e.location);
    });
  }
}
const s0 = {
  include: null,
  exclude: null
};
class i0 extends j {
  constructor(e) {
    super({ ...s0, ...e });
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
      t.meta || this.isKeywordIgnored(t.tagName, Np) || this.report(t, `Unknown element <${t.tagName}>`, null, t.tagName);
    });
  }
}
class a0 extends j {
  documentation(e) {
    return {
      description: `\`${e.ruleId}\` rule is disabled but no error was reported.`,
      url: "https://html-validate.org/rules/no-unused-disable.html"
    };
  }
  setup() {
  }
  reportUnused(e, t, n) {
    const s = new Je(t.replace(/,/g, " "), n);
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
class o0 extends j {
  documentation() {
    return {
      description: "This file is saved with the UTF-8 byte order mark (BOM) present. It is neither required or recommended to use.\n\nInstead the document should be served with the `Content-Type: application/javascript; charset=utf-8` header.",
      url: "https://html-validate.org/rules/no-utf8-bom.html"
    };
  }
  setup() {
    const e = this.on("token", (t) => {
      t.type === Q.UNICODE_BOM && this.report(null, "File should be saved without UTF-8 BOM", t.location), this.setEnabled(!1), e();
    });
  }
}
const u0 = ["button", "submit", "reset", "image"], l0 = {
  button: '<button type="button">',
  submit: '<button type="submit">',
  reset: '<button type="reset">',
  image: '<button type="button">'
}, c0 = {
  include: null,
  exclude: null
};
class d0 extends j {
  constructor(e) {
    super({ ...c0, ...e });
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
      description: `Prefer to use \`${l0[e.type] || "<button>"}\` instead of \`"${t}\`.`,
      url: "https://html-validate.org/rules/prefer-button.html"
    };
  }
  setup() {
    this.on("attr", (e) => {
      const t = e.target;
      if (t.tagName.toLowerCase() !== "input" || e.key.toLowerCase() !== "type" || !e.value || e.value instanceof me)
        return;
      const n = e.value.toLowerCase();
      if (this.isKeywordIgnored(n) || !u0.includes(n))
        return;
      const s = { type: n }, i = `Prefer to use <button> instead of <input type="${n}"> when adding buttons`;
      this.report(t, i, e.valueLocation, s);
    });
  }
}
const f0 = {
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
class h0 extends j {
  constructor(e) {
    super({ ...f0, ...e });
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
      if (t.key.toLowerCase() !== "role" || !t.value || t.value instanceof me)
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
class m0 extends j {
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
const p0 = {
  tags: ["script", "style"]
};
class g0 extends j {
  constructor(e) {
    super({ ...p0, ...e });
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
const y0 = {
  target: "all",
  include: null,
  exclude: null
}, b0 = new RegExp("^(\\w+://|//)"), Nu = {
  link: "href",
  script: "src"
}, v0 = ["stylesheet", "preload", "modulepreload"], E0 = ["style", "script"];
function D0(r) {
  const e = r.getAttribute("rel");
  if (typeof (e == null ? void 0 : e.value) != "string" || !v0.includes(e.value))
    return !1;
  if (e.value === "preload") {
    const t = r.getAttribute("as");
    return typeof (t == null ? void 0 : t.value) == "string" && E0.includes(t.value);
  }
  return !0;
}
class w0 extends j {
  constructor(t) {
    super({ ...y0, ...t });
    O(this, "target");
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
    return Object.keys(Nu).includes(t.tagName);
  }
  needSri(t) {
    if (t.is("link") && !D0(t))
      return !1;
    const n = this.elementSourceAttr(t);
    if (!n || n.value === null || n.value === "" || n.isDynamic)
      return !1;
    const s = n.value.toString();
    return this.target === "all" || b0.test(s) ? !this.isIgnored(s) : !1;
  }
  elementSourceAttr(t) {
    const n = Nu[t.tagName];
    return t.getAttribute(n);
  }
  isIgnored(t) {
    return this.isKeywordIgnored(t, (n, s) => n.some((i) => s.includes(i)));
  }
}
class A0 extends j {
  documentation() {
    return {
      description: "The end tag for `<script>` is a hard requirement and must never be omitted even when using the `src` attribute.",
      url: "https://html-validate.org/rules/script-element.html"
    };
  }
  setup() {
    this.on("tag:end", (e) => {
      const t = e.target;
      !t || t.tagName !== "script" || t.closed !== ke.EndTag && this.report(t, `End tag for <${t.tagName}> must not be omitted`);
    });
  }
}
const C0 = [
  "",
  "application/ecmascript",
  "application/javascript",
  "text/ecmascript",
  "text/javascript"
];
class $0 extends j {
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
    return C0.includes(t);
  }
}
class _0 extends j {
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
const S0 = {
  characters: [
    { pattern: " ", replacement: "&nbsp;", description: "non-breaking space" },
    { pattern: "-", replacement: "&#8209;", description: "non-breaking hyphen" }
  ],
  ignoreClasses: [],
  ignoreStyle: !0
};
function R0(r) {
  const t = `(${r.map((n) => n.pattern).join("|")})`;
  return new RegExp(t, "g");
}
function T0(r) {
  const e = /^(\s*)(.*)$/.exec(r.textContent), [, t, n] = e;
  return [t.length, n.trimEnd()];
}
function N0(r, e) {
  const t = new RegExp(e), n = [];
  let s;
  for (; s = t.exec(r); )
    n.push(s);
  return n;
}
class F0 extends j {
  constructor(t) {
    super({ ...S0, ...t });
    O(this, "regex");
    this.regex = R0(this.options.characters);
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
      _i(s) ? this.detectDisallowed(t, s) : Si(s) && this.walk(t, s);
  }
  detectDisallowed(t, n) {
    const [s, i] = T0(n), a = N0(i, this.regex);
    for (const o of a) {
      const u = o[0], d = this.options.characters.find((g) => g.pattern === u);
      if (!d)
        throw new Error(`Failed to find entry for "${u}" when searching text "${i}"`);
      const l = `"${u}" should be replaced with "${d.replacement}" (${d.description}) in telephone number`, h = s + o.index, y = h + u.length, v = ve(n.location, h, y), A = d;
      this.report(t, l, v, A);
    }
  }
}
function Ms(r, e) {
  const t = r.getAttribute(e);
  return !!(t != null && t.valueMatches(/.+/, !0));
}
function P0(r) {
  if (!r.is("input") || r.hasAttribute("value"))
    return !1;
  const e = r.getAttribute("type");
  return !!(e != null && e.valueMatches(/submit|reset/, !1));
}
function I0(r) {
  return _i(r) ? r.isDynamic || r.textContent.trim() !== "" : !1;
}
function Ul(r) {
  return lt(r) ? r.childNodes.some((t) => I0(t)) || Ms(r, "aria-label") || Ms(r, "aria-labelledby") || r.is("img") && Ms(r, "alt") || P0(r) ? !0 : r.childElements.some((t) => Ul(t)) : !1;
}
class Fi extends j {
  documentation(e) {
    const t = {
      description: "The textual content for this element is not valid.",
      url: "https://html-validate.org/rules/text-content.html"
    };
    switch (e.textContent) {
      case it.NONE:
        t.description = `The \`<${e.tagName}>\` element must not have textual content.`;
        break;
      case it.REQUIRED:
        t.description = `The \`<${e.tagName}>\` element must have textual content.`;
        break;
      case it.ACCESSIBLE:
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
    return !(!n || n === it.DEFAULT);
  }
  setup() {
    this.on("element:ready", Fi.filter, (e) => {
      const t = e.target, { textContent: n } = t.meta;
      switch (n) {
        case it.NONE:
          this.validateNone(t);
          break;
        case it.REQUIRED:
          this.validateRequired(t);
          break;
        case it.ACCESSIBLE:
          this.validateAccessible(t);
          break;
      }
    });
  }
  /**
   * Validate element has empty text (inter-element whitespace is not considered text)
   */
  validateNone(e) {
    Dt(e) !== He.EMPTY_TEXT && this.reportError(e, e.meta, `${e.annotatedName} must not have text content`);
  }
  /**
   * Validate element has any text (inter-element whitespace is not considered text)
   */
  validateRequired(e) {
    Dt(e) === He.EMPTY_TEXT && this.reportError(e, e.meta, `${e.annotatedName} must have text content`);
  }
  /**
   * Validate element has accessible text (either regular text or text only
   * exposed in accessibility tree via aria-label or similar)
   */
  validateAccessible(e) {
    lt(e) && (Ul(e) || this.reportError(e, e.meta, `${e.annotatedName} must have accessible text`));
  }
  reportError(e, t, n) {
    this.report(e, n, null, {
      tagName: e.tagName,
      textContent: t.textContent
    });
  }
}
const Vl = ["complementary", "contentinfo", "form", "banner", "main", "navigation", "region"], k0 = [
  "aside",
  "footer",
  "form",
  "header",
  "main",
  "nav",
  "section",
  ...Vl.map((r) => `[role="${r}"]`)
  /* <search> does not (yet?) require a unique name */
];
function O0(r, e) {
  if (!e || e instanceof me)
    return e;
  const t = `#${e}`, n = r.querySelector(t);
  return n ? n.textContent : t;
}
function x0(r, e) {
  const t = {};
  for (const n of r) {
    const s = e(n);
    s in t ? t[s].push(n) : t[s] = [n];
  }
  return t;
}
function q0(r, e) {
  const t = e.getAttribute("aria-label");
  if (t)
    return {
      node: e,
      text: t.value,
      location: t.keyLocation
    };
  const n = e.getAttribute("aria-labelledby");
  if (n) {
    const s = O0(r, n.value);
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
function L0(r) {
  const { node: e, text: t } = r;
  return t === null ? !(e.is("form") || e.is("section")) : !0;
}
class B0 extends j {
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
      const { document: t } = e, n = t.querySelectorAll(k0.join(",")).filter((i) => typeof i.role == "string" && Vl.includes(i.role)), s = x0(n, (i) => i.role);
      for (const i of Object.values(s)) {
        if (i.length <= 1)
          continue;
        const a = i.map((u) => q0(t, u)), o = a.filter(L0);
        for (const u of o) {
          if (u.text instanceof me)
            continue;
          const d = a.filter((l) => l.text === u.text).length > 1;
          if (!u.text || d) {
            const l = "Landmarks must have a non-empty and unique accessible name (aria-label or aria-labelledby)", h = u.location;
            this.report({
              node: u.node,
              message: l,
              location: h
            });
          }
        }
      }
    });
  }
}
const j0 = {
  ignoreCase: !1,
  requireSemicolon: !0
}, M0 = /&(?:[a-z0-9]+|#x?[0-9a-f]+)(;|[^a-z0-9]|$)/gi, U0 = Ju.map((r) => r.toLowerCase());
function V0(r) {
  return r.startsWith("&#");
}
function Fu(r, e, t) {
  const n = t.index ?? 0;
  return ve(r, n, n + e.length);
}
function H0(r, e) {
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
class G0 extends j {
  constructor(e) {
    super({ ...j0, ...e });
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
      description: H0(e, this.options),
      url: "https://html-validate.org/rules/unrecognized-char-ref.html"
    };
  }
  setup() {
    this.on("element:ready", (e) => {
      const t = e.target;
      for (const n of t.childNodes)
        n.nodeType === Ye.TEXT_NODE && this.findCharacterReferences(t, n.textContent, n.location, {
          isAttribute: !1
        });
    }), this.on("attr", (e) => {
      e.value && this.findCharacterReferences(e.target, e.value.toString(), e.valueLocation, {
        isAttribute: !0
      });
    });
  }
  get entities() {
    return this.options.ignoreCase ? U0 : Ju;
  }
  findCharacterReferences(e, t, n, { isAttribute: s }) {
    const i = s && t.includes("?");
    for (const a of this.getMatches(t))
      this.validateCharacterReference(e, n, a, { isQuerystring: i });
  }
  validateCharacterReference(e, t, n, { isQuerystring: s }) {
    const { requireSemicolon: i } = this.options, { match: a, entity: o, raw: u, terminated: d } = n;
    if (V0(o) || s && !d)
      return;
    const l = this.entities.includes(o);
    if (l && (d || !i))
      return;
    if (l && !d) {
      const A = Fu(t, o, a), g = 'Character reference "{{ entity }}" must be terminated by a semicolon', p = {
        entity: u,
        terminated: !1
      };
      this.report(e, g, A, p);
      return;
    }
    const h = Fu(t, o, a), y = 'Unrecognized character reference "{{ entity }}"', v = {
      entity: u,
      terminated: !0
    };
    this.report(e, y, h, v);
  }
  *getMatches(e) {
    let t;
    do
      if (t = M0.exec(e), t) {
        const n = t[1], s = n === ";", a = n !== ";" && n.length > 0 ? t[0].slice(0, -1) : t[0];
        this.options.ignoreCase ? yield { match: t, entity: a.toLowerCase(), raw: a, terminated: s } : yield { match: t, entity: a, raw: a, terminated: s };
      }
    while (t);
  }
}
const z0 = ["section", "hint", "contact", "field1", "field2", "webauthn"], K0 = [
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
], W0 = [
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
], Hl = {
  name: "text",
  "honorific-prefix": "text",
  "given-name": "text",
  "additional-name": "text",
  "family-name": "text",
  "honorific-suffix": "text",
  nickname: "text",
  username: "username",
  "new-password": "password",
  // eslint-disable-line sonarjs/no-hardcoded-passwords -- false positive, it is not used as a password
  "current-password": "password",
  // eslint-disable-line sonarjs/no-hardcoded-passwords -- false positive, it is not used as a password
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
}, Gl = ["checkbox", "radio", "file", "submit", "image", "reset", "button"];
function X0(r) {
  return r.startsWith("section-");
}
function Y0(r) {
  return r === "shipping" || r === "billing";
}
function J0(r) {
  return K0.includes(r);
}
function Q0(r) {
  return ["home", "work", "mobile", "fax", "pager"].includes(r);
}
function Z0(r) {
  return W0.includes(r);
}
function ev(r) {
  return r === "webauthn";
}
function tv(r) {
  return X0(r) ? "section" : Y0(r) ? "hint" : J0(r) ? "field1" : Z0(r) ? "field2" : Q0(r) ? "contact" : ev(r) ? "webauthn" : null;
}
function zl(r) {
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
function rv(r, e) {
  return r.is("input") ? Gl.includes(e) : !1;
}
function Xe(r) {
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
function nv(r) {
  switch (r.msg) {
    case 0:
      return [
        `\`autocomplete\` attribute cannot be used on \`${r.what}\``,
        "",
        "The following input types cannot use the `autocomplete` attribute:",
        "",
        ...Gl.map((e) => `- \`${e}\``)
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
      const t = zl(r.type), n = Hl[r.value];
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
class sv extends j {
  documentation(e) {
    return {
      description: nv(e),
      url: "https://html-validate.org/rules/valid-autocomplete.html"
    };
  }
  setup() {
    this.on("dom:ready", (e) => {
      const { document: t } = e, n = t.querySelectorAll("[autocomplete]");
      for (const s of n) {
        const i = s.getAttribute("autocomplete");
        if (i.value === null || i.value instanceof me)
          continue;
        const a = i.valueLocation, o = i.value.toLowerCase(), u = new Je(o, a);
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
    if (rv(e, s)) {
      const a = {
        msg: 0,
        what: `<input type="${s}">`
      };
      this.report({
        node: e,
        message: Xe(a),
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
      message: Xe(i),
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
        message: Xe(o),
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
          message: Xe(o),
          location: n.location(0),
          context: o
        });
      }
    }
  }
  validateTokens(e, t, n) {
    const s = [];
    for (const { item: a, location: o } of t.iterator()) {
      const u = tv(a);
      if (u)
        s.push(u);
      else {
        const d = {
          msg: 3,
          token: a
        };
        this.report({
          node: e,
          message: Xe(d),
          location: o,
          context: d
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
        message: Xe(a),
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
        message: Xe(u),
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
        message: Xe(a),
        location: t.location(i),
        context: a
      });
    }
  }
  validateOrder(e, t, n) {
    const s = n.map((i) => z0.indexOf(i));
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
          message: Xe(a),
          location: t.location(i + 1),
          context: a
        });
      }
  }
  validateControlGroup(e, t, n) {
    if (n.filter(Boolean).length === 0 || !e.is("input"))
      return;
    const i = e.getAttribute("type"), a = (i == null ? void 0 : i.value) ?? "text";
    if (a instanceof me)
      return;
    const o = zl(a), u = n.indexOf(!0), d = t.item(u), l = Hl[d];
    if (!o.includes(l)) {
      const h = {
        msg: 1,
        type: a,
        value: d,
        what: `<input type="${a}">`
      };
      this.report({
        node: e,
        message: Xe(h),
        location: t.location(u),
        context: h
      });
    }
  }
}
const iv = {
  relaxed: !1
};
class av extends j {
  constructor(e) {
    super({ ...iv, ...e });
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
        `${kl(i, { id: s })}.`,
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
      if (t === null || t instanceof me)
        return;
      if (t === "") {
        const s = { kind: 1, id: t };
        this.report(e.target, this.messages[s.kind], e.location, s);
        return;
      }
      if (/\s/.exec(t)) {
        const s = { kind: 2, id: t };
        this.report(e.target, this.messages[s.kind], e.valueLocation, s);
        return;
      }
      const { relaxed: n } = this.options;
      if (!n) {
        if (/^[^\p{L}]/u.exec(t)) {
          const s = { kind: 3, id: t };
          this.report(e.target, this.messages[s.kind], e.valueLocation, s);
          return;
        }
        if (/[^\p{L}\p{N}_-]/u.exec(t)) {
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
class ov extends j {
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
      t && t.voidElement && t.closed === ke.EndTag && this.report(
        null,
        `End tag for <${t.tagName}> must be omitted`,
        t.location,
        t.tagName
      );
    });
  }
}
const uv = {
  style: "omit"
};
class lv extends j {
  constructor(t) {
    super({ ...uv, ...t });
    O(this, "style");
    this.style = cv(this.options.style);
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
    const [n, s] = dv(t.style);
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
    t.voidElement && t.closed === ke.VoidSelfClosed && this.reportError(
      t,
      `Expected omitted end tag <${t.tagName}> instead of self-closing element <${t.tagName}/>`
    );
  }
  validateSelfClosed(t) {
    t.voidElement && t.closed === ke.VoidOmitted && this.reportError(
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
function cv(r) {
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
function dv(r) {
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
class fv extends j {
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
        if (!n.hasAttribute("href") || !lt(n) || Dt(n, { ignoreHiddenRoot: !0 }) !== He.EMPTY_TEXT || n.querySelectorAll("img").some((o) => Sn(o)))
          continue;
        const a = n.querySelectorAll("[aria-label]");
        mu(n) || a.some((o) => mu(o)) || this.report(n, "Anchor link must have a text describing its purpose");
      }
    });
  }
}
class hv extends j {
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
        pv(a) || gv(s, a) || this.report(a, `<${a.tagName}> element must have a submit button`);
    });
  }
}
function Kl(r) {
  const e = r.getAttribute("type");
  return !!(!e || e.valueMatches(/submit|image/));
}
function mv(r, e) {
  const t = e.getAttribute("form");
  return !!(t != null && t.valueMatches(r, !0));
}
function pv(r) {
  return r.querySelectorAll("button,input").filter(Kl).filter((t) => !t.hasAttribute("form")).length > 0;
}
function gv(r, e) {
  const { id: t } = e;
  return t ? r.querySelectorAll("button[form],input[form]").filter(Kl).filter((s) => mv(t, s)).length > 0 : !1;
}
class yv extends j {
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
      if (t.tagName === "input" && t.getAttributeValue("type") === "image" && lt(t) && !Sn(t)) {
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
const bv = {
  allowEmpty: !0,
  alias: []
};
class vv extends j {
  constructor(e) {
    super({ ...bv, ...e }), Array.isArray(this.options.alias) || (this.options.alias = [this.options.alias]);
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
    if (!lt(e) || e.getAttributeValue("alt") || e.hasAttribute("alt") && this.options.allowEmpty)
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
var Vu;
const { enum: Wl } = (Vu = Yu.th.attributes) == null ? void 0 : Vu.scope, Ev = nt(Wl);
class Dv extends j {
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
      if (s instanceof me || s && Wl.includes(s))
        return;
      const i = `<th> element must have a valid scope attribute: ${Ev}`, a = (n == null ? void 0 : n.valueLocation) ?? (n == null ? void 0 : n.keyLocation) ?? t.location;
      this.report(t, i, a);
    });
  }
}
class wv extends j {
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
class Av extends j {
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
const Cv = {
  "wcag/h30": fv,
  "wcag/h32": hv,
  "wcag/h36": yv,
  "wcag/h37": vv,
  "wcag/h63": Dv,
  "wcag/h67": wv,
  "wcag/h71": Av
}, Pi = {
  "allowed-links": Xp,
  "area-alt": Zp,
  "aria-hidden-body": eg,
  "aria-label-misuse": sg,
  "attr-case": ag,
  "attr-delimiter": Rg,
  "attr-pattern": kg,
  "attr-quotes": Lg,
  "attr-spacing": jg,
  "attribute-allowed-values": Ug,
  "attribute-boolean-style": Hg,
  "attribute-empty-style": Wg,
  "attribute-misuse": ey,
  "class-pattern": sy,
  "close-attr": iy,
  "close-order": oy,
  deprecated: ly,
  "deprecated-rule": dy,
  "doctype-html": fy,
  "doctype-style": my,
  "element-case": gy,
  "element-name": yy,
  "element-permitted-content": Ey,
  "element-permitted-occurrences": Dy,
  "element-permitted-order": wy,
  "element-permitted-parent": _y,
  "element-required-ancestor": Ty,
  "element-required-attributes": Ny,
  "element-required-content": Py,
  "empty-heading": Oy,
  "empty-title": xy,
  "form-dup-name": Vy,
  "heading-level": Wy,
  "hidden-focusable": Jy,
  "id-pattern": Zy,
  "input-attributes": tb,
  "input-missing-label": ob,
  "long-title": db,
  "map-dup-name": gb,
  "map-id-name": bb,
  "meta-refresh": hb,
  "missing-doctype": vb,
  "multiple-labeled-controls": Eb,
  "name-pattern": wb,
  "no-abstract-role": Cb,
  "no-autoplay": _b,
  "no-conditional-comment": Sb,
  "no-deprecated-attr": Rb,
  "no-dup-attr": Tb,
  "no-dup-class": Nb,
  "no-dup-id": Fb,
  "no-implicit-button-type": Ib,
  "no-implicit-input-type": Ob,
  "no-implicit-close": xb,
  "no-inline-style": Lb,
  "no-missing-references": jb,
  "no-multiple-main": Mb,
  "no-raw-characters": Kb,
  "no-redundant-aria-label": Xb,
  "no-redundant-for": Yb,
  "no-redundant-role": Jb,
  "no-self-closing": e0,
  "no-style-tag": r0,
  "no-trailing-whitespace": n0,
  "no-unknown-elements": i0,
  "no-unused-disable": a0,
  "no-utf8-bom": o0,
  "prefer-button": d0,
  "prefer-native-element": h0,
  "prefer-tbody": m0,
  "require-csp-nonce": g0,
  "require-sri": w0,
  "script-element": A0,
  "script-type": $0,
  "svg-focusable": _0,
  "tel-non-breaking": F0,
  "text-content": Fi,
  "unique-landmark": B0,
  "unrecognized-char-ref": G0,
  "valid-autocomplete": sv,
  "valid-id": av,
  "void-content": ov,
  "void-style": lv,
  ...Cv
};
function $v(r) {
  const e = [];
  function t(s) {
    let i = "";
    return s.id && (i += `#${s.id}`), s.hasAttribute("class") && (i += `.${s.classList.join(".")}`), i;
  }
  function n(s, i, a, o) {
    const u = s.parent ? s.parent.childElements.length : 0, d = o === u - 1;
    if (s.parent) {
      const l = d ? "└" : "├";
      e.push(`${a}${l}── ${s.tagName}${t(s)}`);
    } else
      e.push("(root)");
    s.childElements.forEach((l, h) => {
      const y = d ? " " : "│", v = i > 0 ? `${a}${y}   ` : "";
      n(l, i + 1, v, h);
    });
  }
  return n(r, 0, "", 0), e;
}
function de(r) {
  return r && typeof r == "object" && "then" in r && typeof r.then == "function";
}
new Set(Object.keys(Pi));
var _v = {};
const Sv = {
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
}, Rv = {
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
}, Tv = {
  rules: {
    "input-missing-label": "error",
    "heading-level": "error",
    "missing-doctype": "error",
    "no-missing-references": "error",
    "require-sri": "error"
  }
}, Nv = {
  rules: {
    "attr-quotes": "off",
    "doctype-style": "off",
    "void-style": "off"
  }
}, Fv = {
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
}, Pv = {
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
}, Iv = {
  "html-validate:a11y": Sv,
  "html-validate:browser": Rv,
  "html-validate:document": Tv,
  "html-validate:prettier": Nv,
  "html-validate:recommended": Fv,
  "html-validate:standard": Pv
};
class Pu {
  /**
   * @internal
   */
  constructor({ metaTable: e, plugins: t, rules: n, transformers: s }, i) {
    O(this, "metaTable");
    O(this, "plugins");
    O(this, "rules");
    O(this, "transformers");
    /** The original data this resolved configuration was created from */
    O(this, "original");
    /**
     * @internal
     */
    O(this, "cache");
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
function Rn(r, e) {
  return r in e;
}
function Xl(r) {
  return Rn("resolveConfig", r);
}
function Yl(r) {
  return Rn("resolveElements", r);
}
function Jl(r) {
  return Rn("resolvePlugin", r);
}
function Ql(r) {
  return Rn("resolveTransformer", r);
}
function kv(r, e, t) {
  for (const n of r.filter(Xl)) {
    const s = n.resolveConfig(e, t);
    if (de(s))
      return Ov(r, e, t);
    if (s)
      return s;
  }
  throw new ge(`Failed to load configuration from "${e}"`);
}
async function Ov(r, e, t) {
  for (const n of r.filter(Xl)) {
    const s = await n.resolveConfig(e, t);
    if (s)
      return s;
  }
  throw new ge(`Failed to load configuration from "${e}"`);
}
function xv(r, e, t) {
  for (const n of r.filter(Yl)) {
    const s = n.resolveElements(e, t);
    if (de(s))
      return qv(r, e, t);
    if (s)
      return s;
  }
  throw new ge(`Failed to load elements from "${e}"`);
}
async function qv(r, e, t) {
  for (const n of r.filter(Yl)) {
    const s = await n.resolveElements(e, t);
    if (s)
      return s;
  }
  throw new ge(`Failed to load elements from "${e}"`);
}
function Lv(r, e, t) {
  for (const n of r.filter(Jl)) {
    const s = n.resolvePlugin(e, t);
    if (de(s))
      return Bv(r, e, t);
    if (s)
      return s;
  }
  throw new ge(`Failed to load plugin from "${e}"`);
}
async function Bv(r, e, t) {
  for (const n of r.filter(Jl)) {
    const s = await n.resolvePlugin(e, t);
    if (s)
      return s;
  }
  throw new ge(`Failed to load plugin from "${e}"`);
}
function jv(r, e, t) {
  for (const n of r.filter(Ql)) {
    const s = n.resolveTransformer(e, t);
    if (de(s))
      return Mv(r, e, t);
    if (s)
      return s;
  }
  throw new ge(`Failed to load transformer from "${e}"`);
}
async function Mv(r, e, t) {
  for (const n of r.filter(Ql)) {
    const s = await n.resolveTransformer(e, t);
    if (s)
      return s;
  }
  throw new ge(`Failed to load transformer from "${e}"`);
}
const Ii = new di({ strict: !0, strictTuples: !0, strictTypes: !0 });
Ii.addMetaSchema(Ci);
Ii.addKeyword(Tl);
const Iu = Ii.compile(Ri);
function Uv(r, e) {
  return e;
}
function pt(r, e) {
  const t = Wt(r, { ...e, rules: {} });
  e.rules && (t.rules = Wt(t.rules, e.rules, { arrayMerge: Uv }));
  const n = !!r.root || !!e.root;
  return n && (t.root = n), t;
}
function ku(r) {
  return Array.isArray(r) ? r : [r];
}
function Vv(r) {
  return Object.entries(r).map(([e, t]) => {
    const n = new RegExp(e);
    return typeof t == "string" ? { kind: "import", pattern: n, name: t } : { kind: "function", pattern: n, function: t };
  });
}
class be {
  /**
   * @internal
   */
  constructor(e, t) {
    O(this, "config");
    O(this, "configurations");
    O(this, "resolvers");
    O(this, "metaTable");
    O(this, "plugins");
    O(this, "transformers", []);
    const n = {
      extends: [],
      plugins: [],
      rules: {},
      transform: {}
    };
    this.config = pt(n, t), this.configurations = /* @__PURE__ */ new Map(), this.resolvers = ku(e), this.metaTable = null, this.plugins = [], this.transformers = Vv(this.config.transform ?? {});
  }
  /**
   * Create a new blank configuration. See also `Config.defaultConfig()`.
   */
  static empty() {
    return new be([], {
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
    return be.validate(t, n), be.create(e, t);
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
    const n = kv(ku(e), t, { cache: !1 });
    return de(n) ? n.then((s) => be.fromObject(e, s, t)) : be.fromObject(e, n, t);
  }
  /**
   * Validate configuration data.
   *
   * Throws SchemaValidationError if invalid.
   *
   * @internal
   */
  static validate(e, t = null) {
    if (!Iu(e))
      throw new an(
        t,
        "Invalid configuration",
        e,
        Ri,
        /* istanbul ignore next: will be set when a validation error has occurred */
        Iu.errors ?? []
      );
    if (e.rules) {
      const s = be.getRulesObject(e.rules);
      for (const [i, [, a]] of s.entries()) {
        const o = Pi[i], u = `/rules/${i}/1`;
        j.validateOptions(o, i, u, a, t, e);
      }
    }
  }
  /**
   * Load a default configuration object.
   */
  static defaultConfig() {
    return new be([], _v);
  }
  /**
   * @internal
   */
  static create(e, t) {
    const n = new be(e, t), s = n.loadPlugins(n.config.plugins ?? []);
    return de(s) ? s.then((i) => n.init(t, i)) : n.init(t, s);
  }
  init(e, t) {
    this.plugins = t, this.configurations = this.loadConfigurations(this.plugins), this.extendMeta(this.plugins);
    const n = (i) => (this.config = i, this.config.extends = [], e.rules && (this.config = pt(this.config, { rules: e.rules })), this), s = this.extendConfig(this.config.extends ?? []);
    return de(s) ? s.then((i) => n(i)) : n(s);
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
    const n = new be(e, pt(this.config, t.config)), s = n.loadPlugins(n.config.plugins ?? []);
    return de(s) ? s.then((i) => (n.plugins = i, n.configurations = n.loadConfigurations(n.plugins), n.extendMeta(n.plugins), n)) : (n.plugins = s, n.configurations = n.loadConfigurations(n.plugins), n.extendMeta(n.plugins), n);
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
        const i = be.fromFile(this.resolvers, n);
        if (de(i))
          return this.extendConfigAsync(e);
        s = i.config;
      }
      t = pt(t, s);
    }
    return pt(t, this.config);
  }
  async extendConfigAsync(e) {
    let t = {};
    for (const n of e) {
      let s;
      this.configurations.has(n) ? s = this.configurations.get(n) : s = (await be.fromFile(this.resolvers, n)).config, t = pt(t, s);
    }
    return pt(t, this.config);
  }
  /**
   * Get element metadata.
   *
   * @internal
   */
  getMetaTable() {
    if (this.metaTable)
      return this.metaTable;
    const e = new Em();
    for (const i of this.getPlugins())
      i.elementSchema && e.extendValidationSchema(i.elementSchema);
    const t = Array.from(this.config.elements ?? ["html5"]), n = (i) => {
      const a = this.getElementsFromEntry(i);
      if (de(a))
        return a.then((o) => {
          const [u, d] = o;
          e.loadFromObject(u, d);
          const l = t.shift();
          if (l)
            return n(l);
        });
      {
        const [o, u] = a;
        e.loadFromObject(o, u);
        const d = t.shift();
        if (d)
          return n(d);
      }
    }, s = t.shift();
    if (s) {
      const i = n(s);
      if (de(i))
        return i.then(() => (e.init(), this.metaTable = e));
    }
    return e.init(), this.metaTable = e;
  }
  getElementsFromEntry(e) {
    if (typeof e != "string")
      return [e, null];
    const t = vd[e];
    if (t)
      return [t, null];
    try {
      const n = xv(this.resolvers, e, { cache: !1 });
      return de(n) ? n.then((s) => [s, e]) : [n, e];
    } catch (n) {
      const s = n instanceof Error ? n.message : String(n);
      throw new Ee(
        `Failed to load elements from "${e}": ${s}`,
        Ft(n)
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
    return be.getRulesObject(this.config.rules ?? {});
  }
  static getRulesObject(e) {
    const t = /* @__PURE__ */ new Map();
    for (const [n, s] of Object.entries(e)) {
      let i = s;
      Array.isArray(i) ? i.length === 1 && (i = [i[0], {}]) : i = [i, {}];
      const a = Dp(i[0]);
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
        const d = n.shift();
        if (d)
          return s(d, o + 1);
      } else
        try {
          const u = Lv(this.resolvers, a, { cache: !0 });
          if (de(u))
            return u.then((d) => {
              d.name = d.name || a, d.originalName = a, t.push(d);
              const l = n.shift();
              if (l)
                return s(l, o + 1);
            });
          {
            u.name = u.name || a, u.originalName = a, t.push(u);
            const d = n.shift();
            if (d)
              return s(d, o + 1);
          }
        } catch (u) {
          const d = u instanceof Error ? u.message : String(u);
          throw new Ee(`Failed to load plugin "${a}": ${d}`, Ft(u));
        }
    }, i = n.shift();
    if (i) {
      const a = s(i, 0);
      if (de(a))
        return a.then(() => t);
    }
    return t;
  }
  loadConfigurations(e) {
    const t = /* @__PURE__ */ new Map();
    for (const [n, s] of Object.entries(Iv))
      be.validate(s, n), t.set(n, s);
    for (const n of e)
      for (const [s, i] of Object.entries(n.configs ?? {}))
        i && (be.validate(i, s), t.set(`${n.name}:${s}`, i), n.name !== n.originalName && t.set(`${n.originalName}:${s}`, i));
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
          i.copyable && !ti.includes(a) && ti.push(a);
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
    return de(e) ? e.then((t) => new Pu(t, this.get())) : new Pu(e, this.get());
  }
  /**
   * Same as [[resolve]] but returns the raw configuration data instead of
   * [[ResolvedConfig]] instance. Mainly used for testing.
   *
   * @internal
   */
  resolveData() {
    const e = this.getMetaTable();
    return de(e) ? e.then((t) => ({
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
class Zl {
  /**
   * Create a new ConfigLoader.
   *
   * @param resolvers - Sorted list of resolvers to use (in order).
   * @param configData - Default configuration (which all configurations will inherit from).
   */
  constructor(e, t) {
    O(this, "_globalConfig");
    O(this, "_configData");
    O(this, "resolvers");
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
    return de(e) ? e.then((t) => (this._globalConfig = t, this._globalConfig)) : (this._globalConfig = e, this._globalConfig);
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
    if (de(e))
      throw new ge("Cannot load async config from sync function");
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
    return be.empty();
  }
  /**
   * Load configuration from object.
   */
  loadFromObject(e, t) {
    return be.fromObject(this.resolvers, e, t);
  }
  /**
   * Load configuration from filename.
   */
  loadFromFile(e) {
    return be.fromFile(this.resolvers, e);
  }
}
const Hv = [];
function Gv(r) {
  return Array.isArray(r[0]);
}
class zv extends Zl {
  constructor(...e) {
    if (Gv(e)) {
      const [t, n] = e;
      super(t, n);
    } else {
      const [t] = e;
      super(Hv, t);
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
    return de(n) ? n.then((s) => this._resolveConfig(s)) : this._resolveConfig(n);
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
    if (de(t))
      return t.then((n) => {
        const s = n.merge(this.resolvers, e);
        return de(s) ? s.then((i) => i.resolve()) : s.resolve();
      });
    {
      const n = t.merge(this.resolvers, e);
      return de(n) ? n.then((s) => s.resolve()) : n.resolve();
    }
  }
}
class Kv {
  constructor() {
    O(this, "listeners");
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
function Wv(r) {
  return {
    ...r,
    selector: r.selector()
  };
}
function Xv(r) {
  return r.length === 0 ? !1 : de(r[0]);
}
class oi {
  constructor() {
    O(this, "result");
    this.result = {};
  }
  static merge(e) {
    if (de(e))
      return e.then((i) => this.merge(i));
    if (Xv(e))
      return Promise.all(e).then((i) => this.merge(i));
    const t = e.every((i) => i.valid), n = {};
    e.forEach((i) => {
      i.results.forEach((a) => {
        const o = a.filePath;
        o in n ? n[o].messages = [...n[o].messages, ...a.messages] : n[o] = { ...a };
      });
    });
    const s = Object.values(n).map((i) => (i.errorCount = Us(i.messages), i.warningCount = Ou(i.messages), i));
    return {
      valid: t,
      results: s,
      errorCount: xu(s),
      warningCount: qu(s)
    };
  }
  add(e, t, n, s, i, a) {
    var d;
    i.filename in this.result || (this.result[i.filename] = []);
    const o = (d = e.documentation(a)) == null ? void 0 : d.url, u = {
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
        const s = Array.from(this.result[n], Wv).sort(Yv), i = (e ?? []).find((a) => n === a.filename);
        return {
          filePath: n,
          messages: s,
          errorCount: Us(s),
          warningCount: Ou(s),
          source: i ? i.originalData ?? i.data : null
        };
      }),
      errorCount: 0,
      warningCount: 0
    };
    return t.errorCount = xu(t.results), t.warningCount = qu(t.results), t;
  }
  isValid() {
    return Object.values(this.result).reduce((t, n) => t + Us(n), 0) === 0;
  }
}
function Us(r) {
  return r.filter((e) => e.severity === Number(rt.ERROR)).length;
}
function Ou(r) {
  return r.filter((e) => e.severity === Number(rt.WARN)).length;
}
function xu(r) {
  return r.reduce((e, t) => e + t.errorCount, 0);
}
function qu(r) {
  return r.reduce((e, t) => e + t.warningCount, 0);
}
function Yv(r, e) {
  return r.line < e.line ? -1 : r.line > e.line ? 1 : r.column < e.column ? -1 : r.column > e.column ? 1 : 0;
}
const Jv = /<!(?:--)?\[(.*?)\](?:--)?>/g;
function* Qv(r, e) {
  let t;
  for (; (t = Jv.exec(r)) !== null; ) {
    const n = t[1], s = t.index, i = s + t[0].length, a = ve(e, s, i, r);
    yield {
      expression: n,
      location: a
    };
  }
}
class tn extends Error {
  constructor(t, n) {
    super(n);
    O(this, "location");
    this.location = t;
  }
}
function Zv(r) {
  return !!(r && r.type === Q.ATTR_VALUE);
}
function eE(r, e) {
  return r === "svg" && ["title", "desc"].includes(e);
}
function tE(r) {
  return ["enable", "disable", "disable-block", "disable-next"].includes(r);
}
class qe {
  /**
   * Create a new parser instance.
   *
   * @public
   * @param config - Configuration
   */
  constructor(e) {
    O(this, "event");
    O(this, "metaTable");
    O(this, "currentNamespace", "");
    O(this, "dom");
    this.event = new Kv(), this.dom = null, this.metaTable = e.getMetaTable();
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
    }), this.dom = new fp({
      filename: e.filename,
      offset: e.offset,
      line: e.line,
      column: e.column,
      size: 0
    }), this.trigger("dom:load", {
      source: e,
      location: null
    });
    const n = new Ll().tokenize(e);
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
      case Q.UNICODE_BOM:
        break;
      case Q.TAG_OPEN:
        this.consumeTag(e, t, n);
        break;
      case Q.WHITESPACE:
        this.trigger("whitespace", {
          text: t.data[0],
          location: t.location
        }), this.appendText(t.data[0], t.location);
        break;
      case Q.DIRECTIVE:
        this.consumeDirective(t);
        break;
      case Q.CONDITIONAL:
        this.consumeConditional(t);
        break;
      case Q.COMMENT:
        this.consumeComment(t);
        break;
      case Q.DOCTYPE_OPEN:
        this.consumeDoctype(t, n);
        break;
      case Q.TEXT:
      case Q.TEMPLATING:
        this.appendText(t.data[0], t.location);
        break;
      case Q.EOF:
        this.closeTree(e, t.location);
        break;
    }
  }
  /**
   * @internal
   */
  /* eslint-disable-next-line complexity -- technical debt, chould be refactored a bit */
  consumeTag(e, t, n) {
    var y;
    const s = Array.from(
      this.consumeUntil(n, Q.TAG_CLOSE, t.location)
    ), i = s.slice(-1)[0], a = this.closeOptional(t), o = a ? this.dom.getActive().parent : this.dom.getActive(), u = ut.fromTokens(
      t,
      i,
      o,
      this.metaTable,
      this.currentNamespace
    ), d = !t.data[1], l = !d || u.closed !== ke.Open, h = (y = u.meta) == null ? void 0 : y.foreign;
    if (a) {
      const v = this.dom.getActive();
      v.closed = ke.ImplicitClosed, this.closeElement(e, u, v, t.location), this.dom.popActive();
    }
    d && (this.dom.pushActive(u), this.trigger("tag:start", {
      target: u,
      location: t.location
    }));
    for (let v = 0; v < s.length; v++) {
      const A = s[v];
      switch (A.type) {
        case Q.WHITESPACE:
          break;
        case Q.ATTR_NAME:
          this.consumeAttribute(e, u, A, s[v + 1]);
          break;
      }
    }
    if (d && this.trigger("tag:ready", {
      target: u,
      location: i.location
    }), l) {
      const v = this.dom.getActive();
      d || (u.closed = ke.EndTag), this.closeElement(e, u, v, i.location);
      const A = u.tagName !== v.tagName;
      !(!d && u.voidElement) && !A && this.dom.popActive();
    } else h && this.discardForeignBody(e, u.tagName, n, t.location);
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
    this.trigger("tag:end", i), !(t && t.tagName !== n.tagName && n.closed !== ke.ImplicitClosed) && (n.isRootElement() || this.trigger("element:ready", {
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
      const l = Array.from(this.consumeUntil(n, Q.TAG_OPEN, s)), [h] = l.slice(-1), [, y, v] = h.data;
      if (!y && eE(t, v)) {
        const p = this.currentNamespace;
        this.currentNamespace = "svg", this.consumeTag(e, h, n), this.consumeUntilMatchingTag(e, n, v), this.currentNamespace = p;
        continue;
      }
      if (v !== t)
        continue;
      o = Array.from(
        this.consumeUntil(n, Q.TAG_CLOSE, h.location)
      ).slice(-1)[0];
      const g = o.data[0] === "/>";
      y ? (a = h, i--) : g || i++;
    } while (i > 0);
    if (!a || !o)
      return;
    const u = this.dom.getActive(), d = ut.fromTokens(a, o, u, this.metaTable);
    this.closeElement(e, d, u, o.location), this.dom.popActive();
  }
  /**
   * @internal
   */
  consumeAttribute(e, t, n, s) {
    var A;
    const { meta: i } = t, a = this.getAttributeKeyLocation(n), o = this.getAttributeValueLocation(s), u = this.getAttributeLocation(n, s), d = Zv(s), l = {
      key: n.data[1],
      value: null,
      quote: null
    };
    if (d) {
      const [, , g, p] = s.data;
      l.value = g, l.quote = p ?? null;
    }
    let h = (g) => [g];
    (A = e.hooks) != null && A.processAttribute && (h = e.hooks.processAttribute);
    let y;
    const v = h.call({}, l);
    typeof v[Symbol.iterator] != "function" ? y = [l] : y = v;
    for (const g of y) {
      const p = {
        target: t,
        key: g.key,
        value: g.value,
        quote: g.quote,
        originalAttribute: g.originalAttribute,
        location: u,
        keyLocation: a,
        valueLocation: o,
        meta: (i == null ? void 0 : i.attributes[g.key]) ?? null
      };
      this.trigger("attr", p), t.setAttribute(g.key, g.value, a, o, g.originalAttribute);
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
    return !e || e.type !== Q.ATTR_VALUE || e.data[2] === "" ? null : e.data[3] ? ve(e.location, 2, -1) : ve(e.location, 1);
  }
  /**
   * Take attribute key and value token an returns a new location referring to
   * an aggregate location covering key, quotes if present and value.
   */
  getAttributeLocation(e, t) {
    const n = e.location, s = t && t.type === Q.ATTR_VALUE ? t.location : void 0;
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
      throw new tn(e.location, `Missing end bracket "]" on directive "${t}"`);
    const u = /^(.*?)(?:(\s*(?:--|:)\s*)(.*))?$/.exec(a);
    if (!u)
      throw new Error(`Failed to parse directive "${t}"`);
    if (!tE(s))
      throw new tn(e.location, `Unknown directive "${s}"`);
    const [, d, l, h] = u, y = "html-validate-", v = n.length, A = v + s.length + i.length, g = A + d.length + (l || "").length, p = ve(
      e.location,
      n.length - y.length - 1,
      -o.length + 1
    ), f = ve(
      e.location,
      v,
      v + s.length
    ), c = d ? ve(e.location, A, A + d.length) : void 0, m = h ? ve(e.location, g, g + h.length) : void 0;
    this.trigger("directive", {
      action: s,
      data: d,
      comment: h || "",
      location: p,
      actionLocation: f,
      optionsLocation: c,
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
    for (const s of Qv(t, e.location))
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
      this.consumeUntil(t, Q.DOCTYPE_CLOSE, e.location)
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
    throw new tn(
      n,
      `stream ended before ${Q[t]} token was found`
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
      if (this.consume(e, a, t), a.type === Q.TAG_OPEN) {
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
      (i = n.meta) != null && i.implicitClosed ? (n.closed = ke.ImplicitClosed, this.closeElement(e, s, n, t)) : this.closeElement(e, null, n, t), this.dom.popActive();
  }
}
let rE = 1;
function Lu() {
  return rE++;
}
class Me {
  constructor(e, t) {
    O(this, "report");
    O(this, "config");
    O(this, "ParserClass");
    O(this, "availableRules");
    this.report = new oi(), this.config = e, this.ParserClass = t;
    const n = this.initPlugins(this.config);
    this.availableRules = {
      ...Pi,
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
        reportUnused(y, v, A, g) {
          y.has(i.name) || i.reportUnused(v, A, g);
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
      const { hooks: d, ...l } = t, h = {
        location: o,
        source: l
      };
      n.trigger("source:ready", h), n.on("directive", (y, v) => {
        this.processDirective(v, n, a);
      });
      try {
        n.parseHtml(t);
      } catch (y) {
        if (y instanceof en || y instanceof tn)
          this.reportError("parser-error", y.message, y.location);
        else
          throw y;
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
    const t = new Ll(), n = [];
    for (const s of e)
      for (const i of t.tokenize(s)) {
        const a = i.data[0] ?? "", o = i.location.filename, u = String(i.location.line), d = String(i.location.column);
        n.push({
          token: Q[i.type],
          data: a,
          location: `${o}:${u}:${d}`
        });
      }
    return n;
  }
  dumpTree(e) {
    const n = this.instantiateParser().parseHtml(e[0]);
    return $v(n);
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
      n.setEnabled(!0), n.getSeverity() === rt.DISABLED && n.setServerity(rt.ERROR);
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
    const a = new Set(t.map((y) => y.name)), o = new Set(a), u = Lu();
    let d = null;
    for (const y of t)
      y.block(u);
    const l = n.on("tag:start", (y, v) => {
      var A;
      d ?? (d = ((A = v.target.parent) == null ? void 0 : A.unique) ?? null), v.target.blockRules(a, u);
    }), h = n.on("tag:end", (y, v) => {
      const A = d === null, g = d === v.previous.unique;
      if (A || g) {
        h(), l();
        for (const p of t)
          p.unblock(u);
      }
    });
    n.on("rule:error", (y, v) => {
      v.blockers.includes(u) && o.delete(v.ruleId);
    }), n.on("parse:end", () => {
      e.reportUnused(a, o, s, i);
    });
  }
  processDisableNextDirective(e, t, n, s, i) {
    const a = new Set(t.map((l) => l.name)), o = new Set(a), u = Lu();
    for (const l of t)
      l.block(u);
    const d = n.on("tag:start", (l, h) => {
      h.target.blockRules(a, u);
    });
    n.on("rule:error", (l, h) => {
      h.blockers.includes(u) && o.delete(h.ruleId);
    }), n.on("parse:end", () => {
      e.reportUnused(a, o, s, i);
    }), n.once("tag:ready, tag:end, attr", () => {
      d(), n.defer(() => {
        for (const l of t)
          l.unblock(u);
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
    return new class extends j {
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
      severity: rt.ERROR,
      message: t,
      offset: n.offset,
      line: n.line,
      column: n.column,
      size: n.size,
      selector: () => null
    });
  }
}
function nE(r, e, t, n) {
  const s = e.find((a) => a.name === t);
  if (!s)
    throw new Ee(`No plugin named "${t}" has been loaded`);
  if (!s.transformer)
    throw new Ee("Plugin does not expose any transformers");
  if (typeof s.transformer == "function")
    throw new Ee(
      `Transformer "${r}" refers to named transformer but plugin exposes only unnamed, use "${t}" instead.`
    );
  const i = s.transformer[n];
  if (!i)
    throw new Ee(`Plugin "${t}" does not expose a transformer named "${n}".`);
  return i;
}
function sE(r, e) {
  return jv(r, e, { cache: !0 });
}
function iE(r, e) {
  if (!e.transformer)
    throw new Ee("Plugin does not expose any transformers");
  if (typeof e.transformer != "function") {
    if (e.transformer.default)
      return e.transformer.default;
    throw new Ee(
      `Transformer "${r}" refers to unnamed transformer but plugin exposes only named.`
    );
  }
  return e.transformer;
}
const Bu = {
  VERSION: 1
};
function ju(r) {
  const e = r.api ?? 0;
  if (e !== Bu.VERSION)
    throw new Ee(
      `Transformer uses API version ${String(e)} but only version ${String(Bu.VERSION)} is supported`
    );
}
function aE(r, e, t) {
  const n = /(.*):(.*)/.exec(e);
  if (n) {
    const [, i, a] = n;
    return nE(e, t, i, a);
  }
  const s = t.find((i) => i.name === e);
  return s ? iE(e, s) : sE(r, e);
}
function oE(r, e, t) {
  try {
    const n = aE(r, e, t);
    return de(n) ? n.then((s) => (ju(s), s)) : (ju(n), n);
  } catch (n) {
    throw n instanceof Ee ? new Ee(`Failed to load transformer "${e}": ${n.message}`, n) : new Ee(`Failed to load transformer "${e}"`, Ft(n));
  }
}
function ec(r, e, t, n) {
  const s = r.get(t);
  if (s)
    return s;
  {
    const i = oE(e, t, n);
    return de(i) ? i.then((a) => (r.set(t, a), a)) : (r.set(t, i), i);
  }
}
function uE(r) {
  return !!(r && typeof r == "object" && Symbol.iterator in r);
}
function tc(r) {
  return uE(r) ? Array.from(r) : [r];
}
function lE(r) {
  return !r.some(de);
}
const Vs = "Cannot use async transformer from sync function";
async function ki(r, e, t, n) {
  const { cache: s } = e, i = e.findTransformer(n ?? t.filename), a = {
    hasChain(d) {
      return e.canTransform(d);
    },
    chain(d, l) {
      return ki(r, e, d, l);
    }
  };
  if (!i)
    return Promise.resolve([t]);
  const o = i.kind === "import" ? await ec(s, r, i.name, e.getPlugins()) : i.function, u = i.kind === "import" ? i.name : i.function.name;
  try {
    const d = await o.call(a, t), l = await Promise.all(tc(d));
    for (const h of l)
      h.transformedBy ?? (h.transformedBy = []), h.transformedBy.push(u);
    return l;
  } catch (d) {
    const l = d instanceof Error ? d.message : String(d);
    throw new Pt(`When transforming "${t.filename}": ${l}`, Ft(d));
  }
}
function Oi(r, e, t, n) {
  const { cache: s } = e, i = e.findTransformer(n ?? t.filename), a = {
    hasChain(d) {
      return e.canTransform(d);
    },
    chain(d, l) {
      return Oi(r, e, d, l);
    }
  };
  if (!i)
    return [t];
  const o = i.kind === "import" ? ec(s, r, i.name, e.getPlugins()) : i.function, u = i.kind === "import" ? i.name : i.function.name;
  if (de(o))
    throw new ge(Vs);
  try {
    const d = o.call(a, t);
    if (de(d))
      throw new ge(Vs);
    const l = tc(d);
    if (!lE(l))
      throw new ge(Vs);
    for (const h of l)
      h.transformedBy ?? (h.transformedBy = []), h.transformedBy.push(u);
    return l;
  } catch (d) {
    const l = d instanceof Error ? d.message : String(d);
    throw new Pt(`When transforming "${t.filename}": ${l}`, Ft(d));
  }
}
function Vt(r, e, t, n) {
  const i = t !== "/dev/stdin" ? t : 0, a = n.readFileSync(i, { encoding: "utf8" }), o = typeof a == "string" ? a : a.toString("utf8");
  return ki(r, e, {
    data: o,
    filename: t,
    line: 1,
    column: 1,
    offset: 0,
    originalData: o
  }, t);
}
function cE(r, e, t, n) {
  const i = t !== "/dev/stdin" ? t : 0, a = n.readFileSync(i, { encoding: "utf8" }), o = typeof a == "string" ? a : a.toString("utf8");
  return Oi(r, e, {
    data: o,
    filename: t,
    line: 1,
    column: 1,
    offset: 0,
    originalData: o
  }, t);
}
function Xr(r) {
  return !r || typeof r == "string" ? !1 : !!(r.processAttribute ?? r.processElement);
}
function Yr(r) {
  return !r || typeof r == "string" ? !1 : !(r.processAttribute ?? r.processElement);
}
class pE {
  constructor(e) {
    O(this, "configLoader");
    const [t, n] = e instanceof Zl ? [e, void 0] : [void 0, e];
    this.configLoader = t ?? new zv(n);
  }
  /* eslint-enable @typescript-eslint/unified-signatures */
  validateString(e, t, n, s) {
    const i = typeof t == "string" ? t : "inline", a = Yr(t) ? t : Yr(n) ? n : void 0, o = Xr(t) ? t : Xr(n) ? n : s, u = {
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
    const i = typeof t == "string" ? t : "inline", a = Yr(t) ? t : Yr(n) ? n : void 0, o = Xr(t) ? t : Xr(n) ? n : s, u = {
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
    const n = au(e), s = await this.getConfigFor(n.filename, t), i = this.configLoader.getResolvers(), a = await ki(i, s, n);
    return new Me(s, qe).lint(a);
  }
  /**
   * Parse and validate HTML from [[Source]].
   *
   * @public
   * @param input - Source to parse.
   * @returns Report output.
   */
  validateSourceSync(e, t) {
    const n = au(e), s = this.getConfigForSync(n.filename, t), i = this.configLoader.getResolvers(), a = Oi(i, s, n);
    return new Me(s, qe).lint(a);
  }
  /**
   * Parse and validate HTML from file.
   *
   * @public
   * @param filename - Filename to read and parse.
   * @returns Report output.
   */
  async validateFile(e, t) {
    const n = await this.getConfigFor(e), s = this.configLoader.getResolvers(), i = await Vt(s, n, e, t), a = new Me(n, qe);
    return Promise.resolve(a.lint(i));
  }
  /**
   * Parse and validate HTML from file.
   *
   * @public
   * @param filename - Filename to read and parse.
   * @returns Report output.
   */
  validateFileSync(e, t) {
    const n = this.getConfigForSync(e), s = this.configLoader.getResolvers(), i = cE(s, n, e, t);
    return new Me(n, qe).lint(i);
  }
  /**
   * Parse and validate HTML from multiple files. Result is merged together to a
   * single report.
   *
   * @param filenames - Filenames to read and parse.
   * @returns Report output.
   */
  async validateMultipleFiles(e, t) {
    return oi.merge(e.map((n) => this.validateFile(n, t)));
  }
  /**
   * Parse and validate HTML from multiple files. Result is merged together to a
   * single report.
   *
   * @param filenames - Filenames to read and parse.
   * @returns Report output.
   */
  validateMultipleFilesSync(e, t) {
    return oi.merge(e.map((n) => this.validateFileSync(n, t)));
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
  async dumpTokens(e, t) {
    const n = await this.getConfigFor(e), s = this.configLoader.getResolvers(), i = await Vt(s, n, e, t);
    return new Me(n, qe).dumpTokens(i);
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
  async dumpEvents(e, t) {
    const n = await this.getConfigFor(e), s = this.configLoader.getResolvers(), i = await Vt(s, n, e, t);
    return new Me(n, qe).dumpEvents(i);
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
  async dumpTree(e, t) {
    const n = await this.getConfigFor(e), s = this.configLoader.getResolvers(), i = await Vt(s, n, e, t);
    return new Me(n, qe).dumpTree(i);
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
  async dumpSource(e, t) {
    const n = await this.getConfigFor(e), s = this.configLoader.getResolvers();
    return (await Vt(s, n, e, t)).reduce((a, o) => {
      const u = String(o.line), d = String(o.column), l = String(o.offset);
      if (a.push(`Source ${o.filename}@${u}:${d} (offset: ${l})`), o.transformedBy && (a.push("Transformed by:"), a = a.concat(o.transformedBy.reverse().map((h) => ` - ${h}`))), o.hooks && Object.keys(o.hooks).length > 0) {
        a.push("Hooks");
        for (const [h, y] of Object.entries(o.hooks))
          y && a.push(` - ${h}`);
      }
      return a.push("---"), a = a.concat(o.data.split(`
`)), a.push("---"), a;
    }, []);
  }
  /**
   * Get effective configuration schema.
   */
  getConfigurationSchema() {
    return Promise.resolve(Ri);
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
    return new Me(n, qe).getRuleDocumentation(e);
  }
  getContextualDocumentationSync(e, t = "inline") {
    const n = typeof t == "string" ? this.getConfigForSync(t) : t;
    return new Me(n, qe).getRuleDocumentation(e);
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
    return new Me(await s, qe).getRuleDocumentation({ ruleId: e, context: n });
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
    return new Me(s, qe).getRuleDocumentation({ ruleId: e, context: n });
  }
  /**
   * Create a parser configured for given filename.
   *
   * @internal
   * @param source - Source to use.
   */
  async getParserFor(e) {
    const t = await this.getConfigFor(e.filename);
    return new qe(t);
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
    if (de(n))
      throw new ge("Cannot use asynchronous config loader with synchronous api");
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
  _m as Attribute,
  be as Config,
  Ee as ConfigError,
  Zl as ConfigLoader,
  Nl as DOMNode,
  Je as DOMTokenList,
  fp as DOMTree,
  me as DynamicValue,
  Kv as EventHandler,
  ut as HtmlElement,
  pE as HtmlValidate,
  ti as MetaCopyableProperty,
  Em as MetaTable,
  Pt as NestedError,
  ke as NodeClosed,
  Ye as NodeType,
  qe as Parser,
  oi as Reporter,
  Pu as ResolvedConfig,
  j as Rule,
  an as SchemaValidationError,
  rt as Severity,
  zv as StaticConfigLoader,
  He as TextClassification,
  it as TextContent,
  ap as TextNode,
  ge as UserError,
  ye as Validator,
  Zh as WrappedError,
  _p as ariaNaming,
  Dt as classifyNodeText,
  Iv as configPresets,
  fE as defineMetadata,
  Np as keywordPatternMatcher,
  bd as metadataHelper,
  ve as sliceLocation,
  Ge as walk
};
