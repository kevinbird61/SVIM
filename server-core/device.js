// Device connected information center
const moment = require('moment');

// definition here
class DeviceService {
    init(app){
        app.post('/data_sync',this.data_sync);
    }
    data_sync(req,res){
        let data_array = req.body.sync_data.split('#');
        console.log("Data Size:" + data_array.length);
        // Get the medium element (complete)
        console.log("Get uuid: " + JSON.parse(data_array[Math.floor(data_array.length/2)]).id);
        console.log("Get sync_data: " + JSON.parse(data_array[Math.floor(data_array.length/2)]).dist );
        console.log("Get time: " + moment().format('YYYY-MM-DD-hh-mm-ss-a'));
        res.end("OK");
    }
}

module.exports = {
    DeviceService: new DeviceService()
};
