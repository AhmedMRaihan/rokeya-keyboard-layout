/*
(function($){
	$.fn.loadHelpIconTooltip = function(){	

	// this = collection of textarea or inputbox
	this.each(function( index ) {
		var toolTipText = "ctrl+m চেপে বাংলা ও ইংরেজীতে সুইচ করতে পারবেন..\n..হ=H, ৎ=Z, ঙ=x, ঞ=X, ং=V, ঁ=B, ঃ=M";
		var $comment=$(this);
		var str="<div class='tooltipOnRokeyaLayout' style='position:relative; cursor:help; color:red;";
		str +=	"left:"+($comment.width())+"px; top:17px'><abbr title='"+toolTipText+"'>?</abbr></div>";
		$comment.before(str);
		// write css
	});
	return this;
	}
})(jQuery);

// provide a help icon beside each textbox which is hooked
$('#comment').loadHelpIconTooltip();



// hook all textbox with conditions
var $textbox= jQuery("input:text, textarea").not('[noBanglaText]');
jQuery.each($textbox,function(index,valueOfElement){
	if(this.id == '')
	{
		this.id= Math.random();
	}
	new banglaLayout(this.id);
});			
};

*/