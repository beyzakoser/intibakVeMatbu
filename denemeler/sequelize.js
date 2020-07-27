var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json())
const {Sequelize,Model} = require("sequelize");

const sequelize = new Sequelize('zeynep','root','12345678',{
    host: 'localhost',
    dialect: 'mysql'
});//veri tabanı bilgileri girilmeli

//module.exports=sequelize
//global.sequelize=sequelize
const insans = require("./insans.js")(sequelize, Sequelize);


sequelize.sync({ force: false}).then(() => {
  console.log("basarili bir şekilde bağlandı");
/*sequelize.models.insans.create({
  ad: "omer" ,
  soyad:"yildiz",
  tc:47509
 });

  //yeni veri ekleme
   insan.create({
     ad: "aaf" ,
     soyad:"aas",
     tc:45110
    });
    //listeleme
   
    insan.findAll({
      where:{
          ad:"beyza"
      },
      raw: true 
    }).then(rows => console.log(rows));
  */
    
});


const insan = sequelize.define('insan',{
    ad : Sequelize.STRING,
    soyad: Sequelize.STRING,
    tc: {
      type: Sequelize.INTEGER,
      allowNull:false,
      unique:true,
      validate:{
        isNumeric:true,
        min:3
      },
    },
});


insan.findAll({
  raw: true
}).then(function(rows){
  console.log("findAll metodu : ")
  console.log(rows)

});/*
insan.findByPk(1,{raw:true}).then(function(rows){
  console.log("findByPk metodu")
  console.log(rows);

});*/

insan.destroy({
  where :{
    id:41
  }
}).then(function(deleted){
  if(deleted===0){
  console.log("Böyle bir id bulunmamaktadır.")
  }else{
  console.log("silindi")
  }
})
/*

app.get('/', function (req, res) {
  insan.findAll({
    where:{
        id:1
    },
    raw: true
  }).then(function(rows){
    res.send(rows)
    console.log(rows)

  });
});
sequelize.sync({ force: false}).then(() => {
  console.log("basarili bir şekilde bağlandı");
  //yeni veri ekleme
   insan.create({
     ad: "aaf" ,
     soyad:"aas",
     tc:45110
    });
    //listeleme
   
    insan.findAll({
      where:{
          ad:"beyza"
      },
      raw: true 
    }).then(rows => console.log(rows));
  
    
});
app.listen(3000);
 
*/