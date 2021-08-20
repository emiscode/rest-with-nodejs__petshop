const Atendimento = require('../models/Atendimento')

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.listAll(res)
    })

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Atendimento.listOne(id, res)
    })

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body

        Atendimento.create(atendimento, res)
    })
}