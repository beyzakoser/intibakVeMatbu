const { Sequelize, Model } = require("sequelize");

const sequelize = new Sequelize('intibakVeMatbu', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});//veri tabanı bilgileri girilmeli

//modeller import edildi
const admin = require("./models/admin.js")(sequelize, Sequelize);
const bolum = require("./models/bolum.js")(sequelize, Sequelize);
const bolumdersleri = require("./models/bolumdersleri.js")(sequelize, Sequelize);
const fsmvuders = require("./models/fsmvuders.js")(sequelize, Sequelize);
const ogrenci = require("./models/ogrenci.js")(sequelize, Sequelize);
const ogrencidersleri = require("./models/ogrencidersleri.js")(sequelize, Sequelize);
const ogretimelemani = require("./models/ogretimelemani.js")(sequelize, Sequelize);
const ogretimelemaniders = require("./models/ogretimelemaniders.js")(sequelize, Sequelize);

//modeller arası ilişkiler
bolum.hasMany(admin, {
    as: "admin",
    foreignKey: "bolumId"
});
admin.belongsTo(bolum, {
    as: "bolum",
    foreignKey: "bolumId"
});
//// ogrencidersleri çoğa çok ilişkili 
ogrenci.belongsToMany(fsmvuders, {
    through: "ogrencidersleri",
    as: "fsmvuders",
    foreignKey: "ogrenciId"
});
fsmvuders.belongsToMany(ogrenci, {
    through: "ogrencidersleri",
    as: "ogrenci",
    foreignKey: "fsmvudersId"
});
ogrencidersleri.belongsTo(ogrenci, {
    as: "ogrenci",
    foreignKey: "ogrenciId"
});
ogrencidersleri.belongsTo(fsmvuders, {
    as: "fsmvuders",
    foreignKey: "fsmvudersId"
});

//// ogretimelemaniders çoğa çok ilişkili 
fsmvuders.belongsToMany(ogretimelemani, {
    through: "ogretimelemaniders",
    as: "ogretimelemani",
    foreignKey: "fsmvudersId"
});
ogretimelemani.belongsToMany(fsmvuders, {
    through: "ogretimelemaniders",
    as: "fsmvuders",
    foreignKey: "ogretimelemaniId"
});
ogretimelemaniders.belongsTo(ogretimelemani, {
    as: "ogretimelemani",
    foreignKey: "ogretimelemaniId"
});
ogretimelemaniders.belongsTo(fsmvuders, {
    as: "fsmvuders",
    foreignKey: "fsmvudersId"
});

//// bolumDersleri çoğa çok ilişkili 
fsmvuders.belongsToMany(bolum, {
    through: "bolumdersleri",
    as: "bolum",
    foreignKey: "fsmvudersId"
});
bolum.belongsToMany(fsmvuders, {
    through: "bolumdersleri",
    as: "fsmvuders",
    foreignKey: "bolumId"
});
bolumdersleri.belongsTo(bolum, {
    as: "bolum",
    foreignKey: "bolumId"
});
bolumdersleri.belongsTo(fsmvuders, {
    as: "fsmvuders",
    foreignKey: "fsmvudersId"
});

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
    })*/
    sequelize.models.fsmvuders.findAll({
        where: {
            grupBilgisi: "BLM AS VII"
        },
        raw: true
    }).then(function (rows) {
        console.log(rows)

    });


});

