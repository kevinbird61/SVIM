const qs = require('querystring');
const http = require('http');

// Deliver code
function getSync(id,rawdata,callback){
	const obj = qs.stringify({
		'id': "UUID",
		'sync_data': rawdata
	});

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

	const http_req = http.request(http_options, function(res){
		console.log("Status: " + res.statusCode);
		console.log("Headers: " + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		res.on('data',function(chunk){
			console.log(chunk);
		});
		res.on('end',function(){
			console.log("No more data in response.");
			callback(0,"No more data in response.");
		});
	});

	http_req.on('error',function(e){
		console.error('Problem with request: ' + e.message);
	});

	http_req.write(obj);
	http_req.end();
}

module.exports = {
    getSync: getSync
}
