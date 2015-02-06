var arregloUsuarios	= Array();
var arregloFinal    = Array();

function nuevoAjax(){
	var xmlhttp=false;
	try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	}catch(e){
		try{
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}catch(E){
			xmlhttp = false;
		}
	}
	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
		xmlhttp = new XMLHttpRequest();
	}
	return xmlhttp;
}
/*******************************************************************************/

//funciones para el modulo
function enviarNotificacion(usuarios){
	
	    


		ttl="Catálogo(s) Actualizado(s)";
		msj="Informacion actualizada favor de revisar.";
	
	sub="";
	cmd="typ:1|opt:1|tab:6";
	dev=usuarios;
	parametros="ttl="+ttl+"&msj="+msj+"&sub="+sub+"&cmd="+cmd+"&dev="+dev;
	console.log(parametros);
	$.ajax({
		url: "./apis_movi/Push.php",
		type: "POST",
		data: parametros,
		beforeSend:function(){ 
			//$("#"+divCarga).show().html("Procesando Informacion ...");
			console.log("Procesando Notificacion(es) ...");
		},
		success: function(data) {
			//$("#"+divResultado).html(data);
			 if(data=='ok'){
				  
				 avisoNotificar(2);
 				   $("#letrero_x").html('Notificacion(es) enviada(s)');
         		   $("#dialog_okey").dialog("open");
			 }
			console.log("Resultado: "+data);
		}
	});
	//se vacia el array generado
	//usuariosTareasNotificaciones.length=0;
}
/*******************************************************************************/
function formularioCatNuevo(){
  $("#dialogoCrearCatalogo").dialog( "open" );	
}
/*******************************************************************************/
/*function pintaContenido(cliente,catalogo,tipo){
	
	// $("#divCatalogo").html(cliente+' '+catalogo+' '+tipo);
	 $('#divCatalogo').html('Extrayendo datos espere...');
	  $.ajax({
            url: "index.php?m=mCatalogos&c=mBuscarArchivos",
		  data : {
            cliente:cliente,
			catalogo:catalogo,
			tipo:tipo
		   				},
		   type: "POST",
            success: function(data) {
           $('#divCatalogo').html(data);
		  }
      });
  	
}*/

/*******************************************************************************/

function verDetalles(titulo,resumen,ruta,imagen,tipo,idArchivo){
	//se limpia el detalle anterior
	$("#divCatalogoDetalle").html("");
	
	// $("#divCatalogo").html(cliente+' '+catalogo+' '+tipo);
	 $('#divCatalogoDetalle').html('Extrayendo datos espere...');
     var origen = imagen;
	 
	 if(tipo == '2'){
		origen = ruta;
	 }
	 //'<tr> <td colspan="2" align="center" style=" background-color:#0072A8;color:#FFF;"> Detalles</td></tr>'+
	  var tabla = '<table border="1" width="100%"  height="100%" style="border-collapse:collapse;" bordercolor="#EAEAEA">'+
					 '<tr> <td colspan="2" align="center"><img src="'+origen+'" width="200 height="200" /></td></tr>'+
					 '<tr> <td colspan="2" style=" background-color:#0072A8;color:#FFF;" align="center" height="5">&nbsp;</td></tr>'+
					 '<tr> <td style=" background-color:#0072A8;color:#FFF;"  width="80" height="30"> Nombre</td><td>'+titulo+'</td></tr>'+
					 '<tr> <td style=" background-color:#0072A8;color:#FFF;"  width="80" height="50%" valign="top"> Resumen</td><td valign="top">'+resumen+'</td></tr>'+
					
				 '</table><input type="hidden" id="detalleArchivo" value="'+idArchivo+'" />';
	//'<tr> <td colspan="2" align="center"> <input type="button" value="Usuarios Asignados" onclick="usuariosAsignados('+idArchivo+');" /></td></tr>'+
	  $('#divCatalogoDetalle').html(tabla);
	 $("#btnAsignarUsuarios").show();//se muestra el boton para la asignacion de usuarios
	 $("#btnNotiUsuarios").show();//se muestra el boton para la asignacion de usuarios
}

/*******************************************************************************/
//function usuariosAsignados(idArchivo){
function usuariosAsignados(){
	idArchivo=$("#detalleArchivo").val();
  $.ajax({
            url: "index.php?m=mCatalogos&c=mUsuariosAsignados",
		    data : {
            idArchivo:idArchivo
		   	},
		    type: "POST",
            success: function(data) {
            $('#dialogoUsuariosAsignados').html(data);
		  }
      });	
  $("#dialogoUsuariosAsignados").dialog( "open" );	
}

/*******************************************************************************/

