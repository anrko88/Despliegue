<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Frm_Despliegue.aspx.cs" Inherits="Frm_Despliegue" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajax" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Expires" content="0">
<meta http-equiv="Last-Modified" content="0">
<meta http-equiv="Cache-Control" content="no-cache, mustrevalidate">
<meta http-equiv="Pragma" content="no-cache">
    <title>SOFTWARE DE DESPLIEGUE</title>
       <link href="css/Site.css" rel="stylesheet" type="text/css" />
           <link type="text/css" href="css/ui-lightness/jquery-ui-1.8.19.custom.css" rel="stylesheet" />
    <link type="text/css" rel="stylesheet" href="css/ui.jqgrid.css" />
    
   <style type="text/css">
    .ui-datepicker { font-size:8pt !important}
</style>
    <!-- Estilos 
    <link type="text/css" rel="stylesheet" href="Util/css/jquery/jquery-ui-1.8.15.custom.css" />
    <link type="text/css" rel="stylesheet" href="Util/css/jquery/jquery.jscrollpane.css" media="all" />
    --> 
    <link rel="stylesheet" href="css/jquery-ui.css" />
    <link type="text/css" rel="stylesheet" href="css/ui.jqgrid.css" />
    <link type="text/css" rel="stylesheet" href="css/index.css" />
    <link type="text/css" rel="stylesheet" href="Util/css/css_global.css" />
    <link type="text/css" rel="stylesheet" href="Util/css/css_formulario.css" />
    <link type="text/css" rel="stylesheet" href="Util/css/css_fuente.css" />
    <script type="text/javascript" src="js/jquery-1.8.3.js"></script>
    <script type="text/javascript" src="js/jquery-1.5.2.min.js"></script>
    <script type="text/javascript" src="js/json2.js"></script>
    <script type="text/javascript" src="js/grid.locale-es.js"></script>
    <script type="text/javascript" src="js/jquery.jqGrid.min.js"></script>
    <script type="text/javascript" src="js/grid.base.js"></script>
    <script type="text/javascript" src="js/grid.common.js"></script>
    <script type="text/javascript" src="js/grid.formedit.js"></script>
    <script type="text/javascript" src="js/jquery.fmatter.js"></script>
    <script type="text/javascript" src="js/jsonXml.js"></script>
    <script type="text/javascript" src="js/jquery.tablednd.js"></script>
    <script type="text/javascript" src="js/grid.inlinedit.js"></script>
    <script type="text/javascript" src="js/jQDNR.js"></script>
    <script type="text/javascript" src="js/jqModal.js"></script>               
    <script type="text/javascript" src="Util/js/jquery-ui.js"></script>
    <script type='text/javascript' src="Util/js/js_util.ajax.js"> </script>    
    
    <script type="text/javascript" src="Frm_Despliegue.aspx.js"></script>   
    <script type="text/javascript" src="ib_Global.js"></script>
    <script type='text/javascript' src="Util/js/sessvars.js"> </script>   
