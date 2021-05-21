const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/User');
const saucesRoutes = require('./routes/Sauces');
const path = require('path');

const db = require('./database/database');
db.connect();

const app = express();

class App{
    constructor(){
        this.initHeaders();
        this.initRoutes();
        this.initImgs();
    }
    initHeaders() {
        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
            next();
          });
        };

        initRoutes(){
            app.use(bodyParser.json());
            app.use('/api/auth', userRoutes);
            app.use('/api/sauces', saucesRoutes);
        };

        initImgs(){
            app.use(bodyParser.json());
            app.use('/images', express.static(path.join(__dirname, 'images')));
        }
};
module.exports = app;
new App();
