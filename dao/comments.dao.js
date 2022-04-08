const GenericDAO = require("./generic.dao");

class CommentsDAO extends GenericDAO {
    constructor() {
        super("comments")
    }

    async getAllFromUser(user) {
        console.log(`SELECT * FROM ${this.tabla} WHERE idUser = '${user}`)
        const [results] = await global.connection
            .promise()
            .query("SELECT * FROM ?? WHERE idUser = ?", [this.tabla, user])
        return results;
    }

    async getAllFromPost(post) {
        console.log(`SELECT * FROM ${this.tabla} WHERE idPost = '${post}`)
        const [results] = await global.connection
            .promise()
            .query("SELECT * FROM ?? WHERE idPost = ? AND idComment is NULL", [this.tabla, post])
        return results;
    }

    async getAllFromComment(comment) {
        console.log(`SELECT * FROM ${this.tabla} WHERE idComment = '${comment}`)
        const [results] = await global.connection
            .promise()
            .query("SELECT * FROM ?? WHERE idComment = ?", [this.tabla, comment])
        return results;
    }


}

module.exports = CommentsDAO