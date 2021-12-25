function load() {
    var skins = document.getElementById('skins');
    for (var item of skinDataBySearch) {
        var bottomText = (formatFloat(item.minFloat.toString()) + " - " + formatFloat(item.maxFloat.toString()));
        var onclick = `loadSkin("${item.skin}")`;
        skins.appendChild(skinImgWithText(item, ['skinImgCon'], bottomText, onclick));
    }
    document.getElementById('search').select();
}

function search() {
    var term = document.getElementById("search").value.toLowerCase();
    var termSplit = term.split(' ');
    for (var skinImg of document.getElementsByClassName("skinImg")) {
        var skin = skinImg.getAttribute("data-skin").toLowerCase();
        var skinSplit = skin.split(' | ');
        if (skin.includes(term) || (skinSplit[0].includes(termSplit[0]) && skinSplit[1].includes(termSplit[1]))) {
            skinImg.parentElement.style.display = "flex";
        } else {
            skinImg.parentElement.style.display = "none";
        }
    }
}