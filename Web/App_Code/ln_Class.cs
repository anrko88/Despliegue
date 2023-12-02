using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using System.Windows.Forms;
using Microsoft.VisualBasic;
using System.IO.Ports;
using System.IO;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;

namespace DATA_LAYER
{
    #region clsFunciones

    public class ln_Funciones
    {
        
        public string fStrLeft(string sCadena, int nCaracteres)
        {
            return sCadena.Substring(0, nCaracteres);
        }

        public string fStrRigth(string sCadena, int nCaracteres)
        {
            return sCadena.Substring(sCadena.Length - nCaracteres, nCaracteres);
        }

        public string fStrIF(bool bCondicion, string sVerdadero, string sFalso)
        {
            if (bCondicion)
            {
                return sVerdadero;
            }
            else
            {
                return sFalso;
            }
        }

    }

    #endregion

  
    public class ln_Class
    {

        #region Constructor

        public ln_Class() { }

        #endregion

        #region Declaraciones

        //VARIABLES - BEGIN
        public string sCarpetaLOG = @"C:\AGM_LOG\";
       // clsUtil _clsUtil = new clsUtil();
        ln_Funciones _ln_Funciones = new ln_Funciones();
        public SqlConnection cn;
        public string v_ConexionString;
        public byte bConected;
        public SqlCommand sqlCmd;
        public string sMensaje;
        public string strMensajeConeccion;
        public string sParamStoreOut;
        public string sMensajeOut;
        public string sMensajeErrorCN = "ERROR EN CONEXION ";
        //VARIABLES - END
     
        //   LOCAL
        private static string sServer;
        private static string sBD;
        private static string sUser;
        private static string sPassword;

        private static string sEstacion;
        private static string sBaseDeDatos;     
        #endregion


        #region Propiedades
       
        #region   LOCAL
        public string Server
        {
            get { return sServer; }
            set { sServer = value; }
        }  
        public string BD
        {
            get { return sBD; }
            set { sBD = value; }
        }  
        public string User
        {
            get { return sUser; }
            set { sUser = value; }
        }        
        public string Password
        {
            get { return sPassword; }
            set { sPassword = value; }
        }


        public string Estacion
        {
            get { return sEstacion; }
            set { sEstacion = value; }
        }

        public string BaseDeDatos
        {
            get { return sBaseDeDatos; }
            set { sBaseDeDatos = value; }
        }
        #endregion


        #endregion

        #region Procedimientos

        #region CONEXION

        public string fConexionEstacion()
        {
            try
            {
                return v_ConexionString = "server=" + sEstacion + ";Integrated security=SSPI;Database=" + sBaseDeDatos + "; Trusted_Connection=true;Asynchronous Processing=true;Connect Timeout=5;";
                //return v_ConexionString = "Data Source=" + sEstacion + ";Password=" + sPassword + " ;User ID=" + sUser + ";Initial Catalog=" + sBD + "";
            }
            catch (Exception ex)
            {
                return sMensajeErrorCN + sEstacion;
                throw ex;
            }
        }

        public static string fConexionLocal()
        {
            try
            {
                string v_ConexionString;
                return v_ConexionString = "Data Source=" + sServer +
                                          ";    Password=" + sPassword +
                                          " ;   User ID=" + sUser +
                                          ";    Initial Catalog=" + sBD + ""; //+
                                               // ";Trusted_Connection=true";
            }
            catch (Exception ex)
            {
               // return sMensajeErrorCN + sServer;
                throw ex;
            }
        }
        #endregion

        public bool fDesconecta()
        {
            try
            {
                if (cn != null)
                {
                    if (cn.State == ConnectionState.Open)
                        cn.Close();

                    cn.Dispose();
                    cn = null;
                }
                return true;
            }
            catch { cn.Close(); return false; }
        }
        public bool fConecta(string sEstacion)
        {
            try
            {
                bConected = 0;
                if (cn == null)
                    cn = new SqlConnection(fConexionEstacion());

                cn.Open();
                bConected = 1;
                return true;
            }
            catch { cn.Close(); return false; }
        }
        #region CONECTA
        public object fConectaEstacion()
        {
            try
            {
                bConected = 0;
                if (cn == null)
                {
                    cn = new SqlConnection(fConexionEstacion());
                }
                cn.Open();
                bConected = 1;
                return cn;
            }
            catch (Exception ex)
            {
                strMensajeConeccion = "EN ESTOS MOMENTOS EL SERVICIO NO ESTA DISPONIBLE !!!";
                return null;
                throw ex;
            }
        }
        public object fConectaLocal()
        {
            try
            {
                bConected = 0;
                if (cn == null)
                {
                    cn = new SqlConnection(fConexionLocal());
                }
                cn.Open();
                bConected = 1;
                return cn;
            }
            catch (Exception ex)
            {
                //_clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", sMensajeErrorCN + " : fConexionLocal() - " + ex.ToString(), 4, 3);
                //strMensajeConeccion = "EN ESTOS MOMENTOS EL SERVICIO NO ESTA DISPONIBLE !!!";
                return null;
                throw ex;
            }
        }

