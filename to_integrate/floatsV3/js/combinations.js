function generateCombinations() {
  toggleDisplay('addFloats');
  toggleDisplay('combinations');

  var floats = [];
  for (var f of document.querySelectorAll('.floatInput')) {
    if (!isNaN(parseFloat(f.value))) floats.push(ieee(parseFloat(f.value)));
  }

  var skin = skinDataBySkin[document.querySelector('#addFloats > div > img').getAttribute('data-skin')];
  var goal = parseFloat(document.querySelectorAll('#addFloats > div > p')[1].innerHTML);

  for (var el of generatedCombinations.querySelectorAll('#generatedCombinations > div')) {
    el.remove();
  }

  for (var el of document.getElementById('combinations').querySelectorAll('.skinImg')) {
    el.parentElement.remove();
  }

  combinations.prepend(skinImgWithText(skin, false, formatFloat(goal)));
  
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

  return {'r':r, 'i':i, 'n':n, 'pointers':pointers, 'found':found, 'done':done};
}

async function runBatches(arr, goal, min, max) {
  terminate = false;
  var totalCombos = getTotalCombos(arr.length, 10);
  var totalCombosStr = totalCombos.toLocaleString();
  var inc = Math.max(124025, Math.ceil(totalCombos*0.00003));
  var done = 0, r = 0, i = 0, n = arr.length, pointers = new Array(10).fill(0), found = [];

  var bestDelta = Number.MAX_SAFE_INTEGER;
  var totalGoals = 0;

  await sleep(100);

  var res = {'r':r, 'i':i, 'n':n, 'pointers':pointers};
  while (done < totalCombos && !terminate) {
    var res = await batch(arr, res.r, res.i, res.n, res.pointers, inc);
    
    // Operate below
    var progress = document.getElementById('progress');
    progress.innerText = (`${(done+res.done).toLocaleString()} / ${totalCombosStr}`);
    
    var toAdd = [];
    var newBest = false;
    for (var c of res.found) {
      var float = getFloat(min, max, c);
      if (Math.abs(float-goal) < bestDelta || float === goal) {
        newBest = true;
        bestDelta = Math.abs(float-goal);
        var temp = {'outcome':(formatFloat(float)), 'combo':formatComboFloats(c), 'goal':false};
        if (float === goal) {
          temp.goal = true;
          totalGoals++;
        }
        toAdd.push(temp);
        if (totalGoals >= 10) break;
      }
    }
    if (newBest) {
      var generateCombinations = document.getElementById('generatedCombinations');
      for (var c of toAdd) {
        var d = createEl('div', ['col', 'centered', 'combo'], {"max-width":"90%"});
        var p1 = createEl('p', ['margin-zero'], false, {'innerText':c.outcome});
        p1.addEventListener('click', function() { showCombo(this) });
        var p2 = createEl('p', ['text-center', 'margin-zero', 'instructionText', 'comboFloats'], {'display':'none'}, {'innerText':c.combo});
        if (c.goal) {
          d.style.backgroundColor = 'burlywood';
          p2.classList.remove('instructionText');
        }
        d.appendChild(p1);
        d.appendChild(p2);
        generateCombinations.prepend(d);
      }
      newBest = false;

      if (totalGoals >= 10) {
        progress.innerText = 'Found 10 perfect combinations, stopping at\n' + progress.innerText;
        terminate = true;
      }
    }
    // Operate above

    await sleep(1);
    done += inc;
  }
  if (totalGoals < 10) progress.innerText = (`${totalCombosStr} / ${totalCombosStr}`);
}

function showCombo(el) {
  var p = el.parentElement.querySelector('p:nth-child(2)');
  (getComputedStyle(p).display === 'none') ? p.style.display = 'flex' : p.style.display = 'none';
}