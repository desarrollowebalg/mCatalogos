<?php
/*
*/
    header('Content-Type: text/html; charset=UTF-8');
 	$db = new sql($config_bd['host'],$config_bd['port'],$config_bd['bname'],$config_bd['user'],$config_bd['pass']);

	if(!$userAdmin->u_logged())
	echo '<script>window.location="index.php?m=login"</script>';
    
	$tabla = '';
	
	$sql = 'SELECT a.ID_CLIENTE,
				   a.NOMBRE,
				   b.ID_TIPO,
				   b.ORDEN,
				   b.TITULO,
				   b.RESUMEN,
				   b.PATH,
				   b.FORMATO,
				   b.VISIBLE 
		    FROM CAT2_CATALOGO a 
			INNER JOIN CAT2_ARCHIVO b ON a.ID_CATALOGO = b.ID_CATALOGO
		    WHERE a.ID_CLIENTE = '.$_POST['cliente'].' AND 
			      a.ID_CATALOGO = '.$_POST['catalogo'].' AND 
				  b.ID_TIPO = '.$_POST['tipo'].' AND 
				  b.VISIBLE = 1';
				  
				  
	$qry = $db->sqlQuery($sql);
	$cnt = $db->sqlEnumRows($qry);
	if($cnt>0){ 
	 	$tabla = '<table border="1" width="50%">';
	 	$tabla .= '<tr><td colspan="3" align="center" style=" background-color:#0072A8;color:#FFF;">Archivos</td></tr>';
			while($row = $db->sqlFetchArray($qry)){	
		 	      $tabla .= '<tr><td>'.$row['FORMATO'].'</td><td>'.$row['TITULO'].'</td><td>Ver...</td></tr>';			
			}
	 	$tabla .= '</table>';
	}
	
	echo $tabla;
?>