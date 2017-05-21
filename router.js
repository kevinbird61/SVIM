var handler = require('./taskhandler');

handler["/"] = handler.main;
handler["/intro"] = handler.intro;
handler["/getData"] = handler.getData;
handler["/serial"] = handler.serial;

function parsing(pathname,req,res){
    if(typeof handler[pathname] === 'function'){
        handler[pathname](req,res);
    }
    else{
        res.writeHead(200,{"Content-Type":"text/plain"});
        res.write("404 Error Not found");
        res.end();
    }
}

module.exports = {
    parsing: parsing
}
