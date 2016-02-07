Keyboard.prototype.tinymceplugin = function (text, caretPosition, e) {
	if(text.charAt(caretPosition) == "<" && text.length == caretPosition+4 && (e.keyCode == 8 || e.keyCode == 46) )
		return true; // A delete is pressed at the end and tinymce itself will take care of it
	if( (text === "" || (caretPosition >0 && text.charAt(caretPosition-1) === ">")) && (e.keyCode === 8 || e.keyCode === 46) )
		return false; // Tinymce converts > to &lt; so it will never appear in text
		
    this.text = text;
    this.caretPosition = caretPosition;
    return this.handleKeyboardInput(e, null);
};