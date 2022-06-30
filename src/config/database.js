const mongoose = require('mongoose')

const {MONGO_DB} = process.env //Os dados de conexão do bando de dados no mongoDB atlas

exports.connect = () => {
    //conectando ao banco de dados.
    mongoose.connect(MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Conectado ao banco de dados")
    })
    .catch((err) => {
        console.log("Erro ao conectar o banco de dados")
    })
}