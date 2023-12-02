<%@Page Language="C#" EnableViewState="false"%>
<%@Import namespace="System.IO"%>
<%@Import namespace="AjaxControlToolkit"%>

<script runat="server">
public void Page_Load(object s, System.EventArgs ea) 
{
	try 
    {
		string strDir = Request.QueryString["d"];
		string strParent = strDir.Substring(0,strDir.LastIndexOf("\\"));
		strParent += strParent.EndsWith(":") ? "\\" : "";
		upLink.NavigateUrl = "browse.aspx?d="+strParent;
		txtCurrentDir.Text = "Direccion: <b>"+strDir + "</b>";
        Session["strDir"] = strDir;
		DirectoryInfo DirInfo = new DirectoryInfo(strDir);
		DirectoryInfo[] subDirs = DirInfo.GetDirectories();		
		FileInfo[] Files = DirInfo.GetFiles();
		txtListing.Text = "<table>";
		for (int i=0; i<=subDirs.Length-1; i++)
        {
			txtListing.Text += "<tr><td><img src='folder.gif'><a href='browse.aspx?d="+
                subDirs[i].FullName+"' class='entry'>"+subDirs[i].Name+"</a></td><td valign='bottom'>"+
                subDirs[i].LastWriteTime+"</td></tr>";
		}
		for (int i=0; i<=Files.Length-1; i++) // OCULTAR ARCHIVOS
        {
			txtListing.Text += "<tr><td><img src='file.gif'>"+Files[i].Name+"</td><td valign='bottom'>"+
                Files[i].LastWriteTime+"</td></tr>";
		}
		txtListing.Text += "</table>";
       
	}
	catch (Exception e)
    {
		txtListing.Text = "Error retrieving directory info: "+e.Message;
	}
}
</script>
<html>
<head><title></title>
<style>
td {
  font-family: "MS Sans Serif";
  font-size: 8pt;
}
a.entry {
  font-family: "MS Sans Serif";
  font-size: 8pt;
  color: "black";
  text-decoration: none;
}
a.entry:hover {
  text-decoration: underline;
}
</style>
<link rel="stylesheet" href="css/jquery-ui.css" />
<link type="text/css" rel="stylesheet" href="css/ui.jqgrid.css" />
<link type="text/css" rel="stylesheet" href="css/index.css" />
<script type="text/javascript" src="js/jquery-1.8.3.js"></script>
  
</head>
<body>
<form runat="server">
<asp:HyperLink id="upLink" runat="server" ImageUrl="up.gif"/>
<br/>
<asp:Label id="txtCurrentDir" Font-Name="MS Sans Serif" Font-Size="8pt" runat="server"/>
<br><br>
<asp:Label id="txtListing" Font-Name="MS Sans Serif" Font-Size="8pt" runat="server"/>
</form>
</body>
</html>