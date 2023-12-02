//****************************************************************
// Funcion		:: 	fn_util_desplegar
// Descripción	::	Desplegar un objeto
// Log			:: 	JRC - 26/06/2012
//****************************************************************
function fn_util_desplegar(pstrObjeto, pstrImagenMax, pstrImagenMini) {   
	$("#"+pstrImagenMax).hide();
    $("#"+pstrImagenMini).hide();
    
    if($("#"+pstrObjeto).is(":visible")){
		$("#"+pstrObjeto).hide();		
		$("#"+pstrImagenMax).show();
    }else{
		$("#"+pstrObjeto).show();
		$("#"+pstrImagenMini).show();
    }
    fn_doResize();
}


//****************************************************************
// Funcion		:: 	fn_util_activaInput
// Descripción	::	LPAD
// Log			:: 	JRC - 26/06/2012
//****************************************************************
function fn_util_activaInput(pstrInput, pstrTipo) {    
    if(pstrTipo == 'I'){
		$('#'+pstrInput).attr('class', 'css_select');
		$('#'+pstrInput).prop('readonly', false);    
    }else{
		$('#'+pstrInput).attr('class', 'css_input');
		$('#'+pstrInput).removeAttr('disabled');
    }        
}

//****************************************************************
// Funcion		:: 	fn_util_activaInputDis
// Descripción	::	LPAD
// Log			:: 	JRC - 26/06/2012
//****************************************************************
function fn_util_activaInputDis(pstrInput, pstrTipo) {    
    if(pstrTipo == 'I'){
		$('#'+pstrInput).attr('class', 'css_select');
		$('#'+pstrInput).removeAttr('disabled');
    }else{
		$('#'+pstrInput).attr('class', 'css_input');
		$('#'+pstrInput).removeAttr('disabled');
    }        
}


//****************************************************************
// Funcion		:: 	fn_util_inactivaInput
// Descripción	::	LPAD
// Log			:: 	JRC - 26/06/2012
//****************************************************************
function fn_util_inactivaInput(pstrInput, pstrTipo) {    
    if(pstrTipo == 'I'){
		$('#'+pstrInput).attr('class', 'css_select_inactivo');
		$('#'+pstrInput).prop('readonly', true);    
    }else{
		$('#'+pstrInput).attr('class', 'css_input_inactivo');
		$('#'+pstrInput).attr('disabled', 'disabled');
    }    
}

//****************************************************************
// Funcion		:: 	fn_util_inactivaInput
// Descripción	::	LPAD
// Log			:: 	JRC - 26/06/2012
//****************************************************************
function fn_util_inactivaInputDis(pstrInput, pstrTipo) {    
    if(pstrTipo == 'I'){
		$('#'+pstrInput).attr('class', 'css_select_inactivo');
		$('#'+pstrInput).attr('disabled', 'disabled');
    }else{
		$('#'+pstrInput).attr('class', 'css_input_inactivo');
		$('#'+pstrInput).attr('disabled', 'disabled');
    }    
}


//****************************************************************
// Funcion		:: 	fn_util_LPad
// Descripción	::	LPAD
// Log			:: 	JRC - 26/06/2012
//****************************************************************
function fn_util_LPad(ContentToSize, PadLength, PadChar) {
    var PaddedString = ContentToSize.toString();
    for (i = ContentToSize.length + 1; i <= PadLength; i++) {
        PaddedString = PadChar + PaddedString;
    }
    return PaddedString;
}


//****************************************************************
// Funcion		:: 	fn_util_MailTo
// Descripción	::	Mail to
// Log			:: 	JRC - 26/06/2012
//****************************************************************
function fn_util_MailTo(pstrCorreo, pstrTitulo, pstrBody) {
    mailto_link = "mailto:" + pstrCorreo + "?subject=" + pstrTitulo + "&body=" + pstrBody;
    win = window.open(mailto_link, 'Email_'+Math.floor((Math.random()*100)+1)); 
}
//DEMO
//fn_util_MailTo("demo@demo.com", "Titulo", "Hola Demo, %0A%0A Aca va el texto %0A%0A Atentamente. %0A%0A Demo");


//****************************************************************
// Funcion		:: 	fn_util_bloquearFormulario 
// Descripción	::	Bloquea todo el Formulario
// Log			:: 	JRC - 26/06/2012
//****************************************************************
function fn_util_bloquearFormulario() {
    $('input, select, textarea').attr('disabled', 'disabled');
    $('input').attr('class', 'css_input_inactivo');
    $('select').attr('class', 'css_select_inactivo');
}

//**********************************************************************
// Nombre: fn_util_ReplaceAll
//**********************************************************************
function fn_util_ReplaceAll(strCadena, strToFind, strToReplace) {
    var strTemp = strCadena;
    var index = strTemp.indexOf(strToFind);
    while (index != -1) {
        strTemp = strTemp.replace(strToFind, strToReplace);
        index = strTemp.indexOf(strToFind);
    }
    return strTemp;
}

