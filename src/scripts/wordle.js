function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createTiles(length) {
    function createSpacer() {
        var key = document.createElement('div');
        key.classList.add('spacer1-5');
        return key;
    }

    let board = document.getElementById('board');
    for (var i = 0; i < length+1; i++) {
        var row = document.createElement('div');
        row.classList.add('tileRow');
        //row.appendChild(createSpacer());
        for (var j = 0; j < length; j++) {
            var tile = document.createElement('div');
            tile.classList.add('tile');
            if (i === 0) {
                tile.setAttribute('data-changeable', 'true');
            } else {
                tile.setAttribute('data-changeable', 'false');
            }
            if (j == length-1) tile.classList.add('lastElem');
            row.appendChild(tile);
        }
        //row.appendChild(createSpacer());
        board.appendChild(row);
    }
}

function createKeyboard(length, word) {
    function createKey(letter) {
        var key = document.createElement('button');
        key.innerHTML = letter;
        key.classList.add('key');
        key.setAttribute('data-key', letter.toLowerCase());
        key.setAttribute('onclick', `letter("${letter}")`);
        return key;
    }

    function createFunc(letter, onclick) {
        var key = document.createElement('button');
        key.classList.add('key');
        key.classList.add('wideKey');
        key.innerHTML = letter;
        key.setAttribute('onclick', onclick);
        return key;
    }

    function createSpacer() {
        var key = document.createElement('div');
        key.classList.add('spacer');
        return key;
    }

    let keys = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
    for (var i = 0; i < keys.length; i++) {
        let div = document.createElement('div'); 
        div.classList.add('keyRow');
        for (var j = 0; j < keys[i].length; j++) {
            let func;
            if (i === 2 && j === 0) {
                div.appendChild(createFunc('Back', `back()`));
            } else if (i === 2 && j === keys[i].length-1) {
                func = createFunc('Enter', `submit(${length}, "${word}")`);
                func.classList.add('lastElem');
            }

            if (i === 1 && j === 0) div.appendChild(createSpacer());

            let elem = createKey(keys[i][j]);

            if (j === keys[i].length-1 && i < 2) {
                elem.classList.add('lastElem');
            }

            div.appendChild(elem);
            
            if (func) {
                div.appendChild(func);
            }

            if (i === 1 && j === keys[i].length-1) div.appendChild(createSpacer());
        }
        document.getElementById('keyboard').appendChild(div);
    }
}

async function submit(length, word) {
    let changeable = document.querySelectorAll('div[data-changeable="true"]');
    if (changeable.length < length) return;

    let guess = '';
    for (var t of changeable) { 
        guess += t.innerText.toLowerCase();
    }

    if (!dict5.includes(guess)) {
        alert('Invalid word');
        return;
    }

    let changed = 0;
    for (var t of document.getElementsByClassName('tile')) { 
        if (t.getAttribute('data-changeable') === 'true') {
            t.setAttribute('data-changeable', 'false');
            changed++;
        } else if (changed === length*2) {
            break;
        } else if (changed >= length) {
            t.setAttribute('data-changeable', 'true');
            changed++;
        }
    }
    
    for (var i = 0; i < length; i++) {;
        if (!word.includes(guess[i])) {
            changeable[i].classList.add('incorrect');
            document.querySelector(`button[data-key="${guess[i]}"]`).classList.add('unusable');
        } else if (word[i] === guess[i]) {
            changeable[i].classList.add('correct');
        } else {
            (allCorrect(word, guess)[guess[i]]) ? changeable[i].classList.add('incorrect') : changeable[i].classList.add('partial');
        }
    }
    
    if (guess === word) {
        for (var t of document.querySelectorAll('div[data-changeable="true"]')) {
            t.setAttribute('data-changeable', 'false');
        }
        return;
    }

    if (document.querySelectorAll('div[data-changeable="true"]').length === 0) {
        await sleep(50);
        alert(`The word was "${word}", reload to try again!`);
    }
}

function allCorrect(word, guess) {
    let correct = {};

    for (var i = 0; i < word.length; i++) {
        if (!correct[guess[i]]) correct[guess[i]] = 0;

        if (word[i] === guess[i]) {
            correct[guess[i]]++;
        }
    }

    for (var l in correct) {
        (correct[l] > 0 && correct[l] === word.split(l).length-1) ? correct[l] = true : correct[l] = false;
    }

    return correct;
}

function back() {
    let tiles = document.querySelectorAll('div[data-changeable="true"]');
    for (var i = tiles.length-1; i >= 0; i--) {
        if (tiles[i].innerText !== '') {
            tiles[i].innerText = '';
            break;
        }
    }
}

function letter(letter) {
    let tiles = document.getElementsByClassName('tile');
    for (var t of tiles) {
        if (t.innerText === '' && t.getAttribute('data-changeable') === 'true') {
            t.innerText = letter;
            break;
        }
    }
}

function generateWord(length) {
    return dict5[Math.floor(Math.random()*dict5.length)];
}

function main() {
    let length = 5;
    let word = generateWord(5); 
    createTiles(length);
    createKeyboard(length, word);

    document.addEventListener('keyup', (e) => {
        if (e.code === 'Enter') {
            submit(length, word);
        } else if (e.code === 'Backspace') {
            back();
        } else if ('abcdefghijklmnopqrstuvwxyz'.includes(e.key.toLowerCase())) {
            letter(e.key.toUpperCase());
        }
    });
}

main();