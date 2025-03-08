var express = require('express');
var router = express.Router();
const Controller = require('../controller/user');
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
var upload = multer({ storage: storage });

//create user
router.post('/',upload.single("image"),Controller.create)
//login with email or phone with passowrd
router.post('/login',Controller.login)

//get all users
router.get('/',Controller.getAll)
//get user by id
router.get('/:id',Controller.get)
//update user by id
router.put('/:id',upload.single("image"),Controller.update)
//delete user by id
router.delete('/:id',Controller.delete)
//delete all users
router.delete('/',Controller.deleteAll)

module.exports = router;
