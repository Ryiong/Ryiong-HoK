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
