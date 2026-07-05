import express from "express";
import connection from "./api/database/db.js" ;
import environments from "./api/config/environments.js";
import cors from "cors";
import productRoutes from "./api/routes/product.routes.js"

const PORT = environments.port;
const app = express();
//Middleware basico para permitir que el servidor pueda recibir y procesar peticiones con contenido en formato JSON
app.use(cors());
//Middleware para parsear a JSON el cuerpo de las solicitudes POST y PUT.
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hola mundo!");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

app.use("/api/products", productRoutes);