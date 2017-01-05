import {LetterInformation} from "./LetterInformation";


type CursorPosition = {
     start: number;
     end: number;
}

class UserKeyPressed {
    code: number; // =65
    iShouldDealIt: boolean; // =false

    unicodeKey: string; // ="\u0041"
    shiftKeyPressed: boolean; // =false        
    replaceLastChar: boolean; // =false
    placeTo: number; // =3
    position: CursorPosition; // { 1,8 }
    characterType: number; // 1~7

    constructor(){}
}
type PartialUserKeyPressed = Partial<UserKeyPressed>;

interface KeyEvent extends Event { keyCode: number, which: number, 
    ctrlKey: boolean, altKey: boolean, shiftKey: boolean }

export class KeyboardHandler {
    public global: LetterInformation;
    private oEvent: KeyEvent;
    private textInputSource:HTMLTextAreaElement|HTMLInputElement;

    constructor() {
        this.global = new LetterInformation();
    }

    selectKeyPressed(): PartialUserKeyPressed {
        let iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false);
        if (iOS)
            return this.select_iOS_KeyPressed();

        var code = this.oEvent.keyCode || this.oEvent.which;
        var position:CursorPosition = this.cursorPosition();

        // delete or backspace or dot-button or plus-button key
        if (code === 8 || code === 46) {
            let keyCodeForBackspace:PartialUserKeyPressed = {
                code: code,
                unicodeKey: "",
                iShouldDealIt: true,
                placeTo: position.start,
                position: position
            };
            return keyCodeForBackspace;
        }

        // using ctrl+m or F9 button to language switched
        if ((this.oEvent['ctrlKey'] && code === 77) || code === 120) {
            let _C = this.global.currentLanguage === "bn_BD" ? "en_US" : "bn_BD";
            this.global.currentLanguage = _C;
        }
        //  ctrl, shift, alt, alt-grp, up arrow, down arrow
        if (this.oEvent.ctrlKey || this.oEvent.altKey || code < 32 || (code >= 37 && code <= 40)) {
            let ignoreListOfKeys:PartialUserKeyPressed = {
                code: code,
                iShouldDealIt: false
            };
            return ignoreListOfKeys;
        }

        var unicodeKey = "";

        if (code >= 65 && code <= 90) {
            unicodeKey = this.global.letterKeyMap[code - 65][+!!this.oEvent.shiftKey];
        }
        else if (code >= 48 && code <= 57 && this.oEvent.shiftKey === false) {
            unicodeKey = this.global.numberKeyMap[code - 48][0];
        }
            // numpad numbers except opera
        else if (!("opera" in window) && code >= 96 && code <= 105 && this.oEvent.shiftKey === false)
            unicodeKey = this.global.numberKeyMap[code - 96];
            // taka symbol
        else if (code === 52 && this.oEvent.shiftKey)
            unicodeKey = "\u09f3";

            // full-stop from keyboard/numpad	
        else if ((code === 190 || code === 110) && !this.oEvent.shiftKey)
            unicodeKey = "\u0964";
            // shift with plus-sign, replace with Q[0] or hasanta
        else if ((code === 107) && this.oEvent.shiftKey)
            unicodeKey = this.global.letterKeyMap[81 - 65][0];
            // shitexplorer tweak for + button
        else if (!!document['selection'] && !!document['selection'].createRange && code === 187 && this.oEvent.shiftKey)
            unicodeKey = this.global.letterKeyMap[81 - 65][0];
            // opera,chrome 24+, firefox16+ tweak for + button
        else if ((code === 187 || code === 61) && this.oEvent.shiftKey)
            unicodeKey = this.global.letterKeyMap[81 - 65][0];
        else return {
            code: code,
            iShouldDealIt: false
        };

        // h || full-Stop || plus-Sign
        var replaceLastChar =
                (code === 72) && !this.oEvent.shiftKey;

