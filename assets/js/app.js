// 📌 1. REGISTRO DE PLUGINS GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// 📌 8. SMOOTH SCROLL
let smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 2,
  effects: true
});

// 📌 2. VARIABLES GLOBALES Y CONFIGURACIÓN
const easing = "power2.inOut";
const bgColor = "#000";
let isMenuOpen = false;


// 📌 3. ANIMACIONES DEL MENÚ Y BORDES
const menuTl = gsap.timeline({ paused: true, reversed: true });

const tableBordersLeftBottom = document.querySelectorAll(".border-table-left .border-bottom");
const tableBordersLeftTop = document.querySelectorAll(".border-table-left .border-top");
const tableBordersLeftLeft = document.querySelectorAll(".border-table-left .border-left");
const tableBordersLeftRight = document.querySelectorAll(".border-table-left .border-right");

const tableBordersRightLeft = document.querySelectorAll(".border-table-right .border-left");

const borderTl = gsap.timeline({ paused: true });
borderTl
  .fromTo(tableBordersLeftBottom, { height: 0, background: bgColor }, { height: "100%", duration: 1, ease: easing, delay: 0.5 }, 0)
  .fromTo(tableBordersLeftTop, { height: 0, background: bgColor }, { height: "100vh", duration: 1, ease: easing, delay: 0.5 }, 0)
  .fromTo(tableBordersLeftLeft, { width: 0, background: bgColor }, { width: "100%", duration: 1, ease: easing, delay: 0.5 }, 0)
  .fromTo(tableBordersLeftRight, { width: 0, background: bgColor }, { width: "100%", duration: 1, ease: easing, delay: 0.5 }, 0)
  .fromTo(tableBordersRightLeft, { width: 0, background: bgColor }, { width: "100%", duration: 1, ease: easing, delay: 0.5 }, 0);
const borderCloseTl = gsap.timeline({ paused: true });
borderCloseTl
  .to(tableBordersLeftBottom, { height: 0, duration: 0.8, ease: easing }, 0)
  .to(tableBordersLeftTop, { height: 0, duration: 0.8, ease: easing }, 0)
  .to(tableBordersLeftLeft, { width: 0, duration: 0.8, ease: easing }, 0)
  .to(tableBordersLeftRight, { width: 0, duration: 0.8, ease: easing }, 0)
  .to(tableBordersRightLeft, { width: 0, duration: 0.8, ease: easing }, 0);

menuTl.to(".navbar-menu", {
  height: "100svh",
  duration: 1.2,
  ease: easing,
});

// 📌 4. EVENTO DEL BOTÓN DE MENÚ
console.clear();
gsap.registerPlugin(DrawSVGPlugin);

const tlHmrb = gsap.timeline({ defaults: { ease: "power2.inOut" } });

gsap.set("#theBurger", { autoAlpha: 1 });
gsap.set(".buns", { drawSVG: "0% 30%" });
gsap.set(".letters", { drawSVG: "53.5% 100%", x: -155 });

tlHmrb.to(".patty", { duration: 0.35, drawSVG: "50% 50%" }, 0)
     .to(".patty", { duration: 0.1, opacity: 0, ease: "none" }, 0.25)
     .to(".buns", { duration: 0.85, drawSVG: "69% 96.5%" }, 0)
     .to(".letters", { duration: 0.85, drawSVG: "0% 53%", x: 0 }, 0)
     .reversed(true);

// Timelines del menú y bordes

function animateTheBurger() {
  isMenuOpen = !isMenuOpen; // Alternar estado del menú

  tlHmrb.reversed(!tlHmrb.reversed()); // Alternar la animación de la hamburguesa

  if (isMenuOpen) {
    // Bloquea el scroll
    menuTl.play();
    borderTl.play(0);
    gsap.to("#burger", { duration: 0.3, stroke: "#000000" }); // Cambia a negro inmediatamente
  } else {
   // Bloquea el scroll
    menuTl.reverse();
    borderCloseTl.play(0);
    gsap.to("#burger", { duration: 0.3, stroke: "#ffffff", delay: 0.5 }); // Retraso de 0.5s al volver a blanco
  }
}




