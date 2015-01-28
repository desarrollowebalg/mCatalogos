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
		$sqlE="INSERT INTO CAT2_CATALOGO (ID_CLIENTE,NOMBRE,FECHA_CREACION,RUTA_RAIZ) VALUES('".$idCliente."','".
																						 $nombre."','".
																						 date('Y-m-d H:i:s')."','cat/".
																						 $idCliente.'_'.$nombre."/')";
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
		$sqlE="SELECT ID_CATALOGO,NOMBRE,RUTA_RAIZ FROM CAT2_CATALOGO WHERE ID_CLIENTE =".$idCliente." ORDER BY NOMBRE";
		$resE=$objDb->sqlQuery($sqlE);
		
		if($objDb->sqlEnumRows($resE)>0){
			$cadenArbol = '<ul id="browser" class="filetree">';
		    while($rowADD=$objDb->sqlFetchArray($resE)){
				  $cadenArbol .= '<li><span class="folder">'.$rowADD['NOMBRE'].'</span>
										<ul>'.
  											$this->tipoArchivo($idCliente,$rowADD['ID_CATALOGO'],$rowADD['RUTA_RAIZ'])
										.'</ul></li>';	
			}
			$cadenArbol .= '</ul>';
	   }
	  echo 	 '<table border="0" width="100%"><tr><td align="center" style=" background-color:#0072A8;color:#FFF;">Cat&aacute;logos</td></tr> </table>'.$cadenArbol;
     }
	 
	   /**
	*@method 		tipoArchivo
	*@description 	Funcion para crear ul con los tipos de archivos de la tabla CAT2_TIPO_ARCHIVO
	*@paramas 				
	*
	*/
 	public function tipoArchivo($idCliente,$idCatalogo,$ruta){
		$cadenaCarpeta = '';
	    $objDb=$this->iniciarConexionDb();
		$sqlF="SELECT * FROM CAT2_TIPO_ARCHIVO";
		$resF=$objDb->sqlQuery($sqlF);
		
		if($objDb->sqlEnumRows($resF)>0){
			
		    while($rowADD=$objDb->sqlFetchArray($resF)){
					   $cadenaCarpeta .= '<li><span class="folder" onclick="pintaContenido('.$idCliente.','.
					   																$idCatalogo.','.
																					$rowADD['ID_TIPO_ARCHIVO'].',\''.
																					$ruta.$rowADD['ID_TIPO_ARCHIVO'].'\');" style="cursor:pointer;">'.
																					$rowADD['DESCRIPCION'].'</span>';
			}
	   }
	   return $cadenaCarpeta;
     }
	 
   public function PintaContenido($cliente,$catalogo,$tipo,$rutaRaiz){
	    $objDb=$this->iniciarConexionDb();
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
		    WHERE a.ID_CLIENTE = '.$cliente.' AND 
			      a.ID_CATALOGO = '.$catalogo.' AND 
				  b.ID_TIPO = '.$tipo.' AND 
				  b.VISIBLE = 1';
				  
				  
	$qry = $objDb->sqlQuery($sql);
	$cnt = $objDb->sqlEnumRows($qry);
	if($cnt>0){ 
	 	$tabla = '<table border="1" width="100%" style="border-collapse:collapse;" bordercolor="#EAEAEA">';
	 	$tabla .= '<tr><td colspan="3" align="center" style=" background-color:#0072A8;color:#FFF;">Archivos</td></tr>';
			while($row = $objDb->sqlFetchArray($qry)){	
		 	      $tabla .= '<tr align="center"><td width="50" ><img src="'.$row['RUTA'].'" width="50" height="50" /></td><td>'
				  														   .$row['TITULO'].'</td><td width="80" onclick="verDetalles(\''
																		   .$row['TITULO'].'\',\''.$row['RESUMEN'].'\',\''.$row['PATH'].'\',\''
																		   .$row['RUTA'].'\',\''.$row['ID_TIPO'].'\',\''.$row['ID_ARCHIVO']
																		   .'\');" style="cursor:pointer;">Ver detalles</td></tr>';			
			}
		$tabla .= '<tr align="center"><td width="50" >Sin Imagen</td><td> Sin Archivo</td><td width="80"><input type="button" onclick="subirArchivo();" value="subir"/></td></tr>';	
		$tabla .= '<tr align="center"><td width="50" >Sin Imagen</td><td> Sin Archivo</td><td width="80"><input type="text" id="rutaRaiz"  value="'.$rutaRaiz.'"/></td></tr>';
	 	$tabla .= '</table>';
	}else{
			$tabla = '<table border="1" width="100%" style="border-collapse:collapse;" bordercolor="#EAEAEA">';
			$tabla .= '<tr align="center"> <td colspan="3"  style=" background-color:#0072A8;color:#FFF;">Archivos</td></tr>';
			$tabla .= '<tr align="center"><td width="50" >Sin Imagen</td><td> Sin Archivo</td><td width="80">Sin detalles</td></tr>';	
			$tabla .= '</table>';
	}
	return $tabla;
   }

}//fin de la clase catalogos

?>