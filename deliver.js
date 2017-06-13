const qs = require('querystring');
const http = require('http');

var prev_dist = 0;

// Deliver code
function getSync(rawdata,callback){
	// Parsing First
	var data_array = rawdata.split('#'),obj;
	var dist_mean = 0,bth_mean = 0,flag = false,counter = 0,id = "";
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
			bth_mean = parseFloat(JSON.parse(data_array[index]).bth);
			id = JSON.parse(data_array[index]).id;
			counter++;
			flag = false;
		}
	}
	if(counter != 0){
		console.log("Get uuid: " + id);
		console.log("Get sync_data: " + dist_mean/counter);
		console.log("Get bth: " + bth_mean/counter);
		obj = qs.stringify({
			id: id,
			dist: (dist_mean/counter - prev_dist).toFixed(3),
			bth: (bth_mean/counter).toFixed(3)
		});
		prev_dist = dist_mean/counter;
	}	
	else{
		obj = qs.stringify({
			result: "Error"
		});
	}
	
	// Http options 
	const http_options = {
		hostname: "140.116.245.247",
		port: 3000,
		path: '/data_sync',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(obj)
		}
	};
	
	// Http request
	const http_req = http.request(http_options, function(res){
		// console.log("Status: " + res.statusCode);
		// console.log("Headers: " + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		res.on('data',function(chunk){
			console.log(chunk);
		});
		res.on('end',function(){
			console.log("No more data in response.");
			callback(0,"No more data in response.");
		});
	});
	
	// Error 
	http_req.on('error',function(e){
		console.error('Problem with request: ' + e.message);
		callback(1,"Proble with request: " + e.message);
	});

	// Get Sync with server 
	http_req.write(obj);
	http_req.end();
}

module.exports = {
    getSync: getSync
}
