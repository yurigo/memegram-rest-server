const GenericDAO = require("./generic.dao")

class UsersDAO extends GenericDAO {
    constructor() {
        super("users")
    }

    async all() {
        console.log(`In users: SELECT * FROM ${this.tabla}`)
        const users = await super.all();
        return users.map(u => {
            u.password = undefined;
            return u;
        });
    }

    async get(id) {
        console.log(`In users: SELECT * FROM ${this.tabla} where id = '${id}`)
        const user = await super.get(id);
        user.password = undefined;
        return user;
    }

}

module.exports = UsersDAO