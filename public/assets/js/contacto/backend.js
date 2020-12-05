//logica para determinar la configuracion del servidor del backend
var hostname = location.hostname;
switch (hostname) {
    case 'enrique-nodesql.azurewebsites.net':
        var Backend = {
            url : 'https://enrique-nodesql.azurewebsites.net/'
        };
        break;
    default:
        var Backend = {
            url : 'http://localhost:8080/',
        }
        break;
}
