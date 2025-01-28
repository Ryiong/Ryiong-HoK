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
    renderSkills(data);
    renderPreviewSkill(data);

    let skillsSet = document.querySelectorAll(".skills-set");
    let skillsPreview = document.querySelectorAll(".import-ytframe")
    skillsSet[0].classList.add("active-skill-set");
    skillsPreview[0].classList.add('active-yt-video')
    skillsSet.forEach((skillSet, index) => {
        skillSet.addEventListener('click', () => {
            if (!skillSet.classList.contains('active-skill-set')) {
                skillsSet.forEach(item => item.classList.remove('active-skill-set'));
                skillsPreview.forEach(item => item.classList.remove('active-yt-video'));
                skillSet.classList.add('active-skill-set');
                skillsPreview[index].classList.add('active-yt-video');
            }
        });
    });
}

function renderSkills(data) {
    let htmlCode = '';
    const placeSkills = document.querySelector(".list-skills");
    data.skills.forEach((skill) => {
        skill.forEach((item) => {
            htmlCode += `<li class="skills-set">
                            <div class="border-iconskill relative">
                                <img src="https://ryiong-hok.neocities.org/assets/Resource/${data.idHero}/skills/${item.skillIcon}"
                                    alt="${item.skillName} Icon">
                            </div>
                            <div class="context-skill">
                                <h3 class="skill-name">${item.skillName}</h3>
                                <p class="skill-description">${item.skillDescription}</p>
                            </div> 
                        </li>`
        })
    })
    placeSkills.innerHTML = htmlCode;
}

function renderPreviewSkill(data) {
    let htmlCode = ''
    data.skills.forEach((skill) => {
        skill.forEach((item) => {
            htmlCode += `<div class="import-ytframe w-100">
                            <iframe class="yt-video-frame" width="100%" height="100%" src="${item.previewSkill}"
                                title="YouTube video player" frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>`
        })
    })
    document.querySelector(".video-frame").innerHTML = htmlCode
}

