const Atendimento = require('../models/Atendimento')

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.listAll()
        .then(list => {
            res.status(200).json(list)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    })

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Atendimento.listOne(id, res)
    })

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body

        Atendimento.create(atendimento)
            .then(atendimentoCadastrado => {
                res.status(201).json(atendimentoCadastrado)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const values = req.body

        Atendimento.update(id, values, res)
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const values = req.body

        Atendimento.delete(id, res)
    })
}