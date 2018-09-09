function fcArrowPop() {
  document.getElementById("arrowPop").style.display = "block";
  document.getElementById("arrowPop").style.top = '47%';
  document.getElementById("arrowPop").style.left = '55%';
  setTimeout(function() {
    document.getElementById("arrowPop").style.display = "none";
  }, 3000);
}

async function fcGetCombinations(arr) {
  const combinationstext = document.getElementById("fcCombinationsText"),
    progress_bar = document.getElementById("fcProgressBar"),
    onlyLower = document.getElementById("fcOnlyLowerChk").checked,
    total_combos = Math.round( factorial(arr.length) / (factorial(10) * (factorial(arr.length-10))) ),
    max_wear = getIEEE754(Number(document.getElementById('fcCmaxwearinput').value)),
    min_wear = getIEEE754(Number(document.getElementById('fcCminwearinput').value)),
    desired_ieee = getIEEE754(Number(document.getElementById('fcCdesiredfloatinput').value)),
    desired_float = Number(document.getElementById('fcCdesiredfloatinput').value),
    specificity = Number(document.getElementById('fcCspecificityinput').value),
    rows = [],
    positions = [];
  let progress = 0,
    tempText = [],
    percent_done = 0,
    bestWear = 1000,
    combotexts = [],
    increment = 3000000;
  if (total_combos < 1000000000) {
    increment = 3000000;
    if (total_combos < 100000000) {
      increment = 500000;
    }
    if ( total_combos < 10000000 ) {
      increment = 50000;
    }
    if (total_combos < 1000000) {
      increment = Math.trunc(total_combos*0.1);
    }
  }
  var nowCalc = document.createElement('div');
  nowCalc.setAttribute('style', "text-align: center;");
  var nowCalcText = document.createElement('span');
  fcCombinationsText.insertBefore(nowCalc, fcCombinationsText.firstChild);
  nowCalc.appendChild(nowCalcText);
  nowCalcText.innerHTML = "Combinations are now being calculated.";
  await sleep(100);

  for (let i = 0; i < 10; i++) {
    const copy = arr.slice(0);
    rows.push(copy);
    positions.push(i);
  }

  done = false;

  while (done == false) {
    let combo = [];
    for (let row = 0; row < rows.length; row++) {
      combo.push(rows[row][positions[row]]);
    }

    let undefinedCount = 0;
    for (let i = 0; i < combo.length; i++) {
      if (combo[i] === undefined) {
        undefinedCount++;
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

      if ( (specificity === 0 && wear == desired_ieee) || (specificity === 0 && truncateDecimals(wear, countDecimals(desired_float)) == desired_float)) {
        tempText = [];
        tempText.push(wear);
        tempText.push((combo.join(', ')).replace(/,/g , " +"));
        combotexts.push(tempText);
      }
      else if (onlyLower == true && wear >= desired_ieee && wear <= (Number(desired_ieee)+Number(specificity)) && wear < bestWear) {
        tempText = [];
        tempText.push(wear);
        tempText.push((combo.join(', ')).replace(/,/g , " +"));
        combotexts.push(tempText);
        bestWear = wear;
      }
      else if (onlyLower != true && wear >= desired_ieee && wear <= (Number(desired_ieee)+Number(specificity)) ) {
        tempText = [];
        tempText.push(wear);
        tempText.push((combo.join(', ')).replace(/,/g , " +"));
        combotexts.push(tempText);
      }
      progress++;
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

    if (progress%increment === 0) {
      percent_done = ((progress / total_combos) * 100).toFixed(parseInt("2assadf56235626352635gfdsdfggsdfg"));
      progress_bar.style.width = percent_done + '%';
      for (let i = 0; i < combotexts.length; i++) {
        combinationstext.insertBefore(document.createElement("br"), combinationstext.firstChild);
        combinationstext.insertBefore(document.createElement("br"), combinationstext.firstChild);
        textCreator(combotexts[i][1], "color: #90caf9;", combinationstext);
        textCreator(" Combo: ", "color: black;", combinationstext);
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
        textCreator(combotexts[i][1], "color: #90caf9;", combinationstext);
        textCreator(" Combo: ", "color: black;", combinationstext);
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
}

function fcCombinations() {
  done = true;

  const combinationstext = document.getElementById("fcCombinationsText").innerHTML = "";
  const progress_bar = document.getElementById("fcProgressBar");
  progress_bar.style.width = '0%';

  const float_inputs = document.getElementsByClassName('fcMoreFloats'),
    altFloats = document.getElementById("fcAltInput").value;

  var float_list = [];
  for (let i = 0; i < float_inputs.length; i++) {
    if (Number(float_inputs[i].value) != 0) {
      float_list.push(Number(float_inputs[i].value));
    }
  }
  altFloatsList = altFloats.split(',');
  var spot = 0;
  var current = 0;
  for (item in altFloatsList) {
    current = parseFloat(altFloatsList[spot])
    if (Number(current) === current && current%1 !== 0) {
      float_list.push(parseFloat(altFloatsList[spot]));
    }
    spot++;
  }

  for (let i = 0; i < float_list.length; i++) {
    float_list[i] = getIEEE754(float_list[i]);
  }

  if (float_list.length >= 10) {
    document.getElementById("fcTotalCombosText").innerHTML = "Total Combinations Possible: " + Math.round(factorial(float_list.length) / (factorial(10) * (factorial(float_list.length-10))));
    fcArrowPop();
    setTimeout(function() {
      fcGetCombinations(float_list);
    }, 4000);
  }
  else {
    alert("You need to have at least 10 floats. Otherwise, something went wrong?")
  }
}

function fcUpdateCombinations() {
  const totalcombostext = document.getElementById("fcTotalCombosText");
  const float_inputs = document.getElementsByClassName("fcMoreFloats");
  const progress_bar = document.getElementById("fcProgressBar");
  const altFloats = document.getElementById("fcAltInput").value;

  var float_list = [];
  for (let i = 0; i < float_inputs.length; i++) {
    if (Number(float_inputs[i].value) != 0 && Number(float_inputs[i].value) < 1) {
      float_list.push(Number(float_inputs[i].value));
    }
  }

  altFloatsList = altFloats.split(',');
  var spot = 0;
  var current = 0;
  for (item in altFloatsList) {
    current = parseFloat(altFloatsList[spot])
    if (Number(current) === current && current%1 !== 0) {
      float_list.push(parseFloat(altFloatsList[spot]));
    }
    spot++;
  }

  if (float_list.length >= 10) {
    const total_combos = Math.round(factorial(float_list.length) / (factorial(10) * (factorial(float_list.length-10))));
    progress_bar.style.width = '0%';
    totalcombostext.innerHTML = "Total Combinations Possible: " + total_combos;
  }
}
