// Obtén todas las imágenes del slider
const sliderImages = document.querySelectorAll('.slider-image');

// Función para cambiar la imagen activa
function changeActiveImage() {
    // Encuentra la imagen activa actual
    const activeImage = document.querySelector('.slider-image.active');

    // Si hay una imagen activa, la desactiva
    if (activeImage) {
        activeImage.classList.remove('active');
    }

    // Encuentra la siguiente imagen en la lista y la activa
    const nextImage = activeImage ? activeImage.nextElementSibling : sliderImages[0];
    if (nextImage) {
        nextImage.classList.add('active');
    } else {
        // Si no hay siguiente imagen, activa la primera imagen
        sliderImages[0].classList.add('active');
    }
}

// Cambia automáticamente la imagen activa cada 3 segundos
setInterval(changeActiveImage, 3000);
