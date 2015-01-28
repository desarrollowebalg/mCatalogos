<?php
/*
*/
    header('Content-Type: text/html; charset=UTF-8');
 	$db = new sql($config_bd['host'],$config_bd['port'],$config_bd['bname'],$config_bd['user'],$config_bd['pass']);

	if(!$userAdmin->u_logged())
	echo '<script>window.location="index.php?m=login"</script>';
   
   	 $tpl->set_filenames(array('mUsuariosAsignados' => 'tUsuariosAsignados'));
			
//------------------------------------------------------------------			  

$sql_ua = "SELECT B.ID_USUARIO,B.NOMBRE_COMPLETO 
							FROM CAT2_ARCHIVO_USUARIO A
							INNER JOIN ADM_USUARIOS B ON A.ID_USUARIO_ASIGNADO=B.ID_USUARIO
							WHERE A.ID_ARCHIVO =  ".$_POST['idArchivo']." 
							AND B.ID_CLIENTE = ".$userAdmin->user_info['ID_CLIENTE'];
			
	$queri_ua = $db->sqlQuery($sql_ua);
	//$count_ua = $db->sqlEnumRows($queri_ua);
	$row_ua = '';	
		 
		 while($row_uasignados = $db->sqlFetchArray($queri_ua)){			  
			 $row_ua .= ' <option value="'.$row_uasignados['ID_USUARIO'].'">'.$row_uasignados['NOMBRE_COMPLETO'].'</option> ';
		 }
	
	

	
//------------------------------------------------------------------			  
   $sql_usuarios_comple = "SELECT X1.ID_USUARIO,X1.NOMBRE_COMPLETO FROM ADM_USUARIOS X1
			 			    WHERE X1.ID_USUARIO NOT IN ( SELECT B.ID_USUARIO
															FROM CAT2_ARCHIVO_USUARIO A
															INNER JOIN ADM_USUARIOS B ON A.ID_USUARIO_ASIGNADO=B.ID_USUARIO
															WHERE A.ID_ARCHIVO =  ".$_POST['idArchivo']." 
														    AND B.ID_CLIENTE = ".$userAdmin->user_info['ID_CLIENTE'].")
							AND X1.ID_CLIENTE = ".$userAdmin->user_info['ID_CLIENTE'];
			
	$queri_usuarios_comple = $db->sqlQuery($sql_usuarios_comple);
	$count_usuarios_comple = $db->sqlEnumRows($queri_usuarios_comple);	
	$row_uc = '';	
		 
		 while($row_usuarios_comple = $db->sqlFetchArray($queri_usuarios_comple)){			  
			 $row_uc .= ' <option value="'.$row_usuarios_comple['ID_USUARIO'].'">'.$row_usuarios_comple['NOMBRE_COMPLETO'].'</option> ';
		 }

	      	    $tpl->assign_vars(array(
						'SUBMENU_UA'  => $row_ua,
						'SUBMENU_UC'  => $row_uc,
						'IDARCHIVO'			  =>$_POST['idArchivo']
						
				));




    	$tpl->pparse('mUsuariosAsignados');
	
?>