var VectorCanvas = function (l, t, e) {
    if (this.mode = window.SVGAngle ? "svg" : "vml", this.params = e, "svg" === this.mode) this.createSvgNode =
        function (l) {
            return document.createElementNS(this.svgns, l)
        };
    else {
        try {
            document.namespaces.rvml || document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), this
                .createVmlNode = function (l) {
                    return document.createElement("<rvml:" + l + ' class="rvml">')
                }
        } catch (l) {
            this.createVmlNode = function (l) {
                return document.createElement("<" + l + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
            }
        }
        document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)")
    }
    "svg" === this.mode ? this.canvas = this.createSvgNode("svg") : (this.canvas = this.createVmlNode("group"), this
        .canvas.style.position = "absolute"), this.setSize(l, t)
};
VectorCanvas.prototype = {
    svgns: "http://www.w3.org/2000/svg",
    mode: "svg",
    width: 0,
    height: 0,
    canvas: null
};
var ColorScale = function (l, t, e, a) {
    l && this.setColors(l), t && this.setNormalizeFunction(t), e && this.setMin(e), e && this.setMax(a)
};
ColorScale.prototype = {
    colors: []
};
var JQVMap = function (l) {
    l = l || {};
    var t, e = this,
        a = JQVMap.maps[l.map];
    if (!a) throw new Error('Invalid "' + l.map +
        '" map parameter. Please make sure you have loaded this map file in your HTML.');
    for (var i in this.selectedRegions = [], this.multiSelectRegion = l.multiSelectRegion, this.container = l
            .container, this.defaultWidth = a.width, this.defaultHeight = a.height, this.color = l.color, this
            .selectedColor = l.selectedColor, this.hoverColor = l.hoverColor, this.hoverColors = l.hoverColors, this
            .hoverOpacity = l.hoverOpacity, this.setBackgroundColor(l.backgroundColor), this.width = l.container
            .width(), this.height = l.container.height(), this.resize(), jQuery(window).resize((function () {
                var a = l.container.width(),
                    i = l.container.height();
                if (a && i) {
                    e.width = a, e.height = i, e.resize(), e.canvas.setSize(e.width, e.height), e
                        .applyTransform();
                    var n = jQuery.Event("resize.jqvmap");
                    jQuery(l.container).trigger(n, [a, i]), t && (jQuery(".jqvmap-pin").remove(), e
                        .pinHandlers = !1, e.placePins(t.pins, t.mode))
                }
            })), this.canvas = new VectorCanvas(this.width, this.height, l), l.container.append(this.canvas.canvas),
            this.makeDraggable(), this.rootGroup = this.canvas.createGroup(!0), this.index = JQVMap.mapIndex, this
            .label = jQuery("<div/>").addClass("jqvmap-label").appendTo(jQuery("body")).hide(), l.enableZoom && (
                jQuery("<div/>").addClass("jqvmap-zoomin").text("+").appendTo(l.container), jQuery("<div/>")
                .addClass("jqvmap-zoomout").html("&#x2212;").appendTo(l.container)), e.countries = [], a.paths) {
        var n = this.canvas.createPath({
            path: a.paths[i].path
        });
        n.setFill(this.color), n.id = e.getCountryId(i), e.countries[i] = n, "svg" === this.canvas.mode ? n
            .setAttribute("class", "jqvmap-region") : jQuery(n).addClass("jqvmap-region"), jQuery(this.rootGroup)
            .append(n)
    }
    if (jQuery(l.container).delegate("svg" === this.canvas.mode ? "path" : "shape", "mouseover mouseout", (
            function (t) {
                var i = t.target,
                    n = t.target.id.split("_").pop(),
                    o = jQuery.Event("labelShow.jqvmap"),
                    s = jQuery.Event("regionMouseOver.jqvmap");
                n = n.toLowerCase(), "mouseover" === t.type ? (jQuery(l.container).trigger(s, [n, a.paths[n]
                    .name
                ]), s.isDefaultPrevented() || e.highlight(n, i), l.showTooltip && (e.label.text(a.paths[
                        n].name), jQuery(l.container).trigger(o, [e.label, n]), o
                .isDefaultPrevented() || (e.label.show(), e.labelWidth = e.label.width(), e
                        .labelHeight = e.label.height()))) : (e.unhighlight(n, i), e.label.hide(), jQuery(l
                    .container).trigger("regionMouseOut.jqvmap", [n, a.paths[n].name]))
            })), jQuery(l.container).delegate("svg" === this.canvas.mode ? "path" : "shape", "click", (function (
        t) {
            var i = t.target,
                n = t.target.id.split("_").pop(),
                o = jQuery.Event("regionClick.jqvmap");
            if (n = n.toLowerCase(), jQuery(l.container).trigger(o, [n, a.paths[n].name]), !l
                .multiSelectRegion && !o.isDefaultPrevented())
                for (var s in a.paths) e.countries[s].currentFillColor = e.countries[s].getOriginalFill(), e
                    .countries[s].setFill(e.countries[s].getOriginalFill());
            o.isDefaultPrevented() || (e.isSelected(n) ? e.deselect(n, i) : e.select(n, i))
        })), l.showTooltip && l.container.mousemove((function (l) {
            if (e.label.is(":visible")) {
                var t = l.pageX - -50 - e.labelWidth,
                    a = l.pageY - 15 - e.labelHeight;
                0 > t && (t = l.pageX + 15), 0 > a && (a = l.pageY + 15), e.label.css({
                    left: t,
                    top: a
                })
            }
        })), this.setColors(l.colors), this.canvas.canvas.appendChild(this.rootGroup), this.applyTransform(), this
        .colorScale = new ColorScale(l.scaleColors, l.normalizeFunction, l.valueMin, l.valueMax), l.values && (this
            .values = l.values, this.setValues(l.values)), l.selectedRegions)
        if (l.selectedRegions instanceof Array)
            for (var o in l.selectedRegions) this.select(l.selectedRegions[o].toLowerCase());
        else this.select(l.selectedRegions.toLowerCase());
    if (this.bindZoomButtons(), l.pins && (t = {
            pins: l.pins,
            mode: l.pinMode
        }, this.pinHandlers = !1, this.placePins(l.pins, l.pinMode)), l.showLabels) {
        this.pinHandlers = !1;
        var s = {};
        for (i in e.countries) "function" != typeof e.countries[i] && (l.pins && l.pins[i] || (s[i] = i
        .toUpperCase()));
        t = {
            pins: s,
            mode: "content"
        }, this.placePins(s, "content")
    }
    JQVMap.mapIndex++
};
JQVMap.prototype = {
        transX: 0,
        transY: 0,
        scale: 1,
        baseTransX: 0,
        baseTransY: 0,
        baseScale: 1,
        width: 0,
        height: 0,
        countries: {},
        countriesColors: {},
        countriesData: {},
        zoomStep: 1.4,
        zoomMaxStep: 4,
        zoomCurStep: 1
    }, JQVMap.xlink = "http://www.w3.org/1999/xlink", JQVMap.mapIndex = 1, JQVMap.maps = {},
    function () {
        var l = {
                colors: 1,
                values: 1,
                backgroundColor: 1,
                scaleColors: 1,
                normalizeFunction: 1,
                enableZoom: 1,
                showTooltip: 1,
                borderColor: 1,
                borderWidth: 1,
                borderOpacity: 1,
                selectedRegions: 1,
                multiSelectRegion: 1
            },
            t = {
                onLabelShow: "labelShow",
                onLoad: "load",
                onRegionOver: "regionMouseOver",
                onRegionOut: "regionMouseOut",
                onRegionClick: "regionClick",
                onRegionSelect: "regionSelect",
                onRegionDeselect: "regionDeselect",
                onResize: "resize"
            };
        jQuery.fn.vectorMap = function (e) {
            var a = {
                    map: "world_en",
                    backgroundColor: "#a5bfdd",
                    color: "#f4f3f0",
                    hoverColor: "#c9dfaf",
                    hoverColors: {},
                    selectedColor: "#c9dfaf",
                    scaleColors: ["#b6d6ff", "#005ace"],
                    normalizeFunction: "linear",
                    enableZoom: !0,
                    showTooltip: !0,
                    borderColor: "#818181",
                    borderWidth: 1,
                    borderOpacity: .25,
                    selectedRegions: null,
                    multiSelectRegion: !1
                },
                i = this.data("mapObject");
            if ("addMap" === e) JQVMap.maps[arguments[1]] = arguments[2];
            else {
                if ("set" !== e || !l[arguments[1]]) {
                    if ("string" == typeof e && "function" == typeof i[e]) return i[e].apply(i, Array.prototype
                        .slice.call(arguments, 1));
                    for (var n in jQuery.extend(a, e), a.container = this, this.css({
                            position: "relative",
                            overflow: "hidden"
                        }), i = new JQVMap(a), this.data("mapObject", i), this.unbind(".jqvmap"), t) a[n] && this
                        .bind(t[n] + ".jqvmap", a[n]);
                    var o = jQuery.Event("load.jqvmap");
                    return jQuery(a.container).trigger(o, i), i
                }
                i["set" + arguments[1].charAt(0).toUpperCase() + arguments[1].substr(1)].apply(i, Array.prototype
                    .slice.call(arguments, 2))
            }
        }
    }(jQuery), ColorScale.arrayToRgb = function (l) {
        for (var t, e = "#", a = 0; a < l.length; a++) e += 1 === (t = l[a].toString(16)).length ? "0" + t : t;
        return e
    }, ColorScale.prototype.getColor = function (l) {
        "function" == typeof this.normalize && (l = this.normalize(l));
        for (var t, e = [], a = 0, i = 0; i < this.colors.length - 1; i++) t = this.vectorLength(this.vectorSubtract(
            this.colors[i + 1], this.colors[i])), e.push(t), a += t;
        var n, o = (this.maxValue - this.minValue) / a;
        for (i = 0; i < e.length; i++) e[i] *= o;
        for (i = 0, l -= this.minValue; l - e[i] >= 0;) l -= e[i], i++;
        for (n = i === this.colors.length - 1 ? this.vectorToNum(this.colors[i]).toString(16) : this.vectorToNum(this
                .vectorAdd(this.colors[i], this.vectorMult(this.vectorSubtract(this.colors[i + 1], this.colors[i]), l /
                    e[i]))).toString(16); n.length < 6;) n = "0" + n;
        return "#" + n
    }, ColorScale.rgbToArray = function (l) {
        return l = l.substr(1), [parseInt(l.substr(0, 2), 16), parseInt(l.substr(2, 2), 16), parseInt(l.substr(4, 2),
            16)]
    }, ColorScale.prototype.setColors = function (l) {
        for (var t = 0; t < l.length; t++) l[t] = ColorScale.rgbToArray(l[t]);
        this.colors = l
    }, ColorScale.prototype.setMax = function (l) {
        this.clearMaxValue = l, "function" == typeof this.normalize ? this.maxValue = this.normalize(l) : this
            .maxValue = l
    }, ColorScale.prototype.setMin = function (l) {
        this.clearMinValue = l, "function" == typeof this.normalize ? this.minValue = this.normalize(l) : this
            .minValue = l
    }, ColorScale.prototype.setNormalizeFunction = function (l) {
        "polynomial" === l ? this.normalize = function (l) {
                return Math.pow(l, .2)
            } : "linear" === l ? delete this.normalize : this.normalize = l, this.setMin(this.clearMinValue), this
            .setMax(this.clearMaxValue)
    }, ColorScale.prototype.vectorAdd = function (l, t) {
        for (var e = [], a = 0; a < l.length; a++) e[a] = l[a] + t[a];
        return e
    }, ColorScale.prototype.vectorLength = function (l) {
        for (var t = 0, e = 0; e < l.length; e++) t += l[e] * l[e];
        return Math.sqrt(t)
    }, ColorScale.prototype.vectorMult = function (l, t) {
        for (var e = [], a = 0; a < l.length; a++) e[a] = l[a] * t;
        return e
    }, ColorScale.prototype.vectorSubtract = function (l, t) {
        for (var e = [], a = 0; a < l.length; a++) e[a] = l[a] - t[a];
        return e
    }, ColorScale.prototype.vectorToNum = function (l) {
        for (var t = 0, e = 0; e < l.length; e++) t += Math.round(l[e]) * Math.pow(256, l.length - e - 1);
        return t
    }, JQVMap.prototype.applyTransform = function () {
        var l, t, e, a;
        this.defaultWidth * this.scale <= this.width ? (l = (this.width - this.defaultWidth * this.scale) / (2 * this
                .scale), e = (this.width - this.defaultWidth * this.scale) / (2 * this.scale)) : (l = 0, e = (this
                .width - this.defaultWidth * this.scale) / this.scale), this.defaultHeight * this.scale <= this.height ?
            (t = (this.height - this.defaultHeight * this.scale) / (2 * this.scale), a = (this.height - this
                .defaultHeight * this.scale) / (2 * this.scale)) : (t = 0, a = (this.height - this.defaultHeight * this
                .scale) / this.scale), this.transY > t ? this.transY = t : this.transY < a && (this.transY = a), this
            .transX > l ? this.transX = l : this.transX < e && (this.transX = e), this.canvas.applyTransformParams(this
                .scale, this.transX, this.transY)
    }, JQVMap.prototype.bindZoomButtons = function () {
        var l = this;
        this.container.find(".jqvmap-zoomin").click((function () {
            l.zoomIn()
        })), this.container.find(".jqvmap-zoomout").click((function () {
            l.zoomOut()
        }))
    }, JQVMap.prototype.deselect = function (l, t) {
        if (l = l.toLowerCase(), t = t || jQuery("#" + this.getCountryId(l))[0], this.isSelected(l)) this
            .selectedRegions.splice(this.selectIndex(l), 1), jQuery(this.container).trigger("regionDeselect.jqvmap", [
                l]), t.currentFillColor = t.getOriginalFill(), t.setFill(t.getOriginalFill());
        else
            for (var e in this.countries) this.selectedRegions.splice(this.selectedRegions.indexOf(e), 1), this
                .countries[e].currentFillColor = this.color, this.countries[e].setFill(this.color)
    }, JQVMap.prototype.getCountryId = function (l) {
        return "jqvmap" + this.index + "_" + l
    }, JQVMap.prototype.getPin = function (l) {
        return jQuery("#" + this.getPinId(l)).html()
    }, JQVMap.prototype.getPinId = function (l) {
        return this.getCountryId(l) + "_pin"
    }, JQVMap.prototype.getPins = function () {
        var l = this.container.find(".jqvmap-pin"),
            t = {};
        return jQuery.each(l, (function (l, e) {
            var a = (e = jQuery(e)).attr("for").toLowerCase(),
                i = e.html();
            t[a] = i
        })), JSON.stringify(t)
    }, JQVMap.prototype.highlight = function (l, t) {
        t = t || jQuery("#" + this.getCountryId(l))[0], this.hoverOpacity ? t.setOpacity(this.hoverOpacity) : this
            .hoverColors && l in this.hoverColors ? (t.currentFillColor = t.getFill() + "", t.setFill(this.hoverColors[
                l])) : this.hoverColor && (t.currentFillColor = t.getFill() + "", t.setFill(this.hoverColor))
    }, JQVMap.prototype.isSelected = function (l) {
        return this.selectIndex(l) >= 0
    }, JQVMap.prototype.makeDraggable = function () {
        var l, t, e, a, i, n, o, s, r, h = !1,
            L = this;
        L.isMoving = !1, L.isMovingTimeout = !1, this.container.mousemove((function (e) {
            return h && (L.transX -= (l - e.pageX) / L.scale, L.transY -= (t - e.pageY) / L.scale, L
                .applyTransform(), l = e.pageX, t = e.pageY, L.isMoving = !0, L.isMovingTimeout &&
                clearTimeout(L.isMovingTimeout), L.container.trigger("drag")), !1
        })).mousedown((function (e) {
            return h = !0, l = e.pageX, t = e.pageY, !1
        })).mouseup((function () {
            return h = !1, clearTimeout(L.isMovingTimeout), L.isMovingTimeout = setTimeout((function () {
                L.isMoving = !1
            }), 100), !1
        })).mouseout((function () {
            return h && L.isMoving ? (clearTimeout(L.isMovingTimeout), L.isMovingTimeout = setTimeout((
                function () {
                    h = !1, L.isMoving = !1
                }), 100), !1) : void 0
        })), jQuery(this.container).bind("touchmove", (function (l) {
            var t, h, p, c, u = l.originalEvent.touches;
            if (1 === u.length) {
                if (1 === e) {
                    if (s === u[0].pageX && r === u[0].pageY) return;
                    p = L.transX, c = L.transY, L.transX -= (s - u[0].pageX) / L.scale, L.transY -= (r - u[
                            0].pageY) / L.scale, L.applyTransform(), (p !== L.transX || c !== L.transY) && l
                        .preventDefault(), L.isMoving = !0, L.isMovingTimeout && clearTimeout(L
                            .isMovingTimeout)
                }
                s = u[0].pageX, r = u[0].pageY
            } else 2 === u.length && (2 === e ? (h = Math.sqrt(Math.pow(u[0].pageX - u[1].pageX, 2) + Math
                    .pow(u[0].pageY - u[1].pageY, 2)) / n, L.setScale(o * h, a, i), l
                .preventDefault()) : (t = jQuery(L.container).offset(), a = u[0].pageX > u[1]
                .pageX ? u[1].pageX + (u[0].pageX - u[1].pageX) / 2 : u[0].pageX + (u[1].pageX - u[
                    0].pageX) / 2, i = u[0].pageY > u[1].pageY ? u[1].pageY + (u[0].pageY - u[1]
                    .pageY) / 2 : u[0].pageY + (u[1].pageY - u[0].pageY) / 2, a -= t.left, i -= t
                .top, o = L.scale, n = Math.sqrt(Math.pow(u[0].pageX - u[1].pageX, 2) + Math.pow(u[
                    0].pageY - u[1].pageY, 2))));
            e = u.length
        })), jQuery(this.container).bind("touchstart", (function () {
            e = 0
        })), jQuery(this.container).bind("touchend", (function () {
            e = 0
        }))
    }, JQVMap.prototype.placePins = function (l, t) {
        var e = this;
        if ((!t || "content" !== t && "id" !== t) && (t = "content"), "content" === t ? jQuery.each(l, (function (l,
            t) {
                if (0 !== jQuery("#" + e.getCountryId(l)).length) {
                    var a = e.getPinId(l),
                        i = jQuery("#" + a);
                    i.length > 0 && i.remove(), e.container.append('<div id="' + a + '" for="' + l +
                        '" class="jqvmap-pin" style="position:absolute">' + t + "</div>")
                }
            })) : jQuery.each(l, (function (l, t) {
                if (0 !== jQuery("#" + e.getCountryId(l)).length) {
                    var a = e.getPinId(l),
                        i = jQuery("#" + a);
                    i.length > 0 && i.remove(), e.container.append('<div id="' + a + '" for="' + l +
                        '" class="jqvmap-pin" style="position:absolute"></div>'), i.append(jQuery("#" + t))
                }
            })), this.positionPins(), !this.pinHandlers) {
            this.pinHandlers = !0;
            var a = function () {
                e.positionPins()
            };
            this.container.bind("zoomIn", a).bind("zoomOut", a).bind("drag", a)
        }
    }, JQVMap.prototype.positionPins = function () {
        var l = this,
            t = this.container.find(".jqvmap-pin");
        jQuery.each(t, (function (t, e) {
            e = jQuery(e);
            var a = l.getCountryId(e.attr("for").toLowerCase()),
                i = jQuery("#" + a),
                n = document.getElementById(a).getBBox(),
                o = i.position(),
                s = l.scale,
                r = o.left + n.width / 2 * s - e.width() / 2,
                h = o.top + n.height / 2 * s - e.height() / 2;
            e.css("left", r).css("top", h)
        }))
    }, JQVMap.prototype.removePin = function (l) {
        l = l.toLowerCase(), jQuery("#" + this.getPinId(l)).remove()
    }, JQVMap.prototype.removePins = function () {
        this.container.find(".jqvmap-pin").remove()
    }, JQVMap.prototype.reset = function () {
        for (var l in this.countries) this.countries[l].setFill(this.color);
        this.scale = this.baseScale, this.transX = this.baseTransX, this.transY = this.baseTransY, this.applyTransform()
    }, JQVMap.prototype.resize = function () {
        var l = this.baseScale;
        this.width / this.height > this.defaultWidth / this.defaultHeight ? (this.baseScale = this.height / this
                .defaultHeight, this.baseTransX = Math.abs(this.width - this.defaultWidth * this.baseScale) / (2 * this
                    .baseScale)) : (this.baseScale = this.width / this.defaultWidth, this.baseTransY = Math.abs(this
                .height - this.defaultHeight * this.baseScale) / (2 * this.baseScale)), this.scale *= this.baseScale /
            l, this.transX *= this.baseScale / l, this.transY *= this.baseScale / l
    }, JQVMap.prototype.select = function (l, t) {
        l = l.toLowerCase(), t = t || jQuery("#" + this.getCountryId(l))[0], this.isSelected(l) || (this
            .multiSelectRegion ? this.selectedRegions.push(l) : this.selectedRegions = [l], jQuery(this.container)
            .trigger("regionSelect.jqvmap", [l]), this.selectedColor && t && (t.currentFillColor = this
                .selectedColor, t.setFill(this.selectedColor)))
    }, JQVMap.prototype.selectIndex = function (l) {
        l = l.toLowerCase();
        for (var t = 0; t < this.selectedRegions.length; t++)
            if (l === this.selectedRegions[t]) return t;
        return -1
    }, JQVMap.prototype.setBackgroundColor = function (l) {
        this.container.css("background-color", l)
    }, JQVMap.prototype.setColors = function (l, t) {
        if ("string" == typeof l) this.countries[l].setFill(t), this.countries[l].setAttribute("original", t);
        else {
            var e = l;
            for (var a in e) this.countries[a] && (this.countries[a].setFill(e[a]), this.countries[a].setAttribute(
                "original", e[a]))
        }
    }, JQVMap.prototype.setNormalizeFunction = function (l) {
        this.colorScale.setNormalizeFunction(l), this.values && this.setValues(this.values)
    }, JQVMap.prototype.setScale = function (l) {
        this.scale = l, this.applyTransform()
    }, JQVMap.prototype.setScaleColors = function (l) {
        this.colorScale.setColors(l), this.values && this.setValues(this.values)
    }, JQVMap.prototype.setValues = function (l) {
        var t, e = 0,
            a = Number.MAX_VALUE;
        for (var i in l) i = i.toLowerCase(), t = parseFloat(l[i]), isNaN(t) || (t > e && (e = l[i]), a > t && (a = t));
        a === e && e++, this.colorScale.setMin(a), this.colorScale.setMax(e);
        var n = {};
        for (i in l) i = i.toLowerCase(), t = parseFloat(l[i]), n[i] = isNaN(t) ? this.color : this.colorScale.getColor(
            t);
        this.setColors(n), this.values = l
    }, JQVMap.prototype.unhighlight = function (l, t) {
        l = l.toLowerCase(), (t = t || jQuery("#" + this.getCountryId(l))[0]).setOpacity(1), t.currentFillColor && t
            .setFill(t.currentFillColor)
    }, JQVMap.prototype.zoomIn = function () {
        var l = this,
            t = (jQuery("#zoom").innerHeight() - 12 - 30 - 6 - 7 - 6) / (this.zoomMaxStep - this.zoomCurStep);
        if (l.zoomCurStep < l.zoomMaxStep) {
            l.transX -= (l.width / l.scale - l.width / (l.scale * l.zoomStep)) / 2, l.transY -= (l.height / l.scale - l
                .height / (l.scale * l.zoomStep)) / 2, l.setScale(l.scale * l.zoomStep), l.zoomCurStep++;
            var e = jQuery("#zoomSlider");
            e.css("top", parseInt(e.css("top"), 10) - t), l.container.trigger("zoomIn")
        }
    }, JQVMap.prototype.zoomOut = function () {
        var l = this,
            t = (jQuery("#zoom").innerHeight() - 12 - 30 - 6 - 7 - 6) / (this.zoomMaxStep - this.zoomCurStep);
        if (l.zoomCurStep > 1) {
            l.transX += (l.width / (l.scale / l.zoomStep) - l.width / l.scale) / 2, l.transY += (l.height / (l.scale / l
                .zoomStep) - l.height / l.scale) / 2, l.setScale(l.scale / l.zoomStep), l.zoomCurStep--;
            var e = jQuery("#zoomSlider");
            e.css("top", parseInt(e.css("top"), 10) + t), l.container.trigger("zoomOut")
        }
    }, VectorCanvas.prototype.applyTransformParams = function (l, t, e) {
        "svg" === this.mode ? this.rootGroup.setAttribute("transform", "scale(" + l + ") translate(" + t + ", " + e +
            ")") : (this.rootGroup.coordorigin = this.width - t + "," + (this.height - e), this.rootGroup
            .coordsize = this.width / l + "," + this.height / l)
    }, VectorCanvas.prototype.createGroup = function (l) {
        var t;
        return "svg" === this.mode ? t = this.createSvgNode("g") : ((t = this.createVmlNode("group")).style.width = this
            .width + "px", t.style.height = this.height + "px", t.style.left = "0px", t.style.top = "0px", t
            .coordorigin = "0 0", t.coordsize = this.width + " " + this.height), l && (this.rootGroup = t), t
    }, VectorCanvas.prototype.createPath = function (l) {
        var t;
        if ("svg" === this.mode)(t = this.createSvgNode("path")).setAttribute("d", l.path), null !== this.params
            .borderColor && t.setAttribute("stroke", this.params.borderColor), this.params.borderWidth > 0 && (t
                .setAttribute("stroke-width", this.params.borderWidth), t.setAttribute("stroke-linecap", "round"), t
                .setAttribute("stroke-linejoin", "round")), this.params.borderOpacity > 0 && t.setAttribute(
                "stroke-opacity", this.params.borderOpacity), t.setFill = function (l) {
                this.setAttribute("fill", l), null === this.getAttribute("original") && this.setAttribute("original", l)
            }, t.getFill = function () {
                return this.getAttribute("fill")
            }, t.getOriginalFill = function () {
                return this.getAttribute("original")
            }, t.setOpacity = function (l) {
                this.setAttribute("fill-opacity", l)
            };
        else {
            (t = this.createVmlNode("shape")).coordorigin = "0 0", t.coordsize = this.width + " " + this.height, t.style
                .width = this.width + "px", t.style.height = this.height + "px", t.fillcolor = JQVMap.defaultFillColor,
                t.stroked = !1, t.path = VectorCanvas.pathSvgToVml(l.path);
            var e = this.createVmlNode("skew");
            e.on = !0, e.matrix = "0.01,0,0,0.01,0,0", e.offset = "0,0", t.appendChild(e);
            var a = this.createVmlNode("fill");
            t.appendChild(a), t.setFill = function (l) {
                this.getElementsByTagName("fill")[0].color = l, null === this.getAttribute("original") && this
                    .setAttribute("original", l)
            }, t.getFill = function () {
                return this.getElementsByTagName("fill")[0].color
            }, t.getOriginalFill = function () {
                return this.getAttribute("original")
            }, t.setOpacity = function (l) {
                this.getElementsByTagName("fill")[0].opacity = parseInt(100 * l, 10) + "%"
            }
        }
        return t
    }, VectorCanvas.prototype.pathSvgToVml = function (l) {
        var t, e, a = "",
            i = 0,
            n = 0;
        return l.replace(/([MmLlHhVvCcSs])((?:-?(?:\d+)?(?:\.\d+)?,?\s?)+)/g, (function (l, o, s) {
            (s = s.replace(/(\d)-/g, "$1,-").replace(/\s+/g, ",").split(","))[0] || s.shift();
            for (var r = 0, h = s.length; h > r; r++) s[r] = Math.round(100 * s[r]);
            switch (o) {
                case "m":
                    i += s[0], n += s[1], a = "t" + s.join(",");
                    break;
                case "M":
                    i = s[0], n = s[1], a = "m" + s.join(",");
                    break;
                case "l":
                    i += s[0], n += s[1], a = "r" + s.join(",");
                    break;
                case "L":
                    i = s[0], n = s[1], a = "l" + s.join(",");
                    break;
                case "h":
                    i += s[0], a = "r" + s[0] + ",0";
                    break;
                case "H":
                    i = s[0], a = "l" + i + "," + n;
                    break;
                case "v":
                    n += s[0], a = "r0," + s[0];
                    break;
                case "V":
                    n = s[0], a = "l" + i + "," + n;
                    break;
                case "c":
                    t = i + s[s.length - 4], e = n + s[s.length - 3], i += s[s.length - 2], n += s[s
                        .length - 1], a = "v" + s.join(",");
                    break;
                case "C":
                    t = s[s.length - 4], e = s[s.length - 3], i = s[s.length - 2], n = s[s.length - 1], a =
                        "c" + s.join(",");
                    break;
                case "s":
                    s.unshift(n - e), s.unshift(i - t), t = i + s[s.length - 4], e = n + s[s.length - 3],
                        i += s[s.length - 2], n += s[s.length - 1], a = "v" + s.join(",");
                    break;
                case "S":
                    s.unshift(n + n - e), s.unshift(i + i - t), t = s[s.length - 4], e = s[s.length - 3],
                        i = s[s.length - 2], n = s[s.length - 1], a = "c" + s.join(",")
            }
            return a
        })).replace(/z/g, "")
    }, VectorCanvas.prototype.setSize = function (l, t) {
        if ("svg" === this.mode) this.canvas.setAttribute("width", l), this.canvas.setAttribute("height", t);
        else if (this.canvas.style.width = l + "px", this.canvas.style.height = t + "px", this.canvas.coordsize = l +
            " " + t, this.canvas.coordorigin = "0 0", this.rootGroup) {
            for (var e = this.rootGroup.getElementsByTagName("shape"), a = 0, i = e.length; i > a; a++) e[a].coordsize =
                l + " " + t, e[a].style.width = l + "px", e[a].style.height = t + "px";
            this.rootGroup.coordsize = l + " " + t, this.rootGroup.style.width = l + "px", this.rootGroup.style.height =
                t + "px"
        }
        this.width = l, this.height = t
    }, jQuery.fn.vectorMap("addMap", "malaysia", {
        width: 1000,
        height: 500,
        paths: {
            kdh: {
                path: "M68.5 82.1l-0.4 0-0.3 0.1-0.2 0.2 0.2 0.9 0.3 0.4 0.1 0.3 0.1 0.1 0.5 0.2 0.2 0.2 0.1 0.2-0.1 0.3-0.7 2.9-0.2 0.4-0.6 0.4-0.3 0.3-0.4 0.5-0.4 0.4-0.1 0.1-0.1 0.2 0.1 0.4 0.1 0.3 0.2 0.1 0.3 0.1 0.3 0.2 0.1 0.4 0 0.2-0.1 0.9 0 0.6-0.2 0.7-0.3 0.8-0.4 0.4-0.6 0.7-0.3 0.2-0.3 0-0.4-0.3-0.2 0.1-0.2 0.3-0.4 0.6-0.2 0.3-0.3 0.6-0.2 2 0 0.4 0 0.5 0 0.4-0.3 1.5-0.2 0.3-0.3 0.6-0.7 0.7-0.3 0.2-0.6 0.2-1.2 0.3-1.8 0.3-0.3 0.3-0.5 0.9-0.2 0.7-0.2 0.3-0.2 0.2-1.3 0.9-0.3 0.4-0.4 0.8-0.2 0.8-0.3 0.5-3.6 3.2-0.2 0.4-0.2 0.8-0.2 0.2-0.8 0.7-0.7 0.9-0.3 0.2-0.5 0-0.4 0-0.4-0.2-0.5-0.4-0.6-0.2-0.2-0.1-0.3-0.4-0.4-1.4 1.6 0.3 0.6 0 0.2-0.1 0.3-0.2 0.1-0.2 0.1-0.4-0.9-6-0.9-10.5 0.1-3.1 0.1-0.4 0.2-0.6-0.8-0.4-0.8-0.1-7.5-0.5-0.1-0.8-0.4-4.3 0.5 0.2 0.6 0.1 0.6 0 0.4-0.3 0.1-0.5-0.4-0.3-0.5-0.3-0.2-0.2 0.5-6-1.3-10.3-0.5-0.9-0.7-0.9-0.6-1.2-0.9-2.3-1.8-3.3-0.7-2-0.7-0.8-1.7-1.2-0.1-0.1 0.4-0.4 0.2-0.6 0.1-0.6 0.1-0.3 5.6-6.4 0.6-0.4 1.2-0.9 0.3-0.4 0.5-2.2 0-0.7 0.1-0.7 0.5 0.2 1.2 0.4 0.8 0.1 1.3-0.2 0.8 0.2 1.6 1.2 0.9 0.4 3.1 0.9 1.8 0.8 0.9 0.2 0.9-0.1 3.3-2.4 0.8 0 0.1 0.3 0 1.2 0.1 0.4 0.5 0.3 0.4 0.1 0.6 0 0.5 0.1 1.2 0.6 0.5 1 0.1 2.5 0.1 0.6 0.3 0.5 0.6 1.1 0.1 0.4-0.1 0.4-0.2 0.5-0.1 0.5 0 1.5 0.1 0.4 0.5 0.7 0.2 0 0.3-0.3 0.6-0.2 0.7 0.1 2.1 0.5 1-0.3 1.3-1.4 1-0.2 1.6 1.4 0.8 0.2 2.4-0.5 0.6 0.2 0.4 0.7 0.1 1.1-0.1 1.2-0.5 0.4-0.6 0.3-0.7 0.9-0.1 1.2 0.9 0.7 0.9 0.8 0.4 1-0.3 2-0.1 2.9-0.3 1.7-0.1 0.9-0.4 1-0.9 0.3-1.1 0.2-0.9 0.6-2 4.2-0.4 0.6-0.1 0.6 0.1 0.6 0.3 0.4z",
                name: "KEDAH"
            },
            pls: {
                path: "M9.7 61.4l-0.5 0.3-0.9-0.8-0.2-0.7-0.5-0.2-0.4-1 1-0.9 0.7-1.6 1.2-0.5 0.6-0.6 0.2 0.9-0.4 0.4-0.4 0.6 0 0.6-0.1 0.3 0.1 0.9 0.3 0.8-0.2 0.8-0.5 0.7z m2.5-12.9l0.6 0.5 1.1 0.5-0.1 0.4 0.4 0.2 0.4 0.4-0.2 0.6-0.4 0.7 0.5 0.8 0.2 0.5 0.1 0.4-0.5 0.3-0.8 0.2-0.4 0.5-0.6 0.4-0.3 0.7-0.8-0.5-0.3-1.3-0.9 0.1-1 0.3-0.8 1-0.6 0.8-0.9 0-0.6 0.6-0.7 0.3-0.4 0.2-0.6-2.5 0.3-0.9-0.1-1.3-0.9-0.3-1.3-0.3-0.9 0.1-0.5-0.7-0.2-0.9 0-2.1 1.2 0.4 1-0.4 1.7 0 0.7 0.6 1.8 0.2 0.8-0.2 0.8-0.7 0.6-0.9 0.5 0 0.8 0-0.3-0.5-0.1-0.3 0.5 0 0.5 0.2 0.4 1.1 0.3 0.8z m26-5l-0.1 0.7 0 0.7-0.5 2.2-0.3 0.4-1.2 0.9-0.6 0.4-5.6 6.4-0.1 0.3-0.1 0.6-0.2 0.6-0.4 0.4-1.2-1.5-1.1-2.2-0.8-2.4-0.3-2.2-0.2-1 0.4-0.8 0.5-1.1 0.2-1.3 0-0.4-0.2-0.9 0-0.5 0.4-0.5 0.4-0.4 0.3-0.4-0.1-0.7-0.4-1.2 0-0.9 0.3-2.1 0.1-1.1 0.1-0.6 0.3-0.5 0.8-0.2 0.4 0.3 0.4 0.4 0.4 0.3 0.8 0 0-0.1 0.8-0.5 0.4 0 0.6 0 0.6 0.2 0.3 0.4 1.9 5.7 0.6 1 1 0.9 1.4 0.7z",
                name: "PERLIS"
            },
            jhr: {
                path: "M204.1 240.3l0.6 0.3 0.8 0.2 0.9 0 0.2 0.2 0.8 0.7 0.5 0.2 0.5-0.1 1.2-0.6 0.8 0.3 0.1 0.4-0.1 0.4 0.1 0.5 1.8 1.3 0.6 0.8 1.3 2.9-0.4 1.2-0.1 1 0.4 0.9 3.8 4.8 0.4 0.4 1.1 0.8 0.4 0.3 0.2 0.6 0 1 0.1 0.5 0.4 0.6 0.8 1.1 0.2 0.6-0.1 0.5-0.5 1-0.1 0.6 0.4 1 2.4 3 1.2 3.2 1 1.2 0.6 1.3 0.3 0.6 1.1 1.2 0.3 0.5 0.4 1.2 0.1 1-0.2 2.2 0.3 1 0.6 1.1 0.7 0.6 0.6-0.5 0.3 0 1.4 2.5 0.5 2.3 0.9 1.3 0.3 0.8 0 1.7 0.3 0.7 0.6 0.7 0.4 0.7-0.2 0.5 0.3 0.7 0.4 2.1 1 2.8 0.5 2.3 0 1.3-0.3 0.6-0.4 0.4 0.1 2.3-0.2 0.7-2 0-0.2 0.2-0.5 0.7-0.3 0.2-2.3-0.1-1-0.2-2-0.8-0.4-0.4-0.1-0.5 0.1-1-0.3-0.7-0.6-0.5-0.7-0.5-0.5-0.5-0.3-1.9 1.4-0.9 1.8-0.7 1.3-1.4-1-0.2-0.9 0.2-0.8 0.5-1.7 1.3-0.4 0.2-0.2-0.4-0.3-0.9-1.6-3.3-1.2-1.9-1.2-0.7-0.3 0.6 0.6 1.4 1.9 3 0 0.7-0.3 1.4 0.2 0.7 0.2 0.7 0.1 0.8-0.1 0.8-1.8 1.5-2.5-0.6-4.4-2.3-1.3 0.1-2 1-1.1 0.3-2-0.2-0.8 0.1-0.8 0.4-2.6 3.3-1.6 1.2-1.8-0.3-0.1-0.2-0.3-0.5-0.4-0.4-0.2 0.2 0.1 0.6 0.2 0.8 0 0.4-0.1 0.6-0.9 1.3-0.7 1.8-0.6-1-1.8-1.5-0.7-1-0.5-1.1-1.6-5.5-1-1.9-1.4-1.7-2.1-1.3-6.1-2.3-8.6-5.4-2.1-1-1.1-0.3-1.1-0.1-0.9-0.2-0.6-0.5-0.8-1.4-1-1.1-1.2-1.1-1.4-0.9-1.6-0.7-0.8 0.3-2.5 0.3-0.9 0-1.1-0.6-0.7-1-1-2.2-0.8-1-4.2-3.3-0.6-0.6-0.3-0.7 0.4-0.1 0.1-0.1-0.2-0.5-0.6-0.6-0.9-0.7-1.9-1.1 0.8-1.4 0.5-0.2 0.6 0 0.2 0 0.1-0.2 0.2-0.4 0.1-1-0.1-0.5-0.1-0.3-0.3-0.1-0.5-0.1-0.3-0.2-0.8-0.4-0.3 0-0.2-0.1-0.3-0.8-0.1-0.1 0.1-0.3 0.8-0.7 0.2-0.4 0-0.3-0.1-0.7 0-0.3 0.1-0.6 1-2.7 0.1-0.4 0-0.2-0.2-0.7 0.1-0.3 0.3-0.4 1-1.3 0.4-0.4 1.2-0.5 1.1-0.7 0.1-1.4 0.2-0.4 0.6-0.8 0.1-0.2 0.1-0.5-0.2-0.4-0.1-0.6 0-0.2 0.3-0.7 0.1-0.2-0.1-0.4-0.1-0.3-0.1-0.5 0.1-0.6 0.1-0.4 0.3-0.7 0.3-0.6 0.4-0.3 0-0.4-0.1-0.3-0.3-0.4 0-0.5 0.5-1.4 2.8-7.6 0.3-1.5 2.2 0.7 2.7 1.1 0.7 0.5 7.2 8.6 1.8 1.5 8 3.3 0.3 0.1 0.2 0 7.6-2.9 2.2-0.4 0.7 0 0.6 0.3 0.6 0.5 2.9 1.1 0.3 0.2 0.4 0.4 0.3 0.4 0.1 0.1 7.2 4.4 0.5 0.1 0.2 0-0.1-0.2 0-0.3 0.1-0.3 0.6-0.7 0.1-0.4 0-0.3-0.1-0.6-0.1-0.3-0.2-0.2-0.2-0.3-0.3-0.2-0.5-0.1-0.3-0.2 0-0.2 0-0.2 0.2-0.5 0.3-0.4 0.1-0.3-0.3-0.6 0.1-0.4 0.3-0.3 0.2-0.4 0.1-0.4 0-0.3-0.2-0.3-0.3-0.4-0.5-0.2-0.2-0.3 0-0.2 0.2-0.2 1.2-0.6 0.1-0.1 0.4-0.7 0.2-0.4z m28-1.9l-1 0.1-0.7-0.3-1-1-0.4-0.6 0-0.5 0-0.3-0.2-0.8 0-0.5 0.3-0.3 0.6-0.3 0.3-0.2 0.5-0.8 0-0.8-0.2-0.7-0.1-0.9 0.1-0.5 0.3-0.5 0.4-0.4 0.6 0.1 0.2 0.2 0.1 0.3 0.1 0.6 0.1 0.4 0.7 1 0.3 0.7 0.6 2.1 0.1 2.6-0.1 0.6-0.6 0.4-1 0.3z",
                name: "JOHOR"
            },
            ktn: {
                path: "M148.2 77.9l-0.1 0.1-1.8 2.3-3.9 3.7-1.8 1.9-0.3 0.6 0.7 2.9 0.2 0.3 0.1 0.5 0 0.3-0.1 0.8 0.1 2.8-0.2 0.3-0.4 0.3 0 0.5 0.3 3 0 0.8 0 0.5-0.2 0.1-0.1 0.1 0.1 0.3 0.9 1.1 1.1 0.9 0.2 0.2 0.1 0.5-0.3 1.3-0.6 1.3 0 0.2-0.2 1.1-0.1 3 0.2 0.8-0.1 0.4 0 0.3-0.4 0.9 0.1 0.2 0.1 0.2 0.3 0.2 0.7 0.1 0.4 0.3 0.2 0.1 0.6 0.1 0.4 0.3 0.5 0.3 0.7 0.8 0.5 0.3 0.3 0.2 0.2 0.1 0.5 0.6 0.5 0.4-0.1 0.2-0.3 0.4-0.1 0.4-0.1 0.1-0.1 0.1-0.4 0.1-0.2 0.2 0 0.3 0.6 2.5-0.1 0.2-0.1 0.2-0.3 0.2-0.2 0.2-0.1 0.2 0.1 0.3 0.1 0.5 0.4 1.4 0.1 0.8 0 0.4-0.1 1 0.1 0.3 0.2 0.2 0.5 0.2 0.3 0 0.2-0.1 0.2-0.2 0.1-0.1 0.4 0.1 1.3 0.6 2.5 1.8 0.5 0.1 0.2 0.2 0.1 0.3 0.1 0.7 0.1 0.4 0.2 0.4 0.4 0.4 0.4 1.1 0.1 0.4-0.3 0.7-1 0-0.5-0.2-0.5-0.4-0.1-0.1-0.2 0-0.2 0.1-0.3 0.3 0 0.3 0 0.4-0.1 0.3-0.3 0.5 0 0.2 0.1 0.3 0.2 0.4 0.1 0.8 0.1 0.4-0.1 0.4-0.2 0.1-0.2 0-0.6-0.1-0.8-0.1-0.2-0.1-0.5-0.4-0.4 0-0.2 0.3-0.2 0.3-0.2 0.3-0.7 0.5-0.4 0.2-0.2 0.1-0.2 0-0.5-0.1-0.4-0.2-0.5-0.4-0.9-0.5-0.2-0.2-0.3-0.4-0.1-0.1-0.5-0.1-0.5 0-0.5-0.1-0.3-0.1-0.6 0-0.7 0.1-0.4 0.2-0.5 0.4 0 0.2 0.1 0.5-0.1 0.3-0.6 0.8-0.5 0.4 0 0.2-0.3 0.6-0.3 0.1-0.4 0-0.8-0.1-0.6-0.2-1-0.7-0.3 0-0.4 0.1-1.1 0.3-0.5 0.2-0.5 0.7-1.1-0.1-0.4-0.2-0.2-0.5-0.2-0.2-0.5-0.2-0.1-0.1-0.1-0.2 0-0.4-0.1-0.4-0.4-0.5-1.8-1.4-0.2-0.2-0.1-0.8-0.3-0.8-0.2-0.2-0.4 0-2.8 1.2-0.5 0.1-0.6-0.5-0.3-0.1-0.4 0-0.1 0-0.5-0.7-0.2-0.2-0.3 0.1-0.2 0.3-0.2 0.1-0.4 0-0.3-0.2-0.2-0.3-0.1 0-0.3 0.1-0.3 0.4-0.1 0.3-0.1 0.3 0.1 0.3 0 0.5 0 0.4-0.5 2.2-0.2 0.4-0.1 0.1-0.5 0.5-0.3 0.4-0.2 0.4-0.1 0.3 0 0.6-0.1 0.2-0.2 0-0.3-0.1-0.2-0.2-0.2-0.3-0.2-0.6-0.1-0.2 0.1-0.6 0-0.4 0-0.1-0.2-0.3-0.1-0.1-0.9-0.5-0.2-0.2-0.4-0.2-0.3 0-0.1-0.1-0.1-0.2 0-0.6-0.2-0.3-0.2-0.2-0.2-0.1-0.6 0-0.2-0.2-0.1-0.4 0-0.5-0.1-0.6-0.1-0.3-0.4-0.1-0.3 0-0.4 0.1-0.3 0-0.2 0.2-0.1 0.2-0.2 0.5 0 0.3 0 1.3 0 0.2-0.2 1.2 0.1 1.1-0.1 0.4-0.2 0.7-0.1 0.3-0.2 0.1-0.4 0.2-1.1 0.2-0.3 0.2-0.4 0.5-0.4 0.2-1.5 0.8-0.4 0.3-0.3 0.3-0.2 0.3-0.3 0.4-0.2 0.1-0.4 0.2-1.1 0.3-0.3 0-0.3-0.2-0.4-0.2-0.7 0.1-0.6-0.5-0.3-0.4-0.3-0.1-0.7-0.2-0.2-0.2-0.3-0.2-0.2-0.2-0.4-0.1-0.6-0.1-0.6 0.1-0.5 0.2-0.6 0.2-0.2 0.1-0.1 0.2 0 0.6-0.2 0.1-0.3 0-0.6-0.1-0.6-0.5-0.2-0.2-0.7-0.6-0.6-0.2-2.1-0.6-0.4-1.3-0.4-0.8-1-1.4 0.6-0.9 0.6-0.2 0.3-0.1 0.1 0 0.4 0 0.2 0 0.1-0.2 0.1-0.3-0.1-0.6-0.1-0.7-0.1-0.3 0-0.2 0.1-0.2 0.3-0.1 0.4-0.1 0.2-0.2 0.1-0.2 0.2-0.6 0.3-0.5 0.1-0.1 0.1-0.4-0.2-0.5-0.3-0.8 0-0.4 0.2-0.2 0.3-0.5 0.3-0.2 0.4 0 0.6-0.1 0.2-0.2 0.1-0.2 0.5-1.5 0.1-0.6-0.3-2.1-0.2-0.3-0.5-0.5-0.4-0.9 0.8-0.6 0.3-0.5 0.1-1 0.1-0.3 0.3-0.5 0.1-0.8 0-0.4 0-0.4 0.1-0.3 0.6-1.1 0.1-0.3 0.1-0.7 0-0.3 0.2-0.3 0-0.2 0.1-0.5-0.1-0.4 0-0.2 0.1-0.3 0.1-0.5 0-0.4 0.1-0.8 0.3-0.4 0.7-1.1 0.1-0.4 0-0.8 0.1-0.2 0.3-0.6 0-0.3 0.1-0.5 0-0.1 0.2-0.1 0.4 0 0.2 0 0.2 0 0.2-0.1 0.1-0.3 0.2-0.4 0.2-0.2 0.8-0.6 0.2-0.3 0.1-0.3-0.1-0.6 0.2-0.2 0.3-0.3 0.6-0.4 0.3-0.3 0.3-0.3 0.1-0.1 0.2 0 0.3 0.1 0.4 0.5 0.3 0.1 0.4 0 0.4 0.1 0.4 0.1 0.5 0.4 0.1 0 0.2 0 0.3-0.4 0.3-0.2 0.4-0.1 0.3 0 0.4 0 0.4 0.1 0.2-0.1 0.4-0.2 0.6-0.4 0.1-0.1 0.2-0.4 0-0.2-0.2-0.7 0.1-1.5 0.1-0.5 0-0.3 0-0.3-0.2-0.6 0-0.3 0-0.5 0.3-0.6 0.1-0.4-0.1-0.3-0.1-0.4-0.2-0.4-0.2-0.2-0.6 0-0.4-0.3-0.4 0.1-0.2 0.2-0.4 0.1-0.2-0.1-0.4-0.3-0.3 0-0.4 0-0.4-0.1 0-0.2 0-0.3 0.3-1 0.4-0.6 0.2-0.6 0-0.6-0.1-0.6-0.1-0.3-0.1-0.2-0.4-0.2-0.3-0.2-0.1-0.3 0-0.3 0-0.7 0-0.6-0.1-0.5 0.1-0.2 0.1-0.3 0.3-0.5 0.4-0.3 0.6-0.4 0.1-0.1 0.2-0.8 0-2.6-0.1-0.3 0.9-0.8 0.6-0.2 0.7 0.2 0.4 0.5 0.3 0.6 0.4 0.6 1.1 0.6 0.9-0.1 0.6-0.7 0.4-1.1 0.2-0.3 1.5-0.9 0.3-0.4 0.2-0.5 0.3-0.4 0.5-0.4 1.7-1.4 0.3-2 0-2.2 0.8-2.1 1.2-1.5 3.8-2.9 1.4-1.4 0.5-1.6-0.2-4 0.3-2.7 1.3 0.9 2.7 1.9 0.6 0.3 1.2-0.3 0.2-0.6-0.4-0.5-0.8 0.3 0.6-0.8 1 0 5.9 2.2 1.2 0.7 2.1 2.3 6.1 12 1.1 1.3 1 0.9z",
                name: "KELANTAN"
            },
            mlk: {
                path: "M151.2 253.1l-1.1 0.7-1.2 0.5-0.4 0.4-1 1.3-0.3 0.4-0.1 0.3 0.2 0.7 0 0.2-0.1 0.4-1 2.7-0.1 0.6 0 0.3 0.1 0.7 0 0.3-0.2 0.4-0.8 0.7-0.1 0.3 0.1 0.1 0.3 0.8 0.2 0.1 0.3 0 0.8 0.4 0.3 0.2 0.5 0.1 0.3 0.1 0.1 0.3 0.1 0.5-0.1 1-0.2 0.4-0.1 0.2-0.2 0-0.6 0-0.5 0.2-0.8 1.4-7.2-2.9-8.1-3.4-1.8-1-1.3-1.1-3.9-4.2-0.6-0.3-1-0.2-1-0.6-0.7-0.8 0.1-0.7 1.7-0.9 0.4-0.4 0.9-1.1 0.2 0.4 0.2 0.2 0.3 0 0.2-0.5 0.1-0.1 0.2-0.1 0.1-0.2 0-0.6 0.1-0.2 0.4-0.1 1 0.3 0.3 0 2.1-0.6 0.4-0.2 0.9-0.9 0.2-0.1 0.2 0 0.9 0.5 1.3 0.5 2.1 0.4 0.4 0 3.4-1.2 0.6 0 1.5 0 2.9 1.2 0.8 0.5 7.3 1.7z",
                name: "MELAKA"
            },
            nsn: {
                path: "M156.5 231.8l-0.3 1.5-2.8 7.6-0.5 1.4 0 0.5 0.3 0.4 0.1 0.3 0 0.4-0.4 0.3-0.3 0.6-0.3 0.7-0.1 0.4-0.1 0.6 0.1 0.5 0.1 0.3 0.1 0.4-0.1 0.2-0.3 0.7 0 0.2 0.1 0.6 0.2 0.4-0.1 0.5-0.1 0.2-0.6 0.8-0.2 0.4-0.1 1.4-7.3-1.7-0.8-0.5-2.9-1.2-1.5 0-0.6 0-3.4 1.2-0.4 0-2.1-0.4-1.3-0.5-0.9-0.5-0.2 0-0.2 0.1-0.9 0.9-0.4 0.2-2.1 0.6-0.3 0-1-0.3-0.4 0.1-0.1 0.2 0 0.6-0.1 0.2-0.2 0.1-0.1 0.1-0.2 0.5-0.3 0-0.2-0.2-0.2-0.4-0.9 1.1-0.4 0.4-1.7 0.9 0-0.2-0.8-0.2-0.8-0.3-1.5-0.9-0.9 0.6-1.6 0.1-0.6 0.7-0.4-1.2-0.1-1.7-0.3-1.4-0.8-0.6-0.4-0.1-0.5-0.4-0.7-0.8-1-3-0.5-0.5-0.6-0.3-2.1-0.2 0.2-1.3 0.2-0.6 0.3-0.4 0.1-0.4 0.1-0.9 0.1-0.2 0.4-0.8 1.2-2.7-0.1-2-0.5-3.1 0-0.8 0-0.4 0.1 0 0.7-0.2 0.4 0 1.6 0.1 1.8 0.4 0.2 0 0.3-0.1 0.4-0.2 0.6-0.4 0.3-0.3 0.1-0.2 0.2-0.6 0.2-1.2 0.2-0.9 0.1-0.3 0.3-0.3 0.9-0.7 0.2-0.2 0.1-0.2 0.1-0.5 0-0.4 0.1-0.7 0.2-0.7 0.2-0.3 0.1-0.2 0.8-0.4 0.1-0.2 0.1-0.2-0.1-0.4-0.2-0.7 0-0.8-0.1-0.8 0-0.7 0.3-1.6 0-0.4-0.2-0.5-0.1-0.3-0.4-0.6-0.2-0.4-0.1-0.5 0.2-1.3-0.1-0.4-0.1-0.3-0.3-0.6-0.2-0.5-0.2-0.3-0.4-0.2-0.3-0.1 0.3-0.2 0.3-0.2 0.1-0.1 0.1-0.5 0.1-0.1 0.3 0 0.5 0.2 0.9 0.7 0.4 0.3 0.2 0.3 0 0.2 0.1 0.3 0.5 0.3 0.5 0.5 0.5 0.1 0.9 0 0.7 0 0.2 0 0.2 0.1 0.3 0.3 0.1 0.2 0.3 1.1 0 0.6 0.1 0.4 0.2 0.1 0.3 0 0.4-0.2 0.5-0.2 0.4-0.3 0.3-0.1 0.6-0.1 0.1-0.1 0.2-0.2 0.3 0 0.5 0.1 2 1 6.4 2.1 0.4 0.1 3.9 0.6 0.3 0.2 2 2.2 0.1 0.2 1.5 1.9 10.3 7 0.3 0.1 0.1 0 0.4-0.3 0.1 0 0.4 0.5 0.5 2.4z",
                name: "NEGERI SEMBILAN"
            },
            phg: {
                path: "M154.3 133.4l1.1 2.1 0.4 0.5 0.8 0.5 0.9 0.7 0.5 0.2 1 0.3 0.6 0.2 0.9 0.1 0.9 0 1.4-0.1 0.8 0.2 0.9 0.9 0.5 0.5 0.2 0.6 0.1 0.3 0.2 0.6 0 0.3-0.1 0.2-0.3 0.4 0 1.1-0.1 0.3-0.3 0.3-0.6 0.2-0.3 0.3-0.1 0.2-0.1 0.4 0 0.4 0.1 0.5 0.3 0.9 0.1 0.4 0.2 0.3 0.4 0.3 0.4 0.4 0.3 0.4 0.2 0.2 0.2 0.1 0.7 0.1 0.3 0.1 0.6-0.1 0.6 0.1 0.2 0 0.3 0.2 0.3 0.3 0.1 0.1 0.3-0.1 0.1-0.2 0.1-0.4 0-0.1 0.4-0.3 0.2 0 0.3 0.1 1.7 1.6 0.2 0.4 0 0.5 0.1 0.4 0.1 0.2 0.4 0.1 0 0.6-0.3 0.7-0.4 0.8-0.1 0.4 0 0.3 0.3 0.8-0.2 0.3-0.5 0-0.4-0.1-0.4 0-0.3 0.1-0.3 0.2-0.5 0.3-0.2 0.3-0.1 0.3-0.2 0.7-0.3 0.4-0.4 0.4-0.2 0.3-0.1 0.3 0 0.2-0.2 0.9-0.5 2 0.1 0.9 0 0.4-0.1 0.7-0.1 0.3-0.1 0.3-0.6 0.8-0.1 0.4 0.5 0.9 0.2 0.2 0.3 0.3 0.3 0.1 0.5 0 2.8-1.2 0.8-0.1 0.2 0.2 0.3 0.2 0.6 0.2 1.4 0.3 0.4 0.1 0.4 0.4 0.3 0.3 1.8 0.6 0.3 0.2 0.1 0.1 0.2 0.5 0.4 0.3 0.2 0.3 0.2 0.2 0.5 0.3 1.2 0.8 0.4 0.1 0.2 0 0.3-0.2 0.3-0.1 0.2 0.1 0.1 0.1 0 0.4 0.1 0.2 0.3 0.4 0.2 0.1 0.2 0 0.3-0.2 0.4-0.1 0.2 0.1 0.1 0.2 0.1 0.7 0.1 0.4 0.2 0.3 0.4 0.5 0.8 0.8 0.3 0.4 0 0.4-0.1 0.4 0.1 0.4 0.6 0.6 0.2 0.3 0.4 1.1 0.4 0.4 0.3 0.3 0.2 0.1 0.1-0.1 0.1-0.2-0.2-1.1 0.1-0.3 0.4-0.3 0.2-0.3 0.2-0.4 0.2-0.4 0.1-0.5 0-0.2 0-0.4-0.5-1.4-0.4-0.8-0.1-0.3 0-0.4 0-0.4 0.1-0.3 0.1-0.4-0.1-0.4-0.1-0.4-0.2-0.2-0.4-0.3-0.3-0.2-0.1-0.3-0.1-0.4 0.1-0.4 0.2-1.2 0.1-0.3 0.3-0.2 0.2-0.4 0.2-0.4 0-0.4 0.1-0.4-0.2-0.8 0-0.2-0.2-0.9 0-0.3 0.1 0 0.5 0.2 0.1 0.1 0.4 0.3 0.3 0.1 3.7 0.2 0.7 0.1 0.3 0.2 0.2 0.1-0.5 0.2-0.4 0.3-1 1.4-0.5 0.8 0 0.9 0.3 1.6 1.9 4.7-0.2 1.3-1.1-0.7-0.9 1.4-0.5 2.3-0.2 1.7 0 1.9-0.1 0.9-0.9 0-0.5 0.7-0.4 0.9-0.2 0.7 0 1 0.3 0.8 1.9 4.3 0.2 0.7 0.9 1.2 1.7 1.7 1.2 1.7-0.7 1.5 1.7-0.4-2.4 5.3-0.3 2.1 0.8 6.3 0.4 1 0.2 1-1.1 12.3 0.4 2.1 1.6 3.6 2.4 3.2 6 5.9 0.1 0-0.2 0.4-0.4 0.7-0.1 0.1-1.2 0.6-0.2 0.2 0 0.2 0.2 0.3 0.5 0.2 0.3 0.4 0.2 0.3 0 0.3-0.1 0.4-0.2 0.4-0.3 0.3-0.1 0.4 0.3 0.6-0.1 0.3-0.3 0.4-0.2 0.5 0 0.2 0 0.2 0.3 0.2 0.5 0.1 0.3 0.2 0.2 0.3 0.2 0.2 0.1 0.3 0.1 0.6 0 0.3-0.1 0.4-0.6 0.7-0.1 0.3 0 0.3 0.1 0.2-0.2 0-0.5-0.1-7.2-4.4-0.1-0.1-0.3-0.4-0.4-0.4-0.3-0.2-2.9-1.1-0.6-0.5-0.6-0.3-0.7 0-2.2 0.4-7.6 2.9-0.2 0-0.3-0.1-8-3.3-1.8-1.5-7.2-8.6-0.7-0.5-2.7-1.1-2.2-0.7-0.5-2.4-0.4-0.5-0.1 0-0.4 0.3-0.1 0-0.3-0.1-10.3-7-1.5-1.9-0.1-0.2-2-2.2-0.3-0.2-3.9-0.6-0.4-0.1-6.4-2.1-2-1-0.5-0.1-0.3 0-0.2 0.2-0.1 0.1-0.6 0.1-0.3 0.1-0.4 0.3-0.5 0.2-0.4 0.2-0.3 0-0.2-0.1-0.1-0.4 0-0.6-0.3-1.1-0.1-0.2-0.3-0.3-0.2-0.1-0.2 0-0.7 0-0.9 0-0.5-0.1-0.5-0.5-0.5-0.3-0.1-0.3 0-0.2-0.2-0.3-0.4-0.3-0.9-0.7-0.5-0.2-0.3 0-0.1 0.1-0.1 0.5-0.1 0.1-0.3 0.2-0.3 0.2-1.3-0.1-0.3-0.1-1.9-1-0.5-0.1-0.3-0.1-3.3-4.3 0.5-1.4 0.5-0.8 0-0.5-0.4-1.6-0.1-0.5-0.5-0.8-0.1-0.3 0-0.2 0.1-0.4 0.2-0.4 0.8-1.7 0.3-0.2 0.5-0.1 0.2-0.3 0.1-0.2 0.3-1.6 0-0.5-0.5-0.7-0.7-1-0.2-0.6-0.1-0.3-0.4-0.5-0.2-0.5-0.3-0.3-1.7-1-1-0.4-0.7 0-0.1 0-0.3-0.1-0.9-0.4-0.3-0.2-0.6-0.6-1.5-2.2-0.5-0.8-0.4-0.2-0.4-0.1-0.1-0.3 0-0.4 0.2-2.1 0-0.6-0.1-0.4-0.1-0.4-0.5-0.5-0.1-0.3-0.3-0.8-0.3-3.7-0.1-0.5-0.6-0.6 0-0.2 0.1-0.9 1.1-3.1-1.3-1.7-0.4-0.4-0.2-0.1-0.4-0.3-0.3 0-0.4 0.2-0.2 0-0.2-0.3-0.2-0.6-0.3-1.3 0-0.6 0-0.4 0.2-0.2 0-0.3-0.3-0.2-0.6-0.2-0.7-0.1-0.7-0.4-0.1-0.1 0-0.3 0-0.6 0.2-0.5 0-0.2 0-0.3-0.3-0.3-0.2-0.1-0.2-0.6-0.1-2.1-0.2-0.5-0.2-0.2-0.4-0.2-0.1-0.2-0.1-0.2 0.1-0.4 0.2-0.2 0.2-0.6 0.2-0.3 0-0.3-0.1-0.2-0.1-0.1-0.2-0.1-0.6-0.1-2.4-0.8-0.3 0.1-0.2 0-0.2-0.2-0.6-0.8-0.6-0.5 0.4-0.7 0.5-0.4 0.2-0.5 0.2-0.5 0.4-0.9 0.1-0.1 0.3-0.2 0.1-0.2 0-0.3-0.2-0.5-0.5-0.4-0.2-0.3-0.2-1.1-0.1-0.3 0.1-0.9 0.7-2 2.1 0.6 0.6 0.2 0.7 0.6 0.2 0.2 0.6 0.5 0.6 0.1 0.3 0 0.2-0.1 0-0.6 0.1-0.2 0.2-0.1 0.6-0.2 0.5-0.2 0.6-0.1 0.6 0.1 0.4 0.1 0.2 0.2 0.3 0.2 0.2 0.2 0.7 0.2 0.3 0.1 0.3 0.4 0.6 0.5 0.7-0.1 0.4 0.2 0.3 0.2 0.3 0 1.1-0.3 0.4-0.2 0.2-0.1 0.3-0.4 0.2-0.3 0.3-0.3 0.4-0.3 1.5-0.8 0.4-0.2 0.4-0.5 0.3-0.2 1.1-0.2 0.4-0.2 0.2-0.1 0.1-0.3 0.2-0.7 0.1-0.4-0.1-1.1 0.2-1.2 0-0.2 0-1.3 0-0.3 0.2-0.5 0.1-0.2 0.2-0.2 0.3 0 0.4-0.1 0.3 0 0.4 0.1 0.1 0.3 0.1 0.6 0 0.5 0.1 0.4 0.2 0.2 0.6 0 0.2 0.1 0.2 0.2 0.2 0.3 0 0.6 0.1 0.2 0.1 0.1 0.3 0 0.4 0.2 0.2 0.2 0.9 0.5 0.1 0.1 0.2 0.3 0 0.1 0 0.4-0.1 0.6 0.1 0.2 0.2 0.6 0.2 0.3 0.2 0.2 0.3 0.1 0.2 0 0.1-0.2 0-0.6 0.1-0.3 0.2-0.4 0.3-0.4 0.5-0.5 0.1-0.1 0.2-0.4 0.5-2.2 0-0.4 0-0.5-0.1-0.3 0.1-0.3 0.1-0.3 0.3-0.4 0.3-0.1 0.1 0 0.2 0.3 0.3 0.2 0.4 0 0.2-0.1 0.2-0.3 0.3-0.1 0.2 0.2 0.5 0.7 0.1 0 0.4 0 0.3 0.1 0.6 0.5 0.5-0.1 2.8-1.2 0.4 0 0.2 0.2 0.3 0.8 0.1 0.8 0.2 0.2 1.8 1.4 0.4 0.5 0.1 0.4 0 0.4 0.1 0.2 0.1 0.1 0.5 0.2 0.2 0.2 0.2 0.5 0.4 0.2 1.1 0.1 0.5-0.7 0.5-0.2 1.1-0.3 0.4-0.1 0.3 0 1 0.7 0.6 0.2 0.8 0.1 0.4 0 0.3-0.1 0.3-0.6 0-0.2 0.5-0.4 0.6-0.8 0.1-0.3-0.1-0.5 0-0.2 0.5-0.4 0.4-0.2 0.7-0.1 0.6 0 0.3 0.1 0.5 0.1 0.5 0 0.5 0.1 0.1 0.1 0.3 0.4 0.2 0.2 0.9 0.5 0.5 0.4 0.4 0.2 0.5 0.1 0.2 0 0.2-0.1 0.4-0.2 0.7-0.5 0.2-0.3 0.2-0.3 0.2-0.3 0.4 0 0.5 0.4 0.2 0.1 0.8 0.1 0.6 0.1 0.2 0 0.2-0.1 0.1-0.4-0.1-0.4-0.1-0.8-0.2-0.4-0.1-0.3 0-0.2 0.3-0.5 0.1-0.3 0-0.4 0-0.3 0.3-0.3 0.2-0.1 0.2 0 0.1 0.1 0.5 0.4 0.5 0.2 1 0z",
                name: "PAHANG"
            },
            sgr: {
                path: "M83.1 222.1l-0.8 0.2-0.4-0.5 0.4-0.7 0.9-0.4 0.5 0.5-0.2 0.6-0.4 0.3z m0.8 3.1l-0.4 0.2-0.1-0.3 0.1-0.6 1.2-3.1 0.7-1.1 0.9-0.3 0.7 0.3 0 0.7 0 0.3 0 0.7-0.1 1.1-0.7 0.7-1 0.4-0.7 0.5-0.3 0.3-0.3 0.2z m17.8-40.9l1.5 2.2 0.6 0.6 0.3 0.2 0.9 0.4 0.3 0.1 0.1 0 0.7 0 1 0.4 1.7 1 0.3 0.3 0.2 0.5 0.4 0.5 0.1 0.3 0.2 0.6 0.7 1 0.5 0.7 0 0.5-0.3 1.6-0.1 0.2-0.2 0.3-0.5 0.1-0.3 0.2-0.8 1.7-0.2 0.4-0.1 0.4 0 0.2 0.1 0.3 0.5 0.8 0.1 0.5 0.4 1.6 0 0.5-0.5 0.8-0.5 1.4 3.3 4.3 0.3 0.1 0.5 0.1 1.9 1 0.3 0.1 1.3 0.1 0.3 0.1 0.4 0.2 0.2 0.3 0.2 0.5 0.3 0.6 0.1 0.3 0.1 0.4-0.2 1.3 0.1 0.5 0.2 0.4 0.4 0.6 0.1 0.3 0.2 0.5 0 0.4-0.3 1.6 0 0.7 0.1 0.8 0 0.8 0.2 0.7 0.1 0.4-0.1 0.2-0.1 0.2-0.8 0.4-0.1 0.2-0.2 0.3-0.2 0.7-0.1 0.7 0 0.4-0.1 0.5-0.1 0.2-0.2 0.2-0.9 0.7-0.3 0.3-0.1 0.3-0.2 0.9-0.2 1.2-0.2 0.6-0.1 0.2-0.3 0.3-0.6 0.4-0.4 0.2-0.3 0.1-0.2 0-1.8-0.4-1.6-0.1-0.4 0-0.7 0.2-0.1 0 0 0.4 0 0.8 0.5 3.1 0.1 2-1.2 2.7-0.4 0.8-0.1 0.2-0.1 0.9-0.1 0.4-0.3 0.4-0.2 0.6-0.2 1.3-0.4 0-0.6-0.4-0.5-0.6-0.9-0.6-2.8-0.5-1-0.5-1.8-0.3-1.1-0.4-2-1.5-1.1-1.4-2.6-3.8-1.5-1.4-2.3-0.5-2.2-0.2-1.3-0.8 0.9-2.3-1.1-0.2 0.1-0.7 2.5-3.1 0.7-0.7 0.7-0.2 0.6-0.6 0-1.3-0.4-2.5-0.3-0.6-1.5-1.2-0.3-0.6-1-6.7-0.3-1-0.7-0.8-1.8-1.5-0.2-0.4-0.2-0.5-0.3-0.3-1-0.3-0.5-0.2-0.4-0.3-0.2-0.3-0.3-0.8-2.4-3.2-1.6-1.6-0.3-0.4-0.5-1.2-1-1.4-0.5-2.3-0.3-1.1-0.9-1.1-3.7-2.6-1.2-0.5-0.5-0.3-0.3-0.4-0.8-1.4-1.3-1.7-0.9-0.5-2.3-0.5-0.6-0.5 0.1-0.9 0.5-1.2 0.9-0.8 0.2 0 0.9-0.3 1.9-0.2 1.4-0.4 0.4 0 0.2 0 0.1 0.1 0.2 0.3 0 0.4-0.2 0.5 0.2 0.3 1.2 0.7 0.3 0.3 0.1 0.2-0.3 0.4-0.2 0.3-0.1 0.3 0 0.4 0.2 0.3 0.1 0.1 0.3 0 0.3-0.1 0.3-0.2 0.1-0.6 0.2-0.2 0.2-0.1 0.4 0 0.5-0.3 0.2 0 0.2 0.1 0.1 0.2 0.1 0.2 0.2 0.2 0.1 0.1 0.5 0 0.4-0.1 0.3 0.1 0.1 0.2 0 0.6 0 0.3 0 0.4 0.2 0.1 0.2-0.1 0.2-0.3 0.4-0.2 0.2-0.3 0.2-0.2 0.3-0.1 0.1 0.2 0 0.4 0 0.1 0.4 0.5 0.1 0.1-0.1 0.1-0.3 0.1-0.4-0.1-0.3 0-0.1 0.1 0 0.5-0.1 0.3 0.2 0.1 0.3-0.3 0.3-0.1 0.2 0.1 0.3 0.1 0.2 0 0.7-0.3 0.1-0.2 0.1-0.4 0.1-0.1 0.2 0 0.5 0.4 0 0.2 0 0.3 0.2 0.3 0.2 0 0.3-0.3 0.1 0 0.4 0.3 0.3 0.7 0.2 0 0.2 0.1 0.3-0.2 0.4-0.2 0.2 0 0.2 0 0.3 0.2 0.3 0.4 0.3 0.1 0.7-0.4 0.4 0 0.4 0.3 0 0.4 0 0.6 0.1 0.3 0.1 0.4 0.2 0.2 0.1 0.1 0.4 0.1 0.8 0 1.2-0.2 0.5-0.2 1.1-0.6 0.5-0.7-0.1-0.9-0.2-0.9-0.3-0.7-0.1-0.1-0.4-0.5 0-0.2 0.4-0.9 0.2-0.2 0.6-0.2 0.7-0.1 0.4 0.1 0.5 0.2 0.3 0.4 0.1 0.3 0.2 0.3 0.6 0.4 0.3 0.2 0.4 0.2 0.3 0.1 0.7 0.1 0.1 0 0.3 0.2 0.5 0.7 0.2 0.6 0.2 0.3 0.5 0.1 0.2 0.1 0.3 0.4 0.3 0.2 0.3 0.1 0.2 0.3 0.3 0.5 0.2 0.2 0.3 0.1 0.3 0 0.2-0.1 0.5-0.2 0.5-0.4 1-1.1 1.8-2.3 0.2-0.2 0.3-0.4 0.9-0.2z m2.2 37.5l0.7 0 1.4-0.2 0.5 0.1 0.1 0.1 0.1 0.4 0.2 0 0.1-0.1 0.2-0.5 0.1-0.2 0.2-0.1 0.4 0 0.1-0.1 0.1-0.3 0-0.2-0.2-2-0.3-1 0-0.5 0-0.4 0.3-0.3 0.1-0.2 0.1-0.8 0.1-0.2 0.3-0.3 0.2-0.4-0.2-0.6-0.2-0.4-0.2-0.6-0.3-0.3-0.2-0.1-0.2 0-0.5 0.2-0.3 0.2-0.3 0.1-0.4 0-1.2-0.6-0.6-0.7-0.3 0-0.1 0-0.5 0.4-0.7 0.3-0.1 0.2-0.2 0.4-0.7 1.2 0 0.2 0.1 1.8 0.1 0.1 0.2 0.4 0.2 0.3 0.2 0.1 0.6 0.4 0.2 0.2 0.1 0.2 0.1 0.5 0.1 0.2 0.2 0.2 0.1 0.5-0.1 0.3-0.2 0.4-0.2 0.4 0 0.2 0.3 0.8 0.2 0.2 0.2 0.1z m0.4 8.1l0.2 0.1 0.4-0.1 0.7-0.6 0.2-0.4 0.2-0.4 1-1.3 0-0.9-0.3-0.5-0.4-0.3-0.2-0.9-0.4 0.2-0.2 0.1-0.3 0.1-0.7 0.2-0.4 0.1-0.1 0.3 0.1 0.3 0.2 0.3 0 0.2-0.1 0.2-0.1 0.3 0.2 0.8 0 0.3-0.2 0.4-0.2 0.1-0.1 0.5 0 0.4 0.2 0.4 0.3 0.1z",
                name: "SELANGOR"
            },
            trg: {
                path: "M194 164l-0.2-0.1-0.3-0.2-0.7-0.1-3.7-0.2-0.3-0.1-0.4-0.3-0.1-0.1-0.5-0.2-0.1 0 0 0.3 0.2 0.9 0 0.2 0.2 0.8-0.1 0.4 0 0.4-0.2 0.4-0.2 0.4-0.3 0.2-0.1 0.3-0.2 1.2-0.1 0.4 0.1 0.4 0.1 0.3 0.3 0.2 0.4 0.3 0.2 0.2 0.1 0.4 0.1 0.4-0.1 0.4-0.1 0.3 0 0.4 0 0.4 0.1 0.3 0.4 0.8 0.5 1.4 0 0.4 0 0.2-0.1 0.5-0.2 0.4-0.2 0.4-0.2 0.3-0.4 0.3-0.1 0.3 0.2 1.1-0.1 0.2-0.1 0.1-0.2-0.1-0.3-0.3-0.4-0.4-0.4-1.1-0.2-0.3-0.6-0.6-0.1-0.4 0.1-0.4 0-0.4-0.3-0.4-0.8-0.8-0.4-0.5-0.2-0.3-0.1-0.4-0.1-0.7-0.1-0.2-0.2-0.1-0.4 0.1-0.3 0.2-0.2 0-0.2-0.1-0.3-0.4-0.1-0.2 0-0.4-0.1-0.1-0.2-0.1-0.3 0.1-0.3 0.2-0.2 0-0.4-0.1-1.2-0.8-0.5-0.3-0.2-0.2-0.2-0.3-0.4-0.3-0.2-0.5-0.1-0.1-0.3-0.2-1.8-0.6-0.3-0.3-0.4-0.4-0.4-0.1-1.4-0.3-0.6-0.2-0.3-0.2-0.2-0.2-0.8 0.1-2.8 1.2-0.5 0-0.3-0.1-0.3-0.3-0.2-0.2-0.5-0.9 0.1-0.4 0.6-0.8 0.1-0.3 0.1-0.3 0.1-0.7 0-0.4-0.1-0.9 0.5-2 0.2-0.9 0-0.2 0.1-0.3 0.2-0.3 0.4-0.4 0.3-0.4 0.2-0.7 0.1-0.3 0.2-0.3 0.5-0.3 0.3-0.2 0.3-0.1 0.4 0 0.4 0.1 0.5 0 0.2-0.3-0.3-0.8 0-0.3 0.1-0.4 0.4-0.8 0.3-0.7 0-0.6-0.4-0.1-0.1-0.2-0.1-0.4 0-0.5-0.2-0.4-1.7-1.6-0.3-0.1-0.2 0-0.4 0.3 0 0.1-0.1 0.4-0.1 0.2-0.3 0.1-0.1-0.1-0.3-0.3-0.3-0.2-0.2 0-0.6-0.1-0.6 0.1-0.3-0.1-0.7-0.1-0.2-0.1-0.2-0.2-0.3-0.4-0.4-0.4-0.4-0.3-0.2-0.3-0.1-0.4-0.3-0.9-0.1-0.5 0-0.4 0.1-0.4 0.1-0.2 0.3-0.3 0.6-0.2 0.3-0.3 0.1-0.3 0-1.1 0.3-0.4 0.1-0.2 0-0.3-0.2-0.6-0.1-0.3-0.2-0.6-0.5-0.5-0.9-0.9-0.8-0.2-1.4 0.1-0.9 0-0.9-0.1-0.6-0.2-1-0.3-0.5-0.2-0.9-0.7-0.8-0.5-0.4-0.5-1.1-2.1 0.3-0.7-0.1-0.4-0.4-1.1-0.4-0.4-0.2-0.4-0.1-0.4-0.1-0.7-0.1-0.3-0.2-0.2-0.5-0.1-2.5-1.8-1.3-0.6-0.4-0.1-0.1 0.1-0.2 0.2-0.2 0.1-0.3 0-0.5-0.2-0.2-0.2-0.1-0.3 0.1-1 0-0.4-0.1-0.8-0.4-1.4-0.1-0.5-0.1-0.3 0.1-0.2 0.2-0.2 0.3-0.2 0.1-0.2 0.1-0.2-0.6-2.5 0-0.3 0.2-0.2 0.4-0.1 0.1-0.1 0.1-0.1 0.1-0.4 0.3-0.4 0.1-0.2-0.5-0.4-0.5-0.6-0.2-0.1-0.3-0.2-0.5-0.3-0.7-0.8-0.5-0.3-0.4-0.3-0.6-0.1-0.2-0.1-0.4-0.3-0.7-0.1-0.3-0.2-0.1-0.2-0.1-0.2 0.4-0.9 0-0.3 0.1-0.4-0.2-0.8 0.1-3 0.2-1.1 0-0.2 0.6-1.3 0.3-1.3-0.1-0.5-0.2-0.2-1.1-0.9-0.9-1.1-0.1-0.3 0.1-0.1 0.2-0.1 0-0.5 0-0.8-0.3-3 0-0.5 0.4-0.3 0.2-0.3-0.1-2.8 0.1-0.8 0-0.3-0.1-0.5-0.2-0.3-0.7-2.9 0.3-0.6 1.8-1.9 3.9-3.7 1.8-2.3 0.1-0.1 0.5 0.3 2.7 1.7 1.1 0.9 1 1.3 0.7 1.6 0.5 0.8 1.4 0.6 9.1 7.3 2.2 1.1 2.1 0.4 0.8 0.5 2.6 2.4 4.7 5.3 5.2 8.2 1.8 4.3 5.1 8.5 2.9 5.5 0.3 0.9 0.2 0.4 0.9 1 0.3 0.6 0 0.5-0.3 1.6 0 1.1 0.5 2.1 0.9 7.8-0.1 1.1-0.5 1-0.3 1 0.6 2.3-0.1 0.7 1.7 4.7 0.1 1.6-0.2 0.6-0.7 1.7-0.4 0.7-0.3 0.3-0.7 0.8-0.2 0.4 0 0.5 0.4 1.3-0.4 0.5-0.3 0.2z",
                name: "TERENGGANU"
            },
            sbh: {
                path: "M929.3 164.6l-2.8 0-5.8 0-1.7-0.3-3.1-2.7-0.2-0.6 0.4-0.7 0.9-0.6 1.1-0.5 0.8-0.2 0.9 0 1.8 0.6 1 0.2 0.5 0.2 0.5 0.6 0.7 1.1 0.5 0.5 0.4 0.2 0.5 0.2 0.7 0 2.4 0.8 0.5 1.2z m39.4-14.3l-0.4 0-0.3-0.1 0-1.2-0.3-0.3-0.6-0.5-0.2-0.3-0.1-0.6 0.2-0.1 1.4 0 2.5 0.3 1.2 0.3 0.6 0.8-0.2 0.7-1.2 0.3-1.9 0-0.7 0.7z m-9.6-11.5l0.9 0.7 0.7-0.8 1.3 0 1.4 0.5 1.1 0.6 0 0.4-0.7 0.1-0.5 0.3-0.2 0.6 0 0.7-1-0.9-0.2-0.1-0.3 0.2-0.1 0.5-0.3 0.3-0.4-0.1-0.7-0.6-0.9-0.4-0.8-0.2-0.7-0.1-0.2-0.1-0.4-0.4-0.2-0.2-1.8-0.3-3.5-1.1 0-0.3 4.1 0 0.5-0.1 0.4-0.4 0.3-0.4 0.3-0.2 1 0.2 0.5 0.8 0.4 0.8z m-15.1-59.1l-0.4 0-0.3 0-0.5-0.2-0.4-0.2 0-0.4 0.3-0.4 0.5-0.4 0.6-0.2 1.4 0 0.7 0.2 0.1 0.5-0.2 0.5-0.6 0.2-0.3 0-0.9 0.4z m-38.3-41.8l-1.5 0.1-1.6-0.3-1.3-0.4-0.5-0.4-0.1-0.4 0.1-0.5 0.4-0.3 0.6-0.2 2.6-0.1 0.8-0.2 0.6-0.5 0.2-0.9-0.5-0.4-1.8-0.1-0.2-0.7 0.6-0.6 2.1-0.3 0.8-0.5 1.3 1.6 0.9 1.6-0.3 1.6-1.9 1.5-1.3 0.4z m-91.7 127.3l-0.2-0.4-0.2-0.7-0.2-0.8-0.1-1.2 0.1-0.7 0.3-0.6 1.5-2 0.2-0.5 0.4-1.1 0.1-0.5-0.1-0.6-0.3-0.6-0.7-0.9-0.5-0.5-0.4-0.2-0.4-0.2-0.8-0.2-0.5-0.1-0.3-0.2-0.3-0.4-0.3-0.6-0.1-0.9 0.1-1.2-0.1-0.4-0.1-0.4-0.8-1.3-0.3-0.7-0.2-3.9 0.1-0.5 0.1-0.2 1.6-2.9 0.2-0.5 0.1-0.6 0.2-1.7 0.2-1 0.1-0.5 0.3-0.4 1-1 0.3-0.5 0.2-0.5 0.8-2.6 0-0.5 0-0.6-1.1-4.8-0.3-0.5-0.4-0.4-0.7-0.1-0.9 0-1.5 0.2-2.4 0.2-4.7-0.5 1.3-1.2 1.6-2 0.7-0.4 1-0.2 1-0.4 0.8-0.6 0.4-0.6 0.4-0.8 0.3-2 0.1-1.9 0.1-0.5 0.5-1 0.5-0.5 0.4-0.3 0.2-0.4-0.3-0.6-2 0.9-1.8-0.1-1.8-0.7-4.5-3.9-0.1-0.5 0.1-0.5 0-0.3-0.6-0.1-0.2 0.1-1 0.9-0.3-0.7 0.2-0.7 0.3-0.8 0.3-1.6 0.4-0.7 0.3-0.5 0.2-0.4 0.6-0.6 2.6-1.5 0.6-1.1 0.6-0.7 3.6-2.6 1.8-3.9 1-1 0.7 1.2-1.8 3.3 1.1 1.4 0.2-0.5 0.3-1.4 0.2-0.5 1.7 1.5 1.1 0.4 4.5 0.3 1.5 0 1.3-0.5 1.6-1.3 1.3-2 1-2.3 0.6-2.1 0.4-2.2 0.3-1 0.5-0.8 0.8-0.6 4.6-2.6 0.7-0.9 0.4-1.1 0.1-2.4 0.3-1 3.2-5.1 0.7-2.2-0.8-1.5-1.2 0.4-0.4-0.7 0.6-0.9 1.5-0.5 0.9-0.6 2.4-3.6 1.1-1 0.6-0.3 0.9-0.1 0.6 0.2 0.7 0.3 0.7 0.2 0.3-0.5-0.3-1.8-0.6-0.1-0.9 0.5-1.3 0.1 0-0.3 1.4-0.7 0.8-0.9 0.2-0.2 0.3 0 1.1 0 0.4-0.3 0.1-0.1 0-0.3 0.5-1.7 0.1-0.3 0.3-0.4 0.4-0.6 4.5-3.4 0.8-0.8 0.9-0.7 1-0.4 0.7-0.6 0.3-1.1 0.1-0.9 0.2-1 0.3-0.8 0.7-0.3 0.9-0.7 3.2-4.2 0.7-0.7 0.5-0.7 0.4-0.9 0.1-1.4-0.1-1.7 0.1-0.5 0.2-0.4 0.6-0.9 0.2-0.5-0.1-2 0.2-0.8 1.4-0.7 0.4-0.8 0.5-2 0.1-1.1 0.1-0.5 0.4-0.2 0.2-0.2 0.5-0.8 0.3-0.6 0.4-0.4 0.6-0.3 0.6-0.1 0.1 0.2 0.6 1.1 2.1 1.4 0.3 0.6 0.7 3.7-1-0.6-0.5-0.1-0.3 0.2-0.3 1.6 0 0.3 0.6 0.5 0.8 0.3 0.7 0.4 0.3 1.1-0.2 2-0.5 1.3-1.7 2.5-0.9 1.8-0.8 2.2 0.3 1.8 2.1 0.5 1-0.5 0.8-1 0.6-0.9 0.6-0.4 0.6-0.3 2.3-2.2 1.7-1.2 0.3-0.6 0.2-1.8 0.2-0.2 0.4-0.1 0.3-0.3 0.7-1.4 1.9-1.9 0.2-0.7-0.3-1.1-1.1-2.2 0-1.1 0.5-0.6 0.4-0.1 0.4 0.2 0.7 0.1 0.4-0.1 0.3-0.4 0.2-0.4-0.2-0.2-0.4-0.2-0.1-0.5 0.1-0.6 0.2-0.4 0.5-0.1 0.6 0.2 0.6 0.2 0.4 0.1 0.4-0.3 0.8-0.6 0.3 0 0.4 0.2 1.3 0.6 0.4 0.1 0.2 0.2 2.6 1.6 0.3 0.2 0.2 0.4 0.1 0.9-0.3 2.5-0.3 0.5-0.7 0.4-0.2 0.8 0.1 1.1 0.3 0.9 1.8 2.4 0.3 0.9 0.1 3.2 0.3 0.8 0.5 1.1 0.7 0.4 2.1-0.1 0.7 0.3 0.7 0.6 1.1 1.2 1.3 1.2 0.9 0.7 0.8 0.2 0.8-0.2 0.6-0.5 1.2-2.1 0.8-0.9 0.4 0 0.2 0.8 0 1.4 0.2 0 1.2 1.2-0.2-0.1-0.1 0.2-0.1 0.4 0.1 0.2 0.2 0.1 0.6 0.2 0.2 0.1 0.8 0.7 0.5 0.2 0.6 0.1 0.7-0.3 0.6-0.1 0.5 0.2 1.2 1.4 0.5 0.8 0.5 1.2 0.4 0 0.2-0.5 0.2-0.2 0.3 0.1 0.3 0.2 0.3 0.4 0 0.4 0 0.4 0.1 0.6 0.1 0.5 0.5 0.9 0.1 0.3-0.2 0.5-0.3 0.4-0.3 0.5 0.6 1.4-0.5 3.4-0.4 0.7-0.7 0.1-1.7-0.3-0.9 0.3-1 0.6-1.4 1.4-0.5 0.8 0.3 0.9 1.1 1.3 0.8 1.9 0.7 0.4 0.2 0.3 0.1 0.5 0.1 0.3 0 0.5-0.2 0.6-0.4 0.4-0.5 0.2-0.4 0.2-0.1 0.6 0.3 0.9 0.7 0.1 0.8 0.4 0.3 1.2-0.3 0.9-0.7 0.7-1.8 1.1-6.4 2.1-1.3 1.4 0.9-0.2 2.9-1.2 1.3-0.4 3.6 0 3.4-0.4 2.6 0.3 0.9-0.1 0.3-0.6-0.5-1.3 0.6-0.3 0.5 0 0.6 0.2 0.7 0.1 0.9-0.1 2.4-0.4 0.5-0.4 0.4-0.6 0.7-0.6 1.3-1 1.7-2.2 0.9-0.4 0.2-0.3 0.4-0.1 0.7 0.1 1.7 1.8 0.1 0.5 0 0.6 0.1 0.4 0.8 0.5 0.2 0.6-0.1 1.1 0.3 1.2 2.1 2.8 0.3 0.3 0 0.3-1.5 2.1-0.7 0.4-1.2 0.3-1.2 0.1-0.9-0.4-0.9 0.3-3.1-0.3-0.9 0.3-0.5 0.7-0.1 0.6 0.4 0.3 0.3 0.3 1.5 4 0.4 0.4 0.2 0 0.3-0.1 0.7-0.1 0.7-0.3 2.1-0.9 0.8-0.2 0.4 0.1 0.4 0.4 0.4 0.2 0.4-0.1 0.5-0.2 0.6-0.1 0.5 0.2 0.5 0.7 0.3 0.2 0.5-0.2 0.4-0.6 0-0.4-0.2-0.5 0.3-0.9 0.3-0.4 0.3-0.4 0.1-0.4-0.4-0.9 0.1-0.6 0.8-0.6 2.3-0.2 2.1-0.9 1.1 0.2 2.6 1.4 0.2 0.1 0.3-0.2 0.6-0.7 0.4-0.1 0.5 0.2 0.5 0.3 0.3 0.1 1 0.3 5.2 3 1.8 1.5 0.7 0.4 0.9 0.4 0.7 0.5 0.3 0.7-0.2 0.5-0.3 0.3-0.4 0.2-0.2 0.2-0.5 2.9-0.3 1.1-0.2 1 0.4 1.1 0.3 0 0.5-1.3 0.3-0.6 0.4-0.4 0.3-0.5-0.1-1.4 0.2-0.5 1.3-1 1.1 0.1 1 0.6 2.4 3 1 0.9 0.9 0.4 1.3 0.2 1 0.7 0.7 1 0.3 1.3 0.4-0.3 0.2-0.3 0.1-0.3-0.1-0.5 2.4 1.8 1 0.2 1 0.5 0.9 1.1 0.2 1.1-0.9 0.5 0.5 0.4 0.8 0.3 0.9 0 0.6-0.3 0.1-0.7-0.3-0.6-0.1-0.4 0.6-0.4 1.3 0 2.4 1.3 1.5 0 4-1.9 1.3-0.2 0.8 0.4 0.7 0.8 1.2 1.7 1.1 1.1 0.5 0.6 0.2 0.9-0.1 1.1-0.5 1.7-0.1 0.8 0.3 2.4-0.2 1.3-1.1 1-2.5 2.7-2 1.2-9.3 3.3-9.5 2.8-1.8 1.1-1.2 0.5-1.3 0.4-1 0.1-0.8-0.2-1.6-0.6-1.5-0.3-1-0.3-0.7 0-0.6 0.2-1.5 1.2-1.1 0.7-0.5 0-0.6-0.5-0.3-0.4-1-1.5-1.7-2.1-1.6-0.8-1-0.3-0.5 0.2-0.5-0.1-1.1 0.7-1.6 1.3-0.4-0.3-0.2 0.2-0.1 0.5 0 0.7-1.9-0.5-1.8 1.1-2.9 3.2-0.9 0.7-0.3 0.4-0.2 0.5 0.1 0.7 0.2 0.2 0.3 0.1 1.3 0.8 0.4 0.3 0.3 0.5 0.5 1.5 1.3 1.8 1.4 1.7 1.5 1.4 1.8 1.3 0.7 0.7 0.4 0.3 0.4 0.1 0.5 0 1.1 0.2 0.4 0.1 0.2 0.3 0.4 1 0.2 0.3 0.4 0.3 0.3 0.2 0.9 0.4 0.1-0.9 0.7-0.2 0.9 0.3 0.8 0.4 0.5 0.7 0.1 0.7-0.2 0.6-0.6 0.7-0.2 0.6 0.4 0.6 0.7 0.5 0.3 0.4 0.4 0.3 0.9-0.5 1.5-1.1 0.6 0.3 1.2 0.2 0.6 0.2-0.3 0.7 0.6 1 2 2.2 0.1 0.3-0.5 0.6-0.5 0.3-0.5 0-0.5-0.3-0.8-0.2 0.3 0.9-0.2 0.7-0.5 0.7-0.6 0.5-0.8 0.6-0.7 0.2-2-0.1-0.8 0.1-1.7 0.5-0.9 0.1-2.2 0-1.2-0.2-0.8-0.5-0.7 0.9-0.4 0.2-4.6 1.3-4.1 0.4-1.2 0.4-6.7 3.4-1.1 0-3.2-0.9-0.8-0.1-0.6-0.3-2-1.8-0.7-0.4-0.4-0.2-0.5-0.1-0.2-0.2-0.3-1-0.2-0.2-0.7-0.1-1.6-0.6-1.3-0.2-0.4-0.2-1.1-0.8-0.6-0.9-0.5-0.9-0.8-1-0.8 0.1-1.1 0.7-1 0.9-0.4 0.5 0.2 0.5 1 0.6 0.2 0.5 0 2.1 0.2 0.6 0.7 0.7 0.1 0.6-0.2 0.6-0.4 0.5-1.1 0.7-0.3 0.3-0.3 0.5-0.3 0.3-0.2 0.5 0.2 0.2 0.9 0.9 0.4 0.4-0.5 0-0.5 0-2.1 0.9-0.4-0.4-0.8-0.3-1.4 0.1-0.9-0.1-1.7-0.3-1.4-0.3-1.2-0.8-2.9-3-4.1-2.1-1.9-1.4-0.4-0.5-0.3-0.5-0.4-0.3-0.7-0.1-0.6 0.1-0.8 0.8-0.5 0.2-9.4 0.2-2.9-0.8-2 0-4 0.8-2-0.5-1.9-1.3-0.9-0.1-1.6 1.4-0.9 0.3-1 0-1.3-0.5-1.3 0.6-0.7 0-2.2-3.3-0.6 0-0.3 0.6-1.1 1.1-0.4 0.7 0 0.5 0.3 0.4 0.1 0.3-0.4 0.5-0.9 0.2-0.6-0.2-0.5-0.1-1.3 1.3-0.5 0.2-0.6-0.1-0.5-0.2-1.3-2.2-0.1-0.7-0.2-0.2-0.4-0.1-0.3 0-0.4 0-1.3-1.3-1.3 0.2-1.5 0.7-1.4 0.5-0.7-0.1-2.3-0.7-1.2 0-0.5-0.1-0.5-0.3-0.5 1.1-0.3 0.6-0.6 0.5-0.9 0.5-2.5 2.5-0.6 0.3-0.8-0.3-0.6-0.6-0.3-0.8-0.2-0.9-0.3-0.3-0.6-0.4-1.2-0.4-2.2-0.2-1-0.2-0.5-0.8-0.2-0.8-0.4-0.4-0.7 0.1-0.6 0.6-0.5 1.7 0 1.6-0.2 1.6-1.9 1.6-0.3 0.7-0.2 0.5-0.7 0.2-0.5-0.3-0.3-0.4-0.4-0.2-2.2 2-0.4 0.5-0.3 0.3-1 0.3-0.5 0.5-0.4 1.2z m70.4-162.3l-0.2 1.2-0.5 0.8-0.9-0.9-0.8 0.4-0.3 0.9 0.6 1-4.9 1.2 0.3 0.5 0.4 0.2 0.3 0.3-0.3 0.6-0.4 0.2-0.8 0.1-0.7-0.1-0.5-0.2 2.4-4.6 0.7-0.3 1.8-0.4 0.6-0.3 2.1-2.5 0.8 0.7 0.3 1.2z m12.1 6l-0.7 1-0.9-0.5-1 0.4-2.9 0.6-0.7 0.3-0.3 0.2-1.3 0.7-0.5 0.3-0.3 0.6-0.2 0.6-0.3 0.5-0.6 0.4-0.3-1.2-0.4-4 0.2-0.8 0.2-0.4 0-2.2 0.1-0.5 0.3-0.3 0.8-0.2 0.5-0.3 1.2-1.3 1.2-0.8 0.6-0.2 0.7-0.1 3.8-0.7 1.2 0.4 0.6 0.8 0.1 1.2-0.5 4-0.6 1.5z",
                name: "SABAH"
            },
            swk: {
                path: "M599.2 254.8l0 0.5-0.1 0.3-0.5-0.3-0.5-0.2-0.5 0.2-0.4 0.4-0.2 0.5-0.5-0.7-0.9-2-0.5-0.5-1-0.4-0.2-1.1 0.3-2.2 0.1-2.1-0.9-8.5 0.1-2.5 0.7-1.6 1.8 0.7 1 1.6 0.6 2.1 0 8.9 0.4 3.8 1.1 2.9 0.1 0.2z m214.8-89.6l-0.3 0.9-0.5 4.5-0.7 2.2-1 2-0.4 0.5-1.8 1-0.4 0.4 0 1.1 0.8 0.8 1 0.5 0.8 0.8 0 1.7-2 5.9-0.3 2 0 2 0.2 1.3 1.3 3 0 0.6-0.1 1 0 0.5 0.2 0.6 0.9 1.6 0.4 1 0 0.6-0.3 0.5-0.5 0.2-0.5-0.2-0.4-0.2-0.5-0.1-1.1 1.1-1 2.4-1.7 7.7 0 0.9 0.8 0.9 0.8 0.3 0.1 0.4-1.8 2.3-0.3 1-0.2 2.1-0.4 1-0.8 0.4-2.1 0.2-3.3 1.5-1.6 0.2-1.5-0.7-1.3-1.9-0.7-0.2-0.8 1.3-0.9 1.8-0.6 0.7-2.9 1.9-0.8 0.8-0.7 1.1-0.2 0.6-0.1 0.5-0.2 0.6-0.4 0.5-0.7 0.6-0.5 0.2-0.1 0.3 0.3 0.6 1.3 1.8 0.4 1-0.6 1.2-0.6 0.4-0.5 0.1-0.5 0.2-0.3 0.6 0.1 0.5 0.5 1 0.2 0.5-0.2 1.1-0.5 1.1-0.1 1 0.8 0.8 0.5 0 1.1-0.6 0.6-0.1 0.6 0 0.6 0.2 0.7 0.3 0.5 0.4 0.7 0.8 0.8 1.2 0.6 1.2 0.1 0.9-0.7 1-1 0.3-2.3 0.2-1.1 0.7-1.9 2.2-0.8 0.5-0.9 0.3-2.2 1.9-0.9 0.6-2-0.1-0.6 0.3-0.4 1.1 0.1 1.1 0.1 0.8-0.3 0.6-1.3 0.4-4 0.6-1.5 0.8-0.8 2-0.6 2.8 0.1 1 0.2 0.4 0.5 0.8 0.2 0.5-0.1 1.7 0.1 0.5 0.5 1.1 0.6 0.1 0.8-0.4 1.2-0.1 0.5 0.3 0.2 0.7 0 0.7-0.2 0.7-0.4 1-0.2 0.9 0 0.9 0.2 1-0.1 1-0.7 0.6-2.8 1.1-2.8 0.4-0.5 0.2-0.5 0.4-0.5 0.4-0.2 0.5-0.2 0.5 0.1 0.4 0.2 0.4 0.1 0.6 0.1 1.6-0.6 3.5-0.9 2.7-1.4 2.2-0.7 0.8-1.8 1.5-0.6 0.8 0 1.3 0.3 1 0 1.1-0.4 1-0.8 0.8-1.2 0.3-1.1-0.4-4-2.8-1.2-0.6-1.1-0.2-1 0.3-7.7 3.2-1.1 0.8-0.5 0.1-0.6-0.2-0.6-0.5-0.4-0.5-0.5-0.5-1.9-0.6-2.1 0.1-7.3 1.1-0.9 0.4-1.2 1-3.1 3.8-8 5.5-1.3 0.3-1.4-0.8-2.6-3-1.1-0.6-1-0.1-1.1 0.3-2 0.9-2.3-0.1-3.8-2.9-2.4-0.9-3-0.7-2.3-0.1-0.7-0.2-1.6-1.3-1.9-0.9-2-0.2-2 0.4-1.9 0.6-0.8 0-0.1-0.4 0.3-0.6 1.5-1.1 0.8-0.9 0.6-0.9 0.3-1.1 0-1.2-0.5-0.7-0.9-0.5-1.2-0.5-0.9-0.1-2.4 0.1-1-0.2-0.9-0.3-0.8-0.1-0.9 0.3-0.5 0.5-0.4 0.5-0.3 0.4-0.6 0.3-0.4-0.1-1.3-0.4-15.2-0.8-1.2 0.3-0.8 0.6-0.7 0.7-0.9 0.7-0.9 0.3-3.1 0.3-1.3 0.4-5.8 2.8-1 0.7-0.3 1.3 0.2 0.4 1.2 0.1 0.3 0.4 0 0.6-0.2 0.6-1.6 3.1-2.7 7.8-0.3 0.6-0.7 0.3-1.3 0.1-4.1 0-3.2 1-4.5 5.4-3 0.8-1.5-0.4-2.6-1.2-1.4-0.3-0.9-0.1-0.7 0.1-4.3 1.7-1.2 1.6-0.6 0.4-0.6-1.2-0.2-0.9-0.3-0.7-0.5-0.5-0.9 0-2 0.6-1 0.2-1.1 0-1.1-0.4-6.8-3-1.1-0.1-11.4 2.9-3.1 0.1-1.6 0.3-1.4 0.7-2.8 2.4-0.5 0.8-0.1 0.9-0.1 0.4-0.4 0.3-0.2-0.1-0.5-0.4-0.2-0.1-0.6 0.3-0.1 0.2-1 0.4-0.2 0-0.6-0.2-0.2 0-0.6 0.3-1 0.9-0.6 0.2-0.7 0-0.5-0.4-0.3-0.4-0.4-0.2-0.6-0.1-0.1 0.2-0.2 0.4-0.5 0.6-2.2 1-2.4-0.3-2.3-1.1-2-1.6-2.1-2.9-0.8-0.7-0.7-0.3-2.5-0.5-0.8 0.1-0.7 0.2-0.4-0.2-0.1-1-0.3-1.3-2.5-3.7-1.1-2.1-0.8-1-0.9-0.5-3-0.4-0.9-0.4-1.2-0.8-1.1-2-0.9-0.8-1.8-0.9-0.7-0.6-0.6-1-1-3-0.6-0.9-0.9-0.4-1 0-1 0.1-1-0.1-0.9-0.7-0.9-2.2-0.4-0.3-0.9 0.5-0.3-0.1-0.2-1.4-0.3-0.5-4.5-3.9-1-1.3-0.6-1-0.2-1-0.1-2.3 0.3-4-0.2-1-0.9-0.4-2.3 0-0.6-0.2-0.6-0.5-0.5-0.6-0.3-0.6-0.3-0.7 0-0.3 0-0.4-0.3-1.9 0-0.7 0.5-0.7 1.8-1.5 0.6-0.7 0.7-1.1 1.4-2.4 0.9-2.7 0.3 0.9 0.1 1.1 0.5 2.1 0.1 1-0.2 0.8-0.3 0.7 0 0.8 0.5 1.2 1.5 2.1 0.9 0.9 1 0.8 3.2 1.3 1.8 1.2 2 0.9 0.9 0.6 0.6 0.9 0.9 1.8 0.6 0.8 0.7 0.2 2.5-0.1 0.6-0.1 0.8-0.4 1.1-0.1 6.5 0 0.7 0.2 1 0.7 0.5 0.1 0.3-0.1 0.7-0.7 0.4-0.2 0.5-0.2 0.3 0 0.3 0.2 1.2 1.3 0.3 0.1 0.3-0.9 0.5-0.6 0.1-0.3 0-0.3-0.3-0.5 0-0.2-0.1-1.6 0.1-0.5 0.6-1.1 0.8-0.5 0.7 0.2 0.4 1.5 0.5 0.6 0.1 0.3 0.1 0.4-0.1 0.7 0 0.3 0.2 0.4 0.2 0.3 0.3 0.2 0.3 0.2 0.4 0.2 0.4 0.1 1.2 0 0.5-0.2 0.6-0.9 1.5-0.6 1-0.5 0.8-0.1 0.6 0.9-0.6 0.8-0.4 0.7-0.3 0.8-0.1 1-0.2 0.4-0.9 1-0.3 0.6 1.4-0.6 0.7-0.1 0.7 0.3 0.5 0.6 0.2 0.5 0.1 0.5 0.6 0.2 0.5-0.1 1-0.6 0.6 0 0.7 0.2 2.1 1.2 2.9 0.8 1.3 0.8 0.6 1.2-0.3 1.3-0.9 0.9-1.9 1.2 0 0.4 1.4 0 1-0.2 1-0.5 1-0.9 0.5-0.9-0.1-1-0.2-1-0.1-0.7 1.4-1.1 2.3 0.3 4.4 1.8 2.2 1.4 3.8 3.9 2 1.3 3 1.5 0.7 0.2 1.2-0.1 1.7-0.9 1-0.3 1.7 0.6 1.8 1.5 2 1 2.2-1.1-0.8 0-1.5-0.5-0.7-0.2-0.2-0.3-0.5-1.4-0.3-0.3-0.8-0.1-1.4-0.5-0.8-0.1-0.6 0.2-1.8 0.8-1.1 0-1-0.2-0.8-0.6-0.7-0.7-0.9-0.7-2.3-0.9-0.8-0.7-1-2.5-0.9-0.9-0.3-0.6 0-1.5 0-0.4 0.7-1.8 0.5-1.9 0.4-0.6 3-0.6 1.1 0 1 0.3 0.6 0.9 0.7 1.2 0.8 0.7 1.2-0.5 0.6-0.1 0.7 0.5 0.9 0.4 1.1-0.3-1-0.3-0.5-0.2-0.9-0.7-0.5-0.1-0.4 0.1-1-0.3-0.3 0-0.2-0.1-0.1-0.6-0.5-0.9-0.2-0.2-0.1-0.2-1-0.2-0.3-0.1-0.2-0.2-1.2-2-0.2-0.7-0.1-0.8 0.2-0.3 1.2-0.3 0.3-0.3-0.1-0.3-0.7-0.5-0.2-0.4 0.1-1 0.5-0.9 1.1-1.8 1.6-3.3 1.5-4.7 0.1-1.2 0.2-0.2 0.7 0.1 1 0.3 1.2-0.1-1.3-1.1-0.1-1.2 0.7-0.7 0.9 0.1 1 0.3 1.9 0.4 0.4-0.1 0.7-0.4 0.3-0.4 1-1.3 0.1-0.4-0.5-0.4-0.6 0.2-0.5 0.5-0.4 1.3-0.5 0.1-0.5-0.2-1.4-0.9-1-0.2-3.7 0.5-0.7-0.1-0.3-0.5 0-1.2 0.3-0.8 0.8-0.8 1-0.5 1 0.2-0.5-0.9-1-0.4-0.9-0.2-0.4-0.4 0.1-0.9 0.6-2.4 0.5-3.6 0.6-1.4 1.3-1 0.4 0.9 0.7 0.4 1.7 0.5 0.6 0.5 1.3 1.6 0.4 0.3 0.3 0.2 0.3 0.3 0.4 0.2 0.4-0.1 1.6-1.1 0.5-0.2 1.7-0.2 0.4 0.1 0.9 0.6 1 0.6-0.4-0.9-1.1-1.1-1.6-1.5-0.4-0.6-0.6-2.2-0.4-0.7 1.5 0.1 1.5 0.3 1.2 0.1 1-0.9 0.3 0.2 0.4-0.2-1.1-0.4-1.9-0.4-0.9-0.5-0.6-0.6-0.5-0.5-0.3-0.8 0-1.3 0.9-3.1 0.3-2 0.3-0.7 0.6-0.6 3.6-2.8 5.6-3.4 1.5-0.8 9.7-1.9 7.8-0.3 14.5-3.8 14-3.7 7.8-1.7 3.1-1.2 0.6 0 8.9-2.7 1.7-0.9 2.7-2.9 1-2-0.6-1.1 0.4-0.5 1.3-0.9 2.5-2.1 0.5-0.3 0.2-0.5 1.7-2.7 4-3.5 0.9-1.4 0.2-0.4 0.1-0.4 0.1-1.1 0.2-0.5 1.2-0.9 0.3-0.4 0.3-0.5 2.5-2.7 1.2-2.1 0.4-1.2 0.1-1.1 0.4-1 1-0.8 2.1-1.2 12.3-10.6 10.7-13.9 1.1-2.5-0.4-2 1.1-1.7 0.5-2.2 0-2.4-1.2-4.8 0.4-0.8 1.1-0.4 3.4 1.6 2.7 0.5 1.1 0.5 1.7 1.3 1.2 0.5 0.6 0.4 0.4 1 0.3 0.2 0.8 0 0.4 0.2 0.1 0.3 0 0.4 0.2 0.3 0.5 0.6 0.3 0.6 0.4 1.4 0 1.4 0.7 1.1 0.4 2.3-0.2 0.5-0.7 0.6-0.2 0.3 0.1 0.7 0.3 0.5 1.7 0.1 2.2 0.5 2.1-0.4 0.9 0.1 0.7 0.6 1 3.3 0.5 0.9 0.8 1 3.2 3 1 0.7 0.4 0.4 0.3 0.6 0.4 1.2 0.2 0.4 2.1 0.3 2.4-1.4 4.7-4.5 0.4-0.7 0.3-2.2 0.3-0.9 1.2-1.8 0.3-0.9-0.1-0.9-1.6 0.6-0.1-1 0.3-0.5 1.6-1.5 0.5-0.8 0.4-0.9 0.5-1.9 0.1-1.5-0.4-0.2-0.7 0.1-1-0.4-0.9-1.4-0.3-1.9-0.3-5.9-0.2-1.2-0.3-1-0.9-1.9-0.4-1 0-0.8 0.5-0.5 1.9-0.8 0.8-0.5 1.7-1.6 0.9-0.5 1.1-0.4 1 0.1 0.9 0.1 0.9 0 0.8-0.5 0.3-0.8 0.1-0.8 0.1-0.8 1.2-1.2 0.5-0.2 0.5-0.3 0.4-0.4 0.3-0.5 0.4 1.1 0 2 0.3 1.8-0.3 4.1 0.2 4.1 0.4 2 1.7 4 0.6 2 0.6 5 0.4 0.8 0.7 0.4 2.9 1.1 1 0.2 1.6-0.1 0.4 0.1 0.8 0.7 0.5 0.2 1 0 0.4 0.1 0.9 0.7 1.2 0.5 1.1 0 0.8-0.8-0.2-1-0.7-1.1-1.8-1.7-1.2-1.6-0.6-2-0.3-2.2 0-2 0.4-2 0.1-0.9-0.2-1.2-3.3-9.6-1.3-1.8-0.7-0.5-0.6-0.3-0.5-0.5 0-1.1 0.8 0 0.8-0.1 0.6-0.4 0.4-1.7 0.6-0.5 0.7 0.1 0.6 0.7 0.2 0.4 0.2 0.1 1.1-0.1 0.5 0.1 0.5 0.2 0.4 0.3 0.6 1 0.9 0.3 1 0 0.9-0.2 0.6-0.4 1.6-1.7 0.3-0.3 0.7-0.6 4.7 0.5 2.4-0.2 1.5-0.2 0.9 0 0.7 0.1 0.4 0.4 0.3 0.5 1.1 4.8 0 0.6 0 0.5-0.8 2.6-0.2 0.5-0.3 0.5-1 1-0.3 0.4-0.1 0.5-0.2 1-0.2 1.7-0.1 0.6-0.2 0.5-1.6 2.9-0.1 0.2-0.1 0.5 0.2 3.9 0.3 0.7 0.8 1.3 0.1 0.4 0.1 0.4-0.1 1.2 0.1 0.9 0.3 0.6 0.3 0.4 0.3 0.2 0.5 0.1 0.8 0.2 0.4 0.2 0.4 0.2 0.5 0.5 0.7 0.9 0.3 0.6 0.1 0.6-0.1 0.5-0.4 1.1-0.2 0.5-1.5 2-0.3 0.6-0.1 0.7 0.1 1.2 0.2 0.8 0.2 0.7 0.2 0.4z",
                name: "SARAWAK"
            },
            ptj: {
                path: "M104.3 229.9l-0.3-0.1-0.2-0.4 0-0.4 0.1-0.5 0.2-0.1 0.2-0.4 0-0.3-0.2-0.8 0.1-0.3 0.1-0.2 0-0.2-0.2-0.3-0.1-0.3 0.1-0.3 0.4-0.1 0.7-0.2 0.3-0.1 0.2-0.1 0.4-0.2 0.2 0.9 0.4 0.3 0.3 0.5 0 0.9-1 1.3-0.2 0.4-0.2 0.4-0.7 0.6-0.4 0.1-0.2-0.1z",
                name: "PUTRAJAYA"
            },
            lbn: {
                path: "M794.7 106.7l-0.9 0.9-0.5 0-1-0.6-0.4 0.1-1 0.8-1.3 0.8 0.1-0.8 1.4-3.9 0.5-0.5 1.4-1.4 0.8-0.3 0.4 1.1 0.5 2.6 0 1.2z",
                name: "LABUAN"
            },
            prk: {
                path: "M105.3 82.4l0.1 0.3 0 2.6-0.2 0.8-0.1 0.1-0.6 0.4-0.4 0.3-0.3 0.5-0.1 0.3-0.1 0.2 0.1 0.5 0 0.6 0 0.7 0 0.3 0.1 0.3 0.3 0.2 0.4 0.2 0.1 0.2 0.1 0.3 0.1 0.6 0 0.6-0.2 0.6-0.4 0.6-0.3 1 0 0.3 0 0.2 0.4 0.1 0.4 0 0.3 0 0.4 0.3 0.2 0.1 0.4-0.1 0.2-0.2 0.4-0.1 0.4 0.3 0.6 0 0.2 0.2 0.2 0.4 0.1 0.4 0.1 0.3-0.1 0.4-0.3 0.6 0 0.5 0 0.3 0.2 0.6 0 0.3 0 0.3-0.1 0.5-0.1 1.5 0.2 0.7 0 0.2-0.2 0.4-0.1 0.1-0.6 0.4-0.4 0.2-0.2 0.1-0.4-0.1-0.4 0-0.3 0-0.4 0.1-0.3 0.2-0.3 0.4-0.2 0-0.1 0-0.5-0.4-0.4-0.1-0.4-0.1-0.4 0-0.3-0.1-0.4-0.5-0.3-0.1-0.2 0-0.1 0.1-0.3 0.3-0.3 0.3-0.6 0.4-0.3 0.3-0.2 0.2 0.1 0.6-0.1 0.3-0.2 0.3-0.8 0.6-0.2 0.2-0.2 0.4-0.1 0.3-0.2 0.1-0.2 0-0.2 0-0.4 0-0.2 0.1 0 0.1-0.1 0.5 0 0.3-0.3 0.6-0.1 0.2 0 0.8-0.1 0.4-0.7 1.1-0.3 0.4-0.1 0.8 0 0.4-0.1 0.5-0.1 0.3 0 0.2 0.1 0.4-0.1 0.5 0 0.2-0.2 0.3 0 0.3-0.1 0.7-0.1 0.3-0.6 1.1-0.1 0.3 0 0.4 0 0.4-0.1 0.8-0.3 0.5-0.1 0.3-0.1 1-0.3 0.5-0.8 0.6 0.4 0.9 0.5 0.5 0.2 0.3 0.3 2.1-0.1 0.6-0.5 1.5-0.1 0.2-0.2 0.2-0.6 0.1-0.4 0-0.3 0.2-0.3 0.5-0.2 0.2 0 0.4 0.3 0.8 0.2 0.5-0.1 0.4-0.1 0.1-0.3 0.5-0.2 0.6-0.1 0.2-0.2 0.2-0.4 0.1-0.3 0.1-0.1 0.2 0 0.2 0.1 0.3 0.1 0.7 0.1 0.6-0.1 0.3-0.1 0.2-0.2 0-0.4 0-0.1 0-0.3 0.1-0.6 0.2-0.6 0.9 1 1.4 0.4 0.8 0.4 1.3-0.7 2-0.1 0.9 0.1 0.3 0.2 1.1 0.2 0.3 0.5 0.4 0.2 0.5 0 0.3-0.1 0.2-0.3 0.2-0.1 0.1-0.4 0.9-0.2 0.5-0.2 0.5-0.5 0.4-0.4 0.7 0.6 0.5 0.6 0.8 0.2 0.2 0.2 0 0.3-0.1 2.4 0.8 0.6 0.1 0.2 0.1 0.1 0.1 0.1 0.2 0 0.3-0.2 0.3-0.2 0.6-0.2 0.2-0.1 0.4 0.1 0.2 0.1 0.2 0.4 0.2 0.2 0.2 0.2 0.5 0.1 2.1 0.2 0.6 0.2 0.1 0.3 0.3 0 0.3 0 0.2-0.2 0.5 0 0.6 0 0.3 0.1 0.1 0.7 0.4 0.7 0.1 0.6 0.2 0.3 0.2 0 0.3-0.2 0.2 0 0.4 0 0.6 0.3 1.3 0.2 0.6 0.2 0.3 0.2 0 0.4-0.2 0.3 0 0.4 0.3 0.2 0.1 0.4 0.4 1.3 1.7-1.1 3.1-0.1 0.9 0 0.2 0.6 0.6 0.1 0.5 0.3 3.7 0.3 0.8 0.1 0.3 0.5 0.5 0.1 0.4 0.1 0.4 0 0.6-0.2 2.1 0 0.4 0.1 0.3 0.4 0.1 0.4 0.2 0.5 0.8-0.9 0.2-0.3 0.4-0.2 0.2-1.8 2.3-1 1.1-0.5 0.4-0.5 0.2-0.2 0.1-0.3 0-0.3-0.1-0.2-0.2-0.3-0.5-0.2-0.3-0.3-0.1-0.3-0.2-0.3-0.4-0.2-0.1-0.5-0.1-0.2-0.3-0.2-0.6-0.5-0.7-0.3-0.2-0.1 0-0.7-0.1-0.3-0.1-0.4-0.2-0.3-0.2-0.6-0.4-0.2-0.3-0.1-0.3-0.3-0.4-0.5-0.2-0.4-0.1-0.7 0.1-0.6 0.2-0.2 0.2-0.4 0.9 0 0.2 0.4 0.5 0.1 0.1 0.3 0.7 0.2 0.9 0.1 0.9-0.5 0.7-1.1 0.6-0.5 0.2-1.2 0.2-0.8 0-0.4-0.1-0.1-0.1-0.2-0.2-0.1-0.4-0.1-0.3 0-0.6 0-0.4-0.4-0.3-0.4 0-0.7 0.4-0.3-0.1-0.3-0.4-0.3-0.2-0.2 0-0.2 0-0.4 0.2-0.3 0.2-0.2-0.1-0.2 0-0.3-0.7-0.4-0.3-0.1 0-0.3 0.3-0.2 0-0.2-0.3 0-0.3 0-0.2-0.5-0.4-0.2 0-0.1 0.1-0.1 0.4-0.1 0.2-0.7 0.3-0.2 0-0.3-0.1-0.2-0.1-0.3 0.1-0.3 0.3-0.2-0.1 0.1-0.3 0-0.5 0.1-0.1 0.3 0 0.4 0.1 0.3-0.1 0.1-0.1-0.1-0.1-0.4-0.5 0-0.1 0-0.4-0.1-0.2-0.3 0.1-0.2 0.2-0.2 0.3-0.4 0.2-0.2 0.3-0.2 0.1-0.2-0.1 0-0.4 0-0.3 0-0.6-0.1-0.2-0.3-0.1-0.4 0.1-0.5 0-0.1-0.1-0.2-0.2-0.1-0.2-0.1-0.2-0.2-0.1-0.2 0-0.5 0.3-0.4 0-0.2 0.1-0.2 0.2-0.1 0.6-0.3 0.2-0.3 0.1-0.3 0-0.1-0.1-0.2-0.3 0-0.4 0.1-0.3 0.2-0.3 0.3-0.4-0.1-0.2-0.3-0.3-1.2-0.7-0.2-0.3 0.2-0.5 0-0.4-0.2-0.3-0.1-0.1-0.2 0-0.4 0-1.4 0.4-1.9 0.2-0.9 0.3-0.2 0 0.2-0.4-0.6-0.2-1.1 0.2-0.6 0.2-0.2 0.2-0.6 0.2-1.2-0.4-1.3-0.6-0.7-0.4-0.6-0.8-0.3-0.8-0.1-1 0-2.5 0.2-0.8 0.7-0.4 3.2 0.1 1-0.1 0.8-1 0.9-0.4 1-0.2 0.8 0.2-0.5-1.1-1.2 0.1-1.2 0.6-0.5 0.4-1.3-0.2-0.3-0.8 0.2-1.2 0-1.3-0.5-0.7-2.7-1.8-0.8-0.8-1-0.7-1.1-0.2-1.2 0.7-0.5-1-0.5-1.7-0.2-1.5 0.3-0.7-0.8-0.3-0.2-0.6 0-0.8-0.2-0.8-0.6-0.6-0.5-0.1-0.2-0.3 0.2-1.1 0.5-1.3 0.2-0.7 0-0.9 0.3-0.7 0.9-0.7 0.2-0.7 0.2-1.4 0.9-3.4 0.6-1.4-0.7 0.4-0.9-0.3-0.8-0.7-0.3-0.9 0.1-1.1 0.5-0.9 0.7-0.4 0.8 0.4 0.3-0.7 0.4-0.6 0.5-0.4 0.5-0.4-1.2-0.2-1.1 0.4-0.9 0-0.3-1.4-0.1-2.5 0.4-0.7 1.5-0.1 0-0.3-0.3-0.1-0.8-0.3 0.4-0.7-0.1-0.3-1-0.4-0.5-0.1-0.3 0.2-0.3-0.1-0.3-0.7 0-0.7 0.4-0.9 0-0.5-0.3-0.2-0.5 0-0.5-0.2-0.1-0.7-0.5 0.3-0.6 0.1-1.2 0-0.5-0.2 0.2-0.4 0.5-0.4 0.3-0.1 0-0.6-0.2-0.3-0.4-0.1-0.6-0.5-0.5-0.3-0.5 0.1-0.5 0.4-0.4 0.3-0.6-0.7-0.3-0.7-0.2-0.6-0.3-0.8-1.2-1.4-0.4-1.1-0.7-1.7-0.4-0.8-0.4-1.1 0-0.4 0.2-0.1 0.3 0.1 0.2-0.1 0.5-0.6 0.6-0.5 0.2-0.3 3.9-0.9 0.5 0 0.6 0.2 0.4 1.4 0.3 0.4 0.2 0.1 0.6 0.2 0.5 0.4 0.4 0.2 0.4 0 0.5 0 0.3-0.2 0.7-0.9 0.8-0.7 0.2-0.2 0.2-0.8 0.2-0.4 3.6-3.2 0.3-0.5 0.2-0.8 0.4-0.8 0.3-0.4 1.3-0.9 0.2-0.2 0.2-0.3 0.2-0.7 0.5-0.9 0.3-0.3 1.8-0.3 1.2-0.3 0.6-0.2 0.3-0.2 0.7-0.7 0.3-0.6 0.2-0.3 0.3-1.5 0-0.4 0-0.5 0-0.4 0.2-2 0.3-0.6 0.2-0.3 0.4-0.6 0.2-0.3 0.2-0.1 0.4 0.3 0.3 0 0.3-0.2 0.6-0.7 0.4-0.4 0.3-0.8 0.2-0.7 0-0.6 0.1-0.9 0-0.2-0.1-0.4-0.3-0.2-0.3-0.1-0.2-0.1-0.1-0.3-0.1-0.4 0.1-0.2 0.1-0.1 0.4-0.4 0.4-0.5 0.3-0.3 0.6-0.4 0.2-0.4 0.7-2.9 0.1-0.3-0.1-0.2-0.2-0.2-0.5-0.2-0.1-0.1-0.1-0.3-0.3-0.4-0.2-0.9 0.2-0.2 0.3-0.1 0.4 0 0.4 0.6 0.5 1.2 0.4 0.4 0.5 0.2 1-0.1 0.5 0.1 1.1 0.8 1 1.1 0.7 1.3 0.6 1.3 0.9 0.4 1.4-0.5 2.4-1.4 0.8-0.7 0.6-1 0.4-1 0.2-1.1 0.6-2.3 1.6-0.9 2-0.3 1.9-1 1.8-1.1 7.2-2.8 1.2-0.3 1.1 0.3 0.8 1 0.3 0.6 0.2 0.4 0.4 0.3 0.6 0.1 0.5 0.1 0 0.5-0.1 0.5-0.1 0.4 1 2.4 0.8 0.9 1.1 0.2 0.5-0.3z",
                name: "PERAK"
            },
            kul: {
                path: "M103.9 221.8l-0.2-0.1-0.2-0.2-0.3-0.8 0-0.2 0.2-0.4 0.2-0.4 0.1-0.3-0.1-0.5-0.2-0.2-0.1-0.2-0.1-0.5-0.1-0.2-0.2-0.2-0.6-0.4-0.2-0.1-0.2-0.3-0.2-0.4-0.1-0.1-0.1-1.8 0-0.2 0.7-1.2 0.2-0.4 0.1-0.2 0.7-0.3 0.5-0.4 0.1 0 0.3 0 0.6 0.7 1.2 0.6 0.4 0 0.3-0.1 0.3-0.2 0.5-0.2 0.2 0 0.2 0.1 0.3 0.3 0.2 0.6 0.2 0.4 0.2 0.6-0.2 0.4-0.3 0.3-0.1 0.2-0.1 0.8-0.1 0.2-0.3 0.3 0 0.4 0 0.5 0.3 1 0.2 2 0 0.2-0.1 0.3-0.1 0.1-0.4 0-0.2 0.1-0.1 0.2-0.2 0.5-0.1 0.1-0.2 0-0.1-0.4-0.1-0.1-0.5-0.1-1.4 0.2-0.7 0z",
                name: "KUALA LUMPUR"
            },
            png: {
                path: "M34.8 98.5l0.4 0.8 0.8 0.5 0.5 0.4-0.9 1.8-0.3 2-0.2 0.9-1.2 2.4-0.2 0.9-2.7-0.6-2.1 0.1-0.1 0.2-0.1 0.1-0.3-0.1-0.2-0.3-0.1-0.2 0.7-0.4 0.2-0.7-0.2-2.7 0.1-2.4-0.2-0.5-0.2-0.4-0.2-0.3-0.1-0.2 0.1-0.5 0.2-0.4 0-0.4-0.3-0.3 0.6-0.3 0.3 0.3 0.2 0.5 0.4 0.2 0.4-0.1 0.3-0.4 0.3-0.3 0.3-0.3 0.9-0.2 1.1 0 0.9 0.3 0.9 0.6z m9.8 16.2l-0.6-0.2-0.5 0-3.9 0.9 0.2-0.3 0.4-1.7 0.7-1.6 0.2-1-0.2-0.6-0.5-1-0.1-0.3 0.1-0.6 0.6-1 0.1-0.5-0.2-0.7-1.2-2.3-1.1-1.5-0.2-0.7-0.1-1.1 0.3-4.4-0.3-1.2-1.2-2.1-0.1-0.3 7.5 0.5 0.8 0.1 0.8 0.4-0.2 0.6-0.1 0.4-0.1 3.1 0.9 10.5 0.9 6-0.1 0.4-0.1 0.2-0.3 0.2-0.2 0.1-0.6 0-1.6-0.3z",
                name: "PULAU PINANG"
            }
        }
    });