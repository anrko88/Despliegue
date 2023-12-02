//**********************************************************************
// Nombre: Fn_Cerrar_Modal
// Funcion: Cerrar 	Modal
//**********************************************************************
function Fn_Cerrar_Modal() {
    $("#dv_ModalFrame2").dialog('close');
}


//**********************************************************************
// Modal
//**********************************************************************	
function Fn_Modal(url, width, height, titulo) {
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
// Nombre: Fn_ActualizarGrilla
// Funcion: Actualizar Grilla con Data
//**********************************************************************
function Fn_ActualizarGrilla() {
   
    //alert(url);
    $("#jqGrid_lista_A").jqGrid('setGridParam', {}).trigger('reloadGrid');
}


//****************************************************************
// Funcion        ::    Cargar_Data2(fechaini, fechafin) 
// Descripción    ::    Filtrar Encuestas por fecha
//****************************************************************
function Cargar_Data2(producto) {

    //var params = new Object();
    var prod = producto;
     


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
            id: "id_producto" //index of the column with the PK in it    
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
        sortname: "id_producto", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "1000",
        height: "230",
        caption: "Consulta de Productos",
        onSelectRow: function(rowid) {
            var rowData = $("#jqGrid_lista_A").jqGrid('getRowData', rowid);
            var dato = rowid + '|' + rowData.garantia + '|' + rowData.unidad + '|' + rowData.stock_min + '|' + rowData.stock_max + '|' + rowData.tiempo_entrega + '|' + rowData.inventario + '|' + rowData.razon_social + '|' + rowData.observacion + '|' + rowData.prodes + '|' + rowData.estado + '|' + rowData.id_und + '|' + rowData.id_inventario + '|' + rowData.id_proveedor;
            $("#data").val(dato);

            //alert($("#data").val());

        }
    }).navGrid("#jqGrid_pager_A", { edit: false, add: false, search: false, del: false }
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


            var producto = $('#producto').val();
            //alert(producto);

            Cargar_Data2(producto); //Funcion se encarga de filtrar datos

        } catch (ex) {
            fn_util_alert(ex.message);
        }
    }
}