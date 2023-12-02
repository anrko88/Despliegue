//****************************************************************
// Funcion		:: 	fn_util_AjaxSyncWM
// Descripción	::	Hace la llamada a WebMethod
// Log			:: 	JRC - 24/04/2012
//****************************************************************
function fn_util_AjaxSyncWM(pstrMetodo, paramArray, successFn, errorFn) {
    //Arma Parametros
    var paramList = '';
    if (paramArray.length > 0) {
        for (var i = 0; i < paramArray.length; i += 2) {
            if (paramList.length > 0) paramList += ',';
            paramList += '"' + paramArray[i] + '":"' + paramArray[i + 1] + '"';
        }
    }
    paramList = '{' + paramList + '}';
    //alert(paramList);
    //Ejecuta Ajax
    $.ajax({
        type: "POST",
        url: pstrMetodo,
        contentType: "application/json; charset=utf-8",
        data: paramList,
        dataType: "json",
        async: false,
        success: successFn,
        error: errorFn
    });
}

//****************************************************************
// Funcion		:: 	fn_util_AjaxWM
// Descripción	::	Hace la llamada a WebMethod
// Log			:: 	JRC - 24/04/2012
//****************************************************************
function fn_util_AjaxWM(pstrMetodo, paramArray, successFn, errorFn) {
    //Arma Parametros
    var paramList = '';
    if (paramArray.length > 0) {
        for (var i = 0; i < paramArray.length; i += 2) {
            if (paramList.length > 0) paramList += ',';
            paramList += '"' + paramArray[i] + '":"' + paramArray[i + 1] + '"';
        }
    }
    paramList = '{' + paramList + '}';
    //alert(paramList);
    //Ejecuta Ajax
    $.ajax({
        type: "POST",
        url: pstrMetodo,
        contentType: "application/json; charset=utf-8",
        data: paramList,
        dataType: "json",
        async: true,
        success: successFn,
        error: errorFn
    });
}


//**********************************************************************
// Nombre: fn_util_getJQGridParam
//**********************************************************************
function fn_util_getJQGridParam(pstrGrid, pstrDato) {
    return $("#" + pstrGrid).getGridParam(pstrDato);
}


//****************************************************************
// Funcion		:: 	fn_ObtenerASHX
// Descripción	::	Hace la llamada al ASHX
// Log			:: 	JRC - 18/04/2012
//****************************************************************
function fn_util_ejecutarASHX(parrParam, pstrPag, pstrNivel) {
    
    var strMensaje = '';
    var strResul = '';
    var strMensajeFinal = '';
    
    var strParam = fn_ArmaParametrosASHX(parrParam);
    strMensaje = $.ajax({
        type: "POST",
        url: pstrNivel + 'WebHandler/' + pstrPag + '.ashx',
        data: strParam,
        datatype: "html",
        async: false,
        success: function(msg) {
            strMensajeFinal = msg;
        },
        error: function(e) {
            alert(e);
        }

    }).responseText;

    var arrMensaje = strMensaje.split('|');
    return arrMensaje;
}


//****************************************************************
// Funcion		::  fn_ArmaParametrosASHX
// Descripción	::  Arma parametros GET
// Log			:: 	JRC - 18/04/2012
//****************************************************************
function fn_ArmaParametrosASHX(pArrParam) {
    var strParam = '';
    if (pArrParam.length > 0) {
        strParam = pArrParam[0] + "=" + pArrParam[1];
        for (var i = 2; i < pArrParam.length; i += 2) {
            strParam += '&' + pArrParam[i] + "=" + pArrParam[i + 1]; ;
        }
    }
    return strParam;
}