const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../model/user.model");

async function signup(req, res) {
  const { email, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email,
      password: hashPassword,
    });
    user.save().then(() => {
      res.status(201).json({
        success: "Usuário salvo com sucesso",
      });
    });
  } catch {
    res.status(500).send({
      failed: "Ops! ocorreu um erro",
    });
  }
}

function signin(req, res) {
  try {
    User.findOne({
      email: req.body.email,
    })
      .exec()
      .then((user) => {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) {
            return res.status(401).json({
              failed: "Unauthorized Access",
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user.email,
                _id: user._id,
              },
              "secret",
              {
                expiresIn: "2h",
              }
            );
            res.status(200).json({
              success: "Logado como administrador",
              token: token,
            });
          }
          return res.status(401).json({
            failed: "Acesso não autorizado",
          });
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
