//const { Sequelize, Model } = require("sequelize");
const express = require('express');
const cors = require('cors');
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
    //console.log(req.body);
    admin.findAll({
        where: {
            kullaniciAdi: mail,
            sifre: sifre
        },
        raw: true

    }).then(
        c => {
            //console.log(c.length)
            if (c.length != 0) { res.send("true") }
            else { res.send("false") }

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
        ],
        raw: true
    })
        .then(
            c => {
                res.send(c)
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
app.get('/ogretimElemanlari', (req, res) => {
    ogretimelemani.findAll({
        //dersAdına göre alfabetik sıra ile gönderdim.
        order: [
            ['ad', 'ASC'],
        ],
        //hangi özelliklerin gitmesini istiyorsam;
        attributes: [
            "id",
            "unvan",
            "ad",
            "soyad",
            "statu",
        ],
        raw: true
    })
        .then(
            c => {
                res.send(c)
            }).catch(err => console.log("Error : ", err));


});
app.post('/akademisyenDuzenle', (req, res) => {
    //client tarafından değişen verilerin hepsi tek bir objede geliyor.
    const { inserts } = req.body[0];
    const { updates } = req.body[1];
    const { deletes } = req.body[2];
    // update kısmı 
    updates.forEach(eleman => {
        ogretimelemani.update({
            unvan: eleman.unvan,
            ad: eleman.ad,
            soyad: eleman.soyad,
            statu: eleman.statu,

        }, {
            where: {
                id: eleman.id
            }
        }).catch(err => console.log("Error : ", err));
    });
    //insert
    inserts.forEach(eleman => {
        ogretimelemani.create({
            unvan: eleman.unvan,
            ad: eleman.ad,
            soyad: eleman.soyad,
            statu: eleman.statu,
        }).catch(err => console.log("Error : ", err));

    })
    //delete
    deletes.forEach(eleman => {
        ogretimelemani.destroy({
            where: {
                id: eleman.id
            }
        }).catch(err => console.log("Error : ", err));
    });

});
app.get('/basvurulistesi', (req, res) => {
    ogrenci.findAll({
        //tarihe göre en yeni tarih üstte görünecek şekilde  gönderdim.
        order: [
            ['talepTarih', 'DESC'],
        ],
        attributes: [
            "id",
            "ogrenciAd",
            "ogrenciSoyad",
            "ogrenciMail",
            "ogrenciFakulte",
            "ogrenciBolum",
            "universiteAdi",
            "talepTarih",
            "girisYil",
            "basvuruTur"
        ],
        raw: true
    }).then(
        c => {
            res.send(c)
        }).catch(err => console.log("Error : ", err));

});

app.post('/basvuru', (req, res) => {
    //bu kısımda intibak başvurusu yapan öğrenci ve öğrenci dersleri ekleniyor.
    //include kısmı öğrencidersleri tablosunda öğrenciId olduğundan dolayı gerekli
    ogrenci.create(req.body, {
        include: [{
            model: ogrencidersleri,
            as: "ogrencidersleri",
        }]
    }).catch(err => console.log("Error : ", err));
});

let yil, mufredatAdi;
app.get('/basvuruIncele/:id', (req, res) => {
    let query = [], query2 = [], query3 = [];
    //gelen ogrenci id sine göre dersleri ve giriş yılına göre
    //müfredatı gönderiyorum.
    ogrencidersleri.findAll({
        where: { ogrenciId: req.params.id },
        attributes: [
            "dersKodu",
            "dersAdi",
            "kredi",
            "akts",
            "basariNotu"
        ],
        raw: true,

    }).then(
        c => {
            query.push(c)
        }).catch(err => console.log("Error : ", err));

    ogrenci.findByPk(req.params.id, {
        attributes: [
            "universiteAdi",
            "girisYil"
        ],
    }).then(
        c => {
            yil = c.girisYil;
            if (yil < 2015) {
                mufredatAdi = '2014-2015';
                
            } else if (yil >= 2015 && yil < 2019) {
                mufredatAdi = '2015-2016';
                
            } else if (yil >= 2019) {
                mufredatAdi = '2019-2020';
                
            }
            query2 = { universiteAdi: c.universiteAdi }
            query.push(query2)
        }).catch(err => console.log("Error : ", err));

    fsmvuders.findAll({
    attributes: [
        "id",
        "dersKodu",
        "grupBilgisi",
        "dersAd",
        'kredi',
        "akts",
    ],
        include: [{
            model: mufredat,
            as: "mufredat",
            where: {
                ad: mufredatAdi
            },
    }],

}).then(
    c => {
        query3 =  c 
        query.push(query3)
        console.log(query);
        res.send(query)
        //console.log(query[2].dersler);
    }).catch(err => console.log("Error : ", err));

})

app.listen(3004, () => {
    console.log("server is listening");
});



