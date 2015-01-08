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

function editarTarea(idTarea,e){
	e.preventDefault();
	if ($('#frmNuevaTarea').length!=0){
		document.getElementById("frmNuevaTarea").reset();//se hace un reset al formulario
		$("#usuariosAsignados").empty();
		$("#cuestionariosAsignados").empty();
	}
	idTarea=idTarea.split("#");
	$("#editarTarea").dialog("open");
	idCliente=$("#idClienteTareas").val();
	idUsuario=$("#idUsuarioTareas").val();
	parametros="action=editarTarea&idCliente="+idCliente+"&idUsuario="+idUsuario+"&idTarea="+idTarea[1];
	ajaxTareas("editarTarea","controlador",parametros,"editarTarea","editarTarea","GET");
}
/*
*Muestra el detalle de la tarea
*/
function detalleTarea(idTarea,e){
	e.preventDefault();
   	//e.stopPropagation();
   	idTarea=idTarea.split("#");
	//alert("Detalle "+idTarea[1]);
	$("#detalleTarea").dialog("open");
	idCliente=$("#idClienteTareas").val();
	idUsuario=$("#idUsuarioTareas").val();
	parametros="action=detalleTarea&idCliente="+idCliente+"&idUsuario="+idUsuario+"&idTarea="+idTarea[1];
	//ajaxTareas(accion,c,parametros,divCarga,divResultado,tipoPeticion)
	ajaxTareas("detalleTarea","controlador",parametros,"detalleTarea","detalleTarea","GET");
}
/*
*Elimina la tarea del listado
*/
function eliminarTarea(idTarea,e){
	e.preventDefault();
	idTarea=idTarea.split("#");
	$("#eliminarTareas").html("Esta seguro de eliminar la tarea "+ idTarea[1] +", así como sus contenidos relacionados");
	$("#eliminarTareas").dialog("open");
	$("#hdnEliminaTarea").attr("value",idTarea[1]);
}
function borrarTarea(hdnEliminaTarea){
	idCliente=$("#idClienteTareas").val();
	idUsuario=$("#idUsuarioTareas").val();
	parametros="action=eliminaTarea&idCliente="+idCliente+"&idUsuario="+idUsuario+"&idTarea="+hdnEliminaTarea;
	ajaxTareas("eliminaTarea","controlador",parametros,"divMenssajesTareas","divMenssajesTareas","POST");
	$("#divMenssajesTareas").dialog("open");
}
/*
*Muestra los usuarios para ser seleccionados mediante el catalogo
*/
function cargarUsuarios(txtFiltro,origen){
	$("#accionTareaEditar").attr("value",origen);
	(txtFiltro=="N/A") ? filtro=txtFiltro : filtro=txtFiltro;
	idCliente=$("#idClienteTareas").val();
	idUsuario=$("#idUsuarioTareas").val();
	parametros="action=listarUsuarios&idCliente="+idCliente+"&idUsuario="+idUsuario+"&filtro="+filtro;
	//ajaxTareas(accion,c,parametros,divCarga,divResultado,tipoPeticion)
	ajaxTareas("listarUsuarios","controlador",parametros,"listadoUsuariosTareas","listadoUsuariosTareas","GET");
}
/*
*Muestra los cuestionarios para ser seleccionados mediante el catalogo
*/
function cargarCuestionarios(txtFiltro,origen){
	$("#accionTareaEditar").attr("value",origen);
	(txtFiltro=="N/A") ? filtro=txtFiltro : filtro=txtFiltro;
	idCliente=$("#idClienteTareas").val();
	idUsuario=$("#idUsuarioTareas").val();
	parametros="action=listarCuestionarios&idCliente="+idCliente+"&idUsuario="+idUsuario+"&filtro="+filtro;
	ajaxTareas("listarCuestionarios","controlador",parametros,"listadoCuestionarioTareas","listadoCuestionarioTareas","GET");
}
/*
*Muestra los usuarios para ser seleccionados mediante el catalogo
*/
function cargarPDI(txtFiltro,origen){
	$("#accionTareaEditar").attr("value",origen);
	(txtFiltro=="N/A") ? filtro=txtFiltro : filtro=txtFiltro;
	idCliente=$("#idClienteTareas").val();
	idUsuario=$("#idUsuarioTareas").val();
	parametros="action=listarPDI&idCliente="+idCliente+"&idUsuario="+idUsuario+"&filtro="+filtro;
	//ajaxTareas(accion,c,parametros,divCarga,divResultado,tipoPeticion)
	ajaxTareas("listarPDI","controlador",parametros,"listadoPDITareas","listadoPDITareas","GET");
}
/*
*Funcion para recuperar el contenido de la caja de texto de las busqueda de usuarios
*/
function buscarUsuariosTareas(){
	txtFiltro=$("#txtBuscarUsuariosTarea").val();
	if(txtFiltro.length >=3 ){
		//se llama a la funcion cargarUsuarios
		cargarUsuarios(txtFiltro);
	}else{
		cargarUsuarios('N/A');
	}
}
/*
*Funcion para recuperar el contenido de la caja de texto de las busqueda de cuestionarios
*/
function buscarCuestionariosTareas(){
	txtFiltro=$("#txtBuscarCuestionariosTarea").val();
	if(txtFiltro.length >=1 ){
		//se llama a la funcion cargarUsuarios
		cargarCuestionarios(txtFiltro);
	}else{
		cargarCuestionarios('N/A');
	}
}
/*
*Funcion para recuperar el contenido de la caja de texto de las busqueda de cuestionarios
*/
function buscarPDITareas(){
	txtFiltro=$("#txtBuscarPDITarea").val();
	if(txtFiltro.length >=1 ){
		//se llama a la funcion cargarUsuarios
		//cargarCuestionarios(txtFiltro);
		cargarPDI(txtFiltro);
	}else{
		//cargarCuestionarios('N/A');
		cargarPDI("N/A");
	}
}
/*
*Funcion para recuperar los usuarios seleccionados
*/
function agregarUsuariosSeleccionados(origenAccionTarea){
	var elementos="";
	var divRespuesta="";
	if(origenAccionTarea=="nuevaTarea"){
		divRespuesta="usuariosAsignados";
	}else if(origenAccionTarea=="editarTarea"){
		divRespuesta="usuariosAsignadosEditar";
	}

	for (var i=0;i<document.frmListadoUsuariosTareas.elements.length;i++){
	 	if (document.frmListadoUsuariosTareas.elements[i].type=="checkbox"){
	 		if (document.frmListadoUsuariosTareas.elements[i].checked){				
	 			if (elementos=="")
	 				elementos=elementos+document.frmListadoUsuariosTareas.elements[i].value;
	 			else
	 				elementos=elementos+",,,"+document.frmListadoUsuariosTareas.elements[i].value;
	 		}	
	 	}
	}
	//alert(divRespuesta);
	if(elementos==""){//si no selecciono ningun usuario
		$("#divMenssajesTareas").html("<p><span class='ui-icon ui-icon-alert' style='float:left; margin:0 7px 20px 0;'></span>Error, seleccione por lo menos un usuario del listado.</p>");
		$("#divMenssajesTareas").dialog("open");
	}else{
		$("#agregarUsuarios").dialog( "close" );//se cierra el dialog de usuarios
		arrayElementos=elementos.split(",,,");//separacion
		for(var i=0;i<arrayElementos.length;i++){
			usuariosAg=arrayElementos[i].split("|");
			//console.log("usuarioAg :"+usuariosAg);
			idDivUsuarios="idUsuarioDiv_"+usuariosAg[0];
			//console.log("idDivUsuarios: "+idDivUsuarios);
			//se arma la estructura
			usuariosAgDiv="<div id='"+idDivUsuarios+"' class='estiloUsuariosAgregadosDiv'><a href='#' onclick='quitarUsuariosDiv("+usuariosAg[0]+")' title='Quitar Usuario de la tarea'><img src='./public/images/cross.png' border='0' /></a>&nbsp;"+usuariosAg[1]+"</div>";
			//console.log("usuariosDiv :"+usuariosAgDiv);
			//se verifica que no exista el usuario ya en el listado
			//console.log(divRespuesta);
			if ($('#'+idDivUsuarios).length==0){
 				//se agregan los usuarios al divResultado
				$("#"+divRespuesta).append(usuariosAgDiv);	
			}else{
				console.log("existe :"+idDivUsuarios);
			}
			usuariosAgDiv="";
		}
	}
}
/*
*Funcion para retirar un usuario del listado seleccionado 
*/
function quitarUsuariosDiv(idUsuarioAQuitar){
	idDivQuitar="idUsuarioDiv_"+idUsuarioAQuitar;
	$("#"+idDivQuitar).remove();
}
/*
*Funcion para recuperar los cuestionarios seleccionados
*/
function agregaCuestionariosTarea(origenAccionTarea){
	console.log(origenAccionTarea)
	var divRespuesta="";
	if(origenAccionTarea=="nuevaTareaC"){
		divRespuesta="cuestionariosAsignados";
	}else if(origenAccionTarea=="editarTareaC"){
		divRespuesta="cuestionariosAsignadosEditar";
	}
	//cSeleccionado=$(":input[name=rdbCuestionarios]:checked").val());
	cSeleccionado=$("input[name='rdbCuestionarios']:checked").val();
	if(cSeleccionado=="" || cSeleccionado==null || cSeleccionado==undefined){
		$("#divMenssajesTareas").html("<p><span class='ui-icon ui-icon-alert' style='float:left; margin:0 7px 20px 0;'></span>Error, seleccione por lo menos un cuestionario del listado.</p>");
		$("#divMenssajesTareas").dialog("open");
	}else{
		$("#agregarCuestionarios").dialog("close");
		arrayElementosC=cSeleccionado.split("|");
		idDivCuestionarios="idCuestionarioDiv_"+arrayElementosC[0];
		//se arma la estructura para mostrarlo en pantalla
		cuestiosnarioAsig="<div id='"+idDivCuestionarios+"' class='estiloUsuariosAgregadosDiv'><a href='#' onclick='quitarCuestionarioDiv("+arrayElementosC[0]+")' title='Quitar Usuario de la tarea'><img src='./public/images/cross.png' border='0' /></a>&nbsp;"+arrayElementosC[1]+" - "+arrayElementosC[2]+"</div>";
		
		var estaVacioC = $('#'+divRespuesta).is(':empty');
		//se verifica que el div este vacio
		if(estaVacioC===false){
			$("#"+divRespuesta).empty();
		}else{
			console.log("No esta vacio")
		}
		//se verifica que el div no exista en el listado
		if ($('#'+idDivCuestionarios).length==0){
	 		//se agregan los cuestionarios al divResultado
			$("#"+divRespuesta).append(cuestiosnarioAsig);	
		}else{
			console.log("existe");
		}
	}
}
/*
*Funcion para retirar un cuestionario del listado seleccionado 
*/
function quitarCuestionarioDiv(idCuestionarioAQuitar){
	idDivCuestionarios="idCuestionarioDiv_"+idCuestionarioAQuitar;
	$("#"+idDivCuestionarios).remove();
}
/*
*Funcion para recuperar los PDI seleccionados
*/
function verificarPayload(idCuestionario){
	console.log("Verificar payload: "+idCuestionario);
	parametros="action=verificarPayloadCuestionario&idCuestionario="+idCuestionario;
	ajaxTareas("verificarPayloadCuestionario","controlador",parametros,"buscarPayload","buscarPayload","POST");

}
function verInfoPayload(){
	parametros="action=verInfoPayload&idCuestionario="+idCuestionarioPayload[0];
	console.log("Informacion payload: "+parametros);
	ajaxTareas("verInfoPayload","controlador",parametros,"verInfoPayload","verInfoPayload","POST");
	$("#verInfoPayload").dialog("open");
}
/*
*Funcion para recuperar los PDI seleccionados
*/
function agregaPDITarea(origenAccionTarea){
	console.log(origenAccionTarea)
	var divRespuesta="";
	if(origenAccionTarea=="nuevaTareaC"){
		divRespuesta="pdiAsignado";
	}else if(origenAccionTarea=="editarTareaC"){
		divRespuesta="pdiAsignadoEditar";
	}
	console.log("Div respuesta: "+divRespuesta);
	//cSeleccionado=$(":input[name=rdbCuestionarios]:checked").val());
	cSeleccionado=$("input[name='rdbPDI']:checked").val();
	console.log(cSeleccionado);
	if(cSeleccionado=="" || cSeleccionado==null || cSeleccionado==undefined){
		$("#divMenssajesTareas").html("<p><span class='ui-icon ui-icon-alert' style='float:left; margin:0 7px 20px 0;'></span>Error, seleccione por lo menos un Punto de interes del listado.</p>");
		$("#divMenssajesTareas").dialog("open");
	}else{
		$("#agregarPDI").dialog("close");
		arrayElementosC=cSeleccionado.split("|");
		idDivCuestionarios="idPDIDiv_"+arrayElementosC[0];
		//se arma la estructura para mostrarlo en pantalla
		cuestiosnarioAsig="<div id='"+idDivCuestionarios+"' class='estiloUsuariosAgregadosDiv'><a href='#' onclick='quitarPDIDiv("+arrayElementosC[0]+")' title='Quitar PDI de la tarea'><img src='./public/images/cross.png' border='0' /></a>&nbsp;"+arrayElementosC[1]+"</div>";
		
		var estaVacioC = $('#'+divRespuesta).is(':empty');
		//se verifica que el div este vacio
		if(estaVacioC===false){
			$("#"+divRespuesta).empty();
		}else{
			console.log("No esta vacio")
		}
		//se verifica que el div no exista en el listado
		if ($('#'+idDivCuestionarios).length==0){
	 		//se agregan los cuestionarios al divResultado
			$("#"+divRespuesta).append(cuestiosnarioAsig);	
		}else{
			console.log("existe");
		}
		//adaptacion para bajar los datos de direccion
		idDetallePDI="hdnDatosPdi_"+arrayElementosC[0];
		detallePDI=$("#"+idDetallePDI).val();
		detallePDI=detallePDI.split("|||");
		console.log(detallePDI);
		//nombres de los elementos
		if(origenAccionTarea=="editarTareaC"){
			txtLatitud="txtLatitudEditar";
			txtLongitud="txtLongitudEditar";
			txtCalle="txtCalleEditar";
			txtColonia="txtColoniaEditar";
			txtMunicipio="txtMunicipioEditar";
			txtEstado="txtEstadoEditar";
			txtCP="txtCPEditar";
		}else{
			txtLatitud="txtLatitud";
			txtLongitud="txtLongitud";
			txtCalle="txtCalle";
			txtColonia="txtColonia";
			txtMunicipio="txtMunicipio";
			txtEstado="txtEstado";
			txtCP="txtCP";
		}

		$("#"+txtLatitud).attr("value",trim(detallePDI[0]));
		$("#"+txtLongitud).attr("value",trim(detallePDI[1]));
		$("#"+txtCalle).attr("value",trim(detallePDI[3])+","+trim(detallePDI[4])+","+trim(detallePDI[2]));
		$("#"+txtColonia).attr("value",trim(detallePDI[5]));
		$("#"+txtMunicipio).attr("value",trim(detallePDI[6]));
		$("#"+txtEstado).attr("value",trim(detallePDI[7]));
		$("#"+txtCP).attr("value",trim(detallePDI[8]));
	}
}
function trim(cadena){
       cadena=cadena.replace(/^\s+/,'').replace(/\s+$/,'');
       return(cadena);
}
/*
*Funcion para retirar un cuestionario del listado seleccionado 
*/
function quitarPDIDiv(idPDIAQuitar){
	idDivPDIaQuitar="idPDIDiv_"+idPDIAQuitar;
	$("#"+idDivPDIaQuitar).remove();
}
/*
*Funcion para habilitar/deshabilitar la vista de cuestionarios en el formulario
*/
function habilitaSeccionCuestionarios(accion){
	if(accion==0){
		$("#seleccionCuestionariosBtn").show();
		$("#seleccionCuestionariosDiv").show();
		$("#cuestionariosAsignados").empty();
	}else if(accion==1){
		$("#seleccionCuestionariosBtn").hide();
		$("#seleccionCuestionariosDiv").hide();
	}
}
/*
*Funcion para guardar la edicion de la tarea 
*/
function guardarEdicionTarea(){
	var idTareaEditar=$("#idTareaEditar").val();
	//se recuperan los datos esenciales
	var nombreTareaE=$("#txtNombreTareaEditar").val();
	var fechaProgramadaE=$("#fechaProgramadaEditar").val();
	var txtDescripcionTareaE=$("#txtDescripcionTareaEditar").val();
	var cboPrioridadE=$("#cboPrioridadEditar").val();
	var usuariosSeleccionados="";//variable para recuperar los usuarios seleccionados
	//recuperar los usuarios seleccionados para la tarea
	$("#usuariosAsignadosEditar div").each(function( index ) {
		//	console.log(this.id);
		idUsuario=this.id.split("_");

		if(usuariosSeleccionados==""){
			usuariosSeleccionados=idUsuario[1];
		}else{
			usuariosSeleccionados=usuariosSeleccionados+",,,"+idUsuario[1];
		}
	});

	//se recupera la ubicacion
	var calleE=$("#txtCalleEditar").val();
	var coloniaE=$("#txtColoniaEditar").val();
	var municipioE=$("#txtMunicipioEditar").val();
	var estadoE=$("#txtEstadoEditar").val();
	var cpE=$("#txtCPEditar").val();
	var txtLatitudE=$("#txtLatitudEditar").val();
	var txtLongitudE=$("#txtLongitudEditar").val();
	//se recupera si hay un cuestionario seleccionado
	var cuestionarioSeleccionado="";
	//se evalua el check de los cuestionarios
	//if($("#habilitaCuestionarios").is(':checked')) {  
        //alert("Se espera cuestionario"); 
        $("#cuestionariosAsignadosEditar div").each(function( index ) {
			//console.log(this.id);
			idUsuario=this.id.split("_");

			if(cuestionarioSeleccionado==""){
				cuestionarioSeleccionado=idUsuario[1];
			}else{
				cuestionarioSeleccionado=cuestionarioSeleccionado+",,,"+idUsuario[1];
			}
		}); 
    //} else {  
        //opcion por default  
    //    cuestionarioSeleccionado=0;
    //}
//proceso para la recuperacion del pdi
    var estaVacioPdi = $('#pdiAsignadoEditar').is(':empty');
    if(estaVacioPdi==false){
		$("#pdiAsignadoEditar div").each(function( index ) {
			//console.log("item number PDI "+this.id);
			itemNumberPdi=this.id.split("_");
			//console.log($("#"+this.id).text());
			pdiSeleccionadoE=trim($("#"+this.id).text());
		});
    }else{
    	pdiSeleccionadoE=0;
    }

    if(nombreTareaE=="" || fechaProgramadaE=="" || txtDescripcionTareaE=="" || cboPrioridadE=="--" || usuariosSeleccionados==""){
		$("#divMenssajesTareas").html("<p><span class='ui-icon ui-icon-alert' style='float:left; margin:0 7px 20px 0;'></span>Error, verifique que los campos marcados con (*) no se encuentren vacios.</p>");
		$("#divMenssajesTareas").dialog("open");
	}else{
		//se comprueban los datos antes de enviarse
		console.log(nombreTareaE);
		console.log(fechaProgramadaE);
		console.log(txtDescripcionTareaE);
		console.log(cboPrioridadE);

		console.log(usuariosSeleccionados);

		console.log(calleE);
		console.log(coloniaE);
		console.log(municipioE);
		console.log(estadoE);
		console.log(cpE);

		console.log(cuestionarioSeleccionado);
		console.log(pdiSeleccionadoE);
		console.log(txtLatitudE);
		console.log(txtLongitudE);

		idCliente=$("#idClienteTareas").val();
		idUsuario=$("#idUsuarioTareas").val();
		parametros="action=guardarEdicionTarea&idCliente="+idCliente+"&idUsuario="+idUsuario+"&nombreTarea="+nombreTareaE+"&fechaProgramada="+fechaProgramadaE+"&txtDescripcionTarea="+txtDescripcionTareaE+"&cboPrioridad="+cboPrioridadE+"&usuariosSeleccionados="+usuariosSeleccionados+"&calle="+calleE+"&colonia="+coloniaE+"&municipio="+municipioE+"&estado="+estadoE+"&cp="+cpE+"&cuestionarioSeleccionado="+cuestionarioSeleccionado+"&idTareaEditar="+idTareaEditar+"&pdiSeleccionadoEditar="+pdiSeleccionadoE+"&txtLatitudEditar="+txtLatitudE+"&txtLongitudEditar="+txtLongitudE;
		ajaxTareas("guardarEdicionTarea","controlador",parametros,"divMenssajesTareas","divMenssajesTareas","POST");
		$("#divMenssajesTareas").dialog("open");
		//se guardan los usuarios en el array creado
		usuariosTareasNotificaciones.push(usuariosSeleccionados);
		usuariosTareasNotificaciones.push(nombreTareaE);
	}

}
/*
*Funcion para el guardado de la tarea 
*/
function guardarTarea(){
	//se recuperan los datos esenciales
	var nombreTarea=$("#txtNombreTarea").val();
	var fechaProgramada=$("#fechaProgramada").val();
	var txtDescripcionTarea=$("#txtDescripcionTarea").val();
	var cboPrioridad=$("#cboPrioridad").val();
	var usuariosSeleccionados="";//variable para recuperar los usuarios seleccionados
	
	//recuperar los usuarios seleccionados para la tarea
	$("#usuariosAsignados div").each(function( index ) {
		//	console.log(this.id);
		idUsuario=this.id.split("_");

		if(usuariosSeleccionados==""){
			usuariosSeleccionados=idUsuario[1];
		}else{
			usuariosSeleccionados=usuariosSeleccionados+",,,"+idUsuario[1];
		}
	});

	//se recupera la ubicacion
	var calle=$("#txtCalle").val();
	var colonia=$("#txtColonia").val();
	var municipio=$("#txtMunicipio").val();
	var estado=$("#txtEstado").val();
	var cp=$("#txtCP").val();

	//se recupera si hay un cuestionario seleccionado
	var cuestionarioSeleccionado="";
	//se evalua el check de los cuestionarios
	if($("#habilitaCuestionarios").is(':checked')) {  
        //alert("Se espera cuestionario"); 
        $("#cuestionariosAsignados div").each(function( index ) {
			//console.log(this.id);
			idUsuario=this.id.split("_");

			if(cuestionarioSeleccionado==""){
				cuestionarioSeleccionado=idUsuario[1];
			}else{
				cuestionarioSeleccionado=cuestionarioSeleccionado+",,,"+idUsuario[1];
			}
		}); 
    } else {  
        //opcion por default  
        cuestionarioSeleccionado=0;
    }
    //proceso para la recuperacion del pdi
    var estaVacioPdi = $('#pdiAsignado').is(':empty');
    if(estaVacioPdi==false){
		$("#pdiAsignado div").each(function( index ) {
			//console.log("item number PDI "+this.id);
			itemNumberPdi=this.id.split("_");
			//console.log($("#"+this.id).text());
			pdiSeleccionado=trim($("#"+this.id).text());
		});
    }else{
    	pdiSeleccionado=0;
    }

    latitud=$("#txtLatitud").val();
    longitud=$("#txtLongitud").val();

	console.log(nombreTarea);
	console.log(fechaProgramada);
	console.log(txtDescripcionTarea);
	console.log(cboPrioridad);

	console.log(usuariosSeleccionados);

	console.log(calle);
	console.log(colonia);
	console.log(municipio);
	console.log(estado);
	console.log(cp);

	console.log(cuestionarioSeleccionado);
	console.log(pdiSeleccionado);

	console.log("strIdCuestionario: "+strIdCuestionario);

	console.log("agregar Payload: "+agregarPayload);


	//proceso de validacion
	if(nombreTarea=="" || fechaProgramada=="" || txtDescripcionTarea=="" || cboPrioridad=="--" || usuariosSeleccionados==""){
		$("#divMenssajesTareas").html("<p><span class='ui-icon ui-icon-alert' style='float:left; margin:0 7px 20px 0;'></span>Error, verifique que los campos marcados con (*) no se encuentren vacios.</p>");
		$("#divMenssajesTareas").dialog("open");
	}else{
		//verificarDatosCuestionarioPayload(pdiSeleccionado,cuestionarioSeleccionado);
		
		
		idCliente=$("#idClienteTareas").val();
		idUsuario=$("#idUsuarioTareas").val();
		parametros="action=guardarTarea&idCliente="+idCliente+"&idUsuario="+idUsuario+"&nombreTarea="+nombreTarea+"&fechaProgramada="+fechaProgramada+"&txtDescripcionTarea="+txtDescripcionTarea+"&cboPrioridad="+cboPrioridad+"&usuariosSeleccionados="+usuariosSeleccionados+"&calle="+calle+"&colonia="+colonia+"&municipio="+municipio+"&estado="+estado+"&cp="+cp+"&cuestionarioSeleccionado="+cuestionarioSeleccionado+"&pdiSeleccionado="+pdiSeleccionado+"&latitud="+latitud+"&longitud="+longitud+"&agregarPayload="+agregarPayload;
		console.log("Parametros: "+parametros);
		
		ajaxTareas("guardarTarea","controlador",parametros,"divMenssajesTareas","divMenssajesTareas","POST");
		$("#divMenssajesTareas").dialog("open");
		
		agregarPayload=false;

		
		//se guardan los usuarios en el array creado
		usuariosTareasNotificaciones.push(usuariosSeleccionados);
		usuariosTareasNotificaciones.push(nombreTarea);
		
	}

}