//**********************************************************************
// Nombre: fn_util_ValidaDecimal
//**********************************************************************
function fn_util_ValidaDecimal(pstrMonto) {
    if (fn_util_trim(pstrMonto) == "") pstrMonto = "0";
    var strNuevoMonto = fn_util_ReplaceAll(pstrMonto,",","");    
    return parseFloat(strNuevoMonto);
}

// IBK RPR
function fn_util_UnformatDecimal(pstrMonto) {
    if (fn_util_trim(pstrMonto) == "") pstrMonto = "0";
    return fn_util_ReplaceAll(pstrMonto, ",", "");
}
// FIN

//**********************************************************************
// Nombre: fn_util_ValidaMonto
//**********************************************************************
function fn_util_ValidaMonto(pstrMonto, pintDecimales) {
    var strMonto = String(pstrMonto);
    if (fn_util_trim(strMonto) == "") strMonto = "0";
    var strMontoRed = fn_util_RedondearDecimales(strMonto, pintDecimales);
    
    $('<input>').attr({
        type: 'hidden',
        id: 'hddUtilMonto',
        name: 'hddUtilMonto'
    }).appendTo('body');

    $("#hddUtilMonto").validNumber({ value: strMontoRed, decimals: pintDecimales });        
    return $("#hddUtilMonto").val();
}

//**********************************************************************
// Nombre: fn_util_RedondearDecimales
//**********************************************************************
function fn_util_RedondearDecimales(cantidad, decimales) {
    var val = parseFloat(cantidad);
    if (isNaN(val)) { return "0.00"; }
    val = (parseFloat(cantidad)).toFixed(decimales)
    return val;
}

 
 

//**********************************************************************
// Nombre: fn_util_SeteaDisabledInput
//**********************************************************************
function fn_util_SeteaDisabledInput(pstrObjeto) {
    $("#" + pstrObjeto).attr('disabled', 'disabled');
}


//**********************************************************************
// Nombre: fn_util_SeteaComboServidor
//**********************************************************************
function fn_util_SeteaComboServidor(pstrCombo, pstrValor) {
    $("#" + pstrCombo).val(pstrValor);
}


//**********************************************************************
// Nombre: fn_util_MuestraLogPage
//**********************************************************************
function fn_util_MuestraLogPage(pstrMensaje, pstrTipo) {
    var dv_Log = "dv_LogAviso";
    if (pstrTipo == "E") {
        dv_Log = "dv_LogError";
    }
    $("#" + dv_Log + "_Msg").html(pstrMensaje);
    $("#" + dv_Log).fadeIn('slow', function() {
        $("#" + dv_Log).delay(5000).fadeOut("slow");
    });
}

//**********************************************************************
// Nombre: fn_util_MuestraMensaje
//**********************************************************************
function fn_util_MuestraMensaje(pstrMensaje, pstrTipo, pintHeight) {
    var dv_Log = "dv_LogAviso";
    if (pstrTipo == "E") {
        dv_Log = "dv_LogError";
    }
    $("#" + dv_Log + "_Msg").html(pstrMensaje);
    $("#" + dv_Log).height(pintHeight);
    $("#" + dv_Log).fadeIn('slow', function() {
        $("#" + dv_Log).delay(6000).fadeOut("slow");
    });
}


//**********************************************************************
// Nombre: fn_util_muestraOculta
//**********************************************************************
function fn_util_muestraOculta(pstrObj, pstrTipo) {
    if (pstrTipo == "S") {
        $("#" + pstrObj).show();
    }
    else {
        $("#" + pstrObj).hide();
    }
}


//**********************************************************************
// Nombre: fn_util_realizaCheck
//**********************************************************************
function fn_util_realizaCheck(pstrCheckBox, pstrHidden) {
    if ($('#' + pstrCheckBox).is(':checked')) {
        $("#" + pstrHidden).val("1");
    }
    else {
        $("#" + pstrHidden).val("0");
    }
}

//**********************************************************************
// Nombre: fn_util_SeteaCalendario
//**********************************************************************
function fn_util_SeteaCalendario(pControlTxt) {
    if ((pControlTxt != null) && ($(pControlTxt).attr("type") == 'text')) {
        pControlTxt.className = '';
        $(pControlTxt).datepicker({ 
                                    selectOtherMonths: true, 
                                    changeYear: true, 
                                    changeMonth: true,  
                                    onSelect: function(dateText, inst) { 
                                        if($(this).hasClass("css_calendario_error") == true){
                                            $(this).removeClass('css_calendario_error'); 
                                            $(this).addClass("css_calendario_obligatorio");	
                                        }else{
                                            $(this).addClass('css_calendario'); 
                                        }                                        
                                    } 
                                  });
        $(pControlTxt).addClass('css_calendario');

		//Valida Fecha correcta
		$(pControlTxt).bind('keyup', function() {
			$(this).val(fn_util_ValidaFecha(this));									 
		});
		
    }
}


