const express = require("express");
/* const bcrypt = require("bcrypt"); */
const Especies = require("../model/animals.model");
const mongoose = require("mongoose");
const fs = require("fs");

const router = express.Router();

//rota EJS do formulário
router.get("/form", (req, res) => {
  res.render("index");
});

router.post("/form", async (req, res) => {
  const {
    name,
    reino,
    filo,
    classe,
    infraclasse,
    ordem,
    familia,
    genero,
    especie,
  } = req.body;

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
    especies.save().then(() => {
      let data = JSON.stringify(especies, null, 2);

      fs.writeFile("especie-log.json", data, (err) => {
        if (err) throw err;
        res.json({
          success: "Espécie registrada com sucesso"
        })
      });

      console.log("Espécie cadastrada com sucesso");

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
  Especies.find({}).then((especie) => {
    res.render("views", {
      pis: especie,
    });
  });
});

router.get("/especies/json", (req, res) => {
  Especies.find({}).then((especie) => {
    res.json({
      success: "retornando todas as espécies: ",
      Especies: especie,
    });

    let data = JSON.stringify(especie, null, 2)

    fs.writeFile('especies-logs.json', data, (err) => {
      if(err) throw err
      console.log('Log criado com sucesso')
    })
  });
});

router.get("especie/:name", async (req, res) => {
  const { name } = req.body;

  const especie = await Especies.findOne({
    name: name,
  })
    .then(() => {
      res.status(200).json(especie);
    })
    .catch((err) => {
      res.status(400).send({
        failed: "Espécie não encontrada",
      });
    });
});

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
  User.deleteOne({
    name: req.body.name,
  })
    .then(() => {
      res.json({
        success: "Registro deletado com sucesso",
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
