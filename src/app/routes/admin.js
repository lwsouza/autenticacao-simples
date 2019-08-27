const express = require('express');
// const multer = require('multer');
// const uploadConfig = require('./config/upload')
const UserController = require('../controllers/userController');
var auth = require("../middleware/auth")();

const routes = express.Router();
// const upload = multer(uploadConfig);

routes.get('/listusers', auth.authenticate(), UserController.findUsers);
routes.get('/listuser/:id', auth.authenticate(), UserController.findUserById);

routes.post('/createuser', auth.authenticate(), UserController.createUser);

routes.put('/updateuser', auth.authenticate(), UserController.updateUser);

// routes.post('/posts', upload.single('image'), PostController.store);

// routes.post('/posts/:id/like', LikeController.store);


// module.exports = app => app.use('/auth', router);
module.exports = routes;