function usuariosNotificar(){
	
   var usuariosEnviar = '';
   for(r=0;r<arregloFinal.length;r++){
	 if(usuariosEnviar == ''){ 
		 usuariosEnviar = arregloFinal[r];
	 }else{
		 usuariosEnviar = usuariosEnviar+','+arregloFinal[r];	 
	 }
   }	

enviarNotificacion(usuariosEnviar);

}

/*******************************************************************************/
function recorre_select(){
	var todos = '';
	
  $("#origen option").each(function(){
	if(todos == ''){
		todos = $(this).attr('value');
	}else{
		todos = todos+','+$(this).attr('value');
	}
   
  });
  todos = todos +'|'+ $("#id_menu").val();
  
  var ajax = nuevoAjax();
    $("#letra_x").html('Guardando Datos');
   $("#dialog_prog").dialog("open");
  
  if($("#origen option").length > 0){
	  //actualiza
	  ajax.open("GET", "index.php?m=mCatalogos&c=mActualizaBase&datos="+todos,true);
  }else{
	  // borra todo
	  var id_submenu = $("#id_menu").val();
	  ajax.open("GET", "index.php?m=mCatalogos&c=mBorraTodoBase&id_submenu="+id_submenu,true);
  }
   
  	ajax.onreadystatechange=function() {
		if (ajax.readyState==4) {
				var result =ajax.responseText;
				  console.log(result);
				  if(result!=0){
					   $("#dialog_prog").dialog("close");
					   $("#letrero_x").html('Proceso realizado');
					   $("#dialogoUsuariosAsignados").dialog( "close" );
					   $("#dialog_okey").dialog("open");
					   llenaArregloFinal();
					   arregloUsuarios= [];
					   avisoNotificar(1);
					   console.log('el arreglo arregloUsuarios tiene'+arregloUsuarios.length+' datos');
					 //alert('cambios realizados');
				  }else{
					      $("#dialog_prog").dialog("close");
					      $("#letrero_x").html('Falla al realizar proceso');
						  $("#dialog_okey").dialog("open");
					// alert('falla al realizar cambios');  
				  }
				 
					//alert(result+'terminado');
			}			
		}		
	ajax.send(null);
  //alert(todos+'|'+ $("#origen option").length);	
}

function subirArchivo(){
 $("#dialogoSubirArchivo").dialog( "open" );	
  var carpeta    = $("#rutaRaiz").val();
  var idCatalogo = $("#idCatalogo").val();
  var idTipo	 = $("#idTipo").val();
  var idUsuario	 = $("#idUsuarioCatalogo").val();
  var formatos   = $("#formatos").val();
  
 document.getElementById('target').src =  $("#nombreServidor").val()+'/public/libs/phpProcesos/mSubirArchivo.php?carpeta='+carpeta+'&idCatalogo='+idCatalogo+'&idTipo='+idTipo+'&idUsuario='+idUsuario+'&formatos='+formatos;
 //  document.getElementById('target').src = 'http://movi.2gps.net/public/libs/phpProcesos/mSubirArchivo.php?carpeta='+carpeta+'&idCatalogo='+idCatalogo+'&idTipo='+idTipo+'&idUsuario='+idUsuario+'&formatos='+formatos;
}


/*
function usuarioDeasignado(valor){
console.log('valor que llego : '+valor);

	var contador = 1;
 if(valor!==null){ 
  if(arregloUsuarios.length ===0){
   	arregloUsuarios.push(valor);	  
  }else{
	  for(i=0;i<arregloUsuarios.length;i++){
		  if(arregloUsuarios[i]!==valor && parseInt(contador) === parseInt(arregloUsuarios.length)){
				 console.log((arregloUsuarios[i])+'!=='+valor+'&&'+contador+' === '+arregloUsuarios.length); 
				 arregloUsuarios.push(valor);	
		  }else{
             contador++;
		  }
	  }
  }

   
   for(j=0;j<arregloUsuarios.length;j++){
	  console.log(arregloUsuarios[j]);	 
   }
 
 }
}

function limpiArreglo(valor){
	  for(k=0;k<arregloUsuarios.length;k++){
		   if(parseInt(arregloUsuarios[k])===parseInt(valor)){
			    console.log('a quitar elemento:'+valor);
				arregloUsuarios.splice(k);
		   }
	   }
	   console.log('------------');
	    for(j=0;j<arregloUsuarios.length;j++){
	      console.log(arregloUsuarios[j]);	 
        }
}
*/

//******************************************************

function construyeArregloNoti(valor,tipo,idArchivo){
 var cadena = valor;
  if(tipo=='2'){
	  cadena = todoselegidos(valor);
  }
 llenaVacia(tipo,cadena,idArchivo);
//console.log(valor+','+tipo+','+idArchivo);
}



