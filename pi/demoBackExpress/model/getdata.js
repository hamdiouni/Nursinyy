var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var mesure = new Schema({
    ad8232: Number,
    accelX: Number,
    accelY: Number,
    accelZ: Number
});


module.exports = mongoose.model('Mesures', mesure); 
