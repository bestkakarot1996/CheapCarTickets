const express = require("express");
const controllerUser = require("./users");
const {authenticate, authorize} = require("../../middleware/auth");
const {validationPostUser} = require("../../validations/users/validation.post.user");
const {validateLoginUser} = require("../../validations/users/validate.login.user");

const router = express.Router();

router.post("/",validationPostUser , controllerUser.createUsers);
router.post("/login" ,validateLoginUser, controllerUser.loginUser);
router.get("/", controllerUser.getUsers);
router.get("/:id", controllerUser.getUserParamsId);

// test private
router.get('/test-private',
  authenticate,
  authorize(["client"]),
  (req, res, next) => {
    res.status(200).json({ message: "You have all admin rights" })
  })



module.exports = router;


