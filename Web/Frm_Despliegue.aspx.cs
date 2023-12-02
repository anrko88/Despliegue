using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;
using AjaxControlToolkit;
using DATA_LAYER;
using System.Text;
using System.ComponentModel;
using System.Drawing;
using System.IO.Ports;
using System.IO;
using System.Net;
using System.Web.Security;
using System.Web.UI.WebControls.WebParts;
using System.Collections;
using Microsoft.VisualBasic;
using System.Drawing.Printing;
using System.Xml;
using System.Net.NetworkInformation;

public partial class Frm_Despliegue : System.Web.UI.Page
{
    #region Declaraciones
    clsUtil _clsUtil = new clsUtil();
    ln_Class sqlCon = new ln_Class();
    ln_Business _ln_Business = new ln_Business();
    public string sCarpetaLOG = @"C:\AGM_LOG\";
    public string sArchivosINI;
    public string sEstacionesINI;
    public string sIP_INI;
    public string sIP_PC;
    public string sEstacionLIST;    
    public string[] asEstaciones;
    public string[] asIP; 
    public string[] asCadena; 
    public string sPuertoINI;
    public string sIPLocal;
    public string sRuta;
    public string sParamStore = "@ESTACION,@IP,@APLICATIVO,@FECHA,@VERSION,@USUARIO,@OBSERVACION,@TIPO_ERROR,@TIPO_ESTADO";
    public string sObjetoStore;
    public string[] asParamStore;
    
    #endregion


