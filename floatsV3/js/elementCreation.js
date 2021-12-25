function skinImg(item, onclick) {
    var img = document.createElement("img");
    img.setAttribute("src", item.img);
    img.setAttribute("alt", item.skin);
    img.setAttribute("data-skin", item.skin);
    img.classList.add("skinImg");
    img.classList.add(rarityClass(item.rarity));
    if (onclick) img.setAttribute("onclick", onclick);
    return img;
}

function skinImgWithText(item, classes, bottomText, onclick, additionalTexts) {
    (classes.length > 0) ? classes = classes.concat(['col', 'centered']) : classes = ['col', 'centered'];
    var div = createEl('div', classes, {'position':'relative', 'margin':'10px'});

    var text1 = createEl('p', ['skinLabel'], {'top':'-15px'}, {'innerText':item.skin});
    var text2 = createEl('p', ['skinLabel'], {'bottom':'-15px'}, {'innerText':bottomText});
    div.appendChild(text1);
    div.appendChild(text2);

    if (additionalTexts) {
        for (var t of additionalTexts) {
            div.appendChild(createEl('p', ['skinLabel'], t.offset, {'innerText':t.text}));
        }
    }

    div.appendChild(skinImg(item, onclick));
  
    return div;
}

function createEl(el, classes, styles, attributes) {
    var el = document.createElement(el);

    if (classes) {
        for (var c of classes) {
            el.classList.add(c);
        }
    }

    if (styles) {
        for (var s in styles) {
            el.style[s] = styles[s];
        }
    }

    if (attributes) {
        for (var a in attributes) {
            el[a] = attributes[a];
        }
    }

    return el;
}