        public bool fConexiones(int nConexion, string sEstacion)
        {
            try
            {
                switch (nConexion)
                {
                    case 1: fConectaLocal(); break;               
                    case 0: fConectaEstacion(); break;                   
                }
                return true;
            }
            catch (Exception ex) { fDesconecta(); return false; throw ex; }
        }
        #endregion


      /*  public static JQGridJsonResponse GetPersonsJSon(int pPageSize, int pPageNumber, string pSortColumn, 
            string pSortOrder, string fechaini, string fechafin,List<ln_Entity> pPersons)
        {
            DataSet dataSet = new DataSet();
            SqlHelper.ExecuteDataset(fConexionLocal(), "usp_ListadoAlumnos");
            return new JQGridJsonResponse(
           Convert.ToInt32(dataSet.Tables[0].Rows[0]["PageCount"]),
           Convert.ToInt32(dataSet.Tables[0].Rows[0]["CurrentPage"]),
           Convert.ToInt32(dataSet.Tables[0].Rows[0]["RecordCount"]), pPersons);

        }*/

        #region PROCEDIMIENTOS ALMACENADOS

        public bool fPreparaStore(string sNombreProcedimiento, string sParamStore, string sObjetoStore, int nConexion)
        {
            try
            {
                //_clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "fPreparaStore : " +sNombreProcedimiento, 4, 3);
                //Abre la coneccion a la base de datos        
                if (nConexion == 1)
                    fConectaLocal();              

                sqlCmd = new SqlCommand(sNombreProcedimiento, cn);
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandTimeout = 30;//0
                //Preguntamos si estamos enviando parametros o no
                sParamStoreOut = null;
                string sValorOut = "".PadLeft(1000);

                if (sParamStore != "")
                {
                    //Convierte los parametros de tipo string a una matriz   
                    string[] asParamStore = sParamStore.Split(",".ToCharArray());
                    string[] asObjetoStore = sObjetoStore.Split("|".ToCharArray());
                    for (int nContador = 0; nContador < asParamStore.Length; nContador++)
                    {
                        if (_ln_Funciones.fStrRigth(asParamStore[nContador], 1) == "*")
                        {
                            sParamStoreOut = _ln_Funciones.fStrLeft(asParamStore[nContador], asParamStore[nContador].Length - 1);
                            sqlCmd.Parameters.AddWithValue(sParamStoreOut, sValorOut).Direction = ParameterDirection.InputOutput;
                        }
                        else
                        {
                            sqlCmd.Parameters.AddWithValue(asParamStore[nContador], asObjetoStore[nContador]);
                        }
                    }
                }
                return true;
            }
            catch (Exception ex)
            {
                fDesconecta();
                return false;
                throw ex;
            }
        }
        
