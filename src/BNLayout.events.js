/*
unicode values taken from this link: http://tlt.its.psu.edu/suggestions/international/bylanguage/bengalichart.html
Keyboard.prototype.cursorPosition, Keyboard.prototype.writeFinalValue function(s) are taken from www
*/
function banglaLayout(id, keyEvents) {
    var inputbox = document.getElementById(id);
    this.keyboard = new Keyboard();
    
    this.beforeKeyEvent = keyEvents.beforeKeyEvent || this.beforeKeyEvent;
    this.afterKeyEvent = keyEvents.afterKeyEvent || this.afterKeyEvent;
    
    var root = this;
	var returnComputeFn = function(keyEvent){
		var oEvent = window.event || keyEvent;
		var oSource = oEvent.srcElement || oEvent.target;
        
        root.beforeKeyEvent();
		var returnValue = root.keyboard.handleKeyboardInput(oEvent, oSource);
        root.afterKeyEvent();
		
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
banglaLayout.prototype.keyboard = null;
banglaLayout.prototype.beforeKeyEvent = function (){
    
};
banglaLayout.prototype.afterKeyEvent = function () {
    
};