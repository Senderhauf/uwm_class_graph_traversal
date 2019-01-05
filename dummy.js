const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert')
let db
const port = 3033;

const client = new MongoClient('mongodb://localhost:27017')
client.connect(function(err){
    assert.equal(null, err)
    console.log('Connection Successful')

    db = client.db('CoursesGraphDB')

    const newCourse = {name:'CS 777', credits:3, prerequisites:'', difficulty:''};

    console.log(courseExists(newCourse, db))

    db.collection('comp_sci_courses').insert({set: newCourse}).then(result => 
        {
            db.collection('comp_sci_courses').find({_id: result.insertedId})
        }
    ).then(newCourse => {
        console.log(`new course: ${JSON.stringify(newCourse)}`)
    })
})


function courseExists(course, db){
    db.collection('comp_sci_courses').find({name: course.name}).limit(1).next().then(
        x => {
            return x
        }
    )
}
