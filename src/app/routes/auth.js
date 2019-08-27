const express = require('express');
// const multer = require('multer');
// const uploadConfig = require('./config/upload')
const AuthController = require('../controllers/authController');

const routes = express.Router();
// const upload = multer(uploadConfig);

routes.post('/token', AuthController.token);
// routes.post('/posts', upload.single('image'), PostController.store);

// routes.post('/posts/:id/like', LikeController.store);


// module.exports = app => app.use('/auth', router);
module.exports = routes;