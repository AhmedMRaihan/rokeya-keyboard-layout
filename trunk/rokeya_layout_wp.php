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
var handlerKeyboardPageOpener=function() {

var sourceDiv = "<span style='margin-left:5px;' id='rokeya_button_bn'><a onclick=\"window.open('<?PHP echo plugins_url( 'index.html' , __FILE__ ); ?>', 'Rokeya', 'height=400,width=700,top=200,left=150,scrollbars=1');return false;\" class='button'>অ.A</a></span>";
if( jQuery("#view-post-btn").length ==1 )
	jQuery("#view-post-btn").after(sourceDiv);
else
	jQuery("#titlewrap").after(sourceDiv);

//password field should be enabled as the password is automatically setin in oauth;
jQuery("#pass2, #pass1").attr("noBanglaText","noBanglaText");

//convert all text input field to accept bangla input
//*
if( window.location.href.indexOf("wp-admin/post-new.php") !== -1 || window.location.href.indexOf("wp-admin/profile.php") !== -1 )
{
	(function($){
		try{
			var $textbox= jQuery("input:text, textarea").not('[noBanglaText]');
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

// call jquery handling function
if(!jQuery)
{	
	wp_enqueue_script('jQuery');       
}	
jQuery(handlerKeyboardPageOpener);

(function($){
	$.fn.loadHelpIconTooltip = function(){	

	// this = collection of textarea or inputbox
	this.each(function( index ) {
		var toolTipText = "ctrl+m অথবা F9 চেপে বাংলা ও ইংরেজীতে সুইচ করতে পারবেন..\n..হ=H, ৎ=Z, ঙ=x, ঞ=X, ং=V, ঁ=B, ঃ=M";
		var $comment=$(this);
		var str="<div class='tooltipOnRokeyaLayout' style='width: 10px; position:relative; cursor:help; color:red;";
		str +=	"left:"+($comment.width())+"px; top:17px'><abbr title='"+toolTipText+"'>?</abbr></div>";
		$comment.before(str);
		// write css
	});
	return this;
	}

})(jQuery);
</script>
<?PHP
}

add_action( 'admin_footer', 'ADD_BN_BUTTON' );

?>