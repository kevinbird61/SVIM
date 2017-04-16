function main(req,res){
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.write('svim-device');
    res.end();
}

function intro(req,res){
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.write('svim-usage');
    res.end();
}

module.exports = {
    main: main,
    intro: intro
}
