let events = require('events');
let emmiter = new events();
require('./twitch')(emmiter)
require('./youtube')(emmiter)

module.exports = emmiter;