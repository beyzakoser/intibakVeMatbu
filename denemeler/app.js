var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var app = express();
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send(' sayfası');

});

app.listen(5000);