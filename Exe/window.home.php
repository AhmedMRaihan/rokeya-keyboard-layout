<?PHP
if( isset($_GET['error']) )
{
	// close wrap div also with error message
	echo "<div class='wrap'><h2>An error occurred: <em style='color:red'>".$_GET['error']."</em></h2><"."/div>";
	die;
}
else if( isset($_GET['deleteData']) )
{
	require_once "base.flickr.php";
	$mysqlServer= new Flickr(plugin_dir_url(__FILE__));
	
	$mysqlServer->truncate_CBMBCNIOR513W2();
}
?>
<div class="wrap">
<h1>Set your API KEY here</h1>
You can get your own API key from: <a target="_blank" href="http://www.flickr.com/services/apps/by/me">http://www.flickr.com/services/apps/by/me</a>

<br/><br/>

<?PHP

/*** General options ***/
require_once("base.flickr.php");
$globalVars = new Flickr(plugin_dir_url(__FILE__));


if( isset($_POST['flickr_key']) )
{
	$localAPI_KEY = $_POST['flickr_key'];
	$localAPI_KEY = trim($localAPI_KEY);
	customizedUpdateOption( 'FLICKR_KEY', $localAPI_KEY);
	$globalVars->updateVariable('API_KEY', get_option('FLICKR_KEY'));
}	
if( isset($_POST['flickr_secret']) )
{
	$localSECRET = $_POST['flickr_secret'];
	$localSECRET = trim($localSECRET);
	customizedUpdateOption( 'FLICKR_SECRET', $localSECRET);
	$globalVars->updateVariable('SECRET', get_option('FLICKR_SECRET'));
}

function customizedUpdateOption($option_name, $new_value)
{
	if ( get_option( $option_name ) != $new_value ) {
		update_option( $option_name, $new_value );
	} else {
		$deprecated = ' ';
		$autoload = 'no';
		add_option( $option_name, $new_value, $deprecated, $autoload );
	}
}
	
?>

<form enctype="multipart/form-data" action="<?php echo $_SERVER['REQUEST_URI']; ?>" method="POST">
API KEY: <input type="text" class="regular-text" name="flickr_key" value="<?PHP echo get_option('FLICKR_KEY'); ?>" /><br/>
SECRET: <input type="text" class="regular-text" name="flickr_secret" value="<?PHP echo get_option('FLICKR_SECRET'); ?>" /><br/><br/>
<input type="submit" class="submit button button-primary" value="Submit">
</form>

<br/>
<br/>
<br/>

<a href="<?PHP bloginfo('wpurl');?>/wp-admin/admin.php?page=flickr-top-level-handle&deleteData=true">Delete all database entry</a>
</div>