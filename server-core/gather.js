// Provide app / web service & information requirement

// definition here
class GatherModules {
    init(app){
        app.get('/gather',this.gather);
    }
    gather(req,res){
        res.end("Test Gather");
    }
}

module.exports = {
    GatherModules: new GatherModules()
};
