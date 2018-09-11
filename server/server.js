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

app.get('/api/uwm_courses/comp_sci', (req, res) => {
    db.collection('comp_sci_courses').find().toArray().then(courses => {
        const metadata = { total_count: courses.length };
        res.json({ _metadata: metadata, records:courses})
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}`});
    });
});


app.post('/api/uwm_courses/comp_sci', (req, res) => {
    const newCourse = req.body;

    //const err = validateCourse(newCourse, "comp_sci_courses");
    const invalidFormat = Courses.validateCourseFormat(newCourse);

    if(invalidFormat) {
        res.status(422).json({message: `Invalid request: ${invalidFormat}`});
        return;
    }

    db.collection('comp_sci_courses').update({name:newCourse.name}, newCourse, {upsert:true}).then(result => 
        db.collection('comp_sci_courses').find({_id: result.insertedId}).limit(1).next()
    ).then(newCourse => {
        res.json(newCourse);
    }).catch(error => {
        console.log(error);
        res.status(500).json({message: `Internal Server Error: ${error}`});
    });
});


/**
 * Validate the course is not in the database already after validating it's format is correct.
 * Method in server.js due to db connection variable already being instantiated in this file (can I pass a db variable?)
 * @param {*} course 
 */
function validateCourse(course, collection){
    const invalidFormat = Courses.validateCourseFormat(course);

    if(invalidFormat){
        return invalidFormat;
    }

    let courseExists = db.collection(collection).find({name: course.name}).toArray(function(err, result) {
        if (err){ throw err;}
        console.log(result);
        return result;
    });


    
    // console.log("course exists:")
    // console.log(courseExists);

    // if(courseExists != null){
    //     return `${course.name} already exists. Course Exists val = ${courseExists}`;
    // }
}