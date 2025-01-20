let delay = 6000;
const maxDelay = delay + delay / 2;
const loop = true;
const autoplay = true;

let current = 0;
const maxFace = 6;

if (autoplay && loop) {
    setInterval(() => {
        updateCurrent((current < maxFace - 1) ? current + 1 : 0)
    }, delay)
} else if (autoplay) {
    setInterval(() => {
        (current < maxFace - 1) ? updateCurrent(current + 1) : clearInterval(this)
    }, delay)
}

getCurrent(".role-item")

document.addEventListener("currentChange", (e) => {
    activeCurrent(".role-item", "active-role");
    activeCurrent(".banner-hero-item", "active-banner-hero");
    activeCurrent(".banner-hero-item img", "animation__circle");
});

function updateCurrent(value) {
    current = value;
    document.dispatchEvent(new CustomEvent("currentChange", { detail: { current } }));
}

function getCurrent(target) {
    const elements = document.querySelectorAll(target);
    for (let [index, element] of elements.entries()) {
        element.addEventListener('click', () => {
            delay = maxDelay;
            updateCurrent(index);
            setTimeout(() => {
                delay = maxDelay / 1.5;
            }, delay)
        })
    }
}

function activeCurrent(target, label) {
    const elements = document.querySelectorAll(target);
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove(label);
    }
    if (elements[current]) {
        elements[current].classList.add(label);
    }
}


