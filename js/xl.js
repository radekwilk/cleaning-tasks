!(function (r, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : ((r =
        "undefined" != typeof globalThis
          ? globalThis
          : r || self).readXlsxFile = e());
})(this, function () {
  "use strict";
  var r = {
      createDocument: function (r) {
        return new DOMParser().parseFromString(r.trim(), "text/xml");
      },
    },
    e = Uint8Array,
    t = Uint16Array,
    n = Uint32Array,
    o = new e([
      0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5,
      5, 5, 5, 0, 0, 0, 0,
    ]),
    i = new e([
      0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10,
      11, 11, 12, 12, 13, 13, 0, 0,
    ]),
    u = new e([
      16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
    ]),
    a = function (r, e) {
      for (var o = new t(31), i = 0; i < 31; ++i) o[i] = e += 1 << r[i - 1];
      var u = new n(o[30]);
      for (i = 1; i < 30; ++i)
        for (var a = o[i]; a < o[i + 1]; ++a) u[a] = ((a - o[i]) << 5) | i;
      return [o, u];
    },
    l = a(o, 2),
    f = l[0],
    c = l[1];
  (f[28] = 258), (c[258] = 28);
  for (var s = a(i, 0)[0], p = new t(32768), y = 0; y < 32768; ++y) {
    var m = ((43690 & y) >>> 1) | ((21845 & y) << 1);
    (m =
      ((61680 & (m = ((52428 & m) >>> 2) | ((13107 & m) << 2))) >>> 4) |
      ((3855 & m) << 4)),
      (p[y] = (((65280 & m) >>> 8) | ((255 & m) << 8)) >>> 1);
  }
  var b = function (r, e, n) {
      for (var o = r.length, i = 0, u = new t(e); i < o; ++i)
        r[i] && ++u[r[i] - 1];
      var a,
        l = new t(e);
      for (i = 0; i < e; ++i) l[i] = (l[i - 1] + u[i - 1]) << 1;
      if (n) {
        a = new t(1 << e);
        var f = 15 - e;
        for (i = 0; i < o; ++i)
          if (r[i])
            for (
              var c = (i << 4) | r[i],
                s = e - r[i],
                y = l[r[i] - 1]++ << s,
                m = y | ((1 << s) - 1);
              y <= m;
              ++y
            )
              a[p[y] >>> f] = c;
      } else
        for (a = new t(o), i = 0; i < o; ++i)
          r[i] && (a[i] = p[l[r[i] - 1]++] >>> (15 - r[i]));
      return a;
    },
    v = new e(288);
  for (y = 0; y < 144; ++y) v[y] = 8;
  for (y = 144; y < 256; ++y) v[y] = 9;
  for (y = 256; y < 280; ++y) v[y] = 7;
  for (y = 280; y < 288; ++y) v[y] = 8;
  var d = new e(32);
  for (y = 0; y < 32; ++y) d[y] = 5;
  var h = b(v, 9, 1),
    g = b(d, 5, 1),
    w = function (r) {
      for (var e = r[0], t = 1; t < r.length; ++t) r[t] > e && (e = r[t]);
      return e;
    },
    O = function (r, e, t) {
      var n = (e / 8) | 0;
      return ((r[n] | (r[n + 1] << 8)) >> (7 & e)) & t;
    },
    S = function (r, e) {
      var t = (e / 8) | 0;
      return (r[t] | (r[t + 1] << 8) | (r[t + 2] << 16)) >> (7 & e);
    },
    j = function (r, o, i) {
      (null == o || o < 0) && (o = 0),
        (null == i || i > r.length) && (i = r.length);
      var u = new (
        2 == r.BYTES_PER_ELEMENT ? t : 4 == r.BYTES_PER_ELEMENT ? n : e
      )(i - o);
      return u.set(r.subarray(o, i)), u;
    },
    P = [
      "unexpected EOF",
      "invalid block type",
      "invalid length/literal",
      "invalid distance",
      "stream finished",
      "no stream handler",
      ,
      "no callback",
      "invalid UTF-8 data",
      "extra field too long",
      "date not in range 1980-2099",
      "filename too long",
      "stream finishing",
      "invalid zip data",
    ],
    E = function (r, e, t) {
      var n = new Error(e || P[r]);
      if (
        ((n.code = r),
        Error.captureStackTrace && Error.captureStackTrace(n, E),
        !t)
      )
        throw n;
      return n;
    },
    A = function (r, t, n) {
      var a = r.length;
      if (!a || (n && n.f && !n.l)) return t || new e(0);
      var l = !t || n,
        c = !n || n.i;
      n || (n = {}), t || (t = new e(3 * a));
      var p = function (r) {
          var n = t.length;
          if (r > n) {
            var o = new e(Math.max(2 * n, r));
            o.set(t), (t = o);
          }
        },
        y = n.f || 0,
        m = n.p || 0,
        v = n.b || 0,
        d = n.l,
        P = n.d,
        A = n.m,
        C = n.n,
        x = 8 * a;
      do {
        if (!d) {
          y = O(r, m, 1);
          var I = O(r, m + 1, 3);
          if (((m += 3), !I)) {
            var N = r[(B = 4 + (((m + 7) / 8) | 0)) - 4] | (r[B - 3] << 8),
              k = B + N;
            if (k > a) {
              c && E(0);
              break;
            }
            l && p(v + N),
              t.set(r.subarray(B, k), v),
              (n.b = v += N),
              (n.p = m = 8 * k),
              (n.f = y);
            continue;
          }
          if (1 == I) (d = h), (P = g), (A = 9), (C = 5);
          else if (2 == I) {
            var T = O(r, m, 31) + 257,
              D = O(r, m + 10, 15) + 4,
              F = T + O(r, m + 5, 31) + 1;
            m += 14;
            for (var V = new e(F), _ = new e(19), M = 0; M < D; ++M)
              _[u[M]] = O(r, m + 3 * M, 7);
            m += 3 * D;
            var U = w(_),
              R = (1 << U) - 1,
              $ = b(_, U, 1);
            for (M = 0; M < F; ) {
              var B,
                L = $[O(r, m, R)];
              if (((m += 15 & L), (B = L >>> 4) < 16)) V[M++] = B;
              else {
                var q = 0,
                  X = 0;
                for (
                  16 == B
                    ? ((X = 3 + O(r, m, 3)), (m += 2), (q = V[M - 1]))
                    : 17 == B
                    ? ((X = 3 + O(r, m, 7)), (m += 3))
                    : 18 == B && ((X = 11 + O(r, m, 127)), (m += 7));
                  X--;

                )
                  V[M++] = q;
              }
            }
            var z = V.subarray(0, T),
              G = V.subarray(T);
            (A = w(z)), (C = w(G)), (d = b(z, A, 1)), (P = b(G, C, 1));
          } else E(1);
          if (m > x) {
            c && E(0);
            break;
          }
        }
        l && p(v + 131072);
        for (var Y = (1 << A) - 1, W = (1 << C) - 1, H = m; ; H = m) {
          var J = (q = d[S(r, m) & Y]) >>> 4;
          if ((m += 15 & q) > x) {
            c && E(0);
            break;
          }
          if ((q || E(2), J < 256)) t[v++] = J;
          else {
            if (256 == J) {
              (H = m), (d = null);
              break;
            }
            var K = J - 254;
            if (J > 264) {
              var Q = o[(M = J - 257)];
              (K = O(r, m, (1 << Q) - 1) + f[M]), (m += Q);
            }
            var Z = P[S(r, m) & W],
              rr = Z >>> 4;
            Z || E(3), (m += 15 & Z);
            G = s[rr];
            if (rr > 3) {
              Q = i[rr];
              (G += S(r, m) & ((1 << Q) - 1)), (m += Q);
            }
            if (m > x) {
              c && E(0);
              break;
            }
            l && p(v + 131072);
            for (var er = v + K; v < er; v += 4)
              (t[v] = t[v - G]),
                (t[v + 1] = t[v + 1 - G]),
                (t[v + 2] = t[v + 2 - G]),
                (t[v + 3] = t[v + 3 - G]);
            v = er;
          }
        }
        (n.l = d),
          (n.p = H),
          (n.b = v),
          (n.f = y),
          d && ((y = 1), (n.m = A), (n.d = P), (n.n = C));
      } while (!y);
      return v == t.length ? t : j(t, 0, v);
    },
    C = new e(0),
    x = function (r, e) {
      return r[e] | (r[e + 1] << 8);
    },
    I = function (r, e) {
      return (
        (r[e] | (r[e + 1] << 8) | (r[e + 2] << 16) | (r[e + 3] << 24)) >>> 0
      );
    },
    N = function (r, e) {
      return I(r, e) + 4294967296 * I(r, e + 4);
    };
  function k(r, e) {
    return A(r, e);
  }
  var T = "undefined" != typeof TextDecoder && new TextDecoder();
  try {
    T.decode(C, { stream: !0 }), 1;
  } catch (r) {}
  var D = function (r) {
    for (var e = "", t = 0; ; ) {
      var n = r[t++],
        o = (n > 127) + (n > 223) + (n > 239);
      if (t + o > r.length) return [e, j(r, t - 1)];
      o
        ? 3 == o
          ? ((n =
              (((15 & n) << 18) |
                ((63 & r[t++]) << 12) |
                ((63 & r[t++]) << 6) |
                (63 & r[t++])) -
              65536),
            (e += String.fromCharCode(55296 | (n >> 10), 56320 | (1023 & n))))
          : (e +=
              1 & o
                ? String.fromCharCode(((31 & n) << 6) | (63 & r[t++]))
                : String.fromCharCode(
                    ((15 & n) << 12) | ((63 & r[t++]) << 6) | (63 & r[t++])
                  ))
        : (e += String.fromCharCode(n));
    }
  };
  function F(r, e) {
    if (e) {
      for (var t = "", n = 0; n < r.length; n += 16384)
        t += String.fromCharCode.apply(null, r.subarray(n, n + 16384));
      return t;
    }
    if (T) return T.decode(r);
    var o = D(r),
      i = o[0];
    return o[1].length && E(8), i;
  }
  var V = function (r, e) {
      return e + 30 + x(r, e + 26) + x(r, e + 28);
    },
    _ = function (r, e, t) {
      var n = x(r, e + 28),
        o = F(r.subarray(e + 46, e + 46 + n), !(2048 & x(r, e + 8))),
        i = e + 46 + n,
        u = I(r, e + 20),
        a = t && 4294967295 == u ? M(r, i) : [u, I(r, e + 24), I(r, e + 42)],
        l = a[0],
        f = a[1],
        c = a[2];
      return [x(r, e + 10), l, f, o, i + x(r, e + 30) + x(r, e + 32), c];
    },
    M = function (r, e) {
      for (; 1 != x(r, e); e += 4 + x(r, e + 2));
      return [N(r, e + 12), N(r, e + 4), N(r, e + 20)];
    };
  function U(r) {
    var t = (function (r, t) {
      for (var n = {}, o = r.length - 22; 101010256 != I(r, o); --o)
        (!o || r.length - o > 65558) && E(13);
      var i = x(r, o + 8);
      if (!i) return {};
      var u = I(r, o + 16),
        a = 4294967295 == u || 65535 == i;
      if (a) {
        var l = I(r, o - 12);
        (a = 101075792 == I(r, l)) && ((i = I(r, l + 32)), (u = I(r, l + 48)));
      }
      for (var f = t && t.filter, c = 0; c < i; ++c) {
        var s = _(r, u, a),
          p = s[0],
          y = s[1],
          m = s[2],
          b = s[3],
          v = s[4],
          d = s[5],
          h = V(r, d);
        (u = v),
          (f && !f({ name: b, size: y, originalSize: m, compression: p })) ||
            (p
              ? 8 == p
                ? (n[b] = k(r.subarray(h, h + y), new e(m)))
                : E(14, "unknown compression type " + p)
              : (n[b] = j(r, h, h + y)));
      }
      return n;
    })(new Uint8Array(r));
    return Promise.resolve(
      (function (r) {
        for (var e = [], t = 0, n = Object.keys(r); t < n.length; t++) {
          var o = n[t];
          e[o] = F(r[o]);
        }
        return e;
      })(t)
    );
  }
  function R(r, e) {
    for (var t = 0; t < r.childNodes.length; ) {
      var n = r.childNodes[t];
      if (1 === n.nodeType && q(n) === e) return n;
      t++;
    }
  }
  function $(r, e) {
    for (var t = [], n = 0; n < r.childNodes.length; ) {
      var o = r.childNodes[n];
      1 === o.nodeType && q(o) === e && t.push(o), n++;
    }
    return t;
  }
  function B(r, e, t) {
    for (var n = 0; n < r.childNodes.length; ) {
      var o = r.childNodes[n];
      e ? 1 === o.nodeType && q(o) === e && t(o, n) : t(o, n), n++;
    }
  }
  var L = /.+\:/;
  function q(r) {
    return r.tagName.replace(L, "");
  }
  function X(r) {
    if (1 !== r.nodeType) return r.textContent;
    for (var e = "<" + q(r), t = 0; t < r.attributes.length; )
      (e += " " + r.attributes[t].name + '="' + r.attributes[t].value + '"'),
        t++;
    e += ">";
    for (var n = 0; n < r.childNodes.length; ) (e += X(r.childNodes[n])), n++;
    return (e += "</" + q(r) + ">");
  }
  function z(r) {
    var e,
      t,
      n = r.documentElement;
    return (
      (e = function (r) {
        var e = R(r, "t");
        if (e) return e.textContent;
        var t = "";
        return (
          B(r, "r", function (r) {
            t += R(r, "t").textContent;
          }),
          t
        );
      }),
      (t = []),
      B(n, "si", function (r, n) {
        t.push(e(r, n));
      }),
      t
    );
  }
  function G(r, e) {
    var t = e.createDocument(r),
      n = {},
      o = R(t.documentElement, "workbookPr");
    o && "1" === o.getAttribute("date1904") && (n.epoch1904 = !0),
      (n.sheets = []);
    return (
      (function (r) {
        return $(R(r.documentElement, "sheets"), "sheet");
      })(t).forEach(function (r) {
        r.getAttribute("name") &&
          n.sheets.push({
            id: r.getAttribute("sheetId"),
            name: r.getAttribute("name"),
            relationId: r.getAttribute("r:id"),
          });
      }),
      n
    );
  }
  function Y(r, e) {
    var t = e.createDocument(r),
      n = { sheets: {}, sharedStrings: void 0, styles: void 0 };
    return (
      (function (r) {
        return $(r.documentElement, "Relationship");
      })(t).forEach(function (r) {
        var e = r.getAttribute("Target");
        switch (r.getAttribute("Type")) {
          case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles":
            n.styles = W(e);
            break;
          case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings":
            n.sharedStrings = W(e);
            break;
          case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet":
            n.sheets[r.getAttribute("Id")] = W(e);
        }
      }),
      n
    );
  }
  function W(r) {
    return "/" === r[0] ? r.slice(1) : "xl/" + r;
  }
  function H(r) {
    return (
      (H =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (r) {
              return typeof r;
            }
          : function (r) {
              return r &&
                "function" == typeof Symbol &&
                r.constructor === Symbol &&
                r !== Symbol.prototype
                ? "symbol"
                : typeof r;
            }),
      H(r)
    );
  }
  function J(r, e) {
    var t = Object.keys(r);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(r);
      e &&
        (n = n.filter(function (e) {
          return Object.getOwnPropertyDescriptor(r, e).enumerable;
        })),
        t.push.apply(t, n);
    }
    return t;
  }
  function K(r) {
    for (var e = 1; e < arguments.length; e++) {
      var t = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? J(Object(t), !0).forEach(function (e) {
            Q(r, e, t[e]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(t))
        : J(Object(t)).forEach(function (e) {
            Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(t, e));
          });
    }
    return r;
  }
  function Q(r, e, t) {
    return (
      (e = (function (r) {
        var e = (function (r, e) {
          if ("object" !== H(r) || null === r) return r;
          var t = r[Symbol.toPrimitive];
          if (void 0 !== t) {
            var n = t.call(r, e || "default");
            if ("object" !== H(n)) return n;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === e ? String : Number)(r);
        })(r, "string");
        return "symbol" === H(e) ? e : String(e);
      })(e)) in r
        ? Object.defineProperty(r, e, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (r[e] = t),
      r
    );
  }
  function Z(r, e) {
    if (!r) return {};
    var t,
      n,
      o = e.createDocument(r),
      i = ((t = o),
      (n = R(t.documentElement, "cellStyleXfs")),
      n ? $(n, "xf") : []).map(er),
      u = (function (r) {
        var e = R(r.documentElement, "numFmts");
        return e ? $(e, "numFmt") : [];
      })(o)
        .map(rr)
        .reduce(function (r, e) {
          return (r[e.id] = e), r;
        }, []);
    return (function (r) {
      var e = R(r.documentElement, "cellXfs");
      return e ? $(e, "xf") : [];
    })(o).map(function (r) {
      return r.hasAttribute("xfId") ? K(K({}, i[r.xfId]), er(r, u)) : er(r, u);
    });
  }
  function rr(r) {
    return {
      id: r.getAttribute("numFmtId"),
      template: r.getAttribute("formatCode"),
    };
  }
  function er(r, e) {
    var t = {};
    if (r.hasAttribute("numFmtId")) {
      var n = r.getAttribute("numFmtId");
      e[n] ? (t.numberFormat = e[n]) : (t.numberFormat = { id: n });
    }
    return t;
  }
  function tr(r, e) {
    e && e.epoch1904 && (r += 1462);
    return new Date(Math.round(24 * (r - 25569) * 36e5));
  }
  function nr(r, e) {
    var t =
      ("undefined" != typeof Symbol && r[Symbol.iterator]) || r["@@iterator"];
    if (t) return (t = t.call(r)).next.bind(t);
    if (
      Array.isArray(r) ||
      (t = (function (r, e) {
        if (!r) return;
        if ("string" == typeof r) return or(r, e);
        var t = Object.prototype.toString.call(r).slice(8, -1);
        "Object" === t && r.constructor && (t = r.constructor.name);
        if ("Map" === t || "Set" === t) return Array.from(r);
        if (
          "Arguments" === t ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
        )
          return or(r, e);
      })(r)) ||
      (e && r && "number" == typeof r.length)
    ) {
      t && (r = t);
      var n = 0;
      return function () {
        return n >= r.length ? { done: !0 } : { done: !1, value: r[n++] };
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  function or(r, e) {
    (null == e || e > r.length) && (e = r.length);
    for (var t = 0, n = new Array(e); t < e; t++) n[t] = r[t];
    return n;
  }
  function ir(r, e, t) {
    if (r) {
      var n = e[r];
      if (!n) throw new Error("Cell style not found: ".concat(r));
      if (!n.numberFormat) return !1;
      if (
        ur.indexOf(Number(n.numberFormat.id)) >= 0 ||
        (t.dateFormat && n.numberFormat.template === t.dateFormat) ||
        (!1 !== t.smartDateParser &&
          n.numberFormat.template &&
          (function (r) {
            for (
              var e,
                t = nr(
                  (r = (r = (r = r.toLowerCase()).replace(ar, "")).replace(
                    lr,
                    ""
                  )).split(/\W+/)
                );
              !(e = t()).done;

            ) {
              var n = e.value;
              if (fr.indexOf(n) < 0) return !1;
            }
            return !0;
          })(n.numberFormat.template))
      )
        return !0;
    }
  }
  var ur = [14, 15, 16, 17, 18, 19, 20, 21, 22, 27, 30, 36, 45, 46, 47, 50, 57],
    ar = /^\[\$-414\]/,
    lr = /;@$/;
  var fr = [
    "ss",
    "mm",
    "h",
    "hh",
    "am",
    "pm",
    "d",
    "dd",
    "m",
    "mm",
    "mmm",
    "mmmm",
    "yy",
    "yyyy",
    "e",
  ];
  function cr(r, e, t) {
    var n = t.getInlineStringValue,
      o = t.getInlineStringXml,
      i = t.getStyleId,
      u = t.styles,
      a = t.values,
      l = t.properties,
      f = t.options;
    switch ((e || (e = "n"), e)) {
      case "str":
        r = sr(r, f);
        break;
      case "inlineStr":
        if (void 0 === (r = n()))
          throw new Error(
            'Unsupported "inline string" cell value structure: '.concat(o())
          );
        r = sr(r, f);
        break;
      case "s":
        var c = Number(r);
        if (isNaN(c))
          throw new Error('Invalid "shared" string index: '.concat(r));
        if (c >= a.length)
          throw new Error('An out-of-bounds "shared" string index: '.concat(r));
        r = sr((r = a[c]), f);
        break;
      case "b":
        if ("1" === r) r = !0;
        else {
          if ("0" !== r)
            throw new Error('Unsupported "boolean" cell value: '.concat(r));
          r = !1;
        }
        break;
      case "z":
        r = void 0;
        break;
      case "e":
        r = (function (r) {
          switch (r) {
            case 0:
              return "#NULL!";
            case 7:
              return "#DIV/0!";
            case 15:
              return "#VALUE!";
            case 23:
              return "#REF!";
            case 29:
              return "#NAME?";
            case 36:
              return "#NUM!";
            case 42:
              return "#N/A";
            case 43:
              return "#GETTING_DATA";
            default:
              return "#ERROR_".concat(r);
          }
        })(r);
        break;
      case "d":
        if (void 0 === r) break;
        var s = new Date(r);
        if (isNaN(s.valueOf()))
          throw new Error('Unsupported "date" cell value: '.concat(r));
        r = s;
        break;
      case "n":
        if (void 0 === r) break;
        r = ir(i(), u, f) ? tr((r = pr(r)), l) : (f.parseNumber || pr)(r);
        break;
      default:
        throw new TypeError("Cell type not supported: ".concat(e));
    }
    return void 0 === r && (r = null), r;
  }
  function sr(r, e) {
    return !1 !== e.trim && (r = r.trim()), "" === r && (r = void 0), r;
  }
  function pr(r) {
    var e = Number(r);
    if (isNaN(e)) throw new Error('Invalid "numeric" cell value: '.concat(r));
    return e;
  }
  var yr = [
    "",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  function mr(r) {
    for (var e = 0, t = 0; t < r.length; )
      (e *= 26), (e += yr.indexOf(r[t])), t++;
    return e;
  }
  function br(r) {
    return (r = r.split(/(\d+)/)), [parseInt(r[1]), mr(r[0].trim())];
  }
  function vr(r, e, t, n, o, i, u) {
    var a,
      l = br(r.getAttribute("r")),
      f = (function (r, e) {
        return R(e, "v");
      })(0, r),
      c = f && f.textContent;
    return (
      r.hasAttribute("t") && (a = r.getAttribute("t")),
      {
        row: l[0],
        column: l[1],
        value: cr(c, a, {
          getInlineStringValue: function () {
            return (function (r, e) {
              if (
                e.firstChild &&
                "is" === q(e.firstChild) &&
                e.firstChild.firstChild &&
                "t" === q(e.firstChild.firstChild)
              )
                return e.firstChild.firstChild.textContent;
            })(0, r);
          },
          getInlineStringXml: function () {
            return X(r);
          },
          getStyleId: function () {
            return r.getAttribute("s");
          },
          styles: o,
          values: n,
          properties: i,
          options: u,
        }),
      }
    );
  }
  function dr(r, e, t, n, o, i) {
    var u = (function (r) {
      var e = R(r.documentElement, "sheetData"),
        t = [];
      return (
        B(e, "row", function (r) {
          B(r, "c", function (r) {
            t.push(r);
          });
        }),
        t
      );
    })(r);
    return 0 === u.length
      ? []
      : u.map(function (r) {
          return vr(r, 0, 0, t, n, o, i);
        });
  }
  function hr(r, e) {
    return (
      (function (r) {
        if (Array.isArray(r)) return r;
      })(r) ||
      (function (r, e) {
        var t =
          null == r
            ? null
            : ("undefined" != typeof Symbol && r[Symbol.iterator]) ||
              r["@@iterator"];
        if (null != t) {
          var n,
            o,
            i,
            u,
            a = [],
            l = !0,
            f = !1;
          try {
            if (((i = (t = t.call(r)).next), 0 === e)) {
              if (Object(t) !== t) return;
              l = !1;
            } else
              for (
                ;
                !(l = (n = i.call(t)).done) &&
                (a.push(n.value), a.length !== e);
                l = !0
              );
          } catch (r) {
            (f = !0), (o = r);
          } finally {
            try {
              if (!l && null != t.return && ((u = t.return()), Object(u) !== u))
                return;
            } finally {
              if (f) throw o;
            }
          }
          return a;
        }
      })(r, e) ||
      (function (r, e) {
        if (!r) return;
        if ("string" == typeof r) return gr(r, e);
        var t = Object.prototype.toString.call(r).slice(8, -1);
        "Object" === t && r.constructor && (t = r.constructor.name);
        if ("Map" === t || "Set" === t) return Array.from(r);
        if (
          "Arguments" === t ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
        )
          return gr(r, e);
      })(r, e) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function gr(r, e) {
    (null == e || e > r.length) && (e = r.length);
    for (var t = 0, n = new Array(e); t < e; t++) n[t] = r[t];
    return n;
  }
  function wr(r) {
    var e = (function (r) {
      var e = R(r.documentElement, "dimension");
      if (e) return e.getAttribute("ref");
    })(r);
    if (e)
      return (
        1 ===
          (e = e
            .split(":")
            .map(br)
            .map(function (r) {
              var e = hr(r, 2);
              return { row: e[0], column: e[1] };
            })).length && (e = [e[0], e[0]]),
        e
      );
  }
  function Or(r, e) {
    var t =
      ("undefined" != typeof Symbol && r[Symbol.iterator]) || r["@@iterator"];
    if (t) return (t = t.call(r)).next.bind(t);
    if (
      Array.isArray(r) ||
      (t = (function (r, e) {
        if (!r) return;
        if ("string" == typeof r) return Sr(r, e);
        var t = Object.prototype.toString.call(r).slice(8, -1);
        "Object" === t && r.constructor && (t = r.constructor.name);
        if ("Map" === t || "Set" === t) return Array.from(r);
        if (
          "Arguments" === t ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
        )
          return Sr(r, e);
      })(r)) ||
      (e && r && "number" == typeof r.length)
    ) {
      t && (r = t);
      var n = 0;
      return function () {
        return n >= r.length ? { done: !0 } : { done: !1, value: r[n++] };
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  function Sr(r, e) {
    (null == e || e > r.length) && (e = r.length);
    for (var t = 0, n = new Array(e); t < e; t++) n[t] = r[t];
    return n;
  }
  function jr(r, e) {
    var t =
      ("undefined" != typeof Symbol && r[Symbol.iterator]) || r["@@iterator"];
    if (t) return (t = t.call(r)).next.bind(t);
    if (
      Array.isArray(r) ||
      (t = (function (r, e) {
        if (!r) return;
        if ("string" == typeof r) return Pr(r, e);
        var t = Object.prototype.toString.call(r).slice(8, -1);
        "Object" === t && r.constructor && (t = r.constructor.name);
        if ("Map" === t || "Set" === t) return Array.from(r);
        if (
          "Arguments" === t ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
        )
          return Pr(r, e);
      })(r)) ||
      (e && r && "number" == typeof r.length)
    ) {
      t && (r = t);
      var n = 0;
      return function () {
        return n >= r.length ? { done: !0 } : { done: !1, value: r[n++] };
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  function Pr(r, e) {
    (null == e || e > r.length) && (e = r.length);
    for (var t = 0, n = new Array(e); t < e; t++) n[t] = r[t];
    return n;
  }
  function Er(r, e) {
    return (
      (function (r) {
        if (Array.isArray(r)) return r;
      })(r) ||
      (function (r, e) {
        var t =
          null == r
            ? null
            : ("undefined" != typeof Symbol && r[Symbol.iterator]) ||
              r["@@iterator"];
        if (null != t) {
          var n,
            o,
            i,
            u,
            a = [],
            l = !0,
            f = !1;
          try {
            if (((i = (t = t.call(r)).next), 0 === e)) {
              if (Object(t) !== t) return;
              l = !1;
            } else
              for (
                ;
                !(l = (n = i.call(t)).done) &&
                (a.push(n.value), a.length !== e);
                l = !0
              );
          } catch (r) {
            (f = !0), (o = r);
          } finally {
            try {
              if (!l && null != t.return && ((u = t.return()), Object(u) !== u))
                return;
            } finally {
              if (f) throw o;
            }
          }
          return a;
        }
      })(r, e) ||
      Ar(r, e) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function Ar(r, e) {
    if (r) {
      if ("string" == typeof r) return Cr(r, e);
      var t = Object.prototype.toString.call(r).slice(8, -1);
      return (
        "Object" === t && r.constructor && (t = r.constructor.name),
        "Map" === t || "Set" === t
          ? Array.from(r)
          : "Arguments" === t ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
          ? Cr(r, e)
          : void 0
      );
    }
  }
  function Cr(r, e) {
    (null == e || e > r.length) && (e = r.length);
    for (var t = 0, n = new Array(e); t < e; t++) n[t] = r[t];
    return n;
  }
  function xr(r, e) {
    var t = r.dimensions,
      n = r.cells;
    if (0 === n.length) return [];
    var o = Er(t, 2);
    o[0];
    for (
      var i = o[1], u = i.column, a = i.row, l = new Array(a), f = 0;
      f < a;

    ) {
      l[f] = new Array(u);
      for (var c = 0; c < u; ) (l[f][c] = null), c++;
      f++;
    }
    for (
      var s,
        p = (function (r, e) {
          var t =
            ("undefined" != typeof Symbol && r[Symbol.iterator]) ||
            r["@@iterator"];
          if (t) return (t = t.call(r)).next.bind(t);
          if (
            Array.isArray(r) ||
            (t = Ar(r)) ||
            (e && r && "number" == typeof r.length)
          ) {
            t && (r = t);
            var n = 0;
            return function () {
              return n >= r.length ? { done: !0 } : { done: !1, value: r[n++] };
            };
          }
          throw new TypeError(
            "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })(n);
      !(s = p()).done;

    ) {
      var y = s.value,
        m = y.row - 1,
        b = y.column - 1;
      b < u && m < a && (l[m][b] = y.value);
    }
    var v = e.rowMap;
    if (v) for (var d = 0; d < l.length; ) (v[d] = d), d++;
    return (
      (l = (function (r) {
        for (
          var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            t = e.rowIndexMap,
            n = e.accessor,
            o =
              void 0 === n
                ? function (r) {
                    return r;
                  }
                : n,
            i = e.onlyTrimAtTheEnd,
            u = r.length - 1;
          u >= 0;

        ) {
          for (var a, l = !0, f = Or(r[u]); !(a = f()).done; )
            if (null !== o(a.value)) {
              l = !1;
              break;
            }
          if (l) r.splice(u, 1), t && t.splice(u, 1);
          else if (i) break;
          u--;
        }
        return r;
      })(
        (function (r) {
          for (
            var e =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {},
              t = e.accessor,
              n =
                void 0 === t
                  ? function (r) {
                      return r;
                    }
                  : t,
              o = e.onlyTrimAtTheEnd,
              i = r[0].length - 1;
            i >= 0;

          ) {
            for (var u, a = !0, l = jr(r); !(u = l()).done; )
              if (null !== n(u.value[i])) {
                a = !1;
                break;
              }
            if (a) for (var f = 0; f < r.length; ) r[f].splice(i, 1), f++;
            else if (o) break;
            i--;
          }
          return r;
        })(l, { onlyTrimAtTheEnd: !0 }),
        { onlyTrimAtTheEnd: !0, rowIndexMap: v }
      )),
      e.transformData && (l = e.transformData(l)),
      l
    );
  }
  function Ir(r) {
    return (
      (Ir =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (r) {
              return typeof r;
            }
          : function (r) {
              return r &&
                "function" == typeof Symbol &&
                r.constructor === Symbol &&
                r !== Symbol.prototype
                ? "symbol"
                : typeof r;
            }),
      Ir(r)
    );
  }
  function Nr(r, e) {
    var t =
      ("undefined" != typeof Symbol && r[Symbol.iterator]) || r["@@iterator"];
    if (t) return (t = t.call(r)).next.bind(t);
    if (
      Array.isArray(r) ||
      (t = (function (r, e) {
        if (!r) return;
        if ("string" == typeof r) return kr(r, e);
        var t = Object.prototype.toString.call(r).slice(8, -1);
        "Object" === t && r.constructor && (t = r.constructor.name);
        if ("Map" === t || "Set" === t) return Array.from(r);
        if (
          "Arguments" === t ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
        )
          return kr(r, e);
      })(r)) ||
      (e && r && "number" == typeof r.length)
    ) {
      t && (r = t);
      var n = 0;
      return function () {
        return n >= r.length ? { done: !0 } : { done: !1, value: r[n++] };
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  function kr(r, e) {
    (null == e || e > r.length) && (e = r.length);
    for (var t = 0, n = new Array(e); t < e; t++) n[t] = r[t];
    return n;
  }
  function Tr(r, e) {
    var t = Object.keys(r);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(r);
      e &&
        (n = n.filter(function (e) {
          return Object.getOwnPropertyDescriptor(r, e).enumerable;
        })),
        t.push.apply(t, n);
    }
    return t;
  }
  function Dr(r) {
    for (var e = 1; e < arguments.length; e++) {
      var t = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? Tr(Object(t), !0).forEach(function (e) {
            Fr(r, e, t[e]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(t))
        : Tr(Object(t)).forEach(function (e) {
            Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(t, e));
          });
    }
    return r;
  }
  function Fr(r, e, t) {
    return (
      (e = (function (r) {
        var e = (function (r, e) {
          if ("object" !== Ir(r) || null === r) return r;
          var t = r[Symbol.toPrimitive];
          if (void 0 !== t) {
            var n = t.call(r, e || "default");
            if ("object" !== Ir(n)) return n;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === e ? String : Number)(r);
        })(r, "string");
        return "symbol" === Ir(e) ? e : String(e);
      })(e)) in r
        ? Object.defineProperty(r, e, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (r[e] = t),
      r
    );
  }
  function Vr(r, e) {
    var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    t.sheet || (t = Dr({ sheet: 1 }, t));
    var n = function (e) {
        if (!r[e])
          throw new Error(
            '"'.concat(e, '" file not found inside the *.xlsx file zip archive')
          );
        return r[e];
      },
      o = Y(n("xl/_rels/workbook.xml.rels"), e),
      i = o.sharedStrings
        ? (function (r, e) {
            return r ? z(e.createDocument(r)) : [];
          })(n(o.sharedStrings), e)
        : [],
      u = o.styles ? Z(n(o.styles), e) : {},
      a = G(n("xl/workbook.xml"), e);
    if (t.getSheets)
      return a.sheets.map(function (r) {
        return { name: r.name };
      });
    var l = (function (r, e) {
      if ("number" == typeof r) {
        var t = e[r - 1];
        return t && t.relationId;
      }
      for (var n, o = Nr(e); !(n = o()).done; ) {
        var i = n.value;
        if (i.name === r) return i.relationId;
      }
    })(t.sheet, a.sheets);
    if (!l || !o.sheets[l])
      throw (function (r, e) {
        var t =
          e &&
          e
            .map(function (r, e) {
              return '"'.concat(r.name, '" (#').concat(e + 1, ")");
            })
            .join(", ");
        return new Error(
          "Sheet "
            .concat(
              "number" == typeof r ? "#" + r : '"' + r + '"',
              " not found in the *.xlsx file."
            )
            .concat(e ? " Available sheets: " + t + "." : "")
        );
      })(t.sheet, a.sheets);
    var f = (function (r, e, t, n, o, i) {
        var u = e.createDocument(r),
          a = dr(u, 0, t, n, o, i),
          l =
            wr(u) ||
            (function (r) {
              var e = function (r, e) {
                  return r - e;
                },
                t = r
                  .map(function (r) {
                    return r.row;
                  })
                  .sort(e),
                n = r
                  .map(function (r) {
                    return r.column;
                  })
                  .sort(e),
                o = t[0],
                i = t[t.length - 1];
              return [
                { row: o, column: n[0] },
                { row: i, column: n[n.length - 1] },
              ];
            })(a);
        return { cells: a, dimensions: l };
      })(n(o.sheets[l]), e, i, u, a, t),
      c = xr(f, (t = Dr({ rowMap: [] }, t)));
    return t.properties ? { data: c, properties: a } : c;
  }
  function _r(r) {
    return (
      (_r =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (r) {
              return typeof r;
            }
          : function (r) {
              return r &&
                "function" == typeof Symbol &&
                r.constructor === Symbol &&
                r !== Symbol.prototype
                ? "symbol"
                : typeof r;
            }),
      _r(r)
    );
  }
  function Mr(r, e) {
    for (var t = 0; t < e.length; t++) {
      var n = e[t];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        "value" in n && (n.writable = !0),
        Object.defineProperty(
          r,
          ((o = n.key),
          (i = void 0),
          (i = (function (r, e) {
            if ("object" !== _r(r) || null === r) return r;
            var t = r[Symbol.toPrimitive];
            if (void 0 !== t) {
              var n = t.call(r, e || "default");
              if ("object" !== _r(n)) return n;
              throw new TypeError(
                "@@toPrimitive must return a primitive value."
              );
            }
            return ("string" === e ? String : Number)(r);
          })(o, "string")),
          "symbol" === _r(i) ? i : String(i)),
          n
        );
    }
    var o, i;
  }
  function Ur(r) {
    var e = Br();
    return function () {
      var t,
        n = qr(r);
      if (e) {
        var o = qr(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);
      return (function (r, e) {
        if (e && ("object" === _r(e) || "function" == typeof e)) return e;
        if (void 0 !== e)
          throw new TypeError(
            "Derived constructors may only return object or undefined"
          );
        return (function (r) {
          if (void 0 === r)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return r;
        })(r);
      })(this, t);
    };
  }
  function Rr(r) {
    var e = "function" == typeof Map ? new Map() : void 0;
    return (
      (Rr = function (r) {
        if (
          null === r ||
          ((t = r), -1 === Function.toString.call(t).indexOf("[native code]"))
        )
          return r;
        var t;
        if ("function" != typeof r)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        if (void 0 !== e) {
          if (e.has(r)) return e.get(r);
          e.set(r, n);
        }
        function n() {
          return $r(r, arguments, qr(this).constructor);
        }
        return (
          (n.prototype = Object.create(r.prototype, {
            constructor: {
              value: n,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          })),
          Lr(n, r)
        );
      }),
      Rr(r)
    );
  }
  function $r(r, e, t) {
    return (
      ($r = Br()
        ? Reflect.construct.bind()
        : function (r, e, t) {
            var n = [null];
            n.push.apply(n, e);
            var o = new (Function.bind.apply(r, n))();
            return t && Lr(o, t.prototype), o;
          }),
      $r.apply(null, arguments)
    );
  }
  function Br() {
    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
    if (Reflect.construct.sham) return !1;
    if ("function" == typeof Proxy) return !0;
    try {
      return (
        Boolean.prototype.valueOf.call(
          Reflect.construct(Boolean, [], function () {})
        ),
        !0
      );
    } catch (r) {
      return !1;
    }
  }
  function Lr(r, e) {
    return (
      (Lr = Object.setPrototypeOf
        ? Object.setPrototypeOf.bind()
        : function (r, e) {
            return (r.__proto__ = e), r;
          }),
      Lr(r, e)
    );
  }
  function qr(r) {
    return (
      (qr = Object.setPrototypeOf
        ? Object.getPrototypeOf.bind()
        : function (r) {
            return r.__proto__ || Object.getPrototypeOf(r);
          }),
      qr(r)
    );
  }
  var Xr = (function (r) {
    !(function (r, e) {
      if ("function" != typeof e && null !== e)
        throw new TypeError(
          "Super expression must either be null or a function"
        );
      (r.prototype = Object.create(e && e.prototype, {
        constructor: { value: r, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(r, "prototype", { writable: !1 }),
        e && Lr(r, e);
    })(i, r);
    var e,
      t,
      n,
      o = Ur(i);
    function i(r) {
      var e;
      return (
        (function (r, e) {
          if (!(r instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, i),
        ((e = o.call(this, "invalid")).reason = r),
        e
      );
    }
    return (
      (e = i),
      t && Mr(e.prototype, t),
      n && Mr(e, n),
      Object.defineProperty(e, "prototype", { writable: !1 }),
      e
    );
  })(Rr(Error));
  function zr(r) {
    if ("string" == typeof r) {
      var e = r;
      if (((r = Number(r)), String(r) !== e)) throw new Xr("not_a_number");
    }
    if ("number" != typeof r) throw new Xr("not_a_number");
    if (isNaN(r)) throw new Xr("invalid_number");
    if (!isFinite(r)) throw new Xr("out_of_bounds");
    return r;
  }
  function Gr(r) {
    if ("string" == typeof r) return r;
    if ("number" == typeof r) {
      if (isNaN(r)) throw new Xr("invalid_number");
      if (!isFinite(r)) throw new Xr("out_of_bounds");
      return String(r);
    }
    throw new Xr("not_a_string");
  }
  function Yr(r) {
    if ("boolean" == typeof r) return r;
    throw new Xr("not_a_boolean");
  }
  function Wr(r, e) {
    return (
      (function (r) {
        if (Array.isArray(r)) return r;
      })(r) ||
      (function (r, e) {
        var t =
          null == r
            ? null
            : ("undefined" != typeof Symbol && r[Symbol.iterator]) ||
              r["@@iterator"];
        if (null != t) {
          var n,
            o,
            i,
            u,
            a = [],
            l = !0,
            f = !1;
          try {
            if (((i = (t = t.call(r)).next), 0 === e)) {
              if (Object(t) !== t) return;
              l = !1;
            } else
              for (
                ;
                !(l = (n = i.call(t)).done) &&
                (a.push(n.value), a.length !== e);
                l = !0
              );
          } catch (r) {
            (f = !0), (o = r);
          } finally {
            try {
              if (!l && null != t.return && ((u = t.return()), Object(u) !== u))
                return;
            } finally {
              if (f) throw o;
            }
          }
          return a;
        }
      })(r, e) ||
      Jr(r, e) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function Hr(r) {
    return (
      (Hr =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (r) {
              return typeof r;
            }
          : function (r) {
              return r &&
                "function" == typeof Symbol &&
                r.constructor === Symbol &&
                r !== Symbol.prototype
                ? "symbol"
                : typeof r;
            }),
      Hr(r)
    );
  }
  function Jr(r, e) {
    if (r) {
      if ("string" == typeof r) return Kr(r, e);
      var t = Object.prototype.toString.call(r).slice(8, -1);
      return (
        "Object" === t && r.constructor && (t = r.constructor.name),
        "Map" === t || "Set" === t
          ? Array.from(r)
          : "Arguments" === t ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
          ? Kr(r, e)
          : void 0
      );
    }
  }
  function Kr(r, e) {
    (null == e || e > r.length) && (e = r.length);
    for (var t = 0, n = new Array(e); t < e; t++) n[t] = r[t];
    return n;
  }
  function Qr(r, e) {
    var t = Object.keys(r);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(r);
      e &&
        (n = n.filter(function (e) {
          return Object.getOwnPropertyDescriptor(r, e).enumerable;
        })),
        t.push.apply(t, n);
    }
    return t;
  }
  function Zr(r) {
    for (var e = 1; e < arguments.length; e++) {
      var t = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? Qr(Object(t), !0).forEach(function (e) {
            re(r, e, t[e]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(t))
        : Qr(Object(t)).forEach(function (e) {
            Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(t, e));
          });
    }
    return r;
  }
  function re(r, e, t) {
    return (
      (e = (function (r) {
        var e = (function (r, e) {
          if ("object" !== Hr(r) || null === r) return r;
          var t = r[Symbol.toPrimitive];
          if (void 0 !== t) {
            var n = t.call(r, e || "default");
            if ("object" !== Hr(n)) return n;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === e ? String : Number)(r);
        })(r, "string");
        return "symbol" === Hr(e) ? e : String(e);
      })(e)) in r
        ? Object.defineProperty(r, e, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (r[e] = t),
      r
    );
  }
  var ee = {
    schemaPropertyValueForMissingColumn: void 0,
    schemaPropertyValueForUndefinedCellValue: void 0,
    schemaPropertyValueForNullCellValue: null,
    schemaPropertyShouldSkipRequiredValidationForMissingColumn: function () {
      return !1;
    },
    getEmptyObjectValue: function () {
      return null;
    },
    getEmptyArrayValue: function () {
      return null;
    },
    isColumnOriented: !1,
    arrayValueSeparator: ",",
  };
  function te(r, e, t) {
    var n = (t = t ? Zr(Zr({}, ee), t) : ee),
      o = n.isColumnOriented,
      i = n.rowIndexMap;
    !(function (r) {
      for (var e = 0, t = Object.keys(r); e < t.length; e++) {
        var n = t[e];
        if (!r[n].prop)
          throw new Error(
            '"prop" not defined for schema entry "'.concat(n, '".')
          );
      }
    })(e),
      o && (r = ae(r));
    for (var u = r[0], a = [], l = [], f = 1; f < r.length; f++) {
      var c = ne(e, r[f], f, void 0, u, l, t);
      a.push(c);
    }
    if (i)
      for (
        var s,
          p = (function (r, e) {
            var t =
              ("undefined" != typeof Symbol && r[Symbol.iterator]) ||
              r["@@iterator"];
            if (t) return (t = t.call(r)).next.bind(t);
            if (
              Array.isArray(r) ||
              (t = Jr(r)) ||
              (e && r && "number" == typeof r.length)
            ) {
              t && (r = t);
              var n = 0;
              return function () {
                return n >= r.length
                  ? { done: !0 }
                  : { done: !1, value: r[n++] };
              };
            }
            throw new TypeError(
              "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })(l);
        !(s = p()).done;

      ) {
        var y = s.value;
        y.row = i[y.row - 1] + 1;
      }
    return { rows: a, errors: l };
  }
  function ne(r, e, t, n, o, i, u) {
    for (
      var a = {},
        l = !0,
        f = function (e) {
          var n = e.column,
            o = e.value,
            i = e.error,
            u = e.reason,
            a = { error: i, row: t + 1, column: n, value: o };
          return u && (a.reason = u), r[n].type && (a.type = r[n].type), a;
        },
        c = [],
        s = function () {
          var s,
            m,
            b,
            v,
            d = y[p],
            h = r[d],
            g = "object" === Hr(h.type) && !Array.isArray(h.type),
            w = "".concat(n || "", ".").concat(h.prop),
            O = o.indexOf(d),
            S = O < 0;
          if ((S || (s = e[O]), g)) m = ne(h.type, e, t, w, o, i, u);
          else if (S) m = u.schemaPropertyValueForMissingColumn;
          else if (void 0 === s) m = u.schemaPropertyValueForUndefinedCellValue;
          else if (null === s) m = u.schemaPropertyValueForNullCellValue;
          else if (Array.isArray(h.type)) {
            var j = (function (r, e) {
              var t = [],
                n = 0;
              for (; n < r.length; ) {
                var o = Wr(ue(r, e, n), 2),
                  i = o[0];
                (n += o[1] + e.length), t.push(i.trim());
              }
              return t;
            })(s, u.arrayValueSeparator).map(function (r) {
              if (!b) {
                var e = oe(r, h, u);
                return (
                  e.error && ((m = r), (b = e.error), (v = e.reason)), e.value
                );
              }
            });
            if (!b) {
              var P = j.every(le);
              m = P ? u.getEmptyArrayValue(j, { path: w }) : j;
            }
          } else {
            var E = oe(s, h, u);
            (b = E.error), (v = E.reason), (m = b ? s : E.value);
          }
          !b &&
            le(m) &&
            h.required &&
            c.push({ column: d, value: m, isMissingColumn: S }),
            b
              ? i.push(f({ column: d, value: m, error: b, reason: v }))
              : (l && !le(m) && (l = !1), void 0 !== m && (a[h.prop] = m));
        },
        p = 0,
        y = Object.keys(r);
      p < y.length;
      p++
    )
      s();
    if (l) return u.getEmptyObjectValue(a, { path: n });
    for (var m = 0, b = c; m < b.length; m++) {
      var v = b[m],
        d = v.column,
        h = v.value;
      if (
        !(
          v.isMissingColumn &&
          u.schemaPropertyShouldSkipRequiredValidationForMissingColumn(d, {
            object: a,
          })
        )
      ) {
        var g = r[d].required;
        ("boolean" == typeof g ? g : g(a)) &&
          i.push(f({ column: d, value: h, error: "required" }));
      }
    }
    return a;
  }
  function oe(r, e, t) {
    if (null === r) return { value: null };
    var n;
    if (
      ((n = e.parse
        ? ie(r, e.parse)
        : e.type
        ? (function (r, e, t) {
            switch (e) {
              case String:
                return ie(r, Gr);
              case Number:
                return ie(r, zr);
              case Date:
                return ie(r, function (r) {
                  return (function (r, e) {
                    var t = e.properties;
                    if (r instanceof Date) {
                      if (isNaN(r.valueOf())) throw new Xr("out_of_bounds");
                      return r;
                    }
                    if ("number" == typeof r) {
                      if (isNaN(r)) throw new Xr("invalid_number");
                      if (!isFinite(r)) throw new Xr("out_of_bounds");
                      var n = tr(r, t);
                      if (isNaN(n.valueOf())) throw new Xr("out_of_bounds");
                      return n;
                    }
                    throw new Xr("not_a_date");
                  })(r, { properties: t.properties });
                });
              case Boolean:
                return ie(r, Yr);
              default:
                if ("function" == typeof e) return ie(r, e);
                throw new Error(
                  "Unsupported schema type: ".concat((e && e.name) || e)
                );
            }
          })(r, Array.isArray(e.type) ? e.type[0] : e.type, t)
        : { value: r }),
      n.error)
    )
      return n;
    if (null !== n.value) {
      if (e.oneOf && e.oneOf.indexOf(n.value) < 0)
        return { error: "invalid", reason: "unknown" };
      if (e.validate)
        try {
          e.validate(n.value);
        } catch (r) {
          return { error: r.message };
        }
    }
    return n;
  }
  function ie(r, e) {
    try {
      return void 0 === (r = e(r)) ? { value: null } : { value: r };
    } catch (r) {
      var t = { error: r.message };
      return r.reason && (t.reason = r.reason), t;
    }
  }
  function ue(r, e, t) {
    for (var n = 0, o = ""; t + n < r.length; ) {
      var i = r[t + n];
      if (i === e) return [o, n];
      if ('"' === i) {
        var u = ue(r, '"', t + n + 1);
        (o += u[0]), (n += 1 + u[1] + 1);
      } else (o += i), n++;
    }
    return [o, n];
  }
  var ae = function (r) {
    return r[0].map(function (e, t) {
      return r.map(function (r) {
        return r[t];
      });
    });
  };
  function le(r) {
    return null == r;
  }
  function fe(r) {
    return (
      (fe =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (r) {
              return typeof r;
            }
          : function (r) {
              return r &&
                "function" == typeof Symbol &&
                r.constructor === Symbol &&
                r !== Symbol.prototype
                ? "symbol"
                : typeof r;
            }),
      fe(r)
    );
  }
  function ce(r, e) {
    var t = Object.keys(r);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(r);
      e &&
        (n = n.filter(function (e) {
          return Object.getOwnPropertyDescriptor(r, e).enumerable;
        })),
        t.push.apply(t, n);
    }
    return t;
  }
  function se(r) {
    for (var e = 1; e < arguments.length; e++) {
      var t = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? ce(Object(t), !0).forEach(function (e) {
            pe(r, e, t[e]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(t))
        : ce(Object(t)).forEach(function (e) {
            Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(t, e));
          });
    }
    return r;
  }
  function pe(r, e, t) {
    return (
      (e = (function (r) {
        var e = (function (r, e) {
          if ("object" !== fe(r) || null === r) return r;
          var t = r[Symbol.toPrimitive];
          if (void 0 !== t) {
            var n = t.call(r, e || "default");
            if ("object" !== fe(n)) return n;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === e ? String : Number)(r);
        })(r, "string");
        return "symbol" === fe(e) ? e : String(e);
      })(e)) in r
        ? Object.defineProperty(r, e, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (r[e] = t),
      r
    );
  }
  function ye(r, e) {
    var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
      n = t.includeNullValues,
      o = t.ignoreEmptyRows,
      i = t.isColumnOriented,
      u = t.rowMap,
      a = {
        schemaPropertyValueForMissingColumn: void 0,
        schemaPropertyValueForUndefinedCellValue: void 0,
        schemaPropertyValueForNullCellValue: void 0,
        schemaPropertyShouldSkipRequiredValidationForMissingColumn: function (
          r,
          e
        ) {
          return e.path, !1;
        },
        getEmptyObjectValue: function (r, e) {
          return e.path ? void 0 : null;
        },
        getEmptyArrayValue: function () {
          return null;
        },
        arrayValueSeparator: ",",
      };
    n &&
      ((a.schemaPropertyValueForMissingColumn = null),
      (a.schemaPropertyValueForUndefinedCellValue = null),
      (a.schemaPropertyValueForNullCellValue = null),
      (a.getEmptyObjectValue = function (r, e) {
        return e.path, null;
      }));
    var l = te(
      r,
      e,
      se(se({}, a), {}, { rowIndexMap: u, isColumnOriented: i })
    );
    return (
      !1 !== o &&
        (l.rows = l.rows.filter(function (r) {
          return r !== a.getEmptyObjectValue(r, { path: void 0 });
        })),
      l
    );
  }
  function me(r) {
    return (
      (me =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (r) {
              return typeof r;
            }
          : function (r) {
              return r &&
                "function" == typeof Symbol &&
                r.constructor === Symbol &&
                r !== Symbol.prototype
                ? "symbol"
                : typeof r;
            }),
      me(r)
    );
  }
  var be = ["schemaPropertyValueForEmptyCell"];
  function ve(r, e) {
    var t = Object.keys(r);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(r);
      e &&
        (n = n.filter(function (e) {
          return Object.getOwnPropertyDescriptor(r, e).enumerable;
        })),
        t.push.apply(t, n);
    }
    return t;
  }
  function de(r) {
    for (var e = 1; e < arguments.length; e++) {
      var t = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? ve(Object(t), !0).forEach(function (e) {
            he(r, e, t[e]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(t))
        : ve(Object(t)).forEach(function (e) {
            Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(t, e));
          });
    }
    return r;
  }
  function he(r, e, t) {
    return (
      (e = (function (r) {
        var e = (function (r, e) {
          if ("object" !== me(r) || null === r) return r;
          var t = r[Symbol.toPrimitive];
          if (void 0 !== t) {
            var n = t.call(r, e || "default");
            if ("object" !== me(n)) return n;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === e ? String : Number)(r);
        })(r, "string");
        return "symbol" === me(e) ? e : String(e);
      })(e)) in r
        ? Object.defineProperty(r, e, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (r[e] = t),
      r
    );
  }
  function ge(r, e) {
    if (null == r) return {};
    var t,
      n,
      o = (function (r, e) {
        if (null == r) return {};
        var t,
          n,
          o = {},
          i = Object.keys(r);
        for (n = 0; n < i.length; n++)
          (t = i[n]), e.indexOf(t) >= 0 || (o[t] = r[t]);
        return o;
      })(r, e);
    if (Object.getOwnPropertySymbols) {
      var i = Object.getOwnPropertySymbols(r);
      for (n = 0; n < i.length; n++)
        (t = i[n]),
          e.indexOf(t) >= 0 ||
            (Object.prototype.propertyIsEnumerable.call(r, t) && (o[t] = r[t]));
    }
    return o;
  }
  function we(r) {
    return (
      (we =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (r) {
              return typeof r;
            }
          : function (r) {
              return r &&
                "function" == typeof Symbol &&
                r.constructor === Symbol &&
                r !== Symbol.prototype
                ? "symbol"
                : typeof r;
            }),
      we(r)
    );
  }
  function Oe(r) {
    for (var e = {}, t = 0, n = Object.keys(r); t < n.length; t++) {
      var o = n[t],
        i = r[o],
        u = void 0;
      "object" === we(i) && ((i = Object.keys(r[o])[0]), (u = Oe(r[o][i]))),
        (e[o] = { prop: i }),
        u && (e[o].type = u);
    }
    return e;
  }
  function Se(r) {
    return (
      (Se =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (r) {
              return typeof r;
            }
          : function (r) {
              return r &&
                "function" == typeof Symbol &&
                r.constructor === Symbol &&
                r !== Symbol.prototype
                ? "symbol"
                : typeof r;
            }),
      Se(r)
    );
  }
  var je = ["schema", "map"];
  function Pe(r, e) {
    var t = Object.keys(r);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(r);
      e &&
        (n = n.filter(function (e) {
          return Object.getOwnPropertyDescriptor(r, e).enumerable;
        })),
        t.push.apply(t, n);
    }
    return t;
  }
  function Ee(r) {
    for (var e = 1; e < arguments.length; e++) {
      var t = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? Pe(Object(t), !0).forEach(function (e) {
            Ae(r, e, t[e]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(t))
        : Pe(Object(t)).forEach(function (e) {
            Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(t, e));
          });
    }
    return r;
  }
  function Ae(r, e, t) {
    return (
      (e = (function (r) {
        var e = (function (r, e) {
          if ("object" !== Se(r) || null === r) return r;
          var t = r[Symbol.toPrimitive];
          if (void 0 !== t) {
            var n = t.call(r, e || "default");
            if ("object" !== Se(n)) return n;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === e ? String : Number)(r);
        })(r, "string");
        return "symbol" === Se(e) ? e : String(e);
      })(e)) in r
        ? Object.defineProperty(r, e, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (r[e] = t),
      r
    );
  }
  function Ce(r, e) {
    if (null == r) return {};
    var t,
      n,
      o = (function (r, e) {
        if (null == r) return {};
        var t,
          n,
          o = {},
          i = Object.keys(r);
        for (n = 0; n < i.length; n++)
          (t = i[n]), e.indexOf(t) >= 0 || (o[t] = r[t]);
        return o;
      })(r, e);
    if (Object.getOwnPropertySymbols) {
      var i = Object.getOwnPropertySymbols(r);
      for (n = 0; n < i.length; n++)
        (t = i[n]),
          e.indexOf(t) >= 0 ||
            (Object.prototype.propertyIsEnumerable.call(r, t) && (o[t] = r[t]));
    }
    return o;
  }
  function xe(r, e, t) {
    var n = t.schema,
      o = t.map,
      i = Ce(t, je);
    !n && o && (n = Oe(o));
    var u = Vr(r, e, Ee(Ee({}, i), {}, { properties: n || i.properties }));
    return n
      ? (function (r, e, t) {
          var n =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : {},
            o = n.schemaPropertyValueForEmptyCell;
          return r(
            e,
            t,
            de(
              de({}, ge(n, be)),
              {},
              { schemaPropertyValueForNullCellValue: o }
            )
          );
        })(ye, u.data, n, Ee(Ee({}, i), {}, { properties: u.properties }))
      : u;
  }
  return function (e) {
    var t,
      n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return ((t = e),
    t instanceof File || t instanceof Blob
      ? t.arrayBuffer().then(U)
      : U(t)).then(function (e) {
      return xe(e, r, n);
    });
  };
});
//# sourceMappingURL=read-excel-file.min.js.map
