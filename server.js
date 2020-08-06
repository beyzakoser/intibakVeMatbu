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

app.get('/admin', (req, res) => {
    admin.findAll({
        attributes: [
            "id",
            "kullaniciAdi",
            "sifre",
          ],
        raw: true
    }).then(c => {
        res.json(c)
        console.log(c.sifre);

    }).catch(err => console.log("Error : ", err));

});
app.post('/giris', (req, res) => {
    const { mail, sifre } = req.body;
    //var deger=_.pick(req.body,"mail"); //obje tipinde geliyor..
    console.log(mail);
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
            "dersKodu",
            "dersAd",
            "kontenjan",
            "teoriSaat",
            "labSaat",
            "kredi",
            "akts",
            "online",
          ],
        raw: true
    })
    .then(
        c => {
        res.send(c)
        console.log(c);

    }).catch(err => console.log("Error : ", err));
    

});
/*
app.get('/dersler', function (req, res) {
    sequelize.models.fsmvuders.findAll({
        where: {
            grupBilgisi: "BLM AS VII"
        },
        raw: true
    }).then(function (rows) {
        //console.log(rows)
        res.send(rows)


    });
  });

  app.get('/ogretimuyleri', function (req, res) {
    sequelize.models.fsmvuders.findAll({
        where: {
            grupBilgisi: "BLM AS VII"
        },
        raw: true
    }).then(function (rows) {
        //console.log(rows)
        res.send([{"maya":"mnsmn"}])


    });
  });
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
app.listen(3004, () => {
    console.log("server is listening");
});
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
    sequelize.models.fsmvuders.findAll({
        where: {
            grupBilgisi: "BLM AS VII"
        },
        raw: true
    }).then(function (rows) {
        console.log(rows)

    });


});*/

