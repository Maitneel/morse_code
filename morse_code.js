(function(){
  'use strict';

  const inputTextBox = document.getElementById('input_text');
  const encodeButton = document.getElementById('encode_button');
  
  encodeButton.onclick = () => {
    alert(inputTextBox.value);
    console.log(inputTextBox.value);
  }


  alert("test");
})();