//importing middlewares
var util = require('util');
var bodyParser = require("body-parser");
var session = require("express-session");
var express = require("express");
var axios = require('axios');
var path = require('path');
var mongoose = require('mongoose');
var app = express();

// Establish database connection
mongoose.connect('mongodb://localhost/basic_mongoose')
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// set up session
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

// set up path to server static content, templates, and use EJS to render
app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');
app.use(express.static( __dirname + '/public/dist/public' ));



// Set up constructor for our data
var GunSchema = new mongoose.Schema({
  GunName: {type: String},
  NoGun: {type: Number},
  GunType: {type: String}, 
  Penetration: {type: Number},
  Damage: {type: Array},
  Range: {type: Number},
  Weight: {type: Number},
  },
  {timestamps: true})

var ShipSchema = new mongoose.Schema({
  ClassName: {type: String},
  Type: {type: String},
  Description: {type: String},
  Guns: [GunSchema],
  Torpedo: {type: Number},
  Speed: {type: Number},
  DeckArmor: {type: Number},
  BeltArmor: {type: Number},
  HitPoint: {type: Number},
  Cost: {type: Number},
  Displacement: {type: Number},
  },
  {timestamps: true})


var FleetSchema = new mongoose.Schema({
  FleetName: {type: String},
  Ships: [ShipSchema],
  FleetType: {type: String}
  },
  {timeStamps: true})

// Select and declare our model
mongoose.model("Ship", ShipSchema);
mongoose.model("Gun", GunSchema);
mongoose.model("Fleet", FleetSchema);
var Ship = mongoose.model("Ship");
var Gun = mongoose.model("Gun");
var Fleet = mongoose.model("Fleet");

// Routes
app.get('/gun', function(req, res){
  Gun.find({})
  .then(data=>res.json(data))
  .catch(errs=>res.json(errs))
})

app.get("/gun/:id", function(req, res){
  Gun.findOne({_id: req.params.id})
  .then(data=>res.json(data))
  .catch(errs=>res.json(errs))
})

app.post('/gun', function(req, res){
  console.log("REQEUST BODY: ", req.body)
  Gun.create(req.body)
  .then(data=>res.json(data))
  .catch(errs=>res.json(errs))
})

app.get('/ship', function(req, res){
  Ship.find({})
  .then(data=>res.json(data))
  .catch(errs=>res.json(errs))
})

app.post('/ship', function(req, res){
  Gun.findById(req.body.Guns).then(weapons=>{
    newShip = new Ship({
      ClassName: req.body.ClassName,
      Type: req.body.Type,
      Description: req.body.Description,
      Torpedo: req.body.Torpedo,
      Guns: weapons,
      Speed: req.body.Speed,
      DeckArmor: req.body.DeckArmor,
      BeltArmor: req.body.BeltArmor,
      HitPoint: req.body.HitPoint,
      Cost: req.body.Cost,
      Displacement: req.body.Displacement
    })
    newShip.save()
    .then(data=>res.json(data))
    .catch(errs=>res.json(errs))
  })
})

app.delete('/ship/:id', function(req, res){
	Ship.findOneAndRemove({_id: req.params.id})
	.then(data => console.log("Single product removed", data) || res.json(data))
	.catch(errs => console.log("Cannot find product for removal: ", errs) || res.json(errs))
})

app.post('/fleet', function(req, res){
  newFleet = new Fleet({
    FleetName: req.body.FleetName,
    Ships: req.body.Ships,
    FleetType: req.body.FleetType
  })
  newFleet.save()
  .then(data=>res.json(data))
  .catch(errs=>res.json(errs))
})


// Clear Data
app.delete('/ship', function(req, res){
  Ship.remove({})
  .then(data=>console.log("Ship database purged, ", data) || res.json(data))
  .catch(errs=>console.log("Failed: ", errs) || res.json(errs))
})

app.delete('/gun', function(req, res){
  Gun.remove({})
  .then(data=>console.log("Gun database purged, ", data) || res.json(data))
  .catch(errs=>console.log("Failed: ", errs) || res.json(errs))
})

app.listen(8000, function() {
  console.log("listening on port 8000");
});