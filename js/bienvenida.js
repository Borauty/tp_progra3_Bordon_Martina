function init() {
    imprimirDatosAlumno(alumno);
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


//Pantalla bienvenida

let input_nombre = document.getElementById("input-nombre");
let boton_continuar = document.getElementById("boton-continuar");
let error_nombre = document.getElementById("error-nombre");

boton_continuar.addEventListener("click", Event => {
    if (input_nombre.value.trim() == "") {
        error_nombre.classList.remove("error-oculto");
        return;
    }
    guardarNombreCliente(input_nombre.value.trim());
    window.location.href = "productos.html";
})

function guardarNombreCliente(nombre) {
    localStorage.setItem("nombreCliente", nombre);
}


init()