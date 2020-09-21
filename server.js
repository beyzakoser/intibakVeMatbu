const { Sequelize, Model, Op } = require("sequelize");
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
        include: [{
            model: mufredat,
            as: "mufredat",
            where: {
                ad: '2019-2020'
            },
        }],
    })
        .then(
            c => {
                res.send(c)
            }).catch(err => console.log("Error : ", err));

});
app.get('/donemDersleri/:donem', (req, res) => {
    console.log(req.params.donem);
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

        include: [{
            model: mufredat,
            as: "mufredat",
            where: {
                ad: '2019-2020'
            },
        }],

        include: [{
            model: acilanders,
            as: "acilanders",
            required: true,
            include: [{
                model: somestr,
                as: "somestr",
                where: {
                    donem: req.params.donem
                },
            }],
        }],
    })
        .then(
            c => {
                //console.log(c);
                res.send(c)
            })
        .catch(err => console.log("Error : ", err));

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
        include: [{
            model: bolumogretimelemani,
            as: "bolumogretimelemani",
            include: [{
                model: bolum,
                as: "bolum",
                attributes: [
                    "bolumAdi"
                ],
            }],
        }],
        raw: true
    })
        .then(
            c => {
                //console.log(c);
                res.send(c)
                res.end()
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
        bolum.findOne({
            where: { bolumAdi: eleman.bolumogretimelemani.bolum.bolumAdi } //eleman.bolumogretimelemani[0].bolum.bolumAdi
        }).then(c => {
            if (c) {
                console.log(c.toJSON().id)
                ogretimelemani.create({
                    unvan: eleman.unvan,
                    ad: eleman.ad,
                    soyad: eleman.soyad,
                    statu: eleman.statu,
                    bolumogretimelemani: [
                        {
                            bolumId: c.toJSON().id,
                        }]
                }, {
                    include: {
                        model: bolumogretimelemani,
                        as: "bolumogretimelemani",
                    },

                }).then(a => {
                    console.log(a.toJSON())
                    res.send("kaydedildi")
                    res.end();
                }).catch(err => console.log("Error : ", err))
            }
            else {
                res.send("böyle bir bölüm bulunmamaktadır")
            }
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
            "basvuruTur",
            "intibakDurumu"
        ],
        raw: true
    }).then(
        c => {
            res.send(c)
            res.end();
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
    }).then(c => {
        res.send("başvuru eklendi");
        res.end();
    }).catch(err => console.log("Error : ", err));
})


let yil, mufredatAdi = '2019-2020';
busvurulanDersleriListele = async () => {
    app.get('/basvuruIncele/:id', (req, res) => {

        //gelen ogrenci idsine göre dersleri listeledim
        ogrencidersleri.findAll({
            where: { ogrenciId: req.params.id },
            attributes: [
                "id",
                "dersKodu",
                "dersAdi",
                "kredi",
                "akts",
                "basariNotu",
                "fsmvuBasariNotu",
                "fsmvuDersId"
            ],
            include: [{
                attributes: [
                    "id",
                    "dersKodu",
                    "dersAd",
                    "kredi",
                    "akts",
                    "grupBilgisi",
                ],
                model: fsmvuders,
                as: "fsmvuders",
            }],
            //raw: true,

        }).then(
            c => {
                let newObject = []
                if (c[0].dataValues.fsmvuders === null) {
                    res.send(c)
                } else {
                    //console.log(c[0].dataValues.fsmvuders === null);
                    c.forEach(eleman => {

                        let zekiye = {
                            id: eleman.toJSON().id, dersKodu: eleman.toJSON().dersKodu,
                            dersAdi: eleman.toJSON().dersAdi, kredi: eleman.toJSON().kredi, akts: eleman.toJSON().akts,
                            basariNotu: eleman.toJSON().basariNotu, fsmvuBasariNotu: eleman.toJSON().fsmvuBasariNotu,
                            fsmvuDersId: eleman.toJSON().fsmvuDersId, fsmvuDersKodu: eleman.toJSON().fsmvuders.dersKodu,
                            fsmvuDersGrubu: eleman.toJSON().fsmvuders.grupBilgisi, fsmvuDersinAdi: eleman.toJSON().fsmvuders.dersAd,
                            fsmvuKredi: eleman.toJSON().fsmvuders.kredi, fsmvuAkts: eleman.toJSON().fsmvuders.akts
                        }

                        newObject.push(zekiye)

                    })
                    res.send(newObject)
                }
                // }
                // else{
                //     res.send(c)

                // }
                //console.log(newObject);

                //res.end();
            }).catch(err => console.log("Error : ", err));
    })
}
mufredatListele = async () => {
    mufredatAdi = '';
    //mufredatAdi değişkenine atama yapılmadan çalışmaması için await içerisinde çağırdım.
    await busvurulanDersleriListele()
    await mufredatBul()
    app.get('/mufredatDersleriListele', (req, res) => {
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
                res.send(c)
                res.end()

            }).catch(err => console.log("Error : ", err));

    })
}
mufredatBul = () => {
    //Vaktin olursa bu kodu en baştan düzenlemeyi unutma!!
    //return new Promise(resolve => {
    app.get('/universiteAdi/:id', (req, res) => {
        ogrenci.findByPk(req.params.id, {
            attributes: [
                "universiteAdi",
                "girisYil",
                "ogrenciAd",
                "ogrenciSoyad",
                "ogrenciBolum",
                "basvuruTur",
                "basvurduguBolum",
                "intibakDurumu",
                "basvuruTur"
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
                res.send(c)
                //resolve(true); //nerede sonlanmasını istiyorsak oraya yazıyoruz
                res.end()
            }).catch(err => console.log("Error : ", err));
    })
    //})
}

mufredatListele();


app.get('/ogretimElemaniDersleri/:id/:donem', (req, res) => {
fsmvuders.findAll({
    order: [
        ['dersAd', 'ASC'],
    ],
    attributes: [
        "id",
        "dersAd",
    ],
    include: [{
        model: acilanders,
        as: "acilanders",
        required: true,
        include: [{
            model: ogretimelemaniders,
            as: "ogretimelemaniders",
            where: {
                ogretimElemaniId: req.params.id
            },
        }, {
            model: somestr,
            as: "somestr",
            where: {
                donem: req.params.donem
            },
        }],
    }],
    
})
    .then(
        c => {
            res.send(c)
            res.end()
            //console.log(c);
        }).catch(err => console.log("Error : ", err));

 })

app.put('/intibakTamamla', (req, res) => {
    //console.log(req.body);
    ogrenci.update(req.body, {
        where: {
            id: req.body.id
        },

    })
        .then(c => {
            //res.send("intibak başarıyla tamamlandı")
            req.body.ogrencidersleri.forEach(eleman => {
                ogrencidersleri.update(eleman, {
                    where: {
                        id: eleman.id
                    },

                }).then(
                    res.end()
                ).catch(err => console.log("Error : ", err))
            })

        }
        ).catch(err => { console.log("Error : ", err), res.send('bir sıkıntı oldu') });

})



app.listen(3004, () => {
    console.log("server is listening");
});



