const express = require("express");

const Especies = require("../model/animals.model");
const User = require("../model/user.model");
const mongoose = require("mongoose");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const router = express.Router();

/**
 * ====> ROTAS DE FORMULÁRIO E RETORNO
 */

//rota EJS do formulário
router.get("/form", (req, res) => {
  res.render("index");
});

router.post("/form", async (req, res) => {
  try {
    const especies = new Especies({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      reino: req.body.reino,
      filo: req.body.filo,
      classe: req.body.classe,
      infraclasse: req.body.infraclasse,
      ordem: req.body.ordem,
      familia: req.body.familia,
      genero: req.body.genero,
      especie: req.body.especie,
    });
    especies.save().then(() => {
      let data = JSON.stringify(especies, null, 2);

      fs.writeFile("entry-log.json", data, (err) => {
        if (err) throw err;
        res.json({
          success: "Espécie registrada com sucesso",
        });
      });
    });
  } catch {
    res.status(500).send({
      failed: "Ops! alguma coisa errada aconteceu! verifique os dados",
    });
  }
});

router.get("/", (req, res) => {
  res.render("main");
});

router.get("/especies/ejs", (req, res, next) => {
  Especies.find({})
    .sort({ name: 1 })
    .then((especie) => {
      res.render("views", {
        pis: especie,
      });
    });
});

router.get("/especies/json", (req, res) => {
  Especies.find({})
    .sort({ name: 1 })
    .then((especie) => {
      res.json({
        success: "retornando todas as espécies: ",
        Especies: especie,
      });

      let data = JSON.stringify(especie, null, 2);

      fs.writeFile("register-log.json", data, (err) => {
        if (err) throw err;
        console.log("Log criado com sucesso");
      });
    });
});

router.get("/especie/:name", async (req, res) => {
  const { name } = req.body;

  await Especies.findOne({
    name: name,
  })
    .then((especie) => {
      res.status(200).json(especie);
    })
    .catch((err) => {
      res.status(400).send({
        failed: "Espécie não encontrada",
      });
    });
});

/**
 * ROTAS DE SIGNIN E SIGNUP
 */


/**
 * =====> INICIO DAS ROTAS PRIVADAS
 */

//update router
router.put("/especie/:name", (req, res) => {
  User.updateOne(
    {
      name: req.body.name,
    },
    {
      $set: {
        name: req.body.name,
        reino: req.body.reino,
        filo: req.body.filo,
        classe: req.body.classe,
        infraclasse: req.body.infraclasse,
        ordem: req.body.ordem,
        familia: req.body.familia,
        genero: req.body.genero,
        especie: req.body.especie,
      },
    },
    {
      new: true,
    }
  )
    .then(() => {
      res.send({
        success: "Espécie atualizada com sucesso",
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.delete("/especie/:name", (req, res) => {
  Especies.deleteOne({
    name: req.body.name,
  })
    .then((especie) => {
      res.json({
        success: "Registro deletado com sucesso",
        Especies: especie,
      });
    })

    .catch((err) => {
      res.send(err);
    });
});

/**
 * => controle de validação de formulário - FEITO 21/06/2022
 * => sistema de autenticação de usuário
 * => rotas privadas para usuários autenticados
 * => sistema de administrador e moderador
 * => controle de exceções
 * => conceito de SOLID ou melhoria de código
 * => criação de logs mais explicativos
 */

module.exports = router;
