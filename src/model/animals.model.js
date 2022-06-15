const mongoose = require('mongoose')

//esquema do banco de dados

const taxonomia = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, //Id será um objeto do Mongo
    name: {type: String, required: true},
    reino: {type: String, required: true},
    filo: {type: String, required: true},
    classe: {type: String, required: true}, //Email requerido
    infraclasse: {type: String, required: true}, //Senha requerida
    ordem: {type: String, required: true},
    familia: {type: String, required: true},
    genero: {type: String, required: true},
    especie: {type: String, required: true},
})

module.exports = mongoose.model('Taxonomia', taxonomia)