// 📌 5. AJUSTE DINÁMICO DE ALTURA
function adjustHeight() {
  const viewportHeight = window.innerHeight;
  const trHeight = window.innerHeight / 4;
  const tdWidth = window.innerWidth / 3;
  const tablesSecondSection = document.getElementById("table-second-section").offsetHeight / 2;

  console.log(tdWidth);
  
  document.querySelectorAll('.full-height').forEach(element => {
    element.style.height = `${viewportHeight}px`;
  });
  document.querySelectorAll('.tr-height').forEach(element => {
    element.style.height = `${trHeight}px`;
  });
  document.querySelectorAll('.td-width').forEach(element => {
    element.style.width = `${tdWidth}px`;
  });
  document.querySelectorAll('.td-height-two').forEach(element => {
    element.style.height = `${tablesSecondSection}px`;
  });
}
window.addEventListener('resize', adjustHeight);
adjustHeight(); // Llamada inicial

// 📌 6. BOTÓN HOVER EFECTO CÍRCULO
const button = document.querySelector('.btn-circle-hover');
const text = button.querySelector('.btn-circle-hover span');
let isAnimating = false;

button.addEventListener('mouseenter', (e) => {
  if (isAnimating) return;
  isAnimating = true;

  const circle = document.createElement('div');
  circle.classList.add('circle');
  button.appendChild(circle);

  const rect = button.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  gsap.to(text, { color: '#000', duration: 0.1, ease: 'power1.out' });

  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;

  gsap.to(circle, {
    width: rect.width * 2,
    height: rect.width * 2,
    duration: 0.1,
    ease: 'power1.out',
    onComplete: () => isAnimating = false
  });
});

button.addEventListener('mouseleave', (e) => {
  const circle = button.querySelector('.circle');
  if (!circle) return;

  isAnimating = true;

  gsap.to(text, { color: '#fff', duration: 0.1, ease: 'power1.out' });

  gsap.to(circle, {
    width: 0,
    height: 0,
    left: e.clientX - button.getBoundingClientRect().left,
    top: e.clientY - button.getBoundingClientRect().top,
    duration: 0.1,
    ease: 'power1.in',
    onComplete: () => {
      circle.remove();
      isAnimating = false;
    },
  });
});

// 📌 7. ANIMACIÓN DE PROGRESO
document.querySelectorAll('.progress-bar').forEach(bar => {
  gsap.fromTo(
    bar,
    { width: '0%' }, // Empieza desde 0
    {
      width: `${bar.getAttribute('data-progress')}%`, // Anima hasta el valor del atributo
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#second-section", // Activa cuando #second-section está en vista
        start: "top 50%",
        toggleActions: "play none none reverse", // Reproduce y revierte
      }
    }
  );
});

/* gsap.registerPlugin(ScrollSmoother, ScrollTrigger); */



 // Footer sticky y efecto de desbloqueo
 gsap.to("#sticky-footer", {
  scrollTrigger: {
    trigger: "#smooth-content",
    start: "bottom bottom",

    scrub: true,
    pin: true,
  }
});


// 📌 9. EFECTO PARALLAX
gsap.utils.toArray('.section').forEach((section, i) => {
  section.bg = section.querySelector(".bg");

  if (i) {
    if(section.bg){

      gsap.to(section.bg, {
        yPercent: -10, 
        ease: "none",
        scrollTrigger: {
          trigger: section,
          scrub: true,
          start: "top bottom",
          end: "bottom top"
        }
      });
    }

  } else {
    if(section.bg){

      gsap.to(section.bg, {
        yPercent: -10, 
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          scrub: true
        }
      });
    }
  }
});


// 📌 VARIABLES GLOBALES
const easing2 = "power2.inOut";
const bgColor2 = "#fff";

