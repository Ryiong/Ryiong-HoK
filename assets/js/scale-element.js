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

function reScale() {
    setElementScale(".text-layer");
    setElementScale(".header-content", 1000);
    setElementTranslate(".hero-layer");
    // setElementScale(".new-banner");
    setElementScale("#Banner-hp2");
    // setElementScale(".banner-hero-list");

}
reScale();
document.addEventListener("DOMContentLoaded", reScale);
document.addEventListener("resize", reScale);
document.addEventListener("load", reScale);
window.addEventListener("resize", reScale);
window.addEventListener("load", reScale);
