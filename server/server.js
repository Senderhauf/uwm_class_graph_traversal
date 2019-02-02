const express = require('express');
const open = require('open');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongo = require('mongodb');
const Courses = require('./courses.js');

let db;
const app = express();
const port = 3033;

app.use(express.static('static'));
app.use(bodyParser.json());

MongoClient.connect('mongodb://0.0.0.0/', {useNewUrlParser: true}).then(client =>{
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

// get a specific courses prereqs
app.get(`/api/courses/type/:courseType/value/:courseValue`, (req, res) => {
    db.collection('comp_sci_courses').find({courseType:req.params.courseType, courseValue: req.params.courseValue}).toArray().then(courses => {
        const metadata = { total_count: courses.length };
        res.json({ _metadata: metadata, records:courses.map(x => x.prereqs)[0]})
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}`});
    });
});

// insert or update a course
app.post('/api/courses/', (req, res) => {
    const newCourse = req.body;
    console.log(`newCourse: ${JSON.stringify(newCourse)}`)
    const invalidFormat = Courses.validateCourseFormat(newCourse);

    if(invalidFormat) {
        res.status(422).json({message: `Invalid request: ${invalidFormat}`});
        return;
    }

    db.collection('comp_sci_courses').updateOne({courseType:newCourse.courseType, courseValue:newCourse.courseValue}, {$set: newCourse}, {upsert:true}).then(result =>
        {
            console.log(`modified count: ${result.modifiedCount}`)
            console.log(`matched count: ${result.matchedCount}`)

            if (!(result.matchedCount === 0 && result.modifiedCount === 0)){
                throw Error('Course Exists Already')
            }
            console.log(`result.upsertedId: ${result.upsertedId._id}`)
            var o_id = new mongo.ObjectID(result.upsertedId._id)
            console.log(`objectid: ${o_id}`)
            return db.collection('comp_sci_courses').find({_id: o_id }).limit(1).next()
        }
	).then(newCourse => {
        console.log(`server newCourse: ${JSON.stringify(newCourse)}`)
		res.json(newCourse);
	}).catch(error => {
		console.log(error);
		res.status(500).json({message: `Internal Server Error: ${error}`});
	});
});

// insert prereqs to an existing course
app.post('/api/courses/addpreq/type/:courseType/value/:courseValue', (req, res) => {
    let updatedCourse = null;
    let newCourse = req.body;

    db.collection('comp_sci_courses').find({courseType:req.params.courseType, courseValue: req.params.courseValue}).toArray().then(course => {
        course[0].prereqs.push(newCourse)
        updatedCourse = course[0]
        return updatedCourse
    }).then(updatedCourse => {
        if(updatedCourse == null){
            throw Error("updatedCourse is null")
        }

        db.collection('comp_sci_courses').updateOne({courseType:req.params.courseType, courseValue: req.params.courseValue}, {$set: updatedCourse}, {upsert:true}).then(updatedCourse => {
            console.log(`server newCourse: ${updatedCourse}`)
            res.json(updatedCourse);
        }).catch(error => {
            console.log(error);
            res.status(500).json({message: `Internal Server Error: ${error}`});
        });

    }).catch(error => {
        console.log('Error: '+error);
        res.status(500).json({ message: `Internal Server Error: ${error}`});
    });

});

app.delete('/api/courses/type/:courseType/value/:courseValue/', (req, res) => {
    
    let paramCourseType = req.params.courseType
    let paramCourseValue = req.params.courseValue

    // First Query: delete the course from the comp_sci_courses collection 
    db.collection('comp_sci_courses').deleteOne({courseType:paramCourseType, courseValue:paramCourseValue}).then(deletedCourse => {
        console.log(`deleted course: ${JSON.stringify(deletedCourse)}`)
    }).then(

        // Second Query: delete the course from any remaining course's prereqs field
        // Note: if the prereq is an OR prereq and the deleted course is contained within, the entire OR prereq will be deleted
        db.collection('comp_sci_courses').find().toArray().then(courses => {
            courses.map((course) => {
                    console.log(`\n\nCOURSE: ${JSON.stringify(course)}`)
                    let prereqs = course.prereqs
                    console.log(`\nCOURSE PREREQS: ${JSON.stringify(prereqs)}`)

                    let filteredPrereqs = prereqs.filter(item => 
                        (item.or == null && !(item.courseType === paramCourseType && item.courseValue === paramCourseValue))  
                        ||  
                        (item.or != null && item.or.filter(x => x.courseType === paramCourseValue && x.courseValue === paramCourseValue).length === 0)
                    )

                    console.log(`\nFILTERED PREREQS: ${JSON.stringify(filteredPrereqs)}`)
                    
                    course.prereqs = filteredPrereqs

                    db.collection('comp_sci_courses').updateOne({courseType:course.courseType, courseValue: course.courseValue}, {$set: course}, {upsert:true})
                    .catch(error => {
                        console.log(error);
                        res.status(500).json({message: `Internal Server Error: ${error}`});
                    });
            })
            res.status(200).json({message: `Course Removed: ${req.params.courseType} ${req.params.courseValue}`})
    })).catch(error => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}`});
    });
});
