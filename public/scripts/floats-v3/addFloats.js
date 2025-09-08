function enterFloats() {
  var float = document.getElementById('floatInput').value;
  if (float == '') return;

  toggleDisplay('chooseFloat');
  toggleDisplay('addFloats');

  var skin = skinDataBySkin[document.querySelector('#chooseFloat > div > img').getAttribute('data-skin')];
  var neededAvg = formatFloat(ieee(ieee(ieee(float)-ieee(skin.minFloat))/ieee(ieee(skin.maxFloat)-ieee(skin.minFloat)))).substring(0, 6);
  var formattedFloat = formatFloat(ieee(parseFloat(float)))

  var addFloats = document.getElementById('addFloats');
  if (addFloats.querySelectorAll('div').length > 1) addFloats.querySelector('div').remove();
  addFloats.insertBefore(skinImgWithText(skin, false, formattedFloat), addFloats.querySelector('button'));

  var floatInputs = document.querySelector('#floatInputs');
  if (floatInputs.childElementCount === 0) {
    var inp = createEl('input', ['floatInput'], false, {'placeholder':`Needed average: ${neededAvg}`, 'type':'number', 'onkeyup':()=>{addFloatInput()}});
    inp.onkeydown = function(e) { return validateNumber(e, this) };
    document.getElementById('floatInputs').appendChild(inp);
  } else {
    for (var inp of document.querySelectorAll('.floatInput')) {
      inp.placeholder = `Needed average: ${neededAvg}`;
    }
  }
  document.querySelector('.floatInput').select();
}

function addFloatInput() {
  var floatInputs = document.getElementsByClassName('floatInput');
  var lastInput = floatInputs[floatInputs.length - 1];

  if (!isNaN(parseFloat(lastInput.value))) {
    if (floatInputs.length === 10) {
      document.querySelector('#addFloats > button').style.display = 'flex';
    }
    var inp = createEl('input', ['floatInput'], false, {'placeholder':lastInput.placeholder, 'type':'number', 'onkeyup':()=>{addFloatInput()}});
    inp.onkeydown = function(e) { return validateNumber(e, this) };
    inp.addEventListener("keyup", function(e) {
      if (e.key === 'Enter') {
        if (this.nextElementSibling !== null) {
          this.nextElementSibling.select();
        } else {
          e.preventDefault();
          generateCombinations();
        }
      }
    });
    document.getElementById('floatInputs').appendChild(inp);
  }

  var inputCount = floatInputs.length - 1;
  var totalCombos = (inputCount >= 10) ? getTotalCombos(inputCount, 10) : 0;
  document.getElementById('totalCombos').innerText = totalCombos.toLocaleString() + " possible combinations";
}