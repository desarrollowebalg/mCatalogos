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

   	function borrarArchivos($archivos){
   		$objDb=$this->iniciarConexionDb();
   		//primero se extraen los usuarios relacionados con el archivo
   		$usuariosPrevios="";
   		$archivos=explode(",,,",$archivos);
   		$mensaje="";
   		for($i=0;$i<count($archivos);$i++){

			$sql="SELECT CAT2_ARCHIVO.ID_ARCHIVO AS ID_ARCHIVO,PATH AS UBICACION,ID_USUARIO_ASIGNADO 
		              FROM CAT2_ARCHIVO LEFT JOIN CAT2_ARCHIVO_USUARIO ON CAT2_ARCHIVO.ID_ARCHIVO=CAT2_ARCHIVO_USUARIO.ID_ARCHIVO 
			      WHERE CAT2_ARCHIVO.ID_ARCHIVO='".$archivos[$i]."'";
   		
			$res=$objDb->sqlQuery($sql);


   			while($row=$objDb->sqlFetchArray($res)){
   				$path=$row["UBICACION"];
				if($usuariosPrevios==""){
	   				$usuariosPrevios=$row["ID_USUARIO_ASIGNADO"];
	   			}else{
	   				$usuariosPrevios=$usuariosPrevios.",".$row["ID_USUARIO_ASIGNADO"];
	   			}
   			}
			//echo "./".$path;
			
			if(file_exists("./".$path)){
				if(unlink("./".$path)){//se procede a eliminar el archivo
					//se procede a eliminar el archivo de la base de datos
					if($usuariosPrevios!=""){
						$sql1="DELETE FROM CAT2_ARCHIVO WHERE ID_ARCHIVO='".$archivos[$i]."'";
						$res1=$objDb->sqlQuery($sql1);
						if($res1){
							$sql="DELETE FROM CAT2_ARCHIVO_USUARIO WHERE ID_ARCHIVO='".$archivos[$i]."'";	   				
							$res=$objDb->sqlQuery($sql);
							if($res){
								$mensaje=1;//echo "<br>A borrar";		
							}else{
								$mensaje=0;
							}
						}else{
							$mensaje=0;
						}	
					}
				}else{
					$mensaje=0;//echo "<br>Archivo no encontrado";
				}
			}else{
				echo "Archivo no encontrado<br>";
			}
			//exit();
   		}
   		$mensaje=$mensaje."|||".$usuariosPrevios;
   		return $mensaje;
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
		$sqlE="INSERT INTO CAT2_CATALOGO (ID_CLIENTE,NOMBRE,FECHA_CREACION,RUTA_RAIZ) VALUES('".$idCliente."','".$nombre."','".date('Y-m-d H:i:s')."','cat/".$idCliente.'_'.$nombre."/')";
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
	 	mkdir('cat/'.$idCliente.'_'.$nombre, 0777);
		mkdir('cat/'.$idCliente.'_'.$nombre.'/1', 0777);
		mkdir('cat/'.$idCliente.'_'.$nombre.'/2', 0777);
		mkdir('cat/'.$idCliente.'_'.$nombre.'/3', 0777);
		mkdir('cat/'.$idCliente.'_'.$nombre.'/4', 0777);	 			 
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
	  echo 	 $cadenArbol;
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
	 
   public function PintaContenido($cliente,$catalogo,$tipo,$rutaRaiz,$idUsuarioCatalogo,$formatos){
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
				   b.PATH2,
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
	 	$tabla = '<form name="frmArchivoCat" id="frmArchivoCat"><table border="1" id="tbl_Archivos" width="100%" style="border-collapse:collapse;" bordercolor="#EAEAEA">';
	 	//$tabla. = '<tr id="filaBtnCancelar"><td coslpan="4"></td></tr>';
	 	$tabla .= '<tr id="filaBtnCancelar" style="display:none;"><td colspan="4" align="center"><button type="button" id="btnCancelarBorrado" onclick="cancelarBorrado()" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" style="height:25px;margin-top:5px;margin:5px;"><span class="ui-icon ui-icon-locked " style="float:right;"></span>&nbsp;Cancelar</button></td></tr>';
			while($row = $objDb->sqlFetchArray($qry)){
				$chk="chk_".$row["ID_ARCHIVO"];  $chk1="chk_".$row["ID_ARCHIVO"];  $idFila="id_".$row["ID_ARCHIVO"];
		 	    $tabla .= '<tr id="'.$idFila.'" class="estiloArchivosTabla" align="center"><td id="'.$chk1.'" width="13" style="display:none;"><input type="checkbox" onclick="marcarArchivo(\''.$idFila.'\')" value="'.$row["ID_ARCHIVO"].'" name="chkEliminar" id="'.$chk.'" /></td><td width="50" ><img src="'.$row['RUTA'].'" width="50" height="50" /></td><td>'
				  														   .$row['TITULO'].'</td><td width="80" onclick="verDetalles(\''
																		   .$row['TITULO'].'\',\''.$row['RESUMEN'].'\',\''.$row['PATH2'].'\',\''
																		   .$row['RUTA'].'\',\''.$row['ID_TIPO'].'\',\''.$row['ID_ARCHIVO']
																		   .'\');" style="cursor:pointer;"><img src="public/images/mostrar2.png" border="0"></td></tr>';
			}
		 	$tabla .= '</table></form>
 		               <input type="hidden" id="idCliente"   value="'.$cliente.'"/>
			           <input type="hidden" id="idCatalogo"  value="'.$catalogo.'"/>
					   <input type="hidden" id="idTipo"      value="'.$tipo.'"/>
					   <input type="hidden" id="rutaRaiz"    value="'.$rutaRaiz.'"/>
					   <input type="hidden" id="formatos"    value="'.$this->formatosPermitidos($tipo).'"/>
					   <input type="hidden" id="idUsuarioCatalogo"  value="'.$idUsuarioCatalogo.'"/>';
	}else{
			$tabla="<div class='ui-state-highlight ui-corner-all'style='margin-top:20px;padding:0.7em;height:40px;width:210px;top:50%;left:50%;margin-top:-20px;margin-left:-105px;position:relative;'>
			<p>
				<span class='ui-icon ui-icon-info' style='float:left;margin-right:.3em;'></span>
				<strong>No hay archivos en esta carpeta!</strong>
				<input type=\"hidden\" id=\"idCliente\"  value=\"".$cliente."\"/>
				<input type=\"hidden\" id=\"idCatalogo\"  value=\"".$catalogo."\"/>
				<input type=\"hidden\" id=\"idTipo\"  value=\"".$tipo."\"/>
				<input type=\"hidden\" id=\"rutaRaiz\"  value=\"".$rutaRaiz."\"/>
				<input type=\"hidden\" id=\"idUsuarioCatalogo\"  value=\"".$idUsuarioCatalogo."\"/>
				<input type=\"hidden\" id=\"formatos\"  value=\"".$this->formatosPermitidos($tipo)."\"/>
			</p>
			</div>";
	}
	return $tabla;
   }
   
   
   function formatosPermitidos($idTipoArchivo){
   $objDb=$this->iniciarConexionDb();
	
	
	$arreglo 		 = '';
	$existe = 0;
  
 	 $sql_x = 'SELECT a.DESCRIPCION FROM CAT2_FORMATOS a 
				INNER JOIN CAT2_TIPO_ARCHIVO b ON a.ID_TIPO_ARCHIVO = b.ID_TIPO_ARCHIVO
				WHERE  a.ID_TIPO_ARCHIVO ='.$idTipoArchivo;

	 	$qry = $objDb->sqlQuery($sql_x);
	    $cnt = $objDb->sqlEnumRows($qry);
  if($cnt>0){ 
    	while($row = $objDb->sqlFetchArray($qry)){	
		   if($arreglo===''){
			    $arreglo = '*.'.$row['DESCRIPCION'];
		   }else{
			       $arreglo .= ' , *.'.$row['DESCRIPCION'];
		   }
		 
		}
  }
  
   return $arreglo;
}
   
   

}//fin de la clase catalogos

?>