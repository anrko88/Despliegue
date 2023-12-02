(function($) {
    var _$m = ',', _$p = '.';
    $.uiglobalproxyError = function(response) { alert(response.status + ' : ' + response.statusText); }
    $.uiglobalproxyOk = function(response) { }
    $.uigloballoadComplete = function(response) { }
    $.pageHeightRefresh = function() { if (parent.calcHeight) parent.calcHeight(); }
    $.parentLock = function() { if (parent.lock) parent.lock(); }
    $.parentUnlock = function() { if (parent.unlock) parent.unlock(); }
    $.keypressCode = function(e) { return ((e.charCode) ? e.charCode : ((e.which) ? e.which : e.keyCode)); }
    $.keypressChar = function(e) { return String.fromCharCode($.keypressCode(e)); }
    $.noleadZero = function(num) { var p = true, i = 0; while (p) { s = num.substr(i + 1, 1); if ((num.substr(i, 1) == "0") && (s != ".") && (s != "")) i++; else p = false; } return num.substr(i); }
    $.getSelectionStart = function(o) { if (o.createTextRange) { var r = document.selection.createRange().duplicate(); r.moveEnd('character', o.value.length); if (r.text == '') return o.value.length; return o.value.lastIndexOf(r.text); } else return o.selectionStart; }
    $.getSelectionEnd = function(o) { if (o.createTextRange) { var r = document.selection.createRange().duplicate(); r.moveStart('character', -o.value.length); return r.text.length; } else return o.selectionEnd; }
    $.repeatChar = function(n, c) { var r = ""; for (i = 1; i <= n; i++) { r += c; } return r; }
    $.formatNumber = function(n) {
        if (n == "") n = "0";

        var length = n.length;
        var esNegativo = false;

        if (n < 0) {
            esNegativo = true;
        }

        if (length > 3) {
            for (g = length - 3; g > 0; g = g - 3) {
                n = n.substr(0, g) + _$m + n.substr(g);
            }
        }

        if (esNegativo) {
            if (n.substr(1, 1) == ",") {
                n = "-" + n.substr(2);
            }
        }

        return n;
    }
    $.unformatDecimal = function(n) { while (n.indexOf(_$m) != -1) { n = n.replace(_$m, ""); } return n; }

    $.isCursorKey = function(e) {
        function isCursor(c, shf) {
            var _ctrl = '!"#$%&/(.' + "'";
            var ok = ((c == 9) || (c == 8) || (c == 13) || ((c > 32) && (c < 41)) || (c == 45) || (c == 46)), s = String.fromCharCode(c);
            if (_ctrl.indexOf(s) > -1 && (shf)) ok = false;
            if (((c == 46) && (s == '.')) || ((c == 45) && (s == '-')) || ((c == 39) && (s == "'"))) ok = false;
            return ok;
        }
        var _c = $.keypressCode(e), shf = e.shiftKey || e.shiftLeft;
        if ($.browser.msie) if (isCursor(_c, shf)) return true;
        if ($.browser.mozilla) { if (e.charCode == 0) return true; }
        return false;
    };

    $.formatDecimal = function(n, t, d) {
        var ret = n, ent = n, _pto = n.indexOf(_$p), _dec = "", _ldec = 0;
        if (n != "") {
            if (_pto != -1) { ent = n.substr(0, _pto); _dec = n.substr(_pto + 1, d); _ldec = _dec.length; }
            ent = $.noleadZero(ent);
            if (t) ent = $.formatNumber(ent);
            if (_ldec < d) _dec += $.repeatChar(d - _ldec, "0");
            if (d > 0) ret = ent + _$p + _dec;
            else ret = ent;
        } else ret = "0.00";
        return ret;
    }

    $.fn.loadingAjax = function(options) {
        var defaults = { img: '../../../img/ajax-loader.gif' };
        var options = $.extend(defaults, options);
        return this.each(function() {
            var left = (screen.width / 2) - (300 / 2), top = (screen.height / 2) - (120 * 2);
            var t = "<div id='divloadingAjax'><div id='divloadingAjaxItem'><img src='" + options.img + "'/></div></div>";
            $(this).append(t);
            $("#divloadingAjax").dialog({ modal: true, autoOpen: false, width: 300, resizable: false, height: 120, position: [left, top] });
            $(this).ajaxStart(function(r, s) { $.parentLock(); $(".ui-dialog-titlebar").hide(); $("#divloadingAjax").dialog("open"); });
            $(this).ajaxStop(function(r, s) { $(".ui-dialog-titlebar").show(); $("#divloadingAjax").dialog("close"); $.parentUnlock(); });
        });
    };

    $.fn.table$init = function() {
        return this.each(function() {
            var n = $(this).find('table thead tr:last td').length;
            var b = $(this).find('table tbody');
            b.empty();
            b.append('<tr><td colspan="' + n + '" class="nodata"><span>No hay registros</span></td></tr>');
        });
    };

    $.fn.table$clear = function() {
        return this.each(function() {
            $(this).find('table tbody').empty();
        });
    };

    $.fn.table$findInParent = function(c) { return $(this).parent().parent().find(c); };

    $.table$createProxy = function(opt) {
        var def = {
            type: "POST",
            url: "",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: $.uiglobalproxyOk,
            error: $.uiglobalproxyError
        };
        var options = $.extend(def, opt);
        return options;
    };

    $.table$createColumns = function(opt) {
        var def = [];
        var options = $.extend(def, opt);
        return options;
    };

    $.fn.table$addRow = function(a) {
        return this.each(function() {
            var nr = "td-grid-blanco", ar = "td-grid-gris", sr = "selectrow", name = '#' + $(this).attr('name');
            var tb = $(this).find('table tbody');
            var i = $(this).find('table tbody tr').length;
            var c = i % 2 == 0 ? nr : ar; rw = "<tr class='" + c + "'>";
            for (r = 0; r < a.length; r++) { rw = rw + '<td>' + a[r] + '</td>'; }
            rw = rw + '</tr>';
            tb.append(rw);
            tb.table$hover(nr, ar, sr, false);
        });
    };

    $.fn.table$hover = function(r, ar, sr, all) {
        var sel = all ? "tr" : "tr:last";
        return this.each(function() {
            $(this).find(sel).hover(
                function() {
                    if ($(this).hasClass(ar)) $(this).removeClass(ar);
                    $(this).addClass(sr);
                },
                function() {
                    if (!$(this).hasClass(ar) && !$(this).hasClass(r)) $(this).addClass(ar);
                    $(this).removeClass(sr);
                });
        });
    };

    $.fn.table$load = function(opt) {
        var defaults = {
            proxy: {},
            columns: [],
            complete: $.uigloballoadComplete,
            stylerow: "td-grid-blanco",
            altstylerow: "td-grid-gris",
            hotstylerow: "selectrow"
        };
        var options = $.extend(defaults, opt), obj = $(this), objid = '#' + obj.attr('id');

        function replacechar(s, r, v) {
            r = r.replace(s, v);
            if (r.indexOf(s) > -1) r = replacechar(s, r, v);
            return r;
        };

        function successAjax(response) {
            $(objid).table$clear();
            $.each(response, function(index, row) {
                var cells = new Array();
                for (col in options.columns) {
                    var plt = options.columns[col].template, res = "";
                    if (typeof (plt) == "function") res = plt(row); else res = plt;
                    var l = options.columns[col].column.length;
                    for (i = 0; i < l; i++) {
                        res = replacechar('{' + i + '}', res, row[options.columns[col].column[i]]);
                    };
                    cells[cells.length] = res;
                }
                addRow(cells, index);
            });
            options.proxy.success(response);
        };

        function addRow(a, i) {
            var c = i % 2 == 0 ? options.stylerow : options.altstylerow; rw = "<tr class='" + c + "'>";
            for (r = 0; r < a.length; r++) { rw = rw + '<td>' + a[r] + '</td>'; }
            rw = rw + '</tr>';
            var tb = $(objid + ' table tbody');
            tb.append(rw);
            tb.table$hover(options.stylerow,
                       options.altstylerow,
                       options.hotstylerow, false);
        };

        return this.each(function() {
            $.ajax({
                type: options.proxy.type,
                url: options.proxy.url,
                data: options.proxy.data,
                contentType: options.proxy.contentType,
                dataType: options.proxy.dataType,
                success: successAjax,
                error: options.proxy.error,
                complete: options.complete
            });
        });
    };


})(jQuery);
