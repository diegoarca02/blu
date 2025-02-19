document.addEventListener('DOMContentLoaded', function () {
    // Inicializar PhotoSwipe para todas las imágenes dentro de Swiper
    var lightbox = new PhotoSwipeLightbox({
        gallery: '.swiper-gallery', // La galería donde están las imágenes
        children: 'a', // Selecciona los <a> dentro del swiper
        pswpModule: PhotoSwipe
    });

    lightbox.init();
});