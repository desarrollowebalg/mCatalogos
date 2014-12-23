//declaraciones iniciales
$(document).ready(function(){
   	
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
	}
}
