


//**********************************************************************
// Nombre: fn_util_ComparaFecha
//**********************************************************************
function fn_util_ComparaFecha(Fecha1, Fecha2) {
    var oFechaIni = Fecha2.split('/');
    var oFechaFin = Fecha1.split('/');

    if (parseInt(oFechaIni[2], 10) > parseInt(oFechaFin[2], 10)) {
        return (true);
    } else {
        if (parseInt(oFechaIni[2], 10) == parseInt(oFechaFin[2], 10)) {
            if (parseInt(oFechaIni[1], 10) > parseInt(oFechaFin[1], 10)) {
                return (true);
            }
            if (parseInt(oFechaIni[1], 10) == parseInt(oFechaFin[1], 10)) {
                if (parseInt(oFechaIni[0], 10) > parseInt(oFechaFin[0], 10)) {
                    return (true);
                } else {
                    return (false);
                }
            } else {
                return (false);
            }
        } else {
            return (false);
        }
    }
}


//**********************************************************************
// Nombre: fn_util_UpdateDate
//**********************************************************************
function fn_util_UpdateDate(pThis) {
    var fecha = fn_util_trim(pThis.value);
    if (fecha.length < 10) {
        pThis.value = '';
    }
};

	
//**********************************************************************
// Nombre: fn_util_FormatDate
//**********************************************************************
function fn_util_FormatDate(pText) {
    var fecha = pText.value;
    var long = fecha.length;
    var dia;
    var mes;
    var ano;

    if ((long >= 2) && (this._primerslap == false)) {
        dia = fecha.substr(0, 2);
        if ((this.fn_util_IsNumeric(dia) == true) && (dia <= 31) && (dia != '00')) {
            fecha = fecha.substr(0, 2) + '/' + fecha.substr(3, 7);
            this._primerslap = true;
        }
        else {
            fecha = '';
            this._primerslap = false;
        }
    }
    else {
        dia = fecha.substr(0, 1);
        if (this.fn_util_IsNumeric(dia) == false) {
            fecha = '';
        }
        if ((long <= 2) && (this._primerslap = true)) {
            fecha = fecha.substr(0, 1);
            this._primerslap = false;
        }
    }
    if ((long >= 5) && (this._segundoslap == false)) {
        mes = fecha.substr(3, 2);
        if ((this.fn_util_IsNumeric(mes) == true) && (mes <= 12) && (mes != '00')) {
            fecha = fecha.substr(0, 5) + '/' + fecha.substr(6, 4);
            this._segundoslap = true;
            dia = fecha.substr(0, 2);
            if (((mes == '04') || (mes == '06') || (mes == '09') || (mes == '11')) && (dia > 30)) {
                fecha = fecha.substr(0, 2) + '/';
            }
            if ((mes == 02) && (dia >= 30)) {
                fecha = fecha.substr(0, 2) + '/';
            }
        }
        else {
            fecha = fecha.substr(0, 3);
            this._segundoslap = false;
        }
    }
    else {
        if ((long <= 5) && (this._segundoslap = true)) {
            fecha = fecha.substr(0, 4);
            this._segundoslap = false;
        }
    }
    if (long >= 7) {
        ano = fecha.substr(6, 4);
        if (this.fn_util_IsNumeric(ano) == false) {
            fecha = fecha.substr(0, 6);
        }
        else {
            if (long == 10) {
                if ((ano == 0) || (ano < 1900) || (ano > 2100)) {
                    fecha = fecha.substr(0, 6);
                }
            }
        }
    }

    if (long >= 10) {
        fecha = fecha.substr(0, 10);
        dia = fecha.substr(0, 2);
        mes = fecha.substr(3, 2);
        ano = fecha.substr(6, 4);
        if ((ano % 4 != 0) && (mes == 02) && (dia > 28)) {
            fecha = fecha.substr(0, 2) + '/';
        }
    }
    pText.value = fecha;
};
	

//**********************************************************************
// Nombre: fn_util_CheckDate
//**********************************************************************
function fn_util_CheckDate(fecha){
	  var err=0
	  if (fecha.length != 10) err=1
	  dia = fecha.substring(0,2) //dia
	  slash1 = fecha.substring(2,3) // '/'
	  mes = fecha.substring(3,5) //mes
	  slash2 = fecha.substring(5,6) // '/'
	  anho = fecha.substring(6,10) //anho
	
	  // chequeo de errores basicos
	  if ( dia<1 || dia>31) err = 1
	  if ( slash1 != '/' ) err = 1
	  if ( mes<1 || mes>12) err = 1
	  if ( slash1 == '/' && slash2 != '/' ) err = 1
	  if ( anho < 1000 || anho > 3000 ) err = 1
	
	  // verificacion avanzada
	  // meses con 30 dias
	  if ( mes == 4 || mes == 6 || mes == 9 || mes == 11 ){
			if (dia==31) err=1
	  }
	  // febrero
	  if (mes == 2){
			var g = parseInt(anho/4)
			if (isNaN(g)){
			  	err = 1
			}
			if (dia >29) err =1
			if (dia ==29 && ((anho/4)!=parseInt(anho/4))) err=1
	  }
	  if (err==1){
			return false
	  } else {
			return true
	  }
}


//**********************************************************************
// Nombre: fn_util_DiferenciaDias
//**********************************************************************
function fn_util_DiferenciaDias(fini,ffin){
		var dias = 0;
		if(checkdate(fini) && checkdate(ffin)){
				var x = str2dt(fini);
				var y = str2dt(ffin);
				var mili = (y.getTime() - x.getTime());
				dias = parseInt(mili / (1000*60*60*24));
		}

		return dias;
}


