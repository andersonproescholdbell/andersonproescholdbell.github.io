/*
    Resources Used:
        https://davidwalsh.name/css-variables-javascript
        https://stackoverflow.com/questions/28932238/how-to-get-input-range-during-change-with-jquery
        https://learn.jquery.com/using-jquery-core/document-ready/
*/

function createRows(rows, cols) {
    const boxes = $('#boxes')
    for (let i = 0; i < rows; i++) {
        let r = $('<div class="row"/>');
        for (let j = 0; j < cols; j++) {
            let box = $('<div class="box"/>');
            r.append(box);
        }
        boxes.append(r);
    }
}

function createKey(l) {
    let key = $('<button/>');
    key.addClass('key');
    key.html(l);
    key.attr('data-key', l);
    return key;
}

function createEnter() {
    let enter = $('<button/>');
    enter.addClass('key');
    enter.addClass('flex-1-5');
    enter.html('ENTER');
    enter.attr('data-func', 'enter');
    enter.click(submitGuess);
    return enter;
}

function createBack() {
    let back = $('<button/>');
    back.addClass('key');
    back.addClass('flex-1-5');
    back.html('BACK');
    back.attr('data-func', 'back');
    back.click(removeLetter);
    return back;
}

function createKeys(s, spaces, functions) {
    let row = $('<div class="row flex-1"/>');
    
    if (spaces) row.append($('<div class="spacer"/>'));
    if (functions) row.append(createEnter());

    for (let l of s) {
        row.append(createKey(l));
    }

    if (functions) row.append(createBack());
    if (spaces) row.append($('<div class="spacer"/>'));

    $('#keyboard').append(row);
}

function createKeyboard() {
    createKeys('QWERTYUIOP', false);
    createKeys('ASDFGHJKL', true);
    createKeys('ZXCVBNM', false, true);
}

function updateRowsCols(rows, cols) {
    document.documentElement.style.setProperty('--cols', cols);
    document.documentElement.style.setProperty('--rows', rows);
}

function getRows() {
    return getComputedStyle(document.documentElement).getPropertyValue('--rows');
}

function getCols() {
    return getComputedStyle(document.documentElement).getPropertyValue('--cols');
}

function addLetter(el) {
    if (el.length != 1) el = el.getAttribute('data-key');
    if ($('.filled').length-$('.final').length < getCols()) {
        $('.box')[$('.filled').length].append(el);
        $('.box')[$('.filled').length].classList.add('filled');
    }
}

function removeLetter() {
    if ($('.filled').length > $('.final').length) {
        $('.filled')[$('.filled').length-1].innerHTML = '';
        $('.filled')[$('.filled').length-1].classList.remove('filled');
    }
}

function getGuess() {
    var guess = '';
    for (let i = $('.final').length; i < $('.filled').length; i++) {
        guess += $('.filled')[i].innerHTML;
    }

    return guess;
}

function updateTile(c) {
    $('.filled')[$('.final').length].classList.add(c);
    $('.filled')[$('.final').length].classList.add('final');
}

function winPanel(data) {
    if (data.over == 'win') {
        document.querySelector('#winPanelText').textContent = 'You WON in ' + data.guesses + ' guesses';
        document.querySelector('#winPanelText').style.color = 'green';
    } else {
        document.querySelector('#winPanelText').textContent = 'You LOST in ' + data.guesses + ' guesses';
        document.querySelector('#winPanelText').style.color = 'red';
    }

    document.querySelector('#winPanelWord').textContent = 'Correct word: ' + data.word;
    document.querySelector('#winPanelScore').textContent = 'Score: ' + data.score;

    document.querySelector('#winPanel').style.display = 'flex';
}

function updateKeyboard() {
    for (let c of ['grey', 'orange', 'green']) {
        for (let el of $('.' + c)) {
            let letter = el.innerHTML.toUpperCase();
            if (!$(`[data-key="${letter}"`).attr('class').split(' ').includes(c)) {
                $(`[data-key="${letter}"`).addClass(c);
            }
        }
    }
}

