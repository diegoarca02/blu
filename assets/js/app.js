const menuTl = gsap.timeline({ paused: true, reversed: true });

menuTl.to(".navbar-menu", {
  height: "100svh", // Cambia la altura al 100% de su contenedor
  duration: 0.8,
});

let isMenuOpen = false;
function animateBars() {
    const tl = gsap.timeline({ defaults: { duration: 0.3, ease: "power2.inOut" } });

    if (!isMenuOpen) {
        // Animar a X
        tl.to(".line-1", { y: 10, rotate: 45 }) // Línea superior baja y rota
          .to(".line-2", { opacity: 0 }, "<") // Línea del medio desaparece
          .to(".line-3", { y: -15.5, rotate: -45 }, "<"); // Línea inferior sube y rota
    } else {
        // Restaurar a menú
        tl.to(".line-1", { y: 0, rotate: 0 }) // Línea superior regresa
          .to(".line-2", { opacity: 1 }, "<") // Línea del medio reaparece
          .to(".line-3", { y: 0, rotate: 0 }, "<"); // Línea inferior regresa
    }

    isMenuOpen = !isMenuOpen; // Alterna el estado

    if (menuTl.reversed()) {
        menuTl.play();
    } else {
        menuTl.reverse();
    }
}

const viewportHeight = window.innerHeight;
const container = document.querySelector('.full-height');
container.style.height = `${viewportHeight}px`;
window.addEventListener('resize', () => {
    container.style.height = `${window.innerHeight}px`;
});

const button = document.querySelector('.btn-circle-hover');
const text = button.querySelector('.btn-circle-hover span');

// Estado para controlar las animaciones
let isAnimating = false;

// Manejar el evento mouseenter
button.addEventListener('mouseenter', (e) => {
  if (isAnimating) return; // Evitar superposición de animaciones
  isAnimating = true;

  const circle = document.createElement('div');
  circle.classList.add('circle');
  button.appendChild(circle);

  const rect = button.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Cambiar el color del texto
  gsap.to(text, {
    color: '#000', // Color del texto cuando pasa el cursor
    duration: 0.1,
    ease: 'power1.out',
  });

  // Posicionar y animar el círculo
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;

  gsap.to(circle, {
    width: rect.width * 2,
    height: rect.width * 2,
    duration: 0.1,
    ease: 'power1.out',
    onComplete: () => {
      isAnimating = false; // Animación completada
    },
  });
});

// Manejar el evento mouseleave
button.addEventListener('mouseleave', (e) => {
  const circle = button.querySelector('.circle');
  if (!circle) return; // Asegurarse de que el círculo existe

  isAnimating = true; // Bloquear nuevas animaciones

  // Cambiar el color del texto de vuelta al original
  gsap.to(text, {
    color: '#fff', // Color original del texto
    duration: 0.1,
    ease: 'power1.out',
  });

  const rect = button.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Reducir el círculo desde su posición actual
  gsap.to(circle, {
    width: 0,
    height: 0,
    left: x,
    top: y,
    duration: 0.1,
    ease: 'power1.in',
    onComplete: () => {
      circle.remove(); // Eliminar el círculo
      isAnimating = false; // Animación completada
    },
  });
});

