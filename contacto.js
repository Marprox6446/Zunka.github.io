// En tu archivo JavaScript (metd.js)

// Se utiliza const en lugar de let para evitar redeclaraciones
const eventImages = ["1.jpg", "2.jpg", "3.jpg"]; // Agrega más rutas de imágenes según sea necesario
let currentImageIndex = 0;

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % eventImages.length;
    const eventImage = document.getElementById("event-image");
    eventImage.src = eventImages[currentImageIndex];
}

// Función para cambiar automáticamente las imágenes en el contenedor
let autoImageIndex = 0;
const autoImages = ["imagen1.jpg", "imagen2.jpg", "imagen3.jpg"];

function changeImageAutomatically() {
    const autoImage = document.querySelector(".auto-image");
    autoImage.src = autoImages[autoImageIndex];
    autoImageIndex = (autoImageIndex + 1) % autoImages.length;
}

// Llama a la función para cargar una imagen al cargar la página
window.onload = function () {
    changeImageAutomatically();
};

// Función para desplegar u ocultar el contenedor de preguntas
function toggleQuestions() {
    const arrowBox = document.getElementById("arrow-box");
    const questionsContainer = document.getElementById("questions-container");

    // Se añade condición para verificar si el contenedor es nulo antes de acceder a su estilo
    if (questionsContainer) {
        arrowBox.innerHTML = (questionsContainer.style.display === "none" || questionsContainer.style.display === "") ? "▲" : "▼";
        questionsContainer.style.display = (questionsContainer.style.display === "none" || questionsContainer.style.display === "") ? "block" : "none";
    }
}

// Función para enviar respuestas del formulario
function submitForm() {
    const answers = [];

    // Obtén todas las respuestas de los campos de entrada
    const inputElements = document.querySelectorAll('input[type="text"]');
    inputElements.forEach(input => {
        answers.push(input.value);
    });

    // Aquí puedes realizar acciones con las respuestas, como almacenarlas o enviarlas a un servidor
    console.log("Respuestas enviadas:", answers);
}
