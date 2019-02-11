(function(){
  'use strict';
  let i;
  for(i = 'ぁ'.charCodeAt(); i <= 'ん'.charCodeAt(); i++) {
    console.log(String.fromCharCode(i));
  }  


  console.log();
  console.log();

  for(i = 'ァ'.charCodeAt(); i <= 'ン'.charCodeAt(); i++) {
    console.log(String.fromCharCode(i));
  }  

  console.log();
  console.log();

  for(i = 'ｦ'.charCodeAt(); i <= 'ﾝ'.charCodeAt(); i++) {
    console.log(String.fromCharCode(i));
  } 
  console.log('ｶﾞ');
  console.log('ﾊﾟ');

})();