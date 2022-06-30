const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../model/user.model");

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
        res.status(201).json({
          success: "Usuário salvo com sucesso",
        });
      });
    } else {
      res.status(400).send({
        failed: "Email e senha requeridos",
      });
    }
  } catch {
    res.status(500).send({
      failed: "Ops! ocorreu um erro",
    });
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
        } else {
          console.log(result);
          return res.status(401).json({
            failed: `acesso não autorizado ${error}`,
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
