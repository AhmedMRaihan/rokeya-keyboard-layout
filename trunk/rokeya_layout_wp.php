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
	echo "http://localhost/Rokeya_Layout_WP/rokeya_layout-dev.js";
?>"></script>

<script type="text/javascript">
var handlerKeyboardPageOpener=function() {

	var sourceDiv = "<span style='margin-left:5px;' id='rokeya_button_bn'><a onclick=\"window.open('http://seoul.freehostia.com', 'Rokeya', 'height=400,width=700,top=200,left=150,scrollbars=1');return false;\" class='button button-small'>à¦….A</a></span>";
	if( jQuery("#view-post-btn").length ==1 )
		jQuery("#view-post-btn").after(sourceDiv);
	else
		jQuery("#titlewrap").after(sourceDiv);

	//password field should not be enabled as the password is automatically setin in oauth;
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

// CDN="//cdn.jsdelivr.net/tinymce/4.1.2/tinymce.min.js">
// From: http://blog.squadedit.com/tinymce-and-cursor-position/
Keyboard.prototype.setCursorPosition = function (editor, index) {
    var content = editor.getContent({ format: "html" });
    var part1 = content.substr(0, index);
    var part2 = content.substr(index);
    var bookmark = editor.selection.getBookmark(0);
    var positionString = '<span id="' + bookmark.id + '_start" data-mce-type="bookmark" data-mce-style="overflow:hidden;line-height:0px"></span>';
    var contentWithString = part1 + positionString + part2;
    editor.setContent(contentWithString, ({ format: "html" }));
    editor.selection.moveToBookmark(bookmark);
	editor.dom.remove(bookmark.id + '_start');
	
    return bookmark;
}
Keyboard.prototype.getCursorPosition = function (editor) {
    var bm = editor.selection.getBookmark(0);
    var selector = "[data-mce-type=bookmark]";
    var bmElements = editor.dom.select(selector);
    editor.selection.select(bmElements[0]);
    editor.selection.collapse();
    var elementID = Math.random(1,4)+'_start';
    var positionString = '<span id="' + elementID + '"></span>';
    editor.selection.setContent(positionString);
    var content = editor.getContent({ format: "html" });
    var index = content.indexOf(positionString);
    editor.dom.remove(elementID, true);
    editor.selection.moveToBookmark(bm);

    return index;
}

window.onload = function () {
	if(!!tinyMCE)
	{
		tinyMCE.get('content').on('keydown', function (e) {
			var editor = this;
			var keyboard = new Keyboard();
			var content = editor.getContent();
			var cursorIndex = keyboard.getCursorPosition(editor);

			var newText = keyboard.tinymceplugin(this.getContent(), cursorIndex, e);
			if (newText != true) {
				if( !newText.text)
				{
					editor.setContent(content);
					return true;
				}
				else{
					editor.setContent(newText.text);
					//editor.execCommand('insertHTML',false, newText.text);
					keyboard.setCursorPosition(editor, newText.caret);
				}

				// prevent insertion of typed character
				e.preventDefault();
				e.stopPropagation();
				return false;
			}
		});
	}
}
</script>
<?PHP
}

add_action( 'admin_footer', 'ADD_BN_BUTTON' );

?>