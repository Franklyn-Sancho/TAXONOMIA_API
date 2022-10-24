const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../model/user.model");
const logger = require('../logs/logger')

/**
 * responsabilidades dessa função:
 * => criptografar a senha
 * => testar formulário
 * => salvar usuário
 */
async function signup(req, res) {
  try {
    const { email, password } = req.body;

    if (email && password) {
      const hashPassword = await bcrypt.hash(password, 10);

      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email,
        password: hashPassword,
      });
      user.save().then(() => {
        res.status(200).json({
          success: "Moderador criado com sucesso",
        });
        logger.info(`Moderador ${email} criado com sucesso`)
      });
    } else {
      res.status(400).send({
        failed: "Email e senha requeridos",
      });
      logger.error("Erro 400 ao criar moderador")
    }
  } catch {
    res.status(500).send({
      failed: "Ops! ocorreu um erro",
    });
    logger.error("Erro 500 ao criar moderador")
  }
}

async function signin(req, res) {
  try {
    await User.findOne({
      email: req.body.email,
    }).then((user) => {
      bcrypt.compare(req.body.password, user.password, (error, result) => {
        if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              _id: user._id,
            },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          res.status(200).json({
            success: "Logado como administrador",
            token: token,
          });

          user.token = token
          logger.info(`Moderador ${req.body.email} logou às ${Date()}`)
        } else {
          logger.error(`erro ao logar com: ${req.body.email}`)
          return res.status(401).json({
            failed: `acesso não autorizado`,
          });

        }
      });
    });
  } catch {
    res.status(500).send({
      failed: "Ops! ocorreu um erro",
    });
  }
}

module.exports = {
  signup,
  signin,
};
