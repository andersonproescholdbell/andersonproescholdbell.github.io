function updateIeeeRange() {
  let wanted_float = Number(document.getElementById("desiredIEEEInput").value);
  let wantedIEEE = getIEEE754(wanted_float);
  document.getElementById("floatIEEEInput").value = wantedIEEE;
  //var temp_float = wanted_float;
  var temp_float = wantedIEEE;
  var temp_ieee = wantedIEEE;

  while (temp_ieee == wantedIEEE) {
    temp_float = temp_float - 0.0000000000001;
    temp_ieee = getIEEE754(temp_float);
  }
  let minIEEE = temp_float + 0.0000000000001;
  document.getElementById("minIEEEinput").value = minIEEE;

  //temp_float = wanted_float;
  temp_float = wantedIEEE;
  temp_ieee = wantedIEEE;
  while (temp_ieee == wantedIEEE) {
    temp_float = temp_float + 0.0000000000001;
    temp_ieee = getIEEE754(temp_float);
  }
  let maxIEEE = temp_float - 0.0000000000001;
  document.getElementById("maxIEEEinput").value = maxIEEE;

  document.getElementById("middleIEEE").value = ( (minIEEE + maxIEEE) / 2 );
  if (Number(document.getElementById("minIEEEinput").value) > 0) {
    document.getElementById("middleIEEEinput").value = ( (Number(document.getElementById("minIEEEinput").value) + Number(document.getElementById("maxIEEEinput").value)) / 2 );
  }
}
