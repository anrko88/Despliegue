<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Frm_Visor.aspx.cs" Inherits="Frm_Visor" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
  
     <style type="text/css">
td{
  font-family: "MS Sans Serif";
  font-size: 8pt;
}
a.entry {
  font-family: "MS Sans Serif";
  font-size: 8pt;
  color: "#000000";
  text-decoration: none;
}
a.entry:hover {
  text-decoration: underline;
}
</style>
<link type="text/css" rel="stylesheet" href="Util/css/css_formulario.css" />
    <link rel="stylesheet" href="css/jquery-ui.css" />
    <link type="text/css" rel="stylesheet" href="css/ui.jqgrid.css" />
    <link type="text/css" rel="stylesheet" href="css/index.css" />
    <script type="text/javascript" src="js/jquery-1.8.3.js"></script>
    <script type="text/javascript" src="Frm_Visor.aspx.js"></script>   
    <script type="text/javascript" src="ib_Global.js"></script> 
    <script type='text/javascript' src="Util/js/sessvars.js"></script>       
   </head>
<body>
    <form id="form1" runat="server">
    <div style="width:90%">
   <table width="100%">
   <tr>
         <td> <asp:HyperLink id="upLink" runat="server" ImageUrl="images/up.gif"/>    </td>
         <td> <asp:Button ID="btn_Cerrar" Width="100px" CssClass="botones" runat="server"   Text="Cerrar" onclick="btn_Cerrar_Click"/>      </td>
   </tr>
   <tr>
         <td> <asp:Label id="txtCurrentDir" Font-Name="MS Sans Serif" Font-Size="8pt" runat="server"/>  </td>
         <td> </td>
   </tr>
    <tr>
         <td>
 <asp:Label id="txtListing" Font-Name="MS Sans Serif" Font-Size="8pt" runat="server"/> 
 </td>
         <td> </td>
   </tr>
   </table>


<asp:HiddenField runat="server" ID="txt_Ruta" />  
    
   

    </div>
    </form>
</body>
</html>
