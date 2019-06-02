
t = (new Date()).getTime().toString();

function get_antitoken(t) {
    var a12 = {
        utf8: {
            stringToBytes: function(t) {
                return a12.bin.stringToBytes(unescape(encodeURIComponent(t)))
            },
            bytesToString: function(t) {
                return decodeURIComponent(escape(a12.bin.bytesToString(t)))
            }
        },
        bin: {
            stringToBytes: function(t) {
                for (var e = [], a = 0; a < t.length; a++)
                    e.push(255 & t.charCodeAt(a));
                return e
            },
            bytesToString: function(t) {
                for (var e = [], a = 0; a < t.length; a++)
                    e.push(String.fromCharCode(t[a]));
                return e.join("")
            }
        }
    };
    var e = null;
    var n, i, r, o, s;
    n = {
        rotl: function(t, e) {
            return t << e | t >>> 32 - e
        },
        rotr: function(t, e) {
            return t << 32 - e | t >>> e
        },
        endian: function(t) {
            if (t.constructor == Number)
                return 16711935 & n.rotl(t, 8) | 4278255360 & n.rotl(t, 24);
            for (var e = 0; e < t.length; e++)
                t[e] = n.endian(t[e]);
            return t
        },
        randomBytes: function(t) {
            for (var e = []; t > 0; t--)
                e.push(Math.floor(256 * Math.random()));
            return e
        },
        bytesToWords: function(t) {
            for (var e = [], a = 0, n = 0; a < t.length; a++,
            n += 8)
                e[n >>> 5] |= t[a] << 24 - n % 32;
            return e
        },
        wordsToBytes: function(t) {
            for (var e = [], a = 0; a < 32 * t.length; a += 8)
                e.push(t[a >>> 5] >>> 24 - a % 32 & 255);
            return e
        },
        bytesToHex: function(t) {
            for (var e = [], a = 0; a < t.length; a++)
                e.push((t[a] >>> 4).toString(16)),
                e.push((15 & t[a]).toString(16));
            return e.join("")
        },
        hexToBytes: function(t) {
            for (var e = [], a = 0; a < t.length; a += 2)
                e.push(parseInt(t.substr(a, 2), 16));
            return e
        },
        bytesToBase64: function(t) {
            for (var e = [], n = 0; n < t.length; n += 3)
                for (var i = t[n] << 16 | t[n + 1] << 8 | t[n + 2], r = 0; r < 4; r++)
                    8 * n + 6 * r <= 8 * t.length ? e.push(a.charAt(i >>> 6 * (3 - r) & 63)) : e.push("=");
            return e.join("")
        },
        base64ToBytes: function(t) {
            t = t.replace(/[^A-Z0-9+\/]/gi, "");
            for (var e = [], n = 0, i = 0; n < t.length; i = ++n % 4)
                0 != i && e.push((a.indexOf(t.charAt(n - 1)) & Math.pow(2, -2 * i + 8) - 1) << 2 * i | a.indexOf(t.charAt(n)) >>> 6 - 2 * i);
            return e
        }
    },
    i = a12.utf8,
    r = function(t) {
        return null != t && (a(t) || function(t) {
            return "function" == typeof t.readFloatLE && "function" == typeof t.slice && a(t.slice(0, 0))
        }(t) || !!t._isBuffer)
    },
    o = a12.bin,
    (s = function(t, e) {
        t.constructor == String ? t = e && "binary" === e.encoding ? o.stringToBytes(t) : i.stringToBytes(t) : r(t) ? t = Array.prototype.slice.call(t, 0) : Array.isArray(t) || (t = t.toString());
        for (var a = n.bytesToWords(t), l = 8 * t.length, c = 1732584193, d = -271733879, h = -1732584194, p = 271733878, u = 0; u < a.length; u++)
            a[u] = 16711935 & (a[u] << 8 | a[u] >>> 24) | 4278255360 & (a[u] << 24 | a[u] >>> 8);
        a[l >>> 5] |= 128 << l % 32,
        a[14 + (l + 64 >>> 9 << 4)] = l;
        var f = s._ff
          , m = s._gg
          , v = s._hh
          , y = s._ii;
        for (u = 0; u < a.length; u += 16) {
            var g = c
              , _ = d
              , b = h
              , $ = p;
            d = y(d = y(d = y(d = y(d = v(d = v(d = v(d = v(d = m(d = m(d = m(d = m(d = f(d = f(d = f(d = f(d, h = f(h, p = f(p, c = f(c, d, h, p, a[u + 0], 7, -680876936), d, h, a[u + 1], 12, -389564586), c, d, a[u + 2], 17, 606105819), p, c, a[u + 3], 22, -1044525330), h = f(h, p = f(p, c = f(c, d, h, p, a[u + 4], 7, -176418897), d, h, a[u + 5], 12, 1200080426), c, d, a[u + 6], 17, -1473231341), p, c, a[u + 7], 22, -45705983), h = f(h, p = f(p, c = f(c, d, h, p, a[u + 8], 7, 1770035416), d, h, a[u + 9], 12, -1958414417), c, d, a[u + 10], 17, -42063), p, c, a[u + 11], 22, -1990404162), h = f(h, p = f(p, c = f(c, d, h, p, a[u + 12], 7, 1804603682), d, h, a[u + 13], 12, -40341101), c, d, a[u + 14], 17, -1502002290), p, c, a[u + 15], 22, 1236535329), h = m(h, p = m(p, c = m(c, d, h, p, a[u + 1], 5, -165796510), d, h, a[u + 6], 9, -1069501632), c, d, a[u + 11], 14, 643717713), p, c, a[u + 0], 20, -373897302), h = m(h, p = m(p, c = m(c, d, h, p, a[u + 5], 5, -701558691), d, h, a[u + 10], 9, 38016083), c, d, a[u + 15], 14, -660478335), p, c, a[u + 4], 20, -405537848), h = m(h, p = m(p, c = m(c, d, h, p, a[u + 9], 5, 568446438), d, h, a[u + 14], 9, -1019803690), c, d, a[u + 3], 14, -187363961), p, c, a[u + 8], 20, 1163531501), h = m(h, p = m(p, c = m(c, d, h, p, a[u + 13], 5, -1444681467), d, h, a[u + 2], 9, -51403784), c, d, a[u + 7], 14, 1735328473), p, c, a[u + 12], 20, -1926607734), h = v(h, p = v(p, c = v(c, d, h, p, a[u + 5], 4, -378558), d, h, a[u + 8], 11, -2022574463), c, d, a[u + 11], 16, 1839030562), p, c, a[u + 14], 23, -35309556), h = v(h, p = v(p, c = v(c, d, h, p, a[u + 1], 4, -1530992060), d, h, a[u + 4], 11, 1272893353), c, d, a[u + 7], 16, -155497632), p, c, a[u + 10], 23, -1094730640), h = v(h, p = v(p, c = v(c, d, h, p, a[u + 13], 4, 681279174), d, h, a[u + 0], 11, -358537222), c, d, a[u + 3], 16, -722521979), p, c, a[u + 6], 23, 76029189), h = v(h, p = v(p, c = v(c, d, h, p, a[u + 9], 4, -640364487), d, h, a[u + 12], 11, -421815835), c, d, a[u + 15], 16, 530742520), p, c, a[u + 2], 23, -995338651), h = y(h, p = y(p, c = y(c, d, h, p, a[u + 0], 6, -198630844), d, h, a[u + 7], 10, 1126891415), c, d, a[u + 14], 15, -1416354905), p, c, a[u + 5], 21, -57434055), h = y(h, p = y(p, c = y(c, d, h, p, a[u + 12], 6, 1700485571), d, h, a[u + 3], 10, -1894986606), c, d, a[u + 10], 15, -1051523), p, c, a[u + 1], 21, -2054922799), h = y(h, p = y(p, c = y(c, d, h, p, a[u + 8], 6, 1873313359), d, h, a[u + 15], 10, -30611744), c, d, a[u + 6], 15, -1560198380), p, c, a[u + 13], 21, 1309151649), h = y(h, p = y(p, c = y(c, d, h, p, a[u + 4], 6, -145523070), d, h, a[u + 11], 10, -1120210379), c, d, a[u + 2], 15, 718787259), p, c, a[u + 9], 21, -343485551),
            c = c + g >>> 0,
            d = d + _ >>> 0,
            h = h + b >>> 0,
            p = p + $ >>> 0
        }
        return n.endian([c, d, h, p])
    }
    )._ff = function(t, e, a, n, i, r, o) {
        var s = t + (e & a | ~e & n) + (i >>> 0) + o;
        return (s << r | s >>> 32 - r) + e
    }
    ,
    s._gg = function(t, e, a, n, i, r, o) {
        var s = t + (e & n | a & ~n) + (i >>> 0) + o;
        return (s << r | s >>> 32 - r) + e
    }
    ,
    s._hh = function(t, e, a, n, i, r, o) {
        var s = t + (e ^ a ^ n) + (i >>> 0) + o;
        return (s << r | s >>> 32 - r) + e
    }
    ,
    s._ii = function(t, e, a, n, i, r, o) {
        var s = t + (a ^ (e | ~n)) + (i >>> 0) + o;
        return (s << r | s >>> 32 - r) + e
    }
    ,
    s._blocksize = 16,
    s._digestsize = 16;
    //t.exports = function(t, e) {
    //    if (t === undefined || null === t)
    //        throw new Error("Illegal argument " + t);
    var a = n.wordsToBytes(s(t, e));
    return e && e.asBytes ? a : e && e.asString ? o.bytesToString(a) : n.bytesToHex(a)
    //},
};



console.log(get_antitoken(t))