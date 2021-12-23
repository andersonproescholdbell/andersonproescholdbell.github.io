function getFloat(min, max, arr) {
    var wear = 0;
    for (var i = 0; i < 10; i++) {
      wear = ieee(wear + arr[i]);
    }
    return ieee(ieee((ieee(wear/ieee(10)))*ieee(max-min))+min);
}

// not currently working, should find a method for this eventually
function checkIfCraftable(min, max, float) {
    var neededAvg = ieee(ieee(ieee(float)-ieee(min))/ieee(ieee(max)-ieee(min)));
    var arr = new Array(10).fill(neededAvg);

    return float === getFloat(min, max, arr);
}

// don't currently need this, maybe in the future
function getSkinMaterials(skin, collection) {
    var materials = [];
    for (var s in collection) {
      if (collection[s].rarityNumber == skin.rarityNumber - 1) materials.push(collection[s]);
    }
    return materials;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getCombo(arr, p) {
    var results = [];
    for (var i = 0; i < p.length; i++) {
        results.push(arr[p[i]]);
    }
    return results;
}

function getTotalCombos(arrSize, k) {
    var fact = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800, 479001600, 6227020800, 87178291200, 1307674368000, 20922789888000, 355687428096000, 6402373705728000, 121645100408832000, 2432902008176640000, 51090942171709440000, 1124000727777607680000, 25852016738884976640000, 620448401733239439360000, 15511210043330985984000000, 403291461126605635584000000, 10888869450418352160768000000, 304888344611713860501504000000, 8841761993739701954543616000000, 265252859812191058636308480000000, 8222838654177922817725562880000000, 263130836933693530167218012160000000, 8683317618811886495518194401280000000, 295232799039604140847618609643520000000, 10333147966386144929666651337523200000000, 371993326789901217467999448150835200000000, 13763753091226345046315979581580902400000000, 523022617466601111760007224100074291200000000, 20397882081197443358640281739902897356800000000, 815915283247897734345611269596115894272000000000, 33452526613163807108170062053440751665152000000000, 1405006117752879898543142606244511569936384000000000, 60415263063373835637355132068513997507264512000000000, 2658271574788448768043625811014615890319638528000000000, 119622220865480194561963161495657715064383733760000000000, 5502622159812088949850305428800254892961651752960000000000, 258623241511168180642964355153611979969197632389120000000000, 12413915592536072670862289047373375038521486354677760000000000, 608281864034267560872252163321295376887552831379210240000000000, 30414093201713378043612608166064768844377641568960512000000000000, 1551118753287382280224243016469303211063259720016986112000000000000, 80658175170943878571660636856403766975289505440883277824000000000000, 4274883284060025564298013753389399649690343788366813724672000000000000, 230843697339241380472092742683027581083278564571807941132288000000000000, 12696403353658275925965100847566516959580321051449436762275840000000000000, 710998587804863451854045647463724949736497978881168458687447040000000000000, 40526919504877216755680601905432322134980384796226602145184481280000000000000, 2350561331282878571829474910515074683828862318181142924420699914240000000000000, 138683118545689835737939019720389406345902876772687432540821294940160000000000000, 8320987112741390144276341183223364380754172606361245952449277696409600000000000000];
    return Math.floor(fact[arrSize] / (fact[arrSize - k] * fact[k]));
}

function formatComboFloats(combo) {
    var s = '';
    for (var i = 0; i < combo.length; i++) {
        s += formatFloat(combo[i]);
        if (i !== combo.length-1) s += ', ';
        if (i == combo.length/2) s += '\n';
    }
    return s;
}

function skinImg(item, onclick) {
    var img = document.createElement("img");
    img.setAttribute("src", item.img);
    img.setAttribute("alt", item.skin);
    img.setAttribute("data-skin", item.skin);
    img.setAttribute("data-collection", item.collection);
    img.classList.add("skinImg");
    img.classList.add(rarityClass(item.rarity));
    img.setAttribute("onclick", onclick);
    return img;
}

function skinImgWithText(item, classes, bottomText, onclick) {
    var div = createEl('div', ['col', 'centered'].concat(classes), {'position':'relative', 'margin':'10px'});
  
    var text1 = createEl('p', ['skinLabel'], {'top':'-15px'}, item.skin);
    div.appendChild(text1);
  
    var text2 = createEl('p', ['skinLabel'], {'bottom':'-15px'}, bottomText);
    div.appendChild(text2);
  
    div.appendChild(skinImg(item, onclick));
  
    return div;
}

function ieee(x) {
    x = Number(x);
    var float = new Float32Array(1);
    float[0] = x;
    return float[0];
}

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

function formatFloat(float) {
    float = float.toString();
    while (float.length < 4) {
        if (float.length == 1) {
        float += ".";
        } else {
        float += "0";
        }
    }
    return float;
}

function createEl(el, classes, styles, innerText, placeholder, onkeyup, onclick) {
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

    if (innerText) el.innerText = innerText;
    if (placeholder) el.placeholder = placeholder;
    if (onkeyup) el.setAttribute("onkeyup", onkeyup);
    if (onclick) el.setAttribute("onclick", onclick);

    return el;
}