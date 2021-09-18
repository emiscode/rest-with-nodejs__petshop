const moment = require('moment')
const db = require('../config/database')
const uploadFile = require('../utils/files/uploadFile')

class Pet {

    constructor() {
        this.tableName = 'pets'
    }

    create(pet, res) {
        const sql = `INSERT INTO ${this.tableName} set ?`

        uploadFile(pet.imagem, pet.nome, (err, storagePath) => {
            if (err) {
                res.status(400).json(err)
            } else {
                const newPet = { nome: pet.nome, imagem: storagePath }

                db.query(sql, newPet, (err, data) => {
                    if (!err) {
                        const petCadastrado = { id: data.insertId, ...newPet }
                        return res.status(201).json(petCadastrado)
                    }
                    else return res.status(400).json(err)
                })
            }
        })
    }
}

module.exports = new Pet()