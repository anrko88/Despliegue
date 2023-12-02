using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
public partial class Frm_VisorDirectorio : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string[] arrDrives = Directory.GetLogicalDrives();
        for (int i = 0; i <= arrDrives.Length - 1; i++)
        {
            Response.Write("<img src='images/drive.gif'><a href='Frm_Visor.aspx?d=" + arrDrives[i] + 
                                                                 "' class='entry'>" + arrDrives[i] + "</a><br>");
        }
    }

}
