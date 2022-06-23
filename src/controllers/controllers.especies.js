const mongoose = require("mongoose");
const Especies = require("../model/animals.model");
const fs = require("fs");

async function saveNewSpecies(req, res) {
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
}

function returnViewEjs(req, res) {
  Especies.find({})
    .sort({ name: 1 })
    .then((especie) => {
      res.render("especies", {
        pis: especie,
      });
    });
}

async function returnViewJson(req, res) {
  await Especies.find({})
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
}

async function returnOneSpecies(req, res) {

  await Especies.find({
    name: req.params.name
  })
    .then((especie) => {
      res.status(200).json(especie);
    })
    .catch(() => {
      res.status(400).send({
        failed: "Espécie não encontrada",
      });
    });
}

function updateSpecies(req, res) {
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
}

function deleteSpecies(req, res) {
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
}

module.exports = {
  saveNewSpecies,
  returnViewEjs,
  returnViewJson,
  returnOneSpecies,
  updateSpecies,
  deleteSpecies,
};
