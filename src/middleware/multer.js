const helper = require("../helper/helper.js");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    console.log(file);
    callback(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    return callback(new Error("File extension must be PNG or JPG"), false);
  }
};

let upload = multer({ storage, fileFilter, limits: { fileSize: 2097152 } }).single("user_image");

const uploadFilter = (request, response, next) => {
  upload(request, response, function (err) {
    if (err instanceof multer.MulterError) {
      return helper.response(response, 400, err.message);
    } else if (err) {
      return helper.response(response, 400, err.message);
    }
    next();
  });
};

module.exports = uploadFilter;
