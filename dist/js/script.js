const sandwichButton = document.getElementsByClassName('header__sandwich')[0];
    sandwichButton.addEventListener('click', sandwich);

function sandwich() {
    let navigation = document.getElementsByClassName('header__nav')[0];
    let sandwichButton = document.getElementsByClassName('header__sandwich')[0];
    navigation.classList.toggle('navigation_active');
    sandwichButton.classList.toggle('sandwich_active');
}

const navLink = document.querySelectorAll('.anchor');
    navLink.forEach(function(watcher) {
    watcher.addEventListener('click', anchor);
});

let hashUrl = window.location.hash.replace("#","");
    if (hashUrl.length > 0) {
    let target = '[data-target='+hashUrl+']';
    let dataTarget = document.querySelectorAll(target);
    dataTarget[0].scrollIntoView({behavior: 'smooth'});
    }
    
window.onhashchange = function() {
    if (hashUrl.length > 0) {
    dataTarget[0].scrollIntoView({behavior: 'instant'});
        }
    }
    
function anchor() {
    let target = '[data-target='+'"'+this.getAttribute('data-nav')+'"]';
    let dataAtr = this.getAttribute('data-nav');    
    window.history.pushState(null,null,'#'+dataAtr);
    let navigation = document.getElementsByClassName('header__nav')[0];
    let sandwichButton = document.getElementsByClassName('header__sandwich')[0];
    let dataTarget = document.querySelectorAll(target);
    dataTarget[0].scrollIntoView({behavior: 'smooth'});
    navigation.classList.toggle('navigation_active');
    sandwichButton.classList.toggle('sandwich_active');
    //event.preventDefault();
}