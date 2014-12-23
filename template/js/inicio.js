var usuariosTareasNotificaciones 	= new Array();
var idCuestionarioPayload 			= new Array();
var strIdCuestionario				= "";
var agregarPayload 					= false;
//declaraciones iniciales
$(document).ready(function(){
   	//declaraciones y llamado a funciones del modulo
    $("#tabsTareas").tabs();

    //declaracion de eventos para los tabs
	$("#today").click(function(){
    	cargarTareas("today");
    });    

    $("#pendientes").click(function(){
    	cargarTareas("pendientes");
    });

	$("#vencidas").click(function(){
    	cargarTareas("vencidas");
    });    

   
   	$("#estadisticas").click(function(){
		console.log('estadisticas 1');
    	cargarTareas("estadisticas");
    });    

    //boton importador
    $("#importadorTareas").click(function(){
       Importar_Excel();
    });
    //boton crear Tarea
    $("#crearTarea").click(function(){
    	//se anexa la peticion para mostrar el formulario de nueva tarea
    	//ajaxTareas("cargarTareas","controlador",parametros,div,div,"GET");
    	parametros="action=nuevaTarea";
    	ajaxTareas("nuevaTarea","controlador",parametros,"divNuevaTarea","divNuevaTarea","POST");
    	$("#divNuevaTarea").dialog("open");
    })
    
    //se crean las propiedades del formulario de tareas
    $("#divNuevaTarea").dialog({
		autoOpen: false,
		height: 610,
		width: 600,
		modal: true,
		buttons: {
			Cancelar: function() {
				$("#divNuevaTarea").dialog( "close" );
			},
			Guardar:function(){
				guardarTarea();
				//verificarDatosCuestionarioPayload();
			}
		}
	});

    //dialog editar tareas
    $("#editarTarea").dialog({
		autoOpen: false,
		height: 550,
		width: 600,
		modal: true,
		buttons: {
			Cancelar: function() {
				$("#editarTarea").dialog( "close" );
			},
			Guardar:function(){
				//guardarTarea();
				guardarEdicionTarea();
			}
		}
    });

    //dialog para agregar usuarios
	$("#agregarUsuarios").dialog({
		autoOpen: false,
		height: 300,
		width: 350,
		modal: true,
		buttons: {
			Cancelar: function() {
				$("#agregarUsuarios").dialog( "close" );
				document.getElementById("frmNuevaTarea").reset();//se hace un reset al formulario
				$("#usuariosAsignados").empty();
				$("#cuestionariosAsignados").empty();
			},
			Agregar:function(){
				//se llama a la funcion para agregar los usuarios seleccionados
				//se recupera el origen de la llamada
				origenAccionTarea=$("#accionTareaEditar").val();
				agregarUsuariosSeleccionados(origenAccionTarea);
			}
		}
	});
	//dialog para agregar cuestionarios
	$("#agregarCuestionarios").dialog({
		autoOpen: false,
		height: 300,
		width: 350,
		modal: true,
		buttons: {
			Cancelar: function() {
				$("#agregarCuestionarios").dialog( "close" );
				document.getElementById("frmNuevaTarea").reset();//se hace un reset al formulario
				$("#usuariosAsignados").empty();
				$("#cuestionariosAsignados").empty();
			},
			Agregar:function(){
				//se llama a la funcion para agregar los usuarios seleccionados
				origenAccionTarea=$("#accionTareaEditar").val();
				agregaCuestionariosTarea(origenAccionTarea);
			}
		}
	});
	//dialog detalle tarea
	$("#detalleTarea").dialog({
		autoOpen:false,
		height: 500,
		width: 600,
		buttons:{
			Cerrar:function(){
				$("#detalleTarea").dialog("close");
			}
		}
	});

    //dialog para agregar usuarios
	$("#agregarPDI").dialog({
		autoOpen: false,
		height: 300,
		width: 450,
		modal: true,
		buttons: {
			Cancelar: function() {
				$("#agregarPDI").dialog( "close" );
				//document.getElementById("frmNuevaTarea").reset();//se hace un reset al formulario
				//$("#usuariosAsignados").empty();
				//$("#cuestionariosAsignados").empty();
			},
			Agregar:function(){
				//se llama a la funcion para agregar los usuarios seleccionados
				//se recupera el origen de la llamada
				origenAccionTarea=$("#accionTareaEditar").val();
				agregaPDITarea(origenAccionTarea);
			}
		}
	});

	$("#verificacionPayload").dialog({
		autoOpen: false,
		height: 140,
		width: 450,
		modal: true,
		resizable: false,
		buttons: {
			"No agregar": function() {
				$("#verificacionPayload").dialog( "close" );

				guardarTarea();
			},
			"Agregar Payload a la tarea":function(){
				//agregarPayloadTarea();
				agregarPayload=true;
				$("#verificacionPayload").dialog("close");
				//agregar marca de que se agrego un payload a la tarea
				var strPayloadAgregado="<div style='margin-top: 20px; padding: 0 .7em;' class='ui-state-highlight ui-corner-all'>";
				strPayloadAgregado+="<p><span style='float: left; margin-right: .3em;' class='ui-icon ui-icon-info'></span>";
				strPayloadAgregado+="<strong>Se vinculara el payload a la tarea.</strong></p>";
				strPayloadAgregado+="</div>";
				$("#buscarPayload").html(strPayloadAgregado);

				guardarTarea();

			}
		}
	});

	$("#verInfoPayload").dialog({
		autoOpen: false,
		height: 400,
		width: 600,
		modal: true,
		resizable: true
	});

	//mensajes de error
	$("#divMenssajesTareas").dialog({
		autoOpen: false,
		modal: true,
		buttons: {
			Cerrar: function() {
				$("#divMenssajesTareas").dialog( "close" );
			}
		}
	});

	//eliminar tareas
	$("#eliminarTareas").dialog({
		autoOpen:false,
		modal:true,
		buttons:{
			Cancelar:function(){
				$("#eliminarTareas").dialog( "close" );
			},
			Borrar:function(){
				//funcion de borrado
				//se recupera la tarea previamente seleccionada
				hdnEliminaTarea=$("#hdnEliminaTarea").val();
				$("#eliminarTareas").dialog( "close" );
				borrarTarea(hdnEliminaTarea);
			}
		}
	});

	$("#ayudaTareas").click(function(){
    	var horizontalPadding = 0;
		var verticalPadding = 0;
		$('<iframe id="frameAyudaTareas" src="http://movi.2gps.net/manuals/videos.php?video=tareas&bar=1&atras=0&manual=1" />').dialog({
			title: 'Ayuda - Tareas',
			autoOpen: true,
			width: 597,
			height: 390,
			modal: true,
			resizable: false,
			autoResize: true,
			buttons: {
				Cerrar: function() {
					$("#frameAyudaTareas").remove();
					$( this ).dialog( "close" );
				}
			},
			open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide(); }
		}).width(600 - horizontalPadding).height(390 - verticalPadding);
    });

	//numerico para el codigo postal
	$("#txtCP").numeric();

    //se redimensionan los tabs
    redimensionarTareas();
    //peticion para listar las tareas
    cargarTareas("today");
	
	
	 ///////////////////// caja de dialogo para ventana de importador 
	
    $("#dialogo_importador").dialog({
				modal: true,
				autoOpen:false,
				overlay: { opacity: 0.2, background: "cyan" },
				width:  800,
				height: 600,
				buttons: {
					     "Cerrar": function(){
						   $("#dialogo_importador" ).dialog('close');
						 }
						},
				show: "blind",
				hide: "blind"
	 });
	 
	 
	  ///////////////////// caja de dialogo para ventana de mensajes de aviso 
	
    $("#dialogo_mensajes_importador").dialog({
				autoOpen:false,
				overlay: { opacity: 0.2, background: "cyan" },
				width:  250,
				height: 150,
				buttons: {
					     "Aceptar": function(){
						   $("#dialogo_mensajes_importador" ).dialog('close');
						 }
						},
				show: "blind",
				hide: "blind"
	 });
	 
	 //////////////////////////////////////////  funcion ajax para subir archivos
	 	 
      var xhr = null;   
	  
 		 if(window.XMLHttpRequest)                                            // Construcción del objeto XMLHttpRequest según el tipo de navegador  
			 xhr = new XMLHttpRequest();   
		 else if(window.ActiveXObject)  
			 xhr = new ActiveXObject("Microsoft.XMLHTTP");  
		 else {   
			 alert("Su navegador no soporta los objetos XMLHTTPRequest...");    // XMLHttpRequest no es soportado por el navegador
			   return;   
		 }   
	 
			
     	$("#boton_aceptar_importar").click  // evento click asociado al boton para realizar el proceso de subida de archivo.
        (
            function(event)
            {
				
			$( "#boton_aceptar_importar" ).prop( "disabled", true );
	    	 if($('#input_file').val().length>0){	// valida que el campo file no venga vacio
	          
			    var file = $('#input_file')[0].files[0];
				var extension_xlsx = $("#input_file").val().split('.').pop().toLowerCase();
				//console.log(extension_xlsx);
			   if(extension_xlsx==='xlsx'){
					xhr.onreadystatechange = function() {
						if(xhr.readyState===3){
							$("#respuestas_importador_cabecera").html(xhr.readyState);
						}else if(xhr.readyState===4){
							var confirmacion = 'Archivo cargado para proceso: <br><b style="color:green;">&nbsp;&nbsp;&nbsp;'+xhr.responseText+'</b>';
							$("#respuestas_importador_cabecera").html(confirmacion);
							
							leer_excel($("#ID_CLI_IMP").val()+'/'+xhr.responseText+'||'+$("#ID_USU_IMP").val());
							$("#input_file").val("");
							
						}
					}
					xhr.open('POST', 'modules/mTareas/ajax_controller.php?cliente='+$("#ID_CLI_IMP").val(), true);
					xhr.setRequestHeader("X_FILENAME", file.name);
					xhr.send(file);
			  }else{
				  MensajesAviso('Archivo no valido debe elegir tipo (xlsx)');
				  $( "#boton_aceptar_importar" ).prop( "disabled", false );	
				}
			  }else{
		 		 MensajesAviso('No ha elegido un archivo. (xlsx)');  
				 $( "#boton_aceptar_importar" ).prop( "disabled", false );
			  }
            }
        );

	
	
	
});

