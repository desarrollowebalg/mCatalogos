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
		echo "avisoCatalogosExistentes jajaja".$objT->avisoCatalogosExistentes(1);
		break;
	}
	
	switch($_POST["action"]){
		
	}
}
?>