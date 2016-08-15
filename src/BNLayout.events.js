/*
unicode values taken from this link: http://tlt.its.psu.edu/suggestions/international/bylanguage/bengalichart.html
Keyboard.prototype.cursorPosition, Keyboard.prototype.writeFinalValue function(s) are taken from www
*/
function banglaLayout(id, keyEvents) {
    var inputbox = document.getElementById(id);
    if (inputbox === null) {
        throw new Error("No textarea/text input was found with the provided ID.");
    }
    this.keyboard = new Keyboard();
    
    if(typeof keyEvents === "object"){
        this.beforeKeyEvent = keyEvents.beforeKeyEvent !== undefined ? keyEvents.beforeKeyEvent : this.beforeKeyEvent;
        this.afterKeyEvent = keyEvents.afterKeyEvent !== undefined ? keyEvents.afterKeyEvent : this.afterKeyEvent;
    }
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