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
            "akts",
            "teoriSaat",
            "labSaat",
            "kontenjan",
            "online",
        ],
        raw: true
    })
        .then(
            c => {
                res.send(c)
            }).catch(err => console.log("Error : ", err));


});
app.post('/basvuru', (req, res) => {
    const { ad, soyad, fakulte, bolum, mail, universite, girisYil, basvuruTur } = req.body;
    console.log(ad, soyad, fakulte, bolum, mail, universite, girisYil, basvuruTur);


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
            akts: eleman.akts,
            teoriSaat: eleman.teoriSaat,
            labSaat:eleman.labSaat,
            kontenjan: eleman.kontenjan,
            online: eleman.online
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
            akts: eleman.akts,
            teoriSaat: eleman.teoriSaat,
            labSaat:eleman.labSaat,
            kontenjan: eleman.kontenjan,
            online: eleman.online
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


/*

 //önce bu path e geliyor oradan veri tabanına kaydediyorum
  app.post("/dersEkle", (req, res) => {
    console.log(
      "req.body***********************************************",
      req.body
    );
    Event_classroom.create(req.body.evtClassroom)
      .then(evtClassroom => {
        console.log(evtClassroom.dataValues);
        res.send(evtClassroom.dataValues);
      })
      .catch(err => {
        console.log("error ", err);
      });
  });
    app.post("/ogretim", (req, res) => {
    console.log(
      "req.body***********************************************",
      req.body
    );
    Event_classroom.create(req.body.evtClassroom)
      .then(evtClassroom => {
        console.log(evtClassroom.dataValues);
        res.send(evtClassroom.dataValues);
      })
      .catch(err => {
        console.log("error ", err);
      });
  });*/
/*
sequelize.sync({ force: false }).then(() => {
    console.log("basarili bir şekilde bağlandı");
    /* sequelize.models.fsmvuders.create({
        dersKodu: "BLM123",
        dersAd: "Staj2",
        grupBilgisi:"AZ",
        kontenjan:10,
        teoriSaat:2,
        labSaat:0,
        akts:3,
        kredi:2,
        online:"evet"
    });
    sequelize.models.fsmvuders.destroy({
        where: {
            dersAd: "Staj2"
        }
    }).then(function (deleted) {
        if (deleted === 0) {
            console.log("Böyle bir veri bulunmamaktadır.")
        } else {
            console.log("silindi")
        }
    })



});*/

