// 📌 1. REGISTRO DE PLUGINS GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// 📌 2. VARIABLES GLOBALES Y CONFIGURACIÓN
const easing = "power2.inOut";
const bgColor = "#000";
let isMenuOpen = false;


// 📌 3. ANIMACIONES DEL MENÚ Y BORDES
const menuTl = gsap.timeline({ paused: true, reversed: true });

const tableBordersRight = document.querySelectorAll(".border-table-right .border");
const tableBordersLeft = document.querySelectorAll(".border-table-left .border");
const tableBordersTop = document.querySelectorAll(".border-table-left .border-vertical");
const tableBordersBottom = document.querySelectorAll(".border-table-right .border-vertical");

const borderTl = gsap.timeline({ paused: true });
borderTl
  .fromTo(tableBordersRight, { width: 0, background: bgColor }, { width: "100%", duration: 1, ease: easing }, 0)
  .fromTo(tableBordersLeft, { width: 0, background: bgColor }, { width: "100%", duration: 1, ease: easing }, 0)
  .fromTo(tableBordersTop, { height: 0, background: bgColor }, { height: "100%", duration: 1, ease: easing }, 0)
  .fromTo(tableBordersBottom, { height: 0, background: bgColor }, { height: "100%", duration: 1, ease: easing }, 0);

const borderCloseTl = gsap.timeline({ paused: true });
borderCloseTl
  .to(tableBordersRight, { width: 0, duration: 0.8, ease: easing }, 0)
  .to(tableBordersLeft, { width: 0, duration: 0.8, ease: easing }, 0)
  .to(tableBordersTop, { height: 0, duration: 0.8, ease: easing }, 0)
  .to(tableBordersBottom, { height: 0, duration: 0.8, ease: easing }, 0);

menuTl.to(".navbar-menu", {
  height: "100svh",
  duration: 0.8,
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
  document.querySelectorAll('.full-height').forEach(element => {
    element.style.height = `${viewportHeight}px`;
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
  gsap.to(bar, {
    width: `${bar.getAttribute('data-progress')}%`,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#second-section",
      start: "top 50%",
      toggleActions: "play none none reverse",
    }
  });
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


// 📌 1. VARIABLES GLOBALES
const easing2 = "power2.inOut";
const bgColor2 = "#fff";

// 📌 2. SELECCIONAMOS LOS ELEMENTOS DE LOS BORDES
const secondSectionBordersRight = document.querySelectorAll(".border-secondSection-right .border");
const secondSectionBordersTop = document.querySelectorAll(".border-secondSection-right .border-top");

const borderSecondSectionTl = gsap.timeline({ paused: true });

borderSecondSectionTl
.fromTo(
    secondSectionBordersRight,
    { width: 0, borderColor: bgColor2 },
    { width: "100%", duration: 1, ease: easing2 }
)
.fromTo(
    secondSectionBordersTop,
    { height: 0, borderColor: bgColor2 },
    { height: "100%", duration: 1, ease: easing2 }
);

// 📌 4. ACTIVAR LA ANIMACIÓN CUANDO EL USUARIO LLEGUE A `#second-section`
ScrollTrigger.create({
    trigger: "#second-section",
    start: "top 75%", // Se activa cuando el 75% de la sección entra en pantalla
    markers: true, // 🔹 Activa temporalmente los markers para depuración
    onEnter: () => {
        console.log("🎬 Animación activada en #second-section");
        borderSecondSectionTl.play();
    },
    onLeaveBack: () => {
        console.log("🔄 Revirtiendo animación");
        borderSecondSectionTl.reverse();
    },
});