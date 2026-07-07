function init() {
    mostrarCarrito(traerCarrito());
}


//Carrito

function traerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function almacenarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

function mostrarCarrito(carrito) {
    let items_carrito = document.getElementById("items-carrito")
    let total_carrito = document.getElementById("precio-total")
    let acumulador_carrito = 0;
    items_carrito.innerHTML = ""

    if (carrito.length > 0) {
        for (let index = 0; index < carrito.length; index++) {
            items_carrito.innerHTML +=
                `<div class="item-carrito">
                <p class="nombre-item">${carrito[index].nombre} - $${carrito[index].precio}</p>
                <div class="controles-cantidad">
                    <button class="boton-restar" data-id="${carrito[index].id}">-</button>
                    <span class="cantidad-item">${carrito[index].cantidad}</span>
                    <button class="boton-sumar" data-id="${carrito[index].id}">+</button>
                </div>
                <button class="boton-eliminar" data-id="${carrito[index].id}">Eliminar</button>
                </div>`
            acumulador_carrito += carrito[index].precio * carrito[index].cantidad
        }
        agregarEventosCantidad();
        eliminar_items();
    } else {
        items_carrito.innerHTML += `<p>No hay productos en el carrito</p>`
        let gif = document.createElement("img");
        gif.src = "img/carritoVacio.gif"
        gif.classList.add("gif-carrito-vacio");
        items_carrito.appendChild(gif);
    }
    total_carrito.innerText = `$${acumulador_carrito}`
    almacenarCarrito(carrito);
}


//Sumar y restar cantidad

function agregarEventosCantidad() {
    let botones_sumar = document.querySelectorAll(".boton-sumar");
    let botones_restar = document.querySelectorAll(".boton-restar");

    botones_sumar.forEach(boton => {
        boton.addEventListener("click", () => {
            let carrito = traerCarrito();
            let id = Number(boton.dataset.id);
            let item = carrito.find(producto => producto.id == id);
            item.cantidad++;
            mostrarCarrito(carrito);
        });
    });

    botones_restar.forEach(boton => {
        boton.addEventListener("click", () => {
            let carrito = traerCarrito();
            let id = Number(boton.dataset.id);
            let item = carrito.find(producto => producto.id == id);
            if (item.cantidad > 1) {
                item.cantidad--;
            }
            mostrarCarrito(carrito);
        });
    });
}


//Eliminar items

function eliminar_items() {
    let eliminar_item = document.querySelectorAll(".boton-eliminar")
    eliminar_item.forEach(boton => {
        boton.addEventListener("click", () => {
            let carrito = traerCarrito();
            for (let i = 0; i < carrito.length; i++) {
                if (carrito[i].id == Number(boton.dataset.id)) {
                    carrito.splice(i, 1)
                    mostrarCarrito(carrito)
                    break
                }
            }
        });
    })
};


//Vaciar carrito

function vaciarCarrito(carrito) {
    carrito = []
    return carrito;
}

let bot_vaciar_carrito = document.getElementById("vaciar-carrito");
let modal_vaciar = document.getElementById("modal-vaciar");
let boton_vaciar_si = document.getElementById("boton-vaciar-si");
let boton_vaciar_no = document.getElementById("boton-vaciar-no");

bot_vaciar_carrito.addEventListener("click", Event => {
    let carrito = traerCarrito();
    if (carrito.length == 0) {
        return;
    }
    modal_vaciar.classList.remove("modal-oculto");
    modal_vaciar.classList.add("modal-visible");
})

boton_vaciar_no.addEventListener("click", Event => {
    modal_vaciar.classList.remove("modal-visible");
    modal_vaciar.classList.add("modal-oculto");
})

boton_vaciar_si.addEventListener("click", Event => {
    let carrito = vaciarCarrito(traerCarrito());
    mostrarCarrito(carrito);
    modal_vaciar.classList.remove("modal-visible");
    modal_vaciar.classList.add("modal-oculto");
})

//Finalizar compra (con modal de confirmacion)

let boton_finalizar = document.getElementById("finalizar-compra");
let modal_confirmar = document.getElementById("modal-confirmar");
let boton_confirmar_si = document.getElementById("boton-confirmar-si");
let boton_confirmar_no = document.getElementById("boton-confirmar-no");

boton_finalizar.addEventListener("click", Event => {
    let carrito = traerCarrito();
    if (carrito.length == 0) {
        return;
    }
    modal_confirmar.classList.remove("modal-oculto");
    modal_confirmar.classList.add("modal-visible");
})

boton_confirmar_no.addEventListener("click", Event => {
    modal_confirmar.classList.remove("modal-visible");
    modal_confirmar.classList.add("modal-oculto");
})
boton_confirmar_si.addEventListener("click", async Event => {
    let carrito = traerCarrito();

    try {
        const respuesta = await fetch("http://localhost:4000/api/ventas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                carrito: carrito.map(item => ({
                    id: item.id,
                    precio: item.precio,
                    cantidad: item.cantidad
                }))
            })
        });

        if (!respuesta.ok) {
            alert("Hubo un error al registrar la compra. Intenta de nuevo.");
            return;
        }

        window.location.href = "ticket.html";
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        alert("No se pudo conectar con el servidor. Verifica tu conexion.");
    }
})

init()