</head>
<body>
    <form id="form1" runat="server">
    

    
     <div class="page">
        <div class="header">
            <div class="title">
                <h1> <%-- TITULO  --%>
                   SOFTWARE DE DESPLIEGUE
                </h1>
            </div>

        </div>
        <div class="main">
             <ajax:ToolkitScriptManager ID="ToolkitScriptManager1" runat="server">
                     </ajax:ToolkitScriptManager>
             <asp:UpdatePanel ID="udp_form" runat="server" UpdateMode="Conditional">
    <ContentTemplate>  
   
    <div style="width: 99%">  
    <!--<asp:Panel ID="pnl_Titulo" runat="server" BorderColor="Silver" BorderStyle="Solid" BorderWidth="1px"  Width="90%">          
   -->
         <table  width="100%" cellpadding="0" cellspacing="2" border="0">	
      
         <tr>  <%-- Ruta Origen  --%>
              <td style="width:10%">
                <asp:Label ID="lbl_Origen" runat="server" Text="Ruta Origen" CssClass="lLabel"/>
             </td>
                <td colspan="3"><!--
                <input type="text" id="txt_Origen" class="css_input" size="70" readOnly="false"/> -->
                <asp:TextBox ID="txt_Origen" runat="server" CssClass="css_input" readOnly="false" size="70"></asp:TextBox>
                </td>
                <td colspan="3">    
                    <asp:Button ID="btn_Examinar_O" runat="server" Text="Examinar" 
                        onclick="btn_Examinar_O_Click" CssClass="botones" Width="0px"/>
                        <%--  BOTON - EXAMINAR ORIGEN --%>
                    <input type="button" id="btn_ExaminarFO" value="Examinar" class="botones" onclick=fn_ModalPopupO()>
                  </td>
              <td>
               <asp:ImageButton ID="btn_Log" runat="server"  Width="0px" Height="0px"     />                                  
                   <%--  BOTON - VER --%>   
                   <asp:Button ID="btn_Ver" runat="server" Height="0px" onclick="btn_Ver_Click" Text="Ver" Width="0px" />
             </td>                       
              
        </tr>  
         <tr>   <%-- Ruta Destino  --%>
              <td style="width:12%">
                <asp:Label ID="lbl_Destino" runat="server" Text="Ruta Destino" CssClass="lLabel"/>
             </td>
                <td colspan="3"><!--
                  <input type="text" id="txt_Destino" class="css_input" size="70" readOnly="false"/>  
                  -->
                <asp:TextBox ID="txt_Destino" runat="server" CssClass="css_input" readOnly="false" size="70"></asp:TextBox>               
                 <td colspan="3">    
                    <asp:Button ID="btn_Examinar_D" runat="server" Text="Examinar" onclick="btn_Examinar_D_Click" 
                        CssClass="botones" Width="0px" />    
                         <%--  BOTON - EXAMINAR DESTINO --%>   
                         <input type="button" id="btn_ExaminarFD" value="Examinar" class="botones" onclick=fn_ModalPopupD()>            
                 </td>
             </td>      
              <td>      <%--  BOTON - VER --%>   
                   <asp:Button ID="btn_ver_MUA" runat="server" Height="0px" Text="Ver" 
                      Width="0px" onclick="btn_ver_MUA_Click" /></td>               
        </tr> 
         <tr>       <%-- Estacion  --%>
            <td  style="width:10%">
                   <asp:Label ID="lbl_Estacion" runat="server" Text="Estacion" CssClass="lLabel"></asp:Label>
             </td>
             <td>  <!--  <input type="text" id="txt_Estacion" class="css_input" /> -->            
                    <asp:TextBox ID="txt_Estacion" runat="server" class="css_input"></asp:TextBox>   
             </td>
             <td align="center"> <%--  BOTON - AGREGAR  ESTACION--%>
             <!--   <input type="button" id="btn_addEstacion" value="Agregar"class="botones" onclick=fn_AddItem()>            -->                                         
                 <asp:Button ID="btn_AgregarEstacion" runat="server" CausesValidation="True" CssClass="botones"
                 Text="Agregar" onclick="btn_AgregarEstacion_Click" Width="100px" />
                 
                            </td>
            <td>    <%--  BOTON - ELIMINAR ESTACION --%>
             <!--
            <input type="button" id="btn_DeleteEstacion" value="Eliminar"class="botones" onclick=fn_AddItem()>
            -->       
            <asp:Button ID="btn_EliminarEstacion" runat="server" CausesValidation="True" CssClass="botones"
                     Text="Eliminar"   onclick="btn_EliminarEstacion_Click" Width="100px" />   
                                </td>
            <td align="center">   <%--  BOTON GRABAR  --%>  
                <asp:ImageButton ID="btnGrabar" runat="server" CausesValidation="true" 
                    CommandName="Despliegue" ImageUrl="~/Util/images/ico_acc_grabar.gif" 
                    onclick="btnGrabar_Click" style="height:30px;" ToolTip="Grabar " 
                    ValidationGroup="Despliegue" />
                </td>
            <td > 
                 <asp:ImageButton ID="btnExportar" runat="server" CausesValidation="true" 
                    CommandName="Despliegue" ImageUrl="~/Util/images/Get Document.png" 
                     style="height:30px;" ToolTip="Exportar" 
                    ValidationGroup="Despliegue" onclick="btnExportar_Click" />
                  <!--   <input type="button" id="btn_Grabar" value="Grabar" class="botones" onclick=fn_Grabar()>  
                 ......................................................................  --> 
                     &nbsp;</td>
                       <td>    
                           <input ID="btnSearchCustomer" src="Util/images/ico_acc_buscar.gif" 
                               title="BUSCAR" type="image" value="Buscar" /></td>
                         <td>   
                            <asp:ImageButton ID="btn_GrabarMAU" runat="server" CausesValidation="true" 
                    CommandName="Despliegue" ImageUrl="~/Util/images/Agregar.jpg" 
                    style="height:30px;" ToolTip="Grabar " 
                    ValidationGroup="Despliegue" onclick="btn_GrabarMAU_Click" /> </td>
           </tr>
            <tr>       <%-- VERSION  --%>
                <td>
                 <asp:Label ID="Label1" runat="server" Text="Version" CssClass="lLabel"></asp:Label>
                </td>
                   <td>  <!--  <input type="text" id="txt_Estacion" class="css_input" /> -->            
                    <asp:TextBox ID="txt_Version" runat="server" class="css_input"></asp:TextBox>   
             </td>
               <td>    &nbsp;</td>
                <td>    &nbsp;</td>
                 <td>   &nbsp;  </td>
                  <td>    &nbsp;</td>
                    <td>    &nbsp;</td>
                      <td>    &nbsp;</td>
            </tr>
           
           
            <tr>
             <td align"center">&nbsp;             
                <asp:LinkButton ID="lnk_Log" runat="server" CssClass="LinkButton" 
                    Visible="false">ABRIR LOG</asp:LinkButton>
                </td>
             
              <td colspan="3" valign=top>  <%--  ESTACIONES  --%>
                <!-- 
                <select name="lst_Estaciones"  multiple id="lst_Estaciones"   
                 style="width:100%" class="css_input"></select>
                 -->
               <asp:ListBox ID="lst_Estaciones" runat="server"                      
                        Width="100%" class="css_input"></asp:ListBox>
                    
                          </td>
             
                <td>             
                    &nbsp;</td>
                 <td>&nbsp;             
                     <asp:HiddenField ID="txt_Datos" runat="server" />
                     </td>
                  <td>    &nbsp;</td>
                    <td>    &nbsp;</td>
            </tr>
         <tr>           
            <td style="width:10%">
                <asp:Label ID="lbl_FechaInicio" runat="server" Text="Fecha Inicio" CssClass="lLabel"></asp:Label>
             </td>
             <td style="width:10%">
                <input type="text" id="fechaini" class="css_input"/>
              </td>
              <td style="width:10%" align=center>
                 <asp:Label ID="lbl_FechaFin" runat="server" Text="Fecha Fin" CssClass="lLabel"></asp:Label>
                 </td>                
               <td style="width:12%">
            <input type="text" id="fechafin" class="css_input"/>
            </td>
                    <td>   &nbsp;</td>
                     <td>   &nbsp; </td>
                     <td>    &nbsp;</td>
                       <td>    &nbsp;</td>
                </tr>
         <tr>      
            <td class="titulo" style="width:12%">
                   <asp:Label ID="lblFiltro" runat="server" Text="Filtrar" CssClass="lLabel"></asp:Label>
             </td>
             <td>
                    <input type="text" id="txt_Filtro" class="css_input"/>
            </td>
              <td colspan="4">           
     <asp:RadioButtonList ID="rbtl_Pc" runat="server" 
                          RepeatDirection="Horizontal">
                            <asp:ListItem Value="1">PC COPIADOS</asp:ListItem>
                            <asp:ListItem Value="2">PC NO COPIADOS</asp:ListItem>
                            <asp:ListItem Value="3">PC APAGADAS</asp:ListItem>
                      </asp:RadioButtonList> </td>
                 <td>&nbsp;                         </td>
                   <td>    &nbsp;</td>
                     <td>    &nbsp;</td>
           </tr>
     
        </table>
    <!--  </asp:Panel> -->

     </div>
              <%-- MENSAJE ERROR--%>
      <asp:Panel ID="pnl_Mensajes" runat="server" Visible="false" Width="90%">
                            <table style="width: 100%">
                                <tr>
                                    <td style="text-align: center">
                <asp:Label ID="lbl_MensajeError" runat="server" CssClass="lLabelError" Width="100%"   ></asp:Label>
                                    </td>
                                </tr>
                            </table>
                        </asp:Panel>
     </ContentTemplate>
    </asp:UpdatePanel>
    
        <table id="jqGrid_lista_A">
        </table>
        <div id="jqGrid_pager_A">
        </div>
            
        </div>
        <div class="clear">
        </div>
    </div>
    <div class="footer">
    </div> 
    <div>
    
    </div>
    </form>
</body>
</html>
