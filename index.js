const express = require('express'); 
const bodyParser = require('body-parser'); 
const cors = require('cors');
require('dotenv').config()

const app = express(); 
// skejfkf

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const user = process.env.USER;
const userPassword = process.env.USER_PASSWORD;
const dbName = process.env.DB_NAME;

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${user}:${userPassword}@cluster0.vetwi.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useUnifiedTopology: true}, { useNewUrlParser: true });

client.connect(err => {
    const eventCollection = client.db(dbName).collection('event');
    const RegisteredEventCollection = client.db(dbName).collection('registeredEvent');

    app.post('/addEvent', (req, res) => {
        const event = req.body;
        eventCollection.insertMany(event)
        .then(result => {
            res.send(result.insertedCount)
        })
    })

    app.post('/addRegisteredEvent', (req, res) => {
        const registeredEvent = req.body;
        // console.log(registeredEvent);
        RegisteredEventCollection.insertOne(registeredEvent)
        .then(result => {
            res.send(result.insertedCount)
        })
    })

    app.get('/', (req, res) => {
        res.send("Hey, It is created by Roky Vhai.");
    })
    
    app.get('/events', (req, res) => {
        eventCollection.find({})
        .toArray((err, documents) => {
            res.send(documents);
        })
    })

    app.get('/registeredEvent', (req, res) => {
        RegisteredEventCollection.find({})
        .toArray((err, documents) => {
            res.send(documents);
        })
    })

});




app.listen(process.env.PORT || 5000); 