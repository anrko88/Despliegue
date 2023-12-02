//****************************************************************
// Funcion		:: 	Fn_util_ReturnValidDecimal6
// Descripción	::	Devuelve un String de un número con seis decimales, si es un número válido, sino
//                  devuelve una cadena vacía.
//                  Si el número de cifras decimales es menor, lo completa con ceros.
//                  Utiliza la libreria jquery jquery.numberformatter-1.2.3.js.
// Parámetro    ::
//                  number : String con un número válido o un valor nulo.

// Log			:: 	EBL - 25/02/2012
//****************************************************************
function Fn_util_ReturnValidDecimal6(numberString) {
    // Prefijo si se va a devolver el símbolo de moneda.
    var prefix = "S/. ";
    // Valor a retornar si el dato de la celda es null.
    var nullValue = "";

    // Evalua los posibles datos null
    if (isNaN(numberString) || numberString == "" || numberString == null || numberString == undefined) {
        return nullValue;
    }
    else {
        // Se utiliza la función de jquery que permite usar una formato para el número
        // (valor a ser evaluado, máscara a usar para el formato, tipo de formato local devuelto)
        var validDecimal = $.formatNumber(numberString, { format: "#,###.000000", locale: "us" });

        // Concatena el prefijo y el valor numérico con formato.
        return prefix + validDecimal;
    }
}

//****************************************************************
// Funcion		:: 	Fn_util_ReturnValidDecimal2
// Descripción	::	Devuelve un String de un número con dos decimales, si es un número válido, sino
//                  devuelve una cadena vacía.
//                  Si el número de cifras decimales es menor, lo completa con ceros.
//                  Utiliza la libreria jquery jquery.numberformatter-1.2.3.js.
// Parámetro    ::
//                  number : String con un número válido o un valor nulo.
//
// Log			:: 	EBL - 25/02/2012
//****************************************************************
function Fn_util_ReturnValidMoneda2(numberString) {
    // Prefijo si se va a devolver el símbolo de moneda.
    var prefix = "S/. ";
    // Valor a retornar si el dato de la celda es null.
    var nullValue = "";

    // Evalúa los posibles datos null
    if (isNaN(numberString) || numberString == "" || numberString == null || numberString == undefined) {
        return nullValue;
    }
    else {
        // Se utiliza una función de jquery que permite usar una formato para el número
        // (valor a ser evaluado, máscara a usar para el formato, tipo de formato local devuelto)
        var validDecimal = $.formatNumber(numberString, { format: "#,###.00", locale: "us" });

        // Concatena el prefijo y el valor numérico con formato.
        return prefix + validDecimal;
    }
}

//****************************************************************
// Funcion		:: 	Fn_util_ReturnValidDecimal2
// Descripción	::	Devuelve un String de un número con dos decimales, si es un número válido, sino
//                  devuelve una cadena vacía.
//                  Si el número de cifras decimales es menor, lo completa con ceros.
//                  Utiliza la libreria jquery jquery.numberformatter-1.2.3.js.
// Parámetro    ::
//                  number : String con un número válido o un valor nulo.
//
// Log			:: 	EBL - 25/02/2012
//****************************************************************
function Fn_util_ReturnValidDecimal2(numberString) {
    // Prefijo si se va a devolver el símbolo de moneda.
    var prefix = "";
    // Valor a retornar si el dato de la celda es null.
    var nullValue = "";

    // Evalúa los posibles datos null
    if (isNaN(numberString) || numberString == "" || numberString == null || numberString == undefined) {
        return nullValue;
    }
    else {
        // Se utiliza una función de jquery que permite usar una formato para el número
        // (valor a ser evaluado, máscara a usar para el formato, tipo de formato local devuelto)        
        var amt = fn_util_ValidaDecimal(numberString);
        var validDecimal = amt.toFixed(2);
        validDecimal = fn_util_ValidaMonto(validDecimal,2);
        
        // Concatena el prefijo y el valor numérico con formato.
        return prefix + validDecimal;
    }
}

//****************************************************************
// Funcion		:: 	Fn_util_ReturnValidDecimal3
// Descripción	::	Devuelve un String de un número con dos decimales, si es un número válido, sino
//                  devuelve una cadena vacía.
//                  Si el número de cifras decimales es menor, lo completa con ceros.
//                  Utiliza la libreria jquery jquery.numberformatter-1.2.3.js.
// Parámetro    ::
//                  number : String con un número válido o un valor nulo.
//
// Log			:: 	AEP - 01/08/2012
//****************************************************************
function Fn_util_ReturnValidDecimal3(numberString) {
   
    // Valor a retornar si el dato de la celda es null.
    var nullValue = "";

    // Evalúa los posibles datos null
    if (isNaN(numberString) || numberString == "" || numberString == null || numberString == undefined) {
        return nullValue;
    }
    else {
        // Se utiliza una función de jquery que permite usar una formato para el número
        // (valor a ser evaluado, máscara a usar para el formato, tipo de formato local devuelto)        
       var validDecimal = $.formatNumber(parseFloat(numberString).toFixed(2), { format: "#,###.000000", locale: "us" });
    	
        
        
        // Concatena el prefijo y el valor numérico con formato.
        return validDecimal;
    }
}

