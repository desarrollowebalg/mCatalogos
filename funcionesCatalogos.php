<?php
//este archivo se  unica en public/libs/phpProcesos/funcionesCatalogos.php

		$port = '3306';					    
		$host = '188.138.16.27';		   
		$base = 'ALG_BD_CORPORATE_MOVI';	
		$user = 'savl';					     
		$pass = '$s4v1XX0$';

function llenarTablaCat2_Archivo($CadenaGenerada){   				                            // funcion que realiza insercion de datos en la tabla CAT2_ARCHIVO
    global	$port,$host,$base,$user,$pass;
	
	$conectar        = mysql_connect($host,$user,$pass);
	$db_seleccionada = mysql_select_db($base,$conectar);
  
   if (!$conectar){
     die('No se pudo realizar la conexion al servidor de base de datos' . mysql_error());
   }else{
	
 $sql_x = 'INSERT INTO CAT2_ARCHIVO
            (ID_CATALOGO,
             ID_TIPO,
             ID_USUARIO_CREO,
             FECHA_CREACION,
             TITULO,
             RESUMEN,
             ORDEN,
             PATH,
             FORMATO,
             VISIBLE)
	 VALUES ('.$CadenaGenerada.')'; 										

										
	  $res_query = mysql_query($sql_x,$conectar);	
	   
	  if($res_query){
		 $valor_query = 1; 
	  }else{
		 $valor_query =mysql_error().''.$sql_x ;
	  }
   }

mysql_close($conectar);

return $valor_query;
}

/*************************************************************************/

function valorMaximo($idCatalogo,$idTipo){
 global	$port,$host,$base,$user,$pass;
	
	$conectar        = mysql_connect($host,$user,$pass);
	$db_seleccionada = mysql_select_db($base,$conectar);
  
   if (!$conectar){
     die('No se pudo realizar la conexion al servidor de base de datos' . mysql_error());
   }else{
	  $sql_x = 'SELECT (MAX(ORDEN)+1) AS ORDEN FROM CAT2_ARCHIVO WHERE ID_CATALOGO ='.$idCatalogo.' AND ID_TIPO = '.$idTipo;
	  $res_query = mysql_query($sql_x,$conectar);	
	  if($res_query){
		 $valor_query = mysql_fetch_array($res_query, MYSQL_ASSOC);
		 if($valor_query['ORDEN']===NULL){
		    $valor_query =1;	 
		 }else{
		    $valor_query =$valor_query['ORDEN'];
		 }
	  }else{
		 $valor_query =mysql_error(). ''. $sql_x;
	  }
   }

   mysql_close($conectar);
   return $valor_query;
}

function obtenerFormatos($extension){
	global	$port,$host,$base,$user,$pass;
	
	$conectar        = mysql_connect($host,$user,$pass);
	$db_seleccionada = mysql_select_db($base,$conectar);
	$arreglo 		 = array();
	$existe = 0;
  
   if (!$conectar){
     die('No se pudo realizar la conexion al servidor de base de datos' . mysql_error());
   }else{
	  $sql_x = 'SELECT ID_FORMATO,DESCRIPCION FROM CAT2_FORMATOS';
	  $res_query = mysql_query($sql_x,$conectar);	
	  if($res_query){
		 while($valor_query = mysql_fetch_array($res_query, MYSQL_ASSOC)){;
			$arreglo[$valor_query['ID_FORMATO']] = $valor_query['DESCRIPCION'];
				
		 }
	  }else{
		 $valor_query =mysql_error(). ''. $sql_x;
	  }
   }

   mysql_close($conectar);
   
   if(in_array($extension,$arreglo)){
	   foreach($arreglo as $indice => $valor){
		   if($valor==$extension){
		     $existe = $indice;	    
		   }
	   }
	   
   }
   
   return $existe;
}

function formatosPermitidos($idTipoArchivo){
	global	$port,$host,$base,$user,$pass;
	
	$conectar        = mysql_connect($host,$user,$pass);
	$db_seleccionada = mysql_select_db($base,$conectar);
	$arreglo 		 = array();
	$existe = 0;
  
   if (!$conectar){
     die('No se pudo realizar la conexion al servidor de base de datos' . mysql_error());
   }else{
	  $sql_x = 'SELECT a.DESCRIPCION FROM CAT2_FORMATOS a 
				INNER JOIN CAT2_TIPO_ARCHIVO b ON a.ID_TIPO_ARCHIVO = b.ID_TIPO_ARCHIVO
				WHERE  a.ID_TIPO_ARCHIVO ='.$idTipoArchivo;

	  $res_query = mysql_query($sql_x,$conectar);	
	  if($res_query){
		 while($valor_query = mysql_fetch_array($res_query, MYSQL_ASSOC)){;
			$arreglo[] = $valor_query['DESCRIPCION'];
				
		 }
	  }else{
		 $valor_query =mysql_error(). ''. $sql_x;
	  }
   }

   mysql_close($conectar);
   return $arreglo;
}

?>