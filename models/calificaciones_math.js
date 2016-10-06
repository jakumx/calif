var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Calificaciones_math = new Schema({
    id: Number,
    nombre: String,
    calificacion: Number,
    bimestre: Number
});

module.exports = mongoose.model('Calificaciones_math', Calificaciones_math);