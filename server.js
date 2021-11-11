import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dataUsers from './dataUsers.js';
import Pusher from 'pusher';

//app config
const app = express();
const port = process.env.PORT || 5000;
const pusher = new Pusher({
    appId: "1295448",
    key: "b5a304c491f6dd955645",
    secret: "f0b1500666c51a4ffd01",
    cluster: "us2",
    useTLS: true
  });
/*const pusher = new Pusher({
  appId: "129544",
  key: "b5a304c491f6dd955645",
  secret: "f0b1500666c51a4ffd01",
  cluster: "us2",
  useTLS: true
});*/
/*app_id = "1295448"
key = "b5a304c491f6dd955645"
secret = "f0b1500666c51a4ffd01"
cluster = "us2" */

//middlewares
app.use(express.json());
app.use(cors());
/*app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})*/

//database connect
const connectionDatabase = 'mongodb+srv://denis:PMh1yaNra0znPtSt@cluster0.f884u.mongodb.net/bookwise?retryWrites=true&w=majority';
mongoose.connect(connectionDatabase);
const databaseConnect = mongoose.connection;
databaseConnect.once('open', () => {
    const usersCollection = databaseConnect.collection('users');
    const userStream = usersCollection.watch();
    
    userStream.on("change", (change) => {
        console.log(change)
        if(change.operationType === 'insert')
        {
            console.log(change.fullDocument.firstName)
            pusher.trigger('bookwise', 'inserted', {
                id: change.fullDocument._id,
                firstName: change.fullDocument.firstName,
                lastName: change.fullDocument.lastName,
                age: change.fullDocument.age,
                city: change.fullDocument.city,
                email: change.fullDocument.email,
                password: change.fullDocument.password,
                whyReason: change.fullDocument.whyReason
            }).catch(error => console.log(error))       
        }
        else 
        {
            console.log('error')
        }
    })
});
/*pusher.trigger('my-channel', 'my-event', {

  "message": "hello world"

});*/

//creating routes
app.get('/', (req, res) => res.status(200).send('Hello world, I am Denis'));
app.get('/v1/users', (req, res) => {
    dataUsers.find((error, data) => {
        if(error)
        {
            res.status(500).send(error);
        }
        else
        {
            res.status(200).send(data);
        }
    })
});
app.post('/v2/users', (req, res) => {
    const dataUser = req.body;
    dataUsers.create(dataUser, (error, data) => {
        if(error)
        {
            res.status(500).send(error);
        }
        else
        {
            res.status(201).send(data);
        }
    })
})

//listen
app.listen(port, () => console.log(`listening on the port ${port}`));