        public bool fEjecutarStore()
        {
            try
            {
                sqlCmd.ExecuteNonQuery();
                if (sParamStoreOut != null)
                {
                    sMensajeOut = sqlCmd.Parameters[sParamStoreOut].Value.ToString();
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
            finally
            {
                //Cierra la coneccion a la base de datos
                fDesconecta();
            }
        }

        public DataTable fLeerStore()
        {
            try
            {
                //SqlAdapter utiliza el SqlCommand para llenar el DataTable
                SqlDataAdapter sqlDap = new SqlDataAdapter(sqlCmd);
                //Se llena el DataTable
                DataTable sqlDt = new DataTable();
                sqlDap.Fill(sqlDt);
                if (sParamStoreOut != null)
                {
                    sMensajeOut = sqlCmd.Parameters[sParamStoreOut].Value.ToString();
                }
                //Se retorna el objeto DataTable con los resultados
                return sqlDt;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                //Cierra la coneccion a la base de datos
                fDesconecta();
            }
        }

        public void fMensaje(DataTable oDataTable)
        {
            try
            {
                if (oDataTable.Rows.Count == 0)
                    sMensaje = "NO HAY RESULTADOS PARA ESTA CONSULTA.";
                else
                    sMensaje = "TOTAL DE REGISTROS: " + oDataTable.Rows.Count;
            }
            catch (Exception ex)
            { throw ex; }
        }

        public DataTable fPoblar_DataTable_SP(DataTable oDataTable, string sNombreStore, string sParamSql, string sObjetosForm, int nConexion)
        {
            try
            {
                DataTable oDataTable2 = new DataTable();
                fPreparaStore(sNombreStore, sParamSql, sObjetosForm, nConexion);
                oDataTable2 = fLeerStore();
                oDataTable = oDataTable2;
                fMensaje(oDataTable);
                return oDataTable;
            }
            catch (Exception ex) { return null; throw ex; }
        }

        public DataTable fPoblar_DataTable(string sNombreSelect, int nConexion)
        {
            try
            {
                fConexiones(nConexion, sEstacion);
                DataTable oDataTable = new DataTable();
                SqlDataAdapter da = new SqlDataAdapter(sNombreSelect, cn);
                da.Fill(oDataTable);
                fDesconecta();
                return oDataTable;
            }
            catch (Exception ex) { return null; throw ex; }
        }

        #endregion                        
        
        #region PLATAFORMA WINDOWS


        public bool fSelect(string sNombreSelect, int nConexion, string sEstacion)
        {
            try
            {
                fConexiones(nConexion, sEstacion);
                DataTable oDataTable = new DataTable();
                SqlDataAdapter da = new SqlDataAdapter(sNombreSelect, cn);
                da.Fill(oDataTable);
                fDesconecta();
                return true;
            }
            catch (Exception ex) { fDesconecta(); return false; throw ex; }
        }
  

        public string fSelect_String(int nConexion, string sNombreSelect, string sColumna)
        {
            try
            {
                fConexiones(nConexion, sEstacion);
                SqlDataAdapter da = new SqlDataAdapter(sNombreSelect, cn);
                DataTable oDataTable = new DataTable();
                da.Fill(oDataTable);
                fDesconecta();
                string sValor = oDataTable.Rows[0][Int32.Parse(sColumna)].ToString();
                if (sValor != "")
                    return sValor;
                else
                    return "";
            }
            catch (Exception ex) { fDesconecta(); return ""; throw ex; }
        }

        #endregion

        #region PLATAFORMA WEB


        public bool fPoblarDataGrid(DataGridView oDataGrid, string sNombreStore, string sParamSql, string sObjetosForm, int nConexion)
        {
            try
            {
                DataTable oDataTable = new DataTable();
                fPreparaStore(sNombreStore, sParamSql, sObjetosForm, nConexion);
                oDataTable = fLeerStore();
                //Poblamos el Objeto GridView
                oDataGrid.DataSource = oDataTable;
                //Llamamos a la clase que dira el mensaje si hay o no resultados
                fMensaje(oDataTable);
                return true;
            }
            catch (Exception ex)     
            {
                return false;
                throw ex;
            }        }


        public bool fSelect_GridView(GridView oDataGrid, string sNombreSelect, int nConexion, string sEstacion)
        {
            try
            {
                fConexiones(nConexion, sEstacion);
                DataTable oDataTable = new DataTable();
                SqlDataAdapter da = new SqlDataAdapter(sNombreSelect, cn);
                da.Fill(oDataTable);
                oDataGrid.DataSource = oDataTable;
                oDataGrid.DataBind();

                fDesconecta();
                return true;
            }
            catch (Exception ex) { fDesconecta(); return false; throw ex; }
        }
        
        #endregion

        #region '   PROC STORE  '
        
      
        public bool fPoblarGridView(GridView oDataGrid, string sNombreStore, string sParamSql, string sObjetosForm, int nConexion)
        {
            try
            {
                DataSet oDataSet = new DataSet();
                DataTable oDataTable = new DataTable();
                fPreparaStore(sNombreStore, sParamSql, sObjetosForm, nConexion);
                oDataTable = fLeerStore();
                //Poblamos el Objeto GridView
                oDataGrid.DataSource = oDataTable;
                oDataGrid.DataBind();
                //Llamamos a la clase que dira el mensaje si hay o no resultados
                fMensaje(oDataTable);
                return true;
            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
        }
     
        public bool fPoblarDataList(DataList oDataList, string sNombreStore, string sParamSql, string sObjetosForm, int nConexion)
        {
            try
            {
                DataTable oDataTable = new DataTable();
                fPreparaStore(sNombreStore, sParamSql, sObjetosForm, nConexion);
                oDataTable = fLeerStore();
                //Poblamos el Objeto DataList
                oDataList.DataSource = oDataTable;
                oDataList.DataBind();
                //Llamamos a la clase que dira el mensaje si hay o no resultados
                fMensaje(oDataTable);
                return true;
            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
        }
      
        public bool fPoblarDetailsView(DetailsView oDetailsView, string sNombreStore, string sParamSql, string sObjetosForm, int nConexion)
        {
            try
            {
                DataTable oDataTable = new DataTable();
                fPreparaStore(sNombreStore, sParamSql, sObjetosForm, nConexion);
                oDataTable = fLeerStore();
                //Poblamos el Objeto DetailsView
                oDetailsView.DataSource = oDataTable;
                oDetailsView.DataBind();
                //Llamamos a la clase que dira el mensaje si hay o no resultados
                fMensaje(oDataTable);
                return true;
            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
        }
     
        #endregion                      

        #endregion
   
    }
}

