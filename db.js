const { Sequelize, Model } = require("sequelize");

const sequelize = new Sequelize('db', 'root', '12345678', {
    host: '127.0.0.1',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});//veri tabanı bilgileri girilmeli
acilanders= require("./models/acilanders.js")(sequelize, Sequelize);
admin= require("./models/admin.js")(sequelize, Sequelize);
bolum = require("./models/bolum.js")(sequelize, Sequelize);
bolumdersleri = require("./models/bolumdersleri.js")(sequelize, Sequelize);
bolumogretimelemani = require("./models/bolumogretimelemani.js")(sequelize, Sequelize);
fsmvuders = require("./models/fsmvuders.js")(sequelize, Sequelize);
mufredat = require("./models/mufredat.js")(sequelize, Sequelize);
mufredatders = require("./models/mufredatders.js")(sequelize, Sequelize);
ogrenci = require("./models/ogrenci.js")(sequelize, Sequelize);
ogrencidersleri = require("./models/ogrencidersleri.js")(sequelize, Sequelize);
ogretimelemani = require("./models/ogretimelemani.js")(sequelize, Sequelize);
ogretimelemaniders = require("./models/ogretimelemaniders.js")(sequelize, Sequelize);
somestr = require("./models/somestr.js")(sequelize, Sequelize);

//modeller arası ilişkiler
//admin bölüm ilişkisi
bolum.hasMany(admin, {
    as: "admin",
    foreignKey: "bolumId"
});
admin.belongsTo(bolum, {
    as: "bolum",
    foreignKey: "bolumId"
});
//acilanders somestr ilişkisi
somestr.hasMany(acilanders, {
    as: "acilanders",
    foreignKey: "somestrId"
});
acilanders.belongsTo(somestr, {
    as: "somestr",
    foreignKey: "somestrId"
});
//acilanders fsmvuDers ilişkisi
fsmvuders.hasMany(acilanders, {
    as: "acilanders",
    foreignKey: "fsmvudersId"
});
acilanders.belongsTo(fsmvuders, {
    as: "fsmvuders",
    foreignKey: "fsmvudersId"
});
//// ogretimelemaniders çoğa çok ilişkili 
acilanders.belongsToMany(ogretimelemani, {
    through: "ogretimelemaniders",
    as: "ogretimelemani",
    foreignKey: "acilandersId"
});
ogretimelemani.belongsToMany(acilanders, {
    through: "ogretimelemaniders",
    as: "acilanders",
    foreignKey: "ogretimelemaniId"
});
ogretimelemaniders.belongsTo(ogretimelemani, {
    as: "ogretimelemani",
    foreignKey: "ogretimelemaniId"
});
ogretimelemaniders.belongsTo(acilanders, {
    as: "acilanders",
    foreignKey: "acilandersId"
});

//// mufredatders çoğa çok ilişkili 
fsmvuders.belongsToMany(mufredat, {
    through: "mufredatders",
    as: "mufredat",
    foreignKey: "fsmvuDersId"
});
// mufredat.belongsToMany(fsmvuders, {
//     through: "mufredatders",
//     as: "fsmvuders",
//     foreignKey: "mufredatId"
// });
// mufredatders.belongsTo(fsmvuders, {
//     as: "fsmvuders",
//     foreignKey: "fsmvudersId"
// });
// mufredatders.belongsTo(mufredat, {
//     as: "mufredat",
//     foreignKey: "mufredatId"
// });
fsmvuders.hasMany(mufredatders, {
    as: "mufredatders",
    foreignKey: "fsmvuDersId"
  });
  mufredatders.belongsTo(fsmvuders, {
    as: "fsmvuders",
    foreignKey: "fsmvuDersId"
  });
  //Classroom  has many event classroom
  mufredat.hasMany(mufredatders, {
    as: "mufredatders",
    foreignKey: "mufredatId"
  });
  mufredatders.belongsTo(mufredat, {
    as: "mufredat",
    foreignKey: "mufredatId"
  });
//// ogrencidersleri çoğa çok ilişkili 
// ogrenci.belongsToMany(fsmvuders, {
//     through: "ogrencidersleri",
//     as: "fsmvuders",
//     foreignKey: "ogrenciId"
// });
// fsmvuders.belongsToMany(ogrenci, {
//     through: "ogrencidersleri",
//     as: "ogrenci",
//     foreignKey: "fsmvudersId"
// });
// ogrencidersleri.belongsTo(ogrenci, {
//     as: "ogrenci",
//     foreignKey: "ogrenciId"
// });
// ogrencidersleri.belongsTo(fsmvuders, {
//     as: "fsmvuders",
//     foreignKey: "fsmvudersId"
// });
//sonradan değiştirdiğim kısım
  ogrenci.hasMany(ogrencidersleri, {
    as: "ogrencidersleri",
    foreignKey: "ogrenciId"
  });
  ogrencidersleri.belongsTo(ogrenci, {
    as: "ogrenci",
    foreignKey: "ogrenciId"
  });
  //Classroom  has many event classroom
  fsmvuders.hasMany(ogrencidersleri, {
    as: "ogrencidersleri",
    foreignKey: "fsmvudersId"
  });
  ogrencidersleri.belongsTo(fsmvuders, {
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
//bolumogretimelemani çoğa çok

bolumogretimelemani.belongsTo(ogretimelemani, {
    as: "ogretimelemani",
    foreignKey: "ogretimElemaniId"
});
bolumogretimelemani.belongsTo(bolum, {
    as: "bolum",
    foreignKey: "bolumId"
});
ogretimelemani.hasMany(bolumogretimelemani, {
    as: "bolumogretimelemani",
    foreignKey: "ogretimElemaniId"
  });
  bolum.hasMany(bolumogretimelemani, {
    as: "bolumogretimelemani",
    foreignKey: "bolumId"
  });

module.exports=sequelize
global.sequelize=sequelize
