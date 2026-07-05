const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorForm = document.getElementById("contenedorForm");
const getProductForm = document.getElementById("getProduct-form");

getProductForm.addEventListener("submit", async event => {
    event.preventDefault();

    const idProd = event.target.idProd.value.trim();

    try {
        const response = await fetch(`http://localhost:4000/api/products/${idProd}`);

        if (response.status === 404) {
            contenedorProductos.innerHTML = "<p>No se encontró ningún producto con ese id.</p>";
            contenedorForm.innerHTML = "";
            return;
        }

        const datos = await response.json();
        const producto = datos.payload;

        renderizarProducto(producto);

    } catch (error) {
        console.error("Error al obtener el producto:", error);
        contenedorProductos.innerHTML = "<p>Ocurrió un error al buscar el producto.</p>";
    }
});

function renderizarProducto(producto) {
    contenedorProductos.innerHTML = `
        <ul>
            <li class="lista-producto">
                <img src="${producto.image}" alt="${producto.name}">
                <p>Id: ${producto.id} / Nombre: ${producto.name} / <strong>Precio: $${producto.price}</strong></p>
                <input type="button" id="updateProduct-button" value="Actualizar Producto">
            </li>
        </ul>
    `;

    contenedorForm.innerHTML = "";

    const updateProductButton = document.getElementById("updateProduct-button");

    updateProductButton.addEventListener("click", event => {
        event.stopPropagation();

        const confirmacion = confirm("¿Querés actualizar este producto?");

        if (confirmacion) {
            formularioPutProducto(event, producto);
        }
    });
}

function formularioPutProducto(event, producto) {
    event.stopPropagation();
    console.log(producto); // El producto llega correctamente

    let updateProductForm = `
        <h2>Actualizar producto</h2>

        <form id="postProduct-form" class="form-productos">
            <input type="hidden" name="id" value="${producto.id}">

            <label for="nameProd">Nombre</label>
            <input type="text" name="name" id="nameProd" value="${producto.name}" required>

            <label for="imageProd">Imagen</label>
            <input type="text" name="image" id="imageProd" value="${producto.image}" required>

            <label for="categoryProd">Categoria</label>
            <select name="category" id="categoryProd" required>
                <option value="mouse_teclado" ${producto.category === "mouse_teclado" ? "selected" : ""}>Periféricos</option>
                <option value="audio" ${producto.category === "audio" ? "selected" : ""}>Audio</option>
            </select>

            <label for="priceProd">Precio</label>
            <input type="number" name="price" id="priceProd" value="${producto.price}" required>

            <div>
                <input type="submit" value="Actualizar producto">
            </div>
        </form>
    `;

    contenedorForm.innerHTML = updateProductForm;

    const postProductForm = document.getElementById("postProduct-form");

    // En vez de escribir la función acá adentro, la registramos por nombre
    postProductForm.addEventListener("submit", actualizarProducto);
}

// Envío de datos del formulario de actualización de producto
async function actualizarProducto(event) {
    event.preventDefault(); // Evitamos el envío por defecto del formulario

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("http://localhost:4000/api/products", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        alert(result.message);

        contenedorProductos.innerHTML = "";
        contenedorForm.innerHTML = "";

    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        alert("Ocurrió un error al actualizar el producto.");
    }
}