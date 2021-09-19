const query = require('../utils/database/query')

class Atendimento {
    constructor() {
        this.tableName = 'atendimentos'
    }

    create(atendimento) {
        const sql = `INSERT INTO ${this.tableName} SET ?`

        return query(sql, atendimento)
    }

    listAll() {
        const sql = `SELECT * FROM ${this.tableName}`

        return query(sql)
    }
}

module.exports = new Atendimento()