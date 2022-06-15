const express = require("express");
const bcrypt = require("bcrypt");
const Especies = require("../model/animals.model");
const mongoose = require("mongoose");
const path = require("path");
//Rotas da api
const router = express.Router();

const app = express();

router.get("/main", (req, res) => {
  res.json("teste");
});

router.get("/form", (req, res) => {
  res.render("index");
});

router.post("/form", async (req, res) => {
  const {name, reino, filo, classe, infraclasse, ordem, familia, genero, especie } =
    req.body;

  let data = {
    name,
    reino,
    filo,
    classe,
    infraclasse,
    ordem,
    familia,
    genero,
    especie,
  };

  try {
    if (
      !(
        name &&
        reino &&
        filo &&
        classe &&
        infraclasse &&
        ordem &&
        familia &&
        genero &&
        especie
      )
    ) {
      res.status(422).send({
        failed: "Preencha todos os dados necessários",
      });
    }

    const especies = new Especies({
      _id: mongoose.Types.ObjectId(),
      name,
      reino,
      filo,
      classe,
      infraclasse,
      ordem,
      familia,
      genero,
      especie,
    });
    especies.save(data).then(() => {
      console.log("Espécie cadastrada com sucesso");
      res.status(200).redirect("/results");
    });
  } catch {
    res.status(500).send({
      failed: "Ops! alguma coisa errada aconteceu! verifique os dados",
    });
  }
});

router.get("/results", (req, res, next) => {
  Especies.find({}).then((especie) => {
    res.render("views", {
      pis: especie,
    });
  });
});

//update router
router.put("/:name", (req, res) => {
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
        especie: req.body.especie
      },
    },
    {
      new: true,
    }
  )
    .then(() => {
      res.send({
        success: "Usuário atualizado som sucesso",
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.delete("/:name", (req, res) => {
  User.deleteOne({
    name: req.body.name,
  })
    .then(() => {
      res.json({
        success: "Usuário deletado com sucesso",
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

function deleteUser(req, res) {
  let button = document.getElementById("btn");

  button.addEventListener((e) => {
    console.log("Botão clicado");
  });
}

//delete router

module.exports = router;
