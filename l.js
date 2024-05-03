document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente

        // Obtener los valores de usuario, correo y contraseña
        const username = form.elements["username"].value;
        const email = form.elements["email"].value;
        const password = form.elements["password"].value;

        // Aquí deberías realizar la autenticación con una llamada al servidor
        // Simularemos una autenticación exitosa si el usuario es "admin" y la contraseña es "admin"
        if (username === "admin" && email === "admin@example.com" && password === "admin") {
            // Redirigir al administrador a la página de edición del catálogo
            window.location.href = "editor.html";
        } else {
            // Redirigir al usuario normal al catálogo
            window.location.href = "catalogo.html";
        }
    });
});