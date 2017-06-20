/**
 * Created by dhl on 2017/5/28.
 */
"use strict";
(function(h, d) {
    var g = typeof d === "string" ? document.querySelector(d) : d,
        f = g.getBoundingClientRect(),
        c = f.width,
        l = f.height,
        n = g.getContext("2d"),
        j = {
            x: c / 2,
            y: l / 2,
            radius: 180
        },
        k = 40,
        e = 60,
        a = [],
        b;
    g.width = c;
    g.height = l;
    h.raf = h.requestAnimationFrame || webkitRequestAnimationFrame ||
        function(p) {
            return setTimeout(p, 1000 / 60)
        };
    h.caf = h.cancelAnimationFrame || webkitCancelAnimationFrame ||
        function(p) {
            clearTimeout(p)
        };
    Function.prototype.method = function(q, p) {
        return this.prototype[q] = p, this
    };

    function i(p, r, q) {
        this.x = this.ox = p;
        this.y = this.oy = r;
        this.radius = Math.random() * 1 + 2;
        this.timer = q | 0
    }
    i.method("draw", function(p, v, r) {
        var s = this.closest,
            q, u, t = this.getAlpha(r);
        if (t > 0) {
            p.fillStyle = p.strokeStyle = "rgba(156,217,249," + t + ")";
            p.beginPath();
            p.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            p.closePath();
            p.fill();
            if (s) {
                q = s.length;
                while (q--) {
                    u = v[s[q]];
                    p.beginPath();
                    p.moveTo(this.x, this.y);
                    p.lineTo(u.x, u.y);
                    p.stroke()
                }
            }
        }
        if (this._isMove) {
            this.move();
            return
        }
        if (this.timer++ === this._moveFrames) {
            this.setMove()
        }
    }).method("setMove", function() {
        this._isMove = true;
        this._frames = Math.random() * 100 + 120;
        this._frame = 0;
        this._tx = this.ox + Math.random() * 100 - 50;
        this._ty = this.oy + Math.random() * 100 - 50
    }).method("move", function() {
        this.x = this.ease(this._frame++, this.x, this._tx - this.x, this._frames);
        this.y = this.ease(this._frame, this.y, this._ty - this.y, this._frames);
        if (Math.abs(this.x - this._tx) < 0.5 && Math.abs(this.y - this._ty) < 0.5) {
            this._isMove = false;
            this.timer = 0
        }
    }).method("getAlpha", function(s) {
        var q = this.x - s.x,
            p = this.y - s.y,
            u = Math.sqrt(q * q + p * p),
            t = s.radius;
        return u > t ? 0 : (1 - u / t) * 0.6
    }).method("ease", function(q, p, s, r) {
        if ((q /= r / 2) < 1) {
            return s / 2 * q * q + p
        }
        return -s / 2 * ((--q) * (q - 2) - 1) + p
    }).method("_moveFrames", e);

    function m() {
        var q = Math.max(60, c * 1.5 / k),
            t = l * 1.5 / q + 0.5 | 0,
            v, r = 0,
            s, u, p;
        v = c / q + 0.5 | 0;
        for (; r < t; r++) {
            for (s = 0; s < v; s++) {
                u = new i(s * q + (Math.random() * q * 2 - q), r * q + (Math.random() * q * 2 - q), Math.random() * e);
                p = r * v + s;
                a[p] = u;
                if (r & 1 && s && 1) {
                    u.closest = [p - 1, p - v, p - v - 1];
                    s < v - 1 && u.closest.push(p + 1);
                    r < t - 1 && u.closest.push(p + v)
                }
            }
        }
        o()
    }
    function o() {
        n.clearRect(0, 0, c, l);
        a.forEach(function(r, q, p) {
            r.draw(n, p, j)
        });
        b = raf(o)
    }
    g.addEventListener("mousemove", function(p) {
        j.x = p.clientX - f.left;
        j.y = p.clientY - f.top
    }, false);
    h.addEventListener("resize", function() {
        caf(b);
        a = [];
        f = g.getBoundingClientRect();
        g.width = c = f.width;
        g.height = l = f.height;
        m()
    }, false);
    m()
})(this, document.querySelector(".stage"));