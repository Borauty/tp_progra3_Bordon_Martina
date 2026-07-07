async function init() {
    await cargarProductos();
    imprimirProductos(obtenerPaginaActual());
    botonesOrden();
    botonesCategoria();
    botonesPaginacion();
    actualizarCarrito(traerCarrito());
}

//Catalogo de productos: ahora se trae desde el backend (MySQL via API)

let productos_catalogo = [];
let productos_filtrados = [];

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

    productos_filtrados = productos_catalogo.filter(producto => producto.activo);
}


//Paginacion

let pagina_actual = 1;
const productos_por_pagina = 6;

function obtenerPaginaActual() {
    let inicio = (pagina_actual - 1) * productos_por_pagina;
    let fin = inicio + productos_por_pagina;
    return productos_filtrados.slice(inicio, fin);
}

function botonesPaginacion() {
    let boton_anterior = document.getElementById("paginaAnterior");
    let boton_siguiente = document.getElementById("paginaSiguiente");

    boton_anterior.addEventListener("click", Event => {
        if (pagina_actual > 1) {
            pagina_actual--;
            imprimirProductos(obtenerPaginaActual());
            actualizarNumeroPagina();
        }
    })

    boton_siguiente.addEventListener("click", Event => {
        let total_paginas = Math.ceil(productos_filtrados.length / productos_por_pagina);
        if (pagina_actual < total_paginas) {
            pagina_actual++;
            imprimirProductos(obtenerPaginaActual());
            actualizarNumeroPagina();
        }
    })
}

function actualizarNumeroPagina() {
    let numero_pagina = document.getElementById("numero-pagina");
    numero_pagina.innerText = `Página ${pagina_actual}`;
}


//Render de productos

let contenedor_productos = document.getElementById("contenedor-productos");

function imprimirProductos(lista_productos) {
    contenedor_productos.innerHTML = "";
    for (let i = 0; i < lista_productos.length; i++) {
        contenedor_productos.innerHTML += `<div class = "card-producto">
                        <img src="${lista_productos[i].ruta_img}">
                        <h3>${lista_productos[i].nombre}</h3>
                        <p>$${lista_productos[i].precio}</p>
                        <button class = "boton-producto-carrito" data-id="${lista_productos[i].id}">Agregar al carrito</button>
                        </div>`
    }
    agregarEventosCarrito();
}


//Categorias

function botonesCategoria() {
    let boton_perifericos = document.getElementById("botonPerifericos");
    let boton_audio = document.getElementById("botonAudio");
    let boton_todos = document.getElementById("botonTodos");

    boton_perifericos.addEventListener("click", Event => {
    productos_filtrados = productos_catalogo.filter(producto => producto.activo && producto.categoria == "mouse_teclado");
    pagina_actual = 1;
    imprimirProductos(obtenerPaginaActual());
    actualizarNumeroPagina();
    })

    boton_audio.addEventListener("click", Event => {
        productos_filtrados = productos_catalogo.filter(producto => producto.activo && producto.categoria == "audio");
        pagina_actual = 1;
        imprimirProductos(obtenerPaginaActual());
        actualizarNumeroPagina();
    })

    boton_todos.addEventListener("click", Event => {
        productos_filtrados = productos_catalogo.filter(producto => producto.activo);
        pagina_actual = 1;
        imprimirProductos(obtenerPaginaActual());
        actualizarNumeroPagina();
    })
}


//Buscador

let input_buscar = document.querySelector(".barra-busqueda");
input_buscar.addEventListener("keyup", Event => {
    const productos_buscados = productos_catalogo.filter(producto =>
        producto.activo && producto.nombre.toLowerCase().includes(input_buscar.value.toLowerCase())
    );
    imprimirProductos(productos_buscados);
})


//Ordenamiento

function botonesOrden() {
    let botonAZ = document.getElementById("OrdenarAZ");
    let botonZA = document.getElementById("OrdenarZA");
    let botonMasMen = document.getElementById("botonMasMen");
    let botonMenMas = document.getElementById("botonMenMas");

    botonAZ.addEventListener("click", Event => {
        productos_filtrados.sort((a, b) => a.nombre.localeCompare(b.nombre))
        imprimirProductos(obtenerPaginaActual())
    })

    botonZA.addEventListener("click", Event => {
        productos_filtrados.sort((a, b) => b.nombre.localeCompare(a.nombre))
        imprimirProductos(obtenerPaginaActual())
    })

    botonMasMen.addEventListener("click", Event => {
        productos_filtrados.sort((a, b) => a.precio - b.precio);
        imprimirProductos(obtenerPaginaActual())
    })

    botonMenMas.addEventListener("click", Event => {
        productos_filtrados.sort((a, b) => b.precio - a.precio);
        imprimirProductos(obtenerPaginaActual())
    })
}


//Carrito (con cantidad)

function agregarEventosCarrito() {
    let botones = document.querySelectorAll(".boton-producto-carrito");
    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            let id = Number(boton.dataset.id);
            let producto_seleccionado = productos_catalogo.find(producto => producto.id == id);
            agregarAlCarrito(producto_seleccionado);
        });
    });
}

function agregarAlCarrito(producto) {
    let carrito = traerCarrito();
    let item_existente = carrito.find(item => item.id == producto.id);

    if (item_existente) {
        item_existente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    almacenarCarrito(carrito);
    actualizarCarrito(carrito);
    mostrarMensajeCarrito();
}

function almacenarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

function traerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function actualizarCarrito(carrito) {
    let cant_productos_carrito = document.getElementById("contador-carrito");
    let total_items = carrito.reduce((acumulador, item) => acumulador + item.cantidad, 0);
    cant_productos_carrito.innerText = total_items;
}

function mostrarMensajeCarrito() {
    let mensaje = document.getElementById("mensaje-carrito");

    mensaje.classList.remove("mensaje-carrito-oculto");
    mensaje.classList.add("mensaje-carrito-visible");

    setTimeout(() => {
        mensaje.classList.remove("mensaje-carrito-visible");
        mensaje.classList.add("mensaje-carrito-oculto");
    }, 2000);
}

init()