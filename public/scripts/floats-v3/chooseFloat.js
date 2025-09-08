function loadSkin(skin) {
  toggleDisplay('chooseSkin');
  toggleDisplay('chooseFloat');
  
  var chooseFloat = document.querySelector('#chooseFloat');
  if (chooseFloat.childElementCount > 2) {
    chooseFloat.querySelector('.skinLabel').parentElement.remove();
  }

  var item = skinDataBySkin[skin];

  var minFloat = formatFloat(item.minFloat.toString());
  var maxFloat = formatFloat(item.maxFloat.toString());
  var floatText = minFloat + " - " + maxFloat;

  chooseFloat.insertBefore(skinImgWithText(item, false, floatText, false, [{"text":'0', "offset":{'bottom':'25px'}}]), chooseFloat.querySelector('div'));
  
  var floatInput = document.getElementById('floatInput');
  floatInput.placeholder = floatText;
  floatInput.onkeydown = function(e) { return validateNumber(e, this) };
  floatInput.addEventListener('keyup', function() { convertFloat(this); });
  convertFloat(floatInput);
  floatInput.select();
}

function convertFloat(input) {
  if (input.value !== '') {
    document.querySelector('#chooseFloat > div > p:nth-child(3)').innerText = ieee(parseFloat(input.value));
  }
}

document.getElementById('floatInput').addEventListener("keyup", function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    enterFloats();
  }
});