<?php
try{
if( isset($_GET['error']) )
	throw new Exception($_GET['error']);

require_once ('base.flickr.php');
$controller= new Flickr('/Flickr_API/Exe/');

$controller->delete_FDBI38992SDKFOGF();

}catch (Exception $e) {
	echo "<h1>Caught exception: <font style='color:red'>{$e->getMessage()}</font></h1>";
}
?>