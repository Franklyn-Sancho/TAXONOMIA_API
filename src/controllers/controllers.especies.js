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
      res.json({
        success: "Especie criada com sucesso",
      });
      createLastEntryLog(especies)
    });
  } catch {
    res.status(500).send({
      failed: "Ops! alguma coisa errada aconteceu! verifique os dados",
    });
  }
}

function createLastEntryLog(especie) {
  let data = JSON.stringify(especie, null, 2);

  fs.writeFile("last-entry.json", data, (err) => {
    if (err) throw err;
    console.log(`Log do último registro criado com sucesso ${Date()}`);
  });
}

function returnViewEjs(req, res) {
  Especies.find({})
    .sort({ name: 1 })
    .then((especie) => {
      res.render("especies", {
        pis: especie,
      });
    })
    .catch(() => {
      res.send({
        failed: "Ops! ocorreu um erro",
      });
    });
}

async function returnViewJson(req, res) {
  try {
    await Especies.find({})
      .sort({ name: 1 })
      .then((especie) => {
        res.json({
          success: `Ultima atuatização: ${Date()}`,
          Especies: especie,
        });
        createAllEntryLog(especie)
      });
  } catch {
    res.status(500).send({
      failed: "Ops!ocorreu um erro",
    });
  }
}

function createAllEntryLog(especie) {
  let data = JSON.stringify(especie, null, 2);

  fs.writeFile("data-logs.json", data, (err) => {
    if (err) throw err;
    console.log("Log criado com sucesso");
  });
}

async function returnOneSpecie(req, res) {
  await Especies.find({
    name: req.params.name,
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
      res.send({
        failed: `Não autorizado ou erro de dados ${err}`,
      });
    });
}

function deleteSpecies(req, res) {
  try {
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
        res.send({
          failed: `Não autorizado ou erro de dados ${err}`,
        });
      });
  } catch {
    res.status(500).send({
      failed: "Ação não autorizada",
    });
  }
}

module.exports = {
  saveNewSpecies,
  returnViewEjs,
  returnViewJson,
  returnOneSpecie,
  updateSpecies,
  deleteSpecies,
};
