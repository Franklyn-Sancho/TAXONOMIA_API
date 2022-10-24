const express = require("express");
const controllers = require('../controllers/controllers.especies')
const auth = require('../middleware/auth')

const router = express.Router();


//rota EJS do formulário
router.get("/form", (req, res) => {
  res.render("formulario");
});

router.post("/form", controllers.saveNewSpecies);
router.get("/ejs", controllers.returnViewEjs);
router.get("/json", controllers.returnViewJson);
router.get("/:name", controllers.returnOneSpecie);

//rotas que só podem ser acessadosc como adm
router.put("/:name", auth, controllers.updateSpecies);
router.delete("/:name", auth, controllers.deleteSpecies);


module.exports = router;

