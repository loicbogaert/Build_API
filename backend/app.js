const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/config');
db.connect();

const app = express();

class App {
    constructor(){
        this.initParser();
        this.initSetHeaders();
        this.initSignup();
    }

    initParser() {
        app.use(bodyParser.json());
    }

    initSetHeaders() {
        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
            next();
          });
    }

    initSignup() {
        app.post('/api/auth/signup', (req, res, next) => {
            const user = new User({
                email: req.body.email,
                password: req.body.password
            });
            user.save()
            .then(()=> res.status(201).json({ message: 'utilisateur créé !'}))
            .catch(error => res.status(400).json ({ error }));
            })
        };
    };


new App();
module.exports = app;