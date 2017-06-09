// Provide app / web service & information requirement
const config = require('./config');
const mongoose = require('mongoose');

// definition here
class DBmodules {
    constructor(){
        // connect to database
        mongoose.connect('mongodb://localhost/svim-server');
        // connection
        this.svimDB = mongoose.connection;
        // Define schema
        this.userSchema = mongoose.Schema({
            userID: String,
            deviceID: String,
            dailyDIST: Number,
            dailyCAL: Number,
            petTYPE: String,
            petGRADE: Number
        });

        this.distSchema = mongoose.Schema({
            deviceID: String,
            disRECORD: Number,
            date: String
        });

        // Define schema model
        this.user_m = mongoose.model('user_m',this.userSchema);
        this.dist_m = mongoose.model('dist_m',this.distSchema);
    }
    // Add distance data
    push_device_data(deviceid,dist,date,callback){
        var dist_model = this.dist_m;
        let new_dist = new dist_model({deviceID: deviceid,disRECORD: dist,data: date});
        new_dist.save(function(err,new_dist){
            if(err){
                console.log("Error with new dist save: " + err);
                callback(1,err);
            }
            else {
                console.log("Succefully add new dist!");
                callback(0,"push!");
            }
        });
    }
    // Using to add new user into database
    add_user(userid,deviceid,callback){
        var user_model = this.user_m;
        this.user_m.findOne({deviceID: deviceid},'deviceID',function(err,user){
            if(err){
                console.log("[Add user] User-findOne error.");
                callback(1,"[Add user] User-findOne error. Error Code:" + err);
            }else{
                if(user == null){
                    let newuser = new user_model({userID: userid,deviceID: deviceid,dailyDIST: 0,dailyCAL: 0,petTYPE: null,petGRADE: 0});
                    newuser.save(function(err,newuser){
                        if(err){
                            console.log("Error with new user save: " + err);
                            callback(1,err);
                        }
                        else{
                            console.log("Succefully add new user!");
                            callback(0,"create!");
                        }
                    });
                }
                else{
                    console.log("Duplicate account name, please use another account to sign up.");
                    callback(1,"Duplicate account name, please use another account to sign up.");
                }
            }
        });
    }
    // Using to check available user
    check_user(userid,deviceid,callback){
        var user_model = this.user_m;
        this.user_m.findOne({deviceID: deviceid},'userID deviceID dailyCAL dailyDIST petTYPE petGRADE',function(err,user){
            if(err){
                console.log("[Check user] User-findOne error.");
                callback(1,"[Check user] User-findOne error.");
            }
            else{
                if(user == null){
                    // Not found this user => error
                    console.log("Not found this user.");
                    callback(1,"Not found this user.");
                }
                else{
                    // exist => find !
                    console.log("Found one !");
                    callback(0,user);
                }
            }
        });
    }
    // Update user
    update_user(userid,deviceid,dailycal,dailydist,pettype,petgrade,callback){
        var user_model = this.user_m;
        this.user_m.findOne({userID: userid,deviceID: deviceid},'userID deviceID dailyCAL dailyDIST petTYPE petGRADE',function(err,user){
            if(err){
                console.log("[Update user] User-findOne error");
                callback(1,"[Update user] User-findOne error");
            }
            else{
                if(user == null){
                    // Not found this user => error
                    console.log("Not found this user.");
                    callback(1,"Not found this user.");
                }
                else{
                    // exist ! return user
                    user.dailyCAL = dailycal;
                    user.dailyDIST = dailydist;
                    user.petTYPE = pettype;
                    user.petGRADE = petgrade;
                    // save the new user
                    user.save(function(err,user){
                        if(err){
                            console.log("Error with user update: "+err);
                            callback(1,err);
                        }
                        else{
                            console.log("Successfully update user");
                            callback(0,"update");
                        }
                    })
                }
            }
        });
    }
}

module.exports = {
    DBmodules: new DBmodules()
};