//**********************************************************************
// Nombre: fn_util_IncrementaFecha
//**********************************************************************
function fn_util_IncrementaFecha(fecha,dias){
		var nueva = "";
		if (!fn_util_CheckDate(fecha)) {
				return nueva;
		}

		if(eval(dias) == 0){
				return nueva;
		} else {
				fecha = str2dt(fecha);
				var mili = fecha.getTime();
				dias = eval(dias * (1000*60*60*24));
				var nueva = new Date();
				nueva.setTime(mili + dias);
				nueva=dt2dtstr(nueva);
				return nueva;
		}
}



//**********************************************************************
// Nombre: fn_util_FechaRango
//**********************************************************************
function fn_util_FechaRango(fecha,fechamin,fechamax){
		var rpta = false;
		if((typeof(fechamin) == "object") && (typeof(fechamax) == "object")){
				if((fecha >= fechamin) && (fecha <= fechamax)) {
						rpta = true;
				}
		}
		return rpta;
}



//**********************************************************************
// Nombre: fn_util_MesLetras
//**********************************************************************
/* Retorna el mes en Letras
   Donde mes es el numero del mes en el rango 1 hasta al 12
        may 1 o 0 para MAYUSCULAS o minusculas
        cap 1 o 0 para poner en mayusculas la primera letra o no */
function fn_util_MesLetras(mes, may, cap){
		var imes = parseInt(mes, 10);
		var tmes = "-";
		if ( imes == 1 ){
				tmes = "Enero";
		} else if ( imes == 2 ){
				tmes = "Febrero";
		} else if ( imes == 3 ){
				tmes = "Marzo";
		} else if ( imes == 4 ){
				tmes = "Abril";
		} else if ( imes == 5 ){
				tmes = "Mayo";
		} else if ( imes == 6 ){
			tmes = "Junio";
		} else if ( imes == 7 ){
			tmes = "Julio";
		} else if ( imes == 8 ){
			tmes = "Agosto";
		} else if ( imes == 9 ){
			tmes = "Setiembre";
		} else if ( imes == 10 ){
			tmes = "Octubre";
		} else if ( imes == 11 ){
			tmes = "Noviembre";
		} else if ( imes == 12 ){
			tmes = "Diciembre";
		}
		if ( may == 1){
			tmes = tmes.toUpperCase();
		}

		if ( cap == 1){
			tmes = tmes.substring(0,1).toUpperCase() + tmes.substring(1, tmes.length);
		}

		return tmes;
}

//****************************************************************
// Función		:: 	fn_cargaGrilla
// Descripción	::	Devuelve un String en fomato "dd/MM/yyyy", a partir de una fecha enviada por el servidor.
// Parámetro    ::
//                  fecha : String con fecha en formato .NET, enviada por el servidor.
// Log			:: 	EBL - 25/02/2012
//****************************************************************
function fn_LeerFechaServer(fecha) {
    if (fecha == null || fecha == '') {
        return "";
    }
    var sFecha = fecha.replace("/Date(", "").replace(")/", "");
    var date = new Date(parseInt(sFecha));

    return $.format.date(date.toString(), "dd/MM/yyyy");
}

//****************************************************************
// Función		:: 	fn_cargaGrilla
// Descripción	::	Devuelve un String en fomato "yyyyMMdd", a partir de una fecha válida.
//                  Caso contrario devuelve vacio.
// Parámetro    ::  
//                  cellvalue : String con una fecha válida o un valor nulo.
// Log			:: 	EBL - 25/02/2012
//****************************************************************
function Fn_util_DateToString(cellvalue) {    
    // Evalua los posibles datos null
    if ((cellvalue.substr(0, 10)).toString() == "01/01/1900" || cellvalue == "" || cellvalue == null || cellvalue == undefined) {
        return "";
    }
    else {
        // Toma los valores de fecha (descarta los datos de tiempo - hora, minuto, segundo - recibidos)
        var sDate = cellvalue.substr(0, 10);
        var vDate = sDate.split("/");
        // Compone un nuevo dato fecha, a nivel javascript
        var strDate = vDate[2] + vDate[1] + vDate[0]
        //var date = new Date(vDate[2], vDate[1] - 1, vDate[0]);        
        // Se utiliza una función de jquery que permite usar una formato para la fecha
        // (convierte la fecha en String, mascara a utilizar)
        return strDate;  //$.format.date(date.toString(), "yyyyMMdd");
    }
}


//****************************************************************
// Función		:: 	Fn_util_cortaDateServer
// Descripción	::	Corta fecha completa para grilla
// Parámetro    ::  
//                  cellvalue : String con una fecha válida o un valor nulo.
// Log			:: 	JRC - 15/10/2012
//****************************************************************
function Fn_util_cortaDateServer(cellvalue) {    
    // Evalua los posibles datos null
    if ((cellvalue.substr(0, 10)).toString() == "01/01/1900" || cellvalue == "" || cellvalue == null || cellvalue == undefined) {
        return "";
    }
    else {
        // Toma los valores de fecha (descarta los datos de tiempo - hora, minuto, segundo - recibidos)
        var sDate = cellvalue.substr(0, 10);       
        return sDate;  //$.format.date(date.toString(), "yyyyMMdd");
    }
}