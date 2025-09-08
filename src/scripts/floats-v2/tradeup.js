import * as util from './shared.js';
import { store } from './store.js';

export class TradeupCalculator {
  constructor() {
    this.data = {
      searchTerm: '',
      floatData: [],
      skins: [],
      addedSkins: [],
      float: '',
      outcomes: '',
      outcomesHidden: true,
      color: true,
      itemData: store.getItemData(),
      priceData: store.getPriceData(),
      rarityRankings: store.getRarityRankings(),
      tradeupRarity: ''
    };
    
    this.init();
  }

  init() {
    this.addSkins();
  }

  // Fill this.data.skins
  addSkins() {
    this.data.skins = [];
    for (var i = 0; i < this.data.itemData.length; i++) {
      if (this.data.itemData[i].highestRarity == false) {
        var rarity = this.data.itemData[i].rarity.split(' ')[0].toLowerCase();
        this.data.skins.push({
          skin: this.data.itemData[i].name,
          hidden: false,
          rarity: rarity,
          disabled: false,
          minWear: this.data.itemData[i].minWear,
          maxWear: this.data.itemData[i].maxWear
        });
      }
    }
    this.data.skins = this.data.skins.sort(util.dynamicSort('skin'));
    for (var i = 0; i < this.data.skins.length; i++) {
      this.data.skins[i]['index'] = i;
    }
  }

  // Search through skins
  search() {
    var filter = this.data.searchTerm.toUpperCase();
    for (var i = 0; i < this.data.skins.length; i++) {
      var text = this.data.skins[i].skin;
      
      if (this.data.tradeupRarity == false || this.data.tradeupRarity === '') {
        if (filter == '') {
          this.data.skins[i].hidden = false;
          this.data.skins[i].disabled = false;
        } else {
          if (text.toUpperCase().indexOf(filter) == -1) {
            this.data.skins[i].hidden = true;
            this.data.skins[i].disabled = true;
          } else {
            this.data.skins[i].hidden = false;
            this.data.skins[i].disabled = false;
          }
        }
      } else {
        if (filter == '') {
          if (this.data.skins[i].rarity == this.data.tradeupRarity) {
            this.data.skins[i].hidden = false;
            this.data.skins[i].disabled = false;
          } else {
            this.data.skins[i].hidden = true;
            this.data.skins[i].disabled = true;
          }
        } else {
          if (this.data.skins[i].rarity == this.data.tradeupRarity && text.toUpperCase().indexOf(filter) > -1) {
            this.data.skins[i].hidden = false;
            this.data.skins[i].disabled = false;
          } else {
            this.data.skins[i].hidden = true;
            this.data.skins[i].disabled = true;
          }
        }
      }
    }
  }

  // Add skin to tradeup
  addSkin(index) {
    if (this.data.addedSkins.length < 10) {
      var addFrom = this.data.skins[index];
      var toAdd = {
        skin: addFrom.skin,
        rarity: addFrom.rarity,
        floatPlaceholder: '',
        float: '',
        minWear: Number(addFrom.minWear),
        maxWear: Number(addFrom.maxWear)
      };
      var skinData = util.findSkin(toAdd.skin, this.data.itemData);
      toAdd.floatPlaceholder = skinData.minWear + '-' + skinData.maxWear + ' or inspect link';
      this.data.tradeupRarity = toAdd.rarity;
      this.data.addedSkins.push(toAdd);

      for (var i = 0; i < this.data.skins.length; i++) {
        if (this.data.skins[i].rarity != this.data.tradeupRarity) {
          this.data.skins[i].hidden = true;
          this.data.skins[i].disabled = true;
        }
      }
    }
  }

  // Remove skin
  removeSkin(index) {
    this.data.addedSkins.splice(index, 1);
    if (this.data.addedSkins.length === 0) {
      this.data.tradeupRarity = '';
      this.search(); // Reset search to show all skins
    }
  }

  // Clear all
  resetAll() {
    this.data.addedSkins = [];
    this.data.searchTerm = '';
    this.data.tradeupRarity = '';
    this.search();
    this.data.outcomesHidden = true;
    this.data.outcomes = '';
  }

  // Get skin names and floats
  getSkinNamesAndFloats() {
    var skinNamesAndFloats = [];
    for (var i = 0; i < this.data.addedSkins.length; i++) {
      var tempObj = this.data.addedSkins[i];
      if (util.isFloat(Number(tempObj.float)) || Number(tempObj.float) == 0 || Number(tempObj.float) == 1) {
        var skinName = tempObj.skin;
        var skinFloat = tempObj.float;
        skinNamesAndFloats.push({name: skinName, float: skinFloat});
      }
    }
    return skinNamesAndFloats;
  }

  // Main calculation function
  go() {
    var skinNamesAndFloats = this.getSkinNamesAndFloats();
    
    if (skinNamesAndFloats.length == 10) {
      var skinNames = [];
      for (var i = 0; i < 10; i++) {
        skinNames.push(skinNamesAndFloats[i].name);
      }

      // Determining possible outcome skins
      var outcomes = [],
          skinData = [];
      for (var i = 0; i < skinNames.length; i++) {
        var skin = util.findSkin(skinNames[i], this.data.itemData);
        skinData.push(skin);
        var outcome = util.findOutcomes(skin.case, skin.rarity, this.data.itemData, this.data.rarityRankings);
        for (var j = 0; j < outcome.length; j++) {
          outcomes.push(outcome[j]);
        }
      }

      this.tradeupOutcomes(outcomes, skinNamesAndFloats);
    } else {
      alert('Make sure you have added 10 skins and have added floats for each.');
    }
  }

  // Calculate tradeup outcomes (simplified without server calls)
  tradeupOutcomes(outcomes, skinNamesAndFloats) {
    var floatArr = [];
    
    for (var i = 0; i < this.data.addedSkins.length; i++) {
      floatArr.push(Number(this.data.addedSkins[i].float));
    }

    // Check float ranges
    var badFloat = '';
    for (var i = 0; i < floatArr.length; i++) {
      if (floatArr[i] > Number(this.data.addedSkins[i].maxWear) || floatArr[i] < Number(this.data.addedSkins[i].minWear)) {
        badFloat = this.data.addedSkins[i].skin;
      }
    }

    if (badFloat == '') {
      var skins = {};
      for (var i = 0; i < outcomes.length; i++) {
        if (outcomes[i].name in skins) {
          skins[outcomes[i].name].total++;
        } else {
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

      var chancesStr = 'Tradeup if skins are inputted into csgo from top to bottom\n\n';
      for (var key in chances) {
        var obj = chances[key],
            name = key + ' ' + util.determineWear(obj.wear);
        chancesStr += obj.percent + ' ' + name + ' ' + obj.wear + '\n';
      }
      
      chancesStr += '\nNote: Price data functionality has been removed in this client-only version.';
      
      this.data.outcomes = chancesStr;
      this.data.outcomesHidden = false;
    } else {
      alert('Inputted skin ' + badFloat + ' has a float that is not in its possible range.');
    }
  }
}