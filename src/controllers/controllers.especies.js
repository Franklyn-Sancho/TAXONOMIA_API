const mongoose = require("mongoose");
const Especies = require("../model/animals.model");
const controllers = require("../controllers/controllers.logCreate");
const logger = require("../logs/logger");

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
      controllers.createLastEntryLog(especies);
      logger.info("Uma espécie foi criada no banco de dados");
    });
  } catch {
    res.status(500).send({
      failed: "Ops! alguma coisa errada aconteceu!",
    });
    logger.error("Error 500 ao criar espécie");
  }
}

function returnViewEjs(req, res) {
  Especies.find({})
    .sort({ name: 1 })
    .then((especie) => {
      res.render("especies", {
        pis: especie,
      });
      controllers.createAllEntryLog(especie);
      logger.info("Arquivo Json Criado/Atualizado com sucesso");
    })
    .catch(() => {
      res.send({
        failed: "Ops! ocorreu um erro",
      });
      logger.error("Erro ao requisitar arquivo ejs");
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
        controllers.createAllEntryLog(especie);
        logger.info("Arquivo Json Criado/Atualizado com sucesso");
      });
  } catch {
    res.status(500).send({
      failed: "Ops!ocorreu um erro",
    });
    logger.error("Erro ao requisitar arquivo json");
  }
}

async function returnOneSpecie(req, res) {
  const especie = await Especies.findOne({
    name: req.params.name,
  });

  if (especie) {
    res.status(200).json(especie);
    logger.info(`Espécie ${req.params.name} pesquisada com sucesso`);
  } else {
    res.status(400).send({
      failed: "Espécie não encontrada",
    });
    logger.error(`Espécie ${req.params.name} não foi encontrada`);
  }
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
    .then((especie) => {
      res.send({
        success: "Espécie atualizada com sucesso",
      });
      logger.info(`Espécie ${especie} atualizada com sucesso`);
    })
    .catch((err, especie) => {
      res.send({
        failed: `Não autorizado ou erro de dados ${err}`,
      });
      logger.error(`Erro ao atualizar espécie ${especie}`);
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
        logger.info(`Espécie ${especie} deletada com sucesso`);
      })

      .catch((err) => {
        res.send({
          failed: `Não autorizado ou erro de dados ${err}`,
        });
        logger.info(`Erro ao deletar especie`);
      });
  } catch {
    res.status(500).send({
      failed: "Ação não autorizada",
    });
    logger.error("Erro 500 ao deletar uma espécie");
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