// 📌 SELECCIONAMOS LOS ELEMENTOS DE LOS BORDES
const secondSectionBordersLeft = document.querySelectorAll(".border-secondSection-right .border-left");
const secondSectionBordersTop = document.querySelectorAll(".border-secondSection-right .border-top");
const secondSectionBordersBottom = document.querySelectorAll(".border-secondSection-right .border-bottom");

const secondSectionBordersLeftRight = document.querySelectorAll(".border-secondSection-left .border-right");
const secondSectionBordersLeftTop = document.querySelectorAll(".border-secondSection-left .border-top");
const secondSectionBordersLeftBottom = document.querySelectorAll(".border-secondSection-left .border-bottom");
const centerBordersCenter = document.querySelectorAll(".border-center");

// 📌 VERIFICAR SI LOS ELEMENTOS EXISTEN
if (secondSectionBordersLeft.length === 0 || secondSectionBordersTop.length === 0) {
    console.error("❌ No se encontraron los bordes en #second-section");
} else {
    console.log("✅ Elementos de bordes encontrados");
}

// 📌 ANIMACIÓN DE LOS BORDES (GSAP)
const borderSecondSectionTl = gsap.timeline({ paused: true });

borderSecondSectionTl
  .fromTo(secondSectionBordersLeft, { width: "0px" }, { width: "100%", duration: 1.2, ease: easing2 }, 0)
  .fromTo(secondSectionBordersTop, { height: "0px" }, { height: "100%", duration: 1.2, ease: easing2 }, 0)
  .fromTo(secondSectionBordersBottom, { height: "0px" }, { height: "100%", duration: 1.2, ease: easing2 }, 0)
  .fromTo(secondSectionBordersLeftRight, { width: "0px" }, { width: "100%", duration: 1.2, ease: easing2 }, 0)
  .fromTo(secondSectionBordersLeftTop, { height: "0px" }, { height: "100%", duration: 1.2, ease: easing2 }, 0)
  .fromTo(secondSectionBordersLeftBottom, { height: "0px" }, { height: "100%", duration: 1.2, ease: easing2 }, 0)
  .fromTo(centerBordersCenter, { width: "0px" }, { width: "100%", duration: 1.2, ease: easing2 }, 0);

// 📌 ACTIVAR LA ANIMACIÓN CUANDO EL USUARIO LLEGUE A `#second-section`

document.querySelectorAll(".second-section").forEach((section, index) => {
  ScrollTrigger.create({
      trigger: section, // Ahora cada sección tendrá su propio trigger
      start: "top 75%",
      markers: false, // Elimina esto en producción
      onEnter: () => {
          console.log(`🎬 Animación activada en la sección ${index + 1}`);
          borderSecondSectionTl.play();
      },
      onLeaveBack: () => {
          console.log(`🔄 Revirtiendo animación en la sección ${index + 1}`);
          borderSecondSectionTl.reverse();
      },
  });
});

/////
gsap.registerPlugin(ScrollTrigger);

// Seleccionar todos los contenedores con la clase "moving-texts"
gsap.utils.toArray('.moving-texts').forEach((container) => {
  // Aplica el efecto a todo el contenedor
  gsap.to(container, {
    yPercent: 5, // Movimiento más rápido hacia abajo
    ease: "power1.out", // Movimiento más fluido
    scrollTrigger: {
      trigger: container, // Activa el efecto cuando el contenedor está en el viewport
      start: "top bottom", // Comienza cuando el contenedor entra al viewport
      end: "bottom top", // Termina cuando el contenedor sale del viewport
      scrub: 0.1, // Hace que el desplazamiento sea más reactivo (menor es más rápido)
    },
  });
});
// ✅ Registrar ScrollTrigger para GSAP
gsap.set(".swiper-slide img", { scale: 1 });

// ✅ Inicializar Swiper con animaciones suaves

/* var swiper = new Swiper(".mySwiperGallerys", {
  effect: "coverflow",
  grabCursor: true,
  slidesPerView: "auto",
  centeredSlides: true,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2.5
  },
  keyboard: {
    enabled: true
  },
  mousewheel: {
    thresholdDelta: 70
  },
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
}); */

