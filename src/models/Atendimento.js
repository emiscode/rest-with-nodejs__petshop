const axios = require('axios')
const moment = require('moment')
const db = require('../config/database')
const repository = require('../repositories/Atendimento')

class Atendimento {

    constructor() {
        this.tableName = 'atendimentos'

        this.isValidDate = ({ data, dataCriacao }) => moment(data).isSameOrAfter(dataCriacao);

        this.validations = [
            {
                name: 'date',
                isValid: this.isValidDate,
                message: 'Date should be same or after current date'
            }
        ]

        this.validate = (params) => {
            return this.validations.filter(obj => { 
                const { name } = obj
                const param = params[name]

                return !obj.isValid(param)
            })
        }
    }

    create(atendimento) {
        moment.locale('en')
        const dataCriacao = moment().format('YYYY-MM-DD hh:mm:ss')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD hh:mm:ss')
        
        const params = {
            date: { data, dataCriacao }
        }

        const errors = this.validate(params)

        if (errors && errors.length > 0) {
            return new Promise((resolve, reject) => reject(errors))
        }

        const atendimentoComData = { ...atendimento, dataCriacao, data }

        return repository.create(atendimentoComData)
            .then((res) => {
                const atendimentoCadastrado = { id: res.insertId, ...atendimentoComData }
                return atendimentoCadastrado
            })
    }

    listAll() {
        return repository.listAll()
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