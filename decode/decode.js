(function () {
  'use strict';

  const inputTextBox = document.getElementById('input_text');
  const decodeButton = document.getElementById('decode');

  decodeButton.onclick = () => {
    let inputText = inputTextBox.value;
    console.log(inputText);
  }

  inputTextBox.onkeydown = (event) => {
    if (event.keyCode == 13) {
      decodeButton.onclick()
    }
  }
})();