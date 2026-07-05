export const validateId = (req, res, next) => {

    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || id <= 0) {
        return res.status(400).json({
            message: "El ID debe ser un número entero posible."
        });
    }

    next();

};


export const validateProduct = (req, res, next) => {

    const { name, category } = req.body;
    const price = Number(req.body.price);

    const errores = [];

    if (typeof name !== "string" || name.trim().length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres");
    }

    const price1 = parseInt(price)

    if (!Number.isFinite(price) || price <= 0) {
        errores.push("El precio debe ser un numero mayor a 0");
    }

    if (errores.length > 0) {
        return res.status(400).json({
            message: "Datos invalidos", errores
        })
    }

    next();
}
