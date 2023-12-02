/*!
 * jQuery.validNumber library 
 * for jQuery JavaScript Library v1.6.1
 * http://jquery.com/
 *
 * Copyright 2011, Teamsoft 
 * http://www.teamsoft.com.pe
 *
 * by Juan Azabache
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Date: martes, 31 de mayo de 2011 02:41:17 p.m.
 */
(function($) {
    $.fn.validNumber = function(options) {

        var defaults = {
            length: 15,
            value: "0.00",
            decimals: 2,
            thousandseparator: true,
            negativo: false
        };
        var options = $.extend(defaults, options);
        var _number = '1234567890';
        var _sym = ".";
        var _synneg = "-";
        var strValorAnt = "0.00";
        function _format(n, opt) { var ret = ""; if (n == "-" || n == "") n = "0"; if (opt.decimals > 0) { ret = $.formatDecimal(parseFloat(n).toString(), options.thousandseparator, options.decimals); } else { ret = $.formatNumber(parseInt(n).toString()); } return ret; }
        return this.each(function() {
            var o = $(this), opt = options;
            o.addClass("ui-edit-align-right");
            if (options.value != '') { o.val(_format(options.value, opt)); }

            o.focusout(function() {
                o.val(_format(o.val(), opt));
                
                o.val($.unformatDecimal(o.val()));
				var strValor = o.val();
				var arrTodo = strValor.split(".")
				var strEntero = arrTodo[0]
				var strDecimal = arrTodo[1]
				strEntero = strEntero.substring(0,(options.length - options.decimals - 1))
				strDecimal = strDecimal.substring(0,options.decimals)
				o.val(strEntero+"."+strDecimal);
				
				o.val(_format(o.val(), opt));
				
            });

            o.keyup(function() {            
				var decValorActual = parseFloat(o.val());
                var decValorCompara = parseFloat("1" + fn_util_LPad("", (options.length - options.decimals - 1), "0"));
                if (decValorActual >= decValorCompara) {
                    o.val(strValorAnt);
                }                
            });

            o.keypress(function(e) {
                var _o = $(this), _v = _o.val(), _i = (options.decimals > 0);
                strValorAnt = _o.val();
                if ($.isCursorKey(e)) return true;
                if (_v.length >= options.length) return false;
                var _s = $.keypressChar(e); var _pto = _v.indexOf(_sym); var _neg = _v.indexOf(_synneg);
                if (_number.indexOf(_s) > -1) { if (_i) { if (_pto > -1) { if ($.getSelectionStart(this) <= _pto) return true; else if (_v.substr((_pto + 1)).length >= options.decimals) return false; } } return true; }
                if (_i) { if (_s == _sym) { if (_v == "") _o.val("0"); if (_pto > -1) return false; return true; } }
                if (_i) {
                    if (_s == _synneg) {
                        if (_v == "")
                            _o.val("");
                        if (opt.negativo) {
                            if (_neg > -1) return false;
                            return true;
                        }
                        return false;
                    }
                }

                return false;
            });
            o.focusin(function() { o.val($.unformatDecimal(o.val())); });
        });
    };
})(jQuery);
