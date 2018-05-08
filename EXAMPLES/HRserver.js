// Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
// const $ = require('jquery'); 
let rorw = true;

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Data
// =============================================================
let reservations = [
  {
    uniqueID:'01',
    name: "allen",
    phoneNumber: "404-400-500",
    email: 'allen@gmail.com'
  },
  {
    uniqueID:'02',
    name: "susan",
    phoneNumber: "404-500-400",
    email: 'susan@gmail.com'
  },
  {
    uniqueID:'03',
    name: "eddie",
    phoneNumber: "404-500-600",
    email: 'eddie@gmail.com'
  },
  {
    uniqueID:'04',
    name: "yoda",
    phoneNumber: "400-400-400",
    email: 'yoda@gmail.com'
  },
  {
    uniqueID:'05',
    name: "kobe",
    phoneNumber: "400-900-800",
    email: 'kobe@gmail.com'
  },
];

let waitlist = [
  {
    uniqueID:'06',
    name: "Unlucky",
    phoneNumber: "400-100-800",
    email: 'theluckisnotwithme@gmail.com'
  }
];

// Routes
// =============================================================

// Displays all reservations
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Displays all reservations
app.get("/api/reservations", function(req, res) {
  return res.json(reservations);
});

// Displays all waitlist
app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});


// Displays a single reservation, or returns false
app.get("/api/reservations/:reservation", function(req, res) {
  var chosen = req.params.reservation;

  console.log(chosen);

  for (var i = 0; i < reservations.length; i++) {
    if (chosen === reservations[i].name) {
      return res.json(reservations[i]);
    }
  }

  return res.json(false);
});

// Create New reservation - takes in JSON input
app.post("/api/reservations", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newResrv = req.body;
  // newResrv.Name = newResrv.name.replace(/\s+/g, "").toLowerCase();

  console.log(newResrv);

  if (reservations.length < 4){
    rorw = true;
    reservations.push(newResrv);
    res.json(newResrv);
  } else {
    rorw = false;
    waitlist.push(newResrv);
    console.log(waitlist);
  }
});

app.post("/api/clear", function(req, res) {
  var newResrv = req.body;
  console.log('Cleared'); 
  reservations = [];
  for (i=0; i<4; i++){
    reservations.push(waitlist[i]);
    waitlist[i] = [];
  }
  console.log(reservations);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

// Clear the arrays
// =============================================================

// $('#clearTables').on('click', clearArray); 
// document.getElementById('clearTables').addEventListener('click', clearArray); 
// document.getElementById('clearTables').addEventListener('click', clearArray); 


  function clearArray(){
   
  }

  clearArray();

  function resWait() {
    if (rorw === true){
    M.toast ({html: 'Your reservation is confirmed! Bon Apetit!'})
    } else {
    M.toast({html: 'Bummer! No Tables. To the Waitlist with you!'})
    }
    console.log(rorw);
  };
