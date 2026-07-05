import connection from "../database/db.js";

const selectAllProducts = () => {
    const sql = "SELECT id, name, price, image, category, active FROM products";

    return connection.query(sql);
}


const selectProductById = (id) => {
    const sql = "SELECT id, name, price, image, category, active FROM products where products.id = ?";
    return connection.query(sql, [id]);
}



const insertProduct = (name, image, category, price) => {

    const sql = "INSERT INTO products (name, image, category, price) VALUES (?, ?, ?, ?)";

    return connection.query(sql, [name, image, category, price]);
}


const updateProduct = (name, image, category, price, active, id) => {
    const sql = "UPDATE products SET name = ?, image = ?, category = ?, price = ?, active = ? WHERE id = ?";

    return connection.query(sql, [name, image, category, price, active, id]);
}


const deleteProduct = (id) => {
    const sql = "DELETE FROM products WHERE id = ?";
    return connection.query(sql, [id]);
}


export default {
    selectAllProducts,
    selectProductById,
    insertProduct,
    updateProduct,
    deleteProduct
}