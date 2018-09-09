
function wear_data() {
  const max_wear = getIEEE754(Number(document.getElementById('tfMaxWearInput').value));
  const min_wear = getIEEE754(Number(document.getElementById('tfMinWearInput').value));
  const desired_float = getIEEE754(Number(document.getElementById('tfDesiredFloatInput').value));
  const float_inputs = document.getElementsByClassName('tfFloats');

  var float_list = [];
  let inputted = 0;
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum = getIEEE754(sum + Number(float_inputs[i].value));
    float_list.push(getIEEE754(Number(float_inputs[i].value)));
    if (Number(float_inputs[i].value) !== 0) {
      inputted ++;
    }
  }

  const output_wear = getIEEE754(((getIEEE754(sum/getIEEE754(10)))*getIEEE754(max_wear-min_wear))+min_wear);
  const needed_average = (desired_float-min_wear)/(max_wear-min_wear);
  const current_average = sum / 10;
  const avg_of_inputted = sum / inputted;

  let new_average_needed = 0;
  if (needed_average > 0) {
    if (inputted > 0 && inputted < 10) {
      new_average_needed = ((10 * needed_average) - sum)/(10-inputted);
    }
    else {
      if (inputted === 10) {
        new_average_needed = 0;
      }
      if (inputted === 0 || sum === 0) {
        new_average_needed = needed_average;
      }
    }
  }
  return [output_wear, needed_average, avg_of_inputted, new_average_needed, inputted];
}

function tfUpdateOutputs() {
  var values = wear_data();
  document.getElementById("tfOutputFloatInput").value = values[0];
  document.getElementById("tfNeededAverageInput").value = values[1];
  document.getElementById("tfCurrentAverageInput").value = values[2];
  document.getElementById("tfNewAverageNeededInput").value = values[3];
  document.getElementById('tfOutputFloatsText').innerHTML = "Current Output Wear " + values[4] + "/10 Floats";
  if (isNaN(values[2])) {
    document.getElementById('tfCurrentAverageText').innerHTML = "Current Average of 0 Floats";
  }
  else {
    document.getElementById('tfCurrentAverageText').innerHTML = "Current Average of " + values[4] + " Floats";
  }
}
