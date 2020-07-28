var express = require('express');

var app = express();

app.get('/giris', function (req, res) {
    res.send(' giris sayfası');

});

app.listen(5000);

