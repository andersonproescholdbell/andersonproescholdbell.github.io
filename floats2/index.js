function ieee(x) {
  x = Number(x);
  var float = new Float32Array(1);
  float[0] = x;
  return float[0];
}

function rarityClass(rarity) {
  switch(rarity) {
    case "Consumer":
      return "bgConsumer";
    case "Industrial":
      return "bgIndustrial";
    case "Mil-Spec":
      return "bgMilSpec";
    case "Restricted":
      return "bgRestricted";
    case "Classified":
      return "bgClassified";
    case "Covert":
      return "bgCovert";
    default:
      return "bgConsumer";
  }
}

function formatFloat(float) {
  float = float.toString();
  while (float.length < 4) {
    if (float.length == 1) {
      float += ".";
    } else {
      float += "0";
    }
  }
  return float;
}

function createEl(el, classes, styles, innerText, placeholder, onkeyup, onclick) {
  var el = document.createElement(el);

  if (classes) {
    for (var c of classes) {
      el.classList.add(c);
    }
  }

  if (styles) {
    for (var s in styles) {
      el.style[s] = styles[s];
    }
  }
  
  if (innerText) el.innerText = innerText;
  if (placeholder) el.placeholder = placeholder;
  if (onkeyup) el.setAttribute("onkeyup", onkeyup);
  if (onclick) el.setAttribute("onclick", onclick);
  
  return el;
}

function skinImg(item, onclick) {
  var img = document.createElement("img");
  img.setAttribute("src", item.img);
  img.setAttribute("alt", item.skin);
  img.setAttribute("data-skin", item.skin);
  img.setAttribute("data-collection", item.collection);
  img.classList.add("skinImg");
  img.classList.add(rarityClass(item.rarity));
  img.setAttribute("onclick", onclick);
  return img;
}

function getSkinMaterials(skin, collection) {
  var materials = [];
  for (var s in collection) {
    if (collection[s].rarityNumber == skin.rarityNumber - 1) materials.push(collection[s]);
  }
  return materials;
}

function load() {
  for (var collection in skinData) {
    for (var skin in skinData[collection]) {
      var item = skinData[collection][skin];
      if (!item.lowestRarity) {
        var div = createEl('div', ['col', 'centered', 'skinImgCon'], {'position':'relative', 'margin':'10px'});
        
        var text1 = createEl('p', ['skinLabel'], {'top':'-15px'}, item.skin);
        div.appendChild(text1);

        var text2 = createEl('p', ['skinLabel'], {'bottom':'-15px'}, (formatFloat(item.minFloat.toString())+" - "+formatFloat(item.maxFloat.toString())))
        div.appendChild(text2);

        div.appendChild(skinImg(item, `loadSkin("${item.collection}", "${item.skin}")`));

        document.getElementById('hiddenSkins').appendChild(div);
      }
    }
  }

  distributeSkinImgs();

  document.getElementById('search').select();
}

