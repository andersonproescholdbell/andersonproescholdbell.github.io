import * as util from '/scripts/floats-v2/shared.js';

export class SimpleTradeupCalculator {
  constructor() {
    this.data = {
      skins: [],
      info: [],
      calcs: []
    };
    
    this.populate();
    this.calculate();
  }

  populate() {
    // 10 skin float inputs
    for (var i = 0; i < 10; i++) {
      this.data.skins.push({float: ''});
    }
    
    // Info inputs
    this.data.info.push({ph: 'Enter max wear', entered: '1.00'});
    this.data.info.push({ph: 'Enter min wear', entered: '0.00'});
    this.data.info.push({ph: 'Desired float', entered: '0.50'});

    // Calculation outputs
    this.data.calcs.push({ph: 'Current Output Wear 0/10 Floats', comp: ''});
    this.data.calcs.push({ph: 'Needed Average for Desired Float', comp: ''});
    this.data.calcs.push({ph: 'Current Average of 0 Floats', comp: ''});
    this.data.calcs.push({ph: 'Average of Last Float(s) Needed', comp: ''});
  }

  calculate() {
    var floatsList = [],
        inputted = 0,
        sum = 0;

    for (var i = 0; i < 10; i++) {
      if (this.data.skins[i].float !== '') {
        floatsList.push(Number(this.data.skins[i].float));
        inputted++;
      } else {
        floatsList.push(0);
      }
      sum += Number(this.data.skins[i].float);
    }
    
    var maxWear = Number(this.data.info[0].entered),
        minWear = Number(this.data.info[1].entered),
        desiredFloat = Number(this.data.info[2].entered);

    this.data.calcs[0].ph = 'Current Output Wear ' + inputted + '/10 Floats';
    if (sum > 0) {
      this.data.calcs[0].comp = util.getWear(util.getIEEE754(minWear), util.getIEEE754(maxWear), floatsList);
    } else {
      this.data.calcs[0].comp = 0;
    }

    this.data.calcs[1].comp = (desiredFloat - minWear) / (maxWear - minWear);

    this.data.calcs[2].ph = 'Current Average of ' + inputted + ' Floats';
    this.data.calcs[2].comp = inputted > 0 ? sum / inputted : 0;

    var avgNeeded = 0,
        neededAvg = Number(this.data.calcs[1].comp);
    if (neededAvg > 0) {
      if (inputted > 0 && inputted < 10) {
        avgNeeded = ((10 * neededAvg) - sum) / (10 - inputted);
      } else {
        if (inputted === 10) {
          avgNeeded = 0;
        }
        if (inputted === 0 || sum === 0) {
          avgNeeded = neededAvg;
        }
      }
    }
    this.data.calcs[3].comp = avgNeeded;
  }

  updateSkinFloat(index, value) {
    this.data.skins[index].float = value;
    this.calculate();
  }

  updateInfo(index, value) {
    this.data.info[index].entered = value;
    this.calculate();
  }
}