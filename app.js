const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res) {
  res.sendFile(__dirname + "/signup.html");
})


app.post("/", function(req,res) {
  const first = req.body.first;
  const last = req.body.last;
  const email = req.body.email;
  // console.log(first + " " + last + " email =" + email);

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: first,
          LNAME: last
        }
      }
    ]
  }

  const jsonData = JSON.stringify(data);

  const url = "https://us8.api.mailchimp.com/3.0/lists/0ee296805a";

  const options = {
    method: "POST",
    auth: "Aditya:25d84883037e09a6857a07c42659ce72-us8"
  }

  const request = https.request(url, options, function(response) {

    if(response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    }
    else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  });

  request.write(jsonData);
  request.end();

})

app.post("/failure", function(req,res) {
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});


// 25d84883037e09a6857a07c42659ce72-us8

//list id
// 0ee296805a
