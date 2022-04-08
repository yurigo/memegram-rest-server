const GenericDAO = require("./generic.dao");

class CommentsDAO extends GenericDAO {
    constructor() {
        super("comments")
    }
}

module.exports = CommentsDAO