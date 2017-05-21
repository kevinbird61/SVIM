const qs = require('querystring');
const http = require('http');

// Main page request
function main(req,res){
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.write('svim-device');
    res.end();
}

// Intro page request
function intro(req,res){
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.write('svim-usage');
    res.end();
}

// Data Sync request
function getData(req,res){
    var querydata = "";
    var obj = "";
    // Continuously receive data
    req.on("data",function(chunk){
        querydata += chunk;
        if(querydata.length > 1e6){
            querydata = '';
            res.writeHead(413, {'Content-Type': 'text/plain'}).end();
            req.connection.destroy();
        }
    });

    req.on("end",function(){
        /* send data to web server */
        delivery(querydata);
        res.writeHead(200,{"Content-Type":"text/plain"});
        res.write('Successfully Received.');
        res.end();
    });
}

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
    main: main,
    intro: intro,
    getData: getData,
    serial: serial
}
