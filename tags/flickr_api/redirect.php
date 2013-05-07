<?PHP
require_once("config.all.php");
GLOBAL $CONNECT_URL;

if(!session_start())
	session_start();
	
if( !isset($_SESSION['OAUTH_TOKEN']) )
{
	header("Location: ". $CONNECT_URL);
	exit;
}
$OAUTH_TOKEN=$_SESSION['OAUTH_TOKEN'];//"72157628891816979-70e668b4bcd52884";

$url_1 = "http://www.flickr.com/services/oauth/authorize";
header("Location: ". $url_1. "?oauth_token=". $OAUTH_TOKEN. "&perms=write");
?>