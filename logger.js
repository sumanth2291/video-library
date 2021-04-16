const EventEmitter = require('events');

class Logger extends EventEmitter {
  log(message) {
    console.log(message);
    this.emit('logMessage', {id: 1, url: 'https://www.xyz.com'});
  }
}

module.exports = Logger;