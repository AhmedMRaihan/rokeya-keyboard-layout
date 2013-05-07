<?PHP
require_once 'class.sql.php';

abstract class WpEnvironemt extends sqlService {
	//public $sql= null;
	abstract protected function initAllVariables();
	
	public function fetchURL($url)
	{
		$ch=curl_init($url);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla Firefox/3.6");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		//print_r($url);DIE;
		$response= curl_exec($ch);
		curl_close($ch);
		
		return $response;
	}
	public function __construct()
	{
		define('WP_USE_THEMES', false);
		require_once( '../../readerPostUpload/wp-load.php');
		parent::__construct();
	}
};
?>