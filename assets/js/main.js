const targetHeader = 125;

window.addEventListener("scroll", () => {
    const currentScrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (currentScrollPosition >= targetHeader) {
        AddClass(".header-content", "black-header")
    } else {
        RemoveClass(".header-content", "black-header")
    }
});

function AddClass(target, insert) {
    const element = document.querySelector(target); 
    if (element) {
        element.classList.add(insert);
    } else {
        console.error(`Element with selector "${target}" not found.`);
    }
}

function RemoveClass(target, insert) {
    const element = document.querySelector(target); 
    if (element) {
        element.classList.remove(insert);
    } else {
        console.error(`Element with selector "${target}" not found.`);
    }
}

function setElementScale(target, range = 1684) {
    let element = document.querySelector(target);
    setScale(element, range);
}
function setScale(target, range = 1684) {
    if (window.innerWidth < range) {
        let zoom = window.innerWidth / range;
        target.style.zoom = zoom;
    } else {
        target.style.zoom = 1;
    }
    // console.log(window.innerWidth, target.clientWidth, window.innerWidth / 1920)
}

function setElementTranslate(target) {
    let element = document.querySelector(target);
    setTranslateX(element);
}

function setTranslateX(target) {
    if (window.innerWidth < 1684) {
        let transX = (window.innerWidth / 1684) * 100 > 50 ? (window.innerWidth / 1684) * 100 : 50;
        target.style.transform = 'translate('+ (90 - transX) + '%, 0px)';
    } else {
        target.style.transform = '';
    }
}
