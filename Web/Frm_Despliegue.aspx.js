//***********************************************************************************
// Variables Globales
//***********************************************************************************
var blnPrimeraBusqueda;
var intPaginaActual = 1;
var colMode = [];

//***********************************************************************************
// Funcion        ::    JQUERY - Documento listo
// Descripción    ::    Contiene metodos a ejecutarse una vez cargado el documento
//***********************************************************************************
$(document).ready(function() {
    //Crear Cabecera de Grillas
    $.ajax({
        dataType: "json",
        type: "post",
        url: "Frm_Despliegue.aspx/GetColumns_Consulta",
        data: "{}",
        contentType: "application/json;",
        async: false, //esto es requerido, de otra forma el jqgrid se cargaria antes que el grid
        success: function(data) {
            var persons = JSON.parse(data.d);
            $.each(persons, function(index, persona) {
                colMode.push({ name: persona.Name, index: persona.index, label: persona.label, width: persona.width, align: persona.align, editable: persona.editable, edittype: persona.editType, editrules: { edithidden: true }, hidden: false });
            })
        }
    });
    //Fin Cabecera

    //Popup
    // fn_Popup("Frm_VisorDirectorio.aspx", 500, 300, "SELECCIONE CARPETA");
    //Carga Grilla
    fn_cargaGrilla();
    //$("#jqGrid_lista_B").setGridWidth($(window).width() - 75);
    //Inicializar Campos
    fn_inicializaCampos();
    //Listar 
    fn_buscarPagoEncuestas(true);
    //Busca con Enter    
    $(document).keypress(function(e) {
        if (e.which == 13) {
            fn_buscarPagoEncuestas(true);
        }
    });
    //Click en boton buscar
    $('#btnSearchCustomer').click(function(e) {
        fn_buscarPagoEncuestas(true);
    });
    //Mostrar Datos Grilla
    $("#txt_Filtro").live("keyup", function(event) {
        fn_buscarPagoEncuestas(true);
    });

});
//****************************************************************
// Funcion        ::    fn_inicializaCampos
// Descripción    ::    Inicializa campos
//****************************************************************
function fn_inicializaCampos() {
    blnPrimeraBusqueda = false;
    $('#fechaini').datepicker(); //Crear datepicker
    $('#fechafin').datepicker(); //Crear datepicker
}
//****************************************************************
// Funcion        ::    fn_cargaGrilla
// Descripción    ::    Carga Grilla Listado de Encuestas
//****************************************************************
function fn_cargaGrilla() {
    $("#jqGrid_lista_A").jqGrid({
        datatype: function() {

            intPaginaActual = fn_util_getJQGridParam("jqGrid_lista_A", "page");
            fn_realizaBusquedaEncuestas();
        },
        jsonReader: //Set the jsonReader to the JQGridJSonResponse squema to bind the data.
            {
            root: "Items",
            page: "CurrentPage",
            total: "PageCount",
            records: "RecordCount",
            repeatitems: true,
            cell: "Row",
            id: "Numlog" //index of the column with the PK in it    
        },
        colModel: colMode,

        pager: "#jqGrid_pager_A", //Pager.
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        rowNum: "10", // PageSize.
        rowList: [10, 20, 30], //Variable PageSize DropDownList.
        viewrecords: true, //Show the RecordCount in the pager.
        multiselect: false,
        //search: true,
        sortname: "USUARIO", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "900",
        height: "230",
        caption: "CONSULTAS"
    }).navGrid("#jqGrid_pager_A", { edit: false, add: false, search: true, del: false }
     );
}

