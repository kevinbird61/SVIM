// Device connected information center
const {DBmodules} = require('./database');
const moment = require('moment');

// definition here
class DeviceService {
    init(app){
        app.post('/data_sync',this.data_sync);
    }
    data_sync(req,res){
        // split with specific token
        let data_array = req.body.sync_data.split('#');
        let dist_mean = 0,bth_mean = 0,flag = false,counter = 0,id = "";
        // Get data length
        console.log("Data Size:" + data_array.length);
        // Get the medium element (complete)
        for(var index in data_array){
            try{
                // Make sure the parsing result is good
                console.log(JSON.parse(data_array[index]).dist);
            }
            catch(e){
                flag = true;
            }
            if(!flag){
                dist_mean += parseFloat(JSON.parse(data_array[index]).dist);
                bth_mean += parseFloat(JSON.parse(data_array[index]).bth);
                id = JSON.parse(data_array[index]).id;
                counter++;
                flag = false;
            }
        }
        //console.log("Get sync_data: " + JSON.parse(data_array[Math.floor(data_array.length/2)]).dist );
        if(counter != 0){
            // Get the available data
            console.log("Get uuid: " + id);
            console.log("Get sync_data: " + dist_mean/counter);
            console.log("Get bth: " + bth_mean/counter);
            console.log("Get time: " + moment().format('YYYY-MM-DD-hh-mm-ss-a'));
            // Store data into db
            DBmodules.push_device_data(id,dist_mean/counter,bth_mean/counter,moment().format('YYYY-MM-DD-hh-mm-ss-a'),(err,msg) => {
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

module.exports = {
    DeviceService: new DeviceService()
};
