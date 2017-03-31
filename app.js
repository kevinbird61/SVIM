// lib
const http = require('http');
const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

/* Setting static directory - image use */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
/* Setting view engine as ejs */
app.set('view engine','ejs');

// Modules

/* index page */
app.get('/',function(req,res){
    console.log('test');
    res.end('OK');
});

// Server open
const server = http.createServer(app);

server.listen(process.env.npm_package_config_port,function(){
    console.log("[Device Station] listening on port "+process.env.npm_package_config_port);
});
