const multer=require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/media')
    },
    filename: function (req, file, cb) {
      const uniquepPrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniquepPrefix+'-'+file.originalname)
    }
}
)

const upload = multer({ storage: storage, fileFilter: (req, file, cb) => {
  if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
      cb(null, true);
  } else {
      cb(new Error("Invalid file type! Only images and videos are allowed."), false);
  }
} })

module.exports={upload}