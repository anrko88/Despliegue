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
        url: "Frm_Consulta.aspx/GetColumns_Consulta",
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
function fn_inicializaCampos() 
{
    blnPrimeraBusqueda = false;
    $('#fechaini').datepicker(); //Crear datepicker
    $('#fechafin').datepicker(); //Crear datepicker
}
//****************************************************************
// Funcion        ::    fn_cargaGrilla
// Descripción    ::    Carga Grilla Listado de Encuestas
//****************************************************************
function fn_cargaGrilla() 
{
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
        sortname: "ESTACION", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "800",
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
            if (stxt_Filtro =="")
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
                    url: "Frm_Consulta.aspx/GetPersons", //PageMethod

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
function Cargar_Filtro(sFiltro) 
{
    //var params = new Object();
    var prod = sFiltro;

    $.ajax(
                {
                    url: "Listar_Productos.aspx/GetProducts", //PageMethod

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
//**********************************************************************
// Nombre: fn_Componente
// Funcion: Luder
//**********************************************************************
function fn_Componente()
 {
    try {
        var sCant;
        var objValidatePswd;
        objValidatePswd = new ActiveXObject("IB_Firmas.ib_FirmasCOM.1");
        var result = objValidatePswd.GetDataFirmas(sCuenta);
        // alert("objValidatePswd: " + objValidatePswd + "\n" + result);
        document.getElementById('txt_Datos').value = result;
    }
    catch (e) {
        alert("Error - IB_Firmas.ib_FirmasCOM.1");
    }
}

function fn_MostrarRuta() 
{
    try {
        //alert(sessvars.nIndFO + " - " + sessvars.nIndFD);
        if (sessvars.nIndFO == 1 && sessvars.nIndFD == 0) {
            document.getElementById('txt_Origen').value = fn_ReadCookie('sRuta'); //sessvars.sRuta;
        }
        else if (sessvars.nIndFD == 1 && sessvars.nIndFO == 0) {
        document.getElementById('txt_Destino').value = fn_ReadCookie('sRuta'); //sessvars.sRuta;
        }
    } 
    catch (e)
    {
        alert("ERROR EN fn_MostrarRuta()");
     }   
}

function fn_ValidaUsuario()
 {
    try 
    {
        var result;        
        var objValidatePswd = new ActiveXObject("UnisysFinancialTransactionMgr.usercheck.4.1");
        result = objValidatePswd.impersonate("xt3665", "agosto99");
        document.getElementById('txt_Datos').value = result;
       // alert("Valida=" + result);
    }
    catch (e) {
        alert("Error objValidatePswd");
    }
}

/*********************************************************************/
function getFolder()
 {
    return showModalDialog("folderDialog.HTA", "", "width:400px;height:400px;resizeable:yes;");
}

function SelCarpeta()
 {
      var objShell = new ActiveXObject("WScript.Shell");
      //var objShell = new ActiveXObject("Shell.Application");        
      //var objFolder = objShell.BrowseForFolder(0, "SELECCIONE LA RUTA DONDE DESEA GUARDAR EL ARCHIVO", 0,0);
      
        if (objFolder != null)        {
            var objFolderItem = objFolder.Items().Item();
            var objPath = objFolderItem.Path;
            var foldername = objPath;
           // document.forms.aspnetForm.ctl00_ContentPlaceHolder 1_txtrutaID.value = foldername;
            return false;
        }

    }