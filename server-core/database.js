// Provide app / web service & information requirement

// definition here
class DBmodules {
    init(app){
        app.get('/db',this.db);
    }
    db(req,res){
        res.end("Test DB");
    }
}

module.exports = {
    DBmodules: new DBmodules()
};
