function skinImg(item, onclick, rarity) {
    var img = document.createElement("img");
    img.setAttribute("src", item.img);
    img.setAttribute("alt", item.skin);
    img.setAttribute("data-skin", item.skin);
    img.classList.add("skinImg");
    if (rarity) img.classList.add(rarityClass(rarity));
    if (onclick) img.setAttribute("onclick", onclick);
    return img;
}

function skinImgWithText(item, classes, bottomText, onclick, additionalTexts) {
    classes = classes && classes.length > 0 ? classes.concat(['col', 'centered']) : ['col', 'centered'];
    var div = createEl('div', classes, { 'position': 'relative', 'margin': '10px' });

    var text1 = createEl('p', ['skinLabel'], { 'top': '-15px' }, { 'innerText': item.skin });
    var text2 = createEl('p', ['skinLabel'], { 'bottom': '-15px' }, { 'innerText': bottomText });
    div.appendChild(text1);
    div.appendChild(text2);

    if (additionalTexts) {
        for (var t of additionalTexts) {
            div.appendChild(createEl('p', ['skinLabel'], t.offset, { 'innerText': t.text }));
        }
    }

    div.appendChild(skinImg(item, onclick, item.rarity));

    return div;
}

function createEl(tagName, classes, styles, attributes) {
    var element = document.createElement(tagName);

    if (classes) {
        for (var c of classes) {
            element.classList.add(c);
        }
    }

    if (styles) {
        for (var s in styles) {
            element.style[s] = styles[s];
        }
    }

    if (attributes) {
        for (var a in attributes) {
            element[a] = attributes[a];
        }
    }

    return element;
}