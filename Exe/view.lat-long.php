<?PHP
require_once 'view.core.php';

class ShowLatLong extends View{

	public function show_ASDLGKMDFIWOERERW()
	{ 
		View::staticHeader();
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
		View::staticFooter();
	}	

	public function __construct($baseURL) {
		parent::__construct($baseURL);
	}
}