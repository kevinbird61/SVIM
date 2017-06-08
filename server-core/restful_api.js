// Provide app / web service & information requirement

// definition here
class RESTFUL_API {
    init(app){
        app.get('/docs',this.docs);
        app.post('/restful_api',this.restful);
    }
    docs(req,res){
        res.end("Working out the document.");
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
