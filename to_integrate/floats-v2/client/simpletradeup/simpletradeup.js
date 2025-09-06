import socket from '../util/socket/socket';
import * as util from '../util/shared';

export default {
  data: function() {
    return {
      skins: [],
      info: [],
      calcs: []
    };
  },
  methods: {
    //fill this.skins
    populate: function() {
      for (var i = 0; i < 10; i++) {
        this.skins.push({float: ''});
      }
      this.info.push({ph: 'Enter max wear', entered: '1.00'});
      this.info.push({ph: 'Enter min wear', entered: '0.00'});
      this.info.push({ph: 'Desired float', entered: '0.50'});

      this.calcs.push({ph: 'Current Output Wear 0/10 Floats', comp: ''});
      this.calcs.push({ph: 'Needed Average for Desired Float', comp: ''});
      this.calcs.push({ph: 'Current Average of 0 Floats', comp: ''});
      this.calcs.push({ph: 'Average of Last Float(s) Needed', comp: ''});
    },
    //calculations
    calculate: function() {
      var floatsList = [],
          inputted = 0,
          sum = 0;

      for (var i = 0; i < 10; i++) {
        if (this.skins[i].float !== '') {
          floatsList.push(Number(this.skins[i].float));
          inputted++;
        }else {
          floatsList.push(0);
        }
        sum += Number(this.skins[i].float);
      }
      var maxWear = Number(this.info[0].entered),
          minWear = Number(this.info[1].entered),
          desiredFloat = Number(this.info[2].entered);

      this.calcs[0].ph = 'Current Output Wear ' + inputted + '/10 Floats';
      if (sum > 0) {
        this.calcs[0].comp = util.getWear(maxWear, minWear, floatsList);
      }else {
        this.calcs[0].comp = 0;
      }

      this.calcs[1].comp = (desiredFloat-minWear)/(maxWear-minWear);

      this.calcs[2].ph = 'Current Average of ' + inputted + ' Floats';
      this.calcs[2].comp = sum / inputted;

      var avgNeeded = 0,
          neededAvg = Number(this.calcs[1].comp);
      if (neededAvg > 0) {
        if (inputted > 0 && inputted < 10) {
          avgNeeded = ((10*neededAvg) - sum)/(10-inputted);
        }
        else {
          if (inputted === 10) {
            avgNeeded = 0;
          }
          if (inputted === 0 || sum === 0) {
            avgNeeded = neededAvg;
          }
        }
      }
      this.calcs[3].comp = avgNeeded;
    }
  },
  mounted: function() {
    this.populate();
    this.calculate();
  },
};
