const GenericDAO = require("./generic.dao");

class PostsDAO extends GenericDAO {
    constructor() {
        super("posts")
    }

    async getAllFromUser(user) {
        console.log(`SELECT * FROM ${this.tabla} WHERE idUser = '${user}`)

        const [results] = await global.connection.promise().query("SELECT * FROM ?? WHERE idUser = ?", [this.tabla, user])
        return results;
    }
}

module.exports = PostsDAO