const lodash = require('lodash');

var a = [ 
    { "id": 50, "name": "beyza", "job": "student" },
    { "id": 5, "name": "omer", "job": "student" },
    { "id": 15, "name": "ayse", "job": "student" },
    { "id": 1, "name": "maya", "job": "student" },
    { "id": 2, "name": "mehmet", "job": "teacher" }

];
var b = [
    { "id": 50, "name": "beyza", "job": "student" },
    { "id": 5, "name": "omer", "job": "engineer" },
    { "id": 15, "name": "zeynep", "job": "student" },
    { "name": "ahmet", "job": "teacher" },
    { "name": "ali", "job": "student" },
];

//insert kısmı
var eklenenler = []
Object.keys(b).forEach(key => {
    if (b[key].id == undefined) {
        eklenenler.push(b[key])

    }
})
var obje = [{ insert: eklenenler }] 

//update kısmı
var serialized_Items_Prev = a.map(i => JSON.stringify(i));
var degisenler = b.filter(i => !serialized_Items_Prev.includes(JSON.stringify(i)));
var guncellenecek = degisenler.filter((e) => !(obje[0].insert).includes(e));
var updated = { update: guncellenecek } //update olanlar eklendi.
obje.push(updated)

//delete kısmı
var c = lodash.differenceWith(a, b, function (o1, o2) {
    return o1['id'] === o2['id']
});
var deleted = { delete: c } //silinenler 
obje.push(deleted)
console.log(obje);
console.log(obje[0]);//insert listesi
console.log(obje[1]);//update listesi
console.log(obje[2]);//delete listesi




//eklenen kontrolünü backend kısmında o id veri tabanında yok ise veritabanına ekle
//şeklinde kontrol sağlanır

//bu kodlar backend tarafında olacak çünkü front end de eski veriler saklamış olmuyor.
//frontend den gelen veriler ile veritabanındakiler karşılaştırılacak...