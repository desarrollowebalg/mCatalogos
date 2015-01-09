//declaraciones iniciales
$(document).ready(function(){
   	redimensionarCatalogos();
	existeCatalogos();
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
			//alert(divResultado);
			$("#"+divResultado).show().html(data);
		break;
	}
}

function redimensionarCatalogos(){
	altoDivCat=$("#adm_content").height();
	anchoDivCat=parseFloat($("#adm_content").width());
	console.log(altoDivCat);
	console.log(anchoDivCat-12);



	anchoDivs=(anchoDivCat-12) / 3;

	console.log("Ancho divs "+anchoDivs);



	$("#divContenedorCatalogo").css("height",(altoDivCat-4)+"px");
	$("#divContenedorCatalogo").css("width",(anchoDivCat-2)+"px");




}

function existeCatalogos(){
    	idClienteCatalogo=$("#idClienteCatalogo").val();
    	idUsuarioCatalogo=$("#idUsuarioCatalogo").val();
    	parametros="action=avisoCatalogosExistentes&idCliente="+idClienteCatalogo+"&idUsuario="+idUsuarioCatalogo;
		ajaxCatalogos("avisoCatalogosExistentes","controlador",parametros,"divCatalogo","divCatalogo","GET");
}