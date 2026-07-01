async function init() {
    await cargarProductos();
    imprimirProductos(productos_catalogo);
}

//Catalogo de productos: se trae desde el backend (MySQL via API)

let productos_catalogo = [];

async function cargarProductos() {
    const respuesta = await fetch("http://localhost:4000/api/products");
    const data = await respuesta.json();

    // Transformamos los datos para que coincidan con los nombres que usa nuestro código
    productos_catalogo = data.payload.map(producto => ({
        id: producto.id,
        nombre: producto.name,
        precio: Number(producto.price),
        categoria: producto.category,
        ruta_img: producto.image,
        activo: producto.active === 1
    }));
}


//Render de productos

let contenedor_productos = document.getElementById("contenedor-productos");

function imprimirProductos(lista_productos) {
    contenedor_productos.innerHTML = "";
    for (let i = 0; i < lista_productos.length; i++) {
        contenedor_productos.innerHTML += `<div class = "card-producto">
                        <img src="${lista_productos[i].ruta_img}">
                        <h3>${lista_productos[i].nombre}</h3>
                        <p>Id: ${lista_productos[i].id}</p>
                        <p>$${lista_productos[i].precio}</p>
                        <p>Categoría: ${lista_productos[i].categoria}</p>
                        <p>Estado: ${lista_productos[i].activo ? "Activo" : "Inactivo"}</p>
                        </div>`
    }
}


init()