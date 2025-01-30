gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const menuTl = gsap.timeline({ paused: true, reversed: true });
const tableBordersRight = document.querySelectorAll(".border-table-right .border");
const tableBordersLeft = document.querySelectorAll(".border-table-left .border");
const tableBordersTop = document.querySelectorAll(".border-table-left .border-vertical");
const tableBordersBottom = document.querySelectorAll(".border-table-right .border-vertical");

const bgColor = "#000";
const easing = "power2.inOut";

// 🔹 Animación de los bordes al **abrir** el menú (inmediatamente)
const borderTl = gsap.timeline({ paused: true });

borderTl.fromTo(tableBordersRight, { width: 0, background: bgColor }, { width: "100%", duration: 1, ease: easing }, 0)
        .fromTo(tableBordersLeft, { width: 0, background: bgColor }, { width: "100%", duration: 1, ease: easing }, 0)
        .fromTo(tableBordersTop, { height: 0, background: bgColor }, { height: "100%", duration: 1, ease: easing }, 0)
        .fromTo(tableBordersBottom, { height: 0, background: bgColor }, { height: "100%", duration: 1, ease: easing }, 0);

// 🔹 Animación para cerrar los bordes
const borderCloseTl = gsap.timeline({ paused: true });

borderCloseTl.to(tableBordersRight, { width: 0, duration: 0.8, ease: easing }, 0)
             .to(tableBordersLeft, { width: 0, duration: 0.8, ease: easing }, 0)
             .to(tableBordersTop, { height: 0, duration: 0.8, ease: easing }, 0)
             .to(tableBordersBottom, { height: 0, duration: 0.8, ease: easing }, 0);

// 🔹 Animación para abrir el menú
menuTl.to(".navbar-menu", {
  height: "100svh",
  duration: 0.8,
  ease: easing,
});

let isMenuOpen = false;
function animateBars() {
  const tlBars = gsap.timeline({ defaults: { duration: 0.3, ease: easing } });

  if (!isMenuOpen) {
    tlBars.to(".line-1", { y: 10, rotate: 45 })
          .to(".line-2", { opacity: 0 }, "<")
          .to(".line-3", { y: -15.5, rotate: -45 }, "<");

    menuTl.play();      // 🔹 Abre el menú
    borderTl.play(0);   // 🔹 Inicia la animación de bordes INMEDIATAMENTE
  } else {
    tlBars.to(".line-1", { y: 0, rotate: 0 })
          .to(".line-2", { opacity: 1 }, "<")
          .to(".line-3", { y: 0, rotate: 0 }, "<");

    menuTl.reverse();   // 🔹 Cierra el menú
    borderCloseTl.play(0); // 🔹 Cierra los bordes al mismo tiempo
  }

  isMenuOpen = !isMenuOpen;
}

// Ajustar el alto del contenedor dinámicamente
const viewportHeight = window.innerHeight;
const container = document.querySelector('.full-height');
container.style.height = `${viewportHeight}px`;
window.addEventListener('resize', () => {
    container.style.height = `${window.innerHeight}px`;
});

// Animación del botón circular
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

  gsap.to(text, {
    color: '#000',
    duration: 0.1,
    ease: 'power1.out',
  });

  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;

  gsap.to(circle, {
    width: rect.width * 2,
    height: rect.width * 2,
    duration: 0.1,
    ease: 'power1.out',
    onComplete: () => {
      isAnimating = false;
    },
  });
});

button.addEventListener('mouseleave', (e) => {
  const circle = button.querySelector('.circle');
  if (!circle) return;

  isAnimating = true;

  gsap.to(text, {
    color: '#fff',
    duration: 0.1,
    ease: 'power1.out',
  });

  const rect = button.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  gsap.to(circle, {
    width: 0,
    height: 0,
    left: x,
    top: y,
    duration: 0.1,
    ease: 'power1.in',
    onComplete: () => {
      circle.remove();
      isAnimating = false;
    },
  });
});

// Selecciona todas las barras de progreso
const progressBars = document.querySelectorAll('.progress-bar');

progressBars.forEach(bar => {
    const progress = bar.getAttribute('data-progress');
    
    gsap.to(bar, {
      width: `${progress}%`,
      duration: 1,
      ease: 'power2.out'
    });
});

gsap.utils.toArray("section").forEach((section, i) => {
  section.bg = section.querySelector(".bg"); 
  if (i) {
    section.bg.style.backgroundPosition = `50% ${-innerHeight / 2}px`;

    gsap.to(section.bg, {
      backgroundPosition: `50% ${innerHeight / 2}px`,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        scrub: true
      }
    });
  } 
  
  // the first image should be positioned against the top. Use px on the animating part to work with GSAP. 
  else {
    section.bg.style.backgroundPosition = "50% 0px"; 

    gsap.to(section.bg, {
      backgroundPosition: `50% ${innerHeight / 2}px`,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top", 
        end: "bottom top",
        scrub: true
      }
    });
  }
});



// Inicializar la animación del borde al cargar la página
resetBorderRightAnimation();
resetBorderLeftAnimation();
resetBorderTopAnimation();
resetBorderBottomAnimation();