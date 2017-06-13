// Device connected information center
const {DBmodules} = require('./database');
const moment = require('moment');

// definition here
class DeviceService {
    init(app){
        app.post('/data_sync',this.data_sync);
        app.get('/fake',this.fake);
    }
    fake(req,res){
        console.log("Device ID: " + req.query.id);
        console.log("Distance: " + req.query.dist);
        console.log("data: " + moment().format('YYYY-MM-DD-hh-mm-ss-a'));
        DBmodules.push_device_data(req.query.id,req.query.dist,moment().format('YYYY-MM-DD-hh-mm-ss-a'),(err,msg) => {
            if(err){
                console.log("[Error] Push Device Data.");
                res.end(JSON.stringify({
                    result: "Error Fake"
                }));
            }
            else {
                console.log("[Success] Push Device Data.");
                res.end(JSON.stringify({
                    result: "Passed"
                }));
            }
        });
    }
    data_sync(req,res){
        // split with specific token
		console.log("Sync Data:");
		console.log(JSON.stringify(req.body));
		if(req.body.result == "Error"){
			// Error occur 
			res.end("Error");
		}
		else{
			// Push into database 
			if(req.body.dist >= 0.3 || req.body.dist <= -0.3){
				DBmodules.push_device_data(req.body.id,req.body.dist,req.body.bth,moment().format('YYYY-MM-DD-hh-mm-ss-a'),(err,msg) => {
					if(err){
						console.log("[Error] Push Device Data.");
						res.end("Error");
					}
					else {
						console.log("[Success] Push Device Data.");
						res.end("OK");
					}
				});
			}
		}
    }
}

module.exports = {
    DeviceService: new DeviceService()
};