function guessResponse(data) {
    if (data.bad) {
        alert("This word does not exist in the dictionary");
        return;
    }

    var total = data.grey.length + data.orange.length + data.green.length;

    if (data.over) { // data.over == 'win' || 'loss'
        disableInput();

        setTimeout(() => {
            winPanel(data);
        }, (total+2)*300);    
    }

    for (let i = 0; i < total; i++) {
        if (data.grey.includes(i)) {
            setTimeout(function() {
                updateTile('grey');
            }, i*300);
        } else if (data.orange.includes(i)) {
            setTimeout(function() {
                updateTile('orange');
            }, i*300);
        } else if (data.green.includes(i)) {
            setTimeout(function() {
                updateTile('green');
            }, i*300);
        }

        if (i == total-1) {
            setTimeout(() => {
                updateKeyboard();
            }, i*301);
        }
    }
}

function guessError(data) {
    console.log(data);
    console.log(data.responseText);
    alert('There was an error making this request, please try again.');
}

function submitGuess() {
    if ($('.filled').length - $('.final').length == getCols()) {
        $.ajax({
            url: './index.php',
            type: 'POST',
            data: {guess: getGuess()},
            dataType: 'json',
            encode: true,
            success: function(data) {
                guessResponse(data);
            },
            error: function(data) {
                guessError(data);
            }
        });
    }
}

function enableInput() {
    $(document).keyup(function(e) {
        if (e.code === 'Enter') {
            submitGuess();
        } else if (e.code === 'Backspace') {
            removeLetter();
        } else if (e.key.toLowerCase().search(/^[a-z]$/) >= 0) {
            addLetter(e.key.toUpperCase());
        }
    });

    for (let key of $('.key')) {
        if (key.getAttribute('data-key')) {
            key.addEventListener('click', () => {
                addLetter(key);
            });
        }
    }

    $('[data-func="enter"').click(() => {
        submitGuess();
    });

    $('[data-func="back"').click(() => {
        removeLetter();
    });
}

function disableInput() {
    $(document).off();
    $('.key').off();
}

function newGame() {
    $.ajax({
        url: './index.php',
        type: 'POST',
        data: {concede: true},
        dataType: 'json',
        encode: true,
        success: function(data) {
            if (data.success) {
                createGame();
            }
        },
        error: function(data) {
            guessError(data);
        }
    });
}

function createGame() {
    var rows, cols;
    (getRows() == '') ? rows = 5 : rows = getRows();
    (getCols() == '') ? cols = 6 : cols = getCols();
    
    updateRowsCols(rows, cols);

    $('#boxes').empty();
    createRows(rows, cols);
    
    $('#keyboard').empty();
    createKeyboard();

    disableInput();
    enableInput();
}

function fillState(state, colors) {
    state = state.split(',');
    colors = colors.split(',');
    for (let i = 0; i < state.length; i++) {
        $('.box')[i].append(state[i]);
        $('.box')[i].classList.add('filled');
        $('.box')[i].classList.add('final');
        switch (colors[i]) {
            case 'b':
                $('.box')[i].classList.add('grey');
                break;
            case 'y':
                $('.box')[i].classList.add('orange');
                break;
            default:
                $('.box')[i].classList.add('green');
                break;
        }
    }
}

$(document).ready(function() {
    $.ajax({
        url: './index.php',
        type: 'POST',
        data: {state: true},
        dataType: 'json',
        encode: true,
        success: function(data) {
            if (data.currentGame) {
                updateRowsCols(data.rows, data.cols);
                createGame();
                fillState(data.state, data.colors);
                updateKeyboard();
            } else {
                createGame();
            }
        },
        error: function(data) {
            guessError(data);
        }
    });
});

$('#hideWinPanel').click(() => {
    $('#winPanel').hide();
});

$('#newGame2').click(() => {
    $('#winPanel').hide();
    newGame();
});