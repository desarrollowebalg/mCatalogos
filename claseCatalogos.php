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

}//fin de la clase Cuestionarios

?>