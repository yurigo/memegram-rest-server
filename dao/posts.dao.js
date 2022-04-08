const GenericDAO = require("./generic.dao");

class PostsDAO extends GenericDAO {
    constructor() {
        super("posts")
    }
}

module.exports = PostsDAO