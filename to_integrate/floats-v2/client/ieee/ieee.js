import socket from '../util/socket/socket';
import * as util from '../util/shared';

export default {
  data: function() {
    return {
      inputFloat: '0.0123456789',
      outputFloat: ''
    };
  },
  mounted: function() {
    this.inputFloat = 0.0123456789;
  },
  watch: {
    inputFloat: function(value) {
      try {
        this.outputFloat = util.getIEEE754(Number(this.inputFloat));
      }catch {
        alert('Something went wrong. Make sure you have entered a proper float/decimal.');
      }
    }
  }
}
