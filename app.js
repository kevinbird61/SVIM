// lib
const http = require('http');
const url = require('url');
// const router = require('./router');
const sender = require('./delivery');
const mraa = require('mraa');
var uart = new mraa.Uart(1); // Using port 16,17 to do the transport

// Setup the uart
uart.setBaudRate(57600);
uart.setMode(8,0,1);
uart.setFlowcontrol(false,false);
var strline = "";

/* Disable the http server , change to active emit http request to server.
function onRequest(req,res){
    // router
    var pathname = url.parse(req.url).pathname;
    if(req.method == "POST"){
        console.log("POST method: "+pathname);
    }
    router.parsing(pathname,req,res);
}
http.createServer(onRequest).listen(process.env.npm_package_config_port);
console.log("[SVIM] base-station");
*/

console.log("Ready to get the data from the MCU!");
while(1){
    if(uart.dataAvailable(2000)){
        var judge = uart.readStr(1024);
        if(judge != "#"){
            total = total + judge;
        }
        else{
            console.log(total);
            // TODO: Using sender to deliver the message which collect from MCU
            uart.writeStr("OK");
            total = "";
        }
        // process.stdout.write(uart.readStr(1024));
    }
}
