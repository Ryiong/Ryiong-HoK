function renderBannerSwiper(target, data) {
    const targetImport = document.querySelector(target);
    for (let i = 0; i < data.length; i++) {
        targetImport.innerHTML += `<div class="swiper-slide"><div class="slide-content relative">
        <img src="https://ryiong-hok.neocities.org/assets/Resource/${data[i].idHero}/${data[i].Name_Image}" alt="${data[i].Hero} - ${data[i].Name_Skin}" class="w-100 img-banner-content">
        <img src="https://ryiong-hok.neocities.org/assets/Tag/${data[i].Quantity}.png" alt="${data[i].Quantity}" class="mini-layout absolute">
        <span class="text-banner-content absolute">${data[i].Hero}_${data[i].Name_Skin}</span>
        </div></div>`
    }
}

const path = "https://script.google.com/macros/s/AKfycbyYOWtmzkRWI0wiD_t7JsSsjnth98vSVkg1HKUD3-PzwgRcDnyBbfsjC5CcUBLz6AjYdQ/exec";
fetch(path, {
    mode: 'no-cors'
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        console.log(data)
        renderBannerSwiper(".new-banner .swiper-wrapper", data)
        const swiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 20,
            loop: true,
            slideToClickedSlide: true,
            effect: "coverflow",
            coverflowEffect: {
                rotate: 0,
                stretch: 10,
                depth: 300,
                modifier: 1,
                slideShadows: false,
            },
            breakpoints: {
                550: {
                    slidesPerView: 2,
                },
                1000: {
                    slidesPerView: 3,
                }
        
            }
        })
    })
    .catch((error) => {
        console.error('There was a problem with the fetch operation:', error)
        window.location = window.location.href;
    });

    