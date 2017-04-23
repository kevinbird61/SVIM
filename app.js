// lib
const http = require('http');
const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// core
const {DeviceStation} = require('./server-core/device');
const {AuthService} = require('./server-core/auth');
const {PERSONService} = require('./server-core/personal.js');
const {DBmodules} = require('./server-core/database');
const {RESTFUL} = require('./server-core/restful_api');
/* Redirect views path */
app.set('views',path.join(__dirname,'client-service/views'));
/* Setting static directory - image use */
app.use(express.static('client-service'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
/* Setting view engine as ejs */
app.set('view engine','ejs');
app.use(require('express-session')({ secret: 'svim-server', resave: true, saveUninitialized: true }));

// Modules
PERSONService.init(app);
DeviceStation.init(app);
AuthService.init(app);
RESTFUL.init(app);

/* index page */
app.get('/',function(req,res){
    console.log('test');
    res.end('OK');
});

// Server open
const server = http.createServer(app);

server.listen(process.env.npm_package_config_port,function(){
    console.log("Http server listening on port "+process.env.npm_package_config_port);
});
