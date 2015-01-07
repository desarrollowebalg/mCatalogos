<?php
/**
*@description       Clase para el manejo de las diferentes operaciones en el modulo de catalogos
*@copyright         Air Logistics & GPS S.A. de C.V.  
*@author 			Gerardo Lara
*@version 			1.0.0
*/

class catalogos{

	private $objDb;
	private $host;
	private $port;
	private $bname;
	private $user;
	private $pass;

	function __construct() {
		include "config/database.php";
		$this->host=$config_bd['host'];
		$this->port=$config_bd['port'];
		$this->bname=$config_bd['bname'];
		$this->user=$config_bd['user'];
		$this->pass=$config_bd['pass'];
   	}
	/*
	*@method 			iniciar Conexion con la BD
	*@description 	Funcion para conectar con la base de datos
	*/
   	private function iniciarConexionDb(){
   		$objBd=new sql($this->host,$this->port,$this->bname,$this->user,$this->pass);
   		return $objBd;
   	}

/**
	*@method 		avisoCatalogosExistentes
	*@description 	Funcion para pintar aviso si no hay catalogos para el cliente
	*@paramas 				
	*
	*/
	public function avisoCatalogosExistentes($idCliente){
		$valor=0;
		$objDb=$this->iniciarConexionDb();
		$sqlE="SELECT * FROM CAT2_CATALOGO WHERE ID_CLIENTE = ".$idCliente;
		$resE=$objDb->sqlQuery($sqlE);
		
		if($objDb->sqlEnumRows($resE)>0){
			$valor=$objDb->sqlEnumRows($resE);
		}
		return $valor;
	}



}//fin de la clase Cuestionarios

?>