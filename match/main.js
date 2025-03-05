fetch('./hero.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        // console.log(data);
        RenderListHero(data);
    })
    .catch((error) => {
        console.error('There was a problem with the fetch operation:', error)
    });

const banBlue = document.querySelector("#ban-blue");
const banRed = document.querySelector("#ban-red")

function AddSlotBan() {
    banBlue.innerHTML += `<div class="ban-hero relative" onclick="OpenHeroList(event);"></div>`;
    banRed.innerHTML += `<div class="ban-hero relative" onclick="OpenHeroList(event);"></div>`
}

function DeleteSlotBan() {
    lengthBan = document.querySelectorAll("#ban-blue .ban-hero").length
    document.querySelectorAll("#ban-blue .ban-hero")[lengthBan - 1].remove();
    document.querySelectorAll("#ban-red .ban-hero")[0].remove();
    console.log(lengthBan)

}

function RenderListHero(data) {
    htmlCode = "";
    data.forEach(item => {
        htmlCode += `<div class="hero-profile" data-idhero="${item.idHero}" data-name="${item.nameHero}" onclick="GetHero(event);">
                    <img src="https://ryiong-hok.neocities.org/assets/heroimg/${item.idHero}.jpg" alt="${item.nameHero}">
                </div>`;
    });
    document.querySelector("#list-hero").innerHTML = htmlCode
}

function CloseHeroList() {
    document.querySelector("#hero-layout").classList.add("hide")
    document.querySelector("#search-box").classList.add("hide");
}

let element = null, textElement = null;

function OpenHeroList(a) {
    document.querySelector("#hero-layout").classList.remove("hide")
    document.querySelector("#search-box").classList.remove("hide");
    if (a.target.classList.contains("ban-hero")) {
        console.log(a.currentTarget)
        return [element = a.currentTarget, textElement = null];
    } else {
        console.log(a.currentTarget.children[0]);

        return [element = a.currentTarget.children[0], textElement = a.currentTarget.children[1]];
    }
}

function GetHero(e) {
    const idHero = e.currentTarget.getAttribute("data-idhero");
    const heroName = e.currentTarget.getAttribute("data-name");
    console.log(idHero)

    element.style.background = `url('./EsportsUI/${idHero}.jpg') center / cover no-repeat`;
    element.alt = `${heroName}`;
    if (textElement) {
        textElement.innerText = heroName;
    }
}

function SearchHero() {
    let query = document.getElementById("search-input").value.toLowerCase();
    let heroes = document.querySelectorAll(".hero-profile");
    heroes.forEach(hero => {
        let name = hero.getAttribute("data-name").toLowerCase();
        if (name.includes(query)) {
            hero.classList.remove("hide")
        } else {
            hero.classList.add("hide")
        }
    })
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        SearchHero();
    }
}

function RenderExport() {
    let div = document.querySelector("#layout-bp");
    html2canvas(div).then(canvas => {
        let img = canvas.toDataURL("image/png");

        let link = document.createElement("a");
        link.href = img;
        link.download = "LayoutBP.png"
        link.click();
    });
}