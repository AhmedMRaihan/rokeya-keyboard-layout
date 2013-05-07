<?PHP
if(!session_start())
	session_start();
unset($_SESSION['OAUTH_TOKEN_SECRET']);
unset($_SESSION['OAUTH_TOKEN']);
/***********************************************/

require_once("config.all.php");
GLOBAL $API_KEY, $SECRET, $CONNECT_URL, $REDIRECT_URL, $LOGIN_URL, $REQUEST_TOKEN_URL;

$NONCE= rand();
$TIMESTAMP= gmdate('U');

$CONSUMER_SECRET= $SECRET. "&";

$url_1 = $REQUEST_TOKEN_URL;

$url_2= array(
"oauth_callback" => urlencode($LOGIN_URL),
"oauth_consumer_key" => $API_KEY,
"oauth_nonce" => $NONCE,
"oauth_signature_method" => "HMAC-SHA1",
"oauth_timestamp" => $TIMESTAMP,
"oauth_version" => "1.0"
);

$API_SIG= getSignature($url_1, arrayJoin($url_2,false),$CONSUMER_SECRET);
//echo arrayJoin($url_2,false);die;
/*
//$url_2 = "oauth_callback=". urlencode($LOGIN_URL). "&oauth_consumer_key=". $API_KEY;
//$url_2 .="&oauth_nonce=". $NONCE. "&oauth_signature_method=HMAC-SHA1&oauth_timestamp=". $TIMESTAMP. "&oauth_version=1.0";


//$API_SIG= getSignature($url_1,$url_2,$CONSUMER_SECRET);
//echo $API_SIG; die;

//$url= $url_1."?";
//$url.= "oauth_callback=". urlencode($LOGIN_URL). "&oauth_consumer_key=". urlencode($API_KEY);
//$url.= "&oauth_nonce=". urlencode($NONCE). "&oauth_signature_method=HMAC-SHA1&oauth_timestamp=". $TIMESTAMP. "&oauth_version=1.0";
// append signature
//$url.= "&oauth_signature=". urlencode($API_SIG);
//echo $url; die;
*/
$url=$url_1. "?". arrayJoin($url_2,false). "&oauth_signature=". urlencode($API_SIG);

$ch=curl_init($url);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla Firefox/3.6");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//print_r($url);DIE;
$response= curl_exec($ch);
curl_close($ch);

$data=parseResponse($response);

/* save data */
if( !isset($data['OAUTH_TOKEN']) || !isset($data['OAUTH_TOKEN_SECRET']) )
{
    print_r($response);
    die;
}

$_SESSION['OAUTH_TOKEN']= $data['OAUTH_TOKEN'];
$_SESSION['OAUTH_TOKEN_SECRET']= $data['OAUTH_TOKEN_SECRET'];
//print_r($data); die;
?>
<html><body>
<a href="<?php echo $REDIRECT_URL; ?>">Redirect me</a>;
<script language="text/javascript">
window.location = "<?php echo $REDIRECT_URL; ?>";
</script>
</body></html>
<?php
?>