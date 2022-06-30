const express = require("express");
const controllers = require("../controllers/controllers.especies");
const auth = require('../middleware/auth')

const router = express.Router();


//rota EJS do formulário
router.get("/form", (req, res) => {
  res.render("formulario");
});

router.post("/form", controllers.saveNewSpecies);
router.get("/ejs", controllers.returnViewEjs);
router.get("/json", controllers.returnViewJson);
router.get("/:name", controllers.returnOneSpecies);
router.get('/teste', controllers.returnViewJsonOffline)
router.put("/:name", auth, controllers.updateSpecies);
router.delete("/:name", auth, controllers.deleteSpecies);


module.exports = router;

/**
 * => controle de validação de formulário - FEITO 21/06/2022
 * => sistema de autenticação de usuário
 * => rotas privadas para usuários autenticados
 * => sistema de administrador e moderador
 * => controle de exceções
 * => conceito de SOLID ou melhoria de código
 * => criação de logs mais explicativos
 */
