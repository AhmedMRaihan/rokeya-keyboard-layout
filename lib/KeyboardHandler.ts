import { LetterInformation, LetterType } from "./LetterInformation";


interface CursorPosition {
    start: number;
    end: number;
}

export enum CurrentLanguage {
  BENGALI = 'bn_BD',
  ENGLISH = 'en_US',
}

interface UserKeyPressed {
    iShouldDealIt: boolean; // =false

    unicodeKey: string; // ="\u0041"
    shiftKeyPressed: boolean; // =false        
    replaceLastChar: boolean; // =false
    placeTo: number; // =3
    position: CursorPosition; // { 1,8 }
    characterType: number; // 1~7
}
type PartialUserKeyPressed = Partial<UserKeyPressed>;

export class KeyboardHandler {
    private letterInformation: LetterInformation;
    private oEvent: KeyboardEvent;
    private textInputSource: HTMLTextAreaElement | HTMLInputElement;
    private currentLanguage: string = CurrentLanguage.BENGALI;

    constructor() {
        this.oEvent = {} as KeyboardEvent;
        this.textInputSource = {} as HTMLTextAreaElement;
        this.letterInformation = new LetterInformation();
    }

    private selectKeyPressed(): PartialUserKeyPressed {
        const keyPressed = this.oEvent.key;
        const position: CursorPosition = this.cursorPosition();

        // delete or backspace - for immediate change
        if (keyPressed === 'Delete' || keyPressed === 'Backspace') {
            const keyCodeForBackspace: PartialUserKeyPressed = {
                characterType: LetterType.OTHERS,
                unicodeKey: keyPressed,
                iShouldDealIt: true,
                placeTo: position.start,
                position: position
            };
            return keyCodeForBackspace;
        }

        // using ctrl+m or F9 button to language switch
        if ((this.oEvent.ctrlKey == true && keyPressed === 'm') || keyPressed === 'F9') {
            const _C = this.currentLanguage === CurrentLanguage.BENGALI ? 
                            CurrentLanguage.ENGLISH : CurrentLanguage.BENGALI;
            console.log(`Will switch to ${_C} from ${this.currentLanguage}`);
            this.currentLanguage = _C;
        }

        //  ctrl, shift, alt, alt-grp, up arrow, down arrow
        if (this.oEvent.ctrlKey || this.oEvent.altKey || this.oEvent.metaKey || ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', 'Escape', 'Insert', 'PageUp', 'PageDown', 'Alt' ].indexOf(keyPressed) >= 0) {
            return {
                iShouldDealIt: false
            };
        }

        let unicodeKey = "";
        const charCode = keyPressed.charCodeAt(0);

        // letters: A-Z and a-z
        const isLetter = (c:string) => c.toLowerCase() != c.toUpperCase() && c.length == 1;
        const isNumber = (str:string) => !isNaN(parseInt(str)) && str.length == 1;

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
        else if (keyPressed === '+')
            unicodeKey = this.letterInformation.letterKeyMap['q'.charCodeAt(0) - 'a'.charCodeAt(0)][0];
        
        // not in scope and nothing to handle
        else return {
            iShouldDealIt: false
        };

        // change last character using `h`
        const replaceLastChar = (keyPressed === 'h') && !this.oEvent.shiftKey;

        const userTypedKey: PartialUserKeyPressed = {
            iShouldDealIt: true, // =false

            unicodeKey: unicodeKey, // ="\u0041"
            shiftKeyPressed: this.oEvent.shiftKey, // =false        
            replaceLastChar: replaceLastChar, // =false
            placeTo: position.start, // =3
            position: position, // { 1,8 }
            characterType: this.letterInformation.getFollower(unicodeKey, 1) as number // 1~7
        };
        return userTypedKey;
    }

