const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// Connect DB
mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

// Check connection DB
db.once('open', function(){
    console.log('Connected to MongoDB');
});

// Check connection error
db.on('error', function(err){
    console.log(err);
});

// Bring in Models
let Article = require('./models/article');

// Init app
const app = express();

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body parser 
// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// Home Route
app.get('/', function(req, res) {
    Article.find({}, (err, articles) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                title: 'Articles',
                articles: articles
            });
        }
    });
});

app.get('/articles/add', function(req, res) {
    res.render('add_article', {
        title: 'Add Article'
    });
});


app.listen(3000, function() {
    console.log('Server started on port 3000...');
})