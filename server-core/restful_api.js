// Provide app / web service & information requirement

// definition here
class RESTFUL_API {
    init(app){
        app.get('/restful_api',this.restful);
    }
    restful(req,res){
        res.end("Test API");
    }
}

module.exports = {
    RESTFUL: new RESTFUL_API()
};
