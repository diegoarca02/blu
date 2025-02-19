const items = gsap.utils.toArray('.menu-item-wrapper');
let active = null;

items.forEach(item => {
  const content = item.querySelector('.menu-content');
  addAnimation(content, item);

  // Evitar que el clic dentro del contenido cierre el menú
  content.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  item.addEventListener('click', () => {
    // Si el mismo elemento está activo, cerrarlo y quitar la clase
    if (active === item) {
      content.animation.reverse().eventCallback("onReverseComplete", () => {
        item.classList.remove('active-item');
      });
      active = null;
      return;
    }

    // Si hay otro menú abierto, cerrarlo y quitarle la clase cuando la animación termine
    if (active) {
      const previousItem = active;
      previousItem.querySelector('.menu-content').animation.reverse().eventCallback("onReverseComplete", () => {
        previousItem.classList.remove('active-item');
      });
    }

    // Reproducimos la animación del nuevo item seleccionado y agregamos la clase cuando se abra
    content.animation.play().eventCallback("onComplete", () => {
      item.classList.add('active-item');
    });

    active = item;
  });
});

function addAnimation(item, wrapper) {
  const height = item.getBoundingClientRect().height;
  const animation = gsap.timeline({ paused: true });

  animation.from(item, { y: -height, opacity: 0 });

  item.animation = animation;
}
