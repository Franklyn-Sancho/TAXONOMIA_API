const express = require('express')
const bodyParser = require('body-parser')
const routesEspecies = require('./src/router/especies.router'); 
const routesUser = require('./src/router/user.router')
const app = express();

require('dotenv').config()

//conectando com o banco de dados
require('./src/config/database').connect()

/* mongoose.connect(process.env.MONGO_DB, () => {
    console.log('Conectado com o banco de dados')
}) */

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())



app.set('view engine', 'ejs');
app.set('views', './src/public');

app.use('/', routesEspecies)
app.use('/users', routesUser)

app.get("/", (req, res) => {
    res.render("main");
  });

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}::acesse => localhost:3000`)
})