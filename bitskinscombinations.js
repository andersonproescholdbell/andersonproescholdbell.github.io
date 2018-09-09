function arrowPop() {
  document.getElementById("arrowPop").style.display = "block";
  document.getElementById("arrowPop").style.top = '72%';
  document.getElementById("arrowPop").style.left = '55%';
  setTimeout(function() {
    document.getElementById("arrowPop").style.display = "none";
  }, 3000);
}

async function opskinsSearch(url) {
  const proxy = 'https://cors-anywhere.herokuapp.com/';

  function loadInfo(url) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.onreadystatechange = function onreadystatechange() {
        if (this.readyState === 4) {
          if (this.status >= 200 && this.status < 400) {
            resolve(this.responseText);
          }
          else {
            reject(new Error(`Error ${this.status}`));
            alert("There was an issue, please try again.");
            document.getElementById("getInfoInput").style.backgroundColor = "#0fa72c";
          }
        }
      };
      request.send();
    });
  }

  /*function load2(url) {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", function () {
      console.log(this.responseText);
    });
  }

  oReq.open("GET", proxy + url);
  oReq.send();*/

  let opData = await loadInfo(proxy+url);
  const opRes = JSON.parse(opData);

  return opRes;
}

async function updateOpLink() {
  let search = document.getElementById("searchInput").value;
  search = search.split(' ').join('+');
  const apiKey = document.getElementById("apiInput").value;
  const minPrice = Number(document.getElementById("minPriceInput").value);
  const maxPrice = Number(document.getElementById("maxPriceInput").value);
  const itemWear = whichWear("nothing");
  const stat = Number(document.getElementById("statInput").value);
  const secCode = document.getElementById("secCodeInput").value;
  const delay = document.getElementById("delayInput").value;

  const url = "https://bitskins.com/api/v1/get_inventory_on_sale/?api_key=" + apiKey + "&code=" + secCode + "&app_id=730&sort_by=price&order=asc&market_hash_name=" + search + "&min_price=" + minPrice + "&max_price=" + maxPrice + "&is_stattrak=" + stat + "&is_souvenir=-1&per_page=100&show_trade_delayed_items=" + delay + "&item_wear=" + itemWear;
  document.getElementById("opLink").innerHTML = url;
}

