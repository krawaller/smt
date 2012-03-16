//TODO: create a README.md with a simple summary of techniques, structure and philosophy

var express = require('express'),
    http = require('http'),
    mongoose = require('mongoose'),
    expressMongoose = require('express-mongoose');

mongoose.connect('mongodb://smt:yv38uY7XkY@staff.mongohq.com:10027/smt-dev');

// Models
var NorthPartnerOrganisation = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    date: Date
});
mongoose.model('NorthPartnerOrganisation', NorthPartnerOrganisation);

var SouthPartnerOrganisation = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    date: Date
});
mongoose.model('SouthPartnerOrganisation', SouthPartnerOrganisation);

// Server
var app = express.createServer();
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: 'secret' }));
// app.use(express.session({ secret: 'secret' }));

// CORS FTW
app.all('/api/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});


// Routes
app.get('/', function(req, res){
    res.send('Hello world!');
});


// Make sure that the model exists before we procedd
app.all('/api/:model/:q?', function(req, res, next){
    if(req.params.model){
        var model;
        try {
            model = mongoose.model(req.params.model);
        } catch(e){}

        if(model){
            next();
        } else {
            res.send({ success: false, message: 'Model ' + req.params.model + ' not found' });
        }
    }
});


function onResponse(err){
    if (err) {
        console.log('err', err);
        this.send({ success: false });
    } else {
        this.send({ success: true });
    }
}

function deleteOnFind(err, doc){
    var me = this;
    if(err || !doc){
        this.send({ success: false });
    } else {
        doc.remove(function(err) {
            if (err) {
                me.send({ success: false });
            } else {
                me.send({ success: true, id: doc._id });
            }
        });
    }
}
app.get('/api/:model', function(req, res){
    res.send(mongoose.model(req.params.model).find());
});

app.get('/api/:model/:name', function(req, res){
    res.send(mongoose.model(req.params.model).find({ name: req.params.name }));
});

app.post('/api/:model', function(req, res){
    delete req.body._id;

    var model = mongoose.model(req.params.model);
    var instance = new model(req.body);
    instance.save(onResponse.bind(res));
});

app.put('/api/:model/:id', function(req, res){
    var model = mongoose.model(req.params.model);
    var id = req.body._id;
    delete req.body._id;

    model.update({ _id: id }, req.body, onResponse.bind(res));
});

app.delete('/api/:model/:id', function(req, res){
    var model = mongoose.model(req.params.model);
    var id = req.body._id;

    model.findById(id, deleteOnFind.bind(res));
});

app.listen(process.env.PORT || 3000);