<?php
/*
*/
    header('Content-Type: text/html; charset=UTF-8');
 	$db = new sql($config_bd['host'],$config_bd['port'],$config_bd['bname'],$config_bd['user'],$config_bd['pass']);

	if(!$userAdmin->u_logged())
	echo '<script>window.location="index.php?m=login"</script>';
   
    $tpl->set_filenames(array('mUsuariosAsignados' => 'tUsuariosAsignados'));
	
		$tabla = '';
		
		$sql = 'SELECT * FROM CAT2_ARCHIVO_USUARIO WHERE ID_ARCHIVO ='.$_POST['idArchivo'];
					  
		$qry = $db->sqlQuery($sql);
		$cnt = $db->sqlEnumRows($qry);
		if($cnt>0){ 
		 $tabla  = $cnt;
		}   
	    //echo "dsds".$tabla;
	
	$tpl->pparse('mUsuariosAsignados');
	
?>