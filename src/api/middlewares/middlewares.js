export const validateId = (req, res, next) => {

    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || id <= 0) {
        return res.status(400).json({
            message: "El ID debe ser un número entero posible."
        });
    }

    next();

};

const categoriasValidas = ["mouse_teclado", "audio"];

export const validateProduct = (req, res, next) => {

    const { name, category } = req.body;
    const price = Number(req.body.price);

    const errores = [];

    if (typeof name !== "string" || name.trim().length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres");
    }

    if (!Number.isFinite(price) || price <= 0) {
        errores.push("El precio debe ser un numero mayor a 0");
    }

    if (!categoriasValidas.includes(category)) {
        errores.push("Categoria invalida");
    }

    if (errores.length > 0) {
        return res.status(400).json({
            message: "Datos invalidos", errores
        })
    }

    next();
}

export const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/admin/login");
    }
    next();
};