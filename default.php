<?php
/** * 
 *  @package             
 *  @name                Pagina default del modulo catalogo 
 *  @version             1
 *  @copyright           Air Logistics & GPS S.A. de C.V.   
 *  @author              Daniel Arazo
 *  @modificado          06-01-2015
**/
	$db = new sql($config_bd['host'],$config_bd['port'],$config_bd['bname'],$config_bd['user'],$config_bd['pass']);
	if(!$userAdmin->u_logged())
		echo '<script>window.location="index.php?m=login"</script>';
	
	$tpl->set_filenames(array('default'=>'default'));	
	$idProfile   = $userAdmin->user_info['ID_PROFILE'];
	$idCliente   = $userAdmin->user_info['ID_CLIENTE'];
	$idUsuario	 = $userAdmin->user_info['ID_USUARIO'];
	$nombreServidor	 = $userAdmin->user_info['RUTA_FOTOS_EVIDENCIAS'];
	
	$sql ='SELECT RUTA_FOTOS_EVIDENCIAS FROM ADM_CLIENTES WHERE ID_CLIENTE = '.$idCliente;
	$result=$db->sqlQuery($sql);
	$row=$db->sqlFetchArray($result);

	/*echo "<pre>";
	print_r($userAdmin);
	echo "</pre>";*/
	/*
	$arbol = '<ul id="browser" class="filetree">
		<li><span class="folder">Blancos</span>
			<ul>
				<li><span class="folder">PDF</span>
					<ul id="folder21">
						<li><span class="file">File 1.1.1</span></li>
						
					</ul>
				</li>
			</ul>
		</li>
		<li><span class="folder">Deportes</span>
			<ul>
				<li><span class="folder">PDF</span>
					<ul id="folder21">
						<li><span class="file">File 1.1.1</span></li>
						<li><span class="file">File 1.1.2</span></li>
					</ul>
				</li>
			</ul>
         </li>
	</ul>';*/
	
	
	$tpl->assign_vars(array(
		'PAGE_TITLE'	=> "Administraci&oacute;n de Catalogos",	
		'PATH'			=> $dir_mod,
		'IDCLIENTE'		=> $idCliente,
		'IDUSUARIO'	    => $idUsuario,
		'NOMBRE_SERVIDOR' => $row['RUTA_FOTOS_EVIDENCIAS']
		
	));
	$tpl->pparse('default');
?>