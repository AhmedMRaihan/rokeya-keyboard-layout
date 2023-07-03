import { LetterInformation } from "./LetterInformation";


type CursorPosition = {
    start: number;
    end: number;
}

class UserKeyPressed {
    //code: number; // =65
    iShouldDealIt: boolean; // =false

    unicodeKey: string; // ="\u0041"
    shiftKeyPressed: boolean; // =false        
    replaceLastChar: boolean; // =false
    placeTo: number; // =3
    position: CursorPosition; // { 1,8 }
    characterType: number; // 1~7

    constructor() { }
}
type PartialUserKeyPressed = Partial<UserKeyPressed>;

export class KeyboardHandler {
    public letterInformation: LetterInformation;
    private oEvent: KeyboardEvent;
    private textInputSource: HTMLTextAreaElement | HTMLInputElement;

    constructor() {
        this.letterInformation = new LetterInformation();
    }

    selectKeyPressed(): PartialUserKeyPressed {
        var keyPressed = this.oEvent.key;
        var position: CursorPosition = this.cursorPosition();

        // delete or backspace - for immediate change
        if (keyPressed === 'Delete' || keyPressed === 'Backspace') {
            let keyCodeForBackspace: PartialUserKeyPressed = {
                unicodeKey: keyPressed,
                iShouldDealIt: true,
                placeTo: position.start,
                position: position
            };
            return keyCodeForBackspace;
        }

        // using ctrl+m or F9 button to language switch
        if ((this.oEvent.ctrlKey == true && keyPressed === 'm') || keyPressed === 'F9') {
            let _C = this.letterInformation.currentLanguage === "bn_BD" ? "en_US" : "bn_BD";
            this.letterInformation.currentLanguage = _C;
        }

        //  ctrl, shift, alt, alt-grp, up arrow, down arrow
        if (this.oEvent.ctrlKey || this.oEvent.altKey || this.oEvent.metaKey || ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', 'Escape', 'Insert', 'PageUp', 'PageDown', 'Alt' ].indexOf(keyPressed) >= 0) {
            return {
                iShouldDealIt: false
            };
        }

        var unicodeKey = "";
        var charCode = keyPressed.charCodeAt(0);

        // letters: A-Z and a-z
        var isLetter = (c:string) => c.toLowerCase() != c.toUpperCase() && c.length == 1;
        var isNumber = (str:string) => !isNaN(parseInt(str)) && str.length == 1;

        if (keyPressed >= 'A' && keyPressed <= 'Z' && isLetter(keyPressed)) {
            unicodeKey = this.letterInformation.letterKeyMap[charCode - 'A'.charCodeAt(0)][1];
        }
        else if (keyPressed >= 'a' && keyPressed <= 'z' && isLetter(keyPressed)) {
            unicodeKey = this.letterInformation.letterKeyMap[charCode - 'a'.charCodeAt(0)][0];
        }
        // numbers: 0-9
        else if ( (keyPressed >= '0' && keyPressed <= '9') && isNumber(keyPressed) ) {
            unicodeKey = this.letterInformation.numberKeyMap[charCode - '0'.charCodeAt(0)][0];
        }
        // taka symbol
        else if (keyPressed === '$')
            unicodeKey = "\u09f3";
        // full-stop from keyboard/numpad
        else if (keyPressed === ".")
            unicodeKey = "\u0964";
        // shift with plus-sign, replace with Q[0] or hasanta
        else if ((keyPressed === '+') && this.oEvent.shiftKey)
            unicodeKey = this.letterInformation.letterKeyMap[81 - 65][0];
        
        // not in scope and nothing to handle
        else return {
            iShouldDealIt: false
        };

        // change last character using `h`
        var replaceLastChar = (keyPressed === 'h') && !this.oEvent.shiftKey;

        let userTypedKey: PartialUserKeyPressed = {
            iShouldDealIt: true, // =false

            unicodeKey: unicodeKey, // ="\u0041"
            shiftKeyPressed: this.oEvent.shiftKey, // =false        
            replaceLastChar: replaceLastChar, // =false
            placeTo: position.start, // =3
            position: position, // { 1,8 }
            characterType: <number>this.letterInformation.getFollower(unicodeKey, 1) // 1~7
        };
        return userTypedKey;
    }

