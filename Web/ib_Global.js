//**********************************************************************
// Nombre: Fn_Cerrar_Modal
// Funcion: Cerrar 	Modal
//**********************************************************************
function fn_Cerrar_Modal() {
    $("#dv_ModalFrame2").dialog('close');
    fn_Actualizar();
}
//**********************************************************************
// fn_Ruta
//**********************************************************************
function fn_Ruta(sRuta) 
{
    //sessvars.Ruta = sRuta; //Variable De Session
    //document.getElementById('txt_Ruta').value = sRuta;
    //var sRutaC = document.getElementById('txt_Ruta').value;// = sRuta;
    fn_WriteCookie('sRuta', sRuta, 3);           
    parent.fn_Cerrar_Modal(); //Cerrar el Modal Popup
}
//**********************************************************************
// fn_Popup
//**********************************************************************
function fn_Popup(sUrl, nWidth, nHeight, sTitulo) {
    $('#btn_ExaminarFO').click(function() {
        fn_Modal(sUrl, nWidth, nHeight, sTitulo + " - ORIGEN");        
        sessvars.nIndFO = 1;
        sessvars.nIndFD = 0;
    });
    $('#btn_ExaminarFD').click(function() {
        fn_Modal(sUrl, nWidth, nHeight, sTitulo + " - DESTNO");
        sessvars.nIndFD = 1;
        sessvars.nIndFO = 0;
    });
}
//**********************************************************************
// Modal
//**********************************************************************	
function fn_Modal(url, width, height, titulo) {
    $("body").append("<div id='dv_ModalFrame2'></div>");    
    var strHtml = '<center><iframe src="' + url + '" width="' + width + 'px" height="' + height + 'px" frameborder="0" scrolling="auto"></iframe></center>';
    $("#dv_ModalFrame2").html(strHtml);
    $("#dv_ModalFrame2").dialog({
        modal: true
        , title: titulo
        , resizable: false
	    , beforeClose: function(event, ui) {
	        //pFuncion();
	        //$(this).remove();
	        //parent.fn_util_CierraModal2();
	    }
		, width: (width + 30)
    });
}
//**********************************************************************
// fn_ModalPopup
//**********************************************************************
function fn_ModalPopupO() {
    //$('#btn_ExaminarFO').click(function() {
        fn_Modal("Frm_VisorDirectorio.aspx", 500, 300, "SELECCIONE CARPETA - ORIGEN");
        sessvars.nIndFO = 1;
        sessvars.nIndFD = 0;
   // });
}
function fn_ModalPopupD() {  
   // $('#btn_ExaminarFD').click(function() {
        fn_Modal("Frm_VisorDirectorio.aspx", 500, 300, "SELECCIONE CARPETA - DESTNO");
        sessvars.nIndFD = 1;
        sessvars.nIndFO = 0;
   // });
}
//**********************************************************************
// Nombre: Fn_ActualizarGrilla
// Funcion: Actualizar Grilla con Data
//**********************************************************************
function fn_ActualizarGrilla() {
    $("#jqGrid_lista_A").jqGrid('setGridParam', {}).trigger('reloadGrid');
}
function fn_Actualizar() {
    $("#jqGrid_lista_A").jqGrid('setGridParam', {}).trigger('reloadGrid');
    fn_MostrarRuta();
}

function fn_WriteCookie(name,value,days) {
    var date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires=" + date.toGMTString();
            }else{
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function fn_ReadCookie(name) {
    var i, c, ca, nameEQ = name + "=";
    ca = document.cookie.split(';');
    for(i=0;i < ca.length;i++) {
        c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return '';
}

function fn_AddItemLoad(sEstaciones) 
{
    try {
        var asEstaciones = sEstaciones.split("|");
        var olst_Estaciones = document.getElementById("lst_Estaciones");        
        for (var r = 0; r < asEstaciones.length; r++)            
            olst_Estaciones.options.add(new Option(asEstaciones[r], asEstaciones[r]));            
    }
    catch (e) { alert("fn_AddItemLoad"); }
}

function fn_AddItem() 
{
    try {
        var olst_Estaciones = document.getElementById("lst_Estaciones");
        $('#btn_addEstacion').click(function() {
            var otxt_Estacion = document.getElementById('txt_Estacion').value;
            if (otxt_Estacion != "")
                olst_Estaciones.options.add(new Option(otxt_Estacion, otxt_Estacion));
        }); //Si hacemos click sobre el botón con identificador #del
        //Borramos la opción seleccionada, PODEMOS SELECCIONAR VARIAS
        $('#btn_DeleteEstacion').click(function() {
            $("#lst_Estaciones option:selected").remove();
        });
    } catch (e) { alert("fn_AddItem"); }
}

function fn_RemoveItem(sEstacion) {    
    $("#lst_Estaciones option[value='" + sEstacion + "']").remove();
}

function fn_Grabar_() {
    __doPostBack("function_fn_Grabar", ""); 
//    document.getElementById('btnAceptar').click();
  //  window.close();
}
function fn_Grabar() {
    PageMethods.fn_Grabar();      
/*
    $.ajax({
        type: 'POST', //Tipo de peticiòn
        url: 'Frm_Despliegue.aspx/fn_Grabar', // Url y metodo que se invoca
        data: '{ }', //Necesario cuando queremos mandar algun parametro
        contentType: 'application/json; charset=utf-8',
       // dataType: 'json', //Tipo de dato con el que se realiza la llamada
        dataType: "json"       
        //success: function(msg) { //Procesar el valor del método invocado 
           // $('#txtDate').text(msg.d) //Mostrar en pantalla el valor retornado  
        //}
    });
    return false;*/
}

function fn_Mensaje(sMensaje) 
{ 
    alert(sMensaje)
}