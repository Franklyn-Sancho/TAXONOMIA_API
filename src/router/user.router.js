const express = require("express");
const router = express.Router();
const controllers = require("../controllers/controllers.users");

router.get("/user/signup", (req, res) => {
  res.render("signup");
});
router.get("/user/signin", (req, res) => {
  res.render("signin");
});
router.post("/user/signup", controllers.signup);
router.post("/user/signin", controllers.signin);

module.exports = router;
