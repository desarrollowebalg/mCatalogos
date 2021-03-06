//declaraciones iniciales
contadorElementosBorrar=0;
funcionEliminar=false;
$(document).ready(function(){
   	redimensionarCatalogos();
	existeCatalogos();
	
	 $("#dialogoCrearCatalogo").dialog({
		autoOpen: false,
		height: 150,
		width: 350,
		modal: true,
		resizable:false,
		buttons: {
			Cancelar: function() {
				$("#dialogoCrearCatalogo").dialog( "close" );
			},
			Agregar:function(){
				crearNuevoCatalogo();
			}
		}
   	});
	
	$("#dialogoUsuariosAsignados").dialog({
		autoOpen: false,
		height: 500,
		width: 400,
		modal: true,
		buttons: {
			Cancelar: function() {
				cancelarUsuariosNoti($('#detalleArchivo').val(),arregloUsuarios);
			    $("#dialogoUsuariosAsignados").dialog( "close" );
			},
			Aceptar:function(){
				recorre_select();
			}
		}
   	});

   	$("#btnNuevoCatalogo").click(function(){
   		 $("#dialogoCrearCatalogo").dialog("open");
   	});

   	$("#btnSubirArchivo").click(function(){
		subirArchivo();
//   		alert("Subir archivo");
   	});

   	$("#btnAsignarUsuarios").click(function(){
   		usuariosAsignados();
   	})

   	$("#btnEliminarArchivos").click(function(){
   		if(funcionEliminar==false){
	   		$("#tbl_Archivos tr td").each(function (index) {//se habilitan los elementos
	   			$("#"+this.id).show();
		    });
		    $("#filaBtnCancelar").show();//se muestra el boton de cancelar la accion
		    funcionEliminar=true;
   		}else{
   			$("#confirmacionEliminacion").dialog("open");
   		}
   		
   	});
	
	$("#btnNotiUsuarios").click(function(){
   		usuariosNotificar();
   	})
	
	$("#dialogoSubirArchivo").dialog({
		autoOpen: false,
		height: 400,
		width: 450,
		modal: true,
		buttons: {
			Cancelar: function() {
				var carpeta    = $("#rutaRaiz").val();
			    var idCatalogo = $("#idCatalogo").val();
			    var idTipo	   = $("#idTipo").val();
 			    var idCliente  = $("#idCliente").val();
				pintaContenido(idCliente,idCatalogo,idTipo,carpeta);
				$("#dialogoSubirArchivo").dialog( "close" );
			}
		}
   	});


   	$("#confirmacionEliminacion").dialog({
   		autoOpen:false,
   		height:130,
   		width:350,
   		modal:true,
   		resizable:false,
   		buttons:{
   			Cancelar: function(){
   				$("#confirmacionEliminacion").dialog("close");
   				cancelarBorrado();
   			},
   			Aceptar: function(){
   				eliminarArchivosCatalogo();
   			}	
   		}
   	});

   	$("#mensajesCatalogos").dialog({
		autoOpen:false,
   		height:130,
   		width:380,
   		modal:true,
   		resizable:true,
   		buttons:{
   			Aceptar: function(){
   				$("#mensajesCatalogos").dialog("close");
   				cancelarBorrado();
   			}	
   		}
   	});
	
	
	
});
/*
*Funcion que controla las peticiones ajax
*/
function ajaxCatalogos(accion,c,parametros,divCarga,divResultado,tipoPeticion){
	$.ajax({
		url: "index.php?m=mCatalogos&c="+c,
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
		case "avisoCatalogosExistentes":
		  var respuestaCatalogo = ''; 
		  var respuestaArbol	= '';
		    
			 if(data==='0'){
				 respuestaCatalogo = '<div class="ui-widget" align="center">'+
            							'<div class="ui-state-highlight ui-corner-all" style="margin-top: 30%; padding: 0 .7em; width:300px;">'+
                			            '<p><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span>'+
                				        'No hay Cat&aacute;logos  <input type="button" value="Crear Catalogo" onClick="formularioCatNuevo();"/></p>'+
             			                '</div>'+
        			                    '</div>'; 
			 }else{
				 //respuestaCatalogo  =  'todo correcto pintar otra opcion';
				 dibujArbol();
			 }
		
		
			$("#"+divResultado).show().html(respuestaCatalogo);
			
			
		break;
		
		case "creaNuevoCatalogo":
		    $("#dialogoCrearCatalogo").dialog( "close" );

			if(data==='1'){
			 existeCatalogos();
			}else{
			 $("#"+divResultado).show().html(data+'no se guardo');
			}
		  
		 
		break;
		
		case "dibujArbol":
		$("#divArbol").html(data);
		break;
		
		case "pintaContenido":
		 $("#"+divResultado).show().html(data);
		break;
		case "borrarArchivos":
			//$("#"+divResultado).show().html(data);
			valores=data.split("|||");
			if(valores[0]==1){
				$("#"+divResultado).html("Cambios realizados en el Catalogo")//guardo
			}else{
				$("#"+divResultado).html("Ha ocurrido un error al eliminar el archivo.");//error al borrar
			}
			//los usuarios a notificar se encuentran en el array valores en la posicion 1 valores[1]
		break;
		
	}
}

function redimensionarCatalogos(){
	altoDivCat=$("#adm_content").height();
	anchoDivCat=parseFloat($("#adm_content").width());
	anchoDivs=(anchoDivCat-14) / 3;
	$("#divContenedorCatalogo").css("height",(altoDivCat-4)+"px");
	//se redimensionan los divs interiores
	
	$("#divCArbol").css("height",(altoDivCat-10)+"px");
	$("#divCCatalogo").css("height",(altoDivCat-10)+"px");
	$("#divCCatalogoDetalle").css("height",(altoDivCat-10)+"px");

	$("#divArbol").css("height",(altoDivCat-76)+"px");
	$("#divCatalogo").css("height",(altoDivCat-76)+"px");
	$("#divCatalogoDetalle").css("height",(altoDivCat-76)+"px");
}

function existeCatalogos(){
    	idClienteCatalogo=$("#idClienteCatalogo").val();
    	idUsuarioCatalogo=$("#idUsuarioCatalogo").val();
    	parametros="action=avisoCatalogosExistentes&idCliente="+idClienteCatalogo+"&idUsuario="+idUsuarioCatalogo;
		ajaxCatalogos("avisoCatalogosExistentes","controlador",parametros,"divCatalogo","divCatalogo","GET");
}

function crearNuevoCatalogo(){
    	idClienteCatalogo=$("#idClienteCatalogo").val();
    	nombreCat        =$("#nombreCatalogo").val();
    	parametros="action=creaNuevoCatalogo&idCliente="+idClienteCatalogo+"&nombre="+nombreCat;
		ajaxCatalogos("creaNuevoCatalogo","controlador",parametros,"divCatalogo","divCatalogo","GET");
}

function dibujArbol(){
   		idClienteCatalogo=$("#idClienteCatalogo").val();
    	nombreCat        =$("#nombreCatalogo").val();
    	parametros="action=dibujArbol&idCliente="+idClienteCatalogo;
		ajaxCatalogos("dibujArbol","controlador",parametros,"divCatalogo","divCatalogo","GET");
}

function pintaContenido(cliente,catalogo,tipo,rutaRaiz){
	   $("#divCatalogoDetalle").html("");
	   $("#btnAsignarUsuarios").hide();
	   $("#btnNotiUsuarios").hide();
	   $("#avisoNotificaciones").hide();
	    idUsuarioCatalogo=$("#idUsuarioCatalogo").val();
      	parametros="action=pintaContenido&cliente="+cliente+"&catalogo="+catalogo+"&tipo="+tipo+"&rutaRaiz="+rutaRaiz+"&idUsuario="+idUsuarioCatalogo;
		ajaxCatalogos("pintaContenido","controlador",parametros,"divCatalogo","divCatalogo","POST");
}
