// Asegúrate de que GSAP y ScrollTrigger estén cargados
gsap.registerPlugin(ScrollTrigger);

function animateCountersOnScroll() {
  const counters = document.querySelectorAll('.counter');

  // Timeline para sincronizar las animaciones
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#second-section", // ID de la sección donde comienza la animación
      start: "top center", // Inicia cuando la sección está en el centro de la pantalla
      toggleActions: "play none none none", // Solo se reproduce una vez
    }
  });

  const totalDuration = 4; // Duración total para todos los contadores en segundos

  counters.forEach(counter => {
    const start = parseInt(counter.getAttribute('data-start'), 10);
    const end = parseInt(counter.getAttribute('data-end'), 10);

    const steps = Math.floor(totalDuration * 60); // Total de pasos (asumiendo 60 FPS)
    const increment = Math.ceil((end - start) / steps); // Incremento por paso

    let obj = { value: start }; // Objeto animado

    // Añadir la animación al timeline
    tl.to(obj, {
      value: end,
      duration: totalDuration, // Duración compartida para sincronizar
      ease: "power1.out", // Interpolación suave
      onUpdate: function () {
        // Los saltos en los números se hacen con increments
        const displayValue = Math.min(obj.value + increment, end);
        counter.textContent = displayValue.toFixed(0);
        obj.value = displayValue; // Asegura que no pase del valor final
      }
    }, 0); // Inicia todos los contadores al mismo tiempo
  });
}

// Llamar a la función
animateCountersOnScroll();
