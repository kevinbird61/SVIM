// lib
const http = require('http');
const url = require('url');
const router = require('./router');
const port = 8080;

function onRequest(req,res){
    // router
    var pathname = url.parse(req.url).pathname;
    router.parsing(pathname,req,res);
}

http.createServer(onRequest).listen(process.env.npm_package_config_port);

console.log("[SVIM] base-station");
