(function () {
  'use strict';

  const inputTextBox = document.getElementById('input_text');
  const encodeButton = document.getElementById('encode_button');
  const resultDivided = document.getElementById('result-area');

  function is_consonant(char) {
    if (char == 'a' || char == 'i' || char == 'u' || char == 'e' || char == 'o') {
      return false;
    } else {
      return true;
    }
  }

  function is_vowe(char) {
    return (!is_consonant(char));
  }


  function half_of_charJA(charNum) {
    const consonant = ['', 'k', 's', 't', 'n', 'h', 'm', 'y', 'r', 'w'];
    const vowel = ['a', 'i', 'u', 'e', 'o'];
    const vowel_y = ['a', 'u', 'o'];
    let result = '';

    if (!(charNum < 10)) {
      charNum -= 10;
      if (charNum > 37) {
        charNum += 2;
      }

      //TODO ヘボン式が違う時の処理を実装
      result += consonant[Math.floor(charNum / 5)];
      if (Math.floor(charNum / 5) === 7) {
        result += vowel_y[charNum % 5];
      } else {
        result += vowel[charNum % 5];
      }
    } else {
      if (charNum < 5) {
        result += 'x' + vowel[charNum % 5];
      } else if (charNum < 8) {
        result += 'xy' + vowel_y[charNum % 5];
      } else if (charNum === 8) {
        result += 'xtu';
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
      'ta', 'da', 'chi', 'ji', '*', 'tsu', 'zu', 'te', 'de', 'to', 'do',
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
    /*
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
    */

    for (i = 0; i < str.length; i++) {
      let charCodeNum = str.charCodeAt(i);

      if ('ァ'.charCodeAt() <= charCodeNum && charCodeNum <= 'ヶ'.charCodeAt()) {
        charCodeNum -= 'ァ'.charCodeAt() - 'ぁ'.charCodeAt();
      }
      console.log(charCodeNum + ' ' + 'ｯ'.charCodeAt());
      if (charCodeNum === 'っ'.charCodeAt() || charCodeNum === 'ｯ'.charCodeAt()) {
        i++;
        charCodeNum = str.charCodeAt(i);
        if ('ァ'.charCodeAt() <= charCodeNum && charCodeNum <= 'ヶ'.charCodeAt()) {
          charCodeNum -= 'ァ'.charCodeAt() - 'ぁ'.charCodeAt();
        }
        console.log();
        console.log(i !== str.length + ' ' + 'ｧ'.charCodeAt() <= charCodeNum && charCodeNum <= 'ﾟ'.charCodeAt())
        console.log()
        if(i !== str.length && 'ｧ'.charCodeAt() <= charCodeNum && charCodeNum <= 'ﾟ'.charCodeAt()) {
          charCodeNum -= 'ｧ'.charCodeAt();
          let return_alpha = half_of_charJA(charCodeNum);
          if(return_alpha.length !== 1) {
            result += return_alpha.charAt(0);
            result += return_alpha;
          } else {
            result += 'xtu';
          }
        } else if(i !== str.length && is_consonant(roman_alphabet[charCodeNum - 'ぁ'.charCodeAt()].charAt())) {
          result += roman_alphabet[charCodeNum - 'ぁ'.charCodeAt()].charAt();
          console.log(roman_alphabet[charCodeNum - 'ぁ'.charCodeAt()].charAt());
        } else {
          result += 'xtu';
          if(i === str.length) {
            break;
          }
        }
      }

      if (charCodeNum === ' '.charCodeAt() || charCodeNum === '　'.charCodeAt()) {
        result += ' ';
      } else if ('A'.charCodeAt() <= charCodeNum && charCodeNum <= 'z'.charCodeAt()) {
        result += str.charAt(i);
      } else if ('ぁ'.charCodeAt() <= charCodeNum && charCodeNum <= 'ゖ'.charCodeAt()) {
        result += roman_alphabet[charCodeNum - 'ぁ'.charCodeAt()];
      } else if ('ｧ'.charCodeAt() <= charCodeNum && charCodeNum <= 'ﾟ'.charCodeAt()) {
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
    /*
        //TODO っ の処理を実装
        for(i = 0; i < result.length; i++) {
          if(result.charAt(i) == '*') {
            if(is_consonant(result.charAt(i + 1))) {
              let temp = result.charAt(i + 1);
              result.charAt(i) = temp;
            } else {
              //TODO 一文字後が子音じゃなかった時の処理を実装
            }
          }
        }
    
    */


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
      if (charCodeNum === ' '.charCodeAt() || charCodeNum === '　'.charCodeAt()) {
        result += '　　　';
      } else {
        if (charCodeNum >= 'a'.charCodeAt()) {
          charCodeNum -= 'a'.charCodeAt() - 'A'.charCodeAt();
        }
        result += morse_code[charCodeNum - 'A'.charCodeAt()];
        if (!(i === str.length - 1)) {
          result += '　';
        }
      }
      console.log(str.charAt(i));
    }

    return result;
  }


  function removeAllChildren(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  encodeButton.onclick = () => {
    let inputText = inputTextBox.value;
    let chengeCharJA_alpha;

    console.log(chengeAlpha_Morse(chengeJA_Alpha(inputText)));
    console.log(inputText);


    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '変換結果';
    resultDivided.appendChild(header);


    const paragraph = document.createElement('p');
    const result = chengeAlpha_Morse(chengeJA_Alpha(inputText));
    paragraph.innerText = inputText + ' をモールス信号に変換すると " ' + result + ' " です。'
    resultDivided.appendChild(paragraph);


  }

  inputTextBox.onkeydown = (event) => {
    if (event.keyCode === 13) {
      encodeButton.onclick();
    }
  }

})();