/*const fs = require('fs');
const path = require('path');*/

/*const errorLogPath = path.join(__dirname, 'error-log.txt');*/
const errorObservers = [];
/*if (!fs.existsSync(errorLogPath)) {
    fs.writeFileSync(errorLogPath, '', 'utf-8');
  }*/
function logError(error) {
  /*const currentDate = new Date().toISOString();
  const errorMessage = `${currentDate}: ${error}\n`;

  fs.appendFile(errorLogPath, errorMessage, (err) => {
    if (err) {
      console.error('Error al escribir en el archivo de registro de errores:', err);
      console.log(err)
    }
  });*/

  // Notificar a los observadores del error
  notifyError(error);
}

function addObserver(observer) {
  errorObservers.push(observer);
}

let frontEndErrorCallback;

function setFrontEndErrorCallback(callback) {
  frontEndErrorCallback = callback;
}

function notifyError(error) {
    errorObservers.forEach((observer) => observer(error));
  
    // No es necesario acceder a error.message directamente, ya que error ya contiene el mensaje
    if (frontEndErrorCallback) {
      frontEndErrorCallback(error);
    }
  }
  
  module.exports = { logError, addObserver, notifyError, setFrontEndErrorCallback };
