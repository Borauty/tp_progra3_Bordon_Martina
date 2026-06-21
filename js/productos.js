function init() {
    imprimirDatosAlumno(alumno);
    imprimirProductos(obtenerPaginaActual());
    botonesOrden();
    botonesCategoria();
    botonesPaginacion();
    actualizarCarrito(traerCarrito());
}


//Datos de los alumnos (se repite en todas las pantallas)

const alumno = {
    nombre: 'Martina',
    apellido: 'Bordon'
}

function imprimirDatosAlumno(alumno1) {
    let nav = document.getElementById("nav_modificable");
    nav.innerHTML = `${alumno1.nombre} ${alumno1.apellido}`
}


//Catalogo de productos (genérico, despues se reemplaza por los reales)
//Se reusan imagenes viejas de fruta como placeholder visual

let productos_catalogo = [
    { id: 1, nombre: "Mouse Gamer RGB X1", precio: 15000, categoria: "perifericos", ruta_img: "img/anana.jpg", stock: 10, activo: true },
    { id: 2, nombre: "Mouse Gamer Inalambrico Z2", precio: 22000, categoria: "perifericos", ruta_img: "img/arandano.jpg", stock: 10, activo: true },
    { id: 3, nombre: "Teclado Mecanico TK-Pro", precio: 38000, categoria: "perifericos", ruta_img: "img/banana.jpg", stock: 10, activo: true },
    { id: 4, nombre: "Teclado Mecanico Compacto 60%", precio: 29000, categoria: "perifericos", ruta_img: "img/frambuesa.png", stock: 10, activo: true },
    { id: 5, nombre: "Mouse Gamer Ultraliviano W3", precio: 18500, categoria: "perifericos", ruta_img: "img/frutilla.jpg", stock: 10, activo: true },
    { id: 6, nombre: "Teclado Gamer Membrana K200", precio: 14000, categoria: "perifericos", ruta_img: "img/kiwi.jpg", stock: 10, activo: true },
    { id: 7, nombre: "Auriculares Gamer 7.1 SoundX", precio: 32000, categoria: "audio", ruta_img: "img/mandarina.jpg", stock: 10, activo: true },
    { id: 8, nombre: "Microfono Condensador StreamCast", precio: 45000, categoria: "audio", ruta_img: "img/manzana.jpg", stock: 10, activo: true },
    { id: 9, nombre: "Parlantes Gamer 2.1 BassBoost", precio: 27000, categoria: "audio", ruta_img: "img/naranja.jpg", stock: 10, activo: true },
    { id: 10, nombre: "Auriculares Inalambricos NightOwl", precio: 39000, categoria: "audio", ruta_img: "img/pera.jpg", stock: 10, activo: true },
    { id: 11, nombre: "Microfono USB PodCast Mini", precio: 21000, categoria: "audio", ruta_img: "img/pomelo-amarillo.jpg", stock: 10, activo: true },
    { id: 12, nombre: "Parlantes Compactos Desktop S1", precio: 16000, categoria: "audio", ruta_img: "img/pomelo-rojo.jpg", stock: 10, activo: true }
];

let productos_filtrados = productos_catalogo.filter(producto => producto.activo);


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
        productos_filtrados = productos_catalogo.filter(producto => producto.activo && producto.categoria == "perifericos");
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


//Carrito (con cantidad, no como antes)

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


// Almacenar lista de productos en localStorage

function almacenarProductos(productos) {
    localStorage.setItem("productos", JSON.stringify(productos))
}

function traerProductos() {
    return JSON.parse(localStorage.getItem("productos")) || [];
}



init()