        let userTypedKey: PartialUserKeyPressed = {
            code: code, // =65
            iShouldDealIt: true, // =false

            unicodeKey: unicodeKey, // ="\u0041"
            shiftKeyPressed: this.oEvent.shiftKey, // =false        
            replaceLastChar: replaceLastChar, // =false
            placeTo: position.start, // =3
            position: position // { 1,8 }
            //characterType: this.global.getFollower(unicodeKey, 1) // 1~7
        };
        return userTypedKey;
    }

    select_iOS_KeyPressed():PartialUserKeyPressed {
        var code = this.oEvent.keyCode || this.oEvent.which;
        var position:CursorPosition = this.cursorPosition();
        var unicodeKey = "", iShouldDealIt = false;

        if (code >= 65 && code <= 90) {
            unicodeKey = this.global.letterKeyMap[code - 65][1];
        }
        else if (code >= 97 && code <= 122) {
            unicodeKey = this.global.letterKeyMap[code - 97][0];
        }
        else if (code >= 48 && code <= 57) {
            unicodeKey = this.global.numberKeyMap[code - 48];
        }

        var replaceLastChar = (unicodeKey === "" && code === 104);
        iShouldDealIt = unicodeKey !== "" || replaceLastChar;
        
        return {
            code: code,
            unicodeKey: unicodeKey,
            iShouldDealIt: iShouldDealIt,
            placeTo: position.start,
            replaceLastChar: replaceLastChar,
            position: position
        };
    };

    handleKeyboardInput(oEvent:KeyEvent, oSource:HTMLInputElement|HTMLTextAreaElement):boolean {
        this.textInputSource = oSource;
        this.oEvent = oEvent;

        var prev:string = "", prevPrev = "", nextNext = "", 
            text:string = !!oSource ? this.textInputSource.value : "", prevCharacterType:number = 0;

        var keyState = this.selectKeyPressed();

        // <summary>Decision; Should script continue or not</summary>
        if (keyState.iShouldDealIt === false || this.global.currentLanguage === "en_US") {
            return true;
        }

        // set previous and next characters
        if (keyState.placeTo >= 2) {
            prevPrev = text.charAt(keyState.placeTo - 2);
            prev = text.charAt(keyState.placeTo - 1);
            prevCharacterType = <number>this.global.getFollower(prev, 1);
        }
        else if (keyState.placeTo === 1) {
            prev = text.charAt(keyState.placeTo - 1);
            prevCharacterType = <number>this.global.getFollower(prev, 1);
        }

        /************************************** 
        unicodeKey change if necessary
        ***************************************/
        // consonant+h type input or hasanta pressed twice
        keyState.replaceLastChar = keyState.replaceLastChar || (prev === "\u09CD" && keyState.unicodeKey === "\u09CD");

        if (keyState.replaceLastChar) {
            // if hasanta then +
            if (prev === "\u09CD" && keyState.unicodeKey === "\u09CD") {
                keyState.unicodeKey = "\u002B";
            }
            // if hasanta and h then force end at hasanta
            else if (prev === "\u09CD" && keyState.unicodeKey === "") {
                keyState.unicodeKey = "\u09CD" + this.global.ZWNJ;
            }
            // other
            else if (prevCharacterType === 2)
                keyState.unicodeKey = <string>this.global.getFollower(prev, 2);
            else if (prevCharacterType === 7)
                keyState.unicodeKey = this.global.ZWNJ + this.global.getFollower(prev, 2);
            else
                keyState.unicodeKey = <string>this.global.getFollower(prev, 2);

            // if valid key reduce start position-1 because this will not be inserted
            if (keyState.unicodeKey.length > 0) {
                keyState.placeTo -= 1;
                keyState.position.start -= 1;
            }
        }

        // rab => r za-fola
        if (keyState.unicodeKey === "\u09cd\u09af" && prev === "\u09b0") {
            // grand hotel spelling
            if (keyState.position.start > 0 && this.global.getFollower(prevPrev, 1) === 4)
                keyState.unicodeKey = "\u09cd" + "\u09af";
            else {
                keyState.position.start -= 1;
                keyState.unicodeKey = "\u09b0" + this.global.ZWNJ + "\u09cd" + "\u09af";
            }
        }

        // same vowel pressed twice will cause a switch
        if (prev === keyState.unicodeKey && (prevCharacterType === 2 || prevCharacterType === 7)) {
            var temp = this.global.getSwitchedLetter(keyState.unicodeKey);
            // for "onamika" => no switch character because switching a character with same character insert nothing
            if (temp.length > 0) {
                keyState.position.start -= 1;
                keyState.unicodeKey = temp;
            }
            else
                keyState.unicodeKey = <string>this.global.getFollower(keyState.unicodeKey, 2);
        }
            // change vowel in full-form to kar-form if prevCharacterType is not consonant/fola
        else if (keyState.characterType === 2 && !(prevCharacterType === 1 || prevCharacterType === 3)) {
            keyState.unicodeKey = <string>this.global.getFollower(keyState.unicodeKey, 2);
        }

        // fullstop button pressed twice will cause a dot ..
        if (prev === "\u0964" && keyState.unicodeKey === "\u0964") {
            keyState.unicodeKey = "\u002E";
            keyState.position.start -= 1;
        }

        // <summary>Backspace or Delete</summary>
        // prevPrev is hasanta
        if (keyState.code === 8) {

            // if end==start then selected text so cursor should not move; otherwise should
            keyState.position.start -= +(keyState.position.start === keyState.position.end);

            if (prevPrev === "\u09CD" || prevPrev === this.global.ZWNJ)
                keyState.position.start -= 1;

            if (keyState.position.start < 0)
                keyState.position.start = 0;
        }
        // nextNext is hasanta
        if (keyState.code === 46) {
            // if end==start then selected text so cursor should not move; otherwise should
            keyState.position.end += +(keyState.position.start === keyState.position.end);
            keyState.position.end += nextNext === "\u09CD" ? 1 : 0;
        }

        // <summary>Final data preparation</summary>
        var firstPortion = text.slice(0, keyState.position.start);
        var lastPortion = text.slice(keyState.position.end);
        var finalText = firstPortion + keyState.unicodeKey + lastPortion;
        var caretPosition = keyState.position.start + keyState.unicodeKey.length;

        // <summary>Write final data and update caret</summary>
        var scrollTop = this.textInputSource.scrollTop;
        this.textInputSource.value = finalText;
        this.textInputSource.focus();
        this.textInputSource.scrollTop = scrollTop;
		this.textInputSource.setSelectionRange(caretPosition, caretPosition);

        return false;
    }

    // No support beyond IE <= 8. Details here: http://stackoverflow.com/a/16106012/385205
    cursorPosition(): CursorPosition {
        return {
            start: this.textInputSource.selectionStart, 
            end: this.textInputSource.selectionEnd
        };
    };
}