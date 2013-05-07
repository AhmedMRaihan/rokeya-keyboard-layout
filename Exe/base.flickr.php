<?PHP
require_once 'class.wp_environment.php';

class Flickr extends WpEnvironemt{

	private $SECRET = '';
	public $API_KEY = '';
	public $REQUEST_TOKEN_URL= "http://www.flickr.com/services/oauth/request_token";
	public $ACCESS_TOKEN_URL= "http://www.flickr.com/services/oauth/access_token";
	public $CONNECT_URL= 'connect.php';
	public $REDIRECT_URL= 'redirect.php';
	public $LOGIN_URL= 'login.php';
	public $FLICKR_IMPORT_BASE_URL = '';
	
	private $DB_HOST='localhost';
	private $DB_USER='root';
	private $DB_PASS='';
	private $DB_NAME='f9_wad_f9';
   
	/**************** Constructor functions *********/
	public function __construct($FLICKR_IMPORT_BASE_URL)
	{
		WpEnvironemt::__construct();
		$this->FLICKR_IMPORT_BASE_URL = $FLICKR_IMPORT_BASE_URL;
		$this->initAllVariables();
	}
		
    protected function initAllVariables()
	{
		/*
		$this->CONNECT_URL= $FLICKR_IMPORT_BASE_URL . $CONNECT_URL;
		$this->REDIRECT_URL= $REDIRECT_URL;
		$this->LOGIN_URL = $LOGIN_URL;
		*/
		$this->updateVariable('API_KEY', get_option('FLICKR_KEY'));
		$this->updateVariable('SECRET', get_option('FLICKR_SECRET'));
		
		/*
		if( $this->API_KEY == '' || $this->SECRET == '')
		{
			header('Location:'. $this->FLICKR_IMPORT_BASE_URL. 'index.php?error=No API_KEY and SECRET key found. Please update them in control panel...');
			return true;
			//exit();
		}
		*/
		
		// database tables;
		$this->create_KJCBWPODK879232();
	}
	
	public function updateVariable($name, $value)
	{
		$this->$name= $value;
	}
	
	/**************** Extend capability from parent method *********/
	public function fetchURL($url)
	{
		$response= parent::fetchURL($url);
		
		// verify output in correct format
		if( json_decode($response)->stat != "ok" )
		{	
			throw new Exception(json_decode($response)->message);
			return;
		}
		
		return $response;
	}
	
	
	/**************** Flickr related functions *********/
   
	function getSignature($url_1, $url_2, $CONSUMER_SECRET)
	{
		$BASE_STRING ="";
		$BASE_STRING .= "GET&". urlencode($url_1). "&". urlencode($url_2);

		return base64_encode(hash_hmac("sha1",$BASE_STRING,$CONSUMER_SECRET, true) );
	}
	function arrayJoin( $urlKeyValue, $encodeValue)
	{
		if(! is_array($urlKeyValue)) die ("not a valid array=> $urlKeyValue");

		ksort($urlKeyValue);
		$output="";
		foreach($urlKeyValue as $key=>$val)
		{
			$output.= $key. "=". ($encodeValue ? urlencode($val): $val). "&";
		}
		// remove last ampersand(&)
		$output= substr($output,0,strlen($output)-1);
		return $output;
	}
	function parseResponse($response)
	{
		$tempArray=array();
		$data= array();
		$tempArray= explode("&",$response);
		foreach($tempArray as $val)
		{
				$equalPos= strpos($val,"=");
				$data[strtoupper(substr($val,0,$equalPos))]= substr($val,$equalPos+1);
		}
		return $data;
	}

	function methodCallUrl($method, $params)
	{
		$url="http://api.flickr.com/services/rest/?";
		$url .="method=". $method;

		foreach($params as $key=>$val)
		{
			$url .= "&". $key. "=". $val;
		}

		return $url;
	}
	
	function returnImgSrc($farm, $server, $id, $secret, $size)
	{
		$image_url= 'http://farm'. $farm . '.staticflickr.com/'. $server . '/'. $id . '_' . $secret . "_$size.jpg";
		
		return $image_url;
	}
}
?>