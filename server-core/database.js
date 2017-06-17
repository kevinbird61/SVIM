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
			userWEIGHT: Number,
			petNAME: String,
            petTYPE: String,
            petGRADE: Number
        });

        this.distSchema = mongoose.Schema({
            deviceID: String,
            distPIECE: Number,
            date: String
        });

        // Define schema model
        this.user_m = mongoose.model('user_m',this.userSchema);
        this.dist_m = mongoose.model('dist_m',this.distSchema);
    }
    // Add distance data
    push_device_data(deviceid,dist,bth,date,callback){
        var dist_model = this.dist_m;
        let new_dist = new dist_model({deviceID: deviceid,distPIECE: dist,date: date});
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
	// Using to get the pet information of user
	get_pet(userid,callback){
		this.user_m.findOne({userID: userid},'petNAME petTYPE petGRADE',function(err,userpet){
			if(err){
				console.log("[Get Pet] User-findOne error.");
                callback(1,{
                    result: "Error GetPET"
                });
			}
			else{
				if(userpet == null){
					// Not found this user => error
                    console.log("Not found this user.");
                    callback(1,{
                        result: "Error GetPET"
                    }); 
				}
				else{
					// Exist ! 
					console.log(`${userid}'s pet name is ${userpet.petNAME}`);
					console.log(JSON.stringify(userpet));
					// Find target pet 
					console.log(`Type of pet: ${config.pet_sys[userpet.petTYPE].name}`);
					console.log(`Grade of pet: ${config.pet_sys[userpet.petTYPE].grade[userpet.petGRADE]}`);
					// Return 
					callback(0,{
						petName: userpet.petNAME,
						petLatin: config.pet_sys[userpet.petTYPE].name,
						petIntro: config.pet_sys[userpet.petTYPE].intro,
						petPSN: config.pet_sys[userpet.petTYPE].personality,
						petSize: config.pet_sys[userpet.petTYPE].grade[userpet.petGRADE]
					});
				}
			}
		});
	}
    // Using to get the information of target user
    get_profile(userid,callback){
        var self = this;
        this.user_m.findOne({userID: userid},'userID deviceID dailyCAL dailyDIST petNAME petTYPE petGRADE userWEIGHT',function(err,user){
            if(err){
                console.log("[Get Profile] User-findOne error.");
                // callback(1,"[Check user] User-findOne error.");
                callback(1,{
                    result: "Error GetP"
                });
            }
            else{
                if(user == null){
                    // Not found this user => error
                    console.log("Not found this user.");
                    // callback(1,"Not found this user.");
                    callback(1,{
                        result: "Error GetP"
                    });
                }
                else{
                    // exist => find !
                    // and using deviceID to get all the profile from dist_m
                    self.dist_m.find({deviceID: user.deviceID},'deviceID distPIECE date',function(err,obj_array){
                        if(err){
                            console.log("Error occur when find user profile.");
                            callback(1,{
                                result: "Error GetP"
                            });
                        }else {
                            console.log("Find All!");
                            var total_dist = 0;
                            var time_stamp = 0;
                            var time_slot = config.data.sampling_slot; // treat as second
                            for(var index in obj_array){
                                // total_dist+=obj_array[index].distPIECE;
								total_dist+= obj_array[index].distPIECE <=0 ? (-obj_array[index].distPIECE) : obj_array[index].distPIECE;
                                time_stamp++;
                            }
                            console.log(`Total distance of ${user.userID} is ${total_dist}`);
                            console.log(`Total time: ${time_stamp*time_slot}`);
                            console.log(`Average speed: ${total_dist/(time_slot*time_stamp)}`);
                            callback(0,{
                                name: user.userID,
                                total_dist: total_dist,
                                avg_speed: (total_dist/(time_stamp*time_slot)).toFixed(3),
                                total_time: time_stamp*time_slot
                            });

                        }
                    });
                }
            }
        });
    }
    get_health(userid,user_weight,callback){
        var self = this;
        this.user_m.findOne({userID: userid},'userID deviceID dailyCAL dailyDIST petNAME petTYPE petGRADE userWEIGHT',function(err,user){
            if(err){
                console.log("[Check user] User-findOne error.");
                // callback(1,"[Check user] User-findOne error.");
                callback(1,{
                    result: "Error GetH"
                });
            }
            else{
                if(user == null){
                    // Not found this user => error
                    console.log("Not found this user.");
                    // callback(1,"Not found this user.");
                    callback(1,{
                        result: "Error GetH"
                    });
                }
                else{
                    // exist => find !
                    // and using deviceID to get all the profile from dist_m
                    self.dist_m.find({deviceID: user.deviceID},'deviceID distPIECE date',function(err,obj_array){
                        if(err){
                            console.log("Error occur when find user health.");
                            callback(1,{
                                result: "Error GetH"
                            });
                        }else {
                            console.log("Find All!");
                            var total_dist = 0;
                            var time_stamp = 0;
                            var time_slot = config.data.sampling_slot; // treat as second
                            var cal_per_sec = config.data.cal_per_sec[Math.floor(user_weight/10)]; // get the current weight specific cal consume volume
                            for(var index in obj_array){
                                // total_dist+=obj_array[index].distPIECE;
								total_dist+= obj_array[index].distPIECE <=0 ? (-obj_array[index].distPIECE) : obj_array[index].distPIECE;
                                time_stamp++;
                            }
                            console.log(`Total distance of ${user.userID} is ${total_dist}`);
                            console.log(`Total time: ${time_stamp*time_slot}`);
                            console.log(`Average speed: ${total_dist/(time_slot*time_stamp)}`);
                            console.log(`User Wieght is ${user_weight} , cal_per_sec is ${cal_per_sec} , total calories: ${time_stamp*time_slot*cal_per_sec}`);
                            callback(0,{
                                name: user.userID,
                                total_dist: total_dist,
                                avg_speed: (total_dist/(time_stamp*time_slot)).toFixed(3),
                                total_time: time_stamp*time_slot,
                                total_cal: time_stamp*time_slot*cal_per_sec
                            });

                        }
                    });
                }
            }
        });
    }
    // Using to add new user into database
    add_user(userid,deviceid,callback){
        var user_model = this.user_m;
        this.user_m.findOne({deviceID: deviceid},'deviceID',function(err,user){
            if(err){
                console.log("[Add user] User-findOne error.");
                callback(1,{
                    result: "Error Add"
                });
            }else{
                if(user == null){
                    let newuser = new user_model({userID: userid,deviceID: deviceid,dailyDIST: 0,dailyCAL: 0,petNAME: null,petTYPE: 0,petGRADE: 0,userWEIGHT: 0});
                    newuser.save(function(err,newuser){
                        if(err){
                            console.log("Error with new user save: " + err);
                            callback(1,{
                                result: "Error Add"
                            });
                        }
                        else{
                            console.log("Succefully add new user!");
                            callback(0,{
                                result: "Passed"
                            });
                        }
                    });
                }
                else{
                    console.log("Duplicate account name, please use another account to sign up.");
                    callback(1,{
                        result: "Duplicated"
                    });
                }
            }
        });
    }
    // Using to check available user
    check_user(userid,deviceid,callback){
        var user_model = this.user_m;
        this.user_m.findOne({deviceID: deviceid},'userID deviceID dailyCAL dailyDIST petNAME petTYPE petGRADE userWEIGHT',function(err,user){
            if(err){
                console.log("[Check user] User-findOne error.");
                // callback(1,"[Check user] User-findOne error.");
                callback(1,{
                    result: "Error Get"
                });
            }
            else{
                if(user == null){
                    // Not found this user => error
                    console.log("Not found this user.");
                    // callback(1,"Not found this user.");
                    callback(1,{
                        result: "Error Get"
                    });
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
    update_user(userid,deviceid,dailycal,dailydist,petname,pettype,petgrade,userweight,callback){
        var user_model = this.user_m;
        this.user_m.findOne({userID: userid,deviceID: deviceid},'userID deviceID dailyCAL dailyDIST petNAME petTYPE petGRADE userWEIGHT',function(err,user){
            if(err){
                console.log("[Update user] User-findOne error");
                callback(1,{
                    result: "Error Update"
                });
            }
            else{
                if(user == null){
                    // Not found this user => error
                    console.log("Not found this user.");
                    callback(1,{
                        result: "Error Update"
                    });
                }
                else{
                    // exist ! return user
                    user.dailyCAL = dailycal;
                    user.dailyDIST = dailydist;
					user.petNAME = petname;
                    user.petTYPE = pettype;
                    user.petGRADE = petgrade;
					user.userWEIGHT = userweight;
                    // save the new user
                    user.save(function(err,user){
                        if(err){
                            console.log("Error with user update: "+err);
                            callback(1,{
                                result: "Error Update"
                            });
                        }
                        else{
                            console.log("Successfully update user");
                            callback(0,{
                                result: "Passed"
                            });
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
