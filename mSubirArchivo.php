<!DOCTYPE html>
<html lang="es">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
<title>Subir archivos al servidor</title>
<meta name ="author" content ="Norfi Carrodeguas">
	<style type="text/css" media="screen">
    body{font-size:1.2em;}
    </style>
</head>
<body>

<form enctype='multipart/form-data' action='' method='post'>
    <table border="1" width="100%" height="100%">
        <tr><td>Titulo</td><td><input name='titulo' type="text"></td></tr>
        <tr><td>Resumen</td><td><textarea name="resumen"> </textarea></td></tr>
        <tr><td>Archivo</td><td><input name='uploadedfile' type='file'></td></tr>
        <tr><td>&nbsp;</td><td><input type='submit' value='Guardar'></td></tr>
    </table>
</form>

<?php 
//echo $_GET['carpeta'];
$target_path = $_GET['carpeta'];
$uploadedfile_size=$_FILES['uploadedfile'][size];
echo $_FILES['uploadedfile'][name].' '.($_FILES['uploadedfile'][size]/1000). '<br>';

if ($_FILES['uploadedfile'][size]>200000){
	echo $msg=$msg."El archivo es mayor que 2MB, debes reduzcirlo antes de subirlo<BR>";
    $uploadedfileload="false";
}else{

	$target_path = $target_path . basename( $_FILES['uploadedfile']['name']); 
	if(move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $target_path)) 
	{ 
	echo "<span style='color:green;'>El archivo ". basename( $_FILES['uploadedfile']['name']). " ha sido subido en la rura</span>".$target_path."<br>";
	}else{
	echo "Ha ocurrido un error, trate de nuevo!";
	} 
}
?>

</body>
</html>
