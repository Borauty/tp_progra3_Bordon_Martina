import connection from "../database/db.js";
import productModel from "../models/product.models.js";

export const getAllProducts = async (req, res) => {

    try {

        const [rows] = await productModel.selectAllProducts();

        if (rows.length === 0) {
            return res.status(404).json({
                message: "No se encontraron productos"
            });
        }

        res.status(200).json({
            total: rows.length,
            payload: rows
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error interno del servidor"
        });

    }

};


export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await productModel.selectProductById(id);

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
};


export const createProduct = async (req, res) => {
    try {
        const { name, image, category, price } = req.body;

        await productModel.insertProduct(name, image, category, price);

        res.status(201).json({
            message: "Producto creado correctamente"
        });

    } catch (error) {
        console.error("Error al crear el producto: ", error.message);
        res.status(500).json({
            message: "Error al crear el producto"
        });
    }
};


export const modifyProduct = async (req, res) => {

    try {
        // Con el destructuring, recibimos todos los datos del producto
        const { id, name, image, category, price, active } = req.body;

        const [result] = await productModel.updateProduct(name, image, category, price, active, id);

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

        res.status(500).json({
            message: "Error interno al actualizar el producto"
        });
    }
};

export const removeProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await productModel.deleteProduct(id);

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
};