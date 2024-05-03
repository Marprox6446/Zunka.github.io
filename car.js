document.addEventListener("DOMContentLoaded", function() {
    // Función para cargar los productos en el catálogo
    function cargarProductos() {
        const productos = JSON.parse(localStorage.getItem("productos")) || [];
        const catalogoContainer = document.getElementById("catalogo");
        catalogoContainer.innerHTML = ""; // Limpiar el contenedor del catálogo

        if (productos.length === 0) {
            catalogoContainer.innerHTML = "<p>No hay productos disponibles.</p>";
        } else {
            productos.forEach(producto => {
                const itemProducto = document.createElement("div");
                itemProducto.classList.add("producto");
                itemProducto.setAttribute("id", `producto-${producto.id}`);

                const nombrePrecio = document.createElement("div");
                nombrePrecio.textContent = `${producto.nombre} - $${producto.precio}`;
                const descripcion = document.createElement("div");
                descripcion.textContent = `Descripción: ${producto.descripcion}`;
                
                const botonAgregar = document.createElement("button");
                botonAgregar.textContent = "Añadir al Carrito";
                botonAgregar.classList.add("button");
                botonAgregar.addEventListener("click", function() {
                    agregarAlCarrito(producto);
                });

                itemProducto.appendChild(nombrePrecio);
                itemProducto.appendChild(descripcion);
                itemProducto.appendChild(botonAgregar);
                catalogoContainer.appendChild(itemProducto);
            });
        }
    }

    // Función para agregar un producto al carrito
    function agregarAlCarrito(producto) {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const index = carrito.findIndex(item => item.id === producto.id);

        if (index !== -1) {
            carrito[index].cantidad++;
        } else {
            carrito.push({...producto, cantidad: 1});
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
    }

    // Función para actualizar la visualización del carrito
    function actualizarCarrito() {
        const listaCarrito = document.getElementById("listaCarrito");
        listaCarrito.innerHTML = ""; // Limpiar el contenido actual del carrito

        // Recuperar productos del carrito del almacenamiento local
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        // Mostrar los productos del carrito en la página
        carrito.forEach((producto, index) => {
            const itemCarrito = document.createElement("li");
            itemCarrito.textContent = `${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: $${producto.precio}`;
            
            const botonEliminar = document.createElement("button");
            botonEliminar.textContent = "Eliminar";
            botonEliminar.classList.add("button");
            botonEliminar.addEventListener("click", function() {
                eliminarDelCarrito(index);
            });

            itemCarrito.appendChild(botonEliminar);
            listaCarrito.appendChild(itemCarrito);
        });

        // Mostrar el total de productos y el total a pagar
        const totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
        const totalPagar = carrito.reduce((total, producto) => total + (producto.cantidad * producto.precio), 0);

        document.getElementById("totalProductos").textContent = totalProductos;
        document.getElementById("totalPagar").textContent = totalPagar.toFixed(2);
    }

    // Cargar los productos en el catálogo al cargar la página
    cargarProductos();

    // Manejar el evento del botón "Carrito" para ir a la página del carrito
    const verCarritoBtn = document.getElementById("verCarritoBtn");
    verCarritoBtn.addEventListener("click", function() {
        window.location.href = "carrito.html"; // Reemplaza "carrito.html" con la ruta real de tu página del carrito
    });
});

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1); // Eliminar el producto en la posición index del array
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito(); // Actualizar la visualización del carrito después de eliminar el producto
}

// Función para vaciar el carrito
function vaciarCarrito() {
    localStorage.removeItem("carrito"); // Eliminar el carrito del almacenamiento local
    actualizarCarrito(); // Actualizar la visualización del carrito después de vaciarlo
}

// Manejar el evento del botón para regresar al catálogo
const regresarBtn = document.getElementById("regresarBtn");
regresarBtn.addEventListener("click", function() {
    window.location.href = "catalogo.html"; // Reemplaza "catalogo.html" con la ruta real de tu página de catálogo
});

document.addEventListener("DOMContentLoaded", function() {
    const listaCarrito = document.getElementById("listaCarrito");

    // Recuperar productos del carrito del almacenamiento local
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Mostrar los productos del carrito en la página
    carrito.forEach(producto => {
        const itemCarrito = document.createElement("li");
        itemCarrito.textContent = `${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: $${producto.precio}`;
        listaCarrito.appendChild(itemCarrito);
    });
});




document.addEventListener("DOMContentLoaded", function() {
    const listaCarrito = document.getElementById("listaCarrito");
    const btnVaciarCarrito = document.getElementById("vaciarCarritoBtn");

    // Recuperar productos del carrito del almacenamiento local
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Mostrar los productos del carrito en la página
    function mostrarProductosCarrito() {
        listaCarrito.innerHTML = ""; // Limpiar la lista antes de volver a mostrar los productos

        carrito.forEach((producto, index) => {
            const itemCarrito = document.createElement("li");
            itemCarrito.textContent = `${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: $${producto.precio}`;

            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "Eliminar";
            btnEliminar.classList.add("eliminar-btn");
            btnEliminar.addEventListener("click", function() {
                eliminarDelCarrito(index);
            });

            itemCarrito.appendChild(btnEliminar);
            listaCarrito.appendChild(itemCarrito);
        });
    }

    mostrarProductosCarrito(); // Mostrar los productos del carrito al cargar la página

    // Función para eliminar un producto del carrito
    function eliminarDelCarrito(index) {
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarProductosCarrito(); // Actualizar la lista de productos del carrito en la página
    }

    // Función para vaciar el carrito
    btnVaciarCarrito.addEventListener("click", function() {
        carrito = []; // Vaciar el array del carrito
        localStorage.removeItem("carrito"); // Eliminar el carrito del almacenamiento local
        mostrarProductosCarrito(); // Actualizar la lista de productos del carrito en la página
    });
});