    #region EVENTOS

    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!Page.IsPostBack)
                fSetear();
        }
        catch (Exception ex)
        {
            _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "ERROR - Page_Load - " + ex.ToString(), 4, 3);
        }
    }  
    protected void btn_AgregarEstacion_Click(object sender, EventArgs e)
    {
        try
        {
            if (txt_Estacion.Text.Length > 0)
                lst_Estaciones.Items.Add(new ListItem(txt_Estacion.Text.ToUpper(), "C"));
        }
        catch (Exception ex)
        {
            _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "ERROR - btn_AgregarEstacion_Click - " + ex.ToString(), 4, 3);
        }
    }
    protected void btn_EliminarEstacion_Click(object sender, EventArgs e)
    {
        lst_Estaciones.Items.Remove(lst_Estaciones.SelectedItem);
    }
    protected void btn_Examinar_O_Click(object sender, EventArgs e)
    {
        //string sScript = @"<script type='text/javascript'>fn_ModalPopup('" + 1 + "');</script>";
        // ScriptManager.RegisterStartupScript(this, typeof(Page), "myScript", sScript, false);        
    }
    protected void btn_Examinar_D_Click(object sender, EventArgs e)
    {
        //string sScript = @"<script type='text/javascript'>fn_ModalPopup('" + 2 + "');</script>";
        //ScriptManager.RegisterStartupScript(this, typeof(Page), "myScript", sScript, false);        
    }
    protected void lnk_Log_Click(object sender, EventArgs e)
    {
        fPopupLog();
    }
    protected void btnGrabar_Click(object sender, ImageClickEventArgs e)
    {
        try
        {
            fn_Ejecutar();
        }
        catch (Exception ex)
        {
            _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "ERROR - btnGrabar_Click - " + ex.ToString(), 4, 3);
            throw ex;
        }
    }

    protected void btn_Ver_Click(object sender, EventArgs e)
    {
        try
        {
            fn_Grabar();
        }
        catch (Exception ex)
        {
            _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "ERROR - btn_Ver_Click - " + ex.ToString(), 4, 3);
            throw ex;
        }
    }

    #endregion

    #region METODOS

    #region fPopupLog
    void fPopupLog()
    {
        try
        {
            //System.Diagnostics.Process.Start("notepad.exe");
            //popup_Log.Show();
            string fichero = sCarpetaLOG + _clsUtil.fArchivo("DESPLIEGUE");
            StreamReader sr = new StreamReader(fichero);
            //StreamWriter sw = new StreamWriter(_clsUtil.sNombreArchivo, true);
           // txt_Log.Text = "AAA";// sr.ReadToEnd();
            sr.Close();
        }
        catch (Exception ex)
        {
            _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "Error - Metodo fPopupLog" + ex.ToString(), 4, 3);
        }
    }
    #endregion

    #region fSetear
    void fSetear()
    {
        try
        {
            _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", " ----------------------------------------------- ", 4, 3);
            _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "Metodo Load de la página - Page_Load", 4, 3);            
            fLlenarDatos();
            fSetearEstacion(lst_Estaciones, sEstacionesINI, sIP_INI);
            //fn_Funcion("fn_AddItemLoad('" + sEstaciones + "')");
            _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", " ----------------------------------------------- ", 4, 3);
        }
        catch (Exception ex)
        {
            _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "ERROR - Metodo fSetear - " + ex.ToString(), 4, 3);
        }
    }
    #endregion

    #region fSetearEstacion
    public void fSetearEstacion(ListBox ListBox, string sEstaciones,string sIP)
    {
        try
        {
            if (ListBox.Items.Count == 0)
            {
                asEstaciones = sEstaciones.Split("|".ToCharArray());
                asIP = sIP.Split("|".ToCharArray());
                for (var r = 0; r < asEstaciones.Length; r++)
                    ListBox.Items.Add(asEstaciones[r]);//asIP[r] + "   :   " +

                if (ListBox.Items.Count > 0)
                    ListBox.SelectedIndex = 0;
            }
        }
        catch (Exception ex)
        {
            _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "Error - Metodo fSetearEstacion" + ex.ToString(), 4, 3);
        }
    }
    #endregion

    #region fLlenarDatos
    void fLlenarDatos()
    {
        Session["sHora"] = _clsUtil.fFechaHora();
        Session["sFecha"] = _clsUtil.fFechaActual();
        _ln_Business.CarpetaLOG = sCarpetaLOG;
        _clsUtil.fLeerParametrosIniciales();
        sEstacionesINI = _clsUtil.fLeerParametros("fLeerParametrosEstaciones", "[ESTACIONES]");   
        //ALMACENANDO ARCHIVOS .INI
        sArchivosINI = _clsUtil.fLeerParametros("fLeerParametrosARCHIVOS", "[ARCHIVOS]");
        Session["sArchivosINI"] = _clsUtil.fn_Concatenar("fn_ConcatenarArchivos", sArchivosINI);
        //ALMACENANDO IP .INI
        sIP_INI = _clsUtil.fLeerParametros("fLeerParametrosIP", "[IP]");        
        Session["sIP"] = _clsUtil.fn_Concatenar("fn_ConcatenarIP", sIP_INI);
        //ALMACENANDO PUERTO .INI
        sPuertoINI = _clsUtil.fLeerParametros("fLeerParametrosPUERTO", "[PUERTO]");
        //ALMACENANDO EL IP LOCAL
        sIPLocal = _clsUtil.fn_IPLOCAL(); 
        //SELECCION LA ESTACION SELECCIONADO DEL LIST
        sEstacionLIST = lst_Estaciones.SelectedValue.ToString();//Request.Form.Get("lst_Estaciones");  
        Session["sEstacion"] = sEstacionLIST;        
    }
    #endregion

    #region fn_Funcion
     void fn_Funcion(string sFuncion)
    {
        try
        {
            _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "Metodo fn_Funcion - " + HttpUtility.UrlDecode(sFuncion), 4, 3);
            string sScript = @"<script type='text/javascript'>" + sFuncion + ";</script>";
            ScriptManager.RegisterStartupScript(this, typeof(Page), "myScript", sScript, false);
        }
        catch (Exception ex)
        {
            _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "Error - Metodo fn_Funcion - " + ex.ToString(), 4, 3);
        }
    }
    public void fn_Funcion_(string sFuncion)
    {
        try
        {
            _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "Metodo fn_Funcion - " + HttpUtility.UrlDecode(sFuncion), 4, 3);
            StringBuilder sb = new StringBuilder("<script language='javascript' type='text/javascript'>");
            sb.Append(sFuncion);            
            Page.ClientScript.RegisterStartupScript(typeof(Page), "cerrar", sb.ToString());
            
        }
        catch (Exception ex)
        {
            _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "Error - Metodo fn_Funcion - " + ex.ToString(), 4, 3);
        }
    }
    #endregion      

    #region fn_Ejecutar
    public void fn_Ejecutar()
    {
        try
        {
            sRuta = HttpUtility.UrlEncode(Request.Form.Get("txt_Origen"));//"c://ftm41//Transactor";//
            if (sRuta != "")
            {
                fLlenarDatos();
                fn_LlamarComponente(sEstacionLIST, sPuertoINI, Session["sArchivosINI"].ToString(), sRuta);
            }
            else
            {
                pnl_Mensajes.Visible = true;
                lbl_MensajeError.Text = "Falta Seleccionar Ruta De Origen";
            }
        }
        catch (Exception ex)
        {
            _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "ERROR - fn_Ejecutar - " + ex.ToString(), 4, 3);
            throw ex;
        }
    }
    #endregion

    #region fn_LlamarComponente
    public void fn_LlamarComponente( string _NOM_PC, string _PUERTO, string _ARCHIVO, string _RUTA )
    {
        try
        {
            sIP_PC = _clsUtil.fn_ConversionPC_IP(_NOM_PC);
            Session["sIP"] = sIP_PC;
             //sIP_PC = Session["sIP"].ToString();
            _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "Metodo fn_LlamarComponente", 4, 3);
            //fn_Funcion("fn_Componente('" + sIPLocal + '|' + sPuertoINI + '|' + sRuta + '∟' + Session["sArchivosINI"].ToString()  + "')");
            //fn_Funcion("fn_Componente('" + Session["sArchivosINI"].ToString() + '|' + sPuertoINI + '|' + sRuta + '∟' + sIP_PC + "')");            
            fn_Funcion("fn_Componente('" + _ARCHIVO + '|' + _PUERTO + '|' + _RUTA + '∟' + sIP_PC + "')");            
        }
        catch (Exception ex)
        {
            _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "ERROR - fn_LlamarComponente - " + ex.ToString(), 4, 3);
            lbl_MensajeError.Text = "ERROR EN LLAMAR COMONENTE";
            pnl_Mensajes.Visible = true;
        }
    }
    #endregion

    #region fn_LlamarComponenteMAU
    public void fn_LlamarComponenteMAU(string _NOM_PC, string _PUERTO, string _ARCHIVO, string _RUTA)
    {
        try
        {
            _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "Metodo fn_LlamarComponente", 4, 3);
            fn_Funcion("fn_Componente_mua('" + _ARCHIVO + '|' + _PUERTO + '|' + _RUTA + '∟' + _NOM_PC + "')");
        }
        catch (Exception ex)
        {
            _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "ERROR - fn_LlamarComponenteMAU - " + ex.ToString(), 4, 3);
            lbl_MensajeError.Text = "ERROR EN LLAMAR COMONENTE";
            pnl_Mensajes.Visible = true;
        }
    }
        #endregion

    #region fn_Grabar
    public  void fn_Grabar()
     {
         try
         {
             _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "Metodo Grabar - fn_Grabar", 4, 3);             
             string sTxt_Datos = Request.Form.Get("txt_Datos");
             string sEstado="";
             string[] asTxt_Datos = sTxt_Datos.Split("|".ToCharArray());
             _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "sTxt_Datos - " + sTxt_Datos, 4, 3);
             //asCadena = Session["sIP"].ToString().Split("|".ToCharArray());
             asCadena = Session["sIP"].ToString().Split("|".ToCharArray()); 
             for (int nContador = 0; nContador < asCadena.Length; nContador++)            
             {   //lst_Estaciones.SelectedValue.ToString()
                 sEstado = asTxt_Datos[nContador];
                 fGrabar(Session["sEstacion"].ToString(), 
                        asCadena[nContador],
                        Session["sArchivosINI"].ToString(),
                        Session["sFecha"].ToString(),
                        txt_Version.Text,
                        "XT3665", "OBSERVACION", sEstado, sEstado);
                 //ARREGLO QUE DEVUELVE EL COMPONENTE
                 /* asTxt_Datos = sTxt_Datos.Split("|".ToCharArray());
                  sObjetoStore = Session["sEstacion"].ToString() + "|" + asArchivos[nContador] + "|" +
                                  Session["sFecha"].ToString() + "|" + Session["sFecha"].ToString() + "|" +
                                  "XT3665" + "|" + "OBSERVACION" + "|" + "OK" + "|" + "ACTIVO";
                  _ln_Business.fGrabar_SP("ST_INSERTAR", sParamStore, sObjetoStore, 1);*/
                 
             }  //ACTUALIZAR GRILLA CON LOS DATOS GRABADOS 
             fn_Funcion("fn_ActualizarGrilla()");
             lst_Estaciones.Items.Remove(lst_Estaciones.SelectedItem);//ELIMINO LA ESTACION SELECCIONADA
         }
         catch (Exception ex)
         {
             _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "ERROR - fn_Grabar - " + ex.ToString(), 4, 3);
             lbl_MensajeError.Text = "ERROR EN GRABAR";
             pnl_Mensajes.Visible = true;
         }
     }
        #endregion      

    #region fGrabar
    public void fGrabar(params object[] asParam)
    {
        try
        {
            _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "Metodo Grabar: " + asParam[0], 4, 3);
            asParamStore = sParamStore.Split(",".ToCharArray());
            SqlConnection sqlCon = new SqlConnection(ConfigurationManager.ConnectionStrings["cn"].ConnectionString);
            using (SqlCommand cmd = new SqlCommand("ST_INSERTAR", sqlCon))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(asParamStore[0], SqlDbType.VarChar, 30).Value = asParam[0];
                cmd.Parameters.Add(asParamStore[1], SqlDbType.VarChar, 30).Value = asParam[1];
                cmd.Parameters.Add(asParamStore[2], SqlDbType.VarChar, 30).Value = asParam[2];
                cmd.Parameters.Add(asParamStore[3], SqlDbType.DateTime, 12).Value = asParam[3];
                cmd.Parameters.Add(asParamStore[4], SqlDbType.VarChar, 30).Value = asParam[4];
                cmd.Parameters.Add(asParamStore[5], SqlDbType.Char, 10).Value = asParam[5];
                cmd.Parameters.Add(asParamStore[6], SqlDbType.VarChar, 100).Value = asParam[6];
                cmd.Parameters.Add(asParamStore[7], SqlDbType.Int).Value = asParam[7];
                cmd.Parameters.Add(asParamStore[8], SqlDbType.Int).Value = asParam[8];
                try
                {
                    _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "Abriendo Conexion", 4, 3);
                    sqlCon.Open();
                    cmd.ExecuteNonQuery();                   // return true;
                }
                catch (SqlException)
                {
                    _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "Error en Cerrar Conexion", 4, 3);                   // return false;
                }
                finally
                {
                    _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "Conexion Cerrada OK", 4, 3);
                    sqlCon.Close();
                }
            }
        }
        catch (Exception ex)
        {
            _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "ERROR - fn_Grabar - " + ex.ToString(), 4, 3);
            lbl_MensajeError.Text = "ERROR EN GRABAR";
            pnl_Mensajes.Visible = true;
        }


    }
    #endregion

    #endregion

    public bool fSelect(string _sSelect, int nConexion, string sEstacion)
    {
        try
        {
            sqlCon.fSelect(_sSelect, nConexion, sEstacion);
            return true;
        }
        catch (Exception ex) { return false; throw ex; }
    }


    #region [WebMethod, ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    //MOSTRAR CAMPOS EN LA GRILLA
    [WebMethod, ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public static string GetColumns_Consulta()
    {
        try
        {

            List<ln_EntityGrid> cols = new List<ln_EntityGrid>{
            new ln_EntityGrid{Name="NUM",index="NUM",label="NUM",width=30,align="left",editable=false,editType="text"},
            new ln_EntityGrid{Name="ESTACION",index="ESTACION",label="ESTACION",width=90,align="left",editable=false,editType="text"},
            new ln_EntityGrid{Name="IP",index="IP",label="IP",width=70,align="left",editable=false,editType="text"},
            new ln_EntityGrid{Name="APLICATIVO",index="APLICATIVO",label="APLICATIVO",width=80,align="left",editable=true,editType="text"},
            new ln_EntityGrid{Name="FECHA",index="FECHA",label="FECHA",width=120,align="left",editable=true,editType="text"},
            new ln_EntityGrid{Name="VERSION",index="VERSION",label="VERSION",width=50,align="left",editable=true,editType="text"},
            new ln_EntityGrid{Name="USUARIO",index="USUARIO",label="USUARIO",width=60,align="left",editable=true,editType="text"},
            new ln_EntityGrid{Name="OBSERVACION",index="OBSERVACION",label="OBSERVACION",width=90,align="left",editable=true,editType="text"},
            new ln_EntityGrid{Name="ERROR",index="ERROR",label="ERROR",width=35,align="center",editable=true,editType="text"},
            new ln_EntityGrid{Name="ESTADO",index="ESTADO",label="ESTADO",width=120,align="left",editable=true,editType="text"},         
            };
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            string sJSON = oSerializer.Serialize(cols);
            return sJSON;
        }
        catch (Exception ex) { throw ex; }
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public static JQGridJsonResponse GetPersons(int pPageSize, int pCurrentPage, string pSortColumn, string pSortOrder, string fechaini, string fechafin)
    {
        return GetPersonsJSon(pPageSize, pCurrentPage, pSortColumn, pSortOrder, fechaini, fechafin);
    }
    /*
   [WebMethod]
   public static JQGridJsonResponse GetPersons(int pPageSize, int pCurrentPage, string pSortColumn, string pSortOrder, string fechaini, string fechafin)
   {
       return ln_Class.GetPersonsJSon(pPageSize, pCurrentPage, pSortColumn, pSortOrder, fechaini, fechafin);
   }
*/

    public static JQGridJsonResponse GetPersonsJSon(int pPageSize, int pPageNumber, string pSortColumn, string pSortOrder, string fechaini, string fechafin)
    {
        SqlConnection sqlCon = new SqlConnection(ConfigurationManager.ConnectionStrings["cn"].ConnectionString);
        // SqlConnection sqlCon = new SqlConnection(fConexionLocal());
        SqlCommand cmd = new SqlCommand("[ST_DESPLIEGUE]", sqlCon);

        // SqlDataAdapter da = new SqlDataAdapter("[ST_DESPLIEGUE]", sqlCon);
        //DataTable oDataTable = new DataTable();
        // da.Fill(oDataTable);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.Add("fecha1", SqlDbType.VarChar).Value = fechaini;
        cmd.Parameters.Add("fecha2", SqlDbType.VarChar).Value = fechafin;
        cmd.Parameters.Add("PageSize", SqlDbType.Int).Value = pPageSize;
        cmd.Parameters.Add("CurrentPage", SqlDbType.Int).Value = pPageNumber;
        cmd.Parameters.Add("SortColumn", SqlDbType.VarChar, 20).Value = pSortColumn;
        cmd.Parameters.Add("SortOrder", SqlDbType.VarChar, 4).Value = pSortOrder;
        DataSet dataSet = new DataSet();
        SqlDataAdapter dataAdapter = new SqlDataAdapter(cmd);
        dataAdapter.Fill(dataSet);
        var persons = new List<ln_Entity>();
        foreach (DataRow row in dataSet.Tables[1].Rows)
        {
            ln_Entity person = new ln_Entity
            {
                NUM = row["NUM"].ToString(),
                ESTACION = row["ESTACION"].ToString(),
                IP = row["IP"].ToString(),
                APLICATIVO = row["APLICATIVO"].ToString(),
                FECHA = row["FECHA"].ToString(),
                VERSION = row["VERSION"].ToString(),
                USUARIO = row["USUARIO"].ToString(),
                OBSERVACION = row["OBSERVACION"].ToString(),
                ERROR = row["ERROR"].ToString(),
                ESTADO = row["ESTADO"].ToString(),
            };
            persons.Add(person);
        }

        return new JQGridJsonResponse(
            Convert.ToInt32(dataSet.Tables[0].Rows[0]["PageCount"]),
            Convert.ToInt32(dataSet.Tables[0].Rows[0]["CurrentPage"]),
            Convert.ToInt32(dataSet.Tables[0].Rows[0]["RecordCount"]), persons);
    }

    #endregion

    protected void btnExportar_Click(object sender, ImageClickEventArgs e)
    {

    }

    protected void btn_GrabarMAU_Click(object sender, ImageClickEventArgs e)
    {
        try
        {
            sRuta = HttpUtility.UrlEncode(Request.Form.Get("txt_Origen"));//"c://ftm41//Transactor";//
            if (sRuta != "")
            {
                fLlenarDatos();
                fn_LlamarComponenteMAU(Session["sIP"].ToString(), sPuertoINI, Session["sArchivosINI"].ToString(), sRuta);
            }
            else
            {
                pnl_Mensajes.Visible = true;
                lbl_MensajeError.Text = "Falta Seleccionar Ruta De Origen";
            }
        }
        catch (Exception ex)
        {
            _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "ERROR - btn_GrabarMAU_Click - " + ex.ToString(), 4, 3);
            throw ex;
        }
    }

    protected void btn_ver_MUA_Click(object sender, EventArgs e)
    {
        try
        {
            fn_Grabar();
        }
        catch (Exception ex)
        {
            _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "ERROR - btn_Ver_Click - " + ex.ToString(), 4, 3);
            throw ex;
        }
    }
}