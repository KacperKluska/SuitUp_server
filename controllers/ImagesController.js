const multer = require('multer');
const path = require('path');

module.exports = function (app, express) {
  const storage = multer.diskStorage({
    destination: './public/images/',
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

  const upload = multer({
    storage: storage,
  });

  app.post('/image', upload.single('image'), (req, res, err) => {
    if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
      res.send({ msg: 'Only image files (jpg, jpeg, png) are allowed!' });
    } else {
      console.log(req.file);
      res.json(req.file);
    }
  });

  app.use('/get/image/', express.static(path.join('public/images', '/')));
};
