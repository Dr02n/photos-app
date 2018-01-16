module.exports = (req, file, cb) => {
  cb(null, file.mimetype.startsWith('image/'))
}
