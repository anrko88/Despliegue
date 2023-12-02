using System;
using System.Collections.Generic;
using System.Text;

using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Windows.Forms;
using System.IO.Ports;
using System.IO;
using System.Net;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Collections;
using System.Data.SqlClient;
using Microsoft.VisualBasic;
using System.Drawing.Printing;
using System.Xml;
using DATA_LAYER;
using System.Net.NetworkInformation;
/// <summary>
/// Summary description for clsUtil
/// </summary>
public class clsUtil
{
    #region Constructor
    public clsUtil()
    {
        //
        // TODO: Add constructor logic here
        //
    }
    #endregion

    #region Declaraciones

    
    ln_Class objConexion = new ln_Class();
    public string sCarpetaLOG = @"C:\AGM_LOG\";
    public string sParametroTXT;
    public string sNombreArchivo;
    public string sLinea;
    public string sRutaFile;
    public string sTituloEmpresa = "    :::     AGM SOLUCTION SRL   ::: ";  
    public DateTime dtFecha = DateTime.Now;
    public string sFecha = DateTime.Now.ToShortTimeString();
    #endregion

    #region Fecha - Hora
    public string fFechaFormat(string sFormat)
    {
        try
        {
            return Convert.ToString(dtFecha.ToString(sFormat));
        }
        catch (Exception ex) { throw ex; }
    }

    public string fFechaActual()
    {
        try
        {
            return Convert.ToString(dtFecha.ToString("yyyy-MM-dd"));
        }
        catch (Exception ex) { throw ex; }
    }

    public string fHoraActual()
    {
        try
        {
            return Convert.ToString(DateTime.Now.ToString("hh:mm:ss"));
        }
        catch (Exception ex) { throw ex; }
    }

    public string fFechaHora()
    {
        try
        {
            return fFechaActual() + " - " + fHoraActual();
        }
        catch (Exception ex) { throw ex; }
    }

    #endregion 

    #region Crear Log


    public bool fCrearCarpeta(string sNomCarpeta)
    {
        try
        {
            System.IO.DirectoryInfo objCarpeta = new System.IO.DirectoryInfo(sNomCarpeta);
            if (!objCarpeta.Exists)
            {
                objCarpeta.Create();
            }
            return true;
        }
        catch (Exception ex) { throw ex; }
    }
    //@"C:\AGM_LOG\
    public bool fCrearLog(string sNomCarpeta, string sNomArchivo, string sDetalle, int iIndArc, int nIndDelete)
    {
        try
        {
            if (iIndArc == 1)            
                sNombreArchivo = sNomCarpeta + Convert.ToString(dtFecha.ToString("yyyy-MM-dd")) + " - " + sNomArchivo + ".txt";            
            else if (iIndArc == 2)
                sNombreArchivo = sNomCarpeta + Convert.ToString(dtFecha.ToString("yyyy-MM-dd")) + " - " + sNomArchivo;            
            else if (iIndArc == 3)
                sNombreArchivo = sNomCarpeta + sNomArchivo + ".txt";
            else if (iIndArc == 4)
                sNombreArchivo = sNomCarpeta + fFechaActual() + " - " + sNomArchivo+ ".txt";

            //Verificamos si el Archivo Existe
            if (!File.Exists(sNombreArchivo))//Si no existe...
            {
                FileStream fs = new FileStream(sNombreArchivo, FileMode.Create, FileAccess.Write);
                StreamWriter sw = new StreamWriter(fs);
                sw.WriteLine(fHoraActual() + " : " + sDetalle.ToString());
                sw.Close();
            }
            else
            {
                if (nIndDelete == 1)
                {
                    File.Delete(sNombreArchivo); //Si Existe Borramos
                    StreamWriter sw = File.AppendText(sNombreArchivo);
                    sw.WriteLine(sDetalle);
                    sw.Close();
                }
                else if (nIndDelete == 2)       // ARCHIVO NUEVO
                {
                    StreamWriter sw = File.AppendText(sNombreArchivo);
                    sw.WriteLine(sDetalle);
                    sw.Close();
                }
                else if (nIndDelete == 3)       //  ABRIR Y GRABAR
                {
                    StreamWriter sw = new System.IO.StreamWriter(sNombreArchivo, true);
                    sw.WriteLine(fHoraActual() + " : " + sDetalle);
                    sw.Close();
                }
            }
            return true;
        }
        catch (Exception ex) { throw ex; }
    }

    public bool fCrearLogErrores(string sNomCarpeta, string sTxnName, string sDetalle, int iIndArc, int nIndDelete)
    {
        try
        {
            fCrearCarpeta(sNomCarpeta);
            fCrearLog(sNomCarpeta,sTxnName, sDetalle, iIndArc, nIndDelete);
            return true;
        }
        catch (Exception ex) { throw ex; }
    }

