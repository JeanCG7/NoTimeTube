const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

const dev_db_url = require('../mongooseConfig').url;

function Uploader(res, res, next) {
    var storage = new GridFsStorage({
        url: dev_db_url,
        file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
            if (err) {
                return reject(err);
            }
            const filename = buf.toString('hex') + path.extname(file.originalname);
            const fileInfo = {
                filename: filename,
                bucketName: 'videos'
            };
            resolve(fileInfo);
            });
        });
        }
    });

    var upload = multer({ storage });
    return upload;
}

module.exports = Uploader ;