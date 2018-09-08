db = new Mongo().getDB('CoursesGraphDB');

db.courses.remove({});

db.courses.insert([
    { name: "", credits: 3, prereqs:{}},
    { name: "", credits: 3, prereqs:{}},
    { name: "", credits: 3, prereqs:{}},
    { name: "", credits: 3, prereqs:{}},
    { name: "", credits: 3, prereqs:{}},
]);

db.courses.createIndex({name: 1 })
db.courses.createIndex({credits: 1 })
db.courses.createIndex({prereqs: 1 })