async function getCombinations(skinData) {
  const progress_bar = document.getElementById("progress_bar"),
    combinationstext = document.getElementById("combinationstext");
  const onlyLower = document.getElementById("onlyLowerChk").checked,
    lowerPrice = document.getElementById("priceChk").checked,
    onlyLowerPrice = document.getElementById("lowPriceChk").checked,
    specificity = Number(document.getElementById('Cspecificityinput').value);
  const total_combos = Math.round( factorial(skinData[0].length) / (factorial(10) * (factorial(skinData[0].length-10))) ),
    matches = getMatches(),
    searches = getSearchFloatsIEEE();
  const max_wear = getIEEE754(Number(document.getElementById('Cmaxwearinput').value)),
    min_wear = getIEEE754(Number(document.getElementById('Cminwearinput').value)),
    desired_ieee = getIEEE754(Number(document.getElementById('Cdesiredfloatinput').value)),
    desired_float = Number(document.getElementById('Cdesiredfloatinput').value);
    max_above = desired_ieee + Number(document.getElementById('Cspecificityinput').value),
    maxPrice = Number(document.getElementById('CmaxPriceInput').value);
  const arr = skinData[0],
    rows = [],
    positions = [];
  var bestPrice = 10000000,
    bestWear = 1000,
    tempText = [],
    combotexts = [],
    progress = 0,
    percent_done = 0,
    increment = 250000;
  if (total_combos < 100000000) {
    increment = 100000;
    if ( total_combos < 10000000 ) {
      increment = 25000;
      if (total_combos < 1000000) {
        increment = Math.trunc(total_combos*0.1);
      }
    }
  }

  var nowCalc = document.createElement('div');
  nowCalc.setAttribute('style', "text-align: center;");
  var nowCalcText = document.createElement('span');
  combinationstext.insertBefore(nowCalc, combinationstext.firstChild);
  nowCalc.appendChild(nowCalcText);
  nowCalcText.innerHTML = "Combinations are now being calculated. MAKE SURE YOU ADD SKINS TO THE TRADEUP CONTRACT IN CSGO IN THE SAME ORDER AS SHOWN IN THE COMBINATION.";
  await sleep(100);

  for (let i = 0; i < 10; i++) {
    const copy = arr.slice(0);
    rows.push(copy);
    positions.push(i);
  }

  done = false;
  let doMatches = false;
  let matchSucc = true;
  if (matches.reduce(getSum) !== 0) {
    doMatches = true;
    matchSucc = false;
  }

  while (done == false) {
    let combo = [];
    let undefinedCount = 0;
    for (let row = 0; row < rows.length; row++) {
      combo.push(rows[row][positions[row]]);
    }

    for (let i = 0; i < combo.length; i++) {
      if (combo[i] === undefined) {
        undefinedCount ++;
      }
    }
    if (undefinedCount >= 10) {
      done = true;
    }

    if (combo.indexOf(undefined) < 0) {
      let wear = 0;
      for (let i = 0; i < 10; i++) {
        wear = getIEEE754(wear + combo[i]);
      }
      wear = getIEEE754(((getIEEE754(wear/getIEEE754(10)))*getIEEE754(max_wear-min_wear))+min_wear);

      if ( (specificity === 0 && wear == desired_ieee) || (specificity === 0 && truncateDecimals(wear, countDecimals(desired_float)) == desired_float) ) {
        if (lowerPrice == true) {
          let moreData = getMoreData(skinData, combo);
          if (doMatches == true) {
            matchSucc = checkMatching(searches, combo, matches);
          }
          if (moreData[1] < bestPrice && moreData[1] <= maxPrice && matchSucc == true) {
            tempText = [wear, moreData[1], ((combo.join(', ')).replace(/,/g , " +")), moreData[0]];
            combotexts.push(tempText);
            bestPrice = moreData[1];
          }
        }
        else {
          let moreData = getMoreData(skinData, combo);
          if (doMatches == true) {
            matchSucc = checkMatching(searches, combo, matches);
          }
          if (moreData[1] <= maxPrice && matchSucc == true) {
            tempText = [wear, moreData[1], ((combo.join(', ')).replace(/,/g , " +")), moreData[0]];
            combotexts.push(tempText);
          }
        }
      }
      else if (onlyLower == true && wear >= desired_ieee && wear <= max_above && wear < bestWear) {
        let moreData = getMoreData(skinData, combo);
        if (doMatches == true) {
          matchSucc = checkMatching(searches, combo, matches);
        }
        if (moreData[1] <= maxPrice && matchSucc == true) {
          tempText = [wear, moreData[1], ((combo.join(', ')).replace(/,/g , " +")), moreData[0]];
          combotexts.push(tempText);
          bestWear = wear;
        }
      }
      else if (onlyLowerPrice == true && wear >= desired_ieee && wear <= max_above) {
        let moreData = getMoreData(skinData, combo);
        if (doMatches == true) {
          matchSucc = checkMatching(searches, combo, matches);
        }
        if ( (moreData[1] < bestPrice && matchSucc == true) || (moreData[1] <= bestPrice && wear < bestWear && matchSucc == true) ) {
          tempText = [wear, moreData[1], ((combo.join(', ')).replace(/,/g , " +")), moreData[0]];
          combotexts.push(tempText);
          bestPrice = moreData[1];
          bestWear = wear;
        }
      }
      else if (onlyLower == false && lowerPrice == false && onlyLowerPrice == false && specificity !== 0 && wear >= desired_ieee && wear <= max_above) {
        let moreData = getMoreData(skinData, combo);
        if (doMatches == true) {
          matchSucc = checkMatching(searches, combo, matches);
        }
        if (moreData[1] <= maxPrice && matchSucc == true) {
          tempText = [wear, moreData[1], ((combo.join(', ')).replace(/,/g , " +")), moreData[0]];
          combotexts.push(tempText);
        }
      }
      progress ++;

      if (progress%increment === 0) {
        percent_done = ((progress / total_combos) * 100).toFixed(parseInt("3assadf56235626352635gfdsdfggsdfg"));
        progress_bar.style.width = percent_done + '%';
        for (let i = 0; i < combotexts.length; i++) {
          combinationstext.insertBefore(document.createElement("br"), combinationstext.firstChild);
          combinationstext.insertBefore(document.createElement("br"), combinationstext.firstChild);
          textCreator(combotexts[i][3], "color: #b9b9b9;", combinationstext);
          textCreator(" Add to Cart Code: ", "color: black;", combinationstext);
          textCreator(combotexts[i][2], "color: #90caf9;", combinationstext);
          textCreator(" Combo: ", "color: black;", combinationstext);
          textCreator("$"+combotexts[i][1], "color: blue;", combinationstext);
          textCreator(" Total Price: ", "color: black;", combinationstext);
          if (combotexts[i][0] == desired_ieee || (truncateDecimals(combotexts[i][0], countDecimals(desired_float)) == desired_float && desired_float !== 0) ) {
            textCreator(combotexts[i][0], "color: #a70000;background-color: #FFFF00;", combinationstext);
          }
          else {
            textCreator(combotexts[i][0], "color: #a70000;", combinationstext);
          }
          textCreator("Float: ", "color: black;", combinationstext);
        }
        combotexts = [];
        await sleep(10);
      }
      else if (progress == total_combos) {
        progress_bar.style.width = '100%';
        for (let i = 0; i < combotexts.length; i++) {
          combinationstext.insertBefore(document.createElement("br"), combinationstext.firstChild);
          combinationstext.insertBefore(document.createElement("br"), combinationstext.firstChild);
          textCreator(combotexts[i][3], "color: #b9b9b9;", combinationstext);
          textCreator(" Add to Cart Code: ", "color: black;", combinationstext);
          textCreator(combotexts[i][2], "color: #90caf9;", combinationstext);
          textCreator(" Combo: ", "color: black;", combinationstext);
          textCreator("$"+combotexts[i][1], "color: blue;", combinationstext);
          textCreator(" Total Price: ", "color: black;", combinationstext);
          if (combotexts[i][0] == desired_ieee || (truncateDecimals(combotexts[i][0], countDecimals(desired_float)) == desired_float && desired_float !== 0) ) {
            textCreator(combotexts[i][0], "color: #a70000;background-color: #FFFF00;", combinationstext);
          }
          else {
            textCreator(combotexts[i][0], "color: #a70000;", combinationstext);
          }
          textCreator("Float: ", "color: black;", combinationstext);
        }
        done = true;
      }
    }

    positions[rows.length - 1]++;
    for (let a = positions.length - 1; a >= 0; a -= 1) {
      if (positions[a] >= arr.length) {
        positions[a - 1]++;
        for (let b = a; b < positions.length; b++) {
          positions[b] = positions[b - 1] + 1;
        }
      }
    }
  }
}