    handleKeyboardInput(oEvent: KeyboardEvent, oSource: HTMLInputElement | HTMLTextAreaElement): boolean {
        this.textInputSource = oSource;
        this.oEvent = oEvent;

        var prev: string = "", prevPrev = "", nextNext = "",
            text: string = !!oSource ? this.textInputSource.value : "", prevCharacterType: number = 0;

        var keyState = this.selectKeyPressed();

        // <summary>Decision; Should script continue or not</summary>
        if (keyState.iShouldDealIt === false || this.letterInformation.currentLanguage === "en_US") {
            return true;
        }

        // set previous and next characters
        if (keyState.placeTo >= 2) {
            prevPrev = text.charAt(keyState.placeTo - 2);
            prev = text.charAt(keyState.placeTo - 1);
            prevCharacterType = <number>this.letterInformation.getFollower(prev, 1);
        }
        else if (keyState.placeTo === 1) {
            prev = text.charAt(keyState.placeTo - 1);
            prevCharacterType = <number>this.letterInformation.getFollower(prev, 1);
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
                keyState.unicodeKey = "\u09CD" + this.letterInformation.ZWNJ;
            }
            // other
            else if (prevCharacterType === 2)
                keyState.unicodeKey = <string>this.letterInformation.getFollower(prev, 2);
            else if (prevCharacterType === 7)
                keyState.unicodeKey = this.letterInformation.ZWNJ + this.letterInformation.getFollower(prev, 2);
            else
                keyState.unicodeKey = <string>this.letterInformation.getFollower(prev, 2);

            // if valid key reduce start position-1 because this will not be inserted
            if (keyState.unicodeKey.length > 0) {
                keyState.placeTo -= 1;
                keyState.position.start -= 1;
            }
        }

        // rab => r za-fola
        if (keyState.unicodeKey === "\u09cd\u09af" && prev === "\u09b0") {
            // grand hotel spelling
            if (keyState.position.start > 0 && this.letterInformation.getFollower(prevPrev, 1) === 4)
                keyState.unicodeKey = "\u09cd" + "\u09af";
            else {
                keyState.position.start -= 1;
                keyState.unicodeKey = "\u09b0" + this.letterInformation.ZWNJ + "\u09cd" + "\u09af";
            }
        }

        // same vowel pressed twice will cause a switch
        if (prev === keyState.unicodeKey && (prevCharacterType === 2 || prevCharacterType === 7)) {
            var temp = this.letterInformation.getSwitchedLetter(keyState.unicodeKey);
            // for "onamika" => no switch character because switching a character with same character insert nothing
            if (temp.length > 0) {
                keyState.position.start -= 1;
                keyState.unicodeKey = temp;
            }
            else
                keyState.unicodeKey = <string>this.letterInformation.getFollower(keyState.unicodeKey, 2);
        }
        // change vowel in full-form to kar-form if prevCharacterType is not consonant/fola
        else if (keyState.characterType === 2 && !(prevCharacterType === 1 || prevCharacterType === 3)) {
            keyState.unicodeKey = <string>this.letterInformation.getFollower(keyState.unicodeKey, 2);
        }

        // fullstop button pressed twice will cause a dot ..
        if (prev === "\u0964" && keyState.unicodeKey === "\u0964") {
            keyState.unicodeKey = "\u002E";
            keyState.position.start -= 1;
        }

        // <summary>Backspace or Delete</summary>
        // prevPrev is hasanta
        if (keyState.unicodeKey === 'Backspace') {

            // if end==start then selected text so cursor should not move; otherwise should
            keyState.position.start -= +(keyState.position.start === keyState.position.end);

            if (prevPrev === "\u09CD" || prevPrev === this.letterInformation.ZWNJ)
                keyState.position.start -= 1;

            if (keyState.position.start < 0)
                keyState.position.start = 0;
        }
        // nextNext is hasanta
        else if (keyState.unicodeKey === 'Delete') {
            // if end==start then selected text so cursor should not move; otherwise should
            keyState.position.end += +(keyState.position.start === keyState.position.end);
            keyState.position.end += nextNext === "\u09CD" ? 1 : 0;
        }
        // For Delete/Backspace, nothing should be written
        if (keyState.unicodeKey == 'Delete' || keyState.unicodeKey == 'Backspace'){
            keyState.unicodeKey = "";
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