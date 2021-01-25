class Status{

    constructor(app) {
        app.use(function(req,res){
            res.status(404).json({
                status : false,
                msg : ['Error 404, página no encontrada en el API REST']
            }).status(403).json({
                status : false,
                msg : ['Error 403, página requiere login en el API REST']
            });
        });
    }

}

module.exports = Status;