const qs = require('querystring');
const http = require('http');

// Deliver code
function delivery(id,rawdata){
    // Build the post string from an object
	console.log("Get data: " + rawdata + ", which id is: " + id );

  var post_data = qs.stringify({
	  'id': id,
      'sync_data': rawdata
  });

  // An object of options to indicate where to post to
  var post_options = {
      host: '140.116.245.247',
      port: '3000',
      path: '/data_sync',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(post_data)
      }
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
		console.log("Status: " + res.statusCode);
		console.log("Headers: " + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Get server Response: ' + chunk);
      });
	  res.on('end',function(){
		  console.log('No more data in response.');			
	  })
  });

	post_req.on('error',function(e){
		console.error("problem with request: " + e.message);
	});
  // post the data
  post_req.write(post_data);
  post_req.end();
}

module.exports = {
    getSync: delivery
}
