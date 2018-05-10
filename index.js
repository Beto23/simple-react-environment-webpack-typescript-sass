var express = require("express");
var path = require("path");
var app = express();

app.set("port", process.env.PORT || 5000);
app.use(express.static(path.join(__dirname, "docs/")), (req, res) => {
    res.sendFile("index.html", { root: __dirname + "/docs" }, err => {
        if (err) {
            res.status(500).send(err);
        }
    });
});

var server = app.listen(app.get("port"), function() {
    var port = server.address().port;
});
