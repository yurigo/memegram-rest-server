
class GenericDAO {

    constructor(tabla) {
        this.tabla = tabla;
    }

    async all() {
        console.log(`SELECT * FROM ${this.tabla}`)
        const [results] = await global.connection.promise().query("SELECT * FROM ??", [this.tabla])
        return results;
    }

    async get(id) {
        console.log(`SELECT * FROM ${this.tabla} WHERE id = '${id}`)
        const [results] = await global.connection.promise().query("SELECT * FROM ?? where id = ?", [this.tabla, id])
        return results[0];
    }

    async post(user) {
        throw new Error("not implemented")
        return {}
    }

    async update(id, data) {
        throw new Error("not implemented")
        return {}
    }

    async delete(id) {
        throw new Error("not implemented")
        return {}
    }

}

module.exports = GenericDAO