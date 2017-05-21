const qs = require('querystring');
const http = require('http');

// Deliver code
function delivery(rawdata){
    // Build the post string from an object
  var post_data = qs.stringify({
      'sync_data': rawdata
  });

  // An object of options to indicate where to post to
  var post_options = {
      host: 'localhost',
      port: '3000',
      path: '/restful_api',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(post_data)
      }
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Get serer Response: ' + chunk);
      });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();
}

module.exports = {
    delivery: delivery
}
