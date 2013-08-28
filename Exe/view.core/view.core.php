<?PHP
class View {

	protected $baseURL;
	
	protected function staticHeader($title) { ?>
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

	<html>
<head>
	
	<link rel="stylesheet" type="text/css" media="all" href="<?php echo $this->baseURL; ?>/view.core/style.css" />
</head>
	
	<body>
	<div id="wrapper">
	<div id="header"> <div id="nav">
	<img src="images/football.jpg" alt="" title="" style="height: 150px;width:100%"/>

	<ul>
	  <li><a class="home" href="">Home</a></li>
	</ul>
	</div> </div> <!--  header div ends here -->
	<?PHP }
	
	protected function staticFooter() { ?>
	</body>
	</html>
	<?PHP
	}
	public function __construct($baseURL) { $this->baseURL= $baseURL; }
}