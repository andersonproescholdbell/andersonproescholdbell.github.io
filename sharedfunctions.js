//get sum of arrawy
function getSum(total, num) {
  return total + num;
}

//get ieee754 equivalent of decimal/float
function getIEEE754(x) {
  var float = new Float32Array(1);
  float[0] = x;
  return float[0];
}

//get factorial of integer
function factorial(n) {
  if (n==0 || n==1) {
    return 1;
  }
  return factorial(n-1)*n;
}

//shows help text from button on left
function showHelp() {
  document.getElementById("overlay").style.display = "block";
  if (document.getElementById("tfDiv").style.display == "block") {
    document.getElementById("helpText").innerHTML = document.getElementById("tfText").innerHTML;
  }
  if (document.getElementById("ieee754Div").style.display == "block") {
    document.getElementById("helpText").innerHTML = document.getElementById("ieee754Text").innerHTML;
  }
  if (document.getElementById("floatCombosDiv").style.display == "block") {
    document.getElementById("helpText").innerHTML = document.getElementById("fcText").innerHTML;
  }
  if (document.getElementById("opskinsFloatCombosDiv").style.display == "block") {
    document.getElementById("helpText").innerHTML = document.getElementById("opcombosText").innerHTML;;
  }
}

//hides help text
function dontShowHelp() {
  document.getElementById("overlay").style.display = "none";
}

//disclaimer when website is first opened hiden by clicking anywhere
function hideDisclaimer() {
  document.getElementById("disclaimer").style.display = "none";
}

//pause must use await sleep(ms)
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//used to create spans to display
function textCreator(text, theStyle, whereTo) {
	var newSpan = document.createElement('span');
  newSpan.setAttribute('style', theStyle);
  newSpan.innerHTML = text;
  whereTo.insertBefore(newSpan, whereTo.firstChild);
}

//collects relevant data from JSON
function getMoreData(skinData, combo) {
  let ids = "";
  let prices = "";
  let tempPrice = 0;
  let spot = 0;

  for (let i = 0; i < 10; i++) {
    spot = skinData[0].indexOf(combo[i]);
    ids += skinData[1][spot][0] + ",";
    prices += skinData[1][spot][1] + ",";
    tempPrice += skinData[2][spot];
  }
  let url = "https://bitskins.com/api/v1/add_to_cart/?api_key=APIKEY&code=2FACODE&item_ids=" + ids.substring(0, ids.length-1) + "&app_id=730&prices=" + prices.substring(0, prices.length-1);

  return [url, Number((tempPrice).toFixed(parseInt("2asdf89asd8fa89sdf9as")))];
}

//truncates after certain decimal place
truncateDecimals = function (number, digits) {
	var multiplier = Math.pow(10, digits),
		adjustedNum = number * multiplier,
		truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);
	return truncatedNum / multiplier;
};

//sees how many zeros there are (after decimal ?)
function numberOfZeros(n) {
  var c = 0;
  while (!~~n) {
    c++;
    n *= 10;
  }
  return c - 1;
}

//checks to see if there are any floats that are in two arrays
function getMatches() {
  let matches = document.getElementById('CmatchesInput').value;
  matches = matches.split(',');

  let matchesArr = [];
  for (let i = 0; i < matches.length; i++) {
    if (isNaN(parseInt(matches[i])) || parseInt(matches[i]) > 9) {
      if (matches[i] !== "") {
        matchesArr.push(0);
        alert("Changed " + matches[i] + " to 0. Remember, you need to enter numbers no greater than 9");
      }
    }
    else {
      matchesArr.push(parseInt(matches[i]));
    }
  }
  if (document.getElementById("CmatchesInput").value.endsWith(",")) {
    document.getElementById("CmatchesInput").value = matchesArr + ',';
  }
  else {
    document.getElementById("CmatchesInput").value = matchesArr;
  }
  return matchesArr;
}

function checkMatching(searches, combo, matches) {
	let comboMatches = [];
	for (let i = 0; i < searches.length; i++) {
    let matchCount = 0;
    for (let n = 0; n < combo.length; n++) {
    	if ( searches[i].includes(combo[n]) ) {
      	matchCount++;
    	}
    }
    //comboMatches[i] = matchCount;
    comboMatches.push(matchCount);
	}
	for (let i = 0; i < comboMatches.length; i++) {
		if (comboMatches[i] < matches[i]) {
			return false
		}
	}
	return true;
}

