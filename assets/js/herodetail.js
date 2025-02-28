getQuery();

function getDataQuery(query, searchKey) {
    let searchParams = new URLSearchParams(query)
    return searchParams.get(searchKey)
}

function getQuery() {
    let querySearch = location.search;
    if (querySearch == '') {
        console.log("Reload")
        location.pathname = '/Ryiong-HoK/herolist.html'
        return null;
    } else {
        return getDataQuery(querySearch, 'idHero')
    }
}

fetch('./assets/json/HoK_API.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        if (data[getQuery()]) {
            console.log(data[getQuery()])
            renderHeroDetail(data[getQuery()]);
            OpenSkin(data[getQuery()]);
        } else {
            location.pathname = '/Ryiong-HoK/404.html'
        }

    })
    .catch((error) => {
        console.error('There was a problem with the fetch operation:', error)
    });

function renderHeroDetail(data) {
    document.querySelector(".name-hero-detail").innerText = data.heroName;
    document.querySelector(".skin-hero-detail").innerText = data.defaultSkin;
    document.querySelector(".story-hero-detail").innerText = data.storyHero;
    document.querySelector(".default-banner-detail").src = `https://ryiong-hok.neocities.org/assets/Resource/${data.idHero}/${data.skins[0].skinImage}`;
    renderSkills(data);
    renderPreviewSkill(data);

    let skillsSet = document.querySelectorAll(".skills-set");
    let skillsPreview = document.querySelectorAll(".import-ytframe")
    let skillsDescription = document.querySelectorAll(".context-skill")

    skillsSet[0].classList.add("active-skill-set");
    skillsPreview[0].classList.add('active-yt-video');
    skillsDescription[0].classList.add('block')
    skillsSet.forEach((skillSet, index) => {
        skillSet.addEventListener('click', () => {
            if (!skillSet.classList.contains('active-skill-set')) {
                skillsSet.forEach(item => item.classList.remove('active-skill-set'));
                skillsPreview.forEach(item => item.classList.remove('active-yt-video'));
                skillsDescription.forEach(item => item.classList.remove('block'));
                skillSet.classList.add('active-skill-set');
                skillsPreview[index].classList.add('active-yt-video');
                skillsDescription[index].classList.add('block');
            }
        });
    });
}

function renderSkills(data) {
    let htmlCodeIcon = '', htmlCode = '', oSkLength = 0, skLength = 0;
    for(let x of data.skills) {
        skLength = x.length > oSkLength ? x.length : oSkLength;
        oSkLength = x.length
    }
    data.skills.forEach((skill) => {
        skill.forEach((item) => {
            htmlCodeIcon += `<li class="skills-set">
                            <div class="border-iconskill relative">
                                <img src="https://ryiong-hok.neocities.org/assets/Resource/${data.idHero}/skills/${item.skillIcon}"
                                    alt="${item.skillName} Icon">
                            </div>
                             
                        </li>`
            htmlCode += `<div class="context-skill">
                                <h3 class="skill-name">${item.skillName}</h3>`
                                if (item.skillCD) {
                                    htmlCode += `<p class="skill-description"><strong>Hồi chiêu:</strong> ${item.skillCD}</p>`
                                }
                                if (item.manaType != null) {
                                    htmlCode += `<p class="skill-description"><strong>${item.manaType}</strong>: ${item.manaCost}</p>`
                                }
            htmlCode += `<p class="skill-description">${item.skillDescription}</p>
                            </div>`
        })
    })
    document.querySelector(".list-skills").innerHTML = htmlCodeIcon;
    document.querySelector(".list-skills").style.height = `${(6 * oSkLength) + 2}rem`;
    document.querySelector(".description-list").innerHTML = htmlCode;
}

