<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Frm_VisorDirectorio.aspx.cs" Inherits="Frm_VisorDirectorio" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">

    <title></title>
   
    <style>
    a.entry {
      font-family: "MS Sans Serif";
      font-size: 8pt;
      color: "black";
      text-decoration: none;
    }
 
 .botones
{
    border: 1px outset #A6A6A7;
    font-family: Arial, Helvetica, 'sans-serif !important';
    font-size: 10px;
    font-weight: bold;
    color: #5c9ccc;
    background-repeat: repeat-x;
    background-color: #F7F6F3;
    text-decoration: none;
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
    width: 100px;
    height: 18px;
}

   </style>
    <link rel="stylesheet" href="css/jquery-ui.css" />
    <link type="text/css" rel="stylesheet" href="css/ui.jqgrid.css" />
    <link type="text/css" rel="stylesheet" href="css/index.css" />
    <script type="text/javascript" src="js/jquery-1.8.3.js"></script>
    <script type="text/javascript" src="Frm_VisorDirectorio.aspx.js"></script>
    <script type="text/javascript" src="ib_Global.js"></script>
    
     
   </head>  
<body>

    <form id="form1" runat="server">
    <div>      
  <asp:HiddenField runat="server" ID="txt_Ruta" />  
        
    </div>
    </form>
</body>
</html>