    handleKeyboardInput(oEvent: KeyboardEvent, oSource: HTMLInputElement | HTMLTextAreaElement, currentLanguage?: string): boolean {
        this.textInputSource = oSource;
        this.oEvent = oEvent;
        let prev: string = "", prevPrev = "", prevCharacterType: number = 0;
        const existingContent: string = this.textInputSource.value;

        if(currentLanguage) {
            this.currentLanguage = currentLanguage;
        }
        const keyState = this.selectKeyPressed();

        // <summary>Decision; Should script continue or not</summary>
        if (keyState.iShouldDealIt === false || 
            this.currentLanguage === CurrentLanguage.ENGLISH) {
            return true;
        }
        if ( typeof(keyState.placeTo) !== "number" 
            || typeof(keyState.position) === "undefined" 
            || typeof(keyState.characterType) === "undefined"
            || typeof(keyState.unicodeKey) === "undefined"
        ) {
            return true;
        }

        // set previous and next characters
        if (keyState.placeTo >= 2) {
            prevPrev = existingContent.charAt(keyState.placeTo - 2);
            prev = existingContent.charAt(keyState.placeTo - 1);
            prevCharacterType = this.letterInformation.getFollower(prev, 1) as number;
        }
        else if (keyState.placeTo === 1) {
            prev = existingContent.charAt(keyState.placeTo - 1);
            prevCharacterType = this.letterInformation.getFollower(prev, 1) as number;
        }

        /************************************** 
        unicodeKey change if necessary
        ***************************************/
        // consonant+h type input or hasanta pressed twice
        keyState.replaceLastChar = keyState.replaceLastChar || (prev === "\u09CD" && keyState.unicodeKey === "\u09CD");

        if (keyState.replaceLastChar) {
            // if hasanta then +
            if (prevCharacterType == LetterType.HASANTA && keyState.unicodeKey === "\u09CD") {
                keyState.unicodeKey = "\u002B";
            }
            // if hasanta and h then force end at hasanta
            else if (prevCharacterType == LetterType.HASANTA && keyState.unicodeKey === "") {
                keyState.unicodeKey = "\u09CD" + this.letterInformation.ZWNJ;
            }
            // other
            else if (prevCharacterType === LetterType.VOWEL_IN_KAR_FORM)
                keyState.unicodeKey = <string>this.letterInformation.getFollower(prev, 2);
            else if (prevCharacterType === LetterType.VOWEL_IN_FULL_FORM)
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
        if (prev === keyState.unicodeKey && (prevCharacterType === LetterType.VOWEL_IN_KAR_FORM || prevCharacterType === LetterType.VOWEL_IN_FULL_FORM)) {
            const temp = <string> this.letterInformation.getConsecutiveVowel(keyState.unicodeKey);
            // for "onamika" => no switch character because switching a character with same character insert nothing
            if (temp.length > 0) {
                keyState.position.start -= 1;
                keyState.unicodeKey = temp;
            }
            else
                keyState.unicodeKey = <string>this.letterInformation.getFollower(keyState.unicodeKey, 2);
        }
        // change vowel in full-form to kar-form if prevCharacterType is not consonant/fola
        else if (keyState.characterType === LetterType.VOWEL_IN_KAR_FORM && !(prevCharacterType === LetterType.CONSONANT || prevCharacterType === LetterType.FOLA)) {
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
            // keyState.position.end += nextNext === "\u09CD" ? 1 : 0;
        }
        // For Delete/Backspace, nothing should be written
        if (keyState.unicodeKey == 'Delete' || keyState.unicodeKey == 'Backspace'){
            keyState.unicodeKey = "";
        }

        // <summary>Final data preparation</summary>
        const firstPortion = existingContent.slice(0, keyState.position.start);
        const lastPortion = existingContent.slice(keyState.position.end);
        const finalText = firstPortion + keyState.unicodeKey + lastPortion;
        const caretPosition = keyState.position.start + keyState.unicodeKey.length;

        // <summary>Write final data and update caret</summary>
        const scrollTop = this.textInputSource.scrollTop;
        this.textInputSource.value = finalText;
        this.textInputSource.focus();
        this.textInputSource.scrollTop = scrollTop;
        this.textInputSource.setSelectionRange(caretPosition, caretPosition);

        return false;
    }

    // No support beyond IE <= 8. Details here: http://stackoverflow.com/a/16106012/385205
    private cursorPosition(): CursorPosition {
        return {
            start: this.textInputSource.selectionStart || 0,
            end: this.textInputSource.selectionEnd || 0
        };
    };
}
