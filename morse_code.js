(function () {
  'use strict';

  const inputTextBox = document.getElementById('input_text');
  const encodeButton = document.getElementById('encode_button');
  const resultDivided = document.getElementById('result-area');
  const morseOption = document.getElementById('select-option');

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
    const consonant = ['', 'k', 's', 't', 'n', 'h', 'm', 'y', 'r', 'w', 'g', 'z', 'd', '', 'b', 'p'];
    const vowel = ['a', 'i', 'u', 'e', 'o'];
    const vowel_y = ['a', 'u', 'o'];
    let result = '';

    if (!(charNum < 10)) {
      charNum -= 10;
      if (charNum > 37 && charNum < 45) {
        charNum += 2;
      }

      //TODO 濁点，半濁点についての実装
      //TODO ヘボン式が違う時の処理を実装
      //実装する必要がある文字
      //しちつふ

      if(charNum == 11) {
        result += 'shi';
      } else if (charNum == 16) {
        result += 'chi';
      } else if (charNum == 17) {
        result += 'thu'; 
      } else if (charNum == 27) {
        result += 'fu';
      } 

        else {
        result += consonant[Math.floor(charNum / 5)];
        if (Math.floor(charNum / 5) === 7) {
          result += vowel_y[charNum % 5];
        } else {
          result += vowel[charNum % 5];
        }
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


  //TODO 拗音の変換の実装

  function chengeYouon_alpha(charNum, youonCharNum) {
    const youonConsonant = ['', 'ky', 'sy', 'ch', 'ny', 'hy', 'my', '', 'ry', '', 'gy', 'j', '', '', 'by', 'py'];
    const vowel = ['a', 'i', 'u', 'e', 'o'];
    const vowel_y = ['a', 'u', 'o'];
    let result = '';

    result += youonConsonant[Math.floor(charNum / 5)];
    result += vowel_y[youonCharNum];
    console.log(charNum + ' ' + youonCharNum);
    console.log('chengeYouon_alpha = ' + result);
    return result;
  }

  function chengeYouon_alpha_hira_kata(char, youonChar) {
    let result = '';
    if(char == 'chi') {
      result += 'ch' + youonChar.charAt(2);
    } else if (char == 'ji') {
      result += 'j' + youonChar.charAt(2);
    } else {
      result += char.charAt(0) + 'y' + youonChar.charAt(2);
    }
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

    for (i = 0; i < str.length; i++) {
      let charCodeNum = str.charCodeAt(i);


      if ('ァ'.charCodeAt() <= charCodeNum && charCodeNum <= 'ヶ'.charCodeAt()) {
        charCodeNum -= 'ァ'.charCodeAt() - 'ぁ'.charCodeAt();
      }

      if (charCodeNum === 'っ'.charCodeAt() || charCodeNum === 'ｯ'.charCodeAt()) {
        i++;
        charCodeNum = str.charCodeAt(i);
        if ('ァ'.charCodeAt() <= charCodeNum && charCodeNum <= 'ヶ'.charCodeAt()) {
          charCodeNum -= 'ァ'.charCodeAt() - 'ぁ'.charCodeAt();
        }
        if(i !== str.length && 'ｧ'.charCodeAt() <= charCodeNum && charCodeNum <= 'ﾟ'.charCodeAt()) {
          if(str.charAt(i + 1) == 'ﾞ') {
            charCodeNum += 5 * 9;
            i++;
          } else if (str.charAt(i + 1) == 'ﾟ') {
            charCodeNum += 5 * (9 + 1);
            i++;
          }
          console.log('charCodeNum = ' + charCodeNum);
          charCodeNum -= 'ｧ'.charCodeAt();
          let return_alpha = half_of_charJA(charCodeNum);
          if(return_alpha.length !== 1) {
            result += return_alpha.charAt(0);
            result += return_alpha;
            charCodeNum += 'ｧ'.charCodeAt();
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
      
      let nextCharCodeNum = str.charCodeAt(i + 1);
      



      if (charCodeNum === ' '.charCodeAt() || charCodeNum === '　'.charCodeAt()) {
        result += ' ';
      } else if ('A'.charCodeAt() <= charCodeNum && charCodeNum <= 'z'.charCodeAt()) {
        result += str.charAt(i);
        console.log('charNum = ' + charCodeNum + ' ' + i);
      } else if ('ぁ'.charCodeAt() <= charCodeNum && charCodeNum <= 'ゖ'.charCodeAt()) {
        let nextChar = str.charAt(i + 1).charCodeAt();
        if ('ァ'.charCodeAt() <= nextChar && nextChar <= 'ヶ'.charCodeAt()) {
          nextChar -= 'ァ'.charCodeAt() - 'ぁ'.charCodeAt();
        }
        if(nextChar == 'ゃ'.charCodeAt() || nextChar == 'ゅ'.charCodeAt() || nextChar == 'ょ'.charCodeAt()) {
          result += chengeYouon_alpha_hira_kata(roman_alphabet[charCodeNum - 'ぁ'.charCodeAt()], roman_alphabet[nextChar - 'ぁ'.charCodeAt()]);
          i++;
        } else {
          result += roman_alphabet[charCodeNum - 'ぁ'.charCodeAt()];
        }
        
      } else if ('ｧ'.charCodeAt() <= charCodeNum && charCodeNum <= 'ﾟ'.charCodeAt()) {
        charCodeNum -= 'ｧ'.charCodeAt();
        //TODO 半角カタカナのときの処理を実装(関数化してその関数を呼び出すのが良いと思う。)
        if(str.charAt(i + 1 ) == 'ﾞ') {
          charCodeNum += 5 * 9;
          i++;
        } else if (str.charAt(i + 1) == 'ﾟ') {
          console.log('sec8 = ' + result);
          charCodeNum += 5 * (9 + 1);
          i++;
        }
        let nextCharCodeNum = str.charCodeAt(i + 1);
        console.log(charCodeNum + ' ' + nextCharCodeNum + ' flag');
        if(nextCharCodeNum == 'ｬ'.charCodeAt() || nextCharCodeNum =='ｭ'.charCodeAt() || nextCharCodeNum =='ｮ'.charCodeAt()) {
          result += chengeYouon_alpha(charCodeNum - 10, nextCharCodeNum - 'ｬ'.charCodeAt());
          i++;
        } else {
          result += half_of_charJA(charCodeNum);
        }
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
    }

    return result;
  }

  function changeJA_morse(str) {
    const japanese_morse = [
      //あ行
      'ーー・ーー', '・ー ', '・・ー', 'ー・ーーー', '・ー・・・',
      //か行
      '・ー・', 'ー・ー・・', '・・・ー', 'ー・ーー', 'ーーーー', 
      //さ行
      'ー・ー・ー', 'ーー・ー・', 'ーーー・ー', '・ーーー・', 'ーーー', 
      //た行
      'ー', '・・ー', '・ーー', '・ー・ーー', '・・ー・', 
      //な行
      '・ー', 'ー・ー', '・・・', 'ーー・', '・・ーー', 
      //は行
      'ー・・', 'ーー・・ー', 'ーー・・', '・', 'ー・', 
      //ま行
      'ー・・ー', '・・ー・ー', 'ー', 'ー・・・ー', 'ー・・ー・', 
      //や行
      '・ーー', 'ー', 'ー・・ーー', 
      //ら行
      '・・', 'ーー', 'ー・ーー', 'ーー', '・ー・', 
      //わ行+ん
      'ー・', '・ー・・ー', '・ーー・・', '・ーー', '・ー・ー・', 
      //濁点，半濁点
      '・・', '・・ーー・'
    ];

    let result = '';
    console.log(result);

    let i;
    for(i = 0; i < str.length; i++) {
      
      let charCodeNum = str.charCodeAt(i);

      if('ｧ'.charCodeAt() <= charCodeNum && charCodeNum <= 'ﾟ'.charCodeAt()) {
        charCodeNum -= 'ｧ'.charCodeAt();
        if (charCodeNum < 10) {
          //TODO 処理を実装
        }
        charCodeNum -= 10;
        result += japanese_morse[charCodeNum];
        if (i != str.length - 1) {
          result += '　'
        }
      }




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
    let morseOptionValue = morseOption.value;
    let chengeCharJA_alpha;


    let result = null;
    if (morseOptionValue == 'european') {
      
      //console.log(chengeAlpha_Morse(chengeJA_Alpha(inputText)));
      console.log(inputText);
      result = chengeAlpha_Morse(chengeJA_Alpha(inputText));
  
  
      
      //console.log(chengeJA_Alpha(inputText));
    } else if (morseOptionValue == 'japnese') {
      //TODO 和文のモールス信号のしょりを実装
      result = changeJA_morse(inputText);
    }
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '変換結果';
    resultDivided.appendChild(header);


    const paragraph = document.createElement('p');
    paragraph.innerText = inputText + ' をモールス信号に変換すると " ' + result + ' " です。'
    resultDivided.appendChild(paragraph);
    
    

  }

  inputTextBox.onkeydown = (event) => {
    if (event.keyCode === 13) {
      encodeButton.onclick();
    }
  }

})();