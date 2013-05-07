<?php
require_once ("base.interface.sql.php");
// All function name will come through an interface so child classes can call them by name

abstract class sqlService implements createTable{	
	
	// create flickr tables
	public function create_KJCBWPODK879232()
	{
		$query="CREATE TABLE IF NOT EXISTS `flickr_comment` (
		`photo_id` VARCHAR( 50 ) NOT NULL ,
		`comment` VARCHAR( 2000 ) NOT NULL,
		`score` int(10)	NOT NULL
		);";
		$this->runRandomQuery($query);
		
		$query="CREATE TABLE IF NOT EXISTS flickr_search_result (
		`photo_id` VARCHAR( 20 ) NOT NULL ,
		`owner` VARCHAR( 100 ) NULL ,
		`secret` VARCHAR( 20 ) NULL ,
		`server` VARCHAR( 250 ) NULL ,
		`farm` VARCHAR( 20 ) NULL ,
		`title` VARCHAR( 500 ) NULL ,
		`ispublic` VARCHAR( 10 ) NULL ,
		`isfriend` VARCHAR( 10 ) NULL ,
		`isfamily` VARCHAR( 10 ) NULL ,
		`table_id` INT( 50 ) NOT NULL AUTO_INCREMENT ,
		`latitude` DOUBLE NULL ,
		`longitude` DOUBLE NULL ,
		`isCommentImported` BOOL NULL,
		PRIMARY KEY (  `table_id` )
		);";
		$this->runRandomQuery($query);
		
		$query="CREATE TABLE IF NOT EXISTS `flickr_latlong` (
		`photo_id` VARCHAR( 50 ) NOT NULL ,
		`latitude` float NOT NULL,
		`longitude` float NOT NULL,
		`accuracy` int (5)
		);";
		$this->runRandomQuery($query);
	}
	
	// delete flickr tables
	protected function delete_FDBI38992SDKFOGF()
	{
		global $wpdb;
		$sql= 'DROP TABLE `flickr_comment`, `flickr_latlong`, `flickr_search_result`;';
		$wpdb->query($sql);
		$this->returnFinalValue();
	}
	
	// sandbox
	protected function runRandomQuery($sql)
	{
		global $wpdb;
		$wpdb->query($sql);	
		$this->returnFinalValue();
	}
	private function returnFinalValue()
	{
		global $wpdb;
		if( $wpdb->last_error)
			throw new Exception($wpdb->last_error);
		
		return TRUE;
	}
	public function __construct() { }
}
?>