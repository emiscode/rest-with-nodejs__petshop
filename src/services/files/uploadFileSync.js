const fs = require('fs')

const path = './assets/img/'
const file = 'cheetos.jpg'

fs.readFile(path + file, (err, buffer) => {
    console.log(buffer)

    const fileName = file.split('.')
    const newFile = `${fileName[0]}-sync.${fileName[1]}`

    fs.writeFile(path + newFile, buffer, (err) => {
        console.log(`New image saved ${path + newFile}`)
    })
})