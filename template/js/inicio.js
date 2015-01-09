//declaraciones iniciales

$(document).ready(function(){
   	redimensionarCatalogos();
	existeCatalogos();
	
	 $("#dialogoCrearCatalogo").dialog({
		autoOpen: false,
		height: 150,
		width: 350,
		modal: true,
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
				$("#dialogoUsuariosAsignados").dialog( "close" );
			},
			Aceptar:function(){
				//crearNuevoCatalogo();
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
				 respuestaCatalogo  =  'todo correcto pintar otra opcion';
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
	}
}

function redimensionarCatalogos(){
	altoDivCat=$("#adm_content").height();
	anchoDivCat=parseFloat($("#adm_content").width());
	anchoDivs=(anchoDivCat-14) / 3;
	console.log(altoDivCat);
	console.log(anchoDivCat-12);
	console.log("Ancho divs "+anchoDivs);
	$("#divContenedorCatalogo").css("height",(altoDivCat-4)+"px");
	$("#divContenedorCatalogo").css("width",anchoDivCat+"px");
	//se redimensionan los divs interiores
	$("#divArbol").css("width",(anchoDivs-150)+"px");
	$("#divCatalogo").css("width",(anchoDivs+72)+"px");
	$("#divCatalogoDetalle").css("width",(anchoDivs+72)+"px");

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