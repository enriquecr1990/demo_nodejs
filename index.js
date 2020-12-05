var express = require('express');
var app = express();

const PORT = process.env.PORT || 8080;

app.get('/',function(req,res){
    res.send('******* Servidor Node JS');
});

app.listen(PORT,function(){
    console.log('***** Servidor Node JS levantado con exito - port = ' + PORT);
});