const express = require('express');
const open = require('open');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

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

app.get('/api/compSciDept', (req, res) => {
    db.collection('compSciDept').find().toArray().then(courses => {
        const metadata = { total_count: courses.length };
        res.json({ _metadata: metadata, records:courses})
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}`});
    });
});