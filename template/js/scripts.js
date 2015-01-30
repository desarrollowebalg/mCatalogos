
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
function enviarNotificacion(accion){
	var usuarios=usuariosTareasNotificaciones[0];
	var tit=usuariosTareasNotificaciones[1];
	console.log("Accion: "+accion);
	console.log("Usuarios: "+usuarios);
	console.log("Nombre Tarea: "+tit);
	if(accion==1){
		ttl="Nueva Tarea";
		msj="La tarea "+tit+" ha sido asignada a usted.";
	}else if(accion==2){
		ttl="Tarea actualizada";
		msj="La tarea "+tit+" ha sido actualizada favor de revisar.";
	}
	
	sub="";
	cmd="typ:1|opt:1|tab:4";
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
			console.log("Resultado: "+data);
		}
	});
	//se vacia el array generado
	usuariosTareasNotificaciones.length=0;
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
	  var tabla = '<table border="1" width="100%" style="border-collapse:collapse;" bordercolor="#EAEAEA">'+
					 '<tr> <td colspan="2" align="center"><img src="'+origen+'" width="200 height="200" /></td></tr>'+
					 '<tr> <td colspan="2" align="center">&nbsp;</td></tr>'+
					 '<tr> <td style=" background-color:#0072A8;color:#FFF;"  width="80"> Nombre</td><td>'+titulo+'</td></tr>'+
					 '<tr> <td style=" background-color:#0072A8;color:#FFF;"  width="80"> Resumen</td><td>'+resumen+'</td></tr>'+
					 '<tr> <td colspan="2" align="center">&nbsp;</td></tr>'+
				 '</table><input type="hidden" id="detalleArchivo" value="'+idArchivo+'" />';
	//'<tr> <td colspan="2" align="center"> <input type="button" value="Usuarios Asignados" onclick="usuariosAsignados('+idArchivo+');" /></td></tr>'+
	  $('#divCatalogoDetalle').html(tabla);
	 $("#btnAsignarUsuarios").show();//se muestra el boton para la asignacion de usuarios
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
					   $("#dialog_okey").dialog("open");
					   

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
  
 document.getElementById('target').src = 'http://localhost/sitio2/public/libs/phpProcesos/mSubirArchivo.php?carpeta='+carpeta+'&idCatalogo='+idCatalogo+'&idTipo='+idTipo+'&idUsuario='+idUsuario+'&formatos='+formatos;
// document.getElementById('target').src = 'http://movi.2gps.net/public/libs/phpProcesos/mSubirArchivo.php?carpeta='+carpeta+'&idCatalogo='+idCatalogo+'&idTipo='+idTipo+'&idUsuario='+idUsuario;
}
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
	console.log(elementos)
	if(elementos==""){
		$("#confirmacionEliminacion").dialog("close");
		$("#mensajesCatalogos").html("<p><span class='ui-icon ui-icon-alert' style='float:left;'></span>&nbsp;¿Debe seleccionar un archivo del listado para poder borrarlo?</p>");
		$("#mensajesCatalogos").dialog("open");
	}else{
		console.log("Eliminar archivos")
	}
}
