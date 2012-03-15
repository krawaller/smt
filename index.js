var express = require('express'),
    http = require('http'),
    mongoose = require('mongoose'),
    expressMongoose = require('express-mongoose');

mongoose.connect('mongodb://smt:yv38uY7XkY@staff.mongohq.com:10027/smt-dev');

// Models
var Tree = new mongoose.Schema({
    title: {
        type: String,
        index: true
    },
    date: Date
});
mongoose.model('Tree', Tree);


// Server
var app = express.createServer();
app.use(express.cookieParser());
app.use(express.session({ secret: 'secret' }));


// Routes
app.get('/', function(req, res){
    res.send('Hello world!');
});

app.get('/api/tree/:title', function(req, res){

    res.send(mongoose.model('Tree').find({ title: req.params.title }));
});

app.post('/api/tree/:title', function(req, res){

    var tree = new (mongoose.model('Tree'))({
        title: req.params.title,
        date: new Date()
    });

    tree.save(function(err) {
        if (err) {
            res.send(err);
        } else {
            req.flash('notice', 'Created successfully');
            res.redirect('/api/tree/' + tree.title);
        }
    });

});

app.listen(3000);