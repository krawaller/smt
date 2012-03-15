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


function onSave(err){
    if (err) {
        console.log('err', err);
        this.send({ success: false });
    } else {
        this.send({ success: true });
    }
}
app.post('/api/northpartnerorganisation', function(req, res){

    // console.log('before manip', req.body);

    var id = req.body._id;
    delete req.body._id;
    delete req.body.id;

    //FIXME this should be fixed on the client so a request with an existing id uses PUT
    if(id){
        console.log('updating', id, req.body);
        mongoose.model('NorthPartnerOrganisation').update({ _id: id }, req.body, onSave.bind(res));
    } else {
        console.log('saving', req.body);
        var northPartnerOrganisation = new (mongoose.model('NorthPartnerOrganisation'))(req.body);
        northPartnerOrganisation.save(onSave.bind(res));
    }

});

app.listen(3000);