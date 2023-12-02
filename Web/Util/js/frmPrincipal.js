//****************************************************************
// Funcion        ::    JQUERY - Documento listo
// Descripción    ::    Contiene metodos a ejecutarse una vez cargado 
//                           el documento
// Log                  ::    JRC - 10/02/2012
//****************************************************************
$(document).ready(function() {

    //Posicion de la pantalla
    window.moveTo(0, 0);
    window.resizeTo(screen.availWidth, screen.availHeight);

    //Accion de Redimencionar Pantalla
    $(window).resize(fn_onResize);

    fn_util_MuestraLogPage("Bienvenido al Sistema de Gestión de Leasing", "I");
});



//****************************************************************
// Funcion        ::    fn_onResize
// Descripción    ::    Cuando la pagina de redimensiona
// Log                  ::    JRC - 10/02/2012
//****************************************************************
function fn_onResize() {
    try {
        if ($(window).width() <= 980) {
            $("#divBody").width(980);
        } else {
            $("#divBody").width("100%");
        }
    } catch (e) { }
}


//****************************************************************
// Funcion        ::    fn_ocultaHeader
// Descripción    ::    Oculta Header
// Log                  ::    JRC - 10/02/2012
//****************************************************************
var blnHeader = true;
function fn_ocultaHeader() {
    if (blnHeader == true) {
        $("#dv_cabecera").hide();
        $("#dv_menu").hide();
        blnHeader = false;
        //window.frames[0].document.getElementById('btnHideHeader').click();
        var iframe = document.getElementById("ifrm_contenedor");
        iframe.contentWindow.fn_ocultaHeader();
    } else {
        $("#dv_cabecera").show();
        $("#dv_menu").show();
        blnHeader = true;
        //window.frames[0].document.getElementById('btnShowHeader').click();
        var iframe = document.getElementById("ifrm_contenedor");
        iframe.contentWindow.fn_muestraHeader();
    }
}



//****************************************************************
// Funcion        ::    fn_mensajeErrorUsuario
// Descripción    ::    Error de sesion de usuario
// Log                  ::    JRC - 10/02/2012
//****************************************************************
function fn_mensajeErrorUsuario(pstrMensaje, pstrUrl) {
    fn_mdl_mensajeError(
                        pstrMensaje,
                        function() {
                            window.close();
                            window.open(pstrUrl);
                            return false;
                        }
                    );
}


//****************************************************************
// Funcion        ::    updateHora
// Descripción    ::    HoraSistema
// Log                  ::    JRC - 10/02/2012
//****************************************************************
function updateHora() {
    try {
        var labelHora = document.getElementById('lblHora');

        if (labelHora) {
            var time = (new Date()).toLocaleTimeString(); //(new Date()).localeFormat("T");
            labelHora.innerHTML = time;
        }
        MostrarFecha();
    } catch (e) { }
}


//****************************************************************
// Funcion        ::    MostrarFecha
// Descripción    ::    Mostrar Fecha
// Log                  ::    JRC - 10/02/2012
//****************************************************************
function MostrarFecha() {
    var nombres_dias = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado")
    var nombres_meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre")

    var fecha_actual = new Date()

    dia_mes = fecha_actual.getDate()     //dia del mes   
    dia_semana = fecha_actual.getDay()   //dia de la semana   
    mes = fecha_actual.getMonth() + 1
    anio = fecha_actual.getFullYear()

    var labelFecha = document.getElementById('lblFecha');

    if (labelFecha) {
        if (dia_mes < 10) { dia_mes = "0" + dia_mes; }
        if (mes < 10) { mes = "0" + mes; }
        labelFecha.innerHTML = nombres_dias[dia_semana] + ", " + dia_mes + " de " + nombres_meses[mes - 1] + " de " + anio
    }
}


updateHora();
window.setInterval(updateHora, 1000);

if (history.forward(1)) {
    location.replace(history.forward(1))
}

function pCerrarMaster(pUrl) {
    window.close();
    window.open(pUrl);
    return false;
} 
