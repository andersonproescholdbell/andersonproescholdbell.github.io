function load() {
  var skins = document.getElementById('skins');
  for (var item of skinDataBySearch) {
    var text = (formatFloat(item.minFloat.toString())+" - "+formatFloat(item.maxFloat.toString()));
    var onclick = `loadSkin("${item.skin}")`;
    skins.appendChild(skinImgWithText(item, ['skinImgCon'], [{"text":text, "offset":{'bottom':'-15px'}}], onclick));
  }

  document.getElementById('search').select();
}

function back() {
  terminate = true;
  var one = document.getElementById('chooseSkin');
  var two = document.getElementById('chooseFloat');
  var three = document.getElementById('addFloats');
  var four = document.getElementById('combinations').parentElement;
  if (one.style.display != 'none') {
    window.location.href = '../floats/index.html';
  } else if (two.style.display !== 'none') {
    two.style.display = 'none';
    one.style.display = 'flex';
    document.getElementById('search').select();
  } else if (three.style.display !== 'none') {
    three.style.display = 'none';
    two.style.display = 'flex';
    document.querySelector('.floatInput').select();
  } else if (four.style.display !== 'none') {
    four.style.display = 'none';
    three.style.display = 'flex';
  }
}

function search() {
  var term = document.getElementById("search").value.toLowerCase();
  for (var skinImg of document.getElementsByClassName("skinImg")) {
    if (!skinImg.getAttribute("data-skin").toLowerCase().includes(term)) {
      skinImg.parentElement.style.display = "none";
    } else {
      skinImg.parentElement.style.display = "flex";
    }
  }
}

function loadSkin(skin) {
  document.getElementById('chooseSkin').style.display = 'none';
  var chooseFloat = document.querySelector('#chooseFloat');

  if (chooseFloat.childElementCount > 2) {
    chooseFloat.querySelector('.skinLabel').parentElement.remove();
  }
  chooseFloat.style.display = "flex";

  var item = skinDataBySkin[skin];

  var minFloat = formatFloat(item.minFloat.toString());
  var maxFloat = formatFloat(item.maxFloat.toString());
  var floatText = minFloat + " - " + maxFloat;

  chooseFloat.appendChild(skinImgWithText(item, [], [{"text":floatText, "offset":{'bottom':'-15px'}}, {"text":'0', "offset":{'bottom':'25px'}}]));
  
  var floatInput = document.getElementById('floatInput');
  floatInput.placeholder = floatText;
  convertFloat();
  floatInput.select();
}

function convertFloat() {
  var input = document.querySelector('#floatInput').value;
  if (input !== '') {
    document.querySelector('#chooseFloat > div:nth-child(3) > p:nth-child(3)').innerText = ieee(parseFloat(input));
  }
}

function enterFloats() {
  var float = document.getElementById('floatInput').value;
  var formattedFloat = formatFloat(ieee(parseFloat(float)))
  if (float == '') return null;

  var addFloats = document.getElementById('addFloats');

  document.getElementById('chooseFloat').style.display = 'none';
  addFloats.style.display = 'flex';

  var skin = skinDataBySkin[document.querySelector('#chooseFloat > div:nth-child(3) > img').getAttribute('data-skin')];

  var neededAvg = formatFloat(ieee(ieee(ieee(float)-ieee(skin.minFloat))/ieee(ieee(skin.maxFloat)-ieee(skin.minFloat)))).substring(0, 6);

  var existing = document.querySelector('#addFloats > div.col');

  if (!existing) {
    addFloats.insertBefore(skinImgWithText(skin, [], [{"text":formattedFloat, "offset":{'bottom':'-15px'}}]), addFloats.querySelector('button'));

    var div = createEl('div', ['row', 'centered']);
    var inp = createEl('input', ['floatInput'], {'padding-left':'10px', 'padding-right':'10px'}, false, `Needed average: ${neededAvg}`, 'addFloatInput()');
    inp.setAttribute('type', 'number');
    div.appendChild(inp);
    document.getElementById('floatInputs').appendChild(div);

    document.querySelector('.floatInput').select();
  } else if (formattedFloat !== existing.querySelector('p:nth-child(2)').innerText) {
    existing.remove(); 
    addFloats.prepend(skinImgWithText(skin, [], [{"text":formattedFloat, "offset":{'bottom':'-15px'}}]));
    for (var inp of document.querySelectorAll('.floatInput')) {
      inp.placeholder = formattedFloat;
    }
  }
}

function addFloatInput() {
  var floatInputs = document.getElementsByClassName('floatInput');
  var lastInput = floatInputs[floatInputs.length - 1];
  if (!isNaN(parseFloat(lastInput.value))) {
    if (floatInputs.length >= 10) {
      document.querySelector('#addFloats > button').style.display = 'flex';
    }
    if (lastInput.parentElement.childElementCount < 4) {
      lastInput.parentElement.appendChild(createEl('input', ['floatInput'], {'padding-left':'10px', 'padding-right':'10px'}, false, lastInput.placeholder, 'addFloatInput()'));
    } else {
      var addFloats = document.getElementById('addFloats');
      var dim = addFloats.getBoundingClientRect();
      if (dim.top > 0) addFloats.style.top = `${Math.max(dim.top-30, 0)}px`;

      var div = createEl('div', ['row', 'centered']);
      div.appendChild(lastInput.parentElement.appendChild(createEl('input', ['floatInput'], {'padding-left':'10px', 'padding-right':'10px'}, false, lastInput.placeholder, 'addFloatInput()')));
      lastInput.parentElement.parentElement.appendChild(div);
    }
  }

  var inputCount = floatInputs.length - 1;
  var totalCombos = (inputCount >= 10) ? getTotalCombos(inputCount, 10) : 0;
  document.getElementById('totalCombos').innerText = totalCombos.toLocaleString() + " possible combinations";
}

