class PERSONService {
    init(app){
        app.get('/fblogin',this.fblogin);
    }
    fblogin(req,res){
        res.end("FB login OK!");
    }
}

module.exports = {
    PERSONService: new PERSONService()
}
