// lib
const https = require('https');
const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// core
const {DeviceStation} = require('./server-core/device');
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

/* key */
var options = {
    key: fs.readFileSync('./privatekey.pem'),
    cert: fs.readFileSync('./certificate.pem')
}

// Modules
DeviceStation.init(app);
DBmodules.init(app);
RESTFUL.init(app);

/* index page */
app.get('/',function(req,res){
    console.log('test');
    res.end('OK');
});

// Server open
const server = https.createServer(options,app);

server.listen(process.env.npm_package_config_port,function(){
    console.log("Https server listening on port "+process.env.npm_package_config_port);
});
