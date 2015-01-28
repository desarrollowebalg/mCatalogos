<?php
    header('Content-Type: text/html; charset=UTF-8');
 	$db  = new sql($config_bd['host'],$config_bd['port'],$config_bd['bname'],$config_bd['user'],$config_bd['pass']);

  
    if(!$userAdmin->u_logged())
		echo '<script>window.location="index.php?m=login"</script>';
	
	$pedazos = $_GET['id_submenu'];
	
    $sqlZ = "DELETE FROM CAT2_ARCHIVO_USUARIO WHERE ID_ARCHIVO = ".$pedazos;
	$queri = $db->sqlQuery($sqlZ);

	if($queri){
   		echo 1;
   	}else{
    	echo 0;		
   	}
	    	
	
?>
