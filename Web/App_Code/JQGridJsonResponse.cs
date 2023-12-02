using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Collections;
using System.Reflection;


/// <summary>
/// Descripción breve de JQGridJsonResponse
/// </summary>
public class JQGridJsonResponse
{

    #region Field

    private int _pageCount;
    private int _currentPage;
    private int _recordCount;
    private List<JQGridItem> _items;
    private int _flagError;
    private string _msgError;

    #endregion

    #region Properties

    /// <summary>
    /// Cantidad de páginas del JQGrid.
    /// </summary>
    public int PageCount
    {
        get { return _pageCount; }
        set { _pageCount = value; }
    }
    /// <summary>
    /// Página actual del JQGrid.
    /// </summary>
    public int CurrentPage
    {
        get { return _currentPage; }
        set { _currentPage = value; }
    }
    /// <summary>
    /// Cantidad total de elementos de la lista.
    /// </summary>
    public int RecordCount
    {
        get { return _recordCount; }
        set { _recordCount = value; }
    }
    /// <summary>
    /// Lista de elementos del JQGrid.
    /// </summary>
    public List<JQGridItem> Items
    {
        get { return _items; }
        set { _items = value; }
    }
    /// <summary>
    /// Si encuentra ERROR
    /// </summary>
    public int FlagError
    {
        get { return _flagError; }
        set { _flagError = value; }
    }
    /// <summary>
    /// MENSAJE ERROR
    /// </summary>
    public string MsgError
    {
        get { return _msgError; }
        set { _msgError = value; }
    }
    #endregion

    #region Active attributes

    /// <summary>
    /// Constructor.
    /// </summary>
    /// <param name="pItems">Lista de elementos a mostrar en el JQGrid</param>
    //public JQGridJsonResponse(int pPageCount, int pCurrentPage, int pRecordCount, List<Consulta> pPersons)
    public JQGridJsonResponse(int pPageCount, 
                              int pCurrentPage,
                              int pRecordCount,
                              List<ln_Entity> pPersons)
    {
        _pageCount = pPageCount;
        _currentPage = pCurrentPage;
        _recordCount = pRecordCount;
        _items = new List<JQGridItem>();
        foreach (ln_Entity person in pPersons)
            _items.Add(new JQGridItem(person.NUM.ToString(),
                        new List<string> { 
                            person.NUM.ToString(), 
                            person.ESTACION.ToString(), 
                            person.IP.ToString(),
                            person.APLICATIVO.ToString(),
                            person.FECHA.ToString(), 
                            person.VERSION.ToString(),
                            person.USUARIO.ToString(), 
                            person.OBSERVACION.ToString(),
                            person.ERROR.ToString(), 
                            person.ESTADO.ToString() }));
    }


    /*
    public JQGridJsonResponse JQGridJsonResponseClass(int pPageCount, int pCurrentPage, int pRecordCount, IList<T> oList)
    {
        JQGridJsonResponse oJqGridJsonResponse = new JQGridJsonResponse();
        try
        {
            Type elementType = typeof(T);

            oJqGridJsonResponse._pageCount = pPageCount;
            oJqGridJsonResponse._currentPage = pCurrentPage;
            oJqGridJsonResponse._recordCount = pRecordCount;

            foreach (T item in oList)
            {
                Hashtable ohashTable = new Hashtable();

                foreach (PropertyInfo propInfo in elementType.GetProperties())
                {
                    if (propInfo.GetValue(item, null) == null)
                    {
                        ohashTable.Add(propInfo.Name, "");
                    }
                    else
                    {
                        ohashTable.Add(propInfo.Name, propInfo.GetValue(item, null).ToString());
                    }
                }
                oJqGridJsonResponse._items.Add(ohashTable);
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }

        return oJqGridJsonResponse;
    }
    */
    #endregion  
}

   