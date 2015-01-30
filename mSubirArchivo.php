<!DOCTYPE html>
<html lang="es">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
<title>Subir archivos al servidor</title>
<meta name ="author" content ="Norfi Carrodeguas">
	<style type="text/css" media="screen">
   
    </style>
</head>
<body>

<form enctype='multipart/form-data' action='' method='post'>
    <table border="1" width="100%" height="100%">
        <tr><td>Titulo</td><td><input name='titulo' type="text" style="width:100%;"></td></tr>
        <tr><td>Resumen</td><td><textarea name="resumen" style="width:100%;"> </textarea></td></tr>
        <tr><td>Archivo</td><td><input name='uploadedfile' type='file'></td></tr>
        <tr align="right"><td>&nbsp;</td><td>&nbsp;</td></tr>
        <tr align="right"><td>&nbsp;</td><td><input type='submit' value='Guardar'></td></tr>
    </table>
</form>

<?php 
include('funcionesCatalogos.php');

//echo "valor max=".valorMaximo($_GET['idCatalogo'],$_GET['idTipo']).'<br>';
//echo $_GET['idCatalogo'].''.$_GET['idTipo'].''.$_GET['idUsuario'];
 $target_path = $_GET['carpeta'];
//$uploadedfile_size=$_FILES['uploadedfile'][size];
//$_FILES['uploadedfile'][name].' '.($_FILES['uploadedfile'][size]/1000). '<br>';

$uploadedfileload="true";

 
if ($_FILES['uploadedfile'][size]>2000000){
	echo $msg=$msg."El archivo es mayor que 2MB, debes reduzcirlo antes de subirlo<BR>";
    $uploadedfileload="false";
}

$target_path = '../../../'.$target_path .'/'. basename( $_FILES['uploadedfile']['name']); 
$partes_ruta = pathinfo($target_path);

if(!in_array($partes_ruta['extension'],formatosPermitidos($_GET['idTipo']))){
	echo $msg=$msg.basename( $_FILES['uploadedfile']['name'])." archivo no permitido";
    $uploadedfileload="false";
}

/*
if (!($_FILES[uploadedfile][type] =="image/pjpeg" OR $_FILES[uploadedfile][type] =="image/gif" OR $_FILES[uploadedfile][type] =="image/png")){
		echo $msg=$msg." Tu archivo tiene que ser JPG o GIF. Otros archivos no son permitidos<BR>";
    $uploadedfileload="false";
}
*/

if($uploadedfileload=="true"){
	
	if(move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $target_path)){ 
	
	 
	  $cadenaGenerada = "'".$_GET['idCatalogo']."','".$_GET['idTipo']."','".$_GET['idUsuario']."','".
					  date('Y-m-d H:i:s')."','".$_POST['titulo']."','".$_POST['resumen']."','".
					  valorMaximo($_GET['idCatalogo'],$_GET['idTipo'])."','/".$_GET['carpeta']."','".obtenerFormatos($partes_ruta['extension'])."','1'";
		              if(llenarTablaCat2_Archivo($cadenaGenerada)){			  
 	             echo "<br><span style='color:green;'>El archivo ". basename( $_FILES['uploadedfile']['name']). " se ha guardado correctamente.";
					  }
				
	}else{
	    echo "<br>Ha ocurrido un error, al tratar de subir archivo en la ruta: ".$target_path.', Favor de Verificar ';
	} 
}
?>

</body>
</html>
