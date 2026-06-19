{
/* Creando array como pro
const frutas = [];

function newFruta(id, nombre, precio, ruta_img) {
    const frutName = {
    Id: id,
    Nombre: nombre,
    Precio: precio,
    Ruta_img: ruta_img
    }
    frutas.push(frutName);
};

while (true) {
    let id = prompt("Cual es el id?:");
    let nombre = prompt("Cual es el nombre de venta?:");
    let precio = prompt("Cual es el precio por kg?:");
    let ruta_img = prompt("Cual es la ruta de imagen?:");

    newFruta(id, nombre, precio, ruta_img);

    let otraFruta = prompt("Quiere ingresar otra fruta?");
    if (otraFruta != "si") {
        break;
    }
}
*/

//Harcodeo

function init() {
    imprimirDatosAlumno(alumno);
    imprimirFrutas(frutas)
    mostrarCarrito(carrito)
    botonesOrden();
}





//Ejercicio1

const frutas = [
    { id: 1, nombre: "anana", precio: 1500, ruta_img: "img/anana.jpg" },
    { id: 2, nombre: "arandano", precio: 500, ruta_img: "img/arandano.jpg" },
    { id: 3, nombre: "banana", precio: 2300, ruta_img: "img/banana.jpg" },
    { id: 4, nombre: "frambuesa", precio: 600, ruta_img: "img/frambuesa.png" },
    { id: 5, nombre: "frutilla", precio: 2500, ruta_img: "img/frutilla.jpg" },
    { id: 6, nombre: "kiwi", precio: 1000, ruta_img: "img/kiwi.jpg" },
    { id: 7, nombre: "mandarina", precio: 2000, ruta_img: "img/mandarina.jpg" },
    { id: 8, nombre: "manzana", precio: 1800, ruta_img: "img/manzana.jpg" },
    { id: 9, nombre: "naranja", precio: 1300, ruta_img: "img/naranja.jpg" },
    { id: 10, nombre: "pera", precio: 2200, ruta_img: "img/pera.jpg" },
    { id: 11, nombre: "pomelo-amarillo", precio: 3000, ruta_img: "img/pomelo-amarillo.jpg" },
    { id: 12, nombre: "pomelo-rojo", precio: 3100, ruta_img: "img/pomelo-rojo.jpg" },
    { id: 13, nombre: "sandia", precio: 900, ruta_img: "img/sandia.jpg" }
];
//Ejercicio2

const alumno = {
    dni: 43324740,
    nombre: 'Lautaro',
    apellido: 'Bordon'
}

function imprimirDatosAlumno(alumno1) {
    console.log(`Hola ${alumno1.nombre} ${alumno1.apellido} `)

    let nav = document.getElementById("nav_modificable");
    nav.innerHTML = `${alumno1.nombre} ${alumno1.apellido} `

}



//Ejercicio3

let productos = document.getElementById("contenedor-productos");

function imprimirFrutas(frutas) {
    productos.innerHTML = "";
    for (let i = 0; i < frutas.length; i++) {
        productos.innerHTML += `<div class = "card-producto">
                        <img src="${frutas[i].ruta_img}">
                        <h3>${frutas[i].nombre}</h3>
                        <p>$${frutas[i].precio}</p>
                        <button class = "boton-fruta-carrito" data-id="${frutas[i].id}">Agregar al carrito</button>
                        </div>`
    }
    agregarEventosCarrito();
}




//Ejercicio4

let input_buscar = document.querySelector(".barra-busqueda");
input_buscar.addEventListener("keyup", Event => {
    const frutas_buscadas = []
    for (let i = 0; i < frutas.length; i++) {
        if (frutas[i].nombre.startsWith(input_buscar.value)) {
            frutas_buscadas.push(frutas[i])
        }
    }
    productos.innerHTML = ""
    imprimirFrutas(frutas_buscadas)
    if (frutas_buscadas.length == 0) {
        productos.innerHTML = `No se encontro ninguna fruta`
    }

})


//Ejercicio5

let carrito = traerCarrito();
if (carrito.length > 0) {
    mostrarCarrito(carrito);
}


function agregarEventosCarrito() {
    let botones = document.querySelectorAll(".boton-fruta-carrito");
    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            let id = Number(boton.dataset.id);
            let frutaSeleccionada = frutas.find(
                fruta => fruta.id == id
            );
            carrito.push(frutaSeleccionada);
            mostrarCarrito(carrito);
        });
    });



}
function mostrarCarrito(carrito) {
    let items_carrito = document.getElementById("items-carrito")
    let total_carrito = document.getElementById("precio-total")
    let acumulador_carrito = 0;
    items_carrito.innerHTML = ""
    if (carrito.length > 0) {
        for (let index = 0; index < carrito.length; index++) {
            items_carrito.innerHTML +=
                `<li class="bloque-item">
            <p class="nombre-item">${carrito[index].nombre} - $${carrito[index].precio}</p>
            <button class="boton-eliminar" data-fruta="${carrito[index].id}">Eliminar</button>
            </li>`
            acumulador_carrito += carrito[index].precio
        }
        eliminar_items();
    }else{
        items_carrito.innerHTML += `<p>No hay productos en el carrito</p>`
        let gif = document.createElement("img");
        gif.src = "img/carritoVacio.gif"
        gif.classList.add("gif-carrito-vacio");
        items_carrito.appendChild(gif);
    }
    total_carrito.innerText = `$${acumulador_carrito}`
    almacenarCarrito(carrito);
    actualizarCarrito(carrito);
}


function eliminar_items() {
    let eliminar_item = document.querySelectorAll(".boton-eliminar")
    eliminar_item.forEach(boton => {
        boton.addEventListener("click", () => {
            for (let i = 0; i < carrito.length; i++) {
                if (carrito[i].id == Number(boton.dataset.fruta)) {
                    carrito.splice(i, 1)
                    mostrarCarrito(carrito)
                    break
                }
            }
        });
    })
};

//Ejercicio6

function almacenarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

function traerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}


//Ejercicio7 incompleto

function actualizarCarrito(carrito) {
    let cant_productos_carrito = document.getElementById("contador-carrito");
    cant_productos_carrito.innerText = carrito.length;
}


//Ejercicio8

let seccion_productos = document.querySelector(".seccion-productos");

function botonesOrden() {

    let botonAZ = document.getElementById("OrdenarAZ");
    let botonZA = document.getElementById("OrdenarZA");
    let botonMasMen = document.getElementById("botonMasMen");
    let botonMenMas = document.getElementById("botonMenMas");

    botonAZ.addEventListener("click", Event => {
        frutas.sort((a, b) =>
            a.nombre.localeCompare(b.nombre))
        imprimirFrutas(frutas)
    })

    botonZA.addEventListener("click", Event => {
        frutas.sort((a, b) =>
            b.nombre.localeCompare(a.nombre))
        imprimirFrutas(frutas)
    })

    botonMasMen.addEventListener("click", Event => {
        frutas.sort((a, b) =>
            a.precio - b.precio);
        imprimirFrutas(frutas)
    })

    botonMenMas.addEventListener("click", Event => {
        frutas.sort((a, b) =>
            b.precio - a.precio);
        imprimirFrutas(frutas)
    })
}


//Ejercicio9

function vaciarCarrito(carrito) {
    carrito = []
    return carrito;
}

let bot_vaciar_carrito = document.getElementById("vaciar-carrito");
bot_vaciar_carrito.addEventListener("click", Event =>{
    carrito = vaciarCarrito(carrito);
    mostrarCarrito(carrito)
})



init()}