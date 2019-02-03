(function () {
  'use strict';

  const inputTextBox = document.getElementById('input_text');
  const encodeButton = document.getElementById('encode_button');

  function half_of_charJA (charNum) {
    const consonant = ['', 'k', 's', 't', 'n', 'h', 'm', 'y', 'r', 'w'];
    const vowel = ['a', 'i', 'u', 'e', 'o'];
    const vowel_y = ['a', 'u', 'o'];
    let result = '';

    if(!(charNum < 10)) {
      charNum -= 10;
      if(charNum > 37) {
        charNum += 2;
      }


      result += consonant[Math.floor(charNum / 5)];
      if(Math.floor(charNum / 5) === 7) {
        result += vowel_y[charNum % 5];
      } else {
        result += vowel[charNum % 5];
      }
    } else {
      if(charNum < 5) {
        result += 'x' + vowel[charNum % 5];
      } else if(charNum < 8) {
        result += 'xy' + vowel_y[charNum % 5];
      } else if(charNum === 8) {
        result += 'tt';
      }
    }
    console.log("result =" + result);
    return result;
  }

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
    ];
    


    let i;
    for(i = 0; i < str.length; i++) {
      let charCodeNum = str.charCodeAt(i);
      if(charCodeNum === ' '.charCodeAt() ||charCodeNum === '　'.charCodeAt()) {
        result += ' ';
      } else if('A'.charCodeAt() <= charCodeNum && charCodeNum <= 'z'.charCodeAt()) {
        result += str.charAt(i);
      } else if('ァ'.charCodeAt() <= charCodeNum && charCodeNum <= 'ヶ'.charCodeAt()) {
        charCodeNum -= 'ァ'.charCodeAt() - 'ぁ'.charCodeAt();
        result += roman_alphabet[charCodeNum - 'ぁ'.charCodeAt()];
      } else if('ぁ'.charCodeAt() <= charCodeNum && charCodeNum <= 'ゖ'.charCodeAt()) {
        result += roman_alphabet[charCodeNum - 'ぁ'.charCodeAt()];
      } else if('ｧ'.charCodeAt() <= charCodeNum && charCodeNum <= 'ﾟ'.charCodeAt()) {
        charCodeNum -= 'ｧ'.charCodeAt();
        //TODO 半角カタカナのときの処理を実装(関数化してその関数を呼び出すのが良いと思う。)
        console.log(charCodeNum);
        result += half_of_charJA(charCodeNum);
      } else {
        //TODO エラーしたことを示す何かを実装する
        console.log('error');
        console.log(charCodeNum);
        
      }
    }
    console.log(result);

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
    ];

    
    let result = '';
    let i;
    for (i = 0; i < str.length; i++) {
      let charCodeNum = str.charCodeAt(i);
      if(charCodeNum === ' '.charCodeAt() || charCodeNum === '　'.charCodeAt()) {
        result += '　　　';
      } else {
        if (charCodeNum >= 'a'.charCodeAt()) {
          charCodeNum -= 'a'.charCodeAt() - 'A'.charCodeAt();
        }
        result += morse_code[charCodeNum - 'A'.charCodeAt()];
        result += '　';
      }
      console.log(str.charAt(i));
    }
    
    return result;
  }



  encodeButton.onclick = () => {
    let inputText = inputTextBox.value;
    let chengeCharJA_alpha;

    console.log(chengeAlpha_Morse(chengeJA_Alpha(inputText)));
    console.log(inputText);



    let i;
    for (i = 0; i < inputText.length; i++) {
      //chengeJA_Alpha(inputText.charAt(i), false)
      //console.log(chengeJA_Alpha(inputText.charAt(i), false));
    }
    //console.log(chengeAlpha_Morse(inputText));


    //console.log(inputTextBox.value);
  }

  inputTextBox.onkeydown = (event) => {
    if(event.keyCode === 13) {
      encodeButton.onclick();
    }
  }

})();