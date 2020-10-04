const express = require('express'); 
const bodyParser = require('body-parser'); 
const cors = require('cors');

const app = express(); 

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const user = 'volunteer-admin';
const userPassword = 'UfVwJocCaHN9yzI2';
const dbName = 'volunteer-network';
const eventCollection = 'event';

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${user}:${userPassword}@cluster0.vetwi.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db(dbName).collection(eventCollection);

    // app.post('/addEvent', (req, res) => {
    //     const event = req.body;
    //     console.log(event)
    //     collection.insertMany(event)
    //     .then(result => {
    //         console.log(result);
    //         res.send(result.insertedCount)
    //     })
    // })
    
    app.get('/events', (req, res) => {
        collection.find({})
        .toArray((err, documents) => {
            res.send(documents);
        })
    })

});




app.listen(5000); 