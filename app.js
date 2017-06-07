const sender = require('./deliver');
const qs = require('querystring');
const http = require('http');
const mraa = require('mraa');
var uart = new mraa.Uart(1); // Using port 16,17 to do the transport

// Setup the uart
uart.setBaudRate(57600);
uart.setMode(8,0,1);
uart.setFlowcontrol(false,false);
var strline = "";

console.log("Ready to get the data from the MCU!");

function read(){
while(1){
    if(uart.dataAvailable(2000)){
        var judge = uart.readStr(1024);
        if(judge != "#"){
            strline = strline + judge;
        }
        else{
            console.log(strline);
            // TODO: Using sender to deliver the message which collect from MCU
            /*sender.getSync('UIDD',strline,function(err,msg){
                if(err)
                    console.log(msg);
                else{
                    console.log("Successfully deliver message to server.");
					uart.writeStr("OK");
					strline = "";
                }
            });*/
			break;
		}
        // process.stdout.write(uart.readStr(1024));
    }
}

            sender.getSync('UIDD',strline,function(err,msg){
                if(err)
                    console.log(msg);
                else{
                    console.log("Successfully deliver message to server.");
					uart.writeStr("OK");
					strline = "";
                }
            });

}

setInterval(read,3000);
