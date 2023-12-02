<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Frm_Prueba.aspx.cs" Inherits="Frm_Prueba" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
        
        <script>
            //function fn_Componente()
            function fn_Componente(sArreglo) {
                try {
                    var objcom;
                    var strDataResult = "";
                    objcom = new ActiveXObject("IBK_UPDATE_WEB.UpdateClient.1");
                    var asObject = sArreglo.split('|');
                    //var sRuta = asObject[3].replace("//","\\");
                    //strDataResult = objcom.InstallSoftware(asObject[0], asObject[1], asObject[2], sRuta, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0);
                    strDataResult = objcom.InstallSoftware(asObject[0], asObject[1], asObject[2], "c:\\ftm41\\Transactor", 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0);
                    //strDataResult = objcom.InstallSoftware("10.10.82.113", 3001, "global.asa", "c:\\ftm41\\Transactor", 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0);
                    alert("strDataResult->" + strDataResult);
                    if (strDataResult != 0)
                        alert("Error InstallSoftware=" + strDataResult);
                }
                catch (e) {
                    alert("Error - BK_UPDATE_WEB.UpdateClient.1");
                }
            }
        </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
    </div>
    </form>
</body>
</html>
