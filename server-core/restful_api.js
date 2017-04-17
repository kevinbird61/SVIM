// Provide app / web service & information requirement

// definition here
class RESTFUL_API {
    init(app){
        app.post('/restful_api',this.restful);
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
