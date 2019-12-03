const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const port = 8088;
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root1234",
  database: "a17020076",
});

app.get("/create-book", function(req, res) {
  res.sendFile(__dirname + "/create.html");
});

app.post("/create-book", function(req, res) {
  console.log(req.body);
  var sql =
    "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql =
      `INSERT INTO book (name, author, published_date) VALUES ('` +
      req.body.name +
      `', '` +
      req.body.author +
      `',CURRENT_TIMESTAMP)`;
    con.query(sql, function(err, result) {
      if (err) res.send(err.message);
      res.send("1 record inserted");
    });
  });
});

app.get("/books", function(req, res) {
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM book", function (err, result, fields) {
            if (err) res.send(err.message);
            var html = "<header>LIST BOOK</header><table border='1'>"
            result.forEach(element => {
                html+=`<tr><td>`+element.id+`</td><td>`+element.name+`</td><td>`+element.author+`</td><td>`+element.published_date+`</td></tr>`
            });;
            html+="</table>";
            res.send(html);
        });
      });

});

app.listen(port);
