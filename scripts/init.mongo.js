db = new Mongo().getDB('CoursesGraphDB');

db.courses.remove({});

db.courses.insert([

    // computer science requirements
    { name: "COMPSCI 150", credits: 3, prereqs:[]},
    { name: "COMPSCI 250", credits: 3, prereqs:[{or:["MATH 116","MATH 211"]}]},
    { name: "COMPSCI 251", credits: 3, prereqs:["COMPSCI 250", {or:["MATH 116","MATH 211"]}]},
    { name: "COMPSCI 315", credits: 3, prereqs:[]},
    { name: "", credits: 3, prereqs:{}},
]);

db.courses.createIndex({name: 1 })
db.courses.createIndex({credits: 1 })
db.courses.createIndex({prereqs: 1 })
