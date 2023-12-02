using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using AjaxControlToolkit;

public partial class Frm_Visor : System.Web.UI.Page
{
    public string strDir;
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
             strDir = Request.QueryString["d"];
           /* if (strDir == "C:\\")
            {*/
                string strParent = strDir.Substring(0, strDir.LastIndexOf("\\"));
                strParent += strParent.EndsWith(":") ? "\\" : "";
                upLink.NavigateUrl = "Frm_Visor.aspx?d=" + strParent;
                txtCurrentDir.Text = "Direccion: <b>" + strDir + "</b>";
                //strDir = System.Web.HttpUtility.UrlEncode(strDir);// strDir.Replace(@"\\", "//");
                //Session["strDir"] = strDir;
                DirectoryInfo DirInfo = new DirectoryInfo(strDir);
                DirectoryInfo[] subDirs = DirInfo.GetDirectories();
                FileInfo[] Files = DirInfo.GetFiles();
                txtListing.Text = "<table>";
                for (int i = 0; i <= subDirs.Length - 1; i++)
                {
                    txtListing.Text += "<tr><td><img src='images/directory.png'><a href='Frm_Visor.aspx?d=" +
                        subDirs[i].FullName + "' class='entry'>" + subDirs[i].Name + "</a></td><td valign='bottom'>" +
                        subDirs[i].LastWriteTime + "</td></tr>";
                }
                /*for (int i=0; i<=Files.Length-1; i++) // OCULTAR ARCHIVOS
                {
                    txtListing.Text += "<tr><td><img src='images/file.gif'>"+Files[i].Name+"</td><td valign='bottom'>"+
                        Files[i].LastWriteTime+"</td></tr>";
                }*/
                txtListing.Text += "</table>";
                if (subDirs.Length == 0)//NO HAY MAS DIRECTORIOS
                {
                    ClientScript.RegisterStartupScript(GetType(), "mostrar mensaje", "fn_Ruta('" + HttpUtility.UrlEncode(strDir) + "');", true);
                }
          /*  }
            else
            {
                upLink.NavigateUrl = "Frm_VisorDirectorio.aspx";
            }
            */

        }
        catch (Exception ex)
        {
            txtListing.Text = "Error retrieving directory info: " + ex.Message;
        }
    }

    protected void btn_Cerrar_Click(object sender, EventArgs e)
    {
        try
        {
            Page.ClientScript.RegisterStartupScript(GetType(), "script", "fn_Ruta('" + HttpUtility.UrlEncode(strDir) + "');", true);            
          
        }
        catch (Exception ex) { throw ex; }
    }

}
