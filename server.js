const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose') 
const routes = require('./src/router/router'); 


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

app.use('/', routes)

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})