async function combinations() {
  updatecombinations();
  done = true;

  if (document.getElementById("lowPriceChk").checked == true && Number(document.getElementById('Cspecificityinput').value) === 0) {
    document.getElementById("priceChk").checked = true;
    document.getElementById("lowPriceChk").checked = false;
  }

  const combinationstext = document.getElementById("combinationstext").innerHTML = "";
  const progress_bar = document.getElementById("progress_bar");
  progress_bar.style.width = '0%';
  let numFloats = document.getElementById("numFloatsInput").value;
  let numFloatsArr = [];
  numFloats = numFloats.split(',');
  for (let i = 0; i < numFloats.length; i++) {
    if (isNaN(parseInt(numFloats[i]))) {
      if (numFloats[i] !== "") {
        numFloatsArr.push(100);
      }
    }
    else {
      numFloatsArr.push(parseInt(numFloats[i]));
    }
  }

  var wears = [],
    carts = [],
    prices = [];

  let opData = document.getElementById("pastedJSON").value;

  if (opData.startsWith("Paste") !== true) {
    opData = opData.split("\n\n");
    let parsedOpData = [];
    try {
      for (let i = 0; i < opData.length; i++) {
        parsedOpData.push(JSON.parse(opData[i]));
      }
    }
    catch(err) {
      alert("There is something wrong with the opskins data, try again.")
    }

    document.getElementById("generatecombos").style.backgroundColor = "#698e70";
    for (let i = 0; i < parsedOpData.length; i++) {
      let tempnull = 0;
      for (let n = 0; n < parsedOpData[i].data.items.length; n++) {
        if (parsedOpData[i].data.items[n] == null) {
          tempnull++;
        }
      }

      for (let n = 0; (n < (numFloatsArr[i]+tempnull)) && (n < parsedOpData[i].data.items.length); n++) {
        if (parsedOpData[i].data.items[n] !== null) {
          document.getElementById("generatecombos").innerHTML = n + "/" + (numFloatsArr[i]+tempnull) + " floats loaded";
          if (parsedOpData[i].data.items[n].inspect_link !== undefined) {
            try {
              const csgoFloat = await opskinsSearch("https://api.csgofloat.com:1738/?url=" + String(parsedOpData[i].data.items[n].inspect_link).replace("%asset_id%", String(parsedOpData[i].data.items[n].asset_id)));
              wears.push(Number(csgoFloat.iteminfo.floatvalue));
              //console.log(Number(csgoFloat.iteminfo.floatvalue));
            }
            catch(err) {
              wears.push(Number(parsedOpData[i].data.items[n].float_value));
            }
          }
          else {
            wears.push(Number(parsedOpData[i].data.items[n].float_value));
          }
          carts.push([parsedOpData[i].data.items[n].item_id,parsedOpData[i].data.items[n].price]);
          prices.push(Number(parsedOpData[i].data.items[n].price));
        }
      }
    }
    document.getElementById("generatecombos").style.backgroundColor = "#0fa72c";
    document.getElementById("generatecombos").innerHTML = "Generate Combinations With Inputed Floats Below";
  }

  for (let i = 0; i < wears.length; i++) {
    wears[i] = getIEEE754(wears[i]);
  }

  const skinData = [wears, carts, prices],
    total_combos = Math.round(factorial(skinData[0].length) / (factorial(10) * (factorial(skinData[0].length-10)))),
    totalcombostext = document.getElementById("totalcombostext");
  totalcombostext.innerHTML = "Total Combinations Possible: " + total_combos;

  if (skinData[0].length >= 10) {
    setTimeout(function() {
      getCombinations(skinData);
    }, 3000);
    arrowPop();
  }
  else {
    alert("You need to have at least 10 floats. Otherwise, something went wrong?")
  }
}