function findDate() {
  var currentdate = new Date();
  var datetime = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + "@" + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
  return datetime;
}

function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function saveParams() {
  const onlyLower = document.getElementById("onlyLowerChk").checked,
    lowerPrice = document.getElementById("priceChk").checked,
    onlyLowerPrice = document.getElementById("lowPriceChk").checked,
    matches = getMatches(),
    max_wear = Number(document.getElementById('Cmaxwearinput').value),
    min_wear = Number(document.getElementById('Cminwearinput').value),
    desired_float = Number(document.getElementById('Cdesiredfloatinput').value),
    specificity = Number(document.getElementById('Cspecificityinput').value),
    numFloats = document.getElementById("numFloatsInput").value,
    maxPrice = Number(document.getElementById('CmaxPriceInput').value);

  let cooks = document.cookie.split(';');
  var paramCount = 0;
  for (let i = 0; i < cooks.length; i++) {
    while (cooks[i].charAt(0) === ' ') {
      cooks[i] = cooks[i].substr(1);
    }
    if (cooks[i].startsWith("param")) {
      paramCount++;
    }
  }
  setCookie("params" + ((paramCount)+1), onlyLower+"+"+lowerPrice+"+"+onlyLowerPrice+"+"+max_wear+"+"+min_wear+"+"+desired_float+"+"+specificity+"+"+numFloats+"+"+maxPrice+"+"+matches);
}

function showPastParams() {
  let cooks = document.cookie.split(';');
  var paramCooks = [];
  for (let i = 0; i < cooks.length; i++) {
    while (cooks[i].charAt(0) === ' ') {
      cooks[i] = cooks[i].substr(1);
    }
    if (cooks[i].startsWith("param")) {
      paramCooks.push(cooks[i]);
    }
  }

  const pastParams = document.getElementById("pastParams");
  pastParams.innerHTML = "";
  for (let i = 0; i < paramCooks.length; i++) {
    var btn = document.createElement("BUTTON");
    var txt = document.createTextNode(paramCooks[i]);
    btn.appendChild(txt);
    btn.onclick = function() {
      var parms = (String(paramCooks[i]).split('='))[1].split('+');
      if (parms[0] == "true") {
        document.getElementById("onlyLowerChk").checked = true;
      }
      else {
        document.getElementById("onlyLowerChk").checked = false;
      }
      if (parms[1] == "true") {
        document.getElementById("priceChk").checked = true;
      }
      else {
        document.getElementById("priceChk").checked = false;
      }
      if (parms[2] == "true") {
        document.getElementById("lowPriceChk").checked = true;
      }
      else {
        document.getElementById("lowPriceChk").checked = false;
      }
      document.getElementById('Cmaxwearinput').value = parms[3];
      document.getElementById('Cminwearinput').value = parms[4];
      document.getElementById('Cdesiredfloatinput').value = parms[5];
      document.getElementById('Cspecificityinput').value = parms[6];
      document.getElementById("numFloatsInput").value = parms[7];
      document.getElementById('CmaxPriceInput').value = parms[8];
      document.getElementById('CmatchesInput').value = parms[9];
    }
    pastParams.appendChild(btn);
    pastParams.appendChild(document.createElement("br"));
  }
}

var timeout = null;
function delayUpdate() {
  clearTimeout(timeout);

  timeout = setTimeout(updatecombinations, 4000);
}

function permutator(inputArr) {
  let result = [];
  function permute(arr, m = []) {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
     }
   }
 }
 permute(inputArr);
 return result;
}

var countDecimals = function (value) {
    if(Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0;
}

function load() {
  document.getElementById("any").checked = true;
  document.getElementById("factoryNew").checked = false;
  document.getElementById("minimalWear").checked = false;
  document.getElementById("fieldTested").checked = false;
  document.getElementById("wellWorn").checked = false;
  document.getElementById("battleScarred").checked = false;
  tfUpdateOutputs();
  updateIeeeRange();
  fcUpdateCombinations();
  updatecombinations();
  updateOpLink();
  lastActive();
}
