export function findSkin(name, itemData) {
  for (var i = 0; i < itemData.length; i++) {
    if (itemData[i].name == name) {
      return itemData[i];
    }
  }
}

export function getPrice(priceData, skin) {
  try {
    return priceData[skin].price['7_days'].average;
  }catch {
    try {
      return priceData[skin].price['30_days'].average;
    }catch {
      try {
        return priceData[skin].price['all_time'].average;
      }catch {
        return undefined;
      }
    }
  }

}

export function findMaterials(skinCase, skinRarity, itemData, rarityRankings) {
  var materials = [];
  for (var i = 0; i < itemData.length; i++) {
    if (itemData[i].case == skinCase && rarityRankings[itemData[i].rarity.split(' ')[0]] == (rarityRankings[skinRarity.split(' ')[0]]-1)) {
      materials.push(itemData[i]);
    }
  }
  return materials;
}

export function findOutcomes(skinCase, skinRarity, itemData, rarityRankings) {
  var outcomes = [];
  for (var i = 0; i < itemData.length; i++) {
    if (itemData[i].case == skinCase && rarityRankings[itemData[i].rarity.split(' ')[0]] == (rarityRankings[skinRarity.split(' ')[0]]+1)) {
      outcomes.push(itemData[i]);
    }
  }
  return outcomes;
}

export function skinColor(rarity) {
  rarity = rarity.toLowerCase();
  if (rarity == 'consumer') {
    return '#c0c0c0';
  }else if (rarity == 'industrial') {
    return '#99ccff';
  }else if (rarity == 'mil-spec') {
    return '#0000ff';
  }else if (rarity == 'restricted') {
    return '#800080';
  }else if (rarity == 'classified') {
    return '#ff00ff';
  }else if (rarity == 'covert') {
    return '#ff0000';
  }
}

export function dynamicSort(property) {
  var sortOrder = 1;
  if(property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a,b) {
    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result * sortOrder;
  }
}

export function isFloat(n){
  return Number(n) === n && n % 1 !== 0;
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getIEEE754(x) {
  x = Number(x);
  var float = new Float32Array(1);
  float[0] = x;
  return float[0];
}

export function factorial(n) {
  if (n==0 || n==1) {
    return 1;
  }
  return factorial(n-1)*n;
}

export function getWear(min_wear, max_wear, arr) {
  var wear = 0;
  for (var i = 0; i < 10; i++) {
    wear = getIEEE754(wear + arr[i]);
  }
  return getIEEE754(((getIEEE754(wear/getIEEE754(10)))*getIEEE754(max_wear-min_wear))+min_wear);
}

export function determineWear(float) {
  if (float >= 0.45) {
    return '(Battle-Scarred)';
  }else if (float >= 0.38) {
    return '(Well-Worn)';
  }else if (float >= 0.15) {
    return '(Field-Tested)';
  }else if (float >= 0.07) {
    return '(Minimal Wear)';
  }else {
    return '(Factory New)';
  }
}

export async function getJSON(url) {
  const proxy = 'https://cors-anywhere.herokuapp.com/';

  function loadInfo(url) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.onreadystatechange = function onreadystatechange() {
        if (this.readyState === 4) {
          if (this.status >= 200 && this.status < 400) {
            resolve(this.responseText);
          }
          else {
            reject(new Error(`Error ${this.status}`));
            alert("There was an issue, please try again.");
          }
        }
      };
      request.send();
    });
  }
  const apiData = await loadInfo(proxy+url);

  return JSON.parse(apiData);
}
