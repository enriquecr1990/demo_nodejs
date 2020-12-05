//se agrega el cliente de mongo db para utilizarlo
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://ecoronar:ecrunirmx2020@cluster0.l6yaw.mongodb.net/";
module.exports = {
    cliente : MongoClient,
    uri : url
};