/*
*Funcion que controla las peticiones ajax
*/
function ajaxTareas(accion,c,parametros,divCarga,divResultado,tipoPeticion){
	$.ajax({
		url: "index.php?m=mTareas&c="+c,
		type: tipoPeticion,
		data: parametros,
		beforeSend:function(){ 
			$("#"+divCarga).show().html("Procesando Informacion ..."); 
		},
		success: function(data) {
			//$("#"+divResultado).html(data);
			controladorAcciones(accion,data,divResultado);
		}
	});
}
/*
*Funcion que administra las diferentes acciones de las respuestas de las peticiones
*/
function controladorAcciones(accion,data,divResultado){
	switch(accion){
		case "cargarTareas":
			//alert(divResultado);
			$("#"+divResultado).show().html(data);
		break;
		case "listarUsuarios":
			$("#listadoUsuariosTareas").show().html(data);
		break;
		case "listarCuestionarios":
			$("#listadoCuestionarioTareas").show().html(data);
		break;
		case "guardarTarea":
			$("#divMenssajesTareas").show().html(data);
			if(data=="1"){
				//guardo los datos
				document.getElementById("frmNuevaTarea").reset();//se hace un reset al formulario
				//se vacian los divs de usuarios y cuestionarios
				$("#usuariosAsignados").empty();
				$("#cuestionariosAsignados").empty();

				var current_index = $("#tabsTareas").tabs("option","selected");
				if(current_index==0){
					filtro="today";
				}else if(current_index==1){
					filtro="pendientes";
				}else if(current_index==2){
					filtro="vencidas";
				}else{
					filtro="estadisticas";
				}


				$("#divNuevaTarea").dialog("close");//se cierra la ventana de nueva tarea
				$("#divMenssajesTareas").html("<p><span class='ui-icon ui-icon-notice' style='float:left; margin:0 7px 20px 0;'></span>Tarea Guardada Satisfactoriamente.</p>");
				$("#divMenssajesTareas").dialog("open");

				enviarNotificacion(data);

				cargarTareas(filtro);//se manda a llamar el grid de las tareas
			}else{
				//ocurrio un error
				$("#divMenssajesTareas").html("<p><span class='ui-icon ui-icon-alert' style='float:left; margin:0 7px 20px 0;'></span>Ocurrio un error al guardar la tarea.</p>");
				$("#divMenssajesTareas").dialog("open");
			}
		break;
		case "detalleTarea":
			$("#detalleTarea").show().html(data);
		break;
		case "eliminaTarea":
			$("#divMenssajesTareas").show().html(data);
			if(data=="1"){//se elimino la tarea
				var current_index = $("#tabsTareas").tabs("option","selected");
				if(current_index==0){
					filtro="today";
				}else if(current_index==1){
					filtro="pendientes";
				}else if(current_index==2){
					filtro="vencidas";
				}else{
					filtro="estadisticas";
				}
				$("#divMenssajesTareas").html("<p><span class='ui-icon ui-icon-notice' style='float:left; margin:0 7px 20px 0;'></span>Tarea Eliminada Satisfactoriamente.</p>");
				$("#divMenssajesTareas").dialog("open");
				$("#hdnEliminaTarea").attr("value","");
				cargarTareas(filtro);//se manda a llamar el grid de las tareas
			}else{
				//ocurrio un error
				$("#divMenssajesTareas").html("<p><span class='ui-icon ui-icon-alert' style='float:left; margin:0 7px 20px 0;'></span>Ocurrio un error al eliminar la tarea.</p>");
				$("#divMenssajesTareas").dialog("open");
			}
		break;
		case "editarTarea":
			$("#editarTarea").show().html(data);
		break;
		case "guardarEdicionTarea":
			$("#divMenssajesTareas").show().html(data);
			if(data=="1"){
				document.getElementById("frmEditarTarea").reset();//se hace un reset al formulario
				//se vacian los divs de usuarios y cuestionarios
				$("#usuariosAsignadosEditar").empty();
				$("#cuestionariosAsignadosEditar").empty();

				var current_index = $("#tabsTareas").tabs("option","selected");
				if(current_index==0){
					filtro="today";
				}else if(current_index==1){
					filtro="pendientes";
				}else if(current_index==2){
					filtro="vencidas";
				}else{
					filtro="estadisticas";
				}

				enviarNotificacion(2);

				cargarTareas(filtro);//se manda a llamar el grid de las tareas
				$("#editarTarea").dialog("close");//se cierra la ventana de nueva tarea
				$("#divMenssajesTareas").html("<p><span class='ui-icon ui-icon-notice' style='float:left; margin:0 7px 20px 0;'></span>Datos Guardados Satisfactoriamente.</p>");
				$("#divMenssajesTareas").dialog("open");
			}else{
				$("#divMenssajesTareas").html("<p><span class='ui-icon ui-icon-alert' style='float:left; margin:0 7px 20px 0;'></span>Ocurrio un error al guardar la tarea.</p>");
				//$("#divMenssajesTareas").show().html(data);

				$("#divMenssajesTareas").dialog("open");
			}
		break;
		case "nuevaTarea":
			$("#"+divResultado).html(data);
			if ($('#frmEditarTarea').length!=0){
				document.getElementById("frmEditarTarea").reset();//se hace un reset al formulario
				$("#usuariosAsignadosEditar").empty();
				$("#cuestionariosAsignadosEditar").empty();
			}
		break;
		case "listarPDI":
			$("#"+divResultado).show().html(data);
		break;
		case "verificarPayloadCuestionario":
			//$("#"+divResultado).show().html(data);
			res=data;
			res=res.split("|");
			console.log("resultado verificacion: "+res)
			if(res[0]==1){
				$("#verificacionPayload").html("El cuestionario seleccionado tiene un Payload cargado<br><br>¿Desea asignarlo a la tarea actual?");
				$("#verificacionPayload").dialog("open");
			}
			idCuestionarioPayload[0]=res[1];
		break;
		case "verInfoPayload":
			$("#"+divResultado).show().html(data);
			//$("#verificacionPayload").html("El cuestionario seleccionado tiene un Payload cargado<br><br>¿Desea asignarlo a la tarea actual?");
			//$("#verificacionPayload").dialog("open");
		break;
		case "verificaDatosCuestionarioPayload":
			$("#"+divResultado).show().html(data);
			
			
			
		break;
	}
}
/*
*Funcion para cargar los diferentes status de las tareas
*/
function cargarTareas(filtro){
	if(filtro=="today"){
		div="tabs-1";
	}else if(filtro=="pendientes"){
		div="tabs-2";
	}else if(filtro=="vencidas"){
		div="tabs-3";
	}else{
		div="tabs-4";
	}
	idCliente=$("#idClienteTareas").val()
	parametros="action=cargarTareas&filtro="+filtro+"&idCliente="+idCliente;
	ajaxTareas("cargarTareas","controlador",parametros,div,div,"GET");
}
/*
*Funcion para redimensionar las capas de Tareas
*/
function redimensionarTareas(){
	altoTareas=$(document).height();
    $("#tabsTareas").css("height",(altoTareas-60)+"px");
    
    $("#gbox_tareastoday").css("height",(altoTareas-101)+"px");
	$("#gbox_tareastoday").css("width","99.9%");
	$("#gview_tareastoday").css("height",(altoTareas-126)+"px");
	$("#gview_tareastoday").css("width","99.9%");
	$("#tareastoday_pager").css("width","99.9%");
	
	$("#gbox_tareaspendientes").css("height",(altoTareas-101)+"px");
	$("#gbox_tareaspendientes").css("width","99.9%");
	$("#gview_tareaspendientes").css("height",(altoTareas-126)+"px");
	$("#gview_tareaspendientes").css("width","99.9%");
	$("#tareaspendientes_pager").css("width","99.9%");

	$("#gbox_tareasvencidas").css("height",(altoTareas-101)+"px");
	$("#gbox_tareasvencidas").css("width","99.9%");
	$("#gview_tareasvencidas").css("height",(altoTareas-126)+"px");
	$("#gview_tareasvencidas").css("width","99.9%");
	$("#tareasvencidas_pager").css("width","99.9%");
	
	$(".ui-jqgrid-hdiv").css("width","99.9%");
	$(".ui-jqgrid-bdiv").css("height","90%");

	$("#frmGraficaTareas").css("height",(altoTareas-103)+"px");
}
