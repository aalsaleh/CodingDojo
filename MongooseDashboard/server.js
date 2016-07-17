var express = require('express');
var path = require('path');

var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/parcel');

// Crow Schema
var CrowSchema = new mongoose.Schema({
    name: String,
    age: Number
});


mongoose.model('Crow', CrowSchema);
var Crow = mongoose.model('Crow');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// Show all Crows in Parcel
app.get('/', function(req, res) {
    Crow.find({}, function(err, crows) {
        if(err) {
            console.log("Error retrieving Crows");
        } else {
            // console.log("Succesfully found Crows\n");
            // console.log(crows);
            res.render("index", {crows: crows});
        }
    });
});

// Edit Crow Information retrieved from DB
app.get('/crows/:id/edit', function(req, res) {
    Crow.findById(req.params.id, function(err, crows) {
        if(err) {
            console.log(req.params.id ,"not found\n");
            res.render("index");
        } else {
            res.render("editcrow", {crows: crows});
        }
    });
});

// Create a new Crow in the Parcel
app.get('/crows/new', function(req, res) {
    res.render("newcrow");
});

// Search for particular Crow by ID
app.get("/crows/:id", function (req, res){
    Crow.findById(req.params.id, function(err, crows) {
        if(err) {
            console.log(req.params.id ,"not found\n");
            res.render("index");
        } else {
            // console.log("what we found:\n\n");
            // console.log(crows);
            res.render("index", {crows: [crows]});
        }
    });
});

// Updating crow Information
app.post('/crows/:id', function(req, res) {
    Crow.update({_id: req.params.id}, {name: req.body.name, age: req.body.age}, function(err){
        if(err) {
            console.log("Crow not updated");
        } else {
            console.log("Crow successfully saved");
            res.redirect('/crows/'+req.params.id);
        }
    });
});

// Deleting a Crow from parcel (defector/dead)
app.post('/crows/:id/destroy', function(req, res) {
    Crow.remove({_id: req.params.id}, function(err){
        if(err) {
            console.log("Crow not deleted");
        } else {
            console.log("Crow successfully deleted");
            res.redirect("/");
        }
    });
});

// Receive new crow data from '/crows/new' - newcrow.ejs
app.post('/crows', function(req, res) {
    // console.log("POST DATA", req.body);

    var crow = new Crow({name: req.body.name, age: req.body.age});

    crow.save(function(err) {
        if(err) {
            console.log("Crow not saved");
        } else {
            console.log("Crow successfully saved");
            res.redirect('/');
        }
    })

});

app.listen(8000, function() {
    console.log("listening on port 8000");
});
