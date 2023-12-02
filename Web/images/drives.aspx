<%@Page Language="C#" %>
<%@Import namespace="System.IO"%>
<html>
<head><title>Exploring Files and Folders with ASP.NET</title>
<style>
a.entry {
  font-family: "MS Sans Serif";
  font-size: 8pt;
  color: "black";
  text-decoration: none;
}
</style>

<link rel="stylesheet" href="css/jquery-ui.css" />
<link type="text/css" rel="stylesheet" href="css/ui.jqgrid.css" />
<link type="text/css" rel="stylesheet" href="css/index.css" />
<script type="text/javascript" src="js/jquery-1.8.3.js"></script>
  


</head>
<body>
<%
  string[] arrDrives = Directory.GetLogicalDrives();
  for (int i=0; i<=arrDrives.Length-1; i++) {
      Response.Write("<img src='drive.gif'><a href='browse.aspx?d=" + arrDrives[i] + 
          "' class='entry'>" + arrDrives[i] + "</a><br>");
  }
%>
</body>
</html>