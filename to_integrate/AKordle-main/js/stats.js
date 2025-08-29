function reveal(el) {
    (el.textContent == el.getAttribute('data-word')) ? 
        el.textContent = el.getAttribute('data-hidden') : el.textContent = el.getAttribute('data-word');
}