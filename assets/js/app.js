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

  } else {
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