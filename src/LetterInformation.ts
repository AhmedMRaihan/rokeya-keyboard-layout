
export enum LetterType {
    CONSONANT = 1,
    VOWEL_IN_KAR_FORM = 2,
    FOLA = 3,
    HASANTA = 4,
    ZERO_WIDTH_NON_JOINER = 5,
    MANDATORY_END = 6, // Should be used with ZWJ only
    VOWEL_IN_FULL_FORM = 7
}

// <summary>Letter Information Class</summary>
export class LetterInformation {
    currentLanguage: string = "bn_BD";
    replaceLastChar: boolean = false; // Replace ক with খ if required
    ZWNJ: string = "\u200c"; // Do not render the letter with previous letter
    ZWJ: string = "\u200d"; // Render the letter with previous letter

    letterKeyMap: string[][] =
        [
            ["\u09be", "\u0985"], // aa-kar and onamika......... A
            ["\u09ac", "\u0981"], // bandorban and chondrobindu..... B
            ["\u099a", "\u099b"], // chirokaal and chobi...... C
            ["\u09a1", "\u09a6"], // dahuk and dekha...... D
            ["\u09c7", "\u098f"], // emni and oirabot...... E
            ["\u09ab", "\u09a5"], // ful and thimpu...... F
            ["\u0997", "\u0998"], // gotokal and ghatshila...... G
            ["", "\u09b9"], // ____ and hotath...... H
            ["\u09bf", "\u0987"], // ishrat and iishaan...... I
            ["\u099c", "\u099d"], // jonogon and jhargram...... J
            ["\u0995", "\u0996"], // kotha and khagrachori...... K
            ["\u09b2", "\u09b6"], // lalmonirhaat and shorot...... L
            ["\u09ae", "\u0983"], // minisha and dukkho...... M
            ["\u09a8", "\u09a3"], // notun and notto-bidhan...... N
            ["\u09cb", "\u0993"], // oli and oushodh...... O
            ["\u09aa", "\u09ab"], // polashi and falgun...... P
            ["\u09cd", "\u09dd"], // hasanta and ashaar...... Q
            ["\u09b0", "\u09dc"], // rinita and jhor....... R
            ["\u09b8", "\u09b7"], // seoul and sholoi-december...... S
            ["\u099f", "\u09A4"], // tipaimukh and tutul...... T
            ["\u09c1", "\u0989"], // uttom and usha...... U
            ["\u09ad", "\u0982"], // vrammoman and itong-bitong...... V
            ["\u09c3", "\u09a7"], // rii-kar and dhormoshala...... W
            ["\u0999", "\u099e"], // 5th and 10th consonant...... X
            ["\u09df", "\u09cd\u09af"], // ayan and z-fola...... Y
            ["\u09af", "\u09ce"], // zoti and khanda-ta...... Z
        ];
    numberKeyMap: Array<string> =
        [
            "\u09e6", "\u09e7", "\u09e8", "\u09e9", "\u09ea", "\u09eb", "\u09ec", "\u09ed", "\u09ee", "\u09ef"
        ];
    consecutiveVowelMap: string[][] =
        [
            ["\u0985", ""], ["\u09be", ""],
            ["\u09c7", "\u09c8"], ["\u098f", "\u0990"],
            ["\u09cb", "\u09cc"], ["\u0993", "\u0994"],
            ["\u09bf", "\u09c0"], ["\u0987", "\u0988"],
            ["\u09c1", "\u09c2"], ["\u0989", "\u098a"],
            ["\u09c3", "\u098b"], ["\u09cd", "+"]
        ];

    getConsecutiveVowel = function (inputValue: string): string {
        for (let start = 0; start < this.consecutiveVowelMap.length; ++start) {
            if (this.consecutiveVowelMap[start][0] === inputValue) {
                return this.consecutiveVowelMap[start][1];
            }
        }
        return "";
    };
    
