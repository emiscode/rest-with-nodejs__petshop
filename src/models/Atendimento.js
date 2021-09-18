const axios = require('axios')
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

        db.query(sql, async (err, result) => {
            const atendimento = result[0]
            const cpf = atendimento.cliente

            if (!err) {
                const { data } = await axios.get(`http://localhost:8082/cpf/${cpf}`)

                atendimento.cliente = data

                return res.status(200).json(atendimento)

            } else return res.status(400).json(err)
        })
    }

    update(id, values, res) {
        if (values.data) {
            values.data = moment(values.data, 'DD/MM/YYYY').format('YYYY-MM-DD hh:mm:ss')
        }

        const sql = `UPDATE ${this.tableName} SET ? WHERE id = ?`

        db.query(sql, [values, id], (err, data) => {
            if (!err) this.listOne(id, res)
            else return res.status(400).json(err)
        })
    }

    delete(id, res) {
        const sql = `DELETE FROM ${this.tableName} WHERE id = ?`

        db.query(sql, [id], (err, data) => {
            if (!err) res.status(200).send()
            else return res.status(400).json(err)
        })
    }
}

module.exports = new Atendimento()