//******************************************************
/*
function llenaVacia(tipo,cadena,formato){
   var bandera = 0;
  
 if(tipo == '1'){
		if(formato == 'c'){
		 var cachitos = cadena.split(',');
          for(c=0;c<cachitos.length;c++){
			  arregloUsuarios.push(parseInt(cachitos[c]));	
		  }
		}else{
			 
  		       for(af=0;af<arregloUsuarios.length;af++){
				  if( parseInt(arregloUsuarios[af]) == parseInt(cadena)) {
					 arregloUsuarios.splice(af,1);  
					 bandera = 1;
					 break;
				  }else{
					 bandera = 0;  
				  }
			  }
			  
			  if(bandera===0){
				   arregloUsuarios.push(parseInt(cadena));  
			  }
		}
     }else{
		if(formato == 'c'){
    	   var cachitos = cadena.split(',');
           for(c=0;c<cachitos.length;c++){
			  for(af=0;af<arregloUsuarios.length;af++){
				  if( parseInt(arregloUsuarios[af]) == parseInt(cachitos[c])) {
					 arregloUsuarios.splice(af,1);  
					 bandera = 1;
					 break;
				  }else{
					 bandera = 0;  
				  }
			  }
			  if(bandera===0){
				   arregloUsuarios.push(parseInt(cachitos[c]));  
			  }
		   }
		   
		   
		}else{
			for(af=0;af<arregloUsuarios.length;af++){
				  if(arregloUsuarios[af] === parseInt(cadena)) {
					 arregloUsuarios.splice(af,1);
					 bandera = 1;
					 break;
				  }else{
					 bandera = 0;  
				  }
			}
			
			 if(bandera===0){
				   arregloUsuarios.push(parseInt(cadena));  
			  }
		}
	 }
  
  
  console.log('*******************:'+arregloUsuarios.length);
        for(j=0;j<arregloUsuarios.length;j++){
	      console.log(arregloUsuarios[j]);	 
        }
		
		
}
*/

function llenaVacia(tipo,cadena,idArchivo){
   var bandera = 0;
  
       if(tipo == '1'){   // cuando se elige un solo elemento del combo
				if(arregloUsuarios.length >0)   {		 
					  for(af=0;af<arregloUsuarios.length;af++){
						  if( parseInt(arregloUsuarios[af][0]) == parseInt(idArchivo) &&  parseInt(arregloUsuarios[af][1]) == parseInt(cadena)) {
							 arregloUsuarios.splice(af,1);  
							 bandera = 1;
							 break;
						  }else{
							 bandera = 0;  
						  }
					  }
					  
					  if(bandera===0){
						    arregloUsuarios.push([parseInt(idArchivo),parseInt(cadena)]);  
					  }
				}else{
					  arregloUsuarios.push([parseInt(idArchivo),parseInt(cadena)]); 
				}
		
     }else{
		// console.log(cadena);
    	   var cachitos = cadena.split(',');
           for(c=0;c<cachitos.length;c++){
			if(arregloUsuarios.length >0)   {
			  for(af=0;af<arregloUsuarios.length;af++){
		//		  console.log('au'+af+'--'+parseInt(arregloUsuarios[af])+' == '+parseInt(cachitos[c])+'--ac');
				  if( parseInt(arregloUsuarios[af][0]) == parseInt(idArchivo) &&  parseInt(arregloUsuarios[af][1]) == parseInt(cachitos[c])) {
					 arregloUsuarios.splice(af,1);  
					 bandera = 1;
					 break;
				 }else{
					 bandera = 0;  
				  }
			  }
			  if(bandera===0){
				//   arregloUsuarios.push(parseInt(cachitos[c]));  
				     arregloUsuarios.push([parseInt(idArchivo),parseInt(cachitos[c])]);  
			  }
			}else{
//				 arregloUsuarios.push(parseInt(cachitos[c]));  
				 arregloUsuarios.push([parseInt(idArchivo),parseInt(cachitos[c])]);  
			}
		   }
	 }
  
  
 /*console.log('nueva cadena'+cadena+'***:'+arregloUsuarios.length);
         for(r=0;r<arregloUsuarios.length;r++){
			for(c=0;c<arregloUsuarios[r].length;c++){
				console.log('arregloUsuarios['+r+']['+c+']='+arregloUsuarios[r][c]);
		 }
		 }
	*/	
}


//******************************************************
function todoselegidos(valor){
 var todos = '';	
	 $("#"+valor+" option").each(function(){
			if(todos == ''){
				todos = $(this).attr('value');
			}else{
				todos = todos+','+$(this).attr('value');
			}
		   
		  });
	return todos;
}
//******************************************************

