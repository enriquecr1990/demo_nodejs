var express = require('express');

var app = express();

app.get('/',function(req,res){
    res.send('******* Servidor Node JS');
});

app.listen(8080,function(){
    console.log('***** Servidor Node JS levantado con exito');
});