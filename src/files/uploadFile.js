const fs = require('fs')
const path = require('path')

module.exports = (imgPath, imgName, callBackFileCreated) => {
    const extension = path.extname(imgPath)
    const storagePath = `./src/assets/img/storage/${imgName}${extension}`

    fs.createReadStream(imgPath)
        .pipe(fs.createWriteStream(storagePath))
        .on('finish', () => callBackFileCreated(storagePath))
}