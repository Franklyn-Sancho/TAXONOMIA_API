const express = require("express");
const controllers = require("../controllers/controllers.especies");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("main");
});

//rota EJS do formulário
router.get("/form", (req, res) => {
  res.render("formulario");
});



router.post("/form", controllers.saveNewSpecies);
router.get("/especies/ejs", controllers.returnViewEjs);
router.get("/especies/json", controllers.returnViewJson);
router.put("/especie/:name", controllers.updateSpecies);
router.delete("/especie/:name", controllers.deleteSpecies);
router.get("/especie/:name", controllers.returnOneSpecies);

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
