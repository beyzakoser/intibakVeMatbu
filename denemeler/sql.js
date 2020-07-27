//mysql node.js bağlantısı
var mysql = require("mysql");

var baglanti = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"12345678",
    database:"zeynep" 
});

baglanti.connect(function(err){
    if(err) throw err;
    /*
    baglanti.query("SELECT * FROM FsmvuDers",function(err,sonuc){
        console.log(sonuc[24].ders_ad);
    });*/
    console.log("basarili");


});