    letter_info =
        [
            ["\u200d", LetterType.ZERO_WIDTH_NON_JOINER, ""], 

            /*shor-borno*/
            ["\u0985", LetterType.VOWEL_IN_FULL_FORM, "\u0985"], 
            ["\u0986", LetterType.VOWEL_IN_FULL_FORM, "\u09BE"], 
            ["\u0987", LetterType.VOWEL_IN_FULL_FORM, "\u09bf"], 
            ["\u0988", LetterType.VOWEL_IN_FULL_FORM, "\u09c0"], 
            ["\u0989", LetterType.VOWEL_IN_FULL_FORM, "\u09c1"], 
            ["\u098a", LetterType.VOWEL_IN_FULL_FORM, "\u09c2"], 
            ["\u098b", LetterType.VOWEL_IN_FULL_FORM, "\u09c3"], 
            ["\u098f", LetterType.VOWEL_IN_FULL_FORM, "\u09c7"], 
            ["\u0990", LetterType.VOWEL_IN_FULL_FORM, "\u09c8"], 
            ["\u0993", LetterType.VOWEL_IN_FULL_FORM, "\u09cb"], 
            ["\u0994", LetterType.VOWEL_IN_FULL_FORM, "\u09cc"], 
            
            /*kobor*/["\u0995", LetterType.CONSONANT, "\u0996"], ["\u0996", LetterType.CONSONANT, ""], ["\u0997", LetterType.CONSONANT, "\u0998"], ["\u0998", LetterType.CONSONANT, ""], ["\u0999", LetterType.CONSONANT, ""], 
            /*cholonto*/["\u099a", LetterType.CONSONANT, "\u099b"], ["\u099b", LetterType.CONSONANT, ""], ["\u099c", LetterType.CONSONANT, "\u099d"], ["\u099d", LetterType.CONSONANT, ""], ["\u099e", LetterType.CONSONANT, ""], 
            /*tonkar*/["\u099f", LetterType.CONSONANT, "\u09a0"], ["\u09a0", LetterType.CONSONANT, ""], ["\u09a1", LetterType.CONSONANT, "\u09a2"], ["\u09a2", LetterType.CONSONANT, ""], ["\u09a3", LetterType.FOLA, ""], 
            /*tutul*/["\u09a4", LetterType.CONSONANT, "\u09a5"], ["\u09a5", LetterType.CONSONANT, ""], ["\u09a6", LetterType.CONSONANT, "\u09a7"], ["\u09a7", LetterType.CONSONANT, ""], ["\u09a8", LetterType.CONSONANT, ""], 
            /*paloan*/["\u09aa", LetterType.CONSONANT, "\u09ab"], ["\u09ab", LetterType.CONSONANT, ""], ["\u09ac", LetterType.FOLA, "\u09ad"], ["\u09ad", LetterType.CONSONANT, ""], ["\u09ae", LetterType.CONSONANT, ""], ["\u09af", LetterType.FOLA, ""], ["\u09b0", LetterType.FOLA, "\u09dc"], ["\u09b2", LetterType.CONSONANT, ""], 
            /*shosank*/["\u09b6", LetterType.CONSONANT, ""], ["\u09b7", LetterType.CONSONANT, ""], ["\u09b8", LetterType.CONSONANT, "\u09b6"], ["\u09b9", LetterType.CONSONANT, ""], 

            /*remaining consonants*/
            ["\u09dc", LetterType.CONSONANT, "\u09dd"], // ড়
            ["\u09dd", LetterType.CONSONANT, ""], // ঢ়
            ["\u09df", LetterType.CONSONANT, ""], // য়
            ["\u09fb", LetterType.CONSONANT, ""], // ৻
            ["\u09fc", LetterType.CONSONANT, ""], // ৼ

            /*ami-amra*/
            ["\u09be", LetterType.VOWEL_IN_KAR_FORM, "\u0986"], 
            ["\u09bf", LetterType.VOWEL_IN_KAR_FORM, "\u0987"], 
            ["\u09c0", LetterType.VOWEL_IN_KAR_FORM, "\u0988"], 
            ["\u09c1", LetterType.VOWEL_IN_KAR_FORM, "\u0989"], 
            ["\u09c2", LetterType.VOWEL_IN_KAR_FORM, "\u098a"], 
            ["\u09c3", LetterType.VOWEL_IN_KAR_FORM, "\u098b"], 
            ["\u09c7", LetterType.VOWEL_IN_KAR_FORM, "\u098f"], 
            ["\u09c8", LetterType.VOWEL_IN_KAR_FORM, "\u0990"], 
            ["\u09cb", LetterType.VOWEL_IN_KAR_FORM, "\u0993"], 
            ["\u09cc", LetterType.VOWEL_IN_KAR_FORM, "\u0994"], 
            ["\u09d7", LetterType.VOWEL_IN_KAR_FORM, "\u0988"], 

            // Suffix
            ["\u0964", LetterType.MANDATORY_END, "\u002e"], // ।
            ["\u09cd", LetterType.HASANTA, "\u09cd"], 
            ["\u09ce", LetterType.MANDATORY_END, ""], // ৎ
            ["\u0981", LetterType.MANDATORY_END, ""], // ◌ঁ
            ["\u0982", LetterType.MANDATORY_END, ""], // ং
            ["\u0983", LetterType.MANDATORY_END, ""], // ঃ
            ["\u09f3", LetterType.MANDATORY_END, "$"] // ৳
        ].sort(function (a, b) {
            return a[0] < b[0] ? -1 : 1;
        });

    // <summary>binary search for a follower value</summary>
    getFollower(inputValue: string, propertyNo: number): string | number {
        var start = 0;
        var end = this.letter_info.length - 1;
        var mid = Math.floor((end + start) / 2);

        for (; end >= start; mid = Math.floor((end + start) / 2)) {
            if (this.letter_info[mid][0] === inputValue)
                return this.letter_info[mid][propertyNo];
            if (this.letter_info[mid][0] > inputValue)
                end = mid - 1;
            else
                start = mid + 1;
        }

        return "";
    }
}