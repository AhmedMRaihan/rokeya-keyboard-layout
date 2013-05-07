<?PHP
if(!session_start())
	session_start();

require_once("config.all.php");
GLOBAL $API_KEY, $SECRET, $CONNECT_URL, $ACCESS_TOKEN_URL;
//echo "<a href='http://localhost/Flickr/connect.php'>Connect</a><BR />";
//print_r ($_SESSION);

try
{
    unset($GLOBAL);
	$GLOBAL['OAUTH_TOKEN']=$_GET['oauth_token'];
	$GLOBAL['OAUTH_VERIFIER']=$_GET['oauth_verifier'];
	$temp= $_SESSION['OAUTH_TOKEN_SECRET']; //just to make sure the array entry exist
    sleep(5);
}
catch(Exception $e)
{
    print_r($e);
	header("Location: ". $CONNECT_URL); die;
}
//print_r($temp);DIE;
$NONCE= rand();
$TIMESTAMP= gmdate('U');

$OAUTH_TOKEN= $GLOBAL['OAUTH_TOKEN']; //login.php gets this in $_GET
$OAUTH_TOKEN_SECRET=$_SESSION['OAUTH_TOKEN_SECRET']; //connect.php gets it before redirecting
$OAUTH_VERIFIER= $GLOBAL['OAUTH_VERIFIER']; //login.php gets this in $_GET

$CONSUMER_SECRET= $SECRET. "&". $OAUTH_TOKEN_SECRET;

$url_1 = $ACCESS_TOKEN_URL;

$url_2= array(
"oauth_consumer_key" => $API_KEY,
"oauth_nonce" => $NONCE,
"oauth_signature_method" => "HMAC-SHA1",
"oauth_timestamp" => $TIMESTAMP,
"oauth_token=" => $OAUTH_TOKEN,
"oauth_verifier=" => $OAUTH_VERIFIER,
"oauth_version" => "1.0"
);
/*
$url_2 = "oauth_consumer_key=". $API_KEY;
$url_2 .="&oauth_nonce=". $NONCE;
$url_2 .="&oauth_signature_method=HMAC-SHA1";
$url_2 .="&oauth_timestamp=". $TIMESTAMP;

$url_2 .="&oauth_version=1.0";
$BASE_STRING ="";

$BASE_STRING .= "GET&". urlencode($url_1). "&". urlencode($url_2);

$API_SIG= base64_encode(hash_hmac("sha1",$BASE_STRING,$CONSUMER_SECRET, true) );
//echo $API_SIG; die;
*/
$API_SIG= getSignature($url_1, arrayJoin($url_2,false),$CONSUMER_SECRET);
$url=$url_1. "?". arrayJoin($url_2,false). "&oauth_signature=". urlencode($API_SIG);
/*
$url= $url_1."?";
$url .="oauth_consumer_key=". $API_KEY;
$url .="&oauth_nonce=". $NONCE;
$url .="&oauth_signature_method=HMAC-SHA1";
// append signature
$url.= "&oauth_signature=". urlencode($API_SIG);
$url .="&oauth_timestamp=". $TIMESTAMP;
$url .="&oauth_token=". $OAUTH_TOKEN;
$url .="&oauth_verifier=". $OAUTH_VERIFIER;
$url .="&oauth_version=1.0";
//echo $url; die;
*/

$ch=curl_init($url);
curl_setopt($ch, CURLOPT_HEADER, 0);
//curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla Firefox/3.6");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response= curl_exec($ch);
curl_close($ch);

$data=parseResponse($response);

/* save data */
if( !isset($data['OAUTH_TOKEN']) || !isset($data['OAUTH_TOKEN_SECRET']) )
{
  print_r($data);
  die;
}

$_SESSION['OAUTH_TOKEN']= $data['OAUTH_TOKEN'];
$_SESSION['OAUTH_TOKEN_SECRET']= $data['OAUTH_TOKEN_SECRET'];
?>
<script language="JavaScript">
window.location = "<?php echo "http://localhost/Flickr/example.php"?>";
</script>