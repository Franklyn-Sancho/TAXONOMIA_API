const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose') 
const routesEspecies = require('./src/router/especies.router'); 
const routesUser = require('./src/router/user.router')


const app = express();

require('dotenv').config()

mongoose.connect(process.env.MONGO_DB, () => {
    console.log('Conectado com o banco de dados')
})

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())



app.set('view engine', 'ejs');
app.set('views', './src/public');

app.use('/', routesEspecies)
app.use('/', routesUser)

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})