function verificarDatosCuestionarioPayload(){
	
//se recupera si hay un cuestionario seleccionado
	var cuestionarioSeleccionado="";
	//se evalua el check de los cuestionarios
	if($("#habilitaCuestionarios").is(':checked')) {  
        //alert("Se espera cuestionario"); 
        $("#cuestionariosAsignados div").each(function( index ) {
			//console.log(this.id);
			idUsuario=this.id.split("_");

			if(cuestionarioSeleccionado==""){
				cuestionarioSeleccionado=idUsuario[1];
			}else{
				cuestionarioSeleccionado=cuestionarioSeleccionado+",,,"+idUsuario[1];
			}
		}); 
    } else {  
        //opcion por default  
        cuestionarioSeleccionado=0;
    }
    //proceso para la recuperacion del pdi
    var estaVacioPdi = $('#pdiAsignado').is(':empty');
    if(estaVacioPdi==false){
		$("#pdiAsignado div").each(function( index ) {
			//console.log("item number PDI "+this.id);
			itemNumberPdi=this.id.split("_");
			//console.log($("#"+this.id).text());
			pdiSeleccionado=trim($("#"+this.id).text());
		});
    }else{
    	pdiSeleccionado=0;
    }



	console.log("PDi seleccionado: "+pdiSeleccionado);
	console.log("ID cuestionario: "+cuestionarioSeleccionado);
	



	parametros="action=verificaDatosCuestionarioPayload&itemNumberPDi="+pdiSeleccionado+"&idCuestionario="+cuestionarioSeleccionado;
	//ajaxTareas("verificaDatosCuestionarioPayload","controlador",parametros,"buscarPayload","buscarPayload","POST");
	$.ajax({
      	url: "index.php?m=mTareas&c=controlador",
      	type: "POST",
		data: parametros,
      	beforeSend: function(){
      		$("#buscarPayload").show().html("Verificando Payload");
      	},
      	success: function(data) {
      		var result = data;

      		console.log(result);

			if(result=="1"){
				$("#verificacionPayload").html("El cuestionario seleccionado tiene un Payload cargado<br><br>¿Desea asignarlo a la tarea actual?");
				$("#verificacionPayload").dialog("open");
			}else if(result=="0"){
				guardarTarea();
			}

        	//$("#buscarPayload").html(result);

      	}
    });
    var verificacion=agregarPayload;
    return verificacion;
}
/*************************************** area de procesos para el importador ***************/
function Importar_Excel() {
	    $.ajax({
          url: "index.php?m=mTareas&c=mSubirArchivo",
          success: function(data) {
            var result = data; 
            $('#dialogo_importador').html('');
            $('#dialogo_importador').dialog('open');
			$('#dialogo_importador').html(result); 
			 BuscarCargas();
          }
      });
	 
}

