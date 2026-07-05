import express from "express";
import connection from "./api/database/db.js" ;
import environments from "./api/config/environments.js";
import cors from "cors";
import productRoutes from "./api/routes/product.routes.js"
import viewRoutes from "./api/routes/view.routes.js"

const PORT = environments.port;
const app = express();

app.use(cors());
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "./src/views");

// Servimos los archivos estaticos (css, js, imagenes) desde la raiz del proyecto
app.use(express.static("."));

app.get("/", (req, res) => {
    res.send("Hola mundo!");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

app.use("/api/products", productRoutes);
app.use("/admin", viewRoutes);