const express = require('express');
const open = require('open');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const Courses = require('./courses.js');

let db;
const app = express();
const port = 3033;

app.use(express.static('static'));

app.use(bodyParser.json());

MongoClient.connect('mongodb://localhost/').then(client =>{
    return client.db('CoursesGraphDB');
}).then(connection => {
    db = connection;
    app.listen(port, () => {
        console.log('App started on port ' + port)
    });
}).catch(error => {
    console.log('ERROR', error);
});

app.get('/api/courses/', (req, res) => {
    db.collection('comp_sci_courses').find().toArray().then(courses => {
        const metadata = { total_count: courses.length };
        res.json({ _metadata: metadata, records:courses})
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}`});
    });
});


app.post('/api/courses/', (req, res) => {
    const newCourse = req.body;
    console.log(newCourse)
    const invalidFormat = Courses.validateCourseFormat(newCourse);

    if(invalidFormat) {
        res.status(422).json({message: `Invalid request: ${invalidFormat}`});
        return;
    }

    db.collection('comp_sci_courses').updateOne({name:newCourse.name}, { $set: newCourse}, {upsert:true}).then(result => 
            {
                console.log(`result upserted id: ${Object.prototype.toString.call(result.upsertedId)}`)
                db.collection('comp_sci_courses').find({_id: result.upsertedId}).limit(1).next()
            }
    ).then(newCourse => {
        console.log(`new course: ${newCourse}`)
        res.json(newCourse);
    }).catch(error => {
        console.log(error);
        res.status(500).json({message: `Internal Server Error: ${error}`});
    });
});


