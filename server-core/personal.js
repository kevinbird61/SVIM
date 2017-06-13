// For user data storage
// using graphAPI to auth , just store user data here
const {DBmodules} = require('./database');
const config = require('./config');

class PERSONService {
    init(app){
		// User operation
        app.get('/register',this.register);
        app.get('/update_user',this.update_user);
        app.get('/get_user',this.get_user);
        // Fetch profile
        app.get('/get_profile',this.get_profile);
        app.get('/get_health',this.get_health);
		app.get('/get_pet',this.get_pet);
		// Pet Query
		app.get('/pet',this.pet);
        // Test (OAuth)
        app.get('/fblogin',this.fblogin);
    }
    register(req,res){
        let userName = req.query.userID;
        let deviceID = req.query.deviceID;
        console.log("Get data : "+ userName + "; " + deviceID);
        // store into database
        DBmodules.add_user(userName,deviceID, (err,msg) => {
            res.end(JSON.stringify(msg));
        });
    }
    update_user(req,res){
        // update receive
        console.log("Receive the update information!");
        let userName = req.query.userID;
        let deviceID = req.query.deviceID;
        let dailyCAL = req.query.dailyCAL == undefined ? null : req.query.dailyCAL;
        let dailyDIST = req.query.dailyDIST == undefined ? 0 : req.query.dailyDIST;
		let petNAME = req.query.petNAME == undefined ? null : req.query.petNAME;
        let petTYPE = req.query.petTYPE;
        let petGRADE = req.query.petGRADE;
		let userW = req.query.userW;
        DBmodules.update_user(userName,deviceID,dailyCAL,dailyDIST,petNAME,petTYPE,petGRADE,userW, (err,msg) => {
            res.end(JSON.stringify(msg));
        });
    }
    get_user(req,res){
        // get userdata
        console.log("Fetch user information");
        let userName = req.query.userID;
        let deviceID = req.query.deviceID;
        DBmodules.check_user(userName,deviceID, (err,msg_data) => {
            res.end(JSON.stringify(msg_data));
        })
    }
    get_profile(req,res){
        // get user profile
        console.log("Fetch user profile");
        let userid = req.query.userID;
        DBmodules.get_profile(userid, (err,msg_data) => {
            res.end(JSON.stringify(msg_data));
        });
    }
    get_health(req,res){
        // get user health info
        console.log("Fetch user health info!");
        let userid = req.query.userID;
        let userw = req.query.userW;
        DBmodules.get_health(userid,parseInt(userw),(err,msg_data) => {
            res.end(JSON.stringify(msg_data));
        });
    }
	get_pet(req,res){
		// get user pet info 
		console.log("Fetch user pet info!");
		let userid = req.query.userID;
		DBmodules.get_pet(userid, (err,msg_data) => {
			res.end(JSON.stringify(msg_data));
		});
	}
	pet(req,res){
		// get pet 
		console.log("Get Target Pet!");
		let pettype = parseInt(req.query.type);
		let petgrade = parseInt(req.query.grade);
		
		if(pettype < 0 || pettype >= config.pet_sys.length || petgrade < 0 || petgrade >= config.pet_sys[pettype].grade.length){
			// If out of range
			res.end(JSON.stringify({
				result: "Error PetQuery"
			}));
		}
		else{
			// OK
			res.end(JSON.stringify({
				petLatin: config.pet_sys[pettype].name,
				petIntro: config.pet_sys[pettype].intro,
				petPSN: config.pet_sys[pettype].personality,
				petSize: config.pet_sys[pettype].grade[petgrade]
			}));
		}
		
	}
    fblogin(req,res){
        res.end("FB login OK!");
    }
}

module.exports = {
    PERSONService: new PERSONService()
}
