// Device connected information center

// definition here
class DeviceService {
    init(app){
        app.post('/data_sync',this.data_sync);
    }
    data_sync(req,res){
        console.log("Get ID:" + req.body.id );
        console.log("Get sync_data:" + req.body.sync_data);
        res.end("OK");
    }
}

module.exports = {
    DeviceService: new DeviceService()
};
