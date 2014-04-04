/*!
 *randomLetterGenerator - Use to random generate letters with english dictionary frequency
 *Copyright (C) <2014>  <Jackson S. L. Lima>
 *
 *This program is free software: you can redistribute it and/or modify
 *it under the terms of the GNU General Public License as published by
 *the Free Software Foundation, either version 3 of the License, or
 *(at your option) any later version.
 *
 *This program is distributed in the hope that it will be useful,
 *but WITHOUT ANY WARRANTY; without even the implied warranty of
 *MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *GNU General Public License for more details.
 *
 *You should have received a copy of the GNU General Public License
 *along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
(function() {
// Use to generate random letters with english dictionary frequency
var randomLetterGenerator = function () {
    "use strict"

    var $public = {},
        $private = {};

    $private.vowelsList = ['A','A','A','A','A','A','A','A','E','E','E','E','E','E','E','E','E','E','E','E','E','I','I','I','I','I','I','I','I','O','O','O','O','O','O','O','O','U','U','U'];
    $private.consonantsList = ['B','C','C','D','D','D','D','F','F','G','G','H','H','H','H','H','H','#','K','L','L','L','L','M','M','N','N','N','N','N','N','P','P','R','R','R','R','R','R','S','S','S','S','S','S','T','T','T','T','T','T','T','T','T','V','W','W','Y','Y','*'];
    $private.vowels_index = 0;
    $private.consonants_index = 0;
    $private.turn_counter = 1;
    $private.pound_array = ['N','C'];
    $private.asterisk_array = ['J', 'X', 'Z', 'Q'];

    $private.shuffle = function shuffle(list) {
        var remain = list.length, temporary, index;

        // While there remain elements to shuffle…
        while (remain) {

            // Pick a remaining element…
            index = Math.floor(Math.random() * remain--);

            // And swap it with the current element.
            temporary = list[remain];
            list[remain] = list[index];
            list[index] = temporary;
        }

        return list;
    };

    $public.initialize = function () {
        $private.vowelsList = $private.shuffle($private.vowelsList);
        $private.consonantsList = $private.shuffle($private.consonantsList);
        $private.vowels_index = 0;
        $private.consonants_index = 0;
        $private.turn_counter = 1;
    };

    $public.getNextLetter = function () {
        var letter,
            consonants_list_length = 60;

        if ($private.turn_counter % 2 == 1) {

            letter = $private.consonantsList[$private.consonants_index];
            if(letter == '#') {
                letter = $private.pound_array[ Math.floor(Math.random() * 2) ];
            } else if(letter == '*') {
                letter = $private.asterisk_array[ Math.floor(Math.random() * 5) ];
            }
            
            $private.consonants_index++;
            if($private.consonants_index >= consonants_list_length) {
                $public.initialize();
            }

        } else {
            letter = $private.vowelsList[$private.vowels_index];
            $private.vowels_index++;
        }

        $private.turn_counter++;
        if($private.turn_counter > 5) {
            $private.turn_counter = 1;
        }

        return letter;

    };

    return $public;

}();

this['randomLetterGenerator'] = randomLetterGenerator;
this['randomLetterGenerator']['initialize'] = randomLetterGenerator.initialize;
this['randomLetterGenerator']['getNextLetter'] = randomLetterGenerator.getNextLetter;

})();

// TEST
randomLetterGenerator.initialize();

var list = [];
for(var index=0; index<200; index++) {
    list.push(randomLetterGenerator.getNextLetter());
}
console.log(JSON.stringify(list));