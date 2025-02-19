

document.addEventListener('DOMContentLoaded', function(){
    new Swiper(".swiper-typologies", {
        navigation: {
            nextEl: ".swiper-button-next-typologies",
            prevEl: ".swiper-button-prev-typologies",
        },
        slidesPerView: 1,  
        spaceBetween: 0,   
        slideClass: 'swiper-slide-typologies',
        loop: false,       
        pagination: {
            el: ".swiper-typologies-pagination",
            clickable: true,  
            renderBullet: function (index, className) {

                let slide = document.querySelectorAll(".swiper-slide-typologies")[index];
                console.log(slide.getAttribute("data-info"));
                
                let data = JSON.parse(slide.getAttribute("data-info"));
                return `<span class="${className}">${data.departamento}</span>`;
            }
        },
        on: {
            slideChangeTransitionEnd: function () { // ✅ 
                let activeSlide = document.querySelector(".swiper-slide-typologies.swiper-slide-active");
                if (!activeSlide) return;
    
                let data = JSON.parse(activeSlide.getAttribute("data-info"));
                console.log("Slide actualizado:", data);
                
                document.getElementById("titulo").textContent = data.titulo;
                document.getElementById("estado").textContent = data.estado;
                document.getElementById("departamento").textContent = data.departamento;
                document.getElementById("dormitorios").textContent = data.dormitorios;
                document.getElementById("vista").textContent = data.vista;
                document.getElementById("area").textContent = data.area;
            }
        }
    });
});