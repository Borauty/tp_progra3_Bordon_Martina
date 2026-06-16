# Práctica frontend de tienda de frutas
Este proyecto consiste en el desarrollo de un frontend para una tienda de frutas

#### Instrucciones de la práctica:
- Desarrollá los puntos en el orden indicado
- Se valorará un código limpio, bien comentado y estructurado
- Recordá utilizar comentarios para separar bloques de código
- Incorporá comentarios de al menos varias líneas que expliquen de forma sencilla cómo pensamos la resolución del ejercicio y qué decidimos implementar y por qué
- Todos los cambios incorporados deben poder actualizarse visualmente

---

## Preguntas:
### Ejercicio 1 _____________
Crea un array de objetos con 13 frutas. Cada objeto debe tener las siguientes claves:
- id
- nombre
- precio
- ruta de la imagen (correspondiente a la carpeta img)

---

### Ejercicio 2 _____________
Modifica la función inicializadora `init()` para incluir una función que imprima tu nombre y apellido en el `<nav>` del HTML y también en la consola. Pasos:

- Crea un objeto alumno con tus datos (dni, nombre, apellido)

- Usa backticks (``) para mostrar en consola un mensaje que incluya estos datos desde el objeto

- Imprimí tu nombre y apellido en el `<nav>` y en la consola

- Todo esto debe ser parte de la funcion `imprimirDatosAlumno()`

---

### Ejercicio 3 _____________
Implementa una función que imprima en pantalla los productos (frutas) del array de objetos. Agrega esta función dentro de `init()`

El HTML generado debe seguir esta estructura:

```html
<div class="card-producto">
    <img src="" alt="">
    <h3></h3>
    <p>$</p>
    <button>Agregar al carrito</button>
</div>
```

---

### Ejercicio 4 _____________
Implementar una función de filtro, que se dispare al escribir en un campo input, filtrando los productos que coincidan con el campo de texto

---

### Ejercicio 5 _____________
1. Implementar la funcionalidad de carrito, esta debe estar asociada al boton de cada elemento del carrito. El carrito debe mostrarse por `console.log()`

2. Incorporar la funcion `mostrarCarrito()` asociada al boton de cada elemento del carrito El HTML generado debe seguir esta estructura:

```html
<li class="bloque-item">
    <p class="nombre-item">nombreProducto - precioProducto</p>
    <button class="boton-eliminar">Eliminar</button>
</li>
```

3. Incorporar la funcion `eliminarProducto()` . Este debe estar asociado al boton del carrito

---

### Ejercicio 6 _____________
- Almacena los productos del carrito en `localStorage`

- Los productos en el `localStorage` deben estar además con los últimos cambios de carrito y los productos que se hayan eliminado del carrito

- Si existen productos previamente en el `localStorage`, deben poder verse cuando se cargue la pagina

---

### Ejercicio 7 _____________
- Implementa un contador de números de productos del carrito. Este contador debe estar almacenado en una variable

- Implementa dos botones y un contador al lado de cada item en el carrito tipo `+ 2 -` . Pulsando `+` agregamos 1 producto mas de ese tipo y pulsando `-` reducimos un producto, si este numero llega a 0 debe desaparecer ese item del carrito

- Además, actualiza la cantidad de productos en el header, en la parte superior derecha en la parte de Carrito: 0 productos

- Actualiza el precio del valor total del carrito abajo de todo a la derecha (cuando haya productos en el carrito)

- Asegurate de que este valor se actualiza con cada cambio en el carrito y que se conserva cuando recargamos la pagina

---

### Ejercicio 8 _____________
- Crea cuatro botones junto al título de sección productos. Un boton que diga *ordenar por nombre a-z* , otro que diga *ordenar por nombre z-a*, otro que diga ordenar por menor precio y otro que diga ordenar por mayor precio

- Implementa la funcionalidad para ordenar los productos en estos cuatro botones botones. Un boton debe ordenar por nombre en orden alfabetico, los productos, el otro a la inversa del orden alfabetico, el otro por precio de menor a mayor y el último de mayor a menor

---

### Ejercicio 9 _____________
- Implementa la funcionalidad para Vaciar carrito. Crea un botón en la sección carrito que vacíe todo el carrito

- Si no hay productos en el carrito incluye alguna imagen o gif tipo carrito vacio con un texto que diga, no hay productos en el carrito

---

### Ejercicio 10_____________
- Estila la pagina tal cual está en la imagen `sample.png`