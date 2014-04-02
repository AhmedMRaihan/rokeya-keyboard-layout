<?php
/*
Plugin Name: Wordpress Input Handler for Rokeya layout
Plugin URI: http://code.google.com/p/bangla-keyboard-layout/
Description: Add input button in admin panel new post writing and convert all text inputbox to accept bangla input
Author: seoul
Version: 2.0
*/

function ADD_BN_BUTTON() {
?>

<script type="text/javascript" src="<?PHP 
//echo plugins_url( 'rokeya_layout-dev.js' , __FILE__ ); 
echo "http://bangla-keyboard-layout.googlecode.com/svn/trunk/rokeya_layout-4.4.73.js";
?>"></script>

<script type="text/javascript">
// call jquery handling function
if(!jQuery)
{	
	wp_enqueue_script('jQuery');       
}

var handlerKeyboardPageOpener=function() {

	var sourceDiv = "<span style='margin-left:5px;' id='rokeya_button_bn'><a onclick=\"window.open('http://seoul.freehostia.com', 'Rokeya', 'height=400,width=700,top=200,left=150,scrollbars=1');return false;\" class='button button-small'>অ.A</a></span>";
	if( jQuery("#view-post-btn").length ==1 )
		jQuery("#view-post-btn").after(sourceDiv);
	else
		jQuery("#titlewrap").after(sourceDiv);

	//password field should be enabled as the password is automatically setin in oauth;
	jQuery("#pass2, #pass1").attr("noBanglaText","noBanglaText");

	//Load tooltip only in profile, post-new and "admin.php?page=XXX" pages.
	if( window.location.href.indexOf("wp-admin/post-new.php") !== -1 || window.location.href.indexOf("wp-admin/profile.php") !== -1 || window.location.href.indexOf("wp-admin/admin.php?page=") !==-1 )
	{
		(function($){
			try{
				var $textbox= $("input[type=text], textarea").not('[noBanglaText]');
				$textbox.each(function(index,valueOfElement){
					if(this.id == '')
					{
						this.id= Math.random();
					}
					new banglaLayout(this.id).loadHelpTooltip();
				});	
			}catch(e){}
		})(jQuery);
	}
//*/
};
	
jQuery(handlerKeyboardPageOpener);
</script>
<?PHP
}

add_action( 'admin_footer', 'ADD_BN_BUTTON' );

?>