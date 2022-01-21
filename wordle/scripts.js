function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createTiles(length) {
    let board = document.getElementById('board');
    for (var i = 0; i < length+1; i++) {
        var row = document.createElement('div');
        row.classList.add('row');
        row.classList.add('centered');
        for (var j = 0; j < length; j++) {
            var tile = document.createElement('div');
            tile.classList.add('tile');
            if (i === 0) {
                tile.setAttribute('data-changeable', 'true');
            } else {
                tile.setAttribute('data-changeable', 'false');
            }
            var div = document.createElement('div');
            div.classList.add('tileCon');
            div.appendChild(tile);
            row.appendChild(div);
        }
        board.appendChild(row);
    }
}

function createKeyboard(length, word) {
    function createKey(letter) {
        var key = document.createElement('button');
        key.innerHTML = letter;
        key.classList.add('key');
        key.setAttribute('data-key', letter.toLowerCase());
        key.setAttribute('onclick', `letter("${l}")`);
        var div = document.createElement('div');
        div.classList.add('keyCon');
        div.appendChild(key);
        return div;
    }

    function createFunc(letter, onclick) {
        var key = document.createElement('button');
        key.classList.add('func');
        key.innerHTML = letter;
        key.setAttribute('onclick', onclick);
        var div = document.createElement('div');
        div.classList.add('keyCon');
        div.appendChild(key);
        return div;
    }

    let row1 = document.getElementById('row1');
    for (var l of 'QWERTYUIOP') {
        row1.appendChild(createKey(l));
    }

    let row2 = document.getElementById('row2');
    for (var l of 'ASDFGHJKL') {
        row2.appendChild(createKey(l));
    }

    let row3 = document.getElementById('row3');
    row3.appendChild(createFunc('Enter', `submit(${length}, "${word}")`));

    for (var l of 'ZXCVBNM') {
        row3.appendChild(createKey(l));
    }

    row3.appendChild(createFunc('Backspace', `back()`));
}

async function submit(length, word) {
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
            var allCorrect = allCorrect(word, guess);
            (allCorrect[guess[i]]) ? changeable[i].classList.add('unusable') : changeable[i].classList.add('partial');
        }
    }

    for (var i = 0; i < length; i++) {
        if (word.includes(guess[i]) && word[i] !== guess[i]) {
            var correctInstances = 0;
            for (var j = 0; j < length; j++) {
                if (word[j] === guess[i]) {

                }
            }
            
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