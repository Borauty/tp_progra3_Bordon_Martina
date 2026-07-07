// Estamos realizando una request a este servidor para obtener información de los usuarios
fetch('https://jsonplaceholder.typicode.com/users')

// Cuando la request se complete, vamos a recibir una respuesta 
.then(response => {
    console.log(response) //Mostramos por consola la respuesta que recibimos del servidor

    // Convertimos la respuesta a JSON
    return response.json() /*Aca parseamos el json, como es una operación asincrónica,
                            debemos retornar la promesa que nos devuelve el método json()*/
    
    //paso 3: Recibimos el JSON parseado y lo mostramos por consola
    .then(data => console.log(data))
    
    .catch(error => console.error('Error al parsear el JSON:', error)) //Manejamos el error en caso de que falle el parseo del JSON
}) 

//Paso 1: Defino una funcion asincrona que hará una petición HTTP a una API Rest para obtener datos en JSON
async function obtenerPosts() {
    
    
    //Creamos una constante llamada 'response' a la cual no se le va a cargar nada hasta que fetch termine de ejecutar la petición HTTP a la URL que le pasamos como parámetro.
    // ya que fetch es una función asincrónica, debemos usar la palabra reservada 'await' 
    // para que espere a que fetch termine de ejecutar la petición HTTP antes de continuar con el resto del código.

    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    
    //Mostramos por consola la respuesta cruda que recibimos del servidor
    console.log(response) 
    
    const datos = await response.json(); //Parseamos la respuesta a JSON y cuando terminamos 
    // la guardamos en la constante 'datos'
    console.log(datos)
}