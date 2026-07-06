import connection from "../database/db.js";

const getUserByUsername = (user) => {

    const sql = "SELECT * FROM users WHERE user = ?";

    return connection.query(sql, [user]);

};

export default {
    getUserByUsername
};