function whichWear(newest) {
  var wear;
  let any = document.getElementById("any");
  let factoryNew = document.getElementById("factoryNew");
  let minimalWear = document.getElementById("minimalWear");
  let fieldTested = document.getElementById("fieldTested");
  let wellWorn = document.getElementById("wellWorn");
  let battleScarred = document.getElementById("battleScarred");

  if (newest == "any") {
    wear = "Any";
    factoryNew.checked = false;
    minimalWear.checked = false;
    fieldTested.checked = false;
    wellWorn.checked = false;
    battleScarred.checked = false;
  }
  else if (newest == "fn") {
    wear = "Factory+New";
    any.checked = false;
    minimalWear.checked = false;
    fieldTested.checked = false;
    wellWorn.checked = false;
    battleScarred.checked = false;
  }
  else if (newest == "mw") {
    wear = "Minimal+Wear";
    any.checked = false;
    factoryNew.checked = false;
    fieldTested.checked = false;
    wellWorn.checked = false;
    battleScarred.checked = false;
  }
  else if (newest == "ft") {
    wear = "Field-Tested";
    any.checked = false;
    factoryNew.checked = false;
    minimalWear.checked = false;
    wellWorn.checked = false;
    battleScarred.checked = false;
  }
  else if (newest == "ww") {
    wear = "Well-Worn";
    any.checked = false;
    factoryNew.checked = false;
    minimalWear.checked = false;
    fieldTested.checked = false;
    battleScarred.checked = false;
  }
  else if (newest == "bs") {
    wear = "Battle-Scarred";
    any.checked = false;
    factoryNew.checked = false;
    minimalWear.checked = false;
    fieldTested.checked = false;
    wellWorn.checked = false;
  }
  else if (any.checked == true) {
    wear = "Any";
  }
  else if (factoryNew.checked == true) {
    wear = "Factory+New";
  }
  else if (minimalWear.checked == true) {
    wear = "Minimal+Wear";
  }
  else if (fieldTested.checked == true) {
    wear = "Field-Tested";
  }
  else if (wellWorn.checked == true) {
    wear = "Well-Worn";
  }
  else if (battleScarred.checked == true) {
    wear = "Battle-Scarred";
  }

  return wear;
}

