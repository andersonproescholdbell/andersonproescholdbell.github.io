import socket from '../util/socket/socket';
import * as util from '../util/shared';

export default {
  data: function() {
    return {
      searchTerm: '',
      floatData: [],
      skins: [],
      addedSkins: [],
      float: '',
      outcomes: '',
      outcomesHidden: true,
      color: true,
      itemData: [],
      priceData: {},
      rarityRankings: {},
      tradeupRarity: ''
    };
  },
  methods: {
    //fill this.skins
    addSkins: function() {
      this.skins = [];
      for (var i = 0; i < this.itemData.length; i++) {
        if (this.itemData[i].highestRarity == false) {
          var rarity = this.itemData[i].rarity.split(' ')[0].toLowerCase();
          this.skins.push({skin: this.itemData[i].name, hidden: false, rarity: rarity, disabled: false, minWear: this.itemData[i].minWear, maxWear: this.itemData[i].maxWear});
        }
      }
      this.skins = this.skins.sort(util.dynamicSort('skin'));
      for (var i = 0; i < this.skins.length; i++) {
        this.skins[i]['index'] = i;
      }
    },
    //search through skins
    search: function() {
      var filter = this.searchTerm.toUpperCase();
      // Loop through all list items, and hide those who don't match the search query
      for (var i = 0; i < this.skins.length; i++) {
        var text = this.skins[i].skin;
        //if list doesn't have to match the rarity of a previously added skin
        if (this.tradeupRarity == false) {
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
        }else {
          if (filter == '') {
            //show all skins of proper rarity
            if (this.skins[i].rarity == this.tradeupRarity) {
              this.skins[i].hidden = false;
              this.skins[i].disabled = false;
            }else {
              this.skins[i].hidden = true;
              this.skins[i].disabled = true;
            }
          }else {
            //show skins with proper rarity and search term
            if (this.skins[i].rarity == this.tradeupRarity && text.toUpperCase().indexOf(filter) > -1) {
              this.skins[i].hidden = false;
              this.skins[i].disabled = false;
            }else {
              this.skins[i].hidden = true;
              this.skins[i].disabled = true;
            }
          }
        }
      }
    },
    //when skin added only show skins of that rarity
    addSkin: function(index) {
      if (this.addedSkins.length < 10) {
        //adding data to be referenced in html
        var addFrom = this.skins[index];
        var toAdd = {skin: addFrom.skin, rarity: addFrom.rarity, floatPlaceholder: '', float: '',
                     minWear: Number(addFrom.minWear), maxWear: Number(addFrom.maxWear)};
        var skinData = util.findSkin(toAdd.skin, this.itemData);
        toAdd.floatPlaceholder = skinData.minWear + '-' + skinData.maxWear + ' or inspect link';
        this.tradeupRarity = toAdd.rarity;
        this.addedSkins.push(toAdd);

        for (var i = 0; i < this.skins.length; i++) {
          if (this.skins[i].rarity != this.tradeupRarity) {
            this.skins[i].hidden = true;
            this.skins[i].disabled = true;
          }
        }
      }
    },
    //remove skin
    removeSkin: function(index) {
      this.addedSkins.splice(index, 1);
    },
    //clear added floats and outcomes
    resetAll: function() {
      this.addedSkins = [];
      this.searchTerm = '';
      this.search();
      this.outcomesHidden = true;
      this.outcomes = '';
    },
    //get prices of inputted skins
    getPrices: function(outcomes) {
      const skinNamesAndFloats = this.getSkinNamesAndFloats();
      //removing outcome duplicates
      var newOutcomes = [];
      for (var i = 0; i < outcomes.length; i++) {
        if (!newOutcomes.includes(outcomes[i].name)) {
          newOutcomes.push(outcomes[i].name)
        }
      }
      //getting prices of skins in tradeup
      var used = [];
      var skinsData = {};
      for (var i = 0; i < skinNamesAndFloats.length; i++) {
        var skinName = skinNamesAndFloats[i].name + ' ' + util.determineWear(skinNamesAndFloats[i].float);
        if (!used.includes(skinName)) {
          used.push(skinName);
          skinsData[skinName] = util.getPrice(this.priceData, skinName);
        }
      }
      //getting prices of all possible outcomes
      const rarities = ['(Battle-Scarred)', '(Well-Worn)', '(Field-Tested)', '(Minimal Wear)', '(Factory New)'];
      for (var i = 0; i < newOutcomes.length; i++) {
        if (!used.includes(newOutcomes[i])) {
          used.push(newOutcomes[i]);
          for (var j = 0; j < rarities.length; j++) {
            var skinName = newOutcomes[i] + ' ' + rarities[j];
            var tempPrice = util.getPrice(this.priceData, skinName);
            if (tempPrice !== undefined) {
              skinsData[skinName] = tempPrice;
            }
          }
        }
      }
      return skinsData;
    },
    //get names and floats from page
    getSkinNamesAndFloats: function() {
      var skinNamesAndFloats = [];
      //going through all gun and skin selections
      for (var i = 0; i < this.addedSkins.length; i++) {
        var tempObj = this.addedSkins[i];
        //making sure floats or inspect links are entered
        if (util.isFloat(Number(tempObj.float)) || Number(tempObj.float) == 0 || Number(tempObj.float) == 1 || tempObj.float.startsWith('steam://')) {
          var skinName = tempObj.skin;
          var skinFloat = tempObj.float;
          skinNamesAndFloats.push({name: skinName, float: skinFloat});
        }
      }
      return skinNamesAndFloats;
    },
    go: function() {
      var skinNamesAndFloats = this.getSkinNamesAndFloats();
      //making sure there are 10 floats otherwise one did not match criteria
      if (skinNamesAndFloats.length == 10) {
        var skinNames = [];
        for (var i = 0; i < 10; i++) {
          skinNames.push(skinNamesAndFloats[i].name);
        }

        //determining possible outcome skins (not wears)
        var outcomes = [],
            skinData = [];
        for (var i = 0; i < skinNames.length; i++) {
          var skin = util.findSkin(skinNames[i], this.itemData);
          skinData.push(skin);
          var outcome = util.findOutcomes(skin.case, skin.rarity, this.itemData, this.rarityRankings);
          for (var j = 0; j < outcome.length; j++) {
            outcomes.push(outcome[j]);
          }
        }

        //ready to determine chances and prices etc
        this.tradeupOutcomes(outcomes);
      }else {
        alert('Make sure you have added 10 skins and have added floats or inspect links for each.');
      }
    },
    tradeupOutcomes: async function(outcomes) {
      //tradeup outcomes have been determined
      var floatArr = [],
          inspectArr = [];

      for (var i = 0; i < this.addedSkins.length; i++) {
        //getting floats of inspect links
        if (String(this.addedSkins[i].float).startsWith('steam://')) {
          inspectArr.push({url: ('https://api.csgofloat.com/?url=' + String(this.addedSkins[i].float)), index: i});
        }else {
          floatArr.push(Number(this.addedSkins[i].float));
        }
      }
      inspectArr.push(floatArr);
      inspectArr.push(outcomes);

      socket.emit('JSONreq', inspectArr);
    },
    //after getting csgofloat data
    tradeupOutcomes2: async function(data) {
      var floatArr = data[data.length-2],
          outcomes = data[data.length-1],
          errors = 0;

      for (var i = 0; i < data.length; i++) {
        if (data[i].constructor.toString().indexOf("Array") == -1) {
          try {
            var tempFloat = data[i].jsonres.iteminfo.floatvalue;
            floatArr.push(tempFloat);
            this.addedSkins[data[i].index].float = tempFloat;
          }catch {
            //didn't get a jsonres for one of the skins
            errors++;
          }
          await util.sleep(100);
        }
      }

      if (errors == 0) {
        //making sure all floats are within proper range
        var badFloat = '';
        for (var i = 0; i < floatArr.length; i++) {
          if (floatArr[i] > Number(this.addedSkins[i].maxWear) || floatArr[i] < Number(this.addedSkins[i].minWear)) {
            badFloat = this.addedSkins[i].skin;
          }
        }

        if (badFloat == '') {
          var skins = {};
          for (var i = 0; i < outcomes.length; i++) {
            if (outcomes[i].name in skins) {
              skins[outcomes[i].name].total++;
            }else {
              skins[outcomes[i].name] = outcomes[i];
              skins[outcomes[i].name].total = 1;
            }
          }
          var totalOutcomes = Object.keys(outcomes).length,
              chances = {},
              keys = Object.keys(skins);
          for (var i = 0; i < keys.length; i++) {
            var tempItem = skins[keys[i]];
            chances[tempItem.name] = {
              percent: ((tempItem.total/totalOutcomes)*100).toFixed(2) + '%',
              wear: util.getWear(util.getIEEE754(tempItem.minWear), util.getIEEE754(tempItem.maxWear), floatArr)
            }
          }

          const skinNamesAndFloats = this.getSkinNamesAndFloats();
          var skinPrices = this.getPrices(outcomes)
          var price = 0;
          for (var i = 0; i < skinNamesAndFloats.length; i++) {
            var skinName = skinNamesAndFloats[i].name + ' ' + util.determineWear(skinNamesAndFloats[i].float);
            price += skinPrices[skinName];
          }
          var expPrice = 0,
              profit = 0,
              chancesStr = '';
          for (var key in chances) {
          	var obj = chances[key],
                name = key + ' ' + util.determineWear(obj.wear),
                tempPrice = skinPrices[name];
          	expPrice += parseFloat(obj.percent) / 100 * tempPrice;
            chancesStr += obj.percent + ' ' + name + ' ' + obj.wear + ' $' + tempPrice + '\n';
            if (tempPrice > price) {
              profit += parseFloat(obj.percent);
            }
          }

          var preText = 'Tradeup if skins are inputted into csgo from top to bottom\n\n',
              return1 = '\nExpected return item per tradeup: $' + expPrice.toFixed(2),
              return100 = ((expPrice*100)-(price*100)).toFixed(2),
              return2,
              profit = '\n' + profit + '% chance of profit',
              notice = '\n\nNote: these expected returns are based on the average weekly price of these ';
          notice += 'items. If you actually tried to do 100 tradeups, the supply pool of materials would ';
          notice += 'diminish and thus the cost of tradeups would be higher.';
          if (return100 < 0) {
            return2 = '\nExpected return on 100 tradeups: -$' + Math.abs(return100) + ' (loss)';
          }else {
            return2 = '\nExpected return on 100 tradeups: $' + Math.abs(return100) + ' (profit)';
          }
          price = '\nExpected total price per tradeup: $' + price.toFixed(2);
          this.outcomes = preText + chancesStr + price + return1 + profit + return2 + notice;
          this.outcomesHidden = false;
        }else {
          alert('Inputted skin ' + badFloat + ' has a float that is not in its possible range.');
        }
      }else {
        alert('It looks like we were unable to get the float of one of your inspect links.\nPlease try again or find the float yourself.');
      }
    }

  },
  mounted: function() {
    //set data
    this.itemData = this.$store.state.itemData;
    this.addSkins();
    this.rarityRankings = this.$store.state.rarityRankings;
    var waitForData = setInterval(() => {
      if (Object.keys(this.$store.state.priceData).length > 0) {
        console.log('set price data');
        this.priceData = this.$store.state.priceData;
        clearInterval(waitForData);
      }
    }, (1000));

    //correct skinslist scrolling
    document.getElementById('searchList').style.height = (window.innerHeight-75) + 'px';

    //getting json from server for inspect urls
    socket.on('JSONres', (data) => {
      this.tradeupOutcomes2(data);
    });
  },
  watch: {
    searchTerm: function () {
      this.search();
    }
  }
}
