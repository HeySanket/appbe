const multer = require("multer");

function multerStore(params) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./${params}`);
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({ storage: storage });
  return upload;
}

module.exports = multerStore;
