class Tables {
    init(db) {
        this.db = db
        this.criarAtendimentos()
    }

    criarAtendimentos() {
        const tableName = 'atendimentos'

        const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (
            id int NOT NULL AUTO_INCREMENT, 
            cliente varchar(50) NOT NULL, 
            pet varchar(20), 
            servico varchar(20) NOT NULL,
            data datetime NOT NULL,
            dataCriacao datetime NOT NULL,
            status varchar(20) NOT NULL, 
            observacoes text, PRIMARY KEY(id)
        )`

        this.db.query(sql, (err) => {
            if (err) console.log(err)
        })
    }
}

module.exports = new Tables()