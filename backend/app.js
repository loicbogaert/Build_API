const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/User');

const db = require('./config/config');
db.connect();

const app = express();

class App{
    constructor(){
        this.initHeaders();
        this.initRoutes();
    }
    initHeaders() {
        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
            next();
          });
          app.use(bodyParser.json());
        };

        initRoutes(){
            app.use('/api/auth', userRoutes);
        };
};

module.exports = app;
new App();
