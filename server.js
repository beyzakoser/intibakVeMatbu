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
    const person = req.body;
    const date = new Date();
    var dateTime = date.toISOString().slice(0, 10);
    ogrenci.create({
        ogrenciAd: person.name,
        ogrenciSoyad: person.lastname,
        ogrenciMail: person.mail,
        ogrenciFakulte: person.faculty,
        ogrenciBolum: person.department,
        universiteAdi: person.university,
        girisYil: person.year,
        talepTarih: dateTime
    }).catch(err => console.log("Error : ", err));
});



app.post('/dersDuzenle', (req, res) => {
    //client tarafından değişen verilerin hepsi tek bir objede geliyor.
    const { inserts } = req.body[0];
    const { updates } = req.body[1];
    const { deletes } = req.body[2];


    // update kısmı 
    updates.forEach(eleman => {
        fsmvuders.update({
            dersKodu: eleman.dersKodu,
            dersAd: eleman.dersAd,
            kredi: eleman.kredi,
            akts: eleman.akts,
            teoriSaat: eleman.teoriSaat,
            labSaat: eleman.labSaat,
            kontenjan: eleman.kontenjan,
            teoriOnline: eleman.teoriOnline,
            labOnline: eleman.labOnline
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
            kredi: eleman.kredi,
            akts: eleman.akts,
            teoriSaat: eleman.teoriSaat,
            labSaat: eleman.labSaat,
            kontenjan: eleman.kontenjan,
            teoriOnline: eleman.teoriOnline,
            labOnline: eleman.labOnline
        }).catch(err => console.log("Error : ", err));
        // fsmvuders.findOne({
        //     where: {
        //         dersKodu: eleman.dersKodu ,
        //         dersAd: eleman.dersAd,
        //         kredi: eleman.kredi,
        //         akts:eleman.akts,
        //         teoriSaat: eleman.teoriSaat,
        //         labSaat: eleman.labSaat,
        //     }

        // }).then(res => {
        //     if (res !== null) {
        //         console.log("boş değil");
        //     }
        //     else {
        //         fsmvuders.create({
        //             dersKodu: eleman.dersKodu,
        //             dersAd: eleman.dersAd,
        //             kredi: eleman.kredi,
        //             akts: eleman.akts,
        //             teoriSaat: eleman.teoriSaat,
        //             labSaat: eleman.labSaat,
        //             kontenjan: eleman.kontenjan,
        //             teoriOnline: eleman.teoriOnline,
        //             labOnline: eleman.labOnline
        //         }).catch(err => console.log("Error : ", err));


        //     }
        // }
        // ).catch(err => console.log("Error : ", err));
    })

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



