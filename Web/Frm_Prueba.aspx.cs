using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Threading;

public partial class Frm_Prueba : System.Web.UI.Page
{
    public string[] asArchivos;
    public string sRuta;
    public  string sArchivos = "global.asa|testpase.txt|appStart.asp ";
    public string sIPLocal = "10.10.82.113";
    public string sPuerto = "3001";
    

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {
            //fn_Proceso();
            Thread hilo_1 = new Thread(new ThreadStart(fn_function_1));
            Thread hilo_2 = new Thread(new ThreadStart(fn_function_2));
            Thread hilo_3 = new Thread(new ThreadStart(fn_function_3));
            hilo_1.Start();
            hilo_2.Start();
            hilo_3.Start();

        }
    }
    void fn_function_1()
    {
        string sRuta = "C%3a%5cAGM_LOG";
        asArchivos = sArchivos.Split("|".ToCharArray());
        for (int i = 0; i < asArchivos.Length; i++)
        {
            //Thread.Sleep(1000);
            fn_Funcion("fn_Componente('" + sIPLocal + '|' + sPuerto + '|' + asArchivos[i] + '|' + sRuta + "')");
        }
    }

    void fn_function_2()
    {
        string sRuta = "C%3a%5cAGM_LOG";
        asArchivos = sArchivos.Split("|".ToCharArray());
        for (int i = 0; i < asArchivos.Length; i++)
        {
            //Thread.Sleep(1000);
            fn_Funcion("fn_Componente('" + sIPLocal + '|' + sPuerto + '|' + asArchivos[i] + '|' + sRuta + "')");
        }
    }
    void fn_function_3()
    {
        string sRuta = "C%3a%5cAGM_LOG";
        asArchivos = sArchivos.Split("|".ToCharArray());
        for (int i = 0; i < asArchivos.Length; i++)
        {
            //Thread.Sleep(1000);
            fn_Funcion("fn_Componente('" + sIPLocal + '|' + sPuerto + '|' + asArchivos[i] + '|' + sRuta + "')");
        }
    }

    void fn_Proceso()
    {       
        string sRuta = "C%3a%5cAGM_LOG";
        asArchivos = sArchivos.Split("|".ToCharArray());
        for (int nCon = 0; nCon < asArchivos.Length; nCon++)
        {
            //AQUI LLAMO AL COMPONENTE 
            //fn_Funcion("fn_Componente()"); 
            fn_Funcion("fn_Componente('" + sIPLocal + '|' + sPuerto + '|' + asArchivos[nCon] + '|' + sRuta + "')");
            // string sScript = "alert('Esto es un Popup generado desde Code Behind');";
            // ScriptManager.RegisterClientScriptBlock(this.udp_form, udp_form.GetType(), "MensajeConf", sScript, true);


            //OBTENGO LOS DATOS
            //var sTxt_Datos = Request.QueryString["txt_Datos"].ToString();
            //ARREGLO QUE DEVUELVE EL COMPONENTE
            //var asTxt_Datos = sTxt_Datos.Split("|".ToCharArray());
            //AHORA FALTA GRABAR LOS DATOS asTxt_Datos[0] , asTxt_Datos[1] ,    asTxt_Datos[2] 
            // sObjetoStore = sEstacion + "|" + asArchivos[nCon] + "|" + sFecha + "|" + sFecha + "|" +
            //       "XT3665" + "|" + "OBSERVACION" + "|" + "OK" + "|" + "ACTIVO";
            // _ln_Business.fGrabar_SP("ST_INSERTAR", sParamStore, sObjetoStore, 1);
            //ClientScript.RegisterStartupScript(GetType(), "mostrar mensaje", "fn_AddItemLoad(" + sEstaciones + ");", true);
            //Page.ClientScript.RegisterStartupScript(GetType(), "script", "fn_AddItemLoad(" + sEstaciones + ");", true);
            // fn_Funcion("fn_AddItemLoad('" + sEstaciones + "')");
            //  fn_Funcion("fn_RemoveItem('"+ sEstacion +"')");//ELIMINAR ESTACION SELECCIONADO             
        }
    }
    public void fn_Funcion(string sFuncion)
    {
        try
        {
  //          _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "Metodo fn_Funcion - " + HttpUtility.UrlDecode(sFuncion), 4, 3);
            string sScript = @"<script type='text/javascript'>" + sFuncion + ";</script>";
            ScriptManager.RegisterStartupScript(this, typeof(Page), "myScript", sScript, false);
        }
        catch (Exception ex)
        {
//            _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "Error - Metodo fn_Funcion - " + ex.ToString(), 4, 3);
        }
    }
}
