const fs = require('fs')

const path = './assets/img/'
const file = 'cheetos.jpg'

const fileName = file.split('.')
const newFile = `${fileName[0]}-stream.${fileName[1]}`

fs.createReadStream(path + file)
    .pipe(fs.createWriteStream(path + newFile))
    .on('finish', () => {
        console.log(`New image saved ${path + newFile}`)
    })