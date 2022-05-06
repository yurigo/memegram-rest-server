const GenericDAO = require("./generic.dao");

class PostsDAO extends GenericDAO {
    constructor() {
        super("posts")
    }

    async post(body) {
        const { idUser , image } = body;
        console.log("posts.post" , idUser , image, this.tabla );
        const [results] = await global.connection.promise().query( `INSERT INTO ?? (idUser, image) VALUES (?, ?)`, [this.tabla , idUser, image] )
        //return results;

        //devuelvo el id
        body.id = results.insertId;
        return body;

    }
}

module.exports = PostsDAO