//****************************************************************
// Función		:: 	Fn_util_ReturnValidDate
// Descripción	::	Devuelve un String de una fecha en formato 'dd/MM/yyyy', si es una fecha válida, sino
//                  devuelve una cadena vacía.
//                  Utiliza la libreria jquery jquery.dateFormat-1.0.js.
//
// Parámetro    ::
//                  dateString : String con una fecha válida o un valor nulo.
//
// Log			:: 	EBL - 25/02/2012
//****************************************************************
function Fn_util_ReturnValidDate(dateString) {
    // Evalua los posibles datos null
    if (dateString == "" || dateString == null || dateString == undefined || (dateString.substr(0, 10)).toString() == "01/01/1900") {
        return "";
    }
    else {
        // Toma los valores de fecha 
        // (descarta los datos de tiempo - hora, minuto, segundo - recibidos)
        var sDate = dateString.substr(0, 10);
        var vDate = sDate.split("/");
        // Compone un nuevo dato fecha, a nivel javascript
        var date = new Date(vDate[2], vDate[1] - 1, vDate[0]);

        // Se utiliza la función de jquery que permite usar una formato para la fecha
        // (convierte la fecha en String, mascara a utilizar)
        return $.format.date(date.toString(), "dd/MM/yyyy");
    }
}

//****************************************************************
// Función		:: 	Fn_util_ReturnValidDateTime
// Descripción	::	Devuelve un String de una fecha en formato 'dd/MM/yyyy hh:mm:ss', si es una fecha válida, sino
//                  devuelve una cadena vacía.
//                  Utiliza la libreria jquery jquery.dateFormat-1.0.js.
//
// Parámetro    ::
//                  dateString : String con una fecha válida o un valor nulo.
//
// Log			:: 	EBL - 25/02/2012
//****************************************************************
function Fn_util_ReturnValidDateTime(dateString) {
    // Evalua los posibles datos null
    if (dateString == "" || dateString == null || dateString == undefined || (dateString.substr(0, 10)).toString() == "01/01/1900") {
        return "";
    }
    else {
        // Toma los valores de fecha 
        // (descarta los datos de tiempo - hora, minuto, segundo - recibidos)
        var sDate = dateString.substr(0, 10);
        var sTime = dateString.substr(10, 14);
        var vDate = sDate.split("/");
        // Compone un nuevo dato fecha, a nivel javascript
        var date = new Date(vDate[2], vDate[1] - 1, vDate[0]);

        // Se utiliza la función de jquery que permite usar una formato para la fecha
        // (convierte la fecha en String, mascara a utilizar)
        return $.format.date(date.toString(), "dd/MM/yyyy") + sTime;
    }
}

//****************************************************************
// Funcion		:: 	Fn_util_ValidaMontoNull
//****************************************************************
function Fn_util_ValidaMontoNull(numberString) {
    // Valor a retornar si el dato de la celda es null.
    //if (isNaN(numberString)) {}
    var nullValue = "0.00";
        
    if (numberString == "" || numberString == null || numberString == undefined) {        
        return nullValue;
    }
    else {
        return numberString;
    }
}


//****************************************************************
// Función		:: 	fn_util_ValidaFecha
//****************************************************************
function fn_util_ValidaStringFecha(dateString) {    
    //Valores Nulos    
    if (dateString == "" || dateString == null || dateString == undefined) {
        return "";
    }
    //Fecha por Defecto
    else if ((dateString.substr(0, 10)).toString() == "19000101") {
        return "";
    }
    //Formatea
    else {
        //Corta Fecha
        var strAnio = dateString.substr(0, 4);        
        var strMes = dateString.substr(4, 2);
        var strDia = dateString.substr(6, 2);
        var strFecha = strDia + "/" + strMes + "/" + strAnio;        
        return strFecha;
    }
}

//****************************************************************
// Función		:: 	Fn_util_ReturnValidDate
//****************************************************************
function fn_util_ValidaStringFechaHora(dateString) {
    //Valores Nulos    
    if (dateString == "" || dateString == null || dateString == undefined) {
        return "";
    }
    //Fecha por Defecto
    else if ((dateString.substr(0, 10)).toString() == "19000101") {
        return "";
    }
    //Formatea
    else {
        //Corta Fecha
        var strAnio = dateString.substr(0, 4);
        var strMes = dateString.substr(4, 2);
        var strDia = dateString.substr(6, 2);
        var strHora = dateString.substr(8, 2);
        var strMinuto = dateString.substr(10, 2);
        var strFecha = strDia + "/" + strMes + "/" + strAnio + " " + strHora + ":" + strMinuto;
        return strFecha;
    }
}

//****************************************************************
// Función		:: 	fn_util_ValidaFechaFull
//****************************************************************
function fn_util_ValidaStringFechaFull(dateString) {
    //Valores Nulos    
    if (dateString == "" || dateString == null || dateString == undefined) {
        return "";
    }
    //Fecha por Defecto
    else if ((dateString.substr(0, 10)).toString() == "19000101") {
        return "";
    }
    //Formatea
    else {
        //Corta Fecha
        var strAnio = dateString.substr(0, 4);
        var strMes = dateString.substr(4, 2);
        var strDia = dateString.substr(6, 2);
        var strHora = dateString.substr(8, 2);
        var strMinuto = dateString.substr(10, 2);
        var strSeg = dateString.substr(12, 2);
        var strFecha = strDia + "/" + strMes + "/" + strAnio + " " + strHora + ":" + strMinuto + ":" + strSeg;
        return strFecha;
    }
}



//****************************************************************
// Funcion		:: 	Fn_util_ValidaFechaVacia
//****************************************************************
function Fn_util_ValidaFechaVacia(fecha) {
    if (fecha == "01/01/1900") {
        return "";
    }
    else {
        return fecha;
    }
}