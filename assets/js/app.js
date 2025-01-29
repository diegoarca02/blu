const menuTl = gsap.timeline({ paused: true, reversed: true });
const tableBordersRight = document.querySelectorAll(".border-table-right .border");
const tableBordersLeft = document.querySelectorAll(".border-table-left .border");
const tableBordersTop = document.querySelectorAll(".border-table-left .border-vertical");
const tableBordersBottom = document.querySelectorAll(".border-table-right .border-vertical");

const bgColor = "#dee2e6";
const easing = Power0.easeNone;

// 🔹 Animación del borde derecho (se ejecuta cada vez que se abre el menú)
var tlRight = new TimelineMax({ paused: true });
var tlLeft = new TimelineMax({ paused: true });
var tlTop = new TimelineMax({ paused: true });
var tlBottom = new TimelineMax({ paused: true });

function resetBorderRightAnimation() {
  tlRight = new TimelineMax({ paused: true });

  tlRight.fromTo(tableBordersRight, 1, 
    {
      width: 0, 
      background: bgColor,
      immediateRender: false,
      autoRound: false,
      ease: easing
    }, 
    {
      width: "100%", 
      background: bgColor
    }
  );
}

function resetBorderLeftAnimation() {
  tlLeft = new TimelineMax({ paused: true });

  tlLeft.fromTo(tableBordersLeft, 1, 
      {
          width: 0,
          background: bgColor,
          immediateRender: false,
          autoRound: false,
          ease: easing
      },
      {
          width: "100%",
          background: bgColor,
          right: "0"
      }
  );
}

function resetBorderTopAnimation() {
  tlTop = new TimelineMax({ paused: true });

  tlTop.fromTo(tableBordersTop, 1, 
      {
          height: 0,
          background: bgColor,
          immediateRender: false,
          autoRound: false,
          ease: easing
      },
      {
          height: "100%",
          background: bgColor,
          top: "0"
      }
  );
}
function resetBorderBottomAnimation() {
  tlBottom = new TimelineMax({ paused: true });

  tlBottom.fromTo(tableBordersBottom, 1, 
      {
          height: 0,
          background: bgColor,
          immediateRender: false,
          autoRound: false,
          ease: easing
      },
      {
          height: "100%",
          background: bgColor,
          bottom: "0"
      }
  );
}

// 🔹 Línea de tiempo para abrir el menú
menuTl.to(".navbar-menu", {
  height: "100svh",
  duration: 0.8,
  ease: "power2.inOut",
});

// 🔹 Ejecutar la animación del borde cuando el menú termine de abrirse
menuTl.eventCallback("onComplete", () => {
  if (!tlRight.isActive()) {
    tlRight.play(0);
  }
  if (!tlLeft.isActive()) {
    tlLeft.play(0);
  }
  if (!tlTop.isActive()) {
    tlTop.play(0);
  }
  if (!tlBottom.isActive()) {
    tlBottom.play(0);
  }
});

let isMenuOpen = false;
function animateBars() {
  const tlBars = gsap.timeline({ defaults: { duration: 0.3, ease: "power2.inOut" } });

  if (!isMenuOpen) {
    tlBars.to(".line-1", { y: 10, rotate: 45 })
      .to(".line-2", { opacity: 0 }, "<")
      .to(".line-3", { y: -15.5, rotate: -45 }, "<");

    menuTl.play(); // Abrir menú
  } else {
    tlBars.to(".line-1", { y: 0, rotate: 0 })
      .to(".line-2", { opacity: 1 }, "<")
      .to(".line-3", { y: 0, rotate: 0 }, "<");

    menuTl.reverse(); // Cerrar menú

    // Reiniciar la animación del borde
    resetBorderRightAnimation();
    resetBorderLeftAnimation();
    resetBorderTopAnimation();
    resetBorderBottomAnimation();
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


// Inicializar la animación del borde al cargar la página
resetBorderRightAnimation();
resetBorderLeftAnimation();
resetBorderTopAnimation();
resetBorderBottomAnimation();