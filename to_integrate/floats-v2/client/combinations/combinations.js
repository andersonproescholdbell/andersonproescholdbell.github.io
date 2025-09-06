import socket from '../util/socket/socket';
import * as util from '../util/shared';

export default {
  data: function() {
    return {
      itemData: [],
      priceData: {},
      rarityRankings: {},
      searchTerm: '',
      skins: [],
      addedSkin: {},
      hideSkin: true,
      floatData: [],
      done: false,
      userFloat: '',
      floatPlaceholder: '',
      wantedSkin: '',
      neededAvgData: '',
      whatToBuyData: '',
      scmLinks: {},
      specificityPlaceholder: '[optional] Outcome must start with (ex. 0.012345)',
      specificity: '',
      floatInputData: '',
      combosOutputData: '',
      showDataData: '',
      lvl2Hidden: true,
      lvl3Hidden: true,
    };
  },
  methods: {
    //fill this.skins
    addSkins: function() {
      this.skins = [];
      for (var i = 0; i < this.itemData.length; i++) {
        if (this.itemData[i].lowestRarity == false) {
          var rarity = this.itemData[i].rarity.split(' ')[0].toLowerCase();
          this.skins.push({skin: this.itemData[i].name, hidden: false, rarity: rarity, disabled: false});
        }
      }
      this.skins = this.skins.sort(util.dynamicSort('skin'));
      for (var i = 0; i < this.skins.length; i++) {
        this.skins[i]['index'] = i;
      }
    },
    //select singular skin to craft
    addSkin: function(index) {
      var toAdd = this.skins[index];
      var skinData = util.findSkin(toAdd.skin, this.itemData);
      this.floatPlaceholder = skinData.minWear + '-' + skinData.maxWear + ' or inspect link';;
      this.addedSkin = toAdd;
      this.hideSkin = false;
      this.combosOutputData = '';
      this.floatInputData = '';
      this.specificity = '';
      this.showDataData = '';
      this.lvl2Hidden = true;
      this.lvl3Hidden = true;
      this.scmLinks = [];
    },
    //remove the skin
    removeSkin: function() {
      this.addedSkin = {};
      this.userFloat = '';
      this.hideSkin = true;
      this.combosOutputData = '';
      this.floatInputData = '';
      this.specificity = '';
      this.showDataData = '';
      this.lvl2Hidden = true;
      this.lvl3Hidden = true;
      this.scmLinks = [];
    },
    //search through skins
    search: function() {
      var filter = this.searchTerm.toUpperCase();
      // Loop through all list items, and hide those who don't match the search query
      for (var i = 0; i < this.skins.length; i++) {
        var text = this.skins[i].skin;
        //if list doesn't have to match the rarity of a previously added skin
        if (filter == '') {
          this.skins[i].hidden = false;
          this.skins[i].disabled = false;
        }else {
          //if skin name does not match search
          if (text.toUpperCase().indexOf(filter) == -1) {
            this.skins[i].hidden = true;
            this.skins[i].disabled = true;
          }else {
            this.skins[i].hidden = false;
            this.skins[i].disabled = false;
          }
        }
      }
    },
    //reset everything
    resetAll: function() {
      this.searchTerm = '';
      this.addedSkin = {};
      this.userFloat = '';
      this.hideSkin = true;
      this.combosOutputData = '';
      this.floatInputData = '';
      this.specificity = '';
      this.showDataData = '';
      this.lvl2Hidden = true;
      this.lvl3Hidden = true;
      this.scmLinks = [];
      util.sleep(100);
    },
    //alert data associated with number
    showData: function() {
      alert('Combination ' + this.showDataData + '--' + this.floatData[Number(this.showDataData)]);
    },
    //when stopBtn clicked, stop generating combos
    stopGeneration: async function() {
      this.done = true;
      await util.sleep(100);
      alert('Done.');
    },
    //when go clicked, check if gun, skin, and float data are correct
    go: function() {
      //if gun, skin, and float are correct
      if ((util.isFloat(Number(this.userFloat)) || Number(this.userFloat) == 1 || Number(this.userFloat == 0)) && this.selectedSkin != 'Select a skin' && this.selectedGun != 'Select a gun') {
        var skin = util.findSkin(this.addedSkin.skin, this.itemData);
        this.wantedSkin = skin;
        if (skin.lowestRarity == true) {
          alert('The ' + skin.name + ' is a ' + skin.rarity.split(' ')[0] + ' skin which is the lowest rarity in ' + skin.case + ' so it cannot be crafted');
          this.userFloat = '';
        }else if (Number(this.userFloat) > skin.maxWear) {
          alert('The max float for ' + skin.name + ' is ' + skin.maxWear);
          this.floatPlaceholder = skin.minWear + '-' + skin.maxWear;
        }else if (Number(this.userFloat) < skin.minWear) {
          alert('The min float for ' + skin.name + ' is ' + skin.minWear);
          this.floatPlaceholder = skin.minWear + '-' + skin.maxWear + ' or inspect link';
        }else {
          this.userFloat = util.getIEEE754(parseFloat(this.userFloat));
          var materials = util.findMaterials(skin.case, skin.rarity, this.itemData, this.rarityRankings);
          this.combinationsMaterials(materials, skin);
        }
      }else {
        alert('Please choose a gun and a skin and enter a valid float (0-1)');
      }
    },
    //when genCombosBtn clicked, check data and proceed to calculations
    checkDataBeforeCombos: async function() {
      var newSpec = Number(this.specificity);
      if (!isNaN(newSpec)) {
        if (this.floatInputData.startsWith('Enter in') == false) {
          const floatData = this.floatInputData.split('\n');
          var allData = {};
          var allFloats = [];
          for (var i = 0; i < floatData.length; i++) {
            var tempData;
            if (floatData[i].includes('++')) {
              tempData = floatData[i].split('++');
            }else {
              tempData = [floatData[i]];
            }
            if (util.isFloat(parseFloat(tempData[0])) || parseFloat(tempData[0]) == 1 || parseFloat(tempData[0]) == 0 || tempData[0].startsWith('steam://')) {
              try {
                if (tempData[0].startsWith('steam://')) {
                  var tempFloat = await util.getJSON('https://api.csgofloat.com/?url=' + tempData[0]);
                  allFloats.push(util.getIEEE754(tempFloat.iteminfo.floatvalue));
                  this.floatInputData = this.floatInputData.replace(tempData[0], tempFloat.iteminfo.floatvalue);
                }else {
                  var tempFloat = String(util.getIEEE754(parseFloat(tempData[0])));
                  allFloats.push(util.getIEEE754(parseFloat(tempData[0])));
                }
                if (tempData.length == 3) {
                  allData[tempFloat] = {
                    skin:tempData[1],
                    price:parseFloat(tempData[2])
                  };
                }else if (tempData.length == 2) {
                  if (util.isFloat(Number(tempData[1]))) {
                    allData[tempFloat] = {
                      skin:null,
                      price:parseFloat(tempData[1])
                    };
                  }else {
                    allData[tempFloat] = {
                      skin:tempData[1],
                      price:null
                    };
                  }
                }else if (tempData.length == 1) {
                  allData[tempFloat] = {
                    skin:null,
                    price:null
                  };
                }
              }catch(error) {
                alert('There was an error with float data. Please try again.');
              }
            }
          }
          if (allFloats.length < 10) {
            alert('Please enter 10+ valid floats or inspect links');
          }else {
            this.combosOutputData = '';
            this.showDataData = '';
            util.sleep(100);
            this.genCombos(allFloats, allData);
            this.lvl3Hidden = false;
          }
        }else {
          alert('Please enter 10+ valid floats or inspect links');
        }
      }else {
        alert('Something is wrong with the "[optional] Outcome must start with (ex. 0.012345)" box.');
      }
    },
    genCombos: async function(arr, allData) {
      const max_wear = util.getIEEE754(this.wantedSkin.maxWear),
        min_wear = util.getIEEE754(this.wantedSkin.minWear),
        desired_ieee = util.getIEEE754(this.userFloat),
        wantedFloat = Number(this.userFloat),
        total_combos = Math.round( util.factorial(arr.length) / (util.factorial(10) * (util.factorial(arr.length-10))) );
      var rows = [],
        positions = [],
        progress = 0,
        increment = 0,
        notAdded = [],
        added = 0,
        start = String(this.specificity),
        startlen = start.length;
      if (total_combos < 1000000000) {
        increment = 100000;
        if (total_combos < 100000000) {
          increment = 10000;
        }
        if (total_combos < 10000000) {
          increment = 1000;
        }
        if (total_combos < 1000000) {
          increment = 1000;
        }
      }else {
        increment = 1000000;
      }

      for (let i = 0; i < 10; i++) {
        const copy = arr.slice(0);
        rows.push(copy);
        positions.push(i);
      }

      this.done = false;
      while (this.done == false) {
        var combo = [];
        for (var row = 0; row < rows.length; row++) {
          combo.push(rows[row][positions[row]]);
        }

        var undefinedCount = 0;
        for (var i = 0; i < combo.length; i++) {
          if (combo[i] === undefined) {
            undefinedCount++;
          }
        }
        if (undefinedCount >= 10) {
          await util.sleep(100);
          alert('Done.');
          this.done = true;
        }

        if (combo.indexOf(undefined) < 0) {
          var wear = 0;
          for (var i = 0; i < 10; i++) {
            wear = util.getIEEE754(wear + combo[i]);
          }
          wear = String(util.getIEEE754(((util.getIEEE754(wear/util.getIEEE754(10)))*util.getIEEE754(max_wear-min_wear))+min_wear));
          if (wear.length < 12) {
            wear += '0'.repeat(15-wear.length);
          }
          if (start == wear.substring(0,startlen)) {
            notAdded.push(added + ': ' + wear + '\n');
            var tempStr = '';
            var tempPrice = 0;
            for (var i = 0; i < 10; i++) {
              var tempData = allData[String(combo[i])];
              if (tempData.price != null && tempData.skin != null) {
                tempStr += combo[i] + ' (' + tempData.skin + ', ' + tempData.price + ')';
                tempPrice += Number(tempData.price);
              }else if (tempData.skin != null) {
                tempStr += combo[i] + ' (' + tempData.skin + ')';
              }else if (tempData.price != null) {
                tempStr += combo[i] + ' (' + tempData.price + ')';
                tempPrice += Number(tempData.price);
              }else if (tempData.price == null && tempData.skin == null) {
                tempStr += combo[i];
              }
              if (i != 9) {
                tempStr += ',\n';
              }
            }
            this.floatData.push(' Total Price: ' + tempPrice.toFixed(2) + '\n' + tempStr);
            added++;
          }
          progress++;
          if (progress%increment === 0) {
            for (var i = 0; i < notAdded.length; i++) {
              this.combosOutputData += notAdded[i];
            }
            notAdded = [];
            await util.sleep(10);
          }
          if (progress == total_combos) {
            for (var i = 0; i < notAdded.length; i++) {
              this.combosOutputData += notAdded[i];
            }
            notAdded = [];
            await util.sleep(100);
            alert('Done.');
            this.done = true;
          }
        }
        positions[rows.length - 1]++;
        for (var a = positions.length - 1; a >= 0; a -= 1) {
          if (positions[a] >= arr.length) {
            positions[a - 1]++;
            for (var b = a; b < positions.length; b++) {
              positions[b] = positions[b - 1] + 1;
            }
          }
        }
      }
    },
    //after the 'material' (tier below) for a skin have been found from server, populate page with links to those skins and their ranges
    combinationsMaterials: function(materials, skin) {
      const needed_average = (this.userFloat-skin.minWear)/(skin.maxWear-skin.minWear);
      const userSkin = this.wantedSkin.name;
      this.neededAvgData = 'The average float of 10 skins you need is ' + needed_average + ' to get a ' + this.userFloat + ' ' + userSkin + '.';
      this.whatToBuyData = 'Look at the following skins for combinations of floats that are close to your needed average (all Stattrak for a Stattrak tradeups or all normal for a normal tradeup).';
      this.scmLinks = {};
      //adding scm links and wear ranges
      for (var i = 0; i < materials.length; i++) {
        const name = materials[i].name.replace(' |', '').split(' ').join('+');
        this.scmLinks[materials[i].name] = {link: ('https://steamcommunity.com/market/search?appid=730&q=' + name), range: (materials[i].minWear + '-' + materials[i].maxWear)};
      }
      //float data input help text
      this.floatInputData = "Enter in 10-35 floats using the bookmarklets on the help page. A float or inspect link is required, but skin names and prices are optional. Listings can look like any of these:\n\n0.2562786340713501\n0.2562786340713501++AK-47 | Frontside Misty\n0.2562786340713501++12.31\n0.2562786340713501++AK-47 | Frontside Misty++12.31\ninspectlink\ninspectlink++AK-47 | Frontside Misty\ninspectlink++12.31\nninspectlink++AK-47 | Frontside Misty++12.31\n\nOnce inputted, click 'Generate Combinations' to see what floats tradeups would yield.";
      this.lvl2Hidden = false;
    }

  },
  mounted: function() {
    //set data
    this.itemData = this.$store.state.itemData;
    this.addSkins();
    this.priceData = this.$store.state.priceData;
    this.rarityRankings = this.$store.state.rarityRankings;

    //correct skinslist scrolling
    document.getElementById('searchList').style.height = (window.innerHeight-75) + 'px';
  },
  watch: {
    searchTerm: function () {
      this.search();
    }
  }
};
