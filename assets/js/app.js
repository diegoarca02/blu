const menuTl = gsap.timeline({ paused: true, reversed: true });

menuTl.to(".navbar-menu", {
  height: "100%", // Expande el menú
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
