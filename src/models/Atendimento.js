const db = require('../config/database')

class Atendimento {
    create(atendimento) {
        const tableName = 'atendimentos'

        const sql = `INSERT INTO ${tableName} set ?`

        db.query(sql, atendimento, (err, res) => {
            if (!err) console.log(res)
            else console.log(err)
        })
    }
}

module.exports = new Atendimento()