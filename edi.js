document.addEventListener("DOMContentLoaded", function() {
    // Función para obtener productos del almacenamiento local
    function obtenerProductosLocal() {
        return JSON.parse(localStorage.getItem("productos")) || [];
    }

    // Función para guardar productos en el almacenamiento local
    function guardarProductosLocal(productos) {
        localStorage.setItem("productos", JSON.stringify(productos));
    }

    // Aquí simularíamos cargar los productos del catálogo desde el servidor
    // Por ahora, utilizaremos datos simulados para mostrar cómo funcionaría
    let productos = obtenerProductosLocal(); // Obtener productos del almacenamiento local

    const tablaProductos = document.createElement("table");
    tablaProductos.classList.add("fadeIn"); // Añadimos la animación fadeIn a la tabla

    // Creamos la cabecera de la tabla
    const cabecera = tablaProductos.createTHead();
    const filaCabecera = cabecera.insertRow();
    filaCabecera.innerHTML = "<th>ID</th><th>Nombre</th><th>Precio</th><th>Descripción</th><th>Acciones</th>";

    // Creamos el cuerpo de la tabla con los productos
    const cuerpoTabla = tablaProductos.createTBody();
    productos.forEach(producto => {
        const filaProducto = cuerpoTabla.insertRow();
        filaProducto.innerHTML = `<td>${producto.id}</td><td>${producto.nombre}</td><td>$${producto.precio}</td><td>${producto.descripcion}</td><td><button class="button editar">Editar</button> <button class="button eliminar">Eliminar</button></td>`;
    });

    // Añadimos la tabla al contenedor
    const contenedor = document.querySelector(".container");
    contenedor.appendChild(tablaProductos);

    // Evento para botones de editar y eliminar
    tablaProductos.addEventListener("click", function(event) {
        const fila = event.target.closest("tr");
        const id = parseInt(fila.cells[0].textContent);

        if (event.target.classList.contains("editar")) {
            // Habilitar la edición de los campos de la fila
            const celdas = fila.cells;
            for (let i = 1; i < celdas.length - 1; i++) { // Excluimos la última celda de acciones
                const valorOriginal = celdas[i].textContent;
                celdas[i].innerHTML = `<input type="text" value="${valorOriginal}">`;
            }
            event.target.textContent = "Guardar";
            event.target.classList.remove("editar");
            event.target.classList.add("guardar");
        } else if (event.target.classList.contains("guardar")) {
            // Guardar los cambios editados del producto
            const celdas = fila.cells;
            for (let i = 1; i < celdas.length - 1; i++) {
                const nuevoValor = celdas[i].querySelector("input").value;
                celdas[i].textContent = nuevoValor;
            }
            event.target.textContent = "Editar";
            event.target.classList.remove("guardar");
            event.target.classList.add("editar");
        } else if (event.target.classList.contains("eliminar")) {
            // Implementar lógica para eliminar el producto con ID específico
            if (confirm(`¿Estás seguro que deseas eliminar el producto con ID ${id}?`)) {
                fila.remove(); // Eliminar la fila del producto de la tabla
                productos = productos.filter(producto => producto.id !== id); // Eliminar el producto del arreglo de productos
                guardarProductosLocal(productos); // Actualizar productos en el almacenamiento local
                alert(`Producto con ID ${id} eliminado correctamente.`);
            }
        }
    });

    // Manejo del formulario para agregar nuevo producto
    const modalNuevoProducto = document.getElementById("modalNuevoProducto");
    const nuevoProductoBtn = document.getElementById("nuevoProductoBtn");
    const closeBtn = document.querySelector(".close");
    const formularioNuevoProducto = document.getElementById("formularioNuevoProducto");

    nuevoProductoBtn.addEventListener("click", function() {
        modalNuevoProducto.style.display = "block";
    });

    closeBtn.addEventListener("click", function() {
        modalNuevoProducto.style.display = "none";
    });

    formularioNuevoProducto.addEventListener("submit", function(event) {
        event.preventDefault(); 
    
        const nombre = formularioNuevoProducto.elements["nombre"].value;
        const precio = formularioNuevoProducto.elements["precio"].value;
        const descripcion = formularioNuevoProducto.elements["descripcion"].value;
        const imagen = document.getElementById("imagenProducto").files[0]; // Obtener la imagen seleccionada
    
        console.log("Nombre del archivo:", imagen.name);
        console.log("Tipo de archivo:", imagen.type);
    
        const nuevoProducto = {
            id: productos.length + 1,
            nombre: nombre,
            precio: parseFloat(precio),
            descripcion: descripcion,
            imagen: imagen // Guardar la referencia de la imagen en el objeto nuevoProducto
        };
    
        productos.push(nuevoProducto); // Agregar el nuevo producto a la lista
        guardarProductosLocal(productos); // Guardar productos en el almacenamiento local
    
        const filaProducto = cuerpoTabla.insertRow(); // Esto debería funcionar ahora
        filaProducto.innerHTML = `<td>${nuevoProducto.id}</td><td>${nuevoProducto.nombre}</td><td>$${nuevoProducto.precio}</td><td>${nuevoProducto.descripcion}</td><td><button class="button editar">Editar</button> <button class="button eliminar">Eliminar</button></td>`;
    
        modalNuevoProducto.style.display = "none";
        formularioNuevoProducto.reset();
    });
       

    // Manejar el evento del botón para redirigir al catálogo
    const irAlCatalogoBtn = document.getElementById("irAlCatalogoBtn");
    irAlCatalogoBtn.addEventListener("click", function() {
        window.location.href = "catalogo.html"; // Reemplaza "ruta_del_catalogo.html" con la ruta real de tu página de catálogo
    });
});