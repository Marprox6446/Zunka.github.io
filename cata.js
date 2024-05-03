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
        // Código para actualizar el carrito...
    }

    // Cargar los productos en el catálogo al cargar la página
    cargarProductos();

    // Manejar el evento del botón "Carrito" para ir a la página del carrito
    const verCarritoBtn = document.createElement("button");
    verCarritoBtn.textContent = "Ir al Carrito";
    verCarritoBtn.classList.add("button");
    verCarritoBtn.addEventListener("click", function() {
        window.location.href = "carrito.html"; // Reemplaza "carrito.html" con la ruta real de tu página del carrito
    });
    document.body.appendChild(verCarritoBtn);
});
