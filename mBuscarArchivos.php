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
				   b.ID_ARCHIVO,
				   b.ORDEN,
				   b.TITULO,
				   b.RESUMEN,
				   b.PATH,
				   c.RUTA,
				   b.VISIBLE 
		    FROM CAT2_CATALOGO a 
			INNER JOIN CAT2_ARCHIVO b ON a.ID_CATALOGO = b.ID_CATALOGO
			INNER JOIN CAT2_FORMATOS c ON b.FORMATO = c.ID_FORMATO
		    WHERE a.ID_CLIENTE = '.$_POST['cliente'].' AND 
			      a.ID_CATALOGO = '.$_POST['catalogo'].' AND 
				  b.ID_TIPO = '.$_POST['tipo'].' AND 
				  b.VISIBLE = 1';
				  
				  
	$qry = $db->sqlQuery($sql);
	$cnt = $db->sqlEnumRows($qry);
	if($cnt>0){ 
	 	$tabla = '<table border="1" width="100%" style="border-collapse:collapse;" bordercolor="#EAEAEA">';
	 	$tabla .= '<tr><td colspan="3" align="center" style=" background-color:#0072A8;color:#FFF;">Archivos</td></tr>';
			while($row = $db->sqlFetchArray($qry)){	
		 	      $tabla .= '<tr align="center"><td width="50" ><img src="'.$row['RUTA'].'" width="50" height="50" /></td><td>'.$row['TITULO'].'</td><td width="80" onclick="verDetalles(\''.
				  $row['TITULO'].'\',\''.$row['RESUMEN'].'\',\''.$row['PATH'].'\',\''.$row['RUTA'].'\',\''.$row['ID_TIPO'].'\',\''.$row['ID_ARCHIVO'].'\');" style="cursor:pointer;">Ver detalles</td></tr>';			
			}
	 	$tabla .= '</table>';
	}else{
			$tabla = '<table border="1" width="100%" style="border-collapse:collapse;" bordercolor="#EAEAEA">';
			$tabla .= '<tr align="center"> <td colspan="3"  style=" background-color:#0072A8;color:#FFF;">Archivos</td></tr>';
			$tabla .= '<tr align="center"><td width="50" >Sin Imagen</td><td> Sin Archivo</td><td width="80">Sin detalles</td></tr>';	
			$tabla .= '</table>';
	}
	
	echo $tabla;
?>