/********************************** funcion que muestra ventana de aviso para no utilizar la funcion alert(); */

function MensajesAviso(texto){    
var img = '<img id="img_impotador" src="modules/mTareas/template/images/w.png"> <b style=" font-size:45;">Aviso!! </b><br/>';
var a1 = '<p align="center">';
var a2 = '</p>';
 $('#dialogo_mensajes_importador').html('');
 $('#dialogo_mensajes_importador').dialog('open');
 $('#dialogo_mensajes_importador').html(img+a1+texto+a2); 	
}

/*********************************************************************************************/

function leer_excel(archivo){
	 $('#respuestas_importador_cuerpo').html('Extrayendo datos espere...');
	  $.ajax({
          url: "public/libs/PHPExcleReader/ProcesoLeerXlsx.php",
		  data : {
            nombre_archivo:archivo
		   },
		   type: "POST",
            success: function(data) {
           $('#respuestas_importador_cuerpo').html(data);
		   $( "#boton_aceptar_importar" ).prop( "disabled", false );
          }
      });
  	
}

/*******************************************************************************************/

function BuscarCargas(){
   
   $('#total_cargas').html('Buscando Cargas espere...');
	  $.ajax({
          url: "index.php?m=mTareas&c=mBuscarCargas",
		    type: "POST",
            success: function(data) {
           $('#total_cargas').html(data);
          }
    });
}

/***************************************************************************************/
function geo_down_format(){
   window.location="public/Descargas/FormatoTareas.xlsx";
}	

//************************************************************************* nuevas funciones para catalogos 2015
function formularioCatNuevo(){
  $("#dialogoCrearCatalogo").dialog( "open" );	
}

function pintaContenido(cliente,catalogo,tipo){
	
	 $("#divCatalogo").html(cliente+' '+catalogo+' '+tipo);
	/* $('#respuestas_importador_cuerpo').html('Extrayendo datos espere...');
	  $.ajax({
          url: "public/libs/PHPExcleReader/ProcesoLeerXlsx.php",
		  data : {
            nombre_archivo:archivo
		   },
		   type: "POST",
            success: function(data) {
           $('#respuestas_importador_cuerpo').html(data);
		   $( "#boton_aceptar_importar" ).prop( "disabled", false );
          }
      });*/
  	
}





