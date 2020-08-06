const { Sequelize, Model } = require("sequelize");
const sequelize = new Sequelize('intibakVeMatbu', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});//veri tabanı bilgileri girilmeli
admin= require("./models/admin.js")(sequelize, Sequelize);

bolum = require("./models/bolum.js")(sequelize, Sequelize);
bolumdersleri = require("./models/bolumdersleri.js")(sequelize, Sequelize);
fsmvuders = require("./models/fsmvuders.js")(sequelize, Sequelize);
ogrenci = require("./models/ogrenci.js")(sequelize, Sequelize);
ogrencidersleri = require("./models/ogrencidersleri.js")(sequelize, Sequelize);
ogretimelemani = require("./models/ogretimelemani.js")(sequelize, Sequelize);
ogretimelemaniders = require("./models/ogretimelemaniders.js")(sequelize, Sequelize);//modeller arası ilişkiler
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
module.exports=sequelize
global.sequelize=sequelize
