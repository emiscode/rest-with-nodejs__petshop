const moment = require('moment')
const db = require('../config/database')

class Atendimento {

    constructor() {
        this.tableName = 'atendimentos'
    }
    
    create(atendimento, res) {
        moment.locale('en')
        const dataCriacao = moment().format('YYYY-MM-DD hh:mm:ss')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD hh:mm:ss')
        const isValidDate = moment(data).isSameOrAfter(dataCriacao);

        const validations = [
            { 
                name: 'date',
                isValid: isValidDate,
                message: 'Date should be same or after current date'
            }
        ]

        const errors = validations.filter(param => !param.isValid)

        if (errors && errors.length > 0) {
            return res.status(400).json(errors)
        }
        
        const atendimentoComData = {...atendimento, dataCriacao, data}

        const sql = `INSERT INTO ${this.tableName} set ?`

        db.query(sql, atendimentoComData, (err, data) => {
            if (!err) {
                const atendimentoCadastrado = {id: data.insertId, ...atendimentoComData} 
                return res.status(201).json(atendimentoCadastrado)
            }
            else return res.status(400).json(err)
        })
    }

    listAll(res) {
        const sql = `SELECT * FROM ${this.tableName}`

        db.query(sql, (err, data) => {
            if (!err) return res.status(200).json(data)
            else return res.status(400).json(err)
        })
    }

    listOne(id, res) {
        const sql = `SELECT * FROM ${this.tableName} WHERE id = ${id}`

        db.query(sql, (err, data) => {
            if (!err) return res.status(200).json(data)
            else return res.status(400).json(err)
        })
    }
}

module.exports = new Atendimento()