/*Funciones para la eliminacion*/
function cancelarBorrado(){
	$("#tbl_Archivos tr td").each(function (index) {//se recorren los tds
		$("#"+this.id).hide();//id del elemento que se marcara)
    });
    $("#tbl_Archivos tr").each(function (index) {//se recorren los tds
    	$("#"+this.id).removeClass("ui-state-highlight").addClass("estiloArchivosTabla");
    });
	for (var i=0;i<document.frmArchivoCat.elements.length;i++){
	 	if (document.frmArchivoCat.elements[i].type=="checkbox"){
			document.frmArchivoCat.elements[i].checked=0;
	 	}
	}
    $("#filaBtnCancelar").hide();//se muestra el boton de cancelar la accion
    $("#btnEliminarArchivos").html("<span class='ui-icon ui-icon-trash ' style='float:right;'></span>&nbsp;Borrar Archivo(s)");
    contadorElementosBorrar=0;
    funcionEliminar=false;
  }

function marcarArchivo(idFila){
	//$("#"+idFila).css("background","#F78181");
	if($("#"+idFila).hasClass("estiloArchivosTabla")){
		contadorElementosBorrar=contadorElementosBorrar+1;
		$("#"+idFila).removeClass("estiloArchivosTabla").addClass("ui-state-highlight");
		$("#btnEliminarArchivos").html("<span class='ui-icon ui-icon-trash' style='float:right;'></span>&nbsp;Borrar "+contadorElementosBorrar+" archivo(s)");//cambiar el texto del boton

	}else{
		$("#"+idFila).removeClass("ui-state-highlight").addClass("estiloArchivosTabla");
		contadorElementosBorrar-=1;
		if(contadorElementosBorrar==0){
			cancelarBorrado();
		}
	}
}

function eliminarArchivosCatalogo(){
	var elementos="";
	for (var i=0;i<document.frmArchivoCat.elements.length;i++){//se recorre el formulario para saber los elementos seleccionados
	 	if (document.frmArchivoCat.elements[i].type=="checkbox"){
	 		if (document.frmArchivoCat.elements[i].checked){				
	 			if (elementos=="")
	 				elementos=elementos+document.frmArchivoCat.elements[i].value;
	 			else
	 				elementos=elementos+",,,"+document.frmArchivoCat.elements[i].value;
	 		}	
	 	}
	}
	
	if(elementos==""){
		$("#confirmacionEliminacion").dialog("close");
		$("#mensajesCatalogos").html("<p><span class='ui-icon ui-icon-alert' style='float:left;'></span>&nbsp;¿Debe seleccionar un archivo del listado para poder borrarlo?</p>");
		$("#mensajesCatalogos").dialog("open");
	}else{
		console.log("Eliminar archivos")
		console.log(elementos)
		$("#confirmacionEliminacion").dialog("close");
		//ajaxCatalogos(accion,c,parametros,divCarga,divResultado,tipoPeticion)
		parametros="action=borrarArchivos&archvos="+elementos
		ajaxCatalogos("borrarArchivos","controlador",parametros,"mensajesCatalogos","mensajesCatalogos","POST");
		$("#mensajesCatalogos").dialog("open");
	}
}

//******************************************************

function cancelarUsuariosNoti(idArchivo,arreglo){
   arregloUsuarios=[];
   console.log('se limpio el arreglo arregloUsuarios'+arregloUsuarios.length);
	/*if(arregloUsuarios.length>0){
		 for(af=0;af<arregloUsuarios.length;af++){
			  if( parseInt(arregloUsuarios[af][0]) === parseInt(idArchivo)) {
				console.log('borrar:'+arregloUsuarios[af][1]);
			    arregloUsuarios.splice(af,1);  
				cancelarUsuariosNoti(idArchivo,arregloUsuarios)
			  }
 	    }
	}
	
	
	 //console.log('eliminar los escogidos:'+arregloUsuarios.length);
         for(r=0;r<arregloUsuarios.length;r++){
			for(c=0;c<arregloUsuarios[r].length;c++){
			console.log('arregloUsuarios['+r+']['+c+']='+arregloUsuarios[r][c]);
		    }
		 }*/
}

function  llenaArregloFinal(){
	
	  for(r=0;r<arregloUsuarios.length;r++){
	    if(arregloFinal.length > 0){
			if(arregloFinal.indexOf(parseInt(arregloUsuarios[r][1]))===-1){
				arregloFinal.push(parseInt(arregloUsuarios[r][1]));
			}
		}else{
			arregloFinal.push(parseInt(arregloUsuarios[r][1]));
		}
	  }
	
	     for(r=0;r<arregloFinal.length;r++){
			
			console.log('arregloFinal['+r+']='+arregloFinal[r]);
		    
		 }
}

function avisoNotificar(valor){
  	if(valor == '1'){ 
	    $("#avisoNotificaciones").css("background","#FFCC33");	
	    $("#valorNoti").val("Si");	
	}else{
	   $("#avisoNotificaciones").css("background","#F3F3F3");	
	    $("#valorNoti").val("No");	
	}
	
}