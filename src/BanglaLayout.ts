import {KeyboardHandler} from "./KeyboardHandler";

interface KeyEventFunctions{
    beforeKeyEvent?(): void;
    afterKeyEvent?():void;
}

//declare var jQuery: JQueryStatic;

export class BanglaLayout implements KeyEventFunctions {
    keyboard: KeyboardHandler;
    sourceField: string;

    constructor(id:string, keyEvents?:KeyEventFunctions) {
        this.sourceField = id;
        this.keyboard = new KeyboardHandler();
        
        if(typeof keyEvents === "object"){
            this.beforeKeyEvent = typeof keyEvents.beforeKeyEvent === "function" ? keyEvents.beforeKeyEvent : this.beforeKeyEvent;
            this.afterKeyEvent = typeof keyEvents.afterKeyEvent == "function" ? keyEvents.afterKeyEvent : this.afterKeyEvent;
        }
        
        this.setupKeyboardHooks();
        // chainability
        return this;
    }
    beforeKeyEvent(): void{};
    afterKeyEvent(): void {};

    setupKeyboardHooks(){
        var inputbox = document.getElementById(this.sourceField);
        if (inputbox === null) {
            throw new Error("No textarea/text input was found with the provided ID.");
        }
        var hasHookedAlready:boolean = false;
        
        var root = this;
        var returnComputeFn = function(keyEvent:any){
            var oEvent = keyEvent;
            var oSource = oEvent.srcElement || oEvent.target;
            
            root.beforeKeyEvent();
            var returnValue = root.keyboard.handleKeyboardInput(oEvent, oSource);
            root.afterKeyEvent();
            
            return returnValue;
        };
        try {
            inputbox.onkeydown = function(keyEvent) {
                hasHookedAlready = returnComputeFn(keyEvent);
                return hasHookedAlready;
            };

            inputbox.onkeyup = function (keyEvent) {
                if (!!keyEvent)
                    keyEvent.preventDefault();
            };
        } catch (e) {
            if (console)
                console.log(e.message);
        }
    }
}