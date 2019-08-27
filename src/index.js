const express = require('express');
const bodyParser = require('body-parser');
const routesAuth = require('./app/routes/auth');
const routesAdmin = require('./app/routes/admin');
const helmet = require('helmet')
var auth = require("./app/middleware/auth")();

const app = express();
const cors = require('cors');

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(auth.initialize());

app.use('/auth', routesAuth);
app.use('/admin', routesAdmin);

app.listen(3000, function(){
    console.log("API Funcionando!");
});