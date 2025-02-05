// 📌 1. REGISTRO DE PLUGINS GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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
function animateBars() {
  const tlBars = gsap.timeline({ defaults: { duration: 0.3, ease: easing } });

  if (!isMenuOpen) {
    tlBars.to(".line-1", { y: 10, rotate: 45 })
          .to(".line-2", { opacity: 0 }, "<")
          .to(".line-3", { y: -15.5, rotate: -45 }, "<");

    menuTl.play();      
    borderTl.play(0);   
  } else {
    tlBars.to(".line-1", { y: 0, rotate: 0 })
          .to(".line-2", { opacity: 1 }, "<")
          .to(".line-3", { y: 0, rotate: 0 }, "<");

    menuTl.reverse();   
    borderCloseTl.play(0);
  }

  isMenuOpen = !isMenuOpen;
}

// 📌 5. AJUSTE DINÁMICO DE ALTURA
function adjustHeight() {
  const viewportHeight = window.innerHeight;
  const trHeight = window.innerHeight / 4;
  const trHeightTwo = window.innerHeight / 2;
  const tdWidth = window.innerWidth / 3;
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
    element.style.height = `${trHeightTwo}px`;
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

// 📌 8. SMOOTH SCROLL
ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 2,
  effects: true
});

// 📌 9. EFECTO PARALLAX
gsap.utils.toArray('.section').forEach((section, i) => {
  section.bg = section.querySelector(".bg");

  if (i) {
    if(section.bg){
      section.bg.style.backgroundPosition = "50% 50%";

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
      section.bg.style.backgroundPosition = "50% 50%"; 

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
ScrollTrigger.create({
    trigger: "#second-section",
    start: "top 75%", // Se activa cuando el 75% de la sección entra en pantalla
    markers: true, // 🔹 Activar para depuración (elimínalo en producción)
    onEnter: () => {
        console.log("🎬 Animación activada en #second-section");
        borderSecondSectionTl.play();
    },
    onLeaveBack: () => {
        console.log("🔄 Revirtiendo animación");
        borderSecondSectionTl.reverse();
    },
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
gsap.registerPlugin(ScrollTrigger);

// ✅ Antes de inicializar Swiper, aseguramos que todas las imágenes tengan el tamaño correcto para evitar parpadeos
gsap.set(".swiper-slide img", { scale: 1 });

// ✅ Inicializar Swiper con animaciones suaves
var swiper = new Swiper(".mySwiperGallery", {
  slidesPerView: "auto",
  centeredSlides: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  speed: 600, // Transición fluida
  on: {
    // 🔹 Al inicializar Swiper, aplicamos el zoom SUAVEMENTE a la imagen activa
    init: function () {
      gsap.to(".swiper-slide-active img", {
        scale: 1.4, // Zoom en la imagen central al cargar
        duration: 0.8, // Menos duración para eliminar parpadeo
        ease: "power2.out",
      });
    },
  },
});

// ✅ Aplicamos zoom inmediato a la imagen central cuando cambia el slide
swiper.on("slideChangeTransitionStart", function () {
  // 🔹 Reducimos el tamaño de todas las imágenes (incluyendo la que deja de ser activa)
  gsap.to(".swiper-slide img", {
    scale: 1, // Restablece el tamaño de todas las imágenes
    duration: 0.3, // Más rápido
    ease: "power2.out",
  });
});

// ✅ Cuando el slide se centra, aplica el zoom y lo mantiene
swiper.on("slideChangeTransitionEnd", function () {
  gsap.to(".swiper-slide-active img", {
    scale: 1.4, // Mantiene el zoom en la imagen activa
    duration: 0.4, // Transición fluida
    ease: "power2.out",
  });
});

// ✅ Zoom interno en las imágenes cuando se llegue a #fourth-section
gsap.to(".swiper-slide img", {
  scale: 1.2, // Zoom interno SIN afectar el tamaño del contenedor
  duration: 1, // Suavidad en la animación
  ease: "power2.out",
  scrollTrigger: {
    trigger: "#fourth-section", // Se activa cuando esta sección entra en pantalla
    start: "top 70%", // Cuando el 70% de la sección esté en pantalla
    toggleActions: "play reverse play reverse", // Activa y revierte el zoom con el scroll
  },
});


const cursor = document.getElementById("cursor");
    const section = document.getElementById("fifth-section");

    // Configurar GSAP para mover el cursor de texto
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    let xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" }),
        yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });

    // Mostrar y mover el cursor solo dentro de #fifth-section
    section.addEventListener("mousemove", (e) => {
      cursor.style.opacity = 1; // Asegura que el texto sea visible
      xTo(e.clientX);
      yTo(e.clientY);
    });

    // Ocultar el cursor cuando el mouse salga de #fifth-section
    section.addEventListener("mouseleave", () => {
      cursor.style.opacity = 0;
    });