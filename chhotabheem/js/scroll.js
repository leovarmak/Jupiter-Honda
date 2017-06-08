var TINY = {};

function T$(id) { return document.getElementById(id) }
function T$$$() { return document.all ? 1 : 0 }

TINY.scroller = function () {
    return {
        init: function (a, c, b, s, d) {
            try {

                if (a == null || a == '' || c == null || c == '' || b == null || b == '' || s == '' || s == null || d == null || d == '') {

                }
                else {
                    a = T$(a); a.c = c; a.s = s; c = T$(c); b = T$(b); s = T$(s); a.n = d || 0;
                    b.style.display = 'block'; a.style.overflow = 'hidden';
                    var h = a.offsetHeight, t = c.offsetHeight;

                    if (t != 0 && h != 0) {
                        if (t < h) {
                            b.style.display = 'none'
                        } else {


                            a.m = h - t; a.d = t / h; s.style.height = (h * (h / t)) + 'px'; s.style.top = b.style.top = 0;
                            s.onmousedown = function (event) { TINY.scroller.st(event, a.id); return false };
                            s.onselectstart = function () { return false }
                        }
                    }

                    if (window.addEventListener) a.addEventListener('DOMMouseScroll', function (event) { TINY.scroller.wheel(event, a.id); return false }, false);
                    /** IE/Opera. */
                    a.onmousewheel = a.onmousewheel = function (event) { TINY.scroller.wheel(event, a.id); return false };

                    a.l = b.offsetHeight - s.offsetHeight
                }
            }
            catch (e) {
                //  alert(e.id + " doesn't exist");
            }
        },
        /** Event handler for mouse wheel event.
        */
        wheel: function (event, f) {
            try {

                var delta = 0;
                if (!event) /* For IE. */
                    event = window.event;
                if (event.wheelDelta) { /* IE/Opera. */
                    delta = event.wheelDelta / 60;
                } else if (event.detail) { /** Mozilla case. */
                    /** In Mozilla, sign of delta is different than in IE.
                    * Also, delta is multiple of 3.
                    */
                    delta = -event.detail / 2;
                }
                /** If delta is nonzero, handle it.
                * Basically, delta is now positive if wheel was scrolled up,
                * and negative, if wheel was scrolled down.
                */
                if (delta) {
                    //console.log(delta);
                    var a = T$(f), s = T$(a.s), c = T$(a.c); a.bcs = TINY.cursor.top(event); a.bct = parseInt(s.style.top);
                    var m = a.bct - delta;
                    if (m >= 0 && m < a.l) {
                        s.style.top = m + 'px'; c.style.top = (m * -1 * a.d) + 'px'
                    } else if (m < 0) {
                        s.style.top = 0; c.style.top = 0
                    } else if (m > a.l) {
                        s.style.top = a.l + 'px'; c.style.top = a.m + 'px'
                    }
                }
                /** Prevent default actions caused by mouse wheel.
                * That might be ugly, but we handle scrolls somehow
                * anyway, so don't bother here..
                */
                if (event.preventDefault)
                    event.preventDefault();
                event.returnValue = false;
            }
            catch (e) {

            }
        },
        st: function (e, f) {
            try {
                var a = T$(f), s = T$(a.s), c = T$(a.c); a.bcs = TINY.cursor.top(e); a.bct = parseInt(s.style.top);
                if (a.mv) { this.sp(f) }
                a.mv = function (event) { TINY.scroller.mv(event, f) };
                a.sp = function () { TINY.scroller.sp(f) };
                if (T$$$()) {
                    document.attachEvent('onmousemove', a.mv); document.attachEvent('onmouseup', a.sp)
                } else {
                    document.addEventListener('mousemove', a.mv, 1); document.addEventListener('mouseup', a.sp, 1)
                }
                if (a.d) { s.className += ' ' + a.n }
            }
            catch (e) {
            }
        },
        mv: function (e, f) {
            try {
                var a = T$(f), m = TINY.cursor.top(e) - a.bcs + a.bct, s = T$(a.s), c = T$(a.c);
                if (m >= 0 && m < a.l) {
                    s.style.top = m + 'px'; c.style.top = (m * -1 * a.d) + 'px'
                } else if (m < 0) {
                    s.style.top = 0; c.style.top = 0
                } else if (m > a.l) {
                    s.style.top = a.l + 'px'; c.style.top = a.m + 'px'
                }
            }
            catch (e) {
            }
        },
        sp: function (f) {

            try {
                var a = T$(f), s = T$(a.s); if (a.d) { s.className = s.className.replace(' ' + a.n, '') }
            }
            catch (e) {
            }
            if (T$$$()) {
                try {
                    document.detachEvent('onmousemove', a.mv); document.detachEvent('onmouseup', a.sp)
                }
                catch (e) {
                }
            }
            else {
                try {
                    document.removeEventListener('mousemove', a.mv, 1); document.removeEventListener('mouseup', a.sp, 1)
                }
                catch (e) {
                }
            }
            a.mv = 0;
        }

    }
} ();

TINY.cursor = function () {
    return {

        top: function (e) {
            try {
                return T$$$() ? window.event.clientY + document.documentElement.scrollTop + document.body.scrollTop : e.clientY + window.scrollY
            }
            catch (e) {
            }
        }
    }
} ();