// Asegúrate de que GSAP y ScrollTrigger estén cargados
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.moving-texts').forEach((container) => {
  // Seleccionar los textos dentro del contenedor
  const texts = container.querySelectorAll('h1, p, a');

  texts.forEach((text) => {
    gsap.fromTo(
      text,
      {
        y: 50, // Posición inicial desplazada hacia abajo
        opacity: 0, // Totalmente transparente al inicio
      },
      {
        y: 0, // Vuelve a la posición original
        opacity: 1, // Totalmente visible
        duration: 1, // Duración de la animación
        ease: "power2.out", // Animación suave
        scrollTrigger: {
          trigger: text, // Activa la animación cuando el texto entra al viewport
          start: "top 80%", // Comienza cuando el texto está al 80% del viewport
          end: "top 50%", // Termina cuando el texto está al 50% del viewport
          scrub: true, // Sincroniza la animación con el scroll
        },
      }
    );
  });
});