<?php
    header('Content-Type: text/html; charset=UTF-8');
 	$db  = new sql($config_bd['host'],$config_bd['port'],$config_bd['bname'],$config_bd['user'],$config_bd['pass']);

  
    if(!$userAdmin->u_logged())
		echo '<script>window.location="index.php?m=login"</script>';
	
	$pedazos = explode("|",$_GET['datos']);
	
    $sqlZ = "DELETE FROM CAT2_ARCHIVO_USUARIO WHERE ID_ARCHIVO = ".$pedazos[1];
	$queri = $db->sqlQuery($sqlZ);

	if($queri){
	   $resto = explode(",",$pedazos[0]);
	   $sql_insert = "INSERT INTO CAT2_ARCHIVO_USUARIO (ID_USUARIO_ASIGNADO,ID_ARCHIVO) VALUES";
	   $sql_cuerpo ="";
	   
	   for($a=0;$a<count($resto);$a++){
	   	 if($sql_cuerpo == ""){
	   	 	$sql_cuerpo = "(".$resto[$a].",".$pedazos[1].")";
	   	 }else{
	   	 	$sql_cuerpo = $sql_cuerpo.",(".$resto[$a].",".$pedazos[1].")";
	   	 }
	   }
	    
	   	$queris = $db->sqlQuery($sql_insert.$sql_cuerpo);
	    if($queri){
	    		echo 1;
	   	}else{
	    	echo 0;		
	   	}
	    	
	}else{
		echo 0;
	}
     
		
?>
