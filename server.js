//const { Sequelize, Model } = require("sequelize");
const express = require('express');
const cors = require('cors');
const _ = require('underscore');
const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
require('./db.js');

app.post('/giris', (req, res) => {
    //signIn sayfasından gelecek parametrelere göre bu kısım değişecek
    const { mail, sifre } = req.body;
    console.log(req.body);
    admin.findAll({
        where: {
            kullaniciAdi: mail,
            sifre: sifre
        },
        raw: true

    }).then(
        c => {
            console.log(c.length)
            if (c.length != 0) { res.send("success") }

        });
});
app.get('/dersler', (req, res) => {
    fsmvuders.findAll({
        //dersAdına göre alfabetik sıra ile gönderdim.
        order: [
            ['dersAd', 'ASC'],
        ],
        //hangi özelliklerin gitmesini istiyorsam;
        attributes: [
            "id",
            "dersKodu",
            "dersAd",
            'kredi',
            "akts",
            'teoriSaat',
            'labSaat',
            "kontenjan",
            'teoriOnline',
            'labOnline',
            'donem'
        ],
        raw: true
    })
        .then(
            c => {
                res.send(c)
            }).catch(err => console.log("Error : ", err));


});
app.post('/basvuru', (req, res) => {
    //const { ad, soyad, fakulte, bolum, mail, universite, girisYil, basvuruTur } = req.body;
    //console.log(ad, soyad, fakulte, bolum, mail, universite, girisYil, basvuruTur);
   // console.log(req.body);


});
app.post('/dersDuzenle', (req, res) => {
    //client tarafından değişen verilerin hepsi tek bir objede geliyor.
    const  {inserts}  = req.body[0];
    const  {updates}  = req.body[1];
    const  {deletes}  = req.body[2];
    // update kısmı 
    updates.forEach(eleman => {
        fsmvuders.update({
            dersKodu: eleman.dersKodu,
            dersAd: eleman.dersAd,
            kredi:eleman.kredi,
            akts: eleman.akts,
            teoriSaat: eleman.teoriSaat,
            labSaat:eleman.labSaat,
            kontenjan: eleman.kontenjan,
            teoriOnline: eleman.teoriOnline,
            labOnline:eleman.labOnline
        }, {
            where: {
                id: eleman.id
            }
        }).catch(err => console.log("Error : ", err));
    });
    //insert
    inserts.forEach(eleman => {
        fsmvuders.create({
            dersKodu: eleman.dersKodu,
            dersAd: eleman.dersAd,
            kredi:eleman.kredi,
            akts: eleman.akts,
            teoriSaat: eleman.teoriSaat,
            labSaat:eleman.labSaat,
            kontenjan: eleman.kontenjan,
            teoriOnline: eleman.teoriOnline,
            labOnline:eleman.labOnline
        }).catch(err => console.log("Error : ", err));
    });
    //delete
    deletes.forEach(eleman => {
        fsmvuders.destroy({
            where: {
                id: eleman.id
            }
        }).catch(err => console.log("Error : ", err));
    });

});

app.listen(3004, () => {
    console.log("server is listening");
});