function renderPreviewSkill(data) {
    let htmlCode = ''
    data.skills.forEach((skill) => {
        skill.forEach((item) => {
            htmlCode += `<div class="import-ytframe w-100">
                            <iframe class="yt-video-frame" width="100%" height="100%" src="${item.skillPreview}"
                                title="YouTube video player" frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>`
        })
    })
    document.querySelector(".video-frame").innerHTML = htmlCode
}

function importSkinData(data) {
    let iconSkinCode = '';

    data.skins.forEach((skin) => {
        iconSkinCode += `<div class="h-100 skinicon">
                            <img class="h-100" src="https://ryiong-hok.neocities.org/assets/Resource/${data.idHero}/${skin.skinIcon}" alt="${skin.skinName}">
                        </div>`;
    })
    document.querySelector('.list-smallskin').innerHTML = iconSkinCode;

}

function displayBigSkin(data, index) {
    document.querySelector("#display-skin").src = `https://ryiong-hok.neocities.org/assets/Resource/${data.idHero}/${data.skins[index].skinImage}`;
    document.querySelector("#display-skin").alt = `${data.skins[index].skinName}`;
    document.querySelector("p#name-skin").innerHTML = `${data.skins[index].skinName} _ Chất lượng: <i style="background:url('https://ryiong-hok.neocities.org/assets/Tag/${data.skins[index].skinQuality}.png') 0 0 /100% 100% no-repeat; height: 30px;display: inline-block;width: 100px;"></i>`;
    document.querySelector("#open-linkskin").href = `https://drive.google.com/file/d/${data.skins[index].keyHD}/view?usp=drive_link`;
}

function displayStarSkin(data, index, sIndex) {
    document.querySelector("#display-skin").src = `https://ryiong-hok.neocities.org/assets/Resource/${data.idHero}/${data.skins[index].starList[sIndex].starImage}`;
    document.querySelector("#display-skin").alt = `${data.skins[index].starList[sIndex].starName}`;
    document.querySelector("p#name-skin").innerText = `${data.skins[index].starList[sIndex].starName} _ Chất lượng: ${data.skins[index].skinQuality}`;
    document.querySelector("#open-linkskin").href = `https://drive.google.com/file/d/${data.skins[index].starList[sIndex].starKeyHD}/view?usp=drive_link`;
}

function importStarIcon(data, index) {
    let starIconCode = '<p>Star Skin</p>';
    data.skins[index].starList.forEach((starSkin) => {
        starIconCode += `<div class="w-100 staricon">
                        <img class="w-100" src="https://ryiong-hok.neocities.org/assets/Resource/${data.idHero}/${starSkin.starIcon}" alt="${starSkin.starName}">
                    </div>`;
    })
    document.querySelector('.star-collection').innerHTML = starIconCode
}

function OpenSkin(data) {
    importSkinData(data);
    let skinIcons = document.querySelectorAll('.list-smallskin > .h-100.skinicon');

    // Display default
    skinIcons[0].classList.add('active-skin')
    displayBigSkin(data, 0)
    document.querySelector('.star-collection').classList.add('hide')

    skinIcons.forEach((skinIcon, index) => {
        skinIcon.addEventListener('click', () => {
            if (!skinIcon.classList.contains('active-skin')) {
                skinIcons.forEach(item => item.classList.remove('active-skin'));
                skinIcon.classList.add('active-skin');
                displayBigSkin(data, index)
                if (data.skins[index].starSkin === false) {
                    document.querySelector('.star-collection').classList.add('hide')
                } else {
                    document.querySelector('.star-collection').classList.remove('hide')
                    importStarIcon(data, index);
                    let starIcons = document.querySelectorAll('.star-collection .staricon')
                    starIcons.forEach((starIcon, sIndex) => {
                        starIcon.addEventListener('click', () => {
                            if (!starIcon.classList.contains('active-skin')) {
                                starIcons.forEach(item => item.classList.remove('active-skin'))
                                starIcon.classList.add('active-skin')
                                displayStarSkin(data, index, sIndex)
                            }
                        }) 
                    })
                }
            }
            
        });
    });
}

