(function($){
    $.fn.testFunction= function(){
    }
}
)(jQuery);

/*
listed here:

1. Tab- home.php
2. FB share- single.php
3. Keyboard input dropdown list- all
4. ? button as help icon rokeya layout- all

*/

(function($){
	$.fn.loadSidebarBanglaInput= function(){
		if( $('#get_input').length > 0)
		{
			new banglaLayout("get_input");
			$('.change_keyboard').data('srcTextInput',"get_input").change(change_keyboard_Handler);
		}
	};
}
)(jQuery);

var postShareCountButton = function() {

	var hostName = location.hostname == "localhost" ? '127.0.0.1' : location.href;
	var fql = 'SELECT url, share_count, like_count, comment_count, total_count FROM link_stat WHERE url="'+hostName+'"';
	var url = 'https://api.facebook.com/method/fql.query?format=json&query=' + encodeURI(fql)+"&callback=?";
	var shareCount= 0;

	jQuery.getJSON( url ,function(data){
		//console.log(data);
	try{
		shareCount = data[0].total_count;
		//shareCount = 1231234568521;
		var million= Math.pow(10,6), billion = Math.pow(10,9);
		
		if( shareCount <10000) {;}
		else if( shareCount >= 10000 && shareCount < million) shareCount= Math.floor(shareCount/1000) + 'K+';
		else if( shareCount >= million && shareCount < billion) shareCount= Math.floor(shareCount/million) + 'M+';
		else if( shareCount >= billion && (shareCount/billion < 1000) ) shareCount = Math.floor(shareCount / billion) + 'B+';
		else shareCount = '999B+';
		
		$('#fbShareCountDivID').html(shareCount);
	}catch(e) {console.log(e);}
	
	});

	//var divID= "postShareCount";
	var html = "";
	var src= "http://www.facebook.com/sharer.php?u="+ location.href;
	
	// render page html
	html +='<div style="background-color: #423124;width:60px;height:40px;padding:1px;color:#D0BFBF;text-align:center" >' ;
	html += '<a style= "font-weight:bold;font-size:18px;color:#FFFFFF;" href="" id="fbShareCountDivID">'+shareCount+'</a>';
	html += '<br />times on</div>';

	html += '<div style="background:#3333CC;width:60px;padding:1px;text-align:center;">';
	html += '<a href="'+src+'" style="font-size:14px;color:#FFFFFF" title="Share on Facebook" ';
	html += 'onmouseover= "this.innerHTML=\'Share It\'" ';
	html += 'onmouseout= "this.innerHTML=\'Facebook\'" ';
	html += 'onclick= "return behaviourPostShareToFacebook(\''+src+'\');" ';
	//html += 'onclick= "window.open('\''+src+'\', postShare2FB, "menubar=0, resizable=0, status=1, toolbar=0, location=1");return false;"';
	html += '>Facebook</a></div>';
	
	document.write(html);
}

// this function is written to reduce the pain to mask quotes in the window.open func
function behaviourPostShareToFacebook(src)
{
	//console.log(src);
	//window.open(src, "_BLANK", "menubar=0, resizable=0, status=0, toolbar=0, location=1, width= 600, height: 250;");
	window.open(src, "_BLANK", "toolbar=0,status=0,width=626,height=436");
	return false;
}

function change_keyboard_Handler()
{
    var textarea= $(this).data('srcTextInput');

    switch (this.value) {

      case 'english':
        var inputbox=document.getElementById(textarea);
        var cmnfnc= function(keyEvent){return true;}
        inputbox.onkeydown = inputbox.onkeypress = inputbox.onkeyup = cmnfnc;
      break;

      case 'rokeya':
        new banglaLayout(textarea);
        break;

      case 'national':
        alert('national layout, not updated yet');
		inputbox.value='english';
      break;

      case 'deutsch':
        alert('not updated yet');
      break;
    }

    /*var id= $(this).data('srcTextInput');
    var inputbox=document.getElementById(id);

    inputbox.onkeydown = function (keyEvent) {
        return true;
    }
    inputbox.onkeypress = function (keyEvent) {
        return true;
    }
    inputbox.onkeyup = function (keyEvent) {
        return true;
    }*/
/*
    switch (this.value) {
      case 'rokeya':
        this.storage= new banglaLayout("get_input");
      break;

      case 'national':
        alert('national');
      break;

      case 'deutsch':
        // do something here
      break;
    }
*/
}

