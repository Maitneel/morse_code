(function() {
  'use strict';
  
    let i;
    for(i = 'ぁ'.charCodeAt(); i <= 'ん'.charCodeAt() + 30; i++) {
      let str = '';
      console.log(String.fromCharCode(i, i + 'ア'.charCodeAt() - 'あ'.charCodeAt()));
    }

    for(i = 'ｧ'.charCodeAt(); i <= 'ﾝ'.charCodeAt() + 10 ; i++) {
      console.log(String.fromCharCode(i))
    }
})();