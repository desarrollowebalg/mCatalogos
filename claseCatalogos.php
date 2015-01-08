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

   /**
	*@method 		avisoCatalogosExistentes
	*@description 	Funcion para pintar aviso si no hay catalogos para el cliente
	*@paramas 				
	*
	*/
	public function creaNuevoCatalogo($idCliente,$nombre){
		$objDb=$this->iniciarConexionDb();
		$sqlE="INSERT INTO CAT2_CATALOGO (ID_CLIENTE,NOMBRE,FECHA_CREACION) VALUES('".$idCliente."','".
																						 $nombre."','".
																						 date('Y-m-d H:i:s')."')";
		$resE=$objDb->sqlQuery($sqlE);
		
		if($resE){
		  $this->crearCarpetasCatalogo($idCliente,$nombre);
		  $res_x = 1;	

		}else{
		  $res_x = 0;	
		}
      echo $res_x ;
	}
  /**
	*@method 		crearCarpetasCatalogo
	*@description 	Funcion para crear estructura de carpetas en /cat
	*@paramas 				
	*
	*/
 	public function crearCarpetasCatalogo($idCliente,$nombre){
	 mkdir('cat/'.$idCliente.'_'.$nombre, 0700);
		 mkdir('cat/'.$idCliente.'_'.$nombre.'/1', 0700);
		 mkdir('cat/'.$idCliente.'_'.$nombre.'/2', 0700);
		 mkdir('cat/'.$idCliente.'_'.$nombre.'/3', 0700);
		 mkdir('cat/'.$idCliente.'_'.$nombre.'/4', 0700);	 			 
     }
   /**
	*@method 		crearCarpetasCatalogo
	*@description 	Funcion para crear estructura de carpetas en /cat
	*@paramas 				
	*
	*/
 	public function dibujArbol($idCliente){
	$cadenArbol = '';
	 $objDb=$this->iniciarConexionDb();
		$sqlE="SELECT ID_CATALOGO,NOMBRE FROM CAT2_CATALOGO WHERE ID_CLIENTE =".$idCliente." ORDER BY NOMBRE";
		$resE=$objDb->sqlQuery($sqlE);
		
		if($objDb->sqlEnumRows($resE)>0){
			$cadenArbol = '<ul id="browser" class="filetree">';
		    while($rowADD=$objDb->sqlFetchArray($resE)){
				  $cadenArbol .= '<li><span class="folder">'.$rowADD['NOMBRE'].'</span>
										<ul>'.
  											$this->tipoArchivo($idCliente,$rowADD['ID_CATALOGO'])
										.'</ul></li>';	
			}
			$cadenArbol .= '</ul>';
	   }
	  echo 	 $cadenArbol;
     }
	 
	   /**
	*@method 		tipoArchivo
	*@description 	Funcion para crear ul con los tipos de archivos de la tabla CAT2_TIPO_ARCHIVO
	*@paramas 				
	*
	*/
 	public function tipoArchivo($idCliente,$idCatalogo){
		$cadenaCarpeta = '';
	    $objDb=$this->iniciarConexionDb();
		$sqlF="SELECT * FROM CAT2_TIPO_ARCHIVO";
		$resF=$objDb->sqlQuery($sqlF);
		
		if($objDb->sqlEnumRows($resF)>0){
			
		    while($rowADD=$objDb->sqlFetchArray($resF)){
					   $cadenaCarpeta .= '<li><span class="folder" onclick="pintaContenido('.$idCliente.','.
					   																$idCatalogo.','.
																					$rowADD['ID_TIPO_ARCHIVO'].');" style="cursor:pointer;">'.
																					$rowADD['DESCRIPCION'].'</span>';
			}
	   }
	   return $cadenaCarpeta;
     }
	 

}//fin de la clase catalogos

?>