/*
 *<!--
         <div class="table-row">
            <div class="left-container13"><h5 class="colhdr">
                    Year
                  </h5></div>
            <div class="right-container13"><h5 class="colhdr">
                    Winners home country
                  </h5></div>
            <div class="space-line"></div>
            </div>

    <div class="avatar_or_ad">
        <div class="boxgrid caption">
        <img src="https://buildinternet.s3.amazonaws.com/live-tutorials/sliding-boxes/kamil.jpg"/>
        <div class="cover boxcaption">
                <h3>Jarek Kubicki</h3>
                <p>Artist<br/>
                <a href="http://www.nonsensesociety.com/2009/03/art-by-jarek-kubicki/"
                   target="_BLANK">More Work</a>
                </p>
        </div>
        </div>
    </div>
    -->
*/

/* tab javascript */
(function( $ ){
  $.fn.easyTab = function() {
      // hide all content....(Input+)"panes div" is the id to hide, right now it is not implemented
      /*
      var inputDivId= $(this).attr("id");
      if(inputDivId==undefined)
         inputDivId=".panes div";
      else
         inputDivId+=".panes div";

      //$(inputDivId).hide();
      */
      $(".panes div").hide();

      // Show first tab content
      $(".panes div:first").show();

      // Set event handlers in tabs anchor
      $("ul.tabs li a").click(tabClickHandler);
  };
  
  var tabClickHandler= function(){
            // atfirst no tab is selected
            $("ul.tabs li a").removeClass("selected");
            // selected tab = href of the clicked anchor tag
            $(this).addClass("selected");

            // get the href id, show corresponding div and hide others
            $(".panes div").hide();
            var divId= $(this).attr("href");
            $(divId).fadeIn(800);
            
            // browser should not follow this link, so return false
            return false;
  }
  return this;
})( jQuery );

/*** tooltip on rokeya layout ***/
/*
(function($){
	$.fn.loadHelpIconTooltip = function(){	

	// this = collection of textarea or inputbox
	this.each(function( index ) {
		var $comment=$(this);
		var str="<div class='tooltipOnRokeyaLayout' style='position:relative; cursor:help; color:red;";
		str +=	"left:"+($comment.width())+"px; top:17px'>?</div>";
		$comment.before(str);
		// write css
		var cssText= ".tooltipOnRokeyaLayout{display: block;position: absolute;z-index: 1;}";
		cssText += ".tooltipOnRokeyaLayout .message { background: yellow; padding: 8px; border: 1px solid red; border-radius: 3px; display: block;";
		cssText += "font-size: 11px; line-height: 11px; text-align: center;	z-index: 2; position: relative;}";		
		document.write("<style>" +cssText+ "</style>");
		// call tooltip function
		$('.tooltipOnRokeyaLayout').tinytooltip({message: "ctrl+m চেপে বাংলা ও ইংরেজীতে সুইচ করতে পারবেন....হ=H, ৎ=Z, ঙ=x, ঞ=X, ং=V, ঁ=B, ঃ=M"});
	});
	}
	return this;
})(jQuery);
*/

(function($){
	$.fn.loadHelpIconTooltip = function(){	

	// this = collection of textarea or inputbox
	this.each(function( index ) {
		var toolTipText = "ctrl+m চেপে বাংলা ও ইংরেজীতে সুইচ করতে পারবেন..\n..হ=H, ৎ=Z, ঙ=x, ঞ=X, ং=V, ঁ=B, ঃ=M";
		var $comment=$(this);
		var str="<div class='tooltipOnRokeyaLayout' style='width: 10px; position:relative; cursor:help; color:red;";
		str +=	"left:"+($comment.width()-2)+"px; top:17px'><abbr title='"+toolTipText+"'>?</abbr></div>";
		$comment.before(str);
		// write css
	});
	return this;
	}

})(jQuery);