const express = require("express");
const router = express.Router();
const controllers = require("../controllers/controllers.users");

router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get("/signin", (req, res) => {
  res.render("signin");
});
router.post("/signup", controllers.signup);
router.post("/signin", controllers.signin);

module.exports = router;
