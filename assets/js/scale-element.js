function reScale() {
    setElementScale(".text-layer");
    setElementScale(".header-content", 1000);
    setElementTranslate(".hero-layer");
    // setElementScale(".new-banner");
    setElementScale("#Banner-hp2");
    setElementScale(".hero-layer", 500);
}
reScale();
document.addEventListener("DOMContentLoaded", reScale);
document.addEventListener("resize", reScale);
document.addEventListener("load", reScale);
window.addEventListener("resize", reScale);
window.addEventListener("load", reScale);
