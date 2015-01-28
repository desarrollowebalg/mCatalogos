<?php
/**
*@name 				Controlador para las funciones de los Catalogos
*@copyright         Air Logistics & GPS S.A. de C.V.  
*@author 			Gerardo Lara
*/

if($_SERVER["HTTP_REFERER"]==""){
	echo "0";
}else{
	include "claseCatalogos.php";
	//se instancia la clase que contiene las funciones de los catalogos
	$objT=new catalogos();
	
	switch($_GET["action"]){
		
		case "avisoCatalogosExistentes":
		 if($objT->avisoCatalogosExistentes((int)$_GET["idCliente"])===0){
			echo  0;
		 }else{
			 echo 1;
		 }
		break;

		case "creaNuevoCatalogo":
		 $objT->creaNuevoCatalogo($_GET["idCliente"],$_GET["nombre"]);
		break;

		case "dibujArbol":
		$tpl->set_filenames(array('controlador' => 'tCrearArbol'));
		
		    $tpl->assign_vars(array(
				'ARBOL'          	=> $objT->dibujArbol($_GET["idCliente"])
				
			));
			$tpl->pparse('controlador');
		break;
		
		

	}
	
	switch($_POST["action"]){
		case "pintaContenido":
		 echo $objT->PintaContenido($_POST['cliente'],$_POST['catalogo'],$_POST['tipo']);
		break;
	}
}
?>