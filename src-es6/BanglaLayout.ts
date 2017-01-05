import {KeyboardHandler} from "./KeyboardHandler";

interface KeyEventFunctions{
    beforeKeyEvent?(): void;
    afterKeyEvent?():void;
}

declare var jQuery: JQueryStatic;

export class BanglaLayout implements KeyEventFunctions {
    keyboard: KeyboardHandler;
    sourceField: string;

    constructor(id:string, keyEvents?:KeyEventFunctions) {
         var inputbox = document.getElementById(id);
         if (inputbox === null) {
            throw new Error("No textarea/text input was found with the provided ID.");
        }
        
        this.sourceField = id;
        this.keyboard = new KeyboardHandler();
        
        if(typeof keyEvents === "object"){
            this.beforeKeyEvent = typeof keyEvents.beforeKeyEvent === "function" ? keyEvents.beforeKeyEvent : this.beforeKeyEvent;
            this.afterKeyEvent = typeof keyEvents.afterKeyEvent == "function" ? keyEvents.afterKeyEvent : this.afterKeyEvent;
        }
    }
    beforeKeyEvent(): void{};
    afterKeyEvent():void {};

    loadHelpTooltip():BanglaLayout {
        try {
            let toolTipText = "ctrl+m অথবা F9 চেপে বাংলা ও ইংরেজীতে সুইচ করতে পারবেন..\n..হ=H, ৎ=Z, ঙ=x, ঞ=X, ং=V, ঁ=B, ঃ=M";

            let $parent:JQuery = jQuery("#" + this.sourceField);
            let left = $parent.position().left + $parent.width();
            left -= $parent.width() < 3 ? 0 : 3;
            let top = $parent.position().top;
            top += $parent.height() < 5 ? 0 : 5;

            let $tooltipDiv = document.createElement("abbr");
            $tooltipDiv.setAttribute("style", "width: 10px; position:absolute; cursor:help; color:red; left:" 
            + (left) + "px;top:" + (top) + "px;");
            $tooltipDiv.innerHTML = "?";
            $tooltipDiv.setAttribute("title", toolTipText);

            jQuery($tooltipDiv).insertAfter($parent);
            return this;
        } catch (e) {
            if (console)
                console.log(e.message);
        }
    };
}