function back() {
  terminate = true;
  var one = document.getElementById('allSkins');
  var two = document.getElementById('floats');
  var three = document.getElementById('addFloats');
  var four = document.getElementById('combinations').parentElement;
  if (two.style.display !== 'none') {
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

function distributeSkinImgs() {
  var imgs = document.querySelectorAll('.skinImgCon');
  var nonHidden = document.getElementById('skins');
  var hidden = document.getElementById('hiddenSkins');

  for (var img of imgs) {
    hidden.appendChild(img);
  }

  for (var div of document.querySelectorAll('.skinImgOutterCon')) {
    div.remove();
  }

  function compare(a, b) {
    var c = a.querySelector('.skinLabel').innerText;
    var d = b.querySelector('.skinLabel').innerText;
    if (c < d) {
        return -1;
    }
    if (c > d) {
        return 1;
    }
    return 0;
  }

  imgs = [...imgs].sort(compare);

  for (var img of imgs) {
    if (img.style.display !== 'none') {
      var cons = document.querySelectorAll('.skinImgOutterCon');
      if (cons.length === 0 || cons[cons.length-1].childElementCount === 4) {
        var div = createEl('div', ['row', 'centered', 'skinImgOutterCon']);
        div.appendChild(img);
        nonHidden.appendChild(div);
      } else {
        cons[cons.length-1].appendChild(img);
      }
    }
  }
}

function search() {
  var term = document.getElementById("search").value;
  for (var skinImg of document.getElementsByClassName("skinImg")) {
    if (!skinImg.getAttribute("data-skin").toLowerCase().includes(term.toLowerCase())/* && !skinImg.getAttribute("data-collection").toLowerCase().includes(term.toLowerCase())*/) {
      skinImg.parentElement.style.display = "none";
    } else {
      skinImg.parentElement.style.display = "flex";
    }
  }
  distributeSkinImgs();
}

async function loadSkin(collection, skin) {
  document.getElementById('allSkins').style.display = 'none';
  document.getElementById('back').style.display = 'flex';

  for (var element of document.getElementById('chosen').children) {
    element.remove();
  }

  var floats = document.getElementById('floats');
  floats.style.display = "flex";

  var item = skinData[collection][skin];
  var collection = skinData[collection];

  var minFloat = formatFloat(item.minFloat.toString());
  var maxFloat = formatFloat(item.maxFloat.toString());

  document.getElementById('chosen').appendChild(skinImgWithText(item, (minFloat + " - " + maxFloat)));
  var text = createEl('p', ['skinLabel'], {'bottom':'25px'}, '0');
  document.querySelector('#chosen > div > p:nth-child(2)').parentNode.insertBefore(text, document.querySelector('#chosen > div > p:nth-child(2)').nextSibling);

  var floatInput = document.getElementById('floatInput');
  floatInput.placeholder = minFloat + " - " + maxFloat;
  floatInput.select();
}

function convertFloat() {
  document.querySelector('#chosen > div > p:nth-child(3)').innerText = ieee(parseFloat(document.querySelector('#floatInput').value));
}

function skinImgWithText(item, bottomText) {
  var div = createEl('div', ['col', 'centered'], {'position':'relative', 'margin':'10px'});

  var text1 = createEl('p', ['skinLabel'], {'top':'-15px'}, item.skin);
  div.appendChild(text1);

  var text2 = createEl('p', ['skinLabel'], {'bottom':'-15px'}, bottomText);
  div.appendChild(text2);

  div.appendChild(skinImg(item));

  return div;
}

function enterFloats() {
  var float = document.getElementById('floatInput').value;
  var formattedFloat = formatFloat(ieee(parseFloat(float)))
  if (float == '') return null;

  var addFloats = document.getElementById('addFloats');

  document.getElementById('floats').style.display = 'none';
  addFloats.style.display = 'flex';

  var skin = skinData[document.querySelector('#chosen > div > img').getAttribute('data-collection')][document.querySelector('#chosen > div > img').getAttribute('data-skin')];

  var neededAvg = formatFloat(ieee(ieee(ieee(float)-ieee(skin.minFloat))/ieee(ieee(skin.maxFloat)-ieee(skin.minFloat)))).substring(0, 6);

  var existing = document.querySelector('#addFloats > div.col');

  if (!existing) {
    addFloats.prepend(skinImgWithText(skin, formattedFloat));

    var div = createEl('div', ['row', 'centered']);
    var inp = createEl('input', ['floatInput'], {'padding-left':'10px', 'padding-right':'10px'}, false, `Needed average: ${neededAvg}`, 'addFloatInput()');
    inp.setAttribute('type', 'number');
    div.appendChild(inp);
    document.getElementById('floatInputs').appendChild(div);

    document.querySelector('.floatInput').select();
  } else if (formattedFloat !== existing.querySelector('p:nth-child(2)').innerText) {
    existing.remove(); 
    addFloats.prepend(skinImgWithText(skin, formattedFloat));
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

function getFloat(min, max, arr) {
  var wear = 0;
  for (var i = 0; i < 10; i++) {
    wear = ieee(wear + arr[i]);
  }
  return ieee(ieee((ieee(wear/ieee(10)))*ieee(max-min))+min);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getCombo(arr, p) {
  var results = [];
  for (var i = 0; i < p.length; i++) {
    results.push(arr[p[i]]);
  }
  return results;
}

function getTotalCombos(arrSize, k) {
  var fact = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800, 479001600, 6227020800, 87178291200, 1307674368000, 20922789888000, 355687428096000, 6402373705728000, 121645100408832000, 2432902008176640000, 51090942171709440000, 1124000727777607680000, 25852016738884976640000, 620448401733239439360000, 15511210043330985984000000, 403291461126605635584000000, 10888869450418352160768000000, 304888344611713860501504000000, 8841761993739701954543616000000, 265252859812191058636308480000000, 8222838654177922817725562880000000, 263130836933693530167218012160000000, 8683317618811886495518194401280000000, 295232799039604140847618609643520000000, 10333147966386144929666651337523200000000, 371993326789901217467999448150835200000000, 13763753091226345046315979581580902400000000, 523022617466601111760007224100074291200000000, 20397882081197443358640281739902897356800000000, 815915283247897734345611269596115894272000000000, 33452526613163807108170062053440751665152000000000, 1405006117752879898543142606244511569936384000000000, 60415263063373835637355132068513997507264512000000000, 2658271574788448768043625811014615890319638528000000000, 119622220865480194561963161495657715064383733760000000000, 5502622159812088949850305428800254892961651752960000000000, 258623241511168180642964355153611979969197632389120000000000, 12413915592536072670862289047373375038521486354677760000000000, 608281864034267560872252163321295376887552831379210240000000000, 30414093201713378043612608166064768844377641568960512000000000000, 1551118753287382280224243016469303211063259720016986112000000000000, 80658175170943878571660636856403766975289505440883277824000000000000, 4274883284060025564298013753389399649690343788366813724672000000000000, 230843697339241380472092742683027581083278564571807941132288000000000000, 12696403353658275925965100847566516959580321051449436762275840000000000000, 710998587804863451854045647463724949736497978881168458687447040000000000000, 40526919504877216755680601905432322134980384796226602145184481280000000000000, 2350561331282878571829474910515074683828862318181142924420699914240000000000000, 138683118545689835737939019720389406345902876772687432540821294940160000000000000, 8320987112741390144276341183223364380754172606361245952449277696409600000000000000];
	return Math.floor(fact[arrSize] / (fact[arrSize - k] * fact[k]));
}

function formatComboFloats(combo) {
  var s = '';
  for (var i = 0; i < combo.length; i++) {
    s += formatFloat(combo[i]);
    if (i !== combo.length-1) s += ', ';
    if (i == combo.length/2) s += '\n';
  }
  return s;
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

  var skin = skinData[document.querySelector('#addFloats > div > img').getAttribute('data-collection')][document.querySelector('#addFloats > div > img').getAttribute('data-skin')];
  var goal = parseFloat(document.querySelectorAll('#addFloats > div > p')[1].innerHTML);

  if (combinations.childElementCount > 1) {
    for (var el of combinations.querySelectorAll('div')) {
      el.remove();
    }
  }

  document.getElementById('combinations').prepend(skinImgWithText(skin, formatFloat(goal)));
  
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
      for (combo of toAdd) {
        var comboNodes = document.querySelectorAll('.combo');
        if (comboNodes.length >= 1) {
          var clone = comboNodes[0].parentElement.parentElement.cloneNode(true);
          clone.querySelector('.combo').innerText = combo.outcome;
          clone.querySelector('.text-center').innerText = combo.combo;
          if (combo.goal) clone.querySelector('.combo').style.backgroundColor = 'burlywood';
          document.getElementById('done').parentNode.insertBefore(clone, document.getElementById('done').nextSibling);
        } else {
          var d1 = createEl('div', ['col', 'centered']);
          var d2 = createEl('div', ['col', 'centered']);
          var p1 = (combo.goal) ? createEl('p', ['combo'], {'background-color':'burlywood'}, combo.outcome, false, false, 'showCombo(this)') 
                                : createEl('p', ['combo'], false, combo.outcome, false, false, 'showCombo(this)');
          var p2 = createEl('p', ['text-center', 'instructionText1'], {'display':'none', 'margin-top':'0'}, combo.combo);
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