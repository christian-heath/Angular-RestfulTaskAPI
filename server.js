var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');

app.use(bodyParser.json());
app.use(flash());
app.use(express.static( __dirname + '/public/dist/public' ));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}))

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.set('trust proxy', 1) // trust first proxy

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);
app.listen(8000, function () {
    console.log("listening on port 8000");
})