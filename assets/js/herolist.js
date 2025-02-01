const heroListPlace = document.querySelector("#herolist");

function renderList(data, query = "all") {
  heroListPlace.innerHTML = "";
  let text = "";
  data.forEach(item => {
    text = text + `<li class="heroitem"><a href="./herodetail.html?idHero=${item.idHero}"><div class="heroblock overflow-hidden"><img class="lazy w-100" src="https://ryiong-hok.neocities.org/assets/Resource/${item.idHero}/${item.idHero}-mobileskin-1.jpg" alt="${item.nameHero}"></div><span class="block">${item.nameHero}</span></a></li>`
  });
  heroListPlace.innerHTML = text
  const filterItems = document.querySelectorAll(".filter-item");
  for (let filterItem of filterItems) {
    filterItem.classList.remove('active-filter');
  }
  target = "#"+query+"hero"
  document.querySelector(target).classList.add('active-filter')
}

function queryRole(query = '') {
  if (query == "") {
    fetch('./assets/json/herolist.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        renderList(data, "all")
    reScale();

      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error)
      });
  }
  else {
    fetch('./assets/json/herolist'+ query +'.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        renderList(data, query)
    reScale();

      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error)
      });
  }
}

queryRole();

$(function() {
  $('.lazy').lazy();
})
