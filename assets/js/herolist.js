let path = "https://script.google.com/macros/s/AKfycbz8d-4bGaY45FdNVFy9bGEfv04lxmh1vYi2yf6wElFPeeIZLgGnsjsN-xFBp8BBjWoHhw/exec";

const roleQuery = [
    "tank",
    "fighter",
    "assassin",
    "mage",
    "marksmen",
    "roamer",
]

const heroListPlace = document.querySelector("#herolist");

function renderList(data) {
    let text = "";
    data.forEach(item => {
        text = text + `<li class="heroitem"><a href="#"><div class="heroblock overflow-hidden"><img class="w-100" src="https://ryiong-hok.neocities.org/assets/Resource/${item.idHero}/${item.idHero}-mobileskin-1.jpg" alt="Hero test"></div><span class="block">${item.nameHero}</span></a></li>`
    });
    heroListPlace.innerHTML = text
}

fetch(path)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    console.log(data)
    renderList(data)
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error)
    window.location = window.location.href;
});
