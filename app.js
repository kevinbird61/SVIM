const sender = require('./deliver');
const qs = require('querystring');
const http = require('http');
const mraa = require('mraa');
var uart = new mraa.Uart(1); // Using port 16,17 to do the transport

// Setup the uart
uart.setBaudRate(9600);
uart.setMode(8,0,1);
uart.setFlowcontrol(false,false);
var strline = "";

console.log("Ready to get the data from the MCU!");

function read(){
    // Read the input from device
    while(1){
        if(uart.dataAvailable(1000)){
            strline = uart.readStr(1024);
            // process.stdout.write(uart.readStr(1024));
            break;
        }
    }
    sender.getSync(strline,function(err,msg){
        if(err)
            console.log(msg);
        else{
            console.log("Successfully deliver message to server.");
			uart.writeStr("OK");
        }
    });
}

// Continuous reading
setInterval(read,1000);
