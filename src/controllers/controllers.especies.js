

const mongoose = require("mongoose");
const Especies = require("../model/animals.model");
const controllers = require("../controllers/controllers.logCreate");
const logger = require("../logs/logger");

async function saveNewSpecies(req, res) {
  try {

    const validate = await Especies.findOne({
      name: req.body.name
    })

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
      especie: req.body.especie
    })

    if(!validate) {
      especies.save().then(() => {
        res.status(200).json({
          success: "Espécie cadastrada com sucesso",
        });
        controllers.createLastEntryLog(especies);
        logger.info(`${req.body.name} foi cadastrado com sucesso às ${Date()}`);
      });
    }
    else {
      res.status(422).send({
        failed: `Essa espécie já foi cadastrada`
      })
    }

    
  } catch {
    res.status(500).send({
      failed: "Ops! Ocorreu um erro",
    });
    logger.error("Erro 500 ao criar espécie");
  }
}

function returnViewEjs(req, res) {
  Especies.find({})
    .sort({ name: 1 }) //retornar em ordem alfabética
    .then((especie) => {
      res.render("especies", {
        pis: especie,
      });
      controllers.createAllEntryLog(especie);
      logger.info(`Arquivo Json criado/atualizado com sucesso às ${Date()}`);
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
      .sort({ name: 1 }) //retornar em ordem alfabética
      .then((especie) => {
        res.json({
          success: `Ultima atualização: ${Date()}`,
          Especies: especie,
        });
        controllers.createAllEntryLog(especie);
        logger.info(`Arquivo Json criado/atualizado com sucesso às ${Date()}`);
      });
  } catch {
    res.status(500).send({
      failed: "Ops!ocorreu um erro",
    });
    logger.error("Erro ao acessar os dados em Json");
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
  Especies.updateOne(
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
        success: "A espécie foi atualizada com sucesso",
      });
      logger.info(`Espécie ${especie} foi atualizada com sucesso`);
    })
    .catch((err, especie) => {
      res.send({
        failed: `Acesso não autorizado ou erro ao atualizar ${err}`,
      });
      logger.error(`Erro ao atualizar espécie ${especie}`);
    });
}

async function deleteSpecies(req, res) {
  try {

    const especie = await Especies.find({
      name: req.params.name
    }).deleteOne()

    if (especie) {
      res.status(200).json({
        sucess: `Espécie ${req.params.name} deletada com sucesso`
      })
      logger.info(`Espécie ${req.params.name} deletada com sucesso`)
    }
    else {
      res.send({
        failed: `Não autorizado ou erro de dados ${err}`,
      });
      logger.error(`Erro ao deletar especie`);
    }
  } catch {
    res.status(500).send({
      failed: "Ops! Ocorreu um erro",
    });
    logger.error("Ocorreu um erro 500 ao deletar espécie");
  }
}

module.exports = {
  saveNewSpecies,
  returnViewEjs,
  returnViewJson,
  returnOneSpecie,
  updateSpecies,
  deleteSpecies
}


