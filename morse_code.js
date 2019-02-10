(function () {
  'use strict';

  const inputTextBox = document.getElementById('input_text');
  const encodeButton = document.getElementById('encode_button');
  const morseOption = document.getElementById('select-option');
  const resultDivided = document.getElementById('result-area');
  const resultHeader = document.getElementById('header');
  const resultContents = document.getElementById('contents');

  function is_consonant(char) {
    if (char == 'a' || char == 'i' || char == 'u' || char == 'e' || char == 'o') {
      return false;
    } else {
      return true;
    }
  }

  function output(tag, format, output_message) {
    const format_tag = document.createElement(format);
    format_tag.innerText = output_message;
    tag.appendChild(format_tag);
    return 0;
  }

  function output_error_message(error_char) {
    removeAllChildren(resultHeader);
    output(resultHeader, 'h3', 'エラー');
    output(resultContents, 'p', '"' + error_char + '"は変換できません。');
    return 0;
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

      if (charNum == 11) {
        result += 'shi';
      } else if (charNum == 16) {
        result += 'chi';
      } else if (charNum == 17) {
        result += 'thu';
      } else if (charNum == 27) {
        result += 'fu';
      } else {
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

  function chengeYouon_alpha(charNum, youonCharNum) {
    const youonConsonant = ['', 'ky', 'sy', 'ch', 'ny', 'hy', 'my', '', 'ry', '', 'gy', 'j', '', '', 'by', 'py'];
    const vowel_y = ['a', 'u', 'o'];
    let result = '';

    result += youonConsonant[Math.floor(charNum / 5)];
    result += vowel_y[youonCharNum];
    return result;
  }

  function chengeYouon_alpha_hira_kata(char, youonChar) {
    let result = '';
    if (char == 'chi') {
      result += 'ch' + youonChar.charAt(2);
    } else if (char == 'ji') {
      result += 'j' + youonChar.charAt(2);
    } else {
      result += char.charAt(0) + 'y' + youonChar.charAt(2);
    }
    return result;
  }

  function chengeJA_Alpha(str) {
    let can_chenge = true;
    let result = '';

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
        if (i !== str.length && 'ｧ'.charCodeAt() <= charCodeNum && charCodeNum <= 'ﾟ'.charCodeAt()) {
          if (str.charAt(i + 1) == 'ﾞ') {
            charCodeNum += 5 * 9;
            i++;
          } else if (str.charAt(i + 1) == 'ﾟ') {
            charCodeNum += 5 * (9 + 1);
            i++;
          }
          charCodeNum -= 'ｧ'.charCodeAt();
          let return_alpha = half_of_charJA(charCodeNum);
          if (return_alpha.length !== 1) {
            result += return_alpha.charAt(0);
            result += return_alpha;
            charCodeNum += 'ｧ'.charCodeAt();
          } else {
            result += 'xtu';
          }

        } else if (i !== str.length && is_consonant(roman_alphabet[charCodeNum - 'ぁ'.charCodeAt()].charAt())) {
          result += roman_alphabet[charCodeNum - 'ぁ'.charCodeAt()].charAt();
          console.log(roman_alphabet[charCodeNum - 'ぁ'.charCodeAt()].charAt());
        } else {
          result += 'xtu';
          if (i === str.length) {
            break;
          }
        }
      }

      if (charCodeNum === ' '.charCodeAt() || charCodeNum === '　'.charCodeAt()) {
        result += ' ';
      } else if ('A'.charCodeAt() <= charCodeNum && charCodeNum <= 'z'.charCodeAt()) {
        result += str.charAt(i);
      } else if ('ぁ'.charCodeAt() <= charCodeNum && charCodeNum <= 'ゖ'.charCodeAt()) {
        let nextChar = str.charAt(i + 1).charCodeAt();
        if ('ァ'.charCodeAt() <= nextChar && nextChar <= 'ヶ'.charCodeAt()) {
          nextChar -= 'ァ'.charCodeAt() - 'ぁ'.charCodeAt();
        }
        if (nextChar == 'ゃ'.charCodeAt() || nextChar == 'ゅ'.charCodeAt() || nextChar == 'ょ'.charCodeAt()) {
          result += chengeYouon_alpha_hira_kata(roman_alphabet[charCodeNum - 'ぁ'.charCodeAt()], roman_alphabet[nextChar - 'ぁ'.charCodeAt()]);
          i++;
        } else {
          result += roman_alphabet[charCodeNum - 'ぁ'.charCodeAt()];
        }

      } else if ('ｧ'.charCodeAt() <= charCodeNum && charCodeNum <= 'ﾟ'.charCodeAt()) {
        charCodeNum -= 'ｧ'.charCodeAt();
        if (str.charAt(i + 1) == 'ﾞ') {
          charCodeNum += 5 * 9;
          i++;
        } else if (str.charAt(i + 1) == 'ﾟ') {
          charCodeNum += 5 * (9 + 1);
          i++;
        }
        let nextCharCodeNum = str.charCodeAt(i + 1);
        if (nextCharCodeNum == 'ｬ'.charCodeAt() || nextCharCodeNum == 'ｭ'.charCodeAt() || nextCharCodeNum == 'ｮ'.charCodeAt()) {
          result += chengeYouon_alpha(charCodeNum - 10, nextCharCodeNum - 'ｬ'.charCodeAt());
          i++;
        } else {
          result += half_of_charJA(charCodeNum);
        }
      } else {
        output_error_message(str.charAt(i));
        can_chenge = false;
      }
    }

    if(can_chenge) {
      return result;
    } else {
      return false;
    }
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

  function chengeFull_half(charNum) {
    charNum -= 'ぁ'.charCodeAt();
    const full_half = [
      //あ行
      'ｧ', 'ｱ', 'ｨ', 'ｲ', 'ｩ', 'ｳ', 'ｪ', 'ｴ', 'ｫ', 'ｵ',
      //か行
      'ｶ', 'ｶﾞ', 'ｷ', 'ｷﾞ', 'ｸ', 'ｹﾞ', 'ｹ', 'ｹﾞ', 'ｺ', 'ｺﾞ',
      //さ行
      'ｻ', 'ｻﾞ', 'ｼ', 'ｼﾞ', 'ｽ', 'ｽﾞ', 'ｾ', 'ｾﾞ', 'ｿ', 'ｿﾞ',
      //た行
      'ﾀ', 'ﾀﾞ', 'ﾁ', 'ﾁﾞ', 'ｯ', 'ﾂ', 'ﾂﾞ', 'ﾃ', 'ﾃﾞ', 'ﾄ', 'ﾄﾞ',
      //な行
      'ﾅ', 'ﾆ', 'ﾇ', 'ﾈ', 'ﾉ',
      //は行
      'ﾊ', 'ﾊﾞ', 'ﾊﾟ', 'ﾋ', 'ﾋﾞ', 'ﾋﾟ', 'ﾌ', 'ﾌﾞ', 'ﾌﾟ', 'ﾍ', 'ﾍﾞ', 'ﾍﾟ', 'ﾎ', 'ﾎﾞ', 'ﾎﾟ',
      //ま行
      'ﾏ', 'ﾐ', 'ﾑ', 'ﾒ', 'ﾓ',
      //や行
      'ｬ', 'ﾔ', 'ｭ', 'ﾕ', 'ｮ', 'ﾖ',
      //ら行
      'ﾗ', 'ﾘ', 'ﾙ', 'ﾚ', 'ﾛ',
      //わ行
      'ヮ', 'ﾜ', 'ｲ', 'ｴ', 'ｦ', 'ﾝ'
    ]


    return full_half[charNum];


  }

  
  function changeHalfKata_morse(char) {
    const japanese_morse = [
      //あ行
      'ーー・ーー', '・ー ', '・・ー', 'ー・ーーー', '・ー・・・',
      //か行
      '・ー・・', 'ー・ー・・', '・・・ー', 'ー・ーー', 'ーーーー',
      //さ行
      'ー・ー・ー', 'ーー・ー・', 'ーーー・ー', '・ーーー・', 'ーーー・',
      //た行
      'ー・', '・・ー・', '・ーー・', '・ー・ーー', '・・ー・・',
      //な行
      '・ー・', 'ー・ー・', '・・・・', 'ーー・ー', '・・ーー',
      //は行
      'ー・・・', 'ーー・・ー', 'ーー・・', '・', 'ー・・',
      //ま行
      'ー・・ー', '・・ー・ー', 'ー', 'ー・・・ー', 'ー・・ー・',
      //や行
      '・ーー', 'ー・・ーー', 'ーー',
      //ら行
      '・・・', 'ーー・', 'ー・ーー・', 'ーーー', '・ー・ー',
      //わ,を,ん
      'ー・ー', /*'・ーーー',*/ '・ー・ー・',
      //濁点，半濁点，長音
      '・・', '・・ーー・', '・ーー・ー'
    ];

    let result = '';
    let charCodeNum = char.charCodeAt() - 'ｧ'.charCodeAt();

    if (charCodeNum < 10) {
      if (charCodeNum < 5) {
        charCodeNum += 10;
      } else if (charCodeNum < 8) {
        charCodeNum += 40;
      } else if (charCodeNum == 8) {
        charCodeNum += 19;
      } else if (charCodeNum == 9) {
        charCodeNum += 48;
      }
    }
    charCodeNum -= 10;
    result += japanese_morse[charCodeNum];

    return result;

  }

  function changeJA_morse(str) {
    let result = '';
    let can_chenge = true;

    let i;
    for (i = 0; i < str.length; i++) {
      let charCodeNum = str.charCodeAt(i);
      let charCode = str.charAt(i);

      if (charCodeNum == 'ｦ'.charCodeAt() || charCodeNum == 'ヲ'.charCodeAt() || 'を'.charCodeAt()) {
        result += '・ーーー'; 
      } else if ('ｧ'.charCodeAt() <= charCodeNum && charCodeNum <= 'ﾟ'.charCodeAt()) {
        result += changeHalfKata_morse(charCode);
      } else if ('ぁ'.charCodeAt() <= charCodeNum && charCodeNum <= 'ん'.charCodeAt()) {
        result += changeHalfKata_morse(chengeFull_half(charCodeNum));
      } else if ('ァ'.charCodeAt() <= charCodeNum && charCodeNum <= 'ン'.charCodeAt()) {
        charCodeNum -= 'ァ'.charCodeAt() - 'ぁ'.charCodeAt();
        result += changeHalfKata_morse(chengeFull_half(charCodeNum));
      } else {
        output_error_message(str.charAt(i));
        can_chenge = false;
      }
      if (i != str.length - 1) {
        result += '　'
      }
    }

    if(can_chenge) {
      return result;
    } else {
      return false;
    
    }
  }

  function removeAllChildren(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  encodeButton.onclick = () => {
    let inputText = inputTextBox.value;
    let morseOptionValue = morseOption.value;

    if (inputText.length == 0) {
      return 0;
    }

    removeAllChildren(resultHeader);
    removeAllChildren(resultContents);

    let result = '';
    if (morseOptionValue == 'european') {
      result = chengeAlpha_Morse(chengeJA_Alpha(inputText));
    } else if (morseOptionValue == 'japnese') {
      result = changeJA_morse(inputText);
    }
    if (!result) {
      return 0;
    }

    output(resultHeader, 'h3', '変換結果');
    output(resultContents, 'p', inputText + ' をモールス信号に変換すると " ' + result + ' " です。');
  }

  inputTextBox.onkeydown = (event) => {
    if (event.keyCode === 13) {
      encodeButton.onclick();
    }
  }

})();