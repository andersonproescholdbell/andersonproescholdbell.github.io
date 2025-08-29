function togglePanel() {
    var panel = document.getElementById('panel');
    (panel.style.display == 'none' || panel.style.display == '') ? panel.style.display = 'flex' : panel.style.display = 'none';
}

function updateRange() {
    document.getElementById("rangeLength").innerText = "Word Length - " + document.getElementById("range").value;
}

function updateHint(data) {
    var el = $('.final')[$('.final').length-getCols()+data.position];
    el.innerHTML = data.letter;
    el.classList.remove('grey');
    el.classList.remove('orange');
    el.classList.add('green');

    for (let i = 0; i < data.change_blank.length; i++) {
        el = $('.final')[ $('.final').length - getCols() + data.change_blank[i] ];
        el.classList.remove('grey');
        el.classList.remove('orange');
        el.classList.remove('green');
        el.classList.add('grey');
    }
}

$('#settings').click(function() {
    togglePanel();
});

$('#hint').click(function() {
    if ($('.final').length > 0) {
        $.ajax({
            url: './index.php',
            type: 'POST',
            data: {hint: getGuess()},
            dataType: 'json',
            encode: true,
            success: function(data) {
                console.log(data);
                updateHint(data);
            },
            error: function(data) {
                guessError(data);
            }
        });
    }
});

$('#range').on('input', function() {
    updateRange();
});

$('#newGame').click(function() {
    updateRowsCols(6, parseInt($('#range').val()));
    newGame();
    togglePanel();
});