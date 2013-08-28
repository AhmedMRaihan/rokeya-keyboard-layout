<?php
$nextURL="http://localhost/Flickr/search-photo.php";
include_once("sql.php");

if( !isset($_GET['lat']) || !isset($_GET['long']))
{
?>
	<form action="<?PHP echo $nextURL;?>">
		LATITUDE: <input type='text' value='' size=10 name='lat' /> <BR/><BR/>
		LONGITUDE: <input type='text' value='' size=10 name='long' /> <BR/><BR/>
		<INPUT TYPE="SUBMIT" VALUE="SUBMIT" />
	</form>
<?PHP
}
else
	print_r($_GET);
?>