// lib
// const sender = require('./deliver');
const qs = require('querystring');
const http = require('http');
const mraa = require('mraa');
var uart = new mraa.Uart(1); // Using port 16,17 to do the transport

// Setup the uart
uart.setBaudRate(57600);
uart.setMode(8,0,1);
uart.setFlowcontrol(false,false);
var strline = "";

// Disable the http server , change to active emit http request to server.
/*function onRequest(req,res){
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
            strline = strline + judge;
        }
        else{
            console.log(strline);
            // TODO: Using sender to deliver the message which collect from MCU
			const obj = qs.stringify({
				'id': "UUID",
				'sync_data': strline
			});
			
			const http_options = {
				hostname: "140.116.245.247",
				port: 3000,
				path: '/data_sync',
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Content-Length': Buffer.byteLength(obj)
				}
			};
			
			const http_req = http.request(http_options, function(res){
				console.log("Status: " + res.statusCode);
				console.log("Headers: " + JSON.stringify(res.headers));
				res.setEncoding('utf8');
				res.on('data',function(chunk){
					console.log(chunk);
				});
				res.on('end',function(){
					console.log("No more data in response.");
				});
			});

			http_req.on('error',function(e){
				console.error('Problem with request: ' + e.message);
			});

			http_req.write(obj);
			http_req.end();

            uart.writeStr("OK");
            strline = "";

			return;
        }
        // process.stdout.write(uart.readStr(1024));
    }
}
