//TODO: create a README.md with a simple summary of techniques, structure and philosophy

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


var NorthPartnerOrganisation = new mongoose.Schema({
    // objectId: mongoose.Schema.ObjectId,
    // name: {
    //     type: String,
    //     index: {
    //         unique: false
    //     }
    // },
    name: String,
    email: String,
    phone: String,
    date: Date
});
mongoose.model('NorthPartnerOrganisation', NorthPartnerOrganisation);

// Server
var app = express.createServer();
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: 'secret' }));

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

app.get('/api/northpartnerorganisation', function(req, res){
    res.send(mongoose.model('NorthPartnerOrganisation').find());
});

app.get('/api/northpartnerorganisation/:name', function(req, res){
    res.send(mongoose.model('NorthPartnerOrganisation').find({ name: req.params.name }));
});


function onResponse(err){
    if (err) {
        console.log('err', err);
        this.send({ success: false });
    } else {
        this.send({ success: true });
    }
}

app.post('/api/northpartnerorganisation', function(req, res){

    // console.log('saving', req.body);
    delete req.body._id;
    var northPartnerOrganisation = new (mongoose.model('NorthPartnerOrganisation'))(req.body);
    northPartnerOrganisation.save(onResponse.bind(res));
    
});

app.put('/api/northpartnerorganisation/:id', function(req, res){

    var id = req.body._id;
    delete req.body._id;

    mongoose.model('NorthPartnerOrganisation').update({ _id: id }, req.body, onResponse.bind(res));
});

function deleteOnFind(err, doc){
    var me = this;
    if(err || !doc){
        this.send({ success: false });
    } else {
        // doc.remove(onResponse.bind(this));
        doc.remove(function(err) {
            if (err) {
                console.log('err', err);
                me.send({ success: false });
            } else {
                me.send({ success: true, id: doc._id });
            }
        });
    }
}
app.delete('/api/northpartnerorganisation/:id', function(req, res){

    var id = req.body._id;
    mongoose.model('NorthPartnerOrganisation').findById(id, deleteOnFind.bind(res));
    
});


app.listen(3000);