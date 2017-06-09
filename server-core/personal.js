// For user data storage
// using graphAPI to auth , just store user data here
const {DBmodules} = require('./database');

class PERSONService {
    init(app){
        app.get('/register',this.register);
        app.get('/update_user',this.update_user);
        app.get('/get_user',this.get_user);
        // Test (OAuth)
        app.get('/fblogin',this.fblogin);
    }
    register(req,res){
        let userName = req.query.userID;
        let deviceID = req.query.deviceID;
        console.log("Get data : "+ userName + "; " + deviceID);
        // store into database
        DBmodules.add_user(userName,deviceID, (err,msg) => {
            if(err)
                res.end("Error Add");
            else {
                res.end("OK");
            }
        });
    }
    update_user(req,res){
        // update receive
        console.log("Receive the update information!");
        let userName = req.query.userID;
        let deviceID = req.query.deviceID;
        let dailyCAL = req.query.dailyCAL;
        let dailyDIST = req.query.dailyDIST;
        let petTYPE = req.query.petTYPE;
        let petGRADE = req.query.petGRADE;
        DBmodules.update_user(userName,deviceID,dailyCAL,dailyDIST,petTYPE,petGRADE, (err,msg) => {
            if(err)
                res.end("Error Update");
            else {
                res.end("OK");
            }
        });
    }
    get_user(req,res){
        // get userdata
        console.log("Fetch user information");
        let userName = req.query.userID;
        let deviceID = req.query.deviceID;
        DBmodules.check_user(userName,deviceID, (err,msg_data) => {
            if(err)
                res.end("Error Get");
            else{
                res.end(JSON.stringify(msg_data));
            }
        })
    }
    fblogin(req,res){
        res.end("FB login OK!");
    }
}

module.exports = {
    PERSONService: new PERSONService()
}
