const express = require('express');
const router = express.Router();
const upload = require("../multer")
const usercontroller = require("../Controller/user.controller")


router.post('/submit-form', upload.single('image'), usercontroller.submitForm);
router.get("/all-users",usercontroller.getUsers)
router.get("/user/:id",usercontroller.getUsersById)
router.delete("/userdelete/:id",usercontroller.getUserByIdDelete)
router.put("/userupdate/:id", upload.single('image'), usercontroller.updateUserById);
module.exports = router;
