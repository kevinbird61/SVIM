// lib
const https = require('https');
const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// core
const {DeviceService} = require('./server-core/device');
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

DeviceService.init(app);

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
