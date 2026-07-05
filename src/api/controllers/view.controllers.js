export const renderAdmin = (req, res) => {
    res.render("admin", {
        titulo: "Admin",
        script: "admin.js",
        cssExtra: ["admin.css"],
        activo: "ver"
    });
};

export const renderGet = (req, res) => {
    res.render("get", {
        titulo: "Admin - Consultar",
        script: "get.js",
        cssExtra: ["get.css"],
        activo: "consultar"
    });
};

export const renderPost = (req, res) => {
    res.render("post", {
        titulo: "Admin - Crear",
        script: "post.js",
        cssExtra: ["admin.css", "post.css"],
        activo: "crear"
    });
};

export const renderPut = (req, res) => {
    res.render("put", {
        titulo: "Admin - Modificar",
        script: "put.js",
        cssExtra: ["put.css"],
        activo: "modificar"
    });
};

export const renderDelete = (req, res) => {
    res.render("delete", {
        titulo: "Admin - Eliminar",
        script: "delete.js",
        cssExtra: ["delete.css"],
        activo: "eliminar"
    });
};