const db = require('../../config/database')

const runQuery = (query, params = '') => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, res, fields) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

module.exports = runQuery