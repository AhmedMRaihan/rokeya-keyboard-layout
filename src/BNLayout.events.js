/*
unicode values taken from this link: http://tlt.its.psu.edu/suggestions/international/bylanguage/bengalichart.html
Keyboard.prototype.cursorPosition, Keyboard.prototype.writeFinalValue function(s) are taken from www
*/
function banglaLayout(id) {
    var inputbox = document.getElementById(id);
    var keyboard = new Keyboard();

	var returnComputeFn = function(keyEvent){
		var oEvent = window.event || keyEvent;
		var oSource = oEvent.srcElement || oEvent.target;
		var returnValue = keyboard.handleKeyboardInput(oEvent, oSource);
		return returnValue;	
	};
    try {
        inputbox.onkeydown = function (keyEvent) {
            if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent))
                return true;
				
			this.returnValue = returnComputeFn(keyEvent);
			return this.returnValue;
        };
        inputbox.onkeypress = function (keyEvent) {
            if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) {
                this.returnValue = returnComputeFn(keyEvent);
            }
            return this.returnValue;
        };
        inputbox.onkeyup = function (keyEvent) {
            if (!!keyEvent)
                keyEvent.preventDefault();
        };
    } catch (e) {
        if (console)
            console.log(e.message);
    }
    this.sourceField = id;
    return this;
}