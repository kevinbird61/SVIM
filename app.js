// lib
const http = require('http');
const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// core
const {DeviceService} = require('./server-core/device');
const {AuthService} = require('./server-core/auth');
const {PERSONService} = require('./server-core/personal.js');
const {DBmodules} = require('./server-core/database');
const {RESTFUL} = require('./server-core/restful_api');
/* Redirect views path */
app.set('views',path.join(__dirname,'client-service/views'));
/* Setting static directory - image use */
app.use(express.static(path.join(__dirname,'client-service/elements')));
app.use(express.static(path.join(__dirname,'client-service/img')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
/* Setting view engine as ejs */
app.set('view engine','ejs');
app.use(require('express-session')({ secret: 'svim-server', resave: true, saveUninitialized: true }));

// Modules
PERSONService.init(app);
DeviceService.init(app);
AuthService.init(app);
RESTFUL.init(app);

/* index page */
app.get('/',function(req,res){
    res.end('This is SVIM-server,please using /docs to check out the restful_api of our SVIM-server.');
});

// Server open
const server = http.createServer(app);

server.listen(process.env.npm_package_config_port,function(){
    console.log("Http server listening on port "+process.env.npm_package_config_port);
});