//****************************************************************
// Funcion        ::    fn_limpiarForm 
// Descripción    ::    Limpiar Datos
//****************************************************************
function fn_limpiarForm() {
    blnPrimeraBusqueda = false;
    fn_cargaGrilla();
}
//****************************************************************
// Funcion        ::    fn_buscarPagoEncuestas
// Descripción    ::    Busca listado de Encuestas
//****************************************************************
function fn_buscarPagoEncuestas(pblnBusqueda) {
    blnPrimeraBusqueda = pblnBusqueda;
    intPaginaActual = 1;
    fn_realizaBusquedaEncuestas();
}
//****************************************************************
// Funcion        ::    fn_realizaBusquedaEncuestas
// Descripción    ::    Busca listado de Encuestas
//****************************************************************
function fn_realizaBusquedaEncuestas() {
    if (!blnPrimeraBusqueda) {
        return;
    } else {

        try {

            if ($('#fechaini').val() != '' && $('#fechafin').val() != '') {
                var fechaini = $('#fechaini').val().split("/");
                var fechaini1 = fechaini[2] + fechaini[1] + fechaini[0];
                var fechafin = $('#fechafin').val().split("/");
                var fechafin1 = fechafin[2] + fechafin[1] + fechafin[0];
            } else {
                var fechaini1 = '';
                var fechafin1 = '';
            }
            var stxt_Filtro = $('#txt_Filtro').val();
            if (stxt_Filtro == "")
                Cargar_Data2(fechaini1, fechafin1); //Funcion se encarga de filtrar datos
            else
                Cargar_Filtro(stxt_Filtro)

        } catch (ex) {
            fn_util_alert(ex.message);
        }
    }
}
//****************************************************************
// Funcion        ::    Cargar_Data2(fechaini, fechafin) 
// Descripción    ::    Filtrar Encuestas por fecha
//****************************************************************
function Cargar_Data2(fechaini, fechafin) {

    var params = new Object();
    params.fechaini = fechaini;
    params.fechafin = fechafin;

    $.ajax(
                {
                    url: "Frm_Despliegue.aspx/GetPersons", //PageMethod

                    data: "{'pPageSize':'" + $('#jqGrid_lista_A').getGridParam("rowNum") +
                    "','pCurrentPage':'" + intPaginaActual +
                    "','pSortColumn':'" + $('#jqGrid_lista_A').getGridParam("sortname") +
                    "','pSortOrder':'" + $('#jqGrid_lista_A').getGridParam("sortorder") +
                    "','fechaini':'" + params.fechaini +
                    "','fechafin':'" + params.fechafin + "'}", //PageMethod Parametros de entrada

                    dataType: "json",
                    async: false,
                    type: "post",
                    contentType: "application/json; charset=utf-8",
                    complete: function(jsondata, stat) {
                        if (stat == "success") {
                            //alert(JSON.parse(jsondata.responseText).d);
                            jQuery("#jqGrid_lista_A")[0].addJSONData(JSON.parse(jsondata.responseText).d);
                            //jQuery("#jqGrid_lista_A")[0].addJSONData(jsondata);
                            //jqGrid_lista_A.addJSONData(jsondata);
                        }
                        else {
                            alert(JSON.parse(jsondata.responseText).Message);
                        }

                    }


                });

}
//****************************************************************
// Funcion        ::    Cargar_Filtro(fechaini, fechafin) 
// Descripción    ::    Filtrar Encuestas por fecha
//****************************************************************
function Cargar_Filtro(sFiltro) {
    //var params = new Object();
    var prod = sFiltro;

    $.ajax(
                {
                    url: "Frm_Despliegue.aspx/GetProducts", //PageMethod

                    data: "{'pPageSize':'" + $('#jqGrid_lista_A').getGridParam("rowNum") +
                    "','pCurrentPage':'" + intPaginaActual +
                    "','pSortColumn':'" + $('#jqGrid_lista_A').getGridParam("sortname") +
                    "','pSortOrder':'" + $('#jqGrid_lista_A').getGridParam("sortorder") +
                    "','producto':'" + prod + "'}", //PageMethod Parametros de entrada

                    dataType: "json",
                    async: false,
                    type: "post",
                    contentType: "application/json; charset=utf-8",
                    complete: function(jsondata, stat) {
                        if (stat == "success") {
                            //alert(JSON.parse(jsondata.responseText).d);
                            jQuery("#jqGrid_lista_A")[0].addJSONData(JSON.parse(jsondata.responseText).d);
                            //jQuery("#jqGrid_lista_A")[0].addJSONData(jsondata);
                            //jqGrid_lista_A.addJSONData(jsondata);
                        }
                        else {
                            alert(JSON.parse(jsondata.responseText).Message);
                        }
                    }
                });
}


function fn_MostrarRuta() {
    try {        //       sRuta = unescape(sRuta);
        //alert(sessvars.nIndFO + " - " + sessvars.nIndFD);
        if (sessvars.nIndFO == 1 && sessvars.nIndFD == 0) {
            document.getElementById('txt_Origen').value = unescape(fn_ReadCookie('sRuta')); //sessvars.sRuta;
        }
        else if (sessvars.nIndFD == 1 && sessvars.nIndFO == 0) {
        document.getElementById('txt_Destino').value = unescape(fn_ReadCookie('sRuta'));  //sessvars.sRuta;
        }
    }
    catch (e) {
        alert("ERROR EN fn_MostrarRuta()");
    }
}

//**********************************************************************
// Nombre: fn_Componente
// Funcion: 
//**********************************************************************
//function fn_Componente()
function fn_Componente(sArreglo)
{
    try
     {
        var objcom;
        var strDataResult = "";
        var sResult = "";
        objcom = new ActiveXObject("IBK_UPDATE_WEB.UpdateClient.1");
        var asObject = sArreglo.split('∟');
        var asObjectPar = asObject[0].split('|');
        var asObjectIP = asObject[1].split('|');
        var sRuta = unescape(asObjectPar[2]);
        for (var w = 0; w < asObjectIP.length; w++) 
        {
            strDataResult = objcom.InstallSoftware(asObjectIP[w], asObjectPar[1], asObjectPar[0], sRuta, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0);
            if (sResult == "")
                sResult = strDataResult.toString();
            else
                sResult = sResult + '|' + strDataResult.toString();
        }
        document.getElementById('txt_Datos').value = sResult;
        document.getElementById('btn_Ver').click();
    }
    catch (e) {
        alert("Error - IBK_UPDATE_WEB.UpdateClient.1");
    }
}

function fn_Componente_mua(sArreglo) {
    try {
        var objcom;
        var strDataResult = "";
        var sResult = "";
        objcom = new ActiveXObject("IBK_UPDATE_WEB.UpdateClient.1");
        var asObject = sArreglo.split('∟');
        var asObjectPar = asObject[0].split('|');
        var asObjectArch = asObject[1].split('|');
        var sRuta = unescape(asObjectPar[2]);
        //strDataResult = objcom.InstallSoftware(asObject[0], asObject[1], asObject[2], sRuta, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0);
        //strDataResult = objcom.InstallSoftware(asObject[0], asObject[1], asObject[2], "c:\\ftm41\\Transactor", 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0);
        for (var w = 0; w < asObjectArch.length; w++) {
            strDataResult = objcom.InstallSoftware(asObjectArch[w], asObjectPar[1], asObjectPar[0], sRuta, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0);
            if (sResult == "")
                sResult = strDataResult.toString();
            else
                sResult = sResult + '|' + strDataResult.toString();
        }
        document.getElementById('txt_Datos').value = sResult;
        document.getElementById('btn_ver_MUA').click();
    }
    catch (e) {
        alert("Error - IBK_UPDATE_WEB.UpdateClient.1");
    }
}