//**********************************************************************
// Nombre: fn_util_SeteaCalendario
//**********************************************************************
function fn_util_SeteaCalendarioFunction(pControlTxt, pFunction) {
    if ((pControlTxt != null) && ($(pControlTxt).attr("type") == 'text')) {
        pControlTxt.className = '';
        $(pControlTxt).datepicker({
            selectOtherMonths: true,
            changeYear: true,
            changeMonth: true,
            onSelect: function(dateText, inst) {
                if ($(this).hasClass("css_calendario_error") == true) {
                    $(this).removeClass('css_calendario_error');
                    $(this).addClass("css_calendario_obligatorio");
                } else {
                    $(this).addClass('css_calendario');
                }
                pFunction();
            }
        });
        $(pControlTxt).addClass('css_calendario');

        //Valida Fecha correcta
        $(pControlTxt).bind('keyup', function() {
            $(this).val(fn_util_ValidaFecha(this));
        });

    }
}



//**********************************************************************
// Nombre: fn_util_SeteaObligatorio
//**********************************************************************
function fn_util_SeteaObligatorio(pObjControl, pStrEstilo) {	

	var strEstiloInputObligatorio = "";
	var strEstiloInputError = "";	

	//Valida tipo estilo
	if(fn_util_trim(pStrEstilo) == "input"){
		strEstiloInputObligatorio = "css_input_obligatorio";
		strEstiloInputError = "css_input_error";		
	}else if(fn_util_trim(pStrEstilo) == "select"){
		strEstiloInputObligatorio = "css_select_obligatorio";
		strEstiloInputError = "css_select_error";		
	}else if(fn_util_trim(pStrEstilo) == "calendar"){
		strEstiloInputObligatorio = "css_calendario_obligatorio";
		strEstiloInputError = "css_calendario_error";	
	}else{
		strEstiloInputObligatorio = "css_input_obligatorio";
		strEstiloInputError = "css_input_error";				
	}

	if (pObjControl != null) {	
		if($(pObjControl).hasClass(strEstiloInputError) == false){
			$(pObjControl).addClass(strEstiloInputObligatorio);	
		}		
	}
	//Valida onBlur del Objeto
	$(pObjControl).unbind('blur');
	$(pObjControl).bind('blur', function() {		
		if(fn_util_trim($(pObjControl).val()) != ""){
			$(pObjControl).removeClass(strEstiloInputError);	
			$(pObjControl).addClass(strEstiloInputObligatorio);	
		}		
	});	
}


//**********************************************************************
// Nombre: fn_util_ValidateControl
//**********************************************************************
function fn_util_ValidateControl(pControl, pMensaje, pTipoSalto, pTextoAdicional) {
    var strMensaje = '';
    var strSaltoLinea = '';
    var strEspacio = '';
    if (pTipoSalto == 1) {
        strSaltoLinea = '<br />';
        strEspacio = '&nbsp;&nbsp;';
    }
    else { strSaltoLinea = '\n'; }

    if (pControl.type == 'select-one') {
        if (pControl.selectedIndex == 0) {
            strMensaje = strMensaje + '- Seleccione ';
            pControl.className = 'css_select_error';
        }
        else { pControl.className = ''; }
    }
    
    else if (pControl.type == 'file') {
        if (fn_util_trim(pControl.value) == '') {
            strMensaje = strMensaje + '- Seleccione ';
            pControl.className = 'css_input_error';
        }
        else {
            if (pControl.readOnly) {
                pControl.className = 'css_input_inactivo';
            } else {
                pControl.className = '';
            }
        }
    }

    else if ((pControl.type == 'text') || (pControl.type == 'password') || (pControl.type == 'textarea') || (pControl.type == 'hidden')) {
        if (fn_util_trim(pControl.value) == '') {
            strMensaje = strMensaje + '- Ingrese ';
            pControl.className = 'css_input_error';
        }
        else if ((fn_util_trim(pControl.value) == '0') || (fn_util_trim(pControl.value) == '0.00')) {
            if (parseInt(pControl.value) == 0) {
                strMensaje = strMensaje + '- Ingrese ';
                pControl.className = 'css_input_error';
            }
        }
        else {
            if (pControl.readOnly) {
                pControl.className = 'css_input_inactivo';
            } else {
                pControl.className = '';
            }
        }
    }

    if (strMensaje != '') { strMensaje = strEspacio + pTextoAdicional + strMensaje + pMensaje + strSaltoLinea; }
    return strMensaje;
};