var swiper_gallery = new Swiper(".swiper-gallery", {
  effect: "coverflow",
  slidesPerView: "auto",
  centeredSlides: true,
  loop: true,
  keyboard: {
    enabled: true,
  },
  slideClass: 'swiper-slide-gallery',
  navigation: {
    nextEl: ".swiper-button-next-gallery",
    prevEl: ".swiper-button-prev-gallery",
  },
  coverflowEffect: {
    rotate: 3,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  },
  on: {
    slideChangeTransitionEnd: function (swiper) {
      console.log('aca', swiper.activeIndex); // Verifica si el evento se dispara
      swiper.update(); // Actualiza Swiper al terminar el cambio de slide
    }
  }
});


// Asegurar que los botones existen antes de agregar eventos
document.querySelector(".swiper-button-next-gallery")?.addEventListener("click", () => {
  setTimeout(() => swiper_gallery.update(), 100); // Espera un poco y actualiza Swiper
});

document.querySelector(".swiper-button-prev-gallery")?.addEventListener("click", () => {
  setTimeout(() => swiper_gallery.update(), 100); // Espera un poco y actualiza Swiper
});


// Inicialmente, el botón está completamente oculto
gsap.set(".flair", { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });

let xTo = gsap.quickTo(".flair", "x", { duration: 0.2, ease: "power3" }),
    yTo = gsap.quickTo(".flair", "y", { duration: 0.2, ease: "power3" });

const section = document.getElementById("fifth-section");
const flair = document.querySelector(".flair");

section.addEventListener("mouseenter", () => {
  // Mostrar flair al entrar en la sección
  gsap.to(flair, { scale: 1, opacity: 1, duration: 0.2, ease: "power3" });
});

section.addEventListener("mousemove", (e) => {
  let bounds = section.getBoundingClientRect(); // Límites de la sección

  // Coordenadas del cursor dentro de la sección
  let x = e.clientX - bounds.left;
  let y = e.clientY - bounds.top;

  // Calcula la distancia del cursor a los bordes
  let distX = Math.min(x, bounds.width - x);
  let distY = Math.min(y, bounds.height - y);

  // Normaliza la distancia para definir la visibilidad
  let proximity = Math.max(0, Math.min(1, Math.min(distX / 50, distY / 50))); // 50px es el rango antes de achicar

  // Mover el botón y ajustar tamaño/opacidad
  xTo(bounds.left + x);
  yTo(bounds.top + y + window.scrollY);

  gsap.to(flair, {
    scale: proximity,
    opacity: proximity,
    duration: 0.1,
    ease: "power3",
  });
});

// Ocultar completamente cuando el cursor sale de la sección
section.addEventListener("mouseleave", () => {
  gsap.to(flair, { scale: 0, opacity: 0, duration: 0.3, ease: "power3" });
});





/////////////////////////////
console.clear();

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollSmoother.create({
  smooth: 2,
  normalizeScroll: true,
  smoothTouch: 0.1
});

setTimeout(() => {
  document.querySelector('.scroll-wrapper').style.overflow = 'initial';
}, 100);

const cards = gsap.utils.toArray(".stackingcard");



cards.forEach((card, i) => {
  console.log(i);
  
  gsap.to(card, {
    scale: 1.01,
    ease: "none",
    scrollTrigger: {
      trigger: card,
      start: `top-=${i * 100} 40%`, // Ajuste aquí para calcular correctamente el inicio
      scrub: true
    }
  });
  ScrollTrigger.create({
    trigger: card,
    start:  `top +=${i * 40}px`, // Cambia solo el `start` de la primera carta
    end: "top center",
    endTrigger: ".end-element",
    pin: true,
    pinSpacing: false,
    false: true,
    id: `card-${i}`
  });
});



ScrollTrigger.refresh();

/*********************************************** */