async function addOpData() {
  document.getElementById("getInfoInput").style.backgroundColor = "#e4fde8";
  const pages = prompt("How many sets of 24 floats would you like to add?", "1");
  const apiKey = document.getElementById("apiInput").value;
  let search = document.getElementById("searchInput").value;
  search = search.split(' ').join('+');
  const itemWear = whichWear("nothing");
  const minPrice = Number(document.getElementById("minPriceInput").value);
  const maxPrice = Number(document.getElementById("maxPriceInput").value);
  const stat = Number(document.getElementById("statInput").value);
  const secCode = document.getElementById("secCodeInput").value;
  const delay = document.getElementById("delayInput").value;

  for (let i = 0; i < pages; i++) {
    const url = "https://bitskins.com/api/v1/get_inventory_on_sale/?api_key=" + apiKey + "&code=" + secCode + "&page=" + (i+1) + "&app_id=730&sort_by=price&order=asc&market_hash_name=" + search + "&min_price=" + minPrice + "&max_price=" + maxPrice + "&is_stattrak=" + stat + "&is_souvenir=-1&per_page=24&show_trade_delayed_items=" + delay + "&item_wear=" + itemWear;

    const opData = await opskinsSearch(url);
    if ( (opData.data.items).length === 0) {
      alert("There were no results using the information provided. Check to make sure there should be results (possible typo or no listings on opskins)");
    }
    else {
      document.getElementById('savedSearchesTextarea').value += url + ";\n";
      getOpDataWears(opData);
    }
  }
  document.getElementById("getInfoInput").style.backgroundColor = "#0fa72c";
}

function getOpDataWears(opData) {
  let wears = [];

  if ((document.getElementById("formattedOpskins").innerHTML).startsWith("Float") === true || document.getElementById("formattedOpskins").innerHTML.startsWith("There") === true || document.getElementById("formattedOpskins").innerHTML == "") {
    document.getElementById("formattedOpskins").innerHTML = wears;
  }
  else {
    document.getElementById("formattedOpskins").innerHTML = document.getElementById("formattedOpskins").innerHTML + ',' + wears;
  }

  if ((document.getElementById("pastedJSON").value).startsWith("P") === true) {
    document.getElementById("pastedJSON").value = "";
    document.getElementById("pastedJSON").value = JSON.stringify(opData);
  }
  else {
    document.getElementById("pastedJSON").value = document.getElementById("pastedJSON").value + "\n\n" + JSON.stringify(opData);
  }
  updatecombinations();
  alert(opData.data.items.length + " wears were added");
}

async function searchLinks() {
  document.getElementById("searchLinks").style.backgroundColor = "#e4fde8";

  urlArr = (document.getElementById('savedSearchesTextarea').value).split(';\n');
  for (let i = 0; i < urlArr.length; i++) {
    if (urlArr[i] != "") {
      const opData = await opskinsSearch(urlArr[i]);
      getOpDataWears(opData);
    }
    sleep(500);
  }
  document.getElementById("searchLinks").style.backgroundColor = "#0fa72c";
}

function removeOpData() {
  document.getElementById("pastedJSON").value = "Paste in your JSON information from the link provided above (optional for if you don't want to input your api key)\nYou may need to press enter for it to load total combinations possible\n\nMake sure to paste each set of data with two returns so that it is two lines below everything else like this line";
  document.getElementById("formattedOpskins").innerHTML = "Float string that will work on other page will load here.";
  updatecombinations();
}

