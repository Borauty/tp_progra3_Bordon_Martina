import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {

    const { user, password } = req.body;

    const [rows] = await userModel.getUserByUsername(user);

    if (rows.length === 0) {
        return res.status(401).send("Usuario o contraseña incorrectos");
    }

    const usuario = rows[0];

    const coincide = await bcrypt.compare(
        password,
        usuario.password
    );

    if (!coincide) {
        return res.status(401).send("Usuario o contraseña incorrectos");
    }

    req.session.user = {
        id: usuario.id,
        user: usuario.user
    };
    return res.redirect("/admin");

};

export const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/admin/login");
    });
};