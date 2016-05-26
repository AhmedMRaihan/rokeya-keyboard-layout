/**************** Global variable */
// <summary>Letter Information Class</summary>
function Letter_Information() {
    this.currentLanguage = "bn_BD";
    this.replaceLastChar = false; // eita ka er por h dile  kha( khata) likha hoe jai ei typer support ditey lagbe
    this.ZWNJ = "\u200c";
    this.ZWJ = "\u200d";

    this.letterKeyMap =
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
    this.numberKeyMap =
	[
		"\u09e6", "\u09e7", "\u09e8", "\u09e9", "\u09ea", "\u09eb", "\u09ec", "\u09ed", "\u09ee", "\u09ef"
	];
}


Letter_Information.prototype.switchedLetter =
[
	["\u0985", ""], ["\u09be", ""],
	["\u09c7", "\u09c8"], ["\u098f", "\u0990"],
	["\u09cb", "\u09cc"], ["\u0993", "\u0994"],
	["\u09bf", "\u09c0"], ["\u0987", "\u0988"],
	["\u09c1", "\u09c2"], ["\u0989", "\u098a"],
	["\u09c3", "\u098b"], ["\u09cd", "+"]
];
Letter_Information.prototype.getSwitchedLetter = function (inputValue) {
    var start = 0;
    for (; start < this.switchedLetter.length; ++start) {
        if (this.switchedLetter[start][0] === inputValue) {
            return this.switchedLetter[start][1];
        }
    }
    return "";
};
/* <summary>
format:  bengali letter, type, follower
Types of letters in bd =
1	= consonant
2	= vowel in kar form
3	= fola
4	= hasanta
5	= zero width non joiner
6	= mandatory end like khanda-ta
7	= vowel in Full form
</summary>
*/
Letter_Information.prototype.letter_info =
[
	["\u200d", 5, ""], ["\u0964", 1, "\u002e"], ["\u0981", 6, ""], ["\u0982", 6, ""], ["\u0983", 6, ""],/*shor-borno*/["\u0985", 7, "\u0985"], ["\u0986", 7, "\u09BE"], ["\u0987", 7, "\u09bf"], ["\u0988", 7, "\u09c0"], ["\u0989", 7, "\u09c1"], ["\u098a", 7, "\u09c2"], ["\u098b", 7, "\u09c3"], ["\u098f", 7, "\u09c7"], ["\u0990", 7, "\u09c8"], ["\u0993", 7, "\u09cb"], ["\u0994", 7, "\u09cc"], /*kobor*/["\u0995", 1, "\u0996"], ["\u0996", 1, ""], ["\u0997", 1, "\u0998"], ["\u0998", 1, ""], ["\u0999", 1, ""], /*cholonto*/["\u099a", 1, "\u099b"], ["\u099b", 1, ""], ["\u099c", 1, "\u099d"], ["\u099d", 1, ""], ["\u099e", 1, ""], /*tonkar*/["\u099f", 1, "\u09a0"], ["\u09a0", 1, ""], ["\u09a1", 1, "\u09a2"], ["\u09a2", 1, ""], ["\u09a3", 3, ""], /*tutul*/["\u09a4", 1, "\u09a5"], ["\u09a5", 1, ""], ["\u09a6", 1, "\u09a7"], ["\u09a7", 1, ""], ["\u09a8", 1, ""], /*paloan*/["\u09aa", 1, "\u09ab"], ["\u09ab", 1, ""], ["\u09ac", 3, "\u09ad"], ["\u09ad", 1, ""], ["\u09ae", 1, ""], ["\u09af", 3, ""], ["\u09b0", 3, "\u09dc"], ["\u09b2", 1, ""], /*shosank*/["\u09b6", 1, ""], ["\u09b7", 1, ""], ["\u09b8", 1, "\u09b6"], ["\u09b9", 1, ""], /*ami-amra*/["\u09be", 2, "\u0986"], ["\u09bf", 2, "\u0987"], ["\u09c0", 2, "\u0988"], ["\u09c1", 2, "\u0989"], ["\u09c2", 2, "\u098a"], ["\u09c3", 2, "\u098b"], ["\u09c7", 2, "\u098f"], ["\u09c8", 2, "\u0990"], ["\u09cb", 2, "\u0993"], ["\u09cc", 2, "\u0994"], ["\u09cd", 4, "\u09cd"], ["\u09ce", 6, ""], ["\u09d7", 2, "\u0988"], ["\u09dc", 1, "\u09dd"], ["\u09dd", 1, ""], ["\u09df", 1, ""], ["\u09f3", 6, "$"], ["\u09f7", 1, "\u002e"], ["\u09fb", 1, ""], ["\u09fc", 1, ""]
];
// <summary>binary search for a follower value</summary>
Letter_Information.prototype.getFollower = function (inputValue, propertyNo) {
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
};