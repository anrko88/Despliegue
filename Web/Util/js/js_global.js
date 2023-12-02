var glb_intWidthPantalla = 1024;

//****************************************************************
// Funcion		:: 	JQUERY - Documento listo
// Descripción	::	Contiene metodos a ejecutarse una vez cargado 
//					el documento
// Log			:: 	JRC - 10/02/2012
//****************************************************************
$(document).ready(function() {

    //Tamaño Pantalla
    glb_intWidthPantalla = $(window).width();

    //General
    try {
        parent.fn_util_setContenedorHeight("#ifrm_contenedor");
        parent.fn_unBlockUI();
    } catch (ex) { }
    
    //Iconos Menu
    $("div[class=dv_img_boton]").mouseover(function() {
        $(this).removeClass("dv_img_boton");
        $(this).addClass("dv_img_boton_hover");
    });
    $("div[class=dv_img_boton]").mouseout(function() {
        $(this).removeClass("dv_img_boton_hover");
        $(this).addClass("dv_img_boton");
    });

    //Evita Copiar y Pegar
    //$(document).keydown(function(event) {
        //if (event.ctrlKey == true && (event.which == '118' || event.which == '86')) {            
            //event.preventDefault();
        //}
    //});

    //Bloquea Boton Derecho
    //$(document).bind("contextmenu", function(e) {
        //e.preventDefault();
    //});

    $(window).resize(fn_onResize);

});


//****************************************************************
// Funcion		:: 	fn_onResize
// Descripción	::	Cuando la pagina de redimensiona
// Log			:: 	JRC - 10/02/2012
//****************************************************************
function fn_onLoadPage(){
	fn_util_setDivContenedorHeight("dv_contenedor");	
}

//****************************************************************
// Funcion		:: 	fn_onResize
// Descripción	::	Cuando la pagina de redimensiona
// Log			:: 	JRC - 10/02/2012
//****************************************************************
function fn_onResize() { 
	try{
		$("#jqGrid_listado").setGridWidth($(window).width()-65);
	}catch(e){}
	try{
		$('.css_scrollPane').jScrollPane();	
	}catch(e){}
}

//****************************************************************
// Funcion		:: 	fn_onResize
// Descripción	::	Cuando la pagina de redimensiona
// Log			:: 	JRC - 10/02/2012
//****************************************************************
function fn_doResize(){    
	parent.fn_util_setContenedorHeight("#ifrm_contenedor");			
	fn_util_setDivContenedorHeight("dv_contenedor");
}

//****************************************************************
// Funcion		:: 	fn_ocultaHeader
// Descripción	::	Cuando se oculta la cabecera
// Log			:: 	JRC - 10/02/2012
//****************************************************************
function fn_ocultaHeader(){	
	theFrame = $("#ifrm_contenedor", parent.document.body);
	iframeHeight = theFrame.height();
	theFrame.height(iframeHeight+83);
	
	divHeight = $("#dv_contenedor").height();
	$("#dv_contenedor").height(divHeight+83);

	try {
	    $('.css_scrollPane').jScrollPane();
	} catch (e) { }	
}

//****************************************************************
// Funcion		:: 	fn_muestraHeader
// Descripción	::	Cuando se muestra la cabecera
// Log			:: 	JRC - 10/02/2012
//****************************************************************
function fn_muestraHeader(){	
	theFrame = $("#ifrm_contenedor", parent.document.body);
	iframeHeight = theFrame.height();
	theFrame.height(iframeHeight-83);

	divHeight = $("#dv_contenedor").height();
	$("#dv_contenedor").height(divHeight-83);

	try {
	    $('.css_scrollPane').jScrollPane();
	} catch (e) { }	
	
}