    public string fArchivo(string sNomArchivo)
    {
        return fFechaActual() + " - " + sNomArchivo + ".txt";
    }
    #endregion

    #region fLeerParametrosIniciales

    public bool fLeerParametrosIniciales()
    {
        try
        {
            fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "Metodo fLeerParametrosIniciales", 4, 3);
            string sRutaFile = HttpContext.Current.Server.MapPath("SYS.INI").ToString();            
            //string sRutaFile = Path.GetFullPath("ParametrosIniciales.txt");
            StreamReader stmReader = new StreamReader(sRutaFile);
            stmReader.BaseStream.Position = 0;

            while (!stmReader.EndOfStream)
            {
                sLinea = stmReader.ReadLine();
                if (sLinea.Trim() == "[PARAMETROS]") { sParametroTXT = sLinea; }            
                #region    [PARAMETROS]
                else if (sParametroTXT == "[PARAMETROS]")
                {
                    if (sLinea.Trim() != "")
                    {
                        string[] asLinea = sLinea.Trim().Split(":".ToCharArray());

                        switch (asLinea[0])
                        {
                            case "SERVIDOR":
                                objConexion.Server = asLinea[1].ToString().Trim();
                                break;
                            case "BD":
                                objConexion.BD = asLinea[1].ToString().Trim();
                                break;
                            case "USUARIO":
                                objConexion.User = asLinea[1].ToString().Trim();
                                break;
                            case "PASS":
                                objConexion.Password = asLinea[1].ToString().Trim();
                                break;
                        }
                    }
                }
                #endregion       
            }
            return true;
        }
        catch (Exception ex) {
            fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "Error - Metodo fLeerParametrosIniciales - " + ex.ToString(), 4, 3);
            throw ex; 
        }
    }
    
    #endregion


    #region fLeerParametros
    public string fLeerParametros(string sMetodo, string sNombreDelimitador)
    {
        try
        {

            fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "Metodo "+ sMetodo, 4, 3);
            string sRutaFile = HttpContext.Current.Server.MapPath("SYS.INI").ToString();
            StreamReader stmReader = new StreamReader(sRutaFile);
            stmReader.BaseStream.Position = 0;
            string sCadena = "", sLinea = "", sParametroTXT = "";
            while (!stmReader.EndOfStream)
            {
                sLinea = stmReader.ReadLine();
                if (sLinea.Trim() == sNombreDelimitador) { sParametroTXT = sLinea; }
                #region    [TRANSACTOR]
                else if (sParametroTXT == sNombreDelimitador)
                {
                    if (sLinea.Trim() == "")
                        break;
                    if (sLinea.Trim() != "" && sLinea.Trim() != sNombreDelimitador)
                    {
                        if (sLinea.Trim() != "" && sCadena == "")
                            sCadena = sLinea.Trim();
                        else
                            sCadena = sCadena + "|" + sLinea.Trim();
                    }
                }
                #endregion
            }
            return sCadena;
        }
        catch (Exception ex)
        {
            fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "Error - Metodo " + sMetodo, 4, 3); throw ex;
        }
    }
    #endregion

    #region fn_ConversionPC_IP
    public string fn_ConversionPC_IP(string sNombrePC)
    {
        try
        {
            IPHostEntry IPs = Dns.GetHostByName(sNombrePC);
            return IPs.AddressList[0].ToString(); ;
        }
        catch (Exception ex)
        {
            fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "ERROR - Metodo fn_ConversionPC_IP - " + ex.ToString(), 4, 3);
            throw ex;
        }
    }
    #endregion

    #region fn_IPLOCAL
    public string fn_IPLOCAL()
    {
        try
        {
            IPHostEntry host;
            string sLocalIP = "";
            host = Dns.GetHostEntry(Dns.GetHostName());
            foreach (IPAddress ip in host.AddressList)
            {
            if (ip.AddressFamily.ToString() == "InterNetwork")        
                sLocalIP = ip.ToString();
            }
            return sLocalIP;
        }
        catch (Exception ex)
        {
            fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "Error - Metodo fn_IPLOCAL", 4, 3); throw ex;
        }
    }
    #endregion

    #region fn_Concatenar
    public string fn_Concatenar(string sMetodo, string aCadena)
    {
        try
        {
            string sCadena = "";
            string[] asCadena = aCadena.Split("|".ToCharArray());
            fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "Metodo " + sMetodo, 4, 3);
            for (int nContador = 0; nContador < asCadena.Length; nContador++)
            {
                if (sCadena == "")
                    sCadena = asCadena[nContador];
                else
                    sCadena = sCadena + "|" + asCadena[nContador];
            }
            return sCadena;
        }
        catch (Exception ex)
        {
            fCrearLogErrores(sCarpetaLOG, "DESPLIEGUE", "ERROR - " + sMetodo + " - " + ex.ToString(), 4, 3); throw ex;                       
        }
    }
    #endregion
   
}