function addCustomFloat() {
  var cusFloat = prompt("Enter in information: Price;name;float ", "Price;name;float");
  cusFloat = cusFloat.split(";");
  var cusJSON = {"data":{"items":[{"price":Number(cusFloat[0]),"item_id":"CUSTOMSKIN","float_value":Number(cusFloat[2]),"market_hash_name":cusFloat[1]}]}};//,"id":"CUSTOMSKIN"
  let pastedJSON = document.getElementById("pastedJSON");
  cusJSON = JSON.stringify(cusJSON);
  if (pastedJSON.value.startsWith("Paste")) {
    pastedJSON.value = cusJSON;
  }
  else {
    pastedJSON.value = pastedJSON.value + "\n\n" + cusJSON;
  }
  updatecombinations();
}

async function updatecombinations() {
  const totalcombostext = document.getElementById("totalcombostext");
  const progress_bar = document.getElementById("progress_bar");
  let numFloats = document.getElementById("numFloatsInput").value;
  let numFloatsArr = [];
  let float_list = [];
  let opData = document.getElementById("pastedJSON").value;

  numFloats = numFloats.split(',');
  for (let i = 0; i < numFloats.length; i++) {
    if (isNaN(parseInt(numFloats[i]))) {
      if (numFloats[i] !== "") {
        numFloatsArr.push(20);
        alert("Consider checking your Number of Floats Per Set of Data. We changed one to 20");
      }
    }
    else {
      numFloatsArr.push(parseInt(numFloats[i]));
    }
  }
  if (document.getElementById("numFloatsInput").value.endsWith(",")) {
    document.getElementById("numFloatsInput").value = numFloatsArr + ',';
  }
  else {
    document.getElementById("numFloatsInput").value = numFloatsArr;
  }

  if (opData.startsWith("Paste") !== true) {
    opData = opData.split("\n\n");
    let parsedOpData = [];

    for (let i = 0; i < opData.length; i++) {
      try {
        parsedOpData.push(JSON.parse(opData[i]));
      }
      catch(err) {
      }
    }

    for (let i = 0; i < parsedOpData.length; i++) {
      let tempnull = 0;
      for (let n = 0; n < parsedOpData[i].data.items.length; n++) {
        if (parsedOpData[i].data.items[n] == null) {
          tempnull++;
        }
      }

      for (let n = 0; (n < (numFloatsArr[i]+tempnull)) && (n < parsedOpData[i].data.items.length); n++) {
        if (parsedOpData[i].data.items[n] !== null) {
          float_list.push(parsedOpData[i].data.items[n].float_value);
        }
      }
    }
    document.getElementById("formattedOpskins").innerHTML = "" + float_list;

    if (String(document.getElementById("pastedJSON").value).startsWith('{') == false &&
    String(document.getElementById("pastedJSON").value).startsWith('Paste') == false) {
      document.getElementById('formattedOpskins').value = "There is something wrong with the float data.";
    }
  }

  if (float_list.length >= 10) {
    const total_combos = Math.round(factorial(float_list.length) / (factorial(10) * (factorial(float_list.length-10))));
    progress_bar.style.width = '0%';
    totalcombostext.innerHTML = "Total Combinations Possible: " + total_combos;
  }
}

function showOpInfo() {
  document.getElementById('opInfoOverlay').style.display = 'block';
  opInfo();
}

function dontShowOpInfo() {
  document.getElementById('opInfoOverlay').style.display = 'none';
}

