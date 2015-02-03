<?php
    header('Content-Type: text/html; charset=UTF-8');
 	$db = new sql($config_bd['host'],$config_bd['port'],$config_bd['bname'],$config_bd['user'],$config_bd['pass']);

	if(!$userAdmin->u_logged())
	echo '<script>window.location="index.php?m=login"</script>';

$cadena_usuarios = '';
   $sql_noti = "SELECT ID_USUARIO_ASIGNADO FROM CAT2_ARCHIVO_USUARIO 
   			  WHERE NOTIFICAR = 1 AND ID_CLIENTE = ".$userAdmin->user_info['ID_CLIENTE'].'
			   GROUP BY ID_USUARIO_ASIGNADO';
			
	$queri_noti = $db->sqlQuery($sql_noti);

		 
		 while($row_noti = $db->sqlFetchArray($queri_noti)){			  
              if($cadena_usuarios==''){
				  $cadena_usuarios = $row_noti['ID_USUARIO_ASIGNADO'];
			  }else{
				    $cadena_usuarios .= ','.$row_noti['ID_USUARIO_ASIGNADO'];
			  }
		 }
		 
		 echo $cadena_usuarios;
?>