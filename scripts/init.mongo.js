db = new Mongo().getDB('CoursesGraphDB');

db.courses.remove({});

db.courses.insert([

    // computer science requirements
    { name: "COMPSCI 150", credits: 3, prereqs:[]},
    { name: "COMPSCI 250", credits: 3, prereqs:[{or:["MATH 116","MATH 211"]}]},
    { name: "COMPSCI 251", credits: 3, prereqs:["COMPSCI 250", {or:["MATH 116", "MATH 211"]}]},
    { name: "COMPSCI 315", credits: 3, prereqs:["COMPSCI 250", {or:["MATH 116", "MATH 211"]}]},
    { name: "COMPSCI 317", credits: 3, prereqs:["COMPSCI 250", {or:["MATH 221, MATH 226, MATH 231"]}]},
    { name: "COMPSCI 337", credits: 3, prereqs:["COMPSCI 251"]},
    { name: "COMPSCI 351", credits: 3, prereqs:["COMPSCI 251", {or:["MATH 116", "MATH 211"]}]},
    { name: "COMPSCI 361", credits: 3, prereqs:["COMPSCI 351", "GER ENGLISH"]},
    { name: "COMPSCI 395", credits: 3, prereqs:["SOPH ST"]},
    { name: "COMPSCI 417", credits: 3, prereqs:["JR ST", "COMPSCI 317", {or:["MATH 221", "MATH 232"]}]},
    { name: "COMPSCI 431", credits: 3, prereqs:["JR ST", "COMPSCI 351"]},
    { name: "COMPSCI 458", credits: 3, prereqs:["JR ST", {or:["COMPSCI 315", "ELECENG 367", "ELECENG 354"]}]},
    { name: "COMPSCI 520", credits: 3, prereqs:["JR ST", {or:["COMPSCI 315", "COMPSCI 458", "ELECENG 367"]}]},
    { name: "COMPSCI 535", credits: 3, prereqs:["JR ST", "COMPSCI 317", "COMPSCI 351"]},
    { name: "COMPSCI 537", credits: 3, prereqs:["JR ST", "COMPSCI 337", {or:["COMPSCI 458", "ELECENG 458"]}]},
    { name: "COMPSCI 595", credits: 4, prereqs:["SR ST", "COMPSCI 361", "COMPSCI 458", "COMPSCI 535", "COMPSCI 537"]},
    { name: "EAS 200", credits: 1, prereqs:[]},
    { name: "ELECENG 354", credits: 3, prereqs:[{or:["COMPSCI 240", "COMPSCI 250"]}]},

    // math requirements
    { name: "MATH 211", credits: 4, prereqs:{}},
    { name: "MATH 213", credits: 4, prereqs:{}},
    { name: "MATH 221", credits: 5, prereqs:{}},
    { name: "MATH 231", credits: 4, prereqs:{}},

    // natural science requirements
    { name: "BIOSCI 150", credits: 4, prereqs:[]},
    { name: "BIOSCI 152", credits: 4, prereqs:[]},
    { name: "BIOSCI 202", credits: 4, prereqs:[]},
    { name: "BIOSCI 203", credits: 4, prereqs:[]},
    { name: "CHEM 102", credits: 5, prereqs:[]},
    { name: "CHEM 104", credits: 5, prereqs:[]},
    { name: "PHYSICS 120", credits: 4, prereqs:[]},
    { name: "PHYSICS 122", credits: 3, prereqs:[]},
    { name: "PHYSICS 209", credits: 3, prereqs:[{or:["MATH 227", "MATH 228"]}]},
    { name: "PHYSICS 210", credits: 3, prereqs:[]},

    // general education requirements
    { name: "GER ART", credits: 3, prereqs:[]},
    { name: "GER HUMANITIES", credits: 3, prereqs:[]},
    { name: "GER SOCIALSCIENCE", credits: 3, prereqs:[]},
    { name: "GER ENGLISH 310", credits: 3, prereqs:[]},
    { name: "GER COMMUN 105", credits: 3, prereqs:[]},
    
    // TECHNICAL ELECTIVES
    
    // computer science electives
    { name: "COMPSCI 422", credits: 3, prereqs:["JR ST",]},
    { name: "COMPSCI 423", credits: 3, prereqs:["JR ST",]},
    { name: "COMPSCI 425", credits: 3, prereqs:["JR ST",]},
    { name: "COMPSCI 438", credits: 3, prereqs:["JR ST",]},
    { name: "COMPSCI 444", credits: 3, prereqs:["JR ST",]},
    { name: "COMPSCI 459", credits: 3, prereqs:["JR ST",]},
    { name: "COMPSCI 469", credits: 3, prereqs:["JR ST",]},
    { name: "COMPSCI 511", credits: 3, prereqs:["JR ST",]},
    { name: "COMPSCI 530", credits: 3, prereqs:["JR ST",]},
    { name: "COMPSCI 536", credits: 3, prereqs:["JR ST",]},
    { name: "COMPSCI 552", credits: 3, prereqs:["JR ST",]},
    { name: "COMPSCI 557", credits: 3, prereqs:["JR ST",]},
    { name: "COMPSCI 581", credits: 3, prereqs:["JR ST",]},
    { name: "COMPSCI 599", credits: 3, prereqs:["JR ST",]},
    { name: "COMPSCI 654", credits: 3, prereqs:["JR ST",]},
    { name: "COMPSCI 655", credits: 3, prereqs:["JR ST",]},
    { name: "COMPSCI 657", credits: 3, prereqs:["JR ST",]},
    { name: "COMPSCI 699", credits: 3, prereqs:["JR ST",]},
    { name: "ELECENG 367", credits: 3, prereqs:["JR ST",]},
    { name: "ELECENG 451", credits: 3, prereqs:["JR ST",]},
    { name: "ELECENG 457", credits: 3, prereqs:["JR ST",]},
    
    // pplied technology electives    
    { name: "COMPSCI 481", credits: 3, prereqs:[{or:["COMPSCI 113", "INFOST 240", "ART 324"]}]},
    { name: "COMPSCI 482", credits: 3, prereqs:[{or:["COMPSCI 361", "COMPSCI 481"]}]},
    { name: "COMPSCI 658", credits: 3, prereqs:[]},
    
    
    { name: "COMPSCI ", credits: 3, prereqs:["JR ST",]},

]);

db.courses.createIndex({name: 1 })
db.courses.createIndex({credits: 1 })
db.courses.createIndex({prereqs: 1 })
