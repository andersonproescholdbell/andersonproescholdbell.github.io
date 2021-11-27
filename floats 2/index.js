function rarityColor(rarity) {
  switch(rarity) {
    case "Consumer":
        return "#b0c3d9";
    case "Industrial":
        return "#5e98d9";
    case "Mil-Spec":
        return "#4b69ff";
    case "Restricted":
        return "#8847ff";
    case "Classified":
        return "#d32ee6";
    case "Covert":
        return "#eb4b4b";
    default:
        return "black";
  }
}

function load() {
  var main = document.getElementById('skins');

  for (var collection in skinData) {
    for (var skin in skinData[collection]) {
      var item = skinData[collection][skin];
      if (!item.lowestRarity) {
        var div = document.createElement("div");
        div.classList.add("row");
        div.classList.add("skinContainer");

        var elem = document.createElement("img");
        elem.style.margin = "0.5%";
        elem.style.backgroundColor = rarityColor(item.rarity);
        elem.style.borderRadius = "10px";
        elem.style.border = "5px solid black";
        elem.setAttribute("src", item.img);
        elem.setAttribute("height", "16%");
        elem.setAttribute("width", "12%");
        elem.setAttribute("alt", item.skin);
        elem.setAttribute("onclick", "loadSkin('"+item.collection+"', '"+item.skin+"')");
        elem.setAttribute("data-skin", item.skin);
        elem.classList.add("skinImg");
        div.appendChild(elem);

        var con = document.createElement("div");
        con.style.display = "flex";
        con.style.justifyContent = "center";
        con.style.alignItems = "center";
        
        var text = document.createElement("p");
        text.innerText = item.skin;
        con.appendChild(text);

        div.appendChild(con);

        main.appendChild(div);
      }
    }
  }
}

function loadSkin(collection, skin) {
  console.log(skinData[collection][skin]);
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