const fs = require('fs')
const path = require('path')

module.exports = (imgPath, imgName, callBackFileCreated) => {
    const fileTypes = ['jpg', 'jpeg', 'png']
    const extension = path.extname(imgPath)
    const isValidType = fileTypes.indexOf(extension.substring(1)) !== -1

    if (isValidType) {
        const storagePath = `./src/assets/img/storage/${imgName}${extension}`

        if (fs.existsSync(imgPath)) {
            fs.createReadStream(imgPath)
                .pipe(fs.createWriteStream(storagePath))
                .on('finish', () => callBackFileCreated(false, storagePath))
        } else {
            const err = `File not found ${imgPath}`
            console.log(err)
            callBackFileCreated(err)
        }

    } else {
        const err = `Invalid file type ${extension}`
        console.log(err)
        callBackFileCreated(err)
    }
}