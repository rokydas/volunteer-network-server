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
const eventCollection = 'event'; 

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${user}:${userPassword}@cluster0.vetwi.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useUnifiedTopology: true}, { useNewUrlParser: true });

client.connect(err => {
    const collection = client.db(dbName).collection(eventCollection);
    console.log(user, userPassword, dbName, eventCollection)

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
        res.send("Hey, It is created by Roky Vhai.");
    })
    
    app.get('/events', (req, res) => {
        collection.find({})
        .toArray((err, documents) => {
            res.send(documents);
        })
    })

});




app.listen(process.env.PORT || 5000); 