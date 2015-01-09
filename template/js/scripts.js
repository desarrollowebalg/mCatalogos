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