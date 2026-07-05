import { Router } from "express";
import connection from "../database/db.js" ;
import { getAllProducts, getProductById, createProduct, modifyProduct, removeProduct} from "../controllers/product.controllers.js";



const router = Router();

// GET ALL
router.get("/", getAllProducts);

//GET por ID
router.get("/:id", getProductById);

// POST - Crear producto
router.post("/", createProduct);

router.delete("/:id", removeProduct);
// PUT - Actualizar producto
router.put("/", modifyProduct);

export default router;