const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

var app = express();
var PORT = process.env.PORT || 8800;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let friendData = [
  {
    name: "susan",
    urlLink: "https://www.facebook.com/photo.php?fbid=10160419316070224&l=314a5f6199",
    scores: [1,1,2,5,5,4,3,5,2,4]
  }
];

const newFriends =[];

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/survey.html"));
});

app.get('api/newFriends', (req, res) => {
  res.json(friendData); 
})

app.post('api/newFriends', function(req, res){ 
  console.log(req.body);
  const newFriendData = req.body;
  newFriends.push(newFriendData);
})




// $.ajax({
//   url: "/api/matches",
//   data: JSON.stringify(newFriend),
//   contentType: "application/json",
//   method: POST
// })







app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});