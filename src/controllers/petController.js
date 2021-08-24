const Pet = require('../models/Pet')

module.exports = app => {
    app.post('/pet', (req, res) => {
        const pet = req.body

        Pet.create(pet, res)
    })
}