const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, callback) => {
        callback(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

const filesUpload = multer({
    storage: storage,
});

module.exports = filesUpload;