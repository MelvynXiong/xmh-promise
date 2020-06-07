!(function (e) {
  var t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var i = (t[r] = { i: r, l: !1, exports: {} });
    return e[r].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function (e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (n.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var i in e)
          n.d(
            r,
            i,
            function (t) {
              return e[t];
            }.bind(null, i)
          );
      return r;
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ""),
    n((n.s = 0));
})([
  function (e, t) {
    function n(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    const r = "PENDING",
      i = "FULFILLED",
      o = "REJECTED";
    class s {
      constructor(e) {
        n(this, "resolve", (e) => {
          this.fulfilled(e);
        }),
          n(this, "fulfilled", (e) => {
            this.state === r &&
              ((this.value = e),
              this.fulfilledHandlers.forEach((t) => t(e)),
              this.state);
          }),
          n(this, "reject", (e) => {
            this.state === r &&
              ((this.val = e),
              this.rejectedHandlers.forEach((t) => t(e)),
              (this.state = o));
          }),
          (this.state = r),
          (this.value = null),
          (this.fulfilledHandlers = []),
          (this.rejectedHandlers = []),
          e(this.resolve, this.reject);
      }
      then(e, t) {
        return new s((n, s) => {
          this.state === i && "function" == typeof e && e(this.val),
            this.state === o && "function" == typeof t && t(this.val),
            this.state === r &&
              ("function" == typeof e && this.fulfilledHandlers.push(e),
              "function" == typeof t && this.rejectedHandlers.push(t));
        });
      }
      resolvePromise(e, t, n, r) {}
    }
    new s((e, t) => {
      e(1);
    })
      .then((e) => 2)
      .then((e) => {
        console.log(e);
      }),
      (e.exports = {
        resolved: function (e) {
          return new s(function (t) {
            t(e);
          });
        },
        rejected: function (e) {
          return new s(function (t, n) {
            n(e);
          });
        },
        deferred: function () {
          var e, t;
          return {
            promise: new s(function (n, r) {
              (e = n), (t = r);
            }),
            resolve: e,
            reject: t,
          };
        },
      });
  },
]);