//**********************************************************************
//Nombre: fn_util_redirect()
//**********************************************************************
function fn_util_redirect(strUrl){
	try{
		parent.fn_blockUI();
	}catch(e){}
	
	//var strWindowPathName = window.location.pathname;	
	//var arrResultado = strWindowPathName.split("/");	
	//alert(arrResultado[1]);
	//alert(arrResultado[2]);
	//var strRealPath = "/"+arrResultado[1]+"/"+arrResultado[2]+"/"+strUrl;
	//alert(strRealPath);		
	//window.location=strRealPath;
	
	//$(location).attr('href',strUrl); 
	//$(window).attr('location',strUrl);
	
	window.location=strUrl;
	
}


//**********************************************************************
//Nombre: fn_util_redirect()
//**********************************************************************
function fn_util_globalRedirect(strUrl){
	//		parent.fn_blockUI();
//	}catch(e){}	
//	var strWindowPathName = window.location.pathname;	
//	var arrResultado = strWindowPathName.split("/");	
//	var strRealPath = "/"+arrResultado[1]+strUrl;
    //	window.location=strRealPath;

    try {
        parent.fn_blockUI();
    } catch (e) { }
    var strWindowPathName = window.location.pathname;
    var arrResultado = strWindowPathName.split("/");
    var strRealPath;
    var arrUrl = strUrl.split("/");
    if (arrResultado[1] == arrUrl[1]) {
        strRealPath = strUrl;
    }
    else {
        strRealPath = "/" + arrResultado[1] + strUrl;
    }

    window.location = strRealPath;

}


//**********************************************************************
//Nombre: fn_menuLink()
//**********************************************************************
function fn_util_menuLink(strUrl){    
	fn_blockUI();
	$('#ifrm_contenedor').attr('src', strUrl);
	fn_doResize();
	
}

//**********************************************************************
//Nombre: fn_util_cargaLinkModal()
//**********************************************************************
function fn_util_cargaLinkModal(strUrl){    
	fn_blockUI();
	fn_util_CierraModal();
	$('#ifrm_contenedor').attr('src', strUrl);
}


//**********************************************************************
//Nombre: fn_setContenedorHeight
//**********************************************************************
function fn_util_setContenedorHeight(strIframe){	
	theFrame = $(strIframe, parent.document.body);
	windowHeight = $(window).height();
	theFrame.height(windowHeight-97);	
}

function fn_util_setDivContenedorHeight(strDiv){	
	windowHeight = $(window).height();
	$("#"+strDiv).height(windowHeight-75);
	try{
	$('.css_scrollPane').jScrollPane();
	}catch(e){}
}


//**********************************************************************
//Nombre: fn_setContenedorHeightLight
//**********************************************************************
function fn_util_setContenedorHeightLight(strIframe){	
	var theFrame = $(strIframe, parent.document.body);		
	var newSize = $(document.body).height() + 30;	
	if(newSize < 200) newSize = 200;
	theFrame.height(newSize);
}


//**********************************************************************
//Nombre: Jquery BLOCK UI
//**********************************************************************
function fn_unBlockUI(){
	try{
		$.unblockUI();
    } catch (e) { }
    try {
        document.getElementById("dv_cargando").style.display = "none";
    } catch (e) { }
	
}
function fn_blockUI(){
	try{
		$.blockUI({ 
					message: $('#dv_cargando'), 
					overlayCSS: { backgroundColor: '#CCCCCC' },
					css: { 
						border: '1px solid #666666', 
						padding: '0px', 
						backgroundColor: '#ffffff', 
						'-webkit-border-radius': '10px', 
						'-moz-border-radius': '10px', 
						opacity: .8, 
						color: '#333333', 
						width: '110px',
						top:  ($(window).height() - 110) /2 + 'px', 
						left: ($(window).width() - 110) /2 + 'px'
					}
		}); 
	}catch(e){}
}


//**********************************************************************
// Nombre: fn_util_MaxLength
//**********************************************************************
function fn_util_MaxLength(pThis, pMaxLong) {
    var int_value, out_value;
    if (pThis.value.length > pMaxLong) {
        in_value = pThis.value;
        out_value = in_value.substring(0, pMaxLong);
        pThis.value = out_value;
        fn_mdl_alert('<br /><br />' + 'La longitud m&aacute;xima es de ' + pMaxLong + ' caract&eacute;res', function () {
            pThis.className = 'input_error';
            pThis.focus();
        });
    } else { pThis.className = ''; }
};


