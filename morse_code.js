(function(){
  'use strict';

  const inputTextBox = document.getElementById('input_text');
  const encodeButton = document.getElementById('encode_button');

  function chengeJA_Alpha(char, assimilatedSound) {
    let result = '';
    
    //TODO 引数charが全角カタカナだった場合ひらがなに変換する処理を実装
    //TODO 引数charが半角カタカナだった場合ひらがなに変換する処理を実装

    //TODO 引数をアルファベットに変換する処理を実装
    //TODO? めんどくさそうなのでやるかわからないが，ヘボン式にする処理を実装するかも?
  
    if('あ' <= char && char <= 'お'){  
    } else if ('か' <= char && char <= 'こ') {
      result += 'k';
    }

    /*
    console.log((char.charCodeAt() + 1) / 2 % 5 / 1);
    console.log('あ'.charCodeAt() / 2 % 5 / 1);
    console.log(char.charCodeAt());
    console.log('あ'.charCodeAt());
    */
    //ひらがなのチャーコードめんどくさい
    console.log((char.charCodeAt()) / 2 % 5 / 1 === 'あ'.charCodeAt() / 2 % 5 / 1);
    if(char / 2 % 5 === 'あ' / 2 % 5) {
      result += 'a';
    } else if (char / 2 % 5 === 'い' / 2 % 5) {
      result += 'i';
    } else if (char / 2 % 5 === 'う' / 2 % 5) {
      result += 'u';
    } else if (char / 2 % 5 === 'え' / 2 % 5) {
      result += 'e';
    } else if (char / 2 % 5 === 'お' / 2 % 5) {
      result += 'o';
    }
    //console.log(result);

    return result;
  }
  
  function chengeAlpha_Morse(str) {
    const morse_code = [
      "・－", 
      "－・・・", 
      "－・－・", 
      "－・・", 
      "・", 
      "・・－・", 
      "－－・", 
      "・・・・", 
      "・・", 
      "・－－－", 
      "－・－", 
      "・－・・", 
      "－－", 
      "－・", 
      "－－－", 
      "・－－・", 
      "－－・－", 
      "－・", 
      "・・・", 
      "－", 
      "・・－", 
      "・・・－", 
      "・－－", 
      "－・・－", 
      "－－・・", 
      "－・－－", 
    ]
    let result = '';
    let i;
    for(i = 0; i < str.length; i++) {
      let charCodeNum = str.charCodeAt(i);
      if(charCodeNum >='a'.charCodeAt()) {
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
    for(i = 0; i < inputText.length; i++) {
      //chengeJA_Alpha(inputText.charAt(i), false)
      //console.log(chengeJA_Alpha(inputText.charAt(i), false));
    }
    console.log(chengeAlpha_Morse(inputText));
    

    console.log(inputTextBox.value);
  }

})();