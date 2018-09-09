async function fpGo() {
  document.getElementById("fpGo").style.backgroundColor = "#678e67";
  await sleep(100);
  const floats = document.getElementsByClassName("fpFloats"),
    r1min = getIEEE754(Number(document.getElementById('r1min').value)),
    r1max = getIEEE754(Number(document.getElementById('r1max').value)),
    r2min = getIEEE754(Number(document.getElementById('r2min').value)),
    r2max = getIEEE754(Number(document.getElementById('r2max').value));
  let row2 = [],
    row3 = [],
    columns = [[],[],[],[],[],[],[],[],[],[]];
  if (isNaN(r1min) || isNaN(r1max) || isNaN(r2min) || isNaN(r2max)) {
    alert("Make sure your float mins and maxes are numbers!");
    return false;
  }
  for (let i = 0; i < floats.length; i++) {
    if (i > 10) {
      row3.push(getIEEE754(Number(floats[i].value)));
    }
  }
  for (let i = 0; i < row3.length; i++) {
    let num = i%10;
    columns[(num)].push(row3[i]);
  }

  for (let j = 0; j < 10; j++) {
    let wear = 0;
    if (Number(floats[1+j].value) === 0) {
      for (let i = 0; i < 10; i++) {
        wear = getIEEE754(wear + columns[j][i]);
      }
      wear = getIEEE754(((getIEEE754(wear/getIEEE754(10)))*getIEEE754(r2max-r2min))+r2min);
      floats[1+j].value = wear;
      row2.push(wear);
    }
    else {
      row2.push(floats[1+j].value);
    }
  }

  let flist = await permutator(row2),
    all = [],
    types = [];

	for (let i = 0; i < flist.length; i++) {
    let wear = 0;
    for (let j = 0; j < 10; j++) {
      wear = getIEEE754(wear + Number(flist[i][j]));
    }
    wear = getIEEE754(((getIEEE754(wear/getIEEE754(10)))*getIEEE754(r1max-r1min))+r1min);
		all.push(wear);
		if (types.indexOf(wear) === -1) {
			types.push(wear);
		}
	}

  let wear = 0;
  for (let i = 0; i < 10; i++) {
    wear = getIEEE754(wear + Number(row2[i]));
  }
  wear = getIEEE754(((getIEEE754(wear/getIEEE754(10)))*getIEEE754(r1max-r1min))+r1min);

  for (let i = 0; i < types.length; i++) {
    if (floats[0].value == "") {
      floats[0].value = "This order: " + wear + " Possible outcomes: " + types[i];
    }
    else {
      floats[0].value += " or " + types[i];
    }
  }
  document.getElementById("fpGo").style.backgroundColor = "#22c722";
}
