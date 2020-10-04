const express = require('express'); 
const bodyParser = require('body-parser'); 
const cors = require('cors');

const app = express(); 

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const user = process.env.USER;
const userPassword = process.env.USER_PASSWORD;
const dbName = process.env.DB_NAME;
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

    app.get('/', (req, res) => {
        res.send("What's up BABY? I am here");
    })
    
    app.get('/events', (req, res) => {
        collection.find({})
        .toArray((err, documents) => {
            res.send(documents);
        })
    })

});




app.listen(process.env.port || 5000); 