//**********************************************************************
// Nombre: fn_util_ValidaFecha
//**********************************************************************
var primerslap = false;
var segundoslap = false;
function fn_util_ValidaFecha(pfecha) {
    var fecha = pfecha.value;
    if (fecha != '') {
        var ilong = fecha.length;
        var dia;
        var mes;
        var ano;
        
        if ((ilong >= 2) && (primerslap == false)) {
            dia = fecha.substr(0, 2);
            if ((fn_util_IsNumeric(dia) == true) && (dia <= 31) && (dia != "00")) { fecha = fecha.substr(0, 2) + "/" + fecha.substr(3, 7); primerslap = true; }
            else { fecha = ""; primerslap = false; }
        }
        else {
            dia = fecha.substr(0, 1);
            if (fn_util_IsNumeric(dia) == false)
            { fecha = ""; }
            if ((ilong <= 2) && (primerslap = true)) { fecha = fecha.substr(0, 1); primerslap = false; }
        }
        if ((ilong >= 5) && (segundoslap == false)) {
            mes = fecha.substr(3, 2);
            if ((fn_util_IsNumeric(mes) == true) && (mes <= 12) && (mes != "00")) { fecha = fecha.substr(0, 5) + "/" + fecha.substr(6, 4); segundoslap = true; }
            else { fecha = fecha.substr(0, 3); ; segundoslap = false; }
        }
        else { if ((ilong <= 5) && (segundoslap = true)) { fecha = fecha.substr(0, 4); segundoslap = false; } }

        if (ilong >= 7) {
            ano = fecha.substr(6, 4);
            if (fn_util_IsNumeric(ano) == false) { fecha = fecha.substr(0, 6); }
            else { if (ilong == 10) { if ((ano == 0) || (ano < 1900) || (ano > 2100)) { fecha = fecha.substr(0, 6); } } }
        }

        if (ilong >= 10) {            
            fecha = fecha.substr(0, 10);
            dia = fecha.substr(0, 2);
            mes = fecha.substr(3, 2);
            ano = fecha.substr(6, 4);
            // Año no viciesto y es febrero y el dia es mayor a 28 
            if ((ano % 4 != 0) && (mes == 02) && (dia > 28)) { fecha = fecha.substr(0, 2) + "/"; }
        }
    }
	
	primerslap = false;
	segundoslap = false;

    return (fecha);
}


//**********************************************************************
// Nombre: fn_util_CheckAll
//**********************************************************************
function fn_util_CheckAll(pThis, pIdTable, pClassCss) {
    var ocheckboxs = $('table#' + pIdTable + ' tbody').find("input[id*=chk]:checkbox");
    if (pThis.checked) {
        ocheckboxs.map(function (index) {
            $(this).attr("checked", "checked");
            $(this).parent().parent().addClass(pClassCss);

        });
    } else {
        ocheckboxs.map(function (index) {
            $(this).removeAttr("checked");
            $(this).parent().parent().removeClass(pClassCss);
        });
    }
    delete (ocheckboxs);
    ocheckboxs = null;
};


//**********************************************************************
// Nombre: fn_util_RefreshSession
//**********************************************************************
function fn_util_RefreshSession(pUrl) {
    var head = document.getElementsByTagName('head').item(0);
    script = document.createElement('script');
    script.src = pUrl;
    script.setAttribute('type', 'text/javascript');
    script.defer = true;
    head.appendChild(script);
};


//**********************************************************************
// Nombre: fn_util_SelectTR
//**********************************************************************
function fn_util_SelectTR(pThis, pOption) {
    if (pThis != null) {
        var Tr = $(pThis).parent().parent();
        if (pOption == 'S') {
            if (!(pThis.id.indexOf('btn') > -1)) Tr.addClass("selectTR");
        } else {
            if (!(pThis.id.indexOf('btn') > -1)) Tr.removeClass("selectTR");
        }
        delete (Tr); Tr = null;
    }
};


//**********************************************************************
// Nombre: fn_util_Right
//**********************************************************************
function fn_util_Right(str, n) {
    if (n <= 0)
        return '';
    else if (n > String(str).length)
        return str;
    else {
        var iLen = String(str).length;
        return String(str).substring(iLen, iLen - n);
    }
};


//**********************************************************************
// Nombre: fn_util_Left
//**********************************************************************
function fn_util_Left(str, n) {
    if (n <= 0)
        return '';
    else if (n > String(str).length)
        return str;
    else
        return String(str).substring(0, n);
};


//**********************************************************************
// Nombre: fn_util_trim
//**********************************************************************
function fn_util_trim(string) {
    if (string.length > 0) {
        string = $.trim(string);
    } else {
        string = '';
    }
    return string;
};


//**********************************************************************
// Nombre: fn_util_RedondearDecimales
//**********************************************************************
function fn_util_RedondearDecimales(cantidad, decimales) {
    var val = parseFloat(cantidad);
    if (isNaN(val)) { return "0.00"; }
    val = (parseFloat(cantidad)).toFixed(decimales);
    return val;

};


//**********************************************************************
// Nombre: fn_util_RedondearDecimalesComas
//**********************************************************************
function fn_util_RedondearDecimalesComas(cantidad, decimales) {
    var val = parseFloat(cantidad);
    if (isNaN(val)) { return "0.00"; }
    val = fn_util_AddCommas((parseFloat(cantidad)).toFixed(decimales));
    return val;

};

