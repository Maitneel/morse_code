(function () {
  'use strict';

  const inputTextBox = document.getElementById('input_text');
  const encodeButton = document.getElementById('encode_button');

  function chengeJA_Alpha(str) {
    let result = '';

    //TODO 引数charが全角カタカナだった場合ひらがなに変換する処理を実装
    //TODO 引数charが半角カタカナだった場合ひらがなに変換する処理を実装
    //TODO 引数をアルファベットに変換する処理を実装
    //TODO? めんどくさそうなのでやるかわからないが，ヘボン式にする処理を実装するかも?

    const roman_alphabet = [
      //ぁあぃいぅうぇえぉお
      'xa', 'a', 'xi', 'i', 'xu', 'u', 'xe', 'e', 'xo', 'o',
      //かがきぎくぐけげこご
     'ka', 'ga', 'ki', 'gi', 'ku', 'gu', 'ke', 'ge', 'ko', 'go',
      //さざしじすずせぜそぞ
      'sa', 'za', 'shi', 'ji', 'su', 'zu', 'se', 'ze', 'so', 'zo',
      //ただちぢっつづてでとど
      'ta', 'da', 'chi', 'ji', 'tt', 'tsu', 'zu', 'te', 'de', 'to', 'do',
      //なにぬねの
      'na', 'ni', 'nu', 'ne', 'no',
      //はばぱひびぴふぶぷへべぺほぼぽ
      'ha', 'ba', 'pa', 'hi', 'bi', 'pi', 'fu', 'bu', 'pu', 'he', 'be', 'pe', 'ho', 'bo', 'po',
      //まみむめも
    'ma', 'mi', 'mu', 'me', 'mo',
      //ゃやゅゆょよ
      'xya', 'ya', 'xyu', 'yu', 'xyo', 'yo',
      //らりるれろ
      'ra', 'ri', 'ru', 're', 'ro',
      //ゎわゐゑを
      'xwa', 'wa', 'i', 'e', 'o',
      //んゔゕゖ
      'n', 'vu', 'xka', 'xke'
    ]







    return result;
  }

  function chengeAlpha_Morse(str) {
    const morse_code = [
      //ABCDEFG
      "・－", "－・・・", "－・－・", "－・・", "・", "・・－・", "－－・",
      //HIJKLMN
      "・・・・", "・・", "・－－－", "－・－", "・－・・", "－－", "－・",
      //OPQRSTU
      "－－－", "・－－・", "－－・－", "－・", "・・・", "－", "・・－",
      //VWXYZ
      "・・・－", "・－－", "－・・－", "－－・・", "－・－－"
    ]

    
    let result = '';
    let i;
    for (i = 0; i < str.length; i++) {
      let charCodeNum = str.charCodeAt(i);
      if (charCodeNum >= 'a'.charCodeAt()) {
        charCodeNum -= 'a'.charCodeAt() - 'A'.charCodeAt();
      }
      result += morse_code[charCodeNum - 'A'.charCodeAt()];
      result += ' ';
    }
    return result;
  }



  encodeButton.onclick = () => {
    let inputText = inputTextBox.value;
    let chengeCharJA_alpha;

    let i;
    for (i = 0; i < inputText.length; i++) {
      //chengeJA_Alpha(inputText.charAt(i), false)
      //console.log(chengeJA_Alpha(inputText.charAt(i), false));
    }
    console.log(chengeAlpha_Morse(inputText));


    console.log(inputTextBox.value);
  }

})();