//logica para determinar la configuracion del servidor del backend
var hostname = location.hostname;
switch (hostname) {
    case 'enriquecr-nodejs.azurewebsites.net':
        var Backend = {
            url : 'https://enriquecr-nodejs.azurewebsites.net/'
        };
        break;
    default:
        var Backend = {
            url : 'http://localhost:8080/',
        }
        break;
}
