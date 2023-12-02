using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descripción breve de JQGridItem
/// </summary>
public class JQGridItem
{
    #region Passive attributes

    private string _RowId;
    private List<string> _row;

    #endregion

    #region Properties

    /// <summary>
    /// RowId de la fila.
    /// </summary>
    public string RowId
    {
        get { return _RowId; }
        set { _RowId = value; }
    }
    /// <summary>
    /// Fila del JQGrid.
    /// </summary>
    public List<string> Row
    {
        get { return _row; }
        set { _row = value; }
    }

    #endregion

    #region Active Attributes

    /// <summary>
    /// Contructor.
    /// </summary>
    public JQGridItem(string pId, List<string> pRow)
    {
        _RowId = pId;
        _row = pRow;
    }

    #endregion
}