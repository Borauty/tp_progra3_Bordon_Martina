import express from "express";
import connection from "./database/db.js" ;
import environments from "./config/environments.js";
import cors from "cors";

const PORT = environments.port;
const app = express();
//Middleware basico para permitir que el servidor pueda recibir y procesar peticiones con contenido en formato JSON
app.use(cors());
//Middleware para parsear a JSON el cuerpo de las solicitudes POST y PUT.
app.use(express.json());

// Middleware de ruta para validar los datos del producto antes de crear/actualizar
const categoriasValidas = ["mouse_teclado", "audio"];

const validateProduct = (req, res, next) => {

    // Recogemos los datos del body
    const { name, price, category } = req.body;

    // Creamos un array de errores
    const errores = [];

    if (typeof name !== "string" || name.trim().length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres");
    }

    if (typeof price !== "number" || price <= 0) {
        errores.push("El precio debe ser un numero mayor a 0");
    }

    // No validaremos imagenes porque posteriormente usaremos Multer
    // https://www.npmjs.com/package/multer

    if (!categoriasValidas.includes(category)) {
        errores.push("Categoria invalida");
    }

    // Detectamos si existe algun error en la validacion
    if (errores.length > 0) {
        return res.status(400).json({
            message: "Datos invalidos",
            errores
        });
    }

    next();
};

app.get("/", (req, res) => {
    res.send("Hola mundo!");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// GET ALL
app.get("/api/products", async (req, res) => {

    try {
        // Optimizacion 1: evitamos traer columnas innecesarias en la consulta SQL (mas eficiente que SELECT *)
        const sql = "SELECT id, name, price, image, category, active FROM products";

        const [rows] = await connection.query(sql); // En rows guardamos los resultados de la consulta

        // Optimizacion 2: respuesta 404 si la BBDD no devuelve productos
        if (rows.length === 0) {
            return res.status(404).json({
                message: "No se encontraron productos"
            });
        }

        res.status(200).json({
            // Optimizacion 3: opcionalmente devolvemos la cantidad de productos
            total: rows.length,
            payload: rows
        });

    } catch (error) {
        console.error("Error obteniendo productos: ", error.message);

        // Optimizacion 4: si fallo la conexion a la BBDD, o la tabla no existe, devolvemos un 500
        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
});

//GET por ID
app.get("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Aplicamos la misma optimizacion de columnas que en GET ALL
        const sql = "SELECT id, name, price, image, category, active FROM products WHERE id = ?";

        const [rows] = await connection.query(sql, [id]);

        if (rows.length === 0) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        res.status(200).json({
            payload: rows[0]
        });

    } catch (error) {
        console.error("Error obteniendo producto por id: ", error.message);
        res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
});

// POST - Crear producto
app.post("/api/products/", validateProduct, async (req, res) => {
    try {
        const { name, image, category, price } = req.body;

        await connection.query(
            "INSERT INTO products (name, image, category, price) VALUES (?, ?, ?, ?)",
            [name, image, category, price]
        );

        res.status(201).json({
            message: "Producto creado correctamente"
        });

    } catch (error) {
        console.error("Error al crear el producto: ", error.message);
        res.status(500).json({
            message: "Error al crear el producto"
        });
    }
});

app.delete("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await connection.query(
            "DELETE FROM products WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Producto no encontrado"
            });
        }

        res.status(200).json({
            message: `Producto con id ${id} eliminado exitosamente`
        });

    } catch (error) {
        console.error("Error al eliminar producto:", error.message);

        res.status(500).json({
            message: "Error interno al eliminar el producto"
        });
    }
});
// PUT - Actualizar producto
app.put("/api/products", validateProduct, async (req, res) => {

    try {
        // Con el destructuring, recibimos todos los datos del producto
        const { id, name, image, category, price, active } = req.body;

        const sql = "UPDATE products SET name = ?, image = ?, category = ?, price = ?, active = ? WHERE id = ?";

        const [result] = await connection.query(sql, [name, image, category, price, active, id]);

        // Optimizacion: si no se actualizo ninguna fila, es porque el id no existe
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Producto no encontrado"
            });
        }

        return res.status(200).json({
            message: "Producto actualizado correctamente"
        });

    } catch (error) {
        console.error("Error al actualizar el producto:", error.message);

        // Antes esta ruta no respondia nada si fallaba: el fetch del frontend se hubiera quedado colgado
        res.status(500).json({
            message: "Error interno al actualizar el producto"
        }); 
    }
});