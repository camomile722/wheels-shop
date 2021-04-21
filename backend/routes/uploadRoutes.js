import express from 'express'
import multer from 'multer'
import path from 'path'

const router = express.Router()

const storage = multer.diskStorage({
  //request, file, callback
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    //extname: extension for image jpg or png
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  //extname - variable , path.extname - method - gets an extension from that file
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)
  // if extname and mimetype = true , than return cb with error : null and true
  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Nur Fotos!')
  }
}
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router