//**********************************************************************
// Nombre: fn_util_SoloNumerosEntero
//**********************************************************************
function fn_util_SoloNumerosEntero(evt) {
    if (window.event) {
        keynum = evt.keyCode;
    }
    else {
        keynum = evt.which;
    }
    if (keynum > 47 && keynum < 58) {
        return true;
    } else {
        return false;
    }
};


//**********************************************************************
// Nombre: fn_util_SoloNumeros
//**********************************************************************
function fn_util_SoloNumeros(e) {
    var rptBol = false;
    if (window.event) {
        keynum = window.event.keyCode;
    }
    else if (window.event) {
        keynum = e.keyCode;
    }
    else {
        keynum = e.which;
    }
	alert(keynum);
    if ((keynum > 47 && keynum < 58) || keynum==8) {
        rptBol = true;
    } else {
        rptBol = false;
    }
    return rptBol;
}


//**********************************************************************
// Nombre: fn_util_SoloNumerosDecimales
//**********************************************************************
function fn_util_SoloNumerosDecimales(e) {
    var rptBol = false;
    if (window.event) {
        keynum = window.event.keyCode;
    }
    else if (window.event) {
        keynum = e.keyCode;
    }
    else {
        keynum = e.which;
    }
	//alert(keynum);
    if ((keynum > 47 && keynum < 58) || keynum==8 || keynum==46) {
        rptBol = true;
    } else {
        rptBol = false;
    }
    return rptBol;
}


//**********************************************************************
// Nombre: fn_util_ValidateEmail
//**********************************************************************
function fn_util_ValidateEmail(Email) {
    //re = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;
    re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!re.test(Email)) {
        return false;
    } else {
        return true;
    }
};


//**********************************************************************
// Nombre: fn_util_ValidatePassword
//**********************************************************************
function fn_util_ValidatePassword(Password) {
    re = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,})$/;
    if (!re.exec(Password)) {
        return false;
    } else {
        return true;
    }
}


//**********************************************************************
// Nombre: fn_util_ValidateEmailPuntoComas
//**********************************************************************
function fn_util_ValidateEmailPuntoComas(Emails) {
    var oResult = false;
    if (fn_util_trim(Emails) == '') { return oResult; }
    if (Emails.indexOf(';') > 0) {        
        var oEmails = Emails.split(';');
        for (var i = 0; i < oEmails.length; i++) {
            oResult = fn_util_ValidateEmail(oEmails[i]);
            if (!oResult) { break; }
        }
    } else {
        oResult = fn_util_ValidateEmail(Emails);
    }
    return oResult;
};


//**********************************************************************
// Nombre: fn_util_ValidateTextoNumero
//**********************************************************************
function fn_util_ValidateTexto(e) {
    var rptBol = false;
    if (window.event) {
        keynum = window.event.keyCode;
    }
    else if (window.event) {
        keynum = e.keyCode;
    }
    else {
        keynum = e.which;
    }
	//alert(keynum);
    if ((keynum > 47 && keynum < 58) || keynum==8 || keynum==46) {
        rptBol = true;
    } else {
        rptBol = false;
    }
    return rptBol;
};


//**********************************************************************
// Nombre: fn_util_ValidateTextoNumero
//**********************************************************************
function fn_util_ValidateTextoNumero(Texto, Minimo) {
    if (Minimo) {
        re = /^([a-zA-Z0-9]{6,})+$/;
    } else {
        re = /^([a-zA-Z0-9])+$/;
    }
    if (!re.exec(Texto)) {
        return false;
    } else {
        return true;
    }
};


//**********************************************************************
// Nombre: fn_util_ValidateTextoNumeroComa
//**********************************************************************
function fn_util_ValidateTextoNumeroComa(Texto) {
    re = /^[a-zA-Z0-9]+([;][a-zA-Z0-9]+)*$/;
    if (!re.exec(Texto)) {
        return false;
    } else {
        return true;
    }
};


//**********************************************************************
// Nombre: fn_util_ValidatePhone
//**********************************************************************
function fn_util_ValidatePhone(Phone) {
    re = /^[0-9]{2,3}-? ?[0-9]{6,7}$/;
    if (!re.exec(Phone)) {
        return false;
    } else {
        return true;
    }
}


//**********************************************************************
// Nombre: fn_util_IsNumeric
//**********************************************************************
function fn_util_IsNumeric(valor) {
    var log = valor.length; var sw = 'S';
    for (x = 0; x < log; x++) {
        v1 = valor.substr(x, 1);
        v2 = parseInt(v1);
        if (isNaN(v2)) { sw = 'N'; break; }
    }
    if (sw == "S") { return true; } else { return false; }
}


//**********************************************************************
// Nombre: fn_util_VerificarDecimal
//**********************************************************************
function fn_util_VerificarDecimal(pThis, pTexto) {
    permitidos = /[^0-9.,]/;
    if (permitidos.test(pThis.value)) {
        fShowAlert('<br /><br />' + 'El campo <strong>' + pTexto + '</strong> solo acepta numeros', function () {
            pThis.className = 'css_input_error';
            pThis.focus();
        });
    } else { pThis.className = ''; }
};


