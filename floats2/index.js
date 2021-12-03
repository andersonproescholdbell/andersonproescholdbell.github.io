function rarityClass(rarity) {
  switch(rarity) {
    case "Consumer":
      return "bgConsumer";
    case "Industrial":
      return "bgIndustrial";
    case "Mil-Spec":
      return "bgMilSpec";
    case "Restricted":
      return "bgRestricted";
    case "Classified":
      return "bgClassified";
    case "Covert":
      return "bgCovert";
    default:
      return "bgConsumer";
  }
}

function load() {
  var main = document.getElementById('skins');

  for (var collection in skinData) {
    for (var skin in skinData[collection]) {
      var item = skinData[collection][skin];
      if (!item.lowestRarity) {
        var div = document.createElement("div");
        div.classList.add("col");
        div.classList.add("centered");
        div.style.position = 'relative';
        div.style.margin = "10px";
        
        var text1 = document.createElement("p");
        text1.innerText = item.skin;
        text1.classList.add('skinLabel');
        text1.style.top = "-15px";
        div.appendChild(text1);

        var text2 = document.createElement("p");
        var minFloat = item.minFloat.toString();
        while (minFloat.length < 4) {
          if (minFloat.length == 1) {
            minFloat += ".";
          } else {
            minFloat += "0";
          }
        }
        var maxFloat = item.maxFloat.toString();
        while (maxFloat.length < 4) {
          if (maxFloat.length == 1) {
            maxFloat += ".";
          } else {
            maxFloat += "0";
          }
        }
        text2.innerText = minFloat + " - " + maxFloat;
        text2.classList.add('skinLabel');
        text2.style.bottom = "-15px";
        div.appendChild(text2);

        var img = document.createElement("img");
        img.setAttribute("src", item.img);
        img.setAttribute("alt", item.skin);
        img.setAttribute("onclick", "loadSkin('"+item.collection+"', '"+item.skin+"')");
        img.setAttribute("data-skin", item.skin);
        img.classList.add("skinImg");
        img.classList.add(rarityClass(item.rarity));
        div.appendChild(img);

        main.appendChild(div);
      }
    }
  }
}

function search() {
  var term = document.getElementById("search").value;
  for (var skinImg of document.getElementsByClassName("skinImg")) {
    if (!skinImg.getAttribute("data-skin").toLowerCase().includes(term.toLowerCase())) {
      skinImg.parentElement.style.display = "none";
    } else {
      skinImg.parentElement.style.display = "flex";
    }
  }
}

function getSkinMaterials(skin, collection) {
  var materials = []
  for (var s in collection) {
    if (collection[s].rarityNumber == skin.rarityNumber - 1) materials.push(collection[s]);
  }
  return materials;
}

function loadSkin(collection, skin) {
  for (var element of document.getElementsByClassName('skinSelection')) {
    element.style.display = 'none';
  }
  var floats = document.getElementById('floats');
  floats.style.display = "flex";

}
//   for (var element of document.getElementsByClassName('skinSelection')) {
//     element.style.display = 'none';
//   }
//   var floats = document.getElementById('floats');
//   floats.style.display = 'flex';

//   var skin = skinData[collection][skin];
//   var collection = skinData[collection];
  

//   var table = document.createElement("table");
//   var tr = document.createElement("tr");
//   var td1 = document.createElement("td");
  
//   var img = document.createElement("img");
//   img.style.margin = "0.5%";
//   img.style.backgroundColor = rarityColor(skin.rarity);
//   img.style.borderRadius = "10px";
//   img.style.border = "5px solid black";
//   img.setAttribute("src", skin.img);
//   img.setAttribute("height", "64%");
//   img.setAttribute("width", "48%");
//   td1.appendChild(img);
//   tr.appendChild(td1);

//   var td2 = document.createElement("td");
//   td2.style.display = 'flex';
//   td2.style.justifyContent = 'center';
//   td2.style.alignItems = 'center';
//   td2.style.flexDirection = 'column';
//   var p = document.createElement("p");
//   p.innerHTML = "What float would you like to trade up to?";
//   var input = document.createElement("input");
//   input.placeholder = skin.minFloat + " - " + skin.maxFloat;
//   var button = document.createElement("button");
//   button.value = "Go";
//   button.onclick = ""
//   td2.appendChild(p);
//   td2.appendChild(input);
//   tr.appendChild(td2);

//   tr.style.display = 'flex';
//   tr.style.justifyContent = 'center';
//   tr.style.alignItems = 'center';
//   tr.style.flexDirection = 'row';

//   table.appendChild(tr);
//   floats.appendChild(table);


  // var materials = getSkinMaterials(skinData[collection][skin], skinData[collection]);

  // var table = document.createElement("table");
  // var topRow = document.createElement("tr");
  // topRow.colSpan = materials.length;
  // var topTd = document.createElement("td");
  // const needed_average = (userFloat-skin.minWear)/(skin.maxWear-skin.minWear);
  // topTd.innerHTML = "Use at least one of the following skins in your tradeup contract with the average float of ";
  // var tr = document.createElement("tr");

  // for (var skin of materials) {
  //   var td = document.createElement("td");
  //   var img = document.createElement("img");
  //   img.style.margin = "0.5%";
  //   img.style.backgroundColor = rarityColor(skin.rarity);
  //   img.style.borderRadius = "10px";
  //   img.style.border = "5px solid black";
  //   img.setAttribute("src", skin.img);
  //   img.setAttribute("height", "64%");
  //   img.setAttribute("width", "48%");
    
  //   td.appendChild(img);
  //   tr.appendChild(td);
  // } 
  // table.appendChild(tr);
  // floats.appendChild(table);
// }