function opInfo() {
  showPastParams();
  let opData = document.getElementById("pastedJSON").value;
  let float_list = [];
  const opInfoText = document.getElementById("opInfoText");

  if (opData.startsWith("Paste") !== true) {
    opData = opData.split("\n\n");
    let parsedOpData = [];
    try {
      for (let i = 0; i < opData.length; i++) {
        parsedOpData.push(JSON.parse(opData[i]));
      }
    }
    catch(err) {
      alert("There is something wrong with the opskins data, try again.")
    }

    opInfoText.innerHTML = "";
    for (let i = 0; i < parsedOpData.length; i++) {
      let amount = 0;
      for (let n = 0; n < parsedOpData[i].data.items.length; n++) {
        if (parsedOpData[i].data.items[n] !== null) {
          amount++;
        }
      }
      if (amount > 0) {
        for (let n = 0; n < amount; n++) {
          try {
            let name = parsedOpData[i].data.items[n].market_hash_name;
            opInfoText.appendChild(document.createTextNode("Search" + i + ": " + amount + " floats. First item: " + name));
            opInfoText.appendChild(document.createElement("br"));
            break;
          }
          catch(err) {
            n=n;
          }
        }
      }
      else {
        opInfoText.appendChild(document.createTextNode("Search" + i + ": " + amount + " floats. First item: UNKNOWN"));
        opInfoText.appendChild(document.createElement("br"));
      }
    }
  }
}

function getSearchFloats() {
  let opData = document.getElementById("pastedJSON").value;
  opData = opData.split("\n\n");
  let parsedOpData = [];
  for (let i = 0; i < opData.length; i++) {
    parsedOpData.push(JSON.parse(opData[i]));
  }
  let searches = [];
  for (let i = 0; i < parsedOpData.length; i++) {
    searches.push([]);
  }
  for (let i = 0; i < parsedOpData.length; i++) {
    for (let n = 0; n < parsedOpData[i].data.items.length; n++) {
      if (parsedOpData[i].data.items[n] !== null) {
        searches[i].push(parsedOpData[i].data.items[n].float_value);
      }
    }
  }
  return searches;
}

function ifOnlyLower() {
  document.getElementById("priceChk").checked = false;
  if (Number(document.getElementById("Cspecificityinput").value) === 0) {
    document.getElementById("Cspecificityinput").value = 0.01;
  }
  document.getElementById("lowPriceChk").checked = false;
}

function ifLowerPrice() {
  document.getElementById("Cspecificityinput").value = 0;
  document.getElementById("onlyLowerChk").checked = false;
  document.getElementById("lowPriceChk").checked = false;
}

function ifOnlyLowerPrice() {
  document.getElementById("onlyLowerChk").checked = false;
  document.getElementById("priceChk").checked = false;
  if (Number(document.getElementById("Cspecificityinput").value) === 0) {
    document.getElementById("Cspecificityinput").value = 0.01;
  }
}


async function addToCart() {
  let code = document.getElementById("ATCCodeInput").value;
  let apiKey = document.getElementById("ATCApiKeyInput").value;
  let secCode = document.getElementById("ATCSecCodeInput").value;

  code = code.split(";");
  for (let i = 0; i < code.length; i++) {
    code[i] = code[i].split(",");
  }

  document.getElementById("ATC").style.backgroundColor = "#62da13";
  for (let i = 0; i < code.length; i++) {
    document.getElementById("ATC").innerHTML = i + "/10 floats added to cart";
    const url = "https://bitskins.com/api/v1/add_to_cart/?api_key=" + apiKey + "&code=" + secCode + "&item_ids=" + code[i][0] + "&app_id=730&prices=" + code[i][1];

    try {
      const opData = await opskinsSearch(url);
    }
    catch(err) {
      alert("Possible error (check bitskins cart too): " + err);
    }
  }
  document.getElementById("ATC").innerHTML = "Add 10 Items to BitSkins Cart";
  document.getElementById("ATC").style.backgroundColor = "#5abd81";
}

function getSearchFloatsIEEE() {
  let opData = document.getElementById("pastedJSON").value;
  opData = opData.split("\n\n");
  let parsedOpData = [];
  for (let i = 0; i < opData.length; i++) {
    parsedOpData.push(JSON.parse(opData[i]));
  }
  let searches = [];
  for (let i = 0; i < parsedOpData.length; i++) {
    searches.push([]);
  }
  for (let i = 0; i < parsedOpData.length; i++) {
    for (let n = 0; n < parsedOpData[i].data.items.length; n++) {
      if (parsedOpData[i].data.items[n] !== null) {
        searches[i].push(getIEEE754(parsedOpData[i].data.items[n].float_value));
      }
    }
  }
  return searches;
}
