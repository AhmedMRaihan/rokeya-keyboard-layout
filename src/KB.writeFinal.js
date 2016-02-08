// <summary>Write finalText to the text/input box</summary>
Keyboard.prototype.writeFinalValue = function (finalText, caretPosition) {

    var scrollTop = this.textInputSource.scrollTop;

    if (typeof this.textInputSource.selectionStart == "number" && typeof this.textInputSource.selectionEnd == "number") {

        // Non-IE browsers and IE 9
        this.textInputSource.value = finalText;
    }
    else if (document.selection && document.selection.createRange) {

        // For IE up to version 8
        //var selectionRange = document.selection.createRange();
        //var textInputRange = this.textInputSource.createTextRange();
        //var precedingRange = this.textInputSource.createTextRange();
        //var bookmark = selectionRange.getBookmark();
        //textInputRange.moveToBookmark(bookmark);
        //precedingRange.setEndPoint("EndToStart", textInputRange);
        //var start = precedingRange.text.length;
        //var end = start + selectionRange.text.length;
        //alert(start+" && "+end+" "+caretPosition);
        this.textInputSource.value = finalText;
        //caretPosition=end;
        /*
                var count=0;// finalText.search('\r\n');
                var i=0;
                while( i <caretPosition)
                {
                    var newLinePosition= finalText.substr(i).search('\r\n');
                    if(newLinePosition >=0)
                    {
                        i+=newLinePosition +1;
                        count+=1;
                    }
                    else
                        break;
                }
                finalText= finalText.replace("\r\n","\n");
                //caretPosition-=count;
        
                finalText= finalText.replace(/\s+$/,"");
                //if( finalText.charCodeAt(caretPosition)==13)
                //    finalText=finalText.substr(0, finalText.length-1);
        
                this.textInputSource.value = finalText;
        */
        //        // Move the caret
        //        textInputRange = this.createTextRange();
        //        textInputRange.collapse(true);
        //        textInputRange.move("character", start - (this.textInputRange.value.slice(0, start).split("\r\n").length - 1));
        //        textInputRange.select();
    }

    this.textInputSource.focus();
    this.textInputSource.scrollTop = scrollTop;

    // move caret
	try{
		if (this.textInputSource.setSelectionRange) {
			this.textInputSource.focus();
			this.textInputSource.setSelectionRange(caretPosition, caretPosition);
		}
		else if (this.textInputSource.createTextRange) {
			var range = this.textInputSource.createTextRange();
			range.collapse(true);
			range.moveEnd("character", caretPosition);
			range.moveStart("character", caretPosition);
			range.select();
		}
	}catch(e) {
		if(console) {
			console.log(e);
		}
	}
};

Keyboard.prototype.cursorPosition = function () {
    if (!!this.caretPosition)
        return {
            start: this.caretPosition,
            end: this.caretPosition
        };

    //var textarea = document.getElementById("myTextArea");
    var start = 0, end = 0;
    if (typeof this.textInputSource.selectionStart == "number" && typeof this.textInputSource.selectionEnd == "number") {
        // Non-IE browsers and IE 9
        start = this.textInputSource.selectionStart;
        end = this.textInputSource.selectionEnd;
    }
    else if (document.selection && document.selection.createRange && this.textInputSource.type == "textarea") {
        // For IE up to version 8
        var textarea = this.textInputSource;
        textarea.focus();
        /*
                var selection = document.selection.createRange();
        
                selection.moveStart('character', -this.textInputSource.value.length);
        
                start = selection.text.length;
                end = selection.text.length;
                alert("start: "+start+" and end: "+end);
        */

        var selection_range = document.selection.createRange().duplicate();

        if (selection_range.parentElement() == textarea && this.textInputSource.type == "textarea") {
            // Check that the selection is actually in our textarea
            // Create three ranges, one containing all the text before the selection,
            // one containing all the text in the selection (this already exists), and one containing all
            // the text after the selection.

            var before_range = document.body.createTextRange();
            before_range.moveToElementText(textarea);                    // Selects all the text

            before_range.setEndPoint("EndToStart", selection_range);     // Moves the end where we need it

            var after_range = document.body.createTextRange();
            after_range.moveToElementText(textarea);                     // Selects all the text
            after_range.setEndPoint("StartToEnd", selection_range);      // Moves the start where we need it

            var before_finished = false, selection_finished = false, after_finished = false;
            var before_text, untrimmed_before_text, selection_text, untrimmed_selection_text, after_text, untrimmed_after_text;

            // Load the text values we need to compare
            before_text = untrimmed_before_text = before_range.text;
            selection_text = untrimmed_selection_text = selection_range.text;
            after_text = untrimmed_after_text = after_range.text;
            // Check each range for trimmed newlines by shrinking the range by 1 character and seeing
            // if the text property has changed.  If it has not changed then we know that IE has trimmed
            // a \r\n from the end.
            do {
                if (!before_finished) {
                    if (before_range.compareEndPoints("StartToEnd", before_range) === 0) {
                        before_finished = true;
                    } else {
                        before_range.moveEnd("character", -1);
                        if (before_range.text === before_text) {
                            untrimmed_before_text += "\r\n";
                        } else {
                            before_finished = true;
                        }
                    }
                }
                if (!selection_finished) {
                    if (selection_range.compareEndPoints("StartToEnd", selection_range) === 0) {
                        selection_finished = true;
                    } else {
                        selection_range.moveEnd("character", -1);
                        if (selection_range.text === selection_text) {
                            untrimmed_selection_text += "\r\n";
                        } else {
                            selection_finished = true;
                        }
                    }
                }
                if (!after_finished) {
                    if (after_range.compareEndPoints("StartToEnd", after_range) === 0) {
                        after_finished = true;
                    } else {
                        after_range.moveEnd("character", -1);
                        if (after_range.text == after_text) {
                            untrimmed_after_text += "\r\n";
                        } else {
                            after_finished = true;
                        }
                    }
                }

            } while ((!before_finished || !selection_finished || !after_finished));

            // Untrimmed success test to make sure our results match what is actually in the textarea
            // This can be removed once you're confident it's working correctly
            var untrimmed_text = untrimmed_before_text + untrimmed_selection_text + untrimmed_after_text;
            var untrimmed_successful = false;
            if (textarea.value == untrimmed_text) {
                untrimmed_successful = true;
            }
            // ** END Untrimmed success test

            start = untrimmed_before_text.length;
            end = start + selection_range.text.length;
            if (end != start)
                end += start - end;
            //alert(start+" && "+end);
            //		return startPoint;

            /*          var selectionRange = document.selection.createRange();
                        var textInputRange = this.textInputSource.createTextRange();
                        var precedingRange = this.textInputSource.createTextRange();
                        var bookmark = selectionRange.getBookmark();
                        textInputRange.moveToBookmark(bookmark);
                        precedingRange.setEndPoint("EndToStart", textInputRange);
                        start = precedingRange.text.length;
                        end = start + selectionRange.text.length;
            
                        alert("start: "+start+" and end: "+end);
            */
        }

    }
    else if (document.selection && document.selection.createRange) {
        var selectionRange = document.selection.createRange();
        var textInputRange = this.textInputSource.createTextRange();
        var precedingRange = this.textInputSource.createTextRange();
        var bookmark = selectionRange.getBookmark();
        textInputRange.moveToBookmark(bookmark);
        precedingRange.setEndPoint("EndToStart", textInputRange);
        start = precedingRange.text.length;
        end = start + selectionRange.text.length;
    }
    // all browser detection complete and variables defined there
    return {
        start: start,
        end: end
    };
};