//**********************************************************************
// Nombre: fn_util_VerificarEntero
//**********************************************************************
function fn_util_VerificarEntero(pThis, pTexto, pRemoveClass) {
    permitidos = /[^0-9]/;
    if (permitidos.test(pThis.value)) {
        fShowAlert('<br /><br />' + 'El campo <strong>' + pTexto + '</strong> solo acepta numeros', function () {
            pThis.className = 'input_error';
            pThis.focus();
        });
    } else {
        if ((pRemoveClass != null) && pRemoveClass == true) {
            pThis.className = '';
        }
    }
};


//**********************************************************************
// Nombre: fn_util_ValidarIngreso
//**********************************************************************
function fn_util_ValidarIngreso(CaracteresPermitidos) {
    var key = String.fromCharCode(window.event.keyCode);
    var valid = new String(CaracteresPermitidos);
    var ok = "no";
    for (var i = 0; i < valid.length; i++) {
        if (key == valid.substring(i, i + 1))
            ok = "yes";
    }
    if (ok == "no")
        window.event.keyCode = 0;
};


//**********************************************************************
// Nombre: fn_util_FormatoDecimal
//**********************************************************************
function fn_util_FormatoDecimal(vDecimal) {
    if (vDecimal.value.length == 0) return false;
    vDecimal.value = fn_util_RedondearDecimales(vDecimal.value, 2);

    var nPos = vDecimal.value.indexOf('.');

    if (nPos != -1) {
        var vDec = vDecimal.value.substr(nPos + 1, vDecimal.value.length - nPos);
        switch (vDec.length) {
            case 0:
                vDecimal.value = vDecimal.value + '00';
                break;
            case 1:
                vDecimal.value = vDecimal.value + '0';
                break;
        }
    }
    else {
        vDecimal.value = vDecimal.value + '.00';
    }

};

//**********************************************************************
// Nombre: fn_util_AddCommas
//**********************************************************************
function fn_util_AddCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

//**********************************************************************
// Nombre: fn_util_ReplaceAll
//**********************************************************************
function fn_util_ReplaceAll(text, busca, reemplaza) {
    while (text.toString().indexOf(busca) != -1)
        text = text.toString().replace(busca, reemplaza);
    return text;
}

//**********************************************************************
// Nombre: fn_util_ConvertNumeric
//**********************************************************************
function fn_util_ConvertNumeric(pValor) {    
    var strValor = '';
    var decValor = 0;
    if (pValor == '') { pValor = '0'; }

    if (pValor.indexOf('S') > -1) {
        strValor = fn_util_ReplaceAll(trim(pValor.substring(3, pValor.length)), ',', '');
    }
    else {
        strValor = fn_util_ReplaceAll(pValor, ',', '');
    }
    decValor = parseFloat(strValor);
    return decValor;
}
//**********************************************************************
// Nombre: fn_util_pressEnter
//**********************************************************************
function fn_utilPpressEnter(e, funcion) {
	var tecla;
	if (navigator.appName.indexOf("Netscape") != -1) {
		tecla = e.keyCode;
	} else {
		tecla = event.keyCode;
	}
	var key = String.fromCharCode(tecla);
	if (tecla == 13) {
		eval(funcion);
	}
}
	

//**********************************************************************
// Nombre: fn_util_IsEnterTab
//**********************************************************************
function fn_util_IsEnterTab(nextTab) {
	
	if (window.event) {
        keynum = window.event.keyCode;
    }
    else if (window.event) {
        keynum = e.keyCode;
    }
    else {
        keynum = e.which;
    }
	
	if (keynum == 13) {
		if (null != document.all[nextTab]) {
			document.all[nextTab].focus();
		}
	}
}



//**********************************************************************
//**********************************************************************
// Nombre: Funciones Prototype
//**********************************************************************
//**********************************************************************
var StringBuilderEx = Array;
Array.prototype.append = Array.prototype.push;
Array.prototype.appendFormat = function (pattern) {
    var args = this._convertToArray(arguments).slice(1);
    this[this.length] = pattern.replace(/\{(\d+)\}/g,
        function (pattern, index) {
            return args[index].toString();
        });
};

Array.prototype.appendFormatEx = function (pattern) {
    if (this._parameters == null) {
        this._parameters = new Array();
    }
    var args = this._convertToArray(arguments).slice(1);

    for (var t = 0, len = args.length; t < len; t++) {
        this._parameters[this._parameters.length] = args[t];
    }

    this[this.length] = pattern;
};

Array.prototype._convertToArray = function (arguments) {
    if (!arguments) {
        return new Array();
    }
    if (arguments.toArray) {
        return arguments.toArray();
    }
    var len = arguments.length;
    var results = new Array(len);

    while (len--) {
        results[len] = arguments[len];
    }

    return results;
};

