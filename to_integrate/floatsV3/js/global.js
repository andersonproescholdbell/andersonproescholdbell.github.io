var terminate = true;

function toggleDisplay(id) {
    var el = document.getElementById(id);
    (getComputedStyle(el).display === 'none') ? el.style.display = 'flex' : el.style.display = 'none';
}
  
function back() {
    terminate = true;
    var pages = ['chooseSkin', 'chooseFloat', 'addFloats', 'combinations'];
    for (var i = 0; i < pages.length; i++) {
        if (document.getElementById(pages[i]).style.display === 'flex') {
            toggleDisplay(pages[i]);
            toggleDisplay(pages[i-1]);
            if (i === 1) document.getElementById('search').select();
            if (i === 2) document.getElementById('floatInput').select();
            break;
        }
    }
}

function validateNumber(e, el) {
    return (e.key === '-') ? false : true;
}