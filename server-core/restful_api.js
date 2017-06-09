// Provide app / web service & information requirement
const jsfs = require('jsonfile');
const path = require('path');

// definition here
class RESTFUL_API {
    init(app){
        app.get('/docs',this.docs);
        app.post('/restful_api',this.restful);
    }
    docs(req,res){
        var api = jsfs.readFileSync(path.join(__dirname,'restful','api.json'));
        res.render('docs',{
            title: "SVIM - restful api",
            api: api
        });
    }
    restful(req,res){
        console.log('Server receive:')
        console.dir(req.body);
        res.end("Test API");
    }
}

module.exports = {
    RESTFUL: new RESTFUL_API()
};
