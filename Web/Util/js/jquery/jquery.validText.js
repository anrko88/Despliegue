/*!
 * jQuery.validText library 
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
 * Date: jueves, 02 de junio de 2011 05:03:42 p.m.
 *
 * Parameters:
 * length     : default 20. 
 *              Maxima longitud para el control input.
 * type       : default           'name'        : Permite caracteres para Nombres
 *              posibles valores: 'number'      : Permite solo numeros
 *                                'alphanumeric': Permite letras y numeros
 *                                'address'     : Permite caracteres para Direcciones
 *                                'comment'     : Permite caracteres para Comentarios
 *                                'custom'      : establece que el filtro se realizará de forma personalizada.
 * customtext : default ''. 
 *              Cadena con los caracteres personalizados a filtrar.
 * addchar    : default ''. 
 *              Permite agregar caracteres a los caracteres predefinidos.
 * isInteger  : convierte el valor a un numérico entero, eliminando los Ceros al inicio.
 */
(function($) {
    $.fn.validText = function(options) {
        var defaults = {
            length: 20,
            type: 'name',
            customtext: '',
            addchar: '',
            isInteger: false
        };
        var options = $.extend(defaults, options);
        var _number = '1234567890', _letter = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZáéíóúÁÉÍÓÚ ',
        _address = '°-_./#s', _comment = '?¡¿!%$()=[]{},;*|@\\&:-_º#/^`+¨´Ç¬', _space = ' ', _date='0123456789/';
        function vnumber(c) { return (_number.indexOf(c) != -1); }
        function vdate(c) { return (_date.indexOf(c) != -1); }		
        function vname(c) { return ((c == _space) || (c == '.') || (_letter.indexOf(c) != -1)); }
        function valphanumeric(c) { return (vnumber(c) || (_letter.indexOf(c) != -1)); }
        function vaddress(c) { return (vname(c) || (_address.indexOf(c) != -1) || vnumber(c)); }
        function vcomment(c) { return (vaddress(c) || (_comment.indexOf(c) != -1)); }
        function vCustom(c) { return (options.customtext.indexOf(c) != -1) }
        function vType(c) {
            var _ok = false;
            switch (options.type) {
                case 'number': _ok = vnumber(c); break;
                case 'name': _ok = vname(c); break;
                case 'alphanumeric': _ok = valphanumeric(c); break;
                case 'address': _ok = vaddress(c); break;
                case 'comment': _ok = vcomment(c); break;
                case 'date': _ok = vdate(c); break;				
            }
            if (options.addchar != '') { _ok = _ok || (options.addchar.indexOf(c) != -1) }
            return _ok;
        }
        return this.each(function() {
            var _o = $(this);
            _o.keypress(function(e) {
                if ($.isCursorKey(e)) return true;
                if (_o.val().length >= options.length) return false;
                var _s = $.keypressChar(e);
                if (options.type == 'custom') return vCustom(_s);
                else return vType(_s);
            });
            _o.focusout(function() { if (options.isInteger) _o.val($.noleadZero(_o.val())); });
        });
    };
})(jQuery);
