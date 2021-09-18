const appConfig = require('./config/appConfig')
const db = require('./config/database')
const tables = require('./utils/database/Tables')

db.connect((err) => {
    if (!err) {
        tables.init(db)

        const app = appConfig()

        const APP_PORT = process.env.APP_PORT || 3000

        app.listen(APP_PORT, () => {
            console.log(`Server running on port ${APP_PORT}`)
        })
    } else console.log(err)
})