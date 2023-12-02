using System;
using System.Collections.Generic;
//using System.Linq;
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
   public class ln_Business
    {
       
        #region Constructor

        public ln_Business() { }

        #endregion

        #region Declaraciones

        ln_Class sqlCon = new ln_Class();
        clsUtil _clsUtil = new clsUtil();        
        private string sCarpetaLOG;

        #endregion

        #region Propiedades       

        public string CarpetaLOG
        {
            get { return sCarpetaLOG; }
            set { sCarpetaLOG = value; }
        }
       

  
        #endregion

        #region Procedimientos

        #region °   FUNCION SP  °

        public DataTable fListar_DataTable_SP(string sStoreProc,string sParamStore, string sObjetoStore, int nConexion)
        {
            try
            {                
                DataTable oDt = new DataTable();
                sqlCon.fPreparaStore(sStoreProc, sParamStore, sObjetoStore, nConexion);
                oDt = sqlCon.fLeerStore();
                return oDt;
            }
            catch (Exception ex) { return null; throw ex; }
        }

        public bool fListar_WEB_SP(GridView oDataGrid, string sStoreProc, string sParamStore, string sObjetoStore, int nConexion)
        {
            try
            {
                sqlCon.fPoblarGridView(oDataGrid, sStoreProc, sParamStore, sObjetoStore, nConexion);
                return true;
            }
            catch (Exception ex) { return false; throw ex; }
        }
       //params object[] sParam
        public bool fGrabar_SP(string sStoreProc,string sParamStore, string sObjetoStore, int nConexion)
        {
            try
            {
               // _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "Metodo fGrabar_SP : " + sObjetoStore, 4, 3);
                bool bPreparaStore = sqlCon.fPreparaStore(sStoreProc, sParamStore, sObjetoStore, nConexion);
                /*if (bPreparaStore == true)
                    _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "Metodo fGrabar_SP : bPreparaStore OK", 4, 3);
                else
                    _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "Metodo fGrabar_SP : bPreparaStore INCORRECTO", 4, 3);  
                bool bEjecutarStore = sqlCon.fEjecutarStore();
                if (bEjecutarStore == true)
                    _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "Metodo fGrabar_SP : bEjecutarStore OK", 4, 3);  
                else
                    _clsUtil.fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "Metodo fGrabar_SP : bEjecutarStore INCORRECTO", 4, 3);  
                */
                return true;
            }
          
            catch (Exception ex) {
               // _clsUtil.fCrearLogErrores(CarpetaLOG, "DESPLIEGUE", "ERROR - fn_Grabar - " + ex.ToString(), 4, 3); 
                return false; throw ex;
            }
        }     

        public string fTraerParametro(int nConexion, string _sSelect, string sColumna)
        {
            try
            {
                return sqlCon.fSelect_String(nConexion, _sSelect, sColumna);
            }
            catch (Exception ex)
            { return "0"; throw ex; }
        }     

        #endregion

        #region :   LISTAR  :


        public bool fListar_GridView(GridView oDataGrid, string _sSelect, int nConexion)
        {
            try
            {
                sqlCon.fSelect_GridView(oDataGrid, _sSelect, nConexion, "");
                return true;
            }
            catch (Exception ex) { return false; throw ex; }
        }         

        public DataTable fListar_DataTable(string sSelect, int nConexion)
        {
            try
            {
                DataTable oDataTable = new DataTable();
                oDataTable = sqlCon.fPoblar_DataTable(sSelect,  nConexion);                
                return oDataTable;
            }
            catch (Exception ex)  { return null; throw ex;         }
        }

        public bool fSelect(string _sSelect, int nConexion, string sEstacion)
        {
            try
            {
                sqlCon.fSelect(_sSelect, nConexion, sEstacion);
                return true;
            }
            catch (Exception ex) { return false; throw ex; }
        }
        #endregion          

        #endregion

    }
}