function showCombo(el) {
  el = el.parentElement.parentElement.querySelectorAll('p')[1];
  el.style.display = (el.style.display === 'none') ? 'flex' : 'none';
}

function generateCombinations() {
  document.getElementById('addFloats').style.display = 'none';
  var combinations = document.getElementById('combinations');
  combinations.parentElement.style.display = 'flex';

  var floats = [];
  for (var f of document.getElementsByClassName('floatInput')) {
    if (!isNaN(parseFloat(f.value))) floats.push(ieee(parseFloat(f.value)));
  }

  var skin = skinDataBySkin[document.querySelector('#addFloats > div > img').getAttribute('data-skin')];
  var goal = parseFloat(document.querySelectorAll('#addFloats > div > p')[1].innerHTML);

  if (combinations.childElementCount > 1) {
    for (var el of combinations.querySelectorAll('div')) {
      el.remove();
    }
  }

  document.getElementById('combinations').prepend(skinImgWithText(skin, [], [{"text":formatFloat(goal), "offset":{'bottom':'-15px'}}]));
  
  runBatches(floats, goal, ieee(skin.minFloat), ieee(skin.maxFloat));
}

async function batch(arr, r, i, n, pointers, end) {
  var done = 0;
  var found = [];

  while (r >= 0 && done < end) {
    if (i <= (n + (r - 10))) {
      pointers[r] = i;
      if (r == 9) {
        found.push(getCombo(arr, pointers));
        done++;

        i++;
      } else {
        i = pointers[r]+1;
        r++;
      }
    } else {
      r--;
      if (r >= 0) {
        i = pointers[r]+1;
      }
    }
  }

  return {'r':r, 'i':i, 'n':n, 'pointers':pointers, 'found':found};
}

var terminate = false;

async function runBatches(arr, goal, min, max) {
  terminate = false;
  var totalCombos = getTotalCombos(arr.length, 10);
  var inc = Math.max(124025, Math.ceil(totalCombos*0.00003));
  var done = 0, r = 0, i = 0, n = arr.length, pointers = new Array(10).fill(0), found = [];

  var bestDelta = Number.MAX_SAFE_INTEGER;
  var totalGoals = 0;

  await sleep(100);

  while (done < totalCombos && !terminate) {
    var res = await batch(arr, r, i, n, pointers, inc);
    r = res.r;
    i = res.i;
    n = res.n;
    pointers = res.pointers;
    
    // Operate here
    document.getElementById('done').innerText = (`${(done+inc).toLocaleString()} / ${totalCombos.toLocaleString()}`);
    var toAdd = [];
    var newBest = false;
    for (var combo of res.found) {
      var float = getFloat(min, max, combo);
      if (Math.abs(float-goal) < bestDelta || float === goal) {
        bestDelta = Math.abs(float-goal);
        (float === goal) ? toAdd.push({'outcome':(formatFloat(float)), 'combo':formatComboFloats(combo), 'goal':true}) : toAdd.push({'outcome':(formatFloat(float)), 'combo':formatComboFloats(combo), 'goal':false});
        if (float === goal) totalGoals++;
        newBest = true;
        if (totalGoals >= 10) break;
      }
    }
    if (newBest) {
      for (var combo of toAdd) {
        var comboNodes = document.querySelectorAll('.combo');
        if (comboNodes.length >= 1) {
          var clone = comboNodes[0].parentElement.parentElement.cloneNode(true);
          clone.querySelector('.combo').innerText = combo.outcome;
          clone.querySelector('.text-center').innerText = combo.combo;
          if (combo.goal) clone.querySelector('.combo').style.backgroundColor = 'burlywood';
          document.getElementById('done').parentNode.insertBefore(clone, document.getElementById('done').nextSibling);
        } else {
          var d1 = createEl('div', ['col', 'centered', 'width-100'], {"width":"60%", "flex-wrap":"wrap"});
          var d2 = createEl('div', ['col', 'centered']);
          var p1 = (combo.goal) ? createEl('p', ['combo'], {'background-color':'burlywood'}, combo.outcome, false, false, 'showCombo(this)') 
                                : createEl('p', ['combo'], false, combo.outcome, false, false, 'showCombo(this)');
          var p2 = createEl('p', ['text-center', 'instructionText'], {'display':'none', 'margin-top':'0'}, combo.combo);
          d2.appendChild(p1);
          d1.appendChild(d2);
          d1.appendChild(p2);
          document.getElementById('done').parentNode.insertBefore(d1, document.getElementById('done').nextSibling);
          d2.style.height = p1.getBoundingClientRect().height + 'px';
        }
      }
      newBest = false;
    }
    if (totalGoals >= 10) {
      document.getElementById('done').innerText = 'Found 10 perfect combinations, stopping at\n' + document.getElementById('done').innerText;
      break;
    }

    // Operate above here
    await sleep(1);
    done += inc;
  }
  if (totalGoals < 10) document.getElementById('done').innerText = (`${totalCombos.toLocaleString()} / ${totalCombos.toLocaleString()}`);
}

/* 
TODO
  - When combinations are being generated, if one is clicked to show the floats, any generated after
    that will also show their floats.
  - Generated combinations with dragon lore and can go back once, but not twice for some reason.
  - Find a way to check if floats are craftable given min and max of skin.
  - Mobile is a disaster
  - skin names with special characters: aug joamunder
*/