Array.prototype.toString = function () {
    var hasParameters = this._parameters != null;
    hasParameters = hasParameters && this._parameters.length > 0;

    if (hasParameters) {
        var values = this.join("").split('?');
        var tempBuffer = new Array();

        for (var t = 0, len = values.length; t < len; t++) {
            tempBuffer[tempBuffer.length] = values[t];
            tempBuffer[tempBuffer.length] = this._parameters[t];
        }

        return tempBuffer.join("");
    }
    else {
        return this.join("");
    }
};

function IsNullOrEmpty(dato) {
    try {
        if (dato === null || dato === "" || dato === undefined || dato === nothing) {
            return true;
        } else {
            return false;
        }
    }catch(ex) {
        return false;
    }
}

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt /*, from*/) {
        var len = this.length >>> 0;

        var from = Number(arguments[1]) || 0;
        from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
        if (from < 0)
            from += len;

        for (; from < len; from++) {
            if (from in this &&
          this[from] === elt)
                return from;
        }
        return -1;
    };
}

function fn_cargaComboProvincia(provincia, distrito, valor) {

    var arrParametros = ["pstrDepartamento", valor, "pstrOp", "2"];
    var arrResultado = fn_util_ejecutarASHX(arrParametros, 'whUtil', '../');

    if (arrResultado.length > 0) {
        if (arrResultado[0] == "0") {
            $(provincia).html(arrResultado[1]);
        } else {
            var strError = arrResultado[1];
            fn_mdl_alert(strError.toString(), function() { });
        }
    }

    fn_LimpiaComboDistritOProvincia(distrito);
}

//*************** UBIGEO DATOS NOTARIALES ************************************//
function fn_LimpiaComboDistritOProvincia(distrito) {
    $(distrito).empty();
    $(distrito).html("<option value='0'>[-Seleccione-]</option>");
}

function fn_cargaComboDistrito(distrito, strCodigoDepartamento, strCodigoProvincia) {
    var arrParametros = ["pstrProvincia", strCodigoProvincia, "pstrDepartamento", strCodigoDepartamento, "pstrOp", "3"];
    var arrResultado = fn_util_ejecutarASHX(arrParametros, 'whUtil', '../');

    if (arrResultado.length > 0) {
        if (arrResultado[0] == "0") {
            $(distrito).html(arrResultado[1]);
        } else {
            var strError = arrResultado[1];

            fn_mdl_alert(strError.toString(), function() { });
        }
    }
}

//************************************************************
// Función		:: 	fn_startsWith
// Descripcion 	:: 	Indica si la cadena data empieza con la subcadena input.
// Log			:: 	EBL - 10/02/2012
//************************************************************
/*function fn_startsWith(data, input) {
    return data.substring(0, input.length) === input;
}


var utfChars = {
    'ž': '%9E',
    'Ÿ': '%9F',
    'À': '%C0',
    'Á': '%C1',
    'Â': '%C2',
    'Ã': '%C3',
    'Ä': '%C4',
    'Å': '%C5',
    'Æ': '%C6',
    'È': '%C8',
    'É': '%C9',
    'Ê': '%CA',
    'Ë': '%CB',
    'Ì': '%CC',
    'Í': '%CD',
    'Î': '%CE',
    'Ï': '%CF',
    'Ñ': '%D1',
    'Ò': '%D2',
    'Ó': '%D3',
    'Ô': '%D4',
    'Õ': '%D5',
    'Ö': '%D6',
    'Ù': '%D9',
    'Ú': '%DA',
    'Û': '%DB',
    'Ü': '%DC',
    'Ý': '%DD',
    'à': '%E0',
    'á': '%E1',
    'â': '%E2',
    'ã': '%E3',
    'ä': '%E4',
    'å': '%E5',
    'è': '%E8',
    'é': '%E9',
    'ê': '%EA',
    'ë': '%EB',
    'ì': '%EC',
    'í': '%ED',
    'î': '%EE',
    'ï': '%EF',
    'ñ': '%F1',
    'ò': '%F2',
    'ó': '%F3',
    'ô': '%F4',
    'õ': '%F5',
    'ö': '%F6',
    'ù': '%F9',
    'ú': '%FA',
    'û': '%FB',
    'ü': '%FC',
    'ý': '%FD',
    'ÿ': '%FF'
};*/

//****************************************************************
// Función		:: 	fn_utf8
// Descripción	::	Transforma un caracter unicode en su respectivo caracter utf-8.
// Log			:: 	EBL - 06/03/2012
//****************************************************************
function fn_util_utf8Chars(text) {
    for (var c in utfChars) {
        while (text.indexOf(c) != -1) {
            text = text.replace(c, utfChars[c]);
        }
    }

    return text;
}