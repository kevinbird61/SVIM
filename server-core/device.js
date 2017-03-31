// Device connected information center

// definition here
class DeviceService {
    init(app){
        app.get('/update',this.update);
    }
    update(req,res){
        res.end("Test Update");
    }
}

module.exports = {
    DeviceStation: new DeviceService()
};
