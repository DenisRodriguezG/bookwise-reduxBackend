import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dataUsers from './dataUsers.js';

//app config
const app = express();
const port = process.env.port || 8081;

//middlewares
app.use(express.json());
app.use(cors());

//database connect
const connectionDatabase = 'mongodb+srv://denis:PMh1yaNra0znPtSt@cluster0.f884u.mongodb.net/bookwise?retryWrites=true&w=majority';
mongoose.connect(connectionDatabase,
    {
        useNewUrlParser: true
    });
const databaseConnect = mongoose.connection;
databaseConnect.on('open', () => console.log('database connected'));

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